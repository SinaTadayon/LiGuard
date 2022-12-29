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
interface IRoleManagement is IACLCommons {

  struct RoleRegisterRequest {
    bytes32 adminId;          // should role or member in any scope 
    bytes32 scopeId;          // related to request sender scope and sender and it can be one of sender scope and under it
    bytes32 typeId;    
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
    uint32 memberLimit;
  }

  struct RoleInfo {
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

  event RoleRegistered(
    address indexed sender,
    bytes32 indexed roleId,
    bytes32 indexed typeId,
    bytes32 adminId,
    bytes32 scopeId
  );

  event RoleMemberGranted(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);

  event RoleMemberRevoked(address indexed sender, bytes32 indexed roleId, bytes32 indexed memberId, bytes32 typeId);  

  event RoleMemberLimitUpdated(address indexed sender, bytes32 indexed roleId, uint32 memberLimit);

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

  function roleCheckId(bytes32 roleId) external view returns (bool);

  function roleCheckName(string calldata roleName) external view returns (bool);

  function roleCheckAdmin(bytes32 roleId, address account) external view returns (bool);

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool);

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory);


}
