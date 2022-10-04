// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetManagerERC20.sol";
import "./IAssetEntity.sol";
import "./AssetManagerStorageERC20.sol";
import "./ERC20/IAssetERC20.sol";
import "../lively/IERC20.sol";
import "../lively/LivelyToken.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/token/LAssetManagerERC20.sol";

import "hardhat/console.sol";

contract AssetManagerERC20 is AssetManagerStorageERC20, BaseUUPSProxy, IAssetManagerERC20 {

  using LEnumerableSet for LEnumerableSet.AddressSet;

  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;    
    address accessControlManager;
    bytes assetManagerSignature;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {

    bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.domainName, request.domainVersion, realm, request.accessControlManager);

    (IContextManagement.RequestContext memory rc, IContextManagement.RequestRegisterContext[] memory rrc) = 
      LAssetManagerERC20.createRequestContext(_domainName, _domainVersion, _domainRealm);

    IContextManagement(_accessControlManager).registerContext(request.assetManagerSignature, rc, rrc);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      request.domainName,
      request.domainVersion,
      realm,
      _getInitializedCount()
    );
  }

  function registerAssetRoles() public {
    _policyInterceptor(this.registerAssetRoles.selector);
    LAssetManagerERC20.registerAssetRoles(_accessControlManager);
  }

  function livelyTokensDistribution(address tokenId) public returns (bool) {
    _policyInterceptor(this.livelyTokensDistribution.selector);
    require(!_data.tokensSet.contains(tokenId), "TokenId Not Found");
    
    TokenData storage tokenData = _data.tokens[tokenId];
    require(tokenData.assets.length() == 7, "Asset Required Failed");

    address[7] memory assets;
    for(uint i = 0; i < 7; i++) {
      assets[i] = tokenData.assets.at(i);
    }
    return LivelyToken(payable(tokenId)).tokensDistribution(assets);
  }

  function tokenLock(address tokenId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32) {
    _lockPolicyInterceptor(this.tokenLock.selector);
    return IERC20Lock(tokenId).lockToken(lockRequest);
  }

  function tokenBatchLock(address tokenId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory) {
    _lockPolicyInterceptor(this.tokenBatchLock.selector);
    return IERC20Lock(tokenId).batchLockToken(lockRequests);
  }

  function tokenTransfer(address assetId, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.tokenTransfer.selector);
    return IAssetERC20(assetId).tokenTransfer(to, amount);
  }

  function tokenBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.tokenBatchTransfer.selector);
    return IAssetERC20(assetId).tokenBatchTransfer(request);
  }

  function tokenTransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.tokenTransferFrom.selector);
    return IAssetERC20(assetId).tokenTransferFrom(from, to, amount);
  }

  function tokenBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.tokenBatchTransferFrom.selector);
    return IAssetERC20(assetId).tokenBatchTransferFrom(request);
  }

  function tokenApprove(address assetId, address spender, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.tokenApprove.selector);
    return IAssetERC20(assetId).tokenApprove(spender, amount);
  }

  function tokenIncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.tokenIncreaseAllowance.selector);
    return IAssetERC20(assetId).tokenIncreaseAllowance(spender, amount);
  }

  function tokenDecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.tokenDecreaseAllowance.selector);
    return IAssetERC20(assetId).tokenDecreaseAllowance(spender, amount);
  }

  function createAsset(CreateAssetRequest calldata request) external returns (address) {
    _policyInterceptor(this.createAsset.selector);
    (address newAsset, address assetImpl) = LAssetManagerERC20.createAsset(_data, request, _accessControlManager, _assetImplERC20, _assetCreationSignature);
    emit AssetCreated(_msgSender(), newAsset, request.tokenId, assetImpl);
    return newAsset;
  }

  function registerToken(address tokenId) external returns (bool) {
    _policyInterceptor(this.registerToken.selector);
    (string memory tokenName, string memory tokenSymbol) = LAssetManagerERC20.registerToken(_data, tokenId);
    emit TokenRegistered(_msgSender(), tokenId, tokenName, tokenSymbol);
    return true;
  }

  function removeAsset(address assetId) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.removeAsset.selector);
    address tokenId = LAssetManagerERC20.removeAsset(_data, assetId);
    emit AssetRemoved(_msgSender(), assetId, tokenId);
    return true;
  }

  function updateAssetImpl(address assetImpl, bytes calldata assetCreationSignature) external returns (bool) {
    _policyInterceptor(this.updateAssetImpl.selector);
    try IERC165(assetImpl).supportsInterface(type(IAssetERC20).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetERC20");
    } catch {
      revert("Illegal IAssetERC20");
    }

    try IERC165(assetImpl).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity");
    } catch {
      revert("Illegal IAssetEntity");
    }

    require(_assetImplERC20 != assetImpl, "AssetImpl Already Exists");
    require(assetCreationSignature.length > 0, "Invalid Signature");
    _assetImplERC20 = assetImpl;
    _assetCreationSignature = assetCreationSignature;
    emit AssetImplUpdated(_msgSender(), assetImpl);
    return true;
  }

  function setSafeModeToken(address tokenId, bool isEnabled) external returns (bool) {
    _policyInterceptor(this.setSafeModeToken.selector);
    emit TokenSafeModeChanged(_msgSender(), tokenId, isEnabled);
    return LAssetManagerERC20.setSafeModeToken(_data, tokenId, isEnabled);
  }

  function getAllTokens() external view returns(address[] memory) {
    return _data.tokensSet.values();
  }

  function getTokenInfo(address tokenId) external view returns (IAssetEntity.Status, address[] memory) {
   TokenData storage tokenData = _data.tokens[tokenId];
    return (tokenData.status, tokenData.assets.values());
  }

  function isSafeModeAsset(address assetId) external view returns (bool) {
    return IAssetEntity(assetId).assetSafeMode();
  }

  function isAssetExists(address assetId) external view returns (bool) {
    return _data.tokens[IAssetEntity(assetId).assetToken()].assets.contains(assetId);
  }

  function isTokenExists(address tokenId) external view returns (bool) {
    return _data.tokensSet.contains(tokenId);
  }

  function predictAddress(address base, bytes32 salt) external view returns (address) {
    return LAssetManagerERC20.predictAddress(base, salt);
  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}

  function _validationAndPolicyInterceptor(address assetId, bytes4 funcSelector) private {
    _policyInterceptor(funcSelector);
    require(assetId != address(0), "Invalid AssetId");

    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity");
    } catch {
      revert("Illegal IAssetEntity");
    }

    address tokenId = IAssetEntity(assetId).assetToken();
    require(!_data.tokensSet.contains(tokenId), "TokenId Not Found");
    
    TokenData storage tokenData = _data.tokens[tokenId];    
    require(tokenData.assets.contains(assetId), "AssetId Not Found");
  }

  function _lockPolicyInterceptor(bytes4 funcSelector) private view {
    require(!_isSafeMode, "SafeMode: Call Rejected");

    if(_msgSender().code.length > 0) {
      try IERC165(_msgSender()).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid IAssetEntity");
      } catch {
        revert("Illegal IAssetEntity");
      }

      address tokenId = IAssetEntity(_msgSender()).assetToken();
      require(!_data.tokensSet.contains(tokenId), "TokenId Not Found");
      
      TokenData storage tokenData = _data.tokens[tokenId];      
      require(tokenData.assets.contains(_msgSender()), "AssetId Not Found");
        
      bytes32 context = LContextUtils.generateCtx(address(this));
      require(IAccessControl(_accessControlManager).isContextFunctionEnabled(context, funcSelector), "Context Disabled");
      require(IAccessControl(_accessControlManager).isRoleEnabled(IAccessControl(_accessControlManager).livelyAssetManagerRole()), "AssetManager Role Disabled");
      require(IAccessControl(_accessControlManager).isGroupEnabled(IAccessControl(_accessControlManager).livelyAssetGroup()), "AssetGroup Disabled");
      require(IAccessControl(_accessControlManager).isRealmEnabled(_domainRealm), "Realm Disabled");
    } else {
      require(IAccessControl(_accessControlManager).hasAccess(LContextUtils.generateCtx(address(this)),_msgSender(),funcSelector), "Access Denied");
    }
  }
  
}