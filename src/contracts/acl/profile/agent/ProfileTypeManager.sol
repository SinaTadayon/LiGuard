// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../ACLStorage.sol";
import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile ACL Type Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileTypeManager is ACLStorage, BaseUUPSProxy, IProfileTypeManagement {
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
      interfaceId == type(IProfileTypeManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileTypeRegister(ProfileTypeRegisterRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity,) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
          
      // fetch scope type and scope id of sender
      (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, senderId);
      
      for(uint j = 0; j < requests[i].types.length; j++) {
        bytes32 newTypeId = LACLUtils.generateId(requests[i].types[j].name);
        require(profileEntity.agents[newTypeId].atype == AgentType.NONE, "Already Exist");
        // require(
        //   requests[i].acstat > ActivityStatus.DELETED && 
        //   requests[i].alstat > AlterabilityStatus.NONE,
        //   "Illegal Activity/Alterability"
        // );

        // checking requested type scope
        BaseScope storage requestedScope = _getAndCheckRequestScope(profileEntity, requests[i].types[j].scopeId, senderScopeId, senderScopeType);
      
        // create new type
        TypeEntity storage newType = _data.typeWriteSlot(newTypeId);
        newType.ba.atype = AgentType.TYPE;
        newType.ba.acstat = ActivityStatus.ENABLED;
        newType.ba.alstat = AlterablitiyStatus.UPGRADABLE;
        newType.scopeId = requests[i].types[j].scopeId;
        newType.roleLimit = profileEntity.limits.roleLimit;
        newType.name = requests[i].types[j].name;
        newType.ba.adminId = _getTypeAdmin(profileEntity, requestedScope.stype, requestedScope.adminId, requests[i].types[j].scopeId, requests[i].types[j].adminId);
        emit ProfileTypeRegistered(
          msg.sender,
          requests[i].profileId,
          newTypeId,
          requests[i].types[j].scopeId,
          requests[i].types[j].adminId
        );
      }
    }
    return true;
  }

  function profileTypeUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);

        // checking requested type admin   
        typeEntity.ba.adminId = _getTypeAdmin(
          profileEntity,
          profileEntity.scopes[typeEntity.scopeId].stype, 
          profileEntity.scopes[typeEntity.scopeId].adminId, 
          typeEntity.scopeId, 
          requests[i].data[j].adminId
        );

        emit ProfileTypeAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileTypeUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeUpdateScope.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      ScopeType senderScopeType;
      bytes32 senderScopeId;
      for(uint j = 0; j < requests[i].data.length; j++) {
        TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);

        AgentType adminAgentType = profileEntity.agents[typeEntity.ba.adminId].atype;
        if(adminAgentType == AgentType.ROLE) {
          RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(typeEntity.ba.adminId);
          senderScopeId = roleEntity.scopeId;
          senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
        } else {
          TypeEntity storage agentType = profileEntity.profileTypeReadSlot(typeEntity.ba.adminId);
          bytes32 memberRoleId = agentType.members[senderId];
          RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
          senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
          senderScopeId = memberAgentRole.scopeId;
        }
        
        BaseScope storage requestScope = _getAndCheckRequestScope(profileEntity, requests[i].data[j].scopeId, senderScopeId, senderScopeType);
        BaseScope storage oldScope = profileEntity.scopes[typeEntity.scopeId];
        require(requestScope.stype > oldScope.stype, "Illegal ScopeType");
        require(oldScope.referredByAgent > 0, "Illeagl ReferredByAgent");
        oldScope.referredByAgent -= 1;
        typeEntity.scopeId = requests[i].data[j].scopeId;
        emit ProfileTypeScopeUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].scopeId);
      }
    }
    return true;
  }

  function profileTypeUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(requests[i].data[j].entityId);
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        require(_doCheckAdminAccess(profileEntity, typeEntity.ba.adminId, senderId, functionId), "Forbidden");    
        require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");             
        typeEntity.ba.acstat = requests[i].acstat;
        emit ProfileTypeActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].id, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileTypeUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(requests[i].data[j].id);
        require(_doCheckAdminAccess(profileEntity, typeEntity.ba.adminId, senderId, functionId), "Forbidden");  
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        typeEntity.ba.alstat = requests[i].data[j].alstat;
        emit ProfileTypeAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileTypeUpdateRoleLimit(ProfileTypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileTypeManagement.profileTypeUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].limits.length; j++) {
        TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].typeId, senderId, functionId);
        require(requests[i].limits[j].roleLimit > typeEntity.roles.length(), "Illegal Limit");
        typeEntity.roleLimit = requests[i].limits[j].roleLimit;
        emit ProfileTypeRoleLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].typeId, requests[i].limits[j].roleLimit);
      }
    }
    return true;
  }

  function profileTypeCheckId(bytes32 profileId, bytes32 typeId) external view returns (bool) {
    return _data.profiles[profileId].agents[typeId].atype == AgentType.TYPE;
  }

  function profileTypeCheckName(bytes32 profileId, string calldata typeName) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function profileTypeCheckAdmin(bytes32 profileId, bytes32 typeId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    if (profileEntity.agents[typeId].atype != AgentType.TYPE) return false;    
    
    bytes32 typeAdminId = profileEntity.agents[typeId].adminId;
    AgentType adminAgentType = profileEntity.agents[typeAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(adminAgentType == AgentType.ROLE) {
      return _doRoleHasMember(profileEntity, typeAdminId, memberId);
    
    } else if(adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(typeAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function profileTypeHasAccount(bytes32 profileId, bytes32 typeId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[LACLUtils.accountGenerateId(account)] != bytes32(0);
  }

  function profileTypeHasRole(bytes32 profileId, bytes32 typeId, bytes32 roleId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.contains(roleId);
  }

  function profileTypeGetRoles(bytes32 profileId, bytes32 typeId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);    
    if(!result) return new bytes32[](0);
    return te.roles.values();
  }

  function profileTypeGetInfo(bytes32 profileId, bytes32 typeId) external view returns (ProfileTypeInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileTypeInfo ({
        scopeId: bytes32(0),
        adminId: bytes32(0),
        roleLimit: 0,
        roleCount: 0,    
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });    
    }

    return ProfileTypeInfo ({
      scopeId: te.scopeId,
      adminId: te.ba.adminId,      
      roleLimit: te.roleLimit,
      roleCount: uint32(te.roles.length()),
      atype: te.ba.atype,
      acstat: te.ba.acstat,
      alstat: te.ba.alstat,
      name: te.name
    });
  }

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
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

  // Note: Member could not assigned to any entities as admin
  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
    // owners always access to all entities to modify those
    if(profileEntity.owners.contains(senderId)) return true;
    
    (FunctionEntity storage functionEntity, bool res) = profileEntity.functionTryReadSlot(functionId);    
    if (!res) return false;

    if(profileEntity.agents[memberId].acstat != ActivityStatus.ENABLED) return false;

    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
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

  function _getTypeAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 typeAdminId) {
    // checking requested type admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Amind Scope");
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      typeAdminId = adminId;

    } else {
      typeAdminId = requestScopeAdmin;
    }
  }

  function _doGetMemberScopeInfoFromType(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {    
    TypeEntity storage agentType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    RoleEntity storage memberAgentRole =  profileEntity.profileRoleReadSlot(memberRoleId);
    return (profileEntity.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId, bytes32 functionId) internal view returns (TypeEntity storage) {
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_doCheckAdminAccess(profileEntity, typeEntity.ba.adminId, senderId, functionId), "Forbidden");
    return typeEntity;
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType) internal returns (BaseScope storage){
    // checking requested type scope
    BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != ScopeType.NONE , "Not Found");
    require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");
    require(requestedScope.agentLimit > requestedScope.referredByAgent, "Illegal Referred");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;
          
    // check sender scope with request scope
    require(senderScopeType >= requestedScope.stype, "Illegal Sender ScopeType");
    if(senderScopeType == requestedScope.stype) {
      require(senderScopeId == requestScopeId, "Illegal Sender Scope");

    } else {
      require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, senderScopeId, requestScopeId), "Illegal Admin Scope");
    }       

    return requestedScope;
  }     
}