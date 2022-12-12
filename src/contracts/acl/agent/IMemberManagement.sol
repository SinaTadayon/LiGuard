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

   struct MemberUpdateAdminRequest {
    bytes32 memberId;
    bytes32 adminId;
  }

  struct MemberUpdateActivityRequest {
    bytes32 memberId;
    ActivityStatus acstat;
  }

  struct MemberUpdateAlterabilityRequest {
    bytes32 memberId;
    AlterabilityStatus alstat;
  }

  struct MemberUpdateTypeLimitRequest {
    bytes32 memberId;
    uint8 roleLimit;
  }

  // struct MemberUpdateTypesRequest {
  //   bytes32 memberId;
  //   bytes32[] roles;
  // }

  struct MemberInfo {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 roleLimit;
    uint8 roleCount;
    address account;
  }

  event MemeberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  event MemberTypeLimitUpdated(address indexed sender, bytes32 indexed memberId, uint8 roleLimit);

  event MemberAdminUpdated(address indexed sender, bytes32 indexed memberId, bytes32 indexed adminId);

  event MemberTypeGranted(address indexed sender, bytes32 indexed memberId, bytes32 indexed roleId);

  event MemberTypeRevoked(address indexed sender, bytes32 indexed memberId, bytes32 indexed roleId);
 
  function memberUpdateActivityStatus(MemberUpdateActivityRequest[] calldata requests) external returns (bool);

  function memberUpdateAlterabilityStatus(MemberUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function memberUpdateAdmin(MemberUpdateAdminRequest[] calldata requests) external returns (bool);

  // function memberAddTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool);

  // function memberRemoveTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool);

  function memberCheckExistance(bytes32 memberId) external view returns (bool);

  function memberCheckAccountExistance(address account) external view returns (bool);

  function memberHasType(bytes32 memberId, bytes32 roleId) external view returns (bool);

  function memberHasAccountType(address account, bytes32 roleId) external view returns (bool);

  function memberGetTypeLimit(bytes32 memberId) external view returns (uint8);

  function memberGetActivityStatus(bytes32 memberId) external view returns (ActivityStatus);

  function memberGetAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus);

  function memberGetAdmin(bytes32 memberId) external view returns (bytes32);

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetTypesCount(bytes32 memberId) external view returns (uint8);

  function memberGetAccount(bytes32 memberId) external view returns (address);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);

  function memberGenerateId(address account) external pure returns (bytes32);
}