// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IAclCommons.sol";

interface IDomainManagement is IAclCommons {

  struct DomainRegisterRequest {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint16 realmLimit;
    uint8 groupLimit;
    string name;
    bytes32[] realms;  
  }

  struct DomainAddRealmsRequest {
    bytes32 domainId;
    bytes32[] realms;
  }

  struct DomainRemoveRealmsRequest {
    bytes32 domainId;
    bytes32[] realms;
  }

  struct DomainInfo {
    bytes32 domainId;
    bytes32 adminId;
    uint16 realmLimit;
    uint8 groupLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    string name;
  }

  event DomainRegistered(
    address indexed sender, 
    bytes32 indexed domainId,
    bytes32 adminId,    
    AgentType atype,
    ActivityStatus acstat,
    AlterabilityStatus alstate,
    uint16 realmLimit,
    uint8 groupLimit,
    string name
  );
  

  event DomainAdminUpdated(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId, AgentType adminType);

  event DomainGroupLimitUpdated(address indexed sender, bytes32 indexed domainId, uint8 groupLimit);

  event DomainRealmLimitUpdated(address indexed sender, bytes32 indexed domainId, uint16 realmLimit);

  event DomainActivityUpdated(address indexed sender, bytes32 indexed domainId, ActivityStatus acstat);

  event DomainAlterabilityUpdated(address indexed sender, bytes32 indexed domainId, AlterabilityStatus alstat);

  event DomainGroupAdded(address indexed sender, bytes32 indexed domainId, bytes32 indexed groupId);

  event DomainGroupRemoved(address indexed sender, bytes32 indexed domainId, bytes32 indexed groupId);

  event DomainRealmAdded(address indexed sender, bytes32 indexed domainId, bytes32 indexed realmId);

  event DomainRealmRemoved(address indexed sender, bytes32 indexed domainId, bytes32 indexed realmId);

  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool);

  function domainAddRealms(DomainAddRealmsRequest[] calldata requests) external returns (bool);

  function domainRemoveRealms(DomainRemoveRealmsRequest[] calldata requests) external returns (bool);
 
  function domainAddGroups(ScopeAddGroupsRequest[] calldata requests) external returns (bool);

  function domainRemoveGroups(ScopeRemoveGroupsRequest[] calldata requests) external returns (bool);

  function domainCreateGroup(GroupRegisterRequest[] calldata requests) external returns (bytes32);

  function domainCreateType(TypeRegisterRequest[] calldata requests) external returns (bytes32);

  function domainCreateRole(RoleRegisterRequest[] calldata requests) external returns (bytes32);

  function domainUpdateActivityStatus(ScopeUpdateActivityRequest[] calldata requests) external returns (bool);

  function domainUpdateAlterabilityStatus(ScopeUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function domainUpdateAdmin(ScopeUpdateAdminRequest[] calldata requests) external returns (bool);

  function domainUpdateGroupLimit(ScopeUpdateGroupLimitRequest[] calldata requests) external returns (bool);

  function domainUpdateRealmLimit(bytes32 domainId, uint16 realmLimit) external returns (bool);

  function domainCheckExistance(bytes32 domainId) external view returns (bool);

  function domainCheckExistance(string calldata domainName) external view returns (bool);

  function domainCheckAdmin(bytes32 domainId, bytes32 agentId) external view returns (bool);

  function domainCheckAgent(bytes32 domainId, bytes32 agentId) external view returns (bool);

  function domainCheckAccount(bytes32 domainId, address account) external view returns (bool);

  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool);

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool);

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool);

  function domainGetName(bytes32 domainId) external view returns (string memory);

  function domainGetGroupLimit(bytes32 domainId) external view returns (uint8);

  function domainGetRealmLimit(bytes32 domainId) external view returns (uint16);

  function domainGetAdmin(bytes32 domainId) external view returns (bytes32, AgentType);

  function domainGetActivityStatus(bytes32 domainId) external view returns (ActivityStatus);

  function gomainGetAlterabilityStatus(bytes32 domainId) external view returns (AlterabilityStatus);

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetRealmsCount(bytes32 domainId) external view returns (uint16);

  function domainGetGroups(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetGroupsCount(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory);

  function domainGenerateId(string calldata name) external view returns (bytes32);
}