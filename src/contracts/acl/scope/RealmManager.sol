// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../ACLStorage.sol";
import "./IRealmManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Realm Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */ 
contract RealmManager is ACLStorage, BaseUUPSProxy, IRealmManagement {  
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
      interfaceId == type(IRealmManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }


  function realmRegister(RealmRegisterRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRealmManagement.realmRegister.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(memberEntity.limits.realmRegisterLimit - uint16(requests.length) > 0, "Illegal RegisterLimit");
    memberEntity.limits.realmRegisterLimit -= uint16(requests.length);

    // fetch scope type and scope id of sender
    (ScopeType memberScopeType, bytes32 memberScopeId) = _doGetMemberScopeInfoFromType(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID, senderId);    
    
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRealmId = LACLUtils.generateId(requests[i].name);
      require(_data.scopes[newRealmId].stype == ScopeType.NONE, "Already Exist");
      require(
        requests[i].acstat > ActivityStatus.DELETED && 
        requests[i].alstat > AlterabilityStatus.NONE,
        "Illegal Activity/Alterability"
      );

      // check sender scopes
      require(memberScopeType >= ScopeType.DOMAIN, "Illegal ScopeType");
      if(memberScopeType == ScopeType.DOMAIN) {
        require(memberScopeId == requests[i].domainId, "Illegal Domain Scope");

      } else {
        require(memberScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Global Scope");
      }

      DomainEntity storage domainEntity = _data.domainReadSlot(requests[i].domainId);
      require(domainEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Domain Updatable");
      require(domainEntity.realmLimit > domainEntity.realms.length(), "Illegal Register");

      // check access admin realm
      require(_doCheckAdminAccess(domainEntity.bs.adminId, senderId, functionId), "Forbidden");

      // add to domain
      domainEntity.realms.add(newRealmId);

      // create new realm entity
      RealmEntity storage newRealm = _data.realmWriteSlot(newRealmId);
      newRealm.bs.stype = ScopeType.REALM;
      newRealm.bs.acstat = requests[i].acstat;
      newRealm.bs.alstat = requests[i].alstat;
      newRealm.bs.adminId = requests[i].adminId;
      newRealm.name = requests[i].name;
      newRealm.domainId = requests[i].domainId;
      newRealm.contextLimit = memberEntity.limits.contextLimit;
      newRealm.bs.adminId = _getRealmAdmin(domainEntity.bs.adminId, requests[i].domainId, requests[i].adminId);
       
      emit RealmRegistered(
        msg.sender,
        newRealmId,
        requests[i].domainId,
        requests[i].adminId
      );
    }

    return true;
  }

  function realmUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRealmManagement.realmUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    for(uint i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {        
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(requests[i].adminId);
        require(ScopeType.REALM <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.REALM == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].id, "Illegal Amind Scope");
        } else {
          require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].id), "Illegal Admin Scope");
        }
        realmEntity.bs.adminId = requests[i].adminId;

      } else {
        realmEntity.bs.adminId = _data.scopes[realmEntity.domainId].adminId;
      }

      emit RealmAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function realmUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRealmManagement.realmUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);      
      require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
      require(_doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId), "Forbidden");    
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");  
      realmEntity.bs.acstat = requests[i].acstat;
    emit RealmActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function realmUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRealmManagement.realmUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    for(uint i = 0; i < requests.length; i++) {      
      RealmEntity storage realmEntity = _data.realmReadSlot(requests[i].id);
      require(_doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId), "Forbidden");    
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      realmEntity.bs.alstat = requests[i].alstat;
      emit RealmAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;  
  }

  function realmUpdateContextLimit(RealmUpdateContextLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IRealmManagement.realmUpdateContextLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for (uint256 i = 0; i < requests.length; i++) {
      RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].realmId, senderId, functionId);
      require(requests[i].contextLimit > realmEntity.contexts.length(), "Illegal Limit");
      realmEntity.contextLimit = requests[i].contextLimit;      
      emit RealmContextLimitUpdated(msg.sender, requests[i].realmId, requests[i].contextLimit);
    }
    return true;
  }

  // function realmUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool) {
  //    bytes32 functionId = _accessPermission(IRealmManagement.realmUpdateAgentLimit.selector);
  //   bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
  //   for (uint256 i = 0; i < requests.length; i++) {
  //     RealmEntity storage realmEntity = _doGetEntityAndCheckAdminAccess(requests[i].scopeId, senderId, functionId);
  //     require(requests[i].agentLimit > realmEntity.bs.referredByAgent, "Illegal Limit");
  //     realmEntity.bs.agentLimit = requests[i].agentLimit;
  //     emit RealmAgentLimitUpdated(msg.sender, requests[i].scopeId, requests[i].agentLimit);
  //   }
  //   return true;
  // }

  function realmCheckId(bytes32 realmId) external view returns (bool) {
    return _data.scopes[realmId].stype == ScopeType.REALM;
  }

  function realmCheckName(string calldata realmName) external view returns (bool) {
    return _data.scopes[LACLUtils.generateId(realmName)].stype == ScopeType.REALM;
  }

   function realmCheckAdmin(bytes32 realmId, address account) external view returns (bool) {
    (RealmEntity storage realmEntity, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) return false;  

    bytes32 realmAdminId = realmEntity.bs.adminId;
    AgentType agentType = _data.agents[realmAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      return _doRoleHasMember(realmAdminId, memberId);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(realmAdminId);
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

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if (!result) return new bytes32[](0);
    return re.contexts.values();
  }

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory) {
    (RealmEntity storage re, bool result) = _data.realmTryReadSlot(realmId);
    if(!result) {
      return RealmInfo ({
        domainId: bytes32(0),
        adminId: bytes32(0),
        contextLimit: 0, 
        contextCount: 0,
        agentLimit: 0,
        referredByAgent: 0,
        stype: ScopeType.NONE,
        acstat: ActivityStatus.NONE, 
        alstat: AlterabilityStatus.NONE, 
        adminType: AgentType.NONE,
        name: ""
      });
    }

    return RealmInfo ({
      domainId: re.domainId,
      adminId: re.bs.adminId,
      contextLimit: re.contextLimit, 
      contextCount: uint32(re.contexts.length()),
      agentLimit: re.bs.agentLimit,
      referredByAgent: re.bs.referredByAgent,   
      stype: re.bs.stype,
      acstat: re.bs.acstat, 
      alstat: re.bs.alstat, 
      adminType: _data.agents[re.bs.adminId].atype,
      name: re.name
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

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 realmId, bytes32 senderId, bytes32 functionId) internal view returns (RealmEntity storage) {
    RealmEntity storage realmEntity = _data.realmReadSlot(realmId);
    require(realmEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    require(_doCheckAdminAccess(realmEntity.bs.adminId, senderId, functionId), "Forbidden");    
    return realmEntity;
  }  

  function _doGetMemberScopeInfoFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {
    TypeEntity storage agentAdminType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentAdminType.members[senderId];
    RoleEntity storage memberAgentRole =  _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  } 

  function _getRealmAdmin(bytes32 requestScopeAdmin, bytes32 domainId, bytes32 adminId) internal view returns (bytes32 realmAdminId) {
     // checking requested context admin 
    if(adminId != bytes32(0)) {
      require(_data.agents[adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");

      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(adminId);
      require(ScopeType.DOMAIN <= requestAdminScopeType, "Illegal Admin ScopeType");
      if(ScopeType.DOMAIN == requestAdminScopeType){
        require(requestAdminScopeId == domainId, "Illegal Amind Scope");

      } else {
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
      }
      realmAdminId = adminId;

    } else {
      realmAdminId = requestScopeAdmin;
    }
  }
}