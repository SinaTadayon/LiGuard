// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRoleManagement.sol";
import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";


/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileRoleManager is ACLStorage, BaseUUPSProxy, IProfileRoleManagement {
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
      interfaceId == type(IProfileRoleManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // type admins call roleRegister function
  function profileRoleRegister(ProfileRoleRegisterRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].roles.length; j++) {
        bytes32 newRoleId = LACLUtils.generateId(requests[i].roles[j].name);
        require(profileEntity.agents[newRoleId].atype == AgentType.NONE, "Role Already Exist");
        // require(
        //   requests[i].acstat > ActivityStatus.DELETED && 
        //   requests[i].alstat > AlterabilityStatus.NONE,
        //   "Illegal Activity/Alterability"
        // );
        require(
          requests[i].roles[j].typeId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID && 
          requests[i].roles[j].typeId != _LIVELY_VERSE_ANY_TYPE_ID,
          "Illegal Type"
        );

        // check type 
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(requests[i].roles[j].typeId);
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
        require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

        // check access
        require(_doCheckAdminAccess(profileEntity, typeEntity.ba.adminId, senderId, functionId), "Forbidden");

        // check and get requested scope type
        ScopeType requestScopeType = _getAndCheckRequestScope(profileEntity, requests[i].roles[j].scopeId, typeEntity.scopeId);

        
        // add role to type 
        typeEntity.roles.add(newRoleId);

        // create role entity
        RoleEntity storage newRole = profileEntity.profilerRoleWriteSlot(newRoleId);
        newRole.ba.atype = AgentType.ROLE;
        newRole.ba.acstat = ActivityStatus.ENABLED;
        newRole.ba.alstat = AlterabilityStatus.UPGRADABLE;
        newRole.name = requests[i].roles[j].name;
        newRole.scopeId = requests[i].roles[j].scopeId;
        // newRole.memberLimit = requests[i].memberLimit;
        newRole.typeId = requests[i].roles[j].typeId;
        newRole.ba.adminId = _getRoleAdmin(profileEntity, requestScopeType, typeEntity.ba.adminId, requests[i].roles[j].scopeId, requests[i].roles[j].adminId);
        emit ProfileRoleRegistered(
          msg.sender,          
          requests[i].profileId,
          newRoleId,
          requests[i].roles[j].typeId, 
          newRole.ba.adminId,
          requests[i].roles[j].scopeId 
        );
      }
    }
    return true;
  }

  // Note: Admin must be Role or Type, and it can't be a member 
  function profileRoleUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        roleEntity.ba.adminId = _getRoleAdmin(profileEntity, _data.scopes[roleEntity.scopeId].stype, profileEntity.agents[roleEntity.typeId].adminId, roleEntity.scopeId, requests[i].data[j].adminId);
        emit ProfileRoleAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileRoleUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateScope.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
        _getAndCheckRequestScope(profileEntity, requests[i].data[j].scopeId, typeEntity.scopeId);
        BaseScope storage oldScope = profileEntity.scopes[roleEntity.scopeId];
        require(oldScope.referredByAgent > 0, "Illeagl ReferredByAgent");
        oldScope.referredByAgent -= 1;
        roleEntity.scopeId = requests[i].data[j].scopeId;
        emit ProfileRoleScopeUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].scopeId);
      }
    }
    return true;
  }

  function profileRoleUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = profileEntity.roleReadSlot(requests[i].data[j].entityId);
        require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");          
        require(_doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId), "Forbidden");
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");
        roleEntity.ba.acstat = requests[i].acstat;
        emit ProfileRoleActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileRoleUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {      
        RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[i].data[j].entityId);    
        require(_doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId), "Forbidden");          
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        roleEntity.ba.alstat = requests[i].data[j].alstat;
        emit ProfileRoleAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileRoleUpdateMemberLimit(ProfileRoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateMemberLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].limits.length; j++) {      
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].limits[j].roleId, senderId, functionId);
        require(requests[i].limits[j].memberLimit > roleEntity.memberCount, "Illegal Limit");
        roleEntity.memberLimit = requests[i].limits[j].memberLimit;      
        emit ProfileRoleMemberLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].roleId, requests[i].limits[j].memberLimit);
      }
    }
    return true;
  }

   function profileRoleGrantMembers(ProfileRoleGrantMembersRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleGrantMembers.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].roleId, senderId, functionId);
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

        for (uint256 k = 0; k < requests[i].data[j].members.length; k++) {
          require(roleEntity.memberCount < roleEntity.memberLimit, "Illegal Grant");
          MemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].members[k]);
          if(memberEntity.types.contains(roleEntity.typeId)) {
            require(typeEntity.members[requests[i].data[j].members[k]] != requests[i].data[j].roleId, "Already Exist");
          } else {
            require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
            require(memberEntity.typeLimit > memberEntity.types.length(), "Illegal Member Types");
            memberEntity.types.add(roleEntity.typeId);  
          }

          typeEntity.members[requests[i].data[j].members[k]] = requests[i].data[j].roleId;
          roleEntity.memberCount += 1;
          emit ProfileRoleMemberGranted(msg.sender, requests[i].profileId, requests[i].data[j].roleId, requests[i].data[j].members[k], roleEntity.typeId);
        }
      }
    }
    return true;
  }

  function profileRoleRevokeMembers(ProfileRoleRevokeMembersRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleRevokeMembers.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].roleId, senderId, functionId);
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
        // require(typeEntity.ba.acstat > ActivityStatus.DISABLED, "Type Disabled");
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

        for (uint256 k = 0; k < requests[i].data[j].members.length; k++) {
          MemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].members[k]);
          require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
          require(memberEntity.types.length() > 1, "Illegal Member");

          require(typeEntity.members[requests[i].data[j].members[k]] != bytes32(0), "Not Found");
          require(roleEntity.memberCount > 0, "Illegal MemberTotal");
          delete typeEntity.members[requests[i].data[j].members[k]];
          unchecked { 
            roleEntity.memberCount -= 1; 
          }
          memberEntity.types.remove(roleEntity.typeId);
          emit ProfileRoleMemberRevoked(msg.sender, requests[i].profileId, requests[i].data[j].roleId, requests[i].data[j].members[k], roleEntity.typeId);
        }
      }
    }
    return true;
  }
  
 
  function profileRoleCheckId(bytes32 profileId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].agents[roleId].atype == AgentType.ROLE;
  }

  function profileRoleCheckName(bytes32 profileId, string calldata roleName) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function profileRoleCheckAdmin(bytes32 profileId, bytes32 roleId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    if (profileEntity.agents[roleId].atype != AgentType.ROLE) return false;    
    
    bytes32 roleAdminId = profileEntity.agents[roleId].adminId;
    AgentType adminAgenType = profileEntity.agents[roleAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(adminAgenType == AgentType.ROLE) {
      return _doRoleHasMember(roleAdminId, memberId);
    
    } else if(adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function profileTypeHasAccount(bytes32 profileId, bytes32 typeId, address account) external view returns (bool) {
    
  }

  function profileRoleHasAccount(bytes32 profileId, bytes32 roleId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doRoleHasMember(profileEntity, roleId, LACLUtils.accountGenerateId(account));
  }

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }

  function profileRoleGetInfo(bytes32 profileId, bytes32 roleId) external view returns (ProfileRoleInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileRoleInfo ({
        scopeId: bytes32(0),
        typeId: bytes32(0),
        adminId: bytes32(0),
        memberLimit: 0,
        memberCount: 0,
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });
    }
    return ProfileRoleInfo ({
      scopeId: roleEntity.scopeId,
      typeId: roleEntity.typeId,
      adminId: roleEntity.ba.adminId,
      memberLimit: roleEntity.memberLimit,
      memberCount: roleEntity.memberCount,
      atype: roleEntity.ba.atype,
      acstat: roleEntity.ba.acstat,
      alstat: roleEntity.ba.alstat,
      name: roleEntity.name
    });
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = _data.agents[agentId].atype;
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

  // Note: Member could not assigned to any entities as admin
  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
    // owners always access to all entities to modify those
    if(profileEntity.owners.contains(senderId)) return true;
   
    (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return false;

    if(profileEntity.agents[memberId].acstat != ActivityStatus.ENABLED) return false;

    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profilrRoleTryReadSlot(adminId);
      if(!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      if (typeEntity.members[memberId] != adminId) return false;

      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
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

  function _getRoleAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 roleAdminId) {
    // checking requested type admin       
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Amind Scope");
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      roleAdminId = adminId;

    } else {
      roleAdminId = requestScopeAdmin;
    }     
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 typeScopeId) internal returns(ScopeType) {
    // checking requested role scope
    BaseScope storage requestScope = profileEntity.scopes[requestScopeId];
    require(requestScope.stype != ScopeType.NONE , "Scope Not Found");
    require(requestScope.acstat > ActivityStatus.DELETED , "Scope Deleted");
    require(requestScope.agentLimit > requestScope.referredByAgent, "Illegal Referred");

    // increase referred count to target scope
    requestScope.referredByAgent +=1;
    
    // checking requested role type scope with role scope
    ScopeType requestTypeScopeType = profileEntity.scopes[typeScopeId].stype;
    require(requestTypeScopeType >= requestScope.stype, "Illegal Scope Type");
    if (requestTypeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, typeScopeId, requestScopeId), "Illegal Scope");
    }

    return requestScope.stype;
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 senderId, bytes32 functionId) internal view returns (RoleEntity storage) {
    RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

    // check access admin role
    require(_doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId), "Forbidden");
    return roleEntity;
  }
}