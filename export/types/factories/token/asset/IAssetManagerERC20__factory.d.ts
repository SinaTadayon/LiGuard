import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAssetManagerERC20, IAssetManagerERC20Interface } from "../../../token/asset/IAssetManagerERC20";
export declare class IAssetManagerERC20__factory {
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
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
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
    static createInterface(): IAssetManagerERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAssetManagerERC20;
}
