// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IAssetERC20.sol";
import "./AssetERC20Storage.sol";
import "../IAssetEntity.sol";
import "../../lively/IERC20.sol";
import "../../../proxy/BaseUUPSProxy.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/LAddress.sol";
import "../../../acl/IContextManagement.sol";

import "hardhat/console.sol";

contract AssetERC20 is AssetERC20Storage, BaseUUPSProxy, IAssetERC20, IAssetEntity {

  using LAddress for address;

  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;
    address erc20Token;
    address accessControlManager;
    bytes signature;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {

    require(request.erc20Token != address(0), "Invalid Token Address");
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

    _erc20Token = request.erc20Token;

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
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;

    rrc[1].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelySystemAdminRole();
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](3);
    rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[1].funcSelectors[1] = IProxy.setSafeMode.selector;
    rrc[1].funcSelectors[2] = IProxy.upgradeTo.selector;

    rrc[2].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAssetManagerRole();
    rrc[2].isEnabled = true;
    rrc[2].funcSelectors = new bytes4[](12);
    rrc[2].funcSelectors[0] = IAssetERC20.tokenLock.selector;
    rrc[2].funcSelectors[1] = IAssetERC20.tokenBatchLock.selector;
    rrc[2].funcSelectors[2] = IAssetERC20.tokenTransfer.selector;
    rrc[2].funcSelectors[3] = IAssetERC20.tokenBatchTransfer.selector;
    rrc[2].funcSelectors[4] = IAssetERC20.tokenTransferFrom.selector;
    rrc[2].funcSelectors[5] = IAssetERC20.tokenBatchTransferFrom.selector;
    rrc[2].funcSelectors[6] = IAssetERC20.tokenApprove.selector;
    rrc[2].funcSelectors[7] = IAssetERC20.tokenIncreaseAllowance.selector;
    rrc[2].funcSelectors[8] = IAssetERC20.tokenDecreaseAllowance.selector;
    rrc[2].funcSelectors[9] = IAssetERC20.tokenPermit.selector;
    rrc[2].funcSelectors[10] = IAssetEntity.assetSetSafeMode.selector;
    rrc[2].funcSelectors[11] = bytes4(keccak256("withdrawBalance(address)"));
    
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: domainName,
      version: domainVersion,
      realm: realm,
      smca: address(this),
      status: true
    });

    return (rc, rrc);
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

  function tokenPermit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool) {
    _policyInterceptor(this.tokenPermit.selector);
    return IERC20Extra(_erc20Token).permit(owner, spender, value, deadline, signature);
  }

  function assetSetSafeMode(bool status) external onlyProxy aclCheck(this.assetSetSafeMode.selector) returns (bool) {
    require(_getInitializedCount() > 0, "Contract Not Initialized");
    _isSafeMode = status;
    emit SafeModeChanged(_msgSender(), address(this), _domainRealm, status);
    return status;  
  }

  function assetType() external pure returns (AssetType) {
    return AssetType.ERC20;
  }

  function assetToken() external view returns (address) {
    return _erc20Token;
  }

  function entityBalance() external view returns (uint256) {
    return IERC20(_erc20Token).balanceOf(address(this));
  }

  function _policyInterceptor(bytes4 funcSelector) private safeModeCheck aclCheck(funcSelector) {}

}