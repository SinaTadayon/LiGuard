// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Role Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IRoleManagement is IAclCommons {


  struct RoleAddMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct RoleRemoveMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }
  
  struct RoleUpdateAdminRequest {
    bytes32 roleId;
    bytes32 adminId;
  }

  struct RoleUpdateScopeRequest { 
    bytes32 roleId;
    bytes32 scopeId;
  }

  struct RoleUpdateMemberLimitRequest {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct RoleUpdateTypeLimitRequest {
    bytes32 roleId;
    uint8 typeLimit;
  }

  struct RoleUpdateActivityRequest {
    bytes32 roleId;
    ActivityStatus acstat;
  }

  struct RoleUpdateAlterabilityRequest {
    bytes32 roleId;
    AlterabilityStatus alstate;
  }

  struct RoleInfo {
    bytes32 adminId;
    bytes32 scopeId;
    uint24 memberLimit;
    uint8 typeLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
  }

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed roleId,
    string indexed name,
    bytes32 adminId,
    bytes32 policyId,
    bytes32 scopeId,
    uint24 memberLimit,
    uint8 typeLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event RoleMemberGranted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId);

  event RoleMemberRevoked(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId);

  event RoleActivityUpdated(address indexed sender, bytes32 indexed roleId, ActivityStatus acstat);

  event RoleAlterabilityUpdated(address indexed sender, bytes32 indexed roleId, AlterabilityStatus alstat);

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 memberLimit);

  event RoleTypeLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 typeLimit);

  event RoleAdminUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed adminId);

  event RoleScopeUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed scopeId);

  function roleRegister(RoleRegisterRequest[] calldata request) external returns (bool);

  function roleAddMembers(RoleAddMembersRequest[] calldata requests) external returns (bool);

  function roleRemoveMembers(RoleRemoveMembersRequest[] calldata requests) external returns (bool);

  function roleUpdateAdmin(RoleUpdateAdminRequest[] calldata requests) external returns (bool);

  function roleUpdateScope(RoleUpdateScopeRequest[] calldata requests) external returns (bool);
 
  function roleUpdateActivityStatus(RoleUpdateActivityRequest[] calldata requests) external returns (bool);

  function roleUpdateAlterabilityStatus(RoleUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function roleUpdateTypeLimit(RoleUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function roleCheckExistance(bytes32 roleId) external view returns (bool);

  function roleCheckExistance(string calldata roleName) external view returns (bool);

  function roleCheckAdmin(bytes32 roleId, bytes32 agentId) external view returns (bool);

  function roleCheckType(bytes32 roleId, bytes32 typeId) external view returns (bool);

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function roleHasMember(bytes32 roleId, bytes32 memberId) external view returns (bool);

  function roleGetMemberLimit(bytes32 roleId) external view returns (uint24);

  function roleGetTypeLimit(bytes32 roleId) external view returns (uint8);

  function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus);

  function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus);

  function roleGetAdmin(bytes32 roleId) external view returns (bytes32);

  function roleGetName(bytes32 roleId) external view returns (string memory);

  function roleGetScope(bytes32 roleId) external view returns (bytes32);

  function roleGetMembers(bytes32 roleId) external view returns (bytes32[] memory);

  function roleGetMembersCount(bytes32 roleId) external view returns (uint24);

  function roleGetTypes(bytes32 roleId) external view returns (bytes32[] memory);

  function roleGetTypesCount(bytes32 roleId) external view returns (uint8);

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory);

  function generateRoleId(string calldata) external pure returns (bytes32);
}
