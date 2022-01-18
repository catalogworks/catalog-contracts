// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {AngelaList} from "../AngelaList.sol";

/**
--------------------------------------------------------------------------------------------------------------------

CF0

    v2

************************************************
LEGAL DISCLAIMER:
https://catalog.works/terms
************************************************

---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
RINKEBY CNFT (V4: CODENAME "CF0")
"CF0"                       :   Creator Shared NFT Media Contract for Catalog Records Inc.
@author                     :   @bretth18 (computerdata) of @catalogworks
@title                      :   TXX
@dev                        :   Upgradeable ERC721 Contract. See interface for further implemntation details.
                                Purpose built for optmization over the Zora V1 contracts.
                                Code relies heavily on implementations thanks to @ isian (iain nash) of Zora. 
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
 */

contract CF0 is ERC721Upgradeable, IERC2981Upgradeable, OwnableUpgradeable, AngelaList {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// ----EVENTS----
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event CreatorUpdated(uint256 indexed tokenId, address indexed creator);
    event ContentUpdated(uint256 indexed tokenId, string contentURI);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed payoutAddress);

    /// ----STATE----
    struct TokenData {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }

    mapping(uint256 => TokenData) private tokenData;

    CountersUpgradeable.Counter private _tokenIdCounter;

    /// ----MODIFIERS----
    modifier tokenExists(uint256 _tokenId) {
        require(_exists(_tokenId), "Token does not exist");
        _;
    }

    /// ----CONSTRUCTOR/INITIALIZER----
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();

        /// Start with a tokenId of 1
        _tokenIdCounter.increment();
    }

    /// ----BURN FUNCTION----
    function burn(uint256 _tokenId) external {
        require(
            (msg.sender == tokenData[_tokenId].creator && msg.sender == ownerOf(_tokenId)) || msg.sender == owner(),
            "Only creator or Admin"
        );
        _burn(_tokenId);
    }

    /// ----READ FUNCTIONS----
    function tokenContentURI(uint256 _tokenId) public view returns (string memory) {
        return tokenData[_tokenId].contentURI;
    }

    function creator(uint256 _tokenId) public view returns (address) {
        return tokenData[_tokenId].creator;
    }

    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        return tokenData[_tokenId].royaltyPayout;
    }

    /// ----WRITE FUNCTIONS----

    function mint(TokenData calldata _data, bytes32[] calldata _proof) external returns (uint256) {
        require(verify(leaf(_data.creator), _proof), "!proof");
        require(_data.royaltyBPS < 10_000, "!royaltyBPS high");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        tokenData[tokenId] = _data;
        _tokenIdCounter.increment();
        return tokenId;
    }

    function updateContentURI(uint256 _tokenId, string memory _contentURI) external onlyOwner {
        emit ContentUpdated(_tokenId, _contentURI);
        tokenData[_tokenId].contentURI = _contentURI;
    }

    function updateCreator(uint256 _tokenId, address _creator) external onlyOwner {
        emit CreatorUpdated(_tokenId, _creator);
        tokenData[_tokenId].creator = _creator;
    }

    function updateRoot(bytes32 _newRoot) external onlyOwner {
        updateMerkleRoot(_newRoot);
    }

    function updateMetadataURI(uint256 _tokenId, string memory _metadataURI) external {
        require(msg.sender == owner() || msg.sender == tokenData[_tokenId].creator, "!creator/admin");
        emit MetadataUpdated(_tokenId, _metadataURI);
        tokenData[_tokenId].metadataURI = _metadataURI;
    }

    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external onlyOwner {
        emit RoyaltyUpdated(_tokenId, _royaltyPayoutAddress);
        tokenData[_tokenId].royaltyPayout = _royaltyPayoutAddress;
    }

    // ----OVERRIDES----

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenData[_tokenId].metadataURI;
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (tokenData[_tokenId].royaltyPayout, (_salePrice * tokenData[_tokenId].royaltyBPS) / 10_000);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return type(IERC2981Upgradeable).interfaceId == interfaceId || ERC721Upgradeable.supportsInterface(interfaceId);
    }
}
