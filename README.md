# Catalog Custom Contracts 

EVM hardhat environment smart contract development project.


## Info

Catalog Shared Creator Contract (cNFT): [CTest.sol](./contracts/CTest.sol)


## Current Deployments 

CTest (Rinkeby)

- Proxied CTest (what we interact with): [0xAa8e4FdCC2f8D3749276bbA721C125B12b96f2E1](https://rinkeby.etherscan.io/address/0xaa8e4fdcc2f8d3749276bba721c125b12b96f2e1#code)
- CTest Implementation (base contract that gets upgraded): [0x2Df3C8B5a53a9319C3E2A86ba73eC9626A368c90](https://rinkeby.etherscan.io/address/0x2Df3C8B5a53a9319C3E2A86ba73eC9626A368c90#code)
- Proxy Admin: [0x1E41AD5EBD826cF719c0a949122589a1f3943282](https://rinkeby.etherscan.io/address/0x1e41ad5ebd826cf719c0a949122589a1f3943282)

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
npx hardhat node
```

compiling solidity contracts

```bash
npx hardhat compile
```


running tests

```bash
npx hardhat test
```


generating coverage reports

```bash
npx hardhat coverage
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


## TODO
- linting/prettier setup



## License

[MIT](LICENSE)
