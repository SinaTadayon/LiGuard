// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IRoleManagement.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../ACLStorage.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLAgentScope.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RoleManager is ACLStorage, BaseUUPSProxy, IRoleManagement {
  using LACLStorage for DataCollection;
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
    return interfaceId == type(IRoleManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  // type admins call roleRegister function
  function roleRegister(MemberSignature calldata memberSign, RoleRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleRegister.selector
    );

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(
      int16(uint16(memberEntity.limits.roleRegisterLimit)) - int8(uint8(requests.length)) >= 0,
      "Illegal RegisterLimit"
    );
    unchecked {
      memberEntity.limits.roleRegisterLimit -= uint8(requests.length);
    }

    for (uint256 i = 0; i < requests.length; i++) {
      (bytes32 newRoleId, bytes32 adminId) = LACLAgentScope.aclRegisterRole(
        _data,
        requests[i],
        functionId,
        senderId,
        memberEntity.limits.memberLimit
      );
      emit RoleRegistered(sender, newRoleId, requests[i].typeId, adminId, requests[i].scopeId);
    }
    return true;
  }

  // Note: Admin must be Role or Type, and it can't be a member
  function roleUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        IRoleManagement.roleUpdateAdmin.selector
      );
      roleEntity.ba.adminId = _getRoleAdmin(
        _data.scopes[roleEntity.scopeId].stype,
        _data.agents[roleEntity.typeId].adminId,
        roleEntity.scopeId,
        requests[i].adminId
      );
      emit RoleAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function roleUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleUpdateScope.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        IRoleManagement.roleUpdateScope.selector
      );
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      _checkUpdateRequestScope(requests[i].scopeId, typeEntity.scopeId);
      BaseScope storage oldScope = _data.scopes[roleEntity.scopeId];
      require(oldScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        oldScope.referredByAgent -= 1;
      }
      roleEntity.scopeId = requests[i].scopeId;
      emit RoleScopeUpdated(sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function roleUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleUpdateActivityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        IRoleManagement.roleUpdateActivityStatus.selector
      );
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      roleEntity.ba.acstat = requests[i].acstat;
      emit RoleActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function roleUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleUpdateAlterabilityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].id);

      IACL.AdminAccessStatus status = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      roleEntity.ba.alstat = requests[i].alstat;
      emit RoleAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function roleUpdateMemberLimit(MemberSignature calldata memberSign, RoleUpdateMemberLimitRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleUpdateMemberLimit.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].roleId,
        senderId,
        functionId,
        IRoleManagement.roleUpdateMemberLimit.selector
      );
      require(requests[i].memberLimit > roleEntity.memberCount, "Illegal Limit");
      roleEntity.memberLimit = requests[i].memberLimit;
      emit RoleMemberLimitUpdated(sender, requests[i].roleId, requests[i].memberLimit);
    }
    return true;
  }

  function roleGrantMembers(MemberSignature calldata memberSign, RoleGrantMembersRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleGrantMembers.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].roleId,
        senderId,
        functionId,
        IRoleManagement.roleGrantMembers.selector
      );
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        require(roleEntity.memberCount < roleEntity.memberLimit, "Illegal Limit");
        MemberEntity storage memberEntity = _data.memberReadSlot(requests[i].members[j]);
        if (memberEntity.types.contains(roleEntity.typeId)) {
          bytes32 currentRoleId = typeEntity.members[requests[i].members[j]];
          require(currentRoleId != requests[i].roleId, "Already Exist");
          if (requests[i].roleId == LACLAgentScope.LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID) {
            require(roleEntity.memberCount > 1, "Illegal Admin Revoke");
          }
          RoleEntity storage currentRoleEntity = _doGetEntityAndCheckAdminAccess(
            currentRoleId,
            senderId,
            functionId,
            IRoleManagement.roleGrantMembers.selector
          );
          require(currentRoleEntity.memberCount > 0, "Illegal Count");
          unchecked {
            currentRoleEntity.memberCount -= 1;
          }
          emit RoleMemberRevoked(sender, currentRoleId, requests[i].members[j], currentRoleEntity.typeId);
        } else {
          require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
          require(memberEntity.limits.typeLimit > memberEntity.types.length(), "Illegal TypeLimit");

          if (
            (memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID) ||
              memberEntity.types.contains(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID)) &&
            (roleEntity.typeId == _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID ||
              roleEntity.typeId == _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID)
          ) {
            revert("Illegal Grant");
          }

          memberEntity.types.add(roleEntity.typeId);
        }

        typeEntity.members[requests[i].members[j]] = requests[i].roleId;
        roleEntity.memberCount += 1;
        emit RoleMemberGranted(sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }

  function roleRevokeMembers(MemberSignature calldata memberSign, RoleRevokeMembersRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleRevokeMembers.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].roleId,
        senderId,
        functionId,
        IRoleManagement.roleRevokeMembers.selector
      );

      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

      for (uint256 j = 0; j < requests[i].members.length; j++) {
        MemberEntity storage memberEntity = _data.memberReadSlot(requests[i].members[j]);
        require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        if (requests[i].roleId == LACLAgentScope.LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID) {
          require(roleEntity.memberCount > 1, "Illegal Admin Revoke");
        }

        require(typeEntity.members[requests[i].members[j]] != bytes32(0), "Not Found");
        require(roleEntity.memberCount > 0, "Illegal Count");
        delete typeEntity.members[requests[i].members[j]];
        unchecked {
          roleEntity.memberCount -= 1;
        }

        memberEntity.types.remove(roleEntity.typeId);
        if (memberEntity.types.length() == 0) {
          delete memberEntity.ba;
          delete memberEntity.account;
          delete memberEntity.limits;
          delete memberEntity.types;
          emit RoleMemberDeleted(
            sender,
            requests[i].members[j],
            requests[i].roleId,
            roleEntity.typeId,
            memberEntity.account
          );
        }
        emit RoleMemberRevoked(sender, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }
    }
    return true;
  }

  function roleRemove(MemberSignature calldata memberSign, bytes32[] calldata roles) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRoleManagement.roleRemove.selector
    );

    for (uint256 i = 0; i < roles.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(roles[i]);
      IACL.AdminAccessStatus status = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(roleEntity.memberCount == 0, "Illegal Remove");

      // check type
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
      typeEntity.roles.remove(roles[i]);

      BaseScope storage roleScope = _data.scopes[roleEntity.scopeId];
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

      emit RoleRemoved(sender, roles[i]);
    }
    return true;
  }

  function roleCheckId(bytes32 roleId) external view returns (bool) {
    return _data.agents[roleId].atype == AgentType.ROLE;
  }

  function roleCheckName(string calldata roleName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function roleCheckAdmin(bytes32 roleId, address account) external view returns (bool) {
    if (_data.agents[roleId].atype != AgentType.ROLE) return false;

    bytes32 roleAdminId = _data.agents[roleId].adminId;
    AgentType adminAgenType = _data.agents[roleAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (adminAgenType == AgentType.ROLE) {
      return _doRoleHasMember(roleAdminId, memberId);
    } else if (adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool) {
    return _doRoleHasMember(roleId, LACLUtils.accountGenerateId(account));
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if (!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if (!result1) return false;

    return typeEntity.members[memberId] == roleId;
  }

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if (!result) {
      return
        RoleInfo({
          scopeId: bytes32(0),
          typeId: bytes32(0),
          adminId: bytes32(0),
          memberLimit: 0,
          memberCount: 0,
          adminType: AgentType.NONE,
          atype: AgentType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          name: ""
        });
    }
    return
      RoleInfo({
        scopeId: roleEntity.scopeId,
        typeId: roleEntity.typeId,
        adminId: roleEntity.ba.adminId,
        memberLimit: roleEntity.memberLimit,
        memberCount: roleEntity.memberCount,
        adminType: _data.agents[roleEntity.ba.adminId].atype,
        atype: roleEntity.ba.atype,
        acstat: roleEntity.ba.acstat,
        alstat: roleEntity.ba.alstat,
        name: roleEntity.name
      });
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACL.AdminAccessStatus) {
    return LACLAgentScope.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _accessPermission(MemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) {
      if (
        status == IACL.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN &&
        selector == IRoleManagement.roleUpdateActivityStatus.selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtils.generateAuthorizationError(status);
    }

    return (functionId, senderId, signer);
  }

  function _getRoleAdmin(
    ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) internal view returns (bytes32 roleAdminId) {
    return LACLAgentScope.getRoleAdmin(_data, requestScopeType, requestScopeAdmin, scopeId, adminId);
  }

  function _checkUpdateRequestScope(bytes32 requestScopeId, bytes32 typeScopeId) internal returns (ScopeType) {
    return LACLAgentScope.roleCheckRequestScope(_data, requestScopeId, typeScopeId);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 roleId,
    bytes32 senderId,
    bytes32 functionId,
    bytes4 selector
  ) internal view returns (RoleEntity storage) {
    RoleEntity storage roleEntity = _data.roleReadSlot(roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

    // check access admin role
    IACL.AdminAccessStatus status = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) {
      if (
        status == IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN &&
        selector == IRoleManagement.roleUpdateActivityStatus.selector
      ) {
        return roleEntity;
      }
      LACLUtils.generateAdminAccessError(status);
    }
    return roleEntity;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLAgentScope);
  }
}
