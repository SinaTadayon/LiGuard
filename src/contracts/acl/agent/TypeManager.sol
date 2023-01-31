// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../ACLStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";


import "hardhat/console.sol";

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
    _accessPermission(ITypeManagement.typeRegister.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    
    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(int16(uint16(memberEntity.limits.typeRegisterLimit)) - int8(uint8(requests.length)) >= 0, "Illegal RegisterLimit");
    memberEntity.limits.typeRegisterLimit -= uint8(requests.length);    

    // fetch scope type and scope id of sender
    (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetMemberScopeInfoFromType(_LIVELY_VERSE_TYPE_MASTER_TYPE_ID, senderId);    
    
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newTypeId = LACLUtils.generateId(requests[i].name);     
      require(_data.agents[newTypeId].atype == AgentType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // checking requested type scope
      BaseScope storage requestedScope = _getAndCheckRequestScope(requests[i].scopeId, senderScopeId, senderScopeType);
     
      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);
      newType.ba.atype = AgentType.TYPE;
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      newType.ba.adminId = requests[i].adminId;
      newType.scopeId = requests[i].scopeId;
      newType.roleLimit = requests[i].roleLimit >= 0 ? uint16(uint24(requests[i].roleLimit)) : memberEntity.limits.typeRoleLimit;
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

  function typeUpdateScope(UpdateScopeRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateScope.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    ScopeType senderScopeType;
    bytes32 senderScopeId;
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      AgentType adminAgentType = _data.agents[typeEntity.ba.adminId].atype;
      if(adminAgentType == AgentType.ROLE) {
        RoleEntity storage roleEntity = _data.roleReadSlot(typeEntity.ba.adminId);
        senderScopeId = roleEntity.scopeId;
        senderScopeType = _data.scopes[roleEntity.scopeId].stype;
      } else {
        TypeEntity storage agentType = _data.typeReadSlot(typeEntity.ba.adminId);
        bytes32 memberRoleId = agentType.members[senderId];
        RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
        senderScopeType = _data.scopes[memberAgentRole.scopeId].stype;
        senderScopeId = memberAgentRole.scopeId;
      }
      
      BaseScope storage requestScope = _getAndCheckRequestScope(requests[i].scopeId, senderScopeId, senderScopeType);
      BaseScope storage oldScope = _data.scopes[typeEntity.scopeId];
      require(requestScope.stype > oldScope.stype, "Illegal ScopeType");
      require(oldScope.referredByAgent > 0, "Illeagl ReferredByAgent");
      oldScope.referredByAgent -= 1;
      typeEntity.scopeId = requests[i].scopeId;
      emit TypeScopeUpdated(msg.sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(ITypeManagement.typeUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
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
      IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);  
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
        adminType: AgentType.NONE,
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
      adminType: _data.agents[te.ba.adminId].atype,
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

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;
    
    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[memberId] != adminId) return IACL.AdminAccessStatus.NOT_PERMITTED;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
    } 

    return IACL.AdminAccessStatus.NOT_PERMITTED;   
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

  function _getTypeAdmin(ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId) internal view returns (bytes32 typeAdminId) {
    // checking requested type admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Amind Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      typeAdminId = adminId;

    } else {
      typeAdminId = requestScopeAdmin;
    }
  }

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {    
    TypeEntity storage agentType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    RoleEntity storage memberAgentRole =  _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 typeId, bytes32 senderId, bytes32 functionId) internal view returns (TypeEntity storage) {
    TypeEntity storage typeEntity = _data.typeReadSlot(typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return typeEntity;
  }

  function _getAndCheckRequestScope(bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType) internal returns (BaseScope storage){
    // checking requested type scope
    BaseScope storage requestedScope = _data.scopes[requestScopeId];
    require(requestedScope.stype != ScopeType.NONE , "Not Found");
    require(requestedScope.acstat > ActivityStatus.DELETED , "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;
          
    // check sender scope with request scope
    require(senderScopeType >= requestedScope.stype, "Illegal Sender ScopeType");
    if(senderScopeType == requestedScope.stype) {
      require(senderScopeId == requestScopeId, "Illegal Sender Scope");

    } else {
      require(IACLGenerals(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Admin Scope");
    }       

    return requestedScope;
  }     
}