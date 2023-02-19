// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "../IACLCommons.sol";

interface IGlobalManagement is IACLCommons {
 
  struct GlobalInfo {
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
    
  event GlobalRegistered(address indexed sender, bytes32 indexed globalId, bytes32 indexed adminId);

  event GlobalAdminUpdated(address indexed sender, bytes32 indexed globalId, bytes32 indexed adminId);

  event GlobalDomainLimitUpdated(address indexed sender, bytes32 indexed globalId, uint16 domainLimit);

  event GlobalActivityUpdated(address indexed sender, bytes32 indexed globalId, ActivityStatus acstat);

  event GlobalAlterabilityUpdated(address indexed sender, bytes32 indexed globalId, AlterabilityStatus alstat);

  function globalUpdateActivityStatus(MemberSignature calldata memberSign, ActivityStatus acstat) external returns (ActivityStatus);

  function globalUpdateAlterabilityStatus(MemberSignature calldata memberSign, AlterabilityStatus alstat) external returns (AlterabilityStatus);

  function globalUpdateAdmin(MemberSignature calldata memberSign, bytes32 newAdminId) external returns (bool);

  function globalUpdateDomainLimit(MemberSignature calldata memberSign, uint16 domainLimit) external returns (bool);

  function globalCheckAdmin(address account) external view returns (bool);

  function globalGetDomains() external view returns (bytes32[] memory);

  function globalGetInfo() external view returns (GlobalInfo memory);

}