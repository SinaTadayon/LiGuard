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

  struct RequestAlterRoleMember {
    bytes32 memberId;
    ActionType action;
    bytes32[] roles;
  }

  struct RequestUpdateActivityMember {
    bytes32 memberId;
    ActivityStatus acstat;
  }

  struct RequestUpdateAlterabilityMember {
    bytes32 memberId;
    AlterabilityStatus alstate;
  }

  struct RequestUpdateRoleLimitMember {
    bytes32 memberId;
    uint8 roleLimit;
  }

  struct MemberInfo {
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    uint8 roleLimit;
    address account;
  }

  event MemberRolesAltered(
    address indexed sender, 
    bytes32 indexed memberId,
    ActionType action,
    bytes32[] roles
  );

  event MemberUpdated(
    address indexed sender, 
    bytes32 indexed memberId, 
    ActivityStatus acstat, 
    AlterabilityStatus alstat, 
    uint8 roleLimit
  );

  event MemeberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  event MemberRoleLimitUpdated(address indexed sender, bytes32 indexed memberId, uint8 roleLimit);

  function alterMembersRoles(RequestAlterRoleMember[] calldata requests) external returns (bool);
 
  function updateMemebersActivityStatus(RequestUpdateActivityMember[] calldata requests) external returns (bool);

  function updateMembersAlterabilityStatus(RequestUpdateAlterabilityMember[] calldata requests) external returns (bool);

  function updateMembersRoleLimit(RequestUpdateRoleLimitMember[] calldata requests) external returns (bool);

  function isMemberExists(bytes32 memberId) external view returns (bool);

  function hasMemberRole(bytes32 memberId, bytes32 roleId) external view returns (bool);

  function getMemberRoleLimit(bytes32 memberId) external view returns (uint8);

  function getMemberActivityStatus(bytes32 memberId) external view returns (ActivityStatus);

  function getMemberAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus);

  function getMemberRoles(bytes32 memberId) external view returns (bytes32[] memory);

  function getMemberAccount(bytes32 memberId) external view returns (address);

  function getMemberInfo(bytes32 memberId) external view returns (MemberInfo memory);

  function generateMemberId(address account) external pure returns (bytes32);
}