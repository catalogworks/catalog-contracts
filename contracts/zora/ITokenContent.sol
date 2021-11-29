// SPDX-License-Identifier: GPL-v3
pragma solidity 0.8.6;

/*                                                                                
    Token content interface
    Proposal
*/

struct ContentData {
    /// URI Referencing the content remotely
    string uri;
    /// SHA256 content hash
    bytes32 hash;
    /// Mime type of the content as a string "video/mp4"
    string mime;
    /// String of the content itself from an on-chain source
    string content;
}

/// Interface to show content getter for token
interface ITokenContent {
    /// @param tokenId token id to retrieve content for
    /// @return ContentData struct of content information
    function content(uint256 tokenId) external returns (ContentData memory);
}