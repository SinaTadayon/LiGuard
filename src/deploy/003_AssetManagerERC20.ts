import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/* eslint-disable camelcase,node/no-unpublished-import */
import {
  AssetERC20__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory, IAssetManagerERC20,
  IContextManagement, IFunctionManagement, IMemberManagement,
  Proxy__factory
} from "../../typechain/types";
import { ACL_MANAGER_CONTRACT_NAME_PROXY } from "./001_LivelyGuard";
import { LIVELY_TOKEN_PROXY } from "./002_LivelyToken";
import {
  ActivityStatus,
  AlterabilityStatus,
  AssetSafeModeStatus,
  generateContextDomainSignatureByHardhatProvider,
  generateDomainSeparator,
  generatePredictContextDomainSignatureManually,
  LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus
} from "../utils/Utils";
import { ethers } from "hardhat";
import { expect } from "chai";

const ASSET_MANAGER_ERC20_CONTRACT_NAME = "AssetManagerERC20";
const ASSET_MANAGER_ERC20_CONTRACT_VERSION = "3.0.0";
const ASSET_MANAGER_ERC20_SUBJECT = "AssetManagerERC20Subject";
export const ASSET_MANAGER_ERC20_PROXY = "AssetManagerERC20Proxy";
// const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";
export let ASSET_MANAGER_INIT_VERSION: number;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdmin] = await ethers.getSigners();
  const systemAdminAddress = systemAdmin.address;
  const accessControlManager = await deployments.get(ACL_MANAGER_CONTRACT_NAME_PROXY);
  const chainId = await getChainId();
  const typedArray1 = new Int8Array(0);


  const assetManagerERC20Subject = await deploy(ASSET_MANAGER_ERC20_SUBJECT, {
    contract: ASSET_MANAGER_ERC20_CONTRACT_NAME,
    from: systemAdminAddress,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LAssetManagerERC20: lAssetManagerERC20.address,
    },
  });

  const assetManagerERC20Proxy = await deploy(ASSET_MANAGER_ERC20_PROXY, {
    contract: "Proxy",
    from: systemAdminAddress,
    args: [assetManagerERC20Subject.address, typedArray1],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const request: AssetManagerERC20.InitRequestStruct = {
    domainName: ASSET_MANAGER_ERC20_CONTRACT_NAME,
    domainVersion: ASSET_MANAGER_ERC20_CONTRACT_VERSION,
    domainRealm: assetManagerERC20DomainRealm,
    accessControlManager: accessControlManager.address,
    assetManagerSignature: signature,
  };

  const assetManagerERC20 = AssetManagerERC20__factory.connect(assetManagerERC20Proxy.address, systemAdmin);
  ASSET_MANAGER_INIT_VERSION = await assetManagerERC20.initVersion();
  if (ASSET_MANAGER_INIT_VERSION === 0) {
    let txReceipt;
    console.log(`[Initialize AssetManagerERC20 ]`);
    const tx = await assetManagerERC20.connect(systemAdmin).initialize(request);
    console.log(`txHash: ${tx.hash} . . .`);
    if (hre.network.name === "polygon" || hre.network.name === "bsc") {
      txReceipt = await tx.wait(7);
    } else {
      txReceipt = await tx.wait(1);
    }
    console.log(`txHash: ${txReceipt.transactionHash}, status: ${txReceipt.status}`);
    // console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`);
    console.log();
  }
};

it("Should deploy and initialize AssetManagerERC20 proxy success", async () => {
  // given
  const proxyFactory = new Proxy__factory(systemAdmin);
  const assetProxy = await proxyFactory.deploy(assetManagerSubject.address, new Int8Array(0));

  const request: AssetManagerERC20.InitRequestStruct = {
    contractName: ASSET_MANAGER_ERC20_NAME,
    contractVersion: ASSET_MANAGER_ERC20_VERSION,
    aclManager: aclManagerProxy.address
  };

  // when
  assetManagerProxy = assetManagerSubject.attach(assetProxy.address);
  assetManagerProxyId = ethers.utils.keccak256(assetManagerProxy.address)
  await expect(assetManagerProxy.connect(systemAdmin).initialize(request))
    .to.emit(assetManagerProxy, "Upgraded")
    .withArgs(systemAdminWallet.address, assetManagerProxy.address, assetManagerSubject.address)
    .to.emit(assetManagerProxy, "LocalAdminChanged")
    .withArgs(systemAdminWallet.address, assetManagerProxy.address, systemAdminWallet.address)
    .to.emit(assetManagerProxy, "Initialized")
    .withArgs(
      systemAdminWallet.address,
      assetManagerProxy.address,
      assetManagerSubject.address,
      ASSET_MANAGER_ERC20_NAME,
      ASSET_MANAGER_ERC20_VERSION,
      1
    );

  // then
  const domainSeparator = generateDomainSeparator(
    ASSET_MANAGER_ERC20_NAME,
    ASSET_MANAGER_ERC20_VERSION,
    assetManagerProxy.address,
    networkChainId
  );

  expect(await assetManagerProxy.contractName()).to.be.equal(ASSET_MANAGER_ERC20_NAME);
  expect(await assetManagerProxy.contractVersion()).to.be.equal(ASSET_MANAGER_ERC20_VERSION);
  expect(await assetManagerProxy.subjectAddress()).to.be.equal(assetManagerSubject.address);
  expect(await assetManagerProxy.accessControlManager()).to.be.equal(aclManagerProxy.address);
  expect(await assetManagerProxy.localAdmin()).to.be.equal(systemAdminWallet.address);
  expect(await assetManagerProxy.domainSeparator()).to.be.equal(domainSeparator);
  expect(await assetManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
  expect(await assetManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
  expect(await assetManagerProxy.initVersion()).to.be.equal(1);
});

it("Should register AssetManger context by systemAdmin success", async() => {
  // given
  const assetMangerContextId = ethers.utils.keccak256(assetManagerProxy.address);
  const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
    {
      realmId: aclRealmLivelyTokenErc20Id,
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      salt: ethers.constants.HashZero,
      name: ASSET_MANAGER_ERC20_NAME,
      version: ASSET_MANAGER_ERC20_VERSION,
      contractId: assetManagerProxy.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 128,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
  ];


  // when
  await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(emptyMemberSignature, contextRequests))
    .to.emit(contextManagerDelegateProxy, "ContextRegistered")
    .withArgs(systemAdminWallet.address, assetMangerContextId, assetManagerProxy.address,
      aclRealmLivelyTokenErc20Id, ethers.constants.AddressZero, ethers.constants.AddressZero,
      aclRoleLivelyTokenAssetManagerAdminId)
})

it("Should register AssetManager functions by systemAdmin success", async() => {
  // given
  const assetManagerIface = new ethers.utils.Interface(AssetManagerERC20__factory.abi);
  const assetContextId = ethers.utils.keccak256(assetManagerProxy.address);
  const createAssetFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("createAsset")]))
  const removeAssetFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("removeAsset")]))
  const registerAssetFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("registerAsset")]))
  const updateTokenFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("updateToken")]))
  const registerTokenFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("registerToken")]))
  const setSafeModeTokenFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("setSafeModeAssets")]))
  const upgradeToFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("upgradeTo")]))
  const setSafeModeStatusFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("setSafeModeStatus")]))
  const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("setUpdatabilityStatus")]))
  const setLocalAdminFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("setLocalAdmin")]))
  const setAccessControlManagerFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("setAccessControlManager")]))
  const withdrawBalanceFunctionId = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "bytes4"],
      [assetManagerProxy.address,  assetManagerIface.getSighash("withdrawBalance")]))

  const assetManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("createAsset"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("registerAsset"),
      policyCode: 36,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("removeAsset"),
      policyCode: 10,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("registerToken"),
      policyCode: 48,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("updateToken"),
      policyCode: 42,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclTypeLivelyTokenAssetManagerId,
      selector: assetManagerIface.getSighash("setSafeModeAssets"),
      policyCode: 53,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclRoleLivelyTokenAssetManagerAdminId,
      selector: assetManagerIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclRoleLivelyTokenAssetManagerAdminId,
      selector: assetManagerIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: assetManagerIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: aclRoleLivelyTokenAssetManagerAdminId,
      agentId: aclRoleLivelyTokenAssetManagerAdminId,
      selector: assetManagerIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]

  const assetManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: assetManagerProxy.address,
      functions: assetManagerFunctionRequests
    }]

  // when
  await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, assetManagerFunctionRegisterRequest))
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, createAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, removeAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, registerAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, updateTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, registerTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, setSafeModeTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, upgradeToFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, setSafeModeStatusFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, setUpdatabilityStatusFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclTypeLivelyTokenAssetManagerId)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, setLocalAdminFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, setAccessControlManagerFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
    .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
    .withArgs(systemAdminWallet.address, assetContextId, withdrawBalanceFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
      aclRoleLivelyTokenAssetManagerAdminId)
})

