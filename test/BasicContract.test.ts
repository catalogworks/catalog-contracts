
// Sample test 

import { expect } from './ChaiSetup';
import { ethers, deployments, getUnnamedAccounts, getNamedAccounts } from 'hardhat';
import { BasicContract, IERC721 } from '../types/typechain';
import { setupUser, setupUsers } from './utils';


// Test setup
const setupBasicContract = deployments.createFixture(async () => {

    await deployments.fixture('BasicContract');

    const {tokenOwner} = await getNamedAccounts();

    const contracts = {
        BasicContract: <BasicContract>await ethers.getContract('BasicContract'),
    };

    const users = await setupUsers(await getUnnamedAccounts(), contracts);


    return {
        ...contracts,
        users,
        tokenOwner: await setupUser(tokenOwner, contracts),
    };
});


// Tests
describe('BasicContract', function() {

    // 01
    it('transfer fails', async function() {
        const {users} = await setupBasicContract();

        await expect(
            users[0].BasicContract.transferFrom(users[0].address, users[1].address, 1)
        ).to.be.revertedWith('ERC721: operator query for nonexistent token');
    });

    // 02
    it('sucessfully mints', async function() {
        const {users} = await setupBasicContract();

        await expect(
            // call safeMint
            users[0].BasicContract.safeMint(users[0].address)
        )
            .to.emit(users[0].BasicContract, 'Transfer')
            .withArgs('0x0000000000000000000000000000000000000000', users[0].address, 0);
    });




});