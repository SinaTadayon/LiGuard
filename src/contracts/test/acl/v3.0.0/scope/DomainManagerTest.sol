// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IDomainManagementTest.sol";
import "../IACLTest.sol";
import "../IACLGeneralsTest.sol";
import "../ACLStorageTest.sol";
import "../lib/LACLStorageTest.sol";
import "../lib/LACLCommonsTest.sol";
import "../lib/LACLUtilsTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract DomainManagerTest is ACLStorageTest, BaseUUPSProxy, IDomainManagementTest {
  using LACLStorageTest for DataCollection;
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
    return interfaceId == type(IDomainManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function domainRegister(MemberSignature calldata memberSign, DomainRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainRegister.selector
    );

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(
      int16(uint16(memberEntity.limits.domainRegisterLimit)) - int8(uint8(requests.length)) >= 0,
      "Illegal RegisterLimit"
    );
    unchecked {
      memberEntity.limits.domainRegisterLimit -= uint8(requests.length);
    }

    // fetch scope type and scope id of sender
    bytes32 senderScopeId = _doGetMemberScopeInfoFromType(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID, senderId);

    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LACLUtilsTest.generateId(requests[i].name);
      require(_data.scopes[newDomainId].stype == ScopeType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // check sender scopes
      UniverseEntity storage livelyUniverseEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
      require(senderScopeId == _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
      require(livelyUniverseEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
      require(livelyUniverseEntity.domainLimit > livelyUniverseEntity.domains.length(), "Illegal Register");

      // check access admin universe
      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(livelyUniverseEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      // add domain to universe
      livelyUniverseEntity.domains.add(newDomainId);

      // create new domain entity
      DomainEntity storage newDomain = _data.domainWriteSlot(newDomainId);
      newDomain.bs.stype = ScopeType.DOMAIN;
      newDomain.bs.acstat = requests[i].acstat;
      newDomain.bs.alstat = requests[i].alstat;
      newDomain.universeId = _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      newDomain.name = requests[i].name;
      newDomain.realmLimit = requests[i].realmLimit >= 0
        ? uint16(uint24(requests[i].realmLimit))
        : memberEntity.limits.realmLimit;

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        newDomain.bs.adminId = requests[i].adminId;
      } else {
        newDomain.bs.adminId = livelyUniverseEntity.bs.adminId;
      }

      emit DomainRegistered(sender, newDomainId, requests[i].adminId);
    }

    return true;
  }

  function domainUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainUpdateActivityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      domainEntity.bs.acstat = requests[i].acstat;
      emit DomainActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function domainUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainUpdateAlterabilityStatus.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");

      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");

      domainEntity.bs.alstat = requests[i].alstat;
      emit DomainAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function domainUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainUpdateAdmin.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = _data.scopes[_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID].adminId;
      }

      emit DomainAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function domainMoveRealm(MemberSignature calldata memberSign, DomainMoveRealmRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainMoveRealm.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId);
      require(domainEntity.realms.contains(requests[i].realmId), "Domain Realm Not Found");
      DomainEntity storage targetDomainEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].targetDomainId,
        senderId,
        functionId
      );

      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].realmId);
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.bs.referredByAgent == 0, "Illeagl Referred");

      bytes32 realmAdminScopeId = _doAgentGetScopeInfo(realmEntity.bs.adminId);
      require(
        IACLGeneralsTest(address(this)).isScopesCompatible(realmAdminScopeId, requests[i].targetDomainId),
        "Illegal Admin Scope"
      );

      require(targetDomainEntity.realmLimit > targetDomainEntity.realms.length(), "Illegal Move");
      domainEntity.realms.remove(requests[i].realmId);
      targetDomainEntity.realms.add(requests[i].realmId);
      realmEntity.domainId = requests[i].targetDomainId;
      emit DomainRealmMoved(sender, requests[i].domainId, requests[i].realmId, requests[i].targetDomainId);
    }
    return true;
  }

  function domainUpdateRealmLimit(
    MemberSignature calldata memberSign,
    DomainUpdateRealmLimitRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainUpdateRealmLimit.selector
    );

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId);
      require(requests[i].realmLimit > domainEntity.realms.length(), "Illegal Limit");
      domainEntity.realmLimit = requests[i].realmLimit;
      emit DomainRealmLimitUpdated(sender, requests[i].domainId, requests[i].realmLimit);
    }
    return true;
  }

  function domainRemove(MemberSignature calldata memberSign, bytes32[] calldata domains) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IDomainManagementTest.domainRemove.selector
    );

    for (uint256 i = 0; i < domains.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(domains[i]);
      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

      require(domainEntity.realms.length() == 0, "Illegal Remove");
      if (domainEntity.bs.referredByAgent == 0) {
        // check universe
        UniverseEntity storage universeEntity = _data.universeReadSlot(domainEntity.universeId);
        require(universeEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
        universeEntity.domains.remove(domains[i]);

        delete domainEntity.bs;
        delete domainEntity.universeId;
        delete domainEntity.realmLimit;
        delete domainEntity.name;
        delete domainEntity.realms;
        emit DomainRemoved(sender, domains[i], false);
      } else {
        require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        domainEntity.bs.acstat = ActivityStatus.DELETED;
        emit DomainRemoved(sender, domains[i], true);
      }
    }

    return true;
  }

  function domainCheckId(bytes32 domainId) external view returns (bool) {
    return _data.scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function domainCheckName(string calldata domainName) external view returns (bool) {
    return _data.scopes[LACLUtilsTest.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool) {
    (DomainEntity storage domainEntity, bool result) = _data.domainTryReadSlot(domainId);
    if (!result) return false;

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = _data.agents[domainAdminId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = _data.roleTryReadSlot(domainAdminId);
      if (!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == domainAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(domainAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if (!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if (!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool) {
    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(contextId);
    if (!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if (!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if (!result) return false;
    return de.realms.contains(realmId);
  }

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if (!result) return new bytes32[](0);
    return de.realms.values();
  }

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if (!result) {
      return
        DomainInfo({
          adminId: bytes32(0),
          universeId: bytes32(0),
          realmLimit: 0,
          realmCount: 0,
          referredByAgent: 0,
          stype: ScopeType.NONE,
          adminType: AgentType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          name: ""
        });
    }

    return
      DomainInfo({
        adminId: de.bs.adminId,
        universeId: de.universeId,
        realmLimit: de.realmLimit,
        realmCount: uint16(de.realms.length()),
        referredByAgent: de.bs.referredByAgent,
        adminType: _data.agents[de.bs.adminId].atype,
        stype: de.bs.stype,
        acstat: de.bs.acstat,
        alstat: de.bs.alstat,
        name: de.name
      });
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACLTest.AdminAccessStatus) {
    return LACLCommonsTest.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      return roleEntity.scopeId;
    } else if (atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);
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
      signer = LACLUtilsTest.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtilsTest.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtilsTest.accountGenerateId(signer);
    IACLTest.AuthorizationStatus status = IACLTest(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACLTest.AuthorizationStatus.PERMITTED) {
      if (
        status == IACLTest.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN &&
        IDomainManagementTest.domainUpdateActivityStatus.selector == selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtilsTest.generateAuthorizationError(status);
    }
    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 domainId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = _data.domainReadSlot(domainId);
    require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    return domainEntity;
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommonsTest);
  }
}
