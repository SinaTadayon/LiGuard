// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lively/IERC20Extra.sol";
import "../lively/IERC20Lock.sol";

interface IAssetManagerERC20 {

  function assetLock(address assetId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32);

  function assetBatchLock(address assetId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  function assetTransfer(address assetId, address to, uint256 amount) external returns (bool);

  function assetBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool);

  function assetTransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool);

  function assetBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool);

  function assetApprove(address assetId, address spender, uint256 amount) external returns (bool);

  function assetIncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);

  function assetDecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);

  function assetPermit(
    address assetId,
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool);

  // function assetTokenId(address assetId) external view returns (address);

  // function assetBalance(address assetId) external view returns (uint256); 

  // function assetName(address assetId) external view returns (string memory);

  // function assetVersion(address assetId) external view returns (string memory);
 
}