// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./LACLUtilsTest.sol";
import "./LACLStorageTest.sol";
import "./LProfileStorageTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../IACLCommonsTest.sol";
import "../IACLGeneralsTest.sol";
import "../IACLManagerTest.sol";
import "../ACLStorageTest.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/IERC1822.sol";
import "../../../../utils/IERC165.sol";
import "../IACLTest.sol";
import "../agent/IRoleManagementTest.sol";
import "../profile/IProfileACLTest.sol";
import "../profile/IProfileACLGeneralsTest.sol";
import "../profile/IProfileManagementTest.sol";

/**
 * @title ACL Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLCommonsTest {
  using LProfileStorageTest for IACLCommonsTest.ProfileEntity;
  using LACLStorageTest for ACLStorageTest.DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LACLCommonsTest";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER"));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER"));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER"));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER"));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER"));

  // Universe Scope ID
  bytes32 private constant LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID = keccak256(abi.encodePacked("UNIVERSE.LIVELY_VERSE"));

  // General Roles ID
  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN"));

  // Profile Commons
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID =
    keccak256(abi.encodePacked("UNIVERSE.LIVELY_PROFILE"));

  // ACL Type
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER"));

  function registerProxyFacet(ACLStorageTest.DataCollection storage data, address implementation) external {
    data.facetSet.add(address(this));
    IACLCommonsTest.FacetEntity storage facetEntity = data.facets[address(this)];
    facetEntity.subjectId = implementation;
    data.selectors[IProxy.upgradeTo.selector] = address(this);
    data.selectors[IProxy.setSafeModeStatus.selector] = address(this);
    data.selectors[IProxy.setUpdatabilityStatus.selector] = address(this);
    data.selectors[IProxy.setLocalAdmin.selector] = address(this);
    data.selectors[IProxy.setAccessControlManager.selector] = address(this);
    data.selectors[IProxy.contractName.selector] = address(this);
    data.selectors[IProxy.contractVersion.selector] = address(this);
    data.selectors[IProxy.accessControlManager.selector] = address(this);
    data.selectors[IProxy.subjectAddress.selector] = address(this);
    data.selectors[IProxy.safeModeStatus.selector] = address(this);
    data.selectors[IProxy.updatabilityStatus.selector] = address(this);
    data.selectors[IProxy.localAdmin.selector] = address(this);
    data.selectors[IProxy.domainSeparator.selector] = address(this);
    data.selectors[IProxy.initVersion.selector] = address(this);
    data.selectors[IProxy.withdrawBalance.selector] = address(this);
    data.selectors[IERC165.supportsInterface.selector] = address(this);
    data.selectors[IACLManagerTest.aclRegisterFacet.selector] = address(this);
    data.selectors[IACLManagerTest.aclUpgradeFacet.selector] = address(this);
    data.selectors[IACLManagerTest.aclGetFacets.selector] = address(this);
    data.selectors[IACLManagerTest.aclGetFacet.selector] = address(this);
    data.selectors[IACLManagerTest.aclHasSelector.selector] = address(this);
    data.selectors[IACLManagerTest.aclGetFacetInfo.selector] = address(this);
    data.selectors[IERC1822Proxiable.proxiableUUID.selector] = address(this);
    data.selectors[bytes4(keccak256("initialize(string,string)"))] = address(this);
    data.selectors[bytes4(keccak256("initACL(address,address,address,address)"))] = address(this);
    data.selectors[bytes4(keccak256("getFirstInit()"))] = address(this);
    data.selectors[bytes4(keccak256("getLibrary()"))] = address(this);
  }

  function aclRegisterFacet(ACLStorageTest.DataCollection storage data, IACLManagerTest.FacetRegisterRequest calldata request)
    external
    returns (bool)
  {
    require(!data.facetSet.contains(request.facetId), "Facet Already Exist");
    for (uint256 j = 0; j < request.selectors.length; j++) {
      require(data.selectors[request.selectors[j]] == address(0), "Illegal Selector");
      data.selectors[request.selectors[j]] = request.facetId;
    }
    data.facetSet.add(request.facetId);
    IACLCommonsTest.FacetEntity storage facetEntity = data.facets[request.facetId];
    facetEntity.subjectId = request.subjectId;

    return true;
  }

  function initACLAgents(
    ACLStorageTest.DataCollection storage data,
    address livelyAdmin,
    address systemAdmin
  ) public {
    _initACLAgents(data, livelyAdmin, systemAdmin);
  }

  function checkAdminAccess(
    ACLStorageTest.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) external view returns (IACLTest.AdminAccessStatus) {
    return _doCheckAdminAccess(data, adminId, memberId, functionId);
  }

  function getCheckUpdateRequestScope(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType
  ) external returns (IACLCommonsTest.BaseScope storage) {
    // checking requested type scope
    IACLCommonsTest.BaseScope storage requestedScope = data.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestedScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;

    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(IACLGeneralsTest(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Scope");
    }

    return requestedScope;
  }

  function profileCheckAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    address account
  ) external view returns (bool) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) return false;

    bytes32 profileAdminId = profileEntity.adminId;
    IACLCommonsTest.AgentType agentType = data.agents[profileAdminId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (agentType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(profileAdminId);
      if (!result) return false;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == profileAdminId;
    } else if (agentType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(profileAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileUpdateOwnerAccount(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfileManagementTest.ProfileUpdateOwnerAccountRequest calldata request
  ) external returns (bool) {
    // disable profile owner
    bytes32 ownerId = LACLUtilsTest.accountGenerateId(profileEntity.owner);
    bytes32 newOwnerId = LACLUtilsTest.accountGenerateId(request.newOwner);

    // check new ownerId
    require(profileEntity.agents[newOwnerId].acstat == IACLCommonsTest.ActivityStatus.NONE, "Already Exists");

    // remove old owner
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(ownerId);
    profileMemberEntity.ba.acstat = IACLCommonsTest.ActivityStatus.DISABLED;
    profileMemberEntity.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;
    profileEntity.admins.remove(ownerId);

    // remove from profileAccount
    IACLCommonsTest.ProfileAccount storage profileAccount = data.profileAccounts[profileEntity.owner];
    for (uint256 j = 0; j < profileAccount.profiles.length; j++) {
      if (profileAccount.profiles[j] == request.profileId) {
        if (profileAccount.profiles.length > 1) {
          if (j < profileAccount.profiles.length - 1)
            profileAccount.profiles[j] = profileAccount.profiles[profileAccount.profiles.length - 1];
          profileAccount.profiles.pop();
        } else {
          profileAccount.profiles.pop();
          delete profileAccount.profiles;
        }
        break;
      }
    }

    // add profile's new owner
    _doCreateUpdateProfileAccount(data, request.profileId, request.newOwner);

    // Create Owner Member
    IACLCommonsTest.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(newOwnerId);
    ownerMember.account = request.newOwner;
    ownerMember.typeLimit = profileEntity.limits.typeLimit;
    ownerMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    ownerMember.registerLimits = profileEntity.registerLimits;
    ownerMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    ownerMember.ba.atype = IACLCommonsTest.AgentType.MEMBER;
    ownerMember.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    ownerMember.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    ownerMember.types.add(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);

    profileEntity.owner = request.newOwner;
    profileEntity.admins.add(newOwnerId);

    // update profile lively master type
    IACLCommonsTest.TypeEntity storage livelyMasterType = profileEntity.profileTypeReadSlot(
      LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID
    );
    delete livelyMasterType.members[ownerId];
    livelyMasterType.members[newOwnerId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    return true;
  }

  function createUpdateProfileAccount(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    address memberAddress
  ) external {
    _doCreateUpdateProfileAccount(data, profileId, memberAddress);
  }

  function profileRegister(
    ACLStorageTest.DataCollection storage data,
    IProfileManagementTest.ProfileRegisterRequest calldata request,
    bytes32 signerId,
    bytes32 profileId,
    bytes32 functionId
  ) external returns (bytes32) {
    // fetch scope type and scope id of sender
    (IACLCommonsTest.ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeFromType(
      data,
      LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      signerId
    );
    require(
      signerScopeType == IACLCommonsTest.ScopeType.UNIVERSE && signerScopeId == LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
      "Illegal Scope"
    );
    require(request.limits.typeLimit >= 1, "Illegal TypeLimit");

    _doCreateUpdateProfileAccount(data, profileId, request.profileOwner);
    _doCreateUpdateProfileAccount(data, profileId, request.profileSystemAdmin);

    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    profileEntity.name = request.name;
    profileEntity.owner = request.profileOwner;
    profileEntity.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    profileEntity.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    profileEntity.registerLimits = request.registerLimits;
    profileEntity.limits = request.limits;
    profileEntity.admins.add(LACLUtilsTest.accountGenerateId(request.profileOwner));

    // check adminId
    if (request.adminId != bytes32(0)) {
      require(data.agents[request.adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");
      (, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(data, request.adminId);
      require(requestAdminScopeId == LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      IACLTest.AdminAccessStatus adminAccessStatus = _doCheckAdminAccess(
        data,
        LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
        signerId,
        functionId
      );
      if (adminAccessStatus != IACLTest.AdminAccessStatus.PERMITTED) revert IACLTest.SetAdminForbidden(adminAccessStatus);
      profileEntity.adminId = request.adminId;
    } else {
      profileEntity.adminId = LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
    }

    _doInitProfile(profileEntity, request.profileOwner, request.profileSystemAdmin);
    return profileEntity.adminId;
  }

  function realmGetAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeAdmin,
    bytes32 domainId,
    bytes32 adminId
  ) external view returns (bytes32 realmAdminId) {
    // checking requested context admin
    if (adminId != bytes32(0)) {
      require(data.agents[adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(data, adminId);
      require(IACLCommonsTest.ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommonsTest.ScopeType.DOMAIN == requestAdminScopeType) {
        require(requestAdminScopeId == domainId, "Illegal Admin Scope");
      } else {
        require(requestAdminScopeId == LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      }
      realmAdminId = adminId;
    } else {
      realmAdminId = requestScopeAdmin;
    }
  }

  function _doAgentGetScopeInfo(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    private
    view
    returns (IACLCommonsTest.ScopeType, bytes32)
  {
    IACLCommonsTest.AgentType atype = data.agents[agentId].atype;
    if (atype == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = data.roleReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == IACLCommonsTest.AgentType.TYPE) {
      IACLCommonsTest.TypeEntity storage typeEntity = data.typeReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommonsTest.ScopeType.NONE, bytes32(0));
  }

  function _doCheckAdminAccess(
    ACLStorageTest.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) private view returns (IACLTest.AdminAccessStatus) {
    (IACLCommonsTest.FunctionEntity storage functionEntity, bool res) = data.functionTryReadSlot(functionId);
    if (!res) return IACLTest.AdminAccessStatus.FUNCTION_NOT_FOUND;

    IACLCommonsTest.AgentType adminAgentType = data.agents[adminId].atype;
    if (adminAgentType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(adminId);
      if (!result) return IACLTest.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return IACLTest.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      if (typeEntity.members[memberId] != adminId) return IACLTest.AdminAccessStatus.NOT_PERMITTED;

      IACLCommonsTest.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[adminId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACLTest.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACLTest.AdminAccessStatus.PERMITTED;
    } else if (adminAgentType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(adminId);
      if (!result1) return IACLTest.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result2) = data.roleTryReadSlot(roleId);
      if (!result2) return IACLTest.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      IACLCommonsTest.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[roleId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACLTest.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACLTest.AdminAccessStatus.PERMITTED;
    }

    return IACLTest.AdminAccessStatus.NOT_PERMITTED;
  }

  function _doCreateUpdateProfileAccount(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    address memberAddress
  ) private {
    IACLCommonsTest.ProfileAccount storage profileAccount = data.profileAccounts[memberAddress];
    if (profileAccount.profiles.length == 0) {
      IACLCommonsTest.ProfileAccount storage newProfileAccount = data.profileAccounts[memberAddress];
      newProfileAccount.profiles.push(profileId);
    } else {
      require(profileAccount.profiles.length < 16, "Illegal ProfileAccountLimit");
      profileAccount.profiles.push(profileId);
    }
  }

  function _doGetScopeFromType(
    ACLStorageTest.DataCollection storage data,
    bytes32 typeId,
    bytes32 senderId
  ) private view returns (IACLCommonsTest.ScopeType, bytes32) {
    IACLCommonsTest.TypeEntity storage agentType = data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    IACLCommonsTest.RoleEntity storage memberAgentRole = data.roleReadSlot(memberRoleId);
    return (data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doInitProfile(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    address profileOwner,
    address profileSystemAdmin
  ) private {
    // init Universe Scope
    IACLCommonsTest.UniverseEntity storage livelyUniverseEntity = profileEntity.profileUniverseWriteSlot(
      LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );
    livelyUniverseEntity.name = "UNIVERSE.LIVELY_PROFILE";
    livelyUniverseEntity.domainLimit = profileEntity.limits.domainLimit;
    livelyUniverseEntity.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyUniverseEntity.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyUniverseEntity.bs.stype = IACLCommonsTest.ScopeType.UNIVERSE;
    livelyUniverseEntity.bs.adminId = LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;

    // Create Any Type
    IACLCommonsTest.TypeEntity storage anyType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_ANY_TYPE_ID);
    anyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
    anyType.roleLimit = 0;
    anyType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    anyType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anyType.ba.atype = IACLCommonsTest.AgentType.TYPE;
    anyType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    anyType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;

    // Create Lively Master Type
    IACLCommonsTest.TypeEntity storage livelyMasterType = profileEntity.profileTypeWriteSlot(
      LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID
    );
    livelyMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
    livelyMasterType.roleLimit = profileEntity.limits.typeRoleLimit > 1 ? profileEntity.limits.typeRoleLimit : 1;
    livelyMasterType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    livelyMasterType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
    livelyMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);

    // Create Lively Master Admin Role
    IACLCommonsTest.RoleEntity storage livelyMasterAdminRole = profileEntity.profileRoleWriteSlot(
      LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID
    );
    livelyMasterAdminRole.name = "ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN";
    livelyMasterAdminRole.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    livelyMasterAdminRole.typeId = LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = profileEntity.limits.memberLimit > 1 ? profileEntity.limits.memberLimit : 1;
    livelyMasterAdminRole.memberCount = 1;
    livelyMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Owner Member
    bytes32 ownerMemberId = LACLUtilsTest.accountGenerateId(profileOwner);
    IACLCommonsTest.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(ownerMemberId);
    ownerMember.account = profileOwner;
    ownerMember.typeLimit = profileEntity.limits.typeLimit;
    ownerMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    ownerMember.registerLimits = profileEntity.registerLimits;
    ownerMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    ownerMember.ba.atype = IACLCommonsTest.AgentType.MEMBER;
    ownerMember.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    ownerMember.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;

    // bind Lively Master Admin Member to Admin role of Lively,
    ownerMember.types.add(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    // livelyMasterType.members[livelyMasterAdminMemberId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.members[ownerMemberId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    _doInitProfileSystemMaster(profileEntity, profileSystemAdmin);

    // update livelyUniverseEntity.bs.referredByAgent
    livelyUniverseEntity.bs.referredByAgent = 5;
  }

  function _doInitProfileSystemMaster(IACLCommonsTest.ProfileEntity storage profileEntity, address profileSystemAdmin)
    private
  {
    // Create System Master Type
    IACLCommonsTest.TypeEntity storage systemMasterType = profileEntity.profileTypeWriteSlot(
      LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID
    );
    systemMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
    systemMasterType.roleLimit = profileEntity.limits.typeRoleLimit > 1 ? profileEntity.limits.typeRoleLimit : 1;
    systemMasterType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    systemMasterType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
    systemMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    systemMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    systemMasterType.roles.add(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);

    // Create System Master Admin Role
    IACLCommonsTest.RoleEntity storage systemMasterAdminRole = profileEntity.profileRoleWriteSlot(
      LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID
    );
    systemMasterAdminRole.name = "ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN";
    systemMasterAdminRole.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    systemMasterAdminRole.typeId = LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID;
    systemMasterAdminRole.memberLimit = profileEntity.limits.memberLimit > 1 ? profileEntity.limits.memberLimit : 1;
    systemMasterAdminRole.memberCount = 1;
    systemMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
    systemMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    systemMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    systemMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create System Master Admin Member
    bytes32 systemMasterAdminMemberId = LACLUtilsTest.accountGenerateId(profileSystemAdmin);
    IACLCommonsTest.ProfileMemberEntity storage systemMasterAdminMember = profileEntity.profileMemberWriteSlot(
      systemMasterAdminMemberId
    );
    systemMasterAdminMember.typeLimit = profileEntity.limits.typeLimit;
    systemMasterAdminMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    systemMasterAdminMember.registerLimits = IACLCommonsTest.ProfileRegisterLimit({
      memberRegisterLimit: 0,
      roleRegisterLimit: 0,
      typeRegisterLimit: 0,
      functionRegisterLimit: profileEntity.registerLimits.functionRegisterLimit,
      contextRegisterLimit: profileEntity.registerLimits.contextRegisterLimit,
      realmRegisterLimit: 0,
      domainRegisterLimit: 0,
      policyRegisterLimit: 0
    });
    systemMasterAdminMember.account = profileSystemAdmin;
    systemMasterAdminMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterAdminMember.ba.atype = IACLCommonsTest.AgentType.MEMBER;
    systemMasterAdminMember.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    systemMasterAdminMember.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    systemMasterAdminMember.types.add(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    systemMasterType.members[systemMasterAdminMemberId] = LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID;
  }

  function _initACLAgents(
    ACLStorageTest.DataCollection storage data,
    address livelyAdmin,
    address systemAdmin
  ) private {
    // init Universe Scope
    IACLCommonsTest.UniverseEntity storage livelyUniverseEntity = data.universeWriteSlot(
      LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID
    );
    livelyUniverseEntity.name = "UNIVERSE.LIVELY_VERSE";
    livelyUniverseEntity.domainLimit = type(uint16).max;
    livelyUniverseEntity.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyUniverseEntity.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyUniverseEntity.bs.stype = IACLCommonsTest.ScopeType.UNIVERSE;
    livelyUniverseEntity.bs.adminId = LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type
    IACLCommonsTest.TypeEntity storage livelyMasterType = data.typeWriteSlot(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MASTER";
    livelyMasterType.roleLimit = type(uint16).max;
    livelyMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
    livelyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
    livelyMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);

    // Create Lively Master Admin Role
    IACLCommonsTest.RoleEntity storage livelyMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN";
    livelyMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
    livelyMasterAdminRole.typeId = LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = type(uint24).max;
    livelyMasterAdminRole.memberCount = 1;
    livelyMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = LACLUtilsTest.accountGenerateId(livelyAdmin);
    IACLCommonsTest.MemberEntity storage livelyMasterAdminMember = data.memberWriteSlot(livelyMasterAdminMemberId);
    livelyMasterAdminMember.account = livelyAdmin;
    livelyMasterAdminMember.limits = IACLCommonsTest.GeneralLimit({
      memberLimit: type(uint24).max,
      memberRegisterLimit: type(uint16).max,
      contextRegisterLimit: type(uint16).max,
      functionRegisterLimit: type(uint16).max,
      profileRegisterLimit: type(uint16).max,
      contextLimit: type(uint16).max,
      realmLimit: type(uint16).max,
      domainLimit: type(uint16).max,
      callLimit: type(uint16).max,
      typeRoleLimit: type(uint16).max,
      typeLimit: type(uint16).max,
      roleRegisterLimit: type(uint8).max,
      typeRegisterLimit: type(uint8).max,
      realmRegisterLimit: type(uint8).max,
      domainRegisterLimit: type(uint8).max,
      policyRegisterLimit: type(uint8).max,
      policyRoleLimit: type(uint8).max,
      functionLimit: type(uint8).max
    });

    livelyMasterAdminMember.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = IACLCommonsTest.AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Type, Member, Profile and Policy types
    livelyMasterAdminMember.types.add(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);

    livelyMasterAdminMember.types.add(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    {
      // Create Profile Any Type
      IACLCommonsTest.TypeEntity storage profileAnyType = data.typeWriteSlot(LIVELY_PROFILE_ANY_TYPE_ID);
      profileAnyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
      profileAnyType.roleLimit = 0;
      profileAnyType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
      profileAnyType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileAnyType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      profileAnyType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      profileAnyType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;

      // Create Profile Lively Master Type
      IACLCommonsTest.TypeEntity storage profileLivelyMasterType = data.typeWriteSlot(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
      profileLivelyMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
      profileLivelyMasterType.roleLimit = 0;
      profileLivelyMasterType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
      profileLivelyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileLivelyMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      profileLivelyMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      profileLivelyMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;

      // Create Profile System Master Type
      IACLCommonsTest.TypeEntity storage profileSystemMasterType = data.typeWriteSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
      profileSystemMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
      profileSystemMasterType.roleLimit = 0;
      profileSystemMasterType.scopeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
      profileSystemMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileSystemMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      profileSystemMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      profileSystemMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;
    }

    {
      // Create System Master Type
      IACLCommonsTest.TypeEntity storage systemMasterType = data.typeWriteSlot(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
      systemMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER";
      systemMasterType.roleLimit = type(uint16).max;
      systemMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      systemMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      systemMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      systemMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      systemMasterType.roles.add(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

      // Create System Master Admin Role
      IACLCommonsTest.RoleEntity storage systemMasterAdminRole = data.roleWriteSlot(
        LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
      );
      systemMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN";
      systemMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      systemMasterAdminRole.typeId = LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
      systemMasterAdminRole.memberLimit = type(uint24).max;
      systemMasterAdminRole.memberCount = 1;
      systemMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      systemMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      systemMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      systemMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create System Master Admin Member
      bytes32 systemMasterAdminMemberId = LACLUtilsTest.accountGenerateId(systemAdmin);
      IACLCommonsTest.MemberEntity storage systemMasterAdminMember = data.memberWriteSlot(systemMasterAdminMemberId);

      systemMasterAdminMember.limits = IACLCommonsTest.GeneralLimit({
        memberLimit: 1024,
        memberRegisterLimit: 0,
        contextRegisterLimit: 128,
        functionRegisterLimit: type(uint16).max,
        profileRegisterLimit: 0,
        contextLimit: type(uint16).max,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: type(uint16).max,
        typeRoleLimit: type(uint8).max,
        typeLimit: type(uint8).max,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: type(uint8).max,
        functionLimit: type(uint8).max
      });

      systemMasterAdminMember.account = systemAdmin;
      systemMasterAdminMember.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterAdminMember.ba.atype = IACLCommonsTest.AgentType.MEMBER;
      systemMasterAdminMember.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      systemMasterAdminMember.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      systemMasterAdminMember.types.add(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);

      // bind Lively Master Admin Member to Admin role
      systemMasterType.members[systemMasterAdminMemberId] = LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;
    }

    {
      // Create Scope Master Type
      IACLCommonsTest.TypeEntity storage scopeMasterType = data.typeWriteSlot(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
      scopeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER";
      scopeMasterType.roleLimit = type(uint16).max;
      scopeMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      scopeMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      scopeMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      scopeMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      scopeMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      scopeMasterType.roles.add(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;

      // Create Scope Master Admin Role
      IACLCommonsTest.RoleEntity storage scopeMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN";
      scopeMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      scopeMasterAdminRole.typeId = LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
      scopeMasterAdminRole.memberLimit = type(uint24).max;
      scopeMasterAdminRole.memberCount = 1;
      scopeMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      scopeMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      scopeMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      scopeMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create Type Master Type
      IACLCommonsTest.TypeEntity storage typeMasterType = data.typeWriteSlot(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
      typeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER";
      typeMasterType.roleLimit = type(uint16).max;
      typeMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      typeMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      typeMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      typeMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      typeMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      typeMasterType.roles.add(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID;

      // Create Type Master Admin Role
      IACLCommonsTest.RoleEntity storage typeMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN";
      typeMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      typeMasterAdminRole.typeId = LIVELY_VERSE_TYPE_MASTER_TYPE_ID;
      typeMasterAdminRole.memberLimit = type(uint24).max;
      typeMasterAdminRole.memberCount = 1;
      typeMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      typeMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      typeMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      typeMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }

    {
      // Create Member Master Type
      IACLCommonsTest.TypeEntity storage memberMasterType = data.typeWriteSlot(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
      memberMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER";
      memberMasterType.roleLimit = type(uint16).max;
      memberMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      memberMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      memberMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      memberMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      memberMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      memberMasterType.roles.add(LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
      memberMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID;

      // Create Member Master Admin Role
      IACLCommonsTest.RoleEntity storage memberMasterAdminRole = data.roleWriteSlot(
        LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID
      );
      memberMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN";
      memberMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      memberMasterAdminRole.typeId = LIVELY_VERSE_MEMBER_MASTER_TYPE_ID;
      memberMasterAdminRole.memberLimit = type(uint24).max;
      memberMasterAdminRole.memberCount = 1;
      memberMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      memberMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      memberMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      memberMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }

    {
      // Create Policy Master Type
      IACLCommonsTest.TypeEntity storage policyMasterType = data.typeWriteSlot(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
      policyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER";
      policyMasterType.roleLimit = type(uint16).max;
      policyMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      policyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      policyMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      policyMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      policyMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      policyMasterType.roles.add(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      policyMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;

      // Create Policy Master Admin Role
      IACLCommonsTest.RoleEntity storage policyMasterAdminRole = data.roleWriteSlot(
        LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID
      );
      policyMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN";
      policyMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      policyMasterAdminRole.typeId = LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
      policyMasterAdminRole.memberLimit = type(uint24).max;
      policyMasterAdminRole.memberCount = 1;
      policyMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      policyMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      policyMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      policyMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create Profile Master Type
      IACLCommonsTest.TypeEntity storage profileMasterType = data.typeWriteSlot(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
      profileMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER";
      profileMasterType.roleLimit = type(uint16).max;
      profileMasterType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      profileMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileMasterType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      profileMasterType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      profileMasterType.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      profileMasterType.roles.add(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      profileMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID;

      // Create Profile Master Admin Role
      IACLCommonsTest.RoleEntity storage profileMasterAdminRole = data.roleWriteSlot(
        LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID
      );
      profileMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN";
      profileMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      profileMasterAdminRole.typeId = LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      profileMasterAdminRole.memberLimit = type(uint24).max;
      profileMasterAdminRole.memberCount = 1;
      profileMasterAdminRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
      profileMasterAdminRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      profileMasterAdminRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
      profileMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }
    {
      // Create Anonymouse  Type
      IACLCommonsTest.TypeEntity storage anonymousType = data.typeWriteSlot(LIVELY_VERSE_ANONYMOUS_TYPE_ID);
      anonymousType.name = "TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS";
      anonymousType.roleLimit = 0;
      anonymousType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      anonymousType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anonymousType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      anonymousType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      anonymousType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;

      // Create Any Type
      IACLCommonsTest.TypeEntity storage anyType = data.typeWriteSlot(LIVELY_VERSE_ANY_TYPE_ID);
      anyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
      anyType.roleLimit = 0;
      anyType.scopeId = LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      anyType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anyType.ba.atype = IACLCommonsTest.AgentType.TYPE;
      anyType.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      anyType.ba.alstat = IACLCommonsTest.AlterabilityStatus.DISABLED;
    }

    // update livelyUniverseEntity.bs.referredByAgent
    livelyUniverseEntity.bs.referredByAgent = 16;
    livelyUniverseEntity.domains.add(LACLUtilsTest.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD"));
  }
}
