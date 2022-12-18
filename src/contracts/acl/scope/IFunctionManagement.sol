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

  struct FunctionUpdatePolicyRequest {
    bytes32 functionId;
    uint8 policyCode;
  }

  struct FunctionUpdateAgentRequest {
    bytes32 functionId;
    bytes32 agentId;
  }

  struct FunctionInfo {
    bytes32 adminId;
    bytes32 agentId;
    bytes32 contextId;
    bytes4 selector;        
    uint16 agentlimit;
    uint16 referredByAgent;
    uint16 referredByPolicy;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    AgentType agentType;    
    uint8 policyCode;
  }

  event FunctionAdminUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed adminId, AgentType atype);

  event FunctionAgentUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed agentId, AgentType atype);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed functionId, ActivityStatus acstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed functionId, AlterabilityStatus alstat);

  event FunctionPolicyUpdated(address indexed sender, bytes32 indexed functionId, uint8 policyCode);

  event FunctionAgentLimitUpdated(address indexed sender, bytes32 indexed functionId, uint16 typeLimit);

  function functionUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function functionUpdateAgent(FunctionUpdateAgentRequest[] calldata requests) external returns (bool);

  function functionDeleteActivity(bytes32[] calldata requests) external returns (bool);

  function functionUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function functionUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool); 

  function functionUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);

  function functionCheckId(bytes32 functionId) external view returns (bool);

  function functionCheckSelector(address contractId, bytes4 selector) external view returns (bool);

  function functionCheckAdmin(bytes32 functionId, address account) external view returns (bool);

  function functionCheckAgent(bytes32 functionId, address account) external view returns (bool);

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory);  

  // function functionHasAgent(bytes32 functionId, bytes32 agentId) external view returns (bool);

  // function functionHasAccount(bytes32 functionId, address account) external view returns (bool);

  // function functionGetAdmin(bytes32 functionId) external view returns (AgentType, bytes32);

  // function functionGetAgent(bytes32 functionId) external view returns (AgentType, bytes32);

  // function functionGetContext(bytes32 functionId) external view returns (bytes32);

  // function functionGetActivityStatus(bytes32 functionId) external view returns (ActivityStatus);

  // function functionGetAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus);

  // function functionGetSelector(bytes32 functionId) external view returns (bytes4);

  // function functionGetGroup(bytes32 functionId) external view returns (bytes32);

  // function functionGetPolicy(bytes32 functionId) external view returns (bool, uint8);

  // function functionGenerateId(bytes32 contextId, bytes4 selector) external pure returns (bytes32);

  // function functionGenerateId(address contractId, bytes4 selector) external pure returns (bytes32);
}