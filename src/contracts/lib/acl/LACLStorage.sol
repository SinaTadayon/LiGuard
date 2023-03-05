// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.19;

import "../../acl/IACLCommons.sol";
import "../../acl/ACLStorage.sol";

/**
 * @title ACL Storage Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLStorage {
  function universeReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.UniverseEntity storage ge)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.UNIVERSE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("GID Not Found");
    } else {
      revert("Illeagl GID Slot");
    }
  }

  function universeWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.UniverseEntity storage ge)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.UNIVERSE) {
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

  function functionReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fc)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("FID Not Found");
    } else {
      revert("Illeagl FID Slot");
    }
  }

  function functionTryReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fc, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function functionWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fc)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function functionTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.FunctionEntity storage fe, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function contextReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("CID Not Found");
    } else {
      revert("Illegal CID Slot");
    }
  }

  function contextTryReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function contextWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function contextTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.ContextEntity storage ce, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function realmReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("RID Not Found");
    } else {
      revert("Illeagl RID Slot");
    }
  }

  function realmTryReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.REALM) {
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

  function realmWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
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

  function realmTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.RealmEntity storage re, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
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

  function domainReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)
      }
    } else if (bs.stype == IACLCommons.ScopeType.NONE) {
      revert("DID Not Found");
    } else {
      revert("Illegal DID Slot");
    }
  }

  function domainTryReadSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function domainWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function domainTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 scopeId)
    internal
    view
    returns (IACLCommons.DomainEntity storage de, bool result)
  {
    IACLCommons.BaseScope storage bs = data.scopes[scopeId];
    if (bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function memberReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.MemberEntity storage me)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        me.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("MID Not Found");
    } else {
      revert("Illegal MID Slot");
    }
  }

  function memberTryReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.MemberEntity storage me, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function memberWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.MemberEntity storage me)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function memberTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.MemberEntity storage me, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function roleReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        re.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Illegal RoleId Slot");
    }
  }

  function roleTryReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.ROLE) {
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

  function roleWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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

  function roleTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.RoleEntity storage re, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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

  function typeReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 0))
        te.slot := keccak256(ptr, 0x40)
      }
    } else if (ba.atype == IACLCommons.AgentType.NONE) {
      revert("TID Not Found");
    } else {
      revert("Illegal TID Slot");
    }
  }

  function typeTryReadSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.TYPE) {
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

  function typeWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
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

  function typeTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 agentId)
    internal
    view
    returns (IACLCommons.TypeEntity storage te, bool result)
  {
    IACLCommons.BaseAgent storage ba = data.agents[agentId];
    if (ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
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
