// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "../lib/struct/EnumerableSet.sol";
import "../lib/struct/EnumerableMap.sol";
import "../proxy/BaseUUPSStorage.sol";

abstract contract AccessControlStorage is BaseUUPSStorage {

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using EnumerableMap for EnumerableMap.Bytes32ToBytes32Map;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    enum Status {
        NONE,
        ENABLED,
        DISABLED
    }

    struct Context {
        bytes32 realm;
        address smca;                               // smart contract address
        bool isEnabled;
        mapping(bytes32 => Status) resources;      // function selector + Role => Status
        EnumerableSet.Bytes32Set funcSet; 
    }

    struct Role {
        string name;
        bytes32 group;
        bool isEnabled;
        EnumerableMap.AddressToUintMap userMap;
        // mapping(address => Status) userMap;        
        // EnumerableSet.AddressSet userSet;
        // EnumerableSet.Bytes32Set ctxSet;        // TODO check it if needed or no
    }

    struct Realm {
        string name;
        bool isEnabled;
        bool isUpgradable;
        EnumerableSet.Bytes32Set ctxSet;        
    }

    struct Group {
        string name;
        bool isEnabled;
        EnumerableSet.Bytes32Set roles;       
    }


    struct DataMaps {
        mapping(address => bytes32[]) userRoleMap;
        mapping(bytes32 => Context)  ctxMap;
        mapping(bytes32 => Role)  roleMap;
        mapping(bytes32 => Realm) realmMap;
        mapping(bytes32 => Group) groupMap;
    }

    bytes32 public constant LIVELY_GENERAL_REALM = keccak256(abi.encodePacked("LIVELY_GENERAL_REALM"));
    bytes32 public constant LIVELY_GENERAL_GROUP = keccak256(abi.encodePacked("LIVELY_GENERAL_GROUP"));
    bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
    bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));
    bytes32 public constant LIVELY_PUBLIC_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));

    DataMaps internal _dataMaps;
    Realm internal _livelyGeneralRealm;
    Group internal _livelyGeneralGroup;
    Role  internal _livelyAdminRole;
    Role  internal _liveltSystemAdminRole;
}