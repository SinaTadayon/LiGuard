// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Policy Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IPolicyManagement is IACLCommons{
  struct PolicyRegisterRequest {
    bytes32 adminId;
    bytes32 scopeId;
    uint32 roleLimit;
    uint8 policyCode;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;    
  }

  struct PolicyAddRolesRequest {
    bytes32 policyId;
    bytes32[] roles;
  }
  
  struct PolicyRemoveRolesRequest {
    bytes32 policyId;
    bytes32[] roles;
  }

  struct PolicyUpdateCodeRequest { 
    bytes32 policyId;
    uint8 policyCode;
  }
  
  struct PolicyUpdateRoleLimitRequest {
    bytes32 policyId;
    uint32 roleLimit;
  }

  struct PolicyInfo {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    uint32 roleLimit;
    uint32 roleCount;
    uint8 policyCode;
    AgentType adminType;
    ScopeType scopeType;
    PolicyType ptype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event PolicyRegistered(
    address indexed sender,
    bytes32 indexed policyId,
    bytes32 indexed scopeId,
    bytes32 adminId,
    uint8 policyCode
  );

  event PolicyRoleAdded(address indexed sender, bytes32 indexed policyId, bytes32 indexed roleId);

  event PolicyRoleRemoved(address indexed sender, bytes32 indexed policyId, bytes32 indexed roleId);

  event PolicyActivityUpdated(address indexed sender, bytes32 indexed policyId, ActivityStatus acstat);

  event PolicyAlterabilityUpdated(address indexed sender, bytes32 indexed policyId, AlterabilityStatus alstat);

  event PolicyCodeUpdated(address indexed sender, bytes32 indexed policyId, uint8 policyCode, PolicyType ptype);

  event PolicyRoleLimitUpdated(address indexed sender, bytes32 indexed policyId, uint32 roleLimit);

  event PolicyAdminUpdated(address indexed sender, bytes32 indexed policyId, bytes32 indexed adminId);

  event PolicyScopeUpdated(address indexed sender, bytes32 indexed policyId, bytes32 indexed scopeId);

  function policyRegister(PolicyRegisterRequest[] calldata requests) external returns (bool);

  function policyAddRoles(PolicyAddRolesRequest[] calldata requests) external returns (bool);

  function policyRemoveRoles(PolicyRemoveRolesRequest[] calldata requests) external returns (bool);

  function policyUpdateCodes(PolicyUpdateCodeRequest[] calldata requests) external returns (bool);

  function policyUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool); 

  function policyUpdateScope(UpdateScopeRequest[] calldata requests) external returns (bool);  

  function policyUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function policyUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function policyUpdateRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function policyCheckId(bytes32 policyId) external view returns (bool);

  function policyCheckName(string calldata policyName) external view returns (bool);

  function policyCheckAdmin(bytes32 policyId, address account) external view returns (bool);

  function policyCheckRole(bytes32 roleId) external view returns (bool);

  function policyCheckAccess(bytes32 policyId, bytes32 functionId) external view returns (bool);

  function policyCheckRoleAccess(bytes32 roleId, bytes32 functionId) external view returns (bool);

  function policyHasRole(bytes32 policyId, bytes32 roleId) external view returns (bool);

  function policyGetInfoByRole(bytes32 roleId) external view returns (PolicyInfo memory);

  function policyGetInfo(bytes32 policyId) external view returns (PolicyInfo memory);

  function policyGetRoles(bytes32 policyId) external view returns (bytes32[] memory);
}