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
  
  struct RequestRegisterRole {
    SecurityPolicy policyType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
    bytes32 adminId;
    bytes32 scopeId;
    uint24 memberLimit;
    uint8 typeLimit;
    string name;
    bytes32[] members;
    bytes32[] types;
  }

  struct RequestAlterMemberRole {
    bytes32 roleId;
    ActionType action;  
    bytes32[] members;
  }

  struct RequestAlterTypeRole {
    bytes32 roleId;
    ActionType action;  
    bytes32[] types;
  }
  
  struct RequestUpdateAdminRole {
    bytes32 roleId;
    bytes32 adminId;
  }

  struct RequestUpdateScopeRole { 
    bytes32 roleId;
    bytes32 scopeId;
  }

  struct RequestUpdateMemberLimitRole {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct RequestUpdateTypeLimitRole {
    bytes32 roleId;
    uint8 typeLimit;
  }

  struct RequestUpdatePolicyRole {
    bytes32 roleId;
    SecurityPolicy policyType;
  }

  struct RequestUpdateActivityRole {
    bytes32 roleId;
    ActivityStatus acstat;
  }

  struct RequestUpdateAlterabilityRole {
    bytes32 roleId;
    AlterabilityStatus alstate;
  }

  struct RoleInfo {
    bytes32 adminId;
    bytes32 scopeId;
    uint24 memberLimit;
    uint8 typeLimit;
    SecurityPolicy policyType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
  }

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed roleId,
    string indexed name,
    bytes32 adminId,
    bytes32 scopeId,
    uint24 memberLimit,
    uint8 typeLimit,
    SecurityPolicy policyType,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event RoleMemberAltered(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, ActionType action);

  event RoleTypeAltered(address indexed sender, bytes32 indexed roleId, bytes32 indexed typeId, ActionType action);

  event RoleActivityUpdated(address indexed sender, bytes32 indexed roleId, ActivityStatus acstat);

  event RoleAlterabilityUpdated(address indexed sender, bytes32 indexed roleId, AlterabilityStatus alstat);

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 memberLimit);

  event RoleTypeLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 typeLimit);

  event RoleAdminUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed adminId);

  event RoleScopeUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed scopeId);

  event RolePolicyUpdated(address indexed sender, bytes32 indexed roleId, SecurityPolicy policy);

  function registerRoles(RequestRegisterRole[] calldata request) external returns (bytes32);

  function alterRolesMembers(RequestAlterMemberRole[] calldata requests) external returns (bool);

  function alterRolesTypes(RequestAlterTypeRole[] calldata requests) external returns (bool);

  function updateRolesAdmin(RequestUpdateAdminRole[] calldata requests) external returns (bool);

  function updateRolesScope(RequestUpdateScopeRole[] calldata requests) external returns (bool);
 
  function updateRolesActivityStatus(RequestUpdateActivityRole[] calldata requests) external returns (bool);

  function updateRolesAlterabilityStatus(RequestUpdateAlterabilityRole[] calldata requests) external returns (bool);

  function updateRolesPolicy(RequestUpdatePolicyRole[] calldata requests) external returns (bool);

  function updateRolesMemberLimit(RequestUpdateMemberLimitRole[] calldata requests) external returns (bool);

  function updateRolesTypeLimit(RequestUpdateTypeLimitRole[] calldata requests) external returns (bool);

  function isRoleExists(bytes32 roleId) external view returns (bool);

  function hasRoleMember(bytes32 roleId, bytes32 memberId) external view returns (bool);

  function hasRoleType(bytes32 roleId, bytes32 typeId) external view returns (bool);

  function getRoleMemberLimit(bytes32 roleId) external view returns (uint24);

  function getRoleTypeLimit(bytes32 roleId) external view returns (uint8);

  function getRoleActivityStatus(bytes32 roleId) external view returns (ActivityStatus);

  function getRoleAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus);

  function getRolePolicy(bytes32 roleId) external view returns (SecurityPolicy);

  function getRoleAdmin(bytes32 roleId) external view returns (bytes32);

  function getRoleName(bytes32 roleId) external view returns (string memory);

  function getRoleScope(bytes32 roleId) external view returns (bytes32);

  function getRoleMembers(bytes32 roleId) external view returns (bytes32[] memory);

  function getRoleTypes(bytes32 roleId) external view returns (bytes32[] memory);

  function getRoleInfo(bytes32 roleId) external view returns (RoleInfo memory);

  function generateRoleId(string calldata) external pure returns (bytes32);
}
