// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/acl/LAclUtils.sol";
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

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeRegister.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newTypeId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[newTypeId].atype == AgentType.NONE, "Type Already Exists");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // checking requested type scope
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Is Deleted");
       
      // TODO check compatiblity sender scope (function.agentId) with requested type scope

      // increase referred count to target scope
      requestedScope.referredByAgent +=1;
      emit ScopeReferredByAgentUpdated(msg.sender, requests[i].scopeId, newTypeId, requestedScope.referredByAgent, requestedScope.stype, ActionType.ADD);

      // check access
      require(_doTypeCheckAdminAccess(requestedScope.adminId, memberId, functionId), "Operation Not Permitted");
     
      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestedScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(requestedScope.stype == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Admin Scope");
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
        requests[i].adminId,
        requests[i].name,                
        requests[i].memberLimit,
        requests[i].roleLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }
    return true;
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
      require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested type admin 
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      if(requests[i].adminId != bytes32(0)) {
        ScopeType typeScopeType = _data.scopes[typeEntity.scopeId].stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        require(typeScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(typeScopeType == requestAdminScopeType) {
          require(requestAdminScopeId == typeEntity.scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, typeEntity.scopeId), "Illegal Admin Scope");
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
      _doTypeUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(ITypeManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, ITypeManagement.typeUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity Status");
      _doTypeUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
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
      emit TypeAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
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
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

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
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
      require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

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
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(typeAdminId);
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
    if(!result) return new bytes32[](0);
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
      roleTotal: uint16(te.roles.length()),
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

  function _doTypeUpdateActivityStatus(bytes32 typeId, ActivityStatus status, bytes32 functionId) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    TypeEntity storage typeEntity = _data.typeReadSlot(typeId);
    require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type Is Deleted");
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");
    require(_doTypeCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {
      BaseScope storage bs = _data.scopes[typeEntity.scopeId];
      require(bs.referredByAgent > 0, "Illegal Scope ReferredByAgent");
      unchecked {
        bs.referredByAgent -= 1;  
      }
      emit ScopeReferredByAgentUpdated(msg.sender, typeEntity.scopeId, typeId, bs.referredByAgent, bs.stype, ActionType.REMOVE);
    }

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
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }
}