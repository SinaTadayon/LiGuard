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
    bytes32 profileId;
    bytes32 adminId;
    bytes32 scopeId;          
    bytes32 typeId; 
    // uint32 memberLimit;
    // ActivityStatus acstat;
    // AlterabilityStatus alstat;   
    string name;
  }

  struct ProfileRoleGrantMembersRequest {
    bytes32 profileId;
    bytes32 roleId;
    bytes32[] members;
  }

  struct ProfileRoleRevokeMembersRequest {
    bytes32 profileId;
    bytes32 roleId;
    bytes32[] members;
  }

  struct ProfileRoleUpdateMemberLimitRequest {
    bytes32 profileId;
    bytes32 roleId;
    uint32 memberLimit;
  }

  struct ProfileRoleInfo {
    bytes32 scopeId;
    bytes32 typeId;
    bytes32 adminId;
    uint32 memberLimit;
    uint32 memberCount;
    AgentType atype;
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

  event ProfileRoleMemberGranted(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 memberId, bytes32 typeId);

  event ProfileRoleMemberRevoked(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 memberId, bytes32 typeId);  

  event ProfileRoleMemberLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, uint32 memberLimit);

  event ProfileRoleAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 adminId);

  event ProfileRoleScopeUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 scopeId);

  event ProfileRoleActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, ActivityStatus acstat);

  event ProfileRoleAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, AlterabilityStatus alstat);

  function profileRoleRegister(ProfileRoleRegisterRequest[] calldata requests) external returns (bool);

  function profileRoleGrantMembers(ProfileRoleGrantMembersRequest[] calldata requests) external returns (bool);

  function profileRoleRevokeMembers(ProfileRoleRevokeMembersRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool);  

  function profileRoleUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileRoleUpdateMemberLimit(ProfileRoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function profileRoleCheckId(bytes32 roleId) external view returns (bool);

  function profileRoleCheckName(string calldata roleName) external view returns (bool);

  function profileRoleCheckAdmin(bytes32 roleId, address account) external view returns (bool);

  function profileRoleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function profileRoleGetInfo(bytes32 roleId) external view returns (ProfileRoleInfo memory);
}
