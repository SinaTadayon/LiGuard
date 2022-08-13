import { Address } from "hardhat-deploy/dist/types";
import { BigNumber, Wallet } from "ethers";
import { ethers, waffle } from "hardhat";

export const DOMAIN_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
);
export const MESSAGE_TYPE_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Context(address contract,string name,string version,string realm)")
);

export const PERMIT_TYPE_HASH: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
);

// export const MESSAGE_TYPE_HASH: string = ethers.utils.keccak256(
//   ethers.utils.toUtf8Bytes("Context(address contract,bytes32 name,bytes32 version,bytes32 realm)")
// );


const { provider } = waffle;

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
        { name: "contract", type: "address" },
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
      contract: contractAddress,
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
      owner: owner,
      spender: spender,
      value: value.toString(),
      nonce: nonce.toString(),
      deadline: deadline.toString()
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
      MESSAGE_TYPE_HASH,
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
