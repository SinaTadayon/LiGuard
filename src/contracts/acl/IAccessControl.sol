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

  function hasAccess(bytes32 contextId, address account, bytes32 functionId) external view returns (bool);

  function hasAccess(bytes32 contextId, bytes32 functionId) external view returns (bool);

  function hasAccess(address contractId, address account, bytes4 selector) external view returns (bool);

  function hasAccess(address contractId, bytes4 selector) external view returns (bool);

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


  // Role Master
  function isRoleExistedInRoleMasterType(bytes32 roleId) external view returns (bool);

  function isRoleExistedInRoleMasterType(string calldata roleName) external view returns (bool);

  function isAccountExistedInRoleMasterType(address account) external view returns (bool);

  function isMemberExistedInRoleMasterType(bytes32 memberId) external view returns (bool);


  // general
  function isAgentExisted(bytes32 agentId) external view returns (bool);

  function isScopeExisted(bytes32 scopeId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function getScopeOfAgent(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);

  function getAgentOfScope(bytes32 scopeId) external view returns (AgentType stype, bytes32 agentId);
}
