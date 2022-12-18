// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IMemberManagement is IAclCommons {

  struct MemberRegister {
    // bytes32 adminId;
    bytes32 roleId;
    address account;
    uint16 typeLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct MemberUpdateTypeLimitRequest {
    bytes32 memberId;
    uint16 typeLimit;
  }

  struct MemberInfo {
    bytes32 adminId;
    address account;
    uint16 typeLimit;
    uint16 typeCount;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event MemberRegistered(
    address indexed sender, 
    bytes32 indexed memberId, 
    address indexed account,
    bytes32 roleId,
    uint16 typeLimit, 
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event MemberTypeLimitUpdated(address indexed sender, bytes32 indexed memberId, uint16 typeLimit);

  event MemberAdminUpdated(address indexed sender, bytes32 indexed memberId, bytes32 indexed adminId);

  event MemberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  // function memberEnableActivity(bytes32[] calldata requests) external returns (bool);

  // function memberDisableActivity(bytes32[] calldata requests) external returns (bool);

  // function memberSafeModeActivity(bytes32[] calldata requests) external returns (bool);

  // function memberDisableAlterability(bytes32[] calldata requests) external returns (bool);

  // function memberUpdateableAlterability(bytes32[] calldata requests) external returns (bool);

  // function memberUpgradableAlterability(bytes32[] calldata requests) external returns (bool);

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function memberUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function memberCheckId(bytes32 memberId) external view returns (bool);

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool);

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);
}