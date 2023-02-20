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

export const MESSAGE_PROFILE_CONTEXT_TYPE_HASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("ProfileContext(string profile,address contractId,string name,string version,string realm)"));

export const MESSAGE_PROFILE_PREDICT_CONTEXT_TYPE_HASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("ProfilePredictContext(string profile,address deployer,address subject,string realm)"));

// export const MESSAGE_PROFILE_REGISTER_TYPE_HASH = ethers.utils.keccak256(
//   ethers.utils.toUtf8Bytes("ProfileRegister(string name,address owner,uint256 expiredAt)"));

export const PERMIT_TYPE_HASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
);

export const MEMBER_SIGNATURE_MESSAGE_TYPE_HASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("MemberSignature(address account,uint256 expiredAt)"));

export const PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPE_HASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("ProfileMemberSignature(string profile,address account,uint256 expiredAt)"));

// General Profile Type
export const LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_PROFILE.LIVELY_MASTER"));
export const LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER"));
export const LIVELY_PROFILE_ANY_TYPE_ID             = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_PROFILE.LIVELY_ANY"));
export const LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UNIVERSE.LIVELY_PROFILE"));

// General Profile Roles
export const LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_PROFILE.LIVELY_MASTER_ADMIN"));
export const LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_PROFILE.LIVELY_SYSTEM_MASTER_ADMIN"));


// General Types ID
export const LIVELY_VERSE_LIVELY_MASTER_TYPE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_MASTER"));
export const LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER"));
export const LIVELY_VERSE_ANONYMOUS_TYPE_ID      = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_ANONYMOUS"));
export const LIVELY_VERSE_ANY_TYPE_ID            = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_ANY"));
export const LIVELY_VERSE_SCOPE_MASTER_TYPE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_SCOPE_MASTER"));
export const LIVELY_VERSE_MEMBER_MASTER_TYPE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_MEMBER_MASTER"));
export const LIVELY_VERSE_TYPE_MASTER_TYPE_ID    = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_TYPE_MASTER"));
export const LIVELY_VERSE_POLICY_MASTER_TYPE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_POLICY_MASTER"));
export const LIVELY_VERSE_PROFILE_MASTER_TYPE_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_PROFILE_MASTER"));

// General Roles ID
export const LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_MASTER_ADMIN"));
export const LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_SYSTEM_MASTER_ADMIN"));
export const LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID   = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_SCOPE_MASTER_ADMIN"));
export const LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID    = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_TYPE_MASTER_ADMIN"));
export const LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_MEMBER_MASTER_ADMIN"));
export const LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_POLICY_MASTER_ADMIN"));
export const LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_PROFILE_MASTER_ADMIN"));

// Global Scope ID
export const LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UNIVERSE.LIVELY_VERSE"));

// ACL IDs
export const LIVELY_VERSE_ACL_DOMAIN_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("DOMAIN.LIVELY_VERSE.LIVELY_GUARD"));
export const LIVELY_VERSE_ACL_REALM_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("REALM.LIVELY_VERSE.LIVELY_GUARD.ACL"));
export const LIVELY_VERSE_ACL_TYPE_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TYPE.LIVELY_VERSE.LIVELY_GUARD.MASTER"));
export const LIVELY_VERSE_ACL_ADMIN_ROLE_ID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ROLE.LIVELY_VERSE.LIVELY_GUARD.MASTER_ADMIN"));

export enum ProxySafeModeStatus {
  DISABLED,
  ENABLED
}

