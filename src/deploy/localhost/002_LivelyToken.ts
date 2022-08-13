import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { EthereumProvider } from "hardhat/src/types/provider";
import { BigNumber } from "ethers";
import { TransactionRequest } from "@ethersproject/abstract-provider";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getUnnamedAccounts, ethers, getChainId, network } = hre;
  const { deploy } = deployments;
  const [ deployerSigner ] = await ethers.getSigners();
  const deployerSignerAddress = await deployerSigner.getAddress();
  const { deployer } = await getNamedAccounts();
  const accounts = await getUnnamedAccounts();
  const accessControlManager = await deployments.get("AccessControlManagerProxy");
  const chainId = await getChainId()
  const tokenDecimal = BigNumber.from(10).pow(BigNumber.from(18));
  const typedArray1 = new Int8Array(0);

  const lTokenERC20 = await deploy("LTokenERC20", {
    contract: "LTokenERC20",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const livelyTokenSubject = await deploy("LivelyTokenSubject", {
    contract: "LivelyToken",
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LTokenERC20: lTokenERC20.address
    }
  })

  const livelyTokenProxy = await deploy("LivelyTokenProxy", {
    contract: "Proxy",
    from: deployer,
    args: [livelyTokenSubject.address, typedArray1],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  console.log(`deployer address: ${deployer}`);
  console.log(`deployerSigner address: ${deployerSignerAddress}`);
  console.log(`taxTreasury address: ${accounts[0]}`);
  console.log(`assetManager address: ${accounts[1]}`);
  console.log(`accessControlManager address: ${accessControlManager.address}`);

  const signature = await generateContextDomainSignatureByHardhat(
    livelyTokenProxy.address,
    "LivelyToken",
    "1.0.0",
    "LIVELY_GENERAL_REALM",
    accessControlManager.address,
    deployer,
    parseInt(chainId),
    network.provider
  )

  console.log(`signature: ${signature}`);

  const iface = new ethers.utils.Interface(livelyTokenSubject.abi);
  const initData = iface.encodeFunctionData("initialize", [
    [
      "LivelyToken",
      "1.0.0",
      "LIVELY_GENERAL_REALM",
      signature,
      BigNumber.from(0),
      BigNumber.from(5000000000).mul(tokenDecimal), // TODO must will be changed
      accessControlManager.address,
      accounts[0],      // TODO must will be changed
      accounts[1],      // TODO must will be changed
    ]
  ]);

  const transaction: TransactionRequest = {
    to: livelyTokenProxy.address,
    data: initData,
  }

  const response = await deployerSigner.sendTransaction(transaction);
  const receiptTx = await ethers.provider.getTransactionReceipt(response.hash);

  console.log(`livelyToken initialize, txHash: ${receiptTx.transactionHash}, status: ${receiptTx.status}`);

}

export async function generateContextDomainSignatureByHardhat(
  contractAddress: Address,
  contractName: string,
  contractVersion: string,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Address,
  chainId: number,
  provider: EthereumProvider
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<string> {
  const messageParams = JSON.stringify({
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Context: [
        { name: "contract", type: "address" },
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "realm", type: "string" },
      ],
    },
    primaryType: "Context",
    domain: {
      name: "AccessControlManager",
      version: "1.0.0",
      chainId,
      verifyingContract,
    },
    message: {
      contract: contractAddress,
      name: contractName,
      version: contractVersion,
      realm: contractRealm,
    },
  });

  return await provider.send("eth_signTypedData_v4", [signerAddress, messageParams]);
}

func.tags = ["LivelyTokenSubject", "LivelyTokenProxy"]
func.dependencies = ["AccessControlManagerProxy"]
export default func;