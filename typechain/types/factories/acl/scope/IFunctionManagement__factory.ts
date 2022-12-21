/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFunctionManagement,
  IFunctionManagementInterface,
} from "../../../acl/scope/IFunctionManagement";

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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.ActivityStatus",
        name: "acstat",
        type: "uint8",
      },
    ],
    name: "FunctionActivityUpdated",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "adminId",
        type: "bytes32",
      },
    ],
    name: "FunctionAdminUpdated",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "typeLimit",
        type: "uint16",
      },
    ],
    name: "FunctionAgentLimitUpdated",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agentId",
        type: "bytes32",
      },
    ],
    name: "FunctionAgentUpdated",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IAclCommons.AlterabilityStatus",
        name: "alstat",
        type: "uint8",
      },
    ],
    name: "FunctionAlterabilityUpdated",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "policyCode",
        type: "uint8",
      },
    ],
    name: "FunctionPolicyUpdated",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "functionId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "functionCheckAdmin",
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
        name: "functionId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "functionCheckAgent",
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
        name: "functionId",
        type: "bytes32",
      },
    ],
    name: "functionCheckId",
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
    name: "functionCheckSelector",
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
    name: "functionDeleteActivity",
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
        name: "functionId",
        type: "bytes32",
      },
    ],
    name: "functionGetInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "adminId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "agentId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "contextId",
            type: "bytes32",
          },
          {
            internalType: "bytes4",
            name: "selector",
            type: "bytes4",
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
            internalType: "enum IAclCommons.ActivityStatus",
            name: "acstat",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AlterabilityStatus",
            name: "alstat",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AgentType",
            name: "adminType",
            type: "uint8",
          },
          {
            internalType: "enum IAclCommons.AgentType",
            name: "agentType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "policyCode",
            type: "uint8",
          },
        ],
        internalType: "struct IFunctionManagement.FunctionInfo",
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
    name: "functionUpdateActivityStatus",
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
    name: "functionUpdateAdmin",
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
            name: "functionId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "agentId",
            type: "bytes32",
          },
        ],
        internalType: "struct IFunctionManagement.FunctionUpdateAgentRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "functionUpdateAgent",
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
        internalType: "struct IAclCommons.ScopeUpdateAgentLimitRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "functionUpdateAgentLimit",
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
    name: "functionUpdateAlterabilityStatus",
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
            name: "functionId",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "policyCode",
            type: "uint8",
          },
        ],
        internalType:
          "struct IFunctionManagement.FunctionUpdatePolicyRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "functionUpdatePolicy",
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

export class IFunctionManagement__factory {
  static readonly abi = _abi;
  static createInterface(): IFunctionManagementInterface {
    return new utils.Interface(_abi) as IFunctionManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFunctionManagement {
    return new Contract(address, _abi, signerOrProvider) as IFunctionManagement;
  }
}
