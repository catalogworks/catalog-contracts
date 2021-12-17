// // deploy script for BasicContract 
// // use this as en example for other contracts


// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

//     const { deployments, getNamedAccounts } = hre;
//     const { deploy, log } = deployments;

//     // Get accounts
//     const { deployer, tokenOwner } = await getNamedAccounts();

//     const deployBasicContract = await deploy('BasicContract', {
//         from: deployer,
//         args: [],
//         log: true,
//         autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
//     });

//     if (deployBasicContract.newlyDeployed) {
//         log('\x1b[36m%s\x1b[0m',
//             `
//             contract: BasicContract deployed at ${deployBasicContract.address} 
//             using ${deployBasicContract.receipt?.gasUsed} gas. 
//             Owner (to): ${deployBasicContract.receipt?.to}
//             Signed from    : ${deployBasicContract.receipt?.from}
//             `
//         );
//     }

// };


// export default func;

// // Deployment tags
// func.tags = ['BasicContract'];