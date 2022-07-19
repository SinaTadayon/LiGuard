// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15 < 0.9.0;

import "../../proxy/BaseProxy.sol";
import "./ERC1967UpgradeTest.sol";

contract ERC1967ProxyTest is BaseProxy, ERC1967UpgradeTest {
    /**
     * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
     *
     * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
     * function call, and allows initializing the storage of the proxy like a Solidity constructor.
     */
    constructor(address _logic, bytes memory _data) payable {
        _upgradeToAndCall(_logic, _data, false);
    }

    /**
     * @dev Returns the current implementation address.
     */
    function _implementation() internal view virtual override returns (address impl) {
        return ERC1967UpgradeTest._getImplementation();
    }
}
