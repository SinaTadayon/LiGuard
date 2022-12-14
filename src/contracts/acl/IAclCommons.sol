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
    TYPE
    // GROUP
  }

  enum ActivityStatus {
    NONE,
    DELETED,
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
    uint16 typelimit;
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

  // struct GeneralLimitation {
  //   uint24 memberLimit;
  //   uint16 functionLimit;
  //   uint16 contextLimit;
  //   uint16 realmLimit;
  //   uint8 domainLimit;
  //   uint8 roleLimit;
  //   uint8 typeLimit;
  //   uint8 groupLimit;      
  //   uint8 nameLenLimit;
  // }

  struct FunctionEntity {
    BaseScope bs;    
    bytes32 agentId;
    bytes32 contextId;
    bytes4 selector;
    // uint16 agentLimit;
    uint8 policyCode;        
    // LEnumerableSet.Bytes32Set agents;
  }
 
  struct ContextEntity {
    BaseScope bs;
    bytes32 realmId;
    address contractId;
    uint32 factoryLimit;
    uint32 factoryTotal;
    uint8 functionLimit;    
    LEnumerableSet.Bytes32Set functions;
    // LEnumerableSet.Bytes32Set agents;
  }

  struct RealmEntity {
    BaseScope bs;
    bytes32 domainId;
    uint32 contextLimit;
    // uint16 agentLimit;
    string name;
    LEnumerableSet.Bytes32Set contexts;
    // LEnumerableSet.Bytes32Set agents;
  }

  struct DomainEntity {
    BaseScope bs;
    uint16 realmLimit;
    // uint16 agentLimit;
    string name;
    LEnumerableSet.Bytes32Set realms;
    // LEnumerableSet.Bytes32Set agents;
  }

  struct GlobalEntity {
    BaseScope bs;
    uint16 domainLimit;
    // uint16 agentLimit;    
    LEnumerableSet.Bytes32Set domains;
    // LEnumerableSet.Bytes32Set agents;
  }

  struct MemberEntity {
    BaseAgent ba;
    uint16 typeLimit;
    address account;    
    LEnumerableSet.Bytes32Set types;
  }

  struct RoleEntity {
    BaseAgent ba;    
    bytes32 scopeId;
    bytes32 typeId;
    string name;
    uint32 memberLimit;
    uint32 memberTotal;
  }

  struct TypeEntity {
    BaseAgent ba;
    uint32 memberTotal;
    uint32 memberLimit;
    uint8 roleLimit;
    bytes32 scopeId;
    // bytes32 groupId;    
    string name;
    mapping(bytes32 => bytes32) members;
    // LEnumerableMap.Bytes32ToBytes32Map members;
    LEnumerableSet.Bytes32Set roles;
  }

  // struct GroupEntity {
  //   BaseAgent ba;
  //   uint8 typeLimit;
  //   bytes32 scopeId;
  //   string name;
  //   LEnumerableSet.Bytes32Set types;
  // }

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

  // Agent Requests
  struct AgentUpdateScopeRequest { 
    bytes32 agentId;
    bytes32 scopeId;
  }

  // Scope Requests
  struct ScopeUpdateTypeLimitRequest {
    bytes32 scopeId; 
    uint16 typeLimit;
  }

  // struct ScopeRemoveGroupsRequest {
  //   bytes32 scopeId; 
  //   bytes32[] groups;
  // }

  // struct ScopeUpdateGroupLimitRequest {
  //   bytes32 scopeId;
  //   bytes8 groupLimit;
  // }

}