// // deploy script for CTest 


// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

//     const { deployments, getNamedAccounts } = hre;
//     const { deploy, log, catchUnknownSigner } = deployments;

//     // Get accounts
//     const { deployer, tokenOwner } = await getNamedAccounts();

//     // Proxy deploy for OZ 
//     const deployCTLTestV2 = await deploy('CTLTestV2', {
//         from: deployer,
//         proxy: {
//             proxyContract: 'OptimizedTransparentProxy',
//             execute: {
//                 methodName: "initialize",
//                 // address _owner, string memory _name, string memory _symbol
//                 args: ["cNFTv3 Test", "CNFT"]
//             }
//         },
//         log: true,
//         autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
//     });

//     if (deployCTLTestV2.newlyDeployed) {
//         log('\x1b[36m%s\x1b[0m',
//             `
//             contract: CTLTestV2 deployed at ${deployCTLTestV2.address} 
//             using ${deployCTLTestV2.receipt?.gasUsed} gas. 
//             Owner (to): ${deployCTLTestV2.receipt?.to}
//             implementation: ${deployCTLTestV2.implementation}
//             Signed from    : ${deployCTLTestV2.receipt?.from}
//             `
//         );
//     }

// };


// export default func;

// // Deployment tags
// func.tags = ['CTLTestV2'];