// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "../proxy/BaseUUPSStorage.sol";
import "./IAclCommons.sol";

/**
 * @title Abstract Access Control Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract AccessControlStorage is BaseUUPSStorage, IAclCommons {

  struct ACLMData {
    
    mapping(bytes32 => BaseAgent) agents;
    mapping(bytes32 => BaseScope) scopes;

    // mapping(bytes32 => Member) members;
    // mapping(bytes32 => Role) roles;
    // mapping(bytes32 => RType) rtypes;
    // mapping(bytes32 => Group) groups;
    // mapping(bytes32 => Function) functions;
    // mapping(bytes32 => Context) contexts;
    // mapping(bytes32 => Realm) realms;
    Global global;
    GeneralLimitation defaultLimitations;
  }

  ACLMData internal _data;

  // Note: for next upgrade add new variables after this line
}
