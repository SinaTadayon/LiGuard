// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../acl/IACL.sol";
import "../../acl/profile/IProfileACL.sol";

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
    else revert("Unknown ERR");
  }

  function generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus status) internal pure {
    if(status == IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED) revert IProfileACL.ProfileUnauthorized();
    else if(status == IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN) revert IProfileACL.ProfilePolicyForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.CALL_FORBIDDEN) revert IProfileACL.ProfileCallForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND) revert IProfileACL.ProfileMemberNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND) revert IProfileACL.ProfileRoleNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND) revert IProfileACL.ProfileTypeNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.FUNCTION_NOT_FOUND) revert IProfileACL.ProfileFunctionNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.CONTEXT_NOT_FOUND) revert IProfileACL.ProfileContextNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.REALM_NOT_FOUND)  revert IProfileACL.ProfileRealmNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.DOMAIN_NOT_FOUND) revert IProfileACL.ProfileDomainNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileMemberActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileRoleActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileTypeActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileFunctionActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileContextActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN)  revert IProfileACL.ProfileRealmActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileDomainActivityForbidden();
    else revert("Unknown ERR");
  }
}
