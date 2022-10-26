import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;
  const [systemAdminSigner, adminSigner] = await ethers.getSigners();
  const systemAdminAddress = systemAdminSigner.address;
  console.log(`systemAdminSigner address: ${systemAdminSigner.address}`);
  console.log(`adminSigner address: ${adminSigner.address}`);

  const acl = await deploy("LAccessControl", {
    contract: "LAccessControl",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const cml = await deploy("LContextManagement", {
    contract: "LContextManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const rml = await deploy("LRoleManagement", {
    contract: "LRoleManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const reml = await deploy("LRealmManagement", {
    contract: "LRealmManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const gml = await deploy("LGroupManagement", {
    contract: "LGroupManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const accessControlManagerSubject = await deploy("AccessControlManagerSubject", {
    contract: "AccessControlManager",
    from: systemAdminAddress,
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
    "AccessControlManager",
    "1.0.0",
    "LIVELY_GENERAL_REALM",
    ethers.constants.AddressZero,
  ]);

   await deploy("AccessControlManagerProxy", {
    contract: "Proxy",
    from: systemAdminAddress,
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
  "LRealmManagement"
];
export default func;
