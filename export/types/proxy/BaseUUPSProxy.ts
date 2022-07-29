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

export interface BaseUUPSProxyInterface extends utils.Interface {
  functions: {
    "contractContext()": FunctionFragment;
    "contractName()": FunctionFragment;
    "contractRealm()": FunctionFragment;
    "contractVersion()": FunctionFragment;
    "domainSeperator()": FunctionFragment;
    "getAccessControlManager()": FunctionFragment;
    "getAdmin()": FunctionFragment;
    "getInitializeStatus()": FunctionFragment;
    "getInitializedVersion()": FunctionFragment;
    "isSafeMode()": FunctionFragment;
    "isUpgradable()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setSafeMode(bool)": FunctionFragment;
    "setUpgradeStatus(bool)": FunctionFragment;
    "subjectAddress()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "upgradeTo(address,bytes,bool)": FunctionFragment;
    "withdrawBalance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "contractContext"
      | "contractContext()"
      | "contractName"
      | "contractName()"
      | "contractRealm"
      | "contractRealm()"
      | "contractVersion"
      | "contractVersion()"
      | "domainSeperator"
      | "domainSeperator()"
      | "getAccessControlManager"
      | "getAccessControlManager()"
      | "getAdmin"
      | "getAdmin()"
      | "getInitializeStatus"
      | "getInitializeStatus()"
      | "getInitializedVersion"
      | "getInitializedVersion()"
      | "isSafeMode"
      | "isSafeMode()"
      | "isUpgradable"
      | "isUpgradable()"
      | "proxiableUUID"
      | "proxiableUUID()"
      | "setAdmin"
      | "setAdmin(address)"
      | "setSafeMode"
      | "setSafeMode(bool)"
      | "setUpgradeStatus"
      | "setUpgradeStatus(bool)"
      | "subjectAddress"
      | "subjectAddress()"
      | "supportsInterface"
      | "supportsInterface(bytes4)"
      | "upgradeTo"
      | "upgradeTo(address,bytes,bool)"
      | "withdrawBalance"
      | "withdrawBalance(address)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "contractContext",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractContext()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractName()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractRealm",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractRealm()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractVersion()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "domainSeperator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "domainSeperator()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAccessControlManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAccessControlManager()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getAdmin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAdmin()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializeStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializeStatus()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializedVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializedVersion()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSafeMode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSafeMode()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isUpgradable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isUpgradable()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setAdmin(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSafeMode",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSafeMode(bool)",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpgradeStatus",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpgradeStatus(bool)",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "subjectAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subjectAddress()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface(bytes4)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo(address,bytes,bool)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBalance(address)",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "contractContext",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractContext()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractName()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractRealm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractRealm()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractVersion()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainSeperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainSeperator()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccessControlManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccessControlManager()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAdmin()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInitializeStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitializeStatus()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitializedVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitializedVersion()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isSafeMode", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isSafeMode()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUpgradable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUpgradable()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAdmin(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSafeMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSafeMode(bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpgradeStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpgradeStatus(bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subjectAddress()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface(bytes4)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeTo(address,bytes,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBalance(address)",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address,address)": EventFragment;
    "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
    "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
    "UpgradeStatusChanged(address,address,bytes32,bool)": EventFragment;
    "Upgraded(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "AdminChanged(address,address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,bytes32,uint16)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SafeModeChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "SafeModeChanged(address,address,bytes32,bool)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "UpgradeStatusChanged(address,address,bytes32,bool)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "Upgraded(address,address,address)"
  ): EventFragment;
}

export interface AdminChangedEventObject {
  sender: string;
  proxy: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface InitializedEventObject {
  sender: string;
  proxy: string;
  subject: string;
  name: string;
  version: string;
  realm: string;
  initializedCount: number;
}
export type InitializedEvent = TypedEvent<
  [string, string, string, string, string, string, number],
  InitializedEventObject
>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface SafeModeChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  status: boolean;
}
export type SafeModeChangedEvent = TypedEvent<
  [string, string, string, boolean],
  SafeModeChangedEventObject
