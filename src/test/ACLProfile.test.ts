import { expect } from "chai";
import { BigNumber, BigNumberish, BytesLike, Signer, Wallet } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

/* eslint-disable camelcase */
import {
  AccessControl,
  AccessControl__factory,
  ACLManager,
  ACLManager__factory,
  ACLManagerProxy__factory,
  ACLManagerTest,
  ACLManagerTest__factory,
  ACLProxy__factory,
  ContextManager,
  ContextManager__factory,
  DomainManager,
  DomainManager__factory,
  DomainManagerTest,
  DomainManagerTest__factory,
  FunctionManager,
  FunctionManager__factory,
  UniverseManager,
  UniverseManager__factory,
  IACLManager,
  IContextManagement,
  IDomainManagement,
  IDomainManagementTest,
  IFunctionManagement,
  IUniverseManagement,
  IMemberManagement,
  IPolicyManagement,
  IProfileContextManagement,
  IProfileDomainManagement, IProfileFunctionManagement, IProfileUniverseManagement,
  IProfileManagement, IProfileMemberManagement, IProfilePolicyManagement,
  IProfileRealmManagement, IProfileRoleManagement,
  IProfileTypeManagement,
  IProxy,
  IRealmManagement,
  IRoleManagement,
  ITypeManagement,
  LACLCommons,
  LACLCommons__factory,
  LACLManagerTest,
  LACLManagerTest__factory,
  LProfileCommons,
  LProfileCommons__factory,
  LProfileRolePolicy,
  LProfileRolePolicy__factory,
  MemberManager,
  MemberManager__factory,
  PolicyManager,
  PolicyManager__factory,
  ProfileAccessControl,
  ProfileAccessControl__factory,
  ProfileContextManager,
  ProfileContextManager__factory,
  ProfileDomainManager,
  ProfileDomainManager__factory,
  ProfileFunctionManager,
  ProfileFunctionManager__factory,
  ProfileUniverseManager,
  ProfileUniverseManager__factory,
  ProfileManager,
  ProfileManager__factory,
  ProfileMemberManager,
  ProfileMemberManager__factory, ProfileMemberManagerTest, ProfileMemberManagerTest__factory,
  ProfilePolicyManager,
  ProfilePolicyManager__factory,
  ProfileRealmManager,
  ProfileRealmManager__factory,
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
import {
  InitializedEventObject
} from "../../typechain/types/acl/ACLManager";
import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
import { ACLManagerTestLibraryAddresses } from "../../typechain/types/factories/test/acl/ACLManagerTest__factory";
import { Address } from "hardhat-deploy/dist/types";
import {
  ActionType,
  ActivityStatus,
  AgentType,
  AlterabilityStatus,
  generateDomainSeparator,
  generateProfileContextDomainSignatureManually,
  generateProfilePredictContextDomainByWaffleProvider,
  LIVELY_PROFILE_ANY_TYPE_ID,
  LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
  LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_ACL_DOMAIN_ID,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
  PolicyType,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus,
  ScopeType, generateMemberSignatureManually, generateProfileMemberSignatureManually
} from "../utils/Utils";
import { ProxyUpgradedEventObject } from "../../typechain/types/proxy/Proxy";
import { ProxyLocalAdminUpdatedEventObject } from "../../typechain/types/proxy/IProxy";
import {IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import {IACLCommons} from "../../typechain/types/acl/scope/FunctionManager";
import {IACLCommons as IProfileACLCommons} from "../../typechain/types/acl/profile/scope/ProfileFunctionManager";
import {IACLCommons as IProfileACLCommonsRoles} from "../../typechain/types/acl/profile/agent/ProfileRoleManager";
import { RoleManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/RoleManager__factory";
import { PolicyManagerLibraryAddresses } from "../../typechain/types/factories/acl/policy/PolicyManager__factory";
import { ProfileManagerLibraryAddresses } from "../../typechain/types/factories/acl/profile/ProfileManager__factory";
import {
  ProfileMemberManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileMemberManager__factory";
import {
  ProfileRoleManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileRoleManager__factory";
import {
  ProfilePolicyManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/policy/ProfilePolicyManager__factory";
import {
  ProfileContextManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileContextManager__factory";
import {
  ProfileFunctionManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileFunctionManager__factory";
import {
  ProfileRealmManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileRealmManager__factory";
import {
  ProfileDomainManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileDomainManager__factory";
import { waitForTx } from "hardhat-deploy/dist/src/helpers";
import { PromiseOrValue } from "../../typechain/types/common";
import { MemberManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/MemberManager__factory";
import { TypeManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/TypeManager__factory";
import { FunctionManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/FunctionManager__factory";
import { ContextManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/ContextManager__factory";
import { RealmManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/RealmManager__factory";
import { DomainManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/DomainManager__factory";
import {
  UniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/scope/UniverseManger.sol/UniverseManager__factory";
import {
  ProfileTypeManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileTypeManager__factory";
import {
  ProfileUniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileUniverseManger.sol/ProfileUniverseManager__factory";
const { provider, deployMockContract } = waffle;

describe("Lively Guard Profile Tests", function() {
    let livelyAdmin: Signer;
    let systemAdmin: Signer;
    let user1: Signer;
    let user2: Signer;
    let user3: Signer;
    let profileOwner: Signer;
    let profileOwner2: Signer;
    let profileAdmin: Signer;
    let profileAdmin2: Signer;
    let profileSystemAdmin: Signer;
    let profileSystemAdmin2: Signer;
    let livelyAdminWallet: Wallet;
    let systemAdminWallet: Wallet;
    let userWallet1: Wallet;
    let userWallet2: Wallet;
    let userWallet3: Wallet;
    let profileOwnerWallet: Wallet;
    let profileOwnerWallet2: Wallet;
    let profileAdminWallet: Wallet;
    let profileAdminWallet2: Wallet;
    let profileSystemAdminWallet: Wallet;
    let profileSystemAdminWallet2: Wallet;
    let lACLCommons: LACLCommons;
    let lProfileCommons: LProfileCommons;
    let lProfileRolePolicy: LProfileRolePolicy;

    // acl libraries
    let linkCommonLibraryAddresses: unknown;

    // profiles libraries
    let linkProfileCommonLibraryAddresses: unknown;
    let linkProfileRolePolicyLibraryAddresses: unknown;

    // main acl contracts
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

    // profile acl contracts
    let profileMemberManagerSubject: ProfileMemberManager;
    let profileMemberManagerProxy: ProfileMemberManager;
    let profileMemberManagerDelegateProxy: ProfileMemberManager;
    let profileRoleManagerSubject: ProfileRoleManager;
    let profileRoleManagerProxy: ProfileRoleManager;
    let profileRoleManagerDelegateProxy: ProfileRoleManager;
    let profileTypeManagerSubject: ProfileTypeManager;
    let profileTypeManagerProxy: ProfileTypeManager;
    let profileTypeManagerDelegateProxy: ProfileTypeManager;
    let profileFunctionManagerSubject: ProfileFunctionManager;
    let profileFunctionManagerProxy: ProfileFunctionManager;
    let profileFunctionManagerDelegateProxy: ProfileFunctionManager;
    let profileContextManagerSubject: ProfileContextManager;
    let profileContextManagerProxy: ProfileContextManager;
    let profileContextManagerDelegateProxy: ProfileContextManager;
    let profileRealmManagerSubject: ProfileRealmManager;
    let profileRealmManagerProxy: ProfileRealmManager;
    let profileRealmManagerDelegateProxy: ProfileRealmManager;
    let profileDomainManagerSubject: ProfileDomainManager;
    let profileDomainManagerProxy: ProfileDomainManager;
    let profileDomainManagerDelegateProxy: ProfileDomainManager;
    let profileUniverseManagerSubject: ProfileUniverseManager;
    let profileUniverseManagerProxy: ProfileUniverseManager;
    let profileUniverseManagerDelegateProxy: ProfileUniverseManager;
    let profilePolicyManagerSubject: ProfilePolicyManager;
    let profilePolicyManagerProxy: ProfilePolicyManager;
    let profilePolicyManagerDelegateProxy: ProfilePolicyManager;
    let profileAccessControlSubject: ProfileAccessControl;
    let profileAccessControlProxy: ProfileAccessControl;
    let profileAccessControlDelegateProxy: ProfileAccessControl;

    // acl manager contract
    let aclManagerSubject: ACLManager;
    let aclManagerProxy: ACLManager;

    let networkChainId: BigNumber;
    let aclRoleTestId: string;
    let aclRoleTestId2: string;
    let aclRoleTestId3: string;
    let aclRoleTestId4: string;
    let aclRoleUniverseAdminTestId: string;
    let aclTypeTestId: string;
    let aclPolicyTestId: string;

    let aclDomainTestId: string;
    let aclRealmTestId: string;

    let profileDomainTestId: string;
    let profileRealmTestId: string;
    let profileMemberContextTestId: string;
    let profileRoleContextTestId: string;

    let profileMemberManagerTest: ProfileMemberManagerTest;
    let profileRoleManagerTestProxy: ProfileRoleManager;

    let profileTestId: string;
    let profileTestId2: string;
    let profileExpiredAt: BigNumber;
    let profileOwnerId: string;
    let profileOwnerId2: string;
    let profileAdminId: string;
    let profileAdminId2: string;
    let profileSystemAdminId: string;
    let profileSystemAdminId2: string;
    const ACL_ROLE_TEST_NAME = "ACL_ROLE_TEST";
    const ACL_ROLE_TEST_NAME_2 = "ACL_ROLE_TEST_2";
    const ACL_ROLE_TEST_NAME_3 = "ACL_ROLE_TEST_3";
    const ACL_ROLE_TEST_NAME_4 = "ACL_ROLE_TEST_4";
    const ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME = "ACL_ROLE_UNIVERSE_ADMIN_TEST";
    const ACL_TYPE_TEST_NAME = "ACL_TYPE_TEST";
    const ACL_POLICY_TEST_NAME = "ACL_POLICY_TEST";
    const ACL_DOMAIN_TEST_NAME = "ACL_DOMAIN_TEST";
    const ACL_REALM_TEST_NAME = "ACL_REALM_TEST";

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

    const PROFILE_TEST_NAME = "ProfileTest";
    const PROFILE_TEST_NAME_2 = "ProfileTest2";
    const PROFILE_DOMAIN_TEST_NAME = "ProfileDomainTest";
    const PROFILE_REALM_TEST_NAME = "ProfileRealmTest";
    const PROFILE_MEMBER_MANAGER_CONTRACT_NAME_TEST = "ProfileMemberManagerTest";

    const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
    const profileTestMemberIface = new ethers.utils.Interface(ProfileMemberManagerTest__factory.abi);

    const emptyMemberSignature: IACLCommons.MemberSignatureStruct = {
      account: ethers.constants.AddressZero,
      expiredAt: 0,
      signature: new Int8Array(0)
    }
    const emptyProfileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
      profileName: PROFILE_TEST_NAME,
      account: ethers.constants.AddressZero,
      expiredAt: 0,
      signature: new Int8Array(0)
    }

    this.beforeAll(async () => {
      [
        livelyAdmin,
        systemAdmin,
        user1,
        user2,
        user3,
        profileOwner,
        profileOwner2,
        profileAdmin,
        profileAdmin2,
        profileSystemAdmin,
        profileSystemAdmin2
      ] = await ethers.getSigners();

      [
        livelyAdminWallet,
        systemAdminWallet,
        userWallet1,
        userWallet2,
        userWallet3,
        profileOwnerWallet,
        profileOwnerWallet2,
        profileAdminWallet,
        profileAdminWallet2,
        profileSystemAdminWallet,
        profileSystemAdminWallet2
      ] = waffle.provider.getWallets();

      networkChainId = await provider.send("eth_chainId", []);
    });

    describe("ACL Libraries Deployments Test", function() {
      it("Should profile LACLCommons deploy success", async () => {
        // given
        const aclFactory = new LACLCommons__factory(systemAdmin);

        // when
        lACLCommons = await aclFactory.deploy();

        // then
        expect(lACLCommons.address).not.null;
        expect(await lACLCommons.LIB_NAME()).to.be.equal("LACLCommons");
        expect(await lACLCommons.LIB_VERSION()).to.be.equal("3.0.0");
      });

      it("Should profile LProfileCommons deploy success", async () => {
        // given
        const aclFactory = new LProfileCommons__factory(systemAdmin);

        // when
        lProfileCommons = await aclFactory.deploy();

        // then
        expect(lProfileCommons.address).not.null;
        expect(await lProfileCommons.LIB_NAME()).to.be.equal("LProfileCommons");
        expect(await lProfileCommons.LIB_VERSION()).to.be.equal("3.0.0");
      });

      it("Should profile LProfileRolePolicy deploy success", async () => {
        // given
        const aclFactory = new LProfileRolePolicy__factory(systemAdmin);

        // when
        lProfileRolePolicy = await aclFactory.deploy();

        // then
        expect(lProfileRolePolicy.address).not.null;
        expect(await lProfileRolePolicy.LIB_NAME()).to.be.equal("LProfileRolePolicy");
        expect(await lProfileRolePolicy.LIB_VERSION()).to.be.equal("3.0.0");
      });
    });

    describe("ACL Modules Subject Tests", function() {
      this.beforeAll( async() => {
        // acl libraries
        linkCommonLibraryAddresses = {
          "src/contracts/lib/acl/LACLCommons.sol:LACLCommons": lACLCommons.address
        }
      })

      it("Should profile MemberManager subject deploy success", async() => {
        // given
        const memberManagerFactory = new MemberManager__factory(<MemberManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        memberManagerSubject = await memberManagerFactory.deploy();

        // then
        expect(memberManagerSubject.address).not.null;
        expect(await memberManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await memberManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await memberManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await memberManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await memberManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile RoleManager subject deploy success", async() => {
        // given
        const roleManagerFactory = new RoleManager__factory(<RoleManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        roleManagerSubject = await roleManagerFactory.deploy();

        // then
        expect(roleManagerSubject.address).not.null;
        expect(await roleManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await roleManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await roleManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await roleManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await roleManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile TypeManager subject deploy success", async() => {
        // given
        const typeManagerFactory = new TypeManager__factory(<TypeManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        typeManagerSubject = await typeManagerFactory.deploy();

        // then
        expect(typeManagerSubject.address).not.null;
        expect(await typeManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await typeManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await typeManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await typeManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await typeManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile FunctionManager subject deploy success", async() => {
        // given
        const functionManagerFactory = new FunctionManager__factory(<FunctionManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        functionManagerSubject = await functionManagerFactory.deploy();

        // then
        expect(functionManagerSubject.address).not.null;
        expect(await functionManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await functionManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await functionManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await functionManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await functionManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ContextManager subject deploy success", async() => {
        // given
        const contextManagerFactory = new ContextManager__factory(<ContextManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        contextManagerSubject = await contextManagerFactory.deploy();

        // then
        expect(contextManagerSubject.address).not.null;
        expect(await contextManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await contextManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await contextManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await contextManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await contextManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile RealmManager subject deploy success", async() => {
        // given
        const realmManagerFactory = new RealmManager__factory(<RealmManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        realmManagerSubject = await realmManagerFactory.deploy();

        // then
        expect(realmManagerSubject.address).not.null;
        expect(await realmManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await realmManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await realmManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await realmManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await realmManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile DomainManager subject deploy success", async() => {
        // given
        const domainManagerFactory = new DomainManager__factory(<DomainManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        domainManagerSubject = await domainManagerFactory.deploy();

        // then
        expect(domainManagerSubject.address).not.null;
        expect(await domainManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await domainManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await domainManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await domainManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await domainManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile UniverseManager subject deploy success", async() => {
        // given
        const universeManagerFactory = new UniverseManager__factory(<UniverseManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        universeManagerSubject = await universeManagerFactory.deploy();

        // then
        expect(universeManagerSubject.address).not.null;
        expect(await universeManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await universeManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await universeManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await universeManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await universeManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile PolicyManager subject deploy success", async() => {
        // given
        const policyManagerFactory = new PolicyManager__factory(<PolicyManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        policyManagerSubject = await policyManagerFactory.deploy();

        // then
        expect(policyManagerSubject.address).not.null;
        expect(await policyManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await policyManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await policyManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await policyManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await policyManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileManager subject deploy success", async() => {
        // given
        const profileManagerFactory = new ProfileManager__factory(<ProfileManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        profileManagerSubject = await profileManagerFactory.deploy();

        // then
        expect(profileManagerSubject.address).not.null;
        expect(await profileManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile AccessControl subject deploy success", async() => {
        // given
        const accessControlFactory = new AccessControl__factory(systemAdmin);

        // when
        accessControlSubject = await accessControlFactory.deploy();

        // then
        expect(accessControlSubject.address).not.null;
        expect(await accessControlSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await accessControlSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await accessControlSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await accessControlSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await accessControlSubject.initVersion()).to.be.equal(0);
      })
    })

    describe("ACL Profile Modules Subject Tests", function() {
      this.beforeAll( async() => {
        // profiles libraries
        linkProfileCommonLibraryAddresses = {
          "src/contracts/lib/acl/LProfileCommons.sol:LProfileCommons": lProfileCommons.address
        }

        linkProfileRolePolicyLibraryAddresses = {
          "src/contracts/lib/acl/LProfileRolePolicy.sol:LProfileRolePolicy": lProfileRolePolicy.address
        }
      })

      it("Should profile ProfileMemberManager subject deploy success", async() => {
        // given
        const profileMemberManagerFactory = new ProfileMemberManager__factory(<ProfileMemberManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileMemberManagerSubject = await profileMemberManagerFactory.deploy();

        // then
        expect(profileMemberManagerSubject.address).not.null;
        expect(await profileMemberManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileMemberManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileMemberManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileMemberManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileMemberManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileRoleManager subject deploy success", async() => {
        // given
        const profileRoleManagerFactory = new ProfileRoleManager__factory(<ProfileRoleManagerLibraryAddresses>linkProfileRolePolicyLibraryAddresses, systemAdmin);

        // when
        profileRoleManagerSubject = await profileRoleManagerFactory.deploy();

        // then
        expect(profileRoleManagerSubject.address).not.null;
        expect(await profileRoleManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileRoleManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileRoleManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileRoleManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileRoleManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileTypeManager subject deploy success", async() => {
        // given
        const profileTypeManagerFactory = new ProfileTypeManager__factory(<ProfileTypeManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileTypeManagerSubject = await profileTypeManagerFactory.deploy();

        // then
        expect(profileTypeManagerSubject.address).not.null;
        expect(await profileTypeManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileTypeManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileTypeManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileTypeManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileTypeManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileFunctionManager subject deploy success", async() => {
        // given
        const profileFunctionManagerFactory = new ProfileFunctionManager__factory(<ProfileFunctionManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileFunctionManagerSubject = await profileFunctionManagerFactory.deploy();

        // then
        expect(profileFunctionManagerSubject.address).not.null;
        expect(await profileFunctionManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileFunctionManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileFunctionManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileFunctionManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileFunctionManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileContextManager subject deploy success", async() => {
        // given
        const profileContextManagerFactory = new ProfileContextManager__factory(<ProfileContextManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileContextManagerSubject = await profileContextManagerFactory.deploy();

        // then
        expect(profileContextManagerSubject.address).not.null;
        expect(await profileContextManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileContextManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileContextManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileContextManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileContextManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileRealmManager subject deploy success", async() => {
        // given
        const profileRealmManagerFactory = new ProfileRealmManager__factory(<ProfileRealmManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileRealmManagerSubject = await profileRealmManagerFactory.deploy();

        // then
        expect(profileRealmManagerSubject.address).not.null;
        expect(await profileRealmManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileRealmManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileRealmManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileRealmManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileRealmManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileDomainManager subject deploy success", async() => {
        // given
        const profileDomainManagerFactory = new ProfileDomainManager__factory(<ProfileDomainManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileDomainManagerSubject = await profileDomainManagerFactory.deploy();

        // then
        expect(profileDomainManagerSubject.address).not.null;
        expect(await profileDomainManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileDomainManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileDomainManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileDomainManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileDomainManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileUniverseManager subject deploy success", async() => {
        // given
        const profileUniverseManagerFactory = new ProfileUniverseManager__factory(<ProfileUniverseManagerLibraryAddresses>linkProfileCommonLibraryAddresses, systemAdmin);

        // when
        profileUniverseManagerSubject = await profileUniverseManagerFactory.deploy();

        // then
        expect(profileUniverseManagerSubject.address).not.null;
        expect(await profileUniverseManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileUniverseManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileUniverseManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileUniverseManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileUniverseManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfilePolicyManager subject deploy success", async() => {
        // given
        const profilePolicyManagerFactory = new ProfilePolicyManager__factory(<ProfilePolicyManagerLibraryAddresses>linkProfileRolePolicyLibraryAddresses, systemAdmin);

        // when
        profilePolicyManagerSubject = await profilePolicyManagerFactory.deploy();

        // then
        expect(profilePolicyManagerSubject.address).not.null;
        expect(await profilePolicyManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profilePolicyManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profilePolicyManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profilePolicyManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profilePolicyManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should profile ProfileAccessControl subject deploy success", async() => {
        // given
        const profileAccessControlFactory = new ProfileAccessControl__factory(systemAdmin);

        // when
        profileAccessControlSubject = await profileAccessControlFactory.deploy();

        // then
        expect(profileAccessControlSubject.address).not.null;
        expect(await profileAccessControlSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await profileAccessControlSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileAccessControlSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileAccessControlSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await profileAccessControlSubject.initVersion()).to.be.equal(0);
      })
    })

    describe("ACLManager Subject Tests", function() {
      it("Should profile ACLManager subject deploy success", async () => {
        // given
        const aclManagerFactory = new ACLManager__factory(<ACLManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);

        // when
        aclManagerSubject = await aclManagerFactory.deploy();

        // then
        expect(aclManagerSubject.address).not.null;
        expect(await aclManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await aclManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await aclManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await aclManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await aclManagerSubject.initVersion()).to.be.equal(0);
      });

    });

    describe("ACL Manager Proxy (UUPS Proxy Implementation) Tests", function() {
      it("Should profile proxy raised events when deployment and initialization were successful", async () => {
        // given
        const proxyFactory = new ACLManagerProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ACLManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          ACL_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
        ]);

        // when
        const aclProxy = await proxyFactory.deploy(aclManagerSubject.address, data);
        const txReceipt = await aclProxy.deployTransaction.wait();

        // then
        aclManagerProxy = aclManagerSubject.attach(aclProxy.address);

        // and
        let logDesc = aclManagerSubject.interface.parseLog(txReceipt.logs[0]);
        const upgradeEvent: ProxyUpgradedEventObject = <ProxyUpgradedEventObject>(<unknown>logDesc.args);
        expect(upgradeEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(upgradeEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(aclProxy.address);
        expect(upgradeEvent.newImplementation, "Illegal New Implementation").to.be.hexEqual(aclManagerSubject.address);

        // and
        logDesc = aclManagerSubject.interface.parseLog(txReceipt.logs[1]);
        const adminChangedEvent: ProxyLocalAdminUpdatedEventObject = <ProxyLocalAdminUpdatedEventObject>(<unknown>logDesc.args);
        expect(adminChangedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(adminChangedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(aclProxy.address);
        expect(adminChangedEvent.newAdmin, "Illegal New Admin Address").to.be.hexEqual(systemAdminWallet.address);

        // and
        logDesc = aclManagerSubject.interface.parseLog(txReceipt.logs[2]);
        const initializedEvent: InitializedEventObject = <InitializedEventObject>(<unknown>logDesc.args);
        expect(initializedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(initializedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(aclProxy.address);
        expect(initializedEvent.subject, "Illegal Subject Address").to.be.hexEqual(aclManagerSubject.address);
        expect(initializedEvent.name, "Illegal Name").to.be.equal(ACL_MANAGER_CONTRACT_NAME);
        expect(initializedEvent.version, "Illegal Version").to.be.equal(CONTRACTS_VERSION);
        expect(initializedEvent.initCount, "Illegal InitializedCount").to.be.equal(1);
      });
    });

    describe("ACL Modules Proxies Tests", function() {
      it("Should profile MemberManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(MemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(memberManagerSubject.address, data);
        const txReceipt = await proxy.deployTransaction.wait();

        // then
        memberManagerProxy = memberManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          memberManagerProxy.address,
          networkChainId
        );

        // and
        let logDesc = memberManagerSubject.interface.parseLog(txReceipt.logs[0]);
        const upgradeEvent: ProxyUpgradedEventObject = <ProxyUpgradedEventObject>(<unknown>logDesc.args);
        expect(upgradeEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(upgradeEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(memberManagerProxy.address);
        expect(upgradeEvent.newImplementation, "Illegal New Implementation").to.be.hexEqual(memberManagerSubject.address);

        // and
        logDesc = memberManagerSubject.interface.parseLog(txReceipt.logs[1]);
        const adminChangedEvent: ProxyLocalAdminUpdatedEventObject = <ProxyLocalAdminUpdatedEventObject>(<unknown>logDesc.args);
        expect(adminChangedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(adminChangedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(memberManagerProxy.address);
        expect(adminChangedEvent.newAdmin, "Illegal New Admin Address").to.be.hexEqual(systemAdminWallet.address);

        // and
        logDesc = memberManagerSubject.interface.parseLog(txReceipt.logs[2]);
        const initializedEvent: InitializedEventObject = <InitializedEventObject>(<unknown>logDesc.args);
        expect(initializedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(initializedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(memberManagerProxy.address);
        expect(initializedEvent.subject, "Illegal Subject Address").to.be.hexEqual(memberManagerSubject.address);
        expect(initializedEvent.name, "Illegal Name").to.be.equal(MEMBER_MANAGER_CONTRACT_NAME);
        expect(initializedEvent.version, "Illegal Version").to.be.equal(CONTRACTS_VERSION);
        expect(initializedEvent.initCount, "Illegal InitializedCount").to.be.equal(1);

        // and
        expect(await memberManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await memberManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await memberManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await memberManagerProxy.contractName()).to.be.equal(MEMBER_MANAGER_CONTRACT_NAME);
        expect(await memberManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await memberManagerProxy.subjectAddress()).to.be.hexEqual(memberManagerSubject.address);
        expect(await memberManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await memberManagerProxy.initVersion()).to.be.equal(1);
        expect(await memberManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await memberManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile RoleManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(RoleManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(roleManagerSubject.address, data);

        // then
        roleManagerProxy = roleManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          roleManagerProxy.address,
          networkChainId
        );

        // and
        expect(await roleManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await roleManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await roleManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await roleManagerProxy.contractName()).to.be.equal(ROLE_MANAGER_CONTRACT_NAME);
        expect(await roleManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await roleManagerProxy.subjectAddress()).to.be.hexEqual(roleManagerSubject.address);
        expect(await roleManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await roleManagerProxy.initVersion()).to.be.equal(1);
        expect(await roleManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await roleManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile TypeManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(TypeManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(typeManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        typeManagerProxy = typeManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          typeManagerProxy.address,
          networkChainId
        );

        // and
        expect(await typeManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await typeManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await typeManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await typeManagerProxy.contractName()).to.be.equal(TYPE_MANAGER_CONTRACT_NAME);
        expect(await typeManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await typeManagerProxy.subjectAddress()).to.be.hexEqual(typeManagerSubject.address);
        expect(await typeManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await typeManagerProxy.initVersion()).to.be.equal(1);
        expect(await typeManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await typeManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile FunctionManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(FunctionManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          FUNCTION_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(functionManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        functionManagerProxy = functionManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          FUNCTION_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          functionManagerProxy.address,
          networkChainId
        );

        // and
        expect(await functionManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await functionManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await functionManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await functionManagerProxy.contractName()).to.be.equal(FUNCTION_MANAGER_CONTRACT_NAME);
        expect(await functionManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await functionManagerProxy.subjectAddress()).to.be.hexEqual(functionManagerSubject.address);
        expect(await functionManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await functionManagerProxy.initVersion()).to.be.equal(1);
        expect(await functionManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await functionManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile ContextManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ContextManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          CONTEXT_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(contextManagerSubject.address, data);
        const txReceipt = await proxy.deployTransaction.wait();

        // then
        contextManagerProxy = contextManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          CONTEXT_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          contextManagerProxy.address,
          networkChainId
        );

        // and
        expect(await contextManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await contextManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await contextManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await contextManagerProxy.contractName()).to.be.equal(CONTEXT_MANAGER_CONTRACT_NAME);
        expect(await contextManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await contextManagerProxy.subjectAddress()).to.be.hexEqual(contextManagerSubject.address);
        expect(await contextManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await contextManagerProxy.initVersion()).to.be.equal(1);
        expect(await contextManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await contextManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile RealmManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(RealmManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          REALM_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(realmManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        realmManagerProxy = realmManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          REALM_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          realmManagerProxy.address,
          networkChainId
        );

        // and
        expect(await realmManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await realmManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await realmManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await realmManagerProxy.contractName()).to.be.equal(REALM_MANAGER_CONTRACT_NAME);
        expect(await realmManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await realmManagerProxy.subjectAddress()).to.be.hexEqual(realmManagerSubject.address);
        expect(await realmManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await realmManagerProxy.initVersion()).to.be.equal(1);
        expect(await realmManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await realmManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile DomainManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(DomainManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          DOMAIN_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(domainManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        domainManagerProxy = domainManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          DOMAIN_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          domainManagerProxy.address,
          networkChainId
        );

        // and
        expect(await domainManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await domainManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await domainManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await domainManagerProxy.contractName()).to.be.equal(DOMAIN_MANAGER_CONTRACT_NAME);
        expect(await domainManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await domainManagerProxy.subjectAddress()).to.be.hexEqual(domainManagerSubject.address);
        expect(await domainManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await domainManagerProxy.initVersion()).to.be.equal(1);
        expect(await domainManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await domainManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile UniverseManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(UniverseManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          UNIVERSE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(universeManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        universeManagerProxy = universeManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          UNIVERSE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          universeManagerProxy.address,
          networkChainId
        );

        // and
        expect(await universeManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await universeManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await universeManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await universeManagerProxy.contractName()).to.be.equal(UNIVERSE_MANAGER_CONTRACT_NAME);
        expect(await universeManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await universeManagerProxy.subjectAddress()).to.be.hexEqual(universeManagerSubject.address)
        expect(await universeManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await universeManagerProxy.initVersion()).to.be.equal(1);
        expect(await universeManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await universeManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile PolicyManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          POLICY_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(policyManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        policyManagerProxy = policyManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          POLICY_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          policyManagerProxy.address,
          networkChainId
        );

        // and
        expect(await policyManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await policyManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await policyManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await policyManagerProxy.contractName()).to.be.equal(POLICY_MANAGER_CONTRACT_NAME);
        expect(await policyManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await policyManagerProxy.subjectAddress()).to.be.hexEqual(policyManagerSubject.address);
        expect(await policyManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await policyManagerProxy.initVersion()).to.be.equal(1);
        expect(await policyManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await policyManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile ProfileManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileManagerProxy = profileManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileManagerProxy.contractName()).to.be.equal(PROFILE_MANAGER_CONTRACT_NAME);
        expect(await profileManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileManagerProxy.subjectAddress()).to.be.hexEqual(profileManagerSubject.address);
        expect(await profileManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileManagerProxy.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should profile AccessControl proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(AccessControl__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          ACCESS_CONTROL_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(accessControlSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        accessControlProxy = accessControlSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          ACCESS_CONTROL_CONTRACT_NAME,
          CONTRACTS_VERSION,
          accessControlProxy.address,
          networkChainId
        );

        // and
        expect(await accessControlProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await accessControlProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await accessControlProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await accessControlProxy.contractName()).to.be.equal(ACCESS_CONTROL_CONTRACT_NAME);
        expect(await accessControlProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await accessControlProxy.subjectAddress()).to.be.hexEqual(accessControlSubject.address);
        expect(await accessControlProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await accessControlProxy.initVersion()).to.be.equal(1);
        expect(await accessControlProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
      });
    })

    describe("ACL Profiles Modules Proxies Tests", function() {
      it("Should profile ProfileMemberManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileMemberManagerSubject.address, data);
        const txReceipt = await proxy.deployTransaction.wait();

        // then
        profileMemberManagerProxy = profileMemberManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileMemberManagerProxy.address,
          networkChainId
        );

        // and
        let logDesc = profileMemberManagerSubject.interface.parseLog(txReceipt.logs[0]);
        const upgradeEvent: ProxyUpgradedEventObject = <ProxyUpgradedEventObject>(<unknown>logDesc.args);
        expect(upgradeEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(upgradeEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(profileMemberManagerProxy.address);
        expect(upgradeEvent.newImplementation, "Illegal New Implementation").to.be.hexEqual(profileMemberManagerSubject.address);

        // and
        logDesc = profileMemberManagerSubject.interface.parseLog(txReceipt.logs[1]);
        const adminChangedEvent: ProxyLocalAdminUpdatedEventObject = <ProxyLocalAdminUpdatedEventObject>(<unknown>logDesc.args);
        expect(adminChangedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(adminChangedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(profileMemberManagerProxy.address);
        expect(adminChangedEvent.newAdmin, "Illegal New Admin Address").to.be.hexEqual(systemAdminWallet.address);

        // and
        logDesc = profileMemberManagerSubject.interface.parseLog(txReceipt.logs[2]);
        const initializedEvent: InitializedEventObject = <InitializedEventObject>(<unknown>logDesc.args);
        expect(initializedEvent.sender, "Illegal Sender Address").to.be.hexEqual(systemAdminWallet.address);
        expect(initializedEvent.proxy, "Illegal Proxy Address").to.be.hexEqual(profileMemberManagerProxy.address);
        expect(initializedEvent.subject, "Illegal Subject Address").to.be.hexEqual(profileMemberManagerSubject.address);
        expect(initializedEvent.name, "Illegal Name").to.be.equal(PROFILE_MEMBER_MANAGER_CONTRACT_NAME);
        expect(initializedEvent.version, "Illegal Version").to.be.equal(CONTRACTS_VERSION);
        expect(initializedEvent.initCount, "Illegal InitializedCount").to.be.equal(1);

        // and
        expect(await profileMemberManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileMemberManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileMemberManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileMemberManagerProxy.contractName()).to.be.equal(PROFILE_MEMBER_MANAGER_CONTRACT_NAME);
        expect(await profileMemberManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileMemberManagerProxy.subjectAddress()).to.be.hexEqual(profileMemberManagerSubject.address);
        expect(await profileMemberManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileMemberManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileMemberManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileMemberManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileRoleManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileRoleManagerSubject.address, data);

        // then
        profileRoleManagerProxy = profileRoleManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileRoleManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileRoleManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileRoleManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileRoleManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileRoleManagerProxy.contractName()).to.be.equal(PROFILE_ROLE_MANAGER_CONTRACT_NAME);
        expect(await profileRoleManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileRoleManagerProxy.subjectAddress()).to.be.hexEqual(profileRoleManagerSubject.address);
        expect(await profileRoleManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileRoleManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileRoleManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileRoleManagerProxy.getLibrary()).to.be.equal(lProfileRolePolicy.address);
      });

      it("Should profile ProfileTypeManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileTypeManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileTypeManagerProxy = profileTypeManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileTypeManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileTypeManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileTypeManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileTypeManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileTypeManagerProxy.contractName()).to.be.equal(PROFILE_TYPE_MANAGER_CONTRACT_NAME);
        expect(await profileTypeManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileTypeManagerProxy.subjectAddress()).to.be.hexEqual(profileTypeManagerSubject.address);
        expect(await profileTypeManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileTypeManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileTypeManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileTypeManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileFunctionManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileFunctionManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileFunctionManagerProxy = profileFunctionManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileFunctionManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileFunctionManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileFunctionManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileFunctionManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileFunctionManagerProxy.contractName()).to.be.equal(PROFILE_FUNCTION_MANAGER_CONTRACT_NAME);
        expect(await profileFunctionManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileFunctionManagerProxy.subjectAddress()).to.be.hexEqual(profileFunctionManagerSubject.address);
        expect(await profileFunctionManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileFunctionManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileFunctionManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileFunctionManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileContextManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileContextManagerSubject.address, data);
        const txReceipt = await proxy.deployTransaction.wait();

        // then
        profileContextManagerProxy = profileContextManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileContextManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileContextManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileContextManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileContextManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileContextManagerProxy.contractName()).to.be.equal(PROFILE_CONTEXT_MANAGER_CONTRACT_NAME);
        expect(await profileContextManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileContextManagerProxy.subjectAddress()).to.be.hexEqual(profileContextManagerSubject.address);
        expect(await profileContextManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileContextManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileContextManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileContextManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileRealmManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_REALM_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileRealmManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileRealmManagerProxy = profileRealmManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_REALM_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileRealmManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileRealmManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileRealmManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileRealmManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileRealmManagerProxy.contractName()).to.be.equal(PROFILE_REALM_MANAGER_CONTRACT_NAME);
        expect(await profileRealmManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileRealmManagerProxy.subjectAddress()).to.be.hexEqual(profileRealmManagerSubject.address);
        expect(await profileRealmManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileRealmManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileRealmManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileRealmManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileDomainManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileDomainManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileDomainManagerProxy = profileDomainManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileDomainManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileDomainManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileDomainManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileDomainManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileDomainManagerProxy.contractName()).to.be.equal(PROFILE_DOMAIN_MANAGER_CONTRACT_NAME);
        expect(await profileDomainManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileDomainManagerProxy.subjectAddress()).to.be.hexEqual(profileDomainManagerSubject.address);
        expect(await profileDomainManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileDomainManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileDomainManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileDomainManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfileUniverseManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileUniverseManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileUniverseManagerProxy = profileUniverseManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileUniverseManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profileUniverseManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileUniverseManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileUniverseManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileUniverseManagerProxy.contractName()).to.be.equal(PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME);
        expect(await profileUniverseManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileUniverseManagerProxy.subjectAddress()).to.be.hexEqual(profileUniverseManagerSubject.address);
        expect(await profileUniverseManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileUniverseManagerProxy.initVersion()).to.be.equal(1);
        expect(await profileUniverseManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profileUniverseManagerProxy.getLibrary()).to.be.equal(lProfileCommons.address);
      });

      it("Should profile ProfilePolicyManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_POLICY_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profilePolicyManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profilePolicyManagerProxy = profilePolicyManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_POLICY_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profilePolicyManagerProxy.address,
          networkChainId
        );

        // and
        expect(await profilePolicyManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profilePolicyManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profilePolicyManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profilePolicyManagerProxy.contractName()).to.be.equal(PROFILE_POLICY_MANAGER_CONTRACT_NAME);
        expect(await profilePolicyManagerProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profilePolicyManagerProxy.subjectAddress()).to.be.hexEqual(profilePolicyManagerSubject.address);
        expect(await profilePolicyManagerProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profilePolicyManagerProxy.initVersion()).to.be.equal(1);
        expect(await profilePolicyManagerProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await profilePolicyManagerProxy.getLibrary()).to.be.equal(lProfileRolePolicy.address);
      });

      it("Should profile ProfileAccessControl proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(profileAccessControlSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        profileAccessControlProxy = profileAccessControlSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
          CONTRACTS_VERSION,
          profileAccessControlProxy.address,
          networkChainId
        );

        // and
        expect(await profileAccessControlProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await profileAccessControlProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await profileAccessControlProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await profileAccessControlProxy.contractName()).to.be.equal(PROFILE_ACCESS_CONTROL_CONTRACT_NAME);
        expect(await profileAccessControlProxy.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await profileAccessControlProxy.subjectAddress()).to.be.hexEqual(profileAccessControlSubject.address);
        expect(await profileAccessControlProxy.accessControlManager()).to.be.hexEqual(aclManagerProxy.address);
        expect(await profileAccessControlProxy.initVersion()).to.be.equal(1);
        expect(await profileAccessControlProxy.domainSeparator()).to.be.hexEqual(domainSeparator);
      });
    })

    describe("Initialize ACL Manager Tests", function() {
      it("Should call aclInit of ACLManager by systemAdmin success", async() => {
        // given
        const firstInit = await aclManagerProxy.getFirstInit();

        // when
        await expect(aclManagerProxy.connect(systemAdmin).initACL(
          contextManagerProxy.address,
          functionManagerProxy.address,
          livelyAdminWallet.address,
          systemAdminWallet.address
        )).to.emit(aclManagerProxy, "ACLInitialized")
          .withArgs(
            systemAdminWallet.address,
            livelyAdminWallet.address,
            systemAdminWallet.address,
            contextManagerProxy.address,
            functionManagerProxy.address,
          )

        // then
        expect(await aclManagerProxy.getFirstInit()).to.be.equal(firstInit);
      })

      it("Should facets acl register to ACLManager by systemAdmin success", async() => {

        // given
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

        await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests))
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, memberManagerProxy.address, memberManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, roleManagerProxy.address, roleManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, typeManagerProxy.address, typeManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyManagerProxy.address, policyManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileManagerProxy.address, profileManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, functionManagerProxy.address, functionManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, contextManagerProxy.address, contextManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, realmManagerProxy.address, realmManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, universeManagerProxy.address, universeManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, accessControlProxy.address, accessControlSubject.address)

        // then
        expect(await aclManagerProxy.aclGetFacets()).to.be.eqls([
          aclManagerProxy.address,
          memberManagerProxy.address,
          roleManagerProxy.address,
          typeManagerProxy.address,
          policyManagerProxy.address,
          profileManagerProxy.address,
          functionManagerProxy.address,
          contextManagerProxy.address,
          realmManagerProxy.address,
          domainManagerProxy.address,
          universeManagerProxy.address,
          accessControlProxy.address
        ])
      })

      it("Should facets acl profile register to ACLManager by systemAdmin success", async() => {

        // given
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
        const facetRequests: IACLManager.FacetRegisterRequestStruct[] = [
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

        await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests))
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileMemberManagerProxy.address, profileMemberManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileRoleManagerProxy.address, profileRoleManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileTypeManagerProxy.address, profileTypeManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyManagerProxy.address, profilePolicyManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionManagerProxy.address, profileFunctionManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileContextManagerProxy.address, profileContextManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileRealmManagerProxy.address, profileRealmManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileDomainManagerProxy.address, profileDomainManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileUniverseManagerProxy.address, profileUniverseManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlProxy.address, profileAccessControlSubject.address)

        // then
        expect(await aclManagerProxy.aclGetFacets()).to.be.eqls([
          aclManagerProxy.address,
          memberManagerProxy.address,
          roleManagerProxy.address,
          typeManagerProxy.address,
          policyManagerProxy.address,
          profileManagerProxy.address,
          functionManagerProxy.address,
          contextManagerProxy.address,
          realmManagerProxy.address,
          domainManagerProxy.address,
          universeManagerProxy.address,
          accessControlProxy.address,
          profileMemberManagerProxy.address,
          profileRoleManagerProxy.address,
          profileTypeManagerProxy.address,
          profilePolicyManagerProxy.address,
          profileFunctionManagerProxy.address,
          profileContextManagerProxy.address,
          profileRealmManagerProxy.address,
          profileDomainManagerProxy.address,
          profileUniverseManagerProxy.address,
          profileAccessControlProxy.address
        ])
      })

      it("Should register ACL contexts by systemAdmin success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
        const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
        const universeContextId = ethers.utils.keccak256(universeManagerProxy.address);
        const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
        const profileContextId = ethers.utils.keccak256(profileManagerProxy.address);
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

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

        // when
        await expect(contextManagerDelegateProxy.connect(systemAdmin).contextRegister(memberSignature, contextRequests))
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberManagerProxy.address,LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, universeManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, accessControlProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, aclManagerContextId, aclManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextCheckId(memberContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(roleContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(typeContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(realmContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(domainContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(universeContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(policyContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(aclManagerContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(accessControlContextId)).to.be.true;

        // and
        const memberContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberContextInfo.contractId).to.be.equal(memberManagerProxy.address);
        expect(memberContextInfo.realmId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(memberContextInfo.functionLimit).to.be.equal(32);
        expect(memberContextInfo.functionCount).to.be.equal(0);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ACL Profile contexts by systemAdmin success", async() => {
        // given
        const profileMemberContextId = ethers.utils.keccak256(profileMemberManagerProxy.address);
        const profileRoleContextId = ethers.utils.keccak256(profileRoleManagerProxy.address);
        const profileTypeContextId = ethers.utils.keccak256(profileTypeManagerProxy.address);
        const profileFunctionContextId = ethers.utils.keccak256(profileFunctionManagerProxy.address);
        const profileContextContextId = ethers.utils.keccak256(profileContextManagerProxy.address);
        const profileRealmContextId = ethers.utils.keccak256(profileRealmManagerProxy.address);
        const profileDomainContextId = ethers.utils.keccak256(profileDomainManagerProxy.address);
        const profileUniverseContextId = ethers.utils.keccak256(profileUniverseManagerProxy.address);
        const profilePolicyContextId = ethers.utils.keccak256(profilePolicyManagerProxy.address);
        const profileAccessControlContextId = ethers.utils.keccak256(profileAccessControlProxy.address);
        const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
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
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateMemberSignatureManually(
          systemAdminWallet.address,
          aclManagerProxy.address,
          systemAdminWallet,
          networkChainId,
          expiredAt
        );
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: systemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // attach proxies to aclManager
        profileFunctionManagerDelegateProxy = profileFunctionManagerProxy.attach(aclManagerProxy.address);
        profileContextManagerDelegateProxy = profileContextManagerProxy.attach(aclManagerProxy.address);
        profileRealmManagerDelegateProxy = profileRealmManagerProxy.attach(aclManagerProxy.address);
        profileDomainManagerDelegateProxy = profileDomainManagerProxy.attach(aclManagerProxy.address);
        profileUniverseManagerDelegateProxy = profileUniverseManagerProxy.attach(aclManagerProxy.address);
        profilePolicyManagerDelegateProxy = profilePolicyManagerProxy.attach(aclManagerProxy.address);
        profileAccessControlDelegateProxy = profileAccessControlProxy.attach(aclManagerProxy.address);
        profileMemberManagerDelegateProxy = profileMemberManagerProxy.attach(aclManagerProxy.address);
        profileRoleManagerDelegateProxy = profileRoleManagerProxy.attach(aclManagerProxy.address);
        profileTypeManagerDelegateProxy = profileTypeManagerProxy.attach(aclManagerProxy.address);

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextRegister(memberSignature, contextRequests))
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberManagerProxy.address,LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileUniverseContextId, profileUniverseManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, profileAccessControlProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            ethers.constants.AddressZero, ethers.constants.AddressZero, LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextCheckId(profileMemberContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileRoleContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileTypeContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileRealmContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileDomainContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileUniverseContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profilePolicyContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(profileAccessControlContextId)).to.be.true;

        // and
        const profileRoleContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(profileRoleContextId);
        expect(profileRoleContextInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(profileRoleContextInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(profileRoleContextInfo.contractId).to.be.equal(profileRoleManagerProxy.address);
        expect(profileRoleContextInfo.realmId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(profileRoleContextInfo.functionLimit).to.be.equal(255);
        expect(profileRoleContextInfo.functionCount).to.be.equal(0);
        expect(profileRoleContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileRoleContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);
        expect(profileRoleContextInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register MemberManger functions by systemAdmin success", async() => {
        // given
        // const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);

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
        const memberUpdateGeneralLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberUpdateGeneralLimit")]))
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, memberFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateGeneralLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(memberContextId, memberRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(memberIface.getSighash("memberRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const roleUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [roleManagerProxy.address,  roleIface.getSighash("roleUpdateScope")]))
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
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateMemberSignatureManually(
          systemAdminWallet.address,
          aclManagerProxy.address,
          systemAdminWallet,
          networkChainId,
          expiredAt
        );
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: systemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionRegister(memberSignature, roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateMemberLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleGrantMembersFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleRevokeMembersFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(roleContextId, roleRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(roleRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(roleContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(roleIface.getSighash("roleRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const typeUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [typeManagerProxy.address,  typeIface.getSighash("typeUpdateScope")]));
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, typeFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_TYPE_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateRoleLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(typeContextId, typeRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(typeRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(typeContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(typeIface.getSighash("typeRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const roleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAgentFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdatePolicyFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(functionContextId, functionUpdateAdminFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(functionUpdateAdminFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(functionContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(functionIface.getSighash("functionUpdateAdmin"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, contextFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateFunctionLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(contextContextId, contextUpdateActivityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(contextUpdateActivityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(contextContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(130);
        expect(functionInfo.selector).to.be.equal(contextIface.getSighash("contextUpdateActivityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const realmMoveContextFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [realmManagerProxy.address,  realmIface.getSighash("realmMoveContext")]))
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, realmFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateContextLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmMoveContextFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(realmContextId, realmRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(realmRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(realmContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(realmIface.getSighash("realmRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const domainMoveRealmFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [domainManagerProxy.address,  domainIface.getSighash("domainMoveRealm")]))
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
        const roleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateRealmLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainMoveRealmFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(domainContextId, domainRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(domainIface.getSighash("domainRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

        // and
        expect(await domainManagerDelegateProxy.domainHasContext(LIVELY_VERSE_ACL_DOMAIN_ID, domainContextId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainHasFunction(LIVELY_VERSE_ACL_DOMAIN_ID, domainRegisterFunctionId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainHasRealm(LIVELY_VERSE_ACL_DOMAIN_ID, LIVELY_VERSE_ACL_REALM_ID)).to.be.true;
        expect(await domainManagerDelegateProxy.domainGetRealms(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.eqls([LIVELY_VERSE_ACL_REALM_ID]);
      })

      it("Should register UniverseManager functions by systemAdmin success", async() => {
        const universeIface = new ethers.utils.Interface(UniverseManager__factory.abi);
        const universeContextId = ethers.utils.keccak256(universeManagerProxy.address);

        const universeUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("universeUpdateActivityStatus")]));
        const universeUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("universeUpdateAlterabilityStatus")]));
        const universeUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("universeUpdateAdmin")]))
        const universeUpdateDomainLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("universeUpdateDomainLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [universeManagerProxy.address,  universeIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, universeFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, universeUpdateActivityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, universeUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, universeUpdateAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, universeUpdateDomainLimitFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, upgradeToFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, setLocalAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, universeContextId, withdrawBalanceFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(universeContextId, universeUpdateAlterabilityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(universeUpdateAlterabilityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(universeContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(30);
        expect(functionInfo.selector).to.be.equal(universeIface.getSighash("universeUpdateAlterabilityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, aclManagerFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, aclRegisterFacetFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, aclUpgradeFacetFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, upgradeToFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setLocalAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, withdrawBalanceFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(aclContextId, aclRegisterFacetFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(aclRegisterFacetFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.contextId).to.be.equal(aclContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(aclManagerIface.getSighash("aclRegisterFacet"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, accessControlFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(accessControlContextId, upgradeToFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(upgradeToFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.contextId).to.be.equal(accessControlContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(accessControlIface.getSighash("upgradeTo"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
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
        const policyUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [policyManagerProxy.address,  policyIface.getSighash("policyUpdateScope")]))
        const policyUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [policyManagerProxy.address,  policyIface.getSighash("policyUpdateActivityStatus")]))
        const policyUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [policyManagerProxy.address,  policyIface.getSighash("policyUpdateAlterabilityStatus")]))
        const policyUpdateRoleLimitFunctionId = ethers.utils.keccak256(
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, policyFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_POLICY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyAddRolesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyRemoveRolesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateCodesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateRoleLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(policyContextId, policyRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(policyRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(policyContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(policyIface.getSighash("policyRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileManager functions by systemAdmin success", async() => {
        const profileIface = new ethers.utils.Interface(ProfileManager__factory.abi);
        const profileContextId = ethers.utils.keccak256(profileManagerProxy.address);

        const profileRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileRegister")]));
        const profileUpdateLimitsFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileUpdateLimits")]));
        const profileUpdateOwnerAccountFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileUpdateOwnerAccount")]))
        const profileUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileUpdateActivityStatus")]))
        const profileUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileUpdateAlterabilityStatus")]))
        const profileUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("profileUpdateAdmin")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileManagerProxy.address,  profileIface.getSighash("withdrawBalance")]))

        const profileFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
        const profileFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
          {
            signature: new Int8Array(0),
            realmId: ethers.constants.HashZero,
            salt: ethers.constants.HashZero,
            name: "",
            version: "",
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            contractId: profileManagerProxy.address,
            functions: profileFunctionRequests
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_PROFILE_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileUpdateLimitsFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileUpdateOwnerAccountFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, profileUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileContextId, profileRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileIface.getSighash("profileRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })


      it("Should register ProfileMemberManger functions by systemAdmin success", async() => {
        // given
        const profileMemberIface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
        const profileMemberContextId = ethers.utils.keccak256(profileMemberManagerProxy.address);

        const profileMemberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberRegister")]));
        const profileMemberUpdateTypeLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateTypeLimit")]));
        const profileMemberUpdateRegisterLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateRegisterLimit")]))
        const profileMemberUpdateCallLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateCallLimit")]))
        const profileMemberUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateActivityStatus")]))
        const profileMemberUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus")]))
        const profileMemberUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("profileMemberUpdateAdmin")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerProxy.address,  profileMemberIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileMemberFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateTypeLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateRegisterLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateCallLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, profileMemberUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileMemberContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileMemberContextId, profileMemberRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileMemberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileMemberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileMemberIface.getSighash("profileMemberRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileRoleManager functions by systemAdmin success", async() => {
        const profileRoleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const profileRoleContextId = ethers.utils.keccak256(profileRoleManagerProxy.address);

        const profileRoleRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleRegister")]));
        const profileRoleGrantMembersFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleGrantMembers")]));
        const profileRoleRevokeMembersFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleRevokeMembers")]))
        const profileRoleUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleUpdateAdmin")]))
        const profileRoleUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleUpdateScope")]))
        const profileRoleUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleUpdateActivityStatus")]))
        const profileRoleUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleUpdateAlterabilityStatus")]))
        const profileRoleUpdateMemberLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("profileRoleUpdateMemberLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerProxy.address,  profileRoleIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileRoleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleGrantMembersFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleRevokeMembersFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleUpdateScopeFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, profileRoleUpdateMemberLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRoleContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileRoleContextId, profileRoleRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileRoleRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileRoleContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileRoleIface.getSighash("profileRoleRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileTypeManager functions by systemAdmin success", async() => {
        const profileTypeIface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
        const profileTypeContextId = ethers.utils.keccak256(profileTypeManagerProxy.address);

        const profileTypeRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeRegister")]));
        const profileTypeUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeUpdateAdmin")]));
        const profileTypeUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeUpdateScope")]));
        const profileTypeUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeUpdateActivityStatus")]))
        const profileTypeUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeUpdateAlterabilityStatus")]))
        const profileTypeUpdateRoleLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("profileTypeUpdateRoleLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileTypeManagerProxy.address,  profileTypeIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileTypeFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeUpdateScopeFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, profileTypeUpdateRoleLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileTypeContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileTypeContextId, profileTypeRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileTypeRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileTypeContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileTypeIface.getSighash("profileTypeRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileFunctionManager functions by systemAdmin success", async() => {
        const profileFunctionIface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
        const profileFunctionContextId = ethers.utils.keccak256(profileFunctionManagerProxy.address);

        const profileFunctionRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionRegister")]));
        const profileFunctionUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionUpdateAdmin")]));
        const profileFunctionUpdateAgentFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionUpdateAgent")]));
        const profileFunctionUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionUpdateActivityStatus")]))
        const profileFunctionUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionUpdateAlterabilityStatus")]))
        const profileFunctionUpdatePolicyCodeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("profileFunctionUpdatePolicyCode")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileFunctionManagerProxy.address,  profileFunctionIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionUpdateAgentFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, profileFunctionUpdatePolicyCodeFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileFunctionContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileFunctionContextId, profileFunctionUpdateAdminFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileFunctionUpdateAdminFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileFunctionContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(profileFunctionIface.getSighash("profileFunctionUpdateAdmin"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileContextManager functions by systemAdmin success", async() => {
        const profileContextIface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
        const profileContextContextId = ethers.utils.keccak256(profileContextManagerProxy.address);

        const profileContextRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("profileContextRegister")]));
        const profileContextUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("profileContextUpdateActivityStatus")]));
        const profileContextUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("profileContextUpdateAlterabilityStatus")]));
        const profileContextUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("profileContextUpdateAdmin")]))
        const profileContextUpdateFunctionLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("profileContextUpdateFunctionLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileContextManagerProxy.address,  profileContextIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileContextFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, profileContextUpdateFunctionLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileContextContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileContextContextId, profileContextUpdateActivityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileContextUpdateActivityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileContextContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(130);
        expect(functionInfo.selector).to.be.equal(profileContextIface.getSighash("profileContextUpdateActivityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileRealmManager functions by systemAdmin success", async() => {
        const profileRealmIface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
        const profileRealmContextId = ethers.utils.keccak256(profileRealmManagerProxy.address);

        const profileRealmRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmRegister")]));
        const profileRealmUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmUpdateAdmin")]));
        const profileRealmUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmUpdateActivityStatus")]))
        const profileRealmUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmUpdateAlterabilityStatus")]))
        const profileRealmUpdateContextLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmUpdateContextLimit")]))
        const profileRealmMoveContextFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("profileRealmMoveContext")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRealmManagerProxy.address,  profileRealmIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileRealmFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmUpdateContextLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, profileRealmMoveContextFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileRealmContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileRealmContextId, profileRealmRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileRealmRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileRealmContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileRealmIface.getSighash("profileRealmRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileDomainManager functions by systemAdmin success", async() => {
        const profileDomainIface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
        const profileDomainContextId = ethers.utils.keccak256(profileDomainManagerProxy.address);

        const profileDomainRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainRegister")]));
        const profileDomainUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainUpdateActivityStatus")]));
        const profileDomainUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainUpdateAlterabilityStatus")]))
        const profileDomainUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainUpdateAdmin")]))
        const profileDomainUpdateRealmLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainUpdateRealmLimit")]))
        const profileDomainMoveRealmFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("profileDomainMoveRealm")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileDomainManagerProxy.address,  profileDomainIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileDomainFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainUpdateRealmLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, profileDomainMoveRealmFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileDomainContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileDomainContextId, profileDomainRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileDomainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileDomainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileDomainIface.getSighash("profileDomainRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

        // and
        expect(await domainManagerDelegateProxy.domainHasContext(LIVELY_VERSE_ACL_DOMAIN_ID, profileDomainContextId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainHasFunction(LIVELY_VERSE_ACL_DOMAIN_ID, profileDomainRegisterFunctionId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainHasRealm(LIVELY_VERSE_ACL_DOMAIN_ID, LIVELY_VERSE_ACL_REALM_ID)).to.be.true;
        expect(await domainManagerDelegateProxy.domainGetRealms(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.eqls([LIVELY_VERSE_ACL_REALM_ID]);
      })

      it("Should register ProfileUniverseManager functions by systemAdmin success", async() => {
        const profileUniverseIface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
        const profileUniverseContextId = ethers.utils.keccak256(profileUniverseManagerProxy.address);

        const profileUniverseUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("profileUniverseUpdateActivityStatus")]));
        const profileUniverseUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus")]));
        const profileUniverseUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("profileUniverseUpdateAdmin")]))
        const profileUniverseUpdateDomainLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("profileUniverseUpdateDomainLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileUniverseManagerProxy.address,  profileUniverseIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        let tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileUniverseFunctionRegisterRequest);
        await tx.wait();
        // // console.log(`tx: ${JSON.stringify(tx, null, 2)}`);
        // // console.log(`receipt: ${JSON.stringify(receipt, null, 2)}`);

        // when
        // await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(profileUniverseFunctionRegisterRequest))
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, profileUniverseUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
        //     LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, profileUniverseUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
        //     LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, profileUniverseUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
        //     LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, profileUniverseUpdateDomainLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
        //     LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, upgradeToFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, setLocalAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
        //   .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
        //   .withArgs(systemAdminWallet.address, profileUniverseContextId, withdrawBalanceFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
        //     LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileUniverseContextId, profileUniverseUpdateAlterabilityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profileUniverseUpdateAlterabilityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileUniverseContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(30);
        expect(functionInfo.selector).to.be.equal(profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfileAccessControl functions by systemAdmin success", async() => {
        const profileAccessControlIface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
        const profileAccessControlContextId = ethers.utils.keccak256(profileAccessControlProxy.address);

        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileAccessControlProxy.address,  profileAccessControlIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profileAccessControlFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profileAccessControlContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profileAccessControlContextId, upgradeToFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(upgradeToFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.contextId).to.be.equal(profileAccessControlContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(profileAccessControlIface.getSighash("upgradeTo"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ProfilePolicyManager functions by systemAdmin success", async() => {
        const profilePolicyIface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
        const profilePolicyContextId = ethers.utils.keccak256(profilePolicyManagerProxy.address);

        const profilePolicyRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyRegister")]));
        const profilePolicyAddRolesFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyAddRoles")]));
        const profilePolicyRemoveRolesFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyRemoveRoles")]))
        const profilePolicyUpdateCodesFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateCodes")]))
        const profilePolicyUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateAdmin")]))
        const profilePolicyUpdateScopeFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateScope")]))
        const profilePolicyUpdateActivityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateActivityStatus")]))
        const profilePolicyUpdateAlterabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateAlterabilityStatus")]))
        const profilePolicyUpdateRoleLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("profilePolicyUpdateRoleLimit")]))
        const upgradeToFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("upgradeTo")]))
        const setSafeModeStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("setSafeModeStatus")]))
        const setUpdatabilityStatusFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("setUpdatabilityStatus")]))
        const setLocalAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("setLocalAdmin")]))
        const setAccessControlManagerFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("setAccessControlManager")]))
        const withdrawBalanceFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profilePolicyManagerProxy.address,  profilePolicyIface.getSighash("withdrawBalance")]))

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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, profilePolicyFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyRegisterFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyAddRolesFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyRemoveRolesFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateCodesFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateAdminFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateScopeFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateActivityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, profilePolicyUpdateRoleLimitFunctionId, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, profilePolicyContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(profilePolicyContextId, profilePolicyRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(profilePolicyRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profilePolicyContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profilePolicyIface.getSighash("profilePolicyRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })
    })

    describe("Profile ACL Tests", function() {
      it("Should profile register PROFILE_TEST_NAME profile with someone failed", async() => {
        // given
        profileTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROFILE_TEST_NAME));
        const requests: IProfileManagement.ProfileRegisterRequestStruct[] = [{
          name: PROFILE_TEST_NAME,
          registerLimits: {
            memberRegisterLimit: 1,
            roleRegisterLimit: 1,
            typeRegisterLimit: 1,
            functionRegisterLimit: 1,
            contextRegisterLimit: 1,
            realmRegisterLimit: 1,
            domainRegisterLimit: 1,
            policyRegisterLimit: 1,
          },
          limits: {
            profileCallLimit: 1,
            contextLimit: 1,
            memberLimit: 1,
            realmLimit: 1,
            domainLimit: 1,
            memberCallLimit: 1,
            typeRoleLimit: 1,
            typeLimit: 1,
            policyRoleLimit: 1,
            functionLimit: 1,
          },
          profileOwner: profileOwnerWallet.address,
          profileSystemAdmin: profileSystemAdminWallet.address,
          adminId: ethers.constants.HashZero,
        }]


        // when
        await expect(profileManagerDelegateProxy.connect(user1).profileRegister(emptyMemberSignature, requests))
          .to.revertedWith("ACLMemberNotFound()");

      })

      it("Should profile register PROFILE_TEST_NAME profile success", async() => {
        // given
        profileTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROFILE_TEST_NAME));
        profileExpiredAt = BigNumber.from(Date.now() + 10000);
        profileOwnerId = ethers.utils.keccak256(profileOwnerWallet.address);
        profileAdminId = ethers.utils.keccak256(profileAdminWallet.address);
        profileSystemAdminId = ethers.utils.keccak256(profileSystemAdminWallet.address);
        const requests: IProfileManagement.ProfileRegisterRequestStruct[] = [{
          name: PROFILE_TEST_NAME,
          registerLimits: {
            memberRegisterLimit: 10,
            roleRegisterLimit: 10,
            typeRegisterLimit: 10,
            functionRegisterLimit: 10,
            contextRegisterLimit: 10,
            realmRegisterLimit: 10,
            domainRegisterLimit: 10,
            policyRegisterLimit: 10,
          },
          limits: {
            profileCallLimit: 256,
            contextLimit: 10,
            memberLimit: 10,
            realmLimit: 10,
            domainLimit: 10,
            memberCallLimit: 10,
            typeRoleLimit: 10,
            typeLimit: 10,
            policyRoleLimit: 10,
            functionLimit: 10,
          },
          profileOwner: profileOwnerWallet.address,
          profileSystemAdmin: profileSystemAdminWallet.address,
          adminId: ethers.constants.HashZero,
        }]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateMemberSignatureManually(
          livelyAdminWallet.address,
          aclManagerProxy.address,
          livelyAdminWallet,
          networkChainId,
          expiredAt
        );
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: livelyAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileManagerDelegateProxy.connect(user1).profileRegister(memberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileRegistered")
          .withArgs(livelyAdminWallet.address, profileTestId, profileOwnerWallet.address,
            profileSystemAdminWallet.address, LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
            [10,10,10,10,10,10,10,10], [256, 10, 10, 10, 10, 10, 10, 10, 10, 10]);

        // then
        expect(await profileManagerDelegateProxy.profileCheckId(profileTestId)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckName(PROFILE_TEST_NAME)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckAdmin(profileTestId, livelyAdminWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId, profileOwnerWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileOwnerWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileAdminWallet.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckProfileSystemAdmin(profileTestId, profileSystemAdminWallet.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet.address)).to.be.eql([profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet.address)).to.be.eql([]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileSystemAdminWallet.address)).to.be.eql([profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetAdmins(profileTestId)).to.be.eql([profileOwnerId]);

        // and
        const profileInfo: IProfileManagement.ProfileInfoStruct = await profileManagerDelegateProxy.profileGetInfo(profileTestId);
        expect(profileInfo.name).to.be.equal(PROFILE_TEST_NAME);
        expect(profileInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(profileInfo.owner).to.be.equal(profileOwnerWallet.address);
        expect(profileInfo.registerLimits).to.be.eql([10,10,10,10,10,10,10,10]);
        expect(profileInfo.limits).to.be.eql([256,10,10,10,10,10,10,10,10,10]);
        expect(profileInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(profileInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile invariants check success", async() => {
        // when and then profile admin
        const profileAdminRole = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileAdminRole.name).to.be.equal("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN");
        expect(profileAdminRole.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(profileAdminRole.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileAdminRole.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileAdminRole.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(profileAdminRole.adminType).to.be.equal(AgentType.ROLE);
        expect(profileAdminRole.atype).to.be.equal(AgentType.ROLE);
        expect(profileAdminRole.memberLimit).to.be.equal(10);
        expect(profileAdminRole.memberCount).to.be.equal(1);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileOwnerWallet.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileAdminWallet.address)).to.be.false;

        // and profile SystemAdmin
        const profileSystemAdminRole = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(profileSystemAdminRole.name).to.be.equal("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN");
        expect(profileSystemAdminRole.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(profileSystemAdminRole.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileSystemAdminRole.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileSystemAdminRole.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(profileSystemAdminRole.adminType).to.be.equal(AgentType.ROLE);
        expect(profileSystemAdminRole.atype).to.be.equal(AgentType.ROLE);
        expect(profileSystemAdminRole.memberLimit).to.be.equal(10);
        expect(profileSystemAdminRole.memberCount).to.be.equal(1);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID, profileSystemAdminWallet.address)).to.be.true;
      })

      it("Should profile register PROFILE_TEST_NAME_2 profile success", async() => {
        // given
        profileTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROFILE_TEST_NAME_2));
        const profileExpiredAt2 = BigNumber.from(Date.now() + 20000);
        profileOwnerId2 = ethers.utils.keccak256(profileOwnerWallet2.address);
        profileAdminId2 = ethers.utils.keccak256(profileAdminWallet2.address);
        profileSystemAdminId2 = ethers.utils.keccak256(profileSystemAdminWallet2.address);

        const requests: IProfileManagement.ProfileRegisterRequestStruct[] = [{
          name: PROFILE_TEST_NAME_2,
          registerLimits: {
            memberRegisterLimit: 2,
            roleRegisterLimit: 2,
            typeRegisterLimit: 2,
            functionRegisterLimit: 2,
            contextRegisterLimit: 2,
            realmRegisterLimit: 2,
            domainRegisterLimit: 2,
            policyRegisterLimit: 2,
          },
          limits: {
            profileCallLimit: 32,
            contextLimit: 3,
            memberLimit: 3,
            realmLimit: 3,
            domainLimit: 3,
            memberCallLimit: 32,
            typeRoleLimit: 3,
            typeLimit: 3,
            policyRoleLimit: 3,
            functionLimit: 3,
          },
          profileOwner: profileOwnerWallet2.address,
          profileSystemAdmin: profileSystemAdminWallet2.address,
          adminId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileRegister(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileRegistered")
          .withArgs(livelyAdminWallet.address, profileTestId2, profileOwnerWallet2.address,
             profileSystemAdminWallet2.address, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
            [2,2,2,2,2,2,2,2], [32, 3, 3, 3, 3, 32, 3, 3, 3, 3]);

        // then
        expect(await profileManagerDelegateProxy.profileCheckId(profileTestId2)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckName(PROFILE_TEST_NAME_2)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckAdmin(profileTestId, livelyAdminWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId2, profileOwnerWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileOwnerWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileAdminWallet2.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckProfileSystemAdmin(profileTestId2, profileSystemAdminWallet2.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet2.address)).to.be.eql([profileTestId2]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet2.address)).to.be.eql([]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileSystemAdminWallet2.address)).to.be.eql([profileTestId2]);
        expect(await profileManagerDelegateProxy.profileGetAdmins(profileTestId2)).to.be.eql([profileOwnerId2]);

        // and
        const profileInfo: IProfileManagement.ProfileInfoStruct = await profileManagerDelegateProxy.profileGetInfo(profileTestId2);
        expect(profileInfo.name).to.be.equal(PROFILE_TEST_NAME_2);
        expect(profileInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(profileInfo.owner).to.be.equal(profileOwnerWallet2.address);
        expect(profileInfo.registerLimits).to.be.eql([2,2,2,2,2,2,2,2]);
        expect(profileInfo.limits).to.be.eql([32,3,3,3,3,32,3,3,3,3]);
        expect(profileInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(profileInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile disable PROFILE_TEST_NAME profile alterability by someone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: profileTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(user1).profileUpdateAlterabilityStatus(emptyMemberSignature, requests))
          .to.revertedWith("ACLMemberNotFound()");
      })

      it("Should profile disable PROFILE_TEST_NAME profile alterability success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: profileTestId,
          alstat: AlterabilityStatus.DISABLED
        }]


        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateAlterabilityStatus(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update limits of PROFILE_TEST_NAME profile when alterability disabled failed", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateLimitsRequestStruct[] = [{
          profileId: profileTestId,
          registerLimits: {
            memberRegisterLimit: 10,
            roleRegisterLimit: 10,
            typeRegisterLimit: 10,
            functionRegisterLimit: 10,
            contextRegisterLimit: 10,
            realmRegisterLimit: 10,
            domainRegisterLimit: 10,
            policyRegisterLimit: 10,
          },
          limits: {
            profileCallLimit: 20,
            contextLimit: 20,
            memberLimit: 20,
            realmLimit: 20,
            domainLimit: 20,
            memberCallLimit: 20,
            typeRoleLimit: 20,
            typeLimit: 20,
            policyRoleLimit: 20,
            functionLimit: 20,
          },
        }]

        // then
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateLimits(emptyMemberSignature, requests))
          .to.revertedWith("Illegal Updatable")
      })

      it("Should profile update OwnerAccount of PROFILE_TEST_NAME profile when alterability disabled failed", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateOwnerAccountRequestStruct[] = [{
          profileId: profileTestId,
          newOwner: profileOwnerWallet2.address
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateOwnerAccount(emptyMemberSignature, requests))
          .to.revertedWith("Illegal Updatable")
      })

      it("Should profile update ActivityStatus of PROFILE_TEST_NAME profile when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: profileTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateActivityStatus(emptyMemberSignature, requests))
          .to.revertedWith("Illegal Updatable")
      })

      it("Should profile update Admin of PROFILE_TEST_NAME profile when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: profileTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateAdmin(emptyMemberSignature, requests))
          .to.revertedWith("Illegal Updatable")
      })

      it("Should profile enable PROFILE_TEST_NAME profile alterability success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: profileTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateAlterabilityStatus(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable PROFILE_TEST_NAME profile activity by someone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: profileTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(user2).profileUpdateActivityStatus(emptyMemberSignature, requests))
          .to.revertedWith("ACLMemberNotFound()");

      })

      it("Should profile disable PROFILE_TEST_NAME profile activity success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: profileTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateMemberSignatureManually(
          livelyAdminWallet.address,
          aclManagerProxy.address,
          livelyAdminWallet,
          networkChainId,
          expiredAt
        );
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: livelyAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateActivityStatus(memberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileActivityUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId, ActivityStatus.DISABLED)

        // and
        const profileInfo: IProfileManagement.ProfileInfoStruct = await profileManagerDelegateProxy.profileGetInfo(profileTestId);
        expect(profileInfo.name).to.be.equal(PROFILE_TEST_NAME);
        expect(profileInfo.adminId).to.be.equal(LIVELY_VERSE_PROFILE_MASTER_TYPE_ID);
        expect(profileInfo.owner).to.be.equal(profileOwnerWallet.address);
        expect(profileInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(profileInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(profileInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile enable PROFILE_TEST_NAME profile activity success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: profileTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateActivityStatus(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileActivityUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId, ActivityStatus.ENABLED)
      })

      it("Should profile update limits of PROFILE_TEST_NAME profile by someone failed", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateLimitsRequestStruct[] = [{
          profileId: profileTestId,
          registerLimits: {
            memberRegisterLimit: 10,
            roleRegisterLimit: 10,
            typeRegisterLimit: 10,
            functionRegisterLimit: 10,
            contextRegisterLimit: 10,
            realmRegisterLimit: 10,
            domainRegisterLimit: 10,
            policyRegisterLimit: 10,
          },
          limits: {
            profileCallLimit: 20,
            contextLimit: 20,
            memberLimit: 20,
            realmLimit: 20,
            domainLimit: 20,
            memberCallLimit: 20,
            typeRoleLimit: 20,
            typeLimit: 20,
            policyRoleLimit: 20,
            functionLimit: 20,
          },
        }]

        // then
        await expect(profileManagerDelegateProxy.connect(systemAdmin).profileUpdateLimits(emptyMemberSignature, requests))
          .to.revertedWith("AdminAccessRoleNotFound()");
      })

      it("Should profile update limits of PROFILE_TEST_NAME profile success", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateLimitsRequestStruct[] = [{
          profileId: profileTestId,
          registerLimits: {
            memberRegisterLimit: 13,
            roleRegisterLimit: 13,
            typeRegisterLimit: 13,
            functionRegisterLimit: 13,
            contextRegisterLimit: 13,
            realmRegisterLimit: 13,
            domainRegisterLimit: 13,
            policyRegisterLimit: 13,
          },
          limits: {
            profileCallLimit: 512,
            contextLimit: 20,
            memberLimit: 20,
            realmLimit: 20,
            domainLimit: 20,
            memberCallLimit: 20,
            typeRoleLimit: 20,
            typeLimit: 20,
            policyRoleLimit: 20,
            functionLimit: 20,
          },
        }]

        // then
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateLimits(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileLimitsUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId,
            [512, 20, 20, 20, 20, 20, 20, 20, 20, 20], [13, 13, 13, 13, 13, 13, 13, 13])
      })

      it("Should profile update admin of PROFILE_TEST_NAME profile by someone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: profileTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(user2).profileUpdateAdmin(emptyMemberSignature, requests))
          .to.revertedWith("ACLMemberNotFound()");
      })

      it("Should profile update admin of PROFILE_TEST_NAME profile success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: profileTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateAdmin(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileAdminUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID)
      })

      it("Should profile update profile OwnerAccount of profileTestId by someone failed", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateOwnerAccountRequestStruct[] = [{
          profileId: profileTestId,
          newOwner: profileOwnerWallet2.address
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(user1).profileUpdateOwnerAccount(emptyMemberSignature, requests))
          .to.revertedWith("ACLMemberNotFound()");
      })

      it("Should register profileAdmin2 to PROFILE_TEST_NAME_2 success", async() => {
        // given
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            account: profileAdminWallet2.address,
            typeLimit: 2,
            callLimit: 30,
            registerLimit: {
              memberRegisterLimit: 2,
              roleRegisterLimit: 2,
              typeRegisterLimit: 2,
              functionRegisterLimit: 2,
              contextRegisterLimit: 2,
              realmRegisterLimit: 2,
              domainRegisterLimit: 2,
              policyRegisterLimit: 2,
            }
          }
        ]
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME_2,
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileOwner2).profileMemberRegister(profileMemberSignature, memberRegisterRequests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(profileOwnerWallet2.address, profileTestId2, profileAdminId2,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, [2, 2, 2, 2, 2, 2, 2, 2])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId2, profileAdminId2)).to.be.true;
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAccount(profileTestId2, profileAdminWallet2.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileAdminWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet2.address)).to.be.eql([profileTestId2]);

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId2, profileAdminId2);
        expect(memberInfo.account).to.be.equal(profileAdminWallet2.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.callLimit).to.be.equal(30);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(2);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should register profileAdmin to PROFILE_TEST_NAME success", async() => {
        // given
        const profileAdminId =  ethers.utils.keccak256(profileAdminWallet.address);
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            account: profileAdminWallet.address,
            typeLimit: 10,
            callLimit: 250,
            registerLimit: {
              memberRegisterLimit: 10,
              roleRegisterLimit: 10,
              typeRegisterLimit: 10,
              functionRegisterLimit: 10,
              contextRegisterLimit: 10,
              realmRegisterLimit: 10,
              domainRegisterLimit: 10,
              policyRegisterLimit: 10
            }
          }
        ]


        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileOwnerWallet.address,
          aclManagerProxy.address,
          profileOwnerWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileOwnerWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileMemberManagerDelegateProxy.connect(livelyAdmin).profileMemberRegister(profileMemberSignature, memberRegisterRequests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(profileOwnerWallet.address, profileTestId, profileAdminId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            [10, 10, 10, 10, 10, 10, 10, 10])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, profileAdminId)).to.be.true;
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAccount(profileTestId, profileAdminWallet.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileAdminWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet.address)).to.be.eql([profileTestId]);

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, profileAdminId);
        expect(memberInfo.account).to.be.equal(profileAdminWallet.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(10);
        expect(memberInfo.callLimit).to.be.equal(250);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(10);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile update profile OwnerAccount of profileTestId success", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateOwnerAccountRequestStruct[] = [{
          profileId: profileTestId,
          newOwner: profileOwnerWallet2.address
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(systemAdmin).profileUpdateOwnerAccount(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileOwnerAccountUpdated")
          .withArgs(systemAdminWallet.address, profileTestId, profileOwnerWallet.address, profileOwnerWallet2.address)

        // then
        expect(await profileManagerDelegateProxy.profileCheckId(profileTestId)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckName(PROFILE_TEST_NAME)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId, profileOwnerWallet.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId, profileOwnerWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileOwnerWallet.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileOwnerWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId, profileAdminWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileSystemAdmin(profileTestId, profileSystemAdminWallet.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet.address)).to.be.empty;
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet2.address)).to.be.eql([profileTestId2, profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet.address)).to.be.eql([profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileSystemAdminWallet.address)).to.be.eql([profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetAdmins(profileTestId)).to.be.eql([profileAdminId, profileOwnerId2]);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileOwnerWallet.address)).to.be.false;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileOwnerWallet2.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileAdminWallet.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID, profileSystemAdminWallet.address)).to.be.true;

        // and
        const profileInfo: IProfileManagement.ProfileInfoStruct = await profileManagerDelegateProxy.profileGetInfo(profileTestId);
        expect(profileInfo.name).to.be.equal(PROFILE_TEST_NAME);
        expect(profileInfo.adminId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(profileInfo.owner).to.be.equal(profileOwnerWallet2.address);
        expect(profileInfo.registerLimits).to.be.eql([12, 13, 13, 13, 13, 13, 13, 13]);
        expect(profileInfo.limits).to.be.eql([511, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
        expect(profileInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(profileInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile update profile OwnerAccount of profileTestId2 success", async() => {
        // given
        const requests: IProfileManagement.ProfileUpdateOwnerAccountRequestStruct[] = [{
          profileId: profileTestId2,
          newOwner: profileOwnerWallet.address
        }]

        // when
        await expect(profileManagerDelegateProxy.connect(livelyAdmin).profileUpdateOwnerAccount(emptyMemberSignature, requests))
          .to.emit(profileManagerDelegateProxy, "ProfileOwnerAccountUpdated")
          .withArgs(livelyAdminWallet.address, profileTestId2, profileOwnerWallet2.address, profileOwnerWallet.address)

        // then
        expect(await profileManagerDelegateProxy.profileCheckId(profileTestId2)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckName(PROFILE_TEST_NAME_2)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId2, profileOwnerWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckOwner(profileTestId2, profileOwnerWallet2.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileOwnerWallet.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileOwnerWallet2.address)).to.be.false;
        expect(await profileManagerDelegateProxy.profileCheckProfileAdmin(profileTestId2, profileAdminWallet2.address)).to.be.true;
        expect(await profileManagerDelegateProxy.profileCheckProfileSystemAdmin(profileTestId2, profileSystemAdminWallet2.address)).to.be.true;

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet.address)).to.be.eql([profileTestId2]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileOwnerWallet2.address)).to.be.eql([profileTestId]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileAdminWallet2.address)).to.be.eql([profileTestId2]);
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(profileSystemAdminWallet2.address)).to.be.eql([profileTestId2]);
        expect(await profileManagerDelegateProxy.profileGetAdmins(profileTestId2)).to.be.eql([profileAdminId2, profileOwnerId]);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId2, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileOwnerWallet.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId2, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileOwnerWallet2.address)).to.be.false;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId2, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileAdminWallet2.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId2, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID, profileSystemAdminWallet2.address)).to.be.true;

        // and
        const profileInfo: IProfileManagement.ProfileInfoStruct = await profileManagerDelegateProxy.profileGetInfo(profileTestId2);
        expect(profileInfo.name).to.be.equal(PROFILE_TEST_NAME_2);
        // expect(profileInfo.expiredAt).to.be.equal(profileExpiredAt2);
        expect(profileInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(profileInfo.owner).to.be.equal(profileOwnerWallet.address);
        expect(profileInfo.registerLimits).to.be.eql([1,2,2,2,2,2,2,2]);
        expect(profileInfo.limits).to.be.eql([31,3,3,3,3,32,3,3,3,3]);
        expect(profileInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(profileInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })
    })

    describe("Profile Post Init Tests", function() {
      it("Should profile register profileDomainTest to Universe success", async() => {
        // given
        profileDomainTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROFILE_DOMAIN_TEST_NAME));
        const requests: IProfileDomainManagement.ProfileDomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 2,
            name: PROFILE_DOMAIN_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileOwnerWallet2.address,
          aclManagerProxy.address,
          profileOwnerWallet2,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileOwnerWallet2.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin2).profileDomainRegister(profileMemberSignature, requests)).
        to.emit(profileDomainManagerDelegateProxy, "ProfileDomainRegistered")
          .withArgs(profileOwnerWallet2.address, profileTestId, profileDomainTestId ,LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckId(profileTestId, profileDomainTestId)).to.be.true

        // and
        const domainInfo: IProfileDomainManagement.ProfileDomainInfoStruct = await profileDomainManagerDelegateProxy.profileDomainGetInfo(profileTestId, profileDomainTestId);
        expect(domainInfo.name).to.be.equal(PROFILE_DOMAIN_TEST_NAME);
        expect(domainInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.universeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(domainInfo.realmLimit).to.be.equal(2);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckId(profileTestId, profileDomainTestId)).to.be.true;
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckName(profileTestId, PROFILE_DOMAIN_TEST_NAME)).to.be.true;
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckAdmin(profileTestId, profileDomainTestId, profileOwnerWallet2.address)).to.be.true;
        expect(await profileUniverseManagerDelegateProxy.profileUniverseGetDomains(profileTestId)).to.be.eqls([profileDomainTestId]);
      })

      it("Should profile register profileRealmTest to profileDomainTest success", async() => {
        // given
        profileRealmTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROFILE_REALM_TEST_NAME));
        const requests: IProfileRealmManagement.ProfileRealmRegisterRequestStruct[] = [
          {
            domainId: profileDomainTestId,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            contextLimit: 3,
            name: PROFILE_REALM_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin2).profileRealmRegister(profileMemberSignature, requests)).
        to.emit(profileRealmManagerDelegateProxy, "ProfileRealmRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, profileRealmTestId , profileDomainTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckId(profileTestId, profileRealmTestId)).to.be.true

        // and
        const realmInfo: IProfileRealmManagement.ProfileRealmInfoStruct = await profileRealmManagerDelegateProxy.profileRealmGetInfo(profileTestId, profileRealmTestId);
        expect(realmInfo.name).to.be.equal(PROFILE_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(profileDomainTestId);
        expect(realmInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(realmInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(realmInfo.contextLimit).to.be.equal(3);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckId(profileTestId, profileRealmTestId)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckName(profileTestId, PROFILE_REALM_TEST_NAME)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckAdmin(profileTestId, profileRealmTestId, profileAdminWallet.address)).to.be.true;
      })

      it("Should profile register profileMemberContextTest by profileSystemAdmin success", async() => {
        // given
        const profileMemberManagerTestFactory = new ProfileMemberManagerTest__factory(profileSystemAdmin);

        // when
        profileMemberManagerTest = await profileMemberManagerTestFactory.deploy(aclManagerProxy.address);

        profileMemberContextTestId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const contextRequests: IProfileContextManagement.ProfileContextRegisterRequestStruct[] = [
          {
            realmId: profileRealmTestId,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            salt: ethers.constants.HashZero,
            name: PROFILE_MEMBER_MANAGER_CONTRACT_NAME_TEST,
            version: CONTRACTS_VERSION,
            contractId: profileMemberManagerTest.address,
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            functionLimit: 32,
            signature: new Int8Array(0)
          },
        ];
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileSystemAdminWallet.address,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileSystemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileContextManagerDelegateProxy.connect(livelyAdmin).profileContextRegister(profileMemberSignature, contextRequests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, profileMemberContextTestId, profileRealmTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileMemberManagerTest.address,
            ethers.constants.AddressZero, ethers.constants.AddressZero)

        // and
        const profileContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, profileMemberContextTestId);
        expect(profileContextInfo.realmId).to.be.equal(profileRealmTestId);
        expect(profileContextInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileContextInfo.contractId).to.be.equal(profileMemberManagerTest.address);
        expect(profileContextInfo.functionCount).to.be.equal(0);
        expect(profileContextInfo.functionLimit).to.be.equal(32);
        expect(profileContextInfo.referredByAgent).to.be.equal(0);
        expect(profileContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(profileContextInfo.stype).to.be.equal(ScopeType.CONTEXT);
        expect(profileContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);

        // and
        expect(await profileRealmManagerDelegateProxy.profileRealmHasContext(profileTestId, profileRealmTestId, ethers.utils.keccak256(profileMemberManagerTest.address))).to.be.true;
      })

      it("Should profile register profileRoleContextTest by profileAdmin success", async() => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        const proxy = await proxyFactory.deploy(profileRoleManagerSubject.address, data);
        profileRoleManagerTestProxy = profileRoleManagerSubject.attach(proxy.address);

        // when
        profileRoleContextTestId = ethers.utils.keccak256(profileRoleManagerTestProxy.address);
        const signature = generateProfileContextDomainSignatureManually(
          PROFILE_TEST_NAME,
          profileRoleManagerTestProxy.address,
          PROFILE_ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          PROFILE_REALM_TEST_NAME,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId
        );
        const contextRequests: IProfileContextManagement.ProfileContextRegisterRequestStruct[] = [
          {
            realmId: profileRealmTestId,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            salt: ethers.constants.HashZero,
            name: PROFILE_ROLE_MANAGER_CONTRACT_NAME,
            version: CONTRACTS_VERSION,
            contractId: profileRoleManagerTestProxy.address,
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            functionLimit: -1,
            signature: signature
          },
        ];

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextRegister(emptyProfileMemberSignature, contextRequests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, profileRoleContextTestId, profileRealmTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileRoleManagerTestProxy.address,
            ethers.constants.AddressZero, ethers.constants.AddressZero)

        // and
        const profileContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, profileRoleContextTestId);
        expect(profileContextInfo.realmId).to.be.equal(profileRealmTestId);
        expect(profileContextInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileContextInfo.contractId).to.be.equal(profileRoleManagerTestProxy.address);
        expect(profileContextInfo.functionCount).to.be.equal(0);
        expect(profileContextInfo.functionLimit).to.be.equal(20);
        expect(profileContextInfo.referredByAgent).to.be.equal(0);
        expect(profileContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(profileContextInfo.stype).to.be.equal(ScopeType.CONTEXT);
        expect(profileContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);
      })

      it("Should profile register profileTypeContextTest by profileAdmin to profileTest success", async() => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        const proxy = await proxyFactory.deploy(profileTypeManagerSubject.address, data);
        const profileTypeManagerTestProxy = profileTypeManagerSubject.attach(proxy.address);

        // when
        const profileTypeContextTestId = ethers.utils.keccak256(profileTypeManagerTestProxy.address);
        const signature = generateProfileContextDomainSignatureManually(
          PROFILE_TEST_NAME,
          profileTypeManagerTestProxy.address,
          PROFILE_TYPE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          PROFILE_REALM_TEST_NAME,
          aclManagerProxy.address,
          livelyAdminWallet,
          networkChainId
        );
        const contextRequests: IProfileContextManagement.ProfileContextRegisterRequestStruct[] = [
          {
            realmId: profileRealmTestId,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            salt: ethers.constants.HashZero,
            name: PROFILE_TYPE_MANAGER_CONTRACT_NAME,
            version: CONTRACTS_VERSION,
            contractId: profileTypeManagerTestProxy.address,
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            functionLimit: -1,
            signature: signature
          },
        ];
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature2 = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileSystemAdminWallet.address,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileSystemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature2
        }

        // when
        await expect(profileContextManagerDelegateProxy.connect(livelyAdmin).profileContextRegister(profileMemberSignature, contextRequests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, profileTypeContextTestId, profileRealmTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileTypeManagerTestProxy.address,
            ethers.constants.AddressZero, ethers.constants.AddressZero)

        // and
        const profileContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, profileTypeContextTestId);
        expect(profileContextInfo.realmId).to.be.equal(profileRealmTestId);
        expect(profileContextInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(profileContextInfo.contractId).to.be.equal(profileTypeManagerTestProxy.address);
        expect(profileContextInfo.functionCount).to.be.equal(0);
        expect(profileContextInfo.functionLimit).to.be.equal(20);
        expect(profileContextInfo.referredByAgent).to.be.equal(0);
        expect(profileContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(profileContextInfo.stype).to.be.equal(ScopeType.CONTEXT);
        expect(profileContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(profileContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);
      })

      it("Should profile register profileMemberRegister function by profileSystemAdmin success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const memberFunctionRequests: IProfileFunctionManagement.ProfileFunctionRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            agentId: LIVELY_PROFILE_ANY_TYPE_ID,
            selector: profileTestMemberIface.getSighash("profileMemberRegisterTest"),
            policyCode: 250,
          },
        ]
        const memberFunctionRegisterRequest: IProfileFunctionManagement.ProfileFunctionRegisterRequestStruct[] = [
          {
            signature: new Int8Array(0),
            realmId: ethers.constants.HashZero,
            salt: ethers.constants.HashZero,
            name: "",
            version: "",
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            contractId: profileMemberManagerTest.address,
            functions: memberFunctionRequests
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileSystemAdminWallet.address,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileSystemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileSystemAdmin2).profileFunctionRegister(profileMemberSignature, memberFunctionRegisterRequest))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, profileMemberContextTestId, memberRegisterFunctionId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)

        // then
        expect(await profileContextManagerDelegateProxy.profileContextHasFunction(profileTestId, profileMemberContextTestId, memberRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IProfileFunctionManagement.ProfileFunctionInfoStruct = await profileFunctionManagerDelegateProxy.profileFunctionGetInfo(profileTestId, memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileMemberContextTestId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileTestMemberIface.getSighash("profileMemberRegisterTest"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

        // and
        expect(await profileContextManagerDelegateProxy.profileContextHasFunction(profileTestId, profileMemberContextTestId, memberRegisterFunctionId)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmHasFunction(profileTestId, profileRealmTestId, memberRegisterFunctionId)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmHasContext(profileTestId, profileRealmTestId, ethers.utils.keccak256(profileMemberManagerTest.address))).to.be.true;
      })

      it("Should profile register profileRoleRegister function by profileOwner2 success", async() => {
        // given
        const roleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const signature = generateProfileContextDomainSignatureManually(
          PROFILE_TEST_NAME,
          profileRoleManagerTestProxy.address,
          ROLE_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          PROFILE_REALM_TEST_NAME,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId
        );
        const roleRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerTestProxy.address,  roleIface.getSighash("profileRoleRegister")]));

        const roleFunctionRequests: IProfileFunctionManagement.ProfileFunctionRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            agentId: LIVELY_PROFILE_ANY_TYPE_ID,
            selector: roleIface.getSighash("profileRoleRegister"),
            policyCode: 250,
          },
        ]

        const roleFunctionRegisterRequest: IProfileFunctionManagement.ProfileFunctionRegisterRequestStruct[] = [
          {
            signature: signature,
            realmId: profileRealmTestId,
            salt: ethers.constants.HashZero,
            name: ROLE_MANAGER_CONTRACT_NAME,
            version: CONTRACTS_VERSION,
            subject: ethers.constants.AddressZero,
            deployer: ethers.constants.AddressZero,
            contractId: profileRoleManagerTestProxy.address,
            functions: roleFunctionRequests
          }
        ]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileOwner2).profileFunctionRegister(emptyProfileMemberSignature, roleFunctionRegisterRequest))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, profileRoleContextTestId, roleRegisterFunctionId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_PROFILE_ANY_TYPE_ID)

        // then
        expect(await profileContextManagerDelegateProxy.profileContextHasFunction(profileTestId, profileRoleContextTestId, roleRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IProfileFunctionManagement.ProfileFunctionInfoStruct = await profileFunctionManagerDelegateProxy.profileFunctionGetInfo(profileTestId, roleRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(profileRoleContextTestId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(roleIface.getSighash("profileRoleRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })
    })

    describe("Profile Agent Tests", function() {
      it("Should profile register aclTypeTest success", async() => {
        // given
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const profileTypeRegisterRequests: IProfileTypeManagement.ProfileTypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: profileRealmTestId,
            roleLimit: 2,
            name: ACL_TYPE_TEST_NAME,
          }
        ]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner2).profileTypeRegister(emptyProfileMemberSignature, profileTypeRegisterRequests)).
        to.emit(profileTypeManagerDelegateProxy, "ProfileTypeRegistered")
          .withArgs(profileOwnerWallet2.address, profileTestId, aclTypeTestId, profileRealmTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await profileTypeManagerDelegateProxy.profileTypeCheckId(profileTestId, aclTypeTestId)).to.be.true

        // and
        const typeInfo: IProfileTypeManagement.ProfileTypeInfoStruct = await profileTypeManagerDelegateProxy.profileTypeGetInfo(profileTestId, aclTypeTestId);
        expect(typeInfo.name).to.be.equal(ACL_TYPE_TEST_NAME);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(profileRealmTestId);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileTypeManagerDelegateProxy.profileTypeCheckId(profileTestId, aclTypeTestId)).to.be.true;
        expect(await profileTypeManagerDelegateProxy.profileTypeCheckName(profileTestId, ACL_TYPE_TEST_NAME)).to.be.true;
        expect(await profileTypeManagerDelegateProxy.profileTypeCheckAdmin(profileTestId, aclTypeTestId, profileAdminWallet.address)).to.be.true;
      })

      it("Should profile disable type alterability of aclTypeTestId success", async() => {
        // given
        const requests: IProfileACLCommons.ProfileUpdateAlterabilityRequestStruct[] = [
          {
            entityId: aclTypeTestId,
            alstat: AlterabilityStatus.DISABLED
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileOwnerWallet2.address,
          aclManagerProxy.address,
          profileOwnerWallet2,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileOwnerWallet2.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner).profileTypeUpdateAlterabilityStatus(profileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeAlterabilityUpdated")
          .withArgs(profileOwnerWallet2.address, profileTestId, aclTypeTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of aclTypeTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommons.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclTypeTestId,
          adminId: LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner2).profileTypeUpdateAdmin(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update roleLimit of aclTypeTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileTypeManagement.ProfileTypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner2).profileTypeUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of aclTypeTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommons.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclTypeTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner2).profileTypeUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update scope of aclTypeTest when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclTypeTestId,
            scopeId: memberRegisterFunctionId
          }
        ]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileAdmin).profileTypeUpdateScope(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update type alterability of aclTypeTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclTypeTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileOwner2).profileTypeUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeAlterabilityUpdated")
          .withArgs(profileOwnerWallet2.address, profileTestId, aclTypeTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of aclTypeTest by anonymous failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(user1).profileTypeUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("ProfileACLMemberNotFound()")
      })

      it("Should profile disable activity of aclTypeTest by anyone failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileSystemAdmin).profileTypeUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("'ProfileAdminAccessNotPermitted()")
      })

      it("Should profile disable activity of aclTypeTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileAdmin).profileTypeUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclTypeTestId, ActivityStatus.DISABLED);

        // and
        const typeInfo: IProfileTypeManagement.ProfileTypeInfoStruct = await profileTypeManagerDelegateProxy.profileTypeGetInfo(profileTestId, aclTypeTestId);
        expect(typeInfo.name).to.be.equal(ACL_TYPE_TEST_NAME);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(profileRealmTestId);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile enable activity of aclTypeTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclTypeTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileAdmin).profileTypeUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclTypeTestId, ActivityStatus.ENABLED);

      })

      it("Should profile register aclRoleTest in aclTypeTest with illegal scope failed", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
            scopeId: profileDomainTestId,
            typeId: aclTypeTestId,
            memberLimit: 3,
            name: ACL_ROLE_TEST_NAME
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests))
          .to.revertedWith("Illegal ScopeType")
      })

      it("Should profile aclTypeTest update admin to ProfileSystemAdmin success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclTypeTestId,
          adminId: LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileAdmin).profileTypeUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclTypeTestId, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await profileTypeManagerDelegateProxy.profileTypeCheckAdmin(profileTestId, aclTypeTestId, profileSystemAdminWallet.address)).to.be.true;
      })

      it("Should profile aclTypeTest update admin by anyone failed", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(user1).profileTypeUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .revertedWith("ProfileACLMemberNotFound()");
      })

      it("Should profile update profileSystemAdmin registerLimit by any member failed", async() => {
        // given
        const requests: IProfileMemberManagement.ProfileMemberUpdateRegisterLimitRequestStruct[] = [{
          memberId: profileSystemAdminId,
          registerLimit: {
            memberRegisterLimit: 2,
            roleRegisterLimit: 2,
            typeRegisterLimit: 2,
            functionRegisterLimit: 2,
            contextRegisterLimit: 2,
            realmRegisterLimit: 2,
            domainRegisterLimit: 2,
            policyRegisterLimit: 2
          },
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileSystemAdmin).profileMemberUpdateRegisterLimit(emptyProfileMemberSignature, requests))
          .revertedWith("ProfileAdminAccessNotPermitted()");
      })

      it("Should profile update profileSystemAdmin typeLimit with Illegal Limit failed", async() => {
        // given
        const requests: IProfileMemberManagement.ProfileMemberUpdateLimitRequestStruct[] = [{
          memberId: profileSystemAdminId,
          limit: 0
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateTypeLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Limit");
      })

      it("Should profile update profileSystemAdmin registerLimit success", async() => {
        // given
        const requests: IProfileMemberManagement.ProfileMemberUpdateRegisterLimitRequestStruct[] = [{
          memberId: profileSystemAdminId,
          registerLimit: {
            memberRegisterLimit: 7,
            roleRegisterLimit: 7,
            typeRegisterLimit: 7,
            functionRegisterLimit: 7,
            contextRegisterLimit: 7,
            realmRegisterLimit: 2,
            domainRegisterLimit: 2,
            policyRegisterLimit: 2
          },
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateRegisterLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegisterLimitUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, profileSystemAdminId, [7, 7, 7, 7, 7, 2, 2, 2]);

        // then
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, profileSystemAdminId);
        expect(memberInfo.account).to.be.equal(profileSystemAdminWallet.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(10);
        expect(memberInfo.callLimit).to.be.equal(251);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(2);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

       it("Should profile update scope aclTypeTest to low scope type success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclTypeTestId,
            scopeId: memberRegisterFunctionId
          }
        ]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileSystemAdmin).profileTypeUpdateScope(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeScopeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclTypeTestId, memberRegisterFunctionId)
      })

      it("Should profile register aclRoleTest4 success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        aclRoleTestId4 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_4));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: memberRegisterFunctionId,
            typeId: aclTypeTestId,
            memberLimit: 3,
            name: ACL_ROLE_TEST_NAME_4
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileSystemAdminWallet.address,
          aclManagerProxy.address,
          profileSystemAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileSystemAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin2).profileRoleRegister(profileMemberSignature, roleRegisterRequests)).
        to.emit(profileRoleManagerDelegateProxy, "ProfileRoleRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId4, aclTypeTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, memberRegisterFunctionId)

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckId(profileTestId, aclRoleTestId4)).to.be.true

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId4);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_4);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(memberRegisterFunctionId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckId(profileTestId, aclRoleTestId4)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckName(profileTestId, ACL_ROLE_TEST_NAME_4)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckAdmin(profileTestId, aclRoleTestId4, profileAdminWallet.address)).to.be.true;
      })

      it("Should profile update scope aclTypeTest failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclTypeTestId,
            scopeId: memberRegisterFunctionId
          }
        ]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileAdmin).profileTypeUpdateScope(emptyProfileMemberSignature, requests))
          .to.revertedWith("Illegal ScopeType");
      })

      it("Should profile update scope aclTypeTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclTypeTestId,
            scopeId: LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
          }
        ]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileSystemAdmin).profileTypeUpdateScope(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeScopeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclTypeTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID)

        // and
        const typeInfo: IProfileTypeManagement.ProfileTypeInfoStruct = await profileTypeManagerDelegateProxy.profileTypeGetInfo(profileTestId, aclTypeTestId);
        expect(typeInfo.name).to.be.equal(ACL_TYPE_TEST_NAME);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.adminId).to.be.equal(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(1);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile register aclRoleTest by profileSystemAdmin success", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: profileRealmTestId,
            typeId: aclTypeTestId,
            memberLimit: 3,
            name: ACL_ROLE_TEST_NAME
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests)).
        to.emit(profileRoleManagerDelegateProxy, "ProfileRoleRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId, aclTypeTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, profileRealmTestId)

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckId(profileTestId, aclRoleTestId)).to.be.true

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(profileRealmTestId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckId(profileTestId, aclRoleTestId)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckName(profileTestId, ACL_ROLE_TEST_NAME)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckAdmin(profileTestId, aclRoleTestId, profileAdminWallet.address)).to.be.true;
      })

      it("Should profile register aclRoleTest2 to aclTypeTest failed", async() => {
        // given
        aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: profileRealmTestId,
            typeId: aclTypeTestId,
            memberLimit: -1,
            name: ACL_ROLE_TEST_NAME_2
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests))
          .to.revertedWith("Illegal Register");
      })

      it("Should profile update roleLimit of ACL_TYPE_TEST failed", async() => {
        // given
        const requests: IProfileTypeManagement.ProfileTypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 0
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileSystemAdmin).profileTypeUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Limit");

      })

      it("Should profile update roleLimit of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IProfileTypeManagement.ProfileTypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]

        // when
        await expect(profileTypeManagerDelegateProxy.connect(profileSystemAdmin).profileTypeUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileTypeManagerDelegateProxy, "ProfileTypeRoleLimitUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclTypeTestId, 5)
      })

      it("Should profile register aclRoleTest2 in aclTypeTest success", async() => {
        // given
        // const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
        // aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            scopeId: profileRoleContextTestId,
            typeId: aclTypeTestId,
            memberLimit: -1,
            name: ACL_ROLE_TEST_NAME_2
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId2, aclTypeTestId,
            LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID, profileRoleContextTestId);

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId2);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_2);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(profileRoleContextTestId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(20);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile update scope aclRoleTest2 in aclTypeTest success", async() => {
        // given
        // aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclRoleTestId2,
            scopeId: profileRealmTestId,
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleUpdateScope(emptyProfileMemberSignature, roleRegisterRequests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleScopeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId2, profileRealmTestId)
      })

      it("Should profile register aclRoleTest3 in aclTypeTest success", async() => {
        // given
        const roleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const roleRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerTestProxy.address,  roleIface.getSighash("profileRoleRegister")]));
        aclRoleTestId3 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_3));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            scopeId: roleRegisterFunctionId,
            typeId: aclTypeTestId,
            memberLimit: -1,
            name: ACL_ROLE_TEST_NAME_3
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleRegistered")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId3, aclTypeTestId,
            LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID, roleRegisterFunctionId);

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId3);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_3);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(roleRegisterFunctionId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(20);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile disable alterability of aclRoleTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclRoleTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of aclRoleTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclRoleTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of aclRoleTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update memberLimit of aclRoleTest when alterability disabled failed", async() => {
        // given
        const memberLimitRequests: IProfileRoleManagement.ProfileRoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateMemberLimit(emptyProfileMemberSignature, memberLimitRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile grant member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile revoke member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IProfileRoleManagement.ProfileRoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRevokeMembers(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile register new member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 5,
            callLimit: 5,
            registerLimit: {
              memberRegisterLimit: 5,
              roleRegisterLimit: 5,
              typeRegisterLimit: 5,
              functionRegisterLimit: 5,
              contextRegisterLimit: 5,
              realmRegisterLimit: 5,
              domainRegisterLimit: 5,
              policyRegisterLimit: 5
            }
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberRegister(emptyProfileMemberSignature, memberRegisterRequests))
          .to.revertedWith("Illegal Role Updatable");
      })

      it("Should profile update alterability of aclRoleTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclRoleTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile aclRoleTest register user1 with illegal admin failed", async() => {
        // given
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.utils.keccak256(livelyAdminWallet.address),
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 2,
            callLimit: 2,
            registerLimit: {
              memberRegisterLimit: 2,
              roleRegisterLimit: 2,
              typeRegisterLimit: 2,
              functionRegisterLimit: 2,
              contextRegisterLimit: 2,
              realmRegisterLimit: 2,
              domainRegisterLimit: 2,
              policyRegisterLimit: 2
            }
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileSystemAdmin).profileMemberRegister(emptyProfileMemberSignature, memberRegisterRequests))
          .to.revertedWith("ProfileAdminAccessNotPermitted()");
      })

      it("Should profile aclRoleTest register user1 success", async() => {
        // given
        const roleMemberUserId1 =  ethers.utils.keccak256(userWallet1.address);
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 2,
            callLimit: 1,
            registerLimit: {
              memberRegisterLimit: 8,
              roleRegisterLimit: 8,
              typeRegisterLimit: 8,
              functionRegisterLimit: 8,
              contextRegisterLimit: 8,
              realmRegisterLimit: 8,
              domainRegisterLimit: 8,
              policyRegisterLimit: 8
            }
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin2).profileMemberRegister(profileMemberSignature, memberRegisterRequests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, roleMemberUserId1,
            aclRoleTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, [8, 8, 8, 8, 8, 8, 8, 8])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, roleMemberUserId1)).to.be.true;
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAccount(profileTestId, userWallet1.address)).to.be.true;

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, roleMemberUserId1);
        expect(memberInfo.account).to.be.equal(userWallet1.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.callLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(8);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile aclRoleTest register same member failed", async() => {
        // given
        // const roleMemberUserId1 =  ethers.utils.keccak256(userWallet1.address);
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 5,
            callLimit: 5,
            registerLimit: {
              memberRegisterLimit: 2,
              roleRegisterLimit: 2,
              typeRegisterLimit: 2,
              functionRegisterLimit: 2,
              contextRegisterLimit: 2,
              realmRegisterLimit: 2,
              domainRegisterLimit: 2,
              policyRegisterLimit: 2
            }
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileSystemAdmin).profileMemberRegister(emptyProfileMemberSignature, memberRegisterRequests))
          .revertedWith("Already Exist")
      })

      it("Should profile grant profileSystemAdmin to profileAdmin role failed", async() => {
        // given
        const profileSystemAdminId = ethers.utils.keccak256(profileSystemAdminWallet.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            members: [profileSystemAdminId]
          },
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal GrantMemberType")
      })

      it("Should profile aclRoleTest grant profileSystemAdmin to aclRoleTestId role success", async() => {
        // given
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [
          {
            roleId: aclRoleTestId,
            members: [profileSystemAdminId]
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, profileSystemAdminId, aclTypeTestId)

      })

      it("Should profile aclRoleTest register member with set Admin failed", async() => {
        // given
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            typeLimit: 2,
            callLimit: 0,
            registerLimit: {
              memberRegisterLimit: 0,
              roleRegisterLimit: 0,
              typeRegisterLimit: 0,
              functionRegisterLimit: 0,
              contextRegisterLimit: 0,
              realmRegisterLimit: 0,
              domainRegisterLimit: 0,
              policyRegisterLimit: 0
            }
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileSystemAdmin).profileMemberRegister(emptyProfileMemberSignature, memberRegisterRequests))
          .revertedWith("ProfileAdminAccessNotPermitted()")
      })

      it("Should profile aclRoleTest activity disabled with someone failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(user1).profileRoleUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.revertedWith("ProfileAdminAccessNotPermitted()")
      })

      it("Should profile aclRoleTest activity disabled success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, ActivityStatus.DISABLED)

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(profileRealmTestId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(2);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile aclRoleTest activity enabled success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRoleTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, ActivityStatus.ENABLED)

        // and
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(profileRealmTestId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(2);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile register user2 to aclRoleTest success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            typeLimit: 16,
            callLimit: 16,
            registerLimit: {
              memberRegisterLimit: 5,
              roleRegisterLimit: 0,
              typeRegisterLimit: 5,
              functionRegisterLimit: 5,
              contextRegisterLimit: 5,
              realmRegisterLimit: 5,
              domainRegisterLimit: 5,
              policyRegisterLimit: 5
            }
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberRegister(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, roleMemberUserId2, aclRoleTestId, aclRoleTestId, [5, 0, 5, 5, 5, 5, 5, 5])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, roleMemberUserId2)).to.be.true;

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, roleMemberUserId2);
        expect(memberInfo.account).to.be.equal(userWallet2.address);
        expect(memberInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(16);
        expect(memberInfo.callLimit).to.be.equal(16);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(0);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(5);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(5);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile update admin user2 member success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IProfileACLCommons.ProfileUpdateAdminRequestStruct[] = [
          {
            entityId: roleMemberUserId2,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileSystemAdmin).profileMemberUpdateAdmin(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberAdminUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, roleMemberUserId2, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should profile update admin of aclRoleTest success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclRoleTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleTestId, aclRoleTestId);

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckAdmin(profileTestId, aclRoleTestId, userWallet1.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleCheckAdmin(profileTestId, aclRoleTestId, userWallet2.address)).to.be.true;
      })

      it("Should profile register role in aclTypeTest by user2 failed", async() => {
        // given
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: profileDomainTestId,
            typeId: aclTypeTestId,
            memberLimit: 3,
            name: "ROLE_TEST"
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(user2).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests)).
        to.revertedWith("Illegal Member RoleRegisterLimit")
      })

      it("Should profile aclRoleTest register another member when meet limitation failed", async() => {
        // given
        const requests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 2,
            callLimit: 0,
            registerLimit: {
              memberRegisterLimit: 0,
              roleRegisterLimit: 0,
              typeRegisterLimit: 0,
              functionRegisterLimit: 0,
              contextRegisterLimit: 0,
              realmRegisterLimit: 0,
              domainRegisterLimit: 0,
              policyRegisterLimit: 0,
            },
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user1).profileMemberRegister(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Register")
      })

      it("Should profile aclRoleTest update member limit by someone failed", async() => {
        // given
        const requests: IProfileRoleManagement.ProfileRoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 1
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(user1).profileRoleUpdateMemberLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Limit")
      })

      it("Should profile aclRoleTest update member limit by anyone failed", async() => {
        // given
        const requests: IProfileRoleManagement.ProfileRoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 10
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin2).profileRoleUpdateMemberLimit(emptyProfileMemberSignature, requests))
          .revertedWith("ProfileACLMemberNotFound()")
      })

      it("Should profile aclRoleTest update member limit success", async() => {
        // given
        const requests: IProfileRoleManagement.ProfileRoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(user1).profileRoleUpdateMemberLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberLimitUpdated")
          .withArgs(userWallet1.address, profileTestId, aclRoleTestId, 5)
      })

      it("Should profile register user3 member to aclRoleTest failed", async() => {
        // given
        const requests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 2,
            callLimit: 0,
            registerLimit: {
              memberRegisterLimit: 0,
              roleRegisterLimit: 0,
              typeRegisterLimit: 0,
              functionRegisterLimit: 0,
              contextRegisterLimit: 0,
              realmRegisterLimit: 0,
              domainRegisterLimit: 0,
              policyRegisterLimit: 0,
            },
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user1).profileMemberRegister(emptyProfileMemberSignature, requests))
          .to.revertedWith("CallForbidden()")
      })

      it("Should profile update callLimit of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileMemberManagement.ProfileMemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 64
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateCallLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberCallLimitUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId1, 64)
      })

      it("Should profile register user3 member to aclRoleTest success", async() => {
        // given
        const roleMemberUserId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 1,
            callLimit: 10,
            registerLimit: {
              memberRegisterLimit: 2,
              roleRegisterLimit: 2,
              typeRegisterLimit: 2,
              functionRegisterLimit: 2,
              contextRegisterLimit: 2,
              realmRegisterLimit: 2,
              domainRegisterLimit: 2,
              policyRegisterLimit: 2,
            },
          }
        ]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user1).profileMemberRegister(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(userWallet1.address, profileTestId, roleMemberUserId3, aclRoleTestId,
            LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, [2,2,2,2,2,2,2,2])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, roleMemberUserId3)).to.be.true;

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, roleMemberUserId3);
        expect(memberInfo.account).to.be.equal(userWallet3.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(1);
        expect(memberInfo.callLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(2);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(userWallet3.address)).to.be.eql([profileTestId]);
      })

      it("Should profile grant user3 to system admin role failed", async() => {
        // given
        const userId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [{
          roleId: LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          members: [userId3]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Member TypeLimit")
      })

      it("Should profile revoke member from aclRoleTest and delete user3 success", async() => {
        // given
        const userId3 =  ethers.utils.keccak256(userWallet3.address);
        const requests: IProfileRoleManagement.ProfileRoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [userId3]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(user1).profileRoleRevokeMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberDeleted")
          .withArgs(userWallet1.address, profileTestId, aclRoleTestId, userId3, aclTypeTestId, userWallet3.address)
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberRevoked")
          .withArgs(userWallet1.address, profileTestId, aclRoleTestId, userId3, aclTypeTestId);

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, aclTypeTestId, userWallet3.address)).to.be.false;

        // and
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, userId3)).to.be.false;
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAccount(profileTestId, userWallet3.address)).to.be.false;

        // and
        expect(await profileManagerDelegateProxy.profileGetProfileAccount(userWallet3.address)).to.be.empty;
      })

      it("Should profile grant members to profileAdmin success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            members: [userId1, userId2]
          },
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId2, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userWallet1.address)).to.be.true;
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userWallet2.address)).to.be.true;

        // and
        expect(await profileMemberManagerDelegateProxy.profileMemberHasType(profileTestId, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)).to.be.true;
        expect(await profileMemberManagerDelegateProxy.profileMemberHasType(profileTestId, userId2, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)).to.be.true;

        // and
        expect(await profileMemberManagerDelegateProxy.profileMemberGetTypes(profileTestId, userId1)).to.be.eqls([aclTypeTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID]);
        expect(await profileMemberManagerDelegateProxy.profileMemberGetTypes(profileTestId, userId2)).to.be.eqls([aclTypeTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID]);

        // and
        expect(await profileTypeManagerDelegateProxy.profileTypeHasAccount(profileTestId, aclTypeTestId, userWallet1.address)).to.be.true;
        expect(await profileTypeManagerDelegateProxy.profileTypeHasAccount(profileTestId, aclTypeTestId, userWallet2.address)).to.be.true;

        // and
        expect(await profileTypeManagerDelegateProxy.profileTypeHasRole(profileTestId, aclTypeTestId, aclRoleTestId)).to.be.true;
        expect(await profileTypeManagerDelegateProxy.profileTypeHasRole(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)).to.be.true;

        // and
        expect(await profileTypeManagerDelegateProxy.profileTypeGetRoles(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)).to.be.eqls([LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID]);
        expect(await profileTypeManagerDelegateProxy.profileTypeGetRoles(profileTestId, aclTypeTestId)).to.be.eqls([aclRoleTestId4, aclRoleTestId, aclRoleTestId2, aclRoleTestId3]);

        // and
        expect(await profileManagerDelegateProxy.profileGetAdmins(profileTestId)).to.be.eql([profileAdminId, profileOwnerId2, userId1, userId2]);
      })

      it("Should profile revoke user1 from profile LivelyMasterAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IProfileRoleManagement.ProfileRoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
          members: [ userId1]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRevokeMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberRevoked")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userWallet1.address)).to.be.false;

        // and
        expect(await profileMemberManagerDelegateProxy.profileMemberHasType(profileTestId, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)).to.be.false;
      })

      it("Should profile update member alterability of user1 failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: userId1,
          alstat: AlterabilityStatus.UPGRADABLE
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user1).profileMemberUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("ProfileAdminAccessRoleNotFound()")
      })

      it("Should profile disable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: userId1,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId1, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: userId1,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: userId1,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update registerLimit of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileMemberManagement.ProfileMemberUpdateRegisterLimitRequestStruct[] = [{
          memberId: userId1,
          registerLimit: {
            memberRegisterLimit: 0,
            roleRegisterLimit: 0,
            typeRegisterLimit: 0,
            functionRegisterLimit: 0,
            contextRegisterLimit: 0,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0,
          }
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateRegisterLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile updatable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: userId1,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId1, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile user1 activity disabled success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: userId1,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId1, ActivityStatus.DISABLED)

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, userId1);
        expect(memberInfo.account).to.be.equal(userWallet1.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.callLimit).to.be.equal(62);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(7);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(8);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(8);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile user1 update admin success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: userId1,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId1, aclRoleTestId);

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAdmin(profileTestId, userId1, userWallet2.address)).to.be.true;
      })

      it("Should profile user1 activity enable by itself failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: userId1,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user1).profileMemberUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.revertedWith("ProfileACLMemberActivityForbidden()")
      })

      it("Should profile user1 activity enable with user2 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: userId1,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(user2).profileMemberUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberActivityUpdated")
          .withArgs(userWallet2.address, profileTestId, userId1, ActivityStatus.ENABLED)
      })

      it("Should profile update scope aclRoleTest to Universe success", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclRoleTestId,
            scopeId: LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID,
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleUpdateScope(emptyProfileMemberSignature, roleRegisterRequests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleScopeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID)

        // then
        const roleInfo: IProfileRoleManagement.ProfileRoleInfoStruct = await profileRoleManagerDelegateProxy.profileRoleGetInfo(profileTestId, aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(aclRoleTestId);
        expect(roleInfo.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(5);
        expect(roleInfo.memberCount).to.be.equal(3);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })
    })

    describe("Profile Policy Test", function() {
      it("Should profile register aclPolicyTest in ACL policy success", async() => {
        // given
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IProfilePolicyManagement.ProfilePolicyRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: profileMemberContextTestId,
            roleLimit: 2,
            policyCode: 80,
            name: ACL_POLICY_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin2).profilePolicyRegister(profileMemberSignature, requests)).
        to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, profileMemberContextTestId,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, 80)

        // then
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckId(profileTestId, aclPolicyTestId)).to.be.true

        // and
        const policyInfo: IProfilePolicyManagement.ProfilePolicyInfoStruct = await profilePolicyManagerDelegateProxy.profilePolicyGetInfo(profileTestId, aclPolicyTestId);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(profileMemberContextTestId);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(0);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckId(profileTestId, aclPolicyTestId)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckName(profileTestId, ACL_POLICY_TEST_NAME)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckAdmin(profileTestId, aclPolicyTestId, profileAdminWallet.address)).to.be.true;
      })

      it("Should profile add aclRoleTestId4 to aclPolicyTest success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId4 ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRoleAdded")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, aclRoleTestId4);

        // then
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRole(profileTestId, aclRoleTestId4)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyHasRole(profileTestId, aclPolicyTestId, aclRoleTestId4)).to.be.true;

        // and
        const policyInfo: IProfilePolicyManagement.ProfilePolicyInfoStruct = await profilePolicyManagerDelegateProxy.profilePolicyGetInfoByRole(profileTestId, aclRoleTestId4);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(profileMemberContextTestId);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(1);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile update scope aclPolicyTest in profileTest failed", async() => {
        // given
        const roleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
        const roleRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileRoleManagerTestProxy.address,  roleIface.getSighash("profileRoleRegister")]));
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclPolicyTestId,
            scopeId: roleRegisterFunctionId,
          }
        ]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateScope(emptyProfileMemberSignature, requests)).
        to.revertedWith("Illegal ScopeType")
      })

      it("Should profile update scope aclPolicyTest in profileTest success", async() => {
        // given
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IProfileACLCommonsRoles.ProfileUpdateScopeRequestStruct[] = [
          {
            entityId: aclPolicyTestId,
            scopeId: LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID,
          }
        ]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateScope(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyScopeUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID)
      })

      it("Should profile disable alterability of aclPolicyTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclPolicyTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileOwner2).profilePolicyUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyAlterabilityUpdated")
          .withArgs(profileOwnerWallet2.address, profileTestId, aclPolicyTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclPolicyTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update policyCode of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 30
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateCodes(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update roleLimit of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile add roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile remove roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of aclPolicyTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclPolicyTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile aclPolicyTest activity disabled success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, ActivityStatus.DISABLED)

        // and
        const policyInfo: IProfilePolicyManagement.ProfilePolicyInfoStruct = await profilePolicyManagerDelegateProxy.profilePolicyGetInfo(profileTestId, aclPolicyTestId);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(1);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

      })

      it("Should profile aclPolicyTest activity enabled success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclPolicyTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(user2).profilePolicyUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyActivityUpdated")
          .withArgs(userWallet2.address, profileTestId, aclPolicyTestId, ActivityStatus.ENABLED)
      })

      it("Should profile add adminId to aclPolicyTest self failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Role")
      })

      it("Should profile update admin of aclPolicyTest success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclPolicyTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, aclRoleTestId);
      })

      it("Should profile add aclRoleTestId2 to aclPolicyTest success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId2 ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(user1).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRoleAdded")
          .withArgs(userWallet1.address, profileTestId, aclPolicyTestId, aclRoleTestId2);

        // then
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRole(profileTestId, aclRoleTestId2)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyHasRole(profileTestId, aclPolicyTestId, aclRoleTestId2)).to.be.true;

        // and
        const policyInfo: IProfilePolicyManagement.ProfilePolicyInfoStruct = await profilePolicyManagerDelegateProxy.profilePolicyGetInfoByRole(profileTestId, aclRoleTestId2);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(aclRoleTestId);
        expect(policyInfo.scopeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(2);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile add roles to aclPolicyTest for illegal role failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(user1).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Role")
      })

      it("Should profile update admin of aclPolicyTest to SYSTEM_MASTER_ADMIN_ROLE success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclPolicyTestId,
          adminId: LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(user1).profilePolicyUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyAdminUpdated")
          .withArgs(userWallet1.address, profileTestId, aclPolicyTestId, LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID);
      })

      it("Should profile add roles to aclPolicyTest for limitation failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Limit")
      })

      it("Should profile update role limit of aclPolicyTest by anyone failed", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 0
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(user1).profilePolicyUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .revertedWith("ProfileAdminAccessNotPermitted()")
      })

      it("Should profile update role limit of aclPolicyTest success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileSystemAdmin).profilePolicyUpdateRoleLimit(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRoleLimitUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclPolicyTestId, 5)
      })

      it("Should profile add aclRoleTestId to aclPolicyTest success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileAdmin).profilePolicyAddRoles(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRoleAdded")
          .withArgs(profileAdminWallet.address, profileTestId, aclPolicyTestId, aclRoleTestId);

        // then
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRole(profileTestId, aclRoleTestId)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyHasRole(profileTestId, aclPolicyTestId, aclRoleTestId)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyGetRoles(profileTestId, aclPolicyTestId)).to.be.eqls([aclRoleTestId4, aclRoleTestId2, aclRoleTestId])
      })

      it("Should profile remove roles aclRoleTestId2 to aclPolicyTest success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId2 ]
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileSystemAdmin).profilePolicyRemoveRoles(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyRoleRemoved")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclPolicyTestId, aclRoleTestId2);

        // then
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRole(profileTestId, aclRoleTestId2)).to.be.false;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyHasRole(profileTestId, aclPolicyTestId, aclRoleTestId2)).to.be.false;
      })

      it("Should profile update policyCode of aclPolicyTest to UNLOCK success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const isPolicyAccess = await profilePolicyManagerDelegateProxy.profilePolicyCheckAccess(profileTestId, aclPolicyTestId, memberRegisterFunctionId);
        const isRoleAccess = await profilePolicyManagerDelegateProxy.profilePolicyCheckRoleAccess(profileTestId, aclRoleTestId, memberRegisterFunctionId);
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 0
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileSystemAdmin).profilePolicyUpdateCodes(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyCodeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclPolicyTestId, 0, PolicyType.UNLOCK);

        // and
        expect(isPolicyAccess).to.be.true;
        expect(isRoleAccess).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckAccess(profileTestId, aclPolicyTestId, memberRegisterFunctionId)).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRoleAccess(profileTestId, aclRoleTestId, memberRegisterFunctionId)).to.be.true;
      })
    })

    describe("Profile Scope Test", function() {
      // function manager tests
      it("Should profile disable alterability of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          alstat: AlterabilityStatus.DISABLED
        }]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin2).profileFunctionUpdateAlterabilityStatus(profileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, AlterabilityStatus.DISABLED);
      })

      it("Should profile update admin of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAdmin(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update agent of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclRoleTestId
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAgent(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update policyCode of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdatePolicyRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          policyCode: 30
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdatePolicyCode(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of memberRegisterFunction success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, ActivityStatus.DISABLED)

        // then
        const functionInfo: IProfileFunctionManagement.ProfileFunctionInfoStruct = await profileFunctionManagerDelegateProxy.profileFunctionGetInfo(profileTestId, memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_PROFILE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(profileTestMemberIface.getSighash("profileMemberRegisterTest"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(1);
      })

      it("Should profile enable activity of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberRegisterFunctionId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, ActivityStatus.ENABLED)

        // then
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckSelector(profileTestId, profileMemberManagerTest.address, profileTestMemberIface.getSighash("profileMemberRegisterTest"))).to.be.true;
      })

      it("Should profile update agent of memberRegisterFunction to aclTypeTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclTypeTestId
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAgent(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionAgentUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, aclTypeTestId);

        // then
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  userWallet2.address)).to.be.true;
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  userWallet3.address)).to.be.false;
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  profileSystemAdminWallet.address)).to.be.true;
      })

      it("Should profile revoke user2 from profile ProfileMasterAdminRole success", async() => {
        // given
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IProfileRoleManagement.ProfileRoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
          members: [ userId2]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRevokeMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberRevoked")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId2, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await profileRoleManagerDelegateProxy.profileRoleHasAccount(profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userWallet2.address)).to.be.false;

        // and
        expect(await profileMemberManagerDelegateProxy.profileMemberHasType(profileTestId, userId2, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)).to.be.false;
      })

      it("Should profile update user2 registerLimit success", async() => {
        // given
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IProfileMemberManagement.ProfileMemberUpdateRegisterLimitRequestStruct[] = [{
          memberId: userId2,
          registerLimit: {
            memberRegisterLimit: 2,
            roleRegisterLimit: 2,
            typeRegisterLimit: 2,
            functionRegisterLimit: 2,
            contextRegisterLimit: 2,
            realmRegisterLimit: 2,
            domainRegisterLimit: 2,
            policyRegisterLimit: 2
          },
        }]

        // when
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberUpdateRegisterLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegisterLimitUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, userId2, [2, 2, 2, 2, 2, 2, 2, 2]);

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, userId2);
        expect(memberInfo.account).to.be.equal(userWallet2.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(16);
        expect(memberInfo.callLimit).to.be.equal(14);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(2);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(2);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile grant user2 to aclRoleTest3 success", async() => {
        // given
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [
          {
            roleId: aclRoleTestId3,
            members: [userId2]
          },
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileSystemAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberRevoked")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId, userId2, aclTypeTestId)
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclRoleTestId3, userId2, aclTypeTestId)
      })

      it("Should profile aclRoleTest3 register user3 with Illegal role scope failed", async() => {

        // when
        await expect(profileMemberManagerTest.connect(user2).profileMemberRegisterTest(profileTestId))
          .to.revertedWith("ProfileACLRoleScopeForbidden()");
      })

      it("Should profile update agent of memberRegisterFunction to aclRoleTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclRoleTestId
        }]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAgent(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionAgentUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberRegisterFunctionId, aclRoleTestId);

        // then
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  userWallet2.address)).to.be.false;
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  userWallet3.address)).to.be.false;
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAgent(profileTestId, memberRegisterFunctionId,  livelyAdminWallet.address)).to.be.false;
      })

      it("Should profile update admin of memberRegisterFunction success", async() => {
        // given
        const profileMemberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [
          {
            entityId: profileMemberRegisterFunctionId,
            adminId: aclRoleTestId
          },
        ]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(profileAdmin).profileFunctionUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, profileMemberRegisterFunctionId, aclRoleTestId)

        // then
        expect(await profileFunctionManagerDelegateProxy.profileFunctionCheckAdmin(profileTestId, profileMemberRegisterFunctionId, userWallet1.address)).to.be.true;
      })

      it("Should profile update policyCode of aclPolicyTest to LOCK success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const isPolicyAccess = await profilePolicyManagerDelegateProxy.profilePolicyCheckAccess(profileTestId, aclPolicyTestId, memberRegisterFunctionId);
        const isRoleAccess = await profilePolicyManagerDelegateProxy.profilePolicyCheckRoleAccess(profileTestId, aclRoleTestId, memberRegisterFunctionId);
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 255
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileSystemAdmin).profilePolicyUpdateCodes(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyCodeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclPolicyTestId, 255, PolicyType.LOCK);

        // and
        expect(isPolicyAccess).to.be.true;
        expect(isRoleAccess).to.be.true;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckAccess(profileTestId, aclPolicyTestId, memberRegisterFunctionId)).to.be.false;
        expect(await profilePolicyManagerDelegateProxy.profilePolicyCheckRoleAccess(profileTestId, aclRoleTestId, memberRegisterFunctionId)).to.be.false;
      })

      it("Should profile aclRoleTest register user3 member with policy LOCK failed", async() => {
        // when
        await expect(profileMemberManagerTest.connect(user1).profileMemberRegisterTest(profileTestId))
          .to.revertedWith("ProfileACLPolicyForbidden()")
      })

      it("Should profile update policyCode of memberRegisterFunction to RLOCK failed", async() => {
        // given
        const profileMemberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdatePolicyRequestStruct[] = [
          {
            functionId: profileMemberRegisterFunctionId,
            policyCode: 130
          }
        ]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(user1).profileFunctionUpdatePolicyCode(emptyProfileMemberSignature, requests))
          .to.revertedWith("ProfileAdminAccessPolicyForbidden()");
      })

      it("Should profile update policyCode of aclPolicyTest to UNLOCK success", async() => {
        // given
        const requests: IProfilePolicyManagement.ProfilePolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 0
        }]

        // when
        await expect(profilePolicyManagerDelegateProxy.connect(profileSystemAdmin).profilePolicyUpdateCodes(emptyProfileMemberSignature, requests))
          .to.emit(profilePolicyManagerDelegateProxy, "ProfilePolicyCodeUpdated")
          .withArgs(profileSystemAdminWallet.address, profileTestId, aclPolicyTestId, 0, PolicyType.UNLOCK);
      })

      it("Should profile update policyCode of memberRegisterFunction to RLOCK success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const profileMemberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const requests: IProfileFunctionManagement.ProfileFunctionUpdatePolicyRequestStruct[] = [
          {
            functionId: profileMemberRegisterFunctionId,
            policyCode: 130
          }
        ]

        // when
        await expect(profileFunctionManagerDelegateProxy.connect(user1).profileFunctionUpdatePolicyCode(emptyProfileMemberSignature, requests))
          .to.emit(profileFunctionManagerDelegateProxy, "ProfileFunctionPolicyUpdated")
          .withArgs(userWallet1.address, profileTestId, profileMemberRegisterFunctionId, 130);

        // then
        let functionInfo: IProfileFunctionManagement.ProfileFunctionInfoStruct = await profileFunctionManagerDelegateProxy.profileFunctionGetInfo(profileTestId, profileMemberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(aclRoleTestId);
        expect(functionInfo.agentId).to.be.equal(aclRoleTestId);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.policyCode).to.be.equal(130);
        expect(functionInfo.selector).to.be.equal(profileTestMemberIface.getSighash("profileMemberRegisterTest"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(1);
      })

      it("Should profile aclRoleTest register user3 member with policy UNLOCK success", async() => {
        // given
        const roleMemberUserId3 =  ethers.utils.keccak256(userWallet3.address);
        const memberRegisterRequests: IProfileMemberManagement.ProfileMemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 2,
            callLimit: 10,
            registerLimit: {
              memberRegisterLimit: 1,
              roleRegisterLimit: 1,
              typeRegisterLimit: 1,
              functionRegisterLimit: 1,
              contextRegisterLimit: 1,
              realmRegisterLimit: 1,
              domainRegisterLimit: 1,
              policyRegisterLimit: 1
            }
          }
        ]

        // when
        await profileMemberManagerTest.connect(user1).profileMemberRegisterTest(profileTestId);
        await expect(profileMemberManagerDelegateProxy.connect(profileAdmin).profileMemberRegister(emptyProfileMemberSignature, memberRegisterRequests))
          .to.emit(profileMemberManagerDelegateProxy, "ProfileMemberRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, roleMemberUserId3,
            aclRoleTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID, [1, 1, 1, 1, 1, 1, 1, 1])

        // then
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckId(profileTestId, roleMemberUserId3)).to.be.true;
        expect(await profileMemberManagerDelegateProxy.profileMemberCheckAccount(profileTestId, userWallet1.address)).to.be.true;

        // and
        const memberInfo: IProfileMemberManagement.ProfileMemberInfoStruct = await profileMemberManagerDelegateProxy.profileMemberGetInfo(profileTestId, roleMemberUserId3);
        expect(memberInfo.account).to.be.equal(userWallet3.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.callLimit).to.be.equal(10);
        expect(memberInfo.registerLimit.memberRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.roleRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.typeRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.functionRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.contextRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.realmRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.domainRegisterLimit).to.be.equal(1);
        expect(memberInfo.registerLimit.policyRegisterLimit).to.be.equal(1);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      // context manager test
      it("Should profile disable alterability of profileMemberContextTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: memberContextId,
          alstat: AlterabilityStatus.DISABLED
        }]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin2).profileContextUpdateAlterabilityStatus(profileMemberSignature, requests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberContextId, AlterabilityStatus.DISABLED);
      })

      it("Should profile update admin of profileMemberContextTest when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: memberContextId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateAdmin(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of profileMemberContextTest when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberContextId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update functionLimit of profileMemberContextTest when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileContextManagement.ProfileContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 5
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateFunctionLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of profileMemberContextTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: memberContextId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberContextId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of profileMemberContextTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberContextId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberContextId, ActivityStatus.DISABLED)

        const memberContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberContextInfo.contractId).to.be.equal(profileMemberManagerTest.address);
        expect(memberContextInfo.realmId).to.be.equal(profileRealmTestId);
        expect(memberContextInfo.functionLimit).to.be.equal(32);
        expect(memberContextInfo.functionCount).to.be.equal(1);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      it("Should profile enable activity of profileMemberContextTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: memberContextId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberContextId, ActivityStatus.ENABLED)

        // then
        expect(await profileContextManagerDelegateProxy.profileContextHasSelector(profileTestId, profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest"))).to.be.true;
        expect(await profileContextManagerDelegateProxy.profileContextHasFunction(profileTestId, memberContextId, memberRegisterFunctionId)).to.be.true;

        // and
        const functionIds = await profileContextManagerDelegateProxy.profileContextGetFunctions(profileTestId, memberContextId);
        expect(functionIds.length).to.be.equal(1)
      })

      it("Should profile update admin of profileMemberContextTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: memberContextId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(profileAdmin).profileContextUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, memberContextId, aclRoleTestId);

        // then
        expect(await profileContextManagerDelegateProxy.profileContextCheckAdmin(profileTestId, memberContextId, userWallet1.address)).to.be.true;
      })

      it("Should profile update functionLimit of profileMemberContextTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileContextManagement.ProfileContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 25
        }]

        // when
        await expect(profileContextManagerDelegateProxy.connect(user1).profileContextUpdateFunctionLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileContextManagerDelegateProxy, "ProfileContextFunctionLimitUpdated")
          .withArgs(userWallet1.address, profileTestId, memberContextId, 25);

        const memberContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, memberContextId);
        // expect(memberContextInfo.name).to.be.equal(MEMBER_MANAGER_CONTRACT_NAME);
        // expect(memberContextInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(memberContextInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberContextInfo.contractId).to.be.equal(profileMemberManagerTest.address);
        expect(memberContextInfo.realmId).to.be.equal(profileRealmTestId);
        expect(memberContextInfo.functionLimit).to.be.equal(25);
        expect(memberContextInfo.functionCount).to.be.equal(1);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })


      // domain manager test
      it("Should profile register aclDomainTest in Profile Universe success", async() => {
        // given
        aclDomainTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TEST_NAME));
        const requests: IProfileDomainManagement.ProfileDomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 1,
            name: ACL_DOMAIN_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin2).profileDomainRegister(profileMemberSignature, requests)).
        to.emit(profileDomainManagerDelegateProxy, "ProfileDomainRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId ,LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckId(profileTestId, aclDomainTestId)).to.be.true

        // and
        const domainInfo: IProfileDomainManagement.ProfileDomainInfoStruct = await profileDomainManagerDelegateProxy.profileDomainGetInfo(profileTestId, aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.universeId).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(domainInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckId(profileTestId, aclDomainTestId)).to.be.true;
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckName(profileTestId, ACL_DOMAIN_TEST_NAME)).to.be.true;
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckAdmin(profileTestId, aclDomainTestId, profileAdminWallet.address)).to.be.true;
        expect(await profileUniverseManagerDelegateProxy.profileUniverseGetDomains(profileTestId)).to.be.eqls([profileDomainTestId, aclDomainTestId]);
      })

      it("Should profile disable of aclDomainTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclDomainTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclDomainTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateAdmin(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update roleLimit of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileDomainManagement.ProfileDomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 1
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateRealmLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of aclDomainTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclDomainTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of aclDomainTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId, ActivityStatus.DISABLED)

        // and
        const domainInfo: IProfileDomainManagement.ProfileDomainInfoStruct = await profileDomainManagerDelegateProxy.profileDomainGetInfo(profileTestId, aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile enable activity of aclDomainTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclDomainTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId, ActivityStatus.ENABLED)
      })

      it("Should profile update admin of aclDomainTest success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclDomainTestId,
          adminId: aclTypeTestId
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(profileAdmin).profileDomainUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclDomainTestId, aclTypeTestId);

        // then
        expect(await profileDomainManagerDelegateProxy.profileDomainCheckAdmin(profileTestId, aclDomainTestId, profileSystemAdminWallet.address)).to.be.true;
      })

      it("Should profile update realmLimit of aclDomainTest success", async() => {
        // given
        const requests: IProfileDomainManagement.ProfileDomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 2
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(user1).profileDomainUpdateRealmLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainRealmLimitUpdated")
          .withArgs(userWallet1.address, profileTestId, aclDomainTestId, 2);

        // and
        const domainInfo: IProfileDomainManagement.ProfileDomainInfoStruct = await profileDomainManagerDelegateProxy.profileDomainGetInfo(profileTestId, aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.adminId).to.be.equal(aclTypeTestId);
        expect(domainInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(domainInfo.realmLimit).to.be.equal(2);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile grant user1 to aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            members: [userId1]
          },
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
      })


      // realm manager tests
      it("Should profile register aclRealmTest to aclDomainTestId success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [profileMemberManagerTest.address,  profileTestMemberIface.getSighash("profileMemberRegisterTest")]));
        aclRealmTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_TEST_NAME));
        const requests: IProfileRealmManagement.ProfileRealmRegisterRequestStruct[] = [
          {
            domainId: aclDomainTestId,
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            contextLimit: 1,
            name: ACL_REALM_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          userWallet1.address,
          aclManagerProxy.address,
          userWallet1,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: userWallet1.address,
          expiredAt: expiredAt,
          signature: signature
        }


        // when
        await expect(profileRealmManagerDelegateProxy.connect(livelyAdmin).profileRealmRegister(profileMemberSignature, requests)).
        to.emit(profileRealmManagerDelegateProxy, "ProfileRealmRegistered")
          .withArgs(userWallet1.address, profileTestId, aclRealmTestId , aclDomainTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckId(profileTestId, aclRealmTestId)).to.be.true

        // and
        const realmInfo: IProfileRealmManagement.ProfileRealmInfoStruct = await profileRealmManagerDelegateProxy.profileRealmGetInfo(profileTestId, aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(aclDomainTestId);
        expect(realmInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(realmInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(realmInfo.contextLimit).to.be.equal(1);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckId(profileTestId, aclRealmTestId)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckName(profileTestId, ACL_REALM_TEST_NAME)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckAdmin(profileTestId, aclRealmTestId, profileAdminWallet.address)).to.be.true;
        expect(await profileRealmManagerDelegateProxy.profileRealmHasFunction(profileTestId, aclRealmTestId, memberRegisterFunctionId)).to.be.false;
        expect(await profileRealmManagerDelegateProxy.profileRealmHasContext(profileTestId, aclRealmTestId, ethers.utils.keccak256(profileMemberManagerTest.address))).to.be.false;

        //
        const contexts = await profileRealmManagerDelegateProxy.profileRealmGetContexts(profileTestId, profileRealmTestId);
        expect(contexts.length).to.be.equal(3);
      })

      it("Should profile disable of aclRealmTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclRealmTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRealmTestId, AlterabilityStatus.DISABLED)
      })

      it("Should profile update admin of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclRealmTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateAdmin(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update contextLimit of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IProfileRealmManagement.ProfileRealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 1
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateContextLimit(emptyProfileMemberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of aclRealmTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateAlterabilityRequestStruct[] = [{
          entityId: aclRealmTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateAlterabilityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRealmTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of aclRealmTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRealmTestId, ActivityStatus.DISABLED)

        // and
        const realmInfo: IProfileRealmManagement.ProfileRealmInfoStruct = await profileRealmManagerDelegateProxy.profileRealmGetInfo(profileTestId, aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(aclDomainTestId);
        expect(realmInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(realmInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(realmInfo.contextLimit).to.be.equal(1);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile enable activity of aclRealmTest success", async() => {
        // given
        const requests: IProfileACLCommonsRoles.ProfileUpdateActivityRequestStruct[] = [{
          entityId: aclRealmTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateActivityStatus(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRealmTestId, ActivityStatus.ENABLED)
      })

      it("Should profile update admin of aclRealmTest success", async() => {
        // given
        const updateAdminRequests: IProfileACLCommonsRoles.ProfileUpdateAdminRequestStruct[] = [{
          entityId: aclRealmTestId,
          adminId: aclTypeTestId
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(profileAdmin).profileRealmUpdateAdmin(emptyProfileMemberSignature, updateAdminRequests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, aclRealmTestId, aclTypeTestId);

        // then
        expect(await profileRealmManagerDelegateProxy.profileRealmCheckAdmin(profileTestId, aclRealmTestId, userWallet1.address)).to.be.true;
      })

      it("Should profile update contextLimit of aclRealmTest success", async() => {
        // given
        const requests: IProfileRealmManagement.ProfileRealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 5
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(user1).profileRealmUpdateContextLimit(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmContextLimitUpdated")
          .withArgs(userWallet1.address, profileTestId, aclRealmTestId, 5);

        // and
        const realmInfo: IProfileRealmManagement.ProfileRealmInfoStruct = await profileRealmManagerDelegateProxy.profileRealmGetInfo(profileTestId, aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(aclDomainTestId);
        expect(realmInfo.adminId).to.be.equal(aclTypeTestId);
        expect(realmInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(realmInfo.contextLimit).to.be.equal(5);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile move realm from aclDomainTestId to profileDomainTestId success", async() => {
        // given
        const requests: IProfileDomainManagement.ProfileDomainMoveRealmRequestStruct[] = [{
          domainId: aclDomainTestId,
          targetDomainId: profileDomainTestId,
          realmId: aclRealmTestId
        }]

        // when
        await expect(profileDomainManagerDelegateProxy.connect(user1).profileDomainMoveRealm(emptyProfileMemberSignature, requests))
          .to.emit(profileDomainManagerDelegateProxy, "ProfileDomainRealmMoved")
          .withArgs(userWallet1.address, profileTestId, aclDomainTestId, aclRealmTestId, profileDomainTestId);

        expect(await profileDomainManagerDelegateProxy.profileDomainHasRealm(profileTestId, profileDomainTestId, aclRealmTestId)).to.be.true;
        expect(await profileDomainManagerDelegateProxy.profileDomainHasRealm(profileTestId, aclDomainTestId, aclRealmTestId)).to.be.false;

        // and
        const realmInfo: IProfileRealmManagement.ProfileRealmInfoStruct = await profileRealmManagerDelegateProxy.profileRealmGetInfo(profileTestId, aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(profileDomainTestId);
        expect(realmInfo.adminId).to.be.equal(aclTypeTestId);
        expect(realmInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(realmInfo.contextLimit).to.be.equal(5);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should profile move context from ACLRealm to ACL aclRealmTestId success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(profileMemberManagerTest.address);
        const requests: IProfileRealmManagement.ProfileRealmMoveContextRequestStruct[] = [{
          realmId: profileRealmTestId,
          targetRealmId: aclRealmTestId,
          contextId: memberContextId
        }]

        // when
        await expect(profileRealmManagerDelegateProxy.connect(user1).profileRealmMoveContext(emptyProfileMemberSignature, requests))
          .to.emit(profileRealmManagerDelegateProxy, "ProfileRealmContextMoved")
          .withArgs(userWallet1.address, profileTestId, profileRealmTestId, memberContextId, aclRealmTestId);

        expect(await profileRealmManagerDelegateProxy.profileRealmHasContext(profileTestId, profileRealmTestId, memberContextId)).to.be.false;
        expect(await profileRealmManagerDelegateProxy.profileRealmHasContext(profileTestId, aclRealmTestId, memberContextId)).to.be.true;

        // and
        const memberContextInfo: IProfileContextManagement.ProfileContextInfoStruct = await profileContextManagerDelegateProxy.profileContextGetInfo(profileTestId, memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberContextInfo.contractId).to.be.equal(profileMemberManagerTest.address);
        expect(memberContextInfo.realmId).to.be.equal(aclRealmTestId);
        expect(memberContextInfo.functionLimit).to.be.equal(25);
        expect(memberContextInfo.functionCount).to.be.equal(1);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      // universe manager tests
      it("Should profile disable alterability of universe scope success", async() => {
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin2).profileUniverseUpdateAlterabilityStatus(profileMemberSignature, AlterabilityStatus.DISABLED))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, AlterabilityStatus.DISABLED);
      })

      it("Should profile update admin of universe scope when alterability disabled failed", async() => {

        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin).profileUniverseUpdateAdmin(emptyProfileMemberSignature, aclRoleTestId))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update activity of universe scope when alterability disabled failed", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin).profileUniverseUpdateActivityStatus(emptyProfileMemberSignature, ActivityStatus.DISABLED))
          .revertedWith("Illegal Updatable")
      })

      it("Should profile update alterability of universe scope success", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin).profileUniverseUpdateAlterabilityStatus(emptyProfileMemberSignature, AlterabilityStatus.UPDATABLE))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseAlterabilityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, AlterabilityStatus.UPDATABLE)
      })

      it("Should profile disable activity of universe scope success", async() => {
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateProfileMemberSignatureManually(
          PROFILE_TEST_NAME,
          profileAdminWallet.address,
          aclManagerProxy.address,
          profileAdminWallet,
          networkChainId,
          expiredAt
        );
        const profileMemberSignature: IProfileACLCommons.ProfileMemberSignatureStruct = {
          profileName: PROFILE_TEST_NAME,
          account: profileAdminWallet.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin2).profileUniverseUpdateActivityStatus(profileMemberSignature, ActivityStatus.DISABLED))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, ActivityStatus.DISABLED)

        // and
        const universeInfo: IProfileUniverseManagement.ProfileUniverseInfoStruct = await profileUniverseManagerDelegateProxy.profileUniverseGetInfo(profileTestId);
        expect(universeInfo.id).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(universeInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID);
        expect(universeInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(universeInfo.domainLimit).to.be.equal(10);
        expect(universeInfo.domainCount).to.be.equal(2);
        expect(universeInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(universeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(universeInfo.stype).to.be.equal(ScopeType.UNIVERSE);
        expect(universeInfo.referredByAgent).to.be.equal(7);
      })

      it("Should profile call profileMemberRegisterTest when universe disable failed", async() => {

        // when and then
        await expect(profileMemberManagerTest.connect(user1).profileMemberRegisterTest(profileTestId))
          .revertedWith("ProfileACLUniverseActivityForbidden()")
      })

      it("Should profile enable activity of universe scope success", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin).profileUniverseUpdateActivityStatus(emptyProfileMemberSignature, ActivityStatus.ENABLED))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseActivityUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, ActivityStatus.ENABLED)
      })

      it("Should profile register aclRoleUniverseAdminTest in LivelyMaster type success", async() => {
        // given
        aclRoleUniverseAdminTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME));
        const roleRegisterRequests: IProfileRoleManagement.ProfileRoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID,
            typeId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
            memberLimit: 2,
            name: ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME
          }
        ]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRegister(emptyProfileMemberSignature, roleRegisterRequests)).
        to.emit(profileRoleManagerDelegateProxy, "ProfileRoleRegistered")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleUniverseAdminTestId, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
            LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID)

      })

      it("Should profile grant user3 to aclRoleUniverseAdminTest role success", async() => {
        // given
        const userId3 = ethers.utils.keccak256(userWallet3.address)
        const requests: IProfileRoleManagement.ProfileRoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleUniverseAdminTestId,
          members: [userId3]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleGrantMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberGranted")
          .withArgs(profileAdminWallet.address, profileTestId, aclRoleUniverseAdminTestId, userId3, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should profile update admin of universe scope to aclRoleUniverseAdminTestId success", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(profileAdmin).profileUniverseUpdateAdmin(emptyProfileMemberSignature, aclRoleUniverseAdminTestId))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseAdminUpdated")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, aclRoleUniverseAdminTestId);

        // then
        expect(await profileUniverseManagerDelegateProxy.profileUniverseCheckAdmin(profileTestId, userWallet3.address)).to.be.true;
      })

      it("Should profile update domainLimit of universe scope success", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(user3).profileUniverseUpdateDomainLimit(emptyProfileMemberSignature,5))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseDomainLimitUpdated")
          .withArgs(userWallet3.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, 5);
      })

      it("Should profile update admin of profile universe scope to PROFILE_MASTER_ADMIN success", async() => {
        // when
        await expect(profileUniverseManagerDelegateProxy.connect(user3).profileUniverseUpdateAdmin(emptyProfileMemberSignature, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID))
          .to.emit(profileUniverseManagerDelegateProxy, "ProfileUniverseAdminUpdated")
          .withArgs(userWallet3.address, profileTestId, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);

        // then
        const universeInfo: IProfileUniverseManagement.ProfileUniverseInfoStruct = await profileUniverseManagerDelegateProxy.profileUniverseGetInfo(profileTestId);
        expect(universeInfo.id).to.be.equal(LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(universeInfo.adminId).to.be.equal(LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(universeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(universeInfo.domainLimit).to.be.equal(5);
        expect(universeInfo.domainCount).to.be.equal(2);
        expect(universeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(universeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(universeInfo.stype).to.be.equal(ScopeType.UNIVERSE);
        expect(universeInfo.referredByAgent).to.be.equal(8);

        // and
        expect(await profileUniverseManagerDelegateProxy.profileUniverseCheckAdmin(profileTestId, userWallet1.address)).to.be.true;
        expect(await profileUniverseManagerDelegateProxy.profileUniverseCheckAdmin(profileTestId, userWallet2.address)).to.be.false;
        expect(await profileUniverseManagerDelegateProxy.profileUniverseGetDomains(profileTestId)).to.be.eqls([profileDomainTestId, aclDomainTestId]);

      })

      it("Should profile revoke user1 from aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IProfileRoleManagement.ProfileRoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID,
          members: [ userId1]
        }]

        // when
        await expect(profileRoleManagerDelegateProxy.connect(profileAdmin).profileRoleRevokeMembers(emptyProfileMemberSignature, requests))
          .to.emit(profileRoleManagerDelegateProxy, "ProfileRoleMemberRevoked")
          .withArgs(profileAdminWallet.address, profileTestId, LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID, userId1, LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID)

        // and
        expect(await profileUniverseManagerDelegateProxy.profileUniverseCheckAdmin(profileTestId, userWallet1.address)).to.be.false;
      })
    })

  });
