// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

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
    uint16 agentLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes signature;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    uint16 agentLimit;
    uint16 referredByAgent;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ContextRegistered(
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,    
    address signer,
    address deployer,
    address subject,
    bytes32 adminId
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextAgentLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 agentLimit);

  function contextRegister(ContextRegisterRequest[] calldata requests) external returns (bool);

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function contextUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);

  function contextCheckId(bytes32 contextId) external view returns (bool);

  function contextCheckAccount(address contractId) external view returns (bool);

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetInfo(bytes32 contextId) external view returns (ContextInfo memory);

}
