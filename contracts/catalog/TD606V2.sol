// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {AngelaList} from "../AngelaList.sol";


/**
--------------------------------------------------------------------------------------------------------------------

ooooooooooooo oooooooooo.       .ooo     .oooo.       .ooo   
8'   888   `8 `888'   `Y8b    .88'      d8P'`Y8b    .88'     
     888       888      888  d88'      888    888  d88'      
     888       888      888 d888P"Ybo. 888    888 d888P"Ybo. 
     888       888      888 Y88[   ]88 888    888 Y88[   ]88 
     888       888     d88' `Y88   88P `88b  d88' `Y88   88P 
    o888o     o888bood8P'    `88bod8'   `Y8bd8P'   `88bod8'  

    v2

************************************************
LEGAL DISCLAIMER:
<legal go here>
************************************************

---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
RINKEBY CNFT (V1: CODENAME "TD606")
"TD606_v2"                  :   Creator Shared NFT Media Contract for Catalog Records Inc.
@author                     :   @bretth18 (computerdata) of @catalogworks
@title                      :   TD606_v2
@dev                        :   Upgradeable ERC721 Contract. See interface for further implemntation details.
                                Purpose built for optmization over the Zora V1 contracts.
                                Code relies heavily on implementations thanks to @ isian (iain nash) of Zora. 
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
 */
contract TD606_v2 is
    ERC721Upgradeable,
    IERC2981Upgradeable,
    OwnableUpgradeable,
    AngelaList    
{

    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Events
    event MetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event ContentUpdated(uint256 indexed tokenId, string contentURI);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed payoutAddress);

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
        @notice Burns a token
        @param _tokenId uint256 identifier of token to burn
        @dev burns given tokenId, restrited to owner (approved artists should burn?)
     */
    function burn(uint256 _tokenId) external {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not Approved!");
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
    function creator(uint256 _tokenId) public view  returns (address) {
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
    function mint(
        TokenData calldata _data,
        bytes32[] calldata _proof
    ) external returns (uint256){

        /// call angela
        require(verify(leaf(_data.creator), _proof), "!valid proof");

        require(_data.royaltyBPS < 10000, "BPS !< 10000");

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
    function updateContentURI(
        uint256 _tokenId,
        string memory _contentURI
    ) external onlyOwner {

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
    function updateRoot(bytes32 _newRoot) external onlyOwner {
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
    function updateMetadataURI(
        uint256 _tokenId,
        string memory _metadataURI
    ) external tokenExists(_tokenId) onlyOwner {
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
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) external onlyOwner {

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
        returns (address receiver, uint256 royaltyAmount) {

        /// Don't give royalties to a bottomless pit lol. 
        if(owner() == address(0x0)) {
            return (owner(), 0);
        }

        return (owner(), (_salePrice * tokenData[_tokenId].royaltyBPS) / 10_000);
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
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool) {
        
        return 
            type(IERC2981Upgradeable).interfaceId == interfaceId ||
            ERC721Upgradeable.supportsInterface(interfaceId);
            // || type(ITokenContent).interfaceId == intefaceId;
    
    }


}