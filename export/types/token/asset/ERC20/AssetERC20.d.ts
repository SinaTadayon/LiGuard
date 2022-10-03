import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export declare namespace AssetERC20 {
    type InitRequestStruct = {
        domainName: PromiseOrValue<string>;
        domainVersion: PromiseOrValue<string>;
        domainRealm: PromiseOrValue<BytesLike>;
        erc20Token: PromiseOrValue<string>;
        accessControl: PromiseOrValue<string>;
        assetManager: PromiseOrValue<string>;
        assetRole: PromiseOrValue<BytesLike>;
        salt: PromiseOrValue<BytesLike>;
        bytesHash: PromiseOrValue<BytesLike>;
        signature: PromiseOrValue<BytesLike>;
    };
    type InitRequestStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ] & {
        domainName: string;
        domainVersion: string;
        domainRealm: string;
        erc20Token: string;
        accessControl: string;
        assetManager: string;
        assetRole: string;
        salt: string;
        bytesHash: string;
        signature: string;
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
export interface AssetERC20Interface extends utils.Interface {
    functions: {
        "assetBalance()": FunctionFragment;
        "assetInitStatus()": FunctionFragment;
        "assetInitVersion()": FunctionFragment;
        "assetName()": FunctionFragment;
        "assetRealm()": FunctionFragment;
        "assetRole()": FunctionFragment;
        "assetSafeMode()": FunctionFragment;
        "assetSafeModeSet(bool)": FunctionFragment;
        "assetToken()": FunctionFragment;
        "assetType()": FunctionFragment;
        "assetVersion()": FunctionFragment;
        "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "tokenApprove(address,uint256)": FunctionFragment;
        "tokenBalance()": FunctionFragment;
        "tokenBatchLock((address,address,uint256,uint256)[])": FunctionFragment;
        "tokenBatchTransfer((address,uint256)[])": FunctionFragment;
        "tokenBatchTransferFrom((address,address,uint256)[])": FunctionFragment;
        "tokenDecreaseAllowance(address,uint256)": FunctionFragment;
        "tokenIncreaseAllowance(address,uint256)": FunctionFragment;
        "tokenLock((address,address,uint256,uint256))": FunctionFragment;
        "tokenTransfer(address,uint256)": FunctionFragment;
        "tokenTransferFrom(address,address,uint256)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "assetBalance" | "assetBalance()" | "assetInitStatus" | "assetInitStatus()" | "assetInitVersion" | "assetInitVersion()" | "assetName" | "assetName()" | "assetRealm" | "assetRealm()" | "assetRole" | "assetRole()" | "assetSafeMode" | "assetSafeMode()" | "assetSafeModeSet" | "assetSafeModeSet(bool)" | "assetToken" | "assetToken()" | "assetType" | "assetType()" | "assetVersion" | "assetVersion()" | "initialize" | "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))" | "supportsInterface" | "supportsInterface(bytes4)" | "tokenApprove" | "tokenApprove(address,uint256)" | "tokenBalance" | "tokenBalance()" | "tokenBatchLock" | "tokenBatchLock((address,address,uint256,uint256)[])" | "tokenBatchTransfer" | "tokenBatchTransfer((address,uint256)[])" | "tokenBatchTransferFrom" | "tokenBatchTransferFrom((address,address,uint256)[])" | "tokenDecreaseAllowance" | "tokenDecreaseAllowance(address,uint256)" | "tokenIncreaseAllowance" | "tokenIncreaseAllowance(address,uint256)" | "tokenLock" | "tokenLock((address,address,uint256,uint256))" | "tokenTransfer" | "tokenTransfer(address,uint256)" | "tokenTransferFrom" | "tokenTransferFrom(address,address,uint256)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "assetBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetBalance()", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetInitStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetInitStatus()", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "initialize", values: [AssetERC20.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))", values: [AssetERC20.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "tokenApprove", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenApprove(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenBalance()", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenBatchLock", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchLock((address,address,uint256,uint256)[])", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer((address,uint256)[])", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom((address,address,uint256)[])", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenLock", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenLock((address,address,uint256,uint256))", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenTransfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenTransfer(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "assetBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetBalance()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetInitStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetInitStatus()", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBalance()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock((address,address,uint256,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer((address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom((address,address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock((address,address,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "AssetERC20Called(address,address,bytes4)": EventFragment;
        "AssetInitialized(address,address,string,string,bytes32)": EventFragment;
        "AssetSafeModeChanged(address,address,bytes32,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AssetERC20Called"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetERC20Called(address,address,bytes4)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetInitialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetInitialized(address,address,string,string,bytes32)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSafeModeChanged(address,address,bytes32,bool)"): EventFragment;
}
export interface AssetERC20CalledEventObject {
    sender: string;
    contractId: string;
    functionSelector: string;
}
export declare type AssetERC20CalledEvent = TypedEvent<[
    string,
    string,
    string
], AssetERC20CalledEventObject>;
export declare type AssetERC20CalledEventFilter = TypedEventFilter<AssetERC20CalledEvent>;
export interface AssetInitializedEventObject {
    sender: string;
    assetId: string;
    name: string;
    version: string;
    realm: string;
}
export declare type AssetInitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], AssetInitializedEventObject>;
export declare type AssetInitializedEventFilter = TypedEventFilter<AssetInitializedEvent>;
export interface AssetSafeModeChangedEventObject {
    sender: string;
    proxy: string;
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
export interface AssetERC20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AssetERC20Interface;
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
        assetBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
        "assetBalance()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        assetInitStatus(overrides?: CallOverrides): Promise<[boolean]>;
        "assetInitStatus()"(overrides?: CallOverrides): Promise<[boolean]>;
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
        initialize(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))"(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        tokenApprove(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenApprove(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
        "tokenBalance()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        tokenBatchLock(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchLock((address,address,uint256,uint256)[])"(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenDecreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenDecreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenIncreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenIncreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenLock(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenLock((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransfer(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransfer(address,uint256)"(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
    "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
    assetInitStatus(overrides?: CallOverrides): Promise<boolean>;
    "assetInitStatus()"(overrides?: CallOverrides): Promise<boolean>;
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
    initialize(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))"(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    tokenApprove(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenApprove(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBalance(overrides?: CallOverrides): Promise<BigNumber>;
    "tokenBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
    tokenBatchLock(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchLock((address,address,uint256,uint256)[])"(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenDecreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenDecreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenIncreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenIncreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenLock(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenLock((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransfer(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransfer(address,uint256)"(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetInitStatus(overrides?: CallOverrides): Promise<boolean>;
        "assetInitStatus()"(overrides?: CallOverrides): Promise<boolean>;
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
        initialize(request: AssetERC20.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))"(request: AssetERC20.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        tokenApprove(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenApprove(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "tokenBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
        tokenBatchLock(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        "tokenBatchLock((address,address,uint256,uint256)[])"(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        tokenBatchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenBatchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenDecreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenIncreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenLock(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        "tokenLock((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        tokenTransfer(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransfer(address,uint256)"(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AssetERC20Called(address,address,bytes4)"(sender?: PromiseOrValue<string> | null, contractId?: PromiseOrValue<string> | null, functionSelector?: PromiseOrValue<BytesLike> | null): AssetERC20CalledEventFilter;
        AssetERC20Called(sender?: PromiseOrValue<string> | null, contractId?: PromiseOrValue<string> | null, functionSelector?: PromiseOrValue<BytesLike> | null): AssetERC20CalledEventFilter;
        "AssetInitialized(address,address,string,string,bytes32)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null): AssetInitializedEventFilter;
        AssetInitialized(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null): AssetInitializedEventFilter;
        "AssetSafeModeChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): AssetSafeModeChangedEventFilter;
        AssetSafeModeChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): AssetSafeModeChangedEventFilter;
    };
    estimateGas: {
        assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
        assetInitStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "assetInitStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
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
        initialize(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))"(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenApprove(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenApprove(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "tokenBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
        tokenBatchLock(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchLock((address,address,uint256,uint256)[])"(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenDecreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenIncreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenLock(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenLock((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransfer(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransfer(address,uint256)"(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        assetBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetBalance()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        assetInitStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetInitStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        initialize(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize((string,string,bytes32,address,address,address,bytes32,bytes32,bytes32,bytes))"(request: AssetERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenApprove(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenApprove(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "tokenBalance()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenBatchLock(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchLock((address,address,uint256,uint256)[])"(lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenDecreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenDecreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenIncreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenIncreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenLock(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenLock((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransfer(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransfer(address,uint256)"(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
