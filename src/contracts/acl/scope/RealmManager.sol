// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IRealmManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/acl/LAclUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";


/**
 * @title Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RealmManager is AclStorage, IRealmManagement {  
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // calld by scope master type
  // admin of realm can be any type or any role
  function realmRegister(RealmRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmRegister.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    TypeEntity storage scopeMasterType = _data.typeReadSlot(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    bytes32 memberRoleId = scopeMasterType.members[memberId];
    RoleEntity storage memberScopeMasterRole = _data.roleReadSlot(memberRoleId);
    ScopeType memberScopeType = _data.scopes[memberScopeMasterRole.scopeId].stype;


    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRealmId = LAclUtils.generateId(requests[i].name);
      require(_data.scopes[newRealmId].stype == ScopeType.NONE, "Realm Already Exists");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // check sender scopes
      require(memberScopeType >= ScopeType.DOMAIN, "Illegal ScopeType");
      if(memberScopeType == ScopeType.DOMAIN) {
        require(memberScopeMasterRole.scopeId == requests[i].domainId, "Illegal Domain Scope");

      } else {
        require(memberScopeMasterRole.scopeId == _data.global.id, "Illegal Global Scope");
      }

      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].domainId);
      require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Update");
      require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Realm Register");

      // check access admin realm
      require(_doCheckAdminAccess(domainEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      domainEntity.realms.add(newRealmId);

      // create new realm entity
      RealmEntity storage newRealm = _data.realmWriteSlot(newRealmId);
       
      // checking requested context admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.DOMAIN == requestAdminScopeType){
          require(requestAdminScopeId == requests[i].domainId, "Illegal Amind Scope");

        } else {
          require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope");
        }
        newRealm.bs.adminId = requests[i].adminId;

      } else {
        newRealm.bs.adminId = domainEntity.bs.adminId;
      }
      
      newRealm.bs.stype = ScopeType.REALM;
      newRealm.bs.acstat = requests[i].acstat;
      newRealm.bs.alstat = requests[i].alstat;
      newRealm.bs.adminId = requests[i].adminId;
      newRealm.bs.agentLimit = requests[i].agentLimit;
      newRealm.name = requests[i].name;
      newRealm.domainId = requests[i].domainId;
      newRealm.contextLimit = requests[i].contextLimit;
      
      // add reference of admin agent
      BaseAgent storage realmAdminAgent = _data.agents[newRealm.bs.adminId];
      require(realmAdminAgent.atype != AgentType.NONE, "Admin Not Found");
      require(realmAdminAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      require(realmAdminAgent.scopeLimit > realmAdminAgent.referredByScope, "Illegal Agent ReferredByScope");
      realmAdminAgent.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        newRealm.bs.adminId,
        newRealmId, 
        realmAdminAgent.referredByScope, 
        realmAdminAgent.atype, 
        ActionType.ADD
      );

      emit RealmRegistered(
        msg.sender,
        newRealmId,
        requests[i].domainId,
        requests[i].adminId,
        requests[i].name,
        requests[i].contextLimit,
        requests[i].agentLimit,
        _data.agents[requests[i].adminId].atype,
        requests[i].acstat,
        requests[i].alstat
      );
    }

    return true;
  }

  function realmUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");

      // check access admin role
      require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

       // update function admin Id
      BaseAgent storage realmAdminAgent = _data.agents[realmEntity.bs.adminId];
      require(realmAdminAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { realmAdminAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        realmEntity.bs.adminId, 
        requests[i].id, 
        realmAdminAgent.referredByScope, 
        realmAdminAgent.atype, 
        ActionType.REMOVE
      );

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {        
        BaseAgent storage newRealmAdminAgent = _data.agents[requests[i].adminId];
        require(newRealmAdminAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");

        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
        }
        realmEntity.bs.adminId = requests[i].adminId;

      } else {
        realmEntity.bs.adminId = _data.scopes[realmEntity.domainId].adminId;
      }

      // checking new admin Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      require(newBaseAgent.atype != AgentType.NONE, "Admin Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      require(newBaseAgent.scopeLimit > newBaseAgent.referredByScope, "Illegal Agent ReferredByScope");
      newBaseAgent.referredByScope += 1;
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        requests[i].adminId, 
        requests[i].id, 
        newBaseAgent.referredByScope, 
        newBaseAgent.atype, 
        ActionType.ADD
      );  

      emit RealmAdminUpdated(msg.sender, requests[i].id, requests[i].adminId, newBaseAgent.atype);
    }
    return true;
  }
 
  function realmDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doRealmUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function realmUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doRealmUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function realmUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Realm Deleted");
      require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      realmEntity.bs.alstat = requests[i].alstat;
      emit RealmAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function realmUpdateContextLimit(RealmUpdateContextLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmUpdateContextLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].realmId);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      realmEntity.contextLimit = requests[i].contextLimit;      
      emit RealmContextLimitUpdated(msg.sender, requests[i].realmId, requests[i].contextLimit);
    }
    return true;
  }

  function realmUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IRealmManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRealmManagement.realmUpdateAgentLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].scopeId);
      require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

      realmEntity.bs.agentLimit = requests[i].agentLimit;
      emit RealmAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
    }
    return true;
  }

  function realmCheckId(bytes32 realmId) external view returns (bool) {
    return _data.scopes[realmId].stype == ScopeType.REALM;
  }

  function realmCheckName(string calldata realmName) external view returns (bool) {
    return _data.scopes[LAclUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

   function realmCheckAdmin(bytes32 realmId, address account) external view returns (bool) {
    (RealmEntity storage realmEntity, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return false;  

    bytes32 realmAdminId = realmEntity.bs.adminId;
    AgentType agentType = _data.agents[realmAdminId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(realmAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(realmAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  } 

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    return ce.realmId == realmId;
  }

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return false;  
    return re.contexts.contains(contextId);
  }

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) return new bytes32[](0);
    return re.contexts.values();
  }

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) {
      return RealmInfo ({
        domainId: bytes32(0),
        adminId: bytes32(0),
        contextLimit: 0, 
        agentLimit: 0,
        referredByAgent: 0,
        referredByPolicy: 0,
        acstat: ActivityStatus.NONE, 
        alstate: AlterabilityStatus.NONE, 
        adminType: AgentType.NONE,
        name: ""
      });
    }

    return RealmInfo ({
      domainId: re.domainId,
      adminId: re.bs.adminId,
      contextLimit: re.contextLimit, 
      agentLimit: re.bs.agentLimit,
      referredByAgent: re.bs.referredByAgent,
      referredByPolicy: re.bs.referredByPolicy,
      acstat: re.bs.acstat, 
      alstate: re.bs.alstat, 
      adminType: _data.agents[re.bs.adminId].atype,
      name: ""
    });
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (ScopeType, bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return false;

    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      if (typeEntity.members[memberId] != adminId) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  } 

  function _doRealmUpdateActivityStatus(bytes32 realmId, ActivityStatus status, bytes32 functionId) internal returns (bool) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    RealmEntity storage realmEntity = _data.realmReadSlot(realmId);
    require(realmEntity.bs.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    require(_doCheckAdminAccess(realmEntity.bs.adminId, memberId, functionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {    
      BaseAgent storage realmAdminAgent = _data.agents[realmEntity.bs.adminId];
      require(realmAdminAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      unchecked { realmAdminAgent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        msg.sender, 
        realmEntity.bs.adminId,
        functionId, 
        realmAdminAgent.referredByScope, 
        realmAdminAgent.atype, 
        ActionType.REMOVE
      );
    }
  }
}