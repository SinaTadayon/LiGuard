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
  struct RequestRegisterType {
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 roleLimit;
    bytes32 scopeId;
    bytes32 groupId;
    string name;
    bytes32[] roles;
  }

  struct RequestAlterRoleType {
    bytes32 typeId;
    ActionType action;  
    bytes32[] roles;
  }
  
  struct RequestUpdateScopeType { 
    bytes32 typeId;
    bytes32 scopeId;
  }

  struct RequestUpdateGroupType { 
    bytes32 typeId;
    bytes32 groupId;
  }

  struct RequestUpdateRoleLimitType {
    bytes32 typeId;
    uint24 roleLimit;
  }

  struct RequestUpdateActivityType {
    bytes32 typeId;
    ActivityStatus acstat;
  }

  struct RequestUpdateAlterabilityType {
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

  event TypeRoleAltered(address indexed sender, bytes32 indexed typeId, bytes32 indexed roleId, ActionType action);

  event TypeActivityUpdated(address indexed sender, bytes32 indexed typeId, ActivityStatus acstat);

  event TypeAlterabilityUpdated(address indexed sender, bytes32 indexed typeId, AlterabilityStatus alstat);

  event TypeRoleLimitUpdated(address indexed sender, bytes32 indexed typeId, uint8 roleLimit);

  event TypeScopeUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed scopeId);

  event TypeGroupUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed groupId);

  function registerTypes(RequestRegisterType[] calldata requests) external returns (bytes32);

  function alterTypesRoles(RequestAlterRoleType[] calldata requests) external returns (bool);

  function updateTypesScope(RequestUpdateScopeType[] calldata requests) external returns (bool);
 
  function updateTypesActivityStatus(RequestUpdateActivityType[] calldata requests) external returns (bool);

  function updateTypesAlterabilityStatus(RequestUpdateAlterabilityType[] calldata requests) external returns (bool);

  function updateTypesRoleLimit(RequestUpdateRoleLimitType[] calldata requests) external returns (bool);

  function updateTypesGroup(RequestUpdateGroupType[] calldata requests) external returns (bool);

  function isTypeExists(bytes32 typeId) external view returns (bool);

  function hasTypeRole(bytes32 typeId, bytes32 roleId) external view returns (bool);

  function getTypeRoleLimit(bytes32 typeId) external view returns (uint8);

  function getTypeActivityStatus(bytes32 typeId) external view returns (ActivityStatus);

  function getTypeAlterabilityStatus(bytes32 typeId) external view returns (AlterabilityStatus);

  function getTypeName(bytes32 typeId) external view returns (string memory);

  function getTypeScope(bytes32 typeId) external view returns (bytes32);

  function getTypeInfo(bytes32 roleId) external view returns (TypeInfo memory);

  function generateTypeId(string calldata) external pure returns (bytes32);
}