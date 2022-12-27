import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IGlobalManagement {
    type GlobalInfoStruct = {
        id: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        domainLimit: PromiseOrValue<BigNumberish>;
        agentLimit: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstate: PromiseOrValue<BigNumberish>;
    };
    type GlobalInfoStructOutput = [
        string,
        string,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ] & {
        id: string;
        adminId: string;
        domainLimit: number;
        agentLimit: number;
        referredByAgent: number;
        referredByPolicy: number;
        adminType: number;
        acstat: number;
        alstate: number;
    };
}
export interface IGlobalManagementInterface extends utils.Interface {
    functions: {
        "globalCheckAdmin(address)": FunctionFragment;
        "globalGetDomains()": FunctionFragment;
        "globalGetInfo()": FunctionFragment;
        "globalUpdateActivityStatus(uint8)": FunctionFragment;
        "globalUpdateAdmin(bytes32)": FunctionFragment;
        "globalUpdateAgentLimit(uint16)": FunctionFragment;
        "globalUpdateAlterabilityStatus(uint8)": FunctionFragment;
        "globalUpdateDomainLimit(uint16)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "globalCheckAdmin" | "globalCheckAdmin(address)" | "globalGetDomains" | "globalGetDomains()" | "globalGetInfo" | "globalGetInfo()" | "globalUpdateActivityStatus" | "globalUpdateActivityStatus(uint8)" | "globalUpdateAdmin" | "globalUpdateAdmin(bytes32)" | "globalUpdateAgentLimit" | "globalUpdateAgentLimit(uint16)" | "globalUpdateAlterabilityStatus" | "globalUpdateAlterabilityStatus(uint8)" | "globalUpdateDomainLimit" | "globalUpdateDomainLimit(uint16)"): FunctionFragment;
    encodeFunctionData(functionFragment: "globalCheckAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "globalCheckAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "globalGetDomains", values?: undefined): string;
    encodeFunctionData(functionFragment: "globalGetDomains()", values?: undefined): string;
    encodeFunctionData(functionFragment: "globalGetInfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "globalGetInfo()", values?: undefined): string;
    encodeFunctionData(functionFragment: "globalUpdateActivityStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateActivityStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAdmin", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAdmin(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAgentLimit", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAgentLimit(uint16)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAlterabilityStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateAlterabilityStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateDomainLimit", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "globalUpdateDomainLimit(uint16)", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "globalCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalCheckAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalGetDomains", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalGetDomains()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalGetInfo()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateActivityStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAdmin(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAgentLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAgentLimit(uint16)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateAlterabilityStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateDomainLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "globalUpdateDomainLimit(uint16)", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "GlobalActivityUpdated(address,uint8)": EventFragment;
        "GlobalAdminUpdated(address,bytes32,uint8)": EventFragment;
        "GlobalAgentLimitUpdated(address,uint16)": EventFragment;
        "GlobalAlterabilityUpdated(address,uint8)": EventFragment;
        "GlobalDomainLimitUpdated(address,uint16)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalActivityUpdated(address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAdminUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAgentLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAgentLimitUpdated(address,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalAlterabilityUpdated(address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalDomainLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "GlobalDomainLimitUpdated(address,uint16)"): EventFragment;
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
export interface GlobalActivityUpdatedEventObject {
    sender: string;
    acstat: number;
}
export declare type GlobalActivityUpdatedEvent = TypedEvent<[
    string,
    number
], GlobalActivityUpdatedEventObject>;
export declare type GlobalActivityUpdatedEventFilter = TypedEventFilter<GlobalActivityUpdatedEvent>;
export interface GlobalAdminUpdatedEventObject {
    sender: string;
    adminId: string;
    adminType: number;
}
export declare type GlobalAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], GlobalAdminUpdatedEventObject>;
export declare type GlobalAdminUpdatedEventFilter = TypedEventFilter<GlobalAdminUpdatedEvent>;
export interface GlobalAgentLimitUpdatedEventObject {
    sender: string;
    agentLimit: number;
}
export declare type GlobalAgentLimitUpdatedEvent = TypedEvent<[
    string,
    number
], GlobalAgentLimitUpdatedEventObject>;
export declare type GlobalAgentLimitUpdatedEventFilter = TypedEventFilter<GlobalAgentLimitUpdatedEvent>;
export interface GlobalAlterabilityUpdatedEventObject {
    sender: string;
    alstat: number;
}
export declare type GlobalAlterabilityUpdatedEvent = TypedEvent<[
    string,
    number
], GlobalAlterabilityUpdatedEventObject>;
export declare type GlobalAlterabilityUpdatedEventFilter = TypedEventFilter<GlobalAlterabilityUpdatedEvent>;
export interface GlobalDomainLimitUpdatedEventObject {
    sender: string;
    domainLimit: number;
}
export declare type GlobalDomainLimitUpdatedEvent = TypedEvent<[
    string,
    number
], GlobalDomainLimitUpdatedEventObject>;
export declare type GlobalDomainLimitUpdatedEventFilter = TypedEventFilter<GlobalDomainLimitUpdatedEvent>;
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
export interface IGlobalManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IGlobalManagementInterface;
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
        globalCheckAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "globalCheckAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        globalGetDomains(overrides?: CallOverrides): Promise<[string[]]>;
        "globalGetDomains()"(overrides?: CallOverrides): Promise<[string[]]>;
        globalGetInfo(overrides?: CallOverrides): Promise<[IGlobalManagement.GlobalInfoStructOutput]>;
        "globalGetInfo()"(overrides?: CallOverrides): Promise<[IGlobalManagement.GlobalInfoStructOutput]>;
        globalUpdateActivityStatus(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "globalUpdateActivityStatus(uint8)"(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        globalUpdateAdmin(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "globalUpdateAdmin(bytes32)"(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        globalUpdateAgentLimit(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "globalUpdateAgentLimit(uint16)"(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        globalUpdateAlterabilityStatus(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "globalUpdateAlterabilityStatus(uint8)"(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        globalUpdateDomainLimit(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "globalUpdateDomainLimit(uint16)"(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    globalCheckAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "globalCheckAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    globalGetDomains(overrides?: CallOverrides): Promise<string[]>;
    "globalGetDomains()"(overrides?: CallOverrides): Promise<string[]>;
    globalGetInfo(overrides?: CallOverrides): Promise<IGlobalManagement.GlobalInfoStructOutput>;
    "globalGetInfo()"(overrides?: CallOverrides): Promise<IGlobalManagement.GlobalInfoStructOutput>;
    globalUpdateActivityStatus(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "globalUpdateActivityStatus(uint8)"(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    globalUpdateAdmin(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "globalUpdateAdmin(bytes32)"(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    globalUpdateAgentLimit(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "globalUpdateAgentLimit(uint16)"(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    globalUpdateAlterabilityStatus(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "globalUpdateAlterabilityStatus(uint8)"(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    globalUpdateDomainLimit(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "globalUpdateDomainLimit(uint16)"(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        globalCheckAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "globalCheckAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        globalGetDomains(overrides?: CallOverrides): Promise<string[]>;
        "globalGetDomains()"(overrides?: CallOverrides): Promise<string[]>;
        globalGetInfo(overrides?: CallOverrides): Promise<IGlobalManagement.GlobalInfoStructOutput>;
        "globalGetInfo()"(overrides?: CallOverrides): Promise<IGlobalManagement.GlobalInfoStructOutput>;
        globalUpdateActivityStatus(acstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        "globalUpdateActivityStatus(uint8)"(acstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        globalUpdateAdmin(newAdminId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "globalUpdateAdmin(bytes32)"(newAdminId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        globalUpdateAgentLimit(agentLimit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "globalUpdateAgentLimit(uint16)"(agentLimit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        globalUpdateAlterabilityStatus(alstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        "globalUpdateAlterabilityStatus(uint8)"(alstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        globalUpdateDomainLimit(domainLimit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "globalUpdateDomainLimit(uint16)"(domainLimit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "GlobalActivityUpdated(address,uint8)"(sender?: PromiseOrValue<string> | null, acstat?: null): GlobalActivityUpdatedEventFilter;
        GlobalActivityUpdated(sender?: PromiseOrValue<string> | null, acstat?: null): GlobalActivityUpdatedEventFilter;
        "GlobalAdminUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, adminId?: PromiseOrValue<BytesLike> | null, adminType?: null): GlobalAdminUpdatedEventFilter;
        GlobalAdminUpdated(sender?: PromiseOrValue<string> | null, adminId?: PromiseOrValue<BytesLike> | null, adminType?: null): GlobalAdminUpdatedEventFilter;
        "GlobalAgentLimitUpdated(address,uint16)"(sender?: PromiseOrValue<string> | null, agentLimit?: null): GlobalAgentLimitUpdatedEventFilter;
        GlobalAgentLimitUpdated(sender?: PromiseOrValue<string> | null, agentLimit?: null): GlobalAgentLimitUpdatedEventFilter;
        "GlobalAlterabilityUpdated(address,uint8)"(sender?: PromiseOrValue<string> | null, alstat?: null): GlobalAlterabilityUpdatedEventFilter;
        GlobalAlterabilityUpdated(sender?: PromiseOrValue<string> | null, alstat?: null): GlobalAlterabilityUpdatedEventFilter;
        "GlobalDomainLimitUpdated(address,uint16)"(sender?: PromiseOrValue<string> | null, domainLimit?: null): GlobalDomainLimitUpdatedEventFilter;
        GlobalDomainLimitUpdated(sender?: PromiseOrValue<string> | null, domainLimit?: null): GlobalDomainLimitUpdatedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        globalCheckAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "globalCheckAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        globalGetDomains(overrides?: CallOverrides): Promise<BigNumber>;
        "globalGetDomains()"(overrides?: CallOverrides): Promise<BigNumber>;
        globalGetInfo(overrides?: CallOverrides): Promise<BigNumber>;
        "globalGetInfo()"(overrides?: CallOverrides): Promise<BigNumber>;
        globalUpdateActivityStatus(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "globalUpdateActivityStatus(uint8)"(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        globalUpdateAdmin(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "globalUpdateAdmin(bytes32)"(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        globalUpdateAgentLimit(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "globalUpdateAgentLimit(uint16)"(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        globalUpdateAlterabilityStatus(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "globalUpdateAlterabilityStatus(uint8)"(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        globalUpdateDomainLimit(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "globalUpdateDomainLimit(uint16)"(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        globalCheckAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "globalCheckAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        globalGetDomains(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "globalGetDomains()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        globalGetInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "globalGetInfo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        globalUpdateActivityStatus(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "globalUpdateActivityStatus(uint8)"(acstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        globalUpdateAdmin(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "globalUpdateAdmin(bytes32)"(newAdminId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        globalUpdateAgentLimit(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "globalUpdateAgentLimit(uint16)"(agentLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        globalUpdateAlterabilityStatus(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "globalUpdateAlterabilityStatus(uint8)"(alstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        globalUpdateDomainLimit(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "globalUpdateDomainLimit(uint16)"(domainLimit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
