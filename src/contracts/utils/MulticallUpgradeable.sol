// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lib/LAddress.sol";

/**
 * @dev Provides a function to batch together multiple calls in a single external call.
 *
 */
abstract contract Multicall {
  /**
   * @dev Receives and executes a batch of function calls on this contract.
   */
  function multicall(bytes[] calldata data) external virtual returns (bytes[] memory results) {
    results = new bytes[](data.length);
    for (uint256 i = 0; i < data.length; i++) {
      results[i] = _functionDelegateCall(address(this), data[i]);
    }
    return results;
  }

  /**
   * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
   * but performing a delegate call.
   */
  function _functionDelegateCall(address target, bytes memory data) private returns (bytes memory) {
    require(LAddress.isContract(target), "Address: delegate call to non-contract");

    // solhint-disable-next-line avoid-low-level-calls
    (bool success, bytes memory returndata) = target.delegatecall(data);
    return LAddress.verifyCallResult(success, returndata, "Address: Call Failed");
  }
}
