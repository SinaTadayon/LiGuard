import { Address } from "hardhat-deploy/dist/types";
/* eslint-disable  node/no-unpublished-import */
import { BigNumber, Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
const { provider } = waffle;

export const DOMAIN_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
);
export const MESSAGE_CONTEXT_TYPE_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Context(address contractId,string name,string version,string realm)")
);
export const MESSAGE_PREDICT_CONTEXT_TYPE_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("PredictContext(address deployer,address subject,string realm)")
);
export const PERMIT_TYPE_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
);

// export const LIVELY_GENERAL_REALM = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_GENERAL_REALM"])
// );
// export const LIVELY_ASSET_REALM = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["LIVELY_ASSET_REALM"]));
// export const LIVELY_GENERAL_GROUP = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_GENERAL_GROUP"])
// );
// export const LIVELY_DAO_GROUP = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["LIVELY_DAO_GROUP"]));
// export const LIVELY_ASSET_GROUP = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["LIVELY_ASSET_GROUP"]));
// export const LIVELY_ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["LIVELY_ADMIN_ROLE"]));
// export const LIVELY_SYSTEM_ADMIN_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_SYSTEM_ADMIN_ROLE"])
// );
// export const LIVELY_ASSET_MANAGER_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_ASSET_MANAGER_ROLE"])
// );
// export const LIVELY_ASSET_ADMIN_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_ASSET_ADMIN_ROLE"])
// );
// export const LIVELY_COMMUNITY_DAO_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_COMMUNITY_DAO_ROLE"])
// );
// export const LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE"])
// );
// export const LIVELY_ANONYMOUS_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_ANONYMOUS_ROLE"])
// );
//
// export const LIVELY_CROWD_FOUNDING_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_CROWD_FOUNDING_ASSET_ROLE"])
// );
// export const LIVELY_VALIDATORS_REWARDS_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_VALIDATORS_REWARDS_ASSET_ROLE"])
// );
// export const LIVELY_PUBLIC_SALE_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_PUBLIC_SALE_ASSET_ROLE"])
// );
// export const LIVELY_TREASURY_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_TREASURY_ASSET_ROLE"])
// );
// export const LIVELY_FOUNDING_TEAM_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_FOUNDING_TEAM_ASSET_ROLE"])
// );
// export const LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE = ethers.utils.keccak256(
//   ethers.utils.solidityPack(["string"], ["LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE"])
// );

export enum ProxySafeModeStatus {
  NONE,
  DISABLED,
  ENABLED
}

export enum ProxyUpgradabilityStatus {
  NONE,
  DISABLED,
  ENABLED
}

export enum AgentType {
  NONE,
  MEMBER,
  ROLE,
  TYPE
}

export enum ActivityStatus {
  NONE,
  DELETED,
  DISABLED,
  SAFE_MODE,
  ENABLED
}

export enum AlterabilityStatus {
  NONE,
  DISABLED,
  UPDATABLE,
  UPGRADABLE
}

export enum ScopeType {
  NONE,
  FUNCTION,
  CONTEXT,
  REALM,
  DOMAIN,
  GLOBAL
}

export enum ActionType {
  ADD,
  UPDATE,
  REMOVE
}

export enum PolicyType {
  UNLOCK,         // 0
  SLOCK,          // soft lock, 1 - 63
  MLOCK,          // medium lock, 64 - 127
  RLOCK,          // restrict lock, 128 - 191
  HLOCK,          // hard lock, 192 - 254
  LOCK            // 255
}

// export enum LockState {
//   NONE,
//   LOCKED,
//   CLAIMED,
//   UNLOCKED,
// }

export async function generateContextDomainSignatureByHardhat(
  contractAddress: Address,
  contractName: string,
  contractVersion: string,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Address,
  chainId: number
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
        { name: "contractId", type: "address" },
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "realm", type: "string" },
      ],
    },
    primaryType: "Context",
    domain: {
      name: "AccessControlManager",
      version: "1.0.0",
      chainId,
      verifyingContract,
    },
    message: {
      contractId: contractAddress,
      name: contractName,
      version: contractVersion,
      realm: contractRealm,
    },
  });

  return await provider.send("eth_signTypedData_v4", [signerAddress, messageParams]);
}

