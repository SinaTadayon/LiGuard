import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IContextManagement {
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
}
export interface LAssetManagerERC20Interface extends utils.Interface {
    functions: {
        "LIB_NAME()": FunctionFragment;
        "LIB_VERSION()": FunctionFragment;
        "createRequestContext(bytes32,bytes32,bytes32)": FunctionFragment;
        "predictAddress(address,bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "LIB_NAME" | "LIB_NAME()" | "LIB_VERSION" | "LIB_VERSION()" | "createRequestContext" | "createRequestContext(bytes32,bytes32,bytes32)" | "predictAddress" | "predictAddress(address,bytes32)"): FunctionFragment;
    encodeFunctionData(functionFragment: "LIB_NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_NAME()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION()", values?: undefined): string;
    encodeFunctionData(functionFragment: "createRequestContext", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "createRequestContext(bytes32,bytes32,bytes32)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "predictAddress", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "predictAddress(address,bytes32)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "LIB_NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_NAME()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createRequestContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createRequestContext(bytes32,bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress(address,bytes32)", data: BytesLike): Result;
    events: {};
}
export interface LAssetManagerERC20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LAssetManagerERC20Interface;
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
        LIB_NAME(overrides?: CallOverrides): Promise<[string]>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<[string]>;
        LIB_VERSION(overrides?: CallOverrides): Promise<[string]>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<[string]>;
        createRequestContext(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            IContextManagement.RequestContextStructOutput,
            IContextManagement.RequestRegisterContextStructOutput[]
        ]>;
        "createRequestContext(bytes32,bytes32,bytes32)"(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            IContextManagement.RequestContextStructOutput,
            IContextManagement.RequestRegisterContextStructOutput[]
        ]>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    LIB_NAME(overrides?: CallOverrides): Promise<string>;
    "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
    LIB_VERSION(overrides?: CallOverrides): Promise<string>;
    "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
    createRequestContext(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
        IContextManagement.RequestContextStructOutput,
        IContextManagement.RequestRegisterContextStructOutput[]
    ]>;
    "createRequestContext(bytes32,bytes32,bytes32)"(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
        IContextManagement.RequestContextStructOutput,
        IContextManagement.RequestRegisterContextStructOutput[]
    ]>;
    predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        LIB_NAME(overrides?: CallOverrides): Promise<string>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
        LIB_VERSION(overrides?: CallOverrides): Promise<string>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
        createRequestContext(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            IContextManagement.RequestContextStructOutput,
            IContextManagement.RequestRegisterContextStructOutput[]
        ]>;
        "createRequestContext(bytes32,bytes32,bytes32)"(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            IContextManagement.RequestContextStructOutput,
            IContextManagement.RequestRegisterContextStructOutput[]
        ]>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        LIB_NAME(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIB_VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<BigNumber>;
        createRequestContext(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "createRequestContext(bytes32,bytes32,bytes32)"(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        LIB_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIB_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createRequestContext(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "createRequestContext(bytes32,bytes32,bytes32)"(domainName: PromiseOrValue<BytesLike>, domainVersion: PromiseOrValue<BytesLike>, realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
