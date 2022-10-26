import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  AccessControlManager,
  AccessControlManager__factory, AssetERC20, AssetERC20__factory, AssetManagerERC20,
  AssetManagerERC20__factory, IAssetManagerERC20, IRoleManagement, LivelyToken,
  LivelyToken__factory
} from "../../typechain/types";
import {
  generatePredictContextDomainSignatureByHardhat,
  LIVELY_ADMIN_ROLE,
  LIVELY_ASSET_ADMIN_ROLE,
  LIVELY_ASSET_ERC20_DOMAIN_VERSION,
  LIVELY_ASSET_GROUP,
  LIVELY_ASSET_MANAGER_ROLE,
  LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
  LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
  LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE_NAME,
  LIVELY_CROWD_FOUNDING_ASSET_NAME,
  LIVELY_CROWD_FOUNDING_ASSET_ROLE,
  LIVELY_CROWD_FOUNDING_ASSET_ROLE_NAME,
  LIVELY_FOUNDING_TEAM_ASSET_NAME,
  LIVELY_FOUNDING_TEAM_ASSET_ROLE,
  LIVELY_FOUNDING_TEAM_ASSET_ROLE_NAME,
  LIVELY_PUBLIC_SALE_ASSET_NAME,
  LIVELY_PUBLIC_SALE_ASSET_ROLE,
  LIVELY_PUBLIC_SALE_ASSET_ROLE_NAME,
  LIVELY_TAX_TREASURY_ASSET_NAME,
  LIVELY_TREASURY_ASSET_NAME,
  LIVELY_TREASURY_ASSET_ROLE,
  LIVELY_TREASURY_ASSET_ROLE_NAME,
  LIVELY_VALIDATORS_REWARDS_ASSET_NAME,
  LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
  LIVELY_VALIDATORS_REWARDS_ASSET_ROLE_NAME
} from "../utils/deployUtils";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { LIVELY_TOKEN_INIT_VERSION } from "./002_LivelyToken";
import { ASSET_MANAGER_INIT_VERSION } from "./003_AssetManagerERC20";

type AssetInfo = {
  assetId: Address,
  assetRole: string,
  assetName: string,
  salt: string
}

const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdminSigner, adminSigner, assetAdminSigner] = await ethers.getSigners();
  const systemAdminAddress = systemAdminSigner.address;
  const adminAddress = adminSigner.address;
  const assetAdminAddress = assetAdminSigner.address;
  const accessControlManagerDeployed = await deployments.get("AccessControlManagerProxy");
  const assetManagerERC20Deployed = await deployments.get("AssetManagerERC20Proxy");
  const livelyTokenDeployed = await deployments.get("LivelyTokenProxy");
  const chainId = await getChainId();
  const accessControlManager = AccessControlManager__factory.connect(accessControlManagerDeployed.address, systemAdminSigner);
  const assetManagerERC20 = AssetManagerERC20__factory.connect(assetManagerERC20Deployed.address, systemAdminSigner);
  const livelyToken = LivelyToken__factory.connect(livelyTokenDeployed.address, systemAdminSigner);
  const assetERC20Subject = await deploy("AssetERC20Subject", {
    contract: "AssetERC20",
    from: systemAdminAddress,
    log: true,
    skipIfAlreadyDeployed: true,
  })

  if(LIVELY_TOKEN_INIT_VERSION === 0 && ASSET_MANAGER_INIT_VERSION === 0) {
    await registerAssetRoles(hre, accessControlManager, systemAdminSigner);
    await grantRolesToAccounts(hre, accessControlManager, assetManagerERC20, systemAdminSigner, adminAddress, assetAdminAddress);

    const assetsMap = await generateAssetsInfo(assetManagerERC20, assetERC20Subject.address);
    const assetSignature = await generatePredictContextDomainSignatureByHardhat(
      hre,
      assetManagerERC20.address,
      assetManagerERC20DomainRealm,
      accessControlManager.address,
      systemAdminAddress,
      parseInt(chainId),
      assetERC20Subject.address
    )

    let tx = await assetManagerERC20.connect(assetAdminSigner).updateAssetSubject(assetERC20Subject.address, assetSignature)
    let txReceipt;
    if (hre.network.name === 'polygon' || hre.network.name === 'bsc') {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`[ Update AssetSubject AssetManagerERC20 ]`);
    console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();

    // register lively token
    tx = await assetManagerERC20.connect(assetAdminSigner).registerToken(livelyToken.address);
    if (hre.network.name === 'polygon' || hre.network.name === 'bsc') {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`[ Register Token AssetManagerERC20 ]`);
    console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();

    // create assets
    for (const assetInfo of assetsMap.values()) {
      await createAsset(hre, assetManagerERC20, assetInfo, assetAdminSigner, livelyToken);
    }

    // grant role ASSET_MANAGER to ERC20 assets
    await grantAssetManagerRoleToAssets(hre, accessControlManager, assetManagerERC20, adminSigner, assetsMap);

    // distribute tokens to assets ERC20
    tx = await assetManagerERC20.connect(assetAdminSigner).livelyTokensDistribution(livelyToken.address)
    if (hre.network.name === 'polygon' || hre.network.name === 'bsc') {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`[ Distribution LivelyTokens ]`);
    console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();

    // revoke systemAdmin from LIVELY_ADMIN_ROLE role
    tx = await accessControlManager.connect(adminSigner).revokeRoleAccount(LIVELY_ADMIN_ROLE, systemAdminAddress);
    if (hre.network.name === 'polygon' || hre.network.name === 'bsc') {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`[ Revoke Role LIVELY_ADMIN_ROLE From SystemAdmin ]`);
    console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();
  }
}

