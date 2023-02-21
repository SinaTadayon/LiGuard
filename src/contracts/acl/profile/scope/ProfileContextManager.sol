// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileContextManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../ProfileAccessControl.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
import "../../../lib/acl/LACLStorage.sol";
import "../../../lib/proxy/LClones.sol";
import "../../../lib/cryptography/LECDSA.sol";
import "../../../lib/acl/LACLUtils.sol";
import "../../../lib/acl/LProfileCommons.sol";
import "../../../lib/struct/LEnumerableSet.sol";
import "../../../proxy/IProxy.sol";
import "../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile Context Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileContextManager is ACLStorage, BaseUUPSProxy, IProfileContextManagement {
  using LACLStorage for DataCollection;
  using LProfileStorage for ProfileEntity;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LClones for address;  

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
      interfaceId == type(IProfileContextManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // called by system admin
  function profileContextRegister(ProfileMemberSignature calldata memberSign, ProfileContextRegisterRequest[] calldata requests) external returns (bool) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");
    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);

    address signer;
    if(memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    for (uint256 i = 0; i < requests.length; i++) {
      address contractId;      
      if(requests[i].contractId == address(0)) {
        if(memberSign.signature.length == 0) {
          if(requests[i].signature.length > 0) {
            signer = _doGetSignerAddress(
              requests[i].signature, 
              _getPredictContextMessageHash(profileId, requests[i].deployer, requests[i].subject, requests[i].realmId)
            );
          } else {
            signer = msg.sender;
          }
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
        
      } else {
        if(memberSign.signature.length == 0) {
          if(requests[i].signature.length > 0) {
            bytes32 structHash = _getContextMessageHash(
              profileId,
              requests[i].contractId, 
              LACLUtils.generateHash(requests[i].name), 
              LACLUtils.generateHash(requests[i].version),
              requests[i].realmId
            );
            signer = _doGetSignerAddress(requests[i].signature, structHash);
          } else {
            signer = msg.sender;
          }
        }
        contractId = requests[i].contractId;
      }      
      
      bytes32 newContextId = LProfileCommons.profileRegisterContext(_data, requests[i], profileId, contractId, signer);

      emit ProfileContextRegistered(      
        signer,        
        profileId,
        newContextId, 
        requests[i].realmId,
        requests[i].adminId,
        contractId,
        requests[i].deployer,
        requests[i].subject      
      );    
    }

    return true;
  }  

  function profileContextUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileContextManagement.profileContextUpdateActivityStatus.selector);
    for (uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");    
      contextEntity.bs.acstat = requests[i].acstat;
      emit ProfileContextActivityUpdated(sender, profileId, requests[i].entityId, requests[i].acstat);
    }
    return true;
  }

  function profileContextUpdateAlterabilityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileContextManagement.profileContextUpdateAlterabilityStatus.selector);
    for (uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(requests[i].entityId);
      IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, contextEntity.bs.adminId, senderId);
      if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      contextEntity.bs.alstat = requests[i].alstat;
      emit ProfileContextAlterabilityUpdated(sender, profileId, requests[i].entityId, requests[i].alstat);
    }
    return true;
  }

  function profileContextUpdateAdmin(ProfileMemberSignature calldata memberSign, ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileContextManagement.profileContextUpdateAdmin.selector);
    for (uint i = 0; i < requests.length; i++) {
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].entityId, senderId);
      
      // checking requested type admin 
      if(requests[i].adminId != bytes32(0)) {
        require( profileEntity.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");        
        (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, requests[i].adminId);
        require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
        if(ScopeType.CONTEXT == requestAdminScopeType) {
          require(requestAdminScopeId == requests[i].entityId, "Illegal Admin Scope");
        } else {
          require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(profileId, requestAdminScopeId, requests[i].entityId), "Illegal Admin Scope");
        }
        contextEntity.bs.adminId = requests[i].adminId;

      } else {
        contextEntity.bs.adminId = profileEntity.scopes[contextEntity.realmId].adminId;
      }

      emit ProfileContextAdminUpdated(sender, profileId, requests[i].entityId, requests[i].adminId);
    
    }
    return true;
  }

  function profileContextUpdateFunctionLimit(ProfileMemberSignature calldata memberSign, ProfileContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool) {
    (ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 profileId, bytes32 senderId, address sender) = _accessPermission(memberSign, IProfileContextManagement.profileContextUpdateFunctionLimit.selector);
    for (uint i = 0; i < requests.length; i++) {    
      ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, functionEntity, requests[i].contextId, senderId);
      require(requests[i].functionLimit > contextEntity.functions.length(), "Illegal Limit");
      contextEntity.functionLimit = requests[i].functionLimit;      
      emit ProfileContextFunctionLimitUpdated(sender, profileId, requests[i].contextId, requests[i].functionLimit);
    }
    return true;    
  }


  function profileContextCheckId(bytes32 profileId, bytes32 contextId) external view returns (bool) {
    return _data.profiles[profileId].scopes[contextId].stype == ScopeType.CONTEXT;
  }

  function profileContextCheckAccount(bytes32 profileId, address contractId) external view returns (bool) {
    return _data.profiles[profileId].scopes[LACLUtils.accountGenerateId(contractId)].stype == ScopeType.CONTEXT;
  }

  function profileContextCheckAdmin(bytes32 profileId, bytes32 contextId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result) return false;  

    bytes32 contextAdminId = ce.bs.adminId;
    AgentType agentType = profileEntity.agents[contextAdminId].atype;
    bytes32 memberId = LACLUtils.accountGenerateId(account);

    if(agentType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result0) = profileEntity.profileRoleTryReadSlot(contextAdminId);
      if(!result0) return false;

      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[memberId] == contextAdminId;
    
    } else if(agentType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(contextAdminId);
      if(!result1) return false;  

      return typeEntity.members[memberId] != bytes32(0);  
    }
  
    return false;
  } 

  function profileContextHasFunction(bytes32 profileId, bytes32 contextId, bytes32 functionId) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    return _doContextHasFunction(profileEntity, contextId, functionId);
  }

  function profileContextHasSelector(bytes32 profileId, address contractId, bytes4 selector) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return false;
    bytes32 contextId = LACLUtils.accountGenerateId(contractId);
    bytes32 functionId = LACLUtils.functionGenerateId(contractId, selector);
    return _doContextHasFunction(profileEntity, contextId, functionId);
  }

  function profileContextGetFunctions(bytes32 profileId, bytes32 contextId) external view returns (bytes32[] memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if(profileEntity.acstat == ActivityStatus.NONE) return new bytes32[](0);
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if (!result) return new bytes32[](0);
    return ce.functions.values();
  }

  function profileContextGetInfo(bytes32 profileId, bytes32 contextId) external view returns (ProfileContextInfo memory) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result || profileEntity.acstat == ActivityStatus.NONE) {
      return ProfileContextInfo ({
        realmId: bytes32(0),
        adminId: bytes32(0),
        contractId: address(0),
        functionCount: 0,
        functionLimit: 0,
        referredByAgent: 0,
        adminType: AgentType.NONE,
        stype: ScopeType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return ProfileContextInfo ({
      realmId: ce.realmId,
      adminId: ce.bs.adminId,
      contractId: ce.contractId,
      functionCount: uint8(ce.functions.length()),
      functionLimit: ce.functionLimit,
      referredByAgent: ce.bs.referredByAgent,
      adminType: profileEntity.agents[ce.bs.adminId].atype,
      stype: ce.bs.stype,
      acstat: ce.bs.acstat,
      alstat: ce.bs.alstat
    });
  }


  function _doContextHasFunction(ProfileEntity storage profileEntity, bytes32 contextId, bytes32 functionId) internal view returns (bool) {
    (ContextEntity storage ce, bool result) = profileEntity.profileContextTryReadSlot(contextId);
    if(!result) return false;
    return ce.functions.contains(functionId);    
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 adminId, bytes32 senderId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, functionEntity, adminId, senderId);
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
    return LProfileCommons.profileAgentGetScopeInfo(profileEntity, agentId);
  }

  function _accessPermission(ProfileMemberSignature calldata memberSign, bytes4 selector) internal returns (ProfileEntity storage, FunctionEntity storage, bytes32, bytes32, address) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    require(bytes(memberSign.profileName).length > 0, "Illegal ProfileName");

    address signer;

    if(memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getProfileMemeberSignerAddress(memberSign, PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    bytes32 profileId = LACLUtils.generateId(memberSign.profileName);
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(signer);

    ProfileAccessControl(payable(address(this))).profileAclHasMemberAccess(profileId, functionId, senderId);    
    
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    FunctionEntity storage functionEntity = _data.functionReadSlot(functionId);      
    return (profileEntity, functionEntity, profileId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, FunctionEntity storage functionEntity, bytes32 contextId, bytes32 senderId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, functionEntity, contextEntity.bs.adminId, senderId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return contextEntity;
  }

  function _doGetSignerAddress(bytes memory signature, bytes32 structHash) internal view returns (address) {
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal Signature");
    return msgSigner;
  }

  function _getContextMessageHash(
    bytes32 profileId,
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_CTX_MESSAGE_TYPEHASH, profileId, contractId, name, version, realmId));
  }

  function _getPredictContextMessageHash(
    bytes32 profileId,
    address deployer,
    address subject,
    bytes32 realmId
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PROFILE_PREDICT_CTX_MESSAGE_TYPEHASH, profileId, deployer, subject, realmId));
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(IProxy(address(this)).domainSeparator(), structHash);
  }

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }
}