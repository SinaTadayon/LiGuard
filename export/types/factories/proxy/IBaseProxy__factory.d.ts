import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IBaseProxy, IBaseProxyInterface } from "../../proxy/IBaseProxy";
export declare class IBaseProxy__factory {
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

  static createInterface(): IBaseProxyInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): IBaseProxy;
}
