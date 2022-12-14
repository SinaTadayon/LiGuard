// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../AclStorage.sol";
import "../IAccessControl.sol";
import "../scope/IFunctionManagement.sol";
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

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.roleRegister.selector), "Access Denied");    
    // (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(msg.sender);
    // require(senderScopeType != ScopeType.NONE, "Operation Not Permitted");
    
    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].id].atype == AgentType.MEMBER, "Invalid Member Slot");
      require(_data.agents[requests[i].id].alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
      // bytes32 memberAdminId = _data.agents[requests[i].id].adminId;
      // AgentType adminAgenType = _data.agents[memberAdminId].atype;
      // if(adminAgenType == AgentType.MEMBER) {
      //   require(msg.sender == memberAdminId, "Operation Not Permitted");

      // } else if(adminAgenType == AgentType.ROLE) {
      //   require(IRoleManagement(address(this)).roleHasAccount(memberAdminId, msg.sender), "Operation Not Permitted");      
      // } 

      // check admin role
      require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

      _data.agents[requests[i].id].acstat = requests[i].acstat;
      emit MemeberActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;
  }

  // function memberAddTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");
    
  //   for(uint i = 0; i < requests.length; i++) {
  //     MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
  //     require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");

  //     // check admin member
  //     require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

  //     for(uint j = 0; j < requests[i].types; j++) {
  //       require(IRoleManagement(address(this)).typeCheckAdmin(requests[i].types[j], msg.sender), "Operation Not Permitted");
  //       require(_data.agents[requests[i].types[j]].atype == AgentType.TYPE, "Type Not Found");
  //       member.types.add(requests[i].types[j]);
  //       emit MemberTypeGranted(msg.sender, requests[i].memberId, requests[i].types[j]);
  //     }      
  //   }
  //   return true;
  // }

  // function memberRemoveTypes(MemberUpdateTypesRequest[] calldata requests) external returns (bool) {
  //   require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");    
  //   require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberRemoveTypes.selector), "Access Denied");
    
  //   for(uint i = 0; i < requests.length; i++) {
  //     MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
  //     require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");

  //     // check admin member
  //     require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

  //     for(uint j = 0; j < requests[i].types; j++) {
  //       require(IRoleManagement(address(this)).typeCheckAdmin(requests[i].types[j], msg.sender), "Operation Not Permitted");
  //       require(member.types.contains(requests[i].types[j]), "Type Not Found");
  //       member.types.remove(requests[i].types[j]);
  //       emit MemberTypeRevoked(msg.sender, requests[i].memberId, requests[i].types[j]);
  //     }      
  //   }
  //   return true;
  // }

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateAlterabilityStatus.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      require(_data.agents[requests[i].id].atype == AgentType.MEMBER, "Invalid MemberId Slot");
      bytes32 memberAdminId = _data.agents[requests[i].id].adminId;

      // check admin member
      require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

      _data.agents[requests[i].id].alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  function memberUpdateTypeLimit(MemberUpdateTypeLimitRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(address(this)).hasCSAccess(address(this), this.memberUpdateTypeLimit.selector), "Access Denied");

    for(uint i = 0; i < requests.length; i++) {
      MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
      require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
      
       // check admin role
      require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

      member.typeLimit = requests[i].typeLimit;
      emit MemberTypeLimitUpdated(msg.sender, requests[i].memberId, requests[i].typeLimit);
    }
    return true;
  }

  function memberUpdateAdmin(MemberUpdateAdminRequest[] calldata requests) external returns (bool) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLE, "SafeMode: Call Rejected");
    require(IAccessControl(aclFacetId).hasCSAccess(address(this), this.memberUpdateAdmin.selector), "Access Denied");
    (ScopeType senderScopeType, bytes32 senderScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(msg.sender);
    require(senderScopeType != ScopeType.NONE, "Operation Not Permitted");

    for(uint i = 0; i < requests.length; i++) {
      MemberEntity storage member = _data.memberReadSlot(requests[i].memberId);
      require(member.ba.alstat >= AlterabilityStatus.UPDATABLE, "Member Update Disabled");
   
      // check admin role
      require(this._doMemberCheckAdmin(requests[i].memberId, msg.sender), "Operation Not Permitted");

      (ScopeType requestAdminScopeType, bytes32 requestAdminScopeId) = IAccessControl(address(this)).getScopeAccountOfAgentMasterType(requests[i].adminId); 
      bytes32 memberAdminId = _data.agents[requests[i].id].adminId;
      AgentType adminAgentType = _data.agents[memberAdminId].atype;
      if(atype == AgentType.ROLE) {
        require(senderScopeType >= requestAdminScopeType, "Illegal Admin Scope Type" );
      } 

      member.ba.adminId = requests[i].adminId;
      emit MemberAdminUpdated(msg.sender, requests[i].memberId, requests[i].adminId);
    }
    return true;
  }

  function memberCheckId(bytes32 memberId) external view returns (bool) {
    return _data.agents[memberId].atype == AgentType.MEMBER;
  }

  function memberCheckAccount(address account) external view returns (bool) {
    return _data.agents[keccak256(abi.encodePacked(account))].atype == AgentType.MEMBER;
  }

  function memberCheckAdmin(bytes32 memberId, address account) external view returns (bool) {
    return _doMemberCheckAdmin(memberId, account);
  }

  function _doMemberCheckAdmin(bytes32 memberId, address account) internal view returns (bool) {
    if (_data.agents[memberId].atype != AgentType.MEMBER) return false;    
    
    bytes32 memberAdminId = _data.agents[memberId].adminId;
    AgentType adminAgenType = _data.agents[memberAdminId].atype;
    if(adminAgenType == AgentType.MEMBER) {
      return msg.sender == memberAdminId;

    } else if(adminAgenType == AgentType.ROLE) {
      return IRoleManagement(address(this)).roleHasAccount(memberAdminId, msg.sender);
    } 
  
    return false;
  }

  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(result) return member.types.contains(typeId);
    return false;
  }

  function memberHasAccountType(address account, bytes32 typeId) external view returns (bool) {
    bytes32 memberId = keccak256(abi.encodePacked(account));
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if (result) return member.types.contains(typeId);
    return false;
  }

  function memberGetTypeLimit(bytes32 memberId) external view returns (uint16) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(result) return member.typeLimit;
    return 0;
  }

  function memberGetActivityStatus(bytes32 memberId) external view returns (ActivityStatus) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);    
    if(!result) return IAclCommons.ActivityStatus.NONE;
    return member.ba.acstat;
  }

  function memberGetAlterabilityStatus(bytes32 memberId) external view returns (AlterabilityStatus) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);    
    if(!result) return IAclCommons.AlterabilityStatus.NONE;
    return ba.alstat;
  }

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return new bytes32[](0);
    return member.types.values();   
  }

  function memberGetTypesCount(bytes32 memberId) external view returns (uint8) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return 0;
    return uint8(member.types.length());   
  }

  function memberGetAccount(bytes32 memberId) external view returns (address) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return address(0);
    return member.account;
  }

  function memberGetAdmin(bytes32 memberId) external view returns (bytes32) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return bytes32(0);
    return member.ba.adminId;
  }

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) {
      return MemberInfo({
        adminId: bytes32(0),
        acstat: IAclCommons.ActivityStatus.NONE,
        alstat: IAclCommons.AlterabilityStatus.NONE,
        typeLimit: 0,
        typeCount: 0,
        account: address(0)
      });
    }

    return MemberInfo({
      adminId: member.ba.adminId,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat,
      typeLimit: member.typeLimit,
      typeCount: uint16(member.types.length()),
      account: member.account
    });
  }

  function memberGenerateId(address account) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(account));
  }
}