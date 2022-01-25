// deploy script for CatalogUUPS

// Uses Hardhat deploy compatible with OZ ERC1967Proxy 

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();


    const deployCatalogUUPS = await deploy('CatalogUUPS', {
        contract: 'CatalogUUPS',
        from: deployer,
        args: [],
        proxy: {
            proxyContract: 'ERC1967Proxy',
            proxyArgs: ['{implementation}', '{data}'],
            execute: {
                init: {
                    methodName: 'initialize',
                    args: ['Catalog', 'CNFT'],
                }
            }
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
    });




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
func.tags = ['CatalogUUPS'];
