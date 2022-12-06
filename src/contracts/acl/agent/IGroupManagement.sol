// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Group Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IGroupManagement is IAclCommons {
 struct RequestRegisterGroup {
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 typeLimit;
    bytes32 scopeId;
    string name;
    bytes32[] types;
  }

  struct RequestAlterTypeGroup {
    bytes32 groupId;
    ActionType action;  
    bytes32[] types;
  }
  
  struct RequestUpdateScopeGroup { 
    bytes32 groupId;
    bytes32 scopeId;
  }

  struct RequestUpdateTypeLimitGroup {
    bytes32 groupId;
    uint8 typeLimit;
  }

  struct RequestUpdateActivityGroup {
    bytes32 groupId;
    ActivityStatus acstat;
  }

  struct RequestUpdateAlterabilityGroup {
    bytes32 groupId;
    AlterabilityStatus alstate;
  }

  struct GroupInfo {
    bytes32 scopeId;
    uint8 groupLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event GroupRegistered(
    address indexed sender,
    bytes32 indexed groupId,
    string indexed name,
    bytes32 scopeId,
    uint8 typeLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event GroupTypeAltered(address indexed sender, bytes32 indexed groupId, bytes32 indexed typeId, ActionType action);

  event GroupActivityUpdated(address indexed sender, bytes32 indexed groupId, ActivityStatus acstat);

  event GroupAlterabilityUpdated(address indexed sender, bytes32 indexed groupId, AlterabilityStatus alstat);

  event GroupTypeLimitUpdated(address indexed sender, bytes32 indexed groupId, uint8 typeLimit);

  event GroupScopeUpdated(address indexed sender, bytes32 indexed groupId, bytes32 indexed scopeId);

  function registerGroups(RequestRegisterGroup[] calldata requests) external returns (bool);

  function alterGroupsTypes(RequestAlterTypeGroup[] calldata requests) external returns (bool);

  function updateGroupsScope(RequestUpdateScopeGroup[] calldata requests) external returns (bool);
 
  function updateGroupsActivityStatus(RequestUpdateActivityGroup[] calldata requests) external returns (bool);

  function updateGroupsAlterabilityStatus(RequestUpdateAlterabilityGroup[] calldata requests) external returns (bool);

  function updateGroupsTypeLimit(RequestUpdateTypeLimitGroup[] calldata requests) external returns (bool);

  function isGroupExists(bytes32 groupId) external view returns (bool);

  function hasGroupType(bytes32 groupId, bytes32 typeId) external view returns (bool);

  function getGroupTypeLimit(bytes32 groupId) external view returns (uint8);

  function getGroupActivityStatus(bytes32 groupId) external view returns (ActivityStatus);

  function getGroupAlterabilityStatus(bytes32 groupId) external view returns (AlterabilityStatus);

  function getGroupName(bytes32 groupId) external view returns (string memory);

  function getTypeScope(bytes32 groupId) external view returns (bytes32);

  function getGroupInfo(bytes32 roleId) external view returns (GroupInfo memory);

  function generateGroupId(string calldata) external pure returns (bytes32);
}
