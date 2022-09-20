// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetERC20.sol";
import "../IAssetEntity.sol";
import "../BaseAssetEntity.sol";
import "../../lively/IERC20.sol";
import "../../../proxy/Initializable.sol";
import "../../../utils/Message.sol";
import "../../../utils/ERC165.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/LContextUtils.sol";
import "../../../lib/LAddress.sol";
import "../../../acl/IAccessControl.sol";
import "../../../acl/IContextManagement.sol";

contract AssetERC20 is BaseAssetEntity, IAssetERC20, IAssetEntity, Initializable, Message, ERC165 {
  using LAddress for address;

  address private _accessControlManager;
  address private _assetManager;
  address private _erc20Token;
  bytes32 private _domainName;
  bytes32 private _domainVersion;
  bytes32 private _domainRealm;
  bytes32 private _assetRole;
  bool private _isSafeMode;
  
  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;
    address erc20Token;
    address accessControl;
    address assetManager;
    bytes32 assetRole;
    bytes32 salt;
    bytes32 bytesHash;
    bytes signature;
  }

  constructor() { _isSafeMode = true; }

  function initialize(InitRequest calldata request) public initializer {

    try IERC165(request.erc20Token).supportsInterface(type(IERC20).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20Token Address");
    } catch {
      revert("Illegal ERC20Token Address");
    }

    try IERC165(request.erc20Token).supportsInterface(type(IERC20Extra).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20TokenExtra Address");
    } catch {
      revert("Illegal ERC20TokenExtra Address");
    }

    try IERC165(request.erc20Token).supportsInterface(type(IERC20Lock).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid ERC20TokenLock Address");
    } catch {
      revert("Illegal ERC20TokenLock");
    }

    try IERC165(request.accessControl).supportsInterface(type(IAccessControl).interfaceId) returns (bool isSupported) {
      require(isSupported, "Invalid AccessControlManager");
    } catch {
      revert("Illegal AccessControlManager");
    }     

    _accessControlManager = request.accessControl;
    require(IAccessControl(_accessControlManager).isRoleEnabled(request.assetRole), "Role Not Found OR Disabled ");

    _domainRealm = keccak256(abi.encodePacked(request.domainRealm));    
    _domainName = keccak256(abi.encodePacked(request.domainName));
    _domainVersion = keccak256(abi.encodePacked(request.domainVersion));    
    _erc20Token = request.erc20Token;
    _assetRole = request.assetRole;
    _isSafeMode = false;
  
    (IContextManagement.RequestPredictContext memory rpc, IContextManagement.RequestRegisterContext[] memory rrc) = 
      _createRequestContext(_domainName, _domainVersion, _domainRealm, _assetRole, request.salt, request.bytesHash, request.assetManager);

    IContextManagement(_accessControlManager).registerPredictContext(request.signature, rpc, rrc);

    // emit Initialized(
    //   _msgSender(),
    //   address(this),
    //   _self,
    //   request.domainName,
    //   request.domainVersion,
    //   _domainRealm,
    //   _getInitializedCount()
    // );
  }

  function _createRequestContext(
    bytes32 domainName,
    bytes32 domainVersion,
    bytes32 realm,
    bytes32 role,
    bytes32 salt,
    bytes32 bytesHash,
    address base
  )
    internal
    view
    returns (IContextManagement.RequestPredictContext memory, IContextManagement.RequestRegisterContext[] memory)
  {
    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](2);

    rrc[0].role = IAccessControl(_accessControlManager).livelyAdminRole();
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](1);
    rrc[0].funcSelectors[0] = this.assetSafeModeSet.selector;

    rrc[1].role = role;
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](10);
    rrc[1].funcSelectors[0] = IAssetERC20.tokenLock.selector;
    rrc[1].funcSelectors[1] = IAssetERC20.tokenBatchLock.selector;
    rrc[1].funcSelectors[2] = IAssetERC20.tokenTransfer.selector;
    rrc[1].funcSelectors[3] = IAssetERC20.tokenBatchTransfer.selector;
    rrc[1].funcSelectors[4] = IAssetERC20.tokenTransferFrom.selector;
    rrc[1].funcSelectors[5] = IAssetERC20.tokenBatchTransferFrom.selector;
    rrc[1].funcSelectors[6] = IAssetERC20.tokenApprove.selector;
    rrc[1].funcSelectors[7] = IAssetERC20.tokenIncreaseAllowance.selector;
    rrc[1].funcSelectors[8] = IAssetERC20.tokenDecreaseAllowance.selector;
    rrc[1].funcSelectors[9] = bytes4(keccak256("withdrawBalance(address)"));
    

    IContextManagement.RequestPredictContext memory rpc = IContextManagement.RequestPredictContext({
      name: domainName,
      version: domainVersion,
      realm: realm,
      salt: salt,
      bytesHash: bytesHash, 
      base: base,
      status: true
    });

    return (rpc, rrc);
  }

  function tokenLock(IERC20Lock.LockTokenRequest calldata lockRequest) external returns (bytes32) {
    _policyInterceptor(this.tokenLock.selector);
    require(lockRequest.source == address(this), "Illegal Source Addres");
    return IERC20Lock(_erc20Token).lockToken(lockRequest);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Lock(_erc20Token).lockToken.selector, lockRequest));
    // return abi.decode(result, (bytes32));
  }

  function tokenBatchLock(IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory) {
    _policyInterceptor(this.tokenBatchLock.selector);
    for(uint i = 0; i < lockRequests.length; i++) {
      require(lockRequests[i].source == address(this), "Illegal Source Addres");
    }

    return IERC20Lock(_erc20Token).batchLockToken(lockRequests);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Lock(_erc20Token).batchLockToken.selector, lockRequests));
    // return abi.decode(result, (bytes32[]));
  }

  function tokenTransfer(address to, uint256 amount) external returns (bool) {
    _policyInterceptor(this.tokenTransfer.selector);
    return IERC20(_erc20Token).transfer(to, amount);
    // _callOptionalReturn(_erc20Token, abi.encodeWithSelector(IERC20(_erc20Token).transfer.selector, request.to, request.amount));
    // return true;
  }

  function tokenBatchTransfer(IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.tokenBatchTransfer.selector);
    return IERC20Extra(_erc20Token).batchTransfer(request);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Extra(_erc20Token).batchTransfer.selector, request));
    // return abi.decode(result, (bool));
  }

  function tokenTransferFrom(address from, address to, uint256 amount) external returns (bool) {
    _policyInterceptor(this.tokenTransferFrom.selector);
    return IERC20(_erc20Token).transferFrom(from, to, amount);
    // _callOptionalReturn(_erc20Token, abi.encodeWithSelector(IERC20(_erc20Token).transferFrom.selector, request.from, request.to, request.amount));
    // return true;
  }

  function tokenBatchTransferFrom(IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.tokenBatchTransferFrom.selector);
    return IERC20Extra(_erc20Token).batchTransferFrom(request);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Extra(_erc20Token).batchTransferFrom.selector, request));
    // return abi.decode(result, (bool));
  }

  function tokenApprove(address spender, uint256 amount) external returns (bool) {
    _policyInterceptor(this.tokenApprove.selector);
    return IERC20(_erc20Token).approve(spender, amount);
    // _callOptionalReturn(_erc20Token, abi.encodeWithSelector(IERC20(_erc20Token).approve.selector, spender, amount));
    // return true;
  }

  function tokenIncreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.tokenIncreaseAllowance.selector);
    return IERC20Extra(_erc20Token).increaseAllowance(spender, amount);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Extra(_erc20Token).increaseAllowance.selector, spender, amount));
    // return abi.decode(result, (uint256));
  }

  function tokenDecreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.tokenDecreaseAllowance.selector);
    return IERC20Extra(_erc20Token).decreaseAllowance(spender, amount);
    // bytes memory result = _callMandatoryReturn(_erc20Token, abi.encodeWithSelector(IERC20Extra(_erc20Token).decreaseAllowance.selector, spender, amount));
    // return abi.decode(result, (uint256));
  }

  function assetSafeModeSet(bool status) override public returns (bool) {
    if(IAccessControl(_accessControlManager).isLivelyAssetAdminRole(_msgSender())) {
      bytes32 context = LContextUtils.generateCtx(address(this));
      require(IAccessControl(_accessControlManager).isContextFunctionEnabled(context, this.assetSafeModeSet.selector), "Context Disabled");
      require(IAccessControl(_accessControlManager).isRoleEnabled(IAccessControl(_accessControlManager).livelyAssetAdminRole()), "Asset Admin Role Disabled");
      require(IAccessControl(_accessControlManager).isGroupEnabled(IAccessControl(_accessControlManager).livelyAssetGroup()), "Asset Group Disabled");
      require(IAccessControl(_accessControlManager).isRealmEnabled(_domainRealm), "Realm Disabled");    
    } else {
      require(IAccessControl(_accessControlManager).hasAccess(LContextUtils.generateCtx(address(this)),_msgSender(),this.assetSafeModeSet.selector), "Access Denied");
    }
    require(_getInitializedCount() > 0, "Contract Not Initialized");
    _isSafeMode = status;    
    emit AssetSafeModeChanged(_msgSender(), address(this), _domainRealm, status);
    return status;  
  }

  function withdrawBalance(address recepient) public {
    _policyInterceptor(this.withdrawBalance.selector);
    payable(recepient).transfer(address(this).balance);
  }

  function assetSafeMode() external view returns (bool) {
    return _isSafeMode;
  }

  function assetType() external pure returns (AssetType) {
    return AssetType.ERC20;
  }

  function assetToken() external view returns (address) {
    return _erc20Token;
  }

  function assetName() external view returns (bytes32) {
    return _domainName;
  }

  function assetVersion() external view returns (bytes32) {
    return _domainVersion;
  }

  function assetRealm() external view returns (bytes32) {
    return _domainRealm;
  }

  function assetRole() external view returns (bytes32) {
    return _assetRole;
  }

  function initVersion() external view returns (uint16) {
    return _getInitializedCount();
  }

  function initStatus() external view returns (bool) {
    return _isInitializing();
  }

  // solhint-disable-next-line
  receive() external payable {}

  // solhint-disable-next-line
  fallback() external payable {}

  function tokenBalance() external view returns (uint256) {
    return IERC20(_erc20Token).balanceOf(address(this));
  }

  function assetBalance() external view returns (uint256) {
    return address(this).balance;
  }

  function _policyInterceptor(bytes4 funcSelector) private view {
    require(!_isSafeMode, "SafeMode: Call Rejected");

    if(IAccessControl(_accessControlManager).isLivelyAssetManagerRole(_msgSender())) {
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