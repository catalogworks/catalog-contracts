// deploy script for CLG20 erc20 token

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, log} = deployments;

  // Get accounts
  const {deployer, tokenOwner} = await getNamedAccounts();

  const deployCLG20 = await deploy('CLG20', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true, // speeds deployment on local network. no effect on testnet/mainnet
  });

  if (deployCLG20.newlyDeployed) {
    log(
      '\x1b[36m%s\x1b[0m',
      `
            contract: CLG20 deployed at ${deployCLG20.address} 
            using ${deployCLG20.receipt?.gasUsed} gas. 
            Owner (to): ${deployCLG20.receipt?.to}
            Signed from    : ${deployCLG20.receipt?.from}
            `
    );
  }
};

export default func;

// Deployment tags
func.tags = ['CLG20'];
