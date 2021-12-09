// deploy script for CTest 


import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy, log, catchUnknownSigner } = deployments;

    // Get accounts
    const { deployer, tokenOwner } = await getNamedAccounts();

    // Proxy deploy for OZ 
    const deployCTLTest = await deploy('CTLTest', {
        from: deployer,
        proxy: {
            proxyContract: 'OptimizedTransparentProxy',
            execute: {
                methodName: "initialize",
                // address _owner, string memory _name, string memory _symbol
                args: ["cNFTv2 Test", "CNFT"]
            }
        },
        log: true,
        autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
    });

    if (deployCTLTest.newlyDeployed) {
        log('\x1b[36m%s\x1b[0m',
            `
            contract: CTest deployed at ${deployCTLTest.address} 
            using ${deployCTLTest.receipt?.gasUsed} gas. 
            Owner (to): ${deployCTLTest.receipt?.to}
            implementation: ${deployCTLTest.implementation}
            Signed from    : ${deployCTLTest.receipt?.from}
            `
        );
    }

};


export default func;

// Deployment tags
func.tags = ['CTLTest'];