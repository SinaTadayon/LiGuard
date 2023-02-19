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
    int24 roleLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct TypeUpdateRoleLimitRequest {
    bytes32 typeId;
    uint16 roleLimit;
  }

  struct TypeInfo {
    bytes32 scopeId;
    bytes32 adminId;
    uint16 roleLimit;
    uint16 roleCount;
    AgentType adminType;
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

  event TypeRoleLimitUpdated(address indexed sender, bytes32 indexed typeId, uint16 roleLimit);

  event TypeScopeUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed scopeId);

  event TypeAdminUpdated(address indexed sender, bytes32 indexed typeId, bytes32 indexed adminId);

  function typeRegister(MemberSignature calldata memberSign, TypeRegisterRequest[] calldata requests) external returns (bool);

  function typeUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests) external returns (bool);

  function typeUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests) external returns (bool);  

  function typeUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests) external returns (bool);

  function typeUpdateAlterabilityStatus(MemberSignature calldata memberSign, UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function typeUpdateRoleLimit(MemberSignature calldata memberSign, TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool);

  function typeCheckId(bytes32 typeId) external view returns (bool);

  function typeCheckName(string calldata typeName) external view returns (bool);

  function typeCheckAdmin(bytes32 typeId, address account) external view returns (bool);

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool);

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool);

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory);

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory);
}