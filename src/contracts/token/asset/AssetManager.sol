// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IERC20Manager.sol";
import "./IAssetManager.sol";
import "./IAssetEntity.sol";
import "./AssetManagerStorage.sol";
import "./ERC20/IAssetERC20.sol";
import "./ERC20/AssetERC20.sol";
import "../lively/IERC20.sol";
import "../interfaces/IERC721.sol";
import "../interfaces/IERC721Metadata.sol";
import "../interfaces/IERC1155.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/LAddress.sol";
import "../../lib/LContextUtils.sol";
import "../../lib/proxy/LClones.sol";
import "../../acl/IContextManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRealmManagement.sol";


import "hardhat/console.sol";

contract AssetManager is AssetManagerStorage, BaseUUPSProxy, IERC20Manager, IAssetManager {

  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LAddress for address;
  using LClones for address;

  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;    
    address accessControlManager;
    address erc20AssetImplementation;
    bytes assetManagerSignature;
    bytes assetCreationSignature;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {

    bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.domainName, request.domainVersion, realm, request.accessControlManager);

    try IERC165(request.erc20AssetImplementation).supportsInterface(type(IAssetERC20).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetERC20 Address");
    } catch {
      revert("Illegal IAssetERC20 Address");
    }

    try IERC165(request.erc20AssetImplementation).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity Address");
    } catch {
      revert("Illegal IAssetEntity Address");
    }

    AssetTypeData storage assetData = _assetTypes[IAssetEntity.AssetType.ERC20];
    assetData.assetImplement = request.erc20AssetImplementation;
    assetData.status = IAssetEntity.Status.ACTIVE;

    _assetCreationSignature = request.assetCreationSignature;

    (IContextManagement.RequestContext memory rc, IContextManagement.RequestRegisterContext[] memory rrc) = 
      _createRequestContext(_domainName, _domainVersion, _domainRealm);

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
    bytes32 assetGroup = IAccessControl(_accessControlManager).livelyAssetGroup();
    
    IRoleManagement(_accessControlManager).registerRole("LIVELY_CROWD_FOUNDING_ASSET_ROLE", assetGroup, true);
    IRoleManagement(_accessControlManager).registerRole("LIVELY_VALIDATORS_REWARDS_ASSET_ROLE", assetGroup, true);
    IRoleManagement(_accessControlManager).registerRole("LIVELY_PUBLIC_SALE_ASSET_ROLE", assetGroup, true);
    IRoleManagement(_accessControlManager).registerRole("LIVELY_TREASURY_ASSET_ROLE", assetGroup, true);
    IRoleManagement(_accessControlManager).registerRole("LIVELY_FOUNDING_TEAM_ASSET_ROLE", assetGroup, true);
    IRoleManagement(_accessControlManager).registerRole("LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE", assetGroup, true);
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
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
    rrc[0].funcSelectors[1] = IProxy.setSafeMode.selector;

    rrc[1].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelySystemAdminRole();
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](3);
    rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
    rrc[2].funcSelectors[2] = this.registerAssetRoles.selector;

    rrc[2].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAssetAdminRole();
    rrc[2].isEnabled = true;
    rrc[2].funcSelectors = new bytes4[](17);
    rrc[2].funcSelectors[0] = IERC20Manager.erc20Lock.selector;
    rrc[2].funcSelectors[1] = IERC20Manager.erc20BatchLock.selector;
    rrc[2].funcSelectors[2] = IERC20Manager.erc20Transfer.selector;
    rrc[2].funcSelectors[3] = IERC20Manager.erc20BatchTransfer.selector;
    rrc[2].funcSelectors[4] = IERC20Manager.erc20TransferFrom.selector;
    rrc[2].funcSelectors[5] = IERC20Manager.erc20BatchTransferFrom.selector;
    rrc[2].funcSelectors[6] = IERC20Manager.erc20Approve.selector;
    rrc[2].funcSelectors[7] = IERC20Manager.erc20IncreaseAllowance.selector;
    rrc[2].funcSelectors[8] = IERC20Manager.erc20DecreaseAllowance.selector;
    rrc[2].funcSelectors[9] = IAssetManager.createAsset.selector;
    rrc[2].funcSelectors[10] = IAssetManager.registerToken.selector;
    rrc[2].funcSelectors[11] = IAssetManager.registerAsset.selector;
    rrc[2].funcSelectors[12] = IAssetManager.removeAsset.selector;
    rrc[2].funcSelectors[13] = IAssetManager.safeModeAsset.selector;
    rrc[2].funcSelectors[14] = IAssetManager.safeModeToken.selector;
    rrc[2].funcSelectors[15] = IAssetManager.safeModeAssetType.selector;
    rrc[2].funcSelectors[16] = this.withdrawBalance.selector;
      
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: domainName,
      version: domainVersion,
      realm: realm,
      contractId: address(this),
      status: true
    });

    return (rc, rrc);
  }

  function erc20Lock(address tokenId, IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32) {
    _lockPolicyInterceptor(tokenId, this.erc20Lock.selector);
    return IERC20Lock(tokenId).lockToken(lockRequest);
  }

  function erc20BatchLock(address tokenId, IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory) {
    _lockPolicyInterceptor(tokenId, this.erc20BatchLock.selector);
    return IERC20Lock(tokenId).batchLockToken(lockRequests);
  }

  function erc20Transfer(address assetId, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.erc20Transfer.selector);
    return IAssetERC20(assetId).tokenTransfer(to, amount);
  }

  function erc20BatchTransfer(address assetId, IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.erc20BatchTransfer.selector);
    return IAssetERC20(assetId).tokenBatchTransfer(request);
  }

  function erc20TransferFrom(address assetId, address from, address to, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.erc20TransferFrom.selector);
    return IAssetERC20(assetId).tokenTransferFrom(from, to, amount);
  }

  function erc20BatchTransferFrom(address assetId, IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.erc20BatchTransferFrom.selector);
    return IAssetERC20(assetId).tokenBatchTransferFrom(request);
  }

  function erc20Approve(address assetId, address spender, uint256 amount) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.erc20Approve.selector);
    return IAssetERC20(assetId).tokenApprove(spender, amount);
  }

  function erc20IncreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.erc20IncreaseAllowance.selector);
    return IAssetERC20(assetId).tokenIncreaseAllowance(spender, amount);
  }

  function erc20DecreaseAllowance(address assetId, address spender, uint256 amount) external returns (uint256) {
    _validationAndPolicyInterceptor(assetId, this.erc20DecreaseAllowance.selector);
    return IAssetERC20(assetId).tokenDecreaseAllowance(spender, amount);
  }

  function createAsset(CreateAssetRequest calldata request) external returns (address) {
    _policyInterceptor(this.createAsset.selector);
    require(bytes(request.assetName).length > 0 , "Invalid Asset Name");
    require(bytes(request.assetVersion).length > 0 , "Invalid Asset Version");
    require(request.tokenId != address(0) , "Invalid TokenId Address");

    bytes32 assetGroup = IAccessControl(_accessControlManager).livelyAssetGroup();
    require(IGroupManagement(_accessControlManager).hasGroupRole(assetGroup, request.role), "Asset Role Not Found");

    TokenData storage tokenData = _tokens[request.tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    
    address assetImpl = _assetTypes[tokenData.assetType].assetImplement;
    require(!tokenData.assets.contains(assetImpl.predictDeterministicAddress(request.salt)), "Asset Already Exists");

    AssetERC20.InitRequest memory initRequest = AssetERC20.InitRequest ({
      domainName: request.assetName,
      domainVersion: request.assetVersion,  
      domainRealm: _domainRealm, 
      erc20Token: request.tokenId,
      accessControl: _accessControlManager,
      assetManager: address(this),
      assetRole: request.role,
      salt: request.salt,
      bytesHash: keccak256(abi.encodePacked(type(AssetERC20).creationCode)),
      signature: _assetCreationSignature
    });
    address newAsset = assetImpl.cloneDeterministic(request.salt);
    AssetERC20(payable(newAsset)).initialize(initRequest);
    tokenData.assets.add(newAsset);

    emit AssetCreated(_msgSender(), newAsset, request.tokenId, assetImpl, tokenData.assetType);
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
    tokenData.status = IAssetEntity.Status.ACTIVE;

    emit TokenRegistered(_msgSender(), tokenId, assetType, tokenName, tokenSymbol);
    return true;
  }

  function registerAsset(address assetId) external returns (bool) {
    _policyInterceptor(this.registerAsset.selector);
    require(assetId != address(0), "Invalid AssetId Address");

    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity Address");
    } catch {
      revert("Illegal IAssetEntity Address");
    }

    IAssetEntity.AssetType assetType = IAssetEntity(assetId).assetType();
    if(IAssetEntity(assetId).assetType() == IAssetEntity.AssetType.ERC20) {
      try IERC165(assetId).supportsInterface(type(IAssetERC20).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid IAssetERC20 Address");
      } catch {
        revert("Illegal IAssetERC20 Address");
      }    
    } else {
      revert("Asset Type Not Supported");
    }

    require(IAssetEntity(assetId).assetInitVersion() == 1, "Asset Not Initialized");

    bytes32 assetGroup = IAccessControl(_accessControlManager).livelyAssetGroup();
    require(IGroupManagement(_accessControlManager).hasGroupRole(assetGroup, IAssetEntity(assetId).assetRole()), "Asset Role Not Found");
    require(IRealmManagement(_accessControlManager).hasRealmContext(IAssetEntity(assetId).assetRealm(), LContextUtils.generateCtx(assetId)), "Context Realm Not Found");
    
    address tokenId = IAssetEntity(assetId).assetToken();
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    require(!tokenData.assets.contains(assetId), "Asset Already Registered");

    tokenData.assets.add(assetId);
    emit AssetRegistered(_msgSender(), assetId, tokenId, assetType);
    return true;
  }

  function removeAsset(address assetId) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.removeAsset.selector);
    require(assetId != address(0), "Invalid AssetId Address");

    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity Address");
    } catch {
      revert("Illegal IAssetEntity Address");
    }

    address tokenId = IAssetEntity(assetId).assetToken();
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    require(tokenData.assets.contrains(assetId), "Asset Not Found");

    tokenData.assets.remove(assetId);
    IAssetEntity(assetId).assetSafeModeSet(true);

    emit AssetRemoved(_msgSender(), assetId, tokenId, IAssetEntity(assetId).assetType());
    return true;
  }

  function registerAssetType(IAssetEntity.AssetType assetType, address assetImpl) external returns (bool) {
    _policyInterceptor(this.registerAssetType.selector);
    AssetTypeData storage assetData = _assetTypes[assetType];
    require(assetData.assetType == IAssetEntity.AssetType.NONE, "AssetType Already Registered");

    assetData.assetImplement = assetImpl;
    assetData.status = IAssetEntity.Status.ACTIVE;
    emit AssetTypeRegistered(_msgSender(), assetImpl, assetType);
    return true;
  }

  function updateAssetType(IAssetEntity.AssetType assetType, address assetImpl) external returns (bool) {
    _policyInterceptor(this.registerAssetType.selector);
    AssetTypeData storage assetData = _assetTypes[assetType];
    require(assetData.assetType == assetType, "AssetType Not Found");

    assetData.assetImplement = assetImpl;
    emit AssetTypeUpdated(_msgSender(), assetImpl, assetType);
    return true;
  }

  function setSafeModeAsset(address assetId, bool isEnabled) external returns (bool) {
    _validationAndPolicyInterceptor(assetId, this.safeModeAsset.selector);
    require(assetId != address(0), "Invalid AssetId Address");

    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity Address");
    } catch {
      revert("Illegal IAssetEntity Address");
    }

    address tokenId = IAssetEntity(assetId).assetToken();
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    require(tokenData.assets.contains(assetId), "Asset Not Found");
    IAssetEntity(assetId).assetSafeModeSet(isEnabled);
    emit AssetSafeModeChanged(_msgSender(), assetId, isEnabled);
    return true;
  }

  function setSafeModeToken(address tokenId, bool isEnabled) external returns (bool) {
    _policyInterceptor(this.safeModeToken.selector);
    
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    for(uint i = 0; i < tokenData.assets.length(); i++) {
      IAssetEntity(tokenData.assets.at(i)).assetSafeModeSet(isEnabled);
    }

    tokenData.status = IAssetEntity.Status.SAFE_MODE;  
    emit TokenSafeModeChanged(_msgSender(), tokenId, isEnabled);
    return true;
  }

  function setSafeModeAssetType(IAssetEntity.AssetType assetType, bool isEnabled) external returns (bool) {
    _policyInterceptor(this.safeModeAssetType.selector);
    AssetTypeData storage assetData = _assetTypes[assetType];
    require(assetData.assetType != IAssetEntity.AssetType.NONE, "AssetType Not Found");

    for(uint i = 0; i < assetData.tokens.length(); i++) {
      address tokenId = assetData.tokens.at(i);
      TokenData storage tokenData = _tokens[tokenId];
      tokenData.status = IAssetEntity.Status.SAFE_MODE;  
      for(uint j = 0; j < tokenData.assets.length(); j++) {
        IAssetEntity(tokenData.assets.at(i)).assetSafeModeSet(isEnabled);
      }     
    }

    assetData.status = IAssetEntity.Status.SAFE_MODE;
    emit AssetTypeSafeModeChanged(_msgSender(), assetType, isEnabled);
    return true;
  }

  function getAssetTypeInfo(IAssetEntity.AssetType assetType) external view returns(IAssetEntity.Status, address, address[] memory) {
    AssetTypeData storage assetData = _assetTypes[assetType];
    return (assetData.status, assetData.assetImplement, assetData.tokens.values());
  }

  function getAssetInfo(address assetId) external view returns (AssetInfo memory) {
    
    try IERC165(assetId).supportsInterface(type(IAssetEntity).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid IAssetEntity Address");
    } catch {
      revert("Illegal IAssetEntity Address");
    }

    address tokenId = IAssetEntity(assetId).assetToken();
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType != IAssetEntity.AssetType.NONE, "Token Not Found");
    require(tokenData.assets.contains(assetId), "Asset Not Found");

    return AssetInfo ({
      balance: IAssetERC20(assetId).tokenBalance(),
      name: IAssetEntity(assetId).assetName(),
      version: IAssetEntity(assetId).assetVersion(),
      realm: IAssetEntity(assetId).assetRealm(),
      role: IAssetEntity(assetId).assetRole(),      
      tokenId: IAssetEntity(assetId).assetToken(),
      initVersion: IAssetEntity(assetId).assetInitVersion(),
      assetType: IAssetEntity(assetId).assetType(),
      status: !IAssetEntity(assetId).assetSafeMode() ? IAssetEntity.Status.ACTIVE : IAssetEntity.Status.SAFE_MODE
    });
  }

  function getTokenInfo(address tokenId) external view returns (TokenInfo memory, address[] memory) {
    TokenData storage tokenData = _tokens[tokenId];
    require(tokenData.assetType == IAssetEntity.AssetType.ERC20, "Token Not Supported");
    return (TokenInfo({
      totalSupply: IERC20(tokenId).totalSupply(),
      decimal: IERC20(tokenId).decimal(),
      contractName: IProxy(tokenId).contractName(),
      contractVersion: IProxy(tokenId).contractVersion(),
      tokenName: IERC20(tokenId).name(),
      tokenSymbol: IERC20(tokenId).symbol(),
      status: tokenData.status
    }), tokenData.assets.values());
  }

  function isSafeModeAsset(address assetId) external view returns (bool) {
    return IAssetEntity(assetId).assetSafeMode();
  }

  function isAssetExists(address assetId) external view returns (bool) {
    return _tokens[IAssetEntity(assetId).assetToken()].assets.contains(assetId);
  }

  function isTokenExists(address tokenId) external view returns (bool) {
    return _tokens[tokenId].assetType != IAssetEntity.AssetType.NONE;
  }

  function isAssetTypeExists(IAssetEntity.AssetType assetType) external view returns (bool) {
    return _assetTypes[assetType] != IAssetEntity.AssetType.NONE;
  }

  function predictAddress(address base, bytes32 salt) external pure returns (address) {
    return base.predictDeterministicAddress(salt);
  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}

  function _validationAndPolicyInterceptor(address assetId, bytes4 funcSelector) private {
    _policyInterceptor(funcSelector);
    require(assetId != address(0), "Invalid Address");
    require(_assets[assetId].assetType != IAssetEntity.AssetType.NONE, "AssetId Not Found");
    require(!IAssetEntity(assetId).assetSafeMode(), "SafeMode: Asset Call Rejected");
  }

  function _lockPolicyInterceptor(address tokenId, bytes4 funcSelector) private {
    require(!_isSafeMode, "SafeMode: Call Rejected");
    
    if(_assets[_msgSender()].assetType == IAssetEntity.AssetType.ERC20) {
      bytes32 context = LContextUtils.generateCtx(address(this));
      require(IAccessControl(_accessControlManager).isContextFunctionEnabled(context, funcSelector), "Context Disabled");
      require(IAccessControl(_accessControlManager).isRoleEnabled(IAccessControl(_accessControlManager).livelyAssetManagerRole()), "Asset Manager Role Disabled");
      require(IAccessControl(_accessControlManager).isGroupEnabled(IAccessControl(_accessControlManager).livelyAssetGroup()), "Asset Group Disabled");
      require(IAccessControl(_accessControlManager).isRealmEnabled(_domainRealm), "Realm Disabled");    
    } else {
      require(IAccessControl(_accessControlManager).hasAccess(LContextUtils.generateCtx(address(this)),_msgSender(),funcSelector), "Access Denied");
    }
  }
  
}