// TR909.test.ts: test suite for TR909

import {expect} from 'chai';
import '@nomiclabs/hardhat-ethers';
import {
    deployments,
    ethers,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';
import keccak256 from 'keccak256';

import {TR909} from '../types/typechain';
import MerkleTree from 'merkletreejs';
import {BigNumberish} from '@ethersproject/bignumber';
import {setupUser, setupUsers} from './utils';
import {utils} from 'ethers';

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
    await deployments.fixture('TR909');
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    const contracts = {
        TR909: <TR909>await ethers.getContract('TR909'),
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
    await result.TR909.updateRoot(merkleRoot);

    return {
        ...contracts,
        users,
        deployer: result,
        multisig: await setupUser(multisig, contracts),
        merkletree: merkletree,
    };
});

describe('TR909 Test Suite', () => {
    // 01

    describe('Minting', () => {
        // 01
        it('mints token', async () => {
            const {users, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await expect(users[0].TR909.mint(inputTokenData, proof))
                .to.emit(TR909, 'Transfer')
                .withArgs(
                    '0x0000000000000000000000000000000000000000',
                    users[0].address,
                    1
                );
        });

        // 02
        it('fails to mint for invalid creator proof', async () => {
            const {users, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[5].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[6].address,
                royaltyPayout: users[6].address,
                royaltyBPS: 5000,
            };

            await expect(
                users[5].TR909.mint(inputTokenData, proof)
            ).to.be.revertedWith('!proof');
        });
    });

    describe('burning', () => {
        // 01
        it('burns token from admin account', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };
            await users[0].TR909.mint(inputTokenData, proof);
            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);

            await expect(deployer.TR909.burn(1))
                .to.emit(TR909, 'Transfer')
                .withArgs(
                    users[0].address,
                    '0x0000000000000000000000000000000000000000',
                    1
                );
            await expect(await TR909.ownerOf(2)).to.eq(users[0].address);
        });

        // 02
        it('does not allow non-creator or non-admin to burn', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[2].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[2].address,
                royaltyPayout: users[2].address,
                royaltyBPS: 5000,
            };

            await users[1].TR909.mint(inputTokenData, proof);

            await expect(await TR909.ownerOf(1)).to.eq(users[1].address);
            await expect(users[1].TR909.burn(1)).to.be.revertedWith(
                'Only creator or Admin'
            );
        });

        // 03
        it('burns from creator account', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[2].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[2].address,
                royaltyPayout: users[2].address,
                royaltyBPS: 5000,
            };

            await users[1].TR909.mint(inputTokenData, proof);

            await expect(await TR909.ownerOf(1)).to.eq(users[1].address);
            await expect(
                users[1].TR909.transferFrom(
                    users[1].address,
                    users[2].address,
                    1
                )
            )
                .to.emit(TR909, 'Transfer')
                .withArgs(users[1].address, users[2].address, 1);
            await expect(users[2].TR909.burn(1))
                .to.emit(TR909, 'Transfer')
                .withArgs(
                    users[2].address,
                    '0x0000000000000000000000000000000000000000',
                    1
                );
        });
    });

    describe('updating content', () => {
        // 01
        it('updates the contentURI from an admin account', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);

            await expect(
                deployer.TR909.updateContentURI(
                    1,
                    'https://catalog.works/content/uri2'
                )
            )
                .to.emit(TR909, 'ContentUpdate')
                .withArgs(1, 'https://catalog.works/content/uri2');

            await expect(await TR909.tokenContentURI(1)).to.eq(
                'https://catalog.works/content/uri2'
            );
        });

        it('only allows the admin to update the content uri', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.creator(1)).to.eq(users[0].address);

            await expect(
                users[0].TR909.updateContentURI(
                    1,
                    'https://catalog.works/content/uri2'
                )
            ).to.be.revertedWith('!admin');

            await expect(await TR909.tokenContentURI(1)).to.eq(
                'https://catalog.works/content/uri'
            );
        });
    });

    describe('updating metadata', () => {
        // 01
        it('updates the metadataURI from an admin account', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);

            await expect(
                deployer.TR909.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            )
                .to.emit(TR909, 'MetadataUpdate')
                .withArgs(1, 'https://catalog.works/metadata/uri2');

            await expect(await TR909.tokenURI(1)).to.eq(
                'https://catalog.works/metadata/uri2'
            );
        });

        // 02
        it('allows the creator to update the metadataURI', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[3].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[3].address,
                royaltyPayout: users[3].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);
            await expect(await TR909.creator(1)).to.eq(users[3].address);

            await expect(
                users[3].TR909.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            )
                .to.emit(TR909, 'MetadataUpdate')
                .withArgs(1, 'https://catalog.works/metadata/uri2');

            await expect(await TR909.tokenURI(1)).to.eq(
                'https://catalog.works/metadata/uri2'
            );
        });

        // 03
        it('only allows creator/admin to update metadataURI', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[3].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[3].address,
                royaltyPayout: users[3].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);
            await expect(await TR909.creator(1)).to.eq(users[3].address);

            await expect(
                users[0].TR909.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            ).to.be.revertedWith('!admin');
        });
    });

    describe('updating royalty payout address', () => {
        // 01
        it('allows an admin account to update payout address', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.ownerOf(1)).to.eq(users[0].address);

            await expect(deployer.TR909.updateRoyaltyInfo(1, users[1].address))
                .to.emit(TR909, 'RoyaltyUpdate')
                .withArgs(1, users[1].address);

            expect(await TR909.royaltyPayoutAddress(1)).to.equal(
                users[1].address
            );

            const res = await TR909.royaltyInfo(1, 100);
            expect(res.receiver).to.equal(users[1].address);
            expect(res.royaltyAmount).to.equal({
                _hex: utils.hexValue(50),
                _isBigNumber: true,
            });
        });

        it('does not allow non admin to update payout address', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].TR909.mint(inputTokenData, proof);
            await expect(await TR909.creator(1)).to.eq(users[0].address);

            await expect(
                users[0].TR909.updateRoyaltyInfo(1, users[1].address)
            ).to.be.revertedWith('!admin');

            await expect(await TR909.royaltyPayoutAddress(1)).to.equal(
                users[0].address
            );
        });
    });

    describe('updateRoot', () => {
        // 01
        it('allows an admin account to update the root', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const newLeafs = [
                users[0].address,
                users[1].address,
                users[2].address,
            ];
            const newTree = new MerkleTree(Object.values(newLeafs), keccak256, {
                sortPairs: true,
            });
            const newRoot = newTree.getHexRoot();

            await deployer.TR909.updateRoot(newRoot);
            await expect(await TR909.merkleRoot()).to.eq(newRoot);

            // await expect(await deployer.TR909.updateRoot(newRoot)).to.emit(TR909, 'merkleRootUpdated').withArgs(newRoot);
        });
        // 02
        it('does not allow non admin to update the root', async () => {
            const {users, deployer, merkletree, TR909} = await setup();
            const newLeafs = [
                users[0].address,
                users[1].address,
                users[2].address,
            ];
            const newTree = new MerkleTree(Object.values(newLeafs), keccak256, {
                sortPairs: true,
            });
            const newRoot = newTree.getHexRoot();

            await expect(users[0].TR909.updateRoot(newRoot)).to.be.revertedWith(
                '!admin'
            );
        });
    });
});
