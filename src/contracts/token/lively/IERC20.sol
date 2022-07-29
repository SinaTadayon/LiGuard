// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);

    event Approval(address indexed owner, address indexed spender, uint256 amount);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function transferFrom(address source, address recipient, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);
}
