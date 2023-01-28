// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IACL.sol";
import "./IACLGenerals.sol";
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
import "../lib/acl/LACLCommons.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ACLManager is ACLStorage, BaseUUPSProxy, IACLManager {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // General Roles ID 
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN"));

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion
  ) public onlyProxy onlyLocalAdmin initializer {   
    LACLCommons.registerProxyFacet(_data, _implementation());
    __BASE_UUPS_init(contractName, contractVersion, address(this));
    _firstInit = true;

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  function getFirstInit() public view returns (bool) {
    return _firstInit;
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) { 
    return
      interfaceId == type(IACL).interfaceId ||
      interfaceId == type(IACLManager).interfaceId ||
      interfaceId == type(IACLGenerals).interfaceId ||
      interfaceId == type(IPolicyManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
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
      require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
      require(_getLocalAdmin() == _msgSender(), "Forbidden");      
      return _doAclRegisterFacet(requests);
    } else {
      require(_hasPermission(this.aclRegisterFacet.selector) == IACL.AuthorizationStatus.PERMITTED, "Access Denied");
      return _doAclRegisterFacet(requests);
    }
  }

  function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      LACLCommons.aclRegisterFacet(_data, requests[i]);
      emit ACLFacetRegistered(
        _msgSender(), 
        requests[i].facetId, 
        requests[i].subjectId
      );
    }
    if(_data.facetSet.length() >= 22) _firstInit = false;
    return true;      
  }

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) external onlyProxy aclCheck(this.aclUpgradeFacet.selector) returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    for(uint i = 0; i < requests.length; i++) {      
      require(_data.facetSet.contains(requests[i].facetId), "Facet Not Found");
      
      FacetEntity storage facetEntity = _data.facets[requests[i].facetId];
      require(requests[i].subjectId != address(0) && facetEntity.subjectId != requests[i].subjectId, "Illegal Upgrade");            

      facetEntity.subjectId = requests[i].subjectId;
      // if(requests[i].interfaceId != bytes4(0) && facetEntity.interfaceId != requests[i].interfaceId) {
      //   require(IERC165(requests[i].facetId).supportsInterface(requests[i].interfaceId), "Illegal Interface");
      //   facetEntity.interfaceId = requests[i].interfaceId;
      // }

      for(uint j = 0; j < requests[i].functions.length; j++) {
        if (requests[i].functions[j].action == ActionType.REMOVE) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] != address(0), "Selector Not Found");
            delete _data.selectors[requests[i].functions[j].selectors[z]];
            emit ACLFacetFunctionUpgraded(msg.sender, requests[i].facetId, requests[i].functions[j].selectors[z], ActionType.REMOVE);
          }
        } else if (requests[i].functions[j].action == ActionType.ADD) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] == address(0), "Illegal Selector");
            _data.selectors[requests[i].functions[j].selectors[z]] = requests[i].facetId;
            emit ACLFacetFunctionUpgraded(msg.sender, requests[i].facetId, requests[i].functions[j].selectors[z], ActionType.ADD);
          }
        } 
      }
      emit ACLFacetUpgraded(_msgSender(), requests[i].facetId, requests[i].subjectId);
    }
    return true;
  }  

  function aclGetFacets() public view returns (address[] memory) {
    return _data.facetSet.values();
  }

  function aclGetFacet(bytes4 selector) external view returns (address) {
    return _data.selectors[selector];
  }

  function aclHasSelector(bytes4 selector) external view returns (bool) {
    return _data.selectors[selector] != address(0);
  }

  function aclGetFacetInfo(address facetId) external view returns (FacetInfo memory) {
    FacetEntity storage facetEntity = _data.facets[facetId];
    return FacetInfo({
      subjectId: facetEntity.subjectId
      // interfaceId: facetEntity.interfaceId
    });
  }

  function initACL(
    address contextManagerAddress, 
    address functionManagerAddress,
    address livelyAdmin,
    address systemAdmin    
  ) public onlyProxy onlyLocalAdmin {
    LACLCommons.initACLAgents(_data, livelyAdmin, systemAdmin);
    // _initACLAgents(livelyAdmin, systemAdmin);
    _initACLScopes(
      contextManagerAddress, 
      functionManagerAddress, 
      LACLUtils.accountGenerateId(livelyAdmin)
    );
  }

  function _initACLScopes(
    address contextManagerAddress, 
    address functionManagerAddress, 
    bytes32 livelyMasterAdminMemberId
  ) internal {    
    // Create ACL Domain
    bytes32 aclTypeId = LACLUtils.generateId2("TYPE.LIVELY_VERSE.LIVELY_GUARD.ZERO_TYPE");    
    bytes32 aclDomainId = LACLUtils.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD");
    DomainEntity storage aclDomain = _data.domainWriteSlot(aclDomainId);
    aclDomain.name = "DOMAIN.LIVELY_VERSE.LIVELY_GUARD";
    aclDomain.realmLimit = 3;
    aclDomain.bs.stype = ScopeType.DOMAIN;
    aclDomain.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclDomain.bs.acstat = ActivityStatus.ENABLED;
    aclDomain.bs.adminId = aclTypeId;

    // Create Realm ACL
    bytes32 aclRealmId = LACLUtils.generateId2("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL");
    RealmEntity storage aclRealm = _data.realmWriteSlot(aclRealmId);
    aclRealm.name = "REALM.LIVELY_VERSE.LIVELY_GUARD.ACL";
    aclRealm.contextLimit = 128;
    aclRealm.domainId = aclDomainId;
    aclRealm.bs.stype = ScopeType.REALM;
    aclRealm.bs.alstat = AlterabilityStatus.UPGRADABLE;
    aclRealm.bs.acstat = ActivityStatus.ENABLED;
    aclRealm.bs.adminId = aclTypeId;

    {
      // Create ContextManager Context ACL
      bytes32 aclContextManagerId = LACLUtils.accountGenerateId(contextManagerAddress);
      ContextEntity storage aclContextManagerEntity = _data.contextWriteSlot(aclContextManagerId);
      aclContextManagerEntity.realmId = aclRealmId;
      aclContextManagerEntity.contractId = contextManagerAddress;
      aclContextManagerEntity.functionLimit = type(uint16).max;
      aclContextManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclContextManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclContextManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclContextManagerEntity.bs.adminId = aclTypeId;

      // Create FunctionManager Context ACL
      bytes32 aclFunctionManagerId = LACLUtils.accountGenerateId(functionManagerAddress);
      ContextEntity storage aclFunctionManagerEntity = _data.contextWriteSlot(aclFunctionManagerId);
      aclFunctionManagerEntity.realmId = aclRealmId;
      aclFunctionManagerEntity.contractId = functionManagerAddress;
      aclFunctionManagerEntity.functionLimit = type(uint16).max;
      aclFunctionManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclFunctionManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclFunctionManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionManagerEntity.bs.adminId = aclTypeId;

      
      // Create Function ContextRegister ACL
      bytes32 aclContextRegisterId = LACLUtils.functionGenerateId(contextManagerAddress, IContextManagement.contextRegister.selector);
      FunctionEntity storage functionContextRegisterEntity = _data.functionWriteSlot(aclContextRegisterId);
      functionContextRegisterEntity.contextId = aclContextManagerId;
      functionContextRegisterEntity.policyCode = 250;
      functionContextRegisterEntity.selector = IContextManagement.contextRegister.selector;
      functionContextRegisterEntity.bs.stype = ScopeType.FUNCTION;
      functionContextRegisterEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
      functionContextRegisterEntity.bs.acstat = ActivityStatus.ENABLED;
      functionContextRegisterEntity.bs.adminId = aclTypeId;
      functionContextRegisterEntity.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;


      // Create Function FunctionRegister ACL
      bytes32 aclFunctionRegisterId = LACLUtils.functionGenerateId(functionManagerAddress, IFunctionManagement.functionRegister.selector);
      FunctionEntity storage aclFunctionRegister = _data.functionWriteSlot(aclFunctionRegisterId);
      aclFunctionRegister.contextId = aclContextManagerId;
      aclFunctionRegister.policyCode = 250;
      aclFunctionRegister.selector = IFunctionManagement.functionRegister.selector;
      aclFunctionRegister.bs.stype = ScopeType.FUNCTION;
      aclFunctionRegister.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclFunctionRegister.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionRegister.bs.adminId = aclTypeId;
      aclFunctionRegister.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;

      // bind to related parents
      aclContextManagerEntity.functions.add(aclContextRegisterId);
      aclFunctionManagerEntity.functions.add(aclFunctionRegisterId);
      aclRealm.contexts.add(aclContextManagerId);
      aclRealm.contexts.add(aclFunctionManagerId);
      aclDomain.realms.add(aclRealmId);
    }

    // Create ACL Type    
    TypeEntity storage aclType = _data.typeWriteSlot(aclTypeId);
    aclType.name = "TYPE.LIVELY_VERSE.LIVELY_GUARD.ZERO_TYPE";
    aclType.roleLimit = type(uint16).max;
    aclType.scopeId = aclDomainId;
    aclType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    aclType.ba.atype = AgentType.TYPE;
    aclType.ba.acstat = ActivityStatus.ENABLED;
    aclType.ba.alstat = AlterabilityStatus.UPDATABLE;
  
    // Create Policy Master Admin Role
    bytes32 aclAdminRoleId = LACLUtils.generateId2("ROLE.LIVELY_VERSE.LIVELY_GUARD.ZERO_TYPE_ADMIN");
    RoleEntity storage aclAdminRole = _data.roleWriteSlot(aclAdminRoleId);
    aclAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_GUARD.ZERO_TYPE_ADMIN";
    aclAdminRole.scopeId = aclDomainId;
    aclAdminRole.typeId = aclTypeId;
    aclAdminRole.memberLimit = type(uint24).max;
    aclAdminRole.ba.atype = AgentType.ROLE;
    aclAdminRole.ba.acstat = ActivityStatus.ENABLED;
    aclAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    aclAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // acl 
    aclType.roles.add(aclAdminRoleId);
    aclType.members[livelyMasterAdminMemberId] = aclAdminRoleId;

    // update aclRealm referredByAgent
    aclRealm.bs.referredByAgent = 2;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}
