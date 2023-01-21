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
  using LACLStorage for DataCollection;
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
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyRegister.selector);

      // check profile and type limitations and update it
      MemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(senderId);
      require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(memberEntity.registerLimits.policyRegisterLimit - uint16(requests[i].policies.length) > 0, "Illegal TypeRegisterLimit");
      require(profileEntity.limits.policyRegisterLimit - uint16(requests[i].policies.length) > 0, "Illegal RegisterLimit");
      memberEntity.registerLimits.policyRegisterLimit -= uint16(requests[i].policies.length); 
      profileEntity.limits.policyRegisterLimit -= uint16(requests[i].policies.length);

      (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(profileEntity, msg.sender);

      for(uint j = 0; j < requests[i].policies.length; j++) {
        bytes32 newPolicyId = LACLUtils.generateId(requests[i].policies[j].name);
        require(profileEntity.policies[newPolicyId].acstat == ActivityStatus.NONE , "Already Exist");
       
        // // checking requested type scope
        BaseScope storage requestedScope = _getAndCheckRequestScope(profileEntity, requests[i].policies[j].scopeId, senderScopeId, senderScopeType);

        // create policy entity
        PolicyEntity storage policyEntity = profileEntity.policies[newPolicyId];
        policyEntity.ptype = _doGetPolicyType(requests[i].policies[j].policyCode);
        policyEntity.policyCode = requests[i].policies[j].policyCode;
        policyEntity.acstat = ActivityStatus.ENABLED;
        policyEntity.alstat = AlterabilityStatus.UPGRADABLE;
        policyEntity.name = requests[i].policies[j].name;
        policyEntity.scopeId = requests[i].policies[j].scopeId;
        policyEntity.roleLimit = profileEntity.limits.policyRoleLimit;
        policyEntity.adminId = _getPolicyAdmin(profileEntity, requestedScope.stype, requestedScope.adminId, requests[i].policies[j].scopeId, requests[i].policies[j].adminId);
        emit ProfilePolicyRegistered(
          msg.sender,
          requests[i].profileId,
          newPolicyId,
          requests[i].scopeId, 
          requests[i].adminId,
          requests[i].policyCode
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
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].policyId, senderId, functionId);      
        ScopeType policyScopeType = profileEntity.scopes[policyEntity.scopeId].stype;

        for (uint256 k = 0; k < requests[i].data[j].roles.length; k++) {
          require(profileEntity.rolePolicyMap[requests[i].data[j].roles[k]] == bytes32(0), "Already Exist");
          require(policyEntity.adminId != requests[i].data[j].roles[k], "Illegal Role");
          require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
          RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[i].data[j].roles[k]);
    
          ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
          require(roleScopeType <= policyScopeType, "Illegal RST");
          if(roleScopeType == policyScopeType) {
            require(roleEntity.scopeId == policyEntity.scopeId, "Illegal RS");
          } else {
            require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, policyEntity.scopeId, roleEntity.scopeId), "Illegal RS");
          }

          _data.rolePolicyMap[requests[i].data[j].roles[k]] = requests[i].data[j].policyId;
          policyEntity.roles.add(requests[i].data[j].roles[k]);
          emit ProfilePolicyRoleAdded(msg.sender, requests[i].profileId, requests[i].data[j].policyId, requests[i].data[j].roles[k]);
        }      
      }
    }
    return true;
  }

  // called by policy admin
  function profilePolicyRemoveRoles(ProfilePolicyRemoveRolesRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyRemoveRoles.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].policyId, senderId, functionId);
        for (uint256 k = 0; k < requests[i].data[j].roles.length && k < 32; k++) {
          require(policyEntity.roles.contains(requests[i].data[j].roles[k]), "Not Found");    
          delete _data.rolePolicyMap[requests[i].data[j].roles[k]];
          policyEntity.roles.remove(requests[i].data[j].roles[k]);
          emit ProfilePolicyRoleRemoved(msg.sender, requests[i].profileId, requests[i].data[j].policyId, requests[i].data[j].roles[k]);
        }      
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
        policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
        emit ProfilePolicyCodeUpdated(msg.sender, requests[i].profileId, requests[i].policies[j].policyId, requests[i].policies[j].policyCode, policyEntity.ptype);
      }
    }
    return true;
  }

  function profilePolicyUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateCodes.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);    
        policyEntity.adminId = _getPolicyAdmin(profileEntity, profileEntity.scopes[policyEntity.scopeId].stype, profileEntity.scopes[policyEntity.scopeId].adminId, policyEntity.scopeId, requests[i].data[j].adminId);
        require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal AID");
        emit ProfilePolicyAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profilePolicyUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateScope.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      ScopeType senderScopeType;
      bytes32 senderScopeId;
      for(uint j = 0; j < requests[i].data.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);    

        AgentType adminAgentType = profileEntity.agents[policyEntity.adminId].atype;
        if(adminAgentType == AgentType.ROLE) {
          RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(policyEntity.adminId);
          senderScopeId = roleEntity.scopeId;
          senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
        } else {
          TypeEntity storage agentType = profileEntity.profileTypeReadSlot(policyEntity.adminId);
          bytes32 memberRoleId = agentType.members[senderId];
          RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
          senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
          senderScopeId = memberAgentRole.scopeId;
        }
        
        BaseScope storage requestScope = _getAndCheckRequestScope(requests[i].data[j].scopeId, senderScopeId, senderScopeType);  
        require(requestScope.stype > _data.scopes[policyEntity.scopeId].stype, "Illegal ST");   
        policyEntity.scopeId = requests[i].data[j].scopeId;
        emit ProfilePolicyScopeUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].scopeId);
      }
    }
    return true;
  }

  function profilePolicyUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateCodes.selector);
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
        PolicyEntity storage policyEntity = profileEntity.policies[requests[i].data[j].entityId];
        require(policyEntity.adminId != bytes32(0), "Not Found");      
        IProfileACL.ProfileAccessAdminStatus status = _doCheckAdminAccess(profileEntity, policyEntity.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAccessAdminStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        policyEntity.alstat = requests[i].data[j].alstat;
        emit ProfilePolicyAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].id, requests[i].data[j].alstat);
      }
    }
    return true;  
  }

  function profilePolicyUpdateRoleLimit(ProfilePolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfilePolicyManagement.profilePolicyUpdateRoleLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].limits.length; j++) {
        PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].limits[j].policyId, memberId, functionId);
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    
    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if(policyEntity.adminId == bytes32(0)) return false;
    
    bytes32 policyAdminId = policyEntity.adminId;
    AgentType agentType = profileEntity.agents[policyAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(policyEntity.adminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(policyAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
    return true;
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
    return _doPolicyGetInfo(_data.profiles[profileId].rolePolicyMap[roleId]);
  }

  function profilePolicyGetInfo(bytes32 profileId, bytes32 policyId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(profileId, policyId);
  }

  function _doPolicyGetInfo(bytes32 profileId, bytes32 policyId) internal view returns (ProfilePolicyInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.policies[policyId].acstat == ActivityStatus.NONE || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfilePolicyInfo ({
        adminId: bytes32(0),
        scopeId: bytes32(0),
        name: "",
        roleLimit: 0,
        roleCount: 0,
        policyCode: 0,
        adminType: AgentType.NONE,
        scopeType: ScopeType.NONE,
        ptype: PolicyType.UNLOCK, 
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE
      });
    }

    return ProfilePolicyInfo ({
      adminId: profileEntity.policies[policyId].adminId,
      scopeId: profileEntity.policies[policyId].scopeId,
      name: profileEntity.policies[policyId].name,
      roleLimit: profileEntity.policies[policyId].roleLimit,
      roleCount: uint32(profileEntity.policies[policyId].roles.length()),
      policyCode: profileEntity.policies[policyId].policyCode,
      adminType: profileEntity.agents[profileEntity.policies[policyId].adminId].atype,
      scopeType: profileEntity.scopes[profileEntity.policies[policyId].scopeId].stype,
      ptype: profileEntity.policies[policyId].ptype, 
      acstat: profileEntity.policies[policyId].acstat, 
      alstat: profileEntity.policies[policyId].alstat
    });
  }

  function profilePolicyGetRoles(bytes32 profileId, bytes32 policyId) external view returns (bytes32[] memory) {
    if(_data.profiles[profileId].policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.profiles[profileId].policies[policyId].roles.values();
  }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    if(policyCode == 0) {
      return PolicyType.UNLOCK;

    } else if(policyCode <= 63) {
      return PolicyType.SLOCK;

    } else if(policyCode <= 127) {
      return PolicyType.MLOCK;

    } else if(policyCode <= 191) {
      return PolicyType.RLOCK;

    } else if(policyCode <= 254) {
      return PolicyType.HLOCK;

    } else {
      return PolicyType.LOCK;
    } 
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAccessAdminStatus) {
    // owners always access to all entities to modify those
    if(profileEntity.owners.contains(senderId)) return IProfileACL.ProfileAccessAdminStatus.PERMITTED;

    (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return IProfileACL.ProfileAccessAdminStatus.FUNCTION_NOT_FOUND;

    // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if(!result) return IProfileACL.ProfileAccessAdminStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAccessAdminStatus.ROLE_ACTIVITY_FORBIDDEN;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return IProfileACL.ProfileAccessAdminStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAccessAdminStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAccessAdminStatus.NOT_PERMITTED;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAccessAdminStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAccessAdminStatus.PERMITTED;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1) return IProfileACL.ProfileAccessAdminStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAccessAdminStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2) return IProfileACL.ProfileAccessAdminStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAccessAdminStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAccessAdminStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAccessAdminStatus.PERMITTED;
    } 

    return IProfileACL.ProfileAccessAdminStatus.NOT_PERMITTED;
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileEntity, functionId, senderId);
    if(status != ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId);
  }

  function _getMemberPolicyScopeInfo(ProfileEntity storage profileEntity, address account) internal view returns (ScopeType, bytes32){
    bytes32 memberId = LACLUtils.accountGenerateId(account);  
    TypeEntity storage policyMasterType = profileEntity.typeReadSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole =  profileEntity.profileRoleReadSlot(senderRoleId);
    return (profileEntity.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 policyAdminId) {
  // checking requested type admin       
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype == AgentType.ROLE, "Illegal AAT");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal AST");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal AS");
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, requestAdminScopeId, scopeId), "Illegal AS");
      }
      policyAdminId = adminId;

    } else {
      policyAdminId = requestScopeAdmin;
    }      
  }
  
  function _doGetPolicyAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 policyId, bytes32 memberId, bytes32 functionId) internal view returns (PolicyEntity storage) {
    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");      
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAccessAdminStatus status = _doCheckAdminAccess(profileEntity, policyEntity.adminId, memberId, functionId);
    if(status != IProfileACL.ProfileAccessAdminStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType) internal view returns (BaseScope storage){
    // checking requested type scope
    BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
    require(requestedScope.acstat > ActivityStatus.DELETED , "Deleted");
  
    require(requestedScope.stype <= senderScopeType, "Illegal ST");
    if(requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {        
      require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, senderScopeId, requestScopeId), "Illegal Scope");
    }      

    return requestedScope;
  }     
}