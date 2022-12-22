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
    uint16 referredByScope;
    uint16 referredByPolicy;
    uint16 scopeLimit;
  }

  struct BaseScope {
    bytes32 adminId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint16 referredByAgent;
    uint16 referredByPolicy;    
    uint16 agentLimit;
  }

  struct PolicyEntity {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    uint32 roleLimit;
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
    uint32 factoryLimit;
    uint32 factoryTotal;
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
    uint16 roleLimit;
    mapping(bytes32 => bytes32) members;
    LEnumerableSet.Bytes32Set roles;
  }

  // Request Types
  struct FacetSelectorUpgradeRequest {
    ActionType action;
    bytes4[] selectors;
  }

  struct FacetUpgradeRequest {
    address facetId;
    bytes4 interfaceId;
    bytes4 newInterfaceId;
    FacetSelectorUpgradeRequest[] functions;
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

  // struct UpdateReferredByRequest {
  //   bytes32 id;
  //   bytes32 entityId;
  //   ActionType action;
  // }

  // Agent Requests
  struct AgentUpdateScopeLimitRequest { 
    bytes32 agentId;
    uint16 scopeLimit;
  }

  // Scope Requests
  struct ScopeUpdateAgentLimitRequest {
    bytes32 scopeId; 
    uint16 agentLimit;
  }


  event AgentReferredByScopeUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed scopeId, ActionType action);
  event AgentReferredByPolicyUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed policyId, ActionType action);

  event ScopeReferredByAgentUpdated(address indexed sender, bytes32 indexed scopeId, bytes32 indexed agentId, ActionType action);
  event ScopeReferredByPolicyUpdated(address indexed sender, bytes32 indexed scopeId, bytes32 indexed policyId, ActionType action);
}