// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRoleManagement.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract RoleManager is AclStorage, IRoleManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // type admins can call roleRegister function
  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    // address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    // require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleRegister.selector), "Access Denied");

    bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.roleRegister.selector);
    bytes32 senderRole;
    (bytes32 adminId, AgentType atype) = IFunctionManagement(address(this)).functionGetAdmin(functionId);    
    if(atype == AgentType.TYPE) {
      senderRole = ITypeManagement(address(this)).typeGetAccountRole(adminId, msg.sender);
      require(senderRole != bytes32(0), "Operation Not Permitted");
    } else if(atype == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(adminId, msg.sender), "Operation Not Permitted");      
      senderRole = adminId;
    } else {
      revert("Invalid Function AdminId");
    }

    (ScopeType senderScopeType, bytes32 senderScopeId) = IRoleManagement(address(this)).roleGetScope(senderRole);
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRoleId = keccak256(abi.encodePacked(requests[i].name));
      require(!this.roleCheckIdExistance(newRoleId), "Role Already Exist");
      // if(requests[i].adminId != bytes32(0)) {
      //   BaseAgent storage ba = _data.agents[requests[i].adminId];
      //   require(ba.atype == AgentType.MEMBER || ba.atype == AgentType.ROLE, "Illegal Role Admin AgentType");        
      // } else {
      //   // TODO global agent admin role  must be set
      // }

      BaseScope storage bs = _data.scopes[requests[i].scopeId];
      require(bs.stype != ScopeType.NONE , "Role ScopeId Not Found");
      require(bs.stype <= senderScopeType, "Illegal Role ScopeType");
      if(bs.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Role ScopeId");
      }

      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Role Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Role Alterability");

      (ScopeType typeScopeType, bytes32 typeScopeId) = ITypeManagement(address(this)).typeGetScope(requests[i].typeId);
      require(typeScopeType >= bs.stype, "Illegal Role Type ScopeType");
      if (typeScopeType == bs.stype) {
        require(typeScopeId == requests[i].scopeId, "Illegal Role Type ScopeType");
      } else {
        require(IAccessControl(address(this)).isScopeExistedInAnotherScope(typeScopeId, requests[i].scopeId), "Illegal Role Type ScopeId");
      }
    
      // add role to type 
      // check policy in typeAddRole
      ITypeManagement(address(this)).typeAddRole(requests[i].typeId, newRoleId);
        
      // if(groupScopeType == ScopeType.CONTEXT) {
      //   require(IContextManagement(address(this)).contextHasFunction(groupScopeId, requests[i].scopeId), "Illegal Role Group ScopeId");
      // } else if(groupScopeType == ScopeType.REALM) {
      //   require(IRealmManagement(address(this)).contextHasFunction(groupScopeId, requests[i].scopeId), "Illegal Role Group ScopeId");
      // }
      // TODO check compatibility group scope id with new role scope id


      // TODO check requests[i].policyId
      RoleEntity storage newRole = _data.roleWriteSlot(newRoleId);
      newRole.adminId = requests[i].adminId;
      newRole.ba = BaseAgent({
        atype: AgentType.ROLE, 
        acstat: requests[i].acstat,
        alstat: requests[i].alstat 
      });
      newRole.name = requests[i].name;
      newRole.scopeId = requests[i].scopeId;
      // TODO checking limitation
      newRole.memberLimit = requests[i].memberLimit;
      newRole.typeId = requests[i].typeId;

      // IMemberManagement.MemberUpdateRolesRequest[] memberUpateRoles = new IMemberManagement.MemberUpdateRolesRequest[](requests[i].members.length);
      // for (uint j = 0; j < requests[i].members.length && j < newRole.memberLimit; j++) {
      //   require(IMemberManagement(address(this)).memberCheckExistance(requests[i].members[j]), "Member Not Found");
      //   newRole.members.add(requests[i].members[j]);
      //   memberUpateRoles[j].memberId = requests[i].members[j];
      //   memberUpateRoles[j].roles[0] = newRoleId;        
      // }
      // IMemberManagement(address(this)).memberAddRoles(memberUpateRoles);

      ITypeManagement(address(this)).typeAddRole(requests[i].typeId, newRoleId);
      emit RoleRegistered(
        msg.sender,
        newRole.typeId,  
        newRoleId, 
        newRole.name,
        newRole.scopeId, 
        newRole.memberLimit,
        newRole.ba.acstat, 
        newRole.ba.alstat
      );
    }
  }

  function roleIncreaseMember(bytes32 roleId, uint32 count) external returns (uint32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleIncreaseCountMember.selector), "Access Denied");
    RoleEntity storage role = _data.roleReadSlot(roleId);
    role.totalMember += count;
    require(role.totalMember <= role.roleLimit, "Illegal Role Member Count");
    emit RoleMemberIncreased(msg.sender, roleId, role.totalMember);
    return role.totalMember;    
  }

  function roleDecreaseMember(bytes32 roleId, uint32 count) external returns (uint32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleDecreaseCountMember.selector), "Access Denied");
    RoleEntity storage role = _data.roleReadSlot(roleId);
    require(role.totalMember >= count, "Illegal Role Member Count");
    unchecked {
      role.totalMember -= count;
    }
    emit RoleMemberDecreased(msg.sender, roleId, role.totalMember);
    return role.totalMember;
  }

  function roleIncreaseMembers(RoleIncreaseMemberCountRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleIncreaseCountMembers.selector), "Access Denied");
    for (uint i = 0; index < requests.length; i++) {
      RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
      role.totalMember += requests[i].count;
      require(role.totalMember <= role.roleLimit, "Illegal Role Member Count");
      emit RoleMemberDecreased(msg.sender, requests[i].roleId, role.totalMember);
    }
    return true;
  }

  function roleDecreaseMembers(RoleDecreaseMemberCountRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleDecreaseCountMembers.selector), "Access Denied");
    for (uint i = 0; index < requests.length; i++) {
      RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
      require(role.totalMember >= requests[i].count, "Illegal Role Member Count");
      unchecked {
        role.totalMember -= requests[i].count;
      }
      emit RoleMemberDecreased(msg.sender, requests[i].roleId, role.totalMember);
    }
    return true;
  }

  function roleUpdateAdmin(RoleUpdateAdminRequest[] calldata requests) external returns (bool) {
    revert("Not Supported");
    // require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    // require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateAdmin.selector), "Access Denied");
    // for (uint i = 0; index < requests.length; i++) {
    //   RoleEntity storage re = _data.roleReadSlot(requests[i].roleId);
      
    // }
    // return true;
  }

  function roleUpdateScope(RoleUpdateScopeRequest[] calldata requests) external returns (bool) {
    revert("Not Supported");
  }
 
  function roleUpdateActivityStatus(RoleUpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateActivityStatus.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].roleId].atype == AgentType.ROLE, "Invalid RoleId Slot");
      require(_data.agents[requests[i].roleId].alstat >= AlterabilityStatus.UPDATABLE, "Role Update Disabled");
      _data.agents[requests[i].roleId].acstat = requests[i].acstat;
      emit RoleActivityUpdated(msg.sender, requests[i].roleId, requests[i].acstat);      
    }
    return true;
  }

  function roleUpdateAlterabilityStatus(RoleUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateAlterabilityStatus.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].roleId].atype == AgentType.ROLE, "Invalid RoleId Slot");
      _data.agents[requests[i].roleId].alstat = requests[i].alstat;
      emit RoleAlterabilityUpdated(msg.sender, requests[i].roleId, requests[i].alstat);
    }
    return true;
  }

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateTypeLimit.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
      require(role.ba.alstat >= AlterabilityStatus.UPDATABLE, "Role Update Disabled");
      role.memberLimit = requests[i].memberLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].roleId, requests[i].memberLimit);
    }
    return true;
  }

  function roleCheckIdExistance(bytes32 roleId) external view returns (bool) {
    return _data.agents[roleId].atype == AgentType.ROLE;
  }

  function roleCheckNameExistance(string calldata roleName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return ITypeManagement(re.typeId).typeGetAccountRole(typeId, agentId) == roleId;
  }

  function roleHasMember(bytes32 roleId, bytes32 memberId) external view returns (bool) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return ITypeManagement(re.typeId).typeGetMemberRole(typeId, agentId) == roleId;
  }

  function roleGetMemberLimit(bytes32 roleId) external view returns (uint24) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.memberLimit;
  }

  function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.ba.acstat;
  }

  function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.ba.alstat;
  }

  function roleGetName(bytes32 roleId) external view returns (string memory) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.name;
  }

  function roleGetScope(bytes32 roleId) external view returns (bytes32, ScopeType) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.scopeId;
  }

  function roleGetType(bytes32 typeId) external view returns (bytes32) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return re.typeId;
  }

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) {
      return RoleInfo ({
        scopeId: bytes32(0),
        typeId: bytes32(0),
        memberLimit: 0,
        name: "",
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }
    return RoleInfo ({
      scopeId: re.scopeId,
      typeId: re.typeId,
      memberLimit: re.memberLimit,
      name: re.name,
      acstat: re.ba.acstat,
      alstat: re.ba.alstat
    });
  }

  function roleGenerateId(string calldata name) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }
}