// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../proxy/IERC1822.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../acl/IContextManagement.sol";

contract BaseUUPSProxyTest is BaseUUPSProxy {
  bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));

  event UpgradeToAnonymous(address indexed sender, address indexed newImplementation);
  event UpgradeToTester(address indexed sender, address indexed newImplementation);

  function initialize(
    string calldata domainName,
    string calldata domainVersion,
    string calldata domainRealm,
    bytes memory signature,
    address accessControlManager
  ) public onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(domainRealm));
    __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: keccak256(abi.encodePacked(domainName)),
      version: keccak256(abi.encodePacked(domainVersion)),
      realm: realm,
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](2);
    rrc[0].role = LIVELY_ADMIN_ROLE;
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

    rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](2);
    rrc[1].funcSelectors[0] = IProxy.setSafeMode.selector;
    rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
    IContextManagement(accessControlManager).registerContext(signature, rc, rrc);
  }

  function initializeWithInvalidRealm(
    string calldata domainName,
    string calldata domainVersion,
    string calldata domainRealm,
    bytes memory signature,
    address accessControlManager
  ) public onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(domainRealm));
    _domainName = keccak256(abi.encodePacked(domainName));
    _domainVersion = keccak256(abi.encodePacked(domainVersion));
    _domainRealm = realm;
    if (accessControlManager == address(0)) {
      _accessControlManager = address(this);
    } else {
      try IERC165(accessControlManager).supportsInterface(type(IAccessControl).interfaceId) returns (bool isSupported) {
        require(isSupported, "Invalid AccessControlManager");
      } catch {
        revert("Illegal AccessControlManager");
      }
      _accessControlManager = accessControlManager;
    }
    _isUpgradable = false;
    _isSafeMode = false;

    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: keccak256(abi.encodePacked(domainName)),
      version: keccak256(abi.encodePacked(domainVersion)),
      realm: realm,
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](2);
    rrc[0].role = LIVELY_ADMIN_ROLE;
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

    rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](2);
    rrc[1].funcSelectors[0] = IProxy.setSafeMode.selector;
    rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
    IContextManagement(accessControlManager).registerContext(signature, rc, rrc);
  }

  function initializeWithInvalidRole(
    string calldata domainName,
    string calldata domainVersion,
    string calldata domainRealm,
    bytes memory signature,
    address accessControlManager
  ) public onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(domainRealm));
    __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);

    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: keccak256(abi.encodePacked(domainName)),
      version: keccak256(abi.encodePacked(domainVersion)),
      realm: realm,
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](1);
    rrc[0].role = keccak256(abi.encodePacked("LIVELY_WORLD_ADMIN"));
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

    IContextManagement(accessControlManager).registerContext(signature, rc, rrc);
  }

  function reInitialize(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
    _domainRealm = keccak256(abi.encodePacked("LIVELY_VERSE_REALM"));
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: _domainName,
      version: _domainVersion,
      realm: _domainRealm,
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestUpdateContext[] memory ruc = new IContextManagement.RequestUpdateContext[](5);
    ruc[0].role = LIVELY_SYSTEM_ADMIN_ROLE;
    ruc[0].updateStatus = IContextManagement.UpdateContextStatus.DISABLE;
    ruc[0].funcSelectors = new bytes4[](1);
    ruc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

    ruc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    ruc[1].updateStatus = IContextManagement.UpdateContextStatus.ENABLE;
    ruc[1].funcSelectors = new bytes4[](1);
    ruc[1].funcSelectors[0] = this.upgradeToAndCall.selector;

    ruc[2].role = keccak256(abi.encodePacked("TESTER_ROLE"));
    ruc[2].updateStatus = IContextManagement.UpdateContextStatus.ENABLE;
    ruc[2].funcSelectors = new bytes4[](1);
    ruc[2].funcSelectors[0] = this.upgradeToTesterRole.selector;

    ruc[3].role = keccak256(abi.encodePacked("LIVELY_ANONYMOUS_ROLE"));
    ruc[3].updateStatus = IContextManagement.UpdateContextStatus.ENABLE;
    ruc[3].funcSelectors = new bytes4[](1);
    ruc[3].funcSelectors[0] = this.upgradeToAnonymousRole.selector;

    ruc[4].role = LIVELY_SYSTEM_ADMIN_ROLE;
    ruc[4].updateStatus = IContextManagement.UpdateContextStatus.REMOVE;
    ruc[4].funcSelectors = new bytes4[](1);
    ruc[4].funcSelectors[0] = IProxy.setLocalAdmin.selector;

    IContextManagement(_accessControlManager).updateContext(
      LContextUtils.generateCtx(address(this)),
      signature,
      rc,
      ruc
    );
  }

  function reInitializeWithInvalidRealm(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: _domainName,
      version: _domainVersion,
      realm: keccak256(abi.encodePacked("LIVELY_REALM")),
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestUpdateContext[] memory ruc = new IContextManagement.RequestUpdateContext[](2);
    ruc[0].role = LIVELY_SYSTEM_ADMIN_ROLE;
    ruc[0].updateStatus = IContextManagement.UpdateContextStatus.DISABLE;
    ruc[0].funcSelectors = new bytes4[](1);
    ruc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

    ruc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
    ruc[1].updateStatus = IContextManagement.UpdateContextStatus.ENABLE;
    ruc[1].funcSelectors = new bytes4[](1);
    ruc[1].funcSelectors[0] = this.upgradeToAndCall.selector;

    IContextManagement(_accessControlManager).updateContext(
      LContextUtils.generateCtx(address(this)),
      signature,
      rc,
      ruc
    );
  }

  function reInitializeWithInvalidRole(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
      name: _domainName,
      version: _domainVersion,
      realm: _domainRealm,
      contractId: address(this),
      status: true
    });

    IContextManagement.RequestUpdateContext[] memory rrc = new IContextManagement.RequestUpdateContext[](1);
    rrc[0].role = keccak256(abi.encodePacked("LIVELY_WORLD_ADMIN"));
    rrc[0].updateStatus = IContextManagement.UpdateContextStatus.DISABLE;
    rrc[0].funcSelectors = new bytes4[](1);
    rrc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

    IContextManagement(_accessControlManager).updateContext(
      LContextUtils.generateCtx(address(this)),
      signature,
      rc,
      rrc
    );
  }

  //    function proxiableUUID() external view virtual override notDelegated returns (bytes32) {
  //        return _IMPLEMENTATION_SLOT;
  //    }

  function upgradeToTesterRole(address newImplementation) external virtual onlyProxy {
    require(!_isSafeMode, "SafeMode: Call Rejected");
    require(_isUpgradable, "Upgrade Call Rejected");
    require(_hasPermission(this.upgradeToTesterRole.selector), "upgradeToTesterRole Forbidden");
    emit UpgradeToTester(msg.sender, newImplementation);
  }

  function upgradeToAnonymousRole(address newImplementation) external virtual onlyProxy {
    require(!_isSafeMode, "SafeMode: Call Rejected");
    require(_isUpgradable, "Upgrade Call Rejected");
    require(_hasPermission(this.upgradeToAnonymousRole.selector), "upgradeToAnonymousRole Forbidden");
    emit UpgradeToAnonymous(msg.sender, newImplementation);
  }

  function upgradeToAndCall(address newImplementation, bytes memory data) external payable virtual onlyProxy {
    _authorizeUpgrade(newImplementation);
    _upgradeToAndCallUUPS(newImplementation, data, true);
  }

  //    function _authorizeUpgrade(address newImplementation) internal virtual override {}
}
