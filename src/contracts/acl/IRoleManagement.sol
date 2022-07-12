// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IRoleManagement {
    
    /**
     * @dev Emitted when `account` is granted `role`.
     *
     * `sender` is the account that originated the contract call
     */
    event RoleAccountGranted(bytes32 indexed role, address indexed account, address indexed sender, bytes32 group);

    /**
     * @dev Emitted when `account` is revoked `role`.
     *
     * `sender` is the account that originated the contract call:
     *   - if using `revokeRole`, it is the admin role bearer
     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
     */
    event RoleAccountRevoked(bytes32 indexed role, address indexed account, address indexed sender, bytes32 group);

    /**
     * 
     */
    event RoleRegistered(bytes32 indexed role, string indexed name, address indexed sender, bytes32 group, bool isEnabled);

    /**
     * 
     */
    event RoleEnabled(bytes32 indexed role, address indexed sender, bytes32 indexed group);

    /**
     * 
     */
    event RoleDisabled(bytes32 indexed role, address indexed sender, bytes32 indexed group);

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function grantRoleAccount(bytes32 role, address account) external returns (bool);

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function revokeRoleAccount(bytes32 role, address account) external returns (bool);

    /**
     * 
     */
    function addRole(string calldata name, string calldata group, bool isEnabled) external returns (bytes32);

    /**
     * 
     */
    function setEnabledRole(bytes32 role) external returns (bool);

    /**
     * 
     */
    function setDisabledRole(bytes32 role) external returns (bool);


    function getRole(bytes32 role) external view returns (string memory, string memory, bool); 

    function getRoleUsers(bytes32 role) external view returns (address[] memory); 

    function getRoleContextes(bytes32 role) external view returns (bytes32[] memory);


    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasAccountRole(bytes32 role, address account) external view returns (bool);


}