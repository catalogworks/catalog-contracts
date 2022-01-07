// CLG20 Tests
// basic ERC-20 token

import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers, getNamedAccounts } from "hardhat";

import { CLG20, CLG20__factory } from "../types/typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("CLG20 Test Suite", () => {
  let tokenInstance: CLG20;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;

  beforeEach(async () => {
    // setup signers
    const signers = await ethers.getSigners();
    const { deployer } = await getNamedAccounts();

    console.log("\x1b[36m%s\x1b[0m", "deployer: ", deployer.toString());
    signer = signers[0];
    console.log("\x1b[36m%s\x1b[0m", "signer address:", signer.getAddress());
    signerAddress = await signer.getAddress();
    signer1 = signers[1];
    signer1Address = await signer1.getAddress();

    // setup contract
    const { CLG20 } = await deployments.fixture(["CLG20"]);
    tokenInstance = CLG20__factory.connect(CLG20.address, signer);

    console.log("instance: ", tokenInstance);
  });

  // 01

  it("mints tokens", async () => {
    await expect(tokenInstance.mint(signerAddress, 500))
      .to.emit(tokenInstance, "OhYeahMoneyTime")
      .withArgs(signerAddress, 500, "oh yeah money time");
  });

  // 02
});
