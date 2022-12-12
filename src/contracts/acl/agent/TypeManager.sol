// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/struct/LEnumerableMap.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract TypeManager is AclStorage, ITypeManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableMap.Bytes32ToBytes32Map;

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    // require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleRegister.selector), "Access Denied");

    bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.roleRegister.selector);
    bytes32 senderRoleId;
    (bytes32 adminId, AgentType atype) = IFunctionManagement(address(this)).functionGetAdmin(functionId);    
    if(atype == AgentType.TYPE) {
      senderRoleId = this.typeGetAccountRole(adminId, msg.sender);
      require(senderRoleId != bytes32(0), "Operation Not Permitted");
    } else if(atype == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(adminId, msg.sender), "Operation Not Permitted");      
      senderRoleId = adminId;
    } else {
      revert("Invalid Function AdminId");
    }

    (ScopeType senderScopeType, bytes32 senderScopeId) = IRoleManagement(address(this)).roleGetScope(senderRole);
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRoleId = keccak256(abi.encodePacked(requests[i].name));
      require(!this.typeCheckIdExistance(newRoleId), "Type Already Exist");
      bytes32 typeMasterId = IAccessControl(address(this)).getTypeMasterId();

      // request scope id
      BaseScope storage bs = _data.scopes[requests[i].scopeId];
      require(bs.stype != ScopeType.NONE , "Type ScopeId Not Found");
      require(bs.stype <= senderScopeType, "Illegal Type ScopeType");
      if(bs.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Type ScopeId");
      }

      // request admin ID
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage ba = _data.agents[requests[i].adminId];

        if(ba.atype == AgentType.MEMBER) {
          require(IAccessControl(address(this)).isAccountExistedInTypeMasterType(requests[i].adminId), "Illegal Type Admin Member");          
          bytes32 requestAdminRole = this.typeGetMemberRole(typeMasterId, requests[i].adminId);
          (ScopeType adminScopeType, bytes32 adminScopeId) = IRoleManagement(address(this)).roleGetScope(requestAdminRole);
          require(bs.stype <= adminScopeType, "Illegal Type Admin ScopeType");

        } else if(ba.atype == AgentType.ROLE) {
          require(IAccessControl(address(this)).isRoleExistedInTypeMasterType(requests[i].adminId), "Illegal Type Admin Role");
          (ScopeType adminScopeType, bytes32 adminScopeId) = IRoleManagement(address(this)).roleGetScope(requests[i].adminId);
          require(bs.stype <= adminScopeType, "Illegal Type Admin ScopeType");

        } else if(ba.atype == AgentType.TYPE) {
          require(IAccessControl(address(this)).getTypeMasterId() == requests[i].adminId, "Illegal Type Admin ID");

        } else {
          revert ("Invalid Type Admin ID");
        } 
      } else {
        // TODO global agent admin role  must be set
      }
     
      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Type Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Type Alterability");

      // check group ID scope
      (ScopeType groupScopeType, bytes32 groupScopeId) = ITypeManagement(address(this)).typeGetScope(requests[i].groupId);
      require(groupScopeType >= bs.stype, "Illegal Group ScopeType");
      if (groupScopeType == bs.stype) {
        require(groupScopeId == requests[i].scopeId, "Illegal Group ScopeType");
      } else {
        require(IAccessControl(address(this)).isScopeExistedInAnotherScope(groupScopeId, requests[i].scopeId), "Illegal Group ScopeId");
      }

      IGroupManagement(address(this)).groupAddType(requests[i].groupId, newTypeId);

      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      newType.groupId = requests[i].groupId;
      newType.scopeId = requests[i].scopeId;
      newType.adminId = requests[i].adminId;
      newType.roleLimit = requests[i].roleLimit;
      newType.memberLimit = requests[i].memberLimit;
      newType.name = requests[i].name;

      emit TypeRegistered(
        msg.sender,
        newTypeId,
        requests[i].name,
        requests[i].scopeId,
        requests[i].groupId,
        requests[i].memberLimit,
        requests[i].roleLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }
  }

  function typeAddRole(bytes32 typeId, bytes32 roleId) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeAddRole.selector), "Access Denied");
  }

  function typeRemoveRole(bytes32 typeId, bytes32 roleId) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeRemoveRole.selector), "Access Denied");
  }

  function typeAddRoles(TypeAddRolesRequest[] calldata requests) external returns (bool) {

  }

  function typeRemoveRoles(TypeRemoveRolesRequest[] calldata requests) external returns (bool) {

  }


  function typeAddMembers(TypeAddMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeAddMembers.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(this.typeHasRole(requests[i].typeId, requests[i].roleId), "Role Not Found");
      TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
      for(uint j = 0; j < requests[i].members.length; j++) {
        require(!this.typeHasMember(requests[i].typeId, requests[i].members[j]), "Member Already Exist");        
        te.members[requests[i].members[j]] = requests[i].roleId;
        emit TypeRoleMemberGranted(msg.sender, requests[i].typeId, requests[i].roleId, requests[i].members[j]);
      }
      te.totalMember += requests[i].members.length;
      require(te.totalMember <= te.memberLimit, "Illegal Increase Type Members");
      IRoleManagement(address(this)).roleIncreaseMember(requests[i].roleId, requests[i].members.length);
    }
    return true;
  }

  function typeRemoveMembers(TypeRemoveMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeAddMembers.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(this.typeHasRole(requests[i].typeId, requests[i].roleId), "Role Not Found");
      TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
      for(uint j = 0; j < requests[i].members.length; j++) {
        require(this.typeHasMember(requests[i].typeId, requests[i].members[j]), "Member Not Found");        
        delete te.members[requests[i].members[j]];
        emit TypeRoleMemberRevoked(msg.sender, requests[i].typeId, requests[i].roleId, requests[i].members[j]);
      }
      require(te.totalMember >= requests[i].members.length, "Illegal Decerase Type Members");
      unchecked {
        te.totalMember -= requests[i].members.length;
      }    
      IRoleManagement(address(this)).roleIncreaseMember(requests[i].roleId, requests[i].members.length);
    }
    return true;
  }

  function typeUpdateScope(TypeUpdateScopeRequest[] calldata requests) external returns (bool) {
    revert("Not Supported");
  }
 
  function typeUpdateActivityStatus(TypeUpdateActivityRequest[] calldata requests) external returns (bool) {

  }

  function typeUpdateAlterabilityStatus(TypeUpdateAlterabilityRequest[] calldata requests) external returns (bool) {

  }

  function typeUpdateRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {

  }

  // if think should be same realm needed to change type group
  function typeUpdateGroup(TypeUpdateGroupRequest[] calldata requests) external returns (bool) {

  }

  function typeCheckId(bytes32 typeId) external view returns (bool) {

  }

  function typeCheckName(string calldata typeName) external view returns (bool) {

  }

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool) {

  }

  function typeHasMember(bytes32 typeId, bytes32 memberId) external view returns (bool) {

  }

  function typeHasAgent(bytes32 typeId, bytes32 agentId) external view returns (bool) {

  }

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool) {

  }

  function typeGetAccountRole(bytes32 typeId, address account) external view returns (bytes32) {

  }

  function typeGetMemberRole(bytes32 typeId, bytes32 memberId) external view returns (bytes32) {

  }

  function typeGetRoleLimit(bytes32 typeId) external view returns (uint8) {

  }

  function typeGetActivityStatus(bytes32 typeId) external view returns (ActivityStatus) {

  }

  function typeGetAlterabilityStatus(bytes32 typeId) external view returns (AlterabilityStatus) {

  }

  function typeGetName(bytes32 typeId) external view returns (string memory) {

  }

  function typeGetScope(bytes32 typeId) external view returns (ScopeType stype, bytes32) {

  }

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory) {

  }

  function typeGetRolesCount(bytes32 typeId) external view returns (uint8) {

  }

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory) {

  }

  function typeGenerateId(string calldata) external pure returns (bytes32) {

  }

}