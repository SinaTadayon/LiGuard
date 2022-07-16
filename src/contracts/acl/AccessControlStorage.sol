// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../lib/struct/LEnumerableSet.sol";
import "../lib/struct/LEnumerableMap.sol";
import "../proxy/BaseUUPSStorage.sol";

abstract contract AccessControlStorage is BaseUUPSStorage {
    using LEnumerableSet for LEnumerableSet.AddressSet;
    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    using LEnumerableMap for LEnumerableMap.Bytes32ToBytes32Map;
    using LEnumerableMap for LEnumerableMap.AddressToUintMap;

    enum Status {
        NONE,
        ENABLED,
        DISABLED
    }

    struct RoleStat {
        bytes32 role;
        Status status;
    }

    struct Context {
        bytes32 realm;
        address smca; // smart contract address
        bool isEnabled;
        mapping(bytes4 => RoleStat) resources; // function selector => RoleStat
        LEnumerableSet.Bytes32Set funcSet;
    }

    struct Role {
        string name;
        bytes32 group;
        bool isEnabled;
        LEnumerableSet.AddressSet accountSet;
    }

    struct Realm {
        string name;
        bool isEnabled;
        bool isUpgradable;
        LEnumerableSet.Bytes32Set ctxSet;
    }

    struct Group {
        string name;
        bool isEnabled;
        LEnumerableSet.Bytes32Set roleSet;
    }

    struct DataMaps {
        mapping(address => mapping(bytes32 => Status)) accountMap;
        mapping(bytes32 => Context) ctxMap;
        mapping(bytes32 => Role) roleMap;
        mapping(bytes32 => Realm) realmMap;
        mapping(bytes32 => Group) groupMap;
    }

    bytes32 public constant LIVELY_GENERAL_REALM = keccak256(abi.encodePacked("LIVELY_GENERAL_REALM"));
    bytes32 public constant LIVELY_GENERAL_GROUP = keccak256(abi.encodePacked("LIVELY_GENERAL_GROUP"));
    bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
    bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));
    bytes32 public constant ANONYMOUSE_ROLE = keccak256(abi.encodePacked("ANONYMOUSE_ROLE"));

    bytes32 public constant ACCESS_CONTROL_NAME = keccak256(abi.encodePacked("LAccessControl"));
    bytes32 public constant ACCESS_CONTROL_VERSION = keccak256(abi.encodePacked("1.0.0"));
    bytes32 public constant CONTEXT_MANAGEMENT_NAME = keccak256(abi.encodePacked("LContextManagement"));
    bytes32 public constant CONTEXT_MANAGEMENT_VERSION = keccak256(abi.encodePacked("1.0.0"));
    bytes32 public constant ROLE_MANAGEMENT_NAME = keccak256(abi.encodePacked("LRoleManagement"));
    bytes32 public constant ROLE_MANAGEMENT_VERSION = keccak256(abi.encodePacked("1.0.0"));
    bytes32 public constant GROUP_MANAGEMENT_NAME = keccak256(abi.encodePacked("LGroupManagement"));
    bytes32 public constant GROUP_MANAGEMENT_VERSION = keccak256(abi.encodePacked("1.0.0"));
    bytes32 public constant REALM_MANAGEMENT_NAME = keccak256(abi.encodePacked("LRealmManagement"));
    bytes32 public constant REALM_MANAGEMENT_VERSION = keccak256(abi.encodePacked("1.0.0"));

    DataMaps internal _dataMaps;
}
