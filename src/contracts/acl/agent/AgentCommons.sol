// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract AgentCommons is AclStorage, IAgentCommons {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // event AgentActivityUpdated(address indexed sender, bytes32 indexed agentId, ActivityStatus acstat, AgentType atype);

  // event AgentAlterabilityUpdated(address indexed sender, bytes32 indexed agnetId, AlterabilityStatus alstat, AgentType atype);

  // event AgentReferredByScopeUpdated(address indexed sender, bytes32 indexed agentId, uint16 referredByScope, AgentType atype, ActionType action);

  // event AgentReferredByPolicyUpdated(address indexed sender, bytes32 indexed agentId, uint16 referredByPolicy, AgentType atype, ActionType action);


  function agentEnableActivity(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateActivity(requests, ActivityStatus.ENABLED, IAgentCommons.agentEnableActivity.selector);
  }

  function agentDeleteActivity(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateActivity(requests, ActivityStatus.DELETED, IAgentCommons.agentDeleteActivity.selector);
  }

  function agentDisableActivity(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateActivity(requests, ActivityStatus.DISABLED, IAgentCommons.agentDisableActivity.selector);
  }

  function agentSafeModeActivity(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateActivity(requests, ActivityStatus.SAFE_MODE, IAgentCommons.agentSafeModeActivity.selector);
  }

  function agentDisableAlterability(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateAlterability(requests, AlterabilityStatus.DISABLED, IAgentCommons.agentDisableAlterability.selector);
  }

  function agentUpdateableAlterability(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateAlterability(requests, AlterabilityStatus.UPDATABLE, IAgentCommons.agentUpdateableAlterability.selector);
  }

  function agentUpgradableAlterability(bytes32[] calldata requests) external returns (bool) {
    return _doAgentUpdateAlterability(requests, AlterabilityStatus.UPGRADABLE, IAgentCommons.agentUpgradableAlterability.selector);
  }

  // function agentUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), IAgentCommons.agentUpdateAdmin.selector), "Access Denied");

  //   bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
  //   bytes32 functionId = LAclUtils.functionGenerateId(address(this), selector);
  //   for (uint256 i = 0; i < requests.length; i++) {
  //     BaseAgent storage baseAgent = _data.agents[requests[i].id];
  //     require(baseAgent.adminId != bytes32(0), "Agent Not Found");
  //     require(baseAgent.acstat != ActivityStatus.DELETED, "Agent is Deleted");
  //     require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");

  //    // checking requested admin of policy
  //     BaseAgent storage requestedAdminAgent = _data.agents[requests[i].adminId];
  //     require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Agent Admin Type");
  //     (ScopeType requestedAdminScopeType, bytes32 requestedAdminScopeId) = _doGetScopeInfo(requestedAdminAgent.atype, requests[i].adminId);
  //     if(requestedAgent.atype != AgentType.TYPE) {
  //       require(uint8(policyScopeType) <= uint8(requestedAdminScopeType), "Illegal Admin Scope Type");
  //       if(policyScopeType == requestedAdminScopeType) {
  //         require(requestedAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
  //       } else {
  //         require(IAccessControl(address(this)).isScopesCompatible(requestedAdminScopeId, requests[i].id), "Illegal Admin Scope ID");
  //       }
  //       policyEntity.adminId = requests[i].adminId;

  //     } else {
  //       policyEntity.adminId = IAccessControl(address(this)).getPolicyMasterTypeId();
  //     }

  //     emit PolicyAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
  //   }
  //   return true;
  // }

  function agentUpdateReferredByScope(UpdateReferredByRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), IAgentCommons.agentUpdateReferredByScope.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i].id];
      require(baseAgent.adminId != bytes32(0), "Agent Not Found");
      require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");  

      if(requests[i].action == ActionType.ADD) {
        require(baseAgent.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
        baseAgent.referredByScope += 1;
        emit AgentReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, baseAgent.atype, requests[i].action);
      
      } else if(requests[i].action == ActionType.REMOVE) {
          require(baseAgent.referredByScope > 0, "Illegal ReferredByScope Remove");
          unchecked { baseAgent.referredByScope -= 1; }        
          emit AgentReferredByScopeUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.referredByScope, baseAgent.atype, requests[i].action);
      } else {
        revert ("Illegal Action Type");
      }
    }
    return true;
  }

  function agentUpdateReferredByPolicy(UpdateReferredByRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), IAgentCommons.agentUpdateReferredByPolicy.selector), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i].id];
      require(baseAgent.adminId != bytes32(0), "Agent Not Found");
      require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");


      if(requests[i].action == ActionType.ADD) {
        require(baseAgent.acstat != ActivityStatus.DELETED, "Agent Is Deleted");
        baseAgent.referredByPolicy += 1;
        emit AgentReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.atype, action, requests[i].action);
      
      } else if(requests[i].action == ActionType.REMOVE) {
        require(baseAgent.referredByPolicy > 0, "Illegal ReferredByPolicy Remove");
        unchecked { baseAgent.referredByPolicy -= 1; }
        emit AgentReferredByPolicyUpdated(msg.sender, requests[i].id, requests[i].entityId, baseAgent.atype, action, requests[i].action);
      
      } else {
        revert ("Illegal Action Type");
      }
    }
    return true;
  }


  function _doGetScopeInfo(bytes32 agentId) internal returns (ScopeType, bytes32) {

    BaseAgent atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage TypeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }


  function _doAgentUpdateActivity(bytes32[] calldata requests, ActivityStatus status, bytes4 selector) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), selector), "Access Denied");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, selector);
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i]];
      require(baseAgent.adminId != bytes32(0), "Agent Not Found");
      require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");
      require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");
      require(baseAgent.acstat != ActivityStatus.DELETED, "Agent is Deleted");

      baseAgent.acstat = status;
      emit AgentActivityUpdated(msg.sender, requests[i], status, baseAgent.atype);
    }
    return true;  
  }

  function _doAgentUpdateAlterability(bytes32[] calldata requests, AlterabilityStatus status, bytes4 selector) internal returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), selector), "Access Denied");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, selector);
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i]];
      require(baseAgent.adminId != bytes32(0), "Agent Not Found");
      require(baseAgent.acstat != ActivityStatus.DELETED, "Agent is Deleted");
      require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");
    
      baseAgent.alstat = status;
      emit AngetAlterabilityUpdated(msg.sender, requests[i], status, baseAgent.atype);
    }
    return true;
  }

  // Note: Member could not assigned to any entities as admin
  function _doAgentCheckAdminAccess(bytes32 adminId, bytes32 agentId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return false;

    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;

      if (typeEntity.members[agentId] != adminId) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1) return false;

      bytes32 roleId = typeEntity.members[agentId];
      if (roleId == bytes32(0)) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }

}
