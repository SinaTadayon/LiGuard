// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "./IUniverseManagementTest.sol";
import "../IACLTest.sol";
import "../IACLGeneralsTest.sol";
import "../ACLStorageTest.sol";
import "../lib/LACLStorageTest.sol";
import "../lib/LACLCommonsTest.sol";
import "../lib/LACLUtilsTest.sol";
import "../../../../lib/struct/LEnumerableSet.sol";
import "../../../../proxy/IProxy.sol";
import "../../../../proxy/BaseUUPSProxy.sol";

/**
 * @title Universe Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract UniverseManagerTest is ACLStorageTest, BaseUUPSProxy, IUniverseManagementTest {
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
    return interfaceId == type(IUniverseManagementTest).interfaceId || super.supportsInterface(interfaceId);
  }

  function universeUpdateActivityStatus(MemberSignature calldata memberSign, ActivityStatus acstat)
    external
    returns (ActivityStatus)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IUniverseManagementTest.universeUpdateActivityStatus.selector
    );
    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);
    require(acstat > ActivityStatus.DELETED, "Illegal Activity");
    universeEntity.bs.acstat = acstat;
    emit UniverseActivityUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.acstat);
    return acstat;
  }

  function universeUpdateAlterabilityStatus(MemberSignature calldata memberSign, AlterabilityStatus alstat)
    external
    returns (AlterabilityStatus)
  {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IUniverseManagementTest.universeUpdateAlterabilityStatus.selector
    );

    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(universeEntity.bs.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    require(alstat != AlterabilityStatus.NONE, "Illegal Alterability");
    universeEntity.bs.alstat = alstat;
    emit UniverseAlterabilityUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.alstat);
    return alstat;
  }

  function universeUpdateAdmin(MemberSignature calldata memberSign, bytes32 newAdminId) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IUniverseManagementTest.universeUpdateAdmin.selector
    );

    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);

    require(newAdminId != universeEntity.bs.adminId && newAdminId != bytes32(0), "Illegal AdminId");

    BaseAgent storage adminBaseAgent = _data.agents[newAdminId];
    require(adminBaseAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");
    if (adminBaseAgent.atype == AgentType.ROLE) {
      TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
      require(livelyAdminType.roles.contains(newAdminId), "Not Found");
    } else {
      require(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID == newAdminId, "Illegal Admin");
    }

    universeEntity.bs.adminId = newAdminId;
    emit UniverseAdminUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, universeEntity.bs.adminId);
    return true;
  }

  function universeUpdateDomainLimit(MemberSignature calldata memberSign, uint16 domainLimit) external returns (bool) {
    (bytes32 functionId, bytes32 senderId, address sender) = _accessPermission(
      memberSign,
      IUniverseManagementTest.universeUpdateDomainLimit.selector
    );

    UniverseEntity storage universeEntity = _doGetEntityAndCheckAdminAccess(senderId, functionId);
    require(domainLimit > universeEntity.domains.length(), "Illegal Limit");
    universeEntity.domainLimit = domainLimit;
    emit UniverseDomainLimitUpdated(sender, _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, domainLimit);
    return true;
  }

  function universeCheckAdmin(address account) external view returns (bool) {
    bytes32 memberId = LACLUtilsTest.accountGenerateId(account);
    TypeEntity storage livelyAdminType = _data.typeReadSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    return livelyAdminType.members[memberId] != bytes32(0);
  }

  function _doCheckAdminAccess(
    bytes32 adminId,
    bytes32 memberId,
    bytes32 functionId
  ) internal view returns (IACLTest.AdminAccessStatus) {
    return LACLCommonsTest.checkAdminAccess(_data, adminId, memberId, functionId);
  }

  function universeGetDomains() external view returns (bytes32[] memory) {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    return universeEntity.domains.values();
  }

  function universeGetInfo() external view returns (UniverseInfo memory) {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    return
      UniverseInfo({
        id: _LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
        adminId: universeEntity.bs.adminId,
        domainLimit: universeEntity.domainLimit,
        domainCount: uint16(universeEntity.domains.length()),
        referredByAgent: universeEntity.bs.referredByAgent,
        stype: universeEntity.bs.stype,
        adminType: _data.agents[universeEntity.bs.adminId].atype,
        acstat: universeEntity.bs.acstat,
        alstat: universeEntity.bs.alstat
      });
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
    if (status != IACLTest.AuthorizationStatus.PERMITTED) {
      if (
        status == IACLTest.AuthorizationStatus.UNIVERSE_ACTIVITY_FORBIDDEN &&
        IUniverseManagementTest.universeUpdateActivityStatus.selector == selector
      ) {
        return (functionId, senderId, signer);
      }
      LACLUtilsTest.generateAuthorizationError(status);
    }

    return (functionId, senderId, signer);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 senderId, bytes32 functionId)
    internal
    view
    returns (UniverseEntity storage)
  {
    UniverseEntity storage universeEntity = _data.universeReadSlot(_LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
    require(universeEntity.bs.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACLTest.AdminAccessStatus status = _doCheckAdminAccess(universeEntity.bs.adminId, senderId, functionId);
    if (status != IACLTest.AdminAccessStatus.PERMITTED) LACLUtilsTest.generateAdminAccessError(status);
    return universeEntity;
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommonsTest);
  }
}
