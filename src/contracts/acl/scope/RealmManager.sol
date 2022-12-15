// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IRealmManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RealmManager is AclStorage, IRealmManagement {
  using LAclStorage for DataCollection;

  function realmRegister(RealmRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");        
    (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(msg.sender);
    require(senderScopeType != ScopeType.NONE, "Access Denied");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.realmRegister.selector);
    (AgentType functionAgentType, bytes32 functionAgentId) = IFunctionManagement(address(this)).functionGetAgent(functionId);
   
    if(functionAgentType == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(functionAgentId, msg.sender), "Operation Not Permitted");      

    } else if (functionAgentType == AgentType.MEMBER) {
      require(msg.sender == functionAgentId, "Operation Not Permitted");
    } 
    //  for functionAgentType == AgentType.Type this function agent Id must be Agent Master Type

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRealmId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[newRealmId].atype == AgentType.NONE, "Realm Already Exists");
      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Realm Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Reealm Alterability");

      // add realm to domain 
      // check sender permit to add rew real to domain
      DomainEntity storage de = _data.domainReadSlot(requests[i].domainId);
      BaseAgent domainAdminBaseAgent = _data.agents[de.bs.adminId];
      if(domainAdminBaseAgent.atype == AgentType.MEMBER) {
        require(de.bs.adminId == LAclUtils.accountGenerateId(msg.sender), "Operation Not Permitted");
      } else if(domainAdminBaseAgent.atype == AgentType.ROLE) {
        require(IRoleManagement(address(this)).roleHasAccount(de.bs.adminId, msg.sender), "Operation Not Permitted");
      }  
      de.realms.add(newRealmId);

      // create new realm entity
      RealmEntity storage newRealm = _data.realmWriteSlot(newRealmId);
       
      // checking requested realm admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage ba = _data.agents[requests[i].adminId];
        require(ba.atype >= AgentType.MEMBER, "Illegal Admin Realm AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        if(ba.atype != AgentType.TYPE) {
          require(ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(ScopeType.DOMAIN == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].domainId, "Illegal Admin Scope ID");
          } else {
            require(requestAdminScopeId == _data.global.globalId, "Illegal Admin Scope ID");
          }
        } 
        newRole.ba.adminId = requests[i].adminId;
      } else {
        newRole.ba.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }
      
      newRealm.bs.stype = ScopeType.REALM;
      newRealm.bs.acstat = requests[i].acstat;
      newRealm.bs.alstat = requests[i].alstat;
      newRealm.bs.adminId = requests[i].adminId;
      newRealm.bs.typelimit = requests[i].typeLimit;
      newRealm.name = requests[i].name;
      newRealm.domainId = requests[i].domainId;
      newRealm.contextLimit = requests[i].contextLimit;
      
      emit RealmRegistered(
        msg.sender,
        newRealmId,
        requests[i].domainId,
        requests[i].adminId,
        requests[i].name,
        requests[i].contextLimit,
        requests[i].typeLimit,
        _data.agents[requests[i].adminId].atype,
        requests[i].acstat,
        requests[i].alstat
      );
    }
  }

  function realmUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateAdmin.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");
      require(_doRealmCheckAdminAccount(requests[i].id, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {                
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER, "Illegal Admin Realm AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
        } else if (ScopeType.DOMAIN == requestAdminScopeType){
          require(requestAdminScopeId == realmEntity.domainId, "Illegal Amind Scope ID");
        } else {
          require(requestAdminScopeId == _data.global.globalId, "Illegal Amind Scope ID");
        }
        realmEntity.bs.adminId = requests[i].adminId;

      } else {
        realmEntity.bs.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit RealmAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }
 
  function realmUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateActivityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {      
      require(_data.scopes[requests[i].id].stype == ScopeType.REALM, "Invalid Realm ID Slot");
      require(_data.scopes[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

      // check admin function
      require(_doRealmCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      _data.scopes[requests[i].id].acstat = requests[i].acstat;
      emit RealmActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function realmUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doRealmCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.REALM, "Invalid Realm ID Slot");
      _data.scopes[requests[i].id].alstat = requests[i].alstat;
      emit RealmAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function realmUpdateContextLimit(RealmUpdateContextLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateContextLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doRealmCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(_data.scopes[requests[i].id].stype == ScopeType.REALM, "Invalid Function ID Slot");
      realmEntity.contextLimit = requests[i].contextLimit;
      emit RealmContextLimitUpdated(msg.sender, requests[i].id, requests[i].contextLimit);
    }
    return true;
  }

  function realmUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateTypeLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doRealmCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.REALM, "Invalid Function ID Slot");
      _data.scopes[requests[i].id].typeLimit = requests[i].typeLimit;
      emit RealmTypeLimitUpdated(msg.sender, requests[i].id, requests[i].typeLimit);
    }
    return true;
  }

  function realmCheckId(bytes32 realmId) external view returns (bool) {
    return _data.scopes[realmId].stype == ScopeType.REALM;
  }

  function realmCheckName(string calldata realmName) external view returns (bool) {
    return _data.scopes[LAclUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

  function realmCheckAdmin(bytes32 realmId, address account) external view returns (bool) {
    _doContextCheckAdmin(realmId, account);
  }

  function _doContextCheckAdmin(bytes32 realmId, address account) internal view returns (bool) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return false;  
    
    bytes32 realmAdminId = re.bs.adminId;
    bytes32 memberId = LAclUtils.accountGenerateId(account);
    AgentType adminAgentType = _data.agents[realmAdminId].atype;
    if(adminAgentType == AgentType.MEMBER) {
      return memberId == realmAdminId;

    } else if(adminAgentType == AgentType.ROLE || adminAgenType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), memberId);
    } 
  
    return false;
  }

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    return ce.realmId == realmId;
  }

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return false;  
    return re.contexts.contains(contextId);
  }

  function realmGetName(bytes32 realmId) external view returns (string memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return "";  
    return re.name;
  }

  function realmGetDomain(bytes32 realmId) external view returns (bytes32) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return bytes(0);  
    return re.domainId;
  }

  function realmGetContextLimit(bytes32 realmId) external view returns (uint16) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return 0;  
    return re.contextLimit;
  }

  function realmGetAdmin(bytes32 realmId) external view returns (bytes32, AgentType) {
     return (_data.agents[_data.scopes[realmId].adminId].atype, _data.scopes[realmId].adminId);
  }

  function realmGetActivityStatus(bytes32 realmId) external view returns (ActivityStatus) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return ActivityStatus.NONE;  
    return re.bs.acstat;
  }

  function realmGetAlterabilityStatus(bytes32 realmId) external view returns (AlterabilityStatus) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return AlterabilityStatus.NONE;  
    return re.bs.alstat;
  }

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return new bytes32[](0);  
    return re.contexts.values();
  }

  function realmGetContextsCount(bytes32 realmId) external view returns (uint32) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return 0;  
    return re.contexts.length();
  }

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) {
      return RealmInfo ({
        domainId: bytes32(0),
        adminId: bytes32(0),
        contextLimit: 0, 
        typeLimit: 0,
        acstat: ActivityStatus.NONE, 
        alstate: AlterabilityStatus.NONE, 
        adminType: AgentType.NONE,
        name: ""
      });
    } 

    return RealmInfo ({
      domainId: re.domainId,
      adminId: re.bs.adminId,
      contextLimit: re.contextLimit, 
      typeLimit: re.bs.typeLimit,
      acstat: re.bs.acstat, 
      alstate: re.bs.alstat, 
      adminType: _data.agents[re.bs.adminId].atype,
      name: ""
    });
  }
}