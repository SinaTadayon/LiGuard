/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  AssetERC20,
  AssetERC20Interface,
} from "../../../../token/asset/ERC20/AssetERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
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
        name: "contractId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
    ],
    name: "AssetERC20Called",
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
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "AssetInitialized",
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
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "AssetSafeModeChanged",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "assetBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetInitStatus",
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
    inputs: [],
    name: "assetInitVersion",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetName",
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
    name: "assetRealm",
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
    name: "assetRole",
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
    name: "assetSafeMode",
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
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "assetSafeModeSet",
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
    inputs: [],
    name: "assetToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetType",
    outputs: [
      {
        internalType: "enum IAssetEntity.AssetType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "assetVersion",
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
        components: [
          {
            internalType: "string",
            name: "domainName",
            type: "string",
          },
          {
            internalType: "string",
            name: "domainVersion",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "domainRealm",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "erc20Token",
            type: "address",
          },
          {
            internalType: "address",
            name: "accessControl",
            type: "address",
          },
          {
            internalType: "address",
            name: "assetManager",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "assetRole",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "bytesHash",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct AssetERC20.InitRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tokenApprove",
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
    inputs: [],
    name: "tokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
            name: "source",
            type: "address",
          },
          {
            internalType: "address",
            name: "dest",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20Lock.LockTokenRequest[]",
        name: "lockRequests",
        type: "tuple[]",
      },
    ],
    name: "tokenBatchLock",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
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
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20Extra.BatchTransferRequest[]",
        name: "request",
        type: "tuple[]",
      },
    ],
    name: "tokenBatchTransfer",
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
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20Extra.BatchTransferFromRequest[]",
        name: "request",
        type: "tuple[]",
      },
    ],
    name: "tokenBatchTransferFrom",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tokenDecreaseAllowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tokenIncreaseAllowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
            name: "source",
            type: "address",
          },
          {
            internalType: "address",
            name: "dest",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20Lock.LockTokenRequest",
        name: "lockRequest",
        type: "tuple",
      },
    ],
    name: "tokenLock",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tokenTransfer",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tokenTransferFrom",
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
        internalType: "address",
        name: "recepient",
        type: "address",
      },
    ],
    name: "withdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506007805460ff19166001179055612e088061002d6000396000f3fe6080604052600436106101435760003560e01c8063961974ba116100b0578063c66f24551161006c578063c66f245514610394578063c9230c5d146103a7578063dbc2d852146103bc578063e9dbebbd146103dc578063f1296fc5146103fc578063fc5240641461041157005b8063961974ba146102e75780639c42c5ec146103075780639e00fcc2146103275780639e1a4d191461034a578063a52e8e601461035f578063ba4771ba1461037f57005b80634cfb9949116100ff5780634cfb99491461022257806355d7ffd21461023a57806368cdafe61461025a57806370c55c021461027a578063756af45f146102a7578063846981c8146102c757005b806301ffc9a71461014c5780630cd689f5146101815780631083f761146101a15780631da3bfdc146101c95780633c872e5f146101e75780633fe3347a1461020657005b3661014a57005b005b34801561015857600080fd5b5061016c6101673660046125ed565b610431565b60405190151581526020015b60405180910390f35b34801561018d57600080fd5b5061016c61019c366004612633565b610483565b3480156101ad57600080fd5b506002546040516001600160a01b039091168152602001610178565b3480156101d557600080fd5b5060005462010000900460ff1661016c565b3480156101f357600080fd5b506004545b604051908152602001610178565b34801561021257600080fd5b506001604051610178919061265d565b34801561022e57600080fd5b5060075460ff1661016c565b34801561024657600080fd5b5061014a610255366004612685565b61053d565b34801561026657600080fd5b5061016c610275366004612633565b610e5f565b34801561028657600080fd5b5061029a6102953660046126c1565b610ece565b6040516101789190612736565b3480156102b357600080fd5b5061014a6102c236600461277a565b611018565b3480156102d357600080fd5b506101f86102e2366004612795565b61105d565b3480156102f357600080fd5b5061016c6103023660046127ad565b611168565b34801561031357600080fd5b5061016c6103223660046127e9565b611225565b34801561033357600080fd5b5060005460405161ffff9091168152602001610178565b34801561035657600080fd5b506101f861128d565b34801561036b57600080fd5b506101f861037a366004612633565b6112fa565b34801561038b57600080fd5b506006546101f8565b3480156103a057600080fd5b50476101f8565b3480156103b357600080fd5b506003546101f8565b3480156103c857600080fd5b5061016c6103d736600461285a565b6113a8565b3480156103e857600080fd5b5061016c6103f7366004612877565b611972565b34801561040857600080fd5b506005546101f8565b34801561041d57600080fd5b506101f861042c366004612633565b6119da565b60006001600160e01b03198216638530fd6360e01b148061046257506001600160e01b0319821663391f033d60e11b145b8061047d57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000610495630cd689f560e01b611a49565b604051630cd689f560e01b9030903390600080516020612db383398151915290600090a460025460405163095ea7b360e01b81526001600160a01b038581166004830152602482018590529091169063095ea7b3906044015b6020604051808303816000875af115801561050d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053191906128da565b9392505050565b905090565b60005462010000900460ff161580801561055f5750600054600161ffff909116105b8061057a5750303b15801561057a575060005461ffff166001145b6105cb5760405162461bcd60e51b815260206004820152601c60248201527f436f6e747261637420416c726561647920496e697469616c697a65640000000060448201526064015b60405180910390fd5b6000805461ffff1916600117905580156105f1576000805462ff00001916620100001790555b610601608083016060840161277a565b6001600160a01b03166301ffc9a7634a17459160e11b6040518263ffffffff1660e01b815260040161063391906128f7565b602060405180830381865afa92505050801561066c575060408051601f3d908101601f19168201909252610669918101906128da565b60015b6106b85760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204552433230546f6b656e204164647265737300000000000060448201526064016105c2565b806107055760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964204552433230546f6b656e204164647265737300000000000060448201526064016105c2565b50610716608083016060840161277a565b6001600160a01b03166301ffc9a763e3a31a9d60e01b6040518263ffffffff1660e01b815260040161074891906128f7565b602060405180830381865afa925050508015610781575060408051601f3d908101601f1916820190925261077e918101906128da565b60015b6107cd5760405162461bcd60e51b815260206004820152601f60248201527f496c6c6567616c204552433230546f6b656e457874726120416464726573730060448201526064016105c2565b8061081a5760405162461bcd60e51b815260206004820152601f60248201527f496e76616c6964204552433230546f6b656e457874726120416464726573730060448201526064016105c2565b5061082b608083016060840161277a565b6001600160a01b03166301ffc9a7627b720760e91b6040518263ffffffff1660e01b815260040161085c91906128f7565b602060405180830381865afa925050508015610895575060408051601f3d908101601f19168201909252610892918101906128da565b60015b6108da5760405162461bcd60e51b8152602060048201526016602482015275496c6c6567616c204552433230546f6b656e4c6f636b60501b60448201526064016105c2565b806109275760405162461bcd60e51b815260206004820152601e60248201527f496e76616c6964204552433230546f6b656e4c6f636b2041646472657373000060448201526064016105c2565b5061093860a083016080840161277a565b6001600160a01b03166301ffc9a7634d4a792560e01b6040518263ffffffff1660e01b815260040161096a91906128f7565b602060405180830381865afa9250505080156109a3575060408051601f3d908101601f191682019092526109a0918101906128da565b60015b6109ef5760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b80610a3c5760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b50610a4d60c0830160a0840161277a565b6001600160a01b03166301ffc9a7639ee1f42160e01b6040518263ffffffff1660e01b8152600401610a7f91906128f7565b602060405180830381865afa925050508015610ab8575060408051601f3d908101601f19168201909252610ab5918101906128da565b60015b610b045760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204941737365744d616e61676572455243323000000000000060448201526064016105c2565b80610b515760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964204941737365744d616e61676572455243323000000000000060448201526064016105c2565b50610b6260a083016080840161277a565b600080546301000000600160b81b03191663010000006001600160a01b0393841681029190911791829055604051632f032edd60e01b815260c08601356004820152910490911690632f032edd90602401602060405180830381865afa158015610bd0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf491906128da565b610c405760405162461bcd60e51b815260206004820152601b60248201527f526f6c65204e6f7420466f756e64204f522044697361626c656420000000000060448201526064016105c2565b6040820135600555610c52828061290c565b604051602001610c6392919061295a565b60408051601f198184030181529190528051602091820120600355610c8a9083018361290c565b604051602001610c9b92919061295a565b60408051601f198184030181529190528051602090910120600455610cc6608083016060840161277a565b600280546001600160a01b0319166001600160a01b039290921691909117905560c082018035600655610cfc9060a0840161277a565b600180546001600160a01b0319166001600160a01b03929092169190911790556007805460ff191690556003546004546005546006546000938493610d6093919290919060e08901356101008a0135610d5b60c08c0160a08d0161277a565b611fab565b6000549193509150630100000090046001600160a01b031663309c140e610d8b61012087018761290c565b85856040518563ffffffff1660e01b8152600401610dac9493929190612a3f565b6020604051808303816000875af1158015610dcb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610def9190612ac1565b5030337f1c34e33616ef4efc28a1b841ee5c0d3551efc74468b831760f35a628fe19e66c610e1d878061290c565b610e2a60208a018a61290c565b600554604051610e3e959493929190612ada565b60405180910390a350508015610e5b576000805462ff0000191690555b5050565b6000610e71633466d7f360e11b611a49565b604051633466d7f360e11b9030903390600080516020612db383398151915290600090a460025460405163a9059cbb60e01b81526001600160a01b038581166004830152602482018590529091169063a9059cbb906044016104ee565b6060610ee0633862ae0160e11b611a49565b60005b82811015610f745730848483818110610efe57610efe612b14565b610f14926020608090920201908101915061277a565b6001600160a01b031614610f625760405162461bcd60e51b8152602060048201526015602482015274496c6c6567616c20536f757263652041646472657360581b60448201526064016105c2565b80610f6c81612b2a565b915050610ee3565b50604051633862ae0160e11b9030903390600080516020612db383398151915290600090a4600154600254604051633d04ca0f60e11b81526001600160a01b0392831692637a09941e92610fd19291169087908790600401612b8f565b6000604051808303816000875af1158015610ff0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105319190810190612bf8565b61102863756af45f60e01b611a49565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015610e5b573d6000803e3d6000fd5b600061106f63108d303960e31b611a49565b3061107d602084018461277a565b6001600160a01b0316146110cb5760405162461bcd60e51b8152602060048201526015602482015274496c6c6567616c20536f757263652041646472657360581b60448201526064016105c2565b60405163108d303960e31b9030903390600080516020612db383398151915290600090a46001546002546040516305d8665560e11b81526001600160a01b0392831692630bb0ccaa92611125929116908690600401612cb6565b6020604051808303816000875af1158015611144573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047d9190612ac1565b600061117a634b0cba5d60e11b611a49565b604051634b0cba5d60e11b9030903390600080516020612db383398151915290600090a46002546040516323b872dd60e01b81526001600160a01b038681166004830152858116602483015260448201859052909116906323b872dd906064016020604051808303816000875af11580156111f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121d91906128da565b949350505050565b6000611237632710b17b60e21b611a49565b604051632710b17b60e21b9030903390600080516020612db383398151915290600090a460025460405163038d251d60e31b81526001600160a01b0390911690631c6928e8906104ee9086908690600401612cd3565b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156112d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105389190612ac1565b600061130c630529747360e51b611a49565b604051630529747360e51b9030903390600080516020612db383398151915290600090a460025460405163a457c2d760e01b81526001600160a01b038581166004830152602482018590529091169063a457c2d7906044015b6020604051808303816000875af1158015611384573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105319190612ac1565b60008054630100000090046001600160a01b031663c34aa021336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015611406573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061142a91906128da565b156117fa57600061143a306125ae565b60005460405163b4c4b58f60e01b815260048101839052636de16c2960e11b6024820152919250630100000090046001600160a01b03169063b4c4b58f90604401602060405180830381865afa158015611498573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114bc91906128da565b6114fb5760405162461bcd60e51b815260206004820152601060248201526f10dbdb9d195e1d08111a5cd8589b195960821b60448201526064016105c2565b60005460408051635495ee4f60e11b8152905163010000009092046001600160a01b031691632f032edd91839163a92bdc9e916004808201926020929091908290030181865afa158015611553573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115779190612ac1565b6040518263ffffffff1660e01b815260040161159591815260200190565b602060405180830381865afa1580156115b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115d691906128da565b6116225760405162461bcd60e51b815260206004820152601960248201527f41737365742041646d696e20526f6c652044697361626c65640000000000000060448201526064016105c2565b60005460408051634702301d60e01b8152905163010000009092046001600160a01b031691633228144d918391634702301d916004808201926020929091908290030181865afa15801561167a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061169e9190612ac1565b6040518263ffffffff1660e01b81526004016116bc91815260200190565b602060405180830381865afa1580156116d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116fd91906128da565b6117405760405162461bcd60e51b8152602060048201526014602482015273105cdcd95d0811dc9bdd5c08111a5cd8589b195960621b60448201526064016105c2565b6000546005546040516362473d7360e11b8152600481019190915263010000009091046001600160a01b03169063c48e7ae690602401602060405180830381865afa158015611793573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b791906128da565b6117f45760405162461bcd60e51b815260206004820152600e60248201526d1499585b1b48111a5cd8589b195960921b60448201526064016105c2565b506118c4565b600054630100000090046001600160a01b031663c7ab39e661181b306125ae565b336040516001600160e01b031960e085901b168152611847929190636de16c2960e11b90600401612d3f565b602060405180830381865afa158015611864573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061188891906128da565b6118c45760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc811195b9a5959609a1b60448201526064016105c2565b60005461ffff166119175760405162461bcd60e51b815260206004820152601860248201527f436f6e7472616374204e6f7420496e697469616c697a6564000000000000000060448201526064016105c2565b6007805460ff191683151517905560055430336001600160a01b03167f81142a54c3126b9c1789bd912322adcca4d73a5010d8049eaa6d63ab4c0b515485604051611966911515815260200190565b60405180910390a45090565b600061198463e9dbebbd60e01b611a49565b60405163e9dbebbd60e01b9030903390600080516020612db383398151915290600090a4600254604051631f54aa5560e31b81526001600160a01b039091169063faa552a8906104ee9086908690600401612d68565b60006119ec633f14901960e21b611a49565b604051633f14901960e21b9030903390600080516020612db383398151915290600090a4600254604051633950935160e01b81526001600160a01b0385811660048301526024820185905290911690633950935190604401611365565b60075460ff1615611a9c5760405162461bcd60e51b815260206004820152601760248201527f536166654d6f64653a2043616c6c2052656a656374656400000000000000000060448201526064016105c2565b600054630100000090046001600160a01b031663d9d34bf8336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015611af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b1d91906128da565b15611eea576000611b2d306125ae565b60005460405163b4c4b58f60e01b8152600481018390526001600160e01b031985166024820152919250630100000090046001600160a01b03169063b4c4b58f90604401602060405180830381865afa158015611b8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bb291906128da565b611bf15760405162461bcd60e51b815260206004820152601060248201526f10dbdb9d195e1d08111a5cd8589b195960821b60448201526064016105c2565b600054604080516312f6fda760e21b8152905163010000009092046001600160a01b031691632f032edd918391634bdbf69c916004808201926020929091908290030181865afa158015611c49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c6d9190612ac1565b6040518263ffffffff1660e01b8152600401611c8b91815260200190565b602060405180830381865afa158015611ca8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ccc91906128da565b611d185760405162461bcd60e51b815260206004820152601b60248201527f4173736574204d616e6167657220526f6c652044697361626c6564000000000060448201526064016105c2565b60005460408051634702301d60e01b8152905163010000009092046001600160a01b031691633228144d918391634702301d916004808201926020929091908290030181865afa158015611d70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d949190612ac1565b6040518263ffffffff1660e01b8152600401611db291815260200190565b602060405180830381865afa158015611dcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611df391906128da565b611e365760405162461bcd60e51b8152602060048201526014602482015273105cdcd95d0811dc9bdd5c08111a5cd8589b195960621b60448201526064016105c2565b6000546005546040516362473d7360e11b8152600481019190915263010000009091046001600160a01b03169063c48e7ae690602401602060405180830381865afa158015611e89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ead91906128da565b610e5b5760405162461bcd60e51b815260206004820152600e60248201526d1499585b1b48111a5cd8589b195960921b60448201526064016105c2565b600054630100000090046001600160a01b031663c7ab39e6611f0b306125ae565b33846040518463ffffffff1660e01b8152600401611f2b93929190612d3f565b602060405180830381865afa158015611f48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f6c91906128da565b611fa85760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc811195b9a5959609a1b60448201526064016105c2565b50565b6040805160e08101825260008082526020820181905281830181905260608083018290526080830182905260a0830182905260c08301829052835160028082528183019095529293909290816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081611ffb579050509050600060039054906101000a90046001600160a01b03166001600160a01b031663098b01cf6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612082573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120a69190612ac1565b816000815181106120b9576120b9612b14565b602002602001015160000181815250506001816000815181106120de576120de612b14565b60209081029190910101519015156040918201528051600180825281830190925290816020016020820280368337019050508160008151811061212357612123612b14565b60200260200101516020018190525063dbc2d85260e01b8160008151811061214d5761214d612b14565b60200260200101516020015160008151811061216b5761216b612b14565b60200260200101906001600160e01b03191690816001600160e01b0319168152505086816001815181106121a1576121a1612b14565b602002602001015160000181815250506001816001815181106121c6576121c6612b14565b6020908102919091018101519115156040928301528151600a80825261016082019093529190820161014080368337019050508160018151811061220c5761220c612b14565b60200260200101516020018190525063846981c860e01b8160018151811061223657612236612b14565b60200260200101516020015160008151811061225457612254612b14565b6001600160e01b0319909216602092830291909101909101528051633862ae0160e11b908290600190811061228b5761228b612b14565b6020026020010151602001516001815181106122a9576122a9612b14565b6001600160e01b0319909216602092830291909101909101528051633466d7f360e11b90829060019081106122e0576122e0612b14565b6020026020010151602001516002815181106122fe576122fe612b14565b6001600160e01b031990921660209283029190910190910152805163e9dbebbd60e01b908290600190811061233557612335612b14565b60200260200101516020015160038151811061235357612353612b14565b6001600160e01b0319909216602092830291909101909101528051634b0cba5d60e11b908290600190811061238a5761238a612b14565b6020026020010151602001516004815181106123a8576123a8612b14565b6001600160e01b0319909216602092830291909101909101528051632710b17b60e21b90829060019081106123df576123df612b14565b6020026020010151602001516005815181106123fd576123fd612b14565b6001600160e01b0319909216602092830291909101909101528051630cd689f560e01b908290600190811061243457612434612b14565b60200260200101516020015160068151811061245257612452612b14565b6001600160e01b0319909216602092830291909101909101528051633f14901960e21b908290600190811061248957612489612b14565b6020026020010151602001516007815181106124a7576124a7612b14565b6001600160e01b0319909216602092830291909101909101528051630529747360e51b90829060019081106124de576124de612b14565b6020026020010151602001516008815181106124fc576124fc612b14565b6001600160e01b031990921660209283029190910190910152805163756af45f60e01b908290600190811061253357612533612b14565b60200260200101516020015160098151811061255157612551612b14565b6001600160e01b0319929092166020928302919091018201526040805160e0810182529b8c52908b01999099529789019690965250606087019290925260808601526001600160a01b031660a08501525050600160c08301529091565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6000602082840312156125ff57600080fd5b81356001600160e01b03198116811461053157600080fd5b80356001600160a01b038116811461262e57600080fd5b919050565b6000806040838503121561264657600080fd5b61264f83612617565b946020939093013593505050565b602081016004831061267f57634e487b7160e01b600052602160045260246000fd5b91905290565b60006020828403121561269757600080fd5b813567ffffffffffffffff8111156126ae57600080fd5b8201610140818503121561053157600080fd5b600080602083850312156126d457600080fd5b823567ffffffffffffffff808211156126ec57600080fd5b818501915085601f83011261270057600080fd5b81358181111561270f57600080fd5b8660208260071b850101111561272457600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b8181101561276e57835183529284019291840191600101612752565b50909695505050505050565b60006020828403121561278c57600080fd5b61053182612617565b6000608082840312156127a757600080fd5b50919050565b6000806000606084860312156127c257600080fd5b6127cb84612617565b92506127d960208501612617565b9150604084013590509250925092565b600080602083850312156127fc57600080fd5b823567ffffffffffffffff8082111561281457600080fd5b818501915085601f83011261282857600080fd5b81358181111561283757600080fd5b86602060608302850101111561272457600080fd5b8015158114611fa857600080fd5b60006020828403121561286c57600080fd5b81356105318161284c565b6000806020838503121561288a57600080fd5b823567ffffffffffffffff808211156128a257600080fd5b818501915085601f8301126128b657600080fd5b8135818111156128c557600080fd5b8660208260061b850101111561272457600080fd5b6000602082840312156128ec57600080fd5b81516105318161284c565b6001600160e01b031991909116815260200190565b6000808335601e1984360301811261292357600080fd5b83018035915067ffffffffffffffff82111561293e57600080fd5b60200191503681900382131561295357600080fd5b9250929050565b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600081518084526020808501808196508360051b810191508286016000805b86811015612a31578385038a528251805186528681015160608888018190528151908801819052608088019189019085905b80821015612a0e5782516001600160e01b0319168452928a0192918a0191600191909101906129e4565b5050506040918201511515969091019590955298850198918501916001016129b2565b509298975050505050505050565b6000610120808352612a54818401878961296a565b905084516020840152602085015160408401526040850151606084015260608501516080840152608085015160a084015260018060a01b0360a08601511660c084015260c0850151151560e0840152828103610100840152612ab68185612993565b979650505050505050565b600060208284031215612ad357600080fd5b5051919050565b606081526000612aee60608301878961296a565b8281036020840152612b0181868861296a565b9150508260408301529695505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201612b4a57634e487b7160e01b600052601160045260246000fd5b5060010190565b6001600160a01b0380612b6383612617565b16835280612b7360208401612617565b1660208401525060408181013590830152606090810135910152565b6001600160a01b0384168152604060208201819052810182905260008360608301825b85811015612bd757612bc48284612b51565b6080928301929190910190600101612bb2565b509695505050505050565b634e487b7160e01b600052604160045260246000fd5b60006020808385031215612c0b57600080fd5b825167ffffffffffffffff80821115612c2357600080fd5b818501915085601f830112612c3757600080fd5b815181811115612c4957612c49612be2565b8060051b604051601f19603f83011681018181108582111715612c6e57612c6e612be2565b604052918252848201925083810185019188831115612c8c57600080fd5b938501935b82851015612caa57845184529385019392850192612c91565b98975050505050505050565b6001600160a01b038316815260a081016105316020830184612b51565b6020808252818101839052600090604080840186845b87811015612d32576001600160a01b0380612d0384612617565b16845280612d12878501612617565b168487015250818401358484015260609283019290910190600101612ce9565b5090979650505050505050565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b6020808252818101839052600090604080840186845b87811015612d32576001600160a01b03612d9783612617565b16835281850135858401529183019190830190600101612d7e56fe33c2ad0e769b5a5e7f07ab57ff61ae195b76839fc48d116ffe8dc881334fa213a26469706673582212201fad6ba46ff6dbb4054f7c305abbe48098dd7dad355775e0cab26763b1b9532464736f6c63430008110033";

type AssetERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AssetERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AssetERC20__factory extends ContractFactory {
  constructor(...args: AssetERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AssetERC20> {
    return super.deploy(overrides || {}) as Promise<AssetERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AssetERC20 {
    return super.attach(address) as AssetERC20;
  }
  override connect(signer: Signer): AssetERC20__factory {
    return super.connect(signer) as AssetERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetERC20Interface {
    return new utils.Interface(_abi) as AssetERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetERC20 {
    return new Contract(address, _abi, signerOrProvider) as AssetERC20;
  }
}
