// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IRealmManagement is IAclCommons {

  struct RealmRegisterRequest {
    bytes32 domainId;
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 groupLimit;
    uint32 contextLimit;
    string name;
    bytes32[] contexts;  
  }

  struct RealmUpdateDomainRequest {
    bytes32 realmId;
    bytes32 domainId;
  }

  struct RealmUpdateContextLimitRequest {
    bytes32 realmId;
    bytes32 contextLimit;
  }

  struct RealmAddContextsRequest {
    bytes32 realmId;
    bytes32[] contexts;
  }

  struct RealmRemoveContextsRequest {
    bytes32 realmId;
    bytes32[] contexts;
  }

  struct RealmInfo {
    bytes32 domainId;
    bytes32 adminId;
    uint32 contextLimit;
    uint8 groupLimit;    
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    AgentType adminType;
    string name;    
  }

  event RealmRegistered(
    address indexed sender, 
    bytes32 indexed realmId, 
    bytes32 indexed domainId,
    bytes32 adminId,
    string name,    
    AgentType adminType,
    ActivityStatus acstat,
    AlterabilityStatus alstate,
    uint32 contextLimit,
    uint8 groupLimit
  );
  
  event RealmContextAdded(
    address indexed sender, 
    bytes32 indexed realmId,
    bytes32 indexed contextId
  );

  event RealmContextRemoved(
    address indexed sender, 
    bytes32 indexed realmId,
    bytes32 indexed contextId
  );

  event RealmAdminUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed adminId, AgentType adminType);

  event RealmGroupLimitUpdated(address indexed sender, bytes32 indexed realmId, uint8 groupLimit);

  event RealmContextLimitUpdated(address indexed sender, bytes32 indexed realmId, uint32 contextLimit);

  event RealmActivityUpdated(address indexed sender, bytes32 indexed realmId, ActivityStatus acstat);

  event RealmAlterabilityUpdated(address indexed sender, bytes32 indexed realmId, AlterabilityStatus alstat);

  event RealmDomainUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed domainId);

  event RealmGroupAdded(address indexed sender, bytes32 indexed realmId, bytes32 indexed groupId);

  event RealmGroupRemoved(address indexed sender, bytes32 indexed realmId, bytes32 indexed groupId);

  function realmRegister(RealmRegisterRequest[] calldata requests) external returns (bool);

  function realmAddGroups(ScopeAddGroupsRequest[] calldata requests) external returns (bool);

  function realmRemoveGroups(ScopeRemoveGroupsRequest[] calldata requests) external returns (bool);

  function realmCreateGroup(GroupRegisterRequest[] calldata requests) external returns (bytes32);

  function realmCreateType(TypeRegisterRequest[] calldata requests) external returns (bytes32);

  function realmCreateRole(RoleRegisterRequest[] calldata requests) external returns (bytes32);

  function realmAddContexts(RealmAddContextsRequest[] calldata requests) external returns (bool);

  function realmRemoveContexts(RealmRemoveContextsRequest[] calldata requests) external returns (bool);
 
  function realmUpdateActivityStatus(ScopeUpdateActivityRequest[] calldata requests) external returns (bool);

  function realmUpdateAlterabilityStatus(ScopeUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function realmUpdateAdmin(ScopeUpdateAdminRequest[] calldata requests) external returns (bool);

  function realmUpdateDomain(RealmUpdateDomainRequest[] calldata requests) external returns (bool);

  function realmUpdateGroupLimit(ScopeUpdateGroupLimitRequest[] calldata requests) external returns (bool);

  function realmUpdateContextLimit(RealmUpdateContextLimitRequest[] calldata requests) external returns (bool);

  function realmCheckExistance(bytes32 realmId) external view returns (bool);

  function realmCheckExistance(string calldata realmName) external view returns (bool);

  function realmCheckAdmin(bytes32 contextId, bytes32 agentId) external view returns (bool);

  function realmCheckAgent(bytes32 realmId, bytes32 agentId) external view returns (bool);

  function realmCheckAccount(bytes32 realmId, address account) external view returns (bool);

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool);

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool);

  function realmGetName(bytes32 realmId) external view returns (string memory);

  function realmGetDomain(bytes32 realmId) external view returns (bytes32);

  function realmGetGroupLimit(bytes32 realmId) external view returns (uint8);

  function realmGetContextLimit(bytes32 realmId) external view returns (uint16);

  function realmGetAdmin(bytes32 realmId) external view returns (bytes32, AgentType);

  function realmGetActivityStatus(bytes32 realmId) external view returns (ActivityStatus);

  function realmGetAlterabilityStatus(bytes32 realmId) external view returns (AlterabilityStatus);

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory);

  function realmGetContextsCount(bytes32 realmId) external view returns (uint32);

  function realmGetGroups(bytes32 realmId) external view returns (bytes32[] memory);

  function realmGetGroupsCount(bytes32 realmId) external view returns (uint8);

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory);

  function realmGenerateId(string calldata name) external pure returns (bytes32);
}
