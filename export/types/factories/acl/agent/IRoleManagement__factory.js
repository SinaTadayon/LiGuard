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
                name: "agentId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "policyId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.ActionType",
                name: "action",
                type: "uint8",
            },
        ],
        name: "AgentReferredByPolicyUpdated",
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
                name: "agentId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "scopeId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.ActionType",
                name: "action",
                type: "uint8",
            },
        ],
        name: "AgentReferredByScopeUpdated",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.ActivityStatus",
                name: "acstat",
                type: "uint8",
            },
        ],
        name: "RoleActivityUpdated",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "adminId",
                type: "bytes32",
            },
        ],
        name: "RoleAdminUpdated",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.AlterabilityStatus",
                name: "alstat",
                type: "uint8",
            },
        ],
        name: "RoleAlterabilityUpdated",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "memberId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "typeId",
                type: "bytes32",
            },
        ],
        name: "RoleMemberGranted",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "memberLimit",
                type: "uint32",
            },
        ],
        name: "RoleMemberLimitUpdated",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "memberId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "typeId",
                type: "bytes32",
            },
        ],
        name: "RoleMemberRevoked",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "typeId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "adminId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "scopeId",
                type: "bytes32",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "scopeLimit",
                type: "uint16",
            },
        ],
        name: "RoleScopeLimitUpdated",
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
                name: "scopeId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "agentId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.ActionType",
                name: "action",
                type: "uint8",
            },
        ],
        name: "ScopeReferredByAgentUpdated",
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
                name: "scopeId",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "policyId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "enum IACLCommons.ActionType",
                name: "action",
                type: "uint8",
            },
        ],
        name: "ScopeReferredByPolicyUpdated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "roleId",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "roleCheckAdmin",
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
                internalType: "bytes32",
                name: "roleId",
                type: "bytes32",
            },
        ],
        name: "roleCheckId",
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
                name: "roleName",
                type: "string",
            },
        ],
        name: "roleCheckName",
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
                internalType: "bytes32[]",
                name: "requests",
                type: "bytes32[]",
            },
        ],
        name: "roleDeleteActivity",
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
                name: "roleId",
                type: "bytes32",
            },
        ],
        name: "roleGetInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "scopeId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "typeId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "adminId",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint32",
                        name: "memberLimit",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "memberTotal",
                        type: "uint32",
                    },
                    {
                        internalType: "uint16",
                        name: "scopeLimit",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "referredByScope",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "referredByPolicy",
                        type: "uint16",
                    },
                    {
                        internalType: "enum IACLCommons.ActivityStatus",
                        name: "acstat",
                        type: "uint8",
                    },
                    {
                        internalType: "enum IACLCommons.AlterabilityStatus",
                        name: "alstat",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                ],
                internalType: "struct IRoleManagement.RoleInfo",
                name: "",
                type: "tuple",
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
                        name: "roleId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "members",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct IRoleManagement.RoleGrantMembersRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleGrantMembers",
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
                name: "roleId",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "roleHasAccount",
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
                components: [
                    {
                        internalType: "bytes32",
                        name: "adminId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "scopeId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "typeId",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint32",
                        name: "memberLimit",
                        type: "uint32",
                    },
                    {
                        internalType: "uint16",
                        name: "scopeLimit",
                        type: "uint16",
                    },
                    {
                        internalType: "enum IACLCommons.ActivityStatus",
                        name: "acstat",
                        type: "uint8",
                    },
                    {
                        internalType: "enum IACLCommons.AlterabilityStatus",
                        name: "alstat",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                ],
                internalType: "struct IRoleManagement.RoleRegisterRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleRegister",
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
                        name: "roleId",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "members",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct IRoleManagement.RoleRevokeMembersRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleRevokeMembers",
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
                        name: "id",
                        type: "bytes32",
                    },
                    {
                        internalType: "enum IACLCommons.ActivityStatus",
                        name: "acstat",
                        type: "uint8",
                    },
                ],
                internalType: "struct IACLCommons.UpdateActivityRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleUpdateActivityStatus",
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
                        name: "id",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "adminId",
                        type: "bytes32",
                    },
                ],
                internalType: "struct IACLCommons.UpdateAdminRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleUpdateAdmin",
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
                        name: "id",
                        type: "bytes32",
                    },
                    {
                        internalType: "enum IACLCommons.AlterabilityStatus",
                        name: "alstat",
                        type: "uint8",
                    },
                ],
                internalType: "struct IACLCommons.UpdateAlterabilityRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleUpdateAlterabilityStatus",
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
                        name: "roleId",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint32",
                        name: "memberLimit",
                        type: "uint32",
                    },
                ],
                internalType: "struct IRoleManagement.RoleUpdateMemberLimitRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleUpdateMemberLimit",
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
                        name: "agentId",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint16",
                        name: "scopeLimit",
                        type: "uint16",
                    },
                ],
                internalType: "struct IACLCommons.AgentUpdateScopeLimitRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "roleUpdateScopeLimit",
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