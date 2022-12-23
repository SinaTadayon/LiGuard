// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../ACLStorage.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract MemberManager is ACLStorage, BaseUUPSProxy, IMemberManagement {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  // Note: called by eveny admin of role
  function memberRegister(MemberRegister[] calldata requests) external returns (bool) {

    bytes32 functionId = _accessPermission(IMemberManagement.memberRegister.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      bytes32 newMemberId = LACLUtils.accountGenerateId(requests[i].account);
      require(_data.agents[newMemberId].acstat == ActivityStatus.NONE, "Already Exists");
      require(requests[i].typeLimit >= 1, "Illegal TypeLimit");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      require(requests[i].alstat > AlterabilityStatus.NONE, "Illegal Alterability");
      
      // check role
      RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roleId);
      require(roleEntity.ba.acstat > ActivityStatus.DELETED, "Role Deleted");
      require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Update");
      require(roleEntity.memberLimit < roleEntity.memberTotal, "Illegal Register");
      

      // check type 
      TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.acstat > ActivityStatus.DELETED, "Type Deleted");
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Update");

      // check factory limit
      require(requests[i].factoryLimit > 0 && roleEntity.typeId == _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID, "Illegal Factory Limit" );

      // check access
      require(_doAgentCheckAdminAccess(typeEntity.ba.adminId, senderId, functionId), "Forbidden");

      // add new member to type
      typeEntity.members[newMemberId] = requests[i].roleId;

      // add new member to role
      roleEntity.memberTotal +=1;      

      // create new member
      MemberEntity storage newMember = _data.memberWriteSlot(newMemberId);
      newMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
      newMember.ba.atype = AgentType.MEMBER;
      newMember.ba.acstat = requests[i].acstat;
      newMember.ba.alstat = requests[i].alstat;
      newMember.account = requests[i].account;
      newMember.types.add(roleEntity.typeId);
      newMember.typeLimit = requests[i].typeLimit;
      newMember.factoryLimit = requests[i].factoryLimit;

      emit MemberRegistered(
        msg.sender,
        newMemberId,
        requests[i].account,
        requests[i].roleId     
      );
    }

    return true;
  }

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    
    bytes32 functionId = _accessPermission(IMemberManagement.memberUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, false);

      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      memberEntity.ba.acstat = requests[i].acstat;
      emit MemberActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;  
  }

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IMemberManagement.memberUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {      
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, true);
      
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      memberEntity.ba.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  // Note: member default admin is 
  function memberUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IMemberManagement.memberUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId, false);

      // checking requested admin of member
      if (requests[i].adminId == bytes32(0)) {
        BaseAgent storage requestedAdminAgent = _data.agents[requests[i].adminId];
        require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal AdminType");
        if(requestedAdminAgent.atype == AgentType.ROLE) {
          TypeEntity storage typeEntity = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
          require(typeEntity.roles.contains(requests[i].adminId), "Illegal AdminId");
        }          
        memberEntity.ba.adminId = requests[i].adminId;
      
      } else {
        memberEntity.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
      }
      emit MemberAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IMemberManagement.memberUpdateTypeLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].memberId, senderId, functionId, false);
      memberEntity.typeLimit = requests[i].typeLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].memberId, requests[i].typeLimit);
    }
    return true;
  }  

  function memberUpdateFactoryLimit(MemberUpdateFactoryLimitRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IMemberManagement.memberUpdateTypeLimit.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].memberId, senderId, functionId, false);
      memberEntity.factoryLimit = requests[i].factoryLimit;
      emit MemberFactoryLimitUpdated(msg.sender, requests[i].memberId, requests[i].factoryLimit);
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
      typeLimit: member.typeLimit,
      typeCount: uint16(member.types.length()),
      atype: AgentType.NONE,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat
    });
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
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[agentId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.interfaces[type(IMemberManagement).interfaceId];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);    
    require(IAccessControl(address(this)).hasAccess(functionId), "Access Denied");
    return functionId;
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 memberId, bytes32 senderId, bytes32 functionId, bool isAlterable) internal view returns (MemberEntity storage) {
    MemberEntity storage memberEntity = _data.memberReadSlot(memberId);

    if(!isAlterable) {
      require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Update");
    }
    require(_doAgentCheckAdminAccess(memberEntity.ba.adminId, senderId, functionId), "Forbidden");
    return memberEntity;
  }

}