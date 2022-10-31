"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
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
        name: "Upgraded",
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
const _bytecode = "0x60a0604081905230608052610acd3881900390819083398101604081905261002691610665565b61005160017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd610733565b600080516020610aad8339815191521461006d5761006d610754565b61009860017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6104610733565b600080516020610a8d833981519152146100b4576100b4610754565b336100d9600080516020610a8d83398151915260001b61012060201b6100521760201c565b80546001600160a01b03929092166001600160a01b03199092169190911790556003805460ff60a01b1916600160a01b17905561011882826000610123565b5050506107f4565b90565b606061015b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b61012060201b6100521760201c565b5460ff16156101825761016d846103a1565b5060408051600081526020810190915261039a565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156101dc575060408051601f3d908101601f191682019092526101d99181019061076a565b60015b61022d5760405162461bcd60e51b815260206004820152601560248201527f496c6c6567616c205555505320436f6e7472616374000000000000000000000060448201526064015b60405180910390fd5b600080516020610aad833981519152811461028a5760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964205555505320436f6e747261637400000000000000000000006044820152606401610224565b506040516301ffc9a760e01b81526314751dbf60e01b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa9250505080156102f2575060408051601f3d908101601f191682019092526102ef91810190610783565b60015b61033e5760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e74726163740000000000000000006044820152606401610224565b8061038b5760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e74726163740000000000000000006044820152606401610224565b506103978484846103e7565b90505b9392505050565b806103c6600080516020610aad83398151915260001b61012060201b6100521760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606103f28461042f565b6000835111806103ff5750815b1561041857610397848461047d60201b6100551760201c565b505060408051600081526020810190915292915050565b610438816103a1565b6104406104ce565b6040516001600160a01b039190911690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b60606104c583836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c656400000000000000000000000081525061050360201b60201c565b90505b92915050565b60006104f4600080516020610aad83398151915260001b61012060201b6100521760201c565b546001600160a01b0316919050565b6060610518846105e360201b6100951760201c565b6105645760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e7472616374204164647265737300000000000000006044820152606401610224565b600080856001600160a01b03168560405161057f91906107a5565b600060405180830381855af49150503d80600081146105ba576040519150601f19603f3d011682016040523d82523d6000602084013e6105bf565b606091505b50915091506105d98282866105f260201b6100a41760201c565b9695505050505050565b6001600160a01b03163b151590565b6060831561060157508161039a565b8251156106115782518084602001fd5b8160405162461bcd60e51b815260040161022491906107c1565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561065c578181015183820152602001610644565b50506000910152565b6000806040838503121561067857600080fd5b82516001600160a01b038116811461068f57600080fd5b60208401519092506001600160401b03808211156106ac57600080fd5b818501915085601f8301126106c057600080fd5b8151818111156106d2576106d261062b565b604051601f8201601f19908116603f011681019083821181831017156106fa576106fa61062b565b8160405282815288602084870101111561071357600080fd5b610724836020830160208801610641565b80955050505050509250929050565b818103818111156104c857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052600160045260246000fd5b60006020828403121561077c57600080fd5b5051919050565b60006020828403121561079557600080fd5b8151801515811461039a57600080fd5b600082516107b7818460208701610641565b9190910192915050565b60208152600082518060208401526107e0816040850160208701610641565b601f01601f19169190910160400192915050565b60805161028161080c600039600050506102816000f3fe60806040523661001357610011610017565b005b6100115b61005061004b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6100e6565b565b90565b606061008e83836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b81525061010a565b9392505050565b6001600160a01b03163b151590565b606083156100b357508161008e565b8251156100c35782518084602001fd5b8160405162461bcd60e51b81526004016100dd91906101fc565b60405180910390fd5b3660008037600080366000845af43d6000803e808015610105573d6000f35b3d6000fd5b60606001600160a01b0384163b6101635760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e74726163742041646472657373000000000000000060448201526064016100dd565b600080856001600160a01b03168560405161017e919061022f565b600060405180830381855af49150503d80600081146101b9576040519150601f19603f3d011682016040523d82523d6000602084013e6101be565b606091505b50915091506101ce8282866100a4565b9695505050505050565b60005b838110156101f35781810151838201526020016101db565b50506000910152565b602081526000825180602084015261021b8160408501602087016101d8565b601f01601f19169190910160400192915050565b600082516102418184602087016101d8565b919091019291505056fea2646970667358221220207eb1a1761f0788411f88b45dba39217ed903309298132bfb55bdb21002415d64736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const isSuperArgs = (xs) => xs.length > 1;
class Proxy__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(logic, data, overrides) {
        return super.deploy(logic, data, overrides || {});
    }
    getDeployTransaction(logic, data, overrides) {
        return super.getDeployTransaction(logic, data, overrides || {});
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
exports.Proxy__factory = Proxy__factory;
Proxy__factory.bytecode = _bytecode;
Proxy__factory.abi = _abi;
//# sourceMappingURL=Proxy__factory.js.map