// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "../ACLStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Type Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract TypeManager is ACLStorage, BaseUUPSProxy, ITypeManagement {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  // function initialize(
  //   string calldata contractName,
  //   string calldata contractVersion,
  //   address accessControlManager
  // ) public onlyProxy onlyLocalAdmin initializer {
  //   __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

  //   emit Initialized(
  //     _msgSender(),
  //     address(this),
  //     _implementation(),
  //     contractName,
  //     contractVersion,
  //     _getInitializedCount()
  //   );
  // }

  function reinitialize(string calldata contractVersion) public onlyProxy onlyLocalAdmin reinitializer(2) {
    _contractVersion = contractVersion;
    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      _contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(ITypeManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function typeRegister(MemberSignature calldata memberSign, TypeRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (, bytes32 senderId, address sender) = _accessPermission(memberSign, ITypeManagement.typeRegister.selector);

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(
      int16(uint16(memberEntity.limits.typeRegisterLimit)) - int8(uint8(requests.length)) >= 0,
      "Illegal RegisterLimit"
    );
    unchecked {
      memberEntity.limits.typeRegisterLimit -= uint8(requests.length);
    }

    // fetch scope type and scope id of sender
    (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetMemberScopeInfoFromType(
      LACLGenerals.LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
      senderId
    );

    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newTypeId = LACLUtils.generateId(requests[i].name);
      require(_data.agents[newTypeId].atype == AgentType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // checking requested type scope
      BaseScope storage requestedScope = _getCheckUpdateRequestScope(
        requests[i].scopeId,
        senderScopeId,
        senderScopeType
      );

      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);
      newType.ba.atype = AgentType.TYPE;
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      newType.ba.adminId = requests[i].adminId;
      newType.scopeId = requests[i].scopeId;
      newType.roleLimit = requests[i].roleLimit >= 0
        ? uint16(uint24(requests[i].roleLimit))
        : memberEntity.limits.typeRoleLimit;
      newType.name = requests[i].name;
      newType.ba.adminId = _getTypeAdmin(
        requestedScope.stype,
        requestedScope.adminId,
        requests[i].scopeId,
        requests[i].adminId
      );
      emit TypeRegistered(sender, newTypeId, requests[i].scopeId, requests[i].adminId);
    }
    return true;
  }

  function typeUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        ITypeManagement.typeUpdateAdmin.selector
      );

      // checking requested type admin
      typeEntity.ba.adminId = _getTypeAdmin(
        _data.scopes[typeEntity.scopeId].stype,
        _data.scopes[typeEntity.scopeId].adminId,
        typeEntity.scopeId,
        requests[i].adminId
      );

      emit TypeAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function typeUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeUpdateScope.selector
    );
    ScopeType senderScopeType;
    bytes32 senderScopeId;
    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        ITypeManagement.typeUpdateScope.selector
      );

      AgentType adminAgentType = _data.agents[typeEntity.ba.adminId].atype;
      if (adminAgentType == AgentType.ROLE) {
        RoleEntity storage roleEntity = _data.roleReadSlot(typeEntity.ba.adminId);
        senderScopeId = roleEntity.scopeId;
        senderScopeType = _data.scopes[roleEntity.scopeId].stype;
      } else {
        TypeEntity storage agentType = _data.typeReadSlot(typeEntity.ba.adminId);
        bytes32 memberRoleId = agentType.members[senderId];
        RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
        senderScopeType = _data.scopes[memberAgentRole.scopeId].stype;
        senderScopeId = memberAgentRole.scopeId;
      }

      BaseScope storage requestScope = _getCheckUpdateRequestScope(requests[i].scopeId, senderScopeId, senderScopeType);
      BaseScope storage currentScope = _data.scopes[typeEntity.scopeId];
      if (typeEntity.roles.length() > 0) {
        require(requestScope.stype > currentScope.stype, "Illegal ScopeType");
        require(
          IACLGenerals(address(this)).checkScopesCompatibility(requests[i].scopeId, typeEntity.scopeId),
          "Illegal Scope"
        );
      }
      require(currentScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        currentScope.referredByAgent -= 1;
      }
      typeEntity.scopeId = requests[i].scopeId;
      emit TypeScopeUpdated(sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function typeUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeUpdateActivityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].id,
        senderId,
        functionId,
        ITypeManagement.typeUpdateActivityStatus.selector
      );
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      typeEntity.ba.acstat = requests[i].acstat;
      emit TypeActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function typeUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeUpdateAlterabilityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      typeEntity.ba.alstat = requests[i].alstat;
      emit TypeAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function typeUpdateRoleLimit(MemberSignature calldata memberSign, TypeUpdateRoleLimitRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeUpdateRoleLimit.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].typeId,
        senderId,
        functionId,
        ITypeManagement.typeUpdateRoleLimit.selector
      );
      require(requests[i].roleLimit > typeEntity.roles.length(), "Illegal Limit");
      typeEntity.roleLimit = requests[i].roleLimit;
      emit TypeRoleLimitUpdated(sender, requests[i].typeId, requests[i].roleLimit);
    }
    return true;
  }

  function typeRemove(MemberSignature calldata memberSign, bytes32[] calldata types) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      ITypeManagement.typeRemove.selector
    );

    for (uint256 i = 0; i < types.length; i++) {
      TypeEntity storage typeEntity = _data.typeReadSlot(types[i]);
      IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(typeEntity.roles.length() == 0, "Illegal Remove");

      BaseScope storage typeScope = _data.scopes[typeEntity.scopeId];
      require(typeScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        typeScope.referredByAgent -= 1;
      }

      delete typeEntity.ba;
      delete typeEntity.scopeId;
      delete typeEntity.name;
      delete typeEntity.roleLimit;
      delete typeEntity.roles;

      emit TypeRemoved(sender, types[i]);
    }
    return true;
  }

  function typeCheckId(bytes32 typeId) external view returns (bool) {
    return _data.agents[typeId].atype == AgentType.TYPE;
  }

  function typeCheckName(string calldata typeName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function typeCheckAdmin(bytes32 typeId, address account) external view returns (bool) {
    if (_data.agents[typeId].atype != AgentType.TYPE) return false;

    bytes32 typeAdminId = _data.agents[typeId].adminId;
    AgentType adminAgentType = _data.agents[typeAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(typeAdminId);
      if (!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == typeAdminId;
    } else if (adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(typeAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if (!result) return false;
    return te.members[LACLUtils.accountGenerateId(account)] != bytes32(0);
  }

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if (!result) return false;
    return te.roles.contains(roleId);
  }

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if (!result) return new bytes32[](0);
    return te.roles.values();
  }

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if (!result) {
      return
        TypeInfo({
          scopeId: bytes32(0),
          adminId: bytes32(0),
          roleLimit: 0,
          roleCount: 0,
          adminType: AgentType.NONE,
          atype: AgentType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          name: ""
        });
    }

    return
      TypeInfo({
        scopeId: te.scopeId,
        adminId: te.ba.adminId,
        roleLimit: te.roleLimit,
        roleCount: uint16(te.roles.length()),
        adminType: _data.agents[te.ba.adminId].atype,
        atype: te.ba.atype,
        acstat: te.ba.acstat,
        alstat: te.ba.alstat,
        name: te.name
      });
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
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
      signer = LACLUtils.getMemeberSignerAddress(memberSign, LACLGenerals.MEMBER_SIGNATURE_MESSAGE_TYPE_HASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) {
      if (
        status == IACL.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN &&
        selector == ITypeManagement.typeUpdateActivityStatus.selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtils.generateAuthorizationError(status);
    }
    return (functionId, senderId, signer);
  }

  function _getTypeAdmin(
    ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) internal view returns (bytes32 typeAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).checkScopesCompatibility(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      typeAdminId = adminId;
    } else {
      typeAdminId = requestScopeAdmin;
    }
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 typeId,
    bytes32 senderId,
    bytes32 functionId,
    bytes4 selector
  ) internal view returns (TypeEntity storage) {
    TypeEntity storage typeEntity = _data.typeReadSlot(typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) {
      if (
        status == IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN &&
        selector == ITypeManagement.typeUpdateActivityStatus.selector
      ) {
        return typeEntity;
      }
      LACLUtils.generateAdminAccessError(status);
    }

    return typeEntity;
  }

  function _getCheckUpdateRequestScope(
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    ScopeType senderScopeType
  ) internal returns (BaseScope storage) {
    // checking requested type scope
    BaseScope storage requestedScope = _data.scopes[requestScopeId];
    require(requestedScope.stype != ScopeType.NONE, "Not Found");
    require(requestedScope.acstat > ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;

    // check sender scope with request scope
    require(senderScopeType >= requestedScope.stype, "Illegal Sender ScopeType");
    if (senderScopeType == requestedScope.stype) {
      require(senderScopeId == requestScopeId, "Illegal Sender Scope");
    } else {
      require(IACLGenerals(address(this)).checkScopesCompatibility(senderScopeId, requestScopeId), "Illegal Sender Scope");
    }

    return requestedScope;
  }

  function getLibraries() external pure returns (address, address) {
    return (address(LACLCommons), address(LACLGenerals));
  }
}
