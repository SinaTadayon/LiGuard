// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

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
import "hardhat/console.sol";

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
        require(address(this) != __self, "Illegal Contract Call");
        require(_implementation() == __self, "Proxy Called Invalid");
        _;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyLocalAdmin() {
        require(_getAdmin() == _msgSender(), "Caller Not Authorized");
        _;
    }

    /**
     * @dev Check that the execution is not being performed through a delegate call. This allows a function to be
     * callable on the implementing contract but not through proxies.
     */
    modifier notDelegated() {
        require(address(this) == __self, "Illegal Contract Delegatecall");
        _;
    }

    function _hasPermission(bytes4 selector) internal returns (bool) {
        if (address(this) == _accessControlManager) {
            bytes memory data = abi.encodeWithSelector(
                IAccessControl.hasAccess.selector,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                selector
            );
            bytes memory returndata = LAddress.functionDelegateCall(_implementation(), data, "Delegatecall hasAccess Failed");
            return uint8(returndata[returndata.length - 1]) == 1;
        } else {
            return
                IAccessControl(_accessControlManager).hasAccess(
                    LContextUtils.generateCtx(address(this)),
                    msg.sender,
                    selector
                );
        }
    }

    function _isRealmUpgradable() internal returns (bool) {
        if (address(this) == _accessControlManager) {
            bytes memory data = abi.encodeWithSelector(
                IAccessControl.isRealmUpgradable.selector,
                _domainRealm
            );
            bytes memory returndata = LAddress.functionDelegateCall(_implementation(), data, "Delegatecall isRealmUpgradable Failed");
            return uint8(returndata[returndata.length - 1]) == 1;
        } else {
            return
                IAccessControl(_accessControlManager).isRealmUpgradable(_domainRealm);
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
        _isSafeMode = true;
    }

    function __BASE_UUPS_init(
        string calldata domainName,
        string calldata domainVersion,
        bytes32 domainRealm,
        address accessControlManager
    ) internal {
        __BASE_UUPS_init_unchained(domainName, domainVersion, domainRealm, accessControlManager);
    }

    function __BASE_UUPS_init_unchained(
        string calldata domainName,
        string calldata domainVersion,
        bytes32 domainRealm,
        address accessControlManager
    ) internal onlyInitializing {
        _domainName = keccak256(abi.encodePacked(domainName));
        _domainVersion = keccak256(abi.encodePacked(domainVersion));
        _domainRealm = domainRealm;
        if (accessControlManager == address(0)) {
            _accessControlManager = address(this);
        } else {
            try IERC165(accessControlManager).supportsInterface(type(IAccessControl).interfaceId) returns (bool isSupported) {
                require(isSupported, "Invalid AccessControlManager");
            } catch {
                revert("Illegal AccessControlManager");
            }
            _accessControlManager = accessControlManager;
        }
        _isUpgradable = false;
        _isSafeMode = false;
        _setAdmin(_msgSender());
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
        require(LAddress.isContract(newImplementation), "Illegal Contract Address");
        LStorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
    }

    /**
     * @dev Perform implementation upgrade
     *
     * Emits an {Upgraded} event.
     */
    function _upgradeTo(address newImplementation) internal {
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
            return LAddress.functionDelegateCall(newImplementation, data, "Delegatecall Failed");
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
            try IERC1822Proxiable(newImplementation).proxiableUUID() returns (bytes32 slot) {
                require(slot == _IMPLEMENTATION_SLOT, "Invalid UUPS Contract");
            } catch {
                revert("Illegal UUPS Contract");
            }

            try IERC165(newImplementation).supportsInterface(type(IProxy).interfaceId) returns (bool isSupported) {
                require(isSupported, "Invalid IProxy Contract");
            } catch {
                revert("Illegal IProxy Contract");
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
        require(!_isSafeMode, "SafeMode: Call Rejected");
        require(_isUpgradable, "Upgrade Call Rejected");
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
        require(newImplementation != _implementation(), "Illegal New Implementation");
        require(_hasPermission(this.upgradeTo.selector), "Upgrade Context Forbidden");
    }

    function getAdmin() external view returns (address) {
        return _getAdmin();
    }

    function setAdmin(address newAdmin) external onlyProxy returns (bool) {
        require(!_isSafeMode, "SafeMode: Call Rejected");
        require(_hasPermission(this.setAdmin.selector), "SetAdmin Forbidden");
        require(newAdmin != address(0), "Address Invalid");
        _setAdmin(newAdmin);
        return true;
    }

    /**
     * @dev Returns the current admin.require(!_isSafeMode, "SafeMode: Call Rejected");
     */
    function _getAdmin() internal view returns (address) {
        return LStorageSlot.getAddressSlot(_ADMIN_SLOT).value;
    }

    /**
     * @dev Stores a new address in the EIP1967 admin slot.
     */
    function _setAdmin(address newAdmin) internal {
        LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
        emit AdminChanged(_msgSender(), address(this), newAdmin);
    }

    // In each upgrade the initialize requirement must be changed
    function setSafeMode(bool status) external onlyProxy returns (bool) {
        require(_getInitializedCount() > 0, "Contract Not Initialized");
        require(_hasPermission(this.setSafeMode.selector), "SetSafeMode Forbidden");
        _isSafeMode = status;
        emit SafeModeChanged(_msgSender(), address(this), _domainRealm, status);
        return status;
    }

    function setUpgradeStatus(bool status) external onlyProxy returns (bool) {
        require(!_isSafeMode, "SafeMode: Call Rejected");
        require(_hasPermission(this.setUpgradeStatus.selector), "SetUpgradeStatus Forbidden");
        require(_isRealmUpgradable(), "Realm Upgrade Forbidden");
        _isUpgradable = status;
        emit UpgradeStatusChanged(_msgSender(), address(this), _domainRealm, status);
        return status;
    }

    function contractName() external view returns (bytes32) {
        return _domainName;
    }

    function contractVersion() external view returns (bytes32) {
        return _domainVersion;
    }

    function contractRealm() external view returns (bytes32) {
        return _domainRealm;
    }

    function contractContext() external view returns (bytes32) {
        return LContextUtils.generateCtx(address(this));
    }

    function getAccessControlManager() external view returns (address) {
        return _accessControlManager;
    }

    function subjectAddress() external view returns (address) {
        return _implementation();
    }

    function isSafeMode() external view returns (bool) {
        return _isSafeMode;
    }

    function isUpgradable() external view returns (bool) {
        return _isUpgradable;
    }

    function getInitializedVersion() external view returns (uint16) {
        return _getInitializedCount();
    }

    function getInitializeStatus() external view returns (bool) {
        return _isInitializing();
    }

}
