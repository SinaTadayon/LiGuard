// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../IACLCommons.sol";

/**
 * @title Role Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileRoleManagement is IACLCommons {
  struct ProfileRoleRegisterRequest {
    bytes32 adminId;
    bytes32 scopeId;
    bytes32 typeId;
    string name;
    int32 memberLimit;
  }

  struct ProfileRoleGrantMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct ProfileRoleRevokeMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct ProfileRoleUpdateMemberLimitRequest {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct ProfileRoleInfo {
    bytes32 scopeId;
    bytes32 typeId;
    bytes32 adminId;
    uint24 memberLimit;
    uint24 memberCount;
    AgentType adminType;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event ProfileRoleRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 typeId,
    bytes32 adminId,
    bytes32 scopeId
  );

  event ProfileRoleMemberDeleted(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed memberId,
    bytes32 roleId,
    bytes32 typeId,
    address account
  );

  event ProfileRoleMemberGranted(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 memberId,
    bytes32 typeId
  );

  event ProfileRoleMemberRevoked(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 memberId,
    bytes32 typeId
  );

  event ProfileRoleMemberLimitUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    uint24 memberLimit
  );

  event ProfileRoleAdminUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 adminId
  );

  event ProfileRoleScopeUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 scopeId
  );

  event ProfileRoleActivityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    ActivityStatus acstat
  );

  event ProfileRoleAlterabilityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    AlterabilityStatus alstat
  );

  event ProfileRoleRemoved(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId);

  function profileRoleRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleRegisterRequest[] calldata requests
  ) external returns (bool);

  function profileRoleGrantMembers(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleGrantMembersRequest[] calldata requests
  ) external returns (bool);

  function profileRoleRevokeMembers(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleRevokeMembersRequest[] calldata requests
  ) external returns (bool);

  function profileRoleUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool);

  function profileRoleUpdateScope(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateScopeRequest[] calldata requests
  ) external returns (bool);

  function profileRoleUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool);

  function profileRoleUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function profileRoleUpdateMemberLimit(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleUpdateMemberLimitRequest[] calldata requests
  ) external returns (bool);

  function profileRoleRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata roles)
    external
    returns (bool);

  function profileRoleCheckId(bytes32 profileId, bytes32 roleId) external view returns (bool);

  function profileRoleCheckName(bytes32 profileId, string calldata roleName) external view returns (bool);

  function profileRoleCheckAdmin(
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool);

  function profileRoleHasAccount(
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool);

  function profileRoleGetInfo(bytes32 profileId, bytes32 roleId) external view returns (ProfileRoleInfo memory);
}
