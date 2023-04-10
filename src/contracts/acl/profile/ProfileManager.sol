// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.1.0)
pragma solidity 0.8.19;

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

  // function initialize(
  //   string calldata contractName,
  //   string calldata contractVersion,
  //   address accessControlManager
  // ) public onlyProxy onlyLocalAdmin initializer {
  //   __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

  //   emit Initialized(
  //     _msgSender(),
  //     address(this),
  //     _implementation(),
  //     contractName,
  //     contractVersion,
  //     _getInitializedCount()
  //   );
  // }

  function reinitialize(string calldata contractVersion) public onlyProxy onlyLocalAdmin reinitializer(2) {
    _contractVersion = contractVersion;

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      _contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IProfileManagement).interfaceId || super.supportsInterface(interfaceId);
  }

  function profileRegister(MemberSignature calldata memberSign, ProfileRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileRegister.selector
    );

    // update member profile register limit
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(
      int32(uint32(memberEntity.limits.profileRegisterLimit)) - int16(uint16(requests.length)) >= 0,
      "Illegal RegisterLimit"
    );
    unchecked {
      memberEntity.limits.profileRegisterLimit -= uint16(requests.length);
    }

    for (uint256 i = 0; i < requests.length; i++) {
      _doProfileRegister(requests[i], sender, senderId, functionId);
    }
    return true;
  }

  function profileUpdateLimits(MemberSignature calldata memberSign, ProfileUpdateLimitsRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileUpdateLimits.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].profileId,
        senderId,
        functionId
      );
      profileEntity.limits = requests[i].limits;
      profileEntity.registerLimits = requests[i].registerLimits;
      emit ProfileLimitsUpdated(sender, requests[i].profileId, requests[i].limits, requests[i].registerLimits);
    }
    return true;
  }

  function profileUpdateOwnerAccount(
    MemberSignature calldata memberSign,
    ProfileUpdateOwnerAccountRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileUpdateOwnerAccount.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].profileId,
        senderId,
        functionId
      );
      address profileOwner = profileEntity.owner;
      LACLCommons.profileUpdateOwnerAccount(_data, profileEntity, requests[i]);
      emit ProfileOwnerAccountUpdated(sender, requests[i].profileId, profileOwner, requests[i].newOwner);
    }
    return true;
  }

  function profileUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileUpdateActivityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      profileEntity.acstat = requests[i].acstat;
      emit ProfileActivityUpdated(sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  function profileUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileUpdateAlterabilityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _data.profiles[requests[i].id];
      IACL.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
      if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      profileEntity.alstat = requests[i].alstat;
      emit ProfileAlterabilityUpdated(sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function profileUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagement.profileUpdateAdmin.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == LACLGenerals.LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        profileEntity.adminId = requests[i].adminId;
      } else {
        profileEntity.adminId = LACLGenerals.LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      }

      emit ProfileAdminUpdated(sender, requests[i].id, requests[i].adminId);
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (ProfileMemberEntity storage profileMemberEntity, bool result) = profileEntity.profileMemberTryReadSlot(
      LACLUtils.accountGenerateId(account)
    );
    if (!result) return false;
    return profileMemberEntity.types.contains(LACLGenerals.LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
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
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) {
      return
        ProfileInfo({
          name: "",
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

    return
      ProfileInfo({
        name: profileEntity.name,
        adminId: profileEntity.adminId,
        owner: profileEntity.owner,
        registerLimits: profileEntity.registerLimits,
        limits: profileEntity.limits,
        adminType: _data.agents[profileEntity.adminId].atype,
        acstat: profileEntity.acstat,
        alstat: profileEntity.alstat
      });
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function _accessPermission(MemberSignature calldata memberSign, bytes4 selector)
    internal
    returns (
      bytes32,
      bytes32,
      address
    )
  {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");
    address signer;

    if (memberSign.signature.length > 0) {
      require(memberSign.expiredAt > block.timestamp, "Expired Signature");
      signer = LACLUtils.getMemeberSignerAddress(memberSign, LACLGenerals.MEMBER_SIGNATURE_MESSAGE_TYPE_HASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtils.accountGenerateId(signer);
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId, signer);
  }

  function _doAgentGetScopeInfo(bytes32 agentId) internal view returns (bytes32) {
    AgentType atype = _data.agents[agentId].atype;
    if (atype == AgentType.ROLE) {
      RoleEntity storage roleEntity = _data.roleReadSlot(agentId);
      return roleEntity.scopeId;
    } else if (atype == AgentType.TYPE) {
      TypeEntity storage typeEntity = _data.typeReadSlot(agentId);
      return typeEntity.scopeId;
    }

    return bytes32(0);
  }

  function _doGetEntityAndCheckAdminAccess(
    bytes32 profileId,
    bytes32 senderId,
    bytes32 functionId
  ) internal view returns (ProfileEntity storage) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    require(profileEntity.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
    if (status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return profileEntity;
  }

  function _doProfileRegister(
    ProfileRegisterRequest calldata request,
    address sender,
    bytes32 senderId,
    bytes32 functionId
  ) internal {
    bytes32 profileId = LACLUtils.generateId(request.name);
    require(_data.profiles[profileId].acstat == ActivityStatus.NONE, "Already Exist");
    bytes32 adminId = LACLCommons.profileRegister(_data, request, senderId, profileId, functionId);

    emit ProfileRegistered(
      sender,
      profileId,
      request.profileOwner,
      request.profileSystemAdmin,
      adminId,
      request.registerLimits,
      request.limits
    );
  }

  function getLibraries() external pure returns (address, address) {
    return (address(LACLCommons), address(LACLGenerals));
  }
}
