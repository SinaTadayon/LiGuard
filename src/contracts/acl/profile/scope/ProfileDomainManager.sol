// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileDomainManagement.sol";
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
 * @title Profile Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileDomainManager is ACLStorage, BaseUUPSProxy, IProfileDomainManagement {
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
      interfaceId == type(IProfileDomainManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function profileDomainRegister(ProfileMemberSignature calldata memberSign, ProfileDomainRegisterRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainRegister.selector);
    
    // check profile and domain limitations and update it
    LProfileCommons.profileCheckMemberForDomainRegister(profileEntity, uint16(requests.length), senderId);
  
      // fetch scope type and scope id of sender
    bytes32 senderScopeId = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId);    
    require(senderScopeId == _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Universe Scope");
    
    for(uint i = 0; i < requests.length; i++) {          
      bytes32 newDomainId = LProfileCommons.profileDomainRegister(profileEntity, requests[i], functionEntity, senderId);
      emit ProfileDomainRegistered(
        sender,
        profileId,
        newDomainId,
        requests[i].adminId
      );    
    }

    return true;
  }
 
  function profileDomainUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {    
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId); 
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      domainEntity.bs.acstat = requests[i].acstat;
      emit ProfileDomainActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileDomainUpdateAlterabilityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainUpdateAlterabilityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {    
      DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(requests[i].entityId);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, domainEntity.bs.adminId, senderId);
      if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      domainEntity.bs.alstat = requests[i].alstat;
      emit ProfileDomainAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);    
    }
    return true;  
  }

  function profileDomainUpdateAdmin(ProfileMemberSignature calldata memberSign, ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainUpdateAdmin.selector);
    for(uint i = 0; i < requests.length; i++) {  
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId); 
  
      // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(profileEntity.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(profileEntity, requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = profileEntity.scopes[_LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID].adminId;
      }

      emit ProfileDomainAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    }    
    return true;
  }

  function profileDomainMoveRealm(ProfileMemberSignature calldata memberSign, ProfileDomainMoveRealmRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainMoveRealm.selector);
    for(uint i = 0; i < requests.length; i++) {  
      _doProfileDomainMoveRealm(requests[i], profileEntity, functionEntity, profileId, senderId,  sender);
    }
    return true;
  }

  function profileDomainUpdateRealmLimit(ProfileMemberSignature calldata memberSign, ProfileDomainUpdateRealmLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileDomainManagement.profileDomainUpdateRealmLimit.selector);
    for(uint i = 0; i < requests.length; i++) {    
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].domainId, senderId); 
      require(requests[i].realmLimit > domainEntity.realms.length(), "Illegal Limit");
      domainEntity.realmLimit = requests[i].realmLimit;           
      emit ProfileDomainRealmLimitUpdated(sender, profileId, requests[i].domainId, requests[i].realmLimit);
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
      (RoleEntity storage roleEntity, bool result0) = profileEntity.profileRoleTryReadSlot(domainAdminId);
      if(!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] == domainAdminId;
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(domainAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
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
        universeId: bytes32(0),
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
      universeId: de.universeId,
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 adminId, bytes32 senderId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);    
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
  
  function _accessPermission(ProfileMemberSignature calldata memberSign, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32, bytes32, address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");

    address signer;

    if(memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(signer);

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);    
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);      
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 domainId, bytes32 senderId) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(domainId); 
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, domainEntity.bs.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return domainEntity;
  }

  function _doGetRealmEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 realmId, bytes32 senderId) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, realmEntity.bs.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return realmEntity;
  }  

  function _doGetMemberScopeInfoFromType(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  }

  function _doProfileDomainMoveRealm(ProfileDomainMoveRealmRequest calldata request, ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) internal {
    DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, request.domainId, senderId);
    require(domainEntity.realms.contains(request.realmId), "Realm Not Found");
    DomainEntity storage targetDomainEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, request.targetDomainId, senderId);
    RealmEntity storage realmEntity = _doGetRealmEntityAndCheckAdminAccess(profileEntity, functionEntity, request.realmId, senderId);
    require(targetDomainEntity.realmLimit > targetDomainEntity.realms.length(), "Illegal Move" );
    domainEntity.realms.remove(request.realmId);
    targetDomainEntity.realms.add(request.realmId);
    realmEntity.domainId = request.targetDomainId;
    emit ProfileDomainRealmMoved(sender, profileId, request.domainId, request.realmId, request.targetDomainId);            
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }   
}