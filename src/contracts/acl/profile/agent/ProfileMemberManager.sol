// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileMemberManagement.sol";
import "./IProfileRoleManagement.sol";
import "./IProfileTypeManagement.sol";
import "../IProfileACL.sol";
import "../ProfileAccessControl.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title ACL Profile Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileMemberManager is ACLStorage, BaseUUPSProxy, IProfileMemberManagement {
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
      interfaceId == type(IProfileMemberManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // Note: called by eveny admin of role
  function profileMemberRegister(ProfileMemberRegisterRequest[] calldata requests) external returns (bool) {

    for (uint256 i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  

      LProfileCommons.profileCheckMemberForMemberRegister(profileEntity, uint16(requests[i].members.length), senderId);

      // // check profile and member limitations and update it
      // ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(senderId);
      // require(profileMemberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
      // require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
      // require(profileMemberEntity.registerLimits.memberRegisterLimit - uint16(requests[i].members.length) > 0, "Illegal MemeberRegisterLimit");
      // require(profileEntity.registerLimits.memberRegisterLimit - uint16(requests[i].members.length) > 0, "Illegal RegisterLimit");
      // profileMemberEntity.registerLimits.memberRegisterLimit -= uint16(requests[i].members.length); 
      // profileEntity.registerLimits.memberRegisterLimit -= uint16(requests[i].members.length);

      for (uint256 j = 0; j < requests[i].members.length; j++) {     
        _doProfileMemberRegister(profileEntity, requests[i].members[j], senderId, requests[i].profileId, functionId);
      }
    }

    return true;
  }

  function profileMemberUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(profileEntity.owner != memberEntity.account , "Illegal Member");
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");        
        memberEntity.ba.acstat = requests[i].data[j].acstat;
        emit ProfileMemberActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;  
  }

  function profileMemberUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateAlterabilityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].entityId);
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, memberEntity.ba.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        memberEntity.ba.alstat = requests[i].data[j].alstat;
        emit ProfileMemberAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  // Note: member default admin is 
  function profileMemberUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateAdmin.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);

        // checking requested admin of member
        if (requests[i].data[j].adminId != bytes32(0)) {
          BaseAgent storage requestedAdminAgent = _data.agents[requests[i].data[j].adminId];
          require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");       
          memberEntity.ba.adminId = requests[i].data[j].adminId;      
        } else {
          memberEntity.ba.adminId = _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
        }
        emit ProfileMemberAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileMemberUpdateTypeLimit(ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateTypeLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].limits.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].memberId, senderId, functionId);
        require(requests[i].limits[j].limit > memberEntity.types.length(), "Illegal Limit" );
        memberEntity.typeLimit = requests[i].limits[j].limit;
        emit ProfileMemberTypeLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].memberId, requests[i].limits[j].limit);
      }
    }
    return true;
  }  

  function profileMemberUpdateRegsiterLimit(ProfileMemberUpdateRegisterLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateRegsiterLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].registerLimits.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].registerLimits[j].memberId, senderId, functionId);
        memberEntity.registerLimits = requests[i].registerLimits[j].registerLimit;
        emit ProfileMemberRegisterLimitUpdated(msg.sender, requests[i].profileId, requests[i].registerLimits[j].memberId, requests[i].registerLimits[j].registerLimit);
      }
    }
    return true;
  }

  function profielMemberUpdateCallLimit(ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profielMemberUpdateCallLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].limits.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].memberId, senderId, functionId);
        memberEntity.callLimit = requests[i].limits[j].limit;
        emit ProfileMemberCallLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].memberId, requests[i].limits[j].limit);
      }
    }
    return true;    
  }

  function profileMemberCheckId(bytes32 profileId, bytes32 memberId) external view returns (bool) {
    return _data.profiles[profileId].agents[memberId].atype == AgentType.MEMBER;
  }

  function profileMemberCheckAccount(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].agents[keccak256(abi.encodePacked(account))].atype == AgentType.MEMBER;
  }

  function profileMemberCheckAdmin(bytes32 profileId, bytes32 memberId, address account) external view returns (bool) {
    return LProfileCommons.profileMemberCheckAdmin(_data, profileId, memberId, account);
    // ProfileEntity storage profileEntity = _data.profiles[profileId];
    // if(profileEntity.acstat == ActivityStatus.NONE) return false;
    // if (profileEntity.agents[memberId].atype != AgentType.MEMBER) return false;    
    
    // bytes32 memberAdminId = profileEntity.agents[memberId].adminId;
    // AgentType adminAgenType = profileEntity.agents[memberAdminId].atype;
    // bytes32 accountId = LACLUtils.accountGenerateId(account);

    // if(adminAgenType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(memberAdminId);
    //   if(!result) return false;

    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return false;  

    //   return typeEntity.members[accountId] != bytes32(0);
    
    // } else if(adminAgenType == AgentType.TYPE) {
    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(memberAdminId);
    //   if(!result1) return false;  

    //   return typeEntity.members[accountId] != bytes32(0);  
    // }
  
    // return false;
  }


  function profileMemberHasType(bytes32 profileId, bytes32 memberId, bytes32 typeId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if(result) return member.types.contains(typeId);
    return false;
  }

  function profileMemberGetTypes(bytes32 profileId, bytes32 memberId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if(!result) return new bytes32[](0);
    return member.types.values();   
  }

  function profileMemberGetInfo(bytes32 profileId, bytes32 memberId) external view returns (ProfileMemberInfo memory) {
    return LProfileCommons.profileMemberGetInfo(_data, profileId, memberId);
    // ProfileEntity storage profileEntity = _data.profiles[profileId];
    // (ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    // if(!result || profileEntity.acstat == ActivityStatus.NONE) {
    //   return ProfileMemberInfo({
    //     adminId: bytes32(0),
    //     account: address(0),
    //     typeLimit: 0,
    //     typeCount: 0,
    //     callLimit: 0,
    //     registerLimit: ProfileRegisterLimit({
    //       memberRegisterLimit: 0,
    //       roleRegisterLimit: 0,
    //       typeRegisterLimit: 0,
    //       functionRegisterLimit: 0,
    //       contextRegisterLimit: 0,
    //       realmRegisterLimit: 0,
    //       domainRegisterLimit: 0,
    //       policyRegisterLimit: 0
    //     }),
    //     atype: AgentType.NONE,
    //     acstat: ActivityStatus.NONE,
    //     alstat: AlterabilityStatus.NONE
    //   });
    // }

    // return ProfileMemberInfo({
    //   adminId: member.ba.adminId,
    //   account: member.account,
    //   typeLimit: member.typeLimit,
    //   typeCount: uint32(member.types.length()),
    //   callLimit: member.callLimit,
    //   registerLimit: ProfileRegisterLimit({
    //     memberRegisterLimit: member.registerLimits.memberRegisterLimit,
    //     roleRegisterLimit: member.registerLimits.roleRegisterLimit,
    //     typeRegisterLimit: member.registerLimits.typeRegisterLimit,
    //     functionRegisterLimit: member.registerLimits.functionRegisterLimit,
    //     contextRegisterLimit: member.registerLimits.contextRegisterLimit,
    //     realmRegisterLimit: member.registerLimits.realmRegisterLimit,
    //     domainRegisterLimit: member.registerLimits.domainRegisterLimit,
    //     policyRegisterLimit:member.registerLimits.policyRegisterLimit
    //   }),
    //   atype: member.ba.atype,
    //   acstat: member.ba.acstat,
    //   alstat: member.ba.alstat
    // });
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
    // // owners always access to all entities to modify those
    // if(profileEntity.admins.contains(senderId)) return IProfileACL.ProfileAdminAccessStatus.PERMITTED;

    // (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    // if (!res) return IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND;

    // // if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    // AgentType adminAgentType = profileEntity.agents[adminId].atype;
    // if(adminAgentType == AgentType.ROLE) {
    //   (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
    //   if(!result) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
    //   if (typeEntity.members[senderId] != adminId) return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
   
    // } else if(adminAgentType == AgentType.TYPE) { 
    //   (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
    //   if(!result1) return IProfileACL.ProfileAdminAccessStatus.TYPE_NOT_FOUND;
    //   if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

    //   bytes32 roleId = typeEntity.members[senderId];
    //   (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
    //   if(!result2) return IProfileACL.ProfileAdminAccessStatus.ROLE_NOT_FOUND;
    //   if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IProfileACL.ProfileAdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
    //   PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
    //   if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
    //     return IProfileACL.ProfileAdminAccessStatus.POLICY_FORBIDDEN;

    //   return IProfileACL.ProfileAdminAccessStatus.PERMITTED;
    // } 

    // return IProfileACL.ProfileAdminAccessStatus.NOT_PERMITTED;
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
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
    return (profileEntity, functionId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 memberId, bytes32 senderId, bytes32 functionId) internal view returns (ProfileMemberEntity storage) {
    ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(memberId);
    require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, memberEntity.ba.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return memberEntity;
  }

  function _checkProfileAccount(bytes32 profileId, bytes32 typeId, ProfileMemberEntity storage profileMemberEntity) internal view {
    ProfileAccount storage profileAccount = _data.profileAccounts[profileMemberEntity.account];
    bool findFlag = false;
    for (uint i = 0; i < profileAccount.profiles.length; i++) {
      if(profileAccount.profiles[i] == profileId) {
        if((profileMemberEntity.types.contains(_LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) || 
          profileMemberEntity.types.contains(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)) &&
          (typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID || typeId == _LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)
        ) {
          revert ("Illegal GrantMemberType");
        }      
        findFlag = true;
        break;
      }
    }
  }

  function _doProfileMemberRegister(ProfileEntity storage profileEntity, ProfileMemberRegisterDataRequest calldata memberRequest, bytes32 senderId, bytes32 profileId, bytes32 functionId) internal {
    bytes32 newMemberId = LACLUtils.accountGenerateId(memberRequest.account);      
          
    // check role
    RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(memberRequest.roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Updatable");
    require(roleEntity.memberLimit > roleEntity.memberCount, "Illegal Register");      

    // check type 
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
        
    // check access
    IProfileACL.ProfileAdminAccessStatus adminAccessStatus = _doCheckAdminAccess(profileEntity, roleEntity.ba.adminId, senderId, functionId);
    if(adminAccessStatus != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(adminAccessStatus);

    // if member already exist, it try to grant member to requested role
    if(_data.agents[newMemberId].acstat == ActivityStatus.NONE) {
        ProfileMemberEntity storage profileMemberEntityReq = profileEntity.profileMemberReadSlot(newMemberId);
        if(profileMemberEntityReq.types.contains(roleEntity.typeId)) {
          require(typeEntity.members[newMemberId] != memberRequest.roleId, "Already Exist");
        } else {
          require(profileMemberEntityReq.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Member Updatable");
          require(profileMemberEntityReq.typeLimit > profileMemberEntityReq.types.length(), "Illegal Member Types");
          profileMemberEntityReq.types.add(roleEntity.typeId);  
        }

        // create profile account for member
        _checkProfileAccount(profileId, roleEntity.typeId, profileMemberEntityReq);

        // check admin
        if(roleEntity.typeId == _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID) {
          profileEntity.admins.add(newMemberId);
        }

        typeEntity.members[newMemberId] = memberRequest.roleId;
        roleEntity.memberCount += 1;
        emit ProfileMemberRoleGranted(msg.sender, profileId, memberRequest.roleId, newMemberId, roleEntity.typeId);

    } else {
      // add new member to type
      typeEntity.members[newMemberId] = memberRequest.roleId;

      // add new member to role
      roleEntity.memberCount +=1;      

      // create new member
      ProfileMemberEntity storage newMember = profileEntity.profileMemberWriteSlot(newMemberId);

      // create profileAccount
      ProfileAccount storage profileAccount = _data.profileAccounts[memberRequest.account];
      require(profileAccount.profiles.length == 0, "Illegal ProfileAccount");
      ProfileAccount storage newProfileAccount = _data.profileAccounts[memberRequest.account];
      newProfileAccount.profiles.push(profileId);

      // check adminId
      if(memberRequest.adminId != bytes32(0)) {
        adminAccessStatus = _doCheckAdminAccess(profileEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId, functionId);
        if(adminAccessStatus != IProfileACL.ProfileAdminAccessStatus.PERMITTED) revert IProfileACL.ProfileSetAdminForbidden(adminAccessStatus);
        newMember.ba.adminId = memberRequest.adminId;
      } else {
        newMember.ba.adminId = _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
      }
      
      newMember.ba.atype = AgentType.MEMBER;
      newMember.ba.acstat = ActivityStatus.ENABLED;
      newMember.ba.alstat = AlterabilityStatus.UPGRADABLE;
      newMember.account = memberRequest.account;
      newMember.types.add(roleEntity.typeId);
      newMember.typeLimit = profileEntity.limits.typeLimit;
      newMember.callLimit = profileEntity.limits.memberCallLimit;
      newMember.registerLimits = memberRequest.registerLimit;

      emit ProfileMemberRegistered(
        msg.sender,
        profileId,
        newMemberId,
        memberRequest.account,
        memberRequest.roleId,
        newMember.ba.adminId
      );
    }
  }
}