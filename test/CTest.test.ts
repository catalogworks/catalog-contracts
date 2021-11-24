// CTest.test.ts
// mocha unit tests for CTest contract

import { expect } from './ChaiSetup';
import { ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import { CTest as CTestType,  ERC721,  IERC721 } from '../types/typechain';
import { setupUser, setupUsers } from './utils';


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



});