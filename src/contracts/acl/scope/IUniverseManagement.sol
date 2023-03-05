// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IACLCommons.sol";

interface IUniverseManagement is IACLCommons {
  struct UniverseInfo {
    bytes32 id;
    bytes32 adminId;
    uint16 domainLimit;
    uint16 domainCount;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event UniverseAdminUpdated(address indexed sender, bytes32 indexed universeId, bytes32 indexed adminId);

  event UniverseDomainLimitUpdated(address indexed sender, bytes32 indexed universeId, uint16 domainLimit);

  event UniverseActivityUpdated(address indexed sender, bytes32 indexed universeId, ActivityStatus acstat);

  event UniverseAlterabilityUpdated(address indexed sender, bytes32 indexed universeId, AlterabilityStatus alstat);

  function universeUpdateActivityStatus(MemberSignature calldata memberSign, ActivityStatus acstat)
    external
    returns (ActivityStatus);

  function universeUpdateAlterabilityStatus(MemberSignature calldata memberSign, AlterabilityStatus alstat)
    external
    returns (AlterabilityStatus);

  function universeUpdateAdmin(MemberSignature calldata memberSign, bytes32 newAdminId) external returns (bool);

  function universeUpdateDomainLimit(MemberSignature calldata memberSign, uint16 domainLimit) external returns (bool);

  function universeCheckAdmin(address account) external view returns (bool);

  function universeGetDomains() external view returns (bytes32[] memory);

  function universeGetInfo() external view returns (UniverseInfo memory);
}