>;

export type SafeModeChangedEventFilter = TypedEventFilter<SafeModeChangedEvent>;

export interface UpgradeStatusChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  status: boolean;
}
export type UpgradeStatusChangedEvent = TypedEvent<
  [string, string, string, boolean],
  UpgradeStatusChangedEventObject
>;

export type UpgradeStatusChangedEventFilter =
  TypedEventFilter<UpgradeStatusChangedEvent>;

export interface UpgradedEventObject {
  sender: string;
  proxy: string;
  newImplementation: string;
}
export type UpgradedEvent = TypedEvent<
  [string, string, string],
  UpgradedEventObject
>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface BaseUUPSProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseUUPSProxyInterface;

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
    contractContext(overrides?: CallOverrides): Promise<[string]>;

    "contractContext()"(overrides?: CallOverrides): Promise<[string]>;

    contractName(overrides?: CallOverrides): Promise<[string]>;

    "contractName()"(overrides?: CallOverrides): Promise<[string]>;

    contractRealm(overrides?: CallOverrides): Promise<[string]>;

    "contractRealm()"(overrides?: CallOverrides): Promise<[string]>;

    contractVersion(overrides?: CallOverrides): Promise<[string]>;

    "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;

    domainSeperator(overrides?: CallOverrides): Promise<[string]>;

    "domainSeperator()"(overrides?: CallOverrides): Promise<[string]>;

    getAccessControlManager(overrides?: CallOverrides): Promise<[string]>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<[string]>;

    getAdmin(overrides?: CallOverrides): Promise<[string]>;

    "getAdmin()"(overrides?: CallOverrides): Promise<[string]>;

    getInitializeStatus(overrides?: CallOverrides): Promise<[boolean]>;

    "getInitializeStatus()"(overrides?: CallOverrides): Promise<[boolean]>;

    getInitializedVersion(overrides?: CallOverrides): Promise<[number]>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<[number]>;

    isSafeMode(overrides?: CallOverrides): Promise<[boolean]>;

    "isSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;

    isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;

    "isUpgradable()"(overrides?: CallOverrides): Promise<[boolean]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;

    setAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setAdmin(address)"(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    subjectAddress(overrides?: CallOverrides): Promise<[string]>;

    "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "supportsInterface(bytes4)"(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  contractContext(overrides?: CallOverrides): Promise<string>;

  "contractContext()"(overrides?: CallOverrides): Promise<string>;

  contractName(overrides?: CallOverrides): Promise<string>;

  "contractName()"(overrides?: CallOverrides): Promise<string>;

  contractRealm(overrides?: CallOverrides): Promise<string>;

  "contractRealm()"(overrides?: CallOverrides): Promise<string>;

  contractVersion(overrides?: CallOverrides): Promise<string>;

  "contractVersion()"(overrides?: CallOverrides): Promise<string>;

  domainSeperator(overrides?: CallOverrides): Promise<string>;

  "domainSeperator()"(overrides?: CallOverrides): Promise<string>;

  getAccessControlManager(overrides?: CallOverrides): Promise<string>;

  "getAccessControlManager()"(overrides?: CallOverrides): Promise<string>;

  getAdmin(overrides?: CallOverrides): Promise<string>;

  "getAdmin()"(overrides?: CallOverrides): Promise<string>;

  getInitializeStatus(overrides?: CallOverrides): Promise<boolean>;

  "getInitializeStatus()"(overrides?: CallOverrides): Promise<boolean>;

  getInitializedVersion(overrides?: CallOverrides): Promise<number>;

  "getInitializedVersion()"(overrides?: CallOverrides): Promise<number>;

  isSafeMode(overrides?: CallOverrides): Promise<boolean>;

  "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;

  isUpgradable(overrides?: CallOverrides): Promise<boolean>;

  "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

  setAdmin(
    newAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setAdmin(address)"(
    newAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSafeMode(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setSafeMode(bool)"(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUpgradeStatus(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setUpgradeStatus(bool)"(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  subjectAddress(overrides?: CallOverrides): Promise<string>;

  "subjectAddress()"(overrides?: CallOverrides): Promise<string>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "upgradeTo(address,bytes,bool)"(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawBalance(
    recepient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "withdrawBalance(address)"(
    recepient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    contractContext(overrides?: CallOverrides): Promise<string>;

    "contractContext()"(overrides?: CallOverrides): Promise<string>;

    contractName(overrides?: CallOverrides): Promise<string>;

    "contractName()"(overrides?: CallOverrides): Promise<string>;

    contractRealm(overrides?: CallOverrides): Promise<string>;

    "contractRealm()"(overrides?: CallOverrides): Promise<string>;

    contractVersion(overrides?: CallOverrides): Promise<string>;

    "contractVersion()"(overrides?: CallOverrides): Promise<string>;

    domainSeperator(overrides?: CallOverrides): Promise<string>;

    "domainSeperator()"(overrides?: CallOverrides): Promise<string>;

    getAccessControlManager(overrides?: CallOverrides): Promise<string>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<string>;

    getAdmin(overrides?: CallOverrides): Promise<string>;

    "getAdmin()"(overrides?: CallOverrides): Promise<string>;

    getInitializeStatus(overrides?: CallOverrides): Promise<boolean>;

    "getInitializeStatus()"(overrides?: CallOverrides): Promise<boolean>;

    getInitializedVersion(overrides?: CallOverrides): Promise<number>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<number>;

    isSafeMode(overrides?: CallOverrides): Promise<boolean>;

    "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;

    isUpgradable(overrides?: CallOverrides): Promise<boolean>;

    "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

    setAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setAdmin(address)"(
      newAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    subjectAddress(overrides?: CallOverrides): Promise<string>;

    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;

    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "Initialized(address,address,address,string,string,bytes32,uint16)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      subject?: PromiseOrValue<string> | null,
      name?: null,
      version?: null,
      realm?: null,
      initializedCount?: null
    ): InitializedEventFilter;
    Initialized(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      subject?: PromiseOrValue<string> | null,
      name?: null,
      version?: null,
      realm?: null,
      initializedCount?: null
    ): InitializedEventFilter;

    "SafeModeChanged(address,address,bytes32,bool)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): SafeModeChangedEventFilter;
    SafeModeChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): SafeModeChangedEventFilter;

    "UpgradeStatusChanged(address,address,bytes32,bool)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): UpgradeStatusChangedEventFilter;
    UpgradeStatusChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): UpgradeStatusChangedEventFilter;

    "Upgraded(address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newImplementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    contractContext(overrides?: CallOverrides): Promise<BigNumber>;

    "contractContext()"(overrides?: CallOverrides): Promise<BigNumber>;

    contractName(overrides?: CallOverrides): Promise<BigNumber>;

    "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;

    contractRealm(overrides?: CallOverrides): Promise<BigNumber>;

    "contractRealm()"(overrides?: CallOverrides): Promise<BigNumber>;

    contractVersion(overrides?: CallOverrides): Promise<BigNumber>;

    "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;

    domainSeperator(overrides?: CallOverrides): Promise<BigNumber>;

    "domainSeperator()"(overrides?: CallOverrides): Promise<BigNumber>;

    getAccessControlManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    getAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    "getAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;

    getInitializeStatus(overrides?: CallOverrides): Promise<BigNumber>;

    "getInitializeStatus()"(overrides?: CallOverrides): Promise<BigNumber>;

    getInitializedVersion(overrides?: CallOverrides): Promise<BigNumber>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<BigNumber>;

    isSafeMode(overrides?: CallOverrides): Promise<BigNumber>;

    "isSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;

    isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;

    "isUpgradable()"(overrides?: CallOverrides): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setAdmin(address)"(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    contractContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "contractContext()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "contractRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "contractVersion()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    domainSeperator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "domainSeperator()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccessControlManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAccessControlManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInitializeStatus(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getInitializeStatus()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInitializedVersion(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getInitializedVersion()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isUpgradable()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAdmin(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setAdmin(address)"(
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "subjectAddress()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
