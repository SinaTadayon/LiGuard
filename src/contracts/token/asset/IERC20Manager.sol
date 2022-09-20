// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lively/IERC20Extra.sol";
import "../lively/IERC20Lock.sol";

interface IERC20Manager {

  function erc20Lock(address tokenId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32);

  function erc20BatchLock(address tokenId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  function erc20Transfer(address assetId, address to, uint256 amount) external returns (bool);

  function erc20BatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool);

  function erc20TransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool);

  function erc20BatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool);

  function erc20Approve(address assetId, address spender, uint256 amount) external returns (bool);

  function erc20IncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);

  function erc20DecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);
}