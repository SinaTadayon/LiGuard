// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IPolicyManagement.sol";
import "../IAccessControl.sol";
import "../ACLStorage.sol";
import "../scope/IFunctionManagement.sol";
import "../agent/IRoleManagement.sol";
import "../agent/ITypeManagement.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract PolicyManager is ACLStorage, BaseUUPSProxy, IPolicyManagement {
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
      interfaceId == type(IPolicyManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }
 
  // called by members of Policy Master type
  function policyRegister(PolicyRegisterRequest[] calldata requests) external returns (bool) {    
    _accessPermission(IPolicyManagement.policyRegister.selector);
        
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newPolicyId = LACLUtils.generateId(requests[i].name);
      require(_data.policies[newPolicyId].acstat == ActivityStatus.NONE , "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // checking requested type scope
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
      require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");
     
      (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(msg.sender);

      require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
      if(requestedScope.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Scope");
      } else {        
        require(IAccessControl(address(this)).isScopesCompatible(senderScopeId, requests[i].scopeId), "Illegal Scope");
      }      

      // create policy entity
      PolicyEntity storage policyEntity = _data.policies[newPolicyId];
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.acstat = requests[i].acstat;
      policyEntity.alstat = requests[i].alstat;
      policyEntity.name = requests[i].name;
      policyEntity.scopeId = requests[i].scopeId;
      policyEntity.roleLimit = requests[i].roleLimit;
      policyEntity.adminId = _getPolicyAdmin(requestedScope.stype, requestedScope.adminId, requests[i].scopeId, requests[i].adminId);

      // // checking requested type admin       
      // if(requests[i].adminId != bytes32(0)) {
      //   BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
      //   require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
      //   (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      //   require(requestedScope.stype <= requestAdminScopeType, "Illegal Admin Scope Type");
      //   if(requestedScope.stype == requestAdminScopeType) {
      //     require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope");
      //   } else {
      //     require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Admin Scope");
      //   }
      //   policyEntity.adminId = requests[i].adminId;

      // } else {
      //   policyEntity.adminId = requestedScope.adminId;
      // }    

      emit PolicyRegistered(
        msg.sender,
        newPolicyId,
        requests[i].scopeId, 
        requests[i].adminId,
        requests[i].policyCode
      );
    }

    return true;
  }

  // called by policy admin
  function policyAddRoles(PolicyAddRolesRequest[] calldata requests) external returns (bool) {    

    bytes32 functionId = _accessPermission(IPolicyManagement.policyAddRoles.selector);            
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, memberId, functionId);      
      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        require(_data.rolePolicyMap[requests[i].roles[j]] == bytes32(0), "Already Exist");
        require(policyEntity.adminId != requests[i].roles[j], "Illegal Role");
        require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
        RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);
   
        ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        require(roleScopeType <= policyScopeType, "Illegal Role ScopeType");
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

    bytes32 functionId = _accessPermission(IPolicyManagement.policyRemoveRoles.selector);
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, memberId, functionId);

      for (uint256 j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Not Found");    
        delete _data.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit PolicyRoleRemoved(msg.sender, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function policyUpdateCodes(PolicyUpdateCodeRequest[] calldata requests) external returns (bool) {

    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateCodes.selector);
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, memberId, functionId);

      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit PolicyCodeUpdated(msg.sender, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function policyUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {

    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateAdmin.selector);   
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, memberId, functionId);    

      // checking requested type admin       
      // if(requests[i].adminId != bytes32(0)) {
      //   BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
      //   require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
      //   (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
      //   ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;
      //   require(policyScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");
      //   if(policyScopeType == requestAdminScopeType) {
      //     require(requestAdminScopeId == policyEntity.scopeId, "Illegal Amind Scope");
      //   } else {
      //     require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, policyEntity.scopeId), "Illegal Admin Scope");
      //   }
      //   policyEntity.adminId = requests[i].adminId;

      // } else {
      //   policyEntity.adminId = _data.scopes[policyEntity.scopeId].adminId;
      // }
      
      policyEntity.adminId = _getPolicyAdmin(_data.scopes[policyEntity.scopeId].stype, _data.scopes[policyEntity.scopeId].adminId, policyEntity.scopeId, requests[i].adminId);
      require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal AdminId");
      emit PolicyAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }
 

  function policyUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateActivityStatus.selector);   
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Forbidden");  
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");       
      policyEntity.acstat = requests[i].acstat;
      emit PolicyActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function policyUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateAdmin.selector);   
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
      // require(policyEntity.acstat > ActivityStatus.DISABLED, "Policy disable");
      require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Forbidden");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      policyEntity.alstat = requests[i].alstat;
      emit PolicyAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function policyUpdateRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateAdmin.selector);   
    bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, memberId, functionId);
      require(requests[i].roleLimit > policyEntity.roles.length(), "Illegal Limit");
      policyEntity.roleLimit = requests[i].roleLimit;      
      emit PolicyRoleLimitUpdated(msg.sender, requests[i].policyId, requests[i].roleLimit);
    }
    return true;
  }

  function policyCheckId(bytes32 policyId) external view returns (bool) {
    return _data.policies[policyId].adminId != bytes32(0);
  }

  function policyCheckName(string calldata policyName) external view returns (bool) {
    return _data.policies[LACLUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function policyCheckAdmin(bytes32 policyId, address account) external view returns (bool) {
    PolicyEntity storage policyEntity = _data.policies[policyId];
    if(policyEntity.adminId == bytes32(0)) return false;
    
    bytes32 policyAdminId = policyEntity.adminId;
    AgentType agentType = _data.agents[policyAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(policyEntity.adminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(policyAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
    return true;
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
    if(policyEntity.acstat != ActivityStatus.ENABLED) return false;
    if(policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  
  }

  function policyCheckRole(bytes32 roleId) external view returns (bool) {
      return _data.rolePolicyMap[roleId] != bytes32(0);
  }

  function policyHasRole(bytes32 policyId, bytes32 roleId) external view returns (bool) {
    return _data.rolePolicyMap[roleId] == policyId;
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
        roleCount: 0,
        policyCode: 0,
        adminType: AgentType.NONE,
        scopeType: ScopeType.NONE,
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
      roleCount: uint32(_data.policies[policyId].roles.length()),
      policyCode: _data.policies[policyId].policyCode,
      adminType: _data.agents[_data.policies[policyId].adminId].atype,
      scopeType: _data.scopes[_data.policies[policyId].scopeId].stype,
      ptype: _data.policies[policyId].ptype, 
      acstat: _data.policies[policyId].acstat, 
      alstat: _data.policies[policyId].alstat
    });
  }

  function policyGetRoles(bytes32 policyId) external view returns (bytes32[] memory) {
    if(_data.policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.policies[policyId].roles.values();
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

    if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;

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

  function _accessPermission(bytes4 selector) internal view returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);       
    require(IAccessControl(address(this)).hasMemberAccess(senderId, functionId), "Access Denied");
    return functionId;
  }

  function _getMemberPolicyScopeInfo(address account) internal view returns (ScopeType, bytes32){
    bytes32 memberId = LACLUtils.accountGenerateId(account);  

    // get scope id of sender
    TypeEntity storage policyMasterType = _data.typeReadSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole =  _data.roleReadSlot(senderRoleId);
    return (_data.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 policyAdminId) {
  // checking requested type admin       
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype == AgentType.ROLE, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      policyAdminId = adminId;

    } else {
      policyAdminId = requestScopeAdmin;
    }      
  }
  
  function _doGetPolicyAndCheckAdminAccess(bytes32 policyId, bytes32 memberId, bytes32 functionId) internal view returns (PolicyEntity storage) {
    PolicyEntity storage policyEntity = _data.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Policy Not Found");      
    // require(policyEntity.acstat > ActivityStatus.DISABLED, "Policy disable");
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_doPolicyCheckAdminAccess(policyEntity.adminId, memberId, functionId), "Forbidden");
    return policyEntity;
  }
}