// // eip712.ts
// // utility functions for signing transactions with EIP712 (mintWithSig)

// import { BigNumber, BigNumberish, Bytes, Wallet } from 'ethers';
// import { recoverTypedMessage, recoverTypedSignature, signTypedData } from 'eth-sig-util';
// import { bufferToHex, ecrecover, fromRpcSig, pubToAddress } from 'ethereumjs-util';
// import { CTest__factory, CTest } from '../../types/typechain';

// export type EIP712Sig = {
//     deadline: BigNumberish;
//     v: any;
//     r: any;
//     s: any;
// };

// export async function signPermit(owner: Wallet, toAddress: string, tokenAddress: string, tokenId: number, chainId: number ) {

//     return new Promise<EIP712Sig>(async (resolve, reject) => {

//         let nonce;

//         const ctestContract = CTest__factory.connect(tokenAddress, owner);

//         try {

//             nonce = (await ctestContract.permitNonces(owner.address, tokenId)).toNumber();

//         } catch (e) {
//             console.error('nonce error:', e);
//             reject(e);
//             return;
//         }

//         // set deadline to 24 hours from now
//         const deadline = Math.floor(new Date().getTime() / 1000) + (60 * 60 * 24);

//         const name = await ctestContract.name();

//         try {
//             const sig = signTypedData(Buffer.from(owner.privateKey.slice(2), 'hex'), {
//                 data: {
//                     types: {
//                         EIP712Domain: [
//                             { name: 'name', type: 'string' },
//                             { name: 'version', type: 'string' },
//                             { name: 'chainId', type: 'uint256' },
//                             { name: 'verifyingContract', type: 'address' },
//                         ],
//                         Permit: [
//                             { name: 'owner', type: 'address' },
//                             { name: 'tokenId', type: 'uint256' },
//                             { name: 'nonce', type: 'uint256' },
//                             { name: 'deadline', type: 'uint256' },
//                         ],
//                     },
//                     primaryType: 'Permit',
//                     domain: {
//                         name,
//                         version: '1',
//                         chainId,
//                         verifyingContract: ctestContract.address,
//                     },
//                     message: {
//                         spender: toAddress,
//                         tokenId,
//                         nonce,
//                         deadline,
//                     },
//                 },
//             });

//             // response

//             const response = fromRpcSig(sig);
//             // resolve promise
//             resolve({
//                 r: response.r,
//                 s: response.s,
//                 v: response.v,
//                 deadline: deadline.toString(),

//             });

//         } catch (e) {
//             console.error('signPermit error:', e);
//             reject(e);
//         }
//     });
// }

// export async function signMintWithSig(owner: Wallet, tokenAddress: string, creator: string, metadataURI: string, contentURI: string, royaltyBPS: BigNumberish, chainId: number) {

//     return new Promise<EIP712Sig>(async (resolve, reject) => {

//         let nonce;

//         const ctestContract = CTest__factory.connect(tokenAddress, owner);

//         try {

//             nonce = (await ctestContract.mintWithSigNonces(creator)).toNumber();

//         } catch (e) {
//             console.error('nonce error:', e);
//             reject(e);
//             return;
//         }

//         // set deadline to 24 hours from now
//         const deadline = Math.floor(new Date().getTime() / 1000) + (60 * 60 * 24);
//         const name = await ctestContract.name();

//         // sig
//         try {

//             const sig = signTypedData(Buffer.from(owner.privateKey.slice(2), 'hex'), {
//                 data: {
//                     types: {
//                         EIP712Domain: [
//                             { name: 'name', type: 'string' },
//                             { name: 'version', type: 'string' },
//                             { name: 'chainId', type: 'uint256' },
//                             { name: 'verifyingContract', type: 'address' },
//                         ],
//                         MintWithSig: [
//                             { name: 'creator', type: 'address' },
//                             { name: 'metadataURI', type: 'string' },
//                             { name: 'contentURI', type: 'string' },
//                             { name: 'royaltyBPS', type: 'uint256' },
//                             { name: 'nonce', type: 'uint256' },
//                             { name: 'deadline', type: 'uint256' },
//                         ],
//                     },
//                     primaryType: 'MintWithSig',
//                     domain: {
//                         name,
//                         version: '1',
//                         chainId,
//                         verifyingContract: ctestContract.address,
//                     },
//                     message: {
//                         creator,
//                         metadataURI,
//                         contentURI,
//                         royaltyBPS,
//                         nonce,
//                         deadline,
//                     },
//                 },
//             });

//             // response
//             const response = fromRpcSig(sig);

//             // resolve promise
//             resolve({
//                 r: response.r,
//                 s: response.s,
//                 v: response.v,
//                 deadline: deadline.toString(),
//             });

//         } catch (e) {
//             console.error('signMintWithSig error:', e);
//             reject(e);
//         }

//     });
// }
