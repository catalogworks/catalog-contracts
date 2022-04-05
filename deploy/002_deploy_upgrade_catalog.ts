// deployment upgrade script for Catalog(UUPS)

// Uses Hardhat deploy compatible with OZ ERC1967Proxy

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    const deployCatalogUUPSUpgrade = await catchUnknownSigner(
        deploy('Catalog', {
            contract: 'Catalog',
            from: multisig,
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
        })
    );

    if (deployCatalogUUPSUpgrade) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: CatalogUUPS deployed at ${deployCatalogUUPSUpgrade.to}
            `
        );
    }
};

export default func;

// Deployment tags
func.tags = ['CatalogUpgrade'];
