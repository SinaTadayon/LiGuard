// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "./math/LMath.sol";
import "./math/LSafeCast.sol";

/**
 * @dev Collection of functions related to array types.
 */
library LArrays {
  /**
   * @dev Searches a sorted `array` and returns the first index that contains
   * a value greater or equal to `element`. If no such index exists (i.e. all
   * values in the array are strictly less than `element`), the array length is
   * returned. Time complexity O(log n).
   *
   * `array` is expected to be sorted in ascending order, and to contain no
   * repeated elements.
   */
  function findUpperBound(uint256[] storage array, uint256 element) internal view returns (uint256) {
    if (array.length == 0) {
      return 0;
    }

    uint256 low = 0;
    uint256 high = array.length;

    while (low < high) {
      uint256 mid = LMath.average(low, high);

      // Note that mid will always be strictly less than high (i.e. it will be a valid array index)
      // because Math.average rounds down (it does integer division with truncation).
      if (array[mid] > element) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    // At this point `low` is the exclusive upper bound. We will return the inclusive upper bound.
    if (low > 0 && array[low - 1] == element) {
      return low - 1;
    } else {
      return low;
    }
  }

  function findIndex(uint256[] storage array, uint256 element) internal view returns (int256) {
    for (uint256 i = 0; i < array.length; i++) {
      if (array[i] == element) {
        return LSafeCast.toInt256(i);
      }
    }
    return -1;
  }

  function deleteIndex(uint256[] storage array, uint256 index) internal {
    require(index < array.length, "Invalid Index");
    array[index] = array[array.length - 1];
    array.pop();
  }

  function findIndex(bytes32[] storage array, bytes32 element) internal view returns (int256) {
    for (uint256 i = 0; i < array.length; i++) {
      if (array[i] == element) {
        return LSafeCast.toInt256(i);
      }
    }
    return -1;
  }

  function deleteIndex(bytes32[] storage array, uint256 index) internal {
    require(index < array.length, "Invalid Index");
    array[index] = array[array.length - 1];
    array.pop();
  }
}
