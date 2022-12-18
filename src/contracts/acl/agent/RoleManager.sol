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
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");

      // check access
      require(_doRoleCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested role scope
      BaseScope storage requestRoleScope = _data.scopes[requests[i].scopeId];
      require(requestRoleScope.stype != ScopeType.NONE , "Scope Not Found");
     
      // checking requested role type scope with role scope
      ScopeType requestTypeScopeType = _data.scopes[typeEntity.scopeId].ba.stype;
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
        if(adminBaseAgent.atype == AgentType.Role) {
          require(requestRoleScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(requestRoleScope.stype == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
          } else {
            require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Role Scope");
          }
        }     

        newRole.ba.adminId = requests[i].adminId;

      } else {
        newRole.ba.adminId = typeEntity.ba.adminId;
      }
      
      // Create New Role
      newRole.ba.atype = AgentType.ROLE;
      newRole.ba.acstat = requests[i].acstat;
      newRole.ba.alstat = requests[i].alstat;
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

  function roleUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].memberId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Member is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");

       // check access admin role
      require(_doRoleCheckAdminAccess(roleEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        ScopeType roleScopeType = _data.agents[scopeId].bs.stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        if(adminBaseAgent.atype == AgentType.Role) {
          require(roleScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(roleScopeType == requestAdminScopeType) {
            require(requestAdminScopeId == roleScopeType, "Illegal Amind Scope");
          } else {
            require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, roleScopeType), "Illegal Role Scope");
          }
        }     
        roleEntity.ba.adminId = requests[i].adminId;

      } else {
        roleEntity.ba.adminId = typeEntity.ba.adminId;
      }

      emit RoleAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }
 
  function roleDeleteActivity(bytes32[]  calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      _doRoleUpdateActivityStatus(requests[i].id, ActivityStatus.DELETED);
    }
  }

  function roleUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity Status");
      _doRoleUpdateActivityStatus(requests[i].id, requests[i].acstat);
    }
  }

  function roleUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i].id];
      require(baseAgent.acstat > ActivityStatus.DELETED, "Role Is Deleted");

      require(_doRoleCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");
    
      baseAgent.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i], requests[i].alstat);
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
        typeEntity.members[requests[i].members[j]] = requests[i].roleId;
        roleEntity.memberTotal += 1;
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
        require(roleEntity.memberTotal > 0, "Illegal Role MemberTotal");
        delete typeEntity.members[requests[i].members[j]];
        unchecked { roleEntity.memberTotal -= 1; }
        emit RoleMemberRevoked(msg.sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }
  
  function roleUpdateReferredByScope(UpdateReferredByRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
   
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleRevokeMembers.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      // require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      // require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      
      // TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      // require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      // require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      
      // check scope admin
      bytes32 scopeAdmin = _data.scopes[requests[i].entityId].admin;
      require(_doRoleCheckAdminAccess(scopeAdmin, memberId, functionId), "Operation Not Permitted");

      if(requests[i].action == ActionType.ADD) {
        require(roleEntity.ba.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
        roleEntity.ba.referredByScope += 1;
        emit RoleReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, requests[i].action);
      
      } else if(requests[i].action == ActionType.REMOVE) {
          require(roleEntity.ba.referredByScope > 0, "Illegal ReferredByScope Remove");
          unchecked { roleEntity.ba.referredByScope -= 1; }
          emit RoleReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, requests[i].action);
      } else {
        revert ("Illegal Action Type");
      }
    }
    return true;
  }

  function roleUpdateReferredByPolicy(UpdateReferredByRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateReferredByPolicy.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      // require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      // require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      
      // TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      // require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      // require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      
      // check policy admin
      bytes32 policyAdmin = _data.policies[requests[i].entityId].admin;
      require(_doRoleCheckAdminAccess(policyAdmin, memberId, functionId), "Operation Not Permitted");

      if(requests[i].action == ActionType.ADD) {
        require(roleEntity.ba.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
        roleEntity.ba.referredByPolicy += 1;
        emit AgentReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, requests[i].action);
      
      } else if(requests[i].action == ActionType.REMOVE) {
        require(roleEntity.ba.referredByPolicy > 0, "Illegal ReferredByPolicy Remove");
        unchecked { roleEntity.ba.referredByPolicy -= 1; }
        emit AgentReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, requests[i].action);
      
      } else {
        revert ("Illegal Action Type");
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

  function _doRoleUpdateActivityStatus(bytes32 roleId, AlterabilityStatus status) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleUpdateActivityStatus.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    BaseAgent storage baseAgent = _data.agents[roleId];
    require(baseAgent.acstat > ActivityStatus.DELETED, "Role Is Deleted");
    require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");
    require(_doRoleCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");

    baseAgent.acstat = status;
    emit MemberActivityUpdated(msg.sender, roleId, status);
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

  // function roleGenerateId(string calldata name) external pure returns (bytes32) {
  //   return keccak256(abi.encodePacked(name));
  // }

  // function roleGetMemberLimit(bytes32 roleId) external view returns (uint24) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.memberLimit;
  // }

  // function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.acstat;
  // }

  // function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.alstat;
  // }

  // function roleGetName(bytes32 roleId) external view returns (string memory) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.name;
  // }

  // function roleGetScope(bytes32 roleId) external view returns (ScopeType, bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return (_data.scopes[re.scopeId].stype, re.scopeId);
  // }

  // function roleGetType(bytes32 typeId) external view returns (bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.typeId;
  // }

  // function roleGetAdmin(bytes32 roleId) external view returns (bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.adminId;
  // }

    // function roleIncreaseMember(bytes32 roleId, uint32 count) external returns (uint32) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleIncreaseCountMember.selector), "Access Denied");
    
  //   // check admin role
  //   require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

  //   RoleEntity storage role = _data.roleReadSlot(roleId);
  //   role.totalMember += count;
  //   require(role.totalMember <= role.roleLimit, "Illegal Role Member Count");
  //   emit RoleMemberIncreased(msg.sender, roleId, role.totalMember);
  //   return role.totalMember;    
  // }

  // function roleDecreaseMember(bytes32 roleId, uint32 count) external returns (uint32) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleDecreaseCountMember.selector), "Access Denied");

  //   // check admin role
  //   require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

  //   RoleEntity storage role = _data.roleReadSlot(roleId);
  //   require(role.totalMember >= count, "Illegal Role Member Count");
  //   unchecked {
  //     role.totalMember -= count;
  //   }
  //   emit RoleMemberDecreased(msg.sender, roleId, role.totalMember);
  //   return role.totalMember;
  // }

  // function roleIncreaseMembers(RoleIncreaseMemberCountRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleIncreaseCountMembers.selector), "Access Denied");

  //   for (uint i = 0; index < requests.length; i++) {
  //     // check admin role  
  //     require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

  //     RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
  //     role.totalMember += requests[i].count;
  //     require(role.totalMember <= role.roleLimit, "Illegal Role Member Count");
  //     emit RoleMemberDecreased(msg.sender, requests[i].roleId, role.totalMember);
  //   }
  //   return true;
  // }

  // function roleDecreaseMembers(RoleDecreaseMemberCountRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleDecreaseCountMembers.selector), "Access Denied");

  //   for (uint i = 0; index < requests.length; i++) {
  //     // check admin role
  //     require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");
  
  //     RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
  //     require(role.totalMember >= requests[i].count, "Illegal Role Member Count");
  //     unchecked {
  //       role.totalMember -= requests[i].count;
  //     }
  //     emit RoleMemberDecreased(msg.sender, requests[i].roleId, role.totalMember);
  //   }
  //   return true;
  // }



}