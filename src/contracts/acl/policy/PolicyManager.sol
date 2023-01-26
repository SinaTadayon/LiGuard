// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IPolicyManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../ACLStorage.sol";
import "../scope/IFunctionManagement.sol";
import "../agent/IRoleManagement.sol";
import "../agent/ITypeManagement.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LACLCommons.sol";
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
    (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(msg.sender);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(memberEntity.limits.policyRegisterLimit - uint16(requests.length) > 0, "Illegal RegisterLimit");
    memberEntity.limits.policyRegisterLimit -= uint16(requests.length);

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newPolicyId = LACLUtils.generateId(requests[i].name);
      require(_data.policies[newPolicyId].acstat == ActivityStatus.NONE , "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // // checking requested type scope

      BaseScope storage requestedScope = _getAndCheckRequestScope(requests[i].scopeId, senderScopeId, senderScopeType);

      // create policy entity
      PolicyEntity storage policyEntity = _data.policies[newPolicyId];
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.acstat = requests[i].acstat;
      policyEntity.alstat = requests[i].alstat;
      policyEntity.name = requests[i].name;
      policyEntity.scopeId = requests[i].scopeId;
      policyEntity.roleLimit = memberEntity.limits.policyRoleLimit;
      policyEntity.adminId = _getPolicyAdmin(requestedScope.stype, requestedScope.adminId, requests[i].scopeId, requests[i].adminId);
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
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);
      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        require(_data.rolePolicyMap[requests[i].roles[j]] == bytes32(0), "Already Exist");
        require(policyEntity.adminId != requests[i].roles[j], "Illegal Role");
        require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
        RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);
   
        ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        require(roleScopeType <= policyScopeType, "Illegal RST");
        if(roleScopeType == policyScopeType) {
          require(roleEntity.scopeId == policyEntity.scopeId, "Illegal RS");
        } else {
          require(IACLGenerals(address(this)).isScopesCompatible(policyEntity.scopeId, roleEntity.scopeId), "Illegal RS");
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
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);

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
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);

      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit PolicyCodeUpdated(msg.sender, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function policyUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {

    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateAdmin.selector);   
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, senderId, functionId); 
      policyEntity.adminId = _getPolicyAdmin(_data.scopes[policyEntity.scopeId].stype, _data.scopes[policyEntity.scopeId].adminId, policyEntity.scopeId, requests[i].adminId);
      require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal AID");
      emit PolicyAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function policyUpdateScope(UpdateScopeRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateScope.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    ScopeType senderScopeType;
    bytes32 senderScopeId;
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, senderId, functionId);   

      AgentType adminAgentType = _data.agents[policyEntity.adminId].atype;
      if(adminAgentType == AgentType.ROLE) {
        RoleEntity storage roleEntity = _data.roleReadSlot(policyEntity.adminId);
        senderScopeId = roleEntity.scopeId;
        senderScopeType = _data.scopes[roleEntity.scopeId].stype;
      } else {
        TypeEntity storage agentType = _data.typeReadSlot(policyEntity.adminId);
        bytes32 memberRoleId = agentType.members[senderId];
        RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
        senderScopeType = _data.scopes[memberAgentRole.scopeId].stype;
        senderScopeId = memberAgentRole.scopeId;
      }
      
      BaseScope storage requestScope = _getAndCheckRequestScope(requests[i].scopeId, senderScopeId, senderScopeType);  
      require(requestScope.stype > _data.scopes[policyEntity.scopeId].stype, "Illegal ScopeType");   
      policyEntity.scopeId = requests[i].scopeId;
      emit PolicyScopeUpdated(msg.sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function policyUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateActivityStatus.selector);   
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, senderId, functionId);   
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");       
      policyEntity.acstat = requests[i].acstat;
      emit PolicyActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function policyUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateAlterabilityStatus.selector);   
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Not Found");      
      IACL.AdminAccessStatus status = _doCheckAdminAccess(policyEntity.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      policyEntity.alstat = requests[i].alstat;
      emit PolicyAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function policyUpdateRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IPolicyManagement.policyUpdateRoleLimit.selector);   
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);   
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
      roleCount: uint16(_data.policies[policyId].roles.length()),
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

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);       
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return functionId;
  }

  function _getMemberPolicyScopeInfo(address account) internal view returns (ScopeType, bytes32){
    bytes32 memberId = LACLUtils.accountGenerateId(account);  
    TypeEntity storage policyMasterType = _data.typeReadSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole =  _data.roleReadSlot(senderRoleId);
    return (_data.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 policyAdminId) {
    return LACLCommons.getPolicyAdmin(_data, requestScopeType, requestScopeAdmin, scopeId, adminId);
  // // checking requested type admin       
  //   if(adminId != bytes32(0)) {
  //     require(_data.agents[adminId].atype == AgentType.ROLE, "Illegal Admin AgentType");
  //     (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
  //     require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
  //     if(requestScopeType == requestAdminScopeType) {
  //       require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
  //     } else {
  //       require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
  //     }
  //     policyAdminId = adminId;

  //   } else {
  //     policyAdminId = requestScopeAdmin;
  //   }      
  }
  
  function _doGetPolicyAndCheckAdminAccess(bytes32 policyId, bytes32 memberId, bytes32 functionId) internal view returns (PolicyEntity storage) {
    return LACLCommons.getPolicyAndCheckAdminAccess(_data, policyId, memberId, functionId);
    // PolicyEntity storage policyEntity = _data.policies[policyId];
    // require(policyEntity.adminId != bytes32(0), "Not Found");      
    // require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    // IACL.AdminAccessStatus status = _doCheckAdminAccess(policyEntity.adminId, memberId, functionId);
    // if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    // return policyEntity;
  }

  function _getAndCheckRequestScope(bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType) internal view returns (BaseScope storage){
    return LACLCommons.getAndCheckRequestScope(_data, requestScopeId, senderScopeId, senderScopeType);
    // checking requested type scope
    // BaseScope storage requestedScope = _data.scopes[requestScopeId];
    // require(requestedScope.stype != ScopeType.NONE , "Scope Not Found");
    // require(requestedScope.acstat > ActivityStatus.DELETED , "Deleted");
  
    // require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    // if(requestedScope.stype == senderScopeType) {
    //   require(requestScopeId == senderScopeId, "Illegal Scope");
    // } else {        
    //   require(IACLGenerals(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Scope");
    // }      

    // return requestedScope;
  }     

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}