// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

import "./IERC1822.sol";
import "./IProxy.sol";
import "./BaseProxy.sol";
import "./BaseUUPSStorage.sol";
import "./Initializable.sol";
import "../lib/Address.sol";
import "../lib/StorageSlot.sol";
import "../acl/IACL.sol";
import "../acl/IContextManagement.sol";
import "../utils/Message.sol";
import "../utils/ERC165.sol";
import "../lib/ContextUtils.sol";


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
 *
 */

abstract contract BaseUUPSLogic is BaseUUPSStorage, BaseProxy, Initializable, IProxy, IERC1822Proxiable, Message, ERC165 {
 
    /**
     * @dev Check that the execution is being performed through a delegatecall call and that the execution context is
     * a proxy contract with an implementation (as defined in ERC1967) pointing to self. This should only be the case
     * for UUPS and transparent proxies that are using the current contract as their implementation. Execution of a
     * function through ERC1167 minimal proxies (clones) would not normally pass this test, but is not guaranteed to
     * fail.
     */
    modifier onlyProxy() {
        require(address(this) != __self, "Only Delegatecall Acceptable");
        require(_implementation() == __self, "Called By Active Proxy");
        _;
    }

      /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyAdmin() {
        require(_getProxyAdmin() == _msgSender(), "Caller Is Not Admin");
        _;
    }


    /**
     * @dev Check that the execution is not being performed through a delegate call. This allows a function to be
     * callable on the implementing contract but not through proxies.
     */
    modifier notDelegated() {
        require(address(this) == __self, "Delegatecall Not Acceptable");
        _;
    }

    function _hasPermission(bytes4 selector) internal view returns (bool) {
        return IACL(_livelyACL).hasAccess(Context.generateCtx(address(this)), msg.sender, selector);
    }


    /**
     * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
     *
     * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
     * function call, and allows initializating the storage of the proxy like a Solidity constructor.
     */

    constructor() {
        _disableInitializers();

        // set Proxy Admin (implementation contract)
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = _msgSender();

        // set Proxy Admin (implementation contract)
        _isUpgradable = false;
        _isEnabled = false;
    }


    function __BASE_UUPS_init(string calldata domainName, string calldata domainVersion, string calldata domainRealm, address acl) internal onlyAdmin onlyInitializing {
        __BASE_UUPS_init_unchained(domainName, domainVersion, domainRealm, acl);
    }

    // TODO initialize event 
    function __BASE_UUPS_init_unchained(string calldata domainName, string calldata domainVersion, string calldata domainRealm, address acl) internal onlyAdmin onlyInitializing {
        _domainName = domainName;
        _domainVersion = domainVersion;
        _domainRealm = domainRealm;
        // TODO check acl address
        _livelyACL = acl;
        _isUpgradable = false;
        _isEnabled = true;
        _setProxyAdmin(_msgSender());
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, Pausable)
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
        return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
    }

    /**
     * @dev Stores a new address in the EIP1967 implementation slot.
     */
    function _setImplementation(address newImplementation) private {
        require(_isEnabled, "Context Is Not Activated");
        require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
        StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
    }

    /**
     * @dev Perform implementation upgrade
     *
     * Emits an {Upgraded} event.
     */
    function _upgradeTo(address newImplementation) internal {
        require(_isEnabled, "Context Is Not Activated");
        address currentImplementation = _implementation();
        emit Upgraded(newImplementation);       // TODO Does it remove?
        emit ProxyUpgraded(msg.sender, address(this), newImplementation, currentImplementation, 
                    IProxy(newImplementation).subjectVersion(), IProxy(currentImplementation).subjectVersion());
        _setImplementation(newImplementation);                
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
            return _functionDelegateCall(newImplementation, data);
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
        if (StorageSlot.getBooleanSlot(_ROLLBACK_SLOT).value) {
            _setImplementation(newImplementation);
            return new bytes(0);
        } else {
            try IERC1822Proxiable(newImplementation).proxiableUUID() returns (bytes32 slot) {
                require(slot == _IMPLEMENTATION_SLOT, "Contract Unsupported proxiableUUID");
            } catch {
                revert("Contract Is Not UUPS");
            }
            return _upgradeToAndCall(newImplementation, data, forceCall);
        }
    }


    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     */
    function _functionDelegateCall(address target, bytes memory data) private returns (bytes memory) {
        require(_isEnabled, "Context Is Not Activated");
        require(Address.isContract(target), "Delegatecall to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return Address.verifyCallResult(success, returndata, "low-level delegate call failed");
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

    function upgradeTo(address newImplementation, bytes memory data, bool forceInitCall) 
                external virtual onlyProxy returns (bytes memory) {
        _authorizeUpgrade(newImplementation);
        return _upgradeToAndCallUUPS(newImplementation, data, forceInitCall);
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
        require(_isUpgradable, "Context Is Not Upgradable");
    }


    function getProxyAdmin() external view returns (address) {
        return _getProxyAdmin();
    }

    function setProxyAdmin(address newAdmin) external returns (bool) {
        _setProxyAdmin(newAdmin);
        return true;
    }

    /**
     * @dev Returns the current admin.
     */
    function _getProxyAdmin() internal view returns (address) {
        return StorageSlot.getAddressSlot(_ADMIN_SLOT).value;
    }

    /**
     * @dev Stores a new address in the EIP1967 admin slot.
     */
    function _setProxyAdmin(address newAdmin) private {
        require(_isEnabled, "Context Is Not Activated");
        require(_hasPermission(this.setProxyAdmin.selector), "Change ProxyAdmin Forbidden");
        require(newAdmin != address(0), "Address Invalid");
        emit ProxyAdminChanged(_msgSender(), address(this), _getProxyAdmin(), newAdmin);
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;        
    }
 
    function setActivity(bool value) external returns (bool) {
        require(_hasPermission(this.setActivity.selector), "Changed Activity Forbidden");
        _isEnabled = value;
        emit ActivityChanged(_msgSender(), address(this), _domainRealmHash, value);
        return value;
    }

    function setUpgradability(bool value) external returns (bool) {
        require(_hasPermission(this.setUpgradability.selector), "Change Upgradability Forbidden");
        _isUpgradable = value;
        emit UpgradablilityChanged(_msgSender(), address(this), _domainRealmHash, value);
        return value;
    }

    function subjectName() external view returns (string memory) {
        return _domainName;
    }

    function subjectVersion() external view returns (string memory) {
        return _domainVersion;
    }

    function subjectRealm() external view returns (bytes32) {
        return _domainRealmHash;
    }

    function subjectContext() external view returns (bytes32) {
        return Context.generateCtx(address(this));
    }

    function implementation() external view returns (address) {
        return _implementation();
    }

    function isActivated() external view returns (bool) {
        return _isEnabled;
    }

    function isUpgradable() external view returns (bool) {
        return _isUpgradable;
    }

    function initialize(string calldata domainName, string calldata domainVersion, string calldata domainRealm, address acl) public virtual; 

    function _registerContext() internal virtual returns (bool) {
        RequestContext memory reqCtx = RequestContext({
            realm: keccak256(abi.encodePacked(_domainRealm)),
            smca: address(this)
        });

        RequestContextResource memory rcr;
        rcr.role = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
        rcr.funcSelectors = [
            this.setUpgradability.selector, 
            this.setActivity.selector, 
            this.setProxyAdmin.selector,
            this.upgradeTo.selector,
            this.initialize.selector
        ];
    }

}
