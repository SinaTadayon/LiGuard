// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetEntity.sol";

interface IAssetManager {

  struct CreateAssetRequest {
    bytes32 role; 
    bytes32 salt;
    address tokenId; 
    string assetName; 
    string assetVersion;     
  }

  struct AssetInfo {
    uint256 balance;
    bytes32 name;
    bytes32 version;
    bytes32 realm;
    bytes32 role;
    address tokenId;
    uint16 initVersion;
    IAssetEntity.AssetType assetType;
    IAssetEntity.Status status;
  }

  struct TokenInfo {
    uint256     totalSupply;
    uint256     decimal;
    bytes32     contractName;
    bytes32     contractVersion;
    string      tokenName;
    string      tokenSymbol;
    IAssetEntity.Status status;
  }

  event AssetTypeRegistered(address indexed sender, address indexed assetImpl, IAssetEntity.AssetType assetType);

  event AssetTypeUpdated(address indexed sender, address indexed assetImpl, IAssetEntity.AssetType assetType);

  event TokenRegistered(address indexed sender, address indexed tokenId, IAssetEntity.AssetType assetType, string tokenName, string tokenSymbol);

  event AssetRegistered(address indexed sender, address indexed assetId, address indexed tokenId, IAssetEntity.AssetType assetType);
  
  event AssetCreated(address indexed sender, address indexed assetId, address indexed tokenId, address assetImpl, IAssetEntity.AssetType assetType);

  event AssetRemoved(address indexed sender, address indexed assetId, address indexed tokenId, IAssetEntity.AssetType assetType);

  event AssetSafeModeChanged(address indexed sender, address indexed assetId, bool isEnabled);
  
  event TokenSafeModeChanged(address indexed sender, address indexed tokenId, bool isEnabled);

  event AssetTypeSafeModeChanged(address indexed sender, IAssetEntity.AssetType assetType, bool isEnabled);

  function createAsset(CreateAssetRequest calldata request) external returns (address);

  function registerAssetType(IAssetEntity.AssetType assetType, address assetImplementation) external returns (bool);

  function updateAssetType(IAssetEntity.AssetType assetType, address assetImplementation) external returns (bool);

  function registerToken(IAssetEntity.AssetType assetType, address tokenId) external returns (bool);

  function registerAsset(address assetId) external returns (bool);

  function removeAsset(address assetId) external returns (bool);

  function setSafeModeAsset(address assetId, bool isEnabled) external returns (bool);

  function setSafeModeToken(address tokenId, bool isEnabled) external returns (bool);

  function setSafeModeAssetType(IAssetEntity.AssetType assetType, bool isEnabled) external returns (bool);

  function getAssetTypeInfo(IAssetEntity.AssetType assetType) external view returns(IAssetEntity.Status, address, address[] memory);

  function getAssetInfo(address assetId) external view returns (AssetInfo memory);

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory, address[] memory);

  function isSafeModeAsset(address assetId) external view returns (bool);

  function isAssetExists(address assetId) external view returns (bool);

  function isTokenExists(address tokenId) external view returns (bool);

  function isAssetTypeExists(IAssetEntity.AssetType assetType) external view returns (bool);

  function predictAddress(address base, bytes32 salt) external pure returns (address);
}