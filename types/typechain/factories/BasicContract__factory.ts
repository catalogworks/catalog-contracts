/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BasicContract, BasicContractInterface } from "../BasicContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "to",
        type: "address",
      },
    ],
    name: "safeMint",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
    inputs: [],
    name: "totalSupply",
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
  "0x60806040523480156200001157600080fd5b50604080518082018252600d81526c18985cda58d0dbdb9d1c9858dd609a1b6020808301918252835180850190945260038452621090d560ea1b908401528151919291620000629160009162000081565b5080516200007890600190602084019062000081565b50505062000164565b8280546200008f9062000127565b90600052602060002090601f016020900481019282620000b35760008555620000fe565b82601f10620000ce57805160ff1916838001178555620000fe565b82800160010185558215620000fe579182015b82811115620000fe578251825591602001919060010190620000e1565b506200010c92915062000110565b5090565b5b808211156200010c576000815560010162000111565b600181811c908216806200013c57607f821691505b602082108114156200015e57634e487b7160e01b600052602260045260246000fd5b50919050565b61185480620001746000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806342842e0e116100a257806395d89b411161007157806395d89b4114610224578063a22cb4651461022c578063b88d4fde1461023f578063c87b56dd14610252578063e985e9c51461026557600080fd5b806342842e0e146101d85780634f6ccce7146101eb5780636352211e146101fe57806370a082311461021157600080fd5b806318160ddd116100de57806318160ddd1461018d57806323b872dd1461019f5780632f745c59146101b257806340d097c3146101c557600080fd5b806301ffc9a71461011057806306fdde0314610138578063081812fc1461014d578063095ea7b314610178575b600080fd5b61012361011e36600461134e565b6102a1565b60405190151581526020015b60405180910390f35b6101406102b2565b60405161012f91906113c3565b61016061015b3660046113d6565b610344565b6040516001600160a01b03909116815260200161012f565b61018b61018636600461140b565b6103de565b005b6008545b60405190815260200161012f565b61018b6101ad366004611435565b6104f4565b6101916101c036600461140b565b610525565b61018b6101d3366004611471565b6105bb565b61018b6101e6366004611435565b6105e4565b6101916101f93660046113d6565b6105ff565b61016061020c3660046113d6565b610692565b61019161021f366004611471565b610709565b610140610790565b61018b61023a36600461148c565b61079f565b61018b61024d3660046114de565b610864565b6101406102603660046113d6565b61089c565b6101236102733660046115ba565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006102ac82610984565b92915050565b6060600080546102c1906115ed565b80601f01602080910402602001604051908101604052809291908181526020018280546102ed906115ed565b801561033a5780601f1061030f5761010080835404028352916020019161033a565b820191906000526020600020905b81548152906001019060200180831161031d57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166103c25760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103e982610692565b9050806001600160a01b0316836001600160a01b031614156104575760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103b9565b336001600160a01b038216148061047357506104738133610273565b6104e55760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103b9565b6104ef83836109a9565b505050565b6104fe3382610a17565b61051a5760405162461bcd60e51b81526004016103b990611628565b6104ef838383610b0e565b600061053083610709565b82106105925760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016103b9565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b60006105c6600a5490565b90506105d6600a80546001019055565b6105e08282610cb9565b5050565b6104ef83838360405180602001604052806000815250610864565b600061060a60085490565b821061066d5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016103b9565b6008828154811061068057610680611679565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806102ac5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103b9565b60006001600160a01b0382166107745760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103b9565b506001600160a01b031660009081526003602052604090205490565b6060600180546102c1906115ed565b6001600160a01b0382163314156107f85760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b9565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61086e3383610a17565b61088a5760405162461bcd60e51b81526004016103b990611628565b61089684848484610cd3565b50505050565b6000818152600260205260409020546060906001600160a01b031661091b5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103b9565b600061093260408051602081019091526000815290565b90506000815111610952576040518060200160405280600081525061097d565b8061095c84610d06565b60405160200161096d92919061168f565b6040516020818303038152906040525b9392505050565b60006001600160e01b0319821663780e9d6360e01b14806102ac57506102ac82610e04565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906109de82610692565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610a905760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103b9565b6000610a9b83610692565b9050806001600160a01b0316846001600160a01b03161480610ad65750836001600160a01b0316610acb84610344565b6001600160a01b0316145b80610b0657506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b2182610692565b6001600160a01b031614610b895760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103b9565b6001600160a01b038216610beb5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b9565b610bf6838383610e54565b610c016000826109a9565b6001600160a01b0383166000908152600360205260408120805460019290610c2a9084906116d4565b90915550506001600160a01b0382166000908152600360205260408120805460019290610c589084906116eb565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6105e0828260405180602001604052806000815250610e5f565b610cde848484610b0e565b610cea84848484610e92565b6108965760405162461bcd60e51b81526004016103b990611703565b606081610d2a5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610d545780610d3e81611755565b9150610d4d9050600a83611786565b9150610d2e565b60008167ffffffffffffffff811115610d6f57610d6f6114c8565b6040519080825280601f01601f191660200182016040528015610d99576020820181803683370190505b5090505b8415610b0657610dae6001836116d4565b9150610dbb600a8661179a565b610dc69060306116eb565b60f81b818381518110610ddb57610ddb611679565b60200101906001600160f81b031916908160001a905350610dfd600a86611786565b9450610d9d565b60006001600160e01b031982166380ac58cd60e01b1480610e3557506001600160e01b03198216635b5e139f60e01b145b806102ac57506301ffc9a760e01b6001600160e01b03198316146102ac565b6104ef838383610f9f565b610e698383611057565b610e766000848484610e92565b6104ef5760405162461bcd60e51b81526004016103b990611703565b60006001600160a01b0384163b15610f9457604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610ed69033908990889088906004016117ae565b602060405180830381600087803b158015610ef057600080fd5b505af1925050508015610f20575060408051601f3d908101601f19168201909252610f1d918101906117eb565b60015b610f7a573d808015610f4e576040519150601f19603f3d011682016040523d82523d6000602084013e610f53565b606091505b508051610f725760405162461bcd60e51b81526004016103b990611703565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610b06565b506001949350505050565b6001600160a01b038316610ffa57610ff581600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b61101d565b816001600160a01b0316836001600160a01b03161461101d5761101d83826111a5565b6001600160a01b038216611034576104ef81611242565b826001600160a01b0316826001600160a01b0316146104ef576104ef82826112f1565b6001600160a01b0382166110ad5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103b9565b6000818152600260205260409020546001600160a01b0316156111125760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103b9565b61111e60008383610e54565b6001600160a01b03821660009081526003602052604081208054600192906111479084906116eb565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600060016111b284610709565b6111bc91906116d4565b60008381526007602052604090205490915080821461120f576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b600854600090611254906001906116d4565b6000838152600960205260408120546008805493945090928490811061127c5761127c611679565b90600052602060002001549050806008838154811061129d5761129d611679565b60009182526020808320909101929092558281526009909152604080822084905585825281205560088054806112d5576112d5611808565b6001900381819060005260206000200160009055905550505050565b60006112fc83610709565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160e01b03198116811461134b57600080fd5b50565b60006020828403121561136057600080fd5b813561097d81611335565b60005b8381101561138657818101518382015260200161136e565b838111156108965750506000910152565b600081518084526113af81602086016020860161136b565b601f01601f19169290920160200192915050565b60208152600061097d6020830184611397565b6000602082840312156113e857600080fd5b5035919050565b80356001600160a01b038116811461140657600080fd5b919050565b6000806040838503121561141e57600080fd5b611427836113ef565b946020939093013593505050565b60008060006060848603121561144a57600080fd5b611453846113ef565b9250611461602085016113ef565b9150604084013590509250925092565b60006020828403121561148357600080fd5b61097d826113ef565b6000806040838503121561149f57600080fd5b6114a8836113ef565b9150602083013580151581146114bd57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156114f457600080fd5b6114fd856113ef565b935061150b602086016113ef565b925060408501359150606085013567ffffffffffffffff8082111561152f57600080fd5b818701915087601f83011261154357600080fd5b813581811115611555576115556114c8565b604051601f8201601f19908116603f0116810190838211818310171561157d5761157d6114c8565b816040528281528a602084870101111561159657600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156115cd57600080fd5b6115d6836113ef565b91506115e4602084016113ef565b90509250929050565b600181811c9082168061160157607f821691505b6020821081141561162257634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b600083516116a181846020880161136b565b8351908301906116b581836020880161136b565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156116e6576116e66116be565b500390565b600082198211156116fe576116fe6116be565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600019821415611769576117696116be565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261179557611795611770565b500490565b6000826117a9576117a9611770565b500690565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906117e190830184611397565b9695505050505050565b6000602082840312156117fd57600080fd5b815161097d81611335565b634e487b7160e01b600052603160045260246000fdfea26469706673582212201af973c01f39ed43264a2e4821bae2774b550852e2e35064329eb382c11426e764736f6c63430008090033";

export class BasicContract__factory extends ContractFactory {
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
  ): Promise<BasicContract> {
    return super.deploy(overrides || {}) as Promise<BasicContract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BasicContract {
    return super.attach(address) as BasicContract;
  }
  connect(signer: Signer): BasicContract__factory {
    return super.connect(signer) as BasicContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BasicContractInterface {
    return new utils.Interface(_abi) as BasicContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BasicContract {
    return new Contract(address, _abi, signerOrProvider) as BasicContract;
  }
}
