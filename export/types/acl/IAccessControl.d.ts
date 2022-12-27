import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface IAccessControlInterface extends utils.Interface {
    functions: {
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
        "isAgentExist(bytes32)": FunctionFragment;
        "isScopeExist(bytes32)": FunctionFragment;
        "isScopesCompatible(bytes32,bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getAgentBaseInfo" | "getAgentBaseInfo(bytes32)" | "getAgentMasterAdminRole" | "getAgentMasterAdminRole()" | "getAgentMasterType" | "getAgentMasterType()" | "getAnonymousType" | "getAnonymousType()" | "getAnyType" | "getAnyType()" | "getGlobalScope" | "getGlobalScope()" | "getLivelyMasterAdminRole" | "getLivelyMasterAdminRole()" | "getLivelyMasterType" | "getLivelyMasterType()" | "getPolicyMasterAdminRole" | "getPolicyMasterAdminRole()" | "getPolicyMasterType" | "getPolicyMasterType()" | "getScopeBaseInfo" | "getScopeBaseInfo(bytes32)" | "getScopeMasterAdminRole" | "getScopeMasterAdminRole()" | "getScopeMasterType" | "getScopeMasterType()" | "getSystemMasterAdminRole" | "getSystemMasterAdminRole()" | "getSystemMasterType" | "getSystemMasterType()" | "hasAccess" | "hasAccess(bytes32)" | "hasAccessToAgent" | "hasAccessToAgent(bytes32,bytes32)" | "hasCSAccess" | "hasCSAccess(address,bytes4)" | "hasCSAccessToAgent" | "hasCSAccessToAgent(bytes32,address,bytes4)" | "hasCSMAccess" | "hasCSMAccess(address,bytes4,bytes32)" | "hasCSMAccessToAgent" | "hasCSMAccessToAgent(bytes32,address,bytes4,bytes32)" | "hasMemberAccess" | "hasMemberAccess(bytes32,bytes32)" | "hasMemberAccessToAgent" | "hasMemberAccessToAgent(bytes32,bytes32,bytes32)" | "isAgentExist" | "isAgentExist(bytes32)" | "isScopeExist" | "isScopeExist(bytes32)" | "isScopesCompatible" | "isScopesCompatible(bytes32,bytes32)"): FunctionFragment;
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
    encodeFunctionData(functionFragment: "isAgentExist", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isAgentExist(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopeExist", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopeExist(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopesCompatible", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isScopesCompatible(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
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
    decodeFunctionResult(functionFragment: "isAgentExist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAgentExist(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopeExist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopeExist(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopesCompatible", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isScopesCompatible(bytes32,bytes32)", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
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
export interface IAccessControl extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAccessControlInterface;
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
        hasMemberAccess(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasMemberAccess(bytes32,bytes32)"(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
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
    hasMemberAccess(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasMemberAccess(bytes32,bytes32)"(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
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
        hasMemberAccess(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasMemberAccess(bytes32,bytes32)"(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
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
        hasMemberAccess(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasMemberAccess(bytes32,bytes32)"(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
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
        hasMemberAccess(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasMemberAccess(bytes32,bytes32)"(functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasMemberAccessToAgent(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasMemberAccessToAgent(bytes32,bytes32,bytes32)"(agentId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAgentExist(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAgentExist(bytes32)"(agentId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isScopeExist(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isScopeExist(bytes32)"(scopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isScopesCompatible(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isScopesCompatible(bytes32,bytes32)"(destScopeId: PromiseOrValue<BytesLike>, srcScopeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
