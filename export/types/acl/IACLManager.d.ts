import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace IACLManager {
    type FacetRegisterRequestStruct = {
        facetId: PromiseOrValue<string>;
        subjectId: PromiseOrValue<string>;
        interfaceId: PromiseOrValue<BytesLike>;
        selectors: PromiseOrValue<BytesLike>[];
    };
    type FacetRegisterRequestStructOutput = [
        string,
        string,
        string,
        string[]
    ] & {
        facetId: string;
        subjectId: string;
        interfaceId: string;
        selectors: string[];
    };
    type FacetSelectorUpgradeRequestStruct = {
        action: PromiseOrValue<BigNumberish>;
        selectors: PromiseOrValue<BytesLike>[];
    };
    type FacetSelectorUpgradeRequestStructOutput = [number, string[]] & {
        action: number;
        selectors: string[];
    };
    type FacetUpgradeRequestStruct = {
        facetId: PromiseOrValue<string>;
        subjectId: PromiseOrValue<string>;
        interfaceId: PromiseOrValue<BytesLike>;
        functions: IACLManager.FacetSelectorUpgradeRequestStruct[];
    };
    type FacetUpgradeRequestStructOutput = [
        string,
        string,
        string,
        IACLManager.FacetSelectorUpgradeRequestStructOutput[]
    ] & {
        facetId: string;
        subjectId: string;
        interfaceId: string;
        functions: IACLManager.FacetSelectorUpgradeRequestStructOutput[];
    };
}
export interface IACLManagerInterface extends utils.Interface {
    functions: {
        "aclGetFacets()": FunctionFragment;
        "aclRegisterFacet((address,address,bytes4,bytes4[])[])": FunctionFragment;
        "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "aclGetFacets" | "aclGetFacets()" | "aclRegisterFacet" | "aclRegisterFacet((address,address,bytes4,bytes4[])[])" | "aclUpgradeFacet" | "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "aclGetFacets", values?: undefined): string;
    encodeFunctionData(functionFragment: "aclGetFacets()", values?: undefined): string;
    encodeFunctionData(functionFragment: "aclRegisterFacet", values: [IACLManager.FacetRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "aclRegisterFacet((address,address,bytes4,bytes4[])[])", values: [IACLManager.FacetRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "aclUpgradeFacet", values: [IACLManager.FacetUpgradeRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])", values: [IACLManager.FacetUpgradeRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "aclGetFacets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "aclGetFacets()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "aclRegisterFacet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "aclRegisterFacet((address,address,bytes4,bytes4[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "aclUpgradeFacet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])", data: BytesLike): Result;
    events: {
        "ACLFacetFunctionUpgraded(address,address,bytes4,uint8)": EventFragment;
        "ACLFacetRegistered(address,address,address,bytes4)": EventFragment;
        "ACLFacetUpgraded(address,address,address,bytes4)": EventFragment;
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ACLFacetFunctionUpgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ACLFacetFunctionUpgraded(address,address,bytes4,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ACLFacetRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ACLFacetRegistered(address,address,address,bytes4)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ACLFacetUpgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ACLFacetUpgraded(address,address,address,bytes4)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
}
export interface ACLFacetFunctionUpgradedEventObject {
    sender: string;
    facetId: string;
    selector: string;
    action: number;
}
export declare type ACLFacetFunctionUpgradedEvent = TypedEvent<[
    string,
    string,
    string,
    number
], ACLFacetFunctionUpgradedEventObject>;
export declare type ACLFacetFunctionUpgradedEventFilter = TypedEventFilter<ACLFacetFunctionUpgradedEvent>;
export interface ACLFacetRegisteredEventObject {
    sender: string;
    facetId: string;
    subjectId: string;
    interfaceId: string;
}
export declare type ACLFacetRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ACLFacetRegisteredEventObject>;
export declare type ACLFacetRegisteredEventFilter = TypedEventFilter<ACLFacetRegisteredEvent>;
export interface ACLFacetUpgradedEventObject {
    sender: string;
    facetId: string;
    subjectId: string;
    interfaceId: string;
}
export declare type ACLFacetUpgradedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ACLFacetUpgradedEventObject>;
export declare type ACLFacetUpgradedEventFilter = TypedEventFilter<ACLFacetUpgradedEvent>;
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
export interface IACLManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IACLManagerInterface;
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
        aclGetFacets(overrides?: CallOverrides): Promise<[string[]]>;
        "aclGetFacets()"(overrides?: CallOverrides): Promise<[string[]]>;
        aclRegisterFacet(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "aclRegisterFacet((address,address,bytes4,bytes4[])[])"(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        aclUpgradeFacet(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    aclGetFacets(overrides?: CallOverrides): Promise<string[]>;
    "aclGetFacets()"(overrides?: CallOverrides): Promise<string[]>;
    aclRegisterFacet(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "aclRegisterFacet((address,address,bytes4,bytes4[])[])"(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    aclUpgradeFacet(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        aclGetFacets(overrides?: CallOverrides): Promise<string[]>;
        "aclGetFacets()"(overrides?: CallOverrides): Promise<string[]>;
        aclRegisterFacet(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "aclRegisterFacet((address,address,bytes4,bytes4[])[])"(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        aclUpgradeFacet(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "ACLFacetFunctionUpgraded(address,address,bytes4,uint8)"(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, selector?: null, action?: null): ACLFacetFunctionUpgradedEventFilter;
        ACLFacetFunctionUpgraded(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, selector?: null, action?: null): ACLFacetFunctionUpgradedEventFilter;
        "ACLFacetRegistered(address,address,address,bytes4)"(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, subjectId?: PromiseOrValue<string> | null, interfaceId?: null): ACLFacetRegisteredEventFilter;
        ACLFacetRegistered(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, subjectId?: PromiseOrValue<string> | null, interfaceId?: null): ACLFacetRegisteredEventFilter;
        "ACLFacetUpgraded(address,address,address,bytes4)"(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, subjectId?: PromiseOrValue<string> | null, interfaceId?: null): ACLFacetUpgradedEventFilter;
        ACLFacetUpgraded(sender?: PromiseOrValue<string> | null, facetId?: PromiseOrValue<string> | null, subjectId?: PromiseOrValue<string> | null, interfaceId?: null): ACLFacetUpgradedEventFilter;
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
        aclGetFacets(overrides?: CallOverrides): Promise<BigNumber>;
        "aclGetFacets()"(overrides?: CallOverrides): Promise<BigNumber>;
        aclRegisterFacet(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "aclRegisterFacet((address,address,bytes4,bytes4[])[])"(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        aclUpgradeFacet(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        aclGetFacets(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "aclGetFacets()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        aclRegisterFacet(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "aclRegisterFacet((address,address,bytes4,bytes4[])[])"(requests: IACLManager.FacetRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        aclUpgradeFacet(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "aclUpgradeFacet((address,address,bytes4,(uint8,bytes4[])[])[])"(requests: IACLManager.FacetUpgradeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
