// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "./IAssetEntity.sol";
import "../../proxy/BaseUUPSStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";

/**
 * @title Abstract Asset Manager Storage ERC20 Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
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

  // Note: for next upgrade add new variables after this line
}
