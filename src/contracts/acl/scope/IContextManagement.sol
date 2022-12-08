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
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextUpgradeRequest {
    bytes32 contextId;  
    string name;
    string version;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextRegisterFunctionRequest {
    bytes32 contextId;
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 policy;
    bytes4[] selectors;    
  }

  struct ContextRemoveFunctionRequest {
    bytes32 contextId;
    bytes32[] functions;
  }

  struct ContextAddGroupsRequest {
    bytes32 contextId; 
    bytes32[] groups;
  }

  struct ContextRemoveGroupsRequest {
    bytes32 contextId; 
    bytes32[] groups;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    uint16 functionLimit;
    uint8 groupLimit;
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

  event ContextFunctionRegistered(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    AgentType adminType,
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    bytes4 selector    
  );

  event ContextFunctionRemoved(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId
  );

  event ContextGroupAdded(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed groupId
  );

  event ContextGroupRemoved(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed groupId
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId, AgentType adminType);

  event ContextGroupLimitUpdated(address indexed sender, bytes32 indexed contextId, uint8 groupLimit);

  event ContextFunctionLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 functionLimit);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextRealmUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed realmId);

  // called by contract that want to register itself
  function contextRegister(
    bytes memory signature,
    ContextRegisterRequest calldata rc,
    ContextRegisterFunctionRequest[] calldata rcr
  ) external returns (bytes32);

  // called by factory contract that want to register new created contract
  function contextRegisterPredict(
    bytes memory signature,
    ContextRegisterPredictRequest calldata rpc,
    ContextRegisterFunctionRequest[] calldata rrfc
  ) external returns (bytes32);

  // called by contract that want to upgrade itself
  function contextUpgrade(
    bytes memory signature,
    ContextUpgradeRequest calldata rc,
    ContextRegisterFunctionRequest[] calldata rufc
  ) external returns (address);


  function alterContextFunctions(RequestAlterFunctionContext[] calldata requests) external returns (bool);

  function alterContextAgents(RequestAlterAgentContext[] calldata requests) external returns (bool);
 
  function updateContextActivityStatus(bytes32 contextId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateContextAlterabilityStatus(bytes32 contextId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateContextAdmin(bytes32 contextId, bytes32 newAdminId) external returns (bool);

  function updateContextRealm(bytes32 contextId, bytes32 newRealmId) external returns (bool);

  function updateContextAgentLimit(bytes32 contextId, AgentLimit calldata agentLimit) external returns (bool);

  function updateContextFunctionLimit(bytes32 contextId, uint16 functionLimit) external returns (bool);

  function isContextExisted(bytes32 contextId) external view returns (bool);

  function isContextContractExisted(address contactId) external view returns (bool);

  function isContextAdmin(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function hasContextAgent(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function hasContextFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function hasContextSelector(bytes32 contextId, bytes4 selector) external view returns (bool);

  function getContextRealmId(bytes32 contextId) external view returns (bytes32);

  function getContextAgentLimit(bytes32 contextId) external view returns (AgentLimit memory);

  function getContextFunctionLimit(bytes32 contextId) external view returns (uint16);

  function getContextAdmin(bytes32 contextId) external view returns (bytes32, AgentType);

  function getContextActivityStatus(bytes32 contextId) external view returns (ActivityStatus);

  function getContextAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus);

  function getContextContractId(bytes32 contextId) external view returns (address);

  function getContextFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function getContextAgents(bytes32 contextId) external view returns (bytes32[] memory);

  function getContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

  function generateContextId(address contractId) external pure returns (bytes32);

}
