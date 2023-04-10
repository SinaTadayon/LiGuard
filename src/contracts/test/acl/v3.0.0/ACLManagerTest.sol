// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IACLTest.sol";
import "./IACLGeneralsTest.sol";
import "./ACLStorageTest.sol";
import "./IACLManagerTest.sol";
import "./scope/IContextManagementTest.sol";
import "./scope/IFunctionManagementTest.sol";
import "./scope/IRealmManagementTest.sol";
import "./scope/IDomainManagementTest.sol";
import "./scope/IUniverseManagementTest.sol";
import "./agent/IMemberManagementTest.sol";
import "./agent/IRoleManagementTest.sol";
import "./agent/ITypeManagementTest.sol";
import "./policy/IPolicyManagementTest.sol";
import "./profile/IProfileACLTest.sol";
import "./profile/IProfileACLGeneralsTest.sol";
import "./profile/IProfileManagementTest.sol";
import "./profile/scope/IProfileContextManagementTest.sol";
import "./profile/scope/IProfileFunctionManagementTest.sol";
import "./profile/scope/IProfileRealmManagementTest.sol";
import "./profile/scope/IProfileDomainManagementTest.sol";
import "./profile/scope/IProfileUniverseManagementTest.sol";
import "./profile/agent/IProfileMemberManagementTest.sol";
import "./profile/agent/IProfileRoleManagementTest.sol";
import "./profile/agent/IProfileTypeManagementTest.sol";
import "./profile/policy/IProfilePolicyManagementTest.sol";
import "./lib/LACLStorageTest.sol";
import "./lib/LACLCommonsTest.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/Initializable.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ACLManagerTest is ACLStorageTest, BaseUUPSProxy, IACLManagerTest {
  using LACLStorageTest for DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // General Roles ID
  bytes32 internal constant _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
  bytes32 internal constant _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN"));

  constructor() {}

  function initialize(string calldata contractName, string calldata contractVersion)
    public
    onlyProxy
    onlyLocalAdmin
    initializer
  {
    LACLCommonsTest.registerProxyFacet(_data, _implementation());
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
      interfaceId == type(IACLTest).interfaceId ||
      interfaceId == type(IACLManagerTest).interfaceId ||
      interfaceId == type(IACLGeneralsTest).interfaceId ||
      interfaceId == type(IPolicyManagementTest).interfaceId ||
      interfaceId == type(IFunctionManagementTest).interfaceId ||
      interfaceId == type(IContextManagementTest).interfaceId ||
      interfaceId == type(IRealmManagementTest).interfaceId ||
      interfaceId == type(IDomainManagementTest).interfaceId ||
      interfaceId == type(IUniverseManagementTest).interfaceId ||
      interfaceId == type(IMemberManagementTest).interfaceId ||
      interfaceId == type(IRoleManagementTest).interfaceId ||
      interfaceId == type(ITypeManagementTest).interfaceId ||
      interfaceId == type(IProfileManagementTest).interfaceId ||
      interfaceId == type(IProfileACLTest).interfaceId ||
      interfaceId == type(IProfileACLGeneralsTest).interfaceId ||
      interfaceId == type(IProfilePolicyManagementTest).interfaceId ||
      interfaceId == type(IProfileFunctionManagementTest).interfaceId ||
      interfaceId == type(IProfileContextManagementTest).interfaceId ||
      interfaceId == type(IProfileRealmManagementTest).interfaceId ||
      interfaceId == type(IProfileDomainManagementTest).interfaceId ||
      interfaceId == type(IProfileUniverseManagementTest).interfaceId ||
      interfaceId == type(IProfileMemberManagementTest).interfaceId ||
      interfaceId == type(IProfileRoleManagementTest).interfaceId ||
      interfaceId == type(IProfileTypeManagementTest).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external onlyProxy returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    if (_firstInit) {
      require(_getLocalAdmin() == _msgSender(), "Forbidden");
    } else {
      
      require(IACLTest(_accessControlManager).hasAccountAccess(address(this), this.aclRegisterFacet.selector, _msgSender()) == IACLTest.AuthorizationStatus.PERMITTED, "Access Denied");
    }
    return _doAclRegisterFacet(requests);
  }

  function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
    for (uint256 i = 0; i < requests.length; i++) {
      LACLCommonsTest.aclRegisterFacet(_data, requests[i]);
      emit ACLFacetRegistered(_msgSender(), requests[i].facetId, requests[i].subjectId);
    }
    return true;
  }

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests)
    external
    onlyProxy
    aclCheck(this.aclUpgradeFacet.selector)
    returns (bool)
  {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(!_firstInit, "Illegal INIT");
    for (uint256 i = 0; i < requests.length; i++) {
      require(_data.facetSet.contains(requests[i].facetId), "Facet Not Found");

      FacetEntity storage facetEntity = _data.facets[requests[i].facetId];
      require(requests[i].subjectId != address(0) && facetEntity.subjectId != requests[i].subjectId, "Illegal Upgrade");

      facetEntity.subjectId = requests[i].subjectId;
      for (uint256 j = 0; j < requests[i].functions.length; j++) {
        if (requests[i].functions[j].action == ActionType.REMOVE) {
          for (uint256 z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] != address(0), "Selector Not Found");
            delete _data.selectors[requests[i].functions[j].selectors[z]];
            emit ACLFacetFunctionUpgraded(
              msg.sender,
              requests[i].facetId,
              requests[i].functions[j].selectors[z],
              ActionType.REMOVE
            );
          }
        } else if (requests[i].functions[j].action == ActionType.ADD) {
          for (uint256 z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] == address(0), "Illegal Selector");
            _data.selectors[requests[i].functions[j].selectors[z]] = requests[i].facetId;
            emit ACLFacetFunctionUpgraded(
              msg.sender,
              requests[i].facetId,
              requests[i].functions[j].selectors[z],
              ActionType.ADD
            );
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
    return FacetInfo({subjectId: facetEntity.subjectId});
  }

  function initACL(
    address contextManagerAddress,
    address functionManagerAddress,
    address livelyAdmin,
    address systemAdmin
  ) public onlyProxy onlyLocalAdmin {
    require(_firstInit, "Already INIT");
    _firstInit = false;
    LACLCommonsTest.initACLAgents(_data, livelyAdmin, systemAdmin);

    _initACLScopes(contextManagerAddress, functionManagerAddress, LACLUtilsTest.accountGenerateId(livelyAdmin));

    emit ACLInitialized(msg.sender, livelyAdmin, systemAdmin, contextManagerAddress, functionManagerAddress);
  }

  function _initACLScopes(
    address contextManagerAddress,
    address functionManagerAddress,
    bytes32 livelyMasterAdminMemberId
  ) internal {
    // Create ACL Domain
    bytes32 aclTypeId = LACLUtilsTest.generateId2("TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER");
    bytes32 aclDomainId = LACLUtilsTest.generateId2("DOMAIN.LIVELY_VERSE.LIVELY_GUARD");
    bytes32 aclRealmId = LACLUtilsTest.generateId2("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL");
    bytes32 aclContextManagerId = LACLUtilsTest.accountGenerateId(contextManagerAddress);
    bytes32 aclFunctionManagerId = LACLUtilsTest.accountGenerateId(functionManagerAddress);
    bytes32 aclContextRegisterId = LACLUtilsTest.functionGenerateId(
      contextManagerAddress,
      IContextManagementTest.contextRegister.selector
    );
    bytes32 aclFunctionRegisterId = LACLUtilsTest.functionGenerateId(
      functionManagerAddress,
      IFunctionManagementTest.functionRegister.selector
    );

    {
      DomainEntity storage aclDomain = _data.domainWriteSlot(aclDomainId);
      aclDomain.name = "DOMAIN.LIVELY_VERSE.LIVELY_GUARD";
      aclDomain.universeId = _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID;
      aclDomain.realmLimit = 3;
      aclDomain.bs.stype = ScopeType.DOMAIN;
      aclDomain.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclDomain.bs.acstat = ActivityStatus.ENABLED;
      aclDomain.bs.adminId = aclTypeId;
      aclDomain.realms.add(aclRealmId);
      aclDomain.bs.referredByAgent = 2;

      // Create Realm ACL
      RealmEntity storage aclRealm = _data.realmWriteSlot(aclRealmId);
      aclRealm.name = "REALM.LIVELY_VERSE.LIVELY_GUARD.ACL";
      aclRealm.contextLimit = 128;
      aclRealm.domainId = aclDomainId;
      aclRealm.bs.stype = ScopeType.REALM;
      aclRealm.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclRealm.bs.acstat = ActivityStatus.ENABLED;
      aclRealm.bs.adminId = aclTypeId;
      aclRealm.contexts.add(aclContextManagerId);
      aclRealm.contexts.add(aclFunctionManagerId);
    }

    {
      // Create ContextManagerTest Context ACL
      ContextEntity storage aclContextManagerEntity = _data.contextWriteSlot(aclContextManagerId);
      aclContextManagerEntity.realmId = aclRealmId;
      aclContextManagerEntity.contractId = contextManagerAddress;
      aclContextManagerEntity.functionLimit = type(uint8).max;
      aclContextManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclContextManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclContextManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclContextManagerEntity.bs.adminId = aclTypeId;
      aclContextManagerEntity.functions.add(aclContextRegisterId);

      // Create FunctionManagerTest Context ACL
      ContextEntity storage aclFunctionManagerEntity = _data.contextWriteSlot(aclFunctionManagerId);
      aclFunctionManagerEntity.realmId = aclRealmId;
      aclFunctionManagerEntity.contractId = functionManagerAddress;
      aclFunctionManagerEntity.functionLimit = type(uint8).max;
      aclFunctionManagerEntity.bs.stype = ScopeType.CONTEXT;
      aclFunctionManagerEntity.bs.alstat = AlterabilityStatus.UPGRADABLE;
      aclFunctionManagerEntity.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionManagerEntity.bs.adminId = aclTypeId;
      aclFunctionManagerEntity.functions.add(aclFunctionRegisterId);

      // Create Function ContextRegister ACL
      FunctionEntity storage functionContextRegisterEntity = _data.functionWriteSlot(aclContextRegisterId);
      functionContextRegisterEntity.contextId = aclContextManagerId;
      functionContextRegisterEntity.policyCode = 250;
      functionContextRegisterEntity.selector = IContextManagementTest.contextRegister.selector;
      functionContextRegisterEntity.bs.stype = ScopeType.FUNCTION;
      functionContextRegisterEntity.bs.alstat = AlterabilityStatus.UPDATABLE;
      functionContextRegisterEntity.bs.acstat = ActivityStatus.ENABLED;
      functionContextRegisterEntity.bs.adminId = aclTypeId;
      functionContextRegisterEntity.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;

      // Create Function FunctionRegister ACL
      FunctionEntity storage aclFunctionRegister = _data.functionWriteSlot(aclFunctionRegisterId);
      aclFunctionRegister.contextId = aclContextManagerId;
      aclFunctionRegister.policyCode = 250;
      aclFunctionRegister.selector = IFunctionManagementTest.functionRegister.selector;
      aclFunctionRegister.bs.stype = ScopeType.FUNCTION;
      aclFunctionRegister.bs.alstat = AlterabilityStatus.UPDATABLE;
      aclFunctionRegister.bs.acstat = ActivityStatus.ENABLED;
      aclFunctionRegister.bs.adminId = aclTypeId;
      aclFunctionRegister.agentId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
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

      // Create Admin Role
      bytes32 aclAdminRoleId = LACLUtilsTest.generateId2("ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN");
      RoleEntity storage aclAdminRole = _data.roleWriteSlot(aclAdminRoleId);
      aclAdminRole.name = "ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN";
      aclAdminRole.scopeId = aclDomainId;
      aclAdminRole.typeId = aclTypeId;
      aclAdminRole.memberLimit = type(uint24).max;
      aclAdminRole.memberCount = 1;
      aclAdminRole.ba.atype = AgentType.ROLE;
      aclAdminRole.ba.acstat = ActivityStatus.ENABLED;
      aclAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
      aclAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

      // acl
      aclType.roles.add(aclAdminRoleId);
      aclType.members[livelyMasterAdminMemberId] = aclAdminRoleId;
    }
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommonsTest);
  }
}
