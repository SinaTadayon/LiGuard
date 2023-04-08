// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IACLCommons {
  enum AgentType {
    NONE,
    MEMBER,
    ROLE,
    TYPE
  }

  enum ActivityStatus {
    NONE,
    DELETED,
    DISABLED,
    ENABLED
  }

  enum AlterabilityStatus {
    NONE,
    DISABLED,
    UPDATABLE,
    UPGRADABLE
  }

  enum ScopeType {
    NONE,
    FUNCTION,
    CONTEXT,
    REALM,
    DOMAIN,
    UNIVERSE
  }

  enum ActionType {
    ADD,
    UPDATE,
    REMOVE
  }

  enum PolicyType {
    UNLOCK, // 0
    SLOCK, // soft lock, 1 - 63
    MLOCK, // medium lock, 64 - 127
    RLOCK, // restrict lock, 128 - 191
    HLOCK, // hard lock, 192 - 254
    LOCK // 255
  }

  struct BaseAgent {
    bytes32 adminId;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct BaseScope {
    bytes32 adminId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint32 referredByAgent;
  }

  struct PolicyEntity {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    uint16 roleLimit;
    uint8 policyCode;
    PolicyType ptype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    LEnumerableSet.Bytes32Set roles;
  }

  struct FunctionEntity {
    BaseScope bs;
    bytes32 agentId;
    bytes32 contextId;
    bytes4 selector;
    uint8 policyCode;
  }

  struct ContextEntity {
    BaseScope bs;
    bytes32 realmId;
    address contractId;
    uint8 functionLimit;
    LEnumerableSet.Bytes32Set functions;
  }

  struct RealmEntity {
    BaseScope bs;
    bytes32 domainId;
    uint32 contextLimit;
    string name;
    LEnumerableSet.Bytes32Set contexts;
  }

  struct DomainEntity {
    BaseScope bs;
    bytes32 universeId;
    uint16 realmLimit;
    string name;
    LEnumerableSet.Bytes32Set realms;
  }

  struct UniverseEntity {
    BaseScope bs;
    uint16 domainLimit;
    string name;
    LEnumerableSet.Bytes32Set domains;
  }

  struct GeneralLimit {
    uint24 memberLimit;
    uint16 memberRegisterLimit;
    uint16 contextRegisterLimit;
    uint16 functionRegisterLimit;
    uint16 profileRegisterLimit;
    uint16 contextLimit;
    uint16 realmLimit;
    uint16 domainLimit;
    uint16 callLimit;
    uint16 typeRoleLimit;
    uint16 typeLimit;
    uint8 roleRegisterLimit;
    uint8 typeRegisterLimit;
    uint8 realmRegisterLimit;
    uint8 domainRegisterLimit;
    uint8 policyRegisterLimit;
    uint8 policyRoleLimit;
    uint8 functionLimit;
  }

  struct MemberEntity {
    BaseAgent ba;
    address account;
    GeneralLimit limits;
    LEnumerableSet.Bytes32Set types;
  }

  struct MemberSignature {
    address account;
    uint64 expiredAt;
    bytes signature;
  }

  struct RoleEntity {
    BaseAgent ba;
    bytes32 scopeId;
    bytes32 typeId;
    string name;
    uint24 memberLimit;
    uint24 memberCount;
  }

  struct TypeEntity {
    BaseAgent ba;
    bytes32 scopeId;
    string name;
    uint16 roleLimit;
    mapping(bytes32 => bytes32) members;
    LEnumerableSet.Bytes32Set roles;
  }

  struct FacetEntity {
    address subjectId;
  }

  struct UpdateActivityRequest {
    bytes32 id;
    ActivityStatus acstat;
  }

  struct UpdateAlterabilityRequest {
    bytes32 id;
    AlterabilityStatus alstat;
  }

  struct UpdateAdminRequest {
    bytes32 id;
    bytes32 adminId;
  }

  // used in Policy / Role / Type
  struct UpdateScopeRequest {
    bytes32 id;
    bytes32 scopeId;
  }

  ////////////////////////////////////////////////////////////////////
  // Profiles

  struct ProfileMemberSignature {
    string profileName;
    address account;
    uint64 expiredAt;
    bytes signature;
  }

  struct ProfileRegisterLimit {
    uint32 memberRegisterLimit;
    uint32 roleRegisterLimit;
    uint32 typeRegisterLimit;
    uint32 functionRegisterLimit;
    uint32 contextRegisterLimit;
    uint16 realmRegisterLimit;
    uint16 domainRegisterLimit;
    uint16 policyRegisterLimit;
  }

  struct ProfileLimit {
    uint32 profileCallLimit;
    uint32 contextLimit;
    uint24 memberLimit;
    uint16 realmLimit;
    uint16 domainLimit;
    uint16 memberCallLimit;
    uint16 typeRoleLimit;
    uint16 typeLimit;
    uint16 policyRoleLimit;
    uint8 functionLimit;
  }

  struct ProfileAccount {
    bytes32[] profiles;
  }

  struct ProfileMemberEntity {
    BaseAgent ba;
    address account;
    uint16 callLimit;
    uint16 typeLimit;
    ProfileRegisterLimit registerLimits;
    LEnumerableSet.Bytes32Set types;
  }

  struct ProfileUpdateActivityRequest {
    bytes32 entityId;
    ActivityStatus acstat;
  }

  struct ProfileUpdateAlterabilityRequest {
    bytes32 entityId;
    AlterabilityStatus alstat;
  }

  struct ProfileUpdateAdminRequest {
    bytes32 entityId;
    bytes32 adminId;
  }

  struct ProfileUpdateScopeRequest {
    bytes32 entityId;
    bytes32 scopeId;
  }
}
