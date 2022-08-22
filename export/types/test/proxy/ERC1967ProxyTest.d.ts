import type { BaseContract, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface ERC1967ProxyTestInterface extends utils.Interface {
  functions: {};
  events: {
    "AdminChanged(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AdminChanged(address,address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded(address)"): EventFragment;
}
export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export declare type AdminChangedEvent = TypedEvent<[string, string], AdminChangedEventObject>;
export declare type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
export interface UpgradedEventObject {
  implementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface ERC1967ProxyTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ERC1967ProxyTestInterface;
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
  functions: {};
  callStatic: {};
  filters: {
    "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
    AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
    "Upgraded(address)"(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
  };
  estimateGas: {};
  populateTransaction: {};
}
