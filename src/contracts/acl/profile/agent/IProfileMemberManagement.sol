// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Member Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileMemberManagement is IACLCommons {

  struct ProfileMemberRegisterRequest {        
    bytes32 adminId;
    bytes32 roleId;
    int24 typeLimit;
    int24 callLimit;
    address account;
    ProfileRegisterLimit registerLimit;
  }

  struct ProfileMemberUpdateLimitRequest {
    bytes32 memberId;
    uint16 limit;
  }

  struct ProfileMemberUpdateRegisterLimitRequest {
    bytes32 memberId;
    ProfileRegisterLimit registerLimit;
  }

  struct ProfileMemberInfo {
    bytes32 adminId;
    address account;
    uint16 typeLimit;
    uint16 typeCount;
    uint16 callLimit;
    ProfileRegisterLimit registerLimit;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfileMemberRegistered(
    address indexed sender, 
    bytes32 indexed profileId,
    bytes32 indexed memberId, 
    bytes32 roleId,
    bytes32 adminId,
    ProfileRegisterLimit registerLimit 
  );

  event ProfileMemberTypeLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, uint16 typeLimit);

  event ProfileMemberRegisterLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, ProfileRegisterLimit registerLimit);

  event ProfileMemberCallLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, uint16 callLimit);

  event ProfileMemberAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, bytes32 adminId);

  event ProfileMemberActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, ActivityStatus acstat);

  event ProfileMemberAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, AlterabilityStatus alstat);

  function profileMemberRegister(ProfileMemberSignature calldata memberSign, ProfileMemberRegisterRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateTypeLimit(ProfileMemberSignature calldata memberSign, ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateRegisterLimit(ProfileMemberSignature calldata memberSign, ProfileMemberUpdateRegisterLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateCallLimit(ProfileMemberSignature calldata memberSign, ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateActivityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateAlterabilityStatus(ProfileMemberSignature calldata memberSign, ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateAdmin(ProfileMemberSignature calldata memberSign, ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileMemberCheckId(bytes32 profileId, bytes32 memberId) external view returns (bool);

  function profileMemberCheckAccount(bytes32 profileId, address account) external view returns (bool);

  function profileMemberCheckAdmin(bytes32 profileId, bytes32 memberId, address account) external view returns (bool);

  function profileMemberHasType(bytes32 profileId, bytes32 memberId, bytes32 typeId) external view returns (bool);

  function profileMemberGetTypes(bytes32 profileId, bytes32 memberId) external view returns (bytes32[] memory);

  function profileMemberGetInfo(bytes32 profileId, bytes32 memberId) external view returns (ProfileMemberInfo memory);
}