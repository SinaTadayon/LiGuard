// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../AclStorage.sol";
import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../IAccessControl.sol";
import "../../lib/acl/LAclStorage.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../proxy/IProxy.sol";

/**
 * @title ACL Memeber Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract MemberManager is AclStorage, IMemberManagement {
  using LAclStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function memberUpdateActivityStatus(MemberUpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateActivityStatus.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].memberId].atype == AgentType.MEMBER, "Invalid MemberId Slot");
      require(_data.agents[requests[i].memberId].alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
      _data.agents[requests[i].memberId].acstat = requests[i].acstat;
      emit MemeberActivityUpdated(msg.sender, requests[i].memberId, requests[i].acstat);
    }
    return true;
  }

  function memberUpdateAlterabilityStatus(MemberUpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateAlterabilityStatus.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].memberId].atype == AgentType.MEMBER, "Invalid MemberId Slot");
      _data.agents[requests[i].memberId].alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].memberId, requests[i].alstat);
    }
    return true;
  }

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateTypeLimit.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
      require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
      member.typeLimit = requests[i].typeLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].memberId, requests[i].typeLimit);
    }
    return true;
  }

  function memberUpdateAdmin(MemberUpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");
    for(uint i = 0; i < requests.length; i++) {
      MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
      require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
      // TODO check adminId should be MEMBER_MASTER type
      member.adminId = requests[i].adminId;
      emit MemberAdminUpdated(msg.sender, requests[i].memberId, requests[i].adminId);
    }
    return true;
  }

  // function memberAddTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");
  //   for(uint i = 0; i < requests.length; i++) {
  //     MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
  //     require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
  //     for(uint j = 0; j < requests[i].types; j++) {
  //       require(ITypeManagement(address(this)).typeCheckId(requests[i].types[j]), "Type Not Found");
  //       ITypeManagement.typeAddMembers(requests);
  //       // member.types.add(requests[i].types[j]);
  //       // emit MemberTypeGranted(msg.sender, requests[i].memberId, requests[i].types[j]);
  //     }      
  //   }
  //   return true;
  // }

  // function memberRemoveTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   address aclFacetId = _data.interfaces[type(IAccessControl).interfaceId];
  //   require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");
  //   for(uint i = 0; i < requests.length; i++) {
  //     MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
  //     require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
  //     for(uint j = 0; j < requests[i].types; j++) {
  //       require(member.types.contains(requests[i].types[j]), "Type Not Found");
  //       member.types.add(requests[i].types[j]);
  //       emit MemberTypeRevoked(msg.sender, requests[i].memberId, requests[i].types[j]);
  //     }      
  //   }
  //   return true;
  // }


  function memberCheckExistance(bytes32 memberId) external view returns (bool) {
    return _data.agents[memberId].atype == AgentType.MEMBER;
  }

  function memberCheckAccountExistance(address account) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(account))].atype == AgentType.MEMBER;
  }

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return false;
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.types.contains(typeId);
  }

  function memberHasAccountType(address account, bytes32 typeId) external view returns (bool) {
    bytes32 memberId = keccak256(abi.encodePacked(account));
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return false;
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.types.contains(typeId);
  }

  function memberGetTypeLimit(bytes32 memberId) external view returns (uint8) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return 0;
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.typeLimit;
  }

  function memberGetActivityStatus(bytes32 memberId) external view returns (ActivityStatus) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return IAclCommons.ActivityStatus.NONE;
    return ba.acstat;
  }

  function memberGetAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return IAclCommons.AlterabilityStatus.NONE;
    return ba.alstat;
  }

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return new bytes32[](0);
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.types.values();   
  }

  function memberGetTypesCount(bytes32 memberId) external view returns (uint8) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return 0;
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return uint8(member.types.length());   
  }

  function memberGetAccount(bytes32 memberId) external view returns (address) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return address(0);
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.account;
  }

  function memberGetAdmin(bytes32 memberId) external view returns (bytes32) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) return bytes32(0);
    MemberEntity storage member = _data.memberReadSlot(memberId);
    return member.adminId;
  }

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory) {
    IAclCommons.BaseAgent storage ba = _data.agents[memberId];
    if(ba.atype != AgentType.MEMBER) {
      return MemberInfo({
        adminId: bytes32(0),
        acstat: IAclCommons.ActivityStatus.NONE,
        alstat: IAclCommons.AlterabilityStatus.NONE,
        typeLimit: 0,
        typeCount: 0,
        account: address(0)
      });
    }

    MemberEntity storage member = _data.memberReadSlot(memberId);
    return MemberInfo({
      adminId: member.adminId,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat,
      typeLimit: member.typeLimit,
      typeCount: uint8(member.types.length()),
      account: member.account
    });
  }

  function memberGenerateId(address account) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(account));
  }
}