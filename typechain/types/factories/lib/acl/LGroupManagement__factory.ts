/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LGroupManagement,
  LGroupManagementInterface,
} from "../../../lib/acl/LGroupManagement";

const _abi = [
  {
    inputs: [],
    name: "LIB_NAME",
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
    name: "LIB_VERSION",
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
    name: "getLibrary",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x610ddb61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100925760003560e01c80637678922e116100655780637678922e1461011a578063bec9475114610145578063c3db069f1461014d578063c91d22161461016d57600080fd5b8063097f7f871461009757806311cc3c77146100c15780632466209b146100f1578063687edc1214610107575b600080fd5b6100aa6100a5366004610a12565b61018d565b6040516100b8929190610a34565b60405180910390f35b8180156100cd57600080fd5b506100e16100dc366004610a9c565b610243565b60405190151581526020016100b8565b6100f96105ec565b6040519081526020016100b8565b6100e1610115366004610ad5565b61061a565b6040516001600160a01b0373__$c43b1d7058274a71a9734d16e6b6586431$__1681526020016100b8565b6100f9610664565b81801561015957600080fd5b506100f9610168366004610b01565b610688565b61018061017b366004610a12565b610928565b6040516100b89190610b90565b6000818152600483016020526040812060018101548154606093929160ff169082906101b890610bd4565b80601f01602080910402602001604051908101604052809291908181526020018280546101e490610bd4565b80156102315780601f1061020657610100808354040283529160200191610231565b820191906000526020600020905b81548152906001019060200180831161021457829003601f168201915b50505050509150915091509250929050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610283573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a79190610c0e565b156102f35760405162461bcd60e51b815260206004820152601760248201527614d85999535bd9194e8810d85b1b0814995a9958dd1959604a1b60448201526064015b60405180910390fd5b6040517304c4956454c595f47454e4552414c5f47524f55560641b602082015260340160405160208183030381529060405280519060200120830361048557600061033d3061094e565b60008181526001878101602081815260408085206322df6f5b60e21b80875260028201845291862054958790529290915291015492935091600160a01b900460ff1680156103cb5750600160008481526001808a01602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156103c9576103c9610c2b565b145b80156103f95750600083815260018089016020908152604080842054845260038b01909152909120015460ff165b8015610431575060013360009081526020898152604080832085845290915290205460ff16600281111561042f5761042f610c2b565b145b61047d5760405162461bcd60e51b815260206004820152601c60248201527f53657447726f7570537461747573204163636573732044656e6965640000000060448201526064016102ea565b505050610563565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a856104a93061094e565b6040516001600160e01b031960e085901b1681526104d6929190339063b6c03f0360e01b90600401610c41565b602060405180830381865af41580156104f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105179190610c0e565b6105635760405162461bcd60e51b815260206004820152601c60248201527f53657447726f7570537461747573204163636573732044656e6965640000000060448201526064016102ea565b60008381526004850160205260409020805461057e90610bd4565b90506000036105c15760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b60448201526064016102ea565b50600082815260048401602052604090206001908101805483151560ff199091161790559392505050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b60008281526004840160205260408120805461063590610bd4565b158015915061065c57506000838152600485016020526040902061065c906002018361098d565b949350505050565b6040516f1311dc9bdd5c13585b9859d95b595b9d60821b6020820152603001610601565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ec9190610c0e565b156107335760405162461bcd60e51b815260206004820152601760248201527614d85999535bd9194e8810d85b1b0814995a9958dd1959604a1b60448201526064016102ea565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a866107573061094e565b6040516001600160e01b031960e085901b16815261078492919033906307e9933760e31b90600401610c41565b602060405180830381865af41580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c59190610c0e565b6108115760405162461bcd60e51b815260206004820152601b60248201527f526567697374657247726f7570204163636573732044656e696564000000000060448201526064016102ea565b60008390036108575760405162461bcd60e51b815260206004820152601260248201527111dc9bdd5c0813985b5948125b9d985b1a5960721b60448201526064016102ea565b6000848460405160200161086c929190610c6f565b60408051601f198184030181529181528151602092830120600081815260048a0190935291208054919250906108a190610bd4565b1590506108f05760405162461bcd60e51b815260206004820152601860248201527f47726f757020416c72656164792052656769737465726564000000000000000060448201526064016102ea565b600081815260048701602052604090208061090c868883610ce4565b50600101805484151560ff199091161790559050949350505050565b60008181526004830160205260409020606090610947906002016109a5565b9392505050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b60008181526001830160205260408120541515610947565b60606109b0826109b6565b92915050565b606081600001805480602002602001604051908101604052809291908181526020018280548015610a0657602002820191906000526020600020905b8154815260200190600101908083116109f2575b50505050509050919050565b60008060408385031215610a2557600080fd5b50508035926020909101359150565b604081526000835180604084015260005b81811015610a625760208187018101516060868401015201610a45565b506000606082850101526060601f19601f83011684010191505082151560208301529392505050565b8015158114610a9957600080fd5b50565b600080600060608486031215610ab157600080fd5b83359250602084013591506040840135610aca81610a8b565b809150509250925092565b600080600060608486031215610aea57600080fd5b505081359360208301359350604090920135919050565b60008060008060608587031215610b1757600080fd5b84359350602085013567ffffffffffffffff80821115610b3657600080fd5b818701915087601f830112610b4a57600080fd5b813581811115610b5957600080fd5b886020828501011115610b6b57600080fd5b6020830195508094505050506040850135610b8581610a8b565b939692955090935050565b6020808252825182820181905260009190848201906040850190845b81811015610bc857835183529284019291840191600101610bac565b50909695505050505050565b600181811c90821680610be857607f821691505b602082108103610c0857634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610c2057600080fd5b815161094781610a8b565b634e487b7160e01b600052602160045260246000fd5b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f821115610cdf57600081815260208120601f850160051c81016020861015610cbc5750805b601f850160051c820191505b81811015610cdb57828155600101610cc8565b5050505b505050565b67ffffffffffffffff831115610cfc57610cfc610c7f565b610d1083610d0a8354610bd4565b83610c95565b6000601f841160018114610d445760008515610d2c5750838201355b600019600387901b1c1916600186901b178355610d9e565b600083815260209020601f19861690835b82811015610d755786850135825560209485019460019092019101610d55565b5086821015610d925760001960f88860031b161c19848701351681555b505060018560011b0183555b505050505056fea2646970667358221220434cc9f9d724861a2a37b7b5abf8026fc100998d44c205dd4ffda7f5b2ee4cac64736f6c63430008110033";

type LGroupManagementConstructorParams =
  | [linkLibraryAddresses: LGroupManagementLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LGroupManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class LGroupManagement__factory extends ContractFactory {
  constructor(...args: LGroupManagementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        LGroupManagement__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: LGroupManagementLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$c43b1d7058274a71a9734d16e6b6586431\\$__", "g"),
      linkLibraryAddresses[
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LGroupManagement> {
    return super.deploy(overrides || {}) as Promise<LGroupManagement>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LGroupManagement {
    return super.attach(address) as LGroupManagement;
  }
  override connect(signer: Signer): LGroupManagement__factory {
    return super.connect(signer) as LGroupManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LGroupManagementInterface {
    return new utils.Interface(_abi) as LGroupManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LGroupManagement {
    return new Contract(address, _abi, signerOrProvider) as LGroupManagement;
  }
}

export interface LGroupManagementLibraryAddresses {
  ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
