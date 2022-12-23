// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;


import "../IACLCommons.sol";

/**
 * @title Function Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IFunctionManagement is IACLCommons {

  struct FunctionRegisterRequest {
    bytes signature;
    bytes32 adminId;
    bytes32 agentId;
    address contractId;    
    bytes4 selector;
    uint16 agentLimit;
    uint8 policyCode;
    ActivityStatus acstat;
    AlterabilityStatus alstat;    
  }

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
    uint16 agentLimit;
    uint16 referredByAgent;
    uint16 referredByPolicy;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    AgentType agentType;    
    uint8 policyCode;
  }

  event FunctionRegistered(
    address indexed sender, 
    bytes32 indexed contextId,
    bytes32 indexed functionId,
    bytes32 adminId, 
    bytes32 agentId,
    address signer,
    bytes4 selector,
    uint8 policyCode
  );

  event FunctionAdminUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed adminId);

  event FunctionAgentUpdated(address indexed sender, bytes32 indexed functionId, bytes32 indexed agentId);

  event FunctionActivityUpdated(address indexed sender, bytes32 indexed functionId, ActivityStatus acstat);

  event FunctionAlterabilityUpdated(address indexed sender, bytes32 indexed functionId, AlterabilityStatus alstat);

  event FunctionPolicyUpdated(address indexed sender, bytes32 indexed functionId, uint8 policyCode);

  event FunctionAgentLimitUpdated(address indexed sender, bytes32 indexed functionId, uint16 agentLimit);

  function functionRegister(FunctionRegisterRequest[] calldata requests) external returns (bool);

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
}