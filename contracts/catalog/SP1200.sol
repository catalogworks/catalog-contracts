// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {AngelaList} from "../AngelaList.sol";

/**
--------------------------------------------------------------------------------------------------------------------

 ____    ____       _      ___       __      __
/\  _`\ /\  _`\   /' \   /'___`\   /'__`\  /'__`\
\ \,\L\_\ \ \L\ \/\_, \ /\_\ /\ \ /\ \/\ \/\ \/\ \
 \/_\__ \\ \ ,__/\/_/\ \\/_/// /__\ \ \ \ \ \ \ \ \
   /\ \L\ \ \ \/    \ \ \  // /_\ \\ \ \_\ \ \ \_\ \
   \ `\____\ \_\     \ \_\/\______/ \ \____/\ \____/
    \/_____/\/_/      \/_/\/_____/   \/___/  \/___/

************************************************
LEGAL DISCLAIMER:
https://catalog.works/terms
************************************************

---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
RINKEBY CNFT (V2.1: CODENAME "SP1200")
"SP1200"                    :   Creator Shared NFT Media Contract for Catalog Records Inc.
@author                     :   @bretth18 (computerdata) of @catalogworks
@title                      :   SP1200
@dev                        :   Upgradeable ERC721 Contract. This version is for testing an alternative burn method. 
                                Purpose built for optmization over the Zora V1 contracts.
                                Code relies heavily on implementations thanks to @ isian (iain nash) of Zora. 
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
 */
