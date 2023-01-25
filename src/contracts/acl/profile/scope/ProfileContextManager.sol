// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileContextManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/proxy/LClones.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Context Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileContextManager is ACLStorage, BaseUUPSProxy, IProfileContextManagement {
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LClones for address;  

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
      interfaceId == type(IProfileContextManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by system admin
  function profileContextRegister(ProfileContextRegisterRequest[] calldata requests) external returns (bool) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");   
    for (uint256 i = 0; i < requests.length; i++) {
      address signer;
      address contractId;      
      if(requests[i].contractId == address(0)) {
        if(requests[i].signature.length > 0) {
          signer = _doGetSignerAddress(
            requests[i].signature, 
            _getPredictContextMessageHash(requests[i].profileId, requests[i].deployer, requests[i].subject, requests[i].realmId)
          );
        } else {
          signer = msg.sender;
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
        
      } else {
        if(requests[i].signature.length > 0) {
          bytes32 structHash = _getContextMessageHash(
            requests[i].profileId,
            requests[i].contractId, 
            LACLUtils.generateHash(requests[i].name), 
            LACLUtils.generateHash(requests[i].version),
            requests[i].realmId
          );
          signer = _doGetSignerAddress(requests[i].signature, structHash);
        } else {
          signer = msg.sender;
        }    
        contractId = requests[i].contractId;
      }

      _doRegisterContext(requests[i], contractId, signer);     
    }

    return true;
  }

  function profileContextUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");    
        contextEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileContextActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileContextUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(requests[i].data[j].entityId);
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, contextEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        contextEntity.bs.alstat = requests[i].data[j].alstat;
        emit ProfileContextAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileContextUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        
        // checking requested type admin 
        if(requests[i].data[j].adminId != bytes32(0)) {
          require( profileEntity.agents[requests[i].data[j].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");        
          (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, requests[i].data[j].adminId);
          require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
          if(ScopeType.CONTEXT == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].data[j].entityId, "Illegal Amind Scope");
          } else {
            require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(requests[i].profileId, requestAdminScopeId, requests[i].data[j].entityId), "Illegal Admin Scope");
          }
          contextEntity.bs.adminId = requests[i].data[j].adminId;

        } else {
          contextEntity.bs.adminId = profileEntity.scopes[contextEntity.realmId].adminId;
        }

        emit ProfileContextAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileContextUpdateFunctionLimit(ProfileContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateFunctionLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);        
      for(uint j = 0; j < requests[i].limits.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].contextId, senderId, functionId);
        require(requests[i].limits[j].functionLimit > contextEntity.functions.length(), "Illegal Limit");
        contextEntity.functionLimit = requests[i].limits[j].functionLimit;      
        emit ProfileContextFunctionLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].contextId, requests[i].limits[j].functionLimit);
      }
    }
    return true;    
  }


  function profileContextCheckId(bytes32 profileId, bytes32 contextId) external view returns (bool) {
    return _data.profiles[profileId].scopes[contextId].stype == ScopeType.CONTEXT;
  }

  function profileContextCheckAccount(bytes32 profileId, address contractId) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.accountGenerateId(contractId)].stype == ScopeType.CONTEXT;
  }

  function profileContextCheckAdmin(bytes32 profileId, bytes32 contextId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result) return false;  

    bytes32 contextAdminId = ce.bs.adminId;
    AgentType agentType = profileEntity.agents[contextAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(profileEntity, contextAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(contextAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  } 

  function profileContextHasFunction(bytes32 profileId, bytes32 contextId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doContextHasFunction(profileEntity, contextId, functionId);
  }

  function profileContextHasSelector(bytes32 profileId, address contractId, bytes4 selector) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    bytes32 contextId = LACLUtils.accountGenerateId(contractId);
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    return _doContextHasFunction(profileEntity, contextId, functionId);
  }

  function profileContextGetFunctions(bytes32 profileId, bytes32 contextId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if (!result) return new bytes32[](0);
    return ce.functions.values();
  }

  function profileContextGetInfo(bytes32 profileId, bytes32 contextId) external view returns (ProfileContextInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileContextInfo ({
        realmId: bytes32(0),
        adminId: bytes32(0),
        name: "",
        version: "",
        contractId: address(0),
        functionCount: 0,
        functionLimit: 0,
        referredByAgent: 0,
        adminType: AgentType.NONE,
        stype: ScopeType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return ProfileContextInfo ({
      realmId: ce.realmId,
      adminId: ce.bs.adminId,
      name: IProxy(ce.contractId).contractName(),
      version: IProxy(ce.contractId).contractVersion(),
      contractId: ce.contractId,
      functionCount: uint16(ce.functions.length()),
      functionLimit: ce.functionLimit,
      referredByAgent: ce.bs.referredByAgent,
      adminType: _data.agents[ce.bs.adminId].atype,
      stype: ce.bs.stype,
      acstat: ce.bs.acstat,
      alstat: ce.bs.alstat
    });
  }


  function _doContextHasFunction(ProfileEntity storage profileEntity, bytes32 contextId, bytes32 functionId) internal view returns (bool) {
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result) return false;
    return ce.functions.contains(functionId);    
  }

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
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

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 contextId, bytes32 senderId, bytes32 functionId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, contextEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return contextEntity;
  }

  function _doGetScopeInfo(ProfileEntity storage profileEntity, bytes32 signerId) internal view returns (ScopeType, bytes32) {
    // get scope id of sender
    TypeEntity storage systemAdminType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 signerRoleId = systemAdminType.members[signerId];
    RoleEntity storage signerSystemRole =  profileEntity.profileRoleReadSlot(signerRoleId);
    ScopeType signerSystemScopeType = profileEntity.scopes[signerSystemRole.scopeId].stype;
    return (signerSystemScopeType, signerSystemRole.scopeId);
  }

  function _getContextAdmin(ProfileEntity storage profileEntity, bytes32 realmId, bytes32 scopeId, bytes32 requestScopeAdmin, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 contextAdminId) {
    // checking requested context admin 
    if(adminId != bytes32(0)) {
      require(profileEntity.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");      
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, adminId);
      require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(ScopeType.REALM == requestAdminScopeType) {
        require(requestAdminScopeId == realmId, "Illegal Admin Scope");
    
      } else {
        require(IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      contextAdminId = adminId;

    } else {
      contextAdminId = requestScopeAdmin;
    }
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _doCheckSystemScope(ProfileEntity storage profileEntity, bytes32 scopeId, bytes32 memberId, bytes32 profileId) internal view returns (bool) {  
    TypeEntity storage systemType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
    bytes32 memberRoleId = systemType.members[memberId];
    RoleEntity storage memberSystemRole = profileEntity.profileRoleReadSlot(memberRoleId);
    if(_data.scopes[memberSystemRole.scopeId].stype < ScopeType.REALM) return false;
    if(memberSystemRole.scopeId == scopeId) {
      return true;
    } 

    return IProfileACLGenerals(address(this)).isProfileScopesCompatible(profileId, memberSystemRole.scopeId, scopeId);    
  }

   function _getContextMessageHash(
    bytes32 profileId,
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_CTX_MESSAGE_TYPEHASH, profileId, contractId, name, version, realmId));
  }

  function _getPredictContextMessageHash(
    bytes32 profileId,
    address deployer,
    address subject,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_PREDICT_CTX_MESSAGE_TYPEHASH, profileId, deployer, subject, realmId));
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(_contractDomainSeparatorV4(), structHash);
  }

  function _contractDomainSeparatorV4() internal view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          TYPE_HASH,          
          IProxy(address(this)).contractName(),
          IProxy(address(this)).contractVersion(),
          block.chainid,
          address(this)
        )
      );
  }

  function _doRegisterContext(ProfileContextRegisterRequest calldata request, address contractId, address signer) internal {
    
    bytes32 functionId = LACLUtils.functionGenerateId(_data.selectors[IProfileContextManagement.profileContextRegister.selector], IProfileContextManagement.profileContextRegister.selector);
    bytes32 signerId = LACLUtils.accountGenerateId(signer);  
    bytes32 newContextId = LACLUtils.accountGenerateId(contractId);

    ProfileEntity storage profileEntity = _data.profiles[request.profileId];    
    IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(request.profileId, functionId, signerId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);          
    require(profileEntity.scopes[newContextId].stype == ScopeType.NONE, "Already Exist");

    // check profile and type limitations and update it
    ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(signerId);
    require(profileMemberEntity.registerLimits.contextRegisterLimit > 0, "Illegal Limit");
    require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
    require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(profileMemberEntity.registerLimits.policyRegisterLimit > 0, "Illegal TypeRegisterLimit");
    require(profileEntity.registerLimits.policyRegisterLimit > 0, "Illegal RegisterLimit");
    profileMemberEntity.registerLimits.policyRegisterLimit -= 1; 
    profileMemberEntity.registerLimits.contextRegisterLimit -= 1;
    profileEntity.registerLimits.policyRegisterLimit -= 1;

    {
      // update member factory limit
      // MemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(signerId);
      // require(memberEntity.contextRegisterLimit > 0, "Illegal Limit");
      // memberEntity.contextRegisterLimit -= 1;

      // check realm 
      RealmEntity storage realmEntity = profileEntity.profileRealmReadSlot(request.realmId);
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");
      require(realmEntity.contextLimit > realmEntity.contexts.length(), "Illegal Register");

      // check system scope
      require(_doCheckSystemScope(profileEntity, request.realmId, signerId, request.profileId), "Forbidden");

      // add context to realm
      realmEntity.contexts.add(newContextId);    

      // create new context
      ContextEntity storage newContext =  profileEntity.profileContextWriteSlot(newContextId);
      newContext.realmId = request.realmId;
      newContext.contractId = contractId;
      newContext.functionLimit = profileEntity.limits.functionLimit;      
      newContext.bs.stype = ScopeType.CONTEXT;
      newContext.bs.acstat = ActivityStatus.ENABLED;
      newContext.bs.alstat = AlterabilityStatus.UPGRADABLE;      
      newContext.bs.adminId = _getContextAdmin(profileEntity, request.realmId, newContextId, realmEntity.bs.adminId, request.adminId, request.profileId);    
    }

    emit ProfileContextRegistered(      
      msg.sender,
      request.profileId,
      newContextId, 
      request.realmId,
      request.adminId,
      contractId,
      signer,
      request.deployer,
      request.subject      
    );    
  }

}