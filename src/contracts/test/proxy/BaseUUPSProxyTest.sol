// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.19;

import "../../proxy/IERC1822.sol";
import "../../proxy/BaseUUPSProxy.sol";
import "../../acl/scope/IContextManagement.sol";

/**
 * @title Base UUPS Proxy Test
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract BaseUUPSProxyTest is BaseUUPSProxy {
  bytes32 public constant LIVELY_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_ADMIN_ROLE"));
  bytes32 public constant LIVELY_SYSTEM_ADMIN_ROLE = keccak256(abi.encodePacked("LIVELY_SYSTEM_ADMIN_ROLE"));

  event UpgradeToAnonymous(address indexed sender, address indexed newImplementation);
  event UpgradeToTester(address indexed sender, address indexed newImplementation);

  // function initialize(
  //   string calldata domainName,
  //   string calldata domainVersion,
  //   string calldata domainRealm,
  //   bytes memory signature,
  //   address accessControlManager
  // ) public onlyLocalAdmin initializer {
  //   bytes32 realm = keccak256(abi.encodePacked(domainRealm));
  //   __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: keccak256(abi.encodePacked(domainName)),
  //     version: keccak256(abi.encodePacked(domainVersion)),
  //     realm: realm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestRegisterContext[] memory rrc = new IContextManagementTest.RequestRegisterContext[](2);
  //   rrc[0].role = LIVELY_ADMIN_ROLE;
  //   rrc[0].isEnabled = true;
  //   rrc[0].funcSelectors = new bytes4[](2);
  //   rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
  //   rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

  //   rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   rrc[1].isEnabled = true;
  //   rrc[1].funcSelectors = new bytes4[](2);
  //   rrc[1].funcSelectors[0] = IProxy.setSafeMode.selector;
  //   rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
  //   IContextManagementTest(accessControlManager).registerContext(signature, rc, rrc);
  // }

  // function initializeWithInvalidRealm(
  //   string calldata domainName,
  //   string calldata domainVersion,
  //   string calldata domainRealm,
  //   bytes memory signature,
  //   address accessControlManager
  // ) public onlyLocalAdmin initializer {
  //   bytes32 realm = keccak256(abi.encodePacked(domainRealm));
  //   _domainName = keccak256(abi.encodePacked(domainName));
  //   _domainVersion = keccak256(abi.encodePacked(domainVersion));
  //   _domainRealm = realm;
  //   if (accessControlManager == address(0)) {
  //     _accessControlManager = address(this);
  //   } else {
  //     try IERC165(accessControlManager).supportsInterface(type(IAccessControl).interfaceId) returns (bool isSupported) {
  //       require(isSupported, "Invalid AccessControlManager");
  //     } catch {
  //       revert("Illegal AccessControlManager");
  //     }
  //     _accessControlManager = accessControlManager;
  //   }
  //   _isUpgradable = false;
  //   _isSafeMode = false;

  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: keccak256(abi.encodePacked(domainName)),
  //     version: keccak256(abi.encodePacked(domainVersion)),
  //     realm: realm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestRegisterContext[] memory rrc = new IContextManagementTest.RequestRegisterContext[](2);
  //   rrc[0].role = LIVELY_ADMIN_ROLE;
  //   rrc[0].isEnabled = true;
  //   rrc[0].funcSelectors = new bytes4[](2);
  //   rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
  //   rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

  //   rrc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   rrc[1].isEnabled = true;
  //   rrc[1].funcSelectors = new bytes4[](2);
  //   rrc[1].funcSelectors[0] = IProxy.setSafeMode.selector;
  //   rrc[1].funcSelectors[1] = IProxy.upgradeTo.selector;
  //   IContextManagementTest(accessControlManager).registerContext(signature, rc, rrc);
  // }

  // function initializeWithInvalidRole(
  //   string calldata domainName,
  //   string calldata domainVersion,
  //   string calldata domainRealm,
  //   bytes memory signature,
  //   address accessControlManager
  // ) public onlyLocalAdmin initializer {
  //   bytes32 realm = keccak256(abi.encodePacked(domainRealm));
  //   __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);

  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: keccak256(abi.encodePacked(domainName)),
  //     version: keccak256(abi.encodePacked(domainVersion)),
  //     realm: realm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestRegisterContext[] memory rrc = new IContextManagementTest.RequestRegisterContext[](1);
  //   rrc[0].role = keccak256(abi.encodePacked("LIVELY_WORLD_ADMIN"));
  //   rrc[0].isEnabled = true;
  //   rrc[0].funcSelectors = new bytes4[](2);
  //   rrc[0].funcSelectors[0] = IProxy.setLocalAdmin.selector;
  //   rrc[0].funcSelectors[1] = IProxy.setUpgradeStatus.selector;

  //   IContextManagementTest(accessControlManager).registerContext(signature, rc, rrc);
  // }

  // function reInitialize(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
  //   _domainRealm = keccak256(abi.encodePacked("LIVELY_VERSE_REALM"));
  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: _domainName,
  //     version: _domainVersion,
  //     realm: _domainRealm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestUpdateContext[] memory ruc = new IContextManagementTest.RequestUpdateContext[](5);
  //   ruc[0].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   ruc[0].updateStatus = IContextManagementTest.UpdateContextStatus.DISABLE;
  //   ruc[0].funcSelectors = new bytes4[](1);
  //   ruc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

  //   ruc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   ruc[1].updateStatus = IContextManagementTest.UpdateContextStatus.ENABLE;
  //   ruc[1].funcSelectors = new bytes4[](1);
  //   ruc[1].funcSelectors[0] = this.upgradeToAndCall.selector;

  //   ruc[2].role = keccak256(abi.encodePacked("TESTER_ROLE"));
  //   ruc[2].updateStatus = IContextManagementTest.UpdateContextStatus.ENABLE;
  //   ruc[2].funcSelectors = new bytes4[](1);
  //   ruc[2].funcSelectors[0] = this.upgradeToTesterRole.selector;

  //   ruc[3].role = keccak256(abi.encodePacked("LIVELY_ANONYMOUS_ROLE"));
  //   ruc[3].updateStatus = IContextManagementTest.UpdateContextStatus.ENABLE;
  //   ruc[3].funcSelectors = new bytes4[](1);
  //   ruc[3].funcSelectors[0] = this.upgradeToAnonymousRole.selector;

  //   ruc[4].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   ruc[4].updateStatus = IContextManagementTest.UpdateContextStatus.REMOVE;
  //   ruc[4].funcSelectors = new bytes4[](1);
  //   ruc[4].funcSelectors[0] = IProxy.setLocalAdmin.selector;

  //   IContextManagementTest(_accessControlManager).updateContext(signature, rc, ruc);
  // }

  // function reInitializeWithInvalidRealm(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: _domainName,
  //     version: _domainVersion,
  //     realm: keccak256(abi.encodePacked("LIVELY_REALM")),
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestUpdateContext[] memory ruc = new IContextManagementTest.RequestUpdateContext[](2);
  //   ruc[0].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   ruc[0].updateStatus = IContextManagementTest.UpdateContextStatus.DISABLE;
  //   ruc[0].funcSelectors = new bytes4[](1);
  //   ruc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

  //   ruc[1].role = LIVELY_SYSTEM_ADMIN_ROLE;
  //   ruc[1].updateStatus = IContextManagementTest.UpdateContextStatus.ENABLE;
  //   ruc[1].funcSelectors = new bytes4[](1);
  //   ruc[1].funcSelectors[0] = this.upgradeToAndCall.selector;

  //   IContextManagementTest(_accessControlManager).updateContext(signature, rc, ruc);
  // }

  // function reInitializeWithInvalidRole(bytes memory signature) public onlyLocalAdmin reinitializer(2) {
  //   IContextManagementTest.RequestContext memory rc = IContextManagementTest.RequestContext({
  //     name: _domainName,
  //     version: _domainVersion,
  //     realm: _domainRealm,
  //     contractId: address(this),
  //     status: true
  //   });

  //   IContextManagementTest.RequestUpdateContext[] memory rrc = new IContextManagementTest.RequestUpdateContext[](1);
  //   rrc[0].role = keccak256(abi.encodePacked("LIVELY_WORLD_ADMIN"));
  //   rrc[0].updateStatus = IContextManagementTest.UpdateContextStatus.DISABLE;
  //   rrc[0].funcSelectors = new bytes4[](1);
  //   rrc[0].funcSelectors[0] = IProxy.upgradeTo.selector;

  //   IContextManagementTest(_accessControlManager).updateContext(signature, rc, rrc);
  // }

  // function upgradeToTesterRole(address newImplementation) external virtual onlyProxy {
  //   require(!_isSafeMode, "Rejected");
  //   require(_isUpgradable, "Upgrade Rejected");
  //   require(_hasPermission(this.upgradeToTesterRole.selector), "upgradeToTesterRole Forbidden");
  //   emit UpgradeToTester(msg.sender, newImplementation);
  // }

  // function upgradeToAnonymousRole(address newImplementation) external virtual onlyProxy {
  //   require(!_isSafeMode, "Rejected");
  //   require(_isUpgradable, "Upgrade Rejected");
  //   require(_hasPermission(this.upgradeToAnonymousRole.selector), "upgradeToAnonymousRole Forbidden");
  //   emit UpgradeToAnonymous(msg.sender, newImplementation);
  // }

  // function upgradeToAndCall(address newImplementation, bytes memory data) external payable virtual onlyProxy {
  //   _authorizeUpgrade(newImplementation);
  //   _upgradeToAndCallUUPS(newImplementation, data, true);
  // }
}
