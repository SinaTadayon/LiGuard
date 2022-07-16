import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const contextManagementLib = await deploy("ContextManagementLib", {
    contract: "ContextManagementLib",
    from: deployer,
    args: [],
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
        ContextManagementLib: contextManagementLib.address,
      },
    }
  );

  const iface = new ethers.utils.Interface(accessControlManagerSubject.abi);
  const data = iface.encodeFunctionData("initialize", [
    "AccessControlManager",
    "v0.0.1",
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

func.tags = ["AccessControlManagerSubject", "AccessControlManagerProxy"];
export default func;
