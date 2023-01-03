// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Asset Entity Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAssetEntity {
  enum AssetSafeModeStatus {
    DISABLED,
    ENABLED
  }

  enum AssetType {
    NONE,
    ERC20,
    ERC721,
    ERC1155
  }

  struct AssetInfo {
    string name;
    string version;
    address token;
    address accessControl;
    uint16  initVersion;
    AssetType atype;
    AssetSafeModeStatus status;
  }

  event AssetInitialized(
    address indexed sender,
    address indexed assetId,
    address indexed tokenId,
    address assetManagerId,
    address assetSubjectId
  );

  event AssetSafeModeUpdated(address indexed sender, address indexed assetId, AssetSafeModeStatus status);

  function assetSetSafeMode(AssetSafeModeStatus status) external returns (bool);

  function assetSafeMode() external view returns (AssetSafeModeStatus);

  function assetType() external view returns (AssetType);

  function assetToken() external view returns (address);

  function assetName() external view returns (string memory);

  function assetVersion() external view returns (string memory);

  function assetAccessControl() external view returns (address);

  function assetInitVersion() external view returns (uint16); 

  function assetInfo() external view returns (AssetInfo memory); 
}
