// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IERC20.sol";
import "./IERC20Extra.sol";
import "./IERC20Pause.sol";
import "./IERC20Lock.sol";
import "./LivelyStorage.sol";
import "../asset/IAssetEntity.sol";
import "../asset/IAssetManagerERC20.sol";
import "../asset/ERC20/IAssetERC20.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../lib/token/LTokenERC20.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/LCounters.sol";
import "../../lib/math/LBasisPointsMath.sol";
import "../../lib/math/LSafeMath.sol";
import "../../lib/struct/LEnumerableSet.sol";


/**
 * @title Lively ERC20 Token Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract LivelyToken is LivelyStorage, BaseUUPSProxy, IERC20, IERC20Extra, IERC20Pause, IERC20Lock {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LCounters for LCounters.Counter;
  using LBasisPointsMath for uint256;
  using LSafeMath for uint256;

  struct InitRequest {
    string contractName;
    string contractVersion;
    uint256 taxRateValue;
    address aclManager;
  }

  constructor() {}

  function lockToken(LockTokenRequest[] calldata lockRequest) external returns (bytes32[] memory) {
    _policyInterceptor(this.lockToken.selector, address(0), true, false);
    uint256 totalAmount = 0;
    bytes32[] memory lockIds = new bytes32[](lockRequest.length);
    for (uint256 i = 0; i < lockRequest.length; i++) {
      require(!_data.pausedList.contains(lockRequest[i].source), "Suspended");
      lockIds[i] = _lockToken(lockRequest[i]);
      totalAmount += lockRequest[i].amount;
    }

    return lockIds;
  }

  function claimToken(bytes32[] calldata lockIds) external returns (uint256) {
    _policyInterceptor(this.claimToken.selector, _msgSender(), true, true);
    uint256 totalAmount = 0;
    for (uint256 i = 0; i < lockIds.length; i++) {
      totalAmount += _claimToken(lockIds[i]);
    }

    return totalAmount;
  }

  function unlockToken(UnLockTokenRequest[] calldata unlockRequest) external returns (uint256) {
    _policyInterceptor(this.unlockToken.selector, address(0), true, false);
    uint256 totalAmount = 0;
    for (uint256 i = 0; i < unlockRequest.length; i++) {
      require(!_data.pausedList.contains(unlockRequest[i].account), "Suspended");
      totalAmount += _unlockToken(unlockRequest[i]);
    }

    return totalAmount;
  }

  function pause(address account) external {
    _policyInterceptor(this.pause.selector, address(0), false, false);
    require(account != address(0), "Illegal Address");
    require(!_data.pausedList.contains(account), "Already Paused");
    _data.pausedList.add(account);
    emit Paused(_msgSender(), account);
  }

  function unpause(address account) external {
    _policyInterceptor(this.unpause.selector, address(0), false, false);
    require(account != address(0), "Illegal Address");
    require(_data.pausedList.contains(account), "Not Found");
    _data.pausedList.remove(account);
    emit Unpaused(_msgSender(), account);
  }

  function pauseAll() external {
    _policyInterceptor(this.pauseAll.selector, address(0), false, false);
    _isPaused = true;
    emit PausedAll(_msgSender());
  }

  function unpauseAll() external {
    _policyInterceptor(this.unpauseAll.selector, address(0), false, false);
    _isPaused = false;
    emit UnpausedAll(_msgSender());
  }

  function updateTaxRate(uint256 rate) external returns (bool) {
    _policyInterceptor(this.updateTaxRate.selector, address(0), false, false);
    _taxRate = rate;
    emit TaxRateUpdated(_msgSender(), rate);
    return true;
  }

  function updateTaxWhitelist(TaxWhitelistUpdateRequest[] calldata request) external returns(bool) {
    _policyInterceptor(this.updateTaxWhitelist.selector, address(0), false, false);
    for (uint256 i = 0; i < request.length; i++) {
      _updateTaxWhitelist(request[i].account, request[i].isDeleted);
    }
    return true;
  }

  // function updateTaxWhitelist(address account, bool isDeleted) external returns (bool) {
  //   _policyInterceptor(this.updateTaxWhitelist.selector, address(0), false, false);
  //   return _updateTaxWhitelist(account, isDeleted);
  // }

  function transfer(address recipient, uint256 amount) external returns (bool) {
    _policyInterceptor(this.transfer.selector, _msgSender(), true, true);
    if (_taxRate > 0 && !_data.taxWhitelist.contains(_msgSender())) {
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
    _policyInterceptor(this.transferFrom.selector, source, true, true);
    return _transferFrom(source, recipient, amount);
  }

  function batchTransfer(BatchTransferRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.batchTransfer.selector, _msgSender(), true, true);
    uint256 totalAmount = 0;
    for (uint256 i = 0; i < request.length; i++) {
      totalAmount += request[i].amount;
      _transfer(_msgSender(), request[i].to, request[i].amount);
    }

    emit BatchTransfer(_msgSender(), totalAmount);
    return true;
  }

  function batchTransferFrom(BatchTransferFromRequest[] calldata request) external returns (bool) {
    _policyInterceptor(this.batchTransferFrom.selector, address(0), true, false);
    uint256 totalAmount = 0;
    for (uint256 i = 0; i < request.length; i++) {
      require(!_data.pausedList.contains(request[i].from), "Suspended");
      totalAmount += request[i].amount;
      _transferFrom(request[i].from, request[i].to, request[i].amount);
    }

    emit BatchTransferFrom(_msgSender(), totalAmount);
    return true;
  }

  function approve(address spender, uint256 amount) external returns (bool) {
    _policyInterceptor(this.approve.selector, _msgSender(), true, true);
    _approve(_msgSender(), spender, amount);
    return true;
  }

  function increaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.increaseAllowance.selector, _msgSender(), true, true);
    address owner = _msgSender();
    uint256 currentAllowance = _allowance(owner, spender) + amount;
    _approve(owner, spender, currentAllowance);
    emit ApprovalIncreased(owner, spender, amount);
    return currentAllowance;
  }

  function decreaseAllowance(address spender, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.decreaseAllowance.selector, _msgSender(), true, true);
    address owner = _msgSender();
    _spendAllowance(owner, spender, amount);
    emit ApprovalDecreased(owner, spender, amount);
    return _allowance(owner, spender);
  }

  function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) external returns (bool) {
    _policyInterceptor(this.permit.selector, owner, true, true);
    require(block.timestamp <= deadline, "Expired");
    bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, value, _useNonce(owner), deadline));
    bytes32 hash = LECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
    address signer = LECDSA.recover(hash, signature);

    require(signer == owner, "Illegal Signature");
    _approve(owner, spender, value);
    return true;
  }

  function mint(address account, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.mint.selector, account, true, true);
    return _mint(account, amount);
  }

  function burn(address account, uint256 amount) external returns (uint256) {
    _policyInterceptor(this.burn.selector, account, true, true);
    require(account != address(0), "Illegal Address");
    uint256 accountBalance = _data.accounts[account].balance;
    require(accountBalance >= amount, "Illegal Balance");
    unchecked {
      _data.accounts[account].balance = accountBalance - amount;
    }
    _totalSupply -= amount;
    emit Burn(_msgSender(), account, amount, _totalSupply);
    return _totalSupply;
  }

  function name() external view returns (string memory) {
    return _name;
  }

  function symbol() external view returns (string memory) {
    return _symbol;
  }

  function totalSupply() external view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) external view returns (uint256) {
    return _data.accounts[account].balance;
  }

  function totalBalanceOf(address account) external view returns (uint256) {
    return _data.accounts[account].lockBalance + _data.accounts[account].balance;
  }

  function lockBalanceOf(address account) external view returns (uint256) {
    return _data.accounts[account].lockBalance;
  }

  function allowance(address owner, address spender) external view returns (uint256) {
    return _allowance(owner, spender);
  }

  function taxRate() external view returns (uint256) {
    return _taxRate;
  }

  function taxTreasury() external view returns (address) {
    return _taxTreasury;
  }

  function taxWhitelist() external view returns (address[] memory) {
    return _data.taxWhitelist.values();
  }

  function nonce(address owner) external view returns (uint256) {
    return _data.accounts[owner].nonce.current();
  }

  function isPaused(address account) external view returns (bool) {
    return account != address(0) && _data.pausedList.contains(account);
  }

  function isPausedAll() external view returns (bool) {
    return _isPaused;
  }

  function pausedAccounts() external view returns (address[] memory) {
    return _data.pausedList.values();
  }

  function lockInfo(bytes32 lockId, address account) external view returns (LockInfo memory) {
    AssetLock storage lock = _data.locks[account][lockId];
    return LockInfo({
      amount: lock.amount, 
      lockedAt: lock.lockedAt, 
      claimedAt: lock.claimedAt, 
      source: lock.source, 
      stat: lock.status
    });
  }

  function decimals() external pure returns (uint8) {
    return 18;
  }

  function initialize(InitRequest calldata request) public onlyProxy onlyLocalAdmin initializer {
    // bytes32 realm = keccak256(abi.encodePacked(request.domainRealm));
    __BASE_UUPS_init(request.contractName, request.contractVersion, request.aclManager);

    _name = "LIVELY";
    _symbol = "LVL";
    _taxRate = request.taxRateValue;
    _isTokenDistributed = false;
    // _initContext(request.domainName, request.domainVersion, realm, request.signature);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      request.contractName,
      request.contractVersion,
      _getInitializedCount()
    );
  }

  function _tokensDistributionValidation(address account) private view {
    require(_data.accounts[account].balance == 0, "AssetId Already Distributed");
  }

  function tokensDistribution(address assetManager, address[7] calldata assets)
    public
    safeModeCheck
    aclCheck(this.tokensDistribution.selector)
    returns (bool)
  {
    require(!_isTokenDistributed, "Token Already Distributed");

    if(!IERC165(assetManager).supportsInterface(type(IAssetManagerERC20).interfaceId))
      revert("Illegal IAssetManagerERC20");

    _mint(assetManager, 5_000_000_000 * 10**18); // 5 billion tokens according to tokenomics

    for (uint256 i = 0; i < 7; i++) {
      if(!IERC165(assets[i]).supportsInterface(type(IAssetEntity).interfaceId))
        revert("Illegal IAssetEntity");

      require(IAssetEntity(assets[i]).assetToken() == address(this), "Illegal Asset Token");
      if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_AUDIO_VIDEO_PROGRAM_ASSET"))) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 500_000_000 * 10**18); // 10%
      } else if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_FOUNDING_TEAM_ASSET"))) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 900_000_000 * 10**18); // 18%
      } else if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_TREASURY_ASSET"))) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 750_000_000 * 10**18); // 15%
      } else if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_PUBLIC_SALE_ASSET"))) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 2_000_000_000 * 10**18); // 40%
      } else if (
        keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_VALIDATORS_REWARDS_ASSET"))
      ) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 300_000_000 * 10**18); // 6%
      } else if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_CROWD_FOUNDING_ASSET"))) {
        _tokensDistributionValidation(assets[i]);
        _transfer(_msgSender(), assets[i], 550_000_000 * 10**18); // 11%
      } else if (keccak256(abi.encodePacked(IAssetEntity(assets[i]).assetName())) == keccak256(abi.encodePacked("LIVELY_TAX_TREASURY_ASSET"))) {
        require(_taxTreasury == address(0), "TaxTreasury Already Registered");
        _taxTreasury = assets[i];
      } else {
        revert("Not Supported");
      }
    }

    _isTokenDistributed = true;
    return true;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IERC20).interfaceId ||
      interfaceId == type(IERC20Extra).interfaceId ||
      interfaceId == type(IERC20Pause).interfaceId ||
      interfaceId == type(IERC20Lock).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function getLibrary() public pure returns (address) {
    return address(LTokenERC20);
  }

  // function _initContext(
  //   string calldata domainName,
  //   string calldata domainVersion,
  //   bytes32 realm,
  //   bytes calldata signature
  // ) internal {
  //   (IContextManagement.RequestContext memory rc, IContextManagement.RequestRegisterContext[] memory rrc) = LTokenERC20
  //     .createRequestContext(_domainName, _domainVersion, _domainRealm);

  //   IContextManagement(_accessControlManager).registerContext(signature, rc, rrc);

  //   emit Initialized(
  //     _msgSender(),
  //     address(this),
  //     _implementation(),
  //     domainName,
  //     domainVersion,
  //     realm,
  //     _getInitializedCount()
  //   );
  // }

  function _updateTaxWhitelist(address account, bool isDeleted) internal returns (bool) {
    emit TaxWhitelistUpdated(_msgSender(), account, isDeleted);
    return LTokenERC20.updateTaxWhitelist(_data, account, isDeleted);
  }

  function _mint(address account, uint256 amount) internal returns (uint256) {
    require(account != address(0), "Illegal Address");
    _totalSupply += amount;
    _data.accounts[account].balance += amount;
    emit Mint(_msgSender(), account, amount, _totalSupply);
    return _totalSupply;
  }

  function _transfer(
    address src,
    address dest,
    uint256 amount
  ) internal {
    LTokenERC20.transfer(_data, src, dest, amount);
    emit Transfer(src, dest, amount);
  }

  function _taxTransfer(
    address source,
    address recipient,
    uint256 amount
  ) internal {
    uint256 tax = amount.mulBP(_taxRate);
    uint256 tokensToTransfer = amount.sub(tax, "Illegal Amount");

    _transfer(source, _taxTreasury, tax);
    _transfer(source, recipient, tokensToTransfer);
  }

  function _transferFrom(
    address source,
    address recipient,
    uint256 amount
  ) internal returns (bool) {
    address spender = _msgSender();
    if (_taxRate > 0 && !_data.taxWhitelist.contains(_msgSender())) {
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
  ) internal {
    require(owner != address(0) && spender != address(0), "Illegal Address");
    _data.allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  function _spendAllowance(
    address owner,
    address spender,
    uint256 amount
  ) internal {
    uint256 currentAllowance = _allowance(owner, spender);
    require(currentAllowance >= amount, "Illegal Allowance");
    unchecked {
      _approve(owner, spender, currentAllowance - amount);
    }
  }

  function _useNonce(address owner) internal returns (uint256 current) {
    LCounters.Counter storage localNonce = _data.accounts[owner].nonce;
    current = localNonce.current();
    localNonce.increment();
  }

  function _lockToken(LockTokenRequest calldata lockRequest) internal returns (bytes32) {
    bytes32 lockId = LTokenERC20.lockToken(_data, lockRequest);
    emit TokenLocked(
      lockId,
      _msgSender(),
      lockRequest.source,
      lockRequest.dest,
      lockRequest.timestamp,
      lockRequest.amount
    );
    return lockId;
  }

  function _claimToken(bytes32 lockId) internal returns (uint256) {
    uint256 lockAmount = LTokenERC20.claimToken(_data, lockId);
    emit TokenClaimed(lockId, _msgSender(), _data.locks[_msgSender()][lockId].source, lockAmount);
    return lockAmount;
  }

  function _unlockToken(UnLockTokenRequest calldata unlockRequest) internal returns (uint256) {
    (address srcAccount, uint256 lockAmount) = LTokenERC20.unlockToken(_data, unlockRequest);
    emit TokenUnlocked(
      unlockRequest.lockId,
      _msgSender(),
      unlockRequest.account,
      srcAccount,
      lockAmount,
      unlockRequest.reason
    );
    return lockAmount;
  }

  function _allowance(address owner, address spender) internal view returns (uint256) {
    return _data.allowances[owner][spender];
  }

  function _policyInterceptor(
    bytes4 funcSelector,
    address account,
    bool isCheckingTokenPaused,
    bool isCheckingAccountPaused
  ) private safeModeCheck aclCheck(funcSelector) {
    if (isCheckingTokenPaused) {
      require(!_isPaused, "Token Paused");
    }

    if (isCheckingAccountPaused) {
      require(!_data.pausedList.contains(account), "Suspended");
    }
  }
}
