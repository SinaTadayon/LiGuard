// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IACL {
    /** 
     * @dev Function called by apps to check ACL on kernel or to check permission status
     * @return boolean indicating whether the ACL allows the role or not
     */
    function hasAccess(bytes32 context, address account, bytes4 signature) external view returns (bool);

    function hasSystemAdminRole(address account) external view returns (bool);

    function hasLivelyAdminRole(address account) external view returns (bool);

    function hasLivelyGroup(bytes32 role) external view returns (bool);

    function hasLivelyRealm(bytes32 context) external view returns (bool);

    function isEnabled(bytes32 context) external view returns (bool);

    function isUpgradeEnabled(bytes32 context) external view returns (bool);

}