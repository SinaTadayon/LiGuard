// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IACLCommons.sol";

interface IDomainManagement is IACLCommons{

  struct DomainRegisterRequest {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct DomainUpdateRealmLimitRequest {
    bytes32 domainId;
    uint16 realmLimit;
  }

  struct DomainInfo {
    bytes32 adminId;
    uint16 realmLimit;
    uint16 realmCount;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event DomainRegistered(
    address indexed sender, 
    bytes32 indexed domainId,
    bytes32 indexed adminId
  );
  
  event DomainAdminUpdated(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId);

  event DomainRealmLimitUpdated(address indexed sender, bytes32 indexed domainId, uint32 realmLimit);

  event DomainActivityUpdated(address indexed sender, bytes32 indexed domainId, ActivityStatus acstat);

  event DomainAlterabilityUpdated(address indexed sender, bytes32 indexed domainId, AlterabilityStatus alstat);

  event DomainAgentLimitUpdated(address indexed sender, bytes32 indexed domainId, uint32 agentLimit);

  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool);

  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function domainUpdateRealmLimit(DomainUpdateRealmLimitRequest[] calldata requests) external returns (bool);

  function domainCheckId(bytes32 domainId) external view returns (bool);

  function domainCheckName(string calldata domainName) external view returns (bool);

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool);

  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool);

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool);

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool);

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory);

}