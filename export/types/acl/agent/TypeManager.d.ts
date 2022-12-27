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
export declare namespace ITypeManagement {
    type TypeInfoStruct = {
        scopeId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
        roleTotal: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        referredByScope: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type TypeInfoStructOutput = [
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
        adminId: string;
        roleLimit: number;
        roleTotal: number;
        scopeLimit: number;
        referredByScope: number;
        referredByPolicy: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type TypeRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type TypeRegisterRequestStructOutput = [
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
        roleLimit: number;
        scopeLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type TypeUpdateRoleLimitRequestStruct = {
        typeId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
    };
    type TypeUpdateRoleLimitRequestStructOutput = [string, number] & {
        typeId: string;
        roleLimit: number;
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
export interface TypeManagerInterface extends utils.Interface {
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
        "safeModeStatus()": FunctionFragment;
        "setAccessControlManager(address)": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeModeStatus(uint8)": FunctionFragment;
        "setUpgradabilityStatus(uint8)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "typeCheckAdmin(bytes32,address)": FunctionFragment;
        "typeCheckId(bytes32)": FunctionFragment;
        "typeCheckName(string)": FunctionFragment;
        "typeDeleteActivity(bytes32[])": FunctionFragment;
        "typeGetInfo(bytes32)": FunctionFragment;
        "typeGetRoles(bytes32)": FunctionFragment;
        "typeHasAccount(bytes32,address)": FunctionFragment;
        "typeHasRole(bytes32,bytes32)": FunctionFragment;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])": FunctionFragment;
        "typeUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "typeUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "typeUpdateRoleLimit((bytes32,uint16)[])": FunctionFragment;
        "typeUpdateScopeLimit((bytes32,uint16)[])": FunctionFragment;
        "upgradabilityStatus()": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "CTX_MESSAGE_TYPEHASH" | "CTX_MESSAGE_TYPEHASH()" | "FUNCTION_MESSAGE_TYPEHASH" | "FUNCTION_MESSAGE_TYPEHASH()" | "PREDICT_CTX_MESSAGE_TYPEHASH" | "PREDICT_CTX_MESSAGE_TYPEHASH()" | "TYPE_HASH" | "TYPE_HASH()" | "accessControlManager" | "accessControlManager()" | "contractName" | "contractName()" | "contractVersion" | "contractVersion()" | "domainSeparator" | "domainSeparator()" | "initVersion" | "initVersion()" | "initialize" | "initialize(string,string,address)" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "proxyInfo" | "proxyInfo()" | "safeModeStatus" | "safeModeStatus()" | "setAccessControlManager" | "setAccessControlManager(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeModeStatus" | "setSafeModeStatus(uint8)" | "setUpgradabilityStatus" | "setUpgradabilityStatus(uint8)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "typeCheckAdmin" | "typeCheckAdmin(bytes32,address)" | "typeCheckId" | "typeCheckId(bytes32)" | "typeCheckName" | "typeCheckName(string)" | "typeDeleteActivity" | "typeDeleteActivity(bytes32[])" | "typeGetInfo" | "typeGetInfo(bytes32)" | "typeGetRoles" | "typeGetRoles(bytes32)" | "typeHasAccount" | "typeHasAccount(bytes32,address)" | "typeHasRole" | "typeHasRole(bytes32,bytes32)" | "typeRegister" | "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])" | "typeUpdateActivityStatus" | "typeUpdateActivityStatus((bytes32,uint8)[])" | "typeUpdateAdmin" | "typeUpdateAdmin((bytes32,bytes32)[])" | "typeUpdateAlterabilityStatus" | "typeUpdateAlterabilityStatus((bytes32,uint8)[])" | "typeUpdateRoleLimit" | "typeUpdateRoleLimit((bytes32,uint16)[])" | "typeUpdateScopeLimit" | "typeUpdateScopeLimit((bytes32,uint16)[])" | "upgradabilityStatus" | "upgradabilityStatus()" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
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
    encodeFunctionData(functionFragment: "typeCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "typeDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "typeGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetRoles", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetRoles(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeHasAccount", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeHasAccount(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeHasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeHasRole(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeRegister", values: [ITypeManagement.TypeRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])", values: [ITypeManagement.TypeRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateRoleLimit", values: [ITypeManagement.TypeUpdateRoleLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateRoleLimit((bytes32,uint16)[])", values: [ITypeManagement.TypeUpdateRoleLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateScopeLimit", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateScopeLimit((bytes32,uint16)[])", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
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
    decodeFunctionResult(functionFragment: "typeCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetRoles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetRoles(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasAccount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasAccount(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasRole(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateRoleLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateRoleLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateScopeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateScopeLimit((bytes32,uint16)[])", data: BytesLike): Result;
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
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "TypeActivityUpdated(address,bytes32,uint8)": EventFragment;
        "TypeAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "TypeAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "TypeRegistered(address,bytes32,bytes32,bytes32)": EventFragment;
        "TypeRoleLimitUpdated(address,bytes32,uint16)": EventFragment;
        "TypeScopeLimitUpdated(address,bytes32,uint16)": EventFragment;
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
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRegistered(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRoleLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRoleLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeScopeLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeScopeLimitUpdated(address,bytes32,uint16)"): EventFragment;
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
export interface TypeActivityUpdatedEventObject {
    sender: string;
    typeId: string;
    acstat: number;
}
export declare type TypeActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeActivityUpdatedEventObject>;
export declare type TypeActivityUpdatedEventFilter = TypedEventFilter<TypeActivityUpdatedEvent>;
export interface TypeAdminUpdatedEventObject {
    sender: string;
    typeId: string;
    adminId: string;
}
export declare type TypeAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], TypeAdminUpdatedEventObject>;
export declare type TypeAdminUpdatedEventFilter = TypedEventFilter<TypeAdminUpdatedEvent>;
export interface TypeAlterabilityUpdatedEventObject {
    sender: string;
    typeId: string;
    alstat: number;
}
export declare type TypeAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeAlterabilityUpdatedEventObject>;
export declare type TypeAlterabilityUpdatedEventFilter = TypedEventFilter<TypeAlterabilityUpdatedEvent>;
export interface TypeRegisteredEventObject {
    sender: string;
    typeId: string;
    scopeId: string;
    adminId: string;
}
export declare type TypeRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], TypeRegisteredEventObject>;
export declare type TypeRegisteredEventFilter = TypedEventFilter<TypeRegisteredEvent>;
export interface TypeRoleLimitUpdatedEventObject {
    sender: string;
    typeId: string;
    roleLimit: number;
}
export declare type TypeRoleLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeRoleLimitUpdatedEventObject>;
export declare type TypeRoleLimitUpdatedEventFilter = TypedEventFilter<TypeRoleLimitUpdatedEvent>;
export interface TypeScopeLimitUpdatedEventObject {
    sender: string;
    typeId: string;
    scopeLimit: number;
}
export declare type TypeScopeLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeScopeLimitUpdatedEventObject>;
export declare type TypeScopeLimitUpdatedEventFilter = TypedEventFilter<TypeScopeLimitUpdatedEvent>;
export interface TypeManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TypeManagerInterface;
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
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[ITypeManagement.TypeInfoStructOutput]>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[ITypeManagement.TypeInfoStructOutput]>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
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
    typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
    "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
    typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
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
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
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
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        "TypeActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, acstat?: null): TypeActivityUpdatedEventFilter;
        TypeActivityUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, acstat?: null): TypeActivityUpdatedEventFilter;
        "TypeAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): TypeAdminUpdatedEventFilter;
        TypeAdminUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): TypeAdminUpdatedEventFilter;
        "TypeAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, alstat?: null): TypeAlterabilityUpdatedEventFilter;
        TypeAlterabilityUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, alstat?: null): TypeAlterabilityUpdatedEventFilter;
        "TypeRegistered(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null): TypeRegisteredEventFilter;
        TypeRegistered(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null): TypeRegisteredEventFilter;
        "TypeRoleLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): TypeRoleLimitUpdatedEventFilter;
        TypeRoleLimitUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): TypeRoleLimitUpdatedEventFilter;
        "TypeScopeLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): TypeScopeLimitUpdatedEventFilter;
        TypeScopeLimitUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): TypeScopeLimitUpdatedEventFilter;
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
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
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
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
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
