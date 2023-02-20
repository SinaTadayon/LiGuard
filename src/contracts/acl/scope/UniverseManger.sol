// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IUniverseManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../ACLStorage.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Universe Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract UniverseManager is ACLStorage, BaseUUPSProxy, IUniverseManagement {
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
      interfaceId == type(IUniverseManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function universeUpdateActivityStatus(MemberSignature calldata memberSign, ActivityStatus acstat) external returns (ActivityStatus) {  
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermissionActivity(memberSign, IUniverseManagement.universeUpdateActivityStatus.selector);
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);
    require(acstat > ActivityStatus.DELETED, "Illegal Activity");
    universeEntity.bs.acstat = acstat;
    emit UniverseActivityUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.acstat);    
    return acstat;
  }

  function universeUpdateAlterabilityStatus(MemberSignature calldata memberSign, AlterabilityStatus alstat) external returns (AlterabilityStatus) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(memberSign, IUniverseManagement.universeUpdateAlterabilityStatus.selector);
    
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    IACL.AdminAccessStatus status = _doCheckAdminAccess(universeEntity.bs.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    universeEntity.bs.alstat = alstat;
    emit UniverseAlterabilityUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.alstat);    
    return alstat;
  }

  function universeUpdateAdmin(MemberSignature calldata memberSign, bytes32 newAdminId) external returns (bool) { 
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(memberSign, IUniverseManagement.universeUpdateAdmin.selector);

    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);

    require(newAdminId != universeEntity.bs.adminId && newAdminId != bytes32(0), "Illegal AdminId");
    
    BaseAgent storage adminBaseAgent = _data.agents[newAdminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
      require(livelyAdminType.roles.contains(newAdminId), "Not Found");
    } else {
      require(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID == newAdminId, "Illegal Admin");
    }
    
    universeEntity.bs.adminId = newAdminId;
    emit UniverseAdminUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.adminId);
    return true;
  }

  function universeUpdateDomainLimit(MemberSignature calldata memberSign, uint16 domainLimit) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(memberSign, IUniverseManagement.universeUpdateDomainLimit.selector);
    
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);
    require(domainLimit > universeEntity.domains.length() , "Illegal Limit");
    universeEntity.domainLimit = domainLimit;    
    emit UniverseDomainLimitUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, domainLimit);    
    return true;
  }

  function universeCheckAdmin(address account) external view returns (bool) {
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    return livelyAdminType.members[memberId] != bytes32(0);  
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function universeGetDomains() external view returns (bytes32[] memory) {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    return universeEntity.domains.values();
  }

  function universeGetInfo() external view returns (UniverseInfo memory) {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);    
    return UniverseInfo ({            
      id: _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
      adminId: universeEntity.bs.adminId,
      domainLimit: universeEntity.domainLimit,
      domainCount: uint16(universeEntity.domains.length()),
      referredByAgent: universeEntity.bs.referredByAgent,
      stype:  universeEntity.bs.stype,
      adminType: _data.agents[universeEntity.bs.adminId].atype,
      acstat: universeEntity.bs.acstat,      
      alstat: universeEntity.bs.alstat
    });
  }

  function _accessPermissionActivity(MemberSignature calldata memberSign, bytes4 selector) internal returns (bytes32, bytes32, address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");  
    address signer;

    if(memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(signer);   
    IACL.AuthorizationStatus status = _doHasAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId, signer);
  }

  function _accessPermission(MemberSignature calldata memberSign, bytes4 selector) internal returns (bytes32, bytes32, address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");  
    address signer;

    if(memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 senderId, bytes32 functionId) internal view returns (UniverseEntity storage) {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    require(universeEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IACL.AdminAccessStatus status = _doCheckAdminAccess(universeEntity.bs.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return universeEntity;
  }

  function _doHasAccess(bytes32 functionId, bytes32 memberId) internal returns (IACL.AuthorizationStatus) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if(!result) return IACL.AuthorizationStatus.FUNCTION_NOT_FOUND;
    bytes32 agentId = functionEntity.agentId;
    AgentType atype = _data.agents[agentId].atype;

    if(atype == AgentType.ROLE) {
      // check member activation
      (MemberEntity storage memberEntity, bool result0) = _data.memberTryReadSlot(memberId);
      if(!result0) return IACL.AuthorizationStatus.MEMBER_NOT_FOUND;
      if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
      if(!memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)) {         
        if(memberEntity.limits.callLimit > 0) {
          unchecked { memberEntity.limits.callLimit -= 1; }
        } else {
          return IACL.AuthorizationStatus.CALL_FORBIDDEN;
        }
      }
      
      // check role activation
      (RoleEntity storage roleEntity, bool result1) = _data.roleTryReadSlot(agentId);
      if(!result1) return IACL.AuthorizationStatus.ROLE_NOT_FOUND;      
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result2) return IACL.AuthorizationStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;
      if(_data.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != agentId) 
        return IACL.AuthorizationStatus.ROLE_SCOPE_FORBIDDEN;


      // check memberId with agentId role
      if (typeEntity.members[memberId] != agentId) return IACL.AuthorizationStatus.UNAUTHORIZED;

      // check policy activation
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[agentId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AuthorizationStatus.POLICY_FORBIDDEN;

    } else if(atype == AgentType.TYPE) {
      if(agentId == _LIVELY_VERSE_ANY_TYPE_ID) {
      (MemberEntity storage memberEntity, bool result0) = _data.memberTryReadSlot(memberId);
      if(!result0) return IACL.AuthorizationStatus.MEMBER_NOT_FOUND;
      if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
      if(!memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)) {         
        if(memberEntity.limits.callLimit > 0) {
          unchecked { memberEntity.limits.callLimit -= 1; }
        } else {
          return IACL.AuthorizationStatus.CALL_FORBIDDEN;
        }
      }

      } else if(agentId != _LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        (MemberEntity storage memberEntity, bool result0) = _data.memberTryReadSlot(memberId);
        if(!result0) return IACL.AuthorizationStatus.MEMBER_NOT_FOUND;
        if(memberEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
        if(!memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)) {         
          if(memberEntity.limits.callLimit > 0) {
            unchecked { memberEntity.limits.callLimit -= 1; }
          } else {
            return IACL.AuthorizationStatus.CALL_FORBIDDEN;
          }
        }
        
        // check type activation
        (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(agentId);
        if(!result1) return IACL.AuthorizationStatus.TYPE_NOT_FOUND;
        if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
        if(!result2) return IACL.AuthorizationStatus.ROLE_NOT_FOUND;
        if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
        if(_data.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != agentId) 
          return IACL.AuthorizationStatus.ROLE_SCOPE_FORBIDDEN;
        
        // check policy activation
        PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
        if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
          return IACL.AuthorizationStatus.POLICY_FORBIDDEN;
      } 
    } else if(atype <= AgentType.MEMBER) {
      return IACL.AuthorizationStatus.UNAUTHORIZED;
    }

    // check function activity
    if(functionEntity.bs.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    if(!res1) return IACL.AuthorizationStatus.CONTEXT_NOT_FOUND;
    if(contextEntity.bs.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    if(!res2) return IACL.AuthorizationStatus.REALM_NOT_FOUND;
    if(realmEntity.bs.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    if(!res3) return IACL.AuthorizationStatus.DOMAIN_NOT_FOUND;
    if(domainEntity.bs.acstat != ActivityStatus.ENABLED) return IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN;

    return IACL.AuthorizationStatus.PERMITTED;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}