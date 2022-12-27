import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AccessControlStorageTest, AccessControlStorageTestInterface } from "../../../test/acl/AccessControlStorageTest";
export declare class AccessControlStorageTest__factory {
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
    static createInterface(): AccessControlStorageTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AccessControlStorageTest;
}
