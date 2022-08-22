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
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IRealmManagementInterface extends utils.Interface {
  functions: {
    "getRealmContexts(bytes32)": FunctionFragment;
    "getRealmInfo(bytes32)": FunctionFragment;
    "hasRealmContext(bytes32,bytes32)": FunctionFragment;
    "registerRealm(string,bool,bool)": FunctionFragment;
    "setRealmStatus(bytes32,bool)": FunctionFragment;
    "setRealmUpgradeStatus(bytes32,bool)": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "getRealmContexts"
      | "getRealmContexts(bytes32)"
      | "getRealmInfo"
      | "getRealmInfo(bytes32)"
      | "hasRealmContext"
      | "hasRealmContext(bytes32,bytes32)"
      | "registerRealm"
      | "registerRealm(string,bool,bool)"
      | "setRealmStatus"
      | "setRealmStatus(bytes32,bool)"
      | "setRealmUpgradeStatus"
      | "setRealmUpgradeStatus(bytes32,bool)"
  ): FunctionFragment;
  encodeFunctionData(functionFragment: "getRealmContexts", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmContexts(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "hasRealmContext",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRealmContext(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRealm",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRealm(string,bool,bool)",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRealmStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRealmStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRealmUpgradeStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRealmUpgradeStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  decodeFunctionResult(functionFragment: "getRealmContexts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmContexts(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRealmContext", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRealmContext(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRealm", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRealm(string,bool,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmUpgradeStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmUpgradeStatus(bytes32,bool)", data: BytesLike): Result;
  events: {
    "RealmRegistered(bytes32,address,string,bool,bool)": EventFragment;
    "RealmStatusChanged(bytes32,address,bool)": EventFragment;
    "RealmUpgradeStatusChanged(bytes32,address,bool)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "RealmRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmRegistered(bytes32,address,string,bool,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmStatusChanged(bytes32,address,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmUpgradeStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmUpgradeStatusChanged(bytes32,address,bool)"): EventFragment;
}
export interface RealmRegisteredEventObject {
  realm: string;
  sender: string;
  name: string;
  status: boolean;
  isUpgradable: boolean;
}
export declare type RealmRegisteredEvent = TypedEvent<
  [string, string, string, boolean, boolean],
  RealmRegisteredEventObject
>;
export declare type RealmRegisteredEventFilter = TypedEventFilter<RealmRegisteredEvent>;
export interface RealmStatusChangedEventObject {
  realm: string;
  sender: string;
  status: boolean;
}
export declare type RealmStatusChangedEvent = TypedEvent<[string, string, boolean], RealmStatusChangedEventObject>;
export declare type RealmStatusChangedEventFilter = TypedEventFilter<RealmStatusChangedEvent>;
export interface RealmUpgradeStatusChangedEventObject {
  realm: string;
  sender: string;
  status: boolean;
}
export declare type RealmUpgradeStatusChangedEvent = TypedEvent<
  [string, string, boolean],
  RealmUpgradeStatusChangedEventObject
>;
export declare type RealmUpgradeStatusChangedEventFilter = TypedEventFilter<RealmUpgradeStatusChangedEvent>;
export interface IRealmManagement extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IRealmManagementInterface;
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
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
    "getRealmInfo(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, boolean, boolean]>;
    hasRealmContext(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "hasRealmContext(bytes32,bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    registerRealm(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "registerRealm(string,bool,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setRealmStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setRealmStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setRealmUpgradeStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setRealmUpgradeStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
  };
  getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
  "getRealmInfo(bytes32)"(
    realm: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, boolean, boolean]>;
  hasRealmContext(
    realm: PromiseOrValue<BytesLike>,
    context: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "hasRealmContext(bytes32,bytes32)"(
    realm: PromiseOrValue<BytesLike>,
    context: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  registerRealm(
    name: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    isUpgradable: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "registerRealm(string,bool,bool)"(
    name: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    isUpgradable: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setRealmStatus(
    realm: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setRealmStatus(bytes32,bool)"(
    realm: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setRealmUpgradeStatus(
    realm: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setRealmUpgradeStatus(bytes32,bool)"(
    realm: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
    "getRealmInfo(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, boolean, boolean]>;
    hasRealmContext(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "hasRealmContext(bytes32,bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    registerRealm(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    "registerRealm(string,bool,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    setRealmStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setRealmStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    setRealmUpgradeStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setRealmUpgradeStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {
    "RealmRegistered(bytes32,address,string,bool,bool)"(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      name?: null,
      status?: null,
      isUpgradable?: null
    ): RealmRegisteredEventFilter;
    RealmRegistered(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      name?: null,
      status?: null,
      isUpgradable?: null
    ): RealmRegisteredEventFilter;
    "RealmStatusChanged(bytes32,address,bool)"(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): RealmStatusChangedEventFilter;
    RealmStatusChanged(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): RealmStatusChangedEventFilter;
    "RealmUpgradeStatusChanged(bytes32,address,bool)"(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): RealmUpgradeStatusChangedEventFilter;
    RealmUpgradeStatusChanged(
      realm?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): RealmUpgradeStatusChangedEventFilter;
  };
  estimateGas: {
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRealmInfo(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    hasRealmContext(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "hasRealmContext(bytes32,bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registerRealm(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "registerRealm(string,bool,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setRealmStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setRealmStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setRealmUpgradeStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setRealmUpgradeStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRealmContexts(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRealmInfo(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    hasRealmContext(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "hasRealmContext(bytes32,bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    registerRealm(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "registerRealm(string,bool,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      isUpgradable: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRealmStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setRealmStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRealmUpgradeStatus(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setRealmUpgradeStatus(bytes32,bool)"(
      realm: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
