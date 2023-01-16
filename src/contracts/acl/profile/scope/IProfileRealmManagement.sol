// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IProfileRealmManagement is IACLCommons {

  struct ProfileRealmRegisterRequest {
    bytes32 profileId;
    bytes32 domainId;
    bytes32 adminId;
    // uint32 contextLimit;
    // uint32 agentLimit;
    // ActivityStatus acstat;
    // AlterabilityStatus alstat;
    string name; 
  }

  struct ProfileRealmUpdateContextLimitRequest {
    bytes32 profileId;
    bytes32 realmId;
    uint32 contextLimit;
  }

  struct ProfileRealmInfo {
    bytes32 domainId;
    bytes32 adminId;
    uint32 contextLimit;
    uint32 contextCount;
    // uint32 agentLimit;
    uint32 referredByAgent;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    string name;    
  }

  event ProfileRealmRegistered(
    address indexed sender, 
    bytes32 indexed profileId, 
    bytes32 indexed realmId, 
    bytes32 domainId,
    bytes32 adminId 
  );
  
  event ProfileRealmAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, bytes32 adminId);
  
  event ProfileRealmContextLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, uint32 contextLimit);
  
  event ProfileRealmActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, ActivityStatus acstat);
  
  event ProfileRealmAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, AlterabilityStatus alstat);
  // event RealmAgentLimitUpdated(address indexed sender, bytes32 indexed realmId, uint32 agentLimit);

  function profileRealmRegister(ProfileRealmRegisterRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateContextLimit(ProfileRealmUpdateContextLimitRequest[] calldata requests) external returns (bool);
  // function profileRealmUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);

  function profileRealmCheckId(bytes32 profileId, bytes32 realmId) external view returns (bool);

  function profileRealmCheckName(bytes32 profileId, string calldata realmName) external view returns (bool);

  function profileRealmCheckAdmin(bytes32 profileId, bytes32 contextId, address account) external view returns (bool);

  function profileRealmHasFunction(bytes32 profileId, bytes32 realmId, bytes32 functionId) external view returns (bool);

  function profileRealmHasContext(bytes32 profileId, bytes32 realmId, bytes32 contextId) external view returns (bool);

  function profileRealmGetContexts(bytes32 profileId, bytes32 realmId) external view returns (bytes32[] memory);

  function profileRealmGetInfo(bytes32 profileId, bytes32 realmId) external view returns (ProfileRealmInfo memory);
}
