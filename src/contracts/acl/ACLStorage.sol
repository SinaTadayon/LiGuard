// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IACLCommons.sol";
import "../proxy/BaseUUPSStorage.sol";
import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Abstract Access Control List Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract ACLStorage is BaseUUPSStorage, IACLCommons {
  using LEnumerableSet for LEnumerableSet.AddressSet;

  struct DataCollection {    
    mapping(bytes32 => BaseAgent) agents;
    mapping(bytes32 => BaseScope) scopes;
    mapping(bytes32 => PolicyEntity) policies;
    mapping(bytes32 => bytes32) rolePolicyMap;
    mapping(bytes4 => address) selectors;           
    mapping(address => FacetEntity) facets;     
    LEnumerableSet.AddressSet facetSet;    
  }


  bytes32 public constant TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

  bytes32 public constant CTX_MESSAGE_TYPEHASH =
    keccak256("Context(address contractId,string name,string version,string realm)");

  bytes32 public constant PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("PredictContext(address deployer,address subject,string realm)");

  // General Types ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_LIVELY_MASTER_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_SYSTEM_MASTER_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_ANONYMOUS_TYPE_ID     = keccak256(abi.encodePacked("LIVELY_VERSE_ANONYMOUS_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_ANY_TYPE_ID           = keccak256(abi.encodePacked("LIVELY_VERSE_ANY_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID  = keccak256(abi.encodePacked("LIVELY_VERSE_SCOPE_MASTER_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_AGENT_MASTER_TYPE_ID  = keccak256(abi.encodePacked("LIVELY_VERSE_AGENT_MASTER_TYPE"));
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_TYPE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_POLICY_MASTER_TYPE"));

  // General Roles ID 
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE"));
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE"));
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE"));
  bytes32 internal constant _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE"));
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE"));

  // Global Scope ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID = keccak256(abi.encodePacked("LIVELY_VERSE_LIVELY_GLOBAL_SCOPE"));

  bool internal _firstInit;
  DataCollection internal _data;
  // Note: for next upgrade add new variables after this line
}
