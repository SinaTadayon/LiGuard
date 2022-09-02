import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseUUPSProxy, BaseUUPSProxyInterface } from "../../proxy/BaseUUPSProxy";
export declare class BaseUUPSProxy__factory {
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
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
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
    static createInterface(): BaseUUPSProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseUUPSProxy;
}
