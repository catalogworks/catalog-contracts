// // deploy upgrade script for TB303
// // 008_deploy_tb303.ts


// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

//     const { deployments, getNamedAccounts } = hre;
//     const { deploy, log, catchUnknownSigner } = deployments;

//     // Get accounts
//     const { deployer, tokenOwner, multisig } = await getNamedAccounts();



//     const upgradeTB303 = await catchUnknownSigner(
//         deploy('TB303', {
//             contract: 'TB303V3',
//             from: deployer,
//             proxy: {
//                 proxyContract: 'OptimizedTransparentProxy',
//                 owner: multisig,
//             },
//             log: true,
//     }));

//     if (upgradeTB303) {
//         log(`TB303 upgraded to TB303V2`);
//         log('\x1b[36m%s\x1b[0m',
//             `
//             address  = ${upgradeTB303}

//             `
//         );
//     }



// };


// export default func;

// // Deployment tags
// func.tags = ['TB303Upgrade'];