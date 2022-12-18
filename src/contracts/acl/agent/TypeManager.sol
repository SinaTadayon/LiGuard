// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract TypeManager is AclStorage, ITypeManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bytes32) {
   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeRegister.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newTypeId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[roleId].atype == AgentType.NONE, "Type Already Exists");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // checking requested type scope
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Is Deleted");
       
      // increase referred count to target scope
      requestedScope.referredByAgent +=1;
      emit ScopeReferredByAgentUpdated(msg.sender, requests[i].scopeId, newTypeId, requestScope.referredByAgent, requestScope.stype, ActionType.ADD);

      // check access
      require(_doRoleCheckAdminAccess(requestedScope.adminId, memberId, functionId), "Operation Not Permitted");
     
      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        if(adminBaseAgent.atype == AgentType.Role) {
          require(requestedScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(requestedScope.stype == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
          } else {
            require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Role Scope");
          }
        }     

        newType.ba.adminId = requests[i].adminId;

      } else {
        newType.ba.adminId = requestedScope.adminId;
      }
            
      newType.ba.atype = AgentType.TYPE;
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      newType.ba.adminId = requests[i].adminId;
      newType.ba.referredByPolicy = 0;
      newType.ba.referredByScope = 0;
      newType.scopeId = requests[i].scopeId;
      newType.roleLimit = requests[i].roleLimit;
      newType.memberLimit = requests[i].memberLimit;
      newType.memberTotal = 0;
      newType.name = requests[i].name;

      emit TypeRegistered(
        msg.sender,
        newTypeId,
        requests[i].scopeId,
        requests[i].name,
        requests[i].adminId,                
        requests[i].memberLimit,
        requests[i].roleLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }
  }

  function typeUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");

      // check access admin role
      require(_doRoleCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested type admin 
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      if(requests[i].adminId != bytes32(0)) {
        ScopeType typeScopeType = _data.scopes[typeEntity.scopeId].stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        if(adminBaseAgent.atype == AgentType.Role) {
          require(typeScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(typeScopeType == requestAdminScopeType) {
            require(requestAdminScopeId == typeEntity.scopeId, "Illegal Amind Scope");
          } else {
            require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, typeEntity.scopeId), "Illegal Role Scope");
          }
        }     
        typeEntity.ba.adminId = requests[i].adminId;

      } else {
        typeEntity.ba.adminId = _data.scopes[requestAdminScopeId].adminId;
      }

      emit TypeAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function typeDeleteActivity(bytes32[]  calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doTypeUpdateActivityStatus(requests[i].id, ActivityStatus.DELETED, functionId);
    }
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity Status");
      _doTypeUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
  }

  function typeUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type Is Deleted");
      require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

    
      typeEntity.ba.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function typeUpdateRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateRoleLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.roleReadSlot(requests[i].typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      require(_doRoleCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      typeEntity.roleLimit = requests[i].roleLimit;
      emit TypeRoleLimitUpdated(msg.sender, requests[i].typeId, requests[i].roleLimit);
    }
    return true;
  }

  function typeUpdateMemberLimit(TypeUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateMemberLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.roleReadSlot(requests[i].typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      require(_doRoleCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      typeEntity.memberLimit = requests[i].memberLimit;
      emit TypeMemberLimitUpdated(msg.sender, requests[i].typeId, requests[i].memberLimit);
    }
    return true;
  }
 
  function typeCheckId(bytes32 typeId) external view returns (bool) {
    return _data.agents[typeId].atype == AgentType.TYPE;
  }

  function typeCheckName(string calldata typeName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function typeCheckAdmin(bytes32 typeId, address account) external view returns (bool) {
    if (_data.agents[typeId].atype != AgentType.TYPE) return false;    
    
    bytes32 typeAdminId = _data.agents[typeId].adminId;
    AgentType adminAgentType = _data.agents[typeAdminId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(adminAgentType == AgentType.ROLE) {
      return _doRoleHasMember(typeAdminId, memberId);
    
    } else if(adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[LAclUtils.accountGenerateId(account)] != bytes32(0);
  }

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.contains(roleId);
  }

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.values();
  }

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) {
    return TypeInfo ({
        scopeId: bytes32(0),
        adminId: bytes32(0),
        memberLimit: 0,
        memberTotal: 0,
        roleLimit: 0,
        roleTotal: 0,
        referredByScope: 0,
        referredByPolicy: 0,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });    
    }

    return TypeInfo ({
      scopeId: te.scopeId,
      adminId: te.ba.adminId,
      memberLimit: te.memberLimit,
      memberTotal: te.memberTotal,
      roleLimit: te.roleLimit,
      roleTotal: te.roles.length(),
      referredByScope: te.ba.referredByScope,
      referredByPolicy: te.ba.referredByPolicy,
      acstat: te.ba.acstat,
      alstat: te.ba.alstat,
      name: te.name
    });
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
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

  function _doTypeUpdateActivityStatus(bytes32 typeId, AlterabilityStatus status, bytes32 functionId) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    TypeEntity storage typeEntity = _data.typeReadSlot(typeId);
    require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type Is Deleted");
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
    require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

    typeEntity.ba.acstat = status;
    emit TypeActivityUpdated(msg.sender, typeId, status);
    return true;  
  }

  // Note: Member could not assigned to any entities as admin
  function _doTypeCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
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


  // function typeGenerateId(string calldata name) external pure returns (bytes32) {
  //   return keccak256(abi.encodePacked(name));
  // }

    // function typeHasMember(bytes32 typeId, bytes32 memberId) external view returns (bool) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.members[memberId] != bytes32(0);
  // }

  // function typeHasAgent(bytes32 typeId, bytes32 agentId) external view returns (bool) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   BaseAgent storage ba = _data.agents[agentId];
  //   if(ba.atype == AgentType.NONE) return false;
  //   else if (ba.atype == AgentType.MEMBER) return te.members[agentId] != bytes32(0);
  //   else if (ba.atype == AgentType.ROLE) return te.roles.contains(roleId);
  //   else return false;
  // }

    // function typeGetAccountRole(bytes32 typeId, address account) external view returns (bytes32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.members[keccak256(abi.encodePacked(account))];
  // }

  // function typeGetRoleLimit(bytes32 typeId) external view returns (uint8) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.roleLimit;
  // }

  // function typeGetActivityStatus(bytes32 typeId) external view returns (ActivityStatus) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.ba.acstat;
  // }

  // function typeGetAlterabilityStatus(bytes32 typeId) external view returns (AlterabilityStatus) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.ba.alstat;
  // }

  // function typeGetName(bytes32 typeId) external view returns (string memory) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.name;
  // }

  // function typeGetAdminId(bytes32 typeId) external view returns (bytes32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.adminId;
  // }

  // function typeGetGroupId(bytes32 typeId) external view returns (bytes32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.groupId;
  // }

  // function typeGetScopeId(bytes32 typeId) external view returns (ScopeType stype, bytes32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return (_data.scopes[te.scopeId].stype, te.scopeId);
  // }

  // function typeGetMembersCount(bytes32 typeId) external view returns (uint32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.memberTotal;
  // }


  // function typeGetRolesCount(bytes32 typeId) external view returns (uint8) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.roles.length();
  // }

    // function typeAddMembers(TypeAddMembersRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeAddMembers.selector), "Access Denied");
    
  //   for(uint i = 0; i < requests.length; i++) {
  //     // check admin of type
  //     require(_doTypeCheckAdminAccount(requests[i].typeId, msg.sender), "Operation Not Permitted");
  
  //     TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
  //     require(te.roles.contains(roleId), "Role Not Found");
      
  //     for(uint j = 0; j < requests[i].members.length; j++) {
  //       require(te.members[requests[i].members[j]] == bytes32(0), "Member Already Exist");
  //       te.members[requests[i].members[j]] = requests[i].roleId;

  //       MemberEntity storage me = _data.memberWriteSlot(requests[i].members[j]);
  //       require(me.typeLimit > me.types.length() + 1, "Illegal Increase Member Types");  
  //       me.types.add(requests[i].types[j]);

  //       emit TypeRoleMemberGranted(msg.sender, requests[i].typeId, requests[i].roleId, requests[i].members[j]);
  //     }
  //     te.memberTotal += requests[i].members.length;
  //     require(te.memberTotal <= te.memberLimit, "Illegal Increase Type Members");
  //     IRoleManagement(address(this)).roleIncreaseMember(requests[i].roleId, requests[i].members.length);
  //   }
  //   return true;
  // }

  // function typeRemoveMembers(TypeRemoveMembersRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeRemoveMembers.selector), "Access Denied");
    
  //   for(uint i = 0; i < requests.length; i++) {
  //     // check admin of type
  //     require(_doTypeCheckAdminAccount(requests[i].typeId, msg.sender), "Operation Not Permitted");

  //     TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
  //     require(te.roles.contains(roleId), "Role Not Found");      
  //     for(uint j = 0; j < requests[i].members.length; j++) {
  //       require(te.members[requests[i].members[j]] != bytes32(0), "Member Not Found");      
  //       delete te.members[requests[i].members[j]];

  //       MemberEntity storage me = _data.memberWriteSlot(requests[i].members[j]);
  //       me.types.remove(requests[i].types[j]);

  //       emit TypeRoleMemberRevoked(msg.sender, requests[i].typeId, requests[i].roleId, requests[i].members[j]);
  //     }
  //     require(te.totalMember >= requests[i].members.length, "Illegal Decerase Type Members");
  //     unchecked {
  //       te.totalMember -= requests[i].members.length;
  //     }    
  //     IRoleManagement(address(this)).roleIncreaseMember(requests[i].roleId, requests[i].members.length);
  //   }
  //   return true;
  // }


}