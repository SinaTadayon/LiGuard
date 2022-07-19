import { expect } from "chai";
import { Signer } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

import {
  AccessControlManager,
  AccessControlManager__factory,
  LAccessControl,
  LAccessControl__factory,
  LContextManagement,
  LContextManagement__factory,
  LGroupManagement,
  LGroupManagement__factory,
  LRealmManagement,
  LRealmManagement__factory,
  LRoleManagement__factory,
  Proxy,
  Proxy__factory
} from "../../export/types";
import {
  UpgradedEventObject,
  AdminChangedEventObject,
  InitializedEventObject,
} from "../../export/types/acl/AccessControlManager";
import { AccessControlManagerLibraryAddresses } from "../../export/types/factories/acl/AccessControlManager__factory";
import { LContextManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LContextManagement__factory";
import { LGroupManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LGroupManagement__factory";
import { LRealmManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LRealmManagement__factory";
import { LRoleManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LRoleManagement__factory";

// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)

const { provider, deployMockContract, deployContract } = waffle;

describe("AccessControlManager", function () {
  let admin: Signer;
  let user: Signer;
  let cml: LContextManagement;
  let rml: LRealmManagement;
  let reml: LRealmManagement;
  let gml: LGroupManagement;
  let acl: LAccessControl;
  let linkLibraryAddresses: AccessControlManagerLibraryAddresses;

  this.beforeAll(async () => {
    [admin, user] = await ethers.getSigners();
  });

  describe("Libraries Deployments", function () {
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
      // linkLibraryAddresses = {
      //   "src/contracts/lib/acl/LContextManagement.sol:LContextManagement":
      //     contextManagementLib.address,
      // };

      // then 
      expect(cml.address).not.null;
      expect(await cml.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LContextManagement")));
      expect(await cml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
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
    })

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
    })

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
      expect(await reml.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LRealmManagement")));
      expect(await reml.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    })
  });

  describe("Subject (AccessControlMnanager Implementation)", function () {

    this.beforeAll(() => {
      linkLibraryAddresses = {
        ["src/contracts/lib/acl/LRoleManagement.sol:LRoleManagement"]: rml.address,
        ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: acl.address,
        ["src/contracts/lib/acl/LContextManagement.sol:LContextManagement"]: cml.address,
        ["src/contracts/lib/acl/LRealmManagement.sol:LRealmManagement"]: reml.address,
        ["src/contracts/lib/acl/LGroupManagement.sol:LGroupManagement"]: gml.address,
      }
    })

    let accessControlManagerSubject: AccessControlManager;
    it("Should AccessControlManager subject deploy success", async () => {
      // given
      const accessControlManagerFactory = new AccessControlManager__factory(linkLibraryAddresses,admin);

      // when
      accessControlManagerSubject = await accessControlManagerFactory.deploy();

      // then
      expect(accessControlManagerSubject.address).not.null;
      expect(await accessControlManagerSubject.isSafeMode()).to.be.true
      expect(await accessControlManagerSubject.isUpgradable()).to.be.false
      expect(await accessControlManagerSubject.getInitializedVersion()).to.be.equal(0);
    });

    it("Should initialize raise exception", async () => {
      // when and then
      await expect(
        accessControlManagerSubject
          .connect(admin)
          .initialize(
            "AccessControlManagement",
            "1.0.0",
            "LIVELY_GENERAL_REALM",
            accessControlManagerSubject.address
          )
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setSafeModeState raise exception", async () => {
      // when and then
      await expect(accessControlManagerSubject.connect(admin).setSafeMode(true)).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setUpgradeState raise exception", async () => {
      // when and then
      await expect(accessControlManagerSubject.connect(admin).setUpgradeState(true)).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setAdmin raise exception", async () => {
      // when
      const address = await user.getAddress();

      // when and then
      await expect(accessControlManagerSubject.connect(admin).setAdmin(address)).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should upgradeTo raise exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerSubject.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false)).to.be.revertedWith("Illegal Contract Call");
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

    it("Should proxy deployment by admin with Invalid subject raise exception", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidUUPS = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUUPS.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0");
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(proxyFactory.connect(admin).deploy(invalidUUPS.address, typedArray1))
        .to.revertedWith("Invalid UUPS Contract")
    });

    it("Should proxy deployment by admin with Illegal subject raise exception", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi);
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(proxyFactory.connect(admin).deploy(illegalUUPS.address, typedArray1))
        .to.revertedWith("Illegal UUPS Contract")
    });

    it("Should proxy deploy success without initialize (typechain)", async () => {
      // given
      const accessControlManagerSubjectFactory = new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(accessControlManagerSubject.address,new Int8Array(0));

      // then
      expect(acmProxy.address).to.be.not.null;
      accessControlManagerProxy= accessControlManagerSubject.attach(acmProxy.address);

      // and
      expect(await accessControlManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.true;
      expect(await accessControlManagerProxy.isUpgradable(), "Invalid Upgrade").to.be.false;
      expect(await accessControlManagerProxy.getInitializedVersion(), "Invalid Initialized Version").to.be.equal(0);
    });

    it("Should proxy setSafeMode call by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(true))
        .to.revertedWith("Contract Not Initialized")
    });

    it("Should proxy setUpgradeState call by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeState(true))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should proxy setAdmin call by admin failed when not initialized", async () => {
      // given
      const userAddress = await user.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setAdmin(userAddress))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should proxy upgrade call by admin failed when not initialized", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should proxy deploy and initialize success (js)", async () => {
      // given
      const adminAddress = await admin.getAddress();
      const accessControlFactory = await ethers.getContractFactory("AccessControlManager",
        {
          libraries: {
            LAccessControl: acl.address,
            LContextManagement: cml.address,            
            LRoleManagement: rml.address,
            LGroupManagement: gml.address,
            LRealmManagement: reml.address,
          },
        }
      );
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
      expect(await accessControlManager.getInitializedVersion(), "Invalid Initialized Version").to.be.equal(1);
      expect(await accessControlManager.getInitializeState(), "Invalid Initialize State").to.be.false;
      expect(await accessControlManager.getAdmin(), "Invalid Admin").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManager.contractName(), "Invalid Name").to.be.equal("AccessControlManager");
      expect(await accessControlManager.contractVersion(), "Invalid Version").to.be.equal("1.0.0");
      expect(await accessControlManager.contractRealm(), "Invalid Realm").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(await accessControlManager.getAccessControlManager(), "Invalid Access Control Manager").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManager.contractContext(), "Invalid Context").to.be.hexEqual(ethers.utils.keccak256(acmProxy.address));
      expect(await accessControlManager.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(accessControlSubject.address);
    });

    it("Should proxy deployed success, it was raising events", async () => {
      // given
      const adminAddress = await admin.getAddress();
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);

      const accessControlSubject =await accessControlManagerSubjectFactory.deploy();
      const accessControlArtifact = await deployments.getArtifact("AccessControlManager");
      const iface = new ethers.utils.Interface(accessControlArtifact.abi);
      const data = iface.encodeFunctionData("initialize", [
        "AccessControlManager",
        "1.0.0",
        "LIVELY_GENERAL_REALM",
        ethers.constants.AddressZero,
      ]);

      // when
      const accessControlProxy = await proxyFactory.deploy(accessControlSubject.address,data);
      const txReceipt = await accessControlProxy.deployTransaction.wait();

      // then
      let logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[0]);
      const upgradeEvent: UpgradedEventObject = <UpgradedEventObject>((<unknown>logDesc.args));
      expect(upgradeEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(upgradeEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(upgradeEvent.newImplementation,"Invalid New Implementation").to.be.hexEqual(accessControlSubject.address);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[1]);
      const adminChangedEvent: AdminChangedEventObject = <AdminChangedEventObject>(<unknown>logDesc.args);
      expect(adminChangedEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(adminChangedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(adminChangedEvent.newAdmin, "Invalid New Admin Address").to.be.hexEqual(accessControlProxy.address);

      // and
      logDesc = accessControlSubject.interface.parseLog(txReceipt.logs[2]);
      const initializedEvent: InitializedEventObject = <InitializedEventObject>((<unknown>logDesc.args));
      expect(initializedEvent.sender, "Invalid Sender Address").to.be.hexEqual(adminAddress);
      expect(initializedEvent.proxy, "Invalid Proxy Address").to.be.hexEqual(accessControlProxy.address);
      expect(initializedEvent.subject, "Invalid Subject Address").to.be.hexEqual(accessControlSubject.address);
      expect(initializedEvent.name, "Invalid Name").to.be.equal("AccessControlManager");
      expect(initializedEvent.version, "Invalid Version").to.be.equal("1.0.0");
      expect(initializedEvent.realm, "Invalid Realm").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(initializedEvent.initializedCount, "Invalid InitializedCount").to.be.equal(1);
    });

    it("Should proxy initialize with Invalid AccessControlManager", async () => {
      // given
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      const acmSubject = await accessControlManagerSubjectFactory.deploy();
      const baseUUPSProxy = await deployments.getArtifact("BaseUUPSProxyTest");
      const invalidUupsAcl = await deployMockContract(admin, baseUUPSProxy.abi);
      // await invalidUupsAcl.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");
      await invalidUupsAcl.mock.supportsInterface.returns(false);
      const proxyFactory = new Proxy__factory(admin);
      const acmProxy = await proxyFactory.deploy(acmSubject.address, new Int8Array(0));

      // when and then
      const uupsProxy = acmSubject.attach(acmProxy.address);
      await expect(uupsProxy
        .connect(admin)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          invalidUupsAcl.address
        )).to.revertedWith("Invalid AccessControlManager");
    });

    it("Should proxy initialize with Illegal AccessControlManager", async () => {
      // given
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      const acmSubject = await accessControlManagerSubjectFactory.deploy();
      const baseUUPSProxy = await deployments.getArtifact("BaseUUPSProxyTest");
      const illegalUupsAcl = await deployMockContract(admin, baseUUPSProxy.abi);
      await illegalUupsAcl.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");
      await illegalUupsAcl.mock.supportsInterface.reverts();
      const proxyFactory = new Proxy__factory(admin);
      const acmProxy = await proxyFactory.deploy(acmSubject.address, new Int8Array(0));

      // when and then
      const uupsProxy = acmSubject.attach(acmProxy.address);
      await expect(uupsProxy
        .connect(admin)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          illegalUupsAcl.address
        )).to.revertedWith("Illegal AccessControlManager");
    });

    it("Should proxy deploy and initialize success (typechain)", async () => {
      // given
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      const proxyFactory = new Proxy__factory(admin);
      accessControlManagerSubject =await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(accessControlManagerSubject.address, new Int8Array(0));
      accessControlManagerProxy = accessControlManagerSubject.attach(acmProxy.address);
      await accessControlManagerProxy
        .connect(admin)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          ethers.constants.AddressZero
        );

      // then
      expect(await accessControlManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await accessControlManagerProxy.isUpgradable(), "Invalid Upgradablability").to.be.false;
      expect(await accessControlManagerProxy.getInitializedVersion(), "Invalid InitailizedVersion").to.be.equal(1);
      expect(await accessControlManagerProxy.getInitializeState(), "Invalid Initialize State").to.be.false;
      expect(await accessControlManagerProxy.getAdmin(), "Invalid Admin").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManagerProxy.contractName(), "Invalid Name").to.be.equal("AccessControlManager");
      expect(await accessControlManagerProxy.contractVersion(),"Invalid Version").to.be.equal("1.0.0");
      expect(await accessControlManagerProxy.contractRealm(), "Invalid Realm").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(await accessControlManagerProxy.getAccessControlManager(), "Invalid Access Control").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManagerProxy.contractContext(), "Invalid Context").to.be.hexEqual(ethers.utils.keccak256(acmProxy.address));
      expect(await accessControlManagerProxy.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(accessControlManagerSubject.address);
    });

    it("Should proxy call proxyableUUID raised exception", async () => {
      // when and then
      await expect(accessControlManagerProxy.proxiableUUID()).to.be.revertedWith("Illegal Contract Delegatecall");
    });

    it("Should proxy upgrade raise 'Upgrade Call Rejected' exception", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Upgrade Call Rejected");
    });

    it("Should proxy call setUpgradeState by common user raise exception", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user).setUpgradeState(true))
        .to.be.revertedWith("SetUpgradeState Forbidden")
    });

    it("Should proxy call setUpgradeState by admin success", async () => {
      // given
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeState(true))
        .to.emit(accessControlManagerProxy, "UpgradeStateChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          true
        );
    });

    it("Should proxy upgrade raise 'Illegal New Implementation' exception for same subjects ", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal New Implementation");
    });

    it("Should proxy upgrade by common user raise exception", async () => {
      // given
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(user).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.revertedWith("Upgrade Context Forbidden")
    });

    it("Should proxy upgrade by admin with invalid subject raise exception", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidUUPS = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUUPS.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0");
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(invalidUUPS.address, typedArray1, false))
        .to.revertedWith("Invalid UUPS Contract")
    });

    it("Should proxy upgrade by admin with Illegal subject raise exception", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi)
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(illegalUUPS.address, typedArray1, false))
        .to.revertedWith("Illegal UUPS Contract")
    });

    it("Should proxy upgrade by admin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.emit(accessControlManagerProxy, "Upgraded")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          accessControlManagerSubject.address
        );
    });

    it("Should proxy setAdmin to new account", async () => {
      // given
      const userAddress = await user.getAddress();
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).setAdmin(userAddress)
      ).to.emit(accessControlManagerProxy, 'AdminChanged')
          .withArgs(adminAddress, accessControlManagerProxy.address, userAddress)
    });

    it("Should proxy init call by new admin ", async () => {
      // when and then
      await expect(accessControlManagerProxy
        .connect(user)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          ethers.constants.AddressZero
        )).to.revertedWith("Contract Already Initialized")
    });

    it("Should proxy setSafeMode called by common user raise exception", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user).setSafeMode(true))
        .to.revertedWith("SetSafeMode Call Forbidden");
    });

    it("Should proxy setSafeMode enable by admin success", async () => {
      // given
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(true))
        .to.emit(accessControlManagerProxy, "SafeModeChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          true
        );
    });

    it("Should proxy setAdmin raise exception when in safeMode", async () => {
      // when
      const address = await user.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).setAdmin(address)
      ).to.revertedWith("SafeMode: Call Rejected");
    });

    it("Should proxy SafeMode disable by admin success", async () => {
      // given
      const adminAddress = await admin.getAddress();

      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(false))
        .to.emit(accessControlManagerProxy, "SafeModeChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          false
        );
    });
  });
});
