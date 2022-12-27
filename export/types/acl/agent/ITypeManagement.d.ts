import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace ITypeManagement {
    type TypeInfoStruct = {
        scopeId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
        roleTotal: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        referredByScope: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type TypeInfoStructOutput = [
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
        scopeId: string;
        adminId: string;
        roleLimit: number;
        roleTotal: number;
        scopeLimit: number;
        referredByScope: number;
        referredByPolicy: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type TypeRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type TypeRegisterRequestStructOutput = [
        string,
        string,
        number,
        number,
        number,
        number,
        string
    ] & {
        adminId: string;
        scopeId: string;
        roleLimit: number;
        scopeLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type TypeUpdateRoleLimitRequestStruct = {
        typeId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
    };
    type TypeUpdateRoleLimitRequestStructOutput = [string, number] & {
        typeId: string;
        roleLimit: number;
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
    type AgentUpdateScopeLimitRequestStruct = {
        agentId: PromiseOrValue<BytesLike>;
        scopeLimit: PromiseOrValue<BigNumberish>;
    };
    type AgentUpdateScopeLimitRequestStructOutput = [string, number] & {
        agentId: string;
        scopeLimit: number;
    };
}
export interface ITypeManagementInterface extends utils.Interface {
    functions: {
        "typeCheckAdmin(bytes32,address)": FunctionFragment;
        "typeCheckId(bytes32)": FunctionFragment;
        "typeCheckName(string)": FunctionFragment;
        "typeDeleteActivity(bytes32[])": FunctionFragment;
        "typeGetInfo(bytes32)": FunctionFragment;
        "typeGetRoles(bytes32)": FunctionFragment;
        "typeHasAccount(bytes32,address)": FunctionFragment;
        "typeHasRole(bytes32,bytes32)": FunctionFragment;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])": FunctionFragment;
        "typeUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "typeUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "typeUpdateRoleLimit((bytes32,uint16)[])": FunctionFragment;
        "typeUpdateScopeLimit((bytes32,uint16)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "typeCheckAdmin" | "typeCheckAdmin(bytes32,address)" | "typeCheckId" | "typeCheckId(bytes32)" | "typeCheckName" | "typeCheckName(string)" | "typeDeleteActivity" | "typeDeleteActivity(bytes32[])" | "typeGetInfo" | "typeGetInfo(bytes32)" | "typeGetRoles" | "typeGetRoles(bytes32)" | "typeHasAccount" | "typeHasAccount(bytes32,address)" | "typeHasRole" | "typeHasRole(bytes32,bytes32)" | "typeRegister" | "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])" | "typeUpdateActivityStatus" | "typeUpdateActivityStatus((bytes32,uint8)[])" | "typeUpdateAdmin" | "typeUpdateAdmin((bytes32,bytes32)[])" | "typeUpdateAlterabilityStatus" | "typeUpdateAlterabilityStatus((bytes32,uint8)[])" | "typeUpdateRoleLimit" | "typeUpdateRoleLimit((bytes32,uint16)[])" | "typeUpdateScopeLimit" | "typeUpdateScopeLimit((bytes32,uint16)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "typeCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "typeDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "typeGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetRoles", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeGetRoles(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeHasAccount", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeHasAccount(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeHasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeHasRole(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "typeRegister", values: [ITypeManagement.TypeRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])", values: [ITypeManagement.TypeRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateRoleLimit", values: [ITypeManagement.TypeUpdateRoleLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateRoleLimit((bytes32,uint16)[])", values: [ITypeManagement.TypeUpdateRoleLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateScopeLimit", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "typeUpdateScopeLimit((bytes32,uint16)[])", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "typeCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetRoles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeGetRoles(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasAccount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasAccount(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeHasRole(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateRoleLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateRoleLimit((bytes32,uint16)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateScopeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeUpdateScopeLimit((bytes32,uint16)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "TypeActivityUpdated(address,bytes32,uint8)": EventFragment;
        "TypeAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "TypeAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "TypeRegistered(address,bytes32,bytes32,bytes32)": EventFragment;
        "TypeRoleLimitUpdated(address,bytes32,uint16)": EventFragment;
        "TypeScopeLimitUpdated(address,bytes32,uint16)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRegistered(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRoleLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeRoleLimitUpdated(address,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeScopeLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TypeScopeLimitUpdated(address,bytes32,uint16)"): EventFragment;
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
export interface TypeActivityUpdatedEventObject {
    sender: string;
    typeId: string;
    acstat: number;
}
export declare type TypeActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeActivityUpdatedEventObject>;
export declare type TypeActivityUpdatedEventFilter = TypedEventFilter<TypeActivityUpdatedEvent>;
export interface TypeAdminUpdatedEventObject {
    sender: string;
    typeId: string;
    adminId: string;
}
export declare type TypeAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], TypeAdminUpdatedEventObject>;
export declare type TypeAdminUpdatedEventFilter = TypedEventFilter<TypeAdminUpdatedEvent>;
export interface TypeAlterabilityUpdatedEventObject {
    sender: string;
    typeId: string;
    alstat: number;
}
export declare type TypeAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeAlterabilityUpdatedEventObject>;
export declare type TypeAlterabilityUpdatedEventFilter = TypedEventFilter<TypeAlterabilityUpdatedEvent>;
export interface TypeRegisteredEventObject {
    sender: string;
    typeId: string;
    scopeId: string;
    adminId: string;
}
export declare type TypeRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], TypeRegisteredEventObject>;
export declare type TypeRegisteredEventFilter = TypedEventFilter<TypeRegisteredEvent>;
export interface TypeRoleLimitUpdatedEventObject {
    sender: string;
    typeId: string;
    roleLimit: number;
}
export declare type TypeRoleLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeRoleLimitUpdatedEventObject>;
export declare type TypeRoleLimitUpdatedEventFilter = TypedEventFilter<TypeRoleLimitUpdatedEvent>;
export interface TypeScopeLimitUpdatedEventObject {
    sender: string;
    typeId: string;
    scopeLimit: number;
}
export declare type TypeScopeLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], TypeScopeLimitUpdatedEventObject>;
export declare type TypeScopeLimitUpdatedEventFilter = TypedEventFilter<TypeScopeLimitUpdatedEvent>;
export interface ITypeManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ITypeManagementInterface;
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
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[ITypeManagement.TypeInfoStructOutput]>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[ITypeManagement.TypeInfoStructOutput]>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
    "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
    typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<ITypeManagement.TypeInfoStructOutput>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
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
        "TypeActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, acstat?: null): TypeActivityUpdatedEventFilter;
        TypeActivityUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, acstat?: null): TypeActivityUpdatedEventFilter;
        "TypeAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): TypeAdminUpdatedEventFilter;
        TypeAdminUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): TypeAdminUpdatedEventFilter;
        "TypeAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, alstat?: null): TypeAlterabilityUpdatedEventFilter;
        TypeAlterabilityUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, alstat?: null): TypeAlterabilityUpdatedEventFilter;
        "TypeRegistered(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null): TypeRegisteredEventFilter;
        TypeRegistered(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null): TypeRegisteredEventFilter;
        "TypeRoleLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): TypeRoleLimitUpdatedEventFilter;
        TypeRoleLimitUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): TypeRoleLimitUpdatedEventFilter;
        "TypeScopeLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): TypeScopeLimitUpdatedEventFilter;
        TypeScopeLimitUpdated(sender?: PromiseOrValue<string> | null, typeId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): TypeScopeLimitUpdatedEventFilter;
    };
    estimateGas: {
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        typeCheckAdmin(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckAdmin(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeCheckId(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckId(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeCheckName(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeCheckName(string)"(typeName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeGetInfo(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeGetInfo(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeGetRoles(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeGetRoles(bytes32)"(typeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeHasAccount(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeHasAccount(bytes32,address)"(typeId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeHasRole(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "typeHasRole(bytes32,bytes32)"(typeId: PromiseOrValue<BytesLike>, roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeRegister(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeRegister((bytes32,bytes32,uint16,uint16,uint8,uint8,string)[])"(requests: ITypeManagement.TypeRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateRoleLimit(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateRoleLimit((bytes32,uint16)[])"(requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        typeUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "typeUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
