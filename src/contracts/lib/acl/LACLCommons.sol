// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./LACLUtils.sol";
import "./LACLStorage.sol";
import "./LProfileStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/IACLGenerals.sol";
import "../../acl/IACLManager.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";
import "../../acl/IACL.sol";

import "../../acl/profile/IProfileACL.sol";
import "../../acl/profile/IProfileACLGenerals.sol";
import "../../acl/profile/IProfileManagement.sol";


import "hardhat/console.sol";

/**
 * @title ACL Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLCommons {
  using LProfileStorage for IACLCommons.ProfileEntity;
  using LACLStorage for ACLStorage.DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LACLCommons";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID             = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID                   = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_TYPE_ID          = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER"));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER"));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_TYPE_ID           = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER"));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER"));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_TYPE_ID        = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER"));

  // Global Scope ID
  bytes32 private constant LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID        = keccak256(abi.encodePacked("GLOBAL.LIVELY_VERSE"));

  // General Roles ID 
  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID    = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN"));

  // Profile Commons
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_ANY_TYPE_ID                   = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID        = keccak256(abi.encodePacked("GLOBAL.LIVELY_PROFILE"));

  // ACL Type
  bytes32 public constant LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID      = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER"));
  

  function registerProxyFacet(ACLStorage.DataCollection storage data, address implementation) external {
    data.facetSet.add(address(this));
    IACLCommons.FacetEntity storage facetEntity = data.facets[address(this)];
    facetEntity.subjectId = implementation;
    // facetEntity.interfaceId = type(IACLManager).interfaceId;
    data.selectors[IProxy.upgradeTo.selector] = address(this);
    data.selectors[IProxy.setSafeModeStatus.selector] = address(this);
    data.selectors[IProxy.setUpdatabilityStatus.selector] = address(this);
    data.selectors[IProxy.setLocalAdmin.selector] = address(this);
    data.selectors[IProxy.setAccessControlManager.selector] = address(this);
    data.selectors[IProxy.contractName.selector] = address(this);
    data.selectors[IProxy.contractVersion.selector] = address(this);
    data.selectors[IProxy.accessControlManager.selector] = address(this);
    data.selectors[IProxy.subjectAddress.selector] = address(this);
    data.selectors[IProxy.safeModeStatus.selector] = address(this);
    data.selectors[IProxy.updatabilityStatus.selector] = address(this);
    data.selectors[IProxy.localAdmin.selector] = address(this);
    data.selectors[IProxy.domainSeparator.selector] = address(this);
    data.selectors[IProxy.initVersion.selector] = address(this);
    data.selectors[IProxy.withdrawBalance.selector] = address(this);
    data.selectors[IERC165.supportsInterface.selector] = address(this);
    data.selectors[IACLManager.aclRegisterFacet.selector] = address(this);
    data.selectors[IACLManager.aclUpgradeFacet.selector] = address(this);
    data.selectors[IACLManager.aclGetFacets.selector] = address(this);
    data.selectors[IACLManager.aclGetFacet.selector] = address(this);
    data.selectors[IACLManager.aclHasSelector.selector] = address(this);
    data.selectors[IACLManager.aclGetFacetInfo.selector] = address(this);
    data.selectors[IERC1822Proxiable.proxiableUUID.selector] = address(this); 
    data.selectors[bytes4(keccak256("initialize(string,string)"))] = address(this);
    data.selectors[bytes4(keccak256("initACL(address,address,address,address)"))] = address(this);
    data.selectors[bytes4(keccak256("getFirstInit()"))] = address(this);
    data.selectors[bytes4(keccak256("getLibrary()"))] = address(this);
  }

  function aclRegisterFacet(ACLStorage.DataCollection storage data, IACLManager.FacetRegisterRequest calldata request) external returns (bool) {
    
    require(!data.facetSet.contains(request.facetId), "Facet Already Exist");    
    // require(IERC165(request.facetId).supportsInterface(request.interfaceId), "Illegal Interface");
    for(uint j = 0; j < request.selectors.length; j++) {
      require(data.selectors[request.selectors[j]] == address(0), "Illegal Selector");
      data.selectors[request.selectors[j]] = request.facetId;
    }
    data.facetSet.add(request.facetId);
    IACLCommons.FacetEntity storage facetEntity = data.facets[request.facetId];
    facetEntity.subjectId = request.subjectId;
    // facetEntity.interfaceId = request.interfaceId;      

    return true;      
  }

  function initACLAgents(ACLStorage.DataCollection storage data, address livelyAdmin, address systemAdmin) public {
    _initACLAgents(data, livelyAdmin, systemAdmin);   
  }

  function checkAdminAccess(ACLStorage.DataCollection storage data, bytes32 adminId, bytes32 memberId, bytes32 functionId) external view returns (IACL.AdminAccessStatus) {
    return _doCheckAdminAccess(data, adminId, memberId, functionId);
  }

  function getPolicyAdmin(ACLStorage.DataCollection storage data, IACLCommons.ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) external view returns (bytes32 policyAdminId) {
    // checking requested type admin       
    if(adminId != bytes32(0)) {
      require(data.agents[adminId].atype == IACLCommons.AgentType.ROLE, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(data, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      policyAdminId = adminId;

    } else {
      policyAdminId = requestScopeAdmin;
    }      
  }
  
  function getPolicyAndCheckAdminAccess(ACLStorage.DataCollection storage data, bytes32 policyId, bytes32 memberId, bytes32 functionId) external view returns (IACLCommons.PolicyEntity storage) {
    IACLCommons.PolicyEntity storage policyEntity = data.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");      
    require(policyEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(data, policyEntity.adminId, memberId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return policyEntity;
  }

  function getAndCheckRequestScope(ACLStorage.DataCollection storage data, bytes32 requestScopeId, bytes32 senderScopeId, IACLCommons.ScopeType senderScopeType) external view returns (IACLCommons.BaseScope storage){
    // checking requested type scope
    IACLCommons.BaseScope storage requestedScope = data.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommons.ScopeType.NONE , "Scope Not Found");
    require(requestedScope.acstat > IACLCommons.ActivityStatus.DELETED , "Deleted");
  
    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if(requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {        
      require(IACLGenerals(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Scope");
    }      

    return requestedScope;
  }

  function profileCheckAdmin(ACLStorage.DataCollection storage data, bytes32 profileId, address account) external view returns (bool) {
    IACLCommons.ProfileEntity storage profileEntity =  data.profiles[profileId];
    if(profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;

    bytes32 profileAdminId = profileEntity.adminId;
    IACLCommons.AgentType agentType = data.agents[profileAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == IACLCommons.AgentType.ROLE) {
       (IACLCommons.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(profileAdminId);
      if(!result) return false;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);
    
    } else if(agentType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(profileAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function profileUpdateOwnerAccount(ACLStorage.DataCollection storage data, IACLCommons.ProfileEntity storage profileEntity, IProfileManagement.ProfileUpdateOwnerAccountRequest calldata request) external returns (bool) {

    // disable profile owner 
    require(profileEntity.owner == request.owner, "Illegal Owner");
    bytes32 ownerId = LACLUtils.accountGenerateId(request.owner);  
    bytes32 newOwnerId = LACLUtils.accountGenerateId(request.newOwner);
 
    // check new ownerId
    require(profileEntity.agents[newOwnerId].acstat == IACLCommons.ActivityStatus.NONE, "Already Exists");
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(ownerId);
    profileMemberEntity.ba.acstat = IACLCommons.ActivityStatus.DISABLED;
    profileMemberEntity.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;
    profileEntity.admins.remove(ownerId);
  
    IACLCommons.ProfileAccount storage profileAccount = data.profileAccounts[request.owner];
    for(uint j = 0; j < profileAccount.profiles.length; j++) {
      if(profileAccount.profiles[j] == request.profileId) {
          if(profileAccount.profiles.length > 1) {
          if(j < profileAccount.profiles.length - 1)
            profileAccount.profiles[j] = profileAccount.profiles[profileAccount.profiles.length - 1];
          profileAccount.profiles.pop();
        } else {
          profileAccount.profiles.pop();
          delete profileAccount.profiles;
        }          
        break;
      }
    }
    
    // add profile's new owner    
    _doCreateUpdateProfileAccount(data, request.profileId, request.newOwner);
    
    // Create Owner Member      
    IACLCommons.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(newOwnerId);   
    ownerMember.account = request.newOwner;
    ownerMember.typeLimit = profileEntity.limits.typeLimit;
    ownerMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    ownerMember.registerLimits = profileEntity.registerLimits;          
    ownerMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;      
    ownerMember.ba.atype = IACLCommons.AgentType.MEMBER;
    ownerMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    ownerMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    ownerMember.types.add(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);

    profileEntity.owner = request.newOwner;
    profileEntity.admins.add(newOwnerId);  

    // update profile lively master type
    IACLCommons.TypeEntity storage livelyMasterType = profileEntity.profileTypeReadSlot(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    delete livelyMasterType.members[ownerId];    
    livelyMasterType.members[newOwnerId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    return true;
  }

  function createUpdateProfileAccount(ACLStorage.DataCollection storage data, bytes32 profileId, address memberAddress) external {
    _doCreateUpdateProfileAccount(data, profileId, memberAddress);
  }

  function profileRegister(ACLStorage.DataCollection storage data, IProfileManagement.ProfileRegisterRequest calldata request, bytes32 signerId, bytes32 profileId, bytes32 functionId) external returns(bytes32){
    // fetch scope type and scope id of sender
    (IACLCommons.ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeFromType(data, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, signerId);
    require(signerScopeType == IACLCommons.ScopeType.GLOBAL && signerScopeId == LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Scope");
    require(request.expiredAt > block.timestamp + 1 days, "Illegal Expiration");
    require(request.limits.typeLimit >= 1, "Illegal TypeLimit");
  
    _doCreateUpdateProfileAccount(data, profileId, request.profileOwner);
    _doCreateUpdateProfileAccount(data, profileId, request.profileAdmin);
    _doCreateUpdateProfileAccount(data, profileId, request.profileSystemAdmin);

    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    profileEntity.name = request.name;
    profileEntity.owner = request.profileOwner;
    profileEntity.expiredAt = request.expiredAt;
    profileEntity.acstat = IACLCommons.ActivityStatus.ENABLED;
    profileEntity.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    profileEntity.registerLimits = request.registerLimits;
    profileEntity.limits = request.limits;
    profileEntity.admins.add(LACLUtils.accountGenerateId(request.profileOwner));
    profileEntity.admins.add(LACLUtils.accountGenerateId(request.profileAdmin));

    // check adminId
    if(request.adminId != bytes32(0)) {
      require(data.agents[request.adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      (, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(data, request.adminId);
      require(requestAdminScopeId == LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Admin Scope");
      IACL.AdminAccessStatus adminAccessStatus = _doCheckAdminAccess(data, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, signerId, functionId);
      if(adminAccessStatus != IACL.AdminAccessStatus.PERMITTED) revert IACL.SetAdminForbidden(adminAccessStatus);
      profileEntity.adminId = request.adminId;
    } else {
      profileEntity.adminId = LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
    }
      
    _doInitProfile(profileEntity, request.profileOwner, request.profileAdmin, request.profileSystemAdmin);   
    return profileEntity.adminId;
  }  

  function _doAgentGetScopeInfo(ACLStorage.DataCollection storage data, bytes32 agentId) private view returns (IACLCommons.ScopeType, bytes32) {
    IACLCommons.AgentType atype = data.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = data.roleReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = data.typeReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommons.ScopeType.NONE, bytes32(0));  
  } 

  function _doCheckAdminAccess(ACLStorage.DataCollection storage data, bytes32 adminId, bytes32 memberId, bytes32 functionId) private view returns (IACL.AdminAccessStatus) {
    (IACLCommons.FunctionEntity storage functionEntity, bool res) = data.functionTryReadSlot(functionId);    
    if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;
    
    IACLCommons.AgentType adminAgentType = data.agents[adminId].atype;
    if(adminAgentType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(adminId);
      if(!result) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[memberId] != adminId) return IACL.AdminAccessStatus.NOT_PERMITTED;
      
      IACLCommons.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == IACLCommons.AgentType.TYPE) { 
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(adminId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (IACLCommons.RoleEntity storage roleEntity, bool result2) = data.roleTryReadSlot(roleId);
      if(!result2) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      IACLCommons.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
    } 

    return IACL.AdminAccessStatus.NOT_PERMITTED;   
  }

  function _doCreateUpdateProfileAccount(ACLStorage.DataCollection storage data, bytes32 profileId, address memberAddress) private {
    IACLCommons.ProfileAccount storage profileAccount = data.profileAccounts[memberAddress];
    if(profileAccount.profiles.length == 0) {
      IACLCommons.ProfileAccount storage newProfileAccount = data.profileAccounts[memberAddress];
      newProfileAccount.profiles.push(profileId);  
    } else {   
      require(profileAccount.profiles.length < 16, "Illegal ProfileAccountLimit");
      profileAccount.profiles.push(profileId);
    }
  }

  function _doGetScopeFromType(ACLStorage.DataCollection storage data, bytes32 typeId, bytes32 senderId) private view returns (IACLCommons.ScopeType, bytes32) {    
    IACLCommons.TypeEntity storage agentType = data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    IACLCommons.RoleEntity storage memberAgentRole = data.roleReadSlot(memberRoleId);
    return (data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doInitProfile(IACLCommons.ProfileEntity storage profileEntity, address profileOwner, address profileAdmin, address profileSystemAdmin) private {
    // init Global Scope
    IACLCommons.GlobalEntity storage livelyGlobalEntity = profileEntity.profileGlobalWriteSlot(LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);
    livelyGlobalEntity.name = "GLOBAL.LIVELY_PROFILE";
    livelyGlobalEntity.domainLimit = profileEntity.limits.domainLimit;
    livelyGlobalEntity.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyGlobalEntity.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyGlobalEntity.bs.stype = IACLCommons.ScopeType.GLOBAL;
    livelyGlobalEntity.bs.adminId = LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;

    // Create Any Type
    IACLCommons.TypeEntity storage anyType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_ANY_TYPE_ID);
    anyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
    anyType.roleLimit = 0;
    anyType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
    anyType.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anyType.ba.atype = IACLCommons.AgentType.TYPE;
    anyType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    anyType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;

    // Create Lively Master Type       
    IACLCommons.TypeEntity storage livelyMasterType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
    livelyMasterType.roleLimit = profileEntity.limits.typeRoleLimit > 1 ? profileEntity.limits.typeRoleLimit : 1;
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
    livelyMasterAdminRole.memberLimit = profileEntity.limits.memberLimit > 2 ? profileEntity.limits.memberLimit : 2;
    livelyMasterAdminRole.memberCount = 2;
    livelyMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;


    // Create Owner Member
    bytes32 ownerMemberId = LACLUtils.accountGenerateId(profileOwner);
    IACLCommons.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(ownerMemberId);   
    ownerMember.account = profileOwner;
    ownerMember.typeLimit = profileEntity.limits.typeLimit;
    ownerMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    ownerMember.registerLimits = profileEntity.registerLimits;          
    ownerMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    ownerMember.ba.atype = IACLCommons.AgentType.MEMBER;
    ownerMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    ownerMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;   

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = LACLUtils.accountGenerateId(profileAdmin);
    IACLCommons.ProfileMemberEntity storage livelyMasterAdminMember = profileEntity.profileMemberWriteSlot(livelyMasterAdminMemberId);   
    livelyMasterAdminMember.account = profileAdmin;
    livelyMasterAdminMember.typeLimit = profileEntity.limits.typeLimit;
    livelyMasterAdminMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
    livelyMasterAdminMember.registerLimits = profileEntity.registerLimits;          
    livelyMasterAdminMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;      

    // bind Lively Master Admin Member to Admin role of Lively, 
    livelyMasterAdminMember.types.add(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.members[ownerMemberId] = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    _doInitProfileSystemMaster(profileEntity, profileSystemAdmin);
    
    // update livelyGlobalEntity.bs.referredByAgent
    livelyGlobalEntity.bs.referredByAgent = 5;
  }

  function _doInitProfileSystemMaster(IACLCommons.ProfileEntity storage profileEntity, address profileSystemAdmin) private {
    // Create System Master Type       
    IACLCommons.TypeEntity storage systemMasterType = profileEntity.profileTypeWriteSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    systemMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
    systemMasterType.roleLimit = profileEntity.limits.typeRoleLimit > 1 ? profileEntity.limits.typeRoleLimit : 1;
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
    systemMasterAdminRole.memberLimit = profileEntity.limits.memberLimit > 1 ? profileEntity.limits.memberLimit : 1;
    systemMasterAdminRole.memberCount = 1;
    systemMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
    systemMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    systemMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    systemMasterAdminRole.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create System Master Admin Member
    bytes32 systemMasterAdminMemberId = LACLUtils.accountGenerateId(profileSystemAdmin);
    IACLCommons.ProfileMemberEntity storage systemMasterAdminMember = profileEntity.profileMemberWriteSlot(systemMasterAdminMemberId);
    systemMasterAdminMember.typeLimit = profileEntity.limits.typeLimit;
    systemMasterAdminMember.callLimit = uint16(profileEntity.limits.profileCallLimit);
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
    systemMasterAdminMember.account = profileSystemAdmin;      
    systemMasterAdminMember.ba.adminId = LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
    systemMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    systemMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    systemMasterAdminMember.types.add(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    
    // bind Lively Master Admin Member to Admin role
    systemMasterType.members[systemMasterAdminMemberId] = LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID;
  }

  function _initACLAgents(ACLStorage.DataCollection storage data, address livelyAdmin, address systemAdmin) private {

    // init Global Scope
    IACLCommons.GlobalEntity storage livelyGlobalEntity = data.globalWriteSlot(LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    livelyGlobalEntity.name = "GLOBAL.LIVELY_VERSE";
    livelyGlobalEntity.domainLimit = type(uint16).max;
    livelyGlobalEntity.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyGlobalEntity.bs.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyGlobalEntity.bs.stype = IACLCommons.ScopeType.GLOBAL;
    livelyGlobalEntity.bs.adminId = LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type       
    IACLCommons.TypeEntity storage livelyMasterType = data.typeWriteSlot(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MASTER";
    livelyMasterType.roleLimit = type(uint16).max;
    livelyMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = IACLCommons.AgentType.TYPE;
    livelyMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
          
    // Create Lively Master Admin Role
    IACLCommons.RoleEntity storage livelyMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN";
    livelyMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterAdminRole.typeId = LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = type(uint24).max;
    livelyMasterAdminRole.memberCount = 1;
    livelyMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = LACLUtils.accountGenerateId(livelyAdmin);
    IACLCommons.MemberEntity storage livelyMasterAdminMember = data.memberWriteSlot(livelyMasterAdminMemberId);   
    livelyMasterAdminMember.account = livelyAdmin;
    livelyMasterAdminMember.limits = IACLCommons.GeneralLimit({
      memberLimit: type(uint24).max,
      memberRegisterLimit: type(uint16).max,
      contextRegisterLimit: type(uint16).max,
      functionRegisterLimit: type(uint16).max,
      profileRegisterLimit: type(uint16).max,
      contextLimit: type(uint16).max,
      realmLimit: type(uint16).max,
      domainLimit: type(uint16).max,
      callLimit: type(uint16).max,
      typeRoleLimit: type(uint16).max,
      typeLimit: type(uint16).max,
      roleRegisterLimit: type(uint8).max,
      typeRegisterLimit: type(uint8).max,
      realmRegisterLimit: type(uint8).max,
      domainRegisterLimit: type(uint8).max,
      policyRegisterLimit: type(uint8).max,
      policyRoleLimit: type(uint8).max,
      functionLimit: type(uint8).max
    });
      
    livelyMasterAdminMember.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Type, Member, Profile and Policy types
    livelyMasterAdminMember.types.add(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);

    livelyMasterAdminMember.types.add(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    {
      // Create Profile Any Type
      IACLCommons.TypeEntity storage profileAnyType = data.typeWriteSlot(LIVELY_PROFILE_ANY_TYPE_ID);
      profileAnyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
      profileAnyType.roleLimit = 0;
      profileAnyType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
      profileAnyType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileAnyType.ba.atype = IACLCommons.AgentType.TYPE;
      profileAnyType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      profileAnyType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;

      // Create Profile Lively Master Type       
      IACLCommons.TypeEntity storage profileLivelyMasterType = data.typeWriteSlot(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
      profileLivelyMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_MASTER";
      profileLivelyMasterType.roleLimit = 0;
      profileLivelyMasterType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
      profileLivelyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileLivelyMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      profileLivelyMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      profileLivelyMasterType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;

      // Create Profile System Master Type       
      IACLCommons.TypeEntity storage profileSystemMasterType = data.typeWriteSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
      profileSystemMasterType.name = "TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER";
      profileSystemMasterType.roleLimit = 0;
      profileSystemMasterType.scopeId = LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID;
      profileSystemMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileSystemMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      profileSystemMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      profileSystemMasterType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;
    }

    {
      // Create System Master Type       
      IACLCommons.TypeEntity storage systemMasterType = data.typeWriteSlot(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
      systemMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER";
      systemMasterType.roleLimit = type(uint16).max;
      systemMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      systemMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      systemMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      systemMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      systemMasterType.roles.add(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

      // Create System Master Admin Role
      IACLCommons.RoleEntity storage systemMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
      systemMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN";
      systemMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      systemMasterAdminRole.typeId = LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
      systemMasterAdminRole.memberLimit = type(uint24).max;
      systemMasterAdminRole.memberCount = 1;
      systemMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      systemMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      systemMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      systemMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create System Master Admin Member
      bytes32 systemMasterAdminMemberId = LACLUtils.accountGenerateId(systemAdmin);
      IACLCommons.MemberEntity storage systemMasterAdminMember = data.memberWriteSlot(systemMasterAdminMemberId);

      systemMasterAdminMember.limits = IACLCommons.GeneralLimit({
        memberLimit: 1024,
        memberRegisterLimit: 0,
        contextRegisterLimit: 128,
        functionRegisterLimit: type(uint16).max,
        profileRegisterLimit: 0,
        contextLimit: type(uint16).max,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: type(uint16).max,
        typeRoleLimit: type(uint8).max,
        typeLimit: type(uint8).max,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: type(uint8).max,
        functionLimit: type(uint8).max
      });

      systemMasterAdminMember.account = systemAdmin;      
      systemMasterAdminMember.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterAdminMember.ba.atype = IACLCommons.AgentType.MEMBER;
      systemMasterAdminMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      systemMasterAdminMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      systemMasterAdminMember.types.add(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
      
      // bind Lively Master Admin Member to Admin role
      systemMasterType.members[systemMasterAdminMemberId] = LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;
    }

    {
      // Create Scope Master Type       
      IACLCommons.TypeEntity storage scopeMasterType = data.typeWriteSlot(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
      scopeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER";
      scopeMasterType.roleLimit = type(uint16).max;
      scopeMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      scopeMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      scopeMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      scopeMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      scopeMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      scopeMasterType.roles.add(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;
      
      // Create Scope Master Admin Role
      IACLCommons.RoleEntity storage scopeMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN";
      scopeMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      scopeMasterAdminRole.typeId = LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
      scopeMasterAdminRole.memberLimit = type(uint24).max;
      scopeMasterAdminRole.memberCount = 1;
      scopeMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      scopeMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      scopeMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      scopeMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
   
      // Create Type Master Type
      IACLCommons.TypeEntity storage typeMasterType = data.typeWriteSlot(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
      typeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER";
      typeMasterType.roleLimit = type(uint16).max;
      typeMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      typeMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      typeMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      typeMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      typeMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      typeMasterType.roles.add(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID;

      // Create Type Master Admin Role
      IACLCommons.RoleEntity storage typeMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN";
      typeMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      typeMasterAdminRole.typeId = LIVELY_VERSE_TYPE_MASTER_TYPE_ID;
      typeMasterAdminRole.memberLimit = type(uint24).max;
      typeMasterAdminRole.memberCount = 1;
      typeMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      typeMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      typeMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      typeMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }

    {      
      // Create Member Master Type
      IACLCommons.TypeEntity storage memberMasterType = data.typeWriteSlot(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
      memberMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER";
      memberMasterType.roleLimit = type(uint16).max;
      memberMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      memberMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      memberMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      memberMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      memberMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      memberMasterType.roles.add(LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
      memberMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID;

      // Create Member Master Admin Role
      IACLCommons.RoleEntity storage memberMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
      memberMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN";
      memberMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      memberMasterAdminRole.typeId = LIVELY_VERSE_TYPE_MASTER_TYPE_ID;
      memberMasterAdminRole.memberLimit = type(uint24).max;
      memberMasterAdminRole.memberCount = 1;
      memberMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      memberMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      memberMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      memberMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }

    {
      // Create Policy Master Type
      IACLCommons.TypeEntity storage policyMasterType = data.typeWriteSlot(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
      policyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER";
      policyMasterType.roleLimit = type(uint16).max;
      policyMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      policyMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      policyMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      policyMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      policyMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      policyMasterType.roles.add(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      policyMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;

      // Create Policy Master Admin Role
      IACLCommons.RoleEntity storage policyMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      policyMasterAdminRole.name = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN";
      policyMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      policyMasterAdminRole.typeId = LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
      policyMasterAdminRole.memberLimit = type(uint24).max;
      policyMasterAdminRole.memberCount = 1;
      policyMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      policyMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      policyMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      policyMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      
      // Create Profile Master Type
      IACLCommons.TypeEntity storage profileMasterType = data.typeWriteSlot(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
      profileMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER";
      profileMasterType.roleLimit = type(uint16).max;
      profileMasterType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      profileMasterType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileMasterType.ba.atype = IACLCommons.AgentType.TYPE;
      profileMasterType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      profileMasterType.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      profileMasterType.roles.add(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      profileMasterType.members[livelyMasterAdminMemberId] = LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID;

      // Create Profile Master Admin Role
      IACLCommons.RoleEntity storage profileMasterAdminRole = data.roleWriteSlot(LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID);
      profileMasterAdminRole.name = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN";
      profileMasterAdminRole.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      profileMasterAdminRole.typeId = LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      profileMasterAdminRole.memberLimit = type(uint24).max;
      profileMasterAdminRole.memberCount = 1;
      profileMasterAdminRole.ba.atype = IACLCommons.AgentType.ROLE;
      profileMasterAdminRole.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      profileMasterAdminRole.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      profileMasterAdminRole.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    }
    {
      // Create Anonymouse  Type
      IACLCommons.TypeEntity storage anonymousType = data.typeWriteSlot(LIVELY_VERSE_ANONYMOUS_TYPE_ID);
      anonymousType.name = "TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS";
      anonymousType.roleLimit = 0;
      anonymousType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      anonymousType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anonymousType.ba.atype = IACLCommons.AgentType.TYPE;
      anonymousType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      anonymousType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;

      // Create Any Type
      IACLCommons.TypeEntity storage anyType = data.typeWriteSlot(LIVELY_VERSE_ANY_TYPE_ID);
      anyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
      anyType.roleLimit = 0;
      anyType.scopeId = LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      anyType.ba.adminId = LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anyType.ba.atype = IACLCommons.AgentType.TYPE;
      anyType.ba.acstat = IACLCommons.ActivityStatus.ENABLED;
      anyType.ba.alstat = IACLCommons.AlterabilityStatus.DISABLED;

    }

    // update livelyGlobalEntity.bs.referredByAgent
    livelyGlobalEntity.bs.referredByAgent = 16;
    livelyGlobalEntity.domains.add(LACLUtils.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD"));   
  }
}