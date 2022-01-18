// deploy script for TDX
// 006_deploy_tdx.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployTDX = await deploy('TDX', {
        from: deployer,
        contract: 'TDX',
        proxy: {
            // upgradeIndex: 0,
            // owner: multisig,
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: 'initialize',
                // address _owner, string memory _name, string memory _symbol
                args: ['TDX NFT', 'TDX'],
            },
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
        // skipIfAlreadyDeployed: true
    });

    if (deployTDX && deployTDX.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: TDX deployed at ${deployTDX.address} 
            using ${deployTDX.receipt?.gasUsed} gas. 
            Owner (to): ${deployTDX.receipt?.to}
            implementation: ${deployTDX.implementation}
            Signed from    : ${deployTDX.receipt?.from}
            `
        );
    }

    // // Proxy deploy upgrade
    // const upgradeTDX = await catchUnknownSigner(
    //     deploy('TDX', {
    //         from: deployer,
    //         contract: 'TDX_v2',
    //         proxy: {
    //             upgradeIndex: 1,
    //             owner: multisig,
    //             proxyContract: 'OptimizedTransparentProxy',
    //             execute: {
    //                 methodName: "initialize",
    //                 // address _owner, string memory _name, string memory _symbol
    //                 args: ["TDX NFT", "TDX"]
    //             }
    //         },
    //         log: true,
    //         autoMine: true,
    // }));

    // if (upgradeTDX) {
    //     log(`TDX upgraded to TB303V2`);
    //     log('\x1b[36m%s\x1b[0m',
    //         `
    //         address  = ${upgradeTDX}

    //         `
    //     );
    // }
};

export default func;

// Deployment tags
func.tags = ['TDX'];
