import { expect } from "chai";
import { Signer, BigNumber, Wallet, BytesLike } from "ethers";
import { ethers, waffle, deployments } from "hardhat";

import {
  AccessControlManager,
  AccessControlManager__factory,
  BaseUUPSProxyTest,
  BaseUUPSProxyTest__factory,
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
  InitializedEventObject, IContextManagement
} from "../../export/types/acl/AccessControlManager";
import { AccessControlManagerLibraryAddresses } from "../../export/types/factories/acl/AccessControlManager__factory";
import { LContextManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LContextManagement__factory";
import { LGroupManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LGroupManagement__factory";
import { LRealmManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LRealmManagement__factory";
import { LRoleManagementLibraryAddresses } from "../../export/types/factories/lib/acl/LRoleManagement__factory";
import { Address } from "hardhat-deploy/dist/types";
import { describe } from "mocha";
import ResponseContextStruct = IContextManagement.ResponseContextStruct;

// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("src/contracts/lib/acl/ContextManagementLib.sol:ContextManagementLib")) => 0x0304621006bd13fe54dc5f6b75a37ec856740450109fd223c2bfb60db9095cad => __$0304621006bd13fe54dc5f6b75a37ec856$__ ( library placeholder)

const { provider, deployMockContract, deployContract } = waffle;


export const DOMAIN_HASH: string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"));
export const MESSAGE_TYPE_HASH: string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Context(address contract,bytes32 name,bytes32 version,bytes32 realm)"));

describe("AccessControlManager Tests", function () {
  let admin: Signer;
  let user1: Signer;
  let user2: Signer;
  let adminWallet: Wallet;
  let userWallet1: Wallet;
  let userWallet2: Wallet;
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
  let accessControlManagerProxy: AccessControlManager;


  this.beforeAll(async () => {
    [admin, user1, user2] = await ethers.getSigners();
    [adminWallet, userWallet1, userWallet2] = waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    userAddress1 = await user1.getAddress();
    userAddress2 = await user2.getAddress();
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

  describe("Subject (AccessControlManager Implementation) Tests", function () {

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
      await expect(accessControlManagerSubject.connect(admin).setUpgradeStatus(true)).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setAdmin raise exception", async () => {
      // when
      const address = await user1.getAddress();

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

  describe("Proxy (UUPS Proxy Implementation) Tests", function () {

    it("Should proxy deployment by admin with Invalid subject failed", async () => {
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

    it("Should proxy deployment by admin with Illegal subject failed", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi);
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(proxyFactory.connect(admin).deploy(illegalUUPS.address, typedArray1))
        .to.revertedWith("Illegal UUPS Contract")
    });

    it("Should deploy proxy success without initialize (typechain)", async () => {
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

    it("Should enable SafeMode of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setSafeMode(true))
        .to.revertedWith("Contract Not Initialized")
    });

    it("Should enable UpgradeState of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(true))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should setAdmin of proxy by admin failed when not initialized", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setAdmin(userAddress1))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should upgrade proxy by admin failed when not initialized", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.revertedWith("SafeMode: Call Rejected")
    });

    it("Should deploy and initialize proxy success (js)", async () => {
      // given
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
      expect(await accessControlManager.getInitializeStatus(), "Invalid Initialize State").to.be.false;
      expect(await accessControlManager.getAdmin(), "Invalid Admin").to.be.hexEqual(adminAddress);
      expect(await accessControlManager.contractName(), "Invalid Name").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
      expect(await accessControlManager.contractVersion(), "Invalid Version").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await accessControlManager.contractRealm(), "Invalid Realm").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(await accessControlManager.getAccessControlManager(), "Invalid Access Control Manager").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManager.contractContext(), "Invalid Context").to.be.hexEqual(ethers.utils.keccak256(acmProxy.address));
      expect(await accessControlManager.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(accessControlSubject.address);
    });

    it("Should proxy raising events when deployment and initialization were successful", async () => {
      // given
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
      expect(adminChangedEvent.newAdmin, "Invalid New Admin Address").to.be.hexEqual(adminAddress);

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
      await expect(uupsProxy
        .connect(admin)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          invalidUupsAcl.address
        )).to.revertedWith("Invalid AccessControlManager");
    });

    it("Should initialize proxy with Illegal AccessControlManager failed", async () => {
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

    it("Should deploy and initialize proxy success (typechain)", async () => {
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
      expect(await accessControlManagerProxy.getInitializeStatus(), "Invalid Initialize State").to.be.false;
      expect(await accessControlManagerProxy.getAdmin(), "Invalid Admin").to.be.hexEqual(adminAddress);
      expect(await accessControlManagerProxy.contractName(), "Invalid Name").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager")));
      expect(await accessControlManagerProxy.contractVersion(),"Invalid Version").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(await accessControlManagerProxy.contractRealm(), "Invalid Realm").to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(await accessControlManagerProxy.getAccessControlManager(), "Invalid Access Control").to.be.hexEqual(acmProxy.address);
      expect(await accessControlManagerProxy.contractContext(), "Invalid Context").to.be.hexEqual(ethers.utils.keccak256(acmProxy.address));
      expect(await accessControlManagerProxy.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(accessControlManagerSubject.address);
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
        accessControlManagerProxy
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Upgrade Call Rejected");
    });

    it("Should enable Upgrade Status of proxy by user1 failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setUpgradeStatus(true))
        .to.be.revertedWith("SetUpgradeStatus Forbidden")
    });

    it("Should enable Upgrade Status of proxy by admin success", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(accessControlManagerProxy, "UpgradeStatusChanged")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          true
        );
    });

    it("Should upgrade proxy raise 'Illegal New Implementation' exception for same subjects ", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        accessControlManagerProxy
          .connect(admin)
          .upgradeTo(accessControlManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal New Implementation");
    });

    it("Should upgrade proxy by common user1 failed", async () => {
      // given
      const accessControlManagerSubjectFactory =new AccessControlManager__factory(linkLibraryAddresses, admin);
      accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(user1).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.revertedWith("Upgrade Context Forbidden")
    });

    it("Should upgrade proxy by admin with invalid uups subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidUUPS = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidUUPS.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bb0");
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(invalidUUPS.address, typedArray1, false))
        .to.revertedWith("Invalid UUPS Contract")
    });

    it("Should upgrade proxy by admin with invalid IProxy subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidProxy = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidProxy.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");
      await invalidProxy.mock.supportsInterface.returns(false);
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(invalidProxy.address, typedArray1, false))
        .to.revertedWith("Invalid IProxy Contract")
    });

    it("Should upgrade proxy by admin with Illegal subject failed", async () => {
      // given
      const iBaseProxy = await deployments.getArtifact("IBaseProxy");
      const illegalUUPS = await deployMockContract(admin, iBaseProxy.abi)
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(illegalUUPS.address, typedArray1, false))
        .to.revertedWith("Illegal UUPS Contract")
    });

    it("Should upgrade proxy by admin with invalid IProxy subject failed", async () => {
      // given
      const baseUUPSProxy = await deployments.getArtifact("UUPSUpgradeableTest");
      const invalidProxy = await deployMockContract(admin, baseUUPSProxy.abi);
      await invalidProxy.mock.proxiableUUID.returns("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(invalidProxy.address, typedArray1, false))
        .to.revertedWith("Illegal IProxy Contract")
    });

    it("Should upgrade proxy by admin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(accessControlManagerProxy.connect(admin).upgradeTo(accessControlManagerSubject.address, typedArray1, false))
        .to.emit(accessControlManagerProxy, "Upgraded")
        .withArgs(
          adminAddress,
          accessControlManagerProxy.address,
          accessControlManagerSubject.address
        );
    });

    it("Should setAdmin proxy to new account success", async () => {
      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).setAdmin(userAddress1)
      ).to.emit(accessControlManagerProxy, 'AdminChanged')
          .withArgs(adminAddress, accessControlManagerProxy.address, userAddress1)
    });

    it("Should init proxy call by new admin failed", async () => {
      // when and then
      await expect(accessControlManagerProxy
        .connect(user1)
        .initialize(
          "AccessControlManager",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          ethers.constants.AddressZero
        )).to.revertedWith("Contract Already Initialized")
    });

    it("Should enable SafeMode proxy by user1 failed", async () => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setSafeMode(true))
        .to.revertedWith("SetSafeMode Forbidden");
    });

    it("Should enable SafeMode proxy by admin success", async () => {
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

    it("Should setAdmin proxy failed (in safeMode)", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(
        accessControlManagerProxy.connect(admin).setAdmin(address)
      ).to.revertedWith("SafeMode: Call Rejected");
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
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")
          ),
          false
        );
    });
  });

  describe("IGroupManagement Tests", function() {
    it("Should register new group by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true))
        .to.revertedWith("RegisterGroup Access Denied");
    });

    it("Should disable status LIVELY_GENERAL_GROUP by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false))
        .to.revertedWith("SetGroupStatus Access Denied");
    });

    it("Should disable status LIVELY_GENERAL_GROUP by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), false))
        .to.emit(accessControlManagerProxy, "GroupStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, false)

      // and
      let [name, status] = await accessControlManagerProxy.getGroupInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")))
      expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
      expect(status).to.be.false
    });

    it("Should register INOVERS_GROUP group by admin failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerGroup("INOVERS_GROUP", true))
        .to.revertedWith("RegisterGroup Access Denied");
    });

    it("Should enable status LIVELY_GENERAL_GROUP by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), true))
        .to.emit(accessControlManagerProxy, "GroupStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), adminAddress, true)

      // then
      let [name, status] = await accessControlManagerProxy.getGroupInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")))
      expect(name).to.be.equal("LIVELY_GENERAL_GROUP");
      expect(status).to.be.true

      // and
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")))).to.be.true
      expect(await accessControlManagerProxy.isLivelyGeneralGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")))).to.be.true
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")))).to.be.true
      expect(await accessControlManagerProxy.isLivelyGeneralGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")))).to.be.true

      // and
      let groupRoles = await accessControlManagerProxy.getGroupRoles(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")))
      expect(groupRoles.length).to.be.equal(2)
    });

    it("Should register INOVERS_GROUP group by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).registerGroup("INOVERS_GROUP", true))
        .to.emit(accessControlManagerProxy, "GroupRegistered")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), adminAddress, "INOVERS_GROUP", true)

      // then
      expect(await accessControlManagerProxy.isGroupExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))).to.be.true
      expect(await accessControlManagerProxy.isGroupEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))).to.be.true
    });

    it("Should disable status INOVERS_GROUP by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setGroupStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), false))
        .to.revertedWith("SetGroupStatus Access Denied");
    });
  });

  describe("IRoleManagement Tests", function() {
    it("Should new register role by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true))
        .to.revertedWith("RegisterRole Access Denied");
    });

    it("Should grant LIVELY_ADMIN_ROLE role to user2 by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), userAddress2))
        .to.revertedWith("GrantRoleAccount Access Denied");
    });

    it("Should revoke admin account from LIVELY_ADMIN_ROLE by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).revokeRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), adminAddress))
        .to.revertedWith("RevokeRoleAccount Access Denied");
    });

    it("Should revoke admin account from LIVELY_ADMIN_ROLE by admin failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).revokeRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), adminAddress))
        .to.revertedWith("Illegal Revoke Role Account");
    });

    it("Should disable status of LIVELY_ADMIN_ROLE role by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), false))
        .to.revertedWith("SetRoleStatus Access Denied");
    });

    it("Should change group of LIVELY_ADMIN_ROLE role by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setRoleGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))))
        .to.revertedWith("SetRoleGroup Access Denied");
    });

    it("Should disable status of LIVELY_ADMIN_ROLE role by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), false))
        .to.revertedWith("Illegal Change Role Status");
    });

    it("Should grant new account to role of ANONYMOUS_ROLE role by admin failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ANONYMOUS_ROLE")), userAddress2))
        .to.revertedWith("Illegal Grant Anonymous Role");
    });

    it("Should get role info of LIVELY_ADMIN_ROLE success", async() => {
      // when
      let [name, group, status] = await accessControlManagerProxy.getRoleInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")));

      // then
      expect(name).to.be.equal("LIVELY_ADMIN_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
      expect(status).to.be.true

      // and
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_ADMIN_ROLE")), adminAddress)).to.be.true
      expect(await accessControlManagerProxy.isLivelyAdmin(adminAddress)).to.be.true
      expect(await accessControlManagerProxy.isLivelySystemAdmin(adminAddress)).to.be.true
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")), userAddress1)).to.be.false
      expect(await accessControlManagerProxy.isLivelyAdmin(userAddress1)).to.be.false
      expect(await accessControlManagerProxy.isLivelySystemAdmin(userAddress2)).to.be.false
    });

    it("Should get role info of LIVELY_SYSTEM_ADMIN_ROLE success", async() => {
      // when
      let [name, group, status] = await accessControlManagerProxy.getRoleInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")));

      // then
      expect(name).to.be.equal("LIVELY_SYSTEM_ADMIN_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));
      expect(status).to.be.true

      // and
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")), adminAddress)).to.be.true
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_SYSTEM_ADMIN_ROLE")), userAddress1)).to.be.false
    });

    it("Should register new TESTER_ROLE role by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).registerRole("TESTER_ROLE", ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true))
        .to.emit(accessControlManagerProxy, "RoleRegistered")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), "TESTER_ROLE", adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true);

      // then
      let [name, group, status] = await accessControlManagerProxy.getRoleInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")));
      expect(name).to.be.equal("TESTER_ROLE");
      expect(group).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")));
      expect(status).to.be.true
    });

    it("Should grant TESTER_ROLE role to user1 by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1))
        .to.emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1, adminAddress);

      // then
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)).to.be.true;

      // and
      let roleAccounts = await accessControlManagerProxy.getRoleAccounts(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")));
      expect(roleAccounts.length).to.be.equal(1);
    });

    it("Should revoke TESTER_ROLE role from user1 by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).revokeRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1))
        .to.emit(accessControlManagerProxy, "RoleAccountRevoked")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1, adminAddress);

      // then
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress1)).to.be.false;

      // and
      let roleAccounts = await accessControlManagerProxy.getRoleAccounts(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")));
      expect(roleAccounts.length).to.be.equal(0);
    });

    it("Should grant TESTER_ROLE role to user2 by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).grantRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2))
        .to.emit(accessControlManagerProxy, "RoleAccountGranted")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2, adminAddress);

      // then
      expect(await accessControlManagerProxy.hasRoleAccount(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), userAddress2)).to.be.true;

      // and
      let roleAccounts = await accessControlManagerProxy.getRoleAccounts(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")));
      expect(roleAccounts.length).to.be.equal(1);
    });

    it("Should disable status of TESTER_ROLE role by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), false))
        .to.emit(accessControlManagerProxy, "RoleStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), false);
    });

    it("Should enable status of TESTER_ROLE role by user2 failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(user2).setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true))
        .to.revertedWith("SetRoleStatus Access Denied");
    });

    it("Should enable status of TESTER_ROLE role by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRoleStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), true))
        .to.emit(accessControlManagerProxy, "RoleStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), true);
    });

    it("Should change group of TESTER_ROLE role to LIVELY_GENERAL_GROUP by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRoleGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP"))))
        .to.emit(accessControlManagerProxy, "RoleGroupChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")));

      // then
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.true
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.false

      // and
      let groupRoles = await accessControlManagerProxy.getGroupRoles(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")))
      expect(groupRoles.length).to.be.equal(3)
    });

    it("Should change group of TESTER_ROLE role to INOVERS_GROUP by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRoleGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP"))))
        .to.emit(accessControlManagerProxy, "RoleGroupChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")));

      // then
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.false
      expect(await accessControlManagerProxy.hasGroupRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.true

      // and
      let groupRoles = await accessControlManagerProxy.getGroupRoles(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_GROUP")))
      expect(groupRoles.length).to.be.equal(2)

      // and
      expect(await accessControlManagerProxy.isGroupEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("INOVERS_GROUP")))).to.be.true;
    });

  });

  describe("IRealmManagement Tests", function() {
    it("Should disable upgrade of LIVELY_GENERAL_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false))
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);

      // then
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")))).to.be.false
    });

    it("Should disable proxy upgrade with setUpgradeStatus by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setUpgradeStatus(false))
        .to.revertedWith("Realm Upgrade Forbidden")
    });

    it("Should disable status LIVELY_GENERAL_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), false))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, false);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(name).to.be.equal("LIVELY_GENERAL_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.false;
    });

    it("Should enable upgrade of LIVELY_GENERAL_REALM by admin failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true))
        .to.revertedWith("SetRealmUpgradeStatus Access Denied")
    });

    it("Should enable status LIVELY_GENERAL_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(name).to.be.equal("LIVELY_GENERAL_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.false;

      // and
      let realmContexts = await accessControlManagerProxy.getRealmContexts(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));
      expect(realmContexts.length).to.be.equal(1);

      // and
      expect(await accessControlManagerProxy.hasRealmContext(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), ethers.utils.keccak256(accessControlManagerProxy.address))).to.be.true;
    });

    it("Should enable upgrade of LIVELY_GENERAL_REALM by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), true))
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), adminAddress, true);

      // then
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")))).to.be.true
    });

    it("Should register LIVELY_VERSE_REALM realm by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).registerRealm("LIVELY_VERSE_REALM", true, true))
        .to.revertedWith("RegisterRealm Access Denied")
    });

    it("Should register LIVELY_VERSE_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).registerRealm("LIVELY_VERSE_REALM", true, true))
        .to.emit(accessControlManagerProxy, "RealmRegistered")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),adminAddress, "LIVELY_VERSE_REALM", true, true);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.true;

      // and
      expect(await accessControlManagerProxy.isRealmExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
    });

    it("Should register LIVELY_VERSE_REALM twice by admin failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).registerRealm("LIVELY_VERSE_REALM", true, true))
        .to.revertedWith("Realm Already Registered")
    });

    it("Should change status LIVELY_VERSE_REALM by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false))
        .to.revertedWith("SetRealmStatus Access Denied")
    });

    it("Should change upgrade of LIVELY_VERSE_REALM by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false))
        .to.revertedWith("SetRealmUpgradeStatus Access Denied")
    });

    it("Should disable status LIVELY_VERSE_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),adminAddress, false);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.true;

      // and
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.false;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
    });

    it("Should disable upgrade LIVELY_VERSE_REALM by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false))
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),adminAddress, false);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.false;
      expect(isUpgradable).to.be.false;

      // and
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.false;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.false;
    });

    it("Should enable status LIVELY_VERSE_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),adminAddress, true);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.false;

      // and
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.false;
    });

    it("Should enable upgrade LIVELY_VERSE_REALM by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setRealmUpgradeStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true))
        .to.emit(accessControlManagerProxy, "RealmUpgradeStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")),adminAddress, true);

      // then
      let [name, isEnabled, isUpgradable] = await accessControlManagerProxy.getRealmInfo(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));
      expect(name).to.be.equal("LIVELY_VERSE_REALM");
      expect(isEnabled).to.be.true;
      expect(isUpgradable).to.be.true;

      // and
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
    });
  });

  describe("IContextManagement Tests", function() {
    let baseUupsProxy: BaseUUPSProxyTest;

    it ("Should add new func to ACL context with by user1 failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(user1).addContextFuncRole(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.revertedWith("AddContextFuncRole Access Denied")
    })

    it ("Should remove function from ACL context with by user1 failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(user1).removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector))
        .to.revertedWith("RemoveContextFunc Access Denied");
    })

    it ("Should grant role to ACL context function with by user1 failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(user1).grantContextRole(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.revertedWith("GrantContextRole Access Denied");
    })

    it ("Should remove role from ACL context function  with by user1 failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(user1).revokeContextRole(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.revertedWith("RevokeContextRole Access Denied");
    })

    it ("Should change realm context with by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setContextRealm(ethers.utils.keccak256(accessControlManagerProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM"))))
        .to.revertedWith("SetContextRealm Access Denied")
    })

    it ("Should change context status with by user1 failed", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(user1).setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), true))
        .to.revertedWith("SetContextStatus Access Denied")
    })

    it("Should register BaseUUPSContractTest context with by user1 failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(user1);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(user1);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(user1).deploy(baseUupsProxy.address, typedArray1);
      const signature = await signDataByHardhat(proxy.address,"BaseUUPSContractTest", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerProxy.address, userAddress1, networkChainId)

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address)
      await expect(baseUupsProxy.connect(user1)
        .initialize(
          "BaseUUPSContractTest",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          signature,
          accessControlManagerProxy.address)
      ).to.revertedWith("Access Denied")
    })

    it("Should register BaseUUPSContractTest context with Invalid Realm by admin failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await signDataByHardhat(proxy.address,"BaseUUPSContractTest", "1.0.0", "LIVELY_REALM", accessControlManagerProxy.address, adminAddress, networkChainId)

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address)
      await expect(baseUupsProxy.connect(admin)
        .initializeWithInvalidRealm(
          "BaseUUPSContractTest",
          "1.0.0",
          "LIVELY_REALM",
          signature,
          accessControlManagerProxy.address)
      ).to.revertedWith("Realm Not Found")
    })

    it("Should register BaseUUPSContractTest context with Invalid Role by admin failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      let baseUupsProxy: BaseUUPSProxyTest = await baseUupsProxyFactory.deploy();
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await signDataByHardhat(proxy.address,"BaseUUPSContractTest", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerProxy.address, adminAddress, networkChainId)

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(proxy.address)
      await expect(baseUupsProxy.connect(admin)
        .initializeWithInvalidRole(
          "BaseUUPSContractTest",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          signature,
          accessControlManagerProxy.address)
      ).to.revertedWith("Role Not Found")
    })

    it("Should register BaseUUPSContractTest context by admin success", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUupsProxyFactory = new BaseUUPSProxyTest__factory(admin);
      baseUupsProxy = await baseUupsProxyFactory.deploy();
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const proxyFactory = new Proxy__factory(admin);
      const typedArray1 = new Int8Array(0);
      const proxy = await proxyFactory.connect(admin).deploy(baseUupsProxy.address, typedArray1);
      const signature = await signDataByHardhat(proxy.address,"BaseUUPSContractTest", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerProxy.address, adminAddress, networkChainId)

      // when
      baseUupsProxy = await baseUupsProxy.attach(proxy.address)
      await expect(baseUupsProxy.connect(admin)
        .initialize(
          "BaseUUPSContractTest",
          "1.0.0",
          "LIVELY_GENERAL_REALM",
          signature,
          accessControlManagerProxy.address)
      ).to.emit(accessControlManagerProxy, "ContextRegistered")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address),
          baseUupsProxy.address, adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LIVELY_GENERAL_REALM')));

      // then
      let response: ResponseContextStruct = await accessControlManagerProxy.getContextInfo(ethers.utils.keccak256(baseUupsProxy.address));
      expect(response).to.be.not.null
      expect(response.name).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BaseUUPSContractTest")));
      expect(response.version).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
      expect(response.realm).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LIVELY_GENERAL_REALM')));
      expect(response.smca).to.be.hexEqual(baseUupsProxy.address);
      expect(response.isSafeMode).to.be.false;
      expect(response.isUpgradable).to.be.false;

      // and
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("setSafeMode(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false

      // and
      method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.false

      // and
      method_selector = iface.getSighash("setUpgradeStatus(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;

      // and
      method_selector = iface.getSighash("setSafeMode(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;

      // and
      method_selector = iface.getSighash("setAdmin(address)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
    })

    it ("Should remove ACL context function with by admin failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).removeContextFunc(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector))
        .to.revertedWith("Illegal Remove ACL Context");

    })

    it ("Should grant role to ACL context function with by admin failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).grantContextRole(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.revertedWith("Illegal Grant ACL Context")
    })

    it ("Should remove role from ACL context function  with by admin failed", async() => {
      // given
      const aclArtifact = await deployments.getArtifact("AccessControlManager");
      let iface = new ethers.utils.Interface(aclArtifact.abi);
      let method_selector = iface.getSighash("setContextStatus(bytes32,bool)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).revokeContextRole(ethers.utils.keccak256(accessControlManagerProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.revertedWith("Illegal Revoke ACL Context")
    })

    it ("Should add upgradeToAnonymousRole function to BaseUUPSContractTest context with by admin success", async() => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).addContextFuncRole(ethers.utils.keccak256(baseUupsProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ANONYMOUS_ROLE"))))
        .to.emit(accessControlManagerProxy, "ContextFuncRoleAdded")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ANONYMOUS_ROLE")), adminAddress, method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));

      // and
      expect(await accessControlManagerProxy.hasContextRole(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ANONYMOUS_ROLE")), method_selector)).to.be.true
      expect(await accessControlManagerProxy.isContextFunctionExists(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;
    })

    it ("Should enable upgrade of BaseUUPSContractTest context with by admin success", async() => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(baseUupsProxy, "UpgradeStatusChanged")
        .withArgs(adminAddress, baseUupsProxy.address, ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LIVELY_GENERAL_REALM')) ,true);
    })

    it ("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 success", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy,"UpgradeToAnonymous")
        .withArgs(userAddress1, baseUupsProxy.address);
    })

    it ("Should grant TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async() => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).grantContextRole(ethers.utils.keccak256(baseUupsProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.emit(accessControlManagerProxy, "ContextRoleGranted")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));

      // and
      expect(await accessControlManagerProxy.hasContextRole(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), method_selector)).to.be.true
    })

    it ("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user1 failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.revertedWith("upgradeToAnonymousRole Forbidden")
    })

    it ("Should call upgradeToAnonymousRole function of BaseUUPSContractTest context with by user2 success", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy,"UpgradeToAnonymous")
        .withArgs(userAddress2, baseUupsProxy.address);
    })

    it ("Should revoke TESTER_ROLE role to upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async() => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).revokeContextRole(ethers.utils.keccak256(baseUupsProxy.address), method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE"))))
        .to.emit(accessControlManagerProxy, "ContextRoleRevoked")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), adminAddress, method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));

      // and
      expect(await accessControlManagerProxy.hasContextRole(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), method_selector)).to.be.false
    })

    it ("Should remove upgradeToAnonymousRole function of BaseUUPSContractTest context by admin success", async() => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeToAnonymousRole(address)");

      // when and then
      await expect(accessControlManagerProxy.connect(admin).removeContextFunc(ethers.utils.keccak256(baseUupsProxy.address), method_selector))
        .to.emit(accessControlManagerProxy, "ContextFuncRemoved")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")));

      // and
      expect(await accessControlManagerProxy.hasContextRole(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")), method_selector)).to.be.false
      expect(await accessControlManagerProxy.isContextFunctionExists(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.false;
    })

    it("Should update BaseUUPSContractTest context with by user1 failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await signDataManually(baseUupsProxy.address, "BaseUUPSContractTest", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerProxy.address, userWallet1, networkChainId)

      // when and then
      await expect(baseUupsProxy.connect(user1).reInitialize(signature)).to.revertedWith("Caller Not Authorized")
    })

    it("Should update BaseUUPSContractTest context with Invalid Realm failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await signDataByHardhat(baseUupsProxy.address, "BaseUUPSContractTest", "1.0.0", "LIVELY_REALM", accessControlManagerProxy.address, adminAddress, networkChainId)

      // when and then
      await expect(baseUupsProxy.connect(admin).reInitializeWithInvalidRealm(signature)).to.revertedWith("Realm Not Found")
    })

    it("Should update BaseUUPSContractTest context with Invalid Role failed", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const signature = await signDataManually(baseUupsProxy.address, "BaseUUPSContractTest", "1.0.0", "LIVELY_GENERAL_REALM", accessControlManagerProxy.address, adminWallet, networkChainId)

      // when and then
      baseUupsProxy = await baseUupsProxy.attach(baseUupsProxy.address)
      await expect(baseUupsProxy.connect(admin).reInitializeWithInvalidRole(signature)).to.revertedWith("Role Not Found")
    })

    it("Should update BaseUUPSContractTest context with by admin success", async() => {
      // given
      const networkChainId = await provider.send("eth_chainId", []);
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");
      const signature = await signDataManually(baseUupsProxy.address,"BaseUUPSContractTest", "1.0.0", "LIVELY_VERSE_REALM", accessControlManagerProxy.address, adminWallet, networkChainId)

      // when
      await expect(baseUupsProxy.connect(admin)
        .reInitialize(signature)
      ).to.emit(accessControlManagerProxy, "ContextUpdated")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address),
          baseUupsProxy.address, adminAddress,
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LIVELY_VERSE_REALM')));

      // then
      expect(await accessControlManagerProxy.isContextEnabled(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isContextExists(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isContextUpgradable(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isContextSafeMode(ethers.utils.keccak256(baseUupsProxy.address))).to.be.false;

      // and
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("upgradeTo(address, bytes memory, bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.false;

      // and
      method_selector = iface.getSighash("upgradeToAndCall(address,bytes memory)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;

      // and
      method_selector = iface.getSighash("setUpgradeStatus(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;

      // and
      method_selector = iface.getSighash("setSafeMode(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;

      // and
      method_selector = iface.getSighash("setAdmin(address)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.isContextFunctionExists(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.false;

      // and
      method_selector = iface.getSighash("upgradeToTesterRole(address)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.false;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress2, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;

      // and
      method_selector = iface.getSighash("upgradeToAnonymousRole(address)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress1, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), userAddress2, method_selector)).to.be.true;
      expect(await accessControlManagerProxy.isContextFunctionEnabled(ethers.utils.keccak256(baseUupsProxy.address), method_selector)).to.be.true;

      //and
      let arrayFuncs = await accessControlManagerProxy.getContextFuncs(ethers.utils.keccak256(baseUupsProxy.address));
      expect(arrayFuncs.length).to.be.equal(6)
    })

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user1 failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToTesterRole(baseUupsProxy.address))
        .to.revertedWith("upgradeToTesterRole Forbidden");
    })

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 success", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToTester")
        .withArgs(userAddress2, baseUupsProxy.address)
    })

    it("Should call upgradeToAnonymousRole of BaseUUPSContractTest by user1 success", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user1).upgradeToAnonymousRole(baseUupsProxy.address))
        .to.emit(baseUupsProxy, "UpgradeToAnonymous")
        .withArgs(userAddress1, baseUupsProxy.address)
    })

    it("Should disable status of LIVELY_VERSE_REALM by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), false))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, false);

      // and
      expect(await accessControlManagerProxy.isRealmExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.false;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
    })

    it("Should call upgradeToTesterRole of BaseUUPSContractTest by user2 failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(user2).upgradeToTesterRole(baseUupsProxy.address))
        .to.revertedWith("upgradeToTesterRole Forbidden");
    })

    it("Should call UpgradeToTesterRole of BaseUUPSContractTest by admin failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(admin).upgradeToTesterRole(baseUupsProxy.address))
        .to.revertedWith("upgradeToTesterRole Forbidden");
    })

    it("Should enable status of LIVELY_VERSE_REALM by admin success", async() => {
      // when and then
      await expect(accessControlManagerProxy.connect(admin).setRealmStatus(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), true))
        .to.emit(accessControlManagerProxy, "RealmStatusChanged")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), adminAddress, true);

      // and
      expect(await accessControlManagerProxy.isRealmExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;
      expect(await accessControlManagerProxy.isRealmUpgradable(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")))).to.be.true;

      // and
      expect(await accessControlManagerProxy.hasRealmContext(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
    })

    it("Should change realm of ACL by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setContextRealm(ethers.utils.keccak256(accessControlManagerProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))))
        .to.revertedWith("Illegal Change ACL Context Realm")
    })

    it("Should change realm of BaseUUPSContractTest to LIVELY_GENERAL_REALM by admin success", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setContextRealm(ethers.utils.keccak256(baseUupsProxy.address), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))))
        .to.emit(accessControlManagerProxy, "ContextRealmChanged")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")));

      // then
      expect(await accessControlManagerProxy.hasRealmContext(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM")), ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.hasRealmContext(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_VERSE_REALM")), ethers.utils.keccak256(baseUupsProxy.address))).to.be.false;
    })

    it("Should disable status of ACL context by admin failed", async() => {
      // when
      await expect(accessControlManagerProxy.connect(admin).setContextStatus(ethers.utils.keccak256(accessControlManagerProxy.address), false))
        .to.revertedWith("Illegal Change ACL Context Status");
    })

    it("Should disable status of BaseUUPSProxyTest context by admin success", async() => {
      // given
      const baseUUPSProxyArtifact = await deployments.getArtifact("BaseUUPSProxyTest");

      // when
      await expect(accessControlManagerProxy.connect(admin).setContextStatus(ethers.utils.keccak256(baseUupsProxy.address), false))
        .to.emit(accessControlManagerProxy, "ContextStatusChanged")
        .withArgs(ethers.utils.keccak256(baseUupsProxy.address),
          adminAddress, ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LIVELY_VERSE_REALM')), false);

      // then
      let iface = new ethers.utils.Interface(baseUUPSProxyArtifact.abi);
      let method_selector = iface.getSighash("setSafeMode(bool)");
      expect(await accessControlManagerProxy.hasAccess(ethers.utils.keccak256(baseUupsProxy.address), adminAddress, method_selector)).to.be.false;
    })

    it("Should enable SafeMode BaseUUPSProxyTest context by admin failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setSafeMode(true))
        .to.revertedWith("SetSafeMode Forbidden")
    })

    it("Should disable Upgrade status of BaseUUPSProxyTest context by admin failed", async() => {
      // when and then
      await expect(baseUupsProxy.connect(admin).setUpgradeStatus(false))
        .to.revertedWith("SetUpgradeStatus Forbidden")
    })

    it("Should check status of ACL success", async() => {
      // when and then
      expect(await accessControlManagerProxy.isRoleEnabled(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.true;
      expect(await accessControlManagerProxy.isRoleExists(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.true;
      expect(await accessControlManagerProxy.isLivelyGeneralGroup(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TESTER_ROLE")))).to.be.false;
      expect(await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(baseUupsProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isLivelyGeneralRealm(ethers.utils.keccak256(accessControlManagerProxy.address))).to.be.true;
      expect(await accessControlManagerProxy.isLivelyAdmin(adminAddress)).to.be.true;
      expect(await accessControlManagerProxy.isLivelyAdmin(userAddress1)).to.be.false;
      expect(await accessControlManagerProxy.isLivelySystemAdmin(adminAddress)).to.be.true;
      expect(await accessControlManagerProxy.isLivelySystemAdmin(userAddress1)).to.be.false;
    });
  })
});

async function signDataByHardhat(
  contractAddress: Address,
  contractName: string,
  contractVersion: string,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Address,
  chainId: BigNumber,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<string> {
  const messageParams = JSON.stringify({
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Context: [
        { name: "contract", type: "address" },
        { name: "name", type: "bytes32" },
        { name: "version", type: "bytes32" },
        { name: "realm", type: "bytes32" },
      ],
    },
    primaryType: "Context",
    domain: {
      name: 'LContextManagement',
      version: '1.0.0',
      chainId: chainId,
      verifyingContract: verifyingContract
    },
    message: {
      contract: contractAddress,
      name: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractName])),
      version: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractVersion])),
      realm: ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractRealm])),
    },
  });

  const signature = await provider.send("eth_signTypedData_v4", [
    signerAddress,
    messageParams,
  ]);

  return signature;
}

