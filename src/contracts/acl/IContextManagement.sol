// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "./IAclCommons.sol";

/**
 * @title Context Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IContextManagement is IAclCommons {
  
  struct RequestContext {
    bytes32 realmId;
    bytes32 adminAgentId;
    string name;
    string version;
    address contractId;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct RequestPredictContext {
    bytes32 realmId;
    bytes32 salt;
    bytes32 adminAgentId;
    string name;
    string version;
    address subject;
    address deployer;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct RequestRegisterFunctionContext {
    bytes32 agentId;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4[] selectors;    
  }

  struct RequestAlterFunctionContext {
    bytes32 agentId;
    AgentType atype;
    ActionType action;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4[] funcSelectors;    
  }

  struct RequestUpdateAgentContext {
    bytes32 agentId;
    AgentType atype;
    ActionType action;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminAgentId;
    AgentLimit limits;
    uint16 functionLimit;
    string name;
    string version;
    address contractId;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }

  event ContextRegistered (
    address indexed sender,
    address indexed contractId,
    bytes32 indexed contextId,
    address signer,
    string name,
    string version,
    bytes32 realmId,
    bytes32 adminAgentId,
    AgentType atype,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event PredictContextRegistered(
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,    
    address signer,
    address deployer,
    address subject,
    string name,
    string version,
    bytes32 realmId,
    bytes32 adminAgentId,
    AgentType atype,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event ContextUpdated(bytes32 indexed context, address indexed contractId, address indexed sender, bytes32 realm);

  event ContextStatusChanged(bytes32 indexed context, address indexed sender, bytes32 indexed realm, bool status);

  event ContextFunctionUpdated(
    address indexed sender, 
    bytes32 indexed contextId, 
    bytes32 indexed functionId, 
    bytes32 agentId, 
    AgentType agentType, 
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event ContextAgentUpdated(    
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed agentId,
    AgentType agentType,
    AccountType action
  );

  event ContextAdminAgentUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed agentId, AgentType agentType);

  event ContextAgentLimitUpdated(address indexed sender, bytes32 indexed contextId, AgentLimit agentLimit);

  event ContextFunctionLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 functionLimit);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextRealmIdUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed realmId);

  function registerContext(
    bytes memory signature,
    RequestContext calldata rc,
    RequestRegisterFunctionContext[] calldata rcr
  ) external returns (bytes32);

  function registerPredictContext(
    bytes memory signature,
    RequestPredictContext calldata rpc,
    RequestRegisterFunctionContext[] calldata rrfc
  ) external returns (bytes32);

  function upgradeContext(
    bytes memory signature,
    RequestContext calldata rc,
    RequestAlterFunctionContext[] calldata rufc
  ) external returns (address);

  function updateContextFunctions(bytes32 contextId, RequestAlterFunctionContext[] calldata rufc) external returns (bool);

  function updateContextAgents(bytes32 contextId, RequestUpdateAgentContext[] calldata ruac) external returns (bool);
 
  function updateContextActivityStatus(bytes32 contextId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateContextAlterabilityStatus(bytes32 contextId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateContextAdminAgent(bytes32 contextId, bytes32 newAdminAgentId, AgentType newAdminAgentType) external returns (bool);

  function updateContextRealmId(bytes32 contextId, bytes32 newRealmId) external returns (bool);

  function updateContextAgentLimit(bytes32 contextId, AgentLimit calldata agentLimit) external returns (bool);

  function updateContextFunctionLimit(bytes32 contextId, uint16 functionLimit) external returns (bool);

  function isContextExists(bytes32 contextId) external view returns (bool);

  function hasContextAgent(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function hasContextFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function hasContextSelector(bytes32 contextId, bytes4 selector) external view returns (bool);

  function getContextRealmId(bytes32 contextId) external view returns (bytes32);

  function getContextAgentLimit(bytes32 contextId) external view returns (AgentLimit memory);

  function getContextFunctionLimit(bytes32 contextId) external view returns (uint16);

  function getContextAdminAgent(bytes32 contextId) external view returns (bytes32, AgentType);

  function getContextActivityStatus(bytes32 contextId) external view returns (ActivityStatus);

  function getContextAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus);

  function getContextContractId(bytes32 contextId) external view returns (address);

  function getContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

  function getContextFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function getContextAgents(bytes32 contextId) external view returns (bytes32[] memory);
}
