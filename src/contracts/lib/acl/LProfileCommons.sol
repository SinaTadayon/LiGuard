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
// import "../../acl/profile/scope/IProfileGlobalManagement.sol";
import "../../acl/profile/agent/IProfileMemberManagement.sol";
import "../../acl/profile/agent/IProfileRoleManagement.sol";
// import "../../acl/profile/agent/IProfileTypeManagement.sol";
import "../../acl/profile/policy/IProfilePolicyManagement.sol";

import "hardhat/console.sol";

/**
 * @title Profile Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileCommons {
  using LProfileStorage for IACLCommons.ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LProfileManager";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID             = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID                   = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  bytes32 public constant LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
  bytes32 public constant LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID         = keccak256(abi.encodePacked("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
  bytes32 public constant LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID        = keccak256(abi.encodePacked("GLOBAL.LIVELY_PROFILE"));

  function profileCheckAdminAccess(IACLCommons.ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) external view returns (IProfileACL.ProfileAdminAccessStatus) {
    return _doProfileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

  function profileAgentGetScopeInfo(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId) external view returns (IACLCommons.ScopeType, bytes32) {
    return _doAgentGetScopeInfo(profileEntity, agentId);
  }

  function profileGetContextAdmin(IACLCommons.ProfileEntity storage profileEntity, IProfileContextManagement.ProfileContextRegisterRequest calldata request, bytes32 scopeId, bytes32 requestScopeAdmin) external view returns (bytes32 contextAdminId) {
    return _doGetContextAdmin(profileEntity, request, scopeId, requestScopeAdmin);
  }

  function profileRegisterContext(ACLStorage.DataCollection storage data, IProfileContextManagement.ProfileContextRegisterRequest calldata request, address contractId, address signer) external returns (bytes32){
    
    bytes32 functionId = LACLUtils.functionGenerateId(data.selectors[IProfileContextManagement.profileContextRegister.selector], IProfileContextManagement.profileContextRegister.selector);
    bytes32 signerId = LACLUtils.accountGenerateId(signer);  
    bytes32 newContextId = LACLUtils.accountGenerateId(contractId);

    {

      IACLCommons.ProfileEntity storage profileEntity = data.profiles[request.profileId];    
      IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(request.profileId, functionId, signerId);
      if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);          
      require(profileEntity.scopes[newContextId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

      // check profile and type limitations and update it
      IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
      require(profileMemberEntity.registerLimits.contextRegisterLimit > 0, "Illegal Limit");
      require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(profileMemberEntity.registerLimits.policyRegisterLimit > 0, "Illegal TypeRegisterLimit");
      require(profileEntity.registerLimits.policyRegisterLimit > 0, "Illegal RegisterLimit");
      profileMemberEntity.registerLimits.policyRegisterLimit -= 1; 
      profileMemberEntity.registerLimits.contextRegisterLimit -= 1;
      profileEntity.registerLimits.policyRegisterLimit -= 1;

      // check realm 
      IACLCommons.RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(request.realmId);
      require(realmEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

      // check system scope
      require(_doCheckContextSystemScope(data, profileEntity, request.realmId, signerId, request.profileId), "Forbidden");

      // add context to realm
      realmEntity.contexts.add(newContextId);    
    
      // create new context
      IACLCommons.ContextEntity storage newContext =  profileEntity.profileContextWriteSlot(newContextId);
      newContext.realmId = request.realmId;
      newContext.contractId = contractId;
      newContext.functionLimit = profileEntity.limits.functionLimit;      
      newContext.bs.stype = IACLCommons.ScopeType.CONTEXT;
      newContext.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
      newContext.bs.alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;      
      newContext.bs.adminId = _doGetContextAdmin(profileEntity, request, newContextId, realmEntity.bs.adminId);  
    }   

    return newContextId;
  }

  function profileCheckMemberForDomainRegister(IACLCommons.ProfileEntity storage profileEntity, uint16 requestLength, bytes32 senderId) external {
    
    // check profile and type limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(profileMemberEntity.registerLimits.domainRegisterLimit - uint16(requestLength) > 0, "Illegal DomainRegisterLimit");
    require(profileEntity.registerLimits.domainRegisterLimit - uint16(requestLength) > 0, "Illegal RegisterLimit");
    profileMemberEntity.registerLimits.domainRegisterLimit -= uint16(requestLength); 
    profileEntity.registerLimits.domainRegisterLimit -= uint16(requestLength);
  }

  function profileCheckMemberForFunctionRegister(IACLCommons.ProfileEntity storage profileEntity, uint16 requestLength, bytes32 signerId) external {
    // check profile and type limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(profileMemberEntity.registerLimits.functionRegisterLimit - uint16(requestLength) > 0, "Illegal FunctionRegisterLimit");
    require(profileEntity.registerLimits.functionRegisterLimit - uint16(requestLength) > 0, "Illegal RegisterLimit");
    profileMemberEntity.registerLimits.functionRegisterLimit -= uint16(requestLength); 
    profileEntity.registerLimits.functionRegisterLimit -= uint16(requestLength);
  }

  function profileCheckMemberForRealmRegister(IACLCommons.ProfileEntity storage profileEntity, uint16 requestLength, bytes32 senderId) external {
      // check profile and realm limitations and update it
    IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
    require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(profileMemberEntity.registerLimits.domainRegisterLimit - uint16(requestLength) > 0, "Illegal RealmRegisterLimit");
    require(profileEntity.registerLimits.realmRegisterLimit - uint16(requestLength) > 0, "Illegal RegisterLimit");
    profileMemberEntity.registerLimits.realmRegisterLimit -= uint16(requestLength); 
    profileEntity.registerLimits.realmRegisterLimit -= uint16(requestLength);
  }

  function profileCheckMemberForMemberRegister(IACLCommons.ProfileEntity storage profileEntity, uint16 requestLength, bytes32 senderId) external {
      // check profile and member limitations and update it
      IACLCommons.ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
      require(profileMemberEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      require(profileEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(profileMemberEntity.registerLimits.memberRegisterLimit - requestLength > 0, "Illegal MemeberRegisterLimit");
      require(profileEntity.registerLimits.memberRegisterLimit - requestLength > 0, "Illegal RegisterLimit");
      profileMemberEntity.registerLimits.memberRegisterLimit -= requestLength; 
      profileEntity.registerLimits.memberRegisterLimit -= requestLength;
  }

  function profileDomainRegister(IACLCommons.ProfileEntity storage profileEntity, IProfileDomainManagement.ProfileDomainRegisterDataRequest calldata request, bytes32 profileId, bytes32 senderId, bytes32 functionId) external returns (bytes32) {
    bytes32 newDomainId = LACLUtils.generateId(request.name);
    require(profileEntity.scopes[newDomainId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

    // check sender scopes
    IACLCommons.GlobalEntity storage livelyGlobalEntity = profileEntity.profileGlobalReadSlot(LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID);

    require(livelyGlobalEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Global Updatable");
    require(livelyGlobalEntity.domainLimit > livelyGlobalEntity.domains.length(), "Illegal Register");

    // check access admin global
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(profileEntity, livelyGlobalEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

    // add domain to global
    livelyGlobalEntity.domains.add(newDomainId);

    // create new domain entity
    IACLCommons.DomainEntity storage newDomain = profileEntity.profileDomainWriteSlot(newDomainId);
    newDomain.bs.stype = IACLCommons.ScopeType.DOMAIN;
    newDomain.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    newDomain.bs.alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;      
    newDomain.name = request.name;
    newDomain.realmLimit = profileEntity.limits.realmLimit;
    
    // checking requested domain admin 
    if(request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      bytes32 requestAdminScopeId = _doDomainAgentGetScopeInfo(profileEntity, request.adminId);
      require(requestAdminScopeId == LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
      newDomain.bs.adminId = request.adminId;
    } else {
      newDomain.bs.adminId = livelyGlobalEntity.bs.adminId;
    }

    return newDomainId;
  }

  function profileRealmRegister(IProfileRealmManagement.ProfileRealmRegisterDataRequest calldata request, IACLCommons.ProfileEntity storage profileEntity, bytes32 senderId, bytes32 functionId, IACLCommons.ScopeType memberScopeType, bytes32 memberScopeId) external returns(bytes32) {
    bytes32 newRealmId = LACLUtils.generateId(request.name);
    require(profileEntity.scopes[newRealmId].stype == IACLCommons.ScopeType.NONE, "Already Exist");

    // check sender scopes
    require(memberScopeType >= IACLCommons.ScopeType.DOMAIN, "Illegal ScopeType");
    if(memberScopeType == IACLCommons.ScopeType.DOMAIN) {
      require(memberScopeId == request.domainId, "Illegal Domain Scope");

    } else {
      require(memberScopeId == LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Global Scope");
    }


    IACLCommons.DomainEntity storage domainEntity = profileEntity.profileDomainReadSlot(request.domainId);
    require(domainEntity.bs.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
    require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

    // check access admin realm
    IProfileACL.ProfileAdminAccessStatus status = _doProfileCheckAdminAccess(profileEntity, domainEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);

    // add to domain
    domainEntity.realms.add(newRealmId);

    // create new realm entity
    IACLCommons.RealmEntity storage newRealm = profileEntity.profileRealmWriteSlot(newRealmId);
    newRealm.bs.stype = IACLCommons.ScopeType.REALM;
    newRealm.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    newRealm.bs.alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;
    newRealm.name = request.name;
    newRealm.domainId = request.domainId;
    newRealm.contextLimit = profileEntity.limits.contextLimit;
    newRealm.bs.adminId = _getProfileRealmAdmin(profileEntity, domainEntity.bs.adminId, request.domainId, request.adminId);

    return newRealmId;    

  }

  function profileGetAndCheckRequestScope(IACLCommons.ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, IACLCommons.ScopeType senderScopeType, bytes32 profileId) external view returns (IACLCommons.BaseScope storage) {
    return _doProfileGetAndCheckRequestScope(profileEntity, requestScopeId, senderScopeId, senderScopeType, profileId);
  }

  function profileFunctionRegistration(
      IACLCommons.ProfileEntity storage profileEntity,
      IProfileFunctionManagement.ProfileFunctionRequest calldata functionRequest, 
      bytes32 profileId,
      bytes32 signerId,
      bytes32 contextId
  ) external returns (bytes32) {

    IACLCommons.ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);    
    require(contextEntity.bs.alstat == IACLCommons.AlterabilityStatus.UPGRADABLE, "Illegal Upgrade");
    require(contextEntity.functionLimit > contextEntity.functions.length(), "Illegal Limit");

    bytes32 newFunctionId = LACLUtils.functionGenerateId(contextEntity.contractId, functionRequest.selector); 

    require(profileEntity.scopes[newFunctionId].stype == IACLCommons.ScopeType.NONE, "Already Exist");
    require(_doCheckFunctionSystemScope(profileEntity, contextId, signerId, profileId), "Forbidden");        
    
    IACLCommons.BaseAgent storage ba = profileEntity.agents[functionRequest.agentId];
    require(ba.atype > IACLCommons.AgentType.MEMBER, "Illegal AgentId");
    IACLCommons.FunctionEntity storage functionEntity = profileEntity.profileFunctionWriteSlot(newFunctionId);
    functionEntity.bs.stype = IACLCommons.ScopeType.FUNCTION;
    functionEntity.contextId = contextId;
    functionEntity.agentId = functionRequest.agentId;
    functionEntity.policyCode = functionRequest.policyCode;      
    functionEntity.selector = functionRequest.selector;
    functionEntity.bs.acstat = IACLCommons.ActivityStatus.ENABLED;
    functionEntity.bs.alstat =IACLCommons.AlterabilityStatus.UPGRADABLE;
    functionEntity.bs.adminId = _doGetAndCheckFunctionAdmin(profileEntity, contextEntity.bs.adminId, contextId, functionRequest.adminId, profileId);
    
    // add function to context
    contextEntity.functions.add(newFunctionId);

    return newFunctionId;
  }

  function profileGetAndCheckFunctionAdmin(IACLCommons.ProfileEntity storage profileEntity, bytes32 contextAdminId, bytes32 contextId, bytes32 adminId, bytes32 profileId) external view returns (bytes32 functionAdminId) {
    return _doGetAndCheckFunctionAdmin(profileEntity, contextAdminId, contextId, adminId, profileId);
  }

  function profileMemberGetInfo(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 memberId) external view returns (IProfileMemberManagement.ProfileMemberInfo memory) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    (IACLCommons.ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if(!result || profileEntity.acstat == IACLCommons.ActivityStatus.NONE) {
      return IProfileMemberManagement.ProfileMemberInfo({
        adminId: bytes32(0),
        account: address(0),
        typeLimit: 0,
        typeCount: 0,
        callLimit: 0,
        registerLimit: IACLCommons.ProfileRegisterLimit({
          memberRegisterLimit: 0,
          roleRegisterLimit: 0,
          typeRegisterLimit: 0,
          functionRegisterLimit: 0,
          contextRegisterLimit: 0,
          realmRegisterLimit: 0,
          domainRegisterLimit: 0,
          policyRegisterLimit: 0
        }),
        atype: IACLCommons.AgentType.NONE,
        acstat: IACLCommons.ActivityStatus.NONE,
        alstat: IACLCommons.AlterabilityStatus.NONE
      });
    }

    return IProfileMemberManagement.ProfileMemberInfo({
      adminId: member.ba.adminId,
      account: member.account,
      typeLimit: member.typeLimit,
      typeCount: uint32(member.types.length()),
      callLimit: member.callLimit,
      registerLimit: IACLCommons.ProfileRegisterLimit({
        memberRegisterLimit: member.registerLimits.memberRegisterLimit,
        roleRegisterLimit: member.registerLimits.roleRegisterLimit,
        typeRegisterLimit: member.registerLimits.typeRegisterLimit,
        functionRegisterLimit: member.registerLimits.functionRegisterLimit,
        contextRegisterLimit: member.registerLimits.contextRegisterLimit,
        realmRegisterLimit: member.registerLimits.realmRegisterLimit,
        domainRegisterLimit: member.registerLimits.domainRegisterLimit,
        policyRegisterLimit:member.registerLimits.policyRegisterLimit
      }),
      atype: member.ba.atype,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat
    });
  }

  function profileMemberCheckAdmin(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 memberId, address account) external view returns (bool) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat == IACLCommons.ActivityStatus.NONE) return false;
    if (profileEntity.agents[memberId].atype != IACLCommons.AgentType.MEMBER) return false;    
    
    bytes32 memberAdminId = profileEntity.agents[memberId].adminId;
    IACLCommons.AgentType adminAgenType = profileEntity.agents[memberAdminId].atype;
    bytes32 accountId = LACLUtils.accountGenerateId(account);

    if(adminAgenType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(memberAdminId);
      if(!result) return false;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[accountId] != bytes32(0);
    
    } else if(adminAgenType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(memberAdminId);
      if(!result1) return false;  

      return typeEntity.members[accountId] != bytes32(0);  
    }
  
    return false;
  }

  function _doProfileGetAndCheckRequestScope(IACLCommons.ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, IACLCommons.ScopeType senderScopeType, bytes32 profileId) internal view returns (IACLCommons.BaseScope storage){
    // checking requested type scope
    IACLCommons.BaseScope storage requestedScope = profileEntity.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommons.ScopeType.NONE , "Scope Not Found");
    require(requestedScope.acstat > IACLCommons.ActivityStatus.DELETED , "Deleted");
  
    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if(requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {        
      require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, senderScopeId, requestScopeId), "Illegal Scope");
    }      

    return requestedScope;
  }

  function _getProfileRealmAdmin(IACLCommons.ProfileEntity storage profileEntity, bytes32 requestScopeAdmin, bytes32 domainId, bytes32 adminId) internal view returns (bytes32 realmAdminId) {
    // checking requested context admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(IACLCommons.ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(IACLCommons.ScopeType.DOMAIN == requestAdminScopeType){
        require(requestAdminScopeId == domainId, "Illegal Amind Scope");

      } else {
        require(requestAdminScopeId == LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
      }
      realmAdminId = adminId;

    } else {
      realmAdminId = requestScopeAdmin;
    }
  }

  function _doProfileCheckAdminAccess(IACLCommons.ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    // owners always access to all entities to modify those
    if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    (IACLCommons.FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;
   
    IACLCommons.AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
      IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == IACLCommons.AgentType.TYPE) { 
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[senderId];
      (IACLCommons.RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      IACLCommons.PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

      return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    } 

    return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _doGetContextAdmin(IACLCommons.ProfileEntity storage profileEntity, IProfileContextManagement.ProfileContextRegisterRequest calldata request, bytes32 scopeId, bytes32 requestScopeAdmin) internal view returns (bytes32 contextAdminId) {
    // checking requested context admin 
    if(request.adminId != bytes32(0)) {
      require(profileEntity.agents[request.adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");      
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, request.adminId);
      require(IACLCommons.ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(IACLCommons.ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == request.realmId, "Illegal Admin Scope");
    
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(request.profileId, requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      contextAdminId = request.adminId;

    } else {
      contextAdminId = requestScopeAdmin;
    }
  }

  function _doAgentGetScopeInfo(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (IACLCommons.ScopeType, bytes32) {
    IACLCommons.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = profileEntity.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = profileEntity.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommons.ScopeType.NONE, bytes32(0));  
  }

  function _doCheckContextSystemScope(ACLStorage.DataCollection storage data, IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId, bytes32 memberId, bytes32 profileId) internal view returns (bool) {  
    IACLCommons.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommons.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if(data.scopes[memberSystemRole.scopeId].stype < IACLCommons.ScopeType.REALM) return false;
    if(memberSystemRole.scopeId == scopeId) {
      return true;
    } 

    return IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);    
  }

  function _doCheckFunctionSystemScope(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId, bytes32 memberId, bytes32 profileId) internal view returns (bool) {  
    IACLCommons.TypeEntity storage systemType = profileEntity.profileTypeReadSlot(LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    IACLCommons.RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if(profileEntity.scopes[memberSystemRole.scopeId].stype < IACLCommons.ScopeType.CONTEXT) return false;
    if(memberSystemRole.scopeId == scopeId) {
      return true;
    } 
      
    return IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);    
  }

  function _doGetAndCheckFunctionAdmin(IACLCommons.ProfileEntity storage profileEntity, bytes32 contextAdminId, bytes32 contextId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommons.ScopeType requestAdminFuncType, bytes32 requestAdminFuncId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(IACLCommons.ScopeType.CONTEXT <= requestAdminFuncType, "Illegal Admin ScopeType");
      if(IACLCommons.ScopeType.CONTEXT == requestAdminFuncType) {  
        require(requestAdminFuncId == contextAdminId, "Illegal Amind Scope");
      
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, requestAdminFuncId, contextId), "Illegal Admin Scope");
      }
      functionAdminId = adminId;

    } else {
      functionAdminId = contextAdminId;
    }
  }

  function _doDomainAgentGetScopeInfo(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (bytes32) {
    IACLCommons.AgentType atype = profileEntity.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(agentId);
      return  roleEntity.scopeId;

    } else if(atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);  
  }
}