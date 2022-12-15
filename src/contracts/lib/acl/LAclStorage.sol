// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

import "../../acl/IAclCommons.sol";
import "../../acl/AclStorage.sol";

/**
 * @title ACL Storage Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LAclStorage {
 
  function functionReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.FunctionEntity storage fc) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IAclCommons.ScopeType.NONE) {
      revert("FunctionId Not Found");
    } else {
      revert("Invalid FunctionId Scope Slot");
    } 
  }

  function functionTryReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.FunctionEntity storage fc, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        fc.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function functionWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.FunctionEntity storage fc) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        fc.slot := slot
      }
    } else {
      revert("Invalid FunctionId Scope Slot");
    }  
  }

  function functionTryWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.FunctionEntity storage fe, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        fe.slot := slot
      }
      result = true;
    }  else {
      assembly {
        fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }
  }

  function contextReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.ContextEntity storage ce) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IAclCommons.ScopeType.NONE) {
      revert("ContextId Not Found");
    } else {
      revert("Invalid ContextId Scope Slot");
    } 
  }

  function contextTryReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.ContextEntity storage ce, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        ce.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function contextWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.ContextEntity storage ce) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        ce.slot := slot
      }
    } else {
      revert("Invalid ContextId Scope Slot");
    }  
  }

  function contextTryWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.ContextEntity storage ce, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        ce.slot := slot
      }
      result = true;
    }  else {
      assembly {
        ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function realmReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.RealmEntity storage re) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IAclCommons.ScopeType.NONE) {
      revert("RealmId Not Found");
    } else {
      revert("Invalid RealmId Scope Slot");
    } 
  }

  function realmTryReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.RealmEntity storage re, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function realmWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.RealmEntity storage re) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        re.slot := slot
      }
    } else {
      revert("Invalid RealmId Scope Slot");
    }  
  }

  function realmTryWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.RealmEntity storage re, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        re.slot := slot
      }
      result = true;
    }  else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function domainReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.DomainEntity storage de) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IAclCommons.ScopeType.NONE) {
      revert("DomainId Not Found");
    } else {
      revert("Invalid DomainId Scope Slot");
    } 
  }

  function domainTryReadSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.DomainEntity storage de, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        de.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }


  function domainWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.DomainEntity storage de) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        de.slot := slot
      }
    } else {
      revert("Invalid DomainId Scope Slot");
    }  
  }

  function domainTryWriteSlot(AclStorage.DataCollection storage data, bytes32 scopeId) internal view returns (IAclCommons.DomainEntity storage de, bool result) {
    IAclCommons.BaseScope storage bs = data.scopes[scopeId];
    if(bs.stype == IAclCommons.ScopeType.NONE || bs.stype == IAclCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        de.slot := slot
      }
      result = true;
    } else {
      assembly {
        de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }


  function memberReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.MemberEntity storage me) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        me.slot := keccak256(ptr, 0x40)      
      }
    } else if(ba.atype == IAclCommons.AgentType.NONE) {
      revert("MemberId Not Found");
    } else {
      revert("Invalid MemberId Agent Slot");
    } 
  }

  function memberTryReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.MemberEntity storage me, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
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

  function memberWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.MemberEntity storage me) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        me.slot := slot
      }
    } else {
      revert("Invalid MemberId Agent Slot");
    }  
  }

  function memberTryWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.MemberEntity storage me, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        me.slot := slot
      }
      result = true;
    } else {
      assembly {
        me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }


  function roleReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.RoleEntity storage re) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)      
      }
    }  else if(ba.atype == IAclCommons.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Invalid RoleId Agent Slot");
    } 
  }

  function roleTryReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.RoleEntity storage re, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        re.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function roleWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.RoleEntity storage re) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        re.slot := slot
      }
    } else {
      revert("Invalid RoleId Agent Slot");
    }  
  }

  function roleTryWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.RoleEntity storage re, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        re.slot := slot
      }
      result = true;
    }  else {
      assembly {
        re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function typeReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.TypeEntity storage te) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        te.slot := keccak256(ptr, 0x40)      
      }
    }  else if(ba.atype == IAclCommons.AgentType.NONE) {
      revert("TypeId Not Found");
    } else {
      revert("Invalid TypeId Agent Slot");
    } 
  }

  function typeTryReadSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.TypeEntity storage te, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        te.slot := keccak256(ptr, 0x40)      
      }
      result = true;
    }  else {
      assembly {
        te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }

  function typeWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.TypeEntity storage te) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        te.slot := slot
      }
    } else {
      revert("Invalid TypeId Agent Slot");
    }  
  }

  function typeTryWriteSlot(AclStorage.DataCollection storage data, bytes32 agentId) internal view returns (IAclCommons.TypeEntity storage te, bool result) {
    IAclCommons.BaseAgent storage ba = data.agents[agentId];
    if(ba.atype == IAclCommons.AgentType.NONE || ba.atype == IAclCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(data.slot, 1))
        let slot := keccak256(ptr, 0x40)      
        te.slot := slot
      }
      result = true;
    }  else {
      assembly {
        te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
      result = false;
    }  
  }
}