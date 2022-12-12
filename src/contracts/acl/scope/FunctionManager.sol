// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IFunctionManagement.sol";
import "./IContextManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract FunctionManager is AclStorage, IFunctionManagement {
  using LAclStorage for DataCollection;

  // TODO check permission
  // function functionAddGroup(ScopeAddGroupsRequest[] calldata requests) external returns (bool) {
  //   revert ("functionAddGroup Not Supported");
  //   // address facetId = _data.interfaces[type(IAccessControl).interfaceId];
  //   // require(IAccessControl(facetId).hasCSAccess(address(this), this.functionAddGroup.selector), "Access Denied");
  //   // for (uint i = 0; i < requests.length; i++) {   
  //   //   FunctionEntity storage fc = _data.readFuntionSlot(requests[i].scopeId);
  //   //   require(fc.baseScope.alstat == AlterabilityStatus.UPDATABLE, "FunctionId Not Updatable");
  //   //   require(fc.groupId == bytes32(0), "Function Group Not Empty");
  //   //   require(_data.agents[requests[i].groups[0]].atype == AgentType.GROUP, "Invalid Group");
  //   //   fc.groupId = requests[i].groups[0];
  //   // }

  //   // return true;
  // }

  // function functionRemoveGroup(ScopeRemoveGroupsRequest[] calldata requests) external pure returns (bool) {
  //   revert ("functionRemoveGroup Not Supported");
  // }

  // function functionCreateGroup(GroupRegisterRequest calldata request) external returns (bytes32) {
  //   address facetId = _data.interfaces[type(IAccessControl).interfaceId];
  //   require(IAccessControl(facetId).hasCSAccess(address(this), this.functionCreateGroup.selector), "Access Denied");


  // }

  // function functionCreateType(TypeRegisterRequest calldata request) external returns (bytes32) {

  // }

  // function functionCreateRole(RoleRegisterRequest calldata request) external returns (bytes32) {

  // }

  function functionUpdateAdmin(ScopeUpdateAdminRequest[] calldata requests) external returns (bool) {

  }

  function functionUpdateActivityStatus(ScopeUpdateActivityRequest[] calldata requests) external returns (bool) {

  }

  function functionUpdateAlterabilityStatus(ScopeUpdateAlterabilityRequest[] calldata requests) external returns (bool) {

  }

  function functionUpdatePolicy(FunctionUpdatePolicyRequest[] calldata requests) external returns (bool) {

  }

  function functionCheckExistance(bytes32 functionId) external view returns (bool) {

  }

  function functionCheckSelectorExistance(address contractId, bytes4 selector) external view returns (bool) {

  }

  function functionCheckAdmin(bytes32 functionId, bytes32 agentId) external view returns (bool) {

  }

  function functionHasAgent(bytes32 functionId, bytes32 agentId) external view returns (bool) {

  }

  function functionHasAccount(bytes32 functionId, address account) external view returns (bool) {

  }

  function functionGetAdmin(bytes32 functionId) external view returns (bytes32, AgentType) {

  }

  function functionGetContext(bytes32 functionId) external view returns (bytes32) {

  }

  function functionGetActivityStatus(bytes32 functionId) external view returns (ActivityStatus) {

  }

  function functionGeAlterabilityStatus(bytes32 functionId) external view returns (AlterabilityStatus) {

  }

  function functionGetSelector(bytes32 functionId) external view returns (bytes4) {

  }

  function functionGetGroup(bytes32 functionId) external view returns (bytes32) {

  }

  function functionGetPolicy(bytes32 functionId) external view returns (uint8) {

  }

  function functionGetInfo(bytes32 functionId) external view returns (FunctionInfo memory) {

  }

  function functionGenerateId(bytes32 contextId, bytes4 selector) external pure returns (bytes32) {

  }

  function functionCreateFacetRegisterRequest() public returns (FacetRegisterRequest memory) {}

  function functionCreateFacetUpgradeRequest() public returns (FacetMigrateRequest memory) {}

  function functionCreateContextRegisterFacetRequest() public returns (IContextManagement.ContextRegisterFunctionRequest memory) {}

  function functionCreateContextUpgradeFacetRequest() public returns (IContextManagement.ContextUpgradeFunctionRequest memory) {}

  
}