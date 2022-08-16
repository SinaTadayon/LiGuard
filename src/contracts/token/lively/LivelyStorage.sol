// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/LCounters.sol";
import "../../lib/struct/LEnumerableSet.sol";

abstract contract LivelyStorage is BaseUUPSStorage {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LCounters for LCounters.Counter;
  // struct ShortTermDeposit {
  //     uint256 balance;
  //     uint256 interest;
  //     uint128 aprId;
  //     uint128 timestamp;
  // }

  // struct APYSnapshot {
  //     uint256 rate;
  //     uint128 timestamp;
  // }

  struct AccountInfo {
    uint256 balance;
    LCounters.Counter nonce;
  }

  bytes32 internal constant _PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

  mapping(address => AccountInfo) internal _accounts;
  mapping(address => mapping(address => uint256)) internal _allowances;

  // mapping(address => ShortTermDeposit) internal _stdMap;
  // APYSnapshot[] internal _apySnapshots;
  // LCounters.Counter internal _apyId;
  LEnumerableSet.AddressSet internal _pausedList;
  LEnumerableSet.AddressSet internal _taxWhitelist;
  string internal _name;
  string internal _symbol;
  uint256 internal _totalSupply;
  uint256 internal _taxRate;
  address internal _taxTreasury;
  bool internal _isPaused;
}
