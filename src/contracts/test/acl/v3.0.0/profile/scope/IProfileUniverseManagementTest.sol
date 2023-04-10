// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../../IACLCommonsTest.sol";

interface IProfileUniverseManagementTest is IACLCommonsTest {
  struct ProfileUniverseInfo {
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

  event ProfileUniverseAdminUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed universeId,
    bytes32 adminId
  );

  event ProfileUniverseDomainLimitUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed universeId,
    uint16 domainLimit
  );

  event ProfileUniverseActivityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed universeId,
    ActivityStatus acstat
  );

  event ProfileUniverseAlterabilityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed universeId,
    AlterabilityStatus alstat
  );

  function profileUniverseUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ActivityStatus acstat)
    external
    returns (bool);

  function profileUniverseUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    AlterabilityStatus alstat
  ) external returns (bool);

  function profileUniverseUpdateAdmin(ProfileMemberSignature calldata memberSign, bytes32 adminId)
    external
    returns (bool);

  function profileUniverseUpdateDomainLimit(ProfileMemberSignature calldata memberSign, uint16 domainLimit)
    external
    returns (bool);

  function profileUniverseCheckAdmin(bytes32 profileId, address account) external view returns (bool);

  function profileUniverseGetDomains(bytes32 profileId) external view returns (bytes32[] memory);

  function profileUniverseGetInfo(bytes32 profileId) external view returns (ProfileUniverseInfo memory);
}
