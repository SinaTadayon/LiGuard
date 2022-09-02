"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relay__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "destContract",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161010d38038061010d83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b607b806100926000396000f3fe608060405236601057600e6013565b005b600e5b601a34601c565b565b600054366000803760008036600085855af190503d6000803e8080156040573d6000f35b3d6000fdfea2646970667358221220827d61a65f18b19506ab3ad3537ec5141bedee6f3b1512617eb29bc2c49dceb064736f6c634300080f0033";
const isSuperArgs = (xs) => xs.length > 1;
class Relay__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(destContract, overrides) {
        return super.deploy(destContract, overrides || {});
    }
    getDeployTransaction(destContract, overrides) {
        return super.getDeployTransaction(destContract, overrides || {});
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
exports.Relay__factory = Relay__factory;
Relay__factory.bytecode = _bytecode;
Relay__factory.abi = _abi;
//# sourceMappingURL=Relay__factory.js.map