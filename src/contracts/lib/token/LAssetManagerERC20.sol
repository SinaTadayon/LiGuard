// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../struct/LEnumerableSet.sol";
import "../proxy/LClones.sol";
import "../../token/asset/IAssetManagerERC20.sol";
import "../../token/asset/AssetManagerStorageERC20.sol";
import "../../token/asset/ERC20/AssetERC20.sol";
import "../../token/lively/IERC20.sol";
import "../../proxy/IProxy.sol";
import "../../acl/IAccessControl.sol";
import "../../utils/IERC165.sol";

/**
 * @title Asset Manager ERC20 Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LAssetManagerERC20 {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LClones for address;

  bytes32 public constant LIB_NAME = "LAssetManagerERC20";
  bytes32 public constant LIB_VERSION = "3.0.0";

  // bytes32 public constant LIVELY_ASSET_GROUP = keccak256(abi.encodePacked("LIVELY_ASSET_GROUP"));
  // bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  // bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));
  // bytes32 public constant LIVELY_ASSET_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_ADMIN_ROLE"));
  // bytes32 public constant LIVELY_ASSET_MANAGER_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_MANAGER_ROLE"));

  // function createRequestContext(
  //   bytes32 domainName,
  //   bytes32 domainVersion,
  //   bytes32 realm
  // )
  //   external
  //   view
  //   returns (IContextManagement.RequestContext memory, IContextManagement.RequestRegisterContext[] memory)
  // {
  //   IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](3);

  //   rrc[0].role = LIVELY_ADMIN_ROLE;
  //   rrc[0].isEnabled = true;
  //   rrc[0].funcSelectors = new bytes4[](2);
  //   rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
  //   rrc[0].funcSelectors[1] = IProxy.setSafeMode.selector;

  //   rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   rrc[1].isEnabled = true;
  //   rrc[1].funcSelectors = new bytes4[](2);
  //   rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
  //   rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;

  //   rrc[2].role = LIVELY_ASSET_ADMIN_ROLE;
  //   rrc[2].isEnabled = true;
  //   rrc[2].funcSelectors = new bytes4[](17);
  //   rrc[2].funcSelectors[0] = IAssetManagerERC20.tokenLock.selector;
  //   rrc[2].funcSelectors[1] = IAssetManagerERC20.tokenBatchLock.selector;
  //   rrc[2].funcSelectors[2] = IAssetManagerERC20.tokenTransfer.selector;
  //   rrc[2].funcSelectors[3] = IAssetManagerERC20.tokenBatchTransfer.selector;
  //   rrc[2].funcSelectors[4] = IAssetManagerERC20.tokenTransferFrom.selector;
  //   rrc[2].funcSelectors[5] = IAssetManagerERC20.tokenBatchTransferFrom.selector;
  //   rrc[2].funcSelectors[6] = IAssetManagerERC20.tokenApprove.selector;
  //   rrc[2].funcSelectors[7] = IAssetManagerERC20.tokenIncreaseAllowance.selector;
  //   rrc[2].funcSelectors[8] = IAssetManagerERC20.tokenDecreaseAllowance.selector;
  //   rrc[2].funcSelectors[9] = IAssetManagerERC20.createAsset.selector;
  //   rrc[2].funcSelectors[10] = IAssetManagerERC20.updateAssetSubject.selector;
  //   rrc[2].funcSelectors[11] = IAssetManagerERC20.registerToken.selector;
  //   rrc[2].funcSelectors[12] = IAssetManagerERC20.registerAsset.selector;
  //   rrc[2].funcSelectors[13] = IAssetManagerERC20.removeAsset.selector;
  //   rrc[2].funcSelectors[14] = IAssetManagerERC20.setSafeModeToken.selector;
  //   rrc[2].funcSelectors[15] = bytes4(keccak256("livelyTokensDistribution(address)"));
  //   rrc[2].funcSelectors[16] = bytes4(keccak256("withdrawBalance(address)"));

  //   IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
  //     name: domainName,
  //     version: domainVersion,
  //     realm: realm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   return (rc, rrc);
  // }

  function createAsset(
    AssetManagerStorageERC20.DataCollection storage data,
    IAssetManagerERC20.AssetCreateRequest calldata request,
    address accessControlManager
  ) external returns (address, address) {
    require(bytes(request.assetName).length > 0, "Illegal Name");
    require(bytes(request.assetVersion).length > 0, "Illegal Version");
    require(request.tokenId != address(0), "Illegal TokenId");
    // require(request.assetSubjectId != address(0), "Illeagl Subject");
    require(data.tokensSet.contains(request.tokenId), "TokenId Not Found");

    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[request.tokenId];
    require(
      !tokenData.assets.contains(tokenData.assetSubjectId.predictDeterministicAddress(request.salt)),
      "Already Exists"
    );    

    AssetERC20.InitRequest memory initRequest = AssetERC20.InitRequest({
      contractName: request.assetName,
      contractVersion: request.assetVersion,
      realmId: request.realmId,
      erc20TokenId: request.tokenId,
      accessControlId: accessControlManager,
      assetManagerId: address(this),
      adminId: request.adminId,
      agentId: request.agentId,
      salt: request.salt,
      subjectId: tokenData.assetSubjectId,
      signature: tokenData.assetSignature
    });

    address newAsset = tokenData.assetSubjectId.cloneDeterministic(request.salt);
    AssetERC20(payable(newAsset)).initialize(initRequest);
    tokenData.assets.add(newAsset);
    return (newAsset, tokenData.assetSubjectId);
  }

  function registerToken(AssetManagerStorageERC20.DataCollection storage data, address tokenId, address assetSubjectId, bytes calldata assetSignature)
    external
    returns (string memory, string memory)
  {
    require(!data.tokensSet.contains(tokenId), "Already Registered");
    require(assetSignature.length > 0, "Illegal Signature");

    if(!IERC165(tokenId).supportsInterface(type(IERC20).interfaceId))
      revert("Illegal ERC20");

    if(!IERC165(tokenId).supportsInterface(type(IERC20Extra).interfaceId))
      revert("Illegal ERC20Extra");

    if(IERC165(tokenId).supportsInterface(type(IERC20Lock).interfaceId))
      revert("Illegal ERC20Lock");

    if(!IERC165(assetSubjectId).supportsInterface(type(IAssetERC20).interfaceId))
      revert("Illegal IAssetERC20");

    if(!IERC165(assetSubjectId).supportsInterface(type(IAssetEntity).interfaceId))
      revert("Illegal IAssetEntity");


    string memory tokenName = IERC20(tokenId).name();
    string memory tokenSymbol = IERC20(tokenId).symbol();
    data.tokensSet.add(tokenId);
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    tokenData.status = IAssetManagerERC20.TokenSafeModeStatus.DISABLED;    
    tokenData.assetSubjectId = assetSubjectId;
    tokenData.assetSignature = assetSignature;
    return (tokenName, tokenSymbol);
  }

  function registerAsset(AssetManagerStorageERC20.DataCollection storage data, address assetId)
    external
    returns (bool, address)
  {
    require(assetId != address(0), "Illegal AssetId");

    if(!IERC165(assetId).supportsInterface(type(IAssetERC20).interfaceId)) 
      revert("Illegal IAssetERC20");

    if(!IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId))
      revert("Illegal IAssetEntity");

    address tokenId = IAssetEntity(assetId).assetToken();
    require(data.tokensSet.contains(tokenId), "Not Found");

    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    require(!tokenData.assets.contains(assetId), "Already Registered");

    tokenData.assets.add(assetId);
    if (IAssetEntity(assetId).assetSafeMode() == IAssetEntity.AssetSafeModeStatus.ENABLED) {
      IAssetEntity(assetId).assetSetSafeMode(IAssetEntity.AssetSafeModeStatus.DISABLED);
    }
    return (true, tokenId);
  }

  function removeAsset(AssetManagerStorageERC20.DataCollection storage data, address assetId)
    external
    returns (address)
  {
    require(assetId != address(0), "Illegal AssetId");

    address tokenId = IAssetEntity(assetId).assetToken();
    require(data.tokensSet.contains(tokenId), "TokenId Not Found");

    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    require(tokenData.assets.contains(assetId), "AssetId Not Found");

    tokenData.assets.remove(assetId);
    if (IAssetEntity(assetId).assetSafeMode() == IAssetEntity.AssetSafeModeStatus.DISABLED) {
      IAssetEntity(assetId).assetSetSafeMode(IAssetEntity.AssetSafeModeStatus.ENABLED);
    }
    return tokenId;
  }

  function setSafeModeToken(
    AssetManagerStorageERC20.DataCollection storage data,
    address tokenId,
    IAssetManagerERC20.TokenSafeModeStatus status
  ) external returns (bool) {
    require(data.tokensSet.contains(tokenId), "Not Found");
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    for (uint256 i = 0; i < tokenData.assets.length(); i++) {
      IAssetEntity(tokenData.assets.at(i)).assetSetSafeMode(IAssetEntity.AssetSafeModeStatus(uint8(status)));
    }

    tokenData.status = status;
    return true;
  }

  function predictAddress(
    address implementation,
    bytes32 salt,
    address deployer
  ) external pure returns (address) {
    return implementation.predictDeterministicAddress(salt, deployer);
  }
}
