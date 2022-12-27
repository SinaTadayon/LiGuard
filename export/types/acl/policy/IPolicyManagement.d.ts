import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IPolicyManagement {
    type PolicyAddRolesRequestStruct = {
        policyId: PromiseOrValue<BytesLike>;
        roles: PromiseOrValue<BytesLike>[];
    };
    type PolicyAddRolesRequestStructOutput = [string, string[]] & {
        policyId: string;
        roles: string[];
    };
    type PolicyInfoStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        name: PromiseOrValue<string>;
        roleLimit: PromiseOrValue<BigNumberish>;
        roleTotal: PromiseOrValue<BigNumberish>;
        policyCode: PromiseOrValue<BigNumberish>;
        adminType: PromiseOrValue<BigNumberish>;
        ptype: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
    };
    type PolicyInfoStructOutput = [
        string,
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
        adminId: string;
        scopeId: string;
        name: string;
        roleLimit: number;
        roleTotal: number;
        policyCode: number;
        adminType: number;
        ptype: number;
        acstat: number;
        alstat: number;
    };
    type PolicyRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
        policyCode: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type PolicyRegisterRequestStructOutput = [
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
        policyCode: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type PolicyRemoveRolesRequestStruct = {
        policyId: PromiseOrValue<BytesLike>;
        roles: PromiseOrValue<BytesLike>[];
    };
    type PolicyRemoveRolesRequestStructOutput = [string, string[]] & {
        policyId: string;
        roles: string[];
    };
    type PolicyUpdateCodeRequestStruct = {
        policyId: PromiseOrValue<BytesLike>;
        policyCode: PromiseOrValue<BigNumberish>;
    };
    type PolicyUpdateCodeRequestStructOutput = [string, number] & {
        policyId: string;
        policyCode: number;
    };
    type PolicyUpdateRoleLimitRequestStruct = {
        policyId: PromiseOrValue<BytesLike>;
        roleLimit: PromiseOrValue<BigNumberish>;
    };
    type PolicyUpdateRoleLimitRequestStructOutput = [string, number] & {
        policyId: string;
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
}
export interface IPolicyManagementInterface extends utils.Interface {
    functions: {
        "policyAddRoles((bytes32,bytes32[])[])": FunctionFragment;
        "policyCheckAccess(bytes32,bytes32)": FunctionFragment;
        "policyCheckAdmin(bytes32,address)": FunctionFragment;
        "policyCheckId(bytes32)": FunctionFragment;
        "policyCheckName(string)": FunctionFragment;
        "policyCheckRoleAccess(bytes32,bytes32)": FunctionFragment;
        "policyDeleteActivity(bytes32[])": FunctionFragment;
        "policyGetInfo(bytes32)": FunctionFragment;
        "policyGetInfoByRole(bytes32)": FunctionFragment;
        "policyGetRoles(bytes32)": FunctionFragment;
        "policyHasRole(bytes32)": FunctionFragment;
        "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])": FunctionFragment;
        "policyRemoveRoles((bytes32,bytes32[])[])": FunctionFragment;
        "policyUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "policyUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "policyUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "policyUpdateCodes((bytes32,uint8)[])": FunctionFragment;
        "policyUpdatesRoleLimit((bytes32,uint32)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "policyAddRoles" | "policyAddRoles((bytes32,bytes32[])[])" | "policyCheckAccess" | "policyCheckAccess(bytes32,bytes32)" | "policyCheckAdmin" | "policyCheckAdmin(bytes32,address)" | "policyCheckId" | "policyCheckId(bytes32)" | "policyCheckName" | "policyCheckName(string)" | "policyCheckRoleAccess" | "policyCheckRoleAccess(bytes32,bytes32)" | "policyDeleteActivity" | "policyDeleteActivity(bytes32[])" | "policyGetInfo" | "policyGetInfo(bytes32)" | "policyGetInfoByRole" | "policyGetInfoByRole(bytes32)" | "policyGetRoles" | "policyGetRoles(bytes32)" | "policyHasRole" | "policyHasRole(bytes32)" | "policyRegister" | "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])" | "policyRemoveRoles" | "policyRemoveRoles((bytes32,bytes32[])[])" | "policyUpdateActivityStatus" | "policyUpdateActivityStatus((bytes32,uint8)[])" | "policyUpdateAdmin" | "policyUpdateAdmin((bytes32,bytes32)[])" | "policyUpdateAlterabilityStatus" | "policyUpdateAlterabilityStatus((bytes32,uint8)[])" | "policyUpdateCodes" | "policyUpdateCodes((bytes32,uint8)[])" | "policyUpdatesRoleLimit" | "policyUpdatesRoleLimit((bytes32,uint32)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "policyAddRoles", values: [IPolicyManagement.PolicyAddRolesRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyAddRoles((bytes32,bytes32[])[])", values: [IPolicyManagement.PolicyAddRolesRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyCheckAccess", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyCheckAccess(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "policyCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "policyCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "policyCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "policyCheckRoleAccess", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyCheckRoleAccess(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "policyDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "policyGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyGetInfoByRole", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyGetInfoByRole(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyGetRoles", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyGetRoles(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyHasRole", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyHasRole(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "policyRegister", values: [IPolicyManagement.PolicyRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])", values: [IPolicyManagement.PolicyRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyRemoveRoles", values: [IPolicyManagement.PolicyRemoveRolesRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyRemoveRoles((bytes32,bytes32[])[])", values: [IPolicyManagement.PolicyRemoveRolesRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateCodes", values: [IPolicyManagement.PolicyUpdateCodeRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdateCodes((bytes32,uint8)[])", values: [IPolicyManagement.PolicyUpdateCodeRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdatesRoleLimit", values: [IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "policyUpdatesRoleLimit((bytes32,uint32)[])", values: [IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "policyAddRoles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyAddRoles((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckAccess(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckRoleAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyCheckRoleAccess(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetInfoByRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetInfoByRole(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetRoles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyGetRoles(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyHasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyHasRole(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyRemoveRoles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyRemoveRoles((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateCodes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdateCodes((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdatesRoleLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "policyUpdatesRoleLimit((bytes32,uint32)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "PolicyActivityUpdated(address,bytes32,uint8)": EventFragment;
        "PolicyAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "PolicyAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "PolicyCodeUpdated(address,bytes32,uint8,uint8)": EventFragment;
        "PolicyRegistered(address,bytes32,bytes32,bytes32,uint8)": EventFragment;
        "PolicyRoleAdded(address,bytes32,bytes32)": EventFragment;
        "PolicyRoleLimitUpdated(address,bytes32,uint32)": EventFragment;
        "PolicyRoleRemoved(address,bytes32,bytes32)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyCodeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyCodeUpdated(address,bytes32,uint8,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRegistered(address,bytes32,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleAdded(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleLimitUpdated(address,bytes32,uint32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PolicyRoleRemoved(address,bytes32,bytes32)"): EventFragment;
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
export interface PolicyActivityUpdatedEventObject {
    sender: string;
    policyId: string;
    acstat: number;
}
export declare type PolicyActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], PolicyActivityUpdatedEventObject>;
export declare type PolicyActivityUpdatedEventFilter = TypedEventFilter<PolicyActivityUpdatedEvent>;
export interface PolicyAdminUpdatedEventObject {
    sender: string;
    policyId: string;
    adminId: string;
}
export declare type PolicyAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], PolicyAdminUpdatedEventObject>;
export declare type PolicyAdminUpdatedEventFilter = TypedEventFilter<PolicyAdminUpdatedEvent>;
export interface PolicyAlterabilityUpdatedEventObject {
    sender: string;
    policyId: string;
    alstat: number;
}
export declare type PolicyAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], PolicyAlterabilityUpdatedEventObject>;
export declare type PolicyAlterabilityUpdatedEventFilter = TypedEventFilter<PolicyAlterabilityUpdatedEvent>;
export interface PolicyCodeUpdatedEventObject {
    sender: string;
    policyId: string;
    code: number;
    ptype: number;
}
export declare type PolicyCodeUpdatedEvent = TypedEvent<[
    string,
    string,
    number,
    number
], PolicyCodeUpdatedEventObject>;
export declare type PolicyCodeUpdatedEventFilter = TypedEventFilter<PolicyCodeUpdatedEvent>;
export interface PolicyRegisteredEventObject {
    sender: string;
    policyId: string;
    scopeId: string;
    adminId: string;
    policyCode: number;
}
export declare type PolicyRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    number
], PolicyRegisteredEventObject>;
export declare type PolicyRegisteredEventFilter = TypedEventFilter<PolicyRegisteredEvent>;
export interface PolicyRoleAddedEventObject {
    sender: string;
    policyId: string;
    roleId: string;
}
export declare type PolicyRoleAddedEvent = TypedEvent<[
    string,
    string,
    string
], PolicyRoleAddedEventObject>;
export declare type PolicyRoleAddedEventFilter = TypedEventFilter<PolicyRoleAddedEvent>;
export interface PolicyRoleLimitUpdatedEventObject {
    sender: string;
    policyId: string;
    roleLimit: number;
}
export declare type PolicyRoleLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], PolicyRoleLimitUpdatedEventObject>;
export declare type PolicyRoleLimitUpdatedEventFilter = TypedEventFilter<PolicyRoleLimitUpdatedEvent>;
export interface PolicyRoleRemovedEventObject {
    sender: string;
    policyId: string;
    roleId: string;
}
export declare type PolicyRoleRemovedEvent = TypedEvent<[
    string,
    string,
    string
], PolicyRoleRemovedEventObject>;
export declare type PolicyRoleRemovedEventFilter = TypedEventFilter<PolicyRoleRemovedEvent>;
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
export interface IPolicyManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPolicyManagementInterface;
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
        policyAddRoles(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyAddRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyCheckAccess(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyCheckAccess(bytes32,bytes32)"(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        policyCheckAdmin(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyCheckAdmin(bytes32,address)"(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        policyCheckId(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyCheckId(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        policyCheckName(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyCheckName(string)"(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        policyCheckRoleAccess(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyCheckRoleAccess(bytes32,bytes32)"(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        policyDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyGetInfo(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IPolicyManagement.PolicyInfoStructOutput]>;
        "policyGetInfo(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IPolicyManagement.PolicyInfoStructOutput]>;
        policyGetInfoByRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IPolicyManagement.PolicyInfoStructOutput]>;
        "policyGetInfoByRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IPolicyManagement.PolicyInfoStructOutput]>;
        policyGetRoles(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "policyGetRoles(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        policyHasRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "policyHasRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        policyRegister(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])"(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyRemoveRoles(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyRemoveRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyUpdateCodes(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyUpdateCodes((bytes32,uint8)[])"(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        policyUpdatesRoleLimit(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "policyUpdatesRoleLimit((bytes32,uint32)[])"(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    policyAddRoles(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyAddRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyCheckAccess(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "policyCheckAccess(bytes32,bytes32)"(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    policyCheckAdmin(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "policyCheckAdmin(bytes32,address)"(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    policyCheckId(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "policyCheckId(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    policyCheckName(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "policyCheckName(string)"(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    policyCheckRoleAccess(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "policyCheckRoleAccess(bytes32,bytes32)"(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    policyDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyGetInfo(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
    "policyGetInfo(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
    policyGetInfoByRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
    "policyGetInfoByRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
    policyGetRoles(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "policyGetRoles(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    policyHasRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "policyHasRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    policyRegister(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])"(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyRemoveRoles(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyRemoveRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyUpdateCodes(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyUpdateCodes((bytes32,uint8)[])"(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    policyUpdatesRoleLimit(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "policyUpdatesRoleLimit((bytes32,uint32)[])"(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        policyAddRoles(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyAddRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyCheckAccess(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "policyCheckAccess(bytes32,bytes32)"(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        policyCheckAdmin(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "policyCheckAdmin(bytes32,address)"(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        policyCheckId(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "policyCheckId(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        policyCheckName(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "policyCheckName(string)"(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        policyCheckRoleAccess(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "policyCheckRoleAccess(bytes32,bytes32)"(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        policyDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "policyDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        policyGetInfo(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
        "policyGetInfo(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
        policyGetInfoByRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
        "policyGetInfoByRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IPolicyManagement.PolicyInfoStructOutput>;
        policyGetRoles(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "policyGetRoles(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        policyHasRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "policyHasRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        policyRegister(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])"(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyRemoveRoles(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyRemoveRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyUpdateCodes(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyUpdateCodes((bytes32,uint8)[])"(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        policyUpdatesRoleLimit(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "policyUpdatesRoleLimit((bytes32,uint32)[])"(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "PolicyActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, acstat?: null): PolicyActivityUpdatedEventFilter;
        PolicyActivityUpdated(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, acstat?: null): PolicyActivityUpdatedEventFilter;
        "PolicyAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): PolicyAdminUpdatedEventFilter;
        PolicyAdminUpdated(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): PolicyAdminUpdatedEventFilter;
        "PolicyAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, alstat?: null): PolicyAlterabilityUpdatedEventFilter;
        PolicyAlterabilityUpdated(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, alstat?: null): PolicyAlterabilityUpdatedEventFilter;
        "PolicyCodeUpdated(address,bytes32,uint8,uint8)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, code?: null, ptype?: null): PolicyCodeUpdatedEventFilter;
        PolicyCodeUpdated(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, code?: null, ptype?: null): PolicyCodeUpdatedEventFilter;
        "PolicyRegistered(address,bytes32,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null, policyCode?: null): PolicyRegisteredEventFilter;
        PolicyRegistered(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, adminId?: null, policyCode?: null): PolicyRegisteredEventFilter;
        "PolicyRoleAdded(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleId?: PromiseOrValue<BytesLike> | null): PolicyRoleAddedEventFilter;
        PolicyRoleAdded(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleId?: PromiseOrValue<BytesLike> | null): PolicyRoleAddedEventFilter;
        "PolicyRoleLimitUpdated(address,bytes32,uint32)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): PolicyRoleLimitUpdatedEventFilter;
        PolicyRoleLimitUpdated(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleLimit?: null): PolicyRoleLimitUpdatedEventFilter;
        "PolicyRoleRemoved(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleId?: PromiseOrValue<BytesLike> | null): PolicyRoleRemovedEventFilter;
        PolicyRoleRemoved(sender?: PromiseOrValue<string> | null, policyId?: PromiseOrValue<BytesLike> | null, roleId?: PromiseOrValue<BytesLike> | null): PolicyRoleRemovedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        policyAddRoles(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyAddRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyCheckAccess(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyCheckAccess(bytes32,bytes32)"(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyCheckAdmin(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyCheckAdmin(bytes32,address)"(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        policyCheckId(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyCheckId(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyCheckName(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyCheckName(string)"(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        policyCheckRoleAccess(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyCheckRoleAccess(bytes32,bytes32)"(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyGetInfo(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyGetInfo(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyGetInfoByRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyGetInfoByRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyGetRoles(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyGetRoles(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyHasRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "policyHasRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        policyRegister(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])"(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyRemoveRoles(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyRemoveRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyUpdateCodes(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyUpdateCodes((bytes32,uint8)[])"(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        policyUpdatesRoleLimit(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "policyUpdatesRoleLimit((bytes32,uint32)[])"(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        policyAddRoles(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyAddRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyAddRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyCheckAccess(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyCheckAccess(bytes32,bytes32)"(policyId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyCheckAdmin(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyCheckAdmin(bytes32,address)"(policyId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyCheckId(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyCheckId(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyCheckName(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyCheckName(string)"(policyName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyCheckRoleAccess(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyCheckRoleAccess(bytes32,bytes32)"(roleId: PromiseOrValue<BytesLike>, functionId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyGetInfo(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyGetInfo(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyGetInfoByRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyGetInfoByRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyGetRoles(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyGetRoles(bytes32)"(policyId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyHasRole(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "policyHasRole(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        policyRegister(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyRegister((bytes32,bytes32,uint32,uint8,uint8,uint8,string)[])"(requests: IPolicyManagement.PolicyRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyRemoveRoles(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyRemoveRoles((bytes32,bytes32[])[])"(requests: IPolicyManagement.PolicyRemoveRolesRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyUpdateCodes(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyUpdateCodes((bytes32,uint8)[])"(requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        policyUpdatesRoleLimit(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "policyUpdatesRoleLimit((bytes32,uint32)[])"(requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
