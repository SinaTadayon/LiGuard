// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IACLCommons.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAccessControl is IACLCommons {
  /**
   * @dev Function called by apps to check ACL
   * @return boolean indicating whether the ACL allows
   */
  function hasAccess(bytes32 functionId) external view returns (bool);

  function hasMemberAccess(bytes32 functionId, bytes32 memberId) external view returns (bool);

  function hasCSAccess(address contractId, bytes4 selector) external view returns (bool);
  
  function hasCSMAccess(address contractId, bytes4 selector, bytes32 memberId) external view returns (bool);

  function hasAccessToAgent(bytes32 agentId, bytes32 functionId) external view returns (bool);

  function hasMemberAccessToAgent(bytes32 agentId, bytes32 functionId, bytes32 memberId) external view returns (bool);

  function hasCSAccessToAgent(bytes32 agentId, address contractId, bytes4 selector) external view returns (bool);
  
  function hasCSMAccessToAgent(bytes32 agentId, address contractId, bytes4 selector, bytes32 memberId) external view returns (bool);

  
  // Anonymouse type
  function getAnonymouseType() external pure returns (bytes32);

  // Any type
  function getAnyType() external pure returns (bytes32);

  // scope master type
  function getScopeMasterType() external pure returns (bytes32);

  // agent master type
  function getAgentMasterType() external pure returns (bytes32);
  
  // system master type
  function getSystemMasterType() external pure returns (bytes32);

  // lively master type
  function getLivelyMasterType() external pure returns (bytes32);

  // Policy Master type
  function getPolicyMasterType() external pure returns (bytes32);

  // Global Scope
  function getGlobalScope() external pure returns (bytes32);


  // lively master admin role
  function getLivelyMasterAdminRole() external pure returns (bytes32);

  // scope master admin role
  function getScopeMasterAdminRole() external pure returns (bytes32);

  // agent master admin role
  function getAgentMasterAdminRole() external pure returns (bytes32);
  
  // system master admin role
  function getSystemMasterAdminRole() external pure returns (bytes32);

  // Policy Master admin role
  function getPolicyMasterAdminRole() external pure returns (bytes32);


  // general
  function isAgentExist(bytes32 agentId) external view returns (bool);

  function isScopeExist(bytes32 scopeId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function isScopesCompatible(bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool);  
}
