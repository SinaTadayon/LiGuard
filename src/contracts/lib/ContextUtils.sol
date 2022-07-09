// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

/**
 * @dev Collection of functions related to the context
 */
library ContextUtils {

    function generateCtx(address contractAddress) internal pure returns (bytes32) {
        return keccak256(abi.encode(contractAddress));
    }
}