// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRoleManagement.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../ACLStorage.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";


/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RoleManager is ACLStorage, BaseUUPSProxy, IRoleManagement {
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
      interfaceId == type(IRoleManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // type admins call roleRegister function
  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleRegister.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(memberEntity.limits.roleRegisterLimit - uint16(requests.length) > 0, "Illegal RegisterLimit");
    memberEntity.limits.roleRegisterLimit -= uint16(requests.length);

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRoleId = LACLUtils.generateId(requests[i].name);
      require(_data.agents[newRoleId].atype == AgentType.NONE, "Role Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );
      require(
        requests[i].typeId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID && 
        requests[i].typeId != _LIVELY_VERSE_ANY_TYPE_ID,
        "Illegal Type"
      );
      
      // check type 
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
      require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

      // check access
      IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      _doRegisterRole(requests[i], typeEntity, memberEntity, newRoleId);
    }
    return true;
  }

  // Note: Admin must be Role or Type, and it can't be a member 
  function roleUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);      
      roleEntity.ba.adminId = _getRoleAdmin(_data.scopes[roleEntity.scopeId].stype, _data.agents[roleEntity.typeId].adminId, roleEntity.scopeId, requests[i].adminId);
      emit RoleAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function roleUpdateScope(UpdateScopeRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleUpdateScope.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      _getAndCheckRequestScope(requests[i].scopeId, typeEntity.scopeId);
      BaseScope storage oldScope = _data.scopes[roleEntity.scopeId];
      require(oldScope.referredByAgent > 0, "Illeagl ReferredByAgent");
      oldScope.referredByAgent -= 1;
      roleEntity.scopeId = requests[i].scopeId;
      emit RoleScopeUpdated(msg.sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function roleUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {    
    bytes32 functionId = _accessPermission(IRoleManagement.roleUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      roleEntity.ba.acstat = requests[i].acstat;
      emit RoleActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function roleUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].id);          
      IACL.AdminAccessStatus status = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);      
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      roleEntity.ba.alstat = requests[i].alstat;
      emit RoleAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleUpdateMemberLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].roleId, senderId, functionId);
      require(requests[i].memberLimit > roleEntity.memberCount, "Illegal Limit");
      roleEntity.memberLimit = requests[i].memberLimit;      
      emit RoleMemberLimitUpdated(msg.sender, requests[i].roleId, requests[i].memberLimit);
    }
    return true;
  }

  function roleGrantMembers(RoleGrantMembersRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleGrantMembers.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].roleId, senderId, functionId);
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        require(roleEntity.memberCount < roleEntity.memberLimit, "Illegal Grant");
        MemberEntity storage memberEntity = _data.memberReadSlot(requests[i].members[j]);
        if(memberEntity.types.contains(roleEntity.typeId)) {
          require(typeEntity.members[requests[i].members[j]] != requests[i].roleId, "Already Exist");
        } else {
          require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
          require(memberEntity.limits.typeLimit > memberEntity.types.length(), "Illegal Member Types");

        if((memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID) || 
            memberEntity.types.contains(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID)) &&
            (roleEntity.typeId == _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID || 
            roleEntity.typeId == _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID)) {
          revert ("Illegal GrantMemberType");
        }      

          memberEntity.types.add(roleEntity.typeId);  
        }

        typeEntity.members[requests[i].members[j]] = requests[i].roleId;
        roleEntity.memberCount += 1;
        emit RoleMemberGranted(msg.sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }

  function roleRevokeMembers(RoleRevokeMembersRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRoleManagement.roleRevokeMembers.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(requests[i].roleId, senderId, functionId);

      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        MemberEntity storage memberEntity = _data.memberReadSlot(requests[i].members[j]);
        require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
        // require(memberEntity.types.length() > 1, "Illegal Member");

        require(typeEntity.members[requests[i].members[j]] != bytes32(0), "Not Found");
        require(roleEntity.memberCount > 0, "Illegal MemberTotal");
        delete typeEntity.members[requests[i].members[j]];
        unchecked { 
          roleEntity.memberCount -= 1; 
        }
        memberEntity.types.remove(roleEntity.typeId);
        if(memberEntity.types.length() == 0) { 
          delete memberEntity.ba;
          delete memberEntity.account;
          delete memberEntity.limits;
          delete memberEntity.types;
          emit RoleMemberDeleted(msg.sender, requests[i].members[j], requests[i].roleId, roleEntity.typeId, memberEntity.account);
        }
        emit RoleMemberRevoked(msg.sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }
  
 
  function roleCheckId(bytes32 roleId) external view returns (bool) {
    return _data.agents[roleId].atype == AgentType.ROLE;
  }

  function roleCheckName(string calldata roleName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function roleCheckAdmin(bytes32 roleId, address account) external view returns (bool) {
    if (_data.agents[roleId].atype != AgentType.ROLE) return false;    
    
    bytes32 roleAdminId = _data.agents[roleId].adminId;
    AgentType adminAgenType = _data.agents[roleAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(adminAgenType == AgentType.ROLE) {
      return _doRoleHasMember(roleAdminId, memberId);
    
    } else if(adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool) {
    return _doRoleHasMember(roleId, LACLUtils.accountGenerateId(account));
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) {
      return RoleInfo ({
        scopeId: bytes32(0),
        typeId: bytes32(0),
        adminId: bytes32(0),
        memberLimit: 0,
        memberCount: 0,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });
    }
    return RoleInfo ({
      scopeId: roleEntity.scopeId,
      typeId: roleEntity.typeId,
      adminId: roleEntity.ba.adminId,
      memberLimit: roleEntity.memberLimit,
      memberCount: roleEntity.memberCount,
      adminType: _data.agents[roleEntity.ba.adminId].atype,
      acstat: roleEntity.ba.acstat,
      alstat: roleEntity.ba.alstat,
      name: roleEntity.name
    });    
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
    // (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    // if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;

    // // if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;
    
    // AgentType adminAgentType = _data.agents[adminId].atype;
    // if(adminAgentType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
    //   if(!result) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

    //   (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
    //   if (typeEntity.members[memberId] != adminId) return IACL.AdminAccessStatus.NOT_PERMITTED;
      
    //   PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

    //   return IACL.AdminAccessStatus.PERMITTED;
   
    // } else if(adminAgentType == AgentType.TYPE) { 
    //   (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
    //   if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

    //   bytes32 roleId = typeEntity.members[memberId];
    //   (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
    //   if(!result2) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
    //   PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

    //   return IACL.AdminAccessStatus.PERMITTED;
    // } 

    // return IACL.AdminAccessStatus.NOT_PERMITTED;   
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return functionId;
  }

  function _getRoleAdmin(ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 roleAdminId) {
    // checking requested type admin       
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Amind Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      roleAdminId = adminId;

    } else {
      roleAdminId = requestScopeAdmin;
    }     
  }

  function _getAndCheckRequestScope(bytes32 requestScopeId, bytes32 typeScopeId) internal returns(ScopeType) {
    // checking requested role scope
    BaseScope storage requestScope = _data.scopes[requestScopeId];
    require(requestScope.stype != ScopeType.NONE , "Scope Not Found");
    require(requestScope.acstat > ActivityStatus.DELETED , "Scope Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent +=1;
    
    // checking requested role type scope with role scope
    ScopeType requestTypeScopeType = _data.scopes[typeScopeId].stype;
    require(requestTypeScopeType >= requestScope.stype, "Illegal Scope Type");
    if (requestTypeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(IACLGenerals(address(this)).isScopesCompatible(typeScopeId, requestScopeId), "Illegal Scope");
    }

    return requestScope.stype;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 roleId, bytes32 senderId, bytes32 functionId) internal view returns (RoleEntity storage) {
    RoleEntity storage roleEntity = _data.roleReadSlot(roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

    // check access admin role
    IACL.AdminAccessStatus status = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return roleEntity;
  }

  function _doRegisterRole(RoleRegisterRequest calldata request, TypeEntity storage typeEntity, MemberEntity storage memberEntity, bytes32 newRoleId) internal {
    // check and get requested scope type
    ScopeType requestScopeType = _getAndCheckRequestScope(request.scopeId, typeEntity.scopeId);
    
    // add role to type 
    typeEntity.roles.add(newRoleId);

    // create role entity
    RoleEntity storage newRole = _data.roleWriteSlot(newRoleId);
    newRole.ba.atype = AgentType.ROLE;
    newRole.ba.acstat = request.acstat;
    newRole.ba.alstat = request.alstat;
    newRole.name = request.name;
    newRole.scopeId = request.scopeId;
    newRole.memberLimit = memberEntity.limits.memberLimit;
    newRole.typeId = request.typeId;
    newRole.ba.adminId = _getRoleAdmin(requestScopeType, typeEntity.ba.adminId, request.scopeId, request.adminId);
    emit RoleRegistered(
      msg.sender,
      newRoleId,
      request.typeId, 
      newRole.ba.adminId,
      request.scopeId 
    );
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}