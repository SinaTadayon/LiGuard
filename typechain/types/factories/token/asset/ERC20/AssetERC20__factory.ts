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
        name: "assetId",
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
        indexed: true,
        internalType: "address",
        name: "tokenId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "assetManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "assetSubject",
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
      {
        indexed: false,
        internalType: "bytes32",
        name: "role",
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
        name: "assetId",
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
    name: "assetAcl",
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
            internalType: "bytes32",
            name: "domainRealm",
            type: "bytes32",
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
            internalType: "address",
            name: "subject",
            type: "address",
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
  "0x608060405234801561001057600080fd5b506006805460ff191660011790556125748061002d6000396000f3fe6080604052600436106101435760003560e01c8063961974ba116100b0578063c66f24551161006c578063c66f2455146103a5578063c9230c5d146103b8578063dbc2d852146103cd578063e9dbebbd146103ed578063f1296fc51461040d578063fc5240641461042257005b8063961974ba146102f85780639c42c5ec146103185780639e00fcc2146103385780639e1a4d191461035b578063a52e8e6014610370578063ba4771ba1461039057005b80634cfb9949116100ff5780634cfb9949146102335780635ce6e2001461024b57806368cdafe61461026b57806370c55c021461028b578063756af45f146102b8578063846981c8146102d857005b806301ffc9a71461014c5780630cd689f5146101815780630ee0f6c2146101a15780631083f761146101da5780633c872e5f146101f85780633fe3347a1461021757005b3661014a57005b005b34801561015857600080fd5b5061016c610167366004611d55565b610442565b60405190151581526020015b60405180910390f35b34801561018d57600080fd5b5061016c61019c366004611d9b565b610494565b3480156101ad57600080fd5b50600054630100000090046001600160a01b03165b6040516001600160a01b039091168152602001610178565b3480156101e657600080fd5b506001546001600160a01b03166101c2565b34801561020457600080fd5b506003545b604051908152602001610178565b34801561022357600080fd5b5060016040516101789190611dc5565b34801561023f57600080fd5b5060065460ff1661016c565b34801561025757600080fd5b5061014a610266366004611ded565b610549565b34801561027757600080fd5b5061016c610286366004611d9b565b610e7d565b34801561029757600080fd5b506102ab6102a6366004611e29565b610eec565b6040516101789190611e9e565b3480156102c457600080fd5b5061014a6102d3366004611ee2565b611030565b3480156102e457600080fd5b506102096102f3366004611efd565b611075565b34801561030457600080fd5b5061016c610313366004611f15565b61117a565b34801561032457600080fd5b5061016c610333366004611f51565b611237565b34801561034457600080fd5b5060005460405161ffff9091168152602001610178565b34801561036757600080fd5b506102096112a4565b34801561037c57600080fd5b5061020961038b366004611d9b565b611311565b34801561039c57600080fd5b50600554610209565b3480156103b157600080fd5b5047610209565b3480156103c457600080fd5b50600254610209565b3480156103d957600080fd5b5061016c6103e8366004611fc2565b6113bf565b3480156103f957600080fd5b5061016c610408366004611fdf565b611543565b34801561041957600080fd5b50600454610209565b34801561042e57600080fd5b5061020961043d366004611d9b565b6115ab565b60006001600160e01b03198216639673b47d60e01b148061047357506001600160e01b0319821663391f033d60e11b145b8061048e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006104a6630cd689f560e01b61161a565b604051630cd689f560e01b903090339060008051602061251f83398151915290600090a460015460405163095ea7b360e01b81526001600160a01b038581166004830152602482018590529091169063095ea7b3906044015b6020604051808303816000875af115801561051e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105429190612042565b9392505050565b60005462010000900460ff161580801561056b5750600054600161ffff909116105b806105865750303b158015610586575060005461ffff166001145b6105d75760405162461bcd60e51b815260206004820152601c60248201527f436f6e747261637420416c726561647920496e697469616c697a65640000000060448201526064015b60405180910390fd5b6000805461ffff1916600117905580156105fd576000805462ff00001916620100001790555b61060d60a0830160808401611ee2565b6001600160a01b03166301ffc9a7634a17459160e11b6040518263ffffffff1660e01b815260040161063f919061205f565b602060405180830381865afa925050508015610678575060408051601f3d908101601f1916820190925261067591810190612042565b60015b6106c45760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204552433230546f6b656e204164647265737300000000000060448201526064016105ce565b806107115760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964204552433230546f6b656e204164647265737300000000000060448201526064016105ce565b5061072260a0830160808401611ee2565b6001600160a01b03166301ffc9a763e3a31a9d60e01b6040518263ffffffff1660e01b8152600401610754919061205f565b602060405180830381865afa92505050801561078d575060408051601f3d908101601f1916820190925261078a91810190612042565b60015b6107d95760405162461bcd60e51b815260206004820152601f60248201527f496c6c6567616c204552433230546f6b656e457874726120416464726573730060448201526064016105ce565b806108265760405162461bcd60e51b815260206004820152601f60248201527f496e76616c6964204552433230546f6b656e457874726120416464726573730060448201526064016105ce565b5061083760a0830160808401611ee2565b6001600160a01b03166301ffc9a7627b720760e91b6040518263ffffffff1660e01b8152600401610868919061205f565b602060405180830381865afa9250505080156108a1575060408051601f3d908101601f1916820190925261089e91810190612042565b60015b6108e65760405162461bcd60e51b8152602060048201526016602482015275496c6c6567616c204552433230546f6b656e4c6f636b60501b60448201526064016105ce565b806109335760405162461bcd60e51b815260206004820152601e60248201527f496e76616c6964204552433230546f6b656e4c6f636b2041646472657373000060448201526064016105ce565b5061094460c0830160a08401611ee2565b6001600160a01b03166301ffc9a76314b8343560e31b6040518263ffffffff1660e01b8152600401610976919061205f565b602060405180830381865afa9250505080156109af575060408051601f3d908101601f191682019092526109ac91810190612042565b60015b6109fb5760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105ce565b80610a485760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105ce565b50610a5960e0830160c08401611ee2565b6001600160a01b03166301ffc9a7631c8b5d5b60e11b6040518263ffffffff1660e01b8152600401610a8b919061205f565b602060405180830381865afa925050508015610ac4575060408051601f3d908101601f19168201909252610ac191810190612042565b60015b610b105760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204941737365744d616e61676572455243323000000000000060448201526064016105ce565b80610b5d5760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964204941737365744d616e61676572455243323000000000000060448201526064016105ce565b50610b6e60c0830160a08401611ee2565b600080546301000000600160b81b03191663010000006001600160a01b0393841681029190911791829055604051632f032edd60e01b815260208601356004820152910490911690632f032edd90602401602060405180830381865afa158015610bdc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c009190612042565b610c4c5760405162461bcd60e51b815260206004820152601b60248201527f526f6c65204e6f7420466f756e64204f522044697361626c656420000000000060448201526064016105ce565b8135600455610c5e60e0830183612074565b604051602001610c6f9291906120c2565b60408051601f198184030181529190528051602090910120600255610c98610100830183612074565b604051602001610ca99291906120c2565b60408051601f198184030181529190528051602090910120600355610cd460a0830160808401611ee2565b600180546001600160a01b0319166001600160a01b0392909216919091179055602082013560058190556006805460ff191690556002546003546004546000938493610d4893909290916040890135610d3360808b0160608c01611ee2565b610d4360e08c0160c08d01611ee2565b611744565b6000549193509150630100000090046001600160a01b0316637b443379610d73610120870187612074565b85856040518563ffffffff1660e01b8152600401610d9494939291906121a7565b6020604051808303816000875af1158015610db3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd7919061222f565b506001546001600160a01b031630337f4e149bf06550b750e3ae2aa4b8f3300c462ddb3af0ae64e461d380004fd39e96610e1760e0890160c08a01611ee2565b610e2760808a0160608b01611ee2565b610e3460e08b018b612074565b610e426101008d018d612074565b600454600554604051610e5c989796959493929190612248565b60405180910390a450508015610e79576000805462ff0000191690555b5050565b6000610e8f633466d7f360e11b61161a565b604051633466d7f360e11b903090339060008051602061251f83398151915290600090a460015460405163a9059cbb60e01b81526001600160a01b038581166004830152602482018590529091169063a9059cbb906044016104ff565b6060610efe633862ae0160e11b61161a565b60005b82811015610f925730848483818110610f1c57610f1c6122a0565b610f329260206080909202019081019150611ee2565b6001600160a01b031614610f805760405162461bcd60e51b8152602060048201526015602482015274496c6c6567616c20536f757263652041646472657360581b60448201526064016105ce565b80610f8a816122b6565b915050610f01565b50604051633862ae0160e11b903090339060008051602061251f83398151915290600090a4600154604051639a7e187360e01b81526001600160a01b0390911690639a7e187390610fe9908690869060040161231b565b6000604051808303816000875af1158015611008573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105429190810190612373565b61104063756af45f60e01b61161a565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015610e79573d6000803e3d6000fd5b600061108763108d303960e31b61161a565b306110956020840184611ee2565b6001600160a01b0316146110e35760405162461bcd60e51b8152602060048201526015602482015274496c6c6567616c20536f757263652041646472657360581b60448201526064016105ce565b60405163108d303960e31b903090339060008051602061251f83398151915290600090a46001546040516335c1ca4960e11b81526001600160a01b0390911690636b83949290611137908590600401612431565b6020604051808303816000875af1158015611156573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048e919061222f565b600061118c634b0cba5d60e11b61161a565b604051634b0cba5d60e11b903090339060008051602061251f83398151915290600090a46001546040516323b872dd60e01b81526001600160a01b038681166004830152858116602483015260448201859052909116906323b872dd906064016020604051808303816000875af115801561120b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061122f9190612042565b949350505050565b6000611249632710b17b60e21b61161a565b604051632710b17b60e21b903090339060008051602061251f83398151915290600090a460015460405163038d251d60e31b81526001600160a01b0390911690631c6928e8906104ff908690869060040161243f565b905090565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156112ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061129f919061222f565b6000611323630529747360e51b61161a565b604051630529747360e51b903090339060008051602061251f83398151915290600090a460015460405163a457c2d760e01b81526001600160a01b038581166004830152602482018590529091169063a457c2d7906044015b6020604051808303816000875af115801561139b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610542919061222f565b60008054630100000090046001600160a01b031663c7ab39e66113e130611d16565b336040516001600160e01b031960e085901b16815261140d929190636de16c2960e11b906004016124ab565b602060405180830381865afa15801561142a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061144e9190612042565b6114955760405162461bcd60e51b8152602060048201526018602482015277105cdcd95d115490cc8c081058d8d95cdcc811195b9a595960421b60448201526064016105ce565b60005461ffff166114e85760405162461bcd60e51b815260206004820152601a60248201527f41737365744552433230204e6f7420496e697469616c697a656400000000000060448201526064016105ce565b6006805460ff191683151517905560045430336001600160a01b03167f81142a54c3126b9c1789bd912322adcca4d73a5010d8049eaa6d63ab4c0b515485604051611537911515815260200190565b60405180910390a45090565b600061155563e9dbebbd60e01b61161a565b60405163e9dbebbd60e01b903090339060008051602061251f83398151915290600090a4600154604051631f54aa5560e31b81526001600160a01b039091169063faa552a8906104ff90869086906004016124d4565b60006115bd633f14901960e21b61161a565b604051633f14901960e21b903090339060008051602061251f83398151915290600090a4600154604051633950935160e01b81526001600160a01b038581166004830152602482018590529091169063395093519060440161137c565b60065460ff16156116785760405162461bcd60e51b815260206004820152602260248201527f536166654d6f64653a20417373657445524332302043616c6c2052656a656374604482015261195960f21b60648201526084016105ce565b600054630100000090046001600160a01b031663c7ab39e661169930611d16565b33846040518463ffffffff1660e01b81526004016116b9939291906124ab565b602060405180830381865afa1580156116d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116fa9190612042565b6117415760405162461bcd60e51b8152602060048201526018602482015277105cdcd95d115490cc8c081058d8d95cdcc811195b9a595960421b60448201526064016105ce565b50565b6040805160e08101825260008082526020820181905281830181905260608083018290526080830182905260a0830182905260c08301829052835160028082528183019095529293909290816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081611794579050506040517f4c4956454c595f41535345545f41444d494e5f524f4c450000000000000000006020820152909150603701604051602081830303815290604052805190602001208160008151811061181e5761181e6122a0565b60200260200101516000018181525050600181600081518110611843576118436122a0565b602090810291909101015190151560409182015280516001808252818301909252908160200160208202803683370190505081600081518110611888576118886122a0565b60200260200101516020018190525063dbc2d85260e01b816000815181106118b2576118b26122a0565b6020026020010151602001516000815181106118d0576118d06122a0565b60200260200101906001600160e01b03191690816001600160e01b031916815250508681600181518110611906576119066122a0565b6020026020010151600001818152505060018160018151811061192b5761192b6122a0565b6020908102919091018101519115156040928301528151600a808252610160820190935291908201610140803683370190505081600181518110611971576119716122a0565b60200260200101516020018190525063846981c860e01b8160018151811061199b5761199b6122a0565b6020026020010151602001516000815181106119b9576119b96122a0565b6001600160e01b0319909216602092830291909101909101528051633862ae0160e11b90829060019081106119f0576119f06122a0565b602002602001015160200151600181518110611a0e57611a0e6122a0565b6001600160e01b0319909216602092830291909101909101528051633466d7f360e11b9082906001908110611a4557611a456122a0565b602002602001015160200151600281518110611a6357611a636122a0565b6001600160e01b031990921660209283029190910190910152805163e9dbebbd60e01b9082906001908110611a9a57611a9a6122a0565b602002602001015160200151600381518110611ab857611ab86122a0565b6001600160e01b0319909216602092830291909101909101528051634b0cba5d60e11b9082906001908110611aef57611aef6122a0565b602002602001015160200151600481518110611b0d57611b0d6122a0565b6001600160e01b0319909216602092830291909101909101528051632710b17b60e21b9082906001908110611b4457611b446122a0565b602002602001015160200151600581518110611b6257611b626122a0565b6001600160e01b0319909216602092830291909101909101528051630cd689f560e01b9082906001908110611b9957611b996122a0565b602002602001015160200151600681518110611bb757611bb76122a0565b6001600160e01b0319909216602092830291909101909101528051633f14901960e21b9082906001908110611bee57611bee6122a0565b602002602001015160200151600781518110611c0c57611c0c6122a0565b6001600160e01b0319909216602092830291909101909101528051630529747360e51b9082906001908110611c4357611c436122a0565b602002602001015160200151600881518110611c6157611c616122a0565b6001600160e01b031990921660209283029190910190910152805163756af45f60e01b9082906001908110611c9857611c986122a0565b602002602001015160200151600981518110611cb657611cb66122a0565b6001600160e01b0319929092166020928302919091018201526040805160e0810182529b8c52908b0199909952978901969096525060608701929092526001600160a01b0390811660808701521660a08501525050600160c08301529091565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b600060208284031215611d6757600080fd5b81356001600160e01b03198116811461054257600080fd5b80356001600160a01b0381168114611d9657600080fd5b919050565b60008060408385031215611dae57600080fd5b611db783611d7f565b946020939093013593505050565b6020810160048310611de757634e487b7160e01b600052602160045260246000fd5b91905290565b600060208284031215611dff57600080fd5b813567ffffffffffffffff811115611e1657600080fd5b8201610140818503121561054257600080fd5b60008060208385031215611e3c57600080fd5b823567ffffffffffffffff80821115611e5457600080fd5b818501915085601f830112611e6857600080fd5b813581811115611e7757600080fd5b8660208260071b8501011115611e8c57600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015611ed657835183529284019291840191600101611eba565b50909695505050505050565b600060208284031215611ef457600080fd5b61054282611d7f565b600060808284031215611f0f57600080fd5b50919050565b600080600060608486031215611f2a57600080fd5b611f3384611d7f565b9250611f4160208501611d7f565b9150604084013590509250925092565b60008060208385031215611f6457600080fd5b823567ffffffffffffffff80821115611f7c57600080fd5b818501915085601f830112611f9057600080fd5b813581811115611f9f57600080fd5b866020606083028501011115611e8c57600080fd5b801515811461174157600080fd5b600060208284031215611fd457600080fd5b813561054281611fb4565b60008060208385031215611ff257600080fd5b823567ffffffffffffffff8082111561200a57600080fd5b818501915085601f83011261201e57600080fd5b81358181111561202d57600080fd5b8660208260061b8501011115611e8c57600080fd5b60006020828403121561205457600080fd5b815161054281611fb4565b6001600160e01b031991909116815260200190565b6000808335601e1984360301811261208b57600080fd5b83018035915067ffffffffffffffff8211156120a657600080fd5b6020019150368190038213156120bb57600080fd5b9250929050565b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600081518084526020808501808196508360051b810191508286016000805b86811015612199578385038a528251805186528681015160608888018190528151908801819052608088019189019085905b808210156121765782516001600160e01b0319168452928a0192918a01916001919091019061214c565b50505060409182015115159690910195909552988501989185019160010161211a565b509298975050505050505050565b60006101208083526121bc81840187896120d2565b905084516020840152602085015160408401526040850151606084015260608501516080840152608085015160018060a01b0380821660a08601528060a08801511660c0860152505060c0850151151560e084015282810361010084015261222481856120fb565b979650505050505050565b60006020828403121561224157600080fd5b5051919050565b6001600160a01b0389811682528816602082015260c060408201819052600090612275908301888a6120d2565b82810360608401526122888187896120d2565b6080840195909552505060a001529695505050505050565b634e487b7160e01b600052603260045260246000fd5b6000600182016122d657634e487b7160e01b600052601160045260246000fd5b5060010190565b6001600160a01b03806122ef83611d7f565b168352806122ff60208401611d7f565b1660208401525060408181013590830152606090810135910152565b6020808252810182905260008360408301825b858110156123535761234082846122dd565b608092830192919091019060010161232e565b5095945050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561238657600080fd5b825167ffffffffffffffff8082111561239e57600080fd5b818501915085601f8301126123b257600080fd5b8151818111156123c4576123c461235d565b8060051b604051601f19603f830116810181811085821117156123e9576123e961235d565b60405291825284820192508381018501918883111561240757600080fd5b938501935b828510156124255784518452938501939285019261240c565b98975050505050505050565b6080810161048e82846122dd565b6020808252818101839052600090604080840186845b8781101561249e576001600160a01b038061246f84611d7f565b1684528061247e878501611d7f565b168487015250818401358484015260609283019290910190600101612455565b5090979650505050505050565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b6020808252818101839052600090604080840186845b8781101561249e576001600160a01b0361250383611d7f565b168352818501358584015291830191908301906001016124ea56fe33c2ad0e769b5a5e7f07ab57ff61ae195b76839fc48d116ffe8dc881334fa213a2646970667358221220b1318621f9881b73e2092c3710b7ab902adb2c594ca89d7589c884f766ae468264736f6c63430008110033";

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
