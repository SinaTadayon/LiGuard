// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
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

  function isLivelySystemAdminRole(address account) external view returns (bool);

  function isLivelyAdminRole(address account) external view returns (bool);

  function isLivelyAssetManagerRole(address account) external view returns (bool);

  function isLivelyAssetAdminRole(address account) external view returns (bool);

  function isLivelyCommunityDaoRole(address account) external view returns (bool);

  function isLivelyCommunityDaoExecutorRole(address account) external view returns (bool);

  function isLivelyGeneralGroup(bytes32 role) external view returns (bool);

  function isLivelyDaoGroup(bytes32 role) external view returns (bool);

  function isLivelyAssetGroup(bytes32 role) external view returns (bool);

  function isLivelyGeneralRealm(bytes32 context) external view returns (bool);

  function isLivelyAssetRealm(bytes32 context) external view returns (bool);

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
}
