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
 
  struct GlobalInfo {
    bytes32 id;
    bytes32 adminId;
    uint16 realmLimit;
    uint16 typeLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }
    
  event GlobalAdminUpdated(address indexed sender, bytes32 indexed adminId, AgentType adminType);

  event GlobalDomainLimitUpdated(address indexed sender, uint16 domainLimit);

  event GlobalActivityUpdated(address indexed sender, ActivityStatus acstat);

  event GlobalAlterabilityUpdated(address indexed sender, AlterabilityStatus alstat);

  event GlobalTypeLimitUpdated(address indexed sender, bytes32 indexed globalId, uint16 typeLimit);

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus);

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool);

  function globalUpdateDomainLimit(uint16 domainLimit) external returns (bool);

  function globalUpdateTypeLimit(uint16 typeLimit) external returns (bool);

  function globalCheckAdmin(address account) external view returns (bool);

  function globalGetDomainLimit() external view returns (uint16);

  function globalGetAdmin() external view returns (bytes32, AgentType);

  function globalGetActivityStatus() external view returns (ActivityStatus);

  function globalGetAlterabilityStatus() external view returns (AlterabilityStatus);

  function globalGetDomains() external view returns (bytes32[] memory);

  function globalGetDomainsCount() external view returns (uint16);

  function globalGetInfo() external view returns (GlobalInfo memory);

}