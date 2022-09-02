/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LRoleManagement,
  LRoleManagementInterface,
} from "../../../lib/acl/LRoleManagement";

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
];

const _bytecode =
  "0x611b5961003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100a85760003560e01c80637cb8dd2e116100705780637cb8dd2e1461014d57806389d4da651461016d578063bec947511461018d578063c3203fd114610195578063f4800f4c146101cc57600080fd5b80630938ae71146100ad5780631f9471ef146100d55780632466209b146100f75780633859eb7f1461010d5780633d5805771461012d575b600080fd5b6100c06100bb366004611684565b6101ec565b60405190151581526020015b60405180910390f35b6100e86100e33660046116c9565b610267565b6040516100cc939291906116eb565b6100ff61032a565b6040519081526020016100cc565b81801561011957600080fd5b506100ff610128366004611760565b610358565b81801561013957600080fd5b506100c0610148366004611684565b61065a565b61016061015b3660046116c9565b610a53565b6040516100cc91906117fb565b81801561017957600080fd5b506100c0610188366004611684565b610ab8565b6100ff610e57565b8180156101a157600080fd5b506101b56101b0366004611848565b610e7a565b6040805192151583526020830191909152016100cc565b8180156101d857600080fd5b506101b56101e7366004611874565b611147565b600082815260028401602052604081208054610207906118a2565b158015915061021e57506001600160a01b03821615155b801561025f575060016001600160a01b03831660009081526020868152604080832087845290915290205460ff16600281111561025d5761025d6118dc565b145b949350505050565b6000818152600280840160205260408220600181015491810154815460609493849392909160ff90911690839061029d906118a2565b80601f01602080910402602001604051908101604052809291908181526020018280546102c9906118a2565b80156103165780601f106102eb57610100808354040283529160200191610316565b820191906000526020600020905b8154815290600101906020018083116102f957829003601f168201915b505050505092509250925092509250925092565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610398573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103bc91906118f2565b156103e25760405162461bcd60e51b81526004016103d99061190f565b60405180910390fd5b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608761040630611425565b6040516001600160e01b031960e085901b168152610433929190339063b2dc26e560e01b90600401611946565b602060405180830381865af4158015610450573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047491906118f2565b6104c05760405162461bcd60e51b815260206004820152601a60248201527f5265676973746572526f6c65204163636573732044656e69656400000000000060448201526064016103d9565b6000838152600487016020526040902080546104db906118a2565b905060000361051e5760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b60448201526064016103d9565b60008490036105635760405162461bcd60e51b8152602060048201526011602482015270149bdb194813985b5948125b9d985b1a59607a1b60448201526064016103d9565b60008585604051602001610578929190611974565b60408051601f198184030181529181528151602092830120600081815260028b0190935291208054919250906105ad906118a2565b1590506105fc5760405162461bcd60e51b815260206004820152601760248201527f526f6c6520416c7265616479205265676973746572656400000000000000000060448201526064016103d9565b600084815260048801602052604090206106199060020182611464565b5060008181526002880160205260409020806106368789836119e9565b5060018101859055600201805484151560ff19909116179055905095945050505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561069a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106be91906118f2565b156106db5760405162461bcd60e51b81526004016103d99061190f565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960856106ff30611425565b6040516001600160e01b031960e085901b16815261072c929190339063df01de4560e01b90600401611946565b602060405180830381865af4158015610749573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076d91906118f2565b6107b95760405162461bcd60e51b815260206004820152601f60248201527f5265766f6b65526f6c654163636f756e74204163636573732044656e6965640060448201526064016103d9565b604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101604051602081830303815290604052805190602001208314806108375750604051774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b60208201526038016040516020818303038152906040528051906020012083145b156108a8576000838152600285016020526040902060019061085b90600301611470565b116108a85760405162461bcd60e51b815260206004820152601b60248201527f496c6c6567616c205265766f6b6520526f6c65204163636f756e74000000000060448201526064016103d9565b6000838152600285016020526040902080546108c3906118a2565b90506000036108e45760405162461bcd60e51b81526004016103d990611aaa565b6001600160a01b03821661092c5760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b60448201526064016103d9565b60008381526002850160205260409020610949906003018361147a565b6109895760405162461bcd60e51b81526020600482015260116024820152701058d8dbdd5b9d08139bdd08119bdd5b99607a1b60448201526064016103d9565b6001600160a01b03821660009081526020858152604080832086845290915281205460ff1660028111156109bf576109bf6118dc565b03610a055760405162461bcd60e51b81526020600482015260166024820152751058d8dbdd5b9d08149bdb1948139bdd08119bdd5b9960521b60448201526064016103d9565b6001600160a01b0382166000908152602085815260408083208684528252808320805460ff1916600290811790915587019091529020610a48906003018361149c565b506001949350505050565b60008181526002830160205260409020805460609190610a72906118a2565b9050600003610a935760405162461bcd60e51b81526004016103d990611aaa565b60008281526002840160205260409020610aaf906003016114b1565b90505b92915050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610af8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1c91906118f2565b15610b395760405162461bcd60e51b81526004016103d99061190f565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696085610b5d30611425565b6040516001600160e01b031960e085901b168152610b8a92919033906308f09e0f60e41b90600401611946565b602060405180830381865af4158015610ba7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bcb91906118f2565b610c175760405162461bcd60e51b815260206004820152601e60248201527f4772616e74526f6c654163636f756e74204163636573732044656e696564000060448201526064016103d9565b6040517f4c4956454c595f44414f5f4558454355544f525f524f4c4500000000000000006020820152603801604051602081830303815290604052805190602001208303610cde576000826001600160a01b03163b118015610c92575060008381526002850160205260408120610c9090600301611470565b145b610cde5760405162461bcd60e51b815260206004820152601f60248201527f496c6c6567616c204772616e742044616f204578656375746f7220526f6c650060448201526064016103d9565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b6020820152603501604051602081830303815290604052805190602001208303610d665760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c204772616e7420416e6f6e796d6f757320526f6c650000000060448201526064016103d9565b600083815260028501602052604090208054610d81906118a2565b9050600003610da25760405162461bcd60e51b81526004016103d990611aaa565b6001600160a01b038216610dea5760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b60448201526064016103d9565b6001600160a01b0382166000908152602085815260408083208684528252808320805460ff19166001179055600287019091529020610e2c906003018361147a565b610e4d5760008381526002850160205260409020610a4890600301836114c5565b5060019392505050565b6040516e13149bdb1953585b9859d95b595b9d608a1b6020820152602f0161033f565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ebb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edf91906118f2565b15610efc5760405162461bcd60e51b81526004016103d99061190f565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086610f2030611425565b6040516001600160e01b031960e085901b168152610f4d9291903390630dbf304b60e41b90600401611946565b602060405180830381865af4158015610f6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8e91906118f2565b610fda5760405162461bcd60e51b815260206004820152601a60248201527f536574526f6c6547726f7570204163636573732044656e69656400000000000060448201526064016103d9565b600084815260028601602052604090208054610ff5906118a2565b90506000036110165760405162461bcd60e51b81526004016103d990611aaa565b600083815260048601602052604090208054611031906118a2565b90506000036110745760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b60448201526064016103d9565b60008481526002860160205260409020600101548390036110d75760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c2047726f7570204475706c69636174696f6e0000000000000060448201526064016103d9565b60008481526002808701602090815260408084206001015480855260048a019092529092206111079101866114da565b50600084815260048701602052604090206111259060020186611464565b5060009485526002959095016020525050604090912060019081019190915591565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611188573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ac91906118f2565b156111c95760405162461bcd60e51b81526004016103d99061190f565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960866111ed30611425565b6040516001600160e01b031960e085901b16815261121a929190339063738f112760e11b90600401611946565b602060405180830381865af4158015611237573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061125b91906118f2565b6112a75760405162461bcd60e51b815260206004820152601b60248201527f536574526f6c65537461747573204163636573732044656e696564000000000060448201526064016103d9565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b60208201526035016040516020818303038152906040528051906020012084141580156113255750604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101604051602081830303815290604052805190602001208414155b801561136d5750604051774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b6020820152603801604051602081830303815290604052805190602001208414155b6113b95760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204368616e676520526f6c652053746174757300000000000060448201526064016103d9565b6000848152600286016020526040902080546113d4906118a2565b90506000036113f55760405162461bcd60e51b81526004016103d990611aaa565b5050600091825260029283016020526040909120918201805460ff19169115159190911790556001908101549091565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6000610aaf83836114e6565b6000610ab2825490565b6001600160a01b03811660009081526001830160205260408120541515610aaf565b6000610aaf836001600160a01b038416611535565b606060006114be83611628565b9392505050565b6000610aaf836001600160a01b0384166114e6565b6000610aaf8383611535565b600081815260018301602052604081205461152d57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610ab2565b506000610ab2565b6000818152600183016020526040812054801561161e576000611559600183611ad2565b855490915060009061156d90600190611ad2565b90508181146115d257600086600001828154811061158d5761158d611af7565b90600052602060002001549050808760000184815481106115b0576115b0611af7565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806115e3576115e3611b0d565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610ab2565b6000915050610ab2565b60608160000180548060200260200160405190810160405280929190818152602001828054801561167857602002820191906000526020600020905b815481526020019060010190808311611664575b50505050509050919050565b60008060006060848603121561169957600080fd5b833592506020840135915060408401356001600160a01b03811681146116be57600080fd5b809150509250925092565b600080604083850312156116dc57600080fd5b50508035926020909101359150565b606081526000845180606084015260005b8181101561171957602081880181015160808684010152016116fc565b8181111561172b576000608083860101525b5060208301949094525090151560408201526080601f909201601f19160101919050565b801515811461175d57600080fd5b50565b60008060008060006080868803121561177857600080fd5b85359450602086013567ffffffffffffffff8082111561179757600080fd5b818801915088601f8301126117ab57600080fd5b8135818111156117ba57600080fd5b8960208285010111156117cc57600080fd5b6020830196508095505050506040860135915060608601356117ed8161174f565b809150509295509295909350565b6020808252825182820181905260009190848201906040850190845b8181101561183c5783516001600160a01b031683529284019291840191600101611817565b50909695505050505050565b60008060006060848603121561185d57600080fd5b505081359360208301359350604090920135919050565b60008060006060848603121561188957600080fd5b833592506020840135915060408401356116be8161174f565b600181811c908216806118b657607f821691505b6020821081036118d657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b60006020828403121561190457600080fd5b81516114be8161174f565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f8211156119e457600081815260208120601f850160051c810160208610156119c15750805b601f850160051c820191505b818110156119e0578281556001016119cd565b5050505b505050565b67ffffffffffffffff831115611a0157611a01611984565b611a1583611a0f83546118a2565b8361199a565b6000601f841160018114611a495760008515611a315750838201355b600019600387901b1c1916600186901b178355611aa3565b600083815260209020601f19861690835b82811015611a7a5786850135825560209485019460019092019101611a5a565b5086821015611a975760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b6020808252600e908201526d149bdb1948139bdd08119bdd5b9960921b604082015260600190565b600082821015611af257634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122022eb658f09cb9ab38b51bc76a46a7ef36f4e410f867c9c9cd60363d48f62f36164736f6c634300080f0033";

type LRoleManagementConstructorParams =
  | [linkLibraryAddresses: LRoleManagementLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LRoleManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class LRoleManagement__factory extends ContractFactory {
  constructor(...args: LRoleManagementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        LRoleManagement__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: LRoleManagementLibraryAddresses
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
  ): Promise<LRoleManagement> {
    return super.deploy(overrides || {}) as Promise<LRoleManagement>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LRoleManagement {
    return super.attach(address) as LRoleManagement;
  }
  override connect(signer: Signer): LRoleManagement__factory {
    return super.connect(signer) as LRoleManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LRoleManagementInterface {
    return new utils.Interface(_abi) as LRoleManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LRoleManagement {
    return new Contract(address, _abi, signerOrProvider) as LRoleManagement;
  }
}

export interface LRoleManagementLibraryAddresses {
  ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
