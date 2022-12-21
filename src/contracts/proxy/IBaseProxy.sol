// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Base Proxy Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IBaseProxy {

  enum ProxySafeModeStatus {
    NONE,
    DISABLED,
    ENABLED
  }

  enum ProxyUpgradabilityStatus {
    NONE,
    DISABLED,
    ENABLED
  }

  event ProxyUpgraded(address indexed sender, address indexed proxy, address indexed newImplementation);
}
