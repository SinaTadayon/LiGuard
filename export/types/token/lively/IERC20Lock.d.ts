import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
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
    type UnLockTokenRequestStruct = {
        lockId: PromiseOrValue<BytesLike>;
        account: PromiseOrValue<string>;
        reason: PromiseOrValue<string>;
    };
    type UnLockTokenRequestStructOutput = [string, string, string] & {
        lockId: string;
        account: string;
        reason: string;
    };
}
export interface IERC20LockInterface extends utils.Interface {
    functions: {
        "batchClaimToken(bytes32[])": FunctionFragment;
        "batchLockToken((address,address,uint256,uint256)[])": FunctionFragment;
        "batchUnlockToken((bytes32,address,string)[])": FunctionFragment;
        "claimToken(bytes32)": FunctionFragment;
        "lockBalanceOf(address)": FunctionFragment;
        "lockInfo(bytes32,address)": FunctionFragment;
        "lockToken((address,address,uint256,uint256))": FunctionFragment;
        "totalBalanceOf(address)": FunctionFragment;
        "unlockToken((bytes32,address,string))": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "batchClaimToken" | "batchClaimToken(bytes32[])" | "batchLockToken" | "batchLockToken((address,address,uint256,uint256)[])" | "batchUnlockToken" | "batchUnlockToken((bytes32,address,string)[])" | "claimToken" | "claimToken(bytes32)" | "lockBalanceOf" | "lockBalanceOf(address)" | "lockInfo" | "lockInfo(bytes32,address)" | "lockToken" | "lockToken((address,address,uint256,uint256))" | "totalBalanceOf" | "totalBalanceOf(address)" | "unlockToken" | "unlockToken((bytes32,address,string))"): FunctionFragment;
    encodeFunctionData(functionFragment: "batchClaimToken", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "batchClaimToken(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "batchLockToken", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchLockToken((address,address,uint256,uint256)[])", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUnlockToken", values: [IERC20Lock.UnLockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUnlockToken((bytes32,address,string)[])", values: [IERC20Lock.UnLockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "claimToken", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "claimToken(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "lockBalanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockBalanceOf(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockInfo", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockInfo(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockToken", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "lockToken((address,address,uint256,uint256))", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "totalBalanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalBalanceOf(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "unlockToken", values: [IERC20Lock.UnLockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "unlockToken((bytes32,address,string))", values: [IERC20Lock.UnLockTokenRequestStruct]): string;
    decodeFunctionResult(functionFragment: "batchClaimToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchClaimToken(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchLockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchLockToken((address,address,uint256,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUnlockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUnlockToken((bytes32,address,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToken(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockBalanceOf(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockInfo(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockToken((address,address,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalBalanceOf(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockToken((bytes32,address,string))", data: BytesLike): Result;
    events: {
        "BatchTokenClaimed(address,uint256)": EventFragment;
        "BatchTokenLocked(address,uint256)": EventFragment;
        "BatchTokenUnlocked(address,uint256)": EventFragment;
        "TokenClaimed(bytes32,address,address,uint256)": EventFragment;
        "TokenLocked(bytes32,address,address,address,uint256,uint256)": EventFragment;
        "TokenUnlocked(bytes32,address,address,address,uint256,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BatchTokenClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenClaimed(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenLocked(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenUnlocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenUnlocked(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenClaimed(bytes32,address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenLocked(bytes32,address,address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenUnlocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenUnlocked(bytes32,address,address,address,uint256,string)"): EventFragment;
}
export interface BatchTokenClaimedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenClaimedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenClaimedEventObject>;
export declare type BatchTokenClaimedEventFilter = TypedEventFilter<BatchTokenClaimedEvent>;
export interface BatchTokenLockedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenLockedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenLockedEventObject>;
export declare type BatchTokenLockedEventFilter = TypedEventFilter<BatchTokenLockedEvent>;
export interface BatchTokenUnlockedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenUnlockedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenUnlockedEventObject>;
export declare type BatchTokenUnlockedEventFilter = TypedEventFilter<BatchTokenUnlockedEvent>;
export interface TokenClaimedEventObject {
    id: string;
    sender: string;
    src: string;
    amount: BigNumber;
}
export declare type TokenClaimedEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber
], TokenClaimedEventObject>;
export declare type TokenClaimedEventFilter = TypedEventFilter<TokenClaimedEvent>;
export interface TokenLockedEventObject {
    id: string;
    sender: string;
    src: string;
    account: string;
    timestamp: BigNumber;
    amount: BigNumber;
}
export declare type TokenLockedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
], TokenLockedEventObject>;
export declare type TokenLockedEventFilter = TypedEventFilter<TokenLockedEvent>;
export interface TokenUnlockedEventObject {
    id: string;
    sender: string;
    account: string;
    dest: string;
    amount: BigNumber;
    reason: string;
}
export declare type TokenUnlockedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], TokenUnlockedEventObject>;
export declare type TokenUnlockedEventFilter = TypedEventFilter<TokenUnlockedEvent>;
export interface IERC20Lock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IERC20LockInterface;
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
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
    "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
    lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<BigNumber>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<BigNumber>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: CallOverrides): Promise<BigNumber>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "BatchTokenClaimed(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenClaimedEventFilter;
        BatchTokenClaimed(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenClaimedEventFilter;
        "BatchTokenLocked(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenLockedEventFilter;
        BatchTokenLocked(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenLockedEventFilter;
        "BatchTokenUnlocked(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenUnlockedEventFilter;
        BatchTokenUnlocked(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenUnlockedEventFilter;
        "TokenClaimed(bytes32,address,address,uint256)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, amount?: null): TokenClaimedEventFilter;
        TokenClaimed(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, amount?: null): TokenClaimedEventFilter;
        "TokenLocked(bytes32,address,address,address,uint256,uint256)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, account?: null, timestamp?: null, amount?: null): TokenLockedEventFilter;
        TokenLocked(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, account?: null, timestamp?: null, amount?: null): TokenLockedEventFilter;
        "TokenUnlocked(bytes32,address,address,address,uint256,string)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, dest?: null, amount?: null, reason?: null): TokenUnlockedEventFilter;
        TokenUnlocked(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, dest?: null, amount?: null, reason?: null): TokenUnlockedEventFilter;
    };
    estimateGas: {
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
