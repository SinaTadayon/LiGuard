// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IFunctionManagementTest.sol";
import "../IACLTest.sol";
import "../IACLGeneralsTest.sol";
import "../ACLStorageTest.sol";
import "../lib/LACLStorageTest.sol";
import "../lib/LACLAgentScopeTest.sol";
import "../lib/LACLUtilsTest.sol";
import "../../../../lib/cryptography/LECDSA.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../../../../lib/proxy/LClones.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract FunctionManagerTest is ACLStorageTest, BaseUUPSProxy, IFunctionManagementTest {
  using LACLStorageTest for DataCollection;
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
    return interfaceId == type(IFunctionManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  function functionRegister(MemberSignature calldata memberSign, FunctionRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtilsTest.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    for (uint256 i = 0; i < requests.length; i++) {
      address contractId;
      if (requests[i].contractId == address(0)) {
        if (memberSign.signature.length == 0) {
          if (requests[i].signature.length > 0) {
            signer = LACLUtilsTest.getSignerAddress(
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
              LACLUtilsTest.generateHash(requests[i].name),
              LACLUtilsTest.generateHash(requests[i].version),
              requests[i].realmId
            );
            signer = LACLUtilsTest.getSignerAddress(requests[i].signature, structHash);
          } else {
            signer = msg.sender;
          }
        }
        contractId = requests[i].contractId;
      }

      bytes32 contextId = LACLUtilsTest.accountGenerateId(contractId);
      bytes32 signerId = LACLUtilsTest.accountGenerateId(signer);

      address functionFacetId = _data.selectors[IFunctionManagementTest.functionRegister.selector];
      bytes32 functionId = LACLUtilsTest.functionGenerateId(functionFacetId, IFunctionManagementTest.functionRegister.selector);
      IACLTest.AuthorizationStatus status = IACLTest(address(this)).hasMemberAccess(functionId, signerId);
      if (status != IACLTest.AuthorizationStatus.PERMITTED) LACLUtilsTest.generateAuthorizationError(status);

      // update member function register limit
      MemberEntity storage memberEntity = _data.memberReadSlot(signerId);
      require(
        int32(uint32(memberEntity.limits.functionRegisterLimit)) - int16(uint16(requests[i].functions.length)) >= 0,
        "Illegal RegisterLimit"
      );
      unchecked {
        memberEntity.limits.functionRegisterLimit -= uint16(requests[i].functions.length);
      }

      ContextEntity storage contextEntity = _data.contextReadSlot(contextId);
      require(contextEntity.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");
      require(contextEntity.functionLimit > contextEntity.functions.length(), "Illegal Limit");

      // check access system scope
      require(_doCheckSystemScope(contextId, signerId), "Forbidden");

      for (uint256 j = 0; j < requests[i].functions.length; j++) {
        _doFunctionRegistration(contextEntity, requests[i].functions[j], signer, contextId);
      }
    }
    return true;
  }

  function functionUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(
        _data.scopes[functionEntity.contextId].adminId,
        functionEntity.contextId,
        requests[i].adminId
      );
      emit FunctionAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function functionUpdateAgent(MemberSignature calldata memberSign, FunctionUpdateAgentRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionUpdateAgent.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].functionId,
        senderId,
        functionId
      );
      _doCheckAgentId(requests[i].agentId, functionEntity.contextId);
      functionEntity.agentId = requests[i].agentId;
      emit FunctionAgentUpdated(sender, requests[i].functionId, requests[i].agentId);
    }
    return true;
  }

  function functionUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionUpdateActivityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(functionEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      functionEntity.bs.acstat = requests[i].acstat;
      emit FunctionActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function functionUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionUpdateAlterabilityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");

      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(functionEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      functionEntity.bs.alstat = requests[i].alstat;
      emit FunctionAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function functionUpdatePolicyCode(
    MemberSignature calldata memberSign,
    FunctionUpdatePolicyRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionUpdatePolicyCode.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].functionId,
        senderId,
        functionId
      );
      functionEntity.policyCode = requests[i].policyCode;
      emit FunctionPolicyUpdated(sender, requests[i].functionId, requests[i].policyCode);
    }
    return true;
  }

  function functionRemove(MemberSignature calldata memberSign, bytes32[] calldata functions) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IFunctionManagementTest.functionRemove.selector
    );

    for (uint256 i = 0; i < functions.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(functions[i]);
      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(functionEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      if (functionEntity.bs.referredByAgent == 0) {
        ContextEntity storage contextEntity = _data.contextReadSlot(functionEntity.contextId);
        require(contextEntity.bs.alstat == AlterabilityStatus.UPGRADABLE, "Illegal Context Upgradable");
        contextEntity.functions.remove(functions[i]);

        delete functionEntity.bs;
        delete functionEntity.agentId;
        delete functionEntity.contextId;
        delete functionEntity.selector;
        delete functionEntity.policyCode;
        emit FunctionRemoved(sender, functions[i], false);
      } else {
        // Note: It's very important to prevent infinity lock state
        require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        functionEntity.bs.acstat = ActivityStatus.DELETED;
        emit FunctionRemoved(sender, functions[i], true);
      }
    }
    return true;
  }

  function functionCheckId(bytes32 functionId) external view returns (bool) {
    return _data.scopes[functionId].stype == ScopeType.FUNCTION;
  }

  function functionCheckSelector(address contractId, bytes4 selector) external view returns (bool) {
    return _data.scopes[LACLUtilsTest.functionGenerateId(contractId, selector)].stype == ScopeType.FUNCTION;
  }

  function functionCheckAdmin(bytes32 functionId, address account) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    return _doFunctionCheckAccount(fe.bs.adminId, account);
  }

  function functionCheckAgent(bytes32 functionId, address account) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    return _doFunctionCheckAccount(fe.agentId, account);
  }

  function _doFunctionCheckAccount(bytes32 agentId, address account) internal view returns (bool) {
    AgentType agentType = _data.agents[agentId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(agentId);
      if (!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == agentId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(agentId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) {
      return
        FunctionInfo({
          adminId: bytes32(0),
          agentId: bytes32(0),
          contextId: bytes32(0),
          selector: bytes4(0),
          referredByAgent: 0,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          adminType: AgentType.NONE,
          agentType: AgentType.NONE,
          policyCode: 0
        });
    }

    return
      FunctionInfo({
        adminId: fe.bs.adminId,
        agentId: fe.agentId,
        contextId: fe.contextId,
        selector: fe.selector,
        referredByAgent: fe.bs.referredByAgent,
        stype: fe.bs.stype,
        acstat: fe.bs.acstat,
        alstat: fe.bs.alstat,
        adminType: _data.agents[fe.bs.adminId].atype,
        agentType: _data.agents[fe.agentId].atype,
        policyCode: fe.policyCode
      });
  }

  function _doGetAgentScopeInfo(bytes32 agentId) internal view returns (ScopeType, bytes32) {
    return LACLAgentScopeTest.getAgentScopeInfo(_data, agentId);
  }

  function _doCheckSystemScope(bytes32 scopeId, bytes32 memberId) internal view returns (bool) {
    TypeEntity storage systemType = _data.typeReadSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    RoleEntity storage memberSystemRole = _data.roleReadSlot(memberRoleId);
    if (_data.scopes[memberSystemRole.scopeId].stype < ScopeType.CONTEXT) return false;
    if (memberSystemRole.scopeId == scopeId) {
      return true;
    }

    return IACLGeneralsTest(address(this)).isScopesCompatible(memberSystemRole.scopeId, scopeId);
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACLTest.AdminAccessStatus) {
    return LACLAgentScopeTest.checkAdminAccess(_data, adminId, memberId, functionId);
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
      signer = LACLUtilsTest.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtilsTest.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtilsTest.accountGenerateId(signer);
    IACLTest.AuthorizationStatus status = IACLTest(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACLTest.AuthorizationStatus.PERMITTED) {
      if (
        status == IACLTest.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN &&
        IFunctionManagementTest.functionUpdateActivityStatus.selector == selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtilsTest.generateAuthorizationError(status);
    }
    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 fId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (FunctionEntity storage) {
    FunctionEntity storage functionEntity = _data.functionReadSlot(fId);
    require(functionEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(functionEntity.bs.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    return functionEntity;
  }

  function _doFunctionRegistration(
    ContextEntity storage context,
    FunctionRequest calldata functionRequest,
    address signer,
    bytes32 contextId
  ) internal {
    bytes32 newFunctionId = LACLUtilsTest.functionGenerateId(context.contractId, functionRequest.selector);
    require(_data.scopes[newFunctionId].stype == ScopeType.NONE, "Already Exist");
    require(
      functionRequest.acstat > ActivityStatus.DELETED && functionRequest.alstat > AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );

    if (
      functionRequest.agentId != _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID &&
      functionRequest.agentId != _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID &&
      functionRequest.agentId != _LIVELY_PROFILE_ANY_TYPE_ID
    ) {
      _doCheckAgentId(functionRequest.agentId, contextId);
    }
    FunctionEntity storage functionEntity = _data.functionWriteSlot(newFunctionId);
    functionEntity.bs.stype = ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = functionRequest.acstat;
    functionEntity.bs.alstat = functionRequest.alstat;
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(context.bs.adminId, contextId, functionRequest.adminId);

    // add function to context
    context.functions.add(newFunctionId);

    emit FunctionRegistered(signer, contextId, newFunctionId, functionRequest.adminId, functionRequest.agentId);
  }

  function _doGetAndCheckFunctionAdmin(
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId
  ) internal view returns (bytes32 functionAdminId) {
    return LACLAgentScopeTest.getAndCheckFunctionAdmin(_data, contextAdminId, contextId, adminId);
  }

  function _getContextMessageHash(
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(CTX_MESSAGE_TYPEHASH, contractId, name, version, realmId));
  }

  function _doCheckAgentId(bytes32 agentId, bytes32 contextId) internal view {
    BaseAgent storage ba = _data.agents[agentId];
    require(ba.atype > AgentType.MEMBER, "Illegal AgentId");

    (ScopeType requestAgentScopeType, bytes32 requestAgentScopeId) = _doGetAgentScopeInfo(agentId);
    require(ScopeType.CONTEXT <= requestAgentScopeType, "Illegal Agent ScopeType");
    if (ScopeType.CONTEXT == requestAgentScopeType) {
      require(requestAgentScopeId == contextId, "Illegal Agent Scope");
    } else {
      require(IACLGeneralsTest(address(this)).isScopesCompatible(requestAgentScopeId, contextId), "Illegal Agent Scope");
    }
  }

  function _getPredictContextMessageHash(
    address deployer,
    address subject,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PREDICT_CTX_MESSAGE_TYPEHASH, deployer, subject, realmId));
  }

  function getLibrary() external pure returns (address) {
    return address(LACLAgentScopeTest);
  }
}
