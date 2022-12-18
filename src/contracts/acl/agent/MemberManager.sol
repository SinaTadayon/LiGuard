// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "./AgentCommons.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract MemberManager is AclStorage, IMemberManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // Note: called by member has joined to ACL 
  function memberRegister(MemberRegister[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberRegister.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newMemberId = LAclUtils.accountGenerateId(requests[i].account);
      require(_data.agents[newMemberId].acstat == ActivityStatus.NONE, "Account Already Exists");
      require(requests[i].typeLimit >= 1, "Illegal TypeLimit");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity status");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability status");

      // check role
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role is Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");

      // check type 
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type is Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");

      // check access
      require(_doAgentCheckAdminAccess(typeEntity.ba.adminId, memberId, functionId), "Operation Not Permitted");
      // require(IAccessControl(address(this)).hasMemberAccessToAgent(typeEntity.ba.admin, functionId, memberId), "Access Denied");

      // add new member to type
      typeEntity.members[newMemberId] = requests[i].roleId;

      // create new member
      MemberEntity storage newMember = _data.memberWriteSlot(newMemberId);
      newMember.ba.adminId = LIVELY_VERSE_ADMIN_TYPE_ID;
      newMember.ba.atype = AgentType.MEMBER;
      newMember.ba.acstat = requests[i].acstat;
      newMember.ba.alstat = requests[i].alstat;
      newMember.ba.referredByPolicy = 0;
      newMember.ba.referredByScope = 0;
      newMember.account = requests[i].account;
      newMember.types.add(roleEntity.typeId);

      emit MemberRegistered(
        msg.sender,
        newMemberId,
        requests[i].account,
        requests[i].roleId,
        requests[i].typeLimit,
        requests[i].acstat,
        requests[i].alstat
      );
    }

    return true;
  }

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
     require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberUpdateActivityStatus.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i].id];      
      require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");
      require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity Status");
      baseAgent.acstat = requests[i].acstat;
      emit MemberActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;  
  }

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    
    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberUpdateAlterabilityStatus.selector); 
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied"); 

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      BaseAgent storage baseAgent = _data.agents[requests[i].id];
      // require(baseAgent.acstat > ActivityStatus.DELETED, "Agent is Deleted");
      require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");
    
      baseAgent.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i], requests[i].alstat);
    }
    return true;
  }

  // Note: member default admin is 
  function memberUpdateAdmin(MemberUpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberUpdateAdmin.selector);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      BaseAgent storage baseAgent = _data.agents[requests[i].id];
      require(baseAgent.acstat > ActivityStatus.DELETED, "Member is Deleted");
      require(baseAgent.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Agent Update");
      require(_doAgentCheckAdminAccess(baseAgent.adminId, memberId, functionId), "Operation Not Permitted");

      // checking requested admin of member
      if (requests[i].adminId == bytes32(0)) {
        BaseAgent storage requestedAdminAgent = _data.agents[requests[i].adminId];
        require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Member Admin Type");
        if(requestedAgent.atype == AgentType.ROLE) {
          TypeEntity storage typeEntity = _data.typeReadSlot(LIVELY_VERSE_ADMIN_TYPE_ID);
          require(typeEntity.roles.containts(requests[i].adminId), "Illegal Member Admin ID");
          // baseAgent.adminId = requests[i].adminId;
        } 
         
        baseAgent.adminId = requests[i].adminId;
      
      } else {
        baseAgent.adminId = LIVELY_VERSE_ADMIN_TYPE_ID;
      }
      emit MemberAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");

    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 memberId = LAclUtils.accountGenerateId(msg.sender);
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");

    bytes32 functionId = LAclUtils.functionGenerateId(functionFacetId, IMemberManagement.memberUpdateTypeLimit.selector);
    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
      require(member.ba.acstat > ActivityStatus.DELETED, "Member is Deleted");
      require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Update");
      require(_doAgentCheckAdminAccess(member.ba.adminId, memberId, functionId), "Operation Not Permitted");

      member.typeLimit = requests[i].typeLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].memberId, requests[i].typeLimit);
    }
    return true;
  }

  function memberCheckId(bytes32 memberId) external view returns (bool) {
    return _data.agents[memberId].atype == AgentType.MEMBER;
  }

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(result) return member.types.contains(typeId);
    return false;
  }

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return new bytes32[](0);
    return member.types.values();   
  }

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) {
      return MemberInfo({
        adminId: bytes32(0),
        account: address(0),
        referredByScope: 0,
        referredByPolicy: 0,
        typeLimit: 0,
        typeCount: 0,
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return MemberInfo({
      adminId: member.ba.adminId,
      account: member.account,
      referredByScope: member.ba.referredByScope,
      referredByPolicy: member.ba.referredByPolicy,
      typeLimit: member.typeLimit,
      typeCount: uint16(member.types.length()),
      atype: AgentType.NONE,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat
    });
  }


  function _doGetScopeInfo(bytes32 agentId) internal returns (ScopeType, bytes32) {

    BaseAgent atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage TypeEntity = _data.typeReadSlot(agentId);
      BaseScope storage baseScope = _data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (ScopeType.NONE, bytes32(0));  
  }

  // Note: Member could not assigned to any entities as admin
  function _doAgentCheckAdminAccess(bytes32 adminId, bytes32 agentId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return false;

    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      if (typeEntity.members[agentId] != adminId) return false;

      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(typeEntity.members[agentId]);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLE && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }
}