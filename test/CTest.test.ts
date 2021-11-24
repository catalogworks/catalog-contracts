// CTest.test.ts
// mocha unit tests for CTest contract

import { expect } from './ChaiSetup';
import { ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import { CTest, ICTest, IERC721 } from '../types/typechain';
import { setupUser, setupUsers } from './utils';



// CTest Test Setup
const setupCTest = deployments.createFixture(async () => {

    await deployments.fixture('CTest');

    const {tokenOwner} = await getNamedAccounts();

    const contracts = {
        CTest: <CTest>await ethers.getContract('CTest'),
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

});