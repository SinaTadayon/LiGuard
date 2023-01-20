// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Profile Context Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileContextManagement is IACLCommons {

  struct ProfileContextRegisterRequest {
    bytes32 profileId;
    ProfileContextRegisterDataRequest[] contexts;
  }

  struct ProfileContextRegisterDataRequest {
    bytes32 realmId;
    bytes32 adminId;
    bytes32 salt;
    string name;
    string version;
    address contractId;
    address subject;
    address deployer;
    bytes signature;
  }

   struct ProfileContextUpdateFunctionLimitRequest {
    bytes32 profileId;
    ProfileContextFunctionLimitRequest[] limits;
  }

  struct ProfileContextFunctionLimitRequest {
    bytes32 contextId;
    uint16 functionLimit;
  }

  struct ProfileContextInfo {
    bytes32 realmId;
    bytes32 adminId;
    string name;
    string version;
    address contractId;
    uint16 functionCount;
    uint16 functionLimit;
    uint32 referredByAgent;
    AgentType adminType;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfileContextRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    address indexed contextId,
    bytes32 realmId,
    bytes32 adminId,
    address contractId,
    address signer,
    address deployer,
    address subject    
  );

  event ProfileContextAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed contextId, bytes32 adminId);
  
  event ProfileContextActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed contextId, ActivityStatus acstat);

  event ProfileContextAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed contextId, AlterabilityStatus alstat);

  event ProfileContextFunctionLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed contextId, uint16 functionLimit);

  function profileContextRegister(ProfileContextRegisterRequest[] calldata requests) external returns (bool);

  function profileContextUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileContextUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileContextUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileContextUpdateFunctionLimit(ProfileContextUpdateFunctionLimitRequest[] calldata requests) external returns (bool);

  function profileContextCheckId(bytes32 profileId, bytes32 contextId) external view returns (bool);

  function profileContextCheckAccount(bytes32 profileId, address contractId) external view returns (bool);

  function profileContextCheckAdmin(bytes32 profileId, bytes32 contextId, address account) external view returns (bool);

  function profileContextHasFunction(bytes32 profileId, bytes32 contextId, bytes32 functionId) external view returns (bool);

  function profileContextHasSelector(bytes32 profileId, address contractId, bytes4 selector) external view returns (bool);

  function profileContextGetFunctions(bytes32 profileId, bytes32 contextId) external view returns (bytes32[] memory);

  function profileContextGetInfo(bytes32 profileId, bytes32 contextId) external view returns (ProfileContextInfo memory);
}
