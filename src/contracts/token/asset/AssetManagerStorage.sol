// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetEntity.sol";
import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";

abstract contract AssetManagerStorage is BaseUUPSStorage {
  using LEnumerableSet for LEnumerableSet.AddressSet;

  struct AssetTypeData {
    address assetImplement;    
    LEnumerableSet.AddressSet tokens;
    IAssetEntity.Status status;
  }

  struct TokenData {    
    IAssetEntity.AssetType assetType;
    LEnumerableSet.AddressSet assets;
    IAssetEntity.Status status;
  }

  mapping(IAssetEntity.AssetType => AssetTypeData) internal _assetTypes;
  mapping(address => TokenData) internal _tokens;
  bytes internal _assetCreationSignature;
}