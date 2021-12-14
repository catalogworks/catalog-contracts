# Catalog Custom Contracts 

EVM hardhat environment smart contract development project.


## Info

Current Implementation of Catalog Shared Creator Contract (cNFT): [TB303.sol](./contracts/catalog/TB303V2.sol) 

### Rinkeby Multisig (Gnosis Safe)

Address: `0xDD382e505E92cA8d8575B01593e510Baf74B7566`

Has ownership over ProxyAdmin contract. Used to deploy upgrades to proxied contracts




## Current Deployments 

(CNFT V0: CODENAME "TB303")

| Contract          | Address                                    | Etherscan                                                                                     |
| ----------------- |:------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| TB303 Proxy       | 0x06318d04f2d8d7b5dffcb0d33e6ce9d99488c3dd | [link](https://rinkeby.etherscan.io/address/0x06318d04f2d8d7b5dffcb0d33e6ce9d99488c3dd#code)  |
| V1 Implementation | 0x6855881b07485129A54CD0D0031974E8936A4F80 | [link](https://rinkeby.etherscan.io/address/0x6855881b07485129a54cd0d0031974e8936a4f80)       |
| V2 Implementation | 0x9c7c7a55d29a176b39e3cf58274F709B8c3E66A1 | [link](https://rinkeby.etherscan.io/address/0x9c7c7a55d29a176b39e3cf58274f709b8c3e66a1)       |
| ProxyAdmin        | 0x1E41AD5EBD826cF719c0a949122589a1f3943282 | [link](https://rinkeby.etherscan.io/address/0x1E41AD5EBD826cF719c0a949122589a1f3943282)       |



## Install


1. install dependencies

```bash
yarn install
```

2. create a ```.env``` file in your root directory. an example is located at [.env-example](.env-example), the proper file is available internally. (vault) 



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


generating coverage reports

```bash
yarn coverage
```



## Deploying

this repository is configured for use with `hardhat-deploy`.
see the deploy scripts in [./deploy](./deploy) for examples.

deployment scripts contain tag fixtures to aid in deployment sequencing and individual deployment. 

to deploy contracts locally:

```bash
npx hardhat deploy [--tags DEPLOY_SCRIPT_TAG] --network [hardhat || localhost]
```



## Tests

unit tests are located in [./test](./test)
tests are written with mocha + chai.

tests use deployment fixtures from `hardhat-deploy` 


## Utility Scripts

The [./scripts](./scripts) directory contains several utility scripts for testing and 
developing Catalog smart contracts.


**tree.ts**

Merkle Tree utility script.
Generates a merkle root and proof given input wallet address
Used for Allowlisting.

run with `yarn tree`

**ipfsUpload.ts**

IPFS URI utility script.
Setup to upload a basic metadata.json to ipfs, presents a URI for input
Use for easy testing.

run with `yarn ipfs`

**getArtists.ts**

Wallet Address List utility scripts.
Pulls valid artist wallet addresses from hasura, and saves them in `artists.json`
Intended for use with Allowlisting utilities.

run with `yarn getartists`



## Types

Project is configured for usage with Typescript.
Types are auto generated using `typechain`, and are generated postinstall and upon compiliation of contracts. 

Types are located in `./types/typechain`


## TODO
- linting/prettier setup



## License

[MIT](LICENSE)
