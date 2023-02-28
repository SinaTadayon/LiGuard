// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRealmManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileRealmManager is ACLStorage, BaseUUPSProxy, IProfileRealmManagement {
  using LACLStorage for DataCollection;
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

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
    return interfaceId == type(IProfileRealmManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function profileRealmRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmRegisterRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmRegister.selector);
    LProfileCommons.profileCheckMemberForRealmRegister(profileEntity, uint16(requests.length), senderId);

    // fetch scope type and scope id of sender
    (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(
      profileEntity,
      _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      senderId
    );

    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileRealmRegister(
        requests[i],
        profileEntity,
        functionEntity,
        profileId,
        senderId,
        sender,
        memberScopeType,
        memberScopeId
      );
    }
    return true;
  }

  function profileRealmUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmUpdateAdmin.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );

      // checking requested type admin
      if (requests[i].adminId != bytes32(0)) {
        require(profileEntity.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(
          profileEntity,
          requests[i].adminId
        );
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
        if (ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].entityId, "Illegal Admin Scope");
        } else {
          require(
            IProfileACLGenerals(address(this)).profileIsScopesCompatible(
              profileId,
              requestAdminScopeId,
              requests[i].entityId
            ),
            "Illegal Admin Scope"
          );
        }
        realmEntity.bs.adminId = requests[i].adminId;
      } else {
        realmEntity.bs.adminId = profileEntity.scopes[realmEntity.domainId].adminId;
      }

      emit ProfileRealmAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }

    return true;
  }

  function profileRealmMoveContext(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmMoveContextRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmMoveContext.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileRealmMoveContext(requests[i], profileEntity, functionEntity, profileId, senderId, sender);
    }
    return true;
  }

  function profileRealmUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmUpdateActivityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(requests[i].entityId);

      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        realmEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      realmEntity.bs.acstat = requests[i].acstat;
      emit ProfileRealmActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileRealmUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmUpdateAlterabilityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(requests[i].entityId);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");

      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        realmEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      realmEntity.bs.alstat = requests[i].alstat;
      emit ProfileRealmAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileRealmUpdateContextLimit(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmUpdateContextLimitRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmUpdateContextLimit.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].realmId,
        senderId
      );
      require(requests[i].contextLimit > realmEntity.contexts.length(), "Illegal Limit");
      realmEntity.contextLimit = requests[i].contextLimit;
      emit ProfileRealmContextLimitUpdated(sender, profileId, requests[i].realmId, requests[i].contextLimit);
    }
    return true;
  }

  function profileRealmRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata realms) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRealmManagement.profileRealmRemove.selector);
    for (uint256 i = 0; i < realms.length; i++) {
      RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realms[i]);

      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        realmEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    
      if(realmEntity.bs.referredByAgent == 0) {
        if(realmEntity.contexts.length() == 0) {
          delete realmEntity.bs;
          delete realmEntity.domainId;
          delete realmEntity.contextLimit;
          delete realmEntity.name;
          delete realmEntity.contexts;
          emit ProfileRealmRemoved(sender, profileId, realms[i], false);
        
        } else {
          require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
          realmEntity.bs.acstat = ActivityStatus.DELETED;
          emit ProfileRealmRemoved(sender, profileId, realms[i], true);
        }
      } else {
        revert("Illegal Remove");
      }

    }
    return true;
  }


  function profileRealmCheckId(bytes32 profileId, bytes32 realmId) external view returns (bool) {
    return _data.profiles[profileId].scopes[realmId].stype == ScopeType.REALM;
  }

  function profileRealmCheckName(bytes32 profileId, string calldata realmName) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

  function profileRealmCheckAdmin(
    bytes32 profileId,
    bytes32 realmId,
    address account
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (RealmEntity storage realmEntity, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if (!result) return false;

    bytes32 realmAdminId = realmEntity.bs.adminId;
    AgentType agentType = profileEntity.agents[realmAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = profileEntity.profileRoleTryReadSlot(realmAdminId);
      if (!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == realmAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(realmAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileRealmHasFunction(
    bytes32 profileId,
    bytes32 realmId,
    bytes32 functionId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;

    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(fe.contextId);
    if (!result1) return false;

    return ce.realmId == realmId;
  }

  function profileRealmHasContext(
    bytes32 profileId,
    bytes32 realmId,
    bytes32 contextId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;

    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if (!result) return false;
    return re.contexts.contains(contextId);
  }

  function profileRealmGetContexts(bytes32 profileId, bytes32 realmId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);

    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if (!result) return new bytes32[](0);
    return re.contexts.values();
  }

  function profileRealmGetInfo(bytes32 profileId, bytes32 realmId) external view returns (ProfileRealmInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if (!result || profileEntity.acstat == ActivityStatus.NONE) {
      return
        ProfileRealmInfo({
          domainId: bytes32(0),
          adminId: bytes32(0),
          contextLimit: 0,
          contextCount: 0,
          referredByAgent: 0,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          adminType: AgentType.NONE,
          name: ""
        });
    }

    return
      ProfileRealmInfo({
        domainId: re.domainId,
        adminId: re.bs.adminId,
        contextLimit: re.contextLimit,
        contextCount: uint32(re.contexts.length()),
        referredByAgent: re.bs.referredByAgent,
        stype: re.bs.stype,
        acstat: re.bs.acstat,
        alstat: re.bs.alstat,
        adminType: profileEntity.agents[re.bs.adminId].atype,
        name: re.name
      });
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId)
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

  // function _doGetContextEntityAndCheckAdminAccess(
  //   ProfileEntity storage profileEntity,
  //   FunctionEntity storage functionEntity,
  //   bytes32 contextId,
  //   bytes32 senderId
  // ) internal view returns (ContextEntity storage) {
  //   ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
  //   require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
  //   IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
  //     profileEntity,
  //     functionEntity,
  //     contextEntity.bs.adminId,
  //     senderId
  //   );
  //   if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
  //   return contextEntity;
  // }

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
    bytes32 realmId,
    bytes32 senderId
  ) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realmId);
    require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      realmEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return realmEntity;
  }

  function _doGetMemberScopeInfoFromType(
    ProfileEntity storage profileEntity,
    bytes32 typeId,
    bytes32 senderId
  ) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
    return (profileEntity.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doProfileRealmRegister(
    ProfileRealmRegisterRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender,
    ScopeType memberScopeType,
    bytes32 memberScopeId
  ) internal {
    bytes32 newRealmId = LProfileCommons.profileRealmRegister(
      request,
      profileEntity,
      functionEntity,
      senderId,
      memberScopeType,
      memberScopeId
    );
    emit ProfileRealmRegistered(sender, profileId, newRealmId, request.domainId, request.adminId);
  }

  function _doProfileRealmMoveContext(
    ProfileRealmMoveContextRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender
  ) internal {
    RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.realmId,
      senderId
    );
    require(realmEntity.contexts.contains(request.contextId), "Context Not Found");
    RealmEntity storage targetRealmEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.targetRealmId,
      senderId
    );
    
    ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(request.contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(contextEntity.bs.referredByAgent == 0, "Illegal Referred");

    (, bytes32 contextAdminScopeId) = _doAgentGetScopeInfo(profileEntity, realmEntity.bs.adminId);
    require(
      IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, contextAdminScopeId, request.targetRealmId),
      "Illegal Admin Scope"
    );    
    
    require(targetRealmEntity.contextLimit > targetRealmEntity.contexts.length(), "Illegal Move");
    realmEntity.contexts.remove(request.contextId);
    targetRealmEntity.contexts.add(request.contextId);
    contextEntity.realmId = request.targetRealmId;
    emit ProfileRealmContextMoved(sender, profileId, request.realmId, request.contextId, request.targetRealmId);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }
}
