// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../IACLCommons.sol";

/**
 * @title Realm Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

interface IRealmManagement is IACLCommons {
  struct RealmRegisterRequest {
    bytes32 domainId;
    bytes32 adminId;
    int64 contextLimit;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    string name;
  }

  struct RealmMoveContextRequest {
    bytes32 realmId;
    bytes32 targetRealmId;
    bytes32 contextId;
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
    uint32 referredByAgent;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    string name;
  }

  event RealmRegistered(address indexed sender, bytes32 indexed realmId, bytes32 indexed domainId, bytes32 adminId);

  event RealmContextMoved(
    address indexed sender,
    bytes32 indexed realmId,
    bytes32 indexed contextId,
    bytes32 newRealmId
  );

  event RealmAdminUpdated(address indexed sender, bytes32 indexed realmId, bytes32 indexed adminId);

  event RealmContextLimitUpdated(address indexed sender, bytes32 indexed realmId, uint32 contextLimit);

  event RealmActivityUpdated(address indexed sender, bytes32 indexed realmId, ActivityStatus acstat);

  event RealmAlterabilityUpdated(address indexed sender, bytes32 indexed realmId, AlterabilityStatus alstat);

  event RealmRemoved(address indexed sender, bytes32 indexed realmId, bool isSoftDeleted);

  function realmRegister(MemberSignature calldata memberSign, RealmRegisterRequest[] calldata requests)
    external
    returns (bool);

  function realmUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function realmMoveContext(MemberSignature calldata memberSign, RealmMoveContextRequest[] calldata requests)
    external
    returns (bool);

  function realmUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function realmUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function realmUpdateContextLimit(
    MemberSignature calldata memberSign,
    RealmUpdateContextLimitRequest[] calldata requests
  ) external returns (bool);

  function realmRemove(MemberSignature calldata memberSign, bytes32[] calldata realms) external returns (bool);

  function realmCheckId(bytes32 realmId) external view returns (bool);

  function realmCheckName(string calldata realmName) external view returns (bool);

  function realmCheckAdmin(bytes32 realmId, address account) external view returns (bool);

  function realmHasFunction(bytes32 realmId, bytes32 functionId) external view returns (bool);

  function realmHasContext(bytes32 realmId, bytes32 contextId) external view returns (bool);

  function realmGetContexts(bytes32 realmId) external view returns (bytes32[] memory);

  function realmGetInfo(bytes32 realmId) external view returns (RealmInfo memory);
}
