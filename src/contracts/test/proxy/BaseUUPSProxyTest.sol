// SPDX-License-Identifier: MIT
pragma solidity  >= 0.8.15 < 0.9.0;

import "../../proxy/IERC1822.sol";
import "../../proxy/BaseUUPSProxy.sol";

contract BaseUUPSProxyTest is BaseUUPSProxy {

    function initialize(
        string calldata domainName,
        string calldata domainVersion,
        string calldata domainRealm,
        address accessControlManager
    ) public onlyAdmin initializer {
        bytes32 realm = keccak256(abi.encodePacked(domainRealm));
        __BASE_UUPS_init(domainName, domainVersion, realm, accessControlManager);
    }

    function proxiableUUID() external view virtual override notDelegated returns (bytes32) {
        return _IMPLEMENTATION_SLOT;
    }

    function upgradeTo(address newImplementation) external virtual onlyProxy {
        _authorizeUpgrade(newImplementation);
        _upgradeToAndCallUUPS(newImplementation, new bytes(0), false);
    }

    function upgradeToAndCall(address newImplementation, bytes memory data) external payable virtual onlyProxy {
        _authorizeUpgrade(newImplementation);
        _upgradeToAndCallUUPS(newImplementation, data, true);
    }

    function _authorizeUpgrade(address newImplementation) internal virtual override {}
}
