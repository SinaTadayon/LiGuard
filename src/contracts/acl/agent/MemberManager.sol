// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IMemberManagement.sol";
import "./ITypeManagement.sol";
import "../ACLStorage.sol";
import "../IACL.sol";
import "../IACLGenerals.sol";
import "../scope/IFunctionManagement.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../lib/acl/LACLCommons.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/acl/LACLUtils.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/BaseUUPSProxy.sol";

import "hardhat/console.sol";

/**
 * @title ACL Member Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract MemberManager is ACLStorage, BaseUUPSProxy, IMemberManagement {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}  

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {        
    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    emit Initialized(
      _msgSender(),
      address(this),
      _implementation(),
      contractName,
      contractVersion,
      _getInitializedCount()
    );
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return
      interfaceId == type(IMemberManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  // Note: called by eveny admin of role
  function memberRegister(MemberRegisterRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IMemberManagement.memberRegister.selector);    

    // check and set
    MemberEntity storage memberEntity = _data.memberReadSlot(senderId);
    require(int32(uint32(memberEntity.limits.memberRegisterLimit)) - int16(uint16(requests.length)) >= 0, "Illegal RegisterLimit");  

    for (uint256 i = 0; i < requests.length; i++) {
      _doMemberRegister(requests[i], memberEntity, functionId, senderId);      
    }
    
    memberEntity.limits.memberRegisterLimit -= uint16(requests.length);
    return true;
  }

  function memberUpdateActivityStatus(UpdateActivityRequest[] calldata requests) external returns (bool) {    
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IMemberManagement.memberUpdateActivityStatus.selector);

    for(uint i = 0; i < requests.length; i++) {      
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);
      require(requests[i].acstat > ActivityStatus.DELETED, "Illegal Activity");
      memberEntity.ba.acstat = requests[i].acstat;
      emit MemberActivityUpdated(msg.sender, requests[i].id, requests[i].acstat);
    }
    return true;  
  }

  function memberUpdateAlterabilityStatus(UpdateAlterabilityRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IMemberManagement.memberUpdateAlterabilityStatus.selector);

    for(uint i = 0; i < requests.length; i++) {      
      MemberEntity storage memberEntity = _data.memberReadSlot(requests[i].id);      
      IACL.AdminAccessStatus adminAccessStatus = _doCheckAdminAccess(memberEntity.ba.adminId, senderId, functionId);
      if(adminAccessStatus != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(adminAccessStatus);
      require(requests[i].alstat != AlterabilityStatus.NONE, "Illegal Alterability");
      memberEntity.ba.alstat = requests[i].alstat;
      emit MemberAlterabilityUpdated(msg.sender, requests[i].id, requests[i].alstat);
    }
    return true;
  }

  // Note: member default admin is 
  function memberUpdateAdmin(UpdateAdminRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IMemberManagement.memberUpdateAdmin.selector);

    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].id, senderId, functionId);

      // checking requested admin of member
      if (requests[i].adminId != bytes32(0)) {
        BaseAgent storage requestedAdminAgent = _data.agents[requests[i].adminId];
        require(requestedAdminAgent.atype > AgentType.MEMBER, "Illegal Admin AgentType");       
        memberEntity.ba.adminId = requests[i].adminId;      
      } else {
        memberEntity.ba.adminId = _LIVELY_VERSE_MEMBER_MASTER_TYPE_ID;
      }
      emit MemberAdminUpdated(msg.sender, requests[i].id, requests[i].adminId);
    }
    return true;
  }

  function memberUpdateGeneralLimit(MemberUpdateGeneralLimitRequest[] calldata requests) external returns (bool) {
    (bytes32 functionId, bytes32 senderId) = _accessPermission(IMemberManagement.memberUpdateGeneralLimit.selector);
    MemberEntity storage senderMemberEntity = _data.memberReadSlot(senderId);
    for (uint256 i = 0; i < requests.length; i++) {
      MemberEntity storage memberEntity = _doGetEntityAndCheckAdminAccess(requests[i].memberId, senderId, functionId);
      require(requests[i].limits.typeLimit > memberEntity.types.length(), "Illegal TypeLimit" );

      if(
        !memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID) &&
        !memberEntity.types.contains(_LIVELY_VERSE_MEMBER_MASTER_TYPE_ID)
      ) {
        _doCheckMemberRegisterLimits(senderMemberEntity, requests[i].limits);
      }
      memberEntity.limits = requests[i].limits;
      emit MemberGeneralLimitUpdated(msg.sender, requests[i].memberId, requests[i].limits);
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
    if (_data.agents[memberId].atype != AgentType.MEMBER) return false;    
    
    bytes32 memberAdminId = _data.agents[memberId].adminId;
    AgentType adminAgenType = _data.agents[memberAdminId].atype;
    bytes32 accountId = LACLUtils.accountGenerateId(account);

    if(adminAgenType == AgentType.ROLE) {
      (RoleEntity storage roleEntity, bool result) = _data.roleTryReadSlot(memberAdminId);
      if(!result) return false;

      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(roleEntity.typeId);
      if(!result1) return false;  

      return typeEntity.members[accountId] == memberAdminId;
    
    } else if(adminAgenType == AgentType.TYPE) {
      (TypeEntity storage typeEntity, bool result1) = _data.typeTryReadSlot(memberAdminId);
      if(!result1) return false;  

      return typeEntity.members[accountId] != bytes32(0);  
    }
  
    return false;
  }


  function memberHasType(bytes32 memberId, bytes32 typeId) external view returns (bool) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(result) return member.types.contains(typeId);
    return false;
  }

  function memberGetTypes(bytes32 memberId) external view returns (bytes32[] memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) return new bytes32[](0);
    return member.types.values();   
  }

  function memberGetInfo(bytes32 memberId) external view returns (MemberInfo memory) {
    (MemberEntity storage member, bool result) = _data.memberTryReadSlot(memberId);
    if(!result) {
      return MemberInfo({
        adminId: bytes32(0),
        account: address(0),
        limits: GeneralLimit({          
          contextLimit: 0,
          memberRegisterLimit: 0,
          roleRegisterLimit: 0,
          typeRegisterLimit: 0,
          functionRegisterLimit: 0,
          contextRegisterLimit: 0,
          profileRegisterLimit: 0,
          memberLimit: 0,
          realmRegisterLimit: 0,
          domainRegisterLimit: 0,
          policyRegisterLimit: 0,
          functionLimit: 0,
          realmLimit: 0,
          domainLimit: 0,
          callLimit: 0,
          typeRoleLimit: 0,
          typeLimit: 0,
          policyRoleLimit: 0
        }),
        typeCount: 0,
        adminType: AgentType.NONE,
        acstat: ActivityStatus.NONE,
        alstat: AlterabilityStatus.NONE
      });
    }

    return MemberInfo({
      adminId: member.ba.adminId,
      account: member.account,
      limits: GeneralLimit({
        contextLimit: member.limits.contextLimit,
        memberRegisterLimit: member.limits.memberRegisterLimit,
        roleRegisterLimit: member.limits.roleRegisterLimit,
        typeRegisterLimit: member.limits.typeRegisterLimit,
        functionRegisterLimit: member.limits.functionRegisterLimit,
        contextRegisterLimit: member.limits.contextRegisterLimit,
        profileRegisterLimit: member.limits.profileRegisterLimit,
        memberLimit: member.limits.memberLimit,
        realmRegisterLimit: member.limits.realmRegisterLimit,
        domainRegisterLimit: member.limits.domainRegisterLimit,
        policyRegisterLimit: member.limits.policyRegisterLimit,
        functionLimit: member.limits.functionLimit,
        realmLimit: member.limits.realmLimit,
        domainLimit: member.limits.domainLimit,
        callLimit: member.limits.callLimit,
        typeRoleLimit: member.limits.typeRoleLimit,
        typeLimit: member.limits.typeLimit,
        policyRoleLimit: member.limits.policyRoleLimit
      }),
      typeCount: uint16(member.types.length()),
      adminType: _data.agents[member.ba.adminId].atype,
      acstat: member.ba.acstat,
      alstat: member.ba.alstat
    });
  }

  function _doCheckAdminAccess(bytes32 adminId, bytes32 memberId, bytes32 functionId) internal view returns (IACL.AdminAccessStatus) {
    return LACLCommons.checkAdminAccess(_data, adminId, memberId, functionId);   
  }

  function _accessPermission(bytes4 selector) internal returns (bytes32, bytes32) {
    require(IProxy(address(this)).safeModeStatus() == IBaseProxy.ProxySafeModeStatus.DISABLED, "Rejected");        
    
    address functionFacetId = _data.selectors[selector];
    bytes32 functionId = LACLUtils.functionGenerateId(functionFacetId, selector); 
    bytes32 senderId = LACLUtils.accountGenerateId(msg.sender);   
    IACL.AuthorizationStatus status = IACL(address(this)).hasMemberAccess(functionId, senderId);
    if(status != IACL.AuthorizationStatus.PERMITTED) LACLUtils.generateAuthorizationError(status);
    return (functionId, senderId);
  }

  function _doGetEntityAndCheckAdminAccess(bytes32 memberId, bytes32 senderId, bytes32 functionId) internal view returns (MemberEntity storage) {
    MemberEntity storage memberEntity = _data.memberReadSlot(memberId);
    require(memberEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Updatable");
    IACL.AdminAccessStatus status = _doCheckAdminAccess(memberEntity.ba.adminId, senderId, functionId);
    if(status != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(status);
    return memberEntity;
  }

  function _doMemberRegister(MemberRegisterRequest calldata request, MemberEntity storage memberEntity, bytes32 functionId, bytes32 senderId) internal {
    bytes32 newMemberId = LACLUtils.accountGenerateId(request.account);
    require(_data.agents[newMemberId].acstat == ActivityStatus.NONE, "Already Exist");
    require(request.limits.typeLimit >= 1, "Illegal TypeLimit");
    require(
      request.acstat > ActivityStatus.DELETED && 
      request.alstat > AlterabilityStatus.NONE,
      "Illegal Activity/Alterability"
    );     

    if(
      !memberEntity.types.contains(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID) &&
      !memberEntity.types.contains(_LIVELY_VERSE_MEMBER_MASTER_TYPE_ID)
    ) {
      _doCheckMemberRegisterLimits(memberEntity, request.limits);
    }

    // check role
    RoleEntity storage roleEntity = _data.roleReadSlot(request.roleId);
    require(roleEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Role Updatable");
    require(roleEntity.memberLimit > roleEntity.memberCount, "Illegal Register");      

    // check type 
    TypeEntity storage typeEntity = _data.typeReadSlot(roleEntity.typeId);
    require(typeEntity.ba.alstat >= AlterabilityStatus.UPDATABLE, "Illegal Type Updatable");

    // check access
    IACL.AdminAccessStatus adminAccessStatus = _doCheckAdminAccess(roleEntity.ba.adminId, senderId, functionId);
    if(adminAccessStatus != IACL.AdminAccessStatus.PERMITTED) LACLUtils.generateAdminAccessError(adminAccessStatus);

    // add new member to type
    typeEntity.members[newMemberId] = request.roleId;

    // add new member to role
    roleEntity.memberCount +=1;      

    // create new member
    MemberEntity storage newMember = _data.memberWriteSlot(newMemberId);      

    // check adminId
    if(request.adminId != bytes32(0)) {
      require(_data.agents[request.adminId].atype > AgentType.MEMBER, "Illegal Admin AgentType");
      adminAccessStatus = _doCheckAdminAccess(_LIVELY_VERSE_MEMBER_MASTER_TYPE_ID, senderId, functionId);        
      if(adminAccessStatus != IACL.AdminAccessStatus.PERMITTED) revert IACL.SetAdminForbidden(adminAccessStatus);
      newMember.ba.adminId = request.adminId;
    } else {
      newMember.ba.adminId = _LIVELY_VERSE_MEMBER_MASTER_TYPE_ID;
    }
    
    newMember.ba.atype = AgentType.MEMBER;
    newMember.ba.acstat = request.acstat;
    newMember.ba.alstat = request.alstat;
    newMember.account = request.account;
    newMember.types.add(roleEntity.typeId);
    newMember.limits = request.limits;

    emit MemberRegistered(
      msg.sender,
      newMemberId,
      request.account,
      request.roleId,
      newMember.ba.adminId,
      request.limits
    );
  }

  function _doCheckMemberRegisterLimits(MemberEntity storage memberEntity, GeneralLimit calldata limits) internal view {
    require(memberEntity.limits.memberRegisterLimit >= limits.memberRegisterLimit, "Illegal MemberRegisterLimit");
    require(memberEntity.limits.contextRegisterLimit >= limits.contextRegisterLimit, "Illegal ContextRegisterLimit");
    require(memberEntity.limits.functionRegisterLimit >= limits.functionRegisterLimit, "Illegal FunctionRegisterLimit");
    require(memberEntity.limits.profileRegisterLimit >= limits.profileRegisterLimit, "Illegal ProfileRegisterLimit");
    require(memberEntity.limits.roleRegisterLimit >= limits.roleRegisterLimit, "Illegal RoleRegisterLimit");
    require(memberEntity.limits.typeRegisterLimit >= limits.typeRegisterLimit, "Illegal TypeRegisterLimit");
    require(memberEntity.limits.realmRegisterLimit >= limits.realmRegisterLimit, "Illegal RealmRegisterLimit");
    require(memberEntity.limits.domainRegisterLimit >= limits.domainRegisterLimit, "Illegal DomainRegisterLimit");
    require(memberEntity.limits.policyRegisterLimit >= limits.policyRegisterLimit, "Illegal PolicyRegisterLimit");
    require(memberEntity.limits.memberLimit >= limits.memberLimit, "Illegal MemberLimit");
    require(memberEntity.limits.contextLimit >= limits.contextLimit, "Illegal ContextLimit");
    require(memberEntity.limits.realmLimit >= limits.realmLimit, "Illegal RealmLimit");
    require(memberEntity.limits.domainLimit >= limits.domainLimit, "Illegal DomainLimit");
    require(memberEntity.limits.callLimit >= limits.callLimit, "Illegal CallLimit");
    require(memberEntity.limits.typeRoleLimit >= limits.typeRoleLimit, "Illegal TypeRoleLimit");
    require(memberEntity.limits.typeLimit >= limits.typeLimit, "Illegal TypeLimit");
    require(memberEntity.limits.policyRoleLimit >= limits.policyRoleLimit, "Illegal PolicyRoleLimit");
    require(memberEntity.limits.functionLimit >= limits.functionLimit, "Illegal FunctionLimit");
  }

  function getLibrary() external pure returns (address) {
    return address(LACLCommons);
  }
}