# CatalogOld

*:   @bretth18 (computerdata) of @catalogworks*

> :   Catalog

-------------------------------------------------------------------------------------------------------------------- ,, .g8&quot;&quot;&quot;bgd         mm            `7MM .dP&#39;     `M         MM              MM dM&#39;       ` ,6&quot;Yb.mmMMmm  ,6&quot;Yb.    MM  ,pW&quot;Wq.   .P&quot;Ybmmm MM         8)   MM  MM   8)   MM    MM 6W&#39;   `Wb :MI  I8 MM.         ,pm9MM  MM    ,pm9MM    MM 8M     M8  WmmmP&quot; `Mb.     ,&#39;8M   MM  MM   8M   MM    MM YA.   ,A9 8M `&quot;bmmmd&#39; `Moo9^Yo.`Mbmo`Moo9^Yo..JMML.`Ybmd9&#39;   YMMMMMb 6&#39;     dP Ybmmmd&#39;************************************************ LEGAL DISCLAIMER: https://catalog.works/terms************************************************ old transparent proxy version. previously Catalog.sol ---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                            &quot;Catalog&quot;                   :   Creator Shared NFT Media Contract for Catalog Records Inc.

*:   Upgradeable ERC721 Contract, inherits functionality from ERC721Upgradeable. Purpose built for optimization over the Zora V1 contracts. isian (iain nash) of Zora.  ---------------------------------------------------------------------------------------------------------------------    *

## Methods

### approve

```solidity
function approve(address to, uint256 tokenId) external nonpayable
```



*See {IERC721-approve}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined
| tokenId | uint256 | undefined

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256)
```



*See {IERC721-balanceOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined

### burn

```solidity
function burn(uint256 _tokenId) external nonpayable
```

Burn FunctionBurns a token

*burns given tokenId, restrited to owner and creator (when owned)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 identifier of token to burn

### creator

```solidity
function creator(uint256 _tokenId) external view returns (address)
```

creator Functiongets the creator of a token

*basic public getter method for creator*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 identifier of token to get creator for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | address creator of given tokenId

### getApproved

```solidity
function getApproved(uint256 tokenId) external view returns (address)
```



*See {IERC721-getApproved}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### initialize

```solidity
function initialize(string _name, string _symbol) external nonpayable
```

initialize FunctionInitializes contract with default values, acts as a constructor

*Initializes contract with default values, for upgradeable proxy purposes*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _name | string | string name of the contract
| _symbol | string | string symbol of the contract

### isApprovedForAll

```solidity
function isApprovedForAll(address owner, address operator) external view returns (bool)
```



*See {IERC721-isApprovedForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined
| operator | address | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined

### merkleRoot

```solidity
function merkleRoot() external view returns (bytes32)
```

Merkle Root




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined

### mint

```solidity
function mint(CatalogOld.TokenData _data, CatalogOld.ContentData _content, bytes32[] _proof) external nonpayable returns (uint256)
```

mint Functionmints a new token

*mints a new token to allowlisted msg.sender with a valid merkle proof.  Emits a ContentUpdated event to trackcontentURI updates.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _data | CatalogOld.TokenData | TokenData struct, containing metadataURI, creator, royaltyPayout, royaltyBPS
| _content | CatalogOld.ContentData | ContentData struct, containing contentURI, contentHash.  not stored in memory, only in calldata
| _proof | bytes32[] | bytes32[] merkle proof of artist wallet.  this is created off-chain.  e.g (proof = tree.getHexProof(keccak256(address)))

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256 tokenId of minted token (useful since we are not using Enumerable)

### name

```solidity
function name() external view returns (string)
```



*See {IERC721Metadata-name}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view returns (address)
```