it("Should deploy assetERC20 by systemAdmin success", async () => {
  // given
  const factory = new AssetERC20__factory(systemAdmin);

  // when
  assetSubjectERC20 = await factory.deploy();

  // then
  expect(assetSubjectERC20).to.be.not.null;

  // and
  expect(assetSubjectERC20.address).to.be.not.null;
  expect(await assetSubjectERC20.assetSafeMode()).to.be.equal(AssetSafeModeStatus.ENABLED)
  expect(await assetSubjectERC20.assetInitVersion()).to.be.equal(0);
});

it("Should register assetManagerProxy to RoleLivelyTokenAssetManager success", async() => {
  // given
  const assetManagerId = ethers.utils.keccak256(assetManagerProxy.address);
  const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
    {
      roleId: aclRoleLivelyTokenAssetManagerAdminId,
      account: assetManagerProxy.address,
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
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]

  // when
  await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(emptyMemberSignature, requests))
    .to.emit(memberManagerDelegateProxy, "MemberRegistered")
    .withArgs(livelyAdminWallet.address, assetManagerId, assetManagerProxy.address,
      aclRoleLivelyTokenAssetManagerAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
      [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
})

it("Should register lively token to assetManager by anyone failed", async () => {
  // given
  const registerTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
    {
      tokenId: livelyToken.address,
      assetSubjectId: assetSubjectERC20.address,
      assetSignature: "0x00"
    }
  ]

  // when and then
  await expect(assetManagerProxy.connect(livelyAdmin).registerToken(registerTokenRequest))
    .to.revertedWith("ACLActionForbidden(6)");

  await expect(assetManagerProxy.connect(systemAdmin).registerToken(registerTokenRequest))
    .to.revertedWith("ACLActionForbidden(6)");

  await expect(assetManagerProxy.connect(user1).registerToken(registerTokenRequest))
    .to.revertedWith("ACLActionForbidden(5)");

  expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.false;
});

