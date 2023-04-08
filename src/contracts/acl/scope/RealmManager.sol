// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "../ACLStorage.sol";
import "./IRealmManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RealmManager is ACLStorage, BaseUUPSProxy, IRealmManagement {
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
    return interfaceId == type(IRealmManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function realmRegister(MemberSignature calldata memberSign, RealmRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmRegister.selector
    );

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    unchecked {
      require(
        int16(uint16(memberEntity.limits.realmRegisterLimit)) - int8(uint8(requests.length)) >= 0,
        "Illegal RegisterLimit"
      );
      memberEntity.limits.realmRegisterLimit -= uint8(requests.length);
    }

    // fetch scope type and scope id of sender
    (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(
      _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
      senderId
    );

    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newRealmId = LACLUtils.generateId(requests[i].name);
      require(_data.scopes[newRealmId].stype == ScopeType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // check sender scopes
      require(memberScopeType >= ScopeType.DOMAIN, "Illegal ScopeType");
      if (memberScopeType == ScopeType.DOMAIN) {
        require(memberScopeId == requests[i].domainId, "Illegal Domain Scope");
      } else {
        require(memberScopeId == _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
      }

      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].domainId);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
      require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

      {
        // check access admin realm
        IACL.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
        if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      }

      // add to domain
      domainEntity.realms.add(newRealmId);

      {
        // create new realm entity
        RealmEntity storage newRealm = _data.realmWriteSlot(newRealmId);
        newRealm.bs.stype = ScopeType.REALM;
        newRealm.bs.acstat = requests[i].acstat;
        newRealm.bs.alstat = requests[i].alstat;
        newRealm.bs.adminId = requests[i].adminId;
        newRealm.name = requests[i].name;
        newRealm.domainId = requests[i].domainId;
        newRealm.contextLimit = requests[i].contextLimit >= 0
          ? uint32(uint64(requests[i].contextLimit))
          : memberEntity.limits.contextLimit;
        newRealm.bs.adminId = _getRealmAdmin(domainEntity.bs.adminId, requests[i].domainId, requests[i].adminId);
      }

      emit RealmRegistered(sender, newRealmId, requests[i].domainId, requests[i].adminId);
    }

    return true;
  }

  function realmUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested type admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
        if (ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Admin Scope");
        } else {
          require(
            IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id),
            "Illegal Admin Scope"
          );
        }
        realmEntity.bs.adminId = requests[i].adminId;
      } else {
        realmEntity.bs.adminId = _data.scopes[realmEntity.domainId].adminId;
      }

      emit RealmAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function realmMoveContext(MemberSignature calldata memberSign, RealmMoveContextRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmMoveContext.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].realmId, senderId, functionId);
      require(realmEntity.contexts.contains(requests[i].contextId), "Context Not Found");
      RealmEntity storage targetRealmEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].targetRealmId,
        senderId,
        functionId
      );

      ContextEntity storage contextEntity = _data.contextReadSlot(requests[i].contextId);
      require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(contextEntity.bs.referredByAgent == 0, "Illegal Referred");

      (, bytes32 contextAdminScopeId) = _doAgentGetScopeInfo(contextEntity.bs.adminId);
      require(
        IACLGenerals(address(this)).isScopesCompatible(contextAdminScopeId, requests[i].targetRealmId),
        "Illegal Admin Scope"
      );

      require(targetRealmEntity.contextLimit > targetRealmEntity.contexts.length(), "Illegal Move");
      realmEntity.contexts.remove(requests[i].contextId);
      targetRealmEntity.contexts.add(requests[i].contextId);
      contextEntity.realmId = requests[i].targetRealmId;
      emit RealmContextMoved(sender, requests[i].realmId, requests[i].contextId, requests[i].targetRealmId);
    }

    return true;
  }

  function realmUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmUpdateActivityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

      IACL.AdminAccessStatus status = _doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      realmEntity.bs.acstat = requests[i].acstat;
      emit RealmActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function realmUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmUpdateAlterabilityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");

      IACL.AdminAccessStatus status = _doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      realmEntity.bs.alstat = requests[i].alstat;
      emit RealmAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function realmUpdateContextLimit(
    MemberSignature calldata memberSign,
    RealmUpdateContextLimitRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmUpdateContextLimit.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].realmId, senderId, functionId);
      require(requests[i].contextLimit > realmEntity.contexts.length(), "Illegal Limit");
      realmEntity.contextLimit = requests[i].contextLimit;
      emit RealmContextLimitUpdated(sender, requests[i].realmId, requests[i].contextLimit);
    }
    return true;
  }

  function realmRemove(MemberSignature calldata memberSign, bytes32[] calldata realms) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IRealmManagement.realmRemove.selector
    );

    for (uint256 i = 0; i < realms.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(realms[i]);

      IACL.AdminAccessStatus status = _doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      require(realmEntity.contexts.length() == 0, "Illegal Remove");
      if (realmEntity.bs.referredByAgent == 0) {
        // check domain
        DomainEntity storage domainEntity = _data.domainReadSlot(realmEntity.domainId);
        require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
        domainEntity.realms.remove(realms[i]);

        delete realmEntity.bs;
        delete realmEntity.domainId;
        delete realmEntity.contextLimit;
        delete realmEntity.name;
        delete realmEntity.contexts;
        emit RealmRemoved(sender, realms[i], false);
      } else {
        require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        realmEntity.bs.acstat = ActivityStatus.DELETED;
        emit RealmRemoved(sender, realms[i], true);
      }
    }
    return true;
  }

  function realmCheckId(bytes32 realmId) external view returns (bool) {
    return _data.scopes[realmId].stype == ScopeType.REALM;
  }

  function realmCheckName(string calldata realmName) external view returns (bool) {
    return _data.scopes[LACLUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

  function realmCheckAdmin(bytes32 realmId, address account) external view returns (bool) {
    (RealmEntity storage realmEntity, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) return false;

    bytes32 realmAdminId = realmEntity.bs.adminId;
    AgentType agentType = _data.agents[realmAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = _data.roleTryReadSlot(realmAdminId);
      if (!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == realmAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(realmAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if (!result1) return false;

    return ce.realmId == realmId;
  }

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) return false;
    return re.contexts.contains(contextId);
  }

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) return new bytes32[](0);
    return re.contexts.values();
  }

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) {
      return
        RealmInfo({
          domainId: bytes32(0),
          adminId: bytes32(0),
          contextLimit: 0,
          contextCount: 0,
          referredByAgent: 0,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          adminType: AgentType.NONE,
          name: ""
        });
    }

    return
      RealmInfo({
        domainId: re.domainId,
        adminId: re.bs.adminId,
        contextLimit: re.contextLimit,
        contextCount: uint32(re.contexts.length()),
        referredByAgent: re.bs.referredByAgent,
        stype: re.bs.stype,
        acstat: re.bs.acstat,
        alstat: re.bs.alstat,
        adminType: _data.agents[re.bs.adminId].atype,
        name: re.name
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
        status == IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN &&
        selector == IRealmManagement.realmUpdateActivityStatus.selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtils.generateAuthorizationError(status);
    }
    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 realmId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = _data.realmReadSlot(realmId);
    require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return realmEntity;
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _getRealmAdmin(
    bytes32 requestScopeAdmin,
    bytes32 domainId,
    bytes32 adminId
  ) internal view returns (bytes32 realmAdminId) {
    return LACLCommons.realmGetAdmin(_data, requestScopeAdmin, domainId, adminId);
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}
