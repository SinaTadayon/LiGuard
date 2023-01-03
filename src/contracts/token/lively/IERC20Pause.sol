// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title ERC20 Token Pause Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IERC20Pause {
  event Paused(address indexed sender, address indexed account);

  event Unpaused(address indexed sender, address indexed account);

  event PausedAll(address indexed sender);

  event UnpausedAll(address indexed sender);

  function pause(address account) external;

  function unpause(address account) external;

  function pauseAll() external;

  function unpauseAll() external;

  function isPaused(address account) external view returns (bool);

  function isPausedAll() external view returns (bool);

  function pausedAccounts() external view returns (address[] memory);
}
