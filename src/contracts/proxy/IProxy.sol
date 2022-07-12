// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

interface IProxy {

    event Upgraded(address indexed sender, address indexed proxy, address indexed newImplementation);

    /**
     * @dev Emitted when the admin account has changed.
     */
    event AdminChanged(address indexed sender, address indexed proxy, address newAdmin);
                    
    event ActivityChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool value);

    event UpgradabilityChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool value);

    // /**
    //  * @dev Triggered when the contract has been initialized or reinitialized.
    //  */
    event Initialized(address indexed sender, address indexed proxy, address indexed subject, 
                      string name, string version, bytes32 realm, uint16 initializedCount);


    function upgradeTo(address newImplementation, bytes memory data, bool forceCall) external returns (bytes memory);

    function setActivity(bool value) external returns (bool);

    function setUpgradability(bool value) external returns (bool);

    function setAdmin(address newAdmin) external returns (bool);

    function contractRegisteration() external returns (bool);

    function contractName() external view returns (string memory);

    function contractVersion() external view returns (string memory);

    function contractRealm() external view returns (bytes32);

    function contractContext() external view returns (bytes32);

    function getAccessControl() external view returns (address);

    function subjectAddress() external view returns (address);

    function isActivated() external view returns (bool);

    function isUpgradable() external view returns (bool);

    function getAdmin() external view returns (address);
}