/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ProxyInterface extends utils.Interface {
  functions: {};

  events: {
    "ProxyUpgraded(address,address,address,address,string,string)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProxyUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

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

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface Proxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProxyInterface;

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

  functions: {};

  callStatic: {};

  filters: {
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

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
