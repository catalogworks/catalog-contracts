# CatalogNFT









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
function burn(uint256 tokenId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined

### content

```solidity
function content(uint256 tokenId) external nonpayable returns (struct ContentData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | token id to retrieve content for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ContentData | ContentData struct of content information

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



*Sets up ERC721 Token*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _name | string | name of token
| _symbol | string | symbol of token

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

### mint

```solidity
function mint(string contentUri, bytes32 _contentHash, string metadataUri, address payout, uint16 royaltyBps, bytes32[] merkleProof, address[] creators) external nonpayable returns (uint256)
```

Mint from merkle proof



#### Parameters

| Name | Type | Description |
|---|---|---|
| contentUri | string | undefined
| _contentHash | bytes32 | undefined
| metadataUri | string | undefined
| payout | address | undefined
| royaltyBps | uint16 | undefined
| merkleProof | bytes32[] | undefined
| creators | address[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined

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
function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount)
```



*Called with the sale price to determine how much royalty is owed and to whom.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | - the NFT asset queried for royalty information
| salePrice | uint256 | - the sale price of the NFT asset specified by `tokenId`

#### Returns

| Name | Type | Description |
|---|---|---|
| receiver | address | - address of who should be sent the royalty payment
| royaltyAmount | uint256 | - the royalty payment amount for `salePrice`

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

### setAllowedMintersRoot

```solidity
function setAllowedMintersRoot(bytes32 root) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| root | bytes32 | undefined

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

### setTokenPayoutAdmin

```solidity
function setTokenPayoutAdmin(uint256 tokenId, address newReceiver) external nonpayable
```

Only callable by owner



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined
| newReceiver | address | address new royalty receiver address

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```

Interface ERC165 spec calls



#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | interface id to see what is supported

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
function tokenURI(uint256 tokenId) external view returns (string)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | token id to get uri for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined

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

### updateMetadataUri

```solidity
function updateMetadataUri(uint256 tokenId, string newMetadataUri) external nonpayable
```

Updates the metadata uri to a new string for new schemas / adding licenses and metadata uri updates Only callable by the contract owner when they own the NFT or the creator when they own the NFT.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | token id to update the metadata for
| newMetadataUri | string | new metadata uri string



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

### MetadataUpdated

```solidity
event MetadataUpdated(uint256 indexed tokenId, string metadataUri)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| metadataUri  | string | undefined |

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
event RoyaltyUpdated(uint256 indexed tokenId, address payout)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| payout  | address | undefined |

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



