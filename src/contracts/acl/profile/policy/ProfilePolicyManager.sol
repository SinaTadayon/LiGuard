// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfilePolicyManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../agent/IProfileRoleManagement.sol";
import "../agent/IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../../../proxy/IProxy.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileRolePolicy.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfilePolicyManager is ACLStorage, BaseUUPSProxy, IProfilePolicyManagement {
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
    return
      interfaceId == type(IProfilePolicyManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }
 
  // called by members of Policy Master type
  function profilePolicyRegister(ProfilePolicyRegisterRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity,) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

      LProfileRolePolicy.profileCheckMemberForPolicyRegister(profileEntity, uint16(requests[i].policies.length), senderId);
      // // check profile and type limitations and update it
      // ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
      // require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      // require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      // require(profileMemberEntity.registerLimits.policyRegisterLimit - uint16(requests[i].policies.length) > 0, "Illegal TypeRegisterLimit");
      // require(profileEntity.registerLimits.policyRegisterLimit - uint16(requests[i].policies.length) > 0, "Illegal RegisterLimit");
      // profileMemberEntity.registerLimits.policyRegisterLimit -= uint16(requests[i].policies.length); 
      // profileEntity.registerLimits.policyRegisterLimit -= uint16(requests[i].policies.length);

      (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(profileEntity, msg.sender);

      for(uint j = 0; j < requests[i].policies.length; j++) {
        bytes32 newPolicyId = LProfileRolePolicy.profilePolicyRegister(profileEntity, requests[i].policies[j], requests[i].profileId, senderScopeType, senderScopeId);
        // _doPolicyRegister(profileEntity, requests[i].policies[j], requests[i].profileId, senderScopeType, senderScopeId);
        emit ProfilePolicyRegistered(
          msg.sender,
          requests[i].profileId,
          newPolicyId,
          requests[i].policies[j].scopeId,
          requests[i].policies[j].adminId,
          requests[i].policies[j].policyCode
        );
      }
    }
    return true;
  }

  // called by policy admin
  function profilePolicyAddRoles(ProfilePolicyAddRolesRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyAddRoles.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);      
      ScopeType policyScopeType = profileEntity.scopes[policyEntity.scopeId].stype;

      for (uint j = 0; j < requests[i].roles.length; j++) {
        // _doPolicyAddRoles(profileEntity, policyEntity, requests[i].profileId, requests[i].policyId, requests[i].roles[j], policyScopeType);
        LProfileRolePolicy.profilePolicyAddRoles(profileEntity, policyEntity, requests[i].profileId, requests[i].policyId, requests[i].roles[j], policyScopeType);
        emit ProfilePolicyRoleAdded(msg.sender, requests[i].profileId, requests[i].policyId, requests[i].roles[j]);
      }            
    }
    return true;
  }

  // function _doPolicyAddRoles(ProfileEntity storage profileEntity, PolicyEntity storage policyEntity, bytes32 profileId, bytes32 policyId, bytes32 roleId, ScopeType policyScopeType) internal {
  //   require(profileEntity.rolePolicyMap[roleId] == bytes32(0), "Already Exist");
  //   require(policyEntity.adminId != roleId, "Illegal Role");
  //   require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
  //   RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);

  //   ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
  //   require(roleScopeType <= policyScopeType, "Illegal Role ScopeType");
  //   if(roleScopeType == policyScopeType) {
  //     require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
  //   } else {
  //     require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, policyEntity.scopeId, roleEntity.scopeId), "Illegal Role Scope");
  //   }

  //   _data.rolePolicyMap[roleId] = policyId;
  //   policyEntity.roles.add(roleId);
  //   emit ProfilePolicyRoleAdded(msg.sender, profileId, policyId, roleId);
  // }

  // called by policy admin
  function profilePolicyRemoveRoles(ProfilePolicyRemoveRolesRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyRemoveRoles.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);
      for (uint j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Not Found");    
        delete _data.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit ProfilePolicyRoleRemoved(msg.sender, requests[i].profileId, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function profilePolicyUpdateCodes(ProfilePolicyUpdateCodeRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateCodes.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].policies.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policies[j].policyId, senderId, functionId);
        policyEntity.policyCode = requests[i].policies[j].policyCode;
        policyEntity.ptype = _doGetPolicyType(requests[i].policies[j].policyCode);
        emit ProfilePolicyCodeUpdated(msg.sender, requests[i].profileId, requests[i].policies[j].policyId, requests[i].policies[j].policyCode, policyEntity.ptype);
      }
    }
    return true;
  }

  function profilePolicyUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);    
        policyEntity.adminId = _getPolicyAdmin(profileEntity, profileEntity.scopes[policyEntity.scopeId].stype, profileEntity.scopes[policyEntity.scopeId].adminId, policyEntity.scopeId, requests[i].data[j].adminId, requests[i].profileId);
        require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal Admin Id");
        emit ProfilePolicyAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profilePolicyUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateScope.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);      
      for(uint j = 0; j < requests[i].data.length; j++) {
        LProfileRolePolicy.profilePolicyUpdateScope(profileEntity, requests[i].data[j], requests[i].profileId, senderId, functionId);
        // _doPolicyUpdateScope(profileEntity, requests[i].data[j], requests[i].profileId, senderId, functionId);
        emit ProfilePolicyScopeUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].scopeId);
      }
    }
    return true;
  }

  function profilePolicyUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");       
        policyEntity.acstat = requests[i].data[j].acstat;
        emit ProfilePolicyActivityUpdated(msg.sender,requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profilePolicyUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        LProfileRolePolicy.profilePolicyUpdateAlterabilityStatus(profileEntity, requests[i].data[j], senderId, functionId);
        // PolicyEntity storage policyEntity = profileEntity.policies[requests[i].data[j].entityId];
        // require(policyEntity.adminId != bytes32(0), "Not Found");      
        // IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, policyEntity.adminId, senderId, functionId);
        // if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        // require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        // policyEntity.alstat = requests[i].data[j].alstat;
        emit ProfilePolicyAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;  
  }

  function profilePolicyUpdateRoleLimit(ProfilePolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateRoleLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].limits.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].limits[j].policyId, senderId, functionId);
        require(requests[i].limits[j].roleLimit > policyEntity.roles.length(), "Illegal Limit");
        policyEntity.roleLimit = requests[i].limits[j].roleLimit;            
        emit ProfilePolicyRoleLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].policyId, requests[i].limits[j].roleLimit);
      }
    }
    return true;
  }

  function profilePolicyCheckId(bytes32 profileId, bytes32 policyId) external view returns (bool) {
    return _data.profiles[profileId].policies[policyId].adminId != bytes32(0);
  }

  function profilePolicyCheckName(bytes32 profileId, string calldata policyName) external view returns (bool) {
    return _data.profiles[profileId].policies[LACLUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function profilePolicyCheckAdmin(bytes32 profileId, bytes32 policyId, address account) external view returns (bool) {
    return LProfileRolePolicy.profilePolicyCheckAdmin(_data, profileId, policyId, account);
    // ProfileEntity storage profileEntity = _data.profiles[profileId];
    // if(profileEntity.acstat == ActivityStatus.NONE) return false;
    
    // PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    // if(policyEntity.adminId == bytes32(0)) return false;
    
    // bytes32 policyAdminId = policyEntity.adminId;
    // AgentType agentType = profileEntity.agents[policyAdminId].atype;
    // bytes32 memberId = LACLUtils.accountGenerateId(account);

    // if(agentType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(policyEntity.adminId);
    //   if(!result) return false;

    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return false;  

    //   return typeEntity.members[memberId] != bytes32(0);
    
    // } else if(agentType == AgentType.TYPE) {
    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(policyAdminId);
    //   if(!result1) return false;  

    //   return typeEntity.members[memberId] != bytes32(0);  
    // }
    // return true;
  }

  function profilePolicyCheckAccess(bytes32 profileId, bytes32 policyId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, policyId, functionId);
  }

  function profilePolicyCheckRoleAccess(bytes32 profileId, bytes32 roleId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, profileEntity.rolePolicyMap[roleId], functionId);
  }

  function _doCheckAccessPolicy(ProfileEntity storage profileEntity, bytes32 policyId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if(policyEntity.acstat != ActivityStatus.ENABLED) return false;
    if(policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  
  }

  function profilePolicyCheckRole(bytes32 profileId, bytes32 roleId) external view returns (bool) {
      return _data.profiles[profileId].rolePolicyMap[roleId] != bytes32(0);
  }

  function profilePolicyHasRole(bytes32 profileId, bytes32 policyId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].rolePolicyMap[roleId] == policyId;
  }

  function profilePolicyGetInfoByRole(bytes32 profileId, bytes32 roleId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(_data.profiles[profileId].rolePolicyMap[roleId], roleId);
  }

  function profilePolicyGetInfo(bytes32 profileId, bytes32 policyId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(profileId, policyId);
  }

  function _doPolicyGetInfo(bytes32 profileId, bytes32 policyId) internal view returns (ProfilePolicyInfo memory) {
    return LProfileRolePolicy.profilePolicyGetInfo(_data, profileId, policyId);
    // ProfileEntity storage profileEntity = _data.profiles[profileId];
    // if(profileEntity.policies[policyId].acstat == ActivityStatus.NONE || profileEntity.acstat == ActivityStatus.NONE) {
    //   return ProfilePolicyInfo ({
    //     adminId: bytes32(0),
    //     scopeId: bytes32(0),
    //     name: "",
    //     roleLimit: 0,
    //     roleCount: 0,
    //     policyCode: 0,
    //     adminType: AgentType.NONE,
    //     scopeType: ScopeType.NONE,
    //     ptype: PolicyType.UNLOCK, 
    //     acstat: ActivityStatus.NONE, 
    //     alstat: AlterabilityStatus.NONE
    //   });
    // }

    // return ProfilePolicyInfo ({
    //   adminId: profileEntity.policies[policyId].adminId,
    //   scopeId: profileEntity.policies[policyId].scopeId,
    //   name: profileEntity.policies[policyId].name,
    //   roleLimit: profileEntity.policies[policyId].roleLimit,
    //   roleCount: uint16(profileEntity.policies[policyId].roles.length()),
    //   policyCode: profileEntity.policies[policyId].policyCode,
    //   adminType: profileEntity.agents[profileEntity.policies[policyId].adminId].atype,
    //   scopeType: profileEntity.scopes[profileEntity.policies[policyId].scopeId].stype,
    //   ptype: profileEntity.policies[policyId].ptype, 
    //   acstat: profileEntity.policies[policyId].acstat, 
    //   alstat: profileEntity.policies[policyId].alstat
    // });
  }

  function profilePolicyGetRoles(bytes32 profileId, bytes32 policyId) external view returns (bytes32[] memory) {
    if(_data.profiles[profileId].policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.profiles[profileId].policies[policyId].roles.values();
  }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    return LProfileRolePolicy.profileGetPolicyType(policyCode);
    // if(policyCode == 0) {
    //   return PolicyType.UNLOCK;

    // } else if(policyCode <= 63) {
    //   return PolicyType.SLOCK;

    // } else if(policyCode <= 127) {
    //   return PolicyType.MLOCK;

    // } else if(policyCode <= 191) {
    //   return PolicyType.RLOCK;

    // } else if(policyCode <= 254) {
    //   return PolicyType.HLOCK;

    // } else {
    //   return PolicyType.LOCK;
    // } 
  }

  // function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
  //   AgentType atype = profileEntity.agents[agentId].atype;
  //   if (atype == AgentType.ROLE) {
  //     RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
  //     BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
  //     return (baseScope.stype, roleEntity.scopeId);

  //   } else if(atype == AgentType.TYPE) {
  //     TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
  //     BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
  //     return (baseScope.stype, typeEntity.scopeId);
  //   }

  //   return (ScopeType.NONE, bytes32(0));  
  // }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileRolePolicy.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
    // // owners always access to all entities to modify those
    // if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    // (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    // if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;

    // // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    // AgentType adminAgentType = profileEntity.agents[adminId].atype;
    // if(adminAgentType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
    //   if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
    //   if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    // } else if(adminAgentType == AgentType.TYPE) { 
    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

    //   bytes32 roleId = typeEntity.members[senderId];
    //   (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    //   if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    // } 

    // return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
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
    return (profileEntity, functionId);
  }

  function _getMemberPolicyScopeInfo(ProfileEntity storage profileEntity, address account) internal view returns (ScopeType, bytes32){
    bytes32 memberId = LACLUtils.accountGenerateId(account);  
    TypeEntity storage policyMasterType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole =  profileEntity.profileRoleReadSlot(senderRoleId);
    return (profileEntity.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 policyAdminId) {
    return LProfileRolePolicy.profileGetPolicyAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  // checking requested type admin       
    // if(adminId != bytes32(0)) {
    //   require(profileEntity.agents[adminId].atype == AgentType.ROLE, "Illegal Admin AgentType");
    //   (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
    //   require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
    //   if(requestScopeType == requestAdminScopeType) {
    //     require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
    //   } else {
    //     require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, requestAdminScopeId, scopeId), "Illegal Admin Scope");
    //   }
    //   policyAdminId = adminId;

    // } else {
    //   policyAdminId = requestScopeAdmin;
    // }      
  }
  
  function _doGetPolicyAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 policyId, bytes32 memberId, bytes32 functionId) internal view returns (PolicyEntity storage) {
    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");      
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, policyEntity.adminId, memberId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType, bytes32 profileId) internal view returns (BaseScope storage){
    return LProfileRolePolicy.profileGetAndCheckRequestScope(profileEntity, requestScopeId, senderScopeId, senderScopeType, profileId);
    // // checking requested type scope
    // BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    // require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
    // require(requestedScope.acstat > ActivityStatus.DELETED , "Deleted");
  
    // require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    // if(requestedScope.stype == senderScopeType) {
    //   require(requestScopeId == senderScopeId, "Illegal Scope");
    // } else {        
    //   require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, senderScopeId, requestScopeId), "Illegal Scope");
    // }      

    // return requestedScope;
  }     

  // function _doPolicyRegister(ProfileEntity storage profileEntity, ProfilePolicyRegisterDataRequest calldata request, bytes32 profileId, ScopeType senderScopeType, bytes32 senderScopeId) internal {
  //   bytes32 newPolicyId = LACLUtils.generateId(request.name);
  //   require(profileEntity.policies[newPolicyId].acstat == ActivityStatus.NONE , "Already Exist");
    
  //   // // checking requested type scope
  //   BaseScope storage requestedScope = _getAndCheckRequestScope(profileEntity, request.scopeId, senderScopeId, senderScopeType, profileId);

  //   // create policy entity
  //   PolicyEntity storage policyEntity = profileEntity.policies[newPolicyId];
  //   policyEntity.ptype = _doGetPolicyType(request.policyCode);
  //   policyEntity.policyCode = request.policyCode;
  //   policyEntity.acstat = ActivityStatus.ENABLED;
  //   policyEntity.alstat = AlterabilityStatus.UPGRADABLE;
  //   policyEntity.name = request.name;
  //   policyEntity.scopeId = request.scopeId;
  //   policyEntity.roleLimit = profileEntity.limits.policyRoleLimit;
  //   policyEntity.adminId = _getPolicyAdmin(profileEntity, requestedScope.stype, requestedScope.adminId, request.scopeId, request.adminId, profileId);
  //   emit ProfilePolicyRegistered(
  //     msg.sender,
  //     profileId,
  //     newPolicyId,
  //     request.scopeId, 
  //     request.adminId,
  //     request.policyCode
  //   );
  // }

  // function _doPolicyUpdateScope(ProfileEntity storage profileEntity, ProfileScopeRequest calldata request, bytes32 profileId, bytes32 senderId, bytes32 functionId) internal {
  //   ScopeType senderScopeType;
  //   bytes32 senderScopeId;
  //   PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, request.entityId, senderId, functionId);    

  //   AgentType adminAgentType = profileEntity.agents[policyEntity.adminId].atype;
  //   if(adminAgentType == AgentType.ROLE) {
  //     RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(policyEntity.adminId);
  //     senderScopeId = roleEntity.scopeId;
  //     senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
  //   } else {
  //     TypeEntity storage agentType = profileEntity.profileTypeReadSlot(policyEntity.adminId);
  //     bytes32 memberRoleId = agentType.members[senderId];
  //     RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
  //     senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
  //     senderScopeId = memberAgentRole.scopeId;
  //   }
    
  //   BaseScope storage requestScope = _getAndCheckRequestScope(profileEntity, request.scopeId, senderScopeId, senderScopeType, profileId);
  //   require(requestScope.stype > _data.scopes[policyEntity.scopeId].stype, "Illegal ScopeType");   
  //   policyEntity.scopeId = request.scopeId;
  //   emit ProfilePolicyScopeUpdated(msg.sender, profileId, request.entityId, request.scopeId);
  // }
}