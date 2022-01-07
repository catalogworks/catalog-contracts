// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.6;

/*                                                                                
  Catalog.works NFT Contracts
*/

import { ITokenContent, ContentData } from "./ITokenContent.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import { IERC2981Upgradeable } from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import { IERC165Upgradeable } from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { CountersUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import { MerkleProofUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";

/*
 * Catalog.works NFT Contracts
 *
 * project: Catalog.works NFT Contracts
 * contract: iain n (@isiain)
 */
contract CatalogNFT is OwnableUpgradeable, ERC721Upgradeable, ITokenContent, IERC2981Upgradeable {
    event MetadataUpdated(uint256 indexed tokenId, string metadataUri);
    event RoyaltyUpdated(uint256 indexed tokenId, address payout);

    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Struct to store token info for each token id in contract
    struct TokenInfo {
        string metadataUri;
        string contentUri;
        bytes32 contentHash;
        address payout;
        uint16 royaltyBps;
    }

    /// Token info struct for rendering out each token in contact
    mapping(uint256 => TokenInfo) private tokenInfo;

    /// Merkle root for allowed minters
    bytes32 allowedMintersRoot;

    /// Counter to keep track of the currently minted token
    CountersUpgradeable.Counter private tokenIdTracker;

    // Guards

    /// Modifier to check if the token exists
    modifier tokenExists(uint256 tokenId) {
        require(_exists(tokenId), "Query for nonexistent token");
        _;
    }

    modifier onlyAllowedMinter(bytes32[] calldata merkleProof) {
        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProofUpgradeable.verify(merkleProof, allowedMintersRoot, node), "Only minter");
        _;
    }

    /// @dev Sets up ERC721 Token
    /// @param _name name of token
    /// @param _symbol symbol of token
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);

        __Ownable_init();
    }

    // User token functions

    function burn(uint256 tokenId) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not allowed");
        _burn(tokenId);
    }

    /**
        Mint from merkle proof
     */
    function mint(
        string memory contentUri,
        bytes32 _contentHash,
        string memory metadataUri,
        address payout,
        uint16 royaltyBps,
        bytes32[] calldata merkleProof,
        address[] calldata creators
    ) public onlyAllowedMinter(merkleProof) returns (uint256) {
        require(royaltyBps < 10000, "Royalty needs to be less than 10000 bps (100%)");
        uint256 tokenId = tokenIdTracker.current();
        _mint(msg.sender, tokenId);
        tokenInfo[tokenId] = TokenInfo({
            contentUri: contentUri,
            metadataUri: metadataUri,
            contentHash: _contentHash,
            royaltyBps: royaltyBps,
            payout: payout
        });
        tokenIdTracker.increment();
        return tokenId;
    }

    // Token admin functions

    function setAllowedMintersRoot(bytes32 root) external onlyOwner {
        allowedMintersRoot = root;
    }

    /// Updates the metadata uri to a new string for new schemas / adding licenses and metadata uri updates
    /// Only callable by the contract owner when they own the NFT or the creator when they own the NFT.
    /// @param tokenId token id to update the metadata for
    /// @param newMetadataUri new metadata uri string
    function updateMetadataUri(uint256 tokenId, string memory newMetadataUri) external tokenExists(tokenId) onlyOwner {
        emit MetadataUpdated(tokenId, newMetadataUri);
        tokenInfo[tokenId].metadataUri = newMetadataUri;
    }

    /// Only callable by owner
    /// @param newReceiver address new royalty receiver address
    function setTokenPayoutAdmin(uint256 tokenId, address newReceiver) external onlyOwner {
        tokenInfo[tokenId].payout = newReceiver;
        emit RoyaltyUpdated(tokenId, newReceiver);
    }

    // Content info getter fns

    /// @param tokenId token id to get uri for
    function tokenURI(uint256 tokenId) public view override tokenExists(tokenId) returns (string memory) {
        return tokenInfo[tokenId].metadataUri;
    }

    function content(uint256 tokenId) external override returns (ContentData memory) {
        return
            ContentData({
                uri: tokenInfo[tokenId].contentUri,
                hash: tokenInfo[tokenId].contentHash,
                mime: "",
                content: ""
            });
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        override(IERC2981Upgradeable)
        returns (address receiver, uint256 royaltyAmount)
    {
        return (tokenInfo[tokenId].payout, (salePrice * tokenInfo[tokenId].royaltyBps) / 10000);
    }

    /// Interface ERC165 spec calls
    /// @param interfaceId interface id to see what is supported
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return
            ERC721Upgradeable.supportsInterface(interfaceId) ||
            interfaceId == type(IERC2981Upgradeable).interfaceId ||
            interfaceId == type(ITokenContent).interfaceId;
    }
}
