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

    //  = ContextRegisterRequest({
    //   realmId: request.realmId,
    //   adminId: request.adminId,
    //   name: "",
    //   version: "",
    //   contractId: predictedContractId,
    //   typeLimit: request.typeLimit,
    //   acstat: ActivityStatus.ENABLE,
    //   alstat: AlterabilityStatus.UPDATABLE
    // });
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, this.contextRegisterAcl.selector);

    bytes32 contextId = _registerContext(msg.sender, request, functionRequests, functionId);
    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msg.sender,
      request.name,
      request.version,
      request.realmId,
      request.adminId,
      request.agentLimit,
      _data.agents[request.adminId].atype,
      request.acstat,
      request.alstat
    );

    return contextId;
  }

  // called by contract that want to register itself
  function contextRegister(
    bytes memory signature,
    ContextRegisterRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    bytes32 structHash = _getContextMessageHash(
      request.contractId, 
      LAclUtils.generateHash(request.name), 
      LAclUtils.generateHash(request.version),
      request.realmId
    );
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");

    bytes32 memberId = LAclUtils.accountGenerateId(msgSigner);
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegister.selector);
    require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");

    bytes32 contextId = _registerContext(msgSigner, request, functionRequests, functionId);

    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msgSigner,
      request.name,
      request.version,
      request.realmId,
      request.adminId,
      request.agentLimit,
      _data.agents[request.adminId].atype,
      request.acstat,
      request.alstat
    );

    return contextId;
  }

  // called by factory contract that want to register new created contract
  function contextRegisterPredict(
    bytes memory signature,
    ContextRegisterPredictRequest memory request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");   
    bytes32 structHash = _getPredictContextMessageHash(request.deployer, request.subject, request.realmId);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msgSigner);
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegisterPredict.selector);
    require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");

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

    bytes32 ctx = _registerContext(msgSigner, newRequest, functionRequests, functionId);

    emit PredictContextRegistered(
      msg.sender,
      ctx, 
      predictedContractId,
      msgSigner,
      request.deployer,
      request.subject,
      request.name,
      request.version,
      request.realmId,
      request.adminId,
      request.agentLimit,
      _data.agents[request.adminId].atype,
      request.acstat,
      request.alstat
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

    bytes32 memberId = LAclUtils.accountGenerateId(signer);  
    TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    bytes32 signerRoleId = systemAdminType.members[memberId];
    RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;

    bytes32 newContextId = LAclUtils.accountGenerateId(request.contractId);
    require(_data.scopes[newContextId].stype == ScopeType.NONE, "Context Exists");

    RealmEntity storage realmEntity = _data.realmReadSlot(request.realmId);
    require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

    // check access admin realm
    require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

    // check compatibility scopes
    require(signerSystemScopeType >= ScopeType.REALM, "Illegal Signer ScopeType");
    if(signerSystemScopeType == ScopeType.REALM) {
      require(signerSystemRole.scopeId == request.realmId, "Illegal Realm Scope");

    } else if (signerSystemScopeType == ScopeType.DOMAIN) {
      require(signerSystemRole.scopeId == realmEntity.domainId, "Illegal Domain Scope");
    
    } else {
      require(signerSystemRole.scopeId == _data.global.id, "Illegal Global Scope");
    } 

    realmEntity.contexts.add(newContextId);    
    ContextEntity storage newContext = _data.contextWriteSlot(newContextId);


    // checking requested context admin 
    if(request.adminId != bytes32(0)) {
      BaseAgent storage adminBaseAgent = _data.agents[request.adminId];
      require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
      
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(request.adminId);
      require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == request.realmId, "Illegal Amind Scope");
    
      } else if(ScopeType.DOMAIN == requestAdminScopeType){
        require(requestAdminScopeId == realmEntity.domainId, "Illegal Amind Scope");

      } else {
        require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope");
      }
      newContext.bs.adminId = request.adminId;

    } else {
      newContext.bs.adminId = realmEntity.bs.adminId;
    }

    // update referred of admin agent of context
    BaseAgent storage contextAdmin = _data.agents[newContext.bs.adminId];
    contextAdmin.referredByScope += 1; 
    emit AgentReferredByScopeUpdated(
      msg.sender, 
      newContext.bs.adminId,
      newContextId, 
      contextAdmin.referredByScope, 
      contextAdmin.atype, 
      ActionType.ADD
    );

    newContext.realmId = request.realmId;
    newContext.contractId = request.contractId;
    newContext.bs.stype = ScopeType.CONTEXT;
    newContext.bs.acstat = request.acstat;
    newContext.bs.alstat = request.alstat;
    newContext.bs.agentLimit = request.agentLimit;
    // newContext.bs.referredByAgent = 0; 
    // newContext.bs.referredByPolicy = 0;      
     
    for (uint256 i = 0; i < functionRequests.length; i++) {

      bytes32 newFunctionId = LAclUtils.functionGenerateId(request.contractId, functionRequests[i].selector);
      // require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Function Already Registered");
      FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);
      require(_data.agents[functionRequests[i].agentId].atype > AgentType.MEMBER, "Illegal Function Agent");

      // checking requested functionAdmin admin 
      if(request.adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[request.adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

        (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(request.adminId);
        require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
        if(ScopeType.CONTEXT == requestAdminFuncType) {  
          require(requestAdminFuncId == newContext.bs.adminId, "Illegal Amind Scope");
        
        } else if(ScopeType.REALM == requestAdminFuncType) {
          require(requestAdminFuncId == request.realmId, "Illegal Amind Scope");
      
        } else if(ScopeType.DOMAIN == requestAdminFuncType){
          require(requestAdminFuncId == realmEntity.domainId, "Illegal Amind Scope");

        } else {
          require(requestAdminFuncId == _data.global.id, "Illegal Amind Scope");
        }
        functionEntity.bs.adminId = request.adminId;

      } else {
        functionEntity.bs.adminId = newContext.bs.adminId;
      }

      functionEntity.bs.stype = ScopeType.FUNCTION;
      functionEntity.contextId = newContextId;
      functionEntity.agentId = functionRequests[i].agentId;
      functionEntity.policyCode = functionRequests[i].policyCode;      
      functionEntity.selector = functionRequests[i].selector;
      functionEntity.bs.acstat = functionRequests[i].acstat;
      functionEntity.bs.alstat = functionRequests[i].alstat;
      functionEntity.bs.agentLimit = functionRequests[i].agentLimit;
      // fs.bs.referredByAgent = 0; 
      // fs.bs.referredByPolicy = 0;      
      
      // add function to context
      newContext.functions.add(newFunctionId);

      BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
      functionAgent.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.agentId, 
        newFunctionId, 
        functionAgent.referredByScope, 
        functionAgent.atype, 
        ActionType.ADD
      );

      BaseAgent storage functionAdmin = _data.agents[functionEntity.bs.adminId];
      functionAdmin.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        functionEntity.bs.adminId,
        newFunctionId, 
        functionAdmin.referredByScope, 
        functionAdmin.atype, 
        ActionType.ADD
      );

      emit ContextFunctionRegistered(
        msg.sender,
        newContextId, 
        newFunctionId,
        functionRequests[i].adminId,
        functionRequests[i].agentId,
        functionRequests[i].selector,
        functionRequests[i].agentLimit,
        _data.agents[functionRequests[i].adminId].atype,
        _data.agents[functionRequests[i].agentId].atype,
        functionRequests[i].acstat,
        functionRequests[i].alstat,
        functionRequests[i].policyCode
      );
    }

    return newContextId;
  }

 // called by contract that want to upgrade itself
  function contextUpgrade(
    bytes memory signature,
    ContextUpgradeRequest calldata request,
    ContextUpgradeFunctionRequest[] calldata functionRequests
  ) external returns (address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

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

    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address signer, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
  
    bytes32 memberId = LAclUtils.accountGenerateId(signer);
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextRegisterPredict.selector);
    require(IAccessControl(address(this)).hasMemberAccess(functionId, memberId), "Access Denied");

    // check access admin realm
    require(_doCheckAdminAccess(contextEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

    TypeEntity storage systemAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    bytes32 signerRoleId = systemAdminType.members[memberId];
    RoleEntity storage signerSystemRole =  _data.roleReadSlot(signerRoleId);
    ScopeType signerSystemScopeType = _data.scopes[signerSystemRole.scopeId].stype;

    // check compatibility scopes
    require(signerSystemScopeType >= ScopeType.CONTEXT, "Illegal Signer ScopeType");
    if(signerSystemScopeType == ScopeType.CONTEXT) {
      require(signerSystemRole.scopeId == contextId, "Illegal Context Scope");

    } else if(signerSystemScopeType == ScopeType.REALM) {      
      require(signerSystemRole.scopeId == contextEntity.realmId, "Illegal Realm Scope");

    } else if (signerSystemScopeType == ScopeType.DOMAIN) {
      RealmEntity storage realmEntity = _data.realmReadSlot(contextEntity.realmId);
      require(signerSystemRole.scopeId == realmEntity.domainId, "Illegal Domain Scope");
    
    } else {
      require(signerSystemRole.scopeId == _data.global.id, "Illegal Global Scope");
    } 

    for (uint256 i = 0; i < functionRequests.length; i++) {
      if(functionRequests[i].action == ActionType.ADD) {
        bytes32 newFunctionId = LAclUtils.functionGenerateId(request.contractId, functionRequests[i].selector);
        require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Function Exists");
        require(_data.agents[functionRequests[i].agentId].atype > AgentType.MEMBER, "Illegal Function Agent");

        FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);

        // checking requested functionAdmin admin 
        if(functionRequests[i].adminId != bytes32(0)) {
          BaseAgent storage adminBaseAgent = _data.agents[functionRequests[i].adminId];
          require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

          (ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(contextEntity.bs.adminId);
          require(ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
          if(ScopeType.CONTEXT == requestAdminFuncType) {  
            require(requestAdminFuncId == contextEntity.bs.adminId, "Illegal Amind Scope");          
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminFuncId, contextId), "Illegal Admin Scope");
        }
        functionEntity.bs.adminId = functionRequests[i].adminId;

        } else {
          functionEntity.bs.adminId = contextEntity.bs.adminId;
        }

        functionEntity.bs.acstat = functionRequests[i].acstat;
        functionEntity.bs.alstat = functionRequests[i].alstat;
        functionEntity.bs.stype = ScopeType.FUNCTION;
        functionEntity.contextId = contextId;
        functionEntity.bs.agentLimit = functionRequests[i].agentLimit;
        functionEntity.agentId = functionRequests[i].agentId;
        functionEntity.policyCode = functionRequests[i].policyCode;
        functionEntity.selector = functionRequests[i].selector;

        // add functionId to context
        contextEntity.functions.add(newFunctionId);
        
        BaseAgent storage newFunctionAgent = _data.agents[functionEntity.agentId];
        require(newFunctionAgent.atype != AgentType.NONE, "Agent Not Found");
        require(newFunctionAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
        require(newFunctionAgent.scopelimit > newFunctionAgent.referredByScope, "Illegal Agent ReferredByScope");
        newFunctionAgent.referredByScope += 1; 
        emit AgentReferredByScopeUpdated(
          msg.sender, 
          functionEntity.agentId, 
          newFunctionId, 
          newFunctionAgent.referredByScope, 
          newFunctionAgent.atype, 
          ActionType.ADD
        );

        BaseAgent storage newFunctionAdmin = _data.agents[functionEntity.bs.adminId];
        require(newFunctionAdmin.atype != AgentType.NONE, "Agent Not Found");
        require(newFunctionAdmin.acstat > ActivityStatus.DELETED, "Agent Deleted");
        require(newFunctionAdmin.scopelimit > newFunctionAdmin.referredByScope, "Illegal Agent ReferredByScope");
        newFunctionAdmin.referredByScope += 1; 
        emit AgentReferredByScopeUpdated(
          msg.sender, 
          functionEntity.bs.adminId,
          newFunctionId, 
          newFunctionAdmin.referredByScope, 
          newFunctionAdmin.atype, 
          ActionType.ADD
        );

        emit ContextFunctionRegistered(
          msg.sender,
          contextId, 
          newFunctionId,
          functionRequests[i].adminId,
          functionRequests[i].agentId,
          functionRequests[i].selector,
          functionRequests[i].agentLimit,
          _data.agents[functionRequests[i].adminId].atype,
          _data.agents[functionRequests[i].agentId].atype,
          functionRequests[i].acstat,
          functionRequests[i].alstat,
          functionRequests[i].policyCode
        );

      } else if(functionRequests[i].action == ActionType.REMOVE) {
        bytes32 reqFunctionId = LAclUtils.functionGenerateId(request.contractId, functionRequests[i].selector);
        FunctionEntity storage functionEntity = _data.functionReadSlot(reqFunctionId);
        functionEntity.bs.acstat = ActivityStatus.DELETED;
       
        BaseAgent storage functionAgent = _data.agents[functionEntity.agentId];
        require(functionAgent.referredByScope > 0, "Illegal Agent ReferredByScope");
        unchecked { functionAgent.referredByScope -= 1; }
        emit AgentReferredByScopeUpdated(
          msg.sender, 
          functionEntity.agentId, 
          reqFunctionId, 
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
          reqFunctionId, 
          functionAdmin.referredByScope, 
          functionAdmin.atype, 
          ActionType.REMOVE
        );
       
        emit ContextUpgradeFunctionRemoved(msg.sender, contextId, reqFunctionId);
      
      } else {
        revert("Illeagl Action");
      }
    }

    return request.contractId;
  }

  function contextDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doContextUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doContextUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Type Deleted");
      require(_doCheckAdminAccess(contextEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      contextEntity.bs.alstat = requests[i].alstat;
      emit ContextAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

      // check access admin role
      require(_doCheckAdminAccess(contextEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

       // update function admin Id
      BaseAgent storage contextBaseAgent = _data.agents[contextEntity.bs.adminId];
      require(contextBaseAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { contextBaseAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        contextEntity.bs.adminId, 
        requests[i].id, 
        contextBaseAgent.referredByScope, 
        contextBaseAgent.atype, 
        ActionType.REMOVE
      );

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        // ScopeType typeScopeType = _data.scopes[typeEntity.scopeId].stype;
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        
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

      // checking new admin Id 
      BaseAgent storage newContextAdminAgent = _data.agents[requests[i].adminId];
      require(newContextAdminAgent.atype != AgentType.NONE, "Admin Not Found");
      require(newContextAdminAgent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(newContextAdminAgent.scopelimit > newContextAdminAgent.referredByScope, "Illegal Agent ReferredByScope");
      newContextAdminAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].adminId, 
        requests[i].id, 
        newContextAdminAgent.referredByScope, 
        newContextAdminAgent.atype, 
        ActionType.ADD
      );  

      emit ContextAdminUpdated(msg.sender, requests[i].id, requests[i].adminId, newContextAdminAgent.atype);
    }
    return true;
  }

  function contextUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IContextManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IContextManagement.contextUpdateAgentLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].scopeId);
      require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doCheckAdminAccess(contextEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

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

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
    require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    require(_doCheckAdminAccess(contextEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {    
      BaseAgent storage functionAdmin = _data.agents[contextEntity.bs.adminId];
      require(functionAdmin.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { functionAdmin.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        contextEntity.bs.adminId,
        functionId, 
        functionAdmin.referredByScope, 
        functionAdmin.atype, 
        ActionType.REMOVE
      );
    }

    contextEntity.bs.acstat = status;
    emit ContextActivityUpdated(msg.sender, functionId, status);
    return true;
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
}