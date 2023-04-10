// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../IACLCommonsTest.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IProfileRealmManagementTest is IACLCommonsTest {
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

  event ProfileRealmContextMoved(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    bytes32 contextId,
    bytes32 newRealmId
  );

  event ProfileRealmAdminUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    bytes32 adminId
  );

  event ProfileRealmContextLimitUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    uint32 contextLimit
  );

  event ProfileRealmActivityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    ActivityStatus acstat
  );

  event ProfileRealmAlterabilityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    AlterabilityStatus alstat
  );

  event ProfileRealmRemoved(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed realmId,
    bool isSoftDeleted
  );

  function profileRealmRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmRegisterRequest[] calldata requests
  ) external returns (bool);

  function profileRealmUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool);

  function profileRealmMoveContext(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmMoveContextRequest[] calldata requests
  ) external returns (bool);

  function profileRealmUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool);

  function profileRealmUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function profileRealmUpdateContextLimit(
    ProfileMemberSignature calldata memberSign,
    ProfileRealmUpdateContextLimitRequest[] calldata requests
  ) external returns (bool);

  function profileRealmRemove(ProfileMemberSignature calldata memberSign, bytes32[] calldata realms)
    external
    returns (bool);

  function profileRealmCheckId(bytes32 profileId, bytes32 realmId) external view returns (bool);

  function profileRealmCheckName(bytes32 profileId, string calldata realmName) external view returns (bool);

  function profileRealmCheckAdmin(
    bytes32 profileId,
    bytes32 realmId,
    address account
  ) external view returns (bool);

  function profileRealmHasFunction(
    bytes32 profileId,
    bytes32 realmId,
    bytes32 functionId
  ) external view returns (bool);

  function profileRealmHasContext(
    bytes32 profileId,
    bytes32 realmId,
    bytes32 contextId
  ) external view returns (bool);

  function profileRealmGetContexts(bytes32 profileId, bytes32 realmId) external view returns (bytes32[] memory);

  function profileRealmGetInfo(bytes32 profileId, bytes32 realmId) external view returns (ProfileRealmInfo memory);
}
