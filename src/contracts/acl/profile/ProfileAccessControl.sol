// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)

pragma solidity 0.8.19;


import "./policy/IProfilePolicyManagement.sol";
import "./IProfileACL.sol";
import "./IProfileACLGenerals.sol";
import "./scope/IProfileFunctionManagement.sol";
import "./agent/IProfileRoleManagement.sol";
import "./agent/IProfileTypeManagement.sol";
import "../ACLStorage.sol";
import "../IACL.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LProfileStorage.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLGenerals.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile AccessControl Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileAccessControl is ACLStorage, BaseUUPSProxy, IProfileACLGenerals, IProfileACL {
  using LACLStorage for DataCollection;
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  // function initialize(
  //   string calldata contractName,
  //   string calldata contractVersion,
  //   address accessControlManager
  // ) public onlyProxy onlyLocalAdmin initializer {
  //   __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

  //   emit Initialized(
  //     _msgSender(),
  //     address(this),
  //     _implementation(),
  //     contractName,
  //     contractVersion,
  //     _getInitializedCount()
  //   );
  // }

  function reinitialize(string calldata contractVersion) public onlyProxy onlyLocalAdmin reinitializer(2) {
    _contractVersion = contractVersion;

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      _contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IProfileACL).interfaceId ||
      interfaceId == type(IProfileACLGenerals).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function profileHasAccess(bytes32 profileId, bytes32 functionId) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doProfileHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasMemberAccess(
    bytes32 profileId,
    bytes32 functionId,
    bytes32 memberId
  ) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doProfileHasAccess(profileEntity, memberId, functionEntity);
  }

  function profileHasCSAccess(
    bytes32 profileId,
    address contractId,
    bytes4 selector
  ) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doProfileHasAccess(profileEntity, LACLUtils.accountGenerateId(msg.sender), functionEntity);
  }

  function profileHasAccountAccess(
    bytes32 profileId,
    address contractId,
    bytes4 selector,
    address accountId
  ) external returns (ProfileAuthorizationStatus) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN;
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    bytes32 memberId = LACLUtils.accountGenerateId(accountId);
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return ProfileAuthorizationStatus.FUNCTION_NOT_FOUND;
    return _doProfileHasAccess(profileEntity, memberId, functionEntity);
  }

  function profileAclHasMemberAccess(
    bytes32 profileId,
    bytes32 functionId,
    bytes32 memberId
  ) public {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    (FunctionEntity storage functionEntity, bool result) = _data.functionTryReadSlot(functionId);
    if (!result) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_NOT_FOUND);
    _doAclHasAccess(profileEntity, memberId, functionEntity);
  }

  function _doProfileHasAccess(
    ProfileEntity storage profileEntity,
    bytes32 memberId,
    FunctionEntity storage functionEntity
  ) internal returns (ProfileAuthorizationStatus) {
    if (profileEntity.limits.profileCallLimit > 0) {
      unchecked {
        profileEntity.limits.profileCallLimit -= 1;
      }
    } else {
      return ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN;
    }

    AgentType atype = profileEntity.agents[functionEntity.agentId].atype;
    if (atype == AgentType.ROLE) {
      // check member activation
      (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
        memberId
      );
      if (!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
      if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
        return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
      if (profileEntity.owner != profileMemberEntity.account) {
        if (profileMemberEntity.callLimit > 0) {
          unchecked {
            profileMemberEntity.callLimit -= 1;
          }
        } else {
          return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
        }
      }

      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      if (!result1) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;
      if (roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
      if (
        profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION &&
        roleEntity.scopeId != functionEntity.agentId
      ) return ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN;

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result2) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
      if (typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId) return ProfileAuthorizationStatus.UNAUTHORIZED;

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
        return ProfileAuthorizationStatus.POLICY_FORBIDDEN;
    } else if (atype == AgentType.TYPE) {
      if (functionEntity.agentId == LACLGenerals.LIVELY_PROFILE_ANY_TYPE_ID) {
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
          memberId
        );
        if (!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
          return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
        if (profileEntity.owner != profileMemberEntity.account) {
          if (profileMemberEntity.callLimit > 0) {
            unchecked {
              profileMemberEntity.callLimit -= 1;
            }
          } else {
            return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
          }
        }
      } else if (functionEntity.agentId != LACLGenerals.LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
          memberId
        );
        if (!result0) return ProfileAuthorizationStatus.MEMBER_NOT_FOUND;
        if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
          return ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN;
        if (profileEntity.owner != profileMemberEntity.account) {
          if (profileMemberEntity.callLimit > 0) {
            unchecked {
              profileMemberEntity.callLimit -= 1;
            }
          } else {
            return ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN;
          }
        }

        // check type activation
        (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
        if (!result1) return ProfileAuthorizationStatus.TYPE_NOT_FOUND;
        if (typeEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN;

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
        if (!result2) return ProfileAuthorizationStatus.ROLE_NOT_FOUND;
        if (roleEntity.ba.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN;
        if (
          profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION &&
          roleEntity.scopeId != functionEntity.agentId
        ) return ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN;

        // check policy activation
        PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
        if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
          return ProfileAuthorizationStatus.POLICY_FORBIDDEN;
      }
    } else if (atype <= AgentType.MEMBER) {
      return ProfileAuthorizationStatus.UNAUTHORIZED;
    }

    // check function activity
    if (functionEntity.bs.acstat != ActivityStatus.ENABLED)
      return ProfileAuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN;

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = profileEntity.profileContextTryReadSlot(
      functionEntity.contextId
    );
    if (!res1) return ProfileAuthorizationStatus.CONTEXT_NOT_FOUND;
    if (contextEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN;

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = profileEntity.profileRealmTryReadSlot(contextEntity.realmId);
    if (!res2) return ProfileAuthorizationStatus.REALM_NOT_FOUND;
    if (realmEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.REALM_ACTIVITY_FORBIDDEN;

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = profileEntity.profileDomainTryReadSlot(realmEntity.domainId);
    if (!res3) return ProfileAuthorizationStatus.DOMAIN_NOT_FOUND;
    if (domainEntity.bs.acstat != ActivityStatus.ENABLED) return ProfileAuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN;

    // check universe activity
    UniverseEntity storage universeEntity = profileEntity.profileUniverseReadSlot(
      LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
    );
    if (universeEntity.bs.acstat != ActivityStatus.ENABLED)
      return ProfileAuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN;

    return ProfileAuthorizationStatus.PERMITTED;
  }

  function _doAclHasAccess(
    ProfileEntity storage profileEntity,
    bytes32 memberId,
    FunctionEntity storage functionEntity
  ) internal {
    if (profileEntity.limits.profileCallLimit > 0) {
      unchecked {
        profileEntity.limits.profileCallLimit -= 1;
      }
    } else {
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.PROFILE_CALL_FORBIDDEN);
    }

    AgentType atype = profileEntity.agents[functionEntity.agentId].atype;

    if (atype == AgentType.ROLE) {
      // check member activation
      (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
        memberId
      );
      if (!result0) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
      if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
      if (profileEntity.owner != profileMemberEntity.account) {
        if (profileMemberEntity.callLimit > 0) {
          unchecked {
            profileMemberEntity.callLimit -= 1;
          }
        } else {
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
        }
      }

      // check role activation
      (RoleEntity storage roleEntity, bool result1) = profileEntity.profileRoleTryReadSlot(functionEntity.agentId);
      if (!result1) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_NOT_FOUND);
      if (roleEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
      // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId)
      //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);

      // check type activation
      (TypeEntity storage typeEntity, bool result2) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if (!result2) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.TYPE_NOT_FOUND);
      if (typeEntity.ba.acstat != ActivityStatus.ENABLED)
        LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

      // check memberId with agentId role
      if (typeEntity.members[memberId] != functionEntity.agentId)
        LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.UNAUTHORIZED);

      // check policy activation
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[functionEntity.agentId]];
      if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
        LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.POLICY_FORBIDDEN);
    } else if (atype == AgentType.TYPE) {
      if (functionEntity.agentId == LACLGenerals.LIVELY_PROFILE_ANY_TYPE_ID) {
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
          memberId
        );
        if (!result0) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
        if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
        if (profileEntity.owner != profileMemberEntity.account) {
          if (profileMemberEntity.callLimit > 0) {
            unchecked {
              profileMemberEntity.callLimit -= 1;
            }
          } else {
            LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
          }
        }
      } else if (functionEntity.agentId != LACLGenerals.LIVELY_VERSE_ANONYMOUS_TYPE_ID) {
        // check member activation
        (ProfileMemberEntity storage profileMemberEntity, bool result0) = profileEntity.profileMemberTryReadSlot(
          memberId
        );
        if (!result0) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_NOT_FOUND);
        if (profileMemberEntity.ba.acstat != ActivityStatus.ENABLED)
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_ACTIVITY_FORBIDDEN);
        if (profileEntity.owner != profileMemberEntity.account) {
          if (profileMemberEntity.callLimit > 0) {
            unchecked {
              profileMemberEntity.callLimit -= 1;
            }
          } else {
            LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.MEMBER_CALL_FORBIDDEN);
          }
        }

        // check type activation
        (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(functionEntity.agentId);
        if (!result1) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.TYPE_NOT_FOUND);
        if (typeEntity.ba.acstat != ActivityStatus.ENABLED)
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.TYPE_ACTIVITY_FORBIDDEN);

        // check role activation
        bytes32 roleId = typeEntity.members[memberId];
        (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
        if (!result2) LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_NOT_FOUND);
        if (roleEntity.ba.acstat != ActivityStatus.ENABLED)
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_ACTIVITY_FORBIDDEN);
        // if(profileEntity.scopes[roleEntity.scopeId].stype == ScopeType.FUNCTION && roleEntity.scopeId != functionEntity.agentId)
        //   LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.ROLE_SCOPE_FORBIDDEN);

        // check policy activation
        PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
        if (policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)
          LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.POLICY_FORBIDDEN);
      }
    } else if (atype <= AgentType.MEMBER) {
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.UNAUTHORIZED);
    }

    // check function activity
    if (functionEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.FUNCTION_ACTIVITY_FORBIDDEN);

    // check context activity
    (ContextEntity storage contextEntity, bool res1) = _data.contextTryReadSlot(functionEntity.contextId);
    if (!res1) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_NOT_FOUND);
    if (contextEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.CONTEXT_ACTIVITY_FORBIDDEN);

    // check realm activity
    (RealmEntity storage realmEntity, bool res2) = _data.realmTryReadSlot(contextEntity.realmId);
    if (!res2) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_NOT_FOUND);
    if (realmEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.REALM_ACTIVITY_FORBIDDEN);

    // check domain activity
    (DomainEntity storage domainEntity, bool res3) = _data.domainTryReadSlot(realmEntity.domainId);
    if (!res3) LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_NOT_FOUND);
    if (domainEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.DOMAIN_ACTIVITY_FORBIDDEN);

    // check universe activity
    UniverseEntity storage universeEntity = _data.universeReadSlot(LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    if (universeEntity.bs.acstat != ActivityStatus.ENABLED)
      LACLUtils.generateAuthorizationError(IACL.AuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN);
  }

  // // Anonymouse type
  // function profileAnonymousType() external pure returns (bytes32) {
  //   return LACLGenerals.LIVELY_VERSE_ANONYMOUS_TYPE_ID;
  // }

  // // Any type
  // function profileAnyType() external pure returns (bytes32) {
  //   return LACLGenerals.LIVELY_PROFILE_ANY_TYPE_ID;
  // }

  // // system admin type
  // function profileSystemMasterType() external pure returns (bytes32) {
  //   return LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID;
  // }

  // // admin type
  // function profileMasterType() external pure returns (bytes32) {
  //   return LACLGenerals.LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
  // }

  // function profileUniverseScope() external pure returns (bytes32) {
  //   return LACLGenerals.LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID;
  // }

  // general
  function profileIsAgentExist(bytes32 profileId, bytes32 agentId) external view returns (bool) {
    return _data.profiles[profileId].agents[agentId].atype != AgentType.NONE;
  }

  function profileIsScopeExist(bytes32 profileId, bytes32 scopeId) external view returns (bool) {
    return _data.profiles[profileId].scopes[scopeId].stype != ScopeType.NONE;
  }

  function profileIsPolicyExist(bytes32 profileId, bytes32 policyId) external view returns (bool) {
    return _data.profiles[profileId].policies[policyId].adminId != bytes32(0);
  }

  function profileScopeBaseInfo(bytes32 profileId, bytes32 scopeId) external view returns (BaseScope memory) {
    return _data.profiles[profileId].scopes[scopeId];
  }

  function profileAgentBaseInfo(bytes32 profileId, bytes32 agentId) external view returns (BaseAgent memory) {
    return _data.profiles[profileId].agents[agentId];
  }

  function profileCheckScopesCompatibility(
    bytes32 profileId,
    bytes32 destScopeId,
    bytes32 srcScopeId
  ) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doProfileScopesCompatible(profileEntity, destScopeId, srcScopeId);
  }

  function _doProfileScopesCompatible(
    ProfileEntity storage profileEntity,
    bytes32 destScopeId,
    bytes32 srcScopeId
  ) internal view returns (bool) {
    ScopeType destScopeType = profileEntity.scopes[destScopeId].stype;
    ScopeType srcScopeType = profileEntity.scopes[srcScopeId].stype;
    if (destScopeType == ScopeType.NONE || srcScopeType == ScopeType.NONE) return false;
    if (destScopeType == ScopeType.UNIVERSE) return true;

    if (destScopeType == ScopeType.CONTEXT && srcScopeType == ScopeType.FUNCTION) {
      ContextEntity storage ce = profileEntity.profileContextReadSlot(destScopeId);
      return ce.functions.contains(srcScopeId);
    } else if (destScopeType == ScopeType.REALM && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = profileEntity.profileFunctionReadSlot(srcScopeId);
      RealmEntity storage re = profileEntity.profileRealmReadSlot(destScopeId);
      return re.contexts.contains(fe.contextId);
    } else if (destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.FUNCTION) {
      FunctionEntity storage fe = profileEntity.profileFunctionReadSlot(srcScopeId);
      ContextEntity storage ce = profileEntity.profileContextReadSlot(fe.contextId);
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
    } else if (destScopeType == ScopeType.REALM && srcScopeType == ScopeType.CONTEXT) {
      RealmEntity storage re = profileEntity.profileRealmReadSlot(destScopeId);
      return re.contexts.contains(srcScopeId);
    } else if (destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.CONTEXT) {
      ContextEntity storage ce = profileEntity.profileContextReadSlot(srcScopeId);
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(ce.realmId);
    } else if (destScopeType == ScopeType.DOMAIN && srcScopeType == ScopeType.REALM) {
      DomainEntity storage de = profileEntity.profileDomainReadSlot(destScopeId);
      return de.realms.contains(srcScopeId);
    }

    return false;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLGenerals);
  }
}
