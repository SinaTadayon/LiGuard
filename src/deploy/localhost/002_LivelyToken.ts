import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/* eslint-disable  node/no-unpublished-import */
import { BigNumber } from "ethers";

/* eslint-disable node/no-extraneous-import */
import { generateContextDomainSignatureByHardhat } from "../../utils/deployUtils";
import { LivelyToken, LivelyToken__factory } from "../../../typechain/types";

const livelyTokenDomainName = "LivelyToken";
const livelyTokenDomainVersion = "1.0.0";
const livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdminSigner, adminSigner, assetAdminSigner] = await ethers.getSigners();
  const systemAdminAddress = systemAdminSigner.address;
  const adminAddress = adminSigner.address;
  const assetAdminAddress = assetAdminSigner.address;
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

  let livelyToken = LivelyToken__factory.connect(livelyTokenProxy.address, systemAdminSigner);
  let tx = await livelyToken.connect(systemAdminSigner).initialize(request);
  let txReceipt = await tx.wait(1);
  console.log(`livelyToken initialize, txHash: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);

};

func.tags = ["LivelyTokenSubject", "LivelyTokenProxy", "LTokenERC20"];
func.dependencies = ["AccessControlManagerProxy"];
export default func;
