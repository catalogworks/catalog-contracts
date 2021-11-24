// CTest.test.ts
// mocha unit tests for CTest contract

import { expect } from './ChaiSetup';
import { ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import { CTest as CTestType,  ERC721,  IERC721 } from '../types/typechain';
import { setupUser, setupUsers } from './utils';

// Tree shit
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';


// CTest Test Setup
const setupCTest = deployments.createFixture(async () => {

    await deployments.fixture('CTest');

    const {tokenOwner} = await getNamedAccounts();

    const contracts = {
        CTest: <CTestType>await ethers.getContract('CTest'),
    };

    const users = await setupUsers(await getUnnamedAccounts(), contracts);

    return {
        ...contracts,
        users,
        tokenOwner: await setupUser(tokenOwner, contracts),
    };
});


// Tests
describe('CTest', function() {

    // 01
    it('transfer fails', async function() {
        const {users} = await setupCTest();

        await expect(
            users[0].CTest.transferFrom(users[0].address, users[1].address, 1)
        ).to.be.revertedWith('ERC721: operator query for nonexistent token');
    });

    // 02 
    it('succesfully mints and transfers', async function() {
        const {users, tokenOwner, CTest} = await setupCTest();

        // get a BPS value
        const BPS = ethers.BigNumber.from(2500);

        // Mint token
        await tokenOwner.CTest.mint(users[0].address, 'poop', 'pee', users[0].address, users[1].address, BPS);

        await expect(
            users[0].CTest.transferFrom(users[0].address, users[1].address, 1)
        //@ts-ignore next
        ).to.emit(CTest, 'Transfer')
        .withArgs(users[0].address, users[1].address, '1');

    });

    // 03 
    it ('returns the correct token creators address', async function() {

        const {users, CTest} = await setupCTest();

        // get a BPS value
        const BPS = ethers.BigNumber.from(2500);

        // mint token
        await users[0].CTest.mint(users[0].address, 'computer', 'data', users[0].address, users[1].address, BPS);

        await expect(
            (await CTest.creator(1)).toString()
        ).to.equal(users[0].address);

    });

    // 04
    it ('can have tokenURIs updated by an access controlled account', async function() {

        const {tokenOwner, users, CTest} = await setupCTest();

        // get a BPS value
        const BPS = ethers.BigNumber.from(1200);

        // mint token   
        await users[1].CTest.mint(users[1].address, 'awoooga', 'bazooka', users[1].address, users[2].address, BPS);

        // update tokenURIs from tokenOwner
        await tokenOwner.CTest.updateTokenURIs(1, 'soup', 'foods');

        await expect(
            (await (CTest.tokenURI(1))).toString()
        ).to.equal('soup');

    });

    // 05 
    it ('can have the royalty payout address changed by an admin', async function() {

        const {tokenOwner, users, CTest} = await setupCTest();

        // get a BPS value
        const BPS = ethers.BigNumber.from(1200);
        // mint token   
        await users[2].CTest.mint(users[2].address, 'synthesizer', 'moog', users[2].address, users[4].address, BPS);

        // update royalty payout address with admin role
        await tokenOwner.CTest.updateRoyaltyInfo(1, users[6].address);

        await expect(
            (await (CTest.royaltyPayoutAddress(1))).toString()
        ).to.equal(users[6].address);

    });


    // 05 
    it ('can allow merkle root updating ', async function() {

        const {tokenOwner, users, CTest} = await setupCTest();


        // make a tree 
        const leaves = [
            users[0].address,
            users[1].address,
            users[2].address,
            users[3].address,
            users[4].address,
            users[5].address,
            users[7].address,
            users[8].address,
            users[9].address,
        ].map((x) => keccak256(x));

        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true});
        const root = tree.getHexRoot();

        await tokenOwner.CTest.updateMerkleRoot(root);


        await expect(
            tokenOwner.CTest.updateMerkleRoot(root)
        ).to.emit(CTest, 'merkleRootUpdated')

    });

});