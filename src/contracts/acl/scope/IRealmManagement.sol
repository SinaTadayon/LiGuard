// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

 // TODO update  status in single request
interface IRealmManagement is IAclCommons {

  struct RequestRegisterRealm {
    bytes32 domainId;
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;    
  }

  struct RequestAlterContextRealm {
    bytes32 realmId;
    bytes32 contextId;
    bytes32 contextAdminId;
    ActionType action;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes32[] functions;
  }

  struct RequestAlterAgentRealm {
    bytes32 realmId;
    bytes32[] agents;
    ActionType action;
  }

  struct RealmInfo {
    bytes32 domainId;
    bytes32 adminId;
    AgentLimit limits;
    uint16 contextLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    AgentType adminType;
    string name;    
  }

  event RealmRegistered(
    address indexed sender, 
    bytes32 indexed realmId, 
    bytes32 indexed domainId,
    bytes32 adminId,
    string name,    
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstate
  );
  
  event RealmContextAltered(
    address indexed sender,
    bytes32 indexed realmId, 
    bytes32 indexed contextId,  
    bytes32 contextAdminId, 
    AgentType agentType, 
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    bytes32[] functions
  );

  event RealmAgentAltered(
    address indexed sender,
    bytes32 indexed realmId,
    AccountType action,
    bytes32[] agents
  );

  event RealmAdminUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed adminId, AgentType adminType);

  event RealmAgentLimitUpdated(address indexed sender, bytes32 indexed realmId, AgentLimit agentLimit);

  event RealmContextLimitUpdated(address indexed sender, bytes32 indexed realmId, uint16 contextLimit);

  event RealmActivityUpdated(address indexed sender, bytes32 indexed realmId, ActivityStatus acstat);

  event RealmAlterabilityUpdated(address indexed sender, bytes32 indexed realmId, AlterabilityStatus alstat);

  event RealmDomainIdUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed domainId);

  function registerRealm(RequestRegisterRealm[] calldata requests) external returns (bool);

  function alterRealmContexts(RequestAlterContextRealm[] calldata requests) external returns (bool);

  function alterRealmAgents(RequestAlterAgentRealm[] calldata requests) external returns (bool);
 
  function updateRealmActivityStatus(bytes32 realmId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateRealmAlterabilityStatus(bytes32 realmId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateRealmAdmin(bytes32 realmId, bytes32 newAdminId) external returns (bool);

  function updateRealmDomain(bytes32 realmId, bytes32 newDomainId) external returns (bool);

  function updateRealmAgentLimit(bytes32 realmId, AgentLimit calldata agentLimit) external returns (bool);

  function updateRealmContextLimit(bytes32 realmId, uint16 contextLimit) external returns (bool);

  function isRealmExists(bytes32 realmId) external view returns (bool);

  function isRealmAdmin(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function hasRealmFunction(bytes32 realmId, bytes32 functionId) external view returns (bool);

  function hasRealmAgent(bytes32 realmId, bytes32 agentId) external view returns (bool);

  function hasRealmContext(bytes32 realmId, bytes32 contextId) external view returns (bool);

  function getRealmName(bytes32 realmId) external view returns (string memory);

  function getRealmDomain(bytes32 realmId) external view returns (bytes32);

  function getRealmAgentLimit(bytes32 realmId) external view returns (AgentLimit memory);

  function getRealmContextLimit(bytes32 realmId) external view returns (uint16);

  function getRealmAdminAgent(bytes32 realmId) external view returns (bytes32, AgentType);

  function getRealmActivityStatus(bytes32 realmId) external view returns (ActivityStatus);

  function getRealmAlterabilityStatus(bytes32 realmId) external view returns (AlterabilityStatus);

  function getRealmContexts(bytes32 realmId) external view returns (bytes32[] memory);

  function getRealmAgents(bytes32 realmId) external view returns (bytes32[] memory);

  function getRealmInfo(bytes32 realmId) external view returns (RealmInfo memory);

  function generateRealmId(string calldata name) external pure returns (bytes32);
}
