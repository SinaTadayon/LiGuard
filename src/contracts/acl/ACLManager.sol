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
import "./profile/IProfileACL.sol";
import "./profile/IProfileACLGenerals.sol";
import "./profile/IProfileManagement.sol";
import "./profile/scope/IProfileContextManagement.sol";
import "./profile/scope/IProfileFunctionManagement.sol";
import "./profile/scope/IProfileRealmManagement.sol";
import "./profile/scope/IProfileDomainManagement.sol";
import "./profile/scope/IProfileGlobalManagement.sol";
import "./profile/agent/IProfileMemberManagement.sol";
import "./profile/agent/IProfileRoleManagement.sol";
import "./profile/agent/IProfileTypeManagement.sol";
import "./profile/policy/IProfilePolicyManagement.sol";
import "../lib/struct/LEnumerableSet.sol";
import "../lib/acl/LACLStorage.sol";
import "../lib/acl/LACLCommons.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";

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
  // bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID   = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN"));
  // bytes32 internal constant _LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID    = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN"));
  // bytes32 internal constant _LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN"));
  // bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN"));
  // bytes32 internal constant _LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN"));

  // event MemberRegistered(
  //   address indexed sender, 
  //   bytes32 indexed memberId, 
  //   address indexed account,
  //   bytes32 roleId,
  //   bytes32 adminId 
  // );

  // event RoleRegistered(
  //   address indexed sender,
  //   bytes32 indexed roleId,
  //   bytes32 indexed typeId,
  //   bytes32 adminId,
  //   bytes32 scopeId
  // );

  // event RoleMemberGranted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);

  // event TypeRegistered(
  //   address indexed sender,
  //   bytes32 indexed typeId,
  //   bytes32 indexed scopeId,
  //   bytes32 adminId
  // );

  // event FunctionRegistered(
  //   address indexed sender, 
  //   bytes32 indexed contextId,
  //   bytes32 indexed functionId,
  //   bytes32 adminId, 
  //   bytes32 agentId,
  //   address signer
  // );

  // event ContextRegistered(
  //   address indexed sender,
  //   bytes32 indexed contextId,
  //   address indexed contractId,
  //   bytes32 realmId,
  //   address signer,
  //   address deployer,
  //   address subject,
  //   bytes32 adminId
  // );

  // event DomainRegistered(
  //   address indexed sender, 
  //   bytes32 indexed domainId,
  //   bytes32 indexed adminId
  // );

  // event RealmRegistered(
  //   address indexed sender, 
  //   bytes32 indexed realmId, 
  //   bytes32 indexed domainId,
  //   bytes32 adminId 
  // );

  // event GlobalRegistered(address indexed sender, bytes32 indexed globalId, bytes32 indexed adminId);

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
      interfaceId == type(IProfileManagement).interfaceId ||
      interfaceId == type(IProfileACL).interfaceId ||      
      interfaceId == type(IProfileACLGenerals).interfaceId ||
      interfaceId == type(IProfilePolicyManagement).interfaceId ||
      interfaceId == type(IProfileFunctionManagement).interfaceId ||
      interfaceId == type(IProfileContextManagement).interfaceId ||
      interfaceId == type(IProfileRealmManagement).interfaceId ||
      interfaceId == type(IProfileDomainManagement).interfaceId ||
      interfaceId == type(IProfileGlobalManagement).interfaceId ||
      interfaceId == type(IProfileMemberManagement).interfaceId ||
      interfaceId == type(IProfileRoleManagement).interfaceId ||
      interfaceId == type(IProfileTypeManagement).interfaceId ||          
      super.supportsInterface(interfaceId);
  }

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external onlyProxy returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    if(_firstInit) {
      require(_getLocalAdmin() == _msgSender(), "Forbidden");      
    } else {
      require(_hasPermission(this.aclRegisterFacet.selector) == IACL.AuthorizationStatus.PERMITTED, "Access Denied");
    }
    return _doAclRegisterFacet(requests);
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
    require(!_firstInit, "Illegal Init");
    for(uint i = 0; i < requests.length; i++) {      
      require(_data.facetSet.contains(requests[i].facetId), "Facet Not Found");
      
      FacetEntity storage facetEntity = _data.facets[requests[i].facetId];
      require(requests[i].subjectId != address(0) && facetEntity.subjectId != requests[i].subjectId, "Illegal Upgrade");            

      facetEntity.subjectId = requests[i].subjectId;  
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
    });
  }

  function initACL(
    address contextManagerAddress, 
    address functionManagerAddress,
    address livelyAdmin,
    address systemAdmin    
  ) public onlyProxy onlyLocalAdmin {
    LACLCommons.initACLAgents(_data, livelyAdmin, systemAdmin);    
    // bytes32 systemMasterAdminMemberId = LACLUtils.accountGenerateId(systemAdmin);
    
    // // Global Scope    
    // emit GlobalRegistered(
    //   msg.sender, 
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, 
    //   _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID
    // );

    // // Lively Master Type
    // emit TypeRegistered(
    //   msg.sender, 
    //   _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID, 
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, 
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Lively Master Admin Role
    // emit RoleRegistered(
    //   msg.sender, 
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, 
    //   _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID, 
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, 
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // Lively Master Admin Member
    // emit MemberRegistered(
    //   msg.sender, 
    //   livelyMasterAdminMemberId,
    //   livelyAdmin,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID 
    // );

    // // Profile Any Type
    // emit TypeRegistered(
    //   msg.sender, 
    //   _LIVELY_PROFILE_ANY_TYPE_ID, 
    //   _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID, 
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );   

    // // Profile Lively Master Type       
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
    //   _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Profile System Master Type       
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
    //   _LIVELY_PROFILE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // System Master Type       
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // System Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // System Master Admin Member
    // emit MemberRegistered(
    //   msg.sender, 
    //   systemMasterAdminMemberId, 
    //   systemAdmin,
    //   _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Scope Master Type       
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Scope Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // Create Type Master Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );


    // // Create Type Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );


    // // Create Member Master Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );


    // // Create Member Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // Create Policy Master Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Create Policy Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // Create Profile Master Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Create Profile Master Admin Role
    // emit RoleRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID
    // );

    // // Create Anonymouse  Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_ANONYMOUS_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Create Any Type
    // emit TypeRegistered(
    //   msg.sender,
    //   _LIVELY_VERSE_ANY_TYPE_ID,
    //   _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
    //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
    // );

    // // Grant Role
    // emit RoleMemberGranted(
    //   msg.sender, 
    //   _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID, 
    //   livelyMasterAdminMemberId, 
    //   _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID
    // );
    
    // emit RoleMemberGranted(
    //   msg.sender, 
    //   _LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID, 
    //   livelyMasterAdminMemberId, 
    //   _LIVELY_VERSE_TYPE_MASTER_TYPE_ID
    // );
    
    // emit RoleMemberGranted(
    //   msg.sender, 
    //   _LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID, 
    //   livelyMasterAdminMemberId, 
    //   _LIVELY_VERSE_MEMBER_MASTER_TYPE_ID
    // );
    
    // emit RoleMemberGranted(
    //   msg.sender, 
    //   _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID, 
    //   livelyMasterAdminMemberId, 
    //   _LIVELY_VERSE_POLICY_MASTER_TYPE_ID
    // );
    
    // emit RoleMemberGranted(
    //   msg.sender, 
    //   _LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID, 
    //   livelyMasterAdminMemberId, 
    //   _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID
    // );

    _initACLScopes(
      contextManagerAddress, 
      functionManagerAddress, 
      LACLUtils.accountGenerateId(livelyAdmin)
    );

    emit ACLInitialized(
      msg.sender,
      livelyAdmin,
      systemAdmin,
      contextManagerAddress, 
      functionManagerAddress
    );

  }

  function _initACLScopes(
    address contextManagerAddress, 
    address functionManagerAddress, 
    bytes32 livelyMasterAdminMemberId
  ) internal {    
    // Create ACL Domain
    bytes32 aclTypeId = LACLUtils.generateId2("TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER");    
    bytes32 aclDomainId = LACLUtils.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD");
    bytes32 aclRealmId = LACLUtils.generateId2("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL");
    bytes32 aclContextManagerId = LACLUtils.accountGenerateId(contextManagerAddress);
    bytes32 aclFunctionManagerId = LACLUtils.accountGenerateId(functionManagerAddress);
    bytes32 aclContextRegisterId = LACLUtils.functionGenerateId(contextManagerAddress, IContextManagement.contextRegister.selector);
    bytes32 aclFunctionRegisterId = LACLUtils.functionGenerateId(functionManagerAddress, IFunctionManagement.functionRegister.selector);

    {
      DomainEntity storage aclDomain = _data.domainWriteSlot(aclDomainId);
      aclDomain.name = "DOMAIN.LIVELY_VERSE.LIVELY_GUARD";
      aclDomain.realmLimit = 3;
      aclDomain.bs.stype = ScopeType.DOMAIN;
      aclDomain.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclDomain.bs.acstat = ActivityStatus.ENABLED;
      aclDomain.bs.adminId = aclTypeId;
      aclDomain.realms.add(aclRealmId);
      // emit DomainRegistered(msg.sender, aclDomainId, aclTypeId);

      // Create Realm ACL
      RealmEntity storage aclRealm = _data.realmWriteSlot(aclRealmId);
      aclRealm.name = "REALM.LIVELY_VERSE.LIVELY_GUARD.ACL";
      aclRealm.contextLimit = 128;
      aclRealm.domainId = aclDomainId;
      aclRealm.bs.stype = ScopeType.REALM;
      aclRealm.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclRealm.bs.acstat = ActivityStatus.ENABLED;
      aclRealm.bs.adminId = aclTypeId;
      aclRealm.contexts.add(aclContextManagerId);
      aclRealm.contexts.add(aclFunctionManagerId);
      // update aclRealm referredByAgent
      aclRealm.bs.referredByAgent = 2;    
      // emit RealmRegistered(msg.sender, aclRealmId, aclDomainId, aclTypeId);    
    }

    {
      // Create ContextManager Context ACL      
      ContextEntity storage aclContextManagerEntity = _data.contextWriteSlot(aclContextManagerId);
      aclContextManagerEntity.realmId = aclRealmId;
      aclContextManagerEntity.contractId = contextManagerAddress;
      aclContextManagerEntity.functionLimit = type(uint8).max;
      aclContextManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclContextManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclContextManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclContextManagerEntity.bs.adminId = aclTypeId;
      aclContextManagerEntity.functions.add(aclContextRegisterId);
      // emit ContextRegistered(
      //   msg.sender,
      //   aclContextManagerId,
      //   contextManagerAddress,
      //   aclRealmId,
      //   address(0),
      //   address(0),
      //   address(0),
      //   aclTypeId
      // );

      // Create FunctionManager Context ACL    
      ContextEntity storage aclFunctionManagerEntity = _data.contextWriteSlot(aclFunctionManagerId);
      aclFunctionManagerEntity.realmId = aclRealmId;
      aclFunctionManagerEntity.contractId = functionManagerAddress;
      aclFunctionManagerEntity.functionLimit = type(uint8).max;
      aclFunctionManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclFunctionManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclFunctionManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionManagerEntity.bs.adminId = aclTypeId;
      aclFunctionManagerEntity.functions.add(aclFunctionRegisterId);
      // emit ContextRegistered(
      //   msg.sender,
      //   aclFunctionManagerId,
      //   functionManagerAddress,
      //   aclRealmId,
      //   address(0),
      //   address(0),
      //   address(0),
      //   aclTypeId
      // );

      // Create Function ContextRegister ACL      
      FunctionEntity storage functionContextRegisterEntity = _data.functionWriteSlot(aclContextRegisterId);
      functionContextRegisterEntity.contextId = aclContextManagerId;
      functionContextRegisterEntity.policyCode = 250;
      functionContextRegisterEntity.selector = IContextManagement.contextRegister.selector;
      functionContextRegisterEntity.bs.stype = ScopeType.FUNCTION;
      functionContextRegisterEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
      functionContextRegisterEntity.bs.acstat = ActivityStatus.ENABLED;
      functionContextRegisterEntity.bs.adminId = aclTypeId;
      functionContextRegisterEntity.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
      // emit FunctionRegistered(
      //   msg.sender, 
      //   aclContextManagerId,
      //   aclContextRegisterId,
      //   aclTypeId, 
      //   _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
      //   address(0)
      // );


      // Create Function FunctionRegister ACL
      FunctionEntity storage aclFunctionRegister = _data.functionWriteSlot(aclFunctionRegisterId);
      aclFunctionRegister.contextId = aclContextManagerId;
      aclFunctionRegister.policyCode = 250;
      aclFunctionRegister.selector = IFunctionManagement.functionRegister.selector;
      aclFunctionRegister.bs.stype = ScopeType.FUNCTION;
      aclFunctionRegister.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclFunctionRegister.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionRegister.bs.adminId = aclTypeId;
      aclFunctionRegister.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
      // emit FunctionRegistered(
      //   msg.sender, 
      //   aclContextManagerId,
      //   aclFunctionRegisterId,
      //   aclTypeId, 
      //   _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
      //   address(0)
      // );      
    }

    {
      // Create ACL Type    
      TypeEntity storage aclType = _data.typeWriteSlot(aclTypeId);
      aclType.name = "TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER";
      aclType.roleLimit = type(uint16).max;
      aclType.scopeId = aclDomainId;
      aclType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      aclType.ba.atype = AgentType.TYPE;
      aclType.ba.acstat = ActivityStatus.ENABLED;
      aclType.ba.alstat = AlterabilityStatus.UPDATABLE;
      // emit TypeRegistered(
      //   msg.sender,
      //   aclTypeId,
      //   aclDomainId,
      //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
      // );
    
      // Create Admin Role
      bytes32 aclAdminRoleId = LACLUtils.generateId2("ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN");
      RoleEntity storage aclAdminRole = _data.roleWriteSlot(aclAdminRoleId);
      aclAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN";
      aclAdminRole.scopeId = aclDomainId;
      aclAdminRole.typeId = aclTypeId;
      aclAdminRole.memberLimit = type(uint24).max;
      aclAdminRole.ba.atype = AgentType.ROLE;
      aclAdminRole.ba.acstat = ActivityStatus.ENABLED;
      aclAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      aclAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      // emit RoleRegistered(
      //   msg.sender,
      //   aclAdminRoleId,
      //   aclTypeId,
      //   _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      //   aclDomainId
      // );

      // acl 
      aclType.roles.add(aclAdminRoleId);
      aclType.members[livelyMasterAdminMemberId] = aclAdminRoleId;
      // emit RoleMemberGranted(msg.sender, aclAdminRoleId, livelyMasterAdminMemberId, aclTypeId);
    }    
  }


  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}
