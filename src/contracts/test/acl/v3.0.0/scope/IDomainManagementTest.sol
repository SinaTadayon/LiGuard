// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IACLCommonsTest.sol";

interface IDomainManagementTest is IACLCommonsTest {
  struct DomainRegisterRequest {
    bytes32 adminId;
    int24 realmLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct DomainUpdateRealmLimitRequest {
    bytes32 domainId;
    uint16 realmLimit;
  }

  struct DomainMoveRealmRequest {
    bytes32 domainId;
    bytes32 targetDomainId;
    bytes32 realmId;
  }

  struct DomainInfo {
    bytes32 adminId;
    bytes32 universeId;
    uint16 realmLimit;
    uint16 realmCount;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event DomainRegistered(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId);

  event DomainRealmMoved(
    address indexed sender,
    bytes32 indexed domainId,
    bytes32 indexed realmId,
    bytes32 newDomainId
  );

  event DomainAdminUpdated(address indexed sender, bytes32 indexed domainId, bytes32 indexed adminId);

  event DomainRealmLimitUpdated(address indexed sender, bytes32 indexed domainId, uint16 realmLimit);

  event DomainActivityUpdated(address indexed sender, bytes32 indexed domainId, ActivityStatus acstat);

  event DomainAlterabilityUpdated(address indexed sender, bytes32 indexed domainId, AlterabilityStatus alstat);

  event DomainRemoved(address indexed sender, bytes32 indexed domainId, bool isSoftDeleted);

  function domainRegister(MemberSignature calldata memberSign, DomainRegisterRequest[] calldata requests)
    external
    returns (bool);

  function domainUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function domainUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function domainUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function domainMoveRealm(MemberSignature calldata memberSign, DomainMoveRealmRequest[] calldata requests)
    external
    returns (bool);

  function domainUpdateRealmLimit(
    MemberSignature calldata memberSign,
    DomainUpdateRealmLimitRequest[] calldata requests
  ) external returns (bool);

  function domainRemove(MemberSignature calldata memberSign, bytes32[] calldata domains) external returns (bool);

  function domainCheckId(bytes32 domainId) external view returns (bool);

  function domainCheckName(string calldata domainName) external view returns (bool);

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool);

  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool);

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool);

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool);

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory);

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory);
}
