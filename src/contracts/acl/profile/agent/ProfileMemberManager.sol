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
import "../../../lib/acl/LACLStorage.sol";
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
  using LACLStorage for DataCollection;  
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

  // Note: called by any admin of role
  function profileMemberRegister(bytes32 profileId, ProfileMemberRegisterRequest[] calldata requests) external returns (bool) {

    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberRegister.selector);
    LProfileCommons.profileCheckMemberForMemberRegister(profileEntity, uint16(requests.length), senderId);
    for (uint256 i = 0; i < requests.length; i++) {            
      _doProfileMemberRegister(profileEntity, requests[i], functionEntity, senderId, profileId);
    }

    return true;
  }

  function profileMemberUpdateActivityStatus(bytes32 profileId, ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);
      require(profileEntity.owner != memberEntity.account , "Illegal Member");
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");        
      memberEntity.ba.acstat = requests[i].acstat;
      emit ProfileMemberActivityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;  
  }

  function profileMemberUpdateAlterabilityStatus(bytes32 profileId, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateAlterabilityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(requests[i].entityId);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, memberEntity.ba.adminId, senderId);
      if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      memberEntity.ba.alstat = requests[i].alstat;
      emit ProfileMemberAlterabilityUpdated(msg.sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  // Note: member default admin is 
  function profileMemberUpdateAdmin(bytes32 profileId, ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateAdmin.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);

      // checking requested admin of member
      if (requests[i].adminId != bytes32(0)) {
        BaseAgent storage requestedAdminAgent = profileEntity.agents[requests[i].adminId];
        require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");       
        memberEntity.ba.adminId = requests[i].adminId;      
      } else {
        memberEntity.ba.adminId = _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
      }
      emit ProfileMemberAdminUpdated(msg.sender, profileId, requests[i].entityId, requests[i].adminId);
    }
    return true;
  }

  function profileMemberUpdateTypeLimit(bytes32 profileId, ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateTypeLimit.selector);
    for(uint i = 0; i < requests.length; i++) {    
      ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].memberId, senderId);
      require(requests[i].limit > memberEntity.types.length(), "Illegal Limit" );
      memberEntity.typeLimit = requests[i].limit;
      emit ProfileMemberTypeLimitUpdated(msg.sender, profileId, requests[i].memberId, requests[i].limit);
    }
    return true;
  }  

  function profileMemberUpdateRegisterLimit(bytes32 profileId, ProfileMemberUpdateRegisterLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateRegisterLimit.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].memberId, senderId);
      _doCheckRegisterLimit(profileEntity, requests[i].registerLimit);
      memberEntity.registerLimits = requests[i].registerLimit;
      emit ProfileMemberRegisterLimitUpdated(msg.sender, profileId, requests[i].memberId, requests[i].registerLimit);
    }
    return true;
  }

  function profileMemberUpdateCallLimit(bytes32 profileId, ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 senderId) = _accessPermission(profileId, IProfileMemberManagement.profileMemberUpdateCallLimit.selector);
    for(uint i = 0; i < requests.length; i++) {    
      ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].memberId, senderId);
      memberEntity.callLimit = requests[i].limit;
      emit ProfileMemberCallLimitUpdated(msg.sender, profileId, requests[i].memberId, requests[i].limit);
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
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 adminId, bytes32 senderId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);  
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(IProfileACL.ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   

    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);
    if (!res) LACLUtils.generateProfileAdminAccessError(IProfileACL.ProfileAdminAccessStatus.FUNCTION_NOT_FOUND);

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);    
    return (profileEntity, functionEntity, senderId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 memberId, bytes32 senderId) internal view returns (ProfileMemberEntity storage) {
    ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(memberId);
    require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, memberEntity.ba.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return memberEntity;
  }

  function _checkProfileAccount(bytes32 profileId, bytes32 typeId, ProfileMemberEntity storage profileMemberEntity) internal view {
    ProfileAccount storage profileAccount = _data.profileAccounts[profileMemberEntity.account];
    require(profileAccount.profiles.length > 0, "PA Not Found");
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

    if(!findFlag) {
      revert ("Illegal PA");
    }
  }

  function _doProfileMemberRegister(ProfileEntity storage profileEntity, ProfileMemberRegisterRequest calldata memberRequest, FunctionEntity storage functionEntity, bytes32 senderId, bytes32 profileId) internal {
    bytes32 newMemberId = LACLUtils.accountGenerateId(memberRequest.account);  
    require(profileEntity.agents[newMemberId].acstat == ActivityStatus.NONE, "Already Exist");

    // check register limits
    _doCheckRegisterLimit(profileEntity, memberRequest.registerLimit);
          
    // check role
    RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(memberRequest.roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Updatable");
    require(roleEntity.memberLimit > roleEntity.memberCount, "Illegal Register");      

    // check type 
    TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");
        
    // check access
    IProfileACL.ProfileAdminAccessStatus adminAccessStatus = _doCheckAdminAccess(profileEntity, functionEntity, roleEntity.ba.adminId, senderId);
    if(adminAccessStatus != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(adminAccessStatus);

    // add new member to type
    typeEntity.members[newMemberId] = memberRequest.roleId;

    // add new member to role
    roleEntity.memberCount +=1;     

    // create new member
    ProfileMemberEntity storage newMember = profileEntity.profileMemberWriteSlot(newMemberId);

    // create profileAccount
    ProfileAccount storage newProfileAccount = _data.profileAccounts[memberRequest.account];
    require(newProfileAccount.profiles.length == 0, "PA Already Exist");
    newProfileAccount.profiles.push(profileId);

    // check adminId
    if(memberRequest.adminId != bytes32(0)) {
      require(profileEntity.agents[memberRequest.adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      adminAccessStatus = _doCheckAdminAccess(profileEntity, functionEntity, _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, senderId);
      if(adminAccessStatus != IProfileACL.ProfileAdminAccessStatus.PERMITTED) revert IProfileACL.ProfileSetAdminForbidden(adminAccessStatus);
      newMember.ba.adminId = memberRequest.adminId;
    } else {
      newMember.ba.adminId = _LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID;
    }
    
    newMember.ba.atype = AgentType.MEMBER;
    newMember.ba.acstat = ActivityStatus.ENABLED;
    newMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    newMember.account = memberRequest.account;
    newMember.types.add(roleEntity.typeId);
    newMember.typeLimit = memberRequest.typeLimit >= 1 ? uint16(uint24(memberRequest.typeLimit)) : profileEntity.limits.typeLimit;
    newMember.callLimit = memberRequest.callLimit >= 0 ? uint16(uint24(memberRequest.callLimit)) : profileEntity.limits.memberCallLimit;
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

  function _doCheckRegisterLimit(ProfileEntity storage profileEntity, ProfileRegisterLimit calldata registerLimitRequest) internal view {
    require(profileEntity.registerLimits.memberRegisterLimit >= registerLimitRequest.memberRegisterLimit, "Illegal MemberRegister");
    require(profileEntity.registerLimits.roleRegisterLimit >= registerLimitRequest.roleRegisterLimit , "Illegal RoleRegister");
    require(profileEntity.registerLimits.typeRegisterLimit >= registerLimitRequest.typeRegisterLimit, "Illegal TypeRegister");
    require(profileEntity.registerLimits.functionRegisterLimit >= registerLimitRequest.functionRegisterLimit, "Illegal FunctionRegister");
    require(profileEntity.registerLimits.contextRegisterLimit >= registerLimitRequest.contextRegisterLimit, "Illegal ContextRegister");
    require(profileEntity.registerLimits.realmRegisterLimit >= registerLimitRequest.realmRegisterLimit, "Illegal RealmRegister");
    require(profileEntity.registerLimits.domainRegisterLimit >= registerLimitRequest.domainRegisterLimit, "Illegal DomainRegister");
    require(profileEntity.registerLimits.policyRegisterLimit >= registerLimitRequest.policyRegisterLimit, "Illegal PolicyRegister");
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }  
}