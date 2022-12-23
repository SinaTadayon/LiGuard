/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IMemberManagement,
  IMemberManagementInterface,
} from "../../../acl/agent/IMemberManagement";

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
        name: "memberId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IACLCommons.ActivityStatus",
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
        internalType: "enum IACLCommons.AlterabilityStatus",
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
        indexed: false,
        internalType: "uint16",
        name: "factoryLimit",
        type: "uint16",
      },
    ],
    name: "MemberFactoryLimitUpdated",
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
            internalType: "enum IACLCommons.AgentType",
            name: "atype",
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
            internalType: "uint16",
            name: "factoryLimit",
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
        internalType: "struct IACLCommons.UpdateAdminRequest[]",
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
            name: "factoryLimit",
            type: "uint16",
          },
        ],
        internalType:
          "struct IMemberManagement.MemberUpdateFactoryLimitRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "memberUpdateFactoryLimit",
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

export class IMemberManagement__factory {
  static readonly abi = _abi;
  static createInterface(): IMemberManagementInterface {
    return new utils.Interface(_abi) as IMemberManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMemberManagement {
    return new Contract(address, _abi, signerOrProvider) as IMemberManagement;
  }
}
