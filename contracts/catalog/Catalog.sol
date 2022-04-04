// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
--------------------------------------------------------------------------------------------------------------------

                                    ,,
  .g8"""bgd         mm            `7MM
.dP'     `M         MM              MM
dM'       ` ,6"Yb.mmMMmm  ,6"Yb.    MM  ,pW"Wq.   .P"Ybmmm
MM         8)   MM  MM   8)   MM    MM 6W'   `Wb :MI  I8
MM.         ,pm9MM  MM    ,pm9MM    MM 8M     M8  WmmmP"
`Mb.     ,'8M   MM  MM   8M   MM    MM YA.   ,A9 8M
  `"bmmmd' `Moo9^Yo.`Mbmo`Moo9^Yo..JMML.`Ybmd9'   YMMMMMb
                                                 6'     dP
                                                 Ybmmmd'

************************************************
LEGAL DISCLAIMER:
https://catalog.works/terms
************************************************

---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           

@title                      :   Catalog
@author                     :   COMPUTER DATA (brett henderson) of @catalogworks
@notice                     :   Catalog Shared Creator Contract
@dev                        :   Upgradeable ERC721 Contract, inherits functionality from ERC721Upgradeable.
                                Purpose built for optimization over the Zora V1 contracts.
                                Code relies on implementations thanks to @ isian (iain nash) of Zora. 

---------------------------------------------------------------------------------------------------------------------    
 */
contract Catalog is ERC721Upgradeable, IERC2981Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event CreatorUpdated(uint256 indexed tokenId, address indexed creator);
    event ContentUpdated(uint256 indexed tokenId, bytes32 indexed contentHash, string contentURI);
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event MerkleRootUpdated(bytes32 indexed merkleRoot);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed payoutAddress);

    /*//////////////////////////////////////////////////////////////
                         STATE/STORAGE/CALLDATA
    //////////////////////////////////////////////////////////////*/

    /// @notice Storage for readable properties of a Catalog NFT
    /// @param metadataURI URI of the metadata (ipfs://)
    /// @param creator Address of the creator
    /// @param royaltyPayout payout address for royalties (EIP2981)
    /// @param royaltyBPS royalty percentage (in basis points)
    /// @dev This struct is used to store the readable properties of a Catalog NFT
    struct TokenData {
        string metadataURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }

    /// @notice Calldata struct for input ContentData
    /// @param contentURI URI of the content (ipfs://)
    /// @param contentHash SHA256 hash of the content
    /// @dev This struct is not stored in storage, only used to emit events via input calldata
    struct ContentData {
        string contentURI;
        bytes32 contentHash;
    }

    /// Mapping and Storage
    mapping(uint256 => TokenData) private tokenData;
    /// Tracking tokenIds
    CountersUpgradeable.Counter private _tokenIdCounter;
    /// Merkle Root
    bytes32 public merkleRoot;

    /*//////////////////////////////////////////////////////////////
                             INITIALIZATION
    //////////////////////////////////////////////////////////////*/

    /**
        @notice Initializes contract with default values
        @param _name name of the contract
        @param _symbol symbol of the contract
        @dev Contains constructor logic, initializes proxied contract. Must be called upon deployment.
     */
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        __UUPSUpgradeable_init();

        /// Start tokenId @ 1
        _tokenIdCounter.increment();
    }

    /*//////////////////////////////////////////////////////////////
                                  BURN
    //////////////////////////////////////////////////////////////*/

    /**
        @notice Burns a token, given input tokenId
        @param _tokenId identifier of token to burn
        @dev burns given tokenId, restricted to creator (when owned)
     */
    function burn(uint256 _tokenId) external {
        require((msg.sender == tokenData[_tokenId].creator && msg.sender == ownerOf(_tokenId)), "Only creator");
        _burn(_tokenId);
    }

    /*//////////////////////////////////////////////////////////////
                                  READ
    //////////////////////////////////////////////////////////////*/
    /**
        @notice returns the creator address of a given tokenId
        @param _tokenId identifier of token to get creator for
        @return creator address of given tokenId
        @dev basic public getter method for creator
     */
    function creator(uint256 _tokenId) public view returns (address) {
        address c = tokenData[_tokenId].creator;
        return c;
    }

    /**
        @notice gets the address of the royalty payout for a token
        @param _tokenId identifier of token to get royalty payout address for
        @return royalty payout address of given tokenId
        @dev basic public getter method for royalty payout address 
     */
    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        address r = tokenData[_tokenId].royaltyPayout;
        return r;
    }

    /*//////////////////////////////////////////////////////////////
                                  MINT
    //////////////////////////////////////////////////////////////*/
    /**
        @notice mints a new token
        @param _data input TokenData struct, containing metadataURI, creator, royaltyPayout, royaltyBPS
        @param _content input ContentData struct, containing contentURI, contentHash. 
                        not stored in memory, only in calldata
        @param _proof merkle proof of artist wallet. 
                        this is created off-chain.  e.g (proof = tree.getHexProof(keccak256(address)))
        @return tokenId of minted token (useful since we are not using Enumerable)
        @dev mints a new token to allowlisted msg.sender with a valid merkle proof. 
                        Emits a ContentUpdated event to trackcontentURI updates.
     */
    function mint(
        TokenData calldata _data,
        ContentData calldata _content,
        bytes32[] calldata _proof
    ) external returns (uint256) {
        require(
            MerkleProofUpgradeable.verify(_proof, merkleRoot, keccak256(abi.encodePacked(_data.creator))),
            "!valid proof"
        );
        require(_data.royaltyBPS < 10000, "royalty !< 10000");

        uint256 tokenId = _tokenIdCounter.current();

        _mint(msg.sender, tokenId);
        tokenData[tokenId] = _data;

        // Emit Event to track ContentURI
        emit ContentUpdated(tokenId, _content.contentHash, _content.contentURI);

        _tokenIdCounter.increment();
        return tokenId;
    }

    /*//////////////////////////////////////////////////////////////
                                  WRITE
    //////////////////////////////////////////////////////////////*/
    /**
        @notice Emits an event to be used track content updates on a token
        @param _tokenId token id corresponding to the token to update
        @param _content struct containing new/updated contentURI and hash.
        @dev access controlled function, restricted to owner/admim.
     */
    function updateContentURI(uint256 _tokenId, ContentData calldata _content) external onlyOwner {
        emit ContentUpdated(_tokenId, _content.contentHash, _content.contentURI);
    }

    /**
        @notice updates the creator of a token, emits an event
        @param _tokenId token id corresponding to the token to update
        @param _creator address new creator of the token
        @dev access controlled function, restricted to owner/admim. used in case of compromised artist wallet.
     */
    function updateCreator(uint256 _tokenId, address _creator) external onlyOwner {
        emit CreatorUpdated(_tokenId, _creator);
        tokenData[_tokenId].creator = _creator;
    }

    /**
        @notice updates the merkleroot of the allowlist
        @param _newRoot containing the new root hash, generated off-chain
        @dev access controlled function, restricted to owner/admim.
        @notice this function is inherits from Angela.sol, and may not be necessary depending
                on role based configuration.
     */
    function updateRoot(bytes32 _newRoot) external onlyOwner {
        emit MerkleRootUpdated(_newRoot);
        merkleRoot = _newRoot;
    }

    /**
        @notice updates the metadata URI of a token, emits an event
        @param _tokenId token id corresponding to the token to update
        @param _metadataURI string containing new/updated metadata (e.g IPFS URI pointing to metadata.json)
        @dev access controlled, restricted to creator of token
     */
    function updateMetadataURI(uint256 _tokenId, string memory _metadataURI) external {
        require(msg.sender == tokenData[_tokenId].creator, "!creator");
        emit MetadataUpdated(_tokenId, _metadataURI);
        tokenData[_tokenId].metadataURI = _metadataURI;
    }

    /**
        @notice updates the royalty payout address and royalty BPS of a token, emits an event
        @param _tokenId token id corresponding to the token of which to update royalty payout
        @param _royaltyPayoutAddress address of new royalty payout address
        @dev access controlled to owner only, subject to change. 
             this function allows for emergency royalty control (i.e compromised wallet)
     */
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external onlyOwner {
        emit RoyaltyUpdated(_tokenId, _royaltyPayoutAddress);
        tokenData[_tokenId].royaltyPayout = _royaltyPayoutAddress;
    }

    /*//////////////////////////////////////////////////////////////
                                OVERRIDES
    //////////////////////////////////////////////////////////////*/
    /**
        @notice override of UUPSUpgradeable authorizeUpgrade function. 
                Can be modified to support different authorization schemes.
        @param newImplementation address of the new implementation contract
        @dev access controlled to owner only, upgrades deployed proxy to input implementation. 
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
        @notice override function to get the URI of a token. returns stored metadataURI
        @param _tokenId token id corresponding to the token of which to get metadata from
        @return string containing metadata URI (example: 'ipfs:///...')
        @dev override function, returns metadataURI of token stored in tokenData
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenData[_tokenId].metadataURI;
    }

    /**
        @notice override function gets royalty information for a token (EIP-2981)
        @param _tokenId token id corresponding to the token of which to get royalty information
        @param _salePrice final sale price of token used to calculate royalty payout
        @dev override, conforms to EIP-2981
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (tokenData[_tokenId].royaltyPayout, (_salePrice * tokenData[_tokenId].royaltyBPS) / 10000);
    }

    /**
        @notice override function to check if contract supports an interface
        @param interfaceId id of interface to check
        @dev override 
     */
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
