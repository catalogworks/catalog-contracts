// // deploy script for CatalogUUPS

// // Uses OZ Hardhat Upgrades, saves deployment for hardhat-deploy

// import {HardhatRuntimeEnvironment} from 'hardhat/types';
// import {DeployFunction} from 'hardhat-deploy/types';
// import {ethers, upgrades} from 'hardhat';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//     const {deployments, getNamedAccounts} = hre;
//     const {deploy, log, catchUnknownSigner, save} = deployments;

//     // Get accounts
//     const {deployer, tokenOwner, multisig} = await getNamedAccounts();

//     const CatalogUUPS = await ethers.getContractFactory('CatalogUUPS');

//     // Deploy UUPS Proxy
//     const proxy = await upgrades.deployProxy(CatalogUUPS, ['Catalog', 'cNFT'], {
//         kind: 'uups',
//     });
//     console.log(
//         '\x1b[36m%s\x1b[0m',
//         'Deployed CatalogUUPS Proxy to:',
//         proxy.address
//     );
//     // wait for confirmation
//     await proxy.deployed();

//     // Deploy implementation
//     // Modify this for upgrades
//     const implementation = await upgrades.upgradeProxy(proxy, CatalogUUPS);

//     const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
//     console.log(
//         '\x1b[36m%s\x1b[0m',
//         'Deploy CatalogUUPS implementation to:',
//         implementationAddress
//     );

//     const artifact = await deployments.getExtendedArtifact('CatalogUUPS');

//     const proxyDeployments = {
//         address: proxy.address,
//         ...artifact,
//     };

//     if (proxy.address && implementation.address) {
//         log(
//             '\x1b[36m%s\x1b[0m',
//             `
//             contract: CatalogUUPS deployed at ${proxy.address} 
//             using ${proxy.receipt?.gasUsed} gas. 
//             Owner (to): ${proxy.receipt?.to}
//             implementation: ${implementationAddress}
//             Signed from    : ${proxy.receipt?.from}
//             `
//         );
//     }

//     await save('CatalogUUPS', proxyDeployments);
// };

// export default func;

// // Deployment tags
// func.tags = ['CatalogUUPS'];
