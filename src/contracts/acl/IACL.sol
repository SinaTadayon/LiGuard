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
    ROLE_SCOPE_FORBIDDEN,
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
    DOMAIN_ACTIVITY_FORBIDDEN,
    UNIVERSE_ACTIVITY_FORBIDDEN
  }

  error ACLUnauthorized();
  error ACLPolicyForbidden();
  error ACLCallForbidden();
  error ACLRoleScopeForbidden();
  error ACLMemberNotFound();
  error ACLRoleNotFound();
  error ACLTypeNotFound();
  error ACLFunctionNotFound();
  error ACLContextNotFound();
  error ACLRealmNotFound();
  error ACLDomainNotFound();
  error ACLMemberActivityForbidden();
  error ACLRoleActivityForbidden();
  error ACLTypeActivityForbidden();
  error ACLFunctionActivityForbidden();
  error ACLContextActivityForbidden();
  error ACLRealmActivityForbidden();
  error ACLDomainActivityForbidden();
  error ACLUniverseActivityForbidden();

  error ACLActionForbidden(AuthorizationStatus);

  enum AdminAccessStatus {
    PERMITTED,
    NOT_PERMITTED,
    POLICY_FORBIDDEN,
    ROLE_NOT_FOUND,
    TYPE_NOT_FOUND,
    FUNCTION_NOT_FOUND,
    ROLE_ACTIVITY_FORBIDDEN,
    TYPE_ACTIVITY_FORBIDDEN
  }

  error AdminAccessNotPermitted();
  error AdminAccessPolicyForbidden();
  error AdminAccessRoleNotFound();
  error AdminAccessTypeNotFound();
  error AdminAccessFunctionNotFound();
  error AdminAccessRoleActivityForbidden();
  error AdminAccessTypeActivityForbidden();

  error SetAdminForbidden(AdminAccessStatus);

  function hasAccess(bytes32 functionId) external returns (AuthorizationStatus);

  function hasMemberAccess(bytes32 functionId, bytes32 memberId) external returns (AuthorizationStatus);

  function hasCSAccess(address contractId, bytes4 selector) external returns (AuthorizationStatus);

  function hasAccountAccess(
    address contractId,
    bytes4 selector,
    address accountId
  ) external returns (AuthorizationStatus);
}
