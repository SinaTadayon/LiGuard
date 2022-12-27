/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IContextManagement,
  IContextManagementInterface,
} from "../../../acl/scope/IContextManagement";

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
        internalType: "enum IACLCommons.ActionType",
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
        internalType: "enum IACLCommons.ActionType",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IACLCommons.ActivityStatus",
        name: "acstat",
        type: "uint8",
      },
    ],
    name: "ContextActivityUpdated",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "adminId",
        type: "bytes32",
      },
    ],
    name: "ContextAdminUpdated",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "agentLimit",
        type: "uint16",
      },
    ],
    name: "ContextAgentLimitUpdated",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IACLCommons.AlterabilityStatus",
        name: "alstat",
        type: "uint8",
      },
    ],
    name: "ContextAlterabilityUpdated",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subject",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "adminId",
        type: "bytes32",
      },
    ],
    name: "ContextRegistered",
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
        internalType: "enum IACLCommons.ActionType",
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
        internalType: "enum IACLCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "ScopeReferredByPolicyUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractId",
        type: "address",
      },
    ],
    name: "contextCheckAccount",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "contextCheckAdmin",
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
        name: "contextId",
        type: "bytes32",
      },
    ],
    name: "contextCheckId",
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
        internalType: "bytes32[]",
        name: "requests",
        type: "bytes32[]",
      },
    ],
    name: "contextDeleteActivity",
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
        internalType: "bytes32",
        name: "contextId",
        type: "bytes32",
      },
    ],
    name: "contextGetFunctions",
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
        name: "contextId",
        type: "bytes32",
      },
    ],
    name: "contextGetInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "realmId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "adminId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
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
            internalType: "enum IACLCommons.AgentType",
            name: "adminType",
            type: "uint8",
          },
          {
            internalType: "enum IACLCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IACLCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
        ],
        internalType: "struct IContextManagement.ContextInfo",
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
        name: "contextId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "functionId",
        type: "bytes32",
      },
    ],
    name: "contextHasFunction",
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
        internalType: "address",
        name: "contractId",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "contextHasSelector",
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
            name: "realmId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "adminId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
          },
          {
            internalType: "address",
            name: "subject",
            type: "address",
          },
          {
            internalType: "address",
            name: "deployer",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "agentLimit",
            type: "uint16",
          },
          {
            internalType: "enum IACLCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IACLCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct IContextManagement.ContextRegisterRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "contextRegister",
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
            internalType: "enum IACLCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
        ],
        internalType: "struct IACLCommons.UpdateActivityRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "contextUpdateActivityStatus",
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
        internalType: "struct IACLCommons.UpdateAdminRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "contextUpdateAdmin",
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
            name: "scopeId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "agentLimit",
            type: "uint16",
          },
        ],
        internalType: "struct IACLCommons.ScopeUpdateAgentLimitRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "contextUpdateAgentLimit",
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
            internalType: "enum IACLCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
        ],
        internalType: "struct IACLCommons.UpdateAlterabilityRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "contextUpdateAlterabilityStatus",
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

export class IContextManagement__factory {
  static readonly abi = _abi;
  static createInterface(): IContextManagementInterface {
    return new utils.Interface(_abi) as IContextManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IContextManagement {
    return new Contract(address, _abi, signerOrProvider) as IContextManagement;
  }
}