contract SP1200 is ERC721Upgradeable, IERC2981Upgradeable, AccessControlUpgradeable, AngelaList {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Events
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event ContentUpdated(uint256 indexed tokenId, string contentURI);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed payoutAddress);

    // Roles
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant TREE_ROLE = keccak256("TREE_ROLE");

    /// State
    struct TokenData {
        string metadataURI;
        string contentURI;
        address creator;
        address royaltyPayout;
        uint16 royaltyBPS;
    }

    /// Mappings
    /// Maps tokenId to data struct
    mapping(uint256 => TokenData) private tokenData;

    // Tracking token Id
    CountersUpgradeable.Counter private _tokenIdCounter;

    /// Modifiers
    modifier tokenExists(uint256 _tokenId) {
        require(_exists(_tokenId), "Token does not exist");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    /**
        initialize Function
        @notice Initializes contract with default values, acts as a constructor
        @param _name string name of the contract
        @param _symbol string symbol of the contract
        @dev OZ proxy
     */

    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        _grantRole(TREE_ROLE, msg.sender);

        // Set tokenId to start @ 1
        _tokenIdCounter.increment();
    }

    /**
        Burn Function
        @notice Burns a token
        @param _tokenId uint256 identifier of token to burn
        @dev requires sender to be creator or have BURNER_ROLE
     */
    function burn(uint256 _tokenId) external {
        require(
            msg.sender == tokenData[_tokenId].creator || hasRole(BURNER_ROLE, msg.sender),
            "Only creator or burner can burn"
        );
        _burn(_tokenId);
    }

    /**
        tokenContentURI Function
        @notice gets the URI of the content of a token. subject to change pending EIP draft
        @param _tokenId uint256 identifier of token to get content URI for
        @return string content URI for given tokenId
        @dev basic public getter method for content URI
     */
    function tokenContentURI(uint256 _tokenId) public view returns (string memory) {
        return tokenData[_tokenId].contentURI;
    }

    /**
        creator Function
        @notice gets the creator of a token
        @param _tokenId uint256 identifier of token to get creator for
        @return address creator of given tokenId
        @dev idk what this should be called, and do we need?
     */
    function creator(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenData[_tokenId].creator;
    }

    /**
        royaltyPayoutAddress Function
        @notice gets the address of the royalty payout for a token
        @param _tokenId uint256 identifier of token to get royalty payout address for
        @return address royalty payout address of given tokenId
        @dev not part of EIP2981, but useful 
     */
    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenData[_tokenId].royaltyPayout;
    }

    /**
        mint Function
        @notice mints a new token
        @param _data TokenData struct, see ITB303
        @param _proof bytes32[] merkle proof of artist wallet. 
                                this is created off-chain.  e.g (proof = tree.getHexProof(keccak256(address)))
        @return uint256 tokenId of minted token (useful since we are not using Enumerable)
        @dev mints a new token to allowlisted msg.sender with a valid merkle proof. params can and should
             be changed to calldata for gas efficiency. rename to "allowlist"

     */
    function mint(TokenData calldata _data, bytes32[] calldata _proof) external returns (uint256) {
        /// call angela
        require(verify(leaf(_data.creator), _proof), "!valid proof");

        require(_data.royaltyBPS < 10000, "royalty !< 10000");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);

        tokenData[tokenId] = TokenData({
            metadataURI: _data.metadataURI,
            contentURI: _data.contentURI,
            creator: _data.creator,
            royaltyPayout: _data.royaltyPayout,
            royaltyBPS: _data.royaltyBPS
        });

        /// increase tokenid
        _tokenIdCounter.increment();

        return tokenId;
    }

    /**
        updateContentURI Function
        @notice updates the content URI of a token, emits an event
        @param _tokenId uint256 token id corresponding to the token to update
        @param _contentURI string containing new/updated media content (subject to change, new EIP)
        @dev access controlled function, restricted to owner/admim. subject to change.
     */
    function updateContentURI(uint256 _tokenId, string memory _contentURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit ContentUpdated(_tokenId, _contentURI);
        tokenData[_tokenId].contentURI = _contentURI;
    }

    /**
        updateRoot Function
        @notice updates the merkleroot of the allowlist
        @param _newRoot bytes32 containing the new root hash, generated off-chain
        @dev access controlled function, restricted to owner/admim.
        @notice this function is inherits from Angela.sol, and may not be necessary depending
                on role based configuration.
     */
    function updateRoot(bytes32 _newRoot) external onlyRole(TREE_ROLE) {
        updateMerkleRoot(_newRoot);
    }

    /**
        updateMetadataURI Function
        @notice updates the metadata URI of a token, emits an event
        @param _tokenId uint256 token id corresponding to the token to update
        @param _metadataURI string containing new/updated metadata (e.g IPFS URI pointing to metadata.json)
        @dev access controlled, restricted to contract owner 
             when they own the tokenId or the creator (when they own the token)
     */
    function updateMetadataURI(uint256 _tokenId, string memory _metadataURI) external tokenExists(_tokenId) {
        require(
            msg.sender == tokenData[_tokenId].creator || hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only creator or admin"
        );
        // event
        emit MetadataUpdated(_tokenId, _metadataURI);

        tokenData[_tokenId].metadataURI = _metadataURI;
    }

    /**
        updateRoyaltyInfo Function
        @notice updates the royalty payout address and royalty BPS of a token, emits an event
        @param _tokenId uint256 token id corresponding to the token of which to update royalty payout
        @param _royaltyPayoutAddress address of new royalty payout address
        @dev access controlled to owner only, subject to change. 
             this function allows for emergency royalty control (i.e compromised wallet)
     */
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit RoyaltyUpdated(_tokenId, _royaltyPayoutAddress);
        tokenData[_tokenId].royaltyPayout = _royaltyPayoutAddress;
    }

    /**
        tokenURI Function
        @notice override function to get the URI of a token. returns stored metadataURI
        @param _tokenId uint256 token id corresponding to the token of which to get metadata from
        @return string containing metadata URI
        @dev override function, returns metadataURI of token stored in tokenData
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].metadataURI;
    }

    /**
        royaltyInfo Function
        @notice override function gets royalty information for a token (EIP-2981)
        @param _tokenId uint256 token id corresponding to the token of which to get royalty information
        @param _salePrice uint256 final sale price of token used to calculate royalty payout
        @dev override, conforms to EIP-2981
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (tokenData[_tokenId].royaltyPayout, (_salePrice * tokenData[_tokenId].royaltyBPS) / 10_000);
    }

    /**
        supportsInterface Function
        @notice override function to check if contract supports an interface
        @param interfaceId bytes4 id of interface to check
        @dev override 
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, IERC165Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return
            type(IERC2981Upgradeable).interfaceId == interfaceId ||
            ERC721Upgradeable.supportsInterface(interfaceId) ||
            AccessControlUpgradeable.supportsInterface(interfaceId);
    }
}
