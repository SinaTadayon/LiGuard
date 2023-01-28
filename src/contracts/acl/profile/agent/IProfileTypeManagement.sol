// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Type Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileTypeManagement is IACLCommons {

  struct ProfileTypeRegisterRequest {
    bytes32 profileId;
    ProfileTypeRegisterDataRequest[] types;
  }

  struct ProfileTypeRegisterDataRequest {
    bytes32 adminId;
    bytes32 scopeId;
    string name;
  }

  struct ProfileTypeUpdateRoleLimitRequest {
    bytes32 profileId;
    ProfileTypeRoleLimitRequest[] limits;
  }

  struct ProfileTypeRoleLimitRequest {
    bytes32 typeId;
    uint16 roleLimit;
  }

  struct ProfileTypeInfo {
    bytes32 scopeId;
    bytes32 adminId;
    uint16 roleLimit;
    uint16 roleCount;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event ProfileTypeRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed typeId,
    bytes32 scopeId,
    bytes32 adminId
  );

  event ProfileTypeActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed typeId, ActivityStatus acstat);

  event ProfileTypeAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed typeId, AlterabilityStatus alstat);

  event ProfileTypeRoleLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed typeId, uint16 roleLimit);

  event ProfileTypeScopeUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed typeId, bytes32 scopeId);

  event ProfileTypeAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed typeId, bytes32 adminId);

  function profileTypeRegister(ProfileTypeRegisterRequest[] calldata requests) external returns (bool);

  function profileTypeUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileTypeUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool);

  function profileTypeUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileTypeUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileTypeUpdateRoleLimit(ProfileTypeUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function profileTypeCheckId(bytes32 profileId, bytes32 typeId) external view returns (bool);

  function profileTypeCheckName(bytes32 profileId, string calldata typeName) external view returns (bool);

  function profileTypeCheckAdmin(bytes32 profileId, bytes32 typeId, address account) external view returns (bool);

  function profileTypeHasAccount(bytes32 profileId, bytes32 typeId, address account) external view returns (bool);

  function profileTypeHasRole(bytes32 profileId, bytes32 typeId, bytes32 roleId) external view returns (bool);

  function profileTypeGetRoles(bytes32 profileId, bytes32 typeId) external view returns (bytes32[] memory);

  function profileTypeGetInfo(bytes32 profileId, bytes32 typeId) external view returns (ProfileTypeInfo memory);
}