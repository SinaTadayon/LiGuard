// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRealmManagement.sol";
import "./IContextManagement.sol";
import "./IDomainManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/acl/LAclUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract DomainManager is AclStorage, IDomainManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // called by account that member of VERSE SCOPE MASTER TYPE
  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagement.domainRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    // fetch scope type and scope id of sender
    (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetMemberScopeInfoFromType(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID, senderId);    
   
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LAclUtils.generateId(requests[i].name);
      require(_data.scopes[newDomainId].stype == ScopeType.NONE, "Already Exists");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability");

      // check sender scopes
      require(senderScopeId == _data.global.id, "Illegal Global Scope");
      require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");
      require(_data.global.domainLimit > _data.global.domains.length(), "Illegal Domain Register");

      // check access admin global
      require(_doCheckAdminAccess(_data.global.bs.adminId, senderId, functionId), "Forbidden");

      _data.global.domains.add(newDomainId);

      // create new domain entity
      DomainEntity storage newDomain = _data.domainWriteSlot(newDomainId);
      newDomain.bs.stype = ScopeType.DOMAIN;
      newDomain.bs.acstat = requests[i].acstat;
      newDomain.bs.alstat = requests[i].alstat;      
      newDomain.bs.agentLimit = requests[i].agentLimit;
      newDomain.name = requests[i].name;
      newDomain.realmLimit = requests[i].realmLimit;
       
      // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope");
        newDomain.bs.adminId = requests[i].adminId;
      } else {
        newDomain.bs.adminId = _data.global.bs.adminId;
      }
            
      // // add reference of admin agent
      // BaseAgent storage domainAdminAgent = _data.agents[newDomain.bs.adminId];
      // require(domainAdminAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      // require(domainAdminAgent.scopeLimit > domainAdminAgent.referredByScope, "Illegal Agent ReferredByScope");
      // domainAdminAgent.referredByScope += 1; 
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   newDomain.bs.adminId,
      //   newDomainId, 
      //   ActionType.ADD
      // );

      // add reference of admin agent
      _doUpdateAgentReferred(
        _data.agents[newDomain.bs.adminId],
        newDomain.bs.adminId,
        newDomainId, 
        msg.sender, 
        ActionType.ADD
      ); 

      emit DomainRegistered(
        msg.sender,
        newDomainId,
        requests[i].adminId
      );
    }

    return true;
  }
 
  //  function domainDeleteActivity(bytes32[] calldata requests) external returns (bool) {
  //   bytes32 functionId = _accessPermission(IDomainManagement.domainDeleteActivity.selector);
  //   for(uint i = 0; i < requests.length; i++) {
  //     _doDomainUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
  //   }
  //   return true;
  // }

  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
   bytes32 functionId = _accessPermission(IDomainManagement.domainUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      _doDomainUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagement.domainRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    for(uint i = 0; i < requests.length; i++) {      
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, true);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      domainEntity.bs.alstat = requests[i].alstat;
      emit DomainAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagement.domainRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    
    for(uint i = 0; i < requests.length; i++) {
     DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, false); 

       // update function admin Id
      // BaseAgent storage domainAdminAgent = _data.agents[domainEntity.bs.adminId];
      // require(domainAdminAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      // unchecked { domainAdminAgent.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   domainEntity.bs.adminId, 
      //   requests[i].id,        
      //   ActionType.REMOVE
      // );
      // add reference of admin agent
      _doUpdateAgentReferred(
        _data.agents[domainEntity.bs.adminId],
        domainEntity.bs.adminId,
        requests[i].id, 
        msg.sender, 
        ActionType.REMOVE
      ); 

     // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = _data.global.bs.adminId;
      }

      // checking new admin Id 
      // BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      // require(newBaseAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      // require(newBaseAgent.scopeLimit > newBaseAgent.referredByScope, "Illegal Agent ReferredByScope");
      // newBaseAgent.referredByScope += 1;
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   requests[i].adminId, 
      //   requests[i].id,  
      //   ActionType.ADD
      // );  
      // add reference of admin agent
      _doUpdateAgentReferred(
        _data.agents[requests[i].adminId],
        requests[i].adminId,
        requests[i].id, 
        msg.sender, 
        ActionType.ADD
      ); 

      emit DomainAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function domainUpdateRealmLimit(DomainUpdateRealmLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagement.domainRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender); 

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId, false); 
      domainEntity.realmLimit = requests[i].realmLimit;      
      emit DomainRealmLimitUpdated(msg.sender, requests[i].domainId, requests[i].realmLimit);
    }
    return true;
  }

  function domainUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IDomainManagement.domainRegister.selector);
    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender); 

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].scopeId, senderId, functionId, false); 
      domainEntity.bs.agentLimit = requests[i].agentLimit;
      emit DomainAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
    }
    return true;
  }

  function domainCheckId(bytes32 domainId) external view returns (bool) {
    return _data.scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function domainCheckName(string calldata domainName) external view returns (bool) {
    return _data.scopes[LAclUtils.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool) {
    (DomainEntity storage domainEntity, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = _data.agents[domainAdminId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(domainAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(domainAdminId);
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


  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool) {
    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.contains(realmId);
  }

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return new bytes32[](0);
    return de.realms.values();
  }

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) {
      return DomainInfo ({
        adminId: bytes32(0),
        realmLimit: 0,
        agentLimit: 0,
        referredByAgent: 0,
        referredByPolicy: 0,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE, 
        alstate: AlterabilityStatus.NONE,
        name: ""
      });
    } 

    return DomainInfo ({
      adminId: de.bs.adminId,
      realmLimit: de.realmLimit,
      agentLimit: de.bs.agentLimit,
      referredByAgent: de.bs.referredByAgent,
      referredByPolicy: de.bs.referredByPolicy,
      adminType: _data.agents[de.bs.adminId].atype,  
      acstat: de.bs.acstat,
      alstate: de.bs.alstat,
      name: de.name
    });
  }

  function _doDomainUpdateActivityStatus(bytes32 domainId, ActivityStatus status, bytes32 functionId) internal returns (bool) {

    bytes32 senderId = LAclUtils.accountGenerateId(msg.sender);  
    DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(domainId, senderId, functionId, false); 

    if(status == ActivityStatus.DELETED) {    
      // BaseAgent storage domainAdminAgent = _data.agents[domainEntity.bs.adminId];
      // require(domainAdminAgent.referredByScope > 0, "Illegal Admin ReferredByScope");
      // unchecked { domainAdminAgent.referredByScope -= 1; }
      // emit AgentReferredByScopeUpdated(
      //   msg.sender, 
      //   domainEntity.bs.adminId,
      //   functionId,      
      //   ActionType.REMOVE
      // );
       _doUpdateAgentReferred(
        _data.agents[domainEntity.bs.adminId],
        domainEntity.bs.adminId,
        domainId, 
        msg.sender, 
        ActionType.REMOVE
      ); 
    }
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
  
  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.interfaces[type(IDomainManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 domainId, bytes32 senderId, bytes32 functionId, bool isAlterable) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = _data.domainReadSlot(domainId);
    require(domainEntity.bs.acstat > ActivityStatus.DELETED, "Domain Deleted");

    if(!isAlterable) {
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Update");
    }

    // check access admin role
    require(_doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId), "Forbidden");
    return domainEntity;
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole =  _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  } 

  function _doUpdateAgentReferred(
      BaseAgent storage agent,
      bytes32 agentId, 
      bytes32 scopeId, 
      address signerId, 
      ActionType action
  ) internal {
    if (action == ActionType.ADD) {
      require(agent.atype != AgentType.NONE, "Agent Not Found");
      require(agent.atype > AgentType.MEMBER, "Illegal AgentType");
      require(agent.acstat > ActivityStatus.DELETED, "Agent Deleted");
      require(agent.scopeLimit > agent.referredByScope, "Illegal Referred");
      agent.referredByScope += 1; 
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.ADD
      );
    } else if (action == ActionType.REMOVE) {
      require(agent.referredByScope > 0, "Illegal Referred");
      unchecked { agent.referredByScope -= 1; }
      emit AgentReferredByScopeUpdated(
        signerId, 
        agentId,
        scopeId, 
        ActionType.REMOVE
      );
    }
  }
  
}