*See {IERC721-ownerOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### royaltyInfo

```solidity
function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount)
```

royaltyInfo Functionoverride function gets royalty information for a token (EIP-2981)

*override, conforms to EIP-2981*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token of which to get royalty information
| _salePrice | uint256 | uint256 final sale price of token used to calculate royalty payout

#### Returns

| Name | Type | Description |
|---|---|---|
| receiver | address | undefined
| royaltyAmount | uint256 | undefined

### royaltyPayoutAddress

```solidity
function royaltyPayoutAddress(uint256 _tokenId) external view returns (address)
```

royaltyPayoutAddress Functiongets the address of the royalty payout for a token

*basic public getter method for royalty payout address *

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 identifier of token to get royalty payout address for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | address royalty payout address of given tokenId

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) external nonpayable
```



*See {IERC721-safeTransferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined
| to | address | undefined
| tokenId | uint256 | undefined
| _data | bytes | undefined

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable
```



*See {IERC721-setApprovalForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| operator | address | undefined
| approved | bool | undefined

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```

supportsInterface Functionoverride function to check if contract supports an interface

*override *

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | bytes4 id of interface to check

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined

### symbol

```solidity
function symbol() external view returns (string)
```



*See {IERC721Metadata-symbol}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) external view returns (string)
```

tokenURI Functionoverride function to get the URI of a token. returns stored metadataURI

*override function, returns metadataURI of token stored in tokenData*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token of which to get metadata from

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | string containing metadata URI

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) external nonpayable
```



*See {IERC721-transferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined
| to | address | undefined
| tokenId | uint256 | undefined

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined

### updateContentURI

```solidity
function updateContentURI(uint256 _tokenId, CatalogOld.ContentData _content) external nonpayable
```

updateContentURI FunctionEmits an event to be used track content updates on a token

*access controlled function, restricted to owner/admim.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token to update
| _content | CatalogOld.ContentData | struct containing new/updated contentURI and hash.

### updateCreator

```solidity
function updateCreator(uint256 _tokenId, address _creator) external nonpayable
```

updateCreator Functionupdates the creator of a token, emits an event

*access controlled function, restricted to owner/admim. used in case of compromised artist wallet.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token to update
| _creator | address | address new creator of the token

### updateMetadataURI

```solidity
function updateMetadataURI(uint256 _tokenId, string _metadataURI) external nonpayable
```

updateMetadataURI Functionupdates the metadata URI of a token, emits an event

*access controlled, restricted to contract owner/admin or the creator of the token*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token to update
| _metadataURI | string | string containing new/updated metadata (e.g IPFS URI pointing to metadata.json)

### updateRoot

```solidity
function updateRoot(bytes32 _newRoot) external nonpayable
```

updateRoot Functionupdates the merkleroot of the allowlistthis function is inherits from Angela.sol, and may not be necessary depending on role based configuration.

*access controlled function, restricted to owner/admim.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _newRoot | bytes32 | bytes32 containing the new root hash, generated off-chain

### updateRoyaltyInfo

```solidity
function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external nonpayable
```

updateRoyaltyInfo Functionupdates the royalty payout address and royalty BPS of a token, emits an event

*access controlled to owner only, subject to change.  this function allows for emergency royalty control (i.e compromised wallet)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | uint256 token id corresponding to the token of which to update royalty payout
| _royaltyPayoutAddress | address | address of new royalty payout address



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| approved `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |

### ApprovalForAll

```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| operator `indexed` | address | undefined |
| approved  | bool | undefined |

### ContentUpdated

```solidity
event ContentUpdated(uint256 indexed tokenId, bytes32 indexed contentHash, string contentURI)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| contentHash `indexed` | bytes32 | undefined |
| contentURI  | string | undefined |

### CreatorUpdated

```solidity
event CreatorUpdated(uint256 indexed tokenId, address indexed creator)
```

Events



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| creator `indexed` | address | undefined |

### MerkleRootUpdated

```solidity
event MerkleRootUpdated(bytes32 indexed merkleRoot)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| merkleRoot `indexed` | bytes32 | undefined |

### MetadataUpdated

```solidity
event MetadataUpdated(uint256 indexed tokenId, string metadataURI)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| metadataURI  | string | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### RoyaltyUpdated

```solidity
event RoyaltyUpdated(uint256 indexed tokenId, address indexed payoutAddress)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| payoutAddress `indexed` | address | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |


