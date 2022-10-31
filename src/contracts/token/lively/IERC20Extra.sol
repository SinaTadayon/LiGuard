// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title ERC20 Token Extra Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IERC20Extra {
  struct BatchTransferRequest {
    address to;
    uint256 amount;
  }

  struct BatchTransferFromRequest {
    address from;
    address to;
    uint256 amount;
  }

  struct BatchUpdateTaxWhitelistRequest {
    address account;
    bool isDeleted;
  }

  event ApprovalIncreased(address indexed owner, address indexed spender, uint256 amount);

  event ApprovalDecreased(address indexed owner, address indexed spender, uint256 amount);

  event TransferFrom(address indexed sender, address indexed from, address indexed to, uint256 amount);

  event BatchTransfer(address indexed sender, uint256 totalAmount);

  event BatchTransferFrom(address indexed sender, uint256 totalAmount);

  event TaxRateUpdated(address indexed sender, uint256 rate);

  event TaxWhitelistUpdated(address indexed sender, address indexed account, bool isDeleted);

  event Burn(address indexed sender, address indexed account, uint256 amount, uint256 totalSupply);

  event Mint(address indexed sender, address indexed account, uint256 amount, uint256 totalSupply);

  function increaseAllowance(address spender, uint256 amount) external returns (uint256);

  function decreaseAllowance(address spender, uint256 amount) external returns (uint256);

  function burn(address account, uint256 amount) external returns (uint256);

  function mint(address account, uint256 amount) external returns (uint256);

  function batchTransfer(BatchTransferRequest[] calldata request) external returns (bool);

  function batchTransferFrom(BatchTransferFromRequest[] calldata request) external returns (bool);

  function updateTaxRate(uint256 taxRate) external returns (bool);

  function updateTaxWhitelist(address account, bool isDeleted) external returns (bool);

  function batchUpdateTaxWhitelist(BatchUpdateTaxWhitelistRequest[] calldata request) external;

  function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool);

  function taxRate() external view returns (uint256);

  function taxTreasury() external view returns (address);

  function taxWhitelist() external view returns (address[] memory);

  function nonce(address owner) external view returns (uint256);
}
