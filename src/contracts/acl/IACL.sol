// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IACL {

  enum AuthorizationStatus {
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

  error Unauthorized();
  error PolicyForbidden();
  error CallForbidden();
  error MemberNotFound();
  error RoleNotFound();
  error TypeNotFound();
  error FunctionNotFound();
  error ContextNotFound();
  error RealmNotFound();
  error DomainNotFound();
  error MemberActivityForbidden();
  error RoleActivityForbidden();
  error TypeActivityForbidden();
  error FunctionActivityForbidden();
  error ContextActivityForbidden();
  error RealmActivityForbidden();
  error DomainActivityForbidden();


  function hasAccess(bytes32 functionId) external returns (AuthorizationStatus);

  function hasMemberAccess(bytes32 functionId, bytes32 memberId) external returns (AuthorizationStatus);

  function hasCSAccess(address contractId, bytes4 selector) external returns (AuthorizationStatus);
  
  function hasAccountAccess(address contractId, bytes4 selector, address accountId) external returns (AuthorizationStatus);

}