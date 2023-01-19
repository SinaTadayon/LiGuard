// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./policy/IPolicyManagement.sol";
import "./IProfileACL.sol";
import "./IProfileACLGenerals.sol";
import "./scope/IProfileFunctionManagement.sol";
import "./agent/IProfileRoleManagement.sol";
import "./agent/IProfileTypeManagement.sol";
import "../ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LProfileStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";

/**
 * @title Profile AccessControl Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileAccessControl is ACLStorage, BaseUUPSProxy, IProfileACLGenerals, IProfileACL {
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
      interfaceId == type(IProfileACL).interfaceId ||
      interfaceId == type(IACLGenerals).interfaceId ||
      super.supportsInterface(interfaceId);
  }
  
  function profileHasAccess(bytes32 profileId, bytes32 functionId) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);   
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasMemberAccess(bytes32 profileId, bytes32 functionId, bytes32 memberId) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, memberId, functionEntity);
  }

  function profileHasCSAccess(bytes32 profileId, address contractId, bytes4 selector) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasAccountAccess(bytes32 profileId, address contractId, bytes4 selector, address accountId) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    bytes32 memberId = LACLUtils.accountGenerateId(accountId);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, memberId, functionEntity);
  }

  function profileHasAccess(ProfileEntity storage profileEntity, bytes32 functionId) public returns (ProfileAuthorizationStatus) {
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);   
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasMemberAccess(ProfileEntity storage profileEntity, bytes32 functionId, bytes32 memberId) public returns (ProfileAuthorizationStatus) {
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, memberId, functionEntity);
  }

  function profileHasCSAccess(ProfileEntity storage profileEntity, address contractId, bytes4 selector) public returns (ProfileAuthorizationStatus) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasAccountAccess(ProfileEntity storage profileEntity, address contractId, bytes4 selector, address accountId) public returns (ProfileAuthorizationStatus) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    bytes32 memberId = LACLUtils.accountGenerateId(accountId);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileEntity, memberId, functionEntity);
  }

  function _doHasAccess(ProfileEntity storage profileEntity, bytes32 memberId, FunctionEntity storage functionEntity) internal returns (ProfileAuthorizationStatus) {
    
    if(profileEntity.limits.profileCallLimit > 0) {
      profileEntity.limits.profileCallLimit -= 1;
    } else {
      return ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN;
    }

    AgentType atype = _data.agents[functionEntity.agentId].atype;

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
      (MemberEntity storage memberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
      if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
      if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN; 
      if(memberEntity.callLimit > 0) {
        memberEntity.callLimit -= 1;
      } else {
        return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
      }
      
      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      // console.log("roleEntity: ");
      // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
      if(!result1) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;      
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      // console.log("typeEntity: ");
      // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
      if(!result2) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId) return ProfileAuthorizationStatus.UNAUTHORIZED;

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      // console.log("policyEntity: ");
      // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return ProfileAuthorizationStatus.POLICY_FORBIDDEN;

    } else if(atype == AgentType.TYPE) {
      // console.log("agentId is type . . .");
      if(functionEntity.agentId == _LIVELY_VERSE_ANY_TYPE_ID) {
        // console.log("agentId is ANY type . . .");
        (MemberEntity storage memberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
        if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;        
        if(memberEntity.callLimit > 0) {
          memberEntity.callLimit -= 1;
        } else {
          return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
        }

      } else if(functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        // console.log("agentId is Anonymous type . . .");
        (MemberEntity storage memberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(memberId);
        if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
        if(memberEntity.callLimit > 0) {
          memberEntity.callLimit -= 1;
        } else {
          return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
        }
        
        // check type activation
        (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
        // console.log("typeEntity: ");
        // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
        if(!result1) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
        if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
        // console.log("roleEntity: ");
        // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
        if(!result2) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;
        if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
        
        // check policy activation
        PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
        // console.log("policyEntity: ");
        // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
        if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
          return ProfileAuthorizationStatus.POLICY_FORBIDDEN;
      } 
    } else if(atype <= AgentType.MEMBER) {
      return ProfileAuthorizationStatus.UNAUTHORIZED;
    }

    // check function activity
    // console.log("functionEntity: ");
    // console.logBytes1(bytes1(uint8(functionEntity.bs.acstat)));
    if(functionEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = profileEntity.profileContextTryReadSlot(functionEntity.contextId);
    // console.log("contextEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res1) return ProfileAuthorizationStatus.CONTEXT_NOT_FOUND;
    if(contextEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = profileEntity.profileRealmTryReadSlot(contextEntity.realmId);
    // console.log("realmEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res2) return ProfileAuthorizationStatus.REALM_NOT_FOUND;
    if(realmEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = profileEntity.profileDomainTryReadSlot(realmEntity.domainId);
    // console.log("domainEntity: ");
    // console.logBytes1(bytes1(uint8(domainEntity.bs.acstat)));
    if(!res3) return ProfileAuthorizationStatus.DOMAIN_NOT_FOUND;
    if(domainEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN;
    
    return ProfileAuthorizationStatus.PERMITTED;
  }

  // Anonymouse type
  function getProfileAnonymousType() external pure returns (bytes32) {
    return _LIVELY_VERSE_ANONYMOUS_TYPE_ID;
  }

  // Any type
  function getProfileAnyType() external pure returns (bytes32) {
    return _LIVELY_VERSE_ANY_TYPE_ID;
  }

  // system admin type
  function getProfileSystemMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_PROFILE_SYSTEM_MASTER_TYPE_ID;
  }

  // admin type
  function getProfileMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_LIVELY_PROFILE_MASTER_TYPE_ID;
  }

  function getProfileGlobalScope() external pure returns (bytes32) {
    return _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
  }


   // lively profile master
  function getProfileMaster() external pure returns (bytes32) {
    return _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
  }

  // scope master admin role
  function getProfileSystemMaster() external pure returns (bytes32) {
    return _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
  }


  // general
  function isProfileAgentExist(bytes32 profileId, bytes32 agentId) external view returns (bool) {
    return _data.profiles[profileId].agents[agentId].atype != AgentType.NONE;
  }
  
  function isProfileScopeExist(bytes32 profileId, bytes32 scopeId) external view returns (bool) {
    return _data.profiles[profileId].scopes[scopeId].stype != ScopeType.NONE;
  }
  
  function getProfileScopeBaseInfo(bytes32 profileId, bytes32 scopeId) external view returns (BaseScope memory) {
    return _data.profiles[profileId].scopes[scopeId];
  }

  function getProfileAgentBaseInfo(bytes32 profileId, bytes32 agentId) external view returns (BaseAgent memory) {
    return _data.profiles[profileId].agents[agentId];  
  }

  function isProfileScopesCompatible(bytes32 profileId, bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;

    ScopeType destScopeType = profileEntity.scopes[destScopeId].stype;
    ScopeType srcScopeType = profileEntity.scopes[srcScopeId].stype;
    if(destScopeType == ScopeType.NONE || srcScopeType == ScopeType.NONE) return false;
    if(destScopeType == ScopeType.GLOBAL)  return true;

    if(destScopeType == ScopeType.CONTEXT && srcScopeType == ScopeType.FUNCTION) {
      ContextEntity storage ce = profileEntity.profileContextReadSlot(destScopeId);
      return ce.functions.contains(srcScopeId);
    
    } else if(destScopeType == ScopeType.REALM && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = profileEntity.profileFunctionReadSlot(srcScopeId);
      RealmEntity storage re = profileEntity.profileRealmReadSlot(destScopeId);      
      return re.contexts.contains(fe.contextId);
    
    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = profileEntity.profileFunctionReadSlot(srcScopeId);
      ContextEntity storage ce = profileEntity.profileContextReadSlot(fe.contextId);
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
    
    } else if(destScopeType == ScopeType.REALM && srcScopeType == ScopeType.CONTEXT) {
      RealmEntity storage re = profileEntity.profileRealmReadSlot(destScopeId);
      return re.contexts.contains(srcScopeId);  

    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.CONTEXT) {
      ContextEntity storage ce = profileEntity.profileContextReadSlot(srcScopeId);
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
      
    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.REALM) {
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(srcScopeId);    
    }

    return false;
  }
}