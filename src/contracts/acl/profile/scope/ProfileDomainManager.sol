// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileDomainManagement.sol";
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
 * @title Profile Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileDomainManager is ACLStorage, BaseUUPSProxy, IProfileDomainManagement {
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
      interfaceId == type(IProfileDomainManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function profileDomainRegister(ProfileDomainRegisterRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    
      // check profile and domain limitations and update it
      LProfileCommons.profileCheckMemberForDomainRegister(profileEntity, uint16(requests[i].domains.length), senderId);
      
      // fetch scope type and scope id of sender
      bytes32 senderScopeId = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId);    
      require(senderScopeId == _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Global Scope");
    
      for(uint j = 0; j < requests[i].domains.length; j++) {        
        bytes32 newDomainId = LProfileCommons.profileDomainRegister(profileEntity, requests[i].domains[j], senderId, functionId);
        emit ProfileDomainRegistered(
          msg.sender,
          requests[i].profileId,
          newDomainId,
          requests[i].domains[j].adminId
        );
      }
    }

    return true;
  }
 
  function profileDomainUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId); 
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");
        domainEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileDomainActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileDomainUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(requests[i].data[j].entityId);
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, domainEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        domainEntity.bs.alstat = requests[i].data[j].alstat;
        emit ProfileDomainAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;  
  }

  function profileDomainUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId); 
    
        // checking requested domain admin 
        if(requests[i].data[j].adminId != bytes32(0)) {
          require(profileEntity.agents[requests[i].data[j].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
          bytes32 requestAdminScopeId = _doAgentGetScopeInfo(profileEntity, requests[i].data[j].adminId);
          require(requestAdminScopeId == _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
          domainEntity.bs.adminId = requests[i].data[j].adminId;
        } else {
          domainEntity.bs.adminId = profileEntity.scopes[_LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID].adminId;
        }

        emit ProfileDomainAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileDomainMoveRealm(ProfileDomainMoveRealmRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainMoveRealm.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].data.length; j++) {
        DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].domainId, senderId, functionId);
        require(domainEntity.realms.contains(requests[i].data[j].realmId), "Realm Not Found");
        DomainEntity storage targetDomainEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].targetDomainId, senderId, functionId);
        RealmEntity storage realmEntity = _doGetRealmEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].realmId, senderId, functionId);
        require(targetDomainEntity.realmLimit > targetDomainEntity.realms.length(), "Illegal Move" );
        domainEntity.realms.remove(requests[i].data[j].realmId);
        targetDomainEntity.realms.add(requests[i].data[j].realmId);
        realmEntity.domainId = requests[i].data[j].targetDomainId;
        emit ProfileDomainRealmMoved(msg.sender, requests[i].profileId, requests[i].data[j].domainId, requests[i].data[j].realmId, requests[i].data[j].targetDomainId);        
      }
    }
    return true;
  }

  function profileDomainUpdateRealmLimit(ProfileDomainUpdateRealmLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileDomainManagement.profileDomainUpdateRealmLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
      for(uint j = 0; j < requests[i].limits.length; j++) {
        DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].domainId, senderId, functionId); 
        require(requests[i].limits[j].realmLimit > domainEntity.realms.length(), "Illegal Limit");
        domainEntity.realmLimit = requests[i].limits[j].realmLimit;           
        emit ProfileDomainRealmLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].domainId, requests[i].limits[j].realmLimit);
      }
    }
    return true;
  }

  function profileDomainCheckId(bytes32 profileId, bytes32 domainId) external view returns (bool) {
    return _data.profiles[profileId].scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function profileDomainCheckName(bytes32 profileId, string calldata domainName) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function profileDomainCheckAdmin(bytes32 profileId, bytes32 domainId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (DomainEntity storage domainEntity, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if(!result) return false;  

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = profileEntity.agents[domainAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(profileEntity, domainAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(domainAdminId);
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


  function profileDomainHasFunction(bytes32 profileId, bytes32 domainId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (FunctionEntity storage fe, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(fe.contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = profileEntity.profileRealmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function profileDomainHasContext(bytes32 profileId, bytes32 domainId, bytes32 contextId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ContextEntity storage ce, bool result1) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = profileEntity.profileRealmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function profileDomainHasRealm(bytes32 profileId, bytes32 domainId, bytes32 realmId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.contains(realmId);
  }

  function profileDomainGetRealms(bytes32 profileId, bytes32 domainId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if(!result) return new bytes32[](0);
    return de.realms.values();
  }

  function profileDomainGetInfo(bytes32 profileId, bytes32 domainId) external view returns (ProfileDomainInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (DomainEntity storage de, bool result) = profileEntity.profileDomainTryReadSlot(domainId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileDomainInfo ({
        adminId: bytes32(0),
        realmLimit: 0,
        realmCount: 0,
        referredByAgent: 0,
        stype: ScopeType.NONE,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE,
        name: ""
      });
    } 

    return ProfileDomainInfo ({
      adminId: de.bs.adminId,
      realmLimit: de.realmLimit,
      realmCount: uint16(de.realms.length()),
      referredByAgent: de.bs.referredByAgent,
      adminType: profileEntity.agents[de.bs.adminId].atype,  
      stype: de.bs.stype,
      acstat: de.bs.acstat,
      alstat: de.bs.alstat,
      name: de.name
    });
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      return  roleEntity.scopeId;

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);  
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

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 domainId, bytes32 senderId, bytes32 functionId) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(domainId); 
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, domainEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return domainEntity;
  }

  function _doGetRealmEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 realmId, bytes32 senderId, bytes32 functionId) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, realmEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return realmEntity;
  }  

  function _doGetMemberScopeInfoFromType(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }   
}