// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../acl/AccessControlStorage.sol";
import "../../acl/IRoleManagement.sol";
import "../struct/LEnumerableSet.sol";
import "../LContextUtils.sol";
import "./LAccessControl.sol";

library LRoleManagement {
    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    using LEnumerableSet for LEnumerableSet.AddressSet;

    bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LRoleManagement"));
    bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

    // if group empty add to default group
    function registerRole(
        AccessControlStorage.DataMaps storage data,
        string calldata name,
        bytes32 group,
        bool isEnabled
    ) external returns (bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IRoleManagement.registerRole.selector
            ),
            "Access Denied"
        );
        require(bytes(data.groupMap[group].name).length != 0, "Group Not Found");
        require(bytes(name).length != 0, "Role Name Invalid");
        bytes32 roleKey = keccak256(abi.encodePacked(name));
        require(bytes(data.roleMap[roleKey].name).length == 0, "Role Already Registered");

        // add to group
        data.groupMap[group].roleSet.add(roleKey);

        AccessControlStorage.Role storage newRole = data.roleMap[roleKey];
        newRole.name = name;
        newRole.group = group;
        newRole.isEnabled = isEnabled;
        return roleKey;
    }

    function grantRoleAccount(
        AccessControlStorage.DataMaps storage data,
        bytes32 role,
        address account
    ) external returns (bool) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IRoleManagement.grantRoleAccount.selector
            ),
            "Access Denied"
        );
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(account != address(0), "Address Invalid");
        data.accountMap[account][role] = AccessControlStorage.Status.ENABLED;
        if (!data.roleMap[role].accountSet.contains(account)) {
            data.roleMap[role].accountSet.add(account);
        }
        return true;
    }

    function revokeRoleAccount(
        AccessControlStorage.DataMaps storage data,
        bytes32 role,
        address account
    ) external returns (bool) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IRoleManagement.revokeRoleAccount.selector
            ),
            "Access Denied"
        );
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(account != address(0), "Address Invalid");
        require(data.roleMap[role].accountSet.contains(account), "Account Not Found");
        require(data.accountMap[account][role] != AccessControlStorage.Status.NONE, "User Role Not Found");
        data.accountMap[account][role] = AccessControlStorage.Status.DISABLED;
        return true;
    }

    function setRoleStat(
        AccessControlStorage.DataMaps storage data,
        bytes32 role,
        bool isEnabled
    ) external returns (bool, bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IRoleManagement.setRoleStat.selector
            ),
            "Access Denied"
        );
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        data.roleMap[role].isEnabled = isEnabled;
        return (true, data.roleMap[role].group);
    }

    function setRoleGroup(
        AccessControlStorage.DataMaps storage data,
        bytes32 role,
        bytes32 group
    ) external returns (bool, bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IRoleManagement.setRoleGroup.selector
            ),
            "Access Denied"
        );
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(bytes(data.groupMap[group].name).length != 0, "Group Not Found");
        bytes32 oldGroup = data.roleMap[role].group;
        data.groupMap[data.roleMap[role].group].roleSet.remove(role);
        data.groupMap[group].roleSet.add(role);
        data.roleMap[role].group = group;
        return (true, oldGroup);
    }

    function getRole(AccessControlStorage.DataMaps storage data, bytes32 role)
        external
        view
        returns (
            string memory,
            bytes32,
            bool
        )
    {
        return (data.roleMap[role].name, data.roleMap[role].group, data.roleMap[role].isEnabled);
    }

    function getRoleAccounts(AccessControlStorage.DataMaps storage data, bytes32 role)
        external
        view
        returns (address[] memory)
    {
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        return data.roleMap[role].accountSet.values();
    }

    function hasAccountRole(
        AccessControlStorage.DataMaps storage data,
        bytes32 role,
        address account
    ) external view returns (bool) {
        if (bytes(data.roleMap[role].name).length == 0) return false;
        if (account != address(0)) return false;
        return data.accountMap[account][role] == AccessControlStorage.Status.ENABLED;
    }
}
