// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../acl/IContextManagement.sol";
import "../../acl/AccessControlStorage.sol";
import "../struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";
import "../LContextUtils.sol";
import "./LAccessControl.sol";
import "../cryptography/LECDSA.sol";

import "hardhat/console.sol";

library LContextManagement {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LContextManagement"));
  bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

  bytes32 public constant TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
  
  bytes32 public constant CTX_MESSAGE_TYPEHASH =
    keccak256("Context(address contractId,string name,string version,string realm)");
  
  bytes32 public constant PREDICT_CTX_MESSAGE_TYPEHASH =
    keccak256("PredictContext(address base,string name,string version,string realm,bytes32 bytesHash)");

  function registerAccessControlManagerContext(
    AccessControlStorage.DataMaps storage data,
    address newContract,
    bytes32 realm,
    IContextManagement.RequestRegisterContext[] calldata rc
  ) external returns (bytes32) {
    return _registerContext(data, newContract, realm, true, rc);
  }

  function registerContext(
    AccessControlStorage.DataMaps storage data,
    bytes memory signature,
    IContextManagement.RequestContext calldata rc,
    IContextManagement.RequestRegisterContext[] calldata rrc
  ) external returns (bytes32, address) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");

    bytes32 structHash = _getContextMessageHash(rc.contractId, rc.name, rc.version, rc.realm);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);

    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");

    // console.log("blockchain id: %d", block.chainid);
    // console.log("msgDigest id");
    // console.logBytes32(msgDigest);
    // console.log("registerContext msgSigner is %s", msgSigner);

    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msgSigner,
        IContextManagement.registerContext.selector
      ),
      "RegisterContext Access Denied"
    );
    return (_registerContext(data, rc.contractId, rc.realm, rc.status, rrc), msgSigner);
  }

  function registerPredictContext(
      AccessControlStorage.DataMaps storage data,
      bytes memory signature,
      IContextManagement.RequestPredictContext calldata rpc,
      IContextManagement.RequestRegisterContext[] calldata rrc
  ) external returns (bytes32, address) {
        require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");

    bytes32 structHash = _getPredictContextMessageHash(rpc.base, rpc.name, rpc.version, rpc.realm, rpc.bytesHash);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);

    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");

    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msgSigner,
        IContextManagement.registerContext.selector
      ),
      "RegisterPredictContext Access Denied"
    );
    return (_registerPredictContext(data, rrc, rpc), msgSigner);
  }


  function _getContextMessageHash(
    address contractId,
    bytes32 name,
    bytes32 version,
    bytes32 realm
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(CTX_MESSAGE_TYPEHASH, contractId, name, version, realm));
  }

  function _getPredictContextMessageHash(
    address base,
    bytes32 name,
    bytes32 version,
    bytes32 realm,
    bytes32 bytesHash
  ) internal pure returns (bytes32) {
    return keccak256(abi.encode(PREDICT_CTX_MESSAGE_TYPEHASH, base, name, version, realm, bytesHash));
  }

  function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32) {
    return LECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
  }

  function _domainSeparatorV4() internal view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          TYPE_HASH,
          IProxy(address(this)).contractName(),
          IProxy(address(this)).contractVersion(),
          block.chainid,
          address(this)
        )
      );
  }

  function _registerContext(
    AccessControlStorage.DataMaps storage data,
    address newContract,
    bytes32 realm,
    bool status,
    IContextManagement.RequestRegisterContext[] calldata rrc
  ) private returns (bytes32) {
    require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
    bytes32 ctx = LContextUtils.generateCtx(newContract);
    require(data.ctxMap[ctx].contractId == address(0), "Context Already Registered");
    data.realmMap[realm].ctxSet.add(ctx);
    AccessControlStorage.Context storage newContext = data.ctxMap[ctx];
    newContext.realm = realm;
    newContext.contractId = newContract;
    newContext.isEnabled = status;

    for (uint256 i = 0; i < rrc.length; i++) {
      require(bytes(data.roleMap[rrc[i].role].name).length != 0, "Role Not Found");
      for (uint256 j = 0; j < rrc[i].funcSelectors.length; j++) {
        newContext.resources[rrc[i].funcSelectors[j]].role = rrc[i].role;
        newContext.resources[rrc[i].funcSelectors[j]].status = rrc[i].isEnabled
          ? AccessControlStorage.Status.ENABLED
          : AccessControlStorage.Status.DISABLED;
        newContext.funcSet.add(rrc[i].funcSelectors[j]);
      }
    }

    return ctx;
  }

  function _registerPredictContext(
    AccessControlStorage.DataMaps storage data,
    IContextManagement.RequestRegisterContext[] calldata rrc,
    IContextManagement.RequestPredictContext calldata rpc
  ) private returns (bytes32) {
    require(bytes(data.realmMap[rpc.realm].name).length != 0, "Realm Not Found");

    // TODO must be check
    address predictedContractId = address(uint160(uint(keccak256(abi.encodePacked(bytes1(0xff), rpc.base, rpc.salt, rpc.bytesHash)))));

    bytes32 ctx = LContextUtils.generateCtx(predictedContractId);
    require(data.ctxMap[ctx].contractId == address(0), "Context Already Registered");
    data.realmMap[rpc.realm].ctxSet.add(ctx);
    AccessControlStorage.Context storage newContext = data.ctxMap[ctx];
    newContext.realm = rpc.realm;
    newContext.contractId = predictedContractId;
    newContext.isEnabled = rpc.status;

    for (uint256 i = 0; i < rrc.length; i++) {
      require(bytes(data.roleMap[rrc[i].role].name).length != 0, "Role Not Found");
      for (uint256 j = 0; j < rrc[i].funcSelectors.length; j++) {
        newContext.resources[rrc[i].funcSelectors[j]].role = rrc[i].role;
        newContext.resources[rrc[i].funcSelectors[j]].status = rrc[i].isEnabled
          ? AccessControlStorage.Status.ENABLED
          : AccessControlStorage.Status.DISABLED;
        newContext.funcSet.add(rrc[i].funcSelectors[j]);
      }
    }

    return ctx;
  }

  function updateContext(
    AccessControlStorage.DataMaps storage data,
    bytes32 ctx,
    bytes memory signature,
    IContextManagement.RequestContext calldata rc,
    IContextManagement.RequestUpdateContext[] calldata ruc
  ) external returns (address, address) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");

    bytes32 structHash = _getContextMessageHash(rc.contractId, rc.name, rc.version, rc.realm);
    bytes32 msgDigest = _hashTypedDataV4(structHash);
    (address msgSigner, LECDSA.RecoverError recoverErr) = LECDSA.tryRecover(msgDigest, signature);
    require(recoverErr == LECDSA.RecoverError.NoError, "Illegal ECDASA Signature");
    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msgSigner,
        IContextManagement.updateContext.selector
      ),
      "UpdateContext Access Denied"
    );
    return (_updateContext(data, ctx, rc.realm, rc.status, ruc), msgSigner);
  }

  function _updateContext(
    AccessControlStorage.DataMaps storage data,
    bytes32 ctx,
    bytes32 realm,
    bool status,
    IContextManagement.RequestUpdateContext[] calldata ruc
  ) internal returns (address) {
    address contractId = data.ctxMap[ctx].contractId;
    require(contractId != address(0), "Context Not Found");
    require(contractId == msg.sender, "Update Context Forbidden");
    require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
    data.ctxMap[ctx].isEnabled = status;

    if (data.ctxMap[ctx].realm != realm) {
      data.realmMap[data.ctxMap[ctx].realm].ctxSet.remove(ctx);
      data.realmMap[realm].ctxSet.add(ctx);
    }
    data.ctxMap[ctx].realm = realm;

    for (uint256 i = 0; i < ruc.length; i++) {
      require(bytes(data.roleMap[ruc[i].role].name).length != 0, "Role Not Found");
      for (uint256 j = 0; j < ruc[i].funcSelectors.length; j++) {
        if (
          ruc[i].updateStatus == IContextManagement.UpdateContextStatus.ENABLE ||
          ruc[i].updateStatus == IContextManagement.UpdateContextStatus.DISABLE
        ) {
          data.ctxMap[ctx].resources[ruc[i].funcSelectors[j]].role = ruc[i].role;
          data.ctxMap[ctx].resources[ruc[i].funcSelectors[j]].status = ruc[i].updateStatus ==
            IContextManagement.UpdateContextStatus.ENABLE
            ? AccessControlStorage.Status.ENABLED
            : AccessControlStorage.Status.DISABLED;
          if (!data.ctxMap[ctx].funcSet.contains(ruc[i].funcSelectors[j])) {
            data.ctxMap[ctx].funcSet.add(ruc[i].funcSelectors[j]);
          }
        } else {
          delete data.ctxMap[ctx].resources[ruc[i].funcSelectors[j]].role;
          delete data.ctxMap[ctx].resources[ruc[i].funcSelectors[j]].status;
          data.ctxMap[ctx].funcSet.remove(ruc[i].funcSelectors[j]);
        }
      }
    }
    return contractId;
  }

  function addContextFuncRole(
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
        IContextManagement.addContextFuncRole.selector
      ),
      "AddContextFuncRole Access Denied"
    );
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
    require(!data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Already Exists");
    data.ctxMap[ctx].resources[functionSelector].role = role;
    data.ctxMap[ctx].resources[functionSelector].status = AccessControlStorage.Status.ENABLED;
    data.ctxMap[ctx].funcSet.add(functionSelector);
    return data.ctxMap[ctx].realm;
  }

  function removeContextFunc(
    AccessControlStorage.DataMaps storage data,
    bytes32 ctx,
    bytes4 functionSelector
  ) external returns (bytes32) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msg.sender,
        IContextManagement.removeContextFunc.selector
      ),
      "RemoveContextFunc Access Denied"
    );

    require(LContextUtils.generateCtx(address(this)) != ctx, "Illegal Remove ACL Context");
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
    delete data.ctxMap[ctx].resources[functionSelector].role;
    delete data.ctxMap[ctx].resources[functionSelector].status;
    data.ctxMap[ctx].funcSet.remove(functionSelector);
    return data.ctxMap[ctx].realm;
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
      "GrantContextRole Access Denied"
    );

    require(LContextUtils.generateCtx(address(this)) != ctx, "Illegal Grant ACL Context");
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
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
      "RevokeContextRole Access Denied"
    );

    require(LContextUtils.generateCtx(address(this)) != ctx, "Illegal Revoke ACL Context");
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    require(bytes(data.roleMap[role].name).length != 0, "Role Not Found");
    require(data.ctxMap[ctx].funcSet.contains(functionSelector), "FunctionSelector Not Found");
    data.ctxMap[ctx].resources[functionSelector].status = AccessControlStorage.Status.DISABLED;
    return data.ctxMap[ctx].realm;
  }

  function setContextStatus(
    AccessControlStorage.DataMaps storage data,
    bytes32 ctx,
    bool status
  ) external returns (bool, bytes32) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msg.sender,
        IContextManagement.setContextStatus.selector
      ),
      "SetContextStatus Access Denied"
    );

    require(LContextUtils.generateCtx(address(this)) != ctx, "Illegal Change ACL Context Status");
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    data.ctxMap[ctx].isEnabled = status;
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
      "SetContextRealm Access Denied"
    );
    require(LContextUtils.generateCtx(address(this)) != ctx, "Illegal Change ACL Context Realm");
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
    require(data.ctxMap[ctx].realm != realm, "Illegal Realm Duplication");
    bytes32 oldRealm = data.ctxMap[ctx].realm;
    data.realmMap[realm].ctxSet.add(ctx);
    data.realmMap[data.ctxMap[ctx].realm].ctxSet.remove(ctx);
    return (true, oldRealm);
  }

  function hasContextRole(
    AccessControlStorage.DataMaps storage data,
    bytes32 ctx,
    bytes32 role,
    bytes4 functionSelector
  ) external view returns (bool) {
    return
      data.ctxMap[ctx].contractId != address(0) &&
      data.ctxMap[ctx].resources[functionSelector].role == role &&
      data.ctxMap[ctx].resources[functionSelector].status == AccessControlStorage.Status.ENABLED;
  }

  function getContextInfo(AccessControlStorage.DataMaps storage data, bytes32 ctx)
    external
    view
    returns (IContextManagement.ResponseContext memory)
  {
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    bytes32 name = IProxy(data.ctxMap[ctx].contractId).contractName();
    bytes32 version = IProxy(data.ctxMap[ctx].contractId).contractVersion();
    bool isSafeMode = IProxy(data.ctxMap[ctx].contractId).isSafeMode();
    bool isUpgradable = IProxy(data.ctxMap[ctx].contractId).isUpgradable();

    return
      IContextManagement.ResponseContext({
        name: name,
        version: version,
        contractId: data.ctxMap[ctx].contractId,
        realm: data.ctxMap[ctx].realm,
        isSafeMode: isSafeMode,
        isUpgradable: isUpgradable
      });
  }

  function getContextFuncs(AccessControlStorage.DataMaps storage data, bytes32 ctx)
    external
    view
    returns (bytes4[] memory)
  {
    require(data.ctxMap[ctx].contractId != address(0), "Context Not Found");
    bytes4[] memory funcs = new bytes4[](data.ctxMap[ctx].funcSet.length());
    for (uint32 i = 0; i < data.ctxMap[ctx].funcSet.length(); i++) {
      funcs[i] = bytes4(data.ctxMap[ctx].funcSet.at(i));
    }
    return funcs;
  }
}
