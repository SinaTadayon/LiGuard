// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IBaseProxy.sol";

interface IProxy is IBaseProxy {
  /**
   * @dev Emitted when the admin account has changed.
   */
  event LocalAdminChanged(address indexed sender, address indexed proxy, address newAdmin);

  event SafeModeChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool status);

  event UpgradeStatusChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool status);

  /**
   * @dev Triggered when the contract has been initialized or reinitialized.
   */
  event Initialized(
    address indexed sender,
    address indexed proxy,
    address indexed subject,
    string name,
    string version,
    bytes32 realm,
    uint16 initCount
  );

  function upgradeTo(
    address newImplementation,
    bytes memory data,
    bool forceCall
  ) external returns (bytes memory);

  function setSafeMode(bool status) external returns (bool);

  function setUpgradeStatus(bool status) external returns (bool);

  function setLocalAdmin(address newAdmin) external returns (bool);

  function contractName() external view returns (bytes32);

  function contractVersion() external view returns (bytes32);

  function contractRealm() external view returns (bytes32);

  function contractContext() external view returns (bytes32);

  function accessControlManager() external view returns (address);

  function subjectAddress() external view returns (address);

  function isSafeMode() external view returns (bool);

  function isUpgradable() external view returns (bool);

  function localAdmin() external view returns (address);

  function domainSeparator() external view returns (bytes32);

  function initVersion() external view returns (uint16);
}
