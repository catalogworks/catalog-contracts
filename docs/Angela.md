# Angela





Dynamic merkle tree library



## Methods

### append

```solidity
function append(uint256 _len, bytes32 _oldRoot, bytes32 _leafHash, bytes32[] _proof) external pure returns (bytes32 _newRoot)
```

append leaf



#### Parameters

| Name | Type | Description |
|---|---|---|
| _len | uint256 | undefined
| _oldRoot | bytes32 | undefined
| _leafHash | bytes32 | undefined
| _proof | bytes32[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _newRoot | bytes32 | undefined

### calculateRootHash

```solidity
function calculateRootHash(uint256 _idx, uint256 _len, bytes32 _leafHash, bytes32[] _proof) external pure returns (bytes32 _rootHash)
```

Merkle tree node



#### Parameters

| Name | Type | Description |
|---|---|---|
| _idx | uint256 | undefined
| _len | uint256 | undefined
| _leafHash | bytes32 | undefined
| _proof | bytes32[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _rootHash | bytes32 | undefined

### calculateRootHashNoLength

```solidity
function calculateRootHashNoLength(uint256 _idx, bytes32 _leafHash, bytes32[] _proof) external pure returns (bytes32 _rootHash)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _idx | uint256 | undefined
| _leafHash | bytes32 | undefined
| _proof | bytes32[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _rootHash | bytes32 | undefined

### update

```solidity
function update(uint256 _idx, uint256 _len, bytes32 _oldRoot, bytes32 _oldLeafHash, bytes32 _newLeafHash, bytes32[] _proof) external pure returns (bytes32 _newRoot)
```

update leaf



#### Parameters

| Name | Type | Description |
|---|---|---|
| _idx | uint256 | undefined
| _len | uint256 | undefined
| _oldRoot | bytes32 | undefined
| _oldLeafHash | bytes32 | undefined
| _newLeafHash | bytes32 | undefined
| _proof | bytes32[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _newRoot | bytes32 | undefined

### verify

```solidity
function verify(uint256 _idx, uint256 _len, bytes32 _root, bytes32 _oldLeafHash, bytes32[] _proof) external pure returns (bool)
```

verify proof



#### Parameters

| Name | Type | Description |
|---|---|---|
| _idx | uint256 | undefined
| _len | uint256 | undefined
| _root | bytes32 | undefined
| _oldLeafHash | bytes32 | undefined
| _proof | bytes32[] | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined




