// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

// import "./IAccessControl.sol";
// import "./AclStorage.sol";
// // import "./agent/IGroupManagement.sol";
// import "./scope/IRealmManagement.sol";
// import "./agent/IRoleManagement.sol";
// import "./scope/IContextManagement.sol";
// import "../lib/struct/LEnumerableSet.sol";
// import "../lib/struct/LEnumerableMap.sol";
// import "../lib/acl/LContextManagement.sol";
// import "../lib/acl/LRoleManagement.sol";
// import "../lib/acl/LGroupManagement.sol";
// import "../lib/acl/LRealmManagement.sol";
// import "../lib/acl/LAccessControl.sol";
// import "../proxy/Initializable.sol";
// import "../proxy/BaseUUPSProxy.sol";

// /**
//  * @title Access Control Manager Contract
//  * @author Sina Tadayon, https://github.com/SinaTadayon
//  * @dev
//  *
//  */
// contract AclManager is AclStorage, BaseUUPSProxy {
//   using LEnumerableSet for LEnumerableSet.AddressSet;
//   using LEnumerableSet for LEnumerableSet.Bytes32Set;
//   using LEnumerableMap for LEnumerableMap.Bytes32ToBytes32Map;
//   using LEnumerableMap for LEnumerableMap.AddressToUintMap;

//   constructor() {}

//   function initialize(
//     string calldata contractName,
//     string calldata contractVersion,
//     string calldata contractRealm,
//     address accessControlManager
//     // uint8 initPermitRegisterContext
//   ) public onlyProxy onlyLocalAdmin initializer {
//     bytes32 realm = keccak256(abi.encodePacked(contractRealm));

//     LAccessControl.initializeContext(_data);

//     __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

//     // register proxy facet and aclManager contract functions
//     LAccessControl.registerProxyFacet(_data);
//     _data.selectors[initialize.selector] = address(this);
//     _data.selectors[supportsInterface.selector] = address(this);
//     _data.selectors[aclRegisterFacet.selector] = address(this);
//     _data.selectors[aclMigrateFacet.selector] = address(this);
//     _data.selectors[aclFirstPostInit.selector] = address(this);
//     _data.selectors[aclGetFacets.selector] = address(this);
//     _data.selectors[proxiableUUID.selector] = address(this);
//     _data.selectors[withdrawBalance.selector] = address(this);
//   }

//   /**
//    * @dev See {IERC165-supportsInterface}.
//    */
//   function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
//     return
//       interfaceId == type(IAccessControl).interfaceId ||
//       interfaceId == type(IContextManagement).interfaceId ||
//       interfaceId == type(IRoleManagement).interfaceId ||
//       interfaceId == type(IGroupManagement).interfaceId ||
//       interfaceId == type(IRealmManagement).interfaceId ||
//       super.supportsInterface(interfaceId);
//   }

//   event aclFacetRegistered(address indexed sender, address indexed facetId, bytes4 interfaceId);

//   event aclFacetMigrated(
//     address indexed sender, 
//     address indexed facetId, 
//     address indexed newFacetId,
//     bytes4 interfaceId,
//     bytes4 newInterfaceId
//   );

//   function aclRegisterFacet(FacetRegisterRequest[] calldata requests) public onlyProxy returns (bool) {
//     if(_firstInit) {
//       require(_getLocalAdmin() == _msgSender(), "Caller Not Authorized");      
//       _firstInit = false;
//       return _doAclRegisterFacet(requests);
//     } else {
//       require(_hasPermission(this.aclRegisterFacet.selector), "Access Denied");
//       return _doAclRegisterFacet(requests);
//     }
//   }

//   function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
//     for(uint i = 0; i < requests.length; i++) {
//       require(data.interfaces[requets[i].interfaceId], "Interface Already Exist");
//       require(data.facets.contains(requets[i].facetId), "Facet Already Exist");
//       for(uint j = 0; j < requests[i].selectors.length; j++) {
//         require(data.selectors[requests[i].selectors[j]] == address(0), "Facet Selector Conflict Denied");
//         data.selectors[requests[i].selectors[j]] = facetId;
//       }
//       data.interfaces[requets[i].interfaceId];
//       data.facets.add(requets[i].facetId);
//       emit aclFacetRegistered(_msgSender(), requets[i].facetId, requets[i].interfaceId);
//     }
//     return true;      
//   }

