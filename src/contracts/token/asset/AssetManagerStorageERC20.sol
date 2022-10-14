// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetEntity.sol";
import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";

abstract contract AssetManagerStorageERC20 is BaseUUPSStorage {
  using LEnumerableSet for LEnumerableSet.AddressSet;

  struct TokenData {    
    LEnumerableSet.AddressSet assets;
    IAssetEntity.Status status;
  }

  struct DataCollection {
    mapping(address => TokenData) tokens;
    LEnumerableSet.AddressSet tokensSet;
  }

  address internal _assetSubjectERC20;
  bytes internal _assetCreationSignature;
  DataCollection internal _data;
}