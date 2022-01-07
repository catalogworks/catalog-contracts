// CatalogNFT.test.ts: test suite for @isiain's CatalogNFT contract implementation (zora)

import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers } from "hardhat";
import keccak256 from "keccak256";

import { CatalogNFT, CatalogNFT__factory } from "../types/typechain";
import MerkleTree from "merkletreejs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

function hashAddress(address: string) {
  return ethers.utils.solidityKeccak256(["address"], [address]);
}

describe("CatalogNFTTest", () => {
  let mintableArtistInstance: CatalogNFT;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;
  let leafs: any;
  let merkletree: any;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    signer = signers[0];
    signerAddress = await signer.getAddress();
    signer1 = signers[1];
    signer1Address = await signer1.getAddress();

    const { CatalogNFT } = await deployments.fixture(["CatalogNFT"]);
    mintableArtistInstance = CatalogNFT__factory.connect(CatalogNFT.address, signer);
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
    await mintableArtistInstance.setAllowedMintersRoot(merkleRoot);
  });

  // 01
  describe("minting", () => {
    it("mints", async () => {
      const proof = merkletree.getHexProof(hashAddress(signerAddress));
      const mint = await mintableArtistInstance.mint(
        "http://catalog.works/content/uri",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "https://catalog.works/content/metadata",
        signerAddress,
        1000,
        proof,
        [signerAddress],
      );
    });
  });

  // 02
  describe("updating metadataURI", () => {
    it("properly updates", async () => {
      // mint token
      const proof = merkletree.getHexProof(hashAddress(signerAddress));
      const mint = await mintableArtistInstance.mint(
        "http://catalog.works/content/uri",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "https://catalog.works/content/metadata",
        signerAddress,
        1000,
        proof,
        [signerAddress],
      );

      await expect(mintableArtistInstance.updateMetadataUri(0, "poopoopeepee"))
        .to.emit(mintableArtistInstance, "MetadataUpdated")
        .withArgs(0, "poopoopeepee");
    });
  });

  // 03
  describe("updating royalty", () => {
    it("properly updates royalty information", async () => {
      // mint token
      const proof = merkletree.getHexProof(hashAddress(signerAddress));
      const mint = await mintableArtistInstance.mint(
        "http://catalog.works/content/uri",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "https://catalog.works/content/metadata",
        signerAddress,
        1000,
        proof,
        [signerAddress],
      );

      await expect(mintableArtistInstance.setTokenPayoutAdmin(0, signer1Address))
        .to.emit(mintableArtistInstance, "RoyaltyUpdated")
        .withArgs(0, signer1Address);
    });
  });

  // 04
  describe("burning tokens", () => {
    it("burn da token", async () => {
      //mint token
      const proof = merkletree.getHexProof(hashAddress(signerAddress));
      const mint = await mintableArtistInstance.mint(
        "http://catalog.works/content/uri",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "https://catalog.works/content/metadata",
        signerAddress,
        2000,
        proof,
        [signerAddress],
      );

      const burn = await mintableArtistInstance.burn(0);
      await expect(mintableArtistInstance.tokenURI(0)).to.be.revertedWith("Query for nonexistent token");
    });
  });

  describe("properly stores metadata", () => {
    it("retrieves tokenURI", async () => {
      const proof = merkletree.getHexProof(hashAddress(signerAddress));

      const mint = await mintableArtistInstance.mint(
        "http://catalog.works/content/uri",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "https://catalog.works/content/metadataPOOP",
        signerAddress,
        3000,
        proof,
        [signerAddress],
      );

      await expect((await mintableArtistInstance.tokenURI(0)).toString()).to.equal(
        "https://catalog.works/content/metadataPOOP",
      );
    });
  });
});
