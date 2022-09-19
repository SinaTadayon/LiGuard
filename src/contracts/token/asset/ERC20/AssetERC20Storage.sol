// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../../proxy/BaseUUPSStorage.sol";

abstract contract AssetERC20Storage is BaseUUPSStorage {

  address internal _erc20Token;
}