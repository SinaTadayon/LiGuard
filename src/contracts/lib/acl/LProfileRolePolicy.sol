// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./LACLGenerals.sol";
import "./LACLUtils.sol";
import "./LProfileStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/profile/IProfileACLGenerals.sol";
import "../../acl/profile/IProfileManagement.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";
import "../../acl/profile/IProfileACL.sol";
import "../../acl/profile/agent/IProfileRoleManagement.sol";
import "../../acl/profile/policy/IProfilePolicyManagement.sol";

/**
 * @title Profile Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileRolePolicy {
  using LProfileStorage for ACLStorage.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileRolePolicy";
  string public constant LIB_VERSION = "3.1.0";

  // bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  // bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = 
  //   keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  // bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  // bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID =
  //   keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  // bytes32 public constant LIVELY_PROFILE_ANY_TYPE_ID = 
  //   keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
  // bytes32 public constant LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID =
  //   keccak256(abi.encodePacked("UNIVERSE.LIVELY_PROFILE"));
  // bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID =
  //   keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  // bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID =
  //   keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));

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
    return _doAgentGetScopeInfo(profileEntity, agentId);
  }

  function profileCheckMemberForRoleRegister(
    ACLStorage.ProfileEntity storage profileEntity,
    uint16 requestLength,
    bytes32 senderId
  ) external {
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
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
    IProfileRoleManagement.ProfileRoleRegisterRequest calldata request,
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external returns (bytes32, bytes32) {
    bytes32 newRoleId = LACLUtils.generateId(request.name);
    require(profileEntity.agents[newRoleId].atype == IACLCommons.AgentType.NONE, "Already Exist");
    require(
      request.typeId != LACLGenerals.LIVELY_VERSE_ANONYMOUS_TYPE_ID && request.typeId != LACLGenerals.LIVELY_PROFILE_ANY_TYPE_ID,
      "Illegal Type"
    );

    // check type
    IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(request.typeId);
    require(typeEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
    require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

    {
      // check access
      IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
        profileEntity,
        functionEntity,
        typeEntity.ba.adminId,
        senderId
      );
      if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    }

    // check and get requested scope type
    IACLCommons.ScopeType requestScopeType = _doProfileRoleCheckRequestScope(
      profileEntity,
      request.scopeId,
      typeEntity.scopeId,
      profileId
    );

    // add role to type
    typeEntity.roles.add(newRoleId);

    // create role entity
    IACLCommons.RoleEntity storage newRole = profileEntity.profileRoleWriteSlot(newRoleId);
    newRole.ba.atype = IACLCommons.AgentType.ROLE;
    newRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    newRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
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
    ACLStorage.ProfileEntity storage profileEntity,
    IProfilePolicyManagement.ProfilePolicyRegisterRequest calldata request,
    bytes32 profileId,
    IACLCommons.ScopeType senderScopeType,
    bytes32 senderScopeId
  ) external returns (bytes32) {
    bytes32 newPolicyId = LACLUtils.generateId(request.name);
    require(profileEntity.policies[newPolicyId].acstat == IACLCommons.ActivityStatus.NONE, "Already Exist");

    // // checking requested type scope
    IACLCommons.BaseScope storage requestedScope = _doProfilePolicyCheckRequestScope(
      profileEntity,
      request.scopeId,
      senderScopeId,
      senderScopeType,
      profileId
    );

    // create policy entity
    IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[newPolicyId];
    policyEntity.ptype = _doProfileGetPolicyType(request.policyCode);
    policyEntity.policyCode = request.policyCode;
    policyEntity.acstat = IACLCommons.ActivityStatus.ENABLED;
    policyEntity.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
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
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 policyAdminId) {
    return _doProfileGetPolicyAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }

  function profilePolicyUpdateScope(
    ACLStorage.ProfileEntity storage profileEntity,
    IProfilePolicyManagement.ProfileUpdateScopeRequest calldata request,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external {
    IACLCommons.ScopeType senderScopeType;
    bytes32 senderScopeId;
    IACLCommons.PolicyEntity storage policyEntity = _doProfileGetPolicyAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.entityId,
      senderId
    );

    IACLCommons.AgentType adminAgentType = profileEntity.agents[policyEntity.adminId].atype;
    if (adminAgentType == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(policyEntity.adminId);
      senderScopeId = roleEntity.scopeId;
      senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
    } else {
      IACLCommons.TypeEntity storage agentType = profileEntity.profileTypeReadSlot(policyEntity.adminId);
      bytes32 memberRoleId = agentType.members[senderId];
      IACLCommons.RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
      senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
      senderScopeId = memberAgentRole.scopeId;
    }

    IACLCommons.BaseScope storage requestScope = _doProfilePolicyCheckRequestScope(
      profileEntity,
      request.scopeId,
      senderScopeId,
      senderScopeType,
      profileId
    );
    IACLCommons.BaseScope storage currentScope = profileEntity.scopes[policyEntity.scopeId];
    if (policyEntity.roles.length() > 0) {
      require(requestScope.stype > currentScope.stype, "Illegal ScopeType");
      require(
        IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, request.scopeId, policyEntity.scopeId),
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
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.PolicyEntity storage policyEntity,
    bytes32 profileId,
    bytes32 policyId,
    bytes32 roleId,
    IACLCommons.ScopeType policyScopeType
  ) external {
    require(profileEntity.rolePolicyMap[roleId] == bytes32(0), "Already Exist");
    require(policyEntity.adminId != roleId, "Illegal Role");
    require(
      roleId != LACLGenerals.LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID && 
      roleId != LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      "Illegal Policy Role"
    );
    require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
    IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);

    IACLCommons.ScopeType roleScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
    require(roleScopeType <= policyScopeType, "Illegal Role ScopeType");
    if (roleScopeType == policyScopeType) {
      require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileIsScopesCompatible(
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
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 policyId,
    address account
  ) external view returns (bool) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;

    IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if (policyEntity.adminId == bytes32(0)) return false;

    bytes32 policyAdminId = policyEntity.adminId;
    IACLCommons.AgentType agentType = profileEntity.agents[policyAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(policyAdminId);
      if (!result) return false;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[memberId] == policyAdminId;
    } else if (agentType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(policyAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }
    return true;
  }

  function profilePolicyGetInfo(
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 policyId
  ) external view returns (IProfilePolicyManagement.ProfilePolicyInfo memory) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (
      profileEntity.policies[policyId].acstat == IACLCommons.ActivityStatus.NONE ||
      profileEntity.acstat == IACLCommons.ActivityStatus.NONE
    ) {
      return
        IProfilePolicyManagement.ProfilePolicyInfo({
          adminId: bytes32(0),
          scopeId: bytes32(0),
          name: "",
          roleLimit: 0,
          roleCount: 0,
          policyCode: 0,
          adminType: IACLCommons.AgentType.NONE,
          scopeType: IACLCommons.ScopeType.NONE,
          ptype: IACLCommons.PolicyType.UNLOCK,
          acstat: IACLCommons.ActivityStatus.NONE,
          alstat: IACLCommons.AlterabilityStatus.NONE
        });
    }

    return
      IProfilePolicyManagement.ProfilePolicyInfo({
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
    ACLStorage.ProfileEntity storage profileEntity,
    IProfilePolicyManagement.ProfileUpdateAlterabilityRequest calldata request,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 senderId
  ) external {
    IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[request.entityId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      policyEntity.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    require(request.alstat != IACLCommons.AlterabilityStatus.NONE, "Illegal Alterability");
    policyEntity.alstat = request.alstat;
  }

  function profileGetPolicyType(uint8 policyCode) external pure returns (IACLCommons.PolicyType) {
    return _doProfileGetPolicyType(policyCode);
  }

  function profileRoleGetInfo(
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId
  ) external view returns (IProfileRoleManagement.ProfileRoleInfo memory) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if (!result || profileEntity.acstat == IACLCommons.ActivityStatus.NONE) {
      return
        IProfileRoleManagement.ProfileRoleInfo({
          scopeId: bytes32(0),
          typeId: bytes32(0),
          adminId: bytes32(0),
          memberLimit: 0,
          memberCount: 0,
          adminType: IACLCommons.AgentType.NONE,
          atype: IACLCommons.AgentType.NONE,
          acstat: IACLCommons.ActivityStatus.NONE,
          alstat: IACLCommons.AlterabilityStatus.NONE,
          name: ""
        });
    }
    return
      IProfileRoleManagement.ProfileRoleInfo({
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
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if (!result) return false;

    (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if (!result1) return false;

    return typeEntity.members[memberId] != bytes32(0);
  }

  function profileRoleCheckAdmin(
    ACLStorage.DataCollection storage data,
    bytes32 profileId,
    bytes32 roleId,
    address account
  ) external view returns (bool) {
    ACLStorage.ProfileEntity storage profileEntity = data.profiles[profileId];
    if (profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;
    if (profileEntity.agents[roleId].atype != IACLCommons.AgentType.ROLE) return false;

    bytes32 roleAdminId = profileEntity.agents[roleId].adminId;
    IACLCommons.AgentType adminAgenType = profileEntity.agents[roleAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (adminAgenType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleAdminId);
      if (!result) return false;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(
        roleEntity.typeId
      );
      if (!result1) return false;

      return typeEntity.members[memberId] == roleAdminId;
    } else if (adminAgenType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }

    return false;
  }

  function profileRoleUpdateScope(
    IProfileRoleManagement.ProfileUpdateScopeRequest calldata request,
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 profileId,
    bytes32 senderId
  ) external returns (bool) {
    IACLCommons.RoleEntity storage roleEntity = _doProfileGetRoleEntityAndCheckAdminAccess(
      profileEntity,
      functionEntity,
      request.entityId,
      senderId
    );
    IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    _doProfileRoleCheckRequestScope(profileEntity, request.scopeId, typeEntity.scopeId, profileId);
    IACLCommons.BaseScope storage oldScope = profileEntity.scopes[roleEntity.scopeId];
    require(oldScope.referredByAgent > 0, "Illeagl Referred");
    unchecked {
      oldScope.referredByAgent -= 1;
    }
    roleEntity.scopeId = request.scopeId;

    return true;
  }

  function profileGetRoleEntityAndCheckAdminAccess(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 roleId,
    bytes32 senderId
  ) external view returns (IACLCommons.RoleEntity storage) {
    return _doProfileGetRoleEntityAndCheckAdminAccess(profileEntity, functionEntity, roleId, senderId);
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

  function profileGetRoleAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) external view returns (bytes32 roleAdminId) {
    return _doProfileGetRoleAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }

  function _doProfileGetPolicyAndCheckAdminAccess(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 policyId,
    bytes32 memberId
  ) private view returns (IACLCommons.PolicyEntity storage) {
    IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    require(policyEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      policyEntity.adminId,
      memberId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _doProfileGetPolicyAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) private view returns (bytes32 policyAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype == IACLCommons.AgentType.ROLE, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(
        profileEntity,
        adminId
      );
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      policyAdminId = adminId;
    } else {
      policyAdminId = requestScopeAdmin;
    }
  }

  function _doProfileGetPolicyType(uint8 policyCode) private pure returns (IACLCommons.PolicyType) {
    if (policyCode == 0) {
      return IACLCommons.PolicyType.UNLOCK;
    } else if (policyCode <= 63) {
      return IACLCommons.PolicyType.SLOCK;
    } else if (policyCode <= 127) {
      return IACLCommons.PolicyType.MLOCK;
    } else if (policyCode <= 191) {
      return IACLCommons.PolicyType.RLOCK;
    } else if (policyCode <= 254) {
      return IACLCommons.PolicyType.HLOCK;
    } else {
      return IACLCommons.PolicyType.LOCK;
    }
  }

  function _doProfileGetRoleEntityAndCheckAdminAccess(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.FunctionEntity storage functionEntity,
    bytes32 roleId,
    bytes32 senderId
  ) private view returns (IACLCommons.RoleEntity storage) {
    IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(roleId);
    require(roleEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");

    // check access admin role
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(
      profileEntity,
      functionEntity,
      roleEntity.ba.adminId,
      senderId
    );
    if (status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return roleEntity;
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

  function _doProfileGetRoleAdmin(
    ACLStorage.ProfileEntity storage profileEntity,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId,
    bytes32 profileId
  ) private view returns (bytes32 roleAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(
        profileEntity,
        adminId
      );
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(
          IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId),
          "Illegal Admin Scope"
        );
      }
      roleAdminId = adminId;
    } else {
      roleAdminId = requestScopeAdmin;
    }
  }

  function _doProfileRoleCheckRequestScope(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 typeScopeId,
    bytes32 profileId
  ) private returns (IACLCommons.ScopeType) {
    // checking requested role scope
    IACLCommons.BaseScope storage requestScope = profileEntity.scopes[requestScopeId];
    require(requestScope.stype != IACLCommons.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommons.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    // checking requested role type scope with role scope
    IACLCommons.ScopeType typeScopeType = profileEntity.scopes[typeScopeId].stype;
    require(typeScopeType >= requestScope.stype, "Illegal ScopeType");
    if (typeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, typeScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestScope.stype;
  }

  function _doProfilePolicyCheckRequestScope(
    ACLStorage.ProfileEntity storage profileEntity,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommons.ScopeType senderScopeType,
    bytes32 profileId
  ) private returns (IACLCommons.BaseScope storage) {
    // checking requested type scope
    IACLCommons.BaseScope storage requestScope = profileEntity.scopes[requestScopeId];
    require(requestScope.stype != IACLCommons.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommons.ActivityStatus.DELETED, "Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    require(requestScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(
        IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, senderScopeId, requestScopeId),
        "Illegal Scope"
      );
    }

    return requestScope;
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

  function _doAgentGetScopeInfo(ACLStorage.ProfileEntity storage profileEntity, bytes32 agentId)
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
}
