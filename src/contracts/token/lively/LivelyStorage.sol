// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IERC20Lock.sol";
import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/LCounters.sol";
import "../../lib/struct/LEnumerableSet.sol";


/**
 * @title Abstract Lively ERC20 Token Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract LivelyStorage is BaseUUPSStorage {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LCounters for LCounters.Counter;



  struct AccountInfo {
    uint256 balance;
    uint256 lockBalance;
    LCounters.Counter nonce;
  }

  struct AssetLock {
    uint256 amount;
    uint128 lockedAt;
    uint128 claimedAt;
    address source;
    IERC20Lock.LockState status;
  }

  struct DataCollection {
    mapping(address => AccountInfo) accounts;
    mapping(address => mapping(address => uint256)) allowances;
    mapping(address => mapping(bytes32 => AssetLock)) locks;
    LEnumerableSet.AddressSet pausedList;
    LEnumerableSet.AddressSet taxWhitelist;
  }

  bytes32 internal constant _PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

  string internal _name;
  string internal _symbol;
  uint256 internal _totalSupply;
  uint256 internal _taxRate;
  address internal _taxTreasury;
  bool internal _isPaused;
  bool internal _isTokenDistributed;

  DataCollection internal _data;

  // Note: for next upgrade add new variables after this line
}
