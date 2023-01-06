// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Type Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface ITypeManagement is IACLCommons{

  struct TypeRegisterRequest {
    bytes32 adminId;          
    bytes32 scopeId;
    uint32 roleLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct TypeUpdateRoleLimitRequest {
    bytes32 typeId;
    uint32 roleLimit;
  }

  struct TypeInfo {
    bytes32 scopeId;
    bytes32 adminId;
    uint32 roleLimit;
    uint32 roleCount;
    AgentType atype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  event TypeRegistered(
    address indexed sender,
    bytes32 indexed typeId,
    bytes32 indexed scopeId,
    bytes32 adminId
  );

  event TypeActivityUpdated(address indexed sender, bytes32 indexed typeId, ActivityStatus acstat);

  event TypeAlterabilityUpdated(address indexed sender, bytes32 indexed typeId, AlterabilityStatus alstat);

  event TypeRoleLimitUpdated(address indexed sender, bytes32 indexed typeId, uint32 roleLimit);

  event TypeScopeUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed scopeId);

  event TypeAdminUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed adminId);

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bool);

  function typeUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function typeUpdateScope(UpdateScopeRequest[] calldata requests) external returns (bool);  

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function typeUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function typeUpdateRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function typeCheckId(bytes32 typeId) external view returns (bool);

  function typeCheckName(string calldata typeName) external view returns (bool);

  function typeCheckAdmin(bytes32 typeId, address account) external view returns (bool);

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool);

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool);

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory);

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory);
}