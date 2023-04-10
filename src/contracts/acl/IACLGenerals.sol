// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./IACLCommons.sol";

/**
 * @title Access Control Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IACLGenerals is IACLCommons {
  // // Anonymouse type
  // function getAnonymousType() external pure returns (bytes32);

  // // Any type
  // function getAnyType() external pure returns (bytes32);

  // // scope master type
  // function getScopeMasterType() external pure returns (bytes32);

  // // type master type
  // function getTypeMasterType() external pure returns (bytes32);

  // // member master type
  // function getMemberMasterType() external pure returns (bytes32);

  // // system master type
  // function getSystemMasterType() external pure returns (bytes32);

  // // lively master type
  // function getLivelyMasterType() external pure returns (bytes32);

  // // Policy Master type
  // function getPolicyMasterType() external pure returns (bytes32);

  // // Profile Master type
  // function getProfileMasterType() external pure returns (bytes32);

  // // Universe Scope
  // function getUniverseScope() external pure returns (bytes32);

  // general
  function isAgentExist(bytes32 agentId) external view returns (bool);

  function isScopeExist(bytes32 scopeId) external view returns (bool);

  function isProfileExist(bytes32 profileId) external view returns (bool);

  function isPolicyExist(bytes32 policyId) external view returns (bool);

  function getScopeBaseInfo(bytes32 scopeId) external view returns (BaseScope memory);

  function getAgentBaseInfo(bytes32 agentId) external view returns (BaseAgent memory);

  function checkScopesCompatibility(bytes32 destScopeId, bytes32 srcScopeId) external view returns (bool);
}
