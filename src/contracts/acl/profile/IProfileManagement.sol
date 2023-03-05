// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../IACLCommons.sol";

/**
 * @title Profile Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileManagement is IACLCommons {
  struct ProfileRegisterRequest {
    string name;
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
    address profileOwner;
    address profileSystemAdmin;
    bytes32 adminId;
  }

  struct ProfileUpdateOwnerAccountRequest {
    bytes32 profileId;
    address newOwner;
  }

  struct ProfileUpdateLimitsRequest {
    bytes32 profileId;
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
  }

  struct ProfileInfo {
    string name;
    bytes32 adminId;
    address owner;
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfileRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    address indexed profileOwner,
    address profileSystemAdmin,
    bytes32 adminId,
    ProfileRegisterLimit registerlimits,
    ProfileLimit limits
  );

  event ProfileAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed adminId);

  event ProfileActivityUpdated(address indexed sender, bytes32 indexed profileId, ActivityStatus acstat);

  event ProfileAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, AlterabilityStatus alstat);

  event ProfileLimitsUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    ProfileLimit limit,
    ProfileRegisterLimit registerLimit
  );

  event ProfileOwnerAccountUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    address indexed owner,
    address newOwner
  );

  function profileRegister(MemberSignature calldata memberSign, ProfileRegisterRequest[] calldata request)
    external
    returns (bool);

  function profileUpdateLimits(MemberSignature calldata memberSign, ProfileUpdateLimitsRequest[] calldata requests)
    external
    returns (bool);

  function profileUpdateOwnerAccount(
    MemberSignature calldata memberSign,
    ProfileUpdateOwnerAccountRequest[] calldata requests
  ) external returns (bool);

  function profileUpdateActivityStatus(MemberSignature calldata memberSign, UpdateActivityRequest[] calldata requests)
    external
    returns (bool);

  function profileUpdateAlterabilityStatus(
    MemberSignature calldata memberSign,
    UpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function profileUpdateAdmin(MemberSignature calldata memberSign, UpdateAdminRequest[] calldata requests)
    external
    returns (bool);

  function profileCheckId(bytes32 profileId) external view returns (bool);

  function profileCheckName(string calldata name) external view returns (bool);

  function profileCheckOwner(bytes32 profileId, address account) external view returns (bool);

  function profileCheckProfileAdmin(bytes32 profileId, address account) external view returns (bool);

  function profileCheckProfileSystemAdmin(bytes32 profileId, address account) external view returns (bool);

  function profileCheckAdmin(bytes32 profileId, address account) external view returns (bool);

  function profileGetProfileAccount(address account) external view returns (bytes32[] memory);

  function profileGetAdmins(bytes32 profileId) external view returns (bytes32[] memory);

  function profileGetInfo(bytes32 profileId) external view returns (ProfileInfo memory);
}
