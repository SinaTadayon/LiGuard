// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IProfileContextManagement.sol";
import "../IProfileACL.sol";
import "../IProfileACLGenerals.sol";
import "../../ACLStorage.sol";
import "../../../lib/acl/LProfileStorage.sol";
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
  function profileContextRegister(ProfileContextRegisterRequest[] calldata requests) external returns (bool) {
    
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");   
    for (uint256 i = 0; i < requests.length; i++) {
      address signer;
      address contractId;      
      if(requests[i].contractId == address(0)) {
        if(requests[i].signature.length > 0) {
          signer = _doGetSignerAddress(
            requests[i].signature, 
            _getPredictContextMessageHash(requests[i].profileId, requests[i].deployer, requests[i].subject, requests[i].realmId)
          );
        } else {
          signer = msg.sender;
        }

        contractId = requests[i].subject.predictDeterministicAddress(requests[i].salt, requests[i].deployer);
        
      } else {
        if(requests[i].signature.length > 0) {
          bytes32 structHash = _getContextMessageHash(
            requests[i].profileId,
            requests[i].contractId, 
            LACLUtils.generateHash(requests[i].name), 
            LACLUtils.generateHash(requests[i].version),
            requests[i].realmId
          );
          signer = _doGetSignerAddress(requests[i].signature, structHash);
        } else {
          signer = msg.sender;
        }    
        contractId = requests[i].contractId;
      }      

      bytes32 newContextId = LProfileCommons.profileRegisterContext(_data, requests[i], contractId, signer);
      emit ProfileContextRegistered(      
        msg.sender,
        requests[i].profileId,
        newContextId, 
        requests[i].realmId,
        requests[i].adminId,
        contractId,
        signer,
        requests[i].deployer,
        requests[i].subject      
      );    
    }

    return true;
  }  

  function profileContextUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateActivityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        require(requests[i].data[j].acstat > ActivityStatus.DELETED, "Illegal Activity");    
        contextEntity.bs.acstat = requests[i].data[j].acstat;
        emit ProfileContextActivityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].acstat);
      }
    }
    return true;
  }

  function profileContextUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateAlterabilityStatus.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(requests[i].data[j].entityId);
        IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, contextEntity.bs.adminId, senderId, functionId);
        if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
        require(requests[i].data[j].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
        contextEntity.bs.alstat = requests[i].data[j].alstat;
        emit ProfileContextAlterabilityUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].alstat);
      }
    }
    return true;
  }

  function profileContextUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateAdmin.selector);
      for(uint j = 0; j < requests[i].data.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].data[j].entityId, senderId, functionId);
        
        // checking requested type admin 
        if(requests[i].data[j].adminId != bytes32(0)) {
          require( profileEntity.agents[requests[i].data[j].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");        
          (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = _doAgentGetScopeInfo(profileEntity, requests[i].data[j].adminId);
          require(ScopeType.CONTEXT <= requestAdminScopeType, "Illegal Admin ScopeType");
          if(ScopeType.CONTEXT == requestAdminScopeType) {
            require(requestAdminScopeId == requests[i].data[j].entityId, "Illegal Amind Scope");
          } else {
            require(IProfileACLGenerals(address(this)).profileIsScopesCompatible(requests[i].profileId, requestAdminScopeId, requests[i].data[j].entityId), "Illegal Admin Scope");
          }
          contextEntity.bs.adminId = requests[i].data[j].adminId;

        } else {
          contextEntity.bs.adminId = profileEntity.scopes[contextEntity.realmId].adminId;
        }

        emit ProfileContextAdminUpdated(msg.sender, requests[i].profileId, requests[i].data[j].entityId, requests[i].data[j].adminId);
      }
    }
    return true;
  }

  function profileContextUpdateFunctionLimit(ProfileContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool) {
    for (uint i = 0; i < requests.length; i++) {
      (ProfileEntity storage profileEntity, bytes32 functionId, bytes32 senderId) = _accessPermission(requests[i].profileId, IProfileContextManagement.profileContextUpdateFunctionLimit.selector);     
      for(uint j = 0; j < requests[i].limits.length; j++) {
        ContextEntity storage contextEntity = _doGetEntityAndCheckAdminAccess(profileEntity, requests[i].limits[j].contextId, senderId, functionId);
        require(requests[i].limits[j].functionLimit > contextEntity.functions.length(), "Illegal Limit");
        contextEntity.functionLimit = requests[i].limits[j].functionLimit;      
        emit ProfileContextFunctionLimitUpdated(msg.sender, requests[i].profileId, requests[i].limits[j].contextId, requests[i].limits[j].functionLimit);
      }
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
      return _doRoleHasMember(profileEntity, contextAdminId, memberId);
    
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
        name: "",
        version: "",
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
      name: IProxy(ce.contractId).contractName(),
      version: IProxy(ce.contractId).contractVersion(),
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

  function _doRoleHasMember(ProfileEntity storage profileEntity, bytes32 roleId, bytes32 memberId) internal view returns (bool) {
    (RoleEntity storage roleEntity, bool result) = profileEntity.profileRoleTryReadSlot(roleId);
    if(!result) return false;

    (TypeEntity storage typeEntity, bool result1) = profileEntity.profileTypeTryReadSlot(roleEntity.typeId);
    if(!result1) return false;  

    return typeEntity.members[memberId] != bytes32(0);
  }

  function _doCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 adminId, bytes32 senderId, bytes32 functionId) internal view returns (IProfileACL.ProfileAdminAccessStatus) {
    return LProfileCommons.profileCheckAdminAccess(profileEntity, adminId, senderId, functionId);
  }

  function _doAgentGetScopeInfo(ProfileEntity storage profileEntity, bytes32 agentId) internal view returns (ScopeType, bytes32) {
    return LProfileCommons.profileAgentGetScopeInfo(profileEntity, agentId);
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

  function _doGetEntityAndCheckAdminAccess(ProfileEntity storage profileEntity, bytes32 contextId, bytes32 senderId, bytes32 functionId) internal view returns (ContextEntity storage) {
    ContextEntity storage contextEntity = profileEntity.profileContextReadSlot(contextId);
    require(contextEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IProfileACL.ProfileAdminAccessStatus status = _doCheckAdminAccess(profileEntity, contextEntity.bs.adminId, senderId, functionId);
    if(status != IProfileACL.ProfileAdminAccessStatus.PERMITTED) LACLUtils.generateProfileAdminAccessError(status);
    return contextEntity;
  }

  function _getContextAdmin(ProfileEntity storage profileEntity, ProfileContextRegisterRequest calldata request, bytes32 scopeId, bytes32 requestScopeAdmin) internal view returns (bytes32 contextAdminId) {
    return LProfileCommons.profileGetContextAdmin(profileEntity, request, scopeId, requestScopeAdmin);
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

  function getLibrary() external pure returns (address) {
    return address(LProfileCommons);
  }
}