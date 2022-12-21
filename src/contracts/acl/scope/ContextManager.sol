// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/proxy/LClones.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/acl/LAclUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title Context Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ContextManager is AclStorage, IContextManagement {
  using LAclStorage for DataCollection;    
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LClones for address;


  function contextRegisterAcl(
    ContextRegisterRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32) {
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, this.contextRegisterAcl.selector);

    bytes32 contextId = _registerContext(msg.sender, request, functionRequests, functionId);
    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msg.sender,
      request.realmId,
      request.adminId
    );

    return contextId;
  }

  // called by contract that want to register itself
  function contextRegister(
    bytes memory signature,
    ContextRegisterRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");    
    bytes32 structHash = _getContextMessageHash(
      request.contractId, 
      LAclUtils.generateHash(request.name), 
      LAclUtils.generateHash(request.version),
      request.realmId
    );

    address msgSigner = _doGetSignerAddress(signature, structHash);
    // bytes32 msgDigest = _hashTypedDataV4(structHash);
    // (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    // require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");

    // bytes32 memberId = LAclUtils.accountGenerateId(msgSigner);
    // address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    // bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegister.selector);
    // require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");
    bytes32 functionId = _accessPermission(IFunctionManagement.functionUpdateAdmin.selector);
    // bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
        
    bytes32 contextId = _registerContext(msgSigner, request, functionRequests, functionId);

    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msgSigner,
      request.realmId,
      request.adminId
    );

    return contextId;
  }

  // called by factory contract that want to register new created contract
  function contextRegisterPredict(
    bytes memory signature,
    ContextRegisterPredictRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");   
    
    address msgSigner = _doGetSignerAddress(
      signature, 
      _getPredictContextMessageHash(request.deployer, request.subject, request.realmId)
    );
    // bytes32 msgDigest = _hashTypedDataV4(structHash);
    // (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    // require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    
    // bytes32 memberId = LAclUtils.accountGenerateId(msgSigner);
    // address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    // bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegisterPredict.selector);
    // require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");

    // bytes32 functionId = _accessPermission(IContextManagement.contextRegisterPredict.selector);
    // bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  

    address predictedContractId = request.subject.predictDeterministicAddress(request.salt, request.deployer);

    ContextRegisterRequest memory newRequest = ContextRegisterRequest({
      realmId: request.realmId,
      adminId: request.adminId,
      name: "",
      version: "",
      contractId: predictedContractId,
      agentLimit: request.agentLimit,
      acstat: request.acstat,      
      alstat: request.alstat
    });

    bytes32 ctx = _registerContext(
      msgSigner, 
      newRequest, 
      functionRequests, 
      _accessPermission(IContextManagement.contextRegisterPredict.selector)
    );

    emit PredictContextRegistered(
      msg.sender,
      ctx, 
      predictedContractId,
      msgSigner,
      request.deployer,
      request.subject,
      request.realmId,
      request.adminId
    );

    return ctx;
  }

  function _getContextMessageHash(
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(CTX_MESSAGE_TYPEHASH, contractId, name, version, realmId));
  }

  function _getPredictContextMessageHash(
    address deployer,
    address subject,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PREDICT_CTX_MESSAGE_TYPEHASH, deployer, subject, realmId));
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
  }

  function _domainSeparatorV4() internal view returns (bytes32) {
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

  function _registerContext(
    address signer,
    ContextRegisterRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests,
    bytes32 functionId
  ) private returns (bytes32) {

    bytes32 signerId = LAclUtils.accountGenerateId(signer);  
    bytes32 newContextId = LAclUtils.accountGenerateId(request.contractId);
    require(_data.scopes[newContextId].stype == ScopeType.NONE, "Already Exist");

    // check realm 
    RealmEntity storage realmEntity = _data.realmReadSlot(request.realmId);
    require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Update");
    require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

    // check access admin realm
    require(_doCheckAdminAccess(realmEntity.bs.adminId, signerId, functionId), "Forbidden");

    // // fetch scope type and scope id of sender
    // TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    // bytes32 signerRoleId = systemAdminType.members[signerId];
    // RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    // ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;

    // // check compatibility scopes
    // require(signerSystemScopeType >= ScopeType.REALM, "Illegal Signer ScopeType");
    // if(signerSystemScopeType == ScopeType.REALM) {
    //   require(signerSystemRole.scopeId == request.realmId, "Illegal Realm Scope");

    // } else if (signerSystemScopeType == ScopeType.DOMAIN) {
    //   require(signerSystemRole.scopeId == realmEntity.domainId, "Illegal Domain Scope");
    
    // } else {
    //   require(signerSystemRole.scopeId == _data.global.id, "Illegal Global Scope");
    // } 

    _doCheckSignerScope(signerId, request.realmId, realmEntity.domainId);

    // add context to realm
    realmEntity.contexts.add(newContextId);    

    // create new context
    ContextEntity storage newContext = _data.contextWriteSlot(newContextId);
    newContext.realmId = request.realmId;
    newContext.contractId = request.contractId;
    newContext.bs.stype = ScopeType.CONTEXT;
    newContext.bs.acstat = request.acstat;
    newContext.bs.alstat = request.alstat;
    newContext.bs.agentLimit = request.agentLimit;
    newContext.bs.adminId = _getContextAdmin(request.realmId, newContextId, realmEntity.bs.adminId, request.adminId);
   

    // // checking requested context admin 
    // if(request.adminId != bytes32(0)) {
    //   require(_data.agents[request.adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      
    //   (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(request.adminId);
    //   require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
    //   if(ScopeType.REALM == requestAdminScopeType) {
    //     require(requestAdminScopeId == request.realmId, "Illegal Admin Scope");
    
    //   } else if(ScopeType.DOMAIN == requestAdminScopeType){
    //     require(requestAdminScopeId == realmEntity.domainId, "Illegal Admin Scope");

    //   } else {
    //     require(requestAdminScopeId == _data.global.id, "Illegal Admin Scope");
    //   }
    //   newContext.bs.adminId = request.adminId;

    // } else {
    //   newContext.bs.adminId = realmEntity.bs.adminId;
    // }

    // update referred of admin agent of context
    _doUpdateAgentReferred(
      _data.agents[newContext.bs.adminId],
      newContext.bs.adminId,
      newContextId, 
      signer,
      ActionType.ADD
    ); 
    // BaseAgent storage contextAdmin = _data.agents[newContext.bs.adminId];
    // contextAdmin.referredByScope += 1; 
    // emit AgentReferredByScopeUpdated(
    //   msg.sender, 
    //   newContext.bs.adminId,
    //   newContextId, 
    //   ActionType.ADD
    // );
     
    for (uint256 i = 0; i < functionRequests.length; i++) {
      _doFunctionRegistration(newContext, functionRequests[i], signer, newContextId);
    }

    return newContextId;
  }

 // called by contract that want to upgrade itself
  function contextUpgrade(
    bytes memory signature,
    ContextUpgradeRequest calldata request,
    ContextUpgradeFunctionRequest[] calldata functionRequests
  ) external returns (address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");

    bytes32 contextId = LAclUtils.accountGenerateId(request.contractId);  
    ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
    require(contextEntity.contractId == msg.sender, "Upgrade Forbidden");
    require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");
    require(contextEntity.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");

    bytes32 structHash = _getContextMessageHash(
      request.contractId, 
      LAclUtils.generateHash(request.name), 
      LAclUtils.generateHash(request.version),
      contextEntity.realmId  
    );

    address signer = _doGetSignerAddress(signature, structHash);
    // bytes32 msgDigest = _hashTypedDataV4(structHash);
    // (address signer, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    // require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
  
    // bytes32 memberId = LAclUtils.accountGenerateId(signer);
    // address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    // bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegisterPredict.selector);
    // require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");
    bytes32 functionId = _accessPermission(IContextManagement.contextUpgrade.selector);
    bytes32 signerId = LAclUtils.accountGenerateId(signer);  

    // check access admin realm
    require(_doCheckAdminAccess(contextEntity.bs.adminId, signerId, functionId), "Forbidden");

    _doCheckUpgradeSignerScope(contextEntity, contextId, signerId);
    // // get scope id of sender
    // TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    // bytes32 signerRoleId = systemAdminType.members[signerId];
    // RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    // ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;

    // // check compatibility scopes
    // require(signerSystemScopeType >= ScopeType.CONTEXT, "Illegal Signer ScopeType");
    // if(signerSystemScopeType == ScopeType.CONTEXT) {
    //   require(signerSystemRole.scopeId == contextId, "Illegal Context Scope");

    // } else if(signerSystemScopeType == ScopeType.REALM) {      
    //   require(signerSystemRole.scopeId == contextEntity.realmId, "Illegal Realm Scope");

    // } else if (signerSystemScopeType == ScopeType.DOMAIN) {
    //   RealmEntity storage realmEntity = _data.realmReadSlot(contextEntity.realmId);
    //   require(signerSystemRole.scopeId == realmEntity.domainId, "Illegal Domain Scope");
    
    // } else {
    //   require(signerSystemRole.scopeId == _data.global.id, "Illegal Global Scope");
    // } 

    for (uint256 i = 0; i < functionRequests.length; i++) {
      if(functionRequests[i].action == ActionType.ADD) {
        _doFunctionUpdrade(contextEntity, functionRequests[i], signer,contextId);

      } else if(functionRequests[i].action == ActionType.REMOVE) {
        _doFunctionDeleteUpdgrade(contextId, request.contractId, functionRequests[i].selector, signer);
      } else {
        revert("Illeagl Action");
      }
    }

    return request.contractId;
  }

  function contextDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextDeleteActivity.selector);    
    for(uint i = 0; i < requests.length; i++) {
      _doContextUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateActivityStatus.selector);   
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doContextUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAlterabilityStatus.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {      
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      
      contextEntity.bs.alstat = requests[i].alstat;
      emit ContextAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAdmin.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // update function admin Id
      _doUpdateAgentReferred(
        _data.agents[contextEntity.bs.adminId],
        contextEntity.bs.adminId,
        requests[i].id, 
        msg.sender, 
        ActionType.REMOVE
      ); 

      // BaseAgent storage contextBaseAgent = _data.agents[contextEntity.bs.adminId];
      // require(contextBaseAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      // unchecked { contextBaseAgent.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   contextEntity.bs.adminId, 
      //   requests[i].id, 
      //   ActionType.REMOVE
      // );

      
      // checking requested type admin 
      // contextEntity.bs.adminId = _getContextAdmin(contextEntity.realmId, requests[i].id, _data.scopes[contextEntity.realmId].adminId, requests[i].adminId);
      if(requests[i].adminId != bytes32(0)) {
        // ScopeType typeScopeType = _data.scopes[typeEntity.scopeId].stype;
        require( _data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");        
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.CONTEXT == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
        }
        contextEntity.bs.adminId = requests[i].adminId;

      } else {
        contextEntity.bs.adminId = _data.scopes[contextEntity.realmId].adminId;
      }

      _doUpdateAgentReferred(
        _data.agents[requests[i].adminId],
        requests[i].adminId,
        requests[i].id, 
        msg.sender, 
        ActionType.ADD
      ); 

      // BaseAgent storage newContextAdminAgent = _data.agents[requests[i].adminId];
      // require(newContextAdminAgent.atype != AgentType.NONE, "Admin Not Found");
      // require(newContextAdminAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      // require(newContextAdminAgent.scopeLimit > newContextAdminAgent.referredByScope, "Illegal Agent ReferredByScope");
      // newContextAdminAgent.referredByScope += 1;
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   requests[i].adminId, 
      //   requests[i].id, 
      //   ActionType.ADD
      // );  

      emit ContextAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function contextUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAdmin.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);   
    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].scopeId, senderId, functionId);

      contextEntity.bs.agentLimit = requests[i].agentLimit;
      emit ContextAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
    }
    return true;
  }

  function contextCheckId(bytes32 contextId) external view returns (bool) {
    return _data.scopes[contextId].stype == ScopeType.CONTEXT;
  }

  function contextCheckAccount(address contractId) external view returns (bool) {
    return _data.scopes[LAclUtils.accountGenerateId(contractId)].stype == ScopeType.CONTEXT;
  }

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return false;  

    bytes32 contextAdminId = ce.bs.adminId;
    AgentType agentType = _data.agents[contextAdminId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(contextAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(contextAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  } 

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool) {
    return _doContextHasFunction(contextId, functionId);
  }

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool) {
    bytes32 contextId = LAclUtils.accountGenerateId(contractId);
    bytes32 functionId = LAclUtils.functionGenerateId(contractId, selector);
    return _doContextHasFunction(contextId, functionId);
  }

  function _doContextHasFunction(bytes32 contextId, bytes32 functionId) internal view returns (bool) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return false;
    return ce.functions.contains(functionId);    
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
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

  function _doContextUpdateActivityStatus(bytes32 contextId, ActivityStatus status, bytes32 functionId) internal returns (bool) {

    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);       
    ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(contextId, senderId, functionId);

    if(status == ActivityStatus.DELETED) {   
      _doUpdateAgentReferred(
        _data.agents[contextEntity.bs.adminId],
        contextEntity.bs.adminId,
        functionId, 
        msg.sender, 
        ActionType.REMOVE
      ); 
      // BaseAgent storage functionAdmin = _data.agents[contextEntity.bs.adminId];
      // require(functionAdmin.referredByScope > 0, "Illegal Admin ReferredByScope");
      // unchecked { functionAdmin.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   contextEntity.bs.adminId,
      //   functionId, 
      //   ActionType.REMOVE
      // );
    }

    contextEntity.bs.acstat = status;
    emit ContextActivityUpdated(msg.sender, functionId, status);
    return true;
  }

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if (!result) return new bytes32[](0);
    return ce.functions.values();
  }

  function contextGetContextInfo(bytes32 contextId) external view returns (ContextInfo memory) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) {
      return ContextInfo ({
        realmId: bytes32(0),
        adminId: bytes32(0),
        name: "", 
        version: "",
        contractId: address(0),
        agentLimit: 0,
        referredByAgent: 0,
        referredByPolicy: 0,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstate: AlterabilityStatus.NONE
      });
    }

    return ContextInfo ({
      realmId: ce.realmId,
      adminId: ce.bs.adminId,
      name: IProxy(ce.contractId).contractName(), 
      version: IProxy(ce.contractId).contractVersion(),
      contractId: ce.contractId,
      agentLimit: ce.bs.agentLimit,
      referredByAgent: ce.bs.referredByAgent,
      referredByPolicy: ce.bs.referredByPolicy,
      adminType: _data.agents[ce.bs.adminId].atype,
      acstat: ce.bs.acstat,
      alstate: ce.bs.alstat
    });
  }

  function _doFunctionRegistration(
      ContextEntity storage context, 
      ContextRegisterFunctionRequest calldata functionRequest, 
      address signerId,
      bytes32 contextId
  ) internal {
    bytes32 newFunctionId = LAclUtils.functionGenerateId(context.contractId, functionRequest.selector);        
    FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);
    functionEntity.bs.stype = ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;      
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = functionRequest.acstat;
    functionEntity.bs.alstat = functionRequest.alstat;
    functionEntity.bs.agentLimit = functionRequest.agentLimit;   
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(context, contextId, functionRequest.adminId);

    // checking requested functionAdmin admin 
    // if(functionRequest.adminId != bytes32(0)) {
    //   BaseAgent storage adminBaseAgent = _data.agents[functionRequest.adminId];
    //   require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

    //   (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(functionRequest.adminId);
    //   require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
    //   if(ScopeType.CONTEXT == requestAdminFuncType) {  
    //     require(requestAdminFuncId == context.bs.adminId, "Illegal Amind Scope");
      
    //   } else if(ScopeType.REALM == requestAdminFuncType) {
    //     require(requestAdminFuncId == context.realmId, "Illegal Amind Scope");
    
    //   } else if(ScopeType.DOMAIN == requestAdminFuncType){
    //     require(requestAdminFuncId == domainId, "Illegal Amind Scope");

    //   } else {
    //     require(requestAdminFuncId == _data.global.id, "Illegal Amind Scope");
    //   }
    //   functionEntity.bs.adminId = functionRequest.adminId;

    // } else {
    //   functionEntity.bs.adminId = context.bs.adminId;
    // }
    
    // add function to context
    context.functions.add(newFunctionId);

    // update referred agent Id
    _doUpdateAgentReferred(
      _data.agents[functionEntity.agentId],
      functionEntity.agentId,
      newFunctionId, 
      signerId, 
      ActionType.ADD
    );

    // BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
    // // require(functionAgent.atype != AgentType.NONE, "Agent Not Found");
    // require(functionAgent.atype > AgentType.MEMBER, "Illegal AgentType");
    // require(functionAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
    // require(functionAgent.scopeLimit > functionAgent.referredByScope, "Illegal Agent Referred");
    // functionAgent.referredByScope += 1; 
    // emit AgentReferredByScopeUpdated(
    //   signerId, 
    //   functionEntity.agentId, 
    //   newFunctionId, 
    //   ActionType.ADD
    // );

    // update referred admin Id
    _doUpdateAgentReferred(
      _data.agents[functionEntity.bs.adminId],
      functionEntity.bs.adminId,
      newFunctionId, 
      signerId, 
      ActionType.ADD
    );
    // BaseAgent storage functionAdmin = _data.agents[functionEntity.bs.adminId];
    // require(functionAdmin.atype > AgentType.MEMBER, "Illegal AgentType");
    // require(functionAdmin.acstat > ActivityStatus.DELETED, "Agent Deleted");
    // require(functionAdmin.scopeLimit > functionAdmin.referredByScope, "Illegal Admin Referred");
    // functionAdmin.referredByScope += 1; 
    // emit AgentReferredByScopeUpdated(
    //   signerId, 
    //   functionEntity.bs.adminId,
    //   newFunctionId, 
    //   ActionType.ADD
    // );

    emit ContextFunctionRegistered(
      msg.sender,
      contextId, 
      newFunctionId,
      functionRequest.adminId,
      functionRequest.agentId,
      functionRequest.selector,  
      functionRequest.policyCode
    );
  }

  function _doFunctionUpdrade(
    ContextEntity storage contextEntity, 
    ContextUpgradeFunctionRequest calldata functionRequest, 
    address signerId,
    bytes32 contextId
  ) internal {
    bytes32 newFunctionId = LAclUtils.functionGenerateId(contextEntity.contractId, functionRequest.selector);
    require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Function Exists");
    // require(_data.agents[functionRequests[i].agentId].atype > AgentType.MEMBER, "Illegal Agent");

    FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);
    functionEntity.bs.acstat = functionRequest.acstat;
    functionEntity.bs.alstat = functionRequest.alstat;
    functionEntity.bs.stype = ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.bs.agentLimit = functionRequest.agentLimit;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(contextEntity, contextId, functionRequest.adminId);
    
    // // checking requested functionAdmin admin 
    // if(functionRequest.adminId != bytes32(0)) {
    //   // require(_data.agents[functionRequests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

    //   (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(contextEntity.bs.adminId);
    //   require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
    //   if(ScopeType.CONTEXT == requestAdminFuncType) {  
    //     require(requestAdminFuncId == contextEntity.bs.adminId, "Illegal Amind Scope");          
    //   } else {
    //     require(IAccessControl(address(this)).isScopesCompatible(requestAdminFuncId, contextId), "Illegal Admin Scope");
    //   }
    //   functionEntity.bs.adminId = functionRequest.adminId;

    // } else {
    //   functionEntity.bs.adminId = contextEntity.bs.adminId;
    // }

    // add functionId to context
    contextEntity.functions.add(newFunctionId);

    // update function agent id 
    _doUpdateAgentReferred(
      _data.agents[functionEntity.agentId],
      functionEntity.agentId,
      newFunctionId, 
      signerId, 
      ActionType.ADD
    ); 


    // BaseAgent storage newFunctionAgent = _data.agents[functionEntity.agentId];
    // require(newFunctionAgent.atype != AgentType.NONE, "Agent Not Found");
    // require(newFunctionAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
    // require(newFunctionAgent.scopeLimit > newFunctionAgent.referredByScope, "Illegal Agent ReferredByScope");
    // newFunctionAgent.referredByScope += 1; 
    // emit AgentReferredByScopeUpdated(
    //   msg.sender, 
    //   functionEntity.agentId, 
    //   newFunctionId, 
    //   ActionType.ADD
    // );

    // update function admin id
    _doUpdateAgentReferred(
      _data.agents[functionEntity.bs.adminId],
      functionEntity.bs.adminId,
      newFunctionId, 
      signerId,
      ActionType.ADD
    ); 

    // BaseAgent storage newFunctionAdmin = _data.agents[functionEntity.bs.adminId];
    // require(newFunctionAdmin.atype != AgentType.NONE, "Agent Not Found");
    // require(newFunctionAdmin.acstat > ActivityStatus.DELETED, "Agent Deleted");
    // require(newFunctionAdmin.scopeLimit > newFunctionAdmin.referredByScope, "Illegal Agent ReferredByScope");
    // newFunctionAdmin.referredByScope += 1; 
    // emit AgentReferredByScopeUpdated(
    //   msg.sender, 
    //   functionEntity.bs.adminId,
    //   newFunctionId, 
    //   ActionType.ADD
    // );

    emit ContextFunctionRegistered(
      msg.sender,
      contextId, 
      newFunctionId,
      functionRequest.adminId,
      functionRequest.agentId,
      functionRequest.selector,        
      functionRequest.policyCode
    );
  }

  function _doFunctionDeleteUpdgrade(bytes32 contextId, address contractId, bytes4 selector, address signer) internal {
      bytes32 reqFunctionId = LAclUtils.functionGenerateId(contractId, selector);
      FunctionEntity storage functionEntity = _data.functionReadSlot(reqFunctionId);
      functionEntity.bs.acstat = ActivityStatus.DELETED;
      
      // update function agent Id
      _doUpdateAgentReferred(
        _data.agents[functionEntity.agentId],
        functionEntity.agentId,
        reqFunctionId, 
        signer, 
        ActionType.REMOVE
      ); 

      // BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
      // require(functionAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
      // unchecked { functionAgent.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   functionEntity.agentId, 
      //   reqFunctionId, 
      //   ActionType.REMOVE
      // );

      // update function admin Id
      _doUpdateAgentReferred(
        _data.agents[functionEntity.bs.adminId],
        functionEntity.bs.adminId,
        reqFunctionId, 
        signer, 
        ActionType.REMOVE
      ); 

      // BaseAgent storage functionAdmin = _data.agents[functionEntity.bs.adminId];
      // require(functionAdmin.referredByScope > 0, "Illegal Admin ReferredByScope");
      // unchecked { functionAdmin.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   functionEntity.bs.adminId,
      //   reqFunctionId, 
      //   ActionType.REMOVE
      // );
      
      emit ContextUpgradeFunctionRemoved(msg.sender, contextId, reqFunctionId);    
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
      require(agent.scopeLimit > agent.referredByScope, "Illegal Admin Referred");
      agent.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.ADD
      );
    } else if (action == ActionType.REMOVE) {
      require(agent.referredByScope > 0, "Illegal Admin Referred");
      unchecked { agent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.REMOVE
      );
    }
  }


  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 contextId, bytes32 senderId, bytes32 functionId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
    require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

    // check access admin role
    require(_doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId), "Forbidden");
    return contextEntity;
  }

  function _doCheckSignerScope(bytes32 signerId, bytes32 realmId, bytes32 domainId) internal view {
    // fetch scope type and scope id of sender
    // TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    // bytes32 signerRoleId = systemAdminType.members[signerId];
    // RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    // ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;
     (ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeInfo(signerId);


    // check signer scope
    require(signerScopeType >= ScopeType.REALM, "Illegal Signer ScopeType");
    if(signerScopeType == ScopeType.REALM) {
      require(signerScopeId == realmId, "Illegal Realm Scope");

    } else if (signerScopeType == ScopeType.DOMAIN) {
      require(signerScopeId == domainId, "Illegal Domain Scope");
    
    } else {
      require(signerScopeId == _data.global.id, "Illegal Global Scope");
    } 
  } 

  function _doCheckUpgradeSignerScope(ContextEntity storage context, bytes32 contextId,  bytes32 signerId) internal view {
    // get scope id of sender
    // TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    // bytes32 signerRoleId = systemAdminType.members[signerId];
    // RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    // ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;
    (ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeInfo(signerId);

    // check compatibility scopes
    require(signerScopeType >= ScopeType.CONTEXT, "Illegal Signer ScopeType");
    if(signerScopeType == ScopeType.CONTEXT) {
      require(signerScopeId == contextId, "Illegal Context Scope");

    } else if(signerScopeType == ScopeType.REALM) {      
      require(signerScopeId == context.realmId, "Illegal Realm Scope");

    } else if (signerScopeType == ScopeType.DOMAIN) {
      RealmEntity storage realmEntity = _data.realmReadSlot(context.realmId);
      require(signerScopeId == realmEntity.domainId, "Illegal Domain Scope");
    
    } else {
      require(signerScopeId == _data.global.id, "Illegal Global Scope");
    } 
  } 

   function _doGetScopeInfo(bytes32 signerId) internal view returns (ScopeType, bytes32) {
    // get scope id of sender
    TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    bytes32 signerRoleId = systemAdminType.members[signerId];
    RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;
    return (signerSystemScopeType, signerSystemRole.scopeId);
  }

  function _getContextAdmin(bytes32 realmId, bytes32 scopeId, bytes32 requestScopeAdmin, bytes32 adminId) internal view returns (bytes32 contextAdminId) {
    // checking requested context admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");      
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == realmId, "Illegal Admin Scope");
    
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      contextAdminId = adminId;

    } else {
      contextAdminId = requestScopeAdmin;
    }
  }

  function _doGetAndCheckFunctionAdmin(ContextEntity storage contextEntity, bytes32 contextId, bytes32 adminId) internal view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

      (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(adminId);
      require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
      if(ScopeType.CONTEXT == requestAdminFuncType) {  
        require(requestAdminFuncId == contextEntity.bs.adminId, "Illegal Amind Scope");
      
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestAdminFuncId, contextId), "Illegal Admin Scope");
      }
      functionAdminId = adminId;

    } else {
      functionAdminId = contextEntity.bs.adminId;
    }
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }
}