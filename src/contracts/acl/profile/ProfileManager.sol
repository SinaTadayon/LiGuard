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
import "../../lib/acl/LACLCommons.sol";
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
    bytes32 functionId = LACLUtils.functionGenerateId(_data.selectors[IProfileManagement.profileRegister.selector], IProfileManagement.profileRegister.selector);
    for (uint i = 0; i < requests.length; i++) {
      address signer;
      if(requests[i].signature.length > 0) {
        bytes32 structHash = _getContextMessageHash(
          LACLUtils.generateHash(requests[i].name),
          requests[i].profileOwner,
          requests[i].expiredAt
        );

        signer = _doGetSignerAddress(requests[i].signature, structHash);
      } else {
        signer = msg.sender;
      }

      _doProfileRegister(requests[i], signer, functionId, uint16(requests.length));    
    }
    return true;
  }

  function profileUpdateLimits(ProfileUpdateLimitsRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateLimits.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      profileEntity.limits = requests[i].limits;
      profileEntity.registerLimits = requests[i].registerLimits;
      emit ProfileLimitsUpdated(msg.sender, requests[i].profileId, requests[i].limits, requests[i].registerLimits);
    }
    return true;
  }

  function profileUpdateExpiration(ProfileUpdateExpirationRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateExpiration.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      require(requests[i].expiredAt > block.timestamp + 1 days, "Illegal Expiration");
      profileEntity.expiredAt = requests[i].expiredAt;
      emit ProfileExpirationUpdated(msg.sender, requests[i].profileId, requests[i].expiredAt);
    }
    return true;
  }

  function profileUpdateOwnerAccount(ProfileUpdateOwnerAccountRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateOwnerAccount.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].profileId, senderId, functionId);
      LACLCommons.profileUpdateOwnerAccount(_data, profileEntity, requests[i]);
      emit ProfileOwnerAccountUpdated(msg.sender, requests[i].profileId, requests[i].owner, requests[i].newOwner);
    }
    return true;
  }

  function profileUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateActivityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");  
      profileEntity.acstat = requests[i].acstat;
      emit ProfileActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function profileUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateAlterabilityStatus.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _data.profiles[requests[i].id];   
      IACL.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
      if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);  
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      profileEntity.alstat = requests[i].alstat;
      emit ProfileAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function profileUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IProfileManagement.profileUpdateAdmin.selector);
    for(uint i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      
      // checking requested domain admin 
      if(requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, "Illegal Admin Scope");
        profileEntity.adminId = requests[i].adminId;
      } else {
        profileEntity.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      }

      emit ProfileAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
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

  function profileCheckProfileAdmin(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].admins.contains(LACLUtils.accountGenerateId(account));
  }

  function profileCheckProfileSystemAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity =  _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ProfileMemberEntity storage profileMemberEntity, bool result) = profileEntity.profileMemberTryReadSlot(LACLUtils.accountGenerateId(account));
    if(!result) return false;
    return profileMemberEntity.types.contains(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
  }

  function profileCheckAdmin(bytes32 profileId, address account) external view returns (bool) {
    return LACLCommons.profileCheckAdmin(_data, profileId, account);
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
        adminType: AgentType.NONE,
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
      adminType: _data.agents[profileEntity.adminId].atype,
      acstat: profileEntity.acstat,
      alstat: profileEntity.alstat
    });
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId);
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
    uint256 expiredAt
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
    return LECDSA.toTypedDataHash(IProxy(address(this)).domainSeparator(), structHash);
  }

  function _createUpdateProfileAccount(bytes32 profileId, address memberAddress) internal {
    LACLCommons.createUpdateProfileAccount(_data, profileId, memberAddress);
  }

  function _doProfileRegister(ProfileRegisterRequest calldata request, address signer, bytes32 functionId, uint16 requestLength) internal {
    bytes32 signerId = LACLUtils.accountGenerateId(signer);
    
    {
      IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, signerId);
      if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status); 

      // update member profile register limit
      MemberEntity storage memberEntity = _data.memberReadSlot(signerId);
      require(int32(uint32(memberEntity.limits.profileRegisterLimit)) - int16(requestLength) >= 0, "Illegal RegisterLimit");
      memberEntity.limits.profileRegisterLimit -= requestLength;
    }

    bytes32 profileId = LACLUtils.generateId(request.name);
    require(_data.profiles[profileId].acstat == ActivityStatus.NONE, "Already Exist");
    bytes32 adminId = LACLCommons.profileRegister(_data, request, signerId, profileId, functionId);      
    if(request.signature.length == 0) {
      signer = address(0);
    }
    emit ProfileRegistered (
      msg.sender,
      profileId,
      request.profileOwner,
      signer,
      request.profileAdmin,
      request.profileSystemAdmin,
      adminId,     
      request.registerLimits
    );
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }

}