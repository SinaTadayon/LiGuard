// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../IACLCommons.sol";

/**
 * @title Context Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IContextManagement is IACLCommons {
  struct ContextRegisterRequest {
    bytes32 realmId;
    bytes32 adminId;
    bytes32 salt;
    string name;
    string version;
    address contractId;
    address subject;
    address deployer;
    int16 functionLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes signature;
  }

  struct ContextUpdateFunctionLimitRequest {
    bytes32 contextId;
    uint8 functionLimit;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    address contractId;
    uint8 functionCount;
    uint8 functionLimit;
    uint32 referredByAgent;
    AgentType adminType;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ContextRegistered(
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,
    bytes32 realmId,
    address deployer,
    address subject,
    bytes32 adminId
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextFunctionLimitUpdated(address indexed sender, bytes32 indexed contextId, uint8 functionLimit);

  event ContextRemoved(address indexed sender, bytes32 indexed contextId, bool isSoftDelete);

  function contextRegister(MemberSignature calldata memberSign, ContextRegisterRequest[] calldata requests)
    external
    returns (bool);

  function contextUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function contextUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function contextUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function contextUpdateFunctionLimit(
    MemberSignature calldata memberSign,
    ContextUpdateFunctionLimitRequest[] calldata requests
  ) external returns (bool);

  function contextRemove(MemberSignature calldata memberSign, bytes32[] calldata contexts) external returns (bool);

  function contextCheckId(bytes32 contextId) external view returns (bool);

  function contextCheckAccount(address contractId) external view returns (bool);

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetInfo(bytes32 contextId) external view returns (ContextInfo memory);
}
