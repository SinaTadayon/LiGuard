// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileMemberManagement.sol";
import "./IProfileTypeManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../scope/IProfileFunctionManagement.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../lib/acl/LACLUtils.sol";
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
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(ProfileMemberRegisterRequest[i].profileId, IProfileMemberManagement.profileMemberRegister.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for (uint256 j = 0; j < requests.length; j++) {
        bytes32 newMemberId = LACLUtils.accountGenerateId(requests[j].account);
        require(_data.agents[newMemberId].acstat == ActivityStatus.NONE, "Already Exist");
        // require(requests[j].typeLimit >= 1, "Illegal TypeLimit");
        // require(
        //   requests[j].acstat > ActivityStatus.DELETED && 
        //   requests[j].alstat > AlterabilityStatus.NONE,
        //   "Illegal Activity/Alterability"
        // );

        // check role
        RoleEntity storage roleEntity = profileEntity.profileRoleReadSlot(requests[j].roleId);
        require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Updatable");
        require(roleEntity.memberLimit > roleEntity.memberCount, "Illegal Register");      

        // check type 
        TypeEntity storage typeEntity = profileEntity.profileTypeReadSlot(roleEntity.typeId);
        require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

        // check factory limit
        // if(requests[j].factoryLimit > 0) {
        //   require(roleEntity.typeId == _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID, "Illegal Factory Limit" );
        // }

        // check access
        require(_checkAdminAccessBySender(profileEntity, roleEntity.ba.adminId, senderId, functionId), "Forbidden");

        // add new member to type
        typeEntity.members[newMemberId] = requests[j].roleId;

        // add new member to role
        roleEntity.memberCount +=1;      

        // create new member
        ProfileMemberEntity storage newMember = profileEntity.profileMemberWriteSlot(newMemberId);

        // check adminId
        if(requests[i].adminId != bytes32(0)) {
          require(_checkAdminAccessBySender(_LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, senderId, functionId), "Set Admin Forbidden");
          newMember.ba.adminId = requests[i].adminId;
        } else {
          newMember.ba.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
        }
        
        newMember.ba.atype = AgentType.MEMBER;
        newMember.ba.acstat = ActivityStatus.ENABLED;
        newMember.ba.alstat = AlterabilityStatus.UPGRADABLE;
        newMember.account = requests[i].account;
        newMember.types.add(roleEntity.typeId);
        newMember.typeLimit = profileEntity.limits.typeLimit;
        newMember.callLimit = profileEntity.limits.callLimit;
        newMember.registerLimits = requests[i].registerLimit;

        emit ProfileMemberRegistered(
          msg.sender,
          profileId,
          newMemberId,
          requests[i].account,
          requests[i].roleId,
          newMember.ba.adminId
        );
      }
    }

    return true;
  }

  function profileMemberUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {    
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateActivityStatus.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(requests[i].data[j].entityId);
        require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
        require(_checkAdminAccessBySender(profileEntity, memberEntity.ba.adminId, senderId, functionId), "Forbidden");
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
        require(_checkAdminAccessBySender(profileEntity, memberEntity.ba.adminId, senderId, functionId), "Forbidden");      
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
        if (requests[i].adminId != bytes32(0)) {
          BaseAgent storage requestedAdminAgent = _data.agents[requests[i].adminId];
          require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");       
          memberEntity.ba.adminId = requests[i].adminId;      
        } else {
          memberEntity.ba.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
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
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].memberId, senderId, functionId);
        require(requests[i].data[j].limit > memberEntity.types.length(), "Illegal Limit" );
        memberEntity.typeLimit = requests[i].data[j].limit;
        emit ProfileMemberTypeLimitUpdated(msg.sender, requests[i].profileId, requests[i].data[j].memberId, requests[i].data[j].limit);
      }
    }
    return true;
  }  

  function profileMemberUpdateRegsiterLimit(ProfileMemberUpdateRegisterLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profileMemberUpdateRegsiterLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].memberId, senderId, functionId);
        memberEntity.factoryLimit = requests[i].data[j].registerLimits;
        emit ProfileMemberFactoryLimitUpdated(msg.sender, requests[i].profileId, requests[i].data[j].memberId, requests[i].data[j].registerLimits);
      }
    }
    return true;
  }

  function profielMemberUpdateCallLimit(ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId) = _accessPermission(requests[i].profileId, IProfileMemberManagement.profielMemberUpdateCallLimit.selector);
      bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
      for(uint j = 0; i < requests[i].data.length; j++) {
        ProfileMemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].memberId, senderId, functionId);
        memberEntity.callLimit = requests[i].data[j].limit;
        emit ProfileMemberCallLimitUpdated(msg.sender, requests[i].profileId, requests[i].data.memberId, requests[i].data.limit);
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    if (profileEntity.agents[memberId].atype != AgentType.MEMBER) return false;    
    
    bytes32 memberAdminId = profileEntity.agents[memberId].adminId;
    AgentType adminAgenType = profileEntity.agents[memberAdminId].atype;
    bytes32 accountId = LACLUtils.accountGenerateId(account);

    if(adminAgenType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(memberAdminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[accountId] != bytes32(0);
    
    } else if(adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(memberAdminId);
      if(!result1) return false;  

      return typeEntity.members[accountId] != bytes32(0);  
    }
  
    return false;
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (ProfileMemberEntity storage member, bool result) = profileEntity.profileMemberTryReadSlot(memberId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileMemberInfo({
        adminId: bytes32(0),
        account: address(0),
        typeLimit: 0,
        typeCount: 0,
        callLimit: 0,
        registerLimit: ProfileRegisterLimit({
          memberRegisterLimit: 0,
          roleRegisterLimit: 0,
          typeRegisterLimit: 0,
          functionRegisterLimit: 0,
          contextRegisterLimit: 0,
          realmRegisterLimit: 0,
          domainRegisterLimit: 0,
          policyRegisterLimit: 0
        }),
        atype: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return ProfileMemberInfo({
      adminId: member.ba.adminId,
      account: member.account,
      typeLimit: member.typeLimit,
      typeCount: uint32(member.types.length()),
      callLimit: member.callLimit,
      registerLimit: ProfileRegisterLimit({
        memberRegisterLimit: member.memberRegisterLimit,
        roleRegisterLimit: member.roleRegisterLimit,
        typeRegisterLimit: member.typeRegisterLimit,
        functionRegisterLimit: member.functionRegisterLimit,
        contextRegisterLimit: member.contextRegisterLimit,
        realmRegisterLimit: member.realmRegisterLimit,
        domainRegisterLimit: member.domainRegisterLimit,
        policyRegisterLimit:member.policyRegisterLimit0
      }),
      atype: member.ba.atype,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat
    });
  }

  // Note: Member could not assigned to any entities as admin
  function _checkAdminAccessBySender(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (bool) {
    // owners always access to all entities to modify those
    if(profileEntity.owners.contains(senderId)) return true;

    (FunctionEntity storage functionEntity, bool res) = profileEntity.profileFunctionTryReadSlot(functionId);    
    if (!res) return false;

    if(profileEntity.agents[senderId].acstat != ActivityStatus.ENABLED) return false;
    
    AgentType adminAgentType = profileEntity.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(adminId);
      if(!result || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      if (typeEntity.members[senderId] != adminId) return false;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(adminId);
      if(!result1 || typeEntity.ba.acstat != ActivityStatus.ENABLED) return false;

      bytes32 roleId = typeEntity.members[senderId];
      (RoleEntity storage roleEntity, bool result2) = profileEntity.profileRoleTryReadSlot(roleId);
      if(!result2 || roleEntity.ba.acstat != ActivityStatus.ENABLED) return false;
      
      PolicyEntity storage policyEntity = profileEntity.policies[profileEntity.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return false;

      return true;
    } 

    return false;   
  }

  function _accessPermission(bytes32 profileId, bytes4 selector) internal returns (ProfileEntity storage, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != ActivityStatus.ENABLED) {
      LACLUtils.generateProfileAuthorizationError(ProfileAuthorizationStatus.PROFILE_ACTIVITY_FORBIDDEN);
    }
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    ProfileAuthorizationStatus status = IProfileACL(address(this)).profileHasMemberAccess(profileEntity, functionId, senderId);
    if(status != ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);
    return (profileEntity, functionId);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 memberId, bytes32 senderId, bytes32 functionId) internal view returns (ProfileMemberEntity storage) {
    ProfileMemberEntity storage memberEntity = profileEntity.profileMemberReadSlot(memberId);
    require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    require(_checkAdminAccessBySender(profileEntity, memberEntity.ba.adminId, senderId, functionId), "Forbidden");
    return memberEntity;
  }

}