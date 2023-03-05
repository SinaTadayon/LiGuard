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
    FacetSelectorUpgradeRequest[] functions;
  }

  struct FacetRegisterRequest {
    address facetId;
    address subjectId;
    bytes4[] selectors;
  }

  struct FacetInfo {
    address subjectId;
  }

  event ACLFacetRegistered(address indexed sender, address indexed facetId, address indexed subjectId);

  event ACLFacetUpgraded(address indexed sender, address indexed facetId, address indexed subjectId);

  event ACLFacetFunctionUpgraded(address indexed sender, address indexed facetId, bytes4 selector, ActionType action);

  event ACLInitialized(
    address indexed sender,
    address indexed admin,
    address indexed systemAdmin,
    address contextManager,
    address functionManager
  );

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external returns (bool);

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) external returns (bool);

  function aclGetFacets() external view returns (address[] memory);

  function aclGetFacet(bytes4 selector) external view returns (address);

  function aclHasSelector(bytes4 selector) external view returns (bool);

  function aclGetFacetInfo(address facetId) external view returns (FacetInfo memory);
}
