// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IGroupManagement {

    event GroupRegistered(bytes32 indexed group, address indexed sender, string name, bool isEnabled);

    event GroupRoleGranted(bytes32 indexed group, bytes32 indexed role, address indexed sender);

    event GroupRoleRevoked(bytes32 indexed group, bytes32 indexed role, address indexed sender);

    event GroupEnabled(bytes32 indexed group, address indexed sender);

    event GroupDisabled(bytes32 indexed group, address indexed sender);

    function addGroup(string calldata name, bool isEnabled) external returns (bytes32);

    function grantGroupRole(bytes32 group, bytes32 role) external returns (bool);

    function revokeGroupRole(bytes32 group, bytes32 role) external returns (bool);

    function enabledGroup(bytes32 group) external returns (bool);

    function disabledGroup(bytes32 group) external returns (bool);

    function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool);

    function getGroup(bytes32 group) external view returns (string calldata, bool);

    function getGroupRoles(bytes32 group) external view returns (bytes32[] calldata);

}