import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC1967UpgradeTest, ERC1967UpgradeTestInterface } from "../../../test/proxy/ERC1967UpgradeTest";
export declare class ERC1967UpgradeTest__factory {
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

  static createInterface(): ERC1967UpgradeTestInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): ERC1967UpgradeTest;
}
