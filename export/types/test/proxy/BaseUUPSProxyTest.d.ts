import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface BaseUUPSProxyTestInterface extends utils.Interface {
    functions: {
        "LIVELY_ADMIN_ROLE()": FunctionFragment;
        "LIVELY_SYSTEM_ADMIN_ROLE()": FunctionFragment;
        "accessControlManager()": FunctionFragment;
        "contractContext()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractRealm()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "initVersion()": FunctionFragment;
        "initialize(string,string,string,bytes,address)": FunctionFragment;
        "initializeWithInvalidRealm(string,string,string,bytes,address)": FunctionFragment;
        "initializeWithInvalidRole(string,string,string,bytes,address)": FunctionFragment;
        "isSafeMode()": FunctionFragment;
        "isUpgradable()": FunctionFragment;
        "localAdmin()": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "reInitialize(bytes)": FunctionFragment;
        "reInitializeWithInvalidRealm(bytes)": FunctionFragment;
        "reInitializeWithInvalidRole(bytes)": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeMode(bool)": FunctionFragment;
        "setUpgradeStatus(bool)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "upgradeToAndCall(address,bytes)": FunctionFragment;
        "upgradeToAnonymousRole(address)": FunctionFragment;
        "upgradeToTesterRole(address)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "LIVELY_ADMIN_ROLE" | "LIVELY_ADMIN_ROLE()" | "LIVELY_SYSTEM_ADMIN_ROLE" | "LIVELY_SYSTEM_ADMIN_ROLE()" | "accessControlManager" | "accessControlManager()" | "contractContext" | "contractContext()" | "contractName" | "contractName()" | "contractRealm" | "contractRealm()" | "contractVersion" | "contractVersion()" | "domainSeparator" | "domainSeparator()" | "initVersion" | "initVersion()" | "initialize" | "initialize(string,string,string,bytes,address)" | "initializeWithInvalidRealm" | "initializeWithInvalidRealm(string,string,string,bytes,address)" | "initializeWithInvalidRole" | "initializeWithInvalidRole(string,string,string,bytes,address)" | "isSafeMode" | "isSafeMode()" | "isUpgradable" | "isUpgradable()" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "reInitialize" | "reInitialize(bytes)" | "reInitializeWithInvalidRealm" | "reInitializeWithInvalidRealm(bytes)" | "reInitializeWithInvalidRole" | "reInitializeWithInvalidRole(bytes)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeMode" | "setSafeMode(bool)" | "setUpgradeStatus" | "setUpgradeStatus(bool)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "upgradeToAndCall" | "upgradeToAndCall(address,bytes)" | "upgradeToAnonymousRole" | "upgradeToAnonymousRole(address)" | "upgradeToTesterRole" | "upgradeToTesterRole(address)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractContext", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractContext()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initialize(string,string,string,bytes,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initializeWithInvalidRealm", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initializeWithInvalidRealm(string,string,string,bytes,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initializeWithInvalidRole", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initializeWithInvalidRole(string,string,string,bytes,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "isSafeMode", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSafeMode()", values?: undefined): string;
    encodeFunctionData(functionFragment: "isUpgradable", values?: undefined): string;
    encodeFunctionData(functionFragment: "isUpgradable()", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "reInitialize", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "reInitialize(bytes)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "reInitializeWithInvalidRealm", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "reInitializeWithInvalidRealm(bytes)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "reInitializeWithInvalidRole", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "reInitializeWithInvalidRole(bytes)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeMode", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeMode(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradeTo", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "upgradeTo(address,bytes,bool)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall(address,bytes)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradeToAnonymousRole", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "upgradeToAnonymousRole(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "upgradeToTesterRole", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "upgradeToTesterRole(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize(string,string,string,bytes,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeWithInvalidRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeWithInvalidRealm(string,string,string,bytes,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeWithInvalidRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeWithInvalidRole(string,string,string,bytes,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitialize(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitializeWithInvalidRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitializeWithInvalidRealm(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitializeWithInvalidRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reInitializeWithInvalidRole(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall(address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAnonymousRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAnonymousRole(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToTesterRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToTesterRole(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
        "LocalAdminChanged(address,address,address)": EventFragment;
        "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
        "UpgradeStatusChanged(address,address,bytes32,bool)": EventFragment;
        "UpgradeToAnonymous(address,address)": EventFragment;
        "UpgradeToTester(address,address)": EventFragment;
        "Upgraded(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToAnonymous"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToAnonymous(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToTester"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToTester(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded(address,address,address)"): EventFragment;
}
export interface InitializedEventObject {
    sender: string;
    proxy: string;
    subject: string;
    name: string;
    version: string;
    realm: string;
    initCount: number;
}
export declare type InitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    number
], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface LocalAdminChangedEventObject {
    sender: string;
    proxy: string;
    newAdmin: string;
}
export declare type LocalAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], LocalAdminChangedEventObject>;
export declare type LocalAdminChangedEventFilter = TypedEventFilter<LocalAdminChangedEvent>;
export interface SafeModeChangedEventObject {
    sender: string;
    proxy: string;
    realm: string;
    status: boolean;
}
export declare type SafeModeChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], SafeModeChangedEventObject>;
export declare type SafeModeChangedEventFilter = TypedEventFilter<SafeModeChangedEvent>;
export interface UpgradeStatusChangedEventObject {
    sender: string;
    proxy: string;
    realm: string;
    status: boolean;
}
export declare type UpgradeStatusChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], UpgradeStatusChangedEventObject>;
export declare type UpgradeStatusChangedEventFilter = TypedEventFilter<UpgradeStatusChangedEvent>;
export interface UpgradeToAnonymousEventObject {
    sender: string;
    newImplementation: string;
}
export declare type UpgradeToAnonymousEvent = TypedEvent<[
    string,
    string
], UpgradeToAnonymousEventObject>;
export declare type UpgradeToAnonymousEventFilter = TypedEventFilter<UpgradeToAnonymousEvent>;
export interface UpgradeToTesterEventObject {
    sender: string;
    newImplementation: string;
}
export declare type UpgradeToTesterEvent = TypedEvent<[
    string,
    string
], UpgradeToTesterEventObject>;
export declare type UpgradeToTesterEventFilter = TypedEventFilter<UpgradeToTesterEvent>;
export interface UpgradedEventObject {
    sender: string;
    proxy: string;
    newImplementation: string;
}
export declare type UpgradedEvent = TypedEvent<[
    string,
    string,
    string
], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface BaseUUPSProxyTest extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BaseUUPSProxyTestInterface;
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
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<[string]>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<[string]>;
        accessControlManager(overrides?: CallOverrides): Promise<[string]>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<[string]>;
        contractContext(overrides?: CallOverrides): Promise<[string]>;
        "contractContext()"(overrides?: CallOverrides): Promise<[string]>;
        contractName(overrides?: CallOverrides): Promise<[string]>;
        "contractName()"(overrides?: CallOverrides): Promise<[string]>;
        contractRealm(overrides?: CallOverrides): Promise<[string]>;
        "contractRealm()"(overrides?: CallOverrides): Promise<[string]>;
        contractVersion(overrides?: CallOverrides): Promise<[string]>;
        "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        initialize(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initializeWithInvalidRealm(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initializeWithInvalidRealm(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initializeWithInvalidRole(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initializeWithInvalidRole(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isSafeMode(overrides?: CallOverrides): Promise<[boolean]>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;
        isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<[boolean]>;
        localAdmin(overrides?: CallOverrides): Promise<[string]>;
        "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
        reInitialize(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "reInitialize(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reInitializeWithInvalidRealm(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "reInitializeWithInvalidRealm(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reInitializeWithInvalidRole(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "reInitializeWithInvalidRole(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<[string]>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeToAndCall(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeToAndCall(address,bytes)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeToAnonymousRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeToAnonymousRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeToTesterRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeToTesterRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
    accessControlManager(overrides?: CallOverrides): Promise<string>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
    contractContext(overrides?: CallOverrides): Promise<string>;
    "contractContext()"(overrides?: CallOverrides): Promise<string>;
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractRealm(overrides?: CallOverrides): Promise<string>;
    "contractRealm()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    initialize(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initializeWithInvalidRealm(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initializeWithInvalidRealm(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initializeWithInvalidRole(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initializeWithInvalidRole(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isSafeMode(overrides?: CallOverrides): Promise<boolean>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
    isUpgradable(overrides?: CallOverrides): Promise<boolean>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
    reInitialize(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "reInitialize(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reInitializeWithInvalidRealm(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "reInitializeWithInvalidRealm(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reInitializeWithInvalidRole(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "reInitializeWithInvalidRole(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<string>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeToAndCall(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeToAndCall(address,bytes)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeToAnonymousRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeToAnonymousRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeToTesterRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeToTesterRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
        accessControlManager(overrides?: CallOverrides): Promise<string>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
        contractContext(overrides?: CallOverrides): Promise<string>;
        "contractContext()"(overrides?: CallOverrides): Promise<string>;
        contractName(overrides?: CallOverrides): Promise<string>;
        "contractName()"(overrides?: CallOverrides): Promise<string>;
        contractRealm(overrides?: CallOverrides): Promise<string>;
        "contractRealm()"(overrides?: CallOverrides): Promise<string>;
        contractVersion(overrides?: CallOverrides): Promise<string>;
        "contractVersion()"(overrides?: CallOverrides): Promise<string>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        initialize(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initialize(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        initializeWithInvalidRealm(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initializeWithInvalidRealm(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        initializeWithInvalidRole(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initializeWithInvalidRole(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isSafeMode(overrides?: CallOverrides): Promise<boolean>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
        isUpgradable(overrides?: CallOverrides): Promise<boolean>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
        localAdmin(overrides?: CallOverrides): Promise<string>;
        "localAdmin()"(overrides?: CallOverrides): Promise<string>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
        reInitialize(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "reInitialize(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        reInitializeWithInvalidRealm(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "reInitializeWithInvalidRealm(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        reInitializeWithInvalidRole(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "reInitializeWithInvalidRole(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        subjectAddress(overrides?: CallOverrides): Promise<string>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        upgradeToAndCall(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "upgradeToAndCall(address,bytes)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        upgradeToAnonymousRole(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "upgradeToAnonymousRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        upgradeToTesterRole(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "upgradeToTesterRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Initialized(address,address,address,string,string,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        Initialized(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        "LocalAdminChanged(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        LocalAdminChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        "SafeModeChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        SafeModeChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        "UpgradeStatusChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        UpgradeStatusChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        "UpgradeToAnonymous(address,address)"(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToAnonymousEventFilter;
        UpgradeToAnonymous(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToAnonymousEventFilter;
        "UpgradeToTester(address,address)"(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToTesterEventFilter;
        UpgradeToTester(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToTesterEventFilter;
        "Upgraded(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractContext(overrides?: CallOverrides): Promise<BigNumber>;
        "contractContext()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractName(overrides?: CallOverrides): Promise<BigNumber>;
        "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractRealm(overrides?: CallOverrides): Promise<BigNumber>;
        "contractRealm()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        initialize(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initializeWithInvalidRealm(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initializeWithInvalidRealm(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initializeWithInvalidRole(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initializeWithInvalidRole(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isSafeMode(overrides?: CallOverrides): Promise<BigNumber>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;
        isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<BigNumber>;
        localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
        reInitialize(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "reInitialize(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reInitializeWithInvalidRealm(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "reInitializeWithInvalidRealm(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reInitializeWithInvalidRole(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "reInitializeWithInvalidRole(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeToAndCall(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeToAndCall(address,bytes)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeToAnonymousRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeToAnonymousRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeToTesterRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeToTesterRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        accessControlManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractContext()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initializeWithInvalidRealm(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initializeWithInvalidRealm(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initializeWithInvalidRole(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initializeWithInvalidRole(string,string,string,bytes,address)"(domainName: PromiseOrValue<string>, domainVersion: PromiseOrValue<string>, domainRealm: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, accessControlManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reInitialize(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "reInitialize(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reInitializeWithInvalidRealm(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "reInitializeWithInvalidRealm(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reInitializeWithInvalidRole(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "reInitializeWithInvalidRole(bytes)"(signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeToAndCall(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeToAndCall(address,bytes)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeToAnonymousRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeToAnonymousRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeToTesterRole(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeToTesterRole(address)"(newImplementation: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
