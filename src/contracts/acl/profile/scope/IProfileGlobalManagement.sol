// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../../IACLCommons.sol";

interface IProfileGlobalManagement is IACLCommons {
 
  struct ProfileGlobalInfo {
    bytes32 id;
    bytes32 adminId;
    uint16 domainLimit;
    uint16 domainCount;
    uint32 referredByAgent;
    ScopeType stype;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfileGlobalRegistered(address indexed sender, bytes32 indexed profileId, bytes32 indexed globalId, bytes32 adminId);

  event ProfileGlobalAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed globalId, bytes32 adminId);
  
  event ProfileGlobalDomainLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed globalId, uint16 domainLimit);  
  
  event ProfileGlobalActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed globalId, ActivityStatus acstat);
  
  event ProfileGlobalAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed globalId, AlterabilityStatus alstat);

  function profileGlobalUpdateActivityStatus(bytes32 profileId, ActivityStatus acstat) external returns (bool);

  function profileGlobalUpdateAlterabilityStatus(bytes32 profileId, AlterabilityStatus alstat) external returns (bool);

  function profileGlobalUpdateAdmin(bytes32 profileId, bytes32 adminId) external returns (bool);

  function profileGlobalUpdateDomainLimit(bytes32 profileId, uint16 domainLimit) external returns (bool);

  function profileGlobalCheckAdmin(bytes32 profileId, address account) external view returns (bool);

  function profileGlobalGetDomains(bytes32 profileId) external view returns (bytes32[] memory);

  function profileGlobalGetInfo(bytes32 profileId) external view returns (ProfileGlobalInfo memory);

}