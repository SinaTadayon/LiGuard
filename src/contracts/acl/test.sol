// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "./AccessControlStorage.sol";
import "../lib/struct/LEnumerableSet.sol";
import "hardhat/console.sol";

/**
 * @title Abstract Access Control Storage Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract Test is AccessControlStorage {
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  function init() public {
    bytes4 fcSelector = 0x12345678;
    bytes32 adminId = 0x1111111111111111111111111111111122222222222222222222222222222222;
    bytes32 ctxId = 0x112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00;
    bytes32 fcId = keccak256(abi.encode(ctxId, fcSelector));
    BaseScope memory bs = BaseScope({
      adminId: adminId,
      acstat: ActivityStatus.ENABLE,
      alstat: AlterabilityStatus.DISABLE,
      stype: ScopeType.CONTEXT
    });

    Function storage fc = writeFunction(fcId, bs, ctxId, fcSelector);
    fc.agents.add(adminId);
    console.log("fc.baseScope.adminId: ");
    console.logBytes32(fc.baseScope.adminId);

    console.log("_data.scopes[fcId].adminId: ");
    console.logBytes32(_data.scopes[fcId].adminId); 

    Function storage fc1 = readFunction(fcId);
    console.log("fc1.baseScope.adminId: ");
    console.logBytes32(fc1.baseScope.adminId);

    console.log("fc1.contextId: ");
    console.logBytes32(fc1.contextId);

    console.log("fc1.agents: ");
    console.logBytes32(fc1.agents.at(0));
  }

  function readFunction(bytes32 scopeId) internal view returns (Function storage fc) {
    BaseScope storage bs = _data.scopes[scopeId];
    if(bs.stype == ScopeType.FUNCTION) {
      assembly {
        let ptr := mload(0x40)
        mstore(add(ptr, 0x00), scopeId)
        mstore(add(ptr, 0x20), add(_data.slot, 1))
        fc.slot := keccak256(ptr, 0x40)      
      }
    } else {
      assembly {
        fc.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      }
    } 

  }

  function writeFunction(bytes32 scopeId, BaseScope memory bs, bytes32 ctxId, bytes4 fcSelector) internal returns (Function storage fc) {
    uint dataSlot;

    assembly {
      let ptr := mload(0x40)
      dataSlot := _data.slot
      // mstore(0x40, add(ptr, 0x40))
      mstore(add(ptr, 0x00), scopeId)
      mstore(add(ptr, 0x20), add(dataSlot, 1))
      let slot := keccak256(ptr, 0x40)      
      fc.slot := slot
    }

    console.log("data slot: %d", dataSlot);
    fc.baseScope = bs;
    fc.contextId = ctxId;
    fc.functionId = scopeId;
    fc.selector = fcSelector;
  
  }

}