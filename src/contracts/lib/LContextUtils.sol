// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/**
 * @dev Collection of functions related to the context
 */
library LContextUtils {
  function generateCtx(address contractId) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(contractId));
  }
}
