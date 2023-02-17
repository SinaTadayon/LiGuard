import { BigNumber, BytesLike, Signer, Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable camelcase,node/no-unpublished-import */
import {
  AccessControl,
  AccessControl__factory,
  ACLManager,
  ACLManager__factory,
  ACLManagerProxy__factory,
  ACLProxy__factory,
  AssetERC20,
  AssetERC20__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory,
  ContextManager,
  ContextManager__factory,
  DomainManager,
  DomainManager__factory,
  FunctionManager,
  FunctionManager__factory,
  GlobalManager,
  GlobalManager__factory,
  IACLManager,
  IAssetEntity,
  IAssetManagerERC20,
  IContextManagement,
  IDomainManagement,
  IERC20Extra,
  IFunctionManagement,
  IMemberManagement,
  IProxy,
  IRealmManagement,
  IRoleManagement,
  ITypeManagement,
  LACLCommons,
  LACLCommons__factory,
  LivelyToken,
  LivelyToken__factory,
  LProfileCommons,
  LProfileCommons__factory,
  LProfileRolePolicy,
  LProfileRolePolicy__factory,
  LTokenERC20__factory,
  MemberManager,
  MemberManager__factory,
  PolicyManager,
  PolicyManager__factory,
  ProfileAccessControl, ProfileAccessControl__factory,
  ProfileContextManager,
  ProfileContextManager__factory,
  ProfileDomainManager, ProfileDomainManager__factory,
  ProfileFunctionManager,
  ProfileFunctionManager__factory,
  ProfileGlobalManager, ProfileGlobalManager__factory,
  ProfileManager,
  ProfileManager__factory,
  ProfileMemberManager,
  ProfileMemberManager__factory,
  ProfilePolicyManager, ProfilePolicyManager__factory,
  ProfileRealmManager, ProfileRealmManager__factory,
  ProfileRoleManager,
  ProfileRoleManager__factory,
  ProfileTypeManager,
  ProfileTypeManager__factory,
  Proxy__factory,
  RealmManager,
  RealmManager__factory,
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
  AlterabilityStatus,
  AssetSafeModeStatus,
  AssetType,
  generateContextDomainSignatureManually,
  generateDomainSeparator,
  generatePredictContextDomainSignatureManually,
  LIVELY_PROFILE_ANY_TYPE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
  LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_ACL_DOMAIN_ID,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
  LockState,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus,
  ScopeType
} from "./TestUtils";
import { IERC20Lock } from "../../typechain/types/token/lively/LivelyToken";
/* eslint-disable node/no-extraneous-import */
import { TransactionRequest } from "@ethersproject/abstract-provider";
import {IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
import { MemberManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/MemberManager__factory";
import { RoleManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/RoleManager__factory";
import { TypeManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/TypeManager__factory";
import { FunctionManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/FunctionManager__factory";
import { ContextManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/ContextManager__factory";
import { RealmManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/RealmManager__factory";
import { DomainManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/DomainManager__factory";
import {
  GlobalManagerLibraryAddresses
} from "../../typechain/types/factories/acl/scope/GlobalManger.sol/GlobalManager__factory";
import { PolicyManagerLibraryAddresses } from "../../typechain/types/factories/acl/policy/PolicyManager__factory";
import { ProfileManagerLibraryAddresses } from "../../typechain/types/factories/acl/profile/ProfileManager__factory";
import {
  ProfileMemberManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileMemberManager__factory";
import {
  ProfileRoleManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileRoleManager__factory";
import {
  ProfileTypeManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileTypeManager__factory";
import {
  ProfileFunctionManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileFunctionManager__factory";
import {
  ProfileContextManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileContextManager__factory";
import {
  ProfileRealmManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileRealmManager__factory";
import {
  ProfileDomainManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileDomainManager__factory";
import {
  ProfileGlobalManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileGlobalManger.sol/ProfileGlobalManager__factory";
import {
  ProfilePolicyManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/policy/ProfilePolicyManager__factory";
const { provider, deployMockContract } = waffle;

describe("Asset Manager ERC20 Token Tests", function () {
  let livelyAdmin: Signer;
  let systemAdmin: Signer;
  let aclAdmin: Signer;
  let assetAdmin: Signer;
  let crowdFoundingManager: Signer;
  let validatorsRewardsManager: Signer;
  let publicSaleManager: Signer;
  let treasuryManager: Signer;
  let foundingTeamManager: Signer;
  let audioVideoProgramManager: Signer;
  let taxTreasuryManager: Signer;
  let user1: Signer;
  let user2: Signer;
  let user3: Signer;

  let livelyAdminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let aclAdminWallet: Wallet;
  let assetAdminWallet: Wallet;
  let crowdFoundingManagerWallet: Wallet;
  let validatorsRewardsManagerWallet: Wallet;
  let publicSaleManagerWallet: Wallet;
  let treasuryManagerWallet: Wallet;
  let foundingTeamManagerWallet: Wallet;
  let audioVideoProgramManagerWallet: Wallet;
  let taxTreasuryManagerWallet: Wallet;
  let userWallet1: Wallet;
  let userWallet2: Wallet;
  let userWallet3: Wallet;

  let livelyToken: LivelyToken;
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
  let profileManagerSubject: ProfileManager;
  let profileManagerProxy: ProfileManager;
  let profileManagerDelegateProxy: ProfileManager;
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
  let lACLCommons: LACLCommons;
  let lProfileCommons: LProfileCommons;
  let lProfileRolePolicy: LProfileRolePolicy;

  // acl libraries
  let linkCommonLibraryAddresses: unknown;

  // profiles libraries
  let linkProfileCommonLibraryAddresses: unknown;
  let linkProfileRolePolicyLibraryAddresses: unknown;

  // profile acl contracts
  let profileMemberManagerSubject: ProfileMemberManager;
  let profileMemberManagerProxy: ProfileMemberManager;
  let profileRoleManagerSubject: ProfileRoleManager;
  let profileRoleManagerProxy: ProfileRoleManager;
  let profileTypeManagerSubject: ProfileTypeManager;
  let profileTypeManagerProxy: ProfileTypeManager;
  let profileFunctionManagerSubject: ProfileFunctionManager;
  let profileFunctionManagerProxy: ProfileFunctionManager;
  let profileContextManagerSubject: ProfileContextManager;
  let profileContextManagerProxy: ProfileContextManager;
  let profileRealmManagerSubject: ProfileRealmManager;
  let profileRealmManagerProxy: ProfileRealmManager;
  let profileDomainManagerSubject: ProfileDomainManager;
  let profileDomainManagerProxy: ProfileDomainManager;
  let profileGlobalManagerSubject: ProfileGlobalManager;
  let profileGlobalManagerProxy: ProfileGlobalManager;
  let profilePolicyManagerSubject: ProfilePolicyManager;
  let profilePolicyManagerProxy: ProfilePolicyManager;
  let profileAccessControlSubject: ProfileAccessControl;
  let profileAccessControlProxy: ProfileAccessControl;

  // acl manager contract
  let aclManagerSubject: ACLManager;
  let aclManagerProxy: ACLManager;

  // main acl contracts name
  const MEMBER_MANAGER_CONTRACT_NAME = "MemberManager";
  const ROLE_MANAGER_CONTRACT_NAME = "RoleManager";
  const TYPE_MANAGER_CONTRACT_NAME = "TypeManager";
  const FUNCTION_MANAGER_CONTRACT_NAME = "FunctionManager";
  const CONTEXT_MANAGER_CONTRACT_NAME = "ContextManager";
  const REALM_MANAGER_CONTRACT_NAME = "RealmManager";
  const DOMAIN_MANAGER_CONTRACT_NAME = "DomainManager";
  const GLOBAL_MANAGER_CONTRACT_NAME = "GlobalManager";
  const POLICY_MANAGER_CONTRACT_NAME = "PolicyManager";
  const PROFILE_MANAGER_CONTRACT_NAME = "ProfileManager";
  const ACCESS_CONTROL_CONTRACT_NAME = "AccessControl";

  // profile acl contracts name
  const PROFILE_MEMBER_MANAGER_CONTRACT_NAME = "ProfileMemberManager";
  const PROFILE_ROLE_MANAGER_CONTRACT_NAME = "ProfileRoleManager";
  const PROFILE_TYPE_MANAGER_CONTRACT_NAME = "ProfileTypeManager";
  const PROFILE_FUNCTION_MANAGER_CONTRACT_NAME = "ProfileFunctionManager";
  const PROFILE_CONTEXT_MANAGER_CONTRACT_NAME = "ProfileContextManager";
  const PROFILE_REALM_MANAGER_CONTRACT_NAME = "ProfileRealmManager";
  const PROFILE_DOMAIN_MANAGER_CONTRACT_NAME = "ProfileDomainManager";
  const PROFILE_GLOBAL_MANAGER_CONTRACT_NAME = "ProfileGlobalManager";
  const PROFILE_POLICY_MANAGER_CONTRACT_NAME = "ProfilePolicyManager";
  const PROFILE_ACCESS_CONTROL_CONTRACT_NAME = "ProfileAccessControl";
  const ACL_MANAGER_CONTRACT_NAME = "ACLManager";
  const CONTRACTS_VERSION =  "3.0.0";

  const ACL_DOMAIN_TOKENS_NAME = "DOMAIN.LIVELY_VERSE.TOKENS";
  const ACL_REALM_LIVELY_TOKEN_ERC20_NAME = "REALM.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20";
  // const ACL_TYPE_TOKENS_MASTER_NAME = "TYPE.LIVELY_VERSE.TOKENS.MASTER"
  // const ACL_ROLE_TOKENS_MASTER_DOMAIN_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.MASTER_ADMIN";
  // const ACL_TYPE_LIVELY_TOKEN_ERC20_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MASTER"
  // const ACL_ROLE_LIVELY_TOKEN_ERC20_REALM_ADMIN_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MASTER_ADMIN";
  const ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER";
  const ACL_ROLE_LIVELY_TOKEN_MANAGER_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER_ADMIN";
  const ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.ASSET_MANAGER";
  const ACL_ROLE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.ASSET_MANAGER_ADMIN";
  const ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.AUDIO_VIDEO_PROGRAM_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.FOUNDING_TEAM_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TREASURY_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.PUBLIC_SALE_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.VALIDATORS_REWARDS_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.CROWD_FOUNDING_ASSET_ADMIN";
  const ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.TAX_TREASURY_ASSET_ADMIN";

  let aclDomainTokensId: string;
  let aclRealmLivelyTokenErc20Id: string;
  // let aclTypeTokensMasterId: string;
  // let aclRoleTokensMasterAdminId: string;
  // let aclTypeLivelyTokenErc20MasterId: string;
  // let aclRoleLivelyTokenErc20MasterAdminId: string;
  let aclTypeLivelyTokenManagerId: string;
  let aclRoleLivelyTokenManagerAdminId: string;
  let aclTypeLivelyTokenAssetManagerId: string;
  let aclRoleLivelyTokenAssetManagerAdminId: string;
  let aclRoleLivelyAudioVideoProgramAssetAdminId: string;
  let aclRoleLivelyFoundingTeamAssetAdminId: string;
  let aclRoleLivelyTreasuryAssetAdminId: string;
  let aclRoleLivelyPublicSaleAssetAdminId: string;
  let aclRoleLivelyValidatorRewardsAssetAdminId: string;
  let aclRoleLivelyCrowdFoundingAssetAdminId: string;
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
  const LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
  const LIVELY_FOUNDING_TEAM_ASSET_NAME = "LIVELY_FOUNDING_TEAM_ASSET";
  const LIVELY_TREASURY_ASSET_NAME = "LIVELY_TREASURY_ASSET";
  const LIVELY_PUBLIC_SALE_ASSET_NAME = "LIVELY_PUBLIC_SALE_ASSET";
  const LIVELY_VALIDATOR_REWARDS_ASSET_NAME = "LIVELY_VALIDATORS_REWARDS_ASSET";
  const LIVELY_CROWD_FOUNDING_ASSET_NAME = "LIVELY_CROWD_FOUNDING_ASSET";
  const LIVELY_TAX_TREASURY_ASSET_NAME = "LIVELY_TAX_TREASURY_ASSET";
  const ASSET_MANAGER_ERC20_NAME = "AssetManagerERC20";
  const assetManagerERC20Version = "3.0.0";

  const livelyTokenName = "LivelyToken";
  const livelyTokenVersion = "3.0.0";

  this.beforeAll(async () => {
    [
      livelyAdmin,
      systemAdmin,
      aclAdmin,
      assetAdmin,
      crowdFoundingManager,
      validatorsRewardsManager,
      publicSaleManager,
      treasuryManager,
      foundingTeamManager,
      audioVideoProgramManager,
      taxTreasuryManager,
      user1,
      user2,
      user3
    ] = await ethers.getSigners();
    [
      livelyAdminWallet,
      systemAdminWallet,
      aclAdminWallet,
      assetAdminWallet,
      crowdFoundingManagerWallet,
      validatorsRewardsManagerWallet,
      publicSaleManagerWallet,
      treasuryManagerWallet,
      foundingTeamManagerWallet,
      audioVideoProgramManagerWallet,
      taxTreasuryManagerWallet,
      userWallet1,
      userWallet2,
      userWallet3
    ] = waffle.provider.getWallets();
    networkChainId = await provider.send("eth_chainId", []);

    aclDomainTokensId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TOKENS_NAME));
    aclRealmLivelyTokenErc20Id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_LIVELY_TOKEN_ERC20_NAME));
    // aclTypeTokensMasterId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TOKENS_MASTER_NAME));
    // aclRoleTokensMasterAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TOKENS_MASTER_DOMAIN_ADMIN_NAME));
    // aclTypeLivelyTokenErc20MasterId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TOKEN_ERC20_NAME));
    // aclRoleLivelyTokenErc20MasterAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TOKEN_ERC20_REALM_ADMIN_NAME));
    aclTypeLivelyTokenAssetManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME));
    aclRoleLivelyTokenAssetManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_ADMIN_NAME));
    aclRoleLivelyAudioVideoProgramAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME));
    aclRoleLivelyFoundingTeamAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME));
    aclRoleLivelyTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TREASURY_ASSET_NAME));
    aclRoleLivelyPublicSaleAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME));
    aclRoleLivelyValidatorRewardsAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME));
    aclRoleLivelyCrowdFoundingAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME));
    aclRoleLivelyTaxTreasuryAssetAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME));

  });

  describe("ACL Manager Deployments", function() {
    it("ACL Deploy Libraries", async() => {
      // given
      const libFactory = new LACLCommons__factory(systemAdmin);
      const libFactory1 = new LProfileCommons__factory(systemAdmin);
      const libFactory2 = new LProfileRolePolicy__factory(systemAdmin);

      lACLCommons = await libFactory.deploy();
      lProfileCommons = await libFactory1.deploy();
      lProfileRolePolicy = await libFactory2.deploy();

      linkCommonLibraryAddresses = {
        "src/contracts/lib/acl/LACLCommons.sol:LACLCommons": lACLCommons.address
      }

      linkProfileCommonLibraryAddresses = {
        "src/contracts/lib/acl/LProfileCommons.sol:LProfileCommons": lProfileCommons.address
      }

      linkProfileRolePolicyLibraryAddresses = {
        "src/contracts/lib/acl/LProfileRolePolicy.sol:LProfileRolePolicy": lProfileRolePolicy.address
      }
    })

    it("ACL Deploy Subjects", async() => {
      // given
      const memberManagerFactory = new MemberManager__factory(<MemberManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const roleManagerFactory = new RoleManager__factory(<RoleManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const typeManagerFactory = new TypeManager__factory(<TypeManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const functionManagerFactory = new FunctionManager__factory(<FunctionManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const contextManagerFactory = new ContextManager__factory(<ContextManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const realmManagerFactory = new RealmManager__factory(<RealmManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const domainManagerFactory = new DomainManager__factory(<DomainManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const globalManagerFactory = new GlobalManager__factory(<GlobalManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const policyManagerFactory = new PolicyManager__factory(<PolicyManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const profileManagerFactory = new ProfileManager__factory(<ProfileManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
      const accessControlFactory = new AccessControl__factory(systemAdmin);

      // profile
      const profileMemberManagerFactory = new ProfileMemberManager__factory(<ProfileMemberManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileRoleManagerFactory = new ProfileRoleManager__factory(<ProfileRoleManagerLibraryAddresses>linkProfileRolePolicyLibraryAddresses, systemAdmin);
      const profileTypeManagerFactory = new ProfileTypeManager__factory(<ProfileTypeManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileFunctionManagerFactory = new ProfileFunctionManager__factory(<ProfileFunctionManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileContextManagerFactory = new ProfileContextManager__factory(<ProfileContextManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileRealmManagerFactory = new ProfileRealmManager__factory(<ProfileRealmManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileDomainManagerFactory = new ProfileDomainManager__factory(<ProfileDomainManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profileGlobalManagerFactory = new ProfileGlobalManager__factory(<ProfileGlobalManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
      const profilePolicyManagerFactory = new ProfilePolicyManager__factory(<ProfilePolicyManagerLibraryAddresses>linkProfileRolePolicyLibraryAddresses, systemAdmin);
      const profileAccessControlFactory = new ProfileAccessControl__factory(systemAdmin);

      // acl manager
      const aclManagerFactory = new ACLManager__factory(<ACLManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

      // when
      memberManagerSubject = await memberManagerFactory.deploy();
      roleManagerSubject = await roleManagerFactory.deploy();
      typeManagerSubject = await typeManagerFactory.deploy();
      functionManagerSubject = await functionManagerFactory.deploy();
      contextManagerSubject = await contextManagerFactory.deploy();
      realmManagerSubject = await realmManagerFactory.deploy();
      domainManagerSubject = await domainManagerFactory.deploy();
      globalManagerSubject = await globalManagerFactory.deploy();
      policyManagerSubject = await policyManagerFactory.deploy();
      profileManagerSubject = await profileManagerFactory.deploy();
      accessControlSubject = await accessControlFactory.deploy();

      // profile
      profileMemberManagerSubject = await profileMemberManagerFactory.deploy();
      profileRoleManagerSubject = await profileRoleManagerFactory.deploy();
      profileTypeManagerSubject = await profileTypeManagerFactory.deploy();
      profileFunctionManagerSubject = await profileFunctionManagerFactory.deploy();
      profileRealmManagerSubject = await profileRealmManagerFactory.deploy();
      profileContextManagerSubject = await profileContextManagerFactory.deploy();
      profileDomainManagerSubject = await profileDomainManagerFactory.deploy();
      profileGlobalManagerSubject = await profileGlobalManagerFactory.deploy();
      profilePolicyManagerSubject = await profilePolicyManagerFactory.deploy();
      profileAccessControlSubject = await profileAccessControlFactory.deploy();

      // acl manager
      aclManagerSubject = await aclManagerFactory.deploy();
    })

    it("ACL Deploy Proxies", async() => {
      const proxyFactory = new ACLManagerProxy__factory(systemAdmin);
      let iface = new ethers.utils.Interface(ACLManager__factory.abi);
      let data = iface.encodeFunctionData("initialize", [
        ACL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
      ]);
      const aclProxy = await proxyFactory.deploy(aclManagerSubject.address, data);
      await aclProxy.deployTransaction.wait();
      aclManagerProxy = aclManagerSubject.attach(aclProxy.address);

      // Member Manager
      iface = new ethers.utils.Interface(MemberManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        MEMBER_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      let proxy = await proxyFactory.deploy(memberManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      memberManagerProxy = memberManagerSubject.attach(proxy.address);

      // Role Manager
      iface = new ethers.utils.Interface(RoleManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ROLE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(roleManagerSubject.address, data);
      roleManagerProxy = roleManagerSubject.attach(proxy.address);

      // Type Manager
      iface = new ethers.utils.Interface(TypeManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        TYPE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(typeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      typeManagerProxy = typeManagerSubject.attach(proxy.address);

      // Function Manager
      iface = new ethers.utils.Interface(FunctionManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        FUNCTION_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(functionManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      functionManagerProxy = functionManagerSubject.attach(proxy.address);

      // Context Manager
      iface = new ethers.utils.Interface(ContextManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        CONTEXT_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(contextManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      contextManagerProxy = contextManagerSubject.attach(proxy.address);

      // Realm Manager
      iface = new ethers.utils.Interface(RealmManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        REALM_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(realmManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      realmManagerProxy = realmManagerSubject.attach(proxy.address);

      // Domain Manager
      iface = new ethers.utils.Interface(DomainManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        DOMAIN_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(domainManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      domainManagerProxy = domainManagerSubject.attach(proxy.address);

      // Global Manager
      iface = new ethers.utils.Interface(GlobalManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        GLOBAL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(globalManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      globalManagerProxy = globalManagerSubject.attach(proxy.address);

      // Policy Manager
      iface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        POLICY_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(policyManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      policyManagerProxy = policyManagerSubject.attach(proxy.address);

      // Profile Manager
      iface = new ethers.utils.Interface(ProfileManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileManagerProxy = profileManagerSubject.attach(proxy.address);

      // Access Control
      iface = new ethers.utils.Interface(AccessControl__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ACCESS_CONTROL_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(accessControlSubject.address, data);
      await proxy.deployTransaction.wait();
      accessControlProxy = accessControlSubject.attach(proxy.address);

      // Profile Member Manager
      iface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileMemberManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileMemberManagerProxy = profileMemberManagerSubject.attach(proxy.address);

      // Profile Role Manager
      iface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_ROLE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileRoleManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileRoleManagerProxy = profileRoleManagerSubject.attach(proxy.address);

      // Profile Type Manager
      iface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_TYPE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileTypeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileTypeManagerProxy = profileTypeManagerSubject.attach(proxy.address);

      // Profile Function Manager
      iface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileFunctionManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileFunctionManagerProxy = profileFunctionManagerSubject.attach(proxy.address);

      // Profile Context Manager
      iface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileContextManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileContextManagerProxy = profileContextManagerSubject.attach(proxy.address);

      // Profile Realm Manager
      iface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_REALM_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileRealmManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileRealmManagerProxy = profileRealmManagerSubject.attach(proxy.address);

      // Profile Domain Manager
      iface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileDomainManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileDomainManagerProxy = profileDomainManagerSubject.attach(proxy.address);

      // Profile Global Manager
      iface = new ethers.utils.Interface(ProfileGlobalManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_GLOBAL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileGlobalManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileGlobalManagerProxy = profileGlobalManagerSubject.attach(proxy.address);

      // Profile Policy Manager
      iface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_POLICY_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profilePolicyManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profilePolicyManagerProxy = profilePolicyManagerSubject.attach(proxy.address);

      // Profile Access Control
      iface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await proxyFactory.deploy(profileAccessControlSubject.address, data);
      await proxy.deployTransaction.wait();
      profileAccessControlProxy = profileAccessControlSubject.attach(proxy.address);
    })

    it("ACL Manager Initialize", async() => {
      // Acl Manager Init
      await aclManagerProxy.getFirstInit();
      await aclManagerProxy.connect(systemAdmin).initACL(
        contextManagerProxy.address,
        functionManagerProxy.address,
        livelyAdminWallet.address,
        systemAdminWallet.address
      );
    })

    it("ACL Facets Register ", async() => {
      // acl facets
      const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
      const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
      const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
      const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
      const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
      const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
      const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
      const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
      const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
      const profileIface = new ethers.utils.Interface(ProfileManager__factory.abi);
      const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
      const facetRequests: IACLManager.FacetRegisterRequestStruct[] = [
        {
          facetId: memberManagerProxy.address,
          subjectId: memberManagerSubject.address,
          selectors: [
            memberIface.getSighash("memberRegister"),
            memberIface.getSighash("memberUpdateActivityStatus"),
            memberIface.getSighash("memberUpdateAlterabilityStatus"),
            memberIface.getSighash("memberUpdateAdmin"),
            memberIface.getSighash("memberUpdateGeneralLimit"),
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
          subjectId: roleManagerSubject.address,
          selectors: [
            roleIface.getSighash("roleRegister"),
            roleIface.getSighash("roleGrantMembers"),
            roleIface.getSighash("roleRevokeMembers"),
            roleIface.getSighash("roleUpdateAdmin"),
            roleIface.getSighash("roleUpdateScope"),
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
          subjectId: typeManagerSubject.address,
          selectors: [
            typeIface.getSighash("typeRegister"),
            typeIface.getSighash("typeUpdateAdmin"),
            typeIface.getSighash("typeUpdateScope"),
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
          subjectId: policyManagerSubject.address,
          selectors: [
            policyIface.getSighash("policyRegister"),
            policyIface.getSighash("policyAddRoles"),
            policyIface.getSighash("policyRemoveRoles"),
            policyIface.getSighash("policyUpdateCodes"),
            policyIface.getSighash("policyUpdateAdmin"),
            policyIface.getSighash("policyUpdateScope"),
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
          facetId: profileManagerProxy.address,
          subjectId: profileManagerSubject.address,
          selectors: [
            profileIface.getSighash("profileRegister"),
            profileIface.getSighash("profileUpdateLimits"),
            profileIface.getSighash("profileUpdateExpiration"),
            profileIface.getSighash("profileUpdateOwnerAccount"),
            profileIface.getSighash("profileUpdateActivityStatus"),
            profileIface.getSighash("profileUpdateAlterabilityStatus"),
            profileIface.getSighash("profileUpdateAdmin"),
            profileIface.getSighash("profileCheckId"),
            profileIface.getSighash("profileCheckName"),
            profileIface.getSighash("profileCheckOwner"),
            profileIface.getSighash("profileCheckProfileAdmin"),
            profileIface.getSighash("profileCheckProfileSystemAdmin"),
            profileIface.getSighash("profileCheckAdmin"),
            profileIface.getSighash("profileGetProfileAccount"),
            profileIface.getSighash("profileGetAdmins"),
            profileIface.getSighash("profileGetInfo"),
          ]
        },
        {
          facetId: functionManagerProxy.address,
          subjectId: functionManagerSubject.address,
          selectors: [
            functionIface.getSighash("functionRegister"),
            functionIface.getSighash("functionUpdateAdmin"),
            functionIface.getSighash("functionUpdateAgent"),
            functionIface.getSighash("functionUpdateActivityStatus"),
            functionIface.getSighash("functionUpdateAlterabilityStatus"),
            functionIface.getSighash("functionUpdatePolicyCode"),
            functionIface.getSighash("functionCheckId"),
            functionIface.getSighash("functionCheckSelector"),
            functionIface.getSighash("functionCheckAdmin"),
            functionIface.getSighash("functionCheckAgent"),
            functionIface.getSighash("functionGetInfo"),
          ]
        },
        {
          facetId: contextManagerProxy.address,
          subjectId: contextManagerSubject.address,
          selectors: [
            contextIface.getSighash("contextRegister"),
            contextIface.getSighash("contextUpdateActivityStatus"),
            contextIface.getSighash("contextUpdateAlterabilityStatus"),
            contextIface.getSighash("contextUpdateAdmin"),
            contextIface.getSighash("contextUpdateFunctionLimit"),
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
          subjectId: realmManagerSubject.address,
          selectors: [
            realmIface.getSighash("realmRegister"),
            realmIface.getSighash("realmUpdateAdmin"),
            realmIface.getSighash("realmMoveContext"),
            realmIface.getSighash("realmUpdateActivityStatus"),
            realmIface.getSighash("realmUpdateAlterabilityStatus"),
            realmIface.getSighash("realmUpdateContextLimit"),
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
          subjectId: domainManagerSubject.address,
          selectors: [
            domainIface.getSighash("domainRegister"),
            domainIface.getSighash("domainUpdateActivityStatus"),
            domainIface.getSighash("domainUpdateAlterabilityStatus"),
            domainIface.getSighash("domainUpdateAdmin"),
            domainIface.getSighash("domainMoveRealm"),
            domainIface.getSighash("domainUpdateRealmLimit"),
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
          subjectId: globalManagerSubject.address,
          selectors: [
            globalIface.getSighash("globalUpdateActivityStatus"),
            globalIface.getSighash("globalUpdateAlterabilityStatus"),
            globalIface.getSighash("globalUpdateAdmin"),
            globalIface.getSighash("globalUpdateDomainLimit"),
            globalIface.getSighash("globalCheckAdmin"),
            globalIface.getSighash("globalGetDomains"),
            globalIface.getSighash("globalGetInfo"),
          ]
        },
        {
          facetId: accessControlProxy.address,
          subjectId: accessControlSubject.address,
          selectors: [
            accessControlIface.getSighash("hasAccess"),
            accessControlIface.getSighash("hasMemberAccess"),
            accessControlIface.getSighash("hasCSAccess"),
            accessControlIface.getSighash("hasAccountAccess"),
            accessControlIface.getSighash("getAnonymousType"),
            accessControlIface.getSighash("getAnyType"),
            accessControlIface.getSighash("getScopeMasterType"),
            accessControlIface.getSighash("getTypeMasterType"),
            accessControlIface.getSighash("getMemberMasterType"),
            accessControlIface.getSighash("getSystemMasterType"),
            accessControlIface.getSighash("getLivelyMasterType"),
            accessControlIface.getSighash("getPolicyMasterType"),
            accessControlIface.getSighash("getProfileMasterType"),
            accessControlIface.getSighash("getGlobalScope"),
            accessControlIface.getSighash("isAgentExist"),
            accessControlIface.getSighash("isScopeExist"),
            accessControlIface.getSighash("getScopeBaseInfo"),
            accessControlIface.getSighash("getAgentBaseInfo"),
            accessControlIface.getSighash("isScopesCompatible"),
          ]
        }
      ]
      await aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests)

      // profile facets
      const profileMemberIface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
      const profileRoleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
      const profileTypeIface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
      const profileFunctionIface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
      const profileContextIface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
      const profileRealmIface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
      const profileDomainIface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
      const profileGlobalIface = new ethers.utils.Interface(ProfileGlobalManager__factory.abi);
      const profilePolicyIface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
      const profileAccessControlIface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
      const profileFacetRequests: IACLManager.FacetRegisterRequestStruct[] = [
        {
          facetId: profileMemberManagerProxy.address,
          subjectId: profileMemberManagerSubject.address,
          selectors: [
            profileMemberIface.getSighash("profileMemberRegister"),
            profileMemberIface.getSighash("profileMemberUpdateTypeLimit"),
            profileMemberIface.getSighash("profileMemberUpdateRegisterLimit"),
            profileMemberIface.getSighash("profileMemberUpdateCallLimit"),
            profileMemberIface.getSighash("profileMemberUpdateActivityStatus"),
            profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus"),
            profileMemberIface.getSighash("profileMemberUpdateAdmin"),
            profileMemberIface.getSighash("profileMemberCheckId"),
            profileMemberIface.getSighash("profileMemberCheckAccount"),
            profileMemberIface.getSighash("profileMemberCheckAdmin"),
            profileMemberIface.getSighash("profileMemberHasType"),
            profileMemberIface.getSighash("profileMemberGetTypes"),
            profileMemberIface.getSighash("profileMemberGetInfo")
          ]
        },
        {
          facetId: profileRoleManagerProxy.address,
          subjectId: profileRoleManagerSubject.address,
          selectors: [
            profileRoleIface.getSighash("profileRoleRegister"),
            profileRoleIface.getSighash("profileRoleGrantMembers"),
            profileRoleIface.getSighash("profileRoleRevokeMembers"),
            profileRoleIface.getSighash("profileRoleUpdateAdmin"),
            profileRoleIface.getSighash("profileRoleUpdateScope"),
            profileRoleIface.getSighash("profileRoleUpdateActivityStatus"),
            profileRoleIface.getSighash("profileRoleUpdateAlterabilityStatus"),
            profileRoleIface.getSighash("profileRoleUpdateMemberLimit"),
            profileRoleIface.getSighash("profileRoleCheckId"),
            profileRoleIface.getSighash("profileRoleCheckName"),
            profileRoleIface.getSighash("profileRoleCheckAdmin"),
            profileRoleIface.getSighash("profileRoleHasAccount"),
            profileRoleIface.getSighash("profileRoleGetInfo")
          ]
        },
        {
          facetId: profileTypeManagerProxy.address,
          subjectId: profileTypeManagerSubject.address,
          selectors: [
            profileTypeIface.getSighash("profileTypeRegister"),
            profileTypeIface.getSighash("profileTypeUpdateAdmin"),
            profileTypeIface.getSighash("profileTypeUpdateScope"),
            profileTypeIface.getSighash("profileTypeUpdateActivityStatus"),
            profileTypeIface.getSighash("profileTypeUpdateAlterabilityStatus"),
            profileTypeIface.getSighash("profileTypeUpdateRoleLimit"),
            profileTypeIface.getSighash("profileTypeCheckId"),
            profileTypeIface.getSighash("profileTypeCheckName"),
            profileTypeIface.getSighash("profileTypeCheckAdmin"),
            profileTypeIface.getSighash("profileTypeHasAccount"),
            profileTypeIface.getSighash("profileTypeHasRole"),
            profileTypeIface.getSighash("profileTypeGetRoles"),
            profileTypeIface.getSighash("profileTypeGetInfo"),
          ]
        },
        {
          facetId: profilePolicyManagerProxy.address,
          subjectId: profilePolicyManagerSubject.address,
          selectors: [
            profilePolicyIface.getSighash("profilePolicyRegister"),
            profilePolicyIface.getSighash("profilePolicyAddRoles"),
            profilePolicyIface.getSighash("profilePolicyRemoveRoles"),
            profilePolicyIface.getSighash("profilePolicyUpdateCodes"),
            profilePolicyIface.getSighash("profilePolicyUpdateAdmin"),
            profilePolicyIface.getSighash("profilePolicyUpdateScope"),
            profilePolicyIface.getSighash("profilePolicyUpdateActivityStatus"),
            profilePolicyIface.getSighash("profilePolicyUpdateAlterabilityStatus"),
            profilePolicyIface.getSighash("profilePolicyUpdateRoleLimit"),
            profilePolicyIface.getSighash("profilePolicyCheckId"),
            profilePolicyIface.getSighash("profilePolicyCheckName"),
            profilePolicyIface.getSighash("profilePolicyCheckAdmin"),
            profilePolicyIface.getSighash("profilePolicyCheckRole"),
            profilePolicyIface.getSighash("profilePolicyCheckAccess"),
            profilePolicyIface.getSighash("profilePolicyCheckRoleAccess"),
            profilePolicyIface.getSighash("profilePolicyHasRole"),
            profilePolicyIface.getSighash("profilePolicyGetInfoByRole"),
            profilePolicyIface.getSighash("profilePolicyGetInfo"),
            profilePolicyIface.getSighash("profilePolicyGetRoles")
          ]
        },
        {
          facetId: profileFunctionManagerProxy.address,
          subjectId: profileFunctionManagerSubject.address,
          selectors: [
            profileFunctionIface.getSighash("profileFunctionRegister"),
            profileFunctionIface.getSighash("profileFunctionUpdateAdmin"),
            profileFunctionIface.getSighash("profileFunctionUpdateAgent"),
            profileFunctionIface.getSighash("profileFunctionUpdateActivityStatus"),
            profileFunctionIface.getSighash("profileFunctionUpdateAlterabilityStatus"),
            profileFunctionIface.getSighash("profileFunctionUpdatePolicyCode"),
            profileFunctionIface.getSighash("profileFunctionCheckId"),
            profileFunctionIface.getSighash("profileFunctionCheckSelector"),
            profileFunctionIface.getSighash("profileFunctionCheckAdmin"),
            profileFunctionIface.getSighash("profileFunctionCheckAgent"),
            profileFunctionIface.getSighash("profileFunctionGetInfo"),
          ]
        },
        {
          facetId: profileContextManagerProxy.address,
          subjectId: profileContextManagerSubject.address,
          selectors: [
            profileContextIface.getSighash("profileContextRegister"),
            profileContextIface.getSighash("profileContextUpdateActivityStatus"),
            profileContextIface.getSighash("profileContextUpdateAlterabilityStatus"),
            profileContextIface.getSighash("profileContextUpdateAdmin"),
            profileContextIface.getSighash("profileContextUpdateFunctionLimit"),
            profileContextIface.getSighash("profileContextCheckId"),
            profileContextIface.getSighash("profileContextCheckAccount"),
            profileContextIface.getSighash("profileContextCheckAdmin"),
            profileContextIface.getSighash("profileContextHasFunction"),
            profileContextIface.getSighash("profileContextHasSelector"),
            profileContextIface.getSighash("profileContextGetFunctions"),
            profileContextIface.getSighash("profileContextGetInfo")
          ]
        },
        {
          facetId: profileRealmManagerProxy.address,
          subjectId: profileRealmManagerSubject.address,
          selectors: [
            profileRealmIface.getSighash("profileRealmRegister"),
            profileRealmIface.getSighash("profileRealmUpdateAdmin"),
            profileRealmIface.getSighash("profileRealmMoveContext"),
            profileRealmIface.getSighash("profileRealmUpdateActivityStatus"),
            profileRealmIface.getSighash("profileRealmUpdateAlterabilityStatus"),
            profileRealmIface.getSighash("profileRealmUpdateContextLimit"),
            profileRealmIface.getSighash("profileRealmCheckId"),
            profileRealmIface.getSighash("profileRealmCheckName"),
            profileRealmIface.getSighash("profileRealmCheckAdmin"),
            profileRealmIface.getSighash("profileRealmHasFunction"),
            profileRealmIface.getSighash("profileRealmHasContext"),
            profileRealmIface.getSighash("profileRealmGetContexts"),
            profileRealmIface.getSighash("profileRealmGetInfo")
          ]
        },
        {
          facetId: profileDomainManagerProxy.address,
          subjectId: profileDomainManagerSubject.address,
          selectors: [
            profileDomainIface.getSighash("profileDomainRegister"),
            profileDomainIface.getSighash("profileDomainUpdateActivityStatus"),
            profileDomainIface.getSighash("profileDomainUpdateAlterabilityStatus"),
            profileDomainIface.getSighash("profileDomainUpdateAdmin"),
            profileDomainIface.getSighash("profileDomainMoveRealm"),
            profileDomainIface.getSighash("profileDomainUpdateRealmLimit"),
            profileDomainIface.getSighash("profileDomainCheckId"),
            profileDomainIface.getSighash("profileDomainCheckName"),
            profileDomainIface.getSighash("profileDomainCheckAdmin"),
            profileDomainIface.getSighash("profileDomainHasFunction"),
            profileDomainIface.getSighash("profileDomainHasContext"),
            profileDomainIface.getSighash("profileDomainHasRealm"),
            profileDomainIface.getSighash("profileDomainGetRealms"),
            profileDomainIface.getSighash("profileDomainGetInfo")
          ]
        },
        {
          facetId: profileGlobalManagerProxy.address,
          subjectId: profileGlobalManagerSubject.address,
          selectors: [
            profileGlobalIface.getSighash("profileGlobalUpdateActivityStatus"),
            profileGlobalIface.getSighash("profileGlobalUpdateAlterabilityStatus"),
            profileGlobalIface.getSighash("profileGlobalUpdateAdmin"),
            profileGlobalIface.getSighash("profileGlobalUpdateDomainLimit"),
            profileGlobalIface.getSighash("profileGlobalCheckAdmin"),
            profileGlobalIface.getSighash("profileGlobalGetDomains"),
            profileGlobalIface.getSighash("profileGlobalGetInfo")
          ]
        },
        {
          facetId: profileAccessControlProxy.address,
          subjectId: profileAccessControlSubject.address,
          selectors: [
            profileAccessControlIface.getSighash("profileHasAccess"),
            profileAccessControlIface.getSighash("profileHasMemberAccess"),
            profileAccessControlIface.getSighash("profileAclHasMemberAccess"),
            profileAccessControlIface.getSighash("profileHasCSAccess"),
            profileAccessControlIface.getSighash("profileHasAccountAccess"),
            profileAccessControlIface.getSighash("profileAnonymousType"),
            profileAccessControlIface.getSighash("profileAnyType"),
            profileAccessControlIface.getSighash("profileSystemMasterType"),
            profileAccessControlIface.getSighash("profileMasterType"),
            profileAccessControlIface.getSighash("profileGlobalScope"),
            profileAccessControlIface.getSighash("profileIsAgentExist"),
            profileAccessControlIface.getSighash("profileIsScopeExist"),
            profileAccessControlIface.getSighash("profileScopeBaseInfo"),
            profileAccessControlIface.getSighash("profileAgentBaseInfo"),
            profileAccessControlIface.getSighash("profileIsScopesCompatible")
          ]
        }
      ]
      await aclManagerProxy.connect(systemAdmin).aclRegisterFacet(profileFacetRequests)
    })

    it("ACL Contexts Register ", async() => {
      // acl contexts
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
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
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
          functionLimit: 32,
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
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
      ];
      await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests)

      // attach proxies to aclManager
      functionManagerDelegateProxy = functionManagerProxy.attach(aclManagerProxy.address);
      contextManagerDelegateProxy = contextManagerProxy.attach(aclManagerProxy.address);
      realmManagerDelegateProxy = realmManagerProxy.attach(aclManagerProxy.address);
      domainManagerDelegateProxy = domainManagerProxy.attach(aclManagerProxy.address);
      globalManagerDelegateProxy = globalManagerProxy.attach(aclManagerProxy.address);
      policyManagerDelegateProxy = policyManagerProxy.attach(aclManagerProxy.address);
      profileManagerDelegateProxy = profileManagerProxy.attach(aclManagerProxy.address);
      accessControlDelegateProxy = accessControlProxy.attach(aclManagerProxy.address);
      memberManagerDelegateProxy = memberManagerProxy.attach(aclManagerProxy.address);
      roleManagerDelegateProxy = roleManagerProxy.attach(aclManagerProxy.address);
      typeManagerDelegateProxy = typeManagerProxy.attach(aclManagerProxy.address);

      // acl profile contexts
      const profileContextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileMemberManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_ROLE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileRoleManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: -1,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_TYPE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileTypeManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileFunctionManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileContextManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_REALM_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileRealmManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileDomainManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_GLOBAL_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileGlobalManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_POLICY_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profilePolicyManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
        {
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          salt: ethers.constants.HashZero,
          name: PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileAccessControlProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          functionLimit: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPGRADABLE,
          signature: new Int8Array(0)
        },
      ];
      await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(profileContextRequests)

    })

    it("ACL Functions Register ", async() => {
      // Member functions
      const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
      const memberFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: memberIface.getSighash("memberRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateActivityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector:  memberIface.getSighash("memberUpdateGeneralLimit"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: memberIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: memberIface.getSighash("withdrawBalance"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const memberFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: memberManagerProxy.address,
          functions: memberFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberFunctionRegisterRequest)

      // Role functions
      const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
      const roleFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleGrantMembers"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleRevokeMembers"),
          policyCode: 120,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateScope"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateActivityStatus"),
          policyCode: 100,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: roleIface.getSighash("roleUpdateMemberLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: roleIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: roleIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const roleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: roleManagerProxy.address,
          functions: roleFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionRegisterRequest)

      // Type functions
      const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
      const typeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
          selector: typeIface.getSighash("typeRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateScope"),
          policyCode: 56,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateActivityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: typeIface.getSighash("typeUpdateRoleLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("setLocalAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: typeIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: typeIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const typeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: typeManagerProxy.address,
          functions: typeFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(typeFunctionRegisterRequest)

      // Function functions
      const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
      const functionFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAgent"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: functionIface.getSighash("functionUpdatePolicyCode"),
          policyCode: 56,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: functionIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: functionIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const functionFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: functionManagerProxy.address,
          functions: functionFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(functionFunctionRegisterRequest)

      // Context functions
      const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
      const contextFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: contextIface.getSighash("contextUpdateFunctionLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: contextIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: contextIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const contextFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: contextManagerProxy.address,
          functions: contextFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(contextFunctionRegisterRequest)

      // Realm functions
      const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
      const realmFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
          selector: realmIface.getSighash("realmRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmUpdateContextLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: realmIface.getSighash("realmMoveContext"),
          policyCode: 36,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: realmIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: realmIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const realmFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: realmManagerProxy.address,
          functions: realmFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(realmFunctionRegisterRequest)

      // Domain functions
      const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
      const domainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
          selector: domainIface.getSighash("domainRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainUpdateRealmLimit"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: domainIface.getSighash("domainMoveRealm"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: domainIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: domainIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const domainFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: domainManagerProxy.address,
          functions: domainFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(domainFunctionRegisterRequest)

      // Global functions
      const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
      const globalFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateActivityStatus"),
          policyCode: 48,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateAlterabilityStatus"),
          policyCode: 30,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("globalUpdateDomainLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: globalIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: globalIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const globalFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: globalManagerProxy.address,
          functions: globalFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(globalFunctionRegisterRequest)

      // Acl Manager functions
      const aclManagerIface = new ethers.utils.Interface(ACLManager__factory.abi);
      const aclManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("aclRegisterFacet"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("aclUpgradeFacet"),
          policyCode: 255,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          selector: aclManagerIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: aclManagerIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const aclManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: aclManagerProxy.address,
          functions: aclManagerFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(aclManagerFunctionRegisterRequest)

      // Access Control functions
      const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
      const accessControlFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: accessControlIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: accessControlIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const accessControlFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: accessControlProxy.address,
          functions: accessControlFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(accessControlFunctionRegisterRequest)

      // Policy functions
      const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
      const policyFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
          selector: policyIface.getSighash("policyRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyAddRoles"),
          policyCode: 100,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyRemoveRoles"),
          policyCode: 150,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateCodes"),
          policyCode: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateScope"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: policyIface.getSighash("policyUpdateRoleLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: policyIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: policyIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const policyFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: policyManagerProxy.address,
          functions: policyFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(policyFunctionRegisterRequest)

      // Profile Manager functions
      const profileIface = new ethers.utils.Interface(ProfileManager__factory.abi);
      const profileManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          selector: profileIface.getSighash("profileRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateLimits"),
          policyCode: 100,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateExpiration"),
          policyCode: 150,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateOwnerAccount"),
          policyCode: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: profileIface.getSighash("profileUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileManagerProxy.address,
          functions: profileManagerFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileManagerFunctionRegisterRequest)


      // Profile Member functions
      const profileMemberIface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
      const profileMemberFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateTypeLimit"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateRegisterLimit"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateCallLimit"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateActivityStatus"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector:  profileMemberIface.getSighash("profileMemberUpdateAdmin"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileMemberIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileMemberIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileMemberIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileMemberIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileMemberIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileMemberIface.getSighash("withdrawBalance"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileMemberFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileMemberManagerProxy.address,
          functions: profileMemberFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileMemberFunctionRegisterRequest)

      // Profile Type functions
      const profileRoleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
      const profileRoleFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleGrantMembers"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleRevokeMembers"),
          policyCode: 120,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleUpdateScope"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleUpdateActivityStatus"),
          policyCode: 100,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRoleIface.getSighash("profileRoleUpdateMemberLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRoleIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRoleIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRoleIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRoleIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRoleIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRoleIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileRoleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileRoleManagerProxy.address,
          functions: profileRoleFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileRoleFunctionRegisterRequest)

      // Profile Type functions
      const profileTypeIface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
      const profileTypeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeUpdateScope"),
          policyCode: 56,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeUpdateActivityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileTypeIface.getSighash("profileTypeUpdateRoleLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileTypeIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileTypeIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileTypeIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileTypeIface.getSighash("setLocalAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileTypeIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileTypeIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileTypeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileTypeManagerProxy.address,
          functions: profileTypeFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileTypeFunctionRegisterRequest)

      // Profile Function funtions
      const profileFunctionIface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
      const profileFunctionFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionUpdateAgent"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileFunctionIface.getSighash("profileFunctionUpdatePolicyCode"),
          policyCode: 56,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileFunctionIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileFunctionIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileFunctionIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileFunctionIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileFunctionIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileFunctionIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileFunctionManagerProxy.address,
          functions: profileFunctionFunctionRequests
        }
      ]
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileFunctionRegisterRequest))

      // Profile Context functions
      const profileContextIface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
      const profileContextFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
          selector: profileContextIface.getSighash("profileContextRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileContextIface.getSighash("profileContextUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileContextIface.getSighash("profileContextUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileContextIface.getSighash("profileContextUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileContextIface.getSighash("profileContextUpdateFunctionLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileContextIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileContextIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileContextIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileContextIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileContextIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileContextIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileContextFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileContextManagerProxy.address,
          functions: profileContextFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileContextFunctionRegisterRequest)

      // Profile Realm functions
      const profileRealmIface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
      const profileRealmFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmUpdateContextLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileRealmIface.getSighash("profileRealmMoveContext"),
          policyCode: 36,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRealmIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRealmIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRealmIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRealmIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileRealmIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileRealmIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileRealmFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileRealmManagerProxy.address,
          functions: profileRealmFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileRealmFunctionRegisterRequest)

      // Profile Domain functions
      const profileDomainIface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
      const profileDomainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainUpdateActivityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainUpdateAlterabilityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainUpdateRealmLimit"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileDomainIface.getSighash("profileDomainMoveRealm"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileDomainIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileDomainIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileDomainIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileDomainIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileDomainIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileDomainIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileDomainFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileDomainManagerProxy.address,
          functions: profileDomainFunctionRequests
        }
      ]
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileDomainFunctionRegisterRequest))

      // Profile Global functions
      const profileGlobalIface = new ethers.utils.Interface(ProfileGlobalManager__factory.abi);
      const profileGlobalFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("profileGlobalUpdateActivityStatus"),
          policyCode: 48,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("profileGlobalUpdateAlterabilityStatus"),
          policyCode: 30,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("profileGlobalUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("profileGlobalUpdateDomainLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileGlobalIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileGlobalIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileGlobalIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileGlobalIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileGlobalFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileGlobalManagerProxy.address,
          functions: profileGlobalFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileGlobalFunctionRegisterRequest);

      // Profile Access Control functions
      const profileAccessControlIface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
      const profileAccessControlFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileAccessControlIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileAccessControlIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileAccessControlIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileAccessControlIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileAccessControlIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profileAccessControlIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileAccessControlFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileAccessControlProxy.address,
          functions: profileAccessControlFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileAccessControlFunctionRegisterRequest)

      // Profile Policy functions
      const profilePolicyIface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
      const profilePolicyFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyRegister"),
          policyCode: 250,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyAddRoles"),
          policyCode: 100,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyRemoveRoles"),
          policyCode: 150,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateCodes"),
          policyCode: 32,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateScope"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateActivityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateAlterabilityStatus"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profilePolicyIface.getSighash("profilePolicyUpdateRoleLimit"),
          policyCode: 36,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profilePolicyIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profilePolicyIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profilePolicyIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profilePolicyIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profilePolicyIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_ACL_TYPE_ID,
          selector: profilePolicyIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profilePolicyFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profilePolicyManagerProxy.address,
          functions: profilePolicyFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profilePolicyFunctionRegisterRequest)
    })
  })

  describe("Setup ACL Manager for Lively Token and Asset Manager ", function() {

    it("Should register ACL_DOMAIN_TOKENS_NAME domain success", async() => {
      // given
      const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          realmLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_DOMAIN_TOKENS_NAME
        }
      ]

      // when
      await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(requests)).
      to.emit(domainManagerDelegateProxy, "DomainRegistered")
        .withArgs(livelyAdminWallet.address, aclDomainTokensId ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register ACL_REALM_LIVELY_TOKEN_ERC20_NAME Realm success", async() => {
      // given
      const requests: IRealmManagement.RealmRegisterRequestStruct[] = [
        {
          domainId: aclDomainTokensId,
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          contextLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_REALM_LIVELY_TOKEN_ERC20_NAME
        }
      ]

      // when
      await expect(realmManagerDelegateProxy.connect(systemAdmin).realmRegister(requests)).
      to.emit(realmManagerDelegateProxy, "RealmRegistered")
        .withArgs(systemAdminWallet.address, aclRealmLivelyTokenErc20Id , aclDomainTokensId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register token types success", async() => {
      // given
      const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          scopeId: aclRealmLivelyTokenErc20Id,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME,
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          scopeId: aclRealmLivelyTokenErc20Id,
          roleLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.DISABLED,
          name: ACL_TYPE_LIVELY_TOKEN_ERC20_ASSET_MANAGER_NAME,
        },
      ]

      // when
      await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(typeRegisterRequests))
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenAssetManagerId, aclRealmLivelyTokenErc20Id,
          LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
        .to.emit(typeManagerDelegateProxy, "TypeRegistered")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenManagerId, aclRealmLivelyTokenErc20Id,
          LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register tokens Roles success", async() => {
      // given
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
          name: ACL_ROLE_LIVELY_TOKEN_MANAGER_ADMIN_NAME
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(roleRegisterRequests))
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTokenAssetManagerAdminId, aclTypeLivelyTokenAssetManagerId,
          LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTokenManagerAdminId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, aclRealmLivelyTokenErc20Id)
    })

    it("Should register AssetAdmin member to RoleLivelyTokenAssetManagerAdmin success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
        {
          adminId: ethers.constants.HashZero,
          roleId: aclRoleLivelyTokenAssetManagerAdminId,
          account: assetAdminWallet.address,
          limits: {
            memberLimit: 16777216,
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

      // when
      await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(livelyAdminWallet.address, assetAdminId, assetAdminWallet.address, aclRoleLivelyTokenAssetManagerAdminId)
    })

    it("Should grants AssetAdmin to itself and major roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const roleGrantRequests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
        {
          roleId: aclRoleLivelyTokenManagerAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
          members: [ assetAdminWallet.address ]
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(roleGrantRequests))
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTokenManagerAdminId, assetAdminId, aclTypeLivelyTokenManagerId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID, assetAdminId, LIVELY_VERSE_TYPE_MASTER_TYPE_ID)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID, assetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID, assetAdminId, LIVELY_VERSE_POLICY_MASTER_TYPE_ID)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID, assetAdminId, LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)
    })

    it("Should updateAdmin of LivelyTokenErc20 realm to LivelyTokenAssetManagerAdmin success", async() => {
      // given
      const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
        id: aclRealmLivelyTokenErc20Id,
        adminId: aclRoleLivelyTokenAssetManagerAdminId
      }]

      // when
      await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(updateAdminRequests))
        .to.emit(realmManagerDelegateProxy, "RealmAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclRealmLivelyTokenErc20Id, aclRoleLivelyTokenAssetManagerAdminId);
    })

    it("Should updateAdmin of tokens types success", async() => {
      // given
      const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [
        {
          id: aclTypeLivelyTokenManagerId,
          adminId: aclRoleLivelyTokenManagerAdminId
        },
        {
          id: aclTypeLivelyTokenAssetManagerId,
          adminId: aclRoleLivelyTokenAssetManagerAdminId
        }
      ]

      // when
      await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(updateAdminRequests))
        .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenManagerId, aclRoleLivelyTokenManagerAdminId)
        .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenAssetManagerId, aclRoleLivelyTokenAssetManagerAdminId)
    })

    // it("Should updateAdmin of tokens roles success", async() => {
    //   // given
    //   const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [
    //     {
    //       id: aclRoleLivelyTokenAssetManagerAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyTokenManagerAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyAudioVideoProgramAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyFoundingTeamAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyTreasuryAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyPublicSaleAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyValidatorRewardsAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyCrowdFoundingAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //     {
    //       id: aclRoleLivelyTaxTreasuryAssetAdminId,
    //       adminId: aclRoleLivelyTokenAssetManagerAdminId,
    //     },
    //   ]
    //
    //   // when
    //   await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAdmin(updateAdminRequests))
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyTokenAssetManagerAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyTokenManagerAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    //     .to.emit(typeManagerDelegateProxy, "RoleAdminUpdated")
    //     .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    // })

    it("Should register assets roles success", async() => {
      // given
      const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_FOUNDING_TEAM_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_CROWD_FOUNDING_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_VALIDATOR_REWARDS_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_TAX_TREASURY_ASSET_NAME
        },
        {
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
          scopeId: aclRealmLivelyTokenErc20Id,
          typeId: aclTypeLivelyTokenAssetManagerId,
          memberLimit: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_ROLE_LIVELY_TREASURY_ASSET_NAME
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(roleRegisterRequests))
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
    })

    it("Should grants AssetAdmin to asset roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const roleGrantRequests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
        {
          roleId: aclRoleLivelyAudioVideoProgramAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyFoundingTeamAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyTreasuryAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyPublicSaleAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyValidatorRewardsAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyCrowdFoundingAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
        {
          roleId: aclRoleLivelyTaxTreasuryAssetAdminId,
          members: [ assetAdminWallet.address ]
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(roleGrantRequests))
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
        .withArgs(livelyAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, assetAdminId, aclRoleLivelyTokenAssetManagerAdminId)
    })

    it("Should registers members to related roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
      const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
        {
          roleId: aclRoleLivelyAudioVideoProgramAssetAdminId,
          account: audioVideoProgramManagerWallet.address,
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
        {
          roleId: aclRoleLivelyPublicSaleAssetAdminId,
          account: publicSaleManagerWallet.address,
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
        {
          roleId: aclRoleLivelyTreasuryAssetAdminId,
          account: treasuryManagerWallet.address,
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
        {
          roleId: aclRoleLivelyValidatorRewardsAssetAdminId,
          account: validatorsRewardsManagerWallet.address,
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
        {
          roleId: aclRoleLivelyCrowdFoundingAssetAdminId,
          account: crowdFoundingManagerWallet.address,
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
        {
          roleId: aclRoleLivelyFoundingTeamAssetAdminId,
          account: foundingTeamManagerWallet.address,
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
        {
          roleId: aclRoleLivelyTaxTreasuryAssetAdminId,
          account: taxTreasuryManagerWallet.address,
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
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
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
        .withArgs(assetAdminWallet.address, assetAdminId, taxTreasuryManagerWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId)
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
        .withArgs(systemAdminWallet.address, livelyToken.address, livelyTokenSubject.address)
        .to.emit(livelyToken, "LocalAdminChanged")
        .withArgs(systemAdminWallet.address, livelyToken.address, systemAdminWallet.address)
        .to.emit(livelyToken, "Initialized")
        .withArgs(
          systemAdminWallet.address,
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
      expect(await livelyToken.contractName()).to.be.equal(livelyTokenName);
      expect(await livelyToken.contractVersion()).to.be.equal(livelyTokenVersion);
      expect(await livelyToken.subjectAddress()).to.be.equal(livelyTokenSubject.address);
      expect(await livelyToken.accessControlManager()).to.be.equal(aclManagerProxy.address);
      expect(await livelyToken.localAdmin()).to.be.equal(systemAdminWallet.address);
      expect(await livelyToken.domainSeparator()).to.be.equal(domainSeparator);
      expect(await livelyToken.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
      expect(await livelyToken.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
      expect(await livelyToken.initVersion()).to.be.equal(1)
      expect(await livelyToken.getLibrary()).to.be.equal(lTokenERC20.address)
    });

    it("Should register LivelyToken context by systemAdmin success", async() => {
      // given
      const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
      const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: aclRealmLivelyTokenErc20Id,
          adminId: aclTypeLivelyTokenAssetManagerId,
          salt: ethers.constants.HashZero,
          name: livelyTokenName,
          version: livelyTokenVersion,
          contractId: livelyToken.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
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
          aclRealmLivelyTokenErc20Id, systemAdminWallet.address, ethers.constants.AddressZero,
          ethers.constants.AddressZero, aclTypeLivelyTokenAssetManagerId)
    })

    it("Should register LivelyToken functions by systemAdmin success", async() => {
      // given
      const livelyTokenIface = new ethers.utils.Interface(LivelyToken__factory.abi);
      const livelyTokenContextId = ethers.utils.keccak256(livelyToken.address);
      const signer = new Int8Array(0);

      const transferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyToken.address,  livelyTokenIface.getSighash("transfer")]));
      const transferFromFunctionId = ethers.utils.keccak256(
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
          agentId: aclTypeLivelyTokenAssetManagerId,
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
        realmId: new Int8Array(0),
        salt: new Int8Array(0),
        name: "",
        version: "",
        subject: "",
        deployer: "",
        contractId: livelyToken.address,
        functions: livelyTokenFunctionRequests,
      }]


      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(livelyTokenFunctionRegisterRequest))
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFromFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, approveFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFromFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, permitFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, increaseAllowanceFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, decreaseAllowanceFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, claimTokenFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, burnFunctionId, aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, mintFunctionId,aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxRateFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId, signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxWhitelistFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId, signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseAllFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseAllFunctionId, aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unlockTokenFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, lockTokenFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, tokensDistributionFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, upgradeToFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setSafeModeStatusFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setUpdatabilityStatusFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setLocalAdminFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setAccessControlManagerFunctionId, aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, withdrawBalanceFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId,signer)
    })

  });

  describe("Subject (AssetManagerERC20 Implementation) Tests", function () {

    it("Should AssetManagerERC20 Subject deploy success", async () => {
      // given
      const assetManagerFactory = new AssetManagerERC20__factory(systemAdmin);

      // when
      assetManagerSubject = await assetManagerFactory.deploy();

      // then
      expect(assetManagerSubject.address).to.be.not.null;
    });

    it("Should initialize of AssetManagerERC20 subject failed", async () => {
      // when and then
      await expect(
        assetManagerSubject.connect(systemAdmin).initialize({
          contractName: ASSET_MANAGER_ERC20_NAME,
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
        contractName: ASSET_MANAGER_ERC20_NAME,
        contractVersion: assetManagerERC20Version,
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
          assetManagerERC20Version,
          1
        );

      // then
      const domainSeparator = generateDomainSeparator(
        ASSET_MANAGER_ERC20_NAME,
        assetManagerERC20Version,
        assetManagerProxy.address,
        networkChainId
      );

      expect(await assetManagerProxy.contractName()).to.be.equal(ASSET_MANAGER_ERC20_NAME);
      expect(await assetManagerProxy.contractVersion()).to.be.equal(assetManagerERC20Version);
      expect(await assetManagerProxy.subjectAddress()).to.be.equal(assetManagerProxy.address);
      expect(await assetManagerProxy.accessControlManager()).to.be.equal(aclManagerProxy.address);
      expect(await assetManagerProxy.localAdmin()).to.be.equal(systemAdminWallet.address);
      expect(await assetManagerProxy.domainSeparator()).to.be.equal(domainSeparator);
      expect(await assetManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
      expect(await assetManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
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
          version: assetManagerERC20Version,
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
      await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(contextRequests))
        .to.emit(contextManagerDelegateProxy, "ContextRegistered")
        .withArgs(systemAdminWallet.address, assetMangerContextId, assetManagerProxy.address,
          aclRealmLivelyTokenErc20Id, systemAdminWallet.address, ethers.constants.AddressZero,
          ethers.constants.AddressZero, aclRoleLivelyTokenAssetManagerAdminId)
    })

    it("Should register AssetManager functions by systemAdmin success", async() => {
      // given
      const assetManagerIface = new ethers.utils.Interface(AssetManagerERC20__factory.abi);
      const assetContextId = ethers.utils.keccak256(assetManagerProxy.address);
      const signer = new Int8Array(0);
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
          realmId: new Int8Array(0),
          salt: new Int8Array(0),
          name: "",
          version: "",
          subject: "",
          deployer: "",
          contractId: assetManagerProxy.address,
          functions: assetManagerFunctionRequests
        }]

      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(assetManagerFunctionRegisterRequest))
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, createAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, removeAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, registerAssetFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, updateTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, registerTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setSafeModeTokenFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, upgradeToFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setSafeModeStatusFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setUpdatabilityStatusFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclTypeLivelyTokenAssetManagerId,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setLocalAdminFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, setAccessControlManagerFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, assetContextId, withdrawBalanceFunctionId, aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyTokenAssetManagerAdminId,signer)
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
      // given
      const registerTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetSubjectId: assetSubjectERC20.address,
          assetSignature: "0x00"
        }
      ]

      // when and then
      await expect(assetManagerProxy.connect(livelyAdmin).registerToken(registerTokenRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).registerToken(registerTokenRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).registerToken(registerTokenRequest)).to.revertedWith(
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

    it("Should update lively token to assetManager by anyone failed", async () => {
      // given
      const updateTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetSubjectId: assetSubjectERC20.address,
          assetSignature: "0x00"
        }
      ]

      // when and then
      await expect(assetManagerProxy.connect(livelyAdmin).updateToken(updateTokenRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).updateToken(updateTokenRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).updateToken(updateTokenRequest)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;
    });

    it("Should update lively token to assetManager by assetAdmin success", async () => {
      // given
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        ACL_REALM_LIVELY_TOKEN_ERC20_NAME,
        aclManagerProxy.address,
        systemAdminWallet,
        networkChainId,
        assetSubjectERC20.address
      );
      const updateTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetSubjectId: assetSubjectERC20.address,
          assetSignature: signature
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).updateToken(updateTokenRequest))
        .to.emit(assetManagerProxy, "TokenUpdated")
        .withArgs(assetAdminWallet.address, livelyToken.address, assetSubjectERC20.address);

      // then
      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;

      // and
      const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(tokenInfo.assets).to.be.empty;
      expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
      expect(tokenInfo.assetSignature).to.be.equal(signature);
    });

    it("Should repeat again register lively token to assetManager by assetAdmin failed", async () => {
      const beforeAllTokens = await assetManagerProxy.getAllTokens();
      const registerTokenRequest: IAssetManagerERC20.AssetTokenActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetSubjectId: assetSubjectERC20.address,
          assetSignature: "0x00"
        }
      ]

      // when and then
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(registerTokenRequest))
        .to.revertedWith("Already Registered");

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
        .withArgs(assetAdminWallet.address, tokenERC20.address, assetSubjectERC20.address, "INV", "INOVERSE");

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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyAudioVideoProgramAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: ACL_ROLE_LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];

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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyAudioVideoProgramAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetAudioVideoProgram = await factory.attach(assetId);
      assetAudioVideoProgramId = ethers.utils.keccak256(assetAudioVideoProgram.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetAudioVideoProgram, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyAudioVideoProgramAssetAdminId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );

      // and
      expect(await assetAudioVideoProgram.assetName()).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
      expect(await assetAudioVideoProgram.assetVersion()).to.be.equal(CONTRACTS_VERSION);
      expect(await assetAudioVideoProgram.assetInitVersion()).to.be.equal(1);
      expect(await assetAudioVideoProgram.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetAudioVideoProgram.assetAccessControl()).to.be.equal(aclManagerProxy.address);
      expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetAudioVideoProgram.assetSafeMode()).to.be.equal(AssetSafeModeStatus.DISABLED);

      // and
      const assetInfo: IAssetEntity.AssetInfoStruct = await assetAudioVideoProgram.assetInfo();
      expect(assetInfo.name).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyFoundingTeamAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_FOUNDING_TEAM_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];

      assetFoundingTeam = await factory.attach(assetId);
      assetFoundingTeamId = ethers.utils.keccak256(assetFoundingTeam.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetFoundingTeam, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyFoundingTeamAssetAdminId,
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyTreasuryAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_TREASURY_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetTreasury = await factory.attach(assetId);
      assetTreasuryId = ethers.utils.keccak256(assetTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTreasury, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyTreasuryAssetAdminId,
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyPublicSaleAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_PUBLIC_SALE_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetPublicSale = await factory.attach(assetId);
      assetPublicSaleId = ethers.utils.keccak256(assetPublicSale.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetPublicSale, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyPublicSaleAssetAdminId,
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyValidatorRewardsAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_VALIDATOR_REWARDS_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetValidatorsRewards = await factory.attach(assetId);
      assetValidatorsRewardsId = ethers.utils.keccak256(assetValidatorsRewards.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetValidatorsRewards, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyValidatorRewardsAssetAdminId,
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyCrowdFoundingAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_CROWD_FOUNDING_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetCrowdFounding = await factory.attach(assetId);
      assetCrowdFoundingId = ethers.utils.keccak256(assetCrowdFounding.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetCrowdFounding, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyCrowdFoundingAssetAdminId,
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
      const createAssetRequest: IAssetManagerERC20.AssetCreateRequestStruct[] = [{
        adminId: aclRoleLivelyTokenAssetManagerAdminId,
        agentId: aclRoleLivelyTaxTreasuryAssetAdminId,
        realmId: aclRealmLivelyTokenErc20Id,
        salt: saltValue,
        assetName: LIVELY_TAX_TREASURY_ASSET_NAME,
        assetVersion: CONTRACTS_VERSION,
        tokenId: livelyToken.address,
        assetId: ethers.constants.AddressZero
      }];
      assetTaxTreasury = await factory.attach(assetId);
      assetTaxTreasuryId = ethers.utils.keccak256(assetTaxTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTaxTreasury, "AssetInitialized")
        .withArgs(
          aclRoleLivelyTokenAssetManagerAdminId,
          aclRoleLivelyTaxTreasuryAssetAdminId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should register AssetManager and assets contract to related roles success", async() => {
      // given
      const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
        // {
        //   roleId: aclRoleLivelyTokenAssetManagerAdminId,
        //   account: assetManagerProxy.address,
        //   adminId: aclRoleLivelyTokenAssetManagerAdminId,
        //   limits: {
        //     memberLimit: 0,
        //     memberRegisterLimit: 0,
        //     contextRegisterLimit: 0,
        //     functionRegisterLimit: 0,
        //     profileRegisterLimit: 0,
        //     contextLimit: 0,
        //     realmLimit: 0,
        //     domainLimit: 0,
        //     callLimit: 65535,
        //     typeRoleLimit: 0,
        //     typeLimit: 1,
        //     roleRegisterLimit: 0,
        //     typeRegisterLimit: 0,
        //     realmRegisterLimit: 0,
        //     domainRegisterLimit: 0,
        //     policyRegisterLimit: 0,
        //     policyRoleLimit: 0,
        //     functionLimit: 0
        //   },
        //   acstat: ActivityStatus.ENABLED,
        //   alstat: AlterabilityStatus.UPDATABLE
        // },
        {
          roleId: aclRoleLivelyAudioVideoProgramAssetAdminId,
          account: assetAudioVideoProgram.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyPublicSaleAssetAdminId,
          account: assetPublicSale.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyFoundingTeamAssetAdminId,
          account: assetFoundingTeam.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyCrowdFoundingAssetAdminId,
          account: assetCrowdFounding.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyValidatorRewardsAssetAdminId,
          account: assetValidatorsRewards.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyTreasuryAssetAdminId,
          account: assetTreasury.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          roleId: aclRoleLivelyTaxTreasuryAssetAdminId,
          account: assetTaxTreasury.address,
          adminId: aclRoleLivelyTokenAssetManagerAdminId,
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
            functionLimit: 0
          },
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        }
      ]

      // when
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(requests))
        // .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        // .withArgs(assetAdminWallet.address, assetManagerProxyId, assetManagerProxy.address,
        //   aclRoleLivelyTokenAssetManagerAdminId, aclRoleLivelyTokenAssetManagerAdminId,
        //   [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetAudioVideoProgramId, assetAudioVideoProgram.address,
          aclRoleLivelyAudioVideoProgramAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetPublicSaleId, assetPublicSale.address,
          aclRoleLivelyPublicSaleAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetFoundingTeamId, assetFoundingTeam.address,
          aclRoleLivelyFoundingTeamAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetCrowdFoundingId, assetCrowdFounding.address,
          aclRoleLivelyCrowdFoundingAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetValidatorsRewardsId, assetValidatorsRewards.address,
          aclRoleLivelyValidatorRewardsAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetTreasuryId, assetTreasury.address,
          aclRoleLivelyTreasuryAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, assetTaxTreasuryId, assetTaxTreasury.address,
          aclRoleLivelyTaxTreasuryAssetAdminId, aclRoleLivelyTokenAssetManagerAdminId,
          [0, 0, 0, 0, 0, 0, 0, 0, 65535, 0, 1, 0, 0, 0, 0, 0, 0, 0])
    })

    it("Should update assets role scopes to related asset context success", async() => {
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
      await expect(roleManagerDelegateProxy.connect(assetAdmin).roleUpdateScope(requests))
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, assetAudioVideoProgramId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, assetPublicSaleId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, assetFoundingTeamId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, assetCrowdFoundingId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, assetValidatorsRewardsId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, assetTreasuryId)
        .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
        .withArgs(assetAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, assetTaxTreasuryId)
    })

    it("Should distribute token call by anyone failed", async () => {
      // given
      const assets: Address[] = [
        assetAudioVideoProgramId,
        assetPublicSaleId,
        assetFoundingTeamId,
        assetCrowdFoundingId,
        assetValidatorsRewardsId,
        assetTreasuryId,
        assetTaxTreasuryId
      ]

      // when and then
      await expect(livelyToken.connect(livelyAdmin).tokensDistribution(assetManagerProxy.address, assets))
        .to.revertedWith("Access Denied");

      await expect(livelyToken.connect(systemAdmin).tokensDistribution(assetManagerProxy.address, assets))
        .to.revertedWith("Access Denied");

      await expect(livelyToken.connect(systemAdmin).tokensDistribution(assetManagerProxy.address, assets))
        .to.revertedWith("Access Denied");
    });

    it("Should distribute token call by assetAdmin success", async () => {
      // given
      const assets: Address[] = [
        assetAudioVideoProgramId,
        assetPublicSaleId,
        assetFoundingTeamId,
        assetCrowdFoundingId,
        assetValidatorsRewardsId,
        assetTreasuryId,
        assetTaxTreasuryId
      ]
      const beforeBalanceAudioVideoProgram = await assetAudioVideoProgram.assetBalance();
      const beforeBalanceFoundingTeam = await assetFoundingTeam.assetBalance();
      const beforeBalanceTreasury = await assetTreasury.assetBalance();
      const beforeBalancePublicSale = await assetPublicSale.assetBalance();
      const beforeBalanceValidatorsRewards = await assetValidatorsRewards.assetBalance();
      const beforeBalanceCrowdFounding = await assetCrowdFounding.assetBalance();

      // when
      await expect(livelyToken.connect(assetAdmin).tokensDistribution(assetManagerProxy.address, assets))
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
      const afterBalanceAudioVideoProgram = await assetAudioVideoProgram.assetBalance();
      const afterBalanceFoundingTeam = await assetFoundingTeam.assetBalance();
      const afterBalanceTreasury = await assetTreasury.assetBalance();
      const afterBalancePublicSale = await assetPublicSale.assetBalance();
      const afterBalanceValidatorsRewards = await assetValidatorsRewards.assetBalance();
      const afterBalanceCrowdFounding = await assetCrowdFounding.assetBalance();

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
      // given
      const removeAssetsRequest: IAssetManagerERC20.AssetActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetId: assetPublicSale.address
        }
      ]

      // when
      await expect(assetManagerProxy.connect(livelyAdmin).removeAsset(removeAssetsRequest))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(systemAdmin).removeAsset(removeAssetsRequest))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).removeAsset(removeAssetsRequest))
        .to.revertedWith("Access Denied");

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.true;
    });

    it("Should removeAsset call by assetAdmin success", async () => {
      // given
      const beforeRemoveAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRemoveAssetSafeMode = await assetPublicSale.assetSafeMode();
      const removeAssetsRequest: IAssetManagerERC20.AssetActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetId: assetPublicSale.address
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).removeAsset(removeAssetsRequest))
        .to.emit(assetManagerProxy, "AssetRemoved")
        .withArgs(assetAdminWallet.address, assetPublicSale.address, livelyToken.address)
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
      // given
      const registerAssetsRequest: IAssetManagerERC20.AssetActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetId: assetPublicSale.address
        }
      ]

      // when
      await expect(assetManagerProxy.connect(livelyAdmin).registerAsset(registerAssetsRequest))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(systemAdmin).registerAsset(registerAssetsRequest))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).registerAsset(registerAssetsRequest))
        .to.revertedWith("Access Denied");

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.false;
    });

    it("Should registerAsset call by assetAdmin success", async () => {
      // given
      const beforeRegisterAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRegisterAssetSafeMode = await assetPublicSale.assetSafeMode();
      const registerAssetsRequest: IAssetManagerERC20.AssetActionRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          assetId: assetPublicSale.address
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerAsset(registerAssetsRequest))
        .to.emit(assetManagerProxy, "AssetRegistered")
        .withArgs(assetAdminWallet.address, assetPublicSale.address, livelyToken.address)
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
      // given
      const assetSafeModeRequests : IAssetManagerERC20.AssetTokenSafeModeRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          status: AssetSafeModeStatus.ENABLED
        }
      ]

      // when
      await expect(assetManagerProxy.connect(livelyAdmin).setSafeModeAssets(assetSafeModeRequests))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(systemAdmin).setSafeModeAssets(assetSafeModeRequests))
        .to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).setSafeModeAssets(assetSafeModeRequests))
        .to.revertedWith("Access Denied");

      // then
      const status = await assetPublicSale.assetSafeMode();
      expect(status).to.be.eq(AssetSafeModeStatus.DISABLED);
    });

    it("Should enable SafeMode Token by assetAdmin success", async () => {
      // given
      const beforeAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const beforeAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const beforeAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const beforeAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const beforeAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const beforeAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const beforeAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();
      const assetSafeModeRequests : IAssetManagerERC20.AssetTokenSafeModeRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          status: AssetSafeModeStatus.ENABLED
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeAssets(assetSafeModeRequests))
        .to.emit(assetAudioVideoProgram, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetFoundingTeam, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTreasury.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetPublicSale, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetValidatorsRewards, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetCrowdFounding, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, AssetSafeModeStatus.ENABLED)
        .to.emit(assetTaxTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address, AssetSafeModeStatus.ENABLED);

      // then
      const afterAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const afterAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const afterAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const afterAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const afterAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const afterAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const afterAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      expect(beforeAssetAudioVideoProgramStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetAudioVideoProgramStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetFoundingTeamStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetFoundingTeamStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetTreasuryStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetTreasuryStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetPublicSaleStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetPublicSaleStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetValidatorsRewardsStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetValidatorsRewardsStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetAudioVideoProgramStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetAudioVideoProgramStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetCrowdFoundingStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetCrowdFoundingStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
      expect(beforeAssetTaxTreasuryStatus).to.be.equal(AssetSafeModeStatus.DISABLED);
      expect(afterAssetTaxTreasuryStatus).to.be.equal(AssetSafeModeStatus.ENABLED);
    });

    it("Should disable SafeMode Token by assetAdmin success", async () => {
      // given
      const assetSafeModeRequests : IAssetManagerERC20.AssetTokenSafeModeRequestStruct[] = [
        {
          tokenId: livelyToken.address,
          status: AssetSafeModeStatus.DISABLED
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeAssets(assetSafeModeRequests))
        .to.emit(assetAudioVideoProgram, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetFoundingTeam, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTreasury.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetPublicSale, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetPublicSale.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetValidatorsRewards, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetCrowdFounding, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address,AssetSafeModeStatus.DISABLED)
        .to.emit(assetTaxTreasury, "AssetSafeModeUpdated")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address,AssetSafeModeStatus.DISABLED);
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

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSetSafeMode(AssetSafeModeStatus.ENABLED))
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetAdminWallet.address, assetFoundingTeam.address, AssetSafeModeStatus.ENABLED);

      // and
      expect(safeMode).to.be.false;

      // and
      expect(await assetFoundingTeam.assetSafeMode()).to.be.true;
    });

    it("Should call any methods by anyone when assetSafeMode enabled failed", async () => {
      // given
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAdminWallet.address,
        dest: userWallet2.address,
        amount: dummyAmount,
        claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: userWallet2.address,
      };

      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: userWallet1.address,
        to: userWallet2.address,
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
        assetFoundingTeam.connect(user1).tokenTransfer(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenTransfer(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenTransfer(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenTransfer(assetAdminWallet.address, BigNumber.from(0))
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
        assetFoundingTeam.connect(user1).tokenTransferFrom(assetAdminWallet.address, assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenTransferFrom(assetAdminWallet.address, assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(systemAdmin)
          .tokenTransferFrom(assetAdminWallet.address, assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(foundingTeamManager)
          .tokenTransferFrom(assetAdminWallet.address, assetAdminWallet.address, BigNumber.from(0))
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
      await expect(assetFoundingTeam.connect(user1).tokenApprove(assetAdminWallet.address, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(livelyAdmin).tokenApprove(assetAdminWallet.address, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenApprove(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenApprove(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenIncreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenIncreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenIncreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenIncreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenDecreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(livelyAdmin).tokenDecreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenDecreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenDecreaseAllowance(assetAdminWallet.address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
    });

    it("Should disable asset safeMode of assetFoundingTeam by assetAdmin success", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();
      // const realm = await assetFoundingTeam.assetRealm();

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSetSafeMode(AssetSafeModeStatus.DISABLED))
        .to.emit(assetFoundingTeam, "AssetSafeModeUpdated")
        .withArgs(assetAdminWallet.address, assetFoundingTeam.address, AssetSafeModeStatus.DISABLED);
    });

    it("Should tokenLock of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async () => {
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: userWallet2.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: userWallet1.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
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
      const assetFoundingTeamBalanceBefore = await assetFoundingTeam.assetBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(userWallet2.address);
      const user1LockBalanceBefore = await livelyToken.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceBefore = await livelyToken.totalBalanceOf(userWallet1.address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: userWallet2.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: userWallet1.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
      ];

      const user2LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[0].source, lockRequests[0].dest, lockRequests[0].claimAt, lockRequests[0].amount]
        )
      );
      const user1LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[1].source, lockRequests[1].dest, lockRequests[1].claimAt, lockRequests[1].amount]
        )
      );

      // when
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenLock(lockRequests))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user2LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          userWallet2.address,
          lockRequests[0].claimAt,
          lockRequests[0].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user1LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          userWallet2.address,
          lockRequests[1].claimAt,
          lockRequests[1].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(assetFoundingTeam.address, dummyAmount.mul(2))
        .to.emit(assetFoundingTeam, "AssetERC20Called")
        .withArgs(
          foundingTeamManagerWallet.address,
          assetFoundingTeam.address,
          assetFoundingTeam.interface.getSighash(
            assetFoundingTeam.interface.functions["tokenLock((address,address,uint256,uint256)[])"]
          )
        );

      // then
      const [amount1, lockedAt1, claimedAt1, source1, status1] = await livelyToken.lockInfo(user2LockId, userWallet2.address);
      const [amount2, lockedAt2, claimedAt2, source2, status2] = await livelyToken.lockInfo(user1LockId, userWallet1.address);
      const assetFoundingTeamBalanceAfter = await assetFoundingTeam.assetBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(userWallet2.address);
      const user1LockBalanceAfter = await livelyToken.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceAfter = await livelyToken.totalBalanceOf(userWallet1.address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetFoundingTeamBalanceAfter.toString()).to.be.equal(
        assetFoundingTeamBalanceBefore.sub(dummyAmount.mul(2)).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount1.toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(lockedAt1.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt1.toString()).to.be.equal(lockRequests[0].claimAt.toString());
      expect(source1).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status1).to.be.equal(LockState.LOCKED);

      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(dummyAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount2.toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(lockedAt2.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt2.toString()).to.be.equal(lockRequests[1].claimAt.toString());
      expect(source2).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status2).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetPublicSale.connect(livelyAdmin).tokenTransfer(userWallet1.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(systemAdmin).tokenTransfer(userWallet1.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(assetAdmin).tokenTransfer(userWallet1.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async () => {
      // given
      const assetPublicSaleBalanceBefore = await assetPublicSale.assetBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(userWallet1.address);

      // when
      await expect(assetPublicSale.connect(publicSaleManager).tokenTransfer(userWallet1.address, dummyAmount))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetPublicSale.address, userWallet1.address, dummyAmount)
        .to.emit(assetPublicSale, "AssetERC20Called")
        .withArgs(
          publicSaleManagerWallet.address,
          assetPublicSale.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenTransfer(address,uint256)"]
          )
        );

      // then
      const assetPublicSaleBalanceAfter = await assetPublicSale.assetBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(userWallet1.address);
      expect(assetPublicSaleBalanceAfter.toString()).to.be.equal(
        assetPublicSaleBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: userWallet2.address,
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
      const assetTreasuryBalanceBefore = await assetTreasury.assetBalance();
      const user2BalanceBefore = await livelyToken.balanceOf(userWallet2.address);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: userWallet2.address,
      };

      // when
      await expect(assetTreasury.connect(treasuryManager).tokenBatchTransfer([batchTransfer]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetTreasury.address, userWallet2.address, batchTransfer.amount)
        .to.emit(livelyToken, "BatchTransfer")
        .withArgs(userWallet1.address, batchTransfer.amount)
        .to.emit(assetTreasury, "AssetERC20Called")
        .withArgs(
          treasuryManagerWallet.address,
          assetTreasury.address,
          assetTreasury.interface.getSighash(
            assetTreasury.interface.functions["tokenBatchTransfer((address,uint256)[])"]
          )
        );

      // then
      const assetTreasuryBalanceAfter = await assetTreasury.assetBalance();
      const user2BalanceAfter = await livelyToken.balanceOf(userWallet2.address);

      expect(assetTreasuryBalanceAfter).to.be.equal(assetTreasuryBalanceBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetValidatorsRewards.connect(livelyAdmin).tokenApprove(userWallet1.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(systemAdmin).tokenApprove(userWallet1.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(assetAdmin).tokenApprove(userWallet1.address, dummyAmount)).to.revertedWith(
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
          validatorsRewardsManagerWallet.address,
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
        assetTaxTreasury.connect(livelyAdmin).tokenTransferFrom(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(systemAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(treasuryManager)
          .tokenTransferFrom(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenTransferFrom of LIVELY_TREASURY_ASSET by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.assetBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(userWallet1.address);

      // when
      await expect(
        assetTaxTreasury
          .connect(assetAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, userWallet1.address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminWallet.address,
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
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.assetBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(userWallet1.address);
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
        to: userWallet1.address,
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
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.assetBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(userWallet1.address);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: userWallet1.address,
        amount: dummyAmount,
      };

      // when
      await expect(assetTaxTreasury.connect(assetAdmin).tokenBatchTransferFrom([batchTransferFrom]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, userWallet1.address, dummyAmount)
        .to.emit(livelyToken, "BatchTransferFrom")
        .withArgs(assetTaxTreasury.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, userWallet1.address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminWallet.address,
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
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.assetBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(userWallet1.address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(livelyAdmin).tokenIncreaseAllowance(userWallet2.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenIncreaseAllowance(userWallet2.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenIncreaseAllowance(userWallet2.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, userWallet2.address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenIncreaseAllowance(userWallet2.address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, userWallet2.address, dummyAmount)
        .to.emit(livelyToken, "ApprovalIncreased")
        .withArgs(assetCrowdFounding.address, userWallet2.address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerWallet.address,
          assetCrowdFounding.address,
          assetCrowdFounding.interface.getSighash(
            assetCrowdFounding.interface.functions["tokenIncreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, userWallet2.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(livelyAdmin).tokenDecreaseAllowance(userWallet2.address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenDecreaseAllowance(userWallet2.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenDecreaseAllowance(userWallet2.address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, userWallet2.address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenDecreaseAllowance(userWallet2.address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, userWallet2.address, dummyAmount)
        .to.emit(livelyToken, "ApprovalDecrease")
        .withArgs(assetCrowdFounding.address, userWallet2.address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerWallet.address,
          assetCrowdFounding.address,
          assetSubjectERC20.interface.getSighash(
            assetSubjectERC20.interface.functions["tokenDecreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, userWallet2.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.sub(dummyAmount).toString());
    });

    it("Should deposit eth coin to LIVELY_AUDIO_VIDEO_PROGRAM_ASSET success", async () => {
      // given
      // const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.assetBalance();
      const user1BalanceBefore = await provider.getBalance(userWallet1.address);
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
      const user1BalanceAfter = await provider.getBalance(userWallet1.address);
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
      await expect(assetAudioVideoProgram.connect(user1).withdrawBalance(userWallet1.address)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(systemAdmin).withdrawBalance(systemAdminWallet.address)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(livelyAdmin).withdrawBalance(assetAdminWallet.address)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      // then
      const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(assetAudioVideoProgramBalanceBefore.toString());
    });

    it("Should withdraw eth coin from LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const user1BalanceBefore = await provider.getBalance(userWallet1.address);

      // when
      await assetAudioVideoProgram.connect(audioVideoProgramManager).withdrawBalance(userWallet1.address);

      // then
      const user1BalanceAfter = await provider.getBalance(userWallet1.address);
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
