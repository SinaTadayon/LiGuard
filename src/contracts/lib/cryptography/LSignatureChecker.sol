// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)
// Author: OpenZeppelin

pragma solidity 0.8.19;

import "./LECDSA.sol";
import "../LAddress.sol";
import "../../utils/IERC1271.sol";

/**
 * @dev Signature verification helper that can be used instead of `ECDSA.recover` to seamlessly support both ECDSA
 * signatures from externally owned accounts (EOAs) as well as ERC1271 signatures from smart contract wallets like
 * Argent and Gnosis Safe.
 */
library LSignatureChecker {
  /**
   * @dev Checks if a signature is valid for a given signer and data hash. If the signer is a smart contract, the
   * signature is validated against that smart contract using ERC1271, otherwise it's validated using `ECDSA.recover`.
   *
   * NOTE: Unlike ECDSA signatures, contract signatures are revocable, and the outcome of this function can thus
   * change through time. It could return true at block N and false at block N+1 (or the opposite).
   */
  function isValidSignatureNow(
    address signer,
    bytes32 hash,
    bytes memory signature
  ) internal view returns (bool) {
    (address recovered, LECDSA.RecoverError error) = LECDSA.tryRecover(hash, signature);
    if (error == LECDSA.RecoverError.NoError && recovered == signer) {
      return true;
    }

    (bool success, bytes memory result) = signer.staticcall(
      abi.encodeWithSelector(IERC1271.isValidSignature.selector, hash, signature)
    );
    return (success && result.length == 32 && abi.decode(result, (bytes4)) == IERC1271.isValidSignature.selector);
  }
}
