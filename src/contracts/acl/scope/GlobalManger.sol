// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IGlobalManagement.sol";
import "../IAccessControl.sol";
import "../ACLStorage.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Global Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract GlobalManager is ACLStorage, BaseUUPSProxy, IGlobalManagement {
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
      interfaceId == type(IGlobalManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus) {
    bytes32 functionId = _accessPermission(IGlobalManagement.globalUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    require(globalEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Updatable");    
    require(_doCheckAdminAccess(globalEntity.bs.adminId, senderId, functionId), "Forbidden");
    require(acstat > ActivityStatus.DELETED, "Illegal Activity");
    globalEntity.bs.acstat = acstat;
    emit GlobalActivityUpdated(msg.sender, _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, globalEntity.bs.acstat);    
    return acstat;
  }

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus) {
    bytes32 functionId = _accessPermission(IGlobalManagement.globalUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    // require(globalEntity.bs.acstat > ActivityStatus.DISABLED, "Global Disabled");
    require(_doCheckAdminAccess(globalEntity.bs.adminId, senderId, functionId), "Forbidden");
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    globalEntity.bs.alstat = alstat;
    emit GlobalAlterabilityUpdated(msg.sender, _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, globalEntity.bs.alstat);    
    return alstat;
  }

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool) {
    // require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
   
    // address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    // bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateAdmin.selector);
    // require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    // bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  

    // require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");
    
    // // check admin function
    // require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Forbidden");
    bytes32 functionId = _accessPermission(IGlobalManagement.globalUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);

    require(newAdminId != globalEntity.bs.adminId && newAdminId != bytes32(0), "Illegal AdminId");
    
    BaseAgent storage adminBaseAgent = _data.agents[newAdminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
      require(livelyAdminType.roles.contains(newAdminId), "Not Found");
    } else {
      require(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID == newAdminId, "Illegal Admin");
    }
    
    globalEntity.bs.adminId = newAdminId;
    emit GlobalAdminUpdated(msg.sender, _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, globalEntity.bs.adminId, _data.agents[newAdminId].atype);
    return true;
  }

  function globalUpdateDomainLimit(uint16 domainLimit) external returns (bool) {
    bytes32 functionId = _accessPermission(IGlobalManagement.globalUpdateDomainLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);

    globalEntity.domainLimit = domainLimit;
    emit GlobalDomainLimitUpdated(msg.sender, _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, domainLimit);    
    return true;
  }

  function globalUpdateAgentLimit(uint16 agentLimit) external returns (bool) {
    // require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
   
    // address functionFacetId = _data.interfaces[type(IGlobalManagement).interfaceId];
    // bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, IGlobalManagement.globalUpdateDomainLimit.selector);
    // require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    // bytes32 memberId = LACLUtils.accountGenerateId(msg.sender);  

    // require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Update");

    // // check admin function
    // require(_doCheckAdminAccess(_data.global.bs.adminId, memberId, functionId), "Forbidden");

    bytes32 functionId = _accessPermission(IGlobalManagement.globalUpdateAgentLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    GlobalEntity storage globalEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);

    globalEntity.bs.agentLimit = agentLimit;
    emit GlobalAgentLimitUpdated(msg.sender, _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, agentLimit);
    return true;
  }

  function globalCheckAdmin(address account) external view returns (bool) {
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    return livelyAdminType.members[memberId] != bytes32(0);  
  }

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


  function globalGetDomains() external view returns (bytes32[] memory) {
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    return globalEntity.domains.values();
  }

  function globalGetInfo() external view returns (GlobalInfo memory) {
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    return GlobalInfo ({            
      id: _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
      adminId: globalEntity.bs.adminId,
      domainLimit: globalEntity.domainLimit,
      domainCount: uint16(globalEntity.domains.length()),
      agentLimit: globalEntity.bs.agentLimit,      
      referredByAgent: globalEntity.bs.referredByAgent,
      stype:  globalEntity.bs.stype,
      adminType: _data.agents[globalEntity.bs.adminId].atype,
      acstat: globalEntity.bs.acstat,      
      alstat: globalEntity.bs.alstat
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

  function _accessPermission(bytes4 selector) internal view returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    return functionId;
  }


  function _doGetEntityAndCheckAdminAccess(bytes32 senderId, bytes32 functionId) internal view returns (GlobalEntity storage) {
    GlobalEntity storage globalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    // require(globalEntity.bs.acstat > ActivityStatus.DISABLED, "Global Disabled");
    require(globalEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    require(_doCheckAdminAccess(globalEntity.bs.adminId, senderId, functionId), "Forbidden");
    return globalEntity;
  }
}