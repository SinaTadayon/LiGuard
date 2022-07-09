// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IContextManagement {

    struct RequestContext {
        bytes32 realm;
        address smca;                    
    }

    struct RequestContextResource {
        bytes32 role;
        bytes4[] funcSelectors;
    }

    function registerContext(RequestContext calldata rc, RequestContextResource[] calldata rcr) external returns (bytes32);

    function updateContext(RequestContext calldata rc, RequestContextResource[] calldata rcr) external returns (bytes32);

    function grantContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool);

    function revokeContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool);

    function enableContext(bytes32 ctx) external returns (bool);

    function disableContext(bytes32 ctx) external returns (bool);

    function enableUpgradeContext(bytes32 ctx) external returns (bool);

    function hasContextRole(bytes32 ctx, bytes32 role, bytes4 functionSelector) external view returns (bool);

    function getContext(bytes32 ctx) external view returns (string calldata, string calldata, bytes32, bool);

    function getContextFuncs(bytes32 ctx) external view returns (bytes4[] calldata);

    event ContextRegistered(bytes32 indexed context, address indexed scma, address indexed sender, 
                       string name ,string version, bytes32 realm, bool isEnabled);

    event ContextRoleGranted(bytes32 indexed context, bytes32 indexed role, 
                            address indexed sender, bytes4 functionSelector, bytes32 realm);

    event ContextRoleRevoked(bytes32 indexed context, bytes32 indexed role, 
                            address indexed sender, bytes4 functionSelector, bytes32 realm);

    event ContextEnabled(bytes32 indexed context, address indexed sender, bytes32 indexed realm);

    event ContextDisabled(bytes32 indexed context, address indexed sender, bytes32 indexed realm);

    event ContextUpgradabilityEnabled(bytes32 indexed context, address indexed sender, bytes32 indexed realm);


}