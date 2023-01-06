// import { expect } from "chai";
// import { Signer, BigNumber, Wallet, BigNumberish } from "ethers";
// import { ethers, waffle } from "hardhat";
// import { Address } from "hardhat-deploy/dist/types";
// /* eslint-disable camelcase */
// import {
//   AccessControl, AccessControl__factory,
//   ACLManager,
//   ACLManager__factory, ACLManagerProxy__factory, ACLProxy__factory,
//   AssetERC20,
//   AssetERC20__factory,
//   AssetManagerERC20,
//   AssetManagerERC20__factory,
//   ContextManager,
//   ContextManager__factory,
//   DomainManager, DomainManager__factory,
//   FunctionManager,
//   FunctionManager__factory,
//   GlobalManager, GlobalManager__factory, IACLManager, IAssetEntity,
//   IAssetManagerERC20, IContextManagement, IDomainManagement,
//   IERC20Extra, IFunctionManagement, IMemberManagement, IProxy, IRealmManagement, IRoleManagement, ITypeManagement,
//   LACLManager,
//   LACLManager__factory,
//   LAssetManagerERC20,
//   LAssetManagerERC20__factory,
//   LivelyToken,
//   LivelyToken__factory,
//   LTokenERC20,
//   LTokenERC20__factory,
//   MemberManager,
//   MemberManager__factory,
//   PolicyManager, PolicyManager__factory,
//   Proxy__factory,
//   RealmManager, RealmManager__factory,
//   Relay,
//   Relay__factory,
//   RoleManager,
//   RoleManager__factory,
//   TypeManager,
//   TypeManager__factory
// } from "../../typechain/types";
// import { LivelyTokenLibraryAddresses } from "../../typechain/types/factories/token/lively/LivelyToken__factory";
// import {
//   generateDomainSeparator,
//   generateContextDomainSignatureManually,
//   generatePermitDomainSignatureByHardhat,
//   LockState,
//   generatePredictContextDomainSignatureManually,
//   LIVELY_VERSE_ACL_REALM_ID,
//   LIVELY_VERSE_ACL_TYPE_ID,
//   ActivityStatus,
//   AlterabilityStatus,
//   LIVELY_VERSE_ANY_TYPE_ID,
//   LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//   LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//   LIVELY_VERSE_AGENT_MASTER_TYPE_ID,
//   LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
//   LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//   LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//   LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
//   ProxySafeModeStatus,
//   ProxyUpdatabilityStatus,
//   LIVELY_VERSE_ANONYMOUS_TYPE_ID, TokenSafeModeStatus, AssetType, AssetSafeModeStatus
//   // LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
//   // LIVELY_FOUNDING_TEAM_ASSET_ROLE,
//   // LIVELY_TREASURY_ASSET_ROLE,
//   // LIVELY_PUBLIC_SALE_ASSET_ROLE,
//   // LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
//   // LIVELY_CROWD_FOUNDING_ASSET_ROLE,
// } from "./TestUtils";
// /* eslint-disable node/no-extraneous-import */
// import { TransactionRequest } from "@ethersproject/abstract-provider";
// import {
//   IERC20Lock,
//   TokenUnlockedEventObject,
// } from "../../typechain/types/token/lively/LivelyToken";
// import {
//   AssetManagerERC20LibraryAddresses
// } from "../../typechain/types/factories/token/asset/AssetManagerERC20__factory";
// import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
// import {IACLCommonas IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
// const { provider } = waffle;
//
// describe("Lively Token Tests", function () {
//   let livelyAdmin: Signer;
//   let systemAdmin: Signer;
//   let assetAdmin: Signer;
//   let crowdFoundingManager: Signer;
//   let validatorsRewardsManager: Signer;
//   let publicSaleManager: Signer;
//   let treasuryManager: Signer;
//   let foundingTeamManager: Signer;
//   let audioVideoProgramManager: Signer;
//   let taxTreasuryManager: Signer;
//   let user1: Signer;
//   let user2: Signer;
//   let livelyAdminWallet: Wallet;
//   let systemAdminWallet: Wallet;
//   let user1Wallet: Wallet;
//   let user2Wallet: Wallet;
//   let assetAdminWallet: Wallet;
//   let crowdFoundingManagerWallet: Wallet;
//   let validatorsRewardsManagerWallet: Wallet;
//   let publicSaleManagerWallet: Wallet;
//   let treasuryManagerWallet: Wallet;
//   let foundingTeamManagerWallet: Wallet;
//   let audioVideoProgramManagerWallet: Wallet;
//   let taxTreasuryManagerWallet: Wallet;
//   let adminAddress: Address;
//   let systemAdminAddress: Address;
//   let user1Address: Address;
//   let user2Address: Address;
//   let assetAdminAddress: Address;
//   let crowdFoundingManagerAddress: Address;
//   let validatorsRewardsManagerAddress: Address;
//   let publicSaleManagerAddress: Address;
//   let treasuryManagerAddress: Address;
//   let foundingTeamManagerAddress: Address;
//   let audioVideoProgramManagerAddress: Address;
//   let taxTreasuryManagerAddress: Address;
//   let livelyToken: LivelyToken;
//   let assetManagerSubject: AssetManagerERC20;
//   let assetManagerProxy: AssetManagerERC20;
//   let assetSubjectERC20: AssetERC20;
//   let assetAudioVideoProgram: AssetERC20;
//   let assetFoundingTeam: AssetERC20;
//   let assetTreasury: AssetERC20;
//   let assetPublicSale: AssetERC20;
//   let assetValidatorsRewards: AssetERC20;
//   let assetCrowdFounding: AssetERC20;
//   let assetTaxTreasury: AssetERC20;
//
//   let assetManagerProxyId: string;
//   let assetAudioVideoProgramId: string;
//   let assetFoundingTeamId: string;
//   let assetTreasuryId: string;
//   let assetPublicSaleId: string;
//   let assetValidatorsRewardsId: string;
//   let assetCrowdFoundingId: string;
//   let assetTaxTreasuryId: string;
//
//   // ACL requirements
//   let lACLManager: LACLManager;
//   // let livelyTokenLibraryAddresses: ACLManagerLibraryAddresses;
//   let memberManagerSubject: MemberManager;
//   let memberManagerProxy: MemberManager;
//   let memberManagerDelegateProxy: MemberManager;
//   let roleManagerSubject: RoleManager;
//   let roleManagerProxy: RoleManager;
//   let roleManagerDelegateProxy: RoleManager;
//   let typeManagerSubject: TypeManager;
//   let typeManagerProxy: TypeManager;
//   let typeManagerDelegateProxy: TypeManager;
//   let functionManagerSubject: FunctionManager;
//   let functionManagerProxy: FunctionManager;
//   let functionManagerDelegateProxy: FunctionManager;
//   let contextManagerSubject: ContextManager;
//   let contextManagerProxy: ContextManager;
//   let contextManagerDelegateProxy: ContextManager;
//   let realmManagerSubject: RealmManager;
//   let realmManagerProxy: RealmManager;
//   let realmManagerDelegateProxy: RealmManager;
//   let domainManagerSubject: DomainManager;
//   let domainManagerProxy: DomainManager;
//   let domainManagerDelegateProxy: DomainManager;
//   let globalManagerSubject: GlobalManager;
//   let globalManagerProxy: GlobalManager;
//   let globalManagerDelegateProxy: GlobalManager;
//   let policyManagerSubject: PolicyManager;
//   let policyManagerProxy: PolicyManager;
//   let policyManagerDelegateProxy: PolicyManager;
//   let accessControlSubject: AccessControl;
//   let accessControlProxy: AccessControl;
//   let accessControlDelegateProxy: AccessControl;
//   let aclManagerSubject: ACLManager;
//   let aclManagerProxy: ACLManager;
//   const MEMBER_MANAGER_CONTRACT_NAME = "MemberManager";
//   const ROLE_MANAGER_CONTRACT_NAME = "RoleManager";
//   const TYPE_MANAGER_CONTRACT_NAME = "TypeManager";
//   const FUNCTION_MANAGER_CONTRACT_NAME = "FunctionManager";
//   const CONTEXT_MANAGER_CONTRACT_NAME = "ContextManager";
//   const REALM_MANAGER_CONTRACT_NAME = "RealmManager";
//   const DOMAIN_MANAGER_CONTRACT_NAME = "DomainManager";
//   const GLOBAL_MANAGER_CONTRACT_NAME = "GlobalManager";
//   const POLICY_MANAGER_CONTRACT_NAME = "PolicyManager";
//   const ACCESS_CONTROL_CONTRACT_NAME = "AccessControl";
//   const ACL_MANAGER_CONTRACT_NAME = "ACLManager";
//   const CONTRACTS_VERSION =  "3.0.0";
//
//   const ACL_DOMAIN_VERSE_ASSETS_NAME = "SCOPE.VERSE_ASSETS";
//   const ACL_REALM_LIVELY_ERC20_TOKEN_NAME = "SCOPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN";
//   const ACL_TYPE_VERSE_ASSETS_NAME = "TYPE.VERSE_ASSETS"
//   const ACL_ROLE_VERSE_ASSETS_ADMIN_NAME = "ROLE.VERSE_ASSETS.ASSET_ADMIN";
//   const ACL_TYPE_LIVELY_ERC20_TOKEN_NAME = "TYPE.VERSE_ASSETS.LIVELY_ERC20_TOKEN"
//   const ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME = "ROLE.VERSE_ASSETS.ERC20_TOKEN.ADMIN";
//   const ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME = "TYPE.VERSE_ASSETS.ERC20_TOKEN.ASSET_MANAGER";
//   const ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME = "ROLE.VERSE_ASSETS.ERC20_TOKEN.ASSET_MANAGER_ADMIN";
//   const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.AUDIO_VIDEO_PROGRAM_ASSET";
//   const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.FOUNDING_TEAM_ASSET";
//   const ACL_ROLE_LIVELY_TREASURY_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TREASURY_ASSET";
//   const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.PUBLIC_SALE_ASSET";
//   const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.VALIDATORS_REWARDS_ASSET";
//   const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.CROWD_FOUNDING_ASSET";
//   const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME = "ROLE.VERSE_ASSETS.LIVELY_ERC20_TOKEN.TAX_TREASURY_ASSET";
//
//   let aclDomainVerseAssetsId: string;
//   let aclRealmLivelyErc20TokenId: string;
//   let aclTypeVerseAssetsId: string;
//   let aclRoleVerseAssetsAdminId: string;
//   let aclTypeLivelyErc20TokenId: string;
//   let aclRoleLivelyErc20TokenAdminId: string;
//   let aclTypeLivelyErc20TokenAssetManagerId: string;
//   let aclRoleLivelyErc20TokenAssetManagerAdminId: string;
//   let aclRoleLivelyAudioVideoProgramAssetId: string;
//   let aclRoleLivelyFoundingTeamAssetId: string;
//   let aclRoleLivelyTreasuryAssetId: string;
//   let aclRoleLivelyPublicSaleAssetId: string;
//   let aclRoleLivelyValidatorRewardsAssetId: string;
//   let aclRoleLivelyCrowdFoundingAssetId: string;
//   let aclRoleLivelyTaxTreasuryAssetId: string;
//   const tokenDecimal = BigNumber.from(10).pow(18);
//   const assetAudioVideoProgramBalance = BigNumber.from(500_000_000).mul(tokenDecimal);
//   const assetFoundingTeamBalance = BigNumber.from(900_000_000).mul(tokenDecimal);
//   const assetTreasuryBalance = BigNumber.from(750_000_000).mul(tokenDecimal);
//   const assetPublicSaleBalance = BigNumber.from(2_000_000_000).mul(tokenDecimal);
//   const assetValidatorsRewardsBalance = BigNumber.from(300_000_000).mul(tokenDecimal);
//   const assetCrowdFoundingBalance = BigNumber.from(550_000_000).mul(tokenDecimal);
//
//   const LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
//   const LIVELY_FOUNDING_TEAM_ASSET_NAME = "LIVELY_FOUNDING_TEAM_ASSET";
//   const LIVELY_TREASURY_ASSET_NAME = "LIVELY_TREASURY_ASSET";
//   const LIVELY_PUBLIC_SALE_ASSET_NAME = "LIVELY_PUBLIC_SALE_ASSET";
//   const LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "LIVELY_VALIDATORS_REWARDS_ASSET";
//   const LIVELY_CROWD_FOUNDING_ASSET_NAME = "LIVELY_CROWD_FOUNDING_ASSET";
//   const LIVELY_TAX_TREASURY_ASSET_NAME = "LIVELY_TAX_TREASURY_ASSET";
//   const ASSET_MANAGER_ERC20_NAME = "AssetManagerERC20";
//   const assetManagerERC20Version = "3.0.0";
//
//
//
//
//
//   // let daoExecutorForwarder: Relay;
//   // const livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";
//   // const livelyTokenDomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenName));
//   // const livelyTokenDomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenVersion));
//   // const livelyTokenDomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainRealm));
//   // const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";
//   // const livelyAssetERC20DomainVersion = "1.0.0";
//   // const assetManagerERC20DomainRealmHash = ethers.utils.keccak256(
//   //   ethers.utils.toUtf8Bytes(assetManagerERC20DomainRealm)
//   // );
//
//   let lTokenERC20: LTokenERC20;
//   let livelyTokenLibraryAddresses: LivelyTokenLibraryAddresses;
//   let livelyTokenSubject: LivelyToken;
//   let livelyTokenProxy: LivelyToken;
//   let networkChainId: BigNumber;
//   const user1LockIds: string[] = [];
//   const user2LockIds: string[] = [];
//   const taxValue = BigNumber.from(300);
//
//   const dummyAmount = BigNumber.from(10000).mul(tokenDecimal);
//   const livelyTokenName = "LivelyToken";
//   const livelyTokenVersion = "1.0.0";
//   const livelyTokenTotalSupply = BigNumber.from("5000000000").mul(tokenDecimal);
//
//   this.beforeAll(async () => {
//     [
//       systemAdmin,
//       livelyAdmin,
//       assetAdmin,
//       crowdFoundingManager,
//       validatorsRewardsManager,
//       publicSaleManager,
//       treasuryManager,
//       foundingTeamManager,
//       audioVideoProgramManager,
//       taxTreasuryManager,
//       user1,
//       user2,
//     ] = await ethers.getSigners();
//     [
//       systemAdminWallet,
//       livelyAdminWallet,
//       assetAdminWallet,
//       crowdFoundingManagerWallet,
//       validatorsRewardsManagerWallet,
//       publicSaleManagerWallet,
//       treasuryManagerWallet,
//       foundingTeamManagerWallet,
//       audioVideoProgramManagerWallet,
//       taxTreasuryManager,
//       user1Wallet,
//       user2Wallet,
//     ] = waffle.provider.getWallets();
//     adminAddress = await livelyAdmin.getAddress();
//     systemAdminAddress = await systemAdmin.getAddress();
//     user1Address = await user1.getAddress();
//     user2Address = await user2.getAddress();
//     assetAdminAddress = await assetAdmin.getAddress();
//     crowdFoundingManagerAddress = await crowdFoundingManager.getAddress();
//     validatorsRewardsManagerAddress = await validatorsRewardsManager.getAddress();
//     publicSaleManagerAddress = await publicSaleManager.getAddress();
//     treasuryManagerAddress = await treasuryManager.getAddress();
//     foundingTeamManagerAddress = await foundingTeamManager.getAddress();
//     audioVideoProgramManagerAddress = await audioVideoProgramManager.getAddress();
//     aclRoleLivelyTaxTreasuryAssetId = await taxTreasuryManager.getAddress();
//     networkChainId = await provider.send("eth_chainId", []);
//
//     aclDomainVerseAssetsId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_VERSE_ASSETS_NAME));
//     aclRealmLivelyErc20TokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_LIVELY_ERC20_TOKEN_NAME));
//     aclTypeVerseAssetsId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_VERSE_ASSETS_NAME));
//     aclRoleVerseAssetsAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_VERSE_ASSETS_ADMIN_NAME));
//     aclTypeLivelyErc20TokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_ERC20_TOKEN_NAME));
//     aclRoleLivelyErc20TokenAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME));
//     aclTypeLivelyErc20TokenAssetManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME));
//     aclRoleLivelyErc20TokenAssetManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME));
//     aclRoleLivelyAudioVideoProgramAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME));
//     aclRoleLivelyFoundingTeamAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME));
//     aclRoleLivelyTreasuryAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TREASURY_ASSET_NAME));
//     aclRoleLivelyPublicSaleAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME));
//     aclRoleLivelyValidatorRewardsAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME));
//     aclRoleLivelyCrowdFoundingAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME));
//     aclRoleLivelyTaxTreasuryAssetId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME));
//
//   });
//
//   describe("ACL Manager Deployments Success", function() {
//     it("Should library and subjects Deployments success", async() => {
//       const aclFactory = new LACLManager__factory(systemAdmin);
//       lACLManager = await aclFactory.deploy();
//       const linkLibraryAddresses = {
//         "src/contracts/lib/acl/LACLManager.sol:LACLManager": lACLManager.address
//       };
//       const aclManagerFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
//       const memberManagerFactory = new MemberManager__factory(systemAdmin);
//       const roleManagerFactory = new RoleManager__factory(systemAdmin);
//       const typeManagerFactory = new TypeManager__factory(systemAdmin);
//       const functionManagerFactory = new FunctionManager__factory(systemAdmin);
//       const contextManagerFactory = new ContextManager__factory(systemAdmin);
//       const realmManagerFactory = new RealmManager__factory(systemAdmin);
//       const domainManagerFactory = new DomainManager__factory(systemAdmin);
//       const globalManagerFactory = new GlobalManager__factory(systemAdmin);
//       const policyManagerFactory = new PolicyManager__factory(systemAdmin);
//       const accessControlFactory = new AccessControl__factory(systemAdmin);
//
//       // when
//       aclManagerSubject = await aclManagerFactory.deploy();
//       memberManagerSubject = await memberManagerFactory.deploy();
//       roleManagerSubject = await roleManagerFactory.deploy();
//       typeManagerSubject = await typeManagerFactory.deploy();
//       functionManagerSubject = await functionManagerFactory.deploy();
//       contextManagerSubject = await contextManagerFactory.deploy();
//       realmManagerSubject = await realmManagerFactory.deploy();
//       domainManagerSubject = await domainManagerFactory.deploy();
//       globalManagerSubject = await globalManagerFactory.deploy();
//       policyManagerSubject = await policyManagerFactory.deploy();
//       accessControlSubject = await accessControlFactory.deploy();
//     })
//
//     it("Should Proxies Deployments success", async() => {
//       // acl manager
//       const aclProxyFactory = new ACLManagerProxy__factory(systemAdmin);
//       const aclIface = new ethers.utils.Interface(ACLManager__factory.abi);
//       const aclData = aclIface.encodeFunctionData("initialize", [
//         ACL_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//       ]);
//       const aclProxy = await aclProxyFactory.deploy(aclManagerSubject.address, aclData);
//       await aclProxy.deployTransaction.wait();
//       aclManagerProxy = aclManagerSubject.attach(aclProxy.address);
//
//       // member manager
//       let proxyFactory = new ACLProxy__factory(systemAdmin);
//       let iface = new ethers.utils.Interface(MemberManager__factory.abi);
//       let data = iface.encodeFunctionData("initialize", [
//         MEMBER_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       let proxy = await proxyFactory.deploy(memberManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       memberManagerProxy = memberManagerSubject.attach(proxy.address);
//
//       // role manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(RoleManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         ROLE_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(roleManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       roleManagerProxy = roleManagerSubject.attach(proxy.address);
//
//       // type manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(TypeManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         TYPE_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(typeManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       typeManagerProxy = typeManagerSubject.attach(proxy.address);
//
//       // function manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(FunctionManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         FUNCTION_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(functionManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       functionManagerProxy = functionManagerSubject.attach(proxy.address);
//
//       // context manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(ContextManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         CONTEXT_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(contextManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       contextManagerProxy = contextManagerSubject.attach(proxy.address);
//
//       // realm manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(RealmManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         REALM_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(realmManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       realmManagerProxy = realmManagerSubject.attach(proxy.address);
//
//
//       // domain manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(DomainManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         DOMAIN_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(domainManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       domainManagerProxy = domainManagerSubject.attach(proxy.address);
//
//       // global manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(GlobalManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         GLOBAL_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(globalManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       globalManagerProxy = globalManagerSubject.attach(proxy.address);
//
//       // policy manager
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(PolicyManager__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         POLICY_MANAGER_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(policyManagerSubject.address, data);
//       await proxy.deployTransaction.wait();
//       policyManagerProxy = policyManagerSubject.attach(proxy.address);
//
//       // access control
//       proxyFactory = new ACLProxy__factory(systemAdmin);
//       iface = new ethers.utils.Interface(AccessControl__factory.abi);
//       data = iface.encodeFunctionData("initialize", [
//         ACCESS_CONTROL_CONTRACT_NAME,
//         CONTRACTS_VERSION,
//         aclManagerProxy.address,
//       ]);
//       proxy = await proxyFactory.deploy(accessControlSubject.address, data);
//       await proxy.deployTransaction.wait();
//       accessControlProxy = accessControlSubject.attach(proxy.address);
//
//       // Init ACL
//       await aclManagerProxy.connect(systemAdmin).initACL(
//         contextManagerProxy.address,
//         functionManagerProxy.address,
//         livelyAdminWallet.address,
//         systemAdminWallet.address
//       );
//     })
//
//     it("Should facets register to ACLManager by systemAdmin success", async() => {
//
//       // given
//       const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
//       const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
//       const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
//       const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
//       const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
//       const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
//       const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
//       const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
//       const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
//       const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
//       const facetRequests: IACLManager.FacetRegisterRequestStruct[] = [
//         {
//           facetId: memberManagerProxy.address,
//           interfaceId: "0xf357de59",
//           subjectId: memberManagerSubject.address,
//           selectors: [
//             memberIface.getSighash("memberRegister"),
//             memberIface.getSighash("memberUpdateActivityStatus"),
//             memberIface.getSighash("memberUpdateAlterabilityStatus"),
//             memberIface.getSighash("memberUpdateAdmin"),
//             memberIface.getSighash("memberUpdateTypeLimit"),
//             memberIface.getSighash("memberUpdateFactoryLimit"),
//             memberIface.getSighash("memberCheckId"),
//             memberIface.getSighash("memberCheckAccount"),
//             memberIface.getSighash("memberCheckAdmin"),
//             memberIface.getSighash("memberHasType"),
//             memberIface.getSighash("memberGetTypes"),
//             memberIface.getSighash("memberGetInfo"),
//           ]
//         },
//         {
//           facetId: roleManagerProxy.address,
//           interfaceId: "0x0a0c4696",
//           subjectId: roleManagerSubject.address,
//           selectors: [
//             roleIface.getSighash("roleRegister"),
//             roleIface.getSighash("roleGrantMembers"),
//             roleIface.getSighash("roleRevokeMembers"),
//             roleIface.getSighash("roleUpdateAdmin"),
//             roleIface.getSighash("roleUpdateActivityStatus"),
//             roleIface.getSighash("roleUpdateAlterabilityStatus"),
//             roleIface.getSighash("roleUpdateMemberLimit"),
//             roleIface.getSighash("roleCheckId"),
//             roleIface.getSighash("roleCheckName"),
//             roleIface.getSighash("roleCheckAdmin"),
//             roleIface.getSighash("roleHasAccount"),
//             roleIface.getSighash("roleGetInfo"),
//           ]
//         },
//         {
//           facetId: typeManagerProxy.address,
//           interfaceId: "0x716ce960",
//           subjectId: typeManagerSubject.address,
//           selectors: [
//             typeIface.getSighash("typeRegister"),
//             typeIface.getSighash("typeUpdateAdmin"),
//             typeIface.getSighash("typeUpdateActivityStatus"),
//             typeIface.getSighash("typeUpdateAlterabilityStatus"),
//             typeIface.getSighash("typeUpdateRoleLimit"),
//             typeIface.getSighash("typeCheckId"),
//             typeIface.getSighash("typeCheckName"),
//             typeIface.getSighash("typeCheckAdmin"),
//             typeIface.getSighash("typeHasAccount"),
//             typeIface.getSighash("typeHasRole"),
//             typeIface.getSighash("typeGetRoles"),
//             typeIface.getSighash("typeGetInfo"),
//           ]
//         },
//         {
//           facetId: policyManagerProxy.address,
//           interfaceId: "0x8e0fb371",
//           subjectId: policyManagerSubject.address,
//           selectors: [
//             policyIface.getSighash("policyRegister"),
//             policyIface.getSighash("policyAddRoles"),
//             policyIface.getSighash("policyRemoveRoles"),
//             policyIface.getSighash("policyUpdateCodes"),
//             policyIface.getSighash("policyUpdateAdmin"),
//             policyIface.getSighash("policyUpdateActivityStatus"),
//             policyIface.getSighash("policyUpdateAlterabilityStatus"),
//             policyIface.getSighash("policyUpdateRoleLimit"),
//             policyIface.getSighash("policyCheckId"),
//             policyIface.getSighash("policyCheckName"),
//             policyIface.getSighash("policyCheckAdmin"),
//             policyIface.getSighash("policyCheckRole"),
//             policyIface.getSighash("policyCheckAccess"),
//             policyIface.getSighash("policyCheckRoleAccess"),
//             policyIface.getSighash("policyHasRole"),
//             policyIface.getSighash("policyGetInfoByRole"),
//             policyIface.getSighash("policyGetInfo"),
//             policyIface.getSighash("policyGetRoles"),
//           ]
//         },
//         {
//           facetId: functionManagerProxy.address,
//           interfaceId: "0x4c213822",
//           subjectId: functionManagerSubject.address,
//           selectors: [
//             functionIface.getSighash("functionRegister"),
//             functionIface.getSighash("functionUpdateAdmin"),
//             functionIface.getSighash("functionUpdateAgent"),
//             functionIface.getSighash("functionUpdateActivityStatus"),
//             functionIface.getSighash("functionUpdateAlterabilityStatus"),
//             functionIface.getSighash("functionUpdatePolicyCode"),
//             functionIface.getSighash("functionUpdateAgentLimit"),
//             functionIface.getSighash("functionCheckId"),
//             functionIface.getSighash("functionCheckSelector"),
//             functionIface.getSighash("functionCheckAdmin"),
//             functionIface.getSighash("functionCheckAgent"),
//             functionIface.getSighash("functionGetInfo"),
//           ]
//         },
//         {
//           facetId: contextManagerProxy.address,
//           interfaceId: "0xfcd89410",
//           subjectId: contextManagerSubject.address,
//           selectors: [
//             contextIface.getSighash("contextRegister"),
//             contextIface.getSighash("contextUpdateActivityStatus"),
//             contextIface.getSighash("contextUpdateAlterabilityStatus"),
//             contextIface.getSighash("contextUpdateAdmin"),
//             contextIface.getSighash("contextUpdateFunctionLimit"),
//             contextIface.getSighash("contextUpdateAgentLimit"),
//             contextIface.getSighash("contextCheckId"),
//             contextIface.getSighash("contextCheckAccount"),
//             contextIface.getSighash("contextCheckAdmin"),
//             contextIface.getSighash("contextHasFunction"),
//             contextIface.getSighash("contextHasSelector"),
//             contextIface.getSighash("contextGetFunctions"),
//             contextIface.getSighash("contextGetInfo"),
//           ]
//         },
//         {
//           facetId: realmManagerProxy.address,
//           interfaceId: "0x015c60c8",
//           subjectId: realmManagerSubject.address,
//           selectors: [
//             realmIface.getSighash("realmRegister"),
//             realmIface.getSighash("realmUpdateAdmin"),
//             realmIface.getSighash("realmUpdateActivityStatus"),
//             realmIface.getSighash("realmUpdateAlterabilityStatus"),
//             realmIface.getSighash("realmUpdateContextLimit"),
//             realmIface.getSighash("realmUpdateAgentLimit"),
//             realmIface.getSighash("realmCheckId"),
//             realmIface.getSighash("realmCheckName"),
//             realmIface.getSighash("realmCheckAdmin"),
//             realmIface.getSighash("realmHasFunction"),
//             realmIface.getSighash("realmHasContext"),
//             realmIface.getSighash("realmGetContexts"),
//             realmIface.getSighash("realmGetInfo"),
//           ]
//         },
//         {
//           facetId: domainManagerProxy.address,
//           interfaceId: "0x4227a2ac",
//           subjectId: domainManagerSubject.address,
//           selectors: [
//             domainIface.getSighash("domainRegister"),
//             domainIface.getSighash("domainUpdateActivityStatus"),
//             domainIface.getSighash("domainUpdateAlterabilityStatus"),
//             domainIface.getSighash("domainUpdateAdmin"),
//             domainIface.getSighash("domainUpdateRealmLimit"),
//             domainIface.getSighash("domainUpdateAgentLimit"),
//             domainIface.getSighash("domainCheckId"),
//             domainIface.getSighash("domainCheckName"),
//             domainIface.getSighash("domainCheckAdmin"),
//             domainIface.getSighash("domainHasFunction"),
//             domainIface.getSighash("domainHasContext"),
//             domainIface.getSighash("domainHasRealm"),
//             domainIface.getSighash("domainGetRealms"),
//             domainIface.getSighash("domainGetInfo"),
//           ]
//         },
//         {
//           facetId: globalManagerProxy.address,
//           interfaceId: "0xa301c1f2",
//           subjectId: globalManagerSubject.address,
//           selectors: [
//             // globalIface.getSighash("globalUpdateActivityStatus"),
//             globalIface.getSighash("globalUpdateAlterabilityStatus"),
//             globalIface.getSighash("globalUpdateAdmin"),
//             globalIface.getSighash("globalUpdateDomainLimit"),
//             globalIface.getSighash("globalUpdateAgentLimit"),
//             globalIface.getSighash("globalCheckAdmin"),
//             globalIface.getSighash("globalGetDomains"),
//             globalIface.getSighash("globalGetInfo"),
//           ]
//         },
//         {
//           facetId: accessControlProxy.address,
//           interfaceId: "0x7a327937",
//           subjectId: accessControlSubject.address,
//           selectors: [
//             accessControlIface.getSighash("hasAccess"),
//             accessControlIface.getSighash("hasMemberAccess"),
//             accessControlIface.getSighash("hasCSAccess"),
//             accessControlIface.getSighash("hasAccountAccess"),
//             accessControlIface.getSighash("hasAccessToAgent"),
//             accessControlIface.getSighash("hasMemberAccessToAgent"),
//             accessControlIface.getSighash("hasCSAccessToAgent"),
//             accessControlIface.getSighash("hasAccountAccessToAgent"),
//             accessControlIface.getSighash("getAnonymousType"),
//             accessControlIface.getSighash("getAnyType"),
//             accessControlIface.getSighash("getScopeMasterType"),
//             accessControlIface.getSighash("getAgentMasterType"),
//             accessControlIface.getSighash("getSystemMasterType"),
//             accessControlIface.getSighash("getLivelyMasterType"),
//             accessControlIface.getSighash("getPolicyMasterType"),
//             accessControlIface.getSighash("getGlobalScope"),
//             accessControlIface.getSighash("getLivelyMasterAdminRole"),
//             accessControlIface.getSighash("getScopeMasterAdminRole"),
//             accessControlIface.getSighash("getAgentMasterAdminRole"),
//             accessControlIface.getSighash("getSystemMasterAdminRole"),
//             accessControlIface.getSighash("getPolicyMasterAdminRole"),
//             accessControlIface.getSighash("isAgentExist"),
//             accessControlIface.getSighash("isScopeExist"),
//             accessControlIface.getSighash("getScopeBaseInfo"),
//             accessControlIface.getSighash("getAgentBaseInfo"),
//             accessControlIface.getSighash("isScopesCompatible"),
//           ]
//         }
//       ]
//
//       await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests));
//     })
//
//     it("Should register ACL contexts by systemAdmin success", async() => {
//       // given
//       const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
//       const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
//       const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
//       const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
//       const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
//       const globalContextId = ethers.utils.keccak256(globalManagerProxy.address);
//       const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
//       const aclManagerContextId = ethers.utils.keccak256(aclManagerProxy.address);
//       const accessControlContextId = ethers.utils.keccak256(accessControlProxy.address);
//       const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: MEMBER_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: memberManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: ROLE_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: roleManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: TYPE_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: typeManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: REALM_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: realmManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: DOMAIN_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: domainManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: GLOBAL_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: globalManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: POLICY_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: policyManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: ACCESS_CONTROL_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: accessControlProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//         {
//           realmId: LIVELY_VERSE_ACL_REALM_ID,
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           salt: ethers.constants.HashZero,
//           name: ACL_MANAGER_CONTRACT_NAME,
//           version: CONTRACTS_VERSION,
//           contractId: aclManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 4294967295,
//           functionLimit: 65535,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//       ];
//
//       // attach proxies to aclManager
//       functionManagerDelegateProxy = functionManagerProxy.attach(aclManagerProxy.address);
//       contextManagerDelegateProxy = contextManagerProxy.attach(aclManagerProxy.address);
//       realmManagerDelegateProxy = realmManagerProxy.attach(aclManagerProxy.address);
//       domainManagerDelegateProxy = domainManagerProxy.attach(aclManagerProxy.address);
//       globalManagerDelegateProxy = globalManagerProxy.attach(aclManagerProxy.address);
//       policyManagerDelegateProxy = policyManagerProxy.attach(aclManagerProxy.address);
//       accessControlDelegateProxy = accessControlProxy.attach(aclManagerProxy.address);
//       memberManagerDelegateProxy = memberManagerProxy.attach(aclManagerProxy.address);
//       roleManagerDelegateProxy = roleManagerProxy.attach(aclManagerProxy.address);
//       typeManagerDelegateProxy = typeManagerProxy.attach(aclManagerProxy.address);
//
//       // when
//       await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
//     })
//
//     it("Should register MemberManger functions by systemAdmin success", async() => {
//       // given
//       const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
//       const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
//       const memberRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
//       const memberUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberUpdateActivityStatus")]));
//       const memberUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberUpdateAlterabilityStatus")]))
//       const memberUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberUpdateAdmin")]))
//       const memberUpdateTypeLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberUpdateTypeLimit")]))
//       const memberUpdateFactoryLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("memberUpdateFactoryLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [memberManagerProxy.address,  memberIface.getSighash("withdrawBalance")]))
//
//       const memberFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: memberManagerProxy.address,
//       }
//       const memberFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: memberIface.getSighash("memberRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector:  memberIface.getSighash("memberUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector:  memberIface.getSighash("memberUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector:  memberIface.getSighash("memberUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector:  memberIface.getSighash("memberUpdateTypeLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector:  memberIface.getSighash("memberUpdateFactoryLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: memberIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: memberIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: memberIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: memberIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: memberIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: memberIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberFunctionSignatureRequest, memberFunctionRequests))
//     })
//
//     it("Should register RoleManager functions by systemAdmin success", async() => {
//       const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
//       const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
//       const roleRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleRegister")]));
//       const roleGrantMembersFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleGrantMembers")]));
//       const roleRevokeMembersFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleRevokeMembers")]))
//       const roleUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleUpdateAdmin")]))
//       const roleUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleUpdateActivityStatus")]))
//       const roleUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleUpdateAlterabilityStatus")]))
//       const roleUpdateMemberLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("roleUpdateMemberLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [roleManagerProxy.address,  roleIface.getSighash("withdrawBalance")]))
//
//       const roleFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: roleManagerProxy.address,
//       }
//
//       const roleFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleGrantMembers"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleRevokeMembers"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: roleIface.getSighash("roleUpdateMemberLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: roleIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: roleIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: roleIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: roleIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: roleIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: roleIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionSignatureRequest, roleFunctionRequests))
//     })
//
//     it("Should register TypeManager functions by systemAdmin success", async() => {
//       const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
//       const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
//       const typeRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("typeRegister")]));
//       const typeUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("typeUpdateAdmin")]));
//       const typeUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("typeUpdateActivityStatus")]))
//       const typeUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("typeUpdateAlterabilityStatus")]))
//       const typeUpdateRoleLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("typeUpdateRoleLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [typeManagerProxy.address,  typeIface.getSighash("withdrawBalance")]))
//
//       const typeFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: typeManagerProxy.address,
//       }
//       const typeFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_AGENT_MASTER_TYPE_ID,
//           selector: typeIface.getSighash("typeRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: typeIface.getSighash("typeUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: typeIface.getSighash("typeUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: typeIface.getSighash("typeUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: typeIface.getSighash("typeUpdateRoleLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: typeIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: typeIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: typeIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: typeIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: typeIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: typeIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(typeFunctionSignatureRequest, typeFunctionRequests))
//     })
//
//     it("Should register FunctionManager functions by systemAdmin success", async() => {
//       const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
//       const functionContextId = ethers.utils.keccak256(functionManagerProxy.address);
//       const functionUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAdmin")]));
//       const functionUpdateAgentFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAgent")]));
//       const functionUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdateActivityStatus")]))
//       const functionUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAlterabilityStatus")]))
//       const functionUpdatePolicyFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdatePolicyCode")]))
//       const functionUpdateAgentLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("functionUpdateAgentLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [functionManagerProxy.address,  functionIface.getSighash("withdrawBalance")]))
//
//       const functionFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: functionManagerProxy.address,
//       }
//       const functionFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdateAgent"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdatePolicyCode"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: functionIface.getSighash("functionUpdateAgentLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: functionIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: functionIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: functionIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: functionIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: functionIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: functionIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(functionFunctionSignatureRequest, functionFunctionRequests))
//     })
//
//     it("Should register ContextManager functions by systemAdmin success", async() => {
//       const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
//       const contextContextId = ethers.utils.keccak256(contextManagerProxy.address);
//       const contextUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("contextUpdateActivityStatus")]));
//       const contextUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAlterabilityStatus")]));
//       const contextUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAdmin")]))
//       const contextUpdateFunctionLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("contextUpdateFunctionLimit")]))
//       const contextUpdateAgentLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("contextUpdateAgentLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [contextManagerProxy.address,  contextIface.getSighash("withdrawBalance")]))
//
//       const contextFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: contextManagerProxy.address,
//       }
//       const contextFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: contextIface.getSighash("contextUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: contextIface.getSighash("contextUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: contextIface.getSighash("contextUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: contextIface.getSighash("contextUpdateFunctionLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: contextIface.getSighash("contextUpdateAgentLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: contextIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: contextIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: contextIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: contextIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: contextIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: contextIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(contextFunctionSignatureRequest, contextFunctionRequests))
//     })
//
//     it("Should register RealmManager functions by systemAdmin success", async() => {
//       const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
//       const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
//       const realmRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmRegister")]));
//       const realmUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAdmin")]));
//       const realmUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmUpdateActivityStatus")]))
//       const realmUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAlterabilityStatus")]))
//       const realmUpdateContextLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmUpdateContextLimit")]))
//       const realmUpdateAgentLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("realmUpdateAgentLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [realmManagerProxy.address,  realmIface.getSighash("withdrawBalance")]))
//
//       const realmFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: realmManagerProxy.address,
//       }
//       const realmFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
//           selector: realmIface.getSighash("realmRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: realmIface.getSighash("realmUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: realmIface.getSighash("realmUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: realmIface.getSighash("realmUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: realmIface.getSighash("realmUpdateContextLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: realmIface.getSighash("realmUpdateAgentLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: realmIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: realmIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: realmIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: realmIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: realmIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: realmIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(realmFunctionSignatureRequest, realmFunctionRequests))
//
//     })
//
//     it("Should register DomainManager functions by systemAdmin success", async() => {
//       const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
//       const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
//       const domainRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainRegister")]));
//       const domainUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainUpdateActivityStatus")]));
//       const domainUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAlterabilityStatus")]))
//       const domainUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAdmin")]))
//       const domainUpdateRealmLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainUpdateRealmLimit")]))
//       const domainUpdateAgentLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("domainUpdateAgentLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [domainManagerProxy.address,  domainIface.getSighash("withdrawBalance")]))
//
//       const domainFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: domainManagerProxy.address,
//       }
//       const domainFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
//           selector: domainIface.getSighash("domainRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: domainIface.getSighash("domainUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: domainIface.getSighash("domainUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: domainIface.getSighash("domainUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: domainIface.getSighash("domainUpdateRealmLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: domainIface.getSighash("domainUpdateAgentLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: domainIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: domainIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: domainIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: domainIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: domainIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: domainIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(domainFunctionSignatureRequest, domainFunctionRequests))
//     })
//
//     it("Should register GlobalManager functions by systemAdmin success", async() => {
//       const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
//       const globalContextId = ethers.utils.keccak256(globalManagerProxy.address);
//       const globalUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("globalUpdateActivityStatus")]));
//       const globalUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAlterabilityStatus")]));
//       const globalUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAdmin")]))
//       const globalUpdateDomainLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("globalUpdateDomainLimit")]))
//       const globalUpdateAgentLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("globalUpdateAgentLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [globalManagerProxy.address,  globalIface.getSighash("withdrawBalance")]))
//
//       const globalFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: globalManagerProxy.address,
//       }
//
//       const globalFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("globalUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("globalUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("globalUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("globalUpdateDomainLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("globalUpdateAgentLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: globalIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: globalIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: globalIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
//           selector: globalIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(globalFunctionSignatureRequest, globalFunctionRequests))
//     })
//
//     it("Should register ACLManager functions by systemAdmin success", async() => {
//       const aclManagerIface = new ethers.utils.Interface(ACLManager__factory.abi);
//       const aclContextId = ethers.utils.keccak256(aclManagerProxy.address);
//       const aclRegisterFacetFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("aclRegisterFacet")]));
//       const aclUpgradeFacetFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("aclUpgradeFacet")]));
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [aclManagerProxy.address,  aclManagerIface.getSighash("withdrawBalance")]))
//       const aclFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: aclManagerProxy.address,
//       }
//       const aclManagerFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("aclRegisterFacet"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("aclUpgradeFacet"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           selector: aclManagerIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: aclManagerIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(aclFunctionSignatureRequest, aclManagerFunctionRequests))
//     })
//
//     it("Should register AccessControl functions by systemAdmin success", async() => {
//       const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
//       const accessControlContextId = ethers.utils.keccak256(accessControlProxy.address);
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [accessControlProxy.address,  accessControlIface.getSighash("withdrawBalance")]))
//
//       const accessControlFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: accessControlProxy.address,
//       }
//       const accessControlFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: accessControlIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: accessControlIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: accessControlIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: accessControlIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: accessControlIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: accessControlIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(accessControlFunctionSignatureRequest, accessControlFunctionRequests))
//     })
//
//     it("Should register PolicyManager functions by systemAdmin success", async() => {
//       const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
//       const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
//       const policyRegisterFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyRegister")]));
//       const policyAddRolesFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyAddRoles")]));
//       const policyRemoveRolesFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyRemoveRoles")]))
//       const policyUpdateCodesFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyUpdateCodes")]))
//       const policyUpdateAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyUpdateAdmin")]))
//       const policyUpdateActivityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyUpdateActivityStatus")]))
//       const policyUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyUpdateAlterabilityStatus")]))
//       const policyUpdatesRoleLimitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("policyUpdateRoleLimit")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [policyManagerProxy.address,  policyIface.getSighash("withdrawBalance")]))
//
//       const policyFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: policyManagerProxy.address,
//       }
//       const policyFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
//           selector: policyIface.getSighash("policyRegister"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyAddRoles"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyRemoveRoles"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyUpdateCodes"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyUpdateAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyUpdateActivityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyUpdateAlterabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_TYPE_ID,
//           agentId: LIVELY_VERSE_ANY_TYPE_ID,
//           selector: policyIface.getSighash("policyUpdateRoleLimit"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: policyIface.getSighash("upgradeTo"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: policyIface.getSighash("setSafeModeStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: policyIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: policyIface.getSighash("setLocalAdmin"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: policyIface.getSighash("setAccessControlManager"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           agentId: LIVELY_VERSE_ACL_TYPE_ID,
//           selector: policyIface.getSighash("withdrawBalance"),
//           agentLimit: 4294967295,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(policyFunctionSignatureRequest, policyFunctionRequests))
//     })
//   })
//
//   describe("Setup ACL Manager for Lively Token and Asset Manager ", function() {
//     it("Should register ACL_DOMAIN_VERSE_ASSETS_NAME domain success", async() => {
//       // given
//       const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           realmLimit: 16,
//           agentLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.DISABLED,
//           name: ACL_DOMAIN_VERSE_ASSETS_NAME
//         }
//       ]
//
//       // when
//       await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(requests)).
//       to.emit(domainManagerDelegateProxy, "DomainRegistered")
//         .withArgs(livelyAdminWallet.address, aclDomainVerseAssetsId ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
//     })
//
//     it("Should register ACL_REALM_LIVELY_ERC20_TOKEN_NAME Realm in ACL_DOMAIN_VERSE_ASSETS_NAME Domain success", async() => {
//       // given
//       const requests: IRealmManagement.RealmRegisterRequestStruct[] = [
//         {
//           domainId: aclDomainVerseAssetsId,
//           adminId: aclTypeVerseAssetsId,
//           contextLimit: 16,
//           agentLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.DISABLED,
//           name: ACL_DOMAIN_VERSE_ASSETS_NAME
//         }
//       ]
//
//       // when
//       await expect(realmManagerDelegateProxy.connect(systemAdmin).realmRegister(requests)).
//       to.emit(realmManagerDelegateProxy, "RealmRegistered")
//         .withArgs(systemAdminWallet.address, aclRealmLivelyErc20TokenId , aclDomainVerseAssetsId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
//     })
//
//     it("Should register ACL types success", async() => {
//       // given
//       const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           scopeId: aclDomainVerseAssetsId,
//           roleLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.DISABLED,
//           name: ACL_TYPE_VERSE_ASSETS_NAME,
//         },
//         {
//           adminId: aclTypeVerseAssetsId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           roleLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.DISABLED,
//           name: ACL_TYPE_LIVELY_ERC20_TOKEN_NAME,
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           roleLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.DISABLED,
//           name: ACL_TYPE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_NAME,
//         },
//       ]
//
//       // when
//       await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(typeRegisterRequests))
//         .to.emit(typeManagerDelegateProxy, "TypeRegistered")
//         .withArgs(livelyAdminWallet.address, aclTypeVerseAssetsId, aclDomainVerseAssetsId,
//           LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
//         .to.emit(typeManagerDelegateProxy, "TypeRegistered")
//         .withArgs(livelyAdminWallet.address, aclTypeLivelyErc20TokenId, aclRealmLivelyErc20TokenId,
//           aclTypeVerseAssetsId)
//         .to.emit(typeManagerDelegateProxy, "TypeRegistered")
//         .withArgs(livelyAdminWallet.address, aclTypeLivelyErc20TokenAssetManagerId, aclRealmLivelyErc20TokenId,
//           aclTypeVerseAssetsId)
//     })
//
//     it("Should register ACL Roles success", async() => {
//       // given
//       const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
//         {
//           adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
//           scopeId: aclDomainVerseAssetsId,
//           typeId: aclTypeVerseAssetsId,
//           memberLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_VERSE_ASSETS_ADMIN_NAME
//         },
//         {
//           adminId: aclRoleVerseAssetsAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenId,
//           memberLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN_NAME
//         },
//         {
//           adminId: aclRoleVerseAssetsAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 16,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_ERC20_TOKEN_ASSET_MANAGER_ADMIN_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           scopeId: aclRealmLivelyErc20TokenId,
//           typeId: aclTypeLivelyErc20TokenAssetManagerId,
//           memberLimit: 2,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE,
//           name: ACL_ROLE_LIVELY_TREASURY_ASSET_NAME
//         },
//       ]
//
//       // when
//       await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(roleRegisterRequests)).
//       to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleVerseAssetsAdminId, aclTypeVerseAssetsId,
//           LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, aclDomainVerseAssetsId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAdminId, aclTypeLivelyErc20TokenId,
//           aclRoleVerseAssetsAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetManagerAdminId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleVerseAssetsAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleRegistered")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetId, aclTypeLivelyErc20TokenAssetManagerId,
//           aclRoleLivelyErc20TokenAssetManagerAdminId, aclRealmLivelyErc20TokenId)
//     })
//
//     it("Should register AssetAdmin member to ACL_ROLE_VERSE_ASSETS_ADMIN_NAME success", async() => {
//       // given
//       const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
//       const requests: IMemberManagement.MemberRegisterStruct[] = [
//         {
//           roleId: aclRoleVerseAssetsAdminId,
//           account: assetAdminWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         }
//       ]
//
//       // when
//       await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(requests))
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(livelyAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleVerseAssetsAdminId)
//     })
//
//     it("Should updateAdmin ACL_DOMAIN_VERSE_ASSETS to ACL_TYPE_VERSE_ASSETS success", async() => {
//       // given
//       const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
//         id: aclDomainVerseAssetsId,
//         adminId: aclTypeVerseAssetsId
//       }]
//
//       // when
//       await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(updateAdminRequests))
//         .to.emit(domainManagerDelegateProxy, "DomainAdminUpdated")
//         .withArgs(livelyAdminWallet.address, aclDomainVerseAssetsId, aclTypeVerseAssetsId);
//     })
//
//     it("Should updateAdmin ACL_REALM_LIVELY_ERC20_TOKEN to ACL_ROLE_LIVELY_ERC20_TOKEN_ADMIN success", async() => {
//       // given
//       const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
//         id: aclRealmLivelyErc20TokenId,
//         adminId: aclRoleLivelyErc20TokenAdminId
//       }]
//
//       // when
//       await expect(realmManagerDelegateProxy.connect(assetAdmin).realmUpdateAdmin(updateAdminRequests))
//         .to.emit(realmManagerDelegateProxy, "RealmAdminUpdated")
//         .withArgs(assetAdminWallet.address, aclTypeLivelyErc20TokenId, aclRoleLivelyErc20TokenAdminId);
//     })
//
//     it("Should registers members to related roles success", async() => {
//       // given
//       const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
//       const requests: IMemberManagement.MemberRegisterStruct[] = [
//         {
//           roleId: aclRoleLivelyErc20TokenAdminId,
//           account: assetAdminWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyAudioVideoProgramAssetId,
//           account: audioVideoProgramManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyPublicSaleAssetId,
//           account: publicSaleManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyTreasuryAssetId,
//           account: treasuryManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyValidatorRewardsAssetId,
//           account: validatorsRewardsManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyCrowdFoundingAssetId,
//           account: crowdFoundingManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyFoundingTeamAssetId,
//           account: foundingTeamManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyTaxTreasuryAssetId,
//           account: taxTreasuryManagerWallet.address,
//           typeLimit: 32,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleLivelyErc20TokenAdminId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, audioVideoProgramManagerWallet.address, aclRoleLivelyAudioVideoProgramAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, publicSaleManagerWallet.address, aclRoleLivelyPublicSaleAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, treasuryManagerWallet.address, aclRoleLivelyTreasuryAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, validatorsRewardsManagerWallet.address, aclRoleLivelyValidatorRewardsAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, crowdFoundingManagerWallet.address, aclRoleLivelyCrowdFoundingAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, foundingTeamManagerWallet.address, aclRoleLivelyFoundingTeamAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAdminId, taxTreasuryManagerWallet.address, aclRoleLivelyTaxTreasuryAssetId)
//     })
//
//   })
//
//   describe("Library Deployments Test", function () {
//     it("Should LTokenERC20 deploy success", async () => {
//       // given
//       const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);
//
//       // when
//       lTokenERC20 = await lTokenERC20Factory.deploy();
//
//       // then
//       expect(lTokenERC20.address).not.null;
//       expect(await lTokenERC20.LIB_NAME()).to.be.equal("LTokenERC20");
//       expect(await lTokenERC20.LIB_VERSION()).to.be.equal("3.0.0");
//     });
//   });
//
//   describe("Subject (LivelyToken Implementation) Tests", function () {
//     this.beforeAll(async () => {
//       livelyTokenLibraryAddresses = {
//         "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
//       };
//     });
//
//     it("Should LivelyToken Subject deploy success", async () => {
//       // given
//       const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, systemAdmin);
//
//       // when
//       livelyTokenSubject = await livelyTokenFactory.deploy();
//
//       // then
//       expect(livelyTokenSubject.address).to.be.not.null;
//       expect(await livelyTokenSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
//       expect(await livelyTokenSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
//       expect(await livelyTokenSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
//       expect(await livelyTokenSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
//       expect(await livelyTokenSubject.initVersion()).to.be.equal(0);
//     });
//
//     it("Should initialize of LivelyToken subject failed", async () => {
//       // when and then
//       await expect(
//         livelyTokenSubject.connect(systemAdmin).initialize({
//           contractName: "LivelyToken",
//           contractVersion: "1.0.0",
//           aclManager: aclManagerProxy.address,
//           taxRateValue: BigNumber.from("300"),
//         })
//       ).to.be.revertedWith("Illegal Call");
//     });
//
//     it("Should setSafeModeState of LivelyToken subject failed", async () => {
//       // when and then
//       await expect(livelyTokenSubject.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED)).to.be.revertedWith(
//         "Illegal Contract Call"
//       );
//     });
//
//     it("Should setUpgradeState of LivelyToken subject failed", async () => {
//       // when and then
//       await expect(livelyTokenSubject.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.be.revertedWith(
//         "Illegal Call"
//       );
//     });
//
//     it("Should setLocalAdmin of LivelyToken subject failed", async () => {
//       // when
//       const address = await user1.getAddress();
//
//       // when and then
//       await expect(livelyTokenSubject.connect(systemAdmin).setLocalAdmin(address)).to.be.revertedWith(
//         "Illegal Call"
//       );
//     });
//
//     it("Should setAccessControlManager raise exception", async () => {
//       // given
//       const address = await user1.getAddress();
//
//       // when and then
//       await expect(livelyTokenSubject.connect(systemAdmin).setAccessControlManager(address)).to.be.revertedWith(
//         "Illegal Call"
//       );
//     });
//
//     it("Should upgradeTo of LivelyToken subject failed", async () => {
//       // given
//       const typedArray1 = new Int8Array(0);
//
//       // when and then
//       await expect(
//         livelyTokenSubject.connect(systemAdmin).upgradeTo(livelyTokenSubject.address, typedArray1, false)
//       ).to.be.revertedWith("Illegal Contract Call");
//     });
//
//     it("Should return correct slot storage of LivelyToken subject", async () => {
//       // when and then
//       expect(await livelyTokenSubject.proxiableUUID()).to.be.hexEqual(
//         "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
//       );
//     });
//   });
//
//   describe("LivelyToken (UUPS Proxy) ERC20 Tests", function () {
//     it("Should deploy and initialize LivelyToken proxy success (typechain, two steps)", async () => {
//       // given
//       const proxyFactory = new Proxy__factory(systemAdmin);
//       const networkChainId = await provider.send("eth_chainId", []);
//       const tokenProxy = await proxyFactory.deploy(livelyTokenSubject.address, new Int8Array(0));
//
//       const request: LivelyToken.InitRequestStruct = {
//         contractName: livelyTokenName,
//         contractVersion: livelyTokenVersion,
//         taxRateValue: BigNumber.from(0),
//         aclManager: aclManagerProxy.address,
//       };
//
//       // when
//       livelyToken = livelyTokenSubject.attach(tokenProxy.address);
//       await expect(livelyToken.connect(systemAdmin).initialize(request))
//         .to.emit(livelyToken, "Upgraded")
//         .withArgs(systemAdminAddress, livelyToken.address, livelyTokenSubject.address)
//         .to.emit(livelyToken, "LocalAdminChanged")
//         .withArgs(systemAdminAddress, livelyToken.address, systemAdminAddress)
//         .to.emit(livelyToken, "Initialized")
//         .withArgs(
//           systemAdminAddress,
//           livelyToken.address,
//           livelyTokenSubject.address,
//           livelyTokenName,
//           livelyTokenVersion,
//           1
//         );
//
//       const domainSeparator = generateDomainSeparator(
//         livelyTokenName,
//         livelyTokenVersion,
//         livelyToken.address,
//         networkChainId
//       );
//       // then
//       let proxyInfo: IProxy.ProxyInfoStruct = await livelyToken.proxyInfo();
//       expect(proxyInfo.name).to.be.equal(livelyTokenName);
//       expect(proxyInfo.version).to.be.equal(livelyTokenVersion);
//       expect(proxyInfo.subject).to.be.equal(livelyTokenSubject.address);
//       expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
//       expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
//       expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
//       expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
//       expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
//       expect(proxyInfo.initVersion).to.be.equal(1)
//       expect(await livelyTokenProxy.getLibrary()).to.be.equal(lTokenERC20.address);
//     });
//
//     it("Should register LivelyToken context by systemAdmin success", async() => {
//       // given
//       const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
//       const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
//         {
//           realmId: aclRealmLivelyErc20TokenId,
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           salt: ethers.constants.HashZero,
//           name: livelyTokenName,
//           version: livelyTokenVersion,
//           contractId: livelyToken.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 32,
//           functionLimit: 128,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//       ];
//
//
//       // when
//       await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
//         .to.emit(contextManagerDelegateProxy, "ContextRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, livelyToken.address,
//           aclRealmLivelyErc20TokenId, systemAdminWallet.address, ethers.constants.AddressZero,
//           ethers.constants.AddressZero, aclRoleLivelyErc20TokenAdminId)
//     })
//
//     it("Should register LivelyToken functions by systemAdmin success", async() => {
//       // given
//       const livelyTokenIface = new ethers.utils.Interface(LivelyToken__factory.abi);
//       const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
//       const signer = new Int8Array(0);
//
//       const transferFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("transfer")]));
//       const tokenTransferFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("transferFrom")]));
//       const approveFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("approve")]))
//       const batchTransferFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("batchTransfer")]))
//       const batchTransferFromFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("batchTransferFrom")]))
//       const permitFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("permit")]))
//       const increaseAllowanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("increaseAllowance")]))
//       const decreaseAllowanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("decreaseAllowance")]))
//       const claimTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("claimToken")]))
//
//       const burnFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("burn")]))
//       const mintFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("mint")]))
//       const updateTaxRateFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("updateTaxRate")]))
//       const updateTaxWhitelistFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("updateTaxWhitelist")]))
//       const pauseFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("pause")]))
//       const unpauseFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("unpause")]))
//       const pauseAllFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("pauseAll")]))
//       const unpauseAllFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("unpauseAll")]))
//       const unlockTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("unlockToken")]))
//
//       const lockTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("lockToken")]))
//       const tokensDistributionFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("tokensDistribution")]))
//
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [livelyToken.address,  livelyTokenIface.getSighash("withdrawBalance")]))
//
//
//       const livelyTokenFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: livelyToken.address,
//       }
//       const livelyTokenFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("transfer"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("transferFrom"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("approve"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("batchTransfer"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("batchTransferFrom"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("permit"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("increaseAllowance"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("decreaseAllowance"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_ANONYMOUS_TYPE_ID,
//           selector: livelyTokenIface.getSighash("claimToken"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("burn"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("mint"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("updateTaxRate"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("updateTaxWhitelist"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("pause"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("unpause"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("pauseAll"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("unpauseAll"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("unlockToken"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: livelyTokenIface.getSighash("lockToken"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: livelyTokenIface.getSighash("tokensDistribution"),
//           agentLimit: 128,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: livelyTokenIface.getSighash("upgradeTo"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("setSafeModeStatus"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: livelyTokenIface.getSighash("setLocalAdmin"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: livelyTokenIface.getSighash("setAccessControlManager"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAdminId,
//           agentId: aclRoleLivelyErc20TokenAdminId,
//           selector: livelyTokenIface.getSighash("withdrawBalance"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(livelyTokenFunctionSignatureRequest, livelyTokenFunctionRequests))
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, tokenTransferFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, approveFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFromFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, permitFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, increaseAllowanceFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, decreaseAllowanceFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, claimTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
//           LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, burnFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, mintFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxRateFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxWhitelistFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseAllFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseAllFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, unlockTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, lockTokenFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, tokensDistributionFunctionId,aclRoleLivelyErc20TokenAdminId,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclRoleLivelyErc20TokenAdminId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, livelyTokenContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclRoleLivelyErc20TokenAdminId,signer)
//     })
//
//     it("Should deploy and initialize AssetManagerERC20 proxy success", async () => {
//       // given
//       const proxyFactory = new Proxy__factory(systemAdmin);
//       const assetProxy = await proxyFactory.deploy(assetManagerSubject.address, new Int8Array(0));
//
//       const request: AssetManagerERC20.InitRequestStruct = {
//         contractName: ASSET_MANAGER_ERC20_NAME,
//         contractVersion: assetManagerERC20Version,
//         aclManager: aclManagerProxy.address
//       };
//
//       // when
//       assetManagerProxy = assetManagerSubject.attach(assetProxy.address);
//       assetManagerProxyId = ethers.utils.keccak256(assetManagerProxy.address)
//       await expect(assetManagerProxy.connect(systemAdmin).initialize(request))
//         .to.emit(assetManagerProxy, "Upgraded")
//         .withArgs(systemAdminAddress, assetManagerProxy.address, assetManagerSubject.address)
//         .to.emit(assetManagerProxy, "LocalAdminChanged")
//         .withArgs(systemAdminAddress, assetManagerProxy.address, systemAdminAddress)
//         .to.emit(assetManagerProxy, "Initialized")
//         .withArgs(
//           systemAdminAddress,
//           assetManagerProxy.address,
//           assetManagerSubject.address,
//           ASSET_MANAGER_ERC20_NAME,
//           assetManagerERC20Version,
//           1
//         );
//
//       // then
//       const domainSeparator = generateDomainSeparator(
//         ASSET_MANAGER_ERC20_NAME,
//         assetManagerERC20Version,
//         assetManagerProxy.address,
//         networkChainId
//       );
//
//       let proxyInfo: IProxy.ProxyInfoStruct = await assetManagerProxy.proxyInfo();
//       expect(proxyInfo.name).to.be.equal(ASSET_MANAGER_ERC20_NAME);
//       expect(proxyInfo.version).to.be.equal(assetManagerERC20Version);
//       expect(proxyInfo.subject).to.be.equal(assetManagerProxy.address);
//       expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
//       expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
//       expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
//       expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
//       expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
//       expect(proxyInfo.initVersion).to.be.equal(1)
//     });
//
//     it("Should register AssetManger context by systemAdmin success", async() => {
//       // given
//       const assetMangerContextId = ethers.utils.keccak256(assetManagerProxy.address);
//       const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
//         {
//           realmId: aclRealmLivelyErc20TokenId,
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           salt: ethers.constants.HashZero,
//           name: ASSET_MANAGER_ERC20_NAME,
//           version: assetManagerERC20Version,
//           contractId: assetManagerProxy.address,
//           subject: ethers.constants.AddressZero,
//           deployer: ethers.constants.AddressZero,
//           agentLimit: 32,
//           functionLimit: 128,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPGRADABLE,
//           signature: new Int8Array(0)
//         },
//       ];
//
//
//       // when
//       await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
//         .to.emit(contextManagerDelegateProxy, "ContextRegistered")
//         .withArgs(systemAdminWallet.address, assetMangerContextId, assetManagerProxy.address,
//           aclRealmLivelyErc20TokenId, systemAdminWallet.address, ethers.constants.AddressZero,
//           ethers.constants.AddressZero, aclRoleLivelyErc20TokenAssetManagerAdminId)
//     })
//
//     it("Should register AssetManager functions by systemAdmin success", async() => {
//       // given
//       const assetManagerIface = new ethers.utils.Interface(AssetManagerERC20__factory.abi);
//       const assetContextId = ethers.utils.keccak256(assetManagerProxy.address);
//       const signer = new Int8Array(0);
//       const tokenLockFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenLock")]));
//       const tokenTransferFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenTransfer")]));
//       const tokenBatchTransferFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenBatchTransfer")]))
//       const tokenTransferFromFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenTransferFrom")]))
//       const tokenBatchTransferFromFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenBatchTransferFrom")]))
//       const tokenApproveFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenApprove")]))
//       const tokenIncreaseAllowanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenIncreaseAllowance")]))
//       const tokenDecreaseAllowanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("tokenDecreaseAllowance")]))
//       const createAssetFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("createAsset")]))
//       const removeAssetFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("removeAsset")]))
//       const registerAssetFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("registerAsset")]))
//       const updateTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("updateToken")]))
//       const registerTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("registerToken")]))
//       const setSafeModeTokenFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("setSafeModeToken")]))
//       const upgradeToFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("upgradeTo")]))
//       const setSafeModeStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("setSafeModeStatus")]))
//       const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("setUpdatabilityStatus")]))
//       const setLocalAdminFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("setLocalAdmin")]))
//       const setAccessControlManagerFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("setAccessControlManager")]))
//       const withdrawBalanceFunctionId = ethers.utils.keccak256(
//         ethers.utils.solidityPack(["address", "bytes4"],
//           [assetManagerProxy.address,  assetManagerIface.getSighash("withdrawBalance")]))
//
//       const assetManagerFunctionSignatureRequest: IFunctionManagement.FunctionSignatureRequestStruct = {
//         signature: new Int8Array(0),
//         realmId: new Int8Array(0),
//         salt: new Int8Array(0),
//         name: "",
//         version: "",
//         subject: "",
//         deployer: "",
//         contractId: assetManagerProxy.address,
//       }
//       const assetManagerFunctionRequests: IFunctionManagement.FunctionRegisterRequestStruct[] = [
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenLock"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenTransfer"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenBatchTransfer"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenTransferFrom"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenBatchTransferFrom"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenApprove"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenIncreaseAllowance"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("tokenDecreaseAllowance"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("createAsset"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("registerAsset"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("removeAsset"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("registerToken"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("updateToken"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclTypeLivelyErc20TokenAssetManagerId,
//           selector: assetManagerIface.getSighash("setSafeModeToken"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: assetManagerIface.getSighash("upgradeTo"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           selector: assetManagerIface.getSighash("setSafeModeStatus"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           selector: assetManagerIface.getSighash("setUpdatabilityStatus"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: assetManagerIface.getSighash("setLocalAdmin"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
//           selector: assetManagerIface.getSighash("setAccessControlManager"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           agentId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           selector: assetManagerIface.getSighash("withdrawBalance"),
//           agentLimit: 64,
//           policyCode: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//       ]
//
//       // when
//       await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(assetManagerFunctionSignatureRequest, assetManagerFunctionRequests))
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenLockFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenTransferFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenBatchTransferFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenTransferFromFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenBatchTransferFromFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenApproveFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenIncreaseAllowanceFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, tokenDecreaseAllowanceFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, createAssetFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, removeAssetFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, registerAssetFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, updateTokenFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, registerTokenFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, setSafeModeTokenFunctionId, aclRoleLivelyErc20TokenAssetManagerAdminId,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclTypeLivelyErc20TokenAssetManagerId,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
//         .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
//         .withArgs(systemAdminWallet.address, assetContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
//           aclRoleLivelyErc20TokenAssetManagerAdminId,signer)
//     })
//
//     it("Should deploy assetERC20 by systemAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//
//       // when
//       assetSubjectERC20 = await factory.deploy();
//
//       // then
//       expect(assetSubjectERC20).to.be.not.null;
//
//       // and
//       expect(assetSubjectERC20.address).to.be.not.null;
//       expect(await assetSubjectERC20.assetSafeMode()).to.be.true;
//       expect(await assetSubjectERC20.assetInitVersion()).to.be.equal(0);
//     });
//
//     it("Should register lively token to assetManager by assetAdmin success", async () => {
//       // given
//       const tokenName = await livelyToken.name();
//       const tokenSymbol = await livelyToken.symbol();
//       const signature = await generatePredictContextDomainSignatureManually(
//         assetManagerProxy.address,
//         ACL_REALM_LIVELY_ERC20_TOKEN_NAME,
//         aclManagerProxy.address,
//         systemAdminWallet,
//         networkChainId,
//         assetSubjectERC20.address
//       );
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).registerToken(livelyToken.address, assetSubjectERC20.address, signature))
//         .to.emit(assetManagerProxy, "TokenRegistered")
//         .withArgs(assetAdminAddress, livelyToken.address, assetSubjectERC20.address, tokenName, tokenSymbol);
//
//       // then
//       expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;
//
//       // and
//       const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyToken.address);
//       expect(tokenInfo.status).to.be.equal(TokenSafeModeStatus.DISABLED);
//       expect(tokenInfo.assets).to.be.empty;
//       expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
//       expect(tokenInfo.assetSignature).to.be.equal(signature);
//     });
//
//     it("Should create LIVELY_AUDIO_VIDEO_PROGRAM_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyAudioVideoProgramAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetAudioVideoProgram = await factory.attach(assetId);
//       assetAudioVideoProgramId = ethers.utils.keccak256(assetAudioVideoProgram.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetAudioVideoProgram, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//
//       // and
//       expect(await assetAudioVideoProgram.assetName()).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
//       expect(await assetAudioVideoProgram.assetVersion()).to.be.equal(CONTRACTS_VERSION);
//       expect(await assetAudioVideoProgram.assetInitVersion()).to.be.equal(1);
//       expect(await assetAudioVideoProgram.assetType()).to.be.equal(AssetType.ERC20);
//       expect(await assetAudioVideoProgram.assetAccessControl()).to.be.equal(aclManagerProxy.address);
//       expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyToken.address);
//       expect(await assetAudioVideoProgram.assetSafeMode()).to.be.equal(AssetSafeModeStatus.DISABLED);
//
//       // and
//       const assetInfo: IAssetEntity.AssetInfoStruct = await assetAudioVideoProgram.assetInfo();
//       expect(assetInfo.name).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
//       expect(assetInfo.version).to.be.equal(CONTRACTS_VERSION);
//       expect(assetInfo.initVersion).to.be.equal(1);
//       expect(assetInfo.atype).to.be.equal(AssetType.ERC20);
//       expect(assetInfo.accessControl).to.be.equal(aclManagerProxy.address);
//       expect(assetInfo.token).to.be.equal(livelyToken.address);
//       expect(assetInfo.status).to.be.equal(AssetSafeModeStatus.DISABLED);
//
//     });
//
//     it("Should create LIVELY_FOUNDING_TEAM_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyFoundingTeamAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_FOUNDING_TEAM_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetFoundingTeam = await factory.attach(assetId);
//       assetFoundingTeamId = ethers.utils.keccak256(assetFoundingTeam.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetFoundingTeam, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should create LIVELY_TREASURY_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyTreasuryAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_TREASURY_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetTreasury = await factory.attach(assetId);
//       assetTreasuryId = ethers.utils.keccak256(assetTreasury.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetTreasury, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should create LIVELY_PUBLIC_SALE_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyPublicSaleAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_PUBLIC_SALE_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetPublicSale = await factory.attach(assetId);
//       assetPublicSaleId = ethers.utils.keccak256(assetPublicSale.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetPublicSale, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should create LIVELY_VALIDATORS_REWARDS_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyValidatorRewardsAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_VALIDATOR_REWARDS_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetValidatorsRewards = await factory.attach(assetId);
//       assetValidatorsRewardsId = ethers.utils.keccak256(assetValidatorsRewards.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetValidatorsRewards, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should create LIVELY_CROWD_FOUNDING_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyCrowdFoundingAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_CROWD_FOUNDING_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetCrowdFounding = await factory.attach(assetId);
//       assetCrowdFoundingId = ethers.utils.keccak256(assetCrowdFounding.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetCrowdFounding, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should create LIVELY_TAX_TREASURY_ASSET asset by assetAdmin success", async () => {
//       // given
//       const factory = new AssetERC20__factory(systemAdmin);
//       const saltValue = ethers.utils.keccak256(
//         ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
//       );
//       const assetId = await assetManagerProxy.predictAddress(
//         assetSubjectERC20.address,
//         saltValue,
//         assetManagerProxy.address
//       );
//       const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct = {
//         adminId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//         agentId: aclRoleLivelyTaxTreasuryAssetId,
//         realmId: aclRealmLivelyErc20TokenId,
//         salt: saltValue,
//         assetName: LIVELY_TAX_TREASURY_ASSET_NAME,
//         assetVersion: CONTRACTS_VERSION,
//         tokenId: livelyToken.address,
//       };
//       assetTaxTreasury = await factory.attach(assetId);
//       assetTaxTreasuryId = ethers.utils.keccak256(assetTaxTreasury.address);
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
//         .to.emit(assetManagerProxy, "AssetCreated")
//         .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
//         .to.emit(assetTaxTreasury, "AssetInitialized")
//         .withArgs(
//           assetManagerProxy.address,
//           assetId,
//           livelyToken.address,
//           assetManagerProxy.address,
//           assetSubjectERC20.address
//         );
//     });
//
//     it("Should update assets role scopes to asset itself success", async() => {
//       // given
//       const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
//         {
//           id: aclRoleLivelyAudioVideoProgramAssetId,
//           scopeId: assetAudioVideoProgramId,
//         },
//         {
//           id: aclRoleLivelyPublicSaleAssetId,
//           scopeId: assetPublicSaleId,
//         },
//         {
//           id: aclRoleLivelyFoundingTeamAssetId,
//           scopeId: assetFoundingTeamId,
//         },
//         {
//           id: aclRoleLivelyCrowdFoundingAssetId,
//           scopeId: assetCrowdFoundingId,
//         },
//         {
//           id: aclRoleLivelyValidatorRewardsAssetId,
//           scopeId: assetValidatorsRewardsId,
//         },
//         {
//           id: aclRoleLivelyTreasuryAssetId,
//           scopeId: assetTreasuryId,
//         },
//         {
//           id: aclRoleLivelyTaxTreasuryAssetId,
//           scopeId: assetTaxTreasuryId,
//         },
//       ]
//
//       // when
//       await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(requests))
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetId, assetAudioVideoProgramId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetId, assetPublicSaleId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetId, assetFoundingTeamId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetId, assetCrowdFoundingId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetId, assetValidatorsRewardsId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetId, assetTreasuryId)
//         .to.emit(typeManagerDelegateProxy, "PolicyScopeUpdated")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetId, assetTaxTreasuryId)
//     })
//
//     it("Should register AssetManager and assets contract as a member to AssetManagerAdminRole success", async() => {
//       // given
//       const requests: IMemberManagement.MemberRegisterStruct[] = [
//         {
//           roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           account: assetManagerProxy.address,
//           typeLimit: 16,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyAudioVideoProgramAssetId,
//           account: assetAudioVideoProgram.address,
//           typeLimit: 16,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyPublicSaleAssetId,
//           account: assetPublicSale.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyFoundingTeamAssetId,
//           account: assetFoundingTeam.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyCrowdFoundingAssetId,
//           account: assetCrowdFounding.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyValidatorRewardsAssetId,
//           account: assetValidatorsRewards.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyTreasuryAssetId,
//           account: assetTreasury.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         },
//         {
//           roleId: aclRoleLivelyTaxTreasuryAssetId,
//           account: assetTaxTreasury.address,
//           typeLimit: 1,
//           factoryLimit: 0,
//           acstat: ActivityStatus.ENABLED,
//           alstat: AlterabilityStatus.UPDATABLE
//         }
//       ]
//
//       // when
//       await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetManagerProxyId, assetManagerProxy.address, aclRoleLivelyErc20TokenAssetManagerAdminId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetAudioVideoProgramId, assetAudioVideoProgram.address, aclRoleLivelyAudioVideoProgramAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetPublicSaleId, assetPublicSale.address, aclRoleLivelyPublicSaleAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetFoundingTeamId, assetFoundingTeam.address, aclRoleLivelyFoundingTeamAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetCrowdFoundingId, assetCrowdFounding.address, aclRoleLivelyCrowdFoundingAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetValidatorsRewardsId, assetValidatorsRewards.address, aclRoleLivelyValidatorRewardsAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetTreasuryId, assetTreasury.address, aclRoleLivelyTreasuryAssetId)
//         .to.emit(memberManagerDelegateProxy, "MemberRegistered")
//         .withArgs(assetAdminWallet.address, assetTaxTreasuryId, assetTaxTreasury.address, aclRoleLivelyTaxTreasuryAssetId)
//     })
//
//     it("Should grant members to related roles success", async() => {
//       // given
//       const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
//       const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
//         {
//           roleId: aclRoleLivelyErc20TokenAssetManagerAdminId,
//           members: [assetAdminId]
//         },
//       ]
//
//       // when
//       await expect(roleManagerDelegateProxy.connect(assetAdmin).roleGrantMembers(requests))
//         .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
//         .withArgs(livelyAdminWallet.address, aclRoleLivelyErc20TokenAssetManagerAdminId, assetAdminId, aclTypeLivelyErc20TokenId)
//         .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
//     })
//
//
//     it("Should distribute token call by assetAdmin success", async () => {
//       // given
//       const beforeBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
//       const beforeBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
//       const beforeBalanceTreasury = await assetTreasury.tokenBalance();
//       const beforeBalancePublicSale = await assetPublicSale.tokenBalance();
//       const beforeBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
//       const beforeBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();
//
//       // when
//       await expect(assetManagerProxy.connect(assetAdmin).livelyTokensDistribution(livelyToken.address))
//         .to.emit(livelyToken, "Mint")
//         .withArgs(assetManagerProxy.address, assetManagerProxy.address, livelyTokenTotalSupply, livelyTokenTotalSupply)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, assetAudioVideoProgramBalance)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetFoundingTeam.address, assetFoundingTeamBalance)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetTreasury.address, assetTreasuryBalance)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetPublicSale.address, assetPublicSaleBalance)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, assetValidatorsRewardsBalance)
//         .to.emit(livelyToken, "Transfer")
//         .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetCrowdFoundingBalance);
//
//       // then
//       const afterBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
//       const afterBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
//       const afterBalanceTreasury = await assetTreasury.tokenBalance();
//       const afterBalancePublicSale = await assetPublicSale.tokenBalance();
//       const afterBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
//       const afterBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();
//
//       expect(afterBalanceAudioVideoProgram.toString()).to.be.equal(
//         beforeBalanceAudioVideoProgram.add(assetAudioVideoProgramBalance).toString()
//       );
//       expect(afterBalanceFoundingTeam.toString()).to.be.equal(
//         beforeBalanceFoundingTeam.add(assetFoundingTeamBalance).toString()
//       );
//       expect(afterBalanceTreasury.toString()).to.be.equal(beforeBalanceTreasury.add(assetTreasuryBalance).toString());
//       expect(afterBalancePublicSale.toString()).to.be.equal(
//         beforeBalancePublicSale.add(assetPublicSaleBalance).toString()
//       );
//       expect(afterBalanceValidatorsRewards.toString()).to.be.equal(
//         beforeBalanceValidatorsRewards.add(assetValidatorsRewardsBalance).toString()
//       );
//       expect(afterBalanceCrowdFounding.toString()).to.be.equal(
//         beforeBalanceCrowdFounding.add(assetCrowdFoundingBalance).toString()
//       );
//     });
//
//     // it("Should deploy relay contract success", async () => {
//     //   // given
//     //   const relayFactory = new Relay__factory(systemAdmin);
//     //
//     //   // when
//     //   daoExecutorForwarder = await relayFactory.deploy(livelyTokenProxy.address);
//     //
//     //   // then
//     //   expect(daoExecutorForwarder.address).not.null;
//     // });
//     // it("Should grant LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE to admin account failed", async () => {
//     //   // when
//     //   await expect(
//     //     accessControlManager.connect(admin).grantRoleAccount(LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE, adminAddress)
//     //   ).to.revertedWith("Illegal Grant Community Dao Executor Role");
//     //
//     //   // then
//     //   expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(adminAddress)).to.be.false;
//     // });
//     //
//     // it("Should grant LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE to relay contract success", async () => {
//     //   // given
//     //   // const daoExecutorRole = await accessControlManager.livelyCommunityDaoExecutorRole();
//     //
//     //   // when
//     //   await expect(
//     //     accessControlManager
//     //       .connect(admin)
//     //       .grantRoleAccount(LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE, daoExecutorForwarder.address)
//     //   )
//     //     .to.emit(accessControlManager, "RoleAccountGranted")
//     //     .withArgs(adminAddress, LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE, daoExecutorForwarder.address);
//     //
//     //   // then
//     //   expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(daoExecutorForwarder.address)).to.be.true;
//     // });
//     //
//     // it("Should grant LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE to another contract success", async () => {
//     //   // given
//     //   const relayFactory = new Relay__factory(systemAdmin);
//     //   const forwarder = await relayFactory.deploy(livelyTokenProxy.address);
//     //   // const daoExecutorRole = await accessControlManager.livelyCommunityDaoExecutorRole();
//     //
//     //   // when
//     //   await expect(
//     //     accessControlManager.connect(admin).grantRoleAccount(LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE, forwarder.address)
//     //   )
//     //     .to.emit(accessControlManager, "RoleAccountGranted")
//     //     .withArgs(adminAddress, LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE, forwarder.address);
//     //
//     //   // then
//     //   expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(forwarder.address)).to.be.true;
//     //   expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(daoExecutorForwarder.address)).to.be.true;
//     // });
//
//     it("Should LivelyToken ERC20 init state success ", async () => {
//       // given
//       const totalSupply = await livelyTokenProxy.totalSupply();
//       const systemAdminBalance = await livelyTokenProxy.balanceOf(systemAdminAddress);
//
//       // when and then
//       expect(await livelyTokenProxy.name()).to.be.equal("LIVELY");
//       expect(await livelyTokenProxy.symbol()).to.be.equal("LVL");
//       expect(await livelyTokenProxy.decimals()).to.be.equal(18);
//       expect(livelyTokenTotalSupply.eq(totalSupply as unknown as BigNumberish));
//       expect(livelyTokenTotalSupply.eq(systemAdminBalance as unknown as BigNumberish));
//     });
//
//     it("Should enable safeMode by anyone failed", async () => {
//
//       // when and then
//       await expect(livelyTokenProxy.connect(user1).setSafeModeStatus(ProxySafeModeStatus.ENABLED)).to.revertedWith("Forbidden");
//     });
//
//
//     it("Should enable safeMode by assetAdmin success", async () => {
//
//       // when and then
//       await expect(livelyTokenProxy.connect(assetAdmin).setSafeModeStatus(ProxySafeModeStatus.ENABLED))
//         .to.emit(livelyTokenProxy, "ProxySafeModeUpdated")
//         .withArgs(adminAddress, livelyTokenProxy.address, ProxySafeModeStatus.ENABLED);
//     });
//
//     it("Should call any methods by anyone when safeMode enabled failed", async () => {
//       // given
//       const typedArray1 = new Int8Array(0);
//       const deadline = BigNumber.from(Date.now() + 10000);
//       const user1Nonce = await livelyTokenProxy.nonce(user1Address);
//       const adminNonce = await livelyTokenProxy.nonce(adminAddress);
//       const systemAdminNonce = await livelyTokenProxy.nonce(systemAdminAddress);
//       const user1Signature = await generatePermitDomainSignatureByHardhat(
//         user1Address,
//         user2Address,
//         dummyAmount,
//         user1Nonce,
//         deadline,
//         livelyTokenProxy.address,
//         user1Address,
//         networkChainId.toNumber()
//       );
//       const adminSignature = await generatePermitDomainSignatureByHardhat(
//         adminAddress,
//         user2Address,
//         dummyAmount,
//         adminNonce,
//         deadline,
//         livelyTokenProxy.address,
//         adminAddress,
//         networkChainId.toNumber()
//       );
//
//       const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
//         systemAdminAddress,
//         user2Address,
//         dummyAmount,
//         systemAdminNonce,
//         deadline,
//         livelyTokenProxy.address,
//         systemAdminAddress,
//         networkChainId.toNumber()
//       );
//
//       const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
//         amount: dummyAmount,
//         to: user2Address,
//       };
//
//       const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
//         from: user1Address,
//         to: user2Address,
//         amount: dummyAmount,
//       };
//
//       const batchUpdateTaxWhitelist: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
//         account: user2Address,
//         isDeleted: false,
//       };
//
//       const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//         source: assetAudioVideoProgram.address,
//         dest: user2Address,
//         amount: dummyAmount,
//         timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
//       };
//
//       const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//         lockId: ethers.utils.formatBytes32String("0"),
//         account: user2Address,
//         reason: "Rollback",
//       };
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).setLocalAdmin(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(
//         livelyTokenProxy.connect(user1).upgradeTo(livelyTokenProxy.address, typedArray1, false)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(livelyAdmin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
//       ).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(
//         livelyTokenProxy.connect(user1).transferFrom(adminAddress, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(livelyAdmin).transferFrom(adminAddress, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).transferFrom(adminAddress, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).decreaseAllowance(user2Address, BigNumber.from(0))).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).decreaseAllowance(user2Address, BigNumber.from(0))).to.revertedWith(
//         "Rejected"
//       );
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).decreaseAllowance(user2Address, BigNumber.from(0))
//       ).to.revertedWith("Rejected");
//
//       // and
//       await expect(
//         livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(livelyAdmin).permit(adminAddress, user2Address, dummyAmount, deadline, adminSignature)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy
//           .connect(systemAdmin)
//           .permit(systemAdminAddress, user2Address, dummyAmount, deadline, systemAdminSignature)
//       ).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).batchTransfer([batchTransfer])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).batchTransfer([batchTransfer])).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).batchTransferFrom([batchTransferFrom])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).updateTaxRate(BigNumber.from(0))).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).updateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist([batchUpdateTaxWhitelist])
//       ).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).pause(user2Address)).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(livelyAdmin).pause(user2Address)).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(systemAdmin).pause(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).unpause(user2Address)).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(livelyAdmin).unpause(user2Address)).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(systemAdmin).unpause(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).pauseAll()).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(livelyAdmin).pauseAll()).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(systemAdmin).pauseAll()).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).unpauseAll()).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(livelyAdmin).unpauseAll()).to.revertedWith("Rejected");
//       await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll()).to.revertedWith("Rejected");
//
//       // and
//       await expect(livelyTokenProxy.connect(user1).withdrawBalance(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).withdrawBalance(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(user2Address)).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(livelyTokenProxy.connect(assetAdmin).lockToken([lockRequest])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).lockToken([lockRequest])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).lockToken([lockRequest])).to.revertedWith(
//         "Rejected"
//       );
//
//       // and
//       await expect(
//         livelyTokenProxy.connect(assetAdmin).claimToken([ethers.utils.formatBytes32String("0")])
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(livelyAdmin).claimToken([ethers.utils.formatBytes32String("0")])
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).claimToken([ethers.utils.formatBytes32String("0")])
//       ).to.revertedWith("Rejected");
//
//
//       // and
//       await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(livelyAdmin).unlockToken([unlockRequest])).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).unlockToken([unlockRequest])).to.revertedWith(
//         "Rejected"
//       );
//     });
//
//     it("Should disable safeMode by assetAdmin success", async () => {
//
//       // when and then
//       await expect(livelyTokenProxy.connect(assetAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED))
//         .to.emit(livelyTokenProxy, "SafeModeChanged")
//         .withArgs(adminAddress, livelyTokenProxy.address, ProxySafeModeStatus.DISABLED);
//     });
//
//     it("Should setLocalAdmin by anyone failed", async () => {
//       // given
//       const currentLocalAdmin = await livelyTokenProxy.localAdmin();
//
//       // when and then
//       await expect(livelyTokenProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
//         "Forbidden"
//       );
//
//       // and
//       expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
//     });
//
//     it("Should setLocalAdmin by systemAdmin to user2 success", async () => {
//       // given
//       let currentLocalAdmin = await livelyTokenProxy.localAdmin();
//
//       // when and then
//       await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(user2Address))
//         .to.emit(livelyTokenProxy, "ProxyLocalAdminUpdated")
//         .withArgs(systemAdminAddress, livelyTokenProxy.address, user2Address);
//
//       // and
//       expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
//
//       // and
//       currentLocalAdmin = await livelyTokenProxy.localAdmin();
//       expect(currentLocalAdmin).to.be.hexEqual(user2Address);
//     });
//
//     it("Should setLocalAdmin by user2 to systemAdmin success", async () => {
//       // given
//       let currentLocalAdmin = await livelyTokenProxy.localAdmin();
//
//       // when and then
//       await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(systemAdminAddress))
//         .to.emit(livelyTokenProxy, "ProxyLocalAdminUpdated")
//         .withArgs(systemAdminAddress, livelyTokenProxy.address, systemAdminAddress);
//
//       // and
//       expect(currentLocalAdmin).to.be.hexEqual(user2Address);
//
//       // and
//       currentLocalAdmin = await livelyTokenProxy.localAdmin();
//       expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
//     });
//
//     it("Should enable upgrade by systemAdmin failed", async () => {
//
//       // when and then
//       await expect(livelyTokenProxy.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.revertedWith(
//         "Forbidden"
//       );
//     });
//
//     it("Should enable upgrade by admin success", async () => {
//
//       // when and then
//       await expect(livelyTokenProxy.connect(assetAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
//         .to.emit(livelyTokenProxy, "ProxyUpdatabilityUpdated")
//         .withArgs(adminAddress, livelyTokenProxy.address, ProxyUpdatabilityStatus.ENABLED);
//     });
//
//     it("Should upgradeTo by anyone failed", async () => {
//       // given
//       const typedArray1 = new Int8Array(0);
//       const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, user1);
//       const newLivelyTokenSubject = await livelyTokenFactory.deploy();
//
//       // when and then
//       await expect(
//         livelyTokenProxy.connect(user1).upgradeTo(newLivelyTokenSubject.address, typedArray1, false)
//       ).to.revertedWith("Forbidden");
//     });
//
//     it("Should upgradeTo by systemAdmin success", async () => {
//       // given
//       const typedArray1 = new Int8Array(0);
//       const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, systemAdmin);
//       const newLivelyTokenSubject = await livelyTokenFactory.deploy();
//
//       // when and then
//       await expect(livelyTokenProxy.connect(systemAdmin).upgradeTo(newLivelyTokenSubject.address, typedArray1, false))
//         .to.emit(livelyTokenProxy, "Upgraded")
//         .withArgs(systemAdminAddress, livelyTokenProxy.address, newLivelyTokenSubject.address);
//
//       livelyTokenSubject = newLivelyTokenSubject;
//     });
//
//     it("Should assetManagerERC20 transfer token to user1 success", async () => {
//       // given
//       const assetAudioVideoProgramBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//
//       // when
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenTransfer(user1Address, dummyAmount)
//       )
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(assetAudioVideoProgram.address, user1Address, dummyAmount);
//
//       // and
//       const assetAudioVideoProgramBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
//         assetAudioVideoProgramBalanceBefore.sub(dummyAmount).toString()
//       );
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
//     });
//
//     it("Should user1 to user2 transfer token success", async () => {
//       // given
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const amount = BigNumber.from(1000).mul(tokenDecimal);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, user2Address, amount);
//
//       // then
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
//     });
//
//     it("Should assetManagerERC20 approve to user1 and user2 success", async () => {
//       // given
//       const user2AllowanceBefore = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user1Address);
//
//       // when
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenApprove(user2Address, dummyAmount)
//       )
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user2Address, user2AllowanceBefore.add(dummyAmount));
//
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenApprove(user1Address, dummyAmount)
//       )
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user1Address, user1AllowanceBefore.add(dummyAmount));
//
//       // then
//       const user2AllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
//     });
//
//     it("Should user2 transferFrom from assetManagerERC20 account success", async () => {
//       // given
//       const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user2Address
//       );
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const amount = BigNumber.from(1000).mul(tokenDecimal);
//       const finalAllowance = assetManagerAllowanceBefore.sub(amount);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).transferFrom(assetAudioVideoProgram.address, user1Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(assetAudioVideoProgram.address, user1Address, amount)
//         .to.emit(livelyTokenProxy, "TransferFrom")
//         .withArgs(user2Address, assetAudioVideoProgram.address, user1Address, amount)
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user2Address, finalAllowance);
//
//       // then
//       const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
//     });
//
//     it("Should assetManagerERC20 increase allowance to user2 success", async () => {
//       // given
//       const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user2Address
//       );
//       const finalAllowance = assetManagerAllowanceBefore.add(dummyAmount);
//
//       // when
//       await expect(
//         assetAudioVideoProgram
//           .connect(assetAdmin)
//           .tokenIncreaseAllowance(user2Address, dummyAmount)
//       )
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user2Address, finalAllowance)
//         .to.emit(livelyTokenProxy, "ApprovalIncreased")
//         .withArgs(assetAudioVideoProgram.address, user2Address, dummyAmount);
//
//       // then
//       const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
//     });
//
//     it("Should user2 transferFrom token exceeded allowance from assetManagerERC20 account failed", async () => {
//       // given
//       const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user2Address
//       );
//       const assetMangerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const amount = dummyAmount.mul(10);
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user2).transferFrom(assetAudioVideoProgram.address, user1Address, amount)
//       ).to.revertedWith("Insufficient Account Allowance");
//
//       // then
//       const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       const assetMangerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       expect(assetManagerAllowanceBefore.toString()).to.be.equal(assetManagerAllowanceAfter.toString());
//       expect(assetMangerBalanceBefore.toString()).to.be.equal(assetMangerBalanceAfter.toString());
//     });
//
//     it("Should assetManagerERC20 decrease allowance from user2 success", async () => {
//       // given
//       const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user2Address
//       );
//       const finalAllowance = assetManagerAllowanceBefore.sub(dummyAmount);
//
//       // when
//       await expect(
//         assetAudioVideoProgram
//           .connect(assetAdmin)
//           .tokenDecreaseAllowance(user2Address, dummyAmount)
//       )
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user2Address, finalAllowance)
//         .to.emit(livelyTokenProxy, "ApprovalDecreased")
//         .withArgs(assetAudioVideoProgram.address, user2Address, dummyAmount);
//
//       // then
//       const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, user2Address);
//       expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
//     });
//
//     it("Should user1 permit to user2 success", async () => {
//       // given
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const deadline = BigNumber.from(Date.now() + 10000);
//       const nonce = await livelyTokenProxy.nonce(user1Address);
//       const user1Signature = await generatePermitDomainSignatureByHardhat(
//         user1Address,
//         user2Address,
//         dummyAmount,
//         nonce,
//         deadline,
//         livelyTokenProxy.address,
//         user1Address,
//         networkChainId.toNumber()
//       );
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
//       )
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(user1Address, user2Address, dummyAmount);
//
//       // then
//       const nonceAfter = await livelyTokenProxy.nonce(user1Address);
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
//       expect(nonceAfter.toString()).to.be.equal(nonce.add(BigNumber.from(1)).toString());
//     });
//
//     it("Should user2 transferFrom from user1 account success", async () => {
//       // given
//       let user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//       const amount = BigNumber.from(1000).mul(tokenDecimal);
//       const finalAllowance = user1Allowance.sub(amount);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).transferFrom(user1Address, adminAddress, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, adminAddress, amount)
//         .to.emit(livelyTokenProxy, "TransferFrom")
//         .withArgs(user2Address, user1Address, adminAddress, amount)
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(user1Address, user2Address, finalAllowance);
//
//       // then
//       user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(amount).toString());
//     });
//
//     it("Should user1 batch transfer token success", async () => {
//       // given
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const value = BigNumber.from(500).mul(tokenDecimal);
//       const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
//         amount: value,
//         to: user2Address,
//       };
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer]))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, user2Address, batchTransfer.amount)
//         .to.emit(livelyTokenProxy, "BatchTransfer")
//         .withArgs(user1Address, batchTransfer.amount);
//
//       // then
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//
//       expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.sub(value).toString());
//       expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(value).toString());
//     });
//
//     it("Should user2 batch transferFrom user1 account success", async () => {
//       // given
//       let user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//       const value = BigNumber.from(1000).mul(tokenDecimal);
//       const finalAllowance = user1Allowance.sub(value);
//       const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
//         from: user1Address,
//         to: adminAddress,
//         amount: value,
//       };
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).batchTransferFrom([batchTransferFrom]))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, adminAddress, value)
//         .to.emit(livelyTokenProxy, "TransferFrom")
//         .withArgs(user2Address, user1Address, adminAddress, value)
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(user1Address, user2Address, finalAllowance)
//         .to.emit(livelyTokenProxy, "BatchTransferFrom")
//         .withArgs(user2Address, value);
//
//       // then
//       user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(value).toString());
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(value).toString());
//     });
//
//     it("Should anyone mint token failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).mint(user2Address, dummyAmount)).to.revertedWith("Access Denied");
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should systemAdmin mint token failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Access Denied"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should admin mint token success", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).mint(user2Address, dummyAmount))
//         .to.emit(livelyTokenProxy, "Mint")
//         .withArgs(adminAddress, user2Address, dummyAmount, totalSupplyBefore.add(dummyAmount));
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.add(dummyAmount).toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
//     });
//
//     it("Should anyone burn token failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).burn(user2Address, dummyAmount)).to.revertedWith("Access Denied");
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should systemAdmin burn token failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Access Denied"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should admin burn token success", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).burn(user2Address, dummyAmount))
//         .to.emit(livelyTokenProxy, "Burn")
//         .withArgs(adminAddress, user2Address, dummyAmount, totalSupplyBefore.sub(dummyAmount));
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.sub(dummyAmount).toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(dummyAmount).toString());
//     });
//
//     it("Should anyone (user1) pause account failed", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).pause(user2Address)).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       expect(isPausedAfter).to.be.equal(isPausedBefore);
//     });
//
//     it("Should systemAdmin pause an account failed", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).pause(user2Address)).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       expect(isPausedAfter).to.be.equal(isPausedBefore);
//     });
//
//     it("Should admin pause an user2 account success", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).pause(user2Address))
//         .to.emit(livelyTokenProxy, "Paused")
//         .withArgs(adminAddress, user2Address);
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       const pausedAccounts = await livelyTokenProxy.pausedAccounts();
//       expect(isPausedBefore).to.be.false;
//       expect(isPausedAfter).to.be.true;
//       expect(pausedAccounts[0]).to.be.equal(user2Address);
//     });
//
//     it("Should user2 to user1 transfer token when account paused failed", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).transfer(user1Address, dummyAmount)).to.revertedWith(
//         "ERC20Pause: Account Suspended"
//       );
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
//     });
//
//     it("Should user2 to user1 transferFrom token when account paused failed", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user1).transferFrom(user2Address, adminAddress, dummyAmount)
//       ).to.revertedWith("ERC20Pause: Account Suspended");
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
//     });
//
//     it("Should user1 transferFrom user2 token when account paused failed", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user1).transferFrom(user2Address, adminAddress, dummyAmount)
//       ).to.revertedWith("ERC20Pause: Account Suspended");
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
//     });
//
//     it("Should user2 approve to user1 when account paused failed", async () => {
//       // given
//       const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).approve(user1Address, dummyAmount)).to.revertedWith(
//         "ERC20Pause: Account Suspended"
//       );
//
//       // then
//       const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
//       expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
//     });
//
//     it("Should user2 increase allowance to user1 when account paused failed", async () => {
//       // given
//       const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).increaseAllowance(user1Address, dummyAmount)).to.revertedWith(
//         "ERC20Pause: Account Suspended"
//       );
//
//       // then
//       const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
//       expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
//     });
//
//     it("Should user2 decrease allowance to user1 when account paused failed", async () => {
//       // given
//       const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
//       const amount = BigNumber.from(0);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).decreaseAllowance(user1Address, amount)).to.revertedWith(
//         "ERC20Pause: Account Suspended"
//       );
//
//       // then
//       const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
//       expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
//     });
//
//     it("Should user2 permit allowance to user1 when account paused failed", async () => {
//       // given
//       const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
//       const deadline = BigNumber.from(Date.now() + 10000);
//       const nonce = await livelyTokenProxy.nonce(user2Address);
//       const user2Signature = await generatePermitDomainSignatureByHardhat(
//         user2Address,
//         user1Address,
//         dummyAmount,
//         nonce,
//         deadline,
//         livelyTokenProxy.address,
//         user2Address,
//         networkChainId.toNumber()
//       );
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user2).permit(user2Address, user1Address, dummyAmount, deadline, user2Signature)
//       ).to.revertedWith("ERC20Pause: Account Suspended");
//
//       // then
//       const nonceAfter = await livelyTokenProxy.nonce(user2Address);
//       const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
//       expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
//       expect(nonceAfter.toString()).to.be.equal(nonce.toString());
//     });
//
//     it("Should admin burn token from user2 when account paused failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Suspended"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
//     });
//
//     it("Should admin mint token to user2 when account paused failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Suspended"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
//     });
//
//     it("Should anyone (user1) unpause account failed", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).unpause(user2Address)).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       expect(isPausedAfter).to.be.equal(isPausedBefore);
//     });
//
//     it("Should systemAdmin unpause an account failed", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).unpause(user2Address)).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       expect(isPausedAfter).to.be.equal(isPausedBefore);
//     });
//
//     it("Should admin unpause an user2 account success", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unpause(user2Address))
//         .to.emit(livelyTokenProxy, "Unpaused")
//         .withArgs(adminAddress, user2Address);
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
//       const pausedAccounts = await livelyTokenProxy.pausedAccounts();
//       expect(isPausedAfter).to.be.false;
//       expect(isPausedBefore).to.be.true;
//       expect(pausedAccounts).to.be.empty;
//     });
//
//     it("Should user1 to user2 transfer token when account unpaused success", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const amount = BigNumber.from(10).mul(tokenDecimal);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).transfer(user1Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user2Address, user1Address, amount);
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(amount).toString());
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
//     });
//
//     it("Should admin pause an asset manager account success", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).pause(assetAudioVideoProgram.address))
//         .to.emit(livelyTokenProxy, "Paused")
//         .withArgs(adminAddress, assetAudioVideoProgram.address);
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
//       const pausedAccounts = await livelyTokenProxy.pausedAccounts();
//       expect(isPausedBefore).to.be.false;
//       expect(isPausedAfter).to.be.true;
//       expect(pausedAccounts[0]).to.be.equal(assetAudioVideoProgram.address);
//     });
//
//     it("Should lock token from paused assetManagerERC20 failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//         source: assetAudioVideoProgram.address,
//         dest: user2Address,
//         amount: dummyAmount,
//         timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
//       };
//
//       // when
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenLock([lockRequest])
//       ).revertedWith("Suspended");
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//       expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//       expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     });
//
//     it("Should unlock token by paused assetAdmin failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//         lockId: ethers.utils.formatBytes32String("0"),
//         account: assetAudioVideoProgram.address,
//         reason: "Rollback",
//       };
//
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest])).to.revertedWith(
//         "Suspended"
//       );
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     });
//
//     it("Should batch unlock token by paused asset manager failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const unlockRequest: IERC20Lock.UnLockTokenRequestStruct[] = [
//         {
//           lockId: ethers.utils.formatBytes32String("0"),
//           account: assetAudioVideoProgram.address,
//           reason: "Rollback",
//         },
//       ];
//
//       // when
//       await expect(await livelyTokenProxy.connect(assetAdmin).unlockToken(unlockRequest)).to.revertedWith("Suspended");
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     });
//
//     it("Should admin unpause asset manager account success", async () => {
//       // given
//       const isPausedBefore = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unpause(assetAudioVideoProgram.address))
//         .to.emit(livelyTokenProxy, "Unpaused")
//         .withArgs(adminAddress, assetAudioVideoProgram.address);
//
//       // then
//       const isPausedAfter = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
//       const pausedAccounts = await livelyTokenProxy.pausedAccounts();
//       expect(isPausedAfter).to.be.false;
//       expect(isPausedBefore).to.be.true;
//       expect(pausedAccounts).to.be.empty;
//     });
//
//     it("Should anyone (user2) pauseAll failed", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).pauseAll()).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
//     });
//
//     it("Should systemAdmin pauseAll failed", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).pauseAll()).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
//     });
//
//     it("Should admin pauseAll success", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).pauseAll())
//         .to.emit(livelyTokenProxy, "PausedAll")
//         .withArgs(adminAddress);
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.true;
//       expect(isPausedAllBefore).to.be.false;
//     });
//
//     it("Should transfer token by anyone when token paused failed", async () => {
//       // given
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//       const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminAddress);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(assetAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminAddress);
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//       expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
//     });
//
//     it("Should transferFrom token by anyone when token paused failed", async () => {
//       // given
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//       const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminAddress);
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user1).transferFrom(assetAudioVideoProgram.address, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(assetAdmin).transferFrom(assetAudioVideoProgram.address, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).transferFrom(assetAudioVideoProgram.address, user2Address, dummyAmount)
//       ).to.revertedWith("Rejected");
//
//       // then
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminAddress);
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//       expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
//     });
//
//     it("Should approve token by anyone when token paused failed", async () => {
//       // given
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(assetAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
//       expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
//       expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
//     });
//
//     it("Should increase allowance token by anyone when token paused failed", async () => {
//       // given
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(assetAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
//       expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
//       expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
//     });
//
//     it("Should decrease allowance token by anyone when token paused failed", async () => {
//       // given
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       const amount = BigNumber.from(0);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).decreaseAllowance(user2Address, amount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(assetAdmin).decreaseAllowance(user2Address, amount)).to.revertedWith(
//         "Rejected"
//       );
//       await expect(livelyTokenProxy.connect(systemAdmin).decreaseAllowance(user2Address, amount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
//       expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
//       expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
//     });
//
//     it("Should permit allowance by anyone when token paused failed", async () => {
//       // given
//       const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       const deadline = BigNumber.from(Date.now() + 10000);
//       const user1NonceBefore = await livelyTokenProxy.nonce(user1Address);
//       const adminNonceBefore = await livelyTokenProxy.nonce(adminAddress);
//       const systemAdminNonceBefore = await livelyTokenProxy.nonce(systemAdminAddress);
//       const user1Signature = await generatePermitDomainSignatureByHardhat(
//         user1Address,
//         user2Address,
//         dummyAmount,
//         user1NonceBefore,
//         deadline,
//         livelyTokenProxy.address,
//         user1Address,
//         networkChainId.toNumber()
//       );
//       const adminSignature = await generatePermitDomainSignatureByHardhat(
//         adminAddress,
//         user2Address,
//         dummyAmount,
//         adminNonceBefore,
//         deadline,
//         livelyTokenProxy.address,
//         adminAddress,
//         networkChainId.toNumber()
//       );
//       const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
//         systemAdminAddress,
//         user2Address,
//         dummyAmount,
//         systemAdminNonceBefore,
//         deadline,
//         livelyTokenProxy.address,
//         systemAdminAddress,
//         networkChainId.toNumber()
//       );
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy.connect(assetAdmin).permit(adminAddress, user2Address, dummyAmount, deadline, adminSignature)
//       ).to.revertedWith("Rejected");
//       await expect(
//         livelyTokenProxy
//           .connect(systemAdmin)
//           .permit(systemAdminAddress, user2Address, dummyAmount, deadline, systemAdminSignature)
//       ).to.revertedWith("Rejected");
//
//       // then
//       const user1NonceAfter = await livelyTokenProxy.nonce(user1Address);
//       const adminNonceAfter = await livelyTokenProxy.nonce(adminAddress);
//       const systemAdminNonceAfter = await livelyTokenProxy.nonce(systemAdminAddress);
//       const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
//       const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
//       const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
//       expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
//       expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
//       expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
//       expect(user1NonceAfter.toString()).to.be.equal(user1NonceBefore.toString());
//       expect(adminNonceAfter.toString()).to.be.equal(adminNonceBefore.toString());
//       expect(systemAdminNonceAfter.toString()).to.be.equal(systemAdminNonceBefore.toString());
//     });
//
//     it("Should burn token by admin when token paused failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should mint token by anyone when token paused failed", async () => {
//       // given
//       const totalSupplyBefore = await livelyTokenProxy.totalSupply();
//       const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const totalSupplyAfter = await livelyTokenProxy.totalSupply();
//       const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//       expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//       expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
//     });
//
//     it("Should lock token when token paused failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//         source: assetAudioVideoProgram.address,
//         dest: user2Address,
//         amount: dummyAmount,
//         timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
//       };
//
//       // when
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenLock([lockRequest])
//       ).revertedWith("Rejected");
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//       expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//       expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     });
//
//     it("Should lock token when token paused failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//         source: assetAudioVideoProgram.address,
//         dest: user2Address,
//         amount: dummyAmount,
//         timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
//       };
//
//       // when
//       await expect(
//         assetAudioVideoProgram.connect(assetAdmin).tokenLock([lockRequest])
//       ).revertedWith("Rejected");
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//       expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//       expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     });
//
//
//     it("Should batch claim token when token paused failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(assetAdmin).claimToken([ethers.utils.formatBytes32String("00")])
//       ).revertedWith("Rejected");
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     });
//
//     it("Should unlock token when token paused failed", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//         lockId: ethers.utils.formatBytes32String("0"),
//         account: assetAudioVideoProgram.address,
//         reason: "Rollback",
//       };
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest])).to.revertedWith(
//         "Rejected"
//       );
//
//       // then
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     });
//
//
//     it("Should anyone (user2) unpauseAll failed", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).unpauseAll()).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
//     });
//
//     it("Should systemAdmin unpauseAll failed", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll()).to.revertedWith("Access Denied");
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
//     });
//
//     it("Should admin unpauseAll success", async () => {
//       // given
//       const isPausedAllBefore = await livelyTokenProxy.isPausedAll();
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unpauseAll())
//         .to.emit(livelyTokenProxy, "UnpausedAll")
//         .withArgs(adminAddress);
//
//       // then
//       const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
//       expect(isPausedAllAfter).to.be.false;
//       expect(isPausedAllBefore).to.be.true;
//     });
//
//     it("Should set tax rate by anyone failed", async () => {
//       // given
//       const taxRateBefore = await livelyTokenProxy.taxRate();
//       const taxValue = BigNumber.from(300);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).updateTaxRate(taxValue)).to.revertedWith("Access Denied");
//
//       // then
//       const taxRateAfter = await livelyTokenProxy.taxRate();
//       expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
//     });
//
//     it("Should set tax rate by systemAdmin failed", async () => {
//       // given
//       const taxRateBefore = await livelyTokenProxy.taxRate();
//       const taxValue = BigNumber.from(300);
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(taxValue)).to.revertedWith("Access Denied");
//
//       // then
//       const taxRateAfter = await livelyTokenProxy.taxRate();
//       expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
//     });
//
//     it("Should set tax rate by admin success", async () => {
//       // given
//       const taxRateBefore = await livelyTokenProxy.taxRate();
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).updateTaxRate(taxValue))
//         .to.emit(livelyTokenProxy, "TaxRateUpdated")
//         .withArgs(adminAddress, taxValue);
//
//       // then
//       const taxRateAfter = await livelyTokenProxy.taxRate();
//       expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.add(taxValue).toString());
//     });
//
//     it("Should admin transfer token to user1 along with tax success", async () => {
//       // given
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
//       const amount = BigNumber.from(100).mul(tokenDecimal);
//       const taxAmount = BigNumber.from(3).mul(tokenDecimal);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, user2Address, amount.sub(taxAmount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, assetTaxTreasury.address, taxAmount);
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
//       expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
//     });
//
//     it("Should user1 transferFrom token from assetManagerERC20 along with tax success", async () => {
//       // given
//       const assetManagerUser1AllowanceBefore = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user1Address
//       );
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
//       const amount = BigNumber.from(100).mul(tokenDecimal);
//       const taxAmount = BigNumber.from(3).mul(tokenDecimal);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).transferFrom(assetAudioVideoProgram.address, user2Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(assetAudioVideoProgram.address, user2Address, amount.sub(taxAmount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(assetAudioVideoProgram.address, assetTaxTreasury.address, taxAmount)
//         .to.emit(livelyTokenProxy, "TransferFrom")
//         .withArgs(user1Address, assetAudioVideoProgram.address, user2Address, amount)
//         .to.emit(livelyTokenProxy, "Approval")
//         .withArgs(assetAudioVideoProgram.address, user1Address, assetManagerUser1AllowanceBefore.sub(amount));
//
//       // then
//       const assetManagerUser1AllowanceAfter = await livelyTokenProxy.allowance(
//         assetAudioVideoProgram.address,
//         user1Address
//       );
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
//       expect(assetManagerUser1AllowanceAfter.toString()).to.be.equal(
//         assetManagerUser1AllowanceBefore.sub(amount).toString()
//       );
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(amount).toString());
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
//       expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
//     });
//     //
//     // it("Should set tax whitelist by anyone failed", async () => {
//     //   // given
//     //   const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist(user2Wallet.address, false)).to.revertedWith(
//     //     "Access Denied"
//     //   );
//     //
//     //   // then
//     //   const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//     //   expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
//     // });
//     //
//     // it("Should set tax whitelist by systemAdmin failed", async () => {
//     //   // given
//     //   const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist(user2Address, false)).to.revertedWith(
//     //     "Access Denied"
//     //   );
//     //
//     //   // then
//     //   const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//     //   expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
//     // });
//     //
//     // it("Should set tax whitelist by admin success", async () => {
//     //   // given
//     //   const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(assetAdmin).updateTaxWhitelist(user2Wallet.address, false))
//     //     .to.emit(livelyTokenProxy, "TaxWhitelistUpdated")
//     //     .withArgs(adminAddress, user2Address, false);
//     //
//     //   // then
//     //   const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//     //   expect(taxWhitelistAfter).to.be.eql([...taxWhitelistBefore, user2Address]);
//     // });
//     //
//     // it("Should user2 transfer token with tax and tax whitelist success", async () => {
//     //   // given
//     //   const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//     //   const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//     //   const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const amount = BigNumber.from(100).mul(tokenDecimal);
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(user2).transfer(user1Address, amount))
//     //     .to.emit(livelyTokenProxy, "Transfer")
//     //     .withArgs(user2Address, user1Address, amount);
//     //
//     //   // then
//     //   const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//     //   const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//     //   const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(amount).toString());
//     //   expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
//     //   expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     // });
//
//     it("Should set tax whitelist by anyone failed", async () => {
//       // given
//       const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//       const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
//         account: user1Address,
//         isDeleted: false,
//       };
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist([batchTaxWhitelistRequest])).to.revertedWith(
//         "Access Denied"
//       );
//
//       // then
//       const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//       expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
//     });
//
//     it("Should set batch tax whitelist by systemAdmin failed", async () => {
//       // given
//       const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//       const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
//         account: user1Address,
//         isDeleted: false,
//       };
//
//       // when
//       await expect(
//         livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist([batchTaxWhitelistRequest])
//       ).to.revertedWith("Access Denied");
//
//       // then
//       const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//       expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
//     });
//
//     it("Should set batch tax whitelist by admin success", async () => {
//       // given
//       const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
//       const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
//         account: user1Address,
//         isDeleted: false,
//       };
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).updateTaxWhitelist([batchTaxWhitelistRequest]))
//         .to.emit(livelyTokenProxy, "TaxWhitelistUpdated")
//         .withArgs(adminAddress, user1Address, false);
//
//       // then
//       const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
//       expect(taxWhitelistAfter).to.be.eql([...taxWhitelistBefore, user1Address]);
//     });
//
//     it("Should user1 transfer token with tax and tax whitelist success", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const amount = BigNumber.from(100).mul(tokenDecimal);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
//         .to.emit(livelyTokenProxy, "Transfer")
//         .withArgs(user1Address, user2Address, amount);
//
//       // then
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
//       expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     });
//
//     it("Should deposit eth coin to lively token success", async () => {
//       // given
//       const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
//       const user1BalanceBefore = await provider.getBalance(user1Address);
//       const transaction: TransactionRequest = {
//         to: livelyTokenProxy.address,
//         value: ethers.utils.parseEther("10"),
//       };
//
//       // when
//       const response = await user1.sendTransaction(transaction);
//
//       // then
//       const receiptTx = await provider.getTransactionReceipt(response.hash);
//       const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
//       const user1BalanceAfter = await provider.getBalance(user1Address);
//       expect(livelyContractBalanceAfter.toString()).to.be.equal(
//         livelyContractBalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
//       );
//       expect(user1BalanceAfter.toString()).to.be.equal(
//         user1BalanceBefore
//           .sub(BigNumber.from(10).mul(tokenDecimal))
//           .sub(receiptTx.gasUsed.mul(receiptTx.effectiveGasPrice))
//           .toString()
//       );
//     });
//
//     it("Should withdraw eth coin by anyone failed", async () => {
//       // given
//       const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
//
//       // when
//       await expect(livelyTokenProxy.connect(user1).withdrawBalance(user1Address)).to.revertedWith(
//         "Withdraw Balance Forbidden"
//       );
//
//       // then
//       const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
//       expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
//     });
//
//     it("Should withdraw eth coin by systemAdmin failed", async () => {
//       // given
//       const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
//
//       // when
//       await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(user1Address)).to.revertedWith(
//         "Withdraw Balance Forbidden"
//       );
//
//       // then
//       const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
//       expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
//     });
//
//     it("Should withdraw eth coin by admin success", async () => {
//       // given
//       const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
//       const user1BalanceBefore = await provider.getBalance(user1Address);
//
//       // when
//       await livelyTokenProxy.connect(assetAdmin).withdrawBalance(user1Address);
//
//       // then
//       const user1BalanceAfter = await provider.getBalance(user1Address);
//       const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
//       expect(livelyContractBalanceAfter.toString()).to.be.equal(
//         livelyContractBalanceBefore.sub(BigNumber.from(10).mul(tokenDecimal)).toString()
//       );
//       expect(user1BalanceAfter.toString()).to.be.equal(
//         user1BalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
//       );
//     });
//
//     // it("Should lock token from anyone to user2 failed", async () => {
//     //   // given
//     //   const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//     //     source: assetAudioVideoProgram.address,
//     //     dest: user2Address,
//     //     amount: dummyAmount,
//     //     timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
//     //   };
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(admin).lockToken(lockRequest)).revertedWith("Access Denied");
//     //
//     //   // then
//     //   const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should lock token from asset manager to user2 with illegal timestamp failed", async () => {
//     //   // given
//     //   const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//     //     source: assetAudioVideoProgram.address,
//     //     dest: user2Address,
//     //     amount: dummyAmount,
//     //     timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 20 * 60 * 60),
//     //   };
//     //
//     //   // when
//     //   await expect(
//     //     assetManagerERC20.connect(assetAdmin).tokenLock(assetAudioVideoProgram.address, lockRequest)
//     //   ).revertedWith("Illegal Timestamp");
//     //
//     //   // then
//     //   const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should lock token from asset manager to user2 with illegal dest failed", async () => {
//     //   // given
//     //   const assetManagerLockBalanceBefore = await livelyTokenProxy.lockBalanceOf(assetAudioVideoProgram.address);
//     //   const assetManagerTotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(assetAudioVideoProgram.address);
//     //   const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//     //     source: assetAudioVideoProgram.address,
//     //     dest: assetAudioVideoProgram.address,
//     //     amount: dummyAmount,
//     //     timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 20 * 60 * 60),
//     //   };
//     //
//     //   // when
//     //   await expect(
//     //     assetManagerERC20.connect(assetAdmin).tokenLock(assetAudioVideoProgram.address, lockRequest)
//     //   ).revertedWith("Illegal Destination Address");
//     //
//     //   // then
//     //   const assetManagerLockBalanceAfter = await livelyTokenProxy.lockBalanceOf(assetAudioVideoProgram.address);
//     //   const assetManagerTotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(assetAudioVideoProgram.address);
//     //
//     //   expect(assetManagerLockBalanceAfter.toString()).to.be.equal(assetManagerLockBalanceBefore.toString());
//     //   expect(assetManagerTotalBalanceAfter.toString()).to.be.equal(assetManagerTotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should lock token from asset manager to user2 success", async () => {
//     //   // given
//     //   const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const lockRequest: IERC20Lock.LockTokenRequestStruct = {
//     //     source: assetAudioVideoProgram.address,
//     //     dest: user2Address,
//     //     amount: dummyAmount,
//     //     timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 25 * 60 * 60),
//     //   };
//     //   user2LockIds.push(
//     //     ethers.utils.keccak256(
//     //       ethers.utils.solidityPack(
//     //         ["address", "address", "uint256", "uint256"],
//     //         [lockRequest.source, lockRequest.dest, lockRequest.timestamp, lockRequest.amount]
//     //       )
//     //     )
//     //   );
//     //
//     //   // when
//     //   await expect(assetManagerERC20.connect(assetAdmin).tokenLock(assetAudioVideoProgram.address, lockRequest))
//     //     .to.emit(livelyTokenProxy, "TokenLocked")
//     //     .withArgs(
//     //       user2LockIds[user2LockIds.length - 1],
//     //       assetAudioVideoProgram.address,
//     //       assetAudioVideoProgram.address,
//     //       user2Address,
//     //       lockRequest.timestamp,
//     //       lockRequest.amount
//     //     );
//     //
//     //   // then
//     //   const [amount, lockedAt, claimedAt, source, status] = await livelyTokenProxy.lockInfo(
//     //     user2LockIds[user2LockIds.length - 1],
//     //     user2Address
//     //   );
//     //   const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const latestBlockNumber = await provider.getBlockNumber();
//     //   const block = await provider.getBlock(latestBlockNumber);
//     //
//     //   expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(dummyAmount).toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
//     //   expect(amount.toString()).to.be.equal(lockRequest.amount.toString());
//     //   expect(lockedAt.toString()).to.be.equal(block.timestamp.toString());
//     //   expect(claimedAt.toString()).to.be.equal(lockRequest.timestamp.toString());
//     //   expect(source).to.be.hexEqual(assetAudioVideoProgram.address);
//     //   expect(<LockState>status).to.be.equal(LockState.LOCKED);
//     // });
//
//     it("Should lock token from asset manager to user2 success", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user1Address);
//       const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user1Address);
//       const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
//         {
//           source: assetAudioVideoProgram.address,
//           dest: user2Address,
//           amount: dummyAmount.div(5),
//           timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
//         },
//         {
//           source: assetAudioVideoProgram.address,
//           dest: user2Address,
//           amount: dummyAmount,
//           timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 72 * 60 * 60),
//         },
//         {
//           source: assetAudioVideoProgram.address,
//           dest: user2Address,
//           amount: dummyAmount.mul(2),
//           timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 96 * 60 * 60),
//         },
//         {
//           source: assetAudioVideoProgram.address,
//           dest: user1Address,
//           amount: dummyAmount,
//           timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
//         },
//         {
//           source: assetAudioVideoProgram.address,
//           dest: user1Address,
//           amount: dummyAmount,
//           timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 72 * 60 * 60),
//         },
//       ];
//
//       let totalAmount = BigNumber.from(0);
//       const user2LockIdsSize = user2LockIds.length;
//       let user2LockAmount = BigNumber.from(0);
//       let user1LockAmount = BigNumber.from(0);
//       for (let i = 0; i < lockRequests.length; i++) {
//         if (lockRequests[i].dest === user2Address) {
//           user2LockIds.push(
//             ethers.utils.keccak256(
//               ethers.utils.solidityPack(
//                 ["address", "address", "uint256", "uint256"],
//                 [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].timestamp, lockRequests[i].amount]
//               )
//             )
//           );
//           user2LockAmount = user2LockAmount.add(<BigNumber>lockRequests[i].amount);
//         } else {
//           user1LockIds.push(
//             ethers.utils.keccak256(
//               ethers.utils.solidityPack(
//                 ["address", "address", "uint256", "uint256"],
//                 [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].timestamp, lockRequests[i].amount]
//               )
//             )
//           );
//           user1LockAmount = user1LockAmount.add(<BigNumber>lockRequests[i].amount);
//         }
//         totalAmount = totalAmount.add(<BigNumber>lockRequests[i].amount);
//       }
//
//       // when
//       await expect(assetAudioVideoProgram.connect(assetAdmin).tokenLock(lockRequests))
//         .to.emit(livelyTokenProxy, "TokenLocked")
//         .withArgs(
//           user2LockIds[user2LockIdsSize],
//           assetAudioVideoProgram.address,
//           assetAudioVideoProgram.address,
//           user2Address,
//           lockRequests[0].timestamp,
//           lockRequests[0].amount
//         )
//         .to.emit(livelyTokenProxy, "TokenLocked")
//         .withArgs(
//           user2LockIds[user2LockIdsSize + 1],
//           assetAudioVideoProgram.address,
//           assetAudioVideoProgram.address,
//           user2Address,
//           lockRequests[1].timestamp,
//           lockRequests[1].amount
//         )
//         .to.emit(livelyTokenProxy, "TokenLocked")
//         .withArgs(
//           user2LockIds[user2LockIdsSize + 2],
//           assetAudioVideoProgram.address,
//           assetAudioVideoProgram.address,
//           user2Address,
//           lockRequests[2].timestamp,
//           lockRequests[2].amount
//         )
//         .to.emit(livelyTokenProxy, "TokenLocked")
//         .withArgs(
//           user1LockIds[0],
//           assetAudioVideoProgram.address,
//           assetAudioVideoProgram.address,
//           user1Address,
//           lockRequests[3].timestamp,
//           lockRequests[3].amount
//         )
//         .to.emit(livelyTokenProxy, "TokenLocked")
//         .withArgs(
//           user1LockIds[1],
//           assetAudioVideoProgram.address,
//           assetAudioVideoProgram.address,
//           user1Address,
//           lockRequests[4].timestamp,
//           lockRequests[4].amount
//         )
//         .to.emit(livelyTokenProxy, "BatchTokenLocked")
//         .withArgs(assetAudioVideoProgram.address, totalAmount);
//
//       // then
//       const user2Lock1 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize], user2Address)) };
//       const user2Lock2 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize + 1], user2Address)) };
//       const user2Lock3 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize + 2], user2Address)) };
//       const user1Lock1 = { ...(await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address)) };
//       const user1Lock2 = { ...(await livelyTokenProxy.lockInfo(user1LockIds[1], user1Address)) };
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user1Address);
//       const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user1Address);
//       const latestBlockNumber = await provider.getBlockNumber();
//       const block = await provider.getBlock(latestBlockNumber);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(totalAmount).toString());
//       expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(user2LockAmount).toString());
//       expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(user2LockAmount).toString());
//       expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(user1LockAmount).toString());
//       expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(user1LockAmount).toString());
//
//       // and
//       expect(user2Lock1[0].toString()).to.be.equal(lockRequests[0].amount.toString());
//       expect(user2Lock1[1].toString()).to.be.equal(block.timestamp.toString());
//       expect(user2Lock1[2].toString()).to.be.equal(lockRequests[0].timestamp.toString());
//       expect(user2Lock1[3]).to.be.hexEqual(assetAudioVideoProgram.address);
//       expect(<LockState>user2Lock1[4]).to.be.equal(LockState.LOCKED);
//
//       // and
//       expect(user2Lock2[0].toString()).to.be.equal(lockRequests[1].amount.toString());
//       expect(user2Lock2[1].toString()).to.be.equal(block.timestamp.toString());
//       expect(user2Lock2[2].toString()).to.be.equal(lockRequests[1].timestamp.toString());
//       expect(user2Lock2[3]).to.be.hexEqual(assetAudioVideoProgram.address);
//       expect(<LockState>user2Lock2[4]).to.be.equal(LockState.LOCKED);
//
//       // and
//       expect(user2Lock3[0].toString()).to.be.equal(lockRequests[2].amount.toString());
//       expect(user2Lock3[1].toString()).to.be.equal(block.timestamp.toString());
//       expect(user2Lock3[2].toString()).to.be.equal(lockRequests[2].timestamp.toString());
//       expect(user2Lock3[3]).to.be.hexEqual(assetAudioVideoProgram.address);
//       expect(<LockState>user2Lock3[4]).to.be.equal(LockState.LOCKED);
//
//       // and
//       expect(user1Lock1[0].toString()).to.be.equal(lockRequests[3].amount.toString());
//       expect(user1Lock1[1].toString()).to.be.equal(block.timestamp.toString());
//       expect(user1Lock1[2].toString()).to.be.equal(lockRequests[3].timestamp.toString());
//       expect(user1Lock1[3]).to.be.hexEqual(assetAudioVideoProgram.address);
//       expect(<LockState>user1Lock1[4]).to.be.equal(LockState.LOCKED);
//
//       // and
//       expect(user1Lock2[0].toString()).to.be.equal(lockRequests[4].amount.toString());
//       expect(user1Lock2[1].toString()).to.be.equal(block.timestamp.toString());
//       expect(user1Lock2[2].toString()).to.be.equal(lockRequests[4].timestamp.toString());
//       expect(user1Lock2[3]).to.be.hexEqual(assetAudioVideoProgram.address);
//       expect(<LockState>user1Lock2[4]).to.be.equal(LockState.LOCKED);
//     });
//
//     // it("Should claim token from user2 by admin failed", async () => {
//     //   // given
//     //   const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(admin).claimToken(user2LockIds[0])).revertedWith("LockId Not Found");
//     //
//     //   // then
//     //   const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should claim token from user2 with invalid timestamp failed", async () => {
//     //   // given
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(user2).claimToken(user2LockIds[0])).revertedWith("Illegal Claim Lock");
//     //
//     //   // then
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should claim token from user2 success", async () => {
//     //   // given
//     //   const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   await provider.send("evm_increaseTime", [200 * 60 * 60]);
//     //   const [amount] = await livelyTokenProxy.lockInfo(user2LockIds[0], user2Address);
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(user2).claimToken(user2LockIds[0]))
//     //     .to.emit(livelyTokenProxy, "TokenClaimed")
//     //     .withArgs(user2LockIds[0], user2Address, assetAudioVideoProgram.address, amount);
//     //
//     //   // then
//     //   const [, , , , status] = await livelyTokenProxy.lockInfo(user2LockIds[0], user2Address);
//     //   const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount).toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     //   expect(<LockState>status).to.be.equal(LockState.CLAIMED);
//     // });
//
//     it("Should claim token from user2 success", async () => {
//       // given
//       const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
//       const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//       const ids = [user2LockIds[1], user2LockIds[2]];
//       const [amount1] = await livelyTokenProxy.lockInfo(user2LockIds[1], user2Address);
//       const [amount2] = await livelyTokenProxy.lockInfo(user2LockIds[2], user2Address);
//       // await provider.send("evm_increaseTime", [200 * 60 * 60]);
//
//       // when
//       await expect(livelyTokenProxy.connect(user2).claimToken(ids))
//         .to.emit(livelyTokenProxy, "TokenClaimed")
//         .withArgs(user2LockIds[1], user2Address, assetAudioVideoProgram.address, amount1)
//         .to.emit(livelyTokenProxy, "TokenClaimed")
//         .withArgs(user2LockIds[2], user2Address, assetAudioVideoProgram.address, amount2);
//
//       // then
//       const [, , , , status1] = await livelyTokenProxy.lockInfo(user2LockIds[1], user2Address);
//       const [, , , , status2] = await livelyTokenProxy.lockInfo(user2LockIds[2], user2Address);
//       const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
//       const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//       const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//
//       expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount1).add(amount2).toString());
//       expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount1).sub(amount2).toString());
//       expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//       expect(<LockState>status1).to.be.equal(LockState.CLAIMED);
//       expect(<LockState>status2).to.be.equal(LockState.CLAIMED);
//     });
//
//     // it("Should unlock token by anyone from user2 failed", async () => {
//     //   // given
//     //   const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//     //     lockId: user2LockIds[3],
//     //     account: user2Address,
//     //     reason: "Rollback",
//     //   };
//     //
//     //   // when
//     //   await expect(livelyTokenProxy.connect(admin).unlockToken(unlockRequest)).revertedWith("Access Denied");
//     //
//     //   // then
//     //   const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should unlock token by dao executor after claimed from user2 failed", async () => {
//     //   // given
//     //   const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//     //     lockId: user2LockIds[2],
//     //     account: user2Address,
//     //     reason: "Rollback",
//     //   };
//     //   const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);
//     //
//     //   // when
//     //   await expect(admin.sendTransaction({ to: daoExecutorForwarder.address, data })).to.revertedWith(
//     //     "Invalid Lock State"
//     //   );
//     //
//     //   // then
//     //   const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
//     // });
//     //
//     // it("Should unlock token by dao executor from user2 success", async () => {
//     //   // given
//     //   const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //   const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
//     //     lockId: user2LockIds[3],
//     //     account: user2Address,
//     //     reason: "Rollback",
//     //   };
//     //
//     //   const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);
//     //   const [amount, , , source] = await livelyTokenProxy.lockInfo(user2LockIds[3], user2Address);
//     //
//     //   // when
//     //   const transactionResponse = await admin.sendTransaction({ to: daoExecutorForwarder.address, data });
//     //   const txReceipt = await transactionResponse.wait(0);
//     //
//     //   // then
//     //   const logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[0]);
//     //   const eventUnlock: TokenUnlockedEventObject = <TokenUnlockedEventObject>(<unknown>logDesc.args);
//     //   const [, , , , status] = await livelyTokenProxy.lockInfo(user2LockIds[3], user2Address);
//     //   const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//     //   const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
//     //   const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
//     //
//     //   expect(eventUnlock.id).to.be.equal(user2LockIds[3]);
//     //   expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
//     //   expect(eventUnlock.account).to.be.equal(user2Address);
//     //   expect(eventUnlock.dest).to.be.equal(source);
//     //   expect(eventUnlock.amount).to.be.equal(amount);
//     //   expect(eventUnlock.reason).to.be.equal(unlockRequest.reason);
//     //
//     //   // and
//     //   expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.add(amount).toString());
//     //   expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount).toString());
//     //   expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.sub(amount).toString());
//     //   expect(<LockState>status).to.be.equal(LockState.UNLOCKED);
//     // });
//
//     it("Should unlock token by dao executor from user1 success", async () => {
//       // given
//       const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user1Address);
//       const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user1Address);
//       const unlockRequests: IERC20Lock.UnLockTokenRequestStruct[] = [
//         {
//           lockId: user1LockIds[0],
//           account: user1Address,
//           reason: "Rollback1",
//         },
//         {
//           lockId: user1LockIds[1],
//           account: user1Address,
//           reason: "Rollback2",
//         },
//       ];
//
//       // const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequests]);
//       const [amount1, , , source1] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
//       const [amount2, , , source2] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
//
//       // when
//       await expect(livelyTokenProxy.connect(assetAdmin).unlockToken(unlockRequests))
//         .to.emit(livelyTokenProxy, "TokenUnlocked")
//         .withArgs(user1LockIds[0], assetAdminAddress, user1Wallet.address, source1, amount1, unlockRequests[0].reason)
//         .to.emit(livelyTokenProxy, "TokenUnlocked")
//         .withArgs(user1LockIds[1], assetAdminAddress, user1Wallet.address, source2, amount2, unlockRequests[1].reason)
//       // const txReceipt = await transactionResponse.wait(0);
//
//       // // then
//       // let logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[0]);
//       // let eventUnlock: TokenUnlockedEventObject = <TokenUnlockedEventObject>(<unknown>logDesc.args);
//       //
//       // expect(eventUnlock.id).to.be.equal(user1LockIds[0]);
//       // expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
//       // expect(eventUnlock.account).to.be.equal(user1Address);
//       // expect(eventUnlock.dest).to.be.equal(source1);
//       // expect(eventUnlock.amount).to.be.equal(amount1);
//       // expect(eventUnlock.reason).to.be.equal(unlockRequests[0].reason);
//       //
//       // // and
//       // logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[1]);
//       // eventUnlock = <TokenUnlockedEventObject>(<unknown>logDesc.args);
//       //
//       // expect(eventUnlock.id).to.be.equal(user1LockIds[1]);
//       // expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
//       // expect(eventUnlock.account).to.be.equal(user1Address);
//       // expect(eventUnlock.dest).to.be.equal(source2);
//       // expect(eventUnlock.amount).to.be.equal(amount2);
//       // expect(eventUnlock.reason).to.be.equal(unlockRequests[1].reason);
//       //
//       // // and
//       // logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[2]);
//       // const batchEventUnlock: BatchTokenUnlockedEventObject = <BatchTokenUnlockedEventObject>(<unknown>logDesc.args);
//       //
//       // expect(batchEventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
//       // expect(batchEventUnlock.totalAmount).to.be.equal(amount1.add(amount2));
//
//       // and
//       const [, , , , status1] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
//       const [, , , , status2] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
//       const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
//       const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user1Address);
//       const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user1Address);
//
//       expect(assetManagerBalanceAfter.toString()).to.be.equal(
//         assetManagerBalanceBefore.add(amount1).add(amount2).toString()
//       );
//       expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.sub(amount1).sub(amount2).toString());
//       expect(user1TotalBalanceAfter.toString()).to.be.equal(
//         user1TotalBalanceBefore.sub(amount1).sub(amount2).toString()
//       );
//       expect(<LockState>status1).to.be.equal(LockState.UNLOCKED);
//       expect(<LockState>status2).to.be.equal(LockState.UNLOCKED);
//     });
//
//     it("Should support with correct interface success", async () => {
//       // given
//       const erc20InterfaceId = "0x942e8b22";
//       const erc20ExtraInterfaceId = "0xe3a31a9d";
//       const erc20PauseInterfaceId = "0xd711aa2a";
//       const erc20LockInterfaceId = "0xf6e40e00";
//
//       // when and then
//       expect(await livelyTokenProxy.supportsInterface(erc20InterfaceId)).to.be.true;
//       expect(await livelyTokenProxy.supportsInterface(erc20ExtraInterfaceId)).to.be.true;
//       expect(await livelyTokenProxy.supportsInterface(erc20PauseInterfaceId)).to.be.true;
//       expect(await livelyTokenProxy.supportsInterface(erc20LockInterfaceId)).to.be.true;
//     });
//   });
// });
