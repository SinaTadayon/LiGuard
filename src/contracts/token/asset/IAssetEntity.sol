// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IAssetEntity {

 /**
   * @dev Triggered when the contract has been initialized or reinitialized.
   */
  event AssetInitialized(
    address indexed sender,
    address indexed proxy,
    address indexed subject,
    string name,
    string version,
    bytes32 realm,
    uint16 initCount
  );
  
  event AssetSafeModeChanged(address indexed sender, address indexed proxy, bytes32 indexed realm, bool status);

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

  function assetSafeModeSet(bool status) external returns (bool);

  function assetSafeMode() external view returns (bool);

  function assetType() external view returns (AssetType);

  function assetToken() external view returns (address);

  function assetName() external view returns (bytes32);

  function assetVersion() external view returns (bytes32);

  function assetRealm() external view returns (bytes32);

  function assetRole() external view returns (bytes32);

  function initVersion() external view returns (uint16);

  function initStatus() external view returns (bool);
}