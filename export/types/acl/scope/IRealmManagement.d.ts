import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IRealmManagement {
    type RealmInfoStruct = {
        domainId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        contextLimit: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstate: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RealmInfoStructOutput = [
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
        domainId: string;
        adminId: string;
        contextLimit: number;
        agentLimit: number;
        referredByAgent: number;
        referredByPolicy: number;
        acstat: number;
        alstate: number;
        adminType: number;
        name: string;
    };
    type RealmRegisterRequestStruct = {
        domainId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        contextLimit: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RealmRegisterRequestStructOutput = [
        string,
        string,
        number,
        number,
        number,
        number,
        string
    ] & {
        domainId: string;
        adminId: string;
        contextLimit: number;
        agentLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type RealmUpdateContextLimitRequestStruct = {
        realmId: PromiseOrValue<BytesLike>;
        contextLimit: PromiseOrValue<BigNumberish>;
    };
    type RealmUpdateContextLimitRequestStructOutput = [string, number] & {
        realmId: string;
        contextLimit: number;
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
export interface IRealmManagementInterface extends utils.Interface {
    functions: {
        "realmCheckAdmin(bytes32,address)": FunctionFragment;
        "realmCheckId(bytes32)": FunctionFragment;
        "realmCheckName(string)": FunctionFragment;
        "realmDeleteActivity(bytes32[])": FunctionFragment;
        "realmGetContexts(bytes32)": FunctionFragment;
        "realmGetInfo(bytes32)": FunctionFragment;
        "realmHasContext(bytes32,bytes32)": FunctionFragment;
        "realmHasFunction(bytes32,bytes32)": FunctionFragment;
        "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])": FunctionFragment;
        "realmUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "realmUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "realmUpdateAgentLimit((bytes32,uint16)[])": FunctionFragment;
        "realmUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "realmUpdateContextLimit((bytes32,uint32)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "realmCheckAdmin" | "realmCheckAdmin(bytes32,address)" | "realmCheckId" | "realmCheckId(bytes32)" | "realmCheckName" | "realmCheckName(string)" | "realmDeleteActivity" | "realmDeleteActivity(bytes32[])" | "realmGetContexts" | "realmGetContexts(bytes32)" | "realmGetInfo" | "realmGetInfo(bytes32)" | "realmHasContext" | "realmHasContext(bytes32,bytes32)" | "realmHasFunction" | "realmHasFunction(bytes32,bytes32)" | "realmRegister" | "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])" | "realmUpdateActivityStatus" | "realmUpdateActivityStatus((bytes32,uint8)[])" | "realmUpdateAdmin" | "realmUpdateAdmin((bytes32,bytes32)[])" | "realmUpdateAgentLimit" | "realmUpdateAgentLimit((bytes32,uint16)[])" | "realmUpdateAlterabilityStatus" | "realmUpdateAlterabilityStatus((bytes32,uint8)[])" | "realmUpdateContextLimit" | "realmUpdateContextLimit((bytes32,uint32)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "realmCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "realmCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "realmCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "realmCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "realmDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "realmDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "realmGetContexts", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmGetContexts(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmHasContext", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmHasContext(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmHasFunction", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmHasFunction(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "realmRegister", values: [IRealmManagement.RealmRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", values: [IRealmManagement.RealmRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAgentLimit", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAgentLimit((bytes32,uint16)[])", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateContextLimit", values: [IRealmManagement.RealmUpdateContextLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "realmUpdateContextLimit((bytes32,uint32)[])", values: [IRealmManagement.RealmUpdateContextLimitRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "realmCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmGetContexts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmGetContexts(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmHasContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmHasContext(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmHasFunction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmHasFunction(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAgentLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAgentLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateContextLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "realmUpdateContextLimit((bytes32,uint32)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "RealmActivityUpdated(address,bytes32,uint8)": EventFragment;
        "RealmAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "RealmAgentLimitUpdated(address,bytes32,uint16)": EventFragment;
        "RealmAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "RealmContextLimitUpdated(address,bytes32,uint32)": EventFragment;
        "RealmRegistered(address,bytes32,bytes32,bytes32)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAgentLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAgentLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmContextLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmContextLimitUpdated(address,bytes32,uint32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RealmRegistered(address,bytes32,bytes32,bytes32)"): EventFragment;
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
export interface RealmActivityUpdatedEventObject {
    sender: string;
    realmId: string;
    acstat: number;
}
export declare type RealmActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RealmActivityUpdatedEventObject>;
export declare type RealmActivityUpdatedEventFilter = TypedEventFilter<RealmActivityUpdatedEvent>;
export interface RealmAdminUpdatedEventObject {
    sender: string;
    realmId: string;
    adminId: string;
}
export declare type RealmAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], RealmAdminUpdatedEventObject>;
export declare type RealmAdminUpdatedEventFilter = TypedEventFilter<RealmAdminUpdatedEvent>;
export interface RealmAgentLimitUpdatedEventObject {
    sender: string;
    realmId: string;
    agentLimit: number;
}
export declare type RealmAgentLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RealmAgentLimitUpdatedEventObject>;
export declare type RealmAgentLimitUpdatedEventFilter = TypedEventFilter<RealmAgentLimitUpdatedEvent>;
export interface RealmAlterabilityUpdatedEventObject {
    sender: string;
    realmId: string;
    alstat: number;
}
export declare type RealmAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RealmAlterabilityUpdatedEventObject>;
export declare type RealmAlterabilityUpdatedEventFilter = TypedEventFilter<RealmAlterabilityUpdatedEvent>;
export interface RealmContextLimitUpdatedEventObject {
    sender: string;
    realmId: string;
    contextLimit: number;
}
export declare type RealmContextLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RealmContextLimitUpdatedEventObject>;
export declare type RealmContextLimitUpdatedEventFilter = TypedEventFilter<RealmContextLimitUpdatedEvent>;
export interface RealmRegisteredEventObject {
    sender: string;
    realmId: string;
    domainId: string;
    adminId: string;
}
export declare type RealmRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], RealmRegisteredEventObject>;
export declare type RealmRegisteredEventFilter = TypedEventFilter<RealmRegisteredEvent>;
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
export interface IRealmManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRealmManagementInterface;
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
        realmCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "realmCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        realmCheckId(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "realmCheckId(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        realmCheckName(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "realmCheckName(string)"(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        realmDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmGetContexts(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "realmGetContexts(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        realmGetInfo(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRealmManagement.RealmInfoStructOutput]>;
        "realmGetInfo(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRealmManagement.RealmInfoStructOutput]>;
        realmHasContext(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "realmHasContext(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        realmHasFunction(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "realmHasFunction(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        realmRegister(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        realmUpdateContextLimit(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "realmUpdateContextLimit((bytes32,uint32)[])"(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    realmCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "realmCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    realmCheckId(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "realmCheckId(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    realmCheckName(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "realmCheckName(string)"(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    realmDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmGetContexts(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "realmGetContexts(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    realmGetInfo(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRealmManagement.RealmInfoStructOutput>;
    "realmGetInfo(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRealmManagement.RealmInfoStructOutput>;
    realmHasContext(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "realmHasContext(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    realmHasFunction(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "realmHasFunction(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    realmRegister(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    realmUpdateContextLimit(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "realmUpdateContextLimit((bytes32,uint32)[])"(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        realmCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "realmCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        realmCheckId(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "realmCheckId(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        realmCheckName(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "realmCheckName(string)"(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        realmDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "realmDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        realmGetContexts(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "realmGetContexts(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        realmGetInfo(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRealmManagement.RealmInfoStructOutput>;
        "realmGetInfo(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRealmManagement.RealmInfoStructOutput>;
        realmHasContext(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "realmHasContext(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        realmHasFunction(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "realmHasFunction(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        realmRegister(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        realmUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        realmUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        realmUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        realmUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        realmUpdateContextLimit(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "realmUpdateContextLimit((bytes32,uint32)[])"(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "RealmActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, acstat?: null): RealmActivityUpdatedEventFilter;
        RealmActivityUpdated(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, acstat?: null): RealmActivityUpdatedEventFilter;
        "RealmAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RealmAdminUpdatedEventFilter;
        RealmAdminUpdated(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RealmAdminUpdatedEventFilter;
        "RealmAgentLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): RealmAgentLimitUpdatedEventFilter;
        RealmAgentLimitUpdated(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): RealmAgentLimitUpdatedEventFilter;
        "RealmAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, alstat?: null): RealmAlterabilityUpdatedEventFilter;
        RealmAlterabilityUpdated(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, alstat?: null): RealmAlterabilityUpdatedEventFilter;
        "RealmContextLimitUpdated(address,bytes32,uint32)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, contextLimit?: null): RealmContextLimitUpdatedEventFilter;
        RealmContextLimitUpdated(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, contextLimit?: null): RealmContextLimitUpdatedEventFilter;
        "RealmRegistered(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: null): RealmRegisteredEventFilter;
        RealmRegistered(sender?: PromiseOrValue<string> | null, realmId?: PromiseOrValue<BytesLike> | null, domainId?: PromiseOrValue<BytesLike> | null, adminId?: null): RealmRegisteredEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        realmCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        realmCheckId(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmCheckId(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        realmCheckName(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmCheckName(string)"(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        realmDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmGetContexts(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmGetContexts(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        realmGetInfo(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmGetInfo(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        realmHasContext(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmHasContext(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        realmHasFunction(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "realmHasFunction(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        realmRegister(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        realmUpdateContextLimit(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "realmUpdateContextLimit((bytes32,uint32)[])"(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        realmCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmCheckId(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmCheckId(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmCheckName(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmCheckName(string)"(realmName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmGetContexts(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmGetContexts(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmGetInfo(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmGetInfo(bytes32)"(realmId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmHasContext(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmHasContext(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmHasFunction(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "realmHasFunction(bytes32,bytes32)"(realmId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        realmRegister(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmRegister((bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRealmManagement.RealmRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        realmUpdateContextLimit(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "realmUpdateContextLimit((bytes32,uint32)[])"(requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
