import * as hre from "hardhat";
import { IMemberManagement, MemberManager__factory } from "../../typechain/types";
import { ActivityStatus, AlterabilityStatus } from "../utils/Utils";
import {
  EMPTY_MEMBER_SIGNATURE,
  MAINNET_TX_WAIT_BLOCK_COUNT,
  TESTNET_TX_WAIT_BLOCK_COUNT
} from "../deploy/001_LivelyGuard";

const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME =
  "ROLE.LIVELY_VERSE.TOKENS.LIVELY_TOKEN_ERC20.PUBLIC_SALE_ASSET_ADMIN";
const ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID = hre.ethers.utils.keccak256(
  hre.ethers.utils.toUtf8Bytes(ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_NAME)
);

async function main() {
  const { ethers, getChainId } = hre;
  const { systemAdmin, livelyAdmin, assetAdmin } = await ethers.getNamedSigners();
  const chainId = await getChainId();
  let accountAddress = "0x19532fE7cd351DC1bba1304d2429E80C267b615F";
  let aclManagerProxyAddress = "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F";
  console.log(`livelyAdmin address: ${livelyAdmin.address}`);
  console.log(`systemAdmin address: ${systemAdmin.address}`);
  console.log(`assetAdmin address: ${assetAdmin.address}`);
  console.log(`network name: ${hre.network.name}`);
  console.log(`network chainId: ${chainId}`);


  const memberManagerDelegateProxy = MemberManager__factory.connect(aclManagerProxyAddress, assetAdmin);

  // Register ACL AssetAdmin Member
  const requests: IMemberManagement.MemberRegisterRequestStruct[] = [
    {
      adminId: ethers.constants.HashZero,
      roleId: ACL_ROLE_LIVELY_PUBLIC_SALE_ASSET_ADMIN_ID,
      account: accountAddress,
      limits: {
        memberLimit: 0,
        memberRegisterLimit: 0,
        contextRegisterLimit: 0,
        functionRegisterLimit: 0,
        profileRegisterLimit: 0,
        contextLimit: 0,
        realmLimit: 0,
        domainLimit: 0,
        callLimit: 65535,
        typeRoleLimit: 0,
        typeLimit: 3,
        roleRegisterLimit: 0,
        typeRegisterLimit: 0,
        realmRegisterLimit: 0,
        domainRegisterLimit: 0,
        policyRegisterLimit: 0,
        policyRoleLimit: 0,
        functionLimit: 0,
      },
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE,
    },
  ];
  console.log(`[ Register New Member ${accountAddress} ]`);
  let tx = await memberManagerDelegateProxy.connect(assetAdmin).memberRegister(EMPTY_MEMBER_SIGNATURE, requests);
  let txReceipt;
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(
    `txBlock: ${txReceipt.blockNumber}, gasUsed: ${txReceipt.gasUsed}, gasPrice:${txReceipt.effectiveGasPrice}, status: ${txReceipt.status}`
  );
  console.log();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
