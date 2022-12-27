import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ACLStorage, ACLStorageInterface } from "../../acl/ACLStorage";
export declare class ACLStorage__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): ACLStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ACLStorage;
}
