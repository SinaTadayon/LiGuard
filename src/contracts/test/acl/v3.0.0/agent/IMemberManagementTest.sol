// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../IACLCommonsTest.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IMemberManagementTest is IACLCommonsTest {
  struct MemberRegisterRequest {
    bytes32 roleId;
    bytes32 adminId;
    address account;
    GeneralLimit limits;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct MemberUpdateGeneralLimitRequest {
    bytes32 memberId;
    GeneralLimit limits;
  }

  struct MemberInfo {
    bytes32 adminId;
    address account;
    GeneralLimit limits;
    uint16 typeCount;
    AgentType adminType;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event MemberRegistered(
    address indexed sender,
    bytes32 indexed memberId,
    address indexed account,
    bytes32 roleId,
    bytes32 adminId,
    GeneralLimit limits
  );

  event MemberGeneralLimitUpdated(address indexed sender, bytes32 indexed memberId, GeneralLimit limits);

  event MemberAdminUpdated(address indexed sender, bytes32 indexed memberId, bytes32 indexed adminId);

  event MemberActivityUpdated(address indexed sender, bytes32 indexed memberId, ActivityStatus acstat);

  event MemberAlterabilityUpdated(address indexed sender, bytes32 indexed memberId, AlterabilityStatus alstat);

  event MemberRoleRevoked(address indexed sender, bytes32 indexed memberId, bytes32 indexed roleId, bytes32 typeId);

  event MemberRemoved(address indexed sender, bytes32 indexed memberId, bool isCompleted);

  function memberRegister(MemberSignature calldata memberSign, MemberRegisterRequest[] calldata requests)
    external
    returns (bool);

  function memberUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function memberUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function memberUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function memberUpdateGeneralLimit(
    MemberSignature calldata memberSign,
    MemberUpdateGeneralLimitRequest[] calldata requests
  ) external returns (bool);

  function memberRemove(MemberSignature calldata memberSign, bytes32[] calldata members) external returns (bool);

  function memberCheckId(bytes32 memberId) external view returns (bool);

  function memberCheckAccount(address account) external view returns (bool);

  function memberCheckAdmin(bytes32 memberId, address account) external view returns (bool);

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool);

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory);

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory);
}
