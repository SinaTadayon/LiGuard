import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IProxy {
    type ProxyInfoStruct = {
        domainSeparator: PromiseOrValue<BytesLike>;
        name: PromiseOrValue<string>;
        version: PromiseOrValue<string>;
        acl: PromiseOrValue<string>;
        subject: PromiseOrValue<string>;
        localAdmin: PromiseOrValue<string>;
        initVersion: PromiseOrValue<BigNumberish>;
        sstat: PromiseOrValue<BigNumberish>;
        ustat: PromiseOrValue<BigNumberish>;
    };
    type ProxyInfoStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        number,
        number
    ] & {
        domainSeparator: string;
        name: string;
        version: string;
        acl: string;
        subject: string;
        localAdmin: string;
        initVersion: number;
        sstat: number;
        ustat: number;
    };
}
export declare namespace IRoleManagement {
    type RoleInfoStruct = {
        scopeId: PromiseOrValue<BytesLike>;
        typeId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
        memberTotal: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        referredByScope: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RoleInfoStructOutput = [
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        string
    ] & {
        scopeId: string;
        typeId: string;
        adminId: string;
        memberLimit: number;
        memberTotal: number;
        scopeLimit: number;
        referredByScope: number;
        referredByPolicy: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type RoleGrantMembersRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        members: PromiseOrValue<BytesLike>[];
    };
    type RoleGrantMembersRequestStructOutput = [string, string[]] & {
        roleId: string;
        members: string[];
    };
    type RoleRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        typeId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RoleRegisterRequestStructOutput = [
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        string
    ] & {
        adminId: string;
        scopeId: string;
        typeId: string;
        memberLimit: number;
        scopeLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type RoleRevokeMembersRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        members: PromiseOrValue<BytesLike>[];
    };
    type RoleRevokeMembersRequestStructOutput = [string, string[]] & {
        roleId: string;
        members: string[];
    };
    type RoleUpdateMemberLimitRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
    };
    type RoleUpdateMemberLimitRequestStructOutput = [string, number] & {
        roleId: string;
        memberLimit: number;
    };
}
export declare namespace IACLCommons {
    type UpdateActivityRequestStruct = {
        id: PromiseOrValue<BytesLike>;
        acstat: PromiseOrValue<BigNumberish>;
    };
    type UpdateActivityRequestStructOutput = [string, number] & {
        id: string;
        acstat: number;
    };
    type UpdateAdminRequestStruct = {
        id: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
    };
    type UpdateAdminRequestStructOutput = [string, string] & {
        id: string;
        adminId: string;
    };
    type UpdateAlterabilityRequestStruct = {
        id: PromiseOrValue<BytesLike>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type UpdateAlterabilityRequestStructOutput = [string, number] & {
        id: string;
        alstat: number;
    };
    type AgentUpdateScopeLimitRequestStruct = {
        agentId: PromiseOrValue<BytesLike>;
        scopeLimit: PromiseOrValue<BigNumberish>;
    };
    type AgentUpdateScopeLimitRequestStructOutput = [string, number] & {
        agentId: string;
        scopeLimit: number;
    };
}
export interface RoleManagerInterface extends utils.Interface {
    functions: {
        "CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "FUNCTION_MESSAGE_TYPEHASH()": FunctionFragment;
        "PREDICT_CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "TYPE_HASH()": FunctionFragment;
        "accessControlManager()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "initVersion()": FunctionFragment;
        "initialize(string,string,address)": FunctionFragment;
        "localAdmin()": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "proxyInfo()": FunctionFragment;
        "roleCheckAdmin(bytes32,address)": FunctionFragment;
        "roleCheckId(bytes32)": FunctionFragment;
        "roleCheckName(string)": FunctionFragment;
        "roleDeleteActivity(bytes32[])": FunctionFragment;
        "roleGetInfo(bytes32)": FunctionFragment;
        "roleGrantMembers((bytes32,bytes32[])[])": FunctionFragment;
        "roleHasAccount(bytes32,address)": FunctionFragment;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])": FunctionFragment;
        "roleRevokeMembers((bytes32,bytes32[])[])": FunctionFragment;
        "roleUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "roleUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "roleUpdateMemberLimit((bytes32,uint32)[])": FunctionFragment;
        "roleUpdateScopeLimit((bytes32,uint16)[])": FunctionFragment;
        "safeModeStatus()": FunctionFragment;
        "setAccessControlManager(address)": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeModeStatus(uint8)": FunctionFragment;
        "setUpgradabilityStatus(uint8)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "upgradabilityStatus()": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "CTX_MESSAGE_TYPEHASH" | "CTX_MESSAGE_TYPEHASH()" | "FUNCTION_MESSAGE_TYPEHASH" | "FUNCTION_MESSAGE_TYPEHASH()" | "PREDICT_CTX_MESSAGE_TYPEHASH" | "PREDICT_CTX_MESSAGE_TYPEHASH()" | "TYPE_HASH" | "TYPE_HASH()" | "accessControlManager" | "accessControlManager()" | "contractName" | "contractName()" | "contractVersion" | "contractVersion()" | "domainSeparator" | "domainSeparator()" | "initVersion" | "initVersion()" | "initialize" | "initialize(string,string,address)" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "proxyInfo" | "proxyInfo()" | "roleCheckAdmin" | "roleCheckAdmin(bytes32,address)" | "roleCheckId" | "roleCheckId(bytes32)" | "roleCheckName" | "roleCheckName(string)" | "roleDeleteActivity" | "roleDeleteActivity(bytes32[])" | "roleGetInfo" | "roleGetInfo(bytes32)" | "roleGrantMembers" | "roleGrantMembers((bytes32,bytes32[])[])" | "roleHasAccount" | "roleHasAccount(bytes32,address)" | "roleRegister" | "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])" | "roleRevokeMembers" | "roleRevokeMembers((bytes32,bytes32[])[])" | "roleUpdateActivityStatus" | "roleUpdateActivityStatus((bytes32,uint8)[])" | "roleUpdateAdmin" | "roleUpdateAdmin((bytes32,bytes32)[])" | "roleUpdateAlterabilityStatus" | "roleUpdateAlterabilityStatus((bytes32,uint8)[])" | "roleUpdateMemberLimit" | "roleUpdateMemberLimit((bytes32,uint32)[])" | "roleUpdateScopeLimit" | "roleUpdateScopeLimit((bytes32,uint16)[])" | "safeModeStatus" | "safeModeStatus()" | "setAccessControlManager" | "setAccessControlManager(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeModeStatus" | "setSafeModeStatus(uint8)" | "setUpgradabilityStatus" | "setUpgradabilityStatus(uint8)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "upgradabilityStatus" | "upgradabilityStatus()" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "CTX_MESSAGE_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "CTX_MESSAGE_TYPEHASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "FUNCTION_MESSAGE_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "FUNCTION_MESSAGE_TYPEHASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "TYPE_HASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "TYPE_HASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initialize(string,string,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxyInfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxyInfo()", values?: undefined): string;
    encodeFunctionData(functionFragment: "roleCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "roleDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "roleGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleGrantMembers", values: [IRoleManagement.RoleGrantMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleGrantMembers((bytes32,bytes32[])[])", values: [IRoleManagement.RoleGrantMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleHasAccount", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleHasAccount(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleRegister", values: [IRoleManagement.RoleRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", values: [IRoleManagement.RoleRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRevokeMembers", values: [IRoleManagement.RoleRevokeMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRevokeMembers((bytes32,bytes32[])[])", values: [IRoleManagement.RoleRevokeMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateMemberLimit", values: [IRoleManagement.RoleUpdateMemberLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateMemberLimit((bytes32,uint32)[])", values: [IRoleManagement.RoleUpdateMemberLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateScopeLimit", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateScopeLimit((bytes32,uint16)[])", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "safeModeStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeModeStatus()", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAccessControlManager", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setAccessControlManager(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeModeStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setSafeModeStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setUpgradabilityStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setUpgradabilityStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradabilityStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradabilityStatus()", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradeTo", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "upgradeTo(address,bytes,bool)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "CTX_MESSAGE_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "CTX_MESSAGE_TYPEHASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "FUNCTION_MESSAGE_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "FUNCTION_MESSAGE_TYPEHASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TYPE_HASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TYPE_HASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize(string,string,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxyInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxyInfo()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGrantMembers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGrantMembers((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleHasAccount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleHasAccount(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRevokeMembers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRevokeMembers((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateMemberLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateMemberLimit((bytes32,uint32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateScopeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateScopeLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeModeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeModeStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAccessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAccessControlManager(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradabilityStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradabilityStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "Initialized(address,address,address,string,string,uint16)": EventFragment;
        "ProxyAccessControlUpdated(address,address,address)": EventFragment;
        "ProxyLocalAdminUpdated(address,address,address)": EventFragment;
        "ProxySafeModeUpdated(address,address,uint8)": EventFragment;
        "ProxyUpdatabilityUpdated(address,address,uint8)": EventFragment;
        "ProxyUpgraded(address,address,address)": EventFragment;
        "RoleActivityUpdated(address,bytes32,uint8)": EventFragment;
        "RoleAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "RoleAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "RoleMemberGranted(address,bytes32,bytes32,bytes32)": EventFragment;
        "RoleMemberLimitUpdated(address,bytes32,uint32)": EventFragment;
        "RoleMemberRevoked(address,bytes32,bytes32,bytes32)": EventFragment;
        "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)": EventFragment;
        "RoleScopeLimitUpdated(address,bytes32,uint16)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyAccessControlUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyAccessControlUpdated(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyLocalAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyLocalAdminUpdated(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxySafeModeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxySafeModeUpdated(address,address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpdatabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpdatabilityUpdated(address,address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpgraded(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberGranted(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberLimitUpdated(address,bytes32,uint32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberRevoked(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleScopeLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleScopeLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
}
export interface AgentReferredByPolicyUpdatedEventObject {
    sender: string;
    agentId: string;
    policyId: string;
    action: number;
}
export declare type AgentReferredByPolicyUpdatedEvent = TypedEvent<[
    string,
    string,
    string,
    number
], AgentReferredByPolicyUpdatedEventObject>;
export declare type AgentReferredByPolicyUpdatedEventFilter = TypedEventFilter<AgentReferredByPolicyUpdatedEvent>;
export interface AgentReferredByScopeUpdatedEventObject {
    sender: string;
    agentId: string;
    scopeId: string;
    action: number;
}
export declare type AgentReferredByScopeUpdatedEvent = TypedEvent<[
    string,
    string,
    string,
    number
], AgentReferredByScopeUpdatedEventObject>;
export declare type AgentReferredByScopeUpdatedEventFilter = TypedEventFilter<AgentReferredByScopeUpdatedEvent>;
export interface InitializedEventObject {
    sender: string;
    proxy: string;
    subject: string;
    name: string;
    version: string;
    initCount: number;
}
export declare type InitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    number
], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface ProxyAccessControlUpdatedEventObject {
    sender: string;
    proxy: string;
    acl: string;
}
export declare type ProxyAccessControlUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyAccessControlUpdatedEventObject>;
export declare type ProxyAccessControlUpdatedEventFilter = TypedEventFilter<ProxyAccessControlUpdatedEvent>;
export interface ProxyLocalAdminUpdatedEventObject {
    sender: string;
    proxy: string;
    newAdmin: string;
}
export declare type ProxyLocalAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyLocalAdminUpdatedEventObject>;
export declare type ProxyLocalAdminUpdatedEventFilter = TypedEventFilter<ProxyLocalAdminUpdatedEvent>;
export interface ProxySafeModeUpdatedEventObject {
    sender: string;
    proxy: string;
    sstat: number;
}
export declare type ProxySafeModeUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ProxySafeModeUpdatedEventObject>;
export declare type ProxySafeModeUpdatedEventFilter = TypedEventFilter<ProxySafeModeUpdatedEvent>;
export interface ProxyUpdatabilityUpdatedEventObject {
    sender: string;
    proxy: string;
    ustat: number;
}
export declare type ProxyUpdatabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ProxyUpdatabilityUpdatedEventObject>;
export declare type ProxyUpdatabilityUpdatedEventFilter = TypedEventFilter<ProxyUpdatabilityUpdatedEvent>;
export interface ProxyUpgradedEventObject {
    sender: string;
    proxy: string;
    newImplementation: string;
}
export declare type ProxyUpgradedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyUpgradedEventObject>;
export declare type ProxyUpgradedEventFilter = TypedEventFilter<ProxyUpgradedEvent>;
export interface RoleActivityUpdatedEventObject {
    sender: string;
    roleId: string;
    acstat: number;
}
export declare type RoleActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleActivityUpdatedEventObject>;
export declare type RoleActivityUpdatedEventFilter = TypedEventFilter<RoleActivityUpdatedEvent>;
export interface RoleAdminUpdatedEventObject {
    sender: string;
    roleId: string;
    adminId: string;
}
export declare type RoleAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminUpdatedEventObject>;
export declare type RoleAdminUpdatedEventFilter = TypedEventFilter<RoleAdminUpdatedEvent>;
export interface RoleAlterabilityUpdatedEventObject {
    sender: string;
    roleId: string;
    alstat: number;
}
export declare type RoleAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleAlterabilityUpdatedEventObject>;
export declare type RoleAlterabilityUpdatedEventFilter = TypedEventFilter<RoleAlterabilityUpdatedEvent>;
export interface RoleMemberGrantedEventObject {
    sender: string;
    roleId: string;
    memberId: string;
    typeId: string;
}
export declare type RoleMemberGrantedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], RoleMemberGrantedEventObject>;
export declare type RoleMemberGrantedEventFilter = TypedEventFilter<RoleMemberGrantedEvent>;
export interface RoleMemberLimitUpdatedEventObject {
    sender: string;
    roleId: string;
    memberLimit: number;
}
export declare type RoleMemberLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleMemberLimitUpdatedEventObject>;
export declare type RoleMemberLimitUpdatedEventFilter = TypedEventFilter<RoleMemberLimitUpdatedEvent>;
export interface RoleMemberRevokedEventObject {
    sender: string;
    roleId: string;
    memberId: string;
    typeId: string;
}
export declare type RoleMemberRevokedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], RoleMemberRevokedEventObject>;
export declare type RoleMemberRevokedEventFilter = TypedEventFilter<RoleMemberRevokedEvent>;
export interface RoleRegisteredEventObject {
    sender: string;
    roleId: string;
    typeId: string;
    adminId: string;
    scopeId: string;
}
export declare type RoleRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], RoleRegisteredEventObject>;
export declare type RoleRegisteredEventFilter = TypedEventFilter<RoleRegisteredEvent>;
export interface RoleScopeLimitUpdatedEventObject {
    sender: string;
    roleId: string;
    scopeLimit: number;
}
export declare type RoleScopeLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleScopeLimitUpdatedEventObject>;
export declare type RoleScopeLimitUpdatedEventFilter = TypedEventFilter<RoleScopeLimitUpdatedEvent>;
export interface ScopeReferredByAgentUpdatedEventObject {
    sender: string;
    scopeId: string;
    agentId: string;
    action: number;
}
export declare type ScopeReferredByAgentUpdatedEvent = TypedEvent<[
    string,
    string,
    string,
    number
], ScopeReferredByAgentUpdatedEventObject>;
export declare type ScopeReferredByAgentUpdatedEventFilter = TypedEventFilter<ScopeReferredByAgentUpdatedEvent>;
export interface ScopeReferredByPolicyUpdatedEventObject {
    sender: string;
    scopeId: string;
    policyId: string;
    action: number;
}
export declare type ScopeReferredByPolicyUpdatedEvent = TypedEvent<[
    string,
    string,
    string,
    number
], ScopeReferredByPolicyUpdatedEventObject>;
export declare type ScopeReferredByPolicyUpdatedEventFilter = TypedEventFilter<ScopeReferredByPolicyUpdatedEvent>;
export interface RoleManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: RoleManagerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
        "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;
        FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
        "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;
        PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
        "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;
        TYPE_HASH(overrides?: CallOverrides): Promise<[string]>;
        "TYPE_HASH()"(overrides?: CallOverrides): Promise<[string]>;
        accessControlManager(overrides?: CallOverrides): Promise<[string]>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<[string]>;
        contractName(overrides?: CallOverrides): Promise<[string]>;
        "contractName()"(overrides?: CallOverrides): Promise<[string]>;
        contractVersion(overrides?: CallOverrides): Promise<[string]>;
        "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<[string]>;
        "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
        proxyInfo(overrides?: CallOverrides): Promise<[IProxy.ProxyInfoStructOutput]>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<[IProxy.ProxyInfoStructOutput]>;
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRoleManagement.RoleInfoStructOutput]>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRoleManagement.RoleInfoStructOutput]>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        safeModeStatus(overrides?: CallOverrides): Promise<[number]>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<[number]>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<[string]>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<[number]>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<[number]>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
    FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
    PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
    TYPE_HASH(overrides?: CallOverrides): Promise<string>;
    "TYPE_HASH()"(overrides?: CallOverrides): Promise<string>;
    accessControlManager(overrides?: CallOverrides): Promise<string>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
    proxyInfo(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
    "proxyInfo()"(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
    roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
    "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
    roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    safeModeStatus(overrides?: CallOverrides): Promise<number>;
    "safeModeStatus()"(overrides?: CallOverrides): Promise<number>;
    setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<string>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    upgradabilityStatus(overrides?: CallOverrides): Promise<number>;
    "upgradabilityStatus()"(overrides?: CallOverrides): Promise<number>;
    upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
        FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
        PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
        TYPE_HASH(overrides?: CallOverrides): Promise<string>;
        "TYPE_HASH()"(overrides?: CallOverrides): Promise<string>;
        accessControlManager(overrides?: CallOverrides): Promise<string>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
        contractName(overrides?: CallOverrides): Promise<string>;
        "contractName()"(overrides?: CallOverrides): Promise<string>;
        contractVersion(overrides?: CallOverrides): Promise<string>;
        "contractVersion()"(overrides?: CallOverrides): Promise<string>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        localAdmin(overrides?: CallOverrides): Promise<string>;
        "localAdmin()"(overrides?: CallOverrides): Promise<string>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
        proxyInfo(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        safeModeStatus(overrides?: CallOverrides): Promise<number>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<number>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        subjectAddress(overrides?: CallOverrides): Promise<string>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<number>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<number>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "Initialized(address,address,address,string,string,uint16)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, initCount?: null): InitializedEventFilter;
        Initialized(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, initCount?: null): InitializedEventFilter;
        "ProxyAccessControlUpdated(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, acl?: null): ProxyAccessControlUpdatedEventFilter;
        ProxyAccessControlUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, acl?: null): ProxyAccessControlUpdatedEventFilter;
        "ProxyLocalAdminUpdated(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): ProxyLocalAdminUpdatedEventFilter;
        ProxyLocalAdminUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): ProxyLocalAdminUpdatedEventFilter;
        "ProxySafeModeUpdated(address,address,uint8)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, sstat?: null): ProxySafeModeUpdatedEventFilter;
        ProxySafeModeUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, sstat?: null): ProxySafeModeUpdatedEventFilter;
        "ProxyUpdatabilityUpdated(address,address,uint8)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, ustat?: null): ProxyUpdatabilityUpdatedEventFilter;
        ProxyUpdatabilityUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, ustat?: null): ProxyUpdatabilityUpdatedEventFilter;
        "ProxyUpgraded(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): ProxyUpgradedEventFilter;
        ProxyUpgraded(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): ProxyUpgradedEventFilter;
        "RoleActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, acstat?: null): RoleActivityUpdatedEventFilter;
        RoleActivityUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, acstat?: null): RoleActivityUpdatedEventFilter;
        "RoleAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RoleAdminUpdatedEventFilter;
        RoleAdminUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RoleAdminUpdatedEventFilter;
        "RoleAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, alstat?: null): RoleAlterabilityUpdatedEventFilter;
        RoleAlterabilityUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, alstat?: null): RoleAlterabilityUpdatedEventFilter;
        "RoleMemberGranted(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberGrantedEventFilter;
        RoleMemberGranted(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberGrantedEventFilter;
        "RoleMemberLimitUpdated(address,bytes32,uint32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberLimit?: null): RoleMemberLimitUpdatedEventFilter;
        RoleMemberLimitUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberLimit?: null): RoleMemberLimitUpdatedEventFilter;
        "RoleMemberRevoked(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberRevokedEventFilter;
        RoleMemberRevoked(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberRevokedEventFilter;
        "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: null, scopeId?: null): RoleRegisteredEventFilter;
        RoleRegistered(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: null, scopeId?: null): RoleRegisteredEventFilter;
        "RoleScopeLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): RoleScopeLimitUpdatedEventFilter;
        RoleScopeLimitUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): RoleScopeLimitUpdatedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        TYPE_HASH(overrides?: CallOverrides): Promise<BigNumber>;
        "TYPE_HASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractName(overrides?: CallOverrides): Promise<BigNumber>;
        "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
        proxyInfo(overrides?: CallOverrides): Promise<BigNumber>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<BigNumber>;
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        safeModeStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TYPE_HASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "TYPE_HASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        accessControlManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxyInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        safeModeStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
