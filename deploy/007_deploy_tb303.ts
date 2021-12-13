// deploy script for TB303
// 007_deploy_tb303.ts


import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy, log, catchUnknownSigner } = deployments;

    // Get accounts
    const { deployer, tokenOwner, multisig } = await getNamedAccounts();


    // Proxy deploy for OZ 
    const deployTB303 = await deploy('TB303', {
        from: deployer,
        proxy: {
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: "initialize",
                // address _owner, string memory _name, string memory _symbol
                args: ["TB303 v0", "TB303"]
            }
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
    });

    // if (process.env.DEPLOYER) {

    // }
    // const upgradeTB303 = await catchUnknownSigner(
    //     deploy('TB303', {
    //         contract: 'TB303V2',
    //         from: deployer,
    //         proxy: {
    //             proxyContract: 'OptimizedTransparentProxy',
    //             owner: multisig,
    //         },
    //         log: true,
    // }));

    // if (upgradeTB303) {
    //     log(`TB303 upgraded to TB303V2`);
    //     log('\x1b[36m%s\x1b[0m',
    //         `
    //         address  = ${upgradeTB303}

    //         `
    //     );
    // }

    if (deployTB303.newlyDeployed) {
        log('\x1b[36m%s\x1b[0m',
            `
            contract: TB303 deployed at ${deployTB303.address} 
            using ${deployTB303.receipt?.gasUsed} gas. 
            Owner (to): ${deployTB303.receipt?.to}
            implementation: ${deployTB303.implementation}
            Signed from    : ${deployTB303.receipt?.from}
            `
        );
    }

};


export default func;

// Deployment tags
func.tags = ['TB303'];