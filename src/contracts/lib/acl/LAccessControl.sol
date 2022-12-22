// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../acl/IAclCommons.sol";
// import "../../acl/IContextManagement.sol";
// import "../../acl/IRoleManagement.sol";
// import "../../acl/IGroupManagement.sol";
// import "../../acl/IRealmManagement.sol";
import "../../acl/AclStorage.sol";
import "../../proxy/IProxy.sol";
import "../struct/LEnumerableSet.sol";
// import "../LContextUtils.sol";

/**
 * @title Access Control Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LAccessControl {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  string public constant LIB_NAME = "LAccessControl";
  string public constant LIB_VERSION = "3.0.0";

  bytes32 public constant LIVELY_GENERAL_REALM = keccak256(abi.encodePacked("LIVELY_GENERAL_REALM"));
  bytes32 public constant LIVELY_ASSET_REALM = keccak256(abi.encodePacked("LIVELY_ASSET_REALM"));

  bytes32 public constant LIVELY_GENERAL_GROUP = keccak256(abi.encodePacked("LIVELY_GENERAL_GROUP"));
  bytes32 public constant LIVELY_DAO_GROUP = keccak256(abi.encodePacked("LIVELY_DAO_GROUP"));
  bytes32 public constant LIVELY_ASSET_GROUP = keccak256(abi.encodePacked("LIVELY_ASSET_GROUP"));

  bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));

  bytes32 public constant LIVELY_ASSET_MANAGER_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_MANAGER_ROLE"));
  bytes32 public constant LIVELY_ASSET_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ASSET_ADMIN_ROLE"));

  bytes32 public constant LIVELY_COMMUNITY_DAO_ROLE = keccak256(abi.encodePacked("LIVELY_COMMUNITY_DAO_ROLE"));
  bytes32 public constant LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE =
    keccak256(abi.encodePacked("LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE"));

  bytes32 public constant LIVELY_ANONYMOUS_ROLE = keccak256(abi.encodePacked("LIVELY_ANONYMOUS_ROLE"));

  // function initializeContext(AclStorage.DataCollection storage data) external {
  //   data.accountMap[msg.sender][LIVELY_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;
  //   data.accountMap[msg.sender][LIVELY_SYSTEM_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;

  //   data.roleMap[LIVELY_ADMIN_ROLE].name = "LIVELY_ADMIN_ROLE";
  //   data.roleMap[LIVELY_ADMIN_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
  //   data.roleMap[LIVELY_ADMIN_ROLE].accountSet.add(msg.sender);

  //   data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].name = "LIVELY_SYSTEM_ADMIN_ROLE";
  //   data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
  //   data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].accountSet.add(msg.sender);

  //   data.roleMap[LIVELY_ASSET_MANAGER_ROLE].name = "LIVELY_ASSET_MANAGER_ROLE";
  //   data.roleMap[LIVELY_ASSET_MANAGER_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_ASSET_MANAGER_ROLE].group = LIVELY_ASSET_GROUP;

  //   data.roleMap[LIVELY_ASSET_ADMIN_ROLE].name = "LIVELY_ASSET_ADMIN_ROLE";
  //   data.roleMap[LIVELY_ASSET_ADMIN_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_ASSET_ADMIN_ROLE].group = LIVELY_ASSET_GROUP;

  //   data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].name = "LIVELY_COMMUNITY_DAO_ROLE";
  //   data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_COMMUNITY_DAO_ROLE].group = LIVELY_DAO_GROUP;

  //   data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].name = "LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE";
  //   data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE].group = LIVELY_DAO_GROUP;

  //   data.roleMap[LIVELY_ANONYMOUS_ROLE].name = "LIVELY_ANONYMOUS_ROLE";
  //   data.roleMap[LIVELY_ANONYMOUS_ROLE].isEnabled = true;
  //   data.roleMap[LIVELY_ANONYMOUS_ROLE].group = LIVELY_GENERAL_GROUP;

  //   data.groupMap[LIVELY_GENERAL_GROUP].name = "LIVELY_GENERAL_GROUP";
  //   data.groupMap[LIVELY_GENERAL_GROUP].isEnabled = true;
  //   data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_ADMIN_ROLE);
  //   data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_SYSTEM_ADMIN_ROLE);

  //   data.groupMap[LIVELY_DAO_GROUP].name = "LIVELY_DAO_GROUP";
  //   data.groupMap[LIVELY_DAO_GROUP].isEnabled = true;
  //   data.groupMap[LIVELY_DAO_GROUP].roleSet.add(LIVELY_COMMUNITY_DAO_ROLE);
  //   data.groupMap[LIVELY_DAO_GROUP].roleSet.add(LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE);

  //   data.groupMap[LIVELY_ASSET_GROUP].name = "LIVELY_ASSET_GROUP";
  //   data.groupMap[LIVELY_ASSET_GROUP].isEnabled = true;
  //   data.groupMap[LIVELY_ASSET_GROUP].roleSet.add(LIVELY_ASSET_MANAGER_ROLE);
  //   data.groupMap[LIVELY_ASSET_GROUP].roleSet.add(LIVELY_ASSET_ADMIN_ROLE);

  //   data.realmMap[LIVELY_GENERAL_REALM].name = "LIVELY_GENERAL_REALM";
  //   data.realmMap[LIVELY_GENERAL_REALM].isEnabled = true;
  //   data.realmMap[LIVELY_GENERAL_REALM].isUpgradable = true;
  //   data.realmMap[LIVELY_GENERAL_REALM].ctxSet.add(LContextUtils.generateCtx(address(this)));

  //   data.realmMap[LIVELY_ASSET_REALM].name = "LIVELY_ASSET_REALM";
  //   data.realmMap[LIVELY_ASSET_REALM].isEnabled = true;
  //   data.realmMap[LIVELY_ASSET_REALM].isUpgradable = true;
  // }

  function registerProxyFacet(AclStorage.DataCollection storage data) external {
    data.facets.add(address(this));
    data.selectors[IProxy.upgradeTo.selector] = address(this);
    data.selectors[IProxy.setSafeModeStatus.selector] = address(this);
    data.selectors[IProxy.setUpgradabilityStatus.selector] = address(this);
    data.selectors[IProxy.setLocalAdmin.selector] = address(this);
    data.selectors[IProxy.setAccessControlManager.selector] = address(this);
    data.selectors[IProxy.contractName.selector] = address(this);
    data.selectors[IProxy.contractVersion.selector] = address(this);
    data.selectors[IProxy.accessControlManager.selector] = address(this);
    data.selectors[IProxy.subjectAddress.selector] = address(this);
    data.selectors[IProxy.safeModeStatus.selector] = address(this);
    data.selectors[IProxy.upgradabilityStatus.selector] = address(this);
    data.selectors[IProxy.localAdmin.selector] = address(this);
    data.selectors[IProxy.domainSeparator.selector] = address(this);
    data.selectors[IProxy.initVersion.selector] = address(this);
    data.selectors[IProxy.proxyInfo.selector] = address(this);
  }

  // function createRequestContext() external pure returns (IContextManagement.RequestRegisterContext[] memory) {
  //   IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](2);
  //   rrc[0].role = LIVELY_ADMIN_ROLE;
  //   rrc[0].isEnabled = true;
  //   rrc[0].funcSelectors = new bytes4[](23);
  //   rrc[0].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
  //   rrc[0].funcSelectors[1] = IProxy.setSafeMode.selector;
  //   rrc[0].funcSelectors[2] = IContextManagement.addContextFuncRole.selector;
  //   rrc[0].funcSelectors[3] = IContextManagement.removeContextFunc.selector;
  //   rrc[0].funcSelectors[4] = IContextManagement.grantContextRole.selector;
  //   rrc[0].funcSelectors[5] = IContextManagement.revokeContextRole.selector;
  //   rrc[0].funcSelectors[6] = IContextManagement.setContextRealm.selector;
  //   rrc[0].funcSelectors[7] = IContextManagement.setContextStatus.selector;
  //   rrc[0].funcSelectors[8] = IContextManagement.setPermitRegisterContext.selector;
  //   rrc[0].funcSelectors[9] = IRoleManagement.registerRole.selector;
  //   rrc[0].funcSelectors[10] = IRoleManagement.batchRegisterRole.selector;
  //   rrc[0].funcSelectors[11] = IRoleManagement.grantRoleAccount.selector;
  //   rrc[0].funcSelectors[12] = IRoleManagement.batchGrantRoleAccount.selector;
  //   rrc[0].funcSelectors[13] = IRoleManagement.revokeRoleAccount.selector;
  //   rrc[0].funcSelectors[14] = IRoleManagement.batchRevokeRoleAccount.selector;
  //   rrc[0].funcSelectors[15] = IRoleManagement.setRoleStatus.selector;
  //   rrc[0].funcSelectors[16] = IRoleManagement.setRoleGroup.selector;
  //   rrc[0].funcSelectors[17] = IGroupManagement.registerGroup.selector;
  //   rrc[0].funcSelectors[18] = IGroupManagement.setGroupStatus.selector;
  //   rrc[0].funcSelectors[19] = IRealmManagement.registerRealm.selector;
  //   rrc[0].funcSelectors[20] = IRealmManagement.setRealmStatus.selector;
  //   rrc[0].funcSelectors[21] = IRealmManagement.setRealmUpgradeStatus.selector;
  //   rrc[0].funcSelectors[22] = bytes4(keccak256("withdrawBalance(address)"));

  //   rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   rrc[1].isEnabled = true;
  //   rrc[1].funcSelectors = new bytes4[](4);
  //   rrc[1].funcSelectors[0] = IProxy.setLocalAdmin.selector;
  //   rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
  //   rrc[1].funcSelectors[2] = IContextManagement.registerContext.selector;
  //   rrc[1].funcSelectors[3] = IContextManagement.updateContext.selector;

  //   return rrc;
  // }
}
