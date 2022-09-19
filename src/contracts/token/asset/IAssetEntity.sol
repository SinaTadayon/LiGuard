// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IAssetEntity {

  enum AssetStatus {
    NONE,
    ACTIVE,
    SAFE_MODE
  }

  enum AssetType {
    NONE,
    ERC20,
    ERC721,
    ERC1155
  }

  function assetSetSafeMode(bool status) external returns (bool);

  function assetType() external view returns (AssetType);

  function assetToken() external view returns (address);
}