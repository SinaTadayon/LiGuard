// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "./IBaseProxy.sol";

/**
 * @title Base Proxy Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProxy is IBaseProxy {
  /**
   * @dev Emitted when the admin account has changed.
   */
  event ProxyLocalAdminUpdated(address indexed sender, address indexed proxy, address newAdmin);

  event ProxySafeModeUpdated(address indexed sender, address indexed proxy, ProxySafeModeStatus smstat);

  event ProxyUpdatabilityUpdated(address indexed sender, address indexed proxy, ProxyUpdatabilityStatus ustat);

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

  function setSafeModeStatus(ProxySafeModeStatus sfstat) external returns (bool);

  function setUpdatabilityStatus(ProxyUpdatabilityStatus ustat) external returns (bool);

  function setLocalAdmin(address newAdmin) external returns (bool);

  function contractName() external view returns (string memory);

  function contractVersion() external view returns (string memory);

  function accessControlManager() external view returns (address);

  function subjectAddress() external view returns (address);

  function safeModeStatus() external returns (ProxySafeModeStatus);

  function UpdatabilityStatus() external returns (ProxyUpdatabilityStatus);

  function localAdmin() external view returns (address);

  function domainSeparator() external view returns (bytes32);

  function initVersion() external view returns (uint16);
}
