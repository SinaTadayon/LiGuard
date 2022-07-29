// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

/**
 * @dev Extension of {ERC20} that allows caller to freeze to token accounts
 * in a way that can be recognized off-chain (via event analysis).
 */
interface IShortTermDeposite {

    event STDDeposited(address indexed sender, uint256 amount, uint256 balance, uint256 interest, uint128 timestamp, uint64 aprId);

    event STDWithdrawn(address indexed sender, uint256 amount, uint256 balance, uint256 interest, uint128 timestamp, uint64 aprId);

    event STDClaimed(address indexed sender, uint256 balance, uint256 interest, uint128 timestamp, uint64 aprId);

    function depositeStd(uint256 amount) external returns (uint256);

    function withdrawStd(uint256 amount) external returns (uint256);

    function claimStd() external returns (uint256);

    function getStdInfo(address account) external view returns (uint256, uint256, uint128, uint128);
}
