// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Context Utils Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LContextUtils {
  function generateCtx(address contractId) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(contractId));
  }
}
