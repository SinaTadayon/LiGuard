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
import type { Proxy, ProxyInterface } from "../../proxy/Proxy";

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
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a0604081905230608052610a8b3881900390819083398101604081905261002691610623565b61005160017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd6106f1565b600080516020610a6b8339815191521461006d5761006d610712565b61009860017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61046106f1565b600080516020610a4b833981519152146100b4576100b4610712565b336100d9600080516020610a4b83398151915260001b61011e60201b6100521760201c565b80546001600160a01b0319166001600160a01b03929092169190911790556002805460ff60a01b1916600160a01b17905561011682826000610121565b5050506107b2565b90565b60606101597f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b61011e60201b6100521760201c565b5460ff16156101805761016b8461035f565b50604080516000815260208101909152610358565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156101da575060408051601f3d908101601f191682019092526101d791810190610728565b60015b61021a5760405162461bcd60e51b815260206004820152600c60248201526b496c6c6567616c205555505360a01b60448201526064015b60405180910390fd5b600080516020610a6b83398151915281146102665760405162461bcd60e51b815260206004820152600c60248201526b496e76616c6964205555505360a01b6044820152606401610211565b506040516301ffc9a760e01b81526327d8f1fd60e21b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa9250505080156102ce575060408051601f3d908101601f191682019092526102cb91810190610741565b60015b61030b5760405162461bcd60e51b815260206004820152600e60248201526d496c6c6567616c204950726f787960901b6044820152606401610211565b806103495760405162461bcd60e51b815260206004820152600e60248201526d496e76616c6964204950726f787960901b6044820152606401610211565b506103558484846103a5565b90505b9392505050565b80610384600080516020610a6b83398151915260001b61011e60201b6100521760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606103b0846103ed565b6000835111806103bd5750815b156103d657610355848461043b60201b6100551760201c565b505060408051600081526020810190915292915050565b6103f68161035f565b6103fe61048c565b6040516001600160a01b039190911690309033907f8ee0f2bd29c0e6a975c3cc2e47cf2e01b5f23a9a8a02e0ed6a5a070269de3d2d90600090a450565b606061048383836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c65640000000000000000000000008152506104c160201b60201c565b90505b92915050565b60006104b2600080516020610a6b83398151915260001b61011e60201b6100521760201c565b546001600160a01b0316919050565b60606104d6846105a160201b6100951760201c565b6105225760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e7472616374204164647265737300000000000000006044820152606401610211565b600080856001600160a01b03168560405161053d9190610763565b600060405180830381855af49150503d8060008114610578576040519150601f19603f3d011682016040523d82523d6000602084013e61057d565b606091505b50915091506105978282866105b060201b6100a41760201c565b9695505050505050565b6001600160a01b03163b151590565b606083156105bf575081610358565b8251156105cf5782518084602001fd5b8160405162461bcd60e51b8152600401610211919061077f565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561061a578181015183820152602001610602565b50506000910152565b6000806040838503121561063657600080fd5b82516001600160a01b038116811461064d57600080fd5b60208401519092506001600160401b038082111561066a57600080fd5b818501915085601f83011261067e57600080fd5b815181811115610690576106906105e9565b604051601f8201601f19908116603f011681019083821181831017156106b8576106b86105e9565b816040528281528860208487010111156106d157600080fd5b6106e28360208301602088016105ff565b80955050505050509250929050565b8181038181111561048657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052600160045260246000fd5b60006020828403121561073a57600080fd5b5051919050565b60006020828403121561075357600080fd5b8151801515811461035857600080fd5b600082516107758184602087016105ff565b9190910192915050565b602081526000825180602084015261079e8160408501602087016105ff565b601f01601f19169190910160400192915050565b6080516102816107ca600039600050506102816000f3fe60806040523661001357610011610017565b005b6100115b61005061004b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6100e6565b565b90565b606061008e83836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b81525061010a565b9392505050565b6001600160a01b03163b151590565b606083156100b357508161008e565b8251156100c35782518084602001fd5b8160405162461bcd60e51b81526004016100dd91906101fc565b60405180910390fd5b3660008037600080366000845af43d6000803e808015610105573d6000f35b3d6000fd5b60606001600160a01b0384163b6101635760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e74726163742041646472657373000000000000000060448201526064016100dd565b600080856001600160a01b03168560405161017e919061022f565b600060405180830381855af49150503d80600081146101b9576040519150601f19603f3d011682016040523d82523d6000602084013e6101be565b606091505b50915091506101ce8282866100a4565b9695505050505050565b60005b838110156101f35781810151838201526020016101db565b50506000910152565b602081526000825180602084015261021b8160408501602087016101d8565b601f01601f19169190910160400192915050565b600082516102418184602087016101d8565b919091019291505056fea2646970667358221220280bcd1895b44bcb29d99289842a5c0a310a1fb27c1e60697c18ba9d091bc7ae64736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

type ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proxy__factory extends ContractFactory {
  constructor(...args: ProxyConstructorParams) {
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
  ): Promise<Proxy> {
    return super.deploy(logic, data, overrides || {}) as Promise<Proxy>;
  }
  override getDeployTransaction(
    logic: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(logic, data, overrides || {});
  }
  override attach(address: string): Proxy {
    return super.attach(address) as Proxy;
  }
  override connect(signer: Signer): Proxy__factory {
    return super.connect(signer) as Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new utils.Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Proxy {
    return new Contract(address, _abi, signerOrProvider) as Proxy;
  }
}
