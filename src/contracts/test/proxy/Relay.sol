// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.19;

/**
 * @title Relay Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract Relay {
  address private _destContract;

  constructor(address destContract) {
    _destContract = destContract;
  }

  /**
   * @dev Forwards the current call to `_destContract`.
   *
   * This function does not return to its internall call site, it will return directly to the external caller.
   */
  function _forward(uint256 value) internal {
    assembly {
      // loading state variable to stack
      let addr := sload(_destContract.slot)

      // Copy msg.data. We take full control of memory in this inline assembly
      // block because it will not return to Solidity code. We overwrite the
      // Solidity scratch pad at memory position 0.
      calldatacopy(0, 0, calldatasize())

      // Call the implementation.
      // out and outsize are 0 because we don't know the size yet.
      let result := call(gas(), addr, value, 0, calldatasize(), 0, 0)

      // Copy the returned data.
      returndatacopy(0, 0, returndatasize())

      switch result
      // delegatecall returns 0 on error.
      case 0 {
        revert(0, returndatasize())
      }
      default {
        return(0, returndatasize())
      }
    }
  }

  /**
   * @dev Forward the current call to the address returned by `_destContract`.
   *
   * This function does not return to its internall call site, it will return directly to the external caller.
   */
  function _fallback() internal virtual {
    _forward(msg.value);
  }

  /**
   * @dev Fallback function that delegates calls to the address returned by `_destContract`. Will run if no other
   * function in the contract matches the call data.
   */
  // solhint-disable-next-line
  fallback() external payable virtual {
    _fallback();
  }

  /**
   * @dev Fallback function that delegates calls to the address returned by `_destContract`. Will run if call data
   * is empty.
   */
  // solhint-disable-next-line
  receive() external payable virtual {
    _fallback();
  }
}
