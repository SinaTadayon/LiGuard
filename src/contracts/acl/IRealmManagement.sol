// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IRealmManagement {
    event RealmRegistered(bytes32 indexed realm, address indexed sender, string name, bool status, bool isUpgradable);

    event RealmStatChanged(bytes32 indexed realm, address indexed sender, bool status);

    event RealmUpgradeStatChanged(bytes32 indexed realm, address indexed sender, bool status);

    function registerRealm(
        string calldata name,
        bool status,
        bool isUpgradable
    ) external returns (bytes32);

    function setRealmStat(bytes32 realm, bool status) external returns (bool);

    function setRealmUpgradeStat(bytes32 realm, bool status) external returns (bool);

    function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool);

    function getRealm(bytes32 realm)
        external
        view
        returns (
            string memory,
            bool,
            bool
        );

    function getRealmContexts(bytes32 realm) external view returns (bytes32[] memory);
}
