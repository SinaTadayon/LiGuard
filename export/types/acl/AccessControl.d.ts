import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace IACLCommons {
    type BaseAgentStruct = {
        adminId: PromiseOrValue<BytesLike>;
        atype: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        referredByScope: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
    };
    type BaseAgentStructOutput = [
        string,
        number,
        number,
        number,
        number,
        number,
        number
    ] & {
        adminId: string;
        atype: number;
        acstat: number;
        alstat: number;
        referredByScope: number;
        referredByPolicy: number;
        scopeLimit: number;
    };
    type BaseScopeStruct = {
        adminId: PromiseOrValue<BytesLike>;
        stype: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
    };
    type BaseScopeStructOutput = [
        string,
        number,
        number,
        number,
        number,
        number,
        number
    ] & {
        adminId: string;
        stype: number;
        acstat: number;
        alstat: number;
        referredByAgent: number;
        referredByPolicy: number;
        agentLimit: number;
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
export interface AccessControlInterface extends utils.Interface {
    functions: {
        "CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "FUNCTION_MESSAGE_TYPEHASH()": FunctionFragment;
        "PREDICT_CTX_MESSAGE_TYPEHASH()": FunctionFragment;
        "TYPE_HASH()": FunctionFragment;
        "accessControlManager()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "getAgentBaseInfo(bytes32)": FunctionFragment;
        "getAgentMasterAdminRole()": FunctionFragment;
        "getAgentMasterType()": FunctionFragment;
        "getAnonymousType()": FunctionFragment;
        "getAnyType()": FunctionFragment;
        "getGlobalScope()": FunctionFragment;
        "getLivelyMasterAdminRole()": FunctionFragment;
        "getLivelyMasterType()": FunctionFragment;
        "getPolicyMasterAdminRole()": FunctionFragment;
        "getPolicyMasterType()": FunctionFragment;
        "getScopeBaseInfo(bytes32)": FunctionFragment;
        "getScopeMasterAdminRole()": FunctionFragment;
        "getScopeMasterType()": FunctionFragment;
        "getSystemMasterAdminRole()": FunctionFragment;
        "getSystemMasterType()": FunctionFragment;
        "hasAccess(bytes32)": FunctionFragment;
        "hasAccessToAgent(bytes32,bytes32)": FunctionFragment;
        "hasCSAccess(address,bytes4)": FunctionFragment;
        "hasCSAccessToAgent(bytes32,address,bytes4)": FunctionFragment;
        "hasCSMAccess(address,bytes4,bytes32)": FunctionFragment;
        "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)": FunctionFragment;
        "hasMemberAccess(bytes32,bytes32)": FunctionFragment;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)": FunctionFragment;
        "initVersion()": FunctionFragment;
        "initialize(string,string,address)": FunctionFragment;
        "isAgentExist(bytes32)": FunctionFragment;
        "isScopeExist(bytes32)": FunctionFragment;
        "isScopesCompatible(bytes32,bytes32)": FunctionFragment;
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
    getFunction(nameOrSignatureOrTopic: "CTX_MESSAGE_TYPEHASH" | "CTX_MESSAGE_TYPEHASH()" | "FUNCTION_MESSAGE_TYPEHASH" | "FUNCTION_MESSAGE_TYPEHASH()" | "PREDICT_CTX_MESSAGE_TYPEHASH" | "PREDICT_CTX_MESSAGE_TYPEHASH()" | "TYPE_HASH" | "TYPE_HASH()" | "accessControlManager" | "accessControlManager()" | "contractName" | "contractName()" | "contractVersion" | "contractVersion()" | "domainSeparator" | "domainSeparator()" | "getAgentBaseInfo" | "getAgentBaseInfo(bytes32)" | "getAgentMasterAdminRole" | "getAgentMasterAdminRole()" | "getAgentMasterType" | "getAgentMasterType()" | "getAnonymousType" | "getAnonymousType()" | "getAnyType" | "getAnyType()" | "getGlobalScope" | "getGlobalScope()" | "getLivelyMasterAdminRole" | "getLivelyMasterAdminRole()" | "getLivelyMasterType" | "getLivelyMasterType()" | "getPolicyMasterAdminRole" | "getPolicyMasterAdminRole()" | "getPolicyMasterType" | "getPolicyMasterType()" | "getScopeBaseInfo" | "getScopeBaseInfo(bytes32)" | "getScopeMasterAdminRole" | "getScopeMasterAdminRole()" | "getScopeMasterType" | "getScopeMasterType()" | "getSystemMasterAdminRole" | "getSystemMasterAdminRole()" | "getSystemMasterType" | "getSystemMasterType()" | "hasAccess" | "hasAccess(bytes32)" | "hasAccessToAgent" | "hasAccessToAgent(bytes32,bytes32)" | "hasCSAccess" | "hasCSAccess(address,bytes4)" | "hasCSAccessToAgent" | "hasCSAccessToAgent(bytes32,address,bytes4)" | "hasCSMAccess" | "hasCSMAccess(address,bytes4,bytes32)" | "hasCSMAccessToAgent" | "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)" | "hasMemberAccess" | "hasMemberAccess(bytes32,bytes32)" | "hasMemberAccessToAgent" | "hasMemberAccessToAgent(bytes32,bytes32,bytes32)" | "initVersion" | "initVersion()" | "initialize" | "initialize(string,string,address)" | "isAgentExist" | "isAgentExist(bytes32)" | "isScopeExist" | "isScopeExist(bytes32)" | "isScopesCompatible" | "isScopesCompatible(bytes32,bytes32)" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "proxyInfo" | "proxyInfo()" | "safeModeStatus" | "safeModeStatus()" | "setAccessControlManager" | "setAccessControlManager(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeModeStatus" | "setSafeModeStatus(uint8)" | "setUpgradabilityStatus" | "setUpgradabilityStatus(uint8)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "upgradabilityStatus" | "upgradabilityStatus()" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
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
    encodeFunctionData(functionFragment: "getAgentBaseInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getAgentBaseInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getAgentMasterAdminRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAgentMasterAdminRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAgentMasterType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAgentMasterType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAnonymousType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAnonymousType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAnyType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAnyType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getGlobalScope", values?: undefined): string;
    encodeFunctionData(functionFragment: "getGlobalScope()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLivelyMasterAdminRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLivelyMasterAdminRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLivelyMasterType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLivelyMasterType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPolicyMasterAdminRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPolicyMasterAdminRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPolicyMasterType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPolicyMasterType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getScopeBaseInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getScopeBaseInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getScopeMasterAdminRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "getScopeMasterAdminRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getScopeMasterType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getScopeMasterType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSystemMasterAdminRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSystemMasterAdminRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSystemMasterType", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSystemMasterType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasAccess", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasAccess(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasAccessToAgent", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasAccessToAgent(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasCSAccess", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasCSAccess(address,bytes4)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasCSAccessToAgent", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasCSAccessToAgent(bytes32,address,bytes4)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasCSMAccess", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasCSMAccess(address,bytes4,bytes32)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasCSMAccessToAgent", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasMemberAccess", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasMemberAccess(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasMemberAccessToAgent", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasMemberAccessToAgent(bytes32,bytes32,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
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
    encodeFunctionData(functionFragment: "isAgentExist", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isAgentExist(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopeExist", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopeExist(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopesCompatible", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopesCompatible(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
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
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentBaseInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentBaseInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentMasterAdminRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentMasterAdminRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentMasterType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAgentMasterType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAnonymousType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAnonymousType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAnyType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAnyType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getGlobalScope", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getGlobalScope()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLivelyMasterAdminRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLivelyMasterAdminRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLivelyMasterType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLivelyMasterType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPolicyMasterAdminRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPolicyMasterAdminRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPolicyMasterType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPolicyMasterType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeBaseInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeBaseInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeMasterAdminRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeMasterAdminRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeMasterType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getScopeMasterType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSystemMasterAdminRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSystemMasterAdminRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSystemMasterType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSystemMasterType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasAccess(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasAccessToAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasAccessToAgent(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSAccess(address,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSAccessToAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSAccessToAgent(bytes32,address,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSMAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSMAccess(address,bytes4,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSMAccessToAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasMemberAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasMemberAccess(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasMemberAccessToAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasMemberAccessToAgent(bytes32,bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize(string,string,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAgentExist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAgentExist(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopeExist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopeExist(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopesCompatible", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopesCompatible(bytes32,bytes32)", data: BytesLike): Result;
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
export interface AccessControl extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AccessControlInterface;
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
        getAgentBaseInfo(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IACLCommons.BaseAgentStructOutput]>;
        "getAgentBaseInfo(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IACLCommons.BaseAgentStructOutput]>;
        getAgentMasterAdminRole(overrides?: CallOverrides): Promise<[string]>;
        "getAgentMasterAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
        getAgentMasterType(overrides?: CallOverrides): Promise<[string]>;
        "getAgentMasterType()"(overrides?: CallOverrides): Promise<[string]>;
        getAnonymousType(overrides?: CallOverrides): Promise<[string]>;
        "getAnonymousType()"(overrides?: CallOverrides): Promise<[string]>;
        getAnyType(overrides?: CallOverrides): Promise<[string]>;
        "getAnyType()"(overrides?: CallOverrides): Promise<[string]>;
        getGlobalScope(overrides?: CallOverrides): Promise<[string]>;
        "getGlobalScope()"(overrides?: CallOverrides): Promise<[string]>;
        getLivelyMasterAdminRole(overrides?: CallOverrides): Promise<[string]>;
        "getLivelyMasterAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
        getLivelyMasterType(overrides?: CallOverrides): Promise<[string]>;
        "getLivelyMasterType()"(overrides?: CallOverrides): Promise<[string]>;
        getPolicyMasterAdminRole(overrides?: CallOverrides): Promise<[string]>;
        "getPolicyMasterAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
        getPolicyMasterType(overrides?: CallOverrides): Promise<[string]>;
        "getPolicyMasterType()"(overrides?: CallOverrides): Promise<[string]>;
        getScopeBaseInfo(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IACLCommons.BaseScopeStructOutput]>;
        "getScopeBaseInfo(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IACLCommons.BaseScopeStructOutput]>;
        getScopeMasterAdminRole(overrides?: CallOverrides): Promise<[string]>;
        "getScopeMasterAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
        getScopeMasterType(overrides?: CallOverrides): Promise<[string]>;
        "getScopeMasterType()"(overrides?: CallOverrides): Promise<[string]>;
        getSystemMasterAdminRole(overrides?: CallOverrides): Promise<[string]>;
        "getSystemMasterAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
        getSystemMasterType(overrides?: CallOverrides): Promise<[string]>;
        "getSystemMasterType()"(overrides?: CallOverrides): Promise<[string]>;
        hasAccess(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasAccess(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasAccessToAgent(bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasCSAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasCSAccess(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasCSAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasCSAccessToAgent(bytes32,address,bytes4)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasCSMAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasCSMAccess(address,bytes4,bytes32)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasCSMAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasMemberAccess(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasMemberAccess(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
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
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    getAgentBaseInfo(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseAgentStructOutput>;
    "getAgentBaseInfo(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseAgentStructOutput>;
    getAgentMasterAdminRole(overrides?: CallOverrides): Promise<string>;
    "getAgentMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
    getAgentMasterType(overrides?: CallOverrides): Promise<string>;
    "getAgentMasterType()"(overrides?: CallOverrides): Promise<string>;
    getAnonymousType(overrides?: CallOverrides): Promise<string>;
    "getAnonymousType()"(overrides?: CallOverrides): Promise<string>;
    getAnyType(overrides?: CallOverrides): Promise<string>;
    "getAnyType()"(overrides?: CallOverrides): Promise<string>;
    getGlobalScope(overrides?: CallOverrides): Promise<string>;
    "getGlobalScope()"(overrides?: CallOverrides): Promise<string>;
    getLivelyMasterAdminRole(overrides?: CallOverrides): Promise<string>;
    "getLivelyMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
    getLivelyMasterType(overrides?: CallOverrides): Promise<string>;
    "getLivelyMasterType()"(overrides?: CallOverrides): Promise<string>;
    getPolicyMasterAdminRole(overrides?: CallOverrides): Promise<string>;
    "getPolicyMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
    getPolicyMasterType(overrides?: CallOverrides): Promise<string>;
    "getPolicyMasterType()"(overrides?: CallOverrides): Promise<string>;
    getScopeBaseInfo(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseScopeStructOutput>;
    "getScopeBaseInfo(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseScopeStructOutput>;
    getScopeMasterAdminRole(overrides?: CallOverrides): Promise<string>;
    "getScopeMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
    getScopeMasterType(overrides?: CallOverrides): Promise<string>;
    "getScopeMasterType()"(overrides?: CallOverrides): Promise<string>;
    getSystemMasterAdminRole(overrides?: CallOverrides): Promise<string>;
    "getSystemMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
    getSystemMasterType(overrides?: CallOverrides): Promise<string>;
    "getSystemMasterType()"(overrides?: CallOverrides): Promise<string>;
    hasAccess(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasAccess(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasAccessToAgent(bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasCSAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasCSAccess(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasCSAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasCSAccessToAgent(bytes32,address,bytes4)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasCSMAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasCSMAccess(address,bytes4,bytes32)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasCSMAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasMemberAccess(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasMemberAccess(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
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
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        getAgentBaseInfo(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseAgentStructOutput>;
        "getAgentBaseInfo(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseAgentStructOutput>;
        getAgentMasterAdminRole(overrides?: CallOverrides): Promise<string>;
        "getAgentMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
        getAgentMasterType(overrides?: CallOverrides): Promise<string>;
        "getAgentMasterType()"(overrides?: CallOverrides): Promise<string>;
        getAnonymousType(overrides?: CallOverrides): Promise<string>;
        "getAnonymousType()"(overrides?: CallOverrides): Promise<string>;
        getAnyType(overrides?: CallOverrides): Promise<string>;
        "getAnyType()"(overrides?: CallOverrides): Promise<string>;
        getGlobalScope(overrides?: CallOverrides): Promise<string>;
        "getGlobalScope()"(overrides?: CallOverrides): Promise<string>;
        getLivelyMasterAdminRole(overrides?: CallOverrides): Promise<string>;
        "getLivelyMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
        getLivelyMasterType(overrides?: CallOverrides): Promise<string>;
        "getLivelyMasterType()"(overrides?: CallOverrides): Promise<string>;
        getPolicyMasterAdminRole(overrides?: CallOverrides): Promise<string>;
        "getPolicyMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
        getPolicyMasterType(overrides?: CallOverrides): Promise<string>;
        "getPolicyMasterType()"(overrides?: CallOverrides): Promise<string>;
        getScopeBaseInfo(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseScopeStructOutput>;
        "getScopeBaseInfo(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IACLCommons.BaseScopeStructOutput>;
        getScopeMasterAdminRole(overrides?: CallOverrides): Promise<string>;
        "getScopeMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
        getScopeMasterType(overrides?: CallOverrides): Promise<string>;
        "getScopeMasterType()"(overrides?: CallOverrides): Promise<string>;
        getSystemMasterAdminRole(overrides?: CallOverrides): Promise<string>;
        "getSystemMasterAdminRole()"(overrides?: CallOverrides): Promise<string>;
        getSystemMasterType(overrides?: CallOverrides): Promise<string>;
        "getSystemMasterType()"(overrides?: CallOverrides): Promise<string>;
        hasAccess(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasAccess(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasAccessToAgent(bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasCSAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasCSAccess(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasCSAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasCSAccessToAgent(bytes32,address,bytes4)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasCSMAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasCSMAccess(address,bytes4,bytes32)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasCSMAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasMemberAccess(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasMemberAccess(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
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
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAgentBaseInfo(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "getAgentBaseInfo(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        getAgentMasterAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
        "getAgentMasterAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAgentMasterType(overrides?: CallOverrides): Promise<BigNumber>;
        "getAgentMasterType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAnonymousType(overrides?: CallOverrides): Promise<BigNumber>;
        "getAnonymousType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAnyType(overrides?: CallOverrides): Promise<BigNumber>;
        "getAnyType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getGlobalScope(overrides?: CallOverrides): Promise<BigNumber>;
        "getGlobalScope()"(overrides?: CallOverrides): Promise<BigNumber>;
        getLivelyMasterAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
        "getLivelyMasterAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        getLivelyMasterType(overrides?: CallOverrides): Promise<BigNumber>;
        "getLivelyMasterType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getPolicyMasterAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
        "getPolicyMasterAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        getPolicyMasterType(overrides?: CallOverrides): Promise<BigNumber>;
        "getPolicyMasterType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getScopeBaseInfo(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "getScopeBaseInfo(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        getScopeMasterAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
        "getScopeMasterAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        getScopeMasterType(overrides?: CallOverrides): Promise<BigNumber>;
        "getScopeMasterType()"(overrides?: CallOverrides): Promise<BigNumber>;
        getSystemMasterAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
        "getSystemMasterAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        getSystemMasterType(overrides?: CallOverrides): Promise<BigNumber>;
        "getSystemMasterType()"(overrides?: CallOverrides): Promise<BigNumber>;
        hasAccess(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasAccess(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasAccessToAgent(bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasCSAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasCSAccess(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasCSAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasCSAccessToAgent(bytes32,address,bytes4)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasCSMAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasCSMAccess(address,bytes4,bytes32)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasCSMAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasMemberAccess(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasMemberAccess(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
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
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAgentBaseInfo(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAgentBaseInfo(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAgentMasterAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAgentMasterAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAgentMasterType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAgentMasterType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAnonymousType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAnonymousType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAnyType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAnyType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getGlobalScope(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getGlobalScope()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLivelyMasterAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getLivelyMasterAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLivelyMasterType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getLivelyMasterType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPolicyMasterAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getPolicyMasterAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPolicyMasterType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getPolicyMasterType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getScopeBaseInfo(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getScopeBaseInfo(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getScopeMasterAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getScopeMasterAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getScopeMasterType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getScopeMasterType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSystemMasterAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getSystemMasterAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSystemMasterType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getSystemMasterType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasAccess(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasAccess(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasAccessToAgent(bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasCSAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasCSAccess(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasCSAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasCSAccessToAgent(bytes32,address,bytes4)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasCSMAccess(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasCSMAccess(address,bytes4,bytes32)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasCSMAccessToAgent(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)"(agentId: PromiseOrValue<BytesLike>, contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasMemberAccess(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasMemberAccess(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize(string,string,address)"(contractName: PromiseOrValue<string>, contractVersion: PromiseOrValue<string>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
