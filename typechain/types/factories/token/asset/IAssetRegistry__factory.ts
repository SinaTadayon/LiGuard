/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAssetRegistry,
  IAssetRegistryInterface,
} from "../../../token/asset/IAssetRegistry";

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
        name: "assetId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "assetName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "assetVersion",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20Token",
        type: "address",
      },
    ],
    name: "AssetCreated",
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
        name: "assetId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "assetName",
        type: "string",
      },
    ],
    name: "AssetRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "assetName",
        type: "string",
      },
      {
        internalType: "string",
        name: "assetVersion",
        type: "string",
      },
      {
        internalType: "address",
        name: "erc20Token",
        type: "address",
      },
    ],
    name: "createAsset",
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
  {
    inputs: [],
    name: "getAllAssets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "assetId",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
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
        ],
        internalType: "struct IAssetRegistry.AssetInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "assetId",
        type: "address",
      },
    ],
    name: "getAsset",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "assetId",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
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
        ],
        internalType: "struct IAssetRegistry.AssetInfo",
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
        internalType: "string",
        name: "assetName",
        type: "string",
      },
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
    ],
    name: "registerAsset",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "assetId",
        type: "address",
      },
    ],
    name: "removeAsset",
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

export class IAssetRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IAssetRegistryInterface {
    return new utils.Interface(_abi) as IAssetRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAssetRegistry {
    return new Contract(address, _abi, signerOrProvider) as IAssetRegistry;
  }
}
