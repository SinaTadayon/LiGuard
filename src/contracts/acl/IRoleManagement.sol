// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IRoleManagement {
    event RoleAccountGranted(bytes32 indexed role, address indexed account, address indexed sender);

    event RoleAccountRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    event RoleRegistered(
        bytes32 indexed role,
        string indexed name,
        address indexed sender,
        bytes32 group,
        bool isEnabled
    );

    event RoleStatChanged(bytes32 indexed role, address indexed sender, bytes32 indexed group, bool status);

    event RoleGroupChanged(bytes32 indexed role, address indexed sender, bytes32 indexed newGroup, bytes32 oldGroup);

    function registerRole(
        string calldata name,
        bytes32 group,
        bool status
    ) external returns (bytes32);

    function grantRoleAccount(bytes32 role, address account) external returns (bool);

    function revokeRoleAccount(bytes32 role, address account) external returns (bool);

    function setRoleStat(bytes32 role, bool status) external returns (bool);

    function setRoleGroup(bytes32 role, bytes32 group) external returns (bool);

    function getRole(bytes32 role)
        external
        view
        returns (
            string memory,
            bytes32,
            bool
        );

    function getRoleAccounts(bytes32 role) external view returns (address[] memory);

    function hasAccountRole(bytes32 role, address account) external view returns (bool);
}
