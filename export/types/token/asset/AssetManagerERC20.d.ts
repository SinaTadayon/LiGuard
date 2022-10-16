import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IAssetManagerERC20 {
    type CreateAssetRequestStruct = {
        role: PromiseOrValue<BytesLike>;
        salt: PromiseOrValue<BytesLike>;
        tokenId: PromiseOrValue<string>;
        assetName: PromiseOrValue<string>;
        assetVersion: PromiseOrValue<string>;
    };
    type CreateAssetRequestStructOutput = [
        string,
        string,
        string,
        string,
        string
    ] & {
        role: string;
        salt: string;
        tokenId: string;
        assetName: string;
        assetVersion: string;
    };
}
export declare namespace AssetManagerERC20 {
    type InitRequestStruct = {
        domainName: PromiseOrValue<string>;
        domainVersion: PromiseOrValue<string>;
        domainRealm: PromiseOrValue<string>;
        accessControlManager: PromiseOrValue<string>;
        assetManagerSignature: PromiseOrValue<BytesLike>;
    };
    type InitRequestStructOutput = [
        string,
        string,
        string,
        string,
        string
    ] & {
        domainName: string;
        domainVersion: string;
        domainRealm: string;
        accessControlManager: string;
        assetManagerSignature: string;
    };
}
export declare namespace IERC20Lock {
    type LockTokenRequestStruct = {
        source: PromiseOrValue<string>;
        dest: PromiseOrValue<string>;
        timestamp: PromiseOrValue<BigNumberish>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type LockTokenRequestStructOutput = [
        string,
        string,
        BigNumber,
        BigNumber
    ] & {
        source: string;
        dest: string;
        timestamp: BigNumber;
        amount: BigNumber;
    };
}
export declare namespace IERC20Extra {
    type BatchTransferRequestStruct = {
        to: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferRequestStructOutput = [string, BigNumber] & {
        to: string;
        amount: BigNumber;
    };
    type BatchTransferFromRequestStruct = {
        from: PromiseOrValue<string>;
        to: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferFromRequestStructOutput = [
        string,
        string,
        BigNumber
    ] & {
        from: string;
        to: string;
        amount: BigNumber;
    };
}
export interface AssetManagerERC20Interface extends utils.Interface {
    functions: {
        "accessControlManager()": FunctionFragment;
        "contractContext()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractRealm()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "createAsset((bytes32,bytes32,address,string,string))": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "getAllTokens()": FunctionFragment;
        "getAssetSubject()": FunctionFragment;
        "getLibrary()": FunctionFragment;
        "getTokenInfo(address)": FunctionFragment;
        "initVersion()": FunctionFragment;
        "initialize((string,string,string,address,bytes))": FunctionFragment;
        "isAssetExists(address)": FunctionFragment;
        "isSafeMode()": FunctionFragment;
        "isSafeModeAsset(address)": FunctionFragment;
        "isTokenExists(address)": FunctionFragment;
        "isUpgradable()": FunctionFragment;
        "livelyTokensDistribution(address)": FunctionFragment;
        "localAdmin()": FunctionFragment;
        "predictAddress(address,bytes32,address)": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "registerAsset(address)": FunctionFragment;
        "registerToken(address)": FunctionFragment;
        "removeAsset(address)": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeMode(bool)": FunctionFragment;
        "setSafeModeToken(address,bool)": FunctionFragment;
        "setUpgradeStatus(bool)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "tokenApprove(address,address,uint256)": FunctionFragment;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])": FunctionFragment;
        "tokenBatchTransfer(address,(address,uint256)[])": FunctionFragment;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])": FunctionFragment;
        "tokenDecreaseAllowance(address,address,uint256)": FunctionFragment;
        "tokenIncreaseAllowance(address,address,uint256)": FunctionFragment;
        "tokenLock(address,(address,address,uint256,uint256))": FunctionFragment;
        "tokenTransfer(address,address,uint256)": FunctionFragment;
        "tokenTransferFrom(address,address,address,uint256)": FunctionFragment;
        "updateAssetSubject(address,bytes)": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "accessControlManager" | "accessControlManager()" | "contractContext" | "contractContext()" | "contractName" | "contractName()" | "contractRealm" | "contractRealm()" | "contractVersion" | "contractVersion()" | "createAsset" | "createAsset((bytes32,bytes32,address,string,string))" | "domainSeparator" | "domainSeparator()" | "getAllTokens" | "getAllTokens()" | "getAssetSubject" | "getAssetSubject()" | "getLibrary" | "getLibrary()" | "getTokenInfo" | "getTokenInfo(address)" | "initVersion" | "initVersion()" | "initialize" | "initialize((string,string,string,address,bytes))" | "isAssetExists" | "isAssetExists(address)" | "isSafeMode" | "isSafeMode()" | "isSafeModeAsset" | "isSafeModeAsset(address)" | "isTokenExists" | "isTokenExists(address)" | "isUpgradable" | "isUpgradable()" | "livelyTokensDistribution" | "livelyTokensDistribution(address)" | "localAdmin" | "localAdmin()" | "predictAddress" | "predictAddress(address,bytes32,address)" | "proxiableUUID" | "proxiableUUID()" | "registerAsset" | "registerAsset(address)" | "registerToken" | "registerToken(address)" | "removeAsset" | "removeAsset(address)" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeMode" | "setSafeMode(bool)" | "setSafeModeToken" | "setSafeModeToken(address,bool)" | "setUpgradeStatus" | "setUpgradeStatus(bool)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "tokenApprove" | "tokenApprove(address,address,uint256)" | "tokenBatchLock" | "tokenBatchLock(address,(address,address,uint256,uint256)[])" | "tokenBatchTransfer" | "tokenBatchTransfer(address,(address,uint256)[])" | "tokenBatchTransferFrom" | "tokenBatchTransferFrom(address,(address,address,uint256)[])" | "tokenDecreaseAllowance" | "tokenDecreaseAllowance(address,address,uint256)" | "tokenIncreaseAllowance" | "tokenIncreaseAllowance(address,address,uint256)" | "tokenLock" | "tokenLock(address,(address,address,uint256,uint256))" | "tokenTransfer" | "tokenTransfer(address,address,uint256)" | "tokenTransferFrom" | "tokenTransferFrom(address,address,address,uint256)" | "updateAssetSubject" | "updateAssetSubject(address,bytes)" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractContext", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractContext()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "createAsset", values: [IAssetManagerERC20.CreateAssetRequestStruct]): string;
    encodeFunctionData(functionFragment: "createAsset((bytes32,bytes32,address,string,string))", values: [IAssetManagerERC20.CreateAssetRequestStruct]): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAllTokens", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAllTokens()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAssetSubject", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAssetSubject()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLibrary", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLibrary()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokenInfo", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getTokenInfo(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [AssetManagerERC20.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "initialize((string,string,string,address,bytes))", values: [AssetManagerERC20.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "isAssetExists", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAssetExists(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isSafeMode", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSafeMode()", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSafeModeAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isSafeModeAsset(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTokenExists", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTokenExists(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isUpgradable", values?: undefined): string;
    encodeFunctionData(functionFragment: "isUpgradable()", values?: undefined): string;
    encodeFunctionData(functionFragment: "livelyTokensDistribution", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "livelyTokensDistribution(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
    encodeFunctionData(functionFragment: "predictAddress", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "predictAddress(address,bytes32,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "registerAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerAsset(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerToken", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerToken(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeAsset(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeMode", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeMode(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeModeToken", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeModeToken(address,bool)", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "tokenApprove", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenApprove(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenBatchLock", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchLock(address,(address,address,uint256,uint256)[])", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer", values: [PromiseOrValue<string>, IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransfer(address,(address,uint256)[])", values: [PromiseOrValue<string>, IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom", values: [
        PromiseOrValue<string>,
        IERC20Extra.BatchTransferFromRequestStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "tokenBatchTransferFrom(address,(address,address,uint256)[])", values: [
        PromiseOrValue<string>,
        IERC20Extra.BatchTransferFromRequestStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenDecreaseAllowance(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenIncreaseAllowance(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenLock", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenLock(address,(address,address,uint256,uint256))", values: [PromiseOrValue<string>, IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "tokenTransfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransfer(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "tokenTransferFrom(address,address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "updateAssetSubject", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "updateAssetSubject(address,bytes)", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "upgradeTo", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "upgradeTo(address,bytes,bool)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawBalance(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "accessControlManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accessControlManager()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createAsset((bytes32,bytes32,address,string,string))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllTokens()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetSubject", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetSubject()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLibrary", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLibrary()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenInfo(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize((string,string,string,address,bytes))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAssetExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAssetExists(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeModeAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeModeAsset(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTokenExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTokenExists(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "livelyTokensDistribution", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "livelyTokensDistribution(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictAddress(address,bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAsset(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerToken(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAsset(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeModeToken(address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApprove(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchLock(address,(address,address,uint256,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransfer(address,(address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenBatchTransferFrom(address,(address,address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDecreaseAllowance(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenIncreaseAllowance(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLock(address,(address,address,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransfer(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferFrom(address,address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAssetSubject", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAssetSubject(address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "AssetCreated(address,address,address,address)": EventFragment;
        "AssetRegistered(address,address,address)": EventFragment;
        "AssetRemoved(address,address,address)": EventFragment;
        "AssetSubjectUpdated(address,address)": EventFragment;
        "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
        "LocalAdminChanged(address,address,address)": EventFragment;
        "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
        "TokenRegistered(address,address,string,string)": EventFragment;
        "TokenSafeModeChanged(address,address,bool)": EventFragment;
        "UpgradeStatusChanged(address,address,bytes32,bool)": EventFragment;
        "Upgraded(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AssetCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetCreated(address,address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRegistered(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetRemoved(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSubjectUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetSubjectUpdated(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRegistered(address,address,string,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenSafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenSafeModeChanged(address,address,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded(address,address,address)"): EventFragment;
}
export interface AssetCreatedEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
    assetSubject: string;
}
export declare type AssetCreatedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], AssetCreatedEventObject>;
export declare type AssetCreatedEventFilter = TypedEventFilter<AssetCreatedEvent>;
export interface AssetRegisteredEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
}
export declare type AssetRegisteredEvent = TypedEvent<[
    string,
    string,
    string
], AssetRegisteredEventObject>;
export declare type AssetRegisteredEventFilter = TypedEventFilter<AssetRegisteredEvent>;
export interface AssetRemovedEventObject {
    sender: string;
    assetId: string;
    tokenId: string;
}
export declare type AssetRemovedEvent = TypedEvent<[
    string,
    string,
    string
], AssetRemovedEventObject>;
export declare type AssetRemovedEventFilter = TypedEventFilter<AssetRemovedEvent>;
export interface AssetSubjectUpdatedEventObject {
    sender: string;
    assetSubject: string;
}
export declare type AssetSubjectUpdatedEvent = TypedEvent<[
    string,
    string
], AssetSubjectUpdatedEventObject>;
export declare type AssetSubjectUpdatedEventFilter = TypedEventFilter<AssetSubjectUpdatedEvent>;
export interface InitializedEventObject {
    sender: string;
    proxy: string;
    subject: string;
    name: string;
    version: string;
    realm: string;
    initCount: number;
}
export declare type InitializedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    number
], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface LocalAdminChangedEventObject {
    sender: string;
    proxy: string;
    newAdmin: string;
}
export declare type LocalAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], LocalAdminChangedEventObject>;
export declare type LocalAdminChangedEventFilter = TypedEventFilter<LocalAdminChangedEvent>;
export interface SafeModeChangedEventObject {
    sender: string;
    proxy: string;
    realm: string;
    status: boolean;
}
export declare type SafeModeChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], SafeModeChangedEventObject>;
export declare type SafeModeChangedEventFilter = TypedEventFilter<SafeModeChangedEvent>;
export interface TokenRegisteredEventObject {
    sender: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
}
export declare type TokenRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    string
], TokenRegisteredEventObject>;
export declare type TokenRegisteredEventFilter = TypedEventFilter<TokenRegisteredEvent>;
export interface TokenSafeModeChangedEventObject {
    sender: string;
    tokenId: string;
    isEnabled: boolean;
}
export declare type TokenSafeModeChangedEvent = TypedEvent<[
    string,
    string,
    boolean
], TokenSafeModeChangedEventObject>;
export declare type TokenSafeModeChangedEventFilter = TypedEventFilter<TokenSafeModeChangedEvent>;
export interface UpgradeStatusChangedEventObject {
    sender: string;
    proxy: string;
    realm: string;
    status: boolean;
}
export declare type UpgradeStatusChangedEvent = TypedEvent<[
    string,
    string,
    string,
    boolean
], UpgradeStatusChangedEventObject>;
export declare type UpgradeStatusChangedEventFilter = TypedEventFilter<UpgradeStatusChangedEvent>;
export interface UpgradedEventObject {
    sender: string;
    proxy: string;
    newImplementation: string;
}
export declare type UpgradedEvent = TypedEvent<[
    string,
    string,
    string
], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface AssetManagerERC20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AssetManagerERC20Interface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
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
        contractContext(overrides?: CallOverrides): Promise<[string]>;
        "contractContext()"(overrides?: CallOverrides): Promise<[string]>;
        contractName(overrides?: CallOverrides): Promise<[string]>;
        "contractName()"(overrides?: CallOverrides): Promise<[string]>;
        contractRealm(overrides?: CallOverrides): Promise<[string]>;
        "contractRealm()"(overrides?: CallOverrides): Promise<[string]>;
        contractVersion(overrides?: CallOverrides): Promise<[string]>;
        "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        getAllTokens(overrides?: CallOverrides): Promise<[string[]]>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<[string[]]>;
        getAssetSubject(overrides?: CallOverrides): Promise<[string]>;
        "getAssetSubject()"(overrides?: CallOverrides): Promise<[string]>;
        getLibrary(overrides?: CallOverrides): Promise<[string]>;
        "getLibrary()"(overrides?: CallOverrides): Promise<[string]>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        initialize(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize((string,string,string,address,bytes))"(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isSafeMode(overrides?: CallOverrides): Promise<[boolean]>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;
        isSafeModeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isSafeModeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<[boolean]>;
        livelyTokensDistribution(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "livelyTokensDistribution(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<[string]>;
        "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
        predictAddress(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        "predictAddress(address,bytes32,address)"(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
        registerAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<[string]>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<[string]>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchLock(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenLock(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenLock(address,(address,address,uint256,uint256))"(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAssetSubject(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateAssetSubject(address,bytes)"(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    accessControlManager(overrides?: CallOverrides): Promise<string>;
    "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
    contractContext(overrides?: CallOverrides): Promise<string>;
    "contractContext()"(overrides?: CallOverrides): Promise<string>;
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractRealm(overrides?: CallOverrides): Promise<string>;
    "contractRealm()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    getAllTokens(overrides?: CallOverrides): Promise<string[]>;
    "getAllTokens()"(overrides?: CallOverrides): Promise<string[]>;
    getAssetSubject(overrides?: CallOverrides): Promise<string>;
    "getAssetSubject()"(overrides?: CallOverrides): Promise<string>;
    getLibrary(overrides?: CallOverrides): Promise<string>;
    "getLibrary()"(overrides?: CallOverrides): Promise<string>;
    getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
    "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    initialize(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize((string,string,string,address,bytes))"(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isSafeMode(overrides?: CallOverrides): Promise<boolean>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
    isSafeModeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isSafeModeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isUpgradable(overrides?: CallOverrides): Promise<boolean>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
    livelyTokensDistribution(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "livelyTokensDistribution(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    predictAddress(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    "predictAddress(address,bytes32,address)"(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
    registerAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    subjectAddress(overrides?: CallOverrides): Promise<string>;
    "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchLock(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchLock(address,(address,address,uint256,uint256)[])"(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenLock(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenLock(address,(address,address,uint256,uint256))"(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAssetSubject(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateAssetSubject(address,bytes)"(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        accessControlManager(overrides?: CallOverrides): Promise<string>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<string>;
        contractContext(overrides?: CallOverrides): Promise<string>;
        "contractContext()"(overrides?: CallOverrides): Promise<string>;
        contractName(overrides?: CallOverrides): Promise<string>;
        "contractName()"(overrides?: CallOverrides): Promise<string>;
        contractRealm(overrides?: CallOverrides): Promise<string>;
        "contractRealm()"(overrides?: CallOverrides): Promise<string>;
        contractVersion(overrides?: CallOverrides): Promise<string>;
        "contractVersion()"(overrides?: CallOverrides): Promise<string>;
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: CallOverrides): Promise<string>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: CallOverrides): Promise<string>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        getAllTokens(overrides?: CallOverrides): Promise<string[]>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<string[]>;
        getAssetSubject(overrides?: CallOverrides): Promise<string>;
        "getAssetSubject()"(overrides?: CallOverrides): Promise<string>;
        getLibrary(overrides?: CallOverrides): Promise<string>;
        "getLibrary()"(overrides?: CallOverrides): Promise<string>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number, string[]]>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        initialize(request: AssetManagerERC20.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        "initialize((string,string,string,address,bytes))"(request: AssetManagerERC20.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isSafeMode(overrides?: CallOverrides): Promise<boolean>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
        isSafeModeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isSafeModeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isUpgradable(overrides?: CallOverrides): Promise<boolean>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
        livelyTokensDistribution(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "livelyTokensDistribution(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        localAdmin(overrides?: CallOverrides): Promise<string>;
        "localAdmin()"(overrides?: CallOverrides): Promise<string>;
        predictAddress(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        "predictAddress(address,bytes32,address)"(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
        registerAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "registerAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        subjectAddress(overrides?: CallOverrides): Promise<string>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenBatchLock(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenLock(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        "tokenLock(address,(address,address,uint256,uint256))"(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        updateAssetSubject(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "updateAssetSubject(address,bytes)"(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AssetCreated(address,address,address,address)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetSubject?: null): AssetCreatedEventFilter;
        AssetCreated(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, assetSubject?: null): AssetCreatedEventFilter;
        "AssetRegistered(address,address,address)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRegisteredEventFilter;
        AssetRegistered(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRegisteredEventFilter;
        "AssetRemoved(address,address,address)"(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRemovedEventFilter;
        AssetRemoved(sender?: PromiseOrValue<string> | null, assetId?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null): AssetRemovedEventFilter;
        "AssetSubjectUpdated(address,address)"(sender?: PromiseOrValue<string> | null, assetSubject?: PromiseOrValue<string> | null): AssetSubjectUpdatedEventFilter;
        AssetSubjectUpdated(sender?: PromiseOrValue<string> | null, assetSubject?: PromiseOrValue<string> | null): AssetSubjectUpdatedEventFilter;
        "Initialized(address,address,address,string,string,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        Initialized(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        "LocalAdminChanged(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        LocalAdminChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        "SafeModeChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        SafeModeChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        "TokenRegistered(address,address,string,string)"(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, tokenName?: null, tokenSymbol?: null): TokenRegisteredEventFilter;
        TokenRegistered(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, tokenName?: null, tokenSymbol?: null): TokenRegisteredEventFilter;
        "TokenSafeModeChanged(address,address,bool)"(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, isEnabled?: null): TokenSafeModeChangedEventFilter;
        TokenSafeModeChanged(sender?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<string> | null, isEnabled?: null): TokenSafeModeChangedEventFilter;
        "UpgradeStatusChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        UpgradeStatusChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        "Upgraded(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractContext(overrides?: CallOverrides): Promise<BigNumber>;
        "contractContext()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractName(overrides?: CallOverrides): Promise<BigNumber>;
        "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractRealm(overrides?: CallOverrides): Promise<BigNumber>;
        "contractRealm()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAllTokens(overrides?: CallOverrides): Promise<BigNumber>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<BigNumber>;
        getAssetSubject(overrides?: CallOverrides): Promise<BigNumber>;
        "getAssetSubject()"(overrides?: CallOverrides): Promise<BigNumber>;
        getLibrary(overrides?: CallOverrides): Promise<BigNumber>;
        "getLibrary()"(overrides?: CallOverrides): Promise<BigNumber>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        initialize(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize((string,string,string,address,bytes))"(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isSafeMode(overrides?: CallOverrides): Promise<BigNumber>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;
        isSafeModeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isSafeModeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<BigNumber>;
        livelyTokensDistribution(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "livelyTokensDistribution(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
        predictAddress(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "predictAddress(address,bytes32,address)"(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
        registerAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        subjectAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchLock(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenLock(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenLock(address,(address,address,uint256,uint256))"(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAssetSubject(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateAssetSubject(address,bytes)"(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        accessControlManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractContext()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createAsset(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "createAsset((bytes32,bytes32,address,string,string))"(request: IAssetManagerERC20.CreateAssetRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAllTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAllTokens()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAssetSubject(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getAssetSubject()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLibrary(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getLibrary()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenInfo(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getTokenInfo(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize((string,string,string,address,bytes))"(request: AssetManagerERC20.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isAssetExists(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAssetExists(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isSafeModeAsset(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isSafeModeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTokenExists(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isTokenExists(address)"(tokenId: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        livelyTokensDistribution(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "livelyTokensDistribution(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        predictAddress(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "predictAddress(address,bytes32,address)"(implementation: PromiseOrValue<string>, salt: PromiseOrValue<BytesLike>, deployer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerToken(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerToken(address)"(tokenId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeAsset(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "removeAsset(address)"(assetId: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSafeModeToken(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setSafeModeToken(address,bool)"(tokenId: PromiseOrValue<string>, isEnabled: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        subjectAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenApprove(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenApprove(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchLock(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchLock(address,(address,address,uint256,uint256)[])"(assetId: PromiseOrValue<string>, lockRequests: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransfer(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransfer(address,(address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenBatchTransferFrom(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenBatchTransferFrom(address,(address,address,uint256)[])"(assetId: PromiseOrValue<string>, request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenDecreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenDecreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenIncreaseAllowance(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenIncreaseAllowance(address,address,uint256)"(assetId: PromiseOrValue<string>, spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenLock(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenLock(address,(address,address,uint256,uint256))"(assetId: PromiseOrValue<string>, lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransfer(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransfer(address,address,uint256)"(assetId: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenTransferFrom(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tokenTransferFrom(address,address,address,uint256)"(assetId: PromiseOrValue<string>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAssetSubject(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateAssetSubject(address,bytes)"(assetSubject: PromiseOrValue<string>, assetCreationSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
