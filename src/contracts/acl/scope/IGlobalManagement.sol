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

interface IGlobalManagement is IAclCommons {
 
  struct RequestAlterDomainGlobal {
    bytes32 domainId;
    bytes32 domainAdminId;
    ActionType action;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes32[] domains;
  }

  struct RequestAlterAgentGlobal {  
    bytes32[] agents;
    ActionType action;
  }

  struct GlobalInfo {
    bytes32 adminId;
    AgentLimit limits;
    uint16 domainLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }
  
  event GlobalDomainAltered(
    address indexed sender,
    bytes32 indexed domainId, 
    bytes32 domainAdminId, 
    AgentType adminType,
    AccountType action,
    ActivityStatus acstat,
    AlterabilityStatus alstat,
    bytes32[] domains
  );

  event GlobalAgentAltered(
    address indexed sender,
    bytes32[] agents,
    AccountType action
  );

  event GlobalAdminUpdated(address indexed sender, bytes32 indexed adminId, AgentType adminType);

  event GlobalAgentLimitUpdated(address indexed sender, AgentLimit agentLimit);

  event GlobalDomainLimitUpdated(address indexed sender, uint16 domainLimit);

  event GlobalActivityUpdated(address indexed sender, ActivityStatus acstat);

  event GlobalAlterabilityUpdated(address indexed sender, AlterabilityStatus alstat);

  function alterGlobalDomains(RequestAlterDomainGlobal[] calldata requests) external returns (bool);

  function alterGlobalAgents(RequestAlterAgentGlobal[] calldata requests) external returns (bool);
 
  function updateGlobalActivityStatus(ActivityStatus acstat) external returns (ActivityStatus);

  function updateGlobalAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function updateGlobalAdminAgent(bytes32 newAdminId) external returns (bool);

  function updateGlobalAgentLimit(AgentLimit calldata agentLimit) external returns (bool);

  function updateGlobalDomainLimit(uint16 domainLimit) external returns (bool);

  function hasGlobalAgent(bytes32 agentId) external view returns (bool);

  function hasGlobalDomain(bytes32 contextId) external view returns (bool);

  function getGlobalAgentLimit() external view returns (AgentLimit memory);

  function getGlobalDomainLimit() external view returns (uint16);

  function getGlobalAdmin() external view returns (bytes32, AgentType);

  function getGlobalActivityStatus() external view returns (ActivityStatus);

  function getGlobalAlterabilityStatus() external view returns (AlterabilityStatus);

  function getGlobalDomains() external view returns (bytes32[] memory);

  function getGlobalAgents() external view returns (bytes32[] memory);

  function getGlobalInfo() external view returns (GlobalInfo memory);

}