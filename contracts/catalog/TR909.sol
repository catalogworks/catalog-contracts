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

 ______  ____       __      __      __
/\__  _\/\  _`\   /'_ `\  /'__`\  /'_ `\
\/_/\ \/\ \ \L\ \/\ \L\ \/\ \/\ \/\ \L\ \
   \ \ \ \ \ ,  /\ \___, \ \ \ \ \ \___, \
    \ \ \ \ \ \\ \\/__,/\ \ \ \_\ \/__,/\ \
     \ \_\ \ \_\ \_\   \ \_\ \____/    \ \_\
      \/_/  \/_/\/ /    \/_/\/___/      \/_/


************************************************
LEGAL DISCLAIMER:
https://catalog.works/terms
************************************************

---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
RINKEBY CNFT (V2: CODENAME "TR909")
@title TR909
@author @bretth18 (COMPUTER DATA) of @catalogworks
@notice Catalog Shared Creator Contract (CNFT), v2(TR909). This is an upgradeable ERC721 contract, with a access
        control restrictions for a given Admin address. Purpose built for optimization over the original Zora V1
        contracts. Special thanks to @ isian (Iaian Nash) of Zora for help with this implementation.
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
 */

contract TR909 is ERC721Upgradeable, IERC2981Upgradeable, OwnableUpgradeable, AngelaList {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Event
    event MetadataUpdate(uint256 indexed tokenId, string metadataURI);
    event ContentUpdate(uint256 indexed tokenId, string contentURI);
    event RoyaltyUpdate(uint256 indexed tokenId, address indexed payoutAddress);

    /// State
    struct Data {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }

    /// Private variable to track tokenIds
    CountersUpgradeable.Counter private _tokenIdCount;

    /// Mappings
    mapping(uint256 => Data) private _data;

    /// Constructor
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    /// Initialize Function
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();

        /// Set the tokenId to start at 1
        _tokenIdCount.increment();
    }

    /// WRITE FUNCTIONS

    /// Burn Function
    /// @notice Burn Function
    /// @param _tokenId: The tokenId to burn
    /// @dev Requires contract admin or creator of token to burn.
    function burn(uint256 _tokenId) external {
        require(
            msg.sender == _data[_tokenId].creator || msg.sender == owner(),
            "Only creator or Admin"
        );
        _burn(_tokenId);
    }

    /// Mint Function
    /// @notice Mint Function
    /// @param _inputData: tuple data of type Data, containing contents of CNFT.
    /// @param _proof: bytes32[] Valid merkle proof for the input creator address.
    /// @return uint256 The tokenId of the minted token.
    /// @dev Mint requires a valid Merkle proof. We use the creator address as the source of truth here.
    function mint(Data calldata _inputData, bytes32[] calldata _proof) external returns (uint256) {
        /// Validate Proof
        require(verify(leaf(_inputData.creator), _proof), "!proof");
        require(_inputData.royaltyBPS < 10000, "!royalty <10k");

        uint256 tokenId = _tokenIdCount.current();
        _mint(msg.sender, tokenId);

        /// Set Data
        _data[tokenId] = Data({
            metadataURI: _inputData.metadataURI,
            contentURI: _inputData.contentURI,
            creator: _inputData.creator,
            royaltyPayout: _inputData.royaltyPayout,
            royaltyBPS: _inputData.royaltyBPS
        });

        /// Increment TokenId
        _tokenIdCount.increment();
        return tokenId;
    }

    /// Update Content Function
    /// @notice Update ContentURI Function
    /// @param _tokenId: The tokenId to update
    /// @param _contentURI: The new contentURI
    /// @dev Requires contract admin to update.
    function updateContentURI(uint256 _tokenId, string memory _contentURI) external {
        require(msg.sender == owner(), "!admin");
        emit ContentUpdate(_tokenId, _contentURI);
        _data[_tokenId].contentURI = _contentURI;
    }

    /// Update Metadata Function
    /// @notice Update MetadataURI Function
    /// @param _tokenId: The tokenId to update
    /// @param _metadataURI: The new metadataURI
    /// @dev Requires contract admin to update or creator to update
    function updateMetadataURI(uint256 _tokenId, string memory _metadataURI) external {
        require(_exists(_tokenId), "!exists");
        require(msg.sender == _data[_tokenId].creator || msg.sender == owner(), "!creator or !admin");
        emit MetadataUpdate(_tokenId, _metadataURI);
        _data[_tokenId].metadataURI = _metadataURI;
    }

    /// Update Royalty Info Function
    /// @notice Update Royalty Info Function
    /// @param _tokenId: The tokenId to update
    /// @param _royaltyPayoutAddress: The new royalty payout address
    /// @dev Requires contract admin to update.
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external {
        require(_exists(_tokenId), "!exists");
        require(msg.sender == owner(), "!admin");
        emit RoyaltyUpdate(_tokenId, _royaltyPayoutAddress);
        _data[_tokenId].royaltyPayout = _royaltyPayoutAddress;
    }

    /// Update Root Function
    /// @notice Update Root Function
    /// @param _newRoot: The new Merkle Root
    /// @dev Requires contract admin to update, emits a merkleRootUpdated event.
    function updateRoot(bytes32 _newRoot) external {
        require(msg.sender == owner(), "!admin");
        updateMerkleRoot(_newRoot);
    }

    /// READ FUNCTIONS

    /// Get Creator
    /// @notice Get Creator Function
    /// @param _tokenId: The tokenId to get creator of
    /// @return address The creator of the tokenId
    function creator(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "!exists");
        return _data[_tokenId].creator;
    }

    /// Get Royalty Payout Address
    /// @notice Get Royalty Payout Address Function
    /// @param _tokenId: The tokenId to get the royalty payout address for
    /// @return address The royalty payout address
    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "!exists");
        return _data[_tokenId].royaltyPayout;
    }

    /// Get tokenContentURI
    /// @notice Get tokenContentURI Function
    /// @param _tokenId: The tokenId to obtain the content URI from
    /// @return string The content URI of the token
    function tokenContentURI(uint256 _tokenId) external view returns (string memory) {
        return _data[_tokenId].contentURI;
    }

    /// OVERRIDE FUNCTIONS

    /// Get TokenURI
    /// @notice Get TokenURI Function
    /// @param _tokenId: The tokenId to get the URI for
    /// @return string The metadataURI of the token
    /// @dev Returns the metadataURI of the token, there is no method for metadataURI()
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _data[_tokenId].metadataURI;
    }

    /// Override function for EIP2981
    /// @notice royaltyInfo Function conforms to EIP2981
    /// @param _tokenId: The tokenId to update
    /// @param _salePrice: The new sale price
    /// @return receiver royalty payout address and calculated royalty payment
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (_data[_tokenId].royaltyPayout, (_salePrice * _data[_tokenId].royaltyBPS) / 10000);
    }

    /// SupportsInterface Override Function
    /// @notice interface Override Function
    /// @param _interfaceId: The interfaceId to check
    /// @return interfcae supported
    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return
            type(IERC2981Upgradeable).interfaceId == _interfaceId || ERC721Upgradeable.supportsInterface(_interfaceId);
    }
}
