import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IMemberManagement {
    type MemberInfoStruct = {
        adminId: PromiseOrValue<BytesLike>;
        account: PromiseOrValue<string>;
        typeLimit: PromiseOrValue<BigNumberish>;
        typeCount: PromiseOrValue<BigNumberish>;
        atype: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type MemberInfoStructOutput = [
        string,
        string,
        number,
        number,
        number,
        number,
        number
    ] & {
        adminId: string;
        account: string;
        typeLimit: number;
        typeCount: number;
        atype: number;
        acstat: number;
        alstat: number;
    };
    type MemberRegisterStruct = {
        roleId: PromiseOrValue<BytesLike>;
        account: PromiseOrValue<string>;
        typeLimit: PromiseOrValue<BigNumberish>;
        factoryLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type MemberRegisterStructOutput = [
        string,
        string,
        number,
        number,
        number,
        number
    ] & {
        roleId: string;
        account: string;
        typeLimit: number;
        factoryLimit: number;
        acstat: number;
        alstat: number;
    };
    type MemberUpdateFactoryLimitRequestStruct = {
        memberId: PromiseOrValue<BytesLike>;
        factoryLimit: PromiseOrValue<BigNumberish>;
    };
    type MemberUpdateFactoryLimitRequestStructOutput = [string, number] & {
        memberId: string;
        factoryLimit: number;
    };
    type MemberUpdateTypeLimitRequestStruct = {
        memberId: PromiseOrValue<BytesLike>;
        typeLimit: PromiseOrValue<BigNumberish>;
    };
    type MemberUpdateTypeLimitRequestStructOutput = [string, number] & {
        memberId: string;
        typeLimit: number;
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
}
export interface IMemberManagementInterface extends utils.Interface {
    functions: {
        "memberCheckId(bytes32)": FunctionFragment;
        "memberGetInfo(bytes32)": FunctionFragment;
        "memberGetTypes(bytes32)": FunctionFragment;
        "memberHasType(bytes32,bytes32)": FunctionFragment;
        "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])": FunctionFragment;
        "memberUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "memberUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "memberUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "memberUpdateFactoryLimit((bytes32,uint16)[])": FunctionFragment;
        "memberUpdateTypeLimit((bytes32,uint16)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "memberCheckId" | "memberCheckId(bytes32)" | "memberGetInfo" | "memberGetInfo(bytes32)" | "memberGetTypes" | "memberGetTypes(bytes32)" | "memberHasType" | "memberHasType(bytes32,bytes32)" | "memberRegister" | "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])" | "memberUpdateActivityStatus" | "memberUpdateActivityStatus((bytes32,uint8)[])" | "memberUpdateAdmin" | "memberUpdateAdmin((bytes32,bytes32)[])" | "memberUpdateAlterabilityStatus" | "memberUpdateAlterabilityStatus((bytes32,uint8)[])" | "memberUpdateFactoryLimit" | "memberUpdateFactoryLimit((bytes32,uint16)[])" | "memberUpdateTypeLimit" | "memberUpdateTypeLimit((bytes32,uint16)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "memberCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberGetTypes", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberGetTypes(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberHasType", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberHasType(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "memberRegister", values: [IMemberManagement.MemberRegisterStruct[]]): string;
    encodeFunctionData(functionFragment: "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])", values: [IMemberManagement.MemberRegisterStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateFactoryLimit", values: [IMemberManagement.MemberUpdateFactoryLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateFactoryLimit((bytes32,uint16)[])", values: [IMemberManagement.MemberUpdateFactoryLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateTypeLimit", values: [IMemberManagement.MemberUpdateTypeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "memberUpdateTypeLimit((bytes32,uint16)[])", values: [IMemberManagement.MemberUpdateTypeLimitRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "memberCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberGetTypes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberGetTypes(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberHasType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberHasType(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateFactoryLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateFactoryLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateTypeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "memberUpdateTypeLimit((bytes32,uint16)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "MemberActivityUpdated(address,bytes32,uint8)": EventFragment;
        "MemberAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "MemberAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "MemberFactoryLimitUpdated(address,bytes32,uint16)": EventFragment;
        "MemberRegistered(address,bytes32,address,bytes32)": EventFragment;
        "MemberTypeLimitUpdated(address,bytes32,uint16)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberFactoryLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberFactoryLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberRegistered(address,bytes32,address,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberTypeLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MemberTypeLimitUpdated(address,bytes32,uint16)"): EventFragment;
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
export interface MemberActivityUpdatedEventObject {
    sender: string;
    memberId: string;
    acstat: number;
}
export declare type MemberActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], MemberActivityUpdatedEventObject>;
export declare type MemberActivityUpdatedEventFilter = TypedEventFilter<MemberActivityUpdatedEvent>;
export interface MemberAdminUpdatedEventObject {
    sender: string;
    memberId: string;
    adminId: string;
}
export declare type MemberAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], MemberAdminUpdatedEventObject>;
export declare type MemberAdminUpdatedEventFilter = TypedEventFilter<MemberAdminUpdatedEvent>;
export interface MemberAlterabilityUpdatedEventObject {
    sender: string;
    memberId: string;
    alstat: number;
}
export declare type MemberAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], MemberAlterabilityUpdatedEventObject>;
export declare type MemberAlterabilityUpdatedEventFilter = TypedEventFilter<MemberAlterabilityUpdatedEvent>;
export interface MemberFactoryLimitUpdatedEventObject {
    sender: string;
    memberId: string;
    factoryLimit: number;
}
export declare type MemberFactoryLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], MemberFactoryLimitUpdatedEventObject>;
export declare type MemberFactoryLimitUpdatedEventFilter = TypedEventFilter<MemberFactoryLimitUpdatedEvent>;
export interface MemberRegisteredEventObject {
    sender: string;
    memberId: string;
    account: string;
    roleId: string;
}
export declare type MemberRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], MemberRegisteredEventObject>;
export declare type MemberRegisteredEventFilter = TypedEventFilter<MemberRegisteredEvent>;
export interface MemberTypeLimitUpdatedEventObject {
    sender: string;
    memberId: string;
    typeLimit: number;
}
export declare type MemberTypeLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], MemberTypeLimitUpdatedEventObject>;
export declare type MemberTypeLimitUpdatedEventFilter = TypedEventFilter<MemberTypeLimitUpdatedEvent>;
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
export interface IMemberManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMemberManagementInterface;
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
        memberCheckId(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "memberCheckId(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        memberGetInfo(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IMemberManagement.MemberInfoStructOutput]>;
        "memberGetInfo(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IMemberManagement.MemberInfoStructOutput]>;
        memberGetTypes(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "memberGetTypes(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        memberHasType(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "memberHasType(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        memberRegister(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])"(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        memberUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        memberUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        memberUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        memberUpdateFactoryLimit(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberUpdateFactoryLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        memberUpdateTypeLimit(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "memberUpdateTypeLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    memberCheckId(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "memberCheckId(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    memberGetInfo(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IMemberManagement.MemberInfoStructOutput>;
    "memberGetInfo(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IMemberManagement.MemberInfoStructOutput>;
    memberGetTypes(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "memberGetTypes(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    memberHasType(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "memberHasType(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    memberRegister(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])"(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    memberUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    memberUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    memberUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    memberUpdateFactoryLimit(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberUpdateFactoryLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    memberUpdateTypeLimit(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "memberUpdateTypeLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        memberCheckId(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "memberCheckId(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        memberGetInfo(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IMemberManagement.MemberInfoStructOutput>;
        "memberGetInfo(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IMemberManagement.MemberInfoStructOutput>;
        memberGetTypes(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "memberGetTypes(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        memberHasType(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "memberHasType(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        memberRegister(requests: IMemberManagement.MemberRegisterStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])"(requests: IMemberManagement.MemberRegisterStruct[], overrides?: CallOverrides): Promise<boolean>;
        memberUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        memberUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        memberUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        memberUpdateFactoryLimit(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberUpdateFactoryLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        memberUpdateTypeLimit(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "memberUpdateTypeLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "MemberActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, acstat?: null): MemberActivityUpdatedEventFilter;
        MemberActivityUpdated(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, acstat?: null): MemberActivityUpdatedEventFilter;
        "MemberAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): MemberAdminUpdatedEventFilter;
        MemberAdminUpdated(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): MemberAdminUpdatedEventFilter;
        "MemberAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, alstat?: null): MemberAlterabilityUpdatedEventFilter;
        MemberAlterabilityUpdated(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, alstat?: null): MemberAlterabilityUpdatedEventFilter;
        "MemberFactoryLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, factoryLimit?: null): MemberFactoryLimitUpdatedEventFilter;
        MemberFactoryLimitUpdated(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, factoryLimit?: null): MemberFactoryLimitUpdatedEventFilter;
        "MemberRegistered(address,bytes32,address,bytes32)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, roleId?: null): MemberRegisteredEventFilter;
        MemberRegistered(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, roleId?: null): MemberRegisteredEventFilter;
        "MemberTypeLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, typeLimit?: null): MemberTypeLimitUpdatedEventFilter;
        MemberTypeLimitUpdated(sender?: PromiseOrValue<string> | null, memberId?: PromiseOrValue<BytesLike> | null, typeLimit?: null): MemberTypeLimitUpdatedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        memberCheckId(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "memberCheckId(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        memberGetInfo(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "memberGetInfo(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        memberGetTypes(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "memberGetTypes(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        memberHasType(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "memberHasType(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        memberRegister(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])"(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        memberUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        memberUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        memberUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        memberUpdateFactoryLimit(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberUpdateFactoryLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        memberUpdateTypeLimit(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "memberUpdateTypeLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        memberCheckId(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "memberCheckId(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        memberGetInfo(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "memberGetInfo(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        memberGetTypes(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "memberGetTypes(bytes32)"(memberId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        memberHasType(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "memberHasType(bytes32,bytes32)"(memberId: PromiseOrValue<BytesLike>, typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        memberRegister(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberRegister((bytes32,address,uint16,uint16,uint8,uint8)[])"(requests: IMemberManagement.MemberRegisterStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        memberUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        memberUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        memberUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        memberUpdateFactoryLimit(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberUpdateFactoryLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateFactoryLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        memberUpdateTypeLimit(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "memberUpdateTypeLimit((bytes32,uint16)[])"(requests: IMemberManagement.MemberUpdateTypeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
