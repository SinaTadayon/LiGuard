// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./LACLUtilsTest.sol";
import "./LProfileStorageTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../IACLCommonsTest.sol";
import "../profile/ProfileAccessControlTest.sol";
import "../profile/IProfileACLGeneralsTest.sol";
import "../profile/IProfileManagementTest.sol";
import "../ACLStorageTest.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/IERC1822.sol";
import "../../../../utils/IERC165.sol";
import "../profile/IProfileACLTest.sol";
import "../profile/scope/IProfileContextManagementTest.sol";
import "../profile/scope/IProfileFunctionManagementTest.sol";
import "../profile/scope/IProfileRealmManagementTest.sol";
import "../profile/scope/IProfileDomainManagementTest.sol";
import "../profile/agent/IProfileMemberManagementTest.sol";

/**
 * @title Profile Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileCommonsTest {
  using LProfileStorageTest for IACLCommonsTest.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileCommonsTest";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID =
    keccak256(abi.encodePacked("UNIVERSE.LIVELY_PROFILE"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));

  function profileCheckAdminAccess(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) external view returns (IProfileACLTest.ProfileAdminAccessStatus) {
    return _doProfileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function profileAgentGetScopeInfo(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    external
    view
    returns (IACLCommonsTest.ScopeType, bytes32)
  {
    return _doGetAgentScopeInfo(profileEntity, agentId);
  }

  function profileRegisterContext(
    ACLStorageTest.DataCollection storage data,
    IProfileContextManagementTest.ProfileContextRegisterRequest calldata request,
    bytes32 profileId,
    address contractId,
    address signer
  ) external returns (bytes32) {
    bytes32 functionId = LACLUtilsTest.functionGenerateId(
      data.selectors[IProfileContextManagementTest.profileContextRegister.selector],
      IProfileContextManagementTest.profileContextRegister.selector
    );
    bytes32 signerId = LACLUtilsTest.accountGenerateId(signer);
    bytes32 newContextId = LACLUtilsTest.accountGenerateId(contractId);

    {
      IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
      ProfileAccessControlTest(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, signerId);
      require(profileEntity.scopes[newContextId].stype == IACLCommonsTest.ScopeType.NONE, "Already Exist");

      // check profile and type limitations and update it
      IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
      require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
      require(profileMemberEntity.registerLimits.contextRegisterLimit > 0, "Illegal Member ContextRegisterLimit");
      require(profileEntity.registerLimits.contextRegisterLimit > 0, "Illegal Profile ContextRegisterLimit");
      unchecked {
        profileMemberEntity.registerLimits.contextRegisterLimit -= 1;
        profileEntity.registerLimits.contextRegisterLimit -= 1;
      }

      // check realm
      IACLCommonsTest.RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(request.realmId);
      require(realmEntity.bs.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

      // check system scope
      require(_doCheckContextSystemScope(profileEntity, request.realmId, signerId, profileId), "Forbidden");

      // add context to realm
      realmEntity.contexts.add(newContextId);

      // create new context
      IACLCommonsTest.ContextEntity storage newContext = profileEntity.profileContextWriteSlot(newContextId);
      newContext.realmId = request.realmId;
      newContext.contractId = contractId;
      newContext.functionLimit = request.functionLimit >= 0
        ? uint8(uint16(request.functionLimit))
        : profileEntity.limits.functionLimit;
      newContext.bs.stype = IACLCommonsTest.ScopeType.CONTEXT;
      newContext.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
      newContext.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPGRADABLE;
      newContext.bs.adminId = _doGetContextAdmin(
        profileEntity,
        request,
        profileId,
        newContextId,
        realmEntity.bs.adminId
      );
    }

    return newContextId;
  }

  function profileCheckMemberForDomainRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and type limitations and update it
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    unchecked {
      require(
        int32(uint32(profileMemberEntity.registerLimits.domainRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Member DomainRegisterLimit"
      );
      require(
        int32(uint32(profileEntity.registerLimits.domainRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Profile DomainRegisterLimit"
      );
      profileMemberEntity.registerLimits.domainRegisterLimit -= requestLength;
      profileEntity.registerLimits.domainRegisterLimit -= requestLength;
    }
  }

  function profileCheckMemberForFunctionRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 signerId
  ) external {
    // check profile and type limitations and update it
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
    require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    unchecked {
      require(
        int32(profileMemberEntity.registerLimits.functionRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Member FunctionRegisterLimit"
      );
      require(
        int32(profileEntity.registerLimits.functionRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Profile FunctionRegisterLimit"
      );
      profileMemberEntity.registerLimits.functionRegisterLimit -= requestLength;
      profileEntity.registerLimits.functionRegisterLimit -= requestLength;
    }
  }

  function profileCheckMemberForRealmRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and realm limitations and update it
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    unchecked {
      require(
        int32(uint32(profileMemberEntity.registerLimits.realmRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Member RealmRegisterLimit"
      );
      require(
        int32(uint32(profileEntity.registerLimits.realmRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Profile MemberRegisterLimit"
      );
      profileMemberEntity.registerLimits.realmRegisterLimit -= requestLength;
      profileEntity.registerLimits.realmRegisterLimit -= requestLength;
    }
  }

  function profileCheckMemberForMemberRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.ProfileMemberEntity storage,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and member limitations and update it
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    unchecked {
      require(
        int32(profileMemberEntity.registerLimits.memberRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Member MemberRegisterLimit"
      );
      require(
        int32(profileEntity.registerLimits.memberRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Profile MemberRegisterLimit"
      );
      profileMemberEntity.registerLimits.memberRegisterLimit -= requestLength;
      profileEntity.registerLimits.memberRegisterLimit -= requestLength;
    }
  }

  function profileDomainRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfileDomainManagementTest.ProfileDomainRegisterRequest calldata request,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 senderId
  ) external returns (bytes32) {
    bytes32 newDomainId = LACLUtilsTest.generateId(request.name);
    require(profileEntity.scopes[newDomainId].stype == IACLCommonsTest.ScopeType.NONE, "Already Exist");

    // check sender scopes
    IACLCommonsTest.UniverseEntity storage livelyUniverseEntity = profileEntity.profileUniverseReadSlot(
      LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );

    require(livelyUniverseEntity.bs.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
    require(livelyUniverseEntity.domainLimit > livelyUniverseEntity.domains.length(), "Illegal Register");

    // check access admin universe
    IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      livelyUniverseEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);

    // add domain to universe
    livelyUniverseEntity.domains.add(newDomainId);

    // create new domain entity
    IACLCommonsTest.DomainEntity storage newDomain = profileEntity.profileDomainWriteSlot(newDomainId);
    newDomain.bs.stype = IACLCommonsTest.ScopeType.DOMAIN;
    newDomain.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    newDomain.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    newDomain.name = request.name;
    newDomain.universeId = LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    newDomain.realmLimit = request.realmLimit >= 0
      ? uint16(uint24(request.realmLimit))
      : profileEntity.limits.realmLimit;

    // checking requested domain admin
    if (request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");
      bytes32 requestAdminScopeId = _doDomainAgentGetScopeInfo(profileEntity, request.adminId);
      require(requestAdminScopeId == LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      newDomain.bs.adminId = request.adminId;
    } else {
      newDomain.bs.adminId = livelyUniverseEntity.bs.adminId;
    }

    return newDomainId;
  }

  function profileRealmRegister(
    IProfileRealmManagementTest.ProfileRealmRegisterRequest calldata request,
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 senderId,
    IACLCommonsTest.ScopeType memberScopeType,
    bytes32 memberScopeId
  ) external returns (bytes32) {
    bytes32 newRealmId = LACLUtilsTest.generateId(request.name);
    require(profileEntity.scopes[newRealmId].stype == IACLCommonsTest.ScopeType.NONE, "Already Exist");

    // check sender scopes
    require(memberScopeType >= IACLCommonsTest.ScopeType.DOMAIN, "Illegal ScopeType");
    if (memberScopeType == IACLCommonsTest.ScopeType.DOMAIN) {
      require(memberScopeId == request.domainId, "Illegal Domain Scope");
    } else {
      require(memberScopeId == LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
    }

    IACLCommonsTest.DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(request.domainId);
    require(domainEntity.bs.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
    require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

    // check access admin realm
    IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      domainEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);

    // add to domain
    domainEntity.realms.add(newRealmId);

    // create new realm entity
    IACLCommonsTest.RealmEntity storage newRealm = profileEntity.profileRealmWriteSlot(newRealmId);
    newRealm.bs.stype = IACLCommonsTest.ScopeType.REALM;
    newRealm.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    newRealm.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    newRealm.name = request.name;
    newRealm.domainId = request.domainId;
    newRealm.contextLimit = request.contextLimit >= 0
      ? uint32(uint64(request.contextLimit))
      : profileEntity.limits.contextLimit;
    newRealm.bs.adminId = _getProfileRealmAdmin(
      profileEntity,
      domainEntity.bs.adminId,
      request.domainId,
      request.adminId
    );

    return newRealmId;
  }

  function profileGetAndCheckRequestScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType,
    bytes32 profileId
  ) external view returns (IACLCommonsTest.BaseScope storage) {
    return _doProfileGetAndCheckRequestScope(profileEntity, requestScopeId, senderScopeId, senderScopeType, profileId);
  }

  function profileFunctionRegistration(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfileFunctionManagementTest.ProfileFunctionRequest calldata functionRequest,
    bytes32 profileId,
    bytes32 contextId
  ) external returns (bytes32) {
    IACLCommonsTest.ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat == IACLCommonsTest.AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");
    require(contextEntity.functionLimit > contextEntity.functions.length(), "Illegal Limit");

    bytes32 newFunctionId = LACLUtilsTest.functionGenerateId(contextEntity.contractId, functionRequest.selector);

    require(profileEntity.scopes[newFunctionId].stype == IACLCommonsTest.ScopeType.NONE, "Already Exist");

    _doCheckAgentId(profileEntity, profileId, functionRequest.agentId, contextId);
    IACLCommonsTest.FunctionEntity storage functionEntity = profileEntity.profileFunctionWriteSlot(newFunctionId);
    functionEntity.bs.stype = IACLCommonsTest.ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    functionEntity.bs.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(
      profileEntity,
      contextEntity.bs.adminId,
      contextId,
      functionRequest.adminId,
      profileId
    );

    // add function to context
    contextEntity.functions.add(newFunctionId);

    return newFunctionId;
  }

  function profileGetAndCheckFunctionAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 functionAdminId) {
    return _doGetAndCheckFunctionAdmin(profileEntity, contextAdminId, contextId, adminId, profileId);
  }

  function profileMemberGetInfo(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 memberId
  ) external view returns (IProfileMemberManagementTest.ProfileMemberInfo memory) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    (IACLCommonsTest.ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if (!result || profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) {
      return
        IProfileMemberManagementTest.ProfileMemberInfo({
          adminId: bytes32(0),
          account: address(0),
          typeLimit: 0,
          typeCount: 0,
          callLimit: 0,
          registerLimit: IACLCommonsTest.ProfileRegisterLimit({
            memberRegisterLimit: 0,
            roleRegisterLimit: 0,
            typeRegisterLimit: 0,
            functionRegisterLimit: 0,
            contextRegisterLimit: 0,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0
          }),
          adminType: IACLCommonsTest.AgentType.NONE,
          atype: IACLCommonsTest.AgentType.NONE,
          acstat: IACLCommonsTest.ActivityStatus.NONE,
          alstat: IACLCommonsTest.AlterabilityStatus.NONE
        });
    }

    return
      IProfileMemberManagementTest.ProfileMemberInfo({
        adminId: member.ba.adminId,
        account: member.account,
        typeLimit: member.typeLimit,
        typeCount: uint16(member.types.length()),
        callLimit: member.callLimit,
        registerLimit: IACLCommonsTest.ProfileRegisterLimit({
          memberRegisterLimit: member.registerLimits.memberRegisterLimit,
          roleRegisterLimit: member.registerLimits.roleRegisterLimit,
          typeRegisterLimit: member.registerLimits.typeRegisterLimit,
          functionRegisterLimit: member.registerLimits.functionRegisterLimit,
          contextRegisterLimit: member.registerLimits.contextRegisterLimit,
          realmRegisterLimit: member.registerLimits.realmRegisterLimit,
          domainRegisterLimit: member.registerLimits.domainRegisterLimit,
          policyRegisterLimit: member.registerLimits.policyRegisterLimit
        }),
        adminType: profileEntity.agents[member.ba.adminId].atype,
        atype: member.ba.atype,
        acstat: member.ba.acstat,
        alstat: member.ba.alstat
      });
  }

  function profileMemberCheckAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 memberId,
    address account
  ) external view returns (bool) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) return false;
    if (profileEntity.agents[memberId].atype != IACLCommonsTest.AgentType.MEMBER) return false;

    bytes32 memberAdminId = profileEntity.agents[memberId].adminId;
    IACLCommonsTest.AgentType adminAgenType = profileEntity.agents[memberAdminId].atype;
    bytes32 accountId = LACLUtilsTest.accountGenerateId(account);

    if (adminAgenType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(memberAdminId);
      if (!result) return false;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[accountId] == memberAdminId;
    } else if (adminAgenType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(memberAdminId);
      if (!result1) return false;

      return typeEntity.members[accountId] != bytes32(0);
    }

    return false;
  }

  function updateProfileAccount(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity,
    bytes32 profileId,
    bytes32 typeId,
    bool isRevoke
  ) external {
    return _updateProfileAccount(data, profileMemberEntity, profileId, typeId, isRevoke);
  }

  function _updateProfileAccount(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity,
    bytes32 profileId,
    bytes32 typeId,
    bool isRevoke
  ) private {
    IACLCommonsTest.ProfileAccount storage profileAccount = data.profileAccounts[profileMemberEntity.account];
    require(profileAccount.profiles.length > 0, "ProfileAccount Not Found");
    bool findFlag = false;
    for (uint256 i = 0; i < profileAccount.profiles.length; i++) {
      if (profileAccount.profiles[i] == profileId) {
        findFlag = true;
        if (!isRevoke) {
          if (
            (profileMemberEntity.types.contains(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) ||
              profileMemberEntity.types.contains(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)) &&
            (typeId == LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID || typeId == LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)
          ) {
            revert("Illegal GrantMemberType");
          }
        } else {
          if (profileAccount.profiles.length > 1) {
            if (i < profileAccount.profiles.length - 1)
              profileAccount.profiles[i] = profileAccount.profiles[profileAccount.profiles.length - 1];
            profileAccount.profiles.pop();
          } else {
            profileAccount.profiles.pop();
            delete profileAccount.profiles;
          }
        }
        break;
      }
    }

    require(findFlag, "Illegal ProfileAccount");
  }

  function _doProfileGetAndCheckRequestScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType,
    bytes32 profileId
  ) private view returns (IACLCommonsTest.BaseScope storage) {
    // checking requested type scope
    IACLCommonsTest.BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestedScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Deleted");

    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, senderScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestedScope;
  }

  function _getProfileRealmAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 requestScopeAdmin,
    bytes32 domainId,
    bytes32 adminId
  ) private view returns (bytes32 realmAdminId) {
    // checking requested context admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(
        profileEntity,
        adminId
      );
      require(IACLCommonsTest.ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommonsTest.ScopeType.DOMAIN == requestAdminScopeType) {
        require(requestAdminScopeId == domainId, "Illegal Admin Scope");
      } else {
        require(requestAdminScopeId == LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      }
      realmAdminId = adminId;
    } else {
      realmAdminId = requestScopeAdmin;
    }
  }

  function _doProfileCheckAdminAccess(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) private view returns (IProfileACLTest.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if (profileEntity.admins.contains(senderId)) return IProfileACLTest.ProfileAdminAccessStatus.PERMITTED;

    IACLCommonsTest.AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if (adminAgentType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if (!result) return IProfileACLTest.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IProfileACLTest.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return IProfileACLTest.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IProfileACLTest.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      if (typeEntity.members[senderId] != adminId) return IProfileACLTest.ProfileAdminAccessStatus.NOT_PERMITTED;

      IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IProfileACLTest.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACLTest.ProfileAdminAccessStatus.PERMITTED;
    } else if (adminAgentType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if (!result1) return IProfileACLTest.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IProfileACLTest.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if (!result2) return IProfileACLTest.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IProfileACLTest.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IProfileACLTest.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACLTest.ProfileAdminAccessStatus.PERMITTED;
    }

    return IProfileACLTest.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _doGetContextAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfileContextManagementTest.ProfileContextRegisterRequest calldata request,
    bytes32 profileId,
    bytes32 scopeId,
    bytes32 realmAdminId
  ) private view returns (bytes32 contextAdminId) {
    // checking requested context admin
    if (request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(
        profileEntity,
        request.adminId
      );
      require(IACLCommonsTest.ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommonsTest.ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == request.realmId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      contextAdminId = request.adminId;
    } else {
      contextAdminId = realmAdminId;
    }
  }

  function _doGetAgentScopeInfo(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    private
    view
    returns (IACLCommonsTest.ScopeType, bytes32)
  {
    IACLCommonsTest.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == IACLCommonsTest.AgentType.TYPE) {
      IACLCommonsTest.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommonsTest.ScopeType.NONE, bytes32(0));
  }

  function _doCheckContextSystemScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 scopeId,
    bytes32 memberId,
    bytes32 profileId
  ) private view returns (bool) {
    IACLCommonsTest.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommonsTest.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if (profileEntity.scopes[memberSystemRole.scopeId].stype < IACLCommonsTest.ScopeType.REALM) return false;
    if (memberSystemRole.scopeId == scopeId) {
      return true;
    }

    return IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);
  }

  function _doCheckAgentId(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 profileId,
    bytes32 agentId,
    bytes32 contextId
  ) private view {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    require(ba.atype > IACLCommonsTest.AgentType.MEMBER, "Illegal AgentId");

    (IACLCommonsTest.ScopeType requestAgentScopeType, bytes32 requestAgentScopeId) = _doGetAgentScopeInfo(
      profileEntity,
      agentId
    );
    require(IACLCommonsTest.ScopeType.CONTEXT <= requestAgentScopeType, "Illegal Agent ScopeType");
    if (IACLCommonsTest.ScopeType.CONTEXT == requestAgentScopeType) {
      require(requestAgentScopeId == contextId, "Illegal Agent Scope");
    } else {
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, requestAgentScopeId, contextId),
        "Illegal Agent Scope"
      );
    }
  }

  function _doGetAndCheckFunctionAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 requestAdminId,
    bytes32 profileId
  ) private view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin
    if (requestAdminId != bytes32(0)) {
      require(profileEntity.agents[requestAdminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommonsTest.ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doGetAgentScopeInfo(
        profileEntity,
        requestAdminId
      );
      require(IACLCommonsTest.ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");

      if (IACLCommonsTest.ScopeType.CONTEXT == requestAdminFuncType) {
        require(requestAdminFuncId == contextAdminId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, requestAdminFuncId, contextId),
          "Illegal Admin Scope"
        );
      }
      functionAdminId = requestAdminId;
    } else {
      functionAdminId = contextAdminId;
    }
  }

  function _doDomainAgentGetScopeInfo(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    private
    view
    returns (bytes32)
  {
    IACLCommonsTest.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      return roleEntity.scopeId;
    } else if (atype == IACLCommonsTest.AgentType.TYPE) {
      IACLCommonsTest.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);
  }
}
