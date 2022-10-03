import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
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
export interface IAssetERC20Interface extends utils.Interface {
    functions: {
        "assetBalance()": FunctionFragment;
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
    };
    getFunction(nameOrSignatureOrTopic: "assetBalance" | "assetBalance()" | "tokenApprove" | "tokenApprove(address,uint256)" | "tokenBalance" | "tokenBalance()" | "tokenBatchLock" | "tokenBatchLock((address,address,uint256,uint256)[])" | "tokenBatchTransfer" | "tokenBatchTransfer((address,uint256)[])" | "tokenBatchTransferFrom" | "tokenBatchTransferFrom((address,address,uint256)[])" | "tokenDecreaseAllowance" | "tokenDecreaseAllowance(address,uint256)" | "tokenIncreaseAllowance" | "tokenIncreaseAllowance(address,uint256)" | "tokenLock" | "tokenLock((address,address,uint256,uint256))" | "tokenTransfer" | "tokenTransfer(address,uint256)" | "tokenTransferFrom" | "tokenTransferFrom(address,address,uint256)"): FunctionFragment;
    encodeFunctionData(functionFragment: "assetBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetBalance()", values?: undefined): string;
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
    decodeFunctionResult(functionFragment: "assetBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetBalance()", data: BytesLike): Result;
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
    events: {
        "AssetERC20Called(address,address,bytes4)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AssetERC20Called"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetERC20Called(address,address,bytes4)"): EventFragment;
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
export interface IAssetERC20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAssetERC20Interface;
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
    };
    assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
    "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
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
    callStatic: {
        assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
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
    };
    filters: {
        "AssetERC20Called(address,address,bytes4)"(sender?: PromiseOrValue<string> | null, contractId?: PromiseOrValue<string> | null, functionSelector?: PromiseOrValue<BytesLike> | null): AssetERC20CalledEventFilter;
        AssetERC20Called(sender?: PromiseOrValue<string> | null, contractId?: PromiseOrValue<string> | null, functionSelector?: PromiseOrValue<BytesLike> | null): AssetERC20CalledEventFilter;
    };
    estimateGas: {
        assetBalance(overrides?: CallOverrides): Promise<BigNumber>;
        "assetBalance()"(overrides?: CallOverrides): Promise<BigNumber>;
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
    };
    populateTransaction: {
        assetBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "assetBalance()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    };
}