export enum ProxyUpdatabilityStatus {
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
  UNIVERSE
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

export enum LockState {
  NONE,
  LOCKED,
  CLAIMED,
  UNLOCKED,
}

export enum AssetType {
  NONE,
  ERC20,
  ERC721,
  ERC1155,
}

// export enum TokenSafeModeStatus {
//   DISABLED,
//   ENABLED
// }

export enum AssetSafeModeStatus {
  NONE,
  DISABLED,
  ENABLED
}

export enum AuthorizationStatus {
  PERMITTED,
  UNAUTHORIZED,
  POLICY_FORBIDDEN,
  CALL_FORBIDDEN,
  MEMBER_NOT_FOUND,
  ROLE_NOT_FOUND,
  TYPE_NOT_FOUND,
  FUNCTION_NOT_FOUND,
  CONTEXT_NOT_FOUND,
  REALM_NOT_FOUND,
  DOMAIN_NOT_FOUND,
  MEMBER_ACTIVITY_FORBIDDEN,
  ROLE_ACTIVITY_FORBIDDEN,
  TYPE_ACTIVITY_FORBIDDEN,
  FUNCTION_ACTIVITY_FORBIDDEN,
  CONTEXT_ACTIVITY_FORBIDDEN,
  REALM_ACTIVITY_FORBIDDEN,
  DOMAIN_ACTIVITY_FORBIDDEN,
  UNIVERSE_ACTIVITY_FORBIDDEN
}

export enum AdminAccessStatus {
  PERMITTED,
  NOT_PERMITTED,
  POLICY_FORBIDDEN,
  ROLE_NOT_FOUND,
  TYPE_NOT_FOUND,
  FUNCTION_NOT_FOUND,
  ROLE_ACTIVITY_FORBIDDEN,
  TYPE_ACTIVITY_FORBIDDEN
}

export enum ProfileAuthorizationStatus {
  PERMITTED,
  UNAUTHORIZED,
  POLICY_FORBIDDEN,
  PROFILE_CALL_FORBIDDEN,
  MEMBER_CALL_FORBIDDEN,
  MEMBER_NOT_FOUND,
  ROLE_NOT_FOUND,
  TYPE_NOT_FOUND,
  FUNCTION_NOT_FOUND,
  CONTEXT_NOT_FOUND,
  REALM_NOT_FOUND,
  DOMAIN_NOT_FOUND,
  MEMBER_ACTIVITY_FORBIDDEN,
  ROLE_ACTIVITY_FORBIDDEN,
  TYPE_ACTIVITY_FORBIDDEN,
  FUNCTION_ACTIVITY_FORBIDDEN,
  CONTEXT_ACTIVITY_FORBIDDEN,
  REALM_ACTIVITY_FORBIDDEN,
  DOMAIN_ACTIVITY_FORBIDDEN,
  UNIVERSE_ACTIVITY_FORBIDDEN,
  PROFILE_ACTIVITY_FORBIDDEN
}

export enum ProfileAdminAccessStatus {
  PERMITTED,
  NOT_PERMITTED,
  POLICY_FORBIDDEN,
  ROLE_NOT_FOUND,
  TYPE_NOT_FOUND,
  FUNCTION_NOT_FOUND,
  ROLE_ACTIVITY_FORBIDDEN,
  TYPE_ACTIVITY_FORBIDDEN
}

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
      name: "ACLManager",
      version: "3.0.0",
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
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
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
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
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


export async function generateProfileContextDomainSignatureManually(
  profileName: string,
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
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);

  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "address", "bytes32", "bytes32", "bytes32"],
    [
      MESSAGE_PROFILE_CONTEXT_TYPE_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [profileName])),
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

export async function generateProfilePredictContextDomainSignatureManually(
  profileName: string,
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
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);

  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "address", "address", "bytes32"],
    [
      MESSAGE_PROFILE_PREDICT_CONTEXT_TYPE_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [profileName])),
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

export async function generateMemberSignatureManually(
  memberAddress: Address,
  verifyingContract: Address,
  signerAddress: Wallet,
  chainId: BigNumber,
  expiredAt: BigNumber,
): Promise<string> {
  const abiCoder = ethers.utils.defaultAbiCoder;

  const domainAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "uint256", "address"],
    [
      DOMAIN_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);
  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "address", "uint256"],
    [
      MEMBER_SIGNATURE_MESSAGE_TYPE_HASH,
      memberAddress,
      expiredAt,
    ]
  );
  const msgEncode = ethers.utils.keccak256(messageAbiEncode);
  const domainMessageHash = ethers.utils.keccak256(
    ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainEncode, msgEncode])
  );
  const signature = signerAddress._signingKey().signDigest(domainMessageHash);
  return signature.compact;
}

export async function generateProfileMemberSignatureManually(
  profileName: string,
  memberAddress: Address,
  verifyingContract: Address,
  signerAddress: Wallet,
  chainId: BigNumber,
  expiredAt: BigNumber,
): Promise<string> {
  const abiCoder = ethers.utils.defaultAbiCoder;

  const domainAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "uint256", "address"],
    [
      DOMAIN_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["ACLManager"])),
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["3.0.0"])),
      chainId,
      verifyingContract,
    ]
  );
  const domainEncode = ethers.utils.keccak256(domainAbiEncode);
  const messageAbiEncode = abiCoder.encode(
    ["bytes32", "bytes32", "address", "uint256"],
    [
      PROFILE_MEMBER_SIGNATURE_MESSAGE_TYPE_HASH,
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [profileName])),
      memberAddress,
      expiredAt,
    ]
  );
  const msgEncode = ethers.utils.keccak256(messageAbiEncode);
  const domainMessageHash = ethers.utils.keccak256(
    ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainEncode, msgEncode])
  );
  const signature = signerAddress._signingKey().signDigest(domainMessageHash);
  return signature.compact;
}


export async function generateProfilePredictContextDomainByHardHat(
  profileName: string,
  ownerAddress: Address,
  verifyingContract: Address,
  signerAddress: Address,
  chainId: string,
  expiredAt: string
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
      ProfileRegister: [
        { name: "name", type: "string" },
        { name: "owner", type: "address" },
        { name: "expiredAt", type: "uint256" },
      ],
    },
    primaryType: "ProfileRegister",
    domain: {
      name: "ACLManager",
      version: "3.0.0",
      chainId,
      verifyingContract,
    },
    message: {
      name: profileName,
      owner: ownerAddress,
      expiredAt: expiredAt,
    },
  });

  return await provider.send("eth_signTypedData_v4", [signerAddress, messageParams]);
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
