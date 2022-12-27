import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IDomainManagement {
    type DomainInfoStruct = {
        adminId: PromiseOrValue<BytesLike>;
        realmLimit: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstate: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type DomainInfoStructOutput = [
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
        adminId: string;
        realmLimit: number;
        agentLimit: number;
        referredByAgent: number;
        referredByPolicy: number;
        adminType: number;
        acstat: number;
        alstate: number;
        name: string;
    };
    type DomainRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        realmLimit: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type DomainRegisterRequestStructOutput = [
        string,
        number,
        number,
        number,
        number,
        string
    ] & {
        adminId: string;
        realmLimit: number;
        agentLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type DomainUpdateRealmLimitRequestStruct = {
        domainId: PromiseOrValue<BytesLike>;
        realmLimit: PromiseOrValue<BigNumberish>;
    };
    type DomainUpdateRealmLimitRequestStructOutput = [string, number] & {
        domainId: string;
        realmLimit: number;
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
    type ScopeUpdateAgentLimitRequestStruct = {
        scopeId: PromiseOrValue<BytesLike>;
        agentLimit: PromiseOrValue<BigNumberish>;
    };
    type ScopeUpdateAgentLimitRequestStructOutput = [string, number] & {
        scopeId: string;
        agentLimit: number;
    };
    type UpdateAlterabilityRequestStruct = {
        id: PromiseOrValue<BytesLike>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type UpdateAlterabilityRequestStructOutput = [string, number] & {
        id: string;
        alstat: number;
    };
}
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
export interface DomainManagerInterface extends utils.Interface {
    functions: {
        "CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "FUNCTION_MESSAGE_TYPEHASH()": FunctionFragment;
        "PREDICT_CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "TYPE_HASH()": FunctionFragment;
        "accessControlManager()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "domainCheckAdmin(bytes32,address)": FunctionFragment;
        "domainCheckId(bytes32)": FunctionFragment;
        "domainCheckName(string)": FunctionFragment;
        "domainDeleteActivity(bytes32[])": FunctionFragment;
        "domainGetInfo(bytes32)": FunctionFragment;
        "domainGetRealms(bytes32)": FunctionFragment;
        "domainHasContext(bytes32,bytes32)": FunctionFragment;
        "domainHasFunction(bytes32,bytes32)": FunctionFragment;
        "domainHasRealm(bytes32,bytes32)": FunctionFragment;
        "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "domainUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "domainUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "domainUpdateAgentLimit((bytes32,uint16)[])": FunctionFragment;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "domainUpdateRealmLimit((bytes32,uint16)[])": FunctionFragment;
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
        "upgradabilityStatus()": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "CTX_MESSAGE_TYPEHASH" | "CTX_MESSAGE_TYPEHASH()" | "FUNCTION_MESSAGE_TYPEHASH" | "FUNCTION_MESSAGE_TYPEHASH()" | "PREDICT_CTX_MESSAGE_TYPEHASH" | "PREDICT_CTX_MESSAGE_TYPEHASH()" | "TYPE_HASH" | "TYPE_HASH()" | "accessControlManager" | "accessControlManager()" | "contractName" | "contractName()" | "contractVersion" | "contractVersion()" | "domainCheckAdmin" | "domainCheckAdmin(bytes32,address)" | "domainCheckId" | "domainCheckId(bytes32)" | "domainCheckName" | "domainCheckName(string)" | "domainDeleteActivity" | "domainDeleteActivity(bytes32[])" | "domainGetInfo" | "domainGetInfo(bytes32)" | "domainGetRealms" | "domainGetRealms(bytes32)" | "domainHasContext" | "domainHasContext(bytes32,bytes32)" | "domainHasFunction" | "domainHasFunction(bytes32,bytes32)" | "domainHasRealm" | "domainHasRealm(bytes32,bytes32)" | "domainRegister" | "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])" | "domainSeparator" | "domainSeparator()" | "domainUpdateActivityStatus" | "domainUpdateActivityStatus((bytes32,uint8)[])" | "domainUpdateAdmin" | "domainUpdateAdmin((bytes32,bytes32)[])" | "domainUpdateAgentLimit" | "domainUpdateAgentLimit((bytes32,uint16)[])" | "domainUpdateAlterabilityStatus" | "domainUpdateAlterabilityStatus((bytes32,uint8)[])" | "domainUpdateRealmLimit" | "domainUpdateRealmLimit((bytes32,uint16)[])" | "initVersion" | "initVersion()" | "initialize" | "initialize(string,string,address)" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "proxyInfo" | "proxyInfo()" | "safeModeStatus" | "safeModeStatus()" | "setAccessControlManager" | "setAccessControlManager(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeModeStatus" | "setSafeModeStatus(uint8)" | "setUpgradabilityStatus" | "setUpgradabilityStatus(uint8)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "upgradabilityStatus" | "upgradabilityStatus()" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
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
    encodeFunctionData(functionFragment: "domainCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "domainCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "domainCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "domainCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "domainDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "domainDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "domainGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainGetRealms", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainGetRealms(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasContext", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasContext(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasFunction", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasFunction(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasRealm", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainHasRealm(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "domainRegister", values: [IDomainManagement.DomainRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])", values: [IDomainManagement.DomainRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAgentLimit", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAgentLimit((bytes32,uint16)[])", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateRealmLimit", values: [IDomainManagement.DomainUpdateRealmLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "domainUpdateRealmLimit((bytes32,uint16)[])", values: [IDomainManagement.DomainUpdateRealmLimitRequestStruct[]]): string;
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
    decodeFunctionResult(functionFragment: "domainCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainGetRealms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainGetRealms(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasContext(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasFunction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasFunction(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainHasRealm(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAgentLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAgentLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateRealmLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainUpdateRealmLimit((bytes32,uint16)[])", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "upgradabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradabilityStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "DomainActivityUpdated(address,bytes32,uint8)": EventFragment;
        "DomainAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "DomainAgentLimitUpdated(address,bytes32,uint16)": EventFragment;
        "DomainAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "DomainRealmLimitUpdated(address,bytes32,uint16)": EventFragment;
        "DomainRegistered(address,bytes32,bytes32)": EventFragment;
        "Initialized(address,address,address,string,string,uint16)": EventFragment;
        "ProxyAccessControlUpdated(address,address,address)": EventFragment;
        "ProxyLocalAdminUpdated(address,address,address)": EventFragment;
        "ProxySafeModeUpdated(address,address,uint8)": EventFragment;
        "ProxyUpdatabilityUpdated(address,address,uint8)": EventFragment;
        "ProxyUpgraded(address,address,address)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAgentLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAgentLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainRealmLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainRealmLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainRegistered(address,bytes32,bytes32)"): EventFragment;
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
export interface DomainActivityUpdatedEventObject {
    sender: string;
    domainId: string;
    acstat: number;
}
export declare type DomainActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], DomainActivityUpdatedEventObject>;
export declare type DomainActivityUpdatedEventFilter = TypedEventFilter<DomainActivityUpdatedEvent>;
export interface DomainAdminUpdatedEventObject {
    sender: string;
    domainId: string;
    adminId: string;
}
export declare type DomainAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], DomainAdminUpdatedEventObject>;
export declare type DomainAdminUpdatedEventFilter = TypedEventFilter<DomainAdminUpdatedEvent>;
export interface DomainAgentLimitUpdatedEventObject {
    sender: string;
    domainId: string;
    agentLimit: number;
}
export declare type DomainAgentLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], DomainAgentLimitUpdatedEventObject>;
export declare type DomainAgentLimitUpdatedEventFilter = TypedEventFilter<DomainAgentLimitUpdatedEvent>;
export interface DomainAlterabilityUpdatedEventObject {
    sender: string;
    domainId: string;
    alstat: number;
}
export declare type DomainAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], DomainAlterabilityUpdatedEventObject>;
export declare type DomainAlterabilityUpdatedEventFilter = TypedEventFilter<DomainAlterabilityUpdatedEvent>;
export interface DomainRealmLimitUpdatedEventObject {
    sender: string;
    domainId: string;
    realmLimit: number;
}
export declare type DomainRealmLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], DomainRealmLimitUpdatedEventObject>;
export declare type DomainRealmLimitUpdatedEventFilter = TypedEventFilter<DomainRealmLimitUpdatedEvent>;
export interface DomainRegisteredEventObject {
    sender: string;
    domainId: string;
    adminId: string;
}
export declare type DomainRegisteredEvent = TypedEvent<[
    string,
    string,
    string
], DomainRegisteredEventObject>;
export declare type DomainRegisteredEventFilter = TypedEventFilter<DomainRegisteredEvent>;
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
export interface DomainManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DomainManagerInterface;
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
        domainCheckAdmin(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainCheckAdmin(bytes32,address)"(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        domainCheckId(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainCheckId(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        domainCheckName(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainCheckName(string)"(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        domainDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainGetInfo(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IDomainManagement.DomainInfoStructOutput]>;
        "domainGetInfo(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IDomainManagement.DomainInfoStructOutput]>;
        domainGetRealms(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "domainGetRealms(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        domainHasContext(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainHasContext(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        domainHasFunction(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainHasFunction(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        domainHasRealm(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "domainHasRealm(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        domainRegister(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        domainUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainUpdateRealmLimit(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "domainUpdateRealmLimit((bytes32,uint16)[])"(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
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
    domainCheckAdmin(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "domainCheckAdmin(bytes32,address)"(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    domainCheckId(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "domainCheckId(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    domainCheckName(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "domainCheckName(string)"(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    domainDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainGetInfo(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IDomainManagement.DomainInfoStructOutput>;
    "domainGetInfo(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IDomainManagement.DomainInfoStructOutput>;
    domainGetRealms(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "domainGetRealms(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    domainHasContext(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "domainHasContext(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    domainHasFunction(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "domainHasFunction(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    domainHasRealm(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "domainHasRealm(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    domainRegister(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    domainUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainUpdateRealmLimit(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "domainUpdateRealmLimit((bytes32,uint16)[])"(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
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
        domainCheckAdmin(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "domainCheckAdmin(bytes32,address)"(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        domainCheckId(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "domainCheckId(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        domainCheckName(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "domainCheckName(string)"(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        domainDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "domainDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        domainGetInfo(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IDomainManagement.DomainInfoStructOutput>;
        "domainGetInfo(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IDomainManagement.DomainInfoStructOutput>;
        domainGetRealms(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "domainGetRealms(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        domainHasContext(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "domainHasContext(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        domainHasFunction(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "domainHasFunction(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        domainHasRealm(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "domainHasRealm(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        domainRegister(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        domainUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        domainUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        domainUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        domainUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        domainUpdateRealmLimit(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "domainUpdateRealmLimit((bytes32,uint16)[])"(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
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
        "DomainActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, acstat?: null): DomainActivityUpdatedEventFilter;
        DomainActivityUpdated(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, acstat?: null): DomainActivityUpdatedEventFilter;
        "DomainAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): DomainAdminUpdatedEventFilter;
        DomainAdminUpdated(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): DomainAdminUpdatedEventFilter;
        "DomainAgentLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): DomainAgentLimitUpdatedEventFilter;
        DomainAgentLimitUpdated(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): DomainAgentLimitUpdatedEventFilter;
        "DomainAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, alstat?: null): DomainAlterabilityUpdatedEventFilter;
        DomainAlterabilityUpdated(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, alstat?: null): DomainAlterabilityUpdatedEventFilter;
        "DomainRealmLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, realmLimit?: null): DomainRealmLimitUpdatedEventFilter;
        DomainRealmLimitUpdated(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, realmLimit?: null): DomainRealmLimitUpdatedEventFilter;
        "DomainRegistered(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): DomainRegisteredEventFilter;
        DomainRegistered(sender?: PromiseOrValue<string> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): DomainRegisteredEventFilter;
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
        domainCheckAdmin(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainCheckAdmin(bytes32,address)"(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        domainCheckId(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainCheckId(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainCheckName(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainCheckName(string)"(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        domainDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainGetInfo(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainGetInfo(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainGetRealms(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainGetRealms(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainHasContext(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainHasContext(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainHasFunction(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainHasFunction(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainHasRealm(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "domainHasRealm(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        domainRegister(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        domainUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainUpdateRealmLimit(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "domainUpdateRealmLimit((bytes32,uint16)[])"(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
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
        domainCheckAdmin(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainCheckAdmin(bytes32,address)"(domainId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainCheckId(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainCheckId(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainCheckName(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainCheckName(string)"(domainName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainGetInfo(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainGetInfo(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainGetRealms(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainGetRealms(bytes32)"(domainId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainHasContext(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainHasContext(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainHasFunction(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainHasFunction(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainHasRealm(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainHasRealm(bytes32,bytes32)"(domainId: PromiseOrValue<BytesLike>, realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainRegister(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: IDomainManagement.DomainRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainUpdateRealmLimit(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "domainUpdateRealmLimit((bytes32,uint16)[])"(requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
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
