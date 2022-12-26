import { expect } from "chai";
import { BigNumber, BigNumberish, BytesLike, Signer, Wallet } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

/* eslint-disable camelcase */
import {
  AccessControl, AccessControl__factory,
  ACLManager, ACLManager__factory, ACLManagerProxy__factory, ACLProxy__factory,
  ContextManager,
  ContextManager__factory,
  DomainManager, DomainManager__factory,
  FunctionManager,
  FunctionManager__factory,
  GlobalManager, GlobalManager__factory, IACLManager, IContextManagement, IMemberManagement, IProxy,
  // AccessControlManager,
  // AccessControlManagerTest,
  // AccessControlManager__factory,
  // AccessControlManagerTest__factory,
  // BaseUUPSProxyTest,
  // BaseUUPSProxyTest__factory,
  IRoleManagement,
  LAccessControl,
  LAccessControl__factory,
  MemberManager,
  MemberManager__factory,
  PolicyManager, PolicyManager__factory,
  // Proxy,
  Proxy__factory,
  RealmManager,
  RealmManager__factory,
  RoleManager,
  RoleManager__factory,
  TypeManager,
  TypeManager__factory
} from "../../typechain/types";
import {
  IACLCommons,
  InitializedEventObject
} from "../../typechain/types/acl/ACLManager";
import { ACLManagerLibraryAddresses } from "../../typechain/types/factories/acl/ACLManager__factory";
import { Address } from "hardhat-deploy/dist/types";
import {
  ActivityStatus,
  AlterabilityStatus,
  generateDomainSeparator,
  ProxySafeModeStatus,
  ProxyUpgradabilityStatus
} from "./TestUtils";
import { UpgradedEventObject } from "../../typechain/types/test/proxy/UUPSUpgradeableTest";
import { ProxyUpgradedEvent, ProxyUpgradedEventObject } from "../../typechain/types/proxy/Proxy";
import { ProxyLocalAdminUpdatedEventObject } from "../../typechain/types/proxy/IProxy";
// import { IProxy } from "../../typechain/types/proxy/BaseUUPSProxy";


import { PromiseOrValue } from "../../typechain/types/common";


// import {
//   generateDomainSeparator,
//   generateContextDomainSignatureByHardhat,
//   generateContextDomainSignatureManually,
//   LIVELY_ASSET_GROUP,
//   LIVELY_ADMIN_ROLE,
//   readStorageSlot,
//   readStorageSlotFixedArray,
//   readStorageSlotHashMap,
//   LIVELY_GENERAL_GROUP,
//   readStorageSlotStruct,
// } from "./TestUtils";

// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)
const { provider, deployMockContract } = waffle;

