// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRealmManagement.sol";
import "./IGlobalManagement.sol";
import "../IAccessControl.sol";
import "../AclStorage.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Global Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract GlobalManager is AclStorage, IGlobalManagement {
  using LAclStorage for DataCollection;

  function globalUpdateActivityStatus(ActivityStatus acstat) external returns (ActivityStatus) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.globalUpdateActivityStatus.selector), "Access Denied");
    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

    // check admin function
    require(_doGlobalCheckAdmin(msg.sender), "Operation Not Permitted");

    _data.global.bs.acstat = acstat;
    emit GlobalActivityUpdated(msg.sender, _data.global.id, _data.global.bs.acstat);
    
    return true;
  }

  function globalUpdateAlterabilityStatus(AlterabilityStatus alstat) external returns (AlterabilityStatus) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.globalUpdateAlterabilityStatus.selector), "Access Denied");

    // check admin function
    require(_doGlobalCheckAdmin(msg.sender), "Operation Not Permitted");

    _data.global.bs.alstat = alstat;
    emit GlobalAlterabilityUpdated(msg.sender, _data.global.id, _data.global.bs.acstat);
    
    return true;
  }

  function globalUpdateAdmin(bytes32 newAdminId) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.realmUpdateAdmin.selector), "Access Denied");
    
    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Global");
    require(_doGlobalCheckAdminAccount(msg.sender), "Operation Not Permitted");
    require(newAdminId != bytes32(0), "Illegal Update Admin ID ");
    BaseAgent storage adminBaseAgent = _data.agents[newAdminId];
    require(adminBaseAgent.atype >= AgentType.MEMBER, "Illegal Admin Global AgentType");
    (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfScopeMasterType(newAdminId);
    // require(ScopeType.GLOBAL == requestAdminScopeType, "Illegal Admin Scope Type");
    require(requestAdminScopeId == _data.global.id, "Illegal Amind Scope ID");      
    _data.global.bs.adminId = newAdminId;

    emit GlobalAdminUpdated(msg.sender, _data.global.id,  _data.global.bs.adminId);    
    return true;
  }

  function globalUpdateDomainLimit(uint16 domainLimit) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.globalUpdateDomainLimit.selector), "Access Denied");
    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

    // check admin function
    require(_doGlobalCheckAdmin(msg.sender), "Operation Not Permitted");

    _data.global.domainLimit = domainLimit;
    emit GlobalDomainLimitUpdated(msg.sender, _data.global.id, domainLimit);    
    return true;
  }

  function globalUpdateTypeLimit(uint16 typeLimit) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.globalUpdateTypeLimit.selector), "Access Denied");
    require(_data.global.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Function");

    // check admin function
    require(_doGlobalCheckAdmin(msg.sender), "Operation Not Permitted");

    _data.global.bs.typelimit = typeLimit;
    emit GlobalTypeLimitUpdated(msg.sender, _data.global.id, typeLimit);
    return true;
  }

  function globalCheckAdmin(address account) external view returns (bool) {
    return _doGlobalCheckAdmin(account);
  }

  function _doGlobalCheckAdmin(address account) internal view returns (bool) {    
    bytes32 globalAdminId = _data.global.bs.adminId;
    bytes32 memberId = LAclUtils.accountGenerateId(account);
    AgentType adminAgentType = _data.agents[globalAdminId].atype;
    if(adminAgentType == AgentType.MEMBER) {
      return memberId == globalAdminId;

    } else if(adminAgentType == AgentType.ROLE || adminAgentType == AgentType.TYPE) {
      return ITypeManagement(address(this)).typeHasMember(IAccessControl(address(this)).getScopeMasterTypeId(), memberId);
    } 
  
    return false;
  }

  function globalGetDomainLimit() external view returns (uint16) {
    return _data.global.domainLimit;
  }

  function globalGetAdmin() external view returns (bytes32, AgentType) {
    return (_data.agents[_data.global.bs.adminId].atype, _data.global.bs.adminId);   
  }

  function globalGetActivityStatus() external view returns (ActivityStatus) {
    return _data.global.bs.acstat;
  }

  function globalGetAlterabilityStatus() external view returns (AlterabilityStatus) {
    return _data.global.bs.alstat;
  }

  function globalGetDomains() external view returns (bytes32[] memory) {
    return _data.global.domains.values();
  }

  function globalGetDomainsCount() external view returns (uint16) {
    return _data.global.domains.length();
  }

  function globalGetInfo() external view returns (GlobalInfo memory) {
    return GlobalInfo ({
      id: _data.global.id,
      adminId: _data.global.bs.adminId,
      realmLimit: _data.global.realmLimit,
      typeLimit: _data.global.bs.typeLimit,
      adminType: _data.agents[_data.global.bs.adminId].atype,
      acstat: _data.global.bs.acstat,
      alstate: _data.global.bs.alstat
    });
  }
}