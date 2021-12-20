// lazy utility to upload metadata to ipfs

import { network } from "hardhat";
// @ts-ignore
const IPFS = require("nano-ipfs-store");

const main = async () => {

    const ipfs = IPFS.at("https://ipfs.infura.io:5001");


    const metadata = JSON.stringify({
        "artist": "COMPUTER DATA",
        "artwork": {
            "info": {
                "mimeType": "image/jpeg",
                "uri": "https://ipfs.io/ipfs/bafybeibyorpckxuwarb7cll5dckaw3hbxc5obhy7sup5aqzuutrmeexexy"
            },
            "isNft": false,
            "nft": null
        },
        "duration": 382.44,
        "mimeType": "audio/aiff",
        "notes": "yeah yeah demo time oh yeah woo yeah\n\n// unreleased COMPUTER DATA 2020",
        "project": null,
        "title": "demo118",
        "name": "COMPUTER DATA - demo118",
        "trackNumber": null,
        "version": "catalog-test",
        "visualizer": null,
        "animation_url": "https://bafybeifrgmpchfijwyrtcpxnv633tkab7ut7geqfnkc3vu2nfcnwxoi5em.ipfs.dweb.link/",
        "audio_url": "https://bafybeifrgmpchfijwyrtcpxnv633tkab7ut7geqfnkc3vu2nfcnwxoi5em.ipfs.dweb.link/",
        "image": "https://bafybeibyorpckxuwarb7cll5dckaw3hbxc5obhy7sup5aqzuutrmeexexy.ipfs.dweb.link/",
        "origin": {
            "algorithm": "secp256k1",
            "encoding": "rlp",
            "signature": "0xb018be74577f6520ba2b5ddaad72ef5f5cecb2e5fbce7ccdef71ca3005dcc2b5564d17098a85d0623f0f2922468f6b800bee33d857042af90b56dcf260eb86811b",
            "publicKey": "0x0CcCcDAd491D8255d19475d4cC18c954AE185b0e"
        }
    });
    // const metadata = JSON.stringify({
    //     "artist": "COMPUTER DATA",
    //     "artwork": {
    //         "info": {
    //             "mimeType": "image/jpeg",
    //             "uri": "https://ipfs.io/ipfs/bafybeidcfq7znhvyqvhrc5ahmeoqouagetseqoa6tvz6c4uzjzsmcdjz6y"
    //         },
    //         "isNft": false,
    //         "nft": null
    //     },
    //     "duration": 436.416,
    //     "mimeType": "audio/wav",
    //     "notes": "some unfinished recording \n// tb303\n//armk2\n//p6\n//digitone",
    //     "project": null,
    //     "title": "abmao",
    //     "trackNumber": null,
    //     "version": "catalog-test",
    //     "visualizer": null,
    //     "animation_url": "https://bafybeie7xf47lf7yibiacit6sfhx73tqtjwf5crvngrmnzpvkjcjjghxqq.ipfs.dweb.link/",
    //     "audio_url": "https://bafybeie7xf47lf7yibiacit6sfhx73tqtjwf5crvngrmnzpvkjcjjghxqq.ipfs.dweb.link/",
    //     "image": "https://ipfs.io/ipfs/bafybeidcfq7znhvyqvhrc5ahmeoqouagetseqoa6tvz6c4uzjzsmcdjz6y",
    //     "origin": {
    //         "algorithm": "secp256k1",
    //         "encoding": "rlp",
    //         "signature": "0xb018be74577f6520ba2b5ddaad72ef5f5cecb2e5fbce7ccdef71ca3005dcc2b5564d17098a85d0623f0f2922468f6b800bee33d857042af90b56dcf260eb86811b",
    //         "publicKey": "0x0CcCcDAd491D8255d19475d4cC18c954AE185b0e"
    //     }
    // });

    // const metadata = JSON.stringify({
    //         "artist": "COMPUTER DATA",
    //         "artwork": {
    //             "info": {
    //                 "mimeType": "image/jpeg",
    //                 "uri": "https://ipfs.io/ipfs/bafybeib6txkazlatmdp3kwmxh6cs5ik72zxirji6bgbyok6mockto46h5i"
    //             },
    //             "isNft": false,
    //             "nft": null
    //         },
    //         "duration": 521.064,
    //         "mimeType": "audio/aiff",
    //         "notes": "ambient composition\n// recorded in my living room. 03.21\n\n\nforthcoming on pure bread records. TEST METADATA",
    //         "project": null,
    //         "title": "LRA",
    //         "trackNumber": null,
    //         "version": "catalog-test",
    //         "visualizer": null,
    //         "animation_url": "https://ipfs.io/ipfs/bafybeidgyewm2iflzvpil5hfceo2i63tjub64n5etzhwxv2bl52bshxn54",
    //         "audio_url": "https://ipfs.io/ipfs/bafybeidgyewm2iflzvpil5hfceo2i63tjub64n5etzhwxv2bl52bshxn54",
    //         "image": "https://ipfs.io/ipfs/bafybeib6txkazlatmdp3kwmxh6cs5ik72zxirji6bgbyok6mockto46h5i",
    //         "origin": {
    //             "algorithm": "secp256k1",
    //             "encoding": "rlp",
    //             "signature": "0x75668cdc093c359a3aef90e877f5f4fb0be1c13b70cf0673538b45a00115f5b952040619d80670b60faa4ce6340027d10ac198e81a26c80b7eaf059aec30ff231b",
    //             "publicKey": "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
    //         }
    // });

    const cid = await ipfs.add(metadata);

    console.log('\n \n ','cid:', '\x1b[33m', cid, '\x1b[0m');
    console.log(await ipfs.cat(cid));

    

}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
});

