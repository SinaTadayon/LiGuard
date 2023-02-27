// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../../token/lively/IERC20.sol";
import "../../token/lively/IERC20Extra.sol";
import "../../token/lively/IERC20Pause.sol";
import "../../token/lively/IERC20Lock.sol";
import "../../token/lively/LivelyStorage.sol";
import "../../proxy/IProxy.sol";
import "../../acl/IACL.sol";
import "../struct/LEnumerableSet.sol";

/**
 * @title Token ERC20 Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LTokenERC20 {
  using LEnumerableSet for LEnumerableSet.AddressSet;

  string public constant LIB_NAME = "LTokenERC20";
  string public constant LIB_VERSION = "3.0.0";

  function lockToken(LivelyStorage.DataCollection storage data, IERC20Lock.LockTokenRequest memory lockRequest)
    external
    returns (bytes32)
  {
    require(
      lockRequest.source != address(0) && lockRequest.dest != address(0) && lockRequest.source != lockRequest.dest,
      "Illegal Source/Dest Address"
    );
    require(lockRequest.claimAt > block.timestamp + 1 days, "Illegal Timestamp");
    require(lockRequest.amount > 0, "Illegal amount");

    bytes32 lockId = keccak256(
      abi.encodePacked(lockRequest.source, lockRequest.dest, lockRequest.claimAt, lockRequest.amount)
    );
    require(data.locks[lockRequest.dest][lockId].source == address(0), "Already Exists");

    uint256 srcBalance = data.accounts[lockRequest.source].balance;
    require(srcBalance >= lockRequest.amount, "Illegal Balance");
    unchecked {
      data.accounts[lockRequest.source].balance = srcBalance - lockRequest.amount;
    }
    data.accounts[lockRequest.dest].lockBalance += lockRequest.amount;

    LivelyStorage.AssetLock storage assetLock = data.locks[lockRequest.dest][lockId];
    assetLock.lockedAt = uint128(block.timestamp);
    assetLock.claimedAt = uint128(lockRequest.claimAt);
    assetLock.source = lockRequest.source;
    assetLock.amount = lockRequest.amount;
    assetLock.status = IERC20Lock.LockState.LOCKED;
    return lockId;
  }

  function claimToken(LivelyStorage.DataCollection storage data, bytes32 lockId) external returns (uint256) {
    require(lockId != bytes32(0), "Illegal LockId");
    require(data.locks[msg.sender][lockId].source != address(0), "Not Found");
    require(data.locks[msg.sender][lockId].claimedAt < uint128(block.timestamp), "Illegal Claim");

    uint256 lockAmount = data.locks[msg.sender][lockId].amount;
    uint256 lockBalance = data.accounts[msg.sender].lockBalance;
    require(lockBalance >= lockAmount, "Illegal Lock Balance");
    unchecked {
      data.accounts[msg.sender].lockBalance = lockBalance - lockAmount;
    }
    data.accounts[msg.sender].balance += lockAmount;
    data.locks[msg.sender][lockId].status = IERC20Lock.LockState.CLAIMED;
    return lockAmount;
  }

  function unlockToken(LivelyStorage.DataCollection storage data, IERC20Lock.UnLockTokenRequest calldata unlockRequest)
    external
    returns (address, uint256)
  {
    require(unlockRequest.lockId != bytes32(0), "Illegal LockId");
    require(data.locks[unlockRequest.account][unlockRequest.lockId].source != address(0), "LockId Not Found");
    require(
      data.locks[unlockRequest.account][unlockRequest.lockId].status == IERC20Lock.LockState.LOCKED,
      "Illegal Lock State"
    );

    uint256 lockAmount = data.locks[unlockRequest.account][unlockRequest.lockId].amount;
    uint256 lockBalance = data.accounts[unlockRequest.account].lockBalance;
    address srcAccount = data.locks[unlockRequest.account][unlockRequest.lockId].source;
    require(lockBalance >= lockAmount, "Illegal Lock Balance");
    unchecked {
      data.accounts[unlockRequest.account].lockBalance = lockBalance - lockAmount;
    }
    data.accounts[srcAccount].balance += lockAmount;
    data.locks[unlockRequest.account][unlockRequest.lockId].status = IERC20Lock.LockState.UNLOCKED;
    return (srcAccount, lockAmount);
  }

  function transfer(
    LivelyStorage.DataCollection storage data,
    address src,
    address dest,
    uint256 amount
  ) external {
    require(src != address(0) && dest != address(0) && src != dest, "Illegal Src/Dest Address");
    require(amount > 0, "Illegal Amount");

    uint256 srcBalance = data.accounts[src].balance;
    require(srcBalance >= amount, "Illegal Balance");
    unchecked {
      data.accounts[src].balance = srcBalance - amount;
    }
    data.accounts[dest].balance += amount;
  }

  function updateTaxWhitelist(
    LivelyStorage.DataCollection storage data,
    address account,
    bool isDeleted
  ) external returns (bool) {
    require(account != address(0), "Illegal Address");
    if (isDeleted) {
      require(data.taxWhitelist.contains(account), "Not Found");
      data.taxWhitelist.remove(account);
    } else {
      require(!data.taxWhitelist.contains(account), "Already Exists");
      data.taxWhitelist.add(account);
    }

    return true;
  }
}
