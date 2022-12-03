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
  enum AccountType {
    EOA,      // external of account
    SCA       // smart contract account
  }

  enum AgentType {
    NONE,
    MEMBER,
    ROLE,
    RTYPE,
    GROUP
  }

  enum ActivityStatus {
    NONE,
    DISABLE,
    ENABLE
  }

  enum AlterabilityStatus {
    NONE,
    DISABLE,
    UPDATABLE,
    UPGRADABLE,
    ALL    
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
    // CREATE,
    UPDATE,
    REMOVE
  }

  enum SecurityPolicy {
    UNLOCK,
    SLOCK,          // soft lock
    MLOCK,          // medium lock
    RLOCK,          // restrict lock
    HLOCK,          // hard lock      
    LOCK
  }

  struct AgentLimit {
    uint16 memberLimit;
    uint16 roleLimit;
    uint16 rtypeLimit;
    uint16 groupLimit;
  }

  struct GeneralLimitation {
    bytes32 adminAgentId;
    AgentLimit agentLimit; 
    uint16 functionLimit;
    uint16 contextLimit;
    uint16 realmLimit;
    uint16 domainLimit;
    uint8 nameLenLimit;
  }

  struct Function {
    bytes32 functionId;
    bytes32 agentId;
    bytes32 contextId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType atype;
    bytes4 selector;
  }
 
  struct Context {
    bytes32 realmId;
    bytes32 adminAgentId;
    AgentLimit limits;
    uint16 functionLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType atype;
    address contractId;
    LEnumerableSet.Bytes32Set agents;
    LEnumerableSet.Bytes32Set functions;
  }

  struct Realm {
    bytes32 domainId;
    bytes32 adminAgentId;
    AgentLimit limits;
    uint16 contextLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType atype;
    string name;
    LEnumerableSet.Bytes32Set contexts;
    LEnumerableSet.Bytes32Set agents;
  }

  struct Domain {
    bytes32 adminAgentId;
    AgentLimit limits;
    uint16 realmLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType atype;
    string name;
    LEnumerableSet.Bytes32Set realms;
    LEnumerableSet.Bytes32Set agents;
  }

  struct Global {
    bytes32 adminAgentId;
    AgentLimit limits;
    uint16 domainLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType atype;
    LEnumerableSet.Bytes32Set domains;
    LEnumerableSet.Bytes32Set agents;
  }

  struct Member {
    bytes32 scopeId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 roleLimit;
    address account;
    LEnumerableSet.Bytes32Set roles;    
  }

  struct Role {
    bytes32 scopeId;
    uint24 memberLimit;
    uint8 rtypeLimit;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    SecurityPolicy policyType;
    string name;
    LEnumerableSet.Bytes32Set members;
    LEnumerableSet.Bytes32Set rtypes;
  }

  struct RType {
    bytes32 groupId;
    bytes32 scopeId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    SecurityPolicy policyType;
    uint8 roleLimit;
    string name;
    LEnumerableSet.Bytes32Set roles;
  }

  struct Group {
    bytes32 scopeId;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 rtypeLimit;
    string name;
    LEnumerableSet.Bytes32Set rtypes;
  }
}