// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfilePolicyManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../agent/IProfileRoleManagement.sol";
import "../agent/IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../../../proxy/IProxy.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileRolePolicy.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Policy Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfilePolicyManager is ACLStorage, BaseUUPSProxy, IProfilePolicyManagement {
  using LProfileStorage for ProfileEntity;
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
    return
      interfaceId == type(IProfilePolicyManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }
 
  // called by members of Policy Master type
  function profilePolicyRegister(bytes32 profileId, ProfilePolicyRegisterRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity,,bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyRegister.selector);

    // check profile and type limitations and update it
    LProfileRolePolicy.profileCheckMemberForPolicyRegister(profileEntity, uint16(requests.length), senderId);
      
    (ScopeType senderScopeType, bytes32 senderScopeId) = _getMemberPolicyScopeInfo(profileEntity, msg.sender);

    for(uint i = 0; i < requests.length; i++) {    
      bytes32 newPolicyId = LProfileRolePolicy.profilePolicyRegister(profileEntity, requests[i], profileId, senderScopeType, senderScopeId);
      emit ProfilePolicyRegistered(
        msg.sender,
        profileId,
        newPolicyId,
        requests[i].scopeId,
        requests[i].adminId,
        requests[i].policyCode
      );
    }
    return true;
  }

  // called by policy admin
  function profilePolicyAddRoles(bytes32 profileId, ProfilePolicyAddRolesRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyAddRoles.selector);
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);      
      ScopeType policyScopeType = profileEntity.scopes[policyEntity.scopeId].stype;
      for (uint j = 0; j < requests[i].roles.length; j++) {
        LProfileRolePolicy.profilePolicyAddRoles(profileEntity, policyEntity, profileId, requests[i].policyId, requests[i].roles[j], policyScopeType);
        emit ProfilePolicyRoleAdded(msg.sender, profileId, requests[i].policyId, requests[i].roles[j]);
      }            
    }
    return true;
  }

  // called by policy admin
  function profilePolicyRemoveRoles(bytes32 profileId, ProfilePolicyRemoveRolesRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyRemoveRoles.selector);
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);
      for (uint j = 0; j < requests[i].roles.length && j < 32; j++) {
        require(policyEntity.roles.contains(requests[i].roles[j]), "Not Found");    
        delete profileEntity.rolePolicyMap[requests[i].roles[j]];
        policyEntity.roles.remove(requests[i].roles[j]);
        emit ProfilePolicyRoleRemoved(msg.sender, profileId, requests[i].policyId, requests[i].roles[j]);
      }      
    }
    return true;
  }

  function profilePolicyUpdateCodes(bytes32 profileId, ProfilePolicyUpdateCodeRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateCodes.selector);
    for(uint i = 0; i < requests.length; i++) {    
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);
      policyEntity.policyCode = requests[i].policyCode;
      policyEntity.ptype = _doGetPolicyType(requests[i].policyCode);
      emit ProfilePolicyCodeUpdated(msg.sender, profileId, requests[i].policyId, requests[i].policyCode, policyEntity.ptype);
    }
    return true;
  }

  function profilePolicyUpdateAdmin(bytes32 profileId, ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateAdmin.selector);
    for(uint i = 0; i < requests.length; i++) {    
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].entityId, senderId, functionId);    
      policyEntity.adminId = _getPolicyAdmin(profileEntity, profileEntity.scopes[policyEntity.scopeId].stype, profileEntity.scopes[policyEntity.scopeId].adminId, policyEntity.scopeId, requests[i].adminId, profileId);
      require(!policyEntity.roles.contains(policyEntity.adminId), "Illegal Admin Id");
      emit ProfilePolicyAdminUpdated(msg.sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profilePolicyUpdateScope(bytes32 profileId, ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateScope.selector);
    for(uint i = 0; i < requests.length; i++) {
      LProfileRolePolicy.profilePolicyUpdateScope(profileEntity, requests[i], profileId, senderId, functionId);
      emit ProfilePolicyScopeUpdated(msg.sender, profileId, requests[i].entityId, requests[i].scopeId);
    }
    return true;
  }

  function profilePolicyUpdateActivityStatus(bytes32 profileId, ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].entityId, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");       
      policyEntity.acstat = requests[i].acstat;
      emit ProfilePolicyActivityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profilePolicyUpdateAlterabilityStatus(bytes32 profileId, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateAlterabilityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      LProfileRolePolicy.profilePolicyUpdateAlterabilityStatus(profileEntity, requests[i], senderId, functionId);
      emit ProfilePolicyAlterabilityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;  
  }

  function profilePolicyUpdateRoleLimit(bytes32 profileId, ProfilePolicyUpdateRoleLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(profileId, IProfilePolicyManagement.profilePolicyUpdateRoleLimit.selector);
    for(uint i = 0; i < requests.length; i++) {
      PolicyEntity storage policyEntity = _doGetPolicyAndCheckAdminAccess(profileEntity, requests[i].policyId, senderId, functionId);
      require(requests[i].roleLimit > policyEntity.roles.length(), "Illegal Limit");
      policyEntity.roleLimit = requests[i].roleLimit;            
      emit ProfilePolicyRoleLimitUpdated(msg.sender, profileId, requests[i].policyId, requests[i].roleLimit);
    }
    return true;
  }

  function profilePolicyCheckId(bytes32 profileId, bytes32 policyId) external view returns (bool) {
    return _data.profiles[profileId].policies[policyId].adminId != bytes32(0);
  }

  function profilePolicyCheckName(bytes32 profileId, string calldata policyName) external view returns (bool) {
    return _data.profiles[profileId].policies[LACLUtils.generateId(policyName)].adminId != bytes32(0);
  }

  function profilePolicyCheckAdmin(bytes32 profileId, bytes32 policyId, address account) external view returns (bool) {
    return LProfileRolePolicy.profilePolicyCheckAdmin(_data, profileId, policyId, account);
  }

  function profilePolicyCheckAccess(bytes32 profileId, bytes32 policyId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, policyId, functionId);
  }

  function profilePolicyCheckRoleAccess(bytes32 profileId, bytes32 roleId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doCheckAccessPolicy(profileEntity, profileEntity.rolePolicyMap[roleId], functionId);
  }

  function _doCheckAccessPolicy(ProfileEntity storage profileEntity, bytes32 policyId, bytes32 functionId) internal view returns (bool) {
    (FunctionEntity storage functionEntity, bool result) = profileEntity.profileFunctionTryReadSlot(functionId);
    if (!result) return false;

    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    if(policyEntity.acstat != ActivityStatus.ENABLED) return false;
    if(policyEntity.policyCode >= functionEntity.policyCode) return false;

    return true;
  
  }

  function profilePolicyCheckRole(bytes32 profileId, bytes32 roleId) external view returns (bool) {
      return _data.profiles[profileId].rolePolicyMap[roleId] != bytes32(0);
  }

  function profilePolicyHasRole(bytes32 profileId, bytes32 policyId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].rolePolicyMap[roleId] == policyId;
  }

  function profilePolicyGetInfoByRole(bytes32 profileId, bytes32 roleId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(_data.profiles[profileId].rolePolicyMap[roleId], roleId);
  }

  function profilePolicyGetInfo(bytes32 profileId, bytes32 policyId) external view returns (ProfilePolicyInfo memory) {
    return _doPolicyGetInfo(profileId, policyId);
  }

  function _doPolicyGetInfo(bytes32 profileId, bytes32 policyId) internal view returns (ProfilePolicyInfo memory) {
    return LProfileRolePolicy.profilePolicyGetInfo(_data, profileId, policyId);
  }

  function profilePolicyGetRoles(bytes32 profileId, bytes32 policyId) external view returns (bytes32[] memory) {
    if(_data.profiles[profileId].policies[policyId].adminId == bytes32(0)) return new bytes32[](0);
    return _data.profiles[profileId].policies[policyId].roles.values();
  }

  function _doGetPolicyType(uint8 policyCode) internal pure returns (PolicyType) {
    return LProfileRolePolicy.profileGetPolicyType(policyCode);
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileRolePolicy.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IProfileACL.ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileId, functionId, senderId);
    if(status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId, senderId);
  }

  function _getMemberPolicyScopeInfo(ProfileEntity storage profileEntity, address account) internal view returns (ScopeType, bytes32){
    bytes32 memberId = LACLUtils.accountGenerateId(account);  
    TypeEntity storage policyMasterType = profileEntity.profileTypeReadSlot(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
    bytes32 senderRoleId = policyMasterType.members[memberId];
    RoleEntity storage senderPolicyRole =  profileEntity.profileRoleReadSlot(senderRoleId);
    return (profileEntity.scopes[senderPolicyRole.scopeId].stype, senderPolicyRole.scopeId);
  }

  function _getPolicyAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 policyAdminId) {
    return LProfileRolePolicy.profileGetPolicyAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }
  
  function _doGetPolicyAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 policyId, bytes32 memberId, bytes32 functionId) internal view returns (PolicyEntity storage) {
    PolicyEntity storage policyEntity = profileEntity.policies[policyId];
    require(policyEntity.adminId != bytes32(0), "Not Found");      
    require(policyEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, policyEntity.adminId, memberId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return policyEntity;
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 senderScopeId, ScopeType senderScopeType, bytes32 profileId) internal view returns (BaseScope storage){
    return LProfileRolePolicy.profileGetAndCheckRequestScope(profileEntity, requestScopeId, senderScopeId, senderScopeType, profileId);
  }     

  function getLibrary() external pure returns (address) {
    return address(LProfileRolePolicy);
  }  
}