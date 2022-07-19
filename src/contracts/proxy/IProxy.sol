// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "./IBaseProxy.sol";

interface IProxy is IBaseProxy {
    /**
     * @dev Emitted when the admin account has changed.
     */
    event AdminChanged(address indexed sender, address indexed proxy, address newAdmin);

    event SafeModeChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool state);

    event UpgradeStateChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool state);

    // /**
    //  * @dev Triggered when the contract has been initialized or reinitialized.
    //  */
    event Initialized(
        address indexed sender,
        address indexed proxy,
        address indexed subject,
        string name,
        string version,
        bytes32 realm,
        uint16 initializedCount
    );

    function upgradeTo(
        address newImplementation,
        bytes memory data,
        bool forceCall
    ) external returns (bytes memory);

    function setSafeMode(bool state) external returns (bool);

    function setUpgradeState(bool state) external returns (bool);

    function setAdmin(address newAdmin) external returns (bool);

    function contractName() external view returns (string memory);

    function contractVersion() external view returns (string memory);

    function contractRealm() external view returns (bytes32);

    function contractContext() external view returns (bytes32);

    function getAccessControlManager() external view returns (address);

    function subjectAddress() external view returns (address);

    function isSafeMode() external view returns (bool);

    function isUpgradable() external view returns (bool);

    function getAdmin() external view returns (address);

    function getInitializedVersion() external view returns (uint16);

    function getInitializeState() external view returns (bool);
}
