// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileGlobalManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
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

    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermissionActivity(profileId, IProfileGlobalManagement.profileGlobalUpdateActivityStatus.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, senderId, functionId);
    require(acstat > ActivityStatus.ENABLED, "Illegal Activity");
    globalEntity.bs.acstat = acstat;
    emit ProfileGlobalActivityUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, acstat);
    return true;
  }


  function profileGlobalUpdateAlterabilityStatus(bytes32 profileId, AlterabilityStatus alstat) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateAlterabilityStatus.selector);
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, globalEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    globalEntity.bs.alstat = alstat;
    emit ProfileGlobalAlterabilityUpdated(msg.sender, profileId, _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, alstat);    
    return true;
  }

  function profileGlobalUpdateAdmin(bytes32 profileId, bytes32 adminId) external returns (bool) { 
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateAdmin.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, senderId, functionId);
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
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfileGlobalManagement.profileGlobalUpdateDomainLimit.selector);
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(profileEntity, senderId, functionId);
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;

    // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    } 

    return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

 function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileId, functionId, senderId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId, senderId);
  }

  function _accessPermissionActivity(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IProfileACL.ProfileAuthorizationStatus status = _doHasAccess(profileEntity, senderId, functionId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId, senderId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 senderId, bytes32 functionId) internal view returns (GlobalEntity storage) {
    GlobalEntity storage globalEntity = profileEntity.profileGlobalReadSlot(_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    require(globalEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, globalEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return globalEntity;
  }

   function _doHasAccess(ProfileEntity storage profileEntity, bytes32 memberId, bytes32 functionId) internal returns (IProfileACL.ProfileAuthorizationStatus) {
    
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return IProfileACL.ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;

    if(profileEntity.limits.profileCallLimit > 0) {
      profileEntity.limits.profileCallLimit -= 1;
    } else {
      return IProfileACL.ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN;
    }

    AgentType atype = profileEntity.agents[functionEntity.agentId].atype;

    // console.log("agentId: ");
    // console.logBytes32(agentId);
    // console.log("atype: ");
    // console.logBytes1(bytes1(uint8(atype)));
    // console.log("memberId: ");
    // console.logBytes32(memberId);
    // console.log("member acstat: ");
    // console.logBytes1(bytes1(uint8(_data.agents[memberId].acstat)));
    // console.log("address(this): %s", address(this));
    if(atype == AgentType.ROLE) {
      // check member activation
      // console.log("agentId type is role");
      (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
      if(!result0) return IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
      if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN; 
      if(profileEntity.owner != profileMemberEntity.account) {
        if(profileMemberEntity.callLimit > 0) {
          profileMemberEntity.callLimit -= 1;
        } else {
          return IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
        }
      }
      
      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      // console.log("roleEntity: ");
      // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
      if(!result1) return IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND;      
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      // console.log("typeEntity: ");
      // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
      if(!result2) return IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;
      if(_data.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
        return IProfileACL.ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN;

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId) return IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED;

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      // console.log("policyEntity: ");
      // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN;

    } else if(atype == AgentType.TYPE) {
      // console.log("agentId is type . . .");
      if(functionEntity.agentId == _LIVELY_PROFILE_ANY_TYPE_ID) {
        // console.log("agentId is ANY type . . .");
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
        if(!result0) return IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;        
        if(profileEntity.owner != profileMemberEntity.account) {
          if(profileMemberEntity.callLimit > 0) {
            profileMemberEntity.callLimit -= 1;
          } else {
            return IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
          }
        }

      } else if(functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        IProfileACL.ProfileAuthorizationStatus status = _doCheckTypeAccess(profileEntity, memberId, functionEntity);
        if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) return status;
        
      } 
    } else if(atype <= AgentType.MEMBER) {
      return IProfileACL.ProfileAuthorizationStatus.UNAUTHORIZED;
    }

    // check function activity
    // console.log("functionEntity: ");
    // console.logBytes1(bytes1(uint8(functionEntity.bs.acstat)));
    if(functionEntity.bs.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = profileEntity.profileContextTryReadSlot(functionEntity.contextId);
    // console.log("contextEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res1) return IProfileACL.ProfileAuthorizationStatus.CONTEXT_NOT_FOUND;
    if(contextEntity.bs.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = profileEntity.profileRealmTryReadSlot(contextEntity.realmId);
    // console.log("realmEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res2) return IProfileACL.ProfileAuthorizationStatus.REALM_NOT_FOUND;
    if(realmEntity.bs.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = profileEntity.profileDomainTryReadSlot(realmEntity.domainId);
    // console.log("domainEntity: ");
    // console.logBytes1(bytes1(uint8(domainEntity.bs.acstat)));
    if(!res3) return IProfileACL.ProfileAuthorizationStatus.DOMAIN_NOT_FOUND;
    if(domainEntity.bs.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN;
    
    return IProfileACL.ProfileAuthorizationStatus.PERMITTED;
  }

  function _doCheckTypeAccess(ProfileEntity storage profileEntity, bytes32 memberId, FunctionEntity storage functionEntity) internal returns (IProfileACL.ProfileAuthorizationStatus) {
    (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
    if(!result0) return IProfileACL.ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
    if(profileMemberEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
    if(profileEntity.owner != profileMemberEntity.account) {
      if(profileMemberEntity.callLimit > 0) {
        profileMemberEntity.callLimit -= 1;
      } else {
        return IProfileACL.ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
      }
    }
    
    // check type activation
    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
    // console.log("typeEntity: ");
    // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
    if(!result1) return IProfileACL.ProfileAuthorizationStatus.TYPE_NOT_FOUND;
    if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

    // check role activation
    bytes32 roleId = typeEntity.members[memberId];
    (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    // console.log("roleEntity: ");
    // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
    if(!result2) return IProfileACL.ProfileAuthorizationStatus.ROLE_NOT_FOUND;
    if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
    if(_data.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId) 
      return IProfileACL.ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN;


    // check policy activation
    PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    // console.log("policyEntity: ");
    // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
    if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
      return IProfileACL.ProfileAuthorizationStatus.POLICY_FORBIDDEN;
    return IProfileACL.ProfileAuthorizationStatus.PERMITTED;
  }
  
}