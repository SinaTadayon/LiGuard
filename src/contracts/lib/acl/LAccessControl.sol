// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/IACLManager.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";




/**
 * @title Access Control Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LAccessControl {
  // using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  string public constant LIB_NAME = "LAccessControl";
  string public constant LIB_VERSION = "3.0.0";

   
  function registerProxyFacet(ACLStorage.DataCollection storage data, address implementation) external {
    data.facets.add(implementation);
    data.selectors[IProxy.upgradeTo.selector] = implementation;
    data.selectors[IProxy.setSafeModeStatus.selector] = implementation;
    data.selectors[IProxy.setUpgradabilityStatus.selector] = implementation;
    data.selectors[IProxy.setLocalAdmin.selector] = implementation;
    data.selectors[IProxy.setAccessControlManager.selector] = implementation;
    data.selectors[IProxy.contractName.selector] = implementation;
    data.selectors[IProxy.contractVersion.selector] = implementation;
    data.selectors[IProxy.accessControlManager.selector] = implementation;
    data.selectors[IProxy.subjectAddress.selector] = implementation;
    data.selectors[IProxy.safeModeStatus.selector] = implementation;
    data.selectors[IProxy.upgradabilityStatus.selector] = implementation;
    data.selectors[IProxy.localAdmin.selector] = implementation;
    data.selectors[IProxy.domainSeparator.selector] = implementation;
    data.selectors[IProxy.initVersion.selector] = implementation;
    data.selectors[IProxy.proxyInfo.selector] = implementation;
    data.selectors[IProxy.withdrawBalance.selector] = implementation;
    data.selectors[IERC165.supportsInterface.selector] = implementation;
    data.selectors[IACLManager.aclRegisterFacet.selector] = implementation;
    data.selectors[IACLManager.aclUpgradeFacet.selector] = implementation;
    data.selectors[IACLManager.aclGetFacets.selector] = implementation;
    data.selectors[IERC1822Proxiable.proxiableUUID.selector] = implementation;    
    data.selectors[bytes4(keccak256(abi.encodePacked("initialize(string,string)")))] = implementation;
    data.selectors[bytes4(keccak256(abi.encodePacked("initACL(address,address)")))] = implementation;
    data.selectors[bytes4(keccak256(abi.encodePacked("getLibrary()")))] = implementation;    
  }
}