//   function aclMigrateFacet(FacetMigrateRequest[] calldata requests) public onlyProxy aclCheck(this.aclMigrateFacet.selector) returns (bool) {
//     for(uint i = 0; i < requests.length; i++) {
//       require(data.facets.contains(requets[i].facetId), "Facet Not Found");
//       require(data.facets.contains(requets[i].newFacetId), "New Facet Already Exist");
//       require(data.interfaces[requets[i].interfaceId] != address(0), "Interface Not Found");
//       require(data.interfaces[requets[i].newInterfaceId] == address(0), "New Interface Already Exist");
//       for(uint j = 0; j < requests[i].migrations.length; j++) {
//         if (requests[i].migrations[j].action == ActionType.REMOVE) {
//           for(uint z = 0; z < requests[i].migrations[j].length; z++) {
//             require(data.selectors[requests[i].migrations[j].selectors[z]] != address(0), "Facet Selector Not Found");
//             delete data.selectors[requests[i].migrations[j].selectors[z]];
//           }
//         } else if (requests[i].migrations[j].action == ActionType.UPDATE) {
//           for(uint z = 0; z < requests[i].migrations[j].length; z++) {
//             require(data.selectors[requests[i].migrations[j].selectors[z]] != address(0), "Facet Selector Not Found");
//             data.selectors[requests[i].migrations[j].selectors[z]] = requets[i].newFacetId; 
//           }
//         } else if (requests[i].migrations[j].action == ActionType.ADD) {
//           for(uint z = 0; z < requests[i].migrations[j].length; z++) {
//             require(data.selectors[requests[i].migrations[j].selectors[z]] == address(0), "Facet Selector Conflict Denied");
//             data.selectors[requests[i].migrations[j].selectors[z]] = requets[i].newFacetId; 
//           }
//         } 
//       }
//       delete data.interfaces[requets[i].interfaceId];
//       data.interfaces[requets[i].newInterfaceId] = requets[i].newFacetId; 
//       data.facets.remove(requets[i].facetId);
//       data.facets.add(requets[i].newFacetId);

//       // IAclFacet(requets[i].newFacetId).
//       emit aclFacetMigrated(_msgSender(), requets[i].facetId, requets[i].newFacetId);
//     }
//   }

//   // TODO 
//   function aclFirstPostInit() public onlyProxy onlyLocalAdmin returns (bool) {
//     require(_firstInit, "FirstPostInit Already Called");

//     // create acl request context
//     RequestRegisterContext[] memory rc = LAccessControl.createRequestContext();
//     LContextManagement.registerAccessControlManagerContext(_data, address(this), realm, rc);

//     _firstInit = true;
//     emit Initialized(
//       _msgSender(),
//       address(this),
//       _implementation(),
//       contractName,
//       contractVersion,
//       realm,
//       _getInitializedCount()
//     );
//   }

//   function aclGetFacets() public returns (address[] memory) {
//     return data.facets.values();
//   }

//   // function createFacetRegisterRequest() public returns (FacetRegisterRequest) {}

//   // function createFacetUpgradeRequest() public returns (FacetMigrateRequest) {}

//   // function createContextRegisterFacetRequest() public returns (ContextRegisterFunctionRequest) {}

//   // function createContextUpgradeFacetRequest() public returns (ContextUpgradeFunctionRequest) {}


//   // function hasAccess(
//   //   bytes32 context,
//   //   address account,
//   //   bytes4 signature
//   // ) external view returns (bool) {
//   //   return LAccessControl.hasAccess(_data, context, account, signature);
//   // }

//   // function isLivelySystemAdminRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelySystemAdminRole(_data, account);
//   // }

//   // function isLivelyAdminRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelyAdminRole(_data, account);
//   // }

//   // function isLivelyAssetManagerRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelyAssetManagerRole(_data, account);
//   // }

//   // function isLivelyAssetAdminRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelyAssetAdminRole(_data, account);
//   // }

//   // function isLivelyCommunityDaoRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelyCommunityDaoRole(_data, account);
//   // }

//   // function isLivelyCommunityDaoExecutorRole(address account) external view returns (bool) {
//   //   return LAccessControl.isLivelyCommunityDaoExecutorRole(_data, account);
//   // }

//   // function isLivelyGeneralGroup(bytes32 role) external view returns (bool) {
//   //   return LAccessControl.isLivelyGeneralGroup(_data, role);
//   // }

