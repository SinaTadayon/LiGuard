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

  // struct RoleIncreaseMemberRequest {
  //   bytes32 roleId;
  //   uint32 count;
  // }

  // struct RoleDecreaseMemberRequest {
  //   bytes32 roleId;
  //   uint32 count;
  // }
  
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
    // bytes32 policyId;
    uint32 memberLimit;
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
    uint32 memberLimit;
    uint32 memberTotal;
    uint16 referredByScope;
    uint16 referredByPolicy;
    ActivityStatus acstat;
    AlterabilityStatus alstat;   
    string name;    
  }

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed roleId,
    bytes32 indexed typeId,
    string name,
    bytes32 adminId,
    bytes32 scopeId,
    uint32 memberLimit,
    ActivityStatus acstat,
    AlterabilityStatus alstat
  );

  event RoleMemberGranted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);

  event RoleMemberRevoked(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);

  event RoleReferredByScopeUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed scopeId, uint16 total, ActionType action);

  event RoleReferredByPolicyUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed policyId, uint16 total, ActionType action);

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint8 memberLimit);

  event RoleAdminUpdated(address indexed sender, bytes32 indexed roleId, bytes32 indexed adminId);

  event RoleActivityUpdated(address indexed sender, bytes32 indexed roleId, ActivityStatus acstat);

  event RoleAlterabilityUpdated(address indexed sender, bytes32 indexed roleId, AlterabilityStatus alstat);

  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool);

  function roleGrantMembers(RoleGrantMembersRequest[] calldata requests) external returns (bool);

  function roleRevokeMembers(RoleRevokeMembersRequest[] calldata requests) external returns (bool);

  function roleUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);
 
  function roleUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function roleUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool);

  function roleUpdateReferredByScope(UpdateReferredByRequest[] calldata requests) external returns (bool);

  function roleUpdateReferredByPolicy(UpdateReferredByRequest[] calldata requests) external returns (bool);

  function roleCheckId(bytes32 roleId) external view returns (bool);

  function roleCheckName(string calldata roleName) external view returns (bool);

  function roleCheckAdmin(bytes32 roleId, address account) external view returns (bool);

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory);

    // function roleGetMemberLimit(bytes32 roleId) external view returns (uint24);

  // function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus);

  // function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus);

  // function roleGetAdmin(bytes32 roleId) external view returns (bytes32);

  // function roleGetName(bytes32 roleId) external view returns (string memory);

  // function roleGetScope(bytes32 roleId) external view returns (ScopeType, bytes32);

  // function roleGetMembersCount(bytes32 roleId) external view returns (uint32);

  // function roleGetType(bytes32 typeId) external view returns (bytes32);

  // function roleGenerateId(string calldata) external pure returns (bytes32);

  // function roleCheckAdminMember(bytes32 roleId, bytes32 memberId) external view returns (bool);

  // function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

}
