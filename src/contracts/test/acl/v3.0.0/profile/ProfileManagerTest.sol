// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)
pragma solidity 0.8.19;

import "./IProfileACLTest.sol";
import "./IProfileACLGeneralsTest.sol";
import "./IProfileManagementTest.sol";
import "./scope/IProfileFunctionManagementTest.sol";
import "./agent/IProfileRoleManagementTest.sol";
import "./agent/IProfileTypeManagementTest.sol";
import "../ACLStorageTest.sol";
import "../lib/LACLUtilsTest.sol";
import "../lib/LProfileStorageTest.sol";
import "../lib/LACLCommonsTest.sol";
import "../lib/LACLStorageTest.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../lib/cryptography/LECDSA.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Profile AccessControlTest Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ProfileManagerTest is ACLStorageTest, BaseUUPSProxy, IProfileManagementTest {
  using LProfileStorageTest for ProfileEntity;
  using LACLStorageTest for DataCollection;
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
    return interfaceId == type(IProfileManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  function profileRegister(MemberSignature calldata memberSign, ProfileRegisterRequest[] calldata requests)
    external
    returns (bool)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IProfileManagementTest.profileRegister.selector
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
      IProfileManagementTest.profileUpdateLimits.selector
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
      IProfileManagementTest.profileUpdateOwnerAccount.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(
        requests[i].profileId,
        senderId,
        functionId
      );
      address profileOwner = profileEntity.owner;
      LACLCommonsTest.profileUpdateOwnerAccount(_data, profileEntity, requests[i]);
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
      IProfileManagementTest.profileUpdateActivityStatus.selector
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
      IProfileManagementTest.profileUpdateAlterabilityStatus.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _data.profiles[requests[i].id];
      IACLTest.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
      if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
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
      IProfileManagementTest.profileUpdateAdmin.selector
    );
    for (uint256 i = 0; i < requests.length; i++) {
      ProfileEntity storage profileEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested domain admin
      if (requests[i].adminId != bytes32(0)) {
        require(_data.agents[requests[i].adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
        bytes32 requestAdminScopeId = _doAgentGetScopeInfo(requests[i].adminId);
        require(requestAdminScopeId == _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, "Illegal Admin Scope");
        profileEntity.adminId = requests[i].adminId;
      } else {
        profileEntity.adminId = _LIVELY_VERSE_PROFILE_MASTER_TYPE_ID;
      }

      emit ProfileAdminUpdated(sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function profileCheckId(bytes32 profileId) external view returns (bool) {
    return _data.profiles[profileId].acstat != ActivityStatus.NONE;
  }

  function profileCheckName(string calldata name) external view returns (bool) {
    return _data.profiles[LACLUtilsTest.generateId(name)].acstat != ActivityStatus.NONE;
  }

  function profileCheckOwner(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].owner == account;
  }

  function profileCheckProfileAdmin(bytes32 profileId, address account) external view returns (bool) {
    return _data.profiles[profileId].admins.contains(LACLUtilsTest.accountGenerateId(account));
  }

  function profileCheckProfileSystemAdmin(bytes32 profileId, address account) external view returns (bool) {
    ProfileEntity storage profileEntity = _data.profiles[profileId];
    if (profileEntity.acstat == ActivityStatus.NONE) return false;
    (ProfileMemberEntity storage profileMemberEntity, bool result) = profileEntity.profileMemberTryReadSlot(
      LACLUtilsTest.accountGenerateId(account)
    );
    if (!result) return false;
    return profileMemberEntity.types.contains(_LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID);
  }

  function profileCheckAdmin(bytes32 profileId, address account) external view returns (bool) {
    return LACLCommonsTest.profileCheckAdmin(_data, profileId, account);
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
  ) internal view returns (IACLTest.AdminAccessStatus) {
    return LACLCommonsTest.checkAdminAccess(_data, adminId, memberId, functionId);
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
      signer = LACLUtilsTest.getMemeberSignerAddress(memberSign, MEMBER_SIGNATURE_MESSAGE_TYPEHASH);
    } else {
      signer = msg.sender;
    }

    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtilsTest.functionGenerateId(functionFacetId, selector);
    bytes32 senderId = LACLUtilsTest.accountGenerateId(signer);
    IACLTest.AuthorizationStatus status = IACLTest(address(this)).hasMemberAccess(functionId, senderId);
    if (status != IACLTest.AuthorizationStatus.PERMITTED) LACLUtilsTest.generateAuthorizationError(status);
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
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(profileEntity.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    return profileEntity;
  }

  function _doProfileRegister(
    ProfileRegisterRequest calldata request,
    address sender,
    bytes32 senderId,
    bytes32 functionId
  ) internal {
    bytes32 profileId = LACLUtilsTest.generateId(request.name);
    require(_data.profiles[profileId].acstat == ActivityStatus.NONE, "Already Exist");
    bytes32 adminId = LACLCommonsTest.profileRegister(_data, request, senderId, profileId, functionId);

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

  function getLibrary() external pure returns (address) {
    return address(LACLCommonsTest);
  }
}
