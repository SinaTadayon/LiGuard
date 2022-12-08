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

  // function hasAccess(
  //   bytes32 contextId,
  //   address account,
  //   bytes4 selector
  // ) external view returns (bool);


  function hasAccess(
    bytes32 contextId,
    address account,
    bytes32 functionId
  ) external view returns (bool);

  // // TODO implement called by contract
  // function hasAccess(
  //   bytes32 contextId,
  //   bytes4 selector
  // ) external view returns (bool);


  // TODO implement called by contract
  function hasAccess(
    bytes32 contextId,
    bytes32 functionId
  ) external view returns (bool);


  // TODO refactor it (for general call) 
  function hasAccess(
    address contractId,
    address account,
    bytes4 selector
  ) external view returns (bool);

  // TODO implement called by contract
  function hasAccess(
    address contractId,
    bytes4 selector
  ) external view returns (bool);

  function getSuperGroup() external view returns (bytes32);

  function getSystemAdminType() external view returns (bytes32);

  function getSuperAdminType() external view returns (bytes32);

  function getAnonymouseType() external view returns (bytes32);

  function getAnyType() external view returns (bytes32);

  function isRoleExistedInSuperAdminType(string calldata roleName) external view returns (bool);

  function isRoleExistedInSuperAdminType(bytes32 roleId) external view returns (bool);

  function isAccountExistedInSuperAdminType(address account) external view returns (bool);

  function isAccountExistedInSuperAdminType(bytes32 memberId) external view returns (bool);

  function isRoleExistedInSystemAdminType(bytes32 roleId) external view returns (bool);

  function isRoleExistedInSystemAdminType(string calldata roleName) external view returns (bool);

  function isAccountExistedInSystemAdminType(address account) external view returns (bool);

  function isAccountExistedInSystemAdminType(bytes32 memberId) external view returns (bool);

  function isTypeExistedInSuperGroup(bytes32 typeId) external view returns (bool);

  function isTypeExistedInSuperGroup(string calldata typeName) external view returns (bool);

  function isAdminOfRoleExistedInSuperAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfRoleExistedInSystemAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfFunctionExistedInSuperAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfFunctionExistedInSystemAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfContextExistedInSuperAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfRealmExistedInSuperAdminType(bytes32 agentId) external view returns (bool);

  function isAdminOfDomainExistedInSuperAdminType(bytes32 agentId) external view returns (bool);

  // function getAgentType(bytes32 agentId) external view returns (AgentType);

  // function getScopeType(bytes32 scopeId) external view returns (ScopeType);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function getScopeOfAgent(bytes32 agentId) external view returns (ScopeType stype, bytes32 scopeId);

  function getAgentOfScope(bytes32 scopeId) external view returns (AgentType stype, bytes32 agentId);






  // function isLivelyGeneralGroup(bytes32 role) external view returns (bool);

  // function isContextSafeMode(bytes32 context) external view returns (bool);

  // function isContextUpgradable(bytes32 context) external view returns (bool);

  // function isContextExists(bytes32 context) external view returns (bool);

  // function isContextFunctionExists(bytes32 context, bytes4 functionSelector) external view returns (bool);

  // function isContextFunctionEnabled(bytes32 context, bytes4 functionSelector) external view returns (bool);

  // function isContextEnabled(bytes32 context) external view returns (bool);

  // function isGroupExists(bytes32 group) external view returns (bool);

  // function isGroupEnabled(bytes32 group) external view returns (bool);

  // function isRoleExists(bytes32 role) external view returns (bool);

  // function isRoleEnabled(bytes32 role) external view returns (bool);

  // function isRealmExists(bytes32 realm) external view returns (bool);

  // function isRealmEnabled(bytes32 realm) external view returns (bool);

  // function isRealmUpgradable(bytes32 realm) external view returns (bool);
}
