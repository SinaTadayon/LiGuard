// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "../../acl/IContextManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../LContextUtils.sol";
import "./LAccessControl.sol";
import "hardhat/console.sol";

library LContextManagement {
    using LEnumerableSet for LEnumerableSet.Bytes32Set;

    bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LContextManagement"));
    bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

    // TODO check convert bytes4 to bytes32
    function registerAccessControlManagerContext(
        AccessControlStorage.DataMaps storage data,
        address newContract,
        bytes32 realm,
        IContextManagement.RequestContext[] calldata rc
    ) external returns (bytes32) {
        return _registerContext(data, newContract, realm, true, rc);    
    }

    function registerContext(
        AccessControlStorage.DataMaps storage data,
        address newContract,
        bytes32 realm,
        bool state,
        IContextManagement.RequestContext[] calldata rc
    ) external returns (bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.registerContext.selector
            ),
            "Access Denied"
        );
        return _registerContext(data, newContract, realm, state, rc);    
    }

    function _registerContext(
        AccessControlStorage.DataMaps storage data,
        address newContract,
        bytes32 realm,
        bool state,
        IContextManagement.RequestContext[] calldata rc
    ) private returns (bytes32) {

        require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
        bytes32 ctx = LContextUtils.generateCtx(newContract);
        AccessControlStorage.Context storage newContext = data.ctxMap[ctx];
        newContext.realm = realm;
        newContext.smca = newContract;
        newContext.isEnabled = state;

        for (uint256 i = 0; i < rc.length; i++) {
            require(bytes(data.roleMap[rc[i].role].name).length != 0, "Role Not Found");
            for (uint256 j = 0; j < rc[i].funcSelectors.length; j++) {
                newContext.resources[rc[i].funcSelectors[j]].role = rc[i].role;
                newContext.resources[rc[i].funcSelectors[j]].status = rc[i].isEnabled
                    ? AccessControlStorage.Status.ENABLED
                    : AccessControlStorage.Status.DISABLED;
                newContext.funcSet.add(rc[i].funcSelectors[j]);
            }
        }

        return ctx;
    }

    function updateContext(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bytes32 realm,
        bool state,
        IContextManagement.RequestContext[] calldata rc
    ) external returns (address) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.updateContext.selector
            ),
            "Access Denied"
        );

        address smca = data.ctxMap[ctx].smca;
        require(smca != address(0), "Context Not Found");
        require(smca != msg.sender, "Context Update Forbidden");
        require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
        data.ctxMap[ctx].isEnabled = state;
        data.ctxMap[ctx].realm = realm;

        for (uint256 i = 0; i < rc.length; i++) {
            require(bytes(data.roleMap[rc[i].role].name).length != 0, "Role Not Found");
            for (uint256 j = 0; j < rc[i].funcSelectors.length; j++) {
                data.ctxMap[ctx].resources[rc[i].funcSelectors[j]].role = rc[i].role;
                data.ctxMap[ctx].resources[rc[i].funcSelectors[j]].status = rc[i].isEnabled
                    ? AccessControlStorage.Status.ENABLED
                    : AccessControlStorage.Status.DISABLED;
                if (!data.ctxMap[ctx].funcSet.contains(rc[i].funcSelectors[j])) {
                    data.ctxMap[ctx].funcSet.add(rc[i].funcSelectors[j]);
                }
            }
        }
        return smca;
    }

    function grantContextRole(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.grantContextRole.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
        data.ctxMap[ctx].resources[functionSelector].role = role;
        data.ctxMap[ctx].resources[functionSelector].status = AccessControlStorage.Status.ENABLED;
        return data.ctxMap[ctx].realm;
    }

    function revokeContextRole(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.revokeContextRole.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
        data.ctxMap[ctx].resources[functionSelector].status = AccessControlStorage.Status.DISABLED;
        return data.ctxMap[ctx].realm;
    }

    function setContextSafeMode(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bool state
    ) external returns (bool) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.setContextSafeMode.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        return IProxy(data.ctxMap[ctx].smca).setSafeMode(state);
    }

    function setContextState(AccessControlStorage.DataMaps storage data, bytes32 ctx, bool state) external returns (bool, bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.setContextSafeMode.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        data.ctxMap[ctx].isEnabled = state;
        return (true, data.ctxMap[ctx].realm);
    }

    function setContextRealm(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bytes32 realm
    ) external returns (bool, bytes32) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.setContextRealm.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
        bytes32 oldRealm = data.ctxMap[ctx].realm;
        data.realmMap[realm].ctxSet.add(ctx);
        data.realmMap[data.ctxMap[ctx].realm].ctxSet.remove(ctx);
        return (true, oldRealm);
    }

    function setContextUpgradeState(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bool state
    ) external returns (bool) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
        require(
            LAccessControl.hasAccess(
                data,
                LContextUtils.generateCtx(address(this)),
                msg.sender,
                IContextManagement.setContextUpgradeState.selector
            ),
            "Access Denied"
        );
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        return IProxy(data.ctxMap[ctx].smca).setUpgradeState(state);
    }

    function hasContextRole(
        AccessControlStorage.DataMaps storage data,
        bytes32 ctx,
        bytes32 role,
        bytes4 functionSelector
    ) external view returns (bool) {
        if (data.ctxMap[ctx].smca != address(0)) {
            return false;
        }

        // if(bytes(data.roleMap[role].name).length != 0) {
        //     return false;
        // }

        return
            data.ctxMap[ctx].resources[functionSelector].role == role &&
            data.ctxMap[ctx].resources[functionSelector].status == AccessControlStorage.Status.ENABLED;
    }

    function getContextInfo(AccessControlStorage.DataMaps storage data, bytes32 ctx)
        external
        view
        returns (IContextManagement.ResponseContext memory)
    {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        string memory name = IProxy(data.ctxMap[ctx].smca).contractName();
        string memory version = IProxy(data.ctxMap[ctx].smca).contractVersion();
        bool isSafeMode = IProxy(data.ctxMap[ctx].smca).isSafeMode();
        bool isUpgradable = IProxy(data.ctxMap[ctx].smca).isUpgradable();

        return
            IContextManagement.ResponseContext({
                name: name,
                version: version,
                smca: data.ctxMap[ctx].smca,
                realm: data.ctxMap[ctx].realm,
                isSafeMode: isSafeMode,
                isUpgradable: isUpgradable
            });
    }

    // TODO test convert bytes32 to bytes4
    function getContextFuncs(AccessControlStorage.DataMaps storage data, bytes32 ctx)
        external
        view
        returns (bytes4[] memory)
    {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        bytes4[] memory funcs = new bytes4[](data.ctxMap[ctx].funcSet.length());
        for (uint32 i = 0; i < data.ctxMap[ctx].funcSet.length(); i++) {
            funcs[i] = bytes4(data.ctxMap[ctx].funcSet.at(i));
        }
        return funcs;
    }
}
