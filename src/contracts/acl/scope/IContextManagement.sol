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
    uint8 functionLimit;
    uint8 groupLimit;
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
    uint8 functionLimit;
    uint8 groupLimit;
  }

  struct ContextUpgradeRequest {
    address contractId;
    string name;
    string version;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 functionLimit;
    uint8 groupLimit;
  }

  struct ContextRegisterFunctionRequest {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 policy;
    bytes4[] selectors;    
  }

  struct ContextUpgradeFunctionRequest {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 policy;
    ActionType action;
    bytes4[] selectors;    
  }

  struct ContextUpdateRealmRequest {
    bytes32 contextId;
    bytes32 realmId;
  }

  struct ContextUpdateFunctionLimitRequest {
    bytes32 contextId;
    bytes8 functionLimit;
  }

  struct ContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    uint8 functionLimit;
    uint8 groupLimit;
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
    AlterabilityStatus alstat,
    uint8 functionLimit,
    uint8 groupLimit
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
    AlterabilityStatus alstat,
    uint8 functionLimit,
    uint8 groupLimit
  );

  event ContextUpgraded(
    address indexed sender, 
    bytes32 indexed contextId, 
    address indexed contractId, 
    string name, 
    string version,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    uint8 functionLimit,
    uint8 groupLimit
  );

  event ContextFunctionRegistered(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    uint8 policy,
    bytes4 selector    
  );

  event ContextFunctionUpgraded(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    ActionType action,
    uint8 policy,
    bytes4 selector
  );

  event ContextGroupAdded(address indexed sender, bytes32 indexed contextId, bytes32 indexed groupId);

  event ContextGroupRemoved(address indexed sender, bytes32 indexed contextId, bytes32 indexed groupId);

  event ContextAdminUpdated(address indexed sender, bytes32 indexed contextId, bytes32 indexed adminId, AgentType adminType);

  event ContextGroupLimitUpdated(address indexed sender, bytes32 indexed contextId, uint8 groupLimit);

  event ContextFunctionLimitUpdated(address indexed sender, bytes32 indexed contextId, uint8 functionLimit);

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
    ContextUpgradeFunctionRequest[] calldata rufc
  ) external returns (address);

  function contextAddGroups(ScopeAddGroupsRequest[] calldata requests) external returns (bool);

  function contextRemoveGroups(ScopeRemoveGroupsRequest[] calldata requests) external returns (bool);
 
  function contextCreateGroup(GroupRegisterRequest[] calldata requests) external returns (bytes32);

  function contextCreateType(TypeRegisterRequest[] calldata requests) external returns (bytes32);

  function contextCreateRole(RoleRegisterRequest[] calldata requests) external returns (bytes32);

  function contextUpdateActivityStatus(ScopeUpdateActivityRequest[] calldata requests) external returns (bool);

  function contextUpdateAlterabilityStatus(ScopeUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function contextUpdateAdmin(ScopeUpdateAdminRequest[] calldata requests) external returns (bool);

  function contextUpdateGroupLimit(ScopeUpdateGroupLimitRequest[] calldata requests) external returns (bool);

  function contextUpdateRealm(ContextUpdateRealmRequest[] calldata requests) external returns (bool);

  function contextUpdateFunctionLimit(ContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool);

  function contextCheckExistance(bytes32 contextId) external view returns (bool);

  function contextCheckExistance(address contactId) external view returns (bool);

  function contextCheckAdmin(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function contextCheckAgent(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function contextCheckAccount(bytes32 contextId, address account) external view returns (bool);

  function contextHasFunction(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function contextHasSelector(bytes32 contextId, bytes4 selector) external view returns (bool);

  function contextGetRealm(bytes32 contextId) external view returns (bytes32);

  function contextGetGroupLimit(bytes32 contextId) external view returns (uint8);

  function contextGetFunctionLimit(bytes32 contextId) external view returns (uint8);

  function contextGetAdmin(bytes32 contextId) external view returns (bytes32, AgentType);

  function contextGetActivityStatus(bytes32 contextId) external view returns (ActivityStatus);

  function contextGetAlterabilityStatus(bytes32 contextId) external view returns (AlterabilityStatus);

  function contextGetContractId(bytes32 contextId) external view returns (address);

  function contextGetFunctions(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetFunctionsCount(bytes32 contextId) external view returns (uint8);

  function contextGetGroups(bytes32 contextId) external view returns (bytes32[] memory);

  function contextGetGroupsCount(bytes32 contextId) external view returns (uint8);

  function contextGetContextInfo(bytes32 contextId) external view returns (ContextInfo memory);

  function contextGenerateId(address contractId) external pure returns (bytes32);
}
