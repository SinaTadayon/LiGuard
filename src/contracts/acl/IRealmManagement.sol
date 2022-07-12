// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IRealmManagement {

    event RealmRegistered(bytes32 indexed realm, address indexed sender, string name, bool isEnabled);

    event RealmContextGranted(bytes32 indexed realm, bytes32 indexed context, address indexed sender);

    event RealmRoleRevoked(bytes32 indexed realm, bytes32 indexed context, address indexed sender);

    event RealmEnabled(bytes32 indexed realm, address indexed sender);

    event RealmDisabled(bytes32 indexed realm, address indexed sender);

    event RealmUpgradeEnabled(bytes32 indexed realm, address indexed sender);

    
    function addRealm(string calldata name, bool isEnabled) external returns (bytes32);

    function grantRealmContext(bytes32 realm, bytes32 context) external returns (bool);

    function revokeRealmContext(bytes32 realm, bytes32 context) external returns (bool);

    function enabledRealm(bytes32 realm) external returns (bool);

    function disabledRealm(bytes32 realm) external returns (bool);

    function enableUpgradeRealm(bytes32 realm) external returns (bool);

    function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool);

    function getRealm(bytes32 realm) external view returns (string calldata, bool);

    function getRealmContextes(bytes32 realm) external view returns (bytes32[] calldata);

}