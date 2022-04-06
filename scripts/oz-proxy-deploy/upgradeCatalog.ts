// // scripts/oz-proxy-deploy/upgradeTB303.ts

import {ethers, upgrades} from 'hardhat';

async function main(inputContractName: string, inputProxyAddress: string) {
    if (!inputContractName || !inputProxyAddress) {
        throw new Error('Please provide a contract name and proxy address');
    }

    const CatalogUpgrade = await ethers.getContractFactory(inputContractName);
    const catalog = await upgrades.upgradeProxy(
        inputProxyAddress,
        CatalogUpgrade
    );
    await catalog.deployed();
    console.log('Deployed Catalog contract at:', catalog.address);
    console.log('Catalog upgraded');
}

main('', '')
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
