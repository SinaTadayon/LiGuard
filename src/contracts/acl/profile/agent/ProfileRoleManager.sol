// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IProfileRoleManagement.sol";
import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../IProfileACL.sol";
import "../ProfileAccessControl.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/acl/LProfileRolePolicy.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileRoleManager is ACLStorage, BaseUUPSProxy, IProfileRoleManagement {
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
    return interfaceId == type(IProfileRoleManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  // type admins call roleRegister function
  function profileRoleRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleRegisterRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleRegister.selector);
    LProfileRolePolicy.profileCheckMemberForRoleRegister(profileEntity, uint16(requests.length), senderId);
    for (uint256 i = 0; i < requests.length; i++) {
      _doRoleRegister(requests[i], profileEntity, functionEntity, profileId, senderId, sender);
    }
    return true;
  }

  function profileRoleUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleUpdateAdmin.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );
      roleEntity.ba.adminId = _getRoleAdmin(
        profileEntity,
        profileEntity.scopes[roleEntity.scopeId].stype,
        profileEntity.agents[roleEntity.typeId].adminId,
        roleEntity.scopeId,
        requests[i].adminId,
        profileId
      );
      emit ProfileRoleAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profileRoleUpdateScope(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateScopeRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleUpdateScope.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      LProfileRolePolicy.profileRoleUpdateScope(requests[i], profileEntity, functionEntity, profileId, senderId);
      emit ProfileRoleScopeUpdated(sender, profileId, requests[i].entityId, requests[i].scopeId);
    }
    return true;
  }

  function profileRoleUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleUpdateActivityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      require(requests[i].entityId != LProfileRolePolicy.LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, "Illegal Role");

      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      roleEntity.ba.acstat = requests[i].acstat;
      emit ProfileRoleActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileRoleUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleUpdateAlterabilityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      require(requests[i].entityId != LProfileRolePolicy.LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, "Illegal Role");

      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[i].entityId);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        roleEntity.ba.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      roleEntity.ba.alstat = requests[i].alstat;
      emit ProfileRoleAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileRoleUpdateMemberLimit(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleUpdateMemberLimitRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleUpdateMemberLimit.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].roleId,
        senderId
      );
      require(requests[i].memberLimit > roleEntity.memberCount, "Illegal Limit");
      roleEntity.memberLimit = requests[i].memberLimit;
      emit ProfileRoleMemberLimitUpdated(sender, profileId, requests[i].roleId, requests[i].memberLimit);
    }
    return true;
  }

  function profileRoleGrantMembers(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleGrantMembersRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleGrantMembers.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileRoleGrantMembers(requests[i], profileEntity, functionEntity, profileId, senderId, sender);
    }
    return true;
  }

  function profileRoleRevokeMembers(
    ProfileMemberSignature calldata memberSign,
    ProfileRoleRevokeMembersRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleRevokeMembers.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileRoleRevokeMembers(requests[i], profileEntity, functionEntity, profileId, senderId, sender);
    }
    return true;
  }

  function profileRoleRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata roles)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileRoleManagement.profileRoleRemove.selector);
    for (uint256 i = 0; i < roles.length; i++) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roles[i]);

      // check access admin role
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        roleEntity.ba.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(roleEntity.memberCount == 0, "Illegal Remove");

      // check type
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
      typeEntity.roles.remove(roles[i]);

      BaseScope storage roleScope = profileEntity.scopes[roleEntity.scopeId];
      require(roleScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        roleScope.referredByAgent -= 1;
      }

      delete roleEntity.name;
      delete roleEntity.memberCount;
      delete roleEntity.memberLimit;
      delete roleEntity.typeId;
      delete roleEntity.scopeId;
      delete roleEntity.ba;

      emit ProfileRoleRemoved(sender, profileId, roles[i]);
    }
    return true;
  }

  function profileRoleCheckId(bytes32 profileId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].agents[roleId].atype == AgentType.ROLE;
  }

  function profileRoleCheckName(bytes32 profileId, string calldata roleName) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function profileRoleCheckAdmin(
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    return LProfileRolePolicy.profileRoleCheckAdmin(_data, profileId, roleId, account);
  }

  function profileRoleHasAccount(
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    return LProfileRolePolicy.profileRoleHasAccount(_data, profileId, roleId, account);
  }

  function profileRoleGetInfo(bytes32 profileId, bytes32 roleId) external view returns (ProfileRoleInfo memory) {
    return LProfileRolePolicy.profileRoleGetInfo(_data, profileId, roleId);
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

  function _getRoleAdmin(
    ProfileEntity storage profileEntity,
    ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) internal view returns (bytes32 roleAdminId) {
    return
      LProfileRolePolicy.profileGetRoleAdmin(
        profileEntity,
        requestScopeType,
        requestScopeAdmin,
        scopeId,
        adminId,
        profileId
      );
  }

  function _doGetEntityAndCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 roleId,
    bytes32 senderId
  ) internal view returns (RoleEntity storage) {
    return LProfileRolePolicy.profileGetRoleEntityAndCheckAdminAccess(profileEntity, functionEntity, roleId, senderId);
  }

  function _updateProfileAccount(
    bytes32 profileId,
    bytes32 typeId,
    ProfileMemberEntity storage profileMemberEntity,
    bool isRevoke
  ) internal {
    return LProfileRolePolicy.updateProfileAccount(_data, profileMemberEntity, profileId, typeId, isRevoke);
  }

  function _doProfileRoleRevokeMembers(
    ProfileRoleRevokeMembersRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender
  ) internal {
    RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.roleId,
      senderId
    );
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

    for (uint256 j = 0; j < request.members.length; j++) {
      ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(request.members[j]);
      require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      if (request.roleId == LProfileRolePolicy.LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID) {
        require(request.members[j] != LACLUtils.accountGenerateId(profileEntity.owner), "Illegal Owner Revoke");
      }

      require(typeEntity.members[request.members[j]] != bytes32(0), "Not Found");
      require(roleEntity.memberCount > 0, "Illegal MemberCount");
      delete typeEntity.members[request.members[j]];
      unchecked {
        roleEntity.memberCount -= 1;
      }
      profileMemberEntity.types.remove(roleEntity.typeId);

      // check and remove member from admin
      if (profileEntity.admins.contains(request.members[j])) {
        require(profileEntity.owner != profileMemberEntity.account, "Illegal Revoke");
        profileEntity.admins.remove(request.members[j]);
      }

      if (profileMemberEntity.types.length() == 0) {
        _updateProfileAccount(profileId, roleEntity.typeId, profileMemberEntity, true);

        delete profileMemberEntity.ba;
        delete profileMemberEntity.callLimit;
        delete profileMemberEntity.typeLimit;
        delete profileMemberEntity.account;
        delete profileMemberEntity.registerLimits;
        delete profileMemberEntity.types;

        emit ProfileRoleMemberDeleted(
          sender,
          profileId,
          request.members[j],
          request.roleId,
          roleEntity.typeId,
          profileMemberEntity.account
        );
      }
      emit ProfileRoleMemberRevoked(sender, profileId, request.roleId, request.members[j], roleEntity.typeId);
    }
  }

  function _doProfileRoleGrantMembers(
    ProfileRoleGrantMembersRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender
  ) internal {
    RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.roleId,
      senderId
    );
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

    for (uint256 j = 0; j < request.members.length; j++) {
      require(roleEntity.memberCount < roleEntity.memberLimit, "Illegal Grant");
      if (request.roleId == LProfileRolePolicy.LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID) {
        require(request.members[j] != LACLUtils.accountGenerateId(profileEntity.owner), "Illegal Owner Revoke");
      }

      ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(request.members[j]);
      if (profileMemberEntity.types.contains(roleEntity.typeId)) {
        {
          bytes32 currentRoleId = typeEntity.members[request.members[j]];
          require(currentRoleId != request.roleId, "Already Exist");
          RoleEntity storage currentRoleEntity = _doGetEntityAndCheckAdminAccess(
            profileEntity,
            functionEntity,
            currentRoleId,
            senderId
          );
          require(currentRoleEntity.memberCount > 0, "Illegal MemberCount");
          unchecked {
            currentRoleEntity.memberCount -= 1;
          }
        }
        emit ProfileRoleMemberRevoked(
          sender,
          profileId,
          typeEntity.members[request.members[j]],
          request.members[j],
          roleEntity.typeId
        );
      } else {
        require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
        require(profileMemberEntity.typeLimit > profileMemberEntity.types.length(), "Illegal Member TypeLimit");
        _updateProfileAccount(profileId, roleEntity.typeId, profileMemberEntity, false);
        // check and add member from admin
        if (roleEntity.typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) profileEntity.admins.add(request.members[j]);

        profileMemberEntity.types.add(roleEntity.typeId);
      }

      typeEntity.members[request.members[j]] = request.roleId;
      roleEntity.memberCount += 1;
      emit ProfileRoleMemberGranted(sender, profileId, request.roleId, request.members[j], roleEntity.typeId);
    }
  }

  function _doRoleRegister(
    ProfileRoleRegisterRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender
  ) internal {
    (bytes32 newRoleId, bytes32 adminId) = LProfileRolePolicy.profileRoleRegister(
      request,
      profileEntity,
      functionEntity,
      profileId,
      senderId
    );
    emit ProfileRoleRegistered(sender, profileId, newRoleId, request.typeId, adminId, request.scopeId);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileRolePolicy);
  }
}
