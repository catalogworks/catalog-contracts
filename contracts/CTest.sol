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

    /// Mappings
    mapping(uint256 => string) public tokenMetadataURIs;
    /// TODO: add a bunch of mapping types

    /// mappy the token data to the token id yeah oh yeah
    mapping(uint256 => TokenData) private tokenData;

    /// EIP712 shit
    mapping(address => mapping(uint256 => uint256)) public permitNonces;

    mapping(address => uint256) public mintWithSigNonces;


    /// typehashes
    // bytes32 public constant PERMIT_TYPEHASH = keccack256 blah blah blah;
    bytes32 public constant PERMIT_TYPEHASH = keccak256('Permit(address, uint256, uint256, uint256)');
    bytes32 public constant MINT_WITH_SIG_TYPEHASH = keccak256('MintWithSig(address, uint256, address, string, string)');


    // Tracking token Id
    CountersUpgradeable.Counter private _tokenIdCounter;


    /// ooz upgradeable constructor thingy
    constructor() initializer{}


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



    /// Basic override for owner interface
    function owner() public view override(OwnableUpgradeable) returns (address) {
        return super.owner();
    }

    /// Basic burn function
    function burn(uint256 _tokenId) public onlyOwner {
        require(_exists(_tokenId));
        // require(_isApprovedOrOwner(_msgSender(), _tokenId), "Not Approved!");
        _burn(_tokenId);
    }


    /// get token URIs
    function getURIs(uint256 _tokenId) public view returns (string memory, string memory) {

        TokenData memory data = tokenData[_tokenId];
        
        return (data.metadataURI, data.contentURI);
    }


    /// token content URI
    function tokenContentURI(uint256 _tokenId) public view returns (string memory) {
        return tokenData[_tokenId].contentURI;
    }
    
    /// returns creator address of token id
    function creator(uint256 _tokenId) public view  returns (address) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].creator;
    }

    /// returns royalty payout address for token id
    function royaltyPayoutAddress(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].royaltyPayout;
    }


    /// MINT FUNCTION
    /// params should be calldata in  implementation w/ accesscontrol etc. etc. this just test
    function mint(
        address to,
        string memory _metadataURI,
        string memory _contentURI,
        address _creator,
        address _royaltyPayoutAddress,
        uint16 _royaltyBPS
    ) public {

        require(_royaltyBPS < 10000, "royalty too high! calm down!");


        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);

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

    /// Test function to attempt merkle proof whitelisting
    function mintWhitelist(
        address to,
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
        _safeMint(to, tokenId);

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


    /// mint with sig (EIP712)
    function mintWithSig(
        address to,
        string memory _metadataURI,
        string memory _contentURI,
        address _creator,
        address _royaltyPayoutAddress,
        uint16 _royaltyBps,
        EIP712Signature memory _sig
    ) public {

        require(_sig.deadline == 0 || _sig.deadline > block.timestamp, "mintWithSig expired");

        bytes32 domainSeparator = _calculateDomainSeparator();

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        MINT_WITH_SIG_TYPEHASH,
                        _royaltyBps,
                        mintWithSigNonces[_creator]++,
                        _sig.deadline
                    )
                )
            )
        );
        /// elyptic curve baby
        address recoveredAddress = ecrecover(digest, _sig.v, _sig.r, _sig.s);


        require(
            recoveredAddress != address(0) && _creator == recoveredAddress,
            "Invalid Signature! wyd!!!"
        );



    }



    function _calculateDomainSeparator() internal view returns (bytes32) {
        /// lifted from zora wtf,
        uint256 chainID;
        
        assembly {
            chainID := chainid()
        }
        /// yeah yeah yeah 
        return keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name, string version, uint256 chainId, address verifiyingContract)"
                ),
                keccak256(bytes("Catalog")),
                keccak256(bytes("1")),
                chainID,
                address(this)
            )
        );
    }


    /// permit modified for ERC-721, based on EIP2612 (zora)
    function permit(
        address _to, 
        uint256 _tokenId, 
        EIP712Signature memory _sig
    ) public override {
        require(
            _sig.deadline == 0 || _sig.deadline >= block.timestamp,
            "Permit expired!"
        );
        /// check if black hole
        require(_to != address(0), "Recipient cannot be 0x0");

        bytes32 domainSeparator = _calculateDomainSeparator();

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        PERMIT_TYPEHASH,
                        _to,
                        _tokenId,
                        permitNonces[ownerOf(_tokenId)][_tokenId]++,
                        _sig.deadline
                    )
                )
            )
        );

        /// recover ecdsa
        address recoveredAddress = ecrecover(digest, _sig.v, _sig.r, _sig.s);


        require(
            recoveredAddress != address(0) && ownerOf(_tokenId) == recoveredAddress,
            "Invalid Signature! hey!!"
        );

        _approve(_to, _tokenId);
    }


    /// update tokenURIs 
    function updateTokenURIs(
        uint256 _tokenId,
        string memory _metadataURI,
        string memory _contentURI
    ) public onlyOwner {

        tokenData[_tokenId].metadataURI = _metadataURI;
        tokenData[_tokenId].contentURI = _contentURI;
    
    
        // event heree!
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return tokenData[_tokenId].metadataURI;
    }

    /// update royalty info 
    function updateRoyaltyInfo(uint256 _tokenId, address _royaltyPayoutAddress) public onlyOwner {
        /// TODO make ext call to royalty contract to handle changes
        tokenData[_tokenId].royaltyPayout = _royaltyPayoutAddress;

        // this should broadcast an event!
    }

    /// royalty function, EIP-2981
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
    

    /// supports interface
    function supportsInterface(bytes4 interfaceId)
        public 
        view
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool) {
        
        return 
            type(IERC2981Upgradeable).interfaceId == interfaceId ||
            ERC721Upgradeable.supportsInterface(interfaceId);
    
    }

}


