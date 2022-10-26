import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
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
    type BatchUpdateTaxWhitelistRequestStruct = {
        account: PromiseOrValue<string>;
        isDeleted: PromiseOrValue<boolean>;
    };
    type BatchUpdateTaxWhitelistRequestStructOutput = [string, boolean] & {
        account: string;
        isDeleted: boolean;
    };
}
export interface IERC20ExtraInterface extends utils.Interface {
    functions: {
        "batchTransfer((address,uint256)[])": FunctionFragment;
        "batchTransferFrom((address,address,uint256)[])": FunctionFragment;
        "batchUpdateTaxWhitelist((address,bool)[])": FunctionFragment;
        "burn(address,uint256)": FunctionFragment;
        "decreaseAllowance(address,uint256)": FunctionFragment;
        "increaseAllowance(address,uint256)": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "nonce(address)": FunctionFragment;
        "permit(address,address,uint256,uint256,bytes)": FunctionFragment;
        "taxRate()": FunctionFragment;
        "taxTreasury()": FunctionFragment;
        "taxWhitelist()": FunctionFragment;
        "updateTaxRate(uint256)": FunctionFragment;
        "updateTaxWhitelist(address,bool)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "batchTransfer" | "batchTransfer((address,uint256)[])" | "batchTransferFrom" | "batchTransferFrom((address,address,uint256)[])" | "batchUpdateTaxWhitelist" | "batchUpdateTaxWhitelist((address,bool)[])" | "burn" | "burn(address,uint256)" | "decreaseAllowance" | "decreaseAllowance(address,uint256)" | "increaseAllowance" | "increaseAllowance(address,uint256)" | "mint" | "mint(address,uint256)" | "nonce" | "nonce(address)" | "permit" | "permit(address,address,uint256,uint256,bytes)" | "taxRate" | "taxRate()" | "taxTreasury" | "taxTreasury()" | "taxWhitelist" | "taxWhitelist()" | "updateTaxRate" | "updateTaxRate(uint256)" | "updateTaxWhitelist" | "updateTaxWhitelist(address,bool)"): FunctionFragment;
    encodeFunctionData(functionFragment: "batchTransfer", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransfer((address,uint256)[])", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom((address,address,uint256)[])", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUpdateTaxWhitelist", values: [IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUpdateTaxWhitelist((address,bool)[])", values: [IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "burn(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "decreaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "increaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "nonce", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nonce(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "permit", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "permit(address,address,uint256,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "taxRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxRate()", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxTreasury()", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxWhitelist", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxWhitelist()", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateTaxRate", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTaxRate(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTaxWhitelist", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "updateTaxWhitelist(address,bool)", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    decodeFunctionResult(functionFragment: "batchTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransfer((address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom((address,address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUpdateTaxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUpdateTaxWhitelist((address,bool)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit(address,address,uint256,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxRate()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxTreasury()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxWhitelist()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxRate(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxWhitelist(address,bool)", data: BytesLike): Result;
    events: {
        "ApprovalDecreased(address,address,uint256)": EventFragment;
        "ApprovalIncreased(address,address,uint256)": EventFragment;
        "BatchTransfer(address,uint256)": EventFragment;
        "BatchTransferFrom(address,uint256)": EventFragment;
        "Burn(address,address,uint256,uint256)": EventFragment;
        "Mint(address,address,uint256,uint256)": EventFragment;
        "TaxRateUpdated(address,uint256)": EventFragment;
        "TaxWhitelistUpdated(address,address,bool)": EventFragment;
        "TransferFrom(address,address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ApprovalDecreased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalDecreased(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalIncreased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalIncreased(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransfer(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransferFrom"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransferFrom(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Burn(address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Mint(address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxRateUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxRateUpdated(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxWhitelistUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxWhitelistUpdated(address,address,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferFrom"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferFrom(address,address,address,uint256)"): EventFragment;
}
export interface ApprovalDecreasedEventObject {
    owner: string;
    spender: string;
    amount: BigNumber;
}
export declare type ApprovalDecreasedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalDecreasedEventObject>;
export declare type ApprovalDecreasedEventFilter = TypedEventFilter<ApprovalDecreasedEvent>;
export interface ApprovalIncreasedEventObject {
    owner: string;
    spender: string;
    amount: BigNumber;
}
export declare type ApprovalIncreasedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalIncreasedEventObject>;
export declare type ApprovalIncreasedEventFilter = TypedEventFilter<ApprovalIncreasedEvent>;
export interface BatchTransferEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTransferEvent = TypedEvent<[
    string,
    BigNumber
], BatchTransferEventObject>;
export declare type BatchTransferEventFilter = TypedEventFilter<BatchTransferEvent>;
export interface BatchTransferFromEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTransferFromEvent = TypedEvent<[
    string,
    BigNumber
], BatchTransferFromEventObject>;
export declare type BatchTransferFromEventFilter = TypedEventFilter<BatchTransferFromEvent>;
export interface BurnEventObject {
    sender: string;
    account: string;
    amount: BigNumber;
    totalSupply: BigNumber;
}
export declare type BurnEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], BurnEventObject>;
export declare type BurnEventFilter = TypedEventFilter<BurnEvent>;
export interface MintEventObject {
    sender: string;
    account: string;
    amount: BigNumber;
    totalSupply: BigNumber;
}
export declare type MintEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], MintEventObject>;
export declare type MintEventFilter = TypedEventFilter<MintEvent>;
export interface TaxRateUpdatedEventObject {
    sender: string;
    rate: BigNumber;
}
export declare type TaxRateUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], TaxRateUpdatedEventObject>;
export declare type TaxRateUpdatedEventFilter = TypedEventFilter<TaxRateUpdatedEvent>;
export interface TaxWhitelistUpdatedEventObject {
    sender: string;
    account: string;
    isDeleted: boolean;
}
export declare type TaxWhitelistUpdatedEvent = TypedEvent<[
    string,
    string,
    boolean
], TaxWhitelistUpdatedEventObject>;
export declare type TaxWhitelistUpdatedEventFilter = TypedEventFilter<TaxWhitelistUpdatedEvent>;
export interface TransferFromEventObject {
    sender: string;
    from: string;
    to: string;
    amount: BigNumber;
}
export declare type TransferFromEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber
], TransferFromEventObject>;
export declare type TransferFromEventFilter = TypedEventFilter<TransferFromEvent>;
export interface IERC20Extra extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IERC20ExtraInterface;
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
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        taxRate(overrides?: CallOverrides): Promise<[BigNumber]>;
        "taxRate()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        taxTreasury(overrides?: CallOverrides): Promise<[string]>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<[string]>;
        taxWhitelist(overrides?: CallOverrides): Promise<[string[]]>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<[string[]]>;
        updateTaxRate(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateTaxRate(uint256)"(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    taxRate(overrides?: CallOverrides): Promise<BigNumber>;
    "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
    taxTreasury(overrides?: CallOverrides): Promise<string>;
    "taxTreasury()"(overrides?: CallOverrides): Promise<string>;
    taxWhitelist(overrides?: CallOverrides): Promise<string[]>;
    "taxWhitelist()"(overrides?: CallOverrides): Promise<string[]>;
    updateTaxRate(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateTaxRate(uint256)"(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: CallOverrides): Promise<void>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: CallOverrides): Promise<void>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        taxRate(overrides?: CallOverrides): Promise<BigNumber>;
        "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxTreasury(overrides?: CallOverrides): Promise<string>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<string>;
        taxWhitelist(overrides?: CallOverrides): Promise<string[]>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<string[]>;
        updateTaxRate(taxRate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "updateTaxRate(uint256)"(taxRate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "ApprovalDecreased(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalDecreasedEventFilter;
        ApprovalDecreased(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalDecreasedEventFilter;
        "ApprovalIncreased(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalIncreasedEventFilter;
        ApprovalIncreased(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalIncreasedEventFilter;
        "BatchTransfer(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferEventFilter;
        BatchTransfer(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferEventFilter;
        "BatchTransferFrom(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferFromEventFilter;
        BatchTransferFrom(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferFromEventFilter;
        "Burn(address,address,uint256,uint256)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): BurnEventFilter;
        Burn(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): BurnEventFilter;
        "Mint(address,address,uint256,uint256)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): MintEventFilter;
        Mint(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): MintEventFilter;
        "TaxRateUpdated(address,uint256)"(sender?: PromiseOrValue<string> | null, rate?: null): TaxRateUpdatedEventFilter;
        TaxRateUpdated(sender?: PromiseOrValue<string> | null, rate?: null): TaxRateUpdatedEventFilter;
        "TaxWhitelistUpdated(address,address,bool)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, isDeleted?: null): TaxWhitelistUpdatedEventFilter;
        TaxWhitelistUpdated(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, isDeleted?: null): TaxWhitelistUpdatedEventFilter;
        "TransferFrom(address,address,address,uint256)"(sender?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): TransferFromEventFilter;
        TransferFrom(sender?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): TransferFromEventFilter;
    };
    estimateGas: {
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        taxRate(overrides?: CallOverrides): Promise<BigNumber>;
        "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxTreasury(overrides?: CallOverrides): Promise<BigNumber>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxWhitelist(overrides?: CallOverrides): Promise<BigNumber>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<BigNumber>;
        updateTaxRate(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateTaxRate(uint256)"(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        taxRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxRate()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        taxTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        taxWhitelist(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateTaxRate(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateTaxRate(uint256)"(taxRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
