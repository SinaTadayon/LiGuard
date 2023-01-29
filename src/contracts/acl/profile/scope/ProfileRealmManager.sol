// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRealmManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
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

      LProfileCommons.profileCheckMemberForRealmRegister(profileEntity, uint16(requests[i].realms.length), senderId);

      // fetch scope type and scope id of sender
      (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId);    
    
      for(uint j = 0; j < requests[i].realms.length; j++) {
        bytes32 newRealmId = LProfileCommons.profileRealmRegister(requests[i].realms[j], profileEntity, senderId, functionId, memberScopeType, memberScopeId);
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
          require(profileEntity.agents[requests[i].data[j].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
          (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, requests[i].data[j].adminId);
          require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
          if(ScopeType.REALM == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].data[j].entityId, "Illegal Amind Scope");
          } else {
            require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(requests[i].profileId, requestAdminScopeId, requests[i].data[j].entityId), "Illegal Admin Scope");
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

  function profileRealmMoveContext(ProfileRealmMoveContextRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmMoveContext.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].realmId, senderId, functionId);
        require(realmEntity.contexts.contains(requests[i].data[j].contextId), "Context Not Found");
        RealmEntity storage targetRealmEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].targetRealmId, senderId, functionId);
        ContextEntity storage contextEntity = _doGetContextEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].contextId, senderId, functionId);
        require(targetRealmEntity.contextLimit > targetRealmEntity.contexts.length(), "Illegal Move" );
        realmEntity.contexts.remove(requests[i].data[j].contextId);
        targetRealmEntity.contexts.add(requests[i].data[j].contextId);
        contextEntity.realmId = requests[i].data[j].targetRealmId;
        emit ProfileRealmContextMoved(msg.sender, requests[i].profileId, requests[i].data[j].realmId, requests[i].data[j].contextId, requests[i].data[j].targetRealmId);
      }
    }
    return true;
  }

   function _doGetContextEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 contextId, bytes32 senderId, bytes32 functionId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, contextEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return contextEntity;
  }

  function profileRealmUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileRealmManagement.profileRealmUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");  
        realmEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileRealmActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
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
        emit ProfileRealmAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
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
    (RealmEntity storage realmEntity, bool result) = profileEntity.profileRealmTryReadSlot(realmId);
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
      adminType: profileEntity.agents[re.bs.adminId].atype,
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
    return LProfileCommons.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

 function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
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

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }  
}