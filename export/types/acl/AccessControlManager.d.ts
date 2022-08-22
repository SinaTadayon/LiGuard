import type {
  BaseContract,
  BigNumber,
  BigNumberish,
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
export declare namespace IContextManagement {
  type ResponseContextStruct = {
    name: PromiseOrValue<BytesLike>;
    version: PromiseOrValue<BytesLike>;
    realm: PromiseOrValue<BytesLike>;
    smca: PromiseOrValue<string>;
    isSafeMode: PromiseOrValue<boolean>;
    isUpgradable: PromiseOrValue<boolean>;
  };
  type ResponseContextStructOutput = [string, string, string, string, boolean, boolean] & {
    name: string;
    version: string;
    realm: string;
    smca: string;
    isSafeMode: boolean;
    isUpgradable: boolean;
  };
  type RequestContextStruct = {
    name: PromiseOrValue<BytesLike>;
    version: PromiseOrValue<BytesLike>;
    realm: PromiseOrValue<BytesLike>;
    smca: PromiseOrValue<string>;
    status: PromiseOrValue<boolean>;
  };
  type RequestContextStructOutput = [string, string, string, string, boolean] & {
    name: string;
    version: string;
    realm: string;
    smca: string;
    status: boolean;
  };
  type RequestRegisterContextStruct = {
    role: PromiseOrValue<BytesLike>;
    funcSelectors: PromiseOrValue<BytesLike>[];
    isEnabled: PromiseOrValue<boolean>;
  };
  type RequestRegisterContextStructOutput = [string, string[], boolean] & {
    role: string;
    funcSelectors: string[];
    isEnabled: boolean;
  };
  type RequestUpdateContextStruct = {
    role: PromiseOrValue<BytesLike>;
    funcSelectors: PromiseOrValue<BytesLike>[];
    updateStatus: PromiseOrValue<BigNumberish>;
  };
  type RequestUpdateContextStructOutput = [string, string[], number] & {
    role: string;
    funcSelectors: string[];
    updateStatus: number;
  };
}
export interface AccessControlManagerInterface extends utils.Interface {
  functions: {
    "accessControlManager()": FunctionFragment;
    "addContextFuncRole(bytes32,bytes4,bytes32)": FunctionFragment;
    "contractContext()": FunctionFragment;
    "contractName()": FunctionFragment;
    "contractRealm()": FunctionFragment;
    "contractVersion()": FunctionFragment;
    "domainSeparator()": FunctionFragment;
    "getContextFuncs(bytes32)": FunctionFragment;
    "getContextInfo(bytes32)": FunctionFragment;
    "getGroupInfo(bytes32)": FunctionFragment;
    "getGroupRoles(bytes32)": FunctionFragment;
    "getRealmContexts(bytes32)": FunctionFragment;
    "getRealmInfo(bytes32)": FunctionFragment;
    "getRoleAccounts(bytes32)": FunctionFragment;
    "getRoleInfo(bytes32)": FunctionFragment;
    "grantContextRole(bytes32,bytes4,bytes32)": FunctionFragment;
    "grantRoleAccount(bytes32,address)": FunctionFragment;
    "hasAccess(bytes32,address,bytes4)": FunctionFragment;
    "hasContextRole(bytes32,bytes32,bytes4)": FunctionFragment;
    "hasGroupRole(bytes32,bytes32)": FunctionFragment;
    "hasRealmContext(bytes32,bytes32)": FunctionFragment;
    "hasRoleAccount(bytes32,address)": FunctionFragment;
    "initStatus()": FunctionFragment;
    "initVersion()": FunctionFragment;
    "initialize(string,string,string,address)": FunctionFragment;
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
    "isSafeMode()": FunctionFragment;
    "isUpgradable()": FunctionFragment;
    "livelyAdminRole()": FunctionFragment;
    "livelyAnonymousRole()": FunctionFragment;
    "livelyGeneralGroupRole()": FunctionFragment;
    "livelyGeneralRealmRole()": FunctionFragment;
    "livelySystemAdminRole()": FunctionFragment;
    "localAdmin()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])": FunctionFragment;
    "registerGroup(string,bool)": FunctionFragment;
    "registerRealm(string,bool,bool)": FunctionFragment;
    "registerRole(string,bytes32,bool)": FunctionFragment;
    "removeContextFunc(bytes32,bytes4)": FunctionFragment;
    "revokeContextRole(bytes32,bytes4,bytes32)": FunctionFragment;
    "revokeRoleAccount(bytes32,address)": FunctionFragment;
    "setContextRealm(bytes32,bytes32)": FunctionFragment;
    "setContextStatus(bytes32,bool)": FunctionFragment;
    "setGroupStatus(bytes32,bool)": FunctionFragment;
    "setLocalAdmin(address)": FunctionFragment;
    "setRealmStatus(bytes32,bool)": FunctionFragment;
    "setRealmUpgradeStatus(bytes32,bool)": FunctionFragment;
    "setRoleGroup(bytes32,bytes32)": FunctionFragment;
    "setRoleStatus(bytes32,bool)": FunctionFragment;
    "setSafeMode(bool)": FunctionFragment;
    "setUpgradeStatus(bool)": FunctionFragment;
    "subjectAddress()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])": FunctionFragment;
    "upgradeTo(address,bytes,bool)": FunctionFragment;
    "withdrawBalance(address)": FunctionFragment;
  };
  getFunction(
    nameOrSignatureOrTopic:
      | "accessControlManager"
      | "accessControlManager()"
      | "addContextFuncRole"
      | "addContextFuncRole(bytes32,bytes4,bytes32)"
      | "contractContext"
      | "contractContext()"
      | "contractName"
      | "contractName()"
      | "contractRealm"
      | "contractRealm()"
      | "contractVersion"
      | "contractVersion()"
      | "domainSeparator"
      | "domainSeparator()"
      | "getContextFuncs"
      | "getContextFuncs(bytes32)"
      | "getContextInfo"
      | "getContextInfo(bytes32)"
      | "getGroupInfo"
      | "getGroupInfo(bytes32)"
      | "getGroupRoles"
      | "getGroupRoles(bytes32)"
      | "getRealmContexts"
      | "getRealmContexts(bytes32)"
      | "getRealmInfo"
      | "getRealmInfo(bytes32)"
      | "getRoleAccounts"
      | "getRoleAccounts(bytes32)"
      | "getRoleInfo"
      | "getRoleInfo(bytes32)"
      | "grantContextRole"
      | "grantContextRole(bytes32,bytes4,bytes32)"
      | "grantRoleAccount"
      | "grantRoleAccount(bytes32,address)"
      | "hasAccess"
      | "hasAccess(bytes32,address,bytes4)"
      | "hasContextRole"
      | "hasContextRole(bytes32,bytes32,bytes4)"
      | "hasGroupRole"
      | "hasGroupRole(bytes32,bytes32)"
      | "hasRealmContext"
      | "hasRealmContext(bytes32,bytes32)"
      | "hasRoleAccount"
      | "hasRoleAccount(bytes32,address)"
      | "initStatus"
      | "initStatus()"
      | "initVersion"
      | "initVersion()"
      | "initialize"
      | "initialize(string,string,string,address)"
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
      | "isSafeMode"
      | "isSafeMode()"
      | "isUpgradable"
      | "isUpgradable()"
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
      | "localAdmin"
      | "localAdmin()"
      | "proxiableUUID"
      | "proxiableUUID()"
      | "registerContext"
      | "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"
      | "registerGroup"
      | "registerGroup(string,bool)"
      | "registerRealm"
      | "registerRealm(string,bool,bool)"
      | "registerRole"
      | "registerRole(string,bytes32,bool)"
      | "removeContextFunc"
      | "removeContextFunc(bytes32,bytes4)"
      | "revokeContextRole"
      | "revokeContextRole(bytes32,bytes4,bytes32)"
      | "revokeRoleAccount"
      | "revokeRoleAccount(bytes32,address)"
      | "setContextRealm"
      | "setContextRealm(bytes32,bytes32)"
      | "setContextStatus"
      | "setContextStatus(bytes32,bool)"
      | "setGroupStatus"
      | "setGroupStatus(bytes32,bool)"
      | "setLocalAdmin"
      | "setLocalAdmin(address)"
      | "setRealmStatus"
      | "setRealmStatus(bytes32,bool)"
      | "setRealmUpgradeStatus"
      | "setRealmUpgradeStatus(bytes32,bool)"
      | "setRoleGroup"
      | "setRoleGroup(bytes32,bytes32)"
      | "setRoleStatus"
      | "setRoleStatus(bytes32,bool)"
      | "setSafeMode"
      | "setSafeMode(bool)"
      | "setUpgradeStatus"
      | "setUpgradeStatus(bool)"
      | "subjectAddress"
      | "subjectAddress()"
      | "supportsInterface"
      | "supportsInterface(bytes4)"
      | "updateContext"
      | "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"
      | "upgradeTo"
      | "upgradeTo(address,bytes,bool)"
      | "withdrawBalance"
      | "withdrawBalance(address)"
  ): FunctionFragment;
  encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
  encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addContextFuncRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "addContextFuncRole(bytes32,bytes4,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "contractContext", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractContext()", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractRealm", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractRealm()", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
  encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
  encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
  encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
  encodeFunctionData(functionFragment: "getContextFuncs", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getContextFuncs(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getContextInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getContextInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupRoles", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getGroupRoles(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmContexts", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmContexts(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRealmInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleAccounts", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleAccounts(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleInfo", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getRoleInfo(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "grantContextRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantContextRole(bytes32,bytes4,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRoleAccount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRoleAccount(bytes32,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAccess",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAccess(bytes32,address,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasContextRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasContextRole(bytes32,bytes32,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasGroupRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasGroupRole(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRealmContext",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRealmContext(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRoleAccount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRoleAccount(bytes32,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "initStatus", values?: undefined): string;
  encodeFunctionData(functionFragment: "initStatus()", values?: undefined): string;
  encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
  encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(string,string,string,address)",
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
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
  encodeFunctionData(functionFragment: "isSafeMode", values?: undefined): string;
  encodeFunctionData(functionFragment: "isSafeMode()", values?: undefined): string;
  encodeFunctionData(functionFragment: "isUpgradable", values?: undefined): string;
  encodeFunctionData(functionFragment: "isUpgradable()", values?: undefined): string;
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
  encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
  encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
  encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
  encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerContext",
    values: [
      PromiseOrValue<BytesLike>,
      IContextManagement.RequestContextStruct,
      IContextManagement.RequestRegisterContextStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])",
    values: [
      PromiseOrValue<BytesLike>,
      IContextManagement.RequestContextStruct,
      IContextManagement.RequestRegisterContextStruct[]
    ]
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
    functionFragment: "registerRealm",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRealm(string,bool,bool)",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>, PromiseOrValue<boolean>]
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
    functionFragment: "removeContextFunc",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeContextFunc(bytes32,bytes4)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeContextRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeContextRole(bytes32,bytes4,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
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
    functionFragment: "setContextRealm",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setContextRealm(bytes32,bytes32)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setContextStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setContextStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGroupStatus",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGroupStatus(bytes32,bool)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
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
  encodeFunctionData(functionFragment: "setSafeMode", values: [PromiseOrValue<boolean>]): string;
  encodeFunctionData(functionFragment: "setSafeMode(bool)", values: [PromiseOrValue<boolean>]): string;
  encodeFunctionData(functionFragment: "setUpgradeStatus", values: [PromiseOrValue<boolean>]): string;
  encodeFunctionData(functionFragment: "setUpgradeStatus(bool)", values: [PromiseOrValue<boolean>]): string;
  encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
  encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
  encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "updateContext",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      IContextManagement.RequestContextStruct,
      IContextManagement.RequestUpdateContextStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      IContextManagement.RequestContextStruct,
      IContextManagement.RequestUpdateContextStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo(address,bytes,bool)",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
  decodeFunctionResult(functionFragment: "accessControlManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "accessControlManager()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addContextFuncRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addContextFuncRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractContext", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractContext()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractRealm", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractRealm()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getContextFuncs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getContextFuncs(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getContextInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getContextInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupRoles", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGroupRoles(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmContexts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmContexts(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRealmInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleAccounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleAccounts(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoleInfo(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantContextRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantContextRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasAccess", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasAccess(bytes32,address,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasContextRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasContextRole(bytes32,bytes32,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasGroupRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasGroupRole(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRealmContext", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRealmContext(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initStatus()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize(string,string,string,address)", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "isSafeMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isSafeMode()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isUpgradable", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isUpgradable()", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerContext", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registerGroup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerGroup(string,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRealm", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRealm(string,bool,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerRole(string,bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeContextFunc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeContextFunc(bytes32,bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeContextRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeContextRole(bytes32,bytes4,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRoleAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRoleAccount(bytes32,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setContextRealm", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setContextRealm(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setContextStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setContextStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGroupStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGroupStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmUpgradeStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRealmUpgradeStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleGroup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleGroup(bytes32,bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoleStatus(bytes32,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSafeMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSafeMode(bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUpgradeStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUpgradeStatus(bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateContext", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
  events: {
    "ContextFuncRemoved(bytes32,address,bytes4,bytes32)": EventFragment;
    "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
    "ContextRealmChanged(bytes32,address,bytes32,bytes32)": EventFragment;
    "ContextRegistered(bytes32,address,address,bytes32)": EventFragment;
    "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
    "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)": EventFragment;
    "ContextStatusChanged(bytes32,address,bytes32,bool)": EventFragment;
    "ContextUpdated(bytes32,address,address,bytes32)": EventFragment;
    "GroupRegistered(bytes32,address,string,bool)": EventFragment;
    "GroupStatusChanged(bytes32,address,bool)": EventFragment;
    "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
    "LocalAdminChanged(address,address,address)": EventFragment;
    "RealmRegistered(bytes32,address,string,bool,bool)": EventFragment;
    "RealmStatusChanged(bytes32,address,bool)": EventFragment;
    "RealmUpgradeStatusChanged(bytes32,address,bool)": EventFragment;
    "RoleAccountGranted(bytes32,address,address)": EventFragment;
    "RoleAccountRevoked(bytes32,address,address)": EventFragment;
    "RoleGroupChanged(bytes32,address,bytes32,bytes32)": EventFragment;
    "RoleRegistered(bytes32,string,address,bytes32,bool)": EventFragment;
    "RoleStatusChanged(bytes32,address,bytes32,bool)": EventFragment;
    "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
    "UpgradeStatusChanged(address,address,bytes32,bool)": EventFragment;
    "Upgraded(address,address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "ContextFuncRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextFuncRemoved(bytes32,address,bytes4,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextFuncRoleAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRealmChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRealmChanged(bytes32,address,bytes32,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRegistered(bytes32,address,address,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextStatusChanged(bytes32,address,bytes32,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContextUpdated(bytes32,address,address,bytes32)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupRegistered(bytes32,address,string,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupStatusChanged(bytes32,address,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,bytes32,uint16)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LocalAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LocalAdminChanged(address,address,address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmRegistered(bytes32,address,string,bool,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmStatusChanged(bytes32,address,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmUpgradeStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RealmUpgradeStatusChanged(bytes32,address,bool)"): EventFragment;
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
  getEvent(nameOrSignatureOrTopic: "SafeModeChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SafeModeChanged(address,address,bytes32,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged(address,address,bytes32,bool)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded(address,address,address)"): EventFragment;
}
export interface ContextFuncRemovedEventObject {
  context: string;
  sender: string;
  functionSelector: string;
  realm: string;
}
export declare type ContextFuncRemovedEvent = TypedEvent<
  [string, string, string, string],
  ContextFuncRemovedEventObject
>;
export declare type ContextFuncRemovedEventFilter = TypedEventFilter<ContextFuncRemovedEvent>;
export interface ContextFuncRoleAddedEventObject {
  context: string;
  role: string;
  sender: string;
  functionSelector: string;
  realm: string;
}
export declare type ContextFuncRoleAddedEvent = TypedEvent<
  [string, string, string, string, string],
  ContextFuncRoleAddedEventObject
>;
export declare type ContextFuncRoleAddedEventFilter = TypedEventFilter<ContextFuncRoleAddedEvent>;
export interface ContextRealmChangedEventObject {
  context: string;
  sender: string;
  realm: string;
  oldRealm: string;
}
export declare type ContextRealmChangedEvent = TypedEvent<
  [string, string, string, string],
  ContextRealmChangedEventObject
>;
export declare type ContextRealmChangedEventFilter = TypedEventFilter<ContextRealmChangedEvent>;
export interface ContextRegisteredEventObject {
  context: string;
  scma: string;
  sender: string;
  realm: string;
}
export declare type ContextRegisteredEvent = TypedEvent<[string, string, string, string], ContextRegisteredEventObject>;
export declare type ContextRegisteredEventFilter = TypedEventFilter<ContextRegisteredEvent>;
export interface ContextRoleGrantedEventObject {
  context: string;
  role: string;
  sender: string;
  functionSelector: string;
  realm: string;
}
export declare type ContextRoleGrantedEvent = TypedEvent<
  [string, string, string, string, string],
  ContextRoleGrantedEventObject
>;
export declare type ContextRoleGrantedEventFilter = TypedEventFilter<ContextRoleGrantedEvent>;
export interface ContextRoleRevokedEventObject {
  context: string;
  role: string;
  sender: string;
  functionSelector: string;
  realm: string;
}
export declare type ContextRoleRevokedEvent = TypedEvent<
  [string, string, string, string, string],
  ContextRoleRevokedEventObject
>;
export declare type ContextRoleRevokedEventFilter = TypedEventFilter<ContextRoleRevokedEvent>;
export interface ContextStatusChangedEventObject {
  context: string;
  sender: string;
  realm: string;
  status: boolean;
}
export declare type ContextStatusChangedEvent = TypedEvent<
  [string, string, string, boolean],
  ContextStatusChangedEventObject
>;
export declare type ContextStatusChangedEventFilter = TypedEventFilter<ContextStatusChangedEvent>;
export interface ContextUpdatedEventObject {
  context: string;
  scma: string;
  sender: string;
  realm: string;
}
export declare type ContextUpdatedEvent = TypedEvent<[string, string, string, string], ContextUpdatedEventObject>;
export declare type ContextUpdatedEventFilter = TypedEventFilter<ContextUpdatedEvent>;
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
export interface InitializedEventObject {
  sender: string;
  proxy: string;
  subject: string;
  name: string;
  version: string;
  realm: string;
  initCount: number;
}
export declare type InitializedEvent = TypedEvent<
  [string, string, string, string, string, string, number],
  InitializedEventObject
>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface LocalAdminChangedEventObject {
  sender: string;
  proxy: string;
  newAdmin: string;
}
export declare type LocalAdminChangedEvent = TypedEvent<[string, string, string], LocalAdminChangedEventObject>;
export declare type LocalAdminChangedEventFilter = TypedEventFilter<LocalAdminChangedEvent>;
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
export interface SafeModeChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  status: boolean;
}
export declare type SafeModeChangedEvent = TypedEvent<[string, string, string, boolean], SafeModeChangedEventObject>;
export declare type SafeModeChangedEventFilter = TypedEventFilter<SafeModeChangedEvent>;
export interface UpgradeStatusChangedEventObject {
  sender: string;
  proxy: string;
  realm: string;
  status: boolean;
}
export declare type UpgradeStatusChangedEvent = TypedEvent<
  [string, string, string, boolean],
  UpgradeStatusChangedEventObject
>;
export declare type UpgradeStatusChangedEventFilter = TypedEventFilter<UpgradeStatusChangedEvent>;
export interface UpgradedEventObject {
  sender: string;
  proxy: string;
  newImplementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string, string, string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface AccessControlManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: AccessControlManagerInterface;
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
    accessControlManager(overrides?: CallOverrides): Promise<[string]>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<[string]>;
    addContextFuncRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "addContextFuncRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    contractContext(overrides?: CallOverrides): Promise<[string]>;
    "contractContext()"(overrides?: CallOverrides): Promise<[string]>;
    contractName(overrides?: CallOverrides): Promise<[string]>;
    "contractName()"(overrides?: CallOverrides): Promise<[string]>;
    contractRealm(overrides?: CallOverrides): Promise<[string]>;
    "contractRealm()"(overrides?: CallOverrides): Promise<[string]>;
    contractVersion(overrides?: CallOverrides): Promise<[string]>;
    "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
    domainSeparator(overrides?: CallOverrides): Promise<[string]>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
    getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getContextInfo(
      ctx: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[IContextManagement.ResponseContextStructOutput]>;
    "getContextInfo(bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[IContextManagement.ResponseContextStructOutput]>;
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
    "getRealmInfo(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, boolean, boolean]>;
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
    "getRoleInfo(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;
    grantContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "grantContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
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
    hasContextRole(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    "hasContextRole(bytes32,bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
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
    initStatus(overrides?: CallOverrides): Promise<[boolean]>;
    "initStatus()"(overrides?: CallOverrides): Promise<[boolean]>;
    initVersion(overrides?: CallOverrides): Promise<[number]>;
    "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
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
    isSafeMode(overrides?: CallOverrides): Promise<[boolean]>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;
    isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<[boolean]>;
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
    localAdmin(overrides?: CallOverrides): Promise<[string]>;
    "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
    registerContext(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
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
    removeContextFunc(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "removeContextFunc(bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    revokeContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "revokeContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
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
    setContextRealm(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setContextRealm(bytes32,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setContextStatus(
      ctx: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setContextStatus(bytes32,bool)"(
      ctx: PromiseOrValue<BytesLike>,
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
    setLocalAdmin(
      newLocalAdmin: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setLocalAdmin(address)"(
      newLocalAdmin: PromiseOrValue<string>,
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
    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<[string]>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    updateContext(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<ContractTransaction>;
  };
  accessControlManager(overrides?: CallOverrides): Promise<string>;
  "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
  addContextFuncRole(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "addContextFuncRole(bytes32,bytes4,bytes32)"(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  contractContext(overrides?: CallOverrides): Promise<string>;
  "contractContext()"(overrides?: CallOverrides): Promise<string>;
  contractName(overrides?: CallOverrides): Promise<string>;
  "contractName()"(overrides?: CallOverrides): Promise<string>;
  contractRealm(overrides?: CallOverrides): Promise<string>;
  "contractRealm()"(overrides?: CallOverrides): Promise<string>;
  contractVersion(overrides?: CallOverrides): Promise<string>;
  "contractVersion()"(overrides?: CallOverrides): Promise<string>;
  domainSeparator(overrides?: CallOverrides): Promise<string>;
  "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
  getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getContextInfo(
    ctx: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<IContextManagement.ResponseContextStructOutput>;
  "getContextInfo(bytes32)"(
    ctx: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<IContextManagement.ResponseContextStructOutput>;
  getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
  "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
  getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
  "getRealmInfo(bytes32)"(
    realm: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, boolean, boolean]>;
  getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
  getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
  "getRoleInfo(bytes32)"(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string, boolean]>;
  grantContextRole(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "grantContextRole(bytes32,bytes4,bytes32)"(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
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
  hasContextRole(
    ctx: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
  "hasContextRole(bytes32,bytes32,bytes4)"(
    ctx: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;
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
  initStatus(overrides?: CallOverrides): Promise<boolean>;
  "initStatus()"(overrides?: CallOverrides): Promise<boolean>;
  initVersion(overrides?: CallOverrides): Promise<number>;
  "initVersion()"(overrides?: CallOverrides): Promise<number>;
  initialize(
    domainName: PromiseOrValue<string>,
    domainVersion: PromiseOrValue<string>,
    domainRealm: PromiseOrValue<string>,
    accessControlManager: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "initialize(string,string,string,address)"(
    domainName: PromiseOrValue<string>,
    domainVersion: PromiseOrValue<string>,
    domainRealm: PromiseOrValue<string>,
    accessControlManager: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
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
  isSafeMode(overrides?: CallOverrides): Promise<boolean>;
  "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
  isUpgradable(overrides?: CallOverrides): Promise<boolean>;
  "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
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
  localAdmin(overrides?: CallOverrides): Promise<string>;
  "localAdmin()"(overrides?: CallOverrides): Promise<string>;
  proxiableUUID(overrides?: CallOverrides): Promise<string>;
  "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
  registerContext(
    signature: PromiseOrValue<BytesLike>,
    rc: IContextManagement.RequestContextStruct,
    rcr: IContextManagement.RequestRegisterContextStruct[],
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(
    signature: PromiseOrValue<BytesLike>,
    rc: IContextManagement.RequestContextStruct,
    rcr: IContextManagement.RequestRegisterContextStruct[],
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
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
  removeContextFunc(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "removeContextFunc(bytes32,bytes4)"(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  revokeContextRole(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "revokeContextRole(bytes32,bytes4,bytes32)"(
    ctx: PromiseOrValue<BytesLike>,
    functionSelector: PromiseOrValue<BytesLike>,
    role: PromiseOrValue<BytesLike>,
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
  setContextRealm(
    ctx: PromiseOrValue<BytesLike>,
    realm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setContextRealm(bytes32,bytes32)"(
    ctx: PromiseOrValue<BytesLike>,
    realm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setContextStatus(
    ctx: PromiseOrValue<BytesLike>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setContextStatus(bytes32,bool)"(
    ctx: PromiseOrValue<BytesLike>,
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
  setLocalAdmin(
    newLocalAdmin: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setLocalAdmin(address)"(
    newLocalAdmin: PromiseOrValue<string>,
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
  setSafeMode(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setSafeMode(bool)"(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  setUpgradeStatus(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "setUpgradeStatus(bool)"(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  subjectAddress(overrides?: CallOverrides): Promise<string>;
  "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
  supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
  updateContext(
    ctx: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    rc: IContextManagement.RequestContextStruct,
    rcr: IContextManagement.RequestUpdateContextStruct[],
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(
    ctx: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    rc: IContextManagement.RequestContextStruct,
    rcr: IContextManagement.RequestUpdateContextStruct[],
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceCall: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "upgradeTo(address,bytes,bool)"(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    forceCall: PromiseOrValue<boolean>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  withdrawBalance(
    recepient: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  "withdrawBalance(address)"(
    recepient: PromiseOrValue<string>,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    accessControlManager(overrides?: CallOverrides): Promise<string>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
    addContextFuncRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "addContextFuncRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    contractContext(overrides?: CallOverrides): Promise<string>;
    "contractContext()"(overrides?: CallOverrides): Promise<string>;
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractRealm(overrides?: CallOverrides): Promise<string>;
    "contractRealm()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getContextInfo(
      ctx: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IContextManagement.ResponseContextStructOutput>;
    "getContextInfo(bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IContextManagement.ResponseContextStructOutput>;
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean]>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, boolean, boolean]>;
    "getRealmInfo(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, boolean, boolean]>;
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string, boolean]>;
    "getRoleInfo(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;
    grantContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "grantContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
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
    hasContextRole(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "hasContextRole(bytes32,bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
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
    initStatus(overrides?: CallOverrides): Promise<boolean>;
    "initStatus()"(overrides?: CallOverrides): Promise<boolean>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
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
    isSafeMode(overrides?: CallOverrides): Promise<boolean>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
    isUpgradable(overrides?: CallOverrides): Promise<boolean>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
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
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
    registerContext(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: CallOverrides
    ): Promise<string>;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: CallOverrides
    ): Promise<string>;
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
    removeContextFunc(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "removeContextFunc(bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    revokeContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "revokeContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
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
    setContextRealm(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setContextRealm(bytes32,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    setContextStatus(
      ctx: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
    "setContextStatus(bytes32,bool)"(
      ctx: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
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
    setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
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
    setSafeMode(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
    "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
    setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
    "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
    subjectAddress(overrides?: CallOverrides): Promise<string>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    updateContext(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: CallOverrides
    ): Promise<string>;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: CallOverrides
    ): Promise<string>;
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
    withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "ContextFuncRemoved(bytes32,address,bytes4,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextFuncRemovedEventFilter;
    ContextFuncRemoved(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextFuncRemovedEventFilter;
    "ContextFuncRoleAdded(bytes32,bytes32,address,bytes4,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextFuncRoleAddedEventFilter;
    ContextFuncRoleAdded(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextFuncRoleAddedEventFilter;
    "ContextRealmChanged(bytes32,address,bytes32,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      oldRealm?: null
    ): ContextRealmChangedEventFilter;
    ContextRealmChanged(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      oldRealm?: null
    ): ContextRealmChangedEventFilter;
    "ContextRegistered(bytes32,address,address,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      scma?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: null
    ): ContextRegisteredEventFilter;
    ContextRegistered(
      context?: PromiseOrValue<BytesLike> | null,
      scma?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: null
    ): ContextRegisteredEventFilter;
    "ContextRoleGranted(bytes32,bytes32,address,bytes4,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextRoleGrantedEventFilter;
    ContextRoleGranted(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextRoleGrantedEventFilter;
    "ContextRoleRevoked(bytes32,bytes32,address,bytes4,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextRoleRevokedEventFilter;
    ContextRoleRevoked(
      context?: PromiseOrValue<BytesLike> | null,
      role?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      functionSelector?: null,
      realm?: null
    ): ContextRoleRevokedEventFilter;
    "ContextStatusChanged(bytes32,address,bytes32,bool)"(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): ContextStatusChangedEventFilter;
    ContextStatusChanged(
      context?: PromiseOrValue<BytesLike> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: PromiseOrValue<BytesLike> | null,
      status?: null
    ): ContextStatusChangedEventFilter;
    "ContextUpdated(bytes32,address,address,bytes32)"(
      context?: PromiseOrValue<BytesLike> | null,
      scma?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: null
    ): ContextUpdatedEventFilter;
    ContextUpdated(
      context?: PromiseOrValue<BytesLike> | null,
      scma?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      realm?: null
    ): ContextUpdatedEventFilter;
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
    "Initialized(address,address,address,string,string,bytes32,uint16)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      subject?: PromiseOrValue<string> | null,
      name?: null,
      version?: null,
      realm?: null,
      initCount?: null
    ): InitializedEventFilter;
    Initialized(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      subject?: PromiseOrValue<string> | null,
      name?: null,
      version?: null,
      realm?: null,
      initCount?: null
    ): InitializedEventFilter;
    "LocalAdminChanged(address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newAdmin?: null
    ): LocalAdminChangedEventFilter;
    LocalAdminChanged(
      sender?: PromiseOrValue<string> | null,
      proxy?: PromiseOrValue<string> | null,
      newAdmin?: null
    ): LocalAdminChangedEventFilter;
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
    accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
    addContextFuncRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "addContextFuncRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    contractContext(overrides?: CallOverrides): Promise<BigNumber>;
    "contractContext()"(overrides?: CallOverrides): Promise<BigNumber>;
    contractName(overrides?: CallOverrides): Promise<BigNumber>;
    "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
    contractRealm(overrides?: CallOverrides): Promise<BigNumber>;
    "contractRealm()"(overrides?: CallOverrides): Promise<BigNumber>;
    contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
    "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
    domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
    getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getContextFuncs(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getGroupRoles(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRealmContexts(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRealmInfo(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRoleAccounts(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "getRoleInfo(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    grantContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "grantContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
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
    hasContextRole(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    "hasContextRole(bytes32,bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
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
    initStatus(overrides?: CallOverrides): Promise<BigNumber>;
    "initStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
    initVersion(overrides?: CallOverrides): Promise<BigNumber>;
    "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
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
    isSafeMode(overrides?: CallOverrides): Promise<BigNumber>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;
    isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<BigNumber>;
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
    localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
    "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
    registerContext(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
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
    removeContextFunc(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "removeContextFunc(bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    revokeContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "revokeContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
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
    setContextRealm(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setContextRealm(bytes32,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setContextStatus(
      ctx: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setContextStatus(bytes32,bool)"(
      ctx: PromiseOrValue<BytesLike>,
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
    setLocalAdmin(
      newLocalAdmin: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setLocalAdmin(address)"(
      newLocalAdmin: PromiseOrValue<string>,
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
    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    updateContext(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    accessControlManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    addContextFuncRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "addContextFuncRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    contractContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "contractContext()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    contractRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "contractRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getContextFuncs(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getContextFuncs(bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getContextInfo(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getContextInfo(bytes32)"(ctx: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getGroupInfo(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getGroupInfo(bytes32)"(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getGroupRoles(group: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getGroupRoles(bytes32)"(
      group: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getRealmContexts(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRealmContexts(bytes32)"(
      realm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getRealmInfo(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRealmInfo(bytes32)"(realm: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getRoleAccounts(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRoleAccounts(bytes32)"(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getRoleInfo(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "getRoleInfo(bytes32)"(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    grantContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "grantContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
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
    hasContextRole(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    "hasContextRole(bytes32,bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
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
    initStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "initStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    initialize(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "initialize(string,string,string,address)"(
      domainName: PromiseOrValue<string>,
      domainVersion: PromiseOrValue<string>,
      domainRealm: PromiseOrValue<string>,
      accessControlManager: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
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
    isSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    registerContext(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "registerContext(bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],bool)[])"(
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestRegisterContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
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
    removeContextFunc(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "removeContextFunc(bytes32,bytes4)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    revokeContextRole(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "revokeContextRole(bytes32,bytes4,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      functionSelector: PromiseOrValue<BytesLike>,
      role: PromiseOrValue<BytesLike>,
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
    setContextRealm(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setContextRealm(bytes32,bytes32)"(
      ctx: PromiseOrValue<BytesLike>,
      realm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setContextStatus(
      ctx: PromiseOrValue<BytesLike>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setContextStatus(bytes32,bool)"(
      ctx: PromiseOrValue<BytesLike>,
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
    setLocalAdmin(
      newLocalAdmin: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setLocalAdmin(address)"(
      newLocalAdmin: PromiseOrValue<string>,
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
    setSafeMode(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setSafeMode(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    setUpgradeStatus(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "setUpgradeStatus(bool)"(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    "supportsInterface(bytes4)"(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    updateContext(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "updateContext(bytes32,bytes,(bytes32,bytes32,bytes32,address,bool),(bytes32,bytes4[],uint8)[])"(
      ctx: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      rc: IContextManagement.RequestContextStruct,
      rcr: IContextManagement.RequestUpdateContextStruct[],
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "upgradeTo(address,bytes,bool)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      forceCall: PromiseOrValue<boolean>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    withdrawBalance(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
    "withdrawBalance(address)"(
      recepient: PromiseOrValue<string>,
      overrides?: Overrides & {
        from?: PromiseOrValue<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
