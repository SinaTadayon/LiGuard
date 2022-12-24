// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "./IAccessControl.sol";
import "./ACLStorage.sol";
import "./IACLManager.sol";
import "./scope/IContextManagement.sol";
import "./scope/IFunctionManagement.sol";
import "./scope/IRealmManagement.sol";
import "./scope/IDomainManagement.sol";
import "./scope/IGlobalManagement.sol";
import "./agent/IMemberManagement.sol";
import "./agent/IRoleManagement.sol";
import "./agent/ITypeManagement.sol";
import "./policy/IPolicyManagement.sol";
import "../lib/struct/LEnumerableSet.sol";
import "../lib/acl/LACLStorage.sol";
import "../lib/acl/LAccessControl.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AclManager is ACLStorage, BaseUUPSProxy, IACLManager {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion
  ) public onlyProxy onlyLocalAdmin initializer {    
    LAccessControl.registerProxyFacet(_data, _implementation());
    __BASE_UUPS_init(contractName, contractVersion, address(0));
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
      interfaceId == type(IAccessControl).interfaceId ||
      interfaceId == type(IPolicyManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IRealmManagement).interfaceId ||
      interfaceId == type(IDomainManagement).interfaceId ||
      interfaceId == type(IGlobalManagement).interfaceId ||
      interfaceId == type(IMemberManagement).interfaceId ||
      interfaceId == type(IRoleManagement).interfaceId ||
      interfaceId == type(ITypeManagement).interfaceId ||      
      super.supportsInterface(interfaceId);
  }

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external onlyProxy returns (bool) {
    if(_firstInit) {
      require(_getLocalAdmin() == _msgSender(), "Caller Not Authorized");      
      _firstInit = false;
      return _doAclRegisterFacet(requests);
    } else {
      require(_hasPermission(this.aclRegisterFacet.selector), "Access Denied");
      return _doAclRegisterFacet(requests);
    }
  }

  function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      require(_data.interfaces[requests[i].interfaceId] != address(0), "Interface Already Exist");
      require(  
        requests[i].interfaceId != type(IAccessControl).interfaceId ||
        requests[i].interfaceId != type(IPolicyManagement).interfaceId ||
        requests[i].interfaceId != type(IFunctionManagement).interfaceId ||
        requests[i].interfaceId != type(IContextManagement).interfaceId ||
        requests[i].interfaceId != type(IFunctionManagement).interfaceId ||
        requests[i].interfaceId != type(IRealmManagement).interfaceId ||
        requests[i].interfaceId != type(IDomainManagement).interfaceId ||
        requests[i].interfaceId != type(IGlobalManagement).interfaceId ||
        requests[i].interfaceId != type(IMemberManagement).interfaceId ||
        requests[i].interfaceId != type(IRoleManagement).interfaceId ||
        requests[i].interfaceId != type(ITypeManagement).interfaceId, 
        "Illegal InterfaceId"
      );

      require(_data.facets.contains(requests[i].facetId), "Facet Already Exist");
      require(IERC165(requests[i].facetId).supportsInterface(requests[i].interfaceId), "Illegal Interface");
      for(uint j = 0; j < requests[i].selectors.length; j++) {
        require(_data.selectors[requests[i].selectors[j]] == address(0), "Illegal Selector");
        _data.selectors[requests[i].selectors[j]] = requests[i].facetId;
      }
      _data.facets.add(requests[i].facetId);
      emit AclFacetRegistered(_msgSender(), requests[i].facetId, requests[i].interfaceId);
    }
    return true;      
  }

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) external onlyProxy aclCheck(this.aclUpgradeFacet.selector) returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      require(_data.interfaces[requests[i].interfaceId] != address(0), "Interface Not Found");
      require(_data.facets.contains(requests[i].facetId), "Facet Not Found");

      if(requests[i].newInterfaceId != bytes4(0)) {        
        require(IERC165(requests[i].facetId).supportsInterface(requests[i].newInterfaceId), "Illegal Interface");
        delete _data.interfaces[requests[i].interfaceId];
        _data.interfaces[requests[i].newInterfaceId] = requests[i].facetId;
      }

      for(uint j = 0; j < requests[i].functions.length; j++) {
        if (requests[i].functions[j].action == ActionType.REMOVE) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] != address(0), "Selector Not Found");
            delete _data.selectors[requests[i].functions[j].selectors[z]];
            emit AclFacetFunctionUpgraded(msg.sender, requests[i].facetId, requests[i].functions[j].selectors[z], ActionType.REMOVE);
          }
        } else if (requests[i].functions[j].action == ActionType.ADD) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] == address(0), "Illegal Selector");
            _data.selectors[requests[i].functions[j].selectors[z]] = requests[i].facetId;
            emit AclFacetFunctionUpgraded(msg.sender, requests[i].facetId, requests[i].functions[j].selectors[z], ActionType.ADD);
          }
        } 
      }
      emit AclFacetUpgraded(_msgSender(), requests[i].facetId, requests[i].interfaceId, requests[i].newInterfaceId);
    }
    return true;
  }

  function aclGetFacets() public view returns (address[] memory) {
    return _data.facets.values();
  }

  function _beforeFallback() internal override view returns (address) {
    return _data.selectors[msg.sig];
  }

  function _fallback() internal override {
    address facetId = _beforeFallback();
    if(facetId == address(0)) {
      _delegate(_implementation());  
    } else {
      _delegate(facetId);
    }
  }

  function initACL(address contextManagerAddress, address functionManagerAddress) public onlyProxy onlyLocalAdmin {
    _initACLAgents();
    _initACLScopes(contextManagerAddress, functionManagerAddress);
    _firstInit = true;
  }

  function _initACLAgents() internal {

    // init Global Scope
    _data.global.id = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    _data.global.domainLimit = type(uint16).max;
    _data.global.bs.acstat = ActivityStatus.ENABLED;
    _data.global.bs.alstat = AlterabilityStatus.UPDATABLE;
    _data.global.bs.stype = ScopeType.GLOBAL;
    _data.global.bs.agentLimit = type(uint16).max;
    _data.global.bs.adminId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type       
    TypeEntity storage livelyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "LIVELY_VERSE_LIVELY_MASTER_TYPE";
    livelyMasterType.roleLimit = 3;
    livelyMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    livelyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = AgentType.TYPE;
    livelyMasterType.ba.scopeLimit = type(uint16).max;
    livelyMasterType.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
          
    // Create Lively Master Admin Role
    RoleEntity storage livelyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE";
    livelyMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    livelyMasterAdminRole.typeId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = 7;
    livelyMasterAdminRole.ba.scopeLimit = 7;
    livelyMasterAdminRole.ba.atype = AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = keccak256(abi.encode(0xA77AFA407D4E78cAEC58bA7783AF98f828b9cf36));
    MemberEntity storage livelyMasterAdminMember = _data.memberWriteSlot(livelyMasterAdminMemberId);
    livelyMasterAdminMember.typeLimit = type(uint16).max;      
    livelyMasterAdminMember.account = address(0xA77AFA407D4E78cAEC58bA7783AF98f828b9cf36);
    livelyMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;      

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Agent and Policy types
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;


    // Create System Master Type       
    TypeEntity storage systemMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    systemMasterType.name = "LIVELY_VERSE_SYSTEM_MASTER_TYPE";
    systemMasterType.roleLimit = type(uint16).max;
    systemMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    systemMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterType.ba.atype = AgentType.TYPE;
    systemMasterType.ba.scopeLimit = type(uint16).max;
    systemMasterType.ba.acstat = ActivityStatus.ENABLED;
    systemMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterType.roles.add(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

    // Create System Master Admin Role
    RoleEntity storage systemMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
    systemMasterAdminRole.name = "LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE";
    systemMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    systemMasterAdminRole.typeId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
    systemMasterAdminRole.memberLimit = 7;
    systemMasterAdminRole.ba.scopeLimit = 7;
    systemMasterAdminRole.ba.atype = AgentType.ROLE;
    systemMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    systemMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create System Master Admin Member
    bytes32 systemMasterAdminMemberId = keccak256(abi.encode(0xCB93d383638cc7B174FE2139Dec8570521Bb8118));
    MemberEntity storage systemMasterAdminMember = _data.memberWriteSlot(systemMasterAdminMemberId);
    systemMasterAdminMember.typeLimit = type(uint16).max;
    systemMasterAdminMember.types.add(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    systemMasterAdminMember.account = address(0xCB93d383638cc7B174FE2139Dec8570521Bb8118);
    systemMasterAdminMember.factoryLimit = 64;
    systemMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterAdminMember.ba.atype = AgentType.MEMBER;
    systemMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;
    
    // bind Lively Master Admin Member to Admin role
    systemMasterType.members[systemMasterAdminMemberId] = _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;


    // Create Scope Master Type       
    TypeEntity storage scopeMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    scopeMasterType.name = "LIVELY_VERSE_SCOPE_MASTER_TYPE";
    scopeMasterType.roleLimit = 3;
    scopeMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    scopeMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    scopeMasterType.ba.atype = AgentType.TYPE;
    scopeMasterType.ba.scopeLimit = type(uint16).max;
    scopeMasterType.ba.acstat = ActivityStatus.ENABLED;
    scopeMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    scopeMasterType.roles.add(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
    scopeMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;
    
    // Create Scope Master Admin Role
    RoleEntity storage scopeMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
    scopeMasterAdminRole.name = "LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE";
    scopeMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    scopeMasterAdminRole.typeId = _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
    scopeMasterAdminRole.memberLimit = 7;
    scopeMasterAdminRole.ba.scopeLimit = 7;
    scopeMasterAdminRole.ba.atype = AgentType.ROLE;
    scopeMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    scopeMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    scopeMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;          
    

    // Create Scope Master Type       
    TypeEntity storage agentMasterType = _data.typeWriteSlot(_LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
    agentMasterType.name = "LIVELY_VERSE_AGENT_MASTER_TYPE";
    agentMasterType.roleLimit = 3;
    agentMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    agentMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    agentMasterType.ba.atype = AgentType.TYPE;
    agentMasterType.ba.scopeLimit = type(uint16).max;
    agentMasterType.ba.acstat = ActivityStatus.ENABLED;
    agentMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    agentMasterType.roles.add(_LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID);
    agentMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID;

    // Create Agent Master Admin Role
    RoleEntity storage agentMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID);
    agentMasterAdminRole.name = "LIVELY_VERSE_AGNET_MASTER_ADMIN_ROLE";
    agentMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    agentMasterAdminRole.typeId = _LIVELY_VERSE_AGENT_MASTER_TYPE_ID;
    agentMasterAdminRole.memberLimit = 7;
    agentMasterAdminRole.ba.scopeLimit = 7;
    agentMasterAdminRole.ba.atype = AgentType.ROLE;
    agentMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    agentMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    agentMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    
    // Create Policy Master Type
    TypeEntity storage policyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    policyMasterType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    policyMasterType.roleLimit = 3;
    policyMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    policyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    policyMasterType.ba.atype = AgentType.TYPE;
    policyMasterType.ba.scopeLimit = type(uint16).max;
    policyMasterType.ba.acstat = ActivityStatus.ENABLED;
    policyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    policyMasterType.roles.add(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
    policyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;

    // Create Policy Master Admin Role
    RoleEntity storage policyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
    policyMasterAdminRole.name = "LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE";
    policyMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    policyMasterAdminRole.typeId = _LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
    policyMasterAdminRole.memberLimit = 7;
    policyMasterAdminRole.ba.scopeLimit = 7;
    policyMasterAdminRole.ba.atype = AgentType.ROLE;
    policyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    policyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    policyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    

    // Create Anonymouse  Type
    TypeEntity storage anonymouseType = _data.typeWriteSlot(_LIVELY_VERSE_ANONYMOUSE_TYPE_ID);
    anonymouseType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    anonymouseType.roleLimit = 0;
    anonymouseType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    anonymouseType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anonymouseType.ba.atype = AgentType.TYPE;
    anonymouseType.ba.scopeLimit = type(uint16).max;
    anonymouseType.ba.acstat = ActivityStatus.ENABLED;
    anonymouseType.ba.alstat = AlterabilityStatus.UPDATABLE;

    // Create Any Type
    TypeEntity storage anyType = _data.typeWriteSlot(_LIVELY_VERSE_ANY_TYPE_ID);
    anyType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    anyType.roleLimit = 0;
    anyType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    anyType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anyType.ba.atype = AgentType.TYPE;
    anyType.ba.scopeLimit = type(uint16).max;
    anyType.ba.acstat = ActivityStatus.ENABLED;
    anyType.ba.alstat = AlterabilityStatus.UPDATABLE;
  }

  function _initACLScopes(address contextManagerAddress, address functionManagerAddress) internal {
    // Create ACL Domain
    bytes32 aclTypeId = keccak256("LIVELY_VERSE_ACL_TYPE");
    bytes32 aclDomainId = keccak256("LIVELY_VERSE_ACL_DOMAIN");
    DomainEntity storage aclDomain = _data.domainWriteSlot(aclDomainId);
    aclDomain.name = "LIVELY_VERSE_ACL_DOMAIN";
    aclDomain.realmLimit = 1;
    aclDomain.bs.stype = ScopeType.DOMAIN;
    aclDomain.bs.agentLimit = type(uint16).max;
    aclDomain.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclDomain.bs.acstat = ActivityStatus.ENABLED;
    aclDomain.bs.adminId = aclTypeId;

    // Create Realm ACL
    bytes32 aclRealmId = keccak256("LIVELY_VERSE_ACL_REALM");
    RealmEntity storage aclRealm = _data.realmWriteSlot(aclRealmId);
    aclRealm.name = "LIVELY_VERSE_ACL_REALM";
    aclRealm.contextLimit = 16;
    aclRealm.domainId = aclDomainId;
    aclRealm.bs.stype = ScopeType.REALM;
    aclRealm.bs.agentLimit = type(uint16).max;
    aclRealm.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclRealm.bs.acstat = ActivityStatus.ENABLED;
    aclRealm.bs.adminId = aclTypeId;

    // Create ContextManager Context ACL
    bytes32 aclContextManagerId = keccak256(abi.encodePacked(contextManagerAddress));
    ContextEntity storage aclContextManagerEntity = _data.contextWriteSlot(aclContextManagerId);
    aclContextManagerEntity.realmId = aclRealmId;
    aclContextManagerEntity.contractId = contextManagerAddress;
    aclContextManagerEntity.bs.stype = ScopeType.CONTEXT;
    aclContextManagerEntity.bs.agentLimit = type(uint16).max;
    aclContextManagerEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclContextManagerEntity.bs.acstat = ActivityStatus.ENABLED;
    aclContextManagerEntity.bs.adminId = aclTypeId;

    // Create FunctionManager Context ACL
    bytes32 aclFunctionManagerId = keccak256(abi.encodePacked(functionManagerAddress));
    ContextEntity storage aclFunctionManagerEntity = _data.contextWriteSlot(aclFunctionManagerId);
    aclFunctionManagerEntity.realmId = aclRealmId;
    aclFunctionManagerEntity.contractId = functionManagerAddress;
    aclFunctionManagerEntity.bs.stype = ScopeType.CONTEXT;
    aclFunctionManagerEntity.bs.agentLimit = type(uint16).max;
    aclFunctionManagerEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclFunctionManagerEntity.bs.acstat = ActivityStatus.ENABLED;
    aclFunctionManagerEntity.bs.adminId = aclTypeId;

    
    // Create Function ContextRegister ACL
    bytes32 aclContextRegisterId = LACLUtils.functionGenerateId(contextManagerAddress, IContextManagement.contextRegister.selector);
    FunctionEntity storage functionContextRegisterEntity = _data.functionWriteSlot(aclContextRegisterId);
    functionContextRegisterEntity.contextId = aclContextManagerId;
    functionContextRegisterEntity.policyCode = 200;
    functionContextRegisterEntity.selector = IContextManagement.contextRegister.selector;
    functionContextRegisterEntity.bs.stype = ScopeType.FUNCTION;
    functionContextRegisterEntity.bs.agentLimit = type(uint16).max;
    functionContextRegisterEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
    functionContextRegisterEntity.bs.acstat = ActivityStatus.ENABLED;
    functionContextRegisterEntity.bs.adminId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;


    // Create Function ContextRegister ACL
    bytes32 aclFunctionRegisterId = LACLUtils.functionGenerateId(functionManagerAddress, IFunctionManagement.functionRegister.selector);
    FunctionEntity storage aclFunctionRegister = _data.functionWriteSlot(aclFunctionRegisterId);
    aclFunctionRegister.contextId = aclContextManagerId;
    aclFunctionRegister.policyCode = 200;
    aclFunctionRegister.selector = IFunctionManagement.functionRegister.selector;
    aclFunctionRegister.bs.stype = ScopeType.FUNCTION;
    aclFunctionRegister.bs.agentLimit = type(uint16).max;
    aclFunctionRegister.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclFunctionRegister.bs.acstat = ActivityStatus.ENABLED;
    aclFunctionRegister.bs.adminId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;


    // bind to related parents
    aclContextManagerEntity.functions.add(aclContextRegisterId);
    aclFunctionManagerEntity.functions.add(aclFunctionRegisterId);
    aclRealm.contexts.add(aclContextManagerId);
    aclRealm.contexts.add(aclFunctionManagerId);
    aclDomain.realms.add(aclRealmId);


    // Create ACL Type    
    TypeEntity storage aclType = _data.typeWriteSlot(aclTypeId);
    aclType.name = "LIVELY_VERSE_ACL_TYPE";
    aclType.roleLimit = 3;
    aclType.scopeId = aclDomainId;
    aclType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    aclType.ba.atype = AgentType.TYPE;
    aclType.ba.scopeLimit = type(uint16).max;
    aclType.ba.acstat = ActivityStatus.ENABLED;
    aclType.ba.alstat = AlterabilityStatus.UPDATABLE;
  
    // Create Policy Master Admin Role
    bytes32 aclAdminRoleId = keccak256("LIVELY_VERSE_ACL_ADMIN_ROLE");
    RoleEntity storage aclAdminRole = _data.roleWriteSlot(aclAdminRoleId);
    aclAdminRole.name = "LIVELY_VERSE_ACL_ADMIN_ROLE";
    aclAdminRole.scopeId = aclDomainId;
    aclAdminRole.typeId = aclTypeId;
    aclAdminRole.memberLimit = 7;
    aclAdminRole.ba.scopeLimit = 7;
    aclAdminRole.ba.atype = AgentType.ROLE;
    aclAdminRole.ba.acstat = ActivityStatus.ENABLED;
    aclAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    aclAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // acl 
    aclType.roles.add(aclAdminRoleId);
    aclType.members[keccak256(abi.encode(0xA77AFA407D4E78cAEC58bA7783AF98f828b9cf36))] = aclAdminRoleId;    
  }

  function getLibrary() external pure returns (address) {
    return address(LAccessControl);
  }
}
