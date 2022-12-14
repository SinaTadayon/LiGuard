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

  function hasCAFAccess(bytes32 contextId, address account, bytes32 functionId) external view returns (bool);

  function hasCFAccess(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function hasCASAccess(address contractId, address account, bytes4 selector) external view returns (bool);

  function hasCSAccess(address contractId, bytes4 selector) external view returns (bool);

  function getSuperGroup() external view returns (bytes32);

  function getSystemAdminType() external view returns (bytes32);

  function getSuperAdminType() external view returns (bytes32);

  function getAnonymouseType() external view returns (bytes32);

  function getAnyType() external view returns (bytes32);

  // scope admin type
  function getScopeMasterType() external view returns (bytes32);

  // role admin type
  function getRoleMasterType() external view returns (bytes32);

  
  // super admin type
  function isRoleExistedInSuperAdminType(string calldata roleName) external view returns (bool);

  function isRoleExistedInSuperAdminType(bytes32 roleId) external view returns (bool);

  function isAccountExistedInSuperAdminType(address account) external view returns (bool);

  function isMemberExistedInSuperAdminType(bytes32 memberId) external view returns (bool);
  

  // system admin type
  function isRoleExistedInSystemAdminType(bytes32 roleId) external view returns (bool);

  function isRoleExistedInSystemAdminType(string calldata roleName) external view returns (bool);

  function isAccountExistedInSystemAdminType(address account) external view returns (bool);

  function isMemberExistedInSystemAdminType(bytes32 memberId) external view returns (bool);

  // super group
  function isTypeExistedInSuperGroup(bytes32 typeId) external view returns (bool);

  function isTypeExistedInSuperGroup(string calldata typeName) external view returns (bool);


  // Scope Master
  function isRoleExistedInScopeMasterType(bytes32 roleId) external view returns (bool);

  function isRoleExistedInScopeMasterType(string calldata roleName) external view returns (bool);

  function isAccountExistedInScopeMasterType(address account) external view returns (bool);

  function isMemberExistedInScopeMasterType(bytes32 memberId) external view returns (bool);

  function getScopeMasterTypeId() external view returns (bytes32);


  // Agent Master
  function isRoleExistedInAgentMasterType(bytes32 roleId) external view returns (bool);

  function isAccountExistedInAgentMasterType(address account) external view returns (bool);

  function isMemberExistedInAgentMasterType(bytes32 memberId) external view returns (bool);

  function getAgentMasterTypeId() external view returns (bytes32);

  function getRoleAccountOfAgentMasterType(address account) external view returns (bytes32);

  function getScopeAccountOfAgentMasterType(address account) external view returns (ScopeType stype, bytes32 scopeId);


  // general
  function isAgentExisted(bytes32 agentId) external view returns (bool);

  function isScopeExisted(bytes32 scopeId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function getScopeOfAgent(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);

  function getAgentOfScope(bytes32 scopeId) external view returns (AgentType stype, bytes32 agentId);

  function isScopeExistedInAnotherScope(bytes32 baseScopeId, bytes32 targetScopeId) external view returns (bool);
}
