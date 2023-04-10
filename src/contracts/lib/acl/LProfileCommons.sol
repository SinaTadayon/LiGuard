// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./LACLGenerals.sol";
import "./LACLUtils.sol";
import "./LProfileStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/profile/ProfileAccessControl.sol";
import "../../acl/profile/IProfileACLGenerals.sol";
import "../../acl/profile/IProfileManagement.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";
import "../../acl/profile/IProfileACL.sol";
import "../../acl/profile/scope/IProfileContextManagement.sol";
import "../../acl/profile/scope/IProfileFunctionManagement.sol";
import "../../acl/profile/scope/IProfileRealmManagement.sol";
import "../../acl/profile/scope/IProfileDomainManagement.sol";
import "../../acl/profile/agent/IProfileMemberManagement.sol";

/**
 * @title Profile Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileCommons {
  using LProfileStorage for ACLStorage.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileCommons";
  string public constant LIB_VERSION = "3.1.0";

  // bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  // bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  // bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  // bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  // bytes32 public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID =
  //   keccak256(abi.encodePacked("UNIVERSE.LIVELY_PROFILE"));
  // bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID =
  //   keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  // bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID =
  //   keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));

  function getLibrary() external pure returns (address) {
    return address(LACLGenerals);
  }

  function profileCheckAdminAccess(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) external view returns (IProfileACL.ProfileAdminAccessStatus) {
    return _doProfileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function profileAgentGetScopeInfo(ACLStorage.ProfileEntity storage profileEntity, bytes32 agentId)
    external
    view
    returns (IACLCommons.ScopeType, bytes32)
  {
    return _doGetAgentScopeInfo(profileEntity, agentId);
  }

  function profileRegisterContext(
    ACLStorage.DataCollection storage data,
    IProfileContextManagement.ProfileContextRegisterRequest calldata request,
    bytes32 profileId,
    address contractId,
    address signer
  ) external returns (bytes32) {
    bytes32 functionId = LACLUtils.functionGenerateId(
      data.selectors[IProfileContextManagement.profileContextRegister.selector],
      IProfileContextManagement.profileContextRegister.selector
    );
    bytes32 signerId = LACLUtils.accountGenerateId(signer);
    bytes32 newContextId = LACLUtils.accountGenerateId(contractId);

    {
      ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
      ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, signerId);
      require(profileEntity.scopes[newContextId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

      // check profile and type limitations and update it
      IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
      require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
      require(profileMemberEntity.registerLimits.contextRegisterLimit > 0, "Illegal Member ContextRegisterLimit");
      require(profileEntity.registerLimits.contextRegisterLimit > 0, "Illegal Profile ContextRegisterLimit");
      unchecked {
        profileMemberEntity.registerLimits.contextRegisterLimit -= 1;
        profileEntity.registerLimits.contextRegisterLimit -= 1;
      }

      // check realm
      IACLCommons.RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(request.realmId);
      require(realmEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

      // check system scope
      require(_doCheckContextSystemScope(profileEntity, request.realmId, signerId, profileId), "Forbidden");

      // add context to realm
      realmEntity.contexts.add(newContextId);

      // create new context
      IACLCommons.ContextEntity storage newContext = profileEntity.profileContextWriteSlot(newContextId);
      newContext.realmId = request.realmId;
      newContext.contractId = contractId;
      newContext.functionLimit = request.functionLimit >= 0
        ? uint8(uint16(request.functionLimit))
        : profileEntity.limits.functionLimit;
      newContext.bs.stype = IACLCommons.ScopeType.CONTEXT;
      newContext.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
      newContext.bs.alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;
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
    ACLStorage.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and type limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
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
    ACLStorage.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 signerId
  ) external {
    // check profile and type limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
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
    ACLStorage.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and realm limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
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
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.ProfileMemberEntity storage,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    // check profile and member limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
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
    ACLStorage.ProfileEntity storage profileEntity,
    IProfileDomainManagement.ProfileDomainRegisterRequest calldata request,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 senderId
  ) external returns (bytes32) {
    bytes32 newDomainId = LACLUtils.generateId(request.name);
    require(profileEntity.scopes[newDomainId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

    // check sender scopes
    IACLCommons.UniverseEntity storage livelyUniverseEntity = profileEntity.profileUniverseReadSlot(
      LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );

    require(livelyUniverseEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Universe Updatable");
    require(livelyUniverseEntity.domainLimit > livelyUniverseEntity.domains.length(), "Illegal Register");

    // check access admin universe
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      livelyUniverseEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

    // add domain to universe
    livelyUniverseEntity.domains.add(newDomainId);

    // create new domain entity
    IACLCommons.DomainEntity storage newDomain = profileEntity.profileDomainWriteSlot(newDomainId);
    newDomain.bs.stype = IACLCommons.ScopeType.DOMAIN;
    newDomain.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    newDomain.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    newDomain.name = request.name;
    newDomain.universeId = LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
    newDomain.realmLimit = request.realmLimit >= 0
      ? uint16(uint24(request.realmLimit))
      : profileEntity.limits.realmLimit;

    // checking requested domain admin
    if (request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      bytes32 requestAdminScopeId = _doDomainAgentGetScopeInfo(profileEntity, request.adminId);
      require(requestAdminScopeId == LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      newDomain.bs.adminId = request.adminId;
    } else {
      newDomain.bs.adminId = livelyUniverseEntity.bs.adminId;
    }

    return newDomainId;
  }

  function profileRealmRegister(
    IProfileRealmManagement.ProfileRealmRegisterRequest calldata request,
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 senderId,
    IACLCommons.ScopeType memberScopeType,
    bytes32 memberScopeId
  ) external returns (bytes32) {
    bytes32 newRealmId = LACLUtils.generateId(request.name);
    require(profileEntity.scopes[newRealmId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

    // check sender scopes
    require(memberScopeType >= IACLCommons.ScopeType.DOMAIN, "Illegal ScopeType");
    if (memberScopeType == IACLCommons.ScopeType.DOMAIN) {
      require(memberScopeId == request.domainId, "Illegal Domain Scope");
    } else {
      require(memberScopeId == LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
    }

    IACLCommons.DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(request.domainId);
    require(domainEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
    require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

    // check access admin realm
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      domainEntity.bs.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

    // add to domain
    domainEntity.realms.add(newRealmId);

    // create new realm entity
    IACLCommons.RealmEntity storage newRealm = profileEntity.profileRealmWriteSlot(newRealmId);
    newRealm.bs.stype = IACLCommons.ScopeType.REALM;
    newRealm.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    newRealm.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
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
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommons.ScopeType senderScopeType,
    bytes32 profileId
  ) external view returns (IACLCommons.BaseScope storage) {
    return _doProfileGetAndCheckRequestScope(profileEntity, requestScopeId, senderScopeId, senderScopeType, profileId);
  }

  function profileFunctionRegistration(
    ACLStorage.ProfileEntity storage profileEntity,
    IProfileFunctionManagement.ProfileFunctionRequest calldata functionRequest,
    bytes32 profileId,
    bytes32 contextId
  ) external returns (bytes32) {
    IACLCommons.ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat == IACLCommons.AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");
    require(contextEntity.functionLimit > contextEntity.functions.length(), "Illegal Limit");

    bytes32 newFunctionId = LACLUtils.functionGenerateId(contextEntity.contractId, functionRequest.selector);

    require(profileEntity.scopes[newFunctionId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

    _doCheckAgentId(profileEntity, profileId, functionRequest.agentId, contextId);
    IACLCommons.FunctionEntity storage functionEntity = profileEntity.profileFunctionWriteSlot(newFunctionId);
    functionEntity.bs.stype = IACLCommons.ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    functionEntity.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
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
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 functionAdminId) {
    return _doGetAndCheckFunctionAdmin(profileEntity, contextAdminId, contextId, adminId, profileId);
  }

  function profileMemberGetInfo(
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 memberId
  ) external view returns (IProfileMemberManagement.ProfileMemberInfo memory) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    (IACLCommons.ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if (!result || profileEntity.acstat == IACLCommons.ActivityStatus.NONE) {
      return
        IProfileMemberManagement.ProfileMemberInfo({
          adminId: bytes32(0),
          account: address(0),
          typeLimit: 0,
          typeCount: 0,
          callLimit: 0,
          registerLimit: IACLCommons.ProfileRegisterLimit({
            memberRegisterLimit: 0,
            roleRegisterLimit: 0,
            typeRegisterLimit: 0,
            functionRegisterLimit: 0,
            contextRegisterLimit: 0,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0
          }),
          adminType: IACLCommons.AgentType.NONE,
          atype: IACLCommons.AgentType.NONE,
          acstat: IACLCommons.ActivityStatus.NONE,
          alstat: IACLCommons.AlterabilityStatus.NONE
        });
    }

    return
      IProfileMemberManagement.ProfileMemberInfo({
        adminId: member.ba.adminId,
        account: member.account,
        typeLimit: member.typeLimit,
        typeCount: uint16(member.types.length()),
        callLimit: member.callLimit,
        registerLimit: IACLCommons.ProfileRegisterLimit({
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
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 memberId,
    address account
  ) external view returns (bool) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;
    if (profileEntity.agents[memberId].atype != IACLCommons.AgentType.MEMBER) return false;

    bytes32 memberAdminId = profileEntity.agents[memberId].adminId;
    IACLCommons.AgentType adminAgenType = profileEntity.agents[memberAdminId].atype;
    bytes32 accountId = LACLUtils.accountGenerateId(account);

    if (adminAgenType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(memberAdminId);
      if (!result) return false;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[accountId] == memberAdminId;
    } else if (adminAgenType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(memberAdminId);
      if (!result1) return false;

      return typeEntity.members[accountId] != bytes32(0);
    }

    return false;
  }

  function updateProfileAccount(
    ACLStorage.DataCollection storage data,
    IACLCommons.ProfileMemberEntity storage profileMemberEntity,
    bytes32 profileId,
    bytes32 typeId,
    bool isRevoke
  ) external {
    return _updateProfileAccount(data, profileMemberEntity, profileId, typeId, isRevoke);
  }

  function _updateProfileAccount(
    ACLStorage.DataCollection storage data,
    IACLCommons.ProfileMemberEntity storage profileMemberEntity,
    bytes32 profileId,
    bytes32 typeId,
    bool isRevoke
  ) private {
    IACLCommons.ProfileAccount storage profileAccount = data.profileAccounts[profileMemberEntity.account];
    require(profileAccount.profiles.length > 0, "ProfileAccount Not Found");
    bool findFlag = false;
    for (uint256 i = 0; i < profileAccount.profiles.length; i++) {
      if (profileAccount.profiles[i] == profileId) {
        findFlag = true;
        if (!isRevoke) {
          if (
            (profileMemberEntity.types.contains(LACLGenerals.LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) ||
              profileMemberEntity.types.contains(LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)) &&
            (typeId == LACLGenerals.LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID || typeId == LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)
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
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommons.ScopeType senderScopeType,
    bytes32 profileId
  ) private view returns (IACLCommons.BaseScope storage) {
    // checking requested type scope
    IACLCommons.BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommons.ScopeType.NONE, "Scope Not Found");
    require(requestedScope.acstat > IACLCommons.ActivityStatus.DELETED, "Deleted");

    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileCheckScopesCompatibility(profileId, senderScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestedScope;
  }

  function _getProfileRealmAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 requestScopeAdmin,
    bytes32 domainId,
    bytes32 adminId
  ) private view returns (bytes32 realmAdminId) {
    // checking requested context admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(
        profileEntity,
        adminId
      );
      require(IACLCommons.ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommons.ScopeType.DOMAIN == requestAdminScopeType) {
        require(requestAdminScopeId == domainId, "Illegal Admin Scope");
      } else {
        require(requestAdminScopeId == LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
      }
      realmAdminId = adminId;
    } else {
      realmAdminId = requestScopeAdmin;
    }
  }

  function _doProfileCheckAdminAccess(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 adminId,
    bytes32 senderId
  ) private view returns (IProfileACL.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if (profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    IACLCommons.AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if (adminAgentType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if (!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;

      IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if (
        policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    } else if (adminAgentType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if (!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (IACLCommons.RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if (!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if (
        policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    }

    return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _doGetContextAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    IProfileContextManagement.ProfileContextRegisterRequest calldata request,
    bytes32 profileId,
    bytes32 scopeId,
    bytes32 realmAdminId
  ) private view returns (bytes32 contextAdminId) {
    // checking requested context admin
    if (request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(
        profileEntity,
        request.adminId
      );
      require(IACLCommons.ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommons.ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == request.realmId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGenerals(address(this)).profileCheckScopesCompatibility(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      contextAdminId = request.adminId;
    } else {
      contextAdminId = realmAdminId;
    }
  }

  function _doGetAgentScopeInfo(ACLStorage.ProfileEntity storage profileEntity, bytes32 agentId)
    private
    view
    returns (IACLCommons.ScopeType, bytes32)
  {
    IACLCommons.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommons.ScopeType.NONE, bytes32(0));
  }

  function _doCheckContextSystemScope(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 scopeId,
    bytes32 memberId,
    bytes32 profileId
  ) private view returns (bool) {
    IACLCommons.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommons.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if (profileEntity.scopes[memberSystemRole.scopeId].stype < IACLCommons.ScopeType.REALM) return false;
    if (memberSystemRole.scopeId == scopeId) {
      return true;
    }

    return IProfileACLGenerals(address(this)).profileCheckScopesCompatibility(profileId, memberSystemRole.scopeId, scopeId);
  }

  function _doCheckAgentId(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 profileId,
    bytes32 agentId,
    bytes32 contextId
  ) private view {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    require(ba.atype > IACLCommons.AgentType.MEMBER, "Illegal AgentId");

    (IACLCommons.ScopeType requestAgentScopeType, bytes32 requestAgentScopeId) = _doGetAgentScopeInfo(
      profileEntity,
      agentId
    );
    require(IACLCommons.ScopeType.CONTEXT <= requestAgentScopeType, "Illegal Agent ScopeType");
    if (IACLCommons.ScopeType.CONTEXT == requestAgentScopeType) {
      require(requestAgentScopeId == contextId, "Illegal Agent Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileCheckScopesCompatibility(profileId, requestAgentScopeId, contextId),
        "Illegal Agent Scope"
      );
    }
  }

  function _doGetAndCheckFunctionAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 requestAdminId,
    bytes32 profileId
  ) private view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin
    if (requestAdminId != bytes32(0)) {
      require(profileEntity.agents[requestAdminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommons.ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doGetAgentScopeInfo(
        profileEntity,
        requestAdminId
      );
      require(IACLCommons.ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");

      if (IACLCommons.ScopeType.CONTEXT == requestAdminFuncType) {
        require(requestAdminFuncId == contextAdminId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGenerals(address(this)).profileCheckScopesCompatibility(profileId, requestAdminFuncId, contextId),
          "Illegal Admin Scope"
        );
      }
      functionAdminId = requestAdminId;
    } else {
      functionAdminId = contextAdminId;
    }
  }

  function _doDomainAgentGetScopeInfo(ACLStorage.ProfileEntity storage profileEntity, bytes32 agentId)
    private
    view
    returns (bytes32)
  {
    IACLCommons.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      return roleEntity.scopeId;
    } else if (atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);
  }
}
