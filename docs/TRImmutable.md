# TRImmutable









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

Burn



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined

### creator

```solidity
function creator(uint256 _tokenId) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

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

State variable containing merkle root see {IAngelaList}




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined

### mint

```solidity
function mint(TRImmutable.TokenData _inputData, bytes32[] _proof) external nonpayable returns (uint256)
```

Mint perhaps no object constructor needed?



#### Parameters

| Name | Type | Description |
|---|---|---|
| _inputData | TRImmutable.TokenData | undefined
| _proof | bytes32[] | undefined

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
function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount)
```

ERC165 bytes to add to interface array - set in parent contract implementing this standard bytes4(keccak256(&quot;royaltyInfo(uint256,uint256)&quot;)) == 0x2a55205a bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a; _registerInterface(_INTERFACE_ID_ERC2981);



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined
| _salePrice | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| receiver | address | undefined
| royaltyAmount | uint256 | undefined

### royaltyPayoutAddress

```solidity
function royaltyPayoutAddress(uint256 _tokenId) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

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
function supportsInterface(bytes4 _interfaceId) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _interfaceId | bytes4 | undefined

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

### tokenContentURI

```solidity
function tokenContentURI(uint256 _tokenId) external view returns (string)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) external view returns (string)
```

override



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined

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

### updateContent

```solidity
function updateContent(uint256 _tokenId, string _contentURI) external nonpayable
```

setContentURI



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined
| _contentURI | string | undefined

### updateMetadata

```solidity
function updateMetadata(uint256 _tokenId, string _metadataURI) external nonpayable
```

setMetadataURI



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined
| _metadataURI | string | undefined

### updateRoot

```solidity
function updateRoot(bytes32 _newRoot) external nonpayable
```

updateRoot



#### Parameters

| Name | Type | Description |
|---|---|---|
| _newRoot | bytes32 | undefined

### updateRoyalty

```solidity
function updateRoyalty(uint256 _tokenId, address _payoutAddress) external nonpayable
```

updateRoyalty



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined
| _payoutAddress | address | undefined



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
event ContentUpdated(uint256 indexed tokenId, string contentURI)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| contentURI  | string | undefined |

### MetadataUpdated

```solidity
event MetadataUpdated(uint256 indexed tokenId, string metadataURI)
```

Events



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
event RoyaltyUpdated(uint256 indexed tokenId, address indexed royaltyPayout)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| royaltyPayout `indexed` | address | undefined |

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

### merkleRootUpdated

```solidity
event merkleRootUpdated(bytes32 _merkleRoot)
```

Events



#### Parameters

| Name | Type | Description |
|---|---|---|
| _merkleRoot  | bytes32 | undefined |



