import { expect } from "chai";
import { Signer, BigNumber, Wallet, BigNumberish } from "ethers";
import { deployments, ethers, waffle } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable camelcase */
import {
  AccessControlManager,
  AccessControlManager__factory,
  IERC20Extra,
  LAccessControl__factory,
  LContextManagement__factory,
  LGroupManagement__factory,
  LivelyToken,
  LivelyToken__factory,
  LRealmManagement__factory,
  LRoleManagement__factory,
  LTokenERC20,
  LTokenERC20__factory,
  Proxy__factory,
  Relay,
  Relay__factory
} from "../../typechain/types";
import { LivelyTokenLibraryAddresses } from "../../typechain/types/factories/token/lively/LivelyToken__factory";
import {
  generateDomainSeparator,
  generateContextDomainSignatureManually,
  generatePermitDomainSignatureByHardhat,
} from "./TestUtils";
/* eslint-disable node/no-extraneous-import */
import { TransactionRequest, TransactionResponse } from "@ethersproject/abstract-provider";
import {
  BatchTokenUnlockedEventObject,
  IERC20Lock,
  TokenUnlockedEventObject
} from "../../typechain/types/token/lively/LivelyToken";
const { provider } = waffle;

enum LockState {
  NONE,
  LOCKED,
  CLAIMED,
  UNLOCKED
}

