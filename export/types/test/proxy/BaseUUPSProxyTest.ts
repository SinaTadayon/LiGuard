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
  PayableOverrides,
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
} from "../../common";

export interface BaseUUPSProxyTestInterface extends utils.Interface {
  functions: {
    "contractContext()": FunctionFragment;
    "contractName()": FunctionFragment;
    "contractRealm()": FunctionFragment;
    "contractVersion()": FunctionFragment;
    "getAccessControlManager()": FunctionFragment;
    "getAdmin()": FunctionFragment;
    "getInitializeState()": FunctionFragment;
    "getInitializedVersion()": FunctionFragment;
    "initialize(string,string,string,address)": FunctionFragment;
    "isSafeMode()": FunctionFragment;
    "isUpgradable()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setSafeMode(bool)": FunctionFragment;
    "setUpgradeState(bool)": FunctionFragment;
    "subjectAddress()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeTo(address,bytes,bool)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
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
      | "getAccessControlManager"
      | "getAccessControlManager()"
      | "getAdmin"
      | "getAdmin()"
      | "getInitializeState"
      | "getInitializeState()"
      | "getInitializedVersion"
      | "getInitializedVersion()"
      | "initialize"
      | "initialize(string,string,string,address)"
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
      | "setUpgradeState"
      | "setUpgradeState(bool)"
      | "subjectAddress"
      | "subjectAddress()"
      | "supportsInterface"
      | "supportsInterface(bytes4)"
      | "upgradeTo(address)"
      | "upgradeTo(address,bytes,bool)"
      | "upgradeToAndCall"
      | "upgradeToAndCall(address,bytes)"
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
    functionFragment: "getInitializeState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializeState()",
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
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(string,string,string,address)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
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
    functionFragment: "setUpgradeState",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpgradeState(bool)",
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
    functionFragment: "upgradeTo(address)",
    values: [PromiseOrValue<string>]
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
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall(address,bytes)",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
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
    functionFragment: "getInitializeState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitializeState()",
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
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialize(string,string,string,address)",
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
    functionFragment: "setUpgradeState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpgradeState(bool)",
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
  decodeFunctionResult(
    functionFragment: "upgradeTo(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeTo(address,bytes,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall(address,bytes)",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address,address)": EventFragment;
    "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
    "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
    "UpgradeStateChanged(address,address,bytes32,bool)": EventFragment;
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
  getEvent(nameOrSignatureOrTopic: "UpgradeStateChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "UpgradeStateChanged(address,address,bytes32,bool)"
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
  state: boolean;
}
export type SafeModeChangedEvent = TypedEvent<
  [string, string, string, boolean],
  SafeModeChangedEventObject
>;

export type SafeModeChangedEventFilter = TypedEventFilter<SafeModeChangedEvent>;

export interface UpgradeStateChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  state: boolean;
}
export type UpgradeStateChangedEvent = TypedEvent<
  [string, string, string, boolean],
  UpgradeStateChangedEventObject
>;

export type UpgradeStateChangedEventFilter =
  TypedEventFilter<UpgradeStateChangedEvent>;

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

export interface BaseUUPSProxyTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseUUPSProxyTestInterface;

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

    getAccessControlManager(overrides?: CallOverrides): Promise<[string]>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<[string]>;

    getAdmin(overrides?: CallOverrides): Promise<[string]>;

    "getAdmin()"(overrides?: CallOverrides): Promise<[string]>;

    getInitializeState(overrides?: CallOverrides): Promise<[boolean]>;

    "getInitializeState()"(overrides?: CallOverrides): Promise<[boolean]>;

    getInitializedVersion(overrides?: CallOverrides): Promise<[number]>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<[number]>;

    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

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
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setSafeMode(bool)"(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUpgradeState(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setUpgradeState(bool)"(
      state: PromiseOrValue<boolean>,
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

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
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

  getAccessControlManager(overrides?: CallOverrides): Promise<string>;

  "getAccessControlManager()"(overrides?: CallOverrides): Promise<string>;

  getAdmin(overrides?: CallOverrides): Promise<string>;

  "getAdmin()"(overrides?: CallOverrides): Promise<string>;

  getInitializeState(overrides?: CallOverrides): Promise<boolean>;

  "getInitializeState()"(overrides?: CallOverrides): Promise<boolean>;

  getInitializedVersion(overrides?: CallOverrides): Promise<number>;

  "getInitializedVersion()"(overrides?: CallOverrides): Promise<number>;

  initialize(
    domainName: PromiseOrValue<string>,
    domainVersion: PromiseOrValue<string>,
    domainRealm: PromiseOrValue<string>,
    accessControlManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "initialize(string,string,string,address)"(
    domainName: PromiseOrValue<string>,
    domainVersion: PromiseOrValue<string>,
    domainRealm: PromiseOrValue<string>,
    accessControlManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

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
    state: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setSafeMode(bool)"(
    state: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUpgradeState(
    state: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setUpgradeState(bool)"(
    state: PromiseOrValue<boolean>,
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

  "upgradeTo(address)"(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "upgradeTo(address,bytes,bool)"(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "upgradeToAndCall(address,bytes)"(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
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

    getAccessControlManager(overrides?: CallOverrides): Promise<string>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<string>;

    getAdmin(overrides?: CallOverrides): Promise<string>;

    "getAdmin()"(overrides?: CallOverrides): Promise<string>;

    getInitializeState(overrides?: CallOverrides): Promise<boolean>;

    "getInitializeState()"(overrides?: CallOverrides): Promise<boolean>;

    getInitializedVersion(overrides?: CallOverrides): Promise<number>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<number>;

    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

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
      state: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setSafeMode(bool)"(
      state: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setUpgradeState(
      state: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setUpgradeState(bool)"(
      state: PromiseOrValue<boolean>,
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

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
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
      state?: null
    ): SafeModeChangedEventFilter;
    SafeModeChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      state?: null
    ): SafeModeChangedEventFilter;

    "UpgradeStateChanged(address,address,bytes32,bool)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      state?: null
    ): UpgradeStateChangedEventFilter;
    UpgradeStateChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      state?: null
    ): UpgradeStateChangedEventFilter;

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

    getAccessControlManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getAccessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    getAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    "getAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;

    getInitializeState(overrides?: CallOverrides): Promise<BigNumber>;

    "getInitializeState()"(overrides?: CallOverrides): Promise<BigNumber>;

    getInitializedVersion(overrides?: CallOverrides): Promise<BigNumber>;

    "getInitializedVersion()"(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

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
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setSafeMode(bool)"(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUpgradeState(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setUpgradeState(bool)"(
      state: PromiseOrValue<boolean>,
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

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
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

    getAccessControlManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAccessControlManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInitializeState(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getInitializeState()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInitializedVersion(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getInitializedVersion()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setSafeMode(bool)"(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUpgradeState(
      state: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setUpgradeState(bool)"(
      state: PromiseOrValue<boolean>,
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

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
