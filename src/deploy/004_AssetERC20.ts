import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
/* eslint-disable camelcase,node/no-unpublished-import */
import {
  ACLManager,
  ACLManager__factory,
  AssetERC20,
  AssetERC20__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory,
  IAssetManagerERC20,
  IMemberManagement,
  IRoleManagement,
  LivelyToken,
  LivelyToken__factory,
  MemberManager,
  MemberManager__factory,
  RoleManager,
  RoleManager__factory,
} from "../../typechain/types";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import {
  ACL_REALM_LIVELY_TOKEN_ERC20_ID,
  ACL_REALM_LIVELY_TOKEN_ERC20_NAME,
  ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
  ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
  LIVELY_TOKEN_INIT_VERSION,
  LIVELY_TOKEN_PROXY,
} from "./002_LivelyToken";
import { ASSET_MANAGER_ERC20_PROXY, ASSET_MANAGER_INIT_VERSION } from "./003_AssetManagerERC20";
import {
  ActivityStatus,
  AlterabilityStatus,
  generatePredictContextDomainSignatureByHardhatProvider,
} from "../utils/Utils";
import { IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import {
  ACL_MANAGER_CONTRACT_NAME_PROXY,
  EMPTY_MEMBER_SIGNATURE,
  MAINNET_TX_WAIT_BLOCK_COUNT,
  TESTNET_TX_WAIT_BLOCK_COUNT,
} from "./001_LivelyGuard";
import { Signer } from "ethers";
type AssetInfo = {
  assetId: Address;
  assetRole: string;
  assetName: string;
  salt: string;
};

const ASSET_ERC20_SUBJECT = "AssetERC20Subject";
const ASSET_ERC20_NAME = "AssetERC20";
const ASSET_ERC20_CONTRACT_VERSION = "3.0.0";

const LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
const LIVELY_FOUNDING_TEAM_ASSET_NAME = "LIVELY_FOUNDING_TEAM_ASSET";
const LIVELY_TREASURY_ASSET_NAME = "LIVELY_TREASURY_ASSET";
const LIVELY_PUBLIC_SALE_ASSET_NAME = "LIVELY_PUBLIC_SALE_ASSET";
const LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "LIVELY_VALIDATORS_REWARDS_ASSET";
const LIVELY_CROWD_FOUNDING_ASSET_NAME = "LIVELY_CROWD_FOUNDING_ASSET";
const LIVELY_TAX_TREASURY_ASSET_NAME = "LIVELY_TAX_TREASURY_ASSET";

const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME =
  "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.AUDIO_VIDEO_PROGRAM_ASSET_ADMIN";
const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME =
  "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.FOUNDING_TEAM_ASSET_ADMIN";
const ACL_ROLE_LIVELY_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TREASURY_ASSET_ADMIN";
const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.PUBLIC_SALE_ASSET_ADMIN";
const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME =
  "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.VALIDATORS_REWARDS_ASSET_ADMIN";
const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME =
  "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.CROWD_FOUNDING_ASSET_ADMIN";
const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TAX_TREASURY_ASSET_ADMIN";

const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME)
);
const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME)
);
const ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TREASURY_ASSET_NAME)
);
const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME)
);
const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME)
);
const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME)
);
const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_ID = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME)
);

let assetERC20Subject: DeployResult;

let memberManagerDelegateProxy: MemberManager;
let roleManagerDelegateProxy: RoleManager;

let assetAudioVideoProgramId: string;
let assetFoundingTeamId: string;
let assetTreasuryId: string;
let assetPublicSaleId: string;
let assetValidatorsRewardsId: string;
let assetCrowdFoundingId: string;
let assetTaxTreasuryId: string;

