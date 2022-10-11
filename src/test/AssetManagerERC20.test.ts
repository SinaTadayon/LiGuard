import { BigNumber, Signer, Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types";
import {
  AccessControlManager,
  AccessControlManager__factory, AssetERC20,
  AssetERC20__factory,
  AssetManagerERC20,
  AssetManagerERC20__factory,
  IAssetManagerERC20,
  IERC20Extra,
  IRoleManagement,
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
import {
  generateContextDomainSignatureManually,
  generateDomainSeparator,
  generatePredictContextDomainSignatureManually,
  LIVELY_ADMIN_ROLE,
  LIVELY_ASSET_ADMIN_ROLE,
  LIVELY_ASSET_GROUP,
  LIVELY_ASSET_MANAGER_ROLE,
  LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
  LIVELY_CROWD_FOUNDING_ASSET_ROLE,
  LIVELY_FOUNDING_TEAM_ASSET_ROLE,
  LIVELY_PUBLIC_SALE_ASSET_ROLE,
  LIVELY_TREASURY_ASSET_ROLE,
  LIVELY_VALIDATORS_REWARDS_ASSET_ROLE
} from "./TestUtils";
import {
  AssetManagerERC20LibraryAddresses
} from "../../typechain/types/factories/token/asset/AssetManagerERC20__factory";
import { IERC20Lock } from "../../typechain/types/token/lively/LivelyToken";
const { provider } = waffle;

enum AssetStatus {
  NONE,
  ACTIVE,
  SAFE_MODE
}

describe("Asset Manager ERC20 Token Tests", function () {
  let admin: Signer;
  let systemAdmin: Signer;
  let assetAdmin: Signer;
  let crowdFoundingManager: Signer;
  let validatorsRewardsManager: Signer;
  let publicSaleManager: Signer;
  let treasuryManager: Signer;
  let foundingTeamManager: Signer;
  let audioVideoProgramManager: Signer;
  let user1: Signer;
  let user2: Signer;
  let adminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let user1Wallet: Wallet;
  let user2Wallet: Wallet;
  let assetAdminWallet: Wallet;
  let crowdFoundingManagerWallet: Wallet;
  let validatorsRewardsManagerWallet: Wallet;
  let publicSaleManagerWallet: Wallet;
  let treasuryManagerWallet: Wallet;
  let foundingTeamManagerWallet: Wallet;
  let audioVideoProgramManagerWallet: Wallet;
  let adminAddress: Address;
  let systemAdminAddress: Address;
  let user1Address: Address;
  let user2Address: Address;
  let assetAdminAddress: Address;
  let crowdFoundingManagerAddress: Address;
  let validatorsRewardsManagerAddress: Address;
  let publicSaleManagerAddress: Address;
  let treasuryManagerAddress: Address;
  let foundingTeamManagerAddress: Address;
  let audioVideoProgramManagerAddress: Address;
  let accessControlManager: AccessControlManager;
  let livelyToken: LivelyToken;
  let assetManagerLinkLibraryAddresses: AssetManagerERC20LibraryAddresses;
  let lAssetManagerERC20: LAssetManagerERC20;
  let assetManagerSubject: AssetManagerERC20;
  let assetManagerProxy: AssetManagerERC20;
  let assetSubjectERC20: AssetERC20;
  let assetAudioVideoProgram: AssetERC20;
  let assetFoundingTeam: AssetERC20;
  let assetTreasury: AssetERC20;
  let assetPublicSale: AssetERC20;
  let assetValidatorsRewards: AssetERC20;
  let assetCrowdFounding: AssetERC20;
  let assetTaxTreasury: AssetERC20;
  let networkChainId: BigNumber;
  let user1LockIds: string[] = [];
  let user2LockIds: string[] = [];
  const taxValue = BigNumber.from(300);
  const tokenDecimal = BigNumber.from(10).pow(18);
  const livelyTokenTotalSupply = BigNumber.from(5_000_000_000).mul(tokenDecimal);
  const assetAudioVideoProgramBalance = BigNumber.from(500_000_000).mul(tokenDecimal);
  const assetFoundingTeamBalance = BigNumber.from(900_000_000).mul(tokenDecimal);
  const assetTreasuryBalance = BigNumber.from(750_000_000).mul(tokenDecimal);
  const assetPublicSaleBalance = BigNumber.from(2_000_000_000).mul(tokenDecimal);
  const assetValidatorsRewardsBalance = BigNumber.from(300_000_000).mul(tokenDecimal);
  const assetCrowdFoundingBalance = BigNumber.from(550_000_000).mul(tokenDecimal);
  const dummyAmount = BigNumber.from(10000).mul(tokenDecimal);
  const livelyAudioVideoProgramAssetName = "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET";
  const livelyFoundingTeamAssetName = "LIVELY_FOUNDING_TEAM_ASSET";
  const livelyTreasuryAssetName = "LIVELY_TREASURY_ASSET";
  const livelyPublicSaleAssetName = "LIVELY_PUBLIC_SALE_ASSET";
  const livelyValidatorRewardsAssetName = "LIVELY_VALIDATORS_REWARDS_ASSET";
  const livelyCrowdFoundingAssetName = "LIVELY_CROWD_FOUNDING_ASSET";
  const livelyTaxTreasuryAssetName = "LIVELY_TAX_TREASURY_ASSET";
  const livelyAssetERC20DomainVersion = "1.0.0";
  const livelyAudioVideoProgramAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyAudioVideoProgramAssetName));
  const livelyFoundingTeamAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyFoundingTeamAssetName));
  const livelyPublicSaleAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyPublicSaleAssetName));
  const livelyValidatorRewardsAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyValidatorRewardsAssetName));
  const livelyCrowdFoundingAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyCrowdFoundingAssetName));
  const livelyTaxTreasuryAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTaxTreasuryAssetName));
  const livelyTreasuryAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTreasuryAssetName));
  const livelyAssetERC20DomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyAssetERC20DomainVersion));
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
      crowdFoundingManager,
      validatorsRewardsManager,
      publicSaleManager,
      treasuryManager,
      foundingTeamManager,
      audioVideoProgramManager,
      user1,
      user2
    ] = await ethers.getSigners();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    [
      adminWallet,
      systemAdminWallet,
      assetAdminWallet,
      crowdFoundingManagerWallet,
      validatorsRewardsManagerWallet,
      publicSaleManagerWallet,
      treasuryManagerWallet,
      foundingTeamManagerWallet,
      audioVideoProgramManagerWallet,
      user1Wallet,
      user2Wallet,
    ] = waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    systemAdminAddress = await systemAdmin.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    assetAdminAddress = await assetAdmin.getAddress();
    crowdFoundingManagerAddress = await crowdFoundingManager.getAddress();
    validatorsRewardsManagerAddress = await validatorsRewardsManager.getAddress();
    publicSaleManagerAddress = await publicSaleManager.getAddress();
    treasuryManagerAddress = await treasuryManager.getAddress();
    foundingTeamManagerAddress = await foundingTeamManager.getAddress();
    audioVideoProgramManagerAddress = await audioVideoProgramManager.getAddress();
    networkChainId = await provider.send("eth_chainId", []);
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
      // when
      await expect(accessControlManager.connect(systemAdmin).grantRoleAccount(LIVELY_ADMIN_ROLE, adminAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(systemAdminAddress, LIVELY_ADMIN_ROLE, adminAddress);

      // then
      expect(await accessControlManager.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManager.isLivelyAdminRole(systemAdminAddress)).to.be.true;
    });

    it("Should revoke systemAdmin from LIVELY_ADMIN_ROLE success", async () => {
      // when
      await expect(accessControlManager.connect(admin).revokeRoleAccount(LIVELY_ADMIN_ROLE, systemAdminAddress))
        .to.emit(accessControlManager, "RoleAccountRevoked")
        .withArgs(adminAddress, LIVELY_ADMIN_ROLE, systemAdminAddress);

      // then
      expect(await accessControlManager.isLivelyAdminRole(adminAddress)).to.be.true;
      expect(await accessControlManager.isLivelyAdminRole(systemAdminAddress)).to.be.false;
    });

    it("Should grant LIVELY_ASSET_ADMIN_ROLE to asset admin account success", async () => {
      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(LIVELY_ASSET_ADMIN_ROLE, assetAdminAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_ADMIN_ROLE, assetAdminAddress);

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
    it("Should deploy and initialize AssetManagerERC20 proxy success", async () => {
      // given
      const proxyFactory = new Proxy__factory(systemAdmin);
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
          assetManagerERC20DomainRealmHash,
          1
        );

      // then
      expect(await assetManagerProxy.isSafeMode(), "Invalid SafeMode").to.be.false;
      expect(await assetManagerProxy.isUpgradable(), "Invalid Upgradability").to.be.false;
      expect(await assetManagerProxy.initVersion(), "Invalid Init Version").to.be.equal(1);
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

    it("Should enable safeMode by anyone failed", async () => {
      // given
      const safeMode = await assetManagerProxy.isSafeMode();

      // when and then
      await expect(assetManagerProxy.connect(user1).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable safeMode by systemAdmin failed", async () => {
      // given
      const safeMode = await assetManagerProxy.isSafeMode();

      // when and then
      await expect(assetManagerProxy.connect(systemAdmin).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable safeMode by admin success", async () => {
      // given
      let safeMode = await assetManagerProxy.isSafeMode();

      // when and then
      await expect(assetManagerProxy.connect(admin).setSafeMode(true))
        .to.emit(assetManagerProxy, "SafeModeChanged")
        .withArgs(adminAddress, assetManagerProxy.address, assetManagerERC20DomainRealmHash, true);

      // and
      expect(safeMode).to.be.false;

      // and
      safeMode = await assetManagerProxy.isSafeMode();
      expect(safeMode).to.be.true;
    });

    it("Should call any methods by anyone when safeMode enabled failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: "test",
        assetVersion: "1.0.0",
        role: LIVELY_ASSET_MANAGER_ROLE,
        salt: ethers.utils.formatBytes32String("0x01"),
        tokenId: livelyToken.address
      }

      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAdminAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: user1Address,
        to: user2Address,
        amount: dummyAmount,
      };

      // when and then
      await expect(assetManagerProxy.connect(user1).setUpgradeStatus(true)).to.revertedWith("SafeMode: Call Rejected");
      await expect(assetManagerProxy.connect(admin).setUpgradeStatus(true)).to.revertedWith("SafeMode: Call Rejected");
      await expect(assetManagerProxy.connect(systemAdmin).setUpgradeStatus(true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).setUpgradeStatus(true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(
        assetManagerProxy.connect(user1).upgradeTo(assetManagerProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(admin).upgradeTo(assetManagerProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(systemAdmin).upgradeTo(assetManagerProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).upgradeTo(assetManagerProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(assetManagerProxy.connect(user1).createAsset(createAssetRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).createAsset(createAssetRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).createAsset(createAssetRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).updateAssetSubject(user1Address, "0x00")).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).updateAssetSubject(user1Address, "0x00")).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).updateAssetSubject(user1Address, "0x00")).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).updateAssetSubject(user1Address, "0x00")).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).registerToken(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).registerToken(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).registerToken(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).removeAsset(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).removeAsset(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).removeAsset(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).removeAsset(livelyToken.address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenLock(livelyToken.address, lockRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenLock(livelyToken.address, lockRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenLock(livelyToken.address, lockRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenLock(livelyToken.address, lockRequest)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenBatchLock(livelyToken.address, [lockRequest])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenBatchLock(livelyToken.address, [lockRequest])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenBatchLock(livelyToken.address, [lockRequest])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchLock(livelyToken.address, [lockRequest])).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenBatchTransfer(livelyToken.address, [batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenBatchTransfer(livelyToken.address, [batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenBatchTransfer(livelyToken.address, [batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchTransfer(livelyToken.address, [batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(assetManagerProxy.connect(user1).tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(admin).tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(systemAdmin).tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(assetManagerProxy.connect(assetAdmin).tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
    });

    it("Should disable safeMode by admin success", async () => {
      // given
      let safeMode = await assetManagerProxy.isSafeMode();

      // when and then
      await expect(assetManagerProxy.connect(admin).setSafeMode(false))
        .to.emit(assetManagerProxy, "SafeModeChanged")
        .withArgs(adminAddress, assetManagerProxy.address, assetManagerERC20DomainRealmHash, false);

      // and
      expect(safeMode).to.be.true;

      // and
      safeMode = await assetManagerProxy.isSafeMode();
      expect(safeMode).to.be.false;
    });

    it("Should setLocalAdmin by anyone failed", async () => {
      // given
      const currentLocalAdmin = await assetManagerProxy.localAdmin();

      // when and then
      await expect(assetManagerProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
        "SetLocalAdmin Forbidden"
      );

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should setLocalAdmin by admin failed", async () => {
      // given
      const currentLocalAdmin = await assetManagerProxy.localAdmin();

      // when and then
      await expect(assetManagerProxy.connect(admin).setLocalAdmin(user2Address)).to.revertedWith(
        "SetLocalAdmin Forbidden"
      );

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should setLocalAdmin by systemAdmin to user2 success", async () => {
      // given
      let currentLocalAdmin = await assetManagerProxy.localAdmin();

      // when and then
      await expect(assetManagerProxy.connect(systemAdmin).setLocalAdmin(user2Address))
        .to.emit(assetManagerProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, assetManagerProxy.address, user2Address);

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);

      // and
      currentLocalAdmin = await assetManagerProxy.localAdmin();
      expect(currentLocalAdmin).to.be.hexEqual(user2Address);
    });

    it("Should setLocalAdmin by user2 to systemAdmin success", async () => {
      // given
      let currentLocalAdmin = await assetManagerProxy.localAdmin();

      // when and then
      await expect(assetManagerProxy.connect(systemAdmin).setLocalAdmin(systemAdminAddress))
        .to.emit(assetManagerProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, assetManagerProxy.address, systemAdminAddress);

      // and
      expect(currentLocalAdmin).to.be.hexEqual(user2Address);

      // and
      currentLocalAdmin = await assetManagerProxy.localAdmin();
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should enable upgrade by anyone failed", async () => {
      // given
      const upgradeStatus = await assetManagerProxy.isUpgradable();

      // when and then
      await expect(assetManagerProxy.connect(user1).setUpgradeStatus(true)).to.revertedWith(
        "SetUpgradeStatus Forbidden"
      );

      // and
      expect(upgradeStatus).to.be.false;
    });

    it("Should enable upgrade by systemAdmin failed", async () => {
      // given
      const upgradeStatus = await assetManagerProxy.isUpgradable();

      // when and then
      await expect(assetManagerProxy.connect(systemAdmin).setUpgradeStatus(true)).to.revertedWith(
        "SetUpgradeStatus Forbidden"
      );

      // and
      expect(upgradeStatus).to.be.false;
    });

    it("Should enable upgrade by admin success", async () => {
      // given
      let upgradeStatus = await assetManagerProxy.isUpgradable();

      // when and then
      await expect(assetManagerProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(assetManagerProxy, "UpgradeStatusChanged")
        .withArgs(adminAddress, assetManagerProxy.address, assetManagerERC20DomainRealmHash, true);

      // and
      expect(upgradeStatus).to.be.false;

      // and
      upgradeStatus = await assetManagerProxy.isUpgradable();
      expect(upgradeStatus).to.be.true;
    });

    it("Should upgradeTo by anyone failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const assetManagerFactory = new AssetManagerERC20__factory(assetManagerLinkLibraryAddresses, user1);
      const newAssetManagerSubject = await assetManagerFactory.deploy();

      // when and then
      await expect(
        assetManagerProxy.connect(user1).upgradeTo(newAssetManagerSubject.address, typedArray1, false)
      ).to.revertedWith("Upgrade Context Forbidden");
    });

    it("Should upgradeTo by admin failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const assetManagerFactory = new AssetManagerERC20__factory(assetManagerLinkLibraryAddresses, admin);
      const newAssetManagerSubject = await assetManagerFactory.deploy();

      // when and then
      await expect(
        assetManagerProxy.connect(admin).upgradeTo(newAssetManagerSubject.address, typedArray1, false)
      ).to.revertedWith("Upgrade Context Forbidden");
    });

    it("Should upgradeTo by systemAdmin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const assetManagerFactory = new AssetManagerERC20__factory(assetManagerLinkLibraryAddresses, systemAdmin);
      const newAssetManagerSubject = await assetManagerFactory.deploy();

      // when and then
      await expect(assetManagerProxy.connect(systemAdmin).upgradeTo(newAssetManagerSubject.address, typedArray1, false))
        .to.emit(assetManagerProxy, "Upgraded")
        .withArgs(systemAdminAddress, assetManagerProxy.address, newAssetManagerSubject.address);

      assetManagerSubject = newAssetManagerSubject;
    });

    it("Should add assetManagerProxy to LIVELY_ASSET_MANAGER_ROLE success", async() => {
      // given
      const isAssetManagerRoleHasMember = await accessControlManager.isLivelyAssetManagerRole(assetManagerProxy.address);

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address);

      // then
      expect(isAssetManagerRoleHasMember).to.be.false;
      expect(await accessControlManager.isLivelyAssetManagerRole(assetManagerProxy.address)).to.be.true;

    })

    it("Should add assetManagerProxy to LIVELY_ASSET_ADMIN_ROLE success", async() => {
      // given
      const isAssetAdminRoleHasMember = await accessControlManager.isLivelyAssetAdminRole(assetManagerProxy.address);

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address);

      // then
      expect(isAssetAdminRoleHasMember).to.be.false;
      expect(await accessControlManager.isLivelyAssetAdminRole(assetManagerProxy.address)).to.be.true;
    })

    it("Should register assets roles by admin success", async() => {
      // given
      const registerRoleRequest: IRoleManagement.RegiterRoleRequestStruct[] = [
        {
          name: "LIVELY_CROWD_FOUNDING_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "LIVELY_VALIDATORS_REWARDS_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "LIVELY_PUBLIC_SALE_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "LIVELY_TREASURY_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "LIVELY_FOUNDING_TEAM_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        },
        {
          name: "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true
        }
      ]

      // when
      await expect(
        accessControlManager
          .connect(admin)
          .batchRegisterRole(registerRoleRequest)
      ).to.emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          "LIVELY_CROWD_FOUNDING_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          "LIVELY_VALIDATORS_REWARDS_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_PUBLIC_SALE_ASSET_ROLE,
          "LIVELY_PUBLIC_SALE_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_TREASURY_ASSET_ROLE,
          "LIVELY_TREASURY_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          "LIVELY_FOUNDING_TEAM_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        ).emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        );

      // then
      const [name1, group1, status1] = await accessControlManager.getRoleInfo(LIVELY_CROWD_FOUNDING_ASSET_ROLE);
      const [name2, group2, status2] = await accessControlManager.getRoleInfo(LIVELY_VALIDATORS_REWARDS_ASSET_ROLE);
      const [name3, group3, status3] = await accessControlManager.getRoleInfo(LIVELY_PUBLIC_SALE_ASSET_ROLE);
      const [name4, group4, status4] = await accessControlManager.getRoleInfo(LIVELY_TREASURY_ASSET_ROLE);
      const [name5, group5, status5] = await accessControlManager.getRoleInfo(LIVELY_FOUNDING_TEAM_ASSET_ROLE);
      const [name6, group6, status6] = await accessControlManager.getRoleInfo(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE);

      expect(name1).to.be.equal("LIVELY_CROWD_FOUNDING_ASSET_ROLE");
      expect(group1).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status1).to.be.true;
      expect(name2).to.be.equal("LIVELY_VALIDATORS_REWARDS_ASSET_ROLE");
      expect(group2).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status2).to.be.true;
      expect(name3).to.be.equal("LIVELY_PUBLIC_SALE_ASSET_ROLE");
      expect(group3).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status3).to.be.true;
      expect(name4).to.be.equal("LIVELY_TREASURY_ASSET_ROLE");
      expect(group4).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status4).to.be.true;
      expect(name5).to.be.equal("LIVELY_FOUNDING_TEAM_ASSET_ROLE");
      expect(group5).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status5).to.be.true;
      expect(name6).to.be.equal("LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE");
      expect(group6).to.be.hexEqual(LIVELY_ASSET_GROUP);
      expect(status6).to.be.true;
    })

    it("Should deploy assetERC20 by systemAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);

      // when
      assetSubjectERC20 = await factory.deploy();

      // then
      expect(assetSubjectERC20).to.be.not.null;

      // and
      expect(assetSubjectERC20.address).to.be.not.null;
      expect(await assetSubjectERC20.assetSafeMode()).to.be.true;
      expect(await assetSubjectERC20.assetInitVersion()).to.be.equal(0);
    })

    it("Should call updateAssetSubject by anyone failed", async() => {
      // when and then
      await expect(assetManagerProxy.connect(admin).updateAssetSubject(assetSubjectERC20.address, "0x00"))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(systemAdmin).updateAssetSubject(assetSubjectERC20.address, "0x00"))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(user1).updateAssetSubject(assetSubjectERC20.address, "0x00"))
        .to.revertedWith("Access Denied")
    })

    it("Should call updateAssetSubject by assetAdmin success", async() => {
      // given
      const bytesHashAssetSubjectERC20 = ethers.utils.keccak256(ethers.utils.solidityPack(["bytes"], [AssetERC20__factory.bytecode]));
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        assetManagerERC20DomainRealm,
        accessControlManager.address,
        systemAdminWallet,
        networkChainId,
        bytesHashAssetSubjectERC20
      )

      // when
      await expect(assetManagerProxy.connect(assetAdmin).updateAssetSubject(assetSubjectERC20.address, signature))
        .to.emit(assetManagerProxy, "AssetSubjectUpdated")
        .withArgs(assetAdminAddress, assetSubjectERC20.address);

      // then
      expect(await assetManagerProxy.getAssetSubject()).to.be.hexEqual(assetSubjectERC20.address)

    })

    it("Should register lively token to assetManager by anyone failed", async() => {
      // when and then
      await expect(assetManagerProxy.connect(admin).registerToken(livelyToken.address))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(systemAdmin).registerToken(livelyToken.address))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(user1).registerToken(livelyToken.address))
        .to.revertedWith("Access Denied")

      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.false;
    })

    it("Should register lively token to assetManager by assetAdmin success", async() => {
      // given
      const tokenName = await livelyToken.name();
      const tokenSymbol = await livelyToken.symbol();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerToken(livelyToken.address))
        .to.emit(assetManagerProxy, "TokenRegistered")
        .withArgs(assetAdminAddress, livelyToken.address, tokenName, tokenSymbol);

      // then
      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.true;

      // and
      const [status, addresses] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(AssetStatus.ACTIVE);
      expect(addresses).to.be.empty
    })

    it("Should create assets by anyone failed", async() => {
      // given
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyAudioVideoProgramAssetName,
        assetVersion: "1.0.0",
        tokenId: livelyToken.address,
        role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
        salt: saltValue
      }

      // when
      await expect(assetManagerProxy.connect(admin).createAsset(createAssetRequest))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(systemAdmin).createAsset(createAssetRequest))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(user1).createAsset(createAssetRequest))
        .to.revertedWith("Access Denied")

      // then
      const [status, addresses] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(AssetStatus.ACTIVE);
      expect(addresses).to.be.empty

    })

    it("Should create LIVELY_AUDIO_VIDEO_PROGRAM_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyAudioVideoProgramAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
        salt: saltValue
      }
      assetAudioVideoProgram = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetAudioVideoProgram, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyAudioVideoProgramAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      const [status, addresses] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(AssetStatus.ACTIVE);
      expect(addresses).to.be.eql([assetId]);

      // and
      expect(await assetAudioVideoProgram.assetName()).to.be.equal(livelyAudioVideoProgramAssetNameHash);
      expect(await assetAudioVideoProgram.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetAudioVideoProgram.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetAudioVideoProgram.assetInitVersion()).to.be.equal(1);
      expect(await assetAudioVideoProgram.assetRole()).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE);
      expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetAudioVideoProgram.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_FOUNDING_TEAM_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyFoundingTeamAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_FOUNDING_TEAM_ASSET_ROLE,
        salt: saltValue
      }
      assetFoundingTeam = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetFoundingTeam, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyFoundingTeamAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetFoundingTeam.assetName()).to.be.equal(livelyFoundingTeamAssetNameHash);
      expect(await assetFoundingTeam.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetFoundingTeam.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetFoundingTeam.assetInitVersion()).to.be.equal(1);
      expect(await assetFoundingTeam.assetRole()).to.be.equal(LIVELY_FOUNDING_TEAM_ASSET_ROLE);
      expect(await assetFoundingTeam.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetFoundingTeam.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_TREASURY_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyTreasuryAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_TREASURY_ASSET_ROLE,
        salt: saltValue
      }
      assetTreasury = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTreasury, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyTreasuryAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetTreasury.assetName()).to.be.equal(livelyTreasuryAssetNameHash);
      expect(await assetTreasury.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetTreasury.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetTreasury.assetInitVersion()).to.be.equal(1);
      expect(await assetTreasury.assetRole()).to.be.equal(LIVELY_TREASURY_ASSET_ROLE);
      expect(await assetTreasury.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetTreasury.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_PUBLIC_SALE_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyPublicSaleAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_PUBLIC_SALE_ASSET_ROLE,
        salt: saltValue
      }
      assetPublicSale = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetPublicSale, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyPublicSaleAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetPublicSale.assetName()).to.be.equal(livelyPublicSaleAssetNameHash);
      expect(await assetPublicSale.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetPublicSale.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetPublicSale.assetInitVersion()).to.be.equal(1);
      expect(await assetPublicSale.assetRole()).to.be.equal(LIVELY_PUBLIC_SALE_ASSET_ROLE);
      expect(await assetPublicSale.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetPublicSale.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_VALIDATORS_REWARDS_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyValidatorRewardsAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
        salt: saltValue
      }
      assetValidatorsRewards = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetValidatorsRewards, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyValidatorRewardsAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetValidatorsRewards.assetName()).to.be.equal(livelyValidatorRewardsAssetNameHash);
      expect(await assetValidatorsRewards.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetValidatorsRewards.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetValidatorsRewards.assetInitVersion()).to.be.equal(1);
      expect(await assetValidatorsRewards.assetRole()).to.be.equal(LIVELY_VALIDATORS_REWARDS_ASSET_ROLE);
      expect(await assetValidatorsRewards.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetValidatorsRewards.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_CROWD_FOUNDING_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyCrowdFoundingAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_CROWD_FOUNDING_ASSET_ROLE,
        salt: saltValue
      }
      assetCrowdFounding = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetCrowdFounding, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyCrowdFoundingAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetCrowdFounding.assetName()).to.be.equal(livelyCrowdFoundingAssetNameHash);
      expect(await assetCrowdFounding.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetCrowdFounding.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetCrowdFounding.assetInitVersion()).to.be.equal(1);
      expect(await assetCrowdFounding.assetRole()).to.be.equal(LIVELY_CROWD_FOUNDING_ASSET_ROLE);
      expect(await assetCrowdFounding.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetCrowdFounding.assetSafeMode()).to.be.false;
    })

    it("Should create LIVELY_TAX_TREASURY_ASSET asset by assetAdmin success", async() => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`));
      const assetId = await assetManagerProxy.predictAddress(assetSubjectERC20.address, saltValue, assetManagerProxy.address);
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyTaxTreasuryAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_ASSET_ADMIN_ROLE,
        salt: saltValue
      }
      assetTaxTreasury = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTaxTreasury, "AssetInitialized")
        .withArgs(assetManagerProxy.address, assetId, livelyTaxTreasuryAssetName,
          livelyAssetERC20DomainVersion, assetManagerERC20DomainRealmHash)

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetTaxTreasury.assetName()).to.be.equal(livelyTaxTreasuryAssetNameHash);
      expect(await assetTaxTreasury.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetTaxTreasury.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetTaxTreasury.assetInitVersion()).to.be.equal(1);
      expect(await assetTaxTreasury.assetRole()).to.be.equal(LIVELY_ASSET_ADMIN_ROLE);
      expect(await assetTaxTreasury.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetTaxTreasury.assetSafeMode()).to.be.false;
    })

    it("Should grant assetManagerProxy to all asset roles by admin success", async() => {
      // given
      const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
        {
          role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_PUBLIC_SALE_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_TREASURY_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          account: assetManagerProxy.address,
        },
        {
          role: LIVELY_ASSET_ADMIN_ROLE,
          account: assetManagerProxy.address,
        }
      ]

      // when and then
      await expect(
        accessControlManager
          .connect(admin)
          .batchGrantRoleAccount(batchGrantRequest)
      ).to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_PUBLIC_SALE_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_TREASURY_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_VALIDATORS_REWARDS_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_CROWD_FOUNDING_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_FOUNDING_TEAM_ASSET_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address);

      // then
      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_PUBLIC_SALE_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_TREASURY_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_ADMIN_ROLE,
          assetManagerProxy.address
        )
      ).to.be.true;
    })

    it("Should grant user asset managers related to all asset roles by admin success", async() => {
      // given
      const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
        {
          role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          account: audioVideoProgramManagerAddress,
        },
        {
          role: LIVELY_PUBLIC_SALE_ASSET_ROLE,
          account: publicSaleManagerAddress,
        },
        {
          role: LIVELY_TREASURY_ASSET_ROLE,
          account: treasuryManagerAddress,
        },
        {
          role: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          account: validatorsRewardsManagerAddress,
        },
        {
          role: LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          account: crowdFoundingManagerAddress,
        },
        {
          role: LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          account: foundingTeamManagerAddress,
        },
      ]

      // when and then
      await expect(
        accessControlManager
          .connect(admin)
          .batchGrantRoleAccount(batchGrantRequest)
      ).to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE, audioVideoProgramManagerAddress)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_PUBLIC_SALE_ASSET_ROLE, publicSaleManagerAddress)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_TREASURY_ASSET_ROLE, treasuryManagerAddress)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_VALIDATORS_REWARDS_ASSET_ROLE, validatorsRewardsManagerAddress)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_CROWD_FOUNDING_ASSET_ROLE, crowdFoundingManagerAddress)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_FOUNDING_TEAM_ASSET_ROLE, foundingTeamManagerAddress)


      // then
      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          audioVideoProgramManagerAddress
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_PUBLIC_SALE_ASSET_ROLE,
          publicSaleManagerAddress
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_TREASURY_ASSET_ROLE,
          treasuryManagerAddress
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          validatorsRewardsManagerAddress
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          crowdFoundingManagerAddress
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          foundingTeamManagerAddress
        )
      ).to.be.true;
    })

    it("Should grant all assets to LIVELY_ASSET_MANAGER_ROLE by admin success", async() => {
      // given
      const batchGrantRequest: IRoleManagement.UpdateRoleRequestStruct[] = [
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetAudioVideoProgram.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetPublicSale.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetTreasury.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetValidatorsRewards.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetCrowdFounding.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetFoundingTeam.address,
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetTaxTreasury.address
        },
      ]

      // when and then
      await expect(
        accessControlManager
          .connect(admin)
          .batchGrantRoleAccount(batchGrantRequest)
      ).to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetAudioVideoProgram.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetPublicSale.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetTreasury.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetValidatorsRewards.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetCrowdFounding.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetFoundingTeam.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetTaxTreasury.address)

      // then
      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetAudioVideoProgram.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetPublicSale.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetTreasury.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetValidatorsRewards.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetCrowdFounding.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetFoundingTeam.address
        )
      ).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_ASSET_MANAGER_ROLE,
          assetTaxTreasury.address
        )
      ).to.be.true;
    })

    it("Should distribute token call by anyone failed", async() => {

      // when and then
      await expect(assetManagerProxy.connect(admin).livelyTokensDistribution(livelyToken.address))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(systemAdmin).livelyTokensDistribution(livelyToken.address))
        .to.revertedWith("Access Denied")

      await expect(assetManagerProxy.connect(user1).livelyTokensDistribution(livelyToken.address))
        .to.revertedWith("Access Denied")
    })

    it("Should distribute token call by assetAdmin success", async() => {
      // given
      const beforeBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
      const beforeBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
      const beforeBalanceTreasury = await assetTreasury.tokenBalance();
      const beforeBalancePublicSale = await assetPublicSale.tokenBalance();
      const beforeBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
      const beforeBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).livelyTokensDistribution(livelyToken.address))
        .to.emit(livelyToken, "Mint")
        .withArgs(assetManagerProxy.address, assetManagerProxy.address, livelyTokenTotalSupply, livelyTokenTotalSupply)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, assetAudioVideoProgramBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, assetFoundingTeamBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetTreasury.address, assetTreasuryBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetPublicSaleBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, assetValidatorsRewardsBalance)
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetCrowdFoundingBalance)

      // then
      const afterBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
      const afterBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
      const afterBalanceTreasury = await assetTreasury.tokenBalance();
      const afterBalancePublicSale = await assetPublicSale.tokenBalance();
      const afterBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
      const afterBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();

      expect(afterBalanceAudioVideoProgram.toString()).to.be.equal(beforeBalanceAudioVideoProgram.add(assetAudioVideoProgramBalance).toString());
      expect(afterBalanceFoundingTeam.toString()).to.be.equal(beforeBalanceFoundingTeam.add(assetFoundingTeamBalance).toString());
      expect(afterBalanceTreasury.toString()).to.be.equal(beforeBalanceTreasury.add(assetTreasuryBalance).toString());
      expect(afterBalancePublicSale.toString()).to.be.equal(beforeBalancePublicSale.add(assetPublicSaleBalance).toString());
      expect(afterBalanceValidatorsRewards.toString()).to.be.equal(beforeBalanceValidatorsRewards.add(assetValidatorsRewardsBalance).toString());
      expect(afterBalanceCrowdFounding.toString()).to.be.equal(beforeBalanceCrowdFounding.add(assetCrowdFoundingBalance).toString());
    })

    it("Should removeAsset call by anyone failed", async() => {

    })

    it("Should removeAsset call by assetAdmin success", async() => {

    })

    it("Should registerAsset call by anyone failed", async() => {

    })

    it("Should registerAsset call by assetAdmin success", async() => {

    })

    it("Should setSafeModeToken call by anyone failed", async() => {

    })

    it("Should setSafeModeToken call by assetAdmin success", async() => {

    })

    it("Should tokenLock call by anyone failed", async() => {

    })

    it("Should tokenLock call by assetAdmin success", async() => {

    })

    it("Should tokenBatchLock call by anyone failed", async() => {

    })

    it("Should tokenBatchLock call by assetAdmin success", async() => {

    })

    it("Should tokenTransfer call by anyone failed", async() => {

    })

    it("Should tokenTransfer call by assetAdmin success", async() => {

    })

    it("Should tokenBatchTransfer call by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer call by assetAdmin success", async() => {

    })

    it("Should tokenTransferFrom call by anyone failed", async() => {

    })

    it("Should tokenTransferFrom call by assetAdmin success", async() => {

    })

    it("Should tokenBatchTransferFrom call by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom call by assetAdmin success", async() => {

    })

    it("Should tokenApprove call by anyone failed", async() => {

    })

    it("Should tokenApprove call by assetAdmin success", async() => {

    })

    it("Should tokenIncreaseAllowance call by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance call by assetAdmin success", async() => {

    })

    it("Should tokenDecreaseAllowance call by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance call by assetAdmin success", async() => {

    })
  })

  describe("AssetERC20 Tests", function() {
    it("Should assign addresses to asset roles by admin success", async() => {

    })

    it("Should tokenLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenLock of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenLock of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenLock of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenLock of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    // it("Should tokenLock of LIVELY_TAX_TREASURY_ASSET by anyone failed", async() => {
    //
    // })
    //
    // it("Should tokenLock of LIVELY_TAX_TREASURY_ASSET by taxTreasuryManager success", async() => {
    //
    // })

    it("Should tokenLock of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenLock of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })



    it("Should tokenBatchLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenBatchLock of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenBatchLock of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenBatchLock of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenBatchLock of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenBatchLock of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchLock of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })





    it("Should tokenTransfer of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenTransfer of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenTransfer of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenTransfer of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenTransfer of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenTransfer of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })



    it("Should tokenBatchTransfer of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransfer of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })



    it("Should tokenBatchTransferFrom of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenBatchTransferFrom of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })




    it("Should tokenApprove of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenApprove of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenApprove of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })




    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenIncreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })



    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_TREASURY_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_TREASURY_ASSET by treasuryManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async() => {

    })

    it("Should tokenDecreaseAllowance of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async() => {

    })

  })
})