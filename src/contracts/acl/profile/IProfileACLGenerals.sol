// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileACLGenerals is IACLCommons { 
  
  // Anonymouse type
  function getProfileAnonymousType() external pure returns (bytes32);

  // Any type
  function getProfileAnyType() external pure returns (bytes32);

  // system master type
  function getProfileSystemMasterType() external pure returns (bytes32);

  // profile master type
  function getProfileMasterType() external pure returns (bytes32);

  // Global Scope
  function getProfileGlobalScope() external pure returns (bytes32);

  // profile master type
  function getProfileMaster() external pure returns (bytes32);

  // system system master
  function getProfileSystemMaster() external pure returns (bytes32);

  
  // general
  function isProfileAgentExist(bytes32 profileId, bytes32 agentId) external view returns (bool);

  function isProfileScopeExist(bytes32 profileId, bytes32 scopeId) external view returns (bool);

  function getProfileScopeBaseInfo(bytes32 profileId, bytes32 scopeId) external view returns (BaseScope memory);

  function getProfileAgentBaseInfo(bytes32 profileId, bytes32 agentId) external view returns (BaseAgent memory);

  function isProfileScopesCompatible(bytes32 profileId, bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool);  

}
