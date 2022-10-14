// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../token/asset/IAssetManagerERC20.sol";
import "../../token/asset/AssetManagerStorageERC20.sol";
import "../../token/asset/ERC20/AssetERC20.sol";
import "../../token/lively/IERC20.sol";
import "../../proxy/IProxy.sol";
import "../../acl/IContextManagement.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IAccessControl.sol";
import "../../utils/IERC165.sol";
import "../struct/LEnumerableSet.sol";
import "../LContextUtils.sol";
import "../proxy/LClones.sol";

import "hardhat/console.sol";

library LAssetManagerERC20 {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LClones for address;

  bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LAssetManagerERC20"));
  bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

  bytes32 public constant LIVELY_ASSET_GROUP = keccak256(abi.encodePacked("LIVELY_ASSET_GROUP"));
  bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));
  bytes32 public constant LIVELY_ASSET_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_ADMIN_ROLE"));
  bytes32 public constant LIVELY_ASSET_MANAGER_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_MANAGER_ROLE"));

  function createRequestContext(
    bytes32 domainName,
    bytes32 domainVersion,
    bytes32 realm
  )
    external
    view
    returns (IContextManagement.RequestContext memory, IContextManagement.RequestRegisterContext[] memory)
  {
    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](3);

    rrc[0].role = LIVELY_ADMIN_ROLE;
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
    rrc[0].funcSelectors[1] = IProxy.setSafeMode.selector;

    rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](2);
    rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;

    rrc[2].role = LIVELY_ASSET_ADMIN_ROLE;
    rrc[2].isEnabled = true;
    rrc[2].funcSelectors = new bytes4[](17);
    rrc[2].funcSelectors[0] = IAssetManagerERC20.tokenLock.selector;
    rrc[2].funcSelectors[1] = IAssetManagerERC20.tokenBatchLock.selector;
    rrc[2].funcSelectors[2] = IAssetManagerERC20.tokenTransfer.selector;
    rrc[2].funcSelectors[3] = IAssetManagerERC20.tokenBatchTransfer.selector;
    rrc[2].funcSelectors[4] = IAssetManagerERC20.tokenTransferFrom.selector;
    rrc[2].funcSelectors[5] = IAssetManagerERC20.tokenBatchTransferFrom.selector;
    rrc[2].funcSelectors[6] = IAssetManagerERC20.tokenApprove.selector;
    rrc[2].funcSelectors[7] = IAssetManagerERC20.tokenIncreaseAllowance.selector;
    rrc[2].funcSelectors[8] = IAssetManagerERC20.tokenDecreaseAllowance.selector;
    rrc[2].funcSelectors[9] =  IAssetManagerERC20.createAsset.selector;
    rrc[2].funcSelectors[10] = IAssetManagerERC20.updateAssetSubject.selector;
    rrc[2].funcSelectors[11] = IAssetManagerERC20.registerToken.selector;
    rrc[2].funcSelectors[12] = IAssetManagerERC20.registerAsset.selector;
    rrc[2].funcSelectors[13] = IAssetManagerERC20.removeAsset.selector;
    rrc[2].funcSelectors[14] = IAssetManagerERC20.setSafeModeToken.selector;
    rrc[2].funcSelectors[15] = bytes4(keccak256("livelyTokensDistribution(address)"));
    rrc[2].funcSelectors[16] = bytes4(keccak256("withdrawBalance(address)"));
      
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: domainName,
      version: domainVersion,
      realm: realm,
      contractId: address(this),
      status: true
    });

    return (rc, rrc);
  }

  function createAsset(AssetManagerStorageERC20.DataCollection storage data, IAssetManagerERC20.CreateAssetRequest calldata request, address accessControlManager, address assetSubject, bytes calldata assetCreationSignature) external returns (address, address) {
    require(bytes(request.assetName).length > 0 , "Invalid Asset Name");
    require(bytes(request.assetVersion).length > 0 , "Invalid Asset Version");
    require(request.tokenId != address(0) , "Invalid TokenId Address");
    require(assetSubject != address(0), "Invalid Asset Subject ERC20");
    require(data.tokensSet.contains(request.tokenId), "TokenId Not Found");

    bytes32 assetGroup = LIVELY_ASSET_GROUP;
    require(IGroupManagement(accessControlManager).hasGroupRole(assetGroup, request.role), "Asset Role Not Found");
  
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[request.tokenId];
    require(!tokenData.assets.contains(assetSubject.predictDeterministicAddress(request.salt)), "AssetId Already Exists");

    AssetERC20.InitRequest memory initRequest = AssetERC20.InitRequest ({
      domainName: request.assetName,
      domainVersion: request.assetVersion,  
      domainRealm: IProxy(address(this)).contractRealm(),
      erc20Token: request.tokenId,
      accessControl: accessControlManager,
      assetManager: address(this),
      assetRole: request.role,
      salt: request.salt,
      subject: assetSubject,
      signature: assetCreationSignature
    });

    address newAsset = assetSubject.cloneDeterministic(request.salt);
    // console.log("newAsset Address: %s, predicate address: %s", newAsset, predictedContractId);
    // console.log("bytesHash: ");
    // console.logBytes32(keccak256(abi.encodePacked(type(AssetERC20).creationCode)));
    // console.log("Salt: ");
    // console.logBytes32(initRequest.salt);
    AssetERC20(payable(newAsset)).initialize(initRequest);
    tokenData.assets.add(newAsset);
    return (newAsset, assetSubject);
  }

  function registerToken(AssetManagerStorageERC20.DataCollection storage data, address tokenId) external returns (string memory, string memory) {   
    require(!data.tokensSet.contains(tokenId), "TokenId Already Registered");

    try IERC165(tokenId).supportsInterface(type(IERC20).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20");
    } catch {
      revert("Illegal ERC20");
    }

    try IERC165(tokenId).supportsInterface(type(IERC20Extra).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20Extra");
    } catch {
      revert("Illegal ERC20Extra");
    }

    try IERC165(tokenId).supportsInterface(type(IERC20Lock).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20Lock");
    } catch {
      revert("Illegal ERC20Lock");
    }

    // require(IERC165(tokenId).supportsInterface(type(IERC20).interfaceId), "Invalid ERC20");
    // require(IERC165(tokenId).supportsInterface(type(IERC20Extra).interfaceId), "Invalid ERC20Extra");
    // require(IERC165(tokenId).supportsInterface(type(IERC20Lock).interfaceId), "Invalid ERC20Lock");   
    string memory tokenName = IERC20(tokenId).name();
    string memory tokenSymbol = IERC20(tokenId).symbol();

    data.tokensSet.add(tokenId);
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    tokenData.status = IAssetEntity.Status.ACTIVE;
    return (tokenName, tokenSymbol);
  }

  function registerAsset(AssetManagerStorageERC20.DataCollection storage data, address assetId) external returns (bool, address) {
    require(assetId != address(0), "Invalid AssetId Address");
    
    try IERC165(assetId).supportsInterface(type(IAssetERC20).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetERC20");
    } catch {
      revert("Illegal IAssetERC20");
    }

    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity");
    } catch {
      revert("Illegal IAssetEntity");
    }


    address tokenId = IAssetEntity(assetId).assetToken();
    require(data.tokensSet.contains(tokenId), "TokenId Not Found");
    
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    require(!tokenData.assets.contains(assetId), "AssetId Already Registered");
    
    tokenData.assets.add(assetId);
    if(IAssetEntity(assetId).assetSafeMode()) {
      IAssetEntity(assetId).assetSafeModeSet(false);
    }
    return (true, tokenId);
  }

  function removeAsset(AssetManagerStorageERC20.DataCollection storage data, address assetId) external returns (address) {
    require(assetId != address(0), "Invalid AssetId Address");
    
    address tokenId = IAssetEntity(assetId).assetToken();
    require(data.tokensSet.contains(tokenId), "TokenId Not Found");
    
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    require(tokenData.assets.contains(assetId), "AssetId Not Found");
    
    tokenData.assets.remove(assetId);
    if(!IAssetEntity(assetId).assetSafeMode()) {
      IAssetEntity(assetId).assetSafeModeSet(true);
    }    
    return tokenId;
  }

  function setSafeModeToken(AssetManagerStorageERC20.DataCollection storage data, address tokenId, bool isEnabled) external returns (bool) {    
    require(data.tokensSet.contains(tokenId), "TokenId Not Found");
    AssetManagerStorageERC20.TokenData storage tokenData = data.tokens[tokenId];
    for(uint i = 0; i < tokenData.assets.length(); i++) {
      IAssetEntity(tokenData.assets.at(i)).assetSafeModeSet(isEnabled);
    }

    tokenData.status = IAssetEntity.Status.SAFE_MODE;  
    return true;
  }

  function predictAddress(address implementation, bytes32 salt, address deployer) external pure returns (address) {
    return implementation.predictDeterministicAddress(salt, deployer);
  }
}