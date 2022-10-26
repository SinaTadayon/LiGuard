import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AccessControlManager__factory } from "../../../typechain/types";
import { Signer } from "ethers";
import { LIVELY_ADMIN_ROLE } from "../../test/TestUtils";
// import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;
  // const { systemAdminAddress, admin } = await getNamedAccounts();
  const [systemAdminSigner, adminSigner, assetAdminSigner] = await ethers.getSigners();
  const systemAdminAddress = systemAdminSigner.address;
  const adminAddress = adminSigner.address;

  // console.log(`systemAdminAddress address: ${systemAdminAddress}`);
  // console.log(`admin address: ${admin}`);
  console.log(`systemAdminSigner address: ${systemAdminSigner.address}`);
  console.log(`adminSigner address: ${adminSigner.address}`);

  const acl = await deploy("ACL", {
    contract: "LAccessControl",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const cml = await deploy("CML", {
    contract: "LContextManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const rml = await deploy("RML", {
    contract: "LRoleManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const reml = await deploy("REML", {
    contract: "LRealmManagement",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAccessControl: acl.address,
    },
  });

  const gml = await deploy("GML", {
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

  const accessControlManagerProxy = await deploy("AccessControlManagerProxy", {
    contract: "Proxy",
    from: systemAdminAddress,
    args: [accessControlManagerSubject.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

func.tags = ["AccessControlManagerSubject", "AccessControlManagerProxy", "ACL", "CML", "RML", "GML", "REML"];
export default func;
