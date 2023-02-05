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
    bytes32 profileId;
    ProfileMemberRegisterDataRequest[] members;
  }

  struct ProfileMemberRegisterDataRequest {        
    bytes32 adminId;
    bytes32 roleId;
    int24 typeLimit;
    int24 callLimit;
    address account;
    ProfileRegisterLimit registerLimit;
  }

  struct ProfileMemberUpdateLimitRequest {
    bytes32 profileId;
    ProfileMemberLimitRequest[] limits;
  }

  struct ProfileMemberLimitRequest {
    bytes32 memberId;
    uint16 limit;
  }

  struct ProfileMemberUpdateRegisterLimitRequest {
    bytes32 profileId;
    ProfileMemberRegisterLimitRequest[] registerLimits;
  }

  struct ProfileMemberRegisterLimitRequest {
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
    address account,    
    bytes32 roleId,
    bytes32 adminId 
  );

  event ProfileMemberRoleGranted(address indexed sender, bytes32 indexed profileId, bytes32 indexed roleId, bytes32 memberId, bytes32 typeId);

  // event ProfileMemberDeleted(address indexed sender, bytes32 indexed memberId, address indexed account);

  event ProfileMemberTypeLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, uint16 typeLimit);

  event ProfileMemberRegisterLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, ProfileRegisterLimit registerLimit);

  event ProfileMemberCallLimitUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, uint16 callLimit);

  event ProfileMemberAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, bytes32 adminId);

  event ProfileMemberActivityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, ActivityStatus acstat);

  event ProfileMemberAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed memberId, AlterabilityStatus alstat);

  function profileMemberRegister(ProfileMemberRegisterRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateTypeLimit(ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateRegisterLimit(ProfileMemberUpdateRegisterLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateCallLimit(ProfileMemberUpdateLimitRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateActivityStatus(ProfileUpdateActivityRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateAlterabilityStatus(ProfileUpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileMemberUpdateAdmin(ProfileUpdateAdminRequest[] calldata requests) external returns (bool);

  function profileMemberCheckId(bytes32 profileId, bytes32 memberId) external view returns (bool);

  function profileMemberCheckAccount(bytes32 profileId, address account) external view returns (bool);

  function profileMemberCheckAdmin(bytes32 profileId, bytes32 memberId, address account) external view returns (bool);

  function profileMemberHasType(bytes32 profileId, bytes32 memberId, bytes32 typeId) external view returns (bool);

  function profileMemberGetTypes(bytes32 profileId, bytes32 memberId) external view returns (bytes32[] memory);

  function profileMemberGetInfo(bytes32 profileId, bytes32 memberId) external view returns (ProfileMemberInfo memory);
}