// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IAccessControl {
  /**
   * @dev Function called by apps to check ACL
   * @return boolean indicating whether the ACL allows
   */
  function hasAccess(
    bytes32 context,
    address account,
    bytes4 signature
  ) external view returns (bool);

  function isLivelySystemAdmin(address account) external view returns (bool);

  function isLivelyAdmin(address account) external view returns (bool);

  function isLivelyAssetManager(address account) external view returns (bool);

  function isLivelyDao(address account) external view returns (bool);

  function isLivelyDaoExecutor(address account) external view returns (bool);

  function isLivelyGeneralGroup(bytes32 role) external view returns (bool);

  function isLivelyGeneralRealm(bytes32 context) external view returns (bool);

  function isContextSafeMode(bytes32 context) external view returns (bool);

  function isContextUpgradable(bytes32 context) external view returns (bool);

  function isContextExists(bytes32 context) external view returns (bool);

  function isContextFunctionExists(bytes32 context, bytes4 functionSelector) external view returns (bool);

  function isContextFunctionEnabled(bytes32 context, bytes4 functionSelector) external view returns (bool);

  function isContextEnabled(bytes32 context) external view returns (bool);

  function isGroupExists(bytes32 group) external view returns (bool);

  function isGroupEnabled(bytes32 group) external view returns (bool);

  function isRoleExists(bytes32 role) external view returns (bool);

  function isRoleEnabled(bytes32 role) external view returns (bool);

  function isRealmExists(bytes32 realm) external view returns (bool);

  function isRealmEnabled(bytes32 realm) external view returns (bool);

  function isRealmUpgradable(bytes32 realm) external view returns (bool);

  function livelyGeneralRealmRole() external pure returns (bytes32);

  function livelyGeneralGroupRole() external pure returns (bytes32);

  function livelySystemAdminRole() external pure returns (bytes32);

  function livelyAdminRole() external pure returns (bytes32);

  function livelyAssetManagerRole() external pure returns (bytes32);

  function livelyDaoRole() external pure returns (bytes32);

  function livelyDaoExecutorRole() external pure returns (bytes32);

  function livelyAnonymousRole() external pure returns (bytes32);
}
