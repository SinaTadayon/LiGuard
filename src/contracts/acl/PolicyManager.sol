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

  function policyRegister(PolicyRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    

    // check msg.sender is member of PolicyMasterType
    (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfPolicyMasterType(msg.sender);
    require(senderScopeType != ScopeType.NONE, "Access Denied");
    
    // check access permission to call function by msg.sender
    // for checking functionAgentType is equal to AgentType.Type, this function agent Id must be PolicyMasterType 
    // and any member has PolicyMasterType could access to it.
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, this.policyRegister.selector);
    (AgentType functionAgentType, bytes32 functionAgentId) = IFunctionManagement(address(this)).functionGetAgent(functionId);
    if(functionAgentType == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(functionAgentId, msg.sender), "Operation Not Permitted");      

    } else if (functionAgentType == AgentType.MEMBER) {
      require(LAclUtils.accountGenerateId(msg.sender) == functionAgentId, "Operation Not Permitted");
    }     

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newPolicyId = LAclUtils.generateId(requests[i].name);
      require(_data.policies[newPolicyId].acstat == ActivityStatus.NONE , "Policy Already Exists");

      // checking requested scope for policy
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestedScope.acstat == ActivityStatus.ENABLE , "Scope Not Activated");
      require(requestedScope.stype <= senderScopeType, "Illegal Scope Type");
      if(requestedScope.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Policy Scope");
      } else {        
        require(IAccessControl(address(this)).isScopesCompatible(senderScopeId, requests[i].scopeId), "Illegal Policy Scope");
      }

      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Policy Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Policy Alterability");

      // create policy entity
      PolicyEntity storage pe = _data.policies[newPolicyId];
       
      // checking requested admin of policy
      BaseAgent storage requestedAgent = _data.agents[requests[i].adminId];
      require(requestedAgent.atype >= AgentType.MEMBER, "Illegal Agent Type");
      (ScopeType requestedAdminScopeType, bytes32 requestedAdminScopeId) = IAccessControl(address(this)).getScopeAgentOfPolicyMasterType(requests[i].adminId);
      if(requestedAgent.atype != AgentType.TYPE) {
        require(uint8(requestedScope.stype) <= uint8(requestedAdminScopeType), "Illegal Admin Scope Type");
        if(requestedScope.stype == requestedAdminScopeType) {
          require(requestedAdminScopeId == requests[i].scopeId, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestedAdminScopeId, requests[i].scopeId), "Illegal Admin Scope ID");
        }
        pe.adminId = requests[i].adminId;

      } else {
        pe.adminId = IAccessControl(address(this)).getPolicyMasterTypeId();
      }
      
      pe.ptype = _doGetPolicyType(requests[i].policyCode);
      pe.policyCode = requests[i].policyCode;
      pe.acstat = requests[i].acstat;
      pe.alstat = requests[i].alstat;
      pe.name = requests[i].name;
      pe.scopeId = requests[i].scopeId;
      pe.adminId = requests[i].adminId;
      pe.roleLimit = requests[i].roleLimit;

      emit PolicyRegistered(
        msg.sender,
        newPolicyId,
        requests[i].scopeId, 
        requests[i].adminId,
        requests[i].name,
        requests[i].roleLimit,
        requests[i].policyCode, 
        pe.ptype,
        requests[i].acstat,
        requests[i].alstat
      );
    }

    return true;
  }

  function policyAddRoles(PolicyAddRolesRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyAddRoles.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");
      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        require(!policyEntity.roles.contains(requests[i].roles[j]), "Role Already Exists");
        RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);
        require(roleEntity.ba.atype == AgentType.ROLE, "Invalid Role Entity");

        ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        require(roleScopeType <= policyScopeType, "Illegal Role Scope Type");
        if(roleScopeType == policyScopeType) {
          require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
        }

        _data.rolePolicyMap[requests[i].roles[j]] = requests[i].policyId;
        policyEntity.roles.add(requests[i].roles[j]);
        emit PolicyRoleAdded(msg.sender, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function policyRemoveRoles(PolicyRemoveRolesRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyRemoveRoles.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Role Not Found");
        delete _data.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit PolicyRoleRemoved(msg.sender, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function policyUpdateCodes(PolicyUpdateCodeRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyUpdateCodes.selector), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit PolicyCodeUpdated(msg.sender, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function policyUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyUpdateCodes.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");
      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

     // checking requested admin of policy
      BaseAgent storage requestedAgent = _data.agents[requests[i].adminId];
      require(requestedAgent.atype >= AgentType.MEMBER, "Illegal Agent Type");
      (ScopeType requestedAdminScopeType, bytes32 requestedAdminScopeId) = IAccessControl(address(this)).getScopeAgentOfPolicyMasterType(requests[i].adminId);
      if(requestedAgent.atype != AgentType.TYPE) {
        require(uint8(policyScopeType) <= uint8(requestedAdminScopeType), "Illegal Admin Scope Type");
        if(policyScopeType == requestedAdminScopeType) {
          require(requestedAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopesCompatible(requestedAdminScopeId, requests[i].id), "Illegal Admin Scope ID");
        }
        policyEntity.adminId = requests[i].adminId;

      } else {
        policyEntity.adminId = IAccessControl(address(this)).getPolicyMasterTypeId();
      }

      emit PolicyAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }
 
  function policyUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyUpdateActivityStatus.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");

      policyEntity.acstat = requests[i].acstat;
      emit PolicyActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function policyUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyUpdateActivityStatus.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
    
      policyEntity.alstat = requests[i].alstat;
      emit PolicyAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function policyUpdatesRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.policyUpdateCodes.selector), "Access Denied");
    
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].policyId];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");
      require(_doPolicyCheckAdmin(policyEntity.adminId, memberId), "Operation Not Permitted");
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Policy");
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
    return _doPolicyCheckAdmin(policyEntity.adminId, LAclUtils.accountGenerateId(account));
  }

  function _doPolicyCheckAdmin(bytes32 adminId, bytes32 agentId) internal view returns (bool) {
    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.MEMBER) {
      return agentId == adminId;

    } else if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;
      return typeEntity.members[agentId] == adminId;
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

  function policyGetActivityStatus(bytes32 policyId) external view returns (ActivityStatus) {
    return _data.policies[policyId].acstat;
  }

  function policyGetAlterabilityStatus(bytes32 policyId) external view returns (AlterabilityStatus) {
    return _data.policies[policyId].alstat;
  }

  function policyGetName(bytes32 policyId) external view returns (string memory) {
    return _data.policies[policyId].name;
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

  function policyGetRolesCount(bytes32 policyId) external view returns (uint32) {
    if(_data.policies[policyId].adminId == bytes32(0)) return 0;
    return uint32(_data.policies[policyId].roles.length());
  }

  function policyGetPolicyType(uint8 policyCode) external pure returns (PolicyType) {
    return _doGetPolicyType(policyCode);
  }

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
}