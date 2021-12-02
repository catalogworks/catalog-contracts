// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {ICTest} from "./interfaces/ICTest.sol";
import {AngelaList} from "./AngelaList.sol";
// import {Royalties} from "./Royalties.sol";

/**
--------------------------------------------------------------------------------------------------------------------
                                                                                        
  _____   _______     _____  ______   _______   
 /\ __/\/\_______)\ /\_____\/ ____/\/\_______)\ 
 ) )__\/\(___  __\/( (_____/) ) __\/\(___  __\/ 
/ / /     / / /     \ \__\   \ \ \    / / /     
\ \ \_   ( ( (      / /__/_  _\ \ \  ( ( (      
 ) )__/\  \ \ \    ( (_____\)____) )  \ \ \     
 \/___\/  /_/_/     \/_____/\____\/   /_/_/     
                                                                                                                                                                                                                                                                                                                                                                                                                                                            
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
TESTNET WIP
"CTest"                     :   WIP starting ground for cNFT's
@author                     :   @bretth18 (computerdata) 
@title                      :   CTest
@dev                        :   currently setup w/ minimal access control and upgraeability. 
                                does not implement market level functionality via zora v3 modules (TBD)
 */

/// TODO:
/// use ext calls for updating content to reduce opsize 
/// add merkle proof, access control

contract CTest is
    ICTest,
    ERC721Upgradeable,
    IERC2981Upgradeable,
    OwnableUpgradeable,
    AngelaList
    // Royalties
    
