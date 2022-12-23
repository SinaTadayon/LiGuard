// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../acl/IACLCommons.sol";
// import "../../acl/IContextManagement.sol";
// import "../../acl/IRoleManagement.sol";
// import "../../acl/IGroupManagement.sol";
// import "../../acl/IRealmManagement.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../struct/LEnumerableSet.sol";
// import "../LContextUtils.sol";

/**
 * @title Access Control Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LAccessControl {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  string public constant LIB_NAME = "LAccessControl";
  string public constant LIB_VERSION = "3.0.0";


   function initACLAgents() external  {

    // init Global Scope
    _data.global.id = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    _data.global.domainLimit = type(uint16).max;
    _data.global.bs.acstat = ActivityStatus.ENABLED;
    _data.global.bs.alstat = AlterabilityStatus.UPDATABLE;
    _data.global.bs.stype = ScopeType.GLOBAL;
    _data.global.bs.agentLimit = type(uint16).max;
    _data.global.bs.adminId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;

    // Create Lively Master Type       
    TypeEntity storage livelyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterType.name = "LIVELY_VERSE_LIVELY_MASTER_TYPE";
    livelyMasterType.roleLimit = 3;
    livelyMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    livelyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterType.ba.atype = AgentType.TYPE;
    livelyMasterType.ba.scopeLimit = type(uint16).max;
    livelyMasterType.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterType.roles.add(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
          
    // Create Lively Master Admin Role
    RoleEntity storage livelyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
    livelyMasterAdminRole.name = "LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE";
    livelyMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    livelyMasterAdminRole.typeId = _LIVELY_VERSE_LIVELY_MASTER_TYPE_ID;
    livelyMasterAdminRole.memberLimit = 7;
    livelyMasterAdminRole.ba.scopeLimit = 7;
    livelyMasterAdminRole.ba.atype = AgentType.ROLE;
    livelyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    livelyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create Lively Master Admin Member
    bytes32 livelyMasterAdminMemberId = keccak256(abi.encode(0xA77AFA407D4E78cAEC58bA7783AF98f828b9cf36));
    MemberEntity storage livelyMasterAdminMember = _data.memberWriteSlot(livelyMasterAdminMemberId);
    livelyMasterAdminMember.typeLimit = type(uint16).max;      
    livelyMasterAdminMember.account = address(0xA77AFA407D4E78cAEC58bA7783AF98f828b9cf36);
    livelyMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    livelyMasterAdminMember.ba.atype = AgentType.MEMBER;
    livelyMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    livelyMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;      

    // bind Lively Master Admin Member to Admin role of Lively, Scope, Agent and Policy types
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
    livelyMasterAdminMember.types.add(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);

    // bind Lively Master Admin Member to Admin role
    livelyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;


    // Create System Master Type       
    TypeEntity storage systemMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    systemMasterType.name = "LIVELY_VERSE_SYSTEM_MASTER_TYPE";
    systemMasterType.roleLimit = type(uint16).max;
    systemMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    systemMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterType.ba.atype = AgentType.TYPE;
    systemMasterType.ba.scopeLimit = type(uint16).max;
    systemMasterType.ba.acstat = ActivityStatus.ENABLED;
    systemMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterType.roles.add(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

    // Create System Master Admin Role
    RoleEntity storage systemMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
    systemMasterAdminRole.name = "LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE";
    systemMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    systemMasterAdminRole.typeId = _LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID;
    systemMasterAdminRole.memberLimit = 7;
    systemMasterAdminRole.ba.scopeLimit = 7;
    systemMasterAdminRole.ba.atype = AgentType.ROLE;
    systemMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    systemMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;

    // Create System Master Admin Member
    bytes32 systemMasterAdminMemberId = keccak256(abi.encode(0xCB93d383638cc7B174FE2139Dec8570521Bb8118));
    MemberEntity storage systemMasterAdminMember = _data.memberWriteSlot(systemMasterAdminMemberId);
    systemMasterAdminMember.typeLimit = type(uint16).max;
    systemMasterAdminMember.types.add(_LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
    systemMasterAdminMember.account = address(0xCB93d383638cc7B174FE2139Dec8570521Bb8118);
    systemMasterAdminMember.factoryLimit = 64;
    systemMasterAdminMember.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    systemMasterAdminMember.ba.atype = AgentType.MEMBER;
    systemMasterAdminMember.ba.alstat = AlterabilityStatus.UPDATABLE;
    systemMasterAdminMember.ba.acstat = ActivityStatus.ENABLED;
    
    // bind Lively Master Admin Member to Admin role
    systemMasterType.members[systemMasterAdminMemberId] = _LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID;


    // Create Scope Master Type       
    TypeEntity storage scopeMasterType = _data.typeWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
    scopeMasterType.name = "LIVELY_VERSE_SCOPE_MASTER_TYPE";
    scopeMasterType.roleLimit = 3;
    scopeMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    scopeMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    scopeMasterType.ba.atype = AgentType.TYPE;
    scopeMasterType.ba.scopeLimit = type(uint16).max;
    scopeMasterType.ba.acstat = ActivityStatus.ENABLED;
    scopeMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    scopeMasterType.roles.add(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
    scopeMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID;
    

      // Create Scope Master Admin Role
    RoleEntity storage scopeMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
    scopeMasterAdminRole.name = "LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE";
    scopeMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    scopeMasterAdminRole.typeId = _LIVELY_VERSE_SCOPE_MASTER_TYPE_ID;
    scopeMasterAdminRole.memberLimit = 7;
    scopeMasterAdminRole.ba.scopeLimit = 7;
    scopeMasterAdminRole.ba.atype = AgentType.ROLE;
    scopeMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    scopeMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    scopeMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;          
    

    // Create Scope Master Type       
    TypeEntity storage agentMasterType = _data.typeWriteSlot(_LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
    agentMasterType.name = "LIVELY_VERSE_AGENT_MASTER_TYPE";
    agentMasterType.roleLimit = 3;
    agentMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    agentMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    agentMasterType.ba.atype = AgentType.TYPE;
    agentMasterType.ba.scopeLimit = type(uint16).max;
    agentMasterType.ba.acstat = ActivityStatus.ENABLED;
    agentMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    agentMasterType.roles.add(_LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID);
    agentMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID;

    // Create Agent Master Admin Role
    RoleEntity storage agentMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID);
    agentMasterAdminRole.name = "LIVELY_VERSE_AGNET_MASTER_ADMIN_ROLE";
    agentMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    agentMasterAdminRole.typeId = _LIVELY_VERSE_AGENT_MASTER_TYPE_ID;
    agentMasterAdminRole.memberLimit = 7;
    agentMasterAdminRole.ba.scopeLimit = 7;
    agentMasterAdminRole.ba.atype = AgentType.ROLE;
    agentMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    agentMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    agentMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    
    // Create Policy Master Type
    TypeEntity storage policyMasterType = _data.typeWriteSlot(_LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
    policyMasterType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    policyMasterType.roleLimit = 3;
    policyMasterType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    policyMasterType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    policyMasterType.ba.atype = AgentType.TYPE;
    policyMasterType.ba.scopeLimit = type(uint16).max;
    policyMasterType.ba.acstat = ActivityStatus.ENABLED;
    policyMasterType.ba.alstat = AlterabilityStatus.UPDATABLE;
    policyMasterType.roles.add(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
    policyMasterType.members[livelyMasterAdminMemberId] = _LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID;

    // Create Policy Master Admin Role
    RoleEntity storage policyMasterAdminRole = _data.roleWriteSlot(_LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
    policyMasterAdminRole.name = "LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE";
    policyMasterAdminRole.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    policyMasterAdminRole.typeId = _LIVELY_VERSE_POLICY_MASTER_TYPE_ID;
    policyMasterAdminRole.memberLimit = 7;
    policyMasterAdminRole.ba.scopeLimit = 7;
    policyMasterAdminRole.ba.atype = AgentType.ROLE;
    policyMasterAdminRole.ba.acstat = ActivityStatus.ENABLED;
    policyMasterAdminRole.ba.alstat = AlterabilityStatus.UPDATABLE;
    policyMasterAdminRole.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    

    // Create Anonymouse  Type
    TypeEntity storage anonymouseType = _data.typeWriteSlot(_LIVELY_VERSE_ANONYMOUSE_TYPE_ID);
    anonymouseType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    anonymouseType.roleLimit = 0;
    anonymouseType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    anonymouseType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anonymouseType.ba.atype = AgentType.TYPE;
    anonymouseType.ba.scopeLimit = type(uint16).max;
    anonymouseType.ba.acstat = ActivityStatus.ENABLED;
    anonymouseType.ba.alstat = AlterabilityStatus.UPDATABLE;

    // Create Any Type
    TypeEntity storage anyType = _data.typeWriteSlot(_LIVELY_VERSE_ANY_TYPE_ID);
    anyType.name = "LIVELY_VERSE_POLICY_MASTER_TYPE";
    anyType.roleLimit = 0;
    anyType.scopeId = _LIVELY_VERSE_GLOBAL_SCOPE_ID;
    anyType.ba.adminId = _LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID;
    anyType.ba.atype = AgentType.TYPE;
    anyType.ba.scopeLimit = type(uint16).max;
    anyType.ba.acstat = ActivityStatus.ENABLED;
    anyType.ba.alstat = AlterabilityStatus.UPDATABLE;

    // _firstInit = true;
  }

  function registerProxyFacet(ACLStorage.DataCollection storage data) external {
    data.facets.add(address(this));
    data.selectors[IProxy.upgradeTo.selector] = address(this);
    data.selectors[IProxy.setSafeModeStatus.selector] = address(this);
    data.selectors[IProxy.setUpgradabilityStatus.selector] = address(this);
    data.selectors[IProxy.setLocalAdmin.selector] = address(this);
    data.selectors[IProxy.setAccessControlManager.selector] = address(this);
    data.selectors[IProxy.contractName.selector] = address(this);
    data.selectors[IProxy.contractVersion.selector] = address(this);
    data.selectors[IProxy.accessControlManager.selector] = address(this);
    data.selectors[IProxy.subjectAddress.selector] = address(this);
    data.selectors[IProxy.safeModeStatus.selector] = address(this);
    data.selectors[IProxy.upgradabilityStatus.selector] = address(this);
    data.selectors[IProxy.localAdmin.selector] = address(this);
    data.selectors[IProxy.domainSeparator.selector] = address(this);
    data.selectors[IProxy.initVersion.selector] = address(this);
    data.selectors[IProxy.proxyInfo.selector] = address(this);
  }

}
