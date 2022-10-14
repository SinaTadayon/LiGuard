// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lively/IERC20Extra.sol";
import "../lively/IERC20Lock.sol";
import "./IAssetEntity.sol";

interface IAssetManagerERC20 {

  struct CreateAssetRequest {
    bytes32 role; 
    bytes32 salt;
    address tokenId; 
    string assetName; 
    string assetVersion;     
  }

  event AssetSubjectUpdated(address indexed sender, address indexed assetSubject);

  event TokenRegistered(address indexed sender, address indexed tokenId, string tokenName, string tokenSymbol);
  
  event AssetCreated(address indexed sender, address indexed assetId, address indexed tokenId, address assetSubject);

  event AssetRegistered(address indexed sender, address indexed assetId, address indexed tokenId);

  event AssetRemoved(address indexed sender, address indexed assetId, address indexed tokenId);
  
  event TokenSafeModeChanged(address indexed sender, address indexed tokenId, bool isEnabled);

  function createAsset(CreateAssetRequest calldata request) external returns (address);

  function updateAssetSubject(address assetSubject, bytes calldata assetCreationSignature) external returns (bool);

  function registerToken(address tokenId) external returns (bool);

  function registerAsset(address assetId) external returns (bool);

  function removeAsset(address assetId) external returns (bool);

  function setSafeModeToken(address tokenId, bool isEnabled) external returns (bool);

  function tokenLock(address assetId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32);

  function tokenBatchLock(address assetId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  function tokenTransfer(address assetId, address to, uint256 amount) external returns (bool);

  function tokenBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool);

  function tokenTransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool);

  function tokenBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool);

  function tokenApprove(address assetId, address spender, uint256 amount) external returns (bool);

  function tokenIncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);

  function tokenDecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256);

  function getAllTokens() external view returns(address[] memory);

  function getTokenInfo(address tokenId) external view returns (IAssetEntity.Status, address[] memory);

  function isAssetExists(address assetId) external view returns (bool);

  function isTokenExists(address tokenId) external view returns (bool);

  function getAssetSubject() external view returns (address);

  function predictAddress(address implementation, bytes32 salt, address deployer) external view returns (address);
}