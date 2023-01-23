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
import "../lib/acl/LACLManager.sol";
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
  bytes32 internal constant _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN"));
  bytes32 internal constant _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID  = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_AGENT_MASTER_ADMIN"));
  bytes32 internal constant _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID = keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN"));


  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion
  ) public onlyProxy onlyLocalAdmin initializer {   
    LACLManager.registerProxyFacet(_data, _implementation());
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
      LACLManager.aclRegisterFacet(_data, requests[i]);
      emit ACLFacetRegistered(
        _msgSender(), 
        requests[i].facetId, 
        requests[i].subjectId
        // requests[i].interfaceId
      );
    }
    if(_data.facetSet.length() >= 11) _firstInit = false;
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
    _initACLAgents(livelyAdmin, systemAdmin);
    _initACLScopes(
      contextManagerAddress, 
      functionManagerAddress, 
      LACLUtils.accountGenerateId(livelyAdmin)
    );
  }

  function _initACLAgents(address livelyAdmin, address systemAdmin) internal {

    // init Global Scope
    GlobalEntity storage livelyGlobalEntity = _data.globalWriteSlot(_LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
    livelyGlobalEntity.name = "GLOBAL.LIVELY_VERSE";
    livelyGlobalEntity.domainLimit = type(uint16).max;
    livelyGlobalEntity.bs.acstat = ActivityStatus.ENABLED;
    livelyGlobalEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
    livelyGlobalEntity.bs.stype = ScopeType.GLOBAL;
    livelyGlobalEntity.bs.agentLimit = type(uint16).max;
    livelyGlobalEntity.bs.adminId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type       
    TypeEntity storage livelyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MASTER";
    livelyMasterType.roleLimit = type(uint16).max;
    livelyMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = AgentType.TYPE;
    livelyMasterType.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
          
    // Create Lively Master Admin Role
    RoleEntity storage livelyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN";
    livelyMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
    livelyMasterAdminRole.typeId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = type(uint24).max;
    livelyMasterAdminRole.ba.atype = AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = LACLUtils.accountGenerateId(livelyAdmin);
    MemberEntity storage livelyMasterAdminMember = _data.memberWriteSlot(livelyMasterAdminMemberId);   
    livelyMasterAdminMember.account = livelyAdmin;
    livelyMasterAdminMember.limits = GeneralLimit({
      contextLimit: type(uint32).max,
      memberRegisterLimit: type(uint32).max,
      roleRegisterLimit: type(uint32).max,
      typeRegisterLimit: type(uint32).max,
      functionRegisterLimit: type(uint32).max,
      contextRegisterLimit: type(uint32).max,
      memberLimit: type(uint24).max,
      realmRegisterLimit: type(uint16).max,
      domainRegisterLimit: type(uint16).max,
      policyRegisterLimit: type(uint16).max,
      functionLimit: type(uint16).max,
      realmLimit: type(uint16).max,
      domainLimit: type(uint16).max,
      callLimit: type(uint16).max,
      typeRoleLimit: type(uint16).max,
      typeLimit: type(uint16).max,
      policyRoleLimit: type(uint16).max
    });
      
    livelyMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;      

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Agent and Policy types
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    {
      // Create System Master Type       
      TypeEntity storage systemMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
      systemMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER";
      systemMasterType.roleLimit = type(uint16).max;
      systemMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      systemMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterType.ba.atype = AgentType.TYPE;
      systemMasterType.ba.acstat = ActivityStatus.ENABLED;
      systemMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      systemMasterType.roles.add(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

      // Create System Master Admin Role
      RoleEntity storage systemMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
      systemMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN";
      systemMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      systemMasterAdminRole.typeId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
      systemMasterAdminRole.memberLimit = type(uint24).max;
      systemMasterAdminRole.ba.atype = AgentType.ROLE;
      systemMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      systemMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      systemMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create System Master Admin Member
      bytes32 systemMasterAdminMemberId = LACLUtils.accountGenerateId(systemAdmin);
      MemberEntity storage systemMasterAdminMember = _data.memberWriteSlot(systemMasterAdminMemberId);
      systemMasterAdminMember.typeLimit = type(uint32).max;
      
      systemMasterAdminMember.limits = GeneralLimit({
        contextLimit: type(uint32).max,
        memberRegisterLimit: 0,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        functionRegisterLimit: type(uint32).max,
        contextRegisterLimit: 128,
        memberLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        functionLimit: type(uint16).max,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 0,
        typeRoleLimit: 0,
        typeLimit: 0,
        policyRoleLimit: 0
      });
    
      systemMasterAdminMember.account = systemAdmin;      
      systemMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      systemMasterAdminMember.ba.atype = AgentType.MEMBER;
      systemMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
      systemMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;
      
      // bind Lively Master Admin Member to Admin role
      systemMasterType.members[systemMasterAdminMemberId] = _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;

      // Create Scope Master Type       
      TypeEntity storage scopeMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
      scopeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER";
      scopeMasterType.roleLimit = type(uint16).max;
      scopeMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      scopeMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      scopeMasterType.ba.atype = AgentType.TYPE;
      scopeMasterType.ba.acstat = ActivityStatus.ENABLED;
      scopeMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      scopeMasterType.roles.add(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;
      
      // Create Scope Master Admin Role
      RoleEntity storage scopeMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
      scopeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN";
      scopeMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      scopeMasterAdminRole.typeId = _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
      scopeMasterAdminRole.memberLimit = type(uint24).max;
      scopeMasterAdminRole.ba.atype = AgentType.ROLE;
      scopeMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      scopeMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      scopeMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      
      // Create Type Master Type
      TypeEntity storage typeMasterType = _data.typeWriteSlot(_LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
      typeMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER";
      typeMasterType.roleLimit = type(uint16).max;
      typeMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      typeMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      typeMasterType.ba.atype = AgentType.TYPE;
      typeMasterType.ba.acstat = ActivityStatus.ENABLED;
      typeMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      typeMasterType.roles.add(_LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID;

      // Create Type Master Admin Role
      RoleEntity storage typeMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
      typeMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN";
      typeMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      typeMasterAdminRole.typeId = _LIVELY_VERSE_TYPE_MASTER_TYPE_ID;
      typeMasterAdminRole.memberLimit = type(uint24).max;
      typeMasterAdminRole.ba.atype = AgentType.ROLE;
      typeMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      typeMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      typeMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      
      // Create Member Master Type
      TypeEntity storage memberMasterType = _data.typeWriteSlot(_LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
      memberMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER";
      memberMasterType.roleLimit = type(uint16).max;
      memberMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      memberMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      memberMasterType.ba.atype = AgentType.TYPE;
      memberMasterType.ba.acstat = ActivityStatus.ENABLED;
      memberMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      memberMasterType.roles.add(_LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
      memberMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID;

      // Create Member Master Admin Role
      RoleEntity storage memberMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
      memberMasterAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN";
      memberMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      memberMasterAdminRole.typeId = _LIVELY_VERSE_TYPE_MASTER_TYPE_ID;
      memberMasterAdminRole.memberLimit = type(uint24).max;
      memberMasterAdminRole.ba.atype = AgentType.ROLE;
      memberMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      memberMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      memberMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create Policy Master Type
      TypeEntity storage policyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
      policyMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER";
      policyMasterType.roleLimit = type(uint16).max;
      policyMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      policyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      policyMasterType.ba.atype = AgentType.TYPE;
      policyMasterType.ba.acstat = ActivityStatus.ENABLED;
      policyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      policyMasterType.roles.add(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      policyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;

      // Create Policy Master Admin Role
      RoleEntity storage policyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      policyMasterAdminRole.name = "TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN";
      policyMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      policyMasterAdminRole.typeId = _LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
      policyMasterAdminRole.memberLimit = type(uint24).max;
      policyMasterAdminRole.ba.atype = AgentType.ROLE;
      policyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      policyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      policyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      
      // Create Profile Master Type
      TypeEntity storage profileMasterType = _data.typeWriteSlot(_LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
      profileMasterType.name = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER";
      profileMasterType.roleLimit = type(uint16).max;
      profileMasterType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      profileMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      profileMasterType.ba.atype = AgentType.TYPE;
      profileMasterType.ba.acstat = ActivityStatus.ENABLED;
      profileMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
      profileMasterType.roles.add(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
      profileMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID;

      // Create Profile Master Admin Role
      RoleEntity storage profileMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID);
      profileMasterAdminRole.name = "TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN";
      profileMasterAdminRole.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      profileMasterAdminRole.typeId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      profileMasterAdminRole.memberLimit = type(uint24).max;
      profileMasterAdminRole.ba.atype = AgentType.ROLE;
      profileMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
      profileMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      profileMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // Create Anonymouse  Type
      TypeEntity storage anonymousType = _data.typeWriteSlot(_LIVELY_VERSE_ANONYMOUS_TYPE_ID);
      anonymousType.name = "TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS";
      anonymousType.roleLimit = 0;
      anonymousType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      anonymousType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anonymousType.ba.atype = AgentType.TYPE;
      anonymousType.ba.acstat = ActivityStatus.ENABLED;
      anonymousType.ba.alstat = AlterabilityStatus.UPDATABLE;

      // Create Any Type
      TypeEntity storage anyType = _data.typeWriteSlot(_LIVELY_VERSE_ANY_TYPE_ID);
      anyType.name = "TYPE.LIVELY_VERSE.LIVELY_ANY";
      anyType.roleLimit = 0;
      anyType.scopeId = _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID;
      anyType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
      anyType.ba.atype = AgentType.TYPE;
      anyType.ba.acstat = ActivityStatus.ENABLED;
      anyType.ba.alstat = AlterabilityStatus.UPDATABLE;
    }

    // update livelyGlobalEntity.bs.referredByAgent
    livelyGlobalEntity.bs.referredByAgent = 16;
    livelyGlobalEntity.domains.add(LACLUtils.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD"));
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
    aclDomain.realmLimit = 1;
    aclDomain.bs.stype = ScopeType.DOMAIN;
    aclDomain.bs.alstat = AlterabilityStatus.UPDATABLE;
    aclDomain.bs.acstat = ActivityStatus.ENABLED;
    aclDomain.bs.adminId = aclTypeId;

    // Create Realm ACL
    bytes32 aclRealmId = LACLUtils.generateId2("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL");
    RealmEntity storage aclRealm = _data.realmWriteSlot(aclRealmId);
    aclRealm.name = "REALM.LIVELY_VERSE.LIVELY_GUARD.ACL";
    aclRealm.contextLimit = 64;
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
    return address(LACLManager);
  }
}
