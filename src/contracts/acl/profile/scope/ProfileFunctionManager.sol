// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileFunctionManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/proxy/LClones.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";
/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileFunctionManager is ACLStorage, BaseUUPSProxy, IProfileFunctionManagement {
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
    return
      interfaceId == type(IProfileFunctionManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileFunctionRegister(ProfileFunctionRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    for (uint i = 0; i < requests.length; i++) {
      address signer;
      address contractId;      
      if(requests[i].contractId == address(0)) {
        if(requests[i].signature.length > 0) {
          signer = _doGetSignerAddress(
            requests[i].signature, 
            _getPredictContextMessageHash(requests[i].profileId, requests[i].deployer, requests[i].subject, requests[i].realmId)
          );
        } else {
          signer = msg.sender;
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
        
      } else {
        if(requests[i].signature.length > 0) {
          bytes32 structHash = _getContextMessageHash(
            requests[i].profileId,
            requests[i].contractId, 
            LACLUtils.generateHash(requests[i].name), 
            LACLUtils.generateHash(requests[i].version),
            requests[i].realmId
          );
          signer = _doGetSignerAddress(requests[i].signature, structHash);
        } else {
          signer = msg.sender;
        }    
        contractId = requests[i].contractId;
      }

      bytes32 contextId = LACLUtils.accountGenerateId(contractId);  
      bytes32 signerId = LACLUtils.accountGenerateId(signer);
    
      ProfileEntity storage profileEntity = _data.profiles[requests[i].profileId];      
      {
        address functionFacetId = _data.selectors[IProfileFunctionManagement.profileFunctionRegister.selector];
        bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, IProfileFunctionManagement.profileFunctionRegister.selector); 
        IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(requests[i].profileId, functionId, signerId);
        if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);          
      }
          
      LProfileCommons.profileCheckMemberForFunctionRegister(profileEntity, uint16(requests[i].functions.length), signerId);
      // check access system scope
      require(_doCheckSystemScope(profileEntity, contextId, signerId, requests[i].profileId), "Forbidden");        
  
      for (uint j = 0; j < requests[i].functions.length; j++) {
        bytes32 newFunctionId = LProfileCommons.profileFunctionRegistration(profileEntity, requests[i].functions[j], requests[i].profileId, contextId);
        _doEventProfileFunctionRegister(requests[i].functions[j], requests[i].profileId, contextId, newFunctionId, signer);
        // emit ProfileFunctionRegistered(
        //   msg.sender,
        //   requests[i].profileId,
        //   contextId, 
        //   newFunctionId,
        //   requests[i].functions[j].adminId,
        //   requests[i].functions[j].agentId,
        //   signer
        // );
      }
    }
    return true;
  }

  function profileFunctionUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileFunctionManagement.profileFunctionUpdateAdmin.selector);      
      for(uint j = 0; j < requests[i].data.length; j++) {
        FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(profileEntity, profileEntity.scopes[functionEntity.contextId].adminId, functionEntity.contextId, requests[i].data[j].adminId, requests[i].profileId);
        emit ProfileFunctionAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;  
  }

  function profileFunctionUpdateAgent(ProfileFunctionUpdateAgentRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileFunctionManagement.profileFunctionUpdateAgent.selector);
      for(uint j = 0; j < requests[i].agents.length; j++) {
        FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].agents[j].functionId, senderId, functionId);  
        _doCheckAgentId(profileEntity, requests[i].profileId, requests[i].agents[j].agentId, functionEntity.contextId);
        functionEntity.agentId = requests[i].agents[j].agentId;
        emit ProfileFunctionAgentUpdated(msg.sender, requests[i].profileId, requests[i].agents[j].functionId, requests[i].agents[j].agentId);
      }
    }
    return true;  
  }

  function profileFunctionUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileFunctionManagement.profileFunctionUpdateActivityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);        
        require(requests[i].data[j].acstat != ActivityStatus.NONE, "Illegal Activity");
        functionEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileFunctionActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);        
      }
    }
    return true;
  }

  function profileFunctionUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileFunctionManagement.profileFunctionUpdateAlterabilityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        FunctionEntity storage functionEntity = profileEntity.profileFunctionReadSlot(requests[i].data[j].entityId);
        require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);        
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        functionEntity.bs.alstat = requests[i].data[j].alstat;
        emit ProfileFunctionAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileFunctionUpdatePolicyCode(ProfileFunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileFunctionManagement.profileFunctionUpdatePolicyCode.selector);
      for(uint j = 0; j < requests[i].codes.length; j++) {
        FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].codes[j].functionId, senderId, functionId);
        functionEntity.policyCode = requests[i].codes[j].policyCode;
        emit ProfileFunctionPolicyUpdated(msg.sender, requests[i].profileId, requests[i].codes[j].functionId, requests[i].codes[j].policyCode);      
      }
    }
    return true;
  }

  function profileFunctionCheckId(bytes32 profileId, bytes32 functionId) external view returns (bool) {    
    return _data.profiles[profileId].scopes[functionId].stype == ScopeType.FUNCTION;
  }

  function profileFunctionCheckSelector(bytes32 profileId, address contractId, bytes4 selector) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.functionGenerateId(contractId, selector)].stype == ScopeType.FUNCTION;
  }

  function profileFunctionCheckAdmin(bytes32 profileId, bytes32 functionId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if(!result) return false;  

    return _doFunctionCheckAccount(profileEntity, fe.bs.adminId, account);
  }

   function profileFunctionCheckAgent(bytes32 profileId, bytes32 functionId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if(!result) return false;  

    return _doFunctionCheckAccount(profileEntity, fe.agentId, account);
  }

  function _doFunctionCheckAccount(ProfileEntity storage profileEntity, bytes32 agentId, address account) internal view returns (bool) {
    
    AgentType agentType = profileEntity.agents[agentId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(profileEntity, agentId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(agentId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }
 
  function profileFunctionGetInfo(bytes32 profileId, bytes32 functionId) external view returns (ProfileFunctionInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) { 
      return ProfileFunctionInfo({
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

    return ProfileFunctionInfo({
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

  function _doGetAgentScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileId, functionId, senderId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId, senderId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 fId, bytes32 senderId, bytes32 functionId) internal view returns (FunctionEntity storage) {
    FunctionEntity storage functionEntity = profileEntity.profileFunctionReadSlot(fId);
    require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return functionEntity;
  } 

  function _doGetAndCheckFunctionAdmin(ProfileEntity storage profileEntity, bytes32 contextAdminId, bytes32 contextId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 functionAdminId) {
    return LProfileCommons.profileGetAndCheckFunctionAdmin(profileEntity, contextAdminId, contextId, adminId, profileId);
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

  function _doCheckAgentId(ProfileEntity storage profileEntity, bytes32 profileId, bytes32 agentId, bytes32 contextId) internal view {
    BaseAgent storage ba = profileEntity.agents[agentId];
    require(ba.atype > AgentType.MEMBER, "Illegal AgentId");

    (ScopeType requestAgentScopeType, bytes32 requestAgentScopeId) = _doGetAgentScopeInfo(profileEntity, agentId);
    require(ScopeType.CONTEXT <= requestAgentScopeType, "Illegal Agent ScopeType");
    if(ScopeType.CONTEXT == requestAgentScopeType) {  
      require(requestAgentScopeId == contextId, "Illegal Agent Scope");
    
    } else {
      require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAgentScopeId, contextId), "Illegal Agent Scope");
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
    return LECDSA.toTypedDataHash(_contractDomainSeparatorV4(), structHash);
  }

  function _contractDomainSeparatorV4() internal view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          TYPE_HASH,          
          IProxy(address(this)).contractName(),
          IProxy(address(this)).contractVersion(),
          block.chainid,
          address(this)
        )
      );
  }

  function _doCheckSystemScope(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId, bytes32 memberId, bytes32 profileId) private view returns (bool) {
    IACLCommons.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommons.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if(profileEntity.scopes[memberSystemRole.scopeId].stype < IACLCommons.ScopeType.CONTEXT) return false;
    if(memberSystemRole.scopeId == scopeId) {
      return true;
    } 
      
    return IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);    
  }

  function _doEventProfileFunctionRegister(ProfileFunctionRequest calldata request, bytes32 profileId, bytes32 contextId, bytes32 functionId, address signer) internal {
    emit ProfileFunctionRegistered(
      msg.sender,
      profileId,
      contextId, 
      functionId,
      request.adminId,
      request.agentId,
      signer
    );
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }  

}