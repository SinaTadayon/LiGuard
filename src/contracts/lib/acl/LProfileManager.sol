// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

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
import "../../acl/profile/scope/IProfileContextManagement.sol";
import "../../acl/profile/scope/IProfileFunctionManagement.sol";
import "../../acl/profile/scope/IProfileRealmManagement.sol";
import "../../acl/profile/scope/IProfileDomainManagement.sol";
import "../../acl/profile/scope/IProfileGlobalManagement.sol";
import "../../acl/profile/agent/IProfileMemberManagement.sol";
import "../../acl/profile/agent/IProfileRoleManagement.sol";
import "../../acl/profile/agent/IProfileTypeManagement.sol";
import "../../acl/profile/policy/IProfilePolicyManagement.sol";

import "hardhat/console.sol";

/**
 * @title Profile Manager Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileManager {
  using LProfileStorage for IACLCommons.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileManager";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID        = keccak256(abi.encodePacked("GLOBAL.LIVELY_PROFILE"));

  function initProfile(IACLCommons.ProfileEntity storage profileEntity, address owner, address livelyAdmin, address systemAdmin) public {
    // init Global Scope
    IACLCommons.GlobalEntity storage livelyGlobalEntity = profileEntity.profileGlobalWriteSlot(LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    livelyGlobalEntity.name = "GLOBAL.LIVELY_PROFILE";
    livelyGlobalEntity.domainLimit = profileEntity.limits.domainLimit;
    livelyGlobalEntity.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyGlobalEntity.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyGlobalEntity.bs.stype = IACLCommons.ScopeType.GLOBAL;
    livelyGlobalEntity.bs.adminId = LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type       
    IACLCommons.TypeEntity storage livelyMasterType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
    livelyMasterType.roleLimit = profileEntity.limits.typeRoleLimit;
    livelyMasterType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = IACLCommons.AgentType.TYPE;
    livelyMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
          
    // Create Lively Master Admin Role
    IACLCommons.RoleEntity storage livelyMasterAdminRole = profileEntity.profileRoleWriteSlot(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN";
    livelyMasterAdminRole.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterAdminRole.typeId = LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = profileEntity.limits.memberLimit;
    livelyMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Owner Member
    bytes32 ownerMemberId = LACLUtils.accountGenerateId(owner);
    IACLCommons.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(ownerMemberId);   
    ownerMember.account = owner;
    ownerMember.typeLimit = profileEntity.limits.typeLimit;
    ownerMember.callLimit = profileEntity.limits.profileCallLimit;
    ownerMember.registerLimits = profileEntity.registerLimits;          
    ownerMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    ownerMember.ba.atype = IACLCommons.AgentType.MEMBER;
    ownerMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    ownerMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;   

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = LACLUtils.accountGenerateId(livelyAdmin);
    IACLCommons.ProfileMemberEntity storage livelyMasterAdminMember = profileEntity.profileMemberWriteSlot(livelyMasterAdminMemberId);   
    livelyMasterAdminMember.account = livelyAdmin;
    livelyMasterAdminMember.typeLimit = profileEntity.limits.typeLimit;
    livelyMasterAdminMember.callLimit = profileEntity.limits.profileCallLimit;
    livelyMasterAdminMember.registerLimits = profileEntity.registerLimits;          
    livelyMasterAdminMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;      

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Agent and Policy types
    livelyMasterAdminMember.types.add(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;


    _doInitProfileSystemMaster(profileEntity, systemAdmin);

      // // Create Profile Domain 
      // bytes32 profileDomainId = LACLUtils.generateId2("DOMAIN.LIVELY_PROFILE.ZERO_DOMAIN");
      // IACLCommons.DomainEntity storage profileDomain = profileEntity.profileDomainWriteSlot(profileDomainId);
      // profileDomain.name = "DOMAIN.LIVELY_PROFILE.ZERO_DOMAIN";
      // profileDomain.realmLimit = profileEntity.limits.realmLimit;
      // profileDomain.bs.stype = IACLCommons.ScopeType.DOMAIN;
      // profileDomain.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      // profileDomain.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
      // profileDomain.bs.adminId = LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID;

      // // Create Profile Realm
      // bytes32 profileRealmId = LACLUtils.generateId2("REALM.LIVELY_PROFILE.ZERO_DOMAIN.ZERO_REALM");
      // IACLCommons.RealmEntity storage profileRealm = profileEntity.profileRealmWriteSlot(profileRealmId);
      // profileRealm.name = "REALM.LIVELY_PROFILE.ZERO_DOMAIN.ZERO_REALM";
      // profileRealm.contextLimit = profileEntity.limits.contextLimit;
      // profileRealm.domainId = profileDomainId;
      // profileRealm.bs.stype = IACLCommons.ScopeType.REALM;
      // profileRealm.bs.alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;
      // profileRealm.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
      // profileRealm.bs.adminId = LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID;
    // }
    
    // update livelyGlobalEntity.bs.referredByAgent
    livelyGlobalEntity.bs.referredByAgent = 4;
    livelyGlobalEntity.domains.add(LACLUtils.generateId2("DOMAIN.LIVELY_PROFILE.ZERO_DOMAIN"));
  }

  function _doInitProfileSystemMaster(IACLCommons.ProfileEntity storage profileEntity, address systemAdmin) internal {
        // Create System Master Type       
    IACLCommons.TypeEntity storage systemMasterType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    systemMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
    systemMasterType.roleLimit = profileEntity.limits.typeRoleLimit;
    systemMasterType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
    systemMasterType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterType.ba.atype = IACLCommons.AgentType.TYPE;
    systemMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    systemMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    systemMasterType.roles.add(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);

    // Create System Master Admin Role
    IACLCommons.RoleEntity storage systemMasterAdminRole = profileEntity.profileRoleWriteSlot(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
    systemMasterAdminRole.name = "ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN";
    systemMasterAdminRole.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
    systemMasterAdminRole.typeId = LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID;
    systemMasterAdminRole.memberLimit = profileEntity.limits.memberLimit;
    systemMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
    systemMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    systemMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    systemMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create System Master Admin Member
    bytes32 systemMasterAdminMemberId = LACLUtils.accountGenerateId(systemAdmin);
    IACLCommons.ProfileMemberEntity storage systemMasterAdminMember = profileEntity.profileMemberWriteSlot(systemMasterAdminMemberId);
    systemMasterAdminMember.typeLimit = profileEntity.limits.typeLimit;
    systemMasterAdminMember.callLimit = profileEntity.limits.profileCallLimit;
    systemMasterAdminMember.registerLimits = IACLCommons.ProfileRegisterLimit({
      memberRegisterLimit: 0,
      roleRegisterLimit: 0,
      typeRegisterLimit: 0,
      functionRegisterLimit: profileEntity.registerLimits.functionRegisterLimit,
      contextRegisterLimit: profileEntity.registerLimits.contextRegisterLimit,
      realmRegisterLimit: 0,
      domainRegisterLimit: 0,
      policyRegisterLimit: 0
    });
    systemMasterAdminMember.account = systemAdmin;      
    systemMasterAdminMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
    systemMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    systemMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    
    // bind Lively Master Admin Member to Admin role
    systemMasterType.members[systemMasterAdminMemberId] = LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID;
  }
}