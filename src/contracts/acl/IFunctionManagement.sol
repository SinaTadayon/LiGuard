// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;


import "./IAclCommons.sol";

/**
 * @title Function Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IFunctionManagement is IAclCommons {

  struct FunctionInfo {
    bytes32 agentId;
    bytes32 contextId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    bytes4 selector;
  }

  event FunctionAgentUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed agentId, AgentType agentType);

  event FunctionContextUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed contextId);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed functionId, ActivityStatus newAcstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed functionId, AlterabilityStatus newAlstat);

  function generateFunctionId(bytes32 contextId, bytes4 selector) external returns (bytes32);

  function updateFunctionAgent(bytes32 functionId, bytes32 newAgentId, AgentType newAgentType) external returns (bool);

  function updateFunctionContextId(bytes32 functionId, bytes32 newContextId) external returns (bytes32 newFunctionId);

  function updateFunctionActivityStatus(bytes32 functionId, ActivityStatus newAcstat) external returns (ActivityStatus);

  function updateFunctionAlterabilityStatus(bytes32 functionId, AlterabilityStatus newAlstat) external returns (AlterabilityStatus);

  function isFunctionExists(bytes32 functionId) external view returns (bool);

  function getFunctionAgent(bytes32 functionId) external view returns (bytes32, AgentType);

  function getFunctionContextId(bytes32 functionId) external view returns (bytes32);

  function getFunctionActivityStatus(bytes32 functionId) external view returns (ActivityStatus);

  function getFunctionAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus);

  function getFunctionSelector(bytes32 functionId) external view returns (bytes4);

  function getFunctionInfo(bytes32 functionId) external view returns (FunctionInfo memory);  
}