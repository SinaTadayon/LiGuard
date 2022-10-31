import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { DoubleEndedQueueUpgradeable, DoubleEndedQueueUpgradeableInterface } from "../../../../lib/struct/LDoubleEndedQueueUpgradeable.sol/DoubleEndedQueueUpgradeable";
declare type DoubleEndedQueueUpgradeableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DoubleEndedQueueUpgradeable__factory extends ContractFactory {
    constructor(...args: DoubleEndedQueueUpgradeableConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<DoubleEndedQueueUpgradeable>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): DoubleEndedQueueUpgradeable;
    connect(signer: Signer): DoubleEndedQueueUpgradeable__factory;
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220adb3e4ec7a2b3cfa4ed114e2cab37f38d9c4af800097fd63a197f1363f9acb7e64736f6c63430008110033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): DoubleEndedQueueUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DoubleEndedQueueUpgradeable;
}
export {};
