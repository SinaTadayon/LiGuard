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

  function hasMemberAccess(bytes32 memberId, bytes32 functionId) external view returns (bool);

  function hasCSAccess(address contractId, bytes4 selector) external view returns (bool);
  
  function hasCSMAccess(address contractId, bytes4 selector, bytes32 memberId) external view returns (bool);

  
  // Anonymouse type
  function getAnonymouseType() external pure returns (bytes32);

  // Any type
  function getAnyType() external pure returns (bytes32);

  // scope admin type
  function getScopeMasterType() external pure returns (bytes32);

  // role admin type
  function getAgentMasterType() external pure returns (bytes32);

  
  // super admin type
  // function isAgentExistedInSuperAdminType(bytes32 agentId) external view returns (bool);
  // function getScopeAgentOfSuperAdminType(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);
  function getSystemAdminType() external pure returns (bytes32);

  // system admin type
  // function isAgentExistedInSystemAdminType(bytes32 agentId) external view returns (bool);
  // function getScopeAgentOfSystemAdminType(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);
  function getAdminType() external pure returns (bytes32);


  // // Scope Master
  // // function isAgentExistedInScopeMasterType(bytes32 agentId) external view returns (bool);
  // // function getScopeAgentOfScopeMasterType(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);
  // function getScopeMasterTypeId() external view returns (bytes32);


  // // Agent Master
  // // function isAgentExistedInAgentMasterType(bytes32 agentId) external view returns (bool);
  // // function getScopeAgentOfAgentMasterType(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);
  // function getAgentMasterTypeId() external view returns (bytes32);

  // Policy Master
  // function isAgentExistedInPolicyMasterType(address account) external view returns (bool);
  // function getScopeAgentOfPolicyMasterType(bytes32 agentId) external view returns (ScopeType, bytes32);
  function getPolicyMasterType() external view returns (bytes32);


  // general
  function isAgentExist(bytes32 agentId) external view returns (bool);

  function isScopeExist(bytes32 scopeId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function isScopesCompatible(bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool);  
}
