import { BigNumber, Signer, Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable camelcase,node/no-unpublished-import */
import {
  AccessControlManager,
  AccessControlManager__factory,
  AssetERC20,
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
  LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
  LockState,
} from "./TestUtils";
import { AssetManagerERC20LibraryAddresses } from "../../typechain/types/factories/token/asset/AssetManagerERC20__factory";
import { IERC20Lock } from "../../typechain/types/token/lively/LivelyToken";
/* eslint-disable node/no-extraneous-import */
import { TransactionRequest } from "@ethersproject/abstract-provider";
const { provider } = waffle;

enum AssetStatus {
  NONE,
  ACTIVE,
  SAFE_MODE,
}

enum AssetType {
  NONE,
  ERC20,
  ERC721,
  ERC1155,
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
  // let adminWallet: Wallet;
  let systemAdminWallet: Wallet;
  // let user1Wallet: Wallet;
  // let user2Wallet: Wallet;
  // let assetAdminWallet: Wallet;
  // let crowdFoundingManagerWallet: Wallet;
  // let validatorsRewardsManagerWallet: Wallet;
  // let publicSaleManagerWallet: Wallet;
  // let treasuryManagerWallet: Wallet;
  // let foundingTeamManagerWallet: Wallet;
  // let audioVideoProgramManagerWallet: Wallet;
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
  const livelyAudioVideoProgramAssetNameHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(livelyAudioVideoProgramAssetName)
  );
  const livelyFoundingTeamAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyFoundingTeamAssetName));
  const livelyPublicSaleAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyPublicSaleAssetName));
  const livelyValidatorRewardsAssetNameHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(livelyValidatorRewardsAssetName)
  );
  const livelyCrowdFoundingAssetNameHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(livelyCrowdFoundingAssetName)
  );
  const livelyTaxTreasuryAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTaxTreasuryAssetName));
  const livelyTreasuryAssetNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTreasuryAssetName));
  const livelyAssetERC20DomainVersionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(livelyAssetERC20DomainVersion)
  );
  const assetManagerERC20DomainName = "AssetManagerERC20";
  const assetManagerERC20DomainVersion = "1.0.0";
  const assetManagerERC20DomainRealm = "LIVELY_ASSET_REALM";
  const assetManagerERC20DomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(assetManagerERC20DomainName));
  const assetManagerERC20DomainVersionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetManagerERC20DomainVersion)
  );
  const assetManagerERC20DomainRealmHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetManagerERC20DomainRealm)
  );

  this.beforeAll(async () => {
    [
      systemAdmin,
      admin,
      assetAdmin,
      crowdFoundingManager,
      validatorsRewardsManager,
      publicSaleManager,
      treasuryManager,
      foundingTeamManager,
      audioVideoProgramManager,
      user1,
      user2,
    ] = await ethers.getSigners();
    [
      systemAdminWallet,
      // adminWallet,
      // assetAdminWallet,
      // crowdFoundingManagerWallet,
      // validatorsRewardsManagerWallet,
      // publicSaleManagerWallet,
      // treasuryManagerWallet,
      // foundingTeamManagerWallet,
      // audioVideoProgramManagerWallet,
      // user1Wallet,
      // user2Wallet,
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

  describe("Libraries and Dependencies Deployments Test", function () {
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
      expect(await livelyToken.subjectAddress(), "Invalid Subject Address").to.be.hexEqual(livelyTokenSubject.address);
      expect(await livelyToken.domainSeparator()).to.be.equal(
        generateDomainSeparator(livelyTokenDomainName, livelyTokenDomainVersion, livelyToken.address, networkChainId)
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
      expect(await lAssetManagerERC20.LIB_VERSION()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0"))
      );
    });
  });

  describe("Subject (AssetManagerERC20 Implementation) Tests", function () {
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
      expect(await assetManagerSubject.getLibrary()).to.be.equal(lAssetManagerERC20.address);
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

  describe("AssetManagerERC20 (UUPS Proxy) Tests", function () {
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
      expect(await assetManagerProxy.contractVersion(), "Invalid Version").to.be.hexEqual(
        assetManagerERC20DomainVersionHash
      );
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
      expect(await assetManagerProxy.getLibrary(), "Invalid Library Address").to.be.equal(lAssetManagerERC20.address);
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
        tokenId: livelyToken.address,
      };

      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAdminAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

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
      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchLock(livelyToken.address, [lockRequest])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenBatchLock(livelyToken.address, [lockRequest])
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy.connect(user1).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(admin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(systemAdmin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenTransfer(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransfer(livelyToken.address, [batchTransfer])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(admin).tokenBatchTransfer(livelyToken.address, [batchTransfer])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransfer(livelyToken.address, [batchTransfer])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenBatchTransfer(livelyToken.address, [batchTransfer])
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy
          .connect(user1)
          .tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(admin)
          .tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenTransferFrom(livelyToken.address, assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(admin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenBatchTransferFrom(livelyToken.address, [batchTransferFrom])
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy.connect(user1).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(admin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(systemAdmin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenApprove(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy
          .connect(user1)
          .tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(admin)
          .tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenIncreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        assetManagerProxy
          .connect(user1)
          .tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(admin)
          .tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenDecreaseAllowance(livelyToken.address, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");
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

    it("Should grant role LIVELY_ASSET_MANAGER_ROLE to assetManagerProxy success", async () => {
      // given
      const isAssetManagerRoleHasMember = await accessControlManager.isLivelyAssetManagerRole(
        assetManagerProxy.address
      );

      // when
      await expect(
        accessControlManager.connect(admin).grantRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address)
      )
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address);

      // then
      expect(isAssetManagerRoleHasMember).to.be.false;
      expect(await accessControlManager.isLivelyAssetManagerRole(assetManagerProxy.address)).to.be.true;
    });

    it("Should grant role LIVELY_ASSET_ADMIN_ROLE to assetManagerProxy success", async () => {
      // given
      const isAssetAdminRoleHasMember = await accessControlManager.isLivelyAssetAdminRole(assetManagerProxy.address);

      // when
      await expect(
        accessControlManager.connect(admin).grantRoleAccount(LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address)
      )
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address);

      // then
      expect(isAssetAdminRoleHasMember).to.be.false;
      expect(await accessControlManager.isLivelyAssetAdminRole(assetManagerProxy.address)).to.be.true;
    });

    it("Should register assets roles by admin success", async () => {
      // given
      const registerRoleRequest: IRoleManagement.RegiterRoleRequestStruct[] = [
        {
          name: "LIVELY_CROWD_FOUNDING_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
        {
          name: "LIVELY_VALIDATORS_REWARDS_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
        {
          name: "LIVELY_PUBLIC_SALE_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
        {
          name: "LIVELY_TREASURY_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
        {
          name: "LIVELY_FOUNDING_TEAM_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
        {
          name: "LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE",
          group: LIVELY_ASSET_GROUP,
          status: true,
        },
      ];

      // when
      await expect(accessControlManager.connect(admin).batchRegisterRole(registerRoleRequest))
        .to.emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_CROWD_FOUNDING_ASSET_ROLE,
          "LIVELY_CROWD_FOUNDING_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        )
        .emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
          "LIVELY_VALIDATORS_REWARDS_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        )
        .emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_PUBLIC_SALE_ASSET_ROLE,
          "LIVELY_PUBLIC_SALE_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        )
        .emit(accessControlManager, "RoleRegistered")
        .withArgs(adminAddress, LIVELY_TREASURY_ASSET_ROLE, "LIVELY_TREASURY_ASSET_ROLE", LIVELY_ASSET_GROUP, true)
        .emit(accessControlManager, "RoleRegistered")
        .withArgs(
          adminAddress,
          LIVELY_FOUNDING_TEAM_ASSET_ROLE,
          "LIVELY_FOUNDING_TEAM_ASSET_ROLE",
          LIVELY_ASSET_GROUP,
          true
        )
        .emit(accessControlManager, "RoleRegistered")
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
    });

    it("Should deploy assetERC20 by systemAdmin success", async () => {
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
    });

    it("Should call updateAssetSubject by anyone failed", async () => {
      // when and then
      await expect(
        assetManagerProxy.connect(admin).updateAssetSubject(assetSubjectERC20.address, "0x00")
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).updateAssetSubject(assetSubjectERC20.address, "0x00")
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).updateAssetSubject(assetSubjectERC20.address, "0x00")
      ).to.revertedWith("Access Denied");
    });

    it("Should call updateAssetSubject by assetAdmin success", async () => {
      // given
      const signature = await generatePredictContextDomainSignatureManually(
        assetManagerProxy.address,
        assetManagerERC20DomainRealm,
        accessControlManager.address,
        systemAdminWallet,
        networkChainId,
        assetSubjectERC20.address
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).updateAssetSubject(assetSubjectERC20.address, signature))
        .to.emit(assetManagerProxy, "AssetSubjectUpdated")
        .withArgs(assetAdminAddress, assetSubjectERC20.address);

      // then
      expect(await assetManagerProxy.getAssetSubject()).to.be.hexEqual(assetSubjectERC20.address);
    });

    it("Should register lively token to assetManager by anyone failed", async () => {
      // when and then
      await expect(assetManagerProxy.connect(admin).registerToken(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).registerToken(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).registerToken(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isTokenExists(livelyToken.address)).to.be.false;
    });

    it("Should register lively token to assetManager by assetAdmin success", async () => {
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
      expect(addresses).to.be.empty;
    });

    it("Should create assets by anyone failed", async () => {
      // given
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyAudioVideoProgramAssetName,
        assetVersion: "1.0.0",
        tokenId: livelyToken.address,
        role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
        salt: saltValue,
      };

      // when
      await expect(assetManagerProxy.connect(admin).createAsset(createAssetRequest)).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(systemAdmin).createAsset(createAssetRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).createAsset(createAssetRequest)).to.revertedWith("Access Denied");

      // then
      const [status, addresses] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(AssetStatus.ACTIVE);
      expect(addresses).to.be.empty;
    });

    it("Should create LIVELY_AUDIO_VIDEO_PROGRAM_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyAudioVideoProgramAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
        salt: saltValue,
      };
      assetAudioVideoProgram = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetAudioVideoProgram, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyAudioVideoProgramAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
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
      expect(await assetAudioVideoProgram.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetAudioVideoProgram.assetRole()).to.be.equal(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE);
      expect(await assetAudioVideoProgram.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetAudioVideoProgram.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetAudioVideoProgram.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_FOUNDING_TEAM_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyFoundingTeamAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_FOUNDING_TEAM_ASSET_ROLE,
        salt: saltValue,
      };
      assetFoundingTeam = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetFoundingTeam, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyFoundingTeamAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_FOUNDING_TEAM_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetFoundingTeam.assetName()).to.be.equal(livelyFoundingTeamAssetNameHash);
      expect(await assetFoundingTeam.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetFoundingTeam.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetFoundingTeam.assetInitVersion()).to.be.equal(1);
      expect(await assetFoundingTeam.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetFoundingTeam.assetRole()).to.be.equal(LIVELY_FOUNDING_TEAM_ASSET_ROLE);
      expect(await assetFoundingTeam.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetFoundingTeam.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetFoundingTeam.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_TREASURY_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyTreasuryAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_TREASURY_ASSET_ROLE,
        salt: saltValue,
      };
      assetTreasury = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyTreasuryAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_TREASURY_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetTreasury.assetName()).to.be.equal(livelyTreasuryAssetNameHash);
      expect(await assetTreasury.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetTreasury.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetTreasury.assetInitVersion()).to.be.equal(1);
      expect(await assetTreasury.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetTreasury.assetRole()).to.be.equal(LIVELY_TREASURY_ASSET_ROLE);
      expect(await assetTreasury.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetTreasury.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetTreasury.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_PUBLIC_SALE_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyPublicSaleAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_PUBLIC_SALE_ASSET_ROLE,
        salt: saltValue,
      };
      assetPublicSale = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetPublicSale, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyPublicSaleAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_PUBLIC_SALE_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetPublicSale.assetName()).to.be.equal(livelyPublicSaleAssetNameHash);
      expect(await assetPublicSale.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetPublicSale.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetPublicSale.assetInitVersion()).to.be.equal(1);
      expect(await assetPublicSale.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetPublicSale.assetRole()).to.be.equal(LIVELY_PUBLIC_SALE_ASSET_ROLE);
      expect(await assetPublicSale.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetPublicSale.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetPublicSale.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_VALIDATORS_REWARDS_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyValidatorRewardsAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_VALIDATORS_REWARDS_ASSET_ROLE,
        salt: saltValue,
      };
      assetValidatorsRewards = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetValidatorsRewards, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyValidatorRewardsAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_VALIDATORS_REWARDS_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetValidatorsRewards.assetName()).to.be.equal(livelyValidatorRewardsAssetNameHash);
      expect(await assetValidatorsRewards.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetValidatorsRewards.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetValidatorsRewards.assetInitVersion()).to.be.equal(1);
      expect(await assetValidatorsRewards.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetValidatorsRewards.assetRole()).to.be.equal(LIVELY_VALIDATORS_REWARDS_ASSET_ROLE);
      expect(await assetValidatorsRewards.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetValidatorsRewards.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetValidatorsRewards.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_CROWD_FOUNDING_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyCrowdFoundingAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_CROWD_FOUNDING_ASSET_ROLE,
        salt: saltValue,
      };
      assetCrowdFounding = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetCrowdFounding, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyCrowdFoundingAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_CROWD_FOUNDING_ASSET_ROLE
        );

      // then
      expect(await accessControlManager.isContextExists(ethers.utils.keccak256(assetId))).to.be.true;
      expect(
        await accessControlManager.hasRealmContext(assetManagerERC20DomainRealmHash, ethers.utils.keccak256(assetId))
      ).to.be.true;
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetCrowdFounding.assetName()).to.be.equal(livelyCrowdFoundingAssetNameHash);
      expect(await assetCrowdFounding.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetCrowdFounding.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetCrowdFounding.assetInitVersion()).to.be.equal(1);
      expect(await assetCrowdFounding.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetCrowdFounding.assetRole()).to.be.equal(LIVELY_CROWD_FOUNDING_ASSET_ROLE);
      expect(await assetCrowdFounding.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetCrowdFounding.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetCrowdFounding.assetSafeMode()).to.be.false;
    });

    it("Should create LIVELY_TAX_TREASURY_ASSET asset by assetAdmin success", async () => {
      // given
      const factory = new AssetERC20__factory(systemAdmin);
      const saltValue = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
      const assetId = await assetManagerProxy.predictAddress(
        assetSubjectERC20.address,
        saltValue,
        assetManagerProxy.address
      );
      const createAssetRequest: IAssetManagerERC20.CreateAssetRequestStruct = {
        assetName: livelyTaxTreasuryAssetName,
        assetVersion: livelyAssetERC20DomainVersion,
        tokenId: livelyToken.address,
        role: LIVELY_ASSET_ADMIN_ROLE,
        salt: saltValue,
      };
      assetTaxTreasury = await factory.attach(assetId);

      // when
      await expect(assetManagerProxy.connect(assetAdmin).createAsset(createAssetRequest))
        .to.emit(assetManagerProxy, "AssetCreated")
        .withArgs(assetAdminAddress, assetId, livelyToken.address, assetSubjectERC20.address)
        .to.emit(assetTaxTreasury, "AssetInitialized")
        .withArgs(
          assetManagerProxy.address,
          assetId,
          livelyToken.address,
          assetManagerProxy.address,
          assetSubjectERC20.address,
          livelyTaxTreasuryAssetName,
          livelyAssetERC20DomainVersion,
          assetManagerERC20DomainRealmHash,
          LIVELY_ASSET_ADMIN_ROLE
        );

      // then
      expect(await assetManagerProxy.isAssetExists(assetId)).to.be.true;

      // and
      expect(await assetTaxTreasury.assetName()).to.be.equal(livelyTaxTreasuryAssetNameHash);
      expect(await assetTaxTreasury.assetVersion()).to.be.equal(livelyAssetERC20DomainVersionHash);
      expect(await assetTaxTreasury.assetRealm()).to.be.equal(assetManagerERC20DomainRealmHash);
      expect(await assetTaxTreasury.assetInitVersion()).to.be.equal(1);
      expect(await assetTaxTreasury.assetType()).to.be.equal(AssetType.ERC20);
      expect(await assetTaxTreasury.assetRole()).to.be.equal(LIVELY_ASSET_ADMIN_ROLE);
      expect(await assetTaxTreasury.assetAcl()).to.be.equal(accessControlManager.address);
      expect(await assetTaxTreasury.assetToken()).to.be.equal(livelyToken.address);
      expect(await assetTaxTreasury.assetSafeMode()).to.be.false;
    });

    it("Should grant assetManagerProxy to all asset roles by admin success", async () => {
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
        },
        {
          role: LIVELY_ASSET_MANAGER_ROLE,
          account: assetManagerProxy.address,
        },
      ];

      // when and then
      await expect(accessControlManager.connect(admin).batchGrantRoleAccount(batchGrantRequest))
        .to.emit(accessControlManager, "RoleAccountGranted")
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
        .withArgs(adminAddress, LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address)
        .emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address);

      // then
      expect(
        await accessControlManager.hasRoleAccount(LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE, assetManagerProxy.address)
      ).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_PUBLIC_SALE_ASSET_ROLE, assetManagerProxy.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_TREASURY_ASSET_ROLE, assetManagerProxy.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_VALIDATORS_REWARDS_ASSET_ROLE, assetManagerProxy.address))
        .to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_CROWD_FOUNDING_ASSET_ROLE, assetManagerProxy.address)).to
        .be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_FOUNDING_TEAM_ASSET_ROLE, assetManagerProxy.address)).to
        .be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_ADMIN_ROLE, assetManagerProxy.address)).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetManagerProxy.address)).to.be
        .true;
    });

    it("Should grant user asset managers related to all asset roles by admin success", async () => {
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
      ];

      // when and then
      await expect(accessControlManager.connect(admin).batchGrantRoleAccount(batchGrantRequest))
        .to.emit(accessControlManager, "RoleAccountGranted")
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
        .withArgs(adminAddress, LIVELY_FOUNDING_TEAM_ASSET_ROLE, foundingTeamManagerAddress);

      // then
      expect(
        await accessControlManager.hasRoleAccount(
          LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE,
          audioVideoProgramManagerAddress
        )
      ).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_PUBLIC_SALE_ASSET_ROLE, publicSaleManagerAddress)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_TREASURY_ASSET_ROLE, treasuryManagerAddress)).to.be.true;

      expect(
        await accessControlManager.hasRoleAccount(LIVELY_VALIDATORS_REWARDS_ASSET_ROLE, validatorsRewardsManagerAddress)
      ).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_CROWD_FOUNDING_ASSET_ROLE, crowdFoundingManagerAddress))
        .to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_FOUNDING_TEAM_ASSET_ROLE, foundingTeamManagerAddress)).to
        .be.true;
    });

    it("Should grant all assets to LIVELY_ASSET_MANAGER_ROLE by admin success", async () => {
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
          account: assetTaxTreasury.address,
        },
      ];

      // when and then
      await expect(accessControlManager.connect(admin).batchGrantRoleAccount(batchGrantRequest))
        .to.emit(accessControlManager, "RoleAccountGranted")
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
        .withArgs(adminAddress, LIVELY_ASSET_MANAGER_ROLE, assetTaxTreasury.address);

      // then
      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetAudioVideoProgram.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetPublicSale.address)).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetTreasury.address)).to.be.true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetValidatorsRewards.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetCrowdFounding.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetFoundingTeam.address)).to.be
        .true;

      expect(await accessControlManager.hasRoleAccount(LIVELY_ASSET_MANAGER_ROLE, assetTaxTreasury.address)).to.be.true;
    });

    it("Should distribute token call by anyone failed", async () => {
      // when and then
      await expect(assetManagerProxy.connect(admin).livelyTokensDistribution(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(
        assetManagerProxy.connect(systemAdmin).livelyTokensDistribution(livelyToken.address)
      ).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).livelyTokensDistribution(livelyToken.address)).to.revertedWith(
        "Access Denied"
      );
    });

    it("Should distribute token call by assetAdmin success", async () => {
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
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetCrowdFoundingBalance);

      // then
      const afterBalanceAudioVideoProgram = await assetAudioVideoProgram.tokenBalance();
      const afterBalanceFoundingTeam = await assetFoundingTeam.tokenBalance();
      const afterBalanceTreasury = await assetTreasury.tokenBalance();
      const afterBalancePublicSale = await assetPublicSale.tokenBalance();
      const afterBalanceValidatorsRewards = await assetValidatorsRewards.tokenBalance();
      const afterBalanceCrowdFounding = await assetCrowdFounding.tokenBalance();

      expect(afterBalanceAudioVideoProgram.toString()).to.be.equal(
        beforeBalanceAudioVideoProgram.add(assetAudioVideoProgramBalance).toString()
      );
      expect(afterBalanceFoundingTeam.toString()).to.be.equal(
        beforeBalanceFoundingTeam.add(assetFoundingTeamBalance).toString()
      );
      expect(afterBalanceTreasury.toString()).to.be.equal(beforeBalanceTreasury.add(assetTreasuryBalance).toString());
      expect(afterBalancePublicSale.toString()).to.be.equal(
        beforeBalancePublicSale.add(assetPublicSaleBalance).toString()
      );
      expect(afterBalanceValidatorsRewards.toString()).to.be.equal(
        beforeBalanceValidatorsRewards.add(assetValidatorsRewardsBalance).toString()
      );
      expect(afterBalanceCrowdFounding.toString()).to.be.equal(
        beforeBalanceCrowdFounding.add(assetCrowdFoundingBalance).toString()
      );
    });

    it("Should removeAsset call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(admin).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).removeAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.true;
    });

    it("Should removeAsset call by assetAdmin success", async () => {
      // given
      const beforeRemoveAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRemoveAssetSafeMode = await assetPublicSale.assetSafeMode();
      const assetRealm = await assetPublicSale.assetRealm();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).removeAsset(assetPublicSale.address))
        .to.emit(assetManagerProxy, "AssetRemoved")
        .withArgs(assetAdminAddress, assetPublicSale.address, livelyToken.address)
        .to.emit(assetPublicSale, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetRealm, true);

      // then
      const afterRemoveAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const afterRemoveAssetSafeMode = await assetPublicSale.assetSafeMode();
      expect(beforeRemoveAsset).to.be.true;
      expect(afterRemoveAsset).to.be.false;
      expect(beforeRemoveAssetSafeMode).to.be.false;
      expect(afterRemoveAssetSafeMode).to.be.true;
    });

    it("Should registerAsset call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(admin).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).registerAsset(assetPublicSale.address)).to.revertedWith(
        "Access Denied"
      );

      expect(await assetManagerProxy.isAssetExists(assetPublicSale.address)).to.be.false;
    });

    it("Should registerAsset call by assetAdmin success", async () => {
      // given
      const beforeRegisterAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const beforeRegisterAssetSafeMode = await assetPublicSale.assetSafeMode();
      const assetRealm = await assetPublicSale.assetRealm();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).registerAsset(assetPublicSale.address))
        .to.emit(assetManagerProxy, "AssetRegistered")
        .withArgs(assetAdminAddress, assetPublicSale.address, livelyToken.address)
        .to.emit(assetPublicSale, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetRealm, false);

      // then
      const afterRegisterAsset = await assetManagerProxy.isAssetExists(assetPublicSale.address);
      const afterRegisterAssetSafeMode = await assetPublicSale.assetSafeMode();
      expect(beforeRegisterAsset).to.be.false;
      expect(afterRegisterAsset).to.be.true;
      expect(beforeRegisterAssetSafeMode).to.be.true;
      expect(afterRegisterAssetSafeMode).to.be.false;
    });

    it("Should setSafeModeToken call by anyone failed", async () => {
      // when
      await expect(assetManagerProxy.connect(admin).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(systemAdmin).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "Access Denied"
      );

      await expect(assetManagerProxy.connect(user1).setSafeModeToken(livelyToken.address, true)).to.revertedWith(
        "Access Denied"
      );

      // then
      const [status] = await assetManagerProxy.getTokenInfo(livelyToken.address);
      expect(status).to.be.eq(AssetStatus.ACTIVE);
    });

    it("Should enable SafeMode Token by assetAdmin success", async () => {
      // given
      const assetRealm = await assetPublicSale.assetRealm();
      const beforeAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const beforeAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const beforeAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const beforeAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const beforeAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const beforeAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const beforeAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeToken(livelyToken.address, true))
        .to.emit(assetManagerProxy, "TokenSafeModeChanged")
        .withArgs(assetAdminAddress, livelyToken.address, true)
        .to.emit(assetAudioVideoProgram, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, assetRealm, true)
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, assetRealm, true)
        .to.emit(assetTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTreasury.address, assetRealm, true)
        .to.emit(assetPublicSale, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetRealm, true)
        .to.emit(assetValidatorsRewards, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, assetRealm, true)
        .to.emit(assetCrowdFounding, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetRealm, true)
        .to.emit(assetTaxTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address, assetRealm, true);

      // then
      const afterAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const afterAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const afterAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const afterAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const afterAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const afterAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const afterAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      expect(beforeAssetAudioVideoProgramStatus).to.be.false;
      expect(afterAssetAudioVideoProgramStatus).to.be.true;
      expect(beforeAssetFoundingTeamStatus).to.be.false;
      expect(afterAssetFoundingTeamStatus).to.be.true;
      expect(beforeAssetTreasuryStatus).to.be.false;
      expect(afterAssetTreasuryStatus).to.be.true;
      expect(beforeAssetPublicSaleStatus).to.be.false;
      expect(afterAssetPublicSaleStatus).to.be.true;
      expect(beforeAssetValidatorsRewardsStatus).to.be.false;
      expect(afterAssetValidatorsRewardsStatus).to.be.true;
      expect(beforeAssetAudioVideoProgramStatus).to.be.false;
      expect(afterAssetAudioVideoProgramStatus).to.be.true;
      expect(beforeAssetCrowdFoundingStatus).to.be.false;
      expect(afterAssetCrowdFoundingStatus).to.be.true;
      expect(beforeAssetTaxTreasuryStatus).to.be.false;
      expect(afterAssetTaxTreasuryStatus).to.be.true;
    });

    it("Should disable SafeMode Token by assetAdmin success", async () => {
      // given
      const assetRealm = await assetPublicSale.assetRealm();
      const beforeAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const beforeAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const beforeAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const beforeAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const beforeAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const beforeAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const beforeAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      // when
      await expect(assetManagerProxy.connect(assetAdmin).setSafeModeToken(livelyToken.address, false))
        .to.emit(assetManagerProxy, "TokenSafeModeChanged")
        .withArgs(assetAdminAddress, livelyToken.address, false)
        .to.emit(assetAudioVideoProgram, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetAudioVideoProgram.address, assetRealm, false)
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetFoundingTeam.address, assetRealm, false)
        .to.emit(assetTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTreasury.address, assetRealm, false)
        .to.emit(assetPublicSale, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetPublicSale.address, assetRealm, false)
        .to.emit(assetValidatorsRewards, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetValidatorsRewards.address, assetRealm, false)
        .to.emit(assetCrowdFounding, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetCrowdFounding.address, assetRealm, false)
        .to.emit(assetTaxTreasury, "AssetSafeModeChanged")
        .withArgs(assetManagerProxy.address, assetTaxTreasury.address, assetRealm, false);

      // then
      const afterAssetAudioVideoProgramStatus = await assetAudioVideoProgram.assetSafeMode();
      const afterAssetFoundingTeamStatus = await assetFoundingTeam.assetSafeMode();
      const afterAssetTreasuryStatus = await assetTreasury.assetSafeMode();
      const afterAssetPublicSaleStatus = await assetPublicSale.assetSafeMode();
      const afterAssetValidatorsRewardsStatus = await assetValidatorsRewards.assetSafeMode();
      const afterAssetCrowdFoundingStatus = await assetCrowdFounding.assetSafeMode();
      const afterAssetTaxTreasuryStatus = await assetTaxTreasury.assetSafeMode();

      expect(beforeAssetAudioVideoProgramStatus).to.be.true;
      expect(afterAssetAudioVideoProgramStatus).to.be.false;
      expect(beforeAssetFoundingTeamStatus).to.be.true;
      expect(afterAssetFoundingTeamStatus).to.be.false;
      expect(beforeAssetTreasuryStatus).to.be.true;
      expect(afterAssetTreasuryStatus).to.be.false;
      expect(beforeAssetPublicSaleStatus).to.be.true;
      expect(afterAssetPublicSaleStatus).to.be.false;
      expect(beforeAssetValidatorsRewardsStatus).to.be.true;
      expect(afterAssetValidatorsRewardsStatus).to.be.false;
      expect(beforeAssetAudioVideoProgramStatus).to.be.true;
      expect(afterAssetAudioVideoProgramStatus).to.be.false;
      expect(beforeAssetCrowdFoundingStatus).to.be.true;
      expect(afterAssetCrowdFoundingStatus).to.be.false;
      expect(beforeAssetTaxTreasuryStatus).to.be.true;
      expect(afterAssetTaxTreasuryStatus).to.be.false;
    });

    it("Should tokenLock call of PublicSales asset by anyone failed", async () => {
      // given
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetPublicSale.address,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 25 * 60 * 60),
      };

      // when and then
      await expect(assetManagerProxy.connect(admin).tokenLock(assetPublicSale.address, lockRequest)).to.revertedWith(
        "Access Denied"
      );

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenLock(assetPublicSale.address, lockRequest)
      ).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).tokenLock(assetPublicSale.address, lockRequest)).to.revertedWith(
        "Access Denied"
      );
    });

    it("Should tokenLock call of PublicSales asset by assetAdmin success", async () => {
      // given
      const assetPublicBalanceBefore = await assetPublicSale.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetPublicSale.address,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 25 * 60 * 60),
      };
      const lockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequest.source, lockRequest.dest, lockRequest.timestamp, lockRequest.amount]
        )
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).tokenLock(assetPublicSale.address, lockRequest))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          lockId,
          assetPublicSale.address,
          assetPublicSale.address,
          user2Address,
          lockRequest.timestamp,
          lockRequest.amount
        )
        .to.emit(assetPublicSale, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetPublicSale.address,
          assetPublicSale.interface.getSighash(
            assetPublicSale.interface.functions["tokenLock((address,address,uint256,uint256))"]
          )
        );

      // then
      const [amount, lockedAt, claimedAt, source, status] = await livelyToken.lockInfo(lockId, user2Address);
      const assetPublicBalanceAfter = await assetPublicSale.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetPublicBalanceAfter.toString()).to.be.equal(assetPublicBalanceBefore.sub(dummyAmount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount.toString()).to.be.equal(lockRequest.amount.toString());
      expect(lockedAt.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt.toString()).to.be.equal(lockRequest.timestamp.toString());
      expect(source).to.be.hexEqual(assetPublicSale.address);
      expect(<LockState>status).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenBatchLock call of FoundingTeam asset by anyone failed", async () => {
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
      ];

      await expect(assetManagerProxy.connect(admin).tokenBatchLock(livelyToken.address, lockRequests)).to.revertedWith(
        "Access Denied"
      );

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchLock(livelyToken.address, lockRequests)
      ).to.revertedWith("Access Denied");

      await expect(assetManagerProxy.connect(user1).tokenBatchLock(livelyToken.address, lockRequests)).to.revertedWith(
        "Access Denied"
      );
    });

    it("Should tokenBatchLock call of FoundingTeam asset by assetAdmin success", async () => {
      // given
      const assetFoundingTeamBalanceBefore = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceBefore = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyToken.totalBalanceOf(user1Address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 48 * 60 * 60),
        },
      ];

      const user2LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[0].source, lockRequests[0].dest, lockRequests[0].timestamp, lockRequests[0].amount]
        )
      );
      const user1LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[1].source, lockRequests[1].dest, lockRequests[1].timestamp, lockRequests[1].amount]
        )
      );

      // when
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchLock(assetFoundingTeam.address, lockRequests))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user2LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[0].timestamp,
          lockRequests[0].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user1LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[1].timestamp,
          lockRequests[1].amount
        )
        .to.emit(livelyToken, "BatchTokenLocked")
        .withArgs(assetFoundingTeam.address, dummyAmount.mul(2))
        .to.emit(assetFoundingTeam, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetFoundingTeam.address,
          assetFoundingTeam.interface.getSighash(
            assetFoundingTeam.interface.functions["tokenBatchLock((address,address,uint256,uint256)[])"]
          )
        );

      // then
      const [amount1, lockedAt1, claimedAt1, source1, status1] = await livelyToken.lockInfo(user2LockId, user2Address);
      const [amount2, lockedAt2, claimedAt2, source2, status2] = await livelyToken.lockInfo(user1LockId, user1Address);
      const assetFoundingTeamBalanceAfter = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceAfter = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyToken.totalBalanceOf(user1Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetFoundingTeamBalanceAfter.toString()).to.be.equal(
        assetFoundingTeamBalanceBefore.sub(dummyAmount.mul(2)).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount1.toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(lockedAt1.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt1.toString()).to.be.equal(lockRequests[0].timestamp.toString());
      expect(source1).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status1).to.be.equal(LockState.LOCKED);

      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(dummyAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount2.toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(lockedAt2.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt2.toString()).to.be.equal(lockRequests[1].timestamp.toString());
      expect(source2).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status2).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenTransfer call of AudioVideoProgram asset by anyone failed", async () => {
      // when and then
      await expect(
        assetManagerProxy.connect(admin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenTransfer call of AudioVideoProgram asset by assetAdmin success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenTransfer(assetAudioVideoProgram.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetAudioVideoProgram.address, user1Address, dummyAmount)
        .to.emit(assetAudioVideoProgram, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenTransfer(address,uint256)"]
          )
        );

      // then
      const assetAudioVideoProgramBalanceAfter = await assetAudioVideoProgram.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransfer call of Treasury asset by anyone failed", async () => {
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      await expect(
        assetManagerProxy.connect(admin).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransfer(assetTreasury.address, [batchTransfer])
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenBatchTransfer call of Treasury asset by assetAdmin success", async () => {
      // given
      const assetTreasuryBalanceBefore = await assetTreasury.tokenBalance();
      const user2BalanceBefore = await livelyToken.balanceOf(user2Address);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      // when
      await expect(assetManagerProxy.connect(assetAdmin).tokenBatchTransfer(assetTreasury.address, [batchTransfer]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetTreasury.address, user2Address, batchTransfer.amount)
        .to.emit(livelyToken, "BatchTransfer")
        .withArgs(user1Address, batchTransfer.amount)
        .to.emit(assetTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTreasury.address,
          assetTreasury.interface.getSighash(
            assetTreasury.interface.functions["tokenBatchTransfer((address,uint256)[])"]
          )
        );

      // then
      const assetTreasuryBalanceAfter = await assetTreasury.tokenBalance();
      const user2BalanceAfter = await livelyToken.balanceOf(user2Address);

      expect(assetTreasuryBalanceAfter).to.be.equal(assetTreasuryBalanceBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenApprove call of ValidatorsRewards asset by anyone failed", async () => {
      // when and then
      await expect(
        assetManagerProxy.connect(admin).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenApprove(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenApprove call of ValidatorsRewards asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenApprove(assetValidatorsRewards.address, assetTaxTreasury.address, dummyAmount.mul(2))
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetValidatorsRewards.address, assetTreasury.address, dummyAmount.mul(2))
        .to.emit(assetValidatorsRewards, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetValidatorsRewards.address,
          assetValidatorsRewards.interface.getSighash(
            assetValidatorsRewards.interface.functions["tokenApprove(address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      expect(assetTaxTreasuryAllowanceAfter.toString()).to.be.equal(
        assetTaxTreasuryAllowanceBefore.add(dummyAmount.mul(2)).toString()
      );
    });

    it("Should tokenTransferFrom call of TaxTreasury asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy
          .connect(admin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(user1)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenTransferFrom call of TaxTreasury asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenTransferFrom(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenTransferFrom(address,address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransferFrom call of TaxTreasury asset by anyone failed", async () => {
      // given
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(
        assetManagerProxy.connect(admin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(systemAdmin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenBatchTransferFrom call of TaxTreasury asset by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(
        assetManagerProxy.connect(assetAdmin).tokenBatchTransferFrom(assetTaxTreasury.address, [batchTransferFrom])
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "BatchTransferFrom")
        .withArgs(assetTaxTreasury.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenBatchTransferFrom((address,address,uint256)[])"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenIncreaseAllowance call of CrowdFounding asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy.connect(admin).tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenIncreaseAllowance call of CrowdFounding asset by assetAdmin success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenIncreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalIncreased")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetCrowdFounding.address,
          assetCrowdFounding.interface.getSighash(
            assetCrowdFounding.interface.functions["tokenIncreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenDecreaseAllowance call of CrowdFounding asset by anyone failed", async () => {
      // when
      await expect(
        assetManagerProxy.connect(admin).tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy
          .connect(systemAdmin)
          .tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");

      await expect(
        assetManagerProxy.connect(user1).tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      ).to.revertedWith("Access Denied");
    });

    it("Should tokenDecreaseAllowance call of CrowdFounding asset by assetAdmin success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(
        assetManagerProxy
          .connect(assetAdmin)
          .tokenDecreaseAllowance(assetCrowdFounding.address, user2Address, dummyAmount)
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalDecrease")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          assetManagerProxy.address,
          assetCrowdFounding.address,
          assetSubjectERC20.interface.getSighash(
            assetSubjectERC20.interface.functions["tokenDecreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.sub(dummyAmount).toString());
    });
  });

  describe("AssetERC20 Tests", function () {
    it("Should enable asset safeMode by anyone failed", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();

      // when and then
      await expect(assetFoundingTeam.connect(user1).assetSafeModeSet(true)).to.revertedWith("AssetERC20 Access Denied");

      await expect(assetFoundingTeam.connect(admin).assetSafeModeSet(true)).to.revertedWith("AssetERC20 Access Denied");

      await expect(assetFoundingTeam.connect(systemAdmin).assetSafeModeSet(true)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetFoundingTeam.connect(foundingTeamManager).assetSafeModeSet(true)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable asset safeMode of assetFoundingTeam by assetAdmin success", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();
      const realm = await assetFoundingTeam.assetRealm();

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSafeModeSet(true))
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetAdminAddress, assetFoundingTeam.address, realm, true);

      // and
      expect(safeMode).to.be.false;

      // and
      expect(await assetFoundingTeam.assetSafeMode()).to.be.true;
    });

    it("Should call any methods by anyone when assetSafeMode enabled failed", async () => {
      // given
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAdminAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 24 * 60 * 60),
      };

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
      await expect(assetFoundingTeam.connect(user1).tokenLock(lockRequest)).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(admin).tokenLock(lockRequest)).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenLock(lockRequest)).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenLock(lockRequest)).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );

      // and
      await expect(assetFoundingTeam.connect(user1).tokenBatchLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(admin).tokenBatchLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenBatchLock([lockRequest])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(admin).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenTransfer(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(admin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(admin).tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(systemAdmin)
          .tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam
          .connect(foundingTeamManager)
          .tokenTransferFrom(assetAdminAddress, assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(admin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenBatchTransferFrom([batchTransferFrom])
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(assetFoundingTeam.connect(user1).tokenApprove(assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(assetFoundingTeam.connect(admin).tokenApprove(assetAdminAddress, BigNumber.from(0))).to.revertedWith(
        "SafeMode: AssetERC20 Call Rejected"
      );
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenApprove(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenApprove(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(admin).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenIncreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");

      // and
      await expect(
        assetFoundingTeam.connect(user1).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(admin).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(systemAdmin).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
      await expect(
        assetFoundingTeam.connect(foundingTeamManager).tokenDecreaseAllowance(assetAdminAddress, BigNumber.from(0))
      ).to.revertedWith("SafeMode: AssetERC20 Call Rejected");
    });

    it("Should disable asset safeMode of assetFoundingTeam by assetAdmin success", async () => {
      // given
      const safeMode = await assetFoundingTeam.assetSafeMode();
      const realm = await assetFoundingTeam.assetRealm();

      // when and then
      await expect(assetFoundingTeam.connect(assetAdmin).assetSafeModeSet(false))
        .to.emit(assetFoundingTeam, "AssetSafeModeChanged")
        .withArgs(assetAdminAddress, assetFoundingTeam.address, realm, false);

      // and
      expect(safeMode).to.be.true;

      // and
      expect(await assetManagerProxy.isSafeMode()).to.be.false;
    });

    it("Should tokenLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async () => {
      // given
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 25 * 60 * 60),
      };

      // when and then
      await expect(assetAudioVideoProgram.connect(admin).tokenLock(lockRequest)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(systemAdmin).tokenLock(lockRequest)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(assetAdmin).tokenLock(lockRequest)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenLock of LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetAudioVideoProgram.address,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 50 * 60 * 60),
      };
      const lockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequest.source, lockRequest.dest, lockRequest.timestamp, lockRequest.amount]
        )
      );

      // when
      await expect(assetAudioVideoProgram.connect(audioVideoProgramManager).tokenLock(lockRequest))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          lockId,
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.address,
          user2Address,
          lockRequest.timestamp,
          lockRequest.amount
        )
        .to.emit(assetAudioVideoProgram, "AssetERC20Called")
        .withArgs(
          audioVideoProgramManagerAddress,
          assetAudioVideoProgram.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenLock((address,address,uint256,uint256))"]
          )
        );

      // then
      const [amount, lockedAt, claimedAt, source, status] = await livelyToken.lockInfo(lockId, user2Address);
      const assetAudioVideoProgramBalanceAfter = await assetAudioVideoProgram.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount.toString()).to.be.equal(lockRequest.amount.toString());
      expect(lockedAt.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt.toString()).to.be.equal(lockRequest.timestamp.toString());
      expect(source).to.be.hexEqual(assetAudioVideoProgram.address);
      expect(<LockState>status).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenBatchLock of LIVELY_FOUNDING_TEAM_ASSET by anyone failed", async () => {
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
      ];

      await expect(assetFoundingTeam.connect(admin).tokenBatchLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetFoundingTeam.connect(systemAdmin).tokenBatchLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetFoundingTeam.connect(assetAdmin).tokenBatchLock(lockRequests)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenBatchLock of LIVELY_FOUNDING_TEAM_ASSET by foundingTeamManager success", async () => {
      // given
      const assetFoundingTeamBalanceBefore = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceBefore = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceBefore = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyToken.totalBalanceOf(user1Address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetFoundingTeam.address,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
        {
          source: assetFoundingTeam.address,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + 60 * 60 * 60),
        },
      ];

      const user2LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[0].source, lockRequests[0].dest, lockRequests[0].timestamp, lockRequests[0].amount]
        )
      );
      const user1LockId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "address", "uint256", "uint256"],
          [lockRequests[1].source, lockRequests[1].dest, lockRequests[1].timestamp, lockRequests[1].amount]
        )
      );

      // when
      await expect(assetFoundingTeam.connect(foundingTeamManager).tokenBatchLock(lockRequests))
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user2LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[0].timestamp,
          lockRequests[0].amount
        )
        .to.emit(livelyToken, "TokenLocked")
        .withArgs(
          user1LockId,
          assetFoundingTeam.address,
          assetFoundingTeam.address,
          user2Address,
          lockRequests[1].timestamp,
          lockRequests[1].amount
        )
        .to.emit(livelyToken, "BatchTokenLocked")
        .withArgs(assetFoundingTeam.address, dummyAmount.mul(2))
        .to.emit(assetFoundingTeam, "AssetERC20Called")
        .withArgs(
          foundingTeamManagerAddress,
          assetFoundingTeam.address,
          assetFoundingTeam.interface.getSighash(
            assetFoundingTeam.interface.functions["tokenBatchLock((address,address,uint256,uint256)[])"]
          )
        );

      // then
      const [amount1, lockedAt1, claimedAt1, source1, status1] = await livelyToken.lockInfo(user2LockId, user2Address);
      const [amount2, lockedAt2, claimedAt2, source2, status2] = await livelyToken.lockInfo(user1LockId, user1Address);
      const assetFoundingTeamBalanceAfter = await assetFoundingTeam.tokenBalance();
      const user2LockBalanceAfter = await livelyToken.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyToken.totalBalanceOf(user2Address);
      const user1LockBalanceAfter = await livelyToken.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyToken.totalBalanceOf(user1Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetFoundingTeamBalanceAfter.toString()).to.be.equal(
        assetFoundingTeamBalanceBefore.sub(dummyAmount.mul(2)).toString()
      );
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount1.toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(lockedAt1.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt1.toString()).to.be.equal(lockRequests[0].timestamp.toString());
      expect(source1).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status1).to.be.equal(LockState.LOCKED);

      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(dummyAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount2.toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(lockedAt2.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt2.toString()).to.be.equal(lockRequests[1].timestamp.toString());
      expect(source2).to.be.hexEqual(assetFoundingTeam.address);
      expect(<LockState>status2).to.be.equal(LockState.LOCKED);
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetPublicSale.connect(admin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(systemAdmin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetPublicSale.connect(assetAdmin).tokenTransfer(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenTransfer of LIVELY_PUBLIC_SALE_ASSET by publicSaleManager success", async () => {
      // given
      const assetPublicSaleBalanceBefore = await assetPublicSale.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(assetPublicSale.connect(publicSaleManager).tokenTransfer(user1Address, dummyAmount))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetPublicSale.address, user1Address, dummyAmount)
        .to.emit(assetPublicSale, "AssetERC20Called")
        .withArgs(
          publicSaleManagerAddress,
          assetPublicSale.address,
          assetAudioVideoProgram.interface.getSighash(
            assetAudioVideoProgram.interface.functions["tokenTransfer(address,uint256)"]
          )
        );

      // then
      const assetPublicSaleBalanceAfter = await assetPublicSale.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetPublicSaleBalanceAfter.toString()).to.be.equal(
        assetPublicSaleBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      await expect(assetTreasury.connect(admin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTreasury.connect(systemAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTreasury.connect(assetAdmin).tokenBatchTransfer([batchTransfer])).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenBatchTransfer of LIVELY_TREASURY_ASSET by treasuryManager success", async () => {
      // given
      const assetTreasuryBalanceBefore = await assetTreasury.tokenBalance();
      const user2BalanceBefore = await livelyToken.balanceOf(user2Address);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      // when
      await expect(assetTreasury.connect(treasuryManager).tokenBatchTransfer([batchTransfer]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetTreasury.address, user2Address, batchTransfer.amount)
        .to.emit(livelyToken, "BatchTransfer")
        .withArgs(user1Address, batchTransfer.amount)
        .to.emit(assetTreasury, "AssetERC20Called")
        .withArgs(
          treasuryManagerAddress,
          assetTreasury.address,
          assetTreasury.interface.getSighash(
            assetTreasury.interface.functions["tokenBatchTransfer((address,uint256)[])"]
          )
        );

      // then
      const assetTreasuryBalanceAfter = await assetTreasury.tokenBalance();
      const user2BalanceAfter = await livelyToken.balanceOf(user2Address);

      expect(assetTreasuryBalanceAfter).to.be.equal(assetTreasuryBalanceBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by anyone failed", async () => {
      // when and then
      await expect(assetValidatorsRewards.connect(admin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(systemAdmin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetValidatorsRewards.connect(assetAdmin).tokenApprove(user1Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );
    });

    it("Should tokenApprove of LIVELY_VALIDATORS_REWARDS_ASSET by validatorsRewardsManager success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );

      // when
      await expect(
        assetValidatorsRewards
          .connect(validatorsRewardsManager)
          .tokenApprove(assetTaxTreasury.address, dummyAmount.mul(2))
      )
        .to.emit(livelyToken, "Approval")
        .withArgs(assetValidatorsRewards.address, assetTreasury.address, dummyAmount.mul(2))
        .to.emit(assetValidatorsRewards, "AssetERC20Called")
        .withArgs(
          validatorsRewardsManagerAddress,
          assetValidatorsRewards.address,
          assetValidatorsRewards.interface.getSighash(
            assetValidatorsRewards.interface.functions["tokenApprove(address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      expect(assetTaxTreasuryAllowanceAfter.toString()).to.be.equal(
        assetTaxTreasuryAllowanceBefore.add(dummyAmount.mul(2)).toString()
      );
    });

    it("Should tokenTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      // when
      await expect(
        assetTaxTreasury.connect(admin).tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(systemAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetTaxTreasury
          .connect(treasuryManager)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenTransferFrom of LIVELY_TREASURY_ASSET by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);

      // when
      await expect(
        assetTaxTreasury
          .connect(assetAdmin)
          .tokenTransferFrom(assetValidatorsRewards.address, user1Address, dummyAmount)
      )
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminAddress,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenTransferFrom(address,address,uint256)"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by anyone failed", async () => {
      // given
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(assetTaxTreasury.connect(admin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetTaxTreasury.connect(systemAdmin).tokenBatchTransferFrom([batchTransferFrom])).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetTaxTreasury.connect(treasuryManager).tokenBatchTransferFrom([batchTransferFrom])
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenBatchTransferFrom of LIVELY_TREASURY_ASSET by assetAdmin success", async () => {
      // given
      const assetTaxTreasuryAllowanceBefore = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceBefore = await assetValidatorsRewards.tokenBalance();
      const user1BalanceBefore = await livelyToken.balanceOf(user1Address);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: assetValidatorsRewards.address,
        to: user1Address,
        amount: dummyAmount,
      };

      // when
      await expect(assetTaxTreasury.connect(assetAdmin).tokenBatchTransferFrom([batchTransferFrom]))
        .to.emit(livelyToken, "Transfer")
        .withArgs(assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "BatchTransferFrom")
        .withArgs(assetTaxTreasury.address, dummyAmount)
        .to.emit(livelyToken, "TransferFrom")
        .withArgs(assetTaxTreasury.address, assetValidatorsRewards.address, user1Address, dummyAmount)
        .to.emit(livelyToken, "Approval")
        .withArgs(
          assetValidatorsRewards.address,
          assetTaxTreasury.address,
          assetTaxTreasuryAllowanceBefore.sub(dummyAmount)
        )
        .to.emit(assetTaxTreasury, "AssetERC20Called")
        .withArgs(
          assetAdminAddress,
          assetTaxTreasury.address,
          assetTaxTreasury.interface.getSighash(
            assetTaxTreasury.interface.functions["tokenBatchTransferFrom((address,address,uint256)[])"]
          )
        );

      // then
      const assetTaxTreasuryAllowanceAfter = await livelyToken.allowance(
        assetValidatorsRewards.address,
        assetTaxTreasury.address
      );
      const assetValidatorsRewardsBalanceAfter = await assetValidatorsRewards.tokenBalance();
      const user1BalanceAfter = await livelyToken.balanceOf(user1Address);
      expect(assetTaxTreasuryAllowanceAfter).to.be.equal(assetTaxTreasuryAllowanceBefore.sub(dummyAmount).toString());
      expect(assetValidatorsRewardsBalanceAfter).to.be.equal(
        assetValidatorsRewardsBalanceBefore.sub(dummyAmount).toString()
      );
      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(admin).tokenIncreaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenIncreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenIncreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenIncreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenIncreaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalIncreased")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerAddress,
          assetCrowdFounding.address,
          assetCrowdFounding.interface.getSighash(
            assetCrowdFounding.interface.functions["tokenIncreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by anyone failed", async () => {
      // when
      await expect(assetCrowdFounding.connect(admin).tokenDecreaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(
        assetCrowdFounding.connect(systemAdmin).tokenDecreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");

      await expect(
        assetCrowdFounding.connect(assetAdmin).tokenDecreaseAllowance(user2Address, dummyAmount)
      ).to.revertedWith("AssetERC20 Access Denied");
    });

    it("Should tokenDecreaseAllowance of LIVELY_CROWD_FOUNDING_ASSET by crowdFoundingManager success", async () => {
      // given
      const user2AllowanceBefore = await livelyToken.allowance(assetCrowdFounding.address, user2Address);

      // when
      await expect(assetCrowdFounding.connect(crowdFoundingManager).tokenDecreaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyToken, "Approval")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(livelyToken, "ApprovalDecrease")
        .withArgs(assetCrowdFounding.address, user2Address, dummyAmount)
        .to.emit(assetCrowdFounding, "AssetERC20Called")
        .withArgs(
          crowdFoundingManagerAddress,
          assetCrowdFounding.address,
          assetSubjectERC20.interface.getSighash(
            assetSubjectERC20.interface.functions["tokenDecreaseAllowance(address,uint256)"]
          )
        );

      // then
      const user2AllowanceAfter = await livelyToken.allowance(assetCrowdFounding.address, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.sub(dummyAmount).toString());
    });

    it("Should deposit eth coin to LIVELY_AUDIO_VIDEO_PROGRAM_ASSET success", async () => {
      // given
      // const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const assetAudioVideoProgramBalanceBefore = await assetAudioVideoProgram.assetBalance();
      const user1BalanceBefore = await provider.getBalance(user1Address);
      const transaction: TransactionRequest = {
        to: assetAudioVideoProgram.address,
        value: ethers.utils.parseEther("10"),
      };

      // when
      const response = await user1.sendTransaction(transaction);

      // then
      const receiptTx = await provider.getTransactionReceipt(response.hash);
      // const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      const assetAudioVideoProgramBalanceAfter = await assetAudioVideoProgram.assetBalance();
      const user1BalanceAfter = await provider.getBalance(user1Address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore
          .sub(BigNumber.from(10).mul(tokenDecimal))
          .sub(receiptTx.gasUsed.mul(receiptTx.effectiveGasPrice))
          .toString()
      );
    });

    it("Should withdraw eth coin from LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by anyone failed", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);

      // when
      await expect(assetAudioVideoProgram.connect(user1).withdrawBalance(user1Address)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(systemAdmin).withdrawBalance(systemAdminAddress)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      await expect(assetAudioVideoProgram.connect(admin).withdrawBalance(adminAddress)).to.revertedWith(
        "AssetERC20 Access Denied"
      );

      // then
      const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(assetAudioVideoProgramBalanceBefore.toString());
    });

    it("Should withdraw eth coin from LIVELY_AUDIO_VIDEO_PROGRAM_ASSET by audioVideoProgramManager success", async () => {
      // given
      const assetAudioVideoProgramBalanceBefore = await provider.getBalance(assetAudioVideoProgram.address);
      const user1BalanceBefore = await provider.getBalance(user1Address);

      // when
      await assetAudioVideoProgram.connect(audioVideoProgramManager).withdrawBalance(user1Address);

      // then
      const user1BalanceAfter = await provider.getBalance(user1Address);
      const assetAudioVideoProgramBalanceAfter = await provider.getBalance(assetAudioVideoProgram.address);
      expect(assetAudioVideoProgramBalanceAfter.toString()).to.be.equal(
        assetAudioVideoProgramBalanceBefore.sub(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
    });
  });
});
