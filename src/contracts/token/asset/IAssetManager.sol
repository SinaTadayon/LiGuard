// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetEntity.sol";

interface IAssetManager {

  struct AssetInfo {
    uint256 balance;
    bytes32 name;
    bytes32 version;
    bytes32 realm;
    bytes32 role;
    address assetId;
    address tokenId;
    bool    initStatus;
    IAssetEntity.AssetType assetType;
    IAssetEntity.AssetStatus status;
  }

  struct TokenInfo {
    uint256     totalSupply;
    uint256     decimal;
    bytes32     contractName;
    bytes32     contractVersion;
    address     tokenId;
    string      tokenName;
    string      tokenSymbol;
    IAssetEntity.AssetStatus status;
  }

  event TokenRegistered(address indexed sender, address indexed tokenId, IAssetEntity.AssetType assetType, string tokenName, string tokenSymbol);

  event AssetRegistered(address indexed sender, address indexed assetId, address indexed tokenId, string assetName, IAssetEntity.AssetType assetType);
  
  event AssetCreated(address indexed sender, address indexed assetId, address indexed tokenId, string assetName, string assetVersion, IAssetEntity.AssetType assetType);

  event AssetRemoved(address indexed sender, address indexed assetId, address indexed tokenId, string assetName, string assetVersion, IAssetEntity.AssetType assetType);

  function createAsset(string calldata assetName, string calldata assetVersion, IAssetEntity.AssetType assetType, address tokenId) external returns (address);

  function registerToken(IAssetEntity.AssetType assetType, address tokenId) external returns (bool);

  function registerAsset(address assetId) external returns (bool);

  function removeAsset(address assetId) external returns (bool);

  function safeModeAsset(address assetId) external returns (bool);

  function safeModeToken(address tokenId) external returns (bool);

  function safeModeAssetType(IAssetEntity.AssetType assetType) external returns (bool);

  function isSafeModeAsset(address assetId) external view returns (bool);

  function getAssetInfo(address assetId) external view returns (AssetInfo memory);

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory);

  function getTokenAssets(address tokenId) external view returns (AssetInfo[] memory);

  function getAllTokens(IAssetEntity.AssetType assetType) external view returns (IAssetEntity.AssetStatus status, TokenInfo[] memory);
}