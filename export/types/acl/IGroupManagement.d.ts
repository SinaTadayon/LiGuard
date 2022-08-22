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
export interface IGroupManagementInterface extends utils.Interface {
  functions: {
    "getGroupInfo(bytes32)": FunctionFragment;
    "getGroupRoles(bytes32)": FunctionFragment;
    "hasGroupRole(bytes32,bytes32)": FunctionFragment;
    "registerGroup(string,bool)": FunctionFragment;
    "setGroupStatus(bytes32,bool)": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "getGroupInfo"
      | "getGroupInfo(bytes32)"
      | "getGroupRoles"
      | "getGroupRoles(bytes32)"
      | "hasGroupRole"
      | "hasGroupRole(bytes32,bytes32)"
      | "registerGroup"
      | "registerGroup(string,bool)"
      | "setGroupStatus"
      | "setGroupStatus(bytes32,bool)"
  ): FunctionFragment;
  encodeFunctionData(functionFragment: "getGroupInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupRoles", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupRoles(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "hasGroupRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasGroupRole(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerGroup",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerGroup(string,bool)",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGroupStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGroupStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  decodeFunctionResult(functionFragment: "getGroupInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupRoles", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupRoles(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasGroupRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasGroupRole(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerGroup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerGroup(string,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGroupStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGroupStatus(bytes32,bool)", data: BytesLike): Result;
  events: {
    "GroupRegistered(bytes32,address,string,bool)": EventFragment;
    "GroupStatusChanged(bytes32,address,bool)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "GroupRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupRegistered(bytes32,address,string,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupStatusChanged(bytes32,address,bool)"): EventFragment;
}
export interface GroupRegisteredEventObject {
  group: string;
  sender: string;
  name: string;
  status: boolean;
}
export declare type GroupRegisteredEvent = TypedEvent<[string, string, string, boolean], GroupRegisteredEventObject>;
export declare type GroupRegisteredEventFilter = TypedEventFilter<GroupRegisteredEvent>;
export interface GroupStatusChangedEventObject {
  group: string;
  sender: string;
  status: boolean;
}
export declare type GroupStatusChangedEvent = TypedEvent<[string, string, boolean], GroupStatusChangedEventObject>;
export declare type GroupStatusChangedEventFilter = TypedEventFilter<GroupStatusChangedEvent>;
export interface IGroupManagement extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IGroupManagementInterface;
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
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    hasGroupRole(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "hasGroupRole(bytes32,bytes32)"(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    registerGroup(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "registerGroup(string,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setGroupStatus(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setGroupStatus(bytes32,bool)"(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
  };
  getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
  "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
  getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  hasGroupRole(
    group: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "hasGroupRole(bytes32,bytes32)"(
    group: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  registerGroup(
    name: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "registerGroup(string,bool)"(
    name: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setGroupStatus(
    group: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setGroupStatus(bytes32,bool)"(
    group: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    hasGroupRole(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "hasGroupRole(bytes32,bytes32)"(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    registerGroup(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    "registerGroup(string,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
    setGroupStatus(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setGroupStatus(bytes32,bool)"(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {
    "GroupRegistered(bytes32,address,string,bool)"(
      group?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      name?: null,
      status?: null
    ): GroupRegisteredEventFilter;
    GroupRegistered(
      group?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      name?: null,
      status?: null
    ): GroupRegisteredEventFilter;
    "GroupStatusChanged(bytes32,address,bool)"(
      group?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): GroupStatusChangedEventFilter;
    GroupStatusChanged(
      group?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      status?: null
    ): GroupStatusChangedEventFilter;
  };
  estimateGas: {
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    hasGroupRole(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "hasGroupRole(bytes32,bytes32)"(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registerGroup(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "registerGroup(string,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setGroupStatus(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setGroupStatus(bytes32,bool)"(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getGroupRoles(bytes32)"(
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    hasGroupRole(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "hasGroupRole(bytes32,bytes32)"(
      group: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    registerGroup(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "registerGroup(string,bool)"(
      name: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setGroupStatus(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setGroupStatus(bytes32,bool)"(
      group: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
