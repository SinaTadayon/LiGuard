// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "./IAclCommons.sol";

/**
 * @title Policy Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IPolicyManagement is IAclCommons {
  struct PolicyRegisterRequest {
    bytes32 adminId;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 code;
    string name;
    uint32 roleLimit;
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
    uint8 code;
  }
  
  struct PolicyUpdateRoleLimitRequest {
    bytes32 policyId;
    uint32 roleLimit;
  }

  struct PolicyUpdateActivityRequest {
    bytes32 policyId;
    ActivityStatus acstat;
  }

  struct PolicyUpdateAlterabilityRequest {
    bytes32 policyId;
    AlterabilityStatus alstate;
  }

  struct PolicyInfo {
    bytes32 policyId;
    string name;
    uint8 code;
    ActivityStatus acstat;
    AlterabilityStatus alstat;

  }

  event PolicyRegistered(
    address indexed sender,
    bytes32 indexed policyId,
    string indexed name,    
    uint8 code,
    PolicyType ptype,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event PolicyRoleAdded(address indexed sender, bytes32 indexed policyId, bytes32 indexed roleId);

  event PolicyRoleRemoved(address indexed sender, bytes32 indexed policyId, bytes32 indexed roleId);

  event PolicyActivityUpdated(address indexed sender, bytes32 indexed policyId, ActivityStatus acstat);

  event PolicyAlterabilityUpdated(address indexed sender, bytes32 indexed policyId, AlterabilityStatus alstat);

  event PolicyCodeUpdated(address indexed sender, bytes32 indexed policyId, uint8 code, PolicyType ptype);

  event PolicyRoleLimitUpdated(address indexed sender, bytes32 indexed policyId, uint32 roleLimit);

  function policyRegister(PolicyRegisterRequest[] calldata requests) external returns (bool);

  function policyAddRoles(PolicyAddRolesRequest[] calldata requests) external returns (bool);

  function policyRemoveRoles(PolicyRemoveRolesRequest[] calldata requests) external returns (bool);

  function policyUpdateCode(PolicyUpdateCodeRequest[] calldata requests) external returns (bool);
 
  function policyUpdateActivityStatus(PolicyUpdateActivityRequest[] calldata requests) external returns (bool);

  function policyUpdateAlterabilityStatus(PolicyUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function policyUpdatesRoleLimit(PolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function policyCheckExistance(bytes32 policyId) external view returns (bool);

  function policyCheckExistance(string calldata policyName) external view returns (bool);

  function policyCheckRoleExistance(bytes32 roleId) external view returns (bool);

  function policyGetActivityStatus(bytes32 policyId) external view returns (ActivityStatus);

  function policyGetAlterabilityStatus(bytes32 policyId) external view returns (AlterabilityStatus);

  function policyGetName(bytes32 policyId) external view returns (string memory);

  function policyGetInfoByRole(bytes32 roleId) external view returns (PolicyInfo memory);

  function policyGetInfo(bytes32 policyId) external view returns (PolicyInfo memory);

  function policyGetRoles(bytes32 policyId) external view returns (bytes32[] memory);

  function policyGetRolesCount(bytes32 policyId) external view returns (uint32);

  function policyGenerateId(string calldata) external pure returns (bytes32);  
}