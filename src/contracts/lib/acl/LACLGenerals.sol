// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

/**
 * @title ACL Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLGenerals {
  string public constant LIB_NAME = "LACLGenerals";
  string public constant LIB_VERSION = "3.1.0";

  // Messsage Hash Types
   bytes32 public constant CTX_MESSAGE_TYPE_HASH =
    keccak256("Context(address contractId,string name,string version,string realm)");

  bytes32 public constant PREDICT_CTX_MESSAGE_TYPE_HASH =
    keccak256("PredictContext(address deployer,address subject,string realm)");

  bytes32 public constant MEMBER_SIGNATURE_MESSAGE_TYPE_HASH =
    keccak256("MemberSignature(address account,uint256 expiredAt)");

  bytes32 public constant PROFILE_CTX_MESSAGE_TYPE_HASH =
    keccak256("ProfileContext(string profile,address contractId,string name,string version,string realm)");

  bytes32 public constant PROFILE_PREDICT_CTX_MESSAGE_TYPE_HASH =
    keccak256("ProfilePredictContext(string profile,address deployer,address subject,string realm)");

  bytes32 public constant PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPE_HASH =
    keccak256("ProfileMemberSignature(string profile,address account,uint256 expiredAt)");


  // General Names
  string public constant LIVELY_VERSE_LIVELY_MASTER_TYPE_NAME   = "TYPE.LIVELY_VERSE.LIVELY_MASTER";
  string public constant LIVELY_VERSE_SYSTEM_MASTER_TYPE_NAME   = "TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER";
  string public constant LIVELY_VERSE_ANONYMOUS_TYPE_NAME       = "TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS";
  string public constant LIVELY_VERSE_ANY_TYPE_NAME             = "TYPE.LIVELY_VERSE.LIVELY_ANY";
  string public constant LIVELY_VERSE_SCOPE_MASTER_TYPE_NAME    = "TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER";
  string public constant LIVELY_VERSE_MEMBER_MASTER_TYPE_NAME   = "TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER";
  string public constant LIVELY_VERSE_TYPE_MASTER_TYPE_NAME     = "TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER";
  string public constant LIVELY_VERSE_POLICY_MASTER_TYPE_NAME   = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER";
  string public constant LIVELY_VERSE_PROFILE_MASTER_TYPE_NAME  = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER";

  // Universe Scope Name 
  string public constant LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_NAME = "UNIVERSE.LIVELY_VERSE";

  // General Roles Names
  string public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_NAME   = "ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN";
  string public constant LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_NAME   = "ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN";
  string public constant LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_NAME    = "ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN";
  string public constant LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_NAME     = "ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN";
  string public constant LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_NAME   = "ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN";
  string public constant LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_NAME   = "ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN";
  string public constant LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_NAME  = "ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN";

  // Profile Commons Names
  string public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_NAME       = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
  string public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_NAME       = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
  string public constant LIVELY_PROFILE_ANY_TYPE_NAME                 = "TYPE.LIVELY_PROFILE.LIVELY_ANY";
  string public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_NAME = "ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN";
  string public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_NAME = "ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN";
  string public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_NAME    = "UNIVERSE.LIVELY_PROFILE";

  // ACL Type Name
  string public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_NAME       = "TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER";
  string public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_ADMIN_ROLE_NAME = "ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN";
  string public constant LIVELY_VERSE_LIVELY_GUARD_DOMAIN_NAME            = "DOMAIN.LIVELY_VERSE.LIVELY_GUARD";
  string public constant LIVELY_VERSE_LIVELY_GUARD_REALM_NAME             = "REALM.LIVELY_VERSE.LIVELY_GUARD.ACL";


  // General IDs
  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_SYSTEM_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_ANONYMOUS_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = 
    keccak256(abi.encodePacked(LIVELY_VERSE_ANY_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_SCOPE_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_MEMBER_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_TYPE_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_POLICY_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_PROFILE_MASTER_TYPE_NAME));

  // Universe Scope ID
  bytes32 public constant LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID = 
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_NAME));

  // General Roles IDs
  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_NAME));

  // Profile Commons IDs
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_PROFILE_LIVELY_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_PROFILE_ANY_TYPE_ID = 
    keccak256(abi.encodePacked(LIVELY_PROFILE_ANY_TYPE_NAME));
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID =
    keccak256(abi.encodePacked(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_NAME));

  // ACL Type IDs
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_NAME));
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_GUARD_MASTER_ADMIN_ROLE_NAME));
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_DOMAIN_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_GUARD_DOMAIN_NAME));
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_REALM_ID =
    keccak256(abi.encodePacked(LIVELY_VERSE_LIVELY_GUARD_REALM_NAME));  
}
