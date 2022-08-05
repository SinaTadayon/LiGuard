// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.15 < 0.9.0;

import "../../token/lively/IERC20.sol";
import "../../token/lively/IERC20Extra.sol";
import "../../token/lively/IPausable.sol";
import "../../proxy/IProxy.sol";
import "../../acl/IContextManagement.sol";
import "../../acl/IAccessControl.sol";



library LTokenERC20 {
  bytes32 public constant LIB_NAME = keccak256(abi.encodePacked("LTokenERC20"));
  bytes32 public constant LIB_VERSION = keccak256(abi.encodePacked("1.0.0"));

  function createRequestContext(bytes32 domainName, bytes32 domainVersion, bytes32 realm) external view returns (IContextManagement.RequestContext memory, IContextManagement.RequestRegisterContext[] memory) {
    IContextManagement.RequestRegisterContext[] memory rrc = new IContextManagement.RequestRegisterContext[](3);
    rrc[0].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAnonymousRole();
    rrc[0].isEnabled = true;
    rrc[0].funcSelectors = new bytes4[](2);
    rrc[0].funcSelectors[0] = IERC20.transfer.selector;
    rrc[0].funcSelectors[1] = IERC20.approve.selector;
    
    rrc[1].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelyAdminRole();
    rrc[1].isEnabled = true;
    rrc[1].funcSelectors = new bytes4[](10);
    rrc[1].funcSelectors[0] = IProxy.setUpgradeStatus.selector;
    rrc[1].funcSelectors[1] = IERC20Extra.burn.selector;
    rrc[1].funcSelectors[2] = IERC20Extra.mint.selector;
    rrc[1].funcSelectors[3] = IERC20Extra.updateTaxRate.selector;
    rrc[1].funcSelectors[4] = IERC20Extra.updateTaxWhitelist.selector;
    rrc[1].funcSelectors[5] = IPausable.pause.selector;
    rrc[1].funcSelectors[6] = IPausable.unpause.selector;
    rrc[1].funcSelectors[7] = IPausable.pauseAll.selector;
    rrc[1].funcSelectors[8] = IPausable.unpauseAll.selector;
    rrc[1].funcSelectors[9] = bytes4(keccak256("withdrawBalance(address)"));
            
    rrc[2].role = IAccessControl(IProxy(address(this)).accessControlManager()).livelySystemAdminRole();
    rrc[2].isEnabled = true;
    rrc[2].funcSelectors = new bytes4[](3);
    rrc[2].funcSelectors[0] = IProxy.setLocalAdmin.selector;
    rrc[2].funcSelectors[1] = IProxy.setSafeMode.selector;
    rrc[2].funcSelectors[2] = IProxy.upgradeTo.selector;    

    IContextManagement.RequestContext memory rc = IContextManagement.RequestContext({
        name: domainName,
        version: domainVersion,
        realm: realm, 
        smca: address(this),
        status:true
    });

    return (rc, rrc);
  }
}