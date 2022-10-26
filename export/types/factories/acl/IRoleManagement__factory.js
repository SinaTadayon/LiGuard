"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRoleManagement__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "RoleAccountGranted",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "RoleAccountRevoked",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newGroup",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "oldGroup",
                type: "bytes32",
            },
        ],
        name: "RoleGroupChanged",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "group",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "isEnabled",
                type: "bool",
            },
        ],
        name: "RoleRegistered",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "group",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "RoleStatusChanged",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                internalType: "struct IRoleManagement.UpdateRoleRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "batchGrantRoleAccount",
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
                        internalType: "bytes32",
                        name: "group",
                        type: "bytes32",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "status",
                        type: "bool",
                    },
                ],
                internalType: "struct IRoleManagement.RegiterRoleRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "batchRegisterRole",
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
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                internalType: "struct IRoleManagement.UpdateRoleRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "batchRevokeRoleAccount",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAccounts",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleInfo",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRoleAccount",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRoleAccount",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "bytes32",
                name: "group",
                type: "bytes32",
            },
            {
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "registerRole",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRoleAccount",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "group",
                type: "bytes32",
            },
        ],
        name: "setRoleGroup",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "setRoleStatus",
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
];
class IRoleManagement__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IRoleManagement__factory = IRoleManagement__factory;
IRoleManagement__factory.abi = _abi;
//# sourceMappingURL=IRoleManagement__factory.js.map