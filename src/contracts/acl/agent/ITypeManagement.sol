// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Type Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface ITypeManagement is IAclCommons {

  struct TypeAddRolesRequest {
    bytes32 typeId;
    bytes32[] roles;
  }

  struct TypeRemoveRolesRequest {
    bytes32 typeId;
    bytes32[] roles;
  }

  struct TypeUpdateScopeRequest { 
    bytes32 typeId;
    bytes32 scopeId;
  }

  struct TypeUpdateGroupRequest { 
    bytes32 typeId;
    bytes32 groupId;
  }

  struct TypeUpdateRoleLimitRequest {
    bytes32 typeId;
    uint24 roleLimit;
  }

  struct TypeUpdateActivityRequest {
    bytes32 typeId;
    ActivityStatus acstat;
  }

  struct TypeUpdateAlterabilityRequest {
    bytes32 typeId;
    AlterabilityStatus alstate;
  }

  struct TypeInfo {
    bytes32 scopeId;
    uint8 roleLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event TypeRegistered(
    address indexed sender,
    bytes32 indexed typeId,
    string indexed name,
    bytes32 scopeId,
    bytes32 groupId,
    uint8 roleLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event TypeRoleGranted(address indexed sender, bytes32 indexed typeId, bytes32 indexed roleId);

  event TypeRoleRevoked(address indexed sender, bytes32 indexed typeId, bytes32 indexed roleId);

  event TypeActivityUpdated(address indexed sender, bytes32 indexed typeId, ActivityStatus acstat);

  event TypeAlterabilityUpdated(address indexed sender, bytes32 indexed typeId, AlterabilityStatus alstat);

  event TypeRoleLimitUpdated(address indexed sender, bytes32 indexed typeId, uint8 roleLimit);

  event TypeScopeUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed scopeId);

  event TypeGroupUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed groupId);

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bytes32);

  function typeAddRoles(TypeAddRolesRequest[] calldata requests) external returns (bool);

  function typeRemoveRoles(TypeRemoveRolesRequest[] calldata requests) external returns (bool);

  function typeUpdateScope(TypeUpdateScopeRequest[] calldata requests) external returns (bool);
 
  function typeUpdateActivityStatus(TypeUpdateActivityRequest[] calldata requests) external returns (bool);

  function typeUpdateAlterabilityStatus(TypeUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function typeUpdatesRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  // if think should be same realm needed to change type group
  function typeUpdateGroup(TypeUpdateGroupRequest[] calldata requests) external returns (bool);

  function typeCheckExistance(bytes32 typeId) external view returns (bool);

  function typeCheckExistance(string calldata typeName) external view returns (bool);

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool);

  function typeHasMember(bytes32 typeId, bytes32 memberId) external view returns (bool);

  function typeHasAgent(bytes32 typeId, bytes32 agentId) external view returns (bool);

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool);

  function typeGetRoleLimit(bytes32 typeId) external view returns (uint8);

  function typeGetActivityStatus(bytes32 typeId) external view returns (ActivityStatus);

  function typeGetAlterabilityStatus(bytes32 typeId) external view returns (AlterabilityStatus);

  function typeGetName(bytes32 typeId) external view returns (string memory);

  function typeGetScope(bytes32 typeId) external view returns (ScopeType stype, bytes32);

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory);

  function typeGetRolesCount(bytes32 typeId) external view returns (uint8);

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory);

  function typeGenerateId(string calldata) external pure returns (bytes32);
}