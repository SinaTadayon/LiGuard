import { expect } from "chai";
import { Signer } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

import {
  AccessControlManager,
  AccessControlManager__factory,
  LContextManagement,
  LContextManagement__factory,
  Proxy,
  Proxy__factory,
} from "../../export/types";
import {
  UpgradedEventObject,
  AdminChangedEventObject,
  InitializedEventObject,
} from "../../export/types/acl/AccessControlManager";
import { AccessControlManagerLibraryAddresses } from "../../export/types/factories/acl/AccessControlManager__factory";

// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)

const { provider, deployMockContract, deployContract } = waffle;

describe("AccessControlManager", function () {
  let admin: Signer;
  let user: Signer;
  let contextManagementLib: LContextManagement;
  let linkLibraryAddresses: AccessControlManagerLibraryAddresses;
  this.beforeAll(async () => {
    [admin, user] = await ethers.getSigners();
    const contextManagementLibFactory = new LContextManagement__factory(admin);
    contextManagementLib = await contextManagementLibFactory.deploy();
    linkLibraryAddresses = {
      "src/contracts/lib/acl/LContextManagement.sol:LContextManagement":
        contextManagementLib.address,
    };
  });

  describe("Subject (AccessControlMnanager Implementation)", function () {
    let accessControlManagerSubject: AccessControlManager;
    it("Should deploy AccessControlManager subject success", async () => {
      // given
      const accessControlManagerFactory = new AccessControlManager__factory(
        linkLibraryAddresses,
        admin
      );

      // when
      accessControlManagerSubject = await accessControlManagerFactory.deploy();

      // then
      expect(accessControlManagerSubject.address).not.null;
      expect(await accessControlManagerSubject.isActivated()).to.be.equal(
        false
      );
      expect(await accessControlManagerSubject.isUpgradable()).to.be.equal(
        false
      );
      expect(
        await accessControlManagerSubject.getInitializedCount()
      ).to.be.equal(0);
    });

    it("Should initialize raise exception", async () => {
      // when and then
      await expect(
        accessControlManagerSubject
          .connect(admin)
          .initialize(
            "AccessControlManagement",
            "v0.0.1",
            "LIVELY_GENERAL_REALM",
            accessControlManagerSubject.address
          )
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setActivity raise exception", async () => {
      // when and then
      await expect(
        accessControlManagerSubject.connect(admin).setActivity(true)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setUpgradability raise exception", async () => {
      // when and then
      await expect(
        accessControlManagerSubject.connect(admin).setUpgradability(true)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setAdmin raise exception", async () => {
      // when
      const address = await user.getAddress();

      // when and then
      await expect(
        accessControlManagerSubject.connect(admin).setAdmin(address)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should upgradeTo raise exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerSubject
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should return slot storage of subject", async () => {
      // when and then
      expect(await accessControlManagerSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  });

  describe("Proxy (UUPS Proxy Implementation)", function () {
    let accessControlManagerSubject: AccessControlManager;
    let accessControlManagerProxy: AccessControlManager;
    it("Should proxy deploy success without initialize (typechain)", async () => {
      // given
      const accessControlManagerSubjectFactory =
        new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);

      const accessControlSubject =
        await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(
        accessControlSubject.address,
        new Int8Array(0)
      );

      // then
      expect(acmProxy.address).to.be.not.null;
      const accessControlProxy = accessControlSubject.attach(acmProxy.address);

      // and
      expect(await accessControlProxy.isActivated(), "Invalid Activated").to.be
        .false;
      expect(
        await accessControlProxy.isUpgradable(),
        "Invalid Upgradablability"
      ).to.be.false;
      expect(
        await accessControlProxy.getInitializedCount(),
        "Invalid InitailizedCount"
      ).to.be.equal(0);
    });

    it("Should proxy deploy success with initialize", async () => {
      // given
      const adminAddress = await admin.getAddress();
      const accessControlFactory = await ethers.getContractFactory(
        "AccessControlManager",
        {
          libraries: {
            ContextManagementLib: contextManagementLib.address,
          },
        }
      );
      const accessControlSubject = await accessControlFactory
        .connect(admin)
        .deploy();
      const accessControlArtifact = await deployments.getArtifact(
        "AccessControlManager"
      );

      const iface = new ethers.utils.Interface(accessControlArtifact.abi);
      const data = iface.encodeFunctionData("initialize", [
        "AccessControlManager",
        "v0.0.1",
        "LIVELY_GENERAL_REALM",
        ethers.constants.AddressZero,
      ]);

      // when
      const proxyFactory = await ethers.getContractFactory("Proxy");
      const acProxy = await proxyFactory
        .connect(admin)
        .deploy(accessControlSubject.address, data);

      // then
      expect(acProxy.address).to.be.not.null;
      const accessControlManager = accessControlFactory.attach(acProxy.address);

      // and
      expect(await accessControlManager.isActivated(), "Invalid Activated").to
        .be.true;
      expect(
        await accessControlManager.isUpgradable(),
        "Invalid Upgradablability"
      ).to.be.false;
      expect(
        await accessControlManager.getInitializedCount(),
        "Invalid InitailizedCount"
      ).to.be.equal(1);
      expect(
        await accessControlManager.isInitializing(),
        "Invalid Initializing"
      ).to.be.false;
      expect(
        await accessControlManager.getAdmin(),
        "Invalid Admin"
      ).to.be.hexEqual(acProxy.address);
      expect(
        await accessControlManager.contractName(),
        "Invalid Name"
      ).to.be.equal("AccessControlManager");
      expect(
        await accessControlManager.contractVersion(),
        "Invalid Version"
      ).to.be.equal("v0.0.1");
      expect(
        await accessControlManager.contractRealm(),
        "Invalid Realm"
      ).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(
        await accessControlManager.getAccessControl(),
        "Invalid Access Control"
      ).to.be.hexEqual(acProxy.address);
      expect(
        await accessControlManager.contractContext(),
        "Invalid Context"
      ).to.be.hexEqual(ethers.utils.keccak256(acProxy.address));
      expect(
        await accessControlManager.subjectAddress(),
        "Invalid Subject Address"
      ).to.be.hexEqual(accessControlSubject.address);
    });

    it("Should raise events when deploy proxy success", async () => {
      // given
      const adminAddress = await admin.getAddress();
      const accessControlManagerSubjectFactory =
        new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);

      const accessControlSubject =
        await accessControlManagerSubjectFactory.deploy();
      const accessControlArtifact = await deployments.getArtifact(
        "AccessControlManager"
      );
      const iface = new ethers.utils.Interface(accessControlArtifact.abi);
      const data = iface.encodeFunctionData("initialize", [
        "AccessControlManager",
        "v0.0.1",
        "LIVELY_GENERAL_REALM",
        ethers.constants.AddressZero,
      ]);

      // when
      const accessControlProxy = await proxyFactory.deploy(
        accessControlSubject.address,
        data
      );
      const txReceipt = await accessControlProxy.deployTransaction.wait();

      // then
      let logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[0]);
      const upgradeEvent: UpgradedEventObject = <UpgradedEventObject>(
        (<unknown>logDesc.args)
      );
      expect(upgradeEvent.sender, "Invalid Sender Address").to.be.hexEqual(
        adminAddress
      );
      expect(upgradeEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(
        accessControlProxy.address
      );
      expect(
        upgradeEvent.newImplementation,
        "Invalid New Implementation"
      ).to.be.hexEqual(accessControlSubject.address);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[1]);
      const adminChangedEvent: AdminChangedEventObject = <
        AdminChangedEventObject
      >(<unknown>logDesc.args);
      expect(adminChangedEvent.sender, "Invalid Sender Address").to.be.hexEqual(
        adminAddress
      );
      expect(adminChangedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(
        accessControlProxy.address
      );
      expect(
        adminChangedEvent.newAdmin,
        "Invalid New Admin Address"
      ).to.be.hexEqual(accessControlProxy.address);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[2]);
      const initializedEvent: InitializedEventObject = <InitializedEventObject>(
        (<unknown>logDesc.args)
      );
      expect(initializedEvent.sender, "Invalid Sender Address").to.be.hexEqual(
        adminAddress
      );
      expect(initializedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(
        accessControlProxy.address
      );
      expect(
        initializedEvent.subject,
        "Invalid Subject Address"
      ).to.be.hexEqual(accessControlSubject.address);
      expect(initializedEvent.name, "Invalid Name").to.be.equal(
        "AccessControlManager"
      );
      expect(initializedEvent.version, "Invalid Version").to.be.equal("v0.0.1");
      expect(initializedEvent.realm, "Invalid Realm").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(
        initializedEvent.initializedCount,
        "Invalid InitializedCount"
      ).to.be.equal(1);
    });

    it("Should proxy deploy and initialize success (typechain)", async () => {
      // given
      const accessControlManagerSubjectFactory =
        new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);

      accessControlManagerSubject =
        await accessControlManagerSubjectFactory.deploy();

      // when
      const acProxy = await proxyFactory.deploy(
        accessControlManagerSubject.address,
        new Int8Array(0)
      );
      accessControlManagerProxy = accessControlManagerSubject.attach(
        acProxy.address
      );
      await accessControlManagerProxy
        .connect(admin)
        .initialize(
          "AccessControlManager",
          "v0.0.1",
          "LIVELY_GENERAL_REALM",
          ethers.constants.AddressZero
        );

      // then
      expect(await accessControlManagerProxy.isActivated(), "Invalid Activated")
        .to.be.true;
      expect(
        await accessControlManagerProxy.isUpgradable(),
        "Invalid Upgradablability"
      ).to.be.false;
      expect(
        await accessControlManagerProxy.getInitializedCount(),
        "Invalid InitailizedCount"
      ).to.be.equal(1);
      expect(
        await accessControlManagerProxy.isInitializing(),
        "Invalid Initializing"
      ).to.be.false;
      expect(
        await accessControlManagerProxy.getAdmin(),
        "Invalid Admin"
      ).to.be.hexEqual(acProxy.address);
      expect(
        await accessControlManagerProxy.contractName(),
        "Invalid Name"
      ).to.be.equal("AccessControlManager");
      expect(
        await accessControlManagerProxy.contractVersion(),
        "Invalid Version"
      ).to.be.equal("v0.0.1");
      expect(
        await accessControlManagerProxy.contractRealm(),
        "Invalid Realm"
      ).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(
        await accessControlManagerProxy.getAccessControl(),
        "Invalid Access Control"
      ).to.be.hexEqual(acProxy.address);
      expect(
        await accessControlManagerProxy.contractContext(),
        "Invalid Context"
      ).to.be.hexEqual(ethers.utils.keccak256(acProxy.address));
      expect(
        await accessControlManagerProxy.subjectAddress(),
        "Invalid Subject Address"
      ).to.be.hexEqual(accessControlManagerSubject.address);
    });

    it("Should proxiableUUID raised exception", async () => {
      // when and then
      await expect(
        accessControlManagerProxy.proxiableUUID()
      ).to.be.revertedWith("Illeagal Contract Delegatecall");
    });

    it("Should upgradeTo raise exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Context Upgradable Disabled");
    });

    it("Should setUpgradability enabled", async () => {
      // given
      const userAddress = await user.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy.connect(user).setUpgradability(true)
      )
        .to.emit(accessControlManagerProxy, "UpgradabilityChanged")
        .withArgs(
          userAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          true
        );
    });

    it("Should upgradeTo success", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const userAddress = await user.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(user)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      )
        .to.emit(accessControlManagerProxy, "Upgraded")
        .withArgs(
          userAddress,
          accessControlManagerProxy.address,
          accessControlManagerSubject.address
        );
    });

    it("Should setActivity disabled", async () => {
      // given
      const userAddress = await user.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(user).setActivity(false))
        .to.emit(accessControlManagerProxy, "ActivityChanged")
        .withArgs(
          userAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          false
        );
    });

    it("Should setAdmin raise exception", async () => {
      // when
      const address = await user.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy.connect(user).setAdmin(address)
      ).to.be.revertedWith("Context Not Activated");
    });
  });
});
