/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ACLStorageInterface extends utils.Interface {
  functions: {
    "CTX_MESSAGE_TYPEHASH()": FunctionFragment;
    "FUNCTION_MESSAGE_TYPEHASH()": FunctionFragment;
    "PREDICT_CTX_MESSAGE_TYPEHASH()": FunctionFragment;
    "TYPE_HASH()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CTX_MESSAGE_TYPEHASH"
      | "CTX_MESSAGE_TYPEHASH()"
      | "FUNCTION_MESSAGE_TYPEHASH"
      | "FUNCTION_MESSAGE_TYPEHASH()"
      | "PREDICT_CTX_MESSAGE_TYPEHASH"
      | "PREDICT_CTX_MESSAGE_TYPEHASH()"
      | "TYPE_HASH"
      | "TYPE_HASH()"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CTX_MESSAGE_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CTX_MESSAGE_TYPEHASH()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FUNCTION_MESSAGE_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FUNCTION_MESSAGE_TYPEHASH()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TYPE_HASH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TYPE_HASH()",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "CTX_MESSAGE_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CTX_MESSAGE_TYPEHASH()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FUNCTION_MESSAGE_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FUNCTION_MESSAGE_TYPEHASH()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PREDICT_CTX_MESSAGE_TYPEHASH()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TYPE_HASH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TYPE_HASH()",
    data: BytesLike
  ): Result;

  events: {
    "ProxyUpgraded(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProxyUpgraded"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ProxyUpgraded(address,address,address)"
  ): EventFragment;
}

export interface ProxyUpgradedEventObject {
  sender: string;
  proxy: string;
  newImplementation: string;
}
export type ProxyUpgradedEvent = TypedEvent<
  [string, string, string],
  ProxyUpgradedEventObject
>;

export type ProxyUpgradedEventFilter = TypedEventFilter<ProxyUpgradedEvent>;

export interface ACLStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ACLStorageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;

    FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;

    PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    "PREDICT_CTX_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<[string]>;

    TYPE_HASH(overrides?: CallOverrides): Promise<[string]>;

    "TYPE_HASH()"(overrides?: CallOverrides): Promise<[string]>;
  };

  CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

  FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

  PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  "PREDICT_CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

  TYPE_HASH(overrides?: CallOverrides): Promise<string>;

  "TYPE_HASH()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

    FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    "FUNCTION_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

    PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    "PREDICT_CTX_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<string>;

    TYPE_HASH(overrides?: CallOverrides): Promise<string>;

    "TYPE_HASH()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ProxyUpgraded(address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null
    ): ProxyUpgradedEventFilter;
    ProxyUpgraded(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null
    ): ProxyUpgradedEventFilter;
  };

  estimateGas: {
    CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    "CTX_MESSAGE_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;

    FUNCTION_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    "FUNCTION_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    PREDICT_CTX_MESSAGE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    "PREDICT_CTX_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    TYPE_HASH(overrides?: CallOverrides): Promise<BigNumber>;

    "TYPE_HASH()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    CTX_MESSAGE_TYPEHASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "CTX_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    FUNCTION_MESSAGE_TYPEHASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "FUNCTION_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PREDICT_CTX_MESSAGE_TYPEHASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "PREDICT_CTX_MESSAGE_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    TYPE_HASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "TYPE_HASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
