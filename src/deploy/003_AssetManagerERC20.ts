import { DeployFunction, Deployment, DeployOptions, DeployResult } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/* eslint-disable camelcase,node/no-unpublished-import */
import {
  AssetManagerERC20,
  AssetManagerERC20__factory,
  ContextManager,
  ContextManager__factory,
  FunctionManager,
  FunctionManager__factory,
  IContextManagement,
  IFunctionManagement,
  IMemberManagement,
  MemberManager,
  MemberManager__factory,
} from "../../typechain/types";
import {
  ACL_MANAGER_CONTRACT_NAME_PROXY,
  EMPTY_MEMBER_SIGNATURE,
  MAINNET_TX_WAIT_BLOCK_COUNT,
  TESTNET_TX_WAIT_BLOCK_COUNT,
} from "./001_LivelyGuard";
import {
  ACL_REALM_LIVELY_TOKEN_ERC20_ID,
  ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
  ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
} from "./002_LivelyToken";
import { ActivityStatus, AlterabilityStatus, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID } from "../utils/Utils";
import { ethers } from "hardhat";
import { Signer } from "ethers";

const ASSET_MANAGER_ERC20_CONTRACT_NAME = "AssetManagerERC20";
const ASSET_MANAGER_ERC20_CONTRACT_VERSION = "3.0.0";
const ASSET_MANAGER_ERC20_SUBJECT = "AssetManagerERC20Subject";
export const ASSET_MANAGER_ERC20_PROXY = "AssetManagerERC20Proxy";
export let ASSET_MANAGER_INIT_VERSION: number;

let assetManagerERC20Subject: DeployResult;
let assetManagerERC20Proxy: DeployResult;

let functionManagerDelegateProxy: FunctionManager;
let contextManagerDelegateProxy: ContextManager;
let memberManagerDelegateProxy: MemberManager;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;
  const {systemAdmin, livelyAdmin} = await ethers.getNamedSigners();
  const aclManagerProxy = await deployments.get(ACL_MANAGER_CONTRACT_NAME_PROXY);

  functionManagerDelegateProxy = FunctionManager__factory.connect(aclManagerProxy.address, systemAdmin);
  contextManagerDelegateProxy = ContextManager__factory.connect(aclManagerProxy.address, systemAdmin);
  memberManagerDelegateProxy = MemberManager__factory.connect(aclManagerProxy.address, systemAdmin);

  await deployAssetManager(systemAdmin, aclManagerProxy, hre, deploy);

  if (ASSET_MANAGER_INIT_VERSION === 0) {
    await registerAssetMangerACLContext(systemAdmin, hre);

    await registerAssetManagerACLFunctions(systemAdmin, hre);

    await registerAssetManagerProxyToAssetManagerRole(livelyAdmin, hre);
  }
};

async function deployAssetManager(
  systemAdmin: Signer,
  aclManagerProxy: Deployment,
  hre: HardhatRuntimeEnvironment,
  deploy: (name: string, options: DeployOptions) => Promise<DeployResult>
) {
  const systemAdminAddress = await systemAdmin.getAddress();
  assetManagerERC20Subject = await deploy(ASSET_MANAGER_ERC20_SUBJECT, {
    contract: ASSET_MANAGER_ERC20_CONTRACT_NAME,
    from: systemAdminAddress,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  assetManagerERC20Proxy = await deploy(ASSET_MANAGER_ERC20_PROXY, {
    contract: "Proxy",
    from: systemAdminAddress,
    args: [assetManagerERC20Subject.address, new Int8Array(0)],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const request: AssetManagerERC20.InitRequestStruct = {
    contractName: ASSET_MANAGER_ERC20_CONTRACT_NAME,
    contractVersion: ASSET_MANAGER_ERC20_CONTRACT_VERSION,
    aclManager: aclManagerProxy.address,
  };

  const assetManagerERC20 = AssetManagerERC20__factory.connect(assetManagerERC20Proxy.address, systemAdmin);
  ASSET_MANAGER_INIT_VERSION = await assetManagerERC20.initVersion();
  if (ASSET_MANAGER_INIT_VERSION === 0) {
    let txReceipt;
    console.log(`[ Initialize AssetManagerERC20 ]`);
    const tx = await assetManagerERC20.connect(systemAdmin).initialize(request);
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
}

async function registerAssetMangerACLContext(systemAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
    {
      realmId: ACL_REALM_LIVELY_TOKEN_ERC20_ID,
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      salt: ethers.constants.HashZero,
      name: ASSET_MANAGER_ERC20_CONTRACT_NAME,
      version: ASSET_MANAGER_ERC20_CONTRACT_VERSION,
      contractId: assetManagerERC20Proxy.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 128,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0),
    },
  ];
  let txReceipt;
  console.log(`[ Register AssetManagerERC20 ACL Context ]`);
  const tx = await contextManagerDelegateProxy
    .connect(systemAdmin)
    .contextRegister(EMPTY_MEMBER_SIGNATURE, contextRequests);
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

async function registerAssetManagerACLFunctions(systemAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const assetManagerIface = new ethers.utils.Interface(AssetManagerERC20__factory.abi);
  const assetManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("createAsset"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("registerAsset"),
      policyCode: 36,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("removeAsset"),
      policyCode: 10,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("registerToken"),
      policyCode: 48,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("updateToken"),
      policyCode: 42,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_TYPE_LIVELY_TOKEN_ASSET_MANAGER_ID,
      selector: assetManagerIface.getSighash("setSafeModeAssets"),
      policyCode: 53,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      selector: assetManagerIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      selector: assetManagerIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
    {
      adminId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      agentId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      selector: assetManagerIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
  ];
  const assetManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: assetManagerERC20Proxy.address,
      functions: assetManagerFunctionRequests,
    },
  ];

  let txReceipt;
  console.log(`[ Register AssetManagerERC20 ACL Functions ]`);
  const tx = await functionManagerDelegateProxy
    .connect(systemAdmin)
    .functionRegister(EMPTY_MEMBER_SIGNATURE, assetManagerFunctionRegisterRequest);
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

async function registerAssetManagerProxyToAssetManagerRole(livelyAdmin: Signer, hre: HardhatRuntimeEnvironment) {
  const assetManagerId = ethers.utils.keccak256(assetManagerERC20Proxy.address);
  const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
    {
      roleId: ACL_ROLE_LIVELY_TOKEN_ASSET_MANAGER_ADMIN_ID,
      account: assetManagerERC20Proxy.address,
      adminId: ethers.constants.HashZero,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 128,
        typeRoleLimit: 0,
        typeLimit: 2,
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
  console.log(`[ Register AssetManagerERC20 Contract To AssetManagerRole ]`);
  const tx = await memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(EMPTY_MEMBER_SIGNATURE, requests);
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

func.tags = [ASSET_MANAGER_ERC20_PROXY];
func.dependencies = [ACL_MANAGER_CONTRACT_NAME_PROXY];
export default func;
