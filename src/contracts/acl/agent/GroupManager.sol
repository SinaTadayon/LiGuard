// // SPDX-License-Identifier: MIT
// // LivelyVerse Contracts (last updated v3.0.0)

// pragma solidity 0.8.17;

// import "./IGroupManagement.sol";
// import "./ITypeManagement.sol";
// import "../AclStorage.sol";
// import "../IAccessControl.sol";
// import "../scope/IFunctionManagement.sol";
// import "../../lib/acl/LAclStorage.sol";
// import "../../lib/struct/LEnumerableSet.sol";
// import "../../proxy/IProxy.sol";

// /**
//  * @title ACL Group Manager Contract
//  * @author Sina Tadayon, https://github.com/SinaTadayon
//  * @dev
//  *
//  */
// contract GroupManager is AclStorage, IGroupManagement {
//   using LAclStorage for DataCollection;
//   using LEnumerableSet for LEnumerableSet.Bytes32Set;

//   function groupRegister(GroupRegisterRequest[] calldata requests) external returns (bool) {
//      require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
//     (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(msg.sender);
//     require(senderScopeType != ScopeType.NONE, "Access Denied");
    
//     address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
//     bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.roleRegister.selector);
//     (AgentType functionAgentType, bytes32 functionAgentId) = IFunctionManagement(address(this)).functionGetAgent(functionId);
//     if(functionAgentType == AgentType.ROLE) {
//       require(IRoleManagement(address(this)).roleHasAccount(functionAgentId, msg.sender), "Operation Not Permitted");      

//     } else if (functionAgentType == AgentType.MEMBER) {
//       require(msg.sender == functionAgentId, "Operation Not Permitted");
//     } 

//     for(uint i = 0; i < requests.length; i++) {
//       bytes32 newGroupId = keccak256(abi.encodePacked(requests[i].name));
//       require(_data.agents[newGroupId].atype == AgentType.NONE, "Group Already Exists");

//       // checking requested group scope
//       BaseScope storage requestGroupBaseScope = _data.scopes[requests[i].scopeId];
//       require(requestGroupBaseScope.stype != ScopeType.NONE , "Group Scope ID Not Found");
//       require(requestGroupBaseScope.stype <= senderScopeType, "Illegal Group ScopeType");
//       if(requestGroupBaseScope.stype == senderScopeType) {
//         require(requests[i].scopeId == senderScopeId, "Illegal Group Scope ID");
//       } else {
//         require(IAccessControl(address(this)).isScopeExistedInAnotherScope(senderScopeId, requests[i].scopeId), "Illegal Group Scope ID");
//       }

//       // // checking requested role group scope with type scope
//       // (ScopeType requestGroupScopeType, bytes32 requestGroupScopeId) = IGroupManagement(address(this)).groupGetScope(requests[i].groupId);
//       // require(requestGroupScopeType >= requestTypeBaseScope.stype, "Illegal Group ScopeType");
//       // if (requestGroupScopeType == requestTypeBaseScope.stype) {
//       //   require(requestGroupScopeId == requests[i].scopeId, "Illegal Group Scope ID");
//       // } else {
//       //   require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestGroupScopeId, requests[i].scopeId), "Illegal Group Scope ID");
//       // }

//       // // checking requested group type scope with sender scope
//       // require(requestGroupScopeType <= senderScopeType, "Illegal Group, Sender ScopeType");

//       require(requests[i].acstat != ActivityStatus.NONE, "Invalid Role Activity");
//       require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Role Alterability");

//       // add role to type 
//       // check policy in typeAddRole
//       GroupEntity storage ge = _data.writeGroupSlot(requests[i].groupId);
//       ge.types.add(newTypeId);
     
//       // create new type
//       TypeEntity storage newType = _data.typeWriteSlot(newTypeId);

//       // checking requested type admin 
//       if(requests[i].adminId != bytes32(0)) {
//         BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
//         require(adminBaseAgent.atype >= AgentType.MEMBER && adminBaseAgent.atype <= AgentType.TYPE, "Illegal Admin Type AgentType");
//         (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].adminId);
//         if(adminBaseAgent.atype != AgentType.TYPE) {
//           require(requestTypeBaseScope <= requestAdminScopeType, "Illegal Admin Scope Type");
//           if(requestTypeBaseScope == requestAdminScopeType) {
//             require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope ID");
//           } else {
//             require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, requests[i].scopeId), "Illegal Admin Scope ID");
//           }
//         } 
//         newType.ba.adminId = requests[i].adminId;
//       } else {
//         newType.ba.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
//       }
      
//       newType.ba.acstat = requests[i].acstat;
//       newType.ba.alstat = requests[i].alstat;
//       newType.groupId = requests[i].groupId;
//       newType.scopeId = requests[i].scopeId;
//       newType.adminId = requests[i].adminId;
//       newType.roleLimit = requests[i].roleLimit;
//       newType.memberLimit = requests[i].memberLimit;
//       newType.memberTotal = 0;
//       newType.name = requests[i].name;

//       emit TypeRegistered(
//         msg.sender,
//         newTypeId,
//         requests[i].groupId,
//         requests[i].name,
//         requests[i].adminId,
//         requests[i].scopeId,        
//         requests[i].memberLimit,
//         requests[i].roleLimit,
//         requests[i].acstat,
//         requests[i].alstat
//       );
//   }

//   function groupUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {

//   }
 
//   function groupUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {

//   }

//   function groupUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {

//   }

//   function groupUpdateTypeLimit(GroupUpdateTypeLimitRequest[] calldata requests) external returns (bool) {

//   }

//   function groupCheckId(bytes32 groupId) external view returns (bool) {

//   }

//   function groupHasType(bytes32 groupId, bytes32 typeId) external view returns (bool) {

//   }

//   function groupGetTypes(bytes32 groupId) external view returns (bytes32[] memory) {

//   }

//   function groupGetInfo(bytes32 groupId) external view returns (GroupInfo memory) {

//   }
// }