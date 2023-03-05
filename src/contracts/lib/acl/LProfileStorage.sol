// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "../../acl/IACLCommons.sol";
import "../../acl/ACLStorage.sol";

/**
 * @title ACL Storage Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LProfileStorage {
  function profileUniverseReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.UniverseEntity storage ge)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("GID Not Found");
    } else {
      revert("Illeagl GID Slot");
    }
  }

  function profileUniverseWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.UniverseEntity storage ge)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.UNIVERSE) {
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

  function profileFunctionReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fe)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("FID Not Found");
    } else {
      revert("Illeagl FID Slot");
    }
  }

  function profileFunctionTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fe, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function profileFunctionWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fe)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function profileFunctionTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fe, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function profileContextReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("CID Not Found");
    } else {
      revert("Illegal CID Slot");
    }
  }

  function profileContextTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function profileContextWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function profileContextTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function profileRealmReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("RID Not Found");
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function profileRealmTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.REALM) {
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

  function profileRealmWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
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

  function profileRealmTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
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

  function profileDomainReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("DID Not Found");
    } else {
      revert("Illegal DID Slot");
    }
  }

  function profileDomainTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function profileDomainWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function profileDomainTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de, bool result)
  {
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function profileMemberReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.ProfileMemberEntity storage me)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("MID Not Found");
    } else {
      revert("Illegal MID Slot");
    }
  }

  function profileMemberTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.ProfileMemberEntity storage me, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function profileMemberWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.ProfileMemberEntity storage me)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function profileMemberTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.ProfileMemberEntity storage me, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function profileRoleReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function profileRoleTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.ROLE) {
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

  function profileRoleWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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

  function profileRoleTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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

  function profileTypeReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("TID Not Found");
    } else {
      revert("Illegal TID Slot");
    }
  }

  function profileTypeTryReadSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.TYPE) {
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

  function profileTypeWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
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

  function profileTypeTryWriteSlot(IACLCommons.ProfileEntity storage profileEntity, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te, bool result)
  {
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
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
