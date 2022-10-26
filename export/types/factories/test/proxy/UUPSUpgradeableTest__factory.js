"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUPSUpgradeableTest__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
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
        ],
        name: "upgradeTo",
        outputs: [],
        stateMutability: "nonpayable",
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
        ],
        name: "upgradeToAndCall",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];
const _bytecode = "0x60a06040523060805234801561001457600080fd5b506080516109ac61004b6000396000818160ec01528181610135015281816101cb0152818161020b015261029501526109ac6000f3fe60806040526004361061003f5760003560e01c806301ffc9a7146100445780633659cfe61461008a5780634f1ef286146100ac57806352d1902d146100bf575b600080fd5b34801561005057600080fd5b5061007561005f3660046106f9565b6001600160e01b0319166301ffc9a760e01b1490565b60405190151581526020015b60405180910390f35b34801561009657600080fd5b506100aa6100a536600461073f565b6100e2565b005b6100aa6100ba366004610770565b6101c1565b3480156100cb57600080fd5b506100d4610288565b604051908152602001610081565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036101335760405162461bcd60e51b815260040161012a90610832565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661017c600080516020610957833981519152546001600160a01b031690565b6001600160a01b0316146101a25760405162461bcd60e51b815260040161012a9061087e565b604080516000808252602082019092526101be9183919061033b565b50565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036102095760405162461bcd60e51b815260040161012a90610832565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610252600080516020610957833981519152546001600160a01b031690565b6001600160a01b0316146102785760405162461bcd60e51b815260040161012a9061087e565b6102848282600161033b565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103285760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161012a565b5060008051602061095783398151915290565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156103735761036e836104ab565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156103cd575060408051601f3d908101601f191682019092526103ca918101906108ca565b60015b6104305760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161012a565b600080516020610957833981519152811461049f5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161012a565b5061036e838383610547565b6001600160a01b0381163b6105185760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161012a565b60008051602061095783398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61055083610572565b60008251118061055d5750805b1561036e5761056c83836105b2565b50505050565b61057b816104ab565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606105eb83836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b8152506105f2565b9392505050565b60606001600160a01b0384163b61064b5760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e747261637420416464726573730000000000000000604482015260640161012a565b600080856001600160a01b0316856040516106669190610907565b600060405180830381855af49150503d80600081146106a1576040519150601f19603f3d011682016040523d82523d6000602084013e6106a6565b606091505b50915091506106b68282866106c0565b9695505050505050565b606083156106cf5750816105eb565b8251156106df5782518084602001fd5b8160405162461bcd60e51b815260040161012a9190610923565b60006020828403121561070b57600080fd5b81356001600160e01b0319811681146105eb57600080fd5b80356001600160a01b038116811461073a57600080fd5b919050565b60006020828403121561075157600080fd5b6105eb82610723565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561078357600080fd5b61078c83610723565b9150602083013567ffffffffffffffff808211156107a957600080fd5b818501915085601f8301126107bd57600080fd5b8135818111156107cf576107cf61075a565b604051601f8201601f19908116603f011681019083821181831017156107f7576107f761075a565b8160405282815288602084870101111561081057600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000602082840312156108dc57600080fd5b5051919050565b60005b838110156108fe5781810151838201526020016108e6565b50506000910152565b600082516109198184602087016108e3565b9190910192915050565b60208152600082518060208401526109428160408501602087016108e3565b601f01601f1916919091016040019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca2646970667358221220135701b1d0b479280ca1d6062b33fb97e47cac65e2705f195b627518acb83be964736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class UUPSUpgradeableTest__factory extends ethers_1.ContractFactory {
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
exports.UUPSUpgradeableTest__factory = UUPSUpgradeableTest__factory;
UUPSUpgradeableTest__factory.bytecode = _bytecode;
UUPSUpgradeableTest__factory.abi = _abi;
//# sourceMappingURL=UUPSUpgradeableTest__factory.js.map