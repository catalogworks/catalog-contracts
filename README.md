# Catalog Contracts

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

---

## Info

Current Implementation of Catalog Shared Creator Contract (cNFT):
[Catalog.sol](./contracts/catalog/Catalog.sol)
[Docs](./docs/Catalog.md)

---

## Package

`@catalogworks/catalog-contracts` contains generated Ethers compatible typescript typings for the solidity contracts in this repository.

---

### Multisig Admin (Gnosis Safe)

rinkebyAddress: `0xDD382e505E92cA8d8575B01593e510Baf74B7566`
mainnetAddress: `0x489E043540ff11eC22226CA0a6f6F8e3040c7b5A`

---

## Current Deployments

**Mainnet Deployment:**

chainId: 1
| Contract | Address | Etherscan |
| ----------------- | :----------------------------------------: | ------------------------------------------------------------------------------: |
| Catalog Proxy | 0x0bC2A24ce568DAd89691116d5B34DEB6C203F342 | [link](https://etherscan.io/address/0x0bC2A24ce568DAd89691116d5B34DEB6C203F342) |
| V1 Implementation | 0x317094a94B60277C08bFEf1cdbbF054e6a2c94eD | [link](https://etherscan.io/address/0x317094a94B60277C08bFEf1cdbbF054e6a2c94eD) |

**Rinkeby Deployment:**

chainId: 4
| Contract | Address | Etherscan |
| --------------------------- | :----------------------------------------: | --------------------------------------------------------------------------------------: |
| Catalog Proxy | 0x775B572e0CEB816625Af9779Bb686A8b47975876 | [link](https://rinkeby.etherscan.io/address/0x775B572e0CEB816625Af9779Bb686A8b47975876) |
| V1 Implementation | 0x6b4d0c257830FeC10833ec868F5eb774AF5044a9 | [link](https://rinkeby.etherscan.io/address/0x6b4d0c257830FeC10833ec868F5eb774AF5044a9) |
| V2 Implementation | 0xa29B0C46FB3C0133C03ba7e7665F90Df547781FD | [link](https://rinkeby.etherscan.io/address/0xa29B0C46FB3C0133C03ba7e7665F90Df547781FD) |
| V3 Implementation (Current) | 0xbEa08be5CE68F30754c384e2d6D5303798A54C66 | [link](https://rinkeby.etherscan.io/address/0xbEa08be5CE68F30754c384e2d6D5303798A54C66) |

**Görli Deployment:**

chainId: 5
| Contract | Address | Etherscan |
| ----------------- | :----------------------------------------: | ------------------------------------------------------------------------------: |
| Catalog Proxy | 0x86e9dA93658807F8343A8D7B6ABc405d200e566F | [link](https://goerli.etherscan.io/address/0x86e9dA93658807F8343A8D7B6ABc405d200e566F) |
| V1 Implementation | 0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1 | [link](https://goerli.etherscan.io/address/0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1) |

**Sepolia Deployment:**

chainId: 11155111
| Contract | Address | Etherscan |
| ----------------- | :----------------------------------------: | ------------------------------------------------------------------------------: |
| Catalog Proxy | 0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1 | [link](https://sepolia.otterscan.io/address/0x25a5cAa428dACcF60cB0A8c6B13bf3cA109512C1) |
| V1 Implementation | 0xD506Ba66B5a8BB9dE72ff97Eef818B72D8b8b076 | [link](https://sepolia.otterscan.io/address/0xD506Ba66B5a8BB9dE72ff97Eef818B72D8b8b076) |

Gas Stats (measured at 130 gwei/gas):

-   `burn` (36772 avg)
-   `mint` (199934 avg)
-   `updateContentURI` (32810 avg)
-   `updateCreator` (35680 avg)
-   `updateMetadataURI` (45432 avg)
-   `updateRoot` (35052 avg)
-   `updateRoyaltyInfo` (35660 avg)
-   `transferFrom` (62538 avg)

---

## Install

1. install dependencies

```bash
yarn install
```

2. create a `.env` file in your root directory. an example is located at [.env-example](.env-example), the proper file is available internally. (vault)

---

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

---

## Deploying

this repository is configured for use with `hardhat-deploy`.
see the deploy scripts in [./deploy](./deploy) for examples.

deployment scripts contain tag fixtures to aid in deployment sequencing and individual deployment.

to deploy contracts locally:

```bash
npx hardhat deploy [--tags DEPLOY_SCRIPT_TAG] --network [hardhat || localhost]
```

---

## Tests

unit tests are located in [./test](./test)
tests are written with mocha + chai.

tests use deployment fixtures from `hardhat-deploy`

**Note:**
this repository only contains unit tests written in javascript. we have transitioned to EVM development w/ Foundry, but currently use this repository for production deployments and generated typescript typings.

---

## Types

Project is configured for usage with Typescript.
Types are auto generated using `typechain`, and are generated postinstall and upon compiliation of contracts.

Types are located in `./types/typechain`

---

## Documentation

Autogenerated markdown docs for Solidity contracts (compatible with docusaurus) are located at
[./docs](./docs)

---

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

---

## License

[MIT](LICENSE)

## Contract Legal

[https://catalog.works/terms](http://catalog.works/terms)

## Security

[SECURITY.md](SECURITY.md)

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)
