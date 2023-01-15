// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IMemberManagement is IACLCommons {

  struct MemberRegister {
    bytes32 roleId;
    bytes32 adminId;
    address account;
    uint32 callLimit;
    uint32 typeLimit;
    uint32 factoryLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct MemberUpdateLimitRequest {
    bytes32 memberId;
    uint32 limit;
  }

  struct MemberInfo {
    bytes32 adminId;
    address account;
    uint32 typeLimit;
    uint32 typeCount;
    uint32 callLimit;
    uint32 factoryLimit;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event MemberRegistered(
    address indexed sender, 
    bytes32 indexed memberId, 
    address indexed account,
    bytes32 roleId,
    bytes32 adminId 
  );

  event MemberTypeLimitUpdated(address indexed sender, bytes32 indexed memberId, uint32 typeLimit);

  event MemberFactoryLimitUpdated(address indexed sender, bytes32 indexed memberId, uint32 factoryLimit);

  event MemberCallLimitUpdated(address indexed sender, bytes32 indexed memberId, uint32 callLimit);

  event MemberAdminUpdated(address indexed sender, bytes32 indexed memberId, bytes32 indexed adminId);

  event MemberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  function memberRegister(MemberRegister[] calldata requests) external returns (bool);

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function memberUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function memberUpdateTypeLimit(MemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function memberUpdateFactoryLimit(MemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function memberUpdateCallLimit(MemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function memberCheckId(bytes32 memberId) external view returns (bool);

  function memberCheckAccount(address account) external view returns (bool);

  function memberCheckAdmin(bytes32 memberId, address account) external view returns (bool);

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool);

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);
}