async function registerAssetRoles(hre:HardhatRuntimeEnvironment,
                                  accessControlManager: AccessControlManager,
                                  systemAdmin: Signer) {
  const registerRoleRequest: IRoleManagement.RegiterRoleRequestStruct[] = [
    {
      name: LIVELY_CROWD_FOUNDING_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    },
    {
      name: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    },
    {
      name: LIVELY_PUBLIC_SALE_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    },
    {
      name: LIVELY_TREASURY_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    },
    {
      name: LIVELY_FOUNDING_TEAM_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    },
    {
      name: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE_NAME,
      group: LIVELY_ASSET_GROUP,
      status: true
    }
  ]

  let tx = await accessControlManager.connect(systemAdmin).batchRegisterRole(registerRoleRequest)
  let txReceipt;
  if(hre.network.name === 'polygon' || hre.network.name === 'bsc') {
    txReceipt = await tx.wait(7);
  } else {
    txReceipt = await tx.wait(1);
  }
  console.log(`[ BatchRegisterRole AccessControlManager ]`);
  console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
  console.log();

}

async function grantRolesToAccounts(hre:HardhatRuntimeEnvironment,
                                    accessControlManager: AccessControlManager,
                                    assetManagerERC20: AssetManagerERC20,
                                    systemAdminSigner: Signer,
                                    adminAddress: string,
                                    assetAdminAddress: string) {

  const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
    {
      role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_PUBLIC_SALE_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_TREASURY_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_CROWD_FOUNDING_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_FOUNDING_TEAM_ASSET_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_ASSET_ADMIN_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_ASSET_ADMIN_ROLE,
      account: assetAdminAddress,
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      account: assetManagerERC20.address,
    },
    {
      role: LIVELY_ADMIN_ROLE,
      account: adminAddress,
    },
  ]

  let tx = await accessControlManager.connect(systemAdminSigner).batchGrantRoleAccount(batchGrantRequest)
  let txReceipt;
  if(hre.network.name === 'polygon' || hre.network.name === 'bsc') {
    txReceipt = await tx.wait(7);
  } else {
    txReceipt = await tx.wait(1);
  }
  console.log(`[ BatchGrantRoleAccount AccessControlManager ]`);
  console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
  console.log();
}

