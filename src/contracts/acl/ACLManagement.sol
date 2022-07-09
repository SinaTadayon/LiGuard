// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./IACL.sol";
import "../lib/struct/EnumerableSet.sol";
import "../lib/struct/EnumerableMap.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSLogic.sol";

contract ACLManager is BaseUUPSLogic {
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
        address smca;                    // smart contract address
        mapping(bytes32 => mapping(bytes32 => Status)) resources;      // function selector  => Role => Status 
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

    mapping(bytes32 => Context) private _ctxMap;
    mapping(bytes32 => Role) private _roleMap;
    mapping(bytes32 => Realm) private _realmMap;
    mapping(bytes32 => Group) private _groupMap;

    Realm LIVELY_REALM;
    Group LIVELY_GROUP;
    Role  LIVELY_ADMIN;
    Role  SYSTEM_ADMIN;

    constructor() {

    }

    //  function _authorizeUpgrade(address newImplementation) internal override {
         
    //  }

     /**
     * @dev Returns the current implementation address.
     */
    // function _implementation() internal view virtual override returns (address impl) {
    //     return _getImplementation();
    // }



}