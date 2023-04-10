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
library LACLStorageTest {
  function universeReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.UniverseEntity storage ge)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("GID Not Found");
    } else {
      revert("Illeagl GID Slot");
    }
  }

  function universeWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.UniverseEntity storage ge)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal GID Slot");
    }
  }

  function functionReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fc)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("FID Not Found");
    } else {
      revert("Illeagl FID Slot");
    }
  }

  function functionTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fc, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        fc.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function functionWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fc)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal FID Slot");
    }
  }

  function functionTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.FunctionEntity storage fe, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fe.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function contextReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("CID Not Found");
    } else {
      revert("Illegal CID Slot");
    }
  }

  function contextTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function contextWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal CID Slot");
    }
  }

  function contextTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.ContextEntity storage ce, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function realmReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("RID Not Found");
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function realmTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function realmWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function realmTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.RealmEntity storage re, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function domainReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommonsTest.ScopeType.NONE) {
      revert("DID Not Found");
    } else {
      revert("Illegal DID Slot");
    }
  }

  function domainTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function domainWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal DID Slot");
    }
  }

  function domainTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommonsTest.DomainEntity storage de, bool result)
  {
    IACLCommonsTest.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommonsTest.ScopeType.NONE || bs.stype == IACLCommonsTest.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function memberReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.MemberEntity storage me)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("MID Not Found");
    } else {
      revert("Illegal MID Slot");
    }
  }

  function memberTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.MemberEntity storage me, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function memberWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.MemberEntity storage me)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal MID Slot");
    }
  }

  function memberTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.MemberEntity storage me, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function roleReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function roleTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function roleWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function roleTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.RoleEntity storage re, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        let slot := keccak256(ptr, 0x40)
        re.slot := slot
      }
      result = true;
    } else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function typeReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommonsTest.AgentType.NONE) {
      revert("TID Not Found");
    } else {
      revert("Illegal TID Slot");
    }
  }

  function typeTryReadSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function typeWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else {
      revert("Illegal TID Slot");
    }
  }

  function typeTryWriteSlot(ACLStorageTest.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommonsTest.TypeEntity storage te, bool result)
  {
    IACLCommonsTest.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommonsTest.AgentType.NONE || ba.atype == IACLCommonsTest.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
      result = true;
    } else {
      assembly {
        te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }
}
