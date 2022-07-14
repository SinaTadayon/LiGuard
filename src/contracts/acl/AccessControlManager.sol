// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./IAccessControl.sol";
import "./AccessControlStorage.sol";
import "./IGroupManagement.sol";
import "./IRealmManagement.sol";
import "./IRoleManagement.sol";
import "./IContextManagement.sol";
import "../lib/struct/EnumerableSet.sol";
import "../lib/struct/EnumerableMap.sol";
import "../lib/acl/ContextManagementLib.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";
// import "hardhat/console.sol";

contract AccessControlManager is AccessControlStorage, BaseUUPSProxy, IContextManagement, IAccessControl, IGroupManagement, IRealmManagement,IRoleManagement {

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using EnumerableMap for EnumerableMap.Bytes32ToBytes32Map;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    constructor() {}

    function initialize(string calldata domainName, string calldata domainVersion, string calldata domainRealm, address accessControlManager) public onlyAdmin initializer {
        bytes32 realm = keccak256(abi.encodePacked(domainRealm));
        __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
        emit Initialized(_msgSender(), address(this), _implementation(), _domainName, _domainVersion, realm, getInitializedCount());
    }

    // TODO should be complete.
    function contractRegisteration() external onlyProxy onlyAdmin returns (bool) {}
    //     // RequestContext memory reqCtx = RequestContext({
    //     //     realm: keccak256(abi.encodePacked(_domainRealm)),
    //     //     smca: address(this)
    //     // });

    //     RequestContext memory rc;
    //     rc.role = LIVELY_ADMIN_ROLE;
    //     rc.isEnabled = true;
    //     rc.funcSelectors = new bytes4[](10);
    //     rc.funcSelectors[0] = this.setUpgradability.selector;
    //     rc.funcSelectors[1] = this.setActivity.selector;
    //     rc.funcSelectors[2] = this.setAdmin.selector;
    //     rc.funcSelectors[3] = this.upgradeTo.selector;
    //     rc.funcSelectors[4] = this.initialize.selector;
    // }

    // TODO hasPermission call this  function by SYSTEM_ADMIN
    function registerContext(address newContract, bytes32 realm, RequestContext[] calldata rc) external returns (bytes32) {
        bytes32 context = ContextManagementLib.registerContext(_dataMaps, newContract, realm, rc);
        emit ContextRegistered(context, newContract, msg.sender, realm);
        return context;
    }

    // TODO hasPermission call this  function by SYSTEM_ADMIN
    function updateContext(bytes32 ctx, RequestContext[] calldata rc) external returns (address) {
        (address scma, bytes32 realm) = ContextManagementLib.updateContext(_dataMaps, ctx, rc);
        emit ContextUpdated(ctx, scma, msg.sender, realm);
        return scma;
    }

    function grantContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool) {
        bytes32 realm = ContextManagementLib.grantContextRole(_dataMaps, ctx, functionSelector, role);
        emit ContextRoleGranted(ctx, role, msg.sender, functionSelector, realm);
        return true;
    }

    function revokeContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool) {
        bytes32 realm = ContextManagementLib.revokeContextRole(_dataMaps, ctx, functionSelector, role);
        emit ContextRoleRevoked(ctx, role, msg.sender, functionSelector, realm);
        return true;
    }

    function enableContext(bytes32 ctx) external returns (bool) {
        return ContextManagementLib.enableContext(_dataMaps, ctx);
    }

    function disableContext(bytes32 ctx) external returns (bool) {
        return ContextManagementLib.disableContext(_dataMaps, ctx);
    }

    function enableUpgradeContext(bytes32 ctx) external returns (bool) {
        return ContextManagementLib.enableUpgradeContext(_dataMaps, ctx);
    }

    function hasContextRole(bytes32 ctx, bytes32 role, bytes4 functionSelector) external view returns (bool) {
        return ContextManagementLib.hasContextRole(_dataMaps, ctx, role, functionSelector);
    }

    function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory) {
        return ContextManagementLib.getContextInfo(_dataMaps, ctx);
    }

    function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory) {
        return ContextManagementLib.getContextFuncs(_dataMaps, ctx);
    }



    function hasAccess(bytes32 context, address account, bytes4 signature) external view returns (bool) {
        return true;
    }

    function hasSystemAdminRole(address account) external view returns (bool) {}

    function hasLivelyAdminRole(address account) external view returns (bool) {}

    function hasLivelyGroup(bytes32 role) external view returns (bool) {}

    function hasLivelyRealm(bytes32 context) external view returns (bool) {}

    function isEnabled(bytes32 context) external view returns (bool) {}

    function isUpgradeEnabled(bytes32 context) external view returns (bool) {}

      function addGroup(string calldata name, bool isEnabled) external returns (bytes32) {} 

    function grantGroupRole(bytes32 group, bytes32 role) external returns (bool) {} 

    function revokeGroupRole(bytes32 group, bytes32 role) external returns (bool) {}

    function enabledGroup(bytes32 group) external returns (bool) {}

    function disabledGroup(bytes32 group) external returns (bool) {}

    function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool) {}

    function getGroup(bytes32 group) external view returns (string memory, bool) {}

    function getGroupRoles(bytes32 group) external view returns (bytes32[] memory) {}

     function addRealm(string calldata name, bool isEnabled) external returns (bytes32) {}

    function grantRealmContext(bytes32 realm, bytes32 context) external returns (bool) {}

    function revokeRealmContext(bytes32 realm, bytes32 context) external returns (bool) {}

    function enabledRealm(bytes32 realm) external returns (bool) {}

    function disabledRealm(bytes32 realm) external returns (bool) {}

    function enableUpgradeRealm(bytes32 realm) external returns (bool) {}

    function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool) {}

    function getRealm(bytes32 realm) external view returns (string memory, bool) {}

    function getRealmContextes(bytes32 realm) external view returns (bytes32[] memory) {}


    function grantRoleAccount(bytes32 role, address account) external returns (bool) {}

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function revokeRoleAccount(bytes32 role, address account) external returns (bool) {}

    /**
     * 
     */
    function addRole(string calldata name, string calldata group, bool isEnabled) external returns (bytes32) {}

    /**
     * 
     */
    function setEnabledRole(bytes32 role) external returns (bool) {}

    /**
     * 
     */
    function setDisabledRole(bytes32 role) external returns (bool) {}


    function getRole(bytes32 role) external view returns (string memory, string memory, bool) {}

    function getRoleUsers(bytes32 role) external view returns (address[] memory) {}

    function getRoleContextes(bytes32 role) external view returns (bytes32[] memory) {}


    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasAccountRole(bytes32 role, address account) external view returns (bool) {}

}