export async function generatePermitDomainSignatureByHardhat(
  owner: Address,
  spender: Address,
  value: BigNumber,
  nonce: BigNumber,
  deadline: BigNumber,
  verifyingContract: Address,
  signerAddress: Address,
  chainId: number
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
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Permit",
    domain: {
      name: "LivelyToken",
      version: "1.0.0",
      chainId,
      verifyingContract,
    },
    message: {
      owner,
      spender,
      value: value.toString(),
      nonce: nonce.toString(),
      deadline: deadline.toString(),
    },
  });

  return await provider.send("eth_signTypedData_v4", [signerAddress, messageParams]);
}

export async function generateContextDomainSignatureManually(
  contractAddress: Address,
  contractName: string,
  contractVersion: string,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Wallet,
  chainId: BigNumber
): Promise<string> {
  const abiCoder = ethers.utils.defaultAbiCoder;

  const domainAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "uint256", "address"],
    [
      DOMAIN_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["AccessControlManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["1.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);

  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "address", "bytes32", "bytes32", "bytes32"],
    [
      MESSAGE_CONTEXT_TYPE_HASH,
      contractAddress,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractName])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractVersion])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractRealm])),
    ]
  );
  const msgEncode = ethers.utils.keccak256(messageAbiEncode);
  const domainMessageHash = ethers.utils.keccak256(
    ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainEncode, msgEncode])
  );
  const signature = signerAddress._signingKey().signDigest(domainMessageHash);

  // console.log(`\ndomainEncode: ${domainEncode}\nmessageEnode: ${msgEncode}\ndomainMessageHash: ${domainMessageHash}\n`);
  // console.log(`signature: r: ${signature.r}, s: ${signature.s}, v: ${signature.v}, compact: ${signature.compact}\n`);
  // // Recover the address from signature
  // const recoveredAddress = ethers.utils.verifyMessage(domainMessageHash, signature);
  // console.log(`recoveredAddress: ${recoveredAddress}`);
  return signature.compact;
}

export async function generatePredictContextDomainSignatureManually(
  contractAddress: Address,
  contractRealm: string,
  verifyingContract: Address,
  signerAddress: Wallet,
  chainId: BigNumber,
  subjectAddress: Address
): Promise<string> {
  const abiCoder = ethers.utils.defaultAbiCoder;

  const domainAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "uint256", "address"],
    [
      DOMAIN_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["AccessControlManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["1.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);

  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "address", "address", "bytes32"],
    [
      MESSAGE_PREDICT_CONTEXT_TYPE_HASH,
      contractAddress,
      subjectAddress,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractRealm])),
    ]
  );
  const msgEncode = ethers.utils.keccak256(messageAbiEncode);
  const domainMessageHash = ethers.utils.keccak256(
    ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainEncode, msgEncode])
  );
  const signature = signerAddress._signingKey().signDigest(domainMessageHash);
  return signature.compact;
}

export function generateDomainSeparator(
  contractName: string,
  contractVersion: string,
  verifyingContract: Address,
  chainId: BigNumber
): string {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const domainAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "uint256", "address"],
    [
      DOMAIN_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractName])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [contractVersion])),
      chainId,
      verifyingContract,
    ]
  );
  return ethers.utils.keccak256(domainAbiEncode);
}

export async function readStorageSlotStruct(
  contract: Address,
  structSlot: number,
  memberIndex: number
): Promise<string> {
  return await provider.getStorageAt(contract, structSlot + memberIndex);
}

export async function readStorageSlotFixedArray(contract: Address, arraySlot: number, index: number): Promise<string> {
  return await provider.getStorageAt(contract, arraySlot + index);
}

export async function readStorageSlot(contract: Address, slot: number): Promise<string> {
  return await provider.getStorageAt(contract, slot);
}

export async function readStorageSlotHashMap(contract: Address, key: string, slot: number): Promise<string> {
  const paddedAddress = ethers.utils.hexZeroPad(key, 32);
  const paddedSlot = ethers.utils.hexZeroPad([slot], 32);
  const concatenated = ethers.utils.concat([paddedAddress, paddedSlot]);
  const hash = ethers.utils.keccak256(concatenated);
  return await provider.getStorageAt(contract, hash);
}
