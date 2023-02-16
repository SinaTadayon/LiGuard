// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IAssetEntity.sol";

/**
 * @title Asset Manager ERC20 Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAssetManagerERC20 {

  struct AssetCreateRequest {
    bytes32 adminId;
    bytes32 agentId;
    bytes32 realmId;
    bytes32 salt;
    address tokenId;
    address assetId;
    string assetName;
    string assetVersion;
  }

  struct AssetActionRequest {
    address tokenId;
    address assetId;
  }

  struct AssetTokenActionRequest {
    address tokenId;
    address assetSubjectId;
    bytes assetSignature;
  }

  struct AssetTokenSafeModeRequest {
    address tokenId;
    IAssetEntity.AssetSafeModeStatus status;
  }

  struct TokenInfo {
    address assetSubjectId;
    address[] assets;
    bytes assetSignature;
  }

  event TokenUpdated(address indexed sender, address indexed tokenId, address indexed assetSubjectId);

  event TokenRegistered(address indexed sender, address indexed tokenId, address indexed assetSubjectId, string tokenName, string tokenSymbol);

  event AssetCreated(address indexed sender, address indexed assetId, address indexed tokenId);

  event AssetRegistered(address indexed sender, address indexed assetId, address indexed tokenId);

  event AssetRemoved(address indexed sender, address indexed assetId, address indexed tokenId);

  function createAsset(AssetCreateRequest[] calldata requests) external returns (bool);

  function registerAsset(AssetActionRequest[] calldata requests) external returns (bool);

  function removeAsset(AssetActionRequest[] calldata requests) external returns (bool);

  function registerToken(AssetTokenActionRequest[] calldata requests) external returns (bool);

  function updateToken(AssetTokenActionRequest[] calldata requests) external returns (bool);

  function setSafeModeAssets(AssetTokenSafeModeRequest[] calldata requests) external returns (bool);

  function getSafeModeAsset(address assetId) external view returns (IAssetEntity.AssetSafeModeStatus);

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
