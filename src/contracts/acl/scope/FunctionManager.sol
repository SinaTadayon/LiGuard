// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/acl/LAclUtils.sol";
import "../../proxy/IProxy.sol";

/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract FunctionManager is AclStorage, IFunctionManagement {
  using LAclStorage for DataCollection;

  function functionUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool){
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

      // check access admin role
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

       // update function admin Id
      BaseAgent storage functionBaseAgent = _data.agents[functionEntity.bs.adminId];
      require(functionBaseAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { functionBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.bs.adminId, 
        requests[i].id, 
        functionBaseAgent.referredByScope, 
        functionBaseAgent.atype, 
        ActionType.REMOVE
      );

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.FUNCTION <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.FUNCTION == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
        }
        functionEntity.bs.adminId = requests[i].adminId;

      } else {
        functionEntity.bs.adminId = _data.scopes[functionEntity.contextId].adminId;
      }

      // checking new admin Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      require(newBaseAgent.atype != AgentType.NONE, "Admin Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(newBaseAgent.scopelimit > newBaseAgent.referredByScope, "Illegal Agent ReferredByScope");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].adminId, 
        requests[i].id, 
        newBaseAgent.referredByScope, 
        newBaseAgent.atype, 
        ActionType.ADD
      );  

      emit FunctionAdminUpdated(msg.sender, requests[i].id, requests[i].adminId, newBaseAgent.atype);
    }
    return true;  
  }

  function functionUpdateAgent(FunctionUpdateAgentRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAgent.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].functionId);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

      // check access admin role
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      // update function agent Id
      BaseAgent storage functionBaseAgent = _data.agents[functionEntity.agentId];
      require(functionBaseAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
      unchecked { functionBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        requests[i].functionId,
        functionBaseAgent.referredByScope, 
        functionBaseAgent.atype, 
        ActionType.REMOVE
      );

      // checking new agent Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].agentId];
      require(newBaseAgent.atype != AgentType.NONE, "Agent Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(newBaseAgent.scopelimit > newBaseAgent.referredByScope, "Illegal Agent ReferredByScope");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].agentId, 
        requests[i].functionId,
        newBaseAgent.referredByScope, 
        newBaseAgent.atype, 
        ActionType.ADD
      );

      functionEntity.agentId = requests[i].agentId;
      emit FunctionAgentUpdated(msg.sender, requests[i].functionId, requests[i].agentId, newBaseAgent.atype);
    }
    return true;  
  }

  function functionDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doFunctionUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function functionUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doFunctionUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function functionUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Type Deleted");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.bs.alstat = requests[i].alstat;
      emit FunctionAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdatePolicy.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].functionId);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.policyCode = requests[i].policyCode;
      emit FunctionPolicyUpdated(msg.sender, requests[i].functionId, requests[i].policyCode);
    }
    return true;
  }

  function functionUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdatePolicy.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].scopeId);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.bs.agentLimit = requests[i].agentLimit;      
      emit FunctionAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
    }
    return true;
  }

  function functionCheckId(bytes32 functionId) external view returns (bool) {    
    return _data.scopes[functionId].stype == ScopeType.FUNCTION;
  }

  function functionCheckSelector(address contractId, bytes4 selector) external view returns (bool) {
    return _data.scopes[LAclUtils.functionGenerateId(contractId, selector)].stype == ScopeType.FUNCTION;
  }

  function functionCheckAdmin(bytes32 functionId, address account) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;  

    return _doFunctionCheckAccount(fe.bs.adminId, account);
  }

   function functionCheckAgent(bytes32 functionId, address account) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;  

    return _doFunctionCheckAccount(fe.agentId, account);
  }

  function _doFunctionCheckAccount(bytes32 agentId, address account) internal view returns (bool) {
    
    AgentType agentType = _data.agents[agentId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(agentId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(agentId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }
 

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) { 
      return FunctionInfo({
        adminId: bytes32(0),
        agentId: bytes32(0),
        contextId: bytes32(0),
        selector: bytes4(0),
        agentLimit: 0,
        referredByAgent: 0,
        referredByPolicy: 0,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        adminType: AgentType.NONE,
        agentType: AgentType.NONE, 
        policyCode: 0
      });
    }

    return FunctionInfo({
      adminId: fe.bs.adminId,
      agentId: fe.agentId,
      contextId: fe.contextId,
      selector: fe.selector,
      agentLimit: fe.bs.agentLimit,
      referredByAgent: fe.bs.referredByAgent,
      referredByPolicy: fe.bs.referredByPolicy,
      acstat: fe.bs.acstat,
      alstat: fe.bs.alstat,
      adminType: _data.agents[fe.bs.adminId].atype,
      agentType: _data.agents[fe.agentId].atype, 
      policyCode: fe.policyCode
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

  function _doFunctionUpdateActivityStatus(bytes32 functionId, ActivityStatus status, bytes32 updateFunctionId) internal returns (bool) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    require(IAccessControl(address(this)).hasAccess(updateFunctionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);
    require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, updateFunctionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {
      BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
      require(functionAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
      unchecked { functionAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        functionId, 
        functionAgent.referredByScope, 
        functionAgent.atype, 
        ActionType.REMOVE
      );

      BaseAgent storage functionAdmin = _data.agents[functionEntity.bs.adminId];
      require(functionAdmin.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { functionAdmin.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.bs.adminId,
        functionId, 
        functionAdmin.referredByScope, 
        functionAdmin.atype, 
        ActionType.REMOVE
      );
    }

    functionEntity.bs.acstat = status;
    emit FunctionActivityUpdated(msg.sender, functionId, status);
    return true;
  }

  function _doFunctionCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
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