//   // function isLivelyDaoGroup(bytes32 role) external view returns (bool) {
//   //   return LAccessControl.isLivelyDaoGroup(_data, role);
//   // }

//   // function isLivelyAssetGroup(bytes32 role) external view returns (bool) {
//   //   return LAccessControl.isLivelyAssetGroup(_data, role);
//   // }

//   // function isLivelyGeneralRealm(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isLivelyGeneralRealm(_data, context);
//   // }

//   // function isLivelyAssetRealm(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isLivelyAssetRealm(_data, context);
//   // }

//   // function isContextSafeMode(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isContextSafeMode(_data, context);
//   // }

//   // function isContextUpgradable(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isContextUpgradable(_data, context);
//   // }

//   // function isRealmUpgradable(bytes32 realm) external view returns (bool) {
//   //   return LAccessControl.isRealmUpgradable(_data, realm);
//   // }

//   // function isGroupExists(bytes32 group) external view returns (bool) {
//   //   return LAccessControl.isGroupExists(_data, group);
//   // }

//   // function isGroupEnabled(bytes32 group) external view returns (bool) {
//   //   return LAccessControl.isGroupEnabled(_data, group);
//   // }

//   // function isContextExists(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isContextExists(_data, context);
//   // }

//   // function isContextFunctionExists(bytes32 context, bytes4 functionSelector) external view returns (bool) {
//   //   return LAccessControl.isContextFunctionExists(_data, context, functionSelector);
//   // }

//   // function isContextFunctionEnabled(bytes32 context, bytes4 functionSelector) external view returns (bool) {
//   //   return LAccessControl.isContextFunctionEnabled(_data, context, functionSelector);
//   // }

//   // function isContextEnabled(bytes32 context) external view returns (bool) {
//   //   return LAccessControl.isContextEnabled(_data, context);
//   // }

//   // function isRoleExists(bytes32 role) external view returns (bool) {
//   //   return LAccessControl.isRoleExists(_data, role);
//   // }

//   // function isRoleEnabled(bytes32 role) external view returns (bool) {
//   //   return LAccessControl.isRoleEnabled(_data, role);
//   // }

//   // function isRealmExists(bytes32 realm) external view returns (bool) {
//   //   return LAccessControl.isRealmExists(_data, realm);
//   // }

//   // function isRealmEnabled(bytes32 realm) external view returns (bool) {
//   //   return LAccessControl.isRealmEnabled(_data, realm);
//   // }

//   // function setPermitRegisterContext(uint8 contextCount) external returns (bool) {
//   //   emit PermitRegisterContextUpdated(_msgSender(), contextCount);
//   //   return LContextManagement.setPermitRegisterContext(_data, contextCount);
//   // }

//   // function registerContext(
//   //   bytes memory signature,
//   //   RequestContext calldata rc,
//   //   RequestRegisterContext[] calldata rrc
//   // ) external returns (bytes32) {
//   //   (bytes32 context, address signer) = LContextManagement.registerContext(_data, signature, rc, rrc);
//   //   emit ContextRegistered(context, rc.contractId, signer, _msgSender(), rc.realm);
//   //   return context;
//   // }

//   // function registerPredictContext(
//   //   bytes memory signature,
//   //   RequestPredictContext calldata rpc,
//   //   RequestRegisterContext[] calldata rrc
//   // ) external returns (bytes32) {
//   //   (address contractId, bytes32 context, address signer) = LContextManagement.registerPredictContext(
//   //     _data,
//   //     signature,
//   //     rpc,
//   //     rrc
//   //   );
//   //   emit PredictContextRegistered(context, contractId, _msgSender(), signer, rpc.deployer, rpc.subject, rpc.realm);
//   //   return context;
//   // }

//   // function updateContext(
//   //   bytes memory signature,
//   //   RequestContext calldata rc,
//   //   RequestUpdateContext[] calldata rcr
//   // ) external returns (address) {
//   //   (address contractId, address sender) = LContextManagement.updateContext(_data, signature, rc, rcr);
//   //   emit ContextUpdated(LContextUtils.generateCtx(_msgSender()), contractId, sender, rc.realm);
//   //   return contractId;
//   // }

