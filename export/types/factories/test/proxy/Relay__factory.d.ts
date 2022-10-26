import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Relay, RelayInterface } from "../../../test/proxy/Relay";
declare type RelayConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Relay__factory extends ContractFactory {
    constructor(...args: RelayConstructorParams);
    deploy(destContract: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Relay>;
    getDeployTransaction(destContract: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Relay;
    connect(signer: Signer): Relay__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161010d38038061010d83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b607b806100926000396000f3fe608060405236601057600e6013565b005b600e5b601a34601c565b565b600054366000803760008036600085855af190503d6000803e8080156040573d6000f35b3d6000fdfea2646970667358221220f7a9d15d534fff6c3891396833aad25bee368ea1de66a68b83e72c99fe046b1664736f6c63430008110033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
    })[];
    static createInterface(): RelayInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Relay;
}
export {};
