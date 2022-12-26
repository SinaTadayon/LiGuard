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

   // Request Types
  struct FacetSelectorUpgradeRequest {
    ActionType action;
    bytes4[] selectors;
  }

  struct FacetUpgradeRequest {
    address facetId;
    address subjectId;
    bytes4 interfaceId;
    FacetSelectorUpgradeRequest[] functions;
  }

  struct FacetRegisterRequest {
    address facetId;
    address subjectId;
    bytes4 interfaceId;
    bytes4[] selectors;
  }

  event ACLFacetRegistered(
    address indexed sender, 
    address indexed facetId, 
    address indexed subjectId, 
    bytes4 interfaceId
  );

  // event ACLFacetFunctionRegistered (
  //   address indexed sender, 
  //   address indexed facetId, 
  //   bytes4 selector
  // );

  event ACLFacetUpgraded(
    address indexed sender, 
    address indexed facetId, 
    address indexed subjectId,
    bytes4 interfaceId
  );

  event ACLFacetFunctionUpgraded(
    address indexed sender, 
    address indexed facetId, 
    bytes4 selector,
    ActionType action
  );

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external returns (bool);

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) external returns (bool);

  function aclGetFacets() external view returns (address[] memory);
}