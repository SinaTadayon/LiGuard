// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IRoleManagement.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "./AgentCommons.sol";
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
contract RoleManager is AgentCommons, IRoleManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // type admins can call roleRegister function
  function roleRegister(RoleRegisterRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
    // require(IAccessControl(address(this)).hasCSAccess(address(this), IRoleManagement.roleRegister.selector), "Access Denied");



    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    (ScopeType senderScopeType, bytes32 senderScopeId) = _doGetScopeInfo(memberId);    
    address functionFacetId = _data.interfaces[type(IRoleManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IRoleManagement.roleRegister.selector);    
    for(uint i = 0; i < requests.length; i++) {
      bytes32 newRoleId = LAclUtils.generateId(requests[i].name);
      require(_data.agents[roleId].atype == AgentType.NONE, "Role Already Exist");

      // checking requested role scope
      BaseScope storage requestRoleScope = _data.scopes[requests[i].scopeId];
      require(requestRoleScope.stype != ScopeType.NONE , "Scope ID Not Found");
      require(requestRoleScope.stype <= senderScopeType, "Illegal Role Scope Type");
      // if(requestRoleScope.stype == senderScopeType) {
      //   require(requests[i].scopeId == senderScopeId, "Illegal Role Scope ID");
      // } else {
      //   require(IAccessControl(address(this)).isScopesCompatible(senderScopeId, requests[i].scopeId), "Illegal Role Scope ID");
      // }

      // checking requested role type scope with role scope
      (ScopeType requestTypeScopeType, bytes32 requestTypeScopeId) = _doGetScopeInfo(requests[i].typeId);
      require(requestTypeScopeType >= requestRoleScope.stype, "Illegal Type Scope");
      if (requestTypeScopeType == requestRoleScope.stype) {
        require(requestTypeScopeId == requests[i].scopeId, "Illegal Type Scope ID");
      } else {
        require(IAccessControl(address(this)).isScopesCompatible(requestTypeScopeId, requests[i].scopeId), "Illegal Type Scope ID");
      }

      // checking requested type scope with sender scope
      require(requestTypeScopeType <= senderScopeType, "Illegal Type, Sender ScopeType");

      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Role Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Role Alterability");

      // add role to type 
      // check policy in typeAddRole
      TypeEntity storage te = _data.typeReadSlot(requests[i].typeId);
      te.roles.add(newRoleId);

      // TODO check requests[i].policyId
      RoleEntity storage newRole = _data.roleWriteSlot(newRoleId);
       
      // checking requested role admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage ba = _data.agents[requests[i].adminId];
        require(ba.atype > AgentType.MEMBER, "Illegal Admin Role AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetScopeInfo(requests[i].adminId);
        if(ba.atype == AgentType.Role) {
          require(requestRoleBaseScope <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(requestRoleBaseScope == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope ID");
          } else {
            require(IAccessControl(address(this)).isScopesCompatible(requestAdminScopeId, requests[i].scopeId), "Illegal Role Scope ID");
          }
        } else {
          require(requests[i].typeId == requests[i].adminId, "Illegal Admin ID");
          newRole.adminId = requests[i].adminId;
        }      
      } else {
        newRole.ba.adminId = requests[i].typeId;
      }
      
      newRole.ba.atype = AgentType.ROLE;
      newRole.ba.acstat = requests[i].acstat;
      newRole.ba.alstat = requests[i].alstat;
      newRole.name = requests[i].name;
      newRole.scopeId = requests[i].scopeId;
      newRole.memberLimit = requests[i].memberLimit;
      newRole.memberTotal = 0;
      newRole.typeId = requests[i].typeId;
      emit RoleRegistered(
        msg.sender,
        newRoleId,
        newRole.typeId, 
        newRole.name,
        newRole.ba.adminId,
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
    
    // check admin role
    require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

    RoleEntity storage role = _data.roleReadSlot(roleId);
    role.totalMember += count;
    require(role.totalMember <= role.roleLimit, "Illegal Role Member Count");
    emit RoleMemberIncreased(msg.sender, roleId, role.totalMember);
    return role.totalMember;    
  }

  function roleDecreaseMember(bytes32 roleId, uint32 count) external returns (uint32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleDecreaseCountMember.selector), "Access Denied");

    // check admin role
    require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

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
      // check admin role  
      require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

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
      // check admin role
      require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");
  
      RoleEntity storage role = _data.roleReadSlot(requests[i].roleId);
      require(role.totalMember >= requests[i].count, "Illegal Role Member Count");
      unchecked {
        role.totalMember -= requests[i].count;
      }
      emit RoleMemberDecreased(msg.sender, requests[i].roleId, role.totalMember);
    }
    return true;
  }

  function roleUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].memberId);
      require(role.ba.alstat >= AlterabilityStatus.UPDATABLE, "Role Update Disabled");

      // check admin role
      require(_doRoleCheckAdmin(requests[i].roleId, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {        
        (ScopeType roleScopeType, bytes32 roleScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].id);
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER && adminBaseAgent.atype <= AgentType.ROLE, "Illegal Admin AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].adminId);
        require(roleScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(typeScopeType == requestAdminScopeType) {
          require(requestAdminScopeId == roleScopeId, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, roleScopeId), "Illegal Admin Scope ID");
        }
        roleEntity.ba.adminId = requests[i].adminId;

      } else {
        roleEntity.ba.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit RoleAdminUpdated(msg.sender, requests[i].roleId, requests[i].adminId);
    }
    return true;
  }
 
  // function roleUpdateActivityStatus(RoleUpdateActivityRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateActivityStatus.selector), "Access Denied");

  //   for(uint i = 0; i < requests.length; i++) {      
  //     require(_data.agents[requests[i].id].atype == AgentType.ROLE, "Invalid RoleId Slot");
  //     require(_data.agents[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Role Update Disabled");

  //     // check admin role
  //     require(_doRoleCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

  //     _data.agents[requests[i].id].acstat = requests[i].acstat;
  //     emit RoleActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);      
  //   }
  //   return true;
  // }

  // function roleUpdateAlterabilityStatus(RoleUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateAlterabilityStatus.selector), "Access Denied");

  //   for(uint i = 0; i < requests.length; i++) {
  //     // check admin role
  //     require(_doRoleCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

  //     require(_data.agents[requests[i].id].atype == AgentType.ROLE, "Invalid RoleId Slot");
  //     _data.agents[requests[i].id].alstat = requests[i].alstat;
  //     emit RoleAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
  //   }
  //   return true;
  // }

  function roleUpdateMemberLimit(RoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateMemberLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin role
      require(_doRoleCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      RoleEntity storage role = _data.roleReadSlot(requests[i].id);
      require(role.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Role");
      role.memberLimit = requests[i].memberLimit;
      emit RoleTypeLimitUpdated(msg.sender, requests[i].id, requests[i].memberLimit);
    }
    return true;
  }

  function roleCheckId(bytes32 roleId) external view returns (bool) {
    return _data.agents[roleId].atype == AgentType.ROLE;
  }

  function roleCheckName(string calldata roleName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function roleCheckAdminAccount(bytes32 roleId, address account) external view returns (bool) {
    return _doRoleCheckAdmin(roleId, keccak256(abi.encodePacked(account)));
  }

  function _doRoleCheckAdmin(bytes32 roleId, address account) internal view returns (bool) {
    if (_data.agents[roleId].atype != AgentType.ROLE) return false;    
    
    bytes32 roleAdminId = _data.agents[roleId].adminId;
    AgentType adminAgenType = _data.agents[roleAdminId].atype;
    if(adminAgenType == AgentType.MEMBER) {
      return msg.sender == roleAdminId;

    } else if(adminAgenType == AgentType.ROLE) {
      return _doRoleHasAccount(roleAdminId, msg.sender);
    } 
  
    return false;
  }

  function roleHasAccount(bytes32 roleId, address account) external view returns (bool) {
    return _doRoleHasAccount(roleId, account);
  }

  function _doRoleHasAccount(bytes32 roleId, address account) internal view returns (bool) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return ITypeManagement(re.typeId).typeGetAccountRole(typeId, agentId) == roleId;
  }

  function roleHasMember(bytes32 roleId, bytes32 memberId) external view returns (bool) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) return false;
    return ITypeManagement(re.typeId).typeGetMemberRole(typeId, agentId) == roleId;
  }

  // function roleGetMemberLimit(bytes32 roleId) external view returns (uint24) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.memberLimit;
  // }

  // function roleGetActivityStatus(bytes32 roleId) external view returns (ActivityStatus) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.acstat;
  // }

  // function roleGetAlterabilityStatus(bytes32 roleId) external view returns (AlterabilityStatus) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.alstat;
  // }

  // function roleGetName(bytes32 roleId) external view returns (string memory) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.name;
  // }

  // function roleGetScope(bytes32 roleId) external view returns (ScopeType, bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return (_data.scopes[re.scopeId].stype, re.scopeId);
  // }

  // function roleGetType(bytes32 typeId) external view returns (bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.typeId;
  // }

  // function roleGetAdmin(bytes32 roleId) external view returns (bytes32) {
  //   (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
  //   if(!result) return false;
  //   return re.ba.adminId;
  // }

  function roleGetInfo(bytes32 roleId) external view returns (RoleInfo memory) {
    (IAclCommons.RoleEntity storage re, bool result) = _data.roleTryReadSlot(roleId);
    if(!result) {
      return RoleInfo ({
        scopeId: bytes32(0),
        typeId: bytes32(0),
        adminId: bytes32(0),
        memberLimit: 0,
        memberTotal: 0,
        name: "",
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }
    return RoleInfo ({
      scopeId: re.scopeId,
      typeId: re.typeId,
      adminId: re.ba.adminId,
      memberLimit: re.memberLimit,
      memberTotal: re.memberTotal,
      name: re.name,
      acstat: re.ba.acstat,
      alstat: re.ba.alstat
    });
  }

  // function roleGenerateId(string calldata name) external pure returns (bytes32) {
  //   return keccak256(abi.encodePacked(name));
  // }
}