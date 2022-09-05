// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IAssetEntity {

  struct LockTokenRequest {  
    address dest;
    uint256 timestamp;
    uint256 amount;
  }

  struct UnLockTokenRequest {
    bytes32 lockId;
    address account;
    string reason;
  }

  struct BatchTransferRequest {
    address to;
    uint256 amount;
  }

  struct BatchTransferFromRequest {
    address from;
    address to;
    uint256 amount;
  }

  function lockToken(LockTokenRequest calldata lockRequest) external returns (bytes32);

  function batchLockToken(LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  function unlockToken(UnLockTokenRequest calldata unlockRequest) external returns (uint256);

  function batchUnlockToken(UnLockTokenRequest[] calldata unlockRequest) external returns (uint256);

  function transfer(address to, uint256 amount) external returns (bool);

  function batchTransfer(BatchTransferRequest[] calldata transferRequests) external returns (bool);

  function transferFrom(address from, address to, uint256 amount) external returns (bool);

  function batchTransferFrom(BatchTransferFromRequest[] calldata requests) external returns (bool);

  function approve(address spender, uint256 amount) external returns (bool);

  function increaseAllowance(address spender, uint256 amount) external returns (uint256);

  function decreaseAllowance(address spender, uint256 amount) external returns (uint256);

  function erc20Token() external view returns (address);

  function balance() external view returns (uint256); 

  function assetName() external view returns (string memory);

  function assetId() external view returns (bytes32);
}