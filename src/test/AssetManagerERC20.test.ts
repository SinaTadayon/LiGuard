import { BigNumber, Signer, Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types";
import {
  AccessControlManager,
  AccessControlManager__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory,
  LAccessControl__factory,
  LAssetManagerERC20,
  LAssetManagerERC20__factory,
  LContextManagement__factory,
  LGroupManagement__factory,
  LivelyToken,
  LivelyToken__factory,
  LRealmManagement__factory,
  LRoleManagement__factory,
  LTokenERC20__factory,
  Proxy__factory,
  Relay
} from "../../typechain/types";
import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { generateContextDomainSignatureManually, generateDomainSeparator } from "./TestUtils";
import {
  AssetManagerERC20LibraryAddresses
} from "../../typechain/types/factories/token/asset/AssetManagerERC20__factory";
const { provider } = waffle;


describe("Asset Manager ERC20 Token Tests", function () {
  let admin: Signer;
  let systemAdmin: Signer;
  let assetManager: Signer;
  let assetAdmin: Signer;
  let crowdFoundingAssetManager: Signer;
  let validatorsRewardsAssetManager: Signer;
  let publicSaleAssetManager: Signer;
  let treasuryAssetManager: Signer;
  let foundingTeamAssetManager: Signer;
  let audioVideoProgramAssetManager: Signer;
  let user1: Signer;
  let user2: Signer;
  // let taxTreasury: Signer;
  let adminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let user1Wallet: Wallet;
  let user2Wallet: Wallet;
  let assetManagerWallet: Wallet;
  let assetAdminWallet: Wallet;
  let crowdFoundingAssetManagerWallet: Wallet;
  let validatorsRewardsAssetManagerWallet: Wallet;
  let publicSaleAssetManagerWallet: Wallet;
  let treasuryAssetManagerWallet: Wallet;
  let foundingTeamAssetManagerWallet: Wallet;
  let audioVideoProgramAssetManagerWallet: Wallet;
  // let taxTreasuryWallet: Wallet;
  let adminAddress: Address;
  let systemAdminAddress: Address;
  let user1Address: Address;
  let user2Address: Address;
  let assetManagerAddress: Address;
  let assetAdminAddress: Address;
  let crowdFoundingAssetManagerAddress: Address;
  let validatorsRewardsAssetManagerAddress: Address;
  let publicSaleAssetManagerAddress: Address;
  let treasuryAssetManagerAddress: Address;
  let foundingTeamAssetManagerAddress: Address;
  let audioVideoProgramAssetManagerAddress: Address;
  let crowdFoundingAssetAddress: Address;
  let validatorsRewardsAssetAddress: Address;
  let publicSaleAssetAddress: Address;
  let treasuryAssetAddress: Address;
  let foundingTeamAssetAddress: Address;
  let audioVideoProgramAssetAddress: Address;
  // let taxTreasuryAddress: Address;
  let accessControlManager: AccessControlManager;
  let daoExecutorForwarder: Relay;
  let livelyToken: LivelyToken;
  let assetManagerLinkLibraryAddresses: AssetManagerERC20LibraryAddresses;
  let lAssetManagerERC20: LAssetManagerERC20;
  let assetManagerSubject: AssetManagerERC20;
  let assetManagerProxy: AssetManagerERC20;
  let networkChainId: number;
  let user1LockIds: string[] = [];
  let user2LockIds: string[] = [];
  let livelyTokenTotalSupply: BigNumber;
  const taxValue = BigNumber.from(300);
  const tokenDecimal = BigNumber.from(10).pow(BigNumber.from(18));
  const dummyAmount = BigNumber.from(10000).mul(tokenDecimal);
  const livelyAudioVideoProgramAssetName = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
  const livelyFoundingTeamAssetName = "LIVELY_FOUNDING_TEAM_ASSET";
  const livelyTreasuryAssetName = "LIVELY_TREASURY_ASSET";
  const livelyPublicSaleAssetName = "LIVELY_PUBLIC_SALE_ASSET";
  const livelyValidatorRewardsAssetName = "LIVELY_VALIDATORS_REWARDS_ASSET";
  const livelyCrowdFoundingAssetName = "LIVELY_CROWD_FOUNDING_ASSET";
  const livelyTaxTreasuryAssetName = "LIVELY_TAX_TREASURY_ASSET";
  const assetManagerERC20DomainName = "AssetManagerERC20";
  const assetManagerERC20DomainVersion = "1.0.0";
  const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";
  const assetManagerERC20DomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(assetManagerERC20DomainName));
  const assetManagerERC20DomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(assetManagerERC20DomainVersion));
  const assetManagerERC20DomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(assetManagerERC20DomainRealm));

  this.beforeAll(async () => {
    [
      admin,
      systemAdmin,
      assetAdmin,
      crowdFoundingAssetManager,
      validatorsRewardsAssetManager,
      publicSaleAssetManager,
      treasuryAssetManager,
      foundingTeamAssetManager,
      audioVideoProgramAssetManager,
      user1,
      user2
    ] = await ethers.getSigners();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    [
      adminWallet,
      systemAdminWallet,
      assetManagerWallet,
      assetAdminWallet,
      crowdFoundingAssetManagerWallet,
      validatorsRewardsAssetManagerWallet,
      publicSaleAssetManagerWallet,
      treasuryAssetManagerWallet,
      foundingTeamAssetManagerWallet,
      audioVideoProgramAssetManagerWallet,
      user1Wallet,
      user2Wallet,
    ] = waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    systemAdminAddress = await systemAdmin.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    // taxTreasuryAddress = await taxTreasury.getAddress();
    assetManagerAddress = await assetManager.getAddress();
    assetAdminAddress = await assetAdmin.getAddress();
    crowdFoundingAssetManagerAddress = await crowdFoundingAssetManager.getAddress();
    validatorsRewardsAssetManagerAddress = await validatorsRewardsAssetManager.getAddress();
    publicSaleAssetManagerAddress = await publicSaleAssetManager.getAddress();
    treasuryAssetManagerAddress = await treasuryAssetManager.getAddress();
    foundingTeamAssetManagerAddress = await foundingTeamAssetManager.getAddress();
    audioVideoProgramAssetManagerAddress = await audioVideoProgramAssetManager.getAddress();
    networkChainId = parseInt(await provider.send("eth_chainId", []));
    // console.log(`system admin address: ${systemAdminAddress}`);
  });

  describe("Libraries and Dependencies Deployments Test", function() {
    it("Should deploy AccessControlManager success", async () => {
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

      const accessControlManagerSubjectFactory = new AccessControlManager__factory(
        aclLinkLibraryAddresses,
        systemAdmin
      );
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
    });

    it("Should grant LIVELY_ADMIN_ROLE to admin account success", async () => {
      // given
      const adminRole = await accessControlManager.livelyAdminRole();

      // when
      await expect(accessControlManager.connect(systemAdmin).grantRoleAccount(adminRole, adminAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(systemAdminAddress, adminRole, adminAddress);

      // then
      expect(await accessControlManager.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManager.isLivelyAdminRole(systemAdminAddress)).to.be.true;
    });

    it("Should revoke systemAdmin from LIVELY_ADMIN_ROLE success", async () => {
      // given
      const adminRole = await accessControlManager.livelyAdminRole();

      // when
      await expect(accessControlManager.connect(admin).revokeRoleAccount(adminRole, systemAdminAddress))
        .to.emit(accessControlManager, "RoleAccountRevoked")
        .withArgs(adminAddress, adminRole, systemAdminAddress);

      // then
      expect(await accessControlManager.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManager.isLivelyAdminRole(systemAdminAddress)).to.be.false;
    });

    it("Should grant LIVELY_ASSET_ADMIN_ROLE to asset admin account success", async () => {
      // given
      const assetAdminRole = await accessControlManager.livelyAssetAdminRole();

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(assetAdminRole, assetAdminAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, assetAdminRole, assetManagerAddress);

      // then
      expect(await accessControlManager.isLivelyAssetAdminRole(assetAdminAddress)).to.be.true;
    });

    it("Should LivelyToken token deploy success", async () => {
      // given
      const livelyTokenDomainName = "LivelyToken";
      const livelyTokenDomainVersion = "1.0.0";
      const livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";
      const livelyTokenDomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainName));
      const livelyTokenDomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainVersion));
      const livelyTokenDomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainRealm));
      const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);
      const lTokenERC20 = await lTokenERC20Factory.deploy();
      const libraryAddresses = {
        "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
      };
      const livelyTokenFactory = new LivelyToken__factory(libraryAddresses, systemAdmin);
      const livelyTokenSubject = await livelyTokenFactory.deploy();

      const proxyFactory = new Proxy__factory(systemAdmin);
      const networkChainId = await provider.send("eth_chainId", []);
      const tokenProxy = await proxyFactory.deploy(livelyTokenSubject.address, new Int8Array(0));
      const signature = await generateContextDomainSignatureManually(
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
        signature,
        taxRateValue: BigNumber.from(0),
        accessControlManager: accessControlManager.address,
        assetManager: assetManagerAddress,
      };

      // when
      livelyToken = livelyTokenSubject.attach(tokenProxy.address);
      await expect(livelyToken.connect(systemAdmin).initialize(request))
        .to.emit(livelyToken, "Upgraded")
        .withArgs(systemAdminAddress, livelyToken.address, livelyTokenSubject.address)
        .to.emit(livelyToken, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyToken.address, systemAdminAddress)
        .to.emit(livelyToken, "Initialized")
        .withArgs(
          systemAdminAddress,
          livelyToken.address,
          livelyTokenSubject.address,
          livelyTokenDomainName,
          livelyTokenDomainVersion,
          livelyTokenDomainRealmHash,
          1
        );

      // then
      expect(await livelyToken.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await livelyToken.isUpgradable(), "Invalid Upgradability").to.be.false;
      expect(await livelyToken.initVersion(), "Invalid Init Version").to.be.equal(1);
      expect(await livelyToken.initStatus(), "Invalid Init State").to.be.false;
      expect(await livelyToken.localAdmin(), "Invalid Local Admin").to.be.hexEqual(systemAdminAddress);
      expect(await livelyToken.contractName(), "Invalid Name").to.be.hexEqual(livelyTokenDomainNameHash);
      expect(await livelyToken.contractVersion(), "Invalid Version").to.be.hexEqual(livelyTokenDomainVersionHash);
      expect(await livelyToken.contractRealm(), "Invalid Realm").to.be.hexEqual(livelyTokenDomainRealmHash);
      expect(await livelyToken.accessControlManager(), "Invalid Access Control").to.be.hexEqual(
        accessControlManager.address
      );
      expect(await livelyToken.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(livelyToken.address)
      );
      expect(await livelyToken.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        livelyTokenSubject.address
      );
      expect(await livelyToken.domainSeparator()).to.be.equal(
        generateDomainSeparator(
          livelyTokenDomainName,
          livelyTokenDomainVersion,
          livelyToken.address,
          networkChainId
        )
      );
    });

    it("Should LAssetManagerERC20 deploy success", async () => {
      // given
      const lAssetManagerERC20Factory = new LAssetManagerERC20__factory(systemAdmin);

      // when
      lAssetManagerERC20 = await lAssetManagerERC20Factory.deploy();

      // then
      expect(lAssetManagerERC20.address).not.null;
      expect(await lAssetManagerERC20.LIB_NAME()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LAssetManagerERC20"))
      );
      expect(await lAssetManagerERC20.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    });
  });

  describe("Subject (AssetManagerERC20 Implementation) Tests", function() {
    this.beforeAll(async () => {
      assetManagerLinkLibraryAddresses = {
        "src/contracts/lib/token/LAssetManagerERC20.sol:LAssetManagerERC20": lAssetManagerERC20.address,
      };
    });

    it("Should AssetManagerERC20 Subject deploy success", async () => {
      // given
      const assetManagerFactory = new AssetManagerERC20__factory(assetManagerLinkLibraryAddresses, systemAdmin);

      // when
      assetManagerSubject = await assetManagerFactory.deploy();

      // then
      expect(assetManagerSubject.address).to.be.not.null;
      expect(await assetManagerSubject.isSafeMode()).to.be.true;
      expect(await assetManagerSubject.isUpgradable()).to.be.false;
      expect(await assetManagerSubject.initVersion()).to.be.equal(0);
      expect(await assetManagerSubject.localAdmin()).to.be.hexEqual(systemAdminAddress);
    });

    it("Should initialize of AssetManagerERC20 subject failed", async () => {
      // when and then
      await expect(
        assetManagerSubject.connect(systemAdmin).initialize({
          domainName: assetManagerERC20DomainName,
          domainVersion: assetManagerERC20DomainVersion,
          domainRealm: assetManagerERC20DomainRealm,
          accessControlManager: accessControlManager.address,
          assetManagerSignature: "0x00",
        })
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should setSafeModeState of AssetManagerERC20 subject failed", async () => {
      // when and then
      await expect(assetManagerSubject.connect(systemAdmin).setSafeMode(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setUpgradeState of AssetManagerERC20 subject failed", async () => {
      // when and then
      await expect(assetManagerSubject.connect(systemAdmin).setUpgradeStatus(true)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should setLocalAdmin of AssetManagerERC20 subject failed", async () => {
      // when
      const address = await user1.getAddress();

      // when and then
      await expect(assetManagerSubject.connect(systemAdmin).setLocalAdmin(address)).to.be.revertedWith(
        "Illegal Contract Call"
      );
    });

    it("Should upgradeTo of AssetManagerERC20 subject failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);

      // when and then
      await expect(
        assetManagerSubject.connect(admin).upgradeTo(assetManagerSubject.address, typedArray1, false)
      ).to.be.revertedWith("Illegal Contract Call");
    });

    it("Should return correct slot storage of AssetManagerERC20 subject", async () => {
      // when and then
      expect(await assetManagerSubject.proxiableUUID()).to.be.hexEqual(
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
    });
  });

  describe("AssetManagerERC20 (UUPS Proxy) Tests", function() {
    it("Should deploy and initialize AssetManagerERC20 proxy success (typechain, two steps)", async () => {
      // given
      const proxyFactory = new Proxy__factory(systemAdmin);
      const networkChainId = await provider.send("eth_chainId", []);
      const assetProxy = await proxyFactory.deploy(assetManagerSubject.address, new Int8Array(0));
      const signature = await generateContextDomainSignatureManually(
        assetProxy.address,
        assetManagerERC20DomainName,
        assetManagerERC20DomainVersion,
        assetManagerERC20DomainRealm,
        accessControlManager.address,
        systemAdminWallet,
        networkChainId
      );
      const request: AssetManagerERC20.InitRequestStruct = {
        domainName: assetManagerERC20DomainName,
        domainVersion: assetManagerERC20DomainVersion,
        domainRealm: assetManagerERC20DomainRealm,
        accessControlManager: accessControlManager.address,
        assetManagerSignature: signature,
      };

      // when
      assetManagerProxy = assetManagerSubject.attach(assetProxy.address);
      await expect(assetManagerProxy.connect(systemAdmin).initialize(request))
        .to.emit(assetManagerProxy, "Upgraded")
        .withArgs(systemAdminAddress, assetManagerProxy.address, assetManagerSubject.address)
        .to.emit(assetManagerProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, assetManagerProxy.address, systemAdminAddress)
        .to.emit(assetManagerProxy, "Initialized")
        .withArgs(
          systemAdminAddress,
          assetManagerProxy.address,
          assetManagerSubject.address,
          assetManagerERC20DomainName,
          assetManagerERC20DomainVersion,
          assetManagerERC20DomainRealm,
          1
        );

      // then
      expect(await assetManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await assetManagerProxy.isUpgradable(), "Invalid Upgradability").to.be.false;
      expect(await assetManagerProxy.initVersion(), "Invalid Init Version").to.be.equal(1);
      expect(await assetManagerProxy.initStatus(), "Invalid Init State").to.be.false;
      expect(await assetManagerProxy.localAdmin(), "Invalid Local Admin").to.be.hexEqual(systemAdminAddress);
      expect(await assetManagerProxy.contractName(), "Invalid Name").to.be.hexEqual(assetManagerERC20DomainNameHash);
      expect(await assetManagerProxy.contractVersion(), "Invalid Version").to.be.hexEqual(assetManagerERC20DomainVersionHash);
      expect(await assetManagerProxy.contractRealm(), "Invalid Realm").to.be.hexEqual(assetManagerERC20DomainRealmHash);
      expect(await assetManagerProxy.accessControlManager(), "Invalid Access Control").to.be.hexEqual(
        accessControlManager.address
      );
      expect(await assetManagerProxy.contractContext(), "Invalid Context").to.be.hexEqual(
        ethers.utils.keccak256(assetManagerProxy.address)
      );
      expect(await assetManagerProxy.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(
        assetManagerSubject.address
      );
      expect(await assetManagerProxy.domainSeparator()).to.be.equal(
        generateDomainSeparator(
          assetManagerERC20DomainName,
          assetManagerERC20DomainVersion,
          assetManagerProxy.address,
          networkChainId
        )
      );
    });
  })
})