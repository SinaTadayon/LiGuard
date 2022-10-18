import { expect } from "chai";
import { Signer, Wallet } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

/* eslint-disable camelcase */
import {
  AccessControlManager,
  AccessControlManagerTest,
  AccessControlManager__factory,
  AccessControlManagerTest__factory,
  BaseUUPSProxyTest,
  BaseUUPSProxyTest__factory, IRoleManagement,
  LAccessControl,
  LAccessControl__factory,
  LContextManagement,
  LContextManagement__factory,
  LGroupManagement,
  LGroupManagement__factory,
  LRealmManagement,
  LRealmManagement__factory,
  LRoleManagement__factory,
  // Proxy,
  Proxy__factory
} from "../../typechain/types";
import {
  UpgradedEventObject,
  LocalAdminChangedEventObject,
  InitializedEventObject,
  IContextManagement,
} from "../../typechain/types/acl/AccessControlManager";
import { AccessControlManagerLibraryAddresses } from "../../typechain/types/factories/acl/AccessControlManager__factory";
import { LContextManagementLibraryAddresses } from "../../typechain/types/factories/lib/acl/LContextManagement__factory";
import { LGroupManagementLibraryAddresses } from "../../typechain/types/factories/lib/acl/LGroupManagement__factory";
import { LRealmManagementLibraryAddresses } from "../../typechain/types/factories/lib/acl/LRealmManagement__factory";
import { LRoleManagementLibraryAddresses } from "../../typechain/types/factories/lib/acl/LRoleManagement__factory";
import { Address } from "hardhat-deploy/dist/types";
import ResponseContextStruct = IContextManagement.ResponseContextStruct;
import {
  generateDomainSeparator,
  generateContextDomainSignatureByHardhat,
  generateContextDomainSignatureManually,
  LIVELY_ASSET_GROUP,
  LIVELY_ADMIN_ROLE,
  readStorageSlot,
  readStorageSlotFixedArray, readStorageSlotHashMap, LIVELY_GENERAL_GROUP, readStorageSlotStruct
} from "./TestUtils";

// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)
// const { provider, deployMockContract, deployContract } = waffle;
const { provider, deployMockContract } = waffle;

