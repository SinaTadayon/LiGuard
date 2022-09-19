// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

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
