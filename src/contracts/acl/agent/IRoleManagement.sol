// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IAclCommons.sol";

/**
 * @title Role Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IRoleManagement is IAclCommons {

  struct RoleIncreaseMemberRequest {
    bytes32 roleId;
    uint32 count;
  }

  struct RoleDecreaseMemberRequest {
    bytes32 roleId;
    uint32 count;
  }
  
  struct RoleUpdateAdminRequest {
    bytes32 roleId;
    bytes32 adminId;
  }
   /**
   * regiter new role need to add to some type, must caller have permission to add role to target types 
   * role registered by scope master or role master or super admin types
   *
   ***** scope admin must be have in upper type of scope of requested scope
   */
  struct RoleRegisterRequest {
    bytes32 adminId;          // should role or member in any scope 
    bytes32 scopeId;          // related to request sender scope and sender and it can be one of sender scope and under it
    bytes32 typeId;
    bytes32 policyId;
    uint24 memberLimit;
    string name;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
  }

  struct RoleUpdateScopeRequest { 
    bytes32 roleId;
    bytes32 scopeId;
  }

  struct RoleUpdateMemberLimitRequest {
    bytes32 roleId;
    uint24 memberLimit;
  }

  struct RoleUpdateActivityRequest {
    bytes32 roleId;
    ActivityStatus acstat;
  }

  struct RoleUpdateAlterabilityRequest {
    bytes32 roleId;
    AlterabilityStatus alstate;
  }

  struct RoleInfo {
    bytes32 scopeId;
    bytes32 typeId;
    uint24 memberLimit;
    string name;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
  }

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed typeId,
    bytes32 indexed roleId,
    string name,
    bytes32 scopeId,
    uint24 memberLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event RoleMemberIncreased(address indexed sender, bytes32 indexed roleId, uint32 total);

  event RoleMemberDecreased(address indexed sender, bytes32 indexed roleId, uint32 total);

  event RoleActivityUpdated(address indexed sender, bytes32 indexed roleId, ActivityStatus acstat);

  event RoleAlterabilityUpdated(address indexed sender, bytes32 indexed roleId, AlterabilityStatus alstat);

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 memberLimit);

  event RoleAdminUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed adminId);

  event RoleScopeUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed scopeId);

  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool);

  function roleIncreaseMember(bytes32 roleId, uint32 count) external returns (uint32);

  function roleDecreaseMember(bytes32 roleId, uint32 count) external returns (uint32);

  function roleIncreaseMembers(RoleIncreaseMemberRequest[] calldata requests) external returns (bool);

  function roleDecreaseMembers(RoleDecreaseMemberRequest[] calldata requests) external returns (bool);

  function roleUpdateAdmin(RoleUpdateAdminRequest[] calldata requests) external returns (bool);

  function roleUpdateScope(RoleUpdateScopeRequest[] calldata requests) external returns (bool);
 
  function roleUpdateActivityStatus(RoleUpdateActivityRequest[] calldata requests) external returns (bool);

  function roleUpdateAlterabilityStatus(RoleUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function roleCheckIdExistance(bytes32 roleId) external view returns (bool);

  function roleCheckNameExistance(string calldata roleName) external view returns (bool);

  function roleCheckAdmin(bytes32 roleId, bytes32 agentId) external view returns (bool);

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function roleHasMember(bytes32 roleId, bytes32 memberId) external view returns (bool);

  function roleGetMemberLimit(bytes32 roleId) external view returns (uint24);

  function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus);

  function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus);

  function roleGetAdmin(bytes32 roleId) external view returns (bytes32);

  function roleGetName(bytes32 roleId) external view returns (string memory);

  function roleGetScope(bytes32 roleId) external view returns (ScopeType, bytes32);

  function roleGetMembersCount(bytes32 roleId) external view returns (uint32);

  function roleGetType(bytes32 typeId) external view returns (bytes32);

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory);

  function roleGenerateId(string calldata) external pure returns (bytes32);
}
