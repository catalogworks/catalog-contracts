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


### Multisig Admin (Gnosis Safe)

rinkebyAddress: `0xDD382e505E92cA8d8575B01593e510Baf74B7566`
mainnetAddress: `0x489E043540ff11eC22226CA0a6f6F8e3040c7b5A`

____


## Current Deployments 

(CNFT V6: Finalized Implementation // CODENAME: "CATALOGV1")

Rinkeby Deployer Address: `0x43C4D51dE4b7bf046d92c324678a1a3969703632`


| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| Catalog Proxy       | 0x775B572e0CEB816625Af9779Bb686A8b47975876 | [link](https://rinkeby.etherscan.io/address/0x775B572e0CEB816625Af9779Bb686A8b47975876)  |
| V1 Implementation | 0x6b4d0c257830FeC10833ec868F5eb774AF5044a9 | [link](https://rinkeby.etherscan.io/address/0x6b4d0c257830FeC10833ec868F5eb774AF5044a9)       |
| V2 Implementation | 0xa29B0C46FB3C0133C03ba7e7665F90Df547781FD | [link](https://rinkeby.etherscan.io/address/0xa29B0C46FB3C0133C03ba7e7665F90Df547781FD)       |
| V3 Implementation (Current) | 0xbEa08be5CE68F30754c384e2d6D5303798A54C66 | [link](https://rinkeby.etherscan.io/address/0xbEa08be5CE68F30754c384e2d6D5303798A54C66)       |




Gas Stats (measured at 130 gwei/gas):

- `burn` (36772 avg)
- `mint` (199934 avg) ***ohhhh yeahhhh***
- `updateContentURI` (32810 avg)
- `updateCreator` (35680 avg)
- `updateMetadataURI` (45432 avg)
- `updateRoot` (35052 avg)
- `updateRoyaltyInfo` (35660 avg)
- `transferFrom` (62538 avg)


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

Running Prettier:

```bash
yarn format
```

```bash
yarn format:fix
```

Running ESLint/Solhint:

```bash
yarn lint
```

```bash
yarn lint:fix
```

____


## License

[MIT](LICENSE)


## Contract Legal 

[https://catalog.works/terms](http://catalog.works/terms)

