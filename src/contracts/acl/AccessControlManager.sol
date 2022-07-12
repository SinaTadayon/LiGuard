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
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";
import "hardhat/console.sol";

contract AccessControlManager is BaseUUPSProxy, AccessControlStorage, IContextManagement, IAccessControl, IGroupManagement, IRealmManagement,IRoleManagement {

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using EnumerableMap for EnumerableMap.Bytes32ToBytes32Map;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    constructor() {
        // _disableInitializers();
    }

    function initialize(string calldata domainName, string calldata domainVersion, string calldata domainRealm, address accessControlManager) public initializer {
        bytes32 realm = keccak256(abi.encodePacked(domainRealm));
        __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
        emit Initialized(_msgSender(), address(this), _implementation(), _domainName, _domainVersion, realm, getInitializedCount());
    }

    // TODO should be complete.
    function contractRegisteration() external onlyProxy onlyAdmin returns (bool) {
        RequestContext memory reqCtx = RequestContext({
            realm: keccak256(abi.encodePacked(_domainRealm)),
            smca: address(this)
        });

        RequestContextResource memory rcr;
        rcr.role = LIVELY_ADMIN_ROLE;
        rcr.funcSelectors = new bytes4[](10);
        rcr.funcSelectors[0] = this.setUpgradability.selector;
        rcr.funcSelectors[1] = this.setActivity.selector;
        rcr.funcSelectors[2] = this.setAdmin.selector;
        rcr.funcSelectors[3] = this.upgradeTo.selector;
        rcr.funcSelectors[4] = this.initialize.selector;
    }

    function registerContext(RequestContext calldata rc, RequestContextResource[] calldata rcr) external returns (bytes32) {
        require(_msgSender() == rc.smca, "Illegal Contract Address");
        require(bytes(_realmMap[rc.realm].name).length != 0, "Realm Not Found");

        bytes32 ctx = ContextUtils.generateCtx(rc.smca);
        require(_ctxMap[ctx].smca == address(0), "Context Already Registered");
        Context storage newContext = _ctxMap[ctx];
        newContext.realm = rc.realm;
        newContext.smca = rc.smca;
        
        for (uint256 i = 0; i < rcr.length; i++) {
            require(bytes(_roleMap[rcr[i].role].name).length != 0, "Role Not Found");
            for (uint256 j = 0; j < rcr[i].funcSelectors.length; j++) {
                newContext.resources[rcr[i].funcSelectors[j]][rcr[i].role] = Status.ENABLED;
                newContext.funcSet.add(ctx); 
            }
        }

        emit ContextRegistered(ctx, rc.smca, _msgSender(), rc.realm);
    }


    function updateContext(RequestContext calldata rc, RequestContextResource[] calldata rcr) external returns (bytes32) {}

    function grantContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool) {}

    function revokeContextRole(bytes32 ctx, bytes4 functionSelector, bytes32 role) external returns (bool) {}

    function enableContext(bytes32 ctx) external returns (bool) {}

    function disableContext(bytes32 ctx) external returns (bool) {}

    function enableUpgradeContext(bytes32 ctx) external returns (bool) {}

    function hasContextRole(bytes32 ctx, bytes32 role, bytes4 functionSelector) external view returns (bool) {}

    function getContext(bytes32 ctx) external view returns (string memory, string memory, bytes32, bool) {}

    function getContextFuncs(bytes32 ctx) external view returns (bytes4[] memory) {}



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