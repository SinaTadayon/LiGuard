import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IShortTermDepositeInterface extends utils.Interface {
  functions: {
    "claimStd()": FunctionFragment;
    "depositeStd(uint256)": FunctionFragment;
    "getStdInfo(address)": FunctionFragment;
    "withdrawStd(uint256)": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "claimStd"
      | "claimStd()"
      | "depositeStd"
      | "depositeStd(uint256)"
      | "getStdInfo"
      | "getStdInfo(address)"
      | "withdrawStd"
      | "withdrawStd(uint256)"
  ): FunctionFragment;
  encodeFunctionData(functionFragment: "claimStd", values?: undefined): string;
  encodeFunctionData(functionFragment: "claimStd()", values?: undefined): string;
  encodeFunctionData(functionFragment: "depositeStd", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "depositeStd(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "getStdInfo", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getStdInfo(address)", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "withdrawStd", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "withdrawStd(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
  decodeFunctionResult(functionFragment: "claimStd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimStd()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositeStd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositeStd(uint256)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStdInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStdInfo(address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawStd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawStd(uint256)", data: BytesLike): Result;
  events: {
    "STDClaimed(address,uint256,uint256,uint128,uint64)": EventFragment;
    "STDDeposited(address,uint256,uint256,uint256,uint128,uint64)": EventFragment;
    "STDWithdrawn(address,uint256,uint256,uint256,uint128,uint64)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "STDClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STDClaimed(address,uint256,uint256,uint128,uint64)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STDDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STDDeposited(address,uint256,uint256,uint256,uint128,uint64)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STDWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STDWithdrawn(address,uint256,uint256,uint256,uint128,uint64)"): EventFragment;
}
export interface STDClaimedEventObject {
  sender: string;
  balance: BigNumber;
  interest: BigNumber;
  timestamp: BigNumber;
  aprId: BigNumber;
}
export declare type STDClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  STDClaimedEventObject
>;
export declare type STDClaimedEventFilter = TypedEventFilter<STDClaimedEvent>;
export interface STDDepositedEventObject {
  sender: string;
  amount: BigNumber;
  balance: BigNumber;
  interest: BigNumber;
  timestamp: BigNumber;
  aprId: BigNumber;
}
export declare type STDDepositedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  STDDepositedEventObject
>;
export declare type STDDepositedEventFilter = TypedEventFilter<STDDepositedEvent>;
export interface STDWithdrawnEventObject {
  sender: string;
  amount: BigNumber;
  balance: BigNumber;
  interest: BigNumber;
  timestamp: BigNumber;
  aprId: BigNumber;
}
export declare type STDWithdrawnEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  STDWithdrawnEventObject
>;
export declare type STDWithdrawnEventFilter = TypedEventFilter<STDWithdrawnEvent>;
export interface IShortTermDeposite extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IShortTermDepositeInterface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    claimStd(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "claimStd()"(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    depositeStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "depositeStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    getStdInfo(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
    "getStdInfo(address)"(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
    withdrawStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "withdrawStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
  };
  claimStd(
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "claimStd()"(
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  depositeStd(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "depositeStd(uint256)"(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  getStdInfo(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
  "getStdInfo(address)"(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
  withdrawStd(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "withdrawStd(uint256)"(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    claimStd(overrides?: CallOverrides): Promise<BigNumber>;
    "claimStd()"(overrides?: CallOverrides): Promise<BigNumber>;
    depositeStd(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "depositeStd(uint256)"(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getStdInfo(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
    "getStdInfo(address)"(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;
    withdrawStd(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "withdrawStd(uint256)"(amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {
    "STDClaimed(address,uint256,uint256,uint128,uint64)"(
      sender?: PromiseOrValue<string> | null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDClaimedEventFilter;
    STDClaimed(
      sender?: PromiseOrValue<string> | null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDClaimedEventFilter;
    "STDDeposited(address,uint256,uint256,uint256,uint128,uint64)"(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDDepositedEventFilter;
    STDDeposited(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDDepositedEventFilter;
    "STDWithdrawn(address,uint256,uint256,uint256,uint128,uint64)"(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDWithdrawnEventFilter;
    STDWithdrawn(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null,
      interest?: null,
      timestamp?: null,
      aprId?: null
    ): STDWithdrawnEventFilter;
  };
  estimateGas: {
    claimStd(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "claimStd()"(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    depositeStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "depositeStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    getStdInfo(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "getStdInfo(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    withdrawStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "withdrawStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    claimStd(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "claimStd()"(
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    depositeStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "depositeStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    getStdInfo(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getStdInfo(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    withdrawStd(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "withdrawStd(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