//   // function addContextFuncRole(
//   //   bytes32 ctx,
//   //   bytes4 functionSelector,
//   //   bytes32 role
//   // ) external returns (bool) {
//   //   bytes32 realm = LContextManagement.addContextFuncRole(_data, ctx, functionSelector, role);
//   //   emit ContextFuncRoleAdded(ctx, role, msg.sender, functionSelector, realm);
//   //   return true;
//   // }

//   // function removeContextFunc(bytes32 ctx, bytes4 functionSelector) external returns (bool) {
//   //   bytes32 realm = LContextManagement.removeContextFunc(_data, ctx, functionSelector);
//   //   emit ContextFuncRemoved(ctx, msg.sender, functionSelector, realm);
//   //   return true;
//   // }

//   // function grantContextRole(
//   //   bytes32 ctx,
//   //   bytes4 functionSelector,
//   //   bytes32 role
//   // ) external returns (bool) {
//   //   bytes32 realm = LContextManagement.grantContextRole(_data, ctx, functionSelector, role);
//   //   emit ContextRoleGranted(ctx, role, msg.sender, functionSelector, realm);
//   //   return true;
//   // }

//   // function revokeContextRole(
//   //   bytes32 ctx,
//   //   bytes4 functionSelector,
//   //   bytes32 role
//   // ) external returns (bool) {
//   //   bytes32 realm = LContextManagement.revokeContextRole(_data, ctx, functionSelector, role);
//   //   emit ContextRoleRevoked(ctx, role, msg.sender, functionSelector, realm);
//   //   return true;
//   // }

//   // function setContextStatus(bytes32 ctx, bool status) external returns (bool) {
//   //   (bool success, bytes32 realm) = LContextManagement.setContextStatus(_data, ctx, status);
//   //   emit ContextStatusChanged(ctx, _msgSender(), realm, status);
//   //   return success;
//   // }

//   // function setContextRealm(bytes32 ctx, bytes32 realm) external returns (bool) {
//   //   (bool success, bytes32 oldRealm) = LContextManagement.setContextRealm(_data, ctx, realm);
//   //   emit ContextRealmChanged(ctx, _msgSender(), realm, oldRealm);
//   //   return success;
//   // }

//   // function hasContextRole(
//   //   bytes32 ctx,
//   //   bytes32 role,
//   //   bytes4 functionSelector
//   // ) external view returns (bool) {
//   //   return LContextManagement.hasContextRole(_data, ctx, role, functionSelector);
//   // }

//   // function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory) {
//   //   return LContextManagement.getContextInfo(_data, ctx);
//   // }

//   // function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory) {
//   //   return LContextManagement.getContextFuncs(_data, ctx);
//   // }

//   // function registerGroup(string calldata name, bool status) external returns (bytes32) {
//   //   bytes32 group = LGroupManagement.registerGroup(_data, name, status);
//   //   emit GroupRegistered(group, _msgSender(), name, status);
//   //   return group;
//   // }

//   // function setGroupStatus(bytes32 group, bool status) external returns (bool) {
//   //   emit GroupStatusChanged(group, _msgSender(), status);
//   //   return LGroupManagement.setGroupStatus(_data, group, status);
//   // }

//   // function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool) {
//   //   return LGroupManagement.hasGroupRole(_data, group, role);
//   // }

//   // function getGroupInfo(bytes32 group) external view returns (string memory, bool) {
//   //   return LGroupManagement.getGroupInfo(_data, group);
//   // }

//   // function getGroupRoles(bytes32 group) external view returns (bytes32[] memory) {
//   //   return LGroupManagement.getGroupRoles(_data, group);
//   // }

//   // function registerRealm(
//   //   string calldata name,
//   //   bool status,
//   //   bool isUpgradable
//   // ) external returns (bytes32) {
//   //   bytes32 realm = LRealmManagement.registerRealm(_data, name, status, isUpgradable);
//   //   emit RealmRegistered(realm, _msgSender(), name, status, isUpgradable);
//   //   return realm;
//   // }

//   // function setRealmStatus(bytes32 realm, bool status) external returns (bool) {
//   //   emit RealmStatusChanged(realm, _msgSender(), status);
//   //   return LRealmManagement.setRealmStatus(_data, realm, status);
//   // }

//   // function setRealmUpgradeStatus(bytes32 realm, bool status) external returns (bool) {
//   //   emit RealmUpgradeStatusChanged(realm, _msgSender(), status);
//   //   return LRealmManagement.setRealmUpgradeStatus(_data, realm, status);
//   // }

