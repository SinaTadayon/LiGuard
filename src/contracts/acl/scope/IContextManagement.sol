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
  
  struct RequestRegisterContext {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct RequestRegisterPredictContext {
    bytes32 realmId;
    bytes32 adminId;
    bytes32 salt;
    string name;
    string version;
    address subject;
    address deployer;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct RequestUpgradeContext {
    bytes32 contextId;  
    string name;
    string version;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct RequestRegisterFunctionContext {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4[] selectors;    
  }

  struct RequestAlterFunctionContext {
    bytes32 contextId;
    bytes32 functionAdminId;
    ActionType action;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes32[] funtions;
  }

  struct RequestAlterAgentContext {
    bytes32 contextId; 
    ActionType action;
    bytes32[] agents;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    AgentLimit limits;
    uint16 functionLimit;
    string name;
    string version;
    address contractId;
    AgentType adminType;
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
    bytes32 adminId,
    AgentType adminType,
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
    bytes32 adminId,
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event ContextUpgraded(
    address indexed sender, 
    bytes32 indexed contextId, 
    address indexed contractId, 
    string name, 
    string version
  );

  event ContextFunctionAltered(
    address indexed sender, 
    bytes32 indexed contextId,  
    bytes32 functionAdminId, 
    AgentType adminType, 
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    bytes32[] functions
  );

  event ContextAgentAltered(
    address indexed sender, 
    bytes32 indexed contextId,
    AccountType action,
    bytes32[] agents
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId, AgentType adminType);

  event ContextAgentLimitUpdated(address indexed sender, bytes32 indexed contextId, AgentLimit agentLimit);

  event ContextFunctionLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 functionLimit);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextRealmUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed realmId);

  // called by contract that want to register itself
  function registerContext(
    bytes memory signature,
    RequestRegisterContext calldata rc,
    RequestRegisterFunctionContext[] calldata rcr
  ) external returns (bytes32);

  // called by factory contract that want to register new created contract
  function registerPredictContext(
    bytes memory signature,
    RequestRegisterPredictContext calldata rpc,
    RequestRegisterFunctionContext[] calldata rrfc
  ) external returns (bytes32);

  // called by contract that want to upgrade itself
  function upgradeContext(
    bytes memory signature,
    RequestUpgradeContext calldata rc,
    RequestAlterFunctionContext[] calldata rufc
  ) external returns (address);


  function alterContextFunctions(RequestAlterFunctionContext[] calldata requests) external returns (bool);

  function alterContextAgents(RequestAlterAgentContext[] calldata requests) external returns (bool);
 
  function updateContextActivityStatus(bytes32 contextId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateContextAlterabilityStatus(bytes32 contextId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateContextAdmin(bytes32 contextId, bytes32 newAdminId) external returns (bool);

  function updateContextRealm(bytes32 contextId, bytes32 newRealmId) external returns (bool);

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

  function getContextFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function getContextAgents(bytes32 contextId) external view returns (bytes32[] memory);

  function getContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

  function generateContextId(address contractId) external pure returns (bytes32);

}
