// hardat.config.ts is the configuration file for the Hardhat Environment. 
import 'dotenv/config';
import { task } from 'hardhat/config';
import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'hardhat-spdx-license-identifier';
import 'tsconfig-paths/register';
import 'hardhat-abi-exporter';
import 'hardhat-tracer';
import 'solidity-coverage';

import { node_url, accounts } from './utils/network';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});




// While waiting for hardhat PR: https://github.com/nomiclabs/hardhat/pull/1542
if (process.env.HARDHAT_FORK) {
  process.env['HARDHAT_DEPLOY_FORK'] = process.env.HARDHAT_FORK;
}

if (process.env.DEPLOYER) {
  console.log('\x1b[34m','DEPLOYER flag is set to true, using private keys from .env...','\x1b[0m');
}


// SET 'process.env.DEPLOYER = TRUE' TO USE PRIVATE KEY ACCOUNTS STORED IN .env
// DEFAULTS TO USE DUMMY MNEMONIC ACCOUNTS FOR EASE AND TESTING
const config: HardhatUserConfig = {
  // Solc config
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },

  // Hardhat-deploy account config
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },

  // Network config
  networks: {
    hardhat: {
      loggingEnabled: true,
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      // process.env.HARDHAT_FORK specifies the network that the fork is made from.
      // ensures usage of corresponding accounts
      accounts: accounts(process.env.HARDHAT_FORK),
      
      // temp setup, easier for now
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        // DISABLE IF NO ALCHEMY
        enabled: false,
        blockNumber: 13674612,
      },

      // forking: process.env.HARDHAT_FORK 
      //   ? {
      //     // once PR is merged: network: process.env.HARDHAT_FORK,
      //     url: node_url(process.env.HARDHAT_FORK),
      //     blockNumber: process.env.HARDHAT_FORK_NUMBER ? parseInt(process.env.HARDHAT_FORK_NUMBER) : undefined,
      //   }
      //   : undefined,
      
      mining: process.env.MINING_INTERVAL 
        ? {
          auto: false,
          interval: process.env.MINING_INTERVAL.split(',').map((v) => parseInt(v)) as [number, number],
        }
        : undefined,
        
    },
    
    localhost: {
      url: node_url('localhost'),
      // why use two line when one line do job
      accounts: process.env.DEPLOYER ?  [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('localhost'),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('rinkeby'),
    },
    production: {
      url: node_url('mainnet'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('rinkeby'),
      blockGasLimit: 10000000,
    },
    mumbai: {
      url: node_url('mumbai'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('mumbai'),
      blockGasLimit: 10000000,
    },
    goerli: {
      url: node_url('goerli'),
      accounts: process.env.DEPLOYER ? [`${process.env.PRIVATE_KEY}`, `${process.env.PRIVATE_KEY_OWNER}`] : accounts('goerli'),
      blockGasLimit: 10000000,
    }
  },

  paths: {
    artifacts: './data/artifacts',
    deployments: './data/deployments',
    sources: './contracts',
  },

  // Typechain config
  typechain: {
    outDir: './types/typechain',
    target: 'ethers-v5',
  },

  mocha: {
    timeout: 20000,
  },

  abiExporter: {
    path: './data/abi',
    clear: true,
    spacing: 2,
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
    showTimeSpent: true,
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  external: process.env.HARDHAT_FORK
    ? {
      deployments: {
        // process.env.HARHAT_FORK specifies network fork is made from
        // allows fetching deployments from the network being forked form both for node and deploy task
        hardhat: ['data/deployments/' + process.env.HARDHAT_FORK],
        localhost: ['data/deployments/' + process.env.HARDHAT_FORK],
      },
    }
    : undefined,


};

export default config;