//   // function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool) {
//   //   return LRealmManagement.hasRealmContext(_data, realm, context);
//   // }

//   // function getRealmInfo(bytes32 realm)
//   //   external
//   //   view
//   //   returns (
//   //     string memory,
//   //     bool,
//   //     bool
//   //   )
//   // {
//   //   return LRealmManagement.getRealmInfo(_data, realm);
//   // }

//   // function getRealmContexts(bytes32 realm) external view returns (bytes32[] memory) {
//   //   return LRealmManagement.getRealmContexts(_data, realm);
//   // }

//   // function grantRoleAccount(bytes32 role, address account) external returns (bool) {
//   //   emit RoleAccountGranted(_msgSender(), role, account);
//   //   return LRoleManagement.grantRoleAccount(_data, role, account);
//   // }

//   // function batchGrantRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool) {
//   //   for (uint256 i; i < requests.length; i++) {
//   //     emit RoleAccountGranted(_msgSender(), requests[i].role, requests[i].account);
//   //   }
//   //   return LRoleManagement.batchGrantRoleAccount(_data, requests);
//   // }

//   // function revokeRoleAccount(bytes32 role, address account) external returns (bool) {
//   //   emit RoleAccountRevoked(_msgSender(), role, account);
//   //   return LRoleManagement.revokeRoleAccount(_data, role, account);
//   // }

//   // function batchRevokeRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool) {
//   //   for (uint256 i; i < requests.length; i++) {
//   //     emit RoleAccountRevoked(_msgSender(), requests[i].role, requests[i].account);
//   //   }
//   //   return LRoleManagement.batchRevokeRoleAccount(_data, requests);
//   // }

//   // function registerRole(
//   //   string calldata name,
//   //   bytes32 group,
//   //   bool status
//   // ) external returns (bytes32) {
//   //   bytes32 role = LRoleManagement.registerRole(_data, name, group, status);
//   //   emit RoleRegistered(_msgSender(), role, name, group, status);
//   //   return role;
//   // }

//   // function batchRegisterRole(RegisterRoleRequest[] calldata requests) external returns (bytes32[] memory) {
//   //   bytes32[] memory roles = LRoleManagement.batchRegisterRole(_data, requests);
//   //   for (uint256 i; i < requests.length; i++) {
//   //     emit RoleRegistered(_msgSender(), roles[i], requests[i].name, requests[i].group, requests[i].status);
//   //   }

//   //   return roles;
//   // }

//   // function setRoleStatus(bytes32 role, bool status) external returns (bool) {
//   //   (bool success, bytes32 group) = LRoleManagement.setRoleStatus(_data, role, status);
//   //   emit RoleStatusChanged(_msgSender(), role, group, status);
//   //   return success;
//   // }

//   // function setRoleGroup(bytes32 role, bytes32 group) external returns (bool) {
//   //   (bool success, bytes32 oldGroup) = LRoleManagement.setRoleGroup(_data, role, group);
//   //   emit RoleGroupChanged(_msgSender(), role, group, oldGroup);
//   //   return success;
//   // }

//   // function getRoleInfo(bytes32 role)
//   //   external
//   //   view
//   //   returns (
//   //     string memory,
//   //     bytes32,
//   //     bool
//   //   )
//   // {
//   //   return LRoleManagement.getRoleInfo(_data, role);
//   // }

//   // function getRoleAccounts(bytes32 role) external view returns (address[] memory) {
//   //   return LRoleManagement.getRoleAccounts(_data, role);
//   // }

//   // function hasRoleAccount(bytes32 role, address account) external view returns (bool) {
//   //   return LRoleManagement.hasRoleAccount(_data, role, account);
//   // }

//   // function getPermitRegisterContext() external view returns (uint8) {
//   //   return _data.permitRegisterContextCount;
//   // }

//   // function getLibraries() external pure returns (address[] memory) {
//   //   address[] memory libs = new address[](5);
//   //   libs[0] = address(LAccessControl);
//   //   libs[1] = address(LContextManagement);
//   //   libs[2] = address(LRealmManagement);
//   //   libs[3] = address(LRoleManagement);
//   //   libs[4] = address(LGroupManagement);
//   //   return libs;
//   // }
// }
