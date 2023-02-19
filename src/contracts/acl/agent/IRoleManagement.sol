// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Role Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IRoleManagement is IACLCommons{

  struct RoleRegisterRequest {
    bytes32 adminId;          
    bytes32 scopeId;          
    bytes32 typeId;
    int32 memberLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
    string name;
  }

  struct RoleGrantMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct RoleRevokeMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct RoleUpdateMemberLimitRequest {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct RoleInfo {
    bytes32 scopeId;
    bytes32 typeId;
    bytes32 adminId;
    uint24 memberLimit;
    uint24 memberCount;
    AgentType adminType;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
    string name;    
  }

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed roleId,
    bytes32 indexed typeId,
    bytes32 adminId,
    bytes32 scopeId
  );

  event RoleMemberDeleted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId, address account);

  event RoleMemberGranted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);

  event RoleMemberRevoked(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);  

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint24 memberLimit);

  event RoleAdminUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed adminId);

  event RoleScopeUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed scopeId);

  event RoleActivityUpdated(address indexed sender, bytes32 indexed roleId, ActivityStatus acstat);

  event RoleAlterabilityUpdated(address indexed sender, bytes32 indexed roleId, AlterabilityStatus alstat);

  function roleRegister(MemberSignature calldata memberSign, RoleRegisterRequest[] calldata requests) external returns (bool);

  function roleGrantMembers(MemberSignature calldata memberSign, RoleGrantMembersRequest[] calldata requests) external returns (bool);

  function roleRevokeMembers(MemberSignature calldata memberSign, RoleRevokeMembersRequest[] calldata requests) external returns (bool);

  function roleUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests) external returns (bool);

  function roleUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests) external returns (bool);

  function roleUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests) external returns (bool);

  function roleUpdateAlterabilityStatus(MemberSignature calldata memberSign, UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function roleUpdateMemberLimit(MemberSignature calldata memberSign, RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function roleCheckId(bytes32 roleId) external view returns (bool);

  function roleCheckName(string calldata roleName) external view returns (bool);

  function roleCheckAdmin(bytes32 roleId, address account) external view returns (bool);

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory);
}
