// CatalogNFT.test.ts: test suite for @isiain's CatalogNFT contract implementation (zora)

import { expect } from './ChaiSetup';
import { ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import { CatalogNFT, CatalogNFT as CatalogNFTType, CatalogNFT__factory} from '../types/typechain';
import { setupUser, setupUsers } from './utils';

import { MerkleTree } from 'merkletreejs';
import { keccak256 } from '@ethersproject/keccak256';


function hashAddress(address: string) {
    return ethers.utils.solidityKeccak256(
        ['address'],[address]
    );
}

const setupCatalogNFT = deployments.createFixture(async () => {
    
    await deployments.fixture('CatalogNFT');

    const {tokenOwner} = await getNamedAccounts();

    const contracts = {
        CatalogNFT: <CatalogNFTType>await ethers.getContract('CatalogNFT'),
    };

    const users = await setupUsers(await getUnnamedAccounts(), contracts);


    return {
        ...contracts,
        users,
        tokenOwner: await setupUser(tokenOwner, contracts),
    };


});


describe('CatalogNFT', function() {

    let tree: any;

    // stuff to do before test
    beforeEach(async () => {
        const {users, tokenOwner} = await setupCatalogNFT();
        // setup merkle proof for minters
        const allowed = [users[0].address, users[1].address];

        const leafs = allowed.reduce((last, allowedItem) => {
            last[allowedItem] = hashAddress(allowedItem);
            return last;
        }, {} as any);

        console.log('leafs:', leafs);

        tree = new MerkleTree(Object.values(leafs), keccak256, {
            sortPairs: true,
        });

        const merkleRoot = tree.getRoot();
        console.log('merkleRoot:', merkleRoot);

        // set root 
        await tokenOwner.CatalogNFT.setAllowedMintersRoot(merkleRoot);


    });


    it('mints', async() => {

        const {users} = await setupCatalogNFT();

        const proof = tree.getHexProof(hashAddress(users[0].address));

        await expect(
            users[0].CatalogNFT.mint(
                "http://catalog.works/content/uri",
                "0x0000000000000000000000000000000000000000000000000000000000000000",
                "https://catalog.works/content/metadata",
                users[0].address,
                1000,
                proof,
                [users[0].address]
            )
        //@ts-ignore next
        ).to.emit(CatalogNFT, 'Transfer')
        .withArgs(users[0].address, users[0].address, '1');

    });

});