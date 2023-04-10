// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./IDomainManagementTest.sol";
import "../../acl/IACL.sol";
import "../../acl/ACLStorage.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LACLGenerals.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract DomainManagerTest is ACLStorage, BaseUUPSProxy, IDomainManagementTest {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function reInitialize(string calldata contractVersion) public onlyProxy onlyLocalAdmin reinitializer(2) {
    _contractVersion = contractVersion;
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IDomainManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function domainRegister2(DomainRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagementTest.domainRegister2.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    // fetch scope type and scope id of sender
    bytes32 senderScopeId = _doGetMemberScopeInfoFromType(LACLGenerals.LIVELY_VERSE_SCOPE_MASTER_TYPE_ID, senderId);

    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LACLUtils.generateId(requests[i].name);
      require(_data.scopes[newDomainId].stype == ScopeType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.NONE && requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // check sender scopes
      UniverseEntity storage livelyUniverseEntity = _data.universeReadSlot(LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
      require(senderScopeId == LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
      require(livelyUniverseEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
      require(livelyUniverseEntity.domainLimit > livelyUniverseEntity.domains.length(), "Illegal Domain Register");

      // check access admin universe
      require(_doCheckAdminAccess(livelyUniverseEntity.bs.adminId, senderId, functionId), "Forbidden");

      livelyUniverseEntity.domains.add(newDomainId);

      // create new domain entity
      DomainEntity storage newDomain = _data.domainWriteSlot(newDomainId);
      newDomain.bs.stype = ScopeType.DOMAIN;
      newDomain.bs.acstat = requests[i].acstat;
      newDomain.bs.alstat = requests[i].alstat;
      newDomain.name = requests[i].name;
      newDomain.realmLimit = 10;

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        newDomain.bs.adminId = requests[i].adminId;
      } else {
        newDomain.bs.adminId = livelyUniverseEntity.bs.adminId;
      }

      emit DomainRegistered(msg.sender, newDomainId, requests[i].adminId);
    }

    return true;
  }

  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagementTest.domainUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
      require(_doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId), "Forbidden");
      require(requests[i].acstat > ActivityStatus.NONE, "Illegal Activity");
      emit DomainActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagementTest.domainUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      // require(domainEntity.bs.acstat > ActivityStatus.DISABLED, "Domain Disabled");
      require(_doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId), "Forbidden");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      domainEntity.bs.alstat = requests[i].alstat;
      emit DomainAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagementTest.domainUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = _data.scopes[LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID].adminId;
      }

      emit DomainAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function domainUpdateRealmLimit(DomainUpdateRealmLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagementTest.domainUpdateRealmLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId);
      domainEntity.realmLimit = requests[i].realmLimit;
      emit DomainRealmLimitUpdated(msg.sender, requests[i].domainId, requests[i].realmLimit);
    }
    return true;
  }

  function domainCheckId(bytes32 domainId) external view returns (bool) {
    return _data.scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function domainCheckName(string calldata domainName) external view returns (bool) {
    return _data.scopes[LACLUtils.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool) {
    (DomainEntity storage domainEntity, bool result) = _data.domainTryReadSlot(domainId);
    if (!result) return false;

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = _data.agents[domainAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      return _doRoleHasMember(domainAdminId, memberId);
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(domainAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if (!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if (!result1) return false;

    return typeEntity.members[memberId] != bytes32(0);
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
  ) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);
    if (!res) return false;

    AgentType adminAgentType = _data.agents[adminId].atype;
    if (adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if (!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      if (typeEntity.members[memberId] != adminId) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
        return false;

      return true;
    } else if (adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if (!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if (!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
        return false;

      return true;
    }

    return false;
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

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 domainId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = _data.domainReadSlot(domainId);
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId), "Forbidden");
    return domainEntity;
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  }
}
