// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAclCommons { 
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
    SAFE_MODE,
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
    GLOBAL
  }

  enum ActionType {
    ADD,
    UPDATE,
    REMOVE
    // INCREASE,
    // DECREASE
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
    uint16 referredByScope;
    uint16 referredByPolicy;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;    
  }

  struct BaseScope {
    bytes32 adminId;
    uint16 agentlimit;
    uint16 referredByAgent;
    uint16 referredByPolicy;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  struct PolicyEntity {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    uint32 roleLimit;
    uint8 policyCode;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    PolicyType ptype;    
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
    uint32 factoryLimit;
    uint32 factoryTotal;
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
    uint16 realmLimit;
    string name;
    LEnumerableSet.Bytes32Set realms;
  }

  struct GlobalEntity {
    BaseScope bs;
    bytes32 id;
    uint16 domainLimit;
    LEnumerableSet.Bytes32Set domains;
  }

  struct MemberEntity {
    BaseAgent ba;
    address account;
    uint16 typeLimit;
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
    bytes32 scopeId;
    string name;
    uint32 memberTotal;
    uint32 memberLimit;
    uint8 roleLimit;
    mapping(bytes32 => bytes32) members;
    LEnumerableSet.Bytes32Set roles;
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

  struct UpdateReferredByRequest {
    bytes32 id;
    bytes32 entityId;
    ActionType action;
  }

  // Agent Requests
  struct AgentUpdateScopeRequest { 
    bytes32 agentId;
    bytes32 scopeId;
  }

  // Scope Requests
  struct ScopeUpdateAgentLimitRequest {
    bytes32 scopeId; 
    uint16 agentLimit;
  }


  event AgentReferredByScopeUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed scopeId, uint16 total, AgentType atype, ActionType action);
  event AgentReferredByPolicyUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed policyId, uint16 total, AgentType atype, ActionType action);

  event ScopeReferredByAgentUpdated(address indexed sender, bytes32 indexed scopeId, bytes32 indexed agentId, uint16 total, ScopeType stype, ActionType action);
  event ScopeReferredByPolicyUpdated(address indexed sender, bytes32 indexed scopeId, bytes32 indexed policyId, uint16 total, ScopeType stype, ActionType action);
}