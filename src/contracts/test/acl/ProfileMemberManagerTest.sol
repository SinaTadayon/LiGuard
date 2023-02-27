// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../../acl/profile/IProfileACL.sol";
import "../../lib/acl/LACLUtils.sol";

contract ProfileMemberManagerTest {
  address private _accessControlManager;

  constructor(address accessControlManager) {
    _accessControlManager = accessControlManager;
  }

  // Note: called by any admin of role
  function profileMemberRegisterTest(bytes32 profileId) external returns (bool) {
    bytes32 functionId = LACLUtils.functionGenerateId(address(this), this.profileMemberRegisterTest.selector);
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);

    IProfileACL.ProfileAuthorizationStatus status = IProfileACL(_accessControlManager).profileHasMemberAccess(
      profileId,
      functionId,
      senderId
    );
    if (status != IProfileACL.ProfileAuthorizationStatus.PERMITTED) LACLUtils.generateProfileAuthorizationError(status);

    return true;
  }
}
