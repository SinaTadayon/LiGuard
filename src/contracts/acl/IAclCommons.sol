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
    TYPE,
    GROUP
  }

  enum ActivityStatus {
    DISABLE,
    ENABLE,
    SAFE_MODE
  }

  enum AlterabilityStatus {
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
    uint8 policyCode;
  }

  struct Policy {
    string name;
    uint8 code;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    PolicyType ptype;
  }

  struct AgentLimit {
    uint24 memberLimit;
    uint8 roleLimit;
    uint8 typeLimit;
    uint8 groupLimit;      
  }

  struct GeneralLimitation {
    AgentLimit agentLimit; 
    uint16 functionLimit;
    uint16 contextLimit;
    uint16 realmLimit;
    uint8 domainLimit;
    uint8 nameLenLimit;
  }

  struct Function {
    BaseScope baseScope;
    bytes32 functionId;
    bytes32 contextId;
    bytes4 selector;
  }
 
  struct Context {
    BaseScope baseScope;
    AgentLimit agentLimits;
    uint16 functionLimit;
    bytes32 realmId;    
    address contractId;    
    LEnumerableSet.Bytes32Set functions;
    LEnumerableSet.Bytes32Set groups;
  }

  struct Realm {
    BaseScope baseScope;
    AgentLimit agentLimits;
    uint16 contextLimit;
    bytes32 domainId;
    string name;
    LEnumerableSet.Bytes32Set contexts;
    LEnumerableSet.Bytes32Set groups;
  }

  struct Domain {
    BaseScope baseScope;
    AgentLimit limits;
    uint16 realmLimit;
    string name;
    LEnumerableSet.Bytes32Set realms;
    LEnumerableSet.Bytes32Set groups;
  }

  struct Global {
    BaseScope baseScope;  
    uint16 domainLimit;    
    LEnumerableSet.Bytes32Set domains;
    LEnumerableSet.Bytes32Set agents;
  }

  struct Member {
    BaseAgent agent;
    uint8 roleLimit;
    address account;
    LEnumerableSet.Bytes32Set roles;
  }

  struct Role {
    BaseAgent agent;
    bytes32 adminId;
    bytes32 scopeId;
    bytes32 policyId;
    uint24 memberLimit;
    uint8 typeLimit;
    string name;
    LEnumerableSet.Bytes32Set members;
    LEnumerableSet.Bytes32Set types;
  }

  struct Type {
    BaseAgent agent;
    uint8 roleLimit;
    bytes32 scopeId;
    bytes32 groupId;
    string name;
    LEnumerableSet.Bytes32Set roles;
  }

  struct Group {
    BaseAgent agent;
    uint8 typeLimit;
    bytes32 scopeId;
    string name;
    LEnumerableSet.Bytes32Set types;
  }
}