describe("AccessControlManager Tests", function () {
  let admin: Signer;
  let user1: Signer;
  let user2: Signer;
  let adminWallet: Wallet;
  let userWallet1: Wallet;
  let adminAddress: Address;
  let userAddress1: Address;
  let userAddress2: Address;
  let cml: LContextManagement;
  let rml: LRealmManagement;
  let reml: LRealmManagement;
  let gml: LGroupManagement;
  let acl: LAccessControl;
  let linkLibraryAddresses: AccessControlManagerLibraryAddresses;
  let accessControlManagerSubject: AccessControlManager;
  let accessControlManagerTestSubject: AccessControlManagerTest;
  let accessControlManagerProxy: AccessControlManager;
  let accessControlManagerTestProxy: AccessControlManagerTest;

  this.beforeAll(async () => {
    [admin, user1, user2] = await ethers.getSigners();
    [adminWallet, userWallet1] = waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    userAddress1 = await user1.getAddress();
    userAddress2 = await user2.getAddress();
    // console.log(`admin address: ${adminAddress}`);
  });

  describe("Libraries Deployments Test", function () {
    it("Should LAccessControl deploy success", async () => {
      // given
      const aclFactory = new LAccessControl__factory(admin);

      // when
      acl = await aclFactory.deploy();

      // then
      expect(acl.address).not.null;
      expect(await acl.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LAccessControl")));
      expect(await acl.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    });

    it("Should LContextManagement deploy success", async () => {
      // given
      const aclLinkLib: LContextManagementLibraryAddresses = {
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
      };
      const cmlFactory = new LContextManagement__factory(aclLinkLib, admin);

      // when
      cml = await cmlFactory.deploy();

      // then
      expect(cml.address).not.null;
      expect(await cml.LIB_NAME()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LContextManagement"))
      );
      expect(await cml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await cml.getLibrary()).to.be.hexEqual(acl.address);
    });

    it("Should LRoleManagement deploy success", async () => {
      // given
      const aclLinkLib: LRoleManagementLibraryAddresses = {
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
      };
      const rmlFactory = new LRoleManagement__factory(aclLinkLib, admin);

      // when
      rml = await rmlFactory.deploy();

      // then
      expect(rml.address).not.null;
      expect(await rml.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LRoleManagement")));
      expect(await rml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await rml.getLibrary()).to.be.hexEqual(acl.address);
    });

    it("Should LGroupManagement deploy success", async () => {
      // given
      const aclLinkLib: LGroupManagementLibraryAddresses = {
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
      };

      const gmlFactory = new LGroupManagement__factory(aclLinkLib, admin);

      // when
      gml = await gmlFactory.deploy();

      // then
      expect(gml.address).not.null;
      expect(await gml.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LGroupManagement")));
      expect(await gml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await gml.getLibrary()).to.be.hexEqual(acl.address);
    });

    it("Should LRealmManagement deploy success", async () => {
      // given
      const aclLinkLib: LRealmManagementLibraryAddresses = {
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
      };

      const remlFactory = new LRealmManagement__factory(aclLinkLib, admin);

      // when
      reml = await remlFactory.deploy();

      // then
      expect(reml.address).not.null;
      expect(await reml.LIB_NAME()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LRealmManagement"))
      );
      expect(await reml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await reml.getLibrary()).to.be.hexEqual(acl.address);
    });
  });

  describe("Subject (AccessControlManager Implementation) Tests", function () {
    this.beforeAll(() => {
      linkLibraryAddresses = {
        "src/contracts/lib/acl/LRoleManagement.sol:LRoleManagement": rml.address,
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
        "src/contracts/lib/acl/LContextManagement.sol:LContextManagement": cml.address,
        "src/contracts/lib/acl/LRealmManagement.sol:LRealmManagement": reml.address,
        "src/contracts/lib/acl/LGroupManagement.sol:LGroupManagement": gml.address,
      };
    });

    let accessControlManagerSubject: AccessControlManager;
    it("Should AccessControlManager subject deploy success", async () => {
      // given
      const accessControlManagerFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);

      // when
      accessControlManagerSubject = await accessControlManagerFactory.deploy();

      // then
      expect(accessControlManagerSubject.address).not.null;
      expect(await accessControlManagerSubject.isSafeMode()).to.be.true;
      expect(await accessControlManagerSubject.isUpgradable()).to.be.false;
      expect(await accessControlManagerSubject.initVersion()).to.be.equal(0);
      expect(await accessControlManagerSubject.getLibraries())
        .to.be.eql([acl.address, cml.address, reml.address, rml.address, gml.address])
    });

    it("Should initialize raise exception", async () => {
      // when and then
      await expect(
        accessControlManagerSubject
          .connect(admin)
          .initialize("AccessControlManagement", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerSubject.address)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setSafeModeState raise exception", async () => {
      // when and then
      await expect(accessControlManagerSubject.connect(admin).setSafeMode(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setUpgradeState raise exception", async () => {
      // when and then
      await expect(accessControlManagerSubject.connect(admin).setUpgradeStatus(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setAdmin raise exception", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(accessControlManagerSubject.connect(admin).setLocalAdmin(address)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should upgradeTo raise exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerSubject.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should return slot storage of subject", async () => {
      // when and then
      expect(await accessControlManagerSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  });

  describe("Proxy (UUPS Proxy Implementation) Tests", function () {
    it("Should proxy deployment by admin with Invalid subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidUUPS = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUUPS.mock.proxiableUUID.returns(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0"
      );
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(proxyFactory.connect(admin).deploy(invalidUUPS.address, typedArray1)).to.revertedWith(
        "Invalid UUPS Contract"
      );
    });

    it("Should proxy deployment by admin with Illegal subject failed", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi);
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(proxyFactory.connect(admin).deploy(illegalUUPS.address, typedArray1)).to.revertedWith(
        "Illegal UUPS Contract"
      );
    });

    it("Should deploy proxy success without initialize (typechain)", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(accessControlManagerSubject.address, new Int8Array(0));

      // then
      expect(acmProxy.address).to.be.not.null;
      accessControlManagerProxy = accessControlManagerSubject.attach(acmProxy.address);

      // and
      expect(await accessControlManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.true;
      expect(await accessControlManagerProxy.isUpgradable(), "Invalid Upgrade").to.be.false;
      expect(await accessControlManagerProxy.initVersion(), "Invalid Initialized Version").to.be.equal(0);
    });

    it("Should enable SafeMode of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(true)).to.revertedWith(
        "Contract Not Initialized"
      );
    });

    it("Should enable UpgradeState of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
    });

    it("Should setLocalAdmin of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setLocalAdmin(userAddress1)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
    });

    it("Should upgrade proxy by admin failed when not initialized", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
    });

    it("Should deploy and initialize proxy success (etherjs)", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const accessControlFactory = await ethers.getContractFactory("AccessControlManager", {
        libraries: {
          LContextManagement: cml.address,
          LAccessControl: acl.address,
          LRealmManagement: reml.address,
          LGroupManagement: gml.address,
          LRoleManagement: rml.address,
        },
      });
      const accessControlSubject = await accessControlFactory.connect(admin).deploy();
      const accessControlArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(accessControlArtifact.abi);
      const data = iface.encodeFunctionData("initialize", [
        "AccessControlManager",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        ethers.constants.AddressZero,
      ]);

      // when
      const proxyFactory = await ethers.getContractFactory("Proxy");
      const acmProxy = await proxyFactory.connect(admin).deploy(accessControlSubject.address, data);

      // then
      expect(acmProxy.address).to.be.not.null;
      const accessControlManager = accessControlFactory.attach(acmProxy.address);

      // and
      expect(await accessControlManager.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await accessControlManager.isUpgradable(), "Invalid Upgradable").to.be.false;
      expect(await accessControlManager.initVersion(), "Invalid Initialized Version").to.be.equal(1);
      expect(await accessControlManager.localAdmin(), "Invalid Admin").to.be.hexEqual(adminAddress);
      expect(await accessControlManager.contractName(), "Invalid Name").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager"))
      );
      expect(await accessControlManager.contractVersion(), "Invalid Version").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0"))
      );
      expect(await accessControlManager.contractRealm(), "Invalid Realm").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(await accessControlManager.accessControlManager(), "Invalid Access Control Manager").to.be.hexEqual(
        acmProxy.address
      );
      expect(await accessControlManager.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(acmProxy.address)
      );
      expect(await accessControlManager.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        accessControlSubject.address
      );

      expect(await accessControlManager.domainSeparator()).to.be.hexEqual(
        generateDomainSeparator("AccessControlManager", "1.0.0", accessControlManager.address, networkChainId)
      );
      expect(await accessControlManager.getLibraries())
        .to.be.eql([acl.address, cml.address, reml.address, rml.address, gml.address])
    });

    it("Should proxy raising events when deployment and initialization were successful", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);

      const accessControlSubject = await accessControlManagerSubjectFactory.deploy();
      const accessControlArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(accessControlArtifact.abi);
      const data = iface.encodeFunctionData("initialize", [
        "AccessControlManager",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        ethers.constants.AddressZero,
      ]);

      // when
      const accessControlProxy = await proxyFactory.deploy(accessControlSubject.address, data);
      const txReceipt = await accessControlProxy.deployTransaction.wait();

      // then
      let logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[0]);
      const upgradeEvent: UpgradedEventObject = <UpgradedEventObject>(<unknown>logDesc.args);
      expect(upgradeEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(upgradeEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(upgradeEvent.newImplementation, "Invalid New Implementation").to.be.hexEqual(accessControlSubject.address);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[1]);
      const adminChangedEvent: LocalAdminChangedEventObject = <LocalAdminChangedEventObject>(<unknown>logDesc.args);
      expect(adminChangedEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(adminChangedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(adminChangedEvent.newAdmin, "Invalid New Admin Address").to.be.hexEqual(adminAddress);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[2]);
      const initializedEvent: InitializedEventObject = <InitializedEventObject>(<unknown>logDesc.args);
      expect(initializedEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(initializedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(initializedEvent.subject, "Invalid Subject Address").to.be.hexEqual(accessControlSubject.address);
      expect(initializedEvent.name, "Invalid Name").to.be.equal("AccessControlManager");
      expect(initializedEvent.version, "Invalid Version").to.be.equal("1.0.0");
      expect(initializedEvent.realm, "Invalid Realm").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(initializedEvent.initCount, "Invalid InitializedCount").to.be.equal(1);
    });

    it("Should initialize proxy with Invalid AccessControlManager failed", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const acmSubject = await accessControlManagerSubjectFactory.deploy();
      const baseUUPSProxy = await deployments.getArtifact("BaseUUPSProxyTest");
      const invalidUupsAcl = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUupsAcl.mock.supportsInterface.returns(false);
      const proxyFactory = new Proxy__factory(admin);
      const acmProxy = await proxyFactory.deploy(acmSubject.address, new Int8Array(0));

      // when and then
      const uupsProxy = acmSubject.attach(acmProxy.address);
      await expect(
        uupsProxy
          .connect(admin)
          .initialize("AccessControlManager", "1.0.0", "LIVELY_GENERAL_REALM", invalidUupsAcl.address)
      ).to.revertedWith("Invalid AccessControlManager");
    });

    it("Should initialize proxy with Illegal AccessControlManager failed", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const acmSubject = await accessControlManagerSubjectFactory.deploy();
      const baseUUPSProxy = await deployments.getArtifact("BaseUUPSProxyTest");
      const illegalUupsAcl = await deployMockContract(admin, baseUUPSProxy.abi);
      await illegalUupsAcl.mock.proxiableUUID.returns(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
      await illegalUupsAcl.mock.supportsInterface.reverts();
      const proxyFactory = new Proxy__factory(admin);
      const acmProxy = await proxyFactory.deploy(acmSubject.address, new Int8Array(0));

      // when and then
      const uupsProxy = acmSubject.attach(acmProxy.address);
      await expect(
        uupsProxy
          .connect(admin)
          .initialize("AccessControlManager", "1.0.0", "LIVELY_GENERAL_REALM", illegalUupsAcl.address)
      ).to.revertedWith("Illegal AccessControlManager");
    });

    it("Should deploy and initialize proxy success (typechain)", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(accessControlManagerSubject.address, new Int8Array(0));
      accessControlManagerProxy = accessControlManagerSubject.attach(acmProxy.address);
      await accessControlManagerProxy
        .connect(admin)
        .initialize("AccessControlManager", "1.0.0", "LIVELY_GENERAL_REALM", ethers.constants.AddressZero);

      // then
      expect(await accessControlManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await accessControlManagerProxy.isUpgradable(), "Invalid Upgradability").to.be.false;
      expect(await accessControlManagerProxy.initVersion(), "Invalid Init Version").to.be.equal(1);
      expect(await accessControlManagerProxy.localAdmin(), "Invalid Local Admin").to.be.hexEqual(adminAddress);
      expect(await accessControlManagerProxy.contractName(), "Invalid Name").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager"))
      );
      expect(await accessControlManagerProxy.contractVersion(), "Invalid Version").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0"))
      );
      expect(await accessControlManagerProxy.contractRealm(), "Invalid Realm").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(await accessControlManagerProxy.accessControlManager(), "Invalid Access Control").to.be.hexEqual(
        acmProxy.address
      );
      expect(await accessControlManagerProxy.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(acmProxy.address)
      );
      expect(await accessControlManagerProxy.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        accessControlManagerSubject.address
      );
      expect(await accessControlManagerProxy.domainSeparator()).to.be.equal(
        generateDomainSeparator("AccessControlManager", "1.0.0", accessControlManagerProxy.address, networkChainId)
      );
      expect(await accessControlManagerProxy.getLibraries())
        .to.be.eql([acl.address, cml.address, reml.address, rml.address, gml.address])
    });

    it("Should call proxyableUUID from proxy failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.proxiableUUID()).to.be.revertedWith("Illegal Contract Delegatecall");
    });

    it("Should upgrade proxy  raise 'Upgrade Call Rejected' exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Upgrade Call Rejected");
    });

    it("Should enable Upgrade Status of proxy by user1 failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setUpgradeStatus(true)).to.be.revertedWith(
        "SetUpgradeStatus Forbidden"
      );
    });

    it("Should enable Upgrade Status of proxy by admin success", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(accessControlManagerProxy, "UpgradeStatusChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          true
        );
    });

    it("Should upgrade proxy raise 'Illegal New Implementation' exception for same subjects ", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal New Implementation");
    });

    it("Should upgrade proxy by common user1 failed", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(user1).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.revertedWith("Upgrade Context Forbidden");
    });

    it("Should upgrade proxy by admin with invalid uups subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidUUPS = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUUPS.mock.proxiableUUID.returns(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0"
      );
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(invalidUUPS.address, typedArray1, false)
      ).to.revertedWith("Invalid UUPS Contract");
    });

    it("Should upgrade proxy by admin with invalid IProxy subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidProxy = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidProxy.mock.proxiableUUID.returns(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
      await invalidProxy.mock.supportsInterface.returns(false);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(invalidProxy.address, typedArray1, false)
      ).to.revertedWith("Invalid IProxy Contract");
    });

    it("Should upgrade proxy by admin with Illegal subject failed", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(illegalUUPS.address, typedArray1, false)
      ).to.revertedWith("Illegal UUPS Contract");
    });

    it("Should upgrade proxy by admin with invalid IProxy subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidProxy = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidProxy.mock.proxiableUUID.returns(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(invalidProxy.address, typedArray1, false)
      ).to.revertedWith("Illegal IProxy Contract");
    });

    it("Should upgrade proxy by admin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      )
        .to.emit(accessControlManagerProxy, "Upgraded")
        .withArgs(adminAddress, accessControlManagerProxy.address, accessControlManagerSubject.address);
    });

    it("Should setAdmin proxy to new account success", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setLocalAdmin(userAddress1))
        .to.emit(accessControlManagerProxy, "LocalAdminChanged")
        .withArgs(adminAddress, accessControlManagerProxy.address, userAddress1);
    });

    it("Should init proxy call by new admin failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .initialize("AccessControlManager", "1.0.0", "LIVELY_GENERAL_REALM", ethers.constants.AddressZero)
      ).to.revertedWith("Contract Already Initialized");
    });

    it("Should enable SafeMode proxy by user1 failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");
    });

    it("Should enable SafeMode proxy by admin success", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(true))
        .to.emit(accessControlManagerProxy, "SafeModeChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          true
        );
    });

    it("Should setAdmin proxy failed (in safeMode)", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setLocalAdmin(address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
    });

    it("Should disable SafeMode of proxy by admin success", async () => {
      // given
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(false))
        .to.emit(accessControlManagerProxy, "SafeModeChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          false
        );
    });
  });

  describe("IGroupManagement Tests", function () {
    it("Should register new group by user1 failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true)).to.revertedWith(
        "RegisterGroup Access Denied"
      );
    });

    it("Should disable status LIVELY_GENERAL_GROUP by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false)
      ).to.revertedWith("SetGroupStatus Access Denied");
    });

    it("Should disable status LIVELY_GENERAL_GROUP by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false)
      )
        .to.emit(accessControlManagerProxy, "GroupStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, false);

      // and
      const [name, status] = await accessControlManagerProxy.getGroupInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
      );
      expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
      expect(status).to.be.false;
    });

    it("Should register INOVERS_GROUP group by admin failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true)).to.revertedWith(
        "RegisterGroup Access Denied"
      );
    });

    it("Should enable status LIVELY_GENERAL_GROUP by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), true)
      )
        .to.emit(accessControlManagerProxy, "GroupStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, true);

      // then
      const [name, status] = await accessControlManagerProxy.getGroupInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
      );
      expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
      expect(status).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
          LIVELY_ADMIN_ROLE
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isLivelyGeneralGroup(
          LIVELY_ADMIN_ROLE
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isLivelyGeneralGroup(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
        )
      ).to.be.true;

      // and
      const groupRoles = await accessControlManagerProxy.getGroupRoles(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
      );
      expect(groupRoles.length).to.be.equal(2);
    });

    it("Should register INOVERS_GROUP group by admin success", async () => {
      // when
      await expect(accessControlManagerProxy.connect(admin).registerGroup("INOVERS_GROUP", true))
        .to.emit(accessControlManagerProxy, "GroupRegistered")
        .withArgs(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          adminAddress,
          "INOVERS_GROUP",
          true
        );

      // then
      expect(
        await accessControlManagerProxy.isGroupExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isGroupEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
        )
      ).to.be.true;
    });

    it("Should disable status INOVERS_GROUP by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), false)
      ).to.revertedWith("SetGroupStatus Access Denied");
    });
  });

  describe("IRoleManagement Tests", function () {
    it("Should new register role by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true)
      ).to.revertedWith("RegisterRole Access Denied");
    });

    it("Should grant LIVELY_ADMIN_ROLE role to user2 by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .grantRoleAccount(LIVELY_ADMIN_ROLE, userAddress2)
      ).to.revertedWith("GrantRoleAccount Access Denied");
    });

    it("Should revoke admin account from LIVELY_ADMIN_ROLE by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .revokeRoleAccount(LIVELY_ADMIN_ROLE, adminAddress)
      ).to.revertedWith("RevokeRoleAccount Access Denied");
    });

    it("Should revoke admin account from LIVELY_ADMIN_ROLE by admin failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .revokeRoleAccount(LIVELY_ADMIN_ROLE, adminAddress)
      ).to.revertedWith("Illegal Revoke Role Account");
    });

    it("Should disable status of LIVELY_ADMIN_ROLE role by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setRoleStatus(LIVELY_ADMIN_ROLE, false)
      ).to.revertedWith("SetRoleStatus Access Denied");
    });

    it("Should change group of LIVELY_ADMIN_ROLE role by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setRoleGroup(
            LIVELY_ADMIN_ROLE,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
          )
      ).to.revertedWith("SetRoleGroup Access Denied");
    });

    it("Should disable status of LIVELY_ADMIN_ROLE role by admin failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRoleStatus(LIVELY_ADMIN_ROLE, false)
      ).to.revertedWith("Illegal Change Role Status");
    });

    it("Should grant new account to role of LIVELY_ANONYMOUS_ROLE role by admin failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")), userAddress2)
      ).to.revertedWith("Illegal Grant Anonymous Role");
    });

    it("Should get role info of LIVELY_ADMIN_ROLE success", async () => {
      // when
      const [name, group, status] = await accessControlManagerProxy.getRoleInfo(
        LIVELY_ADMIN_ROLE
      );

      // then
      expect(name).to.be.equal("LIVELY_ADMIN_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
      expect(status).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          LIVELY_ADMIN_ROLE,
          adminAddress
        )
      ).to.be.true;
      expect(await accessControlManagerProxy.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManagerProxy.isLivelySystemAdminRole(adminAddress)).to.be.true;
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
          userAddress1
        )
      ).to.be.false;
      expect(await accessControlManagerProxy.isLivelyAdminRole(userAddress1)).to.be.false;
      expect(await accessControlManagerProxy.isLivelySystemAdminRole(userAddress2)).to.be.false;
    });

    it("Should get role info of LIVELY_SYSTEM_ADMIN_ROLE success", async () => {
      // when
      const [name, group, status] = await accessControlManagerProxy.getRoleInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE"))
      );

      // then
      expect(name).to.be.equal("LIVELY_SYSTEM_ADMIN_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
      expect(status).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
          adminAddress
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")),
          userAddress1
        )
      ).to.be.false;
    });

    it("Should register new TESTER_ROLE role by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true)
      )
        .to.emit(accessControlManagerProxy, "RoleRegistered")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          "TESTER_ROLE",
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          true
        );

      // then
      const [name, group, status] = await accessControlManagerProxy.getRoleInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
      );
      expect(name).to.be.equal("TESTER_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")));
      expect(status).to.be.true;
    });

    it("Should grant TESTER_ROLE role to user1 by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)
      )
        .to.emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1);

      // then
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          userAddress1
        )
      ).to.be.true;

      // and
      const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
      );
      expect(roleAccounts.length).to.be.equal(1);
    });

    it("Should revoke TESTER_ROLE role from user1 by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .revokeRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)
      )
        .to.emit(accessControlManagerProxy, "RoleAccountRevoked")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1);

      // then
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          userAddress1
        )
      ).to.be.false;

      // and
      const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
      );
      expect(roleAccounts.length).to.be.equal(0);
    });

    it("Should grant TESTER_ROLE role to user2 by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2)
      )
        .to.emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2);

      // then
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          userAddress2
        )
      ).to.be.true;

      // and
      const roleAccounts = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
      );
      expect(roleAccounts.length).to.be.equal(1);
    });

    it("Should disable status of TESTER_ROLE role by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), false)
      )
        .to.emit(accessControlManagerProxy, "RoleStatusChanged")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          false
        );
    });

    it("Should enable status of TESTER_ROLE role by user2 failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(user2)
          .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true)
      ).to.revertedWith("SetRoleStatus Access Denied");
    });

    it("Should enable status of TESTER_ROLE role by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true)
      )
        .to.emit(accessControlManagerProxy, "RoleStatusChanged")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          true
        );
    });

    it("Should change group of TESTER_ROLE role to LIVELY_GENERAL_GROUP by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRoleGroup(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
          )
      )
        .to.emit(accessControlManagerProxy, "RoleGroupChanged")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
        );

      // then
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
        )
      ).to.be.false;

      // and
      const groupRoles = await accessControlManagerProxy.getGroupRoles(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
      );
      expect(groupRoles.length).to.be.equal(3);
    });

    it("Should change group of TESTER_ROLE role to INOVERS_GROUP by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRoleGroup(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
          )
      )
        .to.emit(accessControlManagerProxy, "RoleGroupChanged")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
        );

      // then
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.hasGroupRole(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
        )
      ).to.be.true;

      // and
      const groupRoles = await accessControlManagerProxy.getGroupRoles(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))
      );
      expect(groupRoles.length).to.be.equal(2);

      // and
      expect(
        await accessControlManagerProxy.isGroupEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))
        )
      ).to.be.true;
    });

    it("Should batch register new TESTER_ROLE_1, TESTER_ROLE_2 role by admin success", async () => {
      // given
      const registerRoleRequest: IRoleManagement.RegiterRoleRequestStruct[] = [
        {
          name: "TESTER_ROLE_1",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "TESTER_ROLE_2",
          group: LIVELY_ASSET_GROUP,
          status: true
        }
      ]

      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .batchRegisterRole(registerRoleRequest)
      ).to.emit(accessControlManagerProxy, "RoleRegistered")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
          "TESTER_ROLE_1",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManagerProxy, "RoleRegistered")
        .withArgs(
          adminAddress,
          ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
          "TESTER_ROLE_2",
          LIVELY_ASSET_GROUP,
          true
        );

      // then
      const [name1, group1, status1] = await accessControlManagerProxy.getRoleInfo(
        ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
      );
      const [name2, group2, status2] = await accessControlManagerProxy.getRoleInfo(
        ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
      );
      expect(name1).to.be.equal("TESTER_ROLE_1");
      expect(group1).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status1).to.be.true;
      expect(name2).to.be.equal("TESTER_ROLE_2");
      expect(group2).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status2).to.be.true;
    });

    it("Should batch grant TESTER_ROLE_1 role to user1 and grant TESTER_ROLE_2 role to user2 by admin success", async () => {
      // given
      const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
        {
          role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
          account: userAddress1,
        },
        {
          role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
          account: userAddress2,
        }
      ]

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .batchGrantRoleAccount(batchGrantRequest)
      ).to.emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])), userAddress1)
        .emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])), userAddress2);

      // then
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1")),
          userAddress1
        )
      ).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2")),
          userAddress2
        )
      ).to.be.true;

      // and
      const roleAccounts1 = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1"))
      );
      expect(roleAccounts1.length).to.be.equal(1);

      // and
      const roleAccounts2 = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2"))
      );
      expect(roleAccounts2.length).to.be.equal(1);
    });

    it("Should batch revoke TESTER_ROLE_1 role from user1 and grant TESTER_ROLE_2 role from user2 by admin success", async () => {
      // given
      const batchRevokeRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
        {
          role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])),
          account: userAddress1,
        },
        {
          role: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])),
          account: userAddress2,
        }
      ]

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .batchRevokeRoleAccount(batchRevokeRequest)
      ).to.emit(accessControlManagerProxy, "RoleAccountRevoked")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_1"])), userAddress1)
        .emit(accessControlManagerProxy, "RoleAccountRevoked")
        .withArgs(adminAddress, ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["TESTER_ROLE_2"])), userAddress2);

      // then
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1")),
          userAddress1
        )
      ).to.be.false;

      // and
      expect(
        await accessControlManagerProxy.hasRoleAccount(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2")),
          userAddress2
        )
      ).to.be.false;

      // and
      const roleAccounts1 = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_1"))
      );
      expect(roleAccounts1.length).to.be.equal(0);

      // and
      const roleAccounts2 = await accessControlManagerProxy.getRoleAccounts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE_2"))
      );
      expect(roleAccounts2.length).to.be.equal(0);
    });
  });

  describe("IRealmManagement Tests", function () {
    it("Should disable upgrade of LIVELY_GENERAL_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false)
      )
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);

      // then
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        )
      ).to.be.false;
    });

    it("Should disable proxy upgrade with setUpgradeStatus by admin failed", async () => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(false)).to.revertedWith(
        "Realm Upgrade Forbidden"
      );
    });

    it("Should disable status LIVELY_GENERAL_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(name).to.be.equal("LIVELY_GENERAL_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.false;
    });

    it("Should enable upgrade of LIVELY_GENERAL_REALM by admin failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
      ).to.revertedWith("SetRealmUpgradeStatus Access Denied");
    });

    it("Should enable status LIVELY_GENERAL_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(name).to.be.equal("LIVELY_GENERAL_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.false;

      // and
      const realmContexts = await accessControlManagerProxy.getRealmContexts(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(realmContexts.length).to.be.equal(1);

      // and
      expect(
        await accessControlManagerProxy.hasRealmContext(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          ethers.utils.keccak256(accessControlManagerProxy.address)
        )
      ).to.be.true;
    });

    it("Should enable upgrade of LIVELY_GENERAL_REALM by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true)
      )
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);

      // then
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        )
      ).to.be.true;
    });

    it("Should register LIVELY_VERSE_REALM realm by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy.connect(user1).registerRealm("LIVELY_VERSE_REALM", true, true)
      ).to.revertedWith("RegisterRealm Access Denied");
    });

    it("Should register LIVELY_VERSE_REALM by admin success", async () => {
      // when
      await expect(accessControlManagerProxy.connect(admin).registerRealm("LIVELY_VERSE_REALM", true, true))
        .to.emit(accessControlManagerProxy, "RealmRegistered")
        .withArgs(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
          adminAddress,
          "LIVELY_VERSE_REALM",
          true,
          true
        );

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
      );
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.isRealmExists(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
    });

    it("Should register LIVELY_VERSE_REALM twice by admin failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).registerRealm("LIVELY_VERSE_REALM", true, true)
      ).to.revertedWith("Realm Already Registered");
    });

    it("Should change status LIVELY_VERSE_REALM by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
      ).to.revertedWith("SetRealmStatus Access Denied");
    });

    it("Should change upgrade of LIVELY_VERSE_REALM by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
      ).to.revertedWith("SetRealmUpgradeStatus Access Denied");
    });

    it("Should disable status LIVELY_VERSE_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
      );
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
    });

    it("Should disable upgrade LIVELY_VERSE_REALM by admin failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
      )
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
      );
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.false;

      // and
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.false;
    });

    it("Should enable status LIVELY_VERSE_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
      );
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.false;

      // and
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.false;
    });

    it("Should enable upgrade LIVELY_VERSE_REALM by admin failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
      )
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);

      // then
      const [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
      );
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
    });
  });

  describe("IContextManagement Tests", function () {
    let baseUupsProxy: BaseUUPSProxyTest;

    it("Should add new func to ACL context with by user1 failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .addContextFuncRole(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      ).to.revertedWith("AddContextFuncRole Access Denied");
    });

    it("Should remove function from ACL context with by user1 failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector)
      ).to.revertedWith("RemoveContextFunc Access Denied");
    });

    it("Should grant role to ACL context function with by user1 failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .grantContextRole(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      ).to.revertedWith("GrantContextRole Access Denied");
    });

    it("Should remove role from ACL context function  with by user1 failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .revokeContextRole(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      ).to.revertedWith("RevokeContextRole Access Denied");
    });

    it("Should change realm context with by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setContextRealm(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
          )
      ).to.revertedWith("SetContextRealm Access Denied");
    });

    it("Should change context status with by user1 failed", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user1)
          .setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), true)
      ).to.revertedWith("SetContextStatus Access Denied");
    });

    it("Should register BaseUUPSContractTest context with by user1 failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(user1);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(user1);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(user1).deploy(baseUupsProxy.address, typedArray1);
      const signature = await generateContextDomainSignatureByHardhat(
        proxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        accessControlManagerProxy.address,
        userAddress1,
        networkChainId
      );

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address);
      await expect(
        baseUupsProxy
          .connect(user1)
          .initialize(
            "BaseUUPSContractTest",
            "1.0.0",
            "LIVELY_GENERAL_REALM",
            signature,
            accessControlManagerProxy.address
          )
      ).to.revertedWith("Access Denied");
    });

    it("Should register BaseUUPSContractTest context with Invalid Realm by admin failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await generateContextDomainSignatureByHardhat(
        proxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_REALM",
        accessControlManagerProxy.address,
        adminAddress,
        networkChainId
      );

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address);
      await expect(
        baseUupsProxy
          .connect(admin)
          .initializeWithInvalidRealm(
            "BaseUUPSContractTest",
            "1.0.0",
            "LIVELY_REALM",
            signature,
            accessControlManagerProxy.address
          )
      ).to.revertedWith("Realm Not Found");
    });

    it("Should register BaseUUPSContractTest context with Invalid Role by admin failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await generateContextDomainSignatureByHardhat(
        proxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        accessControlManagerProxy.address,
        adminAddress,
        networkChainId
      );

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address);
      await expect(
        baseUupsProxy
          .connect(admin)
          .initializeWithInvalidRole(
            "BaseUUPSContractTest",
            "1.0.0",
            "LIVELY_GENERAL_REALM",
            signature,
            accessControlManagerProxy.address
          )
      ).to.revertedWith("Role Not Found");
    });

    it("Should register BaseUUPSContractTest context by admin success", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      baseUupsProxy = await baseUupsProxyFactory.deploy();
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await generateContextDomainSignatureByHardhat(
        proxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        accessControlManagerProxy.address,
        adminAddress,
        networkChainId
      );

      // when
      baseUupsProxy = await baseUupsProxy.attach(proxy.address);
      await expect(
        baseUupsProxy
          .connect(admin)
          .initialize(
            "BaseUUPSContractTest",
            "1.0.0",
            "LIVELY_GENERAL_REALM",
            signature,
            accessControlManagerProxy.address
          )
      ).to.emit(accessControlManagerProxy, "ContextRegistered")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          baseUupsProxy.address,
          adminAddress,
          baseUupsProxy.address,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        );

      // then
      const response: ResponseContextStruct = await accessControlManagerProxy.getContextInfo(
        ethers.utils.keccak256(baseUupsProxy.address)
      );
      expect(response).to.be.not.null;
      expect(response.name).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BaseUUPSContractTest")));
      expect(response.version).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(response.realm).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(response.contractId).to.be.hexEqual(baseUupsProxy.address);
      expect(response.isSafeMode).to.be.false;
      expect(response.isUpgradable).to.be.false;

      // and
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("setSafeMode(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("setUpgradeStatus(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("setSafeMode(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("setLocalAdmin(address)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
    });

    it("Should remove ACL context function with by admin failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector)
      ).to.revertedWith("Illegal Remove ACL Context");
    });

    it("Should grant role to ACL context function with by admin failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .grantContextRole(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      ).to.revertedWith("Illegal Grant ACL Context");
    });

    it("Should remove role from ACL context function  with by admin failed", async () => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(aclArtifact.abi);
      const method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .revokeContextRole(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      ).to.revertedWith("Illegal Revoke ACL Context");
    });

    it("Should add upgradeToAnonymousRole function to BaseUUPSContractTest context with by admin success", async () => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .addContextFuncRole(
            ethers.utils.keccak256(baseUupsProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE"))
          )
      )
        .to.emit(accessControlManagerProxy, "ContextFuncRoleAdded")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")),
          adminAddress,
          method_selector,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        );

      // and
      expect(
        await accessControlManagerProxy.hasContextRole(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ANONYMOUS_ROLE")),
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isContextFunctionExists(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;
    });

    it("Should enable upgrade of BaseUUPSContractTest context with by admin success", async () => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(baseUupsProxy, "UpgradeStatusChanged")
        .withArgs(
          adminAddress,
          baseUupsProxy.address,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          true
        );
    });

    it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 success", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToAnonymous")
        .withArgs(userAddress1, baseUupsProxy.address);
    });

    it("Should grant TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async () => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .grantContextRole(
            ethers.utils.keccak256(baseUupsProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      )
        .to.emit(accessControlManagerProxy, "ContextRoleGranted")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          adminAddress,
          method_selector,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        );

      // and
      expect(
        await accessControlManagerProxy.hasContextRole(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          method_selector
        )
      ).to.be.true;
    });

    it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address)).to.revertedWith(
        "upgradeToAnonymousRole Forbidden"
      );
    });

    it("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user2 success", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToAnonymous")
        .withArgs(userAddress2, baseUupsProxy.address);
    });

    it("Should revoke TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async () => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .revokeContextRole(
            ethers.utils.keccak256(baseUupsProxy.address),
            method_selector,
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
          )
      )
        .to.emit(accessControlManagerProxy, "ContextRoleRevoked")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          adminAddress,
          method_selector,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        );

      // and
      expect(
        await accessControlManagerProxy.hasContextRole(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          method_selector
        )
      ).to.be.false;
    });

    it("Should remove upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async () => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      const method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .removeContextFunc(ethers.utils.keccak256(baseUupsProxy.address), method_selector)
      )
        .to.emit(accessControlManagerProxy, "ContextFuncRemoved")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
        );

      // and
      expect(
        await accessControlManagerProxy.hasContextRole(
          ethers.utils.keccak256(baseUupsProxy.address),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")),
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionExists(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.false;
    });

    it("Should update BaseUUPSContractTest context with by user1 failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await generateContextDomainSignatureManually(
        baseUupsProxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        accessControlManagerProxy.address,
        userWallet1,
        networkChainId
      );

      // when and then
      await expect(baseUupsProxy.connect(user1).reInitialize(signature)).to.revertedWith("Caller Not Authorized");
    });

    it("Should update BaseUUPSContractTest context with Invalid Realm failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await generateContextDomainSignatureByHardhat(
        baseUupsProxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_REALM",
        accessControlManagerProxy.address,
        adminAddress,
        networkChainId
      );

      // when and then
      await expect(baseUupsProxy.connect(admin).reInitializeWithInvalidRealm(signature)).to.revertedWith(
        "Realm Not Found"
      );
    });

    it("Should update BaseUUPSContractTest context with Invalid Role failed", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await generateContextDomainSignatureManually(
        baseUupsProxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        accessControlManagerProxy.address,
        adminWallet,
        networkChainId
      );

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(baseUupsProxy.address);
      await expect(baseUupsProxy.connect(admin).reInitializeWithInvalidRole(signature)).to.revertedWith(
        "Role Not Found"
      );
    });

    it("Should update BaseUUPSContractTest context with by admin success", async () => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const signature = await generateContextDomainSignatureManually(
        baseUupsProxy.address,
        "BaseUUPSContractTest",
        "1.0.0",
        "LIVELY_VERSE_REALM",
        accessControlManagerProxy.address,
        adminWallet,
        networkChainId
      );

      // when
      await expect(baseUupsProxy.connect(admin).reInitialize(signature))
        .to.emit(accessControlManagerProxy, "ContextUpdated")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          baseUupsProxy.address,
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        );

      // then
      expect(await accessControlManagerProxy.isContextEnabled(ethers.utils.keccak256(baseUupsProxy.address))).to.be
        .true;
      expect(await accessControlManagerProxy.isContextExists(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isContextUpgradable(ethers.utils.keccak256(baseUupsProxy.address))).to.be
        .true;
      expect(await accessControlManagerProxy.isContextSafeMode(ethers.utils.keccak256(baseUupsProxy.address))).to.be
        .false;

      // and
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeTo(address, bytes memory, bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;

      // and
      method_selector = iface.getSighash("setUpgradeStatus(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;

      // and
      method_selector = iface.getSighash("setSafeMode(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;

      // and
      method_selector = iface.getSighash("setLocalAdmin(address)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isContextFunctionExists(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.false;

      // and
      method_selector = iface.getSighash("upgradeToTesterRole(address)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress2,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;

      // and
      method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress1,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          userAddress2,
          method_selector
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isContextFunctionEnabled(
          ethers.utils.keccak256(baseUupsProxy.address),
          method_selector
        )
      ).to.be.true;

      // and
      const arrayFuncs = await accessControlManagerProxy.getContextFuncs(ethers.utils.keccak256(baseUupsProxy.address));
      expect(arrayFuncs.length).to.be.equal(6);
    });

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user1 failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
        "upgradeToTesterRole Forbidden"
      );
    });

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 success", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToTester")
        .withArgs(userAddress2, baseUupsProxy.address);
    });

    it("Should call upgradeToAnonymousRole of BaseUUPSContractTest by user1 success", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToAnonymous")
        .withArgs(userAddress1, baseUupsProxy.address);
    });

    it("Should disable status of LIVELY_VERSE_REALM by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);

      // and
      expect(
        await accessControlManagerProxy.isRealmExists(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.false;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
    });

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
        "upgradeToTesterRole Forbidden"
      );
    });

    it("Should call UpgradeToTesterRole of BaseUUPSContractTest by admin failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(admin).upgradeToTesterRole(baseUupsProxy.address)).to.revertedWith(
        "upgradeToTesterRole Forbidden"
      );
    });

    it("Should enable status of LIVELY_VERSE_REALM by admin success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true)
      )
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);

      // and
      expect(
        await accessControlManagerProxy.isRealmExists(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmEnabled(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRealmUpgradable(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        )
      ).to.be.true;

      // and
      expect(
        await accessControlManagerProxy.hasRealmContext(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
          ethers.utils.keccak256(baseUupsProxy.address)
        )
      ).to.be.true;
    });

    it("Should change realm of ACL by admin failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setContextRealm(
            ethers.utils.keccak256(accessControlManagerProxy.address),
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
          )
      ).to.revertedWith("Illegal Change ACL Context Realm");
    });

    it("Should change realm of BaseUUPSContractTest to LIVELY_GENERAL_REALM by admin success", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setContextRealm(
            ethers.utils.keccak256(baseUupsProxy.address),
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
          )
      )
        .to.emit(accessControlManagerProxy, "ContextRealmChanged")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))
        );

      // then
      expect(
        await accessControlManagerProxy.hasRealmContext(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")),
          ethers.utils.keccak256(baseUupsProxy.address)
        )
      ).to.be.true;
      expect(
        await accessControlManagerProxy.hasRealmContext(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
          ethers.utils.keccak256(baseUupsProxy.address)
        )
      ).to.be.false;
    });

    it("Should disable status of ACL context by admin failed", async () => {
      // when
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), false)
      ).to.revertedWith("Illegal Change ACL Context Status");
    });

    it("Should disable status of BaseUUPSProxyTest context by admin success", async () => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");

      // when
      await expect(
        accessControlManagerProxy.connect(admin).setContextStatus(ethers.utils.keccak256(baseUupsProxy.address), false)
      )
        .to.emit(accessControlManagerProxy, "ContextStatusChanged")
        .withArgs(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),
          false
        );

      // then
      const iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      const method_selector = iface.getSighash("setSafeMode(bool)");
      expect(
        await accessControlManagerProxy.hasAccess(
          ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress,
          method_selector
        )
      ).to.be.false;
    });

    it("Should enable SafeMode BaseUUPSProxyTest context by admin failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");
    });

    it("Should disable Upgrade status of BaseUUPSProxyTest context by admin failed", async () => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setUpgradeStatus(false)).to.revertedWith("SetUpgradeStatus Forbidden");
    });

    it("Should check status of ACL success", async () => {
      // when and then
      expect(
        await accessControlManagerProxy.isRoleEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isRoleExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))
      ).to.be.true;
      expect(
        await accessControlManagerProxy.isLivelyGeneralGroup(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))
        )
      ).to.be.false;
      expect(await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(baseUupsProxy.address))).to.be
        .true;
      expect(
        await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(accessControlManagerProxy.address))
      ).to.be.true;
      expect(await accessControlManagerProxy.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManagerProxy.isLivelyAdminRole(userAddress1)).to.be.false;
      expect(await accessControlManagerProxy.isLivelySystemAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManagerProxy.isLivelySystemAdminRole(userAddress1)).to.be.false;
    });
  });

  describe("Contract Upgradable Storage Test", function() {
    it("Should AccessControlManager storage verification before upgrade success", async() => {
      const baseProxy_slot_0 = await readStorageSlot(accessControlManagerProxy.address, 0);
      const baseProxy_slot_1 = await readStorageSlot(accessControlManagerProxy.address, 1);
      const baseProxy_slot_2 = await readStorageSlot(accessControlManagerProxy.address, 2);
      const baseProxy_slot_3 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 0);
      const baseProxy_slot_4 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 1);
      const baseProxy_slot_67 = await readStorageSlotFixedArray(accessControlManagerProxy.address, 3, 64);
      const acm_RoleMap_slot_70 = await readStorageSlotHashMap(accessControlManagerProxy.address, LIVELY_ADMIN_ROLE, 70);
      const acm_GroupMap_slot_72 = await readStorageSlotHashMap(accessControlManagerProxy.address, LIVELY_GENERAL_GROUP, 72);

      expect(baseProxy_slot_0).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
      expect(baseProxy_slot_1).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(baseProxy_slot_2).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect("0x" + baseProxy_slot_3.slice(26)).to.be.hexEqual(accessControlManagerProxy.address);
      expect(baseProxy_slot_4).to.be.hexEqual("0x".padEnd(64, "0"))
      expect(baseProxy_slot_67).to.be.hexEqual("0x".padEnd(64, "0"))
      expect(acm_RoleMap_slot_70).to.be.hexEqual(LIVELY_GENERAL_GROUP);
      expect(acm_GroupMap_slot_72.slice(0,acm_GroupMap_slot_72.length-2)).to.be.equal(ethers.utils.formatBytes32String("LIVELY_GENERAL_GROUP").slice(0,acm_GroupMap_slot_72.length-2));
    })

    it("Should AccessControlManagerTest subject deploy success", async () => {
      // given
      const accessControlManagerTestFactory = new AccessControlManagerTest__factory(admin);

      // when
      accessControlManagerTestSubject = await accessControlManagerTestFactory.deploy();

      // then
      expect(accessControlManagerTestSubject.address).not.null;
      expect(await accessControlManagerTestSubject.isSafeMode()).to.be.true;
      expect(await accessControlManagerTestSubject.isUpgradable()).to.be.false;
      expect(await accessControlManagerTestSubject.initVersion()).to.be.equal(0);
    });

    it("Should upgrade proxy with accessControlManagerTestSubject by admin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerTestSubject.address, typedArray1, false)
      )
        .to.emit(accessControlManagerProxy, "Upgraded")
        .withArgs(adminAddress, accessControlManagerProxy.address, accessControlManagerTestSubject.address);

      accessControlManagerTestProxy = accessControlManagerTestSubject.attach(accessControlManagerProxy.address);
      await accessControlManagerTestProxy.connect(admin).initialize();
      expect(await accessControlManagerTestProxy.initVersion()).to.be.equal(2);

    });

    it("Should AccessControlManagerTest storage verification after upgrade success", async() => {
      const baseProxy_slot_0 = await readStorageSlot(accessControlManagerTestProxy.address, 0);
      const baseProxy_slot_1 = await readStorageSlot(accessControlManagerTestProxy.address, 1);
      const baseProxy_slot_2 = await readStorageSlot(accessControlManagerTestProxy.address, 2);
      const baseProxy_slot_3 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 0);
      const baseProxy_slot_4 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 1);
      const baseProxy_slot_67 = await readStorageSlotFixedArray(accessControlManagerTestProxy.address, 3, 64);
      const acm_RoleMap_slot_70 = await readStorageSlotHashMap(accessControlManagerTestProxy.address, LIVELY_ADMIN_ROLE, 70);
      const acm_GroupMap_slot_72 = await readStorageSlotHashMap(accessControlManagerTestProxy.address, LIVELY_GENERAL_GROUP, 72);
      const acm_dataCollection_slot_73 = await readStorageSlotStruct(accessControlManagerTestProxy.address, 68,5);
      const acm_slot_74 = await readStorageSlot(accessControlManagerTestProxy.address, 74);

      expect(baseProxy_slot_0).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
      expect(baseProxy_slot_1).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(baseProxy_slot_2).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect("0x" + baseProxy_slot_3.slice(26)).to.be.hexEqual(accessControlManagerProxy.address);
      expect(baseProxy_slot_4).to.be.hexEqual("0x".padEnd(64, "0"))
      expect(baseProxy_slot_67).to.be.hexEqual("0x".padEnd(64, "0"))
      expect(acm_RoleMap_slot_70).to.be.hexEqual(LIVELY_GENERAL_GROUP);
      expect(acm_GroupMap_slot_72.slice(0,acm_GroupMap_slot_72.length-2)).to.be.equal(ethers.utils.formatBytes32String("LIVELY_GENERAL_GROUP").slice(0,acm_GroupMap_slot_72.length-2));
      expect(parseInt(acm_dataCollection_slot_73)).to.be.equal(100);
      expect(acm_slot_74).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UPDATE_TEST")));
    })
  })
});
