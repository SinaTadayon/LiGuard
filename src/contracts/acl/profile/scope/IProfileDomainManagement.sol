// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../../IACLCommons.sol";

interface IProfileDomainManagement is IACLCommons {

  struct ProfileDomainRegisterRequest {
    bytes32 profileId;
    bytes32 adminId;
    // uint32 realmLimit;
    // uint32 agentLimit;
    // ActivityStatus acstat;
    // AlterabilityStatus alstat;
    string name;
  }

  struct ProfileDomainUpdateRealmLimitRequest {
    bytes32 profileId;
    bytes32 domainId;
    uint32 realmLimit;
  }

  struct ProfileDomainInfo {
    bytes32 adminId;
    uint32 realmLimit;
    uint32 realmCount;
    // uint32 agentLimit;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event ProfileDomainRegistered(
    address indexed sender, 
    bytes32 indexed profileId,
    bytes32 indexed domainId,
    bytes32 adminId
  );
  
  event ProfileDomainAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, bytes32 adminId);
  
  event ProfileDomainRealmLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, uint32 realmLimit);
  
  event ProfileDomainActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, ActivityStatus acstat);
  
  event ProfileDomainAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, AlterabilityStatus alstat);
  // event DomainAgentLimitUpdated(address indexed sender, bytes32 indexed domainId, uint32 agentLimit);

  function profileDomainRegister(ProfileDomainRegisterRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateRealmLimit(ProfileDomainUpdateRealmLimitRequest[] calldata requests) external returns (bool);

  // function profileDomainUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);
  function profileDomainCheckId(bytes32 profileId, bytes32 domainId) external view returns (bool);

  function profileDomainCheckName(bytes32 profileId, string calldata domainName) external view returns (bool);

  function profileDomainCheckAdmin(bytes32 profileId, bytes32 domainId, address account) external view returns (bool);

  function profileDomainHasFunction(bytes32 profileId, bytes32 domainId, bytes32 functionId) external view returns (bool);

  function profileDomainHasContext(bytes32 profileId, bytes32 domainId, bytes32 contextId) external view returns (bool);

  function profileDomainHasRealm(bytes32 profileId, bytes32 domainId, bytes32 realmId) external view returns (bool);

  function profileDomainGetRealms(bytes32 profileId, bytes32 domainId) external view returns (bytes32[] memory);

  function profileDomainGetInfo(bytes32 profileId, bytes32 domainId) external view returns (ProfileDomainInfo memory);
}