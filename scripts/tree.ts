// tree.ts
// utility to generate merkle tree

import{ ethers} from 'hardhat'
import { keccak256 } from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { argv } from 'process';

async function main(address?: string ) {


        // make a tree 
        const leaves = [
            '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
            '0x1CD4935Eb3d7291b2B0782F9aF7525564D277E7B',
            // address?.toString(),           
        ].map((x) => ethers.utils.keccak256(x));

        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true});
        const root = tree.getHexRoot();

        console.log('tree:', tree);
        console.log('\x1b[36m%s\x1b[0m','root (what you send):', root);

        if (address) {
            const proof = tree.getHexProof(address);
            console.log('\x1b[33m%s\x1b[0m','proof for address:', proof);
        }

        return root;
}

main(argv[0])
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });