/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MemberManager,
  MemberManagerInterface,
} from "../../../acl/agent/MemberManager";

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
        indexed: true,
        internalType: "bytes32",
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActivityStatus",
        name: "acstat",
        type: "uint8",
      },
    ],
    name: "MemberActivityUpdated",
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
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "adminId",
        type: "bytes32",
      },
    ],
    name: "MemberAdminUpdated",
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
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.AlterabilityStatus",
        name: "alstat",
        type: "uint8",
      },
    ],
    name: "MemberAlterabilityUpdated",
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
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "roleId",
        type: "bytes32",
      },
    ],
    name: "MemberRegistered",
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
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "typeLimit",
        type: "uint16",
      },
    ],
    name: "MemberTypeLimitUpdated",
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
        internalType: "bytes32",
        name: "memberId",
        type: "bytes32",
      },
    ],
    name: "memberCheckId",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "memberId",
        type: "bytes32",
      },
    ],
    name: "memberGetInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "adminId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "typeLimit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "typeCount",
            type: "uint16",
          },
          {
            internalType: "enum IAclCommons.AgentType",
            name: "atype",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
        ],
        internalType: "struct IMemberManagement.MemberInfo",
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
        internalType: "bytes32",
        name: "memberId",
        type: "bytes32",
      },
    ],
    name: "memberGetTypes",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "memberId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "typeId",
        type: "bytes32",
      },
    ],
    name: "memberHasType",
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
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "roleId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "typeLimit",
            type: "uint16",
          },
          {
            internalType: "enum IAclCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
        ],
        internalType: "struct IMemberManagement.MemberRegister[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberRegister",
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
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "enum IAclCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
        ],
        internalType: "struct IAclCommons.UpdateActivityRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberUpdateActivityStatus",
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
        ],
        internalType: "struct IAclCommons.UpdateAdminRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberUpdateAdmin",
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
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "enum IAclCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
        ],
        internalType: "struct IAclCommons.UpdateAlterabilityRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberUpdateAlterabilityStatus",
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
        components: [
          {
            internalType: "bytes32",
            name: "memberId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "typeLimit",
            type: "uint16",
          },
        ],
        internalType: "struct IMemberManagement.MemberUpdateTypeLimitRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberUpdateTypeLimit",
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
  "0x60a06040523060805234801561001457600080fd5b5060805161217561002d600039600050506121756000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063a1527251116100ad578063d6bbb66911610071578063d6bbb669146102ee578063db3762cc14610301578063e521078a14610314578063f0b15def1461033b578063fa3aa6711461036257600080fd5b8063a15272511461026e578063bc44c70214610281578063bdd705c3146102a1578063be27eb76146102b4578063d3511677146102db57600080fd5b806339879236116100f457806339879236146101bf5780634a6439e6146101d25780635e77904f146101f957806364d4c8191461022057806397dd8ac31461024757600080fd5b80630845c41f146101265780632966b1441461014e5780632980092b1461017157806334109de214610198575b600080fd5b61013b60008051602061212083398151915281565b6040519081526020015b60405180910390f35b61016161015c366004611d8c565b610382565b6040519015158152602001610145565b61013b7f0c2ec6dfb40ed328593366ca13bc89fb6d9a3334fbf8e723ee630b4b9313a91781565b61013b7f7aabe2571874f2a330ea11c8972d9cc3792d973efc6b36e3e29005861a34418881565b6101616101cd366004611df1565b6103b3565b61013b7f4242b81e2d1868d7576ac0e24487336f2f84650cda035e6109695a26f62c2fb281565b61013b7fe859c3d1186ace69d3a404881c4f4109d42acf94a53629bf2dd63467e4ab644681565b61013b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b61013b7fcd11a8517d237e2a0256b652eb6365c7ed4cb2dfdd08ff2f965a8e3b9761b6df81565b61016161027c366004611df1565b6104f1565b61029461028f366004611d8c565b610760565b6040516101459190611e70565b6101616102af366004611df1565b610894565b61013b7f80988c02545b103a5d943b2b41e624295096a7a298dd6e33294a3b6b4ae87ad381565b6101616102e9366004611eef565b610a36565b6101616102fc366004611df1565b611120565b61016161030f366004611f64565b611247565b61013b7f4e8224c4fa1ac41be2de8e18d7518792df95a1f71218550f2f2d6f1ca19bbfa481565b61013b7ffc434588684348dd50856b075c47bed14245c1030aa04c32955af5549981462781565b610375610370366004611d8c565b611281565b6040516101459190611f86565b6000600160008381526044602052604090206001015460ff1660038111156103ac576103ac611e33565b1492915050565b6000806103c6631cc3c91b60e11b6112c5565b905060006103d3336114af565b905060005b848110156104e35760006104088787848181106103f7576103f7611fca565b9050604002016000013584866114ee565b905086868381811061041c5761041c611fca565b90506040020160200160208101906104349190611fe0565b81600201601c6101000a81548161ffff021916908361ffff16021790555086868381811061046457610464611fca565b60400291909101359050337f6313ff5f29084e57501304ebadcc157aedea3c914e31ec3bf6648c3fb57aa1858989868181106104a2576104a2611fca565b90506040020160200160208101906104ba9190611fe0565b60405161ffff909116815260200160405180910390a350806104db8161201a565b9150506103d8565b506001925050505b92915050565b60008061050463a152725160e01b6112c5565b90506000610511336114af565b905060005b848110156104e35760006105358787848181106103f7576103f7611fca565b9050600087878481811061054b5761054b611fca565b90506040020160200135036106d857600060448189898681811061057157610571611fca565b90506040020160200135815260200190815260200160002090506001600381111561059e5761059e611e33565b600182015460ff1660038111156105b7576105b7611e33565b116105fd5760405162461bcd60e51b8152602060048201526011602482015270496c6c6567616c2041646d696e5479706560781b60448201526064015b60405180910390fd5b6002600182015460ff16600381111561061857610618611e33565b036106ab57600061063860446000805160206121208339815191526115a3565b905061066b89898681811061064f5761064f611fca565b905060400201602001358260060161169390919063ffffffff16565b6106a95760405162461bcd60e51b815260206004820152600f60248201526e125b1b1959d85b0810591b5a5b9259608a1b60448201526064016105f4565b505b8787848181106106bd576106bd611fca565b905060400201602001358260000160000181905550506106ea565b60008051602061212083398151915281555b8686838181106106fc576106fc611fca565b9050604002016020013587878481811061071857610718611fca565b6040805191029290920135913391507fd2e065bcd4d1c7b0bbb6c1d8f35c9bbb6d0e839a05ef546391707ce17f3eb01a90600090a450806107588161201a565b915050610516565b61079f6040805160e081018252600080825260208201819052918101829052606081018290529060808201908152602001600081526020016000905290565b6000806107ad6044856116ab565b91509150806107f8576040805160e0810182526000808252602082018190529181018290526060810182905290608082019081526020016000815260200160005b9052949350505050565b6040805160e0810182528354815260028401546001600160a01b0381166020830152600160e01b900461ffff16918101919091526060810161083c6003850161170b565b61ffff168152602001600081526001840154602090910190610100900460ff16600481111561086d5761086d611e33565b8152600184015460209091019062010000900460ff1660038111156107ee576107ee611e33565b6000806108a763bdd705c360e01b6112c5565b905060006108b4336114af565b905060005b848110156104e35760006108d88787848181106103f7576103f7611fca565b905060018787848181106108ee576108ee611fca565b90506040020160200160208101906109069190612033565b600481111561091757610917611e33565b116109575760405162461bcd60e51b815260206004820152601060248201526f496c6c6567616c20416374697669747960801b60448201526064016105f4565b86868381811061096957610969611fca565b90506040020160200160208101906109819190612033565b60018201805461ff0019166101008360048111156109a1576109a1611e33565b02179055508686838181106109b8576109b8611fca565b60400291909101359050337f06b789b822e2581aa4e79c81b84ed1ccc1a5c2741e97b3d74e0e7e980480bca28989868181106109f6576109f6611fca565b9050604002016020016020810190610a0e9190612033565b604051610a1b9190612054565b60405180910390a35080610a2e8161201a565b9150506108b9565b600080610a4963d351167760e01b6112c5565b90506000610a56336114af565b905060005b848110156104e3576000610a97878784818110610a7a57610a7a611fca565b905060a002016020016020810190610a929190612062565b6114af565b905060008082815260446020526040902060010154610100900460ff166004811115610ac557610ac5611e33565b14610b035760405162461bcd60e51b815260206004820152600e60248201526d416c72656164792045786973747360901b60448201526064016105f4565b6001878784818110610b1757610b17611fca565b905060a002016040016020810190610b2f9190611fe0565b61ffff161015610b755760405162461bcd60e51b8152602060048201526011602482015270125b1b1959d85b08151e5c19531a5b5a5d607a1b60448201526064016105f4565b6001878784818110610b8957610b89611fca565b905060a002016060016020810190610ba19190612033565b6004811115610bb257610bb2611e33565b11610bf25760405162461bcd60e51b815260206004820152601060248201526f496c6c6567616c20416374697669747960801b60448201526064016105f4565b6000878784818110610c0657610c06611fca565b905060a002016080016020810190610c1e919061208b565b6003811115610c2f57610c2f611e33565b11610c735760405162461bcd60e51b8152602060048201526014602482015273496c6c6567616c20416c7465726162696c69747960601b60448201526064016105f4565b6000610c9b888885818110610c8a57610c8a611fca565b60449260a090910201359050611715565b9050600180820154610100900460ff166004811115610cbc57610cbc611e33565b11610cf85760405162461bcd60e51b815260206004820152600c60248201526b149bdb194811195b195d195960a21b60448201526064016105f4565b6002600182015462010000900460ff166003811115610d1957610d19611e33565b1015610d5d5760405162461bcd60e51b8152602060048201526013602482015272496c6c6567616c20526f6c652055706461746560681b60448201526064016105f4565b600581015463ffffffff64010000000082048116911610610db35760405162461bcd60e51b815260206004820152601060248201526f24b63632b3b0b6102932b3b4b9ba32b960811b60448201526064016105f4565b6000610dcd826003015460446115a390919063ffffffff16565b9050600180820154610100900460ff166004811115610dee57610dee611e33565b11610e2a5760405162461bcd60e51b815260206004820152600c60248201526b151e5c194811195b195d195960a21b60448201526064016105f4565b6002600182015462010000900460ff166003811115610e4b57610e4b611e33565b1015610e8f5760405162461bcd60e51b8152602060048201526013602482015272496c6c6567616c20547970652055706461746560681b60448201526064016105f4565b8054610e9c9086886117fe565b610ed45760405162461bcd60e51b81526020600482015260096024820152682337b93134b23232b760b91b60448201526064016105f4565b888885818110610ee657610ee6611fca565b60008681526005808601602052604090912060a090920293909301359055508201805460019190600490610f2a90849063ffffffff640100000000909104166120ac565b92506101000a81548163ffffffff021916908363ffffffff1602179055506000610f5e846044611b1e90919063ffffffff16565b60008051602061212083398151915281556001808201805460ff191690911790559050898986818110610f9357610f93611fca565b905060a002016060016020810190610fab9190612033565b60018201805461ff001916610100836004811115610fcb57610fcb611e33565b0217905550898986818110610fe257610fe2611fca565b905060a002016080016020810190610ffa919061208b565b60018201805462ff000019166201000083600381111561101c5761101c611e33565b021790555089898681811061103357611033611fca565b905060a00201602001602081019061104b9190612062565b6002820180546001600160a01b0319166001600160a01b039290921691909117905560038381015461107f91830190611bce565b5089898681811061109257611092611fca565b905060a0020160200160208101906110aa9190612062565b6001600160a01b031684337f366886a8b01efdf32108d7577960775b793cef92ffb466d6863a2bd61d7752438d8d8a8181106110e8576110e8611fca565b905060a002016000013560405161110191815260200190565b60405180910390a45050505080806111189061201a565b915050610a5b565b60008061113363d6bbb66960e01b6112c5565b90506000611140336114af565b905060005b848110156104e35760006111648787848181106103f7576103f7611fca565b905086868381811061117857611178611fca565b9050604002016020016020810190611190919061208b565b60018201805462ff00001916620100008360038111156111b2576111b2611e33565b02179055508686838181106111c9576111c9611fca565b60400291909101359050337f824333a0ecff9cffe8512433ee440baab06dfb39a89a27b048c8143bbc18d9fb89898681811061120757611207611fca565b905060400201602001602081019061121f919061208b565b60405161122c91906120c9565b60405180910390a3508061123f8161201a565b915050611145565b600080806112566044866116ab565b9150915080156112765761126d6003830185611693565b925050506104eb565b506000949350505050565b60606000806112916044856116ab565b91509150806112b157505060408051600081526020810190915292915050565b6112bd82600301611bda565b949350505050565b60006001306001600160a01b031663a304e3536040518163ffffffff1660e01b81526004016020604051808303816000875af1158015611309573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132d91906120dc565b600281111561133e5761133e611e33565b146113765760405162461bcd60e51b815260206004820152600860248201526714995a9958dd195960c21b60448201526064016105f4565b6394c7f74160e01b600090815260496020527fe8d7c86d0feb44e1615eba69a48ff215dd428561b116c03a5562cb90c1047808546001600160a01b03169061140982856040516bffffffffffffffffffffffff19606084901b1660208201526001600160e01b03198216603482015260009060380160405160208183030381529060405280519060200120905092915050565b60405163db83423d60e01b815260048101829052909150309063db83423d90602401602060405180830381865afa158015611448573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061146c91906120fd565b6114a85760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc811195b9a5959609a1b60448201526064016105f4565b9392505050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6000806114fc604486611be5565b90506002600182015462010000900460ff16600381111561151f5761151f611e33565b101561155e5760405162461bcd60e51b815260206004820152600e60248201526d496c6c6567616c2055706461746560901b60448201526064016105f4565b805461156b9085856117fe565b6112bd5760405162461bcd60e51b81526020600482015260096024820152682337b93134b23232b760b91b60448201526064016105f4565b60008181526020839052604081206003600182015460ff1660038111156115cc576115cc611e33565b036115e9576040805184815260018601602082015220915061168c565b6000600182015460ff16600381111561160457611604611e33565b036116445760405162461bcd60e51b815260206004820152601060248201526f151e5c19525908139bdd08119bdd5b9960821b60448201526064016105f4565b60405162461bcd60e51b815260206004820152601960248201527f496e76616c696420547970654964204167656e7420536c6f740000000000000060448201526064016105f4565b5092915050565b600081815260018301602052604081205415156114a8565b6000818152602083905260408120819060015b600182015460ff1660038111156116d7576116d7611e33565b036116f957604080518581526001878101602083015291902093509150611703565b6000199250600091505b509250929050565b60006104eb825490565b60008181526020839052604081206002600182015460ff16600381111561173e5761173e611e33565b0361175b576040805184815260018601602082015220915061168c565b6000600182015460ff16600381111561177657611776611e33565b036117b65760405162461bcd60e51b815260206004820152601060248201526f149bdb19525908139bdd08119bdd5b9960821b60448201526064016105f4565b60405162461bcd60e51b815260206004820152601960248201527f496e76616c696420526f6c654964204167656e7420536c6f740000000000000060448201526064016105f4565b6000808061180d604485611c87565b9150915080611821576000925050506114a8565b60008681526044602052604090206001015460ff16600281600381111561184a5761184a611e33565b036119b45760008061185d60448a611cb3565b9150915080158061188c575060046001830154610100900460ff16600481111561188957611889611e33565b14155b1561189f576000955050505050506114a8565b6000806118ba84600301546044611cca90919063ffffffff16565b915091508015806118e9575060046001830154610100900460ff1660048111156118e6576118e6611e33565b14155b156118fe5760009750505050505050506114a8565b60008a81526005830160205260409020548b146119255760009750505050505050506114a8565b60008b815260476020908152604080832054835260469091529020600460038201546601000000000000900460ff16600481111561196557611965611e33565b14801561198d57506004880154600382015460ff640100000000928390048116929091041610155b156119a3576000985050505050505050506114a8565b6001985050505050505050506114a8565b60038160038111156119c8576119c8611e33565b03611b11576000806119db60448a611cca565b91509150801580611a0a575060046001830154610100900460ff166004811115611a0757611a07611e33565b14155b15611a1d576000955050505050506114a8565b60008881526005830160205260408120549080611a3b604484611cb3565b91509150801580611a6a575060046001830154610100900460ff166004811115611a6757611a67611e33565b14155b15611a80576000985050505050505050506114a8565b600083815260476020908152604080832054835260469091529020600460038201546601000000000000900460ff166004811115611ac057611ac0611e33565b148015611ae857506004890154600382015460ff640100000000928390048116929091041610155b15611aff57600099505050505050505050506114a8565b600199505050505050505050506114a8565b5060009695505050505050565b600081815260208390526040812081600182015460ff166003811115611b4657611b46611e33565b1480611b69575060018082015460ff166003811115611b6757611b67611e33565b145b15611b86576040805184815260018601602082015220915061168c565b60405162461bcd60e51b815260206004820152601b60248201527f496e76616c6964204d656d6265724964204167656e7420536c6f74000000000060448201526064016105f4565b60006114a88383611ce1565b60606104eb82611d30565b600081815260208390526040812060018082015460ff166003811115611c0d57611c0d611e33565b03611c2a576040805184815260018601602082015220915061168c565b6000600182015460ff166003811115611c4557611c45611e33565b03611b865760405162461bcd60e51b815260206004820152601260248201527113595b58995c925908139bdd08119bdd5b9960721b60448201526064016105f4565b60008181526001808401602052604082208291600182015460ff1660058111156116d7576116d7611e33565b6000818152602083905260408120819060026116be565b6000818152602083905260408120819060036116be565b6000818152600183016020526040812054611d28575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104eb565b5060006104eb565b606081600001805480602002602001604051908101604052809291908181526020018280548015611d8057602002820191906000526020600020905b815481526020019060010190808311611d6c575b50505050509050919050565b600060208284031215611d9e57600080fd5b5035919050565b60008083601f840112611db757600080fd5b50813567ffffffffffffffff811115611dcf57600080fd5b6020830191508360208260061b8501011115611dea57600080fd5b9250929050565b60008060208385031215611e0457600080fd5b823567ffffffffffffffff811115611e1b57600080fd5b611e2785828601611da5565b90969095509350505050565b634e487b7160e01b600052602160045260246000fd5b60048110611e5957611e59611e33565b50565b60058110611e6c57611e6c611e33565b9052565b815181526020808301516001600160a01b03169082015260408083015161ffff9081169183019190915260608084015190911690820152608082015160e0820190611eba81611e49565b8060808401525060a0830151611ed360a0840182611e5c565b5060c0830151611ee281611e49565b8060c08401525092915050565b60008060208385031215611f0257600080fd5b823567ffffffffffffffff80821115611f1a57600080fd5b818501915085601f830112611f2e57600080fd5b813581811115611f3d57600080fd5b86602060a083028501011115611f5257600080fd5b60209290920196919550909350505050565b60008060408385031215611f7757600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015611fbe57835183529284019291840191600101611fa2565b50909695505050505050565b634e487b7160e01b600052603260045260246000fd5b600060208284031215611ff257600080fd5b813561ffff811681146114a857600080fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161202c5761202c612004565b5060010190565b60006020828403121561204557600080fd5b8135600581106114a857600080fd5b602081016104eb8284611e5c565b60006020828403121561207457600080fd5b81356001600160a01b03811681146114a857600080fd5b60006020828403121561209d57600080fd5b8135600481106114a857600080fd5b63ffffffff81811683821601908082111561168c5761168c612004565b602081016120d683611e49565b91905290565b6000602082840312156120ee57600080fd5b8151600381106114a857600080fd5b60006020828403121561210f57600080fd5b815180151581146114a857600080fdfe4735b54f2202663457a46a8362da56ec0a50bd2b0184171c7408a03311c611b3a2646970667358221220693acdef3c1e140caae484f9463c3269c4722b4f62f00719769c958dcdceb4d564736f6c63430008110033";

type MemberManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MemberManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MemberManager__factory extends ContractFactory {
  constructor(...args: MemberManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MemberManager> {
    return super.deploy(overrides || {}) as Promise<MemberManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MemberManager {
    return super.attach(address) as MemberManager;
  }
  override connect(signer: Signer): MemberManager__factory {
    return super.connect(signer) as MemberManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MemberManagerInterface {
    return new utils.Interface(_abi) as MemberManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MemberManager {
    return new Contract(address, _abi, signerOrProvider) as MemberManager;
  }
}
