// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./LACLUtils.sol";
import "./LACLStorage.sol";
import "./LProfileStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/IACLGenerals.sol";
import "../../acl/IACLManager.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";
import "../../acl/IACL.sol";
import "../../acl/agent/IRoleManagement.sol";
import "../../acl/agent/IMemberManagement.sol";
import "../../acl/scope/IFunctionManagement.sol";
import "../../acl/policy/IPolicyManagement.sol";
import "../../acl/profile/IProfileACL.sol";
import "../../acl/profile/IProfileACLGenerals.sol";

/**
 * @title ACL Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLAgentScope {
  using LProfileStorage for IACLCommons.ProfileEntity;
  using LACLStorage for ACLStorage.DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LACLAgentScope";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = 
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
  
  function checkAdminAccess(
    ACLStorage.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) external view returns (IACL.AdminAccessStatus) {
    return _doCheckAdminAccess(data, adminId, memberId, functionId);
  }

  function aclRegisterRole(ACLStorage.DataCollection storage data, IRoleManagement.RoleRegisterRequest calldata request, bytes32 functionId, bytes32 senderId, uint24 memberLimit)
    external
    returns (bytes32, bytes32)
  {
    bytes32 newRoleId = LACLUtils.generateId(request.name);
    require(data.agents[newRoleId].atype == IACLCommons.AgentType.NONE, "Role Already Exist");
    require(
      request.acstat > IACLCommons.ActivityStatus.DELETED && request.alstat > IACLCommons.AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );
    require(
      request.typeId != LIVELY_VERSE_ANONYMOUS_TYPE_ID && request.typeId != LIVELY_VERSE_ANY_TYPE_ID,
      "Illegal Type"
    );

    // check type
    IACLCommons.TypeEntity storage typeEntity = data.typeReadSlot(request.typeId);
    require(typeEntity.ba.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
    require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

    // check access
    IACL.AdminAccessStatus status = _doCheckAdminAccess(data, typeEntity.ba.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

     // check and get requested scope type
    IACLCommons.ScopeType requestScopeType = _doRoleCheckRequestScope(data, request.scopeId, typeEntity.scopeId);

    // add role to type
    typeEntity.roles.add(newRoleId);

    // create role entity
    IACLCommons.RoleEntity storage newRole = data.roleWriteSlot(newRoleId);
    newRole.ba.atype = IACLCommons.AgentType.ROLE;
    newRole.ba.acstat = request.acstat;
    newRole.ba.alstat = request.alstat;
    newRole.name = request.name;
    newRole.scopeId = request.scopeId;
    newRole.memberLimit = request.memberLimit >= 0 ? uint24(uint32(request.memberLimit)): memberLimit;
    newRole.typeId = request.typeId;
    newRole.ba.adminId = _getRoleAdmin(data, requestScopeType, typeEntity.ba.adminId, request.scopeId, request.adminId);

    return (newRoleId, newRole.ba.adminId);
  }

  function getPolicyAdmin(
    ACLStorage.DataCollection storage data,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) external view returns (bytes32 policyAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(data.agents[adminId].atype == IACLCommons.AgentType.ROLE, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(data, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      policyAdminId = adminId;
    } else {
      policyAdminId = requestScopeAdmin;
    }
  }

  function getPolicyAndCheckAdminAccess(
    ACLStorage.DataCollection storage data,
    bytes32 policyId,
    bytes32 memberId,
    bytes32 functionId
  ) external view returns (IACLCommons.PolicyEntity storage) {
    return _doGetPolicyAndCheckAdminAccess(data, policyId, memberId, functionId);
  }

  function getCheckUpdateRequestScope(
    ACLStorage.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommons.ScopeType senderScopeType
  ) external returns (IACLCommons.BaseScope storage) {
    return _getCheckUpdateRequestScope(data, requestScopeId, senderScopeId, senderScopeType);
  }

  function _getCheckUpdateRequestScope(
    ACLStorage.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommons.ScopeType senderScopeType
  ) private returns (IACLCommons.BaseScope storage) {
    // checking requested type scope
    IACLCommons.BaseScope storage requestedScope = data.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommons.ScopeType.NONE, "Scope Not Found");
    require(requestedScope.acstat > IACLCommons.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;

    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(IACLGenerals(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Scope");
    }

    return requestedScope;
  }

  function roleCheckRequestScope(ACLStorage.DataCollection storage data, bytes32 requestScopeId, bytes32 typeScopeId) external returns (IACLCommons.ScopeType) { 
    return _doRoleCheckRequestScope(data, requestScopeId, typeScopeId);
  }

  function _doGetPolicyAndCheckAdminAccess(
    ACLStorage.DataCollection storage data,
    bytes32 policyId,
    bytes32 memberId,
    bytes32 functionId
  ) private view returns (IACLCommons.PolicyEntity storage) {
    IACLCommons.PolicyEntity storage policyEntity = data.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    require(policyEntity.alstat >= IACLCommons.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(data, policyEntity.adminId, memberId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return policyEntity;
  }

   function _doRoleCheckRequestScope(ACLStorage.DataCollection storage data, bytes32 requestScopeId, bytes32 typeScopeId) private returns (IACLCommons.ScopeType) {
    // checking requested role scope
    IACLCommons.BaseScope storage requestScope = data.scopes[requestScopeId];
    require(requestScope.stype != IACLCommons.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommons.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    // checking requested role type scope with role scope
    IACLCommons.ScopeType typeScopeType = data.scopes[typeScopeId].stype;
    require(typeScopeType >= requestScope.stype, "Illegal ScopeType");
    if (typeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(IACLGenerals(address(this)).isScopesCompatible(typeScopeId, requestScopeId), "Illegal Scope");
    }

    return requestScope.stype;
  }

  function updatePolicyScope(ACLStorage.DataCollection storage data, IPolicyManagement.UpdateScopeRequest calldata request, bytes32 functionId, bytes32 senderId) external {
    IACLCommons.ScopeType senderScopeType;
    bytes32 senderScopeId;
    IACLCommons.PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(data, request.id, senderId, functionId);
    IACLCommons.AgentType adminAgentType = data.agents[policyEntity.adminId].atype;
    if (adminAgentType == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = data.roleReadSlot(policyEntity.adminId);
      senderScopeId = roleEntity.scopeId;
      senderScopeType = data.scopes[roleEntity.scopeId].stype;
    } else {
      IACLCommons.TypeEntity storage agentType = data.typeReadSlot(policyEntity.adminId);
      bytes32 memberRoleId = agentType.members[senderId];
      IACLCommons.RoleEntity storage memberAgentRole = data.roleReadSlot(memberRoleId);
      senderScopeType = data.scopes[memberAgentRole.scopeId].stype;
      senderScopeId = memberAgentRole.scopeId;
    }

    IACLCommons.BaseScope storage requestScope = _getCheckUpdateRequestScope(data, request.scopeId, senderScopeId, senderScopeType);
    IACLCommons.BaseScope storage currentScope = data.scopes[policyEntity.scopeId];
    if (policyEntity.roles.length() > 0) {
      require(requestScope.stype > currentScope.stype, "Illegal ScopeType");
      require(
        IACLGenerals(address(this)).isScopesCompatible(request.scopeId, policyEntity.scopeId),
        "Illegal Scope"
      );
    }
    require(currentScope.referredByAgent > 0, "Illeagl Referred");
    unchecked {
      currentScope.referredByAgent -= 1;
    }
    policyEntity.scopeId = request.scopeId;
  }

  function getAgentScopeInfo(ACLStorage.DataCollection storage data, bytes32 agentId) external view returns (IACLCommons.ScopeType, bytes32) {
    return _doGetAgentScopeInfo(data, agentId);
  }
 
  function getRoleAdmin(
    ACLStorage.DataCollection storage data,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) external view returns (bytes32 roleAdminId) {
    return _getRoleAdmin(data, requestScopeType, requestScopeAdmin, scopeId, adminId);
  }

  function checkMemberRegisterLimits(IACLCommons.MemberEntity storage memberEntity, IACLCommons.GeneralLimit calldata limits) external view {
    require(memberEntity.limits.memberRegisterLimit >= limits.memberRegisterLimit, "Illegal MemberRegisterLimit");
    require(memberEntity.limits.contextRegisterLimit >= limits.contextRegisterLimit, "Illegal ContextRegisterLimit");
    require(memberEntity.limits.functionRegisterLimit >= limits.functionRegisterLimit, "Illegal FunctionRegisterLimit");
    require(memberEntity.limits.profileRegisterLimit >= limits.profileRegisterLimit, "Illegal ProfileRegisterLimit");
    require(memberEntity.limits.roleRegisterLimit >= limits.roleRegisterLimit, "Illegal RoleRegisterLimit");
    require(memberEntity.limits.typeRegisterLimit >= limits.typeRegisterLimit, "Illegal TypeRegisterLimit");
    require(memberEntity.limits.realmRegisterLimit >= limits.realmRegisterLimit, "Illegal RealmRegisterLimit");
    require(memberEntity.limits.domainRegisterLimit >= limits.domainRegisterLimit, "Illegal DomainRegisterLimit");
    require(memberEntity.limits.policyRegisterLimit >= limits.policyRegisterLimit, "Illegal PolicyRegisterLimit");
    require(memberEntity.limits.memberLimit >= limits.memberLimit, "Illegal MemberLimit");
    require(memberEntity.limits.contextLimit >= limits.contextLimit, "Illegal ContextLimit");
    require(memberEntity.limits.realmLimit >= limits.realmLimit, "Illegal RealmLimit");
    require(memberEntity.limits.domainLimit >= limits.domainLimit, "Illegal DomainLimit");
    require(memberEntity.limits.callLimit >= limits.callLimit, "Illegal CallLimit");
    require(memberEntity.limits.typeRoleLimit >= limits.typeRoleLimit, "Illegal TypeRoleLimit");
    require(memberEntity.limits.typeLimit >= limits.typeLimit, "Illegal TypeLimit");
    require(memberEntity.limits.policyRoleLimit >= limits.policyRoleLimit, "Illegal PolicyRoleLimit");
    require(memberEntity.limits.functionLimit >= limits.functionLimit, "Illegal FunctionLimit");
  } 

  function _doCheckAdminAccess(
    ACLStorage.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) private view returns (IACL.AdminAccessStatus) {
    (IACLCommons.FunctionEntity storage functionEntity, bool res) = data.functionTryReadSlot(functionId);
    if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;

    IACLCommons.AgentType adminAgentType = data.agents[adminId].atype;
    if (adminAgentType == IACLCommons.AgentType.ROLE) {
      (IACLCommons.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(adminId);
      if (!result) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      if (typeEntity.members[memberId] != adminId) return IACL.AdminAccessStatus.NOT_PERMITTED;

      IACLCommons.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[adminId]];
      if (
        policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
    } else if (adminAgentType == IACLCommons.AgentType.TYPE) {
      (IACLCommons.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(adminId);
      if (!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (IACLCommons.RoleEntity storage roleEntity, bool result2) = data.roleTryReadSlot(roleId);
      if (!result2) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommons.ActivityStatus.ENABLED)
        return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      IACLCommons.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[roleId]];
      if (
        policyEntity.acstat == IACLCommons.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
    }

    return IACL.AdminAccessStatus.NOT_PERMITTED;
  }


  function _getRoleAdmin(
    ACLStorage.DataCollection storage data,
    IACLCommons.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) private view returns (bytes32 roleAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(data.agents[adminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(data, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      roleAdminId = adminId;
    } else {
      roleAdminId = requestScopeAdmin;
    }
  }

  function getAndCheckFunctionAdmin(
     ACLStorage.DataCollection storage data,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId
  ) external view returns (bytes32 functionAdminId) {
    return _doGetAndCheckFunctionAdmin(data, contextAdminId, contextId, adminId);
  }

  function _doGetAgentScopeInfo(ACLStorage.DataCollection storage data, bytes32 agentId) 
    private
    view
    returns (IACLCommons.ScopeType, bytes32)
  {
    IACLCommons.AgentType atype = data.agents[agentId].atype;
    if (atype == IACLCommons.AgentType.ROLE) {
      IACLCommons.RoleEntity storage roleEntity = data.roleReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == IACLCommons.AgentType.TYPE) {
      IACLCommons.TypeEntity storage typeEntity = data.typeReadSlot(agentId);
      IACLCommons.BaseScope storage baseScope = data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommons.ScopeType.NONE, bytes32(0));
  }

  function _doGetAndCheckFunctionAdmin(
     ACLStorage.DataCollection storage data,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 requestAdminId
  ) private view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin
    if (requestAdminId != bytes32(0)) {
      require(data.agents[requestAdminId].atype > IACLCommons.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommons.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(data, requestAdminId);
      require(IACLCommons.ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommons.ScopeType.CONTEXT == requestAdminScopeType) {
        require(requestAdminScopeId == contextAdminId, "Illegal Admin Scope");
      } else {
        require(IACLGenerals(address(this)).isScopesCompatible(requestAdminScopeId, contextId), "Illegal Admin Scope");
      }
      functionAdminId = requestAdminId;
    } else {
      functionAdminId = contextAdminId;
    }
  }
 
}
