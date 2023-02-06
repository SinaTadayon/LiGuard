// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Role Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileRoleManagement is IACLCommons{

  struct ProfileRoleRegisterRequest {
    bytes32 adminId;
    bytes32 scopeId;          
    bytes32 typeId;
    string name;
    int32 memberLimit;
  }

  struct ProfileRoleGrantMembersRequest {
    bytes32 roleId;
    bytes32[] members;    
  }

  struct ProfileRoleRevokeMembersRequest {
    bytes32 roleId;
    bytes32[] members;
  }

  struct ProfileRoleUpdateMemberLimitRequest {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct ProfileRoleInfo {
    bytes32 scopeId;
    bytes32 typeId;
    bytes32 adminId;
    uint24 memberLimit;
    uint24 memberCount;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
    string name;    
  }

  event ProfileRoleRegistered (
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed roleId,
    bytes32 typeId,    
    bytes32 adminId,
    bytes32 scopeId
  );

  event ProfileRoleMemberDeleted(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, bytes32 roleId, bytes32 typeId, address account);

  event ProfileRoleMemberGranted(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 memberId, bytes32 typeId);

  event ProfileRoleMemberRevoked(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 memberId, bytes32 typeId);  

  event ProfileRoleMemberLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, uint24 memberLimit);

  event ProfileRoleAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 adminId);

  event ProfileRoleScopeUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 scopeId);

  event ProfileRoleActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, ActivityStatus acstat);

  event ProfileRoleAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, AlterabilityStatus alstat);

  function profileRoleRegister(bytes32 profileId, ProfileRoleRegisterRequest[] calldata requests) external returns (bool);

  function profileRoleGrantMembers(bytes32 profileId, ProfileRoleGrantMembersRequest[] calldata requests) external returns (bool);

  function profileRoleRevokeMembers(bytes32 profileId, ProfileRoleRevokeMembersRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateAdmin(bytes32 profileId, ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateScope(bytes32 profileId, ProfileUpdateScopeRequest[] calldata requests) external returns (bool);  

  function profileRoleUpdateActivityStatus(bytes32 profileId, ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateAlterabilityStatus(bytes32 profileId, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateMemberLimit(bytes32 profileId, ProfileRoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function profileRoleCheckId(bytes32 profileId, bytes32 roleId) external view returns (bool);

  function profileRoleCheckName(bytes32 profileId, string calldata roleName) external view returns (bool);

  function profileRoleCheckAdmin(bytes32 profileId, bytes32 roleId, address account) external view returns (bool);

  function profileRoleHasAccount(bytes32 profileId, bytes32 roleId, address account) external view returns (bool);

  function profileRoleGetInfo(bytes32 profileId, bytes32 roleId) external view returns (ProfileRoleInfo memory);
}
