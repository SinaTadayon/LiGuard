// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IAssetManagerERC20.sol";
import "./IAssetEntity.sol";
import "./AssetManagerStorageERC20.sol";
import "../lively/IERC20.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/proxy/LClones.sol";

/**
 * @title Asset Manager ERC20 Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

contract AssetManagerERC20 is AssetManagerStorageERC20, BaseUUPSProxy, IAssetManagerERC20 {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LClones for address;

  struct InitRequest {
    string contractName;
    string contractVersion;
    address aclManager;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {
    __BASE_UUPS_init(request.contractName, request.contractVersion, request.aclManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      request.contractName,
      request.contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IAssetManagerERC20).interfaceId || super.supportsInterface(interfaceId);
  }

  function registerToken(AssetTokenActionRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.registerToken.selector);
    
    for (uint i = 0; i < requests.length; i++) {    
      require(!_data.tokensSet.contains(requests[i].tokenId), "Already Registered");
      require(requests[i].assetSignature.length > 0, "Illegal Signature");

      if(!IERC165(requests[i].tokenId).supportsInterface(type(IERC20).interfaceId))
        revert("Illegal ERC20");

      if(!IERC165(requests[i].assetSubjectId).supportsInterface(type(IAssetEntity).interfaceId))
        revert("Illegal IAssetEntity");

      string memory tokenName = IERC20(requests[i].tokenId).name();
      string memory tokenSymbol = IERC20(requests[i].tokenId).symbol();
      _data.tokensSet.add(requests[i].tokenId);
      TokenData storage tokenData = _data.tokens[requests[i].tokenId];
      tokenData.assetSubjectId = requests[i].assetSubjectId;
      tokenData.assetSignature = requests[i].assetSignature;

      emit TokenRegistered(_msgSender(), requests[i].tokenId, requests[i].assetSubjectId, tokenName, tokenSymbol);
    }
    return true;
  }

  function updateToken(AssetTokenActionRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.updateToken.selector);

    for (uint i = 0; i < requests.length; i++) {
      require(_data.tokensSet.contains(requests[i].tokenId), "Not Found");
    
      if(!IERC165(requests[i].assetSubjectId).supportsInterface(type(IAssetEntity).interfaceId))
        revert("Illegal IAssetEntity");
        
      require(requests[i].assetSignature.length > 0, "Illegal Signature");
      _data.tokens[requests[i].tokenId].assetSubjectId = requests[i].assetSubjectId;
      _data.tokens[requests[i].tokenId].assetSignature = requests[i].assetSignature;
      emit TokenUpdated(_msgSender(), requests[i].tokenId, requests[i].assetSubjectId);
    }
    return true;
  }
  
  function createAsset(AssetCreateRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.createAsset.selector);

    for (uint i = 0; i < requests.length; i++) {
      require(bytes(requests[i].assetName).length > 0, "Illegal Name");
      require(bytes(requests[i].assetVersion).length > 0, "Illegal Version");
      require(requests[i].tokenId != address(0), "Illegal TokenId");
      require(_data.tokensSet.contains(requests[i].tokenId), "TokenId Not Found");

      address newAsset = requests[i].assetId;
      TokenData storage tokenData = _data.tokens[requests[i].tokenId];
      require(
        !tokenData.assets.contains(tokenData.assetSubjectId.predictDeterministicAddress(requests[i].salt)),
        "Already Exists"
      );    

      IAssetEntity.AssetInitRequest memory initRequest = IAssetEntity.AssetInitRequest({
        contractName: requests[i].assetName,
        contractVersion: requests[i].assetVersion,
        realmId: requests[i].realmId,
        erc20TokenId: requests[i].tokenId,
        accessControlId: _accessControlManager,
        assetManagerId: address(this),
        assetContractId: newAsset,
        adminId: requests[i].adminId,
        agentId: requests[i].agentId,
        salt: requests[i].salt,
        subjectId: tokenData.assetSubjectId,
        signature: tokenData.assetSignature
      });


      if(newAsset == address(0)) {
        newAsset = tokenData.assetSubjectId.cloneDeterministic(requests[i].salt);
      } 
      
      IAssetEntity(payable(newAsset)).assetInitialize(initRequest);
      tokenData.assets.add(newAsset);

      emit AssetCreated(_msgSender(), newAsset, requests[i].tokenId);
    }
    return true;
  }


  function registerAsset(AssetActionRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.registerAsset.selector);
    for (uint i = 0; i < requests.length; i++) {      
      require(requests[i].assetId != address(0), "Illegal AssetId");

      if(!IERC165(requests[i].assetId).supportsInterface(type(IAssetEntity).interfaceId))
        revert("Illegal IAssetEntity");

      require(_data.tokensSet.contains(requests[i].tokenId), "Not Found");

      TokenData storage tokenData = _data.tokens[requests[i].tokenId];
      require(!tokenData.assets.contains(requests[i].assetId), "Already Registered");

      tokenData.assets.add(requests[i].assetId);
      if (IAssetEntity(requests[i].assetId).assetSafeMode() == IAssetEntity.AssetSafeModeStatus.ENABLED) {
        IAssetEntity(requests[i].assetId).assetSetSafeMode(IAssetEntity.AssetSafeModeStatus.DISABLED);
      }
      emit AssetRegistered(_msgSender(), requests[i].assetId, requests[i].tokenId);
    }
    return true;
  }

function removeAsset(AssetActionRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.removeAsset.selector);
    for (uint i = 0; i < requests.length; i++) {
      require(requests[i].assetId != address(0), "Illegal AssetId");
      require(_data.tokensSet.contains(requests[i].tokenId), "TokenId Not Found");

      TokenData storage tokenData = _data.tokens[requests[i].tokenId];
      require(tokenData.assets.contains(requests[i].assetId), "AssetId Not Found");

      tokenData.assets.remove(requests[i].assetId);
      if (IAssetEntity(requests[i].assetId).assetSafeMode() == IAssetEntity.AssetSafeModeStatus.DISABLED) {
        IAssetEntity(requests[i].assetId).assetSetSafeMode(IAssetEntity.AssetSafeModeStatus.ENABLED);
      }
      emit AssetRemoved(_msgSender(), requests[i].assetId, requests[i].tokenId);
    }
    return true;
  }

  function setSafeModeAssets(AssetTokenSafeModeRequest[] calldata requests) external returns (bool) {
    _policyInterceptor(this.setSafeModeAssets.selector);
    for (uint i = 0; i < requests.length; i++) {
      require(_data.tokensSet.contains(requests[i].tokenId), "Not Found");
      TokenData storage tokenData = _data.tokens[requests[i].tokenId];
      for (uint j = 0; j < tokenData.assets.length(); j++) {
        IAssetEntity(tokenData.assets.at(j)).assetSetSafeMode(requests[i].status);
      }
    }
    return true;
  }

  function getSafeModeAsset(address assetId) external view returns (IAssetEntity.AssetSafeModeStatus) {
    return IAssetEntity(assetId).assetSafeMode();
  }

  function getAllTokens() external view returns (address[] memory) {
    return _data.tokensSet.values();
  }

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory) {
    TokenData storage tokenData = _data.tokens[tokenId];
    return TokenInfo({
      assetSubjectId: tokenData.assetSubjectId,
      assets: tokenData.assets.values(),
      assetSignature: tokenData.assetSignature
    });
  }


  function isAssetExists(address assetId) external view returns (bool) {
    return _data.tokens[IAssetEntity(assetId).assetToken()].assets.contains(assetId);
  }

  function isTokenExists(address tokenId) external view returns (bool) {
    return _data.tokensSet.contains(tokenId);
  }

  function predictAddress(
    address implementation,
    bytes32 salt,
    address deployer
  ) external pure returns (address) {
    return implementation.predictDeterministicAddress(salt, deployer);
  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}
}
