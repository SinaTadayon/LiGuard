import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IFunctionManagement {
    type FunctionInfoStruct = {
        adminId: PromiseOrValue<BytesLike>;
        agentId: PromiseOrValue<BytesLike>;
        contextId: PromiseOrValue<BytesLike>;
        selector: PromiseOrValue<BytesLike>;
        agentLimit: PromiseOrValue<BigNumberish>;
        referredByAgent: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        agentType: PromiseOrValue<BigNumberish>;
        policyCode: PromiseOrValue<BigNumberish>;
    };
    type FunctionInfoStructOutput = [
        string,
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
        number
    ] & {
        adminId: string;
        agentId: string;
        contextId: string;
        selector: string;
        agentLimit: number;
        referredByAgent: number;
        referredByPolicy: number;
        acstat: number;
        alstat: number;
        adminType: number;
        agentType: number;
        policyCode: number;
    };
    type FunctionRegisterRequestStruct = {
        signature: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        agentId: PromiseOrValue<BytesLike>;
        contractId: PromiseOrValue<string>;
        selector: PromiseOrValue<BytesLike>;
        agentLimit: PromiseOrValue<BigNumberish>;
        policyCode: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type FunctionRegisterRequestStructOutput = [
        string,
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number
    ] & {
        signature: string;
        adminId: string;
        agentId: string;
        contractId: string;
        selector: string;
        agentLimit: number;
        policyCode: number;
        acstat: number;
        alstat: number;
    };
    type FunctionUpdateAgentRequestStruct = {
        functionId: PromiseOrValue<BytesLike>;
        agentId: PromiseOrValue<BytesLike>;
    };
    type FunctionUpdateAgentRequestStructOutput = [string, string] & {
        functionId: string;
        agentId: string;
    };
    type FunctionUpdatePolicyRequestStruct = {
        functionId: PromiseOrValue<BytesLike>;
        policyCode: PromiseOrValue<BigNumberish>;
    };
    type FunctionUpdatePolicyRequestStructOutput = [string, number] & {
        functionId: string;
        policyCode: number;
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
export interface IFunctionManagementInterface extends utils.Interface {
    functions: {
        "functionCheckAdmin(bytes32,address)": FunctionFragment;
        "functionCheckAgent(bytes32,address)": FunctionFragment;
        "functionCheckId(bytes32)": FunctionFragment;
        "functionCheckSelector(address,bytes4)": FunctionFragment;
        "functionDeleteActivity(bytes32[])": FunctionFragment;
        "functionGetInfo(bytes32)": FunctionFragment;
        "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])": FunctionFragment;
        "functionUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "functionUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "functionUpdateAgent((bytes32,bytes32)[])": FunctionFragment;
        "functionUpdateAgentLimit((bytes32,uint16)[])": FunctionFragment;
        "functionUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "functionUpdatePolicy((bytes32,uint8)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "functionCheckAdmin" | "functionCheckAdmin(bytes32,address)" | "functionCheckAgent" | "functionCheckAgent(bytes32,address)" | "functionCheckId" | "functionCheckId(bytes32)" | "functionCheckSelector" | "functionCheckSelector(address,bytes4)" | "functionDeleteActivity" | "functionDeleteActivity(bytes32[])" | "functionGetInfo" | "functionGetInfo(bytes32)" | "functionRegister" | "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])" | "functionUpdateActivityStatus" | "functionUpdateActivityStatus((bytes32,uint8)[])" | "functionUpdateAdmin" | "functionUpdateAdmin((bytes32,bytes32)[])" | "functionUpdateAgent" | "functionUpdateAgent((bytes32,bytes32)[])" | "functionUpdateAgentLimit" | "functionUpdateAgentLimit((bytes32,uint16)[])" | "functionUpdateAlterabilityStatus" | "functionUpdateAlterabilityStatus((bytes32,uint8)[])" | "functionUpdatePolicy" | "functionUpdatePolicy((bytes32,uint8)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "functionCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "functionCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "functionCheckAgent", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "functionCheckAgent(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "functionCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionCheckSelector", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionCheckSelector(address,bytes4)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "functionDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "functionGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "functionRegister", values: [IFunctionManagement.FunctionRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])", values: [IFunctionManagement.FunctionRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAgent", values: [IFunctionManagement.FunctionUpdateAgentRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAgent((bytes32,bytes32)[])", values: [IFunctionManagement.FunctionUpdateAgentRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAgentLimit", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAgentLimit((bytes32,uint16)[])", values: [IACLCommons.ScopeUpdateAgentLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdatePolicy", values: [IFunctionManagement.FunctionUpdatePolicyRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "functionUpdatePolicy((bytes32,uint8)[])", values: [IFunctionManagement.FunctionUpdatePolicyRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "functionCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckAgent(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckSelector", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionCheckSelector(address,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAgent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAgent((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAgentLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAgentLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdatePolicy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "functionUpdatePolicy((bytes32,uint8)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "FunctionActivityUpdated(address,bytes32,uint8)": EventFragment;
        "FunctionAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "FunctionAgentLimitUpdated(address,bytes32,uint16)": EventFragment;
        "FunctionAgentUpdated(address,bytes32,bytes32)": EventFragment;
        "FunctionAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "FunctionPolicyUpdated(address,bytes32,uint8)": EventFragment;
        "FunctionRegistered(address,bytes32,bytes32,bytes32,bytes32,address,bytes4,uint8)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAgentLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAgentLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAgentUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAgentUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionPolicyUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FunctionRegistered(address,bytes32,bytes32,bytes32,bytes32,address,bytes4,uint8)"): EventFragment;
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
export interface FunctionActivityUpdatedEventObject {
    sender: string;
    functionId: string;
    acstat: number;
}
export declare type FunctionActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], FunctionActivityUpdatedEventObject>;
export declare type FunctionActivityUpdatedEventFilter = TypedEventFilter<FunctionActivityUpdatedEvent>;
export interface FunctionAdminUpdatedEventObject {
    sender: string;
    functionId: string;
    adminId: string;
}
export declare type FunctionAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], FunctionAdminUpdatedEventObject>;
export declare type FunctionAdminUpdatedEventFilter = TypedEventFilter<FunctionAdminUpdatedEvent>;
export interface FunctionAgentLimitUpdatedEventObject {
    sender: string;
    functionId: string;
    agentLimit: number;
}
export declare type FunctionAgentLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], FunctionAgentLimitUpdatedEventObject>;
export declare type FunctionAgentLimitUpdatedEventFilter = TypedEventFilter<FunctionAgentLimitUpdatedEvent>;
export interface FunctionAgentUpdatedEventObject {
    sender: string;
    functionId: string;
    agentId: string;
}
export declare type FunctionAgentUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], FunctionAgentUpdatedEventObject>;
export declare type FunctionAgentUpdatedEventFilter = TypedEventFilter<FunctionAgentUpdatedEvent>;
export interface FunctionAlterabilityUpdatedEventObject {
    sender: string;
    functionId: string;
    alstat: number;
}
export declare type FunctionAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], FunctionAlterabilityUpdatedEventObject>;
export declare type FunctionAlterabilityUpdatedEventFilter = TypedEventFilter<FunctionAlterabilityUpdatedEvent>;
export interface FunctionPolicyUpdatedEventObject {
    sender: string;
    functionId: string;
    policyCode: number;
}
export declare type FunctionPolicyUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], FunctionPolicyUpdatedEventObject>;
export declare type FunctionPolicyUpdatedEventFilter = TypedEventFilter<FunctionPolicyUpdatedEvent>;
export interface FunctionRegisteredEventObject {
    sender: string;
    contextId: string;
    functionId: string;
    adminId: string;
    agentId: string;
    signer: string;
    selector: string;
    policyCode: number;
}
export declare type FunctionRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    number
], FunctionRegisteredEventObject>;
export declare type FunctionRegisteredEventFilter = TypedEventFilter<FunctionRegisteredEvent>;
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
export interface IFunctionManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IFunctionManagementInterface;
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
        functionCheckAdmin(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "functionCheckAdmin(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        functionCheckAgent(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "functionCheckAgent(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        functionCheckId(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "functionCheckId(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        functionCheckSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "functionCheckSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        functionDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionGetInfo(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IFunctionManagement.FunctionInfoStructOutput]>;
        "functionGetInfo(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IFunctionManagement.FunctionInfoStructOutput]>;
        functionRegister(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])"(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdateAgent(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdateAgent((bytes32,bytes32)[])"(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        functionUpdatePolicy(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "functionUpdatePolicy((bytes32,uint8)[])"(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    functionCheckAdmin(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "functionCheckAdmin(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    functionCheckAgent(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "functionCheckAgent(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    functionCheckId(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "functionCheckId(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    functionCheckSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "functionCheckSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    functionDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionGetInfo(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IFunctionManagement.FunctionInfoStructOutput>;
    "functionGetInfo(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IFunctionManagement.FunctionInfoStructOutput>;
    functionRegister(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])"(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdateAgent(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdateAgent((bytes32,bytes32)[])"(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    functionUpdatePolicy(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "functionUpdatePolicy((bytes32,uint8)[])"(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        functionCheckAdmin(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "functionCheckAdmin(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        functionCheckAgent(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "functionCheckAgent(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        functionCheckId(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "functionCheckId(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        functionCheckSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "functionCheckSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        functionDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "functionDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        functionGetInfo(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IFunctionManagement.FunctionInfoStructOutput>;
        "functionGetInfo(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IFunctionManagement.FunctionInfoStructOutput>;
        functionRegister(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])"(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdateAgent(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdateAgent((bytes32,bytes32)[])"(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        functionUpdatePolicy(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "functionUpdatePolicy((bytes32,uint8)[])"(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "FunctionActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, acstat?: null): FunctionActivityUpdatedEventFilter;
        FunctionActivityUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, acstat?: null): FunctionActivityUpdatedEventFilter;
        "FunctionAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): FunctionAdminUpdatedEventFilter;
        FunctionAdminUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): FunctionAdminUpdatedEventFilter;
        "FunctionAgentLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): FunctionAgentLimitUpdatedEventFilter;
        FunctionAgentLimitUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, agentLimit?: null): FunctionAgentLimitUpdatedEventFilter;
        "FunctionAgentUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null): FunctionAgentUpdatedEventFilter;
        FunctionAgentUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null): FunctionAgentUpdatedEventFilter;
        "FunctionAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, alstat?: null): FunctionAlterabilityUpdatedEventFilter;
        FunctionAlterabilityUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, alstat?: null): FunctionAlterabilityUpdatedEventFilter;
        "FunctionPolicyUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, policyCode?: null): FunctionPolicyUpdatedEventFilter;
        FunctionPolicyUpdated(sender?: PromiseOrValue<string> | null, functionId?: PromiseOrValue<BytesLike> | null, policyCode?: null): FunctionPolicyUpdatedEventFilter;
        "FunctionRegistered(address,bytes32,bytes32,bytes32,bytes32,address,bytes4,uint8)"(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, functionId?: PromiseOrValue<BytesLike> | null, adminId?: null, agentId?: null, signer?: null, selector?: null, policyCode?: null): FunctionRegisteredEventFilter;
        FunctionRegistered(sender?: PromiseOrValue<string> | null, contextId?: PromiseOrValue<BytesLike> | null, functionId?: PromiseOrValue<BytesLike> | null, adminId?: null, agentId?: null, signer?: null, selector?: null, policyCode?: null): FunctionRegisteredEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        functionCheckAdmin(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "functionCheckAdmin(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        functionCheckAgent(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "functionCheckAgent(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        functionCheckId(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "functionCheckId(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        functionCheckSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "functionCheckSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        functionDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionGetInfo(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "functionGetInfo(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        functionRegister(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])"(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdateAgent(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdateAgent((bytes32,bytes32)[])"(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        functionUpdatePolicy(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "functionUpdatePolicy((bytes32,uint8)[])"(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        functionCheckAdmin(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "functionCheckAdmin(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        functionCheckAgent(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "functionCheckAgent(bytes32,address)"(functionId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        functionCheckId(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "functionCheckId(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        functionCheckSelector(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "functionCheckSelector(address,bytes4)"(contractId: PromiseOrValue<string>, selector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        functionDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionGetInfo(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "functionGetInfo(bytes32)"(functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        functionRegister(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionRegister((bytes,bytes32,bytes32,address,bytes4,uint16,uint8,uint8,uint8)[])"(requests: IFunctionManagement.FunctionRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdateAgent(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdateAgent((bytes32,bytes32)[])"(requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdateAgentLimit(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdateAgentLimit((bytes32,uint16)[])"(requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        functionUpdatePolicy(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "functionUpdatePolicy((bytes32,uint8)[])"(requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