{


    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Events
    event Mint(address indexed, uint256 indexed, address indexed, string, string);
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI );

    /// Mappings
    mapping(uint256 => string) public tokenMetadataURIs;

    /// mappy the token data to the token id yeah oh yeah
    mapping(uint256 => TokenData) private tokenData;


    // Tracking token Id
    CountersUpgradeable.Counter private _tokenIdCounter;


    /// Modifiers

    /// Check if token exists
    modifier tokenExists(uint256 _tokenId) {
        require(_exists(_tokenId), "Token does not exist");
        _;
    }
    /// Check if whitelisted
    modifier onlyAllowedMinter(bytes32[] calldata _proof) {
        // verify proof of current caller
        require(verify(leaf(msg.sender), _proof), "Only approved artists can mint");
        _;
    }


    constructor() initializer{}

    /**
        initialize Function
        @param _owner address of the owner of the contract
        @param _name string name of the contract
        @param _symbol string symbol of the contract
        @dev initializes the ERC721 contract, acts as a constructor. we use this for proxied contracts
     */
    function initialize(
        address _owner,
        string memory _name,
        string memory _symbol
    ) public initializer {

        __ERC721_init(_name, _symbol);
        __Ownable_init();

        // Set ownership to the og sender
        transferOwnership(_owner);


        // Set tokenId to start @ 1
        _tokenIdCounter.increment();

    }


    // /// Basic override for owner interface
    // function owner() public view override(OwnableUpgradeable) returns (address) {
    //     return super.owner();
    // }


    /**
        Burn Function
        @param _tokenId uint256 identifier of token to burn
        @dev burns given tokenId, restrited to owner (approved artists should burn?)
     */
    function burn(uint256 _tokenId) external {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not Approved!");
        _burn(_tokenId);
    }


    /**
        getURIs Function
        @param _tokenId uint256 identifier of token to get URIs for
        @return string[] URIs for metadata and content of given tokenId
        @dev non standard  
     */
    function getURIs(uint256 _tokenId) public view returns (string memory, string memory) {

        TokenData memory data = tokenData[_tokenId];
        
        return (data.metadataURI, data.contentURI);
    }


    /**
        tokenContentURI Function
        @param _tokenId uint256 identifier of token to get content URI for
        @return string content URI for given tokenId
        @dev basic public getter method for content URI 
     */
    function tokenContentURI(uint256 _tokenId) public view returns (string memory) {
        return tokenData[_tokenId].contentURI;
    }
    

    /**
        creator Function
        @param _tokenId uint256 identifier of token to get creator for
        @return address creator of given tokenId
        @dev idk what this should be called, and do we need?
     */
    function creator(uint256 _tokenId) public view  returns (address) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].creator;
    }


    /**
        royaltyPayoutAddress Function
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
        @param _to address to mint to
        @param _metadataURI string containing metadata (e.g IPFS URI pointing to metadata.json)
        @param _contentURI string containing media content (subject to change, new EIP) 
        @param _creator address of creator of token
        @param _royaltyPayoutAddress address of royalty payout address
        @param _royaltyBPS uint256 royalty percentage of creator. must be less than 10_000
        @dev mints a new token with input data, no access control. this function is for testing purposes
     */
    function mint(
        address _to,
        string memory _metadataURI,
        string memory _contentURI,
        address _creator,
        address _royaltyPayoutAddress,
        uint16 _royaltyBPS
    ) public {

        require(_royaltyBPS < 10000, "royalty too high! calm down!");


        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(_to, tokenId);

        tokenData[tokenId] = TokenData({
            metadataURI: _metadataURI,
            contentURI: _contentURI,
            creator: _creator,
            royaltyPayout: _royaltyPayoutAddress,
            royaltyBPS: _royaltyBPS
        });

        // event time 
        emit Mint(_msgSender(), tokenId,  _creator, _metadataURI, _contentURI);

        /// todo: set royalty type function here

    

        /// increase tokenid
        _tokenIdCounter.increment();
        
    }


    /**
        mintWhitelist Function
        @param _to address to mint to
        @param _metadataURI string containing metadata (e.g IPFS URI pointing to metadata.json)
        @param _contentURI string containing media content (subject to change, new EIP)
        @param _creator address of creator of token
        @param _royaltyPayoutAddress address of royalty payout address
        @param _royaltyBPS uint256 royalty percentage of creator. must be less than 10_000
        @param _proof bytes32[] merkle proof of artist wallet. this is created off-chain.  e.g (proof = tree.getHexProof(keccak256(address)))
        @dev mints a new token to whitelisted users with a valid merkle proof
     */
    function mintWhitelist(
        address _to,
        string memory _metadataURI,
        string memory _contentURI,
        address _creator,
        address _royaltyPayoutAddress,
        uint16 _royaltyBPS,
        bytes32[] calldata _proof
    ) external {

        /// call angela
        require(verify(leaf(_creator), _proof), "invalid proof");

        require(_royaltyBPS < 10000, "royalty too high! calm down!");

        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(_to, tokenId);

        tokenData[tokenId] = TokenData({
            metadataURI: _metadataURI,
            contentURI: _contentURI,
            creator: _creator,
            royaltyPayout: _royaltyPayoutAddress,
            royaltyBPS: _royaltyBPS
        });

        // event time 
        emit Mint(_msgSender(), tokenId,  _creator, _metadataURI, _contentURI);

        /// todo: set royalty type function here

        /// increase tokenid
        _tokenIdCounter.increment();
    
    }


    /**
        updateTokenURIs Function
        @param _tokenId uint256 token id corresponding to the token to update
        @param _metadataURI string containing new/updated metadata (e.g IPFS URI pointing to metadata.json)
        @param _contentURI string containing new/updated media content (subject to change, new EIP)
        @dev access controlled function, restricted to owner/admim. subject to change.
     */
    function updateTokenURIs(
        uint256 _tokenId,
        string memory _metadataURI,
        string memory _contentURI
    ) public onlyOwner {

        tokenData[_tokenId].metadataURI = _metadataURI;
        tokenData[_tokenId].contentURI = _contentURI;
    
    
        // event heree!
    }


    /**
        updateMetadataURI Function
        @param _tokenId uint256 token id corresponding to the token to update
        @param _metadataURI string containing new/updated metadata (e.g IPFS URI pointing to metadata.json)
        @dev access controlled, restricted to contract owner when they own the tokenId or the creator (when they own the token)
     */
    function updateMetadataURI(
        uint256 _tokenId,
        string memory _metadataURI
    ) external tokenExists(_tokenId) onlyOwner {

        emit MetadataUpdated(_tokenId, _metadataURI);
        tokenData[_tokenId].metadataURI = _metadataURI;
    }
    

    /**
        tokenURI Function
        @param _tokenId uint256 token id corresponding to the token of which to get metadata from
        @return string containing metadata URI
        @dev override function, returns metadataURI of token stored in tokenData
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].metadataURI;
    }


    /**
        updateRoyaltyInfo Function
        @param _tokenId uint256 token id corresponding to the token of which to update royalty payout
        @param _royaltyPayoutAddress address of new royalty payout address
        @dev access controlled to owner only, subject to change. this function allows for emergency royalty control (i.e compromised wallet)
     */
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) public onlyOwner {
        /// TODO make ext call to royalty contract to handle changes
        tokenData[_tokenId].royaltyPayout = _royaltyPayoutAddress;

        // this should broadcast an event!
    }


    /**
        royaltyInfo Function
        @param _tokenId uint256 token id corresponding to the token of which to get royalty information
        @param _salePrice uint256 final sale price of token used to calculate royalty payout
        @dev override, conforms to EIP-2981
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) 
        external 
        view 
        override 
        returns (address receiver, uint256 royaltyAmount) {

        /// Don't give royalties to a bottomless pit lol. 
        if(owner() == address(0x0)) {
            return (owner(), 0);
        }

        return (owner(), (_salePrice * tokenData[_tokenId].royaltyBPS) / 10_000);
    }
    

    /**
        supportsInterface Function
        @param interfaceId bytes4 id of interface to check
        @dev override 
     */
    function supportsInterface(bytes4 interfaceId)
        public 
        view
        virtual
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool) {
        
        return 
            type(IERC2981Upgradeable).interfaceId == interfaceId ||
            ERC721Upgradeable.supportsInterface(interfaceId);
            // || type(ITokenContent).interfaceId == intefaceId;
    
    }


}