let assetAudioVideoProgramAddress: string;
let assetFoundingTeamAddress: string;
let assetTreasuryAddress: string;
let assetPublicSaleAddress: string;
let assetValidatorsRewardsAddress: string;
let assetCrowdFoundingAddress: string;
let assetTaxTreasuryAddress: string;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;
  const {systemAdmin, assetAdmin} = await ethers.getNamedSigners();
  const aclManagerProxyDeployed = await deployments.get(ACL_MANAGER_CONTRACT_NAME_PROXY);
  const assetManagerProxyDeployed = await deployments.get(ASSET_MANAGER_ERC20_PROXY);
  const livelyTokenProxyDeployed = await deployments.get(LIVELY_TOKEN_PROXY);
  const aclManagerProxy = ACLManager__factory.connect(aclManagerProxyDeployed.address, systemAdmin);
  const assetManagerProxy = AssetManagerERC20__factory.connect(assetManagerProxyDeployed.address, systemAdmin);
  const livelyTokenProxy = LivelyToken__factory.connect(livelyTokenProxyDeployed.address, systemAdmin);

  memberManagerDelegateProxy = MemberManager__factory.connect(aclManagerProxy.address, systemAdmin);
  roleManagerDelegateProxy = RoleManager__factory.connect(aclManagerProxy.address, systemAdmin);

  assetERC20Subject = await deploy(ASSET_ERC20_SUBJECT, {
    contract: ASSET_ERC20_NAME,
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (LIVELY_TOKEN_INIT_VERSION === 0 && ASSET_MANAGER_INIT_VERSION === 0) {
    await registerAssetAClRoles(assetAdmin, hre);

    await registerLivelyTokenToAssetManager(
      livelyTokenProxy,
      assetManagerProxy,
      aclManagerProxy,
      systemAdmin,
      assetAdmin,
      hre
    );

    await registerLivelyTokenAssets(systemAdmin, assetAdmin, livelyTokenProxy, assetManagerProxy, hre);

    await registerAssetRoles(assetAdmin, hre);

    await updateAssetRolesScope(assetAdmin, hre);

    await distributeLivelyToken(assetAdmin, livelyTokenProxy, assetManagerProxy, hre);
  }
};

async function registerAssetAClRoles(assetAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      scopeId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      typeId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_TREASURY_ASSET_NAME,
    },
  ];
  let txReceipt;
  console.log(`[ Register Assets ACL Roles ]`);
  const tx = await roleManagerDelegateProxy
    .connect(assetAdmin)
    .roleRegister(EMPTY_MEMBER_SIGNATURE, roleRegisterRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

async function registerLivelyTokenToAssetManager(
  livelyTokenProxy: LivelyToken,
  assetManagerProxy: AssetManagerERC20,
  aclManagerProxy: ACLManager,
  systemAdmin: Signer,
  assetAdmin: Signer,
  hre: HardhatRuntimeEnvironment
) {
  const systemAdminAddress = await systemAdmin.getAddress();
  const chainId = await hre.getChainId();
  const assetSignature = await generatePredictContextDomainSignatureByHardhatProvider(
    hre,
    assetManagerProxy.address,
    ACL_REALM_LIVELY_TOKEN_ERC20_NAME,
    aclManagerProxy.address,
    systemAdminAddress,
    parseInt(chainId),
    assetERC20Subject.address
  );
  const registerTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
    {
      tokenId: livelyTokenProxy.address,
      assetSubjectId: assetERC20Subject.address,
      assetSignature,
    },
  ];
  let txReceipt;
  console.log(`[ Register LivelyToken To AssetManagerERC20 ]`);
  const tx = await assetManagerProxy.connect(assetAdmin).registerToken(registerTokenRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

async function registerLivelyTokenAssets(
  systemAdmin: Signer,
  assetAdmin: Signer,
  livelyTokenProxy: LivelyToken,
  assetManagerProxy: AssetManagerERC20,
  hre: HardhatRuntimeEnvironment
) {
  // Register LIVELY_AUDIO_VIDEO_PROGRAM Asset
  let saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetAudioVideoProgramAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createAudioVideoProgramAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetAudioVideoProgramId = ethers.utils.keccak256(assetAudioVideoProgramAddress);
  let txReceipt;
  console.log(`[ Register LIVELY_AUDIO_VIDEO_PROGRAM Asset ]`);
  let tx = await assetManagerProxy.connect(assetAdmin).createAsset(createAudioVideoProgramAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register LIVELY_FOUNDING_TEAM Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetFoundingTeamAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createFoundingTeamAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_FOUNDING_TEAM_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetFoundingTeamId = ethers.utils.keccak256(assetFoundingTeamAddress);
  console.log(`[ Register LIVELY_FOUNDING_TEAM Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createFoundingTeamAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register LIVELY_TREASURY Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetTreasuryAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createTreasuryAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_TREASURY_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetTreasuryId = ethers.utils.keccak256(assetTreasuryAddress);
  console.log(`[ Register LIVELY_TREASURY Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createTreasuryAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register LIVELY_PUBLIC_SALE Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetPublicSaleAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createPublicSalesAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_PUBLIC_SALE_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetPublicSaleId = ethers.utils.keccak256(assetPublicSaleAddress);
  console.log(`[ Register LIVELY_PUBLIC_SALE Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createPublicSalesAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register VALIDATOR_REWARDS Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetValidatorsRewardsAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createValidatorRewardAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_VALIDATOR_REWARDS_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetValidatorsRewardsId = ethers.utils.keccak256(assetValidatorsRewardsAddress);
  console.log(`[ Register LIVELY_VALIDATOR_REWARDS Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createValidatorRewardAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register LIVELY_CROWD_FOUNDING Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetCrowdFoundingAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createCrowdFoundingAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_CROWD_FOUNDING_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetCrowdFoundingId = ethers.utils.keccak256(assetCrowdFoundingAddress);
  console.log(`[ Register LIVELY_CROWD_FOUNDING Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createCrowdFoundingAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  // Register LIVELY_TAX_TREASURY Asset
  saltValue = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  );
  assetTaxTreasuryAddress = await assetManagerProxy.predictAddress(
    assetERC20Subject.address,
    saltValue,
    assetManagerProxy.address
  );
  const createTaxTreasuryAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_ID,
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      salt: saltValue,
      assetName: LIVELY_TAX_TREASURY_ASSET_NAME,
      assetVersion: ASSET_ERC20_CONTRACT_VERSION,
      tokenId: livelyTokenProxy.address,
      assetId: ethers.constants.AddressZero,
    },
  ];
  assetTaxTreasuryId = ethers.utils.keccak256(assetTaxTreasuryAddress);
  console.log(`[ Register LIVELY_TAX_TREASURY Asset ]`);
  tx = await assetManagerProxy.connect(assetAdmin).createAsset(createTaxTreasuryAssetRequest);
  console.log(`salt: ${saltValue}`);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

async function registerAssetRoles(assetAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
    {
      roleId: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_ID,
      account: assetAudioVideoProgramAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID,
      account: assetPublicSaleAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_ID,
      account: assetFoundingTeamAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_ID,
      account: assetCrowdFoundingAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_ID,
      account: assetValidatorsRewardsAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_ID,
      account: assetTreasuryAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      roleId: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_ID,
      account: assetTaxTreasuryAddress,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 1,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
  ];
  let txReceipt;
  console.log(`[ Register Asset Roles ]`);
  const tx = await memberManagerDelegateProxy.connect(assetAdmin).memberRegister(EMPTY_MEMBER_SIGNATURE, requests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

async function updateAssetRolesScope(assetAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
    {
      id: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_ID,
      scopeId: assetAudioVideoProgramId,
    },
    {
      id: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID,
      scopeId: assetPublicSaleId,
    },
    {
      id: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_ID,
      scopeId: assetFoundingTeamId,
    },
    {
      id: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_ID,
      scopeId: assetCrowdFoundingId,
    },
    {
      id: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_ID,
      scopeId: assetValidatorsRewardsId,
    },
    {
      id: ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_ID,
      scopeId: assetTreasuryId,
    },
    {
      id: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_ID,
      scopeId: assetTaxTreasuryId,
    },
  ];
  let txReceipt;
  console.log(`[ Update Asset Roles Scope ]`);
  const tx = await roleManagerDelegateProxy.connect(assetAdmin).roleUpdateScope(EMPTY_MEMBER_SIGNATURE, requests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

async function distributeLivelyToken(
  assetAdmin: Signer,
  livelyTokenProxy: LivelyToken,
  assetManagerProxy: AssetManagerERC20,
  hre: HardhatRuntimeEnvironment
) {
  const assets: Address[] = [
    assetAudioVideoProgramAddress,
    assetPublicSaleAddress,
    assetFoundingTeamAddress,
    assetCrowdFoundingAddress,
    assetValidatorsRewardsAddress,
    assetTreasuryAddress,
    assetTaxTreasuryAddress,
  ];

  let txReceipt;
  console.log(`[ Distribute Lively Token ]`);
  const tx = await livelyTokenProxy.connect(assetAdmin).tokensDistribution(assetManagerProxy.address, assets);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();

  const factory = new AssetERC20__factory(assetAdmin);
  let assetContract = await factory.attach(assetAudioVideoProgramAddress);
  console.log(`assetAudioVideoProgram balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetPublicSaleAddress);
  console.log(`assetPublicSale balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetFoundingTeamAddress);
  console.log(`assetFoundingTeam balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetValidatorsRewardsAddress);
  console.log(`assetValidatorsRewards balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetCrowdFoundingAddress);
  console.log(`assetCrowdFounding balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetTreasuryAddress);
  console.log(`assetTreasury balance: ${await assetContract.assetBalance()}`);

  assetContract = await factory.attach(assetTaxTreasuryAddress);
  console.log(`assetTaxTreasury balance: ${await assetContract.assetBalance()}`);
}

func.dependencies = [ACL_MANAGER_CONTRACT_NAME_PROXY, LIVELY_TOKEN_PROXY, ASSET_MANAGER_ERC20_PROXY];
func.runAtTheEnd = true;
export default func;
