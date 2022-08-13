/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC1967ProxyTest,
  ERC1967ProxyTestInterface,
} from "../../../test/proxy/ERC1967ProxyTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405161070138038061070183398101604081905261002291610339565b61002e82826000610035565b5050610456565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100fa565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100f383836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c65640000000000000000000000008152506101cc60201b60201c565b9392505050565b61010d816102ac60201b6100691760201c565b6101745760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101ab7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6102bb60201b6100781760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606101e1846102ac60201b6100691760201c565b61022d5760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e747261637420416464726573730000000000000000604482015260640161016b565b600080856001600160a01b0316856040516102489190610407565b600060405180830381855af49150503d8060008114610283576040519150601f19603f3d011682016040523d82523d6000602084013e610288565b606091505b50915091506102a28282866102be60201b61007b1760201c565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102cd5750816100f3565b8251156102dd5782518084602001fd5b8160405162461bcd60e51b815260040161016b9190610423565b634e487b7160e01b600052604160045260246000fd5b60005b83811015610328578181015183820152602001610310565b838111156100645750506000910152565b6000806040838503121561034c57600080fd5b82516001600160a01b038116811461036357600080fd5b60208401519092506001600160401b038082111561038057600080fd5b818501915085601f83011261039457600080fd5b8151818111156103a6576103a66102f7565b604051601f8201601f19908116603f011681019083821181831017156103ce576103ce6102f7565b816040528281528860208487010111156103e757600080fd5b6103f883602083016020880161030d565b80955050505050509250929050565b6000825161041981846020870161030d565b9190910192915050565b602081526000825180602084015261044281604085016020870161030d565b601f01601f19169190910160400192915050565b61029c806104656000396000f3fe60806040523661001357610011610017565b005b6100115b6100276100226100bd565b6100f5565b565b606061006283836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b815250610119565b9392505050565b6001600160a01b03163b151590565b90565b6060831561008a575081610062565b82511561009a5782518084602001fd5b8160405162461bcd60e51b81526004016100b49190610217565b60405180910390fd5b60006100f07f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e808015610114573d6000f35b3d6000fd5b60606001600160a01b0384163b6101725760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e74726163742041646472657373000000000000000060448201526064016100b4565b600080856001600160a01b03168560405161018d919061024a565b600060405180830381855af49150503d80600081146101c8576040519150601f19603f3d011682016040523d82523d6000602084013e6101cd565b606091505b50915091506101dd82828661007b565b9695505050505050565b60005b838110156102025781810151838201526020016101ea565b83811115610211576000848401525b50505050565b60208152600082518060208401526102368160408501602087016101e7565b601f01601f19169190910160400192915050565b6000825161025c8184602087016101e7565b919091019291505056fea264697066735822122070523ad68a33e77b115f7344a497f78d9b68632071d318d2dccfe90adf41685a64736f6c634300080f0033";

type ERC1967ProxyTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1967ProxyTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1967ProxyTest__factory extends ContractFactory {
  constructor(...args: ERC1967ProxyTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1967ProxyTest> {
    return super.deploy(
      _logic,
      _data,
      overrides || {}
    ) as Promise<ERC1967ProxyTest>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, _data, overrides || {});
  }
  override attach(address: string): ERC1967ProxyTest {
    return super.attach(address) as ERC1967ProxyTest;
  }
  override connect(signer: Signer): ERC1967ProxyTest__factory {
    return super.connect(signer) as ERC1967ProxyTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1967ProxyTestInterface {
    return new utils.Interface(_abi) as ERC1967ProxyTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1967ProxyTest {
    return new Contract(address, _abi, signerOrProvider) as ERC1967ProxyTest;
  }
}
