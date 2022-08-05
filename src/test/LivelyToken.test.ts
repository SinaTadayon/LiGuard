import { expect } from "chai";
import { Signer, BigNumber, Wallet, BytesLike, BigNumberish } from "ethers";
import { ethers, waffle, deployments } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import {
  AccessControlManager,
  AccessControlManager__factory,
  LAccessControl__factory,
  LContextManagement__factory,
  LGroupManagement__factory,
  LivelyToken,
  LivelyToken__factory,
  LRealmManagement__factory,
  LRoleManagement__factory,
  LTokenERC20,
  LTokenERC20__factory, Proxy__factory
} from "../../export/types";
import { LivelyTokenLibraryAddresses } from "../../export/types/factories/token/lively/LivelyToken__factory";
import {
  generateDomainSeparator,
  generateDomainSignatureByHardhat,
  generateDomainSignatureManually
} from "./TestUtils";
import { PromiseOrValue } from "../../export/types/common";
const { provider, deployMockContract } = waffle;

describe("Lively Token Tests", function () {
  let admin: Signer;
  let systemAdmin: Signer;
  let user1: Signer;
  let user2: Signer;
  let taxTreasury: Signer;
  let adminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let userWallet1: Wallet;
  let userWallet2: Wallet;
  let taxTreasuryWallet: Wallet;
  let adminAddress: Address;
  let systemAdminAddress: Address;
  let userAddress1: Address;
  let userAddress2: Address;
  let taxTreasuryAddress: Address;
  let lTokenERC20: LTokenERC20;
  let linkLibraryAddresses: LivelyTokenLibraryAddresses;
  let accessControlManager: AccessControlManager;
  let livelyTokenSubject: LivelyToken;
  let livelyTokenProxy: LivelyToken;
  let tokenDecimal = BigNumber.from(10).pow(BigNumber.from(18));
  let livelyTokenDomainName = "LivelyToken";
  let livelyTokenDomainVersion = "1.0.0";
  let livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";
  let livelyTokenDomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainName));
  let livelyTokenDomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainVersion));
  let livelyTokenDomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainRealm));

  this.beforeAll(async () => {
    [admin, systemAdmin, user1, user2, taxTreasury] = await ethers.getSigners();
    [adminWallet, systemAdminWallet, userWallet1, userWallet2, taxTreasuryWallet] = waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    systemAdminAddress = await systemAdmin.getAddress();
    userAddress1 = await user1.getAddress();
    userAddress2 = await user2.getAddress();
    taxTreasuryAddress = await taxTreasury.getAddress();

    console.log(`admin address: ${adminAddress}`);
    console.log(`system admin address: ${systemAdminAddress}`);
  });

  describe("Libraries and Dependencies Deployments Test", function () {
    it("Should LTokenERC20 deploy success", async() => {
      // given
      const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);

      // when
      lTokenERC20 = await lTokenERC20Factory.deploy();

      // then
      expect(lTokenERC20.address).not.null;
      expect(await lTokenERC20.LIB_NAME()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LTokenERC20")));
      expect(await lTokenERC20.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    })

    it("Should deploy AccessControlManager success", async() => {
      // given
      const aclFactory = new LAccessControl__factory(systemAdmin);
      const acl = await aclFactory.deploy();
      const aclLinkLib = {
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
      };
      const cmlFactory = new LContextManagement__factory(aclLinkLib, systemAdmin);
      const rmlFactory = new LRoleManagement__factory(aclLinkLib, systemAdmin);
      const gmlFactory = new LGroupManagement__factory(aclLinkLib, systemAdmin);
      const remlFactory = new LRealmManagement__factory(aclLinkLib, systemAdmin);
      const cml = await cmlFactory.deploy();
      const rml = await rmlFactory.deploy();
      const gml = await gmlFactory.deploy();
      const reml = await remlFactory.deploy();

      const aclLinkLibraryAddresses = {
        "src/contracts/lib/acl/LRoleManagement.sol:LRoleManagement": rml.address,
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl": acl.address,
        "src/contracts/lib/acl/LContextManagement.sol:LContextManagement": cml.address,
        "src/contracts/lib/acl/LRealmManagement.sol:LRealmManagement": reml.address,
        "src/contracts/lib/acl/LGroupManagement.sol:LGroupManagement": gml.address,
      };

      const accessControlManagerSubjectFactory = new AccessControlManager__factory(aclLinkLibraryAddresses, systemAdmin);
      const proxyFactory = new Proxy__factory(systemAdmin);
      const accessControlManagerSubject = await accessControlManagerSubjectFactory.deploy();

      // when
      const acmProxy = await proxyFactory.deploy(accessControlManagerSubject.address, new Int8Array(0));
      accessControlManager = accessControlManagerSubject.attach(acmProxy.address);
      await accessControlManager
        .connect(systemAdmin)
        .initialize("AccessControlManager", "1.0.0", "LIVELY_GENERAL_REALM", ethers.constants.AddressZero);

      // then
      expect(await accessControlManager.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await accessControlManager.isUpgradable(), "Invalid Upgradablability").to.be.false;
      expect(await accessControlManager.initVersion(), "Invalid Init Version").to.be.equal(1);
      expect(await accessControlManager.initStatus(), "Invalid Init State").to.be.false;
      expect(await accessControlManager.localAdmin(), "Invalid Local Admin").to.be.hexEqual(systemAdminAddress);
      expect(await accessControlManager.contractName(), "Invalid Name").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AccessControlManager"))
      );
      expect(await accessControlManager.contractVersion(), "Invalid Version").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0"))
      );
      expect(await accessControlManager.contractRealm(), "Invalid Realm").to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LIVELY_GENERAL_REALM"))
      );
      expect(await accessControlManager.accessControlManager(), "Invalid Access Control").to.be.hexEqual(
        acmProxy.address
      );
      expect(await accessControlManager.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(acmProxy.address)
      );
      expect(await accessControlManager.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        accessControlManagerSubject.address
      );
    })

    it("Should grant admin account to LIVELY_ADMIN_ROLE success", async() => {
      // given
      let adminRole = await accessControlManager.livelyAdminRole();

      // when
      await expect(accessControlManager.connect(systemAdmin).grantRoleAccount(adminRole, adminAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminRole, adminAddress, systemAdminAddress)

      // then
      expect(await accessControlManager.isLivelyAdmin(adminAddress)).to.be.true
      expect(await accessControlManager.isLivelyAdmin(systemAdminAddress)).to.be.true
    })

    it("Should revoke systemAdmin from LIVELY_ADMIN_ROLE success", async() => {
      // given
      let adminRole = await accessControlManager.livelyAdminRole();

      // when
      await expect(accessControlManager.connect(admin).revokeRoleAccount(adminRole, systemAdminAddress))
        .to.emit(accessControlManager, "RoleAccountRevoked")
        .withArgs(adminRole, systemAdminAddress, adminAddress)

      // then
      expect(await accessControlManager.isLivelyAdmin(adminAddress)).to.be.true
      expect(await accessControlManager.isLivelyAdmin(systemAdminAddress)).to.be.false
    })
  })

  describe("Subject (LivelyToken Implementation) Tests", function() {

    this.beforeAll(async () => {
      linkLibraryAddresses = {
        "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
      }
    })

    it("Should LivelyToken Subject deploy success", async() => {
      // given
      const livelyTokenFactory = new LivelyToken__factory(linkLibraryAddresses, systemAdmin);

      // when
      livelyTokenSubject = await livelyTokenFactory.deploy();

      // then
      expect(livelyTokenSubject.address).to.be.not.null;
      expect(await livelyTokenSubject.isSafeMode()).to.be.true;
      expect(await livelyTokenSubject.isUpgradable()).to.be.false;
      expect(await livelyTokenSubject.initVersion()).to.be.equal(0);
      expect(await livelyTokenSubject.localAdmin()).to.be.hexEqual(systemAdminAddress);
    })

    it("Should initialize of LivelyToken subject failed", async() => {
      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).initialize({
        domainName: "LivelyToken",
        domainVersion: "1.0.0",
        domainRealm: "LIVELY_GENERAL_REALM",
        accessControlManager: accessControlManager.address,
        taxTreasuryAddress: taxTreasuryAddress,
        taxRateValue: BigNumber.from("300"),
        totalSupplyAmount: BigNumber.from("1000000000"),
        signature:"0x00"
      })).to.be.revertedWith("Illegal Contract Call")
    })

    it("Should setSafeModeState of LivelyToken subject failed", async () => {
      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setSafeMode(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setUpgradeState of LivelyToken subject failed", async () => {
      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setUpgradeStatus(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setLocalAdmin of LivelyToken subject failed", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(livelyTokenSubject.connect(systemAdmin).setLocalAdmin(address)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should upgradeTo of LivelyToken subject failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        livelyTokenSubject.connect(admin).upgradeTo(livelyTokenSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should return correct slot storage of LivelyToken subject", async () => {
      // when and then
      expect(await livelyTokenSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  })

  describe("LivelyToken (UUPS Proxy) Tests", function() {
    it("Should deploy then initialize LivelyToken proxy success (typechain, two steps)", async () => {
      // given
      const proxyFactory = new Proxy__factory(systemAdmin);
      const networkChainId = await provider.send("eth_chainId", []);
      const tokenProxy = await proxyFactory.deploy(livelyTokenSubject.address, new Int8Array(0));
      const signature = await generateDomainSignatureManually(
        tokenProxy.address,
        livelyTokenDomainName,
        livelyTokenDomainVersion,
        livelyTokenDomainRealm,
        accessControlManager.address,
        systemAdminWallet,
        networkChainId
      );
      const request: LivelyToken.InitRequestStruct = {
        domainName: livelyTokenDomainName,
        domainVersion: livelyTokenDomainVersion,
        domainRealm: livelyTokenDomainRealm,
        signature: signature,
        taxRateValue: BigNumber.from("300"),
        totalSupplyAmount: BigNumber.from("5000000000").mul(tokenDecimal),
        accessControlManager: accessControlManager.address,
        taxTreasuryAddress: taxTreasuryAddress,
      }

      // when
      livelyTokenProxy = livelyTokenSubject.attach(tokenProxy.address);
      await expect(livelyTokenProxy.connect(systemAdmin).initialize(request))
        .to.emit(livelyTokenProxy, "Upgraded")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, livelyTokenSubject.address)
        .to.emit(livelyTokenProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, systemAdminAddress)
        .to.emit(livelyTokenProxy, "Initialized")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, livelyTokenSubject.address,
          livelyTokenDomainName, livelyTokenDomainVersion, livelyTokenDomainRealmHash, 1)

      // then
      expect(await livelyTokenProxy.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await livelyTokenProxy.isUpgradable(), "Invalid Upgradability").to.be.false;
      expect(await livelyTokenProxy.initVersion(), "Invalid Init Version").to.be.equal(1);
      expect(await livelyTokenProxy.initStatus(), "Invalid Init State").to.be.false;
      expect(await livelyTokenProxy.localAdmin(), "Invalid Local Admin").to.be.hexEqual(systemAdminAddress);
      expect(await livelyTokenProxy.contractName(), "Invalid Name").to.be.hexEqual(livelyTokenDomainNameHash);
      expect(await livelyTokenProxy.contractVersion(), "Invalid Version").to.be.hexEqual(livelyTokenDomainVersionHash);
      expect(await livelyTokenProxy.contractRealm(), "Invalid Realm").to.be.hexEqual(livelyTokenDomainRealmHash);
      expect(await livelyTokenProxy.accessControlManager(), "Invalid Access Control").to.be.hexEqual(
        accessControlManager.address
      );
      expect(await livelyTokenProxy.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(livelyTokenProxy.address)
      );
      expect(await livelyTokenProxy.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        livelyTokenSubject.address
      );
      expect(await livelyTokenProxy.domainSeparator()).to.be
        .equal(generateDomainSeparator(livelyTokenDomainName, livelyTokenDomainVersion, livelyTokenProxy.address, networkChainId))
    })
  })
})