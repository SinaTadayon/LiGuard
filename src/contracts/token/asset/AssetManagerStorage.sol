// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetEntity.sol";
import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";

abstract contract AssetManagerStorage is BaseUUPSStorage {
  using LEnumerableSet for LEnumerableSet.AddressSet;


  struct AssetTypeInfo {    
    LEnumerableSet.AddressSet tokens;
    IAssetEntity.AssetStatus status;
  }

  struct TokenData {    
    IAssetEntity.AssetType assetType;
    LEnumerableSet.AddressSet assets;
    IAssetEntity.AssetStatus status;
  }

  mapping(IAssetEntity.AssetType => AssetTypeInfo) internal _assetTypes;
  mapping(address => TokenData) internal _tokens;
  mapping(address => address) internal _assetTokenMap;
  bytes internal _assetCreationSignature;
}