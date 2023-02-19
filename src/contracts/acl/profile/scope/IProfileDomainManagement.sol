// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Profile Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../../IACLCommons.sol";

interface IProfileDomainManagement is IACLCommons {

  struct ProfileDomainRegisterRequest {
    bytes32 adminId;
    int24 realmLimit;
    string name;
  }

  struct ProfileDomainMoveRealmRequest {
    bytes32 domainId;
    bytes32 targetDomainId;
    bytes32 realmId;
  }

  struct ProfileDomainUpdateRealmLimitRequest {   
    bytes32 domainId;
    uint16 realmLimit;
  }

  struct ProfileDomainInfo {
    bytes32 adminId;
    bytes32 globalId;
    uint16 realmLimit;
    uint16 realmCount;
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
  
  event ProfileDomainRealmMoved(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, bytes32 realmId, bytes32 newDomainId);

  event ProfileDomainAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, bytes32 adminId);
  
  event ProfileDomainRealmLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, uint16 realmLimit);
  
  event ProfileDomainActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, ActivityStatus acstat);
  
  event ProfileDomainAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed domainId, AlterabilityStatus alstat);

  function profileDomainRegister(ProfileMemberSignature calldata memberSign, ProfileDomainRegisterRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateAlterabilityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateAdmin(ProfileMemberSignature calldata memberSign, ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileDomainMoveRealm(ProfileMemberSignature calldata memberSign, ProfileDomainMoveRealmRequest[] calldata requests) external returns (bool);

  function profileDomainUpdateRealmLimit(ProfileMemberSignature calldata memberSign, ProfileDomainUpdateRealmLimitRequest[] calldata requests) external returns (bool);

  function profileDomainCheckId(bytes32 profileId, bytes32 domainId) external view returns (bool);

  function profileDomainCheckName(bytes32 profileId, string calldata domainName) external view returns (bool);

  function profileDomainCheckAdmin(bytes32 profileId, bytes32 domainId, address account) external view returns (bool);

  function profileDomainHasFunction(bytes32 profileId, bytes32 domainId, bytes32 functionId) external view returns (bool);

  function profileDomainHasContext(bytes32 profileId, bytes32 domainId, bytes32 contextId) external view returns (bool);

  function profileDomainHasRealm(bytes32 profileId, bytes32 domainId, bytes32 realmId) external view returns (bool);

  function profileDomainGetRealms(bytes32 profileId, bytes32 domainId) external view returns (bytes32[] memory);

  function profileDomainGetInfo(bytes32 profileId, bytes32 domainId) external view returns (ProfileDomainInfo memory);
}