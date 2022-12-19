// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRealmManagement.sol";
import "./IGlobalManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/acl/LAclUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title Global Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract GlobalManager is AclStorage, IGlobalManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus) {

    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
    address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateActivityStatus.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");
    require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Operation Not Permitted");

    require(acstat > ActivityStatus.DELETED, "Illegal Activity Status");
    _data.global.bs.acstat = acstat;
    emit GlobalActivityUpdated(msg.sender, _data.global.bs.acstat);
    
    return acstat;
  }

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
   
    address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateAlterabilityStatus.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  

    // check admin function
    require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Operation Not Permitted");

    _data.global.bs.alstat = alstat;
    emit GlobalAlterabilityUpdated(msg.sender, _data.global.bs.alstat);
    
    return alstat;
  }

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
   
    address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  

    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");
    
    // check admin function
    require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Operation Not Permitted");

    require(newAdminId != _data.global.bs.adminId && newAdminId != bytes32(0), "Illegal Admin ID");
    
    BaseAgent storage adminBaseAgent = _data.agents[newAdminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage livelyAdminType = _data.typeReadSlot(LIVELY_VERSE_ADMIN_TYPE_ID);
      require(livelyAdminType.roles.contains(newAdminId), "Admin Not Found");
    } else {
      require(LIVELY_VERSE_ADMIN_TYPE_ID == newAdminId, "Illegal New Admin");
    }
    
    _data.global.bs.adminId = newAdminId;
    emit GlobalAdminUpdated(msg.sender, _data.global.bs.adminId, _data.agents[newAdminId].atype);
    return true;
  }

  function globalUpdateDomainLimit(uint16 domainLimit) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
   
    address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateDomainLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  

    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");

    // check admin function
    require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Operation Not Permitted");

    _data.global.domainLimit = domainLimit;
    emit GlobalDomainLimitUpdated(msg.sender, domainLimit);    
    return true;
  }

  function globalUpdateAgentLimit(uint16 agentLimit) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "Call Rejected");
   
    address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateDomainLimit.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  

    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");

    // check admin function
    require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Operation Not Permitted");

    _data.global.bs.agentLimit = agentLimit;
    emit GlobalAgentLimitUpdated(msg.sender, agentLimit);
    return true;
  }

  function globalCheckAdmin(address account) external view returns (bool) {
    bytes32 memberId = LAclUtils.accountGenerateId(account);
    TypeEntity storage livelyAdminType = _data.typeReadSlot(LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID);
    return livelyAdminType.members[memberId] != bytes32(0);  
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


  function globalGetDomains() external view returns (bytes32[] memory) {
    return _data.global.domains.values();
  }

  function globalGetInfo() external view returns (GlobalInfo memory) {
    return GlobalInfo ({      
      id: _data.global.id,
      adminId: _data.global.bs.adminId,
      domainLimit: _data.global.domainLimit,
      agentLimit: _data.global.bs.agentLimit,
      referredByAgent: _data.global.bs.referredByAgent,
      referredByPolicy: _data.global.bs.referredByPolicy,
      adminType: _data.agents[_data.global.bs.adminId].atype,
      acstat: _data.global.bs.acstat,
      alstate: _data.global.bs.alstat
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
}