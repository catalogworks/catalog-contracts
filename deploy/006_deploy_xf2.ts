// deploy script for XF2
// 009_deploy_XF2.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployXF2 = await deploy('XF2', {
        from: deployer,
        contract: 'XF2',
        proxy: {
            // upgradeIndex: 0,
            // owner: multisig,
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: 'initialize',
                // address _owner, string memory _name, string memory _symbol
                args: ['XF2 NFT', 'XF2'],
            },
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
        // skipIfAlreadyDeployed: true
    });

    if (deployXF2 && deployXF2.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: XF2 deployed at ${deployXF2.address} 
            using ${deployXF2.receipt?.gasUsed} gas. 
            Owner (to): ${deployXF2.receipt?.to}
            implementation: ${deployXF2.implementation}
            Signed from    : ${deployXF2.receipt?.from}
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
func.tags = ['XF2'];
