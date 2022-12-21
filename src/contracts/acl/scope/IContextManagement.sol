// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Context Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IContextManagement is IAclCommons {
  
  struct ContextRegisterRequest {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    uint16 agentLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextRegisterPredictRequest {
    bytes32 realmId;
    bytes32 adminId;
    bytes32 salt;
    string name;
    string version;
    address subject;
    address deployer;
    uint16 agentLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextUpgradeRequest {
    address contractId;
    string name;
    string version;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextRegisterFunctionRequest {
    bytes32 adminId;
    bytes32 agentId;
    uint16 agentLimit;
    uint8 policyCode;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4 selector;    
  }

  struct ContextUpgradeFunctionRequest {
    bytes32 adminId;
    bytes32 agentId;
    uint16 agentLimit;
    uint8 policyCode;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    ActionType action;
    bytes4 selector;    
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    uint16 agentLimit;
    uint16 referredByAgent;
    uint16 referredByPolicy;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }

  event ContextRegistered (
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,
    address signer,
    bytes32 realmId,
    bytes32 adminId
  );

  event PredictContextRegistered(
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,    
    address signer,
    address deployer,
    address subject,
    bytes32 realmId,
    bytes32 adminId
  );

  event ContextUpgraded(
    address indexed sender, 
    bytes32 indexed contextId, 
    address indexed contractId, 
    string name, 
    string version
  );

  event ContextFunctionRegistered(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    bytes32 agentId,
    bytes4 selector,
    uint8 policyCode
  );

  event ContextUpgradeFunctionAdded(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId,
    bytes32 agentId,
    bytes4 selector,
    uint8 policyCode
  );

  event ContextUpgradeFunctionRemoved(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextAgentLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 agentLimit);


  // called by contract that want to register itself
  function contextRegister(
    bytes memory signature,
    ContextRegisterRequest calldata request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32);

  // called by factory contract that want to register new created contract
  function contextRegisterPredict(
    bytes memory signature,
    ContextRegisterPredictRequest calldata request,
    ContextRegisterFunctionRequest[] calldata functionRequests
  ) external returns (bytes32);

  // called by contract that want to upgrade itself
  function contextUpgrade(
    bytes memory signature,
    ContextUpgradeRequest calldata request,
    ContextUpgradeFunctionRequest[] calldata functionRequests
  ) external returns (address);

  function contextDeleteActivity(bytes32[] calldata requests) external returns (bool);

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function contextUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);

  function contextCheckId(bytes32 contextId) external view returns (bool);

  function contextCheckAccount(address contactId) external view returns (bool);

  function contextCheckAdmin(bytes32 contextId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

}
