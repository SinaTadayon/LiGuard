// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../lib/struct/LEnumerableSet.sol";
import "../lib/struct/LEnumerableMap.sol";


/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAclCommons {
  enum AccountType {
    EOA,      // external of account
    SCA       // smart contract account
  }

  enum AgentType {
    NONE,
    MEMBER,
    ROLE,
    TYPE,
    GROUP
  }

  enum ActivityStatus {
    NONE,
    DISABLE,
    ENABLE,
    SAFE_MODE
  }

  enum AlterabilityStatus {
    NONE,
    DISABLE,
    UPDATABLE,
    UPGRADABLE
  }

  enum ScopeType {
    NONE,
    FUNCTION, 
    CONTEXT,
    REALM,
    DOMAIN,
    GLOBAL
  }

  enum ActionType {
    ADD,
    UPDATE,
    REMOVE
  }

  enum PolicyType {
    UNLOCK,         // 0
    SLOCK,          // soft lock, 1 - 63
    MLOCK,          // medium lock, 64 - 127
    RLOCK,          // restrict lock, 128 - 191
    HLOCK,          // hard lock, 192 - 254
    LOCK            // 255
  }

  struct BaseAgent {
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat; 
  }

  struct BaseScope {
    bytes32 adminId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct PolicyEntity {
    bytes32 adminId;
    string name;
    uint8 code;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    PolicyType ptype;
    uint32 roleLimit;
    LEnumerableSet.Bytes32Set roles;
  }

  struct GeneralLimitation {
    uint24 memberLimit;
    uint16 functionLimit;
    uint16 contextLimit;
    uint16 realmLimit;
    uint8 domainLimit;
    uint8 roleLimit;
    uint8 typeLimit;
    uint8 groupLimit;      
    uint8 nameLenLimit;
  }

  struct FunctionEntity {
    BaseScope bs;    
    // bytes32 functionId;
    bytes32 contextId;
    bytes32 groupId;
    bytes4 selector;
    uint8 policyCode;    
  }
 
  struct ContextEntity {
    BaseScope bs;
    bytes32 realmId;    
    LEnumerableSet.Bytes32Set functions;
    LEnumerableSet.Bytes32Set groups;
    address contractId;
    uint8 functionLimit;
    uint8 groupLimit;
  }

  struct RealmEntity {
    BaseScope bs;
    bytes32 domainId;
    uint32 contextLimit;
    uint8 groupLimit;
    string name;
    LEnumerableSet.Bytes32Set contexts;
    LEnumerableSet.Bytes32Set groups;
  }

  struct DomainEntity {
    BaseScope bs;
    uint16 realmLimit;
    uint8 groupLimit;
    string name;
    LEnumerableSet.Bytes32Set realms;
    LEnumerableSet.Bytes32Set groups;
  }

  struct GlobalEntity {
    BaseScope bs;
    uint16 domainLimit;
    uint8 groupLimit;    
    LEnumerableSet.Bytes32Set domains;
    LEnumerableSet.Bytes32Set groups;
  }

  struct MemberEntity {
    BaseAgent ba;
    bytes32 adminId;    
    LEnumerableSet.Bytes32Set types;
    address account;
    uint8 typeLimit;
  }

  struct RoleEntity {
    BaseAgent ba;
    // bytes32 adminId;
    bytes32 scopeId;
    bytes32 typeId;
    string name;
    uint32 memberLimit;
    uint32 totalMember;
  }

  struct TypeEntity {
    BaseAgent ba;
    bytes32 adminId;
    bytes32 scopeId;
    bytes32 groupId;
    uint32 totalMember;
    uint32 memberLimit;
    uint8 roleLimit;    
    string name;
    mapping(bytes32 => bytes32) members;
    // LEnumerableMap.Bytes32ToBytes32Map members;
    LEnumerableSet.Bytes32Set roles;
  }

  struct GroupEntity {
    BaseAgent ba;
    bytes32 scopeId;
    string name;
    LEnumerableSet.Bytes32Set types;
    uint8 typeLimit;
  }


  // Request Types
  struct FacetSelectorMigrateRequest {
    ActionType action;
    bytes4[] selectors;
  }

  struct FacetMigrateRequest {
    address facetId;
    address newFacetId;
    bytes4 interfaceId;
    bytes4 newInterfaceId;
    FacetSelectorMigrateRequest[] migrations;
  }

  struct FacetRegisterRequest {
    address facetId;
    bytes4 interfaceId;
    bytes4[] selectors;
  }

  struct ScopeAddGroupsRequest {
    bytes32 scopeId; 
    bytes32[] groups;
  }

  struct ScopeRemoveGroupsRequest {
    bytes32 scopeId; 
    bytes32[] groups;
  }

  struct ScopeUpdateActivityRequest {
    bytes32 scopeId;
    ActivityStatus acstat;
  }

  struct ScopeUpdateAlterabilityRequest {
    bytes32 scopeId;
    AlterabilityStatus alstate;
  }

  struct ScopeUpdateAdminRequest {
    bytes32 scopeId;
    bytes32 adminId;
  }

  struct ScopeUpdateGroupLimitRequest {
    bytes32 scopeId;
    bytes8 groupLimit;
  }

  struct GroupRegisterRequest {
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 typeLimit;
    bytes32 scopeId;
    string name;
    bytes32[] types;
  }

  // /**
  //  * regiter new role need to add to some type, must caller have permission to add role to target types 
  //  * role registered by scope master or role master or super admin types
  //  */
  // struct RoleRegisterRequest {
  //   // bytes32 adminId;          // should role or member in any scope 
  //   bytes32 scopeId;          // related to request sender scope and sender and it can be one of sender scope and under it
  //   bytes32 typeId;
  //   bytes32 policyId;
  //   uint24 memberLimit;
  //   // uint8 typeLimit;
  //   string name;
  //   ActivityStatus acstat;
  //   AlterabilityStatus alstat;   
  // }

  // struct TypeRegisterRequest {
  //   bytes32 adminId;          // should role or member in any scope 
  //   bytes32 scopeId;
  //   bytes32 groupId;
  //   string name;
  //   uint24 memberLimit;
  //   uint8 roleLimit;
  //   // bytes32[] roles;
  //   ActivityStatus acstat;
  //   AlterabilityStatus alstat;

  // }
}