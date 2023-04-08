// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./IProfileUniverseManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Universe Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileUniverseManager is ACLStorage, BaseUUPSProxy, IProfileUniverseManagement {
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
    return interfaceId == type(IProfileUniverseManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function profileUniverseUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ActivityStatus acstat)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermissionActivity(memberSign, IProfileUniverseManagement.profileUniverseUpdateActivityStatus.selector);
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(acstat > ActivityStatus.DELETED, "Illegal Activity");
    universeEntity.bs.acstat = acstat;
    emit ProfileUniverseActivityUpdated(sender, profileId, _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, acstat);
    return true;
  }

  function profileUniverseUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    AlterabilityStatus alstat
  ) external returns (bool) {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileUniverseManagement.profileUniverseUpdateAlterabilityStatus.selector);
    UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(
      _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      universeEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    universeEntity.bs.alstat = alstat;
    emit ProfileUniverseAlterabilityUpdated(sender, profileId, _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, alstat);
    return true;
  }

  function profileUniverseUpdateAdmin(ProfileMemberSignature calldata memberSign, bytes32 adminId)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileUniverseManagement.profileUniverseUpdateAdmin.selector);
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(adminId != universeEntity.bs.adminId && adminId != bytes32(0), "Illegal AdminId");
    BaseAgent storage adminBaseAgent = profileEntity.agents[adminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage profileAdminType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
      require(profileAdminType.roles.contains(adminId), "Not Found");
    } else {
      require(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID == adminId, "Illegal Admin");
    }

    universeEntity.bs.adminId = adminId;
    emit ProfileUniverseAdminUpdated(sender, profileId, _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, adminId);

    return true;
  }

  function profileUniverseUpdateDomainLimit(ProfileMemberSignature calldata memberSign, uint16 domainLimit)
    external
    returns (bool)
  {
    (
      ProfileEntity storage profileEntity,
      FunctionEntity storage functionEntity,
      bytes32 profileId,
      bytes32 senderId,
      address sender
    ) = _accessPermission(memberSign, IProfileUniverseManagement.profileUniverseUpdateDomainLimit.selector);
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(domainLimit > universeEntity.domains.length(), "Illegal Limit");
    universeEntity.domainLimit = domainLimit;
    emit ProfileUniverseDomainLimitUpdated(sender, profileId, _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, domainLimit);
    return true;
  }

  function profileUniverseCheckAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage profileAdminType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    return profileAdminType.members[memberId] != bytes32(0);
  }

  function profileUniverseHasFunction(bytes32 profileId, bytes32 functionId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileFunctionTryReadSlot(functionId);
  }

  function profileUniverseHasContext(bytes32 profileId, bytes32 contextId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileContextTryReadSlot(contextId);
  }

  function profileUniverseHasRealm(bytes32 profileId, bytes32 realmId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileRealmTryReadSlot(realmId);
  }

  function profileUniverseHasDomain(bytes32 profileId, bytes32 domainId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileDomainTryReadSlot(domainId);
  }

  function profileUniverseHasPolicy(bytes32 profileId, bytes32 policyId) external view returns (bool) {
    return _data.profiles[profileId].policies[policyId].adminId != bytes32(0);
  }

  function profileUniverseHasType(bytes32 profileId, bytes32 typeId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileTypeTryReadSlot(typeId);
  }

  function profileUniverseHasRole(bytes32 profileId, bytes32 roleId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileRoleTryReadSlot(roleId);
  }

  function profileUniverseHasMember(bytes32 profileId, bytes32 memberId) external view returns (bool result) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (,result) = profileEntity.profileMemberTryReadSlot(memberId);
  }

  function profileUniverseGetDomains(bytes32 profileId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(
      _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );
    return universeEntity.domains.values();
  }

  function profileUniverseGetInfo(bytes32 profileId) external view returns (ProfileUniverseInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(
      _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );

    if (profileEntity.acstat == ActivityStatus.NONE) {
      return
        ProfileUniverseInfo({
          id: bytes32(0),
          adminId: bytes32(0),
          domainLimit: 0,
          domainCount: 0,
          referredByAgent: 0,
          stype: ScopeType.NONE,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE,
          adminType: AgentType.NONE
        });
    }

    return
      ProfileUniverseInfo({
        id: _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID,
        adminId: universeEntity.bs.adminId,
        domainLimit: universeEntity.domainLimit,
        domainCount: uint16(universeEntity.domains.length()),
        referredByAgent: universeEntity.bs.referredByAgent,
        stype: universeEntity.bs.stype,
        adminType: profileEntity.agents[universeEntity.bs.adminId].atype,
        acstat: universeEntity.bs.acstat,
        alstat: universeEntity.bs.alstat
      });
  }

  function _doCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
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

  function _accessPermissionActivity(ProfileMemberSignature calldata memberSign, bytes4 selector)
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);

    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);
    if (!res) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_NOT_FOUND);

    _doAclHasAccess(profileEntity, functionEntity, senderId);
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 senderId
  ) internal view returns (UniverseEntity storage) {
    UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(
      _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );
    require(universeEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(
      profileEntity,
      functionEntity,
      universeEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return universeEntity;
  }

  function _doAclHasAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 memberId
  ) internal {
    if (profileEntity.limits.profileCallLimit > 0) {
      unchecked {
        profileEntity.limits.profileCallLimit -= 1;
      }
    } else {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN);
    }

    AgentType atype = profileEntity.agents[functionEntity.agentId].atype;

    if (atype == AgentType.ROLE) {
      // check member activation
      (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
        memberId
      );
      if (!result0)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
      if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
      if (profileEntity.owner != profileMemberEntity.account) {
        if (profileMemberEntity.callLimit > 0) {
          unchecked {
            profileMemberEntity.callLimit -= 1;
          }
        } else {
          LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
        }
      }

      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      if (!result1) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND);
      if (roleEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
      // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId)
      //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result2) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND);
      if (typeEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED);

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN);
    } else if (atype == AgentType.TYPE) {
      if (functionEntity.agentId == _LIVELY_PROFILE_ANY_TYPE_ID) {
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
          memberId
        );
        if (!result0)
          LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
        if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
          LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
        if (profileEntity.owner != profileMemberEntity.account) {
          if (profileMemberEntity.callLimit > 0) {
            unchecked {
              profileMemberEntity.callLimit -= 1;
            }
          } else {
            LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
          }
        }
      } else if (functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        _doCheckTypeAccess(profileEntity, functionEntity, memberId);
      }
    } else if (atype <= AgentType.MEMBER) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED);
    }

    // check function activity
    if (functionEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN);

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    if (!res1) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_NOT_FOUND);
    if (contextEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN);

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    if (!res2) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_NOT_FOUND);
    if (realmEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN);

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    if (!res3) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_NOT_FOUND);
    if (domainEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN);

    // check universe activity
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    if (universeEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN);
  }

  function _doCheckTypeAccess(
    ProfileEntity storage profileEntity,
    FunctionEntity storage functionEntity,
    bytes32 memberId
  ) internal {
    // check member activation
    (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
    if (!result0) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
    if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
    if (profileEntity.owner != profileMemberEntity.account) {
      if (profileMemberEntity.callLimit > 0) {
        unchecked {
          profileMemberEntity.callLimit -= 1;
        }
      } else {
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
      }
    }

    // check type activation
    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
    if (!result1) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND);
    if (typeEntity.ba.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

    // check role activation
    bytes32 roleId = typeEntity.members[memberId];
    (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    if (!result2) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND);
    if (roleEntity.ba.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
    // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId)
    //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);

    // check policy activation
    PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }
}
