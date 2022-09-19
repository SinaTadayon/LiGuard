// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetManagerERC20.sol";
import "./IAssetRegistry.sol";
import "./AssetManagerStorage.sol";
import "./ERC20/IAssetERC20.sol";
import "../lively/IERC20.sol";
import "../interfaces/IERC721.sol";
import "../interfaces/IERC721Metadata.sol";
import "../interfaces/IERC1155.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/LAddress.sol";
import "../../acl/IContextManagement.sol";

import "hardhat/console.sol";

contract AssetManager is AssetManagerStorage, BaseUUPSProxy, IAssetManagerERC20, IAssetRegistry {

  using LAddress for address;

  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;    
    address accessControlManager;
    bytes assetManagerSignature;
    bytes assetCreationSignature;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {

    bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.domainName, request.domainVersion, realm, request.accessControlManager);
  
    (IContextManagement.RequestContext memory rc, IContextManagement.RequestRegisterContext[] memory rrc) = 
      _createRequestContext(_domainName, _domainVersion, _domainRealm);

    IContextManagement(_accessControlManager).registerContext(request.signature, rc, rrc);

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

  function _createRequestContext(
    bytes32 domainName,
    bytes32 domainVersion,
    bytes32 realm
  )
    internal
    view
    returns (IContextManagement.RequestContext memory, IContextManagement.RequestRegisterContext[] memory)
  {
    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](5);

    rrc[0].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAdminRole();
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](1);
    rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;

    rrc[1].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelySystemAdminRole();
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](3);
    rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[1].funcSelectors[1] = IProxy.setSafeMode.selector;
    rrc[1].funcSelectors[2] = IProxy.upgradeTo.selector;

    rrc[2].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAssetAdminRole();
    rrc[2].isEnabled = true;
    rrc[2].funcSelectors = new bytes4[](19);
    rrc[2].funcSelectors[0] = IAssetManagerERC20.assetLock.selector;
    rrc[2].funcSelectors[1] = IAssetManagerERC20.assetBatchLock.selector;
    rrc[2].funcSelectors[2] = IAssetManagerERC20.assetTransfer.selector;
    rrc[2].funcSelectors[3] = IAssetManagerERC20.assetBatchTransfer.selector;
    rrc[2].funcSelectors[4] = IAssetManagerERC20.assetTransferFrom.selector;
    rrc[2].funcSelectors[5] = IAssetManagerERC20.assetBatchTransferFrom.selector;
    rrc[2].funcSelectors[6] = IAssetManagerERC20.assetApprove.selector;
    rrc[2].funcSelectors[7] = IAssetManagerERC20.assetIncreaseAllowance.selector;
    rrc[2].funcSelectors[8] = IAssetManagerERC20.assetDecreaseAllowance.selector;
    rrc[2].funcSelectors[9] = IAssetManagerERC20.assetPermit.selector;
    rrc[2].funcSelectors[10] = IAssetRegistry.createAsset.selector;
    rrc[2].funcSelectors[12] = IAssetRegistry.registerToken.selector;
    rrc[2].funcSelectors[13] = IAssetRegistry.registerAsset.selector;
    rrc[2].funcSelectors[14] = IAssetRegistry.removeAsset.selector;
    rrc[2].funcSelectors[15] = IAssetRegistry.safeModeAsset.selector;
    rrc[2].funcSelectors[16] = IAssetRegistry.safeModeToken.selector;
    rrc[2].funcSelectors[17] = IAssetRegistry.safeModeAssetType.selector;
    rrc[2].funcSelectors[18] = bytes4(keccak256("withdrawBalance(address)"));
    
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: domainName,
      version: domainVersion,
      realm: realm,
      smca: address(this),
      status: true
    });

    return (rc, rrc);
  }

  function assetLock(address assetId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32) {
    _validationAndPolicyInterceptor(assetId, this.assetLock.selector);
    return IAssetERC20(assetId).tokenLock(lockRequest);
  }

  function assetBatchLock(address assetId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory) {
    _validationAndPolicyInterceptor(assetId, this.assetBatchLock.selector);
    return IAssetERC20(assetId).tokenBatchLock(lockRequests);
  }

  function assetTransfer(address assetId, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetTransfer.selector);
    return IAssetERC20(assetId).tokenTransfer(to, amount);
  }

  function assetBatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetBatchTransfer.selector);
    return IAssetERC20(assetId).tokenBatchTransfer(request);
  }

  function assetTransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetTransferFrom.selector);
    return IAssetERC20(assetId).tokenTransferFrom(from, to, amount);
  }

  function assetBatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetBatchTransferFrom.selector);
    return IAssetERC20(assetId).tokenBatchTransferFrom(request);
  }

  function assetApprove(address assetId, address spender, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetApprove.selector);
    return IAssetERC20(assetId).tokenApprove(spender, amount);
  }

  function assetIncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.assetIncreaseAllowance.selector);
    return IAssetERC20(assetId).tokenIncreaseAllowance(spender, amount);
  }

  function assetDecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.assetDecreaseAllowance.selector);
    return IAssetERC20(assetId).tokenDecreaseAllowance(spender, amount);
  }

  function assetPermit(
    address assetId,
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.assetPermit.selector);
    return IAssetERC20(assetId).tokenPermit(owner, spender, value, deadline, signature);
  }

  function createAsset(string calldata assetName, string calldata assetVersion, IAssetEntity.AssetType assetType, address tokenId) external returns (address) {
    _policyInterceptor(this.createAsset.selector);
    require(bytes(assetName).length > 0 , "Invalid Asset Name");
    require(bytes(assetVersion).length > 0 , "Invalid Asset Version");
    require(assetType != IAssetEntity.AssetType.NONE , "Invalid Asset Type");


    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");



  }

  function registerToken(IAssetEntity.AssetType assetType, address tokenId) external returns (bool) {
    _policyInterceptor(this.registerToken.selector);
    require(_tokens[tokenId].assetType == IAssetEntity.AssetType.NONE, "Token Already Registered");
    string memory tokenName = "";
    string memory tokenSymbol = "";

    if (assetType == IAssetEntity.AssetType.ERC20) {
      try IERC165(tokenId).supportsInterface(type(IERC20).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid ERC20 Token Address");
      } catch {
        revert("Illegal ERC20 Token Address");
      }

      try IERC165(tokenId).supportsInterface(type(IERC20Extra).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid ERC20 TokenExtra Address");
      } catch {
        revert("Illegal ERC20 TokenExtra Address");
      }

      try IERC165(tokenId).supportsInterface(type(IERC20Lock).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid ERC20 TokenLock Address");
      } catch {
        revert("Illegal ERC20 TokenLock Address");
      }
   
      tokenName = IERC20(tokenId).name();
      tokenSymbol = IERC20(tokenId).symbol();

    } else if (assetType == IAssetEntity.AssetType.ERC721) {
      try IERC165(tokenId).supportsInterface(type(IERC721).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid ERC721 Token Address");
      } catch {
        revert("Illegal ERC721 Token Address");
      }

      tokenName = IERC721Metadata(tokenId).name();
      tokenSymbol = IERC721Metadata(tokenId).symbol();
   
    } else if (assetType == IAssetEntity.AssetType.ERC1155) {
      try IERC165(tokenId).supportsInterface(type(IERC1155).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid ERC1155 Token Address");
      } catch {
        revert("Illegal ERC1155 Token Address");
      }
    }

    TokenData storage tokenData = _tokens[tokenId];
    tokenData.assetType = assetType;
    tokenData.status = IAssetEntity.AssetStatus.ACTIVE;

    emit TokenRegistered(_msgSender(), tokenId, assetType, tokenName, tokenSymbol);
    return true;
  }

  function registerAsset(address assetId) external returns (bool) {
    _policyInterceptor(this.registerAsset.selector);
  }

  function removeAsset(address assetId) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.removeAsset.selector);
  }

  function safeModeAsset(address assetId) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.safeModeAsset.selector);
  }

  function safeModeToken(address tokenId) external returns (bool) {
    _policyInterceptor(this.safeModeToken.selector);
  }

  function safeModeAssetType(IAssetEntity.AssetType assetType) external returns (bool) {
    _policyInterceptor(this.safeModeAssetType.selector);
  }

  function isSafeModeAsset(address assetId) external view returns (bool) {

  }

  function getAssetInfo(address assetId) external view returns (AssetInfo memory) {

  }

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory) {

  }

  function getTokenAssets(address tokenId) external view returns (AssetInfo[] memory) {

  }

  function getAllTokens(IAssetEntity.AssetType assetType) external view returns (IAssetEntity.AssetStatus status, TokenInfo[] memory) {

  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}

  function _validationAndPolicyInterceptor(address assetId, bytes4 funcSelector) private {
    _policyInterceptor(funcSelector);
     require(assetId != address(0), "Invalid Address");

    address tokenId = _assetTokenMap[assetId];
    TokenData storage tokenData = _tokens[tokenId];

    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "AssetId Not Found");
    require(tokenData.status == IAssetEntity.AssetStatus.ACTIVE, "Token Assets Not Activated");
  }
}