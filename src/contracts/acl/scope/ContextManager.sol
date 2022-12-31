// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IContextManagement.sol";
import "../ACLStorage.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/proxy/LClones.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Context Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ContextManager is ACLStorage, BaseUUPSProxy, IContextManagement {
  using LACLStorage for DataCollection;    
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LClones for address;  

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {        
    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IContextManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by system admin
  function contextRegister(ContextRegisterRequest[] calldata requests) external returns (bool) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");   
    for (uint256 i = 0; i < requests.length; i++) {

      address signer;
      address contractId;
      if(requests[i].contractId == address(0)) {
        if(requests[i].signature.length > 0) {
          signer = _doGetSignerAddress(
            requests[i].signature, 
            _getPredictContextMessageHash(requests[i].deployer, requests[i].subject, requests[i].realmId)
          );
        } else {
          signer = msg.sender;
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
        
      } else {
        if(requests[i].signature.length > 0) {
          bytes32 structHash = _getContextMessageHash(
            requests[i].contractId, 
            LACLUtils.generateHash(requests[i].name), 
            LACLUtils.generateHash(requests[i].version),
            requests[i].realmId
          );
          signer = _doGetSignerAddress(requests[i].signature, structHash);
        } else {
          signer = msg.sender;
        }    
        contractId = requests[i].contractId;
      }

      _doRegisterContext(requests[i], contractId, signer);     
    }

    return true;
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

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);      
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(_doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId), "Forbidden");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");    
      contextEntity.bs.acstat = requests[i].acstat;
      emit ContextActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {      
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(_doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId), "Forbidden");      
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      contextEntity.bs.alstat = requests[i].alstat;
      emit ContextAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for(uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      
      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
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

      emit ContextAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function contextUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IContextManagement.contextUpdateAgentLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].scopeId, senderId, functionId);
      require(requests[i].agentLimit > contextEntity.bs.referredByAgent, "Illegal Limit");
      contextEntity.bs.agentLimit = requests[i].agentLimit;
      emit ContextAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
    }
    return true;
  }

  function contextCheckId(bytes32 contextId) external view returns (bool) {
    return _data.scopes[contextId].stype == ScopeType.CONTEXT;
  }

  function contextCheckAccount(address contractId) external view returns (bool) {
    return _data.scopes[LACLUtils.accountGenerateId(contractId)].stype == ScopeType.CONTEXT;
  }

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) return false;  

    bytes32 contextAdminId = ce.bs.adminId;
    AgentType agentType = _data.agents[contextAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

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
    bytes32 contextId = LACLUtils.accountGenerateId(contractId);
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
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

    if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;

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

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if (!result) return new bytes32[](0);
    return ce.functions.values();
  }

  function contextGetInfo(bytes32 contextId) external view returns (ContextInfo memory) {
    (ContextEntity storage ce, bool result) = _data.contextTryReadSlot(contextId);
    if(!result) {
      return ContextInfo ({
        realmId: bytes32(0),
        adminId: bytes32(0),
        name: "",
        version: "",
        contractId: address(0),
        functionCount: 0,
        agentLimit: 0,
        referredByAgent: 0,
        adminType: AgentType.NONE,
        stype: ScopeType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return ContextInfo ({
      realmId: ce.realmId,
      adminId: ce.bs.adminId,
      name: IProxy(ce.contractId).contractName(),
      version: IProxy(ce.contractId).contractVersion(),
      contractId: ce.contractId,
      functionCount: uint16(ce.functions.length()),
      agentLimit: ce.bs.agentLimit,
      referredByAgent: ce.bs.referredByAgent,
      adminType: _data.agents[ce.bs.adminId].atype,
      stype: ce.bs.stype,
      acstat: ce.bs.acstat,
      alstat: ce.bs.alstat
    });
  }

  function _accessPermission(bytes4 selector) internal view returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    require(IAccessControl(address(this)).hasMemberAccess(senderId, functionId), "Access Denied");
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 contextId, bytes32 senderId, bytes32 functionId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId), "Forbidden");
    return contextEntity;
  }

  function _doGetScopeInfo(bytes32 signerId) internal view returns (ScopeType, bytes32) {
    // get scope id of sender
    TypeEntity storage systemAdminType = _data.typeReadSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
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

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _doCheckSystemScope(bytes32 scopeId, bytes32 memberId) internal view returns (bool) {  
    TypeEntity storage systemType = _data.typeReadSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    RoleEntity storage memberSystemRole = _data.roleReadSlot(memberRoleId);
    if(_data.scopes[memberSystemRole.scopeId].stype < ScopeType.REALM) return false;
    if(memberSystemRole.scopeId == scopeId) {
      return true;
    } 

    return IAccessControl(address(this)).isScopesCompatible(memberSystemRole.scopeId, scopeId);    
  }


  function _doRegisterContext(ContextRegisterRequest calldata request, address contractId, address signer) internal {
    
    bytes32 functionId = LACLUtils.functionGenerateId(_data.selectors[IContextManagement.contextRegister.selector], IContextManagement.contextRegister.selector);
    bytes32 signerId = LACLUtils.accountGenerateId(signer);  
    bytes32 newContextId = LACLUtils.accountGenerateId(contractId);
    require(IAccessControl(address(this)).hasMemberAccess(signerId, functionId), "Access Denied");
    require(_data.scopes[newContextId].stype == ScopeType.NONE, "Already Exist");
    require(
      request.acstat > ActivityStatus.DELETED && 
      request.alstat > AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );

    {
      // update member factory limit
      MemberEntity storage memberEntity = _data.memberReadSlot(signerId);
      require(memberEntity.factoryLimit > 0, "Illegal Factory");
      memberEntity.factoryLimit -= 1;

      // check realm 
      RealmEntity storage realmEntity = _data.realmReadSlot(request.realmId);
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

      // check system scope
      require(_doCheckSystemScope(request.realmId, signerId), "Forbidden");

      // add context to realm
      realmEntity.contexts.add(newContextId);    

      // create new context
      ContextEntity storage newContext = _data.contextWriteSlot(newContextId);
      newContext.realmId = request.realmId;
      newContext.contractId = contractId;      
      newContext.bs.stype = ScopeType.CONTEXT;
      newContext.bs.acstat = request.acstat;
      newContext.bs.alstat = request.alstat;
      newContext.bs.agentLimit = request.agentLimit;
      newContext.bs.adminId = _getContextAdmin(request.realmId, newContextId, realmEntity.bs.adminId, request.adminId);    
    }

    emit ContextRegistered(      
      msg.sender,
      newContextId, 
      contractId,
      signer,
      request.deployer,
      request.subject,
      request.adminId
    );    
  }

}