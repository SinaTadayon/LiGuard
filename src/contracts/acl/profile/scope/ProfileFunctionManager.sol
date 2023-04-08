// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./IProfileFunctionManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/proxy/LClones.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileFunctionManager is ACLStorage, BaseUUPSProxy, IProfileFunctionManagement {
  using LACLStorage for DataCollection;
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LClones for address;

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {
    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IProfileFunctionManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function profileFunctionRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionRegisterRequest[] calldata requests
  ) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");
    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);

    address signer;
    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    for (uint256 i = 0; i < requests.length; i++) {
      address contractId;
      if (requests[i].contractId == address(0)) {
        if (memberSign.signature.length == 0) {
          if (requests[i].signature.length > 0) {
            signer = _doGetSignerAddress(
              requests[i].signature,
              _getPredictContextMessageHash(profileId, requests[i].deployer, requests[i].subject, requests[i].realmId)
            );
          } else {
            signer = msg.sender;
          }
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
      } else {
        if (memberSign.signature.length == 0) {
          if (requests[i].signature.length > 0) {
            bytes32 structHash = _getContextMessageHash(
              profileId,
              requests[i].contractId,
              LACLUtils.generateHash(requests[i].name),
              LACLUtils.generateHash(requests[i].version),
              requests[i].realmId
            );
            signer = _doGetSignerAddress(requests[i].signature, structHash);
          } else {
            signer = msg.sender;
          }
        }
        contractId = requests[i].contractId;
      }

      bytes32 contextId = LACLUtils.accountGenerateId(contractId);
      bytes32 signerId = LACLUtils.accountGenerateId(signer);

      ProfileEntity storage profileEntity = _data.profiles[profileId];
      {
        address functionFacetId = _data.selectors[IProfileFunctionManagement.profileFunctionRegister.selector];
        bytes32 functionId = LACLUtils.functionGenerateId(
          functionFacetId,
          IProfileFunctionManagement.profileFunctionRegister.selector
        );
        ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, signerId);
      }

      LProfileCommons.profileCheckMemberForFunctionRegister(
        profileEntity,
        uint16(requests[i].functions.length),
        signerId
      );

      // check access system scope
      require(_doCheckSystemScope(profileEntity, contextId, signerId, profileId), "Forbidden");

      _doProfileFunctionRegister(profileEntity, requests[i], profileId, contextId, signer);
    }
    return true;
  }

  function profileFunctionUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionUpdateAdmin.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionData = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );
      functionData.bs.adminId = _doGetAndCheckFunctionAdmin(
        profileEntity,
        profileEntity.scopes[functionEntity.contextId].adminId,
        functionData.contextId,
        requests[i].adminId,
        profileId
      );
      emit ProfileFunctionAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profileFunctionUpdateAgent(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionUpdateAgentRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionUpdateAgent.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionData = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].functionId,
        senderId
      );
      _doCheckAgentId(profileEntity, profileId, requests[i].agentId, functionData.contextId);
      functionData.agentId = requests[i].agentId;
      emit ProfileFunctionAgentUpdated(sender, profileId, requests[i].functionId, requests[i].agentId);
    }
    return true;
  }

  function profileFunctionUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionUpdateActivityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionData = profileEntity.profileFunctionReadSlot(requests[i].entityId);
      require(functionData.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        functionData.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      functionData.bs.acstat = requests[i].acstat;
      emit ProfileFunctionActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileFunctionUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionUpdateAlterabilityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionData = profileEntity.profileFunctionReadSlot(requests[i].entityId);
      require(functionData.bs.acstat > ActivityStatus.DELETED, "Function Deleted");

      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        functionData.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      functionData.bs.alstat = requests[i].alstat;
      emit ProfileFunctionAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileFunctionUpdatePolicyCode(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionUpdatePolicyRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionUpdatePolicyCode.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntityData = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].functionId,
        senderId
      );
      functionEntityData.policyCode = requests[i].policyCode;
      emit ProfileFunctionPolicyUpdated(sender, profileId, requests[i].functionId, requests[i].policyCode);
    }
    return true;
  }

  function profileFunctionRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata functions)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileFunctionManagement.profileFunctionRemove.selector);
    for (uint256 i = 0; i < functions.length; i++) {
      FunctionEntity storage functionEntityReq = profileEntity.profileFunctionReadSlot(functions[i]);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        functionEntityReq.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      if (functionEntityReq.bs.referredByAgent == 0) {
        ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(functionEntityReq.contextId);
        require(contextEntity.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Context Upgradable");
        contextEntity.functions.remove(functions[i]);

        delete functionEntityReq.bs;
        delete functionEntityReq.agentId;
        delete functionEntityReq.contextId;
        delete functionEntityReq.selector;
        delete functionEntityReq.policyCode;
        emit ProfileFunctionRemoved(sender, profileId, functions[i], false);
      } else {
        // Note: It's very important to prevent infinity lock state
        require(functionEntityReq.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        functionEntityReq.bs.acstat = ActivityStatus.DELETED;
        emit ProfileFunctionRemoved(sender, profileId, functions[i], true);
      }
    }
    return true;
  }

  function profileFunctionCheckId(bytes32 profileId, bytes32 functionId) external view returns (bool) {
    return _data.profiles[profileId].scopes[functionId].stype == ScopeType.FUNCTION;
  }

  function profileFunctionCheckSelector(
    bytes32 profileId,
    address contractId,
    bytes4 selector
  ) external view returns (bool) {
    return
      _data.profiles[profileId].scopes[LACLUtils.functionGenerateId(contractId, selector)].stype == ScopeType.FUNCTION;
  }

  function profileFunctionCheckAdmin(
    bytes32 profileId,
    bytes32 functionId,
    address account
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    return _doFunctionCheckAccount(profileEntity, fe.bs.adminId, account);
  }

  function profileFunctionCheckAgent(
    bytes32 profileId,
    bytes32 functionId,
    address account
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    return _doFunctionCheckAccount(profileEntity, fe.agentId, account);
  }

  function _doFunctionCheckAccount(
    ProfileEntity storage profileEntity,
    bytes32 agentId,
    address account
  ) internal view returns (bool) {
    AgentType agentType = profileEntity.agents[agentId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(agentId);
      if (!result) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == agentId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(agentId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileFunctionGetInfo(bytes32 profileId, bytes32 functionId)
    external
    view
    returns (ProfileFunctionInfo memory)
  {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result || profileEntity.acstat == ActivityStatus.NONE) {
      return
        ProfileFunctionInfo({
          adminId: bytes32(0),
          agentId: bytes32(0),
          contextId: bytes32(0),
          selector: bytes4(0),
          referredByAgent: 0,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          adminType: AgentType.NONE,
          agentType: AgentType.NONE,
          policyCode: 0
        });
    }

    return
      ProfileFunctionInfo({
        adminId: fe.bs.adminId,
        agentId: fe.agentId,
        contextId: fe.contextId,
        selector: fe.selector,
        referredByAgent: fe.bs.referredByAgent,
        stype: fe.bs.stype,
        acstat: fe.bs.acstat,
        alstat: fe.bs.alstat,
        adminType: profileEntity.agents[fe.bs.adminId].atype,
        agentType: profileEntity.agents[fe.agentId].atype,
        policyCode: fe.policyCode
      });
  }

  function _doGetAgentScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (ScopeType, bytes32)
  {
    AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));
  }

  function _doCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function _accessPermission(ProfileMemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      ProfileEntity storage,
      FunctionEntity storage,
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");

    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);

    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 fId,
    bytes32 senderId
  ) internal view returns (FunctionEntity storage) {
    FunctionEntity storage functionEntityData = profileEntity.profileFunctionReadSlot(fId);
    require(functionEntityData.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(functionEntityData.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      functionEntityData.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return functionEntityData;
  }

  function _doGetAndCheckFunctionAdmin(
    ProfileEntity storage profileEntity,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId,
    bytes32 profileId
  ) internal view returns (bytes32 functionAdminId) {
    return
      LProfileCommons.profileGetAndCheckFunctionAdmin(profileEntity, contextAdminId, contextId, adminId, profileId);
  }

  function _getContextMessageHash(
    bytes32 profileId,
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_CTX_MESSAGE_TYPEHASH, profileId, contractId, name, version, realmId));
  }

  function _doCheckAgentId(
    ProfileEntity storage profileEntity,
    bytes32 profileId,
    bytes32 agentId,
    bytes32 contextId
  ) internal view {
    BaseAgent storage ba = profileEntity.agents[agentId];
    require(ba.atype > AgentType.MEMBER, "Illegal AgentId");

    (ScopeType requestAgentScopeType, bytes32 requestAgentScopeId) = _doGetAgentScopeInfo(profileEntity, agentId);
    require(ScopeType.CONTEXT <= requestAgentScopeType, "Illegal Agent ScopeType");
    if (ScopeType.CONTEXT == requestAgentScopeType) {
      require(requestAgentScopeId == contextId, "Illegal Agent Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAgentScopeId, contextId),
        "Illegal Agent Scope"
      );
    }
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _getPredictContextMessageHash(
    bytes32 profileId,
    address deployer,
    address subject,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_PREDICT_CTX_MESSAGE_TYPEHASH, profileId, deployer, subject, realmId));
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(IProxy(address(this)).domainSeparator(), structHash);
  }

  function _doCheckSystemScope(
    ProfileEntity storage profileEntity,
    bytes32 scopeId,
    bytes32 memberId,
    bytes32 profileId
  ) private view returns (bool) {
    IACLCommons.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(
      _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID
    );
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommons.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if (profileEntity.scopes[memberSystemRole.scopeId].stype < IACLCommons.ScopeType.CONTEXT) return false;
    if (memberSystemRole.scopeId == scopeId) {
      return true;
    }

    return IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);
  }

  function _doProfileFunctionRegister(
    ProfileEntity storage profileEntity,
    ProfileFunctionRegisterRequest calldata request,
    bytes32 profileId,
    bytes32 contextId,
    address signer
  ) internal {
    for (uint256 j = 0; j < request.functions.length; j++) {
      bytes32 functionId = LProfileCommons.profileFunctionRegistration(
        profileEntity,
        request.functions[j],
        profileId,
        contextId
      );
      emit ProfileFunctionRegistered(
        signer,
        profileId,
        contextId,
        functionId,
        request.functions[j].adminId,
        request.functions[j].agentId
      );
    }
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }
}
