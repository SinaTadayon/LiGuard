import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace IContextManagement {
    type ResponseContextStruct = {
        name: PromiseOrValue<BytesLike>;
        version: PromiseOrValue<BytesLike>;
        realm: PromiseOrValue<BytesLike>;
        contractId: PromiseOrValue<string>;
        isSafeMode: PromiseOrValue<boolean>;
        isUpgradable: PromiseOrValue<boolean>;
    };
    type ResponseContextStructOutput = [
        string,
        string,
        string,
        string,
        boolean,
        boolean
    ] & {
        name: string;
        version: string;
        realm: string;
        contractId: string;
        isSafeMode: boolean;
        isUpgradable: boolean;
    };
    type RequestContextStruct = {
        name: PromiseOrValue<BytesLike>;
        version: PromiseOrValue<BytesLike>;
        realm: PromiseOrValue<BytesLike>;
        contractId: PromiseOrValue<string>;
        status: PromiseOrValue<boolean>;
    };
    type RequestContextStructOutput = [
        string,
        string,
        string,
        string,
        boolean
    ] & {
        name: string;
        version: string;
        realm: string;
        contractId: string;
        status: boolean;
    };
    type RequestRegisterContextStruct = {
        role: PromiseOrValue<BytesLike>;
        funcSelectors: PromiseOrValue<BytesLike>[];
        isEnabled: PromiseOrValue<boolean>;
    };
    type RequestRegisterContextStructOutput = [
        string,
        string[],
        boolean
    ] & {
        role: string;
        funcSelectors: string[];
        isEnabled: boolean;
    };
    type RequestPredictContextStruct = {
        name: PromiseOrValue<BytesLike>;
        version: PromiseOrValue<BytesLike>;
        realm: PromiseOrValue<BytesLike>;
        salt: PromiseOrValue<BytesLike>;
        subject: PromiseOrValue<string>;
        deployer: PromiseOrValue<string>;
        status: PromiseOrValue<boolean>;
    };
    type RequestPredictContextStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        boolean
    ] & {
        name: string;
        version: string;
        realm: string;
        salt: string;
        subject: string;
        deployer: string;
        status: boolean;
    };
    type RequestUpdateContextStruct = {
        role: PromiseOrValue<BytesLike>;
        funcSelectors: PromiseOrValue<BytesLike>[];
        updateStatus: PromiseOrValue<BigNumberish>;
    };
    type RequestUpdateContextStructOutput = [string, string[], number] & {
        role: string;
        funcSelectors: string[];
        updateStatus: number;
    };
}
export interface IContextManagementInterface extends utils.Interface {
    functions: {
        "addContextFuncRole(bytes32,bytes4,bytes32)": FunctionFragment;
        "getContextFuncs(bytes32)": FunctionFragment;
        "getContextInfo(bytes32)": FunctionFragment;
        "grantContextRole(bytes32,bytes4,bytes32)": FunctionFragment;
        "hasContextRole(bytes32,bytes32,bytes4)": FunctionFragment;
        "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])": FunctionFragment;
        "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])": FunctionFragment;
        "removeContextFunc(bytes32,bytes4)": FunctionFragment;
        "revokeContextRole(bytes32,bytes4,bytes32)": FunctionFragment;
        "setContextRealm(bytes32,bytes32)": FunctionFragment;
        "setContextStatus(bytes32,bool)": FunctionFragment;
        "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addContextFuncRole" | "addContextFuncRole(bytes32,bytes4,bytes32)" | "getContextFuncs" | "getContextFuncs(bytes32)" | "getContextInfo" | "getContextInfo(bytes32)" | "grantContextRole" | "grantContextRole(bytes32,bytes4,bytes32)" | "hasContextRole" | "hasContextRole(bytes32,bytes32,bytes4)" | "registerContext" | "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])" | "registerPredictContext" | "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])" | "removeContextFunc" | "removeContextFunc(bytes32,bytes4)" | "revokeContextRole" | "revokeContextRole(bytes32,bytes4,bytes32)" | "setContextRealm" | "setContextRealm(bytes32,bytes32)" | "setContextStatus" | "setContextStatus(bytes32,bool)" | "updateContext" | "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"): FunctionFragment;
    encodeFunctionData(functionFragment: "addContextFuncRole", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "addContextFuncRole(bytes32,bytes4,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "getContextFuncs", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getContextFuncs(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getContextInfo", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getContextInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "grantContextRole", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "grantContextRole(bytes32,bytes4,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasContextRole", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "hasContextRole(bytes32,bytes32,bytes4)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "registerContext", values: [
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestContextStruct,
        IContextManagement.RequestRegisterContextStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])", values: [
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestContextStruct,
        IContextManagement.RequestRegisterContextStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "registerPredictContext", values: [
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestPredictContextStruct,
        IContextManagement.RequestRegisterContextStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])", values: [
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestPredictContextStruct,
        IContextManagement.RequestRegisterContextStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "removeContextFunc", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "removeContextFunc(bytes32,bytes4)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "revokeContextRole", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "revokeContextRole(bytes32,bytes4,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setContextRealm", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setContextRealm(bytes32,bytes32)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setContextStatus", values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setContextStatus(bytes32,bool)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "updateContext", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestContextStruct,
        IContextManagement.RequestUpdateContextStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        IContextManagement.RequestContextStruct,
        IContextManagement.RequestUpdateContextStruct[]
    ]): string;
    decodeFunctionResult(functionFragment: "addContextFuncRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addContextFuncRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContextFuncs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContextFuncs(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContextInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContextInfo(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantContextRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantContextRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasContextRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasContextRole(bytes32,bytes32,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPredictContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeContextFunc", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeContextFunc(bytes32,bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeContextRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeContextRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContextRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContextRealm(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContextStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContextStatus(bytes32,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])", data: BytesLike): Result;
    events: {
        "ContextFuncRemoved(bytes32,address,bytes4,bytes32)": EventFragment;
        "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
        "ContextRealmChanged(bytes32,address,bytes32,bytes32)": EventFragment;
        "ContextRegistered(bytes32,address,address,address,bytes32)": EventFragment;
        "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
        "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
        "ContextStatusChanged(bytes32,address,bytes32,bool)": EventFragment;
        "ContextUpdated(bytes32,address,address,bytes32)": EventFragment;
        "PredictContextRegistered(bytes32,address,address,address,address,address,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ContextFuncRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextFuncRemoved(bytes32,address,bytes4,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextFuncRoleAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRealmChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRealmChanged(bytes32,address,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRegistered(bytes32,address,address,address,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextStatusChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextStatusChanged(bytes32,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContextUpdated(bytes32,address,address,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PredictContextRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PredictContextRegistered(bytes32,address,address,address,address,address,bytes32)"): EventFragment;
}
export interface ContextFuncRemovedEventObject {
    context: string;
    sender: string;
    functionSelector: string;
    realm: string;
}
export declare type ContextFuncRemovedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ContextFuncRemovedEventObject>;
export declare type ContextFuncRemovedEventFilter = TypedEventFilter<ContextFuncRemovedEvent>;
export interface ContextFuncRoleAddedEventObject {
    context: string;
    role: string;
    sender: string;
    functionSelector: string;
    realm: string;
}
export declare type ContextFuncRoleAddedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], ContextFuncRoleAddedEventObject>;
export declare type ContextFuncRoleAddedEventFilter = TypedEventFilter<ContextFuncRoleAddedEvent>;
export interface ContextRealmChangedEventObject {
    context: string;
    sender: string;
    realm: string;
    oldRealm: string;
}
export declare type ContextRealmChangedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ContextRealmChangedEventObject>;
export declare type ContextRealmChangedEventFilter = TypedEventFilter<ContextRealmChangedEvent>;
export interface ContextRegisteredEventObject {
    context: string;
    contractId: string;
    sender: string;
    signer: string;
    realm: string;
}
export declare type ContextRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], ContextRegisteredEventObject>;
export declare type ContextRegisteredEventFilter = TypedEventFilter<ContextRegisteredEvent>;
export interface ContextRoleGrantedEventObject {
    context: string;
    role: string;
    sender: string;
    functionSelector: string;
    realm: string;
}
export declare type ContextRoleGrantedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], ContextRoleGrantedEventObject>;
export declare type ContextRoleGrantedEventFilter = TypedEventFilter<ContextRoleGrantedEvent>;
export interface ContextRoleRevokedEventObject {
    context: string;
    role: string;
    sender: string;
    functionSelector: string;
    realm: string;
}
export declare type ContextRoleRevokedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], ContextRoleRevokedEventObject>;
export declare type ContextRoleRevokedEventFilter = TypedEventFilter<ContextRoleRevokedEvent>;
export interface ContextStatusChangedEventObject {
    context: string;
    sender: string;
    realm: string;
    status: boolean;
}
export declare type ContextStatusChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], ContextStatusChangedEventObject>;
export declare type ContextStatusChangedEventFilter = TypedEventFilter<ContextStatusChangedEvent>;
export interface ContextUpdatedEventObject {
    context: string;
    contractId: string;
    sender: string;
    realm: string;
}
export declare type ContextUpdatedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ContextUpdatedEventObject>;
export declare type ContextUpdatedEventFilter = TypedEventFilter<ContextUpdatedEvent>;
export interface PredictContextRegisteredEventObject {
    context: string;
    contractId: string;
    sender: string;
    signer: string;
    deployer: string;
    subject: string;
    realm: string;
}
export declare type PredictContextRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string
], PredictContextRegisteredEventObject>;
export declare type PredictContextRegisteredEventFilter = TypedEventFilter<PredictContextRegisteredEvent>;
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
        addContextFuncRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "addContextFuncRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
        getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IContextManagement.ResponseContextStructOutput]>;
        "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[IContextManagement.ResponseContextStructOutput]>;
        grantContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "grantContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasContextRole(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasContextRole(bytes32,bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        registerContext(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerPredictContext(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeContextFunc(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "removeContextFunc(bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revokeContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "revokeContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setContextRealm(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setContextRealm(bytes32,bytes32)"(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setContextStatus(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setContextStatus(bytes32,bool)"(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateContext(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addContextFuncRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "addContextFuncRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ResponseContextStructOutput>;
    "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ResponseContextStructOutput>;
    grantContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "grantContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasContextRole(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "hasContextRole(bytes32,bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    registerContext(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerPredictContext(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeContextFunc(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "removeContextFunc(bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revokeContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "revokeContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setContextRealm(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setContextRealm(bytes32,bytes32)"(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setContextStatus(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setContextStatus(bytes32,bool)"(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateContext(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addContextFuncRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "addContextFuncRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
        getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ResponseContextStructOutput>;
        "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IContextManagement.ResponseContextStructOutput>;
        grantContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "grantContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        hasContextRole(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "hasContextRole(bytes32,bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        registerContext(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: CallOverrides): Promise<string>;
        "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: CallOverrides): Promise<string>;
        registerPredictContext(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: CallOverrides): Promise<string>;
        "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: CallOverrides): Promise<string>;
        removeContextFunc(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "removeContextFunc(bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        revokeContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "revokeContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        setContextRealm(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "setContextRealm(bytes32,bytes32)"(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        setContextStatus(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setContextStatus(bytes32,bool)"(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        updateContext(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: CallOverrides): Promise<string>;
        "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ContextFuncRemoved(bytes32,address,bytes4,bytes32)"(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextFuncRemovedEventFilter;
        ContextFuncRemoved(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextFuncRemovedEventFilter;
        "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)"(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextFuncRoleAddedEventFilter;
        ContextFuncRoleAdded(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextFuncRoleAddedEventFilter;
        "ContextRealmChanged(bytes32,address,bytes32,bytes32)"(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, oldRealm?: null): ContextRealmChangedEventFilter;
        ContextRealmChanged(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, oldRealm?: null): ContextRealmChangedEventFilter;
        "ContextRegistered(bytes32,address,address,address,bytes32)"(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, signer?: null, realm?: null): ContextRegisteredEventFilter;
        ContextRegistered(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, signer?: null, realm?: null): ContextRegisteredEventFilter;
        "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)"(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextRoleGrantedEventFilter;
        ContextRoleGranted(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextRoleGrantedEventFilter;
        "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)"(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextRoleRevokedEventFilter;
        ContextRoleRevoked(context?: PromiseOrValue<BytesLike> | null, role?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, functionSelector?: null, realm?: null): ContextRoleRevokedEventFilter;
        "ContextStatusChanged(bytes32,address,bytes32,bool)"(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): ContextStatusChangedEventFilter;
        ContextStatusChanged(context?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): ContextStatusChangedEventFilter;
        "ContextUpdated(bytes32,address,address,bytes32)"(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, realm?: null): ContextUpdatedEventFilter;
        ContextUpdated(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, realm?: null): ContextUpdatedEventFilter;
        "PredictContextRegistered(bytes32,address,address,address,address,address,bytes32)"(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, signer?: null, deployer?: null, subject?: null, realm?: null): PredictContextRegisteredEventFilter;
        PredictContextRegistered(context?: PromiseOrValue<BytesLike> | null, contractId?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null, signer?: null, deployer?: null, subject?: null, realm?: null): PredictContextRegisteredEventFilter;
    };
    estimateGas: {
        addContextFuncRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "addContextFuncRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        grantContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "grantContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasContextRole(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasContextRole(bytes32,bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        registerContext(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerPredictContext(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeContextFunc(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "removeContextFunc(bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revokeContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "revokeContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setContextRealm(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setContextRealm(bytes32,bytes32)"(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setContextStatus(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setContextStatus(bytes32,bool)"(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateContext(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addContextFuncRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "addContextFuncRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "grantContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasContextRole(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasContextRole(bytes32,bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerContext(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, rcr: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerPredictContext(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerPredictContext(bytes,(bytes32,bytes32,bytes32,bytes32,address,address,bool),(bytes32,bytes4[],bool)[])"(signature: PromiseOrValue<BytesLike>, rpc: IContextManagement.RequestPredictContextStruct, rrc: IContextManagement.RequestRegisterContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeContextFunc(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "removeContextFunc(bytes32,bytes4)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revokeContextRole(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "revokeContextRole(bytes32,bytes4,bytes32)"(ctx: PromiseOrValue<BytesLike>, functionSelector: PromiseOrValue<BytesLike>, role: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setContextRealm(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setContextRealm(bytes32,bytes32)"(ctx: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setContextStatus(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setContextStatus(bytes32,bool)"(ctx: PromiseOrValue<BytesLike>, status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateContext(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(ctx: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, rc: IContextManagement.RequestContextStruct, ruc: IContextManagement.RequestUpdateContextStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}