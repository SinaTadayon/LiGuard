/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface IProxyInterface extends utils.Interface {
  functions: {
    "getProxyAdmin()": FunctionFragment;
    "implementation()": FunctionFragment;
    "isActivated()": FunctionFragment;
    "isUpgradable()": FunctionFragment;
    "setActivity(bool)": FunctionFragment;
    "setProxyAdmin(address)": FunctionFragment;
    "setUpgradability(bool)": FunctionFragment;
    "subjectContext()": FunctionFragment;
    "subjectName()": FunctionFragment;
    "subjectRealm()": FunctionFragment;
    "subjectVersion()": FunctionFragment;
    "upgradeTo(address,bytes,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getProxyAdmin"
      | "implementation"
      | "isActivated"
      | "isUpgradable"
      | "setActivity"
      | "setProxyAdmin"
      | "setUpgradability"
      | "subjectContext"
      | "subjectName"
      | "subjectRealm"
      | "subjectVersion"
      | "upgradeTo"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getProxyAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isActivated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isUpgradable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setActivity",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setProxyAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpgradability",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "subjectContext",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subjectName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subjectRealm",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subjectVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<boolean>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getProxyAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isActivated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUpgradable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setActivity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProxyAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpgradability",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectContext",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectRealm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;

  events: {
    "ActivityChanged(address,address,bytes32,bool)": EventFragment;
    "ProxyAdminChanged(address,address,address,address)": EventFragment;
    "ProxyUpgraded(address,address,address,address,string,string)": EventFragment;
    "UpgradablilityChanged(address,address,bytes32,bool)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActivityChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProxyAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProxyUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpgradablilityChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface ActivityChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  value: boolean;
}
export type ActivityChangedEvent = TypedEvent<
  [string, string, string, boolean],
  ActivityChangedEventObject
>;

export type ActivityChangedEventFilter = TypedEventFilter<ActivityChangedEvent>;

export interface ProxyAdminChangedEventObject {
  sender: string;
  proxy: string;
  previousAdmin: string;
  newAdmin: string;
}
export type ProxyAdminChangedEvent = TypedEvent<
  [string, string, string, string],
  ProxyAdminChangedEventObject
>;

export type ProxyAdminChangedEventFilter =
  TypedEventFilter<ProxyAdminChangedEvent>;

export interface ProxyUpgradedEventObject {
  sender: string;
  proxy: string;
  newImplementation: string;
  oldImplementation: string;
  newVersion: string;
  oldVersion: string;
}
export type ProxyUpgradedEvent = TypedEvent<
  [string, string, string, string, string, string],
  ProxyUpgradedEventObject
>;

export type ProxyUpgradedEventFilter = TypedEventFilter<ProxyUpgradedEvent>;

export interface UpgradablilityChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  value: boolean;
}
export type UpgradablilityChangedEvent = TypedEvent<
  [string, string, string, boolean],
  UpgradablilityChangedEventObject
>;

export type UpgradablilityChangedEventFilter =
  TypedEventFilter<UpgradablilityChangedEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface IProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProxyInterface;

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
    getProxyAdmin(overrides?: CallOverrides): Promise<[string]>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    isActivated(overrides?: CallOverrides): Promise<[boolean]>;

    isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;

    setActivity(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setProxyAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUpgradability(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    subjectContext(overrides?: CallOverrides): Promise<[string]>;

    subjectName(overrides?: CallOverrides): Promise<[string]>;

    subjectRealm(overrides?: CallOverrides): Promise<[string]>;

    subjectVersion(overrides?: CallOverrides): Promise<[string]>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceInitCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getProxyAdmin(overrides?: CallOverrides): Promise<string>;

  implementation(overrides?: CallOverrides): Promise<string>;

  isActivated(overrides?: CallOverrides): Promise<boolean>;

  isUpgradable(overrides?: CallOverrides): Promise<boolean>;

  setActivity(
    value: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setProxyAdmin(
    newAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUpgradability(
    value: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  subjectContext(overrides?: CallOverrides): Promise<string>;

  subjectName(overrides?: CallOverrides): Promise<string>;

  subjectRealm(overrides?: CallOverrides): Promise<string>;

  subjectVersion(overrides?: CallOverrides): Promise<string>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceInitCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getProxyAdmin(overrides?: CallOverrides): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;

    isActivated(overrides?: CallOverrides): Promise<boolean>;

    isUpgradable(overrides?: CallOverrides): Promise<boolean>;

    setActivity(
      value: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setProxyAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setUpgradability(
      value: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    subjectContext(overrides?: CallOverrides): Promise<string>;

    subjectName(overrides?: CallOverrides): Promise<string>;

    subjectRealm(overrides?: CallOverrides): Promise<string>;

    subjectVersion(overrides?: CallOverrides): Promise<string>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceInitCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "ActivityChanged(address,address,bytes32,bool)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      value?: null
    ): ActivityChangedEventFilter;
    ActivityChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      value?: null
    ): ActivityChangedEventFilter;

    "ProxyAdminChanged(address,address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      previousAdmin?: null,
      newAdmin?: null
    ): ProxyAdminChangedEventFilter;
    ProxyAdminChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      previousAdmin?: null,
      newAdmin?: null
    ): ProxyAdminChangedEventFilter;

    "ProxyUpgraded(address,address,address,address,string,string)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null,
      oldImplementation?: null,
      newVersion?: null,
      oldVersion?: null
    ): ProxyUpgradedEventFilter;
    ProxyUpgraded(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null,
      oldImplementation?: null,
      newVersion?: null,
      oldVersion?: null
    ): ProxyUpgradedEventFilter;

    "UpgradablilityChanged(address,address,bytes32,bool)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      value?: null
    ): UpgradablilityChangedEventFilter;
    UpgradablilityChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      value?: null
    ): UpgradablilityChangedEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    getProxyAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    isActivated(overrides?: CallOverrides): Promise<BigNumber>;

    isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;

    setActivity(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setProxyAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUpgradability(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    subjectContext(overrides?: CallOverrides): Promise<BigNumber>;

    subjectName(overrides?: CallOverrides): Promise<BigNumber>;

    subjectRealm(overrides?: CallOverrides): Promise<BigNumber>;

    subjectVersion(overrides?: CallOverrides): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceInitCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getProxyAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isActivated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setActivity(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setProxyAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUpgradability(
      value: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    subjectContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    subjectName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    subjectRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    subjectVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceInitCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