it("Should register lively token to assetManager by assetAdmin success", async () => {
  // given
  const tokenName = await livelyToken.name();
  const tokenSymbol = await livelyToken.symbol();
  const signature = await generatePredictContextDomainSignatureManually(
    assetManagerProxy.address,
    ACL_REALM_LIVELY_TOKEN_ERC20_NAME,
    aclManagerProxy.address,
    systemAdminWallet,
    networkChainId,
    assetSubjectERC20.address
  );

  const registerTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
    {
      tokenId: livelyToken.address,
      assetSubjectId: assetSubjectERC20.address,
      assetSignature: signature
    }
  ]

  // when
  await expect(assetManagerProxy.connect(assetAdmin).registerToken(registerTokenRequest))
    .to.emit(assetManagerProxy, "TokenRegistered")
    .withArgs(assetAdminWallet.address, livelyToken.address, assetSubjectERC20.address, tokenName, tokenSymbol);

  // then
  expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;

  // and
  const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyToken.address);
  expect(tokenInfo.assets).to.be.empty;
  expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
  expect(tokenInfo.assetSignature).to.be.equal(signature);
});


func.tags = ["AssetManagerERC20Subject", "AssetManagerERC20Proxy"];
func.dependencies = [ACL_MANAGER_CONTRACT_NAME_PROXY, LIVELY_TOKEN_PROXY];
export default func;
