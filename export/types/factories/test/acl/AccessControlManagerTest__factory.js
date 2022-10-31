"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlManagerTest__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
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
                name: "proxy",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "subject",
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
                internalType: "uint16",
                name: "initCount",
                type: "uint16",
            },
        ],
        name: "Initialized",
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
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "LocalAdminChanged",
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
        name: "SafeModeChanged",
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
        name: "UpgradeStatusChanged",
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
        name: "Upgraded",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [],
        name: "accessControlManager",
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
        name: "contractContext",
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
        name: "contractName",
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
        name: "contractRealm",
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
        name: "contractVersion",
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
        name: "domainSeparator",
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
        name: "initVersion",
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
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "isSafeMode",
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
        name: "isUpgradable",
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
        name: "localAdmin",
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
        name: "proxiableUUID",
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
                internalType: "address",
                name: "newLocalAdmin",
                type: "address",
            },
        ],
        name: "setLocalAdmin",
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
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "setSafeMode",
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
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "setUpgradeStatus",
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
        name: "subjectAddress",
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
                name: "newImplementation",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "bool",
                name: "forceCall",
                type: "bool",
            },
        ],
        name: "upgradeTo",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
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
const _bytecode = "0x60a0604052306080523480156200001557600080fd5b506200004360017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd62000127565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc146200007457620000746200014f565b620000a160017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610462000127565b60008051602062001c3a83398151915214620000c157620000c16200014f565b33620000ea60008051602062001c3a83398151915260001b6200012460201b62000d931760201c565b80546001600160a01b03929092166001600160a01b03199092169190911790556003805461ffff60a01b1916600160a01b17905562000165565b90565b818103818111156200014957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052600160045260246000fd5b608051611a73620001c7600039600081816104150152818161045e015281816105dc0152818161061c015281816107b1015281816108470152818161088701528181610a3f01528181610a7f01528181610ba80152610be80152611a736000f3fe60806040526004361061010c5760003560e01c806375d0c0dc1161009a578063be22465d11610061578063be22465d146102e0578063d3e024b8146102ff578063d9dc1f1914610314578063f698da2514610334578063f94a0adb1461034957005b806375d0c0dc1461026e5780638129fc1c14610283578063870666cb14610298578063a0a8e460146102ad578063b4a0bdf3146102c257005b806352d1902d116100de57806352d1902d146101b25780635479d940146101d557806358dbc45d146101f45780637147855d14610221578063756af45f1461024e57005b806301ffc9a71461011557806338d38c971461014a57806344b7e5f21461017257806348e6be1c1461019257005b3661011357005b005b34801561012157600080fd5b506101356101303660046116d5565b61035e565b60405190151581526020015b60405180910390f35b34801561015657600080fd5b5061015f6103f5565b60405161ffff9091168152602001610141565b34801561017e57600080fd5b5061013561018d366004611718565b610409565b34801561019e57600080fd5b506101356101ad366004611718565b6105d0565b3480156101be57600080fd5b506101c76107a4565b604051908152602001610141565b3480156101e157600080fd5b50600354600160a81b900460ff16610135565b34801561020057600080fd5b50610209610831565b6040516001600160a01b039091168152602001610141565b34801561022d57600080fd5b5061024161023c366004611762565b61083b565b6040516101419190611884565b34801561025a57600080fd5b50610113610269366004611897565b610976565b34801561027a57600080fd5b506000546101c7565b34801561028f57600080fd5b50610113610a35565b3480156102a457600080fd5b506101c7610b91565b3480156102b957600080fd5b506001546101c7565b3480156102ce57600080fd5b506003546001600160a01b0316610209565b3480156102ec57600080fd5b50600354600160a01b900460ff16610135565b34801561030b57600080fd5b506002546101c7565b34801561032057600080fd5b5061013561032f366004611897565b610b9c565b34801561034057600080fd5b506101c7610d1d565b34801561035557600080fd5b50610209610d89565b60006001600160e01b031982166314b8343560e31b148061038f57506001600160e01b031982166396dc457560e01b145b806103aa57506001600160e01b031982166308ea925b60e41b145b806103c557506001600160e01b03198216637d22131d60e11b145b806103e057506001600160e01b031982166370319bff60e11b145b806103ef57506103ef82610d96565b92915050565b6000610404604b5461ffff1690565b905090565b60006001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361045c5760405162461bcd60e51b8152600401610453906118b2565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661048e610de6565b6001600160a01b0316146104b45760405162461bcd60e51b8152600401610453906118e1565b60006104c3604b5461ffff1690565b61ffff16116105145760405162461bcd60e51b815260206004820152601860248201527f436f6e7472616374204e6f7420496e697469616c697a656400000000000000006044820152606401610453565b61052463225bf2f960e11b610e07565b6105685760405162461bcd60e51b815260206004820152601560248201527429b2ba29b0b332a6b7b232902337b93134b23232b760591b6044820152606401610453565b6003805460ff60a01b1916600160a01b8415150217905560025430336001600160a01b03167fdd452a31d2e164a1ea436c084842c27d24ae2548a575a869f71b05a4ed16243f856040516105c0911515815260200190565b60405180910390a450805b919050565b60006001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361061a5760405162461bcd60e51b8152600401610453906118b2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661064c610de6565b6001600160a01b0316146106725760405162461bcd60e51b8152600401610453906118e1565b600354600160a01b900460ff161561069c5760405162461bcd60e51b81526004016104539061190f565b6106ac631239af8760e21b610e07565b6106f85760405162461bcd60e51b815260206004820152601a60248201527f5365745570677261646553746174757320466f7262696464656e0000000000006044820152606401610453565b610700610f70565b61074c5760405162461bcd60e51b815260206004820152601760248201527f5265616c6d205570677261646520466f7262696464656e0000000000000000006044820152606401610453565b6003805460ff60a81b1916600160a81b8415150217905560025430336001600160a01b03167fe9f97ad94c2ba252dcfc525e004f608ac5cb886955d8fc87d9e0ee070a698c56856040516105c0911515815260200190565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461081e5760405162461bcd60e51b815260206004820152601d60248201527f496c6c6567616c20436f6e74726163742044656c656761746563616c6c0000006044820152606401610453565b50600080516020611a1e83398151915290565b6000610404610de6565b60606001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108855760405162461bcd60e51b8152600401610453906118b2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166108b7610de6565b6001600160a01b0316146108dd5760405162461bcd60e51b8152600401610453906118e1565b600354600160a01b900460ff16156109075760405162461bcd60e51b81526004016104539061190f565b600354600160a81b900460ff166109585760405162461bcd60e51b8152602060048201526015602482015274155c19dc9859194810d85b1b0814995a9958dd1959605a1b6044820152606401610453565b610961846110ae565b61096c848484611175565b90505b9392505050565b600354600160a01b900460ff16156109a05760405162461bcd60e51b81526004016104539061190f565b6109b063756af45f60e01b610e07565b6109fc5760405162461bcd60e51b815260206004820152601a60248201527f57697468647261772042616c616e636520466f7262696464656e0000000000006044820152606401610453565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015610a31573d6000803e3d6000fd5b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610a7d5760405162461bcd60e51b8152600401610453906118b2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610aaf610de6565b6001600160a01b031614610ad55760405162461bcd60e51b8152600401610453906118e1565b604b5460029062010000900460ff16158015610af95750604b5461ffff8083169116105b610b455760405162461bcd60e51b815260206004820152601c60248201527f436f6e747261637420416c726561647920496e697469616c697a6564000000006044820152606401610453565b604b805460646049557ff92fa926bd2752cdf04e181d860ff72908ca25527923d5ab68f37886040ec574604a5562ffffff191661ffff90921691909117620100001762ff000019169055565b6000610404306113c6565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610be65760405162461bcd60e51b8152600401610453906118b2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610c18610de6565b6001600160a01b031614610c3e5760405162461bcd60e51b8152600401610453906118e1565b600354600160a01b900460ff1615610c685760405162461bcd60e51b81526004016104539061190f565b610c7863d9dc1f1960e01b610e07565b610cc45760405162461bcd60e51b815260206004820152601760248201527f5365744c6f63616c41646d696e20466f7262696464656e0000000000000000006044820152606401610453565b6001600160a01b038216610d0c5760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b6044820152606401610453565b610d1582611405565b506001919050565b600061040460008054600154604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b600061040461147c565b90565b60006001600160e01b031982166314751dbf60e01b1480610dc757506001600160e01b031982166352d1902d60e01b145b806103ef57506301ffc9a760e01b6001600160e01b03198316146103ef565b6000600080516020611a1e8339815191525b546001600160a01b0316919050565b6003546000906001600160a01b03163003610ef55760006363d59cf360e11b610e2f306113c6565b3385604051602401610e4393929190611946565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290506000610ec0610e84610de6565b836040518060400160405280601d81526020017f44656c656761746563616c6c20686173416363657373204661696c65640000008152506114a4565b90508060018251610ed1919061196f565b81518110610ee157610ee1611990565b60209101015160f81c600114949350505050565b6003546001600160a01b031663c7ab39e6610f0f306113c6565b33856040518463ffffffff1660e01b8152600401610f2f93929190611946565b602060405180830381865afa158015610f4c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef91906119a6565b6003546000906001600160a01b0316300361103857600063e25d75f060e01b600254604051602401610fa491815260200190565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290506000611004610fe5610de6565b836040518060600160405280602581526020016119f9602591396114a4565b90508060018251611015919061196f565b8151811061102557611025611990565b60209101015160f81c6001149392505050565b600354600254604051630e25d75f60e41b81526001600160a01b039092169163e25d75f09161106d9160040190815260200190565b602060405180830381865afa15801561108a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040491906119a6565b6110b6610de6565b6001600160a01b0316816001600160a01b0316036111165760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204e657720496d706c656d656e746174696f6e0000000000006044820152606401610453565b611126637147855d60e01b610e07565b6111725760405162461bcd60e51b815260206004820152601960248201527f5570677261646520436f6e7465787420466f7262696464656e000000000000006044820152606401610453565b50565b60607f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156111bf576111aa8461156d565b5060408051600081526020810190915261096f565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611219575060408051601f3d908101601f19168201909252611216918101906119c3565b60015b61125d5760405162461bcd60e51b8152602060048201526015602482015274125b1b1959d85b0815555414c810dbdb9d1c9858dd605a1b6044820152606401610453565b600080516020611a1e83398151915281146112b25760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a590815555414c810dbdb9d1c9858dd605a1b6044820152606401610453565b506040516301ffc9a760e01b81526314751dbf60e01b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa92505050801561131a575060408051601f3d908101601f19168201909252611317918101906119a6565b60015b6113665760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e74726163740000000000000000006044820152606401610453565b806113b35760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e74726163740000000000000000006044820152606401610453565b506113bf8484846115ee565b905061096f565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610380546001600160a01b0383166001600160a01b031990911681179091556040805191825251309133917f54ab0d18de7958786ba1ad85966d59baa2b395455f0530dcdcfd732e6af539e29181900360200190a350565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103610df8565b60606001600160a01b0384163b6114f85760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b6044820152606401610453565b600080856001600160a01b03168560405161151391906119dc565b600060405180830381855af49150503d806000811461154e576040519150601f19603f3d011682016040523d82523d6000602084013e611553565b606091505b5091509150611563828286611658565b9695505050505050565b6001600160a01b0381163b6115bf5760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b6044820152606401610453565b600080516020611a1e83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b60606115f984611691565b6000835111806116065750815b15611641576113bf84846040518060400160405280601381526020017211195b1959d85d1958d85b1b0811985a5b1959606a1b8152506114a4565b505060408051600081526020810190915292915050565b6060831561166757508161096f565b8251156116775782518084602001fd5b8160405162461bcd60e51b81526004016104539190611884565b61169a8161156d565b6040516001600160a01b03821690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b6000602082840312156116e757600080fd5b81356001600160e01b03198116811461096f57600080fd5b801515811461117257600080fd5b80356105cb816116ff565b60006020828403121561172a57600080fd5b813561096f816116ff565b80356001600160a01b03811681146105cb57600080fd5b634e487b7160e01b600052604160045260246000fd5b60008060006060848603121561177757600080fd5b61178084611735565b9250602084013567ffffffffffffffff8082111561179d57600080fd5b818601915086601f8301126117b157600080fd5b8135818111156117c3576117c361174c565b604051601f8201601f19908116603f011681019083821181831017156117eb576117eb61174c565b8160405282815289602084870101111561180457600080fd5b82602086016020830137600060208483010152809650505050505061182b6040850161170d565b90509250925092565b60005b8381101561184f578181015183820152602001611837565b50506000910152565b60008151808452611870816020860160208601611834565b601f01601f19169290920160200192915050565b60208152600061096f6020830184611858565b6000602082840312156118a957600080fd5b61096f82611735565b602080825260159082015274125b1b1959d85b0810dbdb9d1c9858dd0810d85b1b605a1b604082015260600190565b602080825260149082015273141c9bde1e4810d85b1b195908125b9d985b1a5960621b604082015260600190565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b818103818111156103ef57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000602082840312156119b857600080fd5b815161096f816116ff565b6000602082840312156119d557600080fd5b5051919050565b600082516119ee818460208701611834565b919091019291505056fe44656c656761746563616c6c2069735265616c6d55706772616461626c65204661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca264697066735822122051ba8174f05eac64dfbabc1830c097480f195921b4f181b52843ecab42e1692764736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
const isSuperArgs = (xs) => xs.length > 1;
class AccessControlManagerTest__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.AccessControlManagerTest__factory = AccessControlManagerTest__factory;
AccessControlManagerTest__factory.bytecode = _bytecode;
AccessControlManagerTest__factory.abi = _abi;
//# sourceMappingURL=AccessControlManagerTest__factory.js.map