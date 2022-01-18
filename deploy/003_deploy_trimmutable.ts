// deploy script for TRImmutable
// 005_deploy_TRImmutable.ts

// Modify this script for upgrades

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log, catchUnknownSigner} = deployments;

    // Get accounts
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    // Proxy deploy for OZ
    const deployTRImmutable = await deploy('TRImmutable', {
        from: deployer,
        contract: 'TRImmutable',
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
        // skipIfAlreadyDeployed: true
    });

    if (deployTRImmutable && deployTRImmutable.newlyDeployed) {
        log(
            '\x1b[36m%s\x1b[0m',
            `
            contract: TRImmutable deployed at ${deployTRImmutable.address} 
            using ${deployTRImmutable.receipt?.gasUsed} gas. 
            Owner (to): ${deployTRImmutable.receipt?.to}
            implementation: ${deployTRImmutable.implementation}
            Signed from    : ${deployTRImmutable.receipt?.from}
            `
        );
    }
};

export default func;

// Deployment tags
func.tags = ['TRImmutable'];
