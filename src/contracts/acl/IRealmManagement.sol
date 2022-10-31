// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IRealmManagement {
  event RealmRegistered(bytes32 indexed realm, address indexed sender, string name, bool status, bool isUpgradable);

  event RealmStatusChanged(bytes32 indexed realm, address indexed sender, bool status);

  event RealmUpgradeStatusChanged(bytes32 indexed realm, address indexed sender, bool status);

  function registerRealm(
    string calldata name,
    bool status,
    bool isUpgradable
  ) external returns (bytes32);

  function setRealmStatus(bytes32 realm, bool status) external returns (bool);

  function setRealmUpgradeStatus(bytes32 realm, bool status) external returns (bool);

  function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool);

  function getRealmInfo(bytes32 realm)
    external
    view
    returns (
      string memory,
      bool,
      bool
    );

  function getRealmContexts(bytes32 realm) external view returns (bytes32[] memory);
}
