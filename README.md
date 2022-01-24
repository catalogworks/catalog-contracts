# Catalog Custom Contracts

```
       _..._                                         .-'''-.              
    .-'_..._''.                             .---.   '   _    \            
  .' .'      '.\                            |   | /   /` '.   \           
 / .'                                       |   |.   |     \  '  .--./)   
. '                           .|            |   ||   '      |  '/.''\\    
| |                 __      .' |_     __    |   |\    \     / /| |  | |   
| |              .:--.'.  .'     | .:--.'.  |   | `.   ` ..' /  \`-' /    
. '             / |   \ |'--.  .-'/ |   \ | |   |    '-...-'`   /("'`     
 \ '.          .`" __ | |   |  |  `" __ | | |   |               \ '---.   
  '. `._____.-'/ .'.''| |   |  |   .'.''| | |   |                /'""'.\  
    `-.______ / / /   | |_  |  '.'/ /   | |_'---'               ||     || 
             `  \ \._,\ '/  |   / \ \._,\ '/                    \'. __//  
                 `--'  `"   `'-'   `--'  `"                      `'---'   
```
 

EVM hardhat environment smart contract development project.

____

## Info

Current Implementation of Catalog Shared Creator Contract (cNFT): 
[Catalog.sol](./contracts/catalog/Catalog.sol)
[Docs](./docs/Catalog.md)


### Rinkeby Multisig (Gnosis Safe)

Address: `0xDD382e505E92cA8d8575B01593e510Baf74B7566`

[will have] ownership over ProxyAdmin contract. Used to deploy upgrades to proxied contracts

____


## Current Deployments 

(CNFT V5: Finalized Implementation // CODENAME: "CATALOGV1")

Rinkeby Deployer Address: `0x43C4D51dE4b7bf046d92c324678a1a3969703632`


| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| Catalog Proxy       | 0x86e9dA93658807F8343A8D7B6ABc405d200e566F | [link](https://rinkeby.etherscan.io/address/0x86e9dA93658807F8343A8D7B6ABc405d200e566F)  |
| V1 Implementation | 0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1 | [link](https://rinkeby.etherscan.io/address/0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1)       |
| ProxyAdmin        | 0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9 | [link](https://rinkeby.etherscan.io/address/0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9)       |


Gas Stats (measured at 130 gwei/gas):

- `burn` (40065 avg)
- `mint` (200284 avg) ***ohhhh yeahhhh***
- `updateContentURI` (33054 avg)
- `updateCreator` (35879 avg)
- `updateMetadataURI` (46680 avg)
- `updateRoot` (40947 avg)
- `updateRoyaltyInfo` (35924 avg)
- `transferFrom` (62737 avg)


____

## Past Deployments

Proposed Final Implementation
(CNFT V4: CODENAME "CFR")

| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| CFR Proxy       | 0xF5Dd409E41fAc78B765EDc602226B13C407D6A63 | [link](https://rinkeby.etherscan.io/address/0xF5Dd409E41fAc78B765EDc602226B13C407D6A63)  |
| V1 Implementation | 0x131aC15Fc978695a5736C0AeD6BC26C25528d1c8 | [link](https://rinkeby.etherscan.io/address/0x131aC15Fc978695a5736C0AeD6BC26C25528d1c8)       |
| ProxyAdmin        | 0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9 | [link](https://rinkeby.etherscan.io/address/0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9)       |


Gas Stats (measured at 130 gwei/gas):

- `burn` (40024 avg)
- `mint` (265719 avg)
- `updateContentURI` (45587 avg)
- `updateCreator` (35879 avg)
- `updateMetadataURI` (46702 avg)
- `updateRoot` (40914 avg)
- `updateRoyaltyInfo` (35881 avg)
- `transferFrom` (62759 avg)

(CNFT V1: CODENAME "TD606")

| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| TD606 Proxy       | 0x849880398BD686031Ccb44c2cd00FaC129654b55 | [link](https://rinkeby.etherscan.io/address/0x849880398BD686031Ccb44c2cd00FaC129654b55)  |
| V2 Implementation | 0xab4ae1640757980FA31A1EB66dEdc5a3A8716FAb | [link](https://rinkeby.etherscan.io/address/0xab4ae1640757980FA31A1EB66dEdc5a3A8716FAb)       |
| V1 Implementation | 0xc0F076ED4865E95a19A1EF176508944063b66E84 | [link](https://rinkeby.etherscan.io/address/0xc0F076ED4865E95a19A1EF176508944063b66E84)       |
| ProxyAdmin        | 0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9 | [link](https://rinkeby.etherscan.io/address/0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9)       |

Info: SP1200.sol is an alternative version of the TD606 implementation, it features role based permissions (DEFAULT_ADMIN_ROLE,BURNER,TREE) and a modified burn method control statement. This version was created and deployed to estimate gas differences with changes to the burn function.


(CNFT V1.1: CODENAME "SP1200")

| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| SP1200 Proxy       | 0x8282F72FB844D75BeD48c476e542E812A9a608ba | [link](https://rinkeby.etherscan.io/address/0x8282F72FB844D75BeD48c476e542E812A9a608ba)  |
| V1 Implementation | 0x9Aeee4FC8B4427689eb839521Fe9DaCFa9c849b7 | [link](https://rinkeby.etherscan.io/address/0x9Aeee4FC8B4427689eb839521Fe9DaCFa9c849b7)       |
| ProxyAdmin        | 0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9 | [link](https://rinkeby.etherscan.io/address/0xBEa50aa9a19671E50304B43C2E2AEaAB069870e9)       |

| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| TB303 Proxy       | 0x06318d04f2d8d7b5dffcb0d33e6ce9d99488c3dd | [link](https://rinkeby.etherscan.io/address/0x06318d04f2d8d7b5dffcb0d33e6ce9d99488c3dd#code)  |
| V1 Implementation | 0x6855881b07485129A54CD0D0031974E8936A4F80 | [link](https://rinkeby.etherscan.io/address/0x6855881b07485129a54cd0d0031974e8936a4f80)       |
| V2 Implementation | 0x9c7c7a55d29a176b39e3cf58274F709B8c3E66A1 | [link](https://rinkeby.etherscan.io/address/0x9c7c7a55d29a176b39e3cf58274f709b8c3e66a1)       |
| ProxyAdmin        | 0x1E41AD5EBD826cF719c0a949122589a1f3943282 | [link](https://rinkeby.etherscan.io/address/0x1E41AD5EBD826cF719c0a949122589a1f3943282)       |

____

## Install


1. install dependencies

```bash
yarn install
```

2. create a ```.env``` file in your root directory. an example is located at [.env-example](.env-example), the proper file is available internally. (vault) 

____


## Usage

```bash
npx hardhat 
```

starting local hardhat EVM

```bash
yarn dev
```

compiling solidity contracts

```bash
yarn compile
```


running tests

```bash
yarn test
```

running tests with gas reporter output

```bash
yarn test:gas
```

running tests without logs

```bash
yarn test:nolog
```

generating coverage reports

```bash
yarn coverage
```

____


## Deploying

this repository is configured for use with `hardhat-deploy`.
see the deploy scripts in [./deploy](./deploy) for examples.

deployment scripts contain tag fixtures to aid in deployment sequencing and individual deployment. 

to deploy contracts locally:

```bash
npx hardhat deploy [--tags DEPLOY_SCRIPT_TAG] --network [hardhat || localhost]
```

____


## Tests

unit tests are located in [./test](./test)
tests are written with mocha + chai.

tests use deployment fixtures from `hardhat-deploy` 


____ 


## Utility Scripts

The [./scripts](./scripts) directory contains several utility scripts for testing and 
developing Catalog smart contracts.


**tree.ts**

Merkle Tree utility script.
Generates a merkle root and proof given input wallet address
Used for Allowlisting.


run with

```bash
yarn tree
```

**ipfsUpload.ts**

IPFS URI utility script.
Setup to upload a basic metadata.json to ipfs, presents a URI for input
Use for easy testing.

run with 

```bash
yarn ipfs
```

**getArtists.ts**

Wallet Address List utility scripts.
Pulls valid artist wallet addresses from hasura, and saves them in `artists.json`
Intended for use with Allowlisting utilities.

run with 

```bash
yarn getartists
```

____


## Types

Project is configured for usage with Typescript.
Types are auto generated using `typechain`, and are generated postinstall and upon compiliation of contracts. 

Types are located in `./types/typechain`


____

## Documentation

Autogenerated markdown docs for Solidity contracts (compatible with docusaurus) are located at
[./docs](./docs)

____

## Linting 

Repo is setup with ESLint/Prettier/Solhint

____


## License

[MIT](LICENSE)


## Contract Legal 

[https://catalog.works/terms](http://catalog.works/terms)

