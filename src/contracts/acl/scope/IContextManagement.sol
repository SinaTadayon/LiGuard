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
    uint16 typeLimit;  
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
    uint16 typeLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextUpgradeRequest {
    address contractId;
    string name;
    string version;
    uint16 typeLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct ContextRegisterFunctionRequest {
    bytes32 adminId;
    bytes32 agentId;
    uint16 typeLimit;
    uint8 policy;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4 selector;    
  }

  struct ContextUpgradeFunctionRequest {
    bytes32 adminId;
    bytes32 agentId;
    uint16 typeLimit;
    uint8 policy;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    ActionType action;
    bytes4 selector;    
  }

  struct ContextUpdateRealmRequest {
    bytes32 contextId;
    bytes32 realmId;
  }

  // struct ContextUpdateFactoryLimitRequest {
  //   bytes32 scopeId; 
  //   uint32 factoryLimit;
  // }

  // struct ContextUpdateFunctionLimitRequest {
  //   bytes32 contextId;
  //   bytes8 functionLimit;
  // }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    uint16 typeLimit;
    AgentType adminType;
    uint8 functionsCount; 
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }

  event ContextRegistered (
    address indexed sender,
    bytes32 indexed contextId,
    address indexed contractId,
    address signer,
    string name,
    string version,
    bytes32 realmId,
    bytes32 adminId,
    uint16 typeLimit,
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
    uint16 typeLimit,
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event ContextUpgraded(
    address indexed sender, 
    bytes32 indexed contextId, 
    address indexed contractId, 
    string name, 
    string version,
    uint16 typeLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event ContextFunctionRegistered(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    bytes32 agentId,
    uint16 typeLimit,
    AgentType adminType,
    AgentType agentType,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    uint8 policy,
    bytes4 selector    
  );

  event ContextUpgradeFunctionAdded(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId,
    bytes32 agentId,
    uint16 typeLimit,
    AgentType adminType,
    AgentType agentType,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    uint8 policy,
    bytes4 selector
  );

  event ContextUpgradeFunctionRemoved(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId
  );

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId, AgentType adminType);

  event ContextActivityUpdated(address indexed sender, bytes32 indexed contextId, ActivityStatus acstat);

  event ContextAlterabilityUpdated(address indexed sender, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ContextTypeLimitUpdated(address indexed sender, bytes32 indexed contextId, uint16 typeLimit);


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
    ContextUpgradeFunctionRequest[] calldata rufc
  ) external returns (address);

  function contextUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function contextUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function contextUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function functionUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function contextCheckId(bytes32 contextId) external view returns (bool);

  function contextCheckAccount(address contactId) external view returns (bool);

  function functionCheckAdmin(bytes32 functionId, address account) external view returns (bool);

  // function contextCheckAdmin(bytes32 contextId, bytes32 agentId) external view returns (bool);

  // function contextCheckAccount(bytes32 contextId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(address contractId, bytes4 selector) external view returns (bool);

  function contextGetRealm(bytes32 contextId) external view returns (bytes32);

  function contextGetAdmin(bytes32 contextId) external view returns (AgentType, bytes32);

  function contextGetActivityStatus(bytes32 contextId) external view returns (ActivityStatus);

  function contextGetAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus);

  function contextGetContractId(bytes32 contextId) external view returns (address);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetFunctionsCount(bytes32 contextId) external view returns (uint8);

  function contextGetContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

}
