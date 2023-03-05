// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Access Control General Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileACLGenerals is IACLCommons {
  // Anonymouse type
  function profileAnonymousType() external pure returns (bytes32);

  // Any type
  function profileAnyType() external pure returns (bytes32);

  // system master type
  function profileSystemMasterType() external pure returns (bytes32);

  // profile master type
  function profileMasterType() external pure returns (bytes32);

  // Universe Scope
  function profileUniverseScope() external pure returns (bytes32);

  // general
  function profileIsAgentExist(bytes32 profileId, bytes32 agentId) external view returns (bool);

  function profileIsScopeExist(bytes32 profileId, bytes32 scopeId) external view returns (bool);

  function profileScopeBaseInfo(bytes32 profileId, bytes32 scopeId) external view returns (BaseScope memory);

  function profileAgentBaseInfo(bytes32 profileId, bytes32 agentId) external view returns (BaseAgent memory);

  function profileIsScopesCompatible(
    bytes32 profileId,
    bytes32 destScopeId,
    bytes32 srcScopeId
  ) external view returns (bool);
}