describe("AccessControlManager Tests",
  function() {
    let livelyAdmin: Signer;
    let systemAdmin: Signer;
    let user1: Signer;
    let user2: Signer;
    let livelyAdminWallet: Wallet;
    let systemAdminWallet: Wallet;
    let userWallet1: Wallet;
    let userWallet2: Wallet;
    // let adminAddress: Address;
    // let userAddress1: Address;
    // let userAddress2: Address;
    let lACL: LAccessControl;
    let linkLibraryAddresses: ACLManagerLibraryAddresses;
    let memberManagerSubject: MemberManager;
    let memberManagerProxy: MemberManager;
    let roleManagerSubject: RoleManager;
    let roleManagerProxy: RoleManager;
    let typeManagerSubject: TypeManager;
    let typeManagerProxy: TypeManager;
    let functionManagerSubject: FunctionManager;
    let functionManagerProxy: FunctionManager;
    let contextManagerSubject: ContextManager;
    let contextManagerProxy: ContextManager;
    let realmManagerSubject: RealmManager;
    let realmManagerProxy: RealmManager;
    let domainManagerSubject: DomainManager;
    let domainManagerProxy: DomainManager;
    let globalManagerSubject: GlobalManager;
    let globalManagerProxy: GlobalManager;
    let policyManagerSubject: PolicyManager;
    let policyManagerProxy: PolicyManager;
    let accessControlSubject: AccessControl;
    let accessControlProxy: AccessControl;
    let aclManagerSubject: ACLManager;
    let aclManagerProxy: ACLManager;
    let networkChainId: BigNumber;
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
    // let accessControlManagerSubject: AccessControlManager;
    // let accessControlManagerTestSubject: AccessControlManagerTest;
    // let accessControlManagerProxy: AccessControlManager;
    // let accessControlManagerTestProxy: AccessControlManagerTest;

    this.beforeAll(async () => {
      [livelyAdmin, systemAdmin, user1, user2] = await ethers.getSigners();
      [livelyAdminWallet, systemAdminWallet, userWallet1, userWallet2] = waffle.provider.getWallets();
      networkChainId = await provider.send("eth_chainId", []);
      // adminAddress = await livelyAdmin.getAddress();
      // let userAddress1 = userWallet1.address;
      // userAddress2 = await user2.getAddress();
      // console.log(`livelyAdmin address: ${adminAddress}`);
    });

    describe("Libraries Deployments Test", function() {
      it("Should LAccessControl deploy success", async () => {
        // given
        const aclFactory = new LAccessControl__factory(systemAdmin);

        // when
        lACL = await aclFactory.deploy();

        // then
        expect(lACL.address).not.null;
        expect(await lACL.LIB_NAME()).to.be.equal("LAccessControl");
        expect(await lACL.LIB_VERSION()).to.be.equal("3.0.0");
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
        expect(await memberManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await roleManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await typeManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await functionManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await contextManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await realmManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await domainManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await globalManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await policyManagerSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(await accessControlSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
        expect(await accessControlSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await accessControlSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await accessControlSubject.initVersion()).to.be.equal(0);
      })
    })

    describe("ACLManager Subject Tests", function() {
      this.beforeAll(() => {
        linkLibraryAddresses = {
          "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": lACL.address
        };
      });

      it("Should ACLManager subject deploy success", async () => {
        // given
        const aclManagerFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);

        // when
        aclManagerSubject = await aclManagerFactory.deploy();

        // then
        expect(aclManagerSubject.address).not.null;
        expect(await accessControlSubject.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await accessControlSubject.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
        expect(await accessControlSubject.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await accessControlSubject.accessControlManager()).to.be.hexEqual(ethers.constants.AddressZero);
        expect(await accessControlSubject.initVersion()).to.be.equal(0);
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
        await expect(aclManagerSubject.connect(systemAdmin).setUpgradabilityStatus(ProxyUpgradabilityStatus.ENABLED)).to.be.revertedWith(
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
        const proxyFactory = new Proxy__factory(systemAdmin);
        aclManagerSubject = await aclManagerSubjectFactory.deploy();

        // when
        const proxy = await proxyFactory.deploy(aclManagerSubject.address, new Int8Array(0));

        // then
        expect(proxy.address).to.be.not.null;
        aclManagerProxy = aclManagerSubject.attach(proxy.address);

        // and
        expect(await aclManagerProxy.safeModeStatus()).to.be.equal(ProxySafeModeStatus.ENABLED);
        expect(await aclManagerProxy.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        await expect(aclManagerProxy.connect(systemAdmin).setUpgradabilityStatus(ProxyUpgradabilityStatus.ENABLED)).to.revertedWith(
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
            LAccessControl: lACL.address,
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
        expect(await aclManager.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
        expect(await aclManager.localAdmin()).to.be.hexEqual(systemAdminWallet.address);
        expect(await aclManager.contractName()).to.be.equal(ACL_MANAGER_CONTRACT_NAME);
        expect(await aclManager.contractVersion()).to.be.equal(CONTRACTS_VERSION);
        expect(await aclManager.subjectAddress()).to.be.hexEqual(aclManagerSubject.address);
        expect(await aclManager.accessControlManager()).to.be.hexEqual(aclManager.address);
        expect(await aclManager.initVersion()).to.be.equal(1);
        expect(await aclManager.domainSeparator()).to.be.hexEqual(domainSeparator);
        expect(await aclManager.getLibrary()).to.be.equal(lACL.address);

        let proxyInfo: IProxy.ProxyInfoStruct = await aclManager.proxyInfo();
        expect(proxyInfo.name).to.be.equal(ACL_MANAGER_CONTRACT_NAME);
        expect(proxyInfo.version).to.be.equal(CONTRACTS_VERSION);
        expect(proxyInfo.subject).to.be.equal(aclManagerSubject.address);
        expect(proxyInfo.acl).to.be.equal(aclManager.address);
        expect(proxyInfo.localAdmin).to.be.equal(systemAdminWallet.address);
        expect(proxyInfo.domainSeparator).to.be.equal(domainSeparator);
        expect(proxyInfo.sstat).to.be.equal(ProxySafeModeStatus.DISABLED);
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
        expect(proxyInfo.initVersion).to.be.equal(1);

      });

      it("Should proxy raising events when deployment and initialization were successful", async () => {
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
        ).to.be.revertedWith("Illegal Upgrade");
      });

      it("Should enable Upgrade Status of proxy by user1 failed", async () => {
        // when and then
        await expect(aclManagerProxy.connect(user1).setUpgradabilityStatus(ProxyUpgradabilityStatus.ENABLED)).to.be.revertedWith(
          "Forbidden"
        );
      });

      // it("Should enable Upgrade Status of proxy by livelyAdmin success", async () => {
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setUpgradabilityStatus(ProxyUpgradabilityStatus.ENABLED))
      //     .to.emit(aclManagerProxy, "ProxyUpdatabilityUpdated")
      //     .withArgs(
      //       systemAdminWallet.address,
      //       aclManagerProxy.address,
      //       ProxyUpgradabilityStatus.ENABLED
      //     );
      // });
      //
      // it("Should upgrade proxy raise 'Illegal Impl' exception for same subjects ", async () => {
      //   // given
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(systemAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
      //   ).to.be.revertedWith("Illegal Impl");
      // });
      //
      // it("Should upgrade proxy by common user1 failed", async () => {
      //   // given
      //   const aclManagerSubjectFactory = new ACLManager__factory(linkLibraryAddresses, systemAdmin);
      //   aclManagerSubject = await aclManagerSubjectFactory.deploy();
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(user1).upgradeTo(aclManagerSubject.address, typedArray1, false)
      //   ).to.revertedWith("Forbidden");
      // });
      //
      // it("Should upgrade proxy by systemAdmin with invalid uups subject failed", async () => {
      //   // given
      //   const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      //   const invalidUUPS = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
      //   await invalidUUPS.mock.proxiableUUID.returns(
      //     "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0"
      //   );
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(systemAdmin).upgradeTo(invalidUUPS.address, typedArray1, false)
      //   ).to.revertedWith("Invalid UUPS");
      // });
      //
      // it("Should upgrade proxy by systemAdmin with invalid proxy subject failed", async () => {
      //   // given
      //   const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      //   const invalidProxy = await deployMockContract(systemAdmin, baseUUPSProxy.abi);
      //   await invalidProxy.mock.proxiableUUID.returns(
      //     "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      //   );
      //   await invalidProxy.mock.supportsInterface.returns(false);
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(systemAdmin).upgradeTo(invalidProxy.address, typedArray1, false)
      //   ).to.revertedWith("Invalid Proxy");
      // });
      //
      // it("Should upgrade proxy by systemAdmin with illegal subject failed", async () => {
      //   // given
      //   const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      //   const illegalUUPS = await deployMockContract(systemAdmin, iBaseProxy.abi);
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(livelyAdmin).upgradeTo(illegalUUPS.address, typedArray1, false)
      //   ).to.revertedWith("Illegal UUPS");
      // });
      //
      // it("Should upgrade proxy by systemAdmin with invalid proxy subject failed", async () => {
      //   // given
      //   const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      //   const invalidProxy = await deployMockContract(livelyAdmin, baseUUPSProxy.abi);
      //   await invalidProxy.mock.proxiableUUID.returns(
      //     "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      //   );
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(systemAdmin).upgradeTo(invalidProxy.address, typedArray1, false)
      //   ).to.revertedWith("Illegal Proxy");
      // });
      //
      // it("Should upgrade proxy by systemAdmin success", async () => {
      //   // given
      //   const typedArray1 = new Int8Array(0);
      //
      //   // when and then
      //   await expect(
      //     aclManagerProxy.connect(livelyAdmin).upgradeTo(aclManagerSubject.address, typedArray1, false)
      //   )
      //     .to.emit(aclManagerProxy, "Upgraded")
      //     .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerSubject.address);
      // });
      //
      // it("Should setAdmin proxy to new account success", async () => {
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setLocalAdmin(userWallet1.address))
      //     .to.emit(aclManagerProxy, "ProxyLocalAdminUpdated")
      //     .withArgs(systemAdminWallet.address, aclManagerProxy.address, userWallet1.address);
      // });
      //
      // it("Should init proxy call by new systemAdmin failed", async () => {
      //   // when and then
      //   await expect(
      //     aclManagerProxy
      //       .connect(user1)
      //       .initialize(ACL_MANAGER_CONTRACT_NAME, CONTRACTS_VERSION)
      //   ).to.revertedWith("Contract Already Initialized");
      // });
      //
      // it("Should enable SafeMode proxy by user1 failed", async () => {
      //   // when and then
      //   await expect(aclManagerProxy.connect(user1).setSafeModeStatus(ProxySafeModeStatus.ENABLED)).to.revertedWith("Forbidden");
      // });
      //
      // it("Should enable SafeMode proxy by systemAdmin success", async () => {
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.ENABLED))
      //     .to.emit(aclManagerProxy, "ProxySafeModeUpdated")
      //     .withArgs(
      //       systemAdminWallet.address,
      //       aclManagerProxy.address,
      //       ProxySafeModeStatus.ENABLED
      //     );
      // });
      //
      // it("Should setAdmin proxy failed (in safeMode)", async () => {
      //   // when
      //   const address = await user1.getAddress();
      //
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setLocalAdmin(address)).to.revertedWith(
      //     "Rejected"
      //   );
      // });
      //
      // it("Should disable SafeMode of proxy by systemAdmin success", async () => {
      //   // given
      //   const adminAddress = await livelyAdmin.getAddress();
      //
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setSafeModeStatus(ProxySafeModeStatus.DISABLED))
      //     .to.emit(aclManagerProxy, "ProxySafeModeUpdated")
      //     .withArgs(
      //       adminAddress,
      //       aclManagerProxy.address,
      //       ProxySafeModeStatus.DISABLED
      //     );
      // });
      //
      // it("Should setAccessControlManager with invalid acl failed", async () => {
      //   // given
      //   const address = await user1.getAddress();
      //
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setAccessControlManager(address)).to.be.revertedWith(
      //     "Illegal ACL"
      //   );
      // });
      //
      // it("Should setAccessControlManager with invalid acl failed", async () => {
      //   // given
      //   const aclAddress = await aclManagerProxy.accessControlManager();
      //
      //   // when and then
      //   await expect(aclManagerProxy.connect(systemAdmin).setAccessControlManager(aclManagerProxy.address))
      //     .to.emit(aclManagerProxy, "ProxyAccessControlUpdated")
      //     .withArgs(systemAdminWallet.address, aclManagerProxy.address, aclManagerProxy.address)
      //
      //   // and
      //   expect(await aclManagerProxy.accessControlManager()).to.be.equal(aclAddress);
      // });
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
          .revertedWith("Delegate Call Failed");
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
        expect(await memberManagerProxy.upgradabilityStatus()).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        expect(proxyInfo.ustat).to.be.equal(ProxyUpgradabilityStatus.DISABLED);
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
        )).revertedWith("Not Authorized");
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

        const facetRequests: IACLCommons.FacetRegisterRequestStruct[] = [
          {
            facetId: memberManagerProxy.address,
            interfaceId: "0x51eb353f",
            subjectId: memberManagerSubject.address,
            selectors: [
              memberIface.getSighash("memberRegister"),
              memberIface.getSighash("memberUpdateActivityStatus"),
              memberIface.getSighash("memberUpdateAlterabilityStatus"),
              memberIface.getSighash("memberUpdateAdmin"),
              memberIface.getSighash("memberUpdateTypeLimit"),
              memberIface.getSighash("memberUpdateFactoryLimit"),
              memberIface.getSighash("memberCheckId"),
              memberIface.getSighash("memberHasType"),
              memberIface.getSighash("memberGetTypes"),
              memberIface.getSighash("memberGetInfo"),
            ]
          },
          {
            facetId: roleManagerProxy.address,
            interfaceId: "0xfa07f5d7",
            subjectId: roleManagerSubject.address,
            selectors: [
              roleIface.getSighash("roleRegister"),
              roleIface.getSighash("roleGrantMembers"),
              roleIface.getSighash("roleRevokeMembers"),
              roleIface.getSighash("roleUpdateAdmin"),
              roleIface.getSighash("roleDeleteActivity"),
              roleIface.getSighash("roleUpdateActivityStatus"),
              roleIface.getSighash("roleUpdateAlterabilityStatus"),
              roleIface.getSighash("roleUpdateMemberLimit"),
              roleIface.getSighash("roleUpdateScopeLimit"),
              roleIface.getSighash("roleCheckId"),
              roleIface.getSighash("roleCheckName"),
              roleIface.getSighash("roleCheckAdmin"),
              roleIface.getSighash("roleHasAccount"),
              roleIface.getSighash("roleGetInfo"),
            ]
          },
          {
            facetId: typeManagerProxy.address,
            interfaceId: "0x07a5204b",
            subjectId: typeManagerSubject.address,
            selectors: [
              typeIface.getSighash("typeRegister"),
              typeIface.getSighash("typeUpdateAdmin"),
              typeIface.getSighash("typeDeleteActivity"),
              typeIface.getSighash("typeUpdateActivityStatus"),
              typeIface.getSighash("typeUpdateAlterabilityStatus"),
              typeIface.getSighash("typeUpdateRoleLimit"),
              typeIface.getSighash("typeUpdateScopeLimit"),
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
            interfaceId: "0xbdc9925e",
            subjectId: policyManagerSubject.address,
            selectors: [
              policyIface.getSighash("policyRegister"),
              policyIface.getSighash("policyAddRoles"),
              policyIface.getSighash("policyRemoveRoles"),
              policyIface.getSighash("policyUpdateCodes"),
              policyIface.getSighash("policyUpdateAdmin"),
              policyIface.getSighash("policyDeleteActivity"),
              policyIface.getSighash("policyUpdateActivityStatus"),
              policyIface.getSighash("policyUpdateAlterabilityStatus"),
              policyIface.getSighash("policyUpdatesRoleLimit"),
              policyIface.getSighash("policyCheckId"),
              policyIface.getSighash("policyCheckName"),
              policyIface.getSighash("policyCheckAdmin"),
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
            interfaceId: "0x5bc54564",
            subjectId: functionManagerSubject.address,
            selectors: [
              functionIface.getSighash("functionRegister"),
              functionIface.getSighash("functionUpdateAdmin"),
              functionIface.getSighash("functionUpdateAgent"),
              functionIface.getSighash("functionDeleteActivity"),
              functionIface.getSighash("functionUpdateActivityStatus"),
              functionIface.getSighash("functionUpdateAlterabilityStatus"),
              functionIface.getSighash("functionUpdatePolicy"),
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
            interfaceId: "0x16d8a03c",
            subjectId: contextManagerSubject.address,
            selectors: [
              contextIface.getSighash("contextRegister"),
              contextIface.getSighash("contextDeleteActivity"),
              contextIface.getSighash("contextUpdateActivityStatus"),
              contextIface.getSighash("contextUpdateAlterabilityStatus"),
              contextIface.getSighash("contextUpdateAdmin"),
              contextIface.getSighash("contextUpdateAgentLimit"),
              contextIface.getSighash("contextCheckId"),
              contextIface.getSighash("contextCheckAccount"),
              contextIface.getSighash("contextCheckAdmin"),
              contextIface.getSighash("contextHasFunction"),
              contextIface.getSighash("contextHasSelector"),
              contextIface.getSighash("contextGetFunctions"),
              contextIface.getSighash("contextGetContextInfo"),
            ]
          },
          {
            facetId: realmManagerProxy.address,
            interfaceId: "0xaf3c8dec",
            subjectId: realmManagerSubject.address,
            selectors: [
              realmIface.getSighash("realmRegister"),
              realmIface.getSighash("realmUpdateAdmin"),
              realmIface.getSighash("realmDeleteActivity"),
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
            interfaceId: "0xf7da3621",
            subjectId: domainManagerSubject.address,
            selectors: [
              domainIface.getSighash("domainRegister"),
              domainIface.getSighash("domainDeleteActivity"),
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
              globalIface.getSighash("globalUpdateActivityStatus"),
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

        await expect(aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests))
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, memberManagerProxy.address, memberManagerSubject.address, "0x51eb353f")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, roleManagerProxy.address, roleManagerSubject.address, "0xfa07f5d7")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, typeManagerProxy.address, typeManagerSubject.address, "0x07a5204b")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, policyManagerProxy.address, policyManagerSubject.address, "0xbdc9925e")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, functionManagerProxy.address, functionManagerSubject.address, "0x5bc54564")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, contextManagerProxy.address, contextManagerSubject.address, "0x16d8a03c")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, realmManagerProxy.address, realmManagerSubject.address, "0xaf3c8dec")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, domainManagerProxy.address, domainManagerSubject.address, "0xf7da3621")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, globalManagerProxy.address, globalManagerSubject.address, "0xa301c1f2")
          .to.emit(aclManagerProxy, "ACLFacetRegistered")
          .withArgs(systemAdminWallet.address, accessControlProxy.address, accessControlSubject.address, "0x7a327937")


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
        // let result = await accessControlProxy.attach(aclManagerProxy.address).isAgentExist(ethers.utils.keccak256(systemAdminWallet.address));
        // console.log(`result: ${result}`);
        // console.log(await aclManagerProxy.aclGetFacets());
        // console.log(`memberSubject: ${memberManagerSubject.address}, memberProxy: ${memberManagerProxy.address}`);


        // 0x46414ba0   =>     IACLManager
        // 0x7a327937   =>     IAccessControl
        // 0xbdc9925e   =>     IPolicyManagement
        // 0x5bc54564   =>     IFunctionManagement
        // 0x16d8a03c   =>     IContextManagement
        // 0xaf3c8dec   =>     IRealmManagement
        // 0xf7da3621   =>     IDomainManagement
        // 0xa301c1f2   =>     IGlobalManagement
        // 0x51eb353f   =>     IMemberManagement
        // 0xfa07f5d7   =>     IRoleManagement
        // 0x07a5204b   =>     ITypeManagement
      })



      it("Should call member contextRegister by systemAdmin success", async() => {
        // given
        const realmId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_ACL_REALM"));
        const aclTypeId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_ACL_TYPE"));
        const newContextId = ethers.utils.keccak256(memberManagerProxy.address);
        const memberContextRequest: IContextManagement.ContextRegisterRequestStruct[] = [{
          realmId: realmId,
          adminId: aclTypeId,
          salt: ethers.constants.HashZero,
          name: MEMBER_MANAGER_CONTRACT_NAME,
          version: CONTRACTS_VERSION,
          contractId: memberManagerProxy.address,
          subject: ethers.constants.AddressZero,
          deployer: ethers.constants.AddressZero,
          agentLimit: BigNumber.from(65535),
          acstat: ActivityStatus.ENABLED,
          alstat: AlterabilityStatus.UPDATABLE,
          signature: new Int8Array(0)
        }];

        console.log(`realm ID: ${realmId}`);
        // console.log(`contextManagerProxy: ${contextManagerProxy.address}`)
        // console.log(`aclManagerProxy: ${aclManagerProxy.address}`)
        // console.log(`aclManagerSubject: ${aclManagerSubject.address}`)
        contextManagerProxy = contextManagerProxy.attach(aclManagerProxy.address);
        // let tx = await contextManagerProxy.connect(systemAdmin).contextRegister(memberContextRequest);
        // let receipt = await tx.wait();
        // console.log(JSON.stringify(receipt, null,2));
        await expect(contextManagerProxy.connect(systemAdmin)
          .contextRegister(memberContextRequest)
        ).to.emit(contextManagerProxy, "ContextRegistered")
          .withArgs(
            systemAdminWallet.address,
            newContextId,
            memberManagerProxy.address,
            systemAdminWallet.address,
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
            realmId, aclTypeId
          )
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
