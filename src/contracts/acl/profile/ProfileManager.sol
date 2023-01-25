// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileACL.sol";
import "./IProfileACLGenerals.sol";
import "./IProfileManagement.sol";
import "./scope/IProfileFunctionManagement.sol";
import "./agent/IProfileRoleManagement.sol";
import "./agent/IProfileTypeManagement.sol";
import "../ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../lib/acl/LProfileStorage.sol";
import "../../lib/acl/LProfileManager.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/cryptography/LECDSA.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";

/**
 * @title Profile AccessControl Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileManager is ACLStorage, BaseUUPSProxy, IProfileManagement {
  using LProfileStorage for ProfileEntity;
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
    return
      interfaceId == type(IProfileManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }
  
  function profileRegister(ProfileRegisterRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      bytes32 signerId;
      address signer;
      if(requests[i].signature.length > 0) {
        bytes32 structHash = _getContextMessageHash(           
          LACLUtils.generateHash(requests[i].name), 
          requests[i].owner,
          requests[i].expiredAt
        );
        signer = _doGetSignerAddress(requests[i].signature, structHash);
      } else {
        signer = msg.sender;
      }

      signerId = LACLUtils.accountGenerateId(signer);
      bytes32 functionId = LACLUtils.functionGenerateId(_data.selectors[IProfileManagement.profileRegister.selector], IProfileManagement.profileRegister.selector);
      IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, signerId);
      if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status); 
      bytes32 profileId = LACLUtils.generateId(requests[i].name);
      require(_data.profiles[profileId].acstat == ActivityStatus.NONE, "Already Exist");

      _doProfileRegister(requests[i], signerId, profileId, signer);
    }
  }

  function profileUpdateLimits(ProfileUpdateLimitsRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profileUpdateLimits.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      profileEntity.limits = requests[i].limits;
      profileEntity.registerLimits = requests[i].registerLimits;
      emit ProfileLimitsUpdated(msg.sender, requests[i].profileId, requests[i].limits, requests[i].registerLimits);
    }
  }

  function profileUpdateExpiration(ProfileUpdateExpirationRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profileUpdateExpiration.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      require(requests[i].expiredAt > block.timestamp + 1 days, "Illegal Expiration");
      profileEntity.expiredAt = requests[i].expiredAt;
      emit ProfileExpirationUpdated(msg.sender, requests[i].profileId, requests[i].expiredAt);
    }
  }

  function profielUpdateOwnerAccount(ProfileUpdateOwnerAccountRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profielUpdateOwnerAccount.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);  
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      // disable profile owner 
      require(profileEntity.owner == requests[i].owner, "Illegal Owner");
      bytes32 ownerId = LACLUtils.accountGenerateId(requests[i].owner);  
      bytes32 newOwnerId = LACLUtils.accountGenerateId(requests[i].newOwner);
      require(profileEntity.agents[newOwnerId].acstat == ActivityStatus.NONE, "Already Exists");
      ProfileMemberEntity storage profileMemberEntity = profileEntity.profileMemberReadSlot(ownerId);
      profileMemberEntity.ba.acstat = ActivityStatus.DISABLED;
      profileMemberEntity.ba.alstat = AlterabilityStatus.DISABLED;
      profileEntity.admins.remove(ownerId);
      ProfileAccount storage profileAccount = _data.profileAccounts[requests[i].owner];
      for(uint j = 0; j < profileAccount.profiles.length; j++) {
        if(profileAccount.profiles[j] == requests[i].profileId) {
           if(profileAccount.profiles.length > 1) {
            if(j < profileAccount.profiles.length - 1)
              profileAccount.profiles[j] = profileAccount.profiles[profileAccount.profiles.length - 1];
            profileAccount.profiles.pop();
          } else {
            profileAccount.profiles.pop();
            delete profileAccount.profiles;
          }          
          break;
        }
      }
      
      {
        // add profile's new owner    
        _createUpdateProfileAccount(requests[i].profileId, requests[i].newOwner);
        bytes32 newOwnerMemberId = LACLUtils.accountGenerateId(requests[i].newOwner); 
        
        // Create Owner Member      
        IACLCommons.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(newOwnerMemberId);   
        ownerMember.account = requests[i].newOwner;
        ownerMember.typeLimit = profileEntity.limits.typeLimit;
        ownerMember.callLimit = profileEntity.limits.profileCallLimit;
        ownerMember.registerLimits = profileEntity.registerLimits;          
        ownerMember.ba.adminId = keccak256(abi.encodePacked("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));      
        ownerMember.ba.atype = IACLCommons.AgentType.MEMBER;
        ownerMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
        ownerMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;

        profileEntity.owner = requests[i].newOwner;
        profileEntity.admins.add(newOwnerId);
      }
      emit ProfileOwnerAccountUpdated(msg.sender, requests[i].profileId, requests[i].owner, requests[i].newOwner);
    }
  }

  function profileUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profileUpdateActivityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");  
      profileEntity.acstat = requests[i].acstat;
      emit ProfileActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function profileUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profileUpdateAlterabilityStatus.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      profileEntity.alstat = requests[i].alstat;
      emit ProfileAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function profileUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    bytes32 functionId = _accessPermission(IProfileManagement.profileUpdateAdmin.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      
      // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Amind Scope");
        profileEntity.adminId = requests[i].adminId;
      } else {
        profileEntity.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      }

      emit ProfileAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
  }

  function profileCheckId(bytes32 profileId) external view returns (bool) {
    return _data.profiles[profileId].acstat != ActivityStatus.NONE;
  }

  function profileCheckName(string calldata name) external view returns (bool) {
    return _data.profiles[LACLUtils.generateId(name)].acstat != ActivityStatus.NONE;
  }

  function profileCheckOwner(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].owner == account;
  }

  function profileCheckLivelyAdmin(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].admins.contains(LACLUtils.accountGenerateId(account));
  }

  function profileCheckLivelySystemAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity =  _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ProfileMemberEntity storage profileMemberEntity, bool result) = profileEntity.profileMemberTryReadSlot(LACLUtils.accountGenerateId(account));
    if(!result) return false;
    return profileMemberEntity.types.contains(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
  }

  function profileCheckAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity =  _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;

    bytes32 profileAdminId = profileEntity.adminId;
    AgentType agentType = _data.agents[profileAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
       (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(profileAdminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(profileAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  }

  function profileGetProfileAccount(address account) external view returns (bytes32[] memory) {
    return _data.profileAccounts[account].profiles;
  }

  function profileGetAdmins(bytes32 profileId) external view returns (bytes32[] memory) {
    return _data.profiles[profileId].admins.values();
  }

  function profileGetInfo(bytes32 profileId) external view returns (ProfileInfo memory) {
    ProfileEntity storage profileEntity =  _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileInfo ({
        name: "",
        expiredAt: 0,
        adminId: bytes32(0),
        owner: address(0),
        registerLimits: ProfileRegisterLimit({
          memberRegisterLimit: 0,
          roleRegisterLimit: 0,
          typeRegisterLimit: 0,
          functionRegisterLimit: 0,
          contextRegisterLimit: 0,
          realmRegisterLimit: 0,
          domainRegisterLimit: 0,
          policyRegisterLimit: 0
        }),
        limits: ProfileLimit({
          profileCallLimit: 0,
          contextLimit: 0,
          memberLimit: 0,
          functionLimit: 0,
          realmLimit: 0,
          domainLimit: 0,
          memberCallLimit: 0,
          typeRoleLimit: 0,
          typeLimit: 0,
          policyRoleLimit: 0
        }),
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return ProfileInfo ({
      name: profileEntity.name,
      expiredAt: profileEntity.expiredAt,
      adminId: profileEntity.adminId,
      owner: profileEntity.owner,
      registerLimits: profileEntity.registerLimits,
      limits: profileEntity.limits,
      acstat: profileEntity.acstat,
      alstat: profileEntity.alstat
    });
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;
    
    AgentType adminAgentType = _data.agents[adminId].atype;
    if(adminAgentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(adminId);
      if(!result) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;
      
      if (typeEntity.members[memberId] != adminId) return IACL.AdminAccessStatus.NOT_PERMITTED;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[adminId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
   
    } else if(adminAgentType == AgentType.TYPE) { 
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(adminId);
      if(!result1) return IACL.AdminAccessStatus.TYPE_NOT_FOUND;
      if(typeEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.TYPE_ACTIVITY_FORBIDDEN;

      bytes32 roleId = typeEntity.members[memberId];
      (RoleEntity storage roleEntity, bool result2) = _data.roleTryReadSlot(roleId);
      if(!result2) return IACL.AdminAccessStatus.ROLE_NOT_FOUND;
      if(roleEntity.ba.acstat != ActivityStatus.ENABLED) return IACL.AdminAccessStatus.ROLE_ACTIVITY_FORBIDDEN;
      
      PolicyEntity storage policyEntity = _data.policies[_data.rolePolicyMap[roleId]];
      if(policyEntity.acstat == ActivityStatus.ENABLED && policyEntity.policyCode >= functionEntity.policyCode)  
        return IACL.AdminAccessStatus.POLICY_FORBIDDEN;

      return IACL.AdminAccessStatus.PERMITTED;
    } 

    return IACL.AdminAccessStatus.NOT_PERMITTED;   
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return functionId;
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      return  roleEntity.scopeId;

    } else if(atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);  
  }

  function _doGetScopeFromType(bytes32 typeId, bytes32 senderId) internal view returns (ScopeType, bytes32) {    
    TypeEntity storage agentType = _data.typeReadSlot(typeId);
    bytes32 memberRoleId = agentType.members[senderId];
    RoleEntity storage memberAgentRole = _data.roleReadSlot(memberRoleId);
    return (_data.scopes[memberAgentRole.scopeId].stype, memberAgentRole.scopeId);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 profileId, bytes32 senderId, bytes32 functionId) internal view returns (ProfileEntity storage) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");    
    IACL.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);  
    return profileEntity;
  }  

  function _getContextMessageHash(
    bytes32 name,
    address owner,
    uint64 expiredAt
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_REGISTER_MESSAGE_TYPEHASH, name, owner, expiredAt));
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(_contractDomainSeparatorV4(), structHash);
  }

  function _contractDomainSeparatorV4() internal view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          TYPE_HASH,          
          IProxy(address(this)).contractName(),
          IProxy(address(this)).contractVersion(),
          block.chainid,
          address(this)
        )
      );
  }

  function _createUpdateProfileAccount(bytes32 profileId, address memberAddress) internal {
    ProfileAccount storage profileAccount = _data.profileAccounts[memberAddress];
    if(profileAccount.profiles.length == 0) {
      ProfileAccount storage newProfileAccount = _data.profileAccounts[memberAddress];
      newProfileAccount.profiles.push(profileId);  
    } else {   
      require(profileAccount.profiles.length < 7, "Illegal ProfileAccountLimit");
      profileAccount.profiles.push(profileId);
    }
  }

  function _doProfileRegister(ProfileRegisterRequest calldata request, bytes32 signerId, bytes32 profileId, address signer) internal {
    // fetch scope type and scope id of sender
    (ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeFromType(_LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, signerId);
    require(signerScopeType == ScopeType.GLOBAL && signerScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Scope");
    require(request.expiredAt > block.timestamp + 1 days, "Illegal Expiration");
  
    _createUpdateProfileAccount(profileId, request.owner);
    _createUpdateProfileAccount(profileId, request.admin);
    _createUpdateProfileAccount(profileId, request.systemAdmin);

    ProfileEntity storage profileEntity = _data.profiles[profileId];
    profileEntity.name = request.name;
    profileEntity.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
    profileEntity.owner = request.owner;
    profileEntity.expiredAt = request.expiredAt;
    profileEntity.acstat = ActivityStatus.ENABLED;
    profileEntity.alstat = AlterabilityStatus.UPDATABLE;
    profileEntity.registerLimits = request.registerLimits;
    profileEntity.limits = request.limits;
    profileEntity.admins.add(LACLUtils.accountGenerateId(request.owner));
    profileEntity.admins.add(LACLUtils.accountGenerateId(request.admin));

    LProfileManager.initProfile(profileEntity, request.owner, request.admin, request.systemAdmin);

    emit ProfileRegistered (
      msg.sender,
      profileId,
      request.owner,
      signer,
      request.admin,
      request.systemAdmin,        
      request.registerLimits,
      request.limits
    );      
  }
}