// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IMemberManagement is IAclCommons {

  struct MemberUpdateActivityRequest {
    bytes32 memberId;
    ActivityStatus acstat;
  }

  struct MemberUpdateAlterabilityRequest {
    bytes32 memberId;
    AlterabilityStatus alstate;
  }

  struct MemberUpdateRoleLimitRequest {
    bytes32 memberId;
    uint8 roleLimit;
  }

  struct MemberInfo {
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    uint8 roleLimit;
    address account;
  }

  event MemeberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  event MemberRoleLimitUpdated(address indexed sender, bytes32 indexed memberId, uint8 roleLimit);
 
  function memberUpdateActivityStatus(MemberUpdateActivityRequest[] calldata requests) external returns (bool);

  function memberUpdatesAlterabilityStatus(MemberUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function memberUpdatesRoleLimit(MemberUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function memberCheckExistance(bytes32 memberId) external view returns (bool);

  function memberCheckExistance(address account) external view returns (bool);

  function memberHasRole(bytes32 memberId, bytes32 roleId) external view returns (bool);

  function memberHasAccountRole(address account, bytes32 roleId) external view returns (bool);

  function memberGetRoleLimit(bytes32 memberId) external view returns (uint8);

  function memberGetActivityStatus(bytes32 memberId) external view returns (ActivityStatus);

  function memberGetAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus);

  function memberGetRoles(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetRolesCount(bytes32 memberId) external view returns (uint8);

  function memberGetAccount(bytes32 memberId) external view returns (address);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);

  function memberGenerateId(address account) external pure returns (bytes32);
}