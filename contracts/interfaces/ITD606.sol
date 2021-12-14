// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;


/// base interface for Catalog cNFT TEST
interface ITD606 {

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

}