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
    uint64 expiredAt;  
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
    address profileOwner;
    address profileAdmin;
    address profileSystemAdmin;
    bytes32 adminId;
    bytes signature;
  }

  struct ProfileUpdateOwnerAccountRequest {
    bytes32 profileId;
    address owner;
    address newOwner;
  }

  struct ProfileUpdateLimitsRequest {
    bytes32 profileId;
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
  }

  struct ProfileUpdateExpirationRequest {
    bytes32 profileId;
    uint64 expiredAt;
  }

  struct ProfileInfo {
    string name;    
    uint64 expiredAt;
    bytes32 adminId;
    address owner;
    ProfileRegisterLimit registerLimits;
    ProfileLimit limits;
    AgentType adminType;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
  }

  event ProfileRegistered (
    address indexed sender,
    bytes32 indexed profileId,
    address indexed profileOwner,
    address signer,
    address profileAdmin,
    address profileSystemAdmin,
    bytes32 adminId,
    ProfileRegisterLimit registerlimits
  );

  event ProfileAdminUpdated(address indexed sender, bytes32 indexed profileId, bytes32 indexed adminId);

  event ProfileActivityUpdated(address indexed sender, bytes32 indexed profileId, ActivityStatus acstat);

  event ProfileAlterabilityUpdated(address indexed sender, bytes32 indexed profileId, AlterabilityStatus alstat);

  event ProfileLimitsUpdated(address indexed sender, bytes32 indexed profileId, ProfileLimit limit, ProfileRegisterLimit registerLimit);

  event ProfileExpirationUpdated(address indexed sender, bytes32 indexed profileId, uint64 expiredAt);
  
  event ProfileOwnerAccountUpdated(address indexed sender, bytes32 indexed profileId, address indexed owner, address newOwner);

  function profileRegister(ProfileRegisterRequest[] calldata request) external returns (bool);

  function profileUpdateLimits(ProfileUpdateLimitsRequest[] calldata requests) external returns (bool);

  function profileUpdateExpiration(ProfileUpdateExpirationRequest[] calldata requests) external returns (bool);

  function profileUpdateOwnerAccount(ProfileUpdateOwnerAccountRequest[] calldata requests) external returns (bool);

  function profileUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool);

  function profileUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool);

  function profileUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool);

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