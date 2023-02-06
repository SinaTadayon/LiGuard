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
    bytes32 domainId;
    bytes32 adminId;
    int64 contextLimit;
    string name; 
  }

  struct ProfileRealmMoveContextRequest {
    bytes32 realmId;
    bytes32 targetRealmId;
    bytes32 contextId;
  }

  struct ProfileRealmUpdateContextLimitRequest {
    bytes32 realmId;
    uint32 contextLimit;
  }

  struct ProfileRealmInfo {
    bytes32 domainId;
    bytes32 adminId;
    uint32 contextLimit;
    uint32 contextCount;
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

  event ProfileRealmContextMoved(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, bytes32 contextId, bytes32 newRealmId);

  event ProfileRealmAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, bytes32 adminId);
  
  event ProfileRealmContextLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, uint32 contextLimit);
  
  event ProfileRealmActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, ActivityStatus acstat);
  
  event ProfileRealmAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed realmId, AlterabilityStatus alstat);

  function profileRealmRegister(bytes32 profileId, ProfileRealmRegisterRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateAdmin(bytes32 profileId, ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileRealmMoveContext(bytes32 profileId, ProfileRealmMoveContextRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateActivityStatus(bytes32 profileId, ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateAlterabilityStatus(bytes32 profileId, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileRealmUpdateContextLimit(bytes32 profileId, ProfileRealmUpdateContextLimitRequest[] calldata requests) external returns (bool);

  function profileRealmCheckId(bytes32 profileId, bytes32 realmId) external view returns (bool);

  function profileRealmCheckName(bytes32 profileId, string calldata realmName) external view returns (bool);

  function profileRealmCheckAdmin(bytes32 profileId, bytes32 realmId, address account) external view returns (bool);

  function profileRealmHasFunction(bytes32 profileId, bytes32 realmId, bytes32 functionId) external view returns (bool);

  function profileRealmHasContext(bytes32 profileId, bytes32 realmId, bytes32 contextId) external view returns (bool);

  function profileRealmGetContexts(bytes32 profileId, bytes32 realmId) external view returns (bytes32[] memory);

  function profileRealmGetInfo(bytes32 profileId, bytes32 realmId) external view returns (ProfileRealmInfo memory);
}