async function generateAssetsInfo(assetManagerERC20: AssetManagerERC20,
                                  assetERC20Subject: Address): Promise<Map<string, AssetInfo>> {
  const assetMap = new Map<string,AssetInfo>();

  let saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  let assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME, assetRole: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_FOUNDING_TEAM_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_FOUNDING_TEAM_ASSET_NAME, assetRole: LIVELY_FOUNDING_TEAM_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_TREASURY_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_TREASURY_ASSET_NAME, assetRole: LIVELY_TREASURY_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_PUBLIC_SALE_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_PUBLIC_SALE_ASSET_NAME, assetRole: LIVELY_PUBLIC_SALE_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_VALIDATORS_REWARDS_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_VALIDATORS_REWARDS_ASSET_NAME, assetRole: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_CROWD_FOUNDING_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_CROWD_FOUNDING_ASSET_NAME, assetRole: LIVELY_CROWD_FOUNDING_ASSET_ROLE});

  saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
  assetId = await assetManagerERC20.predictAddress(assetERC20Subject, saltValue, assetManagerERC20.address);
  assetMap.set(LIVELY_TAX_TREASURY_ASSET_NAME, {assetId, salt: saltValue, assetName: LIVELY_TAX_TREASURY_ASSET_NAME, assetRole: LIVELY_ASSET_ADMIN_ROLE});

  return assetMap;
}

async function createAsset(hre: HardhatRuntimeEnvironment,
                           assetManagerERC20: AssetManagerERC20,
                           assetInfo: AssetInfo,
                           assetAdmin: Signer,
                           livelyToken: LivelyToken): Promise<AssetERC20> {
  const factory = new AssetERC20__factory(assetAdmin);
  const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
    assetName: assetInfo.assetName,
    assetVersion: LIVELY_ASSET_ERC20_DOMAIN_VERSION,
    tokenId: livelyToken.address,
    role: assetInfo.assetRole,
    salt: assetInfo.salt
  }
  let asset = await factory.attach(assetInfo.assetId);
  let tx = await assetManagerERC20.connect(assetAdmin).createAsset(createAssetRequest);
  let txReceipt;
  if(hre.network.name === 'polygon' || hre.network.name === 'bsc') {
    txReceipt = await tx.wait(7);
  } else {
    txReceipt = await tx.wait(1);
  }
  console.log(`[ CreateAsset AssetManagerERC20 ]`);
  console.log(`name: ${assetInfo.assetName}, deployed at: ${assetInfo.assetId}`);
  console.log(`salt: ${assetInfo.salt}, role: ${assetInfo.assetRole}`);
  console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
  console.log();

  return asset;
}

async function grantAssetManagerRoleToAssets(
      hre: HardhatRuntimeEnvironment,
      accessControlManager: AccessControlManager,
      assetManagerERC20: AssetManagerERC20,
      adminSigner: Signer,
      assetsMap: Map<string, AssetInfo>) {

  const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME).assetId,
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_FOUNDING_TEAM_ASSET_NAME).assetId,
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_TREASURY_ASSET_NAME).assetId,
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_PUBLIC_SALE_ASSET_NAME).assetId
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_VALIDATORS_REWARDS_ASSET_NAME).assetId
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_CROWD_FOUNDING_ASSET_NAME).assetId
    },
    {
      role: LIVELY_ASSET_MANAGER_ROLE,
      // @ts-ignore
      account: assetsMap.get(LIVELY_TAX_TREASURY_ASSET_NAME).assetId
    },
  ]

  let tx = await accessControlManager.connect(adminSigner).batchGrantRoleAccount(batchGrantRequest)
  let txReceipt;
  if(hre.network.name === 'polygon' || hre.network.name === 'bsc') {
    txReceipt = await tx.wait(7);
  } else {
    txReceipt = await tx.wait(1);
  }
  console.log(`[ BatchGrantRoleAccount AccessControlManager ]`);
  console.log(`tx: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
  console.log();
}

func.dependencies = ["AccessControlManagerProxy", "LivelyTokenProxy", "AssetManagerERC20Proxy"];
export default func;
