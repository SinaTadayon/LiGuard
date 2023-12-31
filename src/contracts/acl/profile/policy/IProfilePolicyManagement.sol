// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../IACLCommons.sol";

/**
 * @title Profile Policy Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IProfilePolicyManagement is IACLCommons {
  struct ProfilePolicyRegisterRequest {
    bytes32 adminId;
    bytes32 scopeId;
    int24 roleLimit;
    uint8 policyCode;
    string name;
  }

  struct ProfilePolicyAddRolesRequest {
    bytes32 policyId;
    bytes32[] roles;
  }

  struct ProfilePolicyRemoveRolesRequest {
    bytes32 policyId;
    bytes32[] roles;
  }

  struct ProfilePolicyUpdateCodeRequest {
    bytes32 policyId;
    uint8 policyCode;
  }

  struct ProfilePolicyUpdateRoleLimitRequest {
    bytes32 policyId;
    uint16 roleLimit;
  }

  struct ProfilePolicyInfo {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
    uint16 roleLimit;
    uint16 roleCount;
    uint8 policyCode;
    AgentType adminType;
    ScopeType scopeType;
    PolicyType ptype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfilePolicyRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed policyId,
    bytes32 scopeId,
    bytes32 adminId,
    uint8 policyCode
  );

  event ProfilePolicyRoleAdded(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    bytes32 roleId
  );

  event ProfilePolicyRoleRemoved(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    bytes32 roleId
  );

  event ProfilePolicyActivityUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    ActivityStatus acstat
  );

  event ProfilePolicyAlterabilityUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    AlterabilityStatus alstat
  );

  event ProfilePolicyCodeUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    uint8 policyCode,
    PolicyType ptype
  );

  event ProfilePolicyRoleLimitUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    uint16 roleLimit
  );

  event ProfilePolicyAdminUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    bytes32 adminId
  );

  event ProfilePolicyScopeUpdated(
    address indexed sender,
    bytes32 indexed profieId,
    bytes32 indexed policyId,
    bytes32 scopeId
  );

  event ProfilePolicyRemoved(address indexed sender, bytes32 indexed profieId, bytes32 indexed policyId);

  function profilePolicyRegister(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyRegisterRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyAddRoles(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyAddRolesRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyRemoveRoles(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyRemoveRolesRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateCodes(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyUpdateCodeRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateScope(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateScopeRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyUpdateRoleLimit(
    ProfileMemberSignature calldata memberSign,
    ProfilePolicyUpdateRoleLimitRequest[] calldata requests
  ) external returns (bool);

  function profilePolicyRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata policies)
    external
    returns (bool);

  function profilePolicyCheckId(bytes32 profileId, bytes32 policyId) external view returns (bool);

  function profilePolicyCheckName(bytes32 profileId, string calldata policyName) external view returns (bool);

  function profilePolicyCheckAdmin(
    bytes32 profileId,
    bytes32 policyId,
    address account
  ) external view returns (bool);

  function profilePolicyCheckRole(bytes32 profileId, bytes32 roleId) external view returns (bool);

  function profilePolicyCheckAccess(
    bytes32 profileId,
    bytes32 policyId,
    bytes32 functionId
  ) external view returns (bool);

  function profilePolicyCheckRoleAccess(
    bytes32 profileId,
    bytes32 roleId,
    bytes32 functionId
  ) external view returns (bool);

  function profilePolicyHasRole(
    bytes32 profileId,
    bytes32 policyId,
    bytes32 roleId
  ) external view returns (bool);

  function profilePolicyGetInfoByRole(bytes32 profileId, bytes32 roleId)
    external
    view
    returns (ProfilePolicyInfo memory);

  function profilePolicyGetInfo(bytes32 profileId, bytes32 policyId) external view returns (ProfilePolicyInfo memory);

  function profilePolicyGetRoles(bytes32 profileId, bytes32 policyId) external view returns (bytes32[] memory);
}
