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
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122016d03e862d1f7736fdf7b15c92d87eae607f995198c82d844b8afa30f720973264736f6c63430008110033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): DoubleEndedQueueUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DoubleEndedQueueUpgradeable;
}
export {};
