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
    mapping(bytes32 => ProfileEntity) profiles;
    mapping(address => ProfileAccount) profileAccounts;
    mapping(bytes4 => address) selectors;
    mapping(address => FacetEntity) facets;     
    LEnumerableSet.AddressSet facetSet;    
  }

  bytes32 public constant CTX_MESSAGE_TYPEHASH =
    keccak256("Context(address contractId,string name,string version,string realm)");

  bytes32 public constant PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("PredictContext(address deployer,address subject,string realm)");

  bytes32 public constant MEMBER_SIGNATURE_MESSAGE_TYPEHASH = 
    keccak256("MemberSignature(address account,uint256 expiredAt)");

  bytes32 public constant PROFILE_CTX_MESSAGE_TYPEHASH =
    keccak256("ProfileContext(string profile,address contractId,string name,string version,string realm)");

  bytes32 public constant PROFILE_PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("ProfilePredictContext(string profile,address deployer,address subject,string realm)");

  // bytes32 public constant PROFILE_REGISTER_MESSAGE_TYPEHASH =
  //   keccak256("ProfileRegister(string name,address owner,uint256 expiredAt)");

  bytes32 public constant PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH = 
    keccak256("ProfileMemberSignature(string profile,address account,uint256 expiredAt)");
  

  // General Types ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_ANONYMOUS_TYPE_ID             = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 internal constant _LIVELY_VERSE_ANY_TYPE_ID                   = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID          = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_MEMBER_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_TYPE_MASTER_TYPE_ID           = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER"));
  bytes32 internal constant _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID        = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER"));

  // Universe Scope ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID        = keccak256(abi.encodePacked("UNIVERSE.LIVELY_VERSE"));

  // General Profile Type
  bytes32 internal constant _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 internal constant _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 internal constant _LIVELY_PROFILE_ANY_TYPE_ID                   = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
  bytes32 internal constant _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID        = keccak256(abi.encodePacked("UNIVERSE.LIVELY_PROFILE"));

  bool internal _firstInit;
  DataCollection internal _data;
  // Note: for next upgrade add new variables after this line
}
