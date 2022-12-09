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
    bytes32 adminId;
    uint16 realmLimit;
    uint8 groupLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
  }
    
  event GlobalAdminUpdated(address indexed sender, bytes32 indexed adminId, AgentType adminType);

  event GlobalGroupLimitUpdated(address indexed sender, uint8 groupLimit);

  event GlobalDomainLimitUpdated(address indexed sender, uint16 domainLimit);

  event GlobalActivityUpdated(address indexed sender, ActivityStatus acstat);

  event GlobalAlterabilityUpdated(address indexed sender, AlterabilityStatus alstat);

  event GlobalGroupAdded(address indexed sender, bytes32 indexed domainId, bytes32 indexed groupId);

  event GlobalGroupRemoved(address indexed sender, bytes32 indexed domainId, bytes32 indexed groupId);
 
  function globalAddGroups(ScopeAddGroupsRequest[] calldata requests) external returns (bool);

  function globalRemoveGroups(ScopeRemoveGroupsRequest[] calldata requests) external returns (bool);

  function globalCreateGroup(GroupRegisterRequest[] calldata requests) external returns (bytes32);

  function globalCreateType(TypeRegisterRequest[] calldata requests) external returns (bytes32);

  function globalCreateRole(RoleRegisterRequest[] calldata requests) external returns (bytes32);

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus);

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool);

  function globalUpdateDomainLimit(uint16 domainLimit) external returns (bool);

  function globalCheckAdmin(bytes32 agentId) external view returns (bool);

  function globalHasDomain(bytes32 domainId) external view returns (bool);

  function globalGetDomainLimit() external view returns (uint16);

  function globalGetGroupLimit() external view returns (uint8);

  function globalGetAdmin() external view returns (bytes32, AgentType);

  function globalGetActivityStatus() external view returns (ActivityStatus);

  function globalGetAlterabilityStatus() external view returns (AlterabilityStatus);

  function globalGetDomains() external view returns (bytes32[] memory);

  function globalGetDomainsCount() external view returns (uint16);

  function globalGetGroups() external view returns (uint8);

  function globalGetGroupsCount() external view returns (uint8);

  function globalGetInfo() external view returns (GlobalInfo memory);

}