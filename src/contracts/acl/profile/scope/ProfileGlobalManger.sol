// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileGlobalManagement.sol";
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
 * @title Profile Global Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileGlobalManager is ACLStorage, BaseUUPSProxy, IProfileGlobalManagement {
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
    return
      interfaceId == type(IProfileGlobalManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileGlobalUpdateActivityStatus(bytes32 profileId, ActivityStatus acstat) external returns (bool) {

    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermissionActivity(profileId, IProfileGlobalManagement.profileGlobalUpdateActivityStatus.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(acstat > ActivityStatus.DELETED, "Illegal Activity");
    globalEntity.bs.acstat = acstat;
    emit ProfileGlobalActivityUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, acstat);
    return true;
  }


  function profileGlobalUpdateAlterabilityStatus(bytes32 profileId, AlterabilityStatus alstat) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateAlterabilityStatus.selector);
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, globalEntity.bs.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    globalEntity.bs.alstat = alstat;
    emit ProfileGlobalAlterabilityUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, alstat);    
    return true;
  }

  function profileGlobalUpdateAdmin(bytes32 profileId, bytes32 adminId) external returns (bool) { 
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateAdmin.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(adminId != globalEntity.bs.adminId && adminId != bytes32(0), "Illegal AdminId");    
    BaseAgent storage adminBaseAgent = profileEntity.agents[adminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage profileAdminType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
      require(profileAdminType.roles.contains(adminId), "Not Found");
    } else {
      require(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID == adminId, "Illegal Admin");
    }
    
    globalEntity.bs.adminId = adminId;
    emit ProfileGlobalAdminUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, adminId);
  
    return true;
  }

  function profileGlobalUpdateDomainLimit(bytes32 profileId, uint16 domainLimit) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateDomainLimit.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, senderId);
    require(domainLimit > globalEntity.domains.length() , "Illegal Limit");
    globalEntity.domainLimit = domainLimit;      
    emit ProfileGlobalDomainLimitUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, domainLimit);    
    return true;
  }

  function profileGlobalCheckAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage profileAdminType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    return profileAdminType.members[memberId] != bytes32(0);  
  }

  function profileGlobalGetDomains(bytes32 profileId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    return globalEntity.domains.values();
  }

  function profileGlobalGetInfo(bytes32 profileId) external view returns (ProfileGlobalInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);

    if(profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileGlobalInfo ({            
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

    return ProfileGlobalInfo ({            
      id: _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID,
      adminId: globalEntity.bs.adminId,
      domainLimit: globalEntity.domainLimit,
      domainCount: uint16(globalEntity.domains.length()),      
      referredByAgent: globalEntity.bs.referredByAgent,
      stype:  globalEntity.bs.stype,
      adminType: profileEntity.agents[globalEntity.bs.adminId].atype,
      acstat: globalEntity.bs.acstat,      
      alstat: globalEntity.bs.alstat
    });
  }



  function _doCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 adminId, bytes32 senderId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  
    // // owners always access to all entities to modify those
    // if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    // (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    // if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;

    // // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    // AgentType adminAgentType = profileEntity.agents[adminId].atype;
    // if(adminAgentType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
    //   if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
    //   if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    // } else if(adminAgentType == AgentType.TYPE) { 
    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

    //   bytes32 roleId = typeEntity.members[senderId];
    //   (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    //   if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    // } 

    // return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  // function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
  //   AgentType atype = profileEntity.agents[agentId].atype;
  //   if (atype == AgentType.ROLE) {
  //     RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
  //     BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
  //     return (baseScope.stype, roleEntity.scopeId);

  //   } else if(atype == AgentType.TYPE) {
  //     TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
  //     BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
  //     return (baseScope.stype, typeEntity.scopeId);
  //   }

  //   return (ScopeType.NONE, bytes32(0));  
  // }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);    
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);      
    return (profileEntity, functionEntity, senderId);
  }


  function _accessPermissionActivity(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   

    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);
    if (!res) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_NOT_FOUND);

     _doAclHasAccess(profileEntity, functionEntity, senderId);
    return (profileEntity, functionEntity, senderId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) internal view returns (GlobalEntity storage) {
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    require(globalEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, globalEntity.bs.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return globalEntity;
  }

  function _doAclHasAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 memberId) internal {
    
    if(profileEntity.limits.profileCallLimit > 0) {
      profileEntity.limits.profileCallLimit -= 1;
    } else {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN);
    }

    AgentType atype = profileEntity.agents[functionEntity.agentId].atype;

    if(atype == AgentType.ROLE) {
      // check member activation
      (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
      if(!result0) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
      if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN); 
      if(profileEntity.owner != profileMemberEntity.account) {
        if(profileMemberEntity.callLimit > 0) {
          profileMemberEntity.callLimit -= 1;
        } else {
          LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
        }
      }
      
      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      if(!result1) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND);      
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
      // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
      //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result2) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND);
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED);

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN);

    } else if(atype == AgentType.TYPE) {
      if(functionEntity.agentId == _LIVELY_PROFILE_ANY_TYPE_ID) {
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
        if(!result0) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
        if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);        
        if(profileEntity.owner != profileMemberEntity.account) {
          if(profileMemberEntity.callLimit > 0) {
            profileMemberEntity.callLimit -= 1;
          } else {
            LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
          }
        }

      } else if(functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        _doCheckTypeAccess(profileEntity, functionEntity, memberId);
        // // check member activation
        // (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
        // if(!result0) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
        // if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
        // if(profileEntity.owner != profileMemberEntity.account) {
        //   if(profileMemberEntity.callLimit > 0) {
        //     profileMemberEntity.callLimit -= 1;
        //   } else {
        //     LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
        //   }
        // }
        
        // // check type activation
        // (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
        // if(!result1) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND);
        // if(typeEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

        // // check role activation
        // bytes32 roleId = typeEntity.members[memberId];
        // (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
        // if(!result2) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND);
        // if(roleEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
        // // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
        // //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);
        
        // // check policy activation
        // PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
        // if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        //   LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN);
      } 
    } else if(atype <= AgentType.MEMBER) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED);
    }

    // check function activity
    if(functionEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN);

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    if(!res1) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_NOT_FOUND);
    if(contextEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN);

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    if(!res2) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_NOT_FOUND);
    if(realmEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN);

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    if(!res3) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_NOT_FOUND);
    if(domainEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN);

    // check global activity
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    if(globalEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.GLOBAL_ACTIVITY_FORBIDDEN);    
  }

  // function _doHasAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 memberId) internal returns (IProfileACL.ProfileAuthorizationStatus) {
    
  //   if(profileEntity.limits.profileCallLimit > 0) {
  //     profileEntity.limits.profileCallLimit -= 1;
  //   } else {
  //     return IProfileACL.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN;
  //   }

  //   AgentType atype = profileEntity.agents[functionEntity.agentId].atype;
  //   if(atype == AgentType.ROLE) {
  //     // check member activation
  //     (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
  //     if(!result0) return IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
  //     if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN; 
  //     if(profileEntity.owner != profileMemberEntity.account) {
  //       if(profileMemberEntity.callLimit > 0) {
  //         profileMemberEntity.callLimit -= 1;
  //       } else {
  //         return IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
  //       }
  //     }
      
  //     // check role activation
  //     (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
  //     if(!result1) return IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND;      
  //     if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;

  //     // check type activation
  //     (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
  //     if(!result2) return IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND;
  //     if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;
  //     // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
  //     //   return IProfileACL.ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN;

  //     // check memberId with agentId role
  //     if (typeEntity.members[memberId] != functionEntity.agentId) return IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED;

  //     // check policy activation
  //     PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
  //     if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
  //       return IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN;

  //   } else if(atype == AgentType.TYPE) {
  //     if(functionEntity.agentId == _LIVELY_PROFILE_ANY_TYPE_ID) {
  //       (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
  //       if(!result0) return IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
  //       if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;        
  //       if(profileEntity.owner != profileMemberEntity.account) {
  //         if(profileMemberEntity.callLimit > 0) {
  //           profileMemberEntity.callLimit -= 1;
  //         } else {
  //           return IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
  //         }
  //       }

  //     } else if(functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
  //       IProfileACL.ProfileAuthorizationStatus status = _doCheckTypeAccess(profileEntity, memberId, functionEntity);
  //       if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) return status;
        
  //     } 
  //   } else if(atype <= AgentType.MEMBER) {
  //     return IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED;
  //   }

  //   // check function activity
  //   if(functionEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN);

  //   // check context activity
  //   (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
  //   if(!res1) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_NOT_FOUND);
  //   if(contextEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN);

  //   // check realm activity
  //   (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
  //   if(!res2) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_NOT_FOUND);
  //   if(realmEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN);

  //   // check domain activity
  //   (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
  //   if(!res3) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_NOT_FOUND);
  //   if(domainEntity.bs.acstat != ActivityStatus.ENABLED) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN);
    
  //   return IProfileACL.ProfileAuthorizationStatus.PERMITTED;
  // }

  function _doCheckTypeAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 memberId) internal {
    // check member activation
    (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
    if(!result0) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
    if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
    if(profileEntity.owner != profileMemberEntity.account) {
      if(profileMemberEntity.callLimit > 0) {
        profileMemberEntity.callLimit -= 1;
      } else {
        LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
      }
    }
    
    // check type activation
    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
    if(!result1) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND);
    if(typeEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

    // check role activation
    bytes32 roleId = typeEntity.members[memberId];
    (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result2) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND);
    if(roleEntity.ba.acstat != ActivityStatus.ENABLED) LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
    // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
    //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);
    
    // check policy activation
    PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }   
}