// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../acl/AccessControlStorage.sol";
import "../../acl/IGroupManagement.sol";
import "../struct/LEnumerableSet.sol";
import "../LContextUtils.sol";
import "./LAccessControl.sol";

library LGroupManagement {
    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    using LEnumerableSet for LEnumerableSet.AddressSet;

    bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LGroupManagement"));
    bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

    function registerGroup(
        AccessControlStorage.DataMaps storage data,
        string calldata name,
        bool status
    ) external returns (bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IGroupManagement.registerGroup.selector
            ),
            "Access Denied"
        );
        require(bytes(name).length != 0, "Group Name Invalid");
        bytes32 groupKey = keccak256(abi.encodePacked(name));
        require(bytes(data.groupMap[groupKey].name).length == 0, "Group Already Registered");

        AccessControlStorage.Group storage newGroup = data.groupMap[groupKey];
        newGroup.name = name;
        newGroup.isEnabled = status;
        return groupKey;
    }

    function setGroupStat(
        AccessControlStorage.DataMaps storage data,
        bytes32 group,
        bool status
    ) external returns (bool) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IGroupManagement.setGroupStat.selector
            ),
            "Access Denied"
        );
        require(bytes(data.groupMap[group].name).length == 0, "Group Not Found");
        data.groupMap[group].isEnabled = status;
        return true;
    }

    function hasGroupRole(
        AccessControlStorage.DataMaps storage data,
        bytes32 group,
        bytes32 role
    ) external view returns (bool) {
        if (bytes(data.groupMap[group].name).length == 0) return false;
        return data.groupMap[group].roleSet.contains(role);
    }

    function getGroup(AccessControlStorage.DataMaps storage data, bytes32 group)
        external
        view
        returns (string memory, bool)
    {
        return (data.groupMap[group].name, data.groupMap[group].isEnabled);
    }

    function getGroupRoles(AccessControlStorage.DataMaps storage data, bytes32 group)
        external
        view
        returns (bytes32[] memory)
    {
        return data.groupMap[group].roleSet.values();
    }
}
