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

  struct FunctionUpdateActivityRequest {
    bytes32 functionId;
    ActivityStatus acstat;
  }

  struct FunctionUpdateAlterabilityRequest {
    bytes32 functionId;
    AlterabilityStatus alstate;
  }

  struct FunctionUpdateAdminRequest {
    bytes32 functionId;
    bytes32 adminId;
  }

  struct FunctionUpdatePolicyRequest {
    bytes32 functionId;
    uint8 policyCode;
  }

  struct FunctionInfo {
    bytes32 adminId;
    bytes32 contextId;
    bytes32 groupId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    uint8 policyCode;
    address contractId;
    bytes4 selector;
  }

  event FunctionAdminUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed adminId, AgentType adminType);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed functionId, ActivityStatus acstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed functionId, AlterabilityStatus alstat);

  event FunctionPolicyUpdated(address indexed sender, bytes32 indexed functionId, uint8 policyCode);

  function functionUpdateAdmin(bytes32 functionId, bytes32 adminId) external returns (bool);

  function functionUpdateActivityStatus(bytes32 functionId, ActivityStatus acstat) external returns (ActivityStatus);

  function functionUpdateAlterabilityStatus(bytes32 functionId, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function functionCheckExistance(bytes32 functionId) external view returns (bool);

  function functionCheckExistance(address contractId, bytes4 selector) external view returns (bool);

  function functionCheckAdmin(bytes32 functionId, bytes32 agentId) external view returns (bool);

  function functionGetAdmin(bytes32 functionId) external view returns (bytes32, AgentType);

  function functionGetContext(bytes32 functionId) external view returns (bytes32);

  function functionGetActivityStatus(bytes32 functionId) external view returns (ActivityStatus);

  function functionGeAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus);

  function functionGetSelector(bytes32 functionId) external view returns (bytes4);

  function functionGetGroup(bytes32 functionId) external view returns (bytes32);

  function functionGetPolicy(bytes32 functionId) external view returns (uint8);

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory);  

  function functionGenerateId(bytes32 contextId, bytes4 selector) external pure returns (bytes32);
}