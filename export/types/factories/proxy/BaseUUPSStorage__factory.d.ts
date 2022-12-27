import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseUUPSStorage, BaseUUPSStorageInterface } from "../../proxy/BaseUUPSStorage";
export declare class BaseUUPSStorage__factory {
    static readonly abi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): BaseUUPSStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseUUPSStorage;
}
