// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

import "../../acl/IContextManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../LContextUtils.sol";

library LContextManagement {

    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    
    string constant public LIB_NAME = "LContextManagement";
    string constant public LIB_VERSION = "v0.0.1";


    // TODO check convert bytes4 to bytes32 
    function registerContext(AccessControlStorage.DataMaps storage data, 
                             address newContract, bytes32 realm,
                             IContextManagement.RequestContext[] calldata rc) external returns (bytes32) {
        // require(msg.sender == rc.smca, "Illegal Contract Address");
        require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");

        bytes32 ctx = LContextUtils.generateCtx(newContract);
        require(data.ctxMap[ctx].smca == address(0), "Context Already Registered");
        AccessControlStorage.Context storage newContext = data.ctxMap[ctx];
        newContext.realm = realm;
        newContext.smca = newContract;
        
        for (uint256 i = 0; i < rc.length; i++) {
            require(bytes(data.roleMap[rc[i].role].name).length != 0, "Role Not Found");
            for (uint256 j = 0; j < rc[i].funcSelectors.length; j++) {
                bytes32 selectorKey = keccak256(abi.encodePacked(rc[i].funcSelectors[j], rc[i].role));
                newContext.resources[selectorKey] = rc[i].isEnabled ? AccessControlStorage.Status.ENABLED : AccessControlStorage.Status.DISABLED;
                newContext.funcSet.add(rc[i].funcSelectors[j]); 
            }
        }

        return ctx;
    }

    function updateContext(AccessControlStorage.DataMaps storage data,
            bytes32 ctx, IContextManagement.RequestContext[] calldata rc) external returns (address, bytes32) {
        
        address smca = data.ctxMap[ctx].smca;
        require(smca != address(0), "Context Not Found");
        require(smca != msg.sender, "Context Update Forbidden");
        
        for (uint256 i = 0; i < rc.length; i++) {
            require(bytes(data.roleMap[rc[i].role].name).length != 0, "Role Not Found");
            for (uint256 j = 0; j < rc[i].funcSelectors.length; j++) {
                bytes32 selectorKey = keccak256(abi.encodePacked(rc[i].funcSelectors[j], rc[i].role));
                data.ctxMap[ctx].resources[selectorKey] = rc[i].isEnabled ? AccessControlStorage.Status.ENABLED : AccessControlStorage.Status.DISABLED;                
                if (!data.ctxMap[ctx].funcSet.contains(rc[i].funcSelectors[j])) {
                    data.ctxMap[ctx].funcSet.add(rc[i].funcSelectors[j]);
                }
            }
        }
        return (smca, data.ctxMap[ctx].realm);
    }

    function grantContextRole(AccessControlStorage.DataMaps storage data, 
            bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bytes32) {

        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
        bytes32 selectorKey = keccak256(abi.encodePacked(functionSelector,role));
        data.ctxMap[ctx].resources[selectorKey] = AccessControlStorage.Status.ENABLED;
        return data.ctxMap[ctx].realm;  
    }

    function revokeContextRole(AccessControlStorage.DataMaps storage data, 
            bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bytes32) {

        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
        require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
        bytes32 selectorKey = keccak256(abi.encodePacked(functionSelector,role));
        data.ctxMap[ctx].resources[selectorKey] = AccessControlStorage.Status.DISABLED;
        return data.ctxMap[ctx].realm;  
    }

    function enableContext(AccessControlStorage.DataMaps storage data, bytes32 ctx) external returns (bool) {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        return IProxy(data.ctxMap[ctx].smca).setActivity(true); 
    }

    function disableContext(AccessControlStorage.DataMaps storage data, bytes32 ctx) external returns (bool) {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        return IProxy(data.ctxMap[ctx].smca).setActivity(false); 
    }

    function enableUpgradeContext(AccessControlStorage.DataMaps storage data, bytes32 ctx) external returns (bool) {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        return IProxy(data.ctxMap[ctx].smca).setUpgradability(true);
    }

    function hasContextRole(AccessControlStorage.DataMaps storage data, 
            bytes32 ctx, bytes32 role, bytes4 functionSelector) external view returns (bool) {
        if(data.ctxMap[ctx].smca != address(0)) {
            return false;
        }

        if(bytes(data.roleMap[role].name).length != 0) {
            return false;
        }

        bytes32 selectorKey = keccak256(abi.encodePacked(functionSelector,role));
        return data.ctxMap[ctx].resources[selectorKey] == AccessControlStorage.Status.ENABLED;
    }

    function getContextInfo(AccessControlStorage.DataMaps storage data, bytes32 ctx) external view returns (IContextManagement.ResponseContext memory) {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        string memory name = IProxy(data.ctxMap[ctx].smca).contractName();
        string memory version = IProxy(data.ctxMap[ctx].smca).contractVersion();
        bool isEnabled = IProxy(data.ctxMap[ctx].smca).isActivated();
        bool isUpgradable = IProxy(data.ctxMap[ctx].smca).isUpgradable();

        return IContextManagement.ResponseContext({
            name: name,
            version: version,
            smca: data.ctxMap[ctx].smca,
            realm: data.ctxMap[ctx].realm,
            isEnabled: isEnabled,
            isUpgradable: isUpgradable
        });
    }


    // TODO test convert bytes32 to bytes4
    function getContextFuncs(AccessControlStorage.DataMaps storage data, bytes32 ctx) external view returns (bytes4[] memory) {
        require(data.ctxMap[ctx].smca != address(0), "Context Not Found");
        bytes4[] memory funcs = new bytes4[](data.ctxMap[ctx].funcSet.length());
        for (uint32 i = 0; i < data.ctxMap[ctx].funcSet.length(); i++) {
            funcs[i] = bytes4(data.ctxMap[ctx].funcSet.at(i));
        }
        return funcs;
    }

}