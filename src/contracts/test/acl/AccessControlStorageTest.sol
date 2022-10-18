// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/struct/LEnumerableMap.sol";
import "../../proxy/BaseUUPSStorage.sol";

abstract contract AccessControlStorageTest is BaseUUPSStorage {
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
    address contractId;
    bool isEnabled;
    mapping(bytes4 => RoleStat) resources; // function selector => RoleStat
    LEnumerableSet.Bytes32Set funcSet;
  }

  struct Role {
    bytes32 group;
    string name;
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

  struct DataCollections {
    mapping(address => mapping(bytes32 => Status)) accountMap;
    mapping(bytes32 => Context) ctxMap;
    mapping(bytes32 => Role) roleMap;
    mapping(bytes32 => Realm) realmMap;
    mapping(bytes32 => Group) groupMap;
    uint256 dummy_1;
  }

  DataCollections internal _data;
  bytes32 internal dummy_2;
}
