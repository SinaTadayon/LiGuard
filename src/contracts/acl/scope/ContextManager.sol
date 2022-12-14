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

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function functionUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function contextUpdateFactoryLimit(ContextUpdateFactoryLimitRequest[] calldata requests) external returns (bool);

  function contextUpdateFunctionLimit(ContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool);

  function contextCheckId(bytes32 contextId) external view returns (bool);

  function contextCheckAddress(address contactId) external view returns (bool);

  function functionCheckAdmin(bytes32 functionId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool);

  function contextGetRealm(bytes32 contextId) external view returns (bytes32);

  function contextGetFunctionLimit(bytes32 contextId) external view returns (uint8);

  function contextGetAdmin(bytes32 contextId) external view returns (AgentType, bytes32);

  function contextGetActivityStatus(bytes32 contextId) external view returns (ActivityStatus);

  function contextGetAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus);

  function contextGetContractId(bytes32 contextId) external view returns (address);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetFunctionsCount(bytes32 contextId) external view returns (uint8);

  function contextGetContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

  function contextGenerateId(address contractId) external pure returns (bytes32);
}