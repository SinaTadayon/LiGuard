// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRoleManagement.sol";
import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../IProfileACL.sol";
import "../ProfileAccessControl.sol";
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

      // check profile and role limitations and update it
      ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
      require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(profileMemberEntity.registerLimits.roleRegisterLimit - uint16(requests[i].roles.length) > 0, "Illegal RoleRegisterLimit");
      require(profileEntity.registerLimits.roleRegisterLimit - uint16(requests[i].roles.length) > 0, "Illegal RegisterLimit");
      profileMemberEntity.registerLimits.roleRegisterLimit -= uint16(requests[i].roles.length); 
      profileEntity.registerLimits.roleRegisterLimit -= uint16(requests[i].roles.length);

      for(uint j = 0; j < requests[i].roles.length; j++) {
        bytes32 newRoleId = LACLUtils.generateId(requests[i].roles[j].name);
        require(profileEntity.agents[newRoleId].atype == AgentType.NONE, "Role Already Exist");   
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
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, typeEntity.ba.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

        // check and get requested scope type
        ScopeType requestScopeType = _getAndCheckRequestScope(profileEntity, requests[i].roles[j].scopeId, typeEntity.scopeId);
        
        // add role to type 
        typeEntity.roles.add(newRoleId);

        // create role entity
        RoleEntity storage newRole = profileEntity.profileRoleWriteSlot(newRoleId);
        newRole.ba.atype = AgentType.ROLE;
        newRole.ba.acstat = ActivityStatus.ENABLED;
        newRole.ba.alstat = AlterabilityStatus.UPGRADABLE;
        newRole.name = requests[i].roles[j].name;
        newRole.scopeId = requests[i].roles[j].scopeId;
        newRole.memberLimit = profileEntity.limits.memberLimit;
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
        RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[i].data[j].entityId);
        require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");          
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");
        roleEntity.ba.acstat = requests[i].data[j].acstat;
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
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
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
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].roleId, senderId, functionId);
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
          ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].members[k]);
          if(profileMemberEntity.types.contains(roleEntity.typeId)) {
            require(typeEntity.members[requests[i].data[j].members[k]] != requests[i].data[j].roleId, "Already Exist");
          } else {
            require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
            require(profileMemberEntity.typeLimit > profileMemberEntity.types.length(), "Illegal TypeLimit");
            _updateProfileAccount(requests[i].profileId, roleEntity.typeId, profileMemberEntity, false);
            // check and add member from admin
            if(roleEntity.typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) 
              profileEntity.admins.add(requests[i].data[j].members[k]);          
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
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

        for (uint256 k = 0; k < requests[i].data[j].members.length; k++) {
          ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].members[k]);
          require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
          // require(memberEntity.types.length() > 1, "Illegal Member");

          require(typeEntity.members[requests[i].data[j].members[k]] != bytes32(0), "Not Found");
          require(roleEntity.memberCount > 0, "Illegal MemberTotal");
          delete typeEntity.members[requests[i].data[j].members[k]];
          unchecked { 
            roleEntity.memberCount -= 1; 
          }
          profileMemberEntity.types.remove(roleEntity.typeId);
          _updateProfileAccount(requests[i].profileId, roleEntity.typeId, profileMemberEntity, true);
          
          // check and remove member from admin
          if(profileEntity.admins.contains(requests[i].data[j].members[k])) {
            require(profileEntity.owner != requests[i].data[j].members[k], "Illegal Revoke");
            profileEntity.admins.remove(requests[i].data[j].members[k]);
          }
          
          if(profileMemberEntity.types.length() == 0) { 
            delete profileMemberEntity.ba;
            delete profileMemberEntity.callLimit;
            delete profileMemberEntity.typeLimit;
            delete profileMemberEntity.account;
            delete profileMemberEntity.registerLimits;
            delete profileMemberEntity.types;
            emit IProfileMemberManagement.ProfileMemberDeleted(msg.sender, requests[i].data[j].members[k], profileMemberEntity.account);            
          }
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
      return _doRoleHasMember(profileEntity, roleAdminId, memberId);
    
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;

    // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    } 

    return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
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
    IProfileACL.ProfileAuthorizationStatus status = ProfileAccessControl(address(this)).profileHasMemberAccess(profileEntity, functionId, senderId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
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
    // require(requestScope.agentLimit > requestScope.referredByAgent, "Illegal Referred");

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
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return roleEntity;
  }

  function _updateProfileAccount(bytes32 profileId, bytes32 typeId, ProfileMemberEntity storage profileMemberEntity, bool isRevoke) internal {
    ProfileAccount storage profileAccount = _data.profileAccounts[profileMemberEntity.account];
    bool findFlag = false;
    for (uint i = 0; i < profileAccount.profiles.length; i++) {
      if(profileAccount.profiles[i] == profileId) {
        findFlag = true;
        if(!isRevoke) {
          if((profileMemberEntity.types.contains(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) || 
            profileMemberEntity.types.contains(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)) &&
            (typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID || typeId == _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)) 
          {
            revert ("Illegal GrantMemberType");
          }      
        
        } else {          
          if(profileAccount.profiles.length > 1) {
            if(i < profileAccount.profiles.length - 1)
              profileAccount.profiles[i] = profileAccount.profiles[profileAccount.profiles.length - 1];                
            profileAccount.profiles.pop();
          } else {
            profileAccount.profiles.pop();
            delete profileAccount.profiles;
          }          
        }
        break;
      }
    }

    require(!findFlag, "Profile Not Found");
  }

  function _getAccountType(bytes32 typeId) internal returns (ProfileAccountType) {
    if(typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) {
      return ProfileAccountType.ADMIN;
    } else if(typeId == _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID) {
      return ProfileAccountType.SYSADMIN;
    } else {
      return ProfileAccountType.MEMBER;
    }
  }
}