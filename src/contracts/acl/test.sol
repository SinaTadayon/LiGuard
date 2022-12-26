// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

// import "./ACLStorage.sol";
// import "../lib/struct/LEnumerableSet.sol";
// import "hardhat/console.sol";

// /**
//  * @title Abstract Access Control Storage Contract
//  * @author Sina Tadayon, https://github.com/SinaTadayon
//  * @dev
//  *
//  */
// contract Test is ACLStorage {
//   using LEnumerableSet for LEnumerableSet.Bytes32Set;

//   function init() public {
//     bytes4 fcSelector = 0x12345678;
//     bytes32 adminId = 0x1111111111111111111111111111111122222222222222222222222222222222;
//     bytes32 ctxId = 0x112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00;
//     bytes32 fcId = keccak256(abi.encode(ctxId, fcSelector));
//     BaseScope memory bs = BaseScope({

//       adminId: adminId,
//       acstat: ActivityStatus.ENABLED,
//       alstat: AlterabilityStatus.DISABLED,
//       stype: ScopeType.FUNCTION,
//       referredByAgent: 0, 
//       referredByPolicy: 0, 
//       agentLimit: 0
//     });

//     FunctionEntity storage fc = functionWriteSlot(fcId);
//     fc.bs = bs;
//     fc.contextId = ctxId;
//     fc.selector = fcSelector;

//     FunctionEntity storage fc1 = functionReadSlot(fcId);
//     console.log("fc1.baseScope.adminId: ");
//     console.logBytes32(fc1.bs.adminId);


//     // FunctionEntity storage fc = writeFunction(fcId, bs, ctxId, fcSelector);
//     // fc.agents.add(adminId);
//     // console.log("fc.baseScope.adminId: ");
//     // console.logBytes32(fc.bs.adminId);

//     // console.log("_data.scopes[fcId].adminId: ");
//     // console.logBytes32(_data.scopes[fcId].adminId); 

//     // FunctionEntity storage fc1 = readFunction(fcId);
//     // console.log("fc1.baseScope.adminId: ");
//     // console.logBytes32(fc1.bs.adminId);

//     // console.log("fc1.contextId: ");
//     // console.logBytes32(fc1.contextId);

//     // console.log("fc1.selector: ");
//     // console.logBytes4(fc1.selector);
  

//     // console.log("fc1.agents: ");
//     // console.logBytes32(fc1.agents.at(0));
//   }


//   function functionWriteSlot(bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fc) {
//     IACLCommons.BaseScope storage bs = _data.scopes[scopeId];
//     if(bs.stype == IACLCommons.ScopeType.NONE || bs.stype == IACLCommons.ScopeType.FUNCTION) {
//       assembly {
//         let ptr := mload(0x40)
//         mstore(add(ptr, 0x00), scopeId)
//         mstore(add(ptr, 0x20), add(_data.slot, 1))
//         let slot := keccak256(ptr, 0x40)      
//         fc.slot := slot
//       }
//     } else {
//       revert("Illegal FID Slot");
//     }  
//   }

//    function functionReadSlot(bytes32 scopeId) internal view returns (IACLCommons.FunctionEntity storage fc) {
//     IACLCommons.BaseScope storage bs = _data.scopes[scopeId];
//     if(bs.stype == IACLCommons.ScopeType.FUNCTION) {
//       assembly {
//         let ptr := mload(0x40)
//         mstore(add(ptr, 0x00), scopeId)
//         mstore(add(ptr, 0x20), add(_data.slot, 1))
//         fc.slot := keccak256(ptr, 0x40)      
//       }
//     }  else if(bs.stype == IACLCommons.ScopeType.NONE) {
//       revert("FID Not Found");
//     } else {
//       revert("Illeagl FID Slot");
//     } 
//   }

//   function readFunction(bytes32 scopeId) internal view returns (FunctionEntity storage fc) {
//     uint dataSlot;
//     uint scopeSlot;
//     uint testSlot;
//     // BaseScope storage bs = _data.scopes[scopeId];
//     // console.log("admin: ");
//     // console.logBytes32(bs.adminId);
//     // if(bs.stype == ScopeType.FUNCTION) {
//       assembly {
//         let ptr := mload(0x40)
//         mstore(add(ptr, 0x00), scopeId)
//         mstore(add(ptr, 0x20), add(_data.slot, 2))
//         fc.slot := keccak256(ptr, 0x40)
//         dataSlot := _data.slot
//         scopeSlot := fc.slot
//         testSlot := _test.slot
//       }
//     // } else {
//     //   assembly {
//     //     fc.slot := 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
//     //   }
//     // } 

//      console.log("data slot: %d", dataSlot);
//      console.log("data scope slot: %d", scopeSlot);
//      console.log("test slot: %d", testSlot);

//   }

//   function writeFunction(bytes32 scopeId, BaseScope memory bs, bytes32 ctxId, bytes4 fcSelector) internal returns (FunctionEntity storage fc) {
//     uint dataSlot;
//     uint scopeSlot;

//     assembly {
//       let ptr := mload(0x40)
//       dataSlot := _data.slot
//       // mstore(0x40, add(ptr, 0x40))
//       mstore(add(ptr, 0x00), scopeId)
//       mstore(add(ptr, 0x20), add(dataSlot, 2))
//       let slot := keccak256(ptr, 0x40)      
//       fc.slot := slot
//       scopeSlot := slot
//     }

//     console.log("data slot: %d", dataSlot);
//     console.log("scope slot: %d", scopeSlot);
//     fc.bs = bs;
//     fc.contextId = ctxId;
//     // fc.functionId = scopeId;
//     fc.selector = fcSelector;
  
//   }
// }