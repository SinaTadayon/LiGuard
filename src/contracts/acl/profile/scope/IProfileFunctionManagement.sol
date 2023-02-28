// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../IACLCommons.sol";

/**
 * @title Profile Function Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
interface IProfileFunctionManagement is IACLCommons {
  struct ProfileFunctionRegisterRequest {
    bytes signature;
    bytes32 realmId;
    bytes32 salt;
    string name;
    string version;
    address subject;
    address deployer;
    address contractId;
    ProfileFunctionRequest[] functions;
  }

  struct ProfileFunctionRequest {
    bytes32 adminId;
    bytes32 agentId;
    bytes4 selector;
    uint8 policyCode;
  }

  struct ProfileFunctionUpdatePolicyRequest {
    bytes32 functionId;
    uint8 policyCode;
  }

  struct ProfileFunctionUpdateAgentRequest {
    bytes32 functionId;
    bytes32 agentId;
  }

  struct ProfileFunctionRemoveRequest {
    bytes32 functionId;
    bool isSoftDelete;
  }

  struct ProfileFunctionInfo {
    bytes32 adminId;
    bytes32 agentId;
    bytes32 contextId;
    bytes4 selector;
    uint32 referredByAgent;
    ScopeType stype;
    ActivityStatus acstat;
    AlterabilityStatus alstat;
    AgentType adminType;
    AgentType agentType;
    uint8 policyCode;
  }

  event ProfileFunctionRegistered(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    bytes32 contextId,
    bytes32 adminId,
    bytes32 agentId
  );

  event ProfileFunctionAdminUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    bytes32 adminId
  );

  event ProfileFunctionAgentUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    bytes32 agentId
  );

  event ProfileFunctionActivityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    ActivityStatus acstat
  );

  event ProfileFunctionAlterabilityUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    AlterabilityStatus alstat
  );

  event ProfileFunctionPolicyUpdated(
    address indexed sender,
    bytes32 indexed profileId,
    bytes32 indexed functionId,
    uint8 policyCode
  );

  event ProfileFunctionRemoved(address indexed sender, bytes32 indexed profileId, bytes32 indexed functionId, bool isSoftDeleted);

  function profileFunctionRegister(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionRegisterRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionUpdateAdmin(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAdminRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionUpdateAgent(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionUpdateAgentRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionUpdateActivityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateActivityRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionUpdateAlterabilityStatus(
    ProfileMemberSignature calldata memberSign,
    ProfileUpdateAlterabilityRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionUpdatePolicyCode(
    ProfileMemberSignature calldata memberSign,
    ProfileFunctionUpdatePolicyRequest[] calldata requests
  ) external returns (bool);

  function profileFunctionRemove(ProfileMemberSignature calldata memberSign, ProfileFunctionRemoveRequest[] calldata requests)
    external
    returns (bool);

  function profileFunctionCheckId(bytes32 profileId, bytes32 functionId) external view returns (bool);

  function profileFunctionCheckSelector(
    bytes32 profileId,
    address contractId,
    bytes4 selector
  ) external view returns (bool);

  function profileFunctionCheckAdmin(
    bytes32 profileId,
    bytes32 functionId,
    address account
  ) external view returns (bool);

  function profileFunctionCheckAgent(
    bytes32 profileId,
    bytes32 functionId,
    address account
  ) external view returns (bool);

  function profileFunctionGetInfo(bytes32 profileId, bytes32 functionId)
    external
    view
    returns (ProfileFunctionInfo memory);
}
