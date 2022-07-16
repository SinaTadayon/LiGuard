// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import "./IAccessControl.sol";
import "./AccessControlStorage.sol";
import "./IGroupManagement.sol";
import "./IRealmManagement.sol";
import "./IRoleManagement.sol";
import "./IContextManagement.sol";
import "../lib/struct/LEnumerableSet.sol";
import "../lib/struct/LEnumerableMap.sol";
import "../lib/acl/LContextManagement.sol";
import "../lib/acl/LRoleManagement.sol";
import "../lib/acl/LGroupManagement.sol";
import "../lib/acl/LRealmManagement.sol";
import "../lib/acl/LAccessControl.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

// import "hardhat/console.sol";

contract AccessControlManager is
    AccessControlStorage,
    BaseUUPSProxy,
    IContextManagement,
    IAccessControl,
    IGroupManagement,
    IRealmManagement,
    IRoleManagement
{
    using LEnumerableSet for LEnumerableSet.AddressSet;
    using LEnumerableSet for LEnumerableSet.Bytes32Set;
    using LEnumerableMap for LEnumerableMap.Bytes32ToBytes32Map;
    using LEnumerableMap for LEnumerableMap.AddressToUintMap;

    constructor() {}

    function initialize(
        string calldata domainName,
        string calldata domainVersion,
        string calldata domainRealm,
        address accessControlManager
    ) public onlyAdmin initializer {
        require(
            LAccessControl.LIB_NAME == ACCESS_CONTROL_NAME && LAccessControl.LIB_VERSION == ACCESS_CONTROL_VERSION,
            "ACL Invalid"
        );
        require(
            LContextManagement.LIB_NAME == CONTEXT_MANAGEMENT_NAME &&
                LContextManagement.LIB_VERSION == CONTEXT_MANAGEMENT_VERSION,
            "CML Invalid"
        );
        require(
            LRoleManagement.LIB_NAME == ROLE_MANAGEMENT_NAME && LRoleManagement.LIB_VERSION == ROLE_MANAGEMENT_VERSION,
            "RML Invalid"
        );
        require(
            LGroupManagement.LIB_NAME == GROUP_MANAGEMENT_NAME &&
                LGroupManagement.LIB_VERSION == GROUP_MANAGEMENT_VERSION,
            "GML Invalid"
        );
        require(
            LRealmManagement.LIB_NAME == REALM_MANAGEMENT_NAME &&
                LRealmManagement.LIB_VERSION == REALM_MANAGEMENT_VERSION,
            "REML Invalid"
        );

        bytes32 realm = keccak256(abi.encodePacked(domainRealm));
        __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
        LAccessControl.initializeContext(_dataMaps);
        emit Initialized(
            _msgSender(),
            address(this),
            _implementation(),
            _domainName,
            _domainVersion,
            realm,
            getInitializedCount()
        );
    }

    function contractRegisteration() external onlyProxy onlyAdmin returns (bytes32) {
        require(!_isSafeMode, "SafeMode: Call Rejected");
        RequestContext[] memory rc = new RequestContext[](1);
        rc[0] = LAccessControl.createRequestContext();
        return LContextManagement.registerContext(_dataMaps, address(this), _domainRealm, rc);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return
            interfaceId == type(IAccessControl).interfaceId ||
            interfaceId == type(IContextManagement).interfaceId ||
            interfaceId == type(IRoleManagement).interfaceId ||
            interfaceId == type(IGroupManagement).interfaceId ||
            interfaceId == type(IRealmManagement).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function hasAccess(
        bytes32 context,
        address account,
        bytes4 signature
    ) external view returns (bool) {
        return LAccessControl.hasAccess(_dataMaps, context, account, signature);
    }

    function hasSystemAdminRole(address account) external view returns (bool) {
        return LAccessControl.hasSystemAdminRole(_dataMaps, account);
    }

    function hasLivelyAdminRole(address account) external view returns (bool) {
        return LAccessControl.hasLivelyAdminRole(_dataMaps, account);
    }

    function hasLivelyGroup(bytes32 role) external view returns (bool) {
        return LAccessControl.hasLivelyGroup(_dataMaps, role);
    }

    function hasLivelyRealm(bytes32 context) external view returns (bool) {
        return LAccessControl.hasLivelyRealm(_dataMaps, context);
    }

    function isSafeMode(bytes32 context) external view returns (bool) {
        return LAccessControl.isSafeMode(_dataMaps, context);
    }

    function isUpgradable(bytes32 context) external view returns (bool) {
        return LAccessControl.isUpgradable(_dataMaps, context);
    }

    // TODO hasPermission call this  function by SYSTEM_ADMIN
    function registerContext(
        address newContract,
        bytes32 realm,
        RequestContext[] calldata rc
    ) external returns (bytes32) {
        bytes32 context = LContextManagement.registerContext(_dataMaps, newContract, realm, rc);
        emit ContextRegistered(context, newContract, msg.sender, realm);
        return context;
    }

    // TODO hasPermission call this  function by SYSTEM_ADMIN
    function updateContext(bytes32 ctx, RequestContext[] calldata rc) external returns (address) {
        (address scma, bytes32 realm) = LContextManagement.updateContext(_dataMaps, ctx, rc);
        emit ContextUpdated(ctx, scma, msg.sender, realm);
        return scma;
    }

    function grantContextRole(
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bool) {
        bytes32 realm = LContextManagement.grantContextRole(_dataMaps, ctx, functionSelector, role);
        emit ContextRoleGranted(ctx, role, msg.sender, functionSelector, realm);
        return true;
    }

    function revokeContextRole(
        bytes32 ctx,
        bytes4 functionSelector,
        bytes32 role
    ) external returns (bool) {
        bytes32 realm = LContextManagement.revokeContextRole(_dataMaps, ctx, functionSelector, role);
        emit ContextRoleRevoked(ctx, role, msg.sender, functionSelector, realm);
        return true;
    }

    function setContextSafeMode(bytes32 ctx, bool state) external returns (bool) {
        return LContextManagement.setContextSafeMode(_dataMaps, ctx, state);
    }

    function setContextRealm(bytes32 ctx, bytes32 realm) external returns (bool) {
        (bool success, bytes32 oldRealm) = LContextManagement.setContextRealm(_dataMaps, ctx, realm);
        emit ContextRealmChanged(ctx, _msgSender(), realm, oldRealm);
        return success;
    }

    function setContextUpgradeState(bytes32 ctx, bool state) external returns (bool) {
        return LContextManagement.setContextUpgradeState(_dataMaps, ctx, state);
    }

    function hasContextRole(
        bytes32 ctx,
        bytes32 role,
        bytes4 functionSelector
    ) external view returns (bool) {
        return LContextManagement.hasContextRole(_dataMaps, ctx, role, functionSelector);
    }

    function getContextInfo(bytes32 ctx) external view returns (ResponseContext memory) {
        return LContextManagement.getContextInfo(_dataMaps, ctx);
    }

    function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory) {
        return LContextManagement.getContextFuncs(_dataMaps, ctx);
    }

    function registerGroup(string calldata name, bool status) external returns (bytes32) {
        bytes32 group = LGroupManagement.registerGroup(_dataMaps, name, status);
        emit GroupRegistered(group, _msgSender(), name, status);
        return group;
    }

    function setGroupStat(bytes32 group, bool status) external returns (bool) {
        emit GroupStatChanged(group, _msgSender(), status);
        return LGroupManagement.setGroupStat(_dataMaps, group, status);
    }

    function hasGroupRole(bytes32 group, bytes32 role) external view returns (bool) {
        return LGroupManagement.hasGroupRole(_dataMaps, group, role);
    }

    function getGroup(bytes32 group) external view returns (string memory, bool) {
        return LGroupManagement.getGroup(_dataMaps, group);
    }

    function getGroupRoles(bytes32 group) external view returns (bytes32[] memory) {
        return LGroupManagement.getGroupRoles(_dataMaps, group);
    }

    function registerRealm(
        string calldata name,
        bool status,
        bool isUpgradable
    ) external returns (bytes32) {
        bytes32 realm = LRealmManagement.registerRealm(_dataMaps, name, status, isUpgradable);
        emit RealmRegistered(realm, _msgSender(), name, status, isUpgradable);
        return realm;
    }

    function setRealmStat(bytes32 realm, bool status) external returns (bool) {
        emit RealmStatChanged(realm, _msgSender(), status);
        return LRealmManagement.setRealmStat(_dataMaps, realm, status);
    }

    function setRealmUpgradeStat(bytes32 realm, bool status) external returns (bool) {
        emit RealmUpgradeStatChanged(realm, _msgSender(), status);
        return LRealmManagement.setRealmUpgradeStat(_dataMaps, realm, status);
    }

    function hasRealmContext(bytes32 realm, bytes32 context) external view returns (bool) {
        return LRealmManagement.hasRealmContext(_dataMaps, realm, context);
    }

    function getRealm(bytes32 realm)
        external
        view
        returns (
            string memory,
            bool,
            bool
        )
    {
        return LRealmManagement.getRealm(_dataMaps, realm);
    }

    function getRealmContexts(bytes32 realm) external view returns (bytes32[] memory) {
        return LRealmManagement.getRealmContexts(_dataMaps, realm);
    }

    function grantRoleAccount(bytes32 role, address account) external returns (bool) {
        emit RoleAccountGranted(role, account, _msgSender());
        return LRoleManagement.grantRoleAccount(_dataMaps, role, account);
    }

    function revokeRoleAccount(bytes32 role, address account) external returns (bool) {
        emit RoleAccountRevoked(role, account, _msgSender());
        return LRoleManagement.revokeRoleAccount(_dataMaps, role, account);
    }

    function registerRole(
        string calldata name,
        bytes32 group,
        bool status
    ) external returns (bytes32) {
        bytes32 role = LRoleManagement.registerRole(_dataMaps, name, group, status);
        emit RoleRegistered(role, name, _msgSender(), group, status);
        return role;
    }

    function setRoleStat(bytes32 role, bool status) external returns (bool) {
        (bool success, bytes32 group) = LRoleManagement.setRoleStat(_dataMaps, role, status);
        emit RoleStatChanged(role, _msgSender(), group, status);
        return success;
    }

    function setRoleGroup(bytes32 role, bytes32 group) external returns (bool) {
        (bool success, bytes32 oldGroup) = LRoleManagement.setRoleGroup(_dataMaps, role, group);
        emit RoleGroupChanged(role, _msgSender(), group, oldGroup);
        return success;
    }

    function getRole(bytes32 role)
        external
        view
        returns (
            string memory,
            bytes32,
            bool
        )
    {
        return LRoleManagement.getRole(_dataMaps, role);
    }

    function getRoleAccounts(bytes32 role) external view returns (address[] memory) {
        return LRoleManagement.getRoleAccounts(_dataMaps, role);
    }

    function hasAccountRole(bytes32 role, address account) external view returns (bool) {
        return LRoleManagement.hasAccountRole(_dataMaps, role, account);
    }
}
