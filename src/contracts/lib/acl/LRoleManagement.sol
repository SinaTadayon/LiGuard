// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

// /**
//  * @title Role Management Library
//  * @author Sina Tadayon, https://github.com/SinaTadayon
//  * @dev
//  * @
//  */
// import "../../acl/AccessControlStorage.sol";
// import "../../acl/IRoleManagement.sol";
// import "../struct/LEnumerableSet.sol";
// import "../LContextUtils.sol";
// import "./LAccessControl.sol";

// library LRoleManagement {
//   using LEnumerableSet for LEnumerableSet.Bytes32Set;
//   using LEnumerableSet for LEnumerableSet.AddressSet;

//   bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LRoleManagement"));
//   bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

//   function registerRole(
//     AccessControlStorage.DataCollections storage data,
//     string calldata name,
//     bytes32 group,
//     bool isEnabled
//   ) external returns (bytes32) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.registerRole.selector
//       ),
//       "RegisterRole Access Denied"
//     );

//     return _registerRole(data, name, group, isEnabled);
//   }

//   function batchRegisterRole(
//     AccessControlStorage.DataCollections storage data,
//     IRoleManagement.RegisterRoleRequest[] calldata requests
//   ) external returns (bytes32[] memory) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.batchRegisterRole.selector
//       ),
//       "BatchRegisterRole Access Denied"
//     );
//     bytes32[] memory roles = new bytes32[](requests.length);
//     for (uint256 i; i < requests.length; i++) {
//       roles[i] = _registerRole(data, requests[i].name, requests[i].group, requests[i].status);
//     }
//     return roles;
//   }

//   function _registerRole(
//     AccessControlStorage.DataCollections storage data,
//     string calldata name,
//     bytes32 group,
//     bool isEnabled
//   ) private returns (bytes32) {
//     require(bytes(data.groupMap[group].name).length != 0, "Group Not Found");
//     require(bytes(name).length != 0, "Role Name Invalid");
//     bytes32 roleKey = keccak256(abi.encodePacked(name));
//     require(bytes(data.roleMap[roleKey].name).length == 0, "Role Already Registered");

//     data.groupMap[group].roleSet.add(roleKey);
//     AccessControlStorage.Role storage newRole = data.roleMap[roleKey];
//     newRole.name = name;
//     newRole.group = group;
//     newRole.isEnabled = isEnabled;
//     return roleKey;
//   }

//   function grantRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     address account
//   ) external returns (bool) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.grantRoleAccount.selector
//       ),
//       "GrantRoleAccount Access Denied"
//     );

//     _grantRoleAccount(data, role, account);
//     return true;
//   }

//   function batchGrantRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     IRoleManagement.UpdateRoleRequest[] calldata requests
//   ) external returns (bool) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.batchGrantRoleAccount.selector
//       ),
//       "BatchGrantRoleAccount Access Denied"
//     );
//     for (uint256 i; i < requests.length; i++) {
//       _grantRoleAccount(data, requests[i].role, requests[i].account);
//     }
//     return true;
//   }

//   function _grantRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     address account
//   ) private returns (bool) {
//     if (role == LAccessControl.LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE) {
//       require(account.code.length > 0, "Illegal Grant Community Dao Executor Role");
//     }

//     if (role == LAccessControl.LIVELY_ASSET_MANAGER_ROLE) {
//       require(account.code.length > 0, "Illegal Grant Asset Manager Role");
//     }

//     require(role != LAccessControl.LIVELY_ANONYMOUS_ROLE, "Illegal Grant Anonymous Role");
//     require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
//     require(account != address(0), "Address Invalid");
//     data.accountMap[account][role] = AccessControlStorage.Status.ENABLED;
//     if (!data.roleMap[role].accountSet.contains(account)) {
//       data.roleMap[role].accountSet.add(account);
//     }
//     return true;
//   }

//   function revokeRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     address account
//   ) external returns (bool) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.revokeRoleAccount.selector
//       ),
//       "RevokeRoleAccount Access Denied"
//     );

//     _revokeRoleAccount(data, role, account);
//     return true;
//   }

//   function batchRevokeRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     IRoleManagement.UpdateRoleRequest[] calldata requests
//   ) external returns (bool) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.batchRevokeRoleAccount.selector
//       ),
//       "BatchRevokeRoleAccount Access Denied"
//     );
//     for (uint256 i; i < requests.length; i++) {
//       _revokeRoleAccount(data, requests[i].role, requests[i].account);
//     }
//     return true;
//   }

//   function _revokeRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     address account
//   ) private returns (bool) {
//     if (role == LAccessControl.LIVELY_ADMIN_ROLE || role == LAccessControl.LIVELY_SYSTEM_ADMIN_ROLE) {
//       require(data.roleMap[role].accountSet.length() > 1, "Illegal Revoke Role Account");
//     }

//     require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
//     require(account != address(0), "Address Invalid");
//     require(data.roleMap[role].accountSet.contains(account), "Account Not Found");
//     require(data.accountMap[account][role] != AccessControlStorage.Status.NONE, "Account Role Not Found");
//     data.accountMap[account][role] = AccessControlStorage.Status.DISABLED;
//     data.roleMap[role].accountSet.remove(account);
//     return true;
//   }

//   function setRoleStatus(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     bool status
//   ) external returns (bool, bytes32) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.setRoleStatus.selector
//       ),
//       "SetRoleStatus Access Denied"
//     );
//     require(
//       role != LAccessControl.LIVELY_ANONYMOUS_ROLE &&
//         role != LAccessControl.LIVELY_ADMIN_ROLE &&
//         role != LAccessControl.LIVELY_SYSTEM_ADMIN_ROLE,
//       "Illegal Change Role Status"
//     );
//     require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
//     data.roleMap[role].isEnabled = status;
//     return (true, data.roleMap[role].group);
//   }

//   function setRoleGroup(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     bytes32 group
//   ) external returns (bool, bytes32) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IRoleManagement.setRoleGroup.selector
//       ),
//       "SetRoleGroup Access Denied"
//     );
//     require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
//     require(bytes(data.groupMap[group].name).length != 0, "Group Not Found");
//     require(data.roleMap[role].group != group, "Illegal Group Duplication");
//     bytes32 oldGroup = data.roleMap[role].group;
//     data.groupMap[data.roleMap[role].group].roleSet.remove(role);
//     data.groupMap[group].roleSet.add(role);
//     data.roleMap[role].group = group;
//     return (true, oldGroup);
//   }

//   function getRoleInfo(AccessControlStorage.DataCollections storage data, bytes32 role)
//     external
//     view
//     returns (
//       string memory,
//       bytes32,
//       bool
//     )
//   {
//     return (data.roleMap[role].name, data.roleMap[role].group, data.roleMap[role].isEnabled);
//   }

//   function getRoleAccounts(AccessControlStorage.DataCollections storage data, bytes32 role)
//     external
//     view
//     returns (address[] memory)
//   {
//     require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
//     return data.roleMap[role].accountSet.values();
//   }

//   function hasRoleAccount(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 role,
//     address account
//   ) external view returns (bool) {
//     return
//       bytes(data.roleMap[role].name).length != 0 &&
//       account != address(0) &&
//       data.accountMap[account][role] == AccessControlStorage.Status.ENABLED;
//   }

//   function getLibrary() external pure returns (address) {
//     return address(LAccessControl);
//   }
// }