async function signDataManually(
  contractAddress: Address,
  contractName: string,
  contractVersion: string,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Wallet,
  chainId: BigNumber,
): Promise<string> {
  let abiCoder = ethers.utils.defaultAbiCoder;
  const domainAbiEncode = abiCoder.encode(
      ["bytes32","bytes32","bytes32","uint256","address"],
      [DOMAIN_HASH, ethers.utils.keccak256(ethers.utils.solidityPack(["string"],["LContextManagement"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"],["1.0.0"])), chainId, verifyingContract]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);

  const messageAbiEncode = abiCoder.encode(
      ["bytes32","address","bytes32","bytes32","bytes32"],
      [MESSAGE_TYPE_HASH, contractAddress,
        ethers.utils.keccak256(ethers.utils.solidityPack(["string"],[contractName])),
        ethers.utils.keccak256(ethers.utils.solidityPack(["string"],[contractVersion])),
        ethers.utils.keccak256(ethers.utils.solidityPack(["string"],[contractRealm]))],
  );
  const msgEncode = ethers.utils.keccak256(messageAbiEncode);
  const domainMessageHash = ethers.utils.keccak256(ethers.utils.solidityPack(["string","bytes32","bytes32"],["\x19\x01",domainEncode,msgEncode]));
  const signature = signerAddress._signingKey().signDigest(domainMessageHash)

  // console.log(`\ndomainEncode: ${domainEncode}\nmessageEnode: ${msgEncode}\ndomainMessageHash: ${domainMessageHash}\n`);
  // console.log(`signature: r: ${signature.r}, s: ${signature.s}, v: ${signature.v}, compact: ${signature.compact}\n`);
  //Recover the address from signature
  // const recoveredAddress = ethers.utils.verifyMessage(domainMessageHash, signature);
  // console.log(`recoveredAddress: ${recoveredAddress}`);
  return signature.compact;
}
