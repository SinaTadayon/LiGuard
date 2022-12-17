// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IPolicyManagement.sol";
import "./IAccessControl.sol";
import "./AclStorage.sol";
import "./scope/IFunctionManagement.sol";
import "./agent/IRoleManagement.sol";
import "./agent/ITypeManagement.sol";
import "../proxy/IProxy.sol";
import "../lib/acl/LAclUtils.sol";
import "../lib/acl/LAclStorage.sol";
import "../lib/struct/LEnumerableSet.sol";

/**
 * @title AccessControl Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AccessControl is AclStorage, IAccessControl {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function hasAccess(bytes32 functionId) external view returns (bool) {
    return _doHashAccess(LAclUtils.accountGenerateId(msg.sender), functionId);
  }

  function hasMemberAccess(bytes32 memberId, bytes32 functionId) external view returns (bool) {
    return _doHashAccess(memberId, functionId);
  }

  function hasCSAccess(address contractId, bytes4 selector) external view returns (bool) {
    return _doHashAccess(LAclUtils.accountGenerateId(msg.sender), LAclUtils.functionGenerateId(contractId, selector));
  }

  function hasCSMAccess(address contractId, bytes4 selector, bytes32 memberId) external view returns (bool) {
    return _doHashAccess(memberId, LAclUtils.functionGenerateId(contractId, selector));
  }

  function _doHashAccess(bytes32 memberId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    AgentType atype = _data.agents[functionEntity.agentId].atype;
    // if(atype == AgentType.MEMBER) {
    //   (MemberEntity storage member, bool result1) = _data.memberTryReadSlot(memberId);
    //   if(!result1) return false;
    //   if(member.ba.acstat != ActivityStatus.ENABLE) return false;
    //   if(functionEntity.agentId != memberId) return false;    
    
    if(atype == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result1) = _data.roleTryReadSlot(functionEntity.agentId);
      if(!result1) return false;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLE) return false;

      (TypeEntity storage typeEntity, bool result2) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result2) return false;
      if(typeEntity.members[memberId] == bytes32(0)) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[functionEntity.agentId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

    } else if(atype == AgentType.TYPE && functionEntity.agentId != IAccessControl(address(this)).getAnonymouseType()) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(functionEntity.agentId);
      if(!result1) return false;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLE) return false;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2) return false;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLE) return false;
       
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;
    }

    // check function activity
    if(functionEntity.bs.acstat != ActivityStatus.ENABLE) return false;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    if(!res1) return false;
    if(contextEntity.bs.acstat != ActivityStatus.ENABLE) return false;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    if(!res2) return false;
    if(realmEntity.bs.acstat != ActivityStatus.ENABLE) return false;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    if(!res3) return false;
    if(domainEntity.bs.acstat != ActivityStatus.ENABLE) return false;

    // check global activity
    if(_data.global.bs.acstat != ActivityStatus.ENABLE) return false;
    
    return true;
  }

  // Anonymouse type
  function getAnonymouseType() external pure returns (bytes32) {
    return LIVELY_VERSE_ANONYMOUSE_TYPE_ID;
  }

  // Any type
  function getAnyType() external pure returns (bytes32) {
    return LIVELY_VERSE_ANY_TYPE_ID;
  }

  // scope master type
  function getScopeMasterType() external pure returns (bytes32) {
    return LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
  }

  // agent master type
  function getAgentMasterType() external pure returns (bytes32) {
    return LIVELY_VERSE_AGENT_MASTER_TYPE_ID;
  }

  // system admin type
  function getSystemAdminType() external pure returns (bytes32) {
    return LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID;
  }

  // admin type
  function getAdminType() external pure returns (bytes32) {
    return LIVELY_VERSE_ADMIN_TYPE_ID;
  }

  // Policy Master
  function getPolicyMasterType() external pure returns (bytes32) {
    return LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
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