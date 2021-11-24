// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


/// base interface for Catalog cNFT TEST
interface ICTest {

    /// EIP712 sig
    struct EIP712Signature {
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    /// token data (metadata and content)
    struct TokenData {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }


    // function mint(TokenData calldata data) external; /// market shit needs to go here


    // /// EIP712 sig
    // function mintWithSig(TokenData calldata data, EIP712Signature calldata sig) external;


    // /// update token content URI (access controlled)
    // function updateTokenContentURI(uint256 tokenId, string calldata contentURI) external;

    // /// update token metadata URI (access controlled)
    // function updateTokenMetadataURI(uint256 tokenId, string calldata metadataURI) external;


    // /// revoke token approval
    // function revokeApproval(uint256 tokenId) external;


    // /// EIP712 permit, sts an approved spender given valid sig
    // function permit(address spender, uint256 tokenId, EIP712Signature calldata sig) external;

    // Burn token
    function burn(uint256 tokenId) external;
}