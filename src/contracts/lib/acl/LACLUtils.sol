// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Context Utils Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLUtils {

  function functionGenerateId(address contractId, bytes4 selector) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(contractId, selector));
  }

  function accountGenerateId(address account) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(account));
  }

  function generateId(string calldata name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }

  function generateId2(string memory name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }


  function generateHash(string memory name) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }
}
