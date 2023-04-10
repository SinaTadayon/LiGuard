// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../IACLCommonsTest.sol";
import "../ACLStorageTest.sol";

/**
 * @title ACL Storage Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileStorageTest {
  function profileUniverseReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.UniverseEntity storage ge)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("GID Not Found");
    } else {
      revert("Illeagl GID Slot");
    }
  }

  function profileUniverseWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.UniverseEntity storage ge)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal GID Slot");
    }
  }

  function profileFunctionReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fe)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("FID Not Found");
    } else {
      revert("Illeagl FID Slot");
    }
  }

  function profileFunctionTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fe, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (fe, result);
    }
    assembly {
      fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileFunctionWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fe)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal FID Slot");
    }
  }

  function profileFunctionTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fe, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (fe, result);
    }
    assembly {
      fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileContextReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("CID Not Found");
    } else {
      revert("Illegal CID Slot");
    }
  }

  function profileContextTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (ce, result);
    }
    assembly {
      ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileContextWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal CID Slot");
    }
  }

  function profileContextTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (ce, result);
    }
    assembly {
      ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRealmReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("RID Not Found");
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function profileRealmTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (re, result);
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRealmWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function profileRealmTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (re, result);
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileDomainReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("DID Not Found");
    } else {
      revert("Illegal DID Slot");
    }
  }

  function profileDomainTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (de, result);
    }
    assembly {
      de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileDomainWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal DID Slot");
    }
  }

  function profileDomainTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (de, result);
    }
    assembly {
      de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileMemberReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.ProfileMemberEntity storage me)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("MID Not Found");
    } else {
      revert("Illegal MID Slot");
    }
  }

  function profileMemberTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.ProfileMemberEntity storage me, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (me, result);
    }
    assembly {
      me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileMemberWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.ProfileMemberEntity storage me)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal MID Slot");
    }
  }

  function profileMemberTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.ProfileMemberEntity storage me, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (me, result);
    }
    assembly {
      me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRoleReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function profileRoleTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (re, result);
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRoleWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function profileRoleTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
      result = true;
      return (re, result);
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileTypeReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("TID Not Found");
    } else {
      revert("Illegal TID Slot");
    }
  }

  function profileTypeTryReadSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (te, result);
    }
    assembly {
      te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileTypeWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal TID Slot");
    }
  }

  function profileTypeTryWriteSlot(IACLCommonsTest.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
      result = true;
      return (te, result);
    }
    assembly {
      te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }
}
