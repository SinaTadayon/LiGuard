// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Abstract Base UUPS Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
abstract contract BaseUUPSStorage {
  // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1
  bytes32 internal constant _ROLLBACK_SLOT = 0x4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd9143;

  /**
   * @dev Storage slot with the address of the current implementation.
   * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
   * validated in the constructor.
   */
  bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

  /**
   * @dev The storage slot of the UpgradeableBeacon contract which defines the implementation for this proxy.
   * This is bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)) and is validated in the constructor.
   */
  bytes32 internal constant _BEACON_SLOT = 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50;

  /**
   * @dev Storage slot with the admin of the contract.
   * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
   * validated in the constructor.
   */
  bytes32 internal constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

  bytes32 internal constant _TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

  address internal immutable __self = address(this);

  bytes32 internal _domainName;
  bytes32 internal _domainVersion;
  bytes32 internal _domainRealm;
  address internal _accessControlManager;
  bool internal _isSafeMode;
  bool internal _isUpgradable;

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   */
  uint256[64] private __reserved;
}
