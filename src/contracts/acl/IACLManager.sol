// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IACLCommons.sol";

/**
 * @title Access Control Manager Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IACLManager is IACLCommons {

  event AclFacetRegistered(address indexed sender, address indexed facetId, bytes4 interfaceId);

  event AclFacetUpgraded(
    address indexed sender, 
    address indexed facetId, 
    bytes4 interfaceId,
    bytes4 newInterfaceId
  );

  event AclFacetFunctionUpgraded(
    address indexed sender, 
    address indexed facetId, 
    bytes4 selector,
    ActionType action
  );

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external returns (bool);

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) external returns (bool);

  function aclGetFacets() external view returns (address[] memory);
}