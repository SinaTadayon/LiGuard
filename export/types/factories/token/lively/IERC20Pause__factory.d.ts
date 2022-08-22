import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Pause, IERC20PauseInterface } from "../../../token/lively/IERC20Pause";
export declare class IERC20Pause__factory {
  static readonly abi: (
    | {
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
      }
    | {
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
      }
  )[];

  static createInterface(): IERC20PauseInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): IERC20Pause;
}
