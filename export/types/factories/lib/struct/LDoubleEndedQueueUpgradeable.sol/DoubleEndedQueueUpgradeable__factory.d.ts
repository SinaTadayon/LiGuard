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
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209a2f76e6f28eda6b6d12d3f8588193543fb1ed89b9e87a41dedd50f6f2d0b6ad64736f6c63430008110033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): DoubleEndedQueueUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DoubleEndedQueueUpgradeable;
}
export {};
