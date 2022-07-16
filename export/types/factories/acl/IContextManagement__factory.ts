/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IContextManagement,
  IContextManagementInterface,
} from "../../acl/IContextManagement";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "context",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newRealm",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "oldRealm",
        type: "bytes32",
      },
    ],
    name: "ContextRealmChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "context",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "scma",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "realm",
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
        internalType: "bytes32",
        name: "context",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "ContextRoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "context",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "ContextRoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "context",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "scma",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "ContextUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ctx",
        type: "bytes32",
      },
    ],
    name: "getContextFuncs",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "",
        type: "bytes4[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ctx",
        type: "bytes32",
      },
    ],
    name: "getContextInfo",
    outputs: [
      {
        components: [
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
            name: "smca",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "isSafeMode",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isUpgradable",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.ResponseContext",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "grantContextRole",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
    ],
    name: "hasContextRole",
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
        name: "newContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "bytes4[]",
            name: "funcSelectors",
            type: "bytes4[]",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext[]",
        name: "rc",
        type: "tuple[]",
      },
    ],
    name: "registerContext",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "revokeContextRole",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "setContextRealm",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setContextSafeMode",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setContextUpgradeState",
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
        name: "ctx",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "bytes4[]",
            name: "funcSelectors",
            type: "bytes4[]",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext[]",
        name: "rc",
        type: "tuple[]",
      },
    ],
    name: "updateContext",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
