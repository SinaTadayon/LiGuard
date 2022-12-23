// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../proxy/BaseUUPSStorage.sol";
import "./IACLCommons.sol";
import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Abstract Access Control List Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract ACLStorage is BaseUUPSStorage, IACLCommons {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  
  bytes32 public constant TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

  bytes32 public constant CTX_MESSAGE_TYPEHASH =
    keccak256("Context(address contractId,string name,string version,string realm)");

  bytes32 public constant PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("PredictContext(address deployer,address subject,string realm)");

  bytes32 public constant FUNCTION_MESSAGE_TYPEHASH = keccak256("Function(address contractId,bytes4 selector)");

  // General Types ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID = keccak256("LIVELY_VERSE_LIVELY_MASTER TYPE");
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID = keccak256("LIVELY_VERSE_SYSTEM_MASTER_TYPE");
  bytes32 internal constant _LIVELY_VERSE_ANONYMOUSE_TYPE_ID    = keccak256("LIVELY_VERSE_ANONYMOUSE_TYPE");
  bytes32 internal constant _LIVELY_VERSE_ANY_TYPE_ID           = keccak256("LIVELY_VERSE_ANY_TYPE");
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID  = keccak256("LIVELY_VERSE_SCOPE_MASTER_TYPE");
  bytes32 internal constant _LIVELY_VERSE_AGENT_MASTER_TYPE_ID  = keccak256("LIVELY_VERSE_AGENT_MASTER_TYPE");
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_TYPE_ID = keccak256("LIVELY_VERSE_POLICY_MASTER_TYPE");

  // General Roles ID 
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID = keccak256("LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE");
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID = keccak256("LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE");
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID  = keccak256("LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE");
  bytes32 internal constant _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID  = keccak256("LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE");
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID = keccak256("LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE");

  // Global Scope ID
  bytes32 internal constant _LIVELY_VERSE_GLOBAL_SCOPE_ID = keccak256("LIVELY_VERSE_GLOBAL_SCOPE_ID");

  struct DataCollection {    
    mapping(bytes32 => BaseAgent) agents;
    mapping(bytes32 => BaseScope) scopes;
    mapping(bytes32 => PolicyEntity) policies;
    mapping(bytes32 => bytes32) rolePolicyMap;
    mapping(bytes4 => address) selectors;           // function selector to facet address
    mapping(bytes4 => address) interfaces;          // function facet address to interface
    LEnumerableSet.AddressSet facets;
    GlobalEntity global;
    // GeneralLimitation defaultLimitations;
  }

  bool internal _firstInit;
  DataCollection internal _data;

  // Note: for next upgrade add new variables after this line
}
