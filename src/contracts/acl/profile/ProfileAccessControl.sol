// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./policy/IPolicyManagement.sol";
import "./IProfileACL.sol";
import "./IProfileACLGenerals.sol";
import "../ACLStorage.sol";
import "./scope/IProfileFunctionManagement.sol";
import "./agent/IProfileRoleManagement.sol";
import "./agent/IProfileTypeManagement.sol";
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
  using LACLStorage for DataCollection;
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
    (FunctionEntity storage functionEntity, bool result) = _data.profileFunctionTryReadSlot(profileId, functionId);   
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasMemberAccess(bytes32 profileId, bytes32 functionId, bytes32 memberId) external returns (ProfileAuthorizationStatus) {
    (FunctionEntity storage functionEntity, bool result) = _data.profileFunctionTryReadSlot(profileId, functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, memberId, functionEntity);
  }

  function profileHasCSAccess(bytes32 profileId, address contractId, bytes4 selector) external returns (ProfileAuthorizationStatus) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = _data.profileFunctionTryReadSlot(profileId, functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasAccountAccess(bytes32 profileId, address contractId, bytes4 selector, address accountId) external returns (ProfileAuthorizationStatus) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    bytes32 memberId = LACLUtils.accountGenerateId(accountId);
    (FunctionEntity storage functionEntity, bool result) = _data.profileFunctionTryReadSlot(profileId, functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doHasAccess(profileId, memberId, functionEntity);
  }

  function _doHasAccess(bytes32 profileId, bytes32 memberId, FunctionEntity storage functionEntity) internal returns (ProfileAuthorizationStatus) {
    
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
      (MemberEntity storage memberEntity, bool result0) = _data.profileMemberTryReadSlot(profileId, memberId);
      if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
      if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
      if(memberEntity.callLimit > 0) {
        memberEntity.callLimit -= 1;
      } else {
        return ProfileAuthorizationStatus.CALL_FORBIDDEN;
      }
      
      // check role activation
      (RoleEntity storage roleEntity, bool result1) = _data.profileRoleTryReadSlot(profileId, functionEntity.agentId);
      // console.log("roleEntity: ");
      // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
      if(!result1) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;      
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = _data.profileTypeTryReadSlot(profileId, roleEntity.typeId);
      // console.log("typeEntity: ");
      // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
      if(!result2) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId) return ProfileAuthorizationStatus.UNAUTHORIZED;

      // check policy activation
      PolicyEntity storage policyEntity = _data.policies[_data.profiles[profileId].rolePolicyMap[functionEntity.agentId]];
      // console.log("policyEntity: ");
      // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return ProfileAuthorizationStatus.POLICY_FORBIDDEN;

    } else if(atype == AgentType.TYPE) {
      // console.log("agentId is type . . .");
      if(functionEntity.agentId == _LIVELY_VERSE_ANY_TYPE_ID) {
        // console.log("agentId is ANY type . . .");
      (MemberEntity storage memberEntity, bool result0) = _data.profileMemberTryReadSlot(profileId, memberId);
      if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
      if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
      if(memberEntity.callLimit > 0) {
        memberEntity.callLimit -= 1;
      } else {
        return ProfileAuthorizationStatus.CALL_FORBIDDEN;
      }

      } else if(functionEntity.agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        // console.log("agentId is Anonymous type . . .");
        (MemberEntity storage memberEntity, bool result0) = _data.profileMemberTryReadSlot(profileId, memberId);
        if(!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
        if(memberEntity.callLimit > 0) {
          memberEntity.callLimit -= 1;
        } else {
          return ProfileAuthorizationStatus.CALL_FORBIDDEN;
        }
        
        // check type activation
        (TypeEntity storage typeEntity, bool result1) = _data.profileTypeTryReadSlot(profileId, functionEntity.agentId);
        // console.log("typeEntity: ");
        // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
        if(!result1) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
        if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = _data.profileRoleTryReadSlot(profileId, roleId);
        // console.log("roleEntity: ");
        // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
        if(!result2) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;
        if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
        
        // check policy activation
        PolicyEntity storage policyEntity = _data.policies[_data.profiles[profileId].rolePolicyMap[roleId]];
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
    (ContextEntity storage contextEntity, bool res1) = _data.profileContextTryReadSlot(profileId, functionEntity.contextId);
    // console.log("contextEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res1) return ProfileAuthorizationStatus.CONTEXT_NOT_FOUND;
    if(contextEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.profileRealmTryReadSlot(profileId, contextEntity.realmId);
    // console.log("realmEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res2) return ProfileAuthorizationStatus.REALM_NOT_FOUND;
    if(realmEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.profileDomainTryReadSlot(profileId, realmEntity.domainId);
    // console.log("domainEntity: ");
    // console.logBytes1(bytes1(uint8(domainEntity.bs.acstat)));
    if(!res3) return ProfileAuthorizationStatus.DOMAIN_NOT_FOUND;
    if(domainEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN;

    // check global activity
    // console.log("global: ");
    // console.logBytes1(bytes1(uint8(_data.scopes[_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID].acstat)));
    // if(_data.scopes[_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID].acstat != ActivityStatus.ENABLED) return false;
    
    return ProfileAuthorizationStatus.PERMITTED;
  }

  // Anonymouse type
  function getAnonymousType() external pure returns (bytes32) {
    return _LIVELY_VERSE_ANONYMOUS_TYPE_ID;
  }

  // Any type
  function getAnyType() external pure returns (bytes32) {
    return _LIVELY_VERSE_ANY_TYPE_ID;
  }

  // scope master type
  function getScopeMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
  }

  // agent master type
  function getAgentMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_AGENT_MASTER_TYPE_ID;
  }

  // system admin type
  function getSystemMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
  }

  // admin type
  function getLivelyMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
  }

  // Policy Master
  function getPolicyMasterType() external pure returns (bytes32) {
    return _LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
  }

  function getGlobalScope() external pure returns (bytes32) {
    return _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
  }


   // lively master admin role
  function getLivelyMasterAdminRole() external pure returns (bytes32) {
    return _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
  }

  // scope master admin role
  function getScopeMasterAdminRole() external pure returns (bytes32) {
    return _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;
  }

  // agent master admin role
  function getAgentMasterAdminRole() external pure returns (bytes32) {
    return _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID;
  }
  
  // system master admin role
  function getSystemMasterAdminRole() external pure returns (bytes32) {
    return _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;
  }

  // Policy Master admin role
  function getPolicyMasterAdminRole() external pure returns (bytes32) {
    return _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;
  }


  // general
  function isAgentExist(bytes32 agentId) external view returns (bool) {
    return _data.agents[agentId].atype != AgentType.NONE;
  }
  
  function isScopeExist(bytes32 scopeId) external view returns (bool) {
    return _data.scopes[scopeId].stype != ScopeType.NONE;
  }
  
  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory) {
    return _data.scopes[scopeId];
  }

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory) {
    return _data.agents[agentId];  
  }

  function isScopesCompatible(bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool) {
    ScopeType destScopeType = _data.scopes[destScopeId].stype;
    ScopeType srcScopeType = _data.scopes[srcScopeId].stype;
    if(destScopeType == ScopeType.NONE || srcScopeType == ScopeType.NONE) return false;
    if(destScopeType == ScopeType.GLOBAL)  return true;

    if(destScopeType == ScopeType.CONTEXT && srcScopeType == ScopeType.FUNCTION) {
      ContextEntity storage ce = _data.contextReadSlot(destScopeId);
      return ce.functions.contains(srcScopeId);
    
    } else if(destScopeType == ScopeType.REALM && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = _data.functionReadSlot(srcScopeId);
      RealmEntity storage re = _data.realmReadSlot(destScopeId);      
      return re.contexts.contains(fe.contextId);
    
    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = _data.functionReadSlot(srcScopeId);
      ContextEntity storage ce = _data.contextReadSlot(fe.contextId);
      DomainEntity storage de = _data.domainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
    
    } else if(destScopeType == ScopeType.REALM && srcScopeType == ScopeType.CONTEXT) {
      RealmEntity storage re = _data.realmReadSlot(destScopeId);
      return re.contexts.contains(srcScopeId);  

    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.CONTEXT) {
      ContextEntity storage ce = _data.contextReadSlot(srcScopeId);
      DomainEntity storage de = _data.domainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
      
    } else if(destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.REALM) {
      DomainEntity storage de = _data.domainReadSlot(destScopeId);
      return de.realms.contains(srcScopeId);    
    }

    return false;
  }
}