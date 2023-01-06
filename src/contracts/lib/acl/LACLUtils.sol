// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../acl/IACL.sol";

/**
 * @title Context Utils Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLUtils {

  function functionGenerateId(address contractId, bytes4 selector) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(contractId, selector));
  }

  function accountGenerateId(address account) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(account));
  }

  function generateId(string calldata name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }

  function generateId2(string memory name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }


  function generateHash(string memory name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }

  function generateAuthorizationError(IACL.AuthorizationStatus status) internal pure {
    if(status == IACL.AuthorizationStatus.UNAUTHORIZED) revert IACL.Unauthorized();
    else if(status == IACL.AuthorizationStatus.POLICY_FORBIDDEN) revert IACL.PolicyForbidden();
    else if(status == IACL.AuthorizationStatus.CALL_FORBIDDEN) revert IACL.CallForbidden();
    else if(status == IACL.AuthorizationStatus.MEMBER_NOT_FOUND) revert IACL.MemberNotFound();
    else if(status == IACL.AuthorizationStatus.ROLE_NOT_FOUND) revert IACL.RoleNotFound();
    else if(status == IACL.AuthorizationStatus.TYPE_NOT_FOUND) revert IACL.TypeNotFound();
    else if(status == IACL.AuthorizationStatus.FUNCTION_NOT_FOUND) revert IACL.FunctionNotFound();
    else if(status == IACL.AuthorizationStatus.CONTEXT_NOT_FOUND) revert IACL.ContextNotFound();
    else if(status == IACL.AuthorizationStatus.REALM_NOT_FOUND)  revert IACL.RealmNotFound();
    else if(status == IACL.AuthorizationStatus.DOMAIN_NOT_FOUND) revert IACL.DomainNotFound();
    else if(status == IACL.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN) revert IACL.MemberActivityForbidden();
    else if(status == IACL.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN) revert IACL.RoleActivityForbidden();
    else if(status == IACL.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN) revert IACL.TypeActivityForbidden();
    else if(status == IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN) revert IACL.FunctionActivityForbidden();
    else if(status == IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN) revert IACL.ContextActivityForbidden();
    else if(status == IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN)  revert IACL.RealmActivityForbidden();
    else if(status == IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN) revert IACL.DomainActivityForbidden();
  }
}
