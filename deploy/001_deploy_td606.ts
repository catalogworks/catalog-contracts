// deploy script for TD606
// 009_deploy_td606.ts

// Modify this script for upgrades

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy, log, catchUnknownSigner } = deployments;

    // Get accounts
    const { deployer, tokenOwner, multisig } = await getNamedAccounts();



    // Proxy deploy for OZ 
    const deployTD606 = await 
        deploy('TD606', {
            from: deployer,
            contract: 'TD606',
            proxy: {
                // upgradeIndex: 0,
                // owner: multisig,
                proxyContract: 'OptimizedTransparentProxy',
                execute: {
                    methodName: "initialize",
                    // address _owner, string memory _name, string memory _symbol
                    args: ["TD606 NFT", "TD606"]
                }
                
            },
            log: true,
            autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
            skipIfAlreadyDeployed: true
    });

    if ( deployTD606 && deployTD606.newlyDeployed) {
        hre.tenderly.verify({
            name: 'TD606',
            address: deployTD606.address,
        });

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
func.tags = ['TD606'];
