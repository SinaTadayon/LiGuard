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
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 typeLimit;
    bytes32[] types;
  }

  // struct GroupAddTypesRequest {
  //   bytes32 groupId;
  //   bytes32[] types;
  // }

  // struct GroupRemoveTypesRequest {
  //   bytes32 groupId;
  //   bytes32[] types;
  // }

  struct GroupUpdateTypeLimitRequest {
    bytes32 groupId;
    uint8 typeLimit;
  }

  struct GroupInfo {
    bytes32 adminId;
    bytes32 scopeId;
    uint8 typeLimit;
    uint8 typeTotal;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event GroupRegistered(
    address indexed sender,
    bytes32 indexed groupId,
    bytes32 indexed scopeId,
    string name,
    bytes32 adminId,
    uint8 typeLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  // event GroupTypeAdded(address indexed sender, bytes32 indexed groupId, bytes32 indexed typeId);

  // event GroupTypeRemoved(address indexed sender, bytes32 indexed groupId, bytes32 indexed typeId);

  event GroupActivityUpdated(address indexed sender, bytes32 indexed groupId, ActivityStatus acstat);

  event GroupAlterabilityUpdated(address indexed sender, bytes32 indexed groupId, AlterabilityStatus alstat);

  event GroupTypeLimitUpdated(address indexed sender, bytes32 indexed groupId, uint8 typeLimit);

  event GroupAdminUpdated(address indexed sender, bytes32 indexed groupId, bytes32 indexed adminId);

  // event GroupScopeUpdated(address indexed sender, bytes32 indexed groupId, bytes32 indexed scopeId);

  function groupRegister(GroupRegisterRequest[] calldata requests) external returns (bool);

  // function groupAddType(bytes32 groupId, bytes32 typeId) external returns (bool);

  // function groupAddTypes(GroupAddTypesRequest[] calldata requests) external returns (bool);

  // function groupRemoveTypes(GroupRemoveTypesRequest[] calldata requests) external returns (bool);

  // function groupUpdateScope(AgentUpdateScopeRequest[] calldata requests) external returns (bool);

  function groupUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);
 
  function groupUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function groupUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function groupUpdateTypeLimit(GroupUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function groupCheckId(bytes32 groupId) external view returns (bool);

  // function groupCheckName(string calldata groupName) external view returns (bool);

  // function groupHasAccount(bytes32 groupId, address account) external view returns (bool);

  // function groupHasMember(bytes32 groupId, bytes32 memberId) external view returns (bool);

  function groupHasType(bytes32 groupId, bytes32 typeId) external view returns (bool);

  // function groupHasAgent(bytes32 groupId, bytes32 agentId) external view returns (bool);

  // function groupGetTypeLimit(bytes32 groupId) external view returns (uint8);

  // function groupGetActivityStatus(bytes32 groupId) external view returns (ActivityStatus);

  // function groupGetAlterabilityStatus(bytes32 groupId) external view returns (AlterabilityStatus);

  // function groupGetName(bytes32 groupId) external view returns (string memory);

  // function groupGetScope(bytes32 groupId) external view returns (bytes32);

  function groupGetTypes(bytes32 groupId) external view returns (bytes32[] memory);

  // function groupGetTypesCount(bytes32 groupId) external view returns (uint8);

  function groupGetInfo(bytes32 groupId) external view returns (GroupInfo memory);

  // function groupGenerateId(string calldata name) external pure returns (bytes32);
}
