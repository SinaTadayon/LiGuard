// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileACL {

  enum ProfileAuthorizationStatus {
    PERMITTED,
    UNAUTHORIZED,
    POLICY_FORBIDDEN,
    CALL_FORBIDDEN,
    MEMBER_NOT_FOUND,
    ROLE_NOT_FOUND,
    TYPE_NOT_FOUND,
    FUNCTION_NOT_FOUND,
    CONTEXT_NOT_FOUND,
    REALM_NOT_FOUND,
    DOMAIN_NOT_FOUND,
    MEMBER_ACTIVITY_FORBIDDEN,    
    ROLE_ACTIVITY_FORBIDDEN,
    TYPE_ACTIVITY_FORBIDDEN,    
    FUNCTION_ACTIVITY_FORBIDDEN,
    CONTEXT_ACTIVITY_FORBIDDEN,    
    REALM_ACTIVITY_FORBIDDEN,
    DOMAIN_ACTIVITY_FORBIDDEN
  }

  error ProfileUnauthorized();
  error ProfilePolicyForbidden();
  error ProfileCallForbidden();
  error ProfileMemberNotFound();
  error ProfileRoleNotFound();
  error ProfileTypeNotFound();
  error ProfileFunctionNotFound();
  error ProfileContextNotFound();
  error ProfileRealmNotFound();
  error ProfileDomainNotFound();
  error ProfileMemberActivityForbidden();
  error ProfileRoleActivityForbidden();
  error ProfileTypeActivityForbidden();
  error ProfileFunctionActivityForbidden();
  error ProfileContextActivityForbidden();
  error ProfileRealmActivityForbidden();
  error ProfileDomainActivityForbidden();


  function profileHasAccess(bytes32 profileId, bytes32 functionId) external returns (ProfileAuthorizationStatus);

  function profileHasMemberAccess(bytes32 profileId, bytes32 functionId, bytes32 memberId) external returns (ProfileAuthorizationStatus);

  function profileHasCSAccess(bytes32 profileId, address contractId, bytes4 selector) external returns (ProfileAuthorizationStatus);

  function profileHasAccountAccess(bytes32 profileId, address contractId, bytes4 selector, address accountId) external returns (ProfileAuthorizationStatus);
}