// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IRealmManagement is IACLCommons{

  struct RealmRegisterRequest {
    bytes32 domainId;
    bytes32 adminId;
    uint32 contextLimit;
    uint32 agentLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name; 
  }

  struct RealmUpdateContextLimitRequest {
    bytes32 realmId;
    uint32 contextLimit;
  }

  struct RealmInfo {
    bytes32 domainId;
    bytes32 adminId;
    uint32 contextLimit;
    uint32 contextCount;
    uint32 agentLimit;
    uint32 referredByAgent;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    string name;    
  }

  event RealmRegistered(
    address indexed sender, 
    bytes32 indexed realmId, 
    bytes32 indexed domainId,
    bytes32 adminId 
  );
  
  event RealmAdminUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed adminId);

  event RealmContextLimitUpdated(address indexed sender, bytes32 indexed realmId, uint32 contextLimit);

  event RealmActivityUpdated(address indexed sender, bytes32 indexed realmId, ActivityStatus acstat);

  event RealmAlterabilityUpdated(address indexed sender, bytes32 indexed realmId, AlterabilityStatus alstat);

  event RealmAgentLimitUpdated(address indexed sender, bytes32 indexed realmId, uint32 agentLimit);

  function realmRegister(RealmRegisterRequest[] calldata requests) external returns (bool);

  function realmUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

  function realmUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function realmUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function realmUpdateContextLimit(RealmUpdateContextLimitRequest[] calldata requests) external returns (bool);

  function realmUpdateAgentLimit(ScopeUpdateAgentLimitRequest[] calldata requests) external returns (bool);

  function realmCheckId(bytes32 realmId) external view returns (bool);

  function realmCheckName(string calldata realmName) external view returns (bool);

  function realmCheckAdmin(bytes32 contextId, address account) external view returns (bool);

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool);

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool);

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory);

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory);



}
