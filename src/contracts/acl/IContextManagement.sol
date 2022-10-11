// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IContextManagement {
  enum UpdateContextStatus {
    DISABLE,
    ENABLE,
    REMOVE
  }

  struct RequestContext {
    bytes32 name;
    bytes32 version;
    bytes32 realm;
    address contractId;
    bool status;
  }

   struct RequestPredictContext {
    bytes32 name;
    bytes32 version;
    bytes32 realm;
    bytes32 salt;
    bytes32 bytesHash;
    address deployer;
    bool status;
  }

  struct RequestRegisterContext {
    bytes32 role;
    bytes4[] funcSelectors;
    bool isEnabled;
  }

  struct RequestUpdateContext {
    bytes32 role;
    bytes4[] funcSelectors;
    UpdateContextStatus updateStatus;
  }

  struct ResponseContext {
    bytes32 name;
    bytes32 version;
    bytes32 realm;
    address contractId;
    bool isSafeMode;
    bool isUpgradable;
  }

  event ContextRegistered(bytes32 indexed context, address indexed contractId, address indexed signer, address sender, bytes32 realm);

  event PredictContextRegistered(bytes32 indexed context, address indexed base, address indexed signer, address sender, bytes32 realm, bytes32 bytesHash);

  event ContextUpdated(bytes32 indexed context, address indexed contractId, address indexed sender, bytes32 realm);

  event ContextStatusChanged(bytes32 indexed context, address indexed sender, bytes32 indexed realm, bool status);

  event ContextFuncRoleAdded(
    bytes32 indexed context,
    bytes32 indexed role,
    address indexed sender,
    bytes4 functionSelector,
    bytes32 realm
  );

  event ContextFuncRemoved(bytes32 indexed context, address indexed sender, bytes4 functionSelector, bytes32 realm);

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

  event ContextRealmChanged(bytes32 indexed context, address indexed sender, bytes32 indexed realm, bytes32 oldRealm);

  function registerContext(
    bytes memory signature,
    RequestContext calldata rc,
    RequestRegisterContext[] calldata rcr
  ) external returns (bytes32);

  function registerPredictContext(
    bytes memory signature,
    RequestPredictContext calldata rpc,
    RequestRegisterContext[] calldata rrc
  ) external returns (bytes32);

  function updateContext(
    bytes32 ctx,
    bytes memory signature,
    RequestContext calldata rc,
    RequestUpdateContext[] calldata ruc
  ) external returns (address);

  function addContextFuncRole(
    bytes32 ctx,
    bytes4 functionSelector,
    bytes32 role
  ) external returns (bool);

  function removeContextFunc(bytes32 ctx, bytes4 functionSelector) external returns (bool);

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

  function setContextStatus(bytes32 ctx, bool status) external returns (bool);

  function hasContextRole(
    bytes32 ctx,
    bytes32 role,
    bytes4 functionSelector
  ) external view returns (bool);

  function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory);

  function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory);
}
