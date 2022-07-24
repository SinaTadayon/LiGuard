// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IGroupManagement {
  event GroupRegistered(bytes32 indexed group, address indexed sender, string name, bool status);

  event GroupStatusChanged(bytes32 indexed group, address indexed sender, bool status);

  function registerGroup(string calldata name, bool status) external returns (bytes32);

  function setGroupStatus(bytes32 group, bool status) external returns (bool);

  function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool);

  function getGroupInfo(bytes32 group) external view returns (string memory, bool);

  function getGroupRoles(bytes32 group) external view returns (bytes32[] memory);
}
