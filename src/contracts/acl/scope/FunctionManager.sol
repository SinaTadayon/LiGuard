// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract FunctionManager is AclStorage, IFunctionManagement {
  using LAclStorage for DataCollection;

  function functionUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool){
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function is Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Function Update");

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
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      if(requests[i].adminId != bytes32(0)) {
        // ScopeType typeScopeType = _data.scopes[typeEntity.scopeId].stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        require(ScopeType.FUNCTION <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.FUNCTION == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
        }
        functionEntity.bs.adminId = requests[i].adminId;

      } else {
        functionEntity.bs.adminId = _data.scopes[requestAdminScopeId].adminId;
      }

      // checking new admin Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      require(newBaseAgent.atype != NONE, "Admin Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Is Deleted");
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


      emit FunctionAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;  
  }

  function functionUpdateAgent(FunctionUpdateAgentRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAgent.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function is Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Function Update");

      // check access admin role
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      // update function agent Id
      BaseAgent storage functionBaseAgent = _data.agents[functionEntity.agentId];
      require(functionBaseAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
      unchecked { functionBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        requests[i].id, 
        functionBaseAgent.referredByScope, 
        functionBaseAgent.atype, 
        ActionType.REMOVE
      );

      // checking new agent Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].agentId];
      require(newBaseAgent.atype != NONE, "Agent Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Is Deleted");
      require(newBaseAgent.scopelimit > newBaseAgent.referredByScope, "Illegal Agent ReferredByScope");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].agentId, 
        requests[i].id, 
        newBaseAgent.referredByScope, 
        newBaseAgent.atype, 
        ActionType.ADD
      );

      functionEntity.agentId = requests[i].agentId;
      emit FunctionAgentUpdated(msg.sender, requests[i].id, requests[i].agentId);
    }
    return true;  
  }

  function functionDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.typeDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doFunctionUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.typeUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity Status");
      _doFunctionUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function functionUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      FunctionEntity storage functionEntity = _data.typeReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Type Is Deleted");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.bs.alstat = requests[i].alstat;
      emit FunctionAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdatePolicy.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].typeId);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.policyCode = requests[i].policyCode;
      emit FunctionPolicyCodeUpdated(msg.sender, requests[i].typeId, requests[i].roleLimit);
    }
    return true;
  }

  function functionUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IFunctionManagement.functionUpdatePolicy.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].typeId);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      functionEntity.bs.agentLimit = requests[i].agentLimit;
      emit FunctionAgentLimitUpdated(msg.sender, requests[i].typeId, requests[i].roleLimit);
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

    return _doFunctionCheckAdmin(fe.bs.adminId, account);
  }

   function functionCheckAgent(bytes32 functionId, address account) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;  

    return _doFunctionCheckAdmin(fe.agentId, account);
  }

  function _doFunctionCheckAccount(bytes32 agentId, address account) internal view returns (bool) {
    
    AgentType agentType = _data.agents[agentId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(agentType, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(agentType);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) { 
      return FunctionInfo({
        adminId: bytes32(0),
        agentId: bytes32(0),
        contextId: bytes32(0),
        selector: bytes4(0),
        agentlimit: 0,
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
      agentlimit: fe.bs.agentlimit,
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

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    FunctionEntity storage functionEntity = _data.functionReadSlot(typeId);
    require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Is Deleted");
    require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Function Update");
    require(_doFunctionCheckAdminAccess(functionEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {
      BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
      require(functionAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
      unchecked { functionAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        requests[i].id, 
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
        requests[i].id, 
        functionAdmin.referredByScope, 
        functionAdmin.atype, 
        ActionType.REMOVE
      );
    }

    functionEntity.bs.acstat = status;
    emit FunctionActivityUpdated(msg.sender, typeId, status);
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

    // function functionCheckAdmin(bytes32 functionId, bytes32 agentId) external view returns (bool) {
  //   return _doFunctionCheckAdmin(functionId, agentId);
  // }

  // function _doFunctionCheckAdmin(bytes32 functionId, bytes32 agentId) internal view returns (bool) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functoinId);
  //   if(!result) return false;
  //   BaseAgent storage ba = _data.agents[fe.bs.adminId];
  //   if(ba.atype == AgentType.NONE) return false;
  //   else if (ba.atype == AgentType.MEMBER) return agentId == fe.bs.adminId;
  //   else if (ba.atype == AgentType.ROLE || ba.atype == AgentType.TYPE) 
  //     return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), agentId);
  //   else return false;
  // }


    // function functionCheckAgent(bytes32 functionId, bytes32 agentId) external view returns (bool) {
  //   return _doFunctionCheckAgent(functionId, agentId);
  // }

  // function _doFunctionCheckAgent(bytes32 functionId, bytes32 agentId) internal view returns (bool) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functoinId);
  //   if(!result) return false;
  //   BaseAgent storage ba = _data.agents[fe.agentId];
  //   if (ba.atype == AgentType.MEMBER) return agentId == fe.agentId;
  //   else if (ba.atype == AgentType.ROLE) {
  //     (RoleEntity storage re, bool result1) = _data.roleTryReadSlot(roleId);
  //     if(!result1) return false;
  //     return ITypeManagement(address(this)).typeHasMember(re.typeId, memberId);
  //     return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), agentId);
  //   }
  //   else return false;
  // }


  // function functionGetAdmin(bytes32 functionId) external view returns (AgentType, bytes32) {
  //   return (_data.agents[_data.scopes[functionId].adminId].atype, _data.scopes[functionId].adminId);
  // }

  // function functionGetAgent(bytes32 functionId) external view returns (AgentType, bytes32) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return (AgentType.NONE, bytes32(0));
  //   return (_data.agents[fe.agentId].atype, fe.agentId);
  // }

  // function functionGetContext(bytes32 functionId) external view returns (bytes32) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return bytes32(0);
  //   return fe.contextId;
  // }

  // function functionGetActivityStatus(bytes32 functionId) external view returns (ActivityStatus) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return ActivityStatus.NONE;
  //   return fe.bs.acstat;
  // }

  // function functionGetAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return AlterabilityStatus.NONE;
  //   return fe.bs.alstat;
  // }

  // function functionGetSelector(bytes32 functionId) external view returns (bytes4) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return bytes4(0);
  //   return fe.selector;
  // }

  // function functionGetPolicy(bytes32 functionId) external view returns (bool, uint8) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
  //   if(!result) return (false, 0);
  //   return (true, fe.policyCode);
  // }


  // function functionGenerateId(address contractId, bytes4 selector) external pure returns (bytes32) {
  //   return keccak256(abi.encodePacked(contractId, selector));
  // }

  // function functionCreateFacetRegisterRequest() public returns (FacetRegisterRequest memory) {}

  // function functionCreateContextRegisterFacetRequest() public returns (IContextManagement.ContextRegisterFunctionRequest memory) {}

  
}