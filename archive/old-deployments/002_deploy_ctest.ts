// // deploy script for CTest 


// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

//     const { deployments, getNamedAccounts } = hre;
//     const { deploy, log, catchUnknownSigner } = deployments;

//     // Get accounts
//     const { deployer, tokenOwner } = await getNamedAccounts();

//     // Proxy deploy for OZ 
//     const deployCTest = await deploy('CTest', {
//         from: deployer,
//         proxy: {
//             proxyContract: 'OptimizedTransparentProxy',
//             execute: {
//                 methodName: "initialize",
//                 // address _owner, string memory _name, string memory _symbol
//                 args: ["cNFTv0.1 Test", "CNFT0"]
//             }
//         },
//         log: true,
//         autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
//     });

//     if (deployCTest.newlyDeployed) {
//         log('\x1b[36m%s\x1b[0m',
//             `
//             contract: CTest deployed at ${deployCTest.address} 
//             using ${deployCTest.receipt?.gasUsed} gas. 
//             Owner (to): ${deployCTest.receipt?.to}
//             implementation: ${deployCTest.implementation}
//             Signed from    : ${deployCTest.receipt?.from}
//             `
//         );
//     }

// };


// export default func;

// // Deployment tags
// func.tags = ['CTest'];