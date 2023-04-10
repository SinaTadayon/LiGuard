// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../../proxy/IBaseProxy.sol";
import "../../../proxy/BaseProxy.sol";
import "../../../proxy/IERC1822.sol";
import "../../../proxy/IProxy.sol";
import "../../../lib/LAddress.sol";
import "../../../lib/LStorageSlot.sol";
import "../../../utils/IERC165.sol";
import "./ACLStorageTest.sol";

/**
 * @title Proxy Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ACLManagerProxyTest is ACLStorageTest, BaseProxy {
  /**
   * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
   *
   * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
   * function call, and allows initializing the storage of the proxy like a Solidity constructor.
   */
  constructor(address logic, bytes memory data) payable {
    assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
    assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
    LStorageSlot.getAddressSlot(_ADMIN_SLOT).value = msg.sender;
    _sstat = ProxySafeModeStatus.ENABLED;
    _ustat = ProxyUpdatabilityStatus.DISABLED;
    _upgradeToAndCallUUPS(logic, data, false);
  }

  function _fallback() internal override {
    address facetId = _data.selectors[msg.sig];
    if (facetId == address(0) || facetId == address(this)) {
      _delegate(_implementation());
    } else {
      _delegate(facetId);
    }
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
    emit ProxyUpgraded(msg.sender, address(this), _implementation());
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
      return LAddress.functionDelegateCall(newImplementation, data);
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
    require(LAddress.isContract(newImplementation), "Illegal Contract");
    // Upgrades from old implementations will perform a rollback test. This test requires the new
    // implementation to upgrade back to the old, non-ERC1822 compliant, implementation. Removing
    // this special case will break upgrade paths from old UUPS implementation to new ones.
    if (LStorageSlot.getBooleanSlot(_ROLLBACK_SLOT).value) {
      _setImplementation(newImplementation);
      return new bytes(0);
    } else {
      try IERC1822Proxiable(newImplementation).proxiableUUID() returns (bytes32 slot) {
        require(slot == _IMPLEMENTATION_SLOT, "Invalid UUPS");
      } catch {
        revert("Illegal UUPS");
      }

      try IERC165(newImplementation).supportsInterface(type(IProxy).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid IProxy");
      } catch {
        revert("Illegal IProxy");
      }
      return _upgradeToAndCall(newImplementation, data, forceCall);
    }
  }
}
