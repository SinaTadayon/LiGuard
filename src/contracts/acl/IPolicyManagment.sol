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

 interface IPolicyManagement is IAclCommons {
  struct RequestRegisterPolicy {
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    uint8 code;
    string name;
  }

  struct RequestAlterRolePolicy {
    bytes32 policyId;
    ActionType action;  
    bytes32[] roles;
  }
  
  
  struct RequestUpdateCodePolicy { 
    bytes32 policyId;
    uint8 code;
  }

  struct RequestUpdateActivityPolicy {
    bytes32 policyId;
    ActivityStatus acstat;
  }

  struct RequestUpdateAlterabilityPolicy {
    bytes32 policyId;
    AlterabilityStatus alstate;
  }

  struct PolicyInfo {
    bytes32 policyId;
    uint8 code;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event TypeRegistered(
    address indexed sender,
    bytes32 indexed policyId,
    string indexed name,    
    uint8 code,
    PolicyType ptype,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event PolicyRoleAltered(address indexed sender, bytes32 indexed policyId, bytes32 indexed roleId, ActionType action);

  event PolicyActivityUpdated(address indexed sender, bytes32 indexed policyId, ActivityStatus acstat);

  event PolicyAlterabilityUpdated(address indexed sender, bytes32 indexed policyId, AlterabilityStatus alstat);

  event PolicyCodeUpdated(address indexed sender, bytes32 indexed policyId, uint8 code, PolicyType ptype);

  function registerPolicies(RequestRegisterPolicy[] calldata requests) external returns (bool);

  function alterPoliciesRoles(RequestAlterRolePolicy[] calldata requests) external returns (bool);

  function updatePoliciesCode(RequestUpdateCodePolicy[] calldata requests) external returns (bool);
 
  function updatePoliciesActivityStatus(RequestUpdateActivityPolicy[] calldata requests) external returns (bool);

  function updatePoliciesAlterabilityStatus(RequestUpdateAlterabilityPolicy[] calldata requests) external returns (bool);

  function isPolicyExisted(bytes32 policyId) external view returns (bool);

  function isPolicyOfRoleExisted(bytes32 roleId) external view returns (bool);

  function getPolicyInfoOfRole(bytes32 roleId) external view returns (PolicyInfo memory);

  function getPolicyActivityStatus(bytes32 policyId) external view returns (ActivityStatus);

  function getPolicyAlterabilityStatus(bytes32 policyId) external view returns (AlterabilityStatus);

  function getPolicyName(bytes32 policyId) external view returns (string memory);

  function getPolicyInfo(bytes32 policyId) external view returns (PolicyInfo memory);

  function getPolicyRoles(bytes32 policyId) external view returns (bytes32[] memory);

  function generatePolicyId(string calldata) external pure returns (bytes32);  
 }