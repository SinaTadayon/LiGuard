// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IACLCommons.sol";

interface IGlobalManagement is IACLCommons{
 
  struct GlobalInfo {
    bytes32 id;
    bytes32 adminId;
    uint32 domainLimit;
    uint32 domainCount;
    uint32 agentLimit;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }
    
  event GlobalAdminUpdated(address indexed sender, bytes32 globalId, bytes32 indexed adminId);

  event GlobalDomainLimitUpdated(address indexed sender, bytes32 globalId, uint32 domainLimit);

  event GlobalActivityUpdated(address indexed sender, bytes32 globalId, ActivityStatus acstat);

  event GlobalAlterabilityUpdated(address indexed sender, bytes32 globalId, AlterabilityStatus alstat);

  event GlobalAgentLimitUpdated(address indexed sender, bytes32 globalId, uint32 agentLimit);

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus);

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool);

  function globalUpdateDomainLimit(uint32 domainLimit) external returns (bool);

  function globalUpdateAgentLimit(uint32 agentLimit) external returns (bool);

  function globalCheckAdmin(address account) external view returns (bool);

  function globalGetDomains() external view returns (bytes32[] memory);

  function globalGetInfo() external view returns (GlobalInfo memory);

}