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

  // struct MemberUpdateTypesRequest {
  //   bytes32 memberId;
  //   bytes32 typeId;
  // }

  struct MemberUpdateTypeLimitRequest {
    bytes32 memberId;
    uint16 typeLimit;
  }

  struct MemberInfo {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint16 typeLimit;
    uint16 typeCount;
    address account;
  }

  event MemeberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  event MemberTypeLimitUpdated(address indexed sender, bytes32 indexed memberId, uint16 typeLimit);

  event MemberAdminUpdated(address indexed sender, bytes32 indexed memberId, bytes32 indexed adminId);

  event MemberTypeGranted(address indexed sender, bytes32 indexed memberId, bytes32 indexed roleId);

  event MemberTypeRevoked(address indexed sender, bytes32 indexed memberId, bytes32 indexed roleId);
 
  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function memberUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  // function memberAddTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool);

  // function memberRemoveTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool);

  function memberCheckId(bytes32 memberId) external view returns (bool);

  function memberCheckAccount(address account) external view returns (bool);

  function memberCheckAdmin(address account) external view returns (bool);

  function memberHasType(bytes32 memberId, bytes32 roleId) external view returns (bool);

  function memberHasAccountType(address account, bytes32 roleId) external view returns (bool);

  function memberGetTypeLimit(bytes32 memberId) external view returns (uint16);

  function memberGetActivityStatus(bytes32 memberId) external view returns (ActivityStatus);

  function memberGetAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus);

  function memberGetAdmin(bytes32 memberId) external view returns (bytes32);

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetTypesCount(bytes32 memberId) external view returns (uint8);

  function memberGetAccount(bytes32 memberId) external view returns (address);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);

  function memberGenerateId(address account) external pure returns (bytes32);
}