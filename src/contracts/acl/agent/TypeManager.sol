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
// import "../../lib/struct/LEnumerableMap.sol";
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
  // using LEnumerableSet for LEnumerableMap.Bytes32ToBytes32Map;

  function typeRegister(TypeRegisterRequest[] calldata requests) external returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    // require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleRegister.selector), "Access Denied");
    (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(msg.sender);
    require(senderScopeType != ScopeType.NONE, "Access Denied");
    
    address functionFacetId = _data.interfaces[type(IFunctionManagement).interfaceId];
    bytes32 functionId = IFunctionManagement(address(this)).functionGenerateIdWithContract(functionFacetId, this.roleRegister.selector);
    (AgentType functionAgentType, bytes32 functionAgentId) = IFunctionManagement(address(this)).functionGetAgent(functionId);
    if(functionAgentType == AgentType.ROLE) {
      require(IRoleManagement(address(this)).roleHasAccount(functionAgentId, msg.sender), "Operation Not Permitted");      

    } else if (functionAgentType == AgentType.MEMBER) {
      require(msg.sender == functionAgentId, "Operation Not Permitted");
    } 

    for(uint i = 0; i < requests.length; i++) {
      bytes32 newTypeId = keccak256(abi.encodePacked(requests[i].name));
      require(_data.agents[newTypeId].atype == AgentType.NONE, "Type Already Exists");

      // checking requested type scope
      BaseScope storage requestTypeBaseScope = _data.scopes[requests[i].scopeId];
      require(requestTypeBaseScope.stype != ScopeType.NONE , "Type ScopeId Not Found");
      require(requestTypeBaseScope.stype <= senderScopeType, "Illegal Type ScopeType");
      if(requestTypeBaseScope.stype == senderScopeType) {
        require(requests[i].scopeId == senderScopeId, "Illegal Type Scope ID");
      } else {
        require(IAccessControl(address(this)).isScopeExistedInAnotherScope(senderScopeId, requests[i].scopeId), "Illegal Type Scope ID");
      }

      // // checking requested role group scope with type scope
      // (ScopeType requestGroupScopeType, bytes32 requestGroupScopeId) = IGroupManagement(address(this)).groupGetScope(requests[i].groupId);
      // require(requestGroupScopeType >= requestTypeBaseScope.stype, "Illegal Group ScopeType");
      // if (requestGroupScopeType == requestTypeBaseScope.stype) {
      //   require(requestGroupScopeId == requests[i].scopeId, "Illegal Group Scope ID");
      // } else {
      //   require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestGroupScopeId, requests[i].scopeId), "Illegal Group Scope ID");
      // }

      // // checking requested group type scope with sender scope
      // require(requestGroupScopeType <= senderScopeType, "Illegal Group, Sender ScopeType");

      require(requests[i].acstat != ActivityStatus.NONE, "Invalid Role Activity");
      require(requests[i].alstat != AlterabilityStatus.NONE, "Invalid Role Alterability");

      // add role to type 
      // check policy in typeAddRole
      GroupEntity storage ge = _data.writeGroupSlot(requests[i].groupId);
      ge.types.add(newTypeId);
     
      // create new type
      TypeEntity storage newType = _data.typeWriteSlot(newTypeId);

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER && adminBaseAgent.atype <= AgentType.TYPE, "Illegal Admin Type AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].adminId);
        if(adminBaseAgent.atype != AgentType.TYPE) {
          require(requestTypeBaseScope <= requestAdminScopeType, "Illegal Admin Scope Type");
          if(requestTypeBaseScope == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].scopeId, "Illegal Amind Scope ID");
          } else {
            require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, requests[i].scopeId), "Illegal Admin Scope ID");
          }
        } 
        newType.ba.adminId = requests[i].adminId;
      } else {
        newType.ba.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }
      
      newType.ba.acstat = requests[i].acstat;
      newType.ba.alstat = requests[i].alstat;
      // newType.groupId = requests[i].groupId;
      newType.scopeId = requests[i].scopeId;
      newType.adminId = requests[i].adminId;
      newType.roleLimit = requests[i].roleLimit;
      newType.memberLimit = requests[i].memberLimit;
      newType.memberTotal = 0;
      newType.name = requests[i].name;

      emit TypeRegistered(
        msg.sender,
        newTypeId,
        requests[i].scopeId,
        // requests[i].groupId,
        requests[i].name,
        requests[i].adminId,                
        requests[i].memberLimit,
        requests[i].roleLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }
  }

  function typeAddMembers(TypeAddMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeAddMembers.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      // check admin of type
      require(_doTypeCheckAdminAccount(requests[i].typeId, msg.sender), "Operation Not Permitted");
  
      TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
      require(te.roles.contains(roleId), "Role Not Found");
      
      for(uint j = 0; j < requests[i].members.length; j++) {
        require(te.members[requests[i].members[j]] == bytes32(0), "Member Already Exist");
        te.members[requests[i].members[j]] = requests[i].roleId;

        MemberEntity storage me = _data.memberWriteSlot(requests[i].members[j]);
        require(me.typeLimit > me.types.length() + 1, "Illegal Increase Member Types");  
        me.types.add(requests[i].types[j]);

        emit TypeRoleMemberGranted(msg.sender, requests[i].typeId, requests[i].roleId, requests[i].members[j]);
      }
      te.memberTotal += requests[i].members.length;
      require(te.memberTotal <= te.memberLimit, "Illegal Increase Type Members");
      IRoleManagement(address(this)).roleIncreaseMember(requests[i].roleId, requests[i].members.length);
    }
    return true;
  }

  function typeRemoveMembers(TypeRemoveMembersRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeRemoveMembers.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      // check admin of type
      require(_doTypeCheckAdminAccount(requests[i].typeId, msg.sender), "Operation Not Permitted");

      TypeEntity storage te = _data.typeWriteSlot(requests[i].typeId);
      require(te.roles.contains(roleId), "Role Not Found");      
      for(uint j = 0; j < requests[i].members.length; j++) {
        require(te.members[requests[i].members[j]] != bytes32(0), "Member Not Found");      
        delete te.members[requests[i].members[j]];

        MemberEntity storage me = _data.memberWriteSlot(requests[i].members[j]);
        me.types.remove(requests[i].types[j]);

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

  function typeUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeUpdateAdmin.selector), "Access Denied");
    
    for(uint i = 0; i < requests.length; i++) {
      TypeEntity storage typeEntity = _data.typeReadSlot(requests[i].id);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Type");
      require(_doTypeCheckAdminAccount(requests[i].id, msg.sender), "Operation Not Permitted");

      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {        
        (ScopeType typeScopeType, bytes32 typeScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].id);
        BaseAgent storage adminBaseAgent = _data.agents[requests[i].adminId];
        require(adminBaseAgent.atype >= AgentType.MEMBER && adminBaseAgent.atype <= AgentType.ROLE, "Illegal Admin Type AgentType");
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].adminId);
        require(typeScopeType <= requestAdminScopeType, "Illegal Admin Scope Type");

        if(typeScopeType == requestAdminScopeType) {
          require(requestAdminScopeId == typeScopeId, "Illegal Amind Scope ID");
        } else {
          require(IAccessControl(address(this)).isScopeExistedInAnotherScope(requestAdminScopeId, typeScopeId), "Illegal Admin Scope ID");
        }
        typeEntity.ba.adminId = requests[i].adminId;

      } else {
        typeEntity.ba.adminId = IAccessControl(address(this)).getAgentMasterTypeId();
      }

      emit TypeAdminUpdated(msg.sender, requests[i].typeId, requests[i].adminId);
    }
    return true;
  }

  function typeUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeUpdateActivityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {      
      require(_data.agents[requests[i].id].atype == AgentType.TYPE, "Invalid Type ID Slot");
      require(_data.agents[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Type");

      // check admin type
      require(_doTypeCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      _data.agents[requests[i].id].acstat = requests[i].acstat;
      emit TypeActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function typeUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin role
      require(_doTypeCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      require(_data.agents[requests[i].id].atype == AgentType.ROLE, "Invalid Type ID Slot");
      _data.agents[requests[i].id].alstat = requests[i].alstat;
      emit TypeAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function typeUpdateRoleLimit(TypeUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleUpdateMemberLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin type
      require(_doTypeCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      TypeEntity storage te = _data.typeReadSlot(requests[i].id);
      require(te.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Type");
      te.roleLimit = requests[i].roleLimit;
      emit TypeRoleLimitUpdated(msg.sender, requests[i].id, requests[i].roleLimit);
    }
    return true;
  }

  function typeUpdateMemberLimit(TypeUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.typeUpdateMemberLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      // check admin type
      require(_doTypeCheckAdmin(requests[i].id, msg.sender), "Operation Not Permitted");

      TypeEntity storage te = _data.typeReadSlot(requests[i].id);
      require(te.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update Type");
      te.memberLimit = requests[i].memberLimit;
      emit TypeMemberLimitUpdated(msg.sender, requests[i].id, requests[i].memberLimit);
    }
    return true;
  }
 
  function typeCheckId(bytes32 typeId) external view returns (bool) {
    return _data.agents[typeId].atype == AgentType.TYPE;
  }

  function typeCheckName(string calldata typeName) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(typeName))].atype == AgentType.TYPE;
  }

  function typeCheckAdminAccount(bytes32 typeId, address account) external view returns (bool) {
    return _doTypeCheckAdminAccount(typeId, account);
  }

  function _doTypeCheckAdminAccount(bytes32 typeId, address account) internal view returns (bool) {

    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    if (te.ba.atype != AgentType.TYPE) return false;    
    
    bytes32 typeAdminId = te.ba.adminId;
    AgentType adminAgentType = _data.agents[typeAdminId].atype;
    if(adminAgenType == AgentType.MEMBER) {
      return account == typeAdminId;

    } else if(adminAgenType == AgentType.ROLE || adminAgenType == AgentType.TYPE) {
      return te.members[keccak256(abi.encodePacked(account))] != bytes32(0);
    } 
  
    return false;
  }

  function typeHasAccount(bytes32 typeId, address account) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[keccak256(abi.encodePacked(account))] != bytes32(0);
  }

  function typeHasMember(bytes32 typeId, bytes32 memberId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[memberId] != bytes32(0);
  }

  function typeHasAgent(bytes32 typeId, bytes32 agentId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    BaseAgent storage ba = _data.agents[agentId];
    if(ba.atype == AgentType.NONE) return false;
    else if (ba.atype == AgentType.MEMBER) return te.members[agentId] != bytes32(0);
    else if (ba.atype == AgentType.ROLE) return te.roles.contains(roleId);
    else return false;
  }

  function typeHasRole(bytes32 typeId, bytes32 roleId) external view returns (bool) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.contains(roleId);
  }

  function typeGetAccountRole(bytes32 typeId, address account) external view returns (bytes32) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.members[keccak256(abi.encodePacked(account))];
  }

  function typeGetRoleLimit(bytes32 typeId) external view returns (uint8) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roleLimit;
  }

  function typeGetActivityStatus(bytes32 typeId) external view returns (ActivityStatus) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.ba.acstat;
  }

  function typeGetAlterabilityStatus(bytes32 typeId) external view returns (AlterabilityStatus) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.ba.alstat;
  }

  function typeGetName(bytes32 typeId) external view returns (string memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.name;
  }

  function typeGetAdminId(bytes32 typeId) external view returns (bytes32) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.adminId;
  }

  // function typeGetGroupId(bytes32 typeId) external view returns (bytes32) {
  //   (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
  //   if(!result) return false;
  //   return te.groupId;
  // }

  function typeGetScopeId(bytes32 typeId) external view returns (ScopeType stype, bytes32) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return (_data.scopes[te.scopeId].stype, te.scopeId);
  }

  function typeGetMembersCount(bytes32 typeId) external view returns (uint32) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.memberTotal;
  }

  function typeGetRoles(bytes32 typeId) external view returns (bytes32[] memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.values();
  }

  function typeGetRolesCount(bytes32 typeId) external view returns (uint8) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) return false;
    return te.roles.length();
  }

  function typeGetInfo(bytes32 typeId) external view returns (TypeInfo memory) {
    (TypeEntity storage te, bool result) = _data.typeTryReadSlot(typeId);
    if(!result) {
    return TypeInfo ({
        scopeId: bytes32(0),
        // groupId: bytes32(0),
        adminId: bytes32(0),
        memberLimit: 0,
        memberTotal: 0,
        roleLimit: 0,
        roleTotal: 0,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE,
        name: ""
      });
    }

    return TypeInfo ({
      scopeId: te.scopeId,
      // groupId: te.groupId,
      adminId: te.adminId,
      memberLimit: te.memberLimit,
      memberTotal: te.memberTotal,
      roleLimit: te.roleLimit,
      roleTotal: te.roles.length(),
      acstat: te.ba.acstat,
      alstat: te.ba.alstat,
      name: te.name
    });
  }

  function typeGenerateId(string calldata name) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }
}