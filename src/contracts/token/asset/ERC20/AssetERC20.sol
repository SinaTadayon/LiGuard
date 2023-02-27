// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IAssetERC20.sol";
import "../IAssetEntity.sol";
import "../IAssetManagerERC20.sol";
import "../../lively/IERC20.sol";
import "../../../proxy/Initializable.sol";
import "../../../utils/Message.sol";
import "../../../utils/ERC165.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/LAddress.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../acl/IACL.sol";
import "../../../acl/IACLGenerals.sol";
import "../../../acl/agent/IRoleManagement.sol";
import "../../../acl/scope/IFunctionManagement.sol";
import "../../../acl/scope/IContextManagement.sol";

/**
 * @title Asset ERC20 Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AssetERC20 is Initializable, Message, ERC165, IAssetERC20, IAssetEntity {
  using LAddress for address;

  address private _accessControlId;
  address private _erc20TokenId;
  string private _contractName;
  string private _contractVersion;
  AssetSafeModeStatus private _assetSafeModeStatus;

  constructor() {
    _assetSafeModeStatus = AssetSafeModeStatus.ENABLED;
  }

  function assetInitialize(AssetInitRequest calldata request) external initializer returns (bool) {
    if (!IERC165(request.erc20TokenId).supportsInterface(type(IERC20).interfaceId)) revert("Illegal ERC20Token");

    if (!IERC165(request.erc20TokenId).supportsInterface(type(IERC20Extra).interfaceId))
      revert("Illegal ERC20TokenExtra");

    if (!IERC165(request.erc20TokenId).supportsInterface(type(IERC20Lock).interfaceId))
      revert("Illegal ERC20TokenLock");

    if (!IERC165(request.accessControlId).supportsInterface(type(IACL).interfaceId)) revert("Illegal ACL");

    if (!IERC165(request.assetManagerId).supportsInterface(type(IAssetManagerERC20).interfaceId))
      revert("Illegal IAssetManagerERC20");

    _contractName = request.contractName;
    _contractVersion = request.contractVersion;
    _erc20TokenId = request.erc20TokenId;
    _accessControlId = request.accessControlId;
    _assetSafeModeStatus = AssetSafeModeStatus.DISABLED;

    _createContext(request);

    _createFunctions(request);

    emit AssetInitialized(_msgSender(), address(this), request.erc20TokenId, request.assetManagerId, request.subjectId);

    return true;
  }

  function _createContext(AssetInitRequest calldata request) internal {
    IContextManagement.ContextRegisterRequest[]
      memory contextRequests = new IContextManagement.ContextRegisterRequest[](1);
    contextRequests[0].realmId = request.realmId;
    contextRequests[0].adminId = request.adminId;
    contextRequests[0].salt = request.salt;
    contextRequests[0].name = request.contractName;
    contextRequests[0].version = request.contractVersion;
    contextRequests[0].contractId = request.assetContractId;
    contextRequests[0].subject = request.subjectId;
    contextRequests[0].deployer = request.assetManagerId;
    contextRequests[0].functionLimit = 32;
    contextRequests[0].acstat = IACLCommons.ActivityStatus.ENABLED;
    contextRequests[0].alstat = IACLCommons.AlterabilityStatus.UPGRADABLE;
    contextRequests[0].signature = request.signature;

    IACLCommons.MemberSignature memory memberSignRequest = IACLCommons.MemberSignature({
      account: address(0),
      expiredAt: 0,
      signature: bytes("")
    });

    IContextManagement(_accessControlId).contextRegister(memberSignRequest, contextRequests);
  }

  function _createFunctions(AssetInitRequest calldata request) internal {
    IFunctionManagement.FunctionRequest[] memory functionRequests = new IFunctionManagement.FunctionRequest[](10);

    // assetSafeModeSet
    functionRequests[0].adminId = request.adminId;
    functionRequests[0].agentId = request.adminId;
    functionRequests[0].selector = IAssetEntity.assetSetSafeMode.selector;
    functionRequests[0].policyCode = 130;
    functionRequests[0].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[0].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenLock
    functionRequests[1].adminId = request.adminId;
    functionRequests[1].agentId = request.agentId;
    functionRequests[1].selector = IAssetERC20.tokenLock.selector;
    functionRequests[1].policyCode = 48;
    functionRequests[1].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[1].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenTransfer
    functionRequests[2].adminId = request.adminId;
    functionRequests[2].agentId = request.agentId;
    functionRequests[2].selector = IAssetERC20.tokenTransfer.selector;
    functionRequests[2].policyCode = 96;
    functionRequests[2].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[2].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenBatchTransfer
    functionRequests[3].adminId = request.adminId;
    functionRequests[3].agentId = request.agentId;
    functionRequests[3].selector = IAssetERC20.tokenBatchTransfer.selector;
    functionRequests[3].policyCode = 99;
    functionRequests[3].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[3].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenTransferFrom
    functionRequests[4].adminId = request.adminId;
    functionRequests[4].agentId = request.agentId;
    functionRequests[4].selector = IAssetERC20.tokenTransferFrom.selector;
    functionRequests[4].policyCode = 110;
    functionRequests[4].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[4].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenBatchTransferFrom
    functionRequests[5].adminId = request.adminId;
    functionRequests[5].agentId = request.agentId;
    functionRequests[5].selector = IAssetERC20.tokenBatchTransferFrom.selector;
    functionRequests[5].policyCode = 116;
    functionRequests[5].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[5].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenApprove
    functionRequests[6].adminId = request.adminId;
    functionRequests[6].agentId = request.agentId;
    functionRequests[6].selector = IAssetERC20.tokenApprove.selector;
    functionRequests[6].policyCode = 150;
    functionRequests[6].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[6].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenIncreaseAllowance
    functionRequests[7].adminId = request.adminId;
    functionRequests[7].agentId = request.agentId;
    functionRequests[7].selector = IAssetERC20.tokenIncreaseAllowance.selector;
    functionRequests[7].policyCode = 160;
    functionRequests[7].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[7].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // tokenDecreaseAllowance
    functionRequests[8].adminId = request.adminId;
    functionRequests[8].agentId = request.agentId;
    functionRequests[8].selector = IAssetERC20.tokenDecreaseAllowance.selector;
    functionRequests[8].policyCode = 160;
    functionRequests[8].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[8].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    // withdrawBalance
    functionRequests[9].adminId = request.adminId;
    functionRequests[9].agentId = request.agentId;
    functionRequests[9].selector = this.withdrawBalance.selector;
    functionRequests[9].policyCode = 24;
    functionRequests[9].acstat = IACLCommons.ActivityStatus.ENABLED;
    functionRequests[9].alstat = IACLCommons.AlterabilityStatus.UPDATABLE;

    IFunctionManagement.FunctionRegisterRequest[] memory requests = new IFunctionManagement.FunctionRegisterRequest[](
      1
    );
    requests[0].signature = request.signature;
    requests[0].realmId = request.realmId;
    requests[0].salt = request.salt;
    requests[0].name = request.contractName;
    requests[0].version = request.contractVersion;
    requests[0].subject = request.subjectId;
    requests[0].deployer = request.assetManagerId;
    requests[0].contractId = address(0);
    requests[0].functions = functionRequests;

    IACLCommons.MemberSignature memory memberSignRequest = IACLCommons.MemberSignature({
      account: address(0),
      expiredAt: 0,
      signature: bytes("")
    });

    IFunctionManagement(_accessControlId).functionRegister(memberSignRequest, requests);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IAssetEntity).interfaceId ||
      interfaceId == type(IAssetERC20).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function tokenLock(IERC20Lock.LockTokenRequest[] calldata lockRequests) external returns (bytes32[] memory) {
    _policyInterceptor(this.tokenLock.selector);
    for (uint256 i = 0; i < lockRequests.length; i++) {
      require(lockRequests[i].source == address(this), "Illegal Address");
    }

    emit AssetERC20Called(_msgSender(), address(this), this.tokenLock.selector);
    return IERC20Lock(_erc20TokenId).lockToken(lockRequests);
  }

  function tokenTransfer(address to, uint256 amount) external returns (bool) {
    _policyInterceptor(this.tokenTransfer.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenTransfer.selector);
    return IERC20(_erc20TokenId).transfer(to, amount);
  }

  function tokenBatchTransfer(IERC20Extra.BatchTransferRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.tokenBatchTransfer.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenBatchTransfer.selector);
    return IERC20Extra(_erc20TokenId).batchTransfer(request);
  }

  function tokenTransferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool) {
    _policyInterceptor(this.tokenTransferFrom.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenTransferFrom.selector);
    return IERC20(_erc20TokenId).transferFrom(from, to, amount);
  }

  function tokenBatchTransferFrom(IERC20Extra.BatchTransferFromRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.tokenBatchTransferFrom.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenBatchTransferFrom.selector);
    return IERC20Extra(_erc20TokenId).batchTransferFrom(request);
  }

  function tokenApprove(address spender, uint256 amount) external returns (bool) {
    _policyInterceptor(this.tokenApprove.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenApprove.selector);
    return IERC20(_erc20TokenId).approve(spender, amount);
  }

  function tokenIncreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.tokenIncreaseAllowance.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenIncreaseAllowance.selector);
    return IERC20Extra(_erc20TokenId).increaseAllowance(spender, amount);
  }

  function tokenDecreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.tokenDecreaseAllowance.selector);
    emit AssetERC20Called(_msgSender(), address(this), this.tokenDecreaseAllowance.selector);
    return IERC20Extra(_erc20TokenId).decreaseAllowance(spender, amount);
  }

  function assetSetSafeMode(AssetSafeModeStatus status) public override returns (bool) {
    IACL.AuthorizationStatus aclStatus = IACL(_accessControlId).hasAccountAccess(
      address(this),
      this.assetSetSafeMode.selector,
      _msgSender()
    );
    if (aclStatus != IACL.AuthorizationStatus.PERMITTED) revert IACL.ACLActionForbidden(aclStatus);
    require(_getInitializedCount() > 0, "NOT INIT");
    _assetSafeModeStatus = status;
    emit AssetSafeModeUpdated(_msgSender(), address(this), status);
    return true;
  }

  function withdrawBalance(address recepient) public {
    _policyInterceptor(this.withdrawBalance.selector);
    payable(recepient).transfer(address(this).balance);
  }

  function assetSafeMode() external view returns (AssetSafeModeStatus) {
    return _assetSafeModeStatus;
  }

  function assetType() external pure returns (AssetType) {
    return AssetType.ERC20;
  }

  function assetToken() external view returns (address) {
    return _erc20TokenId;
  }

  function assetName() external view returns (string memory) {
    return _contractName;
  }

  function assetVersion() external view returns (string memory) {
    return _contractVersion;
  }

  function assetAccessControl() external view returns (address) {
    return _accessControlId;
  }

  function assetInitVersion() external view returns (uint16) {
    return _getInitializedCount();
  }

  function assetBalance() external view returns (uint256) {
    return IERC20(_erc20TokenId).balanceOf(address(this));
  }

  function assetInfo() external view returns (AssetInfo memory) {
    return
      AssetInfo({
        balance: IERC20(_erc20TokenId).balanceOf(address(this)),
        name: _contractName,
        version: _contractVersion,
        token: _erc20TokenId,
        accessControl: _accessControlId,
        initVersion: _getInitializedCount(),
        atype: AssetType.ERC20,
        status: _assetSafeModeStatus
      });
  }

  // solhint-disable-next-line
  receive() external payable {}

  // solhint-disable-next-line
  fallback() external payable {}

  function balance() public view returns (uint256) {
    return address(this).balance;
  }

  function _policyInterceptor(bytes4 funcSelector) private {
    require(_assetSafeModeStatus == AssetSafeModeStatus.DISABLED, "Rejected");
    IACL.AuthorizationStatus aclStatus = IACL(_accessControlId).hasAccountAccess(
      address(this),
      funcSelector,
      _msgSender()
    );
    if (aclStatus != IACL.AuthorizationStatus.PERMITTED) revert IACL.ACLActionForbidden(aclStatus);
  }
}
