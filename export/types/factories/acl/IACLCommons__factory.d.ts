import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IACLCommons, IACLCommonsInterface } from "../../acl/IACLCommons";
export declare class IACLCommons__factory {
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
    static createInterface(): IACLCommonsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IACLCommons;
}
