// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

/**
 * @title ERC20 Token Lock Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IERC20Lock {
  enum LockState {
    NONE,
    LOCKED,
    CLAIMED,
    UNLOCKED
  }

  struct LockTokenRequest {
    address source;
    address dest;
    uint256 claimAt;
    uint256 amount;
  }

  struct UnLockTokenRequest {
    bytes32 lockId;
    address account;
    string reason;
  }

  struct LockInfo {
    uint256 amount;
    uint128 lockedAt;
    uint128 claimedAt;
    address source;
    LockState stat;
  }

  event TokenLocked(
    bytes32 indexed id,
    address indexed sender,
    address indexed src,
    address account,
    uint256 claimAt,
    uint256 amount
  );

  event TokenClaimed(bytes32 indexed id, address indexed sender, address indexed src, uint256 amount);

  event TokenUnlocked(
    bytes32 indexed id,
    address indexed sender,
    address indexed account,
    address dest,
    uint256 amount,
    string reason
  );

  function lockToken(LockTokenRequest[] calldata lockRequest) external returns (bytes32[] memory);

  function unlockToken(UnLockTokenRequest[] calldata unlockRequest) external returns (uint256);

  function claimToken(bytes32[] calldata lockIds) external returns (uint256);

  function lockInfo(bytes32 lockId, address account) external view returns (LockInfo memory);

  function totalBalanceOf(address account) external view returns (uint256);

  function lockBalanceOf(address account) external view returns (uint256);
}
