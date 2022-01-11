// deploy script for SP1200
// 004_deploy_sp1200.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, log, catchUnknownSigner} = deployments;

  // Get accounts
  const {deployer, tokenOwner, multisig} = await getNamedAccounts();

  // Proxy deploy for OZ
  const deploySP1200 = await deploy('SP1200', {
    from: deployer,
    contract: 'SP1200',
    proxy: {
      // upgradeIndex: 0,
      // owner: multisig,
      proxyContract: 'OptimizedTransparentProxy',
      execute: {
        methodName: 'initialize',
        // address _owner, string memory _name, string memory _symbol
        args: ['SP1200 NFT', 'SP1200'],
      },
    },
    log: true,
    autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
    // skipIfAlreadyDeployed: true
  });

  if (deploySP1200 && deploySP1200.newlyDeployed) {
    log(
      '\x1b[36m%s\x1b[0m',
      `
            contract: TD606 deployed at ${deploySP1200.address} 
            using ${deploySP1200.receipt?.gasUsed} gas. 
            Owner (to): ${deploySP1200.receipt?.to}
            implementation: ${deploySP1200.implementation}
            Signed from    : ${deploySP1200.receipt?.from}
            `
    );
  }

  // // Proxy deploy upgrade
  // const upgradeTD606 = await catchUnknownSigner(
  //     deploy('TD606', {
  //         from: deployer,
  //         contract: 'TD606_v2',
  //         proxy: {
  //             upgradeIndex: 1,
  //             owner: multisig,
  //             proxyContract: 'OptimizedTransparentProxy',
  //             execute: {
  //                 methodName: "initialize",
  //                 // address _owner, string memory _name, string memory _symbol
  //                 args: ["TD606 NFT", "TD606"]
  //             }
  //         },
  //         log: true,
  //         autoMine: true,
  // }));

  // if (upgradeTD606) {
  //     log(`TD606 upgraded to TB303V2`);
  //     log('\x1b[36m%s\x1b[0m',
  //         `
  //         address  = ${upgradeTD606}

  //         `
  //     );
  // }
};

export default func;

// Deployment tags
func.tags = ['SP1200'];
