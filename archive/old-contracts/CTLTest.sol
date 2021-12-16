// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {ICTest} from "./interfaces/ICTest.sol";
import {AngelaList} from "./AngelaList.sol";

// emit hashes in events  as calldata during mint
// contentURi via functions



/**
--------------------------------------------------------------------------------------------------------------------
                                                                                        
  ______ _______ _      _______                
 / _____|_______) |    (_______)          _    
| /      _      | |     _       ____  ___| |_  
| |     | |     | |    | |     / _  )/___)  _) 
| \_____| |_____| |____| |____( (/ /|___ | |__ 
 \______)\______)_______)______)____|___/ \___)
                                                       
************************************************
LEGAL DISCLAIMER:
<legal go here>
************************************************
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
TESTNET WIP (V2)
"CTLTest"                   :   WIP Creator shared NFT Contract for Catalog
@author                     :   @bretth18 (computerdata) 
@title                      :   CTLTest
@dev                        :   currently setup w/ access control and upgradeability.
                                purpose built for optmization over the Zora V1 contracts.
                                code relies heavily on implementations thanks to @ isian (iain nash) of Zora. 
 */
contract CTLTest is
    ICTest,
    ERC721Upgradeable,
    IERC2981Upgradeable,
    OwnableUpgradeable,
    AngelaList    
{

    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Events
    event MetadataUpdated(uint256 indexed, string);
    event RoyaltyUpdated(uint256 indexed, address indexed);

    /// Mappings
    mapping(uint256 => string) public tokenMetadataURIs;
    /// Maps tokenId to data struct
    mapping(uint256 => TokenData) private tokenData;


    // Tracking token Id
    CountersUpgradeable.Counter private _tokenIdCounter;


    /// Modifiers

    /// Check if token exists
    modifier tokenExists(uint256 _tokenId) {
        require(_exists(_tokenId), "Token does not exist");
        _;
    }
    /// Check if allowlisted
    modifier onlyAllowedMinter(bytes32[] calldata _proof) {
        // verify proof of current caller
        require(verify(leaf(msg.sender), _proof), "Only approved artists can mint");
        _;
    }


    /**
        initialize Function
        @notice Initializes contract with default values, acts as a constructor
        @param _name string name of the contract
        @param _symbol string symbol of the contract
        @dev OZ proxy
     */
    function initialize(
        string memory _name,
        string memory _symbol
    ) public initializer {

        __ERC721_init(_name, _symbol);
        __Ownable_init();

        // Set tokenId to start @ 1
        _tokenIdCounter.increment();

    }


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
        @param _data TokenData struct, see ICTest
        @dev mints a new token to msg.sender with input data, no access control. this function is for testing purposes
     */
    function mint(
        TokenData calldata _data
    ) public {

        require(_data.royaltyBPS < 10000, "royalty too high! calm down!");

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
        
    }


    /**
        mintAllowlist Function
        @param _data TokenData struct, see ICTest
        @param _proof bytes32[] merkle proof of artist wallet. this is created off-chain.  e.g (proof = tree.getHexProof(keccak256(address)))
        @return uint256 tokenId of minted token (useful since we are not using Enumerable)
        @dev mints a new token to allowlisted msg.sender with a valid merkle proof. params can and should
             be changed to calldata for gas efficiency. rename to "allowlist"

     */
    function mintAllowlist(
        TokenData calldata _data,
        bytes32[] calldata _proof
    ) external returns (uint256){

        /// call angela
        require(verify(leaf(_data.creator), _proof), "invalid proof");

        require(_data.royaltyBPS < 10000, "royalty too high! calm down!");

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
    ) external onlyOwner {

        tokenData[_tokenId].metadataURI = _metadataURI;
        tokenData[_tokenId].contentURI = _contentURI;
    
    
        // event heree!
    }

    /**
        updateRoot Function
        @param _newRoot bytes32 containing the new root hash, generated off-chain
        @dev access controlled function, restricted to owner/admim.
        @notice this function is inherits from Angela.sol, and may not be necessary depending
                on role based configuration.
     */
    function updateRoot(bytes32 _newRoot) external onlyOwner {
        updateMerkleRoot(_newRoot);
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
        // event 
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
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external onlyOwner {

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