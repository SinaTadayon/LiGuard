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
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e458e3cfa10458575b24d22fb23a38fb46012500a400508afd7b9e46561ed54e64736f6c63430008110033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): DoubleEndedQueueUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DoubleEndedQueueUpgradeable;
}
export {};
