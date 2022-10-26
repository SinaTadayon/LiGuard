// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../lively/IERC20Extra.sol";
import "../../lively/IERC20Lock.sol";

interface IAssetERC20 {
  event AssetERC20Called(address indexed sender, address indexed assetId, bytes4 indexed functionSelector);

  function tokenLock(IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32);

  function tokenBatchLock(IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  function tokenTransfer(address to, uint256 amount) external returns (bool);

  function tokenBatchTransfer(IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool);

  function tokenTransferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);

  function tokenBatchTransferFrom(IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool);

  function tokenApprove(address spender, uint256 amount) external returns (bool);

  function tokenIncreaseAllowance(address spender, uint256 amount) external returns (uint256);

  function tokenDecreaseAllowance(address spender, uint256 amount) external returns (uint256);

  function tokenBalance() external view returns (uint256);

  function assetBalance() external view returns (uint256);
}