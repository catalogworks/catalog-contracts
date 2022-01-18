// deploy script for CF0
// 008_deploy_CF0.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployCF0 = await deploy('CF0', {
        from: deployer,
        contract: 'CF0',
        proxy: {
            // upgradeIndex: 0,
            // owner: multisig,
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: 'initialize',
                // address _owner, string memory _name, string memory _symbol
                args: ['CF0 NFT', 'CF0'],
            },
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
        // skipIfAlreadyDeployed: true
    });

    if (deployCF0 && deployCF0.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: CF0 deployed at ${deployCF0.address} 
            using ${deployCF0.receipt?.gasUsed} gas. 
            Owner (to): ${deployCF0.receipt?.to}
            implementation: ${deployCF0.implementation}
            Signed from    : ${deployCF0.receipt?.from}
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
func.tags = ['CF0'];
