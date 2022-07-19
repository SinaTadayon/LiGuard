import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const acl = await deploy("ACL", {
    contract: "LAccessControl",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const cml = await deploy("CML", {
    contract: "LContextManagement",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const rml = await deploy("RML", {
    contract: "LRoleManagement",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const reml = await deploy("REML", {
    contract: "LRealmManagement",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const gml = await deploy("GML", {
    contract: "LGroupManagement",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const accessControlManagerSubject = await deploy(
    "AccessControlManagerSubject",
    {
      contract: "AccessControlManager",
      from: deployer,
      args: [],
      log: true,
      skipIfAlreadyDeployed: true,
      libraries: {
        LAccessControl: acl.address,
        LContextManagement: cml.address,
        LRoleManagement: rml.address, 
        LGroupManagement: gml.address,
        LRealmManagement: reml.address,
      },
    }
  );

  const iface = new ethers.utils.Interface(accessControlManagerSubject.abi);
  const data = iface.encodeFunctionData("initialize", [
    "AccessControlManager",
    "1.0.0",
    "LIVELY_GENERAL_REALM",
    accessControlManagerSubject.address,
  ]);

  const AccessControlManagerProxy = await deploy("AccessControlManagerProxy", {
    contract: "Proxy",
    from: deployer,
    args: [accessControlManagerSubject.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

func.tags = ["AccessControlManagerSubject", "AccessControlManagerProxy", "ACL", "CML", "RML", "GML", "REML"];
export default func;
