// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/proxy/LClones.sol";

/**
 * @title Context Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ContextManager is AclStorage, IContextManagement {
  using LAclStorage for DataCollection;
  using LClones for address;

  function contextRegisterAcl(
    ContextRegisterRequest memory request,
    ContextRegisterRequest[] calldata functionRequests
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
  
    bytes32 contextId = _registerContext(request, functionRequests);
    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msgSigner,
      request.name,
      request.version,
      request.realmId,
      request.adminId,
      request.typeLimit,
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

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    bytes32 structHash = _getContextMessageHash(request.contractId, request.name, request.version, request.realm);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");

    bytes32 contextId = _registerContext(msgSigner, request, functionRequests);

    emit ContextRegistered (
      msg.sender,
      contextId,
      request.contractId,
      msgSigner,
      request.name,
      request.version,
      request.realmId,
      request.adminId,
      request.typeLimit,
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
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");   
    bytes32 structHash = _getPredictContextMessageHash(request.deployer, request.subject, request.realm);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");
    
    address predictedContractId = request.subject.predictDeterministicAddress(request.salt, request.deployer);

    ContextRegisterRequest memory newRequest = ContextRegisterRequest({
      realmId: request.realmId,
      adminId: request.adminId,
      name: "",
      version: "",
      contractId: predictedContractId,
      typeLimit: request.typeLimit,
      acstat: request.acstat,
      alstat: request.alstat
    });

    bytes32 ctx = _registerContext(msgSigner, newRequest, functionRequests);

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
      request.typeLimit,
      _data.agents[request.adminId].adminType,
      request.acstat,
      request.alstat
    );

    return ctx;
  }

  // called by contract that want to upgrade itself
  function contextUpgrade(
    bytes memory signature,
    ContextUpgradeRequest calldata request,
    ContextUpgradeFunctionRequest[] calldata functionRequests
  ) external returns (address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    bytes32 structHash = _getContextMessageHash(request.contractId, request.name, request.version, request.realm);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");
    return _upgradeContext(msgSigner, request, functionRequests);
  }

  function _getContextMessageHash(
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realm
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(CTX_MESSAGE_TYPEHASH, contractId, name, version, realm));
  }

  function _getPredictContextMessageHash(
    address deployer,
    address subject,
    bytes32 realm
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PREDICT_CTX_MESSAGE_TYPEHASH, deployer, subject, realm));
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
    address msgSigner,
    ContextRegisterRequest memory request,
    ContextRegisterFunctionRequest[] calldata funcRequests
  ) private returns (bytes32) {

    (ScopeType signerScopeType, bytes32 signerScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(msgSigner);
    require(signerScopeType != ScopeType.NONE, "Operation Not Permitted");

    bytes32 newContextId = LAclUtils.accountGenerateId(request.contractId);
    require(_data.scopes[newContextId].stype == ScopeType.CONTEXT, "Context Already Registered");

    RealmEntity storage realmEntity = _data.realmReadSlot(request.realmId);
    require(realmEntity.bs.stype == ScopeType.REALM, "Realm Not Found");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Realm Alterability Disbaled");
    require(IRealmManagement.realmCheckAdmin(request.realmId, msgSigner), "Update Realm Not Permitted");
    require(signerScopeType >= realmScopeType, "Illegal Signer Scope Type");

    if(signerScopeType == ScopeType.REALM) {
      require(signerScopeId == request.realmId, "Illegal Signer Scope ID");

    } else if (signerScopeType == ScopeType.DOMAIN) {
      require(signerScopeId == realmEntity.domainId, "Illegal Signer Scope ID");
    }

    realmEntity.contexts.add(connewContextIdtextId);    
    ContextEntity storage newContext = _data.contextWriteSlot(newContextId);

    // checking requested context admin 
    if(request.adminId != bytes32(0)) {
      BaseAgent storage adminBaseAgent = _data.agents[request.adminId];
      require(adminBaseAgent.atype != AgentType.NONE, "Admin Context Not Found");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(request.adminId);
     
      if(adminBaseAgent.atype != AgentType.TYPE) {
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == request.realmId, "Illegal Amind Scope ID");
     
        } else if(ScopeType.DOMAIN == requestAdminScopeType){
          require(requestAdminScopeId == realmEntity.domainId, "Illegal Amind Scope ID");

        } else {
          require(requestAdminScopeId == IAccessControl(address(this)).getScopeMasterTypeId(), "Illegal Amind Scope ID");
        } 
      } 
      newContext.bs.adminId = request.adminId;
    } else {
      newContext.bs.adminId = IAccessControl(address(this)).getScopeMasterTypeId();
    }

    newContext.realmId = request.realmId;
    newContext.contractId = request.contractId;
    newContext.bs.stype = ScopeType.CONTEXT;
    newContext.bs.acstat = request.acstat;
    newContext.bs.alstat = request.alstat;
    newContext.bs.typelimit = request.typeLimit;
     
    for (uint256 i = 0; i < funcRequests.length; i++) {

      bytes32 newFunctionId = LAclUtils.functionGenerateId(request.contractId, funcRequests[i].selector);
      require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Function Already Registered");

      FunctionEntity storage fe = _data.functioWriteSlot(newFunctionId);

      if(funcRequests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[funcRequests[i].adminId];
        require(adminBaseAgent.atype != AgentType.NONE, "Admin Function Not Found");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(funcRequests[i].adminId);      

        if(adminBaseAgent.atype != AgentType.TYPE) {
          require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(ScopeType.REALM == requestAdminScopeType) {
            require(requestAdminScopeId == request.realmId, "Illegal Amind Scope ID");
      
          } else if(ScopeType.DOMAIN == requestAdminScopeType){
            require(requestAdminScopeId == realmEntity.domainId, "Illegal Amind Scope ID");

          } else {
            require(requestAdminScopeId == IAccessControl(address(this)).getScopeMasterTypeId(), "Illegal Amind Scope ID");
          } 
        } 
        fe.bs.adminId = funcRequests.adminId;
      } else {
        fe.bs.adminId = IAccessControl(address(this)).getScopeMasterTypeId();
      }

      require(_data.agents[funcRequests[i].agentId].atype != AgentType.NONE, "Function Agent Not Found");

      fe.bs.acstat = funcRequests[i].acstat;
      fe.bs.alstat = funcRequests[i].alstat;
      fe.bs.stype = ScopeType.FUNCTION;
      fe.contextId = newContextId;
      fe.typeLimit = funcRequests[i].typeLimit;
      fe.agentId = funcRequests[i].agentId;
      fe.policyCode = funcRequests[i].policyCode;
      fe.selector = funcRequests[i].selector;

      newContext.functions.add(newFunctionId);

      emit ContextFunctionRegistered(
        msg.sender,
        newContextId, 
        newFunctionId,
        funcRequest[i].adminId,
        funcRequest[i].agentId,
        funcRequest[i].typeLimit,
        _data.agents[funcRequest[i].adminId].atype,
        _data.agents[funcRequest[i].agentId].atype,
        funcRequest[i].acstat,
        funcRequest[i].alstat,
        funcRequest[i].policy,
        funcRequest[i].selector
      );
    }

    return newContextId;
  }

  function _upgradeContext(
    address msgSigner,
    ContextUpgradeRequest calldata request,
    ContextUpgradeFunctionRequest[] calldata funcRequests
  ) internal returns (address) {

    bytes32 contextId = LAclUtils.accountGenerateId(request.contractId);  
    ContextEntity storage ce = _data.contextReadSlot(contextId);
    require(ce.contractId == msg.sender, "Upgrade Context Forbidden");
    require(ce.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Upgrade Context");

    (ScopeType signerScopeType, bytes32 signerScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(msgSigner);
    require(signerScopeType != ScopeType.NONE, "Operation Not Permitted");

    bytes32 newContextId = LAclUtils.accountGenerateId(request.contractId);
    require(_data.scopes[newContextId].stype == ScopeType.CONTEXT, "Context Already Registered");

    for (uint256 i = 0; i < funcRequests.length; i++) {
      if(funcRequests.action == ActionType.ADD) {
        bytes32 newFunctionId = LAclUtils.functionGenerateId(request.contractId, funcRequests[i].selector);
        require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Function Already Registered");

        FunctionEntity storage fe = _data.functioWriteSlot(newFunctionId);

        if(funcRequests[i].adminId != bytes32(0)) {
          BaseAgent storage adminBaseAgent = _data.agents[funcRequests[i].adminId];
          require(adminBaseAgent.atype != AgentType.NONE, "Admin Function Not Found");
          (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(funcRequests[i].adminId);      

          if(adminBaseAgent.atype != AgentType.TYPE) {
            require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin Scope Type");
            if(ScopeType.REALM == requestAdminScopeType) {
              require(requestAdminScopeId == request.realmId, "Illegal Amind Scope ID");
        
            } else if(ScopeType.DOMAIN == requestAdminScopeType){
              require(requestAdminScopeId == realmEntity.domainId, "Illegal Amind Scope ID");

            } else {
              require(requestAdminScopeId == IAccessControl(address(this)).getScopeMasterTypeId(), "Illegal Amind Scope ID");
            } 
          } 
          fe.bs.adminId = funcRequests.adminId;
        } else {
          fe.bs.adminId = IAccessControl(address(this)).getScopeMasterTypeId();
        }

        require(_data.agents[funcRequests[i].agentId].atype != AgentType.NONE, "Function Agent Not Found");

        fe.bs.acstat = funcRequests[i].acstat;
        fe.bs.alstat = funcRequests[i].alstat;
        fe.bs.stype = ScopeType.FUNCTION;
        fe.contextId = contextId;
        fe.typeLimit = funcRequests[i].typeLimit;
        fe.agentId = funcRequests[i].agentId;
        fe.policyCode = funcRequests[i].policyCode;
        fe.selector = funcRequests[i].selector;

        ce.functions.add(functionId);

        emit ContextFunctionRegistered(
          msg.sender,
          contextId, 
          newFunctionId,
          funcRequest[i].adminId,
          funcRequest[i].agentId,
          funcRequest[i].typeLimit,
          _data.agents[funcRequest[i].adminId].atype,
          _data.agents[funcRequest[i].agentId].atype,
          funcRequest[i].acstat,
          funcRequest[i].alstat,
          funcRequest[i].policy,
          funcRequest[i].selector
        );

      } else if(funcRequests.action == ActionType.REMOVE) {
        bytes32 functionId = LAclUtils.functionGenerateId(ce.contractId, funcRequests[i].selector);
        FunctionEntity storage fe = _data.functionReadSlot(functionId);
        fe.bs.acstate = ActivityStatus.DELETED;
        fe.bs.alstate = ActivityStatus.DISABLE;
        ce.functions.remove(functionId);
        emit ContextUpgradeFunctionRemoved(msg.sender, contextId, functionId);
      } else {
        revert("Illeagl Upgrade Context Action");
      }
    }

    return contractId;
  }

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.contextUpdateActivityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {      
      require(_data.scopes[requests[i].id].stype == ScopeType.CONTEXT, "Invalid Function ID Slot");
      require(_data.scopes[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

      // check admin function
      require(_doContextCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      _data.scopes[requests[i].id].acstat = requests[i].acstat;
      emit ContextActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.contextUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doContextCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.CONTEXT, "Invalid Function ID Slot");
      _data.scopes[requests[i].id].alstat = requests[i].alstat;
      emit ContextAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.contextUpdateAdmin.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Context");
      require(_doContextCheckAdminAccount(requests[i].id, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {                
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER, "Illegal Admin Context AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(ScopeType.CONTEXT == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, requests[i].id), "Illegal Admin Scope ID");
        }
        contextEntity.bs.adminId = requests[i].adminId;

      } else {
        contextEntity.bs.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit ContextAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function contextUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.contextUpdateTypeLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doContextCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      require(_data.scopes[requests[i].id].stype == ScopeType.CONTEXT, "Invalid Context ID Slot");
      _data.scopes[requests[i].id].typeLimit = requests[i].typeLimit;
      emit ContextTypeLimitUpdated(msg.sender, requests[i].id, requests[i].typeLimit);
    }
    return true;
  }

  function contextCheckId(bytes32 contextId) external view returns (bool) {
    return _data.scopes[contextId].stype == ScopeType.CONTEXT;
  }

  function contextCheckAccount(address contactId) external view returns (bool) {
    return _data.scopes[LAclUtils.accountGenerateId(contractId)].stype == ScopeType.CONTEXT;
  }

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool) {
    _doContextCheckAdmin(contextId, account);
  }

  function _doContextCheckAdmin(bytes32 contextId, address account) internal view returns (bool) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return false;  
    
    bytes32 contextAdminId = ce.bs.adminId;
    bytes32 memberId = LAclUtils.accountGenerateId(account);
    AgentType adminAgentType = _data.agents[contextAdminId].atype;
    if(adminAgenType == AgentType.MEMBER) {
      return memberId == contextAdminId;

    } else if(adminAgenType == AgentType.ROLE || adminAgenType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), memberId);
    } 
  
    return false;
  }

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool) {
    return _doContextHasFunction(contextId, functionId);
  }

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool) {
    bytes32 contextId = LAclUtils.accountGenerateId(contractId);
    bytes32 functionId = LAclUtils.functionIdGenerateId(contractId, selector);
    return _doContextHasFunction(contextId, functionId);
  }

  function _doContextHasFunction(bytes32 contextId, bytes32 functionId) internal view returns (bool) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return false;
    return ce.functions.contains(functionId);    
  }

  function contextGetRealm(bytes32 contextId) external view returns (bytes32) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return bytes32(0);
    return ce.realmId;    
  }

  function contextGetAdmin(bytes32 contextId) external view returns (AgentType, bytes32) {
    return (_data.agents[_data.scopes[contextId].adminId].atype, _data.scopes[contextId].adminId);
  }

  function contextGetActivityStatus(bytes32 contextId) external view returns (ActivityStatus){
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return AlterabilityStatus.NONE;
    return ce.bs.alstat;
  }

  function contextGetAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return AlterabilityStatus.NONE;
    return ce.bs.alstat;
  }

  function contextGetContractId(bytes32 contextId) external view returns (address) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return address(0);
    return ce.contractId;
  }

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return new bytes32[](0);
    return ce.functions.values();
  }

  function contextGetFunctionsCount(bytes32 contextId) external view returns (uint8) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return 0;
    return ce.functions.length();
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
        typeLimit: 0,
        functionsCount: 0,
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
      typeLimit: ce.bs.typeLimit,
      functionsCount: ce.functions.length(),
      adminType: _data.agents[ce.adminId].atype,        
      acstat: ce.bs.acstat,
      alstate: ce.bs.alstat
    });
  }
}