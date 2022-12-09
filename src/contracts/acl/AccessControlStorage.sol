// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../proxy/BaseUUPSStorage.sol";
import "./IAclCommons.sol";
import "../lib/struct/LEnumerableSet.sol";

/**
 * @title Abstract Access Control Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract AccessControlStorage is BaseUUPSStorage, IAclCommons {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  
  struct ACLMData {    
    mapping(bytes32 => BaseAgent) agents;
    mapping(bytes32 => BaseScope) scopes;
    mapping(bytes32 => Policy) policies;
    mapping(bytes32 => bytes32) rolePolicyMap;
    
    // function selector to facet index
    mapping(bytes4 => uint8) selectors;
    Facet[] facets;
    Global global;
    GeneralLimitation defaultLimitations;
  }

  ACLMData internal _data;

  // Note: for next upgrade add new variables after this line
}
