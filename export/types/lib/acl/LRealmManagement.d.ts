import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
export interface LRealmManagementInterface extends utils.Interface {
    functions: {
        "LIB_NAME()": FunctionFragment;
        "LIB_VERSION()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "LIB_NAME" | "LIB_NAME()" | "LIB_VERSION" | "LIB_VERSION()"): FunctionFragment;
    encodeFunctionData(functionFragment: "LIB_NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_NAME()", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "LIB_VERSION()", values?: undefined): string;
    decodeFunctionResult(functionFragment: "LIB_NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_NAME()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LIB_VERSION()", data: BytesLike): Result;
    events: {};
}
export interface LRealmManagement extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LRealmManagementInterface;
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
    };
    LIB_NAME(overrides?: CallOverrides): Promise<string>;
    "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
    LIB_VERSION(overrides?: CallOverrides): Promise<string>;
    "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        LIB_NAME(overrides?: CallOverrides): Promise<string>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<string>;
        LIB_VERSION(overrides?: CallOverrides): Promise<string>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        LIB_NAME(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<BigNumber>;
        LIB_VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        LIB_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_NAME()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LIB_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "LIB_VERSION()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
