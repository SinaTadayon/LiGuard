import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IRoleManagement {
    type RoleInfoStruct = {
        scopeId: PromiseOrValue<BytesLike>;
        typeId: PromiseOrValue<BytesLike>;
        adminId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
        memberTotal: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        referredByScope: PromiseOrValue<BigNumberish>;
        referredByPolicy: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RoleInfoStructOutput = [
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
        string
    ] & {
        scopeId: string;
        typeId: string;
        adminId: string;
        memberLimit: number;
        memberTotal: number;
        scopeLimit: number;
        referredByScope: number;
        referredByPolicy: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type RoleGrantMembersRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        members: PromiseOrValue<BytesLike>[];
    };
    type RoleGrantMembersRequestStructOutput = [string, string[]] & {
        roleId: string;
        members: string[];
    };
    type RoleRegisterRequestStruct = {
        adminId: PromiseOrValue<BytesLike>;
        scopeId: PromiseOrValue<BytesLike>;
        typeId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
        scopeLimit: PromiseOrValue<BigNumberish>;
        acstat: PromiseOrValue<BigNumberish>;
        alstat: PromiseOrValue<BigNumberish>;
        name: PromiseOrValue<string>;
    };
    type RoleRegisterRequestStructOutput = [
        string,
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
        typeId: string;
        memberLimit: number;
        scopeLimit: number;
        acstat: number;
        alstat: number;
        name: string;
    };
    type RoleRevokeMembersRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        members: PromiseOrValue<BytesLike>[];
    };
    type RoleRevokeMembersRequestStructOutput = [string, string[]] & {
        roleId: string;
        members: string[];
    };
    type RoleUpdateMemberLimitRequestStruct = {
        roleId: PromiseOrValue<BytesLike>;
        memberLimit: PromiseOrValue<BigNumberish>;
    };
    type RoleUpdateMemberLimitRequestStructOutput = [string, number] & {
        roleId: string;
        memberLimit: number;
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
export interface IRoleManagementInterface extends utils.Interface {
    functions: {
        "roleCheckAdmin(bytes32,address)": FunctionFragment;
        "roleCheckId(bytes32)": FunctionFragment;
        "roleCheckName(string)": FunctionFragment;
        "roleDeleteActivity(bytes32[])": FunctionFragment;
        "roleGetInfo(bytes32)": FunctionFragment;
        "roleGrantMembers((bytes32,bytes32[])[])": FunctionFragment;
        "roleHasAccount(bytes32,address)": FunctionFragment;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])": FunctionFragment;
        "roleRevokeMembers((bytes32,bytes32[])[])": FunctionFragment;
        "roleUpdateActivityStatus((bytes32,uint8)[])": FunctionFragment;
        "roleUpdateAdmin((bytes32,bytes32)[])": FunctionFragment;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])": FunctionFragment;
        "roleUpdateMemberLimit((bytes32,uint32)[])": FunctionFragment;
        "roleUpdateScopeLimit((bytes32,uint16)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "roleCheckAdmin" | "roleCheckAdmin(bytes32,address)" | "roleCheckId" | "roleCheckId(bytes32)" | "roleCheckName" | "roleCheckName(string)" | "roleDeleteActivity" | "roleDeleteActivity(bytes32[])" | "roleGetInfo" | "roleGetInfo(bytes32)" | "roleGrantMembers" | "roleGrantMembers((bytes32,bytes32[])[])" | "roleHasAccount" | "roleHasAccount(bytes32,address)" | "roleRegister" | "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])" | "roleRevokeMembers" | "roleRevokeMembers((bytes32,bytes32[])[])" | "roleUpdateActivityStatus" | "roleUpdateActivityStatus((bytes32,uint8)[])" | "roleUpdateAdmin" | "roleUpdateAdmin((bytes32,bytes32)[])" | "roleUpdateAlterabilityStatus" | "roleUpdateAlterabilityStatus((bytes32,uint8)[])" | "roleUpdateMemberLimit" | "roleUpdateMemberLimit((bytes32,uint32)[])" | "roleUpdateScopeLimit" | "roleUpdateScopeLimit((bytes32,uint16)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "roleCheckAdmin", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckAdmin(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckId", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleCheckId(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleCheckName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleCheckName(string)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleDeleteActivity", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "roleDeleteActivity(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "roleGetInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleGetInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "roleGrantMembers", values: [IRoleManagement.RoleGrantMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleGrantMembers((bytes32,bytes32[])[])", values: [IRoleManagement.RoleGrantMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleHasAccount", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleHasAccount(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "roleRegister", values: [IRoleManagement.RoleRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", values: [IRoleManagement.RoleRegisterRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRevokeMembers", values: [IRoleManagement.RoleRevokeMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleRevokeMembers((bytes32,bytes32[])[])", values: [IRoleManagement.RoleRevokeMembersRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateActivityStatus", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateActivityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateActivityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAdmin", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAdmin((bytes32,bytes32)[])", values: [IACLCommons.UpdateAdminRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAlterabilityStatus", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateAlterabilityStatus((bytes32,uint8)[])", values: [IACLCommons.UpdateAlterabilityRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateMemberLimit", values: [IRoleManagement.RoleUpdateMemberLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateMemberLimit((bytes32,uint32)[])", values: [IRoleManagement.RoleUpdateMemberLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateScopeLimit", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "roleUpdateScopeLimit((bytes32,uint16)[])", values: [IACLCommons.AgentUpdateScopeLimitRequestStruct[]]): string;
    decodeFunctionResult(functionFragment: "roleCheckAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckAdmin(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckId(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleCheckName(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleDeleteActivity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleDeleteActivity(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGetInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGetInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGrantMembers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleGrantMembers((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleHasAccount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleHasAccount(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRevokeMembers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleRevokeMembers((bytes32,bytes32[])[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateActivityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateActivityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAdmin((bytes32,bytes32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAlterabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateAlterabilityStatus((bytes32,uint8)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateMemberLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateMemberLimit((bytes32,uint32)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateScopeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleUpdateScopeLimit((bytes32,uint16)[])", data: BytesLike): Result;
    events: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "RoleActivityUpdated(address,bytes32,uint8)": EventFragment;
        "RoleAdminUpdated(address,bytes32,bytes32)": EventFragment;
        "RoleAlterabilityUpdated(address,bytes32,uint8)": EventFragment;
        "RoleMemberGranted(address,bytes32,bytes32,bytes32)": EventFragment;
        "RoleMemberLimitUpdated(address,bytes32,uint32)": EventFragment;
        "RoleMemberRevoked(address,bytes32,bytes32,bytes32)": EventFragment;
        "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)": EventFragment;
        "RoleScopeLimitUpdated(address,bytes32,uint16)": EventFragment;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)": EventFragment;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleActivityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleActivityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminUpdated(address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAlterabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAlterabilityUpdated(address,bytes32,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberGranted(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberLimitUpdated(address,bytes32,uint32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleMemberRevoked(address,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleScopeLimitUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleScopeLimitUpdated(address,bytes32,uint16)"): EventFragment;
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
export interface RoleActivityUpdatedEventObject {
    sender: string;
    roleId: string;
    acstat: number;
}
export declare type RoleActivityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleActivityUpdatedEventObject>;
export declare type RoleActivityUpdatedEventFilter = TypedEventFilter<RoleActivityUpdatedEvent>;
export interface RoleAdminUpdatedEventObject {
    sender: string;
    roleId: string;
    adminId: string;
}
export declare type RoleAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminUpdatedEventObject>;
export declare type RoleAdminUpdatedEventFilter = TypedEventFilter<RoleAdminUpdatedEvent>;
export interface RoleAlterabilityUpdatedEventObject {
    sender: string;
    roleId: string;
    alstat: number;
}
export declare type RoleAlterabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleAlterabilityUpdatedEventObject>;
export declare type RoleAlterabilityUpdatedEventFilter = TypedEventFilter<RoleAlterabilityUpdatedEvent>;
export interface RoleMemberGrantedEventObject {
    sender: string;
    roleId: string;
    memberId: string;
    typeId: string;
}
export declare type RoleMemberGrantedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], RoleMemberGrantedEventObject>;
export declare type RoleMemberGrantedEventFilter = TypedEventFilter<RoleMemberGrantedEvent>;
export interface RoleMemberLimitUpdatedEventObject {
    sender: string;
    roleId: string;
    memberLimit: number;
}
export declare type RoleMemberLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleMemberLimitUpdatedEventObject>;
export declare type RoleMemberLimitUpdatedEventFilter = TypedEventFilter<RoleMemberLimitUpdatedEvent>;
export interface RoleMemberRevokedEventObject {
    sender: string;
    roleId: string;
    memberId: string;
    typeId: string;
}
export declare type RoleMemberRevokedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], RoleMemberRevokedEventObject>;
export declare type RoleMemberRevokedEventFilter = TypedEventFilter<RoleMemberRevokedEvent>;
export interface RoleRegisteredEventObject {
    sender: string;
    roleId: string;
    typeId: string;
    adminId: string;
    scopeId: string;
}
export declare type RoleRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], RoleRegisteredEventObject>;
export declare type RoleRegisteredEventFilter = TypedEventFilter<RoleRegisteredEvent>;
export interface RoleScopeLimitUpdatedEventObject {
    sender: string;
    roleId: string;
    scopeLimit: number;
}
export declare type RoleScopeLimitUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], RoleScopeLimitUpdatedEventObject>;
export declare type RoleScopeLimitUpdatedEventFilter = TypedEventFilter<RoleScopeLimitUpdatedEvent>;
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
export interface IRoleManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRoleManagementInterface;
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
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRoleManagement.RoleInfoStructOutput]>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IRoleManagement.RoleInfoStructOutput]>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
    "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
    roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<boolean>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IRoleManagement.RoleInfoStructOutput>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AgentReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        AgentReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByPolicyUpdatedEventFilter;
        "AgentReferredByScopeUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        AgentReferredByScopeUpdated(sender?: PromiseOrValue<string> | null, agentId?: PromiseOrValue<BytesLike> | null, scopeId?: PromiseOrValue<BytesLike> | null, action?: null): AgentReferredByScopeUpdatedEventFilter;
        "RoleActivityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, acstat?: null): RoleActivityUpdatedEventFilter;
        RoleActivityUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, acstat?: null): RoleActivityUpdatedEventFilter;
        "RoleAdminUpdated(address,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RoleAdminUpdatedEventFilter;
        RoleAdminUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, adminId?: PromiseOrValue<BytesLike> | null): RoleAdminUpdatedEventFilter;
        "RoleAlterabilityUpdated(address,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, alstat?: null): RoleAlterabilityUpdatedEventFilter;
        RoleAlterabilityUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, alstat?: null): RoleAlterabilityUpdatedEventFilter;
        "RoleMemberGranted(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberGrantedEventFilter;
        RoleMemberGranted(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberGrantedEventFilter;
        "RoleMemberLimitUpdated(address,bytes32,uint32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberLimit?: null): RoleMemberLimitUpdatedEventFilter;
        RoleMemberLimitUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberLimit?: null): RoleMemberLimitUpdatedEventFilter;
        "RoleMemberRevoked(address,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberRevokedEventFilter;
        RoleMemberRevoked(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, memberId?: PromiseOrValue<BytesLike> | null, typeId?: null): RoleMemberRevokedEventFilter;
        "RoleRegistered(address,bytes32,bytes32,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: null, scopeId?: null): RoleRegisteredEventFilter;
        RoleRegistered(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, typeId?: PromiseOrValue<BytesLike> | null, adminId?: null, scopeId?: null): RoleRegisteredEventFilter;
        "RoleScopeLimitUpdated(address,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): RoleScopeLimitUpdatedEventFilter;
        RoleScopeLimitUpdated(sender?: PromiseOrValue<string> | null, roleId?: PromiseOrValue<BytesLike> | null, scopeLimit?: null): RoleScopeLimitUpdatedEventFilter;
        "ScopeReferredByAgentUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        ScopeReferredByAgentUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, agentId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByAgentUpdatedEventFilter;
        "ScopeReferredByPolicyUpdated(address,bytes32,bytes32,uint8)"(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
        ScopeReferredByPolicyUpdated(sender?: PromiseOrValue<string> | null, scopeId?: PromiseOrValue<BytesLike> | null, policyId?: PromiseOrValue<BytesLike> | null, action?: null): ScopeReferredByPolicyUpdatedEventFilter;
    };
    estimateGas: {
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        roleCheckAdmin(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckAdmin(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleCheckId(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckId(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleCheckName(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleCheckName(string)"(roleName: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleDeleteActivity(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleDeleteActivity(bytes32[])"(requests: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleGetInfo(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleGetInfo(bytes32)"(roleId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleGrantMembers(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleGrantMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleGrantMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleHasAccount(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "roleHasAccount(bytes32,address)"(roleId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleRegister(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleRegister((bytes32,bytes32,bytes32,uint32,uint16,uint8,uint8,string)[])"(requests: IRoleManagement.RoleRegisterRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleRevokeMembers(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleRevokeMembers((bytes32,bytes32[])[])"(requests: IRoleManagement.RoleRevokeMembersRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateActivityStatus(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateActivityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateActivityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateAdmin(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateAdmin((bytes32,bytes32)[])"(requests: IACLCommons.UpdateAdminRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateAlterabilityStatus(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateAlterabilityStatus((bytes32,uint8)[])"(requests: IACLCommons.UpdateAlterabilityRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateMemberLimit(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateMemberLimit((bytes32,uint32)[])"(requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        roleUpdateScopeLimit(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "roleUpdateScopeLimit((bytes32,uint16)[])"(requests: IACLCommons.AgentUpdateScopeLimitRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