describe("Lively Token Tests", function () {
  let admin: Signer;
  let systemAdmin: Signer;
  let assetManager: Signer;
  let user1: Signer;
  let user2: Signer;
  let taxTreasury: Signer;
  let adminWallet: Wallet;
  let systemAdminWallet: Wallet;
  let user1Wallet: Wallet;
  let user2Wallet: Wallet;
  let assetManagerWallet: Wallet;
  let taxTreasuryWallet: Wallet;
  let adminAddress: Address;
  let systemAdminAddress: Address;
  let user1Address: Address;
  let user2Address: Address;
  let assetManagerAddress: Address;
  let taxTreasuryAddress: Address;
  let lTokenERC20: LTokenERC20;
  let linkLibraryAddresses: LivelyTokenLibraryAddresses;
  let accessControlManager: AccessControlManager;
  let daoExecutorForwarder: Relay;
  let livelyTokenSubject: LivelyToken;
  let livelyTokenProxy: LivelyToken;
  let networkChainId: number;
  let user1LockIds: string[] = [];
  let user2LockIds: string[] = [];
  const taxValue = BigNumber.from(300);
  const tokenDecimal = BigNumber.from(10).pow(BigNumber.from(18));
  const dummyAmount = BigNumber.from(10000).mul(tokenDecimal);
  const livelyTokenDomainName = "LivelyToken";
  const livelyTokenDomainVersion = "1.0.0";
  const livelyTokenDomainRealm = "LIVELY_GENERAL_REALM";
  const livelyTokenDomainNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainName));
  const livelyTokenDomainVersionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainVersion));
  const livelyTokenDomainRealmHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(livelyTokenDomainRealm));
  const livelyTokenTotalSupply = BigNumber.from("5000000000").mul(tokenDecimal);

  this.beforeAll(async () => {
    [admin, systemAdmin, user1, user2, assetManager, taxTreasury] = await ethers.getSigners();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    [adminWallet, systemAdminWallet, user1Wallet, user2Wallet, assetManagerWallet, taxTreasuryWallet] =
      waffle.provider.getWallets();
    adminAddress = await admin.getAddress();
    systemAdminAddress = await systemAdmin.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    taxTreasuryAddress = await taxTreasury.getAddress();
    assetManagerAddress = await assetManager.getAddress();
    networkChainId = parseInt(await provider.send("eth_chainId", []));
    // console.log(`system admin address: ${systemAdminAddress}`);
  });

  describe("Libraries and Dependencies Deployments Test", function () {
    it("Should LTokenERC20 deploy success", async () => {
      // given
      const lTokenERC20Factory = new LTokenERC20__factory(systemAdmin);

      // when
      lTokenERC20 = await lTokenERC20Factory.deploy();

      // then
      expect(lTokenERC20.address).not.null;
      expect(await lTokenERC20.LIB_NAME()).to.be.hexEqual(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LTokenERC20"))
      );
      expect(await lTokenERC20.LIB_VERSION()).to.be.hexEqual(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1.0.0")));
    });

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

    it("Should grant LIVELY_ASSET_MANAGER_ROLE to asset manager account success", async () => {
      // given
      const assetMangerRole = await accessControlManager.livelyAssetManagerRole();

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(assetMangerRole, assetManagerAddress))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, assetMangerRole, assetManagerAddress);

      // then
      expect(await accessControlManager.isLivelyAssetManagerRole(assetManagerAddress)).to.be.true;
    });
  });

  describe("Subject (LivelyToken Implementation) Tests", function () {
    this.beforeAll(async () => {
      linkLibraryAddresses = {
        "src/contracts/lib/token/LTokenERC20.sol:LTokenERC20": lTokenERC20.address,
      };
    });

    it("Should LivelyToken Subject deploy success", async () => {
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
    });

    it("Should initialize of LivelyToken subject failed", async () => {
      // when and then
      await expect(
        livelyTokenSubject.connect(systemAdmin).initialize({
          domainName: "LivelyToken",
          domainVersion: "1.0.0",
          domainRealm: "LIVELY_GENERAL_REALM",
          accessControlManager: accessControlManager.address,
          taxTreasuryAddress,
          taxRateValue: BigNumber.from("300"),
          signature: "0x00",
          assetManager: assetManagerAddress,
        })
      ).to.be.revertedWith("Illegal Contract Call");
    });

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
  });

  describe("LivelyToken (UUPS Proxy) ERC20 Tests", function () {
    it("Should deploy and initialize LivelyToken proxy success (typechain, two steps)", async () => {
      // given
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
        taxTreasuryAddress,
        assetManager: assetManagerAddress,
      };

      // when
      livelyTokenProxy = livelyTokenSubject.attach(tokenProxy.address);
      await expect(livelyTokenProxy.connect(systemAdmin).initialize(request))
        .to.emit(livelyTokenProxy, "Upgraded")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, livelyTokenSubject.address)
        .to.emit(livelyTokenProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, systemAdminAddress)
        .to.emit(livelyTokenProxy, "Initialized")
        .withArgs(
          systemAdminAddress,
          livelyTokenProxy.address,
          livelyTokenSubject.address,
          livelyTokenDomainName,
          livelyTokenDomainVersion,
          livelyTokenDomainRealmHash,
          1
        );

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
      expect(await livelyTokenProxy.domainSeparator()).to.be.equal(
        generateDomainSeparator(
          livelyTokenDomainName,
          livelyTokenDomainVersion,
          livelyTokenProxy.address,
          networkChainId
        )
      );
    });

    it("Should deploy relay contract success", async() => {
      // given
      const relayFactory = new Relay__factory(systemAdmin);

      // when
      daoExecutorForwarder = await relayFactory.deploy(livelyTokenProxy.address);

      // then
      expect(daoExecutorForwarder.address).not.null
    })

    it("Should grant LIVELY_DAO_EXECUTOR_ROLE to admin account failed", async () => {
      // given
      const daoExecutorRole = await accessControlManager.livelyCommunityDaoExecutorRole();

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(daoExecutorRole, adminAddress))
        .to.revertedWith("Illegal Grant Dao Executor Role");

      // then
      expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(adminAddress)).to.be.false;
    });

    it("Should grant LIVELY_DAO_EXECUTOR_ROLE to relay contract success", async () => {
      // given
      const daoExecutorRole = await accessControlManager.livelyCommunityDaoExecutorRole();

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(daoExecutorRole, daoExecutorForwarder.address))
        .to.emit(accessControlManager, "RoleAccountGranted")
        .withArgs(adminAddress, daoExecutorRole, daoExecutorForwarder.address);

      // then
      expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(daoExecutorForwarder.address)).to.be.true;
    });

    it("Should grant LIVELY_DAO_EXECUTOR_ROLE to another contract failed", async () => {
      // given
      const relayFactory = new Relay__factory(systemAdmin);
      const forwarder = await relayFactory.deploy(livelyTokenProxy.address);
      const daoExecutorRole = await accessControlManager.livelyCommunityDaoExecutorRole();

      // when
      await expect(accessControlManager.connect(admin).grantRoleAccount(daoExecutorRole, forwarder.address))
        .to.revertedWith("Illegal Grant Dao Executor Role")

      // then
      expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(forwarder.address)).to.be.false;
      expect(await accessControlManager.isLivelyCommunityDaoExecutorRole(daoExecutorForwarder.address)).to.be.true;
    });

    it("Should LivelyToken ERC20 init state success ", async () => {
      // given
      const totalSupply = await livelyTokenProxy.totalSupply();
      const systemAdminBalance = await livelyTokenProxy.balanceOf(systemAdminAddress);

      // when and then
      expect(await livelyTokenProxy.name()).to.be.equal("LIVELY");
      expect(await livelyTokenProxy.symbol()).to.be.equal("LVL");
      expect(await livelyTokenProxy.decimals()).to.be.equal(18);
      expect(livelyTokenTotalSupply.eq(totalSupply as unknown as BigNumberish));
      expect(livelyTokenTotalSupply.eq(systemAdminBalance as unknown as BigNumberish));
    });

    it("Should enable safeMode by anyone failed", async () => {
      // given
      const safeMode = await livelyTokenProxy.isSafeMode();

      // when and then
      await expect(livelyTokenProxy.connect(user1).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable safeMode by admin failed", async () => {
      // given
      const safeMode = await livelyTokenProxy.isSafeMode();

      // when and then
      await expect(livelyTokenProxy.connect(admin).setSafeMode(true)).to.revertedWith("SetSafeMode Forbidden");

      // and
      expect(safeMode).to.be.false;
    });

    it("Should enable safeMode by systemAdmin success", async () => {
      // given
      let safeMode = await livelyTokenProxy.isSafeMode();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setSafeMode(true))
        .to.emit(livelyTokenProxy, "SafeModeChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, livelyTokenDomainRealmHash, true);

      // and
      expect(safeMode).to.be.false;

      // and
      safeMode = await livelyTokenProxy.isSafeMode();
      expect(safeMode).to.be.true;
    });

    it("Should call any methods by anyone when safeMode enabled failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const deadline = BigNumber.from(Date.now() + 10000);
      const user1Nonce = await livelyTokenProxy.nonce(user1Address);
      const adminNonce = await livelyTokenProxy.nonce(adminAddress);
      const systemAdminNonce = await livelyTokenProxy.nonce(systemAdminAddress);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        user1Address,
        user2Address,
        dummyAmount,
        user1Nonce,
        deadline,
        livelyTokenProxy.address,
        user1Address,
        networkChainId
      );
      const adminSignature = await generatePermitDomainSignatureByHardhat(
        adminAddress,
        user2Address,
        dummyAmount,
        adminNonce,
        deadline,
        livelyTokenProxy.address,
        adminAddress,
        networkChainId
      );

      const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
        systemAdminAddress,
        user2Address,
        dummyAmount,
        systemAdminNonce,
        deadline,
        livelyTokenProxy.address,
        systemAdminAddress,
        networkChainId
      );

      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: dummyAmount,
        to: user2Address,
      };

      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: user1Address,
        to: user2Address,
        amount: dummyAmount,
      };

      const batchUpdateTaxWhitelist: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct = {
        account: user2Address,
        isDeleted: false,
      };

      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: user2Address,
        reason: "Rollback"
      }

      // when and then
      await expect(livelyTokenProxy.connect(user1).setUpgradeStatus(true)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).setUpgradeStatus(true)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).setUpgradeStatus(true)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(
        livelyTokenProxy.connect(user1).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy.connect(admin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).upgradeTo(livelyTokenProxy.address, typedArray1, false)
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).transfer(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).transfer(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(adminAddress, user2Address, dummyAmount)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy.connect(admin).transferFrom(adminAddress, user2Address, dummyAmount)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).transferFrom(adminAddress, user2Address, dummyAmount)
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).approve(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).approve(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).decreaseAllowance(user2Address, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).decreaseAllowance(user2Address, BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(
        livelyTokenProxy.connect(systemAdmin).decreaseAllowance(user2Address, BigNumber.from(0))
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(
        livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy.connect(admin).permit(adminAddress, user2Address, dummyAmount, deadline, adminSignature)
      ).to.revertedWith("SafeMode: Call Rejected");
      await expect(
        livelyTokenProxy
          .connect(systemAdmin)
          .permit(systemAdminAddress, user2Address, dummyAmount, deadline, systemAdminSignature)
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).burn(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).burn(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).mint(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).mint(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).batchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).batchTransfer([batchTransfer])).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).batchTransferFrom([batchTransferFrom])).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(BigNumber.from(0))).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist(user2Address, false)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).updateTaxWhitelist(user2Address, false)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist(user2Address, false)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).batchUpdateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).batchUpdateTaxWhitelist([batchUpdateTaxWhitelist])).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(
        livelyTokenProxy.connect(systemAdmin).batchUpdateTaxWhitelist([batchUpdateTaxWhitelist])
      ).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).pause(user2Address)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).pause(user2Address)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).pause(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).unpause(user2Address)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).unpause(user2Address)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).unpause(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(user1).pauseAll()).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).pauseAll()).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).pauseAll()).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).unpauseAll()).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).unpauseAll()).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll()).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(user1).withdrawBalance(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).withdrawBalance(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(user2Address)).to.revertedWith(
        "SafeMode: Call Rejected"
      );

      // and
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).lockToken(lockRequest)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).lockToken(lockRequest)).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(assetManager).batchLockToken([lockRequest])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).batchLockToken([lockRequest])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).batchLockToken([lockRequest])).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(assetManager).claimToken(ethers.utils.formatBytes32String("0"))).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).claimToken(ethers.utils.formatBytes32String("0"))).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).claimToken(ethers.utils.formatBytes32String("0"))).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(assetManager).batchClaimToken([ethers.utils.formatBytes32String("0")])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).batchClaimToken([ethers.utils.formatBytes32String("0")])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).batchClaimToken([ethers.utils.formatBytes32String("0")])).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(assetManager).unlockToken(unlockRequest)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).unlockToken(unlockRequest)).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).unlockToken(unlockRequest)).to.revertedWith("SafeMode: Call Rejected");

      // and
      await expect(livelyTokenProxy.connect(assetManager).batchUnlockToken([unlockRequest])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(admin).batchUnlockToken([unlockRequest])).to.revertedWith("SafeMode: Call Rejected");
      await expect(livelyTokenProxy.connect(systemAdmin).batchUnlockToken([unlockRequest])).to.revertedWith("SafeMode: Call Rejected");
    });

    it("Should disable safeMode by systemAdmin success", async () => {
      // given
      let safeMode = await livelyTokenProxy.isSafeMode();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setSafeMode(false))
        .to.emit(livelyTokenProxy, "SafeModeChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, livelyTokenDomainRealmHash, false);

      // and
      expect(safeMode).to.be.true;

      // and
      safeMode = await livelyTokenProxy.isSafeMode();
      expect(safeMode).to.be.false;
    });

    it("Should setLocalAdmin by anyone failed", async () => {
      // given
      const currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(user1).setLocalAdmin(user2Address)).to.revertedWith(
        "SetLocalAdmin Forbidden"
      );

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should setLocalAdmin by admin failed", async () => {
      // given
      const currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(admin).setLocalAdmin(user2Address)).to.revertedWith(
        "SetLocalAdmin Forbidden"
      );

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should setLocalAdmin by systemAdmin to user2 success", async () => {
      // given
      let currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(user2Address))
        .to.emit(livelyTokenProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, user2Address);

      // and
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);

      // and
      currentLocalAdmin = await livelyTokenProxy.localAdmin();
      expect(currentLocalAdmin).to.be.hexEqual(user2Address);
    });

    it("Should setLocalAdmin by user2 to systemAdmin success", async () => {
      // given
      let currentLocalAdmin = await livelyTokenProxy.localAdmin();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setLocalAdmin(systemAdminAddress))
        .to.emit(livelyTokenProxy, "LocalAdminChanged")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, systemAdminAddress);

      // and
      expect(currentLocalAdmin).to.be.hexEqual(user2Address);

      // and
      currentLocalAdmin = await livelyTokenProxy.localAdmin();
      expect(currentLocalAdmin).to.be.hexEqual(systemAdminAddress);
    });

    it("Should enable upgrade by anyone failed", async () => {
      // given
      const upgradeStatus = await livelyTokenProxy.isUpgradable();

      // when and then
      await expect(livelyTokenProxy.connect(user1).setUpgradeStatus(true)).to.revertedWith(
        "SetUpgradeStatus Forbidden"
      );

      // and
      expect(upgradeStatus).to.be.false;
    });

    it("Should enable upgrade by systemAdmin failed", async () => {
      // given
      const upgradeStatus = await livelyTokenProxy.isUpgradable();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).setUpgradeStatus(true)).to.revertedWith(
        "SetUpgradeStatus Forbidden"
      );

      // and
      expect(upgradeStatus).to.be.false;
    });

    it("Should enable upgrade by admin success", async () => {
      // given
      let upgradeStatus = await livelyTokenProxy.isUpgradable();

      // when and then
      await expect(livelyTokenProxy.connect(admin).setUpgradeStatus(true))
        .to.emit(livelyTokenProxy, "UpgradeStatusChanged")
        .withArgs(adminAddress, livelyTokenProxy.address, livelyTokenDomainRealmHash, true);

      // and
      expect(upgradeStatus).to.be.false;

      // and
      upgradeStatus = await livelyTokenProxy.isUpgradable();
      expect(upgradeStatus).to.be.true;
    });

    it("Should upgradeTo by anyone failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const livelyTokenFactory = new LivelyToken__factory(linkLibraryAddresses, user1);
      const newLivelyTokenSubject = await livelyTokenFactory.deploy();

      // when and then
      await expect(
        livelyTokenProxy.connect(user1).upgradeTo(newLivelyTokenSubject.address, typedArray1, false)
      ).to.revertedWith("Upgrade Context Forbidden");
    });

    it("Should upgradeTo by admin failed", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const livelyTokenFactory = new LivelyToken__factory(linkLibraryAddresses, admin);
      const newLivelyTokenSubject = await livelyTokenFactory.deploy();

      // when and then
      await expect(
        livelyTokenProxy.connect(admin).upgradeTo(newLivelyTokenSubject.address, typedArray1, false)
      ).to.revertedWith("Upgrade Context Forbidden");
    });

    it("Should upgradeTo by systemAdmin success", async () => {
      // given
      const typedArray1 = new Int8Array(0);
      const livelyTokenFactory = new LivelyToken__factory(linkLibraryAddresses, systemAdmin);
      const newLivelyTokenSubject = await livelyTokenFactory.deploy();

      // when and then
      await expect(livelyTokenProxy.connect(systemAdmin).upgradeTo(newLivelyTokenSubject.address, typedArray1, false))
        .to.emit(livelyTokenProxy, "Upgraded")
        .withArgs(systemAdminAddress, livelyTokenProxy.address, newLivelyTokenSubject.address);

      livelyTokenSubject = newLivelyTokenSubject;
    });

    it("Should assetManager transfer token to user1 success", async () => {
      // given
      let assetManagerBalance = await livelyTokenProxy.balanceOf(assetManagerAddress);
      let user1Balance = await livelyTokenProxy.balanceOf(user1Address);

      // when
      await expect(livelyTokenProxy.connect(assetManager).transfer(user1Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetManagerAddress, user1Address, dummyAmount);

      // then
      expect(assetManagerBalance.toString()).to.be.equal(livelyTokenTotalSupply.toString());
      expect(user1Balance.toString()).to.be.equal(BigNumber.from(0).toString());

      // and
      assetManagerBalance = await livelyTokenProxy.balanceOf(assetManagerAddress);
      user1Balance = await livelyTokenProxy.balanceOf(user1Address);
      expect(assetManagerBalance.toString()).to.be.equal(livelyTokenTotalSupply.sub(dummyAmount).toString());
      expect(user1Balance.toString()).to.be.equal(dummyAmount.toString());
    });

    it("Should user1 to user2 transfer token success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const amount = BigNumber.from(1000).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, user2Address, amount);

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
    });

    it("Should assetManager approve to user1 and user2 success", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const user1AllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user1Address);

      // when
      await expect(livelyTokenProxy.connect(assetManager).approve(user2Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user2Address, user2AllowanceBefore.add(dummyAmount));

      await expect(livelyTokenProxy.connect(assetManager).approve(user1Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user1Address, user1AllowanceBefore.add(dummyAmount));

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.add(dummyAmount).toString());
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
    });

    it("Should user2 transferFrom from assetManager account success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const amount = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = assetManagerAllowanceBefore.sub(amount);

      // when
      await expect(livelyTokenProxy.connect(user2).transferFrom(assetManagerAddress, user1Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetManagerAddress, user1Address, amount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(user2Address, assetManagerAddress, user1Address, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user2Address, finalAllowance);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
    });

    it("Should assetManager increase allowance to user2 success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const finalAllowance = assetManagerAllowanceBefore.add(dummyAmount);

      // when
      await expect(livelyTokenProxy.connect(assetManager).increaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user2Address, finalAllowance)
        .to.emit(livelyTokenProxy, "ApprovalIncreased")
        .withArgs(assetManagerAddress, user2Address, dummyAmount);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
    });

    it("Should user2 transferFrom token exceeded allowance from assetManager account failed", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const assetMangerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const amount = dummyAmount.mul(10);

      // when
      await expect(
        livelyTokenProxy.connect(user2).transferFrom(assetManagerAddress, user1Address, amount)
      ).to.revertedWith("Insufficient Account Allowance");

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const assetMangerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(assetManagerAllowanceBefore.toString()).to.be.equal(assetManagerAllowanceAfter.toString());
      expect(assetMangerBalanceBefore.toString()).to.be.equal(assetMangerBalanceAfter.toString());
    });

    it("Should assetManager decrease allowance from user2 success", async () => {
      // given
      const assetManagerAllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      const finalAllowance = assetManagerAllowanceBefore.sub(dummyAmount);

      // when
      await expect(livelyTokenProxy.connect(assetManager).decreaseAllowance(user2Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user2Address, finalAllowance)
        .to.emit(livelyTokenProxy, "ApprovalDecreased")
        .withArgs(assetManagerAddress, user2Address, dummyAmount);

      // then
      const assetManagerAllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user2Address);
      expect(assetManagerAllowanceAfter.toString()).to.be.equal(finalAllowance.toString());
    });

    it("Should user1 permit to user2 success", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const nonce = await livelyTokenProxy.nonce(user1Address);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        user1Address,
        user2Address,
        dummyAmount,
        nonce,
        deadline,
        livelyTokenProxy.address,
        user1Address,
        networkChainId
      );

      // when
      await expect(
        livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
      )
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(user1Address, user2Address, dummyAmount);

      // then
      const nonceAfter = await livelyTokenProxy.nonce(user1Address);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.add(dummyAmount).toString());
      expect(nonceAfter.toString()).to.be.equal(nonce.add(BigNumber.from(1)).toString());
    });

    it("Should user2 transferFrom from user1 account success", async () => {
      // given
      let user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const amount = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = user1Allowance.sub(amount);

      // when
      await expect(livelyTokenProxy.connect(user2).transferFrom(user1Address, adminAddress, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, adminAddress, amount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(user2Address, user1Address, adminAddress, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(user1Address, user2Address, finalAllowance);

      // then
      user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(amount).toString());
    });

    it("Should user1 batch transfer token success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const value = BigNumber.from(500).mul(tokenDecimal);
      const batchTransfer: IERC20Extra.BatchTransferRequestStruct = {
        amount: value,
        to: user2Address,
      };

      // when
      await expect(livelyTokenProxy.connect(user1).batchTransfer([batchTransfer]))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, user2Address, batchTransfer.amount)
        .to.emit(livelyTokenProxy, "BatchTransfer")
        .withArgs(user1Address, batchTransfer.amount);

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);

      expect(user1BalanceAfter).to.be.equal(user1BalanceBefore.sub(value).toString());
      expect(user2BalanceAfter).to.be.equal(user2BalanceBefore.add(value).toString());
    });

    it("Should user2 batch transferFrom user1 account success", async () => {
      // given
      let user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const value = BigNumber.from(1000).mul(tokenDecimal);
      const finalAllowance = user1Allowance.sub(value);
      const batchTransferFrom: IERC20Extra.BatchTransferFromRequestStruct = {
        from: user1Address,
        to: adminAddress,
        amount: value,
      };

      // when
      await expect(livelyTokenProxy.connect(user2).batchTransferFrom([batchTransferFrom]))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, adminAddress, value)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(user2Address, user1Address, adminAddress, value)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(user1Address, user2Address, finalAllowance)
        .to.emit(livelyTokenProxy, "BatchTransferFrom")
        .withArgs(user2Address, value);

      // then
      user1Allowance = await livelyTokenProxy.allowance(user1Address, user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      expect(user1Allowance.toString()).to.be.equal(finalAllowance.toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(value).toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.add(value).toString());
    });

    it("Should anyone mint token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(user1).mint(user2Address, dummyAmount)).to.revertedWith("Access Denied");

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should systemAdmin mint token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).mint(user2Address, dummyAmount)).to.revertedWith(
        "Access Denied"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should admin mint token success", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).mint(user2Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Mint")
        .withArgs(adminAddress, user2Address, dummyAmount, totalSupplyBefore.add(dummyAmount));

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.add(dummyAmount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(dummyAmount).toString());
    });

    it("Should anyone burn token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(user1).burn(user2Address, dummyAmount)).to.revertedWith("Access Denied");

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should systemAdmin burn token failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).burn(user2Address, dummyAmount)).to.revertedWith(
        "Access Denied"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should admin burn token success", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).burn(user2Address, dummyAmount))
        .to.emit(livelyTokenProxy, "Burn")
        .withArgs(adminAddress, user2Address, dummyAmount, totalSupplyBefore.sub(dummyAmount));

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.sub(dummyAmount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(dummyAmount).toString());
    });

    it("Should anyone (user1) pause account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(user1).pause(user2Address)).to.revertedWith("Access Denied");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should systemAdmin pause an account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).pause(user2Address)).to.revertedWith("Access Denied");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should admin pause an user2 account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).pause(user2Address))
        .to.emit(livelyTokenProxy, "Paused")
        .withArgs(adminAddress, user2Address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedBefore).to.be.false;
      expect(isPausedAfter).to.be.true;
      expect(pausedAccounts[0]).to.be.equal(user2Address);
    });

    it("Should user2 to user1 transfer token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(user2).transfer(user1Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user2 to user1 transferFrom token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(user2Address, adminAddress, dummyAmount)
      ).to.revertedWith("ERC20Pause: Account Suspended");

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user1 transferFrom user2 token when account paused failed", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(user2Address, adminAddress, dummyAmount)
      ).to.revertedWith("ERC20Pause: Account Suspended");

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should user2 approve to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);

      // when
      await expect(livelyTokenProxy.connect(user2).approve(user1Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 increase allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);

      // when
      await expect(livelyTokenProxy.connect(user2).increaseAllowance(user1Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 decrease allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
      const amount = BigNumber.from(0);

      // when
      await expect(livelyTokenProxy.connect(user2).decreaseAllowance(user1Address, amount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
    });

    it("Should user2 permit allowance to user1 when account paused failed", async () => {
      // given
      const user2AllowanceBefore = await livelyTokenProxy.allowance(user2Address, user1Address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const nonce = await livelyTokenProxy.nonce(user2Address);
      const user2Signature = await generatePermitDomainSignatureByHardhat(
        user2Address,
        user1Address,
        dummyAmount,
        nonce,
        deadline,
        livelyTokenProxy.address,
        user2Address,
        networkChainId
      );

      // when
      await expect(
        livelyTokenProxy.connect(user2).permit(user2Address, user1Address, dummyAmount, deadline, user2Signature)
      ).to.revertedWith("ERC20Pause: Account Suspended");

      // then
      const nonceAfter = await livelyTokenProxy.nonce(user2Address);
      const user2AllowanceAfter = await livelyTokenProxy.allowance(user2Address, user1Address);
      expect(user2AllowanceAfter.toString()).to.be.equal(user2AllowanceBefore.toString());
      expect(nonceAfter.toString()).to.be.equal(nonce.toString());
    });

    it("Should admin burn token from user2 when account paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).burn(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should admin mint token to user2 when account paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).mint(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Account Suspended"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.toString());
    });

    it("Should anyone (user1) unpause account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(user1).unpause(user2Address)).to.revertedWith("Access Denied");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should systemAdmin unpause an account failed", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).unpause(user2Address)).to.revertedWith("Access Denied");

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      expect(isPausedAfter).to.be.equal(isPausedBefore);
    });

    it("Should admin unpause an user2 account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).unpause(user2Address))
        .to.emit(livelyTokenProxy, "Unpaused")
        .withArgs(adminAddress, user2Address);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(user2Address);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedAfter).to.be.false;
      expect(isPausedBefore).to.be.true;
      expect(pausedAccounts).to.be.empty;
    });

    it("Should user1 to user2 transfer token when account unpaused success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const amount = BigNumber.from(10).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user2).transfer(user1Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user2Address, user1Address, amount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(amount).toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
    });

    it("Should admin pause an asset manager account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(admin).pause(assetManagerAddress))
        .to.emit(livelyTokenProxy, "Paused")
        .withArgs(adminAddress, assetManagerAddress);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(assetManagerAddress);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedBefore).to.be.false;
      expect(isPausedAfter).to.be.true;
      expect(pausedAccounts[0]).to.be.equal(assetManagerAddress);
    });

    it("Should lock token from paused assetManager failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest))
        .revertedWith("ERC20Pause: Account Suspended")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should batch lock token from paused assetManager failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).batchLockToken([lockRequest]))
        .revertedWith("ERC20Pause: Account Suspended")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should claim token from paused assetManager  failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(assetManager).claimToken(ethers.utils.formatBytes32String("00")))
        .revertedWith("ERC20Pause: Account Suspended")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should batch claim token from paused assetManager failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(assetManager).batchClaimToken([ethers.utils.formatBytes32String("00")]))
        .revertedWith("ERC20Pause: Account Suspended")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should unlock token by paused asset manager failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetManagerAddress,
        reason: "Rollback"
      }
      const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);

      // when
      await expect(assetManager.sendTransaction({ to: daoExecutorForwarder.address, data: data}))
        .to.revertedWith("ERC20Pause: Account Suspended");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should batch unlock token by paused asset manager failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct[] = [{
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetManagerAddress,
        reason: "Rollback"
      }]
      const data = livelyTokenProxy.interface.encodeFunctionData("batchUnlockToken", [unlockRequest]);

      // when
      await expect(assetManager.sendTransaction({ to: daoExecutorForwarder.address, data: data}))
        .to.revertedWith("ERC20Pause: Account Suspended");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should admin unpause asset manager account success", async () => {
      // given
      const isPausedBefore = await livelyTokenProxy.isPaused(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(admin).unpause(assetManagerAddress))
        .to.emit(livelyTokenProxy, "Unpaused")
        .withArgs(adminAddress, assetManagerAddress);

      // then
      const isPausedAfter = await livelyTokenProxy.isPaused(assetManagerAddress);
      const pausedAccounts = await livelyTokenProxy.pausedAccounts();
      expect(isPausedAfter).to.be.false;
      expect(isPausedBefore).to.be.true;
      expect(pausedAccounts).to.be.empty;
    });

    it("Should anyone (user2) pauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(user2).pauseAll()).to.revertedWith("Access Denied");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should systemAdmin pauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).pauseAll()).to.revertedWith("Access Denied");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should admin pauseAll success", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(admin).pauseAll())
        .to.emit(livelyTokenProxy, "PausedAll")
        .withArgs(adminAddress);

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.true;
      expect(isPausedAllBefore).to.be.false;
    });

    it("Should transfer token by anyone when token paused failed", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminAddress);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).transfer(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).transfer(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminAddress);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
    });

    it("Should transferFrom token by anyone when token paused failed", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const systemAdminBalanceBefore = await livelyTokenProxy.balanceOf(systemAdminAddress);

      // when
      await expect(
        livelyTokenProxy.connect(user1).transferFrom(assetManagerAddress, user2Address, dummyAmount)
      ).to.revertedWith("ERC20Pause: Call Rejected");
      await expect(
        livelyTokenProxy.connect(admin).transferFrom(assetManagerAddress, user2Address, dummyAmount)
      ).to.revertedWith("ERC20Pause: Call Rejected");
      await expect(
        livelyTokenProxy.connect(systemAdmin).transferFrom(assetManagerAddress, user2Address, dummyAmount)
      ).to.revertedWith("ERC20Pause: Call Rejected");

      // then
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const systemAdminBalanceAfter = await livelyTokenProxy.balanceOf(systemAdminAddress);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.toString());
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(systemAdminBalanceAfter.toString()).to.be.equal(systemAdminBalanceBefore.toString());
    });

    it("Should approve token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);

      // when
      await expect(livelyTokenProxy.connect(user1).approve(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).approve(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).approve(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should increase allowance token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);

      // when
      await expect(livelyTokenProxy.connect(user1).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).increaseAllowance(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should decrease allowance token by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      const amount = BigNumber.from(0);

      // when
      await expect(livelyTokenProxy.connect(user1).decreaseAllowance(user2Address, amount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(admin).decreaseAllowance(user2Address, amount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );
      await expect(livelyTokenProxy.connect(systemAdmin).decreaseAllowance(user2Address, amount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
    });

    it("Should permit allowance by anyone when token paused failed", async () => {
      // given
      const user1AllowanceBefore = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceBefore = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceBefore = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      const deadline = BigNumber.from(Date.now() + 10000);
      const user1NonceBefore = await livelyTokenProxy.nonce(user1Address);
      const adminNonceBefore = await livelyTokenProxy.nonce(adminAddress);
      const systemAdminNonceBefore = await livelyTokenProxy.nonce(systemAdminAddress);
      const user1Signature = await generatePermitDomainSignatureByHardhat(
        user1Address,
        user2Address,
        dummyAmount,
        user1NonceBefore,
        deadline,
        livelyTokenProxy.address,
        user1Address,
        networkChainId
      );
      const adminSignature = await generatePermitDomainSignatureByHardhat(
        adminAddress,
        user2Address,
        dummyAmount,
        adminNonceBefore,
        deadline,
        livelyTokenProxy.address,
        adminAddress,
        networkChainId
      );
      const systemAdminSignature = await generatePermitDomainSignatureByHardhat(
        systemAdminAddress,
        user2Address,
        dummyAmount,
        systemAdminNonceBefore,
        deadline,
        livelyTokenProxy.address,
        systemAdminAddress,
        networkChainId
      );

      // when
      await expect(
        livelyTokenProxy.connect(user1).permit(user1Address, user2Address, dummyAmount, deadline, user1Signature)
      ).to.revertedWith("ERC20Pause: Call Rejected");
      await expect(
        livelyTokenProxy.connect(admin).permit(adminAddress, user2Address, dummyAmount, deadline, adminSignature)
      ).to.revertedWith("ERC20Pause: Call Rejected");
      await expect(
        livelyTokenProxy
          .connect(systemAdmin)
          .permit(systemAdminAddress, user2Address, dummyAmount, deadline, systemAdminSignature)
      ).to.revertedWith("ERC20Pause: Call Rejected");

      // then
      const user1NonceAfter = await livelyTokenProxy.nonce(user1Address);
      const adminNonceAfter = await livelyTokenProxy.nonce(adminAddress);
      const systemAdminNonceAfter = await livelyTokenProxy.nonce(systemAdminAddress);
      const user1AllowanceAfter = await livelyTokenProxy.allowance(user1Address, user2Address);
      const adminAllowanceAfter = await livelyTokenProxy.allowance(adminAddress, user2Address);
      const systemAdminAllowanceAfter = await livelyTokenProxy.allowance(systemAdminAddress, user2Address);
      expect(user1AllowanceAfter.toString()).to.be.equal(user1AllowanceBefore.toString());
      expect(adminAllowanceAfter.toString()).to.be.equal(adminAllowanceBefore.toString());
      expect(systemAdminAllowanceAfter.toString()).to.be.equal(systemAdminAllowanceBefore.toString());
      expect(user1NonceAfter.toString()).to.be.equal(user1NonceBefore.toString());
      expect(adminNonceAfter.toString()).to.be.equal(adminNonceBefore.toString());
      expect(systemAdminNonceAfter.toString()).to.be.equal(systemAdminNonceBefore.toString());
    });

    it("Should burn token by admin when token paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);

      // when
      await expect(livelyTokenProxy.connect(admin).burn(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should mint token by anyone when token paused failed", async () => {
      // given
      const totalSupplyBefore = await livelyTokenProxy.totalSupply();
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);

      // when
      await expect(livelyTokenProxy.connect(admin).mint(user2Address, dummyAmount)).to.revertedWith(
        "ERC20Pause: Call Rejected"
      );

      // then
      const totalSupplyAfter = await livelyTokenProxy.totalSupply();
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(totalSupplyAfter.toString()).to.be.equal(totalSupplyBefore.toString());
    });

    it("Should lock token when token paused failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest))
        .revertedWith("ERC20Pause: Call Rejected")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should batch lock token when token paused failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).batchLockToken([lockRequest]))
        .revertedWith("ERC20Pause: Call Rejected")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should claim token from when token paused  failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(assetManager).claimToken(ethers.utils.formatBytes32String("00")))
        .revertedWith("ERC20Pause: Call Rejected")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should batch claim token when token paused failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);

      // when
      await expect(livelyTokenProxy.connect(assetManager).batchClaimToken([ethers.utils.formatBytes32String("00")]))
        .revertedWith("ERC20Pause: Call Rejected")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should unlock token when token paused failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetManagerAddress,
        reason: "Rollback"
      }
      const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);

      // when
      await expect(assetManager.sendTransaction({ to: daoExecutorForwarder.address, data: data}))
        .to.revertedWith("ERC20Pause: Call Rejected");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should batch unlock token when token paused failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct[] = [{
        lockId: ethers.utils.formatBytes32String("0"),
        account: assetManagerAddress,
        reason: "Rollback"
      }]

      const data = livelyTokenProxy.interface.encodeFunctionData("batchUnlockToken", [unlockRequest]);

      // when
      await expect(assetManager.sendTransaction({ to: daoExecutorForwarder.address, data: data}))
        .to.revertedWith("ERC20Pause: Call Rejected");

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    })

    it("Should anyone (user2) unpauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(user1).unpauseAll()).to.revertedWith("Access Denied");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should systemAdmin unpauseAll failed", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).unpauseAll()).to.revertedWith("Access Denied");

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.equal(isPausedAllBefore);
    });

    it("Should admin unpauseAll success", async () => {
      // given
      const isPausedAllBefore = await livelyTokenProxy.isPausedAll();

      // when
      await expect(livelyTokenProxy.connect(admin).unpauseAll())
        .to.emit(livelyTokenProxy, "UnpausedAll")
        .withArgs(adminAddress);

      // then
      const isPausedAllAfter = await livelyTokenProxy.isPausedAll();
      expect(isPausedAllAfter).to.be.false;
      expect(isPausedAllBefore).to.be.true;
    });

    it("Should set tax rate by anyone failed", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();
      const taxValue = BigNumber.from(300);

      // when
      await expect(livelyTokenProxy.connect(user1).updateTaxRate(taxValue)).to.revertedWith("Access Denied");

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
    });

    it("Should set tax rate by systemAdmin failed", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();
      const taxValue = BigNumber.from(300);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxRate(taxValue)).to.revertedWith("Access Denied");

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.toString());
    });

    it("Should set tax rate by admin success", async () => {
      // given
      const taxRateBefore = await livelyTokenProxy.taxRate();

      // when
      await expect(livelyTokenProxy.connect(admin).updateTaxRate(taxValue))
        .to.emit(livelyTokenProxy, "TaxRateUpdated")
        .withArgs(adminAddress, taxValue);

      // then
      const taxRateAfter = await livelyTokenProxy.taxRate();
      expect(taxRateAfter.toString()).to.be.equal(taxRateBefore.add(taxValue).toString());
    });

    it("Should admin transfer token to user1 along with tax success", async () => {
      // given
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(taxTreasuryAddress);
      const amount = BigNumber.from(100).mul(tokenDecimal);
      const taxAmount = BigNumber.from(3).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, user2Address, amount.sub(taxAmount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, taxTreasuryAddress, taxAmount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(taxTreasuryAddress);
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
      expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
    });

    it("Should user1 transferFrom token from assetManager along with tax success", async () => {
      // given
      const assetManagerUser1AllowanceBefore = await livelyTokenProxy.allowance(assetManagerAddress, user1Address);
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const taxTreasuryBalanceBefore = await livelyTokenProxy.balanceOf(taxTreasuryAddress);
      const amount = BigNumber.from(100).mul(tokenDecimal);
      const taxAmount = BigNumber.from(3).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transferFrom(assetManagerAddress, user2Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetManagerAddress, user2Address, amount.sub(taxAmount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(assetManagerAddress, taxTreasuryAddress, taxAmount)
        .to.emit(livelyTokenProxy, "TransferFrom")
        .withArgs(user1Address, assetManagerAddress, user2Address, amount)
        .to.emit(livelyTokenProxy, "Approval")
        .withArgs(assetManagerAddress, user1Address, assetManagerUser1AllowanceBefore.sub(amount));

      // then
      const assetManagerUser1AllowanceAfter = await livelyTokenProxy.allowance(assetManagerAddress, user1Address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const taxTreasuryBalanceAfter = await livelyTokenProxy.balanceOf(taxTreasuryAddress);
      expect(assetManagerUser1AllowanceAfter.toString()).to.be.equal(
        assetManagerUser1AllowanceBefore.sub(amount).toString()
      );
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(amount).toString());
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).sub(taxAmount).toString());
      expect(taxTreasuryBalanceAfter.toString()).to.be.equal(taxTreasuryBalanceBefore.add(taxAmount).toString());
    });

    it("Should set tax whitelist by anyone failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();

      // when
      await expect(livelyTokenProxy.connect(user1).updateTaxWhitelist(user2Address, false)).to.revertedWith(
        "Access Denied"
      );

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set tax whitelist by systemAdmin failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).updateTaxWhitelist(user2Address, false)).to.revertedWith(
        "Access Denied"
      );

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set tax whitelist by admin success", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();

      // when
      await expect(livelyTokenProxy.connect(admin).updateTaxWhitelist(user2Address, false))
        .to.emit(livelyTokenProxy, "TaxWhitelistUpdated")
        .withArgs(adminAddress, user2Address, false);

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql([...taxWhitelistBefore, user2Address]);
    });

    it("Should user2 transfer token with tax and tax whitelist success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const amount = BigNumber.from(100).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user2).transfer(user1Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user2Address, user1Address, amount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.sub(amount).toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.add(amount).toString());
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should set batch tax whitelist by anyone failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct = {
        account: user1Address,
        isDeleted: false,
      };

      // when
      await expect(livelyTokenProxy.connect(user1).batchUpdateTaxWhitelist([batchTaxWhitelistRequest])).to.revertedWith(
        "Access Denied"
      );

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set batch tax whitelist by systemAdmin failed", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct = {
        account: user1Address,
        isDeleted: false,
      };

      // when
      await expect(
        livelyTokenProxy.connect(systemAdmin).batchUpdateTaxWhitelist([batchTaxWhitelistRequest])
      ).to.revertedWith("Access Denied");

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql(taxWhitelistBefore);
    });

    it("Should set batch tax whitelist by admin success", async () => {
      // given
      const taxWhitelistBefore = await livelyTokenProxy.taxWhitelist();
      const batchTaxWhitelistRequest: IERC20Extra.BatchUpdateTaxWhitelistRequestStruct = {
        account: user1Address,
        isDeleted: false,
      };

      // when
      await expect(livelyTokenProxy.connect(admin).batchUpdateTaxWhitelist([batchTaxWhitelistRequest]))
        .to.emit(livelyTokenProxy, "TaxWhitelistUpdated")
        .withArgs(adminAddress, user1Address, false);

      // then
      const taxWhitelistAfter = await livelyTokenProxy.taxWhitelist();
      expect(taxWhitelistAfter).to.be.eql([...taxWhitelistBefore, user1Address]);
    });

    it("Should user1 transfer token with tax and tax whitelist success", async () => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceBefore = await livelyTokenProxy.balanceOf(user1Address);
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const amount = BigNumber.from(100).mul(tokenDecimal);

      // when
      await expect(livelyTokenProxy.connect(user1).transfer(user2Address, amount))
        .to.emit(livelyTokenProxy, "Transfer")
        .withArgs(user1Address, user2Address, amount);

      // then
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user1BalanceAfter = await livelyTokenProxy.balanceOf(user1Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
      expect(user1BalanceAfter.toString()).to.be.equal(user1BalanceBefore.sub(amount).toString());
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
    });

    it("Should deposit eth coin to lively token success", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceBefore = await provider.getBalance(user1Address);
      const transaction: TransactionRequest = {
        to: livelyTokenProxy.address,
        value: ethers.utils.parseEther("10"),
      };

      // when
      const response = await user1.sendTransaction(transaction);

      // then
      const receiptTx = await provider.getTransactionReceipt(response.hash);
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceAfter = await provider.getBalance(user1Address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(
        livelyContractBalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore
          .sub(BigNumber.from(10).mul(tokenDecimal))
          .sub(receiptTx.gasUsed.mul(receiptTx.effectiveGasPrice))
          .toString()
      );
    });

    it("Should withdraw eth coin by anyone failed", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);

      // when
      await expect(livelyTokenProxy.connect(user1).withdrawBalance(user1Address)).to.revertedWith(
        "Withdraw Balance Forbidden"
      );

      // then
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
    });

    it("Should withdraw eth coin by systemAdmin failed", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);

      // when
      await expect(livelyTokenProxy.connect(systemAdmin).withdrawBalance(user1Address)).to.revertedWith(
        "Withdraw Balance Forbidden"
      );

      // then
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(livelyContractBalanceBefore.toString());
    });

    it("Should withdraw eth coin by admin success", async () => {
      // given
      const livelyContractBalanceBefore = await provider.getBalance(livelyTokenProxy.address);
      const user1BalanceBefore = await provider.getBalance(user1Address);

      // when
      await livelyTokenProxy.connect(admin).withdrawBalance(user1Address);

      // then
      const user1BalanceAfter = await provider.getBalance(user1Address);
      const livelyContractBalanceAfter = await provider.getBalance(livelyTokenProxy.address);
      expect(livelyContractBalanceAfter.toString()).to.be.equal(
        livelyContractBalanceBefore.sub(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
      expect(user1BalanceAfter.toString()).to.be.equal(
        user1BalanceBefore.add(BigNumber.from(10).mul(tokenDecimal)).toString()
      );
    });

    it("Should lock token from anyone to user2 failed", async() => {
      // given
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from( ((Date.now() / 1000) | 0) + (24 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(admin).lockToken(lockRequest))
        .revertedWith("Access Denied")

      // then
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should lock token from asset manager to user2 with illegal timestamp failed", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from( ((Date.now() / 1000) | 0) + (20 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest))
        .revertedWith("Illegal Timestamp")

      // then
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should lock token from asset manager to user2 with illegal dest failed", async() => {
      // given
      const assetManagerLockBalanceBefore = await livelyTokenProxy.lockBalanceOf(assetManagerAddress);
      const assetManagerTotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(assetManagerAddress);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: assetManagerAddress,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (20 * 60 * 60))
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest))
        .revertedWith("Illegal Destination Address")

      // then
      const assetManagerLockBalanceAfter = await livelyTokenProxy.lockBalanceOf(assetManagerAddress);
      const assetManagerTotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(assetManagerAddress);

      expect(assetManagerLockBalanceAfter.toString()).to.be.equal(assetManagerLockBalanceBefore.toString());
      expect(assetManagerTotalBalanceAfter.toString()).to.be.equal(assetManagerTotalBalanceBefore.toString());
    })

    it("Should lock token from asset manager to user2 success", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const lockRequest: IERC20Lock.LockTokenRequestStruct = {
        source: assetManagerAddress,
        dest: user2Address,
        amount: dummyAmount,
        timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (25 * 60 * 60))
      }
      user2LockIds.push(ethers.utils.keccak256(ethers.utils.solidityPack(["address", "address", "uint256", "uint256"],
        [lockRequest.source, lockRequest.dest, lockRequest.timestamp, lockRequest.amount])));

      // when
      await expect(livelyTokenProxy.connect(assetManager).lockToken(lockRequest))
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user2LockIds[user2LockIds.length - 1], assetManagerAddress, assetManagerAddress,
          user2Address, lockRequest.timestamp, lockRequest.amount)

      // then
      const [amount, lockedAt, claimedAt, source, status] = await livelyTokenProxy.lockInfo(user2LockIds[user2LockIds.length - 1], user2Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(dummyAmount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(dummyAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(dummyAmount).toString());
      expect(amount.toString()).to.be.equal(lockRequest.amount.toString());
      expect(lockedAt.toString()).to.be.equal(block.timestamp.toString());
      expect(claimedAt.toString()).to.be.equal(lockRequest.timestamp.toString());
      expect(source).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>status).to.be.equal(LockState.LOCKED);
    })

    it("Should batch lock token from asset manager to user2 success", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user1Address);
      const lockRequests: IERC20Lock.LockTokenRequestStruct[] = [
        {
          source: assetManagerAddress,
          dest: user2Address,
          amount: dummyAmount.div(5),
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (48 * 60 * 60))
        },
        {
          source: assetManagerAddress,
          dest: user2Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (72 * 60 * 60))
        },
        {
          source: assetManagerAddress,
          dest: user2Address,
          amount: dummyAmount.mul(2),
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (96 * 60 * 60))
        },
        {
          source: assetManagerAddress,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (48 * 60 * 60))
        },
        {
          source: assetManagerAddress,
          dest: user1Address,
          amount: dummyAmount,
          timestamp: BigNumber.from(((Date.now() / 1000) | 0) + (72 * 60 * 60))
        },
      ]

      let totalAmount = BigNumber.from(0);
      let user2LockIdsSize = user2LockIds.length;
      let user2LockAmount = BigNumber.from(0);
      let user1LockAmount = BigNumber.from(0);
      for (let i = 0; i < lockRequests.length; i++) {
        if (lockRequests[i].dest === user2Address) {
          user2LockIds.push(ethers.utils.keccak256(ethers.utils.solidityPack(["address", "address", "uint256", "uint256"],
            [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].timestamp, lockRequests[i].amount])));
          user2LockAmount = user2LockAmount.add(<BigNumber>lockRequests[i].amount);
        } else {
          user1LockIds.push(ethers.utils.keccak256(ethers.utils.solidityPack(["address", "address", "uint256", "uint256"],
            [lockRequests[i].source, lockRequests[i].dest, lockRequests[i].timestamp, lockRequests[i].amount])))
          user1LockAmount = user1LockAmount.add(<BigNumber>lockRequests[i].amount);
        }
        totalAmount = totalAmount.add(<BigNumber>lockRequests[i].amount);
      }

      // when
      await expect(livelyTokenProxy.connect(assetManager).batchLockToken(lockRequests))
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user2LockIds[user2LockIdsSize], assetManagerAddress, assetManagerAddress,
          user2Address, lockRequests[0].timestamp, lockRequests[0].amount)
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user2LockIds[user2LockIdsSize+1], assetManagerAddress, assetManagerAddress,
          user2Address, lockRequests[1].timestamp, lockRequests[1].amount)
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user2LockIds[user2LockIdsSize+2], assetManagerAddress, assetManagerAddress,
          user2Address, lockRequests[2].timestamp, lockRequests[2].amount)
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user1LockIds[0], assetManagerAddress, assetManagerAddress,
          user1Address, lockRequests[3].timestamp, lockRequests[3].amount)
        .to.emit(livelyTokenProxy,"TokenLocked")
        .withArgs(user1LockIds[1], assetManagerAddress, assetManagerAddress,
          user1Address, lockRequests[4].timestamp, lockRequests[4].amount)
        .to.emit(livelyTokenProxy,"BatchTokenLocked")
        .withArgs(assetManagerAddress, totalAmount)

      // then
      const user2Lock1 = {...await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize], user2Address)};
      const user2Lock2 = {...await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize+1], user2Address)};
      const user2Lock3 = {...await livelyTokenProxy.lockInfo(user2LockIds[user2LockIdsSize+2], user2Address)};
      const user1Lock1 = {...await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address)};
      const user1Lock2 = {...await livelyTokenProxy.lockInfo(user1LockIds[1], user1Address)};
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);
      const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user1Address);
      const latestBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(latestBlockNumber);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.sub(totalAmount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.add(user2LockAmount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.add(user2LockAmount).toString());
      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.add(user1LockAmount).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.add(user1LockAmount).toString());

      // and
      expect(user2Lock1[0].toString()).to.be.equal(lockRequests[0].amount.toString());
      expect(user2Lock1[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock1[2].toString()).to.be.equal(lockRequests[0].timestamp.toString());
      expect(user2Lock1[3]).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>user2Lock1[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user2Lock2[0].toString()).to.be.equal(lockRequests[1].amount.toString());
      expect(user2Lock2[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock2[2].toString()).to.be.equal(lockRequests[1].timestamp.toString());
      expect(user2Lock2[3]).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>user2Lock2[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user2Lock3[0].toString()).to.be.equal(lockRequests[2].amount.toString());
      expect(user2Lock3[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user2Lock3[2].toString()).to.be.equal(lockRequests[2].timestamp.toString());
      expect(user2Lock3[3]).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>user2Lock3[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user1Lock1[0].toString()).to.be.equal(lockRequests[3].amount.toString());
      expect(user1Lock1[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user1Lock1[2].toString()).to.be.equal(lockRequests[3].timestamp.toString());
      expect(user1Lock1[3]).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>user1Lock1[4]).to.be.equal(LockState.LOCKED);

      // and
      expect(user1Lock2[0].toString()).to.be.equal(lockRequests[4].amount.toString());
      expect(user1Lock2[1].toString()).to.be.equal(block.timestamp.toString());
      expect(user1Lock2[2].toString()).to.be.equal(lockRequests[4].timestamp.toString());
      expect(user1Lock2[3]).to.be.hexEqual(assetManagerAddress);
      expect(<LockState>user1Lock2[4]).to.be.equal(LockState.LOCKED);
    })

    it("Should claim token from user2 by admin failed", async() => {
      // given
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(admin).claimToken(user2LockIds[0]))
        .revertedWith("Lock Not Found");

      // then
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should claim token from user2 with invalid timestamp failed", async() => {
      // given
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);

      // when
      await expect(livelyTokenProxy.connect(user2).claimToken(user2LockIds[0]))
        .revertedWith("Illegal Claim Lock");

      // then
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should claim token from user2 success", async() => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      await provider.send("evm_increaseTime", [200 * 60 * 60]);
      const [amount] = await livelyTokenProxy.lockInfo(user2LockIds[0], user2Address);

      // when
      await expect(livelyTokenProxy.connect(user2).claimToken(user2LockIds[0]))
        .to.emit(livelyTokenProxy, "TokenClaimed")
        .withArgs(user2LockIds[0], user2Address, assetManagerAddress, amount)

      // then
      const [,,,,status] = await livelyTokenProxy.lockInfo(user2LockIds[0], user2Address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
      expect(<LockState>status).to.be.equal(LockState.CLAIMED);
    })

    it("Should batch claim token from user2 success", async() => {
      // given
      const user2BalanceBefore = await livelyTokenProxy.balanceOf(user2Address);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const ids = [user2LockIds[1], user2LockIds[2]];
      const [amount1] = await livelyTokenProxy.lockInfo(user2LockIds[1], user2Address);
      const [amount2] = await livelyTokenProxy.lockInfo(user2LockIds[2], user2Address);
      // await provider.send("evm_increaseTime", [200 * 60 * 60]);

      // when
      await expect(livelyTokenProxy.connect(user2).batchClaimToken(ids))
        .to.emit(livelyTokenProxy, "TokenClaimed")
        .withArgs(user2LockIds[1], user2Address, assetManagerAddress, amount1)
        .to.emit(livelyTokenProxy, "TokenClaimed")
        .withArgs(user2LockIds[2], user2Address, assetManagerAddress, amount2)

      // then
      const [,,,,status1] = await livelyTokenProxy.lockInfo(user2LockIds[1], user2Address);
      const [,,,,status2] = await livelyTokenProxy.lockInfo(user2LockIds[2], user2Address);
      const user2BalanceAfter = await livelyTokenProxy.balanceOf(user2Address);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(user2BalanceAfter.toString()).to.be.equal(user2BalanceBefore.add(amount1).add(amount2).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount1).sub(amount2).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
      expect(<LockState>status1).to.be.equal(LockState.CLAIMED);
      expect(<LockState>status2).to.be.equal(LockState.CLAIMED);
    })

    it("Should unlock token by anyone from user2 failed", async() => {
      // given
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: user2LockIds[3],
        account: user2Address,
        reason: "Rollback"
      }

      // when
      await expect(livelyTokenProxy.connect(admin).unlockToken(unlockRequest))
        .revertedWith("Access Denied")

      // then
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should unlock token by dao executor after claimed from user2 failed", async() => {
      // given
      const adminBalanceBefore = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: user2LockIds[2],
        account: user2Address,
        reason: "Rollback"
      }
      const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);

      // when
      await expect(admin.sendTransaction({ to: daoExecutorForwarder.address, data: data}))
        .to.revertedWith("Invalid Lock State");

      // then
      const adminBalanceAfter = await livelyTokenProxy.balanceOf(adminAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(adminBalanceAfter.toString()).to.be.equal(adminBalanceBefore.toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.toString());
    })

    it("Should unlock token by dao executor from user2 success", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user2Address);
      const unlockRequest: IERC20Lock.UnLockTokenRequestStruct = {
        lockId: user2LockIds[3],
        account: user2Address,
        reason: "Rollback"
      }

      const data = livelyTokenProxy.interface.encodeFunctionData("unlockToken", [unlockRequest]);
      const [amount,,,source,] = await livelyTokenProxy.lockInfo(user2LockIds[3], user2Address);

      // when
      const transactionResponse = await admin.sendTransaction({ to: daoExecutorForwarder.address, data: data});
      const txReceipt = await transactionResponse.wait(0);

      // then
      const logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[0]);
      const eventUnlock: TokenUnlockedEventObject = <TokenUnlockedEventObject> (<unknown>logDesc.args)
      const [,,,,status] = await livelyTokenProxy.lockInfo(user2LockIds[3], user2Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user2LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user2Address);
      const user2TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user2Address);

      expect(eventUnlock.id).to.be.equal(user2LockIds[3]);
      expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      expect(eventUnlock.account).to.be.equal(user2Address);
      expect(eventUnlock.dest).to.be.equal(source);
      expect(eventUnlock.amount).to.be.equal(amount);
      expect(eventUnlock.reason).to.be.equal(unlockRequest.reason);

      // and
      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.add(amount).toString());
      expect(user2LockBalanceAfter.toString()).to.be.equal(user2LockBalanceBefore.sub(amount).toString());
      expect(user2TotalBalanceAfter.toString()).to.be.equal(user2TotalBalanceBefore.sub(amount).toString());
      expect(<LockState>status).to.be.equal(LockState.UNLOCKED);
    })

    it("Should batch unlock token by dao executor from user1 success", async() => {
      // given
      const assetManagerBalanceBefore = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user1LockBalanceBefore = await livelyTokenProxy.lockBalanceOf(user1Address);
      const user1TotalBalanceBefore = await livelyTokenProxy.totalBalanceOf(user1Address);
      const unlockRequests: IERC20Lock.UnLockTokenRequestStruct[] = [
        {
          lockId: user1LockIds[0],
          account: user1Address,
          reason: "Rollback1"
        },
        {
          lockId: user1LockIds[1],
          account: user1Address,
          reason: "Rollback2"
        },
      ]

      const data = livelyTokenProxy.interface.encodeFunctionData("batchUnlockToken", [unlockRequests]);
      const [amount1,,,source1,] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
      const [amount2,,,source2,] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);

      // when
      const transactionResponse = await admin.sendTransaction({ to: daoExecutorForwarder.address, data: data});
      const txReceipt = await transactionResponse.wait(0);

      // then
      let logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[0]);
      let eventUnlock: TokenUnlockedEventObject = <TokenUnlockedEventObject> (<unknown>logDesc.args)

      expect(eventUnlock.id).to.be.equal(user1LockIds[0]);
      expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      expect(eventUnlock.account).to.be.equal(user1Address);
      expect(eventUnlock.dest).to.be.equal(source1);
      expect(eventUnlock.amount).to.be.equal(amount1);
      expect(eventUnlock.reason).to.be.equal(unlockRequests[0].reason);

      // and
      logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[1]);
      eventUnlock = <TokenUnlockedEventObject> (<unknown>logDesc.args)

      expect(eventUnlock.id).to.be.equal(user1LockIds[1]);
      expect(eventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      expect(eventUnlock.account).to.be.equal(user1Address);
      expect(eventUnlock.dest).to.be.equal(source2);
      expect(eventUnlock.amount).to.be.equal(amount2);
      expect(eventUnlock.reason).to.be.equal(unlockRequests[1].reason);

      // and
      logDesc = livelyTokenProxy.interface.parseLog(txReceipt.logs[2]);
      let batchEventUnlock: BatchTokenUnlockedEventObject = <BatchTokenUnlockedEventObject> (<unknown>logDesc.args)

      expect(batchEventUnlock.sender).to.be.equal(daoExecutorForwarder.address);
      expect(batchEventUnlock.totalAmount).to.be.equal(amount1.add(amount2));

      // and
      const [,,,,status1] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
      const [,,,,status2] = await livelyTokenProxy.lockInfo(user1LockIds[0], user1Address);
      const assetManagerBalanceAfter = await livelyTokenProxy.balanceOf(assetManagerAddress);
      const user1LockBalanceAfter = await livelyTokenProxy.lockBalanceOf(user1Address);
      const user1TotalBalanceAfter = await livelyTokenProxy.totalBalanceOf(user1Address);

      expect(assetManagerBalanceAfter.toString()).to.be.equal(assetManagerBalanceBefore.add(amount1).add(amount2).toString());
      expect(user1LockBalanceAfter.toString()).to.be.equal(user1LockBalanceBefore.sub(amount1).sub(amount2).toString());
      expect(user1TotalBalanceAfter.toString()).to.be.equal(user1TotalBalanceBefore.sub(amount1).sub(amount2).toString());
      expect(<LockState>status1).to.be.equal(LockState.UNLOCKED);
      expect(<LockState>status2).to.be.equal(LockState.UNLOCKED);
    })

    it("Should support with correct interface success", async() => {
      // given
      const erc20InterfaceId = "0x942e8b22";
      const erc20ExtraInterfaceId = "0xe3a31a9d";
      const erc20PauseInterfaceId = "0xd711aa2a";
      const erc20LockInterfaceId = "0xf6e40e00";

      // when and then
      expect(await livelyTokenProxy.supportsInterface(erc20InterfaceId)).to.be.true
      expect(await livelyTokenProxy.supportsInterface(erc20ExtraInterfaceId)).to.be.true
      expect(await livelyTokenProxy.supportsInterface(erc20PauseInterfaceId)).to.be.true
      expect(await livelyTokenProxy.supportsInterface(erc20LockInterfaceId)).to.be.true
    })
  });
});
