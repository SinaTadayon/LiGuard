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
    name: "ContextFuncRemoved",
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
    name: "ContextFuncRoleAdded",
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
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "realm",
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
        name: "contractId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
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
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "ContextStatusChanged",
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
        name: "contractId",
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
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
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
      {
        indexed: false,
        internalType: "bytes32",
        name: "bytesHash",
        type: "bytes32",
      },
    ],
    name: "PredictContextRegistered",
    type: "event",
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
    name: "addContextFuncRole",
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
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
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
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext",
        name: "rc",
        type: "tuple",
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
        internalType: "struct IContextManagement.RequestRegisterContext[]",
        name: "rcr",
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
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "bytesHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestPredictContext",
        name: "rpc",
        type: "tuple",
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
        internalType: "struct IContextManagement.RequestRegisterContext[]",
        name: "rrc",
        type: "tuple[]",
      },
    ],
    name: "registerPredictContext",
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
    ],
    name: "removeContextFunc",
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
        name: "status",
        type: "bool",
      },
    ],
    name: "setContextStatus",
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
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext",
        name: "rc",
        type: "tuple",
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
            internalType: "enum IContextManagement.UpdateContextStatus",
            name: "updateStatus",
            type: "uint8",
          },
        ],
        internalType: "struct IContextManagement.RequestUpdateContext[]",
        name: "ruc",
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
