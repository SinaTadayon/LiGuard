// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileRoleManagement.sol";
import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../../ACLStorage.sol";
import "../IProfileACL.sol";
import "../ProfileAccessControl.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LProfileRolePolicy.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";


/**
 * @title ACL Role Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileRoleManager is ACLStorage, BaseUUPSProxy, IProfileRoleManagement {
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
      interfaceId == type(IProfileRoleManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // type admins call roleRegister function
  function profileRoleRegister(ProfileRoleRegisterRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleRegister.selector);
      LProfileRolePolicy.profileCheckMemberForRoleRegister(profileEntity, uint16(requests[i].roles.length), senderId);

      for(uint j = 0; j < requests[i].roles.length; j++) {      
        (bytes32 newRoleId, bytes32 adminId) = LProfileRolePolicy.profileRoleRegister(requests[i].roles[j], profileEntity, requests[i].profileId, senderId, functionId);
        emit ProfileRoleRegistered(
          msg.sender,          
          requests[i].profileId,
          newRoleId,
          requests[i].roles[j].typeId, 
          adminId,
          requests[i].roles[j].scopeId 
        );
      }
    }
    return true;
  }

  // Note: Admin must be Role or Type, and it can't be a member 
  function profileRoleUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {      
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateAdmin.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        roleEntity.ba.adminId = _getRoleAdmin(profileEntity, profileEntity.scopes[roleEntity.scopeId].stype, profileEntity.agents[roleEntity.typeId].adminId, roleEntity.scopeId, requests[i].data[j].adminId, requests[i].profileId);
        emit ProfileRoleAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileRoleUpdateScope(ProfileUpdateScopeRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateScope.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        LProfileRolePolicy.profileRoleUpdateScope(requests[i].data[j], profileEntity, requests[i].profileId, senderId, functionId);        
        emit ProfileRoleScopeUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].scopeId);
      }
    }
    return true;
  }

  function profileRoleUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateActivityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");
        roleEntity.ba.acstat = requests[i].data[j].acstat;
        emit ProfileRoleActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileRoleUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateAlterabilityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {      
        RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[i].data[j].entityId);    
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        roleEntity.ba.alstat = requests[i].data[j].alstat;
        emit ProfileRoleAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileRoleUpdateMemberLimit(ProfileRoleUpdateMemberLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleUpdateMemberLimit.selector);      
      for(uint j = 0; j < requests[i].limits.length; j++) {      
        RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].roleId, senderId, functionId);
        require(requests[i].limits[j].memberLimit > roleEntity.memberCount, "Illegal Limit");
        roleEntity.memberLimit = requests[i].limits[j].memberLimit;           
        emit ProfileRoleMemberLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].roleId, requests[i].limits[j].memberLimit);
      }
    }
    return true;
  }

  function profileRoleGrantMembers(ProfileRoleGrantMembersRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleGrantMembers.selector);
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].roleId, senderId, functionId);
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
       
      for (uint j = 0; j < requests[i].members.length; j++) {        
        require(roleEntity.memberCount < roleEntity.memberLimit, "Illegal Grant");
        ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(requests[i].members[j]);
        if(profileMemberEntity.types.contains(roleEntity.typeId)) {
          {
            bytes32 currentRoleId = typeEntity.members[requests[i].members[j]];          
            require(currentRoleId != requests[i].roleId, "Already Exist");
            RoleEntity storage currentRoleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, currentRoleId, senderId, functionId);
            require(currentRoleEntity.memberCount > 0, "Illegal MemberTotal");
            unchecked { currentRoleEntity.memberCount -= 1; }          
          }
          emit ProfileRoleMemberRevoked(msg.sender, requests[i].profileId, typeEntity.members[requests[i].members[j]], requests[i].members[j], roleEntity.typeId);

        } else {
          require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
          require(profileMemberEntity.typeLimit > profileMemberEntity.types.length(), "Illegal TypeLimit");
          _updateProfileAccount(requests[i].profileId, roleEntity.typeId, profileMemberEntity, false);
          // check and add member from admin
          if(roleEntity.typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) 
            profileEntity.admins.add(requests[i].members[j]);          
        }

        typeEntity.members[requests[i].members[j]] = requests[i].roleId;
        roleEntity.memberCount += 1;
        emit ProfileRoleMemberGranted(msg.sender, requests[i].profileId, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }  
    }
    return true;
  } 

  function profileRoleRevokeMembers(ProfileRoleRevokeMembersRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileRoleManagement.profileRoleRevokeMembers.selector);      
      RoleEntity storage roleEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].roleId, senderId, functionId);
      TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
      require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");  

      for (uint j = 0; j < requests[i].members.length; j++) {
        ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(requests[i].members[j]);
        require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");

        require(typeEntity.members[requests[i].members[j]] != bytes32(0), "Not Found");
        require(roleEntity.memberCount > 0, "Illegal MemberTotal");
        delete typeEntity.members[requests[i].members[j]];
        unchecked { 
          roleEntity.memberCount -= 1; 
        }
        profileMemberEntity.types.remove(roleEntity.typeId);
        _updateProfileAccount(requests[i].profileId, roleEntity.typeId, profileMemberEntity, true);
        
        // check and remove member from admin
        if(profileEntity.admins.contains(requests[i].members[j])) {
          require(profileEntity.owner != profileMemberEntity.account, "Illegal Revoke");
          profileEntity.admins.remove(requests[i].members[j]);
        }
        
        if(profileMemberEntity.types.length() == 0) { 
          delete profileMemberEntity.ba;
          delete profileMemberEntity.callLimit;
          delete profileMemberEntity.typeLimit;
          delete profileMemberEntity.account;
          delete profileMemberEntity.registerLimits;
          delete profileMemberEntity.types;
          emit ProfileRoleMemberDeleted(msg.sender, requests[i].profileId, requests[i].members[j], requests[i].roleId, roleEntity.typeId, profileMemberEntity.account);
        }
        emit ProfileRoleMemberRevoked(msg.sender, requests[i].profileId, requests[i].roleId, requests[i].members[j], roleEntity.typeId);
      }      
    }
    return true;
  }
  
 
  function profileRoleCheckId(bytes32 profileId, bytes32 roleId) external view returns (bool) {
    return _data.profiles[profileId].agents[roleId].atype == AgentType.ROLE;
  }

  function profileRoleCheckName(bytes32 profileId, string calldata roleName) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(roleName))].atype == AgentType.ROLE;
  }

  function profileRoleCheckAdmin(bytes32 profileId, bytes32 roleId, address account) external view returns (bool) {
    return LProfileRolePolicy.profileRoleCheckAdmin(_data, profileId, roleId, account);   
  }

  function profileRoleHasAccount(bytes32 profileId, bytes32 roleId, address account) external view returns (bool) {
    return LProfileRolePolicy.profileRoleHasAccount(_data, profileId, roleId, account);  
  }

  function profileRoleGetInfo(bytes32 profileId, bytes32 roleId) external view returns (ProfileRoleInfo memory) {
    return LProfileRolePolicy.profileRoleGetInfo(_data, profileId, roleId);    
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

  function _getRoleAdmin(ProfileEntity storage profileEntity, ScopeType requestScopeType, bytes32 requestScopeAdmin, bytes32 scopeId, bytes32 adminId, bytes32 profileId) internal view returns (bytes32 roleAdminId) {
    return LProfileRolePolicy.profileGetRoleAdmin(profileEntity, requestScopeType, requestScopeAdmin, scopeId, adminId, profileId);
  }

  function _getAndCheckRequestScope(ProfileEntity storage profileEntity, bytes32 requestScopeId, bytes32 typeScopeId, bytes32 profileId) internal returns(ScopeType) {
    return LProfileRolePolicy.profileCheckRoleRequestScope(profileEntity, requestScopeId, typeScopeId, profileId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 senderId, bytes32 functionId) internal view returns (RoleEntity storage) {
    return LProfileRolePolicy.profileGetRoleEntityAndCheckAdminAccess(profileEntity, roleId, senderId, functionId);
  }

  function _updateProfileAccount(bytes32 profileId, bytes32 typeId, ProfileMemberEntity storage profileMemberEntity, bool isRevoke) internal {
    return LProfileRolePolicy.updateProfileAccount(_data, profileMemberEntity, profileId, typeId, isRevoke);   
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileRolePolicy);
  }  
}