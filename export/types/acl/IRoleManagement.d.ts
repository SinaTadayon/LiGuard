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
export interface IRoleManagementInterface extends utils.Interface {
  functions: {
    "getRoleAccounts(bytes32)": FunctionFragment;
    "getRoleInfo(bytes32)": FunctionFragment;
    "grantRoleAccount(bytes32,address)": FunctionFragment;
    "hasRoleAccount(bytes32,address)": FunctionFragment;
    "registerRole(string,bytes32,bool)": FunctionFragment;
    "revokeRoleAccount(bytes32,address)": FunctionFragment;
    "setRoleGroup(bytes32,bytes32)": FunctionFragment;
    "setRoleStatus(bytes32,bool)": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "getRoleAccounts"
      | "getRoleAccounts(bytes32)"
      | "getRoleInfo"
      | "getRoleInfo(bytes32)"
      | "grantRoleAccount"
      | "grantRoleAccount(bytes32,address)"
      | "hasRoleAccount"
      | "hasRoleAccount(bytes32,address)"
      | "registerRole"
      | "registerRole(string,bytes32,bool)"
      | "revokeRoleAccount"
      | "revokeRoleAccount(bytes32,address)"
      | "setRoleGroup"
      | "setRoleGroup(bytes32,bytes32)"
      | "setRoleStatus"
      | "setRoleStatus(bytes32,bool)"
  ): FunctionFragment;
  encodeFunctionData(functionFragment: "getRoleAccounts", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleAccounts(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "grantRoleAccount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRoleAccount(bytes32,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRoleAccount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRoleAccount(bytes32,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRole",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRole(string,bytes32,bool)",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRoleAccount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRoleAccount(bytes32,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoleGroup",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoleGroup(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoleStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoleStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  decodeFunctionResult(functionFragment: "getRoleAccounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleAccounts(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRole(string,bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleGroup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleGroup(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleStatus(bytes32,bool)", data: BytesLike): Result;
  events: {
    "RoleAccountGranted(bytes32,address,address)": EventFragment;
    "RoleAccountRevoked(bytes32,address,address)": EventFragment;
    "RoleGroupChanged(bytes32,address,bytes32,bytes32)": EventFragment;
    "RoleRegistered(bytes32,string,address,bytes32,bool)": EventFragment;
    "RoleStatusChanged(bytes32,address,bytes32,bool)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "RoleAccountGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAccountGranted(bytes32,address,address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAccountRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAccountRevoked(bytes32,address,address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGroupChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGroupChanged(bytes32,address,bytes32,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRegistered(bytes32,string,address,bytes32,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleStatusChanged(bytes32,address,bytes32,bool)"): EventFragment;
}
export interface RoleAccountGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export declare type RoleAccountGrantedEvent = TypedEvent<[string, string, string], RoleAccountGrantedEventObject>;
export declare type RoleAccountGrantedEventFilter = TypedEventFilter<RoleAccountGrantedEvent>;
export interface RoleAccountRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export declare type RoleAccountRevokedEvent = TypedEvent<[string, string, string], RoleAccountRevokedEventObject>;
export declare type RoleAccountRevokedEventFilter = TypedEventFilter<RoleAccountRevokedEvent>;
export interface RoleGroupChangedEventObject {
  role: string;
  sender: string;
  newGroup: string;
  oldGroup: string;
}
export declare type RoleGroupChangedEvent = TypedEvent<[string, string, string, string], RoleGroupChangedEventObject>;
export declare type RoleGroupChangedEventFilter = TypedEventFilter<RoleGroupChangedEvent>;
export interface RoleRegisteredEventObject {
  role: string;
  name: string;
  sender: string;
  group: string;
  isEnabled: boolean;
}
export declare type RoleRegisteredEvent = TypedEvent<
  [string, string, string, string, boolean],
  RoleRegisteredEventObject
>;
export declare type RoleRegisteredEventFilter = TypedEventFilter<RoleRegisteredEvent>;
export interface RoleStatusChangedEventObject {
  role: string;
  sender: string;
  group: string;
  status: boolean;
}
export declare type RoleStatusChangedEvent = TypedEvent<
  [string, string, string, boolean],
  RoleStatusChangedEventObject
>;
export declare type RoleStatusChangedEventFilter = TypedEventFilter<RoleStatusChangedEvent>;
export interface IRoleManagement extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IRoleManagementInterface;
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
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
    "getRoleInfo(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;
    grantRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "grantRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    hasRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "hasRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    registerRole(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "registerRole(string,bytes32,bool)"(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    revokeRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "revokeRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setRoleGroup(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setRoleGroup(bytes32,bytes32)"(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setRoleStatus(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setRoleStatus(bytes32,bool)"(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
  };
  getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
  "getRoleInfo(bytes32)"(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string, boolean]>;
  grantRoleAccount(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "grantRoleAccount(bytes32,address)"(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  hasRoleAccount(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "hasRoleAccount(bytes32,address)"(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  registerRole(
    name: PromiseOrValue<string>,
    group: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "registerRole(string,bytes32,bool)"(
    name: PromiseOrValue<string>,
    group: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  revokeRoleAccount(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "revokeRoleAccount(bytes32,address)"(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setRoleGroup(
    role: PromiseOrValue<BytesLike>,
    group: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setRoleGroup(bytes32,bytes32)"(
    role: PromiseOrValue<BytesLike>,
    group: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setRoleStatus(
    role: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setRoleStatus(bytes32,bool)"(
    role: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
    "getRoleInfo(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;
    grantRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "grantRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    hasRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "hasRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    registerRole(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    "registerRole(string,bytes32,bool)"(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    revokeRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "revokeRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    setRoleGroup(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setRoleGroup(bytes32,bytes32)"(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    setRoleStatus(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setRoleStatus(bytes32,bool)"(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {
    "RoleAccountGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleAccountGrantedEventFilter;
    RoleAccountGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleAccountGrantedEventFilter;
    "RoleAccountRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleAccountRevokedEventFilter;
    RoleAccountRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleAccountRevokedEventFilter;
    "RoleGroupChanged(bytes32,address,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      newGroup?: PromiseOrValue<BytesLike> | null,
      oldGroup?: null
    ): RoleGroupChangedEventFilter;
    RoleGroupChanged(
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      newGroup?: PromiseOrValue<BytesLike> | null,
      oldGroup?: null
    ): RoleGroupChangedEventFilter;
    "RoleRegistered(bytes32,string,address,bytes32,bool)"(
      role?: PromiseOrValue<BytesLike> | null,
      name?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      group?: null,
      isEnabled?: null
    ): RoleRegisteredEventFilter;
    RoleRegistered(
      role?: PromiseOrValue<BytesLike> | null,
      name?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      group?: null,
      isEnabled?: null
    ): RoleRegisteredEventFilter;
    "RoleStatusChanged(bytes32,address,bytes32,bool)"(
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      group?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): RoleStatusChangedEventFilter;
    RoleStatusChanged(
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      group?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): RoleStatusChangedEventFilter;
  };
  estimateGas: {
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRoleInfo(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    grantRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "grantRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    hasRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "hasRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registerRole(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "registerRole(string,bytes32,bool)"(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    revokeRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "revokeRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setRoleGroup(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setRoleGroup(bytes32,bytes32)"(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setRoleStatus(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setRoleStatus(bytes32,bool)"(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRoleAccounts(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRoleInfo(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    grantRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "grantRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    hasRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "hasRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    registerRole(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "registerRole(string,bytes32,bool)"(
      name: PromiseOrValue<string>,
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    revokeRoleAccount(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "revokeRoleAccount(bytes32,address)"(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRoleGroup(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setRoleGroup(bytes32,bytes32)"(
      role: PromiseOrValue<BytesLike>,
      group: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRoleStatus(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setRoleStatus(bytes32,bool)"(
      role: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
