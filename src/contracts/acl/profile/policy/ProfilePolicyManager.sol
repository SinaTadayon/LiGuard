// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfilePolicyManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../agent/IProfileRoleManagement.sol";
import "../agent/IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../../../proxy/IProxy.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileRolePolicy.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfilePolicyManager is ACLStorage, BaseUUPSProxy, IProfilePolicyManagement {
  using LACLStorage for DataCollection;
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {
    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IProfilePolicyManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by members of Policy Master type
  function profilePolicyRegister(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyRegisterRequest[] calldata requests
  ) external returns (bool) {
    (ProfileEntity storage profileEntity, , bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfilePolicyManagement.profilePolicyRegister.selector
    );

    // check profile and type limitations and update it
    LProfileRolePolicy.profileCheckMemberForPolicyRegister(profileEntity, uint16(requests.length), senderId);

    (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(profileEntity, sender);

    for (uint256 i = 0; i < requests.length; i++) {
      _doProfilePolicyRegister(requests[i], profileEntity, senderScopeType, senderScopeId, profileId, sender);
    }
    return true;
  }

  // called by policy admin
  function profilePolicyAddRoles(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyAddRolesRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyAddRoles.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].policyId,
        senderId
      );
      _doprofilePolicyAddRoles(profileEntity, policyEntity, requests[i], profileId, sender);
    }
    return true;
  }

  // called by policy admin
  function profilePolicyRemoveRoles(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyRemoveRolesRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyRemoveRoles.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].policyId,
        senderId
      );
      for (uint256 j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Not Found");
        delete profileEntity.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit ProfilePolicyRoleRemoved(sender, profileId, requests[i].policyId, requests[i].roles[j]);
      }
    }
    return true;
  }

  function profilePolicyUpdateCodes(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyUpdateCodeRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateCodes.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].policyId,
        senderId
      );
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit ProfilePolicyCodeUpdated(
        sender,
        profileId,
        requests[i].policyId,
        requests[i].policyCode,
        policyEntity.ptype
      );
    }
    return true;
  }

  function profilePolicyUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateAdmin.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );
      policyEntity.adminId = _getPolicyAdmin(
        profileEntity,
        profileEntity.scopes[policyEntity.scopeId].stype,
        profileEntity.scopes[policyEntity.scopeId].adminId,
        policyEntity.scopeId,
        requests[i].adminId,
        profileId
      );
      require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal Admin Id");
      emit ProfilePolicyAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profilePolicyUpdateScope(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateScopeRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateScope.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      LProfileRolePolicy.profilePolicyUpdateScope(profileEntity, requests[i], functionEntity, profileId, senderId);
      emit ProfilePolicyScopeUpdated(sender, profileId, requests[i].entityId, requests[i].scopeId);
    }
    return true;
  }

  function profilePolicyUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateActivityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      policyEntity.acstat = requests[i].acstat;
      emit ProfilePolicyActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profilePolicyUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateAlterabilityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      LProfileRolePolicy.profilePolicyUpdateAlterabilityStatus(profileEntity, requests[i], functionEntity, senderId);
      emit ProfilePolicyAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profilePolicyUpdateRoleLimit(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyUpdateRoleLimitRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyUpdateRoleLimit.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].policyId,
        senderId
      );
      require(requests[i].roleLimit > policyEntity.roles.length(), "Illegal Limit");
      policyEntity.roleLimit = requests[i].roleLimit;
      emit ProfilePolicyRoleLimitUpdated(sender, profileId, requests[i].policyId, requests[i].roleLimit);
    }
    return true;
  }

  function profilePolicyRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata policies) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfilePolicyManagement.profilePolicyRemove.selector);
    for (uint256 i = 0; i < policies.length; i++) {
      PolicyEntity storage policyEntity = profileEntity.policies[policies[i]];
      require(policyEntity.adminId != bytes32(0), "Not Found");
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        policyEntity.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      require(policyEntity.roles.length() == 0, "Illegal Remove");

      BaseScope storage policyScope = profileEntity.scopes[policyEntity.scopeId];
      require(policyScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        policyScope.referredByAgent -= 1;
      }

      delete policyEntity.adminId;
      delete policyEntity.scopeId;
      delete policyEntity.name;
      delete policyEntity.roleLimit;
      delete policyEntity.policyCode;
      delete policyEntity.ptype;
      delete policyEntity.acstat;
      delete policyEntity.alstat;
      delete policyEntity.roles;

      emit ProfilePolicyRemoved(sender, profileId, policies[i]);
    }
    return true;
  }

  function profilePolicyCheckId(bytes32 profileId, bytes32 policyId) external view returns (bool) {
    return _data.profiles[profileId].policies[policyId].adminId != bytes32(0);
  }

  function profilePolicyCheckName(bytes32 profileId, string calldata policyName) external view returns (bool) {
    return _data.profiles[profileId].policies[LACLUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function profilePolicyCheckAdmin(
    bytes32 profileId,
    bytes32 policyId,
    address account
  ) external view returns (bool) {
    return LProfileRolePolicy.profilePolicyCheckAdmin(_data, profileId, policyId, account);
  }

  function profilePolicyCheckAccess(
    bytes32 profileId,
    bytes32 policyId,
    bytes32 functionId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, policyId, functionId);
  }

  function profilePolicyCheckRoleAccess(
    bytes32 profileId,
    bytes32 roleId,
    bytes32 functionId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, profileEntity.rolePolicyMap[roleId], functionId);
  }

  function _doCheckAccessPolicy(
    ProfileEntity storage profileEntity,
    bytes32 policyId,
    bytes32 functionId
  ) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if (policyEntity.acstat != ActivityStatus.ENABLED) return false;
    if (policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  }

  function profilePolicyCheckRole(bytes32 profileId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].rolePolicyMap[roleId] != bytes32(0);
  }

  function profilePolicyHasRole(
    bytes32 profileId,
    bytes32 policyId,
    bytes32 roleId
  ) external view returns (bool) {
    return _data.profiles[profileId].rolePolicyMap[roleId] == policyId;
  }

  function profilePolicyGetInfoByRole(bytes32 profileId, bytes32 roleId)
    external
    view
    returns (ProfilePolicyInfo memory)
  {
    return _doPolicyGetInfo(profileId, _data.profiles[profileId].rolePolicyMap[roleId]);
  }

  function profilePolicyGetInfo(bytes32 profileId, bytes32 policyId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(profileId, policyId);
  }

  function _doPolicyGetInfo(bytes32 profileId, bytes32 policyId) internal view returns (ProfilePolicyInfo memory) {
    return LProfileRolePolicy.profilePolicyGetInfo(_data, profileId, policyId);
  }

  function profilePolicyGetRoles(bytes32 profileId, bytes32 policyId) external view returns (bytes32[] memory) {
    if (_data.profiles[profileId].policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.profiles[profileId].policies[policyId].roles.values();
  }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    return LProfileRolePolicy.profileGetPolicyType(policyCode);
  }

  function _doCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileRolePolicy.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function _accessPermission(ProfileMemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      ProfileEntity storage,
      FunctionEntity storage,
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");

    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);

    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _getMemberPolicyScopeInfo(ProfileEntity storage profileEntity, address account)
    internal
    view
    returns (ScopeType, bytes32)
  {
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage policyMasterType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole = profileEntity.profileRoleReadSlot(senderRoleId);
    return (profileEntity.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(
    ProfileEntity storage profileEntity,
    ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) internal view returns (bytes32 policyAdminId) {
    return
      LProfileRolePolicy.profileGetPolicyAdmin(
        profileEntity,
        requestScopeType,
        requestScopeAdmin,
        scopeId,
        adminId,
        profileId
      );
  }

  function _doGetPolicyAndCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 policyId,
    bytes32 memberId
  ) internal view returns (PolicyEntity storage) {
    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      policyEntity.adminId,
      memberId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _doprofilePolicyAddRoles(
    ProfileEntity storage profileEntity,
    PolicyEntity storage policyEntity,
    ProfilePolicyAddRolesRequest calldata request,
    bytes32 profileId,
    address sender
  ) internal {
    ScopeType policyScopeType = profileEntity.scopes[policyEntity.scopeId].stype;
    for (uint256 j = 0; j < request.roles.length; j++) {
      LProfileRolePolicy.profilePolicyAddRoles(
        profileEntity,
        policyEntity,
        profileId,
        request.policyId,
        request.roles[j],
        policyScopeType
      );
      emit ProfilePolicyRoleAdded(sender, profileId, request.policyId, request.roles[j]);
    }
  }

  function _doProfilePolicyRegister(
    ProfilePolicyRegisterRequest calldata request,
    ProfileEntity storage profileEntity,
    ScopeType senderScopeType,
    bytes32 senderScopeId,
    bytes32 profileId,
    address sender
  ) internal {
    bytes32 newPolicyId = LProfileRolePolicy.profilePolicyRegister(
      profileEntity,
      request,
      profileId,
      senderScopeType,
      senderScopeId
    );
    emit ProfilePolicyRegistered(sender, profileId, newPolicyId, request.scopeId, request.adminId, request.policyCode);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileRolePolicy);
  }
}
