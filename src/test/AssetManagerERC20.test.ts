import { BigNumber, BytesLike, Signer, Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable camelcase,node/no-unpublished-import */
import {
  AccessControl, AccessControl__factory,
  ACLManager, ACLManager__factory, ACLManagerProxy__factory, ACLProxy__factory,
  AssetERC20,
  AssetERC20__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory,
  ContextManager,
  ContextManager__factory,
  DomainManager, DomainManager__factory,
  FunctionManager,
  FunctionManager__factory,
  GlobalManager, GlobalManager__factory, IACLManager, IAssetEntity,
  IAssetManagerERC20, IContextManagement, IDomainManagement,
  IERC20Extra, IFunctionManagement, IMemberManagement, IProxy, IRealmManagement,
  IRoleManagement, ITypeManagement,
  LACLManager,
  LACLManager__factory,
  LAssetManagerERC20,
  LAssetManagerERC20__factory,
  LivelyToken,
  LivelyToken__factory,
  LTokenERC20__factory,
  MemberManager,
  MemberManager__factory,
  PolicyManager, PolicyManager__factory,
  Proxy__factory,
  RealmManager, RealmManager__factory,
  RoleManager,
  RoleManager__factory,
  TypeManager,
  TypeManager__factory
} from "../../typechain/types";
import { deployments, ethers, waffle } from "hardhat";
import { expect } from "chai";
import {
  ActivityStatus,
  AgentType,
  AlterabilityStatus, AssetSafeModeStatus, AssetType,
  generateContextDomainSignatureManually,
  generateDomainSeparator,
  generatePredictContextDomainSignatureManually,
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_ACL_DOMAIN_ID,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  LIVELY_VERSE_AGENT_MASTER_TYPE_ID, LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LockState,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus,
  ScopeType, TokenSafeModeStatus
} from "./TestUtils";
import { AssetManagerERC20LibraryAddresses } from "../../typechain/types/factories/token/asset/AssetManagerERC20__factory";
import { IERC20Lock } from "../../typechain/types/token/lively/LivelyToken";
/* eslint-disable node/no-extraneous-import */
import { TransactionRequest } from "@ethersproject/abstract-provider";
import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
import { IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import { PromiseOrValue } from "../../typechain/types/common";
const { provider, deployMockContract } = waffle;

describe("Asset Manager ERC20 Token Tests", function () {
  let livelyAdmin: Signer;
  let systemAdmin: Signer;
  let assetAdmin: Signer;
  let crowdFoundingManager: Signer;
  let validatorsRewardsManager: Signer;
  let publicSaleManager: Signer;
  let treasuryManager: Signer;
  let foundingTeamManager: Signer;
  let audioVideoProgramManager: Signer;
  let user1: Signer;
  let user2: Signer;
  let livelyAdminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let user1Wallet: Wallet;
  let user2Wallet: Wallet;
  let assetAdminWallet: Wallet;
  let crowdFoundingManagerWallet: Wallet;
  let validatorsRewardsManagerWallet: Wallet;
  let publicSaleManagerWallet: Wallet;
  let treasuryManagerWallet: Wallet;
  let foundingTeamManagerWallet: Wallet;
  let audioVideoProgramManagerWallet: Wallet;
  let adminAddress: Address;
  let systemAdminAddress: Address;
  let user1Address: Address;
  let user2Address: Address;
  let assetAdminAddress: Address;
  let crowdFoundingManagerAddress: Address;
  let validatorsRewardsManagerAddress: Address;
  let publicSaleManagerAddress: Address;
  let treasuryManagerAddress: Address;
  let foundingTeamManagerAddress: Address;
  let audioVideoProgramManagerAddress: Address;
  let livelyToken: LivelyToken;
  let assetManagerLinkLibraryAddresses: AssetManagerERC20LibraryAddresses;
  let lAssetManagerERC20: LAssetManagerERC20;
  let assetManagerSubject: AssetManagerERC20;
  let assetManagerProxy: AssetManagerERC20;
  let assetSubjectERC20: AssetERC20;
  let assetAudioVideoProgram: AssetERC20;
  let assetFoundingTeam: AssetERC20;
  let assetTreasury: AssetERC20;
  let assetPublicSale: AssetERC20;
  let assetValidatorsRewards: AssetERC20;
  let assetCrowdFounding: AssetERC20;
  let assetTaxTreasury: AssetERC20;
  let networkChainId: BigNumber;

  let assetManagerProxyId: string;
  let assetAudioVideoProgramId: string;
  let assetFoundingTeamId: string;
  let assetTreasuryId: string;
  let assetPublicSaleId: string;
  let assetValidatorsRewardsId: string;
  let assetCrowdFoundingId: string;
  let assetTaxTreasuryId: string;

  // ACL requirements
  let lACLManager: LACLManager;
  let linkLibraryAddresses: ACLManagerLibraryAddresses;
  let memberManagerSubject: MemberManager;
  let memberManagerProxy: MemberManager;
  let memberManagerDelegateProxy: MemberManager;
  let roleManagerSubject: RoleManager;
  let roleManagerProxy: RoleManager;
  let roleManagerDelegateProxy: RoleManager;
  let typeManagerSubject: TypeManager;
  let typeManagerProxy: TypeManager;
  let typeManagerDelegateProxy: TypeManager;
  let functionManagerSubject: FunctionManager;
  let functionManagerProxy: FunctionManager;
  let functionManagerDelegateProxy: FunctionManager;
  let contextManagerSubject: ContextManager;
  let contextManagerProxy: ContextManager;
  let contextManagerDelegateProxy: ContextManager;
  let realmManagerSubject: RealmManager;
  let realmManagerProxy: RealmManager;
  let realmManagerDelegateProxy: RealmManager;
  let domainManagerSubject: DomainManager;
  let domainManagerProxy: DomainManager;
  let domainManagerDelegateProxy: DomainManager;
  let globalManagerSubject: GlobalManager;
  let globalManagerProxy: GlobalManager;
  let globalManagerDelegateProxy: GlobalManager;
  let policyManagerSubject: PolicyManager;
  let policyManagerProxy: PolicyManager;
  let policyManagerDelegateProxy: PolicyManager;
  let accessControlSubject: AccessControl;
  let accessControlProxy: AccessControl;
  let accessControlDelegateProxy: AccessControl;
  let aclManagerSubject: ACLManager;
  let aclManagerProxy: ACLManager;
  const MEMBER_MANAGER_CONTRACT_NAME = "MemberManager";
  const ROLE_MANAGER_CONTRACT_NAME = "RoleManager";
  const TYPE_MANAGER_CONTRACT_NAME = "TypeManager";
  const FUNCTION_MANAGER_CONTRACT_NAME = "FunctionManager";
  const CONTEXT_MANAGER_CONTRACT_NAME = "ContextManager";
  const REALM_MANAGER_CONTRACT_NAME = "RealmManager";
  const DOMAIN_MANAGER_CONTRACT_NAME = "DomainManager";
  const GLOBAL_MANAGER_CONTRACT_NAME = "GlobalManager";
  const POLICY_MANAGER_CONTRACT_NAME = "PolicyManager";
  const ACCESS_CONTROL_CONTRACT_NAME = "AccessControl";
  const ACL_MANAGER_CONTRACT_NAME = "ACLManager";
  const CONTRACTS_VERSION =  "3.0.0";

  const ACL_DOMAIN_VERSE_ASSETS_NAME = "SCOPE.VERSE_ASSETS";
  const ACL_REALM_LIVELY_ERC20_TOKEN_NAME = "SCOPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN";
  const ACL_TYPE_VERSE_ASSETS_NAME = "TYPE.VERSE_ASSETS"
  const ACL_ROLE_VERSE_ASSETS_ADMIN_NAME = "ROLE.VERSE_ASSETS.ASSET_ADMIN";
  const ACL_TYPE_LIVELY_ERC20_TOKEN_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN"
  const ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME = "ROLE.VERSE_ASSETS.ERC20_TOKEN.ADMIN";
  const ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_NAME = "TYPE.VERSE_ASSETS.ERC20_TOKEN.ASSET";
  const ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.ERC20_TOKEN.ASSET_ADMIN";
  const ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME = "TYPE.VERSE_ASSETS.ERC20_TOKEN.ASSET_MANAGER";
  const ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME = "ROLE.VERSE_ASSETS.ERC20_TOKEN.ASSET_MANAGER_ADMIN";
  const ACL_TYPE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.AUDIO_VIDEO_PROGRAM_ASSET";
  const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.AUDIO_VIDEO_PROGRAM_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_FOUNDING_TEAM_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.FOUNDING_TEAM_ASSET";
  const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.FOUNDING_TEAM_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_TREASURY_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TREASURY_ASSET";
  const ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TREASURY_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_PUBLIC_SALE_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.PUBLIC_SALE_ASSET";
  const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.PUBLIC_SALE_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.VALIDATORS_REWARDS_ASSET";
  const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.VALIDATORS_REWARDS_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_CROWD_FOUNDING_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.CROWD_FOUNDING_ASSET";
  const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.CROWD_FOUNDING_ASSET_ADMIN";
  const ACL_TYPE_LIVELY_TAX_TREASURY_ASSET_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TAX_TREASURY_ASSET";
  const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TAX_TREASURY_ASSET_ADMIN";

  let aclDomainVerseAssetsId: string;
  let aclRealmLivelyErc20TokenId: string;
  let aclTypeVerseAssetsId: string;
  let aclRoleVerseAssetsAdminId: string;
  let aclTypeLivelyErc20TokenId: string;
  let aclRoleLivelyErc20TokenAdminId: string;
  let aclTypeLivelyErc20TokenAssetId: string;
  let aclRoleLivelyErc20TokenAssetAdminId: string;
  let aclTypeLivelyErc20TokenAssetManagerId: string;
  let aclRoleLivelyErc20TokenAssetManagerAdminId: string;
  let aclTypeLivelyAudioVideoProgramAssetId: string;
  let aclRoleLivelyAudioVideoProgramAssetAdminId: string;
  let aclTypeLivelyFoundingTeamAssetId: string;
  let aclRoleLivelyFoundingTeamAssetAdminId: string;
  let aclTypeLivelyTreasuryAssetId: string;
  let aclRoleLivelyTreasuryAssetAdminId: string;
  let aclTypeLivelyPublicSaleAssetId: string;
  let aclRoleLivelyPublicSaleAssetAdminId: string;
  let aclTypeLivelyValidatorRewardsAssetId: string;
  let aclRoleLivelyValidatorRewardsAssetAdminId: string;
  let aclTypeLivelyCrowdFoundingAssetId: string;
  let aclRoleLivelyCrowdFoundingAssetAdminId: string;
  let aclTypeLivelyTaxTreasuryAssetId: string;
  let aclRoleLivelyTaxTreasuryAssetAdminId: string;

  const tokenDecimal = BigNumber.from(10).pow(18);
  const livelyTokenTotalSupply = BigNumber.from(5_000_000_000).mul(tokenDecimal);
  const assetAudioVideoProgramBalance = BigNumber.from(500_000_000).mul(tokenDecimal);
  const assetFoundingTeamBalance = BigNumber.from(900_000_000).mul(tokenDecimal);
  const assetTreasuryBalance = BigNumber.from(750_000_000).mul(tokenDecimal);
  const assetPublicSaleBalance = BigNumber.from(2_000_000_000).mul(tokenDecimal);
  const assetValidatorsRewardsBalance = BigNumber.from(300_000_000).mul(tokenDecimal);
  const assetCrowdFoundingBalance = BigNumber.from(550_000_000).mul(tokenDecimal);
  const dummyAmount = BigNumber.from(10000).mul(tokenDecimal);
  const livelyAudioVideoProgramAssetName = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
  const livelyFoundingTeamAssetName = "LIVELY_FOUNDING_TEAM_ASSET";
  const livelyTreasuryAssetName = "LIVELY_TREASURY_ASSET";
  const livelyPublicSaleAssetName = "LIVELY_PUBLIC_SALE_ASSET";
  const livelyValidatorRewardsAssetName = "LIVELY_VALIDATORS_REWARDS_ASSET";
  const livelyCrowdFoundingAssetName = "LIVELY_CROWD_FOUNDING_ASSET";
  const livelyTaxTreasuryAssetName = "LIVELY_TAX_TREASURY_ASSET";
  const assetManagerERC20Name = "AssetManagerERC20";
  const assetManagerERC20Version = "3.0.0";

  const livelyTokenName = "LivelyToken";
  const livelyTokenVersion = "3.0.0";

  this.beforeAll(async () => {
    [
      systemAdmin,
      livelyAdmin,
      assetAdmin,
      crowdFoundingManager,
      validatorsRewardsManager,
      publicSaleManager,
      treasuryManager,
      foundingTeamManager,
      audioVideoProgramManager,
      user1,
      user2,
    ] = await ethers.getSigners();
    [
      systemAdminWallet,
      livelyAdminWallet,
      assetAdminWallet,
      crowdFoundingManagerWallet,
      validatorsRewardsManagerWallet,
      publicSaleManagerWallet,
      treasuryManagerWallet,
      foundingTeamManagerWallet,
      audioVideoProgramManagerWallet,
      user1Wallet,
      user2Wallet,
    ] = waffle.provider.getWallets();
    adminAddress = await livelyAdmin.getAddress();
    systemAdminAddress = await systemAdmin.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    assetAdminAddress = await assetAdmin.getAddress();
    crowdFoundingManagerAddress = await crowdFoundingManager.getAddress();
    validatorsRewardsManagerAddress = await validatorsRewardsManager.getAddress();
    publicSaleManagerAddress = await publicSaleManager.getAddress();
    treasuryManagerAddress = await treasuryManager.getAddress();
    foundingTeamManagerAddress = await foundingTeamManager.getAddress();
    audioVideoProgramManagerAddress = await audioVideoProgramManager.getAddress();
    networkChainId = await provider.send("eth_chainId", []);
    // console.log(`system livelyAdmin address: ${systemAdminAddress}`);

    aclDomainVerseAssetsId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_VERSE_ASSETS_NAME));
    aclRealmLivelyErc20TokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_LIVELY_ERC20_TOKEN_NAME));
    aclTypeVerseAssetsId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_VERSE_ASSETS_NAME));
    aclRoleVerseAssetsAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_VERSE_ASSETS_ADMIN_NAME));
    aclTypeLivelyErc20TokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_ERC20_TOKEN_NAME));
    aclRoleLivelyErc20TokenAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME));
    aclTypeLivelyErc20TokenAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_NAME));
    aclRoleLivelyErc20TokenAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_ADMIN_NAME));
    aclTypeLivelyErc20TokenAssetManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME));
    aclRoleLivelyErc20TokenAssetManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME));
    aclTypeLivelyAudioVideoProgramAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME));
    aclRoleLivelyAudioVideoProgramAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_NAME));
    aclTypeLivelyFoundingTeamAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_FOUNDING_TEAM_ASSET_NAME));
    aclRoleLivelyFoundingTeamAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_NAME));
    aclTypeLivelyTreasuryAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TREASURY_ASSET_NAME));
    aclRoleLivelyTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_NAME));
    aclTypeLivelyPublicSaleAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_PUBLIC_SALE_ASSET_NAME));
    aclRoleLivelyPublicSaleAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_NAME));
    aclTypeLivelyValidatorRewardsAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME));
    aclRoleLivelyValidatorRewardsAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_NAME));
    aclTypeLivelyCrowdFoundingAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_CROWD_FOUNDING_ASSET_NAME));
    aclRoleLivelyCrowdFoundingAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_NAME));
    aclTypeLivelyTaxTreasuryAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TAX_TREASURY_ASSET_NAME));
    aclRoleLivelyTaxTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_NAME));
  });
  
  describe("ACL Manager Deployments Success", function() {
    it("Should library and subjects Deployments success", async() => {
      const aclFactory = new LACLManager__factory(systemAdmin);
      lACLManager = await aclFactory.deploy();
      linkLibraryAddresses = {
        "src/contracts/lib/acl/LACLManager.sol:LACLManager": lACLManager.address
      };
      const aclManagerFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
      const memberManagerFactory = new MemberManager__factory(systemAdmin);
      const roleManagerFactory = new RoleManager__factory(systemAdmin);
      const typeManagerFactory = new TypeManager__factory(systemAdmin);
      const functionManagerFactory = new FunctionManager__factory(systemAdmin);
      const contextManagerFactory = new ContextManager__factory(systemAdmin);
      const realmManagerFactory = new RealmManager__factory(systemAdmin);
      const domainManagerFactory = new DomainManager__factory(systemAdmin);
      const globalManagerFactory = new GlobalManager__factory(systemAdmin);
      const policyManagerFactory = new PolicyManager__factory(systemAdmin);
      const accessControlFactory = new AccessControl__factory(systemAdmin);

      // when
      aclManagerSubject = await aclManagerFactory.deploy();
      memberManagerSubject = await memberManagerFactory.deploy();
      roleManagerSubject = await roleManagerFactory.deploy();
      typeManagerSubject = await typeManagerFactory.deploy();
      functionManagerSubject = await functionManagerFactory.deploy();
      contextManagerSubject = await contextManagerFactory.deploy();
      realmManagerSubject = await realmManagerFactory.deploy();
      domainManagerSubject = await domainManagerFactory.deploy();
      globalManagerSubject = await globalManagerFactory.deploy();
      policyManagerSubject = await policyManagerFactory.deploy();
      accessControlSubject = await accessControlFactory.deploy();
    })

    it("Should Proxies Deployments success", async() => {
      // acl manager
      const aclProxyFactory = new ACLManagerProxy__factory(systemAdmin);
      const aclIface = new ethers.utils.Interface(ACLManager__factory.abi);
      const aclData = aclIface.encodeFunctionData("initialize", [
        ACL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
      ]);
      const aclProxy = await aclProxyFactory.deploy(aclManagerSubject.address, aclData);
      await aclProxy.deployTransaction.wait();
      aclManagerProxy = aclManagerSubject.attach(aclProxy.address);

      // member manager
      let proxyFactory = new ACLProxy__factory(systemAdmin);
      let iface = new ethers.utils.Interface(MemberManager__factory.abi);
      let data = iface.encodeFunctionData("initialize", [
        MEMBER_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      let proxy = await proxyFactory.deploy(memberManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      memberManagerProxy = memberManagerSubject.attach(proxy.address);

      // role manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(RoleManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ROLE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(roleManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      roleManagerProxy = roleManagerSubject.attach(proxy.address);

      // type manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(TypeManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        TYPE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(typeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      typeManagerProxy = typeManagerSubject.attach(proxy.address);

      // function manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(FunctionManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        FUNCTION_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(functionManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      functionManagerProxy = functionManagerSubject.attach(proxy.address);

      // context manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(ContextManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        CONTEXT_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(contextManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      contextManagerProxy = contextManagerSubject.attach(proxy.address);

      // realm manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(RealmManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        REALM_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(realmManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      realmManagerProxy = realmManagerSubject.attach(proxy.address);


      // domain manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(DomainManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        DOMAIN_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(domainManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      domainManagerProxy = domainManagerSubject.attach(proxy.address);

      // global manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(GlobalManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        GLOBAL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(globalManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      globalManagerProxy = globalManagerSubject.attach(proxy.address);

      // policy manager
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(PolicyManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        POLICY_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(policyManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      policyManagerProxy = policyManagerSubject.attach(proxy.address);

      // access control
      proxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(AccessControl__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ACCESS_CONTROL_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(accessControlSubject.address, data);
      await proxy.deployTransaction.wait();
      accessControlProxy = accessControlSubject.attach(proxy.address);

      // Init ACL
      await aclManagerProxy.connect(systemAdmin).initACL(
        contextManagerProxy.address,
        functionManagerProxy.address,
        livelyAdminWallet.address,
        systemAdminWallet.address
      );
    })

    it("Should facets register to ACLManager by systemAdmin success", async() => {

      // given
      const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
      const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
      const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
      const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
      const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
      const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
      const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
      const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
      const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
      const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
      const facetRequests: IACLManager.FacetRegisterRequestStruct[] = [
        {
          facetId: memberManagerProxy.address,
          interfaceId: "0xf357de59",
          subjectId: memberManagerSubject.address,
          selectors: [
            memberIface.getSighash("memberRegister"),
            memberIface.getSighash("memberUpdateActivityStatus"),
            memberIface.getSighash("memberUpdateAlterabilityStatus"),
            memberIface.getSighash("memberUpdateAdmin"),
            memberIface.getSighash("memberUpdateTypeLimit"),
            memberIface.getSighash("memberUpdateFactoryLimit"),
            memberIface.getSighash("memberCheckId"),
            memberIface.getSighash("memberCheckAccount"),
            memberIface.getSighash("memberCheckAdmin"),
            memberIface.getSighash("memberHasType"),
            memberIface.getSighash("memberGetTypes"),
            memberIface.getSighash("memberGetInfo"),
          ]
        },
        {
          facetId: roleManagerProxy.address,
          interfaceId: "0x0a0c4696",
          subjectId: roleManagerSubject.address,
          selectors: [
            roleIface.getSighash("roleRegister"),
            roleIface.getSighash("roleGrantMembers"),
            roleIface.getSighash("roleRevokeMembers"),
            roleIface.getSighash("roleUpdateAdmin"),
            roleIface.getSighash("roleUpdateActivityStatus"),
            roleIface.getSighash("roleUpdateAlterabilityStatus"),
            roleIface.getSighash("roleUpdateMemberLimit"),
            roleIface.getSighash("roleCheckId"),
            roleIface.getSighash("roleCheckName"),
            roleIface.getSighash("roleCheckAdmin"),
            roleIface.getSighash("roleHasAccount"),
            roleIface.getSighash("roleGetInfo"),
          ]
        },
        {
          facetId: typeManagerProxy.address,
          interfaceId: "0x716ce960",
          subjectId: typeManagerSubject.address,
          selectors: [
            typeIface.getSighash("typeRegister"),
            typeIface.getSighash("typeUpdateAdmin"),
            typeIface.getSighash("typeUpdateActivityStatus"),
            typeIface.getSighash("typeUpdateAlterabilityStatus"),
            typeIface.getSighash("typeUpdateRoleLimit"),
            typeIface.getSighash("typeCheckId"),
            typeIface.getSighash("typeCheckName"),
            typeIface.getSighash("typeCheckAdmin"),
            typeIface.getSighash("typeHasAccount"),
            typeIface.getSighash("typeHasRole"),
            typeIface.getSighash("typeGetRoles"),
            typeIface.getSighash("typeGetInfo"),
          ]
        },
        {
          facetId: policyManagerProxy.address,
          interfaceId: "0x8e0fb371",
          subjectId: policyManagerSubject.address,
          selectors: [
            policyIface.getSighash("policyRegister"),
            policyIface.getSighash("policyAddRoles"),
            policyIface.getSighash("policyRemoveRoles"),
            policyIface.getSighash("policyUpdateCodes"),
            policyIface.getSighash("policyUpdateAdmin"),
            policyIface.getSighash("policyUpdateActivityStatus"),
            policyIface.getSighash("policyUpdateAlterabilityStatus"),
            policyIface.getSighash("policyUpdateRoleLimit"),
            policyIface.getSighash("policyCheckId"),
            policyIface.getSighash("policyCheckName"),
            policyIface.getSighash("policyCheckAdmin"),
            policyIface.getSighash("policyCheckRole"),
            policyIface.getSighash("policyCheckAccess"),
            policyIface.getSighash("policyCheckRoleAccess"),
            policyIface.getSighash("policyHasRole"),
            policyIface.getSighash("policyGetInfoByRole"),
            policyIface.getSighash("policyGetInfo"),
            policyIface.getSighash("policyGetRoles"),
          ]
        },
        {
          facetId: functionManagerProxy.address,
          interfaceId: "0x4c213822",
          subjectId: functionManagerSubject.address,
          selectors: [
            functionIface.getSighash("functionRegister"),
            functionIface.getSighash("functionUpdateAdmin"),
            functionIface.getSighash("functionUpdateAgent"),
            functionIface.getSighash("functionUpdateActivityStatus"),
            functionIface.getSighash("functionUpdateAlterabilityStatus"),
            functionIface.getSighash("functionUpdatePolicyCode"),
            functionIface.getSighash("functionUpdateAgentLimit"),
            functionIface.getSighash("functionCheckId"),
            functionIface.getSighash("functionCheckSelector"),
            functionIface.getSighash("functionCheckAdmin"),
            functionIface.getSighash("functionCheckAgent"),
            functionIface.getSighash("functionGetInfo"),
          ]
        },
        {
          facetId: contextManagerProxy.address,
          interfaceId: "0xfcd89410",
          subjectId: contextManagerSubject.address,
          selectors: [
            contextIface.getSighash("contextRegister"),
            contextIface.getSighash("contextUpdateActivityStatus"),
            contextIface.getSighash("contextUpdateAlterabilityStatus"),
            contextIface.getSighash("contextUpdateAdmin"),
            contextIface.getSighash("contextUpdateFunctionLimit"),
            contextIface.getSighash("contextUpdateAgentLimit"),
            contextIface.getSighash("contextCheckId"),
            contextIface.getSighash("contextCheckAccount"),
            contextIface.getSighash("contextCheckAdmin"),
            contextIface.getSighash("contextHasFunction"),
            contextIface.getSighash("contextHasSelector"),
            contextIface.getSighash("contextGetFunctions"),
            contextIface.getSighash("contextGetInfo"),
          ]
        },
        {
          facetId: realmManagerProxy.address,
          interfaceId: "0x015c60c8",
          subjectId: realmManagerSubject.address,
          selectors: [
            realmIface.getSighash("realmRegister"),
            realmIface.getSighash("realmUpdateAdmin"),
            realmIface.getSighash("realmUpdateActivityStatus"),
            realmIface.getSighash("realmUpdateAlterabilityStatus"),
            realmIface.getSighash("realmUpdateContextLimit"),
            realmIface.getSighash("realmUpdateAgentLimit"),
            realmIface.getSighash("realmCheckId"),
            realmIface.getSighash("realmCheckName"),
            realmIface.getSighash("realmCheckAdmin"),
            realmIface.getSighash("realmHasFunction"),
            realmIface.getSighash("realmHasContext"),
            realmIface.getSighash("realmGetContexts"),
            realmIface.getSighash("realmGetInfo"),
          ]
        },
        {
          facetId: domainManagerProxy.address,
          interfaceId: "0x4227a2ac",
          subjectId: domainManagerSubject.address,
          selectors: [
            domainIface.getSighash("domainRegister"),
            domainIface.getSighash("domainUpdateActivityStatus"),
            domainIface.getSighash("domainUpdateAlterabilityStatus"),
            domainIface.getSighash("domainUpdateAdmin"),
            domainIface.getSighash("domainUpdateRealmLimit"),
            domainIface.getSighash("domainUpdateAgentLimit"),
            domainIface.getSighash("domainCheckId"),
            domainIface.getSighash("domainCheckName"),
            domainIface.getSighash("domainCheckAdmin"),
            domainIface.getSighash("domainHasFunction"),
            domainIface.getSighash("domainHasContext"),
            domainIface.getSighash("domainHasRealm"),
            domainIface.getSighash("domainGetRealms"),
            domainIface.getSighash("domainGetInfo"),
          ]
        },
        {
          facetId: globalManagerProxy.address,
          interfaceId: "0xa301c1f2",
          subjectId: globalManagerSubject.address,
          selectors: [
            // globalIface.getSighash("globalUpdateActivityStatus"),
            globalIface.getSighash("globalUpdateAlterabilityStatus"),
            globalIface.getSighash("globalUpdateAdmin"),
            globalIface.getSighash("globalUpdateDomainLimit"),
            globalIface.getSighash("globalUpdateAgentLimit"),
            globalIface.getSighash("globalCheckAdmin"),
            globalIface.getSighash("globalGetDomains"),
            globalIface.getSighash("globalGetInfo"),
          ]
        },
        {
          facetId: accessControlProxy.address,
          interfaceId: "0x7a327937",
          subjectId: accessControlSubject.address,
          selectors: [
            accessControlIface.getSighash("hasAccess"),
            accessControlIface.getSighash("hasMemberAccess"),
            accessControlIface.getSighash("hasCSAccess"),
            accessControlIface.getSighash("hasCSMAccess"),
            accessControlIface.getSighash("hasAccessToAgent"),
            accessControlIface.getSighash("hasMemberAccessToAgent"),
            accessControlIface.getSighash("hasCSAccessToAgent"),
            accessControlIface.getSighash("hasCSMAccessToAgent"),
            accessControlIface.getSighash("getAnonymousType"),
            accessControlIface.getSighash("getAnyType"),
            accessControlIface.getSighash("getScopeMasterType"),
            accessControlIface.getSighash("getAgentMasterType"),
            accessControlIface.getSighash("getSystemMasterType"),
            accessControlIface.getSighash("getLivelyMasterType"),
            accessControlIface.getSighash("getPolicyMasterType"),
            accessControlIface.getSighash("getGlobalScope"),
            accessControlIface.getSighash("getLivelyMasterAdminRole"),
            accessControlIface.getSighash("getScopeMasterAdminRole"),
            accessControlIface.getSighash("getAgentMasterAdminRole"),
            accessControlIface.getSighash("getSystemMasterAdminRole"),
            accessControlIface.getSighash("getPolicyMasterAdminRole"),
            accessControlIface.getSighash("isAgentExist"),
            accessControlIface.getSighash("isScopeExist"),
            accessControlIface.getSighash("getScopeBaseInfo"),
            accessControlIface.getSighash("getAgentBaseInfo"),
            accessControlIface.getSighash("isScopesCompatible"),
          ]
        }
      ]

      await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests));
    })

    it("Should register ACL contexts by systemAdmin success", async() => {
      // given
      const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
      const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
      const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
      const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
      const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
      const globalContextId = ethers.utils.keccak256(globalManagerProxy.address);
      const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
      const aclManagerContextId = ethers.utils.keccak256(aclManagerProxy.address);
      const accessControlContextId = ethers.utils.keccak256(accessControlProxy.address);
      const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: MEMBER_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: memberManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: ROLE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: roleManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: TYPE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: typeManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: REALM_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: realmManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: DOMAIN_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: domainManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: GLOBAL_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: globalManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: POLICY_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: policyManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: ACCESS_CONTROL_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: accessControlProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: ACL_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: aclManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 4294967295,
          functionLimit: 65535,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
      ];

      // attach proxies to aclManager
      functionManagerDelegateProxy = functionManagerProxy.attach(aclManagerProxy.address);
      contextManagerDelegateProxy = contextManagerProxy.attach(aclManagerProxy.address);
      realmManagerDelegateProxy = realmManagerProxy.attach(aclManagerProxy.address);
      domainManagerDelegateProxy = domainManagerProxy.attach(aclManagerProxy.address);
      globalManagerDelegateProxy = globalManagerProxy.attach(aclManagerProxy.address);
      policyManagerDelegateProxy = policyManagerProxy.attach(aclManagerProxy.address);
      accessControlDelegateProxy = accessControlProxy.attach(aclManagerProxy.address);
      memberManagerDelegateProxy = memberManagerProxy.attach(aclManagerProxy.address);
      roleManagerDelegateProxy = roleManagerProxy.attach(aclManagerProxy.address);
      typeManagerDelegateProxy = typeManagerProxy.attach(aclManagerProxy.address);

      // when
      await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
    })

    it("Should register MemberManger functions by systemAdmin success", async() => {
      // given
      const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
      const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
      const memberRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
      const memberUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberUpdateActivityStatus")]));
      const memberUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberUpdateAlterabilityStatus")]))
      const memberUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberUpdateAdmin")]))
      const memberUpdateTypeLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberUpdateTypeLimit")]))
      const memberUpdateFactoryLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("memberUpdateFactoryLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [memberManagerProxy.address,  memberIface.getSighash("withdrawBalance")]))

      const memberFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: memberManagerProxy.address,
      }
      const memberFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: memberIface.getSighash("memberRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateTypeLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateFactoryLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberFunctionSignatureRequest, memberFunctionRequests))
    })

    it("Should register RoleManager functions by systemAdmin success", async() => {
      const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
      const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
      const roleRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleRegister")]));
      const roleGrantMembersFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleGrantMembers")]));
      const roleRevokeMembersFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleRevokeMembers")]))
      const roleUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleUpdateAdmin")]))
      const roleUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleUpdateActivityStatus")]))
      const roleUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleUpdateAlterabilityStatus")]))
      const roleUpdateMemberLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("roleUpdateMemberLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [roleManagerProxy.address,  roleIface.getSighash("withdrawBalance")]))

      const roleFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: roleManagerProxy.address,
      }

      const roleFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleGrantMembers"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleRevokeMembers"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateMemberLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionSignatureRequest, roleFunctionRequests))
    })

    it("Should register TypeManager functions by systemAdmin success", async() => {
      const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
      const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
      const typeRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("typeRegister")]));
      const typeUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("typeUpdateAdmin")]));
      const typeUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("typeUpdateActivityStatus")]))
      const typeUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("typeUpdateAlterabilityStatus")]))
      const typeUpdateRoleLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("typeUpdateRoleLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [typeManagerProxy.address,  typeIface.getSighash("withdrawBalance")]))

      const typeFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: typeManagerProxy.address,
      }
      const typeFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_AGENT_MASTER_TYPE_ID,
          selector: typeIface.getSighash("typeRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateRoleLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(typeFunctionSignatureRequest, typeFunctionRequests))
    })

    it("Should register FunctionManager functions by systemAdmin success", async() => {
      const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
      const functionContextId = ethers.utils.keccak256(functionManagerProxy.address);
      const functionUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAdmin")]));
      const functionUpdateAgentFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAgent")]));
      const functionUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdateActivityStatus")]))
      const functionUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAlterabilityStatus")]))
      const functionUpdatePolicyFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdatePolicyCode")]))
      const functionUpdateAgentLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAgentLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [functionManagerProxy.address,  functionIface.getSighash("withdrawBalance")]))

      const functionFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: functionManagerProxy.address,
      }
      const functionFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAgent"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdatePolicyCode"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAgentLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(functionFunctionSignatureRequest, functionFunctionRequests))
    })

    it("Should register ContextManager functions by systemAdmin success", async() => {
      const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
      const contextContextId = ethers.utils.keccak256(contextManagerProxy.address);
      const contextUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("contextUpdateActivityStatus")]));
      const contextUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAlterabilityStatus")]));
      const contextUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAdmin")]))
      const contextUpdateFunctionLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("contextUpdateFunctionLimit")]))
      const contextUpdateAgentLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAgentLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [contextManagerProxy.address,  contextIface.getSighash("withdrawBalance")]))

      const contextFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: contextManagerProxy.address,
      }
      const contextFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateFunctionLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateAgentLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(contextFunctionSignatureRequest, contextFunctionRequests))
    })

    it("Should register RealmManager functions by systemAdmin success", async() => {
      const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
      const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
      const realmRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmRegister")]));
      const realmUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAdmin")]));
      const realmUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmUpdateActivityStatus")]))
      const realmUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAlterabilityStatus")]))
      const realmUpdateContextLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmUpdateContextLimit")]))
      const realmUpdateAgentLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAgentLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [realmManagerProxy.address,  realmIface.getSighash("withdrawBalance")]))

      const realmFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: realmManagerProxy.address,
      }
      const realmFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
          selector: realmIface.getSighash("realmRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateContextLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateAgentLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(realmFunctionSignatureRequest, realmFunctionRequests))

    })

    it("Should register DomainManager functions by systemAdmin success", async() => {
      const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
      const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
      const domainRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainRegister")]));
      const domainUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainUpdateActivityStatus")]));
      const domainUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAlterabilityStatus")]))
      const domainUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAdmin")]))
      const domainUpdateRealmLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainUpdateRealmLimit")]))
      const domainUpdateAgentLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAgentLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [domainManagerProxy.address,  domainIface.getSighash("withdrawBalance")]))

      const domainFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: domainManagerProxy.address,
      }
      const domainFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
          selector: domainIface.getSighash("domainRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateRealmLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateAgentLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(domainFunctionSignatureRequest, domainFunctionRequests))
    })

    it("Should register GlobalManager functions by systemAdmin success", async() => {
      const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
      const globalContextId = ethers.utils.keccak256(globalManagerProxy.address);
      const globalUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("globalUpdateActivityStatus")]));
      const globalUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAlterabilityStatus")]));
      const globalUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAdmin")]))
      const globalUpdateDomainLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("globalUpdateDomainLimit")]))
      const globalUpdateAgentLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAgentLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [globalManagerProxy.address,  globalIface.getSighash("withdrawBalance")]))

      const globalFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: globalManagerProxy.address,
      }

      const globalFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateDomainLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateAgentLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(globalFunctionSignatureRequest, globalFunctionRequests))
    })

    it("Should register ACLManager functions by systemAdmin success", async() => {
      const aclManagerIface = new ethers.utils.Interface(ACLManager__factory.abi);
      const aclContextId = ethers.utils.keccak256(aclManagerProxy.address);
      const aclRegisterFacetFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("aclRegisterFacet")]));
      const aclUpgradeFacetFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("aclUpgradeFacet")]));
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [aclManagerProxy.address,  aclManagerIface.getSighash("withdrawBalance")]))
      const aclFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: aclManagerProxy.address,
      }
      const aclManagerFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("aclRegisterFacet"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("aclUpgradeFacet"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: aclManagerIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(aclFunctionSignatureRequest, aclManagerFunctionRequests))
    })

    it("Should register AccessControl functions by systemAdmin success", async() => {
      const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
      const accessControlContextId = ethers.utils.keccak256(accessControlProxy.address);
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [accessControlProxy.address,  accessControlIface.getSighash("withdrawBalance")]))

      const accessControlFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: accessControlProxy.address,
      }
      const accessControlFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(accessControlFunctionSignatureRequest, accessControlFunctionRequests))
    })

    it("Should register PolicyManager functions by systemAdmin success", async() => {
      const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
      const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
      const policyRegisterFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyRegister")]));
      const policyAddRolesFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyAddRoles")]));
      const policyRemoveRolesFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyRemoveRoles")]))
      const policyUpdateCodesFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyUpdateCodes")]))
      const policyUpdateAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyUpdateAdmin")]))
      const policyUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyUpdateActivityStatus")]))
      const policyUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyUpdateAlterabilityStatus")]))
      const policyUpdatesRoleLimitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("policyUpdateRoleLimit")]))
      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [policyManagerProxy.address,  policyIface.getSighash("withdrawBalance")]))

      const policyFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: policyManagerProxy.address,
      }
      const policyFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
          selector: policyIface.getSighash("policyRegister"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyAddRoles"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyRemoveRoles"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateCodes"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateActivityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateAlterabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateRoleLimit"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("upgradeTo"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("setSafeModeStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("setLocalAdmin"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("setAccessControlManager"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("withdrawBalance"),
          agentLimit: 4294967295,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(policyFunctionSignatureRequest, policyFunctionRequests))
    })
  })

  describe("Setup ACL Manager for Lively Token and Asset Manager ", function() {
    it("Should register ACL_DOMAIN_VERSE_ASSETS_NAME domain success", async() => {
      // given
      const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          realmLimit: 16,
          agentLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_DOMAIN_VERSE_ASSETS_NAME
        }
      ]

      // when
      await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(requests)).
      to.emit(domainManagerDelegateProxy, "DomainRegistered")
        .withArgs(livelyAdminWallet.address, aclDomainVerseAssetsId ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register ACL_REALM_LIVELY_ERC20_TOKEN_NAME Realm in ACL_DOMAIN_VERSE_ASSETS_NAME Domain success", async() => {
      // given
      const requests: IRealmManagement.RealmRegisterRequestStruct[] = [
        {
          domainId: aclDomainVerseAssetsId,
          adminId: aclTypeVerseAssetsId,
          contextLimit: 16,
          agentLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_DOMAIN_VERSE_ASSETS_NAME
        }
      ]

      // when
      await expect(realmManagerDelegateProxy.connect(systemAdmin).realmRegister(requests)).
      to.emit(realmManagerDelegateProxy, "RealmRegistered")
        .withArgs(systemAdminWallet.address, aclRealmLivelyErc20TokenId , aclDomainVerseAssetsId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register ACL types success", async() => {
      // given
      const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          scopeId: aclDomainVerseAssetsId,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_VERSE_ASSETS_NAME,
        },
        {
          adminId: aclTypeVerseAssetsId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_ERC20_TOKEN_NAME,
        },
        {
          adminId: aclTypeVerseAssetsId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_FOUNDING_TEAM_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_PUBLIC_SALE_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_CROWD_FOUNDING_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_TREASURY_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME,
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          roleLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_TAX_TREASURY_ASSET_NAME,
        },
      ]

      // when
      await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(typeRegisterRequests))
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeVerseAssetsId, aclDomainVerseAssetsId,
          LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyErc20TokenId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyErc20TokenAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyErc20TokenAssetManagerId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyAudioVideoProgramAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyFoundingTeamAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyPublicSaleAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyCrowdFoundingAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTreasuryAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyValidatorRewardsAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTaxTreasuryAssetId, aclRealmLivelyErc20TokenId,
          aclTypeVerseAssetsId)
    })

    it("Should register ACL Roles success", async() => {
      // given
      const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          scopeId: aclDomainVerseAssetsId,
          typeId: aclTypeVerseAssetsId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_VERSE_ASSETS_ADMIN_NAME
        },
        {
          adminId: aclTypeVerseAssetsId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyErc20TokenId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME
        },
        {
          adminId: aclTypeVerseAssetsId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyErc20TokenAssetId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyErc20TokenAssetManagerId,
          memberLimit: 1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyAudioVideoProgramAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyPublicSaleAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyFoundingTeamAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyCrowdFoundingAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyValidatorRewardsAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyTaxTreasuryAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_ADMIN_NAME
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          scopeId: aclRealmLivelyErc20TokenId,
          typeId: aclTypeLivelyTreasuryAssetId,
          memberLimit: 2,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_TREASURY_ASSET_ADMIN_NAME
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(roleRegisterRequests)).
        to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleVerseAssetsAdminId, aclTypeVerseAssetsId,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, aclDomainVerseAssetsId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAdminId, aclTypeLivelyErc20TokenId,
            aclTypeVerseAssetsId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetAdminId, aclTypeLivelyErc20TokenAssetId,
            aclTypeVerseAssetsId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetManagerAdminId, aclTypeLivelyErc20TokenAssetManagerId,
            aclTypeVerseAssetsId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, aclTypeLivelyAudioVideoProgramAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, aclTypeLivelyPublicSaleAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, aclTypeLivelyFoundingTeamAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, aclTypeLivelyCrowdFoundingAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, aclTypeLivelyValidatorRewardsAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, aclTypeLivelyTaxTreasuryAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, aclTypeLivelyTreasuryAssetId,
          aclRoleLivelyErc20TokenAssetAdminId, aclRealmLivelyErc20TokenId)
    })

    it("Should register AssetAdmin member to ACL_ROLE_VERSE_ASSETS_ADMIN_NAME success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const requests: IMemberManagement.MemberRegisterStruct[] = [
        {
          roleId: aclRoleVerseAssetsAdminId,
          account: assetAdminWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        }
      ]

      // when
      await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(livelyAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleVerseAssetsAdminId)
    })

    it("Should updateAdmin ACL_DOMAIN_VERSE_ASSETS to ACL_TYPE_VERSE_ASSETS success", async() => {
      // given
      const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
        id: aclDomainVerseAssetsId,
        adminId: aclTypeVerseAssetsId
      }]

      // when
      await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(updateAdminRequests))
        .to.emit(domainManagerDelegateProxy, "DomainAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclDomainVerseAssetsId, aclTypeVerseAssetsId);
    })

    it("Should updateAdmin ACL_REALM_LIVELY_ERC20_TOKEN to ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN success", async() => {
      // given
      const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
        id: aclRealmLivelyErc20TokenId,
        adminId: aclRoleLivelyErc20TokenAdminId
      }]

      // when
      await expect(realmManagerDelegateProxy.connect(assetAdmin).realmUpdateAdmin(updateAdminRequests))
        .to.emit(realmManagerDelegateProxy, "RealmAdminUpdated")
        .withArgs(assetAdminWallet.address, aclTypeLivelyErc20TokenId, aclRoleLivelyErc20TokenAdminId);
    })

    it("Should registers members to related roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const requests: IMemberManagement.MemberRegisterStruct[] = [
        {
          roleId: aclRoleLivelyErc20TokenAdminId,
          account: assetAdminWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyAudioVideoProgramAssetAdminId,
          account: audioVideoProgramManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyPublicSaleAssetAdminId,
          account: publicSaleManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyTreasuryAssetAdminId,
          account: treasuryManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyValidatorRewardsAssetAdminId,
          account: validatorsRewardsManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyCrowdFoundingAssetAdminId,
          account: crowdFoundingManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyFoundingTeamAssetAdminId,
          account: foundingTeamManagerWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyTaxTreasuryAssetAdminId,
          account: assetAdminWallet.address,
          typeLimit: 32,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleLivelyErc20TokenAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, audioVideoProgramManagerWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, publicSaleManagerWallet.address, aclRoleLivelyPublicSaleAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, treasuryManagerWallet.address, aclRoleLivelyTreasuryAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, validatorsRewardsManagerWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, crowdFoundingManagerWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, foundingTeamManagerWallet.address, aclRoleLivelyFoundingTeamAssetAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId)
    })

  })

  describe("Libraries and Dependencies Deployments Test", function () {

    it("Should LivelyToken token deploy success", async () => {
      // given

      // const livelyTokenRealm = "LIVELY_GENERAL_REALM";
      // const livelyTokenNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenName));
      // const livelyTokenDomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenVersion));
      // const livelyTokenDomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenRealm));
      const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);
      const lTokenERC20 = await lTokenERC20Factory.deploy();
      const libraryAddresses = {
        "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
      };
      const livelyTokenFactory = new LivelyToken__factory(libraryAddresses, systemAdmin);
      const livelyTokenSubject = await livelyTokenFactory.deploy();

      const proxyFactory = new Proxy__factory(systemAdmin);
      const tokenProxy = await proxyFactory.deploy(livelyTokenSubject.address, new Int8Array(0));
      // const signature = await generateContextDomainSignatureManually(
      //   tokenProxy.address,
      //   livelyTokenName,
      //   livelyTokenVersion,
      //   livelyTokenRealm,
      //   accessControlManager.address,
      //   systemAdminWallet,
      //   networkChainId
      // );
      const request: LivelyToken.InitRequestStruct = {
        contractName: livelyTokenName,
        contractVersion: livelyTokenVersion,
        taxRateValue: BigNumber.from(0),
        aclManager: aclManagerProxy.address,
      };

      // when
      livelyToken = livelyTokenSubject.attach(tokenProxy.address);
      await expect(livelyToken.connect(systemAdmin).initialize(request))
        .to.emit(livelyToken, "Upgraded")
        .withArgs(systemAdminAddress, livelyToken.address, livelyTokenSubject.address)
        .to.emit(livelyToken, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyToken.address, systemAdminAddress)
        .to.emit(livelyToken, "Initialized")
        .withArgs(
          systemAdminAddress,
          livelyToken.address,
          livelyTokenSubject.address,
          livelyTokenName,
          livelyTokenVersion,
          1
        );

      const domainSeparator = generateDomainSeparator(
        livelyTokenName,
        livelyTokenVersion,
        livelyToken.address,
        networkChainId
      );
      // then
      let proxyInfo: IProxy.ProxyInfoStruct = await livelyToken.proxyInfo();
      expect(proxyInfo.name).to.be.equal(livelyTokenName);
      expect(proxyInfo.version).to.be.equal(livelyTokenVersion);
      expect(proxyInfo.subject).to.be.equal(livelyTokenSubject.address);
      expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
      expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
      expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
      expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
      expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
      expect(proxyInfo.initVersion).to.be.equal(1)
    });

    it("Should register LivelyToken context by systemAdmin success", async() => {
      // given
      const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
      const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: aclRealmLivelyErc20TokenId,
          adminId: aclRoleLivelyErc20TokenAdminId,
          salt: ethers.constants.HashZero,
          name: livelyTokenName,
          version: livelyTokenVersion,
          contractId: livelyToken.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 32,
          functionLimit: 128,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
      ];


      // when
      await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
        .to.emit(contextManagerDelegateProxy, "ContextRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, livelyToken.address,
          aclRealmLivelyErc20TokenId, systemAdminWallet.address, ethers.constants.AddressZero,
          ethers.constants.AddressZero, aclRoleLivelyErc20TokenAdminId)
    })

    it("Should register LivelyToken functions by systemAdmin success", async() => {
      // given
      const livelyTokenIface = new ethers.utils.Interface(LivelyToken__factory.abi);
      const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
      const signer = new Int8Array(0);

      const transferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("transfer")]));
      const tokenTransferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("transferFrom")]));
      const approveFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("approve")]))
      const batchTransferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("batchTransfer")]))
      const batchTransferFromFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("batchTransferFrom")]))
      const permitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("permit")]))
      const increaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("increaseAllowance")]))
      const decreaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("decreaseAllowance")]))
      const claimTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("claimToken")]))

      const burnFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("burn")]))
      const mintFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("mint")]))
      const updateTaxRateFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("updateTaxRate")]))
      const updateTaxWhitelistFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("updateTaxWhitelist")]))
      const pauseFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("pause")]))
      const unpauseFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("unpause")]))
      const pauseAllFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("pauseAll")]))
      const unpauseAllFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("unpauseAll")]))
      const unlockTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("unlockToken")]))

      const lockTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("lockToken")]))
      const tokensDistributionFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("tokensDistribution")]))

      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("withdrawBalance")]))


      const livelyTokenFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: livelyToken.address,
      }
      const livelyTokenFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("transfer"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("transferFrom"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("approve"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("batchTransfer"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("batchTransferFrom"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("permit"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("increaseAllowance"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("decreaseAllowance"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
          selector: livelyTokenIface.getSighash("claimToken"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("burn"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("mint"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("updateTaxRate"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("updateTaxWhitelist"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("pause"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("unpause"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("pauseAll"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("unpauseAll"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("unlockToken"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: livelyTokenIface.getSighash("lockToken"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: livelyTokenIface.getSighash("tokensDistribution"),
          agentLimit: 128,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: livelyTokenIface.getSighash("upgradeTo"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("setSafeModeStatus"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: livelyTokenIface.getSighash("setLocalAdmin"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: livelyTokenIface.getSighash("setAccessControlManager"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAdminId,
          agentId: aclRoleLivelyErc20TokenAdminId,
          selector: livelyTokenIface.getSighash("withdrawBalance"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(livelyTokenFunctionSignatureRequest, livelyTokenFunctionRequests))
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, tokenTransferFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, approveFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFromFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, permitFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, increaseAllowanceFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, decreaseAllowanceFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, claimTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, burnFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, mintFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxRateFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxWhitelistFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseAllFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseAllFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unlockTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, lockTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, tokensDistributionFunctionId,aclRoleLivelyErc20TokenAdminId,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclRoleLivelyErc20TokenAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclRoleLivelyErc20TokenAdminId,signer)
    })

    it("Should LAssetManagerERC20 deploy success", async () => {
      // given
      const lAssetManagerERC20Factory = new LAssetManagerERC20__factory(systemAdmin);

      // when
      lAssetManagerERC20 = await lAssetManagerERC20Factory.deploy();

      // then
      expect(lAssetManagerERC20.address).not.null;
      expect(await lAssetManagerERC20.LIB_NAME()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LAssetManagerERC20"))
      );
      expect(await lAssetManagerERC20.LIB_VERSION()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0"))
      );
    });
  });

  describe("Subject (AssetManagerERC20 Implementation) Tests", function () {
    this.beforeAll(async () => {
      assetManagerLinkLibraryAddresses = {
        "src/contracts/lib/token/LAssetManagerERC20.sol:LAssetManagerERC20": lAssetManagerERC20.address,
      };
    });

    it("Should AssetManagerERC20 Subject deploy success", async () => {
      // given
      const assetManagerFactory = new AssetManagerERC20__factory(assetManagerLinkLibraryAddresses, systemAdmin);

      // when
      assetManagerSubject = await assetManagerFactory.deploy();

      // then
      expect(assetManagerSubject.address).to.be.not.null;
    });

    it("Should initialize of AssetManagerERC20 subject failed", async () => {
      // when and then
      await expect(
        assetManagerSubject.connect(systemAdmin).initialize({
          contractName: assetManagerERC20Name,
          contractVersion: assetManagerERC20Version,
          aclManager: aclManagerProxy.address,
        })
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should return correct slot storage of AssetManagerERC20 subject", async () => {
      // when and then
      expect(await assetManagerSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  });

  describe("AssetManagerERC20 (UUPS Proxy) Tests", function () {
    it("Should deploy and initialize AssetManagerERC20 proxy success", async () => {
      // given
      const proxyFactory = new Proxy__factory(systemAdmin);
      const assetProxy = await proxyFactory.deploy(assetManagerSubject.address, new Int8Array(0));

      const request: AssetManagerERC20.InitRequestStruct = {
        contractName: assetManagerERC20Name,
        contractVersion: assetManagerERC20Version,
        aclManager: aclManagerProxy.address
      };

      // when
      assetManagerProxy = assetManagerSubject.attach(assetProxy.address);
      assetManagerProxyId = ethers.utils.keccak256(assetManagerProxy.address)
      await expect(assetManagerProxy.connect(systemAdmin).initialize(request))
        .to.emit(assetManagerProxy, "Upgraded")
        .withArgs(systemAdminAddress, assetManagerProxy.address, assetManagerSubject.address)
        .to.emit(assetManagerProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, assetManagerProxy.address, systemAdminAddress)
        .to.emit(assetManagerProxy, "Initialized")
        .withArgs(
          systemAdminAddress,
          assetManagerProxy.address,
          assetManagerSubject.address,
          assetManagerERC20Name,
          assetManagerERC20Version,
          1
        );

      // then
      const domainSeparator = generateDomainSeparator(
        assetManagerERC20Name,
        assetManagerERC20Version,
        assetManagerProxy.address,
        networkChainId
      );

      let proxyInfo: IProxy.ProxyInfoStruct = await assetManagerProxy.proxyInfo();
      expect(proxyInfo.name).to.be.equal(assetManagerERC20Name);
      expect(proxyInfo.version).to.be.equal(assetManagerERC20Version);
      expect(proxyInfo.subject).to.be.equal(assetManagerProxy.address);
      expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
      expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
      expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
      expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
      expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
      expect(proxyInfo.initVersion).to.be.equal(1)
    });

    it("Should register AssetManger context by systemAdmin success", async() => {
      // given
      const assetMangerContextId = ethers.utils.keccak256(assetManagerProxy.address);
      const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: aclRealmLivelyErc20TokenId,
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          salt: ethers.constants.HashZero,
          name: assetManagerERC20Name,
          version: assetManagerERC20Version,
          contractId: assetManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: 32,
          functionLimit: 128,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
      ];


      // when
      await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
        .to.emit(contextManagerDelegateProxy, "ContextRegistered")
        .withArgs(systemAdminWallet.address, assetMangerContextId, assetManagerProxy.address,
          aclRealmLivelyErc20TokenId, systemAdminWallet.address, ethers.constants.AddressZero,
          ethers.constants.AddressZero, aclRoleLivelyErc20TokenAssetAdminId)
    })

    it("Should register AssetManager functions by systemAdmin success", async() => {
      // given
      const assetManagerIface = new ethers.utils.Interface(AssetManagerERC20__factory.abi);
      const assetContextId = ethers.utils.keccak256(assetManagerProxy.address);
      const signer = new Int8Array(0);
      const tokenLockFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenLock")]));
      const tokenTransferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenTransfer")]));
      const tokenBatchTransferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenBatchTransfer")]))
      const tokenTransferFromFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenTransferFrom")]))
      const tokenBatchTransferFromFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenBatchTransferFrom")]))
      const tokenApproveFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenApprove")]))
      const tokenIncreaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenIncreaseAllowance")]))
      const tokenDecreaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [assetManagerProxy.address,  assetManagerIface.getSighash("tokenDecreaseAllowance")]))
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
          [assetManagerProxy.address,  assetManagerIface.getSighash("setSafeModeToken")]))
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

      const assetManagerFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
        signature: new Int8Array(0),
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: assetManagerProxy.address,
      }
      const assetManagerFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenLock"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenTransfer"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenBatchTransfer"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenTransferFrom"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenBatchTransferFrom"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenApprove"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenIncreaseAllowance"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("tokenDecreaseAllowance"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("createAsset"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("registerAsset"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("removeAsset"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("registerToken"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("updateToken"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclTypeLivelyErc20TokenAssetManagerId,
          selector: assetManagerIface.getSighash("setSafeModeToken"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: assetManagerIface.getSighash("upgradeTo"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclRoleLivelyErc20TokenAssetAdminId,
          selector: assetManagerIface.getSighash("setSafeModeStatus"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclRoleLivelyErc20TokenAssetAdminId,
          selector: assetManagerIface.getSighash("setUpdatabilityStatus"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: assetManagerIface.getSighash("setLocalAdmin"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: assetManagerIface.getSighash("setAccessControlManager"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: aclRoleLivelyErc20TokenAssetAdminId,
          agentId: aclRoleLivelyErc20TokenAssetAdminId,
          selector: assetManagerIface.getSighash("withdrawBalance"),
          agentLimit: 64,
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(assetManagerFunctionSignatureRequest, assetManagerFunctionRequests))
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenLockFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenTransferFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenBatchTransferFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenTransferFromFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenBatchTransferFromFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenApproveFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenIncreaseAllowanceFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, tokenDecreaseAllowanceFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, createAssetFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, removeAssetFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, registerAssetFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, updateTokenFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, registerTokenFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setSafeModeTokenFunctionId, aclRoleLivelyErc20TokenAssetAdminId,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclTypeLivelyErc20TokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          aclRoleLivelyErc20TokenAssetAdminId,signer)
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
      expect(await assetSubjectERC20.assetSafeMode()).to.be.true;
      expect(await assetSubjectERC20.assetInitVersion()).to.be.equal(0);
    });

    it("Should register lively token to assetManager by anyone failed", async () => {
      // when and then
      await expect(assetManagerProxy.connect(livelyAdmin).registerToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).registerToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).registerToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.false;
    });

    it("Should register lively token to assetManager by assetAdmin success", async () => {
      // given
      const tokenName = await livelyToken.name();
      const tokenSymbol = await livelyToken.symbol();
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        ACL_REALM_LIVELY_ERC20_TOKEN_NAME,
        aclManagerProxy.address,
        systemAdminWallet,
        networkChainId,
        assetSubjectERC20.address
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(livelyToken.address, assetSubjectERC20.address, signature))
        .to.emit(assetManagerProxy, "TokenRegistered")
        .withArgs(assetAdminAddress, livelyToken.address, assetSubjectERC20.address, tokenName, tokenSymbol);

      // then
      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;

      // and
      const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(tokenInfo.status).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(tokenInfo.assets).to.be.empty;
      expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
      expect(tokenInfo.assetSignature).to.be.equal(signature);
    });

    it("Should update lively token to assetManager by anyone failed", async () => {
      // when and then
      await expect(assetManagerProxy.connect(livelyAdmin).updateToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).updateToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).updateToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;
    });

    it("Should update lively token to assetManager by assetAdmin success", async () => {
      // given
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        ACL_REALM_LIVELY_ERC20_TOKEN_NAME,
        aclManagerProxy.address,
        systemAdminWallet,
        networkChainId,
        assetSubjectERC20.address
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).updateToken(livelyToken.address, assetSubjectERC20.address, signature))
        .to.emit(assetManagerProxy, "TokenUpdated")
        .withArgs(assetAdminAddress, livelyToken.address, assetSubjectERC20.address);

      // then
      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;

      // and
      const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(tokenInfo.status).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(tokenInfo.assets).to.be.empty;
      expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
      expect(tokenInfo.assetSignature).to.be.equal(signature);
    });

    it("Should repeat again register lively token to assetManager by assetAdmin failed", async () => {
      const beforeAllTokens = await assetManagerProxy.getAllTokens();

      // when and then
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(livelyToken.address, assetSubjectERC20.address, "0x00")).to.revertedWith(
        "Already Registered"
      );

      const afterAllTokens = await assetManagerProxy.getAllTokens();
      expect(afterAllTokens).to.be.eql(beforeAllTokens);
    });

    it("Should register another token to assetManager by assetAdmin success", async () => {
      // given
      const tokenERC20 = await deployMockContract(systemAdmin, LivelyToken__factory.abi);
      await tokenERC20.mock.supportsInterface.returns(true);
      await tokenERC20.mock.name.returns("INV");
      await tokenERC20.mock.symbol.returns("INOVERSE");
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        ACL_REALM_LIVELY_ERC20_TOKEN_NAME,
        aclManagerProxy.address,
        systemAdminWallet,
        networkChainId,
        assetSubjectERC20.address
      );


      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(tokenERC20.address, assetSubjectERC20.address, signature))
        .to.emit(assetManagerProxy, "TokenRegistered")
        .withArgs(assetAdminAddress, tokenERC20.address, assetSubjectERC20.address, "INV", "INOVERSE");

      // then
      expect(await assetManagerProxy.isTokenExists(tokenERC20.address)).to.be.true;
      const allTokens = await assetManagerProxy.getAllTokens();
      expect(allTokens).to.be.eql([livelyToken.address, tokenERC20.address]);
    });

    it("Should create assets by anyone failed", async () => {
      // given
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclTypeLivelyAudioVideoProgramAssetId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: ACL_TYPE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };

      // when
      await expect(assetManagerProxy.connect(livelyAdmin).createAsset(createAssetRequest)).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(systemAdmin).createAsset(createAssetRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).createAsset(createAssetRequest)).to.revertedWith("Access Denied");
    });

    it("Should create LIVELY_AUDIO_VIDEO_PROGRAM_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyAudioVideoProgramAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetAudioVideoProgram = await factory.attach(assetId);
      assetAudioVideoProgramId = ethers.utils.keccak256(assetAudioVideoProgram.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetAudioVideoProgram, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );

      // and
      expect(await assetAudioVideoProgram.assetName()).to.be.equal(livelyAudioVideoProgramAssetName);
      expect(await assetAudioVideoProgram.assetVersion()).to.be.equal(CONTRACTS_VERSION);
      expect(await assetAudioVideoProgram.assetInitVersion()).to.be.equal(1);
      expect(await assetAudioVideoProgram.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetAudioVideoProgram.assetAccessControl()).to.be.equal(aclManagerProxy.address);
      expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetAudioVideoProgram.assetSafeMode()).to.be.equal(AssetSafeModeStatus.DISABLED);

      // and
      const assetInfo: IAssetEntity.AssetInfoStruct = await assetAudioVideoProgram.assetInfo();
      expect(assetInfo.name).to.be.equal(livelyAudioVideoProgramAssetName);
      expect(assetInfo.version).to.be.equal(CONTRACTS_VERSION);
      expect(assetInfo.initVersion).to.be.equal(1);
      expect(assetInfo.atype).to.be.equal(AssetType.ERC20);
      expect(assetInfo.accessControl).to.be.equal(aclManagerProxy.address);
      expect(assetInfo.token).to.be.equal(livelyToken.address);
      expect(assetInfo.status).to.be.equal(AssetSafeModeStatus.DISABLED);

    });

    it("Should create LIVELY_FOUNDING_TEAM_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyFoundingTeamAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetFoundingTeam = await factory.attach(assetId);
      assetFoundingTeamId = ethers.utils.keccak256(assetFoundingTeam.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetFoundingTeam, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should create LIVELY_TREASURY_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyTreasuryAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetTreasury = await factory.attach(assetId);
      assetTreasuryId = ethers.utils.keccak256(assetTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should create LIVELY_PUBLIC_SALE_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyPublicSaleAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetPublicSale = await factory.attach(assetId);
      assetPublicSaleId = ethers.utils.keccak256(assetPublicSale.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetPublicSale, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should create LIVELY_VALIDATORS_REWARDS_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyValidatorRewardsAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetValidatorsRewards = await factory.attach(assetId);
      assetValidatorsRewardsId = ethers.utils.keccak256(assetValidatorsRewards.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetValidatorsRewards, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should create LIVELY_CROWD_FOUNDING_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyCrowdFoundingAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetCrowdFounding = await factory.attach(assetId);
      assetCrowdFoundingId = ethers.utils.keccak256(assetCrowdFounding.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetCrowdFounding, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should create LIVELY_TAX_TREASURY_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
        adminId: aclRoleLivelyErc20TokenAssetAdminId,
        agentId: aclRoleLivelyErc20TokenAssetAdminId,
        realmId: aclRealmLivelyErc20TokenId,
        salt: saltValue,
        assetName: livelyTaxTreasuryAssetName,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
      };
      assetTaxTreasury = await factory.attach(assetId);
      assetTaxTreasuryId = ethers.utils.keccak256(assetTaxTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTaxTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should update assets role scopes to asset itself success", async() => {
      // given
      const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
        {
          id: aclRoleLivelyAudioVideoProgramAssetAdminId,
          scopeId: assetAudioVideoProgramId,
        },
        {
          id: aclRoleLivelyPublicSaleAssetAdminId,
          scopeId: assetPublicSaleId,
        },
        {
          id: aclRoleLivelyFoundingTeamAssetAdminId,
          scopeId: assetFoundingTeamId,
        },
        {
          id: aclRoleLivelyCrowdFoundingAssetAdminId,
          scopeId: assetCrowdFoundingId,
        },
        {
          id: aclRoleLivelyValidatorRewardsAssetAdminId,
          scopeId: assetValidatorsRewardsId,
        },
        {
          id: aclRoleLivelyTreasuryAssetAdminId,
          scopeId: assetTreasuryId,
        },
        {
          id: aclRoleLivelyTaxTreasuryAssetAdminId,
          scopeId: assetTaxTreasuryId,
        },
      ]

      // when
      await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(requests))
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, assetAudioVideoProgramId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, assetPublicSaleId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, assetFoundingTeamId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, assetCrowdFoundingId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, assetValidatorsRewardsId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, assetTreasuryId)
        .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, assetTaxTreasuryId)
    })

    it("Should register AssetManager and assets contract as a member to AssetManagerAdminRole success", async() => {
      // given
      const requests: IMemberManagement.MemberRegisterStruct[] = [
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetManagerProxy.address,
          typeLimit: 16,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetAudioVideoProgram.address,
          typeLimit: 16,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetPublicSale.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetFoundingTeam.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetCrowdFounding.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetValidatorsRewards.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetTreasury.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          account: assetTaxTreasury.address,
          typeLimit: 1,
          factoryLimit: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        }
      ]

      // when
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetManagerProxyId, assetManagerProxy.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAudioVideoProgramId, assetAudioVideoProgram.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetPublicSaleId, assetPublicSale.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetFoundingTeamId, assetFoundingTeam.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetCrowdFoundingId, assetCrowdFounding.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetValidatorsRewardsId, assetValidatorsRewards.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetTreasuryId, assetTreasury.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetTaxTreasuryId, assetTaxTreasury.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
    })

    it("Should grant members to related roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
        {
          roleId: aclRoleLivelyErc20TokenAssetAdminId,
          members: [assetAdminId]
        },
        {
          roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
          members: [assetAdminId]
        },
        {
          roleId: aclRoleLivelyAudioVideoProgramAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyPublicSaleAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyFoundingTeamAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyCrowdFoundingAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyValidatorRewardsAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyTreasuryAssetAdminId,
          members: [assetManagerProxyId]
        },
        {
          roleId: aclRoleLivelyTaxTreasuryAssetAdminId,
          members: [assetManagerProxyId]
        },

      ]

      // when
      await expect(roleManagerDelegateProxy.connect(assetAdmin).roleGrantMembers(requests))
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetManagerAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, assetAdminId, aclTypeLivelyErc20TokenId)


    })


    it("Should distribute token call by anyone failed", async () => {
      // when and then
      await expect(assetManagerProxy.connect(livelyAdmin).livelyTokensDistribution(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(
        assetManagerProxy.connect(systemAdmin).livelyTokensDistribution(livelyToken.address)
      ).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).livelyTokensDistribution(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );
    });

    it("Should distribute token call by assetAdmin success", async () => {
      // given
      const beforeBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
      const beforeBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
      const beforeBalanceTreasury = await assetTreasury.tokenBalance();
      const beforeBalancePublicSale = await assetPublicSale.tokenBalance();
      const beforeBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
      const beforeBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).livelyTokensDistribution(livelyToken.address))
        .to.emit(livelyToken, "Mint")
        .withArgs(assetManagerProxy.address, assetManagerProxy.address, livelyTokenTotalSupply, livelyTokenTotalSupply)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, assetAudioVideoProgramBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, assetFoundingTeamBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetTreasury.address, assetTreasuryBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetPublicSaleBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, assetValidatorsRewardsBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetCrowdFoundingBalance);

      // then
      const afterBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
      const afterBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
      const afterBalanceTreasury = await assetTreasury.tokenBalance();
      const afterBalancePublicSale = await assetPublicSale.tokenBalance();
      const afterBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
      const afterBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();

      expect(afterBalanceAudioVideoProgram.toString()).to.be.equal(
        beforeBalanceAudioVideoProgram.add(assetAudioVideoProgramBalance).toString()
      );
      expect(afterBalanceFoundingTeam.toString()).to.be.equal(
        beforeBalanceFoundingTeam.add(assetFoundingTeamBalance).toString()
      );
      expect(afterBalanceTreasury.toString()).to.be.equal(beforeBalanceTreasury.add(assetTreasuryBalance).toString());
      expect(afterBalancePublicSale.toString()).to.be.equal(
        beforeBalancePublicSale.add(assetPublicSaleBalance).toString()
      );
      expect(afterBalanceValidatorsRewards.toString()).to.be.equal(
        beforeBalanceValidatorsRewards.add(assetValidatorsRewardsBalance).toString()
      );
      expect(afterBalanceCrowdFounding.toString()).to.be.equal(
        beforeBalanceCrowdFounding.add(assetCrowdFoundingBalance).toString()
      );
    });

    it("Should removeAsset call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(livelyAdmin).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.true;
    });

    it("Should removeAsset call by assetAdmin success", async () => {
      // given
      const beforeRemoveAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRemoveAssetSafeMode = await assetPublicSale.assetSafeMode();
      // const assetRealm = await assetPublicSale.assetRealm();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).removeAsset(assetPublicSale.address))
        .to.emit(assetManagerProxy, "AssetRemoved")
        .withArgs(assetAdminAddress, assetPublicSale.address, livelyToken.address)
        .to.emit(assetPublicSale, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, AssetSafeModeStatus.ENABLED);

      // then
      const afterRemoveAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const afterRemoveAssetSafeMode = await assetPublicSale.assetSafeMode();
      expect(beforeRemoveAsset).to.be.true;
      expect(afterRemoveAsset).to.be.false;
      expect(beforeRemoveAssetSafeMode).to.be.false;
      expect(afterRemoveAssetSafeMode).to.be.true;
    });

    it("Should registerAsset call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(livelyAdmin).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.false;
    });

    it("Should registerAsset call by assetAdmin success", async () => {
      // given
      const beforeRegisterAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRegisterAssetSafeMode = await assetPublicSale.assetSafeMode();
      // const assetRealm = await assetPublicSale.assetRealm();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerAsset(assetPublicSale.address))
        .to.emit(assetManagerProxy, "AssetRegistered")
        .withArgs(assetAdminAddress, assetPublicSale.address, livelyToken.address)
        .to.emit(assetPublicSale, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, AssetSafeModeStatus.DISABLED);

      // then
      const afterRegisterAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const afterRegisterAssetSafeMode = await assetPublicSale.assetSafeMode();
      expect(beforeRegisterAsset).to.be.false;
      expect(afterRegisterAsset).to.be.true;
      expect(beforeRegisterAssetSafeMode).to.be.true;
      expect(afterRegisterAssetSafeMode).to.be.false;
    });

    it("Should setSafeModeToken call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(livelyAdmin).setSafeModeToken(livelyToken.address, TokenSafeModeStatus.ENABLED)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).setSafeModeToken(livelyToken.address, TokenSafeModeStatus.ENABLED)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).setSafeModeToken(livelyToken.address, TokenSafeModeStatus.ENABLED)).to.revertedWith(
        "Access Denied"
      );

      // then
      const [status] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(TokenSafeModeStatus.DISABLED);
    });

    it("Should enable SafeMode Token by assetAdmin success", async () => {
      // given
      // const assetRealm = await assetPublicSale.assetRealm();
      const beforeAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const beforeAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const beforeAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const beforeAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const beforeAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const beforeAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const beforeAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeToken(livelyToken.address, TokenSafeModeStatus.ENABLED))
        .to.emit(assetManagerProxy, "TokenSafeModeUpdated")
        .withArgs(assetAdminAddress, livelyToken.address, true)
        .to.emit(assetAudioVideoProgram, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetFoundingTeam, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTreasury.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetPublicSale, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetValidatorsRewards, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetCrowdFounding, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, TokenSafeModeStatus.ENABLED)
        .to.emit(assetTaxTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address, TokenSafeModeStatus.ENABLED);

      // then
      const afterAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const afterAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const afterAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const afterAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const afterAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const afterAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const afterAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      expect(beforeAssetAudioVideoProgramStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetAudioVideoProgramStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetFoundingTeamStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetFoundingTeamStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetTreasuryStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetTreasuryStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetPublicSaleStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetPublicSaleStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetValidatorsRewardsStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetValidatorsRewardsStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetAudioVideoProgramStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetAudioVideoProgramStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetCrowdFoundingStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetCrowdFoundingStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
      expect(beforeAssetTaxTreasuryStatus).to.be.equal(TokenSafeModeStatus.DISABLED);
      expect(afterAssetTaxTreasuryStatus).to.be.equal(TokenSafeModeStatus.ENABLED);
    });

    it("Should disable SafeMode Token by assetAdmin success", async () => {
      // given
      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeToken(livelyToken.address, TokenSafeModeStatus.DISABLED))
        .to.emit(assetManagerProxy, "TokenSafeModeChanged")
        .withArgs(assetAdminAddress, livelyToken.address, false)
        .to.emit(assetAudioVideoProgram, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTreasury.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetPublicSale, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetPublicSale.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetValidatorsRewards, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetCrowdFounding, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address,TokenSafeModeStatus.DISABLED)
        .to.emit(assetTaxTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address,TokenSafeModeStatus.DISABLED);
    });

    it("Should tokenLock call of FoundingTeam asset by anyone failed", async () => {
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
      ];

      await expect(assetManagerProxy.connect(livelyAdmin).tokenLock(livelyToken.address, lockRequests)).to.revertedWith(
        "Access Denied"
      );

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenLock(livelyToken.address, lockRequests)
      ).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).tokenLock(livelyToken.address, lockRequests)).to.revertedWith(
        "Access Denied"
      );
    });

    it("Should tokenLock call of FoundingTeam asset by assetAdmin success", async () => {
      // given
      const assetFoundingTeamBalanceBefore = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceBefore = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyToken.totalBalanceOf(user1Address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
      ];

      const user2LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[0].source, lockRequests[0].dest, lockRequests[0].timestamp, lockRequests[0].amount]
        )
      );
      const user1LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[1].source, lockRequests[1].dest, lockRequests[1].timestamp, lockRequests[1].amount]
        )
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).tokenLock(assetFoundingTeam.address, lockRequests))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user2LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[0].timestamp,
          lockRequests[0].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user1LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[1].timestamp,
          lockRequests[1].amount
        )
        .to.emit(livelyToken, "BatchTokenLocked")
        .withArgs(assetFoundingTeam.address, dummyAmount.mul(2))
        .to.emit(assetFoundingTeam, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetFoundingTeam.address,
          assetFoundingTeam.interface.getSighash(
            assetFoundingTeam.interface.functions["tokenLock((address,address,uint256,uint256)[])"]
          )
        );

      // then
      const [amount1, lockedAt1, claimedAt1, source1, status1] = await livelyToken.lockInfo(user2LockId, user2Address);
      const [amount2, lockedAt2, claimedAt2, source2, status2] = await livelyToken.lockInfo(user1LockId, user1Address);
      const assetFoundingTeamBalanceAfter = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceAfter = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyToken.totalBalanceOf(user1Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetFoundingTeamBalanceAfter.toString()).to.be.equal(
        assetFoundingTeamBalanceBefore.sub(dummyAmount.mul(2)).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount1.toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(lockedAt1.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt1.toString()).to.be.equal(lockRequests[0].timestamp.toString());
      expect(source1).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status1).to.be.equal(LockState.LOCKED);

      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(dummyAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount2.toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(lockedAt2.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt2.toString()).to.be.equal(lockRequests[1].timestamp.toString());
      expect(source2).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status2).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenTransfer call of AudioVideoProgram asset by anyone failed", async () => {
      // when and then
      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenTransfer call of AudioVideoProgram asset by assetAdmin success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetAudioVideoProgram.address, user1Address, dummyAmount)
        .to.emit(assetAudioVideoProgram, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenTransfer(address,uint256)"]
          )
        );

      // then
      const assetAudioVideoProgramBalanceAfter = await assetAudioVideoProgram.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransfer call of Treasury asset by anyone failed", async () => {
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenBatchTransfer call of Treasury asset by assetAdmin success", async () => {
      // given
      const assetTreasuryBalanceBefore = await assetTreasury.tokenBalance();
      const user2BalanceBefore = await livelyToken.balanceOf(user2Address);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      // when
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchTransfer(assetTreasury.address, [batchTransfer]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetTreasury.address, user2Address, batchTransfer.amount)
        .to.emit(livelyToken, "BatchTransfer")
        .withArgs(user1Address, batchTransfer.amount)
        .to.emit(assetTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTreasury.address,
          assetTreasury.interface.getSighash(
            assetTreasury.interface.functions["tokenBatchTransfer((address,uint256)[])"]
          )
        );

      // then
      const assetTreasuryBalanceAfter = await assetTreasury.tokenBalance();
      const user2BalanceAfter = await livelyToken.balanceOf(user2Address);

      expect(assetTreasuryBalanceAfter).to.be.equal(assetTreasuryBalanceBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenApprove call of ValidatorsRewards asset by anyone failed", async () => {
      // when and then
      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenApprove call of ValidatorsRewards asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenApprove(assetValidatorsRewards.address, assetTaxTreasury.address, dummyAmount.mul(2))
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetValidatorsRewards.address, assetTreasury.address, dummyAmount.mul(2))
        .to.emit(assetValidatorsRewards, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetValidatorsRewards.address,
          assetValidatorsRewards.interface.getSighash(
            assetValidatorsRewards.interface.functions["tokenApprove(address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      expect(assetTaxTreasuryAllowanceAfter.toString()).to.be.equal(
        assetTaxTreasuryAllowanceBefore.add(dummyAmount.mul(2)).toString()
      );
    });

    it("Should tokenTransferFrom call of TaxTreasury asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy
          .connect(livelyAdmin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(user1)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenTransferFrom call of TaxTreasury asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenTransferFrom(address,address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransferFrom call of TaxTreasury asset by anyone failed", async () => {
      // given
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenBatchTransferFrom call of TaxTreasury asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "BatchTransferFrom")
        .withArgs(assetTaxTreasury.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenBatchTransferFrom((address,address,uint256)[])"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenIncreaseAllowance call of CrowdFounding asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenIncreaseAllowance call of CrowdFounding asset by assetAdmin success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalIncreased")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetCrowdFounding.address,
          assetCrowdFounding.interface.getSighash(
            assetCrowdFounding.interface.functions["tokenIncreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenDecreaseAllowance call of CrowdFounding asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy.connect(livelyAdmin).tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenDecreaseAllowance call of CrowdFounding asset by assetAdmin success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalDecrease")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetCrowdFounding.address,
          assetSubjectERC20.interface.getSighash(
            assetSubjectERC20.interface.functions["tokenDecreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.sub(dummyAmount).toString());
    });
  });

  describe("AssetERC20 Tests", function () {
    it("Should enable asset safeMode by anyone failed", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();

      // when and then
      await expect(assetFoundingTeam.connect(user1).assetSetSafeMode(AssetSafeModeStatus.ENABLED)).to.revertedWith("Access Denied");

      await expect(assetFoundingTeam.connect(livelyAdmin).assetSetSafeMode(AssetSafeModeStatus.ENABLED)).to.revertedWith("Access Denied");

      await expect(assetFoundingTeam.connect(systemAdmin).assetSetSafeMode(AssetSafeModeStatus.ENABLED)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetFoundingTeam.connect(foundingTeamManager).assetSetSafeMode(AssetSafeModeStatus.ENABLED)).to.revertedWith(
        "Access Denied"
      );

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable asset safeMode of assetFoundingTeam by assetAdmin success", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();
      // const realm = await assetFoundingTeam.assetRealm();

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSetSafeMode(AssetSafeModeStatus.ENABLED))
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetAdminAddress, assetFoundingTeam.address, AssetSafeModeStatus.ENABLED);

      // and
      expect(safeMode).to.be.false;

      // and
      expect(await assetFoundingTeam.assetSafeMode()).to.be.true;
    });

    it("Should call any methods by anyone when assetSafeMode enabled failed", async () => {
      // given
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAdminAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: user1Address,
        to: user2Address,
        amount: dummyAmount,
      };

      // and
      await expect(assetFoundingTeam.connect(user1).tokenLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(livelyAdmin).tokenLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(livelyAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(systemAdmin)
          .tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(foundingTeamManager)
          .tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(livelyAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenBatchTransferFrom([batchTransferFrom])
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenApprove(assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(livelyAdmin).tokenApprove(assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenApprove(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenApprove(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
    });

    it("Should disable asset safeMode of assetFoundingTeam by assetAdmin success", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();
      // const realm = await assetFoundingTeam.assetRealm();

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSetSafeMode(AssetSafeModeStatus.DISABLED))
        .to.emit(assetFoundingTeam, "AssetSafeModeUpdated")
        .withArgs(assetAdminAddress, assetFoundingTeam.address, AssetSafeModeStatus.DISABLED);
    });

    it("Should tokenLock of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async () => {
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
      ];

      await expect(assetFoundingTeam.connect(livelyAdmin).tokenLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetFoundingTeam.connect(systemAdmin).tokenLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetFoundingTeam.connect(assetAdmin).tokenLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenLock of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async () => {
      // given
      const assetFoundingTeamBalanceBefore = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceBefore = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyToken.totalBalanceOf(user1Address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
      ];

      const user2LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[0].source, lockRequests[0].dest, lockRequests[0].timestamp, lockRequests[0].amount]
        )
      );
      const user1LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[1].source, lockRequests[1].dest, lockRequests[1].timestamp, lockRequests[1].amount]
        )
      );

      // when
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenLock(lockRequests))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user2LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[0].timestamp,
          lockRequests[0].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user1LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[1].timestamp,
          lockRequests[1].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(assetFoundingTeam.address, dummyAmount.mul(2))
        .to.emit(assetFoundingTeam, "AssetERC20Called")
        .withArgs(
          foundingTeamManagerAddress,
          assetFoundingTeam.address,
          assetFoundingTeam.interface.getSighash(
            assetFoundingTeam.interface.functions["tokenLock((address,address,uint256,uint256)[])"]
          )
        );

      // then
      const [amount1, lockedAt1, claimedAt1, source1, status1] = await livelyToken.lockInfo(user2LockId, user2Address);
      const [amount2, lockedAt2, claimedAt2, source2, status2] = await livelyToken.lockInfo(user1LockId, user1Address);
      const assetFoundingTeamBalanceAfter = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceAfter = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyToken.totalBalanceOf(user1Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetFoundingTeamBalanceAfter.toString()).to.be.equal(
        assetFoundingTeamBalanceBefore.sub(dummyAmount.mul(2)).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount1.toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(lockedAt1.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt1.toString()).to.be.equal(lockRequests[0].timestamp.toString());
      expect(source1).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status1).to.be.equal(LockState.LOCKED);

      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(dummyAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount2.toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(lockedAt2.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt2.toString()).to.be.equal(lockRequests[1].timestamp.toString());
      expect(source2).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status2).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetPublicSale.connect(livelyAdmin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(systemAdmin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(assetAdmin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async () => {
      // given
      const assetPublicSaleBalanceBefore = await assetPublicSale.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(assetPublicSale.connect(publicSaleManager).tokenTransfer(user1Address, dummyAmount))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetPublicSale.address, user1Address, dummyAmount)
        .to.emit(assetPublicSale, "AssetERC20Called")
        .withArgs(
          publicSaleManagerAddress,
          assetPublicSale.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenTransfer(address,uint256)"]
          )
        );

      // then
      const assetPublicSaleBalanceAfter = await assetPublicSale.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetPublicSaleBalanceAfter.toString()).to.be.equal(
        assetPublicSaleBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      await expect(assetTreasury.connect(livelyAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTreasury.connect(systemAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTreasury.connect(assetAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by treasuryManager success", async () => {
      // given
      const assetTreasuryBalanceBefore = await assetTreasury.tokenBalance();
      const user2BalanceBefore = await livelyToken.balanceOf(user2Address);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      // when
      await expect(assetTreasury.connect(treasuryManager).tokenBatchTransfer([batchTransfer]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetTreasury.address, user2Address, batchTransfer.amount)
        .to.emit(livelyToken, "BatchTransfer")
        .withArgs(user1Address, batchTransfer.amount)
        .to.emit(assetTreasury, "AssetERC20Called")
        .withArgs(
          treasuryManagerAddress,
          assetTreasury.address,
          assetTreasury.interface.getSighash(
            assetTreasury.interface.functions["tokenBatchTransfer((address,uint256)[])"]
          )
        );

      // then
      const assetTreasuryBalanceAfter = await assetTreasury.tokenBalance();
      const user2BalanceAfter = await livelyToken.balanceOf(user2Address);

      expect(assetTreasuryBalanceAfter).to.be.equal(assetTreasuryBalanceBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetValidatorsRewards.connect(livelyAdmin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(systemAdmin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(assetAdmin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );

      // when
      await expect(
        assetValidatorsRewards
          .connect(validatorsRewardsManager)
          .tokenApprove(assetTaxTreasury.address, dummyAmount.mul(2))
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetValidatorsRewards.address, assetTreasury.address, dummyAmount.mul(2))
        .to.emit(assetValidatorsRewards, "AssetERC20Called")
        .withArgs(
          validatorsRewardsManagerAddress,
          assetValidatorsRewards.address,
          assetValidatorsRewards.interface.getSighash(
            assetValidatorsRewards.interface.functions["tokenApprove(address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      expect(assetTaxTreasuryAllowanceAfter.toString()).to.be.equal(
        assetTaxTreasuryAllowanceBefore.add(dummyAmount.mul(2)).toString()
      );
    });

    it("Should tokenTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      // when
      await expect(
        assetTaxTreasury.connect(livelyAdmin).tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(systemAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(treasuryManager)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenTransferFrom of LIVELY_TREASURY_ASSET by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetTaxTreasury
          .connect(assetAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminAddress,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenTransferFrom(address,address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      // given
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(assetTaxTreasury.connect(livelyAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTaxTreasury.connect(systemAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetTaxTreasury.connect(treasuryManager).tokenBatchTransferFrom([batchTransferFrom])
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(assetTaxTreasury.connect(assetAdmin).tokenBatchTransferFrom([batchTransferFrom]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "BatchTransferFrom")
        .withArgs(assetTaxTreasury.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminAddress,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenBatchTransferFrom((address,address,uint256)[])"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(livelyAdmin).tokenIncreaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenIncreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenIncreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenIncreaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalIncreased")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerAddress,
          assetCrowdFounding.address,
          assetCrowdFounding.interface.getSighash(
            assetCrowdFounding.interface.functions["tokenIncreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(livelyAdmin).tokenDecreaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenDecreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenDecreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenDecreaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalDecrease")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerAddress,
          assetCrowdFounding.address,
          assetSubjectERC20.interface.getSighash(
            assetSubjectERC20.interface.functions["tokenDecreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.sub(dummyAmount).toString());
    });

    it("Should deposit eth coin to LIVELY_AUDIO_VIDEO_PROGRAM_ASSET success", async () => {
      // given
      // const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.assetBalance();
      const user1BalanceBefore = await provider.getBalance(user1Address);
      const transaction: TransactionRequest = {
        to: assetAudioVideoProgram.address,
        value: ethers.utils.parseEther("10"),
      };

      // when
      const response = await user1.sendTransaction(transaction);

      // then
      const receiptTx = await provider.getTransactionReceipt(response.hash);
      // const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      const assetAudioVideoProgramBalanceAfter = await assetAudioVideoProgram.assetBalance();
      const user1BalanceAfter = await provider.getBalance(user1Address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore
          .sub(BigNumber.from(10).mul(tokenDecimal))
          .sub(receiptTx.gasUsed.mul(receiptTx.effectiveGasPrice))
          .toString()
      );
    });

    it("Should withdraw eth coin from LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);

      // when
      await expect(assetAudioVideoProgram.connect(user1).withdrawBalance(user1Address)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(systemAdmin).withdrawBalance(systemAdminAddress)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(livelyAdmin).withdrawBalance(adminAddress)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      // then
      const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(assetAudioVideoProgramBalanceBefore.toString());
    });

    it("Should withdraw eth coin from LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const user1BalanceBefore = await provider.getBalance(user1Address);

      // when
      await assetAudioVideoProgram.connect(audioVideoProgramManager).withdrawBalance(user1Address);

      // then
      const user1BalanceAfter = await provider.getBalance(user1Address);
      const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
    });
  });
});
