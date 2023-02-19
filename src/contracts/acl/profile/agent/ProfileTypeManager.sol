// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile ACL Type Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileTypeManager is ACLStorage, BaseUUPSProxy, IProfileTypeManagement {
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
      interfaceId == type(IProfileTypeManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileTypeRegister(ProfileMemberSignature calldata memberSign, ProfileTypeRegisterRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity,, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeRegister.selector);

    // check profile and type limitations and update it
    ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Profile Updatable");
    require(int32(profileMemberEntity.registerLimits.typeRegisterLimit) - int16(uint16(requests.length)) >= 0, "Illegal Member TypeRegisterLimit");
    require(int32(profileEntity.registerLimits.typeRegisterLimit) - int16(uint16(requests.length)) >= 0, "Illegal Profile TypeRegisterLimit");
    profileMemberEntity.registerLimits.typeRegisterLimit -= uint16(requests.length); 
    unchecked { profileEntity.registerLimits.typeRegisterLimit -= uint16(requests.length); }

    // fetch scope type and scope id of sender
    (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetMemberScopeInfoFromType(profileEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId);
    for(uint i = 0; i < requests.length; i++) {    
      _doProfileTypeRegister(requests[i], profileEntity, profileId, senderScopeType, senderScopeId);
    }
    return true;
  }

  function profileTypeUpdateAdmin(ProfileMemberSignature calldata memberSign, ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeUpdateAdmin.selector);
    for(uint i = 0; i < requests.length; i++) {    
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);

      // checking requested type admin   
      typeEntity.ba.adminId = _getTypeAdmin(
        profileEntity,
        profileEntity.scopes[typeEntity.scopeId].stype, 
        profileEntity.scopes[typeEntity.scopeId].adminId, 
        typeEntity.scopeId, 
        requests[i].adminId,
        profileId
      );

      emit ProfileTypeAdminUpdated(msg.sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profileTypeUpdateScope(ProfileMemberSignature calldata memberSign, ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeUpdateScope.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doTypeUpdateScope(requests[i], profileEntity, functionEntity, profileId, senderId);
    }
    return true;
  }

  function profileTypeUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");             
      typeEntity.ba.acstat = requests[i].acstat;
      emit ProfileTypeActivityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileTypeUpdateAlterabilityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeUpdateAlterabilityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(requests[i].entityId);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, typeEntity.ba.adminId, senderId);
      if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      typeEntity.ba.alstat = requests[i].alstat;
      emit ProfileTypeAlterabilityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileTypeUpdateRoleLimit(ProfileMemberSignature calldata memberSign, ProfileTypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) = _accessPermission(memberSign, IProfileTypeManagement.profileTypeUpdateRoleLimit.selector);
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].typeId, senderId);
      require(requests[i].roleLimit > typeEntity.roles.length(), "Illegal Limit");
      typeEntity.roleLimit = requests[i].roleLimit;        
      emit ProfileTypeRoleLimitUpdated(msg.sender, profileId, requests[i].typeId, requests[i].roleLimit);
    }
    return true;
  }

  function profileTypeCheckId(bytes32 profileId, bytes32 typeId) external view returns (bool) {
    return _data.profiles[profileId].agents[typeId].atype == AgentType.TYPE;
  }

  function profileTypeCheckName(bytes32 profileId, string calldata typeName) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function profileTypeCheckAdmin(bytes32 profileId, bytes32 typeId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    if (profileEntity.agents[typeId].atype != AgentType.TYPE) return false;    
    
    bytes32 typeAdminId = profileEntity.agents[typeId].adminId;
    AgentType adminAgentType = profileEntity.agents[typeAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(typeAdminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] == typeAdminId;
    
    } else if(adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(typeAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function profileTypeHasAccount(bytes32 profileId, bytes32 typeId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[LACLUtils.accountGenerateId(account)] != bytes32(0);
  }

  function profileTypeHasRole(bytes32 profileId, bytes32 typeId, bytes32 roleId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.contains(roleId);
  }

  function profileTypeGetRoles(bytes32 profileId, bytes32 typeId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);    
    if(!result) return new bytes32[](0);
    return te.roles.values();
  }

  function profileTypeGetInfo(bytes32 profileId, bytes32 typeId) external view returns (ProfileTypeInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (TypeEntity storage te, bool result) = profileEntity.profileTypeTryReadSlot(typeId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileTypeInfo ({
        scopeId: bytes32(0),
        adminId: bytes32(0),
        roleLimit: 0,
        roleCount: 0,    
        adminType: AgentType.NONE,
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });    
    }

    return ProfileTypeInfo ({
      scopeId: te.scopeId,
      adminId: te.ba.adminId,      
      roleLimit: te.roleLimit,
      roleCount: uint16(te.roles.length()),
      adminType: profileEntity.agents[te.ba.adminId].atype,
      atype: te.ba.atype,
      acstat: te.ba.acstat,
      alstat: te.ba.alstat,
      name: te.name
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

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 adminId, bytes32 senderId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);  
  }

 function _accessPermission(ProfileMemberSignature calldata memberSign, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32, bytes32) {
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
    return (profileEntity, functionEntity, profileId, senderId);
  }

  function _getTypeAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 typeAdminId) {
    // checking requested type admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      typeAdminId = adminId;

    } else {
      typeAdminId = requestScopeAdmin;
    }
  }

  function _doGetMemberScopeInfoFromType(ProfileEntity storage profileEntity, bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {    
    TypeEntity storage agentType = profileEntity.profileTypeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    RoleEntity storage memberAgentRole =  profileEntity.profileRoleReadSlot(memberRoleId);
    return (profileEntity.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 typeId, bytes32 senderId) internal view returns (TypeEntity storage) {
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, typeEntity.ba.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return typeEntity;
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType, bytes32 profileId) internal returns (BaseScope storage){
    // checking requested type scope
    BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != ScopeType.NONE , "Not Found");
    require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;
          
    // check sender scope with request scope
    require(senderScopeType >= requestedScope.stype, "Illegal Sender ScopeType");
    if(senderScopeType == requestedScope.stype) {
      require(senderScopeId == requestScopeId, "Illegal Sender Scope");

    } else {
      require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, senderScopeId, requestScopeId), "Illegal Admin Scope");
    }       

    return requestedScope;
  }     

  function _doProfileTypeRegister(ProfileTypeRegisterRequest calldata typeRequest, ProfileEntity storage profileEntity, bytes32 profileId, ScopeType senderScopeType, bytes32 senderScopeId) internal {

    bytes32 newTypeId = LACLUtils.generateId(typeRequest.name);
    require(profileEntity.agents[newTypeId].atype == AgentType.NONE, "Already Exist");    

    // checking requested type scope
    BaseScope storage requestedScope = _getAndCheckRequestScope(profileEntity, typeRequest.scopeId, senderScopeId, senderScopeType, profileId);
        
    // create new type
    TypeEntity storage newType = profileEntity.profileTypeWriteSlot(newTypeId);
    newType.ba.atype = AgentType.TYPE;
    newType.ba.acstat = ActivityStatus.ENABLED;
    newType.ba.alstat = AlterabilityStatus.UPDATABLE;
    newType.scopeId = typeRequest.scopeId;
    newType.roleLimit = typeRequest.roleLimit >= 0 ? uint16(uint24(typeRequest.roleLimit)) : profileEntity.limits.typeRoleLimit;
    newType.name = typeRequest.name;
    newType.ba.adminId = _getTypeAdmin(profileEntity, requestedScope.stype, requestedScope.adminId, typeRequest.scopeId, typeRequest.adminId, profileId);

    emit ProfileTypeRegistered(
      msg.sender,
      profileId,
      newTypeId,
      typeRequest.scopeId,
      typeRequest.adminId
    );
  }

  function _doTypeUpdateScope(ProfileUpdateScopeRequest calldata request, ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId) internal {
    ScopeType senderScopeType;
    bytes32 senderScopeId;

    TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, request.entityId, senderId);    

    AgentType adminAgentType = profileEntity.agents[typeEntity.ba.adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(typeEntity.ba.adminId);
      senderScopeId = roleEntity.scopeId;
      senderScopeType = profileEntity.scopes[roleEntity.scopeId].stype;
    } else {
      TypeEntity storage agentType = profileEntity.profileTypeReadSlot(typeEntity.ba.adminId);
      bytes32 memberRoleId = agentType.members[senderId];
      RoleEntity storage memberAgentRole = profileEntity.profileRoleReadSlot(memberRoleId);
      senderScopeType = profileEntity.scopes[memberAgentRole.scopeId].stype;
      senderScopeId = memberAgentRole.scopeId;
    }    

    BaseScope storage requestScope = _getAndCheckRequestScope(profileEntity, request.scopeId, senderScopeId, senderScopeType, profileId);
    BaseScope storage oldScope = profileEntity.scopes[typeEntity.scopeId];
    if(typeEntity.roles.length() > 0) {
      require(requestScope.stype > oldScope.stype, "Illegal ScopeType");
    }    
    require(oldScope.referredByAgent > 0, "Illeagl Referred");
    unchecked { oldScope.referredByAgent -= 1; }
    typeEntity.scopeId = request.scopeId;
    emit ProfileTypeScopeUpdated(msg.sender, profileId, request.entityId, request.scopeId);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }  
}