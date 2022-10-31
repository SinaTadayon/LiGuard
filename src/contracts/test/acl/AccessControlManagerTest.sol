// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "./AccessControlStorageTest.sol";
import "../../acl/IAccessControl.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRealmManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IContextManagement.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/struct/LEnumerableMap.sol";
import "../../lib/acl/LContextManagement.sol";
import "../../lib/acl/LRoleManagement.sol";
import "../../lib/acl/LGroupManagement.sol";
import "../../lib/acl/LRealmManagement.sol";
import "../../lib/acl/LAccessControl.sol";
import "../../proxy/Initializable.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Test
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AccessControlManagerTest is AccessControlStorageTest, BaseUUPSProxy {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableMap for LEnumerableMap.Bytes32ToBytes32Map;
  using LEnumerableMap for LEnumerableMap.AddressToUintMap;

  constructor() {}

  function initialize() public onlyProxy reinitializer(2) {
    _data.dummy_1 = 100;
    dummy_2 = keccak256("UPDATE_TEST");
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
      interfaceId == type(IAccessControl).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
      interfaceId == type(IRoleManagement).interfaceId ||
      interfaceId == type(IGroupManagement).interfaceId ||
      interfaceId == type(IRealmManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
