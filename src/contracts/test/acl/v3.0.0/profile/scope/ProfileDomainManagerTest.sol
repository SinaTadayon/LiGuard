// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IProfileDomainManagementTest.sol";
import "../IProfileACLTest.sol";
import "../IProfileACLGeneralsTest.sol";
import "../ProfileAccessControlTest.sol";
import "../../ACLStorageTest.sol";
import "../../lib/LProfileStorageTest.sol";
import "../../lib/LACLStorageTest.sol";
import "../../lib/LACLUtilsTest.sol";
import "../../lib/LProfileCommonsTest.sol";
import "../../../../../lib/struct/LEnumerableSet.sol";
import "../../../../../proxy/IProxy.sol";
import "../../../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileDomainManagerTest is ACLStorageTest, BaseUUPSProxy, IProfileDomainManagementTest {
  using LACLStorageTest for DataCollection;
  using LProfileStorageTest for ProfileEntity;
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
    return interfaceId == type(IProfileDomainManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function profileDomainRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileDomainRegisterRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainRegister.selector);

    // check profile and domain limitations and update it
    LProfileCommonsTest.profileCheckMemberForDomainRegister(profileEntity, uint16(requests.length), senderId);

    // fetch scope type and scope id of sender
    bytes32 senderScopeId = _doGetMemberScopeInfoFromType(
      profileEntity,
      _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      senderId
    );
    require(senderScopeId == _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");

    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LProfileCommonsTest.profileDomainRegister(profileEntity, requests[i], functionEntity, senderId);
      emit ProfileDomainRegistered(sender, profileId, newDomainId, requests[i].adminId);
    }

    return true;
  }

  function profileDomainUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainUpdateActivityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(requests[i].entityId);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");

      IProfileACLTest.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        domainEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      domainEntity.bs.acstat = requests[i].acstat;
      emit ProfileDomainActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileDomainUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainUpdateAlterabilityStatus.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(requests[i].entityId);
      require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");

      IProfileACLTest.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        domainEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      domainEntity.bs.alstat = requests[i].alstat;
      emit ProfileDomainAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileDomainUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainUpdateAdmin.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].entityId,
        senderId
      );

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(profileEntity.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(profileEntity, requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = profileEntity.scopes[_LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID].adminId;
      }

      emit ProfileDomainAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profileDomainMoveRealm(
    ProfileMemberSignature calldata memberSign,
    ProfileDomainMoveRealmRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainMoveRealm.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileDomainMoveRealm(requests[i], profileEntity, functionEntity, profileId, senderId, sender);
    }
    return true;
  }

  function profileDomainUpdateRealmLimit(
    ProfileMemberSignature calldata memberSign,
    ProfileDomainUpdateRealmLimitRequest[] calldata requests
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainUpdateRealmLimit.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(
        profileEntity,
        functionEntity,
        requests[i].domainId,
        senderId
      );
      require(requests[i].realmLimit > domainEntity.realms.length(), "Illegal Limit");
      domainEntity.realmLimit = requests[i].realmLimit;
      emit ProfileDomainRealmLimitUpdated(sender, profileId, requests[i].domainId, requests[i].realmLimit);
    }
    return true;
  }

  function profileDomainRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata domains)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileDomainManagementTest.profileDomainRemove.selector);
    for (uint256 i = 0; i < domains.length; i++) {
      DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(domains[i]);
      IProfileACLTest.ProfileAdminAccessStatus status = _doCheckAdminAccess(
        profileEntity,
        functionEntity,
        domainEntity.bs.adminId,
        senderId
      );
      if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);

      require(domainEntity.realms.length() == 0, "Illegal Remove");
      if (domainEntity.bs.referredByAgent == 0) {
        // check universe
        UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(domainEntity.universeId);
        require(universeEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
        universeEntity.domains.remove(domains[i]);

        delete domainEntity.bs;
        delete domainEntity.universeId;
        delete domainEntity.realmLimit;
        delete domainEntity.name;
        delete domainEntity.realms;
        emit ProfileDomainRemoved(sender, profileId, domains[i], false);
      } else {
        require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        domainEntity.bs.acstat = ActivityStatus.DELETED;
        emit ProfileDomainRemoved(sender, profileId, domains[i], true);
      }
    }
    return true;
  }

  function profileDomainCheckId(bytes32 profileId, bytes32 domainId) external view returns (bool) {
    return _data.profiles[profileId].scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function profileDomainCheckName(bytes32 profileId, string calldata domainName) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtilsTest.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function profileDomainCheckAdmin(
    bytes32 profileId,
    bytes32 domainId,
    address account
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (DomainEntity storage domainEntity, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if (!result) return false;

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = profileEntity.agents[domainAdminId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = profileEntity.profileRoleTryReadSlot(domainAdminId);
      if (!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == domainAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(domainAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileDomainHasFunction(
    bytes32 profileId,
    bytes32 domainId,
    bytes32 functionId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(fe.contextId);
    if (!result1) return false;

    (RealmEntity storage re, bool result2) = profileEntity.profileRealmTryReadSlot(ce.realmId);
    if (!result2) return false;

    return re.domainId == domainId;
  }

  function profileDomainHasContext(
    bytes32 profileId,
    bytes32 domainId,
    bytes32 contextId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(contextId);
    if (!result1) return false;

    (RealmEntity storage re, bool result2) = profileEntity.profileRealmTryReadSlot(ce.realmId);
    if (!result2) return false;

    return re.domainId == domainId;
  }

  function profileDomainHasRealm(
    bytes32 profileId,
    bytes32 domainId,
    bytes32 realmId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if (!result) return false;
    return de.realms.contains(realmId);
  }

  function profileDomainGetRealms(bytes32 profileId, bytes32 domainId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if (!result) return new bytes32[](0);
    return de.realms.values();
  }

  function profileDomainGetInfo(bytes32 profileId, bytes32 domainId) external view returns (ProfileDomainInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if (!result || profileEntity.acstat == ActivityStatus.NONE) {
      return
        ProfileDomainInfo({
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
      ProfileDomainInfo({
        adminId: de.bs.adminId,
        universeId: de.universeId,
        realmLimit: de.realmLimit,
        realmCount: uint16(de.realms.length()),
        referredByAgent: de.bs.referredByAgent,
        adminType: profileEntity.agents[de.bs.adminId].atype,
        stype: de.bs.stype,
        acstat: de.bs.acstat,
        alstat: de.bs.alstat,
        name: de.name
      });
  }

  function _doCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) internal view returns (IProfileACLTest.ProfileAdminAccessStatus) {
    return LProfileCommonsTest.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      return roleEntity.scopeId;
    } else if (atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);
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
      signer = LACLUtilsTest.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    bytes32 profileId = LACLUtilsTest.generateId(memberSign.profileName);
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtilsTest.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtilsTest.accountGenerateId(signer);

    ProfileAccessControlTest(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);

    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 domainId,
    bytes32 senderId
  ) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(domainId);
    require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACLTest.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      domainEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
    return domainEntity;
  }

  // function _doGetRealmEntityAndCheckAdminAccess(
  //   ProfileEntity storage profileEntity,
  //   FunctionEntity storage functionEntity,
  //   bytes32 realmId,
  //   bytes32 senderId
  // ) internal view returns (RealmEntity storage) {
  //   RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realmId);
  //   require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
  //   IProfileACLTest.ProfileAdminAccessStatus status = _doCheckAdminAccess(
  //     profileEntity,
  //     functionEntity,
  //     realmEntity.bs.adminId,
  //     senderId
  //   );
  //   if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
  //   return realmEntity;
  // }

  function _doGetMemberScopeInfoFromType(
    ProfileEntity storage profileEntity,
    bytes32 typeId,
    bytes32 senderId
  ) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  }

  function _doProfileDomainMoveRealm(
    ProfileDomainMoveRealmRequest calldata request,
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId,
    address sender
  ) internal {
    DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.domainId,
      senderId
    );
    require(domainEntity.realms.contains(request.realmId), "Realm Not Found");
    DomainEntity storage targetDomainEntity = _doGetEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.targetDomainId,
      senderId
    );

    RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(request.realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(realmEntity.bs.referredByAgent == 0, "Illegal Referred");

    bytes32 realmAdminScopeId = _doAgentGetScopeInfo(profileEntity, realmEntity.bs.adminId);
    require(
      IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(
        profileId,
        realmAdminScopeId,
        request.targetDomainId
      ),
      "Illegal Admin Scope"
    );
    require(targetDomainEntity.realmLimit > targetDomainEntity.realms.length(), "Illegal Move");

    domainEntity.realms.remove(request.realmId);
    targetDomainEntity.realms.add(request.realmId);
    realmEntity.domainId = request.targetDomainId;
    emit ProfileDomainRealmMoved(sender, profileId, request.domainId, request.realmId, request.targetDomainId);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommonsTest);
  }
}
