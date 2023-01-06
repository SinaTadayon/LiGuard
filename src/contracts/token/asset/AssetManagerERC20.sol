// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IAssetManagerERC20.sol";
import "./IAssetEntity.sol";
import "./AssetManagerStorageERC20.sol";
import "./ERC20/IAssetERC20.sol";
import "../lively/IERC20.sol";
import "../lively/LivelyToken.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/token/LAssetManagerERC20.sol";

/**
 * @title Asset Manager ERC20 Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AssetManagerERC20 is AssetManagerStorageERC20, BaseUUPSProxy, IAssetManagerERC20 {
  using LEnumerableSet for LEnumerableSet.AddressSet;

  struct InitRequest {
    string contractName;
    string contractVersion;
    address aclManager;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {
    // bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.contractName, request.contractVersion, request.aclManager);

    // (
    //   IContextManagement.RequestContext memory rc,
    //   IContextManagement.RequestRegisterContext[] memory rrc
    // ) = LAssetManagerERC20.createRequestContext(_domainName, _domainVersion, _domainRealm);

    // IContextManagement(_accessControlManager).registerContext(request.assetManagerSignature, rc, rrc);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      request.contractName,
      request.contractVersion,
      _getInitializedCount()
    );
  }

  function livelyTokensDistribution(address tokenId) public returns (bool) {
    _policyInterceptor(this.livelyTokensDistribution.selector);
    require(_data.tokensSet.contains(tokenId), "Not Found");

    TokenData storage tokenData = _data.tokens[tokenId];
    require(tokenData.assets.length() == 7, "Illegal Assets");

    address[7] memory assets;
    for (uint256 i = 0; i < 7; i++) {
      assets[i] = tokenData.assets.at(i);
    }
    return LivelyToken(payable(tokenId)).tokensDistribution(address(this), assets);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IAssetManagerERC20).interfaceId || super.supportsInterface(interfaceId);
  }

  // function tokenLock(address assetId, IERC20Lock.LockTokenRequest[] calldata lockRequests)
  //   external
  //   returns (bytes32[] memory)
  // {
  //   _validationAndPolicyInterceptor(assetId, this.tokenLock.selector);
  //   return IAssetERC20(assetId).tokenLock(lockRequests);
  // }

  // function tokenTransfer(
  //   address assetId,
  //   address to,
  //   uint256 amount
  // ) external returns (bool) {
  //   _validationAndPolicyInterceptor(assetId, this.tokenTransfer.selector);
  //   return IAssetERC20(assetId).tokenTransfer(to, amount);
  // }

  // function tokenBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request)
  //   external
  //   returns (bool)
  // {
  //   _validationAndPolicyInterceptor(assetId, this.tokenBatchTransfer.selector);
  //   return IAssetERC20(assetId).tokenBatchTransfer(request);
  // }

  // function tokenTransferFrom(
  //   address assetId,
  //   address from,
  //   address to,
  //   uint256 amount
  // ) external returns (bool) {
  //   _validationAndPolicyInterceptor(assetId, this.tokenTransferFrom.selector);
  //   return IAssetERC20(assetId).tokenTransferFrom(from, to, amount);
  // }

  // function tokenBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request)
  //   external
  //   returns (bool)
  // {
  //   _validationAndPolicyInterceptor(assetId, this.tokenBatchTransferFrom.selector);
  //   return IAssetERC20(assetId).tokenBatchTransferFrom(request);
  // }

  // function tokenApprove(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (bool) {
  //   _validationAndPolicyInterceptor(assetId, this.tokenApprove.selector);
  //   return IAssetERC20(assetId).tokenApprove(spender, amount);
  // }

  // function tokenIncreaseAllowance(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (uint256) {
  //   _validationAndPolicyInterceptor(assetId, this.tokenIncreaseAllowance.selector);
  //   return IAssetERC20(assetId).tokenIncreaseAllowance(spender, amount);
  // }

  // function tokenDecreaseAllowance(
  //   address assetId,
  //   address spender,
  //   uint256 amount
  // ) external returns (uint256) {
  //   _validationAndPolicyInterceptor(assetId, this.tokenDecreaseAllowance.selector);
  //   return IAssetERC20(assetId).tokenDecreaseAllowance(spender, amount);
  // }

  function registerToken(address tokenId, address assetSubjectId, bytes calldata assetSignature) external returns (bool) {
    _policyInterceptor(this.registerToken.selector);
    (string memory tokenName, string memory tokenSymbol) = LAssetManagerERC20.registerToken(_data, tokenId, assetSubjectId, assetSignature);
    emit TokenRegistered(_msgSender(), tokenId, assetSubjectId, tokenName, tokenSymbol);
    return true;
  }

  function updateToken(address tokenId, address assetSubjectId, bytes calldata assetSignature) external returns (bool) {
    _policyInterceptor(this.updateToken.selector);
    require(_data.tokensSet.contains(tokenId), "Not Found");
    if(!IERC165(assetSubjectId).supportsInterface(type(IAssetERC20).interfaceId))
      revert("Illegal IAssetERC20");

    if(!IERC165(assetSubjectId).supportsInterface(type(IAssetEntity).interfaceId))
      revert("Illegal IAssetEntity");
      
    require(assetSignature.length > 0, "Illegal Signature");
    _data.tokens[tokenId].assetSubjectId = assetSubjectId;
    _data.tokens[tokenId].assetSignature = assetSignature;
    emit TokenUpdated(_msgSender(), tokenId, assetSubjectId);
    return true;
  }

  function setSafeModeToken(address tokenId, TokenSafeModeStatus status) external returns (bool) {
    _policyInterceptor(this.setSafeModeToken.selector);
    emit TokenSafeModeUpdated(_msgSender(), tokenId, status);
    return LAssetManagerERC20.setSafeModeToken(_data, tokenId, status);
  }
  
  function createAsset(AssetCreateRequest calldata request) external returns (address) {
    _policyInterceptor(this.createAsset.selector);
    (address newAsset, ) = LAssetManagerERC20.createAsset(
      _data,
      request,
      _accessControlManager      
    );
    emit AssetCreated(_msgSender(), newAsset, request.tokenId);
    return newAsset;
  }


  function registerAsset(address assetId) external returns (bool) {
    _policyInterceptor(this.registerAsset.selector);
    (bool result, address tokenId) = LAssetManagerERC20.registerAsset(_data, assetId);
    emit AssetRegistered(_msgSender(), assetId, tokenId);
    return result;
  }

  function removeAsset(address assetId) external returns (bool) {
    _policyInterceptor(this.removeAsset.selector);
    address tokenId = LAssetManagerERC20.removeAsset(_data, assetId);
    emit AssetRemoved(_msgSender(), assetId, tokenId);
    return true;
  }

  function getAllTokens() external view returns (address[] memory) {
    return _data.tokensSet.values();
  }

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory) {
    TokenData storage tokenData = _data.tokens[tokenId];
    return TokenInfo({
      assetSubjectId: tokenData.assetSubjectId,
      assets: tokenData.assets.values(),
      assetSignature: tokenData.assetSignature,
      status: tokenData.status
    });
  }

  function safeModeToken(address tokenId) external view returns (TokenSafeModeStatus) {
    return _data.tokens[tokenId].status;
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
    return LAssetManagerERC20.predictAddress(implementation, salt, deployer);
  }

  function getLibrary() public pure returns (address) {
    return address(LAssetManagerERC20);
  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}

  function _validationAndPolicyInterceptor(address assetId, bytes4 funcSelector) private {
    _policyInterceptor(funcSelector);
    require(assetId != address(0), "Illegal Address");

    if(IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId))
      revert("Illegal IAssetEntity");

    // try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
    //   require(isSupported, "Invalid IAssetEntity");
    // } catch {
    //   revert("Illegal IAssetEntity");
    // }

    // if(IAssetEntity(assetId).assetType() != AssetType.ERC20)
    //   revert("Illegal AssetType");

    address tokenId = IAssetEntity(assetId).assetToken();
    require(_data.tokensSet.contains(tokenId), "TokenId Not Found");

    TokenData storage tokenData = _data.tokens[tokenId];
    require(tokenData.assets.contains(assetId), "AssetId Not Found");
  }
}
