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
 * @title Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract PolicyManager is AclStorage, IPolicyManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // called by members of Policy Master type
  function policyRegister(PolicyRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyRegister.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newPolicyId = LAclUtils.generateId(requests[i].name);
      require(_data.policies[newPolicyId].acstat == ActivityStatus.NONE , "Policy Already Exist");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // checking requested type scope
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");
      requestedScope.referredByPolicy += 1;
      emit ScopeReferredByPolicyUpdated(
        msg.sender, 
        requests[i].scopeId, 
        newPolicyId, 
        requestedScope.referredByPolicy, 
        requestedScope.stype, 
        ActionType.ADD
      );

      // get scope id of sender
      TypeEntity storage policyMasterType = _data.typeReadSlot(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
      bytes32 senderRoleId = policyMasterType.members[memberId];
      RoleEntity storage senderPolicyRole =  _data.roleReadSlot(senderRoleId);
      ScopeType senderScopeType = _data.scopes[senderPolicyRole.scopeId].stype;
      bytes32 senderScopeId = senderPolicyRole.scopeId;

      require(requestedScope.stype <= senderScopeType, "Illegal Scope Type");
      if(requestedScope.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Policy Scope");
      } else {        
        require(IAccessControl(address(this)).isScopesCompatible(senderScopeId, requests[i].scopeId), "Illegal Policy Scope");
      }      

      // create policy entity
      PolicyEntity storage policyEntity = _data.policies[newPolicyId];
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.acstat = requests[i].acstat;
      policyEntity.alstat = requests[i].alstat;
      policyEntity.name = requests[i].name;
      policyEntity.scopeId = requests[i].scopeId;
      policyEntity.adminId = requests[i].adminId;
      policyEntity.roleLimit = requests[i].roleLimit;

      // checking requested type admin       
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestedScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(requestedScope.stype == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Admin Scope");
        }
        policyEntity.adminId = requests[i].adminId;

      } else {
        policyEntity.adminId = requestedScope.adminId;
      }
      
      // add reference of admin agent
      BaseAgent storage policyAdminAgent = _data.agents[policyEntity.adminId];
      require(policyAdminAgent.atype != AgentType.NONE, "Admin Not Found");
      require(policyAdminAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      policyAdminAgent.referredByPolicy += 1;
      emit AgentReferredByPolicyUpdated(
        msg.sender, 
        policyEntity.adminId,
        newPolicyId, 
        policyAdminAgent.referredByPolicy, 
        policyAdminAgent.atype, 
        ActionType.ADD
      );

      emit PolicyRegistered(
        msg.sender,
        newPolicyId,
        requests[i].scopeId, 
        requests[i].adminId,
        requests[i].name,
        requests[i].roleLimit,
        requests[i].policyCode, 
        policyEntity.ptype,
        requests[i].acstat,
        requests[i].alstat
      );
    }

    return true;
  }

  // called by policy admin
  function policyAddRoles(PolicyAddRolesRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyAddRoles.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Policy Deleted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      // check access admin role
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        // require(!policyEntity.roles.contains(requests[i].roles[j]), "Role Already Exist");
        require(_data.rolePolicyMap[requests[i].roles[j]] == bytes32(0), "Role Already Exist");        
        RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);
        require(roleEntity.ba.atype == AgentType.ROLE, "Invalid Role Entity");
        require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role Deleted");
        roleEntity.ba.referredByPolicy += 1; 
        emit AgentReferredByPolicyUpdated(
          msg.sender, 
          policyEntity.adminId,
          requests[i].policyId, 
          roleEntity.ba.referredByPolicy, 
          roleEntity.ba.atype, 
          ActionType.ADD
        );

        ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        require(roleScopeType <= policyScopeType, "Illegal Role Scope Type");
        if(roleScopeType == policyScopeType) {
          require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(policyEntity.scopeId, roleEntity.scopeId), "Illegal Role Scope");
        }

        _data.rolePolicyMap[requests[i].roles[j]] = requests[i].policyId;
        policyEntity.roles.add(requests[i].roles[j]);
        emit PolicyRoleAdded(msg.sender, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  // called by policy admin
  function policyRemoveRoles(PolicyRemoveRolesRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyRemoveRoles.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Policy Deleted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      // check access admin role
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

      for (uint256 j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Role Not Found");
        RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);
        require(roleEntity.ba.referredByPolicy > 0, "Illegal Role ReferredByPolicy");
        unchecked { roleEntity.ba.referredByPolicy -= 1; }
        emit AgentReferredByPolicyUpdated(
          msg.sender, 
          policyEntity.adminId,
          requests[i].policyId, 
          roleEntity.ba.referredByPolicy, 
          roleEntity.ba.atype, 
          ActionType.REMOVE
        );

        delete _data.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit PolicyRoleRemoved(msg.sender, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function policyUpdateCodes(PolicyUpdateCodeRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyUpdateCodes.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Policy Deleted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      // check access admin role
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit PolicyCodeUpdated(msg.sender, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function policyUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");    
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyUpdateAdmin.selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Policy Deleted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      // check access admin role
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

       // update function admin Id
      BaseAgent storage policyAdminAgent = _data.agents[policyEntity.adminId];
      require(policyAdminAgent.referredByPolicy > 0, "Illegal Admin ReferredByScope");
      unchecked { policyAdminAgent.referredByPolicy -= 1; }
      emit AgentReferredByPolicyUpdated(
        msg.sender, 
        policyEntity.bs.adminId, 
        requests[i].id, 
        policyEntity.referredByScope, 
        policyEntity.atype, 
        ActionType.REMOVE
      );

      // checking requested type admin       
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;
        require(policyScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
        if(policyScopeType == requestAdminScopeType) {
          require(requestAdminScopeId == policyEntity.scopeId, "Illegal Amind Scope");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, policyEntity.scopeId), "Illegal Admin Scope");
        }
        policyEntity.adminId = requests[i].adminId;

      } else {
        policyEntity.adminId = _data.scopes[policyEntity.scopeId].adminId;
      }
      

      // checking new admin Id 
      BaseAgent storage newBaseAgent = _data.agents[requests[i].adminId];
      require(newBaseAgent.atype != AgentType.NONE, "Admin Not Found");
      require(newBaseAgent.acstat > ActivityStatus.DELETED, "Admin Deleted");
      newBaseAgent.referredByPolicy += 1;
      emit AgentReferredByPolicyUpdated(
        msg.sender, 
        requests[i].adminId, 
        requests[i].id, 
        newBaseAgent.referredByPolicy, 
        newBaseAgent.atype, 
        ActionType.ADD
      );  

      emit PolicyAdminUpdated(msg.sender, requests[i].id, requests[i].adminId, newBaseAgent.atype);
    }
    return true;
  }
 
  function policyDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyDeleteActivity.selector);
    for(uint i = 0; i < requests.length; i++) {
      _doPolicyUpdateActivityStatus(requests[i], ActivityStatus.DELETED, functionId);
    }
    return true;
  }

  function policyUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      require(requests[i].acstat != ActivityStatus.DELETED, "Illegal Activity");
      _doPolicyUpdateActivityStatus(requests[i].id, requests[i].acstat, functionId);
    }
    return true;
  }

  function policyUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Realm Deleted");
      require(_doCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

      policyEntity.alstat = requests[i].alstat;
      emit PolicyAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function policyUpdatesRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
     require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");

    address functionFacetId = _data.interfaces[type(IPolicyManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IPolicyManagement.policyUpdatesRoleLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);    
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.acstat > ActivityStatus.DELETED, "Function Deleted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
      require(_doCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

      policyEntity.roleLimit = requests[i].roleLimit;      
      emit PolicyRoleLimitUpdated(msg.sender, requests[i].policyId, requests[i].roleLimit);
    }
    return true;
  }

  function policyCheckId(bytes32 policyId) external view returns (bool) {
    return _data.policies[policyId].adminId != bytes32(0);
  }

  function policyCheckName(string calldata policyName) external view returns (bool) {
    return _data.policies[LAclUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function policyCheckAdmin(bytes32 policyId, address account) external view returns (bool) {
    PolicyEntity storage policyEntity = _data.policies[policyId];
    if(policyEntity.adminId == bytes32(0)) return false;
    
    bytes32 policyAdminId = policyEntity.adminId;
    AgentType agentType = _data.agents[policyAdminId].atype;
    bytes32 memberId = LAclUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(policyAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  }

  function policyCheckAccess(bytes32 policyId, bytes32 functionId) external view returns (bool) {
    return _doCheckAccessPolicy(policyId, functionId);
  }

  function policyCheckRoleAccess(bytes32 roleId, bytes32 functionId) external view returns (bool) {
    return _doCheckAccessPolicy(_data.rolePolicyMap[roleId], functionId);
  }

  function _doCheckAccessPolicy(bytes32 policyId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    PolicyEntity storage policyEntity = _data.policies[policyId];
    if(policyEntity.acstat != ActivityStatus.ENABLE) return false;
    if(policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  
  }

  function policyHasRole(bytes32 roleId) external view returns (bool) {
    return _data.rolePolicyMap[roleId] != bytes32(0);
  }

  function policyGetInfoByRole(bytes32 roleId) external view returns (PolicyInfo memory) {
    return _doPolicyGetInfo(_data.rolePolicyMap[roleId]);
  }

  function policyGetInfo(bytes32 policyId) external view returns (PolicyInfo memory) {
    return _doPolicyGetInfo(policyId);
  }

  function _doPolicyGetInfo(bytes32 policyId) internal view returns (PolicyInfo memory) {
    if(_data.policies[policyId].adminId == bytes32(0)) {
      return PolicyInfo ({
        adminId: bytes32(0),
        scopeId: bytes32(0),
        name: "",
        roleLimit: 0,
        roleTotal: 0,
        policyCode: 0,
        adminType: AgentType.NONE,
        ptype: PolicyType.UNLOCK, 
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE
      });
    }

    return PolicyInfo ({
      adminId: _data.policies[policyId].adminId,
      scopeId: _data.policies[policyId].scopeId,
      name: _data.policies[policyId].name,
      roleLimit: _data.policies[policyId].roleLimit,
      roleTotal: uint32(_data.policies[policyId].roles.length()),
      policyCode: _data.policies[policyId].policyCode,
      adminType: _data.agents[_data.policies[policyId].adminId].atype,
      ptype: _data.policies[policyId].ptype, 
      acstat: _data.policies[policyId].acstat, 
      alstat: _data.policies[policyId].alstat
    });
  }

  function policyGetRoles(bytes32 policyId) external view returns (bytes32[] memory) {
    if(_data.policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.policies[policyId].roles.values();
  }

  // function policyGetPolicyType(uint8 policyCode) external pure returns (PolicyType) {
  //   return _doGetPolicyType(policyCode);
  // }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    if(policyCode == 0) {
      return PolicyType.UNLOCK;

    } else if(policyCode <= 63) {
      return PolicyType.SLOCK;

    } else if(policyCode <= 127) {
      return PolicyType.MLOCK;

    } else if(policyCode <= 191) {
      return PolicyType.RLOCK;

    } else if(policyCode <= 254) {
      return PolicyType.HLOCK;

    } else {
      return PolicyType.LOCK;
    } 
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

   // Note: Member could not assigned to any entities as admin
  function _doPolicyCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
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

   function _doPolicyUpdateActivityStatus(bytes32 policyId, ActivityStatus status, bytes32 functionId) internal returns (bool) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    PolicyEntity storage policyEntity = _data.policyReadSlot(realmId);
    require(policyEntity.acstat > ActivityStatus.DELETED, "Function Deleted");
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    require(_doCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Operation Not Permitted");

    if(status == ActivityStatus.DELETED) {    
      BaseAgent storage policyAdminAgent = _data.agents[policyEntity.adminId];
      require(policyAdminAgent.referredByPolicy > 0, "Illegal Admin ReferredByPolicy");
      unchecked { policyAdminAgent.referredByPolicy -= 1; }
      emit AgentReferredByPolicyUpdated(
        msg.sender, 
        policyEntity.adminId,
        functionId, 
        policyAdminAgent.referredByPolicy, 
        policyAdminAgent.atype,
        ActionType.REMOVE
      );
    }
}