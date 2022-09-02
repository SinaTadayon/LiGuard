// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IERC20Lock {

  struct LockTokenRequest {
    address source;
    address dest;
    uint256 timestamp;
    uint256 amount;
  }

  struct UnLockTokenRequest {
    bytes32 lockId;
    address account;
    string reason;
  }

  event TokenLocked(bytes32 indexed id, address indexed sender, address indexed src, address account, uint256 timestamp, uint256 amount);

  event TokenClaimed(bytes32 indexed id, address indexed sender, address indexed src, uint256 amount);

  event TokenUnlocked(bytes32 indexed id, address indexed sender, address indexed account, address dest, uint256 amount, string reason);

  event BatchTokenClaimed(address indexed sender, uint256 totalAmount);

  event BatchTokenUnlocked(address indexed sender, uint256 totalAmount);

  event BatchTokenLocked(address indexed sender, uint256 totalAmount);

  function lockToken(LockTokenRequest calldata lockRequest) external returns (bytes32);

  function batchLockToken(LockTokenRequest[] calldata lockRequest) external returns (bytes32[] memory);

  function unlockToken(UnLockTokenRequest calldata unlockRequest) external returns (uint256);

  function batchUnlockToken(UnLockTokenRequest[] calldata unlockRequest) external returns (uint256);

  function claimToken(bytes32 lockId) external returns (uint256);

  function batchClaimToken(bytes32[] calldata lockIds) external returns (uint256);

  function lockInfo(bytes32 lockId, address account) external view returns (uint256, uint128, uint128, address, uint8);

  function totalBalanceOf(address account) external view returns (uint256);

  function lockBalanceOf(address account) external view returns (uint256);

}