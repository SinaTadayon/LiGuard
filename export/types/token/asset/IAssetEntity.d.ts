import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IAssetEntityInterface extends utils.Interface {
    functions: {
        "assetAcl()": FunctionFragment;
        "assetInitVersion()": FunctionFragment;
        "assetName()": FunctionFragment;
        "assetRealm()": FunctionFragment;
        "assetRole()": FunctionFragment;
        "assetSafeMode()": FunctionFragment;
        "assetSafeModeSet(bool)": FunctionFragment;
        "assetToken()": FunctionFragment;
        "assetType()": FunctionFragment;
        "assetVersion()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "assetAcl" | "assetAcl()" | "assetInitVersion" | "assetInitVersion()" | "assetName" | "assetName()" | "assetRealm" | "assetRealm()" | "assetRole" | "assetRole()" | "assetSafeMode" | "assetSafeMode()" | "assetSafeModeSet" | "assetSafeModeSet(bool)" | "assetToken" | "assetToken()" | "assetType" | "assetType()" | "assetVersion" | "assetVersion()"): FunctionFragment;
    encodeFunctionData(functionFragment: "assetAcl", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetAcl()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetInitVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetInitVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetName", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetRealm", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetRealm()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetRole", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetRole()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetSafeMode", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetSafeMode()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetSafeModeSet", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "assetSafeModeSet(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "assetToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetToken()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetType", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetType()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetVersion()", values?: undefined): string;
    decodeFunctionResult(functionFragment: "assetAcl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetAcl()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetInitVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetInitVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetRealm()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetRole()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetSafeMode()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetSafeModeSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetSafeModeSet(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetToken()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetType()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetVersion()", data: BytesLike): Result;
    events: {
        "AssetInitialized(address,address,address,address,address,string,string,bytes32,bytes32)": EventFragment;
        "AssetSafeModeChanged(address,address,bytes32,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AssetInitialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetInitialized(address,address,address,address,address,string,string,bytes32,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSafeModeChanged(address,address,bytes32,bool)"): EventFragment;
}
export interface AssetInitializedEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
    assetManager: string;
    assetSubject: string;
    name: string;
    version: string;
    realm: string;
    role: string;
}
export declare type AssetInitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], AssetInitializedEventObject>;
export declare type AssetInitializedEventFilter = TypedEventFilter<AssetInitializedEvent>;
export interface AssetSafeModeChangedEventObject {
    sender: string;
    assetId: string;
    realm: string;
    status: boolean;
}
export declare type AssetSafeModeChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], AssetSafeModeChangedEventObject>;
export declare type AssetSafeModeChangedEventFilter = TypedEventFilter<AssetSafeModeChangedEvent>;
export interface IAssetEntity extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAssetEntityInterface;
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
        assetAcl(overrides?: CallOverrides): Promise<[string]>;
        "assetAcl()"(overrides?: CallOverrides): Promise<[string]>;
        assetInitVersion(overrides?: CallOverrides): Promise<[number]>;
        "assetInitVersion()"(overrides?: CallOverrides): Promise<[number]>;
        assetName(overrides?: CallOverrides): Promise<[string]>;
        "assetName()"(overrides?: CallOverrides): Promise<[string]>;
        assetRealm(overrides?: CallOverrides): Promise<[string]>;
        "assetRealm()"(overrides?: CallOverrides): Promise<[string]>;
        assetRole(overrides?: CallOverrides): Promise<[string]>;
        "assetRole()"(overrides?: CallOverrides): Promise<[string]>;
        assetSafeMode(overrides?: CallOverrides): Promise<[boolean]>;
        "assetSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;
        assetSafeModeSet(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "assetSafeModeSet(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        assetToken(overrides?: CallOverrides): Promise<[string]>;
        "assetToken()"(overrides?: CallOverrides): Promise<[string]>;
        assetType(overrides?: CallOverrides): Promise<[number]>;
        "assetType()"(overrides?: CallOverrides): Promise<[number]>;
        assetVersion(overrides?: CallOverrides): Promise<[string]>;
        "assetVersion()"(overrides?: CallOverrides): Promise<[string]>;
    };
    assetAcl(overrides?: CallOverrides): Promise<string>;
    "assetAcl()"(overrides?: CallOverrides): Promise<string>;
    assetInitVersion(overrides?: CallOverrides): Promise<number>;
    "assetInitVersion()"(overrides?: CallOverrides): Promise<number>;
    assetName(overrides?: CallOverrides): Promise<string>;
    "assetName()"(overrides?: CallOverrides): Promise<string>;
    assetRealm(overrides?: CallOverrides): Promise<string>;
    "assetRealm()"(overrides?: CallOverrides): Promise<string>;
    assetRole(overrides?: CallOverrides): Promise<string>;
    "assetRole()"(overrides?: CallOverrides): Promise<string>;
    assetSafeMode(overrides?: CallOverrides): Promise<boolean>;
    "assetSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
    assetSafeModeSet(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "assetSafeModeSet(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    assetToken(overrides?: CallOverrides): Promise<string>;
    "assetToken()"(overrides?: CallOverrides): Promise<string>;
    assetType(overrides?: CallOverrides): Promise<number>;
    "assetType()"(overrides?: CallOverrides): Promise<number>;
    assetVersion(overrides?: CallOverrides): Promise<string>;
    "assetVersion()"(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        assetAcl(overrides?: CallOverrides): Promise<string>;
        "assetAcl()"(overrides?: CallOverrides): Promise<string>;
        assetInitVersion(overrides?: CallOverrides): Promise<number>;
        "assetInitVersion()"(overrides?: CallOverrides): Promise<number>;
        assetName(overrides?: CallOverrides): Promise<string>;
        "assetName()"(overrides?: CallOverrides): Promise<string>;
        assetRealm(overrides?: CallOverrides): Promise<string>;
        "assetRealm()"(overrides?: CallOverrides): Promise<string>;
        assetRole(overrides?: CallOverrides): Promise<string>;
        "assetRole()"(overrides?: CallOverrides): Promise<string>;
        assetSafeMode(overrides?: CallOverrides): Promise<boolean>;
        "assetSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
        assetSafeModeSet(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "assetSafeModeSet(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        assetToken(overrides?: CallOverrides): Promise<string>;
        "assetToken()"(overrides?: CallOverrides): Promise<string>;
        assetType(overrides?: CallOverrides): Promise<number>;
        "assetType()"(overrides?: CallOverrides): Promise<number>;
        assetVersion(overrides?: CallOverrides): Promise<string>;
        "assetVersion()"(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AssetInitialized(address,address,address,address,address,string,string,bytes32,bytes32)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetManager?: null, assetSubject?: null, name?: null, version?: null, realm?: null, role?: null): AssetInitializedEventFilter;
        AssetInitialized(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetManager?: null, assetSubject?: null, name?: null, version?: null, realm?: null, role?: null): AssetInitializedEventFilter;
        "AssetSafeModeChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): AssetSafeModeChangedEventFilter;
        AssetSafeModeChanged(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): AssetSafeModeChangedEventFilter;
    };
    estimateGas: {
        assetAcl(overrides?: CallOverrides): Promise<BigNumber>;
        "assetAcl()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetInitVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "assetInitVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetName(overrides?: CallOverrides): Promise<BigNumber>;
        "assetName()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetRealm(overrides?: CallOverrides): Promise<BigNumber>;
        "assetRealm()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetRole(overrides?: CallOverrides): Promise<BigNumber>;
        "assetRole()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetSafeMode(overrides?: CallOverrides): Promise<BigNumber>;
        "assetSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetSafeModeSet(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "assetSafeModeSet(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        assetToken(overrides?: CallOverrides): Promise<BigNumber>;
        "assetToken()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetType(overrides?: CallOverrides): Promise<BigNumber>;
        "assetType()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "assetVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        assetAcl(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetAcl()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetInitVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetInitVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetSafeModeSet(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "assetSafeModeSet(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        assetToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}