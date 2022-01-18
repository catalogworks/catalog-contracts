// deploy script for CatalogNFT (zora, @isiain)

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log} = deployments;

    // Get accounts
    const {deployer, tokenOwner} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployCatalogNFT = await deploy('CatalogNFT', {
        from: deployer,
        proxy: {
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: 'initialize',
                args: ['Catalog(Zora) NFT', 'CZNFT'],
            },
        },
        log: true,
    });

    if (deployCatalogNFT.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: CatalogNFT deployed at ${deployCatalogNFT.address} 
            using ${deployCatalogNFT.receipt?.gasUsed} gas. 
            Owner (to): ${deployCatalogNFT.receipt?.to}
            Signed from    : ${deployCatalogNFT.receipt?.from}
            `
        );
    }
};

export default func;

// deployment tags
func.tags = ['CatalogNFT'];
