import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IProxy {
    type ProxyInfoStruct = {
        domainSeparator: PromiseOrValue<BytesLike>;
        name: PromiseOrValue<string>;
        version: PromiseOrValue<string>;
        acl: PromiseOrValue<string>;
        subject: PromiseOrValue<string>;
        localAdmin: PromiseOrValue<string>;
        initVersion: PromiseOrValue<BigNumberish>;
        sstat: PromiseOrValue<BigNumberish>;
        ustat: PromiseOrValue<BigNumberish>;
    };
    type ProxyInfoStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        number,
        number
    ] & {
        domainSeparator: string;
        name: string;
        version: string;
        acl: string;
        subject: string;
        localAdmin: string;
        initVersion: number;
        sstat: number;
        ustat: number;
    };
}
export interface BaseUUPSProxyTestInterface extends utils.Interface {
    functions: {
        "LIVELY_ADMIN_ROLE()": FunctionFragment;
        "LIVELY_SYSTEM_ADMIN_ROLE()": FunctionFragment;
        "accessControlManager()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "initVersion()": FunctionFragment;
        "localAdmin()": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "proxyInfo()": FunctionFragment;
        "safeModeStatus()": FunctionFragment;
        "setAccessControlManager(address)": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeModeStatus(uint8)": FunctionFragment;
        "setUpgradabilityStatus(uint8)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "upgradabilityStatus()": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "LIVELY_ADMIN_ROLE" | "LIVELY_ADMIN_ROLE()" | "LIVELY_SYSTEM_ADMIN_ROLE" | "LIVELY_SYSTEM_ADMIN_ROLE()" | "accessControlManager" | "accessControlManager()" | "contractName" | "contractName()" | "contractVersion" | "contractVersion()" | "domainSeparator" | "domainSeparator()" | "initVersion" | "initVersion()" | "localAdmin" | "localAdmin()" | "proxiableUUID" | "proxiableUUID()" | "proxyInfo" | "proxyInfo()" | "safeModeStatus" | "safeModeStatus()" | "setAccessControlManager" | "setAccessControlManager(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeModeStatus" | "setSafeModeStatus(uint8)" | "setUpgradabilityStatus" | "setUpgradabilityStatus(uint8)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "upgradabilityStatus" | "upgradabilityStatus()" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxyInfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxyInfo()", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeModeStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeModeStatus()", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAccessControlManager", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setAccessControlManager(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeModeStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setSafeModeStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setUpgradabilityStatus", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setUpgradabilityStatus(uint8)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradabilityStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradabilityStatus()", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxyInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxyInfo()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeModeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeModeStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAccessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAccessControlManager(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradabilityStatus(uint8)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradabilityStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradabilityStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "Initialized(address,address,address,string,string,uint16)": EventFragment;
        "ProxyAccessControlUpdated(address,address,address)": EventFragment;
        "ProxyLocalAdminUpdated(address,address,address)": EventFragment;
        "ProxySafeModeUpdated(address,address,uint8)": EventFragment;
        "ProxyUpdatabilityUpdated(address,address,uint8)": EventFragment;
        "ProxyUpgraded(address,address,address)": EventFragment;
        "UpgradeToAnonymous(address,address)": EventFragment;
        "UpgradeToTester(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyAccessControlUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyAccessControlUpdated(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyLocalAdminUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyLocalAdminUpdated(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxySafeModeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxySafeModeUpdated(address,address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpdatabilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpdatabilityUpdated(address,address,uint8)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProxyUpgraded(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToAnonymous"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToAnonymous(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToTester"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeToTester(address,address)"): EventFragment;
}
export interface InitializedEventObject {
    sender: string;
    proxy: string;
    subject: string;
    name: string;
    version: string;
    initCount: number;
}
export declare type InitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    number
], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface ProxyAccessControlUpdatedEventObject {
    sender: string;
    proxy: string;
    acl: string;
}
export declare type ProxyAccessControlUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyAccessControlUpdatedEventObject>;
export declare type ProxyAccessControlUpdatedEventFilter = TypedEventFilter<ProxyAccessControlUpdatedEvent>;
export interface ProxyLocalAdminUpdatedEventObject {
    sender: string;
    proxy: string;
    newAdmin: string;
}
export declare type ProxyLocalAdminUpdatedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyLocalAdminUpdatedEventObject>;
export declare type ProxyLocalAdminUpdatedEventFilter = TypedEventFilter<ProxyLocalAdminUpdatedEvent>;
export interface ProxySafeModeUpdatedEventObject {
    sender: string;
    proxy: string;
    sstat: number;
}
export declare type ProxySafeModeUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ProxySafeModeUpdatedEventObject>;
export declare type ProxySafeModeUpdatedEventFilter = TypedEventFilter<ProxySafeModeUpdatedEvent>;
export interface ProxyUpdatabilityUpdatedEventObject {
    sender: string;
    proxy: string;
    ustat: number;
}
export declare type ProxyUpdatabilityUpdatedEvent = TypedEvent<[
    string,
    string,
    number
], ProxyUpdatabilityUpdatedEventObject>;
export declare type ProxyUpdatabilityUpdatedEventFilter = TypedEventFilter<ProxyUpdatabilityUpdatedEvent>;
export interface ProxyUpgradedEventObject {
    sender: string;
    proxy: string;
    newImplementation: string;
}
export declare type ProxyUpgradedEvent = TypedEvent<[
    string,
    string,
    string
], ProxyUpgradedEventObject>;
export declare type ProxyUpgradedEventFilter = TypedEventFilter<ProxyUpgradedEvent>;
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
        contractName(overrides?: CallOverrides): Promise<[string]>;
        "contractName()"(overrides?: CallOverrides): Promise<[string]>;
        contractVersion(overrides?: CallOverrides): Promise<[string]>;
        "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        localAdmin(overrides?: CallOverrides): Promise<[string]>;
        "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
        proxyInfo(overrides?: CallOverrides): Promise<[IProxy.ProxyInfoStructOutput]>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<[IProxy.ProxyInfoStructOutput]>;
        safeModeStatus(overrides?: CallOverrides): Promise<[number]>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<[number]>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<[string]>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<[number]>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<[number]>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
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
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
    proxyInfo(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
    "proxyInfo()"(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
    safeModeStatus(overrides?: CallOverrides): Promise<number>;
    "safeModeStatus()"(overrides?: CallOverrides): Promise<number>;
    setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<string>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    upgradabilityStatus(overrides?: CallOverrides): Promise<number>;
    "upgradabilityStatus()"(overrides?: CallOverrides): Promise<number>;
    upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
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
        contractName(overrides?: CallOverrides): Promise<string>;
        "contractName()"(overrides?: CallOverrides): Promise<string>;
        contractVersion(overrides?: CallOverrides): Promise<string>;
        "contractVersion()"(overrides?: CallOverrides): Promise<string>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        localAdmin(overrides?: CallOverrides): Promise<string>;
        "localAdmin()"(overrides?: CallOverrides): Promise<string>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
        proxyInfo(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<IProxy.ProxyInfoStructOutput>;
        safeModeStatus(overrides?: CallOverrides): Promise<number>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<number>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        subjectAddress(overrides?: CallOverrides): Promise<string>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<number>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<number>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "Initialized(address,address,address,string,string,uint16)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, initCount?: null): InitializedEventFilter;
        Initialized(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, initCount?: null): InitializedEventFilter;
        "ProxyAccessControlUpdated(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, acl?: null): ProxyAccessControlUpdatedEventFilter;
        ProxyAccessControlUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, acl?: null): ProxyAccessControlUpdatedEventFilter;
        "ProxyLocalAdminUpdated(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): ProxyLocalAdminUpdatedEventFilter;
        ProxyLocalAdminUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): ProxyLocalAdminUpdatedEventFilter;
        "ProxySafeModeUpdated(address,address,uint8)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, sstat?: null): ProxySafeModeUpdatedEventFilter;
        ProxySafeModeUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, sstat?: null): ProxySafeModeUpdatedEventFilter;
        "ProxyUpdatabilityUpdated(address,address,uint8)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, ustat?: null): ProxyUpdatabilityUpdatedEventFilter;
        ProxyUpdatabilityUpdated(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, ustat?: null): ProxyUpdatabilityUpdatedEventFilter;
        "ProxyUpgraded(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): ProxyUpgradedEventFilter;
        ProxyUpgraded(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): ProxyUpgradedEventFilter;
        "UpgradeToAnonymous(address,address)"(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToAnonymousEventFilter;
        UpgradeToAnonymous(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToAnonymousEventFilter;
        "UpgradeToTester(address,address)"(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToTesterEventFilter;
        UpgradeToTester(sender?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradeToTesterEventFilter;
    };
    estimateGas: {
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractName(overrides?: CallOverrides): Promise<BigNumber>;
        "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
        proxyInfo(overrides?: CallOverrides): Promise<BigNumber>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<BigNumber>;
        safeModeStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
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
        contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxyInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxyInfo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeModeStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeModeStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setAccessControlManager(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setAccessControlManager(address)"(acl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeModeStatus(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeModeStatus(uint8)"(sstat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUpgradabilityStatus(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setUpgradabilityStatus(uint8)"(ustat: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradabilityStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "upgradabilityStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
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
