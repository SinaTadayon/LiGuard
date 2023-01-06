// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../lively/IERC20Extra.sol";
import "../lively/IERC20Lock.sol";
import "./IAssetEntity.sol";

/**
 * @title Asset Manager ERC20 Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAssetManagerERC20 {
  enum TokenSafeModeStatus {
    DISABLED,
    ENABLED
  }

  struct AssetCreateRequest {
    bytes32 adminId;
    bytes32 agentId;
    bytes32 realmId;
    bytes32 salt;
    address tokenId;
    string assetName;
    string assetVersion;
  }

  struct TokenInfo {
    address assetSubjectId;
    address[] assets;
    bytes assetSignature;
    TokenSafeModeStatus status;
  }

  event TokenUpdated(address indexed sender, address indexed tokenId, address indexed assetSubjectId);

  event TokenRegistered(address indexed sender, address indexed tokenId, address indexed assetSubjectId, string tokenName, string tokenSymbol);

  event TokenSafeModeUpdated(address indexed sender, address indexed tokenId, TokenSafeModeStatus status);

  event AssetCreated(address indexed sender, address indexed assetId, address indexed tokenId);

  event AssetRegistered(address indexed sender, address indexed assetId, address indexed tokenId);

  event AssetRemoved(address indexed sender, address indexed assetId, address indexed tokenId);

  function createAsset(AssetCreateRequest calldata request) external returns (address);

  function registerAsset(address assetId) external returns (bool);

  function removeAsset(address assetId) external returns (bool);

  function registerToken(address tokenId, address assetSubjectId, bytes calldata assetSignature) external returns (bool);

  function updateToken(address tokenId, address assetSubjectId, bytes calldata assetSignature) external returns (bool);

  function setSafeModeToken(address tokenId, TokenSafeModeStatus status) external returns (bool);

  function safeModeToken(address tokenId) external view returns (TokenSafeModeStatus);

  // function tokenLock(address assetId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory);

  // function tokenTransfer(
  //   address assetId,
  //   address to,
  //   uint256 amount
  // ) external returns (bool);

  // function tokenBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request)
  //   external
  //   returns (bool);

  // function tokenTransferFrom(
  //   address assetId,
  //   address from,
  //   address to,
  //   uint256 amount
  // ) external returns (bool);

  // function tokenBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request)
  //   external
  //   returns (bool);

  // function tokenApprove(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (bool);

  // function tokenIncreaseAllowance(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (uint256);

  // function tokenDecreaseAllowance(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (uint256);

  function getAllTokens() external view returns (address[] memory);

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory);

  function isAssetExists(address assetId) external view returns (bool);

  function isTokenExists(address tokenId) external view returns (bool);

  function predictAddress(
    address implementation,
    bytes32 salt,
    address deployer
  ) external view returns (address);
}
