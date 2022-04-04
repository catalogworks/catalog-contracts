// scripts/oz-proxy-deploy/prepageUpgradeCatalog.ts
import {ethers, upgrades} from 'hardhat';

async function main(inputProxyAddress: string, inputContractName: string) {
    if (!inputProxyAddress || !inputContractName) {
        throw new Error('Please provide a contract name and proxy address');
    }
    const CatalogUpgrade = await ethers.getContractFactory(inputContractName);
    console.log('preparing upgrade...');
    const catalog = await upgrades.prepareUpgrade(
        inputProxyAddress,
        CatalogUpgrade
    );
    console.log('prepared upgrade');
    console.log('CatalogUpgrade contract at:', catalog);
    console.log('Catalog upgraded');
}

main('', '')
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
