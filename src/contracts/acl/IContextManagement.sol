// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IContextManagement {
    struct RequestContext {
        bytes32 role;
        bytes4[] funcSelectors;
        bool isEnabled;
    }

    struct ResponseContext {
        string name;
        string version;
        address smca;
        bytes32 realm;
        bool isSafeMode;
        bool isUpgradable;
    }

    event ContextRegistered(bytes32 indexed context, address indexed scma, address indexed sender, bytes32 realm, bool state);

    event ContextUpdated(bytes32 indexed context, address indexed scma, address indexed sender, bytes32 realm, bool state);

    event ContextStateChanged(bytes32 indexed context, address indexed sender, bytes32 indexed realm, bool state);

    event ContextRoleGranted(
        bytes32 indexed context,
        bytes32 indexed role,
        address indexed sender,
        bytes4 functionSelector,
        bytes32 realm
    );

    event ContextRoleRevoked(
        bytes32 indexed context,
        bytes32 indexed role,
        address indexed sender,
        bytes4 functionSelector,
        bytes32 realm
    );

    event ContextRealmChanged(
        bytes32 indexed context,
        address indexed sender,
        bytes32 indexed newRealm,
        bytes32 oldRealm
    );

    function registerContext(
        address newContract,
        bytes32 realm,
        bool state,
        RequestContext[] calldata rc
    ) external returns (bytes32);

    function updateContext(bytes32 ctx, bytes32 realm, bool state, RequestContext[] calldata rc) external returns (address);

    function grantContextRole(
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bool);

    function revokeContextRole(
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bool);

    function setContextRealm(bytes32 ctx, bytes32 realm) external returns (bool);

    function setContextState(bytes32 ctx, bool state) external returns (bool);

    function setContextSafeMode(bytes32 ctx, bool state) external returns (bool);

    function setContextUpgradeState(bytes32 ctx, bool state) external returns (bool);

    function hasContextRole(
        bytes32 ctx,
        bytes32 role,
        bytes4 functionSelector
    ) external view returns (bool);

    function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory);

    function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory);
}
