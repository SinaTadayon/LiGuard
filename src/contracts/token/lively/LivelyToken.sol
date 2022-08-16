// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "./IERC20.sol";
import "./IERC20Extra.sol";
import "./IERC20Pause.sol";
import "./LivelyStorage.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/token/LTokenERC20.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/LCounters.sol";
import "../../lib/math/LBasisPointsMath.sol";
import "../../lib/math/LSafeMath.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../acl/IContextManagement.sol";

import "hardhat/console.sol";

contract LivelyToken is LivelyStorage, BaseUUPSProxy, IERC20, IERC20Extra, IERC20Pause {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LCounters for LCounters.Counter;
  using LBasisPointsMath for uint256;
  using LSafeMath for uint256;

  struct InitRequest {
    string domainName;
    string domainVersion;
    string domainRealm;
    bytes signature;
    uint256 taxRateValue;
    uint256 totalSupplyAmount;
    address accessControlManager;
    address taxTreasuryAddress;
    address assetManager;
  }

  constructor() {}

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.domainName, request.domainVersion, realm, request.accessControlManager);

    _name = "LIVELY";
    _symbol = "LVL";
    _taxRate = request.taxRateValue;
    _taxTreasury = request.taxTreasuryAddress;
    _mint(request.assetManager, request.totalSupplyAmount);
    initContext(request.domainName, request.domainVersion, realm, request.signature);
  }

  function initContext(
    string calldata domainName,
    string calldata domainVersion,
    bytes32 realm,
    bytes calldata signature
  ) internal {
    (IContextManagement.RequestContext memory rc, IContextManagement.RequestRegisterContext[] memory rrc) = LTokenERC20
      .createRequestContext(_domainName, _domainVersion, _domainRealm);

    IContextManagement(_accessControlManager).registerContext(signature, rc, rrc);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      domainName,
      domainVersion,
      realm,
      _getInitializedCount()
    );
  }

  function distributeToken() public view onlyProxy onlyLocalAdmin safeModeCheck returns (bool) {
    require(_getInitializedCount() == 1, "Token Already Distributed");
    return true;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IERC20).interfaceId ||
      interfaceId == type(IERC20Extra).interfaceId ||
      interfaceId == type(IERC20Pause).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  modifier whenNotPaused() {
    require(!_isPaused, "ERC20Pause: Call Rejected");
    _;
  }

  modifier whenAccountNotPaused(address account) {
    require(!_pausedList.contains(account), "ERC20Pause: Account Suspended");
    _;
  }

  function pause(address account) external safeModeCheck aclCheck(this.pause.selector) {
    require(account != address(0), "Invalid Account Address");
    require(!_pausedList.contains(account), "Account Already Paused");
    _pausedList.add(account);
    emit Paused(_msgSender(), account);
  }

  function unpause(address account) external safeModeCheck aclCheck(this.unpause.selector) {
    require(account != address(0), "Invalid Account Address");
    require(_pausedList.contains(account), "Account Not Found");
    _pausedList.remove(account);
    emit Unpaused(_msgSender(), account);
  }

  function pauseAll() external safeModeCheck aclCheck(this.pauseAll.selector) {
    _isPaused = true;
    emit PausedAll(_msgSender());
  }

  function unpauseAll() external safeModeCheck aclCheck(this.unpauseAll.selector) {
    _isPaused = false;
    emit UnpausedAll(_msgSender());
  }

  function isPaused(address account) external view returns (bool) {
    return account != address(0) && _pausedList.contains(account);
  }

  function isPausedAll() external view returns (bool) {
    return _isPaused;
  }

  function pausedAccounts() external view returns (address[] memory) {
    return _pausedList.values();
  }

  function updateTaxRate(uint256 rate) external safeModeCheck aclCheck(this.updateTaxRate.selector) returns (bool) {
    _taxRate = rate;
    emit TaxRateUpdated(_msgSender(), rate);
    return true;
  }

  function batchUpdateTaxWhitelist(BatchUpdateTaxWhitelistRequest[] calldata request) external {
    for (uint256 i = 0; i < request.length; i++) {
      _updateTaxWhitelist(request[i].account, request[i].isDeleted);
    }
  }

  function updateTaxWhitelist(address account, bool isDeleted) external returns (bool) {
    return _updateTaxWhitelist(account, isDeleted);
  }

  function _updateTaxWhitelist(address account, bool isDeleted)
    internal
    safeModeCheck
    aclCheck(this.updateTaxWhitelist.selector)
    returns (bool)
  {
    require(account != address(0), "Invalid Account Address");
    if (isDeleted) {
      require(_taxWhitelist.contains(account), "Account Not Found");
      _taxWhitelist.remove(account);
    } else {
      require(!_taxWhitelist.contains(account), "Account Already Exists");
      _taxWhitelist.add(account);
    }

    emit TaxWhitelistUpdated(_msgSender(), account, isDeleted);
    return true;
  }

  function taxRate() external view returns (uint256) {
    return _taxRate;
  }

  function taxTreasury() external view returns (address) {
    return _taxTreasury;
  }

  function taxWhitelist() external view returns (address[] memory) {
    return _taxWhitelist.values();
  }

  function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool) {
    require(block.timestamp <= deadline, "Permit Expired Deadline");
    bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, value, _useNonce(owner), deadline));
    bytes32 hash = LECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
    address signer = LECDSA.recover(hash, signature);

    // console.log("singer address: %s, nonce: %d", signer, this.nonce(owner));

    require(signer == owner, "Illegal ECDASA Signature");

    _approve(owner, spender, value);
    return true;
  }

  function nonce(address owner) external view returns (uint256) {
    return _accounts[owner].nonce.current();
  }

  function _useNonce(address owner) internal returns (uint256 current) {
    LCounters.Counter storage localNonce = _accounts[owner].nonce;
    current = localNonce.current();
    localNonce.increment();
  }

  function name() external view returns (string memory) {
    return _name;
  }

  function symbol() external view returns (string memory) {
    return _symbol;
  }

  function decimals() external pure returns (uint8) {
    return 18;
  }

  function totalSupply() external view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) external view returns (uint256) {
    return _accounts[account].balance;
  }

  function allowance(address owner, address spender) external view returns (uint256) {
    return _allowance(owner, spender);
  }

  function approve(address spender, uint256 amount) external returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  function transfer(address recipient, uint256 amount) external returns (bool) {
    if (_taxRate > 0 && !_taxWhitelist.contains(_msgSender())) {
      _taxTransfer(_msgSender(), recipient, amount);
    } else {
      _transfer(_msgSender(), recipient, amount);
    }
    return true;
  }

  function transferFrom(
    address source,
    address recipient,
    uint256 amount
  ) external returns (bool) {
    return _transferFrom(source, recipient, amount);
  }

  function batchTransfer(BatchTransferRequest[] calldata request) external returns (bool) {
    for (uint256 i = 0; i < request.length; i++) {
      _transfer(_msgSender(), request[i].recipient, request[i].amount);
    }
    return true;
  }

  function batchTransferFrom(BatchTransferFromRequest[] calldata request) external returns (bool) {
    for (uint256 i = 0; i < request.length; i++) {
      _transferFrom(request[i].source, request[i].recipient, request[i].amount);
    }
    return true;
  }

  function increaseAllowance(address spender, uint256 amount) external returns (uint256) {
    address owner = _msgSender();
    uint256 currentAllowance = _allowance(owner, spender) + amount;
    _approve(owner, spender, currentAllowance);
    emit ApprovalIncremented(owner, spender, amount);
    return currentAllowance;
  }

  function decreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    address owner = _msgSender();
    _spendAllowance(owner, spender, amount);
    emit ApprovalDecresed(owner, spender, amount);
    return _allowance(owner, spender);
  }

  function mint(address account, uint256 amount)
    external
    safeModeCheck
    whenNotPaused
    whenAccountNotPaused(account)
    aclCheck(this.mint.selector)
    returns (uint256)
  {
    return _mint(account, amount);
  }

  function _mint(address account, uint256 amount) internal returns (uint256) {
    require(account != address(0), "Invalid Account Address");
    _totalSupply += amount;
    _accounts[account].balance += amount;
    emit Mint(_msgSender(), account, amount, _totalSupply);
    return _totalSupply;
  }

  function burn(address account, uint256 amount)
    external
    safeModeCheck
    whenNotPaused
    whenAccountNotPaused(account)
    aclCheck(this.burn.selector)
    returns (uint256)
  {
    require(account != address(0), "Invalid Account Address");
    uint256 accountBalance = _accounts[account].balance;
    require(accountBalance >= amount, "Insufficient Account Balance");
    unchecked {
      _accounts[account].balance = accountBalance - amount;
    }
    _totalSupply -= amount;
    emit Burn(_msgSender(), account, amount, _totalSupply);
    return _totalSupply;
  }

  function _transfer(
    address src,
    address dest,
    uint256 amount
  ) internal safeModeCheck whenNotPaused whenAccountNotPaused(src) aclCheck(this.transfer.selector) {
    require(src != address(0), "Invalid Source Address");
    require(dest != address(0), "Invalid Destination Address");
    require(src != dest, "Illegal Self Transfer");
    require(amount > 0, "Invalid Transfer Amount");

    uint256 srcBalance = _accounts[src].balance;
    require(srcBalance >= amount, "Insufficient Account Balance");
    unchecked {
      _accounts[src].balance = srcBalance - amount;
    }
    _accounts[dest].balance += amount;

    emit Transfer(src, dest, amount);
  }

  function _taxTransfer(
    address source,
    address recipient,
    uint256 amount
  ) internal {
    uint256 tax = amount.mulBP(_taxRate);
    uint256 tokensToTransfer = amount.sub(tax, "Insufficient Transfer Amount");

    _transfer(source, _taxTreasury, tax);
    _transfer(source, recipient, tokensToTransfer);
  }

  function _transferFrom(
    address source,
    address recipient,
    uint256 amount
  ) internal returns (bool) {
    address spender = _msgSender();
    if (_taxRate > 0 && !_taxWhitelist.contains(_msgSender())) {
      _taxTransfer(source, recipient, amount);
    } else {
      _transfer(source, recipient, amount);
    }
    _spendAllowance(source, spender, amount);

    emit TransferFrom(spender, source, recipient, amount);
    return true;
  }

  function _approve(
    address owner,
    address spender,
    uint256 amount
  ) internal safeModeCheck whenNotPaused whenAccountNotPaused(owner) aclCheck(this.approve.selector) {
    require(owner != address(0), "Invalid Owner Address");
    require(spender != address(0), "Invalid Spender Address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  function _spendAllowance(
    address owner,
    address spender,
    uint256 amount
  ) internal {
    uint256 currentAllowance = _allowance(owner, spender);
    require(currentAllowance >= amount, "Insufficient Account Allowance");
    unchecked {
      _approve(owner, spender, currentAllowance - amount);
    }
  }

  function _allowance(address owner, address spender) internal view returns (uint256) {
    return _allowances[owner][spender];
  }
}
