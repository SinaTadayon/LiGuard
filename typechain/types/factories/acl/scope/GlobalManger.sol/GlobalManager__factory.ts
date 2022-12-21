/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  GlobalManager,
  GlobalManagerInterface,
} from "../../../../acl/scope/GlobalManger.sol/GlobalManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agentId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "AgentReferredByPolicyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agentId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "scopeId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "AgentReferredByScopeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActivityStatus",
        name: "acstat",
        type: "uint8",
      },
    ],
    name: "GlobalActivityUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "adminId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.AgentType",
        name: "adminType",
        type: "uint8",
      },
    ],
    name: "GlobalAdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "agentLimit",
        type: "uint16",
      },
    ],
    name: "GlobalAgentLimitUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.AlterabilityStatus",
        name: "alstat",
        type: "uint8",
      },
    ],
    name: "GlobalAlterabilityUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "domainLimit",
        type: "uint16",
      },
    ],
    name: "GlobalDomainLimitUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "ProxyUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "scopeId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agentId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "ScopeReferredByAgentUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "scopeId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "ScopeReferredByPolicyUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "CTX_MESSAGE_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_ADMIN_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_AGENT_MASTER_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_ANONYMOUSE_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_ANY_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_POLICY_MASTER_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_SCOPE_MASTER_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIVELY_VERSE_SYSTEM_ADMIN_TYPE_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PREDICT_CTX_MESSAGE_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TYPE_HASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "globalCheckAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalGetDomains",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalGetInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "adminId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "domainLimit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "agentLimit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "referredByAgent",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "referredByPolicy",
            type: "uint16",
          },
          {
            internalType: "enum IAclCommons.AgentType",
            name: "adminType",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AlterabilityStatus",
            name: "alstate",
            type: "uint8",
          },
        ],
        internalType: "struct IGlobalManagement.GlobalInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAclCommons.ActivityStatus",
        name: "acstat",
        type: "uint8",
      },
    ],
    name: "globalUpdateActivityStatus",
    outputs: [
      {
        internalType: "enum IAclCommons.ActivityStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newAdminId",
        type: "bytes32",
      },
    ],
    name: "globalUpdateAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "agentLimit",
        type: "uint16",
      },
    ],
    name: "globalUpdateAgentLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAclCommons.AlterabilityStatus",
        name: "alstat",
        type: "uint8",
      },
    ],
    name: "globalUpdateAlterabilityStatus",
    outputs: [
      {
        internalType: "enum IAclCommons.AlterabilityStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "domainLimit",
        type: "uint16",
      },
    ],
    name: "globalUpdateDomainLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5060805161150661002d600039600050506115066000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806371e00919116100a2578063be27eb7611610071578063be27eb76146102df578063d4cddf7114610306578063e521078a14610319578063f0b15def14610340578063fb9702fc1461036757600080fd5b806371e00919146102705780637a339d3b1461028557806397dd8ac3146102a5578063b0092819146102cc57600080fd5b8063436266d6116100e9578063436266d6146101b85780634a36c824146101d85780634a6439e6146101fb5780635e77904f1461022257806364d4c8191461024957600080fd5b80630845c41f1461011b5780632980092b1461015557806334109de21461017c5780633ed50eb6146101a3575b600080fd5b6101427f4735b54f2202663457a46a8362da56ec0a50bd2b0184171c7408a03311c611b381565b6040519081526020015b60405180910390f35b6101427f0c2ec6dfb40ed328593366ca13bc89fb6d9a3334fbf8e723ee630b4b9313a91781565b6101427f7aabe2571874f2a330ea11c8972d9cc3792d973efc6b36e3e29005861a34418881565b6101ab61037a565b60405161014c9190611298565b6101cb6101c63660046112dc565b61038b565b60405161014c9190611327565b6101eb6101e6366004611335565b61048f565b604051901515815260200161014c565b6101427f4242b81e2d1868d7576ac0e24487336f2f84650cda035e6109695a26f62c2fb281565b6101427fe859c3d1186ace69d3a404881c4f4109d42acf94a53629bf2dd63467e4ab644681565b6101427f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b61027861050f565b60405161014c9190611375565b610298610293366004611417565b61062d565b60405161014c9190611438565b6101427fcd11a8517d237e2a0256b652eb6365c7ed4cb2dfdd08ff2f965a8e3b9761b6df81565b6101eb6102da366004611335565b6106be565b6101427f80988c02545b103a5d943b2b41e624295096a7a298dd6e33294a3b6b4ae87ad381565b6101eb61031436600461144b565b6107f0565b6101427f4e8224c4fa1ac41be2de8e18d7518792df95a1f71218550f2f2d6f1ca19bbfa481565b6101427ffc434588684348dd50856b075c47bed14245c1030aa04c32955af5549981462781565b6101eb610375366004611474565b610844565b60606103866050610aa0565b905090565b60008061039e6321b1336b60e11b610ab1565b905060006103ab33610c9b565b90506103b78183610cda565b60018460048111156103cb576103cb6112fd565b1161041d5760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c2041637469766974792053746174757300000000000000000060448201526064015b60405180910390fd5b604d805485919061ff00191661010083600481111561043e5761043e6112fd565b0217905550604d5460405133917f6bd7f4b975a7fc95b35700ac35f062bdbef4091e43866f7ce81d195d103321f19161047f91610100900460ff1690611327565b60405180910390a2509192915050565b6000806104a263128db20960e21b610ab1565b905060006104af33610c9b565b90506104bb8183610cda565b604f805461ffff191661ffff861690811790915560405190815233907fdf162d9f21280e8292227edb3d1299a14fe051d1acf19ba928bdd732a33351a5906020015b60405180910390a25060019392505050565b61055d6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a081018290529060c08201908152602001600081526020016000905290565b6040805161012081018252604e548152604c546020808301829052604f5461ffff90811684860152604d54600160381b81048216606086015263010000008104821660808601526501000000000090041660a0840152600091825260449052919091206001015460c082019060ff1660038111156105dd576105dd6112fd565b8152604d54602090910190610100900460ff166004811115610601576106016112fd565b8152604d5460209091019062010000900460ff166003811115610626576106266112fd565b9052919050565b6000806106406321b1336b60e11b610ab1565b9050600061064d33610c9b565b90506106598183610cda565b604d805485919062ff000019166201000083600381111561067c5761067c6112fd565b0217905550604d5460405133917fc979f2fb3e55b0cc96c8b78627ec4adb3864c2805c5b51f68f90add57741edb39161047f9162010000900460ff1690611438565b60006001306001600160a01b031663a304e3536040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610702573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610726919061148d565b6002811115610737576107376112fd565b1461076f5760405162461bcd60e51b815260206004820152600860248201526714995a9958dd195960c21b6044820152606401610414565b600061078163128db20960e21b610ab1565b9050600061078e33610c9b565b905061079a8183610cda565b604d805468ffff000000000000001916600160381b61ffff87169081029190911790915560405190815233907f27ed33ee5222c54b3755aaf5d07acf900c3ff586df893a8b2df307a4113dc0ea906020016104fd565b6000806107fc83610c9b565b9050600061082b60447fcd11a8517d237e2a0256b652eb6365c7ed4cb2dfdd08ff2f965a8e3b9761b6df610d89565b6000928352600501602052506040902054151592915050565b600080610857633ee5c0bf60e21b610ab1565b9050600061086433610c9b565b90506108708183610cda565b604c54841480159061088157508315155b6108c05760405162461bcd60e51b815260206004820152601060248201526f125b1b1959d85b0810591b5a5b881a5960821b6044820152606401610414565b600084815260446020526040902060018082015460ff1660038111156108e8576108e86112fd565b116109355760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c2041646d696e204167656e74547970650000000000000000006044820152606401610414565b6002600182015460ff166003811115610950576109506112fd565b036109da57600061098260447f4735b54f2202663457a46a8362da56ec0a50bd2b0184171c7408a03311c611b3610d89565b60008781526007820160205260409020549091506109d45760405162461bcd60e51b815260206004820152600f60248201526e10591b5a5b88139bdd08119bdd5b99608a1b6044820152606401610414565b50610a3d565b847f4735b54f2202663457a46a8362da56ec0a50bd2b0184171c7408a03311c611b314610a3d5760405162461bcd60e51b815260206004820152601160248201527024b63632b3b0b6102732bb9020b236b4b760791b6044820152606401610414565b604c85905560008581526044602052604090819020600101549051869133917f32bf2574b9c357f7985d77669881d7bdae7e73198488e2f2f8712380d980ee6591610a8d9160ff90911690611438565b60405180910390a3506001949350505050565b6060610aab82610e79565b92915050565b60006001306001600160a01b031663a304e3536040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610af5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b19919061148d565b6002811115610b2a57610b2a6112fd565b14610b625760405162461bcd60e51b815260206004820152600860248201526714995a9958dd195960c21b6044820152606401610414565b635180e0f960e11b600090815260496020527f61ef4ea36f055b9998fc4ec6c68205a528b20efaa3265e68e57f295751783536546001600160a01b031690610bf582856040516bffffffffffffffffffffffff19606084901b1660208201526001600160e01b03198216603482015260009060380160405160208183030381529060405280519060200120905092915050565b60405163db83423d60e01b815260048101829052909150309063db83423d90602401602060405180830381865afa158015610c34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5891906114ae565b610c945760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc811195b9a5959609a1b6044820152606401610414565b9392505050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6002604d5462010000900460ff166003811115610cf957610cf96112fd565b1015610d3f5760405162461bcd60e51b8152602060048201526015602482015274496c6c6567616c20476c6f62616c2055706461746560581b6044820152606401610414565b604c54610d4d908383610ed5565b610d855760405162461bcd60e51b81526020600482015260096024820152682337b93134b23232b760b91b6044820152606401610414565b5050565b60008181526020839052604081206003600182015460ff166003811115610db257610db26112fd565b03610dcf5760408051848152600186016020820152209150610e72565b6000600182015460ff166003811115610dea57610dea6112fd565b03610e2a5760405162461bcd60e51b815260206004820152601060248201526f151e5c19525908139bdd08119bdd5b9960821b6044820152606401610414565b60405162461bcd60e51b815260206004820152601960248201527f496e76616c696420547970654964204167656e7420536c6f74000000000000006044820152606401610414565b5092915050565b606081600001805480602002602001604051908101604052809291908181526020018280548015610ec957602002820191906000526020600020905b815481526020019060010190808311610eb5575b50505050509050919050565b60008080610ee46044856111f5565b9150915080610ef857600092505050610c94565b60008681526044602052604090206001015460ff166002816003811115610f2157610f216112fd565b0361108b57600080610f3460448a611255565b91509150801580610f63575060046001830154610100900460ff166004811115610f6057610f606112fd565b14155b15610f7657600095505050505050610c94565b600080610f918460030154604461128190919063ffffffff16565b91509150801580610fc0575060046001830154610100900460ff166004811115610fbd57610fbd6112fd565b14155b15610fd5576000975050505050505050610c94565b60008a81526005830160205260409020548b14610ffc576000975050505050505050610c94565b60008b815260476020908152604080832054835260469091529020600460038201546601000000000000900460ff16600481111561103c5761103c6112fd565b14801561106457506004880154600382015460ff640100000000928390048116929091041610155b1561107a57600098505050505050505050610c94565b600198505050505050505050610c94565b600381600381111561109f5761109f6112fd565b036111e8576000806110b260448a611281565b915091508015806110e1575060046001830154610100900460ff1660048111156110de576110de6112fd565b14155b156110f457600095505050505050610c94565b60008881526005830160205260408120549080611112604484611255565b91509150801580611141575060046001830154610100900460ff16600481111561113e5761113e6112fd565b14155b1561115757600098505050505050505050610c94565b600083815260476020908152604080832054835260469091529020600460038201546601000000000000900460ff166004811115611197576111976112fd565b1480156111bf57506004890154600382015460ff640100000000928390048116929091041610155b156111d65760009950505050505050505050610c94565b60019950505050505050505050610c94565b5060009695505050505050565b60008181526001808401602052604082208291600182015460ff166005811115611221576112216112fd565b036112435760408051858152600187810160208301529190209350915061124d565b6000199250600091505b509250929050565b6000818152602083905260408120819060025b600182015460ff166003811115611221576112216112fd565b600081815260208390526040812081906003611268565b6020808252825182820181905260009190848201906040850190845b818110156112d0578351835292840192918401916001016112b4565b50909695505050505050565b6000602082840312156112ee57600080fd5b813560058110610c9457600080fd5b634e487b7160e01b600052602160045260246000fd5b60058110611323576113236112fd565b9052565b60208101610aab8284611313565b60006020828403121561134757600080fd5b813561ffff81168114610c9457600080fd5b60048110611369576113696112fd565b50565b61132381611359565b6000610120820190508251825260208301516020830152604083015161ffff8082166040850152806060860151166060850152505060808301516113bf608084018261ffff169052565b5060a08301516113d560a084018261ffff169052565b5060c08301516113e860c084018261136c565b5060e08301516113fb60e0840182611313565b506101008084015161140f8285018261136c565b505092915050565b60006020828403121561142957600080fd5b813560048110610c9457600080fd5b6020810161144583611359565b91905290565b60006020828403121561145d57600080fd5b81356001600160a01b0381168114610c9457600080fd5b60006020828403121561148657600080fd5b5035919050565b60006020828403121561149f57600080fd5b815160038110610c9457600080fd5b6000602082840312156114c057600080fd5b81518015158114610c9457600080fdfea2646970667358221220a1952287661f8110c641487779ad4df370126b7145110c84d2f6c9326d0a9f5664736f6c63430008110033";

type GlobalManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GlobalManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GlobalManager__factory extends ContractFactory {
  constructor(...args: GlobalManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GlobalManager> {
    return super.deploy(overrides || {}) as Promise<GlobalManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GlobalManager {
    return super.attach(address) as GlobalManager;
  }
  override connect(signer: Signer): GlobalManager__factory {
    return super.connect(signer) as GlobalManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GlobalManagerInterface {
    return new utils.Interface(_abi) as GlobalManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GlobalManager {
    return new Contract(address, _abi, signerOrProvider) as GlobalManager;
  }
}
