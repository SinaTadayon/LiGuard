// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../../../proxy/IProxy.sol";
import "../IACLTest.sol";
import "../IACLCommonsTest.sol";
import "../profile/IProfileACLTest.sol";
import "../ACLStorageTest.sol";
import "../../../../lib/cryptography/LECDSA.sol";

/**
 * @title Context Utils Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLUtilsTest {
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

  function getMemeberSignerAddress(IACLCommonsTest.MemberSignature calldata memberSign, bytes32 msgTypeHash)
    internal
    view
    returns (address)
  {
    return
      getSignerAddress(
        memberSign.signature,
        _generateMemberSignMsgHash(msgTypeHash, memberSign.account, memberSign.expiredAt)
      );
  }

  function getProfileMemeberSignerAddress(IACLCommonsTest.ProfileMemberSignature calldata memberSign, bytes32 msgTypeHash)
    internal
    view
    returns (address)
  {
    return
      getSignerAddress(
        memberSign.signature,
        _generateProfileMemberSignMsgHash(
          msgTypeHash,
          generateId(memberSign.profileName),
          memberSign.account,
          memberSign.expiredAt
        )
      );
  }

  function _hashTypedDataV4(bytes32 structHash) private view returns (bytes32) {
    return LECDSA.toTypedDataHash(IProxy(address(this)).domainSeparator(), structHash);
  }

  function _generateMemberSignMsgHash(
    bytes32 msgTypeHash,
    address account,
    uint256 expiredAt
  ) private pure returns (bytes32) {
    return keccak256(abi.encode(msgTypeHash, account, expiredAt));
  }

  function _generateProfileMemberSignMsgHash(
    bytes32 msgTypeHash,
    bytes32 profileName,
    address account,
    uint256 expiredAt
  ) private pure returns (bytes32) {
    return keccak256(abi.encode(msgTypeHash, profileName, account, expiredAt));
  }

  function getSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function generateAuthorizationError(IACLTest.AuthorizationStatus status) internal pure {
    if (status == IACLTest.AuthorizationStatus.UNAUTHORIZED) revert IACLTest.ACLUnauthorized();
    else if (status == IACLTest.AuthorizationStatus.POLICY_FORBIDDEN) revert IACLTest.ACLPolicyForbidden();
    else if (status == IACLTest.AuthorizationStatus.CALL_FORBIDDEN) revert IACLTest.ACLCallForbidden();
    else if (status == IACLTest.AuthorizationStatus.ROLE_SCOPE_FORBIDDEN) revert IACLTest.ACLRoleScopeForbidden();
    else if (status == IACLTest.AuthorizationStatus.MEMBER_NOT_FOUND) revert IACLTest.ACLMemberNotFound();
    else if (status == IACLTest.AuthorizationStatus.ROLE_NOT_FOUND) revert IACLTest.ACLRoleNotFound();
    else if (status == IACLTest.AuthorizationStatus.TYPE_NOT_FOUND) revert IACLTest.ACLTypeNotFound();
    else if (status == IACLTest.AuthorizationStatus.FUNCTION_NOT_FOUND) revert IACLTest.ACLFunctionNotFound();
    else if (status == IACLTest.AuthorizationStatus.CONTEXT_NOT_FOUND) revert IACLTest.ACLContextNotFound();
    else if (status == IACLTest.AuthorizationStatus.REALM_NOT_FOUND) revert IACLTest.ACLRealmNotFound();
    else if (status == IACLTest.AuthorizationStatus.DOMAIN_NOT_FOUND) revert IACLTest.ACLDomainNotFound();
    else if (status == IACLTest.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN) revert IACLTest.ACLMemberActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN) revert IACLTest.ACLRoleActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN) revert IACLTest.ACLTypeActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN) revert IACLTest.ACLFunctionActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN) revert IACLTest.ACLContextActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN) revert IACLTest.ACLRealmActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN) revert IACLTest.ACLDomainActivityForbidden();
    else if (status == IACLTest.AuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN) revert IACLTest.ACLUniverseActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateProfileAuthorizationError(IProfileACLTest.ProfileAuthorizationStatus status) internal pure {
    if (status == IProfileACLTest.ProfileAuthorizationStatus.UNAUTHORIZED) revert IProfileACLTest.ProfileACLUnauthorized();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.POLICY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLPolicyForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN)
      revert IProfileACLTest.ProfileACLCallForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN)
      revert IProfileACLTest.ProfileACLMemberCallForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN)
      revert IProfileACLTest.ProfileACLRoleScopeForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.MEMBER_NOT_FOUND)
      revert IProfileACLTest.ProfileACLMemberNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.ROLE_NOT_FOUND)
      revert IProfileACLTest.ProfileACLRoleNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.TYPE_NOT_FOUND)
      revert IProfileACLTest.ProfileACLTypeNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.FUNCTION_NOT_FOUND)
      revert IProfileACLTest.ProfileACLFunctionNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.CONTEXT_NOT_FOUND)
      revert IProfileACLTest.ProfileACLContextNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.REALM_NOT_FOUND)
      revert IProfileACLTest.ProfileACLRealmNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.DOMAIN_NOT_FOUND)
      revert IProfileACLTest.ProfileACLDomainNotFound();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLMemberActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLRoleActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLTypeActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLFunctionActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLContextActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLRealmActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLDomainActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLUniverseActivityForbidden();
    else if (status == IProfileACLTest.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileACLProfileActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateProfileAdminAccessError(IProfileACLTest.ProfileAdminAccessStatus status) internal pure {
    if (status == IProfileACLTest.ProfileAdminAccessStatus.NOT_PERMITTED)
      revert IProfileACLTest.ProfileAdminAccessNotPermitted();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.POLICY_FORBIDDEN)
      revert IProfileACLTest.ProfileAdminAccessPolicyForbidden();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.ROLE_NOT_FOUND)
      revert IProfileACLTest.ProfileAdminAccessRoleNotFound();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.TYPE_NOT_FOUND)
      revert IProfileACLTest.ProfileAdminAccessTypeNotFound();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND)
      revert IProfileACLTest.ProfileAdminAccessFunctionNotFound();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileAdminAccessRoleActivityForbidden();
    else if (status == IProfileACLTest.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN)
      revert IProfileACLTest.ProfileAdminAccessTypeActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateAdminAccessError(IACLTest.AdminAccessStatus status) internal pure {
    if (status == IACLTest.AdminAccessStatus.NOT_PERMITTED) revert IACLTest.AdminAccessNotPermitted();
    else if (status == IACLTest.AdminAccessStatus.POLICY_FORBIDDEN) revert IACLTest.AdminAccessPolicyForbidden();
    else if (status == IACLTest.AdminAccessStatus.ROLE_NOT_FOUND) revert IACLTest.AdminAccessRoleNotFound();
    else if (status == IACLTest.AdminAccessStatus.TYPE_NOT_FOUND) revert IACLTest.AdminAccessTypeNotFound();
    else if (status == IACLTest.AdminAccessStatus.FUNCTION_NOT_FOUND) revert IACLTest.AdminAccessFunctionNotFound();
    else if (status == IACLTest.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN) revert IACLTest.AdminAccessRoleActivityForbidden();
    else if (status == IACLTest.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN) revert IACLTest.AdminAccessTypeActivityForbidden();
    else revert("Unknown ERR");
  }
}
