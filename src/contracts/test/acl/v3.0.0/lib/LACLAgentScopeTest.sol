// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./LACLUtilsTest.sol";
import "./LACLStorageTest.sol";
import "./LProfileStorageTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../IACLCommonsTest.sol";
import "../IACLGeneralsTest.sol";
import "../IACLManagerTest.sol";
import "../ACLStorageTest.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/IERC1822.sol";
import "../../../../utils/IERC165.sol";
import "../IACLTest.sol";
import "../agent/IRoleManagementTest.sol";
import "../agent/IMemberManagementTest.sol";
import "../scope/IFunctionManagementTest.sol";
import "../policy/IPolicyManagementTest.sol";
import "../profile/IProfileACLTest.sol";
import "../profile/IProfileACLGeneralsTest.sol";

/**
 * @title ACL Commons Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLAgentScopeTest {
  using LProfileStorageTest for IACLCommonsTest.ProfileEntity;
  using LACLStorageTest for ACLStorageTest.DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  string public constant LIB_NAME = "LACLAgentScopeTest";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_VERSE_ANONYMOUS_TYPE_ID =
    keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
  bytes32 public constant LIVELY_VERSE_ANY_TYPE_ID = keccak256(abi.encodePacked("TYPE.LIVELY_VERSE.LIVELY_ANY"));

  bytes32 public constant LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID =
    keccak256(abi.encodePacked("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));

  function checkAdminAccess(
    ACLStorageTest.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) external view returns (IACLTest.AdminAccessStatus) {
    return _doCheckAdminAccess(data, adminId, memberId, functionId);
  }

  function aclRegisterRole(
    ACLStorageTest.DataCollection storage data,
    IRoleManagementTest.RoleRegisterRequest calldata request,
    bytes32 functionId,
    bytes32 senderId,
    uint24 memberLimit
  ) external returns (bytes32, bytes32) {
    bytes32 newRoleId = LACLUtilsTest.generateId(request.name);
    require(data.agents[newRoleId].atype == IACLCommonsTest.AgentType.NONE, "Role Already Exist");
    require(
      request.acstat > IACLCommonsTest.ActivityStatus.DELETED && request.alstat > IACLCommonsTest.AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );
    require(
      request.typeId != LIVELY_VERSE_ANONYMOUS_TYPE_ID && request.typeId != LIVELY_VERSE_ANY_TYPE_ID,
      "Illegal Type"
    );

    // check type
    IACLCommonsTest.TypeEntity storage typeEntity = data.typeReadSlot(request.typeId);
    require(typeEntity.ba.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
    require(typeEntity.roles.length() < typeEntity.roleLimit, "Illegal Register");

    // check access
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(data, typeEntity.ba.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);

    // check and get requested scope type
    IACLCommonsTest.ScopeType requestScopeType = _doRoleCheckRequestScope(data, request.scopeId, typeEntity.scopeId);

    // add role to type
    typeEntity.roles.add(newRoleId);

    // create role entity
    IACLCommonsTest.RoleEntity storage newRole = data.roleWriteSlot(newRoleId);
    newRole.ba.atype = IACLCommonsTest.AgentType.ROLE;
    newRole.ba.acstat = request.acstat;
    newRole.ba.alstat = request.alstat;
    newRole.name = request.name;
    newRole.scopeId = request.scopeId;
    newRole.memberLimit = request.memberLimit >= 0 ? uint24(uint32(request.memberLimit)) : memberLimit;
    newRole.typeId = request.typeId;
    newRole.ba.adminId = _getRoleAdmin(data, requestScopeType, typeEntity.ba.adminId, request.scopeId, request.adminId);

    return (newRoleId, newRole.ba.adminId);
  }

  function getPolicyAdmin(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) external view returns (bytes32 policyAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(data.agents[adminId].atype == IACLCommonsTest.AgentType.ROLE, "Illegal Admin AgentType");
      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(data, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGeneralsTest(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      policyAdminId = adminId;
    } else {
      policyAdminId = requestScopeAdmin;
    }
  }

  function getPolicyAndCheckAdminAccess(
    ACLStorageTest.DataCollection storage data,
    bytes32 policyId,
    bytes32 memberId,
    bytes32 functionId
  ) external view returns (IACLCommonsTest.PolicyEntity storage) {
    return _doGetPolicyAndCheckAdminAccess(data, policyId, memberId, functionId);
  }

  function getCheckUpdateRequestScope(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType
  ) external returns (IACLCommonsTest.BaseScope storage) {
    return _getCheckUpdateRequestScope(data, requestScopeId, senderScopeId, senderScopeType);
  }

  function _getCheckUpdateRequestScope(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    IACLCommonsTest.ScopeType senderScopeType
  ) private returns (IACLCommonsTest.BaseScope storage) {
    // checking requested type scope
    IACLCommonsTest.BaseScope storage requestedScope = data.scopes[requestScopeId];
    require(requestedScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestedScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestedScope.referredByAgent += 1;

    require(requestedScope.stype <= senderScopeType, "Illegal ScopeType");
    if (requestedScope.stype == senderScopeType) {
      require(requestScopeId == senderScopeId, "Illegal Scope");
    } else {
      require(IACLGeneralsTest(address(this)).isScopesCompatible(senderScopeId, requestScopeId), "Illegal Scope");
    }

    return requestedScope;
  }

  function roleCheckRequestScope(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 typeScopeId
  ) external returns (IACLCommonsTest.ScopeType) {
    return _doRoleCheckRequestScope(data, requestScopeId, typeScopeId);
  }

  function _doGetPolicyAndCheckAdminAccess(
    ACLStorageTest.DataCollection storage data,
    bytes32 policyId,
    bytes32 memberId,
    bytes32 functionId
  ) private view returns (IACLCommonsTest.PolicyEntity storage) {
    IACLCommonsTest.PolicyEntity storage policyEntity = data.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");
    require(policyEntity.alstat >= IACLCommonsTest.AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(data, policyEntity.adminId, memberId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    return policyEntity;
  }

  function _doRoleCheckRequestScope(
    ACLStorageTest.DataCollection storage data,
    bytes32 requestScopeId,
    bytes32 typeScopeId
  ) private returns (IACLCommonsTest.ScopeType) {
    // checking requested role scope
    IACLCommonsTest.BaseScope storage requestScope = data.scopes[requestScopeId];
    require(requestScope.stype != IACLCommonsTest.ScopeType.NONE, "Scope Not Found");
    require(requestScope.acstat > IACLCommonsTest.ActivityStatus.DELETED, "Scope Deleted");

    // increase referred count to target scope
    requestScope.referredByAgent += 1;

    // checking requested role type scope with role scope
    IACLCommonsTest.ScopeType typeScopeType = data.scopes[typeScopeId].stype;
    require(typeScopeType >= requestScope.stype, "Illegal ScopeType");
    if (typeScopeType == requestScope.stype) {
      require(typeScopeId == requestScopeId, "Illegal Scope");
    } else {
      require(IACLGeneralsTest(address(this)).isScopesCompatible(typeScopeId, requestScopeId), "Illegal Scope");
    }

    return requestScope.stype;
  }

  function updatePolicyScope(
    ACLStorageTest.DataCollection storage data,
    IPolicyManagementTest.UpdateScopeRequest calldata request,
    bytes32 functionId,
    bytes32 senderId
  ) external {
    IACLCommonsTest.ScopeType senderScopeType;
    bytes32 senderScopeId;
    IACLCommonsTest.PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(
      data,
      request.id,
      senderId,
      functionId
    );
    IACLCommonsTest.AgentType adminAgentType = data.agents[policyEntity.adminId].atype;
    if (adminAgentType == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = data.roleReadSlot(policyEntity.adminId);
      senderScopeId = roleEntity.scopeId;
      senderScopeType = data.scopes[roleEntity.scopeId].stype;
    } else {
      IACLCommonsTest.TypeEntity storage agentType = data.typeReadSlot(policyEntity.adminId);
      bytes32 memberRoleId = agentType.members[senderId];
      IACLCommonsTest.RoleEntity storage memberAgentRole = data.roleReadSlot(memberRoleId);
      senderScopeType = data.scopes[memberAgentRole.scopeId].stype;
      senderScopeId = memberAgentRole.scopeId;
    }

    IACLCommonsTest.BaseScope storage requestScope = _getCheckUpdateRequestScope(
      data,
      request.scopeId,
      senderScopeId,
      senderScopeType
    );
    IACLCommonsTest.BaseScope storage currentScope = data.scopes[policyEntity.scopeId];
    if (policyEntity.roles.length() > 0) {
      require(requestScope.stype > currentScope.stype, "Illegal ScopeType");
      require(IACLGeneralsTest(address(this)).isScopesCompatible(request.scopeId, policyEntity.scopeId), "Illegal Scope");
    }
    require(currentScope.referredByAgent > 0, "Illeagl Referred");
    unchecked {
      currentScope.referredByAgent -= 1;
    }
    policyEntity.scopeId = request.scopeId;
  }

  function getAgentScopeInfo(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    external
    view
    returns (IACLCommonsTest.ScopeType, bytes32)
  {
    return _doGetAgentScopeInfo(data, agentId);
  }

  function getRoleAdmin(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) external view returns (bytes32 roleAdminId) {
    return _getRoleAdmin(data, requestScopeType, requestScopeAdmin, scopeId, adminId);
  }

  function checkMemberRegisterLimits(
    IACLCommonsTest.MemberEntity storage memberEntity,
    IACLCommonsTest.GeneralLimit calldata limits
  ) external view {
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
    ACLStorageTest.DataCollection storage data,
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) private view returns (IACLTest.AdminAccessStatus) {
    (IACLCommonsTest.FunctionEntity storage functionEntity, bool res) = data.functionTryReadSlot(functionId);
    if (!res) return IACLTest.AdminAccessStatus.FUNCTION_NOT_FOUND;

    IACLCommonsTest.AgentType adminAgentType = data.agents[adminId].atype;
    if (adminAgentType == IACLCommonsTest.AgentType.ROLE) {
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result) = data.roleTryReadSlot(adminId);
      if (!result) return IACLTest.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return IACLTest.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      if (typeEntity.members[memberId] != adminId) return IACLTest.AdminAccessStatus.NOT_PERMITTED;

      IACLCommonsTest.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[adminId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACLTest.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACLTest.AdminAccessStatus.PERMITTED;
    } else if (adminAgentType == IACLCommonsTest.AgentType.TYPE) {
      (IACLCommonsTest.TypeEntity storage typeEntity, bool result1) = data.typeTryReadSlot(adminId);
      if (!result1) return IACLTest.AdminAccessStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (IACLCommonsTest.RoleEntity storage roleEntity, bool result2) = data.roleTryReadSlot(roleId);
      if (!result2) return IACLTest.AdminAccessStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != IACLCommonsTest.ActivityStatus.ENABLED)
        return IACLTest.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      IACLCommonsTest.PolicyEntity storage policyEntity = data.policies[data.rolePolicyMap[roleId]];
      if (
        policyEntity.acstat == IACLCommonsTest.ActivityStatus.ENABLED &&
        policyEntity.policyCode >= functionEntity.policyCode
      ) return IACLTest.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACLTest.AdminAccessStatus.PERMITTED;
    }

    return IACLTest.AdminAccessStatus.NOT_PERMITTED;
  }

  function _getRoleAdmin(
    ACLStorageTest.DataCollection storage data,
    IACLCommonsTest.ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) private view returns (bytes32 roleAdminId) {
    // checking requested type admin
    if (adminId != bytes32(0)) {
      require(data.agents[adminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");
      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(data, adminId);
      require(requestScopeType <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (requestScopeType == requestAdminScopeType) {
        require(requestAdminScopeId == scopeId, "Illegal Admin Scope");
      } else {
        require(IACLGeneralsTest(address(this)).isScopesCompatible(requestAdminScopeId, scopeId), "Illegal Admin Scope");
      }
      roleAdminId = adminId;
    } else {
      roleAdminId = requestScopeAdmin;
    }
  }

  function getAndCheckFunctionAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 adminId
  ) external view returns (bytes32 functionAdminId) {
    return _doGetAndCheckFunctionAdmin(data, contextAdminId, contextId, adminId);
  }

  function _doGetAgentScopeInfo(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    private
    view
    returns (IACLCommonsTest.ScopeType, bytes32)
  {
    IACLCommonsTest.AgentType atype = data.agents[agentId].atype;
    if (atype == IACLCommonsTest.AgentType.ROLE) {
      IACLCommonsTest.RoleEntity storage roleEntity = data.roleReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = data.scopes[roleEntity.scopeId];
      return (baseScope.stype, roleEntity.scopeId);
    } else if (atype == IACLCommonsTest.AgentType.TYPE) {
      IACLCommonsTest.TypeEntity storage typeEntity = data.typeReadSlot(agentId);
      IACLCommonsTest.BaseScope storage baseScope = data.scopes[typeEntity.scopeId];
      return (baseScope.stype, typeEntity.scopeId);
    }

    return (IACLCommonsTest.ScopeType.NONE, bytes32(0));
  }

  function _doGetAndCheckFunctionAdmin(
    ACLStorageTest.DataCollection storage data,
    bytes32 contextAdminId,
    bytes32 contextId,
    bytes32 requestAdminId
  ) private view returns (bytes32 functionAdminId) {
    // checking requested functionAdmin admin
    if (requestAdminId != bytes32(0)) {
      require(data.agents[requestAdminId].atype > IACLCommonsTest.AgentType.MEMBER, "Illegal Admin AgentType");

      (IACLCommonsTest.ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doGetAgentScopeInfo(
        data,
        requestAdminId
      );
      require(IACLCommonsTest.ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
      if (IACLCommonsTest.ScopeType.CONTEXT == requestAdminScopeType) {
        require(requestAdminScopeId == contextAdminId, "Illegal Admin Scope");
      } else {
        require(IACLGeneralsTest(address(this)).isScopesCompatible(requestAdminScopeId, contextId), "Illegal Admin Scope");
      }
      functionAdminId = requestAdminId;
    } else {
      functionAdminId = contextAdminId;
    }
  }
}
