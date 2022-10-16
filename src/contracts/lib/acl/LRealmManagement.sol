// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../acl/AccessControlStorage.sol";
import "../../acl/IRealmManagement.sol";
import "../struct/LEnumerableSet.sol";
import "../LContextUtils.sol";
import "./LAccessControl.sol";

library LRealmManagement {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LRealmManagement"));
  bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

  function registerRealm(
    AccessControlStorage.DataMaps storage data,
    string calldata name,
    bool status,
    bool isUpgradable
  ) external returns (bytes32) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msg.sender,
        IRealmManagement.registerRealm.selector
      ),
      "RegisterRealm Access Denied"
    );
    require(bytes(name).length != 0, "Realm Name Invalid");
    bytes32 realmKey = keccak256(abi.encodePacked(name));
    require(bytes(data.realmMap[realmKey].name).length == 0, "Realm Already Registered");

    AccessControlStorage.Realm storage newRealm = data.realmMap[realmKey];
    newRealm.name = name;
    newRealm.isEnabled = status;
    newRealm.isUpgradable = isUpgradable;
    return realmKey;
  }

  function setRealmStatus(
    AccessControlStorage.DataMaps storage data,
    bytes32 realm,
    bool status
  ) external returns (bool) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
    if (LAccessControl.LIVELY_GENERAL_REALM == realm) {
      bytes32 context = LContextUtils.generateCtx(address(this));
      bytes4 signature = IRealmManagement.setRealmStatus.selector;
      bytes32 role = data.ctxMap[context].resources[signature].role;
      require(
        data.ctxMap[context].isEnabled &&
          data.ctxMap[context].resources[signature].status == AccessControlStorage.Status.ENABLED &&
          data.groupMap[data.roleMap[role].group].isEnabled &&
          data.accountMap[msg.sender][role] == AccessControlStorage.Status.ENABLED,
        "SetRealmStatus Access Denied"
      );
    } else {
      require(
        LAccessControl.hasAccess(
          data,
          LContextUtils.generateCtx(address(this)),
          msg.sender,
          IRealmManagement.setRealmStatus.selector
        ),
        "SetRealmStatus Access Denied"
      );
    }
    require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
    data.realmMap[realm].isEnabled = status;
    return true;
  }

  function setRealmUpgradeStatus(
    AccessControlStorage.DataMaps storage data,
    bytes32 realm,
    bool status
  ) external returns (bool) {
    require(!IProxy(address(this)).isSafeMode(), "SafeMode: Call Rejected");
    require(
      LAccessControl.hasAccess(
        data,
        LContextUtils.generateCtx(address(this)),
        msg.sender,
        IRealmManagement.setRealmUpgradeStatus.selector
      ),
      "SetRealmUpgradeStatus Access Denied"
    );
    require(bytes(data.realmMap[realm].name).length != 0, "Realm Not Found");
    data.realmMap[realm].isUpgradable = status;
    return true;
  }

  function hasRealmContext(
    AccessControlStorage.DataMaps storage data,
    bytes32 realm,
    bytes32 context
  ) external view returns (bool) {
    return bytes(data.realmMap[realm].name).length != 0 && data.realmMap[realm].ctxSet.contains(context);
  }

  function getRealmInfo(AccessControlStorage.DataMaps storage data, bytes32 realm)
    external
    view
    returns (
      string memory,
      bool,
      bool
    )
  {
    return (data.realmMap[realm].name, data.realmMap[realm].isEnabled, data.realmMap[realm].isUpgradable);
  }

  function getRealmContexts(AccessControlStorage.DataMaps storage data, bytes32 realm)
    external
    view
    returns (bytes32[] memory)
  {
    return data.realmMap[realm].ctxSet.values();
  }

  function getLibrary() external pure returns (address) {
    return address(LAccessControl);
  }
}
