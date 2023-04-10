// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./LACLUtilsTest.sol";
import "./LProfileStorageTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../IACLCommonsTest.sol";
import "../profile/IProfileACLGeneralsTest.sol";
import "../profile/IProfileManagementTest.sol";
import "../ACLStorageTest.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/IERC1822.sol";
import "../../../../utils/IERC165.sol";
import "../profile/IProfileACLTest.sol";
import "../profile/agent/IProfileRoleManagementTest.sol";
import "../profile/policy/IProfilePolicyManagementTest.sol";

/**
 * @title Profile Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileRolePolicyTest {
  using LProfileStorageTest for IACLCommonsTest.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileRolePolicyTest";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
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
    return _doAgentGetScopeInfo(profileEntity, agentId);
  }

  function profileCheckMemberForRoleRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    IACLCommonsTest.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    unchecked {
      require(
        int32(profileMemberEntity.registerLimits.roleRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Member RoleRegisterLimit"
      );
      require(
        int32(profileEntity.registerLimits.roleRegisterLimit) - int16(requestLength) >= 0,
        "Illegal Profile RoleRegisterLimit"
      );
      profileMemberEntity.registerLimits.roleRegisterLimit -= requestLength;
      profileEntity.registerLimits.roleRegisterLimit -= requestLength;
    }
  }

  function profileCheckMemberForPolicyRegister(
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
        int32(uint32(profileMemberEntity.registerLimits.policyRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Member PolicyRegisterLimit"
      );
      require(
        int32(uint32(profileEntity.registerLimits.policyRegisterLimit)) - int16(requestLength) >= 0,
        "Illegal Profile PolicyRegisterLimit"
      );
      profileMemberEntity.registerLimits.policyRegisterLimit -= requestLength;
      profileEntity.registerLimits.policyRegisterLimit -= requestLength;
    }
  }

  function profileRoleRegister(
    IProfileRoleManagementTest.ProfileRoleRegisterRequest calldata request,
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external returns (bytes32, bytes32) {
    bytes32 newRoleId = LACLUtilsTest.generateId(request.name);
    require(profileEntity.agents[newRoleId].atype == IACLCommonsTest.AgentType.NONE, "Already Exist");
    require(
      request.typeId != LIVELY_VERSE_ANONYMOUS_TYPE_ID && request.typeId != LIVELY_PROFILE_ANY_TYPE_ID,
      "Illegal Type"
    );

    // check type
    IACLCommonsTest.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(request.typeId);
    require(typeEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
    require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

    {
      // check access
      IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
        profileEntity,
        functionEntity,
        typeEntity.ba.adminId,
        senderId
      );
      if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
    }

    // check and get requested scope type
    IACLCommonsTest.ScopeType requestScopeType = _doProfileRoleCheckRequestScope(
      profileEntity,
      request.scopeId,
      typeEntity.scopeId,
      profileId
    );

    // add role to type
    typeEntity.roles.add(newRoleId);

    // create role entity
    IACLCommonsTest.RoleEntity storage newRole = profileEntity.profileRoleWriteSlot(newRoleId);
    newRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
    newRole.ba.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    newRole.ba.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    newRole.name = request.name;
    newRole.scopeId = request.scopeId;
    newRole.memberLimit = request.memberLimit >= 0
      ? uint24(uint32(request.memberLimit))
      : profileEntity.limits.memberLimit;
    newRole.typeId = request.typeId;
    newRole.ba.adminId = _doProfileGetRoleAdmin(
      profileEntity,
      requestScopeType,
      typeEntity.ba.adminId,
      request.scopeId,
      request.adminId,
      profileId
    );

    return (newRoleId, newRole.ba.adminId);
  }

  function profilePolicyRegister(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfilePolicyManagementTest.ProfilePolicyRegisterRequest calldata request,
    bytes32 profileId,
    IACLCommonsTest.ScopeType senderScopeType,
    bytes32 senderScopeId
  ) external returns (bytes32) {
    bytes32 newPolicyId = LACLUtilsTest.generateId(request.name);
    require(profileEntity.policies[newPolicyId].acstat == IACLCommonsTest.ActivityStatus.NONE, "Already Exist");

    // // checking requested type scope
    IACLCommonsTest.BaseScope storage requestedScope = _doProfilePolicyCheckRequestScope(
      profileEntity,
      request.scopeId,
      senderScopeId,
      senderScopeType,
      profileId
    );

    // create policy entity
    IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[newPolicyId];
    policyEntity.ptype = _doProfileGetPolicyType(request.policyCode);
    policyEntity.policyCode = request.policyCode;
    policyEntity.acstat = IACLCommonsTest.ActivityStatus.ENABLED;
    policyEntity.alstat = IACLCommonsTest.AlterabilityStatus.UPDATABLE;
    policyEntity.name = request.name;
    policyEntity.scopeId = request.scopeId;
    policyEntity.roleLimit = request.roleLimit >= 0
      ? uint16(uint24(request.roleLimit))
      : profileEntity.limits.policyRoleLimit;
    policyEntity.adminId = _doProfileGetPolicyAdmin(
      profileEntity,
      requestedScope.stype,
      requestedScope.adminId,
      request.scopeId,
      request.adminId,
      profileId
    );
    return newPolicyId;
  }

  function profileGetPolicyAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 policyAdminId) {
    return _doProfileGetPolicyAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }

  function profilePolicyUpdateScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfilePolicyManagementTest.ProfileUpdateScopeRequest calldata request,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external {
    IACLCommonsTest.ScopeType senderScopeType;
    bytes32 senderScopeId;
    IACLCommonsTest.PolicyEntity storage policyEntity = _doProfileGetPolicyAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.entityId,
      senderId
    );

    IACLCommonsTest.AgentType adminAgentType = profileEntity.agents[policyEntity.adminId].atype;
    if (adminAgentType == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(policyEntity.adminId);
      senderScopeId = roleEntity.scopeId;
      senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
    } else {
      IACLCommonsTest.TypeEntity storage agentType = profileEntity.profileTypeReadSlot(policyEntity.adminId);
      bytes32 memberRoleId = agentType.members[senderId];
      IACLCommonsTest.RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
      senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
      senderScopeId = memberAgentRole.scopeId;
    }

    IACLCommonsTest.BaseScope storage requestScope = _doProfilePolicyCheckRequestScope(
      profileEntity,
      request.scopeId,
      senderScopeId,
      senderScopeType,
      profileId
    );
    IACLCommonsTest.BaseScope storage currentScope = profileEntity.scopes[policyEntity.scopeId];
    if (policyEntity.roles.length() > 0) {
      require(requestScope.stype > currentScope.stype, "Illegal ScopeType");
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, request.scopeId, policyEntity.scopeId),
        "Illegal Scope"
      );
    }

    require(currentScope.referredByAgent > 0, "Illeagl Referred");
    unchecked {
      currentScope.referredByAgent -= 1;
    }

    policyEntity.scopeId = request.scopeId;
  }

  function profilePolicyAddRoles(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.PolicyEntity storage policyEntity,
    bytes32 profileId,
    bytes32 policyId,
    bytes32 roleId,
    IACLCommonsTest.ScopeType policyScopeType
  ) external {
    require(profileEntity.rolePolicyMap[roleId] == bytes32(0), "Already Exist");
    require(policyEntity.adminId != roleId, "Illegal Role");
    require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
    IACLCommonsTest.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);

    IACLCommonsTest.ScopeType roleScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
    require(roleScopeType <= policyScopeType, "Illegal Role ScopeType");
    if (roleScopeType == policyScopeType) {
      require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
    } else {
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(
          profileId,
          policyEntity.scopeId,
          roleEntity.scopeId
        ),
        "Illegal Role Scope"
      );
    }

    profileEntity.rolePolicyMap[roleId] = policyId;
    policyEntity.roles.add(roleId);
  }

  function profilePolicyCheckAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 policyId,
    address account
  ) external view returns (bool) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) return false;

    IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if (policyEntity.adminId == bytes32(0)) return false;

    bytes32 policyAdminId = policyEntity.adminId;
    IACLCommonsTest.AgentType agentType = profileEntity.agents[policyAdminId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (agentType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(policyAdminId);
      if (!result) return false;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[memberId] == policyAdminId;
    } else if (agentType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(policyAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }
    return true;
  }

  function profilePolicyGetInfo(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 policyId
  ) external view returns (IProfilePolicyManagementTest.ProfilePolicyInfo memory) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (
      profileEntity.policies[policyId].acstat == IACLCommonsTest.ActivityStatus.NONE ||
      profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE
    ) {
      return
        IProfilePolicyManagementTest.ProfilePolicyInfo({
          adminId: bytes32(0),
          scopeId: bytes32(0),
          name: "",
          roleLimit: 0,
          roleCount: 0,
          policyCode: 0,
          adminType: IACLCommonsTest.AgentType.NONE,
          scopeType: IACLCommonsTest.ScopeType.NONE,
          ptype: IACLCommonsTest.PolicyType.UNLOCK,
          acstat: IACLCommonsTest.ActivityStatus.NONE,
          alstat: IACLCommonsTest.AlterabilityStatus.NONE
        });
    }

    return
      IProfilePolicyManagementTest.ProfilePolicyInfo({
        adminId: profileEntity.policies[policyId].adminId,
        scopeId: profileEntity.policies[policyId].scopeId,
        name: profileEntity.policies[policyId].name,
        roleLimit: profileEntity.policies[policyId].roleLimit,
        roleCount: uint16(profileEntity.policies[policyId].roles.length()),
        policyCode: profileEntity.policies[policyId].policyCode,
        adminType: profileEntity.agents[profileEntity.policies[policyId].adminId].atype,
        scopeType: profileEntity.scopes[profileEntity.policies[policyId].scopeId].stype,
        ptype: profileEntity.policies[policyId].ptype,
        acstat: profileEntity.policies[policyId].acstat,
        alstat: profileEntity.policies[policyId].alstat
      });
  }

  function profilePolicyUpdateAlterabilityStatus(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IProfilePolicyManagementTest.ProfileUpdateAlterabilityRequest calldata request,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 senderId
  ) external {
    IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[request.entityId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      policyEntity.adminId,
      senderId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
    require(request.alstat != IACLCommonsTest.AlterabilityStatus.NONE, "Illegal Alterability");
    policyEntity.alstat = request.alstat;
  }

  function profileGetPolicyType(uint8 policyCode) external pure returns (IACLCommonsTest.PolicyType) {
    return _doProfileGetPolicyType(policyCode);
  }

  function profileRoleGetInfo(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId
  ) external view returns (IProfileRoleManagementTest.ProfileRoleInfo memory) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if (!result || profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) {
      return
        IProfileRoleManagementTest.ProfileRoleInfo({
          scopeId: bytes32(0),
          typeId: bytes32(0),
          adminId: bytes32(0),
          memberLimit: 0,
          memberCount: 0,
          adminType: IACLCommonsTest.AgentType.NONE,
          atype: IACLCommonsTest.AgentType.NONE,
          acstat: IACLCommonsTest.ActivityStatus.NONE,
          alstat: IACLCommonsTest.AlterabilityStatus.NONE,
          name: ""
        });
    }
    return
      IProfileRoleManagementTest.ProfileRoleInfo({
        scopeId: roleEntity.scopeId,
        typeId: roleEntity.typeId,
        adminId: roleEntity.ba.adminId,
        memberLimit: roleEntity.memberLimit,
        memberCount: roleEntity.memberCount,
        adminType: profileEntity.agents[roleEntity.ba.adminId].atype,
        atype: roleEntity.ba.atype,
        acstat: roleEntity.ba.acstat,
        alstat: roleEntity.ba.alstat,
        name: roleEntity.name
      });
  }

  function profileRoleHasAccount(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) return false;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if (!result) return false;

    (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if (!result1) return false;

    return typeEntity.members[memberId] != bytes32(0);
  }

  function profileRoleCheckAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    IACLCommonsTest.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommonsTest.ActivityStatus.NONE) return false;
    if (profileEntity.agents[roleId].atype != IACLCommonsTest.AgentType.ROLE) return false;

    bytes32 roleAdminId = profileEntity.agents[roleId].adminId;
    IACLCommonsTest.AgentType adminAgenType = profileEntity.agents[roleAdminId].atype;
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);

    if (adminAgenType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleAdminId);
      if (!result) return false;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[memberId] == roleAdminId;
    } else if (adminAgenType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileRoleUpdateScope(
    IProfileRoleManagementTest.ProfileUpdateScopeRequest calldata request,
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external returns (bool) {
    IACLCommonsTest.RoleEntity storage roleEntity = _doProfileGetRoleEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.entityId,
      senderId
    );
    IACLCommonsTest.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    _doProfileRoleCheckRequestScope(profileEntity, request.scopeId, typeEntity.scopeId, profileId);
    IACLCommonsTest.BaseScope storage oldScope = profileEntity.scopes[roleEntity.scopeId];
    require(oldScope.referredByAgent > 0, "Illeagl Referred");
    unchecked {
      oldScope.referredByAgent -= 1;
    }
    roleEntity.scopeId = request.scopeId;

    return true;
  }

  function profileGetRoleEntityAndCheckAdminAccess(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 roleId,
    bytes32 senderId
  ) external view returns (IACLCommonsTest.RoleEntity storage) {
    return _doProfileGetRoleEntityAndCheckAdminAccess(profileEntity, functionEntity, roleId, senderId);
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

  function profileGetRoleAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 roleAdminId) {
    return _doProfileGetRoleAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }

  function _doProfileGetPolicyAndCheckAdminAccess(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 policyId,
    bytes32 memberId
  ) private view returns (IACLCommonsTest.PolicyEntity storage) {
    IACLCommonsTest.PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    require(policyEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      policyEntity.adminId,
      memberId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _doProfileGetPolicyAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) private view returns (bytes32 policyAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype == IACLCommonsTest.AgentType.ROLE, "Illegal Admin AgentType");
      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(
        profileEntity,
        adminId
      );
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      policyAdminId = adminId;
    } else {
      policyAdminId = requestScopeAdmin;
    }
  }

  function _doProfileGetPolicyType(uint8 policyCode) private pure returns (IACLCommonsTest.PolicyType) {
    if (policyCode == 0) {
      return IACLCommonsTest.PolicyType.UNLOCK;
    } else if (policyCode <= 63) {
      return IACLCommonsTest.PolicyType.SLOCK;
    } else if (policyCode <= 127) {
      return IACLCommonsTest.PolicyType.MLOCK;
    } else if (policyCode <= 191) {
      return IACLCommonsTest.PolicyType.RLOCK;
    } else if (policyCode <= 254) {
      return IACLCommonsTest.PolicyType.HLOCK;
    } else {
      return IACLCommonsTest.PolicyType.LOCK;
    }
  }

  function _doProfileGetRoleEntityAndCheckAdminAccess(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.FunctionEntity storage functionEntity,
    bytes32 roleId,
    bytes32 senderId
  ) private view returns (IACLCommonsTest.RoleEntity storage) {
    IACLCommonsTest.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);
    require(roleEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Updatable");

    // check access admin role
    IProfileACLTest.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      roleEntity.ba.adminId,
      senderId
    );
    if (status != IProfileACLTest.ProfileAdminAccessStatus.PERMITTED) LACLUtilsTest.generateProfileAdminAccessError(status);
    return roleEntity;
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

  function _doProfileGetRoleAdmin(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) private view returns (bytes32 roleAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(
        profileEntity,
        adminId
      );
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      roleAdminId = adminId;
    } else {
      roleAdminId = requestScopeAdmin;
    }
  }

  function _doProfileRoleCheckRequestScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 typeScopeId,
    bytes32 profileId
  ) private returns (IACLCommonsTest.ScopeType) {
    // checking requested role scope
    IACLCommonsTest.BaseScope storage requestScope = profileEntity.scopes[requestScopeId];
    require(requestScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    // checking requested role type scope with role scope
    IACLCommonsTest.ScopeType typeScopeType = profileEntity.scopes[typeScopeId].stype;
    require(typeScopeType >= requestScope.stype, "Illegal ScopeType");
    if (typeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, typeScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestScope.stype;
  }

  function _doProfilePolicyCheckRequestScope(
    IACLCommonsTest.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType,
    bytes32 profileId
  ) private returns (IACLCommonsTest.BaseScope storage) {
    // checking requested type scope
    IACLCommonsTest.BaseScope storage requestScope = profileEntity.scopes[requestScopeId];
    require(requestScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    require(requestScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGeneralsTest(address(this)).profileIsScopesCompatible(profileId, senderScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestScope;
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

  function _doAgentGetScopeInfo(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
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
}
