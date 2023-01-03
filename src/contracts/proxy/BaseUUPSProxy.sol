// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IERC1822.sol";
import "./IProxy.sol";
import "./BaseProxy.sol";
import "./BaseUUPSStorage.sol";
import "./Initializable.sol";
import "../lib/LAddress.sol";
import "../lib/LStorageSlot.sol";
import "../acl/IAccessControl.sol";
import "../acl/scope/IContextManagement.sol";
import "../utils/Message.sol";
import "../utils/ERC165.sol";
import "../lib/acl/LACLUtils.sol";

/**
 * @title Abstract Base UUPS Proxy Contract
 * @author OpenZeppelin, Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract BaseUUPSProxy is
  BaseUUPSStorage,
  BaseProxy,
  Initializable,
  IProxy,
  IERC1822Proxiable,
  Message,
  ERC165
{
  /**
   * @dev Check that the execution is being performed through a delegatecall call and that the execution context is
   * a proxy contract with an implementation (as defined in ERC1967) pointing to self. This should only be the case
   * for UUPS and transparent proxies that are using the current contract as their implementation. Execution of a
   * function through ERC1167 minimal proxies (clones) would not normally pass this test, but is not guaranteed to
   * fail.
   */
  modifier onlyProxy() {
    require(address(this) != __self, "Illegal Call");    // Illegal Contract Call
    require(_implementation() == __self, "Invalid Call");   // Invalid Proxy Call 
    _;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyLocalAdmin() {
    require(_getLocalAdmin() == _msgSender(), "Access Denied");
    _;
  }

  /**
   * @dev Check that the execution is not being performed through a delegate call. This allows a function to be
   * callable on the implementing contract but not through proxies.
   */
  modifier notDelegated() {
    require(address(this) == __self, "Illegal Delegatecall");    // Illegal Contract Delegatecall
    _;
  }

  modifier safeModeCheck() {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    _;
  }

  modifier aclCheck(bytes4 selector) {
    require(_hasPermission(selector), "Forbidden");
    _;
  }

  function _hasPermission(bytes4 selector) internal returns (bool) {
    if(_accessControlManager == address(this)) {
      bytes memory data = abi.encodeWithSelector(bytes4(keccak256("getFirstInit()")));
      bytes memory returndata = LAddress.functionDelegateCall(_implementation(), data, "Call Failed"); // Delegatecall hasAccess Failed
      if(uint8(returndata[returndata.length - 1]) == 1) return false;
      return IAccessControl(_accessControlManager).hasAccountAccess(address(this), selector, _msgSender());    
    } else {
      return IAccessControl(_accessControlManager).hasAccountAccess(address(this), selector, _msgSender());
    }
  }

  /**
   * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
   *
   * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
   * function call, and allows initializating the storage of the proxy like a Solidity constructor.
   */

  constructor() {
    assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
    assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
    // set contract Admin (implementation contract)
    LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = _msgSender();
 
    // set _isUpgradable and _isSafeMode of contact
    _ustat = ProxyUpdatabilityStatus.DISABLED;
    _sstat = ProxySafeModeStatus.ENABLED;
  }

  function __BASE_UUPS_init(
    string calldata cname,
    string calldata cverion,
    address accessControl
  ) internal {
    __BASE_UUPS_init_unchained(cname, cverion, accessControl);
  }

  function __BASE_UUPS_init_unchained(
    string calldata cname,
    string calldata cverion,
    address accessControl
  ) internal onlyInitializing {
    _contractName = cname;
    _contractVersion = cverion;

    if (accessControl != address(this)) {
      require(LAddress.isContract(accessControl), "Illegal Contract");
      if(!IERC165(accessControl).supportsInterface(type(IAccessControl).interfaceId)) {
        revert("Illegal ACL");
      }     
    } else {
      if(!supportsInterface(type(IAccessControl).interfaceId)) {
        revert("Not Supported");
      }
    }

    _accessControlManager = accessControl;
    _ustat = ProxyUpdatabilityStatus.DISABLED;
    _sstat = ProxySafeModeStatus.DISABLED;
    _setLocalAdmin(_msgSender());
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IProxy).interfaceId ||
      interfaceId == type(IERC1822Proxiable).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  /**
   * @dev Returns the current implementation address.
   */
  function _implementation() internal view override returns (address) {
    return LStorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
  }

  /**
   * @dev Stores a new address in the EIP1967 implementation slot.
   */
  function _setImplementation(address newImplementation) private {
    LStorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
  }

  /**
   * @dev Perform implementation upgrade
   *
   * Emits an {Upgraded} event.
   */
  function _upgradeTo(address newImplementation) internal {
    _setImplementation(newImplementation);
    emit ProxyUpgraded(msg.sender, address(this), newImplementation);
  }

  /**
   * @dev Perform implementation upgrade with additional setup call.
   *
   * Emits an {Upgraded} event.
   */
  function _upgradeToAndCall(
    address newImplementation,
    bytes memory data,
    bool forceCall
  ) internal returns (bytes memory) {
    _upgradeTo(newImplementation);
    if (data.length > 0 || forceCall) {
      return LAddress.functionDelegateCall(newImplementation, data, "Delegatecall Failed");  // delegatecall failed
    }
    return new bytes(0);
  }

  /**
   * @dev Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.
   *
   * Emits an {Upgraded} event.
   */
  function _upgradeToAndCallUUPS(
    address newImplementation,
    bytes memory data,
    bool forceCall
  ) internal returns (bytes memory) {
  
    // Upgrades from old implementations will perform a rollback test. This test requires the new
    // implementation to upgrade back to the old, non-ERC1822 compliant, implementation. Removing
    // this special case will break upgrade paths from old UUPS implementation to new ones.
    if (LStorageSlot.getBooleanSlot(_ROLLBACK_SLOT).value) {
      _setImplementation(newImplementation);
      return new bytes(0);
    } else {
      if(IERC1822Proxiable(newImplementation).proxiableUUID() != _IMPLEMENTATION_SLOT) {
        revert("Illegal UUPS");
      }

      if(!IERC165(newImplementation).supportsInterface(type(IProxy).interfaceId)) {
        revert("Illegal IProxy");
      }
 
      return _upgradeToAndCall(newImplementation, data, forceCall);
    }
  }

  /**
   * @dev Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the
   * implementation. It is used to validate that the this implementation remains valid after an upgrade.
   *
   * IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks
   * bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this
   * function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.
   */
  function proxiableUUID() external view virtual override notDelegated returns (bytes32) {
    return _IMPLEMENTATION_SLOT;
  }

  function upgradeTo(
    address newImplementation,
    bytes memory data,
    bool forceCall
  ) external virtual onlyProxy returns (bytes memory) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(_ustat == ProxyUpdatabilityStatus.ENABLED, "Illegal Updatable");
    require(LAddress.isContract(newImplementation), "Illegal Contract");
    _authorizeUpgrade(newImplementation);
    _ustat = ProxyUpdatabilityStatus.DISABLED;
    return _upgradeToAndCallUUPS(newImplementation, data, forceCall);
  }

  /**
   * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
   * {upgradeTo} and {upgradeToAndCall}.
   *
   * Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.
   *
   * ```solidity
   * function _authorizeUpgrade(address) internal override onlyOwner {}
   * ```
   */
  function _authorizeUpgrade(address newImplementation) internal virtual {
    require(newImplementation != _implementation(), "Illegal");
    require(_hasPermission(this.upgradeTo.selector), "Forbidden");
  }

  function localAdmin() external view returns (address) {
    return _getLocalAdmin();
  }

  function setLocalAdmin(address newLocalAdmin) external onlyProxy returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(_ustat == ProxyUpdatabilityStatus.ENABLED, "Illegal Updatable");
    require(_hasPermission(this.setLocalAdmin.selector), "Forbidden");
    require(newLocalAdmin != address(0), "Invalid");
    _ustat = ProxyUpdatabilityStatus.DISABLED;
    _setLocalAdmin(newLocalAdmin);
    return true;
  }

  /**
   * @dev Returns the current admin.require(!_isSafeMode, "Rejected");
   */
  function _getLocalAdmin() internal view returns (address) {
    return LStorageSlot.getAddressSlot(_ADMIN_SLOT).value;
  }

  /**
   * @dev Stores a new address in the EIP1967 admin slot.
   */
  function _setLocalAdmin(address newAdmin) internal {
    LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    emit ProxyLocalAdminUpdated(_msgSender(), address(this), newAdmin);
  }

  // In each upgrade the initialize requirement must be changed
  function setSafeModeStatus(ProxySafeModeStatus sstat) external onlyProxy returns (bool) {
    require(_getInitializedCount() > 0, "NOT INIT");
    require(_hasPermission(this.setSafeModeStatus.selector), "Forbidden");
    _sstat = sstat;
    emit ProxySafeModeUpdated(_msgSender(), address(this), sstat);
    return true;
  }

  function setUpdatabilityStatus(ProxyUpdatabilityStatus ustat) external onlyProxy returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(_hasPermission(this.setUpdatabilityStatus.selector), "Forbidden");
    _ustat = ustat;
    emit ProxyUpdatabilityUpdated(_msgSender(), address(this), ustat);
    return true;
  }

  function setAccessControlManager(address acl) external onlyProxy returns (bool) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(_ustat == ProxyUpdatabilityStatus.ENABLED, "Illegal Updatable");
    require(acl != address(0) && LAddress.isContract(acl), "Illegal Contract");

    if(_accessControlManager != address(0)) {
      require(_hasPermission(this.setAccessControlManager.selector), "Forbidden");
    } else {
      require(_getLocalAdmin() == _msgSender(), "Access Denied");
    }

    if(!IERC165(acl).supportsInterface(type(IAccessControl).interfaceId)) {
        revert("Illegal ACL");  
    }

    _ustat = ProxyUpdatabilityStatus.DISABLED;
    _accessControlManager = acl; 
    emit ProxyAccessControlUpdated(_msgSender(), address(this), _accessControlManager);
    return true;   
  }

  function proxyInfo() external view returns (ProxyInfo memory) {
    return ProxyInfo({
      domainSeparator: _domainSeparatorV4(),
      name: _contractName,
      version: _contractVersion,
      acl: _accessControlManager,
      subject: _implementation(),
      localAdmin: _getLocalAdmin(),
      initVersion: _getInitializedCount(),
      sstat: _sstat,
      ustat: _ustat
    });
  }
  function contractName() external view returns (string memory) {
    return _contractName;
  }

  function contractVersion() external view returns (string memory) {
    return _contractVersion;
  }

  function accessControlManager() external view returns (address) {
    return _accessControlManager;
  }

  function subjectAddress() external view returns (address) {
    return _implementation();
  }

  function safeModeStatus() external view returns (ProxySafeModeStatus) {
    return _sstat;
  }

  function updatabilityStatus() external view returns (ProxyUpdatabilityStatus) {
    return _ustat;
  }

  function domainSeparator() external view returns (bytes32) {
    return _domainSeparatorV4();
  }

  function _domainSeparatorV4() internal view returns (bytes32) {

    return keccak256(
      abi.encode(
        _TYPE_HASH, 
        keccak256(abi.encodePacked(_contractName)), 
        keccak256(abi.encodePacked(_contractVersion)), 
        block.chainid, 
        address(this)
      )
    );
  }

  function initVersion() external view returns (uint16) {
    return _getInitializedCount();
  }

  function withdrawBalance(address recepient) external returns(uint256) {
    require(_sstat == ProxySafeModeStatus.DISABLED, "Rejected");
    require(_hasPermission(this.withdrawBalance.selector), "Forbidden");
    uint256 balance = address(this).balance;
    payable(recepient).transfer(address(this).balance);
    return balance;
  }

  // solhint-disable-next-line
  receive() external payable override {}

  // solhint-disable-next-line
  fallback() external payable override {}
}
