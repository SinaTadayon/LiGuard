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
  IDomainManagement, IDomainManagementTest,
  IFunctionManagement,
  IUniverseManagement,
  IMemberManagement,
  IPolicyManagement,
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
  ProfileAccessControl, ProfileAccessControl__factory,
  ProfileContextManager,
  ProfileContextManager__factory,
  ProfileDomainManager, ProfileDomainManager__factory,
  ProfileFunctionManager,
  ProfileFunctionManager__factory,
  ProfileUniverseManager, ProfileUniverseManager__factory,
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
  LIVELY_PROFILE_ANY_TYPE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
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
  LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_MEMBER_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
  PolicyType,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus,
  ScopeType, generateMemberSignatureManually, LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID
} from "./TestUtils";
import { ProxyUpgradedEventObject } from "../../typechain/types/proxy/Proxy";
import { ProxyLocalAdminUpdatedEventObject } from "../../typechain/types/proxy/IProxy";
import {IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import {IACLCommons} from "../../typechain/types/acl/scope/FunctionManager";
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

import { MemberManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/MemberManager__factory";
import { TypeManagerLibraryAddresses } from "../../typechain/types/factories/acl/agent/TypeManager__factory";
import { FunctionManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/FunctionManager__factory";
import { ContextManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/ContextManager__factory";
import { DomainManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/DomainManager__factory";
import { RealmManagerLibraryAddresses } from "../../typechain/types/factories/acl/scope/RealmManager__factory";
import {
  UniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/scope/UniverseManger.sol/UniverseManager__factory";
import {
  ProfileTypeManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/agent/ProfileTypeManager__factory";
import {
  ProfileUniverseManagerLibraryAddresses
} from "../../typechain/types/factories/acl/profile/scope/ProfileUniverseManger.sol/ProfileUniverseManager__factory";
import { PromiseOrValue } from "../../typechain/types/common";
import { address } from "hardhat/internal/core/config/config-validation";
// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)
const { provider, deployMockContract } = waffle;

describe("Lively Guard Tests", function() {
    let livelyAdmin: Signer;
    let systemAdmin: Signer;
    let aclAdmin: Signer;
    let user1: Signer;
    let user2: Signer;
    let user3: Signer;
    let livelyAdminWallet: Wallet;
    let systemAdminWallet: Wallet;
    let aclAdminWallet: Wallet;
    let userWallet1: Wallet;
    let userWallet2: Wallet;
    let userWallet3: Wallet;
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
    let aclDomainTest2Id: string;
    let aclRealmTestId: string;
    const ACL_ROLE_TEST_NAME = "ACL_ROLE_TEST";
    const ACL_ROLE_TEST_NAME_2 = "ACL_ROLE_TEST_2";
    const ACL_ROLE_TEST_NAME_3 = "ACL_ROLE_TEST_3";
    const ACL_ROLE_TEST_NAME_4 = "ACL_ROLE_TEST_4";
    const ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME = "ACL_ROLE_UNIVERSE_ADMIN_TEST";
    const ACL_TYPE_TEST_NAME = "ACL_TYPE_TEST";
    const ACL_POLICY_TEST_NAME = "ACL_POLICY_TEST";
    const ACL_DOMAIN_TEST_NAME = "ACL_DOMAIN_TEST";
    const ACL_DOMAIN_TEST_NAME_2 = "ACL_DOMAIN_TEST_2";
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


    const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
    let domainManagerSubjectTest: DomainManagerTest;
    let domainManagerProxyTest: DomainManagerTest;
    let domainManagerDelegateProxyTest: DomainManagerTest;
    let linkLibraryAddressesTest: ACLManagerTestLibraryAddresses;

    this.beforeAll(async () => {
      [livelyAdmin, systemAdmin, aclAdmin, user1, user2, user3] = await ethers.getSigners();
      [livelyAdminWallet, systemAdminWallet, aclAdminWallet, userWallet1, userWallet2, userWallet3] = waffle.provider.getWallets();
      networkChainId = await provider.send("eth_chainId", []);

      // console.log(`lively admin address: ${livelyAdminWallet.address}`);
      // console.log(`system admin address: ${systemAdminWallet.address}`);
      // console.log(`acl admin address: ${aclAdminWallet.address}`);
      // console.log(`user1 address: ${userWallet1.address}`);
      // console.log(`user2 address: ${userWallet2.address}`);
      // console.log(`user3 address: ${userWallet3.address}`);
      // adminAddress = await livelyAdmin.getAddress();
      // let userAddress1 = userWallet1.address;
      // userAddress2 = await user2.getAddress();
      // console.log(`livelyAdmin address: ${adminAddress}`);
    });

    describe("Libraries Deployments Test", function() {
      it("Should LACLCommons deploy success", async () => {
        // given
        const aclFactory = new LACLCommons__factory(systemAdmin);

        // when
        lACLCommons = await aclFactory.deploy();

        // then
        expect(lACLCommons.address).not.null;
        expect(await lACLCommons.LIB_NAME()).to.be.equal("LACLCommons");
        expect(await lACLCommons.LIB_VERSION()).to.be.equal("3.0.0");
      });

      it("Should LProfileCommons deploy success", async () => {
        // given
        const aclFactory = new LProfileCommons__factory(systemAdmin);

        // when
        lProfileCommons = await aclFactory.deploy();

        // then
        expect(lProfileCommons.address).not.null;
        expect(await lProfileCommons.LIB_NAME()).to.be.equal("LProfileCommons");
        expect(await lProfileCommons.LIB_VERSION()).to.be.equal("3.0.0");
      });

      it("Should LProfileRolePolicy deploy success", async () => {
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

      it("Should MemberManager subject deploy success", async() => {
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

      it("Should RoleManager subject deploy success", async() => {
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

      it("Should TypeManager subject deploy success", async() => {
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

      it("Should FunctionManager subject deploy success", async() => {
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

      it("Should ContextManager subject deploy success", async() => {
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

      it("Should RealmManager subject deploy success", async() => {
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

      it("Should DomainManager subject deploy success", async() => {
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

      it("Should UniverseManager subject deploy success", async() => {
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

      it("Should PolicyManager subject deploy success", async() => {
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

      it("Should ProfileManager subject deploy success", async() => {
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

      it("Should AccessControl subject deploy success", async() => {
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

      it("Should ProfileMemberManager subject deploy success", async() => {
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

      it("Should ProfileRoleManager subject deploy success", async() => {
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

      it("Should ProfileTypeManager subject deploy success", async() => {
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

      it("Should ProfileFunctionManager subject deploy success", async() => {
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

      it("Should ProfileContextManager subject deploy success", async() => {
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

      it("Should ProfileRealmManager subject deploy success", async() => {
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

      it("Should ProfileDomainManager subject deploy success", async() => {
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

      it("Should ProfileUniverseManager subject deploy success", async() => {
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

      it("Should ProfilePolicyManager subject deploy success", async() => {
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

      it("Should ProfileAccessControl subject deploy success", async() => {
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
      it("Should ACLManager subject deploy success", async () => {
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

      it("Should initialize raise exception", async () => {
        // when and then
        await expect(
          aclManagerSubject
            .connect(systemAdmin)
            .initialize(
              "ACLManager",
              "3.0.0",
            )
        ).to.be.revertedWith("Illegal Call");
      });

      it("Should setSafeModeStatus raise exception", async () => {
        // when and then
        await expect(aclManagerSubject.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED)).to.be.revertedWith(
          "Illegal Call"
        );
      });

      it("Should setUpgradeState raise exception", async () => {
        // when and then
        await expect(aclManagerSubject.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.be.revertedWith(
          "Illegal Call"
        );
      });

      it("Should setLocalAdmin raise exception", async () => {
        // given
        const address = await user1.getAddress();

        // when and then
        await expect(aclManagerSubject.connect(systemAdmin).setLocalAdmin(address)).to.be.revertedWith(
          "Illegal Call"
        );
      });

      it("Should setAccessControlManager raise exception", async () => {
        // given
        const address = await user1.getAddress();

        // when and then
        await expect(aclManagerSubject.connect(systemAdmin).setAccessControlManager(address)).to.be.revertedWith(
          "Illegal Call"
        );
      });

      it("Should upgradeTo raise exception", async () => {
        // given
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerSubject.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        ).to.be.revertedWith("Illegal Call");
      });

      it("Should return slot storage of subject", async () => {
        // when and then
        expect(await aclManagerSubject.proxiableUUID()).to.be.hexEqual(
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
        );
      });
    });

    describe("ACL Manager Proxy (UUPS Proxy Implementation) Tests", function() {
      it("Should deploy proxy with invalid subject failed", async () => {
        // given
        const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
        const invalidUUPS = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
        await invalidUUPS.mock.proxiableUUID.returns(
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0"
        );
        const proxyFactory = new Proxy__factory(systemAdmin);
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(proxyFactory.connect(systemAdmin).deploy(invalidUUPS.address, typedArray1)).to.revertedWith(
          "Invalid UUPS"
        );
      });

      it("Should deploy proxy illegal subject failed", async () => {
        // given
        const iBaseProxy = await deployments.getArtifact("IBaseProxy");
        const illegalUUPS = await deployMockContract(systemAdmin, iBaseProxy.abi);
        const proxyFactory = new Proxy__factory(systemAdmin);
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(proxyFactory.connect(systemAdmin).deploy(illegalUUPS.address, typedArray1)).to.revertedWith(
          "Illegal UUPS"
        );
      });

      it("Should deploy proxy success without initialize (typechain)", async () => {
        // given
        // const aclManagerSubjectFactory = new ACLManager__factory(linkAclLibraryAddresses, systemAdmin);
        const proxyFactory = new ACLManagerProxy__factory(systemAdmin);
        // aclManagerSubject = await aclManagerSubjectFactory.deploy();

        // when
        const proxy = await proxyFactory.deploy(aclManagerSubject.address, new Int8Array(0));

        // then
        expect(proxy.address).to.be.not.null;
        aclManagerProxy = aclManagerSubject.attach(proxy.address);

        // and
        expect(await aclManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await aclManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await aclManagerProxy.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await aclManagerProxy.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await aclManagerProxy.initVersion()).to.be.equal(0);
      });

      it("Should enable SafeMode of proxy by systemAdmin failed when not initialized", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.ENABLED)).to.revertedWith(
          "NOT INIT"
        );
      });

      it("Should enable UpgradeState of proxy by systemAdmin failed when not initialized", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.revertedWith(
          "Rejected"
        );
      });

      it("Should setLocalAdmin of proxy by systemAdmin failed when not initialized", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setLocalAdmin(userWallet1.address)).to.revertedWith(
          "Rejected"
        );
      });

      it("Should upgrade proxy by systemAdmin failed when not initialized", async () => {
        // given
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        ).to.revertedWith("Rejected");
      });

      it("Should setAccessControlManager proxy by systemAdmin failed when not initialized", async () => {
        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).setAccessControlManager(aclManagerSubject.address)
        ).to.revertedWith("Rejected");
      });

      it("Should deploy and initialize proxy success (etherjs)", async () => {
        // given
        const aclManagerFactory = await ethers.getContractFactory("ACLManager", {
          libraries: {
            LACLCommons: lACLCommons.address,
          }
        });
        const aclManagerSubject = await aclManagerFactory.connect(systemAdmin).deploy();
        const aclManagerArtifact = await deployments.getArtifact("ACLManager");
        const iface = new ethers.utils.Interface(aclManagerArtifact.abi);
        const data = iface.encodeFunctionData("initialize", [
          ACL_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
        ]);

        // when
        const proxyFactory = await ethers.getContractFactory("ACLManagerProxy");
        const proxy = await proxyFactory.connect(systemAdmin).deploy(aclManagerSubject.address, data);

        // then
        expect(proxy.address).to.be.not.null;
        const aclManager = aclManagerFactory.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          ACL_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManager.address,
          networkChainId
        );

        // and
        expect(await aclManager.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await aclManager.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await aclManager.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await aclManager.contractName()).to.be.equal(ACL_MANAGER_CONTRACT_NAME);
        expect(await aclManager.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await aclManager.subjectAddress()).to.be.hexEqual(aclManagerSubject.address);
        expect(await aclManager.accessControlManager()).to.be.hexEqual(aclManager.address);
        expect(await aclManager.initVersion()).to.be.equal(1);
        expect(await aclManager.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await aclManager.getLibrary()).to.be.equal(lACLCommons.address);
      });

      it("Should proxy raised events when deployment and initialization were successful", async () => {
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

      it("Should call proxyableUUID from proxy failed", async () => {
        // when and then
        await expect(aclManagerProxy.proxiableUUID()).to.be.revertedWith("Illegal Call");
      });

      it("Should upgrade proxy reverted", async () => {
        // given
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        ).to.be.revertedWith("Illegal Updatable");
      });

      it("Should enable Upgrade Status of proxy by user1 failed", async () => {
        // when and then
        await expect(aclManagerProxy.connect(user1).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).revertedWith("");

      });

    });

    describe("ACL Modules Proxies Tests", function() {
      it("Should deploy proxy MemberManager with invalid acl failed", async () => {
        // given
        const proxyFactory = new Proxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(MemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          ethers.constants.AddressZero,
        ]);

        // when
        await expect(proxyFactory.deploy(memberManagerSubject.address, data))
          .revertedWith("Illegal Contract");
      });

      it("Should deploy proxy MemberManager with illegal acl failed", async () => {
        // given
        const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
        const invalidUUPS = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
        await invalidUUPS.mock.supportsInterface.returns(false);
        const proxyFactory = new Proxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(MemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          invalidUUPS.address,
        ]);

        // when
        await expect(proxyFactory.deploy(memberManagerSubject.address, data))
          .revertedWith("Illegal ACL");
      });

      it("Should MemberManager proxy deploy success", async () => {
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
      });

      it("Should RoleManager proxy deploy success", async () => {
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
      });

      it("Should TypeManager proxy deploy success", async () => {
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
      });

      it("Should FunctionManager proxy deploy success", async () => {
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
      });

      it("Should ContextManager proxy deploy success", async () => {
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
      });

      it("Should RealmManager proxy deploy success", async () => {
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
      });

      it("Should DomainManager proxy deploy success", async () => {
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
      });

      it("Should UniverseManager proxy deploy success", async () => {
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
      });

      it("Should PolicyManager proxy deploy success", async () => {
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
      });

      it("Should ProfileManager proxy deploy success", async () => {
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
      });

      it("Should AccessControl proxy deploy success", async () => {
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
      it("Should deploy proxy ProfileMemberManager with invalid acl failed", async () => {
        // given
        const proxyFactory = new Proxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          ethers.constants.AddressZero,
        ]);

        // when
        await expect(proxyFactory.deploy(profileMemberManagerSubject.address, data))
          .revertedWith("Illegal Contract");
      });

      it("Should deploy proxy ProfileMemberManager with illegal acl failed", async () => {
        // given
        const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
        const invalidUUPS = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
        await invalidUUPS.mock.supportsInterface.returns(false);
        const proxyFactory = new Proxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          invalidUUPS.address,
        ]);

        // when
        await expect(proxyFactory.deploy(profileMemberManagerSubject.address, data))
          .revertedWith("Illegal ACL");
      });

      it("Should ProfileMemberManager proxy deploy success", async () => {
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
      });

      it("Should ProfileRoleManager proxy deploy success", async () => {
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
      });

      it("Should ProfileTypeManager proxy deploy success", async () => {
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
      });

      it("Should ProfileFunctionManager proxy deploy success", async () => {
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
      });

      it("Should ProfileContextManager proxy deploy success", async () => {
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
      });

      it("Should ProfileRealmManager proxy deploy success", async () => {
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
      });

      it("Should ProfileDomainManager proxy deploy success", async () => {
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
      });

      it("Should ProfileUniverseManager proxy deploy success", async () => {
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
      });

      it("Should ProfilePolicyManager proxy deploy success", async () => {
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
      });

      it("Should ProfileAccessControl proxy deploy success", async () => {
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
      it("Should call aclInit of ACLManager with anyone failed", async() => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).initACL(
          contextManagerProxy.address,
          functionManagerProxy.address,
          livelyAdminWallet.address,
          systemAdminWallet.address
        )).revertedWith("Access Denied");
      })

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
            LIVELY_PROFILE_ANY_TYPE_ID)
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
            LIVELY_PROFILE_ANY_TYPE_ID)
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
            LIVELY_PROFILE_ANY_TYPE_ID)
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
            LIVELY_PROFILE_ANY_TYPE_ID)
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
            LIVELY_PROFILE_ANY_TYPE_ID)
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

    describe("ACLManager proxy base function Tests", function() {
      it("Should ACL invariants check success", async() => {
        // Lively Master
        const livelyAdminRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyAdminRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyAdminRoleInfo.typeId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(livelyAdminRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyAdminRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyAdminRoleInfo.memberCount).to.be.equal(1);
        expect(livelyAdminRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyAdminRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyAdminRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyAdminRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyAdminRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN");

        // Lively System Master
        const livelySystemRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(livelySystemRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelySystemRoleInfo.typeId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
        expect(livelySystemRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelySystemRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelySystemRoleInfo.memberCount).to.be.equal(1);
        expect(livelySystemRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelySystemRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelySystemRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelySystemRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelySystemRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN");

        // Lively Scope Master
        const livelyScopeRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
        expect(livelyScopeRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyScopeRoleInfo.typeId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(livelyScopeRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyScopeRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyScopeRoleInfo.memberCount).to.be.equal(1);
        expect(livelyScopeRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyScopeRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyScopeRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyScopeRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyScopeRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN");

        // Lively Member Master
        const livelyMemberRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID);
        expect(livelyMemberRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyMemberRoleInfo.typeId).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(livelyMemberRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyMemberRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyMemberRoleInfo.memberCount).to.be.equal(1);
        expect(livelyMemberRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyMemberRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyMemberRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyMemberRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyMemberRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN");

        // Lively Type Master
        const livelyTypeRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID);
        expect(livelyTypeRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyTypeRoleInfo.typeId).to.be.equal(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
        expect(livelyTypeRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyTypeRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyTypeRoleInfo.memberCount).to.be.equal(1);
        expect(livelyTypeRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyTypeRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyTypeRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyTypeRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyTypeRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN");

        // Lively Policy Master
        const livelyPolicyRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
        expect(livelyPolicyRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyPolicyRoleInfo.typeId).to.be.equal(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
        expect(livelyPolicyRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyPolicyRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyPolicyRoleInfo.memberCount).to.be.equal(1);
        expect(livelyPolicyRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyPolicyRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyPolicyRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyPolicyRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyPolicyRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN");

        // Lively Guard ACL Master Role
        const livelyGuardRoleInfo = await roleManagerDelegateProxy.roleGetInfo(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(livelyGuardRoleInfo.scopeId).to.be.equal(LIVELY_VERSE_ACL_DOMAIN_ID);
        expect(livelyGuardRoleInfo.typeId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(livelyGuardRoleInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(livelyGuardRoleInfo.memberLimit).to.be.equal(16777215);
        expect(livelyGuardRoleInfo.memberCount).to.be.equal(1);
        expect(livelyGuardRoleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(livelyGuardRoleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(livelyGuardRoleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyGuardRoleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(livelyGuardRoleInfo.name).to.be.equal("ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN");

        // Lively Guard ACL Domain
        const livelyGuardDomainInfo = await domainManagerDelegateProxy.domainGetInfo(LIVELY_VERSE_ACL_DOMAIN_ID);
        expect(livelyGuardDomainInfo.name).to.be.equal("DOMAIN.LIVELY_VERSE.LIVELY_GUARD");
        expect(livelyGuardDomainInfo.universeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(livelyGuardDomainInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(livelyGuardDomainInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(livelyGuardDomainInfo.realmLimit).to.be.equal(3);
        expect(livelyGuardDomainInfo.realmCount).to.be.equal(1);
        expect(livelyGuardDomainInfo.referredByAgent).to.be.equal(2);
        expect(livelyGuardDomainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(livelyGuardDomainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyGuardDomainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // Lively Guard ACL Realm
        const livelyGuardRealmInfo = await realmManagerDelegateProxy.realmGetInfo(LIVELY_VERSE_ACL_REALM_ID);
        expect(livelyGuardRealmInfo.name).to.be.equal("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL");
        expect(livelyGuardRealmInfo.domainId).to.be.equal(LIVELY_VERSE_ACL_DOMAIN_ID);
        expect(livelyGuardRealmInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(livelyGuardRealmInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(livelyGuardRealmInfo.contextLimit).to.be.equal(128);
        expect(livelyGuardRealmInfo.contextCount).to.be.equal(22);
        expect(livelyGuardRealmInfo.referredByAgent).to.be.equal(0);
        expect(livelyGuardRealmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(livelyGuardRealmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(livelyGuardRealmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should enable Upgrade Status of proxy by systemAdmin failed", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.revertedWith("Forbidden");
      });

      it("Should enable Upgrade Status of proxy by livelyAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(
            livelyAdminWallet.address,
            aclManagerProxy.address,
            ProxyUpdatabilityStatus.ENABLED
          );
      });

      it("Should upgrade proxy with same subjects failed", async () => {
        // given
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        ).to.be.revertedWith("Illegal");
      });

      it("Should upgrade proxy with EOA account failed", async () => {
        // given
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(userWallet1.address, typedArray1, false)
        ).to.be.revertedWith("Illegal Contract");
      });

      it("Should upgrade proxy by common user1 failed", async () => {
        // given
        const aclManagerSubjectFactory = new ACLManager__factory(<ACLManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
        const aclManagerSubject1 = await aclManagerSubjectFactory.deploy();
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(user1).upgradeTo(aclManagerSubject1.address, typedArray1, false)
        ).to.revertedWith("Forbidden");
      });

      it("Should upgrade proxy by systemAdmin with Illegal uups subject failed", async () => {
        // given
        const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
        const invalidUUPS = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
        await invalidUUPS.mock.proxiableUUID.returns(
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0"
        );
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(invalidUUPS.address, typedArray1, false)
        ).to.revertedWith("Illegal UUPS");
      });

      it("Should upgrade proxy by livelyAdmin with Illegal proxy subject failed", async () => {
        // given
        const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
        const invalidProxy = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
        await invalidProxy.mock.proxiableUUID.returns(
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
        );
        await invalidProxy.mock.supportsInterface.returns(false);
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(invalidProxy.address, typedArray1, false)
        ).to.revertedWith("Illegal IProxy");
      });

      it("Should upgrade proxy by livelyAdmin success", async () => {
        // given
        const aclManagerSubjectFactory = new ACLManager__factory(<ACLManagerLibraryAddresses>linkCommonLibraryAddresses, systemAdmin);
        aclManagerSubject = await aclManagerSubjectFactory.deploy();
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        )
          .to.emit(aclManagerProxy, "ProxyUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerSubject.address);

        expect(await aclManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
      });

      it("Should setAdmin proxy to new account success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setLocalAdmin(userWallet1.address))
          .to.emit(aclManagerProxy, "ProxyLocalAdminUpdated")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, userWallet1.address);
      });

      it("Should init proxy call by new systemAdmin failed", async () => {
        // when and then
        await expect(
          aclManagerProxy
            .connect(user1)
            .initialize(ACL_MANAGER_CONTRACT_NAME, CONTRACTS_VERSION)
        ).to.revertedWith("Contract Already Initialized");
      });

      it("Should enable SafeMode proxy by user1 failed", async () => {
        // when and then
        await expect(aclManagerProxy.connect(user1).setSafeModeStatus(ProxySafeModeStatus.ENABLED)).to.revertedWith("Forbidden");
      });

      it("Should enable SafeMode proxy by livelyAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setSafeModeStatus(ProxySafeModeStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxySafeModeUpdated")
          .withArgs(
            livelyAdminWallet.address,
            aclManagerProxy.address,
            ProxySafeModeStatus.ENABLED
          );
      });

      it("Should register ACL_TYPE_TEST failed (in safe mode)", async() => {
        // given
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
            roleLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_TYPE_TEST_NAME,
          }
        ]

        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(memberSignature, typeRegisterRequests))
          .to.revertedWith("Rejected");
      })

      it("Should setAdmin proxy failed (in safeMode)", async () => {

        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setLocalAdmin(userWallet1.address)).to.revertedWith(
          "Rejected"
        );
      });

      it("Should set AccessControlManager proxy failed (in safeMode)", async () => {

        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setAccessControlManager(userWallet1.address)).to.revertedWith(
          "Rejected"
        );
      });

      it("Should withdrawBalance proxy failed (in safeMode)", async () => {

        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).withdrawBalance(userWallet1.address)).to.revertedWith(
          "Rejected"
        );
      });

      it("Should disable SafeMode of proxy by livelyAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED))
          .to.emit(aclManagerProxy, "ProxySafeModeUpdated")
          .withArgs(
            livelyAdminWallet.address,
            aclManagerProxy.address,
            ProxySafeModeStatus.DISABLED
          );
      });

      it("Should setAccessControlManager with invalid acl failed", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setAccessControlManager(userWallet1.address))
          .to.be.revertedWith("Illegal Contract")
      });

      it("Should setAccessControlManager with valid acl success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setAccessControlManager(aclManagerProxy.address))
          .to.emit(aclManagerProxy, "ProxyAccessControlUpdated")
          .withArgs(livelyAdminWallet.address, aclManagerProxy.address, aclManagerProxy.address)

        // and
        expect(await aclManagerProxy.accessControlManager()).to.be.equal(aclManagerProxy.address);
      });
    })

    describe("Agent Tests", function() {

      it("Should register test type with expired memberSignature failed", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));

        const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: realmContextId,
            roleLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: "TestType",
          }
        ]

        const expiredAt = BigNumber.from(0);
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
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeRegister(memberSignature, typeRegisterRequests))
          .to.revertedWith("Expired Signature");
      })

      it("Should register test type with memberSignature success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        const typeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TestType"));

        const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: realmContextId,
            roleLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: "TestType",
          }
        ]

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
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeRegister(memberSignature, typeRegisterRequests)).
        to.emit(typeManagerDelegateProxy, "TypeRegistered")
          .withArgs(livelyAdminWallet.address, typeTestId, realmContextId,
            LIVELY_VERSE_ACL_ADMIN_ROLE_ID)

        // then
        expect(await typeManagerDelegateProxy.typeCheckId(typeTestId)).to.be.true

        // and
        const typeInfo: ITypeManagement.TypeInfoStruct = await typeManagerDelegateProxy.typeGetInfo(typeTestId);
        expect(typeInfo.name).to.be.equal("TestType");
        expect(typeInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(realmContextId);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should register ACL_TYPE_TEST success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));

        const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: realmContextId,
            roleLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_TYPE_TEST_NAME,
          }
        ]

        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(memberSignature, typeRegisterRequests)).
        to.emit(typeManagerDelegateProxy, "TypeRegistered")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, realmContextId,
            LIVELY_VERSE_ACL_ADMIN_ROLE_ID)

        // then
        expect(await typeManagerDelegateProxy.typeCheckId(aclTypeTestId)).to.be.true

        // and
        const typeInfo: ITypeManagement.TypeInfoStruct = await typeManagerDelegateProxy.typeGetInfo(aclTypeTestId);
        expect(typeInfo.name).to.be.equal(ACL_TYPE_TEST_NAME);
        expect(typeInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(realmContextId);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await typeManagerDelegateProxy.typeCheckId(aclTypeTestId)).to.be.true;
        expect(await typeManagerDelegateProxy.typeCheckName(ACL_TYPE_TEST_NAME)).to.be.true;
        expect(await typeManagerDelegateProxy.typeCheckAdmin(aclTypeTestId, livelyAdminWallet.address)).to.be.true;
      })

      it("Should disable type alterability of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclTypeTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, AlterabilityStatus.DISABLED)
      })

      it("Should update admin of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(memberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateRoleLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update scope of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclTypeTestId,
            scopeId: memberRegisterFunctionId
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update type alterability of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclTypeTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of ACL_TYPE_TEST by anonymous failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(user1).typeUpdateActivityStatus(memberSignature, requests))
          .revertedWith("ACLMemberNotFound()")
      })

      it("Should disable activity of ACL_TYPE_TEST by anyone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeUpdateActivityStatus(memberSignature, requests))
          .revertedWith("'AdminAccessNotPermitted()")
      })

      it("Should disable activity of ACL_TYPE_TEST success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateActivityStatus(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, ActivityStatus.DISABLED);

        // and
        const typeInfo: ITypeManagement.TypeInfoStruct = await typeManagerDelegateProxy.typeGetInfo(aclTypeTestId);
        expect(typeInfo.name).to.be.equal(ACL_TYPE_TEST_NAME);
        expect(typeInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(typeInfo.scopeId).to.be.equal(realmContextId);
        expect(typeInfo.roleLimit).to.be.equal(2);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should enable activity of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateActivityStatus(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, ActivityStatus.ENABLED);

      })

      it("Should ACL_TYPE_TEST update admin to LivelyAdmin success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await typeManagerDelegateProxy.typeCheckAdmin(aclTypeTestId,livelyAdminWallet.address)).to.be.true;
      })

      it("Should register aclRoleTest in ACL type with illegal scope failed", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_DOMAIN_ID,
            typeId: aclTypeTestId,
            memberLimit: 3,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(memberSignature, roleRegisterRequests)).
        to.revertedWith("Illegal Scope")
      })

      it("Should update scope ACL_TYPE_TEST to low scope type success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclTypeTestId,
            scopeId: memberRegisterFunctionId
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, memberRegisterFunctionId)
      })

      it("Should register aclRoleTest4 in ACL type success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        aclRoleTestId4 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_4));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: memberRegisterFunctionId,
            typeId: aclTypeTestId,
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_ROLE_TEST_NAME_4
          }
        ]
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
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests)).
        to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleTestId4, aclTypeTestId,
            LIVELY_VERSE_ACL_ADMIN_ROLE_ID, memberRegisterFunctionId)

        // then
        expect(await roleManagerDelegateProxy.roleCheckId(aclRoleTestId4)).to.be.true

        // and
        const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId4);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_4);
        expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(memberRegisterFunctionId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(2);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await roleManagerDelegateProxy.roleCheckId(aclRoleTestId4)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckName(ACL_ROLE_TEST_NAME_4)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId4, livelyAdminWallet.address)).to.be.true;
      })

      it("Should update scope ACL_TYPE_TEST failed", async() => {
        // given
        const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
        const roleRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [roleManagerProxy.address,  roleIface.getSighash("roleRegister")]));
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclTypeTestId,
            scopeId: roleRegisterFunctionId
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(memberSignature, requests))
          .to.revertedWith("Illegal Scope");
      })

      it("Should update scope ACL_TYPE_TEST success", async() => {
        // given
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclTypeTestId,
            scopeId: LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID)
      })

      it("Should ACL_TYPE_TEST update admin by anyone failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(user1).typeUpdateAdmin(memberSignature, updateAdminRequests))
          .revertedWith("ACLMemberNotFound()");
      })

      it("Should ACL_TYPE_TEST update admin success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await typeManagerDelegateProxy.typeCheckAdmin(aclTypeTestId,systemAdminWallet.address)).to.be.true;
      })

      it("Should register aclRoleTest in ACL type with illegal RegisterLimit failed", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_DOMAIN_ID,
            typeId: aclTypeTestId,
            memberLimit: 3,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests)).
        to.revertedWith("Illegal RegisterLimit")
      })

      it("Should update systemAdmin generalLimit with anyone failed", async() => {
        // given
        const systemAdminId =  ethers.utils.keccak256(systemAdminWallet.address);
        const requests: IMemberManagement.MemberUpdateGeneralLimitRequestStruct[] = [{
          memberId: systemAdminId,
          limits: {
            memberLimit: 0,
            memberRegisterLimit: 7,
            contextRegisterLimit: 128,
            functionRegisterLimit: 65535,
            profileRegisterLimit: 0,
            contextLimit: 65535,
            realmLimit: 0,
            domainLimit: 0,
            callLimit: 65535,
            typeRoleLimit: 0,
            typeLimit: 0,
            roleRegisterLimit: 7,
            typeRegisterLimit: 7,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0,
            policyRoleLimit: 0,
            functionLimit: 255,
          },
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateGeneralLimit(memberSignature, requests))
          .revertedWith("ACLMemberNotFound()");
      })

      it("Should update systemAdmin generalLimit with Illegal TypeLimit failed", async() => {
        // given
        const systemAdminId =  ethers.utils.keccak256(systemAdminWallet.address);
        const requests: IMemberManagement.MemberUpdateGeneralLimitRequestStruct[] = [{
          memberId: systemAdminId,
          limits: {
            memberLimit: 0,
            memberRegisterLimit: 7,
            contextRegisterLimit: 128,
            functionRegisterLimit: 65535,
            profileRegisterLimit: 0,
            contextLimit: 65535,
            realmLimit: 0,
            domainLimit: 0,
            callLimit: 65535,
            typeRoleLimit: 0,
            typeLimit: 0,
            roleRegisterLimit: 7,
            typeRegisterLimit: 7,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0,
            policyRoleLimit: 0,
            functionLimit: 255,
          },
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateGeneralLimit(memberSignature, requests))
          .revertedWith("Illegal TypeLimit");
      })

      it("Should update systemAdmin generalLimit success", async() => {
        // given
        const systemAdminId =  ethers.utils.keccak256(systemAdminWallet.address);
        const requests: IMemberManagement.MemberUpdateGeneralLimitRequestStruct[] = [{
          memberId: systemAdminId,
          limits: {
            memberLimit: 7,
            memberRegisterLimit: 7,
            contextRegisterLimit: 128,
            functionRegisterLimit: 65535,
            profileRegisterLimit: 0,
            contextLimit: 65535,
            realmLimit: 0,
            domainLimit: 0,
            callLimit: 65535,
            typeRoleLimit: 0,
            typeLimit: 3,
            roleRegisterLimit: 7,
            typeRegisterLimit: 7,
            realmRegisterLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0,
            policyRoleLimit: 0,
            functionLimit: 255,
          },
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateGeneralLimit(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberGeneralLimitUpdated")
          .withArgs(livelyAdminWallet.address, systemAdminId, [
             7, 7, 128, 65535, 0, 65535, 0, 0, 65535, 0, 3, 7, 7, 0, 0, 0, 0, 255
          ]);

        // then
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(systemAdminId);
        expect(memberInfo.account).to.be.equal(systemAdminWallet.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(7);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(7);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(128);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(65535);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(0);
        expect(memberInfo.limits.contextLimit).to.be.equal(65535);
        expect(memberInfo.limits.realmLimit).to.be.equal(0);
        expect(memberInfo.limits.domainLimit).to.be.equal(0);
        expect(memberInfo.limits.callLimit).to.be.equal(65535);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(0);
        expect(memberInfo.limits.typeLimit).to.be.equal(3);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(7);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(7);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(0);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(0);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(0);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(0);
        expect(memberInfo.limits.functionLimit).to.be.equal(255);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should register aclRoleTest in ACL type success", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
            typeId: aclTypeTestId,
            memberLimit: 3,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests)).
        to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(systemAdminWallet.address, aclRoleTestId, aclTypeTestId,
            LIVELY_VERSE_ACL_ADMIN_ROLE_ID, LIVELY_VERSE_ACL_REALM_ID)

        // then
        expect(await roleManagerDelegateProxy.roleCheckId(aclRoleTestId)).to.be.true

        // and
        const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await roleManagerDelegateProxy.roleCheckId(aclRoleTestId)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckName(ACL_ROLE_TEST_NAME)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId, livelyAdminWallet.address)).to.be.true;
      })

      it("Should register aclRoleTest2 in ACL type failed", async() => {
        // given
        aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
            typeId: aclTypeTestId,
            memberLimit: -1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME_2
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests))
          .to.revertedWith("Illegal Register");
      })

      it("Should update roleLimit of ACL_TYPE_TEST failed", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 0
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeUpdateRoleLimit(memberSignature, requests))
          .revertedWith("Illegal Limit");

      })

      it("Should update roleLimit of ACL_TYPE_TEST success", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeUpdateRoleLimit(memberSignature, requests))
          .to.emit(typeManagerDelegateProxy, "TypeRoleLimitUpdated")
          .withArgs(systemAdminWallet.address, aclTypeTestId, 5)
      })

      it("Should register aclRoleTest2 in ACL type success", async() => {
         // given
         const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
         aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
         const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
           {
             adminId: ethers.constants.HashZero,
             scopeId: typeContextId,
             typeId: aclTypeTestId,
             memberLimit: -1,
             acstat: ActivityStatus.ENABLED,
             alstat: AlterabilityStatus.UPDATABLE,
             name: ACL_ROLE_TEST_NAME_2
           }
         ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

         // when
         await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleRegistered")
           .withArgs(systemAdminWallet.address, aclRoleTestId2, aclTypeTestId,
             LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID, typeContextId);

         // and
         const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId2);
         expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_2);
         expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
         expect(roleInfo.scopeId).to.be.equal(typeContextId);
         expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
         expect(roleInfo.memberLimit).to.be.equal(7);
         expect(roleInfo.memberCount).to.be.equal(0);
         expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
         expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
         expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
         expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
       })

      it("Should update scope aclRoleTest2 in ACL type success", async() => {
        // given
        aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclRoleTestId2,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateScope(memberSignature, roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
          .withArgs(systemAdminWallet.address, aclRoleTestId2, LIVELY_VERSE_ACL_REALM_ID)
      })

      it("Should register aclRoleTest3 in ACL type success", async() => {
        // given
        const memberUpdateAdminFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberUpdateAdmin")]));
        aclRoleTestId3 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_3));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            scopeId: memberUpdateAdminFunctionId,
            typeId: aclTypeTestId,
            memberLimit: -1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_ROLE_TEST_NAME_3
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(memberSignature, roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(systemAdminWallet.address, aclRoleTestId3, aclTypeTestId,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID, memberUpdateAdminFunctionId);

        // and
        const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId3);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME_3);
        expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(memberUpdateAdminFunctionId);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(7);
        expect(roleInfo.memberCount).to.be.equal(0);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should update admin of aclRoleTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRoleTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateAdmin(memberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclRoleTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update memberLimit of aclRoleTest when alterability disabled failed", async() => {
        // given
        const memberLimitRequests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateMemberLimit(memberSignature, memberLimitRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should grant member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleGrantMembers(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should revoke member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRevokeMembers(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should aclRoleTest register new member when alterability disabled failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            limits: {
              memberLimit: 6,
              memberRegisterLimit: 6,
              contextRegisterLimit: 6,
              functionRegisterLimit: 6,
              profileRegisterLimit: 0,
              contextLimit: 6,
              realmLimit: 0,
              domainLimit: 0,
              callLimit: 6,
              typeRoleLimit: 0,
              typeLimit: 1,
              roleRegisterLimit: 1,
              typeRegisterLimit: 1,
              realmRegisterLimit: 0,
              domainRegisterLimit: 0,
              policyRegisterLimit: 0,
              policyRoleLimit: 0,
              functionLimit: 6,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberSignature, memberRegisterRequests))
          .to.revertedWith("Illegal Role Updatable");
      })

      it("Should update alterability of aclRoleTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclRoleTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should aclRoleTest register user1 with illegal admin failed", async() => {
        // given
        const roleMemberUserId1 =  ethers.utils.keccak256(userWallet1.address);
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.utils.keccak256(livelyAdminWallet.address),
            roleId: aclRoleTestId,
            account: userWallet1.address,
            limits: {
              memberLimit: 32,
              memberRegisterLimit: 32,
              contextRegisterLimit: 32,
              functionRegisterLimit: 32,
              profileRegisterLimit: 32,
              contextLimit: 32,
              realmLimit: 32,
              domainLimit: 32,
              callLimit: 1,
              typeRoleLimit: 32,
              typeLimit: 2,
              roleRegisterLimit: 32,
              typeRegisterLimit: 32,
              realmRegisterLimit: 32,
              domainRegisterLimit: 32,
              policyRegisterLimit: 32,
              policyRoleLimit: 32,
              functionLimit: 32,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(memberSignature, memberRegisterRequests))
          .to.revertedWith("Illegal Admin AgentType");
      })

      it("Should aclRoleTest register user1 success", async() => {
        // given
        const roleMemberUserId1 =  ethers.utils.keccak256(userWallet1.address);
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            limits: {
              memberLimit: 32,
              memberRegisterLimit: 32,
              contextRegisterLimit: 32,
              functionRegisterLimit: 32,
              profileRegisterLimit: 32,
              contextLimit: 32,
              realmLimit: 32,
              domainLimit: 32,
              callLimit: 1,
              typeRoleLimit: 32,
              typeLimit: 2,
              roleRegisterLimit: 32,
              typeRegisterLimit: 32,
              realmRegisterLimit: 32,
              domainRegisterLimit: 32,
              policyRegisterLimit: 32,
              policyRoleLimit: 32,
              functionLimit: 32,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
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
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberSignature, memberRegisterRequests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(livelyAdminWallet.address, roleMemberUserId1, userWallet1.address,
            aclRoleTestId, LIVELY_VERSE_MEMBER_MASTER_TYPE_ID, [32, 32, 32, 32, 32, 32, 32, 32, 1, 32, 2, 32, 32, 32, 32, 32, 32, 32])

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId1)).to.be.true;
        expect(await memberManagerDelegateProxy.memberCheckAccount(userWallet1.address)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId1);
        expect(memberInfo.account).to.be.equal(userWallet1.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(32);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.contextLimit).to.be.equal(32);
        expect(memberInfo.limits.realmLimit).to.be.equal(32);
        expect(memberInfo.limits.domainLimit).to.be.equal(32);
        expect(memberInfo.limits.callLimit).to.be.equal(1);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(32);
        expect(memberInfo.limits.typeLimit).to.be.equal(2);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(32);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(32);
        expect(memberInfo.limits.functionLimit).to.be.equal(32);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should aclRoleTest register same member failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            limits: {
              memberLimit: 32,
              memberRegisterLimit: 32,
              contextRegisterLimit: 32,
              functionRegisterLimit: 32,
              profileRegisterLimit: 32,
              contextLimit: 32,
              realmLimit: 32,
              domainLimit: 32,
              callLimit: 32,
              typeRoleLimit: 32,
              typeLimit: 32,
              roleRegisterLimit: 32,
              typeRegisterLimit: 32,
              realmRegisterLimit: 32,
              domainRegisterLimit: 32,
              policyRegisterLimit: 32,
              policyRoleLimit: 32,
              functionLimit: 32,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberSignature, memberRegisterRequests))
          .revertedWith("Already Exist")
      })

      it("Should grant systemAdmin to livelyAdmin role failed", async() => {
        // given
        const systemAdminId = ethers.utils.keccak256(systemAdminWallet.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            members: [systemAdminId]
          },
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .revertedWith("Illegal Grant")
      })

      it("Should aclRoleTest grant systemAdmin to aclRoleTestId role success", async() => {
        // given
        const systemAdminId = ethers.utils.keccak256(systemAdminWallet.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            members: [systemAdminId]
          },
          {
            roleId: aclRoleTestId,
            members: [systemAdminId]
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, systemAdminId, aclTypeTestId)

      })

      it("Should aclRoleTest register member with setAdmin failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            limits: {
              memberLimit: 0,
              memberRegisterLimit: 0,
              contextRegisterLimit: 0,
              functionRegisterLimit: 0,
              profileRegisterLimit: 0,
              contextLimit: 0,
              realmLimit: 0,
              domainLimit: 0,
              callLimit: 0,
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
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberSignature, memberRegisterRequests))
          .revertedWith("SetAdminForbidden(3)")
      })

      it("Should aclRoleTest activity disabled with someone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateActivityStatus(memberSignature, requests))
          .to.revertedWith("AdminAccessNotPermitted()")
      })

      it("Should aclRoleTest activity disabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateActivityStatus(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, ActivityStatus.DISABLED)

        // and
        const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(2);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should aclRoleTest activity enabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateActivityStatus(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, ActivityStatus.ENABLED)

        // and
        const roleInfo: IRoleManagement.RoleInfoStruct = await roleManagerDelegateProxy.roleGetInfo(aclRoleTestId);
        expect(roleInfo.name).to.be.equal(ACL_ROLE_TEST_NAME);
        expect(roleInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(roleInfo.scopeId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(roleInfo.typeId).to.be.equal(aclTypeTestId);
        expect(roleInfo.memberLimit).to.be.equal(3);
        expect(roleInfo.memberCount).to.be.equal(2);
        expect(roleInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(roleInfo.atype).to.be.equal(AgentType.ROLE);
        expect(roleInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(roleInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

      })

      it("Should register user2 to aclRoleTest success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            limits: {
              memberLimit: 16,
              memberRegisterLimit: 16,
              contextRegisterLimit: 16,
              functionRegisterLimit: 16,
              profileRegisterLimit: 16,
              contextLimit: 16,
              realmLimit: 16,
              domainLimit: 16,
              callLimit: 15,
              typeRoleLimit: 16,
              typeLimit: 5,
              roleRegisterLimit: 16,
              typeRegisterLimit: 16,
              realmRegisterLimit: 16,
              domainRegisterLimit: 16,
              policyRegisterLimit: 16,
              policyRoleLimit: 16,
              functionLimit: 16,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(livelyAdminWallet.address, roleMemberUserId2, userWallet2.address,
            aclRoleTestId, aclRoleTestId, [16, 16, 16, 16, 16, 16, 16, 16, 15, 16, 5, 16, 16, 16, 16, 16, 16, 16])

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId2)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId2);
        expect(memberInfo.account).to.be.equal(userWallet2.address);
        expect(memberInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(16);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.contextLimit).to.be.equal(16);
        expect(memberInfo.limits.realmLimit).to.be.equal(16);
        expect(memberInfo.limits.domainLimit).to.be.equal(16);
        expect(memberInfo.limits.callLimit).to.be.equal(15);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(16);
        expect(memberInfo.limits.typeLimit).to.be.equal(5);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(16);
        expect(memberInfo.limits.functionLimit).to.be.equal(16);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should update admin user2 member success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IACLCommons.UpdateAdminRequestStruct[] = [
          {
            id: roleMemberUserId2,
            adminId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberUpdateAdmin(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberAdminUpdated")
          .withArgs(systemAdminWallet.address, roleMemberUserId2, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should aclRoleTest role update admin success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRoleTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(roleManagerDelegateProxy, "RoleAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, aclRoleTestId);

        // then
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId, userWallet1.address)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId, userWallet2.address)).to.be.true;
      })

      it("Should aclRoleTest register another member when meet limitation failed", async() => {
        // given
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            limits: {
              memberLimit: 0,
              memberRegisterLimit: 0,
              contextRegisterLimit: 0,
              functionRegisterLimit: 0,
              profileRegisterLimit: 0,
              contextLimit: 0,
              realmLimit: 0,
              domainLimit: 0,
              callLimit: 0,
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
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(memberSignature, requests))
          .revertedWith("Illegal Register")
      })

      it("Should aclRoleTest update member limit by someone failed", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 1
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateMemberLimit(memberSignature, requests))
          .revertedWith("Illegal Limit")
      })

      it("Should aclRoleTest update member limit with old admin failed", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 10
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateMemberLimit(memberSignature, requests))
          .revertedWith("AdminAccessNotPermitted()")
      })

      it("Should aclRoleTest update member limit success", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateMemberLimit(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberLimitUpdated")
          .withArgs(userWallet1.address, aclRoleTestId, 5)
      })

      it("Should register user3 member to aclRoleTest failed", async() => {
        // given
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            limits: {
              contextLimit: 0,
              memberRegisterLimit: 0,
              roleRegisterLimit: 0,
              typeRegisterLimit: 0,
              functionRegisterLimit: 0,
              contextRegisterLimit: 0,
              memberLimit: 0,
              realmRegisterLimit: 0,
              functionLimit: 0,
              domainRegisterLimit: 0,
              policyRegisterLimit: 0,
              realmLimit: 0,
              domainLimit: 0,
              callLimit: 0,
              typeRoleLimit: 0,
              typeLimit: 0,
              policyRoleLimit: 0,
              profileRegisterLimit: 0,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(memberSignature, requests))
          .to.revertedWith("CallForbidden()")
      })

      it("Should update callLimit of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateGeneralLimitRequestStruct[] = [{
          memberId: userId1,
          limits: {
            memberLimit: 16,
            memberRegisterLimit: 16,
            contextRegisterLimit: 16,
            functionRegisterLimit: 16,
            profileRegisterLimit: 16,
            contextLimit: 16,
            realmLimit: 16,
            domainLimit: 16,
            callLimit: 32,
            typeRoleLimit: 16,
            typeLimit: 15,
            roleRegisterLimit: 16,
            typeRegisterLimit: 16,
            realmRegisterLimit: 16,
            domainRegisterLimit: 16,
            policyRegisterLimit: 16,
            policyRoleLimit: 16,
            functionLimit: 16,
          },
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateGeneralLimit(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberGeneralLimitUpdated")
          .withArgs(livelyAdminWallet.address, userId1, [
            16, 16, 16, 16, 16, 16, 16, 16, 32, 16, 15, 16, 16, 16, 16, 16, 16, 16
          ])
      })

      it("Should register user3 member to aclRoleTest success", async() => {
        // given
        const roleMemberUserId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            limits: {
              memberLimit: 8,
              memberRegisterLimit: 8,
              contextRegisterLimit: 8,
              functionRegisterLimit: 8,
              profileRegisterLimit: 8,
              contextLimit: 8,
              realmLimit: 8,
              domainLimit: 8,
              callLimit: 2,
              typeRoleLimit: 8,
              typeLimit: 1,
              roleRegisterLimit: 8,
              typeRegisterLimit: 8,
              realmRegisterLimit: 8,
              domainRegisterLimit: 8,
              policyRegisterLimit: 8,
              policyRoleLimit: 8,
              functionLimit: 8,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(userWallet1.address, roleMemberUserId3, userWallet3.address, aclRoleTestId,
            LIVELY_VERSE_MEMBER_MASTER_TYPE_ID, [8, 8, 8, 8, 8, 8, 8, 8, 2, 8, 1, 8, 8, 8, 8, 8, 8, 8])

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId3)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId3);
        expect(memberInfo.account).to.be.equal(userWallet3.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(8);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.contextLimit).to.be.equal(8);
        expect(memberInfo.limits.realmLimit).to.be.equal(8);
        expect(memberInfo.limits.domainLimit).to.be.equal(8);
        expect(memberInfo.limits.callLimit).to.be.equal(2);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(8);
        expect(memberInfo.limits.typeLimit).to.be.equal(1);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(8);
        expect(memberInfo.limits.functionLimit).to.be.equal(8);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should grant user3 to system admin role failed", async() => {
        // given
        const userId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          members: [userId3]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .revertedWith("Illegal TypeLimit")
      })

      it("Should revoke member from aclRoleTest and delete user3 success", async() => {
        // given
        const userId3 =  ethers.utils.keccak256(userWallet3.address);
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [userId3]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleRevokeMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberDeleted")
          .withArgs(userWallet1.address, aclRoleTestId, userId3, aclTypeTestId, userWallet3.address)
          .to.emit(roleManagerDelegateProxy, "RoleMemberRevoked")
          .withArgs(userWallet1.address, aclRoleTestId, userId3, aclTypeTestId);

        // then
        expect(await roleManagerDelegateProxy.roleHasAccount(aclTypeTestId, userWallet3.address)).to.be.false;

        // and
        expect(await memberManagerDelegateProxy.memberCheckId(userId3)).to.be.false;
        expect(await memberManagerDelegateProxy.memberCheckAccount(userWallet3.address)).to.be.false;
      })

      it("Should grant members to aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            members: [userId1, userId2]
          },
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId2, LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await roleManagerDelegateProxy.roleHasAccount(LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userWallet1.address)).to.be.true;
        expect(await roleManagerDelegateProxy.roleHasAccount(LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userWallet2.address)).to.be.true;

        // and
        expect(await memberManagerDelegateProxy.memberHasType(userId1, LIVELY_VERSE_ACL_TYPE_ID)).to.be.true;
        expect(await memberManagerDelegateProxy.memberHasType(userId2, LIVELY_VERSE_ACL_TYPE_ID)).to.be.true;

        // and
        expect(await memberManagerDelegateProxy.memberGetTypes(userId1)).to.be.eqls([aclTypeTestId, LIVELY_VERSE_ACL_TYPE_ID]);
        expect(await memberManagerDelegateProxy.memberGetTypes(userId2)).to.be.eqls([aclTypeTestId, LIVELY_VERSE_ACL_TYPE_ID]);

        // and
        expect(await typeManagerDelegateProxy.typeHasAccount(aclTypeTestId, userWallet1.address)).to.be.true;
        expect(await typeManagerDelegateProxy.typeHasAccount(aclTypeTestId, userWallet2.address)).to.be.true;

        // and
        expect(await typeManagerDelegateProxy.typeHasRole(aclTypeTestId, aclRoleTestId)).to.be.true;
        expect(await typeManagerDelegateProxy.typeHasRole(LIVELY_VERSE_ACL_TYPE_ID, LIVELY_VERSE_ACL_ADMIN_ROLE_ID)).to.be.true;

        // and
        expect(await typeManagerDelegateProxy.typeGetRoles(LIVELY_VERSE_ACL_TYPE_ID)).to.be.eqls([LIVELY_VERSE_ACL_ADMIN_ROLE_ID]);
        expect(await typeManagerDelegateProxy.typeGetRoles(aclTypeTestId)).to.be.eqls([aclRoleTestId4, aclRoleTestId, aclRoleTestId2, aclRoleTestId3]);
      })

      it("Should revoke user1 from aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          members: [ userId1]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRevokeMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberRevoked")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await roleManagerDelegateProxy.roleHasAccount(LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userWallet1.address)).to.be.false;

        // and
        expect(await memberManagerDelegateProxy.memberHasType(userId1, LIVELY_VERSE_ACL_TYPE_ID)).to.be.false;
      })

      it("Should update member alterability of user1 failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.UPGRADABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateAlterabilityStatus(memberSignature, requests))
          .revertedWith("AdminAccessRoleNotFound()")
      })

      it("Should disable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, userId1, AlterabilityStatus.DISABLED)
      })

      it("Should update admin of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: userId1,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAdmin(memberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update generalLimit of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateGeneralLimitRequestStruct[] = [{
          memberId: userId1,
          limits: {
            contextLimit: 0,
            memberRegisterLimit: 0,
            roleRegisterLimit: 0,
            typeRegisterLimit: 0,
            functionRegisterLimit: 0,
            contextRegisterLimit: 0,
            memberLimit: 0,
            realmRegisterLimit: 0,
            functionLimit: 0,
            domainRegisterLimit: 0,
            policyRegisterLimit: 0,
            realmLimit: 0,
            domainLimit: 0,
            callLimit: 0,
            typeRoleLimit: 0,
            typeLimit: 0,
            policyRoleLimit: 0,
            profileRegisterLimit: 0,
          }
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateGeneralLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should updatable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, userId1, AlterabilityStatus.UPDATABLE)
      })

      it("Should user1 activity disabled success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateActivityStatus(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberActivityUpdated")
          .withArgs(livelyAdminWallet.address, userId1, ActivityStatus.DISABLED)

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(userId1);
        expect(memberInfo.account).to.be.equal(userWallet1.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(16);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(15);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.contextLimit).to.be.equal(16);
        expect(memberInfo.limits.realmLimit).to.be.equal(16);
        expect(memberInfo.limits.domainLimit).to.be.equal(16);
        expect(memberInfo.limits.callLimit).to.be.equal(30);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(16);
        expect(memberInfo.limits.typeLimit).to.be.equal(15);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(16);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(16);
        expect(memberInfo.limits.functionLimit).to.be.equal(16);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should user1 update admin success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: userId1,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(memberManagerDelegateProxy, "MemberAdminUpdated")
          .withArgs(livelyAdminWallet.address, userId1, aclRoleTestId);

        // then
        expect(await memberManagerDelegateProxy.memberCheckAdmin(userId1, userWallet2.address)).to.be.true;
      })

      it("Should user1 activity enable with itself failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateActivityStatus(memberSignature, requests))
          .to.revertedWith("MemberActivityForbidden()")
      })

      it("Should user1 activity enable with user2 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user2).memberUpdateActivityStatus(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberActivityUpdated")
          .withArgs(userWallet2.address, userId1, ActivityStatus.ENABLED)
      })

      it("Should update scope aclRoleTest to Universe success", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclRoleTestId,
            scopeId: LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateScope(memberSignature, roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
          .withArgs(systemAdminWallet.address, aclRoleTestId, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID)
      })
    })

    describe("Policy Test", function() {
      it("Should register aclPolicyTest in ACL policy success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IPolicyManagement.PolicyRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: memberContextId,
            roleLimit: 2,
            policyCode: 80,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_POLICY_TEST_NAME
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyRegister(memberSignature, requests)).
        to.emit(policyManagerDelegateProxy, "PolicyRegistered")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, memberContextId,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, 80)

        // then
        expect(await policyManagerDelegateProxy.policyCheckId(aclPolicyTestId)).to.be.true

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfo(aclPolicyTestId);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(memberContextId);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(0);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await policyManagerDelegateProxy.policyCheckId(aclPolicyTestId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyCheckName(ACL_POLICY_TEST_NAME)).to.be.true;
        expect(await policyManagerDelegateProxy.policyCheckAdmin(aclPolicyTestId, livelyAdminWallet.address)).to.be.true;
      })

      it("Should add aclRoleTestId4 to aclPolicyTest success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId4 ]
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
        await expect(policyManagerDelegateProxy.connect(user1).policyAddRoles(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleAdded")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, aclRoleTestId4);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId4)).to.be.true;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId4)).to.be.true;

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfoByRole(aclRoleTestId4);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(memberContextId);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(1);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should update scope aclPolicyTest in ACL policy failed", async() => {
        // given
        const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
        const realmRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [realmManagerProxy.address,  realmIface.getSighash("realmRegister")]));
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclPolicyTestId,
            scopeId: realmRegisterFunctionId,
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(memberSignature, requests)).
        to.revertedWith("Illegal ScopeType")
      })

      it("Should update scope aclPolicyTest in ACL policy success", async() => {
        // given
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclPolicyTestId,
            scopeId: LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID)
      })

      it("Should disable alterability of aclPolicyTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclPolicyTestId,
          alstat: AlterabilityStatus.DISABLED
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
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, AlterabilityStatus.DISABLED)
      })

      it("Should update admin of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAdmin(memberSignature, updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update policyCode of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 30
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateCodes(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateRoleLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should add roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should remove roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclPolicyTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclPolicyTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should aclPolicyTest activity disabled success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, ActivityStatus.DISABLED)

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfo(aclPolicyTestId);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(1);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

      })

      it("Should aclPolicyTest activity enabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, ActivityStatus.ENABLED)
      })

      it("Should add adminId to aclPolicyTest self failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(memberSignature, requests))
          .revertedWith("Illegal Role")
      })

      it("Should update admin of aclPolicyTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(policyManagerDelegateProxy, "PolicyAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, aclRoleTestId);
      })

      it("Should add aclRoleTestId2 to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId2 ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyAddRoles(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleAdded")
          .withArgs(userWallet1.address, aclPolicyTestId, aclRoleTestId2);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId2)).to.be.true;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId2)).to.be.true;

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfoByRole(aclRoleTestId2);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(aclRoleTestId);
        expect(policyInfo.scopeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(policyInfo.roleLimit).to.be.equal(2);
        expect(policyInfo.roleCount).to.be.equal(2);
        expect(policyInfo.ptype).to.be.equal(PolicyType.MLOCK);
        expect(policyInfo.policyCode).to.be.equal(80);
        expect(policyInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(policyInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should add roles to aclPolicyTest for illegal role failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyAddRoles(memberSignature, requests))
          .revertedWith("Illegal Role")
      })

      it("Should update admin of aclPolicyTest to SYSTEM_MASTER_ADMIN_ROLE success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(policyManagerDelegateProxy, "PolicyAdminUpdated")
          .withArgs(userWallet1.address, aclPolicyTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
      })

      it("Should add roles to aclPolicyTest for limitation failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyAddRoles(memberSignature, requests))
          .revertedWith("Illegal Limit")
      })

      it("Should update role limit of aclPolicyTest by anyone failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 0
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateRoleLimit(memberSignature, requests))
          .revertedWith("AdminAccessNotPermitted()")
      })

      it("Should update role limit of aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateRoleLimit(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleLimitUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 5)
      })

      it("Should add aclRoleTestId to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyAddRoles(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleAdded")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, aclRoleTestId);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyGetRoles(aclPolicyTestId)).to.be.eqls([aclRoleTestId4, aclRoleTestId2, aclRoleTestId])
      })

      it("Should remove roles aclRoleTestId2 to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId2 ]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyRemoveRoles(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleRemoved")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, aclRoleTestId2);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId2)).to.be.false;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId2)).to.be.false;
      })

      it("Should update policyCode of aclPolicyTest to UNLOCK success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
              ethers.utils.solidityPack(["address", "bytes4"],
                [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const isPolicyAccess = await policyManagerDelegateProxy.policyCheckAccess(aclPolicyTestId, memberRegisterFunctionId);
        const isRoleAccess = await policyManagerDelegateProxy.policyCheckRoleAccess(aclRoleTestId, memberRegisterFunctionId);
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 0
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateCodes(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyCodeUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 0, PolicyType.UNLOCK);

        // and
        expect(isPolicyAccess).to.be.true;
        expect(isRoleAccess).to.be.true;
        expect(await policyManagerDelegateProxy.policyCheckAccess(aclPolicyTestId, memberRegisterFunctionId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyCheckRoleAccess(aclRoleTestId, memberRegisterFunctionId)).to.be.true;
      })
    })

    describe("Scope Test", function() {
      // function manager tests
      it("Should disable alterability of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          alstat: AlterabilityStatus.DISABLED
        }]

        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, AlterabilityStatus.DISABLED);
      })

      it("Should update admin of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: memberRegisterFunctionId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAdmin(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update agent of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAgent(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update policyCode of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          policyCode: 30
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdatePolicyCode(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          alstat: AlterabilityStatus.UPDATABLE
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
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of memberRegisterFunction success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, ActivityStatus.DISABLED)

        // then
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(memberIface.getSighash("memberRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(1);
      })

      it("Should enable activity of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, ActivityStatus.ENABLED)

        // then
        expect(await functionManagerDelegateProxy.functionCheckSelector(memberManagerProxy.address, memberIface.getSighash("memberRegister"))).to.be.true;
      })

      it("Should update agent of memberRegisterFunction to aclTypeTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclTypeTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAgent(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAgentUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, aclTypeTestId);

        // then
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet2.address)).to.be.true;
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet3.address)).to.be.false;
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  livelyAdminWallet.address)).to.be.false;
      })

      it("Should grant user2 to aclRoleTest3 success", async() => {
        // given
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
          {
            roleId: aclRoleTestId3,
            members: [userId2]
          },
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleGrantMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberRevoked")
          .withArgs(systemAdminWallet.address, aclRoleTestId, userId2, aclTypeTestId)
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(systemAdminWallet.address, aclRoleTestId3, userId2, aclTypeTestId)
      })

      it("Should aclRoleTest3 register user3 with Illegal role scope failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            limits: {
              memberLimit: 32,
              memberRegisterLimit: 32,
              contextRegisterLimit: 32,
              functionRegisterLimit: 32,
              profileRegisterLimit: 32,
              contextLimit: 32,
              realmLimit: 32,
              domainLimit: 32,
              callLimit: 1,
              typeRoleLimit: 32,
              typeLimit: 2,
              roleRegisterLimit: 32,
              typeRegisterLimit: 32,
              realmRegisterLimit: 32,
              domainRegisterLimit: 32,
              policyRegisterLimit: 32,
              policyRoleLimit: 32,
              functionLimit: 32,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
          const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user2).memberRegister(memberSignature, memberRegisterRequests))
          .to.revertedWith("ACLRoleScopeForbidden()");
      })

      it("Should update agent of memberRegisterFunction to aclRoleTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAgent(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAgentUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, aclRoleTestId);

        // then
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet1.address)).to.be.true
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet2.address)).to.be.false
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet3.address)).to.be.false;
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  livelyAdminWallet.address)).to.be.false;
      })

      it("Should update admin of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: memberRegisterFunctionId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(functionManagerDelegateProxy, "FunctionAdminUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, aclRoleTestId);

        // then
        expect(await functionManagerDelegateProxy.functionCheckAdmin(memberRegisterFunctionId,  userWallet1.address)).to.be.true;
      })

      it("Should update policyCode of aclPolicyTest to LOCK success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const isPolicyAccess = await policyManagerDelegateProxy.policyCheckAccess(aclPolicyTestId, memberRegisterFunctionId);
        const isRoleAccess = await policyManagerDelegateProxy.policyCheckRoleAccess(aclRoleTestId, memberRegisterFunctionId);
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 255
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateCodes(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyCodeUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 255, PolicyType.LOCK);

        // and
        expect(isPolicyAccess).to.be.true;
        expect(isRoleAccess).to.be.true;
        expect(await policyManagerDelegateProxy.policyCheckAccess(aclPolicyTestId, memberRegisterFunctionId)).to.be.false;
        expect(await policyManagerDelegateProxy.policyCheckRoleAccess(aclRoleTestId, memberRegisterFunctionId)).to.be.false;
      })

      it("Should aclRoleTest register user3 member with policy LOCK failed", async() => {
        // given
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            limits: {
              memberLimit: 8,
              memberRegisterLimit: 8,
              contextRegisterLimit: 8,
              functionRegisterLimit: 8,
              profileRegisterLimit: 8,
              contextLimit: 8,
              realmLimit: 8,
              domainLimit: 8,
              callLimit: 8,
              typeRoleLimit: 8,
              typeLimit: 8,
              roleRegisterLimit: 8,
              typeRegisterLimit: 8,
              realmRegisterLimit: 8,
              domainRegisterLimit: 8,
              policyRegisterLimit: 8,
              policyRoleLimit: 8,
              functionLimit: 8,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(memberSignature, requests))
          .to.revertedWith("ACLPolicyForbidden()")
      })

      it("Should update policyCode of memberRegisterFunction to RLOCK failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          policyCode: 130
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(user1).functionUpdatePolicyCode(memberSignature, requests))
          .to.revertedWith("AdminAccessPolicyForbidden()");
      })

      it("Should update policyCode of aclPolicyTest to UNLOCK success", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 0
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateCodes(memberSignature, requests))
          .to.emit(policyManagerDelegateProxy, "PolicyCodeUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 0, PolicyType.UNLOCK);
      })

      it("Should update policyCode of memberRegisterFunction to RLOCK success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          policyCode: 130
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(user1).functionUpdatePolicyCode(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionPolicyUpdated")
          .withArgs(userWallet1.address, memberRegisterFunctionId, 130);

        // then
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(aclRoleTestId);
        expect(functionInfo.agentId).to.be.equal(aclRoleTestId);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.policyCode).to.be.equal(130);
        expect(functionInfo.selector).to.be.equal(memberIface.getSighash("memberRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(1);
      })

      it("Should aclRoleTest register user3 member with policy UNLOCK success", async() => {
        // given
        const roleMemberUserId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            limits: {
              memberLimit: 8,
              memberRegisterLimit: 8,
              contextRegisterLimit: 8,
              functionRegisterLimit: 8,
              profileRegisterLimit: 8,
              contextLimit: 8,
              realmLimit: 8,
              domainLimit: 8,
              callLimit: 8,
              typeRoleLimit: 8,
              typeLimit: 8,
              roleRegisterLimit: 8,
              typeRegisterLimit: 8,
              realmRegisterLimit: 8,
              domainRegisterLimit: 8,
              policyRegisterLimit: 8,
              policyRoleLimit: 8,
              functionLimit: 8,
            },
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(memberSignature, requests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(userWallet1.address, roleMemberUserId3, userWallet3.address, aclRoleTestId,
            LIVELY_VERSE_MEMBER_MASTER_TYPE_ID, [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8])

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId3)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId3);
        expect(memberInfo.account).to.be.equal(userWallet3.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(memberInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.limits.memberLimit).to.be.equal(8);
        expect(memberInfo.limits.memberRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.contextRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.functionRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.profileRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.contextLimit).to.be.equal(8);
        expect(memberInfo.limits.realmLimit).to.be.equal(8);
        expect(memberInfo.limits.domainLimit).to.be.equal(8);
        expect(memberInfo.limits.callLimit).to.be.equal(8);
        expect(memberInfo.limits.typeRoleLimit).to.be.equal(8);
        expect(memberInfo.limits.typeLimit).to.be.equal(8);
        expect(memberInfo.limits.roleRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.typeRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.realmRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.domainRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.policyRegisterLimit).to.be.equal(8);
        expect(memberInfo.limits.policyRoleLimit).to.be.equal(8);
        expect(memberInfo.limits.functionLimit).to.be.equal(8);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })


      // context manager test
      it("Should disable alterability of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberContextId,
          alstat: AlterabilityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(contextManagerDelegateProxy, "ContextAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, AlterabilityStatus.DISABLED);
      })

      it("Should update admin of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: memberContextId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAdmin(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberContextId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update functionLimit of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IContextManagement.ContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateFunctionLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberContextId,
          alstat: AlterabilityStatus.UPDATABLE
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
        await expect(contextManagerDelegateProxy.connect(systemAdmin).contextUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(contextManagerDelegateProxy, "ContextAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberContextId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(memberSignature, requests))
          .to.emit(contextManagerDelegateProxy, "ContextActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, ActivityStatus.DISABLED)

        const memberContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberContextInfo.contractId).to.be.equal(memberManagerProxy.address);
        expect(memberContextInfo.realmId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(memberContextInfo.functionLimit).to.be.equal(32);
        expect(memberContextInfo.functionCount).to.be.equal(11);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      it("Should enable activity of memberContext success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberContextId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(memberSignature, requests))
          .to.emit(contextManagerDelegateProxy, "ContextActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, ActivityStatus.ENABLED)

        // then
        expect(await contextManagerDelegateProxy.contextHasSelector(memberManagerProxy.address,  memberIface.getSighash("memberRegister"))).to.be.true;
        expect(await contextManagerDelegateProxy.contextHasFunction(memberContextId, memberRegisterFunctionId)).to.be.true;

        // and
        const functionIds = await contextManagerDelegateProxy.contextGetFunctions(memberContextId);
        expect(functionIds.length).to.be.equal(11)
      })

      it("Should update admin of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: memberContextId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(contextManagerDelegateProxy, "ContextAdminUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, aclRoleTestId);

        // then
        expect(await contextManagerDelegateProxy.contextCheckAdmin(memberContextId,  userWallet1.address)).to.be.true;
      })

      it("Should update functionLimit of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IContextManagement.ContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 25
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(contextManagerDelegateProxy.connect(user1).contextUpdateFunctionLimit(memberSignature, requests))
          .to.emit(contextManagerDelegateProxy, "ContextFunctionLimitUpdated")
          .withArgs(userWallet1.address, memberContextId, 25);

        const memberContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberContextInfo.contractId).to.be.equal(memberManagerProxy.address);
        expect(memberContextInfo.realmId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(memberContextInfo.functionLimit).to.be.equal(25);
        expect(memberContextInfo.functionCount).to.be.equal(11);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })


      // domain manager test
      it("Should register aclDomainTest in ACL Universe success", async() => {
        // given
        aclDomainTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TEST_NAME));
        const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_DOMAIN_TEST_NAME
          }
        ]
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
        await expect(domainManagerDelegateProxy.connect(systemAdmin).domainRegister(memberSignature, requests)).
        to.emit(domainManagerDelegateProxy, "DomainRegistered")
          .withArgs(livelyAdminWallet.address, aclDomainTestId ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await domainManagerDelegateProxy.domainCheckId(aclDomainTestId)).to.be.true

        // and
        const domainInfo: IDomainManagement.DomainInfoStruct = await domainManagerDelegateProxy.domainGetInfo(aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.universeId).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(domainInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await domainManagerDelegateProxy.domainCheckId(aclDomainTestId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainCheckName(ACL_DOMAIN_TEST_NAME)).to.be.true;
        expect(await domainManagerDelegateProxy.domainCheckAdmin(aclDomainTestId, livelyAdminWallet.address)).to.be.true;
        expect(await universeManagerDelegateProxy.universeGetDomains()).to.be.eqls([LIVELY_VERSE_ACL_DOMAIN_ID, aclDomainTestId]);
      })

      it("Should update admin of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclDomainTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 1
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateRealmLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclDomainTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(domainManagerDelegateProxy, "DomainAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(memberSignature, requests))
          .to.emit(domainManagerDelegateProxy, "DomainActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, ActivityStatus.DISABLED)

        // and
        const domainInfo: IDomainManagement.DomainInfoStruct = await domainManagerDelegateProxy.domainGetInfo(aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should enable activity of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(memberSignature, requests))
          .to.emit(domainManagerDelegateProxy, "DomainActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, ActivityStatus.ENABLED)
      })

      it("Should update admin of aclDomainTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclDomainTestId,
          adminId: aclTypeTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(domainManagerDelegateProxy, "DomainAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, aclTypeTestId);

        // then
        expect(await domainManagerDelegateProxy.domainCheckAdmin(aclDomainTestId,  systemAdminWallet.address)).to.be.true;
      })

      it("Should update realmLimit of aclDomainTest success", async() => {
        // given
        const requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 2
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(user1).domainUpdateRealmLimit(memberSignature, requests))
          .to.emit(domainManagerDelegateProxy, "DomainRealmLimitUpdated")
          .withArgs(userWallet1.address, aclDomainTestId, 2);

        // and
        const domainInfo: IDomainManagement.DomainInfoStruct = await domainManagerDelegateProxy.domainGetInfo(aclDomainTestId);
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

      it("Should grant user1 to scope master and aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [
          {
            roleId: LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
            members: [userId1]
          },
          {
            roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            members: [userId1]
          },
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_ACL_TYPE_ID)
      })


      // realm manager tests
      it("Should register aclRealmTest to aclDomainTestId success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        aclRealmTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_REALM_TEST_NAME));
        const requests: IRealmManagement.RealmRegisterRequestStruct[] = [
          {
            domainId: aclDomainTestId,
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            contextLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_REALM_TEST_NAME
          }
        ]
        const expiredAt = BigNumber.from(Date.now() + 10000);
        const signature = generateMemberSignatureManually(
          userWallet1.address,
          aclManagerProxy.address,
          userWallet1,
          networkChainId,
          expiredAt
        );
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: userWallet1.address,
          expiredAt: expiredAt,
          signature: signature
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmRegister(memberSignature, requests)).
        to.emit(realmManagerDelegateProxy, "RealmRegistered")
          .withArgs(userWallet1.address, aclRealmTestId , aclDomainTestId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await realmManagerDelegateProxy.realmCheckId(aclRealmTestId)).to.be.true

        // and
        const realmInfo: IRealmManagement.RealmInfoStruct = await realmManagerDelegateProxy.realmGetInfo(aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(aclDomainTestId);
        expect(realmInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(realmInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(realmInfo.contextLimit).to.be.equal(1);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await realmManagerDelegateProxy.realmCheckId(aclRealmTestId)).to.be.true;
        expect(await realmManagerDelegateProxy.realmCheckName(ACL_REALM_TEST_NAME)).to.be.true;
        expect(await realmManagerDelegateProxy.realmCheckAdmin(aclRealmTestId, livelyAdminWallet.address)).to.be.true;
        expect(await realmManagerDelegateProxy.realmHasFunction(LIVELY_VERSE_ACL_REALM_ID, memberRegisterFunctionId)).to.be.true;
        expect(await realmManagerDelegateProxy.realmHasContext(LIVELY_VERSE_ACL_REALM_ID, ethers.utils.keccak256(memberManagerProxy.address))).to.be.true;

        //
        const contexts = await realmManagerDelegateProxy.realmGetContexts(LIVELY_VERSE_ACL_REALM_ID);
        expect(contexts.length).to.be.equal(22)

      })

      it("Should update admin of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRealmTestId,
          adminId: aclRoleTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update contextLimit of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 1
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateContextLimit(memberSignature, requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclRealmTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAlterabilityStatus(memberSignature, requests))
          .to.emit(realmManagerDelegateProxy, "RealmAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(memberSignature, requests))
          .to.emit(realmManagerDelegateProxy, "RealmActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, ActivityStatus.DISABLED)

        // and
        const realmInfo: IRealmManagement.RealmInfoStruct = await realmManagerDelegateProxy.realmGetInfo(aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(aclDomainTestId);
        expect(realmInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(realmInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(realmInfo.contextLimit).to.be.equal(1);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should enable activity of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.ENABLED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(memberSignature, requests))
          .to.emit(realmManagerDelegateProxy, "RealmActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, ActivityStatus.ENABLED)
      })

      it("Should update admin of aclRealmTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRealmTestId,
          adminId: aclTypeTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(memberSignature, updateAdminRequests))
          .to.emit(realmManagerDelegateProxy, "RealmAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, aclTypeTestId);

        // then
        expect(await realmManagerDelegateProxy.realmCheckAdmin(aclRealmTestId,userWallet1.address)).to.be.true;
      })

      it("Should update contextLimit of aclRealmTest success", async() => {
        // given
        const requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 5
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(user1).realmUpdateContextLimit(memberSignature, requests))
          .to.emit(realmManagerDelegateProxy, "RealmContextLimitUpdated")
          .withArgs(userWallet1.address, aclRealmTestId, 5);

        // and
        const realmInfo: IRealmManagement.RealmInfoStruct = await realmManagerDelegateProxy.realmGetInfo(aclRealmTestId);
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

      it("Should move realm from aclDomainTestId to ACL domain success", async() => {
        // given
        const requests: IDomainManagement.DomainMoveRealmRequestStruct[] = [{
          domainId: aclDomainTestId,
          targetDomainId: LIVELY_VERSE_ACL_DOMAIN_ID,
          realmId: aclRealmTestId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(user1).domainMoveRealm(memberSignature, requests))
          .to.emit(domainManagerDelegateProxy, "DomainRealmMoved")
          .withArgs(userWallet1.address, aclDomainTestId, aclRealmTestId, LIVELY_VERSE_ACL_DOMAIN_ID);

        expect(await domainManagerDelegateProxy.domainHasRealm(LIVELY_VERSE_ACL_DOMAIN_ID, aclRealmTestId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainHasRealm(aclDomainTestId, aclRealmTestId)).to.be.false;

        // and
        const realmInfo: IRealmManagement.RealmInfoStruct = await realmManagerDelegateProxy.realmGetInfo(aclRealmTestId);
        expect(realmInfo.name).to.be.equal(ACL_REALM_TEST_NAME);
        expect(realmInfo.domainId).to.be.equal(LIVELY_VERSE_ACL_DOMAIN_ID);
        expect(realmInfo.adminId).to.be.equal(aclTypeTestId);
        expect(realmInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(realmInfo.contextLimit).to.be.equal(5);
        expect(realmInfo.contextCount).to.be.equal(0);
        expect(realmInfo.referredByAgent).to.be.equal(0);
        expect(realmInfo.stype).to.be.equal(ScopeType.REALM);
        expect(realmInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(realmInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should move context from ACLRealm to ACL aclRealmTestId success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IRealmManagement.RealmMoveContextRequestStruct[] = [{
          realmId: LIVELY_VERSE_ACL_REALM_ID,
          targetRealmId: aclRealmTestId,
          contextId: memberContextId
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(realmManagerDelegateProxy.connect(user1).realmMoveContext(memberSignature, requests))
          .to.emit(realmManagerDelegateProxy, "RealmContextMoved")
          .withArgs(userWallet1.address, LIVELY_VERSE_ACL_REALM_ID, memberContextId, aclRealmTestId);

        expect(await realmManagerDelegateProxy.realmHasContext(LIVELY_VERSE_ACL_REALM_ID, memberContextId)).to.be.false;
        expect(await realmManagerDelegateProxy.realmHasContext(aclRealmTestId, memberContextId)).to.be.true;

        // and
        const memberContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(memberContextId);
        expect(memberContextInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(memberContextInfo.contractId).to.be.equal(memberManagerProxy.address);
        expect(memberContextInfo.realmId).to.be.equal(aclRealmTestId);
        expect(memberContextInfo.functionLimit).to.be.equal(25);
        expect(memberContextInfo.functionCount).to.be.equal(11);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      // universe manager tests
      it("Should disable alterability of universe scope success", async() => {
        // when
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
        await expect(universeManagerDelegateProxy.connect(systemAdmin).universeUpdateAlterabilityStatus(memberSignature, AlterabilityStatus.DISABLED))
          .to.emit(universeManagerDelegateProxy, "UniverseAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, AlterabilityStatus.DISABLED);
      })

      it("Should update admin of universe scope when alterability disabled failed", async() => {

        // when
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }
        await expect(universeManagerDelegateProxy.connect(livelyAdmin).universeUpdateAdmin(memberSignature, aclRoleTestId))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of universe scope when alterability disabled failed", async() => {
        // when
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }
        await expect(universeManagerDelegateProxy.connect(livelyAdmin).universeUpdateActivityStatus(memberSignature, ActivityStatus.DISABLED))
          .revertedWith("Illegal")
      })

      it("Should update alterability of universe scope success", async() => {
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
        await expect(universeManagerDelegateProxy.connect(systemAdmin).universeUpdateAlterabilityStatus(memberSignature, AlterabilityStatus.UPDATABLE))
          .to.emit(universeManagerDelegateProxy, "UniverseAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of universe scope success", async() => {
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
        await expect(universeManagerDelegateProxy.connect(systemAdmin).universeUpdateActivityStatus(memberSignature, ActivityStatus.DISABLED))
          .to.emit(universeManagerDelegateProxy, "UniverseActivityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, ActivityStatus.DISABLED)


        // and
        const universeInfo: IUniverseManagement.UniverseInfoStruct = await universeManagerDelegateProxy.universeGetInfo();
        expect(universeInfo.id).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(universeInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(universeInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(universeInfo.domainLimit).to.be.equal(65535);
        expect(universeInfo.domainCount).to.be.equal(2);
        expect(universeInfo.acstat).to.be.equal(ActivityStatus.DISABLED);
        expect(universeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(universeInfo.stype).to.be.equal(ScopeType.UNIVERSE);
        expect(universeInfo.referredByAgent).to.be.equal(18);
      })

      it("Should register aclDomainTest2 in Universe failed", async() => {
        // given
        const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_DOMAIN_TEST_NAME_2
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(memberSignature, requests)).
        revertedWith("ACLUniverseActivityForbidden()")

      })

      it("Should enable activity of universe scope success", async() => {
        // when
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }
        await expect(universeManagerDelegateProxy.connect(livelyAdmin).universeUpdateActivityStatus(memberSignature, ActivityStatus.ENABLED))
          .to.emit(universeManagerDelegateProxy, "UniverseActivityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, ActivityStatus.ENABLED)
      })

      it("Should register aclRoleUniverseAdminTest in LivelyMaster type success", async() => {
        // given
        aclRoleUniverseAdminTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID,
            typeId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_ROLE_UNIVERSE_ADMIN_TEST_NAME
          }
        ]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(memberSignature, roleRegisterRequests)).
        to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleUniverseAdminTestId, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID)

      })

      it("Should grant user3 to aclRoleUniverseAdminTest role success", async() => {
        // given
        const userId3 = ethers.utils.keccak256(userWallet3.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleUniverseAdminTestId,
          members: [userId3]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, aclRoleUniverseAdminTestId, userId3, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should update admin of universe scope to aclRoleUniverseAdminTestId success", async() => {
        // when
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }
        await expect(universeManagerDelegateProxy.connect(livelyAdmin).universeUpdateAdmin(memberSignature, aclRoleUniverseAdminTestId))
          .to.emit(universeManagerDelegateProxy, "UniverseAdminUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, aclRoleUniverseAdminTestId);

        // then
        expect(await universeManagerDelegateProxy.universeCheckAdmin(userWallet3.address)).to.be.true;
      })

      it("Should update domainLimit of universe scope success", async() => {
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(universeManagerDelegateProxy.connect(user3).universeUpdateDomainLimit(memberSignature, 5))
          .to.emit(universeManagerDelegateProxy, "UniverseDomainLimitUpdated")
          .withArgs(userWallet3.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, 5);
      })

      it("Should update admin of universe scope to LIVELY_MATER_ADMIN success", async() => {
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(universeManagerDelegateProxy.connect(user3).universeUpdateAdmin(memberSignature, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID))
          .to.emit(universeManagerDelegateProxy, "UniverseAdminUpdated")
          .withArgs(userWallet3.address, LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);

        // then
        const universeInfo: IUniverseManagement.UniverseInfoStruct = await universeManagerDelegateProxy.universeGetInfo();
        expect(universeInfo.id).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(universeInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(universeInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(universeInfo.domainLimit).to.be.equal(5);
        expect(universeInfo.domainCount).to.be.equal(2);
        expect(universeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(universeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(universeInfo.stype).to.be.equal(ScopeType.UNIVERSE);
        expect(universeInfo.referredByAgent).to.be.equal(19);

        // and
        expect(await universeManagerDelegateProxy.universeCheckAdmin(userWallet1.address)).to.be.false;
        expect(await universeManagerDelegateProxy.universeCheckAdmin(userWallet2.address)).to.be.false;
        expect(await universeManagerDelegateProxy.universeGetDomains()).to.be.eqls([LIVELY_VERSE_ACL_DOMAIN_ID, aclDomainTestId]);

      })

      it("Should revoke user1 from aclAdminRole success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          members: [ userId1]
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRevokeMembers(memberSignature, requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberRevoked")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_ACL_TYPE_ID)
      })
    })

    describe("Upgrade ACL proxy tests", function() {
      let lACLManagerTest: LACLManagerTest;
      let aclManagerSubjectTest: ACLManagerTest;
      it("Should enable Upgrade Status of domain proxy by anyone failed", async () => {
        // when and then
        await expect(domainManagerProxy.connect(user1).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.revertedWith("Forbidden");
      });

      it("Should enable Upgrade Status of domain proxy by aclAdmin success", async () => {
        // when and then
        await expect(domainManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(domainManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(
            livelyAdminWallet.address,
            domainManagerProxy.address,
            ProxyUpdatabilityStatus.ENABLED
          );
      });

      it("Should upgrade domain proxy to another subject by systemAdmin success", async () => {
        // given
        const domainManagerTestFactory = new DomainManagerTest__factory(systemAdmin);

        // const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(DomainManagerTest__factory.abi);
        const data = iface.encodeFunctionData("reInitialize", [
          "3.0.1",
        ]);

        // when
        domainManagerSubjectTest = await domainManagerTestFactory.deploy();
        await expect(domainManagerProxy.upgradeTo(domainManagerSubjectTest.address, data, false))
          .to.emit(domainManagerProxy, "ProxyUpgraded")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainManagerSubjectTest.address)
        // const proxy = await proxyFactory.deploy(domainManagerSubjectTest.address, data);

        // then
        domainManagerProxyTest = domainManagerSubjectTest.attach(domainManagerProxy.address);
        const domainSeparator = generateDomainSeparator(
          DOMAIN_MANAGER_CONTRACT_NAME,
          "3.0.1",
          domainManagerProxyTest.address,
          networkChainId
        );

        domainManagerDelegateProxyTest = domainManagerProxyTest.attach(aclManagerProxy.address);

        expect(await domainManagerProxyTest.contractName()).to.be.equal(DOMAIN_MANAGER_CONTRACT_NAME);
        expect(await domainManagerProxyTest.contractVersion()).to.be.equal("3.0.1");
        expect(await domainManagerProxyTest.subjectAddress()).to.be.equal(domainManagerSubjectTest.address);
        expect(await domainManagerProxyTest.accessControlManager()).to.be.equal(aclManagerProxy.address);
        expect(await domainManagerProxyTest.localAdmin()).to.be.equal(systemAdminWallet.address);
        expect(await domainManagerProxyTest.domainSeparator()).to.be.equal(domainSeparator);
        expect(await domainManagerProxyTest.safeModeStatus()).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(await domainManagerProxyTest.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
        expect(await domainManagerProxyTest.initVersion()).to.be.equal(2)
      });

      it("Should deploy LACLManagerTest success", async () => {

        // given
        const aclFactory = new LACLManagerTest__factory(systemAdmin);

        // when
        lACLManagerTest = await aclFactory.deploy();

        // then
        expect(lACLManagerTest.address).not.null;
        expect(await lACLManagerTest.LIB_NAME()).to.be.equal("LACLManager");
        expect(await lACLManagerTest.LIB_VERSION()).to.be.equal("3.0.1");

      });

      it("Should ACLManager subject test deploy success", async () => {
        // given
        linkLibraryAddressesTest = {
          "src/contracts/test/acl/LACLManagerTest.sol:LACLManagerTest": lACLManagerTest.address
        };

        const aclManagerFactory = new ACLManagerTest__factory(linkLibraryAddressesTest, systemAdmin);

        // when
        aclManagerSubjectTest = await aclManagerFactory.deploy();

        // then
        expect(aclManagerSubjectTest.address).not.null;
        expect(await aclManagerSubjectTest.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await aclManagerSubjectTest.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await aclManagerSubjectTest.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await aclManagerSubjectTest.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await aclManagerSubjectTest.initVersion()).to.be.equal(0);
      })

      it("Should enable Upgrade Status of ACL proxy by livelyAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(
            livelyAdminWallet.address,
            aclManagerProxy.address,
            ProxyUpdatabilityStatus.ENABLED
          );
      });

      it("Should setAdmin proxy to systemAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).setLocalAdmin(systemAdminWallet.address))
          .to.emit(aclManagerProxy, "ProxyLocalAdminUpdated")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address,systemAdminWallet.address);
      });

      it("Should enable Upgrade Status of ACL proxy by livelyAdmin success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(
            livelyAdminWallet.address,
            aclManagerProxy.address,
            ProxyUpdatabilityStatus.ENABLED
          );
      });

      it("Should call acl facet upgrade by systemAdmin success", async () => {
        // given
        const aclIface = new ethers.utils.Interface(ACLManager__factory.abi);
        const aclTestIface = new ethers.utils.Interface(ACLManagerTest__factory.abi);
        const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
        const domainTestIface = new ethers.utils.Interface(DomainManagerTest__factory.abi);
        const domainFunctionUpgradeRequests: IACLManager.FacetSelectorUpgradeRequestStruct[] = [
          {
            action: ActionType.REMOVE,
            selectors: [
              domainIface.getSighash("domainRegister"),
              domainIface.getSighash("domainMoveRealm")
            ]
          },
          {
            action: ActionType.ADD,
            selectors: [
              domainTestIface.getSighash("domainRegister2")
            ]
          },
        ]

        const aclFunctionUpgradeRequests: IACLManager.FacetSelectorUpgradeRequestStruct[] = [
          {
            action: ActionType.REMOVE,
            selectors: [
              aclIface.getSighash("initialize"),
              aclIface.getSighash("initACL"),
            ]
          },
          {
            action: ActionType.ADD,
            selectors: [
              aclTestIface.getSighash("reInitialize")
            ]
          },
        ]

        const facetUpgradeRequests: IACLManager.FacetUpgradeRequestStruct[] = [
          {
            facetId: domainManagerProxy.address,
            subjectId: domainManagerSubjectTest.address,
            functions: domainFunctionUpgradeRequests,
          },
          {
            facetId: aclManagerProxy.address,
            subjectId: aclManagerSubjectTest.address,
            functions: aclFunctionUpgradeRequests,
          }
        ]

        // when and then
        await expect(aclManagerProxy.connect(systemAdmin).aclUpgradeFacet(facetUpgradeRequests))
          .to.emit(aclManagerProxy, "ACLFacetUpgraded")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainManagerSubjectTest.address, "0xb2f4af64")
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainIface.getSighash("domainRegister"), ActionType.REMOVE)
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainIface.getSighash("domainMoveRealm"), ActionType.REMOVE)
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainTestIface.getSighash("domainRegister2"), ActionType.ADD)
          .to.emit(aclManagerProxy, "ACLFacetUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerSubjectTest.address, "0x46414ba0")
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclIface.getSighash("initialize"), ActionType.REMOVE)
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclIface.getSighash("initACL"), ActionType.REMOVE)
          .to.emit(aclManagerProxy, "ACLFacetFunctionUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclTestIface.getSighash("reInitialize"), ActionType.ADD)

        // and
        const facetACLInfo: IACLManager.FacetInfoStruct = await aclManagerProxy.aclGetFacetInfo(aclManagerProxy.address);
        expect(facetACLInfo.subjectId).to.be.equal(aclManagerSubjectTest.address);

        // and
        const facetDomainInfo: IACLManager.FacetInfoStruct = await aclManagerProxy.aclGetFacetInfo(domainManagerProxy.address);
        expect(facetDomainInfo.subjectId).to.be.equal(domainManagerSubjectTest.address);

        // and
        expect(await aclManagerProxy.aclHasSelector(aclTestIface.getSighash("reInitialize"))).to.be.true
        expect(await aclManagerProxy.aclGetFacet(aclTestIface.getSighash("reInitialize"))).to.be.equal(aclManagerProxy.address)
      })

      it("Should ACLManager proxy upgradeTo aclManagerSubjectTest by systemAdmin success", async () => {

        // given
        const iface = new ethers.utils.Interface(ACLManagerTest__factory.abi);
        const data = iface.encodeFunctionData("reInitialize", [
          "3.0.1",
        ]);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubjectTest.address, data, false)
        ).to.emit(aclManagerProxy, "ProxyUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerSubjectTest.address);

        expect(await aclManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.ENABLED);
        expect(await aclManagerProxy.contractVersion()).to.be.equal("3.0.1");
        expect(await aclManagerProxy.initVersion()).to.be.equal(2);
        expect(await aclManagerProxy.getLibrary()).to.be.equal(lACLManagerTest.address);
      });

      it("Should delete activity of domainRegister in domainContext by aclAdmin success", async() => {
        // given
        const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
        const domainRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [domainManagerProxy.address,  domainIface.getSighash("domainRegister")]));
        const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: domainRegisterFunctionId,
          acstat: ActivityStatus.DELETED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, domainRegisterFunctionId, ActivityStatus.DELETED)

        // then
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(250);
        expect(functionInfo.selector).to.be.equal(domainIface.getSighash("domainRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.DELETED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should delete activity of domainMoveRealm in domainContext by aclAdmin success", async() => {
        // given
        const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
        const domainMoveRealmFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [domainManagerProxy.address,  domainIface.getSighash("domainMoveRealm")]));
        const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: domainMoveRealmFunctionId,
          acstat: ActivityStatus.DELETED
        }]
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(memberSignature, requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, domainMoveRealmFunctionId, ActivityStatus.DELETED)

        // then
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainMoveRealmFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(24);
        expect(functionInfo.selector).to.be.equal(domainIface.getSighash("domainMoveRealm"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.DELETED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register new domainRegister2 in domainContext by aclAdmin success", async() => {
        const domainTestIface = new ethers.utils.Interface(DomainManagerTest__factory.abi);
        const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
        const domainRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [domainManagerProxy.address,  domainTestIface.getSighash("domainRegister2")]));
        const domainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_TYPE_ID,
            agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
            selector: domainTestIface.getSighash("domainRegister2"),
            policyCode: 0,
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
        const memberSignature: IACLCommons.MemberSignatureStruct = {
          account: ethers.constants.AddressZero,
          expiredAt: 0,
          signature: new Int8Array(0)
        }

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberSignature, domainFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(domainContextId, domainRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(domainTestIface.getSighash("domainRegister2"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

        // and
        expect(await domainManagerDelegateProxyTest.domainHasContext(LIVELY_VERSE_ACL_DOMAIN_ID, domainContextId)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainHasFunction(LIVELY_VERSE_ACL_DOMAIN_ID, domainRegisterFunctionId)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainHasRealm(LIVELY_VERSE_ACL_DOMAIN_ID, LIVELY_VERSE_ACL_REALM_ID)).to.be.true;

      })

      it("Should call domainRegister2 by aclAdmin success", async() => {
        // given
        aclDomainTest2Id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TEST_NAME_2));
        const requests: IDomainManagementTest.DomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_DOMAIN_TEST_NAME_2
          }
        ]

        // when
        await expect(domainManagerDelegateProxyTest.connect(livelyAdmin).domainRegister2(requests)).
        to.emit(domainManagerDelegateProxyTest, "DomainRegistered")
          .withArgs(livelyAdminWallet.address, aclDomainTest2Id ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await domainManagerDelegateProxyTest.domainCheckId(aclDomainTest2Id)).to.be.true

        // and
        const domainInfo: IDomainManagementTest.DomainInfoStruct = await domainManagerDelegateProxyTest.domainGetInfo(aclDomainTest2Id);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME_2);
        expect(domainInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(10);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await domainManagerDelegateProxyTest.domainCheckId(aclDomainTest2Id)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainCheckName(ACL_DOMAIN_TEST_NAME_2)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainCheckAdmin(aclDomainTest2Id, livelyAdminWallet.address)).to.be.true;
      })

    })

    describe("IAccessControl Tests", async() => {
      it("Should all functions called success", async() => {

        expect(await accessControlDelegateProxy.getAnonymousType()).to.be.equal(LIVELY_VERSE_ANONYMOUS_TYPE_ID);
        expect(await accessControlDelegateProxy.getAnyType()).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(await accessControlDelegateProxy.getScopeMasterType()).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getTypeMasterType()).to.be.equal(LIVELY_VERSE_TYPE_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getMemberMasterType()).to.be.equal(LIVELY_VERSE_MEMBER_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getSystemMasterType()).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getLivelyMasterType()).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getPolicyMasterType()).to.be.equal(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getUniverseScope()).to.be.equal(LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID);
        expect(await accessControlDelegateProxy.isAgentExist(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)).to.be.true;
        expect(await accessControlDelegateProxy.isScopeExist(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.true;
        expect(await accessControlDelegateProxy.getScopeBaseInfo(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.not.empty;
        expect(await accessControlDelegateProxy.getAgentBaseInfo(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)).to.be.not.empty;
      })
    })

    // describe("Contract Upgradable Storage Test", function() {
    //   it("Should AccessControlManager storage verification before upgrade success", async () => {
    //     const baseProxy_slot_0 = await readStorageSlot(accessControlManagerProxy.address, 0);
    //     const baseProxy_slot_1 = await readStorageSlot(accessControlManagerProxy.address, 1);
    //     const baseProxy_slot_2 = await readStorageSlot(accessControlManagerProxy.address, 2);
    //     const baseProxy_slot_3 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 0);
    //     const baseProxy_slot_4 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 1);
    //     const baseProxy_slot_67 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 64);
    //     const acm_RoleMap_slot_70 = await readStorageSlotHashMap(
    //       accessControlManagerProxy.address,
    //       LIVELY_ADMIN_ROLE,
    //       70
    //     );
    //     const acm_GroupMap_slot_72 = await readStorageSlotHashMap(
    //       accessControlManagerProxy.address,
    //       LIVELY_GENERAL_GROUP,
    //       72
    //     );
    //
    //     expect(baseProxy_slot_0).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
    //     expect(baseProxy_slot_1).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    //     expect(baseProxy_slot_2).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
    //     expect("0x" + baseProxy_slot_3.slice(26)).to.be.hexEqual(accessControlManagerProxy.address);
    //     expect(baseProxy_slot_4).to.be.hexEqual("0x".padEnd(64, "0"));
    //     expect(baseProxy_slot_67).to.be.hexEqual("0x".padEnd(64, "0"));
    //     expect(acm_RoleMap_slot_70).to.be.hexEqual(LIVELY_GENERAL_GROUP);
    //     expect(acm_GroupMap_slot_72.slice(0, acm_GroupMap_slot_72.length - 2)).to.be.equal(
    //       ethers.utils.formatBytes32String("LIVELY_GENERAL_GROUP").slice(0, acm_GroupMap_slot_72.length - 2)
    //     );
    //   });
    //
    //   it("Should AccessControlManagerTest subject deploy success", async () => {
    //     // given
    //     const accessControlManagerTestFactory = new AccessControlManagerTest__factory(livelyAdmin);
    //
    //     // when
    //     accessControlManagerTestSubject = await accessControlManagerTestFactory.deploy();
    //
    //     // then
    //     expect(accessControlManagerTestSubject.address).not.null;
    //     expect(await accessControlManagerTestSubject.isSafeMode()).to.be.true;
    //     expect(await accessControlManagerTestSubject.isUpgradable()).to.be.false;
    //     expect(await accessControlManagerTestSubject.initVersion()).to.be.equal(0);
    //   });
    //
    //   it("Should upgrade proxy with accessControlManagerTestSubject by livelyAdmin success", async () => {
    //     // given
    //     const typedArray1 = new Int8Array(0);
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(livelyAdmin).upgradeTo(accessControlManagerTestSubject.address, typedArray1, false)
    //     )
    //       .to.emit(accessControlManagerProxy, "Upgraded")
    //       .withArgs(adminAddress, accessControlManagerProxy.address, accessControlManagerTestSubject.address);
    //
    //     accessControlManagerTestProxy = accessControlManagerTestSubject.attach(accessControlManagerProxy.address);
    //     await accessControlManagerTestProxy.connect(livelyAdmin).initialize();
    //     expect(await accessControlManagerTestProxy.initVersion()).to.be.equal(2);
    //   });
    //
    //   it("Should AccessControlManagerTest storage verification after upgrade success", async () => {
    //     const baseProxy_slot_0 = await readStorageSlot(accessControlManagerTestProxy.address, 0);
    //     const baseProxy_slot_1 = await readStorageSlot(accessControlManagerTestProxy.address, 1);
    //     const baseProxy_slot_2 = await readStorageSlot(accessControlManagerTestProxy.address, 2);
    //     const baseProxy_slot_3 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 0);
    //     const baseProxy_slot_4 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 1);
    //     const baseProxy_slot_67 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 64);
    //     const acm_RoleMap_slot_70 = await readStorageSlotHashMap(
    //       accessControlManagerTestProxy.address,
    //       LIVELY_ADMIN_ROLE,
    //       70
    //     );
    //     const acm_GroupMap_slot_72 = await readStorageSlotHashMap(
    //       accessControlManagerTestProxy.address,
    //       LIVELY_GENERAL_GROUP,
    //       72
    //     );
    //     const acm_dataCollection_slot_73 = await readStorageSlotStruct(accessControlManagerTestProxy.address, 68, 5);
    //     const acm_slot_74 = await readStorageSlot(accessControlManagerTestProxy.address, 74);
    //
    //     expect(baseProxy_slot_0).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
    //     expect(baseProxy_slot_1).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    //     expect(baseProxy_slot_2).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
    //     expect("0x" + baseProxy_slot_3.slice(26)).to.be.hexEqual(accessControlManagerProxy.address);
    //     expect(baseProxy_slot_4).to.be.hexEqual("0x".padEnd(64, "0"));
    //     expect(baseProxy_slot_67).to.be.hexEqual("0x".padEnd(64, "0"));
    //     expect(acm_RoleMap_slot_70).to.be.hexEqual(LIVELY_GENERAL_GROUP);
    //     expect(acm_GroupMap_slot_72.slice(0, acm_GroupMap_slot_72.length - 2)).to.be.equal(
    //       ethers.utils.formatBytes32String("LIVELY_GENERAL_GROUP").slice(0, acm_GroupMap_slot_72.length - 2)
    //     );
    //     expect(parseInt(acm_dataCollection_slot_73)).to.be.equal(100);
    //     expect(acm_slot_74).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UPDATE_TEST")));
    //   });
    // });
  });
