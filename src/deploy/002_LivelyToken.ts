import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, Deployment, DeployOptions, DeployResult } from "hardhat-deploy/types";

/* eslint-disable  node/no-unpublished-import */
import { BigNumber } from "ethers";

/* eslint-disable camelcase,node/no-extraneous-import */
import {
  ContextManager,
  ContextManager__factory,
  DomainManager,
  DomainManager__factory,
  FunctionManager,
  FunctionManager__factory,
  IContextManagement,
  IDomainManagement,
  IFunctionManagement,
  IMemberManagement,
  IRealmManagement,
  IRoleManagement,
  ITypeManagement,
  LivelyToken,
  LivelyToken__factory,
  MemberManager,
  MemberManager__factory,
  RealmManager,
  RealmManager__factory,
  RoleManager,
  RoleManager__factory,
  TypeManager,
  TypeManager__factory
} from "../../typechain/types";
import {
  ACL_MANAGER_CONTRACT_NAME_PROXY, EMPTY_MEMBER_SIGNATURE,
  MAINNET_TX_WAIT_BLOCK_COUNT,
  TESTNET_TX_WAIT_BLOCK_COUNT
} from "./001_LivelyGuard";
import { ethers } from "hardhat";
import {
  ActivityStatus,
  AlterabilityStatus,
  LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID, LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID
} from "../utils/Utils";
import { expect } from "chai";
import { IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";

const ACL_DOMAIN_TOKENS_NAME = "DOMAIN.LIVELY_VERSE.TOKENS";
const ACL_REALM_LIVELY_TOKEN_ERC20_NAME = "REALM.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20";
const ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER";
const ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER_ADMIN";
const ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.ASSET_MANAGER";
const ACL_ROLE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.ASSET_MANAGER_ADMIN";
// const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.AUDIO_VIDEO_PROGRAM_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.FOUNDING_TEAM_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TREASURY_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.PUBLIC_SALE_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.VALIDATORS_REWARDS_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.CROWD_FOUNDING_ASSET_ADMIN";
// const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TAX_TREASURY_ASSET_ADMIN";

const aclDomainTokensId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TOKENS_NAME));
const aclRealmLivelyTokenErc20Id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_LIVELY_TOKEN_ERC20_NAME));
const aclTypeLivelyTokenManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME));
const aclRoleLivelyTokenManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME));
const aclTypeLivelyTokenAssetManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME));
const aclRoleLivelyTokenAssetManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_ADMIN_NAME));
// let aclRoleLivelyAudioVideoProgramAssetAdminId: string;
// let aclRoleLivelyFoundingTeamAssetAdminId: string;
// let aclRoleLivelyTreasuryAssetAdminId: string;
// let aclRoleLivelyPublicSaleAssetAdminId: string;
// let aclRoleLivelyValidatorRewardsAssetAdminId: string;
// let aclRoleLivelyCrowdFoundingAssetAdminId: string;
// let aclRoleLivelyTaxTreasuryAssetAdminId: string;


// aclRoleLivelyAudioVideoProgramAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME));
// aclRoleLivelyFoundingTeamAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME));
// aclRoleLivelyTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TREASURY_ASSET_NAME));
// aclRoleLivelyPublicSaleAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME));
// aclRoleLivelyValidatorRewardsAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME));
// aclRoleLivelyCrowdFoundingAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME));
// aclRoleLivelyTaxTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME));


const LIVELY_TOKEN_NAME = "LivelyToken";
const LIVELY_TOKEN_VERSION = "3.0.0";
export const LIVELY_TOKEN_SUBJECT = "LivelyTokenSubject";
export const LIVELY_TOKEN_PROXY = "LivelyTokenProxy";

export let LIVELY_TOKEN_INIT_VERSION: number;
let lTokenERC20: DeployResult;
let livelyTokenSubject: DeployResult;
let livelyTokenProxy: DeployResult;
let livelyToken: LivelyToken;

