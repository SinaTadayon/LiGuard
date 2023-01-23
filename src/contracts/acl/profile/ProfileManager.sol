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

      // fetch scope type and scope id of sender
      (ScopeType signerScopeType, bytes32 signerScopeId) = _doGetScopeFromType(_LIVELY_VERSE_PROFILE_MASTER_TYPE_ID, signerId);
      require(signerScopeType == ScopeType.GLOBAL && signerScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Scope");
      require(requests[i].expiredAt > block.timestamp + 1 days, "Illegal Expiration");

      _createUpdateProfileAccount(profileId, requests[i].owner);
      _createUpdateProfileAccount(profileId, requests[i].admin);
      _createUpdateProfileAccount(profileId, requests[i].systemAdmin);

      ProfileEntity storage profileEntity = _data.profiles[profileId];
      profileEntity.name = requests[i].name;
      profileEntity.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      profileEntity.owner = requests[i].owner;
      profileEntity.expiredAt = requests[i].expiredAt;
      profileEntity.acstat = ActivityStatus.ENABLED;
      profileEntity.alstat = AlterabilityStatus.UPDATABLE;
      profileEntity.registerLimits = requests[i].registerLimits;
      profileEntity.limits = requests[i].limits;
      profileEntity.admins.add(LACLUtils.accountGenerateId(requests[i].owner));
      profileEntity.admins.add(LACLUtils.accountGenerateId(requests[i].admin));

      LProfileManager.initProfile(profileEntity, requests[i].owner, requests[i].admin, requests[i].systemAdmin);

      emit ProfileRegistered (
        msg.sender,
        profileId,
        requests[i].owner,
        signer,
        requests[i].admin,
        requests[i].systemAdmin,        
        requests[i].registerLimits,
        requests[i].limits
      );      
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
      
      // add profile's new owner    
      _createUpdateProfileAccount(requests[i].profileId, requests[i].newOwner);
       
       // Create Owner Member      
      IACLCommons.ProfileMemberEntity storage ownerMember = profileEntity.profileMemberWriteSlot(newOwnerMemberId);   
      ownerMember.account = requests[i].newOwner;
      ownerMember.typeLimit = profileEntity.limits.typeLimit;
      ownerMember.callLimit = profileEntity.limits.profileCallLimit;
      ownerMember.registerLimits = profileEntity.registerLimits;          
      ownerMember.ba.adminId = _LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID;      
      ownerMember.ba.atype = IACLCommons.AgentType.MEMBER;
      ownerMember.ba.alstat = IACLCommons.AlterabilityStatus.UPDATABLE;
      ownerMember.ba.acstat = IACLCommons.ActivityStatus.ENABLED;

      profileEntity.owner = requests[i].newOwner;
      profileEntity.admins.add(newOwnerId);
      emit ProfileOwnerAccountUpdated(msg.sender, requests[i].profileId, requests[i].owner, requests[i].newOwner);
    }
  }

  function profileUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {

  }

  function profileUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {

  }

  function profileUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {

  }

  function profileCheckId(bytes32 profileId) external view returns (bool) {

  }

  function profileCheckName(string calldata name) external view returns (bool) {

  }

  function profileCheckOwner(bytes32 profileId, address account) external view returns (bool) {

  }

  function profileCheckAdmin(bytes32 profileId, address account) external view returns (bool) {

  }

  function profileGetAccountInfo(address account) external view returns (ProfileAccount[] memory) {

  }

  function profileGetAdmins(bytes32 profileId) external view returns (bytes32[] memory) {

  }

  function profileGetSystemAdmins(bytes32 profileId) external view returns (bytes32[] memory) {

  }

  function profileGetInfo(bytes32 profileId) external view returns (ProfileInfo memory) {

  }  

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    (FunctionEntity storage functionEntity, bool res) = _data.functionTryReadSlot(functionId);    
    if (!res) return IACL.AdminAccessStatus.FUNCTION_NOT_FOUND;

    // if(_data.agents[memberId].acstat != ActivityStatus.ENABLED) return false;
    
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
}