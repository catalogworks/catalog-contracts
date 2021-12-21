// tree.ts
// utility to generate merkle tree
// prints root and proof 
// can use to input on etherscan or other tools
import hre from 'hardhat';
import  keccak256  from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import data from '../artists.json'

async function getInput(): Promise<string> {
    const readline = require('readline');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const prompt = (query: any) => new Promise<string>((resolve) => rl.question(query, resolve));
    
    const address = await prompt('\x1b[33m Input Address (to add to tree, and generate proof): \x1b[0m');
       
    //when done reading prompt exit program 
    rl.on('close', () => {
        return address;
        process.exit(0)
    });

    return address;

}
async function main(inputAddress?: string) {

        console.group(
           '\n \n \x1b[34m','༼ つ ◕_◕ ༽つ the tree utility ༼ つ ◕_◕ ༽つ', '\x1b[0m \n \n',
        );

        let address: string = inputAddress || '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5';

        if (inputAddress) {
            console.log('with input address:', inputAddress);
            address = inputAddress;
        }

        // AHHHHHH I"M MERKLE TREEEEING
        const leavesInput = [
            '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
            '0x1CD4935Eb3d7291b2B0782F9aF7525564D277E7B',
            '0x1cd4935eb3d7291b2b0782f9af7525564d277e7b',
            '0xb0b15521228ca513f168af37c3ea6a400308b64f',
            '0x0d423e07f4b2946ea5590b829636af3218b4c430',
            '0xe75906b48ed2c33e06bf6673340e0fdf20aabb82',
            '0x37b95b2fe82b35b01e475d3578e19614b2a8bef7',
            '0x8d165b4ca6055a9a41b1fe50d1ebaab2efe44385',
            '0x2ed0db8d2870ccac48b1693b9efe4341fedaecb1',
            '0x25a1735D2490F8f6a72874B8d1084E0745DC01f2',
            '0x77BbAC0F9340d5bffa8FDF433AfF3663d87CDbfF',
            inputAddress,
        ];

        if (data) {
            console.log('with artists.json data:', data);
            await leavesInput.push(...data);
        }   
        // make a tree 
        //@ts-ignore
        const leaves = leavesInput.map((x) => keccak256(x));

        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true});
        const root = tree.getHexRoot();

        console.log('tree:', tree.toString());
        console.log('\x1b[36m%s\x1b[0m','root (what you send):', root);

        
        const leaf = await keccak256(address);

        const proof =  tree.getHexProof(leaf);
        console.log('\x1b[33m%s\x1b[0m','proof for address:  (copy the red for etherscan, green for tenderly)');
        console.log('\x1b[36m%s\x1b[0m', `${address}`, '\n \n', '\x1b[31m',  proof.toString(), '\x1b[0m');
        console.log('\n \n', '\x1b[32m',  JSON.stringify(proof), '\x1b[0m');



        return {root, proof};

}


getInput()
.then((val) => {
    main(val).then(() => process.exit(0));
})
.catch((error) => {
    console.error(error);
    process.exit(1);
});