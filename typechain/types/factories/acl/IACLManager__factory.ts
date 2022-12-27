/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IACLManager, IACLManagerInterface } from "../../acl/IACLManager";

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
        internalType: "address",
        name: "facetId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "enum IACLCommons.ActionType",
        name: "action",
        type: "uint8",
      },
    ],
    name: "ACLFacetFunctionUpgraded",
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
        name: "facetId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subjectId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "ACLFacetRegistered",
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
        name: "facetId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subjectId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "ACLFacetUpgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "aclGetFacets",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
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
            internalType: "address",
            name: "facetId",
            type: "address",
          },
          {
            internalType: "address",
            name: "subjectId",
            type: "address",
          },
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IACLManager.FacetRegisterRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "aclRegisterFacet",
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
            internalType: "address",
            name: "facetId",
            type: "address",
          },
          {
            internalType: "address",
            name: "subjectId",
            type: "address",
          },
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
          {
            components: [
              {
                internalType: "enum IACLCommons.ActionType",
                name: "action",
                type: "uint8",
              },
              {
                internalType: "bytes4[]",
                name: "selectors",
                type: "bytes4[]",
              },
            ],
            internalType: "struct IACLManager.FacetSelectorUpgradeRequest[]",
            name: "functions",
            type: "tuple[]",
          },
        ],
        internalType: "struct IACLManager.FacetUpgradeRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    name: "aclUpgradeFacet",
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

export class IACLManager__factory {
  static readonly abi = _abi;
  static createInterface(): IACLManagerInterface {
    return new utils.Interface(_abi) as IACLManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IACLManager {
    return new Contract(address, _abi, signerOrProvider) as IACLManager;
  }
}
