// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IAgentCommons is IAclCommons {
  event AgentActivityUpdated(address indexed sender, bytes32 indexed agentId, ActivityStatus acstat, AgentType atype);

  event AgentAlterabilityUpdated(address indexed sender, bytes32 indexed agnetId, AlterabilityStatus alstat, AgentType atype);

  // event AgentAdminUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed adminId, AgentType atype);

  event AgentReferredByScopeUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed scopeId, uint16 total, AgentType atype, ActionType action);

  event AgentReferredByPolicyUpdated(address indexed sender, bytes32 indexed agentId, bytes32 indexed policyId, uint16 total, AgentType atype, ActionType action);

  function agentEnableActivity(bytes32[] calldata requests) external returns (bool);

  function agentDeleteActivity(bytes32[] calldata requests) external returns (bool);

  function agentDisableActivity(bytes32[] calldata requests) external returns (bool);

  function agentSafeModeActivity(bytes32[] calldata requests) external returns (bool);

  function agentDisableAlterability(bytes32[] calldata requests) external returns (bool);

  function agentUpdateableAlterability(bytes32[] calldata requests) external returns (bool);

  function agentUpgradableAlterability(bytes32[] calldata requests) external returns (bool);

  function agentUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function agentUpdateReferredByScope(UpdateReferredByRequest[] calldata requests) external returns (bool);

  function agentUpdateReferredByPolicy(UpdateReferredByRequest[] calldata requests) external returns (bool);

}