// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRealmManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract DomainManager is AclStorage, IDomainManagement {
  using LAclStorage for DataCollection;

  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool) {
     require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");        
    (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(msg.sender);
    require(senderScopeType != ScopeType.NONE, "Access Denied");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.domainRegister.selector);
    (AgentType functionAgentType, bytes32 functionAgentId) = IFunctionManagement(address(this)).functionGetAgent(functionId);
   
    if(functionAgentType == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(functionAgentId, msg.sender), "Operation Not Permitted");      

    } else if (functionAgentType == AgentType.MEMBER) {
      require(msg.sender == functionAgentId, "Operation Not Permitted");
    } 
    //  for functionAgentType == AgentType.Type this function agent Id must be Agent Master Type

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[newDomainId].atype == AgentType.NONE, "Domain Already Exists");
      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Domain Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Domain Alterability");

      // add realm to domain 
      // check sender permit to add rew real to domain
      // DomainEntity storage de = _data.domainReadSlot(requests[i].domainId);
      BaseAgent globalAdminBaseAgent = _data.agents[_data.global.bs.adminId];
      if(globalAdminBaseAgent.atype == AgentType.MEMBER) {
        require(global.bs.adminId == LAclUtils.accountGenerateId(msg.sender), "Operation Not Permitted");
      } else if(globalAdminBaseAgent.atype == AgentType.ROLE) {
        require(IRoleManagement(address(this)).roleHasAccount(global.bs.adminId, msg.sender), "Operation Not Permitted");
      }  
      _data.global.domains.add(newRoleId);

      // create new realm entity
      DomainEntity storage newDomain = _data.domainWriteSlot(newDomainId);
       
      // checking requested realm admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage ba = _data.agents[requests[i].adminId];
        require(ba.atype >= AgentType.MEMBER, "Illegal Admin Realm AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        if(ba.atype != AgentType.TYPE) {
          require(ScopeType.GLOBAL == requestAdminScopeType, "Illegal Admin Scope Type");
          require(requestAdminScopeId == _data.global.id, "Illegal Admin Scope ID");
        } 
        newDomain.bs.adminId = requests[i].adminId;
      } else {
        newDomain.bs.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }
      
      newDomain.bs.stype = ScopeType.DOMAIN;
      newDomain.bs.acstat = requests[i].acstat;
      newDomain.bs.alstat = requests[i].alstat;
      newDomain.bs.adminId = requests[i].adminId;
      newDomain.bs.typelimit = requests[i].typeLimit;
      newDomain.name = requests[i].name;
      newDomain.domainId = requests[i].domainId;
      newDomain.realmLimit = requests[i].realmLimit;
      
      emit DomainRegistered(
        msg.sender,
        newDomainId,
        requests[i].adminId,
        requests[i].realmLimit,
        requests[i].typeLimit,
        _data.agents[requests[i].adminId].atype,
        requests[i].acstat,
        requests[i].alstat,
        requests[i].name
      );
    }
  }
 
  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.domainUpdateActivityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {      
      require(_data.scopes[requests[i].id].stype == ScopeType.DOMAIN, "Invalid Realm ID Slot");
      require(_data.scopes[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

      // check admin function
      require(_doDomainCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      _data.scopes[requests[i].id].acstat = requests[i].acstat;
      emit DomainActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.domainUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doDomainCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.DOMAIN, "Invalid Domain ID Slot");
      _data.scopes[requests[i].id].alstat = requests[i].alstat;
      emit DomainAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateAdmin.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");
      require(_doDomainCheckAdminAccount(requests[i].id, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {                
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER, "Illegal Admin Domain AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(requests[i].adminId);
        require(ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(ScopeType.DOMAIN == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope ID");
        } else {
          require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope ID");
        }
        domainEntity.bs.adminId = requests[i].adminId;

      } else {
        domainEntity.bs.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit DomainAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function domainUpdateRealmLimit(bytes32 domainId, uint16 realmLimit) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.domainUpdateRealmLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doDomainCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      require(_data.scopes[requests[i].id].stype == ScopeType.DOMAIN, "Invalid Function ID Slot");
      domainEntity.realmLimit = requests[i].realmLimit;
      emit DomainContextLimitUpdated(msg.sender, requests[i].id, requests[i].realmLimit);
    }
    return true;
  }

  function domainUpdateTypeLimit(ScopeUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.domainUpdateTypeLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin function
      require(_doDomainCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");
      require(_data.scopes[requests[i].id].stype == ScopeType.DOMAIN, "Invalid Domain ID Slot");
      _data.scopes[requests[i].id].typeLimit = requests[i].typeLimit;
      emit DomainTypeLimitUpdated(msg.sender, requests[i].id, requests[i].typeLimit);
    }
    return true;
  }

  function domainCheckId(bytes32 domainId) external view returns (bool) {
    return _data.scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function domainCheckName(string calldata domainName) external view returns (bool) {
    return _data.scopes[LAclUtils.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool) {
    return _doDomainCheckAdmin(domainId, account);
  }

  function _doDomainCheckAdmin(bytes32 domainId, address account) internal view returns (bool) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    
    bytes32 domainAdminId = de.bs.adminId;
    bytes32 memberId = LAclUtils.accountGenerateId(account);
    AgentType adminAgentType = _data.agents[domainAdminId].atype;
    if(adminAgentType == AgentType.MEMBER) {
      return memberId == domainAdminId;

    } else if(adminAgentType == AgentType.ROLE || adminAgenType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), memberId);
    } 
  
    return false;
  }


  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(fe.contextId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool) {
    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(fe.contextId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.containts(realmId);
  }

  function domainGetName(bytes32 domainId) external view returns (string memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.name;
  }

  function domainGetRealmLimit(bytes32 domainId) external view returns (uint16) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realmLimit;
  }

  function domainGetAdmin(bytes32 domainId) external view returns (AgentType, bytes32) {
    return (_data.agents[_data.scopes[domainId].adminId].atype, _data.scopes[domainId].adminId);    
  }

  function domainGetActivityStatus(bytes32 domainId) external view returns (ActivityStatus) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.bs.acstat;
  }

  function gomainGetAlterabilityStatus(bytes32 domainId) external view returns (AlterabilityStatus) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.bs.alstat;
  }

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.values();
  }

  function domainGetRealmsCount(bytes32 domainId) external view returns (uint16) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.length();
  }

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) {
      return DomainInfo ({
        adminId: bytes32(0),
        realmLimit: 0,
        typeLimit: 0,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE, 
        alstate: AlterabilityStatus,
        name: ""
      });
    } 

    return DomainInfo ({
      adminId: de.bs.adminId,
      realmLimit: de.realmLimit,
      typeLimit: de.bs.typeLimit,
      adminType: _data.agents[de.adminId].atype,  
      acstat: de.bs.acstat,
      alstate: de.bs.alstat,
      name: de.name
    });
  }
}