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
 struct GroupRegisterRequest {
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 typeLimit;
    bytes32 scopeId;
    string name;
    bytes32[] types;
  }

  struct GroupAddTypesRequest {
    bytes32 groupId;
    bytes32[] types;
  }

  struct GroupRemoveTypesRequest {
    bytes32 groupId;
    bytes32[] types;
  }

  struct GroupUpdateScopeRequest { 
    bytes32 groupId;
    bytes32 scopeId;
  }

  struct GroupUpdateTypeLimitRequest {
    bytes32 groupId;
    uint8 typeLimit;
  }

  struct GroupUpdateActivityRequest {
    bytes32 groupId;
    ActivityStatus acstat;
  }

  struct GroupUpdateAlterabilityRequest {
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

  event GroupTypeGranted(address indexed sender, bytes32 indexed groupId, bytes32 indexed typeId);

  event GroupTypeRevoked(address indexed sender, bytes32 indexed groupId, bytes32 indexed typeId);

  event GroupActivityUpdated(address indexed sender, bytes32 indexed groupId, ActivityStatus acstat);

  event GroupAlterabilityUpdated(address indexed sender, bytes32 indexed groupId, AlterabilityStatus alstat);

  event GroupTypeLimitUpdated(address indexed sender, bytes32 indexed groupId, uint8 typeLimit);

  event GroupScopeUpdated(address indexed sender, bytes32 indexed groupId, bytes32 indexed scopeId);

  function groupRegister(GroupRegisterRequest[] calldata requests) external returns (bool);

  function groupAddTypes(GroupAddTypesRequest[] calldata requests) external returns (bool);

  function groupRemoveTypes(GroupRemoveTypesRequest[] calldata requests) external returns (bool);

  function groupUpdateScope(GroupUpdateScopeRequest[] calldata requests) external returns (bool);
 
  function groupUpdateActivityStatus(GroupUpdateActivityRequest[] calldata requests) external returns (bool);

  function groupUpdateAlterabilityStatus(GroupUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function groupUpdateTypeLimit(GroupUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function groupCheckExistance(bytes32 groupId) external view returns (bool);

  function groupCheckExistance(string calldata groupName) external view returns (bool);

  function groupHasType(bytes32 groupId, bytes32 typeId) external view returns (bool);

  function groupHasAccount(bytes32 groupId, address account) external view returns (bool);

  function groupHasMember(bytes32 groupId, bytes32 memberId) external view returns (bool);

  function groupHasRole(bytes32 groupId, bytes32 roleId) external view returns (bool);

  function groupHasAgent(bytes32 typeId, bytes32 agentId) external view returns (bool);

  function groupGetTypeLimit(bytes32 groupId) external view returns (uint8);

  function groupGetActivityStatus(bytes32 groupId) external view returns (ActivityStatus);

  function groupGetAlterabilityStatus(bytes32 groupId) external view returns (AlterabilityStatus);

  function groupGetName(bytes32 groupId) external view returns (string memory);

  function groupGetScope(bytes32 groupId) external view returns (bytes32);

  function groupGetTypes(bytes32 groupId) external view returns (bytes32[] memory);

  function groupGetTypesCount(bytes32 groupId) external view returns (uint8);

  function groupGetInfo(bytes32 roleId) external view returns (GroupInfo memory);

  function groupGenerateId(string calldata) external pure returns (bytes32);
}
