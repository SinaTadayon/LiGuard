// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../proxy/IProxy.sol";
import "../../acl/IACL.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/profile/IProfileACL.sol";
import "../../acl/ACLStorage.sol";
import "../cryptography/LECDSA.sol";

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

  
  function getMemeberSignerAddress(IACLCommons.MemberSignature calldata memberSign, bytes32 msgTypeHash) internal view returns (address) {
    return getSignerAddress(memberSign.signature, _generateMemberSignMsgHash(msgTypeHash, memberSign.account, memberSign.expiredAt));
  }

  function getProfileMemeberSignerAddress(IACLCommons.ProfileMemberSignature calldata memberSign, bytes32 msgTypeHash) internal view returns (address) {
    return getSignerAddress(memberSign.signature, _generateProfileMemberSignMsgHash(msgTypeHash, generateId(memberSign.profileName), memberSign.account, memberSign.expiredAt));
  }
  
  function _hashTypedDataV4(bytes32 structHash) private view returns (bytes32) {
    return LECDSA.toTypedDataHash(IProxy(address(this)).domainSeparator(), structHash);
  }

  function _generateMemberSignMsgHash(bytes32 msgTypeHash, address account, uint256 expiredAt) private pure returns (bytes32) {
    return keccak256(abi.encode(msgTypeHash, account, expiredAt));
  }

  function _generateProfileMemberSignMsgHash(bytes32 msgTypeHash, bytes32 profileName, address account, uint256 expiredAt) private pure returns (bytes32) {
    return keccak256(abi.encode(msgTypeHash, profileName, account, expiredAt));
  }

  function getSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }


  function generateAuthorizationError(IACL.AuthorizationStatus status) internal pure {
    if(status == IACL.AuthorizationStatus.UNAUTHORIZED) revert IACL.ACLUnauthorized();
    else if(status == IACL.AuthorizationStatus.POLICY_FORBIDDEN) revert IACL.ACLPolicyForbidden();
    else if(status == IACL.AuthorizationStatus.CALL_FORBIDDEN) revert IACL.ACLCallForbidden();
    else if(status == IACL.AuthorizationStatus.ROLE_SCOPE_FORBIDDEN) revert IACL.ACLRoleScopeForbidden();
    else if(status == IACL.AuthorizationStatus.MEMBER_NOT_FOUND) revert IACL.ACLMemberNotFound();
    else if(status == IACL.AuthorizationStatus.ROLE_NOT_FOUND) revert IACL.ACLRoleNotFound();
    else if(status == IACL.AuthorizationStatus.TYPE_NOT_FOUND) revert IACL.ACLTypeNotFound();
    else if(status == IACL.AuthorizationStatus.FUNCTION_NOT_FOUND) revert IACL.ACLFunctionNotFound();
    else if(status == IACL.AuthorizationStatus.CONTEXT_NOT_FOUND) revert IACL.ACLContextNotFound();
    else if(status == IACL.AuthorizationStatus.REALM_NOT_FOUND)  revert IACL.ACLRealmNotFound();
    else if(status == IACL.AuthorizationStatus.DOMAIN_NOT_FOUND) revert IACL.ACLDomainNotFound();
    else if(status == IACL.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN) revert IACL.ACLMemberActivityForbidden();
    else if(status == IACL.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN) revert IACL.ACLRoleActivityForbidden();
    else if(status == IACL.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN) revert IACL.ACLTypeActivityForbidden();
    else if(status == IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN) revert IACL.ACLFunctionActivityForbidden();
    else if(status == IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN) revert IACL.ACLContextActivityForbidden();
    else if(status == IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN)  revert IACL.ACLRealmActivityForbidden();
    else if(status == IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN) revert IACL.ACLDomainActivityForbidden();
    else if(status == IACL.AuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN) revert IACL.ACLUniverseActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus status) internal pure {
    if(status == IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED) revert IProfileACL.ProfileACLUnauthorized();
    else if(status == IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN) revert IProfileACL.ProfileACLPolicyForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN) revert IProfileACL.ProfileACLCallForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN) revert IProfileACL.ProfileACLMemberCallForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN) revert IProfileACL.ProfileACLRoleScopeForbidden();    
    else if(status == IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND) revert IProfileACL.ProfileACLMemberNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND) revert IProfileACL.ProfileACLRoleNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND) revert IProfileACL.ProfileACLTypeNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.FUNCTION_NOT_FOUND) revert IProfileACL.ProfileACLFunctionNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.CONTEXT_NOT_FOUND) revert IProfileACL.ProfileACLContextNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.REALM_NOT_FOUND)  revert IProfileACL.ProfileACLRealmNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.DOMAIN_NOT_FOUND) revert IProfileACL.ProfileACLDomainNotFound();
    else if(status == IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLMemberActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLRoleActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLTypeActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLFunctionActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLContextActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN)  revert IProfileACL.ProfileACLRealmActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLDomainActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLUniverseActivityForbidden();
    else if(status == IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileACLProfileActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateProfileAdminAccessError(IProfileACL.ProfileAdminAccessStatus status) internal pure {
    if(status == IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED) revert IProfileACL.ProfileAdminAccessNotPermitted();
    else if(status == IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN) revert IProfileACL.ProfileAdminAccessPolicyForbidden();
    else if(status == IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND) revert IProfileACL.ProfileAdminAccessRoleNotFound();
    else if(status == IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND) revert IProfileACL.ProfileAdminAccessTypeNotFound();
    else if(status == IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND) revert IProfileACL.ProfileAdminAccessFunctionNotFound();
    else if(status == IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileAdminAccessRoleActivityForbidden();
    else if(status == IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN) revert IProfileACL.ProfileAdminAccessTypeActivityForbidden();
    else revert("Unknown ERR");
  }

  function generateAdminAccessError(IACL.AdminAccessStatus status) internal pure {
    if(status == IACL.AdminAccessStatus.NOT_PERMITTED) revert IACL.AdminAccessNotPermitted();
    else if(status == IACL.AdminAccessStatus.POLICY_FORBIDDEN) revert IACL.AdminAccessPolicyForbidden();
    else if(status == IACL.AdminAccessStatus.ROLE_NOT_FOUND) revert IACL.AdminAccessRoleNotFound();
    else if(status == IACL.AdminAccessStatus.TYPE_NOT_FOUND) revert IACL.AdminAccessTypeNotFound();
    else if(status == IACL.AdminAccessStatus.FUNCTION_NOT_FOUND) revert IACL.AdminAccessFunctionNotFound();
    else if(status == IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN) revert IACL.AdminAccessRoleActivityForbidden();
    else if(status == IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN) revert IACL.AdminAccessTypeActivityForbidden();
    else revert("Unknown ERR");
  }
}
