// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Base Proxy Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IBaseProxy {
  enum ProxySafeModeStatus {
    DISABLED,
    ENABLED
  }

  enum ProxyUpdatabilityStatus {
    DISABLED,
    ENABLED
  }

  event ProxyUpgraded(address indexed sender, address indexed proxy, address indexed newImplementation);
}
