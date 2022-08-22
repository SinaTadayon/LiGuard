import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IAccessControlInterface extends utils.Interface {
  functions: {
    "hasAccess(bytes32,address,bytes4)": FunctionFragment;
    "isContextEnabled(bytes32)": FunctionFragment;
    "isContextExists(bytes32)": FunctionFragment;
    "isContextFunctionEnabled(bytes32,bytes4)": FunctionFragment;
    "isContextFunctionExists(bytes32,bytes4)": FunctionFragment;
    "isContextSafeMode(bytes32)": FunctionFragment;
    "isContextUpgradable(bytes32)": FunctionFragment;
    "isGroupEnabled(bytes32)": FunctionFragment;
    "isGroupExists(bytes32)": FunctionFragment;
    "isLivelyAdmin(address)": FunctionFragment;
    "isLivelyGeneralGroup(bytes32)": FunctionFragment;
    "isLivelyGeneralRealm(bytes32)": FunctionFragment;
    "isLivelySystemAdmin(address)": FunctionFragment;
    "isRealmEnabled(bytes32)": FunctionFragment;
    "isRealmExists(bytes32)": FunctionFragment;
    "isRealmUpgradable(bytes32)": FunctionFragment;
    "isRoleEnabled(bytes32)": FunctionFragment;
    "isRoleExists(bytes32)": FunctionFragment;
    "livelyAdminRole()": FunctionFragment;
    "livelyAnonymousRole()": FunctionFragment;
    "livelyGeneralGroupRole()": FunctionFragment;
    "livelyGeneralRealmRole()": FunctionFragment;
    "livelySystemAdminRole()": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "hasAccess"
      | "hasAccess(bytes32,address,bytes4)"
      | "isContextEnabled"
      | "isContextEnabled(bytes32)"
      | "isContextExists"
      | "isContextExists(bytes32)"
      | "isContextFunctionEnabled"
      | "isContextFunctionEnabled(bytes32,bytes4)"
      | "isContextFunctionExists"
      | "isContextFunctionExists(bytes32,bytes4)"
      | "isContextSafeMode"
      | "isContextSafeMode(bytes32)"
      | "isContextUpgradable"
      | "isContextUpgradable(bytes32)"
      | "isGroupEnabled"
      | "isGroupEnabled(bytes32)"
      | "isGroupExists"
      | "isGroupExists(bytes32)"
      | "isLivelyAdmin"
      | "isLivelyAdmin(address)"
      | "isLivelyGeneralGroup"
      | "isLivelyGeneralGroup(bytes32)"
      | "isLivelyGeneralRealm"
      | "isLivelyGeneralRealm(bytes32)"
      | "isLivelySystemAdmin"
      | "isLivelySystemAdmin(address)"
      | "isRealmEnabled"
      | "isRealmEnabled(bytes32)"
      | "isRealmExists"
      | "isRealmExists(bytes32)"
      | "isRealmUpgradable"
      | "isRealmUpgradable(bytes32)"
      | "isRoleEnabled"
      | "isRoleEnabled(bytes32)"
      | "isRoleExists"
      | "isRoleExists(bytes32)"
      | "livelyAdminRole"
      | "livelyAdminRole()"
      | "livelyAnonymousRole"
      | "livelyAnonymousRole()"
      | "livelyGeneralGroupRole"
      | "livelyGeneralGroupRole()"
      | "livelyGeneralRealmRole"
      | "livelyGeneralRealmRole()"
      | "livelySystemAdminRole"
      | "livelySystemAdminRole()"
  ): FunctionFragment;
  encodeFunctionData(
    functionFragment: "hasAccess",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAccess(bytes32,address,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "isContextEnabled", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextEnabled(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextExists", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextExists(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "isContextFunctionEnabled",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isContextFunctionEnabled(bytes32,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isContextFunctionExists",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isContextFunctionExists(bytes32,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "isContextSafeMode", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextSafeMode(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextUpgradable", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isContextUpgradable(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isGroupEnabled", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isGroupEnabled(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isGroupExists", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isGroupExists(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isLivelyAdmin", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "isLivelyAdmin(address)", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "isLivelyGeneralGroup", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isLivelyGeneralGroup(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isLivelyGeneralRealm", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isLivelyGeneralRealm(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isLivelySystemAdmin", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "isLivelySystemAdmin(address)", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "isRealmEnabled", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRealmEnabled(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRealmExists", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRealmExists(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRealmUpgradable", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRealmUpgradable(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRoleEnabled", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRoleEnabled(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRoleExists", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "isRoleExists(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "livelyAdminRole", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyAdminRole()", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyAnonymousRole", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyAnonymousRole()", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyGeneralGroupRole", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyGeneralGroupRole()", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyGeneralRealmRole", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelyGeneralRealmRole()", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelySystemAdminRole", values?: undefined): string;
  encodeFunctionData(functionFragment: "livelySystemAdminRole()", values?: undefined): string;
  decodeFunctionResult(functionFragment: "hasAccess", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasAccess(bytes32,address,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextEnabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextEnabled(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextExists", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextExists(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextFunctionEnabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextFunctionEnabled(bytes32,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextFunctionExists", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextFunctionExists(bytes32,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextSafeMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextSafeMode(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextUpgradable", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isContextUpgradable(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isGroupEnabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isGroupEnabled(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isGroupExists", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isGroupExists(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyAdmin(address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyGeneralGroup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyGeneralGroup(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyGeneralRealm", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelyGeneralRealm(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelySystemAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLivelySystemAdmin(address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmEnabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmEnabled(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmExists", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmExists(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmUpgradable", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRealmUpgradable(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRoleEnabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRoleEnabled(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRoleExists", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRoleExists(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyAdminRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyAdminRole()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyAnonymousRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyAnonymousRole()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyGeneralGroupRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyGeneralGroupRole()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyGeneralRealmRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelyGeneralRealmRole()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelySystemAdminRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "livelySystemAdminRole()", data: BytesLike): Result;
  events: {};
}
export interface IAccessControl extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IAccessControlInterface;
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
    hasAccess(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "hasAccess(bytes32,address,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    isContextEnabled(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isContextEnabled(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isContextExists(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isContextExists(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isContextFunctionEnabled(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "isContextFunctionEnabled(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    isContextFunctionExists(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "isContextFunctionExists(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    isContextSafeMode(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isContextSafeMode(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isContextUpgradable(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isContextUpgradable(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isGroupEnabled(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isGroupEnabled(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isGroupExists(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isGroupExists(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isLivelyAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    "isLivelyAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    isLivelyGeneralGroup(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isLivelyGeneralGroup(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isLivelyGeneralRealm(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isLivelyGeneralRealm(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isLivelySystemAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    "isLivelySystemAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    isRealmEnabled(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isRealmEnabled(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isRealmExists(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isRealmExists(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isRealmUpgradable(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isRealmUpgradable(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isRoleEnabled(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isRoleEnabled(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    isRoleExists(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "isRoleExists(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    livelyAdminRole(overrides?: CallOverrides): Promise<[string]>;
    "livelyAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
    livelyAnonymousRole(overrides?: CallOverrides): Promise<[string]>;
    "livelyAnonymousRole()"(overrides?: CallOverrides): Promise<[string]>;
    livelyGeneralGroupRole(overrides?: CallOverrides): Promise<[string]>;
    "livelyGeneralGroupRole()"(overrides?: CallOverrides): Promise<[string]>;
    livelyGeneralRealmRole(overrides?: CallOverrides): Promise<[string]>;
    "livelyGeneralRealmRole()"(overrides?: CallOverrides): Promise<[string]>;
    livelySystemAdminRole(overrides?: CallOverrides): Promise<[string]>;
    "livelySystemAdminRole()"(overrides?: CallOverrides): Promise<[string]>;
  };
  hasAccess(
    context: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "hasAccess(bytes32,address,bytes4)"(
    context: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  isContextEnabled(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isContextEnabled(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isContextExists(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isContextExists(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isContextFunctionEnabled(
    context: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "isContextFunctionEnabled(bytes32,bytes4)"(
    context: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  isContextFunctionExists(
    context: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "isContextFunctionExists(bytes32,bytes4)"(
    context: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  isContextSafeMode(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isContextSafeMode(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isContextUpgradable(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isContextUpgradable(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isGroupEnabled(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isGroupEnabled(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isGroupExists(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isGroupExists(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isLivelyAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
  "isLivelyAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
  isLivelyGeneralGroup(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isLivelyGeneralGroup(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isLivelyGeneralRealm(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isLivelyGeneralRealm(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isLivelySystemAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
  "isLivelySystemAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
  isRealmEnabled(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isRealmEnabled(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isRealmExists(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isRealmExists(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isRealmUpgradable(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isRealmUpgradable(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isRoleEnabled(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isRoleEnabled(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  isRoleExists(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "isRoleExists(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  livelyAdminRole(overrides?: CallOverrides): Promise<string>;
  "livelyAdminRole()"(overrides?: CallOverrides): Promise<string>;
  livelyAnonymousRole(overrides?: CallOverrides): Promise<string>;
  "livelyAnonymousRole()"(overrides?: CallOverrides): Promise<string>;
  livelyGeneralGroupRole(overrides?: CallOverrides): Promise<string>;
  "livelyGeneralGroupRole()"(overrides?: CallOverrides): Promise<string>;
  livelyGeneralRealmRole(overrides?: CallOverrides): Promise<string>;
  "livelyGeneralRealmRole()"(overrides?: CallOverrides): Promise<string>;
  livelySystemAdminRole(overrides?: CallOverrides): Promise<string>;
  "livelySystemAdminRole()"(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    hasAccess(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "hasAccess(bytes32,address,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    isContextEnabled(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isContextEnabled(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isContextExists(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isContextExists(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isContextFunctionEnabled(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "isContextFunctionEnabled(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    isContextFunctionExists(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "isContextFunctionExists(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    isContextSafeMode(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isContextSafeMode(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isContextUpgradable(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isContextUpgradable(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isGroupEnabled(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isGroupEnabled(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isGroupExists(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isGroupExists(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isLivelyAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isLivelyAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isLivelyGeneralGroup(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isLivelyGeneralGroup(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isLivelyGeneralRealm(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isLivelyGeneralRealm(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isLivelySystemAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isLivelySystemAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isRealmEnabled(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isRealmEnabled(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isRealmExists(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isRealmExists(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isRealmUpgradable(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isRealmUpgradable(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isRoleEnabled(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isRoleEnabled(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    isRoleExists(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "isRoleExists(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    livelyAdminRole(overrides?: CallOverrides): Promise<string>;
    "livelyAdminRole()"(overrides?: CallOverrides): Promise<string>;
    livelyAnonymousRole(overrides?: CallOverrides): Promise<string>;
    "livelyAnonymousRole()"(overrides?: CallOverrides): Promise<string>;
    livelyGeneralGroupRole(overrides?: CallOverrides): Promise<string>;
    "livelyGeneralGroupRole()"(overrides?: CallOverrides): Promise<string>;
    livelyGeneralRealmRole(overrides?: CallOverrides): Promise<string>;
    "livelyGeneralRealmRole()"(overrides?: CallOverrides): Promise<string>;
    livelySystemAdminRole(overrides?: CallOverrides): Promise<string>;
    "livelySystemAdminRole()"(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    hasAccess(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "hasAccess(bytes32,address,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    isContextEnabled(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isContextEnabled(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isContextExists(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isContextExists(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isContextFunctionEnabled(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "isContextFunctionEnabled(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    isContextFunctionExists(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "isContextFunctionExists(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    isContextSafeMode(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isContextSafeMode(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isContextUpgradable(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isContextUpgradable(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isGroupEnabled(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isGroupEnabled(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isGroupExists(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isGroupExists(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isLivelyAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "isLivelyAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    isLivelyGeneralGroup(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isLivelyGeneralGroup(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isLivelyGeneralRealm(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isLivelyGeneralRealm(bytes32)"(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isLivelySystemAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "isLivelySystemAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    isRealmEnabled(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isRealmEnabled(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isRealmExists(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isRealmExists(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isRealmUpgradable(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isRealmUpgradable(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isRoleEnabled(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isRoleEnabled(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isRoleExists(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "isRoleExists(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    livelyAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
    "livelyAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
    livelyAnonymousRole(overrides?: CallOverrides): Promise<BigNumber>;
    "livelyAnonymousRole()"(overrides?: CallOverrides): Promise<BigNumber>;
    livelyGeneralGroupRole(overrides?: CallOverrides): Promise<BigNumber>;
    "livelyGeneralGroupRole()"(overrides?: CallOverrides): Promise<BigNumber>;
    livelyGeneralRealmRole(overrides?: CallOverrides): Promise<BigNumber>;
    "livelyGeneralRealmRole()"(overrides?: CallOverrides): Promise<BigNumber>;
    livelySystemAdminRole(overrides?: CallOverrides): Promise<BigNumber>;
    "livelySystemAdminRole()"(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    hasAccess(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "hasAccess(bytes32,address,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextEnabled(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isContextEnabled(bytes32)"(
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextExists(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isContextExists(bytes32)"(
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextFunctionEnabled(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "isContextFunctionEnabled(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextFunctionExists(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "isContextFunctionExists(bytes32,bytes4)"(
      context: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextSafeMode(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isContextSafeMode(bytes32)"(
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isContextUpgradable(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isContextUpgradable(bytes32)"(
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isGroupEnabled(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isGroupEnabled(bytes32)"(
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isGroupExists(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isGroupExists(bytes32)"(
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isLivelyAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isLivelyAdmin(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isLivelyGeneralGroup(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isLivelyGeneralGroup(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isLivelyGeneralRealm(context: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isLivelyGeneralRealm(bytes32)"(
      context: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isLivelySystemAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isLivelySystemAdmin(address)"(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isRealmEnabled(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isRealmEnabled(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isRealmExists(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isRealmExists(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isRealmUpgradable(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isRealmUpgradable(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    isRoleEnabled(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isRoleEnabled(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isRoleExists(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isRoleExists(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    livelyAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "livelyAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    livelyAnonymousRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "livelyAnonymousRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    livelyGeneralGroupRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "livelyGeneralGroupRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    livelyGeneralRealmRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "livelyGeneralRealmRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    livelySystemAdminRole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "livelySystemAdminRole()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
