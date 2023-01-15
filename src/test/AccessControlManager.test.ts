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
  GlobalManager,
  GlobalManager__factory,
  IACLManager,
  IContextManagement,
  IDomainManagement,
  IFunctionManagement,
  IGlobalManagement,
  IMemberManagement,
  IPolicyManagement,
  IProxy,
  IRealmManagement,
  IRoleManagement,
  ITypeManagement,
  LACLManager,
  LACLManager__factory,
  LACLManagerTest,
  LACLManagerTest__factory,
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
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_ACL_DOMAIN_ID,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_AGENT_MASTER_TYPE_ID,
  LIVELY_VERSE_ANONYMOUS_TYPE_ID,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID,
  PolicyType,
  ProxySafeModeStatus,
  ProxyUpdatabilityStatus, ScopeType
} from "./TestUtils";
import { ProxyUpgradedEventObject } from "../../typechain/types/proxy/Proxy";
import { ProxyLocalAdminUpdatedEventObject } from "../../typechain/types/proxy/IProxy";
import {IACLCommons as IACLCommonsRoles } from "../../typechain/types/acl/agent/IRoleManagement";
import {IACLCommons} from "../../typechain/types/acl/scope/FunctionManager";
// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)
const { provider, deployMockContract } = waffle;

describe("AccessControlManager Tests",
  function() {
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
    let networkChainId: BigNumber;
    let aclRoleTestId: string;
    let aclRoleTestId2: string;
    let aclRoleGlobalAdminTestId: string;
    let aclTypeTestId: string;
    let aclPolicyTestId: string;
    let aclDomainTestId: string;
    let aclDomainTest2Id: string;
    let aclRealmTestId: string;
    const ACL_ROLE_TEST_NAME = "ACL_ROLE_TEST";
    const ACL_ROLE_TEST_NAME_2 = "ACL_ROLE_TEST_2";
    const ACL_ROLE_GLOBAL_ADMIN_TEST_NAME = "ACL_ROLE_GLOBAL_ADMIN_TEST";
    const ACL_TYPE_TEST_NAME = "ACL_TYPE_TEST";
    const ACL_POLICY_TEST_NAME = "ACL_POLICY_TEST";
    const ACL_DOMAIN_TEST_NAME = "ACL_DOMAIN_TEST";
    const ACL_DOMAIN_TEST_2_NAME = "ACL_DOMAIN_TEST_2";
    const ACL_REALM_TEST_NAME = "ACL_REALM_TEST";
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
      it("Should LACLManager deploy success", async () => {
        // given
        const aclFactory = new LACLManager__factory(systemAdmin);

        // when
        lACLManager = await aclFactory.deploy();

        // then
        expect(lACLManager.address).not.null;
        expect(await lACLManager.LIB_NAME()).to.be.equal("LACLManager");
        expect(await lACLManager.LIB_VERSION()).to.be.equal("3.0.0");
      });
    });

    describe("ACL Modules Subject Tests", function() {
      it("Should MemberManager subject deploy success", async() => {
        // given
        const memberManagerFactory = new MemberManager__factory(systemAdmin);

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
        const roleManagerFactory = new RoleManager__factory(systemAdmin);

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
        const typeManagerFactory = new TypeManager__factory(systemAdmin);

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
        const functionManagerFactory = new FunctionManager__factory(systemAdmin);

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
        const contextManagerFactory = new ContextManager__factory(systemAdmin);

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
        const realmManagerFactory = new RealmManager__factory(systemAdmin);

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
        const domainManagerFactory = new DomainManager__factory(systemAdmin);

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

      it("Should GlobalManager subject deploy success", async() => {
        // given
        const globalManagerFactory = new GlobalManager__factory(systemAdmin);

        // when
        globalManagerSubject = await globalManagerFactory.deploy();

        // then
        expect(globalManagerSubject.address).not.null;
        expect(await globalManagerSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await globalManagerSubject.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(await globalManagerSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await globalManagerSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await globalManagerSubject.initVersion()).to.be.equal(0);
      })

      it("Should PolicyManager subject deploy success", async() => {
        // given
        const policyManagerFactory = new PolicyManager__factory(systemAdmin);

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

    describe("ACLManager Subject Tests", function() {
      this.beforeAll(() => {
        linkLibraryAddresses = {
          "src/contracts/lib/acl/LACLManager.sol:LACLManager": lACLManager.address
        };
      });

      it("Should ACLManager subject deploy success", async () => {
        // given
        const aclManagerFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);

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
        const aclManagerSubjectFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
        const proxyFactory = new ACLManagerProxy__factory(systemAdmin);
        aclManagerSubject = await aclManagerSubjectFactory.deploy();

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
            LACLManager: lACLManager.address,
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
        expect(await aclManager.getLibrary()).to.be.equal(lACLManager.address);

        let proxyInfo: IProxy.ProxyInfoStruct = await aclManager.proxyInfo();
        expect(proxyInfo.name).to.be.equal(ACL_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(aclManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManager.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1);

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
        await expect(aclManagerProxy.proxiableUUID()).to.be.revertedWith("Illegal Delegatecall");
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
        await expect(aclManagerProxy.connect(user1).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED)).to.be.revertedWith(
          "Forbidden"
        );
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

        let proxyInfo: IProxy.ProxyInfoStruct = await memberManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(MEMBER_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(memberManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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
        let proxyInfo: IProxy.ProxyInfoStruct = await roleManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(ROLE_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(roleManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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
        let proxyInfo: IProxy.ProxyInfoStruct = await typeManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(TYPE_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(typeManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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
        let proxyInfo: IProxy.ProxyInfoStruct = await functionManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(FUNCTION_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(functionManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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
        let proxyInfo: IProxy.ProxyInfoStruct = await contextManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(CONTEXT_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(contextManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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

        let proxyInfo: IProxy.ProxyInfoStruct = await realmManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(REALM_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(realmManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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

        let proxyInfo: IProxy.ProxyInfoStruct = await domainManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(DOMAIN_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(domainManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
      });

      it("Should GlobalManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(GlobalManager__factory.abi);
        const data = iface.encodeFunctionData("initialize", [
          GLOBAL_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          aclManagerProxy.address,
        ]);

        // when
        const proxy = await proxyFactory.deploy(globalManagerSubject.address, data);
        await proxy.deployTransaction.wait();

        // then
        globalManagerProxy = globalManagerSubject.attach(proxy.address);
        const domainSeparator = generateDomainSeparator(
          GLOBAL_MANAGER_CONTRACT_NAME,
          CONTRACTS_VERSION,
          globalManagerProxy.address,
          networkChainId
        );

        let proxyInfo: IProxy.ProxyInfoStruct = await globalManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(GLOBAL_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(globalManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
      });

      it("Should PolicyManager proxy deploy success", async () => {
        // given
        const proxyFactory = new ACLProxy__factory(systemAdmin);
        const iface = new ethers.utils.Interface(PolicyManager__factory.abi);
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

        let proxyInfo: IProxy.ProxyInfoStruct = await policyManagerProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(POLICY_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(policyManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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

        let proxyInfo: IProxy.ProxyInfoStruct = await accessControlProxy.proxyInfo();
        expect(proxyInfo.name).to.be.equal(ACCESS_CONTROL_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(accessControlSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1)
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
        await aclManagerProxy.connect(systemAdmin).initACL(
          contextManagerProxy.address,
          functionManagerProxy.address,
          livelyAdminWallet.address,
          systemAdminWallet.address
        );

        // then
        expect(await aclManagerProxy.getFirstInit()).to.be.equal(firstInit);
      })

      it("Should facets register to ACLManager by systemAdmin success", async() => {

        // given
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
            // interfaceId: "0x22253c22",
            subjectId: memberManagerSubject.address,
            selectors: [
              memberIface.getSighash("memberRegister"),
              memberIface.getSighash("memberUpdateActivityStatus"),
              memberIface.getSighash("memberUpdateAlterabilityStatus"),
              memberIface.getSighash("memberUpdateAdmin"),
              memberIface.getSighash("memberUpdateTypeLimit"),
              memberIface.getSighash("memberUpdateFactoryLimit"),
              memberIface.getSighash("memberUpdateCallLimit"),
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
            // interfaceId: "0x16588498",
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
            // interfaceId: "0x2e57eaef",
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
            // interfaceId: "0x671c16c8",
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
            facetId: functionManagerProxy.address,
            // interfaceId: "0xc0c62eda",
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
            // interfaceId: "0x61fafd78",
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
            // interfaceId: "0x6e7231bc",
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
            // interfaceId: "0xeb2ec751",
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
            // interfaceId: "0x7ff2fd24",
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
            // interfaceId: "0x7cf5145b",
            subjectId: accessControlSubject.address,
            selectors: [
              accessControlIface.getSighash("hasAccess"),
              accessControlIface.getSighash("hasMemberAccess"),
              accessControlIface.getSighash("hasCSAccess"),
              accessControlIface.getSighash("hasAccountAccess"),
              // accessControlIface.getSighash("hasAccessToAgent"),
              // accessControlIface.getSighash("hasMemberAccessToAgent"),
              // accessControlIface.getSighash("hasCSAccessToAgent"),
              // accessControlIface.getSighash("hasAccountAccessToAgent"),
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

        await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests))
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, memberManagerProxy.address, memberManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, roleManagerProxy.address, roleManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, typeManagerProxy.address, typeManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, policyManagerProxy.address, policyManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, functionManagerProxy.address, functionManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, contextManagerProxy.address, contextManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, realmManagerProxy.address, realmManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, globalManagerProxy.address, globalManagerSubject.address)
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, accessControlProxy.address, accessControlSubject.address)

        // console.log(`aclManagerProxy => address: ${aclManagerProxy.address}, subject: ${aclManagerSubject.address}`);
        // console.log(`memberManagerProxy => address: ${memberManagerProxy.address}, subject: ${memberManagerSubject.address}`);
        // console.log(`roleManagerProxy => address: ${roleManagerProxy.address}, subject: ${roleManagerSubject.address}`);
        // console.log(`typeManagerProxy => address: ${typeManagerProxy.address}, subject: ${typeManagerSubject.address}`);
        // console.log(`policyManagerProxy => address: ${policyManagerProxy.address}, subject: ${policyManagerSubject.address}`);
        // console.log(`functionManagerProxy => address: ${functionManagerProxy.address}, subject: ${functionManagerSubject.address}`);
        // console.log(`contextManagerProxy => address: ${contextManagerProxy.address}, subject: ${contextManagerSubject.address}`);
        // console.log(`realmManagerProxy => address: ${realmManagerProxy.address}, subject: ${realmManagerSubject.address}`);
        // console.log(`domainManagerProxy => address: ${domainManagerProxy.address}, subject: ${domainManagerSubject.address}`);
        // console.log(`globalManagerProxy => address: ${globalManagerProxy.address}, subject: ${globalManagerSubject.address}`);
        // console.log(`accessControlProxy => address: ${accessControlProxy.address}, subject: ${accessControlSubject.address}`);

        // then
        expect(await aclManagerProxy.aclGetFacets()).to.be.eqls([
          aclManagerProxy.address,
          memberManagerProxy.address,
          roleManagerProxy.address,
          typeManagerProxy.address,
          policyManagerProxy.address,
          functionManagerProxy.address,
          contextManagerProxy.address,
          realmManagerProxy.address,
          domainManagerProxy.address,
          globalManagerProxy.address,
          accessControlProxy.address
        ])

        //
        // expect(await accessControlDelegateProxy.hasAccess())
        // expect(await accessControlDelegateProxy.hasMemberAccess())
        // expect(await accessControlDelegateProxy.hasCSAccess())
        // expect(await accessControlDelegateProxy.hasAccountAccess())
        // expect(await accessControlDelegateProxy.hasAccessToAgent())
        // expect(await accessControlDelegateProxy.hasMemberAccessToAgent())
        // expect(await accessControlDelegateProxy.hasCSAccessToAgent())
        // expect(await accessControlDelegateProxy.hasCSMAccessToAgent())
        // 0x46414ba0   =>     IACLManager
        // 0x7cf5145b   =>     IAccessControl
        // 0x671c16c8   =>     IPolicyManagement
        // 0xc0c62eda   =>     IFunctionManagement
        // 0x61fafd78   =>     IContextManagement
        // 0x6e7231bc   =>     IRealmManagement
        // 0xeb2ec751   =>     IDomainManagement
        // 0x7ff2fd24   =>     IGlobalManagement
        // 0x22253c22   =>     IMemberManagement
        // 0x16588498   =>     IRoleManagement
        // 0x2e57eaef   =>     ITypeManagement
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
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberManagerProxy.address,LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, globalManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, accessControlProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(contextManagerDelegateProxy, "ContextRegistered")
          .withArgs(systemAdminWallet.address, aclManagerContextId, aclManagerProxy.address, LIVELY_VERSE_ACL_REALM_ID,
            systemAdminWallet.address, ethers.constants.AddressZero, ethers.constants.AddressZero,
            LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await contextManagerDelegateProxy.contextCheckId(memberContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(roleContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(typeContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(realmContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(domainContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(globalContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(policyContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(aclManagerContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckId(accessControlContextId)).to.be.true;

        // and
        const memberContextInfo: IContextManagement.ContextInfoStruct = await contextManagerDelegateProxy.contextGetInfo(memberContextId);
        expect(memberContextInfo.name).to.be.equal(MEMBER_MANAGER_CONTRACT_NAME);
        expect(memberContextInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(memberContextInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(memberContextInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(memberContextInfo.contractId).to.be.equal(memberManagerProxy.address);
        expect(memberContextInfo.realmId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(memberContextInfo.agentLimit).to.be.equal(4294967295);
        expect(memberContextInfo.functionLimit).to.be.equal(65535);
        expect(memberContextInfo.functionCount).to.be.equal(0);
        expect(memberContextInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberContextInfo.alstat).to.be.equal(AlterabilityStatus.UPGRADABLE);
        expect(memberContextInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register MemberManger functions by systemAdmin success", async() => {
        // given
        // const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
        const signer = new Int8Array(0);
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
        const memberUpdateCallLimitFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberUpdateCallLimit")]))
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
            agentLimit: 4294967295,
            policyCode: 255,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          },
          {
            adminId: LIVELY_VERSE_ACL_TYPE_ID,
            agentId: LIVELY_VERSE_ANY_TYPE_ID,
            selector:  memberIface.getSighash("memberUpdateActivityStatus"),
            agentLimit: 4294967295,
            policyCode: 96,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          },
          {
            adminId: LIVELY_VERSE_ACL_TYPE_ID,
            agentId: LIVELY_VERSE_ANY_TYPE_ID,
            selector:  memberIface.getSighash("memberUpdateAlterabilityStatus"),
            agentLimit: 4294967295,
            policyCode: 130,
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
            policyCode: 46,
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
            adminId: LIVELY_VERSE_ACL_TYPE_ID,
            agentId: LIVELY_VERSE_ANY_TYPE_ID,
            selector:  memberIface.getSighash("memberUpdateCallLimit"),
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
            freq: memberFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(memberFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateTypeLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateFactoryLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, memberUpdateCallLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, memberContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(memberContextId, memberRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(memberRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(memberContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(memberIface.getSighash("memberRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

      })

      it("Should register RoleManager functions by systemAdmin success", async() => {
        const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
        const roleContextId = ethers.utils.keccak256(roleManagerProxy.address);
        const signer = new Int8Array(0);
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
            selector: roleIface.getSighash("roleUpdateScope"),
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
            freq: roleFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleUpdateMemberLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleGrantMembersFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, roleRevokeMembersFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, roleContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(roleContextId, roleRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(roleRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(roleContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(roleIface.getSighash("roleRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register TypeManager functions by systemAdmin success", async() => {
        const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
        const typeContextId = ethers.utils.keccak256(typeManagerProxy.address);
        const signer = new Int8Array(0);
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
            selector: typeIface.getSighash("typeUpdateScope"),
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
            freq: typeFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(typeFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_AGENT_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, typeUpdateRoleLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, typeContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(typeContextId, typeRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(typeRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(typeContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(typeIface.getSighash("typeRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register FunctionManager functions by systemAdmin success", async() => {
        const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
        const functionContextId = ethers.utils.keccak256(functionManagerProxy.address);
        const signer = new Int8Array(0);
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

        const functionFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: functionFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAgentFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdatePolicyFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, functionUpdateAgentLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, functionContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(functionContextId, functionUpdateAdminFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(functionUpdateAdminFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(functionContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(functionIface.getSighash("functionUpdateAdmin"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ContextManager functions by systemAdmin success", async() => {
        const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
        const contextContextId = ethers.utils.keccak256(contextManagerProxy.address);
        const signer = new Int8Array(0);
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

        const contextFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: contextFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(contextFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateFunctionLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, contextUpdateAgentLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, contextContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(contextContextId, contextUpdateActivityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(contextUpdateActivityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(contextContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(contextIface.getSighash("contextUpdateActivityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register RealmManager functions by systemAdmin success", async() => {
        const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        const signer = new Int8Array(0);
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

        const realmFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: realmFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(realmFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateContextLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, realmUpdateAgentLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, realmContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(realmContextId, realmRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(realmRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(realmContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(realmIface.getSighash("realmRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register DomainManager functions by systemAdmin success", async() => {
        const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
        const domainContextId = ethers.utils.keccak256(domainManagerProxy.address);
        const signer = new Int8Array(0);
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

        const domainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: domainFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(roleFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateRealmLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainUpdateAgentLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(domainContextId, domainRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
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

      it("Should register GlobalManager functions by systemAdmin success", async() => {
        const globalIface = new ethers.utils.Interface(GlobalManager__factory.abi);
        const globalContextId = ethers.utils.keccak256(globalManagerProxy.address);
        const signer = new Int8Array(0);
        // const globalUpdateActivityStatusFunctionId = ethers.utils.keccak256(
        //   ethers.utils.solidityPack(["address", "bytes4"],
        //     [globalManagerProxy.address,  globalIface.getSighash("globalUpdateActivityStatus")]));
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

        const globalFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: globalFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(globalFunctionRegisterRequest))
          // .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          // .withArgs(systemAdminWallet.address, globalContextId, globalUpdateActivityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
          //   LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, globalUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, globalUpdateAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, globalUpdateDomainLimitFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, globalUpdateAgentLimitFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, upgradeToFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, setLocalAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, globalContextId, withdrawBalanceFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(globalContextId, globalUpdateAlterabilityStatusFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(globalUpdateAlterabilityStatusFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(globalContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(globalIface.getSighash("globalUpdateAlterabilityStatus"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register ACLManager functions by systemAdmin success", async() => {
        const aclManagerIface = new ethers.utils.Interface(ACLManager__factory.abi);
        const aclContextId = ethers.utils.keccak256(aclManagerProxy.address);
        const signer = new Int8Array(0);
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
            freq: aclManagerFunctionRequests
          }
        ]

         // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(aclManagerFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, aclRegisterFacetFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, aclUpgradeFacetFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, upgradeToFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setLocalAdminFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, aclContextId, withdrawBalanceFunctionId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(aclContextId, aclRegisterFacetFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(aclRegisterFacetFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.contextId).to.be.equal(aclContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(aclManagerIface.getSighash("aclRegisterFacet"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register AccessControl functions by systemAdmin success", async() => {
        const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
        const accessControlContextId = ethers.utils.keccak256(accessControlProxy.address);
        const signer = new Int8Array(0);
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
            freq: accessControlFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(accessControlFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, accessControlContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(accessControlContextId, upgradeToFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(upgradeToFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_ADMIN_ROLE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(functionInfo.contextId).to.be.equal(accessControlContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentType).to.be.equal(AgentType.ROLE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(accessControlIface.getSighash("upgradeTo"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })

      it("Should register PolicyManager functions by systemAdmin success", async() => {
        const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
        const policyContextId = ethers.utils.keccak256(policyManagerProxy.address);
        const signer = new Int8Array(0);
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

        const policyFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
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
            freq: policyFunctionRequests
          }
        ]

        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(policyFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_POLICY_MASTER_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyAddRolesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyRemoveRolesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateCodesFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateAdminFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateScopeFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateActivityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdateAlterabilityStatusFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, policyUpdatesRoleLimitFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_ANY_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, upgradeToFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setSafeModeStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setUpdatabilityStatusFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setLocalAdminFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, setAccessControlManagerFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,signer)
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, policyContextId, withdrawBalanceFunctionId, LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            LIVELY_VERSE_ACL_TYPE_ID,signer)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(policyContextId, policyRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(policyRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(policyContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(policyIface.getSighash("policyRegister"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);
      })
    })

    describe("ACLManager proxy base function Tests", function() {
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
        const aclManagerSubjectFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
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
        const aclManagerSubjectFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
        aclManagerSubject = await aclManagerSubjectFactory.deploy();
        const typedArray1 = new Int8Array(0);

        // when and then
        await expect(
          aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
        )
          .to.emit(aclManagerProxy, "ProxyUpgraded")
          .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerSubject.address);

        expect(await aclManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
      });

      it("Should set enable of updatability proxy success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclManagerProxy.address, ProxyUpdatabilityStatus.ENABLED);
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

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(typeRegisterRequests))
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

      it("Should set enable of updatability proxy success", async () => {
        // when and then
        await expect(aclManagerProxy.connect(livelyAdmin).setUpdatabilityStatus(ProxyUpdatabilityStatus.ENABLED))
          .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclManagerProxy.address, ProxyUpdatabilityStatus.ENABLED);
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
      it("Should register ACL_TYPE_TEST success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const typeRegisterRequests: ITypeManagement.TypeRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: realmContextId,
            roleLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_TYPE_TEST_NAME,
          }
        ]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeRegister(typeRegisterRequests)).
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
        expect(typeInfo.roleLimit).to.be.equal(1);
        expect(typeInfo.roleCount).to.be.equal(0);
        expect(typeInfo.atype).to.be.equal(AgentType.TYPE);
        expect(typeInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(typeInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);

        // and
        expect(await typeManagerDelegateProxy.typeCheckId(aclTypeTestId)).to.be.true;
        expect(await typeManagerDelegateProxy.typeCheckName(ACL_TYPE_TEST_NAME)).to.be.true;
        expect(await typeManagerDelegateProxy.typeCheckAdmin(aclTypeTestId, livelyAdminWallet.address)).to.be.true;
      })

      it("Should update scope ACL_TYPE_TEST failed", async() => {
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

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(requests))
          .to.revertedWith("Illegal ScopeType");
      })

      it("Should update scope ACL_TYPE_TEST success", async() => {
        // given
        aclTypeTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_TYPE_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclTypeTestId,
            scopeId: LIVELY_VERSE_ACL_REALM_ID
          }
        ]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateScope(requests))
          .to.emit(typeManagerDelegateProxy, "TypeScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, LIVELY_VERSE_ACL_REALM_ID)
      })

      it("Should disable type alterability of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclTypeTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAlterabilityStatus(requests))
          .to.emit(typeManagerDelegateProxy, "TypeAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, AlterabilityStatus.DISABLED)
      })

      it("Should update admin of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateRoleLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of ACL_TYPE_TEST when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclTypeTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update type alterability of ACL_TYPE_TEST success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclTypeTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAlterabilityStatus(requests))
          .to.emit(typeManagerDelegateProxy, "TypeAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should ACL_TYPE_TEST update admin success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclTypeTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(livelyAdmin).typeUpdateAdmin(updateAdminRequests))
          .to.emit(typeManagerDelegateProxy, "TypeAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclTypeTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await typeManagerDelegateProxy.typeCheckAdmin(aclTypeTestId,systemAdminWallet.address)).to.be.true;
      })

      it("Should register aclRoleTest in ACL type failed", async() => {
        // given
        aclRoleTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_ACL_DOMAIN_ID,
            typeId: aclTypeTestId,
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME
          }
        ]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(roleRegisterRequests)).
          to.revertedWith("Illegal Scope")
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

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(roleRegisterRequests)).
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
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_ROLE_TEST_NAME_2
          }
        ]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(roleRegisterRequests))
          .to.revertedWith("Illegal Register");
      })

      it("Should update roleLimit of ACL_TYPE_TEST failed", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 0
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeUpdateRoleLimit(requests))
          .revertedWith("Illegal Limit");

      })

      it("Should update roleLimit of ACL_TYPE_TEST success", async() => {
        // given
        const requests: ITypeManagement.TypeUpdateRoleLimitRequestStruct[] = [{
          typeId: aclTypeTestId,
          roleLimit: 5
        }]

        // when
        await expect(typeManagerDelegateProxy.connect(systemAdmin).typeUpdateRoleLimit(requests))
          .to.emit(typeManagerDelegateProxy, "TypeRoleLimitUpdated")
          .withArgs(systemAdminWallet.address, aclTypeTestId, 5)
      })

       it("Should register aclRoleTest2 in ACL type success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
            scopeId: memberContextId,
            typeId: aclTypeTestId,
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_ROLE_TEST_NAME_2
          }
        ]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRegister(roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleRegistered")
           .withArgs(systemAdminWallet.address, aclRoleTestId2, aclTypeTestId,
             LIVELY_VERSE_ACL_ADMIN_ROLE_ID, memberContextId)
       })

      it("Should disable alterability of aclRoleTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclRoleTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAlterabilityStatus(requests))
          .to.emit(roleManagerDelegateProxy, "RoleAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, AlterabilityStatus.DISABLED)
      })

      it("Should update scope aclRoleTest2 in ACL type success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        aclRoleTestId2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_TEST_NAME_2));
        const roleRegisterRequests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclRoleTestId2,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
          }
        ]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateScope(roleRegisterRequests))
          .to.emit(roleManagerDelegateProxy, "RoleScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId2, LIVELY_VERSE_ACL_REALM_ID)
      })

      it("Should update admin of aclRoleTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRoleTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateAdmin(updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclRoleTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update memberLimit of aclRoleTest when alterability disabled failed", async() => {
        // given
        const memberLimitRequests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleUpdateMemberLimit(memberLimitRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should grant member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleGrantMembers(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should revoke member to aclRoleTest when alterability disabled failed", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId1 ]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(systemAdmin).roleRevokeMembers(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should aclRoleTest register new member when alterability disabled failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberRegisterRequests))
          .to.revertedWith("Illegal Role Updatable");
      })

      it("Should update alterability of aclRoleTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclRoleTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAlterabilityStatus(requests))
          .to.emit(roleManagerDelegateProxy, "RoleAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should aclRoleTest register new member success", async() => {
        // given
        const roleMemberUserId1 =  ethers.utils.keccak256(userWallet1.address);
        const memberRegisterRequests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(memberRegisterRequests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(livelyAdminWallet.address, roleMemberUserId1, userWallet1.address,
            aclRoleTestId, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId1)).to.be.true;
        expect(await memberManagerDelegateProxy.memberCheckAccount(userWallet1.address)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId1);
        expect(memberInfo.account).to.be.equal(userWallet1.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.factoryLimit).to.be.equal(0);
        expect(memberInfo.callLimit).to.be.equal(1);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should aclRoleTest register same member failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet1.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberRegisterRequests))
          .revertedWith("Already Exist")
      })

      it("Should aclRoleTest grant members to aclRoleTestId role success", async() => {
        // given
        const livelyAdminId = ethers.utils.keccak256(livelyAdminWallet.address)
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

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, systemAdminId, LIVELY_VERSE_ACL_TYPE_ID)
          // .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          // .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, livelyAdminId, LIVELY_VERSE_ACL_TYPE_ID)
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, systemAdminId, aclTypeTestId)
          // .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          // .withArgs(livelyAdminWallet.address, aclRoleTestId, livelyAdminId, aclTypeTestId)
      })

      it("Should aclRoleTest register member with setAdmin failed", async() => {
        // given
        const memberRegisterRequests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberRegister(memberRegisterRequests))
          .revertedWith("Set Admin Forbidden")
      })

      it("Should aclRoleTest activity disabled with anyone failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateActivityStatus(requests))
          .to.revertedWith("Forbidden")
      })

      it("Should aclRoleTest activity disabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateActivityStatus(requests))
          .to.emit(roleManagerDelegateProxy, "RoleActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, ActivityStatus.DISABLED)
      })

      it("Should aclRoleTest activity enabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRoleTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateActivityStatus(requests))
          .to.emit(roleManagerDelegateProxy, "RoleActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, ActivityStatus.ENABLED)
      })

      it("Should aclRoleTest register userWallet2 success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberRegister(requests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(livelyAdminWallet.address, roleMemberUserId2, userWallet2.address, aclRoleTestId, aclRoleTestId)

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId2)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId2);
        expect(memberInfo.account).to.be.equal(userWallet2.address);
        expect(memberInfo.adminId).to.be.equal(aclRoleTestId);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.factoryLimit).to.be.equal(0);
        expect(memberInfo.callLimit).to.be.equal(1);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should update admin userWallet2 member success", async() => {
        // given
        const roleMemberUserId2 =  ethers.utils.keccak256(userWallet2.address);
        const requests: IACLCommons.UpdateAdminRequestStruct[] = [
          {
            id: roleMemberUserId2,
            adminId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(systemAdmin).memberUpdateAdmin(requests))
          .to.emit(memberManagerDelegateProxy, "MemberAdminUpdated")
          .withArgs(systemAdminWallet.address, roleMemberUserId2, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should aclRoleTest update admin success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRoleTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateAdmin(updateAdminRequests))
          .to.emit(roleManagerDelegateProxy, "RoleAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclRoleTestId, aclRoleTestId);

        // then
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId, userWallet1.address)).to.be.true;
        expect(await roleManagerDelegateProxy.roleCheckAdmin(aclRoleTestId, userWallet2.address)).to.be.true;
      })

      it("Should aclRoleTest register another member when meet limitation failed", async() => {
        // given
        const requests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(requests))
          .revertedWith("Illegal Register")
      })

      it("Should aclRoleTest update member limit failed", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 1
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateMemberLimit(requests))
          .revertedWith("Illegal Limit")
      })

      it("Should aclRoleTest update member limit with old admin failed", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 10
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleUpdateMemberLimit(requests))
          .revertedWith("Forbidden")
      })

      it("Should aclRoleTest update member limit success", async() => {
        // given
        const requests: IRoleManagement.RoleUpdateMemberLimitRequestStruct[] = [{
          roleId: aclRoleTestId,
          memberLimit: 5
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleUpdateMemberLimit(requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberLimitUpdated")
          .withArgs(userWallet1.address, aclRoleTestId, 5)
      })

      it("Should aclRoleTest register userWallet3 member failed", async() => {
        // given
        const requests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: aclRoleTestId,
            roleId: aclRoleTestId,
            account: userWallet2.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(requests))
          .to.revertedWith("CallForbidden()")
      })

      it("Should update callLimit of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 10
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateCallLimit(requests))
          .to.emit(memberManagerDelegateProxy, "MemberCallLimitUpdated")
          .withArgs(livelyAdminWallet.address, userId1, 10)
      })

      it("Should aclRoleTest register userWallet3 member success", async() => {
        // given
        const roleMemberUserId3 = ethers.utils.keccak256(userWallet3.address);
        const requests: IMemberManagement.MemberRegisterStruct[] = [
          {
            adminId: ethers.constants.HashZero,
            roleId: aclRoleTestId,
            account: userWallet3.address,
            typeLimit: 2,
            factoryLimit: 0,
            callLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE
          }
        ]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberRegister(requests))
          .to.emit(memberManagerDelegateProxy, "MemberRegistered")
          .withArgs(userWallet1.address, roleMemberUserId3, userWallet3.address, aclRoleTestId, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)

        // then
        expect(await memberManagerDelegateProxy.memberCheckId(roleMemberUserId3)).to.be.true;

        // and
        const memberInfo: IMemberManagement.MemberInfoStruct = await memberManagerDelegateProxy.memberGetInfo(roleMemberUserId3);
        expect(memberInfo.account).to.be.equal(userWallet3.address);
        expect(memberInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(memberInfo.atype).to.be.equal(AgentType.MEMBER);
        expect(memberInfo.typeCount).to.be.equal(1);
        expect(memberInfo.typeLimit).to.be.equal(2);
        expect(memberInfo.factoryLimit).to.be.equal(0);
        expect(memberInfo.callLimit).to.be.equal(1);
        expect(memberInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(memberInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
      })

      it("Should aclRoleTest revoke member with one type failed", async() => {
        // given
        const userId3 =  ethers.utils.keccak256(userWallet3.address);
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: aclRoleTestId,
          members: [ userId3]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(user1).roleRevokeMembers(requests))
          .revertedWith("Illegal Member")
      })

      it("Should aclRoleTest grant members to acl admin role success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          members: [userId1, userId2]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(requests))
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
        expect(await typeManagerDelegateProxy.typeGetRoles(aclTypeTestId)).to.be.eqls([aclRoleTestId, aclRoleTestId2]);
      })

      it("Should aclRoleTest revoke user1 from acl admin role success", async() => {
        // given
        const userId1 = ethers.utils.keccak256(userWallet1.address)
        const requests: IRoleManagement.RoleRevokeMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
          members: [ userId1]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRevokeMembers(requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberRevoked")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userId1, LIVELY_VERSE_ACL_TYPE_ID)

        // then
        expect(await roleManagerDelegateProxy.roleHasAccount(LIVELY_VERSE_ACL_ADMIN_ROLE_ID, userWallet1.address)).to.be.false;

        // and
        expect(await memberManagerDelegateProxy.memberHasType(userId1, LIVELY_VERSE_ACL_TYPE_ID)).to.be.false;
      })

      it("Should aclRoleTest grant members to system admin role to user2 failed", async() => {
        // given
        const userId2 = ethers.utils.keccak256(userWallet2.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
          members: [userId2]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(requests))
          .revertedWith("Illegal Member Types")
      })

      it("Should update member alterability of user1 failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.UPGRADABLE
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateAlterabilityStatus(requests))
          .revertedWith("Forbidden")
      })

      it("Should disable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAlterabilityStatus(requests))
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

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAdmin(updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update typeLimit of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 5
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateTypeLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update factoryLimit of user1 when alterability disabled failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 5
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateFactoryLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should updatable member alterability of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: userId1,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAlterabilityStatus(requests))
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

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateActivityStatus(requests))
          .to.emit(memberManagerDelegateProxy, "MemberActivityUpdated")
          .withArgs(livelyAdminWallet.address, userId1, ActivityStatus.DISABLED)
      })

      it("Should user1 update admin success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: userId1,
          adminId: aclRoleTestId
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(livelyAdmin).memberUpdateAdmin(updateAdminRequests))
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

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateActivityStatus(requests))
          .to.revertedWith("MemberActivityForbidden()")
      })

      it("Should user1 activity enable with user2 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: userId1,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(user2).memberUpdateActivityStatus(requests))
          .to.emit(memberManagerDelegateProxy, "MemberActivityUpdated")
          .withArgs(userWallet2.address, userId1, ActivityStatus.ENABLED)
      })

      it("Should update typeLimit of user1 failed", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 1
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateTypeLimit(requests))
          .revertedWith("Illegal Limit");

      })

      it("Should update typeLimit of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 5
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateTypeLimit(requests))
          .to.emit(memberManagerDelegateProxy, "MemberTypeLimitUpdated")
          .withArgs(userWallet1.address, userId1, 5)
      })

      it("Should update factoryLimit of user1 success", async() => {
        // given
        const userId1 =  ethers.utils.keccak256(userWallet1.address);
        const requests: IMemberManagement.MemberUpdateLimitRequestStruct[] = [{
          memberId: userId1,
          limit: 5
        }]

        // when
        await expect(memberManagerDelegateProxy.connect(user1).memberUpdateFactoryLimit(requests))
          .to.emit(memberManagerDelegateProxy, "MemberFactoryLimitUpdated")
          .withArgs(userWallet1.address, userId1, 5)
      })
    })

    describe("Policy Test", function() {
      it("Should register aclPolicyTest in ACL policy success", async() => {
        // given
        const realmContextId = ethers.utils.keccak256(realmManagerProxy.address);
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IPolicyManagement.PolicyRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: realmContextId,
            roleLimit: 1,
            policyCode: 80,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_POLICY_TEST_NAME
          }
        ]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyRegister(requests)).
        to.emit(policyManagerDelegateProxy, "PolicyRegistered")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, realmContextId,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, 80)

        // then
        expect(await policyManagerDelegateProxy.policyCheckId(aclPolicyTestId)).to.be.true

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfo(aclPolicyTestId);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(policyInfo.scopeId).to.be.equal(realmContextId);
        expect(policyInfo.roleLimit).to.be.equal(1);
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

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(requests)).
        to.revertedWith("Illegal ST")
      })

      it("Should update scope aclPolicyTest in ACL policy success", async() => {
        // given
        aclPolicyTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_POLICY_TEST_NAME));
        const requests: IACLCommonsRoles.UpdateScopeRequestStruct[] = [
          {
            id: aclPolicyTestId,
            scopeId: LIVELY_VERSE_ACL_REALM_ID,
          }
        ]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateScope(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyScopeUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, LIVELY_VERSE_ACL_REALM_ID)
      })

      it("Should disable alterability of aclPolicyTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclPolicyTestId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAlterabilityStatus(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, AlterabilityStatus.DISABLED)
      })

      it("Should update admin of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAdmin(updateAdminRequests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update policyCode of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 30
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateCodes(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateRoleLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should add roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should remove roles to aclPolicyTest when alterability disabled failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclPolicyTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclPolicyTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAlterabilityStatus(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should aclPolicyTest activity disabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, ActivityStatus.DISABLED)
      })

      it("Should aclPolicyTest activity enabled success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclPolicyTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateActivityStatus(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, ActivityStatus.ENABLED)
      })

      it("Should add adminId to aclPolicyTest self failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyAddRoles(requests))
          .revertedWith("Illegal Role")
      })

      it("Should update admin of aclPolicyTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateAdmin(updateAdminRequests))
          .to.emit(policyManagerDelegateProxy, "PolicyAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclPolicyTestId, aclRoleTestId);
      })

      it("Should add roles to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId2 ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyAddRoles(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleAdded")
          .withArgs(userWallet1.address, aclPolicyTestId, aclRoleTestId2);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId2)).to.be.true;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId2)).to.be.true;

        // and
        const policyInfo: IPolicyManagement.PolicyInfoStruct = await policyManagerDelegateProxy.policyGetInfoByRole(aclRoleTestId2);
        expect(policyInfo.name).to.be.equal(ACL_POLICY_TEST_NAME);
        expect(policyInfo.adminId).to.be.equal(aclRoleTestId);
        expect(policyInfo.scopeId).to.be.equal(LIVELY_VERSE_ACL_REALM_ID);
        expect(policyInfo.roleLimit).to.be.equal(1);
        expect(policyInfo.roleCount).to.be.equal(1);
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

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyAddRoles(requests))
          .revertedWith("Illegal Role")
      })
         it("Should update admin of aclPolicyTest to SYSTEM_MASTER_ADMIN_ROLE success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclPolicyTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(user1).policyUpdateAdmin(updateAdminRequests))
          .to.emit(policyManagerDelegateProxy, "PolicyAdminUpdated")
          .withArgs(userWallet1.address, aclPolicyTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
      })

      it("Should add roles to aclPolicyTest for limitation failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyAddRoles(requests))
          .revertedWith("Illegal Limit")
      })

      it("Should update role limit of aclPolicyTest for forbidden failed", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 0
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(livelyAdmin).policyUpdateRoleLimit(requests))
          .revertedWith("Forbidden")
      })

      it("Should update role limit of aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyUpdateRoleLimitRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roleLimit: 5
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateRoleLimit(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleLimitUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 5)
      })

      it("Should add roles to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyAddRoles(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleAdded")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, aclRoleTestId);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId)).to.be.true;
        expect(await policyManagerDelegateProxy.policyGetRoles(aclPolicyTestId)).to.be.eqls([aclRoleTestId2, aclRoleTestId])
      })

      it("Should remove roles to aclPolicyTest success", async() => {
        // given
        const requests: IPolicyManagement.PolicyAddRolesRequestStruct[] = [{
          policyId: aclPolicyTestId,
          roles: [ aclRoleTestId ]
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyRemoveRoles(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyRoleRemoved")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, aclRoleTestId);

        // then
        expect(await policyManagerDelegateProxy.policyCheckRole(aclRoleTestId)).to.be.false;
        expect(await policyManagerDelegateProxy.policyHasRole(aclPolicyTestId, aclRoleTestId)).to.be.false;
      })

      it("Should update policyCode of aclPolicyTest success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
              ethers.utils.solidityPack(["address", "bytes4"],
                [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IPolicyManagement.PolicyUpdateCodeRequestStruct[] = [{
          policyId: aclPolicyTestId,
          policyCode: 30
        }]

        // when
        await expect(policyManagerDelegateProxy.connect(systemAdmin).policyUpdateCodes(requests))
          .to.emit(policyManagerDelegateProxy, "PolicyCodeUpdated")
          .withArgs(systemAdminWallet.address, aclPolicyTestId, 30, PolicyType.SLOCK);

        // and
        expect(await policyManagerDelegateProxy.policyCheckAccess(aclPolicyTestId, memberRegisterFunctionId)).to.be.false
        expect(await policyManagerDelegateProxy.policyCheckRoleAccess(aclRoleTestId2, memberRegisterFunctionId)).to.be.false
      })
    })

    describe("Scope Test", function() {
      it("Should disable alterability of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAlterabilityStatus(requests))
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAdmin(requests))
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAgent(requests))
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdatePolicyCode(requests))
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update agentLimit of memberRegisterFunction when alterability disabled failed", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: memberRegisterFunctionId,
          agentLimit: 5
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAgentLimit(requests))
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAlterabilityStatus(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberRegisterFunctionId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, ActivityStatus.DISABLED)
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, ActivityStatus.ENABLED)

        // then
        expect(await functionManagerDelegateProxy.functionCheckSelector(memberManagerProxy.address, memberIface.getSighash("memberRegister"))).to.be.true;
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateAdmin(updateAdminRequests))
          .to.emit(functionManagerDelegateProxy, "FunctionAdminUpdated")
          .withArgs(livelyAdminWallet.address, memberRegisterFunctionId, aclRoleTestId);

        // then
        expect(await functionManagerDelegateProxy.functionCheckAdmin(memberRegisterFunctionId,  userWallet2.address)).to.be.true;
      })

      it("Should update agent of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdateAgentRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          agentId: aclRoleTestId
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(user1).functionUpdateAgent(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAgentUpdated")
          .withArgs(userWallet1.address, memberRegisterFunctionId, aclRoleTestId);

        // then
        expect(await functionManagerDelegateProxy.functionCheckAgent(memberRegisterFunctionId,  userWallet2.address)).to.be.true;
      })

      it("Should update policyCode of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IFunctionManagement.FunctionUpdatePolicyRequestStruct[] = [{
          functionId: memberRegisterFunctionId,
          policyCode: 30
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(user1).functionUpdatePolicyCode(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionPolicyUpdated")
          .withArgs(userWallet1.address, memberRegisterFunctionId, 30);
      })

      it("Should update agentLimit of memberRegisterFunction success", async() => {
        // given
        const memberRegisterFunctionId = ethers.utils.keccak256(
          ethers.utils.solidityPack(["address", "bytes4"],
            [memberManagerProxy.address,  memberIface.getSighash("memberRegister")]));
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: memberRegisterFunctionId,
          agentLimit: 5
        }]

        // when
        await expect(functionManagerDelegateProxy.connect(user1).functionUpdateAgentLimit(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionAgentLimitUpdated")
          .withArgs(userWallet1.address, memberRegisterFunctionId, 5);

        // then
        expect(await functionManagerDelegateProxy.functionCheckId(memberRegisterFunctionId)).to.be.true;
        expect(await functionManagerDelegateProxy.functionCheckSelector(memberManagerProxy.address, memberIface.getSighash("memberRegister"))).to.be.true;
      })


      it("Should disable alterability of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberContextId,
          alstat: AlterabilityStatus.DISABLED
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAlterabilityStatus(requests))
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

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAdmin(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: memberContextId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update functionLimit of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IContextManagement.ContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 5
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateFunctionLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update agentLimit of memberContext when alterability disabled failed", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: memberContextId,
          agentLimit: 5
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAgentLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: memberContextId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAlterabilityStatus(requests))
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

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(requests))
          .to.emit(contextManagerDelegateProxy, "ContextActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, ActivityStatus.DISABLED)
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

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateActivityStatus(requests))
          .to.emit(contextManagerDelegateProxy, "ContextActivityUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, ActivityStatus.ENABLED)

        // then
        expect(await contextManagerDelegateProxy.contextHasSelector(memberManagerProxy.address,  memberIface.getSighash("memberRegister"))).to.be.true;
        expect(await contextManagerDelegateProxy.contextHasFunction(memberContextId, memberRegisterFunctionId)).to.be.true;

        // and
        const functionIds = await contextManagerDelegateProxy.contextGetFunctions(memberContextId);
        expect(functionIds.length).to.be.equal(13)
      })

      it("Should update admin of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: memberContextId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(livelyAdmin).contextUpdateAdmin(updateAdminRequests))
          .to.emit(contextManagerDelegateProxy, "ContextAdminUpdated")
          .withArgs(livelyAdminWallet.address, memberContextId, aclRoleTestId);

        // then
        expect(await contextManagerDelegateProxy.contextCheckAdmin(memberContextId,  userWallet2.address)).to.be.true;
      })

      it("Should update functionLimit of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IContextManagement.ContextUpdateFunctionLimitRequestStruct[] = [{
          contextId: memberContextId,
          functionLimit: 25
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(user1).contextUpdateFunctionLimit(requests))
          .to.emit(contextManagerDelegateProxy, "ContextFunctionLimitUpdated")
          .withArgs(userWallet1.address, memberContextId, 25);
      })


      it("Should update agentLimit of memberContext success", async() => {
        // given
        const memberContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: memberContextId,
          agentLimit: 5
        }]

        // when
        await expect(contextManagerDelegateProxy.connect(user1).contextUpdateAgentLimit(requests))
          .to.emit(contextManagerDelegateProxy, "ContextAgentLimitUpdated")
          .withArgs(userWallet1.address, memberContextId, 5);

        // then
        expect(await contextManagerDelegateProxy.contextCheckId(memberContextId)).to.be.true;
        expect(await contextManagerDelegateProxy.contextCheckAccount(memberManagerProxy.address)).to.be.true;
      })


      it("Should register aclDomainTest in ACL Domain success", async() => {
        // given
        aclDomainTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TEST_NAME));
        const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 1,
            agentLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_DOMAIN_TEST_NAME
          }
        ]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainRegister(requests)).
        to.emit(domainManagerDelegateProxy, "DomainRegistered")
          .withArgs(livelyAdminWallet.address, aclDomainTestId ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await domainManagerDelegateProxy.domainCheckId(aclDomainTestId)).to.be.true

        // and
        const domainInfo: IDomainManagement.DomainInfoStruct = await domainManagerDelegateProxy.domainGetInfo(aclDomainTestId);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_NAME);
        expect(domainInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.agentLimit).to.be.equal(1);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await domainManagerDelegateProxy.domainCheckId(aclDomainTestId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainCheckName(ACL_DOMAIN_TEST_NAME)).to.be.true;
        expect(await domainManagerDelegateProxy.domainCheckAdmin(aclDomainTestId, livelyAdminWallet.address)).to.be.true;
      })

      it("Should update admin of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclDomainTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update agentLimit of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: aclDomainTestId,
          agentLimit: 5
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAgentLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update roleLimit of aclDomainTest when alterability disabled failed", async() => {
        // given
        const requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 1
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateRealmLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclDomainTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAlterabilityStatus(requests))
          .to.emit(domainManagerDelegateProxy, "DomainAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(requests))
          .to.emit(domainManagerDelegateProxy, "DomainActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, ActivityStatus.DISABLED)
      })

      it("Should enable activity of aclDomainTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclDomainTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateActivityStatus(requests))
          .to.emit(domainManagerDelegateProxy, "DomainActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, ActivityStatus.ENABLED)
      })

      it("Should update admin of aclDomainTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclDomainTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(livelyAdmin).domainUpdateAdmin(updateAdminRequests))
          .to.emit(domainManagerDelegateProxy, "DomainAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclDomainTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await domainManagerDelegateProxy.domainCheckAdmin(aclDomainTestId,  systemAdminWallet.address)).to.be.true;
      })

      it("Should update agentLimit of aclDomainTest success", async() => {
        // given
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: aclDomainTestId,
          agentLimit: 5
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(systemAdmin).domainUpdateAgentLimit(requests))
          .to.emit(domainManagerDelegateProxy, "DomainAgentLimitUpdated")
          .withArgs(systemAdminWallet.address, aclDomainTestId, 5);

        // then
        expect(await domainManagerDelegateProxy.domainCheckId(aclDomainTestId)).to.be.true;
        expect(await domainManagerDelegateProxy.domainCheckName(ACL_DOMAIN_TEST_NAME)).to.be.true;
      })

      it("Should update roleLimit of aclDomainTest success", async() => {
        // given
        const requests: IDomainManagement.DomainUpdateRealmLimitRequestStruct[] = [{
          domainId: aclDomainTestId,
          realmLimit: 1
        }]

        // when
        await expect(domainManagerDelegateProxy.connect(systemAdmin).domainUpdateRealmLimit(requests))
          .to.emit(domainManagerDelegateProxy, "DomainRealmLimitUpdated")
          .withArgs(systemAdminWallet.address, aclDomainTestId, 1);
      })

      it("Should grant systemAdmin to scope master admin role success", async() => {
        // given
        const systemAdminId = ethers.utils.keccak256(systemAdminWallet.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID,
          members: [systemAdminId]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID, systemAdminId, LIVELY_VERSE_SCOPE_MASTER_TYPE_ID)
      })

      it("Should register aclRealmTest in ACL Domain success", async() => {
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
            agentLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_REALM_TEST_NAME
          }
        ]

        // when
        await expect(realmManagerDelegateProxy.connect(systemAdmin).realmRegister(requests)).
        to.emit(realmManagerDelegateProxy, "RealmRegistered")
          .withArgs(systemAdminWallet.address, aclRealmTestId , aclDomainTestId, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

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
        expect(realmInfo.agentLimit).to.be.equal(1);
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
        expect(contexts.length).to.be.equal(11)

      })

      it("Should update admin of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRealmTestId,
          adminId: aclRoleTestId
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update activity of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update agentLimit of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: aclRealmTestId,
          agentLimit: 5
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAgentLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update contextLimit of aclRealmTest when alterability disabled failed", async() => {
        // given
        const requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 1
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateContextLimit(requests))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateAlterabilityRequestStruct[] = [{
          id: aclRealmTestId,
          alstat: AlterabilityStatus.UPDATABLE
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAlterabilityStatus(requests))
          .to.emit(realmManagerDelegateProxy, "RealmAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, AlterabilityStatus.UPDATABLE)
      })

      it("Should disable activity of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.DISABLED
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(requests))
          .to.emit(realmManagerDelegateProxy, "RealmActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, ActivityStatus.DISABLED)
      })

      it("Should enable activity of aclRealmTest success", async() => {
        // given
        const requests: IACLCommonsRoles.UpdateActivityRequestStruct[] = [{
          id: aclRealmTestId,
          acstat: ActivityStatus.ENABLED
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateActivityStatus(requests))
          .to.emit(realmManagerDelegateProxy, "RealmActivityUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, ActivityStatus.ENABLED)
      })

      it("Should update admin of aclRealmTest success", async() => {
        // given
        const updateAdminRequests: IACLCommonsRoles.UpdateAdminRequestStruct[] = [{
          id: aclRealmTestId,
          adminId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(livelyAdmin).realmUpdateAdmin(updateAdminRequests))
          .to.emit(realmManagerDelegateProxy, "RealmAdminUpdated")
          .withArgs(livelyAdminWallet.address, aclRealmTestId, LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await realmManagerDelegateProxy.realmCheckAdmin(aclRealmTestId,systemAdminWallet.address)).to.be.true;
      })

      it("Should update agentLimit of aclRealmTest success", async() => {
        // given
        const requests: IACLCommons.ScopeUpdateAgentLimitRequestStruct[] = [{
          scopeId: aclRealmTestId,
          agentLimit: 5
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(systemAdmin).realmUpdateAgentLimit(requests))
          .to.emit(realmManagerDelegateProxy, "RealmAgentLimitUpdated")
          .withArgs(systemAdminWallet.address, aclRealmTestId, 5);

        // then
        expect(await realmManagerDelegateProxy.realmCheckId(aclRealmTestId)).to.be.true;
        expect(await realmManagerDelegateProxy.realmCheckName(ACL_REALM_TEST_NAME)).to.be.true;
      })

      it("Should update roleLimit of aclRealmTest success", async() => {
        // given
        const requests: IRealmManagement.RealmUpdateContextLimitRequestStruct[] = [{
          realmId: aclRealmTestId,
          contextLimit: 5
        }]

        // when
        await expect(realmManagerDelegateProxy.connect(systemAdmin).realmUpdateContextLimit(requests))
          .to.emit(realmManagerDelegateProxy, "RealmContextLimitUpdated")
          .withArgs(systemAdminWallet.address, aclRealmTestId, 5);
      })

      it("Should disable alterability of global scope success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateAlterabilityStatus(AlterabilityStatus.DISABLED))
          .to.emit(globalManagerDelegateProxy, "GlobalAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, AlterabilityStatus.DISABLED);
      })

      it("Should update admin of global scope when alterability disabled failed", async() => {

        // when
        await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateAdmin(aclRoleTestId))
          .revertedWith("Illegal Updatable")
      })

      // it("Should update activity of global scope when alterability disabled failed", async() => {
      //   // when
      //   await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateActivityStatus(ActivityStatus.DISABLED))
      //     .revertedWith("Illegal")
      // })

      it("Should update agentLimit of global scope when alterability disabled failed", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateAgentLimit(5))
          .revertedWith("Illegal Updatable")
      })

      it("Should update alterability of global scope success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateAlterabilityStatus(AlterabilityStatus.UPDATABLE))
          .to.emit(globalManagerDelegateProxy, "GlobalAlterabilityUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, AlterabilityStatus.UPDATABLE)
      })

      // it("Should disable activity of global scope success", async() => {
      //   // when
      //   await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateActivityStatus(ActivityStatus.DISABLED))
      //     .to.revertedWith("Illegal");
      // })

      it("Should register aclRoleGlobalAdminTest in LivelyMaster type success", async() => {
        // given
        aclRoleGlobalAdminTestId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_ROLE_GLOBAL_ADMIN_TEST_NAME));
        const roleRegisterRequests: IRoleManagement.RoleRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            scopeId: LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID,
            typeId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
            memberLimit: 2,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.UPDATABLE,
            name: ACL_ROLE_GLOBAL_ADMIN_TEST_NAME
          }
        ]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleRegister(roleRegisterRequests)).
        to.emit(roleManagerDelegateProxy, "RoleRegistered")
          .withArgs(livelyAdminWallet.address, aclRoleGlobalAdminTestId, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
            LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID)

      })

      it("Should grant systemAdmin to aclRoleGlobalAdminTest role success", async() => {
        // given
        const systemAdminId = ethers.utils.keccak256(systemAdminWallet.address)
        const requests: IRoleManagement.RoleGrantMembersRequestStruct[] = [{
          roleId: aclRoleGlobalAdminTestId,
          members: [systemAdminId]
        }]

        // when
        await expect(roleManagerDelegateProxy.connect(livelyAdmin).roleGrantMembers(requests))
          .to.emit(roleManagerDelegateProxy, "RoleMemberGranted")
          .withArgs(livelyAdminWallet.address, aclRoleGlobalAdminTestId, systemAdminId, LIVELY_VERSE_LIVELY_MASTER_TYPE_ID)
      })

      it("Should update admin of global scope to aclRoleGlobalAdminTestId success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(livelyAdmin).globalUpdateAdmin(aclRoleGlobalAdminTestId))
          .to.emit(globalManagerDelegateProxy, "GlobalAdminUpdated")
          .withArgs(livelyAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, aclRoleGlobalAdminTestId);

        // then
        expect(await globalManagerDelegateProxy.globalCheckAdmin(systemAdminWallet.address)).to.be.true;
      })

      it("Should update agentLimit of global scope success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(systemAdmin).globalUpdateAgentLimit(20))
          .to.emit(globalManagerDelegateProxy, "GlobalAgentLimitUpdated")
          .withArgs(systemAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, 20);
      })

      it("Should update domainLimit of global scope success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(systemAdmin).globalUpdateDomainLimit(5))
          .to.emit(globalManagerDelegateProxy, "GlobalDomainLimitUpdated")
          .withArgs(systemAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, 5);
      })

      it("Should update admin of global scope to LIVELY_MATER_ADMIN success", async() => {
        // when
        await expect(globalManagerDelegateProxy.connect(systemAdmin).globalUpdateAdmin(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID))
          .to.emit(globalManagerDelegateProxy, "GlobalAdminUpdated")
          .withArgs(systemAdminWallet.address, LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID, LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);

        // then
        expect(await globalManagerDelegateProxy.globalCheckAdmin(systemAdminWallet.address)).to.be.true;
        expect(await globalManagerDelegateProxy.globalGetDomains()).to.be.eqls([LIVELY_VERSE_ACL_DOMAIN_ID, aclDomainTestId]);

        // and
        const globalInfo: IGlobalManagement.GlobalInfoStruct = await globalManagerDelegateProxy.globalGetInfo();
        expect(globalInfo.id).to.be.equal(LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
        expect(globalInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(globalInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(globalInfo.agentLimit).to.be.equal(20);
        expect(globalInfo.domainLimit).to.be.equal(5);
        expect(globalInfo.domainCount).to.be.equal(2);
        expect(globalInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(globalInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(globalInfo.stype).to.be.equal(ScopeType.GLOBAL);
        expect(globalInfo.referredByAgent).to.be.equal(13);
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

        let proxyInfo: IProxy.ProxyInfoStruct = await domainManagerProxyTest.proxyInfo();
        expect(proxyInfo.name).to.be.equal(DOMAIN_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal("3.0.1");
        expect(proxyInfo.subject).to.be.equal(domainManagerSubjectTest.address);
        expect(proxyInfo.acl).to.be.equal(aclManagerProxy.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(2)
      });

      it("Should upgrade LACLManager proxy to another subject by systemAdmin success", async () => {

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
              domainIface.getSighash("domainRegister")
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
            // interfaceId: "0x431f7b2e",
            functions: domainFunctionUpgradeRequests,
          },
          {
            facetId: aclManagerProxy.address,
            subjectId: aclManagerSubjectTest.address,
            // interfaceId: "0xb7ffbf12",
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
        // expect(facetACLInfo.interfaceId).to.be.equal("0xb7ffbf12");

        // and
        const facetDomainInfo: IACLManager.FacetInfoStruct = await aclManagerProxy.aclGetFacetInfo(domainManagerProxy.address);
        expect(facetDomainInfo.subjectId).to.be.equal(domainManagerSubjectTest.address);
        // expect(facetDomainInfo.interfaceId).to.be.equal("0x431f7b2e");

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

        expect(await aclManagerProxy.updatabilityStatus()).to.be.equal(ProxyUpdatabilityStatus.DISABLED);
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

        // when
        await expect(functionManagerDelegateProxy.connect(livelyAdmin).functionUpdateActivityStatus(requests))
          .to.emit(functionManagerDelegateProxy, "FunctionActivityUpdated")
          .withArgs(livelyAdminWallet.address, domainRegisterFunctionId, ActivityStatus.DELETED)

        // then
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(domainIface.getSighash("domainRegister"));
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
            agentLimit: 4294967295,
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
            freq: domainFunctionRequests
          }
        ]

        // when
        await expect(functionManagerDelegateProxy.connect(systemAdmin).functionRegister(domainFunctionRegisterRequest))
          .to.emit(functionManagerDelegateProxy, "FunctionRegistered")
          .withArgs(systemAdminWallet.address, domainContextId, domainRegisterFunctionId, LIVELY_VERSE_ACL_TYPE_ID,
            LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,systemAdminWallet.address)

        // then
        expect(await contextManagerDelegateProxy.contextHasFunction(domainContextId, domainRegisterFunctionId)).to.be.true

        // and
        const functionInfo: IFunctionManagement.FunctionInfoStruct = await functionManagerDelegateProxy.functionGetInfo(domainRegisterFunctionId);
        expect(functionInfo.adminId).to.be.equal(LIVELY_VERSE_ACL_TYPE_ID);
        expect(functionInfo.agentId).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(functionInfo.contextId).to.be.equal(domainContextId);
        expect(functionInfo.adminType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentType).to.be.equal(AgentType.TYPE);
        expect(functionInfo.agentLimit).to.be.equal(4294967295);
        expect(functionInfo.policyCode).to.be.equal(0);
        expect(functionInfo.selector).to.be.equal(domainTestIface.getSighash("domainRegister2"));
        expect(functionInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(functionInfo.alstat).to.be.equal(AlterabilityStatus.UPDATABLE);
        expect(functionInfo.referredByAgent).to.be.equal(0);

        // and
        expect(await domainManagerDelegateProxyTest.domainHasContext(LIVELY_VERSE_ACL_DOMAIN_ID, domainContextId)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainHasFunction(LIVELY_VERSE_ACL_DOMAIN_ID, domainRegisterFunctionId)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainHasRealm(LIVELY_VERSE_ACL_DOMAIN_ID, LIVELY_VERSE_ACL_REALM_ID)).to.be.true;

        // and
        expect(await aclManagerProxy.supportsInterface("0x431f7b2e")).to.be.true
      })

      it("Should call domainRegister2 by aclAdmin success", async() => {
        // given
        aclDomainTest2Id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ACL_DOMAIN_TEST_2_NAME));
        const requests: IDomainManagement.DomainRegisterRequestStruct[] = [
          {
            adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
            realmLimit: 1,
            agentLimit: 1,
            acstat: ActivityStatus.ENABLED,
            alstat: AlterabilityStatus.DISABLED,
            name: ACL_DOMAIN_TEST_2_NAME
          }
        ]

        // when
        await expect(domainManagerDelegateProxyTest.connect(livelyAdmin).domainRegister2(requests)).
        to.emit(domainManagerDelegateProxyTest, "DomainRegistered")
          .withArgs(livelyAdminWallet.address, aclDomainTest2Id ,LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)

        // then
        expect(await domainManagerDelegateProxyTest.domainCheckId(aclDomainTest2Id)).to.be.true

        // and
        const domainInfo: IDomainManagement.DomainInfoStruct = await domainManagerDelegateProxyTest.domainGetInfo(aclDomainTest2Id);
        expect(domainInfo.name).to.be.equal(ACL_DOMAIN_TEST_2_NAME);
        expect(domainInfo.adminId).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(domainInfo.adminType).to.be.equal(AgentType.ROLE);
        expect(domainInfo.realmLimit).to.be.equal(1);
        expect(domainInfo.realmCount).to.be.equal(0);
        expect(domainInfo.agentLimit).to.be.equal(1);
        expect(domainInfo.referredByAgent).to.be.equal(0);
        expect(domainInfo.stype).to.be.equal(ScopeType.DOMAIN);
        expect(domainInfo.acstat).to.be.equal(ActivityStatus.ENABLED);
        expect(domainInfo.alstat).to.be.equal(AlterabilityStatus.DISABLED);

        // and
        expect(await domainManagerDelegateProxyTest.domainCheckId(aclDomainTest2Id)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainCheckName(ACL_DOMAIN_TEST_2_NAME)).to.be.true;
        expect(await domainManagerDelegateProxyTest.domainCheckAdmin(aclDomainTest2Id, livelyAdminWallet.address)).to.be.true;
      })
    })

    describe("IAccessControl Tests", async() => {
      it("Should all functions called success", async() => {

        expect(await accessControlDelegateProxy.getAnonymousType()).to.be.equal(LIVELY_VERSE_ANONYMOUS_TYPE_ID);
        expect(await accessControlDelegateProxy.getAnyType()).to.be.equal(LIVELY_VERSE_ANY_TYPE_ID);
        expect(await accessControlDelegateProxy.getScopeMasterType()).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getAgentMasterType()).to.be.equal(LIVELY_VERSE_AGENT_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getSystemMasterType()).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getLivelyMasterType()).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getPolicyMasterType()).to.be.equal(LIVELY_VERSE_POLICY_MASTER_TYPE_ID);
        expect(await accessControlDelegateProxy.getGlobalScope()).to.be.equal(LIVELY_VERSE_LIVELY_GLOBAL_SCOPE_ID);
        expect(await accessControlDelegateProxy.getLivelyMasterAdminRole()).to.be.equal(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID);
        expect(await accessControlDelegateProxy.getScopeMasterAdminRole()).to.be.equal(LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID);
        expect(await accessControlDelegateProxy.getAgentMasterAdminRole()).to.be.equal(LIVELY_VERSE_AGENT_MASTER_ADMIN_ROLE_ID);
        expect(await accessControlDelegateProxy.getSystemMasterAdminRole()).to.be.equal(LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID);
        expect(await accessControlDelegateProxy.getPolicyMasterAdminRole()).to.be.equal(LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID);
        expect(await accessControlDelegateProxy.isAgentExist(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)).to.be.true;
        expect(await accessControlDelegateProxy.isScopeExist(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.true;
        expect(await accessControlDelegateProxy.getScopeBaseInfo(LIVELY_VERSE_ACL_DOMAIN_ID)).to.be.not.empty;
        expect(await accessControlDelegateProxy.getAgentBaseInfo(LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID)).to.be.not.empty;
      })
    })



    // describe("IGroupManagement Tests", function() {
    //   it("Should register new group by user1 failed", async () => {
    //     // when and then
    //     await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true)).to.revertedWith(
    //       "RegisterGroup Access Denied"
    //     );
    //   });
    //
    //   it("Should disable status LIVELY_GENERAL_GROUP by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false)
    //     ).to.revertedWith("SetGroupStatus Access Denied");
    //   });
    //
    //   it("Should disable status LIVELY_GENERAL_GROUP by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "GroupStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, false);
    //
    //     // and
    //     const [name, status] = await accessControlManagerProxy.getGroupInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //     );
    //     expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
    //     expect(status).to.be.false;
    //   });
    //
    //   it("Should register INOVERS_GROUP group by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true)).to.revertedWith(
    //       "RegisterGroup Access Denied"
    //     );
    //   });
    //
    //   it("Should enable status LIVELY_GENERAL_GROUP by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "GroupStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, true);
    //
    //     // then
    //     const [name, status] = await accessControlManagerProxy.getGroupInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //     );
    //     expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
    //     expect(status).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
    //         LIVELY_ADMIN_ROLE
    //       )
    //     ).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelyGeneralGroup(LIVELY_ADMIN_ROLE)).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isLivelyGeneralGroup(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const groupRoles = await accessControlManagerProxy.getGroupRoles(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //     );
    //     expect(groupRoles.length).to.be.equal(2);
    //   });
    //
    //   it("Should register INOVERS_GROUP group by livelyAdmin success", async () => {
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).registerGroup("INOVERS_GROUP", true))
    //       .to.emit(accessControlManagerProxy, "GroupRegistered")
    //       .withArgs(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         adminAddress,
    //         "INOVERS_GROUP",
    //         true
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.isGroupExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isGroupEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should disable status INOVERS_GROUP by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), false)
    //     ).to.revertedWith("SetGroupStatus Access Denied");
    //   });
    // });
    //
    // describe("IRoleManagement Tests", function() {
    //   it("Should new register role by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true)
    //     ).to.revertedWith("RegisterRole Access Denied");
    //   });
    //
    //   it("Should grant LIVELY_ADMIN_ROLE role to user2 by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(user1).grantRoleAccount(LIVELY_ADMIN_ROLE, userAddress2)
    //     ).to.revertedWith("GrantRoleAccount Access Denied");
    //   });
    //
    //   it("Should revoke livelyAdmin account from LIVELY_ADMIN_ROLE by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(user1).revokeRoleAccount(LIVELY_ADMIN_ROLE, adminAddress)
    //     ).to.revertedWith("RevokeRoleAccount Access Denied");
    //   });
    //
    //   it("Should revoke livelyAdmin account from LIVELY_ADMIN_ROLE by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(livelyAdmin).revokeRoleAccount(LIVELY_ADMIN_ROLE, adminAddress)
    //     ).to.revertedWith("Illegal Revoke Role Account");
    //   });
    //
    //   it("Should disable status of LIVELY_ADMIN_ROLE role by user1 failed", async () => {
    //     // when and then
    //     await expect(accessControlManagerProxy.connect(user1).setRoleStatus(LIVELY_ADMIN_ROLE, false)).to.revertedWith(
    //       "SetRoleStatus Access Denied"
    //     );
    //   });
    //
    //   it("Should change group of LIVELY_ADMIN_ROLE role by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setRoleGroup(LIVELY_ADMIN_ROLE, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))
    //     ).to.revertedWith("SetRoleGroup Access Denied");
    //   });
    //
    //   it("Should disable status of LIVELY_ADMIN_ROLE role by livelyAdmin failed", async () => {
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).setRoleStatus(LIVELY_ADMIN_ROLE, false)).to.revertedWith(
    //       "Illegal Change Role Status"
    //     );
    //   });
    //
    //   it("Should grant new account to role of LIVELY_ANONYMOUS_ROLE role by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")), userAddress2)
    //     ).to.revertedWith("Illegal Grant Anonymous Role");
    //   });
    //
    //   it("Should get role info of LIVELY_ADMIN_ROLE success", async () => {
    //     // when
    //     const [name, group, status] = await accessControlManagerProxy.getRoleInfo(LIVELY_ADMIN_ROLE);
    //
    //     // then
    //     expect(name).to.be.equal("LIVELY_ADMIN_ROLE");
    //     expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
    //     expect(status).to.be.true;
    //
    //     // and
    //     expect(await accessControlManagerProxy.hasRoleAccount(LIVELY_ADMIN_ROLE, adminAddress)).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelyAdminRole(adminAddress)).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelySystemAdminRole(adminAddress)).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
    //         userAddress1
    //       )
    //     ).to.be.false;
    //     expect(await accessControlManagerProxy.isLivelyAdminRole(userAddress1)).to.be.false;
    //     expect(await accessControlManagerProxy.isLivelySystemAdminRole(userAddress2)).to.be.false;
    //   });
    //
    //   it("Should get role info of LIVELY_SYSTEM_ADMIN_ROLE success", async () => {
    //     // when
    //     const [name, group, status] = await accessControlManagerProxy.getRoleInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
    //     );
    //
    //     // then
    //     expect(name).to.be.equal("LIVELY_SYSTEM_ADMIN_ROLE");
    //     expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
    //     expect(status).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
    //         adminAddress
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
    //         userAddress1
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should register new TESTER_ROLE role by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleRegistered")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         "TESTER_ROLE",
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         true
    //       );
    //
    //     // then
    //     const [name, group, status] = await accessControlManagerProxy.getRoleInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //     );
    //     expect(name).to.be.equal("TESTER_ROLE");
    //     expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")));
    //     expect(status).to.be.true;
    //   });
    //
    //   it("Should grant TESTER_ROLE role to user1 by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleAccountGranted")
    //       .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1);
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         userAddress1
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //     );
    //     expect(roleAccounts.length).to.be.equal(1);
    //   });
    //
    //   it("Should revoke TESTER_ROLE role from user1 by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .revokeRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleAccountRevoked")
    //       .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1);
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         userAddress1
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //     );
    //     expect(roleAccounts.length).to.be.equal(0);
    //   });
    //
    //   it("Should grant TESTER_ROLE role to user2 by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleAccountGranted")
    //       .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2);
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         userAddress2
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //     );
    //     expect(roleAccounts.length).to.be.equal(1);
    //   });
    //
    //   it("Should disable status of TESTER_ROLE role by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleStatusChanged")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         false
    //       );
    //   });
    //
    //   it("Should enable status of TESTER_ROLE role by user2 failed", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user2)
    //         .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true)
    //     ).to.revertedWith("SetRoleStatus Access Denied");
    //   });
    //
    //   it("Should enable status of TESTER_ROLE role by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleStatusChanged")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         true
    //       );
    //   });
    //
    //   it("Should change group of TESTER_ROLE role to LIVELY_GENERAL_GROUP by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRoleGroup(
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleGroupChanged")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     const groupRoles = await accessControlManagerProxy.getGroupRoles(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //     );
    //     expect(groupRoles.length).to.be.equal(3);
    //   });
    //
    //   it("Should change group of TESTER_ROLE role to INOVERS_GROUP by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRoleGroup(
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "RoleGroupChanged")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.hasGroupRole(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const groupRoles = await accessControlManagerProxy.getGroupRoles(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
    //     );
    //     expect(groupRoles.length).to.be.equal(2);
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isGroupEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should batch register new TESTER_ROLE_1, TESTER_ROLE_2 role by livelyAdmin success", async () => {
    //     // given
    //     const registerRoleRequest: IRoleManagement.RegisterRoleRequestStruct[] = [
    //       {
    //         name: "TESTER_ROLE_1",
    //         group: LIVELY_ASSET_GROUP,
    //         status: true
    //       },
    //       {
    //         name: "TESTER_ROLE_2",
    //         group: LIVELY_ASSET_GROUP,
    //         status: true
    //       }
    //     ];
    //
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).batchRegisterRole(registerRoleRequest))
    //       .to.emit(accessControlManagerProxy, "RoleRegistered")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
    //         "TESTER_ROLE_1",
    //         LIVELY_ASSET_GROUP,
    //         true
    //       )
    //       .emit(accessControlManagerProxy, "RoleRegistered")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
    //         "TESTER_ROLE_2",
    //         LIVELY_ASSET_GROUP,
    //         true
    //       );
    //
    //     // then
    //     const [name1, group1, status1] = await accessControlManagerProxy.getRoleInfo(
    //       ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"]))
    //     );
    //     const [name2, group2, status2] = await accessControlManagerProxy.getRoleInfo(
    //       ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"]))
    //     );
    //     expect(name1).to.be.equal("TESTER_ROLE_1");
    //     expect(group1).to.be.hexEqual(LIVELY_ASSET_GROUP);
    //     expect(status1).to.be.true;
    //     expect(name2).to.be.equal("TESTER_ROLE_2");
    //     expect(group2).to.be.hexEqual(LIVELY_ASSET_GROUP);
    //     expect(status2).to.be.true;
    //   });
    //
    //   it("Should batch grant TESTER_ROLE_1 role to user1 and grant TESTER_ROLE_2 role to user2 by livelyAdmin success", async () => {
    //     // given
    //     const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
    //       {
    //         role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
    //         account: userAddress1
    //       },
    //       {
    //         role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
    //         account: userAddress2
    //       }
    //     ];
    //
    //     // when and then
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).batchGrantRoleAccount(batchGrantRequest))
    //       .to.emit(accessControlManagerProxy, "RoleAccountGranted")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
    //         userAddress1
    //       )
    //       .emit(accessControlManagerProxy, "RoleAccountGranted")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
    //         userAddress2
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1")),
    //         userAddress1
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2")),
    //         userAddress2
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const roleAccounts1 = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1"))
    //     );
    //     expect(roleAccounts1.length).to.be.equal(1);
    //
    //     // and
    //     const roleAccounts2 = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2"))
    //     );
    //     expect(roleAccounts2.length).to.be.equal(1);
    //   });
    //
    //   it("Should batch revoke TESTER_ROLE_1 role from user1 and grant TESTER_ROLE_2 role from user2 by livelyAdmin success", async () => {
    //     // given
    //     const batchRevokeRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
    //       {
    //         role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
    //         account: userAddress1
    //       },
    //       {
    //         role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
    //         account: userAddress2
    //       }
    //     ];
    //
    //     // when and then
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).batchRevokeRoleAccount(batchRevokeRequest))
    //       .to.emit(accessControlManagerProxy, "RoleAccountRevoked")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
    //         userAddress1
    //       )
    //       .emit(accessControlManagerProxy, "RoleAccountRevoked")
    //       .withArgs(
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
    //         userAddress2
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1")),
    //         userAddress1
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasRoleAccount(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2")),
    //         userAddress2
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     const roleAccounts1 = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1"))
    //     );
    //     expect(roleAccounts1.length).to.be.equal(0);
    //
    //     // and
    //     const roleAccounts2 = await accessControlManagerProxy.getRoleAccounts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2"))
    //     );
    //     expect(roleAccounts2.length).to.be.equal(0);
    //   });
    // });
    //
    // describe("IRealmManagement Tests", function() {
    //   it("Should disable upgrade of LIVELY_GENERAL_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should disable proxy upgrade with setUpgradeStatus by livelyAdmin failed", async () => {
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).setUpgradeStatus(false)).to.revertedWith(
    //       "Realm Upgrade Forbidden"
    //     );
    //   });
    //
    //   it("Should disable status LIVELY_GENERAL_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_GENERAL_REALM");
    //     expect(isEnabled).to.be.false;
    //     expect(isUpgradable).to.be.false;
    //   });
    //
    //   it("Should enable upgrade of LIVELY_GENERAL_REALM by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
    //     ).to.revertedWith("SetRealmUpgradeStatus Access Denied");
    //   });
    //
    //   it("Should enable status LIVELY_GENERAL_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_GENERAL_REALM");
    //     expect(isEnabled).to.be.true;
    //     expect(isUpgradable).to.be.false;
    //
    //     // and
    //     const realmContexts = await accessControlManagerProxy.getRealmContexts(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //     );
    //     expect(realmContexts.length).to.be.equal(1);
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasRealmContext(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
    //         ethers.utils.keccak256(accessControlManagerProxy.address)
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should enable upgrade of LIVELY_GENERAL_REALM by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should register LIVELY_VERSE_REALM realm by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(user1).registerRealm("LIVELY_VERSE_REALM", true, true)
    //     ).to.revertedWith("RegisterRealm Access Denied");
    //   });
    //
    //   it("Should register LIVELY_VERSE_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).registerRealm("LIVELY_VERSE_REALM", true, true))
    //       .to.emit(accessControlManagerProxy, "RealmRegistered")
    //       .withArgs(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
    //         adminAddress,
    //         "LIVELY_VERSE_REALM",
    //         true,
    //         true
    //       );
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_VERSE_REALM");
    //     expect(isEnabled).to.be.true;
    //     expect(isUpgradable).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmExists(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should register LIVELY_VERSE_REALM twice by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy.connect(livelyAdmin).registerRealm("LIVELY_VERSE_REALM", true, true)
    //     ).to.revertedWith("Realm Already Registered");
    //   });
    //
    //   it("Should change status LIVELY_VERSE_REALM by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
    //     ).to.revertedWith("SetRealmStatus Access Denied");
    //   });
    //
    //   it("Should change upgrade of LIVELY_VERSE_REALM by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
    //     ).to.revertedWith("SetRealmUpgradeStatus Access Denied");
    //   });
    //
    //   it("Should disable status LIVELY_VERSE_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_VERSE_REALM");
    //     expect(isEnabled).to.be.false;
    //     expect(isUpgradable).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should disable upgrade LIVELY_VERSE_REALM by livelyAdmin failed", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_VERSE_REALM");
    //     expect(isEnabled).to.be.false;
    //     expect(isUpgradable).to.be.false;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should enable status LIVELY_VERSE_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_VERSE_REALM");
    //     expect(isEnabled).to.be.true;
    //     expect(isUpgradable).to.be.false;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should enable upgrade LIVELY_VERSE_REALM by livelyAdmin failed", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);
    //
    //     // then
    //     const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
    //       ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //     );
    //     expect(name).to.be.equal("LIVELY_VERSE_REALM");
    //     expect(isEnabled).to.be.true;
    //     expect(isUpgradable).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //   });
    // });
    //
    // describe("IContextManagement Tests", function() {
    //   let baseUupsProxy: BaseUUPSProxyTest;
    //
    //   it("Should add new func to ACL context with by user1 failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .addContextFuncRole(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     ).to.revertedWith("AddContextFuncRole Access Denied");
    //   });
    //
    //   it("Should remove function from ACL context with by user1 failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector)
    //     ).to.revertedWith("RemoveContextFunc Access Denied");
    //   });
    //
    //   it("Should grant role to ACL context function with by user1 failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .grantContextRole(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     ).to.revertedWith("GrantContextRole Access Denied");
    //   });
    //
    //   it("Should remove role from ACL context function  with by user1 failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .revokeContextRole(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     ).to.revertedWith("RevokeContextRole Access Denied");
    //   });
    //
    //   it("Should change realm context with by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setContextRealm(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //         )
    //     ).to.revertedWith("SetContextRealm Access Denied");
    //   });
    //
    //   it("Should change context status with by user1 failed", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(user1)
    //         .setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), true)
    //     ).to.revertedWith("SetContextStatus Access Denied");
    //   });
    //
    //   it("Should register BaseUUPSContractTest context with by user1 failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(user1);
    //     let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
    //     const proxyFactory = new Proxy__factory(user1);
    //     const typedArray1 = new Int8Array(0);
    //     const proxy = await proxyFactory.connect(user1).deploy(baseUupsProxy.address, typedArray1);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       proxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_GENERAL_REALM",
    //       accessControlManagerProxy.address,
    //       userAddress1,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     baseUupsProxy = await baseUupsProxy.attach(proxy.address);
    //     await expect(
    //       baseUupsProxy
    //         .connect(user1)
    //         .initialize(
    //           "BaseUUPSContractTest",
    //           "1.0.0",
    //           "LIVELY_GENERAL_REALM",
    //           signature,
    //           accessControlManagerProxy.address
    //         )
    //     ).to.revertedWith("Access Denied");
    //   });
    //
    //   it("Should register BaseUUPSContractTest context with don't permit register context by livelyAdmin failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(livelyAdmin);
    //     let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
    //     const proxyFactory = new Proxy__factory(livelyAdmin);
    //     const typedArray1 = new Int8Array(0);
    //     const proxy = await proxyFactory.connect(livelyAdmin).deploy(baseUupsProxy.address, typedArray1);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       proxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_REALM",
    //       accessControlManagerProxy.address,
    //       adminAddress,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     baseUupsProxy = await baseUupsProxy.attach(proxy.address);
    //     await expect(
    //       baseUupsProxy
    //         .connect(livelyAdmin)
    //         .initializeWithInvalidRealm(
    //           "BaseUUPSContractTest",
    //           "1.0.0",
    //           "LIVELY_REALM",
    //           signature,
    //           accessControlManagerProxy.address
    //         )
    //     ).to.revertedWith("Register Context Not Permitted");
    //   });
    //
    //   it("Should call permitRegisterContext by user failed", async () => {
    //     // given
    //     const permitCount = await accessControlManagerProxy.getPermitRegisterContext();
    //
    //     // when
    //     await expect(accessControlManagerProxy.connect(user1).setPermitRegisterContext(8)).revertedWith("Access Denied");
    //
    //     // then
    //     expect(await accessControlManagerProxy.getPermitRegisterContext()).to.equal(permitCount);
    //   });
    //
    //   it("Should permitRegisterContext by livelyAdmin success", async () => {
    //     // given
    //     const permitCount = 64;
    //
    //     // when
    //     await expect(accessControlManagerProxy.connect(livelyAdmin).setPermitRegisterContext(permitCount))
    //       .to.emit(accessControlManagerProxy, "PermitRegisterContextUpdated")
    //       .withArgs(adminAddress, permitCount);
    //
    //     // then
    //     expect(await accessControlManagerProxy.getPermitRegisterContext()).to.equal(permitCount);
    //   });
    //
    //   it("Should register BaseUUPSContractTest context with Invalid Realm by livelyAdmin failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(livelyAdmin);
    //     let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
    //     const proxyFactory = new Proxy__factory(livelyAdmin);
    //     const typedArray1 = new Int8Array(0);
    //     const proxy = await proxyFactory.connect(livelyAdmin).deploy(baseUupsProxy.address, typedArray1);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       proxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_REALM",
    //       accessControlManagerProxy.address,
    //       adminAddress,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     baseUupsProxy = await baseUupsProxy.attach(proxy.address);
    //     await expect(
    //       baseUupsProxy
    //         .connect(livelyAdmin)
    //         .initializeWithInvalidRealm(
    //           "BaseUUPSContractTest",
    //           "1.0.0",
    //           "LIVELY_REALM",
    //           signature,
    //           accessControlManagerProxy.address
    //         )
    //     ).to.revertedWith("Realm Not Found");
    //   });
    //
    //   it("Should register BaseUUPSContractTest context with Invalid Role by livelyAdmin failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(livelyAdmin);
    //     let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
    //     const proxyFactory = new Proxy__factory(livelyAdmin);
    //     const typedArray1 = new Int8Array(0);
    //     const proxy = await proxyFactory.connect(livelyAdmin).deploy(baseUupsProxy.address, typedArray1);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       proxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_GENERAL_REALM",
    //       accessControlManagerProxy.address,
    //       adminAddress,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     baseUupsProxy = await baseUupsProxy.attach(proxy.address);
    //     await expect(
    //       baseUupsProxy
    //         .connect(livelyAdmin)
    //         .initializeWithInvalidRole(
    //           "BaseUUPSContractTest",
    //           "1.0.0",
    //           "LIVELY_GENERAL_REALM",
    //           signature,
    //           accessControlManagerProxy.address
    //         )
    //     ).to.revertedWith("Role Not Found");
    //   });
    //
    //   it("Should register BaseUUPSContractTest context by livelyAdmin success", async () => {
    //     // given
    //     const beforePermitRegisterContextCount = await accessControlManagerProxy.getPermitRegisterContext();
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(livelyAdmin);
    //     baseUupsProxy = await baseUupsProxyFactory.deploy();
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const proxyFactory = new Proxy__factory(livelyAdmin);
    //     const typedArray1 = new Int8Array(0);
    //     const proxy = await proxyFactory.connect(livelyAdmin).deploy(baseUupsProxy.address, typedArray1);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       proxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_GENERAL_REALM",
    //       accessControlManagerProxy.address,
    //       adminAddress,
    //       networkChainId
    //     );
    //
    //     // when
    //     baseUupsProxy = await baseUupsProxy.attach(proxy.address);
    //     await expect(
    //       baseUupsProxy
    //         .connect(livelyAdmin)
    //         .initialize(
    //           "BaseUUPSContractTest",
    //           "1.0.0",
    //           "LIVELY_GENERAL_REALM",
    //           signature,
    //           accessControlManagerProxy.address
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextRegistered")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         baseUupsProxy.address,
    //         adminAddress,
    //         baseUupsProxy.address,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       );
    //
    //     // then
    //     const afterPermitRegisterContextCount = await accessControlManagerProxy.getPermitRegisterContext();
    //     const response: ResponseContextStruct = await accessControlManagerProxy.getContextInfo(
    //       ethers.utils.keccak256(baseUupsProxy.address)
    //     );
    //     expect(response).to.be.not.null;
    //     expect(response.name).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BaseUUPSContractTest")));
    //     expect(response.version).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    //     expect(response.realm).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
    //     expect(response.contractId).to.be.hexEqual(baseUupsProxy.address);
    //     expect(response.isSafeMode).to.be.false;
    //     expect(response.isUpgradable).to.be.false;
    //     expect(afterPermitRegisterContextCount).to.be.equal(beforePermitRegisterContextCount - 1);
    //
    //     // and
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     let method_selector = iface.getSighash("setSafeMode(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("setUpgradeStatus(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("setSafeMode(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("setLocalAdmin(address)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should remove ACL context function with by livelyAdmin failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector)
    //     ).to.revertedWith("Illegal Remove ACL Context");
    //   });
    //
    //   it("Should grant role to ACL context function with by livelyAdmin failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .grantContextRole(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     ).to.revertedWith("Illegal Grant ACL Context");
    //   });
    //
    //   it("Should remove role from ACL context function  with by livelyAdmin failed", async () => {
    //     // given
    //     const aclArtifact = await deployments.getArtifact("AccessControlManager");
    //     const iface = new ethers.utils.Interface(aclArtifact.abi);
    //     const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .revokeContextRole(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     ).to.revertedWith("Illegal Revoke ACL Context");
    //   });
    //
    //   it("Should add upgradeToAnonymousRole function to BaseUUPSContractTest context with by livelyAdmin success", async () => {
    //     // given
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .addContextFuncRole(
    //           ethers.utils.keccak256(baseUupsProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextFuncRoleAdded")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")),
    //         adminAddress,
    //         method_selector,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       );
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasContextRole(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")),
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionExists(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should enable upgrade of BaseUUPSContractTest context with by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(livelyAdmin).setUpgradeStatus(true))
    //       .to.emit(baseUupsProxy, "UpgradeStatusChanged")
    //       .withArgs(
    //         adminAddress,
    //         baseUupsProxy.address,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
    //         true
    //       );
    //   });
    //
    //   it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 success", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
    //       .to.emit(baseUupsProxy, "UpgradeToAnonymous")
    //       .withArgs(userAddress1, baseUupsProxy.address);
    //   });
    //
    //   it("Should grant TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by livelyAdmin success", async () => {
    //     // given
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .grantContextRole(
    //           ethers.utils.keccak256(baseUupsProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextRoleGranted")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         adminAddress,
    //         method_selector,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       );
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasContextRole(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         method_selector
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address)).to.revertedWith(
    //       "upgradeToAnonymousRole Forbidden"
    //     );
    //   });
    //
    //   it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user2 success", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user2).upgradeToAnonymousRole(baseUupsProxy.address))
    //       .to.emit(baseUupsProxy, "UpgradeToAnonymous")
    //       .withArgs(userAddress2, baseUupsProxy.address);
    //   });
    //
    //   it("Should revoke TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by livelyAdmin success", async () => {
    //     // given
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .revokeContextRole(
    //           ethers.utils.keccak256(baseUupsProxy.address),
    //           method_selector,
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextRoleRevoked")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         adminAddress,
    //         method_selector,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       );
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasContextRole(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         method_selector
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should remove upgradeToAnonymousRole function of BaseUUPSContractTest context by livelyAdmin success", async () => {
    //     // given
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
    //
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .removeContextFunc(ethers.utils.keccak256(baseUupsProxy.address), method_selector)
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextFuncRemoved")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //       );
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasContextRole(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionExists(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should update BaseUUPSContractTest context with by user1 failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const signature = await generateContextDomainSignatureManually(
    //       baseUupsProxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_GENERAL_REALM",
    //       accessControlManagerProxy.address,
    //       userWallet1,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     await expect(baseUupsProxy.connect(user1).reInitialize(signature)).to.revertedWith("Caller Not Authorized");
    //   });
    //
    //   it("Should update BaseUUPSContractTest context with Invalid Realm failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const signature = await generateContextDomainSignatureByHardhat(
    //       baseUupsProxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_REALM",
    //       accessControlManagerProxy.address,
    //       adminAddress,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     await expect(baseUupsProxy.connect(livelyAdmin).reInitializeWithInvalidRealm(signature)).to.revertedWith(
    //       "Realm Not Found"
    //     );
    //   });
    //
    //   it("Should update BaseUUPSContractTest context with Invalid Role failed", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const signature = await generateContextDomainSignatureManually(
    //       baseUupsProxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_GENERAL_REALM",
    //       accessControlManagerProxy.address,
    //       livelyAdminWallet,
    //       networkChainId
    //     );
    //
    //     // when and then
    //     baseUupsProxy = await baseUupsProxy.attach(baseUupsProxy.address);
    //     await expect(baseUupsProxy.connect(livelyAdmin).reInitializeWithInvalidRole(signature)).to.revertedWith(
    //       "Role Not Found"
    //     );
    //   });
    //
    //   it("Should update BaseUUPSProxyTest context with by livelyAdmin success", async () => {
    //     // given
    //     const networkChainId = await provider.send("eth_chainId", []);
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //     const signature = await generateContextDomainSignatureManually(
    //       baseUupsProxy.address,
    //       "BaseUUPSContractTest",
    //       "1.0.0",
    //       "LIVELY_VERSE_REALM",
    //       accessControlManagerProxy.address,
    //       livelyAdminWallet,
    //       networkChainId
    //     );
    //
    //     // when
    //     await expect(baseUupsProxy.connect(livelyAdmin).reInitialize(signature))
    //       .to.emit(accessControlManagerProxy, "ContextUpdated")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         baseUupsProxy.address,
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       );
    //
    //     // then
    //     expect(await accessControlManagerProxy.isContextEnabled(ethers.utils.keccak256(baseUupsProxy.address))).to.be
    //       .true;
    //     expect(await accessControlManagerProxy.isContextExists(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
    //     expect(await accessControlManagerProxy.isContextUpgradable(ethers.utils.keccak256(baseUupsProxy.address))).to.be
    //       .true;
    //     expect(await accessControlManagerProxy.isContextSafeMode(ethers.utils.keccak256(baseUupsProxy.address))).to.be
    //       .false;
    //
    //     // and
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     let method_selector = iface.getSighash("upgradeTo(address, bytes memory, bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     method_selector = iface.getSighash("setUpgradeStatus(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     method_selector = iface.getSighash("setSafeMode(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     method_selector = iface.getSighash("setLocalAdmin(address)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionExists(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.false;
    //
    //     // and
    //     method_selector = iface.getSighash("upgradeToTesterRole(address)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress2,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress1,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         userAddress2,
    //         method_selector
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isContextFunctionEnabled(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         method_selector
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     const arrayFuncs = await accessControlManagerProxy.getContextFuncs(ethers.utils.keccak256(baseUupsProxy.address));
    //     expect(arrayFuncs.length).to.be.equal(6);
    //   });
    //
    //   it("Should call upgradeToTesterRole of BaseUUPSContractTest by user1 failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user1).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
    //       "upgradeToTesterRole Forbidden"
    //     );
    //   });
    //
    //   it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 success", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address))
    //       .to.emit(baseUupsProxy, "UpgradeToTester")
    //       .withArgs(userAddress2, baseUupsProxy.address);
    //   });
    //
    //   it("Should call upgradeToAnonymousRole of BaseUUPSContractTest by user1 success", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
    //       .to.emit(baseUupsProxy, "UpgradeToAnonymous")
    //       .withArgs(userAddress1, baseUupsProxy.address);
    //   });
    //
    //   it("Should disable status of LIVELY_VERSE_REALM by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmExists(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.false;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
    //       "upgradeToTesterRole Forbidden"
    //     );
    //   });
    //
    //   it("Should call UpgradeToTesterRole of BaseUUPSContractTest by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(livelyAdmin).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
    //       "upgradeToTesterRole Forbidden"
    //     );
    //   });
    //
    //   it("Should enable status of LIVELY_VERSE_REALM by livelyAdmin success", async () => {
    //     // when and then
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
    //     )
    //       .to.emit(accessControlManagerProxy, "RealmStatusChanged")
    //       .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.isRealmExists(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmEnabled(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRealmUpgradable(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       )
    //     ).to.be.true;
    //
    //     // and
    //     expect(
    //       await accessControlManagerProxy.hasRealmContext(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
    //         ethers.utils.keccak256(baseUupsProxy.address)
    //       )
    //     ).to.be.true;
    //   });
    //
    //   it("Should change realm of ACL by livelyAdmin failed", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setContextRealm(
    //           ethers.utils.keccak256(accessControlManagerProxy.address),
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //         )
    //     ).to.revertedWith("Illegal Change ACL Context Realm");
    //   });
    //
    //   it("Should change realm of BaseUUPSContractTest to LIVELY_GENERAL_REALM by livelyAdmin success", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setContextRealm(
    //           ethers.utils.keccak256(baseUupsProxy.address),
    //           ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
    //         )
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextRealmChanged")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
    //       );
    //
    //     // then
    //     expect(
    //       await accessControlManagerProxy.hasRealmContext(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
    //         ethers.utils.keccak256(baseUupsProxy.address)
    //       )
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.hasRealmContext(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
    //         ethers.utils.keccak256(baseUupsProxy.address)
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should disable status of ACL context by livelyAdmin failed", async () => {
    //     // when
    //     await expect(
    //       accessControlManagerProxy
    //         .connect(livelyAdmin)
    //         .setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), false)
    //     ).to.revertedWith("Illegal Change ACL Context Status");
    //   });
    //
    //   it("Should disable status of BaseUUPSProxyTest context by livelyAdmin success", async () => {
    //     // given
    //     const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
    //
    //     // when
    //     await expect(
    //       accessControlManagerProxy.connect(livelyAdmin).setContextStatus(ethers.utils.keccak256(baseUupsProxy.address), false)
    //     )
    //       .to.emit(accessControlManagerProxy, "ContextStatusChanged")
    //       .withArgs(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
    //         false
    //       );
    //
    //     // then
    //     const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
    //     const method_selector = iface.getSighash("setSafeMode(bool)");
    //     expect(
    //       await accessControlManagerProxy.hasAccess(
    //         ethers.utils.keccak256(baseUupsProxy.address),
    //         adminAddress,
    //         method_selector
    //       )
    //     ).to.be.false;
    //   });
    //
    //   it("Should enable SafeMode BaseUUPSProxyTest context by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(livelyAdmin).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");
    //   });
    //
    //   it("Should disable Upgrade status of BaseUUPSProxyTest context by livelyAdmin failed", async () => {
    //     // when and then
    //     await expect(baseUupsProxy.connect(livelyAdmin).setUpgradeStatus(false)).to.revertedWith("SetUpgradeStatus Forbidden");
    //   });
    //
    //   it("Should check status of ACL success", async () => {
    //     // when and then
    //     expect(
    //       await accessControlManagerProxy.isRoleEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isRoleExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))
    //     ).to.be.true;
    //     expect(
    //       await accessControlManagerProxy.isLivelyGeneralGroup(
    //         ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
    //       )
    //     ).to.be.false;
    //     expect(await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(baseUupsProxy.address))).to.be
    //       .true;
    //     expect(
    //       await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(accessControlManagerProxy.address))
    //     ).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelyAdminRole(adminAddress)).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelyAdminRole(userAddress1)).to.be.false;
    //     expect(await accessControlManagerProxy.isLivelySystemAdminRole(adminAddress)).to.be.true;
    //     expect(await accessControlManagerProxy.isLivelySystemAdminRole(userAddress1)).to.be.false;
    //   });
    // });
    //
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
