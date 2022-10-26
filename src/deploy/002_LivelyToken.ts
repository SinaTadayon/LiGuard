import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/* eslint-disable  node/no-unpublished-import */
import { BigNumber } from "ethers";

import { generateContextDomainSignatureByHardhat } from "../utils/deployUtils";

/* eslint-disable camelcase,node/no-extraneous-import */
import { LivelyToken, LivelyToken__factory } from "../../typechain/types";

const livelyTokenDomainName = "LivelyToken";
const livelyTokenDomainVersion = "1.0.0";
const livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";
export let LIVELY_TOKEN_INIT_VERSION: number;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdmin] = await ethers.getSigners();
  const systemAdminAddress = systemAdmin.address;
  const accessControlManager = await deployments.get("AccessControlManagerProxy");
  const chainId = await getChainId();
  const typedArray1 = new Int8Array(0);

  const lTokenERC20 = await deploy("LTokenERC20", {
    contract: "LTokenERC20",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const livelyTokenSubject = await deploy("LivelyTokenSubject", {
    contract: "LivelyToken",
    from: systemAdminAddress,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LTokenERC20: lTokenERC20.address,
    },
  });

  const livelyTokenProxy = await deploy("LivelyTokenProxy", {
    contract: "Proxy",
    from: systemAdminAddress,
    args: [livelyTokenSubject.address, typedArray1],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const signature = await generateContextDomainSignatureByHardhat(
    hre,
    livelyTokenProxy.address,
    livelyTokenDomainName,
    livelyTokenDomainVersion,
    livelyTokenDomainRealm,
    accessControlManager.address,
    systemAdminAddress,
    parseInt(chainId)
  );

  const request: LivelyToken.InitRequestStruct = {
    domainName: livelyTokenDomainName,
    domainVersion: livelyTokenDomainVersion,
    domainRealm: livelyTokenDomainRealm,
    signature,
    taxRateValue: BigNumber.from(0),
    accessControlManager: accessControlManager.address,
  };

  const livelyToken = LivelyToken__factory.connect(livelyTokenProxy.address, systemAdmin);
  LIVELY_TOKEN_INIT_VERSION = await livelyToken.initVersion();
  if (LIVELY_TOKEN_INIT_VERSION === 0) {
    const tx = await livelyToken.connect(systemAdmin).initialize(request);
    let txReceipt;
    if (hre.network.name === "polygon" || hre.network.name === "bsc") {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`[Initialize LivelyToken]`);
    console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();
  }
};

func.tags = ["LivelyTokenSubject", "LivelyTokenProxy", "LTokenERC20"];
func.dependencies = ["AccessControlManagerProxy"];
export default func;
