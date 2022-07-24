import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "solidity-coverage";

dotenv.config();

const mnemonic = process.env.MNEMONIC;
const privateKey = process.env.PRIVATE_KEY;

const netAccounts = mnemonic ? { mnemonic } : privateKey ? [{ privateKey: `0x${privateKey}`, balance: "" }] : undefined;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // networks: {
  //   ropsten: {
  //     url: process.env.ROPSTEN_URL || "",
  //     accounts:
  //       process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
  //   },
  // },
  networks: {
    hardhat: mnemonic ? { accounts: { mnemonic } } : {},
    localhost: {
      url: "http://localhost:8545",
      accounts: netAccounts,
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: netAccounts,
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: netAccounts,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  },

  abiExporter: {
    path: "./export/abi",
    runOnCompile: false,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },

  typechain: {
    outDir: "./export/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },

  paths: {
    cache: "build/cache",
    sources: "src/contracts",
    tests: "src/test",
    artifacts: "build/artifacts",
    deploy: "src/deploy",
    deployments: "deployments",
    root: ".",
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
