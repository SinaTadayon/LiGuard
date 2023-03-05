// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.19;

import "./LSafeMath.sol";

/**
 * @title Basis Points Math Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LBasisPointsMath {
  using LSafeMath for uint256;

  uint256 private constant _BASIS_POINTS = 10000;

  function mulBP(uint256 amt, uint256 bp) internal pure returns (uint256) {
    return amt.mul(bp).div(_BASIS_POINTS);
  }

  function divBP(uint256 amt, uint256 bp) internal pure returns (uint256) {
    require(bp > 0, "Illegal Divide Zero");
    return amt.mul(_BASIS_POINTS).div(bp);
  }

  function addBP(uint256 amt, uint256 bp) internal pure returns (uint256) {
    if (amt == 0) return 0;
    if (bp == 0) return amt;
    return amt.add(mulBP(amt, bp));
  }

  function subBP(uint256 amt, uint256 bp) internal pure returns (uint256) {
    if (amt == 0) return 0;
    if (bp == 0) return amt;
    return amt.sub(mulBP(amt, bp));
  }
}
