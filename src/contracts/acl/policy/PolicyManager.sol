// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;

import "./IPolicyManagement.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../ACLStorage.sol";
import "../scope/IFunctionManagement.sol";
import "../agent/IRoleManagement.sol";
import "../agent/ITypeManagement.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LACLAgentScope.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract PolicyManager is ACLStorage, BaseUUPSProxy, IPolicyManagement {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {
    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IPolicyManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  // called by members of Policy Master type
  function policyRegister(MemberSignature calldata memberSign, PolicyRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (, bytes32 senderId, address sender) = _accessPermission(memberSign, IPolicyManagement.policyRegister.selector);
    (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(sender);

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(
      int16(uint16(memberEntity.limits.policyRegisterLimit)) - int8(uint8(requests.length)) >= 0,
      "Illegal RegisterLimit"
    );
    unchecked {
      memberEntity.limits.policyRegisterLimit -= uint8(requests.length);
    }

    for (uint256 i = 0; i < requests.length; i++) {
      _doPolicyRegister(requests[i], memberEntity, senderScopeType, senderScopeId, sender);
    }

    return true;
  }

  // called by policy admin
  function policyAddRoles(MemberSignature calldata memberSign, PolicyAddRolesRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyAddRoles.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);
      ScopeType policyScopeType = _data.scopes[policyEntity.scopeId].stype;

      for (uint256 j = 0; j < requests[i].roles.length; j++) {
        // require(_data.rolePolicyMap[requests[i].roles[j]] == bytes32(0), "Already Exist");
        // require(policyEntity.adminId != requests[i].roles[j], "Illegal Role");
        // require(
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID  && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID   && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID && 
        //   requests[i].roles[j] != LACLAgentScope.LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID,
        //   "Illegal System Role"
        // );
        // require(policyEntity.roleLimit > policyEntity.roles.length(), "Illegal Limit");
        // RoleEntity storage roleEntity = _data.roleReadSlot(requests[i].roles[j]);

        // ScopeType roleScopeType = _data.scopes[roleEntity.scopeId].stype;
        // require(roleScopeType <= policyScopeType, "Illegal Role ScopeType");
        // if (roleScopeType == policyScopeType) {
        //   require(roleEntity.scopeId == policyEntity.scopeId, "Illegal Role Scope");
        // } else {
        //   require(
        //     IACLGenerals(address(this)).isScopesCompatible(policyEntity.scopeId, roleEntity.scopeId),
        //     "Illegal Role Scope"
        //   );
        // }

        // _data.rolePolicyMap[requests[i].roles[j]] = requests[i].policyId;
        // policyEntity.roles.add(requests[i].roles[j]);
        LACLAgentScope.policyAddRoles(_data, policyEntity, requests[i].roles[j], requests[i].policyId, policyScopeType);
        emit PolicyRoleAdded(sender, requests[i].policyId, requests[i].roles[j]);
      }
    }
    return true;
  }

  // called by policy admin
  function policyRemoveRoles(MemberSignature calldata memberSign, PolicyRemoveRolesRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyRemoveRoles.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);

      for (uint256 j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Not Found");
        delete _data.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit PolicyRoleRemoved(sender, requests[i].policyId, requests[i].roles[j]);
      }
    }
    return true;
  }

  function policyUpdateCodes(MemberSignature calldata memberSign, PolicyUpdateCodeRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateCodes.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);

      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit PolicyCodeUpdated(sender, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function policyUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateAdmin.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, senderId, functionId);
      policyEntity.adminId = _getPolicyAdmin(
        _data.scopes[policyEntity.scopeId].stype,
        _data.scopes[policyEntity.scopeId].adminId,
        policyEntity.scopeId,
        requests[i].adminId
      );
      require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal AID");
      emit PolicyAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function policyUpdateScope(MemberSignature calldata memberSign, UpdateScopeRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateScope.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      LACLAgentScope.updatePolicyScope(_data, requests[i], functionId, senderId);
      emit PolicyScopeUpdated(sender, requests[i].id, requests[i].scopeId);
    }
    return true;
  }

  function policyUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateActivityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      policyEntity.acstat = requests[i].acstat;
      emit PolicyActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function policyUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateAlterabilityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _data.policies[requests[i].id];
      require(policyEntity.adminId != bytes32(0), "Not Found");

      IACL.AdminAccessStatus status = _doCheckAdminAccess(policyEntity.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      policyEntity.alstat = requests[i].alstat;
      emit PolicyAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function policyUpdateRoleLimit(MemberSignature calldata memberSign, PolicyUpdateRoleLimitRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyUpdateRoleLimit.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(requests[i].policyId, senderId, functionId);
      require(requests[i].roleLimit > policyEntity.roles.length(), "Illegal Limit");
      policyEntity.roleLimit = requests[i].roleLimit;
      emit PolicyRoleLimitUpdated(sender, requests[i].policyId, requests[i].roleLimit);
    }
    return true;
  }

  function policyRemove(MemberSignature calldata memberSign, bytes32[] calldata policies) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IPolicyManagement.policyRemove.selector
    );
    for (uint256 i = 0; i < policies.length; i++) {
      IACLCommons.PolicyEntity storage policyEntity = _data.policies[policies[i]];
      require(policyEntity.adminId != bytes32(0), "Not Found");

      IACL.AdminAccessStatus status = _doCheckAdminAccess(policyEntity.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);

      require(policyEntity.roles.length() == 0, "Illegal Remove");

      BaseScope storage policyScope = _data.scopes[policyEntity.scopeId];
      require(policyScope.referredByAgent > 0, "Illeagl Referred");
      unchecked {
        policyScope.referredByAgent -= 1;
      }

      delete policyEntity.adminId;
      delete policyEntity.scopeId;
      delete policyEntity.name;
      delete policyEntity.roleLimit;
      delete policyEntity.policyCode;
      delete policyEntity.ptype;
      delete policyEntity.acstat;
      delete policyEntity.alstat;
      delete policyEntity.roles;
      emit PolicyRemoved(sender, policies[i]);
    }
    return true;
  }

  function policyCheckId(bytes32 policyId) external view returns (bool) {
    return _data.policies[policyId].adminId != bytes32(0);
  }

  function policyCheckName(string calldata policyName) external view returns (bool) {
    return _data.policies[LACLUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function policyCheckAdmin(bytes32 policyId, address account) external view returns (bool) {
    PolicyEntity storage policyEntity = _data.policies[policyId];
    if (policyEntity.adminId == bytes32(0)) return false;

    bytes32 policyAdminId = policyEntity.adminId;
    AgentType agentType = _data.agents[policyAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if (agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(policyAdminId);
      if (!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if (!result1) return false;

      return typeEntity.members[memberId] == policyAdminId;
    } else if (agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(policyAdminId);
      if (!result1) return false;

      return typeEntity.members[memberId] != bytes32(0);
    }
    return true;
  }

  function policyCheckAccess(bytes32 policyId, bytes32 functionId) external view returns (bool) {
    return _doCheckAccessPolicy(policyId, functionId);
  }

  function policyCheckRoleAccess(bytes32 roleId, bytes32 functionId) external view returns (bool) {
    return _doCheckAccessPolicy(_data.rolePolicyMap[roleId], functionId);
  }

  function _doCheckAccessPolicy(bytes32 policyId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) return false;

    PolicyEntity storage policyEntity = _data.policies[policyId];
    if (policyEntity.acstat != ActivityStatus.ENABLED) return false;
    if (policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  }

  function policyCheckRole(bytes32 roleId) external view returns (bool) {
    return _data.rolePolicyMap[roleId] != bytes32(0);
  }

  function policyHasRole(bytes32 policyId, bytes32 roleId) external view returns (bool) {
    return _data.rolePolicyMap[roleId] == policyId;
  }

  function policyGetInfoByRole(bytes32 roleId) external view returns (PolicyInfo memory) {
    return _doPolicyGetInfo(_data.rolePolicyMap[roleId]);
  }

  function policyGetInfo(bytes32 policyId) external view returns (PolicyInfo memory) {
    return _doPolicyGetInfo(policyId);
  }

  function _doPolicyGetInfo(bytes32 policyId) internal view returns (PolicyInfo memory) {
    if (_data.policies[policyId].adminId == bytes32(0)) {
      return
        PolicyInfo({
          adminId: bytes32(0),
          scopeId: bytes32(0),
          name: "",
          roleLimit: 0,
          roleCount: 0,
          policyCode: 0,
          adminType: AgentType.NONE,
          scopeType: ScopeType.NONE,
          ptype: PolicyType.UNLOCK,
          acstat: ActivityStatus.NONE,
          alstat: AlterabilityStatus.NONE
        });
    }

    return
      PolicyInfo({
        adminId: _data.policies[policyId].adminId,
        scopeId: _data.policies[policyId].scopeId,
        name: _data.policies[policyId].name,
        roleLimit: _data.policies[policyId].roleLimit,
        roleCount: uint16(_data.policies[policyId].roles.length()),
        policyCode: _data.policies[policyId].policyCode,
        adminType: _data.agents[_data.policies[policyId].adminId].atype,
        scopeType: _data.scopes[_data.policies[policyId].scopeId].stype,
        ptype: _data.policies[policyId].ptype,
        acstat: _data.policies[policyId].acstat,
        alstat: _data.policies[policyId].alstat
      });
  }

  function policyGetRoles(bytes32 policyId) external view returns (bytes32[] memory) {
    if (_data.policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.policies[policyId].roles.values();
  }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    if (policyCode == 0) {
      return PolicyType.UNLOCK;
    } else if (policyCode <= 63) {
      return PolicyType.SLOCK;
    } else if (policyCode <= 127) {
      return PolicyType.MLOCK;
    } else if (policyCode <= 191) {
      return PolicyType.RLOCK;
    } else if (policyCode <= 254) {
      return PolicyType.HLOCK;
    } else {
      return PolicyType.LOCK;
    }
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACL.AdminAccessStatus) {
    return LACLAgentScope.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _accessPermission(MemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId, signer);
  }

  function _getMemberPolicyScopeInfo(address account) internal view returns (ScopeType, bytes32) {
    bytes32 memberId = LACLUtils.accountGenerateId(account);
    TypeEntity storage policyMasterType = _data.typeReadSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole = _data.roleReadSlot(senderRoleId);
    return (_data.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(
    ScopeType requestScopeType,
    bytes32 requestScopeAdmin,
    bytes32 scopeId,
    bytes32 adminId
  ) internal view returns (bytes32 policyAdminId) {
    return LACLAgentScope.getPolicyAdmin(_data, requestScopeType, requestScopeAdmin, scopeId, adminId);
  }

  function _doGetPolicyAndCheckAdminAccess(
    bytes32 policyId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (PolicyEntity storage) {
    return LACLAgentScope.getPolicyAndCheckAdminAccess(_data, policyId, memberId, functionId);
  }

  function _getCheckUpdateRequestScope(
    bytes32 requestScopeId,
    bytes32 senderScopeId,
    ScopeType senderScopeType
  ) internal returns (BaseScope storage) {
    return LACLAgentScope.getCheckUpdateRequestScope(_data, requestScopeId, senderScopeId, senderScopeType);
  }

  function _doPolicyRegister(
    PolicyRegisterRequest calldata request,
    MemberEntity storage memberEntity,
    ScopeType senderScopeType,
    bytes32 senderScopeId,
    address sender
  ) internal {
    bytes32 newPolicyId = LACLUtils.generateId(request.name);
    require(_data.policies[newPolicyId].acstat == ActivityStatus.NONE, "Already Exist");
    require(
      request.acstat > ActivityStatus.DELETED && request.alstat > AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );

    // checking requested type scope
    BaseScope storage requestedScope = _getCheckUpdateRequestScope(request.scopeId, senderScopeId, senderScopeType);

    // create policy entity
    PolicyEntity storage policyEntity = _data.policies[newPolicyId];
    policyEntity.ptype = _doGetPolicyType(request.policyCode);
    policyEntity.policyCode = request.policyCode;
    policyEntity.acstat = request.acstat;
    policyEntity.alstat = request.alstat;
    policyEntity.name = request.name;
    policyEntity.scopeId = request.scopeId;
    policyEntity.roleLimit = request.roleLimit >= 0
      ? uint16(uint24(request.roleLimit))
      : memberEntity.limits.policyRoleLimit;
    policyEntity.adminId = _getPolicyAdmin(
      requestedScope.stype,
      requestedScope.adminId,
      request.scopeId,
      request.adminId
    );
    emit PolicyRegistered(sender, newPolicyId, request.scopeId, request.adminId, request.policyCode);
  }

  function getLibrary() external pure returns (address) {
    return address(LACLAgentScope);
  }
}
