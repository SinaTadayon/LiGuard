// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

import "./IERC1822.sol";
import "./IProxy.sol";
import "./BaseProxy.sol";
import "./BaseUUPSStorage.sol";
import "./Initializable.sol";
import "../lib/LAddress.sol";
import "../lib/LStorageSlot.sol";
import "../acl/IAccessControl.sol";
import "../acl/IContextManagement.sol";
import "../utils/Message.sol";
import "../utils/ERC165.sol";
import "../lib/LContextUtils.sol";
// import "hardhat/console.sol";


/**
 * @dev This contract implements an upgradeable proxy. It is upgradeable because calls are delegated to an
 * implementation address that can be changed. This address is stored in storage in the location specified by
 * https://eips.ethereum.org/EIPS/eip-1967[EIP1967], so that it doesn't conflict with the storage layout of the
 * implementation behind the proxy.

 * An upgradeability mechanism designed for UUPS proxies. The functions included here can perform an upgrade of an
 * {ERC1967Proxy}, when this contract is set as the implementation behind such a proxy.
 *
 * A security mechanism ensures that an upgrade does not turn off upgradeability accidentally, although this risk is
 * reinstated if the upgrade retains upgradeability but removes the security mechanism, e.g. by replacing
 * `UUPSUpgradeable` with a custom implementation of upgrades.
 *
 * The {_authorizeUpgrade} function must be overridden to include access restriction to the upgrade mechanism.
 */

