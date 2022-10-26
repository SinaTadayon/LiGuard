// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../acl/IContextManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRealmManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../LContextUtils.sol";

library LAccessControl {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LAccessControl"));
  bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

  bytes32 public constant LIVELY_GENERAL_REALM = keccak256(abi.encodePacked("LIVELY_GENERAL_REALM"));
  bytes32 public constant LIVELY_ASSET_REALM = keccak256(abi.encodePacked("LIVELY_ASSET_REALM"));

  bytes32 public constant LIVELY_GENERAL_GROUP = keccak256(abi.encodePacked("LIVELY_GENERAL_GROUP"));
  bytes32 public constant LIVELY_DAO_GROUP = keccak256(abi.encodePacked("LIVELY_DAO_GROUP"));
  bytes32 public constant LIVELY_ASSET_GROUP = keccak256(abi.encodePacked("LIVELY_ASSET_GROUP"));

  bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));

  bytes32 public constant LIVELY_ASSET_MANAGER_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_MANAGER_ROLE"));
  bytes32 public constant LIVELY_ASSET_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_ADMIN_ROLE"));

  bytes32 public constant LIVELY_COMMUNITY_DAO_ROLE = keccak256(abi.encodePacked("LIVELY_COMMUNITY_DAO_ROLE"));
  bytes32 public constant LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE =
    keccak256(abi.encodePacked("LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE"));

  bytes32 public constant LIVELY_ANONYMOUS_ROLE = keccak256(abi.encodePacked("LIVELY_ANONYMOUS_ROLE"));

  function initializeContext(AccessControlStorage.DataCollections storage data) external {
    data.accountMap[msg.sender][LIVELY_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;
    data.accountMap[msg.sender][LIVELY_SYSTEM_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;

    data.roleMap[LIVELY_ADMIN_ROLE].name = "LIVELY_ADMIN_ROLE";
    data.roleMap[LIVELY_ADMIN_ROLE].isEnabled = true;
    data.roleMap[LIVELY_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
    data.roleMap[LIVELY_ADMIN_ROLE].accountSet.add(msg.sender);

    data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].name = "LIVELY_SYSTEM_ADMIN_ROLE";
    data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].isEnabled = true;
    data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
    data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].accountSet.add(msg.sender);

    data.roleMap[LIVELY_ASSET_MANAGER_ROLE].name = "LIVELY_ASSET_MANAGER_ROLE";
    data.roleMap[LIVELY_ASSET_MANAGER_ROLE].isEnabled = true;
    data.roleMap[LIVELY_ASSET_MANAGER_ROLE].group = LIVELY_ASSET_GROUP;

    data.roleMap[LIVELY_ASSET_ADMIN_ROLE].name = "LIVELY_ASSET_ADMIN_ROLE";
    data.roleMap[LIVELY_ASSET_ADMIN_ROLE].isEnabled = true;
    data.roleMap[LIVELY_ASSET_ADMIN_ROLE].group = LIVELY_ASSET_GROUP;

    data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].name = "LIVELY_COMMUNITY_DAO_ROLE";
    data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].isEnabled = true;
    data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].group = LIVELY_DAO_GROUP;

    data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].name = "LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE";
    data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].isEnabled = true;
    data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].group = LIVELY_DAO_GROUP;

    data.roleMap[LIVELY_ANONYMOUS_ROLE].name = "LIVELY_ANONYMOUS_ROLE";
    data.roleMap[LIVELY_ANONYMOUS_ROLE].isEnabled = true;
    data.roleMap[LIVELY_ANONYMOUS_ROLE].group = LIVELY_GENERAL_GROUP;

    data.groupMap[LIVELY_GENERAL_GROUP].name = "LIVELY_GENERAL_GROUP";
    data.groupMap[LIVELY_GENERAL_GROUP].isEnabled = true;
    data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_ADMIN_ROLE);
    data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_SYSTEM_ADMIN_ROLE);

    data.groupMap[LIVELY_DAO_GROUP].name = "LIVELY_DAO_GROUP";
    data.groupMap[LIVELY_DAO_GROUP].isEnabled = true;
    data.groupMap[LIVELY_DAO_GROUP].roleSet.add(LIVELY_COMMUNITY_DAO_ROLE);
    data.groupMap[LIVELY_DAO_GROUP].roleSet.add(LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE);

    data.groupMap[LIVELY_ASSET_GROUP].name = "LIVELY_ASSET_GROUP";
    data.groupMap[LIVELY_ASSET_GROUP].isEnabled = true;
    data.groupMap[LIVELY_ASSET_GROUP].roleSet.add(LIVELY_ASSET_MANAGER_ROLE);
    data.groupMap[LIVELY_ASSET_GROUP].roleSet.add(LIVELY_ASSET_ADMIN_ROLE);

    data.realmMap[LIVELY_GENERAL_REALM].name = "LIVELY_GENERAL_REALM";
    data.realmMap[LIVELY_GENERAL_REALM].isEnabled = true;
    data.realmMap[LIVELY_GENERAL_REALM].isUpgradable = true;
    data.realmMap[LIVELY_GENERAL_REALM].ctxSet.add(LContextUtils.generateCtx(address(this)));

    data.realmMap[LIVELY_ASSET_REALM].name = "LIVELY_ASSET_REALM";
    data.realmMap[LIVELY_ASSET_REALM].isEnabled = true;
    data.realmMap[LIVELY_ASSET_REALM].isUpgradable = true;
  }

  function createRequestContext() external pure returns (IContextManagement.RequestRegisterContext[] memory) {
    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](2);
    rrc[0].role = LIVELY_ADMIN_ROLE;
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](22);
    rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
    rrc[0].funcSelectors[1] = IProxy.setSafeMode.selector;
    rrc[0].funcSelectors[2] = IContextManagement.addContextFuncRole.selector;
    rrc[0].funcSelectors[3] = IContextManagement.removeContextFunc.selector;
    rrc[0].funcSelectors[4] = IContextManagement.grantContextRole.selector;
    rrc[0].funcSelectors[5] = IContextManagement.revokeContextRole.selector;
    rrc[0].funcSelectors[6] = IContextManagement.setContextRealm.selector;
    rrc[0].funcSelectors[7] = IContextManagement.setContextStatus.selector;
    rrc[0].funcSelectors[8] = IRoleManagement.registerRole.selector;
    rrc[0].funcSelectors[9] = IRoleManagement.batchRegisterRole.selector;
    rrc[0].funcSelectors[10] = IRoleManagement.grantRoleAccount.selector;
    rrc[0].funcSelectors[11] = IRoleManagement.batchGrantRoleAccount.selector;
    rrc[0].funcSelectors[12] = IRoleManagement.revokeRoleAccount.selector;
    rrc[0].funcSelectors[13] = IRoleManagement.batchRevokeRoleAccount.selector;
    rrc[0].funcSelectors[14] = IRoleManagement.setRoleStatus.selector;
    rrc[0].funcSelectors[15] = IRoleManagement.setRoleGroup.selector;
    rrc[0].funcSelectors[16] = IGroupManagement.registerGroup.selector;
    rrc[0].funcSelectors[17] = IGroupManagement.setGroupStatus.selector;
    rrc[0].funcSelectors[18] = IRealmManagement.registerRealm.selector;
    rrc[0].funcSelectors[19] = IRealmManagement.setRealmStatus.selector;
    rrc[0].funcSelectors[20] = IRealmManagement.setRealmUpgradeStatus.selector;
    rrc[0].funcSelectors[21] = bytes4(keccak256("withdrawBalance(address)"));

    rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](4);
    rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
    rrc[1].funcSelectors[2] = IContextManagement.registerContext.selector;
    rrc[1].funcSelectors[3] = IContextManagement.updateContext.selector;

    return rrc;
  }

  function hasAccess(
    AccessControlStorage.DataCollections storage data,
    bytes32 context,
    address account,
    bytes4 signature
  ) external view returns (bool) {
    bytes32 role = data.ctxMap[context].resources[signature].role;
    if (role == LIVELY_ANONYMOUS_ROLE) {
      return
        data.ctxMap[context].isEnabled &&
        data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED;
    } else {
      return
        data.ctxMap[context].isEnabled &&
        data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED &&
        data.realmMap[data.ctxMap[context].realm].isEnabled &&
        data.groupMap[data.roleMap[role].group].isEnabled &&
        data.accountMap[account][role] == AccessControlStorage.Status.ENABLED;
    }
  }

  function isLivelySystemAdminRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_SYSTEM_ADMIN_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyAdminRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_ADMIN_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyAssetManagerRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_ASSET_MANAGER_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyAssetAdminRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_ASSET_ADMIN_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyCommunityDaoRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_COMMUNITY_DAO_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyCommunityDaoExecutorRole(AccessControlStorage.DataCollections storage data, address account)
    external
    view
    returns (bool)
  {
    return data.accountMap[account][LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE] == AccessControlStorage.Status.ENABLED;
  }

  function isLivelyGeneralGroup(AccessControlStorage.DataCollections storage data, bytes32 role)
    external
    view
    returns (bool)
  {
    return data.groupMap[LIVELY_GENERAL_GROUP].roleSet.contains(role);
  }

  function isLivelyAssetGroup(AccessControlStorage.DataCollections storage data, bytes32 role)
    external
    view
    returns (bool)
  {
    return data.groupMap[LIVELY_ASSET_GROUP].roleSet.contains(role);
  }

  function isLivelyDaoGroup(AccessControlStorage.DataCollections storage data, bytes32 role)
    external
    view
    returns (bool)
  {
    return data.groupMap[LIVELY_DAO_GROUP].roleSet.contains(role);
  }

  function isLivelyGeneralRealm(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return data.realmMap[LIVELY_GENERAL_REALM].ctxSet.contains(context);
  }

  function isLivelyAssetRealm(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return data.realmMap[LIVELY_ASSET_REALM].ctxSet.contains(context);
  }

  function isContextSafeMode(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return IProxy(data.ctxMap[context].contractId).isSafeMode();
  }

  function isContextUpgradable(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return IProxy(data.ctxMap[context].contractId).isUpgradable();
  }

  function isRealmUpgradable(AccessControlStorage.DataCollections storage data, bytes32 realm)
    external
    view
    returns (bool)
  {
    if (bytes(data.realmMap[realm].name).length == 0) return false;
    return data.realmMap[realm].isUpgradable;
  }

  function isGroupExists(AccessControlStorage.DataCollections storage data, bytes32 group)
    external
    view
    returns (bool)
  {
    return bytes(data.groupMap[group].name).length > 0;
  }

  function isGroupEnabled(AccessControlStorage.DataCollections storage data, bytes32 group)
    external
    view
    returns (bool)
  {
    return bytes(data.groupMap[group].name).length > 0 && data.groupMap[group].isEnabled;
  }

  function isContextExists(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return data.ctxMap[context].contractId != address(0);
  }

  function isContextFunctionExists(
    AccessControlStorage.DataCollections storage data,
    bytes32 context,
    bytes4 functionSelector
  ) external view returns (bool) {
    return data.ctxMap[context].contractId != address(0) && data.ctxMap[context].funcSet.contains(functionSelector);
  }

  function isContextFunctionEnabled(
    AccessControlStorage.DataCollections storage data,
    bytes32 context,
    bytes4 functionSelector
  ) external view returns (bool) {
    return
      data.ctxMap[context].contractId != address(0) &&
      data.ctxMap[context].resources[functionSelector].status == AccessControlStorage.Status.ENABLED;
  }

  function isContextEnabled(AccessControlStorage.DataCollections storage data, bytes32 context)
    external
    view
    returns (bool)
  {
    return data.ctxMap[context].contractId != address(0) && data.ctxMap[context].isEnabled;
  }

  function isRoleExists(AccessControlStorage.DataCollections storage data, bytes32 role) external view returns (bool) {
    return bytes(data.roleMap[role].name).length > 0;
  }

  function isRoleEnabled(AccessControlStorage.DataCollections storage data, bytes32 role) external view returns (bool) {
    return bytes(data.roleMap[role].name).length > 0 && data.roleMap[role].isEnabled;
  }

  function isRealmExists(AccessControlStorage.DataCollections storage data, bytes32 realm)
    external
    view
    returns (bool)
  {
    return bytes(data.realmMap[realm].name).length > 0;
  }

  function isRealmEnabled(AccessControlStorage.DataCollections storage data, bytes32 realm)
    external
    view
    returns (bool)
  {
    return bytes(data.realmMap[realm].name).length > 0 && data.realmMap[realm].isEnabled;
  }
}
