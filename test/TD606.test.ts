// TD606.test.ts: test suite for TD606

import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import keccak256 from "keccak256";

import { TD606, TD606__factory } from "../types/typechain";
import MerkleTree from "merkletreejs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish } from "@ethersproject/bignumber";

function hashAddress(address: string) {
  return ethers.utils.solidityKeccak256(["address"], [address]);
}

type TokenData = {
  metadataURI: string;
  contentURI: string;
  creator: string;
  royaltyPayout: string;
  royaltyBPS: BigNumberish;
};

describe("TD606 Tests ", () => {
  let mintableArtistInstance: TD606;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;
  let leafs: any;
  let merkletree: any;

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
    await deployments.fixture(["TD606"], { fallbackToGlobal: false });
    const TD606 = await deployments.get("TD606");
    // mintableArtistInstance = await ethers.getContract('TD606', signer);
    mintableArtistInstance = TD606__factory.connect(TD606.address, signer);

    // setup merkle proof for minters
    const allowed = [signerAddress, signer1Address];
    leafs = allowed.reduce((last, allowedItem) => {
      last[allowedItem] = hashAddress(allowedItem);
      return last;
    }, {} as any);

    console.log(leafs);

    merkletree = new MerkleTree(Object.values(leafs), keccak256, {
      sortPairs: true,
    });

    const merkleRoot = merkletree.getRoot();
    console.log(merkleRoot);
    //@ts-ignore-next
    await mintableArtistInstance.updateRoot(merkleRoot);
  });

  // 01

  it("mints", async () => {
    const proof = merkletree.getHexProof(hashAddress(signerAddress));

    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadata",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: "0x91c2b511D5858617c83aBC69483097e870c85208",
      royaltyBPS: 1000,
    };

    const mint = await mintableArtistInstance.mint(inputData, proof);
  });

  // 02

  it("properly updates", async () => {
    // mint token
    const proof = merkletree.getHexProof(hashAddress(signerAddress));
    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadata",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: "0x91c2b511D5858617c83aBC69483097e870c85208",
      royaltyBPS: 1000,
    };
    const mint = await mintableArtistInstance.mint(inputData, proof);

    await expect(mintableArtistInstance.updateMetadataURI(1, "poopoopeepee"))
      .to.emit(mintableArtistInstance, "MetadataUpdated")
      .withArgs(1, "poopoopeepee");
  });

  // 03

  it("properly updates royalty information", async () => {
    // mint token
    const proof = merkletree.getHexProof(hashAddress(signerAddress));
    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadata",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: "0x91c2b511D5858617c83aBC69483097e870c85208",
      royaltyBPS: 1000,
    };
    const mint = await mintableArtistInstance.mint(inputData, proof);
    await mintableArtistInstance.updateRoyaltyInfo(1, signer1Address);

    await expect((await mintableArtistInstance.royaltyPayoutAddress(1)).toString())
      .to.equal(signer1Address)
      .toString();
  });

  // 04
  it("burn da token", async () => {
    //mint token
    const proof = merkletree.getHexProof(hashAddress(signerAddress));
    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadata",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: "0x91c2b511D5858617c83aBC69483097e870c85208",
      royaltyBPS: 2000,
    };
    const mint = await mintableArtistInstance.mint(inputData, proof);

    const burn = await mintableArtistInstance.burn(1);
    await expect(mintableArtistInstance.tokenURI(1)).to.be.revertedWith(
      "ERC721Metadata: URI query for nonexistent token",
    );
  });

  // 05
  it("retrieves tokenURI", async () => {
    const proof = merkletree.getHexProof(hashAddress(signerAddress));
    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadataPOOP",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: "0x91c2b511D5858617c83aBC69483097e870c85208",
      royaltyBPS: 3000,
    };

    const mint = await mintableArtistInstance.mint(inputData, proof);

    await expect((await mintableArtistInstance.tokenURI(1)).toString()).to.equal(
      "https://catalog.works/content/metadataPOOP",
    );
  });

  // 06
  it("transfers between users", async () => {
    const proof = merkletree.getHexProof(hashAddress(signerAddress));
    const inputData: TokenData = {
      metadataURI: "https://catalog.works/content/metadata",
      contentURI: "http://catalog.works/content/uri",
      creator: signerAddress,
      royaltyPayout: signerAddress,
      royaltyBPS: 4000,
    };

    const mint = await mintableArtistInstance.mint(inputData, proof);

    // transfer token
    await mintableArtistInstance.transferFrom(signerAddress, signer1Address, 1);

    await expect((await mintableArtistInstance.ownerOf(1)).toString()).to.equal(signer1Address);
  });
});
