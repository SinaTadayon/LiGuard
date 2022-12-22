// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/struct/LEnumerableSet.sol";
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
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function functionRegister(FunctionRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);
    address signer;
    for (uint256 i = 0; i < requests.length; i++) {
          
      bytes32 contextId = LAclUtils.accountGenerateId(requests[i].contractId);  
      ContextEntity storage contextEntity = _data.contextReadSlot(contextId);    
      require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");
      require(contextEntity.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");

      if(requests[i].signature.length > 0) {
        bytes32 structHash = _getFunctionMessageHash(requests[i].contractId, requests[i].selector);
        signer = _doGetSignerAddress(requests[i].signature, structHash);
        bytes32 signerId = LAclUtils.accountGenerateId(msg.sender);
        // check access admin context
        require(_doCheckAdminAccess(contextEntity.bs.adminId, signerId, functionId), "Forbidden");
        _doFunctionRegistration(contextEntity, requests[i], signer, contextId);

      } else {
        // check access admin realm
        require(_doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId), "Forbidden");
        _doFunctionRegistration(contextEntity, requests[i], msg.sender, contextId);
      }
    }

    return true;
  }

  function functionUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool){
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdateAdmin.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, false);

      // update function admin Id
      BaseAgent storage functionBaseAgent = _data.agents[functionEntity.bs.adminId];
      require(functionBaseAgent.referredByScope > 0, "Illegal Admin Referred");
      unchecked { functionBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.bs.adminId, 
        requests[i].id, 
        ActionType.REMOVE
      );

      // checking requested type admin       
      // if(requests[i].adminId != bytes32(0)) {
      //   require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

      //   (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      //   require(ScopeType.FUNCTION <= requestAdminScopeType, "Illegal Admin ScopeType");
      //   if(ScopeType.FUNCTION == requestAdminScopeType) {
      //     require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
      //   } else {
      //     require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
      //   }
      //   functionEntity.bs.adminId = requests[i].adminId;

      // } else {
      //   functionEntity.bs.adminId = _data.scopes[functionEntity.contextId].adminId;
      // }

      functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(_data.scopes[functionEntity.contextId].adminId, functionEntity.contextId, requests[i].adminId);


      // checking new admin Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      require(newBaseAgent.atype != AgentType.NONE, "Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(newBaseAgent.scopeLimit > newBaseAgent.referredByScope, "Illegal Agent Referred");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].adminId, 
        requests[i].id, 
        ActionType.ADD
      );  

      emit FunctionAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;  
  }

  function functionUpdateAgent(FunctionUpdateAgentRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdateAgent.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  

    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].agentId, senderId, functionId, false);
      
      // update function agent Id
      BaseAgent storage functionBaseAgent = _data.agents[functionEntity.agentId];
      require(functionBaseAgent.referredByScope > 0, "Illegal Agent Referred");
      unchecked { functionBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        requests[i].functionId,
        ActionType.REMOVE
      );

      // checking new agent Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].agentId];
      require(newBaseAgent.atype != AgentType.NONE, "Agent Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(newBaseAgent.scopeLimit > newBaseAgent.referredByScope, "Illegal Agent Referred");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].agentId, 
        requests[i].functionId,
        ActionType.ADD
      );

      functionEntity.agentId = requests[i].agentId;
      emit FunctionAgentUpdated(msg.sender, requests[i].functionId, requests[i].agentId);
    }
    return true;  
  }

  function functionDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doFunctionUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function functionUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doFunctionUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function functionUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdateAlterabilityStatus.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    for(uint i = 0; i < requests.length; i++) {      
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, true);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      functionEntity.bs.alstat = requests[i].alstat;
      emit FunctionAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdatePolicy.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].functionId, senderId, functionId, false);
      functionEntity.policyCode = requests[i].policyCode;
      emit FunctionPolicyUpdated(msg.sender, requests[i].functionId, requests[i].policyCode);      
    }
    return true;
  }

  function functionUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdatePolicy.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  

    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].scopeId, senderId, functionId, false);
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
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(functionId, senderId, updateFunctionId, false);
    
    if(status == ActivityStatus.DELETED) {
      BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
      require(functionAgent.referredByScope > 0, "Illegal Referred");
      unchecked { functionAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        functionId, 
        ActionType.REMOVE
      );

      BaseAgent storage functionAdmin = _data.agents[functionEntity.bs.adminId];
      require(functionAdmin.referredByScope > 0, "Illegal Referred");
      unchecked { functionAdmin.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.bs.adminId,
        functionId, 
        ActionType.REMOVE
      );
    }

    functionEntity.bs.acstat = status;
    emit FunctionActivityUpdated(msg.sender, functionId, status);
    return true;
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
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

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 fId, bytes32 senderId, bytes32 functionId, bool isAlterable) internal view returns (FunctionEntity storage) {
    FunctionEntity storage functionEntity = _data.functionReadSlot(fId);
    require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    if(!isAlterable) {
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    }
    require(_doCheckAdminAccess(functionEntity.bs.adminId, senderId, functionId), "Forbidden");
    return functionEntity;
  } 

   function _doFunctionRegistration(
      ContextEntity storage context, 
      FunctionRegisterRequest calldata functionRequest, 
      address signerId,
      bytes32 contextId
  ) internal {
    bytes32 newFunctionId = LAclUtils.functionGenerateId(context.contractId, functionRequest.selector); 
    require(context.functions.contains(newFunctionId), "Illegal Function");
    require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Already Exist");
    FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);
    functionEntity.bs.stype = ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;      
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = functionRequest.acstat;
    functionEntity.bs.alstat = functionRequest.alstat;
    functionEntity.bs.agentLimit = functionRequest.agentLimit;   
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(context.bs.adminId, contextId, functionRequest.adminId);

    // update referred agent Id
    _doUpdateAgentReferred(
      _data.agents[functionEntity.agentId],
      functionEntity.agentId,
      newFunctionId, 
      signerId, 
      ActionType.ADD
    );

    // update referred admin Id
    _doUpdateAgentReferred(
      _data.agents[functionEntity.bs.adminId],
      functionEntity.bs.adminId,
      newFunctionId, 
      signerId, 
      ActionType.ADD
    );
   
    emit FunctionRegistered(
      msg.sender,
      contextId, 
      newFunctionId,
      functionRequest.adminId,
      functionRequest.agentId,
      signerId,
      functionRequest.selector,  
      functionRequest.policyCode
    );
  }

   function _doGetAndCheckFunctionAdmin(bytes32 contextAdminId, bytes32 contextId, bytes32 adminId) internal view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

      (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(adminId);
      require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
      if(ScopeType.CONTEXT == requestAdminFuncType) {  
        require(requestAdminFuncId == contextAdminId, "Illegal Amind Scope");
      
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestAdminFuncId, contextId), "Illegal Admin Scope");
      }
      functionAdminId = adminId;

    } else {
      functionAdminId = contextAdminId;
    }
  }

  function _doUpdateAgentReferred(
      BaseAgent storage agent,
      bytes32 agentId, 
      bytes32 scopeId, 
      address signerId, 
      ActionType action
  ) internal {
    if (action == ActionType.ADD) {
      require(agent.atype != AgentType.NONE, "Agent Not Found");
      require(agent.atype > AgentType.MEMBER, "Illegal AgentType");
      require(agent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(agent.scopeLimit > agent.referredByScope, "Illegal Referred");
      agent.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.ADD
      );
    } else if (action == ActionType.REMOVE) {
      require(agent.referredByScope > 0, "Illegal Referred");
      unchecked { agent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.REMOVE
      );
    }
  }

  function _getFunctionMessageHash(
    address contractId,
    bytes4 selector
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(FUNCTION_MESSAGE_TYPEHASH, contractId, selector));
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(_contractDomainSeparatorV4(), structHash);
  }

  function _contractDomainSeparatorV4() internal view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          TYPE_HASH,          
          IProxy(address(this)).contractName(),
          IProxy(address(this)).contractVersion(),
          block.chainid,
          address(this)
        )
      );
  }

}