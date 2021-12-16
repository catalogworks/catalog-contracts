// deploy script for TD606
// 009_deploy_td606.ts


import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy, log, catchUnknownSigner } = deployments;

    // Get accounts
    const { deployer, tokenOwner, multisig } = await getNamedAccounts();


    // Proxy deploy for OZ 
    const deployTD606 = await deploy('TD606', {
        from: deployer,
        proxy: {
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: "initialize",
                // address _owner, string memory _name, string memory _symbol
                args: ["TD606 v0", "TD606"]
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

    if (deployTD606.newlyDeployed) {
        log('\x1b[36m%s\x1b[0m',
            `
            contract: TD606 deployed at ${deployTD606.address} 
            using ${deployTD606.receipt?.gasUsed} gas. 
            Owner (to): ${deployTD606.receipt?.to}
            implementation: ${deployTD606.implementation}
            Signed from    : ${deployTD606.receipt?.from}
            `
        );
    }

};


export default func;

// Deployment tags
func.tags = ['TD606'];