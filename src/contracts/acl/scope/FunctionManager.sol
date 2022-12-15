// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Function Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract FunctionManager is AclStorage, IFunctionManagement {
  using LAclStorage for DataCollection;

  function functionUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool){
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.functionUpdateAdmin.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      FunctionEntity storage functionEntity = _data.functionReadSlot(requests[i].id);
      require(functionEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");
      require(_doFunctionCheckAdminAccount(requests[i].id, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {                
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER && adminBaseAgent.atype <= AgentType.ROLE, "Illegal Admin Function AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        require(ScopeType.FUNCTION <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(ScopeType.FUNCTION == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, requests[i].id), "Illegal Admin Scope ID");
        }
        functionEntity.bs.adminId = requests[i].adminId;

      } else {
        functionEntity.bs.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit FunctionAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function functionUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.functionUpdateActivityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {      
      require(_data.scopes[requests[i].id].stype == ScopeType.FUNCTION, "Invalid Function ID Slot");
      require(_data.scopes[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

      // check admin function
      require(_doFunctionCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      _data.scopes[requests[i].id].acstat = requests[i].acstat;
      emit FunctionActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function functionUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.functionUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doFunctionCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.FUNCTION, "Invalid Function ID Slot");
      _data.scopes[requests[i].id].alstat = requests[i].alstat;
      emit FunctionAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.functionUpdatePolicy.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doFunctionCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      FunctionEntity storage fe = _data.functionReadSlot(requests[i].id);
      require(fe.bs.stype == ScopeType.FUNCTION, "Invalid Function ID Slot");
      fe.policy = requests[i].policy;
      emit FunctionPolicyUpdated(msg.sender, requests[i].id, requests[i].policy);
    }
    return true;
  }

  function functionUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.functionUpdateTypeLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doFunctionCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.FUNCTION, "Invalid Function ID Slot");
      _data.scopes[requests[i].id].typeLimit = requests[i].typeLimit;
      emit FunctionTypeLimitUpdated(msg.sender, requests[i].id, requests[i].typeLimit);
    }
    return true;
  }

  function functionCheckId(bytes32 functionId) external view returns (bool) {    
    return _data.scopes[functionId].stype == ScopeType.FUNCTION;
  }

  function functionCheckSelector(address contractId, bytes4 selector) external view returns (bool) {
    return _data.scopes[LAclUtils.functionGenerateId(contractId, selector)].stype == ScopeType.FUNCTION;
  }

  // function functionCheckAdmin(bytes32 functionId, bytes32 agentId) external view returns (bool) {
  //   return _doFunctionCheckAdmin(functionId, agentId);
  // }

  // function _doFunctionCheckAdmin(bytes32 functionId, bytes32 agentId) internal view returns (bool) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functoinId);
  //   if(!result) return false;
  //   BaseAgent storage ba = _data.agents[fe.bs.adminId];
  //   if(ba.atype == AgentType.NONE) return false;
  //   else if (ba.atype == AgentType.MEMBER) return agentId == fe.bs.adminId;
  //   else if (ba.atype == AgentType.ROLE || ba.atype == AgentType.TYPE) 
  //     return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), agentId);
  //   else return false;
  // }

  function functionCheckAdminAccount(bytes32 functionId, address account) external view returns (bool) {
    return _doFunctionCheckAdminAccount(functionId, account);
  }

  function _doFunctionCheckAdminAccount(bytes32 functionId, address account) internal view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;  
    
    bytes32 functionAdminId = fe.bs.adminId;
    bytes32 memberId = keccak256(abi.encodePacked(account));
    AgentType adminAgentType = _data.agents[functionAdminId].atype;
    if(adminAgenType == AgentType.MEMBER) {
      return memberId == functionAdminId;

    } else if(adminAgenType == AgentType.ROLE || adminAgenType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), memberId);
    } 
  
    return false;
  }

  // function functionCheckAgent(bytes32 functionId, bytes32 agentId) external view returns (bool) {
  //   return _doFunctionCheckAgent(functionId, agentId);
  // }

  // function _doFunctionCheckAgent(bytes32 functionId, bytes32 agentId) internal view returns (bool) {
  //   (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functoinId);
  //   if(!result) return false;
  //   BaseAgent storage ba = _data.agents[fe.agentId];
  //   if (ba.atype == AgentType.MEMBER) return agentId == fe.agentId;
  //   else if (ba.atype == AgentType.ROLE) {
  //     (RoleEntity storage re, bool result1) = _data.roleTryReadSlot(roleId);
  //     if(!result1) return false;
  //     return ITypeManagement(address(this)).typeHasMember(re.typeId, memberId);
  //     return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), agentId);
  //   }
  //   else return false;
  // }

  function functionCheckAgentAccount(bytes32 functionId, address account) external view returns (bool) {
    return _doFunctionCheckAgentAccount(functionId, account);
  }

  function _doFunctionCheckAgentAccount(bytes32 functionId, address account) internal view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;  
    
    bytes32 memberId = keccak256(abi.encodePacked(account));
    AgentType functionAgentType = _data.agents[fe.agentId].atype;
    if(functionAgentType == AgentType.MEMBER) {
      return memberId == fe.agentId;

    } else if(functionAgentType == AgentType.ROLE) {
      (RoleEntity storage re, bool result1) = _data.roleTryReadSlot(roleId);
      if(!result1) return false;
      return ITypeManagement(address(this)).typeHasMember(re.typeId, memberId);

    } else if(functionAgentType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(functionAgentId, memberId);
    }
  
    return false;
  }

  function functionGetAdmin(bytes32 functionId) external view returns (AgentType, bytes32) {
    return (_data.agents[_data.scopes[functionId].adminId].atype, _data.scopes[functionId].adminId);
  }

  function functionGetAgent(bytes32 functionId) external view returns (AgentType, bytes32) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return (AgentType.NONE, bytes32(0));
    return (_data.agents[fe.agentId].atype, fe.agentId);
  }

  function functionGetContext(bytes32 functionId) external view returns (bytes32) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return bytes32(0);
    return fe.contextId;
  }

  function functionGetActivityStatus(bytes32 functionId) external view returns (ActivityStatus) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return ActivityStatus.NONE;
    return fe.bs.acstat;
  }

  function functionGetAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return AlterabilityStatus.NONE;
    return fe.bs.alstat;
  }

  function functionGetSelector(bytes32 functionId) external view returns (bytes4) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return bytes4(0);
    return fe.selector;
  }

  function functionGetPolicy(bytes32 functionId) external view returns (bool, uint8) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return (false, 0);
    return (true, fe.policyCode);
  }

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) { 
      return FunctionInfo({
        adminId: bytes32(0),
        agentId: bytes32(0),
        contextId: bytes32(0),
        selector: bytes4(0),
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        adminType: AgentType.NONE,
        agentType: AgentType.NONE, 
        policyCode: 0
      });
    }

    return FunctionInfo({
      adminId: fe.bs.adminId,
      agentId: fe.agentId,
      contextId: fe.contextId,
      selector: fe.selector,
      acstat: fe.bs.acstat,
      alstat: fe.bs.alstat,
      adminType: _data.agents[fe.bs.adminId].atype,
      agentType: _data.agents[fe.agentId].atype, 
      policyCode: fe.policyCode
    });
  }

  function functionGenerateId(address contractId, bytes4 selector) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(contractId, selector));
  }

  // function functionCreateFacetRegisterRequest() public returns (FacetRegisterRequest memory) {}

  // function functionCreateContextRegisterFacetRequest() public returns (IContextManagement.ContextRegisterFunctionRequest memory) {}

  
}