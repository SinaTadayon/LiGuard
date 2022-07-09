// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

interface IProxy {

    event Upgraded(address indexed implementation);

    event ProxyUpgraded(address indexed sender, address indexed proxy, address indexed newImplementation, 
                    address oldImplementation, string newVersion, string oldVersion);

    /**
     * @dev Emitted when the admin account has changed.
     */
    event ProxyAdminChanged(address indexed sender, address indexed proxy, address previousAdmin, address newAdmin);
                    
    event ActivityChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool value);

    event UpgradablilityChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool value);

    function upgradeTo(address newImplementation, bytes memory data, bool forceInitCall) external returns (bytes memory);

    function setActivity(bool value) external returns (bool);

    function setUpgradability(bool value) external returns (bool);

    function setProxyAdmin(address newAdmin) external returns (bool);

    function registerContext() external returns (bool);

    function subjectName() external view returns (string memory);

    function subjectVersion() external view returns (string memory);

    function subjectRealm() external view returns (bytes32);

    function subjectContext() external view returns (bytes32);

    function implementation() external view returns (address);

    function isActivated() external view returns (bool);

    function isUpgradable() external view returns (bool);

    function getProxyAdmin() external view returns (address);
}