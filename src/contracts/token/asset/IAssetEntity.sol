// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IAssetEntity {

  enum Status {
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

  event AssetInitialized(
    address indexed sender,
    address indexed assetId,
    string name,
    string version,
    bytes32 realm
  );
  
  event AssetSafeModeChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool status);

  function assetSafeModeSet(bool status) external returns (bool);

  function assetSafeMode() external view returns (bool);

  function assetType() external view returns (AssetType);

  function assetToken() external view returns (address);

  function assetName() external view returns (bytes32);

  function assetVersion() external view returns (bytes32);

  function assetRealm() external view returns (bytes32);

  function assetRole() external view returns (bytes32);

  function assetInitVersion() external view returns (uint16);

  function assetInitStatus() external view returns (bool);
}