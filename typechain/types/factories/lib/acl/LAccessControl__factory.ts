/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LAccessControl,
  LAccessControlInterface,
} from "../../../lib/acl/LAccessControl";

const _abi = [
  {
    inputs: [],
    name: "LIB_NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIB_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x610b2c61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c80632466209b1461005b57806359c893fc146100955780638439d9ba146100c5578063bec94751146100e7575b600080fd5b61007f604051806040016040528060058152602001640332e302e360dc1b81525081565b60405161008c919061091d565b60405180910390f35b8180156100a157600080fd5b506100b56100b036600461096b565b610114565b604051901515815260200161008c565b8180156100d157600080fd5b506100e56100e03660046109d5565b610629565b005b61007f6040518060400160405280600e81526020016d131058d8d95cdcd0dbdb9d1c9bdb60921b81525081565b6000637a32793760e01b61012e6060840160408501610a01565b6001600160e01b031916141580610165575063068bd2e760e41b6101586060840160408501610a01565b6001600160e01b03191614155b80610190575063102fa4c160e31b6101836060840160408501610a01565b6001600160e01b03191614155b806101bb5750630fcd894160e41b6101ae6060840160408501610a01565b6001600160e01b03191614155b806101e55750622b8c1960e31b6101d86060840160408501610a01565b6001600160e01b03191614155b806102105750631089e8ab60e21b6102036060840160408501610a01565b6001600160e01b03191614155b8061023b5750635180e0f960e11b61022e6060840160408501610a01565b6001600160e01b03191614155b8061026657506351eb353f60e01b6102596060840160408501610a01565b6001600160e01b03191614155b806102915750630506234b60e11b6102846060840160408501610a01565b6001600160e01b03191614155b806102bc575063038b674b60e51b6102af6060840160408501610a01565b6001600160e01b03191614155b6103035760405162461bcd60e51b8152602060048201526013602482015272125b1b1959d85b08125b9d195c999858d95259606a1b60448201526064015b60405180910390fd5b61031d6103136020840184610a2b565b6006850190610899565b156103605760405162461bcd60e51b8152602060048201526013602482015272119858d95d08105b1c9958591e48115e1a5cdd606a1b60448201526064016102fa565b61036d6020830183610a2b565b6001600160a01b03166301ffc9a761038b6060850160408601610a01565b6040516001600160e01b031960e084901b81168252919091166004820152602401602060405180830381865afa1580156103c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ed9190610a46565b61042d5760405162461bcd60e51b8152602060048201526011602482015270496c6c6567616c20496e7465726661636560781b60448201526064016102fa565b60005b61043d6060840184610a68565b9050811015610572576000600485018161045a6060870187610a68565b8581811061046a5761046a610ab9565b905060200201602081019061047f9190610a01565b6001600160e01b03191681526020810191909152604001600020546001600160a01b0316146104e35760405162461bcd60e51b815260206004820152601060248201526f24b63632b3b0b61029b2b632b1ba37b960811b60448201526064016102fa565b6104f06020840184610a2b565b6004850160006105036060870187610a68565b8581811061051357610513610ab9565b90506020020160208101906105289190610a01565b6001600160e01b0319168152602081019190915260400160002080546001600160a01b0319166001600160a01b03929092169190911790558061056a81610acf565b915050610430565b5061058d6105836020840184610a2b565b60068501906108be565b50600060058401816105a26020860186610a2b565b6001600160a01b03166001600160a01b0316815260200190815260200160002090508260200160208101906105d79190610a2b565b81546001600160a01b0319166001600160a01b03919091161781556106026060840160408501610a01565b815460e09190911c600160a01b0263ffffffff60a01b199091161790555060015b92915050565b61063660068301306108be565b50306000818152600584016020908152604080832080546001600160a01b03969096166001600160c01b0319909616959095176317ebd95d60a21b17909455637147855d60e01b8252600490940190935281832080546001600160a01b03199081168317909155630f708ceb60e41b84528284208054821683179055630733adc760e31b8452828420805482168317905563d9dc1f1960e01b8452828420805482168317905563071965c360e11b84528284208054821683179055631d74303760e21b84528284208054821683179055630505472360e51b8452828420805482168317905563b4a0bdf360e01b845282842080548216831790556358dbc45d60e01b8452828420805482168317905563a304e35360e01b84528284208054821683179055633eeb4da160e21b8452828420805482168317905563f94a0adb60e01b8452828420805482168317905563f698da2560e01b845282842080548216831790556338d38c9760e01b8452828420805482168317905563d49e164d60e01b8452828420805482168317905563756af45f60e01b845282842080548216831790556301ffc9a760e01b84528284208054821683179055630fa0156160e11b84528284208054821683179055632195733760e11b845282842080548216831790556278b53b60e31b845282842080548216831790556352d1902d60e01b8452828420805482168317905563266c45bb60e11b84528284208054821683179055630a97193160e31b84528284208054821683179055632c4b4fff60e01b84528284208054821683179055633b3c491760e11b84529190922080549091169091179055565b6001600160a01b038116600090815260018301602052604081205415155b9392505050565b60006108b7836001600160a01b038416600081815260018301602052604081205461091557508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610623565b506000610623565b600060208083528351808285015260005b8181101561094a5785810183015185820160400152820161092e565b506000604082860101526040601f19601f8301168501019250505092915050565b6000806040838503121561097e57600080fd5b82359150602083013567ffffffffffffffff81111561099c57600080fd5b8301608081860312156109ae57600080fd5b809150509250929050565b80356001600160a01b03811681146109d057600080fd5b919050565b600080604083850312156109e857600080fd5b823591506109f8602084016109b9565b90509250929050565b600060208284031215610a1357600080fd5b81356001600160e01b0319811681146108b757600080fd5b600060208284031215610a3d57600080fd5b6108b7826109b9565b600060208284031215610a5857600080fd5b815180151581146108b757600080fd5b6000808335601e19843603018112610a7f57600080fd5b83018035915067ffffffffffffffff821115610a9a57600080fd5b6020019150600581901b3603821315610ab257600080fd5b9250929050565b634e487b7160e01b600052603260045260246000fd5b600060018201610aef57634e487b7160e01b600052601160045260246000fd5b506001019056fea264697066735822122005806a5c17f88f653f29bdf4c0df0856606bcf9af251f8e7f965d28dc364abdb64736f6c63430008110033";

type LAccessControlConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LAccessControlConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LAccessControl__factory extends ContractFactory {
  constructor(...args: LAccessControlConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LAccessControl> {
    return super.deploy(overrides || {}) as Promise<LAccessControl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LAccessControl {
    return super.attach(address) as LAccessControl;
  }
  override connect(signer: Signer): LAccessControl__factory {
    return super.connect(signer) as LAccessControl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LAccessControlInterface {
    return new utils.Interface(_abi) as LAccessControlInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LAccessControl {
    return new Contract(address, _abi, signerOrProvider) as LAccessControl;
  }
}
