// lazy utility to upload metadata to ipfs

import {network} from 'hardhat';
// @ts-ignore
const IPFS = require('nano-ipfs-store');

const main = async () => {
    const ipfs = IPFS.at('https://ipfs.infura.io:5001');

    const metadata = JSON.stringify({
        version: 'catalog-20210202',
        title: 'bd-demo',
        artist: 'COMPUTER DATA',
        description:
            "//ahhh i'm testing\n//mint mint mint\nyeah yeah yeah\n\n// demo, 2020",
        duration: 443.136,
        mimeType: 'audio/aiff',
        trackNumber: 1,
        project: {
            title: 'bd-demo',
            artwork: {
                uri: 'https://ipfs.io/ipfs/bafybeidlv23kqneb7m6mw3a5jw6wr7pgiheflt3x3sadi3zvy3tlw7j6xi',
                mimeType: 'image/png',
                externalUrl: 'https://zora.co/....',
                nft: null,
            },
            numTracks: 1,
            type: ['EP', 'Single'],
            releaseDate: 'DateTime ISO8601 (or sumn)',
            recordLabel: 'pure bread records',
            publisher: 'pure bread records',
            compilation: false,
        },
        artwork: {
            uri: 'https://ipfs.io/ipfs/bafybeidlv23kqneb7m6mw3a5jw6wr7pgiheflt3x3sadi3zvy3tlw7j6xi',
            mimeType: 'image/png',
            externalUrl: 'https://zora.co/....',
            nft: {
                chainId: 4,
                contractAddress: '0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4',
                tokenId: 5313,
            },
        },
        visualizer: {
            uri: 'https://ipfs.io/ipfs/bafybeiavcox6ardvpxlmktkg4dw36dihtfho4ghhagjycniazvf5np66ta',
            mimeType: 'video/quicktime',
            nft: null,
        },
        genre: 'techno',
        tags: ['string'],
        lyrics: 'string',
        bpm: '130',
        key: '4A',
        language: 'Deutsch',
        license: 'n/a',
        isrc: 'peeandpoo',
        locationCreated: 'San Francisco, CA',
        recordedAt: 'Undisclosed Location, San Francisco, CA',
        releaseDate: 'DateTime ISO8601 (or sumn)',
        recordLabel: 'pure bread records',
        isFamilyFriendly: true,
        credits: {
            collaborators: ['none'],
            composers: ['Brett Henderson'],
            performers: ['Brett Henderson'],
            producers: ['Brett Henderson'],
            mixedBy: ['Brett Henderson'],
            masteredBy: ['Brett Henderson'],
        },
        links: ['https://open.spotify.com/artist/5wwnitxvqbrtiGk3QW3BuN'],

        losslessAudio:
            'bafybeihl43fjf5ns5bk3odbegn6u74ysme5hhkl2o3yekfhm3hkqipkx6q',
        lossyAudio:
            'bafybeigmr5pf2nuaqozhkma7xw2oedhhm6xkgwofoedxwjjo3w5zxdzixe',
        samples: [],
        software: [],
        instruments: ['TB-303', 'TR-909'],
        isRemix: false,
        originalSong: '',
        notes: "//ahhh i'm testing\n//mint mint mint\nyeah yeah yeah\n\n// demo, 2020",
        additionalMedia: [],
        thumbnail:
            'bafybeigo26pdxfplxkuyaoprzmqrt4tuoxas2ahiag45ybwfltdgjglid4',
        image: 'https://bafybeidlv23kqneb7m6mw3a5jw6wr7pgiheflt3x3sadi3zvy3tlw7j6xi.ipfs.dweb.link',
        name: 'COMPUTER DATA - bd-demo',
        external_url: 'https://catalog.works/<contract>/<tokenId>',
        animation_url:
            'https://bafybeigmr5pf2nuaqozhkma7xw2oedhhm6xkgwofoedxwjjo3w5zxdzixe.ipfs.dweb.link',
        attributes: [
            {
                trait_type: 'Track Title',
                value: 'bd-demo',
            },
            {
                trait_type: 'Artist',
                value: 'COMPUTER DATA',
            },
            {
                trait_type: 'Album',
                value: 'bd-demo',
            },
            {
                trait_type: 'BPM',
                value: '130',
            },
            {
                trait_type: 'Key',
                value: '4A',
            },
        ],
    });

    // const metadata = JSON.stringify({
    //     "version": "catalog-20210202",
    //     "title": "drei",
    //     "artist": "COMPUTER DATA",
    //     "description": null,
    //     "duration": 434.103,
    //     "mimeType": "audio/wav",
    //     "trackNumber": 1,
    //     "project": {
    //         "title": "drei EP",
    //         "artwork": {
    //                 "uri": "https://ipfs.io/ipfs/bafybeifp645k6sact5i6oqjs7tbxfxlx6svdtskip75swyed5j7qy5zvey",
    //                 "mimeType": "image/jpeg",
    //                 "externalUrl": "https://zora.co/....",
    //                 "nft": null
    //             },
    //               "numTracks": 1,
    //               "type": ["EP", "Single"],
    //               "releaseDate": "DateTime ISO8601 (or sumn)",
    //               "recordLabel": "pure bread records",
    //               "publisher": "pure bread records",
    //               "compilation": false
    //     },
    //     "artwork": {
    //         "uri": "https://ipfs.io/ipfs/bafybeifp645k6sact5i6oqjs7tbxfxlx6svdtskip75swyed5j7qy5zvey",
    //         "mimeType": "image/jpeg",
    //         "externalUrl": "https://zora.co/....",
    //         "nft": {
    //             "chainId": 4,
    //             "contractAddress": "0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4",
    //             "tokenId": 5299
    //         }
    //     },
    //     "visualizer": {
    //          "uri": "https://ipfs.io/ipfs/bafybeiavcox6ardvpxlmktkg4dw36dihtfho4ghhagjycniazvf5np66ta",
    //           "mimeType": "video/quicktime",
    //           "nft": null
    //     },
    //       "genre": "acid house",
    //       "tags": ["string"],
    //       "lyrics": "string",
    //       "bpm": "125",
    //       "key": "9A",
    //       "language": "Deutsch",
    //       "license": "n/a",
    //       "isrc": "peeandpoo",
    //       "locationCreated": "San Francisco, CA",
    //       "recordedAt": "Undisclosed Location, San Francisco, CA",
    //       "releaseDate": "DateTime ISO8601 (or sumn)",
    //       "recordLabel": "pure bread records",
    //       "isFamilyFriendly": true,
    //       "credits": {
    //               "collaborators": ["none"],
    //               "composers": ["Brett Henderson"],
    //               "performers": ["Brett Henderson"],
    //               "producers": ["Brett Henderson"],
    //               "mixedBy": ["Brett Henderson"],
    //               "masteredBy": ["Brett Henderson"]
    //       },
    //       "links": [
    //           "https://soundcloud.com/computerdata/drei-r0-sm",
    //           "https://open.spotify.com/artist/5wwnitxvqbrtiGk3QW3BuN"
    //       ],

    //       "losslessAudio": "bafybeihzo6jqtu2czrxpx6uacf2j4p6e4rxofqyt4gtzwaqoivl4tbcz4q",
    //       "lossyAudio": "bafybeielmpl4qtsxcy2554ox4hjq47ow7xxqwcmy2b2zmc26g5nsct3l5e",
    //       "samples": [],
    //       "software": [],
    //       "instruments": [
    //           "TB-303",
    //           "TR-909"
    //       ],
    //       "isRemix": false,
    //       "originalSong": "",
    //       "notes": "// big acid\n// unreleased 2019, COMPUTER DATA\n\n// pure bread records",
    //       "additionalMedia": [],
    //       "thumbnail": "bafybeidw4krjfnbgdo75ascepkpkjr4nldo7yyrmprq4jzmrlom7nbueey",
    //       "image": "https://bafybeifp645k6sact5i6oqjs7tbxfxlx6svdtskip75swyed5j7qy5zvey.ipfs.dweb.link",
    //       "name": "drei",
    //       "external_url": "https://catalog.works/<contract>/<tokenId>",
    //       "animation_url": "https://bafybeielmpl4qtsxcy2554ox4hjq47ow7xxqwcmy2b2zmc26g5nsct3l5e.ipfs.dweb.link",
    //       "attributes": [
    //           {
    //               "trait_type": "Track Title",
    //               "value": "drei"
    //           },
    //           {
    //               "trait_type": "Artist",
    //               "value": "COMPUTER DATA"
    //           },
    //           {
    //               "trait_type": "Album",
    //               "value": "drei"
    //           },
    //           {
    //               "trait_type": "BPM",
    //               "value": "125"
    //           },
    //           {
    //               "trait_type": "Key",
    //               "value": "9A"
    //           }

    //       ]
    //   });

    // const metadata = JSON.stringify({
    //     "artist": "COMPUTER DATA",
    //     "artwork": {
    //         "info": {
    //             "mimeType": "image/jpeg",
    //             "uri": "https://ipfs.io/ipfs/bafybeibyorpckxuwarb7cll5dckaw3hbxc5obhy7sup5aqzuutrmeexexy"
    //         },
    //         "isNft": false,
    //         "nft": null
    //     },
    //     "duration": 382.44,
    //     "mimeType": "audio/aiff",
    //     "notes": "yeah yeah demo time oh yeah woo yeah\n\n// unreleased COMPUTER DATA 2020",
    //     "project": null,
    //     "title": "demo118",
    //     "name": "COMPUTER DATA - demo118",
    //     "trackNumber": null,
    //     "version": "catalog-test",
    //     "visualizer": null,
    //     "animation_url": "https://bafybeifrgmpchfijwyrtcpxnv633tkab7ut7geqfnkc3vu2nfcnwxoi5em.ipfs.dweb.link/",
    //     "audio_url": "https://bafybeifrgmpchfijwyrtcpxnv633tkab7ut7geqfnkc3vu2nfcnwxoi5em.ipfs.dweb.link/",
    //     "image": "https://bafybeibyorpckxuwarb7cll5dckaw3hbxc5obhy7sup5aqzuutrmeexexy.ipfs.dweb.link/",
    //     "origin": {
    //         "algorithm": "secp256k1",
    //         "encoding": "rlp",
    //         "signature": "0xb018be74577f6520ba2b5ddaad72ef5f5cecb2e5fbce7ccdef71ca3005dcc2b5564d17098a85d0623f0f2922468f6b800bee33d857042af90b56dcf260eb86811b",
    //         "publicKey": "0x0CcCcDAd491D8255d19475d4cC18c954AE185b0e"
    //     }
    // });
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

    console.log('\n \n ', 'cid:', '\x1b[33m', cid, '\x1b[0m');
    console.log(await ipfs.cat(cid));
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
