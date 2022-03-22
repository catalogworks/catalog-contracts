// scripts/oz-proxy-deploy/deployCatalog.ts

import {ethers, upgrades} from 'hardhat';

async function main() {
    const CatalogContract = await ethers.getContractFactory('Catalog');
    const catalog = await upgrades.deployProxy(CatalogContract, ["Catalog", "CatalogNFT"]);
    await catalog.deployed();
    console.log('Deployed Catalog contract at:', catalog.address);
};

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
