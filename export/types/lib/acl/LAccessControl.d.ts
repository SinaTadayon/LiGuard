import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IContextManagement {
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
export interface LAccessControlInterface extends utils.Interface {
    functions: {
        "LIB_NAME()": FunctionFragment;
        "LIB_VERSION()": FunctionFragment;
        "LIVELY_ADMIN_ROLE()": FunctionFragment;
        "LIVELY_ANONYMOUS_ROLE()": FunctionFragment;
        "LIVELY_GENERAL_GROUP()": FunctionFragment;
        "LIVELY_GENERAL_REALM()": FunctionFragment;
        "LIVELY_SYSTEM_ADMIN_ROLE()": FunctionFragment;
        "createRequestContext()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "LIB_NAME" | "LIB_NAME()" | "LIB_VERSION" | "LIB_VERSION()" | "LIVELY_ADMIN_ROLE" | "LIVELY_ADMIN_ROLE()" | "LIVELY_ANONYMOUS_ROLE" | "LIVELY_ANONYMOUS_ROLE()" | "LIVELY_GENERAL_GROUP" | "LIVELY_GENERAL_GROUP()" | "LIVELY_GENERAL_REALM" | "LIVELY_GENERAL_REALM()" | "LIVELY_SYSTEM_ADMIN_ROLE" | "LIVELY_SYSTEM_ADMIN_ROLE()" | "createRequestContext" | "createRequestContext()"): FunctionFragment;
    encodeFunctionData(functionFragment: "LIB_NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_NAME()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ANONYMOUS_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_ANONYMOUS_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_GENERAL_GROUP", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_GENERAL_GROUP()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_GENERAL_REALM", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_GENERAL_REALM()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", values?: undefined): string;
    encodeFunctionData(functionFragment: "createRequestContext", values?: undefined): string;
    encodeFunctionData(functionFragment: "createRequestContext()", values?: undefined): string;
    decodeFunctionResult(functionFragment: "LIB_NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_NAME()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ANONYMOUS_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_ANONYMOUS_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_GENERAL_GROUP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_GENERAL_GROUP()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_GENERAL_REALM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_GENERAL_REALM()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIVELY_SYSTEM_ADMIN_ROLE()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createRequestContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createRequestContext()", data: BytesLike): Result;
    events: {};
}
export interface LAccessControl extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LAccessControlInterface;
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
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<[string]>;
        LIVELY_ANONYMOUS_ROLE(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_ANONYMOUS_ROLE()"(overrides?: CallOverrides): Promise<[string]>;
        LIVELY_GENERAL_GROUP(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_GENERAL_GROUP()"(overrides?: CallOverrides): Promise<[string]>;
        LIVELY_GENERAL_REALM(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_GENERAL_REALM()"(overrides?: CallOverrides): Promise<[string]>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<[string]>;
        createRequestContext(overrides?: CallOverrides): Promise<[IContextManagement.RequestRegisterContextStructOutput[]]>;
        "createRequestContext()"(overrides?: CallOverrides): Promise<[IContextManagement.RequestRegisterContextStructOutput[]]>;
    };
    LIB_NAME(overrides?: CallOverrides): Promise<string>;
    "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
    LIB_VERSION(overrides?: CallOverrides): Promise<string>;
    "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_ANONYMOUS_ROLE(overrides?: CallOverrides): Promise<string>;
    "LIVELY_ANONYMOUS_ROLE()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_GENERAL_GROUP(overrides?: CallOverrides): Promise<string>;
    "LIVELY_GENERAL_GROUP()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_GENERAL_REALM(overrides?: CallOverrides): Promise<string>;
    "LIVELY_GENERAL_REALM()"(overrides?: CallOverrides): Promise<string>;
    LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
    createRequestContext(overrides?: CallOverrides): Promise<IContextManagement.RequestRegisterContextStructOutput[]>;
    "createRequestContext()"(overrides?: CallOverrides): Promise<IContextManagement.RequestRegisterContextStructOutput[]>;
    callStatic: {
        LIB_NAME(overrides?: CallOverrides): Promise<string>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
        LIB_VERSION(overrides?: CallOverrides): Promise<string>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_ANONYMOUS_ROLE(overrides?: CallOverrides): Promise<string>;
        "LIVELY_ANONYMOUS_ROLE()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_GENERAL_GROUP(overrides?: CallOverrides): Promise<string>;
        "LIVELY_GENERAL_GROUP()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_GENERAL_REALM(overrides?: CallOverrides): Promise<string>;
        "LIVELY_GENERAL_REALM()"(overrides?: CallOverrides): Promise<string>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;
        createRequestContext(overrides?: CallOverrides): Promise<IContextManagement.RequestRegisterContextStructOutput[]>;
        "createRequestContext()"(overrides?: CallOverrides): Promise<IContextManagement.RequestRegisterContextStructOutput[]>;
    };
    filters: {};
    estimateGas: {
        LIB_NAME(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIB_VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_ANONYMOUS_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_ANONYMOUS_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_GENERAL_GROUP(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_GENERAL_GROUP()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_GENERAL_REALM(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_GENERAL_REALM()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;
        createRequestContext(overrides?: CallOverrides): Promise<BigNumber>;
        "createRequestContext()"(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        LIB_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIB_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_ANONYMOUS_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_ANONYMOUS_ROLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_GENERAL_GROUP(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_GENERAL_GROUP()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_GENERAL_REALM(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_GENERAL_REALM()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIVELY_SYSTEM_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIVELY_SYSTEM_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createRequestContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "createRequestContext()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
