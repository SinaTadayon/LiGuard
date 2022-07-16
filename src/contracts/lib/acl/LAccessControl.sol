// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../acl/IContextManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRealmManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

library LAccessControl {
    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    using LEnumerableSet for LEnumerableSet.AddressSet;

    bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LAccessControl"));
    bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

    bytes32 public constant LIVELY_GENERAL_REALM = keccak256(abi.encodePacked("LIVELY_GENERAL_REALM"));
    bytes32 public constant LIVELY_GENERAL_GROUP = keccak256(abi.encodePacked("LIVELY_GENERAL_GROUP"));
    bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
    bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));
    bytes32 public constant ANONYMOUSE_ROLE = keccak256(abi.encodePacked("ANONYMOUSE_ROLE"));

    function initializeContext(AccessControlStorage.DataMaps storage data) external {
        data.accountMap[msg.sender][LIVELY_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;
        data.accountMap[msg.sender][LIVELY_SYSTEM_ADMIN_ROLE] = AccessControlStorage.Status.ENABLED;

        data.roleMap[LIVELY_ADMIN_ROLE].name = "LIVELY_ADMIN_ROLE";
        data.roleMap[LIVELY_ADMIN_ROLE].isEnabled = true;
        data.roleMap[LIVELY_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
        data.roleMap[LIVELY_ADMIN_ROLE].accountSet.add(msg.sender);

        data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].name = "LIVELY_SYSTEM_ADMIN_ROLE";
        data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].isEnabled = true;
        data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].group = LIVELY_GENERAL_GROUP;
        data.roleMap[LIVELY_SYSTEM_ADMIN_ROLE].accountSet.add(msg.sender);

        data.groupMap[LIVELY_GENERAL_GROUP].name = "LIVELY_GENERAL_GROUP";
        data.groupMap[LIVELY_GENERAL_GROUP].isEnabled = true;
        data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_ADMIN_ROLE);
        data.groupMap[LIVELY_GENERAL_GROUP].roleSet.add(LIVELY_SYSTEM_ADMIN_ROLE);

        data.realmMap[LIVELY_GENERAL_REALM].name = "LIVELY_GENERAL_REALM";
        data.realmMap[LIVELY_GENERAL_REALM].isEnabled = true;
        data.realmMap[LIVELY_GENERAL_REALM].isUpgradable = true;
    }

    function createRequestContext() external pure returns (IContextManagement.RequestContext memory) {
        IContextManagement.RequestContext memory rc;
        rc.role = LIVELY_ADMIN_ROLE;
        rc.isEnabled = true;
        rc.funcSelectors = new bytes4[](30);
        rc.funcSelectors[0] = IProxy.setUpgradeState.selector;
        rc.funcSelectors[1] = IProxy.setSafeModeState.selector;
        rc.funcSelectors[2] = IProxy.setAdmin.selector;
        rc.funcSelectors[3] = IProxy.upgradeTo.selector;
        rc.funcSelectors[4] = IProxy.contractRegisteration.selector;
        rc.funcSelectors[5] = IContextManagement.registerContext.selector;
        rc.funcSelectors[6] = IContextManagement.updateContext.selector;
        rc.funcSelectors[7] = IContextManagement.grantContextRole.selector;
        rc.funcSelectors[8] = IContextManagement.revokeContextRole.selector;
        rc.funcSelectors[9] = IContextManagement.setContextSafeMode.selector;
        rc.funcSelectors[10] = IContextManagement.setContextRealm.selector;
        rc.funcSelectors[11] = IContextManagement.setContextUpgradeState.selector;
        rc.funcSelectors[12] = IRoleManagement.registerRole.selector;
        rc.funcSelectors[13] = IRoleManagement.grantRoleAccount.selector;
        rc.funcSelectors[14] = IRoleManagement.revokeRoleAccount.selector;
        rc.funcSelectors[15] = IRoleManagement.setRoleStat.selector;
        rc.funcSelectors[16] = IRoleManagement.setRoleGroup.selector;
        rc.funcSelectors[17] = IGroupManagement.registerGroup.selector;
        rc.funcSelectors[18] = IGroupManagement.setGroupStat.selector;
        rc.funcSelectors[19] = IRealmManagement.registerRealm.selector;
        rc.funcSelectors[20] = IRealmManagement.setRealmStat.selector;
        rc.funcSelectors[21] = IRealmManagement.setRealmUpgradeStat.selector;
        return rc;
    }

    function hasAccess(
        AccessControlStorage.DataMaps storage data,
        bytes32 context,
        address account,
        bytes4 signature
    ) external view returns (bool) {
        bytes32 role = data.ctxMap[context].resources[signature].role;
        return
            data.ctxMap[context].isEnabled &&
            data.realmMap[data.ctxMap[context].realm].isEnabled &&
            data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED &&
            data.groupMap[data.roleMap[role].group].isEnabled &&
            data.accountMap[account][role] == AccessControlStorage.Status.ENABLED;
    }

    function hasSystemAdminRole(AccessControlStorage.DataMaps storage data, address account)
        external
        view
        returns (bool)
    {
        return data.accountMap[account][LIVELY_SYSTEM_ADMIN_ROLE] == AccessControlStorage.Status.ENABLED;
    }

    function hasLivelyAdminRole(AccessControlStorage.DataMaps storage data, address account)
        external
        view
        returns (bool)
    {
        return data.accountMap[account][LIVELY_ADMIN_ROLE] == AccessControlStorage.Status.ENABLED;
    }

    function hasLivelyGroup(AccessControlStorage.DataMaps storage data, bytes32 role) external view returns (bool) {
        return data.groupMap[LIVELY_GENERAL_GROUP].roleSet.contains(role);
    }

    function hasLivelyRealm(AccessControlStorage.DataMaps storage data, bytes32 context) external view returns (bool) {
        return data.realmMap[LIVELY_GENERAL_REALM].ctxSet.contains(context);
    }

    function isSafeMode(AccessControlStorage.DataMaps storage data, bytes32 context) external view returns (bool) {
        return IProxy(data.ctxMap[context].smca).isSafeMode();
    }

    function isUpgradable(AccessControlStorage.DataMaps storage data, bytes32 context) external view returns (bool) {
        return IProxy(data.ctxMap[context].smca).isUpgradable();
    }
}
