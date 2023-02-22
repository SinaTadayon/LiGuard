import { expect } from "chai";
import { Signer, BigNumber, Wallet, BigNumberish } from "ethers";
import { ethers, waffle } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable camelcase */
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
  UniverseManager,
  UniverseManager__factory,
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
  LivelyToken,
  LivelyToken__factory,
  LTokenERC20,
  LTokenERC20__factory,
  MemberManager,
  MemberManager__factory,
  PolicyManager,
  PolicyManager__factory,
  Proxy__factory,
  RealmManager,
  RealmManager__factory,
  RoleManager,
  RoleManager__factory,
  TypeManager,
  TypeManager__factory,
  ProfileManager,
  LACLCommons,
  LProfileCommons,
  LProfileRolePolicy,
  ProfileMemberManager,
  ProfileRoleManager,
  ProfileTypeManager,
  ProfileFunctionManager,
  ProfileContextManager,
  ProfileRealmManager,
  ProfileDomainManager,
  ProfileUniverseManager,
  ProfilePolicyManager,
  ProfileAccessControl,
  LACLCommons__factory,
  LProfileCommons__factory,
  LProfileRolePolicy__factory,
  ProfileManager__factory,
  ProfileMemberManager__factory,
  ProfileRoleManager__factory,
  ProfileTypeManager__factory,
  ProfileFunctionManager__factory,
  ProfileContextManager__factory,
  ProfileRealmManager__factory,
  ProfileDomainManager__factory,
  ProfileUniverseManager__factory, ProfilePolicyManager__factory, ProfileAccessControl__factory
} from "../../typechain/types";
import { LivelyTokenLibraryAddresses } from "../../typechain/types/factories/token/lively/LivelyToken__factory";
import {
  generateDomainSeparator,
  generateContextDomainSignatureManually,
  generatePermitDomainSignatureByHardhat,
  LockState,
  generatePredictContextDomainSignatureManually,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  ActivityStatus,
  AlterabilityStatus,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus,
  LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  AssetType,
  AssetSafeModeStatus,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
  LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
  LIVELY_PROFILE_ANY_TYPE_ID,
  LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID
} from "./TestUtils";
/* eslint-disable node/no-extraneous-import */
import { TransactionRequest } from "@ethersproject/abstract-provider";
import {
  IERC20Lock,
  TokenUnlockedEventObject,
} from "../../typechain/types/token/lively/LivelyToken";
import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
import {IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import { IACLCommons } from "../../typechain/types/acl/scope/FunctionManager";
import { MemberManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/MemberManager__factory";
import { RoleManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/RoleManager__factory";
import { TypeManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/TypeManager__factory";
import { FunctionManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/FunctionManager__factory";
import { ContextManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/ContextManager__factory";
import { RealmManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/RealmManager__factory";
import { DomainManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/DomainManager__factory";
import {
  UniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/scope/UniverseManger.sol/UniverseManager__factory";
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
  ProfileUniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileUniverseManger.sol/ProfileUniverseManager__factory";
import {
  ProfilePolicyManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/policy/ProfilePolicyManager__factory";
const { provider } = waffle;

describe("Lively Token Tests", function () {
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
  let universeManagerSubject: UniverseManager;
  let universeManagerProxy: UniverseManager;
  let universeManagerDelegateProxy: UniverseManager;
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
  let profileUniverseManagerSubject: ProfileUniverseManager;
  let profileUniverseManagerProxy: ProfileUniverseManager;
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
  const UNIVERSE_MANAGER_CONTRACT_NAME = "UniverseManager";
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
  const PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME = "ProfileUniverseManager";
  const PROFILE_POLICY_MANAGER_CONTRACT_NAME = "ProfilePolicyManager";
  const PROFILE_ACCESS_CONTROL_CONTRACT_NAME = "ProfileAccessControl";
  const ACL_MANAGER_CONTRACT_NAME = "ACLManager";
  const CONTRACTS_VERSION =  "3.0.0";

  const ACL_DOMAIN_TOKENS_NAME = "DOMAIN.LIVELY_VERSE.TOKENS";
  const ACL_REALM_LIVELY_TOKEN_ERC20_NAME = "REALM.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20";
  const ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME = "TYPE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER";
  const ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME = "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.MANAGER_ADMIN";
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
  const ASSET_MANAGER_ERC20_VERSION = "3.0.0";

  const LIVELY_TOKEN_NAME = "LivelyToken";
  const LIVELY_TOKEN_VERSION = "3.0.0";

  const emptyMemberSignature: IACLCommons.MemberSignatureStruct = {
    account: ethers.constants.AddressZero,
    expiredAt: 0,
    signature: new Int8Array(0)
  }

  let lTokenERC20: LTokenERC20;
  let livelyTokenLibraryAddresses: LivelyTokenLibraryAddresses;
  let livelyTokenSubject: LivelyToken;
  let livelyTokenProxy: LivelyToken;

  const user1LockIds: string[] = [];
  const user2LockIds: string[] = [];
  const taxValue = BigNumber.from(300);

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
    aclTypeLivelyTokenManagerId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_LIVELY_TOKEN_ERC20_MANAGER_NAME));
    aclRoleLivelyTokenManagerAdminId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME));
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
      const universeManagerFactory = new UniverseManager__factory(<UniverseManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
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
      const profileUniverseManagerFactory = new ProfileUniverseManager__factory(<ProfileUniverseManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);
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
      universeManagerSubject = await universeManagerFactory.deploy();
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
      profileUniverseManagerSubject = await profileUniverseManagerFactory.deploy();
      profilePolicyManagerSubject = await profilePolicyManagerFactory.deploy();
      profileAccessControlSubject = await profileAccessControlFactory.deploy();

      // acl manager
      aclManagerSubject = await aclManagerFactory.deploy();
    })

    it("ACL Deploy Proxies", async() => {
      const aclManagerProxyFactory = new ACLManagerProxy__factory(systemAdmin);
      let iface = new ethers.utils.Interface(ACLManager__factory.abi);
      let data = iface.encodeFunctionData("initialize", [
        ACL_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
      ]);
      const aclProxy = await aclManagerProxyFactory.deploy(aclManagerSubject.address, data);
      await aclProxy.deployTransaction.wait();
      aclManagerProxy = aclManagerSubject.attach(aclProxy.address);

      // Member Manager
      const aclProxyFactory = new ACLProxy__factory(systemAdmin);
      iface = new ethers.utils.Interface(MemberManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        MEMBER_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      let proxy = await aclProxyFactory.deploy(memberManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      memberManagerProxy = memberManagerSubject.attach(proxy.address);

      // Role Manager
      iface = new ethers.utils.Interface(RoleManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ROLE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(roleManagerSubject.address, data);
      roleManagerProxy = roleManagerSubject.attach(proxy.address);

      // Type Manager
      iface = new ethers.utils.Interface(TypeManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        TYPE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(typeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      typeManagerProxy = typeManagerSubject.attach(proxy.address);

      // Function Manager
      iface = new ethers.utils.Interface(FunctionManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        FUNCTION_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(functionManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      functionManagerProxy = functionManagerSubject.attach(proxy.address);

      // Context Manager
      iface = new ethers.utils.Interface(ContextManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        CONTEXT_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(contextManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      contextManagerProxy = contextManagerSubject.attach(proxy.address);

      // Realm Manager
      iface = new ethers.utils.Interface(RealmManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        REALM_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(realmManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      realmManagerProxy = realmManagerSubject.attach(proxy.address);

      // Domain Manager
      iface = new ethers.utils.Interface(DomainManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        DOMAIN_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(domainManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      domainManagerProxy = domainManagerSubject.attach(proxy.address);

      // Universe Manager
      iface = new ethers.utils.Interface(UniverseManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        UNIVERSE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(universeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      universeManagerProxy = universeManagerSubject.attach(proxy.address);

      // Policy Manager
      iface = new ethers.utils.Interface(PolicyManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        POLICY_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(policyManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      policyManagerProxy = policyManagerSubject.attach(proxy.address);

      // Profile Manager
      iface = new ethers.utils.Interface(ProfileManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileManagerProxy = profileManagerSubject.attach(proxy.address);

      // Access Control
      iface = new ethers.utils.Interface(AccessControl__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        ACCESS_CONTROL_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(accessControlSubject.address, data);
      await proxy.deployTransaction.wait();
      accessControlProxy = accessControlSubject.attach(proxy.address);

      // Profile Member Manager
      iface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileMemberManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileMemberManagerProxy = profileMemberManagerSubject.attach(proxy.address);

      // Profile Role Manager
      iface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_ROLE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileRoleManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileRoleManagerProxy = profileRoleManagerSubject.attach(proxy.address);

      // Profile Type Manager
      iface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_TYPE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileTypeManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileTypeManagerProxy = profileTypeManagerSubject.attach(proxy.address);

      // Profile Function Manager
      iface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileFunctionManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileFunctionManagerProxy = profileFunctionManagerSubject.attach(proxy.address);

      // Profile Context Manager
      iface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileContextManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileContextManagerProxy = profileContextManagerSubject.attach(proxy.address);

      // Profile Realm Manager
      iface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_REALM_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileRealmManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileRealmManagerProxy = profileRealmManagerSubject.attach(proxy.address);

      // Profile Domain Manager
      iface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileDomainManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileDomainManagerProxy = profileDomainManagerSubject.attach(proxy.address);

      // Profile Universe Manager
      iface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileUniverseManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profileUniverseManagerProxy = profileUniverseManagerSubject.attach(proxy.address);

      // Profile Policy Manager
      iface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_POLICY_MANAGER_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profilePolicyManagerSubject.address, data);
      await proxy.deployTransaction.wait();
      profilePolicyManagerProxy = profilePolicyManagerSubject.attach(proxy.address);

      // Profile Access Control
      iface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
      data = iface.encodeFunctionData("initialize", [
        PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
        CONTRACTS_VERSION,
        aclManagerProxy.address,
      ]);
      proxy = await aclProxyFactory.deploy(profileAccessControlSubject.address, data);
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
      const universeIface = new ethers.utils.Interface(UniverseManager__factory.abi);
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
          facetId: universeManagerProxy.address,
          subjectId: universeManagerSubject.address,
          selectors: [
            universeIface.getSighash("universeUpdateActivityStatus"),
            universeIface.getSighash("universeUpdateAlterabilityStatus"),
            universeIface.getSighash("universeUpdateAdmin"),
            universeIface.getSighash("universeUpdateDomainLimit"),
            universeIface.getSighash("universeCheckAdmin"),
            universeIface.getSighash("universeGetDomains"),
            universeIface.getSighash("universeGetInfo"),
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
            accessControlIface.getSighash("getUniverseScope"),
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
      const profileUniverseIface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
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
          facetId: profileUniverseManagerProxy.address,
          subjectId: profileUniverseManagerSubject.address,
          selectors: [
            profileUniverseIface.getSighash("profileUniverseUpdateActivityStatus"),
            profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus"),
            profileUniverseIface.getSighash("profileUniverseUpdateAdmin"),
            profileUniverseIface.getSighash("profileUniverseUpdateDomainLimit"),
            profileUniverseIface.getSighash("profileUniverseCheckAdmin"),
            profileUniverseIface.getSighash("profileUniverseGetDomains"),
            profileUniverseIface.getSighash("profileUniverseGetInfo")
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
            profileAccessControlIface.getSighash("profileUniverseScope"),
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
          name: UNIVERSE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: universeManagerProxy.address,
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

      // attach proxies to aclManager
      functionManagerDelegateProxy = functionManagerProxy.attach(aclManagerProxy.address);
      contextManagerDelegateProxy = contextManagerProxy.attach(aclManagerProxy.address);
      realmManagerDelegateProxy = realmManagerProxy.attach(aclManagerProxy.address);
      domainManagerDelegateProxy = domainManagerProxy.attach(aclManagerProxy.address);
      universeManagerDelegateProxy = universeManagerProxy.attach(aclManagerProxy.address);
      policyManagerDelegateProxy = policyManagerProxy.attach(aclManagerProxy.address);
      profileManagerDelegateProxy = profileManagerProxy.attach(aclManagerProxy.address);
      accessControlDelegateProxy = accessControlProxy.attach(aclManagerProxy.address);
      memberManagerDelegateProxy = memberManagerProxy.attach(aclManagerProxy.address);
      roleManagerDelegateProxy = roleManagerProxy.attach(aclManagerProxy.address);
      typeManagerDelegateProxy = typeManagerProxy.attach(aclManagerProxy.address);

      await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(emptyMemberSignature, contextRequests)

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
          name: PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: profileUniverseManagerProxy.address,
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
      await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(emptyMemberSignature, profileContextRequests)

    })

    it("ACL Agents Functions Register ", async() => {
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
          selector: memberIface.getSighash("memberUpdateActivityStatus"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: memberIface.getSighash("memberUpdateAlterabilityStatus"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: memberIface.getSighash("memberUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_TYPE_ID,
          agentId: LIVELY_VERSE_ANY_TYPE_ID,
          selector: memberIface.getSighash("memberUpdateGeneralLimit"),
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, memberFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, roleFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, typeFunctionRegisterRequest)
    })

    it("ACL Scopes Functions Register ", async() => {
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, functionFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, contextFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, realmFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, domainFunctionRegisterRequest)

      // Universe functions
      const universeIface = new ethers.utils.Interface(UniverseManager__factory.abi);
      const universeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("universeUpdateActivityStatus"),
          policyCode: 48,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("universeUpdateAlterabilityStatus"),
          policyCode: 30,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("universeUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("universeUpdateDomainLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: universeIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: universeIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: universeIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: universeIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const universeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: universeManagerProxy.address,
          functions: universeFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, universeFunctionRegisterRequest)

    })

    it("ACL General Functions Register ", async() => {
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileManagerFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, aclManagerFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, accessControlFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, policyFunctionRegisterRequest)
    })

    it("ACL Profile Agents Functions Register", async() => {

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
          selector: profileMemberIface.getSighash("profileMemberUpdateTypeLimit"),
          policyCode: 96,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberUpdateRegisterLimit"),
          policyCode: 130,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberUpdateCallLimit"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberUpdateActivityStatus"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus"),
          policyCode: 46,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_ANY_TYPE_ID,
          selector: profileMemberIface.getSighash("profileMemberUpdateAdmin"),
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileMemberFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileRoleFunctionRegisterRequest)
    })

    it("ACL Profile Scopes Functions Register", async() => {
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileTypeFunctionRegisterRequest)

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
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileFunctionRegisterRequest))

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileContextFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileRealmFunctionRegisterRequest)

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
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileDomainFunctionRegisterRequest))

      // Profile Universe functions
      const profileUniverseIface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
      const profileUniverseFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("profileUniverseUpdateActivityStatus"),
          policyCode: 48,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus"),
          policyCode: 30,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("profileUniverseUpdateAdmin"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
          agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("profileUniverseUpdateDomainLimit"),
          policyCode: 24,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileUniverseIface.getSighash("upgradeTo"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("setSafeModeStatus"),
          policyCode: 16,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("setUpdatabilityStatus"),
          policyCode: 90,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileUniverseIface.getSighash("setLocalAdmin"),
          policyCode: 60,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          selector: profileUniverseIface.getSighash("setAccessControlManager"),
          policyCode: 0,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
        {
          adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          selector: profileUniverseIface.getSighash("withdrawBalance"),
          policyCode: 230,
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE
        },
      ]
      const profileUniverseFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
        {
          signature: new Int8Array(0),
          realmId: ethers.constants.HashZero,
          salt: ethers.constants.HashZero,
          name: "",
          version: "",
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          contractId: profileUniverseManagerProxy.address,
          functions: profileUniverseFunctionRequests
        }
      ]
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileUniverseFunctionRegisterRequest);
    })

    it("ACL Profile General Functions Register", async() => {
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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profileAccessControlFunctionRegisterRequest)

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
      await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, profilePolicyFunctionRegisterRequest)
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
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_DOMAIN_TOKENS_NAME
        }
      ]

      // when
      await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(emptyMemberSignature, requests)).
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
          alstat: AlterabilityStatus.UPDATABLE,
          name: ACL_REALM_LIVELY_TOKEN_ERC20_NAME
        }
      ]

      // when
      await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmRegister(emptyMemberSignature, requests)).
      to.emit(realmManagerDelegateProxy, "RealmRegistered")
        .withArgs(livelyAdminWallet.address, aclRealmLivelyTokenErc20Id , aclDomainTokensId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
    })

    it("Should register token types success", async() => {
      // given
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

      // when
      await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(emptyMemberSignature, typeRegisterRequests))
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
          name: ACL_ROLE_LIVELY_TOKEN_ERC20_MANAGER_ADMIN_NAME
        },
      ]

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(emptyMemberSignature, roleRegisterRequests))
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

      // when
      await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(emptyMemberSignature, requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(livelyAdminWallet.address, assetAdminId, assetAdminWallet.address,
          aclRoleLivelyTokenAssetManagerAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [ 16777215, 65535, 65535, 65535, 0, 65535, 65535, 65535, 65535, 65535, 255, 255, 255, 255, 0, 255, 255, 255 ]
        )
    })

    it("Should grants AssetAdmin to itself and major roles success", async() => {
      // given
      const assetAdminId = ethers.utils.keccak256(assetAdminWallet.address);
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

      // when
      await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(emptyMemberSignature, roleGrantRequests))
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
      await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(emptyMemberSignature, updateAdminRequests))
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
      await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(emptyMemberSignature, updateAdminRequests))
        .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenManagerId, aclRoleLivelyTokenManagerAdminId)
        .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
        .withArgs(livelyAdminWallet.address, aclTypeLivelyTokenAssetManagerId, aclRoleLivelyTokenAssetManagerAdminId)
    })

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
      await expect(roleManagerDelegateProxy.connect(assetAdmin).roleRegister(emptyMemberSignature, roleRegisterRequests))
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyAudioVideoProgramAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyPublicSaleAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyFoundingTeamAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyCrowdFoundingAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyValidatorRewardsAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyTaxTreasuryAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
        .to.emit(roleManagerDelegateProxy, "RoleRegistered")
        .withArgs(assetAdminWallet.address, aclRoleLivelyTreasuryAssetAdminId, aclTypeLivelyTokenAssetManagerId,
          aclRoleLivelyTokenAssetManagerAdminId, aclRealmLivelyTokenErc20Id)
    })

    it("Should registers members to related roles success", async() => {
      // given
      const audioVideoProgramManagerWalletId = ethers.utils.keccak256(audioVideoProgramManagerWallet.address);
      const publicSaleManagerWalletId = ethers.utils.keccak256(publicSaleManagerWallet.address);
      const treasuryManagerWalletId = ethers.utils.keccak256(treasuryManagerWallet.address);
      const validatorsRewardsManagerWalletId = ethers.utils.keccak256(validatorsRewardsManagerWallet.address);
      const crowdFoundingManagerWalletId = ethers.utils.keccak256(crowdFoundingManagerWallet.address);
      const foundingTeamManagerWalletId = ethers.utils.keccak256(foundingTeamManagerWallet.address);
      const taxTreasuryManagerWalletId = ethers.utils.keccak256(taxTreasuryManagerWallet.address);
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
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(emptyMemberSignature, requests))
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, audioVideoProgramManagerWalletId, audioVideoProgramManagerWallet.address,
          aclRoleLivelyAudioVideoProgramAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, publicSaleManagerWalletId, publicSaleManagerWallet.address,
          aclRoleLivelyPublicSaleAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, treasuryManagerWalletId, treasuryManagerWallet.address,
          aclRoleLivelyTreasuryAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, validatorsRewardsManagerWalletId, validatorsRewardsManagerWallet.address,
          aclRoleLivelyValidatorRewardsAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, crowdFoundingManagerWalletId, crowdFoundingManagerWallet.address,
          aclRoleLivelyCrowdFoundingAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, foundingTeamManagerWalletId, foundingTeamManagerWallet.address,
          aclRoleLivelyFoundingTeamAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
        .to.emit(memberManagerDelegateProxy, "MemberRegistered")
        .withArgs(assetAdminWallet.address, taxTreasuryManagerWalletId, taxTreasuryManagerWallet.address,
          aclRoleLivelyTaxTreasuryAssetAdminId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
          [0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 2, 0, 0, 0, 0, 0, 0, 0])
    })
  })

  describe("Token Library Deployments Test", function () {
    it("Should LTokenERC20 deploy success", async () => {
      // given
      const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);

      // when
      lTokenERC20 = await lTokenERC20Factory.deploy();

      // then
      expect(lTokenERC20.address).not.null;
      expect(await lTokenERC20.LIB_NAME()).to.be.equal("LTokenERC20");
      expect(await lTokenERC20.LIB_VERSION()).to.be.equal("3.0.0");
    });
  });

  describe("Subject (LivelyToken Implementation) Tests", function () {
    this.beforeAll(async () => {
      livelyTokenLibraryAddresses = {
        "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
      };
    });

    it("Should LivelyToken Subject deploy success", async () => {
      // given
      const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, systemAdmin);

      // when
      livelyTokenSubject = await livelyTokenFactory.deploy();

      // then
      expect(livelyTokenSubject.address).to.be.not.null;
      expect(await livelyTokenSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
      expect(await livelyTokenSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
      expect(await livelyTokenSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
      expect(await livelyTokenSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
      expect(await livelyTokenSubject.initVersion()).to.be.equal(0);
      expect(await livelyTokenSubject.getLibrary()).to.be.equal(lTokenERC20.address)
    });

    it("Should initialize of LivelyToken subject failed", async () => {
      // when and then
      await expect(
        livelyTokenSubject.connect(systemAdmin).initialize({
          contractName: LIVELY_TOKEN_NAME,
          contractVersion: LIVELY_TOKEN_VERSION,
          aclManager: aclManagerProxy.address,
          taxRateValue: BigNumber.from("300"),
        })
      ).to.be.revertedWith("Illegal Call");
    });

    it("Should setSafeModeState of LivelyToken subject failed", async () => {
      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED)).to.be.revertedWith(
        "Illegal Call"
      );
    });

    it("Should setUpgradeState of LivelyToken subject failed", async () => {
      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.be.revertedWith(
        "Illegal Call"
      );
    });

    it("Should setLocalAdmin of LivelyToken subject failed", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setLocalAdmin(address)).to.be.revertedWith(
        "Illegal Call"
      );
    });

    it("Should setAccessControlManager raise exception", async () => {
      // given
      const address = await user1.getAddress();

      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setAccessControlManager(address)).to.be.revertedWith(
        "Illegal Call"
      );
    });

    it("Should upgradeTo of LivelyToken subject failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        livelyTokenSubject.connect(systemAdmin).upgradeTo(livelyTokenSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal Call");
    });

    it("Should return correct slot storage of LivelyToken subject", async () => {
      // when and then
      expect(await livelyTokenSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  });

  describe("LivelyToken (UUPS Proxy) ERC20 Tests", function () {
    it("Should deploy and initialize LivelyToken proxy success (typechain, two steps)", async () => {
      // given
      const proxyFactory = new Proxy__factory(systemAdmin);
      // const networkChainId = await provider.send("eth_chainId", []);
      const tokenProxy = await proxyFactory.deploy(livelyTokenSubject.address, new Int8Array(0));

      const request: LivelyToken.InitRequestStruct = {
        contractName: LIVELY_TOKEN_NAME,
        contractVersion: LIVELY_TOKEN_VERSION,
        taxRateValue: BigNumber.from(0),
        aclManager: aclManagerProxy.address,
      };

      // when
      livelyTokenProxy = livelyTokenSubject.attach(tokenProxy.address);
      await expect(livelyTokenProxy.connect(systemAdmin).initialize(request))
        .to.emit(livelyTokenProxy, "Upgraded")
        .withArgs(systemAdminWallet.address, livelyTokenProxy.address, livelyTokenSubject.address)
        .to.emit(livelyTokenProxy, "LocalAdminChanged")
        .withArgs(systemAdminWallet.address, livelyTokenProxy.address, systemAdminWallet.address)
        .to.emit(livelyTokenProxy, "Initialized")
        .withArgs(
          systemAdminWallet.address,
          livelyTokenProxy.address,
          livelyTokenSubject.address,
          LIVELY_TOKEN_NAME,
          LIVELY_TOKEN_VERSION,
          1
        );

      const domainSeparator = generateDomainSeparator(
        LIVELY_TOKEN_NAME,
        LIVELY_TOKEN_VERSION,
        livelyTokenProxy.address,
        networkChainId
      );
      // then
      expect(await livelyTokenProxy.contractName()).to.be.equal(LIVELY_TOKEN_NAME);
      expect(await livelyTokenProxy.contractVersion()).to.be.equal(LIVELY_TOKEN_VERSION);
      expect(await livelyTokenProxy.subjectAddress()).to.be.equal(livelyTokenSubject.address);
      expect(await livelyTokenProxy.accessControlManager()).to.be.equal(aclManagerProxy.address);
      expect(await livelyTokenProxy.localAdmin()).to.be.equal(systemAdminWallet.address);
      expect(await livelyTokenProxy.domainSeparator()).to.be.equal(domainSeparator);
      expect(await livelyTokenProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
      expect(await livelyTokenProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
      expect(await livelyTokenProxy.initVersion()).to.be.equal(1)
    });

    it("Should register LivelyToken context by systemAdmin success", async() => {
      // given
      const livelyTokenContextId = ethers.utils.keccak256(livelyTokenProxy.address);
      const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
        {
          realmId: aclRealmLivelyTokenErc20Id,
          adminId: aclTypeLivelyTokenAssetManagerId,
          salt: ethers.constants.HashZero,
          name: LIVELY_TOKEN_NAME,
          version: LIVELY_TOKEN_VERSION,
          contractId: livelyTokenProxy.address,
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
        .withArgs(systemAdminWallet.address, livelyTokenContextId, livelyTokenProxy.address,
          aclRealmLivelyTokenErc20Id, ethers.constants.AddressZero, ethers.constants.AddressZero,
          aclTypeLivelyTokenAssetManagerId)
    })

    it("Should register LivelyToken functions by systemAdmin success", async() => {
      // given
      const livelyTokenIface = new ethers.utils.Interface(LivelyToken__factory.abi);
      const livelyTokenContextId = ethers.utils.keccak256(livelyTokenProxy.address);

      const transferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("transfer")]));
      const transferFromFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("transferFrom")]));
      const approveFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("approve")]))
      const batchTransferFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("batchTransfer")]))
      const batchTransferFromFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("batchTransferFrom")]))
      const permitFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("permit")]))
      const increaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("increaseAllowance")]))
      const decreaseAllowanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("decreaseAllowance")]))
      const claimTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("claimToken")]))

      const burnFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("burn")]))
      const mintFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("mint")]))
      const updateTaxRateFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("updateTaxRate")]))
      const updateTaxWhitelistFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("updateTaxWhitelist")]))
      const pauseFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("pause")]))
      const unpauseFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("unpause")]))
      const pauseAllFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("pauseAll")]))
      const unpauseAllFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("unpauseAll")]))
      const unlockTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("unlockToken")]))

      const lockTokenFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("lockToken")]))
      const tokensDistributionFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("tokensDistribution")]))

      const upgradeToFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("upgradeTo")]))
      const setSafeModeStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("setSafeModeStatus")]))
      const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("setUpdatabilityStatus")]))
      const setLocalAdminFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("setLocalAdmin")]))
      const setAccessControlManagerFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("setAccessControlManager")]))
      const withdrawBalanceFunctionId = ethers.utils.keccak256(
        ethers.utils.solidityPack(["address", "bytes4"],
          [livelyTokenProxy.address,  livelyTokenIface.getSighash("withdrawBalance")]))

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
        contractId: livelyTokenProxy.address,
        functions: livelyTokenFunctionRequests,
      }]


      // when
      await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(emptyMemberSignature, livelyTokenFunctionRegisterRequest))
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, transferFromFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, approveFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, batchTransferFromFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, permitFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, increaseAllowanceFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, decreaseAllowanceFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, claimTokenFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_ANONYMOUS_TYPE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, burnFunctionId, aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, mintFunctionId,aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxRateFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, updateTaxWhitelistFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, pauseAllFunctionId,aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unpauseAllFunctionId, aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, unlockTokenFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, lockTokenFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenAssetManagerId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, tokensDistributionFunctionId, aclTypeLivelyTokenManagerId,
          aclRoleLivelyTokenAssetManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, upgradeToFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setSafeModeStatusFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setUpdatabilityStatusFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setLocalAdminFunctionId, aclTypeLivelyTokenManagerId,
          LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, setAccessControlManagerFunctionId, aclRoleLivelyTokenManagerAdminId,
          aclRoleLivelyTokenManagerAdminId)
        .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        .withArgs(systemAdminWallet.address, livelyTokenContextId, withdrawBalanceFunctionId, aclTypeLivelyTokenManagerId,
          aclTypeLivelyTokenManagerId)
    })

    it("Should deploy and initialize AssetManagerERC20 proxy success", async () => {
      // given
      const assetManagerFactory = new AssetManagerERC20__factory(systemAdmin);
      assetManagerSubject = await assetManagerFactory.deploy();

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

    it("Should register lively token to assetManager by assetAdmin success", async () => {
      // given
      const tokenName = await livelyTokenProxy.name();
      const tokenSymbol = await livelyTokenProxy.symbol();
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
          tokenId: livelyTokenProxy.address,
          assetSubjectId: assetSubjectERC20.address,
          assetSignature: signature
        }
      ]

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(registerTokenRequest))
        .to.emit(assetManagerProxy, "TokenRegistered")
        .withArgs(assetAdminWallet.address, livelyTokenProxy.address, assetSubjectERC20.address, tokenName, tokenSymbol);

      // then
      expect(await assetManagerProxy.isTokenExists(livelyTokenProxy.address)).to.be.true;

      // and
      const tokenInfo: IAssetManagerERC20.TokenInfoStruct = await assetManagerProxy.getTokenInfo(livelyTokenProxy.address);
      expect(tokenInfo.assets).to.be.empty;
      expect(tokenInfo.assetSubjectId).to.be.equal(assetSubjectERC20.address);
      expect(tokenInfo.assetSignature).to.be.equal(signature);
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetAudioVideoProgram = await factory.attach(assetId);
      assetAudioVideoProgramId = ethers.utils.keccak256(assetAudioVideoProgram.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetAudioVideoProgram, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );

      // and
      expect(await assetAudioVideoProgram.assetName()).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
      expect(await assetAudioVideoProgram.assetVersion()).to.be.equal(CONTRACTS_VERSION);
      expect(await assetAudioVideoProgram.assetInitVersion()).to.be.equal(1);
      expect(await assetAudioVideoProgram.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetAudioVideoProgram.assetAccessControl()).to.be.equal(aclManagerProxy.address);
      expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyTokenProxy.address);
      expect(await assetAudioVideoProgram.assetSafeMode()).to.be.equal(AssetSafeModeStatus.DISABLED);

      // and
      const assetInfo: IAssetEntity.AssetInfoStruct = await assetAudioVideoProgram.assetInfo();
      expect(assetInfo.name).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_NAME);
      expect(assetInfo.version).to.be.equal(CONTRACTS_VERSION);
      expect(assetInfo.initVersion).to.be.equal(1);
      expect(assetInfo.atype).to.be.equal(AssetType.ERC20);
      expect(assetInfo.accessControl).to.be.equal(aclManagerProxy.address);
      expect(assetInfo.token).to.be.equal(livelyTokenProxy.address);
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];

      assetFoundingTeam = await factory.attach(assetId);
      assetFoundingTeamId = ethers.utils.keccak256(assetFoundingTeam.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetFoundingTeam, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetTreasury = await factory.attach(assetId);
      assetTreasuryId = ethers.utils.keccak256(assetTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetPublicSale = await factory.attach(assetId);
      assetPublicSaleId = ethers.utils.keccak256(assetPublicSale.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetPublicSale, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetValidatorsRewards = await factory.attach(assetId);
      assetValidatorsRewardsId = ethers.utils.keccak256(assetValidatorsRewards.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetValidatorsRewards, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetCrowdFounding = await factory.attach(assetId);
      assetCrowdFoundingId = ethers.utils.keccak256(assetCrowdFounding.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetCrowdFounding, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
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
        tokenId: livelyTokenProxy.address,
        assetId: ethers.constants.AddressZero
      }];
      assetTaxTreasury = await factory.attach(assetId);
      assetTaxTreasuryId = ethers.utils.keccak256(assetTaxTreasury.address);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminWallet.address, assetId, livelyTokenProxy.address)
        .to.emit(assetTaxTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyTokenProxy.address,
          assetManagerProxy.address,
          assetSubjectERC20.address
        );
    });

    it("Should register AssetManager and assets contract to related roles success", async() => {
      // given
      const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
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
      await expect(memberManagerDelegateProxy.connect(assetAdmin).memberRegister(emptyMemberSignature, requests))
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
      await expect(roleManagerDelegateProxy.connect(assetAdmin).roleUpdateScope(emptyMemberSignature, requests))
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

    it("Should distribute token call by assetAdmin success", async () => {
      // given
      const assets: Address[] = [
        assetAudioVideoProgram.address,
        assetPublicSale.address,
        assetFoundingTeam.address,
        assetCrowdFounding.address,
        assetValidatorsRewards.address,
        assetTreasury.address,
        assetTaxTreasury.address
      ]
      const beforeBalanceAudioVideoProgram = await assetAudioVideoProgram.assetBalance();
      const beforeBalanceFoundingTeam = await assetFoundingTeam.assetBalance();
      const beforeBalanceTreasury = await assetTreasury.assetBalance();
      const beforeBalancePublicSale = await assetPublicSale.assetBalance();
      const beforeBalanceValidatorsRewards = await assetValidatorsRewards.assetBalance();
      const beforeBalanceCrowdFounding = await assetCrowdFounding.assetBalance();

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).tokensDistribution(assetManagerProxy.address, assets))
        .to.emit(livelyTokenProxy, "Mint")
        .withArgs(assetAdminWallet.address, assetAdminWallet.address, livelyTokenTotalSupply, livelyTokenTotalSupply)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetAudioVideoProgram.address, assetAudioVideoProgramBalance)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetFoundingTeam.address, assetFoundingTeamBalance)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetTreasury.address, assetTreasuryBalance)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetPublicSale.address, assetPublicSaleBalance)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetValidatorsRewards.address, assetValidatorsRewardsBalance)
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAdminWallet.address, assetCrowdFounding.address, assetCrowdFoundingBalance);

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

    it("Should LivelyToken ERC20 init state success ", async () => {
      // given
      const totalSupply = await livelyTokenProxy.totalSupply();
      const systemAdminBalance = await livelyTokenProxy.balanceOf(systemAdminWallet.address);

      // when and then
      expect(await livelyTokenProxy.name()).to.be.equal("LIVELY");
      expect(await livelyTokenProxy.symbol()).to.be.equal("LIV");
      expect(await livelyTokenProxy.decimals()).to.be.equal(18);
      expect(livelyTokenTotalSupply.eq(totalSupply as unknown as BigNumberish));
      expect(livelyTokenTotalSupply.eq(systemAdminBalance as unknown as BigNumberish));
    });

    it("Should enable safeMode by anyone failed", async () => {

      // when and then
      await expect(livelyTokenProxy.connect(user1).setSafeModeStatus(ProxySafeModeStatus.ENABLED)).to.revertedWith("Forbidden");
    });

    it("Should enable safeMode by assetAdmin success", async () => {

      // when and then
      await expect(livelyTokenProxy.connect(assetAdmin).setSafeModeStatus(ProxySafeModeStatus.ENABLED))
        .to.emit(livelyTokenProxy, "ProxySafeModeUpdated")
        .withArgs(assetAdminWallet.address, livelyTokenProxy.address, ProxySafeModeStatus.ENABLED);
    });

    it("Should call any methods by anyone when safeMode enabled failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const deadline = BigNumber.from(Date.now() + 10000);
      const user1Nonce = await livelyTokenProxy.nonce(userWallet1.address);
      const adminNonce = await livelyTokenProxy.nonce(assetAdminWallet.address);
      const systemAdminNonce = await livelyTokenProxy.nonce(systemAdminWallet.address);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        userWallet1.address,
        userWallet2.address,
        dummyAmount,
        user1Nonce,
        deadline,
        livelyTokenProxy.address,
        userWallet1.address,
        networkChainId.toString()
      );
      const adminSignature = await generatePermitDomainSignatureByHardhat(
        assetAdminWallet.address,
        userWallet2.address,
        dummyAmount,
        adminNonce,
        deadline,
        livelyTokenProxy.address,
        assetAdminWallet.address,
        networkChainId.toString()
      );

      const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
        systemAdminWallet.address,
        userWallet2.address,
        dummyAmount,
        systemAdminNonce,
        deadline,
        livelyTokenProxy.address,
        systemAdminWallet.address,
        networkChainId.toString()
      );

      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: userWallet2.address,
      };

      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: userWallet1.address,
        to: userWallet2.address,
        amount: dummyAmount,
      };

      const batchUpdateTaxWhitelist: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
        account: userWallet2.address,
        isDeleted: false,
      };

      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: userWallet2.address,
        amount: dummyAmount,
        claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: userWallet2.address,
        reason: "Rollback",
      };

      // and
      await expect(livelyTokenProxy.connect(user1).setLocalAdmin(userWallet2.address)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).setLocalAdmin(userWallet2.address)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(userWallet2.address)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(
        livelyTokenProxy.connect(user1).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(livelyAdmin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).transfer(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).transfer(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).transfer(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(assetAdminWallet.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(livelyAdmin).transferFrom(assetAdminWallet.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).transferFrom(assetAdminWallet.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).approve(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).approve(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).approve(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).increaseAllowance(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).increaseAllowance(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).decreaseAllowance(userWallet2.address, BigNumber.from(0))).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).decreaseAllowance(userWallet2.address, BigNumber.from(0))).to.revertedWith(
        "Rejected"
      );
      await expect(
        livelyTokenProxy.connect(systemAdmin).decreaseAllowance(userWallet2.address, BigNumber.from(0))
      ).to.revertedWith("Rejected");

      // and
      await expect(
        livelyTokenProxy.connect(user1).permit(userWallet1.address, userWallet2.address, dummyAmount, deadline, user1Signature)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(livelyAdmin).permit(assetAdminWallet.address, userWallet2.address, dummyAmount, deadline, adminSignature)
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy
          .connect(systemAdmin)
          .permit(systemAdminWallet.address, userWallet2.address, dummyAmount, deadline, systemAdminSignature)
      ).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).burn(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).burn(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).burn(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).mint(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).mint(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).mint(userWallet2.address, dummyAmount)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).batchTransfer([batchTransfer])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).batchTransfer([batchTransfer])).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).updateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
        "Rejected"
      );
      await expect(
        livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist([batchUpdateTaxWhitelist])
      ).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).pause(userWallet2.address)).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(livelyAdmin).pause(userWallet2.address)).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).pause(userWallet2.address)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).unpause(userWallet2.address)).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(livelyAdmin).unpause(userWallet2.address)).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).unpause(userWallet2.address)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).pauseAll()).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(livelyAdmin).pauseAll()).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).pauseAll()).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).unpauseAll()).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(livelyAdmin).unpauseAll()).to.revertedWith("Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll()).to.revertedWith("Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).withdrawBalance(userWallet2.address)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).withdrawBalance(userWallet2.address)).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(userWallet2.address)).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(assetAdmin).lockToken([lockRequest])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).lockToken([lockRequest])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).lockToken([lockRequest])).to.revertedWith(
        "Rejected"
      );

      // and
      await expect(
        livelyTokenProxy.connect(assetAdmin).claimToken([ethers.utils.formatBytes32String("0")])
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(livelyAdmin).claimToken([ethers.utils.formatBytes32String("0")])
      ).to.revertedWith("Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).claimToken([ethers.utils.formatBytes32String("0")])
      ).to.revertedWith("Rejected");


      // and
      await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(livelyAdmin).unlockToken([unlockRequest])).to.revertedWith(
        "Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).unlockToken([unlockRequest])).to.revertedWith(
        "Rejected"
      );
    });

    it("Should disable safeMode by assetAdmin success", async () => {

      // when and then
      await expect(livelyTokenProxy.connect(assetAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED))
        .to.emit(livelyTokenProxy, "ProxySafeModeUpdated")
        .withArgs(assetAdminWallet.address, livelyTokenProxy.address, ProxySafeModeStatus.DISABLED);
    });

    it("Should enable update by admin success", async () => {

      // when and then
      await expect(livelyTokenProxy.connect(assetAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
        .to.emit(livelyTokenProxy, "ProxyUpdatabilityUpdated")
        .withArgs(assetAdminWallet.address, livelyTokenProxy.address, ProxyUpdatabilityStatus.ENABLED);

      expect(await livelyTokenProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
    });

    it("Should upgradeTo by anyone failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, user1);
      const newLivelyTokenSubject = await livelyTokenFactory.deploy();

      // when and then
      await expect(
        livelyTokenProxy.connect(user1).upgradeTo(newLivelyTokenSubject.address, typedArray1, false)
      ).to.revertedWith("Forbidden");
    });

    it("Should upgradeTo by systemAdmin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const livelyTokenFactory = new LivelyToken__factory(livelyTokenLibraryAddresses, systemAdmin);
      const newLivelyTokenSubject = await livelyTokenFactory.deploy();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).upgradeTo(newLivelyTokenSubject.address, typedArray1, false))
        .to.emit(livelyTokenProxy, "ProxyUpgraded")
        .withArgs(systemAdminWallet.address, livelyTokenProxy.address, newLivelyTokenSubject.address);

      livelyTokenSubject = newLivelyTokenSubject;
    });

    it("Should setLocalAdmin by anyone failed", async () => {
      // given
      const currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(user1).setLocalAdmin(userWallet2.address)).to.revertedWith(
        "Forbidden"
      );

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminWallet.address);
    });

    it("Should setLocalAdmin by systemAdmin to user2 success", async () => {
      // given
      let currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(userWallet2.address))
        .to.emit(livelyTokenProxy, "ProxyLocalAdminUpdated")
        .withArgs(systemAdminWallet.address, livelyTokenProxy.address, userWallet2.address);

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminWallet.address);
      expect(await livelyTokenProxy.localAdmin()).to.be.hexEqual(userWallet2.address);
    });

    it("Should enable update by systemAdmin failed", async () => {

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.revertedWith(
        "Forbidden"
      );
    });

    it("Should assetManagerERC20 transfer token to user1 success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);

      // when
      await expect(
        assetAudioVideoProgram.connect(audioVideoProgramManager).tokenTransfer(userWallet1.address, dummyAmount)
      )
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAudioVideoProgram.address, userWallet1.address, dummyAmount);

      // and
      const assetAudioVideoProgramBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should user1 to user2 transfer token success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const amount = BigNumber.from(1000).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(userWallet2.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, userWallet2.address, amount);

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
    });

    it("Should assetManagerERC20 approve to user1 and user2 success", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      const user1AllowanceBefore = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet1.address);

      // when
      await expect(
        assetAudioVideoProgram.connect(audioVideoProgramManager).tokenApprove(userWallet2.address, dummyAmount)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, user2AllowanceBefore.add(dummyAmount));

      await expect(
        assetAudioVideoProgram.connect(audioVideoProgramManager).tokenApprove(userWallet1.address, dummyAmount)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet1.address, user1AllowanceBefore.add(dummyAmount));

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should user2 transferFrom from assetManagerERC20 account success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet2.address
      );
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const amount = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = assetManagerAllowanceBefore.sub(amount);

      // when
      await expect(livelyTokenProxy.connect(user2).transferFrom(assetAudioVideoProgram.address, userWallet1.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAudioVideoProgram.address, userWallet1.address, amount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(userWallet2.address, assetAudioVideoProgram.address, userWallet1.address, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, finalAllowance);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
    });

    it("Should assetManagerERC20 increase allowance to user2 success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet2.address
      );
      const finalAllowance = assetManagerAllowanceBefore.add(dummyAmount);

      // when
      await expect(
        assetAudioVideoProgram
          .connect(audioVideoProgramManager)
          .tokenIncreaseAllowance(userWallet2.address, dummyAmount)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, finalAllowance)
        .to.emit(livelyTokenProxy, "ApprovalIncreased")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, dummyAmount);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
    });

    it("Should user2 transferFrom token exceeded allowance from assetManagerERC20 account failed", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet2.address
      );
      const assetMangerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const amount = dummyAmount.mul(10);

      // when
      await expect(
        livelyTokenProxy.connect(user2).transferFrom(assetAudioVideoProgram.address, userWallet1.address, amount)
      ).to.revertedWith("Illegal Allowance");

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      const assetMangerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      expect(assetManagerAllowanceBefore.toString()).to.be.equal(assetManagerAllowanceAfter.toString());
      expect(assetMangerBalanceBefore.toString()).to.be.equal(assetMangerBalanceAfter.toString());
    });

    it("Should assetManagerERC20 decrease allowance from user2 success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet2.address
      );
      const finalAllowance = assetManagerAllowanceBefore.sub(dummyAmount);

      // when
      await expect(
        assetAudioVideoProgram
          .connect(audioVideoProgramManager)
          .tokenDecreaseAllowance(userWallet2.address, dummyAmount)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, finalAllowance)
        .to.emit(livelyTokenProxy, "ApprovalDecreased")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, dummyAmount);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetAudioVideoProgram.address, userWallet2.address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
    });

    it("Should user1 permit to user2 success", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const nonce = await livelyTokenProxy.nonce(userWallet1.address);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        userWallet1.address,
        userWallet2.address,
        dummyAmount,
        nonce,
        deadline,
        livelyTokenProxy.address,
        userWallet1.address,
        networkChainId.toString()
      );

      // when
      await expect(
        livelyTokenProxy.connect(user1).permit(userWallet1.address, userWallet2.address, dummyAmount, deadline, user1Signature)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(userWallet1.address, userWallet2.address, dummyAmount);

      // then
      const nonceAfter = await livelyTokenProxy.nonce(userWallet1.address);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
      expect(nonceAfter.toString()).to.be.equal(nonce.add(BigNumber.from(1)).toString());
    });

    it("Should user2 transferFrom from user1 account success", async () => {
      // given
      let user1Allowance = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const amount = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = user1Allowance.sub(amount);

      // when
      await expect(livelyTokenProxy.connect(user2).transferFrom(userWallet1.address, assetAdminWallet.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, assetAdminWallet.address, amount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(userWallet2.address, userWallet1.address, assetAdminWallet.address, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(userWallet1.address, userWallet2.address, finalAllowance);

      // then
      user1Allowance = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(amount).toString());
    });

    it("Should user1 batch transfer token success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const value = BigNumber.from(500).mul(tokenDecimal);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: value,
        to: userWallet2.address,
      };

      // when
      await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer]))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, userWallet2.address, batchTransfer.amount)
        .to.emit(livelyTokenProxy, "BatchTransfer")
        .withArgs(userWallet1.address, batchTransfer.amount);

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);

      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.sub(value).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(value).toString());
    });

    it("Should user2 batch transferFrom user1 account success", async () => {
      // given
      let user1Allowance = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const value = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = user1Allowance.sub(value);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: userWallet1.address,
        to: assetAdminWallet.address,
        amount: value,
      };

      // when
      await expect(livelyTokenProxy.connect(user2).batchTransferFrom([batchTransferFrom]))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, assetAdminWallet.address, value)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(userWallet2.address, userWallet1.address, assetAdminWallet.address, value)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(userWallet1.address, userWallet2.address, finalAllowance)
        .to.emit(livelyTokenProxy, "BatchTransferFrom")
        .withArgs(userWallet2.address, value);

      // then
      user1Allowance = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(value).toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(value).toString());
    });

    it("Should anyone mint token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(user1).mint(userWallet2.address, dummyAmount))
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should systemAdmin mint token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).mint(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "ACLActionForbidden(1)"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should admin mint token success", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).mint(userWallet2.address, dummyAmount))
        .to.emit(livelyTokenProxy, "Mint")
        .withArgs(assetAdminWallet.address, userWallet2.address, dummyAmount, totalSupplyBefore.add(dummyAmount));

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.add(dummyAmount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should anyone burn token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(user1).burn(userWallet2.address, dummyAmount))
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should systemAdmin burn token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).burn(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "ACLActionForbidden(1)"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should admin burn token success", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).burn(userWallet2.address, dummyAmount))
        .to.emit(livelyTokenProxy, "Burn")
        .withArgs(assetAdminWallet.address, userWallet2.address, dummyAmount, totalSupplyBefore.sub(dummyAmount));

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(dummyAmount).toString());
    });

    it("Should anyone (user1) pause account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(user1).pause(userWallet2.address))
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should systemAdmin pause an account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).pause(userWallet2.address))
        .to.revertedWith("ACLActionForbidden(1)");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should admin pause an user2 account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).pause(userWallet2.address))
        .to.emit(livelyTokenProxy, "Paused")
        .withArgs(assetAdminWallet.address, userWallet2.address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedBefore).to.be.false;
      expect(isPausedAfter).to.be.true;
      expect(pausedAccounts[0]).to.be.equal(userWallet2.address);
    });

    it("Should user2 to user1 transfer token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(user2).transfer(userWallet1.address, dummyAmount))
        .to.revertedWith(
        "Suspended"
      );

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user2 to user1 transferFrom token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(userWallet2.address, assetAdminWallet.address, dummyAmount)
      ).to.revertedWith("Suspended");

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user1 transferFrom user2 token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(userWallet2.address, assetAdminWallet.address, dummyAmount)
      ).to.revertedWith("Suspended");

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user2 approve to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);

      // when
      await expect(livelyTokenProxy.connect(user2).approve(userWallet1.address, dummyAmount))
        .to.revertedWith(
        "Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 increase allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);

      // when
      await expect(livelyTokenProxy.connect(user2).increaseAllowance(userWallet1.address, dummyAmount))
        .to.revertedWith(
        "Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 decrease allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      const amount = BigNumber.from(0);

      // when
      await expect(livelyTokenProxy.connect(user2).decreaseAllowance(userWallet1.address, amount))
        .to.revertedWith(
        "Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 permit allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const nonce = await livelyTokenProxy.nonce(userWallet2.address);
      const user2Signature = await generatePermitDomainSignatureByHardhat(
        userWallet2.address,
        userWallet1.address,
        dummyAmount,
        nonce,
        deadline,
        livelyTokenProxy.address,
        userWallet2.address,
        networkChainId.toString()
      );

      // when
      await expect(
        livelyTokenProxy.connect(user2).permit(userWallet2.address, userWallet1.address, dummyAmount, deadline, user2Signature)
      ).to.revertedWith("Suspended");

      // then
      const nonceAfter = await livelyTokenProxy.nonce(userWallet2.address);
      const user2AllowanceAfter = await livelyTokenProxy.allowance(userWallet2.address, userWallet1.address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
      expect(nonceAfter.toString()).to.be.equal(nonce.toString());
    });

    it("Should admin burn token from user2 when account paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).burn(userWallet2.address, dummyAmount)).to.revertedWith(
        "Suspended"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should admin mint token to user2 when account paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).mint(userWallet2.address, dummyAmount)).to.revertedWith(
        "Suspended"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should anyone (user1) unpause account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(user1).unpause(userWallet2.address))
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should systemAdmin unpause an account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).unpause(userWallet2.address))
        .to.revertedWith("ACLActionForbidden(1)");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should admin unpause an user2 account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unpause(userWallet2.address))
        .to.emit(livelyTokenProxy, "Unpaused")
        .withArgs(assetAdminWallet.address, userWallet2.address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(userWallet2.address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedAfter).to.be.false;
      expect(isPausedBefore).to.be.true;
      expect(pausedAccounts).to.be.empty;
    });

    it("Should user1 to user2 transfer token when account unpaused success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const amount = BigNumber.from(10).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user2).transfer(userWallet1.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet2.address, userWallet1.address, amount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(amount).toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
    });

    it("Should admin pause an asset manager account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).pause(assetAudioVideoProgram.address))
        .to.emit(livelyTokenProxy, "Paused")
        .withArgs(assetAdminWallet.address, assetAudioVideoProgram.address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedBefore).to.be.false;
      expect(isPausedAfter).to.be.true;
      expect(pausedAccounts[0]).to.be.equal(assetAudioVideoProgram.address);
    });

    it("Should lock token from paused assetManagerERC20 failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: userWallet2.address,
        amount: dummyAmount,
        claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      // when
      await expect(
        assetAudioVideoProgram.connect(assetAdmin).tokenLock([lockRequest])
      ).revertedWith("ACLActionForbidden(1)");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet2.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    });

    it("Should unlock token by paused assetAdmin failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetAudioVideoProgram.address,
        reason: "Rollback",
      };


      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest])).to.revertedWith(
        "Suspended"
      );

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should batch unlock token by paused asset manager failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct[] = [
        {
          lockId: ethers.utils.formatBytes32String("0"),
          account: assetAudioVideoProgram.address,
          reason: "Rollback",
        },
      ];

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unlockToken(unlockRequest))
        .to.revertedWith("Suspended");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should admin unpause asset manager account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unpause(assetAudioVideoProgram.address))
        .to.emit(livelyTokenProxy, "Unpaused")
        .withArgs(assetAdminWallet.address, assetAudioVideoProgram.address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(assetAudioVideoProgram.address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedAfter).to.be.false;
      expect(isPausedBefore).to.be.true;
      expect(pausedAccounts).to.be.empty;
    });

    it("Should anyone (user2) pauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(user2).pauseAll())
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should systemAdmin pauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).pauseAll())
        .to.revertedWith("ACLActionForbidden(1)");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should admin pauseAll success", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).pauseAll())
        .to.emit(livelyTokenProxy, "PausedAll")
        .withArgs(assetAdminWallet.address);

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.true;
      expect(isPausedAllBefore).to.be.false;
    });

    it("Should transfer token by anyone when token paused failed", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminWallet.address);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(assetAdmin).transfer(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).transfer(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminWallet.address);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
    });

    it("Should transferFrom token by anyone when token paused failed", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminWallet.address);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(assetAudioVideoProgram.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Token Paused");
      await expect(
        livelyTokenProxy.connect(assetAdmin).transferFrom(assetAudioVideoProgram.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Token Paused");
      await expect(
        livelyTokenProxy.connect(systemAdmin).transferFrom(assetAudioVideoProgram.address, userWallet2.address, dummyAmount)
      ).to.revertedWith("Token Paused");

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminWallet.address);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
    });

    it("Should approve token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(user1).approve(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(assetAdmin).approve(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).approve(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should increase allowance token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);

      // when
      await expect(livelyTokenProxy.connect(user1).increaseAllowance(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(assetAdmin).increaseAllowance(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should decrease allowance token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      const amount = BigNumber.from(0);

      // when
      await expect(livelyTokenProxy.connect(user1).decreaseAllowance(userWallet2.address, amount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(assetAdmin).decreaseAllowance(userWallet2.address, amount))
        .to.revertedWith(
        "Token Paused"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).decreaseAllowance(userWallet2.address, amount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should permit allowance by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const user1NonceBefore = await livelyTokenProxy.nonce(userWallet1.address);
      const adminNonceBefore = await livelyTokenProxy.nonce(assetAdminWallet.address);
      const systemAdminNonceBefore = await livelyTokenProxy.nonce(systemAdminWallet.address);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        userWallet1.address,
        userWallet2.address,
        dummyAmount,
        user1NonceBefore,
        deadline,
        livelyTokenProxy.address,
        userWallet1.address,
        networkChainId.toString()
      );
      const adminSignature = await generatePermitDomainSignatureByHardhat(
        assetAdminWallet.address,
        userWallet2.address,
        dummyAmount,
        adminNonceBefore,
        deadline,
        livelyTokenProxy.address,
        assetAdminWallet.address,
        networkChainId.toString()
      );
      const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
        systemAdminWallet.address,
        userWallet2.address,
        dummyAmount,
        systemAdminNonceBefore,
        deadline,
        livelyTokenProxy.address,
        systemAdminWallet.address,
        networkChainId.toString()
      );

      // when
      await expect(
        livelyTokenProxy.connect(user1).permit(userWallet1.address, userWallet2.address, dummyAmount, deadline, user1Signature)
      ).to.revertedWith("Token Paused");
      await expect(
        livelyTokenProxy.connect(assetAdmin).permit(assetAdminWallet.address, userWallet2.address, dummyAmount, deadline, adminSignature)
      ).to.revertedWith("Token Paused");
      await expect(
        livelyTokenProxy
          .connect(systemAdmin)
          .permit(systemAdminWallet.address, userWallet2.address, dummyAmount, deadline, systemAdminSignature)
      ).to.revertedWith("Token Paused");

      // then
      const user1NonceAfter = await livelyTokenProxy.nonce(userWallet1.address);
      const adminNonceAfter = await livelyTokenProxy.nonce(assetAdminWallet.address);
      const systemAdminNonceAfter = await livelyTokenProxy.nonce(systemAdminWallet.address);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(userWallet1.address, userWallet2.address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(assetAdminWallet.address, userWallet2.address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminWallet.address, userWallet2.address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
      expect(user1NonceAfter.toString()).to.be.equal(user1NonceBefore.toString());
      expect(adminNonceAfter.toString()).to.be.equal(adminNonceBefore.toString());
      expect(systemAdminNonceAfter.toString()).to.be.equal(systemAdminNonceBefore.toString());
    });

    it("Should burn token by admin when token paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).burn(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should mint token by anyone when token paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(assetAdminWallet.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).mint(userWallet2.address, dummyAmount))
        .to.revertedWith(
        "Token Paused"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(assetAdminWallet.address);
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should lock token when token paused failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: userWallet2.address,
        amount: dummyAmount,
        claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      // when
      await expect(
        assetAudioVideoProgram.connect(audioVideoProgramManager).tokenLock([lockRequest])
      ).revertedWith("Token Paused");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet2.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    });

    it("Should lock token when token paused failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: userWallet2.address,
        amount: dummyAmount,
        claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

      // when
      await expect(
        assetAudioVideoProgram.connect(audioVideoProgramManager).tokenLock([lockRequest])
      ).revertedWith("Token Paused");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet2.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    });


    it("Should batch claim token when token paused failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);

      // when
      await expect(
        livelyTokenProxy.connect(assetAdmin).claimToken([ethers.utils.formatBytes32String("00")])
      ).revertedWith("Token Paused");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should unlock token when token paused failed", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetAudioVideoProgram.address,
        reason: "Rollback",
      };

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unlockToken([unlockRequest]))
        .to.revertedWith("Token Paused");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });


    it("Should anyone (user2) unpauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(user1).unpauseAll())
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should systemAdmin unpauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll())
        .to.revertedWith("ACLActionForbidden(1)");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should admin unpauseAll success", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unpauseAll())
        .to.emit(livelyTokenProxy, "UnpausedAll")
        .withArgs(assetAdminWallet.address);

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.false;
      expect(isPausedAllBefore).to.be.true;
    });

    it("Should set tax rate by anyone failed", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();
      const taxValue = BigNumber.from(300);

      // when
      await expect(livelyTokenProxy.connect(user1).updateTaxRate(taxValue))
        .to.revertedWith("ACLActionForbidden(5)");

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
    });

    it("Should set tax rate by systemAdmin failed", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();
      const taxValue = BigNumber.from(300);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(taxValue))
        .to.revertedWith("ACLActionForbidden(1)");

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
    });

    it("Should set tax rate by admin success", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).updateTaxRate(taxValue))
        .to.emit(livelyTokenProxy, "TaxRateUpdated")
        .withArgs(assetAdminWallet.address, taxValue);

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.add(taxValue).toString());
    });

    it("Should admin transfer token to user1 along with tax success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
      const amount = BigNumber.from(100).mul(tokenDecimal);
      const taxAmount = BigNumber.from(3).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(userWallet2.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, userWallet2.address, amount.sub(taxAmount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, assetTaxTreasury.address, taxAmount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
      expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
    });

    it("Should user1 transferFrom token from assetManagerERC20 along with tax success", async () => {
      // given
      const assetManagerUser1AllowanceBefore = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet1.address
      );
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
      const amount = BigNumber.from(100).mul(tokenDecimal);
      const taxAmount = BigNumber.from(3).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transferFrom(assetAudioVideoProgram.address, userWallet2.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAudioVideoProgram.address, userWallet2.address, amount.sub(taxAmount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetAudioVideoProgram.address, assetTaxTreasury.address, taxAmount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(userWallet1.address, assetAudioVideoProgram.address, userWallet2.address, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetAudioVideoProgram.address, userWallet1.address, assetManagerUser1AllowanceBefore.sub(amount));

      // then
      const assetManagerUser1AllowanceAfter = await livelyTokenProxy.allowance(
        assetAudioVideoProgram.address,
        userWallet1.address
      );
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(assetTaxTreasury.address);
      expect(assetManagerUser1AllowanceAfter.toString()).to.be.equal(
        assetManagerUser1AllowanceBefore.sub(amount).toString()
      );
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
      expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
    });

    it("Should set tax whitelist by anyone failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
        account: userWallet1.address,
        isDeleted: false,
      };

      // when
      await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist([batchTaxWhitelistRequest]))
        .to.revertedWith(
        "ACLActionForbidden(5)"
      );

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set batch tax whitelist by systemAdmin failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
        account: userWallet1.address,
        isDeleted: false,
      };

      // when
      await expect(
        livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist([batchTaxWhitelistRequest])
      ).to.revertedWith("ACLActionForbidden(1)");

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set batch tax whitelist by admin success", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.TaxWhitelistUpdateRequestStruct = {
        account: userWallet1.address,
        isDeleted: false,
      };

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).updateTaxWhitelist([batchTaxWhitelistRequest]))
        .to.emit(livelyTokenProxy, "TaxWhitelistUpdated")
        .withArgs(assetAdminWallet.address, userWallet1.address, false);

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql([...taxWhitelistBefore, userWallet1.address]);
    });

    it("Should user1 transfer token with tax and tax whitelist success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(userWallet1.address);
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const amount = BigNumber.from(100).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(userWallet2.address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(userWallet1.address, userWallet2.address, amount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(userWallet1.address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should deposit eth coin to lively token success", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceBefore = await provider.getBalance(userWallet1.address);
      const transaction: TransactionRequest = {
        to: livelyTokenProxy.address,
        value: ethers.utils.parseEther("10"),
      };

      // when
      const response = await user1.sendTransaction(transaction);

      // then
      const receiptTx = await provider.getTransactionReceipt(response.hash);
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceAfter = await provider.getBalance(userWallet1.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(
        livelyContractBalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore
          .sub(BigNumber.from(10).mul(tokenDecimal))
          .sub(receiptTx.gasUsed.mul(receiptTx.effectiveGasPrice))
          .toString()
      );
    });

    it("Should withdraw eth coin by anyone failed", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);

      // when
      await expect(livelyTokenProxy.connect(user1).withdrawBalance(userWallet1.address))
        .to.revertedWith(
        "ACLActionForbidden(5)"
      );

      // then
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
    });

    it("Should withdraw eth coin by systemAdmin failed", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(userWallet1.address))
        .to.revertedWith(
        "ACLActionForbidden(6)"
      );

      // then
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
    });

    it("Should withdraw eth coin by admin success", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceBefore = await provider.getBalance(userWallet1.address);

      // when
      await livelyTokenProxy.connect(assetAdmin).withdrawBalance(userWallet1.address);

      // then
      const user1BalanceAfter = await provider.getBalance(userWallet1.address);
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(
        livelyContractBalanceBefore.sub(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
    });

    it("Should lock token from asset manager to user2 success", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet1.address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetAudioVideoProgram.address,
          dest: userWallet2.address,
          amount: dummyAmount.div(5),
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetAudioVideoProgram.address,
          dest: userWallet2.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 72 * 60 * 60),
        },
        {
          source: assetAudioVideoProgram.address,
          dest: userWallet2.address,
          amount: dummyAmount.mul(2),
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 96 * 60 * 60),
        },
        {
          source: assetAudioVideoProgram.address,
          dest: userWallet1.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetAudioVideoProgram.address,
          dest: userWallet1.address,
          amount: dummyAmount,
          claimAt: BigNumber.from(((Date.now() / 1000) | 0) + 72 * 60 * 60),
        },
      ];

      let totalAmount = BigNumber.from(0);
      const user2LockIdsSize = user2LockIds.length;
      let user2LockAmount = BigNumber.from(0);
      let user1LockAmount = BigNumber.from(0);
      for (let i = 0; i < lockRequests.length; i++) {
        if (lockRequests[i].dest === userWallet2.address) {
          user2LockIds.push(
            ethers.utils.keccak256(
              ethers.utils.solidityPack(
                ["address", "address", "uint256", "uint256"],
                [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].claimAt, lockRequests[i].amount]
              )
            )
          );
          user2LockAmount = user2LockAmount.add(<BigNumber>lockRequests[i].amount);
        } else {
          user1LockIds.push(
            ethers.utils.keccak256(
              ethers.utils.solidityPack(
                ["address", "address", "uint256", "uint256"],
                [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].claimAt, lockRequests[i].amount]
              )
            )
          );
          user1LockAmount = user1LockAmount.add(<BigNumber>lockRequests[i].amount);
        }
        totalAmount = totalAmount.add(<BigNumber>lockRequests[i].amount);
      }

      // when
      await expect(assetAudioVideoProgram.connect(audioVideoProgramManager).tokenLock(lockRequests))
        .to.emit(livelyTokenProxy, "TokenLocked")
        .withArgs(
          user2LockIds[user2LockIdsSize],
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.address,
          userWallet2.address,
          lockRequests[0].claimAt,
          lockRequests[0].amount
        )
        .to.emit(livelyTokenProxy, "TokenLocked")
        .withArgs(
          user2LockIds[user2LockIdsSize + 1],
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.address,
          userWallet2.address,
          lockRequests[1].claimAt,
          lockRequests[1].amount
        )
        .to.emit(livelyTokenProxy, "TokenLocked")
        .withArgs(
          user2LockIds[user2LockIdsSize + 2],
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.address,
          userWallet2.address,
          lockRequests[2].claimAt,
          lockRequests[2].amount
        )
        .to.emit(livelyTokenProxy, "TokenLocked")
        .withArgs(
          user1LockIds[0],
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.address,
          userWallet1.address,
          lockRequests[3].claimAt,
          lockRequests[3].amount
        )
        .to.emit(livelyTokenProxy, "TokenLocked")
        // .withArgs(
        //   user1LockIds[1],
        //   assetAudioVideoProgram.address,
        //   assetAudioVideoProgram.address,
        //   userWallet1.address,
        //   lockRequests[4].claimAt,
        //   lockRequests[4].amount
        // )
        // .to.emit(livelyTokenProxy, "BatchTokenLocked")
        // .withArgs(assetAudioVideoProgram.address, totalAmount);

      // then
      const user2Lock1 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize], userWallet2.address)) };
      const user2Lock2 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize + 1], userWallet2.address)) };
      const user2Lock3 = { ...(await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize + 2], userWallet2.address)) };
      const user1Lock1 = { ...(await livelyTokenProxy.lockInfo(user1LockIds[0], userWallet1.address)) };
      const user1Lock2 = { ...(await livelyTokenProxy.lockInfo(user1LockIds[1], userWallet1.address)) };
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet1.address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(totalAmount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(user2LockAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(user2LockAmount).toString());
      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(user1LockAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(user1LockAmount).toString());

      // and
      expect(user2Lock1[0].toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(user2Lock1[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock1[2].toString()).to.be.equal(lockRequests[0].claimAt.toString());
      expect(user2Lock1[3]).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>user2Lock1[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user2Lock2[0].toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(user2Lock2[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock2[2].toString()).to.be.equal(lockRequests[1].claimAt.toString());
      expect(user2Lock2[3]).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>user2Lock2[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user2Lock3[0].toString()).to.be.equal(lockRequests[2].amount.toString());
      expect(user2Lock3[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock3[2].toString()).to.be.equal(lockRequests[2].claimAt.toString());
      expect(user2Lock3[3]).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>user2Lock3[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user1Lock1[0].toString()).to.be.equal(lockRequests[3].amount.toString());
      expect(user1Lock1[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user1Lock1[2].toString()).to.be.equal(lockRequests[3].claimAt.toString());
      expect(user1Lock1[3]).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>user1Lock1[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user1Lock2[0].toString()).to.be.equal(lockRequests[4].amount.toString());
      expect(user1Lock2[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user1Lock2[2].toString()).to.be.equal(lockRequests[4].claimAt.toString());
      expect(user1Lock2[3]).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>user1Lock2[4]).to.be.equal(LockState.LOCKED);
    });

    it("Should claim token from user2 success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet2.address);
      const ids = [user2LockIds[1], user2LockIds[2]];
      const [amount1] = await livelyTokenProxy.lockInfo(user2LockIds[1], userWallet2.address);
      const [amount2] = await livelyTokenProxy.lockInfo(user2LockIds[2], userWallet2.address);
      await provider.send("evm_increaseTime", [200 * 60 * 60]);

      // when
      await expect(livelyTokenProxy.connect(user2).claimToken(ids))
        .to.emit(livelyTokenProxy, "TokenClaimed")
        .withArgs(user2LockIds[1], userWallet2.address, assetAudioVideoProgram.address, amount1)
        .to.emit(livelyTokenProxy, "TokenClaimed")
        .withArgs(user2LockIds[2], userWallet2.address, assetAudioVideoProgram.address, amount2);

      // then
      const [, , , , status1] = await livelyTokenProxy.lockInfo(user2LockIds[1], userWallet2.address);
      const [, , , , status2] = await livelyTokenProxy.lockInfo(user2LockIds[2], userWallet2.address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(userWallet2.address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet2.address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet2.address);

      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount1).add(amount2).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount1).sub(amount2).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
      expect(<LockState>status1).to.be.equal(LockState.CLAIMED);
      expect(<LockState>status2).to.be.equal(LockState.CLAIMED);
    });

    it("Should unlock token by dao executor from user1 success", async () => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(userWallet1.address);
      const unlockRequests: IERC20Lock.UnLockTokenRequestStruct[] = [
        {
          lockId: user1LockIds[0],
          account: userWallet1.address,
          reason: "Rollback1",
        },
        {
          lockId: user1LockIds[1],
          account: userWallet1.address,
          reason: "Rollback2",
        },
      ];

      // const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequests]);
      const [amount1, , , source1] = await livelyTokenProxy.lockInfo(user1LockIds[0], userWallet1.address);
      const [amount2, , , source2] = await livelyTokenProxy.lockInfo(user1LockIds[0], userWallet1.address);

      // when
      await expect(livelyTokenProxy.connect(assetAdmin).unlockToken(unlockRequests))
        .to.emit(livelyTokenProxy, "TokenUnlocked")
        .withArgs(user1LockIds[0], assetAdminWallet.address, userWallet1.address, source1, amount1, unlockRequests[0].reason)
        .to.emit(livelyTokenProxy, "TokenUnlocked")
        .withArgs(user1LockIds[1], assetAdminWallet.address, userWallet1.address, source2, amount2, unlockRequests[1].reason)
      // const txReceipt = await transactionResponse.wait(0);

      // // then
      // let logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[0]);
      // let eventUnlock: TokenUnlockedEventObject = <TokenUnlockedEventObject>(<unknown>logDesc.args);
      //
      // expect(eventUnlock.id).to.be.equal(user1LockIds[0]);
      // expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      // expect(eventUnlock.account).to.be.equal(userWallet1.address);
      // expect(eventUnlock.dest).to.be.equal(source1);
      // expect(eventUnlock.amount).to.be.equal(amount1);
      // expect(eventUnlock.reason).to.be.equal(unlockRequests[0].reason);
      //
      // // and
      // logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[1]);
      // eventUnlock = <TokenUnlockedEventObject>(<unknown>logDesc.args);
      //
      // expect(eventUnlock.id).to.be.equal(user1LockIds[1]);
      // expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      // expect(eventUnlock.account).to.be.equal(userWallet1.address);
      // expect(eventUnlock.dest).to.be.equal(source2);
      // expect(eventUnlock.amount).to.be.equal(amount2);
      // expect(eventUnlock.reason).to.be.equal(unlockRequests[1].reason);
      //
      // // and
      // logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[2]);
      // const batchEventUnlock: BatchTokenUnlockedEventObject = <BatchTokenUnlockedEventObject>(<unknown>logDesc.args);
      //
      // expect(batchEventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      // expect(batchEventUnlock.totalAmount).to.be.equal(amount1.add(amount2));

      // and
      const [, , , , status1] = await livelyTokenProxy.lockInfo(user1LockIds[0], userWallet1.address);
      const [, , , , status2] = await livelyTokenProxy.lockInfo(user1LockIds[0], userWallet1.address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetAudioVideoProgram.address);
      const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(userWallet1.address);
      const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(userWallet1.address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(
        assetManagerBalanceBefore.add(amount1).add(amount2).toString()
      );
      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.sub(amount1).sub(amount2).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(
        user1TotalBalanceBefore.sub(amount1).sub(amount2).toString()
      );
      expect(<LockState>status1).to.be.equal(LockState.UNLOCKED);
      expect(<LockState>status2).to.be.equal(LockState.UNLOCKED);
    });

  });
});
