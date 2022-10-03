import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IAssetManagerERC20 {
    type CreateAssetRequestStruct = {
        role: PromiseOrValue<BytesLike>;
        salt: PromiseOrValue<BytesLike>;
        tokenId: PromiseOrValue<string>;
        assetName: PromiseOrValue<string>;
        assetVersion: PromiseOrValue<string>;
    };
    type CreateAssetRequestStructOutput = [
        string,
        string,
        string,
        string,
        string
    ] & {
        role: string;
        salt: string;
        tokenId: string;
        assetName: string;
        assetVersion: string;
    };
}
export declare namespace IERC20Lock {
    type LockTokenRequestStruct = {
        source: PromiseOrValue<string>;
        dest: PromiseOrValue<string>;
        timestamp: PromiseOrValue<BigNumberish>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type LockTokenRequestStructOutput = [
        string,
        string,
        BigNumber,
        BigNumber
    ] & {
        source: string;
        dest: string;
        timestamp: BigNumber;
        amount: BigNumber;
    };
}
export declare namespace IERC20Extra {
    type BatchTransferRequestStruct = {
        to: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferRequestStructOutput = [string, BigNumber] & {
        to: string;
        amount: BigNumber;
    };
    type BatchTransferFromRequestStruct = {
        from: PromiseOrValue<string>;
        to: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferFromRequestStructOutput = [
        string,
        string,
        BigNumber
    ] & {
        from: string;
        to: string;
        amount: BigNumber;
    };
}
export interface IAssetManagerERC20Interface extends utils.Interface {
    functions: {
        "createAsset((bytes32,bytes32,address,string,string))": FunctionFragment;
        "getAllTokens()": FunctionFragment;
        "getTokenInfo(address)": FunctionFragment;
        "isAssetExists(address)": FunctionFragment;
        "isTokenExists(address)": FunctionFragment;
        "predictAddress(address,bytes32)": FunctionFragment;
        "registerToken(address)": FunctionFragment;
        "removeAsset(address)": FunctionFragment;
        "setSafeModeToken(address,bool)": FunctionFragment;
        "tokenApprove(address,address,uint256)": FunctionFragment;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])": FunctionFragment;
        "tokenBatchTransfer(address,(address,uint256)[])": FunctionFragment;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])": FunctionFragment;
        "tokenDecreaseAllowance(address,address,uint256)": FunctionFragment;
        "tokenIncreaseAllowance(address,address,uint256)": FunctionFragment;
        "tokenLock(address,(address,address,uint256,uint256))": FunctionFragment;
        "tokenTransfer(address,address,uint256)": FunctionFragment;
        "tokenTransferFrom(address,address,address,uint256)": FunctionFragment;
        "updateAssetImpl(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "createAsset" | "createAsset((bytes32,bytes32,address,string,string))" | "getAllTokens" | "getAllTokens()" | "getTokenInfo" | "getTokenInfo(address)" | "isAssetExists" | "isAssetExists(address)" | "isTokenExists" | "isTokenExists(address)" | "predictAddress" | "predictAddress(address,bytes32)" | "registerToken" | "registerToken(address)" | "removeAsset" | "removeAsset(address)" | "setSafeModeToken" | "setSafeModeToken(address,bool)" | "tokenApprove" | "tokenApprove(address,address,uint256)" | "tokenBatchLock" | "tokenBatchLock(address,(address,address,uint256,uint256)[])" | "tokenBatchTransfer" | "tokenBatchTransfer(address,(address,uint256)[])" | "tokenBatchTransferFrom" | "tokenBatchTransferFrom(address,(address,address,uint256)[])" | "tokenDecreaseAllowance" | "tokenDecreaseAllowance(address,address,uint256)" | "tokenIncreaseAllowance" | "tokenIncreaseAllowance(address,address,uint256)" | "tokenLock" | "tokenLock(address,(address,address,uint256,uint256))" | "tokenTransfer" | "tokenTransfer(address,address,uint256)" | "tokenTransferFrom" | "tokenTransferFrom(address,address,address,uint256)" | "updateAssetImpl" | "updateAssetImpl(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "createAsset", values: [IAssetManagerERC20.CreateAssetRequestStruct]): string;
    encodeFunctionData(functionFragment: "createAsset((bytes32,bytes32,address,string,string))", values: [IAssetManagerERC20.CreateAssetRequestStruct]): string;
    encodeFunctionData(functionFragment: "getAllTokens", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAllTokens()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokenInfo", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getTokenInfo(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAssetExists", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAssetExists(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTokenExists", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTokenExists(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "predictAddress", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "predictAddress(address,bytes32)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "registerToken", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerToken(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeAsset(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeModeToken", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeModeToken(address,bool)", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "tokenApprove", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenApprove(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenBatchLock", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchLock(address,(address,address,uint256,uint256)[])", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer", values: [PromiseOrValue<string>, IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer(address,(address,uint256)[])", values: [PromiseOrValue<string>, IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom", values: [
        PromiseOrValue<string>,
        IERC20Extra.BatchTransferFromRequestStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom(address,(address,address,uint256)[])", values: [
        PromiseOrValue<string>,
        IERC20Extra.BatchTransferFromRequestStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenLock", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenLock(address,(address,address,uint256,uint256))", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenTransfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransfer(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom(address,address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "updateAssetImpl", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "updateAssetImpl(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "createAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createAsset((bytes32,bytes32,address,string,string))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllTokens()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenInfo(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAssetExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAssetExists(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTokenExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTokenExists(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress(address,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerToken(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAsset(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeToken(address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock(address,(address,address,uint256,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer(address,(address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom(address,(address,address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock(address,(address,address,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom(address,address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAssetImpl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAssetImpl(address)", data: BytesLike): Result;
    events: {
        "AssetCreated(address,address,address,address)": EventFragment;
        "AssetImplUpdated(address,address)": EventFragment;
        "AssetRemoved(address,address,address)": EventFragment;
        "TokenRegistered(address,address,string,string)": EventFragment;
        "TokenSafeModeChanged(address,address,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AssetCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetCreated(address,address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetImplUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetImplUpdated(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRemoved(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRegistered(address,address,string,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenSafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenSafeModeChanged(address,address,bool)"): EventFragment;
}
export interface AssetCreatedEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
    assetImpl: string;
}
export declare type AssetCreatedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], AssetCreatedEventObject>;
export declare type AssetCreatedEventFilter = TypedEventFilter<AssetCreatedEvent>;
export interface AssetImplUpdatedEventObject {
    sender: string;
    assetImpl: string;
}
export declare type AssetImplUpdatedEvent = TypedEvent<[
    string,
    string
], AssetImplUpdatedEventObject>;
export declare type AssetImplUpdatedEventFilter = TypedEventFilter<AssetImplUpdatedEvent>;
export interface AssetRemovedEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
}
export declare type AssetRemovedEvent = TypedEvent<[
    string,
    string,
    string
], AssetRemovedEventObject>;
export declare type AssetRemovedEventFilter = TypedEventFilter<AssetRemovedEvent>;
export interface TokenRegisteredEventObject {
    sender: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
}
export declare type TokenRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], TokenRegisteredEventObject>;
export declare type TokenRegisteredEventFilter = TypedEventFilter<TokenRegisteredEvent>;
export interface TokenSafeModeChangedEventObject {
    sender: string;
    tokenId: string;
    isEnabled: boolean;
}
export declare type TokenSafeModeChangedEvent = TypedEvent<[
    string,
    string,
    boolean
], TokenSafeModeChangedEventObject>;
export declare type TokenSafeModeChangedEventFilter = TypedEventFilter<TokenSafeModeChangedEvent>;
export interface IAssetManagerERC20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAssetManagerERC20Interface;
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
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getAllTokens(overrides?: CallOverrides): Promise<[string[]]>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<[string[]]>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchLock(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenLock(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenLock(address,(address,address,uint256,uint256))"(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAssetImpl(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateAssetImpl(address)"(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getAllTokens(overrides?: CallOverrides): Promise<string[]>;
    "getAllTokens()"(overrides?: CallOverrides): Promise<string[]>;
    getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
    "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
    isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchLock(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchLock(address,(address,address,uint256,uint256)[])"(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenLock(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenLock(address,(address,address,uint256,uint256))"(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAssetImpl(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateAssetImpl(address)"(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: CallOverrides): Promise<string>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: CallOverrides): Promise<string>;
        getAllTokens(overrides?: CallOverrides): Promise<string[]>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<string[]>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenBatchLock(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenLock(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        "tokenLock(address,(address,address,uint256,uint256))"(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        updateAssetImpl(assetImpl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "updateAssetImpl(address)"(assetImpl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AssetCreated(address,address,address,address)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetImpl?: null): AssetCreatedEventFilter;
        AssetCreated(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetImpl?: null): AssetCreatedEventFilter;
        "AssetImplUpdated(address,address)"(sender?: PromiseOrValue<string> | null, assetImpl?: PromiseOrValue<string> | null): AssetImplUpdatedEventFilter;
        AssetImplUpdated(sender?: PromiseOrValue<string> | null, assetImpl?: PromiseOrValue<string> | null): AssetImplUpdatedEventFilter;
        "AssetRemoved(address,address,address)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRemovedEventFilter;
        AssetRemoved(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRemovedEventFilter;
        "TokenRegistered(address,address,string,string)"(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, tokenName?: null, tokenSymbol?: null): TokenRegisteredEventFilter;
        TokenRegistered(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, tokenName?: null, tokenSymbol?: null): TokenRegisteredEventFilter;
        "TokenSafeModeChanged(address,address,bool)"(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, isEnabled?: null): TokenSafeModeChangedEventFilter;
        TokenSafeModeChanged(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, isEnabled?: null): TokenSafeModeChangedEventFilter;
    };
    estimateGas: {
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getAllTokens(overrides?: CallOverrides): Promise<BigNumber>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<BigNumber>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchLock(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenLock(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenLock(address,(address,address,uint256,uint256))"(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAssetImpl(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateAssetImpl(address)"(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getAllTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        predictAddress(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "predictAddress(address,bytes32)"(base: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchLock(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(tokenId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenLock(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenLock(address,(address,address,uint256,uint256))"(tokenId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAssetImpl(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateAssetImpl(address)"(assetImpl: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
