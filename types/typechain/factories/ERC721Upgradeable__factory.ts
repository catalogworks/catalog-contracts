/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721Upgradeable,
  ERC721UpgradeableInterface,
} from "../ERC721Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611246806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610d56565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610dcb565b61012461011f366004610dde565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610e13565b6103a6565b005b61014f61015f366004610e3d565b6104bc565b61014f610172366004610e3d565b6104ed565b610124610185366004610dde565b610508565b61019d610198366004610e79565b61057f565b6040519081526020016100f3565b610104610606565b61014f6101c1366004610e94565b610615565b61014f6101d4366004610ee6565b6106da565b6101046101e7366004610dde565b610712565b6100e76101fa366004610fc2565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606065805461028990610ff5565b80601f01602080910402602001604051908101604052809291908181526020018280546102b590610ff5565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b6000818152606760205260408120546001600160a01b031661038a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152606960205260409020546001600160a01b031690565b60006103b182610508565b9050806001600160a01b0316836001600160a01b0316141561041f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610381565b336001600160a01b038216148061043b575061043b81336101fa565b6104ad5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610381565b6104b783836107fa565b505050565b6104c63382610868565b6104e25760405162461bcd60e51b815260040161038190611030565b6104b783838361095f565b6104b7838383604051806020016040528060008152506106da565b6000818152606760205260408120546001600160a01b0316806102745760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610381565b60006001600160a01b0382166105ea5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610381565b506001600160a01b031660009081526068602052604090205490565b60606066805461028990610ff5565b6001600160a01b03821633141561066e5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610381565b336000818152606a602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6106e43383610868565b6107005760405162461bcd60e51b815260040161038190611030565b61070c84848484610aff565b50505050565b6000818152606760205260409020546060906001600160a01b03166107915760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610381565b60006107a860408051602081019091526000815290565b905060008151116107c857604051806020016040528060008152506107f3565b806107d284610b32565b6040516020016107e3929190611081565b6040516020818303038152906040525b9392505050565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061082f82610508565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152606760205260408120546001600160a01b03166108e15760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610381565b60006108ec83610508565b9050806001600160a01b0316846001600160a01b031614806109275750836001600160a01b031661091c8461030c565b6001600160a01b0316145b8061095757506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661097282610508565b6001600160a01b0316146109da5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610381565b6001600160a01b038216610a3c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610381565b610a476000826107fa565b6001600160a01b0383166000908152606860205260408120805460019290610a709084906110c6565b90915550506001600160a01b0382166000908152606860205260408120805460019290610a9e9084906110dd565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610b0a84848461095f565b610b1684848484610c30565b61070c5760405162461bcd60e51b8152600401610381906110f5565b606081610b565750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610b805780610b6a81611147565b9150610b799050600a83611178565b9150610b5a565b60008167ffffffffffffffff811115610b9b57610b9b610ed0565b6040519080825280601f01601f191660200182016040528015610bc5576020820181803683370190505b5090505b841561095757610bda6001836110c6565b9150610be7600a8661118c565b610bf29060306110dd565b60f81b818381518110610c0757610c076111a0565b60200101906001600160f81b031916908160001a905350610c29600a86611178565b9450610bc9565b60006001600160a01b0384163b15610d3257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610c749033908990889088906004016111b6565b602060405180830381600087803b158015610c8e57600080fd5b505af1925050508015610cbe575060408051601f3d908101601f19168201909252610cbb918101906111f3565b60015b610d18573d808015610cec576040519150601f19603f3d011682016040523d82523d6000602084013e610cf1565b606091505b508051610d105760405162461bcd60e51b8152600401610381906110f5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610957565b506001949350505050565b6001600160e01b031981168114610d5357600080fd5b50565b600060208284031215610d6857600080fd5b81356107f381610d3d565b60005b83811015610d8e578181015183820152602001610d76565b8381111561070c5750506000910152565b60008151808452610db7816020860160208601610d73565b601f01601f19169290920160200192915050565b6020815260006107f36020830184610d9f565b600060208284031215610df057600080fd5b5035919050565b80356001600160a01b0381168114610e0e57600080fd5b919050565b60008060408385031215610e2657600080fd5b610e2f83610df7565b946020939093013593505050565b600080600060608486031215610e5257600080fd5b610e5b84610df7565b9250610e6960208501610df7565b9150604084013590509250925092565b600060208284031215610e8b57600080fd5b6107f382610df7565b60008060408385031215610ea757600080fd5b610eb083610df7565b915060208301358015158114610ec557600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610efc57600080fd5b610f0585610df7565b9350610f1360208601610df7565b925060408501359150606085013567ffffffffffffffff80821115610f3757600080fd5b818701915087601f830112610f4b57600080fd5b813581811115610f5d57610f5d610ed0565b604051601f8201601f19908116603f01168101908382118183101715610f8557610f85610ed0565b816040528281528a6020848701011115610f9e57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610fd557600080fd5b610fde83610df7565b9150610fec60208401610df7565b90509250929050565b600181811c9082168061100957607f821691505b6020821081141561102a57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008351611093818460208801610d73565b8351908301906110a7818360208801610d73565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156110d8576110d86110b0565b500390565b600082198211156110f0576110f06110b0565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600060001982141561115b5761115b6110b0565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261118757611187611162565b500490565b60008261119b5761119b611162565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111e990830184610d9f565b9695505050505050565b60006020828403121561120557600080fd5b81516107f381610d3d56fea2646970667358221220bf9ebc76043b51452c26799301c6ec59a7f1a059e91c9fc4e1527041d7dcc37b64736f6c63430008090033";

export class ERC721Upgradeable__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC721Upgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721Upgradeable {
    return super.attach(address) as ERC721Upgradeable;
  }
  connect(signer: Signer): ERC721Upgradeable__factory {
    return super.connect(signer) as ERC721Upgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721UpgradeableInterface {
    return new utils.Interface(_abi) as ERC721UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC721Upgradeable;
  }
}
