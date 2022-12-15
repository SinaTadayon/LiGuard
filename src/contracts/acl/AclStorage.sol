// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../proxy/BaseUUPSStorage.sol";
import "./IAclCommons.sol";
import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Abstract Access Control List Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract AclStorage is BaseUUPSStorage, IAclCommons {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  
  bytes32 public constant TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

  bytes32 public constant CTX_MESSAGE_TYPEHASH =
    keccak256("Context(address contractId,string name,string version,string realm)");

  bytes32 public constant PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("PredictContext(address deployer,address subject,string realm)");



  struct DataCollection {    
    mapping(bytes32 => BaseAgent) agents;
    mapping(bytes32 => BaseScope) scopes;
    mapping(bytes32 => PolicyEntity) policies;
    mapping(bytes32 => bytes32) rolePolicyMap;
    mapping(bytes4 => address) selectors;           // function selector to facet address
    mapping(bytes4 => address) interfaces;           // function interface to facet address
    LEnumerableSet.AddressSet facets;
    GlobalEntity global;
    // GeneralLimitation defaultLimitations;
  }

  bool internal _firstInit;
  DataCollection internal _data;

  // Note: for next upgrade add new variables after this line
}
