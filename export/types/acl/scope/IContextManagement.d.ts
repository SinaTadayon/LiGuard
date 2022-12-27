import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IContextManagement {
    type ContextInfoStruct = {
        realmId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        name: PromiseOrValue<string>;
        version: PromiseOrValue<string>;
        contractId: PromiseOrValue<string>;
        agentLimit: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type ContextInfoStructOutput = [
        string,
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        number,
        number
    ] & {
        realmId: string;
        adminId: string;
        name: string;
        version: string;
        contractId: string;
        agentLimit: number;
        referredByAgent: number;
        referredByPolicy: number;
        adminType: number;
        acstat: number;
        alstat: number;
    };
    type ContextRegisterRequestStruct = {
        realmId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        salt: PromiseOrValue<BytesLike>;
        name: PromiseOrValue<string>;
        version: PromiseOrValue<string>;
        contractId: PromiseOrValue<string>;
        subject: PromiseOrValue<string>;
        deployer: PromiseOrValue<string>;
        agentLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        signature: PromiseOrValue<BytesLike>;
    };
    type ContextRegisterRequestStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        string
    ] & {
        realmId: string;
        adminId: string;
        salt: string;
        name: string;
        version: string;
        contractId: string;
        subject: string;
        deployer: string;
        agentLimit: number;
        acstat: number;
        alstat: number;
        signature: string;
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
export interface IContextManagementInterface extends utils.Interface {
    functions: {
        "contextCheckAccount(address)": FunctionFragment;
        "contextCheckAdmin(bytes32,address)": FunctionFragment;
        "contextCheckId(bytes32)": FunctionFragment;
        "contextDeleteActivity(bytes32[])": FunctionFragment;
        "contextGetFunctions(bytes32)": FunctionFragment;
        "contextGetInfo(bytes32)": FunctionFragment;
        "contextHasFunction(bytes32,bytes32)": FunctionFragment;
        "contextHasSelector(address,bytes4)": FunctionFragment;
        "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])": FunctionFragment;
        "contextUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "contextUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "contextUpdateAgentLimit((bytes32,uint16)[])": FunctionFragment;
        "contextUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "contextCheckAccount" | "contextCheckAccount(address)" | "contextCheckAdmin" | "contextCheckAdmin(bytes32,address)" | "contextCheckId" | "contextCheckId(bytes32)" | "contextDeleteActivity" | "contextDeleteActivity(bytes32[])" | "contextGetFunctions" | "contextGetFunctions(bytes32)" | "contextGetInfo" | "contextGetInfo(bytes32)" | "contextHasFunction" | "contextHasFunction(bytes32,bytes32)" | "contextHasSelector" | "contextHasSelector(address,bytes4)" | "contextRegister" | "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])" | "contextUpdateActivityStatus" | "contextUpdateActivityStatus((bytes32,uint8)[])" | "contextUpdateAdmin" | "contextUpdateAdmin((bytes32,bytes32)[])" | "contextUpdateAgentLimit" | "contextUpdateAgentLimit((bytes32,uint16)[])" | "contextUpdateAlterabilityStatus" | "contextUpdateAlterabilityStatus((bytes32,uint8)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "contextCheckAccount", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "contextCheckAccount(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "contextCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "contextCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "contextCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "contextDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "contextGetFunctions", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextGetFunctions(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextHasFunction", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextHasFunction(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextHasSelector", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextHasSelector(address,bytes4)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contextRegister", values: [IContextManagement.ContextRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])", values: [IContextManagement.ContextRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAgentLimit", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAgentLimit((bytes32,uint16)[])", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "contextUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "contextCheckAccount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextCheckAccount(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextGetFunctions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextGetFunctions(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextHasFunction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextHasFunction(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextHasSelector", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextHasSelector(address,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAgentLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAgentLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contextUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ContextActivityUpdated(address,bytes32,uint8)": EventFragment;
        "ContextAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "ContextAgentLimitUpdated(address,bytes32,uint16)": EventFragment;
        "ContextAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "ContextRegistered(address,bytes32,address,address,address,address,bytes32,bytes32)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAgentLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAgentLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRegistered(address,bytes32,address,address,address,address,bytes32,bytes32)"): EventFragment;
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
export interface ContextActivityUpdatedEventObject {
    sender: string;
    contextId: string;
    acstat: number;
}
export declare type ContextActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ContextActivityUpdatedEventObject>;
export declare type ContextActivityUpdatedEventFilter = TypedEventFilter<ContextActivityUpdatedEvent>;
export interface ContextAdminUpdatedEventObject {
    sender: string;
    contextId: string;
    adminId: string;
}
export declare type ContextAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], ContextAdminUpdatedEventObject>;
export declare type ContextAdminUpdatedEventFilter = TypedEventFilter<ContextAdminUpdatedEvent>;
export interface ContextAgentLimitUpdatedEventObject {
    sender: string;
    contextId: string;
    agentLimit: number;
}
export declare type ContextAgentLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ContextAgentLimitUpdatedEventObject>;
export declare type ContextAgentLimitUpdatedEventFilter = TypedEventFilter<ContextAgentLimitUpdatedEvent>;
export interface ContextAlterabilityUpdatedEventObject {
    sender: string;
    contextId: string;
    alstat: number;
}
export declare type ContextAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ContextAlterabilityUpdatedEventObject>;
export declare type ContextAlterabilityUpdatedEventFilter = TypedEventFilter<ContextAlterabilityUpdatedEvent>;
export interface ContextRegisteredEventObject {
    sender: string;
    contextId: string;
    contractId: string;
    signer: string;
    deployer: string;
    subject: string;
    realmId: string;
    adminId: string;
}
export declare type ContextRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], ContextRegisteredEventObject>;
export declare type ContextRegisteredEventFilter = TypedEventFilter<ContextRegisteredEvent>;
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
export interface IContextManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IContextManagementInterface;
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
        contextCheckAccount(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "contextCheckAccount(address)"(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        contextCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "contextCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        contextCheckId(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "contextCheckId(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        contextDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contextGetFunctions(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "contextGetFunctions(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        contextGetInfo(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IContextManagement.ContextInfoStructOutput]>;
        "contextGetInfo(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IContextManagement.ContextInfoStructOutput]>;
        contextHasFunction(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "contextHasFunction(bytes32,bytes32)"(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        contextHasSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "contextHasSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        contextRegister(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])"(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contextUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contextUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contextUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contextUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "contextUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    contextCheckAccount(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "contextCheckAccount(address)"(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    contextCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "contextCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    contextCheckId(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "contextCheckId(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    contextDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contextGetFunctions(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "contextGetFunctions(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    contextGetInfo(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ContextInfoStructOutput>;
    "contextGetInfo(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ContextInfoStructOutput>;
    contextHasFunction(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "contextHasFunction(bytes32,bytes32)"(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    contextHasSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "contextHasSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    contextRegister(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])"(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contextUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contextUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contextUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contextUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "contextUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        contextCheckAccount(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "contextCheckAccount(address)"(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        contextCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "contextCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        contextCheckId(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "contextCheckId(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        contextDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "contextDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        contextGetFunctions(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "contextGetFunctions(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        contextGetInfo(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ContextInfoStructOutput>;
        "contextGetInfo(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ContextInfoStructOutput>;
        contextHasFunction(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "contextHasFunction(bytes32,bytes32)"(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        contextHasSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "contextHasSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        contextRegister(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])"(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        contextUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "contextUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        contextUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "contextUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        contextUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "contextUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        contextUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "contextUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "ContextActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, acstat?: null): ContextActivityUpdatedEventFilter;
        ContextActivityUpdated(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, acstat?: null): ContextActivityUpdatedEventFilter;
        "ContextAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): ContextAdminUpdatedEventFilter;
        ContextAdminUpdated(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): ContextAdminUpdatedEventFilter;
        "ContextAgentLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): ContextAgentLimitUpdatedEventFilter;
        ContextAgentLimitUpdated(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): ContextAgentLimitUpdatedEventFilter;
        "ContextAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, alstat?: null): ContextAlterabilityUpdatedEventFilter;
        ContextAlterabilityUpdated(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, alstat?: null): ContextAlterabilityUpdatedEventFilter;
        "ContextRegistered(address,bytes32,address,address,address,address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, signer?: null, deployer?: null, subject?: null, realmId?: null, adminId?: null): ContextRegisteredEventFilter;
        ContextRegistered(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, signer?: null, deployer?: null, subject?: null, realmId?: null, adminId?: null): ContextRegisteredEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        contextCheckAccount(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextCheckAccount(address)"(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        contextCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        contextCheckId(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextCheckId(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contextDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contextGetFunctions(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextGetFunctions(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contextGetInfo(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextGetInfo(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contextHasFunction(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextHasFunction(bytes32,bytes32)"(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contextHasSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "contextHasSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contextRegister(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])"(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contextUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contextUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contextUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contextUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "contextUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        contextCheckAccount(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextCheckAccount(address)"(contractId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextCheckAdmin(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextCheckAdmin(bytes32,address)"(contextId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextCheckId(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextCheckId(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contextGetFunctions(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextGetFunctions(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextGetInfo(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextGetInfo(bytes32)"(contextId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextHasFunction(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextHasFunction(bytes32,bytes32)"(contextId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextHasSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contextHasSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contextRegister(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextRegister((bytes32,bytes32,bytes32,string,string,address,address,address,uint16,uint8,uint8,bytes)[])"(requests: IContextManagement.ContextRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contextUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contextUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contextUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contextUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "contextUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