abstract contract BaseUUPSProxy is BaseUUPSStorage, BaseProxy, Initializable, IProxy, IERC1822Proxiable, Message, ERC165 {
 
    /**
     * @dev Check that the execution is being performed through a delegatecall call and that the execution context is
     * a proxy contract with an implementation (as defined in ERC1967) pointing to self. This should only be the case
     * for UUPS and transparent proxies that are using the current contract as their implementation. Execution of a
     * function through ERC1167 minimal proxies (clones) would not normally pass this test, but is not guaranteed to
     * fail.
     */
    modifier onlyProxy() {
        require(address(this) != __self, "Illegal Contract Call");
        require(_implementation() == __self, "Proxy Called Invalid");
        _;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyAdmin() {
        require(_getAdmin() == _msgSender(), "Caller Not Authorized");
        _;
    }


    /**
     * @dev Check that the execution is not being performed through a delegate call. This allows a function to be
     * callable on the implementing contract but not through proxies.
     */
    modifier notDelegated() {
        require(address(this) == __self, "Illeagal Contract Delegatecall");
        _;
    }

    function _hasPermission(bytes4 selector) internal returns (bool) {
        if (address(this) == _accessControl) {
            bytes memory data = abi.encodeWithSignature("hasAccess(bytes32,address,bytes4)", 
                    LContextUtils.generateCtx(address(this)), msg.sender, selector);
            bytes memory returndata = _functionDelegateCall(_implementation(), data, "hasAccess Failed");
            return uint8(returndata[returndata.length - 1]) == 1;
        } else {
            return IAccessControl(_accessControl).hasAccess(LContextUtils.generateCtx(address(this)), msg.sender, selector);
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

        // set _isUpgradable and _isEnabled of contact  
        _isUpgradable = false;
        _isEnabled = false;
    }


    function __BASE_UUPS_init(string calldata domainName, string calldata domainVersion, bytes32 domainRealm, address accessControl) internal {
        __BASE_UUPS_init_unchained(domainName, domainVersion, domainRealm, accessControl);
    }

    function __BASE_UUPS_init_unchained(string calldata domainName, string calldata domainVersion, bytes32 domainRealm, address accessControl) internal onlyProxy onlyInitializing {
        _domainName = domainName;
        _domainVersion = domainVersion;
        _domainRealm = domainRealm;
        // TODO check acl address
        if (accessControl == address(0)) {
            _accessControl = address(this);
        } else {
            _accessControl = accessControl;
        }
        _isUpgradable = false;
        _isEnabled = true;
        _setAdmin(_accessControl);        
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return
            interfaceId == type(IProxy).interfaceId || 
            interfaceId == type(IERC1822Proxiable).interfaceId || 
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns the current implementation address.
     */
    function _implementation() internal override view returns (address) {
        return LStorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
    }

    /**
     * @dev Stores a new address in the EIP1967 implementation slot.
     */
    function _setImplementation(address newImplementation) private {
        require(_isEnabled, "Context Not Activated");
        require(LAddress.isContract(newImplementation), "Illegal Contract Address");
        LStorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
    }

    /**
     * @dev Perform implementation upgrade
     *
     * Emits an {Upgraded} event.
     */
    function _upgradeTo(address newImplementation) internal {
        require(_isUpgradable, "Context Upgradable Disabled");
        _setImplementation(newImplementation);              
        emit Upgraded(msg.sender, address(this), newImplementation);  
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
            return _functionDelegateCall(newImplementation, data, "Delegatecall Failed");
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
            require(_isUpgradable, "Context Not Upgradable");
            _setImplementation(newImplementation);
            return new bytes(0);
        } else {
            try IERC1822Proxiable(newImplementation).proxiableUUID() returns (bytes32 slot) {
                require(slot == _IMPLEMENTATION_SLOT, "Contract UUPS Invalid");
            } catch {
                revert("Contract Not UUPS");
            }
            return _upgradeToAndCall(newImplementation, data, forceCall);
        }
    }


    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     */
    function _functionDelegateCall(address target, bytes memory data, string memory message) private returns (bytes memory) {
        require(_isEnabled, "Context Not Activated");
        require(LAddress.isContract(target), "Illegal Contract Address");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        // console.log("_functionDelegateCall, msg: %s", message);
        // console.logBool(success);
        // console.logBytes(returndata);
        return LAddress.verifyCallResult(success, returndata, message);
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

    function upgradeTo(address newImplementation, bytes memory data, bool forceCall) external virtual onlyProxy returns (bytes memory){
        _authorizeUpgrade(newImplementation);
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
        require(_hasPermission(this.upgradeTo.selector), "Context Upgradability Forbidden");
        
    }


    function getAdmin() external view returns (address) {
        return _getAdmin();
    }

    function setAdmin(address newAdmin) external returns (bool) {
        _setAdmin(newAdmin);
        return true;
    }

    /**
     * @dev Returns the current admin.
     */
    function _getAdmin() internal view returns (address) {
        return LStorageSlot.getAddressSlot(_ADMIN_SLOT).value;
    }

    /**
     * @dev Stores a new address in the EIP1967 admin slot.
     */
    function _setAdmin(address newAdmin) internal onlyProxy {
        require(_isEnabled, "Context Not Activated");
        require(_hasPermission(this.setAdmin.selector), "Change ProxyAdmin Forbidden");
        require(newAdmin != address(0), "Address Invalid");
        LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
        emit AdminChanged(_msgSender(), address(this), newAdmin);
    }
 
    function setActivity(bool value) external onlyProxy returns (bool) {
        require(_hasPermission(this.setActivity.selector), "Changed Activity Forbidden");
        _isEnabled = value;
        emit ActivityChanged(_msgSender(), address(this), _domainRealm, value);
        return value;
    }

    function setUpgradability(bool value) external onlyProxy returns (bool) {
        require(_hasPermission(this.setUpgradability.selector), "Change Upgradability Forbidden");
        _isUpgradable = value;
        emit UpgradabilityChanged(_msgSender(), address(this), _domainRealm, value);
        return value;
    }

    function contractName() external view returns (string memory) {
        return _domainName;
    }

    function contractVersion() external view returns (string memory) {
        return _domainVersion;
    }

    function contractRealm() external view returns (bytes32) {
        return _domainRealm;
    }

    function contractContext() external view returns (bytes32) {
        return LContextUtils.generateCtx(address(this));
    }

    function getAccessControl() external view returns (address) {
        return _accessControl;
    }

    function subjectAddress() external view returns (address) {
        return _implementation();
    }

    function isActivated() external view returns (bool) {
        return _isEnabled;
    }

    function isUpgradable() external view returns (bool) {
        return _isUpgradable;
    }
}
