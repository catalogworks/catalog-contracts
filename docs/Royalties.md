# Royalties





sepearate royalties contract &quot;module&quot;



## Methods

### royalties

```solidity
function royalties(uint256) external view returns (uint256 royaltyBPS, address royaltyReceiver)
```

Mappings



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| royaltyBPS | uint256 | undefined
| royaltyReceiver | address | undefined

### royaltyInfo

```solidity
function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address _royaltyReceiver, uint256 _royaltyAmount)
```

called w/ sale price to determine royalties owed



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | undefined
| _salePrice | uint256 | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _royaltyReceiver | address | undefined
| _royaltyAmount | uint256 | undefined

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



## Events

### RoyaltyUpdated

```solidity
event RoyaltyUpdated(uint256 indexed tokenId, address royaltyReceiver, uint256 royaltyBPS)
```

Events



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| royaltyReceiver  | address | undefined |
| royaltyBPS  | uint256 | undefined |



