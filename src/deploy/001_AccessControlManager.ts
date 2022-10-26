import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const accessControlDomainName = "AccessControlManager";
const accessControlDomainVersion = "1.0.0";
const accessControlDomainRealm = "LIVELY_GENERAL_REALM";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdmin, admin, assetManager] = await ethers.getSigners();
  const chainId = await getChainId();
  console.log(`systemAdmin address: ${systemAdmin.address}`);
  console.log(`admin address: ${admin.address}`);
  console.log(`assetManager address: ${assetManager.address}`);
  console.log(`network name: ${hre.network.name}`);
  console.log(`network chainId: ${chainId}`);

  const acl = await deploy("LAccessControl", {
    contract: "LAccessControl",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const cml = await deploy("LContextManagement", {
    contract: "LContextManagement",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const rml = await deploy("LRoleManagement", {
    contract: "LRoleManagement",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const reml = await deploy("LRealmManagement", {
    contract: "LRealmManagement",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const gml = await deploy("LGroupManagement", {
    contract: "LGroupManagement",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const accessControlManagerSubject = await deploy("AccessControlManagerSubject", {
    contract: "AccessControlManager",
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LContextManagement: cml.address,
      LAccessControl: acl.address,
      LRealmManagement: reml.address,
      LGroupManagement: gml.address,
      LRoleManagement: rml.address,
    },
  });

  const iface = new ethers.utils.Interface(accessControlManagerSubject.abi);
  const data = iface.encodeFunctionData("initialize", [
    accessControlDomainName,
    accessControlDomainVersion,
    accessControlDomainRealm,
    ethers.constants.AddressZero,
  ]);

  await deploy("AccessControlManagerProxy", {
    contract: "Proxy",
    from: systemAdmin.address,
    args: [accessControlManagerSubject.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

func.tags = [
  "AccessControlManagerSubject",
  "AccessControlManagerProxy",
  "LAccessControl",
  "LContextManagement",
  "LRoleManagement",
  "LGroupManagement",
  "LRealmManagement",
];
export default func;
