// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IContextManagement.sol";
import "../ACLStorage.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
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
    return interfaceId == type(IContextManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by system admin
  function contextRegister(MemberSignature calldata memberSign, ContextRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    for (uint256 i = 0; i < requests.length; i++) {
      address contractId;
      if (requests[i].contractId == address(0)) {
        if (memberSign.signature.length == 0) {
          if (requests[i].signature.length > 0) {
            signer = LACLUtils.getSignerAddress(
              requests[i].signature,
              _getPredictContextMessageHash(requests[i].deployer, requests[i].subject, requests[i].realmId)
            );
          } else {
            signer = msg.sender;
          }
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
      } else {
        if (memberSign.signature.length == 0) {
          if (requests[i].signature.length > 0) {
            bytes32 structHash = _getContextMessageHash(
              requests[i].contractId,
              LACLUtils.generateHash(requests[i].name),
              LACLUtils.generateHash(requests[i].version),
              requests[i].realmId
            );
            signer = LACLUtils.getSignerAddress(requests[i].signature, structHash);
          } else {
            signer = msg.sender;
          }
        }
        contractId = requests[i].contractId;
      }

      _doRegisterContext(requests[i], contractId, signer);
    }

    return true;
  }

  function contextUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IContextManagement.contextUpdateActivityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      
      IACL.AdminAccessStatus status = _doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      contextEntity.bs.acstat = requests[i].acstat;
      emit ContextActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function contextUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IContextManagement.contextUpdateAlterabilityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].id);
      require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");

      IACL.AdminAccessStatus status = _doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      contextEntity.bs.alstat = requests[i].alstat;
      emit ContextAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function contextUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IContextManagement.contextUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested type admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
        if (ScopeType.CONTEXT == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Admin Scope");
        } else {
          require(
            IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id),
            "Illegal Admin Scope"
          );
        }
        contextEntity.bs.adminId = requests[i].adminId;
      } else {
        contextEntity.bs.adminId = _data.scopes[contextEntity.realmId].adminId;
      }

      emit ContextAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function contextUpdateFunctionLimit(
    MemberSignature calldata memberSign,
    ContextUpdateFunctionLimitRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IContextManagement.contextUpdateFunctionLimit.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].contextId,
        senderId,
        functionId
      );
      require(requests[i].functionLimit > contextEntity.functions.length(), "Illegal Limit");
      contextEntity.functionLimit = requests[i].functionLimit;
      emit ContextFunctionLimitUpdated(sender, requests[i].contextId, requests[i].functionLimit);
    }
    return true;
  }

  function contextRemove(
    MemberSignature calldata memberSign, 
    bytes32[] calldata contexts    
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IContextManagement.contextRemove.selector
    );

    for (uint256 i = 0; i < contexts.length; i++) {
      ContextEntity storage contextEntity = _data.contextReadSlot(contexts[i]);      
      IACL.AdminAccessStatus status = _doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);      
      if(contextEntity.functions.length() == 0) {
        require(contextEntity.bs.referredByAgent == 0, "Illegal Remove");
        
        // check realm
        RealmEntity storage realmEntity = _data.realmReadSlot(contextEntity.realmId);
        require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
        realmEntity.contexts.remove(contexts[i]);

        delete contextEntity.bs;
        delete contextEntity.realmId;
        delete contextEntity.contractId;
        delete contextEntity.functionLimit;
        delete contextEntity.functions;
        emit ContextRemoved(sender, contexts[i], false);

      } else {
        require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        contextEntity.bs.acstat = ActivityStatus.DELETED;
        emit ContextRemoved(sender, contexts[i], true);
      }
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
    if (!result) return false;

    bytes32 contextAdminId = ce.bs.adminId;
    AgentType agentType = _data.agents[contextAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = _data.roleTryReadSlot(contextAdminId);
      if (!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == contextAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(contextAdminId);
      if (!result1) return false;

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
    if (!result) return false;
    return ce.functions.contains(functionId);
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == AgentType.TYPE) {
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
    if (!result) {
      return
        ContextInfo({
          realmId: bytes32(0),
          adminId: bytes32(0),
          contractId: address(0),
          functionCount: 0,
          functionLimit: 0,
          referredByAgent: 0,
          adminType: AgentType.NONE,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE
        });
    }

    return
      ContextInfo({
        realmId: ce.realmId,
        adminId: ce.bs.adminId,
        contractId: ce.contractId,
        functionCount: uint8(ce.functions.length()),
        functionLimit: ce.functionLimit,
        referredByAgent: ce.bs.referredByAgent,
        adminType: _data.agents[ce.bs.adminId].atype,
        stype: ce.bs.stype,
        acstat: ce.bs.acstat,
        alstat: ce.bs.alstat
      });
  }

  function _accessPermission(MemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) {
      if(status == IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN && IContextManagement.contextUpdateActivityStatus.selector == selector) {
        return (functionId, senderId, signer);    
      }
      LACLUtils.generateAuthorizationError(status);
    }

    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 contextId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
    require(contextEntity.bs.acstat > ActivityStatus.DELETED, "Context Deleted");
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(contextEntity.bs.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return contextEntity;
  }

  function _getContextAdmin(
    bytes32 realmId,
    bytes32 scopeId,
    bytes32 requestScopeAdmin,
    bytes32 adminId
  ) internal view returns (bytes32 contextAdminId) {
    // checking requested context admin
    if (adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == realmId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      contextAdminId = adminId;
    } else {
      contextAdminId = requestScopeAdmin;
    }
  }

  function _doCheckSystemScope(bytes32 scopeId, bytes32 memberId) internal view returns (bool) {
    TypeEntity storage systemType = _data.typeReadSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    RoleEntity storage memberSystemRole = _data.roleReadSlot(memberRoleId);
    if (_data.scopes[memberSystemRole.scopeId].stype < ScopeType.REALM) return false;
    if (memberSystemRole.scopeId == scopeId) {
      return true;
    }

    return IACLGenerals(address(this)).isScopesCompatible(memberSystemRole.scopeId, scopeId);
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

  function _doRegisterContext(
    ContextRegisterRequest calldata request,
    address contractId,
    address signer
  ) internal {
    bytes32 functionId = LACLUtils.functionGenerateId(
      _data.selectors[IContextManagement.contextRegister.selector],
      IContextManagement.contextRegister.selector
    );
    bytes32 signerId = LACLUtils.accountGenerateId(signer);
    bytes32 newContextId = LACLUtils.accountGenerateId(contractId);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, signerId);
    if (status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    require(_data.scopes[newContextId].stype == ScopeType.NONE, "Already Exist");
    require(
      request.acstat > ActivityStatus.DELETED && request.alstat > AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );

    {
      // update member context register limit
      MemberEntity storage memberEntity = _data.memberReadSlot(signerId);
      require(memberEntity.limits.contextRegisterLimit > 0, "Illegal RegisterLimit");
      unchecked {
        memberEntity.limits.contextRegisterLimit -= 1;
      }

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
      newContext.functionLimit = request.functionLimit >= 0
        ? uint8(uint16(request.functionLimit))
        : memberEntity.limits.functionLimit;
      newContext.bs.stype = ScopeType.CONTEXT;
      newContext.bs.acstat = request.acstat;
      newContext.bs.alstat = request.alstat;
      newContext.bs.adminId = _getContextAdmin(request.realmId, newContextId, realmEntity.bs.adminId, request.adminId);
    }

    emit ContextRegistered(
      signer,
      newContextId,
      contractId,
      request.realmId,
      request.deployer,
      request.subject,
      request.adminId
    );
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}
