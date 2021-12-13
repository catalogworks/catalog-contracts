// scripts/oz-proxy-deploy/deployTB303.ts

import { ethers, upgrades } from "hardhat";

async function main() {
  const TB303 = await ethers.getContractFactory("TB303");
  const tb303 = await upgrades.deployProxy(TB303, [42]);
  await tb303.deployed();
  console.log("TB303 deployed to:", tb303.address);
}

main();