let functionManagerDelegateProxy: FunctionManager;
let contextManagerDelegateProxy: ContextManager;
let realmManagerDelegateProxy: RealmManager;
let domainManagerDelegateProxy: DomainManager;
let memberManagerDelegateProxy: MemberManager;
let roleManagerDelegateProxy: RoleManager;
let typeManagerDelegateProxy: TypeManager;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;
  const [ systemAdmin, livelyAdmin, assetAdmin ] = await ethers.getSigners();
  const aclManagerProxy = await deployments.get(ACL_MANAGER_CONTRACT_NAME_PROXY);

  functionManagerDelegateProxy = FunctionManager__factory.connect(aclManagerProxy.address, systemAdmin);
  contextManagerDelegateProxy = ContextManager__factory.connect(aclManagerProxy.address, systemAdmin);
  realmManagerDelegateProxy = RealmManager__factory.connect(aclManagerProxy.address, systemAdmin);
  domainManagerDelegateProxy = DomainManager__factory.connect(aclManagerProxy.address, systemAdmin);
  memberManagerDelegateProxy = MemberManager__factory.connect(aclManagerProxy.address, systemAdmin);
  roleManagerDelegateProxy = RoleManager__factory.connect(aclManagerProxy.address, systemAdmin);
  typeManagerDelegateProxy = TypeManager__factory.connect(aclManagerProxy.address, systemAdmin);

  lTokenERC20 = await deploy("LTokenERC20", {
    contract: "LTokenERC20",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // @ts-ignore
  await deployLivelyToken(systemAdmin, aclManagerProxy, hre, deploy);

  // @ts-ignore
  await initializeTokenACL(livelyAdmin, assetAdmin, hre);

  // @ts-ignore
  await registerLivelyTokenContext(systemAdmin, hre);

  // @ts-ignore
  await registerLivelyTokenACLFunctions(systemAdmin, hre);
};

async function deployLivelyToken(systemAdmin: SignerWithAddress, aclManagerProxy: Deployment, hre: HardhatRuntimeEnvironment, deploy: (name: string, options: DeployOptions) => Promise<DeployResult>) {
  const data = new Int8Array(0);
  livelyTokenSubject = await deploy(LIVELY_TOKEN_SUBJECT, {
    contract: LIVELY_TOKEN_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LTokenERC20: lTokenERC20.address,
    },
  });

  livelyTokenProxy = await deploy(LIVELY_TOKEN_PROXY, {
    contract: "Proxy",
    from: systemAdmin.address,
    args: [livelyTokenSubject.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const request: LivelyToken.InitRequestStruct = {
    contractName: LIVELY_TOKEN_NAME,
    contractVersion: LIVELY_TOKEN_VERSION,
    taxRateValue: BigNumber.from(0),
    aclManager: aclManagerProxy.address,
  };

  livelyToken = LivelyToken__factory.connect(livelyTokenProxy.address, systemAdmin);
  LIVELY_TOKEN_INIT_VERSION = await livelyToken.initVersion();
  if (LIVELY_TOKEN_INIT_VERSION === 0) {
    let txReceipt;
    console.log(`[ Initialize LivelyToken ]`);
    const tx = await livelyToken.connect(systemAdmin).initialize(request);
    console.log(`txHash: ${tx.hash} . . .`);
    if (hre.network.name === "polygon" || hre.network.name === "bsc") {
      txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
    } else {
      txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
    }
    console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
    console.log();
  }
}

async function initializeTokenACL(livelyAdmin: SignerWithAddress, assetAdmin: SignerWithAddress, hre: HardhatRuntimeEnvironment) {
  // Register Acl Domain
  const domainRequests: IDomainManagement.DomainRegisterRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      realmLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_DOMAIN_TOKENS_NAME
    }
  ]
  let txReceipt;
  console.log(`[ Register ACL Token Domain ]`);
  let tx = await domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(EMPTY_MEMBER_SIGNATURE, domainRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Register Acl Realm
  const realmRequests: IRealmManagement.RealmRegisterRequestStruct[] = [
    {
      domainId: aclDomainTokensId,
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      contextLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_REALM_LIVELY_TOKEN_ERC20_NAME
    }
  ]
  console.log(`[ Register ACL Token Realm ]`);
  tx = await realmManagerDelegateProxy.connect(livelyAdmin).realmRegister(EMPTY_MEMBER_SIGNATURE, realmRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // register AssetManager and LivelyToken Types
  const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      scopeId: aclRealmLivelyTokenErc20Id,
      roleLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME,
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      scopeId: aclRealmLivelyTokenErc20Id,
      roleLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME,
    },
  ]
  console.log(`[ Register ACL AssetManger & LivelyToken Types ]`);
  tx = await typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(EMPTY_MEMBER_SIGNATURE, typeRegisterRequests)
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Register AssetManagerAdmin and TokenERC20ManagerAdmin Roles
  const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      scopeId: aclRealmLivelyTokenErc20Id,
      typeId: aclTypeLivelyTokenAssetManagerId,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_ADMIN_NAME
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      scopeId: aclRealmLivelyTokenErc20Id,
      typeId: aclTypeLivelyTokenManagerId,
      memberLimit: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
      name: ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME
    },
  ]
  console.log(`[ Register ACL AssetManagerAdmin & TokenAdmin Roles ]`);
  tx = await roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(EMPTY_MEMBER_SIGNATURE, roleRegisterRequests)
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Register ACL AssetAdmin Member
  const assetAdminId = ethers.utils.keccak256(assetAdmin.address);
  const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
    {
      adminId: ethers.constants.HashZero,
      roleId: aclRoleLivelyTokenAssetManagerAdminId,
      account: assetAdmin.address,
      limits: {
        memberLimit: 16777215,
        memberRegisterLimit: 65535,
        contextRegisterLimit: 65535,
        functionRegisterLimit: 65535,
        profileRegisterLimit: 0,
        contextLimit: 65535,
        realmLimit: 65535,
        domainLimit: 65535,
        callLimit: 65535,
        typeRoleLimit: 65535,
        typeLimit: 255,
        roleRegisterLimit: 255,
        typeRegisterLimit: 255,
        realmRegisterLimit: 255,
        domainRegisterLimit: 0,
        policyRegisterLimit: 255,
        policyRoleLimit: 255,
        functionLimit: 255,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    }
  ]
  console.log(`[ Register ACL AssetAdmin Member ]`);
  tx = await memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(EMPTY_MEMBER_SIGNATURE, requests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Grant Roles to AssetAdmin
  const roleGrantRequests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
    {
      roleId: aclRoleLivelyTokenManagerAdminId,
      members: [ assetAdminId ]
    },
    {
      roleId: LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
      members: [ assetAdminId ]
    },
    {
      roleId: LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
      members: [ assetAdminId ]
    },
    {
      roleId: LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
      members: [ assetAdminId ]
    },
    {
      roleId: LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
      members: [ assetAdminId ]
    },
  ]
  console.log(`[ Register ACL AssetAdmin Member ]`);
  tx = await roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(EMPTY_MEMBER_SIGNATURE, roleGrantRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Update LivelyTokenERC20 Realm Admin to AssetManager Type
  const updateRealmAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
    id: aclRealmLivelyTokenErc20Id,
    adminId: aclRoleLivelyTokenAssetManagerAdminId
  }]
  console.log(`[ Update RealmAdmin to AssetManager Type ]`);
  tx = await realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(EMPTY_MEMBER_SIGNATURE, updateRealmAdminRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Update Admin of AssetManager and TokenManager
  const updateTypeAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [
    {
      id: aclTypeLivelyTokenManagerId,
      adminId: aclRoleLivelyTokenManagerAdminId
    },
    {
      id: aclTypeLivelyTokenAssetManagerId,
      adminId: aclRoleLivelyTokenAssetManagerAdminId
    }
  ]
  console.log(`[ Update Admin of AssetManger & TokenManager Type ]`);
  tx = await typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(EMPTY_MEMBER_SIGNATURE, updateTypeAdminRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerLivelyTokenContext(systemAdmin: SignerWithAddress, hre: HardhatRuntimeEnvironment) {
  const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
    {
      realmId: aclRealmLivelyTokenErc20Id,
      adminId: aclTypeLivelyTokenAssetManagerId,
      salt: ethers.constants.HashZero,
      name: LIVELY_TOKEN_NAME,
      version: LIVELY_TOKEN_VERSION,
      contractId: livelyToken.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 128,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
  ];
  let txReceipt;
  console.log(`[ Register LivelyToken ACL Context ]`);
  let tx = await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(EMPTY_MEMBER_SIGNATURE, contextRequests)
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerLivelyTokenACLFunctions(systemAdmin: SignerWithAddress, hre: HardhatRuntimeEnvironment) {
  const livelyTokenIface = new ethers.utils.Interface(LivelyToken__factory.abi);
  const livelyTokenFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("transfer"),
      policyCode: 200,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("transferFrom"),
      policyCode: 210,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("approve"),
      policyCode: 205,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("batchTransfer"),
      policyCode: 215,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("batchTransferFrom"),
      policyCode: 220,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("permit"),
      policyCode: 201,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("increaseAllowance"),
      policyCode: 207,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("decreaseAllowance"),
      policyCode: 210,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
      selector: livelyTokenIface.getSighash("claimToken"),
      policyCode: 225,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("burn"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("mint"),
      policyCode: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("updateTaxRate"),
      policyCode: 72,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("updateTaxWhitelist"),
      policyCode: 89,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("pause"),
      policyCode: 110,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("unpause"),
      policyCode: 115,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("pauseAll"),
      policyCode: 56,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("unpauseAll"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclTypeLivelyTokenManagerId,
      selector: livelyTokenIface.getSighash("unlockToken"),
      policyCode: 10,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: livelyTokenIface.getSighash("lockToken"),
      policyCode: 127,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclRoleLivelyTokenAssetManagerAdminId,
      selector: livelyTokenIface.getSighash("tokensDistribution"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: livelyTokenIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclTypeLivelyTokenManagerId,
      selector: livelyTokenIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclTypeLivelyTokenManagerId,
      selector: livelyTokenIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: livelyTokenIface.getSighash("setLocalAdmin"),
      policyCode: 65,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenManagerAdminId,
      agentId: aclRoleLivelyTokenManagerAdminId,
      selector: livelyTokenIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclTypeLivelyTokenManagerId,
      agentId: aclTypeLivelyTokenManagerId,
      selector: livelyTokenIface.getSighash("withdrawBalance"),
      policyCode: 240,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const livelyTokenFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [{
    signature: new Int8Array(0),
    realmId: ethers.constants.HashZero,
    salt: ethers.constants.HashZero,
    name: "",
    version: "",
    subject: ethers.constants.AddressZero,
    deployer: ethers.constants.AddressZero,
    contractId: livelyToken.address,
    functions: livelyTokenFunctionRequests,
  }]
  let txReceipt;
  console.log(`[ Register LivelyToken ACL Functions ]`);
  let tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, livelyTokenFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

func.tags = [LIVELY_TOKEN_PROXY];
func.dependencies = [ACL_MANAGER_CONTRACT_NAME_PROXY];
export default func;
