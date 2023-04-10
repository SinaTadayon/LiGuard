// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../IACLCommonsTest.sol";

/**
 * @title Policy Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IPolicyManagementTest is IACLCommonsTest {
  struct PolicyRegisterRequest {
    bytes32 adminId;
    bytes32 scopeId;
    uint8 policyCode;
    int24 roleLimit;
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
    uint16 roleLimit;
  }

  struct PolicyInfo {
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

  event PolicyRoleLimitUpdated(address indexed sender, bytes32 indexed policyId, uint16 roleLimit);

  event PolicyAdminUpdated(address indexed sender, bytes32 indexed policyId, bytes32 indexed adminId);

  event PolicyScopeUpdated(address indexed sender, bytes32 indexed policyId, bytes32 indexed scopeId);

  event PolicyRemoved(address indexed sender, bytes32 indexed policyId);

  function policyRegister(MemberSignature calldata memberSign, PolicyRegisterRequest[] calldata requests)
    external
    returns (bool);

  function policyAddRoles(MemberSignature calldata memberSign, PolicyAddRolesRequest[] calldata requests)
    external
    returns (bool);

  function policyRemoveRoles(MemberSignature calldata memberSign, PolicyRemoveRolesRequest[] calldata requests)
    external
    returns (bool);

  function policyUpdateCodes(MemberSignature calldata memberSign, PolicyUpdateCodeRequest[] calldata requests)
    external
    returns (bool);

  function policyUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function policyUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests)
    external
    returns (bool);

  function policyUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function policyUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function policyUpdateRoleLimit(MemberSignature calldata memberSign, PolicyUpdateRoleLimitRequest[] calldata requests)
    external
    returns (bool);

  function policyRemove(MemberSignature calldata memberSign, bytes32[] calldata policies) external returns (bool);

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
