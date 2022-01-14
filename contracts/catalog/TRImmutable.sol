// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;




import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { IERC2981 } from "../interfaces/IERC2981.sol";
import { IERC165 } from "@openzeppelin/contracts/interfaces/IERC165.sol";

import { ALImmutable } from "../ALImmutable.sol";


contract TRImmutable is ERC721, Ownable, IERC2981, ALImmutable {

    using Counters for Counters.Counter;

    /// Events
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event ContentUpdated(uint256 indexed tokenId, string contentURI);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed royaltyPayout);

    /// State
    struct TokenData {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }
    /// Mappings
    mapping (uint256 => TokenData) private _tokenData;
    Counters.Counter private _tokenIdCounter;

    /// Constructor
    constructor() ERC721("TRImmutable", "TRI") {
        _tokenIdCounter.increment();
    }

    /// Mint
    /// perhaps no object constructor needed?
    function mint(TokenData calldata _inputData, bytes32[] calldata _proof) external returns (uint256) {
        require(verify(leaf(_inputData.creator), _proof), "!proof");
        require(_inputData.royaltyBPS < 10000, "!royalty<10k");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);

        _tokenData[tokenId] = _inputData;

        _tokenIdCounter.increment();
        return tokenId;
    }

    /// Burn 
    function burn(uint256 _tokenId) external {
        require(
            (msg.sender == _tokenData[_tokenId].creator && msg.sender == ownerOf(_tokenId)) || msg.sender == owner(),
            "Only creator or Admin"
        );
        _burn(_tokenId);
    }

    /// setMetadataURI
    function updateMetadata(uint256 _tokenId, string memory _metadataURI) external {
        require(_exists(_tokenId), "!tokenId");
        require(msg.sender == owner() || msg.sender == _tokenData[_tokenId].creator, "!creator/admin");
        emit MetadataUpdated(_tokenId, _metadataURI);
        _tokenData[_tokenId].metadataURI = _metadataURI;
    }

    /// setContentURI
    function updateContent(uint256 _tokenId, string memory _contentURI) external {
        require(msg.sender == owner(), "!admin");
        emit ContentUpdated(_tokenId, _contentURI);
        _tokenData[_tokenId].contentURI = _contentURI;
    }


    /// updateRoyalty
    function updateRoyalty(uint256 _tokenId, address _payoutAddress) external {
        require(msg.sender == owner(), "!admin");
        emit RoyaltyUpdated(_tokenId, _payoutAddress);
        _tokenData[_tokenId].royaltyPayout = _payoutAddress;
    }


    /// updateRoot
    function updateRoot(bytes32 _newRoot) external {
        require(msg.sender == owner(), "!admin");
        updateMerkleRoot(_newRoot);(_newRoot);
    }


    ///
    
    function creator(uint256 _tokenId) public view returns (address) {
        return _tokenData[_tokenId].creator;
    }

    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        return _tokenData[_tokenId].royaltyPayout;
    }

    function tokenContentURI(uint256 _tokenId) public view returns (string memory) {
        return _tokenData[_tokenId].contentURI;
    }


    /// override


    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenData[_tokenId].metadataURI;
    }


    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (_tokenData[_tokenId].royaltyPayout, (_salePrice * _tokenData[_tokenId].royaltyBPS) / 10000);
    }




    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC721)
        returns (bool)
    {
        return
            type(IERC2981).interfaceId == _interfaceId || ERC721.supportsInterface(_interfaceId);
    }



}