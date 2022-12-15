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
    uint16 typeLimit;
    string name;
  }

  struct DomainInfo {
    bytes32 adminId;
    uint16 realmLimit;
    uint16 typeLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstate;
    string name;
  }

  event DomainRegistered(
    address indexed sender, 
    bytes32 indexed domainId,
    bytes32 adminId,
    uint16 realmLimit,
    uint16 typeLimit,    
    AgentType atype,
    ActivityStatus acstat,
    AlterabilityStatus alstate,
    string name
  );
  
  event DomainAdminUpdated(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId, AgentType adminType);

  event DomainRealmLimitUpdated(address indexed sender, bytes32 indexed domainId, uint16 realmLimit);

  event DomainActivityUpdated(address indexed sender, bytes32 indexed domainId, ActivityStatus acstat);

  event DomainAlterabilityUpdated(address indexed sender, bytes32 indexed domainId, AlterabilityStatus alstat);

  event DomainTypeLimitUpdated(address indexed sender, bytes32 indexed domainId, uint16 typeLimit);

  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool);
 
  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function domainUpdateRealmLimit(bytes32 domainId, uint16 realmLimit) external returns (bool);

  function domainUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool);

  function domainCheckId(bytes32 domainId) external view returns (bool);

  function domainCheckName(string calldata domainName) external view returns (bool);

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool);

  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool);

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool);

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool);

  function domainGetName(bytes32 domainId) external view returns (string memory);

  function domainGetRealmLimit(bytes32 domainId) external view returns (uint16);

  function domainGetAdmin(bytes32 domainId) external view returns (AgentType, bytes32);

  function domainGetActivityStatus(bytes32 domainId) external view returns (ActivityStatus);

  function gomainGetAlterabilityStatus(bytes32 domainId) external view returns (AlterabilityStatus);

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetRealmsCount(bytes32 domainId) external view returns (uint16);

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory);

}