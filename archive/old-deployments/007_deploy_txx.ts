// deploy script for TXX
// 007_deploy_txx.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployTXX = await deploy('TXX', {
        from: deployer,
        contract: 'TXX',
        proxy: {
            // upgradeIndex: 0,
            // owner: multisig,
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: 'initialize',
                // address _owner, string memory _name, string memory _symbol
                args: ['TXX NFT', 'TXX'],
            },
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
        // skipIfAlreadyDeployed: true
    });

    if (deployTXX && deployTXX.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: TXX deployed at ${deployTXX.address} 
            using ${deployTXX.receipt?.gasUsed} gas. 
            Owner (to): ${deployTXX.receipt?.to}
            implementation: ${deployTXX.implementation}
            Signed from    : ${deployTXX.receipt?.from}
            `
        );
    }

    // // Proxy deploy upgrade
    // const upgradeTXX = await catchUnknownSigner(
    //     deploy('TXX', {
    //         from: deployer,
    //         contract: 'TXX_v2',
    //         proxy: {
    //             upgradeIndex: 1,
    //             owner: multisig,
    //             proxyContract: 'OptimizedTransparentProxy',
    //             execute: {
    //                 methodName: "initialize",
    //                 // address _owner, string memory _name, string memory _symbol
    //                 args: ["TXX NFT", "TXX"]
    //             }
    //         },
    //         log: true,
    //         autoMine: true,
    // }));

    // if (upgradeTXX) {
    //     log(`TXX upgraded to TB303V2`);
    //     log('\x1b[36m%s\x1b[0m',
    //         `
    //         address  = ${upgradeTXX}

    //         `
    //     );
    // }
};

export default func;

// Deployment tags
func.tags = ['TXX'];
