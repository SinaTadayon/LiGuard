import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseProxy, BaseProxyInterface } from "../../proxy/BaseProxy";
export declare class BaseProxy__factory {
  static readonly abi: {
    stateMutability: string;
    type: string;
  }[];

  static createInterface(): BaseProxyInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): BaseProxy;
}
