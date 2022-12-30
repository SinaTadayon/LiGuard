// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./policy/IPolicyManagement.sol";
import "./IAccessControl.sol";
import "./ACLStorage.sol";
import "./scope/IFunctionManagement.sol";
import "./agent/IRoleManagement.sol";
import "./agent/ITypeManagement.sol";
import "../proxy/IProxy.sol";
import "../lib/acl/LACLUtils.sol";
import "../lib/acl/LACLStorage.sol";
import "../lib/struct/LEnumerableSet.sol";
import "../proxy/BaseUUPSProxy.sol";

/**
 * @title AccessControl Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AccessControl is ACLStorage, BaseUUPSProxy, IAccessControl {
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
      interfaceId == type(IAccessControl).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function hasAccess(bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);   
    if (!result) return false;
    return _doHasAccess(functionEntity.agentId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function hasMemberAccess(bytes32 memberId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(functionEntity.agentId, memberId, functionEntity);
  }

  function hasCSAccess(address contractId, bytes4 selector) external view returns (bool) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(functionEntity.agentId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function hasCSMAccess(address contractId, bytes4 selector, bytes32 memberId) external view returns (bool) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(functionEntity.agentId, memberId, functionEntity);
  }

  function hasAccessToAgent(bytes32 agentId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(agentId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function hasMemberAccessToAgent(bytes32 agentId, bytes32 functionId, bytes32 memberId) external view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(agentId, memberId, functionEntity);
  }

  function hasCSAccessToAgent(bytes32 agentId, address contractId, bytes4 selector) external view returns (bool) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(agentId, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }
  
  function hasCSMAccessToAgent(bytes32 agentId, address contractId, bytes4 selector, bytes32 memberId) external view returns (bool) {
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;
    return _doHasAccess(agentId, memberId, functionEntity);
  }

  function _doHasAccess(bytes32 agentId, bytes32 memberId, FunctionEntity storage functionEntity) internal view returns (bool) {
    
    AgentType atype = _data.agents[agentId].atype;
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
      if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;

      // check role activation
      (RoleEntity storage roleEntity, bool result1) = _data.roleTryReadSlot(agentId);
      // console.log("roleEntity: ");
      // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
      if(!result1 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = _data.typeTryReadSlot(roleEntity.typeId);
      // console.log("typeEntity: ");
      // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
      if(!result2 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      // check memberId with agentId role
      if (typeEntity.members[memberId] != agentId) return false;

      // check policy activation
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[agentId]];
      // console.log("policyEntity: ");
      // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

    } else if(atype == AgentType.TYPE) {
      // console.log("agentId is type . . .");
      if(agentId == _LIVELY_VERSE_ANY_TYPE_ID) {
        // console.log("agentId is ANY type . . .");
        if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) {
          return false; 
        }

      } else if(agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        // console.log("agentId is Anonymous type . . .");
        if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;
        
        // check type activation
        (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(agentId);
        // console.log("typeEntity: ");
        // console.logBytes1(bytes1(uint8(typeEntity.ba.acstat)));
        if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
        // console.log("roleEntity: ");
        // console.logBytes1(bytes1(uint8(roleEntity.ba.acstat)));
        if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
        
        // check policy activation
        PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
        // console.log("policyEntity: ");
        // console.logBytes1(bytes1(uint8(policyEntity.acstat)));
        if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
          return false;
      } 
    } else if(atype <= AgentType.MEMBER) {
      return false;
    }

    // check function activity
    // console.log("functionEntity: ");
    // console.logBytes1(bytes1(uint8(functionEntity.bs.acstat)));
    if(functionEntity.bs.acstat != ActivityStatus.ENABLED) return false;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    // console.log("contextEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res1 || contextEntity.bs.acstat != ActivityStatus.ENABLED) return false;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    // console.log("realmEntity: ");
    // console.logBytes1(bytes1(uint8(contextEntity.bs.acstat)));
    if(!res2 || realmEntity.bs.acstat != ActivityStatus.ENABLED) return false;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    // console.log("domainEntity: ");
    // console.logBytes1(bytes1(uint8(domainEntity.bs.acstat)));
    if(!res3 || domainEntity.bs.acstat != ActivityStatus.ENABLED) return false;

    // check global activity
    // console.log("global: ");
    // console.logBytes1(bytes1(uint8(_data.scopes[_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID].acstat)));
    if(_data.scopes[_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID].acstat != ActivityStatus.ENABLED) return false;
    
    return true;
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