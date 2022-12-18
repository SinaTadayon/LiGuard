// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRoleManagement.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "./AgentCommons.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RoleManager is AgentCommons, IRoleManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // type admins can call roleRegister function
  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleRegister.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRoleId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[roleId].atype == AgentType.NONE, "Role Already Exists");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // check type 
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Role Register");

      // check access
      require(_doRoleCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested role scope
      BaseScope storage requestRoleScope = _data.scopes[requests[i].scopeId];
      require(requestRoleScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestRoleScope.acstat > ActivityStatus.DELETED , "Scope Is Deleted");

      // increase referred count to target scope
      requestRoleScope.referredByAgent +=1;
      emit ScopeReferredByAgentUpdated(msg.sender, requests[i].scopeId, newRoleId, requestRoleScope.referredByAgent, requestRoleScope.stype, ActionType.ADD);
     
      // checking requested role type scope with role scope
      ScopeType requestTypeScopeType = _data.scopes[typeEntity.scopeId].stype;
      require(requestTypeScopeType >= requestRoleScope.stype, "Illegal Type Scope");
      if (requestTypeScopeType == requestRoleScope.stype) {
        require(requestTypeScopeId == requests[i].scopeId, "Illegal Type Scope ID");
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestTypeScopeId, requests[i].scopeId), "Illegal Type Scope ID");
      }

      // add role to type 
      typeEntity.roles.add(newRoleId);

      // create role entity
      RoleEntity storage newRole = _data.roleWriteSlot(newRoleId);
       
      // checking requested role admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestRoleScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(requestRoleScope.stype == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Role Scope");
        }
        newRole.ba.adminId = requests[i].adminId;

      } else {
        newRole.ba.adminId = typeEntity.ba.adminId;
      }
      
      // Create New Role
      newRole.ba.atype = AgentType.ROLE;
      newRole.ba.acstat = requests[i].acstat;
      newRole.ba.alstat = requests[i].alstat;
      newRole.ba.referredByPolicy = 0;
      newRole.ba.referredByScope = 0;
      newRole.name = requests[i].name;
      newRole.scopeId = requests[i].scopeId;
      newRole.memberLimit = requests[i].memberLimit;
      newRole.memberTotal = 0;
      newRole.typeId = requests[i].typeId;

      emit RoleRegistered(
        msg.sender,
        newRoleId,
        requests[i].typeId, 
        requests[i].name,
        newRole.ba.adminId,
        requests[i].scopeId, 
        requests[i].memberLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }
  }

  // Note: Admin must be Role or Type, and it can't be a member 
  function roleUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].id);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");

       // check access admin role
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(roleScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(roleScopeType == requestAdminScopeType) {
          require(requestAdminScopeId == roleEntity.scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, roleEntity.scopeId), "Illegal Role Scope");
        }
        roleEntity.ba.adminId = requests[i].adminId;

      } else {
        roleEntity.ba.adminId = typeEntity.ba.adminId;
      }

      emit RoleAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }
 
  function roleDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doRoleUpdateActivityStatus(requests[i].id, ActivityStatus.DELETED, functionId);
    }
  }

  function roleUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity Status");
      _doRoleUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
  }

  function roleUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");
    
      roleEntity.ba.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateMemberLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      roleEntity.typeLimit = requests[i].memberLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].roleId, requests[i].memberLimit);
    }
    return true;
  }

  function roleGrantMembers(RoleGrantMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleGrantMembers.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");  

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        require(_data.agents[requests[i].members[j]].ba.atype == AgentType.MEMBER, "Illegal Member AgentType");
        require(typeEntity.members[requests[i].members[j]] == bytes32(0), "Member Already Exists");
        require(roleEntity.memberTotal < roleEntity.memberLimit, "Illegal Role Grant Member");
        require(typeEntity.memberTotal < typeEntity.memberLimit, "Illegal Type Add Member");
        typeEntity.members[requests[i].members[j]] = requests[i].roleId;
        roleEntity.memberTotal += 1;
        typeEntity.memberTotal += 1;
        emit RoleMemberGranted(msg.sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }

  function roleRevokeMembers(RoleRevokeMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleRevokeMembers.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");  

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        require(_data.agents[requests[i].members[j]].ba.atype == AgentType.MEMBER, "Invalid Member AgentType");
        require(typeEntity.members[requests[i].members[j]] != bytes32(0), "Member Not Found");
        require(typeEntity.memberTotal > 0, "Illegal Type MemberTotal");
        require(roleEntity.memberTotal > 0, "Illegal Role MemberTotal");
        delete typeEntity.members[requests[i].members[j]];
        unchecked { 
          roleEntity.memberTotal -= 1; 
          typeEntity.memberTotal -= 1; 
        }
        emit RoleMemberRevoked(msg.sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }
  
  // function roleUpdateReferredByScope(UpdateReferredByRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
   
  //   address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
  //   bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleRevokeMembers.selector); 
  //   require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

  //   bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
  //   for(uint i = 0; i < requests.length; i++) {      
  //     RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
  //     // require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
  //     // require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      
  //     // TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
  //     // require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
  //     // require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      
  //     // check scope admin
  //     bytes32 scopeAdmin = _data.scopes[requests[i].entityId].admin;
  //     require(_doRoleCheckAdminAccess(scopeAdmin, memberId, functionId), "Operation Not Permitted");

  //     if(requests[i].action == ActionType.ADD) {
  //       require(roleEntity.ba.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
  //       roleEntity.ba.referredByScope += 1;
  //       emit RoleReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, requests[i].action);
      
  //     } else if(requests[i].action == ActionType.REMOVE) {
  //         require(roleEntity.ba.referredByScope > 0, "Illegal ReferredByScope Remove");
  //         unchecked { roleEntity.ba.referredByScope -= 1; }
  //         emit RoleReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, requests[i].action);
  //     } else {
  //       revert ("Illegal Action Type");
  //     }
  //   }
  //   return true;
  // }

  // function roleUpdateReferredByPolicy(UpdateReferredByRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
  //   address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
  //   bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateReferredByPolicy.selector); 
  //   require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

  //   bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
  //   for(uint i = 0; i < requests.length; i++) {      
  //     RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
  //     // require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
  //     // require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      
  //     // TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
  //     // require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
  //     // require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      
  //     // check policy admin
  //     bytes32 policyAdmin = _data.policies[requests[i].entityId].admin;
  //     require(_doRoleCheckAdminAccess(policyAdmin, memberId, functionId), "Operation Not Permitted");

  //     if(requests[i].action == ActionType.ADD) {
  //       require(roleEntity.ba.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
  //       roleEntity.ba.referredByPolicy += 1;
  //       emit RoleReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, requests[i].action);
      
  //     } else if(requests[i].action == ActionType.REMOVE) {
  //       require(roleEntity.ba.referredByPolicy > 0, "Illegal ReferredByPolicy Remove");
  //       unchecked { roleEntity.ba.referredByPolicy -= 1; }
  //       emit RoleReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, requests[i].action);
      
  //     } else {
  //       revert ("Illegal Action Type");
  //     }
  //   }
  //   return true;
  // }


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
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(adminAgenType == AgentType.ROLE) {
      return _doRoleHasMember(roleAdminId, memberId);
    
    } else if(adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool) {
    return _doRoleHasMember(roleId, LAclUtils.accountGenerateId(account));
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
        memberTotal: 0,
        referredByScope: 0,
        referredByPolicy: 0,
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
      memberTotal: roleEntity.memberTotal,
      referredByScope: roleEntity.ba.referredByScope,
      referredByPolicy: roleEntity.ba.referredByPolicy,
      acstat: roleEntity.ba.acstat,
      alstat: roleEntity.ba.alstat,
      name: roleEntity.name
    });
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal returns (ScopeType, bytes32) {
    BaseAgent atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage TypeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

  function _doRoleUpdateActivityStatus(bytes32 roleId, AlterabilityStatus status, bytes32 functionId) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    RoleEntity storage roleEntity = _data.roleReadSlot(roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      if(status == ActivityStatus.DELETED) {
        BaseScope storage bs = _data.scopes[roleEntity.scopeId];
        require(bs.referredByAgent > 0, "Illegal Scope ReferredByAgent");
        unchecked {
          bs.referredByAgent -= 1;  
        }
        emit ScopeReferredByAgentUpdated(msg.sender, roleEntity.scopeId, roleId, bs.referredByAgent, bs.stype, ActionType.REMOVE);
      }

    roleEntity.ba.acstat = status;
    emit RoleActivityUpdated(msg.sender, roleId, status);
    return true;  
  }

  // Note: Member could not assigned to any entities as admin
  function _doRoleCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return false;

    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      if (typeEntity.members[memberId] != adminId) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(typeEntity.members[memberId]);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }
}