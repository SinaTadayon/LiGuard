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
import type { PromiseOrValue } from "../../common";
import type {
  ACLManagerProxy,
  ACLManagerProxyInterface,
} from "../../acl/ACLManagerProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
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
    stateMutability: "payable",
    type: "fallback",
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
    name: "FUNCTION_MESSAGE_TYPEHASH",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a060408190523060805262000c6238819003908190833981016040819052620000299162000678565b6200005660017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd62000753565b60008051602062000c428339815191521462000076576200007662000775565b620000a360017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610462000753565b60008051602062000c2283398151915214620000c357620000c362000775565b33620000ec60008051602062000c2283398151915260001b6200013460201b620001be1760201c565b80546001600160a01b0319166001600160a01b03929092169190911790556002805460ff60a01b1916600160a11b1790556200012b8282600062000137565b5050506200081c565b90565b6060620001727f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b6200013460201b620001be1760201c565b5460ff16156200019d5762000187846200038c565b5060408051600081526020810190915262000385565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015620001fa575060408051601f3d908101601f19168201909252620001f7918101906200078b565b60015b6200023b5760405162461bcd60e51b815260206004820152600c60248201526b496c6c6567616c205555505360a01b60448201526064015b60405180910390fd5b60008051602062000c4283398151915281146200028a5760405162461bcd60e51b815260206004820152600c60248201526b496e76616c6964205555505360a01b604482015260640162000232565b506040516301ffc9a760e01b81526327d8f1fd60e21b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa925050508015620002f5575060408051601f3d908101601f19168201909252620002f291810190620007a5565b60015b620003345760405162461bcd60e51b815260206004820152600e60248201526d496c6c6567616c204950726f787960901b604482015260640162000232565b80620003745760405162461bcd60e51b815260206004820152600e60248201526d496e76616c6964204950726f787960901b604482015260640162000232565b5062000382848484620003d6565b90505b9392505050565b80620003b560008051602062000c4283398151915260001b6200013460201b620001be1760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060620003e38462000425565b600083511180620003f15750815b156200040e576200038284846200047760201b620001c11760201c565b505060408051600081526020810190915292915050565b62000430816200038c565b6200043a620004ca565b6040516001600160a01b039190911690309033907f8ee0f2bd29c0e6a975c3cc2e47cf2e01b5f23a9a8a02e0ed6a5a070269de3d2d90600090a450565b6060620004c183836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c65640000000000000000000000008152506200050360201b60201c565b90505b92915050565b6000620004f460008051602062000c4283398151915260001b6200013460201b620001be1760201c565b546001600160a01b0316919050565b60606200051b84620005ef60201b620002011760201c565b620005695760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e747261637420416464726573730000000000000000604482015260640162000232565b600080856001600160a01b031685604051620005869190620007c9565b600060405180830381855af49150503d8060008114620005c3576040519150601f19603f3d011682016040523d82523d6000602084013e620005c8565b606091505b5091509150620005e5828286620005fe60201b620002101760201c565b9695505050505050565b6001600160a01b03163b151590565b606083156200060f57508162000385565b825115620006205782518084602001fd5b8160405162461bcd60e51b8152600401620002329190620007e7565b634e487b7160e01b600052604160045260246000fd5b60005b838110156200066f57818101518382015260200162000655565b50506000910152565b600080604083850312156200068c57600080fd5b82516001600160a01b0381168114620006a457600080fd5b60208401519092506001600160401b0380821115620006c257600080fd5b818501915085601f830112620006d757600080fd5b815181811115620006ec57620006ec6200063c565b604051601f8201601f19908116603f011681019083821181831017156200071757620007176200063c565b816040528281528860208487010111156200073157600080fd5b6200074483602083016020880162000652565b80955050505050509250929050565b81810381811115620004c457634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052600160045260246000fd5b6000602082840312156200079e57600080fd5b5051919050565b600060208284031215620007b857600080fd5b815180151581146200038557600080fd5b60008251620007dd81846020870162000652565b9190910192915050565b60208152600082518060208401526200080881604085016020870162000652565b601f01601f19169190910160400192915050565b6080516103ed62000835600039600050506103ed6000f3fe6080604052600436106100435760003560e01c806334109de21461005a57806364d4c819146100a0578063f0b15def146100d4578063f33b6d481461010857610052565b366100525761005061013c565b005b61005061013c565b34801561006657600080fd5b5061008e7f7aabe2571874f2a330ea11c8972d9cc3792d973efc6b36e3e29005861a34418881565b60405190815260200160405180910390f35b3480156100ac57600080fd5b5061008e7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b3480156100e057600080fd5b5061008e7ffc434588684348dd50856b075c47bed14245c1030aa04c32955af5549981462781565b34801561011457600080fd5b5061008e7f31238da5536ef05686d34ccf0de000a4926293566b3711f6e73963b73ad026fe81565b600080356001600160e01b0319168152604860205260409020546001600160a01b031680158061017457506001600160a01b03811630145b156101b5576101b26101ad7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b610252565b50565b6101b281610252565b90565b60606101fa83836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b815250610276565b9392505050565b6001600160a01b03163b151590565b6060831561021f5750816101fa565b82511561022f5782518084602001fd5b8160405162461bcd60e51b81526004016102499190610368565b60405180910390fd5b3660008037600080366000845af43d6000803e808015610271573d6000f35b3d6000fd5b60606001600160a01b0384163b6102cf5760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e7472616374204164647265737300000000000000006044820152606401610249565b600080856001600160a01b0316856040516102ea919061039b565b600060405180830381855af49150503d8060008114610325576040519150601f19603f3d011682016040523d82523d6000602084013e61032a565b606091505b509150915061033a828286610210565b9695505050505050565b60005b8381101561035f578181015183820152602001610347565b50506000910152565b6020815260008251806020840152610387816040850160208701610344565b601f01601f19169190910160400192915050565b600082516103ad818460208701610344565b919091019291505056fea264697066735822122033bf90cb6a677695161346d6d8275b14b2795df627170d6e44f129b813a5679464736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

type ACLManagerProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ACLManagerProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ACLManagerProxy__factory extends ContractFactory {
  constructor(...args: ACLManagerProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    logic: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ACLManagerProxy> {
    return super.deploy(
      logic,
      data,
      overrides || {}
    ) as Promise<ACLManagerProxy>;
  }
  override getDeployTransaction(
    logic: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(logic, data, overrides || {});
  }
  override attach(address: string): ACLManagerProxy {
    return super.attach(address) as ACLManagerProxy;
  }
  override connect(signer: Signer): ACLManagerProxy__factory {
    return super.connect(signer) as ACLManagerProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ACLManagerProxyInterface {
    return new utils.Interface(_abi) as ACLManagerProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ACLManagerProxy {
    return new Contract(address, _abi, signerOrProvider) as ACLManagerProxy;
  }
}
