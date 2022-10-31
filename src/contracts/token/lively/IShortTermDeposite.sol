// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Short Term Deposite Staking Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IShortTermDeposite {
  event STDDeposited(
    address indexed sender,
    uint256 amount,
    uint256 balance,
    uint256 interest,
    uint128 timestamp,
    uint64 aprId
  );

  event STDWithdrawn(
    address indexed sender,
    uint256 amount,
    uint256 balance,
    uint256 interest,
    uint128 timestamp,
    uint64 aprId
  );

  event STDClaimed(address indexed sender, uint256 balance, uint256 interest, uint128 timestamp, uint64 aprId);

  function depositeStd(uint256 amount) external returns (uint256);

  function withdrawStd(uint256 amount) external returns (uint256);

  function claimStd() external returns (uint256);

  function getStdInfo(address account)
    external
    view
    returns (
      uint256,
      uint256,
      uint128,
      uint128
    );
}
