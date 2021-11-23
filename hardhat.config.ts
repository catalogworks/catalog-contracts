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
      forking: process.env.HARDHAT_FORK 
        ? {
          // once PR is merged: network: process.env.HARDHAT_FORK,
          url: node_url(process.env.HARDHAT_FORK),
          blockNumber: process.env.HARDHAT_FORK_NUMBER ? parseInt(process.env.HARDHAT_FORK_NUMBER) : undefined,
        }
        : undefined,
      
      mining: process.env.MINING_INTERVAL 
        ? {
          auto: false,
          interval: process.env.MINING_INTERVAL.split(',').map((v) => parseInt(v)) as [number, number],
        }
        : undefined,
        
    },
    
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    production: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
  },

  paths: {
    artifacts: './data/artifacts',
    deployments: './data/deployments',
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
