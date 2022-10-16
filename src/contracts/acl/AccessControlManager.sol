// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAccessControl.sol";
import "./AccessControlStorage.sol";
import "./IGroupManagement.sol";
import "./IRealmManagement.sol";
import "./IRoleManagement.sol";
import "./IContextManagement.sol";
import "../lib/struct/LEnumerableSet.sol";
import "../lib/struct/LEnumerableMap.sol";
import "../lib/acl/LContextManagement.sol";
import "../lib/acl/LRoleManagement.sol";
import "../lib/acl/LGroupManagement.sol";
import "../lib/acl/LRealmManagement.sol";
import "../lib/acl/LAccessControl.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

contract AccessControlManager is
  AccessControlStorage,
  BaseUUPSProxy,
  IContextManagement,
  IAccessControl,
  IGroupManagement,
  IRealmManagement,
  IRoleManagement
{
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableMap for LEnumerableMap.Bytes32ToBytes32Map;
  using LEnumerableMap for LEnumerableMap.AddressToUintMap;

  constructor() {}

  function initialize(
    string calldata domainName,
    string calldata domainVersion,
    string calldata domainRealm,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(domainRealm));

    LAccessControl.initializeContext(_dataMaps);

    __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);

    RequestRegisterContext[] memory rc = LAccessControl.createRequestContext();
    LContextManagement.registerAccessControlManagerContext(_dataMaps, address(this), realm, rc);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      domainName,
      domainVersion,
      realm,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
      interfaceId == type(IAccessControl).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
      interfaceId == type(IRoleManagement).interfaceId ||
      interfaceId == type(IGroupManagement).interfaceId ||
      interfaceId == type(IRealmManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function hasAccess(
    bytes32 context,
    address account,
    bytes4 signature
  ) external view returns (bool) {
    return LAccessControl.hasAccess(_dataMaps, context, account, signature);
  }

  function isLivelySystemAdminRole(address account) external view returns (bool) {
    return LAccessControl.isLivelySystemAdminRole(_dataMaps, account);
  }

  function isLivelyAdminRole(address account) external view returns (bool) {
    return LAccessControl.isLivelyAdminRole(_dataMaps, account);
  }

  function isLivelyAssetManagerRole(address account) external view returns (bool) {
    return LAccessControl.isLivelyAssetManagerRole(_dataMaps, account);
  }

  function isLivelyAssetAdminRole(address account) external view returns (bool) {
    return LAccessControl.isLivelyAssetAdminRole(_dataMaps, account);
  }

  function isLivelyCommunityDaoRole(address account) external view returns (bool) {
    return LAccessControl.isLivelyCommunityDaoRole(_dataMaps, account);
  }

  function isLivelyCommunityDaoExecutorRole(address account) external view returns (bool) {
    return LAccessControl.isLivelyCommunityDaoExecutorRole(_dataMaps, account);
  }

  function isLivelyGeneralGroup(bytes32 role) external view returns (bool) {
    return LAccessControl.isLivelyGeneralGroup(_dataMaps, role);
  }

  function isLivelyDaoGroup(bytes32 role) external view returns (bool) {
    return LAccessControl.isLivelyDaoGroup(_dataMaps, role);
  }

  function isLivelyAssetGroup(bytes32 role) external view returns (bool) {
    return LAccessControl.isLivelyAssetGroup(_dataMaps, role);
  }

  function isLivelyGeneralRealm(bytes32 context) external view returns (bool) {
    return LAccessControl.isLivelyGeneralRealm(_dataMaps, context);
  }

  function isLivelyAssetRealm(bytes32 context) external view returns (bool) {
    return LAccessControl.isLivelyAssetRealm(_dataMaps, context);
  }

  function isContextSafeMode(bytes32 context) external view returns (bool) {
    return LAccessControl.isContextSafeMode(_dataMaps, context);
  }

  function isContextUpgradable(bytes32 context) external view returns (bool) {
    return LAccessControl.isContextUpgradable(_dataMaps, context);
  }

  function isRealmUpgradable(bytes32 realm) external view returns (bool) {
    return LAccessControl.isRealmUpgradable(_dataMaps, realm);
  }

  function isGroupExists(bytes32 group) external view returns (bool) {
    return LAccessControl.isGroupExists(_dataMaps, group);
  }

  function isGroupEnabled(bytes32 group) external view returns (bool) {
    return LAccessControl.isGroupEnabled(_dataMaps, group);
  }

  function isContextExists(bytes32 context) external view returns (bool) {
    return LAccessControl.isContextExists(_dataMaps, context);
  }

  function isContextFunctionExists(bytes32 context, bytes4 functionSelector) external view returns (bool) {
    return LAccessControl.isContextFunctionExists(_dataMaps, context, functionSelector);
  }

  function isContextFunctionEnabled(bytes32 context, bytes4 functionSelector) external view returns (bool) {
    return LAccessControl.isContextFunctionEnabled(_dataMaps, context, functionSelector);
  }

  function isContextEnabled(bytes32 context) external view returns (bool) {
    return LAccessControl.isContextEnabled(_dataMaps, context);
  }

  function isRoleExists(bytes32 role) external view returns (bool) {
    return LAccessControl.isRoleExists(_dataMaps, role);
  }

  function isRoleEnabled(bytes32 role) external view returns (bool) {
    return LAccessControl.isRoleEnabled(_dataMaps, role);
  }

  function isRealmExists(bytes32 realm) external view returns (bool) {
    return LAccessControl.isRealmExists(_dataMaps, realm);
  }

  function isRealmEnabled(bytes32 realm) external view returns (bool) {
    return LAccessControl.isRealmEnabled(_dataMaps, realm);
  }

  function registerContext(
    bytes memory signature,
    RequestContext calldata rc,
    RequestRegisterContext[] calldata rrc
  ) external returns (bytes32) {
    (bytes32 context, address signer) = LContextManagement.registerContext(_dataMaps, signature, rc, rrc);
    emit ContextRegistered(context, rc.contractId, signer, _msgSender(), rc.realm);
    return context;
  }

  function registerPredictContext(
    bytes memory signature,
    RequestPredictContext calldata rpc,
    RequestRegisterContext[] calldata rrc
  ) external returns (bytes32) {
    (address contractId, bytes32 context, address signer) = LContextManagement.registerPredictContext(_dataMaps, signature, rpc, rrc);
    emit PredictContextRegistered(context, contractId, _msgSender(), signer, rpc.deployer, rpc.subject, rpc.realm);
    return context;
  }

  function updateContext(
    bytes32 ctx,
    bytes memory signature,
    RequestContext calldata rc,
    RequestUpdateContext[] calldata rcr
  ) external returns (address) {
    (address contractId, address sender) = LContextManagement.updateContext(_dataMaps, ctx, signature, rc, rcr);
    emit ContextUpdated(ctx, contractId, sender, rc.realm);
    return contractId;
  }

  function addContextFuncRole(
    bytes32 ctx,
    bytes4 functionSelector,
    bytes32 role
  ) external returns (bool) {
    bytes32 realm = LContextManagement.addContextFuncRole(_dataMaps, ctx, functionSelector, role);
    emit ContextFuncRoleAdded(ctx, role, msg.sender, functionSelector, realm);
    return true;
  }

  function removeContextFunc(bytes32 ctx, bytes4 functionSelector) external returns (bool) {
    bytes32 realm = LContextManagement.removeContextFunc(_dataMaps, ctx, functionSelector);
    emit ContextFuncRemoved(ctx, msg.sender, functionSelector, realm);
    return true;
  }

  function grantContextRole(
    bytes32 ctx,
    bytes4 functionSelector,
    bytes32 role
  ) external returns (bool) {
    bytes32 realm = LContextManagement.grantContextRole(_dataMaps, ctx, functionSelector, role);
    emit ContextRoleGranted(ctx, role, msg.sender, functionSelector, realm);
    return true;
  }

  function revokeContextRole(
    bytes32 ctx,
    bytes4 functionSelector,
    bytes32 role
  ) external returns (bool) {
    bytes32 realm = LContextManagement.revokeContextRole(_dataMaps, ctx, functionSelector, role);
    emit ContextRoleRevoked(ctx, role, msg.sender, functionSelector, realm);
    return true;
  }

  function setContextStatus(bytes32 ctx, bool status) external returns (bool) {
    (bool success, bytes32 realm) = LContextManagement.setContextStatus(_dataMaps, ctx, status);
    emit ContextStatusChanged(ctx, _msgSender(), realm, status);
    return success;
  }

  function setContextRealm(bytes32 ctx, bytes32 realm) external returns (bool) {
    (bool success, bytes32 oldRealm) = LContextManagement.setContextRealm(_dataMaps, ctx, realm);
    emit ContextRealmChanged(ctx, _msgSender(), realm, oldRealm);
    return success;
  }

  function hasContextRole(
    bytes32 ctx,
    bytes32 role,
    bytes4 functionSelector
  ) external view returns (bool) {
    return LContextManagement.hasContextRole(_dataMaps, ctx, role, functionSelector);
  }

  function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory) {
    return LContextManagement.getContextInfo(_dataMaps, ctx);
  }

  function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory) {
    return LContextManagement.getContextFuncs(_dataMaps, ctx);
  }

  function registerGroup(string calldata name, bool status) external returns (bytes32) {
    bytes32 group = LGroupManagement.registerGroup(_dataMaps, name, status);
    emit GroupRegistered(group, _msgSender(), name, status);
    return group;
  }

  function setGroupStatus(bytes32 group, bool status) external returns (bool) {
    emit GroupStatusChanged(group, _msgSender(), status);
    return LGroupManagement.setGroupStatus(_dataMaps, group, status);
  }

  function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool) {
    return LGroupManagement.hasGroupRole(_dataMaps, group, role);
  }

  function getGroupInfo(bytes32 group) external view returns (string memory, bool) {
    return LGroupManagement.getGroupInfo(_dataMaps, group);
  }

  function getGroupRoles(bytes32 group) external view returns (bytes32[] memory) {
    return LGroupManagement.getGroupRoles(_dataMaps, group);
  }

  function registerRealm(
    string calldata name,
    bool status,
    bool isUpgradable
  ) external returns (bytes32) {
    bytes32 realm = LRealmManagement.registerRealm(_dataMaps, name, status, isUpgradable);
    emit RealmRegistered(realm, _msgSender(), name, status, isUpgradable);
    return realm;
  }

  function setRealmStatus(bytes32 realm, bool status) external returns (bool) {
    emit RealmStatusChanged(realm, _msgSender(), status);
    return LRealmManagement.setRealmStatus(_dataMaps, realm, status);
  }

  function setRealmUpgradeStatus(bytes32 realm, bool status) external returns (bool) {
    emit RealmUpgradeStatusChanged(realm, _msgSender(), status);
    return LRealmManagement.setRealmUpgradeStatus(_dataMaps, realm, status);
  }

  function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool) {
    return LRealmManagement.hasRealmContext(_dataMaps, realm, context);
  }

  function getRealmInfo(bytes32 realm)
    external
    view
    returns (
      string memory,
      bool,
      bool
    )
  {
    return LRealmManagement.getRealmInfo(_dataMaps, realm);
  }

  function getRealmContexts(bytes32 realm) external view returns (bytes32[] memory) {
    return LRealmManagement.getRealmContexts(_dataMaps, realm);
  }

  function grantRoleAccount(bytes32 role, address account) external returns (bool) {
    emit RoleAccountGranted(_msgSender(), role, account);
    return LRoleManagement.grantRoleAccount(_dataMaps, role, account);
  }

  function batchGrantRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool) {
    for (uint i; i < requests.length; i++) {
      emit RoleAccountGranted(_msgSender(), requests[i].role, requests[i].account);
    }
    return LRoleManagement.batchGrantRoleAccount(_dataMaps, requests);    
  }

  function revokeRoleAccount(bytes32 role, address account) external returns (bool) {
    emit RoleAccountRevoked(_msgSender(), role, account);
    return LRoleManagement.revokeRoleAccount(_dataMaps, role, account);
  }

  function batchRevokeRoleAccount(UpdateRoleRequest[] calldata requests) external returns (bool) {
    for (uint i; i < requests.length; i++) {
      emit RoleAccountRevoked(_msgSender(), requests[i].role, requests[i].account);
    }
    return LRoleManagement.batchRevokeRoleAccount(_dataMaps, requests);
  }

  function registerRole(
    string calldata name,
    bytes32 group,
    bool status
  ) external returns (bytes32) {
    bytes32 role = LRoleManagement.registerRole(_dataMaps, name, group, status);
    emit RoleRegistered(_msgSender(), role, name, group, status);
    return role;
  }

  function batchRegisterRole(RegiterRoleRequest[] calldata requests) external returns(bytes32[] memory) {
    bytes32[] memory roles = LRoleManagement.batchRegisterRole(_dataMaps, requests);
    for (uint i; i < requests.length; i++) {
      emit RoleRegistered(_msgSender(), roles[i], requests[i].name, requests[i].group, requests[i].status);
    }
    
    return roles;
  }

  function setRoleStatus(bytes32 role, bool status) external returns (bool) {
    (bool success, bytes32 group) = LRoleManagement.setRoleStatus(_dataMaps, role, status);
    emit RoleStatusChanged(_msgSender(), role, group, status);
    return success;
  }

  function setRoleGroup(bytes32 role, bytes32 group) external returns (bool) {
    (bool success, bytes32 oldGroup) = LRoleManagement.setRoleGroup(_dataMaps, role, group);
    emit RoleGroupChanged(_msgSender(), role, group, oldGroup);
    return success;
  }

  function getRoleInfo(bytes32 role)
    external
    view
    returns (
      string memory,
      bytes32,
      bool
    )
  {
    return LRoleManagement.getRoleInfo(_dataMaps, role);
  }

  function getRoleAccounts(bytes32 role) external view returns (address[] memory) {
    return LRoleManagement.getRoleAccounts(_dataMaps, role);
  }

  function hasRoleAccount(bytes32 role, address account) external view returns (bool) {
    return LRoleManagement.hasRoleAccount(_dataMaps, role, account);
  }

  function getLibraries() external pure returns (address[] memory) {
    address[] memory libs = new address[](5);
    libs[0] = address(LAccessControl);
    libs[1] = address(LContextManagement);
    libs[2] = address(LRealmManagement);
    libs[3] = address(LRoleManagement);
    libs[4] = address(LGroupManagement);
    return libs;
  }
}
