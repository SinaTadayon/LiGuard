// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRealmManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */ 
contract ProfileRealmManager is ACLStorage, BaseUUPSProxy, IProfileRealmManagement {  
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
      interfaceId == type(IProfileRealmManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileRealmRegister(ProfileRealmRegisterRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

      // check profile and realm limitations and update it
      MemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(senderId);
      require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(memberEntity.registerLimits.domainRegisterLimit - uint16(requests[i].realms.length) > 0, "Illegal RealmRegisterLimit");
      require(profileEntity.limits.realmRegisterLimit - uint16(requests[i].realms.length) > 0, "Illegal RegisterLimit");
      memberEntity.registerLimits.realmRegisterLimit -= uint16(requests[i].realms.length); 
      profileEntity.limits.realmRegisterLimit -= uint16(requests[i].realms.length);


      // fetch scope type and scope id of sender
      (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID, senderId);    
    
      for(uint j = 0; j < requests[i].realms.length; j++) {
        bytes32 newRealmId = LACLUtils.generateId(requests[i].realms[j].name);
        require(profileEntity.scopes[newRealmId].stype == ScopeType.NONE, "Already Exist");

        // check sender scopes
        require(memberScopeType >= ScopeType.DOMAIN, "Illegal ScopeType");
        if(memberScopeType == ScopeType.DOMAIN) {
          require(memberScopeId == requests[i].realms[j].domainId, "Illegal Domain Scope");

        } else {
          require(memberScopeId == _LIVELY_VERSE_PROFILE_GLOBAL_SCOPE_ID, "Illegal Global Scope");
        }

        DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(requests[i].realms[j].domainId);
        require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
        require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

        // check access admin realm
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, domainEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

        // add to domain
        domainEntity.realms.add(newRealmId);

        // create new realm entity
        RealmEntity storage newRealm = profileEntity.profileRealmWriteSlot(newRealmId);
        newRealm.bs.stype = ScopeType.REALM;
        newRealm.bs.acstat = ActivityStatus.ENABLED;
        newRealm.bs.alstat = AlterabilityStatus.UPGRADABLE;
        newRealm.name = requests[i].realms[j].name;
        newRealm.domainId = requests[i].realms[j].domainId;
        newRealm.contextLimit = profileEntity.limits.contextLimit;
        newRealm.bs.adminId = _getRealmAdmin(profileEntity, domainEntity.bs.adminId, requests[i].realms[j].domainId, requests[i].realms[j].adminId);
        
        emit ProfileRealmRegistered(
          msg.sender,
          requests[i].profileId,
          newRealmId,
          requests[i].realms[j].domainId,
          requests[i].realms[j].adminId
        );
      }
    }
    return true;
  }

  function profileRealmUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);

        // checking requested type admin 
        if(requests[i].data[j].adminId != bytes32(0)) {        
          require(_data.agents[requests[i].data[j].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
          (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, requests[i].data[j].adminId);
          require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
          if(ScopeType.REALM == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].data[j].entityId, "Illegal Amind Scope");
          } else {
            require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileEntity, requestAdminScopeId, requests[i].data[j].entityId), "Illegal Admin Scope");
          }
          realmEntity.bs.adminId = requests[i].data[j].adminId;

        } else {
          realmEntity.bs.adminId = profileEntity.scopes[realmEntity.domainId].adminId;
        }

        emit ProfileRealmAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileRealmUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(requests[i].data[j].entityId);
        require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, realmEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);        
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");  
        realmEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileRealmActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].id, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileRealmUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(requests[i].data[j].entityId);        
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, realmEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);        
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        realmEntity.bs.alstat = requests[i].data[j].alstat;
        emit ProfileRealmAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].id, requests[i].data[j].alstat);
      }
    }
    return true;  
  }

  function profileRealmUpdateContextLimit(ProfileRealmUpdateContextLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmUpdateContextLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].limits.length; j++) {
        RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].realmId, senderId, functionId);
        require(requests[i].limits[j].contextLimit > realmEntity.contexts.length(), "Illegal Limit");
        realmEntity.contextLimit = requests[i].limits[j].contextLimit;      
        emit ProfileRealmContextLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].realmId, requests[i].limits[j].contextLimit);
      }
    }
    return true;
  }

  function profileRealmCheckId(bytes32 profileId, bytes32 realmId) external view returns (bool) {
    return _data.profiles[profileId].scopes[realmId].stype == ScopeType.REALM;
  }

  function profileRealmCheckName(bytes32 profileId, string calldata realmName) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

  function profileRealmCheckAdmin(bytes32 profileId, bytes32 realmId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (RealmEntity storage realmEntity, bool result) = profileEntity.realmTryReadSlot(realmId);
    if(!result) return false;  

    bytes32 realmAdminId = realmEntity.bs.adminId;
    AgentType agentType = profileEntity.agents[realmAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(profileEntity, realmAdminId, memberId);

    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(realmAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }

    return false;
  } 

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }

  function profileRealmHasFunction(bytes32 profileId, bytes32 realmId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;

    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(fe.contextId);
    if(!result1) return false;

    return ce.realmId == realmId;
  }

  function profileRealmHasContext(bytes32 profileId, bytes32 realmId, bytes32 contextId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;

    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if(!result) return false;  
    return re.contexts.contains(contextId);
  }

  function profileRealmGetContexts(bytes32 profileId, bytes32 realmId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);

    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if (!result) return new bytes32[](0);
    return re.contexts.values();
  }

  function profileRealmGetInfo(bytes32 profileId, bytes32 realmId) external view returns (ProfileRealmInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (RealmEntity storage re, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileRealmInfo ({
        domainId: bytes32(0),
        adminId: bytes32(0),
        contextLimit: 0, 
        contextCount: 0,
        referredByAgent: 0,
        stype: ScopeType.NONE,
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE, 
        adminType: AgentType.NONE,
        name: ""
      });
    }

    return ProfileRealmInfo ({
      domainId: re.domainId,
      adminId: re.bs.adminId,
      contextLimit: re.contextLimit, 
      contextCount: uint32(re.contexts.length()),
      referredByAgent: re.bs.referredByAgent,   
      stype: re.bs.stype,
      acstat: re.bs.acstat, 
      alstat: re.bs.alstat, 
      adminType: _data.agents[re.bs.adminId].atype,
      name: re.name
    });
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if(profileEntity.owners.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

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

 function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileEntity, functionId, senderId);
    if(status != ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 realmId, bytes32 senderId, bytes32 functionId) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, realmEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return realmEntity;
  }  

  function _doGetMemberScopeInfoFromType(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole =  profileEntity.profileRoleReadSlot(memberRoleId);
    return (profileEntity.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  } 

  function _getRealmAdmin(ProfileEntity storage profileEntity, bytes32 requestScopeAdmin, bytes32 domainId, bytes32 adminId) internal view returns (bytes32 realmAdminId) {
     // checking requested context admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(ScopeType.DOMAIN == requestAdminScopeType){
        require(requestAdminScopeId == domainId, "Illegal Amind Scope");

      } else {
        require(requestAdminScopeId == _LIVELY_VERSE_PROFILE_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
      }
      realmAdminId = adminId;

    } else {
      realmAdminId = requestScopeAdmin;
    }
  }
}