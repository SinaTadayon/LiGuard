// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IRoleManagement {
  struct RegiterRoleRequest {
    bytes32 group;
    string name;
    bool status;
  }

  struct UpdateRoleRequest {
    bytes32 role;
    address account;
  }

  event RoleAccountGranted(address indexed sender, bytes32 indexed role, address indexed account);

  event RoleAccountRevoked(address indexed sender, bytes32 indexed role, address indexed account);

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed role,
    string indexed name,
    bytes32 group,
    bool isEnabled
  );

  event RoleStatusChanged(address indexed sender, bytes32 indexed role, bytes32 indexed group, bool status);

  event RoleGroupChanged(address indexed sender, bytes32 indexed role, bytes32 indexed newGroup, bytes32 oldGroup);

  function registerRole(
    string calldata name,
    bytes32 group,
    bool status
  ) external returns (bytes32);

  function batchRegisterRole(RegiterRoleRequest[] calldata requests) external returns (bytes32[] memory);

  function grantRoleAccount(bytes32 role, address account) external returns (bool);

  function batchGrantRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool);

  function revokeRoleAccount(bytes32 role, address account) external returns (bool);

  function batchRevokeRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool);

  function setRoleStatus(bytes32 role, bool status) external returns (bool);

  function setRoleGroup(bytes32 role, bytes32 group) external returns (bool);

  function getRoleInfo(bytes32 role)
    external
    view
    returns (
      string memory,
      bytes32,
      bool
    );

  function getRoleAccounts(bytes32 role) external view returns (address[] memory);

  function hasRoleAccount(bytes32 role, address account) external view returns (bool);
}