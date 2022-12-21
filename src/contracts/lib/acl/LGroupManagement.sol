// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

// import "../../acl/AccessControlStorage.sol";
// import "../../acl/IGroupManagement.sol";
// import "../struct/LEnumerableSet.sol";
// import "../LContextUtils.sol";
// import "./LAccessControl.sol";

// /**
//  * @title Group Management Library
//  * @author Sina Tadayon, https://github.com/SinaTadayon
//  * @dev
//  *
//  */
// library LGroupManagement {
//   using LEnumerableSet for LEnumerableSet.Bytes32Set;
//   using LEnumerableSet for LEnumerableSet.AddressSet;

//   bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LGroupManagement"));
//   bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

//   function registerGroup(
//     AccessControlStorage.DataCollections storage data,
//     string calldata name,
//     bool status
//   ) external returns (bytes32) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");
//     require(
//       LAccessControl.hasAccess(
//         data,
//         LContextUtils.generateCtx(address(this)),
//         msg.sender,
//         IGroupManagement.registerGroup.selector
//       ),
//       "RegisterGroup Access Denied"
//     );
//     require(bytes(name).length != 0, "Group Name Invalid");
//     bytes32 groupKey = keccak256(abi.encodePacked(name));
//     require(bytes(data.groupMap[groupKey].name).length == 0, "Group Already Registered");

//     AccessControlStorage.Group storage newGroup = data.groupMap[groupKey];
//     newGroup.name = name;
//     newGroup.isEnabled = status;
//     return groupKey;
//   }

//   function setGroupStatus(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 group,
//     bool status
//   ) external returns (bool) {
//     require(!IProxy(address(this)).isSafeMode(), "Rejected");

//     if (group == LAccessControl.LIVELY_GENERAL_GROUP) {
//       bytes32 context = LContextUtils.generateCtx(address(this));
//       bytes4 signature = IRealmManagement.setRealmStatus.selector;
//       bytes32 role = data.ctxMap[context].resources[signature].role;
//       require(
//         data.ctxMap[context].isEnabled &&
//           data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED &&
//           data.realmMap[data.ctxMap[context].realm].isEnabled &&
//           data.accountMap[msg.sender][role] == AccessControlStorage.Status.ENABLED,
//         "SetGroupStatus Access Denied"
//       );
//     } else {
//       require(
//         LAccessControl.hasAccess(
//           data,
//           LContextUtils.generateCtx(address(this)),
//           msg.sender,
//           IGroupManagement.setGroupStatus.selector
//         ),
//         "SetGroupStatus Access Denied"
//       );
//     }
//     require(bytes(data.groupMap[group].name).length != 0, "Group Not Found");
//     data.groupMap[group].isEnabled = status;
//     return true;
//   }

//   function hasGroupRole(
//     AccessControlStorage.DataCollections storage data,
//     bytes32 group,
//     bytes32 role
//   ) external view returns (bool) {
//     return bytes(data.groupMap[group].name).length != 0 && data.groupMap[group].roleSet.contains(role);
//   }

//   function getGroupInfo(AccessControlStorage.DataCollections storage data, bytes32 group)
//     external
//     view
//     returns (string memory, bool)
//   {
//     return (data.groupMap[group].name, data.groupMap[group].isEnabled);
//   }

//   function getGroupRoles(AccessControlStorage.DataCollections storage data, bytes32 group)
//     external
//     view
//     returns (bytes32[] memory)
//   {
//     return data.groupMap[group].roleSet.values();
//   }

//   function getLibrary() external pure returns (address) {
//     return address(LAccessControl);
//   }
// }
