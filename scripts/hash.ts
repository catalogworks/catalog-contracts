
import { ethers, network } from "hardhat";
import  keccak256  from 'keccak256'





const hashy = async () => {

    console.group(
        '\n \n \x1b[36m','(▀̿Ĺ̯▀̿ ̿) the hash utility (▀̿Ĺ̯▀̿ ̿)', '\x1b[0m \n \n',
    );

    const inputString = 'A NEW ERA';
    const hashed = await keccak256(inputString);
    const clean = await ethers.utils.hexlify(hashed);
    console.log('\x1b[37m','inputString: ', inputString, '\x1b[0m');
    console.log('\x1b[37m','hashed: ', clean.toString(), '\x1b[0m');



    return hashed.toString();
}


hashy().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
});
