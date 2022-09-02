// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IERC20Extra {
  event ApprovalIncreased(address indexed owner, address indexed spender, uint256 amount);

  event ApprovalDecreased(address indexed owner, address indexed spender, uint256 amount);

  event TransferFrom(address indexed sender, address indexed from, address indexed to, uint256 amount);

  event BatchTransfer(address indexed sender, uint256 totalAmount);

  event BatchTransferFrom(address indexed sender, uint256 totalAmount);

  event TaxRateUpdated(address indexed sender, uint256 rate);

  event TaxWhitelistUpdated(address indexed sender, address indexed account, bool isDeleted);

  event Burn(address indexed sender, address indexed account, uint256 amount, uint256 totalSupply);

  event Mint(address indexed sender, address indexed account, uint256 amount, uint256 totalSupply);

  struct BatchTransferRequest {
    address recipient;
    uint256 amount;
  }

  struct BatchTransferFromRequest {
    address source;
    address recipient;
    uint256 amount;
  }

  struct BatchUpdateTaxWhitelistRequest {
    address account;
    bool isDeleted;
  }

  function increaseAllowance(address spender, uint256 value) external returns (uint256);

  function decreaseAllowance(address spender, uint256 value) external returns (uint256);

  function burn(address account, uint256 amount) external returns (uint256);

  function mint(address account, uint256 amount) external returns (uint256);

  function batchTransfer(BatchTransferRequest[] calldata request) external returns (bool);

  function batchTransferFrom(BatchTransferFromRequest[] calldata request) external returns (bool);

  function updateTaxRate(uint256 taxRate) external returns (bool);

  function updateTaxWhitelist(address account, bool isDeleted) external returns (bool);

  function batchUpdateTaxWhitelist(BatchUpdateTaxWhitelistRequest[] calldata request) external;

  function taxRate() external view returns (uint256);

  function taxTreasury() external view returns (address);

  function taxWhitelist() external view returns (address[] memory);

  function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool);

  function nonce(address owner) external view returns (uint256);
}
