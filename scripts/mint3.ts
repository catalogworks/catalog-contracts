// 2nd Script for minting tokens on a live network (test)
// usage: npx hardhat run scripts/mint2.ts --network [network]

import {
    deployments,
    ethers,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';
import keccak256 from 'keccak256';

import {CatalogUUPS, CatalogUUPS__factory} from '../types/typechain';
import MerkleTree from 'merkletreejs';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {BigNumber, BigNumberish} from '@ethersproject/bignumber';
import {setupUser, setupUsers} from '../test/utils';
import {utils} from 'ethers';

type TokenData = {
    metadataURI: string;
    creator: string;
    royaltyPayout: string;
    royaltyBPS: BigNumberish;
};

type ContentData = {
    contentURI: string;
    contentHash: string;
};

function hashAddress(address: string) {
    return ethers.utils.solidityKeccak256(['address'], [address]);
}

const setup = async () => {
    const {deployer} = await getNamedAccounts();

    // await deployments.fixture(['Catalog'], {fallbackToGlobal: false});
    await deployments.get('CatalogUUPS');

    const contracts = {
        CatalogUUPS: <CatalogUUPS>await ethers.getContract('CatalogUUPS', deployer),
    };
    const users = await setupUsers(await getUnnamedAccounts(), contracts);

    const result = await setupUser(deployer, contracts);
    // const result = await users[0];
    console.log('resultdeployer:', result);

    console.log('\x1b[36m%s\x1b[0m', 'deployer: ', deployer.toString());
    console.log('\x1b[36m%s\x1b[0m', 'GENERATING TREE AND ROOT...');

    // setup tree
    const allowed = [
        result.address,
        '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
        '0x37D6Acea3e5b150968331d272B9cA778781f9cb5',
        '0xDD382e505E92cA8d8575B01593e510Baf74B7566',
        '0xb0b15521228CA513F168aF37c3Ea6a400308B64F',
        '0x77BbAC0F9340d5bffa8FDF433AfF3663d87CDbfF',
        '0x0d423E07F4B2946Ea5590b829636AF3218b4C430',
        '0x25a1735D2490F8f6a72874B8d1084E0745DC01f2',
    ];

    const leafs = allowed.reduce((last, allowedItem) => {
        last[allowedItem] = hashAddress(allowedItem);
        return last;
    }, {} as any);
    console.log(leafs);
    const tree = new MerkleTree(Object.values(leafs), keccak256, {
        sortPairs: true,
    });
    const root = tree.getRoot();
    console.log(root.toLocaleString());
    if (contracts.CatalogUUPS.merkleRoot().toString() !== root.toString()) {
        console.log('make new rooty tooty');
        const gasEstimate = await result.CatalogUUPS.estimateGas.updateRoot(root);
        const paddedEstimate = gasEstimate.mul(110).div(100);
        console.log(
            '\x1b[36m%s\x1b[0m',
            'UPDATING ROOT, GASPAD EST: ',
            paddedEstimate.toString()
        );
        const tx = await result.CatalogUUPS.updateRoot(root, {
            gasLimit: paddedEstimate.toString(),
        });
        tx.wait();
        console.log('ROOT UPDATED', tx);

        console.log(
            '\x1b[36m%s\x1b[0m',
            'PROOF FOR:0x25a1735D2490F8f6a72874B8d1084E0745DC01f2 :: ',
            tree.getHexProof(
                hashAddress('0x25a1735D2490F8f6a72874B8d1084E0745DC01f2')
            )
        );
        console.log(
            '\x1b[36m%s\x1b[0m',
            'PROOF FOR:0x8a5847fd0e592B058c026C5fDc322AEE834B87F5 :: ',
            tree.getHexProof(
                hashAddress('0x8a5847fd0e592B058c026C5fDc322AEE834B87F5')
            )
        );
    }

    return {
        ...contracts,
        deployer: result,
        merkleTree: tree,
        merkleRoot: root,
        allowed,
    };
};

const mintTokens = async () => {
    const {deployer, CatalogUUPS, merkleTree, allowed} = await setup();

    const poop = allowed.map((allowedItem) => {
        console.log(
            '\x1b[36m%s\x1b[0m',
            `proof for: ${allowedItem} ::`,
            merkleTree.getHexProof(hashAddress(allowedItem))
        );
    });

    if (!merkleTree) {
        throw new Error('no merkleTree');
    }
    const proof = await merkleTree.getHexProof(
        hashAddress('0x8a5847fd0e592B058c026C5fDc322AEE834B87F5')
    );

    const inputBPS = BigNumber.from(5000);
    const inputData: TokenData = {
        metadataURI:
            'https://bafkreihgrqxdl3g4l2wuahmzmyxp52afzt4tmutpjlh7k66nmaw7fzrlvu.ipfs.dweb.link',
        creator: '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
        royaltyPayout: '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
        royaltyBPS: inputBPS,
    };

    const inputContent: ContentData = {
        contentURI:
            'https://bafybeihl43fjf5ns5bk3odbegn6u74ysme5hhkl2o3yekfhm3hkqipkx6q.ipfs.dweb.link',
        contentHash:
            '0xE1447C16F5DA1173C488CD2D3450415E7677D1E65D28CFA957E96A660FFDEA97',
    };

    try {
        const tx = await deployer.CatalogUUPS.mint(inputData, inputContent, proof);
        tx.wait();
        console.log('\x1b[36m%s\x1b[0m', 'MINTED TOKEN');
        const tx2 = await deployer.CatalogUUPS.mint(inputData, inputContent, proof);
        tx2.wait();
        // console.log('\x1b[36m%s\x1b[0m', 'MINTED TOKEN 2');
        // const tx3 = await deployer.Catalog.mint(inputData, inputContent, proof);
        // tx3.wait();
        // console.log('\x1b[36m%s\x1b[0m', 'MINTED TOKEN 3');
        // const tx4 = await deployer.Catalog.mint(inputData, inputContent, proof);
        // tx4.wait();
        // console.log('\x1b[39m%s\x1b[0m', '(ง ͠° ͟ل͜ ͡°)ง OH YEAH! MINTED TOKEN 4');

        // transfer 2 to creator
        console.log('\n \x1b[31m%s\x1b[0m', '(☞ ͡° ͜ʖ ͡°)☞ GOODBYE!');
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', '(☞ ͡° ͜ʖ ͡°)☞ ERROR: ', e);
        throw e;
    }

    try {
        const tx5 = await deployer.CatalogUUPS.transferFrom(
            deployer.address,
            '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
            2
        );
        tx5.wait();
        console.log('\x1b[36m%s\x1b[0m', 'TRANSFERRED TOKEN #2');
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', '(☞ ͡° ͜ʖ ͡°)☞ ERROR: ', e);
        throw e;
    }
};

mintTokens()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
