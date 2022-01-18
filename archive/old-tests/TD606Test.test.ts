// TD606Test.test.ts: test suite for TD606

import {expect} from 'chai';
import '@nomiclabs/hardhat-ethers';
import {
    deployments,
    ethers,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';
import keccak256 from 'keccak256';

import {TD606, TD606__factory} from '../types/typechain';
import MerkleTree from 'merkletreejs';
import {BigNumberish} from '@ethersproject/bignumber';
import {setupUser, setupUsers} from './utils';

function hashAddress(address: string) {
    return ethers.utils.solidityKeccak256(['address'], [address]);
}

type TokenData = {
    metadataURI: string;
    contentURI: string;
    creator: string;
    royaltyPayout: string;
    royaltyBPS: BigNumberish;
};

const setup = deployments.createFixture(async () => {
    await deployments.fixture('TD606');
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    const contracts = {
        TD606: <TD606>await ethers.getContract('TD606'),
    };

    const users = await setupUsers(await getUnnamedAccounts(), contracts);

    const result = await setupUser(deployer, contracts);

    // setup merkle root
    const allowed = [
        users[0].address,
        users[1].address,
        users[2].address,
        users[3].address,
        users[4].address,
        users[5].address,
    ];
    const leafs = allowed.reduce((last, allowedItem) => {
        last[allowedItem] = hashAddress(allowedItem);
        return last;
    }, {} as any);
    console.log(leafs);
    const merkletree = new MerkleTree(Object.values(leafs), keccak256, {
        sortPairs: true,
    });
    const merkleRoot = merkletree.getRoot();
    console.log(merkleRoot);
    // update root
    await result.TD606.updateRoot(merkleRoot);

    return {
        ...contracts,
        users,
        deployer: result,
        multisig: await setupUser(multisig, contracts),
        merkletree: merkletree,
    };
});

describe('TD606 Test Suite v2', () => {
    // 01

    it('mints', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        // get proof for user 1
        const proof = merkletree.getHexProof(hashAddress(users[0].address));

        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[0].address,
            royaltyPayout: users[0].address,
            royaltyBPS: 1000,
        };

        await expect(users[0].TD606.mint(inputData, proof))
            .to.emit(TD606, 'Transfer')
            .withArgs(
                '0x0000000000000000000000000000000000000000',
                users[0].address,
                1
            );
    });

    // 02

    it('properly updates', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        // mint token
        const proof = merkletree.getHexProof(hashAddress(users[0].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[0].address,
            royaltyPayout: users[0].address,
            royaltyBPS: 1000,
        };
        const mint = await users[0].TD606.mint(inputData, proof);

        await expect(deployer.TD606.updateMetadataURI(1, 'poopoopeepee'))
            .to.emit(TD606, 'MetadataUpdated')
            .withArgs(1, 'poopoopeepee');
    });

    // 03

    it('properly updates royalty information', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        // mint token
        const proof = merkletree.getHexProof(hashAddress(users[3].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[3].address,
            royaltyPayout: users[3].address,
            royaltyBPS: 1000,
        };
        const mint = await users[3].TD606.mint(inputData, proof);
        await deployer.TD606.updateRoyaltyInfo(1, users[6].address);

        await expect((await TD606.royaltyPayoutAddress(1)).toString())
            .to.equal(users[6].address)
            .toString();
    });

    // 04
    it('burns token', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        //mint token
        const proof = merkletree.getHexProof(hashAddress(users[5].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[5].address,
            royaltyPayout: users[5].address,
            royaltyBPS: 2000,
        };
        const mint = await users[5].TD606.mint(inputData, proof);
        const mint2 = await users[5].TD606.mint(inputData, proof);
        const mint3 = await users[5].TD606.mint(inputData, proof);
        const mint4 = await users[5].TD606.mint(inputData, proof);

        const burn = await users[5].TD606.burn(3);
        await expect(TD606.tokenURI(3)).to.be.revertedWith(
            'ERC721Metadata: URI query for nonexistent token'
        );
    });

    // 05
    it('retrieves tokenURI correctly', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        //mint token
        const proof = merkletree.getHexProof(hashAddress(users[2].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[2].address,
            royaltyPayout: users[2].address,
            royaltyBPS: 2000,
        };
        const inputData2: TokenData = {
            metadataURI: 'https://catalog.works/metadata/peepeepoopoo',
            contentURI: 'http://catalog.works/content/peepeepoopoo',
            creator: users[2].address,
            royaltyPayout: users[2].address,
            royaltyBPS: 5000,
        };
        const mint = await users[2].TD606.mint(inputData, proof);
        const mint2 = await users[2].TD606.mint(inputData, proof);
        const mint3 = await users[2].TD606.mint(inputData2, proof);
        const mint4 = await users[2].TD606.mint(inputData, proof);

        await expect((await deployer.TD606.tokenURI(3)).toString()).to.equal(
            'https://catalog.works/metadata/peepeepoopoo'
        );
    });

    // 06
    it('transfers a token between users', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        //mint token
        const proof = merkletree.getHexProof(hashAddress(users[4].address));
        const proof2 = merkletree.getHexProof(hashAddress(users[2].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[4].address,
            royaltyPayout: users[4].address,
            royaltyBPS: 2000,
        };
        const inputData2: TokenData = {
            metadataURI: 'https://catalog.works/metadata/peepeepoopoo',
            contentURI: 'http://catalog.works/content/peepeepoopoo',
            creator: users[2].address,
            royaltyPayout: users[2].address,
            royaltyBPS: 5000,
        };
        const mint = await users[4].TD606.mint(inputData, proof);
        const mint2 = await users[4].TD606.mint(inputData, proof).then(
            (val) => {
                console.log('VAL', val);
            }
        );

        // transfer token
        await users[4].TD606.transferFrom(
            users[4].address,
            users[3].address,
            2
        );

        await expect((await TD606.ownerOf(2)).toString()).to.equal(
            users[3].address
        );
    });

    // 07
    it('returns the correct token contentURI', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();

        //mint token
        const proof = merkletree.getHexProof(hashAddress(users[4].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri/pee',
            creator: users[4].address,
            royaltyPayout: users[4].address,
            royaltyBPS: 2000,
        };

        const mint = await users[4].TD606.mint(inputData, proof);

        // transfer token
        await users[4].TD606.transferFrom(
            users[4].address,
            users[3].address,
            1
        );

        await expect((await TD606.tokenContentURI(1)).toString()).to.equal(
            'http://catalog.works/content/uri/pee'
        );
    });

    // 08
    it('returns the correct creator address of the token', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();
        const proof = merkletree.getHexProof(hashAddress(users[3].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[3].address,
            royaltyPayout: users[3].address,
            royaltyBPS: 5000,
        };

        const mint = await users[3].TD606.mint(inputData, proof);

        await expect((await TD606.creator(1)).toString()).to.equal(
            users[3].address
        );
    });

    // 09
    it('can have contentURI updated by admin', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();
        const proof = merkletree.getHexProof(hashAddress(users[3].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[3].address,
            royaltyPayout: users[3].address,
            royaltyBPS: 8000,
        };

        const mint = await users[3].TD606.mint(inputData, proof);

        await expect((await TD606.tokenContentURI(1)).toString()).to.equal(
            'http://catalog.works/content/uri'
        );

        // update contentURI
        await deployer.TD606.updateContentURI(1, 'poopinandpeeinyeahyeah');

        await expect((await TD606.tokenContentURI(1)).toString()).to.equal(
            'poopinandpeeinyeahyeah'
        );
    });

    // 10
    it('returns correct royalty for EIP2981', async () => {
        const {users, deployer, multisig, merkletree, TD606} = await setup();
        const proof = merkletree.getHexProof(hashAddress(users[3].address));
        const inputData: TokenData = {
            metadataURI: 'https://catalog.works/content/metadata',
            contentURI: 'http://catalog.works/content/uri',
            creator: users[3].address,
            royaltyPayout: users[3].address,
            royaltyBPS: 8000,
        };

        const mint = await users[3].TD606.mint(inputData, proof);

        await expect((await TD606.royaltyInfo(1, 10)).toString()).to.equal(
            [users[3].address, 8].toString()
        );
    });
});
