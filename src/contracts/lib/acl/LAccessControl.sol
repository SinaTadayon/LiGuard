// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../acl/IContextManagement.sol";
import "../../acl/IRoleManagement.sol";
import "../../acl/IGroupManagement.sol";
import "../../acl/IRealmManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

import "hardhat/console.sol";

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

    function createRequestContext() external pure returns (IContextManagement.RequestContext[] memory) {

        IContextManagement.RequestContext[] memory rc = new IContextManagement.RequestContext[](2);        
        rc[0].role = LIVELY_ADMIN_ROLE;
        rc[0].isEnabled = true;
        rc[0].funcSelectors = new bytes4[](19);
        rc[0].funcSelectors[0] = IProxy.setAdmin.selector;
        rc[0].funcSelectors[1] = IProxy.setUpgradeState.selector;        
        rc[0].funcSelectors[2] = IContextManagement.registerContext.selector;
        rc[0].funcSelectors[3] = IContextManagement.updateContext.selector;
        rc[0].funcSelectors[4] = IContextManagement.grantContextRole.selector;
        rc[0].funcSelectors[5] = IContextManagement.revokeContextRole.selector;
        rc[0].funcSelectors[6] = IContextManagement.setContextSafeMode.selector;
        rc[0].funcSelectors[7] = IContextManagement.setContextRealm.selector;
        rc[0].funcSelectors[8] = IContextManagement.setContextUpgradeState.selector;
        rc[0].funcSelectors[9] = IRoleManagement.registerRole.selector;
        rc[0].funcSelectors[10] = IRoleManagement.grantRoleAccount.selector;
        rc[0].funcSelectors[11] = IRoleManagement.revokeRoleAccount.selector;
        rc[0].funcSelectors[12] = IRoleManagement.setRoleStat.selector;
        rc[0].funcSelectors[13] = IRoleManagement.setRoleGroup.selector;
        rc[0].funcSelectors[14] = IGroupManagement.registerGroup.selector;
        rc[0].funcSelectors[15] = IGroupManagement.setGroupStat.selector;
        rc[0].funcSelectors[16] = IRealmManagement.registerRealm.selector;
        rc[0].funcSelectors[17] = IRealmManagement.setRealmStat.selector;
        rc[0].funcSelectors[18] = IRealmManagement.setRealmUpgradeStat.selector;

        rc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
        rc[1].isEnabled = true;
        rc[1].funcSelectors = new bytes4[](2);
        rc[1].funcSelectors[0] = IProxy.setSafeMode.selector;
        rc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
        return rc;
    }

    function hasAccess(
        AccessControlStorage.DataMaps storage data,
        bytes32 context,
        address account,
        bytes4 signature
    ) external view returns (bool) {
        bytes32 role = data.ctxMap[context].resources[signature].role;
        // console.log("hasAccess called, address: %s", account);
        
        // console.log("data.ctxMap[context].smca: %s", data.ctxMap[context].smca);
        // console.log("data.ctxMap[context].isEnabled:");
        // console.logBool(data.ctxMap[context].isEnabled);
        // console.log("data.ctxMap[context].realm: ");
        // console.logBytes32(data.ctxMap[context].realm);
        // console.log("data.ctxMap[context].resources[signature].status: ");
        // console.logBytes1(bytes1(uint8(data.ctxMap[context].resources[signature].status)));
        // console.log("data.ctxMap[context].resources[signature].role: ");
        // console.logBytes32(data.ctxMap[context].resources[signature].role);

        // console.log("data.realmMap[data.ctxMap[context].realm].name: %s", data.realmMap[data.ctxMap[context].realm].name);
        // console.log("data.realmMap[data.ctxMap[context].realm].isEnabled: ");
        // console.logBool(data.realmMap[data.ctxMap[context].realm].isEnabled);

        // console.log("data.groupMap[data.roleMap[role].group].name: %s", data.groupMap[data.roleMap[role].group].name);
        // console.log("data.groupMap[data.roleMap[role].group].isEnabled: ");
        // console.logBool(data.groupMap[data.roleMap[role].group].isEnabled);

        // console.log("data.accountMap[account][role]: ");
        // console.logBytes1(bytes1(uint8(data.accountMap[account][role])));

        return
            data.ctxMap[context].isEnabled &&
            data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED &&
            data.realmMap[data.ctxMap[context].realm].isEnabled &&            
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

    function isContextSafeMode(AccessControlStorage.DataMaps storage data, bytes32 context)
        external
        view
        returns (bool)
    {
        return IProxy(data.ctxMap[context].smca).isSafeMode();
    }

    function isContextUpgradable(AccessControlStorage.DataMaps storage data, bytes32 context)
        external
        view
        returns (bool)
    {
        return IProxy(data.ctxMap[context].smca).isUpgradable();
    }
}
