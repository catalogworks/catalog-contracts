// CFR.test.ts
// Unit test suite for CFT Contract
// Uses Mocha / Chai

import {expect} from 'chai';
import '@nomiclabs/hardhat-ethers';
import {
    deployments,
    ethers,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';
import keccak256 from 'keccak256';

import {CFR} from '../types/typechain';
import MerkleTree from 'merkletreejs';
import {BigNumberish} from '@ethersproject/bignumber';
import {setupUser, setupUsers} from './utils';
import {utils} from 'ethers';

function hashAddress(address: string) {
    return ethers.utils.solidityKeccak256(['address'], [address]);
}

type TokenData = {
    creator: string;
    royaltyPayout: string;
    contentURI: string;
    metadataURI: string;
    royaltyBPS: BigNumberish;
};

const setup = deployments.createFixture(async () => {
    await deployments.fixture('CFR');
    const {deployer, tokenOwner, multisig} = await getNamedAccounts();

    const contracts = {
        CFR: <CFR>await ethers.getContract('CFR'),
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
    await result.CFR.updateRoot(merkleRoot);

    return {
        ...contracts,
        users,
        deployer: result,
        multisig: await setupUser(multisig, contracts),
        merkletree: merkletree,
    };
});

describe('CFR Test Suite', () => {
    // 01

    describe('Minting', () => {
        // 01
        it('mints token', async () => {
            const {users, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                creator: users[0].address,
                royaltyPayout: users[0].address,
                contentURI: 'https://catalog.works/content/uri',
                metadataURI: 'https://catalog.works/metadata/uri',
                royaltyBPS: 5000,
            };

            await expect(users[0].CFR.mint(inputTokenData, proof))
                .to.emit(CFR, 'Transfer')
                .withArgs(
                    '0x0000000000000000000000000000000000000000',
                    users[0].address,
                    1
                );
        });

        // 02
        it('fails to mint for invalid creator proof', async () => {
            const {users, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[5].address));
            const inputTokenData: TokenData = {
                creator: users[6].address,
                royaltyPayout: users[6].address,
                contentURI: 'https://catalog.works/content/uri',
                metadataURI: 'https://catalog.works/metadata/uri',
                royaltyBPS: 5000,
            };

            await expect(
                users[5].CFR.mint(inputTokenData, proof)
            ).to.be.revertedWith('!valid proof');
        });

        // 03
        it('reverts if royaltyBPS is >= 10k', async () => {
            const {users, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                creator: users[0].address,
                royaltyPayout: users[0].address,
                contentURI: 'https://catalog.works/content/uri',
                metadataURI: 'https://catalog.works/metadata/uri',
                royaltyBPS: 10000,
            };

            await expect(
                users[0].CFR.mint(inputTokenData, proof)
            ).to.be.revertedWith('royalty !< 10000');
        });
    });

    describe('burning', () => {
        // 01
        it('burns token from admin account', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };
            await users[0].CFR.mint(inputTokenData, proof);
            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(deployer.CFR.burn(1))
                .to.emit(CFR, 'Transfer')
                .withArgs(
                    users[0].address,
                    '0x0000000000000000000000000000000000000000',
                    1
                );
            await expect(await CFR.ownerOf(2)).to.eq(users[0].address);
        });

        // 02
        it('does not allow non-creator or non-admin to burn', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[2].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[2].address,
                royaltyPayout: users[2].address,
                royaltyBPS: 5000,
            };

            await users[1].CFR.mint(inputTokenData, proof);

            await expect(await CFR.ownerOf(1)).to.eq(users[1].address);
            await expect(users[1].CFR.burn(1)).to.be.revertedWith(
                'Only creator or Admin'
            );
        });

        // 03
        it('burns from creator account', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[2].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[2].address,
                royaltyPayout: users[2].address,
                royaltyBPS: 5000,
            };

            await users[1].CFR.mint(inputTokenData, proof);

            await expect(await CFR.ownerOf(1)).to.eq(users[1].address);
            await expect(
                users[1].CFR.transferFrom(users[1].address, users[2].address, 1)
            )
                .to.emit(CFR, 'Transfer')
                .withArgs(users[1].address, users[2].address, 1);
            await expect(users[2].CFR.burn(1))
                .to.emit(CFR, 'Transfer')
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
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            const tx = await users[0].CFR.mint(inputTokenData, proof);
            tx.wait();
            expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(
                deployer.CFR.updateContentURI(
                    1,
                    'https://catalog.works/content/uri2'
                )
            )
                .to.emit(CFR, 'ContentUpdated')
                .withArgs(1, 'https://catalog.works/content/uri2');

            await expect(await CFR.tokenContentURI(1)).to.eq(
                'https://catalog.works/content/uri2'
            );
        });

        it('only allows the admin to update the content uri', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.creator(1)).to.eq(users[0].address);

            await expect(
                users[0].CFR.updateContentURI(
                    1,
                    'https://catalog.works/content/uri2'
                )
            ).to.be.revertedWith('Ownable: caller is not the owner');

            await expect(await CFR.tokenContentURI(1)).to.eq(
                'https://catalog.works/content/uri'
            );
        });
    });

    describe('updating metadata', () => {
        // 01
        it('updates the metadataURI from an admin account', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(
                deployer.CFR.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            )
                .to.emit(CFR, 'MetadataUpdated')
                .withArgs(1, 'https://catalog.works/metadata/uri2');

            await expect(await CFR.tokenURI(1)).to.eq(
                'https://catalog.works/metadata/uri2'
            );
        });

        // 02
        it('allows the creator to update the metadataURI', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[3].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[3].address,
                royaltyPayout: users[3].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);
            await expect(await CFR.creator(1)).to.eq(users[3].address);

            await expect(
                users[3].CFR.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            )
                .to.emit(CFR, 'MetadataUpdated')
                .withArgs(1, 'https://catalog.works/metadata/uri2');

            await expect(await CFR.tokenURI(1)).to.eq(
                'https://catalog.works/metadata/uri2'
            );
        });

        // 03
        it('only allows creator/admin to update metadataURI', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[3].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[3].address,
                royaltyPayout: users[3].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);
            await expect(await CFR.creator(1)).to.eq(users[3].address);

            await expect(
                users[0].CFR.updateMetadataURI(
                    1,
                    'https://catalog.works/metadata/uri2'
                )
            ).to.be.revertedWith('!creator/admin');
        });
    });

    describe('updating royalty payout address', () => {
        // 01
        it('allows an admin account to update payout address', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(deployer.CFR.updateRoyaltyInfo(1, users[1].address))
                .to.emit(CFR, 'RoyaltyUpdated')
                .withArgs(1, users[1].address);

            expect(await CFR.royaltyPayoutAddress(1)).to.equal(
                users[1].address
            );

            const res = await CFR.royaltyInfo(1, 100);
            expect(res.receiver).to.equal(users[1].address);
            expect(res.royaltyAmount).to.equal({
                _hex: utils.hexValue(50),
                _isBigNumber: true,
            });
        });

        it('does not allow non admin to update payout address', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.creator(1)).to.eq(users[0].address);

            await expect(
                users[0].CFR.updateRoyaltyInfo(1, users[1].address)
            ).to.be.revertedWith('Ownable: caller is not the owner');

            await expect(await CFR.royaltyPayoutAddress(1)).to.equal(
                users[0].address
            );
        });
    });

    describe('updateRoot', () => {
        // 01
        it('allows an admin account to update the root', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const newLeafs = [
                users[0].address,
                users[1].address,
                users[2].address,
            ];
            const newTree = new MerkleTree(Object.values(newLeafs), keccak256, {
                sortPairs: true,
            });
            const newRoot = newTree.getHexRoot();

            await expect(deployer.CFR.updateRoot(newRoot))
                .to.emit(CFR, 'merkleRootUpdated')
                .withArgs(newRoot);
            await expect(await CFR.merkleRoot()).to.eq(newRoot);

            // await expect(await deployer.CFR.updateRoot(newRoot)).to.emit(CFR, 'merkleRootUpdated').withArgs(newRoot);
        });
        // 02
        it('does not allow non admin to update the root', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const newLeafs = [
                users[0].address,
                users[1].address,
                users[2].address,
            ];
            const newTree = new MerkleTree(Object.values(newLeafs), keccak256, {
                sortPairs: true,
            });
            const newRoot = newTree.getHexRoot();

            await expect(users[0].CFR.updateRoot(newRoot)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });
    });

    describe('updateCreator', () => {
        it('allows admin to update creator', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(deployer.CFR.updateCreator(1, users[1].address))
                .to.emit(CFR, 'CreatorUpdated')
                .withArgs(1, users[1].address);

            expect(await CFR.creator(1)).to.equal(users[1].address);
        });

        it('reverts with non-admin attempt', async () => {
            const {users, deployer, merkletree, CFR} = await setup();
            const proof = merkletree.getHexProof(hashAddress(users[0].address));
            const inputTokenData: TokenData = {
                metadataURI: 'https://catalog.works/metadata/uri',
                contentURI: 'https://catalog.works/content/uri',
                creator: users[0].address,
                royaltyPayout: users[0].address,
                royaltyBPS: 5000,
            };

            await users[0].CFR.mint(inputTokenData, proof);
            await expect(await CFR.ownerOf(1)).to.eq(users[0].address);

            await expect(
                users[0].CFR.updateCreator(1, users[1].address)
            ).to.be.revertedWith('Ownable: caller is not the owner');
        });
    });
});
