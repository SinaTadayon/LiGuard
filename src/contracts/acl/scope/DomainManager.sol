// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IDomainManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../ACLStorage.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";

/**
 * @title Domain Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract DomainManager is ACLStorage, BaseUUPSProxy, IDomainManagement {
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
      interfaceId == type(IDomainManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by account that member of VERSE SCOPE MASTER TYPE
  function domainRegister(DomainRegisterRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId,bytes32 senderId) = _accessPermission(IDomainManagement.domainRegister.selector);
    
    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(int16(uint16(memberEntity.limits.domainRegisterLimit)) - int8(uint8(requests.length)) >= 0, "Illegal RegisterLimit");
    memberEntity.limits.domainRegisterLimit -= uint8(requests.length);    

    // fetch scope type and scope id of sender
    bytes32 senderScopeId = _doGetMemberScopeInfoFromType(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID, senderId);    
   
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newDomainId = LACLUtils.generateId(requests[i].name);
      require(_data.scopes[newDomainId].stype == ScopeType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // check sender scopes
      GlobalEntity storage livelyGlobalEntity = _data.globalReadSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
      require(senderScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Global Scope");
      require(livelyGlobalEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Global Updatable");
      require(livelyGlobalEntity.domainLimit > livelyGlobalEntity.domains.length(), "Illegal Register");

      // check access admin global
      IACL.AdminAccessStatus status = _doCheckAdminAccess(livelyGlobalEntity.bs.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      // add domain to global
      livelyGlobalEntity.domains.add(newDomainId);

      // create new domain entity
      DomainEntity storage newDomain = _data.domainWriteSlot(newDomainId);
      newDomain.bs.stype = ScopeType.DOMAIN;
      newDomain.bs.acstat = requests[i].acstat;
      newDomain.bs.alstat = requests[i].alstat;      
      newDomain.name = requests[i].name;
      newDomain.realmLimit = requests[i].realmLimit >= 0 ? uint16(uint24(requests[i].realmLimit)) : memberEntity.limits.realmLimit;
       
      // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
        newDomain.bs.adminId = requests[i].adminId;
      } else {
        newDomain.bs.adminId = livelyGlobalEntity.bs.adminId;
      }
            
      emit DomainRegistered(
        msg.sender,
        newDomainId,
        requests[i].adminId
      );
    }

    return true;
  }
 
  function domainUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
   (bytes32 functionId, bytes32 senderId) = _accessPermission(IDomainManagement.domainUpdateActivityStatus.selector);

    for(uint i = 0; i < requests.length; i++) {
     DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId); 
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      domainEntity.bs.acstat = requests[i].acstat;
      emit DomainActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function domainUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IDomainManagement.domainUpdateAlterabilityStatus.selector);
    
    for(uint i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].id);
      IACL.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      domainEntity.bs.alstat = requests[i].alstat;
      emit DomainAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function domainUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IDomainManagement.domainUpdateAdmin.selector);
    
    for(uint i = 0; i < requests.length; i++) {
     DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId); 
   
     // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
        domainEntity.bs.adminId = requests[i].adminId;
      } else {
        domainEntity.bs.adminId = _data.scopes[_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID].adminId;
      }

      emit DomainAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function domainMoveRealm(DomainMoveRealmRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IDomainManagement.domainMoveRealm.selector);

    for(uint i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity = _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId);
      require(domainEntity.realms.contains(requests[i].realmId), "Domain Realm Not Found");
      DomainEntity storage targetDomainEntity = _doGetEntityAndCheckAdminAccess(requests[i].targetDomainId, senderId, functionId);
      RealmEntity storage realmEntity = _doGetRealmEntityAndCheckAdminAccess(requests[i].realmId, senderId, functionId);
      require(targetDomainEntity.realmLimit > targetDomainEntity.realms.length(), "Illegal Move" );
      domainEntity.realms.remove(requests[i].realmId);
      targetDomainEntity.realms.add(requests[i].realmId);
      realmEntity.domainId = requests[i].targetDomainId;
      emit DomainRealmMoved(msg.sender, requests[i].domainId, requests[i].realmId, requests[i].targetDomainId);
    }
    return true;
  }

  function domainUpdateRealmLimit(DomainUpdateRealmLimitRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IDomainManagement.domainUpdateRealmLimit.selector);

    for (uint256 i = 0; i < requests.length; i++) {
      DomainEntity storage domainEntity =  _doGetEntityAndCheckAdminAccess(requests[i].domainId, senderId, functionId); 
      require(requests[i].realmLimit > domainEntity.realms.length(), "Illegal Limit");
      domainEntity.realmLimit = requests[i].realmLimit;      
      emit DomainRealmLimitUpdated(msg.sender, requests[i].domainId, requests[i].realmLimit);
    }
    return true;
  }

  function domainCheckId(bytes32 domainId) external view returns (bool) {
    return _data.scopes[domainId].stype == ScopeType.DOMAIN;
  }

  function domainCheckName(string calldata domainName) external view returns (bool) {
    return _data.scopes[LACLUtils.generateId(domainName)].stype == ScopeType.DOMAIN;
  }

  function domainCheckAdmin(bytes32 domainId, address account) external view returns (bool) {
    (DomainEntity storage domainEntity, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  

    bytes32 domainAdminId = domainEntity.bs.adminId;
    AgentType agentType = _data.agents[domainAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(domainAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(domainAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function _doRoleHasMember(bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }


  function domainHasFunction(bytes32 domainId, bytes32 functionId) external view returns (bool) {
    (FunctionEntity storage fe, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return false;

    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(fe.contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasContext(bytes32 domainId, bytes32 contextId) external view returns (bool) {
    (ContextEntity storage ce, bool result1) = _data.contextTryReadSlot(contextId);
    if(!result1) return false;

    (RealmEntity storage re, bool result2) = _data.realmTryReadSlot(ce.realmId);
    if(!result2) return false;

    return re.domainId == domainId;
  }

  function domainHasRealm(bytes32 domainId, bytes32 realmId) external view returns (bool) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return false;  
    return de.realms.contains(realmId);
  }

  function domainGetRealms(bytes32 domainId) external view returns (bytes32[] memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) return new bytes32[](0);
    return de.realms.values();
  }

  function domainGetInfo(bytes32 domainId) external view returns (DomainInfo memory) {
    (DomainEntity storage de, bool result) = _data.domainTryReadSlot(domainId);
    if(!result) {
      return DomainInfo ({
        adminId: bytes32(0),
        realmLimit: 0,
        realmCount: 0,
        referredByAgent: 0,
        stype: ScopeType.NONE,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE,
        name: ""
      });
    } 

    return DomainInfo ({
      adminId: de.bs.adminId,
      realmLimit: de.realmLimit,
      realmCount: uint16(de.realms.length()),
      referredByAgent: de.bs.referredByAgent,
      adminType: _data.agents[de.bs.adminId].atype,  
      stype: de.bs.stype,
      acstat: de.bs.acstat,
      alstat: de.bs.alstat,
      name: de.name
    });
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

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      return  roleEntity.scopeId;

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);  
  }
  
  function _accessPermission(bytes4 selector) internal returns (bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId);
  }  

  function _doGetEntityAndCheckAdminAccess(bytes32 domainId, bytes32 senderId, bytes32 functionId) internal view returns (DomainEntity storage) {
    DomainEntity storage domainEntity = _data.domainReadSlot(domainId); 
    require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return domainEntity;
  }

  function _doGetRealmEntityAndCheckAdminAccess(bytes32 realmId, bytes32 senderId, bytes32 functionId) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = _data.realmReadSlot(realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Realm Updatable");    
    IACL.AdminAccessStatus status = _doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);  
    return realmEntity;
  }  

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole =  _data.roleReadSlot(memberRoleId);
    return memberAgentRole.scopeId;
  } 
}