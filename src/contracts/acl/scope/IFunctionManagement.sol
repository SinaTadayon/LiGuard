// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;


import "../IAclCommons.sol";

/**
 * @title Function Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IFunctionManagement is IAclCommons {

  struct FunctionInfo {
    bytes32 adminId;
    bytes32 contextId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    bytes4 selector;
  }

  event FunctionAdminUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed adminId, AgentType adminType);

  event FunctionContextUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed contextId);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed functionId, ActivityStatus acstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed functionId, AlterabilityStatus alstat);

  function updateFunctionAdmin(bytes32 functionId, bytes32 newAdminId) external returns (bool);

  // for special purpose
  function updateFunctionContext(bytes32 functionId, bytes32 newContextId) external returns (bytes32 newFunctionId);

  function updateFunctionActivityStatus(bytes32 functionId, ActivityStatus acstat) external returns (ActivityStatus);

  function updateFunctionAlterabilityStatus(bytes32 functionId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function isFunctionExists(bytes32 functionId) external view returns (bool);

  function getFunctionAdmin(bytes32 functionId) external view returns (bytes32, AgentType);

  function getFunctionContext(bytes32 functionId) external view returns (bytes32);

  function getFunctionActivityStatus(bytes32 functionId) external view returns (ActivityStatus);

  function getFunctionAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus);

  function getFunctionSelector(bytes32 functionId) external view returns (bytes4);

  function getFunctionInfo(bytes32 functionId) external view returns (FunctionInfo memory);  

  function generateFunctionId(bytes32 contextId, bytes4 selector) external pure returns (bytes32);
}