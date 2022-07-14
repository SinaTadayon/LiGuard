// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

/**
 * @dev Collection of functions related to the context
 */
library LContextUtils {

    function generateCtx(address contractAddress) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(contractAddress));
    }
}