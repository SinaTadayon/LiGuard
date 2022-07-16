// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "./IBaseProxy.sol";
import "./BaseProxy.sol";
import "./IERC1822.sol";
import "./BaseUUPSStorage.sol";
import "../lib/LAddress.sol";
import "../lib/LStorageSlot.sol";

// import "hardhat/console.sol";

/**
 * @dev This contract implements an upgradeable proxy. It is upgradeable because calls are delegated to an
 * implementation address that can be changed. This address is stored in storage in the location specified by
 * https://eips.ethereum.org/EIPS/eip-1967[EIP1967], so that it doesn't conflict with the storage layout of the
 * implementation behind the proxy.
 */

contract Proxy is BaseUUPSStorage, BaseProxy, IBaseProxy {
    /**
     * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
     *
     * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
     * function call, and allows initializating the storage of the proxy like a Solidity constructor.
     */
    constructor(address logic, bytes memory data) payable {
        assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
        assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
        LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = msg.sender;
        _upgradeToAndCallUUPS(logic, data, false);
    }

    /**
     * @dev This is a virtual function that should be overridden so it returns the address to which the fallback function
     * and {_fallback} should delegate.
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
    function _upgradeTo(address newImplementation) private {
        _setImplementation(newImplementation);
        emit Upgraded(msg.sender, address(this), _implementation());
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
    ) private returns (bytes memory) {
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
    ) private returns (bytes memory) {
        // Upgrades from old implementations will perform a rollback test. This test requires the new
        // implementation to upgrade back to the old, non-ERC1822 compliant, implementation. Removing
        // this special case will break upgrade paths from old UUPS implementation to new ones.
        if (LStorageSlot.getBooleanSlot(_ROLLBACK_SLOT).value) {
            _setImplementation(newImplementation);
            return new bytes(0);
        } else {
            try IERC1822Proxiable(newImplementation).proxiableUUID() returns (bytes32 slot) {
                require(slot == _IMPLEMENTATION_SLOT, "UUPS Contract Invalid");
            } catch {
                revert("Contract Not UUPS");
            }

            return _upgradeToAndCall(newImplementation, data, forceCall);
        }
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     */
    function _functionDelegateCall(address target, bytes memory data) private returns (bytes memory) {
        require(LAddress.isContract(target), "Illegal Contract Address");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return LAddress.verifyCallResult(success, returndata, "Delegatecall Failed");
    }
}
