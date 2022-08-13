/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LTokenERC20,
  LTokenERC20Interface,
} from "../../../lib/token/LTokenERC20";

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
    inputs: [
      {
        internalType: "bytes32",
        name: "domainName",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "domainVersion",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "createRequestContext",
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
            name: "smca",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext",
        name: "",
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
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x610c2761003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061004b5760003560e01c80632466209b1461005057806397ca328d1461006b578063bec947511461008c575b600080fd5b610058610094565b6040519081526020015b60405180910390f35b61007e610079366004610a74565b6100c2565b604051610062929190610aa0565b610058610a55565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6040805160a081018252600080825260208201819052818301819052606080830182905260808084018390528451600380825291810190955292939092816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081610104579050509050306001600160a01b031663b4a0bdf36040518163ffffffff1660e01b8152600401602060405180830381865afa158015610176573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019a9190610b92565b6001600160a01b031663407681406040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fb9190610bc2565b8160008151811061020e5761020e610bdb565b6020026020010151600001818152505060018160008151811061023357610233610bdb565b6020908102919091010151901515604091820152805160028082526060820190925290816020016020820280368337019050508160008151811061027957610279610bdb565b60200260200101516020018190525063a9059cbb60e01b816000815181106102a3576102a3610bdb565b6020026020010151602001516000815181106102c1576102c1610bdb565b6001600160e01b031990921660209283029190910190910152805163095ea7b360e01b9082906000906102f6576102f6610bdb565b60200260200101516020015160018151811061031457610314610bdb565b6001600160e01b03199092166020928302919091018201526040805163b4a0bdf360e01b81529051309263b4a0bdf392600480820193918290030181865afa158015610364573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103889190610b92565b6001600160a01b031663098b01cf6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e99190610bc2565b816001815181106103fc576103fc610bdb565b6020026020010151600001818152505060018160018151811061042157610421610bdb565b6020908102919091018101519115156040928301528151600a80825261016082019093529190820161014080368337019050508160018151811061046757610467610bdb565b6020026020010151602001819052506348e6be1c60e01b8160018151811061049157610491610bdb565b6020026020010151602001516000815181106104af576104af610bdb565b6001600160e01b0319909216602092830291909101909101528051632770a7eb60e21b90829060019081106104e6576104e6610bdb565b60200260200101516020015160018151811061050457610504610bdb565b6001600160e01b03199092166020928302919091019091015280516340c10f1960e01b908290600190811061053b5761053b610bdb565b60200260200101516020015160028151811061055957610559610bdb565b6001600160e01b0319909216602092830291909101909101528051630bfee64760e11b908290600190811061059057610590610bdb565b6020026020010151602001516003815181106105ae576105ae610bdb565b6001600160e01b03199092166020928302919091019091015280516311a98d3560e21b90829060019081106105e5576105e5610bdb565b60200260200101516020015160048151811061060357610603610bdb565b6001600160e01b03199092166020928302919091019091015280516376a67a5160e01b908290600190811061063a5761063a610bdb565b60200260200101516020015160058151811061065857610658610bdb565b6001600160e01b03199092166020928302919091019091015280516357b001f960e01b908290600190811061068f5761068f610bdb565b6020026020010151602001516006815181106106ad576106ad610bdb565b6001600160e01b031990921660209283029190910190910152805163595c6a6760e01b90829060019081106106e4576106e4610bdb565b60200260200101516020015160078151811061070257610702610bdb565b6001600160e01b0319909216602092830291909101909101528051638a2ddd0360e01b908290600190811061073957610739610bdb565b60200260200101516020015160088151811061075757610757610bdb565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf2816001815181106107ad576107ad610bdb565b6020026020010151602001516009815181106107cb576107cb610bdb565b6001600160e01b03199092166020928302919091018201526040805163b4a0bdf360e01b81529051309263b4a0bdf392600480820193918290030181865afa15801561081b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083f9190610b92565b6001600160a01b0316635ec7870a6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561087c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a09190610bc2565b816002815181106108b3576108b3610bdb565b602002602001015160000181815250506001816002815181106108d8576108d8610bdb565b602090810291909101810151911515604092830152815160038082526080820190935291908201606080368337019050508160028151811061091c5761091c610bdb565b60200260200101516020018190525063d9dc1f1960e01b8160028151811061094657610946610bdb565b60200260200101516020015160008151811061096457610964610bdb565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b908290600290811061099b5761099b610bdb565b6020026020010151602001516001815181106109b9576109b9610bdb565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b90829060029081106109f0576109f0610bdb565b602002602001015160200151600281518110610a0e57610a0e610bdb565b6001600160e01b0319929092166020928302919091018201526040805160a08101825297885290870195909552938501929092525050306060830152600160808301529091565b6040516a04c546f6b656e45524332360ac1b6020820152602b016100a9565b600080600060608486031215610a8957600080fd5b505081359360208301359350604090920135919050565b600060c08201845183526020808601518185015260408087015181860152606060018060a01b0381890151168187015260808089015115158188015260c060a088015284885180875260e08901915060e08160051b8a01019650858a016000805b83811015610b80578b8a0360df19018552825180518b52898101518a8c018990528051898d01819052908b01908490898e01905b80831015610b5f5783516001600160e01b0319168252928d019260019290920191908d0190610b35565b50928b015115159c8b019c909c525099509388019391880191600101610b01565b50979c9b505050505050505050505050565b600060208284031215610ba457600080fd5b81516001600160a01b0381168114610bbb57600080fd5b9392505050565b600060208284031215610bd457600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fdfea26469706673582212208ec8a35dd6a3b8d5b0bb6569feab6a841e2aab2c5e4472a369516232758a097764736f6c634300080f0033";

type LTokenERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LTokenERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LTokenERC20__factory extends ContractFactory {
  constructor(...args: LTokenERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LTokenERC20> {
    return super.deploy(overrides || {}) as Promise<LTokenERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LTokenERC20 {
    return super.attach(address) as LTokenERC20;
  }
  override connect(signer: Signer): LTokenERC20__factory {
    return super.connect(signer) as LTokenERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LTokenERC20Interface {
    return new utils.Interface(_abi) as LTokenERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LTokenERC20 {
    return new Contract(address, _abi, signerOrProvider) as LTokenERC20;
  }
}
