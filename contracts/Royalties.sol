// SPDX-License-Identifier: MIT


pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./interfaces/IERC2981.sol";

/// sepearate royalties contract "module"
contract Royalties is IERC2981, ERC165 {

    /// Events
    event RoyaltyUpdated(uint256 indexed tokenId, address royaltyReceiver, uint256 royaltyBPS);


    struct RoyaltyInfo {
        uint256 royaltyBPS;
        address royaltyReceiver;
    }

    /// Mappings
    mapping(uint256 => RoyaltyInfo) public royalties;


    /// setter functions for updating royalty info for given tokenId
    function _setPayoutAddressForToken(address _royaltyReceiver, uint256 _tokenId) internal virtual {
        /// emit event
        emit RoyaltyUpdated(_tokenId, _royaltyReceiver, royalties[_tokenId].royaltyBPS);

        royalties[_tokenId].royaltyReceiver = _royaltyReceiver;
    }


    function _setRoyaltyForToken(address _royaltyReceiver, uint256 _royaltyBPS, uint256 _tokenId) internal virtual {

        /// emit event
        emit RoyaltyUpdated(_tokenId, _royaltyReceiver, _royaltyBPS);

        royalties[_tokenId] = RoyaltyInfo({
            royaltyBPS: _royaltyBPS,
            royaltyReceiver: _royaltyReceiver
        });
    }


    /// called w/ sale price to determine royalties owed
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) 
        external 
        view
        override(IERC2981)
        returns (address _royaltyReceiver, uint256 _royaltyAmount) {

        RoyaltyInfo memory royalty = royalties[_tokenId];

        return (royalty.royaltyReceiver, _salePrice * royalty.royaltyBPS / 10000);

    }


    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC165)
        returns (bool) {

        return (_interfaceId == type(IERC2981).interfaceId || super.supportsInterface(_interfaceId));

    }


}