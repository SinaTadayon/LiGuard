// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IAclCommons.sol";

interface IDomainManagement is IAclCommons {

  struct RequestRegisterDomain {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct RequestAlterRealmDomain {
    bytes32 domainId;
    bytes32 realmId;
    bytes32 realmAdminId;
    ActionType action;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes32[] contexts;
  }

  struct RequestAlterAgentDomain {  
    bytes32 domainId;
    bytes32[] agents;
    ActionType action;
  }

  struct DomainInfo {
    bytes32 domainId;
    bytes32 adminId;
    AgentLimit limits;
    uint16 realmLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    string name;
  }

  event DomainRegistered(
    address indexed sender, 
    bytes32 indexed domainId,
    bytes32 adminId,    
    AgentType atype,
    ActivityStatus acstat,
    AlterabilityStatus alstate,
    string name
  );
  
  event DomainRealmAltered(
    address indexed sender,
    bytes32 indexed domainId, 
    bytes32 indexed realmId,  
    bytes32 realmAdminId, 
    AgentType adminType,
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    bytes32[] contexts
  );

  event DomainAgentAltered(
    address indexed sender,
    bytes32 indexed domainId, 
    bytes32[] agents,
    AccountType action
  );

  event DomainAdminUpdated(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId, AgentType adminType);

  event DomainAgentLimitUpdated(address indexed sender, bytes32 indexed domainId, AgentLimit agentLimit);

  event DomainRealmLimitUpdated(address indexed sender, bytes32 indexed domainId, uint16 realmLimit);

  event DomainActivityUpdated(address indexed sender, bytes32 indexed domainId, ActivityStatus acstat);

  event DomainAlterabilityUpdated(address indexed sender, bytes32 indexed domainId, AlterabilityStatus alstat);

  function registerDomain(RequestRegisterDomain[] calldata requests) external returns (bool);

  function alterDomainRealms(RequestAlterRealmDomain[] calldata requests) external returns (bool);

  function alterDomainAgents(RequestAlterAgentDomain[] calldata requests) external returns (bool);
 
  function updateDomainActivityStatus(bytes32 domainId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateDomainAlterabilityStatus(bytes32 domainId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateDomainAdminAgent(bytes32 domainId, bytes32 newAdminId) external returns (bool);

  function updateDomainAgentLimit(bytes32 domainId, AgentLimit calldata agentLimit) external returns (bool);

  function updateDomainRealmLimit(bytes32 domainId, uint16 realmLimit) external returns (bool);

  function isDomainExists(bytes32 domainId) external view returns (bool);

  function hasDomainAgent(bytes32 domainId, bytes32 agentId) external view returns (bool);

  function hasDomainRealm(bytes32 domainId, bytes32 realmId) external view returns (bool);

  function getDomainName(bytes32 domainId) external view returns (string memory);

  function getDomainAgentLimit(bytes32 domainId) external view returns (AgentLimit memory);

  function getDomainRealmLimit(bytes32 domainId) external view returns (uint16);

  function getDomainAdmin(bytes32 domainId) external view returns (bytes32, AgentType);

  function getDomainActivityStatus(bytes32 domainId) external view returns (ActivityStatus);

  function getDomainAlterabilityStatus(bytes32 domainId) external view returns (AlterabilityStatus);

  function getDomainRealms(bytes32 domainId) external view returns (bytes32[] memory);

  function getDomainAgents(bytes32 domainId) external view returns (bytes32[] memory);

  function getDomainInfo(bytes32 domainId) external view returns (DomainInfo memory);

  function generateDomainId(string calldata name) external view returns (bytes32);
}