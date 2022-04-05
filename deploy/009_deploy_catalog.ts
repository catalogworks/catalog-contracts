// deploy script for Catalog(UUPS)

// Uses Hardhat deploy compatible with OZ ERC1967Proxy

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    const deployCatalogUUPS = await deploy('Catalog', {
        contract: 'Catalog',
        from: deployer,
        args: [],
        proxy: {
            proxyContract: 'CatalogProxy',
            proxyArgs: ['{implementation}', '{data}'],
            execute: {
                init: {
                    methodName: 'initialize',
                    args: ['Catalog', 'RECORD'],
                },
            },
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
    });

    // const deployCatalogUUPSUpgrade = await catchUnknownSigner(
    //     deploy('Catalog', {
    //         contract: 'Catalog',
    //         from: multisig,
    //         args: [],
    //         proxy: {
    //             proxyContract: 'ERC1967Proxy',
    //             proxyArgs: ['{implementation}', '{data}'],
    //             execute: {
    //                 init: {
    //                     methodName: 'initialize',
    //                     args: ['Catalog', 'RECORD'],
    //                 },
    //             },
    //         },
    //         log: true,
    //     })
    // );

    // console.log(deployCatalogUUPSUpgrade);

    if (deployCatalogUUPS && deployCatalogUUPS.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: CatalogUUPS deployed at ${deployCatalogUUPS.address} 
            using ${deployCatalogUUPS.receipt?.gasUsed} gas. 
            Owner (to): ${deployCatalogUUPS.receipt?.to}
            implementation: ${deployCatalogUUPS.implementation}
            Signed from    : ${deployCatalogUUPS.receipt?.from}
            `
        );
    }
};

export default func;

// Deployment tags
func.tags = ['Catalog'];
