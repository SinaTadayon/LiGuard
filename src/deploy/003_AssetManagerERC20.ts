// import { DeployFunction } from "hardhat-deploy/types";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
//
// /* eslint-disable camelcase,node/no-unpublished-import */
// import { AssetManagerERC20, AssetManagerERC20__factory } from "../../typechain/types";
// import { generateContextDomainSignatureByHardhat } from "../utils/deployUtils";
//
// const assetManagerERC20DomainName = "AssetManagerERC20";
// const assetManagerERC20DomainVersion = "1.0.0";
// const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";
// export let ASSET_MANAGER_INIT_VERSION: number;
//
// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { deployments, ethers, getChainId } = hre;
//   const { deploy } = deployments;
//   const [systemAdmin] = await ethers.getSigners();
//   const systemAdminAddress = systemAdmin.address;
//   const accessControlManager = await deployments.get("AccessControlManagerProxy");
//   const chainId = await getChainId();
//   const typedArray1 = new Int8Array(0);
//
//   const lAssetManagerERC20 = await deploy("LAssetManagerERC20", {
//     contract: "LAssetManagerERC20",
//     from: systemAdminAddress,
//     log: true,
//     skipIfAlreadyDeployed: true,
//   });
//
//   const assetManagerERC20Subject = await deploy("AssetManagerERC20Subject", {
//     contract: "AssetManagerERC20",
//     from: systemAdminAddress,
//     args: [],
//     log: true,
//     skipIfAlreadyDeployed: true,
//     libraries: {
//       LAssetManagerERC20: lAssetManagerERC20.address,
//     },
//   });
//
//   const assetManagerERC20Proxy = await deploy("AssetManagerERC20Proxy", {
//     contract: "Proxy",
//     from: systemAdminAddress,
//     args: [assetManagerERC20Subject.address, typedArray1],
//     log: true,
//     skipIfAlreadyDeployed: true,
//   });
//
//   const signature = await generateContextDomainSignatureByHardhat(
//     hre,
//     assetManagerERC20Proxy.address,
//     assetManagerERC20DomainName,
//     assetManagerERC20DomainVersion,
//     assetManagerERC20DomainRealm,
//     accessControlManager.address,
//     systemAdminAddress,
//     parseInt(chainId)
//   );
//
//   const request: AssetManagerERC20.InitRequestStruct = {
//     domainName: assetManagerERC20DomainName,
//     domainVersion: assetManagerERC20DomainVersion,
//     domainRealm: assetManagerERC20DomainRealm,
//     accessControlManager: accessControlManager.address,
//     assetManagerSignature: signature,
//   };
//
//   const assetManagerERC20 = AssetManagerERC20__factory.connect(assetManagerERC20Proxy.address, systemAdmin);
//   ASSET_MANAGER_INIT_VERSION = await assetManagerERC20.initVersion();
//   if (ASSET_MANAGER_INIT_VERSION === 0) {
//     let txReceipt;
//     console.log(`[Initialize AssetManagerERC20 ]`);
//     const tx = await assetManagerERC20.connect(systemAdmin).initialize(request);
//     console.log(`txHash: ${tx.hash} . . .`);
//     if (hre.network.name === "polygon" || hre.network.name === "bsc") {
//       txReceipt = await tx.wait(7);
//     } else {
//       txReceipt = await tx.wait(1);
//     }
//     console.log(`txHash: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
//     // console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
//     console.log();
//   }
// };
//
// func.tags = ["AssetManagerERC20Subject", "AssetManagerERC20Proxy"];
// func.dependencies = ["AccessControlManagerProxy", "LivelyTokenProxy"];
// export default func;
