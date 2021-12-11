// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


/// base interface for Catalog cNFT TEST
interface ICTest {

    /// token data (metadata and content)
    /**
        @param metadataURI string containing metadata (e.g IPFS URI pointing to metadata.json)
        @param contentURI string containing media content (subject to change, new EIP)
        @param creator address of creator of token
        @param royaltyPayout address of royalty payout address
        @param royaltyBPS uint16 royalty percentage of creator. must be less than 10_000
     */
    struct TokenData {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }


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