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
 
  function profileGlobalReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.GlobalEntity storage ge) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.GLOBAL) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ge.slot := keccak256(ptr, 0x40)
      }
    }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
      revert("GID Not Found");
    } else {
      revert("Illeagl GID Slot");
    } 
  }

  function profileGlobalWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.GlobalEntity storage ge) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.GLOBAL) {
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

  function profileFunctionReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fe) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        fe.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
      revert("FID Not Found");
    } else {
      revert("Illeagl FID Slot");
    } 
  }

  function profileFunctionTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fe, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.FUNCTION) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          fe.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (fe, result);
      }     
    } 
    assembly {
        fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
    result = false;
  }

  function profileFunctionWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fe) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
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

  function profileFunctionTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fe, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          fe.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (fe, result);
      }        
    }
    assembly {
      fe.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileContextReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.ContextEntity storage ce) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.CONTEXT) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        ce.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
      revert("CID Not Found");
    } else {
      revert("Illegal CID Slot");
    } 
  }

  function profileContextTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.ContextEntity storage ce, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.CONTEXT) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          ce.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (ce, result);
      }     
    }
    assembly {
      ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;    
  }

  function profileContextWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.ContextEntity storage ce) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
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

  function profileContextTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.ContextEntity storage ce, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.CONTEXT) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          ce.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (ce, result);
      }
    }  
    assembly {
      ce.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRealmReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.RealmEntity storage re) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.REALM) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        re.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
      revert("RID Not Found");
    } else {
      revert("Illeagl RID Slot");
    } 
  }

  function profileRealmTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.RealmEntity storage re, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.REALM) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          re.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (re, result);
      }      
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRealmWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.RealmEntity storage re) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
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

  function profileRealmTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.RealmEntity storage re, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.REALM) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          re.slot := keccak256(ptr, 0x40)
        }
        result = true;
        return (re, result);
      }
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileDomainReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.DomainEntity storage de) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.DOMAIN) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
        de.slot := keccak256(ptr, 0x40)      
      }
    }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
      revert("DID Not Found");
    } else {
      revert("Illegal DID Slot");
    } 
  }

  function profileDomainTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.DomainEntity storage de, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.DOMAIN) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          de.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (de, result);
      }  
    }
    assembly {
      de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }


  function profileDomainWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.DomainEntity storage de) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
    if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
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

  function profileDomainTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 scopeId) internal view returns (IACLCommons.DomainEntity storage de, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseScope storage bs = profileEntity.scopes[scopeId];
      if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.DOMAIN) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), scopeId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 1))
          de.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (de, result);
      }        
    }
    assembly {
      de.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }


  function profileMemberReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.MemberEntity storage me) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.MEMBER) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        me.slot := keccak256(ptr, 0x40)      
      }
    } else if(ba.atype == IACLCommons.AgentType.NONE) {
      revert("MID Not Found");
    } else {
      revert("Illegal MID Slot");
    } 
  }

  function profileMemberTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.MemberEntity storage me, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.MEMBER) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), agentId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
          me.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (me, result);
      }
    }
    assembly {
      me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileMemberWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.MemberEntity storage me) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
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

  function profileMemberTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.MemberEntity storage me, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.MEMBER) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), agentId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
          me.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (me, result);
      }  
    }
    assembly {
      me.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRoleReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.RoleEntity storage re) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.ROLE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        re.slot := keccak256(ptr, 0x40)      
      }
    }  else if(ba.atype == IACLCommons.AgentType.NONE) {
      revert("RoleId Not Found");
    } else {
      revert("Illegal RoleId Slot");
    } 
  }

  function profileRoleTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.RoleEntity storage re, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.ROLE) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), agentId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
          re.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (re, result);
      }
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileRoleWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.RoleEntity storage re) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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

  function profileRoleTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.RoleEntity storage re, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.ROLE) {
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
    }
    assembly {
      re.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }

  function profileTypeReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.TypeEntity storage te) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.TYPE) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), agentId)
        mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
        te.slot := keccak256(ptr, 0x40)      
      }
    }  else if(ba.atype == IACLCommons.AgentType.NONE) {
      revert("TID Not Found");
    } else {
      revert("Illegal TID Slot");
    } 
  }

  function profileTypeTryReadSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.TypeEntity storage te, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.TYPE) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), agentId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
          te.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (te, result);
      }  
    }
    assembly {
      te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;    
  }

  function profileTypeWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.TypeEntity storage te) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    require(profileEntity.acstat != IACLCommons.ActivityStatus.NONE, "Profile Not Found");
    IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
    if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
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

  function profileTypeTryWriteSlot(ACLStorage.DataCollection storage data, bytes32 profileId, bytes32 agentId) internal view returns (IACLCommons.TypeEntity storage te, bool result) {
    IACLCommons.ProfileEntity storage profileEntity = data.profiles[profileId];
    if(profileEntity.acstat != IACLCommons.ActivityStatus.NONE) {
      IACLCommons.BaseAgent storage ba = profileEntity.agents[agentId];
      if(ba.atype == IACLCommons.AgentType.NONE || ba.atype == IACLCommons.AgentType.TYPE) {
        assembly {
          let ptr := mload(0x40)
          mstore(add(ptr, 0x00), agentId)
          mstore(add(ptr, 0x20), add(profileEntity.slot, 0))
          te.slot := keccak256(ptr, 0x40)      
        }
        result = true;
        return (te, result);
      }  
    }
    assembly {
      te.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    }
    result = false;
  }
}