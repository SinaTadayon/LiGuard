import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
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
    type UnLockTokenRequestStruct = {
        lockId: PromiseOrValue<BytesLike>;
        account: PromiseOrValue<string>;
        reason: PromiseOrValue<string>;
    };
    type UnLockTokenRequestStructOutput = [string, string, string] & {
        lockId: string;
        account: string;
        reason: string;
    };
}
export declare namespace IERC20Extra {
    type BatchTransferRequestStruct = {
        recipient: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferRequestStructOutput = [string, BigNumber] & {
        recipient: string;
        amount: BigNumber;
    };
    type BatchTransferFromRequestStruct = {
        source: PromiseOrValue<string>;
        recipient: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
    };
    type BatchTransferFromRequestStructOutput = [
        string,
        string,
        BigNumber
    ] & {
        source: string;
        recipient: string;
        amount: BigNumber;
    };
    type BatchUpdateTaxWhitelistRequestStruct = {
        account: PromiseOrValue<string>;
        isDeleted: PromiseOrValue<boolean>;
    };
    type BatchUpdateTaxWhitelistRequestStructOutput = [string, boolean] & {
        account: string;
        isDeleted: boolean;
    };
}
export declare namespace LivelyToken {
    type InitRequestStruct = {
        domainName: PromiseOrValue<string>;
        domainVersion: PromiseOrValue<string>;
        domainRealm: PromiseOrValue<string>;
        signature: PromiseOrValue<BytesLike>;
        taxRateValue: PromiseOrValue<BigNumberish>;
        totalSupplyAmount: PromiseOrValue<BigNumberish>;
        accessControlManager: PromiseOrValue<string>;
        taxTreasuryAddress: PromiseOrValue<string>;
        assetManager: PromiseOrValue<string>;
    };
    type InitRequestStructOutput = [
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        string,
        string,
        string
    ] & {
        domainName: string;
        domainVersion: string;
        domainRealm: string;
        signature: string;
        taxRateValue: BigNumber;
        totalSupplyAmount: BigNumber;
        accessControlManager: string;
        taxTreasuryAddress: string;
        assetManager: string;
    };
}
export interface LivelyTokenInterface extends utils.Interface {
    functions: {
        "accessControlManager()": FunctionFragment;
        "allowance(address,address)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "batchClaimToken(bytes32[])": FunctionFragment;
        "batchLockToken((address,address,uint256,uint256)[])": FunctionFragment;
        "batchTransfer((address,uint256)[])": FunctionFragment;
        "batchTransferFrom((address,address,uint256)[])": FunctionFragment;
        "batchUnlockToken((bytes32,address,string)[])": FunctionFragment;
        "batchUpdateTaxWhitelist((address,bool)[])": FunctionFragment;
        "burn(address,uint256)": FunctionFragment;
        "claimToken(bytes32)": FunctionFragment;
        "contractContext()": FunctionFragment;
        "contractName()": FunctionFragment;
        "contractRealm()": FunctionFragment;
        "contractVersion()": FunctionFragment;
        "decimals()": FunctionFragment;
        "decreaseAllowance(address,uint256)": FunctionFragment;
        "distributeToken()": FunctionFragment;
        "domainSeparator()": FunctionFragment;
        "increaseAllowance(address,uint256)": FunctionFragment;
        "initStatus()": FunctionFragment;
        "initVersion()": FunctionFragment;
        "initialize((string,string,string,bytes,uint256,uint256,address,address,address))": FunctionFragment;
        "isPaused(address)": FunctionFragment;
        "isPausedAll()": FunctionFragment;
        "isSafeMode()": FunctionFragment;
        "isUpgradable()": FunctionFragment;
        "localAdmin()": FunctionFragment;
        "lockBalanceOf(address)": FunctionFragment;
        "lockInfo(bytes32,address)": FunctionFragment;
        "lockToken((address,address,uint256,uint256))": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "name()": FunctionFragment;
        "nonce(address)": FunctionFragment;
        "pause(address)": FunctionFragment;
        "pauseAll()": FunctionFragment;
        "pausedAccounts()": FunctionFragment;
        "permit(address,address,uint256,uint256,bytes)": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "setLocalAdmin(address)": FunctionFragment;
        "setSafeMode(bool)": FunctionFragment;
        "setUpgradeStatus(bool)": FunctionFragment;
        "subjectAddress()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "taxRate()": FunctionFragment;
        "taxTreasury()": FunctionFragment;
        "taxWhitelist()": FunctionFragment;
        "totalBalanceOf(address)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transfer(address,uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "unlockToken((bytes32,address,string))": FunctionFragment;
        "unpause(address)": FunctionFragment;
        "unpauseAll()": FunctionFragment;
        "updateTaxRate(uint256)": FunctionFragment;
        "updateTaxWhitelist(address,bool)": FunctionFragment;
        "upgradeTo(address,bytes,bool)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "accessControlManager" | "accessControlManager()" | "allowance" | "allowance(address,address)" | "approve" | "approve(address,uint256)" | "balanceOf" | "balanceOf(address)" | "batchClaimToken" | "batchClaimToken(bytes32[])" | "batchLockToken" | "batchLockToken((address,address,uint256,uint256)[])" | "batchTransfer" | "batchTransfer((address,uint256)[])" | "batchTransferFrom" | "batchTransferFrom((address,address,uint256)[])" | "batchUnlockToken" | "batchUnlockToken((bytes32,address,string)[])" | "batchUpdateTaxWhitelist" | "batchUpdateTaxWhitelist((address,bool)[])" | "burn" | "burn(address,uint256)" | "claimToken" | "claimToken(bytes32)" | "contractContext" | "contractContext()" | "contractName" | "contractName()" | "contractRealm" | "contractRealm()" | "contractVersion" | "contractVersion()" | "decimals" | "decimals()" | "decreaseAllowance" | "decreaseAllowance(address,uint256)" | "distributeToken" | "distributeToken()" | "domainSeparator" | "domainSeparator()" | "increaseAllowance" | "increaseAllowance(address,uint256)" | "initStatus" | "initStatus()" | "initVersion" | "initVersion()" | "initialize" | "initialize((string,string,string,bytes,uint256,uint256,address,address,address))" | "isPaused" | "isPaused(address)" | "isPausedAll" | "isPausedAll()" | "isSafeMode" | "isSafeMode()" | "isUpgradable" | "isUpgradable()" | "localAdmin" | "localAdmin()" | "lockBalanceOf" | "lockBalanceOf(address)" | "lockInfo" | "lockInfo(bytes32,address)" | "lockToken" | "lockToken((address,address,uint256,uint256))" | "mint" | "mint(address,uint256)" | "name" | "name()" | "nonce" | "nonce(address)" | "pause" | "pause(address)" | "pauseAll" | "pauseAll()" | "pausedAccounts" | "pausedAccounts()" | "permit" | "permit(address,address,uint256,uint256,bytes)" | "proxiableUUID" | "proxiableUUID()" | "setLocalAdmin" | "setLocalAdmin(address)" | "setSafeMode" | "setSafeMode(bool)" | "setUpgradeStatus" | "setUpgradeStatus(bool)" | "subjectAddress" | "subjectAddress()" | "supportsInterface" | "supportsInterface(bytes4)" | "symbol" | "symbol()" | "taxRate" | "taxRate()" | "taxTreasury" | "taxTreasury()" | "taxWhitelist" | "taxWhitelist()" | "totalBalanceOf" | "totalBalanceOf(address)" | "totalSupply" | "totalSupply()" | "transfer" | "transfer(address,uint256)" | "transferFrom" | "transferFrom(address,address,uint256)" | "unlockToken" | "unlockToken((bytes32,address,string))" | "unpause" | "unpause(address)" | "unpauseAll" | "unpauseAll()" | "updateTaxRate" | "updateTaxRate(uint256)" | "updateTaxWhitelist" | "updateTaxWhitelist(address,bool)" | "upgradeTo" | "upgradeTo(address,bytes,bool)" | "withdrawBalance" | "withdrawBalance(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "accessControlManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "accessControlManager()", values?: undefined): string;
    encodeFunctionData(functionFragment: "allowance", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "allowance(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "approve(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "balanceOf(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "batchClaimToken", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "batchClaimToken(bytes32[])", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "batchLockToken", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchLockToken((address,address,uint256,uint256)[])", values: [IERC20Lock.LockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransfer", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransfer((address,uint256)[])", values: [IERC20Extra.BatchTransferRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom((address,address,uint256)[])", values: [IERC20Extra.BatchTransferFromRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUnlockToken", values: [IERC20Lock.UnLockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUnlockToken((bytes32,address,string)[])", values: [IERC20Lock.UnLockTokenRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUpdateTaxWhitelist", values: [IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "batchUpdateTaxWhitelist((address,bool)[])", values: [IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[]]): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "burn(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "claimToken", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "claimToken(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contractContext", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractContext()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractName()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractRealm()", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals()", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "decreaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "distributeToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "distributeToken()", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "domainSeparator()", values?: undefined): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "increaseAllowance(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initStatus", values?: undefined): string;
    encodeFunctionData(functionFragment: "initStatus()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "initVersion()", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [LivelyToken.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "initialize((string,string,string,bytes,uint256,uint256,address,address,address))", values: [LivelyToken.InitRequestStruct]): string;
    encodeFunctionData(functionFragment: "isPaused", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isPaused(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isPausedAll", values?: undefined): string;
    encodeFunctionData(functionFragment: "isPausedAll()", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSafeMode", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSafeMode()", values?: undefined): string;
    encodeFunctionData(functionFragment: "isUpgradable", values?: undefined): string;
    encodeFunctionData(functionFragment: "isUpgradable()", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "localAdmin()", values?: undefined): string;
    encodeFunctionData(functionFragment: "lockBalanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockBalanceOf(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockInfo", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockInfo(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "lockToken", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "lockToken((address,address,uint256,uint256))", values: [IERC20Lock.LockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "name()", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonce", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nonce(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "pause", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "pause(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "pauseAll", values?: undefined): string;
    encodeFunctionData(functionFragment: "pauseAll()", values?: undefined): string;
    encodeFunctionData(functionFragment: "pausedAccounts", values?: undefined): string;
    encodeFunctionData(functionFragment: "pausedAccounts()", values?: undefined): string;
    encodeFunctionData(functionFragment: "permit", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "permit(address,address,uint256,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "setLocalAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLocalAdmin(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSafeMode", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setSafeMode(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setUpgradeStatus(bool)", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "subjectAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "subjectAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface(bytes4)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol()", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxRate()", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxTreasury()", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxWhitelist", values?: undefined): string;
    encodeFunctionData(functionFragment: "taxWhitelist()", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalBalanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalBalanceOf(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply()", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transfer(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "unlockToken", values: [IERC20Lock.UnLockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "unlockToken((bytes32,address,string))", values: [IERC20Lock.UnLockTokenRequestStruct]): string;
    encodeFunctionData(functionFragment: "unpause", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "unpause(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "unpauseAll", values?: undefined): string;
    encodeFunctionData(functionFragment: "unpauseAll()", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateTaxRate", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTaxRate(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTaxWhitelist", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "updateTaxWhitelist(address,bool)", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
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
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchClaimToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchClaimToken(bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchLockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchLockToken((address,address,uint256,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransfer((address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom((address,address,uint256)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUnlockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUnlockToken((bytes32,address,string)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUpdateTaxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchUpdateTaxWhitelist((address,bool)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToken(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractContext()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractName()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractRealm()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "distributeToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "distributeToken()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "domainSeparator()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initStatus()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initVersion()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize((string,string,string,bytes,uint256,uint256,address,address,address))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPaused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPaused(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPausedAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPausedAll()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSafeMode()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUpgradable()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "localAdmin()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockBalanceOf(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockInfo(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockToken((address,address,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pauseAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pauseAll()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pausedAccounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pausedAccounts()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit(address,address,uint256,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLocalAdmin(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMode(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeStatus(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "subjectAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface(bytes4)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxRate()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxTreasury()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "taxWhitelist()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalBalanceOf(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockToken((bytes32,address,string))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpauseAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpauseAll()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxRate(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxWhitelist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTaxWhitelist(address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo(address,bytes,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance(address)", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalDecresed(address,address,uint256)": EventFragment;
        "ApprovalIncremented(address,address,uint256)": EventFragment;
        "BatchTokenClaimed(address,uint256)": EventFragment;
        "BatchTokenLocked(address,uint256)": EventFragment;
        "BatchTokenUnlocked(address,uint256)": EventFragment;
        "BatchTransfer(address,uint256)": EventFragment;
        "BatchTransferFrom(address,uint256)": EventFragment;
        "Burn(address,address,uint256,uint256)": EventFragment;
        "Initialized(address,address,address,string,string,bytes32,uint16)": EventFragment;
        "LocalAdminChanged(address,address,address)": EventFragment;
        "Mint(address,address,uint256,uint256)": EventFragment;
        "Paused(address,address)": EventFragment;
        "PausedAll(address)": EventFragment;
        "SafeModeChanged(address,address,bytes32,bool)": EventFragment;
        "TaxRateUpdated(address,uint256)": EventFragment;
        "TaxWhitelistUpdated(address,address,bool)": EventFragment;
        "TokenClaimed(bytes32,address,address,uint256)": EventFragment;
        "TokenLocked(bytes32,address,address,address,uint256,uint256)": EventFragment;
        "TokenUnlocked(bytes32,address,address,address,uint256,string)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "TransferFrom(address,address,address,uint256)": EventFragment;
        "Unpaused(address,address)": EventFragment;
        "UnpausedAll(address)": EventFragment;
        "UpgradeStatusChanged(address,address,bytes32,bool)": EventFragment;
        "Upgraded(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Approval(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalDecresed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalDecresed(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalIncremented"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalIncremented(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenClaimed(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenLocked(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenUnlocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTokenUnlocked(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransfer(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransferFrom"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BatchTransferFrom(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Burn(address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized(address,address,address,string,string,bytes32,uint16)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LocalAdminChanged(address,address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Mint(address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PausedAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PausedAll(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SafeModeChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxRateUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxRateUpdated(address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxWhitelistUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TaxWhitelistUpdated(address,address,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenClaimed(bytes32,address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenLocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenLocked(bytes32,address,address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenUnlocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenUnlocked(bytes32,address,address,address,uint256,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferFrom"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferFrom(address,address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UnpausedAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UnpausedAll(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradeStatusChanged(address,address,bytes32,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded(address,address,address)"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    spender: string;
    amount: BigNumber;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalDecresedEventObject {
    owner: string;
    spender: string;
    amount: BigNumber;
}
export declare type ApprovalDecresedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalDecresedEventObject>;
export declare type ApprovalDecresedEventFilter = TypedEventFilter<ApprovalDecresedEvent>;
export interface ApprovalIncrementedEventObject {
    owner: string;
    spender: string;
    amount: BigNumber;
}
export declare type ApprovalIncrementedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalIncrementedEventObject>;
export declare type ApprovalIncrementedEventFilter = TypedEventFilter<ApprovalIncrementedEvent>;
export interface BatchTokenClaimedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenClaimedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenClaimedEventObject>;
export declare type BatchTokenClaimedEventFilter = TypedEventFilter<BatchTokenClaimedEvent>;
export interface BatchTokenLockedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenLockedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenLockedEventObject>;
export declare type BatchTokenLockedEventFilter = TypedEventFilter<BatchTokenLockedEvent>;
export interface BatchTokenUnlockedEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTokenUnlockedEvent = TypedEvent<[
    string,
    BigNumber
], BatchTokenUnlockedEventObject>;
export declare type BatchTokenUnlockedEventFilter = TypedEventFilter<BatchTokenUnlockedEvent>;
export interface BatchTransferEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTransferEvent = TypedEvent<[
    string,
    BigNumber
], BatchTransferEventObject>;
export declare type BatchTransferEventFilter = TypedEventFilter<BatchTransferEvent>;
export interface BatchTransferFromEventObject {
    sender: string;
    totalAmount: BigNumber;
}
export declare type BatchTransferFromEvent = TypedEvent<[
    string,
    BigNumber
], BatchTransferFromEventObject>;
export declare type BatchTransferFromEventFilter = TypedEventFilter<BatchTransferFromEvent>;
export interface BurnEventObject {
    sender: string;
    account: string;
    amount: BigNumber;
    totalSupply: BigNumber;
}
export declare type BurnEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], BurnEventObject>;
export declare type BurnEventFilter = TypedEventFilter<BurnEvent>;
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
export interface MintEventObject {
    sender: string;
    account: string;
    amount: BigNumber;
    totalSupply: BigNumber;
}
export declare type MintEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], MintEventObject>;
export declare type MintEventFilter = TypedEventFilter<MintEvent>;
export interface PausedEventObject {
    sender: string;
    account: string;
}
export declare type PausedEvent = TypedEvent<[string, string], PausedEventObject>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
export interface PausedAllEventObject {
    sender: string;
}
export declare type PausedAllEvent = TypedEvent<[string], PausedAllEventObject>;
export declare type PausedAllEventFilter = TypedEventFilter<PausedAllEvent>;
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
export interface TaxRateUpdatedEventObject {
    sender: string;
    rate: BigNumber;
}
export declare type TaxRateUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], TaxRateUpdatedEventObject>;
export declare type TaxRateUpdatedEventFilter = TypedEventFilter<TaxRateUpdatedEvent>;
export interface TaxWhitelistUpdatedEventObject {
    sender: string;
    account: string;
    isDeleted: boolean;
}
export declare type TaxWhitelistUpdatedEvent = TypedEvent<[
    string,
    string,
    boolean
], TaxWhitelistUpdatedEventObject>;
export declare type TaxWhitelistUpdatedEventFilter = TypedEventFilter<TaxWhitelistUpdatedEvent>;
export interface TokenClaimedEventObject {
    id: string;
    sender: string;
    src: string;
    amount: BigNumber;
}
export declare type TokenClaimedEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber
], TokenClaimedEventObject>;
export declare type TokenClaimedEventFilter = TypedEventFilter<TokenClaimedEvent>;
export interface TokenLockedEventObject {
    id: string;
    sender: string;
    src: string;
    account: string;
    timestamp: BigNumber;
    amount: BigNumber;
}
export declare type TokenLockedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
], TokenLockedEventObject>;
export declare type TokenLockedEventFilter = TypedEventFilter<TokenLockedEvent>;
export interface TokenUnlockedEventObject {
    id: string;
    sender: string;
    account: string;
    dest: string;
    amount: BigNumber;
    reason: string;
}
export declare type TokenUnlockedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], TokenUnlockedEventObject>;
export declare type TokenUnlockedEventFilter = TypedEventFilter<TokenUnlockedEvent>;
export interface TransferEventObject {
    sender: string;
    recipient: string;
    amount: BigNumber;
}
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface TransferFromEventObject {
    sender: string;
    from: string;
    to: string;
    amount: BigNumber;
}
export declare type TransferFromEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber
], TransferFromEventObject>;
export declare type TransferFromEventFilter = TypedEventFilter<TransferFromEvent>;
export interface UnpausedEventObject {
    sender: string;
    account: string;
}
export declare type UnpausedEvent = TypedEvent<[string, string], UnpausedEventObject>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface UnpausedAllEventObject {
    sender: string;
}
export declare type UnpausedAllEvent = TypedEvent<[string], UnpausedAllEventObject>;
export declare type UnpausedAllEventFilter = TypedEventFilter<UnpausedAllEvent>;
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
export interface LivelyToken extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LivelyTokenInterface;
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
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "allowance(address,address)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "approve(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "balanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contractContext(overrides?: CallOverrides): Promise<[string]>;
        "contractContext()"(overrides?: CallOverrides): Promise<[string]>;
        contractName(overrides?: CallOverrides): Promise<[string]>;
        "contractName()"(overrides?: CallOverrides): Promise<[string]>;
        contractRealm(overrides?: CallOverrides): Promise<[string]>;
        "contractRealm()"(overrides?: CallOverrides): Promise<[string]>;
        contractVersion(overrides?: CallOverrides): Promise<[string]>;
        "contractVersion()"(overrides?: CallOverrides): Promise<[string]>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        "decimals()"(overrides?: CallOverrides): Promise<[number]>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        distributeToken(overrides?: CallOverrides): Promise<[boolean]>;
        "distributeToken()"(overrides?: CallOverrides): Promise<[boolean]>;
        domainSeparator(overrides?: CallOverrides): Promise<[string]>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<[string]>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initStatus(overrides?: CallOverrides): Promise<[boolean]>;
        "initStatus()"(overrides?: CallOverrides): Promise<[boolean]>;
        initVersion(overrides?: CallOverrides): Promise<[number]>;
        "initVersion()"(overrides?: CallOverrides): Promise<[number]>;
        initialize(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize((string,string,string,bytes,uint256,uint256,address,address,address))"(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isPaused(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isPaused(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isPausedAll(overrides?: CallOverrides): Promise<[boolean]>;
        "isPausedAll()"(overrides?: CallOverrides): Promise<[boolean]>;
        isSafeMode(overrides?: CallOverrides): Promise<[boolean]>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<[boolean]>;
        isUpgradable(overrides?: CallOverrides): Promise<[boolean]>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<[boolean]>;
        localAdmin(overrides?: CallOverrides): Promise<[string]>;
        "localAdmin()"(overrides?: CallOverrides): Promise<[string]>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        "name()"(overrides?: CallOverrides): Promise<[string]>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        pause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "pause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        pauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "pauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        pausedAccounts(overrides?: CallOverrides): Promise<[string[]]>;
        "pausedAccounts()"(overrides?: CallOverrides): Promise<[string[]]>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;
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
        symbol(overrides?: CallOverrides): Promise<[string]>;
        "symbol()"(overrides?: CallOverrides): Promise<[string]>;
        taxRate(overrides?: CallOverrides): Promise<[BigNumber]>;
        "taxRate()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        taxTreasury(overrides?: CallOverrides): Promise<[string]>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<[string]>;
        taxWhitelist(overrides?: CallOverrides): Promise<[string[]]>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<[string[]]>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalSupply()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "transfer(address,uint256)"(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFrom(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "transferFrom(address,address,uint256)"(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unpause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "unpause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unpauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "unpauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateTaxRate(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateTaxRate(uint256)"(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
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
    allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "allowance(address,address)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "approve(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "balanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contractContext(overrides?: CallOverrides): Promise<string>;
    "contractContext()"(overrides?: CallOverrides): Promise<string>;
    contractName(overrides?: CallOverrides): Promise<string>;
    "contractName()"(overrides?: CallOverrides): Promise<string>;
    contractRealm(overrides?: CallOverrides): Promise<string>;
    "contractRealm()"(overrides?: CallOverrides): Promise<string>;
    contractVersion(overrides?: CallOverrides): Promise<string>;
    "contractVersion()"(overrides?: CallOverrides): Promise<string>;
    decimals(overrides?: CallOverrides): Promise<number>;
    "decimals()"(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    distributeToken(overrides?: CallOverrides): Promise<boolean>;
    "distributeToken()"(overrides?: CallOverrides): Promise<boolean>;
    domainSeparator(overrides?: CallOverrides): Promise<string>;
    "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
    increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initStatus(overrides?: CallOverrides): Promise<boolean>;
    "initStatus()"(overrides?: CallOverrides): Promise<boolean>;
    initVersion(overrides?: CallOverrides): Promise<number>;
    "initVersion()"(overrides?: CallOverrides): Promise<number>;
    initialize(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize((string,string,string,bytes,uint256,uint256,address,address,address))"(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isPaused(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isPaused(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isPausedAll(overrides?: CallOverrides): Promise<boolean>;
    "isPausedAll()"(overrides?: CallOverrides): Promise<boolean>;
    isSafeMode(overrides?: CallOverrides): Promise<boolean>;
    "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
    isUpgradable(overrides?: CallOverrides): Promise<boolean>;
    "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
    localAdmin(overrides?: CallOverrides): Promise<string>;
    "localAdmin()"(overrides?: CallOverrides): Promise<string>;
    lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
    "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
    lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    "name()"(overrides?: CallOverrides): Promise<string>;
    nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    pause(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "pause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    pauseAll(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "pauseAll()"(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    pausedAccounts(overrides?: CallOverrides): Promise<string[]>;
    "pausedAccounts()"(overrides?: CallOverrides): Promise<string[]>;
    permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
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
    symbol(overrides?: CallOverrides): Promise<string>;
    "symbol()"(overrides?: CallOverrides): Promise<string>;
    taxRate(overrides?: CallOverrides): Promise<BigNumber>;
    "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
    taxTreasury(overrides?: CallOverrides): Promise<string>;
    "taxTreasury()"(overrides?: CallOverrides): Promise<string>;
    taxWhitelist(overrides?: CallOverrides): Promise<string[]>;
    "taxWhitelist()"(overrides?: CallOverrides): Promise<string[]>;
    totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "transfer(address,uint256)"(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFrom(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "transferFrom(address,address,uint256)"(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unpause(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "unpause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unpauseAll(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "unpauseAll()"(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateTaxRate(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateTaxRate(uint256)"(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
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
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "allowance(address,address)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "approve(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<BigNumber>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<BigNumber>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: CallOverrides): Promise<string[]>;
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: CallOverrides): Promise<boolean>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: CallOverrides): Promise<void>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: CallOverrides): Promise<void>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contractContext(overrides?: CallOverrides): Promise<string>;
        "contractContext()"(overrides?: CallOverrides): Promise<string>;
        contractName(overrides?: CallOverrides): Promise<string>;
        "contractName()"(overrides?: CallOverrides): Promise<string>;
        contractRealm(overrides?: CallOverrides): Promise<string>;
        "contractRealm()"(overrides?: CallOverrides): Promise<string>;
        contractVersion(overrides?: CallOverrides): Promise<string>;
        "contractVersion()"(overrides?: CallOverrides): Promise<string>;
        decimals(overrides?: CallOverrides): Promise<number>;
        "decimals()"(overrides?: CallOverrides): Promise<number>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        distributeToken(overrides?: CallOverrides): Promise<boolean>;
        "distributeToken()"(overrides?: CallOverrides): Promise<boolean>;
        domainSeparator(overrides?: CallOverrides): Promise<string>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<string>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initStatus(overrides?: CallOverrides): Promise<boolean>;
        "initStatus()"(overrides?: CallOverrides): Promise<boolean>;
        initVersion(overrides?: CallOverrides): Promise<number>;
        "initVersion()"(overrides?: CallOverrides): Promise<number>;
        initialize(request: LivelyToken.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        "initialize((string,string,string,bytes,uint256,uint256,address,address,address))"(request: LivelyToken.InitRequestStruct, overrides?: CallOverrides): Promise<void>;
        isPaused(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isPaused(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isPausedAll(overrides?: CallOverrides): Promise<boolean>;
        "isPausedAll()"(overrides?: CallOverrides): Promise<boolean>;
        isSafeMode(overrides?: CallOverrides): Promise<boolean>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<boolean>;
        isUpgradable(overrides?: CallOverrides): Promise<boolean>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<boolean>;
        localAdmin(overrides?: CallOverrides): Promise<string>;
        "localAdmin()"(overrides?: CallOverrides): Promise<string>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, BigNumber, string, number]>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: CallOverrides): Promise<string>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<string>;
        "name()"(overrides?: CallOverrides): Promise<string>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        pause(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "pause(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        pauseAll(overrides?: CallOverrides): Promise<void>;
        "pauseAll()"(overrides?: CallOverrides): Promise<void>;
        pausedAccounts(overrides?: CallOverrides): Promise<string[]>;
        "pausedAccounts()"(overrides?: CallOverrides): Promise<string[]>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;
        setLocalAdmin(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "setLocalAdmin(address)"(newLocalAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        setSafeMode(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setSafeMode(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        setUpgradeStatus(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "setUpgradeStatus(bool)"(status: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        subjectAddress(overrides?: CallOverrides): Promise<string>;
        "subjectAddress()"(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        "supportsInterface(bytes4)"(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        "symbol()"(overrides?: CallOverrides): Promise<string>;
        taxRate(overrides?: CallOverrides): Promise<BigNumber>;
        "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxTreasury(overrides?: CallOverrides): Promise<string>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<string>;
        taxWhitelist(overrides?: CallOverrides): Promise<string[]>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<string[]>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "transfer(address,uint256)"(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferFrom(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "transferFrom(address,address,uint256)"(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: CallOverrides): Promise<BigNumber>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: CallOverrides): Promise<BigNumber>;
        unpause(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "unpause(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        unpauseAll(overrides?: CallOverrides): Promise<void>;
        "unpauseAll()"(overrides?: CallOverrides): Promise<void>;
        updateTaxRate(rate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "updateTaxRate(uint256)"(rate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<boolean>;
        upgradeTo(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        "upgradeTo(address,bytes,bool)"(newImplementation: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, forceCall: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        withdrawBalance(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdrawBalance(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalEventFilter;
        "ApprovalDecresed(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalDecresedEventFilter;
        ApprovalDecresed(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalDecresedEventFilter;
        "ApprovalIncremented(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalIncrementedEventFilter;
        ApprovalIncremented(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, amount?: null): ApprovalIncrementedEventFilter;
        "BatchTokenClaimed(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenClaimedEventFilter;
        BatchTokenClaimed(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenClaimedEventFilter;
        "BatchTokenLocked(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenLockedEventFilter;
        BatchTokenLocked(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenLockedEventFilter;
        "BatchTokenUnlocked(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenUnlockedEventFilter;
        BatchTokenUnlocked(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTokenUnlockedEventFilter;
        "BatchTransfer(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferEventFilter;
        BatchTransfer(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferEventFilter;
        "BatchTransferFrom(address,uint256)"(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferFromEventFilter;
        BatchTransferFrom(sender?: PromiseOrValue<string> | null, totalAmount?: null): BatchTransferFromEventFilter;
        "Burn(address,address,uint256,uint256)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): BurnEventFilter;
        Burn(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): BurnEventFilter;
        "Initialized(address,address,address,string,string,bytes32,uint16)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        Initialized(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, subject?: PromiseOrValue<string> | null, name?: null, version?: null, realm?: null, initCount?: null): InitializedEventFilter;
        "LocalAdminChanged(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        LocalAdminChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newAdmin?: null): LocalAdminChangedEventFilter;
        "Mint(address,address,uint256,uint256)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): MintEventFilter;
        Mint(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, amount?: null, totalSupply?: null): MintEventFilter;
        "Paused(address,address)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null): PausedEventFilter;
        Paused(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null): PausedEventFilter;
        "PausedAll(address)"(sender?: PromiseOrValue<string> | null): PausedAllEventFilter;
        PausedAll(sender?: PromiseOrValue<string> | null): PausedAllEventFilter;
        "SafeModeChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        SafeModeChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): SafeModeChangedEventFilter;
        "TaxRateUpdated(address,uint256)"(sender?: PromiseOrValue<string> | null, rate?: null): TaxRateUpdatedEventFilter;
        TaxRateUpdated(sender?: PromiseOrValue<string> | null, rate?: null): TaxRateUpdatedEventFilter;
        "TaxWhitelistUpdated(address,address,bool)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, isDeleted?: null): TaxWhitelistUpdatedEventFilter;
        TaxWhitelistUpdated(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, isDeleted?: null): TaxWhitelistUpdatedEventFilter;
        "TokenClaimed(bytes32,address,address,uint256)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, amount?: null): TokenClaimedEventFilter;
        TokenClaimed(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, amount?: null): TokenClaimedEventFilter;
        "TokenLocked(bytes32,address,address,address,uint256,uint256)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, account?: null, timestamp?: null, amount?: null): TokenLockedEventFilter;
        TokenLocked(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, src?: PromiseOrValue<string> | null, account?: null, timestamp?: null, amount?: null): TokenLockedEventFilter;
        "TokenUnlocked(bytes32,address,address,address,uint256,string)"(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, dest?: null, amount?: null, reason?: null): TokenUnlockedEventFilter;
        TokenUnlocked(id?: PromiseOrValue<BytesLike> | null, sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null, dest?: null, amount?: null, reason?: null): TokenUnlockedEventFilter;
        "Transfer(address,address,uint256)"(sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, amount?: null): TransferEventFilter;
        Transfer(sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, amount?: null): TransferEventFilter;
        "TransferFrom(address,address,address,uint256)"(sender?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): TransferFromEventFilter;
        TransferFrom(sender?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): TransferFromEventFilter;
        "Unpaused(address,address)"(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null): UnpausedEventFilter;
        Unpaused(sender?: PromiseOrValue<string> | null, account?: PromiseOrValue<string> | null): UnpausedEventFilter;
        "UnpausedAll(address)"(sender?: PromiseOrValue<string> | null): UnpausedAllEventFilter;
        UnpausedAll(sender?: PromiseOrValue<string> | null): UnpausedAllEventFilter;
        "UpgradeStatusChanged(address,address,bytes32,bool)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        UpgradeStatusChanged(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, realm?: PromiseOrValue<BytesLike> | null, status?: null): UpgradeStatusChangedEventFilter;
        "Upgraded(address,address,address)"(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(sender?: PromiseOrValue<string> | null, proxy?: PromiseOrValue<string> | null, newImplementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        accessControlManager(overrides?: CallOverrides): Promise<BigNumber>;
        "accessControlManager()"(overrides?: CallOverrides): Promise<BigNumber>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "allowance(address,address)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "approve(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contractContext(overrides?: CallOverrides): Promise<BigNumber>;
        "contractContext()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractName(overrides?: CallOverrides): Promise<BigNumber>;
        "contractName()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractRealm(overrides?: CallOverrides): Promise<BigNumber>;
        "contractRealm()"(overrides?: CallOverrides): Promise<BigNumber>;
        contractVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "contractVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        distributeToken(overrides?: CallOverrides): Promise<BigNumber>;
        "distributeToken()"(overrides?: CallOverrides): Promise<BigNumber>;
        domainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initStatus(overrides?: CallOverrides): Promise<BigNumber>;
        "initStatus()"(overrides?: CallOverrides): Promise<BigNumber>;
        initVersion(overrides?: CallOverrides): Promise<BigNumber>;
        "initVersion()"(overrides?: CallOverrides): Promise<BigNumber>;
        initialize(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize((string,string,string,bytes,uint256,uint256,address,address,address))"(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isPaused(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isPaused(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isPausedAll(overrides?: CallOverrides): Promise<BigNumber>;
        "isPausedAll()"(overrides?: CallOverrides): Promise<BigNumber>;
        isSafeMode(overrides?: CallOverrides): Promise<BigNumber>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<BigNumber>;
        isUpgradable(overrides?: CallOverrides): Promise<BigNumber>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<BigNumber>;
        localAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        "localAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        "name()"(overrides?: CallOverrides): Promise<BigNumber>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        pause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "pause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        pauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "pauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        pausedAccounts(overrides?: CallOverrides): Promise<BigNumber>;
        "pausedAccounts()"(overrides?: CallOverrides): Promise<BigNumber>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;
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
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        "symbol()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxRate(overrides?: CallOverrides): Promise<BigNumber>;
        "taxRate()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxTreasury(overrides?: CallOverrides): Promise<BigNumber>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<BigNumber>;
        taxWhitelist(overrides?: CallOverrides): Promise<BigNumber>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<BigNumber>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "transfer(address,uint256)"(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFrom(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "transferFrom(address,address,uint256)"(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unpause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "unpause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unpauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "unpauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateTaxRate(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateTaxRate(uint256)"(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
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
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "allowance(address,address)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "approve(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "balanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        batchClaimToken(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchClaimToken(bytes32[])"(lockIds: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchLockToken(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchLockToken((address,address,uint256,uint256)[])"(lockRequest: IERC20Lock.LockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchTransfer(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransfer((address,uint256)[])"(request: IERC20Extra.BatchTransferRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchTransferFrom(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransferFrom((address,address,uint256)[])"(request: IERC20Extra.BatchTransferFromRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchUnlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchUnlockToken((bytes32,address,string)[])"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        batchUpdateTaxWhitelist(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchUpdateTaxWhitelist((address,bool)[])"(request: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        burn(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "burn(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimToken(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "claimToken(bytes32)"(lockId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contractContext(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractContext()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractName(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractRealm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractRealm()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "contractVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decreaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "decreaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        distributeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "distributeToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        domainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "domainSeparator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        increaseAllowance(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "increaseAllowance(address,uint256)"(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initStatus()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "initVersion()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize((string,string,string,bytes,uint256,uint256,address,address,address))"(request: LivelyToken.InitRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isPaused(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isPaused(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isPausedAll(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isPausedAll()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isSafeMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isSafeMode()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isUpgradable(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isUpgradable()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "localAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "lockBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockInfo(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "lockInfo(bytes32,address)"(lockId: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lockToken(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "lockToken((address,address,uint256,uint256))"(lockRequest: IERC20Lock.LockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mint(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "mint(address,uint256)"(account: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonce(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "nonce(address)"(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "pause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        pauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "pauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        pausedAccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "pausedAccounts()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        permit(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "permit(address,address,uint256,uint256,bytes)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "symbol()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        taxRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxRate()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        taxTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxTreasury()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        taxWhitelist(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "taxWhitelist()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalBalanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalBalanceOf(address)"(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "transfer(address,uint256)"(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFrom(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "transferFrom(address,address,uint256)"(source: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unlockToken(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "unlockToken((bytes32,address,string))"(unlockRequest: IERC20Lock.UnLockTokenRequestStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unpause(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "unpause(address)"(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unpauseAll(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "unpauseAll()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateTaxRate(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateTaxRate(uint256)"(rate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateTaxWhitelist(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateTaxWhitelist(address,bool)"(account: PromiseOrValue<string>, isDeleted: PromiseOrValue<boolean>, overrides?: Overrides & {
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
