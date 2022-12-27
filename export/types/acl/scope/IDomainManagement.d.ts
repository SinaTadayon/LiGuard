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
export interface IDomainManagementInterface extends utils.Interface {
    functions: {
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
        "domainUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "domainUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "domainUpdateAgentLimit((bytes32,uint16)[])": FunctionFragment;
        "domainUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "domainUpdateRealmLimit((bytes32,uint16)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "domainCheckAdmin" | "domainCheckAdmin(bytes32,address)" | "domainCheckId" | "domainCheckId(bytes32)" | "domainCheckName" | "domainCheckName(string)" | "domainDeleteActivity" | "domainDeleteActivity(bytes32[])" | "domainGetInfo" | "domainGetInfo(bytes32)" | "domainGetRealms" | "domainGetRealms(bytes32)" | "domainHasContext" | "domainHasContext(bytes32,bytes32)" | "domainHasFunction" | "domainHasFunction(bytes32,bytes32)" | "domainHasRealm" | "domainHasRealm(bytes32,bytes32)" | "domainRegister" | "domainRegister((bytes32,uint16,uint16,uint8,uint8,string)[])" | "domainUpdateActivityStatus" | "domainUpdateActivityStatus((bytes32,uint8)[])" | "domainUpdateAdmin" | "domainUpdateAdmin((bytes32,bytes32)[])" | "domainUpdateAgentLimit" | "domainUpdateAgentLimit((bytes32,uint16)[])" | "domainUpdateAlterabilityStatus" | "domainUpdateAlterabilityStatus((bytes32,uint8)[])" | "domainUpdateRealmLimit" | "domainUpdateRealmLimit((bytes32,uint16)[])"): FunctionFragment;
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
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "DomainActivityUpdated(address,bytes32,uint8)": EventFragment;
        "DomainAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "DomainAgentLimitUpdated(address,bytes32,uint16)": EventFragment;
        "DomainAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "DomainRealmLimitUpdated(address,bytes32,uint16)": EventFragment;
        "DomainRegistered(address,bytes32,bytes32)": EventFragment;
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
export interface IDomainManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDomainManagementInterface;
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
    };
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
    callStatic: {
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
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
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
    };
    populateTransaction: {
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
    };
}
