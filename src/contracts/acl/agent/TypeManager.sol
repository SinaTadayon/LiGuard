// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../ACLStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Type Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract TypeManager is ACLStorage, BaseUUPSProxy, ITypeManagement {
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
      interfaceId == type(ITypeManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeRegister.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    
    // fetch scope type and scope id of sender
    (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(_LIVELY_VERSE_AGENT_MASTER_TYPE_ID, senderId);    
    
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newTypeId = LACLUtils.generateId(requests[i].name);
      require(_data.agents[newTypeId].atype == AgentType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // checking requested type scope
      BaseScope storage requestedScope = _data.scopes[requests[i].scopeId];
      require(requestedScope.stype != ScopeType.NONE , "Not Found");
      require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");
      require(requestedScope.agentLimit > requestedScope.referredByAgent, "Illegal Referred");

      // increase referred count to target scope
      requestedScope.referredByAgent += 1;
            
      // check sender scope with request scope
      require(memberScopeType >= requestedScope.stype, "Illegal Sender ScopeType");
      if(memberScopeType == requestedScope.stype) {
        require(memberScopeId == requests[i].scopeId, "Illegal Sender Scope");

      } else {
        require(IAccessControl(address(this)).isScopesCompatible(memberScopeId, requests[i].scopeId), "Illegal Admin Scope");
      }       

      // check access
      require(_doCheckAdminAccess(requestedScope.adminId, senderId, functionId), "Forbidden");
     
      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);
      newType.ba.atype = AgentType.TYPE;
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      newType.ba.adminId = requests[i].adminId;
      newType.scopeId = requests[i].scopeId;
      newType.roleLimit = requests[i].roleLimit;
      newType.name = requests[i].name;
      newType.ba.adminId = _getTypeAdmin(requestedScope.stype, requestedScope.adminId, requests[i].scopeId, requests[i].adminId);                        
      emit TypeRegistered(
        msg.sender,
        newTypeId,
        requests[i].scopeId,
        requests[i].adminId
      );
    }
    return true;
  }

  function typeUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested type admin   
      typeEntity.ba.adminId = _getTypeAdmin(
        _data.scopes[typeEntity.scopeId].stype, 
        _data.scopes[typeEntity.scopeId].adminId, 
        typeEntity.scopeId, 
        requests[i].adminId
      );

      emit TypeAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      require(_doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId), "Forbidden");    
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");             
      typeEntity.ba.acstat = requests[i].acstat;
      emit TypeActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function typeUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      require(_doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId), "Forbidden");  
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      typeEntity.ba.alstat = requests[i].alstat;
      emit TypeAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function typeUpdateRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateRoleLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  

    for (uint256 i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(requests[i].typeId, senderId, functionId);
      require(requests[i].roleLimit > typeEntity.roles.length(), "Illegal Limit");
      typeEntity.roleLimit = requests[i].roleLimit;
      emit TypeRoleLimitUpdated(msg.sender, requests[i].typeId, requests[i].roleLimit);
    }
    return true;
  }

  function typeCheckId(bytes32 typeId) external view returns (bool) {
    return _data.agents[typeId].atype == AgentType.TYPE;
  }

  function typeCheckName(string calldata typeName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function typeCheckAdmin(bytes32 typeId, address account) external view returns (bool) {
    if (_data.agents[typeId].atype != AgentType.TYPE) return false;    
    
    bytes32 typeAdminId = _data.agents[typeId].adminId;
    AgentType adminAgentType = _data.agents[typeAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(adminAgentType == AgentType.ROLE) {
      return _doRoleHasMember(typeAdminId, memberId);
    
    } else if(adminAgentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(typeAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[LACLUtils.accountGenerateId(account)] != bytes32(0);
  }

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.contains(roleId);
  }

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return new bytes32[](0);
    return te.roles.values();
  }

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) {
    return TypeInfo ({
        scopeId: bytes32(0),
        adminId: bytes32(0),
        roleLimit: 0,
        roleCount: 0,    
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });    
    }

    return TypeInfo ({
      scopeId: te.scopeId,
      adminId: te.ba.adminId,      
      roleLimit: te.roleLimit,
      roleCount: uint16(te.roles.length()),
      atype: te.ba.atype,
      acstat: te.ba.acstat,
      alstat: te.ba.alstat,
      name: te.name
    });
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
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

  function _doTypeUpdateActivityStatus(bytes32 typeId, ActivityStatus status, bytes32 functionId) internal returns (bool) {    
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(typeId, senderId, functionId);
    typeEntity.ba.acstat = status;
    emit TypeActivityUpdated(msg.sender, typeId, status);
    return true;  
  }

  // Note: Member could not assigned to any entities as admin
  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (bool) {
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

  function _getTypeAdmin(ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 typeAdminId) {
    // checking requested type admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Amind Scope");
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      typeAdminId = adminId;

    } else {
      typeAdminId = requestScopeAdmin;
    }
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole =  _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 typeId, bytes32 senderId, bytes32 functionId) internal view returns (TypeEntity storage) {
    TypeEntity storage typeEntity = _data.typeReadSlot(typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId), "Forbidden");
    return typeEntity;
  }
}