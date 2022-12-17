// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "./IAclCommons.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAccessControl is IAclCommons {
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

  // scope admin type
  function getScopeMasterType() external pure returns (bytes32);

  // role admin type
  function getAgentMasterType() external pure returns (bytes32);
  
  // super admin type
  function getSystemAdminType() external pure returns (bytes32);

  // system admin type
  function getAdminType() external pure returns (bytes32);

  // Policy Master
  function getPolicyMasterType() external view returns (bytes32);


  // general
  function isAgentExist(bytes32 agentId) external view returns (bool);

  function isScopeExist(bytes32 scopeId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function isScopesCompatible(bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool);  
}
